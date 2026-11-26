/* ===== メニュー・各種パネル・模様替え中は「営業開始」を押せなくする ===== */
try{document.head.insertAdjacentHTML("beforeend","<style>body.golk #go{pointer-events:none!important;opacity:.4!important;filter:grayscale(.6)}</style>")}catch(e){}
const goLocked=()=>!!(document.querySelector("#sheet.open")||document.querySelector(".xpan")||document.body.classList.contains("mvmode"));
{const _hg=hud;hud=function(){const r=_hg.apply(this,arguments);try{const l=goLocked();if(document.body.classList.contains("golk")!==l)document.body.classList.toggle("golk",l)}catch(e){}return r}}
document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest("#go")&&goLocked()){e.stopPropagation();e.preventDefault()}},true);

/* ===== お店めぐりはゲーム内で3ヶ月たってから解禁 ===== */
const visUnl=()=>Math.max(G.month||0,Math.floor(((G.day||1)-1)/7))>=3;
{const _xr=xrow;xrow=function(){_xr();const b=$("#visb");if(b)b.hidden=!visUnl()}}
{const _vp=visPanel;visPanel=function(){if(!visUnl())return;return _vp.apply(this,arguments)}}
function visUnlPop(){G.visU=1;save();try{xrow()}catch(e){}const d=document.createElement("div");d.className="xpan";d.id="visup";d.innerHTML=`<div class="xin" style="text-align:center"><div style="font-size:46px;line-height:1.2">🏪</div><div class="xh" style="justify-content:center">お店めぐりが解禁された！</div><div class="xs" style="font-size:14px;line-height:1.8;margin:8px 0">リアルで会った店主さんとスマホを見せ合うと、その人のお店に遊びに行けます。<br>滞在できるのは<b>15分だけ</b>。<br>会えた時だけの特別な時間を楽しもう！</div><div class="xb"><button data-vu="ok" class="on" style="flex:1">OK</button></div></div>`;document.body.appendChild(d);d.onclick=e=>{if(e.target.closest("[data-vu]"))d.remove()}}
{const _hu=hud;hud=function(){const r=_hu.apply(this,arguments);try{if(!G.visU&&G.setup&&!G.over&&visUnl()&&R.phase==="prep"&&!R.vis&&$("#ov").hidden&&!document.querySelector(".xpan")&&!document.querySelector("#sheet.open")&&!document.body.classList.contains("mvmode")&&!(typeof TUT!=="undefined"&&TUT))visUnlPop()}catch(e){}return r}}
try{xrow()}catch(e){}

/* ===== UIリニューアル（上部を1行に・店名と口コミ★・右側の丸ボタン・大きな営業開始・営業中は残り時間バー） ===== */
try{document.head.insertAdjacentHTML("beforeend",`<style>
#top{padding:8px 12px 7px!important;border-radius:0 0 18px 18px!important}
#money{font-size:22px!important}
#top .mt{display:flex!important;gap:6px!important;margin-top:6px!important}
#top .mt>div{flex:1;min-width:0;padding:5px 6px!important;border-radius:11px!important;font-size:0!important;display:flex!important;align-items:center;justify-content:center;gap:3px;height:auto!important;min-height:0!important}
#top .mt>div b{font-size:12.5px!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#top .mt>div::before{font-size:13px}
#top .mt>div:nth-child(1)::before{content:"👥"}#top .mt>div:nth-child(2)::before{content:"💴"}#top .mt>div:nth-child(3)::before{content:"😊"}#top .mt>div:nth-child(4)::before{content:"💨"}#top .mt>div:nth-child(5)::before{content:"🔥"}
#top .mt i{display:none!important}#top .mt>div:nth-child(2){flex:1.7!important}#top .mt>div:nth-child(1){flex:.9!important}
#shopln{position:fixed;left:10px;top:calc(var(--uit,104px) + 8px);z-index:6;background:rgba(28,20,40,.86);color:#fff;border-radius:14px;padding:5px 12px;font-size:12.5px;font-weight:700;max-width:calc(100vw - 110px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;-webkit-tap-highlight-color:transparent}
#shopln b{color:#ffd54a;margin-left:4px}#shopln u{font-weight:400;opacity:.85;margin-left:4px}
.fs #atm,#atm{position:fixed!important;left:10px!important;right:auto!important;top:calc(var(--uit,104px) + 44px)!important;bottom:auto!important;display:flex!important;flex-wrap:nowrap!important;gap:4px!important;margin:0!important;z-index:5}
.fs #atm span,#atm span{padding:2px 7px!important;font-size:11px!important;border-radius:9px!important}
#xrow{position:fixed!important;right:12px!important;left:auto!important;top:calc(var(--uit,104px) + 56px)!important;display:flex!important;flex-direction:column!important;flex-wrap:nowrap!important;gap:16px!important;width:auto!important;z-index:6}
#xrow button{width:48px!important;height:48px!important;border-radius:50%!important;padding:0!important;font-size:0!important;box-shadow:0 4px 12px rgba(0,0,0,.25)!important;position:relative;overflow:visible!important}
#xrow button::first-letter{font-size:22px}
#xrow button::after{content:attr(data-l);position:absolute;bottom:-14px;left:50%;transform:translateX(-50%);font-size:9.5px;font-weight:700;color:#3a2f48;white-space:nowrap;text-shadow:0 0 3px #fff,0 0 3px #fff,0 0 3px #fff}
#xrow button[hidden]{display:none!important}
#mvbtn{position:fixed!important;left:auto!important;right:10px!important;top:auto!important;bottom:calc(env(safe-area-inset-bottom,0px) + 78px)!important;border-radius:22px!important;z-index:6}
#bar .in{gap:8px!important;align-items:center}
#go{flex:2.2!important;font-size:18px!important;height:52px!important;border-radius:26px!important;background:linear-gradient(180deg,#ffcf4a,#f0a21b)!important;color:#3a2200!important;box-shadow:0 6px 16px rgba(240,162,27,.4)!important;border:none!important}
#go.rv{background:linear-gradient(90deg,#7c5cff 0,#7c5cff var(--p,0%),#3a2f55 var(--p,0%))!important;color:#fff!important;box-shadow:none!important;opacity:1!important;font-size:13px!important;line-height:1.25}
#go.rv small{font-weight:400;font-size:11px;opacity:.9}
#vent{flex:0 0 52px!important;width:52px!important;height:52px!important;border-radius:50%!important;font-size:10.5px!important;line-height:1.15!important;padding:0!important;white-space:normal!important}
#menu{flex:0 0 52px!important;width:52px!important;height:52px!important;border-radius:50%!important}
#bar .spd{flex:0 0 auto!important;background:transparent!important;padding:0!important}
#bar .spd button:not(.on){display:none!important}
#bar .spd button.on{width:52px!important;height:52px!important;border-radius:50%!important;font-size:15px!important}
.rvl{display:flex;gap:8px;border-bottom:1px solid var(--bd);padding:9px 0}.rvl .st{color:#f0a21b;letter-spacing:1px;white-space:nowrap}.rvl small{color:var(--mut)}
.rvup{background:#7c5cff;color:#fff;border-radius:6px;padding:0 5px;font-size:10px;margin-left:4px}
</style>`)}catch(e){}
/* 上部の高さに合わせて店名・雰囲気・丸ボタンの位置を決める */
let _uitV=0;function uiTop(){try{const t=$("#top");if(t){const b=t.offsetTop+t.offsetHeight;if(b>0&&Math.abs(b-_uitV)>=3){_uitV=b;document.documentElement.style.setProperty("--uit",b+"px")}}}catch(e){}}
window.addEventListener("resize",()=>setTimeout(uiTop,50));
/* 雰囲気タグは短い名前で1行に */
const TLS={luxury:"ゴ",subculture:"サ",asian:"ア",fantasy:"幻",party:"パ"};
ratm=function(){const a=atmo();$("#atm").innerHTML=TAGS.map(k=>`<span title="${TL[k]}">${TLS[k]||TL[k]} ${a[k]}</span>`).join("")};try{ratm()}catch(e){}
/* 丸ボタンの下のラベル */
{const _xu=xrow;xrow=function(){_xu.apply(this,arguments);const L={tixb:"チケット×"+((G.tix|0)),gachab:"ガチャ",chekib:"チェキ",visb:"めぐり"};for(const k in L){const e=document.getElementById(k);if(e)e.dataset.l=L[k]}uiTop()}}
/* 速度は1つのボタンで ×1→×2→×4→⏸ と切り替え */
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#bar .spd button.on");if(!b||b._cyc)return;const L=[...b.parentNode.querySelectorAll("button")],i=L.indexOf(b),order=[1,2,3,0],nx=L[order[i]!=null?order[i]:1];if(!nx||nx===b)return;e.stopPropagation();e.preventDefault();nx._cyc=1;nx.click();nx._cyc=0},true);
/* ===== 口コミ（全員匿名・1人1件、また来ると書き換わる） ===== */
const RVC={5:["最高のお店！また絶対来ます","煙がきれいで味も最高でした","店主さんの接客がとても良い","居心地がよすぎて長居しちゃう","内装がおしゃれで落ち着く","ここのシーシャが一番好き"],4:["また来たいと思えるお店","シーシャがおいしかった","雰囲気がいいです","ゆっくりできました","ドリンクがあるのがうれしい","店主さんが話しやすい"],3:["普通に良かったです","可もなく不可もなく","また気が向いたら来ます","もう少し話しかけてほしかったかも","悪くはないです"],2:["ちょっと物足りなかった","期待してたほどでは…","少し居心地が悪かったかも","次はもう少し良くなってるといいな"],1:["残念でした","もう来ないかも","居心地が良くなかったです"]};
const RVSMK=["ちょっと煙たかったです","換気してほしかった…"];
function revAdd(c,p){try{G.rev=G.rev||{};let sc;if(spx(c)){sc=Math.random()<.7?5:4}else{const h=(c.hp||0)-(c.up||0),tk=p&&p.tp>=Math.max(1,Math.ceil((c.tl||3)/3))?.4:-.3;sc=Math.round(3.2+h/30+tk+(Math.random()-.5)*1.2)}
const smk=(R.smoke||0)>=60&&sc<=3;sc=Math.max(1,Math.min(5,sc));const t=smk&&Math.random()<.6?rnd(RVSMK):rnd(RVC[sc]),o=G.rev[c.i];G.rev[c.i]={s:sc,t,d:G.day||1,u:o?1:0,n:((o&&o.n)||0)+1};R.revN=(R.revN||0)+1}catch(e){}}
{const _ev=endVisit;endVisit=function(c,p){const r=_ev.apply(this,arguments);if(c&&c.i!==99&&!(p&&p.vis))revAdd(c,p);return r}}
function revAvg(){const L=Object.values(G.rev||{});if(!L.length)return null;return{a:L.reduce((x,o)=>x+o.s,0)/L.length,n:L.length}}
const revStars=n=>"★★★★★".slice(0,n)+"☆☆☆☆☆".slice(0,5-n);
function revPanel(){const o=$("#visp");if(o)o.remove();const L=Object.values(G.rev||{}).sort((a,b)=>b.d-a.d),av=revAvg(),d=document.createElement("div");d.id="visp";d.className="xpan";
d.innerHTML=`<div class="xin"><div class="xh">💬 ${esc(shopNm())} の口コミ</div>${av?`<div style="text-align:center;margin:6px 0 4px"><span style="font-size:26px;font-weight:800;color:#f0a21b">★ ${av.a.toFixed(1)}</span><br><small style="color:var(--mut)">${av.n}件の口コミ（すべて匿名）</small></div>`:""}
<div style="max-height:56vh;overflow:auto">${L.length?L.map(r=>`<div class="rvl"><div style="flex:1"><span class="st">${revStars(r.s)}</span>${r.u?`<span class="rvup">更新</span>`:""}<br>${esc(r.t)}</div><small>匿名さん<br>${ydOf(r.d).replace("プレイ","")}</small></div>`).join(""):`<div class="xs" style="text-align:center;margin:16px 0">まだ口コミはありません。<br>お客さんが帰る時に書いてくれます</div>`}</div>
<div class="xb"><button data-rv="x" style="flex:1">閉じる</button></div></div>`;document.body.appendChild(d);d.onclick=e=>{if(e.target.closest("[data-rv]"))d.remove()}}
/* 店名の行（天気・店名・★・口コミ） */
function shopLine(){let e=$("#shopln");if(!e){e=document.createElement("div");e.id="shopln";document.body.appendChild(e);e.onclick=ev=>{ev.stopPropagation();revPanel()}}
const w=(typeof WXI!=="undefined"&&G.wx)?(WXI[G.wx[G.wd]]||[""])[0]:"",av=revAvg(),h=`${w} 🏪 ${esc(shopNm())}<b>${av?"★"+av.a.toFixed(1):"★ —"}</b><u>口コミ${av?"("+av.n+")":""}</u>`;if(e._h!==h){e._h=h;e.innerHTML=h}e.hidden=!G.setup||!!G.over}
/* 営業中は「営業開始」の場所に時刻と残り時間のバー */
const hm=t=>{t=Math.max(0,Math.round(t));return(Math.floor(t/60)%24)+":"+String(t%60).padStart(2,"0")};
function goRun(){const g=$("#go");if(!g)return;if(R.phase==="run"){const o=G.open*60,c=G.close*60,t=Math.min(R.t,c),p=Math.max(0,Math.min(100,(t-o)/Math.max(1,c-o)*100)),rm=Math.max(0,c-t),h=`🕓 ${hm(t)} 営業中<br><small>閉店 ${hm(c)} まで あと${Math.floor(rm/60)}時間${Math.round(rm%60)}分</small>`;
if(!g.classList.contains("rv"))g.classList.add("rv");if(g._h!==h){g._h=h;g.innerHTML=h}g.style.setProperty("--p",p.toFixed(1)+"%")}else if(g.classList.contains("rv")){g.classList.remove("rv");g._h="";g.textContent="▶ 営業開始"}}
{let _lt=0;const _hu2=hud;hud=function(){const r=_hu2.apply(this,arguments);try{goRun();const n=Date.now();if(n-_lt>400){_lt=n;shopLine();uiTop()}}catch(e){}return r}}
try{xrow();shopLine();uiTop()}catch(e){}

