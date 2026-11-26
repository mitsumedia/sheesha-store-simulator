/* ===== 最初の1ヶ月（7日目まで）は速度ボタンの上に「タップで倍速」 ===== */
try{document.head.insertAdjacentHTML("beforeend",`<style>#spdtip{position:absolute;bottom:calc(100% + 6px);right:0;background:#6658a6;color:#fff;font-size:11px;font-weight:900;white-space:nowrap;padding:3px 9px;border-radius:10px;pointer-events:none;z-index:8}#spdtip:after{content:"";position:absolute;top:100%;right:20px;border:5px solid transparent;border-top-color:#6658a6}</style>`)}catch(e){}
{let _st=0;const _hs=hud;hud=function(){const r=_hs.apply(this,arguments);try{const n=Date.now();if(n-_st>500){_st=n;const sp=document.querySelector("#bar .spd");if(sp){sp.style.position="relative";let t=document.getElementById("spdtip");const on=G.setup&&!G.over&&R.phase==="run"&&(G.day||1)<=7&&!document.body.classList.contains("mvmode");if(on&&!t){t=document.createElement("div");t.id="spdtip";t.textContent="タップで倍速";sp.appendChild(t)}else if(!on&&t)t.remove()}}}catch(e){}return r}}

/* ===== 雰囲気タグは省略せず正式名で（1行に収まるよう小さめ） ===== */
ratm=function(){const a=atmo();$("#atm").innerHTML=TAGS.map(k=>`<span>${TL[k]} ${a[k]}</span>`).join("")};try{ratm()}catch(e){}
try{document.head.insertAdjacentHTML("beforeend",`<style>.fs #atm span,#atm span{padding:2px 6px!important;font-size:10.5px!important;white-space:nowrap}.fs #atm,#atm{gap:3px!important;max-width:calc(100vw - 20px)}</style>`)}catch(e){}

/* ===== 描画の高速化：動かない物（壁・家具・置物）は1枚の絵にしておき、人や煙など動く物の周りだけ描き直す ===== */
const SCNC={key:"",c:null,items:null,tiles:null,gw:0,gh:0,T:40,off:0,n:0};
function scnKey(k){let ds="";const D=G.decor||[];for(let i=0;i<D.length;i++){const d=D[i];ds+=d.id+","+d.tx+","+d.ty+","+(d.r||0)+";"}return SC.key+"|"+ds+"|"+W+","+CH+","+dpr+"|"+k.s.toFixed(4)+","+k.rx.toFixed(5)+","+k.ry.toFixed(5)+","+k.ux.toFixed(5)+","+k.uy.toFixed(5)+","+k.uz.toFixed(5)+","+k.ox+","+k.oy}
function wbb(x0,x1,y0,y1,z0,z1,k){let a=1e9,b=1e9,c=-1e9,d=-1e9;for(const x of[x0,x1])for(const y of[y0,y1])for(const z of[z0,z1]){const p=P3(x,y,z,k);if(p[0]<a)a=p[0];if(p[1]<b)b=p[1];if(p[0]>c)c=p[0];if(p[1]>d)d=p[1]}return[a-1,b-1,c+1,d+1]}
function scnBuild(k){const A=statFG(k),items=A.map(o=>{const v=o.v,s2=v[5]||1;return{v,d:o.d,bb:wbb(v[0],v[0]+s2,v[1],v[1]+s2,v[2],v[2]+s2,k)}});
(G.decor||[]).forEach(dd=>{const ox=dd.tx*6,oy=dd.ty*6,sl=decVox(dd.id,dd.r);if(!sl)return;sl.forEach(s2=>{const d=(ox+s2.cx)*k.cx+(oy+s2.cy)*k.cy+(s2.si+.5)*k.cz,sp=decSprite(dd.id,s2,k,dd.r);let bb;
if(sp){const P0=P3(ox,oy,0,k);bb=[P0[0]-sp.ax-1,P0[1]-sp.ay-1,P0[0]-sp.ax+sp.w+1,P0[1]-sp.ay+sp.h+1]}else{const b=s2.bb;bb=b?wbb(ox+b[0],ox+b[1],oy+b[2],oy+b[3],b[4],b[5],k):[0,0,W,CH]}
items.push({v:{fn:k2=>{const sp2=decSprite(dd.id,s2,k2,dd.r);if(!sp2){s2.v.map(v=>[v[0]+ox,v[1]+oy,v[2],v[3],undefined,.5]).map(v=>({v,d:dep(v,k2)})).sort((p,q)=>p.d-q.d).forEach(o=>dv(o.v,k2));return}const P0=P3(ox,oy,0,k2);cx.drawImage(sp2.c,P0[0]-sp2.ax,P0[1]-sp2.ay,sp2.w,sp2.h)}},d,bb})})});
items.sort((p,q)=>p.d-q.d);
if(!SCNC.c)SCNC.c=document.createElement("canvas");const c=SCNC.c;if(c.width!==cv.width||c.height!==cv.height){c.width=cv.width;c.height=cv.height}const g=c.getContext("2d");g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,CH);
const oc=cx;cx=g;try{for(const o of items)o.v.fn?o.v.fn(k):dv(o.v,k)}finally{cx=oc}
const T=SCNC.T,gw=Math.ceil(W/T),gh=Math.ceil(CH/T),tiles=Array.from({length:gw*gh},()=>[]);
items.forEach((o,i)=>{const b=o.bb,x0=Math.max(0,Math.floor(b[0]/T)),y0=Math.max(0,Math.floor(b[1]/T)),x1=Math.min(gw-1,Math.floor(b[2]/T)),y1=Math.min(gh-1,Math.floor(b[3]/T));for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)tiles[y*gw+x].push(i)});
SCNC.items=items;SCNC.tiles=tiles;SCNC.gw=gw;SCNC.gh=gh;SCNC.n++}
function scnDraw(k){if(SCNC.off||window.SCN_OFF||typeof document==="undefined"||!document.createElement)return false;
try{const key=scnKey(k);if(SCNC.key!==key){scnBuild(k);SCNC.key=key}
const Bn=dyn().map(v=>({v,d:dep(v,k)})).concat(GLS.map(g=>({v:{fn:g.fn},d:g.pos[0]*k.cx+g.pos[1]*k.cy+g.pos[2]*k.cz+.6,g:g.pos})));
const T=SCNC.T,gw=SCNC.gw,gh=SCNC.gh,mk=new Uint8Array(gw*gh);let any=0;
const mark=(a,b,c,d)=>{const x0=Math.max(0,Math.floor(a/T)),y0=Math.max(0,Math.floor(b/T)),x1=Math.min(gw-1,Math.floor(c/T)),y1=Math.min(gh-1,Math.floor(d/T));for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){mk[y*gw+x]=1;any=1}};
for(const o of Bn){if(o.g){const p=o.g,b=wbb(p[0]-5,p[0]+5,p[1]-5,p[1]+5,Math.max(-1,p[2]-6),p[2]+10,k);mark(b[0],b[1],b[2],b[3])}else{const v=o.v,s2=v[5]||1,p=P3(v[0]+s2/2,v[1]+s2/2,v[2]+s2/2,k),r=k.s*s2*1.05+1;mark(p[0]-r,p[1]-r,p[0]+r,p[1]+r)}}
const rects=()=>{cx.beginPath();for(let y=0;y<gh;y++){let x=0;while(x<gw){if(!mk[y*gw+x]){x++;continue}let e=x;while(e+1<gw&&mk[y*gw+e+1])e++;cx.rect(x*T,y*T,(e-x+1)*T,T);x=e+1}}};
cx.save();if(any){rects();cx.rect(0,0,W,CH);cx.clip("evenodd")}cx.setTransform(1,0,0,1,0,0);cx.drawImage(SCNC.c,0,0);cx.restore();
if(!any)return true;
const seen=new Uint8Array(SCNC.items.length),S=[];for(let t=0;t<mk.length;t++){if(!mk[t])continue;const L=SCNC.tiles[t];for(let q=0;q<L.length;q++){const id=L[q];if(!seen[id]){seen[id]=1;S.push(id)}}}S.sort((a,b)=>a-b);
Bn.sort((p,q)=>p.d-q.d);cx.save();rects();cx.clip();let i=0,j=0;const IT=SCNC.items;
while(i<S.length||j<Bn.length){const o=(j>=Bn.length||(i<S.length&&IT[S[i]].d<=Bn[j].d))?IT[S[i++]]:Bn[j++];o.v.fn?o.v.fn(k):dv(o.v,k)}cx.restore();return true}
catch(e){SCNC.off=1;try{console.error(e)}catch(_){}return false}}

const WSPR=new WeakMap();
function walkSpr(a,c,d,ox,oy){if(window.SCN_OFF||typeof document==="undefined"||!document.createElement||typeof sprPush!=="function")return false;try{let m=WSPR.get(c);if(!m){m={};WSPR.set(c,m)}const key=d+"|"+[c.hs,c.acc,c.hair,c.skin,c.shirt,c.accC,c.eye,c.top,c.bot,c.pants,c.pump,c.h2,c.t2,c.b2,c.sp,c.kg,c.fat,c.hc2,JSON.stringify(c.accV||0)].join();let pc=m[key];if(!pc){const t=[];pv(t,0,0,1,c,0,d);pc=m[key]={l:t}}
const n0=GLS.length;sprPush(pc,a,[ox+2,oy+1.5,5]);if(GLS.length!==n0+1)return true;const g=GLS.pop(),inner=g.fn;GLS.push({pos:[ox+2,oy+1.5,5],fn:k=>{const p0=P3(0,0,0,k),p1=P3(ox,oy,0,k);cx.save();cx.translate(Math.round((p1[0]-p0[0])*dpr)/dpr,Math.round((p1[1]-p0[1])*dpr)/dpr);try{inner(k)}finally{cx.restore()}}});return true}catch(e){return false}}

/* ===== カメラを回している間は軽く描く（置物の絵は角度を少し刻んで使い回す） ===== */
let LOWC=null,_camS="",_camT=0,CAMMV=0;
function kQ(k){const st=.07,yaw=Math.round(Math.atan2(k.ry,k.rx)/st)*st,pit=Math.round(Math.atan2(k.cz,k.uz)/st)*st,cp=Math.cos(pit),sp=Math.sin(pit),sa=Math.sin(yaw),ca=Math.cos(yaw),s2=k.s;
return Object.assign({},k,{cx:-cp*sa,cy:cp*ca,cz:sp,rx:ca,ry:sa,ux:sa*sp,uy:-ca*sp,uz:cp,exx:s2*ca,exy:-s2*sa*sp,eyx:s2*sa,eyy:s2*ca*sp,ezy:-s2*cp})}
{const _ds=decSprite;decSprite=function(id,s2,k,r){return _ds.call(this,id,s2,CAMMV?kQ(k):k,r)}}
{const _sd=scnDraw;scnDraw=function(k){if(CAMMV)return false;return _sd.apply(this,arguments)}}
{const _dw=draw;draw=function(){const c=R.cam,sg=c.yaw.toFixed(4)+","+c.pit.toFixed(4)+","+c.zoom.toFixed(4)+","+W+","+CH,n=performance.now();if(sg!==_camS){_camS=sg;_camT=n}
CAMMV=!window.LOW_OFF&&n-_camT<200;return _dw.apply(this,arguments)}}

/* ===== 管理者モード：置物無制限（1ヶ月の設置数の上限をなくす。置物・壁アイテム・客席） ===== */
{const _pl=plLeft;plLeft=function(){return G.admNL?999:_pl.apply(this,arguments)}}
{const _sl=splLeft;splLeft=function(){return G.admNL?999:_sl.apply(this,arguments)}}
{const _rd=rdeco;rdeco=function(){const r=_rd.apply(this,arguments);try{if(G.admNL){const e=$("#plc");if(e)e.innerHTML="今月の設置：<b>無制限</b>（管理者モード）";const p=$("#spc");if(p)p.innerHTML="今月の客席の設置：<b>無制限</b>（管理者モード）"}}catch(e){}return r}}
{const _ap=admPanel;admPanel=function(){const r=_ap.apply(this,arguments);const d=$("#adm");if(!d)return r;
const put=()=>{if(d.querySelector("[data-adnl]"))return;const call=d.querySelector('[data-ad="call"]');if(!call)return;const b=document.createElement("button");b.dataset.adnl="1";b.style.cssText="display:block;width:100%;margin:0 0 8px;padding:9px 10px;border-radius:10px;font-weight:700;font-size:14px;border:1.5px solid #7b4fd6;"+(G.admNL?"background:#efe6ff;color:#4a2a99":"background:#fff;color:#4a2a99");b.textContent=(G.admNL?"✅ ":"")+"🪴 置物無制限（1ヶ月の設置数の上限なし）";call.after(b)};put();
d.addEventListener("click",e=>{const b=e.target.closest("[data-adnl]");if(b){e.stopPropagation();G.admNL=G.admNL?0:1;save();b.remove();put();try{rdeco();rseat&&rseat()}catch(_){}log("🛠 管理者モード：置物無制限 "+(G.admNL?"ON":"OFF"));return}setTimeout(put,0)},true);return r}}

