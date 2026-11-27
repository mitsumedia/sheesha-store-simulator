/* ===== 🪑 家具シリーズ：解放・ボーナス・見た目・一覧 ===== */
/* --- 持っているか（一度でも手に入れた物を覚える） --- */
function sOwnInit(){if(G.sown)return;const s=new Set();(G.decor||[]).forEach(d=>s.add(d.id));(G.wall||[]).forEach(d=>s.add(d.id));(G.inv||[]).forEach(it=>{if(it.id)s.add(it.id)});G.sown=[...s];G.sbon=G.sbon||[]}
function sOwn(id){sOwnInit();return G.sown.includes(id)}
function sOwnAdd(id){sOwnInit();if(!id||G.sown.includes(id))return;G.sown.push(id);sBonChk()}
/* --- 解放 --- */
const SCNM={fame:"知名度",star:"スター性",skill:"技術"};
function sItem(id){return id.startsWith("wp_")?WP.find(q=>q.id===id):DEC.find(q=>q.id===id)}
function sCondOk(i){const c=SCOND[i];if(!c)return true;const o=G.ow||{};return(o[c[0]]||0)>=c[1]}
function serOpen(x){const s=SERI[x.u[1]],i=x.u[2];if(!s)return false;if(i===0)return true;return sOwn(s.it[i-1])&&sCondOk(i)}
function serCond(x){const s=SERI[x.u[1]],i=x.u[2];if(!s||i===0)return"最初から";const pv=sItem(s.it[i-1]),c=SCOND[i],o=G.ow||{},L=[];
 if(!sOwn(s.it[i-1]))L.push("「"+(pv?pv.n:"前の置物")+"」を買う");if(c&&!sCondOk(i))L.push(SCNM[c[0]]+c[1]+"（今"+Math.floor(o[c[0]]||0)+"）");return L.length?L.join("＋"):"解放ずみ"}
{const _do=decOpen;decOpen=function(x){if(!x||!x.u)return false;if(x.hide)return false;if(x.u[0]==="ser")return serOpen(x);if(x.u[0]==="sbon")return false;return _do(x)}}
{const _dc=decCond;decCond=function(x){if(x&&x.u&&x.u[0]==="ser")return serCond(x);if(x&&x.u&&x.u[0]==="sbon")return"シリーズを10個そろえるともらえる";return _dc(x)}}
{const _wo=wpOpen;wpOpen=function(x){if(x&&x.u&&x.u[0]==="ser")return serOpen(x);return _wo(x)}}
{const _wc=wpCond;wpCond=function(x){if(x&&x.u&&x.u[0]==="ser")return serCond(x);if(x&&x.u&&x.u[0]==="year")return"3年間の営業で届く";return _wc(x)}}
/* --- ボーナス：10個そろったら持ち物へ --- */
function sBonChk(){if(!G.sown)return;G.sbon=G.sbon||[];SER.forEach(s=>{if(G.sbon.includes(s.id))return;if(!s.it.every(id=>G.sown.includes(id)))return;G.sbon.push(s.id);const b=DEC.find(q=>q.id===s.bo[0]);if(!b)return;
 let ok=false;try{ok=ivAdd({t:"d",id:b.id})}catch(e){}G.sown.push(b.id);log("🎁 「"+s.n+"」シリーズを10個そろえた！ボーナス「"+b.n+"」が届きました"+(ok?"（📦 持ち物へ）":"（持ち物がいっぱい：受け取り待ちへ）"));
 try{if(typeof tutCard==="function")setTimeout(()=>tutCard("🎁 <b>「"+esc(s.n)+"」シリーズ コンプリート！</b><br>ボーナスの「"+esc(b.n)+"」が届きました。<br>装飾 → 持ち物 から飾れます"),300)}catch(e){}})}
/* 置いた・貼った物を「持っている」に入れる */
{const _pl=place;place=function(tx,ty){const n0=G.decor.length,r=_pl.apply(this,arguments);if(G.decor.length>n0)sOwnAdd(G.decor[G.decor.length-1].id);return r}}
{const _wp=wallPlace;wallPlace=function(w){const x=R.tool&&WP.find(q=>q.id===R.tool);if(x&&R.tool!=="rm"&&!ivF()&&x.u&&x.u[0]==="ser"&&!serOpen(x)){log("🔒 "+serCond(x)+"で解放されます");return}
 const n0=(G.wall||[]).length,r=_wp.apply(this,arguments);if((G.wall||[]).length>n0)sOwnAdd(G.wall[G.wall.length-1].id);return r}}