/* ===== 全画面メニュー（メイン #005d4d・差し色 #6658a6・フラット）＋回転する見本ステージ ===== */
try{document.head.insertAdjacentHTML("beforeend",`<style>
html body #sheet.open{position:fixed!important;inset:0!important;top:0!important;height:100%!important;max-height:none!important;transform:none!important;border-radius:0!important;z-index:90!important;background:#f3f1ea!important;color:#123a33!important;padding:0 0 calc(env(safe-area-inset-bottom,0px) + 74px)!important;overflow-y:auto!important;box-shadow:none!important;border:none!important}
html body #sheet.open .grab,html body #sheet.open>.tabs{display:none!important}
#fmh{display:none}html body #sheet.open #fmh{display:block;position:sticky;top:0;z-index:5;background:#005d4d;color:#fff;padding:calc(env(safe-area-inset-top,0px) + 14px) 12px 10px;margin-bottom:10px}
#fmh .t{font-weight:900;font-size:22px;letter-spacing:3px}#fmh .t small{display:block;font-size:10px;letter-spacing:2px;color:#8fc9bc;font-weight:700}
#fmh .pu{position:absolute;right:12px;top:calc(env(safe-area-inset-top,0px) + 16px);background:#6658a6;border-radius:10px;padding:4px 12px;font-weight:900;font-size:18px}#fmh .pu:before{content:"¥ ";color:#ffd76a;font-size:15px}
#fmt{display:flex;gap:6px;background:#004a3d;border-radius:14px;padding:5px;margin-top:10px}
#fmt button{flex:1;height:40px;border:none!important;border-radius:10px!important;background:transparent!important;font-size:19px!important;opacity:.5;padding:0!important;box-shadow:none!important;color:#fff!important}
#fmt button.on{opacity:1;background:#6658a6!important}
#fmb{display:none}html body #sheet.open #fmb{display:flex;position:fixed;left:12px;right:12px;bottom:calc(env(safe-area-inset-bottom,0px) + 12px);gap:10px;z-index:6}
#fmb button{flex:1;font-weight:900!important;font-size:15px!important;border-radius:14px!important;padding:11px 0!important;color:#005d4d!important;background:#fff!important;border:2px solid #005d4d!important;box-shadow:none!important}
#fmb button.a{flex:1.6;background:#6658a6!important;color:#fff!important;border-color:#6658a6!important}
#fmb button[hidden]{display:none!important}
html body #sheet.open [id^=p-]{padding:0 12px!important}
html body #sheet.open .fmhide{display:none!important}
html body #sheet.open details.cd,html body #sheet.open .card{background:#fff!important;border:none!important;border-radius:12px!important;box-shadow:none!important;color:#123a33!important;margin-bottom:10px!important}
html body #sheet.open details.cd>summary{color:#123a33!important;font-weight:900!important}
html body #sheet.open details.cd>summary small{color:#6658a6!important}
html body #sheet.open .m{color:#5c7a73!important}
html body #sheet.open button{border-radius:10px!important;box-shadow:none!important}
html body #sheet.open .row button,html body #sheet.open .dcat button,html body #sheet.open #dc button{background:#fff!important;border:1.5px solid #cfd8d4!important;color:#123a33!important}
html body #sheet.open .row button.on,html body #sheet.open .dcat button.on,html body #sheet.open #dc button.on{background:#6658a6!important;border-color:#6658a6!important;color:#fff!important}
html body #sheet.open .dit{background:#fff!important;border:1.5px solid #ecebe4!important;color:#123a33!important}
html body #sheet.open .dit.fmsel{background:#6658a6!important;border-color:#6658a6!important;color:#fff!important}html body #sheet.open .dit.fmsel small{color:#e8e4ff!important}
html body #sheet.open .dgh{color:#005d4d!important;font-weight:900!important}
html body #sheet.open .dxt{background:#fff!important;border:none!important;border-radius:10px!important;box-shadow:none!important;color:#123a33!important}
html body #sheet.open .dxt .dxi{background:#e3efec!important;border-radius:8px!important;border:none!important;box-shadow:none!important}
html body #sheet.open .dxt.fmsel{background:#6658a6!important;color:#fff!important}html body #sheet.open .dxt.fmsel .dxi{background:#7d70bd!important}
html body #sheet.open .dxno{background:#005d4d!important;color:#fff!important;border-radius:5px!important;padding:1px 6px!important;line-height:1.3!important;white-space:nowrap!important;width:auto!important;min-width:0!important;height:auto!important}
html body #sheet #fms{display:none;position:relative;height:236px;border-radius:12px;background:#005d4d;color:#fff;overflow:hidden;margin:0 12px 10px;touch-action:pan-y}
html body #sheet.open #fms.on{display:block}
html body #sheet #fms canvas{position:absolute;left:0;top:0;width:100%;height:100%;background:transparent!important;border:none!important;box-shadow:none!important}
html body #sheet #fms .pd{position:absolute;left:50%;bottom:34px;width:150px;height:18px;transform:translateX(-50%);border-radius:50%;background:#6658a6}
html body #sheet #fms .tl{position:absolute;left:12px;top:10px;font-size:11px;font-weight:900;background:#6658a6;border-radius:8px;padding:1px 8px}
html body #sheet #fms .tr{position:absolute;right:12px;top:10px;font-size:11px;font-weight:700;color:#8fc9bc;text-align:right}
html body #sheet #fms .nm{position:absolute;left:12px;right:12px;bottom:8px;display:flex;justify-content:space-between;align-items:flex-end;pointer-events:none}
html body #sheet #fms .nm b{font-size:17px;font-weight:900;display:block}#fms .nm small{font-size:11px;color:#8fc9bc}
html body #sheet #fms .ga{height:6px;border-radius:3px;background:#004a3d;overflow:hidden;margin-top:3px}#fms .ga i{display:block;height:100%;background:#6658a6}
html body #sheet #fms .hint{position:absolute;right:12px;bottom:44px;font-size:10px;color:#8fc9bc}
html body #sheet.open .card button:not(.on),html body #sheet.open details button:not(.on),html body #sheet.open .it:not(.on):not(.fmsel){background:#fff!important;color:#123a33!important;border:1.5px solid #cfd8d4!important}
html body #sheet.open .card button.on,html body #sheet.open details button.on{background:#6658a6!important;color:#fff!important;border-color:#6658a6!important}
html body #sheet.open select,html body #sheet.open input,html body #sheet.open textarea{background:#fff!important;color:#123a33!important;border:1.5px solid #cfd8d4!important}
html body #sheet.open button:disabled{opacity:.5}
html body #dd{z-index:96!important}html body #ov{z-index:97!important}html body #tut,html body #tutarw{z-index:98!important}
html body #sheet #fms .hint{left:50%;right:auto;transform:translateX(-50%);top:12px;bottom:auto;white-space:nowrap}
.fmcard{background:#fff;border-radius:12px;padding:12px;margin-bottom:10px}
</style>`)}catch(e){}
/* --- 小さなボクセル描画（見本ステージ用・回転） --- */
const VSH=new Map();function vsh(c,k){const key=c+k;let r=VSH.get(key);if(r)return r;let h=String(c||"#888").replace("#","");if(h.length===3)h=h.split("").map(x=>x+x).join("");const n=parseInt(h,16)||0,R=(n>>16)&255,G2=(n>>8)&255,B=n&255;r=`rgb(${Math.round(R*k)},${Math.round(G2*k)},${Math.round(B*k)})`;VSH.set(key,r);return r}
function vRender(cv,vox,ang){const g=cv.getContext("2d"),W=cv.width,H=cv.height;g.clearRect(0,0,W,H);if(!vox||!vox.length)return;
if(!vox._b){let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9,z0=1e9,z1=-1e9;vox.forEach(v=>{const s=v[5]||1;x0=Math.min(x0,v[0]);x1=Math.max(x1,v[0]+s);y0=Math.min(y0,v[1]);y1=Math.max(y1,v[1]+s);z0=Math.min(z0,v[2]);z1=Math.max(z1,v[2]+s)});const cx=(x0+x1)/2,cy=(y0+y1)/2,r=Math.hypot(x1-x0,y1-y0)/2;vox._b={cx,cy,z0,z1,r}}
const b=vox._b,co=Math.cos(ang),si=Math.sin(ang),hz=b.z1-b.z0,sc=Math.min(W*.42/(b.r*1.25+.5),H*.68/(hz+b.r*.55+.5)),ox=W/2,oy=H-H*.2-b.r*.5*sc*0;
const pr=(x,y,z)=>{const dx=x-b.cx,dy=y-b.cy,X=co*dx-si*dy,Y=si*dx+co*dy;return[ox+(X-Y)*.866*sc,oy-(z-b.z0)*sc+(X+Y)*.42*sc-0]};
const L=vox.map(v=>{const s=v[5]||1,dx=v[0]+s/2-b.cx,dy=v[1]+s/2-b.cy,X=co*dx-si*dy,Y=si*dx+co*dy;return[X+Y,v[2],v]}).sort((p,q)=>p[0]-q[0]||p[1]-q[1]);
const fx=co+si>0,fy=co-si>0;
const poly=(pts,col)=>{g.fillStyle=col;g.beginPath();g.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)g.lineTo(pts[i][0],pts[i][1]);g.closePath();g.fill();g.strokeStyle=col;g.lineWidth=.6;g.stroke()};
for(const [,,v] of L){const s=v[5]||1,x=v[0],y=v[1],z=v[2],c=v[3];
const a0=pr(x,y,z+s),a1=pr(x+s,y,z+s),a2=pr(x+s,y+s,z+s),a3=pr(x,y+s,z+s),b0=pr(x,y,z),b1=pr(x+s,y,z),b2=pr(x+s,y+s,z),b3=pr(x,y+s,z);
if(fx)poly([a1,a2,b2,b1],vsh(c,.78));else poly([a0,a3,b3,b0],vsh(c,.78));
if(fy)poly([a3,a2,b2,b3],vsh(c,.62));else poly([a0,a1,b1,b0],vsh(c,.62));
poly([a0,a1,a2,a3],vsh(c,1))}}
/* --- ステージ --- */
const FMS={vox:null,ang:5.5,auto:1,drag:null,raf:0,last:0};
function fmsVox(kind,x){const a=[];try{if(kind==="p"){pv(a,0,0,1,x,0,0,0,0)}else if(kind==="d"){decVox(x,0).forEach(s2=>a.push(...s2.v))}}catch(e){}return a}
function fmsSet(kind,x,html){const st=$("#fms");if(!st)return;FMS.vox=kind?fmsVox(kind,x):null;FMS.ang=5.5;FMS.auto=1;st.querySelector(".info").innerHTML=html||"";st.classList.toggle("on",!!kind);fmsLoop()}
function fmsLoop(){cancelAnimationFrame(FMS.raf);const st=$("#fms");if(!st||!st.classList.contains("on")||!$("#sheet.open"))return;const cv=st.querySelector("canvas"),dp=Math.min(2,window.devicePixelRatio||1),w=Math.round(st.clientWidth*dp),h=Math.round(st.clientHeight*dp);if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h}
const t=performance.now(),dt=Math.min(.05,(t-(FMS.last||t))/1000);FMS.last=t;if(FMS.auto&&!FMS.drag)FMS.ang+=dt*.7;vRender(cv,FMS.vox,FMS.ang);FMS.raf=requestAnimationFrame(fmsLoop)}
/* --- 全画面メニューの枠 --- */
let FMTAB="shop",FMSEL={dex:null,deco:null};
const FMN={shop:["MENU","営業"],deco:["CATALOG","装飾"],dex:["ZUKAN","図鑑"],owner:["OWNER","店主"],etc:["SETTINGS","その他"]};
function fmBuild(){const sh=$("#sheet");if(!sh||$("#fmh"))return;const h=document.createElement("div");h.id="fmh";h.innerHTML=`<div class="t">MENU<small>営業</small></div><div class="pu">0</div><div id="fmt">${[["shop","🏪"],["deco","🪴"],["dex","📖"],["owner","👕"],["etc","⚙️"]].map(([k,e])=>`<button data-fm="${k}" aria-label="${FMN[k][1]}">${e}</button>`).join("")}</div>`;sh.prepend(h);
const st=document.createElement("div");st.id="fms";st.innerHTML=`<div class="pd"></div><canvas></canvas><div class="info"></div><div class="hint">ドラッグで回転・ダブルタップで正面</div>`;h.after(st);
const po=document.createElement("div");po.id="p-own2";po.hidden=true;const pe=document.createElement("div");pe.id="p-etc";pe.hidden=true;sh.appendChild(po);sh.appendChild(pe);
const bb=document.createElement("div");bb.id="fmb";bb.innerHTML=`<button data-fb="back">◀ もどる</button><button data-fb="go" class="a" hidden></button>`;sh.appendChild(bb);
h.querySelector("#fmt").onclick=e=>{const b=e.target.closest("[data-fm]");if(b)fmTab(b.dataset.fm)};
bb.onclick=e=>{const b=e.target.closest("[data-fb]");if(!b)return;e.stopPropagation();if(b.dataset.fb==="back"){sh.classList.remove("open");cancelAnimationFrame(FMS.raf);try{hud()}catch(_){}return}fmGo()};
/* ステージのドラッグ回転 */
const P2=e=>(e.touches?e.touches[0]:e).clientX;
st.addEventListener("pointerdown",e=>{FMS.drag={x:e.clientX,a:FMS.ang};FMS.auto=0});
window.addEventListener("pointermove",e=>{if(FMS.drag){FMS.ang=FMS.drag.a+(e.clientX-FMS.drag.x)*.012}});
window.addEventListener("pointerup",()=>{if(FMS.drag){FMS.drag=null;setTimeout(()=>{if(!FMS.drag)FMS.auto=1},1500)}});
st.addEventListener("dblclick",()=>{FMS.ang=5.5;FMS.auto=1});
/* 選んでからもう一度（または下のボタン）で今までの動作 */
sh.addEventListener("click",e=>{if(!sh.classList.contains("open"))return;const d=e.target.closest(".dxt");if(d&&!d._fmpass&&FMTAB==="dex"){const i=+d.dataset.c;if(FMSEL.dex!==i){e.stopPropagation();e.preventDefault();fmDex(i,d);return}}
const it=e.target.closest(".dit[data-d]");if(it&&!it._fmpass&&FMTAB==="deco"&&!it.disabled){const id=it.dataset.d;if(FMSEL.deco!==id&&decVox(id,0)&&decVox(id,0).length){e.stopPropagation();e.preventDefault();fmDeco(id,it);return}}},true);
try{const pe=$("#p-etc");["d-log","d-sys"].forEach(id=>{const e=document.getElementById(id);if(e)pe.appendChild(e)})}catch(e){}
fmObs()}
function fmGo(){if(FMTAB==="dex"&&FMSEL.dex!=null){const d=document.querySelector(`#dg .dxt[data-c="${FMSEL.dex}"]`);if(d){d._fmpass=1;d.click();d._fmpass=0}}
else if(FMTAB==="deco"&&FMSEL.deco){const d=document.querySelector(`.dit[data-d="${FMSEL.deco}"]`);if(d){d._fmpass=1;d.click();d._fmpass=0}}
else if(FMTAB==="owner"){const b=document.querySelector("[data-owedit]");if(b)b.click()}}
function fmBtn(t){const b=$("#fmb [data-fb=go]");if(!b)return;b.hidden=!t;if(t)b.textContent=t}
function fmDex(i,el){FMSEL.dex=i;document.querySelectorAll("#dg .dxt.fmsel").forEach(x=>x.classList.remove("fmsel"));if(el)el.classList.add("fmsel");const c=G.cs[i],met=c&&c.met;
let name="？？？";try{if(met)name=esc(nm(c))}catch(_){name=esc(c.name||"")}
const met2=G.cs.filter(x=>x.met).length,fp=Math.round(Math.min(100,c.fp||0));
fmsSet(met?"p":null,c,`<div class="tl">No.${String(i+1).padStart(3,"0")}</div><div class="tr">図鑑 ${met2}/${G.cs.length}</div><div class="nm"><div><b>${name}</b><small>${met?esc(c.job||""):"まだ会っていない"}</small></div>${met?`<div style="text-align:right;font-size:11px;color:#8fc9bc">友好度 ${fp}%<div class="ga" style="width:90px"><i style="width:${fp}%"></i></div></div>`:""}</div>`);
if(!met){$("#fms").classList.add("on");FMS.vox=null;fmsLoop()}fmBtn("くわしく見る ▶");try{$("#fms").scrollIntoView({block:"nearest"})}catch(_){}}
function fmDeco(id,el){FMSEL.deco=id;document.querySelectorAll(".dit.fmsel").forEach(x=>x.classList.remove("fmsel"));if(el)el.classList.add("fmsel");const d=(typeof DEC!=="undefined"&&DEC.find(x=>x.id===id))||{n:el?el.querySelector("span").firstChild.textContent:id};
const tg=d.t?Object.entries(d.t).map(([k,v])=>`${TL[k]||k}+${v}`).join(" "):"";fmsSet("d",id,`<div class="tl">${esc(tg||"置物")}</div><div class="nm"><div><b>${esc(d.n||"")}</b></div><b>${d.p?"¥"+d.p.toLocaleString():""}</b></div>`);fmBtn("置く ▶")}
function fmOwner(){const o=G.ow||{},st=Math.round(typeof starOf==="function"?starOf(o):0),fm=Math.round(o.fame||0),sk=(o.skill||0);
fmsSet("p",OW.c,`<div class="tl" style="background:none;padding:0;font-size:15px">${esc(o.name||"店長")}<div style="font-size:10.5px;color:#8fc9bc;font-weight:700">${esc(shopNm())} の店主</div></div><div class="tr" style="width:128px;color:#fff">${[["👀 知名度",fm,fm],["⭐ スター性",st,st],["💨 技術",sk.toFixed(1),Math.min(100,sk)]].map(([l,v,p])=>`<div style="display:flex;justify-content:space-between;font-size:11px"><span>${l}</span><b>${v}</b></div><div class="ga" style="margin:2px 0 6px"><i style="width:${p}%"></i></div>`).join("")}</div>`);
const po=$("#p-own2");po.innerHTML=`<div class="fmcard"><b>${esc(o.name||"店長")}</b> <span class="m">${o.age?o.age+"歳":""}${o.sex?"・"+esc(o.sex):""}</span><div class="m" style="font-size:12px;margin-top:6px">SNSフォロワー ${(o.fol||0).toLocaleString()}人</div></div><div class="fmcard m" style="font-size:12.5px">着せ替えは「着がえる」から。髪型・服・ズボンを選べます。いろいろなことを達成すると、着せ替えアイテムが増えます。</div>`;fmBtn("着がえる ▶")}
function fmTab(k){FMTAB=k;const sh=$("#sheet");if(!sh)return;if(!$("#fmh"))fmBuild();if(!$("#p-own2"))return;const h=$("#fmh");h.querySelector(".t").innerHTML=`${FMN[k][0]}<small>${FMN[k][1]}</small>`;h.querySelectorAll("[data-fm]").forEach(b=>b.classList.toggle("on",b.dataset.fm===k));
const own=["shop","deco","dex"].includes(k);if(own){const ob=[...document.querySelectorAll("#sheet>.tabs button")].find(b=>b.dataset.t===k);if(ob)ob.click()}
["p-shop","p-deco","p-mk","p-dex"].forEach(id=>{const e=document.getElementById(id);if(e)e.classList.toggle("fmhide",!own)});$("#p-own2").hidden=k!=="owner";$("#p-etc").hidden=k!=="etc";
if(k==="etc"){const pe=$("#p-etc");["d-log","d-sys"].forEach(id=>{const e=document.getElementById(id);if(e&&e.parentNode!==pe)pe.appendChild(e)});const l=$("#d-log");if(l)l.open=true}
fmBtn(null);$("#fms").classList.remove("on");cancelAnimationFrame(FMS.raf);
if(k==="dex"){const i=FMSEL.dex!=null?FMSEL.dex:G.cs.findIndex(c=>c.met);if(i>=0){const el=document.querySelector(`#dg .dxt[data-c="${i}"]`);fmDex(i,el)}}
else if(k==="deco"){if(FMSEL.deco){const el=document.querySelector(`.dit[data-d="${FMSEL.deco}"]`);if(el&&el.offsetParent)fmDeco(FMSEL.deco,el)}}
else if(k==="owner")fmOwner();sh.scrollTop=0}
/* メニューが開いたら全画面の中身を整える／一覧が書き直されたら選択を戻す */
function fmObs(){const sh=$("#sheet");new MutationObserver(()=>{if(sh.classList.contains("open")){if(!sh._fmo){sh._fmo=1;const cur=[...document.querySelectorAll("#sheet>.tabs button")].find(b=>b.classList.contains("on"));fmTab(FMTAB==="owner"||FMTAB==="etc"?FMTAB:(cur&&cur.dataset.t)||"shop")}}else sh._fmo=0}).observe(sh,{attributes:true,attributeFilter:["class"]});
const dg=$("#p-dex");if(dg)new MutationObserver(()=>{if(FMSEL.dex!=null){const el=document.querySelector(`#dg .dxt[data-c="${FMSEL.dex}"]`);if(el&&!el.classList.contains("fmsel"))el.classList.add("fmsel")}}).observe(dg,{childList:true,subtree:true});
const dc=$("#p-deco");if(dc)new MutationObserver(()=>{if(FMTAB!=="deco")return;if(FMSEL.deco){const el=document.querySelector(`.dit[data-d="${FMSEL.deco}"]`);if(el&&!el.classList.contains("fmsel"))el.classList.add("fmsel");if(!el||!el.offsetParent){$("#fms").classList.remove("on");fmBtn(null)}}}).observe(dc,{childList:true,subtree:true})}
/* 元のタブボタン（図鑑の解禁時のチュートリアルなどで押される）とも同期 */
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#sheet>.tabs button[data-t]");if(b&&$("#sheet.open")&&FMTAB!==b.dataset.t&&["shop","deco","dex"].includes(b.dataset.t)){setTimeout(()=>{if(FMTAB!==b.dataset.t)fmTab(b.dataset.t)},0)}},true);
{let _fl=0;const _hf=hud;hud=function(){const r=_hf.apply(this,arguments);try{const n=Date.now();if(n-_fl>500){_fl=n;if(!document.getElementById('fmh'))fmBuild();const pu=document.querySelector("#fmh .pu");if(pu&&$("#sheet.open"))pu.textContent=(G.money===Infinity?"∞":Math.round(G.money).toLocaleString())}}catch(e){}return r}}
setTimeout(()=>{try{fmBuild()}catch(e){console.error(e)}},0);