/* ===== 上のステータスに項目名を戻す（客・売上・満足度・煙たさ・きれいさ） ===== */
try{document.head.insertAdjacentHTML("beforeend",`<style>
html body #top .mt>div{font-size:10px!important;flex-direction:column!important;align-items:flex-start!important;justify-content:center!important;gap:1px!important;padding:4px 7px 5px!important;line-height:1.25!important;white-space:nowrap;overflow:hidden}
html body #top .mt>div::before{content:none!important;display:none!important}
html body #top .mt>div b{font-size:13px!important;line-height:1.2!important}
html body #top .mt>div i{display:block!important;width:100%!important;height:3px!important;border-radius:2px!important;background:rgba(255,255,255,.12)!important;overflow:hidden;margin-top:2px!important;position:static!important}
html body #top .mt>div i u{display:block!important;height:100%!important}
</style>`)}catch(e){}

/* 換気中は項目名を「🌀 換気中」にして、値は煙たさだけ（はみ出し防止） */
{const _hv2=hud;hud=function(){const r=_hv2.apply(this,arguments);try{const b=document.getElementById("mtk");if(b){const d=b.parentNode,t=d.firstChild,v=R.phase==="run"&&R.vent>0,lb=v?"🌀 換気中":"💨 煙たさ";if(t&&t.nodeType===3&&t.textContent!==lb)t.textContent=lb;if(v)b.textContent=b.textContent.replace("換気中 ","")}}catch(e){}return r}}

/* 満足度の枠を「🚶 来店数」（今日来たお客さんの人数）に */
{const _hv3=hud;hud=function(){const r=_hv3.apply(this,arguments);try{const b=document.getElementById("mth");if(b){const d=b.parentNode,t=d.firstChild;if(t&&t.nodeType===3&&t.textContent!=="🚶 来店数")t.textContent="🚶 来店数";const run=R.phase==="run",v=run&&R.st?(R.st.visits||0)+"人":(((G.week||[])[G.wd-1]||{}).visits!=null?"前回 "+G.week[G.wd-1].visits+"人":"—");if(b.textContent!==v)b.textContent=v;const bar=document.getElementById("mthb");if(bar&&bar.parentNode)bar.parentNode.style.visibility="hidden"}}catch(e){}return r}}

/* ===== 店のきれいさ：床のマスが汚れていく・掃除ミニゲーム（なぞって掃除） ===== */
const dRnd=(a,b,n)=>{const x=Math.sin(a*127.1+b*311.7+n*74.7)*43758.5453;return x-Math.floor(x)};
const dLv=v=>v<25?0:v<50?1:v<75?2:3;
function dirtTile(k,tx,ty,lv){if(lv<1)return;const X=tx*6,Y=ty*6,blob=(x,y,r,col,sq)=>{const p=P3(X+x,Y+y,0,k),s2=k.s*r;cx.fillStyle=col;cx.beginPath();cx.ellipse(p[0],p[1],s2,s2*(sq||.55),0,0,7);cx.fill()};
const n1=[0,4,6,6][lv];for(let i=0;i<n1;i++)blob(.6+dRnd(tx,ty,i)*4.8,.6+dRnd(ty,tx,i+9)*4.8,.25+dRnd(tx,i,3)*.35,"rgba(120,85,50,.3)");
if(lv>=2){for(let i=0;i<10;i++)blob(.4+dRnd(tx,ty,i+30)*5.2,.4+dRnd(ty,tx,i+40)*5.2,.08+dRnd(i,tx,5)*.1,i%3?"rgba(110,110,110,.75)":"rgba(60,60,60,.7)");for(let i=0;i<4;i++)blob(.6+dRnd(tx,ty,i+60)*4.8,.6+dRnd(ty,tx,i+70)*4.8,.12,["#d9a441","#b5482f","#e8d9b0"][i%3]);blob(1.5+dRnd(tx,ty,90)*3,1.5+dRnd(ty,tx,91)*3,.9,"rgba(150,120,80,.22)")}
if(lv>=3){blob(2+dRnd(tx,ty,100)*2,2+dRnd(ty,tx,101)*2,1.7,"rgba(40,30,25,.35)",.6);blob(1.2+dRnd(tx,ty,102)*3.5,1.2+dRnd(ty,tx,103)*3.5,1.1,"rgba(70,50,30,.4)",.5);for(let i=0;i<8;i++)blob(.4+dRnd(tx,ty,i+120)*5.2,.4+dRnd(ty,tx,i+130)*5.2,.1+dRnd(i,ty,7)*.12,"rgba(30,30,30,.8)")}}
function dirtDraw(k){const D=G.dirt;if(!D||R.vis)return;FLT.forEach(([tx,ty])=>{const v=D[tx+","+ty]||0;if(v>=25)dirtTile(k,tx,ty,dLv(v))})}
function cleanPct(){const D=G.dirt||{};let s2=0,n=0;FLT.forEach(([tx,ty])=>{s2+=Math.min(100,D[tx+","+ty]||0);n++});return n?Math.round(100-s2/n):100}
function dirtSet(key,v){G.dirt=G.dirt||{};const o=G.dirt[key]||0;v=Math.max(0,Math.min(100,v));G.dirt[key]=v;if(dLv(o)!==dLv(v))G.dv=(G.dv||0)+1}
/* 1日の終わりに汚れがたまる（席のまわり・入口付近が汚れやすい） */
function dirtDay(visits){const near=new Set();(G.furn||[]).forEach(F=>{try{furnFoot(F).forEach(k=>{const[a,b]=k.split(",").map(Number);for(let dx=-1;dx<=1;dx++)for(let dy=-1;dy<=1;dy++)near.add((a+dx)+","+(b+dy))})}catch(e){}});
const v=Math.max(0,visits||0);FLT.forEach(([tx,ty])=>{const key=tx+","+ty;let add=3+Math.random()*3+(near.has(key)?v*1.6:v*.45)+(tx<=2&&ty<=3?v*.8:0);dirtSet(key,(G.dirt[key]||0)+add)});G.dv=(G.dv||0)+1}
{const _dd=dayDone;dayDone=function(en){const r=_dd.apply(this,arguments);try{if(en&&!en.closed)dirtDay(en.visits)}catch(e){}return r}}
/* 汚いと口コミが下がる・不満がたまる */
{const _ra=revAdd;revAdd=function(c,p){_ra.apply(this,arguments);try{const cp=cleanPct(),r=G.rev&&G.rev[c.i];if(r&&cp<60&&Math.random()<(cp<35?.8:.45)){r.s=Math.max(1,r.s-1);r.t=rnd(["床が汚かった…","ちょっと店が汚れてたかも","掃除してほしいな","足元が気になった"])}if(G.pika===G.day&&r&&Math.random()<.5)r.s=Math.min(5,r.s+1)}catch(e){}}}
{const _ev2=endVisit;endVisit=function(c,p){try{const cp=cleanPct();if(c&&cp<50)c.up=Math.min(100,(c.up||0)+(cp<35?8:4))}catch(e){}return _ev2.apply(this,arguments)}}
/* 上部の枠は「きれいさ」 */
{const _hv4=hud;hud=function(){const r=_hv4.apply(this,arguments);try{const b=document.getElementById("mtm");if(b){const d=b.parentNode,t=d.firstChild;if(t&&t.nodeType===3&&t.textContent!=="🧹 きれいさ")t.textContent="🧹 きれいさ";const p=cleanPct(),v=p+"%";if(b.textContent!==v)b.textContent=v;const bar=document.getElementById("mtmb");if(bar){bar.style.width=p+"%";bar.style.background=p>=70?"#7bd389":p>=45?"#e0c34a":"#e06a5a"}}}catch(e){}return r}}
/* ===== 今日の行動に「🧹 掃除」 ===== */
MNA.clean=["🧹","掃除"];
{const _sm=showMorning;showMorning=function(){const r=_sm.apply(this,arguments);try{const box=document.querySelector("#ov .mnc");if(!box||box.querySelector('[data-mo="clean"]'))return r;const g=box.querySelector(".mg"),cp=cleanPct();
const b=document.createElement("button");b.dataset.mo="clean";b.innerHTML=`<span class="e">🧹</span><b>掃除</b><small>無料・なぞって掃除するミニゲーム（いま きれいさ ${cp}%）</small>`;const fc=g.querySelector('[data-mo="focus"]');g.insertBefore(b,fc);
const ms=box.querySelectorAll(".ms>div");const last=ms[ms.length-1];if(last)last.innerHTML=`<small>🧹 きれいさ</small><b style="color:${cp>=45?"inherit":"#e53935"}">${cp}%</b>`;const w=box.querySelector(".mw");if(w)w.remove()}catch(e){}return r}}
{const _ac2=act;act=function(k){if(k!=="clean")return _ac2.apply(this,arguments);const o=G.ow;if(!o||R.phase!=="prep"||o.acted||G.over||!G.setup)return;o.acted=1;G.actK="clean";G.actD=G.day;R.mOpen=0;save();ovOff();setTimeout(()=>{ovOff();cleanStart()},60)}}
/* ===== 掃除ミニゲーム ===== */
try{document.head.insertAdjacentHTML("beforeend",`<style>
#clov{position:fixed;inset:0;z-index:70;touch-action:none}
#clhd{position:fixed;left:50%;top:calc(var(--uit,104px) + 8px);transform:translateX(-50%);z-index:71;background:#005d4d;color:#fff;border-radius:16px;padding:8px 16px;font-weight:900;font-size:15px;white-space:nowrap;text-align:center;pointer-events:none}
#clhd b{color:#ffd76a;font-size:20px;margin-left:6px}#clhd small{display:block;font-size:11px;color:#8fc9bc;font-weight:700}
.clc{background:#f3f1ea!important;color:#123a33!important;border:none!important;border-radius:16px!important;text-align:center}
.clc .bt{display:flex;gap:10px;margin-top:12px}
#ov .clc button{flex:1;border-radius:14px!important;padding:11px 0!important;font-weight:900!important;font-size:15px!important;border:2px solid #005d4d!important;background:#fff!important;color:#005d4d!important}
#ov .clc button.a{flex:1.5;background:#6658a6!important;border-color:#6658a6!important;color:#fff!important}
.clspk{position:fixed;z-index:72;pointer-events:none;font-size:18px;animation:clspk .6s ease-out forwards}
@keyframes clspk{from{opacity:1;transform:translate(-50%,-50%) scale(.6)}to{opacity:0;transform:translate(-50%,-90%) scale(1.3)}}
</style>`)}catch(e){}
function scr2tile(clx,cly){const r=cv.getBoundingClientRect(),X=(clx-r.left)*W/r.width,Y=(cly-r.top)*CH/r.height,k=R.cv||camVec(),a=(X-k.ox)/k.s,b=-(Y-k.oy)/k.s-(0-TZ)*k.uz,det=k.rx*k.uy-k.ry*k.ux;if(Math.abs(det)<1e-6)return null;
const dx=(a*k.uy-k.ry*b)/det,dy=(k.rx*b-a*k.ux)/det,x=dx+TX,y=dy+TY;return[Math.floor(x/6),Math.floor(y/6),x,y]}
function cleanStart(){const cp=cleanPct();ov(`<div class="card clc"><div style="font-size:44px">🧹</div><b style="font-size:18px">なぞって掃除！</b><div style="font-size:13px;margin:8px 0;line-height:1.7">制限時間は<b>10秒</b>。床を指でなぞると汚れが落ちます。<br>ひどい汚れは何回かなぞってね。<br>いまのきれいさ：<b>${cp}%</b></div><div class="bt"><button id="clauto">おまかせ（80%まで）</button><button id="clgo" class="a">スタート ▶</button></div></div>`);
const c=document.querySelector("#ov .clc");if(c)c.onclick=e=>{const b=e.target.closest("button");if(!b)return;e.stopPropagation();if(b.id==="clgo"){ovOff();cleanPlay()}else if(b.id==="clauto"){ovOff();const before=cleanPct();FLT.forEach(([tx,ty])=>{const k=tx+","+ty;dirtSet(k,Math.min(G.dirt[k]||0,20))});G.dv=(G.dv||0)+1;save();cleanEnd(before,0)}}}
function cleanPlay(){const before=cleanPct(),cam=JSON.stringify(R.cam);let left=10,last=null,lastT=0;R.cleaning=1;const o=document.createElement("div");o.id="clov";document.body.appendChild(o);const h=document.createElement("div");h.id="clhd";document.body.appendChild(h);
const upd=()=>{h.innerHTML=`🧹 なぞって掃除！<b>${Math.ceil(left)}</b><small>きれいさ ${cleanPct()}%</small>`};upd();const t0=performance.now();
const scrub=(e)=>{const p=scr2tile(e.clientX,e.clientY);if(!p)return;let key=p[0]+","+p[1];try{const fk=cleanFurnKey(e.clientX,e.clientY);if(fk)key=fk}catch(_){}if(!FLS.has(key))return;if(OW.x<-100||Math.hypot(OW.x-p[2],OW.y-p[3])>.4){OW.x=Math.max(0,Math.min(60,p[2]));OW.y=Math.max(0,Math.min(60,p[3]));OW.mode="";OW.path=[];OW._pc=null}const n=performance.now();if(key===last&&n-lastT<220)return;last=key;lastT=n;const v=G.dirt&&G.dirt[key]||0;if(v<=0)return;const nv=v<25?0:v-12;dirtSet(key,nv);G.dv=(G.dv||0)+1;
OW.x=Math.max(0,Math.min(60,p[2]));OW.y=Math.max(0,Math.min(60,p[3]));OW.mode="";OW.path=[];OW._pc=null;if(nv<25){const s2=document.createElement("div");s2.className="clspk";s2.textContent="✨";s2.style.left=e.clientX+"px";s2.style.top=e.clientY+"px";document.body.appendChild(s2);setTimeout(()=>s2.remove(),650)}upd()};
let down=0;o.addEventListener("pointerdown",e=>{down=1;try{o.setPointerCapture(e.pointerId)}catch(_){}scrub(e)});o.addEventListener("pointermove",e=>{if(down)scrub(e)});o.addEventListener("pointerup",()=>{down=0});o.addEventListener("pointercancel",()=>{down=0});
const tm=setInterval(()=>{R.cam=JSON.parse(cam);left=10-(performance.now()-t0)/1000;upd();if(left<=0){clearInterval(tm);R.cleaning=0;o.remove();h.remove();save();cleanEnd(before,1)}},100)}
function cleanEnd(before,game){const after=cleanPct(),pk=game&&after>=95;if(pk)G.pika=G.day;save();try{hud()}catch(e){}
ov(`<div class="card clc"><div style="font-size:44px">${pk?"✨":"🧹"}</div><b style="font-size:18px">${pk?"ピカピカ！":"掃除しました"}</b><div style="font-size:15px;margin:10px 0">きれいさ <b>${before}%</b> → <b style="color:#2a9a7c">${after}%</b></div>${pk?`<div style="font-size:12.5px;color:#6658a6;font-weight:900">ピカピカボーナス：今日の口コミが良くなりやすい！</div>`:""}<div class="bt"><button id="clok" class="a">開店準備へ</button></div></div>`);
const c=document.querySelector("#ov .clc");if(c)c.onclick=e=>{if(e.target.closest("#clok")){e.stopPropagation();ovOff();try{rown();fmAct()}catch(_){}}}}
/* 業者に頼む（行動を使わずにきれいに・¥3,000） */
{const _fa=fmAct;fmAct=function(){const r=_fa.apply(this,arguments);try{const d=$("#fmst2");if(d&&R.phase==="prep"&&!d.querySelector("[data-clpro]")){const b=document.createElement("button");b.dataset.clpro="1";b.textContent="🧹 業者に掃除を頼む "+yen(clnFee());b.style.cssText="margin-top:8px;width:100%";d.style.flexWrap="wrap";d.appendChild(b);b.onclick=e=>{e.stopPropagation();const fee=clnFee();if(G.money<fee){toast("💸 お金が足りません");return}if(cleanPct()>=98){toast("もう十分きれいです");return}G.money-=fee;FLT.forEach(([tx,ty])=>dirtSet(tx+","+ty,0));G.dv=(G.dv||0)+1;save();hud();toast("🧹 業者さんがピカピカにしてくれました");log("🧹 清掃業者に頼んだ（"+yen(fee)+"）")}}}catch(e){}return r}}
if(!G.dirt)G.dirt={};

