/* ===== 外観モードの軽量化：屋根（高さ24以上）は別の絵に1回だけ描いておき、毎フレームそれを貼るだけにする =====
   屋根の下の人は外からは見えないので、屋根を店内の人より後に描いても見た目は同じ。通行人は屋根の後（前景）に描かれる */
const ROOFC={key:"",c:null,n:0};let ROOF_SPLIT=0;
const isRoofV=o=>R.ext&&o&&o.v&&!o.v.fn&&o.v[2]>=24;
let statFG0=null;{const _sfg=statFG;statFG0=_sfg;let src=null,out=null;statFG=function(k){const L=_sfg.apply(this,arguments);if(!ROOF_SPLIT||!R.ext)return L;if(src!==L){src=L;out=L.filter(o=>!isRoofV(o))}return out}}
function roofDraw(k){const key=scnKey(k)+"|"+R.ext;if(!ROOFC.c)ROOFC.c=document.createElement("canvas");const c=ROOFC.c;
 if(ROOFC.key!==key||c.width!==cv.width||c.height!==cv.height){if(c.width!==cv.width||c.height!==cv.height){c.width=cv.width;c.height=cv.height}const g=c.getContext("2d");g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,CH);
  const L=statFG0(k).filter(isRoofV);const oc=cx;cx=g;try{for(const o of L)dv(o.v,k)}finally{cx=oc}ROOFC.key=key;ROOFC.n++}
 cx.save();cx.setTransform(1,0,0,1,0,0);cx.drawImage(c,0,0);cx.restore()}
{const _sd=scnDraw;scnDraw=function(k){if(!R.ext)return _sd.apply(this,arguments);ROOF_SPLIT=1;let r;try{r=_sd.apply(this,arguments)}finally{ROOF_SPLIT=0}if(r){try{roofDraw(k)}catch(e){}}return r}}

/* タップした時の返事は、店長の次に優先して必ず出す（♥の吹き出しで埋まっていても） */
{const _tk=talk;talk=function(p){const b0=p&&p.bub,t0=p&&p.bt;const r=_tk.apply(this,arguments);try{if(p&&p!==OW&&(p.bub!==b0||p.bt!==t0)&&p.bt>0)p.tkT=performance.now()}catch(e){}return r}}
/* 外観モードで掃除を始めたら店内表示にして、終わったら外観に戻す。掃除はいつもデフォルトの画角で始める */
{let CLX=0;const _cp=cleanPlay;cleanPlay=function(){CLX=0;if(R.ext){CLX=1;try{extSet(0)}catch(e){}}try{camReset()}catch(e){}return _cp.apply(this,arguments)};
 const _ce=cleanEnd;cleanEnd=function(){const r=_ce.apply(this,arguments);if(CLX){CLX=0;try{if(!R.ext&&!R.vis)extSet(1)}catch(e){}}return r}}
/* 図鑑：まだ会っていない（街にいる）お客さんは真っ黒なシルエット */
try{const st=document.createElement("style");st.textContent=".dxt img.xf.sil{filter:brightness(0)!important;opacity:1!important;-webkit-user-drag:none;pointer-events:none}";document.head.appendChild(st)}catch(e){}
/* QRコードの部品（qr.js）は、お店めぐりでQRを使う時だけ読み込む。サーバーに無ければGitHub経由（jsDelivr）から */
let QRP=null;function qrLoad(){if(typeof qrcode==="function"&&typeof jsQR==="function")return Promise.resolve(1);if(QRP)return QRP;
 const one=u=>new Promise((ok,ng)=>{const s=document.createElement("script");s.src=u;s.async=true;s.onload=()=>(typeof qrcode==="function"&&typeof jsQR==="function")?ok(1):ng();s.onerror=ng;document.head.appendChild(s)});
 QRP=one("qr.js?v=1").catch(()=>one("https://cdn.jsdelivr.net/gh/mitsumedia/sheesha-store-simulator@main/qr.js")).catch(e=>{QRP=null;throw e});return QRP}
{const qw=fn=>async function(){try{await qrLoad()}catch(e){try{toast("QRの部品を読み込めませんでした。通信を確認してね")}catch(_){}return}return fn.apply(this,arguments)};visShow=qw(visShow);visScan=qw(visScan);
 const _vp=visPanel;visPanel=function(){const r=_vp.apply(this,arguments);qrLoad().catch(()=>{});return r}}