/* ===== 全画面メニュー 続き：営業タブ（今日の状況カード＋店主の行動カード）／装飾タブ（カタログ一覧） ===== */
try{document.head.insertAdjacentHTML("beforeend",`<style>
html body #sheet.open #own>.f,html body #sheet.open #own>b,html body #sheet.open #own>span.m,html body #sheet.open #own>.m,html body #sheet.open #own .row{display:none!important}
#fmstat{display:none}html body #sheet.open #fmstat{display:block;background:#fff;border-radius:12px;padding:12px;margin:0 0 10px}
#fmstat .a{display:flex;justify-content:space-between;align-items:flex-start}#fmstat .a small{display:block;font-size:11px;color:#7f9690;font-weight:700}#fmstat .a b{font-size:19px;font-weight:900}#fmstat .a em{font-style:normal;font-size:12px;color:#6658a6;font-weight:900;margin-left:4px}
#fmstat .bars{display:flex;gap:4px;align-items:flex-end;height:44px;margin-top:10px}#fmstat .bars i{flex:1;border-radius:4px;background:#e3efec;min-height:3px}#fmstat .bars i.t{background:#6658a6}
#fmstat .wd{display:flex;justify-content:space-between;font-size:10px;color:#7f9690;font-weight:700;margin-top:3px}#fmstat .wd span{flex:1;text-align:center}
#fmact{display:none}html body #sheet.open #fmact{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0 4px}
html body #sheet.open #fmact button{display:block!important;text-align:left!important;background:#fff!important;border:1.5px solid #ecebe4!important;border-radius:12px!important;padding:10px 12px!important;color:#123a33!important;min-height:78px}
#fmact button:last-child:nth-child(odd){grid-column:1/-1;min-height:0}
#fmact button .e{font-size:20px;display:block}#fmact button b{display:block;font-size:14.5px;font-weight:900}#fmact button small{display:block;font-size:11px;color:#7f9690;line-height:1.35}
html body #sheet.open #fmact button.sel{background:#6658a6!important;border-color:#6658a6!important;color:#fff!important}html body #sheet.open #fmact button.sel small{color:#e8e4ff!important}
#fmact button:disabled{opacity:.45}
#fmdone{display:none}html body #sheet.open #fmdone{display:block;font-size:12.5px;font-weight:900;color:#2a9a7c;margin:6px 0 2px}
html body #sheet.open #dl{display:block!important;background:#fff;border-radius:12px;padding:2px 10px}
html body #sheet.open #dl .dgh{display:block;padding:10px 2px 4px;font-size:12px;border-bottom:1px solid #ecebe4}
html body #sheet.open #dl .dit{display:flex!important;align-items:center;gap:10px;width:100%!important;height:auto!important;min-height:48px;margin:0!important;padding:6px 4px!important;border:none!important;border-bottom:1px solid #ecebe4!important;border-radius:0!important;background:transparent!important;text-align:left!important;color:#123a33!important}
html body #sheet.open #dl .dit img{width:34px!important;height:34px!important;flex:none;border-radius:7px;background:#e3efec;object-fit:contain;margin:0!important}
html body #sheet.open #dl .dit span{flex:1;display:block;font-weight:900;font-size:14px;line-height:1.3}
html body #sheet.open #dl .dit small{display:block;font-weight:700;font-size:11px;color:#7f9690!important}
html body #sheet.open #dl .dit.fmsel{background:#6658a6!important;border-radius:10px!important;color:#fff!important;border-bottom-color:transparent!important}html body #sheet.open #dl .dit.fmsel small{color:#e8e4ff!important}
html body #sheet.open #dl .dit.lock{opacity:.55}
html body #sheet #fms .hint{top:36px!important}
</style>`)}catch(e){}
const FMACT={sns:["📱","SNS更新","無料・👀知名度アップ"],prac:["🔥","シーシャの練習","¥500・💨技術アップ"],visit:["🚶","他店舗へ視察","¥3,500・今日は休業"],focus:["🤝","お店に集中","その日の親密度アップ"]};
let FMASEL=null;
function fmStat(){const p=$("#p-shop");if(!p)return;let c=$("#fmstat");if(!c){c=document.createElement("div");c.id="fmstat";p.prepend(c)}
let w=["",""],m=1;try{const k=G.wx[G.wd];w=WXI[k]||w;m=(WXI[k]||[0,0,1])[2];const e=G.ev&&G.ev[G.wd];if(e)m=m*(e.m||1)}catch(e){}
const wk=(G.week||[]).map(d=>d&&d.sales||0),mx=Math.max(1,...wk),tot=wk.reduce((a,b)=>a+b,0),dn=(typeof DN!=="undefined"?DN:["月","火","水","木","金","土","日"]);
const day=(document.querySelector("#day")&&document.querySelector("#day").childNodes[0])?document.querySelector("#day").childNodes[0].textContent.trim():"";
const h=`<div class="a"><div><small>${esc(day)}</small><b>${w[0]} ${esc(w[1]||"")}</b><em>客足 ×${(+m).toFixed(2)}</em></div><div style="text-align:right"><small>今週の売上</small><b>${yen(tot)}</b></div></div><div class="bars">${[0,1,2,3,4,5,6].map(i=>`<i class="${i===G.wd?"t":""}" style="height:${Math.round((wk[i]||0)/mx*100)}%"></i>`).join("")}</div><div class="wd">${[0,1,2,3,4,5,6].map(i=>`<span>${["月","火","水","木","金","土","日"][i]}</span>`).join("")}</div>`;if(c._h!==h){c._h=h;c.innerHTML=h}}
function fmAct(){const o=$("#own");if(!o)return;let g=$("#fmact"),dn=$("#fmdone");if(!g){g=document.createElement("div");g.id="fmact";o.appendChild(g);g.onclick=e=>{const b=e.target.closest("[data-fa]");if(!b||b.disabled)return;e.stopPropagation();FMASEL=b.dataset.fa;fmAct();if(typeof fmBtn==="function"&&FMTAB==="shop")fmBtn("この行動にする ▶")}}
if(!dn){dn=document.createElement("div");dn.id="fmdone";g.before(dn)}const acted=G.ow&&G.ow.acted;dn.textContent=acted?"✅ 今日の行動は実行済みです":"今日の行動を1つ選んでください（開店前に1回）";dn.style.color=acted?"#2a9a7c":"#e2557a";
const h=Object.entries(FMACT).map(([k,[e,n,d]])=>{const ob=o.querySelector(`[data-o="${k}"]`),dis=!ob||ob.disabled;return`<button data-fa="${k}" class="${FMASEL===k&&!dis?"sel":""}" ${dis?"disabled":""}><span class="e">${e}</span><b>${n}</b><small>${d}</small></button>`}).join("");if(g._h!==h){g._h=h;g.innerHTML=h}
if(FMASEL&&(acted||!o.querySelector(`[data-o="${FMASEL}"]`)||o.querySelector(`[data-o="${FMASEL}"]`).disabled)){FMASEL=null;if(FMTAB==="shop"&&typeof fmBtn==="function")fmBtn(null)}}
{const _ro=rown;rown=function(){const r=_ro.apply(this,arguments);try{fmAct()}catch(e){}return r}}
{const _fg=fmGo;fmGo=function(){if(FMTAB==="shop"&&FMASEL){const b=document.querySelector(`#own [data-o="${FMASEL}"]`);FMASEL=null;fmBtn(null);if(b&&!b.disabled)b.click();setTimeout(()=>{try{fmAct()}catch(e){}},50);return}return _fg.apply(this,arguments)}}
{const _ft=fmTab;fmTab=function(k){const r=_ft.apply(this,arguments);try{if(k==="shop"){fmStat();fmAct();const d=$("#d-own");if(d)d.open=true;if(FMASEL)fmBtn("この行動にする ▶")}
if(k==="deco"&&!FMSEL.deco){const it=[...document.querySelectorAll("#dl .dit[data-d]:not([disabled])")].find(x=>{try{return decVox(x.dataset.d,0).length}catch(e){return false}});if(it)fmDeco(it.dataset.d,it)}}catch(e){}return r}}
{let _t2=0;const _h3=hud;hud=function(){const r=_h3.apply(this,arguments);try{const n=Date.now();if(n-_t2>1000&&$("#sheet.open")&&FMTAB==="shop"){_t2=n;fmStat()}}catch(e){}return r}}

