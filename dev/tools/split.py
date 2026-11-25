# 一度だけ使う：完成品の index.html を、中身ごとの元ファイル（src/）に分ける
import re,sys,os,json
src=sys.argv[1];out=sys.argv[2];ver=sys.argv[3]
s=open(src).read()
s=s.replace('GVER="%s"'%ver,'GVER="__GVER__"').replace('>Ver %s</div>'%ver,'>Ver __GVER__</div>')
assert '__GVER__' in s
spans=[(m.start(1),m.end(1)) for m in re.finditer(r'<script>([\s\S]*?)</script>',s)]
names=["s0_ads","s1_error_report","s2_qr_library","s3_text_fix"]
files=[];shell=[];pos=0
def slug(t):
  t=re.sub(r'^/\* =+ *','',t);t=re.split(r'[=（(：:。、]| \*/',t)[0].strip()
  t=re.sub(r'[\\/:*?"<>|\s・！!？?「」『』×→、，,.]+','_',t).strip('_')
  return t[:24] or "part"
for i,(a,b) in enumerate(spans):
  shell.append(s[pos:a]);pos=b;body=s[a:b]
  if i<4:
    fn=f"{i:02d}_{names[i]}.js";open(f"{out}/{fn}","w").write(body);files.append(fn);shell.append(f"/*@@{fn}@@*/");continue
  marks=[m.start() for m in re.finditer(r'(?m)^/\* =====',body)]
  cuts=[0];last=0
  for mk in marks:
    if mk-last>=60000:cuts.append(mk);last=mk
  if len(body)-cuts[-1]<20000 and len(cuts)>1:cuts.pop()
  cuts.append(len(body));parts=[]
  for k in range(len(cuts)-1):
    seg=body[cuts[k]:cuts[k+1]];m=re.search(r'(?m)^/\* =====[^\n]*',seg)
    title=slug(m.group(0)) if m and k>0 else ("データ_置物とお客さん" if k==0 else "part")
    fn=f"{10+k:02d}_{title}.js";open(f"{out}/{fn}","w").write(seg);files.append(fn);parts.append(f"/*@@{fn}@@*/")
  shell.append("".join(parts))
shell.append(s[pos:])
open(f"{out}/shell.html","w").write("".join(shell))
json.dump(files,open(f"{out}/order.json","w"),ensure_ascii=False,indent=1)
print(len(files),"files")