/* ===== 掃除を練習の次に並べ、5つ目は横いっぱい ===== */
try{document.head.insertAdjacentHTML("beforeend",`<style>#ov .mnc .mg>button:last-child:nth-child(odd){grid-column:1/-1}</style>`)}catch(e){}
{const _sm3=showMorning;showMorning=function(){const r=_sm3.apply(this,arguments);try{const g=document.querySelector("#ov .mnc .mg");if(g){const pr=g.querySelector('[data-mo="prac"]'),cl=g.querySelector('[data-mo="clean"]');if(pr&&cl)pr.after(cl)}}catch(e){}return r}}

/* ===== 次の日の行動：2回できる日／できない日 ===== */
function evAct2(why){G.act2D=G.day+1;G.act2W=why}
function evNoAct(why){G.noActD=G.day+1;G.noActW=why}
function evFp(n){G.cs.forEach(c=>{if(!c.met||c.quit)return;const f=c.fp||0;if(n>0)c.fp=f+n;else{const keep=Math.floor(Math.min(f,(typeof NL!=="undefined"?NL:12)*4)/4)*4;c.fp=Math.max(keep,f+n,0)}})}
const act2On=()=>G.act2D===G.day&&G.noActD!==G.day;
{const _sm4=showMorning;showMorning=function(){const o=G.ow;
if(G.noActD===G.day&&canAct()){if(typeof evMorning==="function"&&evMorning())return;if(!canAct())return;o.acted=1;G.actK="none";save();
ov(`<div class="card" style="text-align:center"><div style="font-size:42px">😣</div><b>今日は行動できません</b><div class="m" style="font-size:13px;margin:8px 0;line-height:1.7">昨日の「${esc(G.noActW||"できごと")}」で、今日は何もする気になれない…<br>このまま開店準備をしよう</div><button id="noactok" class="on" style="width:100%">開店準備へ</button></div>`);
const b=$("#noactok");if(b)b.onclick=e=>{e.stopPropagation();ovOff();try{rown();fmAct()}catch(_){}};return}
const r=_sm4.apply(this,arguments);
try{if(act2On()){const box=document.querySelector("#ov .mnc");if(box&&!box.querySelector(".act2b")){const n=G.act2U===G.day?1:2,d=document.createElement("div");d.className="act2b";d.style.cssText="margin:8px 12px 0;padding:8px 10px;border-radius:10px;background:#6658a6;color:#fff;font-weight:900;font-size:13px;text-align:center";d.textContent="🎁 "+(G.act2W||"昨日のできごと")+"のおかげで、今日は2回行動できる！（あと"+n+"回）";const g=box.querySelector(".mg");if(g)g.parentNode.insertBefore(d,g.previousElementSibling||g)}}}catch(e){}
return r}}
{const _ac4=act;act=function(k){const o=G.ow,b4=o&&o.acted;const r=_ac4.apply(this,arguments);
if(o&&!b4&&o.acted&&act2On()&&G.act2U!==G.day&&k!=="visit"&&R.phase==="prep"){G.act2U=G.day;o.acted=0;save();let n=0;const t=setInterval(()=>{n++;if(n>240||R.phase!=="prep"||o.acted){clearInterval(t);return}
if($("#ov").hidden&&!$("#clov")&&!document.querySelector(".xpan")&&!document.querySelector("#sheet.open")){clearInterval(t);try{toast("🎁 もう1回行動できます")}catch(_){}showMorning()}},500)}
return r}}
/* ===== 💔 元恋人：見た目と名前を決めて図鑑へ ===== */
const MOTOL=["…元気そうだね","このフレーバー、昔一緒に吸ったやつ","別に、会いに来たわけじゃないから","…ここ、居心地いいね","あの頃より、ちょっと大人になった？","…まだあのマグカップ使ってる？","たまたま近くを通っただけ","変わってないね、そういうところ","…その髪型、似合ってるじゃん","今の人とは、うまくいってるの？","自分のこと、お客さんとして扱ってね","…あの時は、ごめんね","また来るかは、わからないけど"];
function motoEdit(done){const o=G.ow||{},sex=o.sex==="女性"?"男性":"女性",b=mkC(-1,"",sex,1);
R.od={shop:"",name:"",age:o.age||28,sex,eye:b.eye||0,hs:b.hs,hair:b.hair,skin:b.skin,shirt:b.shirt,top:b.top,bot:b.bot,pants:b.pants,acc:0,accC:"#333333",h2:0,t2:0,b2:0};
ov(`<div class="card motof"><b>💔 元恋人ってどんな人？</b><div class="m" style="font-size:12px;margin:4px 0">見た目と名前を決めると、図鑑に登録されて、ときどきお店に来るようになります</div>${ownForm2()}<button id="motook" class="on" style="width:100%;margin-top:8px">この人にする</button></div>`);
try{const n=document.querySelector('#ov .motof [data-ok="name"]');if(n){n.placeholder="名前";n.maxLength=8}const sp=document.querySelector('#ov .motof [data-ok="shop"]');if(sp)sp.closest(".ofrw").remove()}catch(e){}prevO();
const btn=$("#motook");btn.onclick=e=>{e.stopPropagation();const d=R.od;if(!d||!(d.name||"").trim()){toast("名前を入力してください");return}
const c=Object.assign(mkC(G.cs.length,d.name.trim(),d.sex,1),{age:d.age,hs:d.hs,hair:d.hair,skin:d.skin,shirt:d.shirt,top:d.top,bot:d.bot,pants:d.pants,eye:d.eye||0,acc:d.acc||0,accC:d.accC,h2:d.h2|0,t2:d.t2|0,b2:d.b2|0},
{act:1,cu:1,ed:1,g:-1,met:1,fp:0,taps:0,nick:d.name.trim(),hp:10,up:0,quit:0,ret:0,mo:0,moto:1,freq:.5,ap:{k:"start",v:0,p:100},ls:MOTOL.slice()});
G.cs.push(c);G.motoI=c.i;R.od=null;save();ovOff();log("💔 元恋人「"+c.name+"」が図鑑に登録された。ときどき来るみたい…");try{toast("💔 "+c.name+" を図鑑に登録しました")}catch(_){}try{rdex()}catch(_){}done&&done()}}
try{document.head.insertAdjacentHTML("beforeend",`<style>.dxno .moto{margin-left:2px}</style>`)}catch(e){}
{const _ef=evFire;evFire=function(e,after){if(e&&e.id===47&&!G.motoI&&G.cs.length<400)return _ef.call(this,e,r=>motoEdit(()=>after&&after(r)));return _ef.apply(this,arguments)}}
{const _rd=rdex;rdex=function(){const r=_rd.apply(this,arguments);try{document.querySelectorAll(".dxt[data-c]").forEach(el=>{const c=G.cs[+el.dataset.c];if(c&&c.moto){const n=el.querySelector(".dxno");if(n&&!n.querySelector(".moto"))n.insertAdjacentHTML("beforeend",'<span class="moto">💔</span>')}})}catch(e){}return r}}

/* ===== 掃除ミニゲーム中は営業開始を押せない ===== */
try{document.head.insertAdjacentHTML("beforeend",`<style>body:has(#clov) #go,body:has(#ov:not([hidden]) .clc) #go{pointer-events:none!important;opacity:.45!important}</style>`)}catch(e){}
document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest("#go")&&($("#clov")||(!$("#ov").hidden&&document.querySelector("#ov .clc")))){e.stopImmediatePropagation();e.preventDefault()}},true);
/* ===== 閉店後のバトル・フェス告知：今日のまとめを閉じてから出す。終わるまで次の日の行動は出さない ===== */
function d8Hide(){const p=$("#evp");if(p&&$("#dlok")&&!$("#ov").hidden){p.style.display="none";R.evHid=1}}
{const _ep=evPop;evPop=function(){const r=_ep.apply(this,arguments);try{d8Hide()}catch(e){}return r}}
{const _sd=showDayLog;showDayLog=function(){const r=_sd.apply(this,arguments);try{d8Hide()}catch(e){}return r}}
document.addEventListener("click",e=>{if(!(e.target.closest&&e.target.closest("#dlok")))return;const p=$("#evp");if(R.evHid&&p){e.stopImmediatePropagation();R.evHid=0;R.d8Def=1;ovOff();p.style.display=""}else R.evHid=0},true);
{const _d8=day8;day8=function(cb,fo){return _d8.call(this,function(){try{cb&&cb()}finally{if(R.d8Def){R.d8Def=0;if(!(G.last&&!G.last.seen))setTimeout(()=>showMorning(),50)}}},fo)}}
{const _sm5=showMorning;showMorning=function(){const p=$("#evp");if(R.evHid&&(!p||$("#ov").hidden)){R.evHid=0;if(p)p.style.display=""}if(R.d8Def||R.evHid)return;return _sm5.apply(this,arguments)}}