/* ===== 図鑑：ステージも「解禁度」でカードと同じ色・色の説明を表示 ===== */
const DXCL=[[0,"#8a8494","0〜9%"],[10,"#5c9cff","10〜29%"],[30,"#f2d04a","30〜49%"],[50,"#4fd18a","50〜69%"],[70,"#ff6a5a","70〜99%"],[100,"#ffcf5a","100%（コンプリート）"]];
const dxColL=p=>{let c=DXCL[0][1];for(const d of DXCL)if(p>=d[0])c=d[1];return c};
try{document.head.insertAdjacentHTML("beforeend",`<style>#dxlg{display:flex;flex-wrap:wrap;gap:4px 10px;margin-top:6px;font-size:10.5px;font-weight:700;color:#5c7a73}#dxlg span{display:inline-flex;align-items:center;gap:3px}#dxlg i{display:inline-block;width:14px;height:5px;border-radius:3px}</style>`)}catch(e){}
function dxLegend(){const dc=$("#dc");if(!dc||R.dxm==="f"||R.dxm==="e"||dc.querySelector("#dxlg"))return;const d=document.createElement("div");d.id="dxlg";d.innerHTML=`<b style="color:#123a33">解禁度の色：</b>`+DXCL.map(x=>`<span><i style="background:${x[1]}"></i>${x[2]}</span>`).join("");dc.appendChild(d)}
{const _rd=rdex;rdex=function(){const r=_rd.apply(this,arguments);try{dxLegend()}catch(e){}return r}}
{const _fd=fmDex;fmDex=function(i,el){const r=_fd.apply(this,arguments);try{const c=G.cs[i];if(c&&c.met){const L=lv(c),p=L>=NL?100:Math.floor(L/NL*100),col=dxColL(p),nm2=document.querySelector("#fms .nm>div:last-child");if(nm2)nm2.innerHTML=`解禁度 ${p}%<div class="ga" style="width:90px"><i style="width:${p}%;background:${col}"></i></div>`}}catch(e){}return r}}
try{dxLegend()}catch(e){}