/* --- 見た目：モデルからボクセルを作る（回転・何マス分か） --- */
const SMULTI={sb_wheel:1,sb_kare:1,sb_turn:1,sb_mahou:1,sb_hockey:1,sb_lander:1,sb_oasis:1,sb_gate:1,sb_raiko:1,sb_shark:1,sb_parthenon:1};
/* 見本は正面が-y側。お店のカメラは-x側から見るので、正面が-xを向くように回しておく（x=0側が正面の見本は回さない・扉は壁に付ける向き） */
const SROT0={s_medal:0,s_punch:0,s_rhythm:0,sb_lion:0,s_door:1};const sRb=id=>SROT0[id]!==undefined?SROT0[id]:3;
const SANIM={sb_shark:"tail",s_wakame:"sway"};
function sRaw(x){if(x._vx)return x._vx;const[m,k]=x.m.split("."),a=[];try{SDZ[m][k]((X,Y,Z,c,s)=>{if(c)a.push([X,Y,Z,c,s||.5])})}catch(e){}
 let mx=0,my=0;a.forEach(v=>{mx=Math.max(mx,v[0]+v[4]);my=Math.max(my,v[1]+v[4])});x.fw=SMULTI[x.id]?Math.min(2,Math.max(1,Math.ceil((mx-.01)/6))):1;x.fh=SMULTI[x.id]?Math.min(2,Math.max(1,Math.ceil((my-.01)/6))):1;
 let L=a;const rb=sRb(x.id);if(rb){const W=x.fw*6,H=x.fh*6;L=a.map(v=>serRot(v,rb,W,H));if(rb&1){const t=x.fw;x.fw=x.fh;x.fh=t}}
 if(SANIM[x.id]==="tail")L=L.filter(v=>!sTail(v));if(SANIM[x.id]==="sway")L=L.filter(v=>!sFrond(v));return x._vx=L}
