#!/usr/bin/env python3
"""家具シリーズの見本（dev/designs/*.js）から、ゲーム用のモデルファイルを作る。

  python3 dev/tools/gen_series.py

出力：dev/src/33_家具シリーズ_モデル.js
  SDZ[モジュール][キー](P) … 置物のボクセルを P(x,y,z,色,大きさ) で出す関数
  SWIMG[キー]              … 壁アイテム用の画像（見本を壁の正面から見た絵、PNG）
"""
import base64, io, json, os, subprocess, sys
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DS = os.path.join(ROOT, 'designs')
OUT = os.path.join(ROOT, 'src', '33_家具シリーズ_モデル.js')

# モジュール名: (ファイル, 返すもの)
MODS = [
    ('kare', 'karesansui_2x2.js', '{main:P=>{const a=[];kareVox(a);a.forEach(v=>P(v[0],v[1],v[2],v[3],v[5]))}}'),
    ('turn', 'turntable_1x2.js', '{main:P=>{const a=[];kareVox(a);a.forEach(v=>P(v[0],v[1],v[2],v[3],v[5]))}}'),
    ('guitar', 'wall_guitar.js', '{main:P=>{const a=[];kareVox(a);a.forEach(v=>{if(v[3]!=="#f1ede4")P(v[0],v[1],v[2],v[3],v[5])})}}'),
    ('mahou', 'mahoujin_2x2.js', '{main:P=>{const a=[];mahouVox(a);a.forEach(v=>P(v[0],v[1],v[2],v[3],v[5]))}}'),
    ('lion', 'golden_lion.js', '{main:P=>lionVox((x,y,z,c,s)=>P(x,y,z,c,s||.5))}'),
    ('plants', 'plants_series.js', 'PLANTS'),
    ('kinoko', 'kinoko_series.js', 'KINOKO'),
    ('gesen', 'gesen_series.js', 'GESEN'),
    ('party', 'party_series.js', 'PARTY'),
    ('space', 'space_series.js', 'SPACE'),
    ('arab', 'arabian_series.js', 'ARAB'),
    ('alt', 'arabian_alt.js', 'ALT'),
    ('otaku', 'otaku_series.js', 'OTAKU'),
    ('china', 'china_series.js', 'CHINA'),
    ('youkai', 'youkai_series.js', 'YOUKAI'),
    ('aqua', 'aquarium_series.js', 'AQUA'),
    ('greek', 'greek_series.js', 'Object.assign({},GREEK,GREEK2)'),
    ('street', 'street_series.js', 'STREET'),
    ('gift', 'gift_swap.js', 'GIFTX'),
]

# 壁アイテム（画像にするもの）: キー -> (モジュール, 関数)
WALLS = {
    'guitar': ('guitar', 'main'), 'pothos': ('plants', 'pothos'), 'kwall': ('kinoko', 'wall'),
    'mashrabiya': ('arab', 'mashrabiya'), 'controllers': ('otaku', 'controllers'),
    'roundwin': ('china', 'roundwin'), 'santowin': ('greek', 'santowin'), 'medusa': ('greek', 'medusa'),
    'caps': ('street', 'caps'), 'skate': ('street', 'skate'),
    'modart': ('gift', 'modart'), 'shojin': ('gift', 'kake'),
}


def module_src():
    parts = ['const SDZ=(function(){const M={};const mk=s=>{let x=s;return Object.assign(Object.create(Math),{random:()=>((x=(x*16807)%2147483647)/2147483647)})};']
    for i, (name, fn, ret) in enumerate(MODS):
        src = open(os.path.join(DS, fn), encoding='utf-8').read()
        parts.append('M.%s=(function(){const Math=mk(%d);\n%s\n;return %s})();' % (name, 1234 + i * 7, src, ret))
    parts.append('return M})();')
    return '\n'.join(parts)


def dump_walls(msrc):
    js = msrc + '\nconst W=%s,o={};for(const k in W){const[m,f]=W[k],a=[];SDZ[m][f]((x,y,z,c,s)=>{if(c)a.push([x,y,z,c,s||.5])});o[k]=a}console.log(JSON.stringify(o))' % json.dumps(WALLS)
    r = subprocess.run(['node', '-e', js], capture_output=True, text=True)
    if r.returncode:
        print(r.stderr); sys.exit(1)
    return json.loads(r.stdout)


def hexrgb(c):
    c = c.lstrip('#')
    if len(c) == 3:
        c = ''.join(ch * 2 for ch in c)
    return tuple(int(c[i:i + 2], 16) for i in (0, 2, 4))


def raster(vox, px=.125):
    """x=0が壁。壁の正面（+x側）から見た絵。いちばん手前（xが大きい）の色を使う"""
    y0 = min(v[1] for v in vox); y1 = max(v[1] + v[4] for v in vox)
    z0 = min(v[2] for v in vox); z1 = max(v[2] + v[4] for v in vox)
    W = int(round((y1 - y0) / px)); H = int(round((z1 - z0) / px))
    depth = [[-1e9] * W for _ in range(H)]
    col = [[None] * W for _ in range(H)]
    for x, y, z, c, s in vox:
        top = x + s
        for i in range(int(round((y - y0) / px)), int(round((y + s - y0) / px))):
            for j in range(int(round((z - z0) / px)), int(round((z + s - z0) / px))):
                if 0 <= i < W and 0 <= j < H and top > depth[j][i]:
                    depth[j][i] = top; col[j][i] = c
    dmin = min(v[0] for v in vox); dmax = max(v[0] + v[4] for v in vox)
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    for j in range(H):
        for i in range(W):
            c = col[j][i]
            if not c:
                continue
            r, g, b = hexrgb(c)
            # 手前に出ている所を少し明るく（立体感）
            t = (depth[j][i] - dmin) / max(.5, dmax - dmin)
            f = .88 + .2 * t
            im.putpixel((i, H - 1 - j), (min(255, int(r * f)), min(255, int(g * f)), min(255, int(b * f)), 255))
    # 見た目は y が逆向きになるので左右反転
    im = im.transpose(Image.FLIP_LEFT_RIGHT)
    return im, (y1 - y0), (z1 - z0)


def png64(im):
    b = io.BytesIO(); im.save(b, 'PNG', optimize=True)
    return 'data:image/png;base64,' + base64.b64encode(b.getvalue()).decode()


def main():
    msrc = module_src()
    walls = dump_walls(msrc)
    imgs = {}
    for k, vox in walls.items():
        im, w, h = raster(vox)
        imgs[k] = {'img': png64(im), 'iw': im.width, 'ih': im.height, 'tall': h > 8}
        print(k, im.size, 'tall' if h > 8 else '')
    # お札：ユーザー提供のフリー素材（黄色い部分）
    of = Image.open(os.path.join(DS, 'ofuda_kakejiku.png')).convert('RGBA')
    of.thumbnail((100, 310))
    imgs['ofuda'] = {'img': png64(of), 'iw': of.width, 'ih': of.height, 'tall': True}
    print('ofuda', of.size)
    out = '/* 自動生成（dev/tools/gen_series.py）。dev/designs の見本から作った家具シリーズのモデル。手で直さない */\n'
    out += msrc + '\nconst SWIMG=' + json.dumps(imgs, ensure_ascii=False) + ';\n'
    open(OUT, 'w', encoding='utf-8').write(out)
    print('wrote', OUT, len(out))


if __name__ == '__main__':
    main()