/* ===== 全画面メニュー：見本ステージを上に固定して、一覧をスクロールしても見えるようにする ===== */
try{document.head.insertAdjacentHTML("beforeend",`<style>
html body #sheet.open #fms.on{position:sticky;top:var(--fmhh,128px);z-index:4;height:196px;margin-top:-10px;border-radius:0 0 12px 12px;box-shadow:0 6px 10px -6px rgba(0,40,30,.35)}
html body #sheet.open .dcat{display:flex!important;flex-wrap:nowrap!important;overflow-x:auto;gap:6px!important;padding-bottom:2px;-webkit-overflow-scrolling:touch;scrollbar-width:none}
html body #sheet.open .dcat::-webkit-scrollbar{display:none}
html body #sheet.open .dcat button{flex:none!important;width:auto!important;padding:6px 12px!important;font-size:12.5px!important;white-space:nowrap;border-radius:18px!important}
html body #sheet.open #sec-obj>.m:first-child,html body #sheet.open [id^=sec-]>.m:first-child{display:none!important}
html body #sheet.open #plc{font-size:11px!important}
</style>`)}catch(e){}
function fmhH(){try{const h=document.getElementById("fmh");if(h&&h.offsetHeight)document.documentElement.style.setProperty("--fmhh",h.offsetHeight+"px")}catch(e){}}
window.addEventListener("resize",()=>setTimeout(fmhH,50));
{const _ft2=fmTab;fmTab=function(){const r=_ft2.apply(this,arguments);fmhH();return r}}