function serRot(v,r,W,H){const[x0,y0,z,c,s]=v;return r===1?[H-y0-s,x0,z,c,s]:r===2?[W-x0-s,H-y0-s,z,c,s]:r===3?[y0,W-x0-s,z,c,s]:[x0,y0,z,c,s]}
function sDim(x,r){sRaw(x);return(r||0)&1?[x.fh,x.fw]:[x.fw,x.fh]}
function sSlices(x,r){r=(r||0)&3;const W=x.fw*6,H=x.fh*6,[fw,fh]=sDim(x,r),mp=new Map();
 sRaw(x).forEach(v=>{const q=serRot(v,r,W,H),si=Math.floor(q[2]+1e-6),a=Math.max(0,Math.min(fw-1,Math.floor((q[0]+q[4]/2)/6))),b=Math.max(0,Math.min(fh-1,Math.floor((q[1]+q[4]/2)/6))),key=si+"_"+a+"_"+b;if(!mp.has(key))mp.set(key,{si,tk:a+"_"+b,v:[]});mp.get(key).v.push([q[0],q[1],q[2],q[3],undefined,q[4]])});
 return[...mp.values()].sort((p,q)=>p.si-q.si).map(o=>{let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9,z1=o.si+1;o.v.forEach(v=>{x0=Math.min(x0,v[0]);x1=Math.max(x1,v[0]+v[5]);y0=Math.min(y0,v[1]);y1=Math.max(y1,v[1]+v[5]);z1=Math.max(z1,v[2]+v[5])});return{si:o.si,tk:o.tk,v:o.v,bb:[x0,x1,y0,y1,o.si,z1],cx:(x0+x1)/2,cy:(y0+y1)/2}})}
{const _dv=decVox;decVox=function(id,r){const x=typeof id==="string"&&id.length>1?DEC.find(q=>q.id===id):null;if(!x||!x.m)return _dv.apply(this,arguments);r=(r||0)&3;const ck=id+"|"+r;if(DVX[ck])return DVX[ck];return DVX[ck]=sSlices(x,r)}}
{const _ds=decSprite;decSprite=function(id,s,k,r){return _ds.call(this,s&&s.tk?id+"#"+s.tk:id,s,k,r)}}
/* 一覧用の小さな絵（大きい物も枠に収める） */
{const _di=decIcon;decIcon=function(id){const x=DEC.find(q=>q.id===id);if(!x||!x.m)return _di(id);if(DIC[id])return DIC[id];if(typeof document==="undefined"||!document.createElement)return"";
 const all=[];sSlices(x,0).forEach(s=>s.v.forEach(v=>all.push(v)));if(SANIM[id])sAnimVox(x,0,0).forEach(v=>all.push(v));if(!all.length)return"";
 const yaw=-.6,pit=.6,cp=Math.cos(pit),sp=Math.sin(pit),sa=Math.sin(yaw),ca=Math.cos(yaw),k={cx:-cp*sa,cy:cp*ca,cz:sp,rx:ca,ry:sa,ux:sa*sp,uy:-ca*sp,uz:cp,s:1};
 let a0=1e9,a1=-1e9,b0=1e9,b1=-1e9;all.forEach(v=>{const s2=v[5];for(const dx of[0,s2])for(const dy of[0,s2])for(const dz of[0,s2]){const X=(v[0]+dx)*k.rx+(v[1]+dy)*k.ry,Y=-((v[0]+dx)*k.ux+(v[1]+dy)*k.uy+(v[2]+dz)*k.uz);a0=Math.min(a0,X);a1=Math.max(a1,X);b0=Math.min(b0,Y);b1=Math.max(b1,Y)}});
 const Wd=56,Hd=56,S=Math.min(5.6,(Wd-4)/(a1-a0),(Hd-4)/(b1-b0)),c2=document.createElement("canvas");c2.width=Wd*2;c2.height=Hd*2;const g=c2.getContext&&c2.getContext("2d");if(!g)return"";g.setTransform(2,0,0,2,0,0);
 const k2=Object.assign({},k,{s:S,exx:S*ca,exy:-S*sa*sp,eyx:S*sa,eyy:S*ca*sp,ezy:-S*cp});k2.ox=Wd/2-S*(a0+a1)/2+S*(TX*k2.rx+TY*k2.ry);k2.oy=Hd/2-S*(b0+b1)/2-S*(TX*k2.ux+TY*k2.uy+TZ*k2.uz);
 const oc=cx;cx=g;try{all.map(v=>({v,d:dep(v,k2)})).sort((p,q)=>p.d-q.d).forEach(o=>dv(o.v,k2))}finally{cx=oc}try{return DIC[id]=c2.toDataURL()}catch(e){return""}}}
