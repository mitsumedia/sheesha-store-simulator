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