/* ===== 店主タブ：着せ替えもカタログ形式（選ぶと見本の店主に着せて回る→「着がえる」で決定） ===== */
try{document.head.insertAdjacentHTML("beforeend",`<style>
#owcat{display:flex;gap:6px;margin:0 0 8px;overflow-x:auto;scrollbar-width:none}#owcat::-webkit-scrollbar{display:none}
html body #sheet.open #owcat button{flex:none;padding:6px 14px!important;border-radius:18px!important;font-size:12.5px!important;font-weight:900;background:#fff!important;border:1.5px solid #cfd8d4!important;color:#123a33!important}
html body #sheet.open #owcat button.on{background:#6658a6!important;border-color:#6658a6!important;color:#fff!important}
#owlist{background:#fff;border-radius:12px;padding:2px 10px;margin-bottom:10px}
html body #sheet.open #owlist button{display:flex!important;align-items:center;gap:10px;width:100%;min-height:42px;padding:6px 4px!important;border:none!important;border-bottom:1px solid #ecebe4!important;border-radius:0!important;background:transparent!important;color:#123a33!important;font-weight:900!important;font-size:14px!important;text-align:left!important}
html body #sheet.open #owlist button .ic{width:26px;height:26px;border-radius:7px;background:#e3efec;display:flex;align-items:center;justify-content:center;font-size:13px;flex:none}
html body #sheet.open #owlist button .n{flex:1}
html body #sheet.open #owlist button .p{font-size:11.5px;color:#005d4d}
html body #sheet.open #owlist button.sel{background:#6658a6!important;color:#fff!important;border-radius:10px!important;border-bottom-color:transparent!important}html body #sheet.open #owlist button.sel .p{color:#fff}html body #sheet.open #owlist button.sel .ic{background:#fff3}
html body #sheet.open #owlist .sh{font-size:11.5px;font-weight:900;color:#6658a6;padding:10px 2px 4px;border-bottom:1px solid #ecebe4}
html body #sheet #fms .hint{top:auto!important;bottom:32px!important;left:auto!important;right:12px!important;transform:none!important;font-size:9.5px!important;opacity:.8}
#owmore{font-size:11.5px;color:#7f9690;text-align:center;padding:10px 4px}
</style>`)}catch(e){}
const OWCAT={hs:["髪型","h","h2",()=>HSN,"💇"],top:["服","t","t2",()=>TOPN,"👕"],bot:["ズボン","b","b2",()=>BOTN,"👖"]};
let OWK="top",OWPV=null;
const owCur=k=>{const o=G.ow||{},m=OWCAT[k][2];return o[m]?99+o[m]:(o[k]!=null?o[k]:(OW.c[k]||0))};
function owLook(k,v){const L=Object.assign({},OW.c),m=OWCAT[k][2];if(v>=100){L[m]=v-99}else{L[m]=0;L[k]=v}return L}
function owRender(){const po=$("#p-own2");if(!po)return;const o=G.ow||{},cat=OWCAT[OWK],base=cat[3](),cur=owCur(OWK),ty=cat[1];
const rows=base.map((n,i)=>[i,n,0]).concat(OWL[ty].map((x,i)=>[100+i,x[0],1]).filter(r=>owHas(ty+(r[0]-99))));const hidden=OWL[ty].length-rows.filter(r=>r[2]).length;
po.innerHTML=`<div id="owcat">${Object.entries(OWCAT).map(([k,c])=>`<button data-owk="${k}" class="${k===OWK?"on":""}">${c[4]} ${c[0]}</button>`).join("")}<button data-owk="edit">🎨 色・名前</button></div>
<div id="owlist">${rows.map(([v,n,x])=>`<button data-owv="${v}" class="${OWPV===v?"sel":""}"><span class="ic">${cat[4]}</span><span class="n">${esc(n)}</span><span class="p">${v===cur?"着用中":x?"限定":""}</span></button>`).join("")}${hidden>0?`<div id="owmore">いろいろなことを達成すると、着せ替えが増えていきます</div>`:""}</div>
<div class="fmcard"><b>${esc(o.name||"店長")}</b> <span class="m">${o.age?o.age+"歳":""}${o.sex?"・"+esc(o.sex):""}</span><div class="m" style="font-size:12px;margin-top:4px">SNSフォロワー ${(o.fol||0).toLocaleString()}人</div></div>`;
po.onclick=e=>{const k=e.target.closest("[data-owk]");if(k){e.stopPropagation();if(k.dataset.owk==="edit"){try{showOwEdit()}catch(_){const b=document.querySelector("[data-owedit]");if(b)b.click()}return}OWK=k.dataset.owk;OWPV=null;owRender();owStage();fmBtn(null);return}
const r=e.target.closest("[data-owv]");if(r){e.stopPropagation();const v=+r.dataset.owv;if(v===owCur(OWK)){OWPV=null;owRender();owStage();fmBtn(null);return}OWPV=v;owRender();owStage();fmBtn("着がえる ▶")}}}
function owStage(){const o=G.ow||{},st=Math.round(typeof starOf==="function"?starOf(o):0),fm=Math.round(o.fame||0),sk=(o.skill||0),look=OWPV!=null?owLook(OWK,OWPV):OW.c;
const keep=FMS.ang;fmsSet("p",look,`<div class="tl" style="background:none;padding:0;font-size:15px">${esc(o.name||"店長")}<div style="font-size:10.5px;color:#8fc9bc;font-weight:700">${OWPV!=null?"試着中…":esc(shopNm())+" の店主"}</div></div><div class="tr" style="width:128px;color:#fff">${[["👀 知名度",fm,fm],["⭐ スター性",st,st],["💨 技術",sk.toFixed(1),Math.min(100,sk)]].map(([l,v,p])=>`<div style="display:flex;justify-content:space-between;font-size:11px"><span>${l}</span><b>${v}</b></div><div class="ga" style="margin:2px 0 6px"><i style="width:${p}%"></i></div>`).join("")}</div>`);if(OWPV!=null)FMS.ang=keep}
function owApply(){if(OWPV==null)return;const o=G.ow;if(!o)return;const k=OWK,m=OWCAT[k][2],v=OWPV;if(v>=100){o[m]=v-99}else{o[m]=0;o[k]=v}applyOwLook();save();OWPV=null;owRender();owStage();fmBtn(null);try{toast("👕 着がえました")}catch(e){}}
fmOwner=function(){owRender();owStage();fmBtn(OWPV!=null?"着がえる ▶":null)};
{const _fg2=fmGo;fmGo=function(){if(FMTAB==="owner"){owApply();return}return _fg2.apply(this,arguments)}}

/* ===== 見本ステージ：自動回転をやめて、ドラッグでだけ回す ===== */
try{Object.defineProperty(FMS,"auto",{get:()=>0,set:()=>{},configurable:true})}catch(e){}
{const _fs=fmsSet;fmsSet=function(){const keep=FMS.vox&&arguments[0]==="p"&&FMTAB==="owner"?FMS.ang:null;const r=_fs.apply(this,arguments);if(keep!=null)FMS.ang=keep;try{const h=document.querySelector("#fms .hint");if(h)h.textContent="← ドラッグで回転 →"}catch(e){}return r}}
/* ===== 店主タブ「色・名前」をその場で編集（見本にすぐ反映→保存） ===== */
try{document.head.insertAdjacentHTML("beforeend",`<style>
#owed{background:#fff;border-radius:12px;padding:4px 12px 8px;margin-bottom:10px}
#owed .owr{padding:9px 0;border-bottom:1px solid #ecebe4}#owed .owr:last-child{border-bottom:none}
#owed .owl{display:flex;justify-content:space-between;align-items:center;font-size:13px;font-weight:900;color:#123a33;margin-bottom:6px}
html body #sheet.open #owed .owsw{display:flex!important;flex-direction:row!important;gap:7px!important;flex-wrap:wrap!important;align-items:center}
html body #sheet.open #owed .owl{display:flex!important;flex-direction:row!important}html body #sheet.open #owed .owr{display:block!important;width:100%!important}html body #sheet.open #owed .owsw,html body #sheet.open #owed .owpl{width:100%!important}
html body #sheet.open #owed .owsw button{flex:none!important;display:inline-block!important;margin:0!important;max-width:28px!important;min-height:0!important;width:28px!important;height:28px!important;min-width:0!important;padding:0!important;border-radius:50%!important;border:2px solid #fff!important;box-shadow:0 0 0 1.5px #cfd8d4!important}
html body #sheet.open #owed .owsw button.on{box-shadow:0 0 0 2.5px #6658a6!important}
html body #sheet.open #owed input[type=color]{width:34px!important;height:30px!important;padding:0!important;border:none!important;background:none!important}
html body #sheet.open #owed input[type=text],html body #sheet.open #owed input[type=number],html body #sheet.open #owed select{width:100%;padding:8px 10px!important;border-radius:10px!important;font-size:15px!important}
html body #sheet.open #owed .owpl{display:flex;gap:6px;flex-wrap:wrap}
html body #sheet.open #owed .owpl button{padding:5px 12px!important;border-radius:16px!important;font-size:12.5px!important;font-weight:900;background:#fff!important;border:1.5px solid #cfd8d4!important;color:#123a33!important}
html body #sheet.open #owed .owpl button.on{background:#6658a6!important;border-color:#6658a6!important;color:#fff!important}
</style>`)}catch(e){}
const OWPAL={hair:["#161616","#3b2a1e","#6b4a2b","#a8743c","#e0c068","#c9c9c9","#ffffff","#b03a3a","#e86aa6","#7a4fd0","#2f6fd6","#2a9a7c"],skin:["#ffe0c4","#f1c7a0","#e0aa7e","#c58a5c","#9b6440","#6b4129"],shirt:["#2b2b3a","#ffffff","#c0392b","#e67e22","#f1c40f","#27ae60","#2980b9","#8e44ad","#e86aa6","#7f8c8d","#005d4d","#6658a6"],pants:["#3b3b4a","#1e1e1e","#2c3e66","#5b4a33","#7f8c8d","#c8b38a","#ffffff","#8e2c2c"],accC:["#333333","#ffffff","#c0392b","#f1c40f","#2980b9","#e86aa6","#27ae60","#8e44ad"]};
let OWD=null;
function owDraft(){const o=G.ow||{};return{name:o.name||"",shop:o.shop||"",age:o.age||28,sex:o.sex||"男性",hair:OW.c.hair,skin:OW.c.skin,shirt:OW.c.shirt,pants:OW.c.pants||"#3b3b4a",eye:OW.c.eye||0,acc:OW.c.acc||0,accC:OW.c.accC||"#333333",...owAccD()}}
const owDirty=()=>{if(!OWD)return false;const b=owDraft();return Object.keys(OWD).some(k=>String(OWD[k])!==String(b[k]))};
function owEdRender(){const po=$("#p-own2");if(!po)return;if(!OWD)OWD=owDraft();const d=OWD;
const sw=(k,l)=>`<div class="owr"><div class="owl">${l}<input type="color" data-owc="${k}" value="${d[k]}"></div><div class="owsw">${OWPAL[k].map(c=>`<button data-ows="${k}" data-v="${c}" class="${String(d[k]).toLowerCase()===c?"on":""}" style="background:${c}" aria-label="${c}"></button>`).join("")}</div></div>`;
const pa=(k,l,ids)=>`<div class="owr"><div class="owl">${l}</div><div class="owpl">${ids.filter(i=>accOwn(i)).map(i=>`<button data-owp="${k}" data-v="${i}" class="${+d[k]===i?"on":""}" ${k==="accE"&&+d.accH===8&&i?"disabled style=\"opacity:.35\"":""}>${esc(i?ACCN[i]:"なし")}</button>`).join("")}</div></div>`;
const pl=(k,l,arr)=>`<div class="owr"><div class="owl">${l}</div><div class="owpl">${arr.map((n,i)=>`<button data-owp="${k}" data-v="${i}" class="${+d[k]===i?"on":""}">${esc(n)}</button>`).join("")}</div></div>`;
po.innerHTML=`<div id="owcat">${Object.entries(OWCAT).map(([k,c])=>`<button data-owk="${k}">${c[4]} ${c[0]}</button>`).join("")}<button data-owk="edit" class="on">🎨 色・名前</button></div>
<div id="owed"><div class="owr"><div class="owl">名前</div><input type="text" data-owt="name" maxlength="8" value="${esc(d.name)}" placeholder="店長"></div>
<div class="owr"><div class="owl">店名</div><input type="text" data-owt="shop" maxlength="10" value="${esc(d.shop)}" placeholder="シーシャ屋さん"></div>
<div class="owr"><div class="owl">年齢</div><input type="number" data-owt="age" min="18" max="80" value="${d.age}"></div>
<div class="owr"><div class="owl">性別</div><div class="owpl">${["男性","女性"].map(x=>`<button data-owsx="${x}" class="${d.sex===x?"on":""}">${x}</button>`).join("")}</div>${sw("hair","髪の色")}${HC2.includes(OW.c.h2|0)?sw("hc2","髪の2色目"):""}${sw("skin","肌の色")}${sw("shirt","服の色")}${sw("pants","ズボンの色")}${pl("eye","目",EYN)}${pa("accE","目元",ACC_E)}${d.accE?sw("accCE","目元の色"):""}${pa("accH","頭",ACC_H)}${d.accH?sw("accCH","頭の色"):""}${pa("accM","口元",ACC_M)}${d.accM?sw("accCM","口元の色"):""}${+d.accH===8?`<div class="owr" style="font-size:11px;color:#8a8a8a">フルフェイスヘルメットの時は目元を付けられません</div>`:""}${kgRow(d)}
</div></div>`;
po.onclick=e=>{const k=e.target.closest("[data-owk]");if(k){e.stopPropagation();if(k.dataset.owk!=="edit"){OWD=null;OWK=k.dataset.owk;OWPV=null;owRender();owStage();fmBtn(null)}return}
const s2=e.target.closest("[data-ows]");if(s2){e.stopPropagation();OWD[s2.dataset.ows]=s2.dataset.v;owEdRender();owEdStage();return}
const p2=e.target.closest("[data-owp]");if(p2){e.stopPropagation();OWD[p2.dataset.owp]=+p2.dataset.v;owEdRender();owEdStage();return}
const x2=e.target.closest("[data-owsx]");if(x2){e.stopPropagation();OWD.sex=x2.dataset.owsx;owEdRender();owEdStage();return}};
po.oninput=e=>{const t=e.target;if(t.dataset.owc){OWD[t.dataset.owc]=t.value;owEdStage();po.querySelectorAll(`[data-ows="${t.dataset.owc}"]`).forEach(b=>b.classList.remove("on"))}else if(t.dataset.owt){OWD[t.dataset.owt]=t.dataset.owt==="age"?(+t.value||28):t.value;owEdStage(1)}}}
function owEdStage(noStage){if(!noStage){const L=Object.assign({},OW.c,{hair:OWD.hair,skin:OWD.skin,shirt:OWD.shirt,pants:OWD.pants,eye:OWD.eye},owAccLook(OWD));const keep=FMS.ang;fmsSet("p",L,`<div class="tl" style="background:none;padding:0;font-size:15px">${esc(OWD.name||"店長")}<div style="font-size:10.5px;color:#8fc9bc;font-weight:700">${owDirty()?"変更中…（まだ保存していません）":esc(OWD.shop||shopNm())+" の店主"}</div></div>`);FMS.ang=keep}fmBtn(owDirty()?"保存する ▶":null)}
function owEdSave(){const o=G.ow;if(!o||!OWD)return;const d=OWD;o.name=(d.name||"").trim()||o.name||"店長";o.shop=[...(d.shop||"").trim()].slice(0,10).join("");o.age=Math.max(18,Math.min(80,+d.age||28));o.sex=d.sex;Object.assign(o,{hair:d.hair,skin:d.skin,shirt:d.shirt,pants:d.pants,eye:+d.eye,acc:+d.acc,accC:d.accC});applyOwLook();save();OWD=null;owEdRender();owEdStage();try{shopLine();hud()}catch(e){}try{toast("🎨 店主の見た目を保存しました")}catch(e){}}
/* 「色・名前」タブを開いたら前の画面ではなく、この場の編集を出す */
{const _or=owRender;owRender=function(){const r=_or.apply(this,arguments);const po=$("#p-own2");if(po){const old=po.onclick;po.onclick=e=>{const k=e.target.closest("[data-owk]");if(k&&k.dataset.owk==="edit"){e.stopPropagation();OWD=owDraft();OWPV=null;owEdRender();owEdStage();return}return old&&old(e)}}return r}}
{const _fg3=fmGo;fmGo=function(){if(FMTAB==="owner"&&OWD){owEdSave();return}return _fg3.apply(this,arguments)}}
{const _ft3=fmTab;fmTab=function(k){if(k!=="owner")OWD=null;return _ft3.apply(this,arguments)}}