/* --- 動く置物：サメの尾びれ・ワカメ（毎フレーム動く物として描く） --- */
function sTail(v){return v[3]==="#78909c"&&v[1]>=8.15&&v[4]<=.25}
function sFrond(v){return v[2]>=.5&&v[4]<=.25&&/^#(5d7a1f|7a9a2e|4b6618)$/i.test(v[3])}
const SAF={};
function sAnimVox(x,r,f){const key=x.id+"|"+r+"|"+f;if(SAF[key])return SAF[key];sRaw(x);const[m,k]=x.m.split("."),a=[];const rb=sRb(x.id),W=(rb&1?x.fh:x.fw)*6,H=(rb&1?x.fw:x.fh)*6;
 if(SANIM[x.id]==="tail"){const old=globalThis.AQ_SW;globalThis.AQ_SW=Math.sin(f/8*Math.PI*2);try{SDZ[m][k]((X,Y,Z,c,s)=>{if(c&&sTail([X,Y,Z,c,s||.5]))a.push([X,Y,Z,c,s||.5])})}catch(e){}globalThis.AQ_SW=old}
 else{SDZ[m][k]((X,Y,Z,c,s)=>{const v=[X,Y,Z,c,s||.5];if(c&&sFrond(v)){const sw=Math.sin(f/8*Math.PI*2+Z*.35)*.45*Math.min(1,Z/8);a.push([X+sw,Y,Z,c,v[4]])}})}
 return SAF[key]=a.map(v=>serRot(rb?serRot(v,rb,W,H):v,r,x.fw*6,x.fh*6)).map(v=>[v[0],v[1],v[2],v[3],undefined,v[4]])}
{const _dy=dyn;dyn=function(){const a=_dy.apply(this,arguments);try{if(!R.ext){const f=Math.floor(performance.now()/160)%8;(G.decor||[]).forEach(d=>{if(!SANIM[d.id])return;const x=DEC.find(q=>q.id===d.id);if(!x)return;sRaw(x);const ox=d.tx*6,oy=d.ty*6;sAnimVox(x,(d.r||0)&3,f).forEach(v=>a.push([v[0]+ox,v[1]+oy,v[2],v[3],undefined,v[5]]))})}}catch(e){}return a}}
/* --- 何マスも使う置物 --- */
function decFootK(d){const x=DEC.find(q=>q.id===d.id);if(!x||!x.m||!SMULTI[x.id])return[d.tx+","+d.ty];const[fw,fh]=sDim(x,d.r),o=[];for(let a=0;a<fw;a++)for(let b=0;b<fh;b++)o.push((d.tx+a)+","+(d.ty+b));return o}
tileUsed=function(k,skipF,skipD){if(k==="0,1"||k==="0,2")return true;if(typeof FR!=="undefined"&&(k===FR.tx+","+FR.ty||k===FR.tx+","+(FR.ty+1)))return true;
 if(G.furn.some((F,i)=>i!==skipF&&furnFoot(F).includes(k)))return true;return G.decor.some((d,i)=>i!==skipD&&(d.tx+","+d.ty===k||(SMULTI[d.id]&&decFootK(d).includes(k))))};
decFits=function(tx,ty,skip){const d=G.decor[skip],ks=d?decFootK({id:d.id,tx,ty,r:d.r}):[tx+","+ty];return ks.every(k=>FLS.has(k)&&!tileUsed(k,-1,skip))};
mvObjAt=function(key){const fi=G.furn.findIndex(F=>furnFoot(F).includes(key));if(fi>=0)return{t:"f",i:fi};const di=G.decor.findIndex(d=>decFootK(d).includes(key));if(di>=0)return{t:"d",i:di};return null};
{const _pl=place;place=function(tx,ty){if(R.tool==="rm"){const d=G.decor.find(q=>SMULTI[q.id]&&decFootK(q).includes(tx+","+ty));if(d)return _pl.call(this,d.tx,d.ty);return _pl.apply(this,arguments)}
 if(R.tool&&SMULTI[R.tool]){const ks=decFootK({id:R.tool,tx,ty,r:0});if(!ks.every(k=>FLS.has(k)&&!occ(+k.split(",")[0],+k.split(",")[1]))){const x=DEC.find(q=>q.id===R.tool),[fw,fh]=sDim(x,0);log(fw+"×"+fh+"マス分の空きが必要です（タップしたマスから右・奥へ）");return}}return _pl.apply(this,arguments)}}
/* 回すと場所が足りない時は回さない */
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest('[data-mv="rot"]');if(!b||!R.mvs||R.mvs.t!=="d")return;const d=G.decor[R.mvs.i];if(!d||!SMULTI[d.id])return;
 const ks=decFootK({id:d.id,tx:d.tx,ty:d.ty,r:((d.r||0)+1)&3});if(!ks.every(k=>FLS.has(k)&&!tileUsed(k,-1,R.mvs.i))){log("向きを変えるには、まわりに空きが必要です");e.stopImmediatePropagation();e.preventDefault()}},true);
/* --- 壁アイテムの画像 --- */
WP.forEach(x=>{if(x.wk&&SWIMG[x.wk]){const im=SWIMG[x.wk];x.img=im.img;x.iw=im.iw;x.ih=im.ih;if(im.tall)x.h2=1}});
/* --- お客さんのプレゼント差し替え（余白広：モダンアート、京：「精進せぇ」の掛け軸） --- */
{const mk=(id,n,k,t)=>{let x=WP.find(q=>q.id===id);if(!x){const im=SWIMG[k];x={id,n,p:4000,t,img:im.img,iw:im.iw,ih:im.ih,u:["gift",0]};if(im.tall)x.h2=1;WP.push(x)}return x};
 const a=mk("wp_g_modart","モダンアートの額","modart",{luxury:2}),b=mk("wp_g_shojin","「精進せぇ」の掛け軸","shojin",{asian:2});
 const c1=(G.cs||[]).find(q=>q.name==="余白 広"),c2=(G.cs||[]).find(q=>q.sp==="kyo");GIFT[c1?c1.i:70]=a;GIFT[c2?c2.i:145]=b}
