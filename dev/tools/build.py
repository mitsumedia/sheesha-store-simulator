# 元ファイル（src/）をつなげて、公開用の index.html を作る
#   python3 dev/tools/build.py            → リポジトリ直下の index.html と version.txt を作る
#   python3 dev/tools/build.py 出力先.html  → 指定した場所に作る（version.txt は作らない）
#   バージョンは dev/VERSION の1行目
import json,os,sys
D=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));S=os.path.join(D,"src")
ver=open(os.path.join(D,"VERSION")).read().strip()
h=open(os.path.join(S,"shell.html")).read()
order=json.load(open(os.path.join(S,"order.json")))
prev=None
for fn in order:
  tag=f"/*@@{fn}@@*/"
  if h.count(tag)==0 and prev:  # 新しく足したファイルは、ひとつ前のファイルのすぐ後ろに入れる
    h=h.replace(prev,prev+tag,1)
  assert h.count(tag)==1,fn
  prev=tag
for fn in order:
  h=h.replace(f"/*@@{fn}@@*/",open(os.path.join(S,fn)).read(),1)
assert "/*@@" not in h
h=h.replace("__GVER__",ver)
out=sys.argv[1] if len(sys.argv)>1 else os.path.join(os.path.dirname(D),"index.html")
open(out,"w").write(h)
if len(sys.argv)<=1:open(os.path.join(os.path.dirname(D),"version.txt"),"w").write(ver+"\n")
print("built",out,ver,len(h))