/* ===== 💔 元恋人：図鑑は名前と見た目だけ。来店は月1回20%の抽選 ===== */
const motoC=()=>G.cs.find(c=>c.moto);
function motoFix(){const c=motoC();if(!c)return;c.act=0;c.ls=MOTOL.slice();if(G.motoM!==G.month){G.motoM=G.month;G.motoD=Math.random()<.2?G.day+Math.floor(Math.random()*Math.max(1,7-(G.wd||0))):-1}}
{const _sc=sched;sched=function(fc){try{motoFix()}catch(e){}const r=_sc.apply(this,arguments);try{const c=motoC();if(c&&!fc&&G.motoD===G.day&&!c.quit){const o=G.open*60+(R.late||0),e=G.close*60-60;if(e>o){R.sched.push({at:o+Math.floor(Math.random()*(e-o)),m:[c]});R.sched.sort((a,b)=>a.at-b.at);G.motoD=-1}}}catch(e){}return r}}
{const _fd=fmDex;fmDex=function(i,el){const r=_fd.apply(this,arguments);try{const c=G.cs[i];if(c&&c.moto){const n=document.querySelector("#fms .nm");if(n)n.innerHTML=`<div><b>💔 ${esc(c.name)}</b><small>元恋人。たまにやってくる</small></div>`;const tl=document.querySelector("#fms .tl");if(tl)tl.textContent="💔";fmBtn(null)}}catch(e){}return r}}
{const _rd2=rdex;rdex=function(){if(R.sel>=0&&G.cs[R.sel]&&G.cs[R.sel].moto)R.sel=-1;const r=_rd2.apply(this,arguments);try{document.querySelectorAll(".dxt[data-c]").forEach(el=>{const c=G.cs[+el.dataset.c];if(c&&c.moto){el.querySelectorAll(".dxl,.dxp").forEach(x=>x.style.visibility="hidden");const no=el.querySelector(".dxno");if(no&&no.textContent!=="💔")no.textContent="💔"}})}catch(e){}return r}}
try{setTimeout(()=>{try{motoFix()}catch(e){}},0)}catch(e){}

/* ===== 朝の行動画面：iPhoneで下のボタンが隠れないように。中身はスクロール、ボタンは下に固定 ===== */
try{document.head.insertAdjacentHTML("beforeend",`<style>html body #ov .card.mnc{max-height:calc(100dvh - 20px)!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;display:block}
html body #ov .mnc .mb{position:sticky;bottom:0;background:#f3f1ea;z-index:2;padding-bottom:max(12px,env(safe-area-inset-bottom));box-shadow:0 -6px 12px -6px rgba(0,0,0,.12)}
html body #ov .mnc .mg button{min-height:0!important;padding:8px 11px!important}
html body #ov .mnc .mg button .e{font-size:18px}</style>`)}catch(e){}

/* ===== 自動の軽量モード：描き直しが重い端末だけ、30fps＋解像度1.5倍にする ===== */
const LITE={t0:performance.now(),fi:16,dw:5,lastD:0,lastF:0,bad:0};
function liteDraw(now){const L=LITE;if(L.lastF){const fi=now-L.lastF;if(fi<100&&document.visibilityState==="visible")L.fi+=(fi-L.fi)*.05}L.lastF=now;
if(R.lite&&now-L.lastD<30)return;L.lastD=now;const a=performance.now();draw();const d=performance.now()-a;L.dw+=(d-L.dw)*.05;
if(!R.lite&&now-L.t0>6000){const st=Math.min(100,now-(L.lastC||now));L.lastC=now;if(L.dw>14&&!G.liteNo)L.bad+=st;else L.bad=Math.max(0,L.bad-st*2);if(L.bad>4000){R.lite=1;try{fitCv()}catch(e){}}}}

/* ===== 名前の修正：K-Sick → K-SicK（今のセーブにも反映） ===== */
function nmFix(){try{(G.cs||[]).forEach(c=>{if(c.name==="K-Sick")c.name="K-SicK";if(c.nick==="K-Sick")c.nick="K-SicK"})}catch(e){}}
nmFix();setTimeout(nmFix,1500);{const _sc9=sched;sched=function(){nmFix();return _sc9.apply(this,arguments)}}{const _rd9=rdex;rdex=function(){nmFix();return _rd9.apply(this,arguments)}}

/* ===== 2号店：新しい朝の画面でも「2号店の日」「開業のお誘い」を出す（月末を繰り返す不具合の修正） ===== */
{const _smS=showMorning;showMorning=function(){const pre=R.phase==="prep"&&G.setup&&G.ow&&!G.over&&!(G.last&&!G.last.seen);
if(pre&&G.s2p&&!G.at2){s2Card();return}
if(pre&&!G.at2&&s2Ok()&&!G.s2no&&G.money>=S2ASK&&!G.ow.acted){s2Ask();return}
const r=_smS.apply(this,arguments);
try{if(s2Ok()&&G.s2no&&!$("#s2open")){const cd=$("#ov .mnc")||$("#ov .card");if(cd){const mb=cd.querySelector(".mb"),h=`<div style="padding:0 14px"><button id="s2open" style="width:100%;margin-top:6px" ${G.money>=S2COST?"":"disabled"}><b>🏪 2号店を開業する（${yen(S2COST)}）</b></button></div>`;if(mb)mb.insertAdjacentHTML("beforebegin",h);else cd.insertAdjacentHTML("beforeend",h)}}}catch(e){}
return r}}
/* 2号店の日が残ったまま営業開始しない（同じ日を繰り返さない） */
{const _st2=start;start=function(){if(R.phase==="prep"&&G.s2p&&!G.at2&&G.setup&&!G.over){s2Card();return}return _st2.apply(this,arguments)};$("#go").onclick=start}

/* ===== 年齢を出さないお客さん／雲紅亭の好きなフレーバーをレモンに ===== */
const NOAGE=["雲紅亭珍光","有馬 佑亮","さんてぃ","野郎シーシャ会"];
function noAge(c){return c.job==="人外"||c.job==="シーシャ屋"||NOAGE.includes(c.name)}
function ukoFix(){try{(G.cs||[]).forEach(c=>{if(c.name==="雲紅亭珍光"&&c.fl!==4)c.fl=4})}catch(e){}}
ukoFix();setTimeout(ukoFix,1500);{const _sc10=sched;sched=function(){ukoFix();return _sc10.apply(this,arguments)}}{const _rd10=rdex;rdex=function(){ukoFix();return _rd10.apply(this,arguments)}}

/* ===== 趣味の変更（今のセーブにも反映） ===== */
const HBFIX={"雲紅亭珍光":"風●店巡り","さんてぃ":"シーシャ屋めぐり","野郎シーシャ会":"シーシャ屋めぐり"};
function hbFix(){try{(G.cs||[]).forEach(c=>{const h=HBFIX[c.name];if(h&&c.hb!==h)c.hb=h})}catch(e){}}
hbFix();setTimeout(hbFix,1500);{const _sc11=sched;sched=function(){hbFix();return _sc11.apply(this,arguments)}}{const _rd11=rdex;rdex=function(){hbFix();return _rd11.apply(this,arguments)}}

/* ===== iPhoneのSafariで画面ごと拡大されないように（ピンチ・ダブルタップのズームを止める） ===== */
try{document.head.insertAdjacentHTML("beforeend",`<style>html,body{touch-action:manipulation;-webkit-text-size-adjust:100%;text-size-adjust:100%}</style>`)}catch(e){}
["gesturestart","gesturechange","gestureend"].forEach(t=>document.addEventListener(t,e=>{e.preventDefault()},{passive:false}));
document.addEventListener("touchmove",e=>{if(e.touches&&e.touches.length>1)e.preventDefault()},{passive:false});

/* ===== メニューから掃除を選んだ時：メニューを閉じてから掃除を始める ===== */
{const _cs=cleanStart;cleanStart=function(){try{const sh=$("#sheet");if(sh)sh.classList.remove("open")}catch(e){}return _cs.apply(this,arguments)}}
{const _cp=cleanPlay;cleanPlay=function(){try{const sh=$("#sheet");if(sh)sh.classList.remove("open")}catch(e){}return _cp.apply(this,arguments)}}

/* ===== メニューの回るキャラ（図鑑・着せ替え）にもメガネ・サングラスをボクセルで付ける ===== */
function glVox(a,c){if(!c||c.pump||!(isGl(c.acc)))return;const q=.25,sun=c.acc===1,sq=c.acc===10,FR=sun?"#0a0a10":(()=>{const h=(c.accC||"#333333").replace("#","");const v=parseInt(h.length===3?h.split("").map(x=>x+x).join(""):h,16),l=(.3*(v>>16&255)+.59*(v>>8&255)+.11*(v&255))/255;return l>.6?dkHex(c.accC,.72):c.accC||"#333333"})(),LN="#0a0a10",y=3,M=new Set(),P=(x,z,col)=>{const k=x+","+z;if(M.has(k))return;M.add(k);a.push([x,y,z,col,undefined,q])};
for(const lc of[1,3]){for(let x=lc-1;x<lc+1-1e-6;x+=q)for(let z=8.75;z<10.5-1e-6;z+=q){const cx=x+q/2-lc,cz=z+q/2-9.6;let inside,edge;if(sq){inside=Math.abs(cx)<=.9&&Math.abs(cz)<=.75;edge=inside&&(Math.abs(cx)>.62||Math.abs(cz)>.5)}else{const r=Math.hypot(cx/.9,cz/.85);inside=r<=1;edge=inside&&r>.66}
 if(edge)P(x,z,FR);else if(inside&&sun)P(x,z,LN)}}
P(1.75,9.75,FR);P(2,9.75,FR);for(let yy=1.75;yy<3;yy+=q){a.push([-.25,yy,9.75,FR,undefined,q]);a.push([4,yy,9.75,FR,undefined,q])}}
{const _fv=fmsVox;fmsVox=function(kind,x){const a=_fv.apply(this,arguments);try{if(kind==="p"&&a.length&&x&&!x.pump&&(isGl(x.acc)))a._gl={kind:x.acc,col:x.accC||"#333333"}}catch(e){}return a}}
/* お店と同じ「線のメガネ」を、回るキャラ表示の上に描く */
{const _vr=vRender;vRender=function(cv,vox,ang){const r=_vr.apply(this,arguments);try{const G0=vox&&vox._gl,b=vox&&vox._b;if(!G0||!b)return r;
const g=cv.getContext("2d"),W=cv.width,H=cv.height,co=Math.cos(ang),si=Math.sin(ang);if(co-si<.04)return r;
const hz=b.z1-b.z0,sc=Math.min(W*.42/(b.r*1.25+.5),H*.68/(hz+b.r*.55+.5)),ox=W/2,oy=H-H*.2;
const pr=(x,y,z)=>{const dx=x-b.cx,dy=y-b.cy,X=co*dx-si*dy,Y=si*dx+co*dy;return[ox+(X-Y)*.866*sc,oy-(z-b.z0)*sc+(X+Y)*.42*sc]};
const kind=G0.kind,col=G0.col,sun=kind===1,sq=kind===10,ly=3.04,pt=(lx,z,yy)=>pr(lx,yy===undefined?ly:yy,z);
const lens=lc=>{if(sq)return[[-.9,.7],[.9,.7],[.9,-.7],[-.9,-.7]].map(([dx,dz])=>pt(lc+dx,9.6+dz));const p=[];for(let i=0;i<24;i++){const t=i/12*Math.PI;p.push(pt(lc+Math.cos(t)*.85,9.6+Math.sin(t)*.8))}return p};
const fr=Math.max(1,sc*(sun?.3:.2));g.save();g.lineJoin="round";if(kind>=11){gEye(g,pt,sc,kind,col);g.restore();return r}
for(const lc of[1,3]){const ps=lens(lc);g.beginPath();ps.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();
 g.fillStyle=sun?"rgba(12,12,22,.93)":sq?"rgba(210,235,255,.12)":"rgba(210,235,255,.28)";g.fill();g.lineWidth=fr;g.strokeStyle=sun?"#0a0a10":col;g.stroke();
 const h1=sq?pt(lc-.55,10.15):pt(lc-.35,10.1),h2=sq?pt(lc-.35,9.85):pt(lc+.1,9.3);g.beginPath();g.moveTo(h1[0],h1[1]);g.lineTo(h2[0],h2[1]);g.lineWidth=Math.max(1,sc*(sq?.12:.18));g.strokeStyle=sun?"rgba(150,190,255,.75)":sq?"rgba(255,255,255,.5)":"rgba(255,255,255,.8)";g.stroke()}
const b1=pt(1.85,9.8),b2=pt(2.15,9.8);g.beginPath();g.moveTo(b1[0],b1[1]);g.lineTo(b2[0],b2[1]);g.lineWidth=fr;g.strokeStyle=sun?"#0a0a10":col;g.stroke();
for(const ex of[.15,3.85]){const a=pt(ex,9.8),e=pt(ex<2?-.05:4.05,9.8,1.2);g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(e[0],e[1]);g.stroke()}
g.restore()}catch(e){}return r}}