/* ===== 模様替え中は「模様替えを終わる」を上に大きく出す／全画面メニューの一番下が隠れないよう余白 ===== */
try{document.head.insertAdjacentHTML("beforeend",`<style>
html body.mvmode #mvbtn{position:fixed!important;top:calc(var(--uit,104px) + 10px)!important;bottom:auto!important;left:50%!important;right:auto!important;transform:translateX(-50%)!important;z-index:60!important;background:#6658a6!important;color:#fff!important;border:2px solid #fff!important;font-size:15px!important;padding:10px 18px!important;border-radius:22px!important;white-space:nowrap}
html body.mvmode #shopln,html body.mvmode #atm,html body.mvmode #tutarw{display:none!important}
html body #sheet.open{padding-bottom:calc(env(safe-area-inset-bottom,0px) + 140px)!important}
</style>`)}catch(e){}

/* ===== 開店前の「今日の行動」を新デザインに（緑×紫）。メニュー側は結果だけ表示 ===== */
try{document.head.insertAdjacentHTML("beforeend",`<style>
#ov .card.mnc{padding:0!important;background:#f3f1ea!important;color:#123a33!important;border-radius:16px!important;overflow:hidden;border:none!important;max-width:440px}
.mnc .mh{background:#005d4d;color:#fff;padding:14px 14px 12px}
.mnc .mh .t{font-weight:900;font-size:20px;letter-spacing:2px}.mnc .mh .t small{display:block;font-size:10px;color:#8fc9bc;letter-spacing:1px;font-weight:700}
.mnc .mh .w{margin-top:8px;display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:13px;font-weight:700}
.mnc .mh .pu{background:#6658a6;border-radius:9px;padding:3px 10px;font-weight:900;font-size:15px;white-space:nowrap}.mnc .mh .pu:before{content:"¥ ";color:#ffd76a}
.mnc .ms{display:grid;grid-template-columns:repeat(5,1fr);gap:5px;padding:10px 12px 2px}
.mnc .ms div{background:#fff;border-radius:10px;text-align:center;padding:6px 0}.mnc .ms small{display:block;font-size:9.5px;color:#7f9690;font-weight:700;white-space:nowrap}.mnc .ms b{font-size:15px;font-weight:900}
.mnc .mw{margin:6px 12px 0;font-size:12px;font-weight:700;color:#e2557a}
.mnc .mq{padding:8px 14px 2px;font-size:13px;font-weight:900;color:#6658a6}
.mnc .mg{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:6px 12px}
#ov .mnc .mg button{display:block!important;width:100%!important;text-align:left!important;background:#fff!important;border:1.5px solid #ecebe4!important;border-radius:12px!important;padding:10px 12px!important;color:#123a33!important;min-height:92px;margin:0!important;box-shadow:none!important}
#ov .mnc .mg button .e{font-size:20px;display:block}#ov .mnc .mg button b{display:block;font-size:14.5px;font-weight:900}#ov .mnc .mg button small{display:block;font-size:11px;color:#7f9690;line-height:1.4;margin-top:2px}
#ov .mnc .mg button.s{background:#6658a6!important;border-color:#6658a6!important;color:#fff!important}#ov .mnc .mg button.s small{color:#e8e4ff}
#ov .mnc .mg button:disabled{opacity:.45}
#ov .mnc .mg button:last-child:nth-child(odd){grid-column:1/-1;min-height:0}
.mnc .mn{padding:4px 14px 2px;font-size:11px;color:#5c7a73;line-height:1.5}
.mnc .mb{display:flex;gap:10px;padding:10px 12px 12px}
#ov .mnc .mb button{flex:1;font-weight:900!important;font-size:15px!important;border-radius:14px!important;padding:11px 0!important;background:#fff!important;border:2px solid #005d4d!important;color:#005d4d!important;margin:0!important;box-shadow:none!important}
#ov .mnc .mb button.a{flex:1.8;background:#6658a6!important;border-color:#6658a6!important;color:#fff!important}#ov .mnc .mb button.a:disabled{opacity:.45}
#fmst2{display:none}html body #sheet.open #fmst2{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:6px 0 2px}
#fmst2 .tx{font-size:13px;font-weight:900}
html body #sheet.open #fmst2 button{background:#6658a6!important;color:#fff!important;border:none!important;border-radius:12px!important;padding:9px 14px!important;font-weight:900!important;font-size:13.5px!important;white-space:nowrap}
html body #sheet.open #fmact,html body #sheet.open #fmdone{display:none!important}
</style>`)}catch(e){}
const MNA={sns:["📱","SNS更新"],prac:["🔥","シーシャの練習"],visit:["🚶","他店舗へ視察"],focus:["🤝","お店に集中"]};
showMorning=function(){if(!canAct())return;if(typeof evMorning==="function"&&evMorning())return;const snsL=(evx().sns||0)>G.day;const o=G.ow,w=WXI[G.wx[G.wd]],e=G.ev[G.wd],ty=G.wx[G.wd]==="typhoon";
const L=[["sns","無料・知名度とフォロワーが上がる。たまにバズる",snsL?"スマホが壊れていて更新できない（あと"+((evx().sns)-G.day)+"日）":"",!snsL],
["prac","¥500・技術アップ（"+tierTxt(o.skill)+"）","",G.money>=500],

["visit","¥3,500・今日は休業・月1回。技術と知名度が少し上がる",G.vm===G.month?"今月はもう視察しました":"",G.money>=3500&&!ty&&G.vm!==G.month],
["focus","無料・話しかけの親密度1.5倍（SNSは更新しない）","",true]];
ov(`<div class="card mnc"><div class="mh"><div class="t">TODAY<small>開店前：今日の行動を選ぼう</small></div><div class="w"><span>${MN[G.month%12]}月 ${WD[G.wd]}曜　${w[0]} ${w[1]}${e?"／"+esc(e.n):""}</span><span class="pu">${G.money===Infinity?"∞":Math.round(G.money).toLocaleString()}</span></div></div>
<div class="ms"><div><small>👀 知名度</small><b>${Math.round(o.fame)}</b></div><div><small>⭐ スター性</small><b>${o.star}</b></div><div><small>💨 技術</small><b>${sk1(o.skill)}</b></div><div><small>📱 フォロワー</small><b>${o.fol.toLocaleString()}</b></div></div>

<div class="mq">今日の行動を1つ選んでください</div>
<div class="mg">${L.map(([k,d,why,ok])=>`<button data-mo="${k}" ${ok?"":"disabled"}><span class="e">${MNA[k][0]}</span><b>${MNA[k][1]}</b><small>${esc(why||d)}</small></button>`).join("")}</div>
<div class="mn">行動は1日1回。SNSを更新しない日はフォロワーが減ります。</div>
<div class="mb"><button id="mnskip">あとで</button><button id="mngo" class="a" data-o="" disabled>この行動にする ▶</button></div></div>`);R.mOpen=1;
const box=document.querySelector("#ov .mnc");if(box)box.onclick=ev=>{const b=ev.target.closest("[data-mo]");if(!b||b.disabled)return;ev.stopPropagation();box.querySelectorAll("[data-mo]").forEach(x=>x.classList.toggle("s",x===b));const g=document.getElementById("mngo");g.dataset.o=b.dataset.mo;g.disabled=false;g.textContent=MNA[b.dataset.mo][1]+"にする ▶"}};
/* 何をしたかを覚えておく（メニューに表示） */
{const _ac=act;act=function(k){const was=G.ow&&G.ow.acted;const r=_ac.apply(this,arguments);try{if(G.ow&&G.ow.acted&&!was){G.actK=k;G.actD=G.day}}catch(e){}return r}}
/* メニュー営業タブ：行動カードの代わりに結果か「行動を選ぶ」 */
fmAct=function(){const o=$("#own");if(!o)return;let d=$("#fmst2");if(!d){d=document.createElement("div");d.id="fmst2";o.appendChild(d);d.onclick=e=>{if(e.target.closest("[data-mopen]")){e.stopPropagation();showMorning()}}}
const acted=G.ow&&G.ow.acted,k=G.actD===G.day?G.actK:null,can=typeof canAct==="function"&&canAct();
const h=acted?`<span class="tx" style="color:#2a9a7c">✅ 今日の行動：${k&&MNA[k]?MNA[k][0]+" "+MNA[k][1]:"実行済み"}</span>`:can?`<span class="tx" style="color:#e2557a">今日の行動がまだです</span><button data-mopen="1">行動を選ぶ ▶</button>`:`<span class="tx" style="color:#7f9690">開店前に1日1回えらべます</span>`;if(d._h!==h){d._h=h;d.innerHTML=h}};
try{fmAct()}catch(e){}