/* --- 一覧：シリーズのタブ --- */
function sProg(s){return s.it.filter(sOwn).length}
function sBtn(id,i){const x=sItem(id);if(!x)return"";const w=id.startsWith("wp_"),op=w?wpOpen(x):decOpen(x),own=sOwn(id),ic=w?x.img:decIcon(id),nw=op&&(w?(G.wnew||[]):(G.dnew||[])).includes(id);
 return`<button class="it dit ${R.tool===id?"on":""} ${op?"":"lock"}" ${op?`data-d="${id}"`:"disabled"}>${ic?`<img src="${ic}" alt="" style="object-fit:contain;image-rendering:${w?"pixelated":"auto"}">`:""}<span>${nw?'<b class="nw">NEW</b>':""}<b style="color:#9a7b4f">${i+1}.</b> ${esc(x.n)}${w?' <small style="display:inline;color:#7a8">［壁］</small>':""}${own?" ✅":""}<small>${op?"¥"+x.p.toLocaleString():"🔒 "+esc(serCond(x))}</small></span></button>`}
function rdecoSer(){sOwnInit();const toraOk=STORA.it.some(id=>{const x=WP.find(q=>q.id===id);return x&&(wpOpen(x)||sOwn(id))});let cur=R.dser||"wa";if(cur==="tora"&&!toraOk)cur="wa";
 const sIc=s=>{const id=s.it[0],x=sItem(id);return id.startsWith("wp_")?(x&&x.img||""):decIcon(id)},chip=(id,ic,nm,sub)=>`<button class="dsc ${cur===id?"on":""}" data-dser="${id}">${ic?`<img src="${ic}" alt="">`:`<i>${sub&&sub.e||"🎁"}</i>`}<span>${esc(nm)}</span>${sub&&sub.p!=null?`<small>${sub.p}/10</small>`:""}</button>`;
 const tabs=SER.map(s=>chip(s.id,sIc(s),s.n,{p:sProg(s)})).join("")+(toraOk?chip("tora",(WP.find(q=>q.id==="wp_toraneon")||{}).img||"","虎虎水煙店",{e:"🐯"}):"")+chip("gift","","もらいもの",{e:"🎁"});
 let h=`<div class="dsct">${tabs}</div>`;
 if(cur==="gift")h+=rdecoGift();else if(cur==="tora")h+=`<div class="dgh">🐯 虎虎水煙店シリーズ（特別な条件で手に入る・お店では買えない）</div>`+STORA.it.map(id=>{const x=WP.find(q=>q.id===id);if(!x)return"";const op=wpOpen(x);return op?wpIt(x):`<button class="it lock" disabled><span>🔒 ？？？<small>${esc(wpCond(x))}</small></span></button>`}).join("");
 else{const s=SERI[cur]||SER[0],b=DEC.find(q=>q.id===s.bo[0]),got=(G.sbon||[]).includes(s.id),n=sProg(s);
  h+=`<div class="dgh">${esc(s.n)}シリーズ　${n}/10　<small style="font-weight:normal">雰囲気：${TL[s.tag]}</small></div>`+s.it.map(sBtn).join("");
  if(b){const ic=decIcon(b.id),[fw,fh]=sDim(b,0);h+=`<div class="dgh">🎁 ボーナス</div><div class="it dit sbo ${got?"":"lock"}">${ic?`<img src="${ic}" alt="" style="object-fit:contain">`:""}<span>${esc(b.n)}${fw*fh>1?"（"+fw+"×"+fh+"マス）":""}<small>${got?"✅ もらいました（持ち物から飾れます）":"10個そろえるともらえる（あと"+(10-n)+"個）"}</small></span></div>`}
  if(s.rel&&s.rel.length){const rl=s.rel.map(id=>WP.find(q=>q.id===id)).filter(Boolean);if(rl.length)h+=`<div class="dgh">関連アイテム<small style="font-weight:normal">（シリーズの数には入りません）</small></div>`+rl.map(wpIt).join("")}}
 $("#dl").innerHTML=h}