/* ===== 営業中はメニューを開けない ===== */
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#menu,#tixb,#gachab,#chekib,#visb");if(!b)return;if(R.phase==="run"){e.stopImmediatePropagation();e.preventDefault();try{toast(b.id==="menu"?"営業中はメニューを開けません":"営業中は使えません。閉店後か開店前に使ってください")}catch(_){}}},true);
try{document.head.insertAdjacentHTML("beforeend",`<style>body.bizrun #menu,body.bizrun #tixb,body.bizrun #gachab,body.bizrun #chekib,body.bizrun #visb{opacity:.45}</style>`)}catch(e){}
{const _h12=hud;hud=function(){const r=_h12.apply(this,arguments);try{const on=R.phase==="run";document.body.classList.toggle("bizrun",on);if(on){const sh=$("#sheet");if(sh&&sh.classList.contains("open"))sh.classList.remove("open")}}catch(e){}return r}}

/* ===== さんてぃのセリフ追加（遊んでいるデータにも） ===== */
function sanLs(){try{(G.cs||[]).forEach(c=>{if(c.name==="さんてぃ"&&Array.isArray(c.ls)&&!c.ls.includes("いいですねぇ"))c.ls.push("いいですねぇ")})}catch(e){}}
sanLs();setTimeout(sanLs,1500);{const _sc12=sched;sched=function(){sanLs();return _sc12.apply(this,arguments)}}

/* ===== 図鑑：前に選んだお客さんの黄色い枠が残らないように（メニューでは紫の選択表示だけにする） ===== */
try{document.head.insertAdjacentHTML("beforeend",`<style>#sheet #dg .dxt.on .dxi{outline:none!important}</style>`)}catch(e){}

/* ===== 話しかけた回数を「その日・そのお客さん」で数える（席を立って戻った時などに0に戻って「あまり話せなかった」と言わないように） ===== */
{const _tk=talk;talk=function(p){const b=p&&p.tp||0;const r=_tk.apply(this,arguments);try{if(p&&p.c&&(p.tp||0)>b){const c=p.c;if(c._tdD!==G.day){c._tdD=G.day;c._tdN=0}c._tdN+=1;p.tp=Math.max(p.tp,c._tdN)}}catch(e){}return r}}
{const _ev=endVisit;endVisit=function(c,p){try{if(p&&c&&c._tdD===G.day)p.tp=Math.max(p.tp||0,c._tdN||0)}catch(e){}return _ev.apply(this,arguments)}}

const ACC_E=[0,1,7,10],ACC_H=[0,2,3,5,9,8],ACC_M=[0,4,6];
function owAccInit(o){if(!o||o.accE!==undefined)return;const a=+o.acc||0,c=o.accC||"#333333";o.accE=ACC_E.includes(a)?a:0;o.accH=ACC_H.includes(a)?a:0;o.accM=ACC_M.includes(a)?a:0;o.accCE=o.accCH=o.accCM=c}
/* 描くためのデータ：目元（メガネ）は上から線で重ねるので acc に、頭・口元はブロックで描くので accV に */
function owAccLook(o){const e=+o.accH===8?0:(+o.accE||0),V=[[+o.accH||0,o.accCH||"#333333"],[+o.accM||0,o.accCM||"#333333"]].filter(v=>v[0]);return{acc:e,accC:o.accCE||"#333333",accV:V.length?V:null}}
function owAccD(){const o=G.ow||{};owAccInit(o);return{accE:+o.accE||0,accH:+o.accH||0,accM:+o.accM||0,accCE:o.accCE||"#333333",accCH:o.accCH||"#333333",accCM:o.accCM||"#333333"}}
function owAccSync(){const o=G.ow;if(!o)return;owAccInit(o);const L=owAccLook(o);Object.assign(o,{acc:L.acc,accC:L.accC});o.accV=L.accV;if(typeof OW!=="undefined"&&OW.c){Object.assign(OW.c,L);OW._pc=null}}
try{["accCE","accCH","accCM"].forEach(k=>{OWPAL[k]=OWPAL.accC})}catch(e){}
/* ブロックの装飾品を2つ重ねる：1つ目で描いて、2つ目は「付けた時に増える／消える（帽子で隠れる髪など）」ブロックだけ足し引きする */
{const _pv2=pv;pv=function(a,ox,Y0,f,c){if(!c||!c.accV||!c.accV.length)return _pv2.apply(this,arguments);const rest=[].slice.call(arguments,5),V=c.accV,K=v=>v[0]+","+v[1]+","+v[2]+","+(v[5]||1);
 const base=[],r=_pv2.call(this,base,ox,Y0,f,Object.assign({},c,{acc:V[0][0],accC:V[0][1],accV:null,akU:1}),...rest);let out=base;
 for(const[ac,col]of V.slice(1)){const A=[],B=[];_pv2.call(this,A,ox,Y0,f,Object.assign({},c,{acc:ac,accC:col,accV:null,akU:1}),...rest);_pv2.call(this,B,ox,Y0,f,Object.assign({},c,{acc:0,accV:null}),...rest);
  const kb=new Map(B.map(v=>[K(v),v[3]])),ka=new Map(A.map(v=>[K(v),v[3]]));const rm=new Set(B.filter(v=>ka.get(K(v))!==v[3]).map(K)),add=A.filter(v=>kb.get(K(v))!==v[3]);out=out.filter(v=>!rm.has(K(v))).concat(add)}
 out.forEach(v=>a.push(v));return r}}
{const _al=applyOwLook;applyOwLook=function(){const r=_al.apply(this,arguments);try{owAccSync()}catch(e){}return r}}
{const _es=owEdSave;owEdSave=function(){let ex=null;if(OWD){if(+OWD.accH===8)OWD.accE=0;ex={accE:+OWD.accE||0,accH:+OWD.accH||0,accM:+OWD.accM||0,accCE:OWD.accCE,accCH:OWD.accCH,accCM:OWD.accCM};const L=owAccLook(OWD);OWD.acc=L.acc;OWD.accC=L.accC}
 const r=_es.apply(this,arguments);if(ex&&G.ow){Object.assign(G.ow,ex);owAccSync();save();OWD=null;try{owEdRender();owEdStage()}catch(e){}}return r}}
try{owAccSync()}catch(e){}setTimeout(()=>{try{owAccSync()}catch(e){}},1200);

/* ===== 新しい装飾品：目元6種（線で重ねて描く）・頭6種（ブロック）。ガチャで手に入る店長用 ===== */
function isGl(a){a=+a||0;return a===1||a===7||a===10||(a>=11&&a<=16)}
const OWA=[["とがったサングラス",11],["丸メガネ（細ぶち）",12],["ハーフリム",13],["色つきレンズ",14],["片メガネ",15],["ゴーグル",16],["ハンチング帽",17],["バケットハット",18],["ターバン",19],["ハチマキ",20],["ベレー帽",21],["王冠",22]];
try{OWL.a=OWA;OWA.forEach((x,i)=>{const k="a"+(i+1);if(!OWG.includes(k))OWG.push(k);OWC[k]=["ガチャ"]})}catch(e){}
const accOwn=id=>id<11||owHas("a"+(OWA.findIndex(x=>x[1]===id)+1));
try{[11,12,13,14,15,16].forEach(i=>ACC_E.push(i));ACC_H.splice(ACC_H.indexOf(8),0,17,18,19,20,21,22)}catch(e){}
function gEye(g,pt,s,kind,col){const path=p=>{g.beginPath();p.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.closePath()},line=(a,b,c,w)=>{g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);if(c)g.strokeStyle=c;if(w)g.lineWidth=Math.max(1,w);g.stroke()},circ=(lc,rx,rz,yy)=>{const p=[];for(let i=0;i<24;i++){const t=i/12*Math.PI;p.push(pt(lc+Math.cos(t)*rx,9.6+Math.sin(t)*rz,yy))}return p};
 g.lineJoin="round";col=col||"#333333";
 if(kind===11){const L=[[-1.05,.25],[-.2,.42],[.85,.4],[1.0,.1],[.75,-.4],[-.3,-.45],[-.95,-.15]];for(const[lc,m]of[[1,-1],[3,1]]){const q=L.map(([a,b])=>{const x=m<0?-a:a;return pt(lc+x,9.6+b+(x*m>0?.25:0))});path(q);g.fillStyle="rgba(205,45,110,.88)";g.fill();g.lineWidth=Math.max(1,s*.1);g.strokeStyle=col;g.stroke()}line(pt(1.95,9.95),pt(2.05,9.95),col,s*.12);line(pt(.05,9.95),pt(-.05,9.95,1.6),col,s*.12);line(pt(3.95,9.95),pt(4.05,9.95,1.6),col,s*.12)}
 else if(kind===12){for(const lc of[1,3]){path(circ(lc,.62,.62));g.fillStyle="rgba(210,235,255,.25)";g.fill();g.lineWidth=Math.max(1,s*.12);g.strokeStyle=col;g.stroke()}line(pt(1.62,9.75),pt(2.38,9.75),col,s*.12);line(pt(.38,9.75),pt(-.05,9.75,1.4),col,s*.1);line(pt(3.62,9.75),pt(4.05,9.75,1.4),col,s*.1)}
 else if(kind===13){for(const lc of[1,3]){const p=[[-.85,.55],[.85,.55],[.85,-.45],[-.85,-.45]].map(([a,b])=>pt(lc+a,9.6+b));path(p);g.fillStyle="rgba(210,235,255,.22)";g.fill();line(p[0],p[1],col,s*.28);g.lineWidth=Math.max(1,s*.06);g.strokeStyle="rgba(60,60,60,.5)";g.beginPath();g.moveTo(p[1][0],p[1][1]);g.lineTo(p[2][0],p[2][1]);g.lineTo(p[3][0],p[3][1]);g.lineTo(p[0][0],p[0][1]);g.stroke()}line(pt(1.85,10.1),pt(2.15,10.1),col,s*.2);line(pt(.15,10.1),pt(-.05,10.1,1.3),col,s*.16);line(pt(3.85,10.1),pt(4.05,10.1,1.3),col,s*.16)}
 else if(kind===14){for(const lc of[1,3]){path(circ(lc,.85,.7));g.fillStyle="rgba(255,196,40,.6)";g.fill();g.lineWidth=Math.max(1,s*.16);g.strokeStyle=col;g.stroke()}line(pt(1.85,9.8),pt(2.15,9.8),col,s*.16);line(pt(.15,9.8),pt(-.05,9.8,1.3),col,s*.14);line(pt(3.85,9.8),pt(4.05,9.8,1.3),col,s*.14)}
 else if(kind===15){path(circ(3,.7,.7));g.fillStyle="rgba(210,235,255,.3)";g.fill();g.lineWidth=Math.max(1,s*.18);g.strokeStyle=col;g.stroke();g.setLineDash([s*.15,s*.12]);line(pt(3.6,9.2),pt(3.9,7.6),col,s*.1);g.setLineDash([])}
 else if(kind===16){line(pt(.05,9.6,3.1),pt(-.1,9.6,0),"#4a3a2a",s*.55);line(pt(3.95,9.6,3.1),pt(4.1,9.6,0),"#4a3a2a",s*.55);for(const lc of[1,3]){path(circ(lc,.95,.85,3.2));g.fillStyle="rgba(90,200,220,.55)";g.fill();g.lineWidth=Math.max(1,s*.32);g.strokeStyle=col;g.stroke()}line(pt(1.9,9.6,3.2),pt(2.1,9.6,3.2),col,s*.3)}}
{const _gf=glFx;glFx=function(ox,Y0,f,sit,dr,kind,col,ly,zo){if(!(kind>=11&&kind<=16))return _gf.apply(this,arguments);zo=zo||0;const M=(lx,y)=>sit?[ox+lx,f>0?Y0+y:Y0+6-y]:dr===0?[ox+lx,Y0+y]:dr===2?[ox+4-lx,Y0+3-y]:dr===1?[ox+y,Y0+4-lx]:[ox+3-y,Y0+lx];
 const o=M(0,0),nx=M(0,1),n=[nx[0]-o[0],nx[1]-o[1]],c=M(2,ly),pos=[c[0]+n[0]*.4,c[1]+n[1]*.4,9.5-zo];
 return{pos,fn:k=>{if(n[0]*k.cx+n[1]*k.cy<.04)return;const pt=(lx,z,yy)=>{const m=M(lx,yy===undefined?ly:yy);return P3(m[0],m[1],z-zo,k)};cx.save();gEye(cx,pt,k.s,kind,col);cx.restore()}}}}