/* ===== iPhoneのSafari対策：全画面メニューの高さを実際に見えている高さに合わせ、外側のページは動かないようにする ===== */
try{document.head.insertAdjacentHTML("beforeend",`<style>
html body #sheet.open{height:100vh!important;height:100dvh!important;max-height:100dvh!important;bottom:auto!important;overscroll-behavior:contain!important;-webkit-overflow-scrolling:touch}
html.fmopen,html.fmopen body{overflow:hidden!important;overscroll-behavior:none!important;height:100%!important}
html body #sheet.open #fmb{bottom:calc(env(safe-area-inset-bottom,0px) + 12px)!important}
html body #sheet.open>*:last-child{margin-bottom:0}
#fmpad{height:150px}
</style>`)}catch(e){}
setTimeout(()=>{try{const sh=$("#sheet");if(!sh)return;if(!$("#fmpad")){const p=document.createElement("div");p.id="fmpad";sh.appendChild(p)}
const sync=()=>{const on=sh.classList.contains("open");document.documentElement.classList.toggle("fmopen",on);if(on){try{window.scrollTo(0,0)}catch(e){}const p=$("#fmpad");if(p&&p.nextSibling)sh.appendChild(p)}};
new MutationObserver(sync).observe(sh,{attributes:true,attributeFilter:["class"]});sync()}catch(e){}},50);

/* ===== 起動時・登録時の店主プロフィール設定を新デザインに（名前・店名が一番上） ===== */
try{document.head.insertAdjacentHTML("beforeend",`<style>
#ov .card:has(.owf2){background:#f3f1ea!important;color:#123a33!important;border:none!important;border-radius:16px!important}
#ov .card:has(.owf2)>b{font-size:17px;font-weight:900;color:#005d4d}
#ov .card:has(.owf2) .m{color:#5c7a73!important}
#ov .card:has(.owf2) select,#ov .card:has(.owf2) input[type=text],#ov .card:has(.owf2) input[type=number]{background:#fff!important;color:#123a33!important;border:1.5px solid #cfd8d4!important;border-radius:10px!important;padding:8px 10px!important;font-size:15px!important;width:100%!important;box-sizing:border-box!important}
#ov .card:has(.owf2) #own0,#ov .card:has(.owf2) #start0,#ov .card:has(.owf2) #owok{width:100%;margin-top:10px;background:#6658a6!important;color:#fff!important;border:none!important;border-radius:14px!important;padding:12px 0!important;font-weight:900!important;font-size:16px!important}
.owf2 .ofstg{position:sticky;top:-2px;z-index:5;background:#005d4d;border-radius:12px;height:170px;margin:8px 0 10px;box-shadow:0 6px 10px -6px rgba(0,40,30,.4);display:flex;align-items:center;justify-content:center}
.owf2 .ofstg canvas{width:150px!important;height:160px!important}
#ov .card:has(.owf2){overflow:visible!important}
#ov .owf2 .ofstg button{position:absolute;top:50%;transform:translateY(-50%);width:36px!important;height:36px!important;border-radius:50%!important;background:#6658a6!important;color:#fff!important;border:none!important;padding:0!important;font-size:14px!important}
#ov .owf2 .ofstg button[data-ow=L]{left:10px}#ov .owf2 .ofstg button[data-ow=R]{right:10px}
.owf2 .ofsec{background:#fff;border-radius:12px;padding:2px 12px;margin-bottom:10px}
.owf2 .ofrw{padding:9px 0;border-bottom:1px solid #ecebe4}.owf2 .ofrw:last-child{border-bottom:none}
.owf2 .oflb{display:flex;justify-content:space-between;align-items:center;font-size:13px;font-weight:900;margin-bottom:6px}
.owf2 .ofsw{display:flex;flex-wrap:wrap;gap:7px}
#ov .owf2 .ofsw button{width:28px!important;height:28px!important;min-width:0!important;padding:0!important;border-radius:50%!important;border:2px solid #fff!important;box-shadow:0 0 0 1.5px #cfd8d4!important;margin:0!important;flex:none}
#ov .owf2 .ofsw button.on{box-shadow:0 0 0 2.5px #6658a6!important}
#ov .owf2 input[type=color]{width:34px!important;height:30px!important;padding:0!important;border:none!important;background:none!important}
.owf2 .ofpl{display:flex;flex-wrap:wrap;gap:6px}
#ov .owf2 .ofpl button{padding:5px 12px!important;border-radius:16px!important;font-size:12.5px!important;font-weight:900!important;background:#fff!important;border:1.5px solid #cfd8d4!important;color:#123a33!important;margin:0!important}
#ov .owf2 .ofpl button.on{background:#6658a6!important;border-color:#6658a6!important;color:#fff!important}
.owf2 label{display:block}.owf2 label>span{display:block;font-size:13px;font-weight:900;margin-bottom:6px}
</style>`)}catch(e){}
function ownForm2(){R.od=R.od||OWD0();const c=R.od;
const sw=(k,l)=>`<div class="ofrw"><div class="oflb">${l}<input type="color" data-ok="${k}" value="${c[k]||"#333333"}"></div><div class="ofsw">${(OWPAL[k]||[]).map(x=>`<button type="button" data-oksw="${k}" data-v="${x}" class="${String(c[k]||"").toLowerCase()===x?"on":""}" style="background:${x}"></button>`).join("")}</div></div>`;
const pl=(k,l,arr,cur)=>`<div class="ofrw"><div class="oflb">${l}</div><input type="hidden" data-ok="${k}" value="${cur}"><div class="ofpl">${arr.map((n,i)=>`<button type="button" data-okp="${k}" data-v="${i}" class="${+cur===i?"on":""}">${esc(n)}</button>`).join("")}</div></div>`;
return`<div class="owf2"><div class="ofstg"><canvas id="owcv" width="160" height="170"></canvas><button type="button" data-ow="L">◀</button><button type="button" data-ow="R">▶</button></div>
<div class="ofsec"><div class="ofrw"><div class="oflb">店名</div><input type="text" data-ok="shop" maxlength="10" placeholder="シーシャ屋さん" value="${esc(c.shop||"")}"></div>
<div class="ofrw"><div class="oflb">名前</div><input type="text" data-ok="name" maxlength="8" placeholder="店長" value="${esc(c.name||"")}"></div>
<div class="ofrw"><div class="oflb">年齢</div><input type="number" data-ok="age" min="18" max="80" value="${c.age}"></div>
${pl("sex","性別",["男性","女性"],c.sex==="女性"?1:0)}</div>
<div class="ofsec"><div class="ofrw">${owSel("hs","髪型",HSN,c)}</div><div class="ofrw">${owSel("top","服の種類",TOPN,c)}</div><div class="ofrw">${owSel("bot","ズボンの種類",BOTN,c)}</div></div>
<div class="ofsec">${sw("hair","髪の色")}${HC2.includes(OW.c.h2|0)?sw("hc2","髪の2色目"):""}${sw("skin","肌の色")}${sw("shirt","服の色")}${sw("pants","ズボンの色")}${pl("eye","目",EYN,c.eye||0)}${pl("acc","装飾品",ACCN,c.acc||0)}${sw("accC","装飾品の色")}</div></div>`};
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-oksw],[data-okp]");if(!b||!R.od)return;const box=b.closest(".ofrw");if(!box)return;
const k=b.dataset.oksw||b.dataset.okp,inp=box.querySelector(`[data-ok="${k}"]`);if(!inp)return;inp.value=b.dataset.v;inp.dispatchEvent(new Event("input",{bubbles:true}));box.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b))});