function rdecoGift(){const rev={};for(const i in GIFT){const x=GIFT[i];if(x)rev[x.id]=+i}const L=DEC.filter(x=>x.u&&x.u[0]==="gift"||String(x.id).startsWith("gx_")).concat(WP.filter(x=>x.u&&x.u[0]==="gift"));
 const got=L.filter(x=>(G.gfN&&G.gfN[x.id])||sOwn(x.id));let h=`<div class="dgh">🎁 もらいもの　${got.length}/${L.length}<small style="font-weight:normal">（お客さんやシーシャ屋さんからのプレゼント。持ち物から飾れます）</small></div>`;
 h+=got.map(x=>{const w=WP.includes(x),ic=w?(x.img||wpThumb(x)):decIcon(x.id),c=rev[x.id]!=null&&G.cs?G.cs[rev[x.id]]:null,from=c?nm(c):"";return`<div class="it dit">${ic?`<img src="${ic}" alt="" style="object-fit:contain">`:""}<span>${esc(x.n)}${w?" ［壁］":""}<small>${from?esc(from)+" さんから":""}</small></span></div>`}).join("");
 if(got.length<L.length)h+=`<div class="m" style="font-size:12px;margin:6px 2px">まだもらっていない物が ${L.length-got.length} 個あります。常連さんと仲良くなるともらえるかも</div>`;return h}
rdecoList=function(){rdecoSer()};
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-dser]");if(!b)return;R.dser=b.dataset.dser;try{rdeco()}catch(_){}});
/* 壁アイテムのタブは「実績」だけ（お店の壁アイテムは各シリーズの関連アイテムへ） */
{const AK=["flv","talk","fol","buzz"];const _rd=rdeco;rdeco=function(){const r=_rd.apply(this,arguments);try{const wl=$("#wl");if(wl&&(R.dcat||"obj")==="wp")wl.innerHTML=`<div class="dgh">🏆 実績で手に入る壁アイテム</div>`+WP.filter(x=>x.u&&AK.includes(x.u[0])).map(wpIt).join("");const b=document.querySelector('[data-dc="wp"]');if(b&&b.textContent!=="🏆 実績")b.textContent="🏆 実績"}catch(e){}return r}}
/* 見た目（タブの並び） */
if(typeof document!=="undefined"&&document.head){const st=document.createElement("style");st.textContent=`.dsct{display:grid;grid-template-columns:repeat(auto-fill,minmax(54px,1fr));gap:5px;margin:2px 0 8px}.dsc{display:flex;flex-direction:column;align-items:center;padding:4px 2px 3px;font-size:10.5px;border-radius:12px;line-height:1.15;min-width:0}.dsc img{width:34px;height:34px;object-fit:contain;display:block}.dsc i{font-style:normal;font-size:26px;line-height:34px;height:34px}.dsc span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;font-weight:700}.dsc small{display:block;font-size:9.5px;opacity:.75}.dsc.on{background:#7b4fd0;color:#fff;border-color:#7b4fd0}.sbo{cursor:default}`;document.head.appendChild(st)}
/* 前の仕組みで付いた「NEW」のうち、今はまだ買えない物の印は消す */
try{sOwnInit();sBonChk();if(G.dnew)G.dnew=G.dnew.filter(id=>{const x=DEC.find(q=>q.id===id);return x&&decOpen(x)});if(G.dun)G.dun=G.dun.filter(id=>{const x=DEC.find(q=>q.id===id);return x&&decOpen(x)});if(typeof decBadge==="function")decBadge()}catch(e){}
/* 全画面メニューの見本にも、動く部分（尾びれ・ワカメの葉）を入れる */
{const _fv=fmsVox;fmsVox=function(kind,x){const a=_fv.apply(this,arguments);try{if(kind==="d"&&SANIM[x]){const d=DEC.find(q=>q.id===x);sRaw(d);sAnimVox(d,0,0).forEach(v=>a.push(v))}}catch(e){}return a}}