/* ===== ガチャ専用画面（ボクセルのシーシャ台が点火→煙→カード） ===== */
const GTH={fol:["#4a7de0","#cfe0ff","フォロワー"],ev:["#8e5bd6","#e6d6ff","イベント"],tix:["#e0558f","#ffd6e8","招待チケット"],flv:["#3aa86a","#d6f5e2","フレーバー"],deco:["#2bb3c9","#d2f4f9","チェキ素材"],dex:["#e08a2b","#ffe6c8","図鑑"],ow:["#f0b93a","#fff0b0","着せ替え"]};
const GNEW={ow:1,deco:1,flv:1,dex:1};
function gvr(g,vox,ang,ox,oy,sc,cx,cy,cz,LT){LT=LT||[1,.78,.62];const co=Math.cos(ang),si=Math.sin(ang),shd=(hex,k)=>{const n=parseInt(hex.slice(1),16),f=c=>Math.max(0,Math.min(255,Math.round(c*k)));return`rgb(${f(n>>16&255)},${f(n>>8&255)},${f(n&255)})`};
 const pr=(x,y,z)=>{const dx=x-cx,dy=y-cy,X=co*dx-si*dy,Y=si*dx+co*dy;return[ox+(X-Y)*.866*sc,oy-(z-cz)*sc+(X+Y)*.42*sc]};
 const L=vox.map(v=>{const s=v[5]||1,dx=v[0]+s/2-cx,dy=v[1]+s/2-cy;return[(co*dx-si*dy)+(si*dx+co*dy),v[2],v]}).sort((p,q)=>p[0]-q[0]||p[1]-q[1]);
 const fx=co+si>0,fy=co-si>0,poly=(p,c)=>{g.fillStyle=c;g.beginPath();g.moveTo(p[0][0],p[0][1]);for(let i=1;i<4;i++)g.lineTo(p[i][0],p[i][1]);g.closePath();g.fill();g.strokeStyle=c;g.lineWidth=.6;g.stroke()};
 for(const[,,v]of L){const s=v[5]||1,x=v[0],y=v[1],z=v[2],c=v[3],a0=pr(x,y,z+s),a1=pr(x+s,y,z+s),a2=pr(x+s,y+s,z+s),a3=pr(x,y+s,z+s),b0=pr(x,y,z),b1=pr(x+s,y,z),b2=pr(x+s,y+s,z),b3=pr(x,y+s,z);
  if(fx)poly([a1,a2,b2,b1],shd(c,LT[1]));else poly([a0,a3,b3,b0],shd(c,LT[1]));if(fy)poly([a3,a2,b2,b3],shd(c,LT[2]));else poly([a0,a1,b1,b0],shd(c,LT[2]));poly([a0,a1,a2,a3],shd(c,LT[0]))}}
const gbox=(v,x0,x1,y0,y1,z0,z1,c,s)=>{s=s||.5;for(let x=x0;x<x1-1e-6;x+=s)for(let y=y0;y<y1-1e-6;y+=s)for(let z=z0;z<z1-1e-6;z+=s)v.push([x,y,z,c,0,s])};
const gcyl=(v,cx,cy,r,z0,z1,c,s,hol)=>{s=s||.5;for(let x=cx-r;x<cx+r;x+=s)for(let y=cy-r;y<cy+r;y+=s){const d=Math.hypot(x+s/2-cx,y+s/2-cy);if(d>r||(hol&&d<r-hol))continue;for(let z=z0;z<z1-1e-6;z+=s)v.push([x,y,z,c,0,s])}};
function gMachine(t,st){const v=[];gcyl(v,0,0,9,0,1,"#3b2a1e",1);gcyl(v,0,0,8,1,1.5,"#5a3f2b",.5);
 const prof=z=>z<2?4.2:z<6?4.6-.15*(z-2):z<9?4-.8*(z-6):1.4;for(let z=1.5;z<11;z+=.5){const r=prof(z-1.5),w=z<6.5;gcyl(v,0,0,r,z,z+.5,w?st.water:"#cfeef3",.5,w?0:.6)}
 if(st.bub)for(let i=0;i<10;i++){const p=(i*.37+t*1.3)%1;v.push([-2+(i*1.7)%4,-1+(i%3),1.5+p*5,"#ffffff",0,.5])}
 gcyl(v,0,0,.7,11,21,"#c9cdd4",.5);gbox(v,-1.5,1.5,-1.5,1.5,15,15.5,"#9aa0aa");gbox(v,-2.5,2.5,-2.5,2.5,17.5,18,"#d9d9d9");
 for(let i=0;i<24;i++){const a=i/23;v.push([1+a*7,Math.sin(a*3)*1.5,16-a*13+Math.sin(a*3.1)*2,"#6658a6",0,1])}
 for(let z=21;z<24;z+=.5)gcyl(v,0,0,1.4+(z-21)*.6,z,z+.5,"#b5553a",.5);gcyl(v,0,0,3.6,24,24.5,"#e2e2e2",.5);
 const ig=st.ig,h=x=>Math.max(0,Math.min(255,x|0)).toString(16).padStart(2,"0"),cc=ig<=0?"#2a2a2a":"#"+h(255*ig+40*(1-ig))+h(110*ig+40*(1-ig)+30*Math.sin(t*14)*ig)+h(30);
 [[-2,-1],[1,-1.5],[-.5,1]].forEach(([x,y])=>gbox(v,x,x+1.5,y,y+1.5,24.5,25.5,cc));
 st.sparks.forEach(([x,y,z])=>v.push([x,y,z,"#ffb347",0,.5]));st.smoke.forEach(([x,y,z,s,c])=>v.push([x,y,z,c,0,s]));return v}
function gCard(col,lt){const v=[],s=.5,Wc=11,Hc=15,Q=[".XXX.","X...X","....X","...X.","..X..","..X..",".....","..X.."];
 for(let x=0;x<Wc;x+=s)for(let z=0;z<Hc;z+=s){const fr=x<1||x>=Wc-1||z<1||z>=Hc-1;let b="#4b3f8a";if(fr)b="#ffffff";else{const qx=Math.floor(x-3),qr=Q[Math.floor(11.5-z)]||"";if(qx>=0&&qr[qx]==="X")b="#ffffff";else if(((x*2+z*2)|0)%4===0)b="#5a4d9e"}v.push([x,0,z,b,0,s]);
  let f=fr?(((x*2+z*2)|0)%3===0?lt:col):(z>=3&&z<13&&x>=1.5&&x<9.5)?"#fffdf6":col;v.push([x,s,z,f,0,s])}return v}
function gachaPanel(){const old=$("#gap");if(old)old.remove();const done=G.gaD===G.day,ok=G.setup&&G.ow&&!G.over;
 const d=document.createElement("div");d.id="gap";d.style.cssText="position:fixed;inset:0;z-index:300;background:#0c1b19;overflow:hidden;touch-action:none";
 d.innerHTML=`<canvas id="gacv" style="position:absolute;inset:0;width:100%;height:100%"></canvas>
<div style="position:absolute;left:14px;right:14px;top:calc(env(safe-area-inset-top,0px) + 12px);height:58px;border-radius:18px;background:#005d4d;display:flex;align-items:center;justify-content:space-between;padding:0 12px 0 16px;font-family:'Dela Gothic One',sans-serif;color:#fff;font-weight:900"><span style="font-size:19px;letter-spacing:1px">SHEESHA GACHA</span><button data-gx="list" style="background:#6658a6;color:#fff;border:0;border-radius:16px;padding:7px 12px;font-weight:900;font-size:12px">景品一覧</button></div>
<div id="galist" hidden style="position:absolute;left:14px;right:14px;top:calc(env(safe-area-inset-top,0px) + 78px);background:#f3f1ea;color:#123a33;border-radius:14px;padding:10px 12px;font-size:12px;line-height:1.8;z-index:3"></div>
<div id="gamsg" style="position:absolute;left:0;right:0;top:calc(env(safe-area-inset-top,0px) + 92px);text-align:center;color:#ffd86b;font-weight:900;font-size:20px;pointer-events:none"></div>
<div id="gares" style="position:absolute;left:24px;right:24px;bottom:calc(env(safe-area-inset-bottom,0px) + 104px);text-align:center;color:#fff;pointer-events:none"></div>
<div id="gabtn" style="position:absolute;left:16px;right:16px;bottom:calc(env(safe-area-inset-bottom,0px) + 22px);display:flex;gap:10px"></div>`;
 document.body.appendChild(d);
 const cvs=$("#gacv"),g=cvs.getContext("2d");let W=0,H=0;const fit=()=>{const r=d.getBoundingClientRect(),dp=Math.min(2,window.devicePixelRatio||1);W=r.width;H=r.height;cvs.width=W*dp|0;cvs.height=H*dp|0;g.setTransform(dp,0,0,dp,0,0)};fit();
 let seed=11;const RN=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
 const bok=[...Array(16)].map(()=>[RN(),RN()*.75,10+RN()*26,RN()]),spS=[...Array(30)].map(()=>[RN()*2-1,RN()*2-1,RN(),RN()]),smS=[...Array(60)].map(()=>[RN(),RN()*2-1,RN()*2-1,RN()]),conf=[...Array(70)].map(()=>[RN(),-RN()*300,RN()*6.28,RN(),["#f5c542","#ff6fb1","#6fd3ff","#7ee08a","#ffffff","#b08cff"][RN()*6|0]]);
 const E=t=>t<0?0:t>1?1:t,ease=t=>1-Math.pow(1-E(t),3),io=t=>{t=E(t);return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2};
 let st="idle",t0=0,res=null,kk=null,card=null,raf=0;const sc0=()=>Math.min(W/390,H/844);
 const btns=()=>{const b=$("#gabtn");if(!b)return;const B=(k,txt,on,dis)=>`<button data-gx="${k}" ${dis?"disabled":""} style="flex:1;height:58px;border-radius:29px;border:${on?"0":"2px solid #fff"};background:${on?"#6658a6":"#fff"};color:${on?"#fff":"#005d4d"};font-weight:900;font-size:16px;${dis?"opacity:.5":""}">${txt}</button>`;
  if(st==="idle")b.innerHTML=B("x","とじる",0)+(done||G.gaD===G.day?B("none","今日はもう回しました",1,1):B("ad","▶ 広告を見て回す",1,!ok));
  else if(st==="anim")b.innerHTML=`<div style="flex:1"></div><button data-gx="skip" style="height:38px;border-radius:19px;border:0;background:rgba(255,255,255,.15);color:#fff;font-weight:900;padding:0 16px">スキップ ▶▶</button>`;
  else if(st==="res")b.innerHTML=B("x","とじる",0)+(kk==="ow"?B("try","着せ替えで試す ▶",1):"");else b.innerHTML=""};
 const draw=now=>{if(!document.body.contains(d))return;const t=st==="anim"||st==="res"?(now-t0)/1000:0,s0=sc0(),cx=W/2,th=GTH[kk]||["#f0b93a","#fff0b0"],col=t>2.6&&kk?th[0]:null;
  g.clearRect(0,0,W,H);const bg=g.createLinearGradient(0,0,0,H);bg.addColorStop(0,"#0c1b19");bg.addColorStop(1,"#1d3d36");g.fillStyle=bg;g.fillRect(0,0,W,H);
  bok.forEach(([x,y,r,p])=>{g.fillStyle=`rgba(255,${200+p*40|0},130,${.05+.04*Math.sin(now/700+p*6)})`;g.beginPath();g.arc(x*W,y*H,r,0,7);g.fill()});
  const my=H*.74,tg=g.createRadialGradient(cx,my,10,cx,my,190*s0);tg.addColorStop(0,col?col+"66":"rgba(102,88,166,.38)");tg.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=tg;g.fillRect(0,0,W,H);
  const ig=st==="idle"?0:ease((t-.3)/.8),sparks=[],smoke=[];
  if(t>.3&&t<1.9)spS.forEach(([vx,vy,dd])=>{const lt=t-.3-dd*.6;if(lt<0||lt>.9)return;sparks.push([vx*6*lt,vy*6*lt,25.5+14*lt-14*lt*lt])});
  if(t>1.1)smS.forEach(([dd,sx,sy,p])=>{const lt=t-1.1-dd*1.5;if(lt<0||lt>2.6)return;const sz=lt<.6?.5:lt<1.4?1:1.5;const z=26+lt*9,x=sx*(1+lt*3)+Math.sin(lt*2+p*6)*1.5,y=sy*(1+lt*2.4);const c=t>2.6&&kk?[th[0],th[1],"#ffffff"][(p*3)|0]:["#e9eef2","#ffffff","#d7dde2"][(p*3)|0];smoke.push([Math.round(x*2)/2,Math.round(y*2)/2,Math.round(z*2)/2,sz,c])});
  const shake=(t>.3&&t<2.7&&st==="anim")?Math.sin(now/16)*1.2:0;
  gvr(g,gMachine(now/1000,{water:col||"#7f6fc4",ig,bub:t>1.1&&t<3.4,sparks,smoke}),5.62+Math.sin(now/1400)*.06,cx+shake,my,10.5*s0,0,0,0);
  if(t>2.55&&t<3.0&&kk){g.fillStyle=`rgba(255,250,230,${(1-(t-2.55)/.45)*.7})`;g.fillRect(0,0,W,H)}
  if(t>3.0&&card){const k=ease((t-3.0)/.9),cy=-260*s0+k*(H*.47+260*s0),fl=io((t-4.0)/.7),a=5.62+Math.PI*(1-fl);
   if(t>4.4){g.save();g.translate(cx,cy-70*s0);g.rotate(now/1600);for(let i=0;i<12;i++){g.rotate(Math.PI/6);g.fillStyle=`rgba(255,240,200,${.14*E((t-4.4)/.4)})`;g.beginPath();g.moveTo(0,0);g.lineTo(-24,-H);g.lineTo(24,-H);g.closePath();g.fill()}g.restore()}
   gvr(g,card,a,cx,cy,15*s0,5.5,.5,7.5,[1.05,.85,1]);
   if(fl>=1&&res){const k2=ease((t-4.7)/.35);g.save();g.globalAlpha=k2;g.font=`${Math.round(84*s0)}px sans-serif`;g.textAlign="center";g.textBaseline="middle";g.fillText(res[0],cx-2*s0,cy-4*s0);g.restore();
    if(GNEW[kk]&&t>4.8){const k3=ease((t-4.8)/.3);g.save();g.translate(cx+92*s0,cy-150*s0);g.rotate(-.2);g.scale(k3,k3);g.fillStyle="#ff3b6b";g.beginPath();g.roundRect?g.roundRect(-34,-16,68,32,16):g.rect(-34,-16,68,32);g.fill();g.font="900 16px sans-serif";g.fillStyle="#fff";g.textAlign="center";g.textBaseline="middle";g.fillText("NEW!",0,1);g.restore()}}}
  if(t>4.8&&st!=="idle")conf.forEach(([x,y0,a,p,c])=>{const lt=t-4.8,y=y0+lt*(180+p*120),xx=x*W+Math.sin(lt*3+p*6)*20;if(y>H)return;g.save();g.translate(xx,y);g.rotate(a+lt*5);g.fillStyle=c;g.fillRect(-4,-4,8,8);g.restore()});
  if(st==="anim"&&t>=5){st="res";btns();const rs=$("#gares");if(rs&&res)rs.innerHTML=`<div style="display:inline-block;background:rgba(0,0,0,.55);border-radius:14px;padding:10px 16px"><b style="font-size:18px">${esc(res[1])}</b><div style="font-size:12.5px;color:#d9f2ea;margin-top:4px">${esc(res[2])}</div></div>`}
  const m=$("#gamsg");if(m){const tx=st==="anim"&&t>2.6&&t<3.6&&kk?"！？ 煙の色が変わった…":"";if(m.textContent!==tx)m.textContent=tx}
  raf=requestAnimationFrame(draw)};
 const start=()=>{st="anim";kk=gachaRoll();res=gachaGive(kk);save();try{hud();xrow()}catch(e){}card=gCard(GTH[kk][0],GTH[kk][1]);t0=performance.now();btns()};
 d.onclick=e=>{const b=e.target.closest("[data-gx]");if(!b||b.disabled)return;const k=b.dataset.gx;
  if(k==="x"){if(st==="anim"||st==="ad")return;cancelAnimationFrame(raf);d.remove();return}
  if(k==="list"){const L=$("#galist");if(L.hidden){const tot=GACHA.filter(([q])=>gachaOk(q)).reduce((a,b)=>a+b[1],0)||1;L.innerHTML=GACHA.map(([q,w])=>{const on=gachaOk(q);return`<div style="display:flex;justify-content:space-between;${on?"":"opacity:.4"}"><span>${{fol:"📱 フォロワー+8%（最低50人）",ev:"⚡ 次の営業日にイベント確定",tix:"🎟 招待チケット+1",flv:"🍃 フレーバー1種解禁",deco:"📸 チェキの限定素材",dex:"📖 図鑑に1人登録",ow:"👕 着せ替え"}[q]}${q==="ow"?`（${OWG.filter(x=>owHas(x)).length}/${OWG.length}）`:""}</span><b>${on?(w/tot*100).toFixed(1)+"%":"コンプリート"}</b></div>`}).join("")+`<div style="font-size:11px;color:#6b7f7a;margin-top:4px">持っているものは出ません。全部そろった景品は抽選から外れます</div>`}L.hidden=!L.hidden;return}
  if(k==="skip"){if(st==="anim")t0=performance.now()-4800;return}
  if(k==="try"){cancelAnimationFrame(raf);d.remove();try{$("#sheet").classList.add("open");fmTab("owner");setTimeout(()=>{const b2=document.querySelector('[data-owk="edit"]');b2&&b2.click()},120)}catch(_){}return}
  if(k==="ad"&&G.gaD!==G.day&&ok){st="ad";G.gaD=G.day;save();btns();let n=5;const box=document.createElement("div");box.style.cssText="position:absolute;inset:0;z-index:5;background:rgba(10,8,16,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#cfc6dc";d.appendChild(box);
   const tk=()=>{box.innerHTML=`<div style="font-size:12px;opacity:.7">広告（テスト用のダミー）</div><div style="font-size:40px;margin:8px 0">📺</div><div style="font-size:14px">あと <b>${n}</b> 秒</div>`;if(n--<=0){clearInterval(iv);box.remove();start()}};const iv=setInterval(tk,1000);tk()}};
 window.addEventListener("resize",fit);btns();raf=requestAnimationFrame(draw)}