/* お店めぐりQR：お店のデータはサーバーに預けて、QRには短いコード（SV2＋8文字）だけを入れる。サーバーに届かない時は今まで通りの大きいQR */
{const _ve=visEnc;visEnc=async function(lv){const s=await _ve.apply(this,arguments);if(lv>0)return s;try{const r=await api({a:"vput",d:btoa(s)});if(r&&r.code)return"SV2"+r.code}catch(e){}return s}}
{const _vg=visGot;visGot=async function(u8){try{if(u8&&u8.length<=16&&String.fromCharCode(u8[0],u8[1],u8[2])==="SV2"){const code=String.fromCharCode(...u8.slice(3));let r;
 try{r=await api({a:"vget",c:code})}catch(e){const d=visPan(`<div class="xh">📷 読み取れませんでした</div><div class="xw">${esc(e.message||"通信できませんでした")}</div><div class="xb"><button data-vp="b" style="flex:1">戻る</button><button data-vp="r" class="on" style="flex:1">もう一度</button></div>`);d.onclick=ev=>{if(ev.target.closest("[data-vp=b]"))visPanel();if(ev.target.closest("[data-vp=r]"))visScan()};return}
 const b=atob(r.d),a=new Uint8Array(b.length);for(let i=0;i<b.length;i++)a[i]=b.charCodeAt(i);return _vg.call(this,a)}}catch(e){}return _vg.apply(this,arguments)}}
/* シャッターを開ける場面の間に来たお客さんは、入口の横の歩道に並んで待ち、開き切って店主が中に入ったら順に入店
   （待っている間はシャッターより手前に描くため、店主と同じく街の人として描く） */
const OPWQ=[];const opCine=()=>!!(R.cine&&/^open/.test(R.cine.k||""));
{const _ar=arrive;arrive=function(m){const n0=R.people.length;const r=_ar.apply(this,arguments);try{if(opCine())R.people.slice(n0).forEach(p=>{if(p.st!=="in")return;const k=OPWQ.length,wx=-3.6-(k>>2)*1.5,wy=20.5+(k%4)*2.4;
 const e={T:MBG,c:p.c,s:1,x:wx,y:wy,a:1,t:0,sp:0,tag:1,seen:1,wq:1,face:1};MB.L.push(e);p.wq={path:p.path,e,x:wx,y:wy};p.st="wait";p.path=[];p.x=-999;p.y=-999;p.wt0=performance.now()+Math.random()*1500;OPWQ.push(p)})}catch(e){}return r}}
function opWaitTick(){if(!OPWQ.length)return;const now=performance.now();
 if(opCine()){for(const p of OPWQ){const e=p.wq&&p.wq.e;if(e&&!MB.L.includes(e))MB.L.push(e);if(now>p.wt0&&e){p.wt0=now+1200+Math.random()*2200;e.face=Math.random()<.6?1:0;e.s=Math.random()<.5?1:-1;if(Math.random()<.18&&!(p.bt>0)){try{say(p,["開店まだかな〜","そろそろかな","いい匂いしてきた","一番乗り！"][Math.random()*4|0])}catch(_){}}}}return}
 if(!OPWQ.nx||now>=OPWQ.nx){const p=OPWQ.shift();if(p&&p.wq){MB.L=MB.L.filter(q=>q!==p.wq.e);if(p.st==="wait"&&R.people.includes(p)){p.x=p.wq.x;p.y=p.wq.y;p.st="in";p.path=[[-1,15]].concat(p.wq.path)}p.wq=null}OPWQ.nx=now+650;if(!OPWQ.length)OPWQ.nx=0}}
{const _tk=tick;tick=function(){try{opWaitTick()}catch(e){}return _tk.apply(this,arguments)}}