/* ===== 着ぐるみ（店長だけ）：体ぜんぶの着せ替え。目元（メガネなど）だけ一緒に付けられる ===== */
const KGL=[0,
 {n:"トラ",e:"🐯",q:"プレイ1年",f:()=>kgYr()>=12,c:"#f08a24",stripe:"#2a1a10",belly:"#fff3dc",paw:"#fff3dc",
  x:b=>{b(.25,1,1,1.75,12,12.75,"#f08a24");b(3,3.75,1,1.75,12,12.75,"#f08a24");b(.5,.75,1.75,1.85,12,12.5,"#fff3dc");b(3.25,3.5,1.75,1.85,12,12.5,"#fff3dc");for(let i=0;i<10;i++)b(1.75,2.25,.75-i*.25,1-i*.25,3.5+i*.12,4+i*.12,i%3===0?"#2a1a10":"#f08a24")}},
 {n:"くま",e:"🐻",q:"図鑑100人",f:()=>G.cs.filter(c=>c.met).length>=100,c:"#8b5a2b",belly:"#e8c99a",paw:"#5c3a1b",
  x:b=>{b(0,1,1,2,12,13,"#8b5a2b");b(3,4,1,2,12,13,"#8b5a2b");b(.25,.75,2,2.1,12.25,12.75,"#e8c99a");b(3.25,3.75,2,2.1,12.25,12.75,"#e8c99a");b(1.5,2.5,.5,1,3.5,4.5,"#8b5a2b")}},
 {n:"ねこ",e:"🐱",q:"チェキを50回撮る",f:()=>(G.ckN||0)>=50,c:"#9a9a9a",belly:"#e8e8e8",paw:"#e8e8e8",
  x:b=>{for(let i=0;i<4;i++){b(.25+i*.125,1.25-i*.125,1,1.5,12+i*.25,12.25+i*.25,"#9a9a9a");b(2.75+i*.125,3.75-i*.125,1,1.5,12+i*.25,12.25+i*.25,"#9a9a9a")}b(.5,1,1.5,1.6,12.25,12.5,"#ffb3c6");b(3,3.5,1.5,1.6,12.25,12.5,"#ffb3c6");for(let i=0;i<14;i++)b(1.75,2.25,.75-i*.2,.95-i*.2,3.5+Math.sin(i*.4)*1.2+i*.2,3.75+Math.sin(i*.4)*1.2+i*.2,"#9a9a9a")}},
 {n:"うさぎ",e:"🐰",q:"フォロワー10,000人",f:()=>((G.ow||{}).fol||0)>=10000,c:"#f4f4f4",belly:"#ffffff",paw:"#ffd6e0",
  x:b=>{b(.75,1.5,1,1.5,12,14.75,"#f4f4f4");b(2.5,3.25,1,1.5,12,14.75,"#f4f4f4");b(1,1.25,1.5,1.6,12.25,14.5,"#ffb3c6");b(2.75,3,1.5,1.6,12.25,14.5,"#ffb3c6");b(1.5,2.5,.25,1,3.75,4.75,"#ffffff")}},
 {n:"パンダ",e:"🐼",q:"バトルで3回優勝",f:()=>(G.batW||0)>=3,c:"#f4f4f4",arm:"#1e1e1e",leg:"#1e1e1e",paw:"#1e1e1e",belly:"#ffffff",
  x:b=>{b(0,1,1,2,12,13,"#1e1e1e");b(3,4,1,2,12,13,"#1e1e1e")}},
 {n:"ペンギン",e:"🐧",q:"冬（12〜2月）に通算30日営業",f:()=>(G.kgWin||0)>=30,c:"#22252c",belly:"#ffffff",paw:"#f5a623",
  x:b=>{b(1.5,2.5,3,3.5,10.75,11.25,"#f5a623")}},
 {n:"カエル",e:"🐸",q:"雨の日に通算20日営業",f:()=>(G.kgRain||0)>=20,c:"#7ac943",belly:"#e6f5c8",paw:"#5aa02c",
  x:b=>{b(.25,1.5,1.5,2.75,12,13,"#ffffff");b(2.5,3.75,1.5,2.75,12,13,"#ffffff");b(.75,1.25,2.75,2.9,12.25,12.75,"#111111");b(2.75,3.25,2.75,2.9,12.25,12.75,"#111111");b(.25,1.5,1.5,2.75,13,13.25,"#7ac943");b(2.5,3.75,1.5,2.75,13,13.25,"#7ac943")}},
 {n:"きょうりゅう",e:"🦖",q:"プレイ3年",f:()=>kgYr()>=36,c:"#5cb85c",belly:"#f2e6a6",paw:"#3d8b3d",
  x:b=>{for(let i=0;i<7;i++){const z=11.75-i*1.2,y=z>=8?-.25:.75;b(1.75,2.25,y,y+.25,z,z+.5,"#f5d34a")};b(1.75,2.25,.75,1.25,12,12.5,"#f5d34a");b(1.75,2.25,1.75,2.25,12,12.5,"#f5d34a");for(let i=0;i<12;i++)b(1.25+i*.04,2.75-i*.04,.75-i*.25,1-i*.25,1.5+i*.1,2.5,"#5cb85c")}}];
function kgYr(){return Math.max(G.month||0,Math.floor(((G.day||1)-1)/7))}
const kgOwn=id=>(G.kgH||[]).includes(+id);
/* 条件を満たしたら「届く予定」に並べる（届くのは1日1個） */
function kgChk(){if(!G.setup||!G.ow)return;G.kgQ=G.kgQ||[];for(let i=1;i<KGL.length;i++){if(kgOwn(i)||G.kgQ.includes(i))continue;let ok=0;try{ok=KGL[i].f()}catch(e){}if(ok){G.kgQ.push(i);save()}}}
{const _hk=hud;hud=function(){_hk.apply(this,arguments);try{kgChk()}catch(e){}}}
/* 冬・雨の日の営業日数を数える（このアップデートから） */
{const _sk=start;start=function(){const r=_sk.apply(this,arguments);try{if(R.phase==="run"&&G.kgCD!==G.day){G.kgCD=G.day;if([12,1,2].includes(MN[(G.month||0)%12]))G.kgWin=(G.kgWin||0)+1;if(G.wx&&G.wx[G.wd]==="rain")G.kgRain=(G.kgRain||0)+1;save()}}catch(e){}return r}}
/* ブロックを作る：顔まわり以外を動物の色に塗りかえて、耳・しっぽなどを足す */
{const _pvk=pv;pv=function(a,ox,Y0,f,c,sit,dr,hd,nh){const id=c&&+c.kg,A=id&&KGL[id];if(!A||c.sp)return _pvk.apply(this,arguments);
 const c2=Object.assign({},c,{kg:0,accV:null,acc:isGl(c.acc)?c.acc:0,shirt:A.c,top:0,t2:0,pants:A.leg||A.c,bot:0,b2:0,shoe:A.paw||A.c,hair:A.c,hs:0,h2:0});
 const T=[],r=_pvk.call(this,T,ox,Y0,f,c2,sit,dr,hd,nh),FT=c.fat|0,aL=FT===2?0:FT?.5:1,aR=FT===2?4:FT?3.5:3,yF=FT===2?4.5:FT?4:3,sk=String(c.skin).toLowerCase();
 const inv=(X,Y,s)=>{X-=ox;Y-=Y0;if(sit)return[X,f>0?Y:6-Y-s];if(dr===2)return[4-X-s,3-Y-s];if(dr===1)return[4-Y-s,X];if(dr===3)return[Y,3-X-s];return[X,Y]};
 const fw=(x,y,s)=>{if(sit)return[x,f>0?y:6-y-s];if(dr===2)return[4-x-s,3-y-s];if(dr===1)return[y,4-x-s];if(dr===3)return[3-y-s,x];return[x,y]};
 T.forEach(q=>{const s=q[5]||1,[x,y]=inv(q[0],q[1],s),z=q[2];let col=A.c;
  if(z>=8){const face=y+s>=2.99&&z>=8.5&&z<10.75&&x>=.5&&x<3.5;if(face){a.push(q);return}}
  else if(z<.5&&!sit)col=A.paw||A.c;else if(z<4)col=A.leg||A.c;
  else{const arm=x<aL||x>=aR;if(arm)col=String(q[3]).toLowerCase()===sk?(A.paw||A.c):(A.arm||A.c);else if(y+s>=yF-.01&&x>=1.25&&x<2.75&&z>=4.5&&z<7.5)col=A.belly||A.c}
  if(A.stripe&&z>=1&&z<12&&col===A.c&&Math.floor(z*2)%3===0)col=A.stripe;
  a.push([q[0],q[1],q[2],col,q[4],q[5]])});
 const S=.25,b=(x0,x1,y0,y1,z0,z1,col)=>{for(let x=x0;x<x1-1e-6;x+=S)for(let y=y0;y<y1-1e-6;y+=S){const[X,Y]=fw(x,y,S);for(let z=z0;z<z1-1e-6;z+=S)a.push([ox+X,Y0+Y,z,col,undefined,S])}};
 /* 顔のまわりのフードのふち */
 const hc=A.hood||A.c;b(.25,3.75,3,3.25,10.75,11,hc);b(.25,3.75,3,3.25,8.25,8.5,hc);b(.25,.5,3,3.25,8.5,10.75,hc);b(3.5,3.75,3,3.25,8.5,10.75,hc);
 try{A.x(b)}catch(e){}return r}}
/* 装飾品の見た目：着ぐるみの時は目元だけ */
{const _al2=owAccLook;owAccLook=function(o){const L=_al2.apply(this,arguments),k=+(o&&o.kg)||0;L.kg=kgOwn(k)?k:0;if(L.kg)L.accV=null;return L}}
{const _ad=owAccD;owAccD=function(){const r=_ad.apply(this,arguments);r.kg=+((G.ow||{}).kg)||0;return r}}
{const _es2=owEdSave;owEdSave=function(){const k=OWD?+OWD.kg||0:null;const r=_es2.apply(this,arguments);if(k!==null&&G.ow){G.ow.kg=kgOwn(k)?k:0;owAccSync();save();OWD=null;try{owEdRender();owEdStage()}catch(e){}}return r}}
/* 着せ替え画面の着ぐるみ欄（持っていないものはシルエットで、届く条件を出す） */
function kgRow(d){if(!(G.kgH||[]).length)return"";const cur=+d.kg||0;let h=`<button class="kgc ${cur?"":"on"}" data-owp="kg" data-v="0"><div class="kgx">なし</div><b>着ない</b></button>`;
 for(let i=1;i<KGL.length;i++){const own=kgOwn(i);h+=own?`<button class="kgc ${cur===i?"on":""}" data-owp="kg" data-v="${i}"><canvas data-kgc="${i}" width="120" height="150"></canvas><b>${KGL[i].e} ${KGL[i].n}</b></button>`:`<button class="kgc lk" data-kgl="${i}"><canvas data-kgc="${i}" data-sil="1" width="120" height="150"></canvas><b>？？？</b><i>${esc(KGL[i].q)}</i></button>`}
 return`<div class="owr"><div class="owl">着ぐるみ <span style="font-size:10.5px;color:#8a8a8a;font-weight:700">${(G.kgH||[]).length}/${KGL.length-1}</span></div><div class="kgg">${h}</div>${cur?`<div style="font-size:11px;color:#8a8a8a;margin-top:6px">着ぐるみの時は、目元（メガネなど）以外の装飾品は外れます</div>`:""}</div>`}
const KGVC={};
function kgVox(i,sil){const k=i+(sil?"s":"");if(KGVC[k])return KGVC[k];let v=fmsVox("p",Object.assign({},OW.c,{kg:i,acc:0,accV:null}));if(sil)v=v.map(q=>[q[0],q[1],q[2],"#3a3640",q[4],q[5]]);return KGVC[k]=v}
function kgPaint(){document.querySelectorAll("canvas[data-kgc]").forEach(cv=>{try{vRender(cv,kgVox(+cv.dataset.kgc,!!cv.dataset.sil),5.6)}catch(e){}})}
{const _er=owEdRender;owEdRender=function(){const r=_er.apply(this,arguments);try{kgPaint()}catch(e){}return r}}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kgl]");if(!b)return;e.stopPropagation();e.preventDefault();const A=KGL[+b.dataset.kgl];toast("🔒 「"+A.q+"」を達成すると、お店に届きます")},true);
/* 届く演出：朝の行動を選ぶ画面の直前に、1日1個だけ */
const kgDue=()=>{try{kgChk()}catch(e){}return!!(G.kgQ&&G.kgQ.length&&G.kgDD!==G.day&&!$("#kgov")&&!$("#gap"))};
{const _smk=showMorning;showMorning=function(){if(canAct()&&kgDue()){kgDeliver(()=>showMorning());return}return _smk.apply(this,arguments)}}
function kgBoxVox(){const v=[],S=.5,K="#c8a165",T="#b08850",P="#e8d9a8";for(let x=0;x<6;x+=S)for(let y=0;y<6;y+=S)for(let z=0;z<5;z+=S){const ed=x===0||x===5.5||y===0||y===5.5||z===0||z===4.5;if(!ed)continue;let c=z===4.5?T:K;if(z===4.5&&(x===2.5||x===3))c=P;if((y===5.5||y===0)&&(x===2.5||x===3)&&z>=3.5)c=P;if(z===4.5&&(y===3||y===2.5)&&c===T)c=dkHex(T,.85);v.push([x,y,z,c,undefined,S])}return v}
function kgDeliver(next){const id=G.kgQ.shift(),A=KGL[id];G.kgH=G.kgH||[];if(!kgOwn(id))G.kgH.push(id);G.kgDD=G.day;save();try{log("📦 着ぐるみ「"+A.n+"」が届いた（"+A.q+"）")}catch(e){}for(const k in KGVC)delete KGVC[k];
 const o=document.createElement("div");o.id="kgov";o.innerHTML=`<div class="kgin"><div class="kgt">📦 お店に大きな箱が届いた！</div><div class="kgst"><canvas id="kgcv" width="560" height="620"></canvas><div class="kgfl"></div></div><div class="kgs">なにが入っているんだろう…</div><div class="kgb"><button id="kgop" class="kgbt">あける</button></div></div>`;document.body.appendChild(o);
 const cv=o.querySelector("#kgcv"),st=o.querySelector(".kgst");let vox=kgBoxVox(),ang=.55,t0=performance.now(),mode=0,raf=0;
 const loop=t=>{if(!o.isConnected)return;if(mode===0)ang=.55+Math.sin((t-t0)/900)*.12;else if(mode===1){ang=.55;cv.style.transform=`translate(${(Math.random()-.5)*14}px,${(Math.random()-.5)*8}px) rotate(${(Math.random()-.5)*6}deg)`}else ang+=.012;vRender(cv,vox,ang);raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop);
 const close=()=>{cancelAnimationFrame(raf);o.remove();try{next&&next()}catch(e){}};
 o.querySelector("#kgop").onclick=()=>{if(mode)return;mode=1;o.querySelector(".kgs").textContent="ガタガタ…！";o.querySelector(".kgb").style.visibility="hidden";
  setTimeout(()=>{mode=2;ang=5.6;cv.style.transform="";st.classList.add("pop");vox=fmsVox("p",Object.assign({},OW.c,{kg:id,acc:OW.c.acc||0,accV:null}));
   o.querySelector(".kgt").innerHTML=`${A.e} ${esc(A.n)}の着ぐるみが入っていた！`;
   o.querySelector(".kgs").innerHTML=`「${esc(A.q)}」のごほうび<br><span style="font-size:11.5px;opacity:.8">店主の「着せ替え」→「🧸 着ぐるみ」タブからいつでも着られます</span>`;
   const bb=o.querySelector(".kgb");bb.style.visibility="";bb.innerHTML=`<button class="kgbt" id="kgwr">着てみる</button><button class="kgbt sub" id="kgcl">あとで</button>`;
   bb.querySelector("#kgwr").onclick=()=>{G.ow.kg=id;owAccSync();save();try{toast(A.e+" "+A.n+"の着ぐるみを着た！")}catch(e){}close()};bb.querySelector("#kgcl").onclick=close},1100)}}
/* お客さんの反応（その日はじめて話しかけた時） */
const KGR0=["えっ、着ぐるみ!?","今日どうしたんですか？その格好","かわいい…あとで写真いいですか？","暑くないんですか？それ","その格好でシーシャ作るの器用すぎる","中の人、いつもの店長ですよね？","今日はなにかのイベントですか？"];
const KGR={1:["がおーって言ってください"],2:["クマさんのお店だ…"],3:["にゃーって言ってみてください"],4:["耳がぴょこぴょこしてる"],5:["笹とか吸うんですか？"],6:["よちよち歩いてる…"],7:["ケロケロしてる…"],8:["食べられる〜！"]};
{const _tk=talk;talk=function(p){const r=_tk.apply(this,arguments);try{const k=+((G.ow||{}).kg)||0,c=p&&p.c;if(k&&c&&!c.moto&&!spx(c)&&p.bub&&c._kgD!==G.day&&R.phase==="run"){c._kgD=G.day;say(p,rnd(KGR0.concat(KGR[k]||[],KGR[k]||[])))}}catch(e){}return r}}
/* チェキのスタンプ */
function kgStamp(g,PW){const k=+((G.ow||{}).kg)||0,A=k&&KGL[k];if(!A)return;g.save();g.translate(PW-92,96);g.rotate(.18);g.beginPath();g.arc(0,0,58,0,Math.PI*2);g.fillStyle=A.c;g.fill();g.lineWidth=6;g.strokeStyle="#fff";g.stroke();g.textAlign="center";g.textBaseline="middle";g.font="44px sans-serif";g.fillText(A.e,0,-10);g.font="bold 15px 'Hiragino Maru Gothic ProN','Hiragino Sans',sans-serif";g.fillStyle="#fff";g.strokeStyle="rgba(0,0,0,.35)";g.lineWidth=3;g.strokeText("きぐるみDAY",0,30);g.fillText("きぐるみDAY",0,30);g.restore()}
(function(){const st=document.createElement("style");st.textContent=`
.kgg{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.kgc{display:flex!important;flex-direction:column;align-items:center;gap:2px;padding:4px 2px 6px!important;border-radius:12px!important;background:#fff!important;border:2px solid #cfd8d4!important;color:#123a33!important;font-size:11.5px!important;min-height:96px}
.kgc.on{border-color:#6658a6!important;background:#f1eefb!important}
.kgc canvas{width:56px;height:70px;background:transparent!important;box-shadow:none!important;border-radius:0!important}
.kgc i{font-style:normal;font-size:9.5px;color:#8a8a8a;line-height:1.25;text-align:center}
.kgc.lk{background:#f4f2ec!important}
.kgx{width:56px;height:70px;display:grid;place-items:center;color:#b0b0b0;font-size:12px}
#kgov{position:fixed;inset:0;z-index:320;background:radial-gradient(circle at 50% 40%,#3a2f55,#14101f 75%);display:flex;align-items:center;justify-content:center;font-family:inherit}
.kgin{display:flex;flex-direction:column;align-items:center;gap:10px;width:min(92vw,420px);color:#fff;text-align:center}
.kgt{font-size:20px;font-weight:900;letter-spacing:.02em;text-shadow:0 2px 0 rgba(0,0,0,.35)}
.kgst{position:relative;width:min(80vw,300px);aspect-ratio:560/620}
.kgst canvas{width:100%;height:100%;background:transparent!important;box-shadow:none!important}
.kgfl{position:absolute;inset:-20%;border-radius:50%;background:radial-gradient(circle,rgba(255,240,180,.9),rgba(255,240,180,0) 60%);opacity:0;pointer-events:none}
.kgst.pop .kgfl{animation:kgfl 1.1s ease-out}
@keyframes kgfl{0%{opacity:1;transform:scale(.4)}100%{opacity:0;transform:scale(1.4)}}
.kgs{font-size:14px;font-weight:700;line-height:1.6;min-height:2.6em}
.kgb{display:flex;gap:10px;justify-content:center}
.kgbt{padding:12px 26px;border-radius:999px;border:0;background:#f5d34a;color:#3a2a00;font-weight:900;font-size:16px;box-shadow:0 4px 0 #b8941a}
.kgbt.sub{background:#fff;color:#444;box-shadow:0 4px 0 #bbb}`;document.head.appendChild(st)})();

