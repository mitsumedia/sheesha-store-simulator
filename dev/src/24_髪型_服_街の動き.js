/* ===== 髪型：編み込み→七三分け、新しい髪型11種（ツートン6種は2色目を選べる） ===== */
OWH[6][0]="七三分け";
OWH.push(["寝ぐせヘア"],["アシメ"],["角刈り"],["外ハネボブ"],["爆発ヘア"],["メッシュ"],["インナーカラー"],["裾カラー"],["左右ツートン"],["前髪カラー"],["グラデーション"]);
const HC2=[16,17,18,19,20,21];
Object.assign(OWC,{h11:["営業100日",()=>(G.day||0)>=100],h12:["ガチャ"],h13:["図鑑50人",()=>G.cs.filter(c=>c.met).length>=50],h14:["ガチャ"],h15:["のべ来店1,000人",()=>(G.tvis||0)>=1000],
 h16:["ガチャ"],h17:["フォロワー5,000人",()=>((G.ow||{}).fol||0)>=5000],h18:["ガチャ"],h19:["バトルで2回優勝",()=>(G.batW||0)>=2],h20:["ガチャ"],h21:["チェキを30回撮る",()=>(G.ckN||0)>=30]});
OWG.push("h12","h14","h16","h18","h20");
OWPAL.hc2=["#ff5c8a","#ffd84a","#5ac8fa","#7bd389","#b28bff","#ff9f43","#ffffff","#c9c9c9","#e0c068","#2f6fd6","#b03a3a","#161616"];
{const _ox=OWXD;OWXD=function(c,o){const h=c.h2|0;if(h!==7&&h<11)return _ox.apply(this,arguments);
 const c2=Object.assign({},c,{h2:0});try{_ox.call(this,c2,o)}catch(e){}
 const{H,hr,sk,top,back,sides,bangs}=o,dk=dkHex(hr,.72),lt=dkHex(hr,1.3),P=c.hc2||"#ff5c8a";
 const mx=t=>{const a=parseInt(String(hr).slice(1),16),b=parseInt(String(P).slice(1),16),f=s=>Math.round(((a>>s)&255)*(1-t)+((b>>s)&255)*t);return"#"+((1<<24)+(f(16)<<16)+(f(8)<<8)+f(0)).toString(16).slice(1)};
 if(h===7){top();back(0,6);sides(2,4);H(0,5,6,2,1,1,hr);H(2,5,5,6,1,2,hr);H(7,5,4,1,1,1,hr);H(3,0,8,5,6,1,hr);H(4,2,9,3,2,1,lt);H(2,0,7,1,6,1,dkHex(sk,.85))}
 else if(h===11){top();back(0,6);sides(3,3);H(0,5,5,8,1,2,hr);H(1,5,4,1,1,1,hr);H(5,5,4,1,1,1,hr);H(4,2,8,1,1,2,hr);H(5,2,9,1,1,2,hr);H(6,2,10,1,1,1,hr);H(-1,2,5,1,1,1,hr);H(-2,2,6,1,1,1,hr);H(8,3,6,1,1,1,hr);H(9,3,7,1,1,1,hr);H(2,0,8,1,1,1,hr);H(1,-1,8,1,1,1,hr)}
 else if(h===12){top();back(0,6);sides(2,4);H(-1,1,0,1,5,6,hr);H(0,5,2,4,1,5,hr);H(1,5,1,2,1,1,hr);H(4,5,5,4,1,2,hr);H(0,5,7,8,1,1,hr);H(2,5,3,1,1,1,dk)}
 else if(h===13){top();back(0,6);sides(3,3);H(0,0,7,8,6,2,hr);H(0,0,9,8,6,1,lt);H(0,5,5,8,1,2,hr);H(-1,1,4,1,4,3,dk);H(8,1,4,1,4,3,dk)}
 else if(h===14){top();H(-1,0,1,1,6,6,hr);H(8,0,1,1,6,6,hr);H(0,-1,1,8,1,6,hr);H(-2,0,1,1,6,1,hr);H(9,0,1,1,6,1,hr);H(0,-2,1,8,1,1,hr);H(-2,-1,1,1,1,1,hr);H(9,-1,1,1,1,1,hr);bangs();H(-1,0,2,1,6,1,lt);H(8,0,2,1,6,1,lt)}
 else if(h===15){top();back(0,6);sides(3,3);H(0,5,5,8,1,2,hr);for(const[x,y,z]of[[-2,1,6],[-3,3,4],[9,1,6],[10,3,4],[0,-2,6],[6,-2,6],[3,-3,4],[-2,-1,8],[8,-1,8],[0,1,9],[3,0,10],[6,2,9],[2,3,10],[4,3,9],[-2,4,7],[8,4,7],[3,-2,8]])H(x,y,z,2,2,2,(x+y+z)%3?hr:lt)}
 else if(h===16){top();back(0,6);sides(2,4);bangs();H(2,0,7,1,6,1,P);H(2,5,3,1,1,4,P);H(1,5,3,1,1,1,P)}
 else if(h===17){top();H(-1,0,-1,1,6,8,P);H(8,0,-1,1,6,8,P);H(0,-1,-1,8,1,8,P);H(-2,0,2,1,6,5,hr);H(9,0,2,1,6,5,hr);H(0,-2,2,8,1,5,hr);H(-2,-1,2,1,1,5,hr);H(9,-1,2,1,1,5,hr);bangs()}
 else if(h===18){top();for(let z=-6;z<7;z++){const col=z<-2?P:hr;H(-1,0,z,1,6,1,col);H(8,0,z,1,6,1,col);H(0,-1,z,8,1,1,col)}bangs()}
 else if(h===19){top();H(4,0,7,4,6,1,P);H(-1,0,2,1,6,5,hr);H(8,0,2,1,6,5,P);H(0,-1,2,4,1,5,hr);H(4,-1,2,4,1,5,P);H(0,5,5,4,1,2,hr);H(4,5,5,4,1,2,P);H(0,5,4,1,1,1,hr);H(7,5,4,1,1,1,P)}
 else if(h===20){top();back(0,6);sides(2,4);H(0,5,5,8,1,2,P);for(let x=0;x<8;x+=2)H(x,5,4,1,1,1,P)}
 else if(h===21){top();for(let z=-6;z<7;z++){const col=mx(Math.min(1,Math.max(0,(4-z)/9)));H(-1,0,z,1,6,1,col);H(8,0,z,1,6,1,col);H(0,-1,z,8,1,1,col)}bangs()}}}
/* 2色目の保存・反映 */
{const _al3=owAccLook;owAccLook=function(o){const L=_al3.apply(this,arguments);if(o&&o.hc2)L.hc2=o.hc2;return L}}
{const _ad3=owAccD;owAccD=function(){const r=_ad3.apply(this,arguments);r.hc2=(G.ow||{}).hc2||"#ff5c8a";return r}}
{const _es3=owEdSave;owEdSave=function(){const v=OWD&&OWD.hc2;const r=_es3.apply(this,arguments);if(v&&G.ow&&G.ow.hc2!==v){G.ow.hc2=v;OW.c.hc2=v;OW._pc=null;save()}return r}}
{const _ap3=applyOwLook;applyOwLook=function(){const r=_ap3.apply(this,arguments);if(G.ow)OW.c.hc2=G.ow.hc2||"#ff5c8a";return r}}

/* ===== 服を10種追加（アロハ〜ジャージ） ===== */
OWT.push(["アロハシャツ"],["ボーダーT"],["スーツ"],["スカジャン"],["エプロン"],["白衣"],["チェックシャツ"],["法被（はっぴ）"],["ダウンジャケット"],["ジャージ"]);
Object.assign(OWC,{t11:["ガチャ"],t12:["営業14日",()=>(G.day||0)>=14],t13:["所持金300万円",()=>(G.money||0)>=3000000],t14:["ガチャ"],t15:["のべ来店500人",()=>(G.tvis||0)>=500],
 t16:["フレーバー30種",()=>(G.flu||[]).length>=30],t17:["ガチャ"],t18:["フェスに3回出店",()=>(G.festN||0)>=3],t19:["ガチャ"],t20:["ガチャ"]});
OWG.push("t11","t14","t17","t19","t20");
{const _ot=OWXD;OWXD=function(c,o){const t=c.t2|0;if(t<11)return _ot.apply(this,arguments);_ot.call(this,Object.assign({},c,{t2:0}),o);
const{Q4,sh,sit}=o,shd=dkHex(sh,.72),shl=dkHex(sh,1.3),FY=3.04,W="#f4f4f4";
const front=(x0,x1,z0,z1,fn,y)=>{for(let x=x0;x<x1-1e-6;x+=.25)for(let z=z0;z<z1-1e-6;z+=.25){const col=fn(x,z);if(col)Q4(x,y||FY,z,col)}};
const backf=(fn)=>{for(let x=1;x<3-1e-6;x+=.25)for(let z=4;z<8-1e-6;z+=.25){const col=fn(x,z);if(col)Q4(x,.74,z,col)}};
const sidef=(fn)=>{for(const xx of[.74,3.01])for(let y=1;y<3-1e-6;y+=.25)for(let z=4;z<8-1e-6;z+=.25){const col=fn(y,z,xx);if(col)Q4(xx,y,z,col)}};
const sleeve=fn=>{for(const ax of[0,3]){let k=ax;for(let x=ax;x<ax+1-1e-6;x+=.25)for(let z=6;z<8-1e-6;z+=.25){Q4(x,FY+.01,z,fn(x,z,k++))}for(let y=1;y<3-1e-6;y+=.25)for(let z=6;z<8-1e-6;z+=.25){Q4(ax===0?-.24:3.99,y,z,fn(y,z,k++))}for(let x=ax;x<ax+1-1e-6;x+=.25)for(let y=1;y<3-1e-6;y+=.25)Q4(x,y,8,fn(x,y,k++))}};
const all=fn=>{front(1,3,4,8,fn);backf(fn);sidef(fn)};
if(t===11){const F=(x,z)=>{const i=Math.floor(x*4)+Math.floor(z*4)*7;return i%11===0?"#ffd84a":i%11===5?"#ff5c8a":i%13===3?"#ffffff":i%7===2?"#2a9a5c":null};all(F);sleeve((x,z)=>F(x+3,z)||sh);front(1.5,2.5,7.5,8,()=>shd);for(const z of[7,6,5])Q4(1.94,FY+.02,z,W,.125)}
else if(t===12){const F=(x,z)=>Math.floor(z*4)%4<2?W:null;all(F);sleeve((x,z)=>Math.floor(z*4)%4<2?W:sh)}
else if(t===13){const J="#2b2f3a",JL="#3a4050";sleeve(()=>J);all((x,z)=>J);front(1,3,4,8,(x,z)=>{const v=Math.abs(x-2)<(z-5.6)*.45;return v?(Math.abs(x-2)<.13&&z<7.6?"#b03a3a":W):(Math.abs(x-2)<.13&&z<5.6?JL:null)},FY+.01);for(const z of[5.25,4.75])Q4(1.94,FY+.02,z,"#111",.125)}
else if(t===14){const S2="#c9a227";sleeve((x,z)=>z<6.5?(Math.floor(z*4)%2?"#1d1b1f":S2):S2);all((x,z)=>z<4.5?(Math.floor(x*4)%2?"#1d1b1f":S2):null);front(1.94,2.06,4.5,8,()=>"#c0c0c8",FY+.02);backf((x,z)=>{const d=Math.hypot(x-2,z-6.2);return d<.8?(d<.4?"#e8714a":S2):null})}
else if(t===15){const A="#3b3b3b";front(1.25,2.75,4,7.25,(x,z)=>(z>=5&&z<5.75&&x>=1.5&&x<2.5)?"#555":A,FY+.02);front(1.25,1.5,7.25,8,()=>A,FY+.02);front(2.5,2.75,7.25,8,()=>A,FY+.02);for(let x=1;x<3;x+=.25)Q4(x,.73,5.5,A)}
else if(t===16){sleeve(()=>W);all((x,z)=>W);front(1,3,4,8,(x,z)=>Math.abs(x-2)<(z-6)*.4?sh:null,FY+.01);front(2.4,2.8,5,5.5,()=>"#dcdcdc",FY+.02);Q4(2.5,FY+.03,5.4,"#2f6fd6",.125);if(!sit){for(let x=1;x<3;x+=.25)for(let z=2.5;z<4;z+=.25){Q4(x,FY+.02,z,W);Q4(x,.73,z,W)}for(const xx of[.73,3.02])for(let y=1;y<3;y+=.25)for(let z=2.5;z<4;z+=.25)Q4(xx,y,z,W)}}
else if(t===17){const F=(x,z)=>{const a=Math.floor(x*4)%4<2,b=Math.floor(z*4)%4<2;return a&&b?shd:(a||b)?dkHex(sh,.86):null};all(F);sleeve((x,z)=>F(x,z)||sh);front(1.5,2.5,7.5,8,()=>shd);for(const z of[7,6,5])Q4(1.94,FY+.02,z,W,.125)}
else if(t===18){sleeve((x,z)=>z<6.5?W:sh);front(1,3,4,8,(x,z)=>(Math.abs(x-2+ (8-z)*.0)<.5&&Math.abs(x-2)>=.25)?W:null,FY+.01);const bm=nameBmp("祭"),S=.06;for(let r=0;r<bm.h;r++)for(let q=0;q<bm.w;q++)if(bm.d[r*bm.w+q])Q4(2.9-q*S,.72,7.4-r*S,W,S);for(let x=1;x<3;x+=.25)Q4(x,.73,4,W)}
else if(t===19){const F=(x,z)=>((z*4)%4===0)?shd:null;all(F);sleeve((x,z)=>((z*4)%4===0)?shd:sh);for(let x=1;x<3;x+=.25)for(let z=4;z<8;z+=.25)if((z*4)%4===2)Q4(x,FY+.06,z,shl);front(1.94,2.06,4,8,()=>"#c0c0c8",FY+.08);front(1.25,2.75,7.75,8.25,()=>sh,FY+.1)}
else if(t===20){sleeve((x,z,k)=>(Math.floor(k)%4===1)?W:sh);front(1.94,2.06,4,8,()=>W,FY+.02);front(1.5,2.5,7.5,8,()=>shd);sidef((y,z)=>(y>=1.75&&y<2.25)?W:null)}
}}

/* ===== お店めぐりQR：作ってから1分だけ有効（時計のずれ30秒まで許す）。見せる画面は1分ごとに作り直す ===== */
const VQR_MS=60000,VQR_SK=30000;
{const _sn=visSnap;visSnap=function(){const d=_sn.apply(this,arguments);d.qt=Date.now();return d}}
{const _dc=visDec;visDec=async function(){const o=await _dc.apply(this,arguments);if(!o.qt)throw new Error("古いQRです。相手のゲームを最新版にして、新しいQRを見せてもらってね");const age=Date.now()-o.qt;if(age>VQR_MS+VQR_SK||age<-VQR_SK)throw new Error("このQRは期限切れです（作ってから1分まで）。相手に、今表示されているQRを見せてもらってね");return o}}
{const _vs=visShow;visShow=async function(){const r=await _vs.apply(this,arguments);try{const d=$("#visp"),q=d&&d.querySelector("#visq");if(!q||!q.querySelector("canvas"))return r;
 const ct=document.createElement("div");ct.id="visct";ct.style.cssText="text-align:center;font-weight:900;font-size:14px;margin:2px 0 8px";q.querySelector("canvas").after(ct);
 let t0=Date.now(),busy=0;const tick=async()=>{if(!d.isConnected){clearInterval(iv);return}let left=Math.ceil((VQR_MS-(Date.now()-t0))/1000);
  if(left<=0&&!busy){busy=1;let c=null;for(let lv=0;lv<3&&!c;lv++){try{c=visQR(await visEnc(lv))}catch(e){c=null}}if(c&&d.isConnected){const old=q.querySelector("canvas");if(old)old.replaceWith(c);t0=Date.now();left=60}busy=0}
  ct.innerHTML=`⏱ このQRはあと <b>${Math.max(0,left)}秒</b> 有効<br><span style="font-size:11px;font-weight:700;color:var(--mut)">自動で新しいQRに変わります</span>`};
 const iv=setInterval(tick,1000);tick();const st=d._stop;d._stop=()=>{clearInterval(iv);if(st)st()}}catch(e){}return r}}

/* ===== 髪型タブ：ツートンの時は一覧の上で「髪の色・2色目」を選べる。髪型タブの見本は上半身を大きく ===== */
function hcShown(){if(OWK!=="hs")return 0;return OWPV!=null?(OWPV>=100?OWPV-99:0):((G.ow||{}).h2|0)}
function hcRow(){const h=hcShown();if(!HC2.includes(h))return"";const o=G.ow||{},cur=o.hair||OW.c.hair,c2=o.hc2||"#ff5c8a";
 const sw=(k,lb,pal,v)=>`<div class="hcr"><div class="hcl">${lb}<i style="background:${v}"></i></div><div class="hcp">${pal.map(c=>`<span data-hcs="${k}" data-v="${c}" class="hcs ${String(c).toLowerCase()===String(v).toLowerCase()?"on":""}" style="background:${c}"></span>`).join("")}</div></div>`;
 return`<div id="hcbox">${sw("hair","髪の色",OWPAL.hair||[],cur)}${sw("hc2","髪の2色目",OWPAL.hc2,c2)}<div class="hcn">色はタップするとすぐ変わります</div></div>`}
{const _or=owRender;owRender=function(){const r=_or.apply(this,arguments);try{const L=$("#owlist");if(L){const h=hcRow();if(h)L.insertAdjacentHTML("afterbegin",h)}}catch(e){}return r}}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-hcs]");if(!b)return;e.stopPropagation();const k=b.dataset.hcs,v=b.dataset.v;if(!G.ow)return;G.ow[k]=v;try{applyOwLook();owAccSync()}catch(_){}OW._pc=null;save();const sc=($("#owlist")||{}).scrollTop;owRender();owStage();const L=$("#owlist");if(L&&sc!=null)L.scrollTop=sc},true);
{const _fv=fmsVox;fmsVox=function(kind,x){const v=_fv.apply(this,arguments);try{if(kind==="p"&&FMTAB==="owner"&&OWK==="hs"&&$("#p-own2")&&!OWD&&Array.isArray(v)){const w=v.filter(q=>q[2]>=3.5);w._gl=v._gl;for(const k in v)if(isNaN(+k)&&!(k in w))w[k]=v[k];delete w._b;return w}}catch(e){}return v}}
(function(){const st=document.createElement("style");st.textContent=`
#hcbox{background:#fff;border:2px solid #d9cff5;border-radius:14px;padding:10px 12px 8px;margin:0 0 10px}
.hcr{margin-bottom:8px}.hcl{display:flex;align-items:center;justify-content:space-between;font-weight:900;font-size:13px;color:#123a33;margin-bottom:6px}
.hcl i{width:30px;height:18px;border-radius:4px;border:1px solid rgba(0,0,0,.15)}
.hcp{display:flex;flex-wrap:wrap;gap:7px}.hcs{display:block;flex:0 0 30px;width:30px;height:30px;border-radius:50%;border:2px solid #e3e3e3;box-sizing:border-box;cursor:pointer}
.hcs.on{outline:3px solid #6658a6;outline-offset:1px}
.hcn{font-size:10.5px;color:#8a8a8a;text-align:right}`;document.head.appendChild(st)})();

/* ===== 着ぐるみを着せ替えのタブにする（髪型・服・ズボン・着ぐるみ・色・名前） ===== */
OWL.k=KGL.slice(1).map(x=>[x.n]);
OWCAT.kg=["着ぐるみ","k","kg",()=>["着ない"],"🧸"];
function kgSyncU(){if(!G||!G.kgH||!G.kgH.length)return;G.owU=G.owU||[];G.kgH.forEach(i=>{if(!G.owU.includes("k"+i))G.owU.push("k"+i)})}
{const _hk2=hud;hud=function(){const r=_hk2.apply(this,arguments);try{kgSyncU()}catch(e){}return r}}
kgRow=function(){return""};
{const _or4=owRender;owRender=function(){try{kgSyncU();if(OWK==="kg"&&!(G.kgH||[]).length){OWK="top";OWPV=null}}catch(e){}const r=_or4.apply(this,arguments);try{
 if(!(G.kgH||[]).length){const b=document.querySelector('#owcat [data-owk="kg"]');if(b)b.remove()}
 if(OWK==="kg"){const L=$("#owlist");if(L){const cur=owCur("kg");let h=`<button class="kgc kg2 ${OWPV===0||(OWPV==null&&cur===0)?"on":""}" data-owv="0"><div class="kgx">なし</div><b>着ない</b>${cur===0?`<i>着用中</i>`:""}</button>`;
  for(let i=1;i<KGL.length;i++){const v=99+i;h+=kgOwn(i)?`<button class="kgc kg2 ${OWPV===v||(OWPV==null&&cur===v)?"on":""}" data-owv="${v}"><canvas data-kgc="${i}" width="160" height="200"></canvas><b>${KGL[i].e} ${KGL[i].n}</b>${cur===v?`<i>着用中</i>`:""}</button>`:`<button class="kgc kg2 lk" data-kgl="${i}"><canvas data-kgc="${i}" data-sil="1" width="160" height="200"></canvas><b>？？？</b><i>${esc(KGL[i].q)}</i></button>`}
  L.innerHTML=`<div class="kgg">${h}</div><div style="font-size:11px;color:#8a8a8a;margin:10px 4px 2px;line-height:1.6">タップで試着、「着がえる」で着ます。着ぐるみの時は、目元（メガネなど）以外の装飾品は外れます。シルエットのものは、条件を達成するとお店に届きます。</div>`;kgPaint()}}}catch(e){}return r}}
(function(){const st=document.createElement("style");st.textContent=`#owlist button.kgc.kg2{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-start;gap:2px!important;width:auto!important;min-height:130px!important;padding:6px 2px 8px!important;border:2px solid #cfd8d4!important;border-radius:12px!important;background:#fff!important;text-align:center!important;font-size:12px!important}#owlist button.kgc.kg2.on{border-color:#6658a6!important;background:#f1eefb!important;box-shadow:0 0 0 2px #6658a6 inset!important}#owlist button.kgc.kg2.lk{background:#f4f2ec!important}#owlist .kgc.kg2 canvas{width:72px;height:90px}#owlist .kgc.kg2 i{font-style:normal;font-size:10.5px;color:#6658a6;font-weight:900}#owlist .kgc.kg2.lk i{color:#8a8a8a;font-weight:700}#owlist .kgg{gap:8px}`;document.head.appendChild(st)})();

/* 口元の色：選んだことがある時だけ使う（今までの人はヒゲ焦げ茶・マスク白のまま） */
{const _al5=owAccLook;owAccLook=function(o){const L=_al5.apply(this,arguments);try{if(L.accV&&!(o&&o.accCMv)){const m=+o.accM||0;L.accV=L.accV.map(v=>v[0]===m&&(m===4||m===6)?[v[0],""]:v)}}catch(e){}return L}}
{const _es5=owEdSave;owEdSave=function(){try{if(OWD&&G.ow&&OWD.accCM&&OWD.accCM!==G.ow.accCM)G.ow.accCMv=1}catch(e){}return _es5.apply(this,arguments)}}
/* 着せ替えの見本：右上の数値は下のカードへ。かわりに今のタブの色を見本の横で選べる */
hcRow=function(){return""};
function stgCols(){const o=G.ow||{},h=OWPV!=null&&OWK==="hs"?(OWPV>=100?OWPV-99:0):(o.h2|0);
 if(OWK==="hs")return[["hair","髪の色",OWPAL.hair]].concat(HC2.includes(h)?[["hc2","2色目",OWPAL.hc2]]:[]);if(OWK==="top")return[["shirt","服の色",OWPAL.shirt]];if(OWK==="bot")return[["pants","ズボンの色",OWPAL.pants]];return[]}
function stgPanel(){const o=G.ow||{};return stgCols().map(([k,l,P])=>{const v=String(o[k]||OW.c[k]||(k==="hc2"?"#ff5c8a":"")).toLowerCase();return`<div class="scg"><div class="scl">${l}</div><div class="scp">${P.map(c=>`<span data-scs="${k}" data-v="${c}" class="scs ${c.toLowerCase()===v?"on":""}" style="background:${c}"></span>`).join("")}</div></div>`}).join("")}
{const _os=owStage;owStage=function(){const r=_os.apply(this,arguments);try{const tr=document.querySelector("#fms .info .tr");const fm=$("#fms");if(tr&&$("#p-own2")&&!OWD){const h=stgPanel();tr.innerHTML=h;tr.classList.add("stgc");if(fm)fm.classList.toggle("hasc",!!h)}else if(fm)fm.classList.remove("hasc")}catch(e){}return r}}
function fmStats(){const h=$("#fmh");if(!h)return;let el=$("#fmst");if(!el){el=document.createElement("div");el.id="fmst";h.appendChild(el)}if(FMTAB!=="owner"){el.hidden=true;return}const o=G.ow||{},st=Math.round(typeof starOf==="function"?starOf(o):0),fm=Math.round(o.fame||0),sk=(o.skill||0);el.hidden=false;el.innerHTML=`<div>👀 知名度 <b>${fm}</b></div><div>⭐ スター性 <b>${st}</b></div><div>💨 技術 <b>${sk.toFixed(1)}</b></div>`}
{const _or6=owRender;owRender=function(){const r=_or6.apply(this,arguments);try{fmStats()}catch(e){}return r}}
{const _ft6=fmTab;fmTab=function(){const r=_ft6.apply(this,arguments);try{fmStats()}catch(e){}return r}}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-scs]");if(!b)return;e.stopPropagation();e.preventDefault();if(!G.ow)return;G.ow[b.dataset.scs]=b.dataset.v;try{applyOwLook();owAccSync()}catch(_){}OW._pc=null;save();const keep=FMS.ang;owStage();FMS.ang=keep},true);
(function(){const st=document.createElement("style");st.textContent=`
#fms .tr.stgc{width:auto!important;pointer-events:auto;z-index:3;text-align:left;top:8px!important;right:10px!important}#fms.hasc canvas{transform:translateX(-26px)}#fms.hasc .hint{display:none}
.scg{margin-bottom:6px}.scl{font-size:10.5px;font-weight:900;color:#cfe9e2;margin-bottom:4px}
.scp{display:grid;grid-template-columns:repeat(4,19px);gap:5px}
.scs{display:block;width:19px;height:19px;border-radius:50%;border:1.5px solid rgba(255,255,255,.35);box-sizing:border-box;cursor:pointer}
.scs.on{outline:2.5px solid #ffd84a;outline-offset:1px}
#fmst{position:absolute;left:138px;top:calc(env(safe-area-inset-top,0px) + 13px);font-size:10.5px;line-height:1.45;font-weight:700;color:#8fc9bc}#fmst b{color:#fff;margin-left:3px}`;document.head.appendChild(st)})();

function bgLK(hr){let h=((hr%24)+24)%24;if(h<4)h+=24;for(let i=0;i<LKF.length-1;i++){const a=LKF[i],b=LKF[i+1];if(h>=a[0]&&h<b[0]){if(a.slice(1).join()===b.slice(1).join())return"P"+i;break}}return"T"+Math.round(hr*3)}

/* ===== 出店地域を8種に。すべて路面店（1階）。今の「都内」→都心、「住宅地」→住宅街 ===== */
const AREA=[
 {n:"都心",e:"🏙",b:0,r:1.5,d:1.35,f:1.2,tx:"高層ビルのオフィス街。家賃はとても高い。平日に強く、週末は弱い",wd:[1.1,1.1,1.1,1.1,1.05,.85,.85]},
 {n:"繁華街",e:"🌃",b:0,r:1.4,d:1.3,f:1.15,tx:"ネオンの雑居ビル街。家賃は高い。金・土に強い",wd:[.95,.95,.95,1,1.2,1.2,.9]},
 {n:"駅前",e:"🚉",b:0,r:1.6,d:1.45,f:1.35,rp:.9,tx:"駅と線路の前。家賃はいちばん高い。人通りが多く、一見さんが多い"},
 {n:"商店街",e:"🏮",b:1,r:1,d:1,rp:1.15,tx:"アーケードのある商店街。家賃はふつう。常連が付きやすい"},
 {n:"住宅街",e:"🏡",b:1,r:1,d:1,tx:"一戸建てと公園の街。家賃はふつう。週末に強い",wd:[.95,.95,.95,.95,1,1.15,1.15]},
 {n:"田舎",e:"🌾",b:1,r:.6,d:.7,rp:1.25,tx:"田んぼと山の町。家賃はいちばん安い。お客さんは少ないが、常連になりやすい"},
 {n:"海沿い",e:"🏖",b:1,r:1,d:1,tx:"砂浜の見える海沿いの道。家賃はふつう。夏に強く、冬は弱い",ss:1}];
function areaZ(l){l=l||G.loc||{};if(l.z!=null&&AREA[l.z])return l.z;return l.a===1?4:0}
/* 外の景色を少しはっきり見せる */
function scnA(){return .55}
function areaFix(){if(!G.loc)return;if(G.loc.z==null){G.loc.z=areaZ(G.loc)}G.loc.t=1;G.loc.a=AREA[G.loc.z].b}
const AREAM={get r(){return AREA[areaZ()].r},get f(){return AREA[areaZ()].f||1},get rp(){return AREA[areaZ()].rp||1},
 get d(){const A=AREA[areaZ()];let d=A.d;try{if(A.wd)d*=A.wd[G.wd|0]||1;if(A.ss){const m=MN[(G.month||0)%12];if([7,8].includes(m))d*=1.3;else if(m===6||m===9)d*=1.1;else if([12,1,2].includes(m))d*=.75}}catch(e){}return d}};
LOCM[0][0]=LOCM[0][1]=LOCM[1][0]=LOCM[1][1]=AREAM;
/* 開業・移転の地域えらび */
locFx=function(z){const A=AREA[z]||AREA[0];return`${A.e} ${A.tx}（家賃×${A.r}）`};
locForm=function(){const z=areaZ();return`<div class="row">出店地域 <select id="lz">${AREA.map((A,i)=>`<option value="${i}" ${z===i?"selected":""}>${A.e} ${A.n}</option>`).join("")}</select></div><div class="m" id="locfx" style="font-size:12px;margin:-2px 0 6px">📍 ${locFx(z)}</div>`};
locRead=function(){const z=$("#lz")?+$("#lz").value:areaZ(),v=G.loc&&G.loc.v!==undefined?G.loc.v:Math.random()*NVAR|0;return{a:AREA[z].b,t:1,v,z}};
document.addEventListener("change",e=>{if(e.target.id!=="lz")return;const z=+e.target.value,fx=$("#locfx");if(fx)fx.textContent="📍 "+locFx(z);if(!G.setup||!$("#mvov")){G.loc=locRead();try{build()}catch(_){}}});
/* 景色：地域ごとに向かい側を作りかえる */
{const _gs=genScn;genScn=function(){const l=G.loc;if(l){if(l.z==null)l.z=areaZ(l);l.t=1;l.a=AREA[l.z].b}const r=_gs.apply(this,arguments);try{areaScn(areaZ(l))}catch(e){}return r}}
function areaScn(z){const xs=FLT.map(t=>t[0]),ys=FLT.map(t=>t[1]),L=Math.min(...xs)*6,Rr=(Math.max(...xs)+1)*6,T=Math.min(...ys)*6,B=(Math.max(...ys)+1)*6,Y0=T-70,Y1=B+60,MY=(T+B)/2;
 let sd=17+z*131+((G.loc&&G.loc.v)|0)*7;const rn=()=>{sd=(sd*16807)%2147483647;return sd/2147483647},pick=a=>a[Math.floor(rn()*a.length)];
 const bx=(x,y,z2,w,d,h,c,t,win,ne)=>SCN.push({x,y,z:z2,w,d,h,c,t,win,ne}),gr=(x,y,w,d,c)=>GRD.push({x,y,w,d,c});
 const clr=(sides)=>{for(let i=SCN.length-1;i>=0;i--){const b=SCN[i];if((b.t===2&&b.x<L-34)||(sides&&sides.includes(b.t)))SCN.splice(i,1)}};
 const tree=(x,y,c,t)=>{bx(x,y,0,1,1,4,"#6d4c41",t||2);bx(x-2,y-2,4,5,5,4,c||pick(["#4caf50","#43a047","#66bb6a"]),t||2);bx(x-1,y-1,8,3,3,2,"#81c784",t||2)};
 const arch=(y,c,c2,txt)=>{bx(L-27,y,0,1.2,1.2,12,c,2);bx(L-10.2,y,0,1.2,1.2,12,c,2);bx(L-27.5,y-.2,12,18.4,1.6,2.6,c2,2,0,txt?1:0);bx(L-28,y-.4,14.6,19.4,2,.8,c,2)};
 const road=(c,line)=>{for(let i=GRD.length-1;i>=0;i--){const g=GRD[i];if(g.x>=L-26.5&&g.x<L-10&&g.w<=16.5)GRD.splice(i,1)}gr(L-26,Y0,16,Y1-Y0,c);if(line)for(let y=Y0;y<Y1;y+=8)gr(L-18.5,y,1,4,line)};
 if(z===0){/* 都心：超高層・アンテナ・大型ビジョン */SCN.filter(b=>b.t===2&&b.x<L-34&&b.h>20).forEach((b,i)=>{b.h=Math.round(b.h*1.6);if(i%3===0){bx(b.x+b.w/2-.5,b.y+b.d/2,b.z+b.h,1,1,10,"#b0bec5",2);bx(b.x+b.w/2-.6,b.y+b.d/2-.1,b.z+b.h+10,1.2,1.2,1,"#ff1744",2,0,1)}});
  const t0=SCN.find(b=>b.t===2&&b.x<L-34&&b.y>T-20);if(t0){bx(t0.x+t0.w,t0.y+1,14,.6,Math.min(12,t0.d-2),8,"#263238",2);bx(t0.x+t0.w+.1,t0.y+1.6,14.6,.6,Math.min(10.8,t0.d-3.2),6.8,"#4fc3f7",2,0,1)}
  for(let y=Y0;y<Y1;y+=10)tree(L-31,y+2,"#2e7d32");for(let y=T;y<B;y+=8)gr(L-26,y,16,.3,"#ffffff");GRD.base="#7d8790"}
 else if(z===1){/* 繁華街：ネオンだらけ・アーチ看板・提灯 */SCN.filter(b=>(b.t===2&&b.x<L-34)||b.t===1).forEach(b=>{if(b.h<8)return;b.c=pick(["#3a3346","#43394f","#2f2b3a","#4a3b47"]);const N=()=>pick(["#ff4fa3","#40c4ff","#ffd54f","#69f0ae","#b388ff","#ff7043","#ff1744"]);
   if(b.t===2){for(let k=0;k<3;k++)bx(b.x+b.w,b.y+1+rn()*(b.d-4),3+k*7+rn()*3,.7,2.6,5+rn()*3,N(),2,0,1);bx(b.x+b.w,b.y+.5,2,.8,b.d-1,1.6,N(),2,0,1)}else{bx(b.x+1,b.y+b.d,3+rn()*5,2.4,.7,6,N(),1,0,1)}});
  arch(T+2,"#b71c1c","#ff1744",1);arch(B-6,"#b71c1c","#ffd54f",1);for(let y=Y0;y<Y1;y+=7){bx(L-9.4,y,6,.2,.2,1,"#5d4037",2);bx(L-9.8,y-.3,4.8,1,1,1.4,y%14?"#ff5252":"#ffca28",2,0,1);bx(L-27.6,y,6,.2,.2,1,"#5d4037",2);bx(L-28,y-.3,4.8,1,1,1.4,y%14?"#ffca28":"#ff5252",2,0,1)}
  road("#2b2730","#e040fb");GRD.base="#26222c"}
 else if(z===2){/* 駅前：店の裏に高架の線路（電車が走る）、道の向かいに駅前広場と駅舎 */clr();
  for(let i=SCN.length-1;i>=0;i--){const b=SCN[i];if(b.y+b.d>T-40&&b.y<T-1&&b.t!==2)SCN.splice(i,1)}
  const VY=T-17,VX0=L-160,VX1=Rr+160;for(let x=VX0;x<VX1;x+=14){bx(x,VY+1,0,1.6,6,13,"#b0aaa2",0)}
  for(let x=VX0;x<VX1;x+=14){bx(x,VY,13,14,8,1.4,"#c9c3bb",0);for(const ry of[VY+1.6,VY+3.2,VY+4.8,VY+6.4])bx(x,ry,14.4,14,.3,.25,"#9e9e9e",0);bx(x,VY-.3,14.4,14,.3,1.4,"#d7d2cb",0);bx(x,VY+8,14.4,14,.3,1.4,"#d7d2cb",0)}
  for(let x=VX0;x<VX1;x+=28){bx(x,VY+.2,15.8,.3,.3,5,"#78909c",0);bx(x,VY+.2,20.6,.3,7.6,.3,"#78909c",0)}
  gr(L-58,Y0,23,Y1-Y0,"#d6d2cc");for(let y=Y0;y<Y1;y+=4)gr(L-58,y,23,.3,"#c4bfb8");gr(L-54,MY-14,13,28,"#9e9e9e");gr(L-51,MY-11,7,22,"#81c784");
  bx(L-84,T-12,0,24,36,13,"#efebe9",2,"#9fc3d9");bx(L-85,T-13,13,26,38,1.5,"#37474f",2);bx(L-76,T+2,14.5,4,4,9,"#efebe9",2);bx(L-72.2,T+3,18,.4,2,2,"#ffffff",2);bx(L-72.1,T+3.6,18.4,.4,.8,.8,"#212121",2);bx(L-60.4,T-2,8,.4,16,2.6,"#1565c0",2,0,1);
  for(let y=B;y<B+40;y+=10){bx(L-38,y,0,.5,.5,4.5,"#757575",2);bx(L-38.8,y-.4,4.5,2,1.6,1.4,"#f9a825",2)}GRD.base="#8a8178"}
 else if(z===3){/* 商店街：アーケードの屋根・入口アーチ・のぼり */clr();const C=["#f5e6c8","#e8d5b5","#f0d9c0","#e3e8ec","#fbe9e7","#e8f5e9"],A2=[["#c62828","#ffffff"],["#1565c0","#ffffff"],["#2e7d32","#fff59d"],["#ef6c00","#ffffff"],["#6a1b9a","#f3e5f5"]];
  let y=Y0;while(y<Y1){const d=8+Math.floor(rn()*4),h=7+Math.floor(rn()*4);bx(L-50,y,0,14,d-.4,h,pick(C),2,"#9fc3d9");const a=pick(A2);for(let i=0;i<d-1;i+=1.5)bx(L-36.6,y+.3+i,3.6,1.6,Math.min(1.5,d-1.3-i),.5,(i/1.5)%2?a[1]:a[0],2);bx(L-36.3,y+.8,h-2.4,.3,d-2,1.4,pick(["#3e2723","#1a237e","#b71c1c","#004d40"]),2);
   if(rn()<.6)bx(L-35.6,y+d/2,0,1.4,1.4,1.4,pick(["#ff8f00","#8bc34a","#e53935","#fdd835"]),2);y+=d}
  for(let yy=Y0;yy<Y1;yy+=6){bx(L-29,yy,0,.5,.5,13,"#b0bec5",2);bx(L-8.6,yy,0,.5,.5,13,"#b0bec5",2);bx(L-29,yy,13,21,.5,.5,"#b0bec5",2)}for(let yy=Y0;yy<Y1;yy+=3)bx(L-29.5,yy,13.5,22,.6,.3,"#cfd8dc",2);
  arch(T-4,"#8d6e63","#fff3e0",0);bx(L-25,T-4.2,12.4,14,.3,1.8,"#c62828",2);for(let yy=Y0;yy<Y1;yy+=9){bx(L-9.6,yy,0,.2,.2,5,"#9e9e9e",2);bx(L-9.6,yy+.2,2.5,.2,1.2,2.5,pick(["#e53935","#1e88e5","#fdd835","#43a047"]),2)}
  road("#b39a84",0);for(let y=Y0;y<Y1;y+=3)gr(L-26,y,16,.25,"#a18872");GRD.base="#9a8f84"}
 else if(z===4){/* 住宅街：一戸建て・マンション・小さな公園 */SCN.filter(b=>b.h>=1.4&&b.h<=1.6&&b.c&&b.t).forEach(b=>{b.c=pick(["#d84315","#1565c0","#2e7d32","#6d4c41","#455a64","#ad1457"])});clr();
  const HC=["#fff8e1","#f3e5f5","#e3f2fd","#fbe9e7","#f1f8e9","#fafafa","#ffe0b2"],RC=["#d84315","#1565c0","#2e7d32","#6d4c41","#455a64","#ad1457","#8d6e63"];
  const hs=(x,y,w,d)=>{const c=pick(HC),r=pick(RC),h=7+Math.floor(rn()*3);bx(x,y,0,w,d,h,c,2,"#9fc3d9");bx(x-.6,y-.6,h,w+1.2,d+1.2,1.3,r,2);bx(x+1,y+1,h+1.3,w-2,d-2,1.3,r,2);bx(x+2.5,y+2.5,h+2.6,Math.max(1,w-5),Math.max(1,d-5),1.2,r,2);bx(x+w,y+d/2-1,0,.3,2,4,"#6d4c41",2);gr(x+w,y-1,3.5,d+2,"#9ccc65");bx(x+w+3,y-1,0,.6,d+2,1.4,pick(["#eeeeee","#bcaaa4","#8d6e63"]),2)};
  const mn=(x,y,w,d,fl)=>{const c=pick(["#eceff1","#d7ccc8","#cfd8dc","#f5f5f5","#e0d7c6"]),h=fl*3.2;bx(x,y,0,w,d,h,c,2,"lit2");for(let k=1;k<fl;k++)bx(x+w,y+.5,k*3.2-.3,.8,d-1,.25,"#90a4ae",2);bx(x-.3,y-.3,h,w+.6,d+.6,.6,"#78909c",2);bx(x+w-.2,y+d/2-1.5,0,.6,3,3,"#455a64",2)};
  let y=Y0;let k=0;while(y<Y1){if(k%4===1){mn(L-58,y,18,14,6+Math.floor(rn()*4));y+=16}else if(k%4===3&&Math.abs(y-MY)<30){gr(L-58,y,20,14,"#8bc34a");bx(L-54,y+3,0,.4,.4,6,"#e53935",2);bx(L-48,y+3,0,.4,.4,6,"#e53935",2);bx(L-54,y+3,6,6.4,.4,.4,"#e53935",2);bx(L-44,y+8,0,4,1,3,"#fdd835",2);tree(L-56,y+11);y+=16}else{hs(L-49,y,11,10);hs(L-63,y,11,10);y+=13}k++}
  for(let y=Y0;y<Y1;y+=11)tree(L-37.5,y,pick(["#66bb6a","#81c784","#f48fb1"]));
  for(const[x0,y0,w,d,fl]of[[-110,Y0+10,22,18,10],[-112,MY-6,24,18,12],[-108,B+20,20,16,9]])mn(L+x0,y0,w,d,fl);GRD.base="#8fae74"}
 else if(z===5){/* 田舎：田んぼ・山・かかし・無人販売所・電柱 */clr([1,3,4]);const P0="#8bc34a",P1="#7cb342";for(let y=Y0-40;y<Y1+40;y+=14){gr(L-120,y,82,13,(y/14|0)%2?P0:P1);for(let x=L-118;x<L-40;x+=2.2)gr(x,y+.5,.4,12,"#558b2f");gr(L-120,y+13,82,1,"#8d7a5c")}
  for(let y=T-40;y<B+40;y+=14){gr(Rr+2,y,60,13,(y/14|0)%2?P1:P0);for(let x=Rr+3;x<Rr+60;x+=2.2)gr(x,y+.5,.4,12,"#558b2f")}gr(L-12,T-60,Rr-L+70,52,"#9ccc65");gr(L-12,B+4,Rr-L+70,50,"#9ccc65");
  road("#8d8d86",0);for(let i=GRD.length-1;i>=0;i--){const g=GRD[i];if(g.c==="#cbbfae"||g.c==="#e6e6e6")GRD.splice(i,1)}gr(L-9,Y0,9,Y1-Y0,"#a1a37a");gr(L-35,Y0,9,Y1-Y0,"#a1a37a");
  for(let y=Y0;y<Y1;y+=22){bx(L-31,y,0,.5,.5,12,"#8d6e63",2);bx(L-31.6,y-.4,11,1.6,1.2,.4,"#6d4c41",2)}bx(L-60,T+4,0,.4,.4,5,"#6d4c41",2);bx(L-61.2,T+3.9,4,2.8,.4,.4,"#6d4c41",2);bx(L-60.5,T+3.6,5,1.4,1,1.4,"#ffe0b2",2);bx(L-61,T+3.4,6.2,2.4,1.6,.6,"#ffb300",2);
  bx(L-40,B+2,0,4,3,3,"#a1887f",2);bx(L-40.3,B+1.8,3,4.6,3.4,.5,"#5d4037",2);bx(L-36.2,B+2.5,1,.3,2,.8,"#ff7043",2);
  bx(L-82,T-6,0,16,14,6,"#efe3cf",2);for(let k=0;k<4;k++)bx(L-83+k,T-7+k,6+k*1.2,18-2*k,16-2*k,1.2,"#5d4037",2);bx(Rr+14,T+6,0,10,10,5,"#efe3cf",4);bx(Rr+13,T+5,5,12,12,1.2,"#455a64",4);
  for(const[mx,my,ms]of[[-190,Y0+10,60],[-175,MY,72],[-195,B+40,64],[-120,Y0-60,50]]){let w=ms;for(let k=0;k<8;k++){bx(L+mx+k*4,my-w/2,k*6,w,w,6,k>5?"#1b5e20":k>2?"#2e7d32":"#388e3c",0);w-=8;if(w<4)break}}GRD.base="#7aa35a"}
 else if(z===6){/* 海沿い：砂浜・海・灯台・船・ヤシ */clr([1]);gr(L-62,Y0-40,27,Y1-Y0+80,"#ead9a8");gr(L-260,Y0-80,198,Y1-Y0+160,"#2f8fcf");for(let x=L-260;x<L-62;x+=7)gr(x,Y0-80,1.4,Y1-Y0+160,"#56aee0");gr(L-64,Y0-40,2.5,Y1-Y0+80,"#f5f5f5");gr(L-12,T-60,Rr-L+70,48,"#ead9a8");
  for(let y=Y0+6;y<Y1;y+=14){const x=L-46+rn()*8;bx(x,y,0,1,1,10,"#8d6e63",2);for(const[dx,dy]of[[-3,0],[1,0],[0,-3],[0,1]])bx(x+dx,y+dy,9.5,3,3,.8,"#43a047",2);bx(x-1,y-1,10,3,3,.8,"#66bb6a",2)}
  for(let y=T+18;y<B+30;y+=10){bx(L-55,y,0,.3,.3,4,"#bdbdbd",2);bx(L-57,y-2,4,4,4,.4,pick(["#ff7043","#26c6da","#ffee58","#ec407a"]),2)}
  bx(L-110,T-30,0,6,6,4,"#9e9e9e",2);for(let k=0;k<6;k++)bx(L-109,T-29,4+k*4,4,4,4,k%2?"#e53935":"#ffffff",2);bx(L-109.3,T-29.3,28,4.6,4.6,2.5,"#fff59d",2,0,1);bx(L-109.6,T-29.6,30.5,5.2,5.2,1,"#37474f",2);
  for(const[bx0,by0,c]of[[-130,MY-20,"#ffffff"],[-150,B+20,"#ef5350"]]){bx(L+bx0,by0,0,4,10,1.5,c,2);bx(L+bx0+1,by0+3,1.5,2,4,2,"#eceff1",2)}bx(L-58,T-14,0,4,4,6,"#ffffff",2);bx(L-58.5,T-14.5,6,5,5,1,"#e53935",2);GRD.base="#2f8fcf"}}
/* ネオンは夜に光る */
{const _d0=drawScn0;drawScn0=function(k){const r=_d0.apply(this,arguments);try{if(WG&&LTN&&LTN.glow>.05){const N=SCN.filter(b=>b.ne&&wallVis(b.t,k));if(N.length){const oc=cx,w=WG;cx=w;WG=null;try{N.forEach(b=>dvb(b,k))}finally{WG=w;cx=oc}}}}catch(e){}return r}}
/* 移転（ベータ版は無料） */
function mvPanel(){if(!G.setup||G.over)return;if(R.phase!=="prep"){toast("移転は営業前だけできます");return}const z0=areaZ();
 const d=document.createElement("div");d.id="mvov";d.className="xpan";d.innerHTML=`<div class="xin"><div class="xh">🚚 お店を移転する</div><div class="xs">いまの場所：<b>${AREA[z0].e} ${AREA[z0].n}</b></div>
 <div style="background:#fff3d6;border:2px solid #f0b23a;border-radius:10px;padding:8px 10px;margin:8px 0;font-weight:900;color:#b5520e;font-size:13px">🎉 ベータ版のため、今回は移転費用が無料！</div>
 <div id="mvl">${AREA.map((A,i)=>`<button data-mz="${i}" class="mvb ${i===z0?"cur":""}" ${i===z0?"disabled":""}><b>${A.e} ${A.n}</b>${i===z0?" <small>（いまの場所）</small>":""}<small style="display:block">${A.tx}（家賃×${A.r}）</small></button>`).join("")}</div>
 <div class="xs" style="margin-top:6px">移転しても、内装・お客さん・お金はそのままです。家賃とお客さんの来かたが変わります。</div><div class="xb"><button data-mz="x" style="flex:1">やめる</button></div></div>`;document.body.appendChild(d);
 d.onclick=e=>{const b=e.target.closest("[data-mz]");if(!b)return;if(b.dataset.mz==="x"){d.remove();return}const z=+b.dataset.mz,A=AREA[z];
  if(!b.classList.contains("arm")){d.querySelectorAll(".mvb.arm").forEach(x=>{x.classList.remove("arm");const q=x.querySelector(".cf");if(q)q.remove()});b.classList.add("arm");b.insertAdjacentHTML("beforeend",`<small class="cf">もう一度タップで「${A.n}」に移転します</small>`);return}
  G.loc=Object.assign({},G.loc||{},{z,a:A.b,t:1,v:Math.random()*NVAR|0});G.mvN=(G.mvN||0)+1;try{genScn();build();BGK=""}catch(_){}save();d.remove();try{log("🚚 お店を「"+A.n+"」に移転しました（ベータ版のため無料）");toast(A.e+" "+A.n+"に移転しました！")}catch(_){}try{hud()}catch(_){}}}
function mvCard(){const pe=$("#p-etc");if(!pe)return;let c=$("#mvcard");if(!c){c=document.createElement("div");c.id="mvcard";c.className="fmcard";pe.prepend(c)}const z=areaZ();c.innerHTML=`<div style="display:flex;align-items:center;gap:8px"><div style="flex:1"><b>📍 お店の場所</b><div class="m" style="font-size:12.5px;margin-top:2px">${AREA[z].e} ${AREA[z].n}（路面店）</div></div><button id="mvgo" style="flex:none">🚚 移転する</button></div>`}
{const _ft7=fmTab;fmTab=function(k){const r=_ft7.apply(this,arguments);try{if(k==="etc")mvCard()}catch(e){}return r}}
document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest("#mvgo")){e.stopPropagation();mvPanel()}},true);
(function(){const st=document.createElement("style");st.textContent=`#mvl{display:flex;flex-direction:column;gap:6px;max-height:52vh;overflow:auto}.mvb{text-align:left!important;padding:8px 10px!important}.mvb small{color:var(--mut);font-weight:700}.mvb.cur{opacity:.6}.mvb.arm{outline:3px solid #6658a6}.mvb .cf{color:#6658a6!important;margin-top:4px;font-weight:900}`;document.head.appendChild(st)})();
try{areaFix()}catch(e){}

/* ===== 街の動き：店の前を人や車が通る（同時に車3・人4まで。軽量モードでは出さない）＋「街で見たもの」 ===== */
const MB_SK=["#ffe0c4","#f1c7a0","#e0aa7e","#c58a5c","#9b6440"],MB_HR=["#161616","#3b2a1e","#6b4a2b","#a8743c","#e0c068","#c9c9c9"],MB_CL=["#2b2b3a","#ffffff","#c0392b","#e67e22","#f1c40f","#27ae60","#2980b9","#8e44ad","#e86aa6","#7f8c8d","#455a64","#6d4c41"];
const mbP=(o,a)=>o[(a*7919|0)%o.length];
/* 部品：[横x(中心0),前後y(後ろ0),高さz,幅,長さ,高さ,色,光る] */
function mbCar(l,w,h,c,o){o=o||{};const P=[],wh="#212121",gl=o.gl||"#9ecbe0",lw=o.low?.75:1;
 P.push([-w/2,1,1,w,l-2,(h*.45)*lw,c]);if(!o.open)P.push([-w/2+.4,o.cf||l*.28,1+h*.45*lw,w-.8,o.cl||l*.45,h*.4*lw,gl]);else P.push([-w/2+.6,l*.35,1+h*.45*lw,w-1.2,1.4,1.4,"#5d4037"]);
 if(!o.open&&!o.nr)P.push([-w/2+.3,(o.cf||l*.28)+.2,1+h*.85*lw,w-.6,(o.cl||l*.45)-.4,.6,o.rc||c]);
 for(const yy of[2.2,l-4.2])for(const xx of[-w/2-.2,w/2-.8])P.push([xx,yy,0,1,2,1.6,wh]);P.push([-w/2+.6,l-1.2,1.6,1.2,.4,.8,"#fff59d",1],[w/2-1.8,l-1.2,1.6,1.2,.4,.8,"#fff59d",1],[-w/2+.6,.8,1.6,1.2,.4,.8,"#ff5252",1],[w/2-1.8,.8,1.6,1.2,.4,.8,"#ff5252",1]);return P}
function mbBox(l,w,h,c,cab,cc){const P=[],wh="#212121";P.push([-w/2,.8,1,w,l-cab-.8,h,c],[-w/2,l-cab,1,w,cab-.6,h*.75,cc||"#eceff1"],[-w/2+.3,l-1.4,1+h*.4,w-.6,.6,h*.3,"#9ecbe0"]);for(const yy of[2,l-cab+.6,l-3])for(const xx of[-w/2-.2,w/2-.8])P.push([xx,yy,0,1,2,1.6,wh]);P.push([-w/2+.5,l-.9,1.4,1.2,.4,.8,"#fff59d",1],[w/2-1.7,l-.9,1.4,1.2,.4,.8,"#fff59d",1]);return P}
function mbPer(o){const sk=o.sk,P=[],t=o.t||0,sw=Math.sin(t*9)*.7*(o.walk===0?0:1),cl=o.cl,pa=o.pa,hr=o.hr,dz=o.dz||0;
 if(!o.sit){P.push([-1.1,4.5+sw*.5,dz,1,1,4,pa],[.1,4.5-sw*.5,dz,1,1,4,pa])}else P.push([-1.1,5.2,dz+2.6,1,2.4,1,pa],[.1,5.2,dz+2.6,1,2.4,1,pa]);
 P.push([-1.5,4,dz+4,3,2,4,cl],[-2.4,4.5-(o.sit?-1:sw*.4),dz+5,.9,1,3,cl],[1.5,4.5+(o.sit?1:sw*.4),dz+5,.9,1,3,cl],[-1.2,3.8,dz+8.1,2.4,2.4,2.4,sk],[-1.3,3.7,dz+10.2,2.6,2.6,.8,o.hel||hr]);if(!o.hel)P.push([-1.3,3.7,dz+8.6,2.6,.6,1.8,hr]);
 if(o.um)P.push([-.1,4.9,dz+10.6,.2,.2,2.6,"#616161"],[-3.2,1.8,dz+13,6.4,6.4,.5,o.um]);if(o.bag)P.push([1.6,4.2,dz+4.4,1.6,1.4,2,o.bag]);if(o.ph)P.push([-.4,6.4,dz+7.4,.8,.3,1.2,"#212121",1]);return P}
function mbDog(x0,y0,c,big,t){const s=big?1.5:1,b=Math.sin(t*14)*.3;return[[x0-.6*s,y0,1.2*s,1.2*s,3*s,1.2*s,c],[x0-.6*s,y0+2.6*s,1.8*s,1.2*s,1.4*s,1.2*s,c],[x0-.5*s,y0+.2+b,0,.4*s,.4*s,1.2*s,c],[x0+.2*s,y0+.2-b,0,.4*s,.4*s,1.2*s,c],[x0-.5*s,y0+2.2-b,0,.4*s,.4*s,1.2*s,c],[x0+.2*s,y0+2.2+b,0,.4*s,.4*s,1.2*s,c],[x0-.1,y0-.6,2.2*s,.3,.8,.3,c]]}
function mbBike(o,moto){const P=[],wh="#212121",fc=o.fc||"#455a64";P.push([-.2,0,0,.4,2.6,2.6,wh],[-.2,5.4,0,.4,2.6,2.6,wh],[-.25,1.6,2,.5,5,.5,fc],[-.25,6,2,.5,.5,3,fc]);if(moto)P.push([-1,1.4,1.8,2,5,2.2,o.mc||"#c62828"],[-.6,7.2,3.4,1.2,.4,.8,"#fff59d",1]);
 if(o.box)P.push([-1.4,-.2,4,2.8,2.4,2.6,o.box]);if(o.kid)P.push([-1,6.2,3.6,2,1.6,1.6,"#ffeb3b"],[-.7,6.4,5.2,1.4,1.2,1.4,o.sk]);return P.concat(mbPer(Object.assign({},o,{sit:1,walk:0,dz:moto?.4:-.6})).map(p=>[p[0],p[1]-1.6,p[2],p[3],p[4],p[5],p[6],p[7]]))}
/* 種類（k:car 車道 / ped 歩道 / bike 車道寄り）。r=レア度。a=出やすい地域、only=その地域だけ。n=夜だけ、d=昼だけ */
const MBT=[
 {id:"kei",n:"軽自動車",k:"car",r:1,l:13,sp:26,mk:a=>mbCar(13,6,7,mbP(["#f5f5f5","#ffcdd2","#fff59d","#b3e5fc","#c5e1a5","#212121"],a),{cf:3,cl:7})},
 {id:"comp",n:"コンパクトカー",k:"car",r:1,l:15,sp:28,mk:a=>mbCar(15,6.4,6.5,mbP(["#e53935","#1e88e5","#fafafa","#9e9e9e","#43a047"],a))},
 {id:"sedan",n:"セダン",k:"car",r:1,l:18,sp:30,mk:a=>mbCar(18,6.6,5.6,mbP(["#fafafa","#212121","#9e9e9e","#37474f","#5d4037"],a))},
 {id:"wagon",n:"ワゴン",k:"car",r:1,l:18,sp:28,mk:a=>mbCar(18,6.6,6.2,mbP(["#b0bec5","#795548","#1565c0","#fafafa"],a),{cl:10})},
 {id:"mini",n:"ミニバン",k:"car",r:1,l:18,sp:27,a:[4],mk:a=>mbCar(18,6.8,8,mbP(["#fafafa","#212121","#8d6e63","#90a4ae"],a),{cf:3,cl:12})},
 {id:"suv",n:"SUV",k:"car",r:1,l:18,sp:28,mk:a=>mbCar(18,7,8,mbP(["#37474f","#fafafa","#6d4c41","#2e7d32"],a),{cl:10})},
 {id:"ktr",n:"軽トラ",k:"car",r:1,l:13,sp:24,a:[5,5,5,3],mk:()=>{const P=mbBox(13,6,4.5,"#fafafa",5,"#fafafa");P[0][5]=1.2;P.push([-3,1,2.2,.3,7,1.2,"#bdbdbd"],[2.7,1,2.2,.3,7,1.2,"#bdbdbd"]);return P}},
 {id:"taxi",n:"タクシー",k:"car",r:1,l:18,sp:30,a:[0,0,1,2,2],mk:a=>{const P=mbCar(18,6.6,5.6,mbP(["#fdd835","#1b5e20","#212121","#ef6c00"],a));P.push([-.8,8,7.6,1.6,2,1,"#fff59d",1]);return P}},
 {id:"takuhai",n:"宅配のバン",k:"car",r:1,l:17,sp:25,d:1,mk:()=>{const P=mbBox(17,6.8,8,"#fafafa",5,"#fafafa");P.push([3.45,2,3,.1,9,2,"#2e7d32"]);return P}},
 {id:"eigyo",n:"白い営業車",k:"car",r:1,l:17,sp:28,d:1,mk:()=>mbCar(17,6.4,6.6,"#f5f5f5",{cl:10})},
 {id:"bus",n:"路線バス",k:"car",r:2,l:34,sp:20,a:[2,2,0,4],mk:()=>{const P=[[-4,1,1.4,8,32,10,"#fafafa"],[-4.1,3,5.4,8.2,28,3,"#4fc3f7"],[-4.1,1,2,8.2,32,1.2,"#2e7d32"],[-1.6,32.6,9,3.2,.4,1.4,"#ff9800",1]];for(const yy of[4,26])for(const xx of[-4.2,3.2])P.push([xx,yy,0,1,2.4,2,"#212121"]);return P}},
 {id:"truck",n:"トラック",k:"car",r:2,l:26,sp:22,mk:a=>mbBox(26,7.6,10,mbP(["#eceff1","#90a4ae","#1565c0"],a),6,mbP(["#1565c0","#fafafa","#c62828"],a))},
 {id:"gomi",n:"ゴミ収集車",k:"car",r:2,l:20,sp:18,d:1,a:[4,3],mk:()=>{const P=mbBox(20,7,8,"#1e88e5",5.5,"#fafafa");P.push([-3.6,.2,1,7.2,1.6,7,"#90a4ae"]);return P}},
 {id:"hikkoshi",n:"引っ越しトラック",k:"car",r:2,l:26,sp:22,d:1,mk:()=>{const P=mbBox(26,7.6,11,"#fafafa",6,"#e65100");P.push([3.85,3,5,.1,12,3,"#e65100"]);return P}},
 {id:"kitchen",n:"キッチンカー",k:"car",r:2,l:19,sp:20,mk:()=>{const P=mbBox(19,7,9,"#ffca28",5,"#ffca28");P.push([3.5,2,7,2.4,10,.4,"#e53935"],[3.55,3,4,.1,8,2.6,"#5d4037"]);return P}},
 {id:"kyoshu",n:"教習車",k:"car",r:2,l:18,sp:16,mk:()=>{const P=mbCar(18,6.6,5.6,"#fafafa");P.push([-1.5,8.5,7.6,3,1,1.6,"#ffeb3b"]);return P}},
 {id:"retro",n:"丸目のレトロカー",k:"car",r:2,l:15,sp:22,mk:a=>mbCar(15,6,6.2,mbP(["#80cbc4","#ffccbc","#c5e1a5","#fff9c4"],a),{rc:"#fafafa"})},
 {id:"open",n:"オープンカー",k:"car",r:2,l:17,sp:32,a:[6,6,6,0],mk:a=>mbCar(17,6.6,5,mbP(["#c62828","#fafafa","#1565c0","#fdd835"],a),{open:1})},
 {id:"police",n:"パトカー",k:"car",r:3,l:18,sp:30,mk:()=>{const P=mbCar(18,6.6,5.6,"#fafafa",{rc:"#212121"});P[0][6]="#212121";P.push([-3.35,4,1.6,.1,10,1.4,"#fafafa"],[-2,8,7.7,2,1.2,.8,"#ff1744",1],[0,8,7.7,2,1.2,.8,"#2979ff",1]);return P}},
 {id:"kyukyu",n:"救急車",k:"car",r:3,l:20,sp:30,mk:()=>{const P=mbBox(20,7,9,"#fafafa",5,"#fafafa");P.push([3.55,1,4,.1,14,1,"#e53935"],[-1.5,16,10,3,1.2,.8,"#ff1744",1]);return P}},
 {id:"fire",n:"消防車",k:"car",r:3,l:30,sp:26,mk:()=>{const P=mbBox(30,7.6,8,"#d50000",7,"#d50000");P.push([-1,4,9,2,20,.6,"#cfd8dc"],[-1,4,9.6,.3,20,.6,"#cfd8dc"],[.7,4,9.6,.3,20,.6,"#cfd8dc"],[-1.5,25,9.4,3,1.2,.8,"#ff1744",1]);return P}},
 {id:"senkyo",n:"選挙カー",k:"car",r:3,l:18,sp:12,d:1,mk:()=>{const P=mbBox(18,6.8,7,"#fafafa",5,"#fafafa");P.push([-3.4,3,8,6.8,10,3,"#1565c0"],[-3.45,3.5,8.5,.1,9,2,"#fafafa"],[-1,13.5,8.2,2,1.2,1.6,"#9e9e9e"]);return P}},
 {id:"yakiimo",n:"焼き芋屋の軽トラ",k:"car",r:3,l:13,sp:10,n2:1,mk:()=>{const P=mbBox(13,6,4.5,"#fafafa",5,"#fafafa");P[0][5]=1.2;P.push([-2.6,1.4,2.2,5.2,5,4,"#6d4c41"],[-2.8,1.2,6.2,5.6,5.4,.8,"#3e2723"],[-.5,3,7,1,1,3,"#757575"]);return P}},
 {id:"reikyu",n:"霊柩車",k:"car",r:3,l:22,sp:20,d:1,mk:()=>{const P=mbCar(22,6.8,6,"#111111",{cl:14});P.push([-3,3,7.6,6,10,2.4,"#c9a227"],[-2.6,3.4,10,5.2,9.2,.8,"#ffd54f"]);return P}},
 {id:"super",n:"真っ赤なスーパーカー",k:"car",r:4,l:18,sp:40,a:[0,1],mk:()=>mbCar(18,7.4,5,"#d50000",{low:1,cf:6,cl:6})},
 {id:"lux",n:"黒塗りの高級車",k:"car",r:4,l:21,sp:28,a:[0,0,1],mk:()=>mbCar(21,7,6,"#0d0d0d",{cl:10})},
 {id:"limo",n:"リムジン",k:"car",r:4,l:32,sp:24,a:[0,1],mk:()=>mbCar(32,7,6,"#fafafa",{cf:5,cl:22})},
 {id:"ita",n:"痛車",k:"car",r:4,l:18,sp:28,a:[1,2],mk:()=>{const P=mbCar(18,6.6,5.6,"#fce4ec");P.push([-3.35,3,1.6,.1,11,2.4,"#ec407a"],[-3.36,5,2,.1,4,1.8,"#7e57c2"],[3.25,3,1.6,.1,11,2.4,"#29b6f6"],[3.26,9,2,.1,4,1.8,"#ffee58"]);return P}},
 {id:"deko",n:"デコトラ",k:"car",r:4,l:28,sp:22,n2:1,mk:()=>{const P=mbBox(28,7.8,11,"#cfd8dc",6.5,"#e0e0e0");for(let i=0;i<6;i++)P.push([3.95,2+i*3.4,1.4,.2,1,1,["#ff1744","#ffd600","#00e5ff","#76ff03","#ff4081","#ffab00"][i],1]);P.push([-3.9,27.2,12,7.8,.4,1.2,"#ffd600",1]);return P}},
 {id:"gold",n:"金色の高級車",k:"car",r:5,l:21,sp:30,mk:()=>mbCar(21,7,6,"#ffd54f",{rc:"#ffca28"})},
 {id:"neon",n:"光る改造車",k:"car",r:5,l:18,sp:34,ni:1,mk:()=>{const P=mbCar(18,7,5,"#311b92",{low:1});P.push([-3.6,1,.2,7.2,16,.3,"#00e5ff",1]);return P}},
 {id:"tractor",n:"トラクター",k:"car",r:2,l:12,sp:10,only:[5],d:1,mk:()=>[[-3,1,2,6,8,3,"#e53935"],[-2.4,3,5,4.8,4,4,"#e53935"],[-2.2,3.4,5.4,4.4,3.2,3.2,"#9ecbe0"],[-3.8,1,0,1.2,4,4.4,"#212121"],[2.6,1,0,1.2,4,4.4,"#212121"],[-3.4,8.4,0,1,2.6,2.6,"#212121"],[2.4,8.4,0,1,2.6,2.6,"#212121"]]},
 /* 人 */
 {id:"kaisha",n:"会社員",k:"ped",r:1,sp:6,a:[0,0,2,2],mk:(a,t,u)=>mbPer({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a+1),cl:mbP(["#263238","#37474f","#212121"],a),pa:"#263238",t,um:u,bag:"#3e2723"})},
 {id:"gakusei",n:"学生",k:"ped",r:1,sp:6,d:1,mk:(a,t,u)=>mbPer({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:mbP(["#1a237e","#fafafa","#263238"],a),pa:mbP(["#1a237e","#424242"],a),t,um:u,bag:"#212121"})},
 {id:"couple",n:"カップル",k:"ped",r:1,sp:5,pair:1,mk:(a,t,u)=>mbPer({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:mbP(MB_CL,a),pa:mbP(["#3b3b4a","#c8b38a","#5b4a33"],a),t,um:u})},
 {id:"kaimono",n:"買い物帰りの人",k:"ped",r:1,sp:5,a:[3,3,4],mk:(a,t,u)=>mbPer({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:mbP(MB_CL,a),pa:mbP(["#3b3b4a","#5b4a33","#7f8c8d"],a),t,um:u,bag:"#fafafa"})},
 {id:"jog",n:"ジョギングする人",k:"ped",r:1,sp:11,a:[4,6],mk:(a,t)=>mbPer({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:mbP(["#ff7043","#26c6da","#d4e157"],a),pa:"#212121",t:t*1.6})},
 {id:"sumaho",n:"スマホを見ながら歩く人",k:"ped",r:1,sp:4,mk:(a,t,u)=>mbPer({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:mbP(MB_CL,a),pa:"#3b3b4a",t:t*.7,ph:1,um:u})},
 {id:"inu_s",n:"小型犬の散歩",k:"ped",r:1,sp:5,dog:"#f5f5f5",a:[4,4,3],mk:(a,t,u)=>mbPer({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:mbP(MB_CL,a+2),pa:"#5b4a33",t,um:u})},
 {id:"inu_b",n:"大型犬の散歩",k:"ped",r:2,sp:6,dog:"#c49a5a",big:1,a:[4,5],mk:(a,t,u)=>mbPer({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:mbP(MB_CL,a+3),pa:"#3b3b4a",t,um:u})},
 {id:"shiba",n:"柴犬の散歩",k:"ped",r:2,sp:5,dog:"#d9822b",a:[4,5],mk:(a,t,u)=>mbPer({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:mbP(MB_CL,a+4),pa:"#7f8c8d",t,um:u})},
 {id:"hippare",n:"犬に引っぱられる人",k:"ped",r:3,sp:12,dog:"#8d6e63",big:1,mk:(a,t)=>mbPer({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:mbP(MB_CL,a),pa:"#3b3b4a",t:t*1.8})},
 {id:"mamachari",n:"ママチャリ",k:"bike",r:1,sp:12,a:[4,4,3],noRain:1,mk:(a,t)=>mbBike({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:mbP(MB_CL,a),pa:"#3b3b4a",fc:"#90a4ae"})},
 {id:"road",n:"ロードバイク",k:"bike",r:2,sp:20,noRain:1,mk:(a)=>mbBike({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:mbP(["#ffeb3b","#00e5ff","#ff4081"],a),pa:"#212121",fc:"#212121",hel:"#fafafa"})},
 {id:"kodomo",n:"子ども乗せ自転車",k:"bike",r:2,sp:10,a:[4,4],noRain:1,d:1,mk:(a)=>mbBike({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:mbP(MB_CL,a),pa:"#5b4a33",fc:"#9e9e9e",kid:1})},
 {id:"demae",n:"出前の自転車",k:"bike",r:2,sp:15,mk:(a)=>mbBike({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:"#212121",pa:"#212121",fc:"#212121",box:mbP(["#43a047","#212121","#ff7043"],a),hel:"#212121"})},
 {id:"scooter",n:"スクーター",k:"bike",r:1,sp:22,mk:(a)=>mbBike({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:mbP(MB_CL,a),pa:"#3b3b4a",mc:mbP(["#fafafa","#ec407a","#4fc3f7","#9ccc65"],a),hel:mbP(["#fafafa","#212121","#e53935"],a)},1)},
 {id:"demaebike",n:"出前のバイク",k:"bike",r:2,sp:24,mk:(a)=>mbBike({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:"#e53935",pa:"#212121",mc:"#fafafa",box:"#e53935",hel:"#fafafa"},1)},
 {id:"oogata",n:"大型バイク",k:"bike",r:3,sp:34,mk:(a)=>mbBike({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:"#212121",pa:"#212121",mc:mbP(["#212121","#b71c1c","#1565c0"],a),hel:"#212121"},1)},
 {id:"shirobai",n:"白バイ",k:"bike",r:3,sp:30,mk:()=>{const P=mbBike({sk:"#f1c7a0",hr:"#161616",cl:"#1565c0",pa:"#1565c0",mc:"#fafafa",hel:"#fafafa"},1);P.push([-.6,1.2,6.4,.6,.6,.6,"#ff1744",1],[0,1.2,6.4,.6,.6,.6,"#2979ff",1]);return P}},
 {id:"yopparai",n:"酔っぱらい",k:"ped",r:2,sp:3,ni:1,wob:1,a:[1,1,1,2],mk:(a,t)=>{const P=mbPer({sk:"#f8a5a5",hr:mbP(MB_HR,a),cl:"#37474f",pa:"#263238",t:t*.6});P.push([-1.6,3.6,11,3.2,.4,.6,"#d32f2f"]);return P}},
 {id:"host",n:"ホスト風の人",k:"ped",r:2,sp:5,ni:1,only:[1],mk:(a,t)=>mbPer({sk:"#ffe0c4",hr:mbP(["#e0c068","#c9c9c9","#ffffff"],a),cl:"#111111",pa:"#111111",t})},
 {id:"kyakuhiki",n:"客引き",k:"ped",r:2,sp:2,ni:1,only:[1],mk:(a,t)=>{const P=mbPer({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:"#4a148c",pa:"#212121",t:t*.4});P.push([1.6,5.2,7.4,.3,.3,3.4,"#9e9e9e"],[1.2,5.1,10.6,2.6,.3,2,"#ffeb3b"]);return P}},
 {id:"surfer",n:"サーファー",k:"ped",r:2,sp:5,only:[6],d:1,mk:(a,t)=>{const P=mbPer({sk:"#c58a5c",hr:"#e0c068",cl:"#212121",pa:"#26c6da",t});P.push([2,1.2,3,.6,1.6,10,"#ffeb3b"]);return P}},
 {id:"kanko",n:"観光客",k:"ped",r:2,sp:4,a:[2,3,6],d:1,mk:(a,t,u)=>{const P=mbPer({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:mbP(["#ffeb3b","#4fc3f7","#ff8a65"],a),pa:"#c8b38a",t,um:u});P.push([-1.5,3.5,10.2,3,3,.6,"#fff3e0"],[-.5,6.2,7,1,.6,.8,"#212121"]);return P}},
 {id:"neko",n:"野良猫",k:"ped",r:2,sp:4,a:[5,5,3],cat:1,mk:(a,t)=>{const c=mbP(["#f5f5f5","#424242","#ff9800","#8d6e63"],a);return mbDog(0,3,c,0,t).concat([[-.5,5.4,2.6,.3,.3,.6,c],[.2,5.4,2.6,.3,.3,.6,c]])}},
 {id:"kigurumi",n:"風船を持った着ぐるみ",k:"ped",r:5,sp:4,d:1,mk:(a,t)=>{const P=mbPer({sk:"#c49a5a",hr:"#c49a5a",cl:"#c49a5a",pa:"#c49a5a",t});P.push([-1.6,3.6,10.6,.8,.8,.8,"#c49a5a"],[.8,3.6,10.6,.8,.8,.8,"#c49a5a"],[2,5,7,.1,.1,8,"#9e9e9e"],[1.2,4.2,15,2,2,2.4,"#ff1744",1]);return P}}];
const MBI={};MBT.forEach(t=>MBI[t.id]=t);
function mbHr(){return(((R.phase==="run"?R.t:G.open*60)/60)%24+24)%24}
function mbPick(k){const z=typeof areaZ==="function"?areaZ():0,h=mbHr(),night=h>=19||h<5,late=h>=2&&h<6,rain=G.wx&&/rain|typhoon/.test(G.wx[G.wd]||"");
 const W=MBT.filter(t=>(t.k===k||(k==="ped"&&t.k==="bike"))&&!t.sp0).map(t=>{if(t.mo&&!t.mo.includes(MN[(G.month||0)%12]))return[t,0];if(t.only&&!t.only.includes(z))return[t,0];if(t.ni&&!night)return[t,0];if((t.d||t.n2&&0)&&night&&h>=21)return[t,0];if(t.late&&!late&&!(h>=3&&h<7))return[t,0];
  let w=[0,30,9,3,.8,.15][t.r];if(t.a)w*=1+t.a.filter(x=>x===z).length*1.2;if(rain&&(t.noRain||t.id==="jog"))w*=.25;if(t.k==="bike"&&k==="ped")w*=.5;if(z===5&&t.k==="car"&&t.id!=="ktr"&&t.id!=="tractor")w*=.5;if(z===3&&t.k==="car")w*=.4;return[t,w]});
 let s=W.reduce((a,b)=>a+b[1],0),r=Math.random()*s;for(const[t,w]of W){r-=w;if(r<=0)return t}return null}
const MB={L:[],last:0,nc:0,np:0};
/* 道ぞいの隣の建物が歩道や車道にはみ出さないように、店の正面の線でそろえる */
{const _gs2=genScn;genScn=function(){const r=_gs2.apply(this,arguments);try{const L=mbGeo().L;for(let i=SCN.length-1;i>=0;i--){const b=SCN[i];if((b.t===1||b.t===3||b.t===4)&&b.x<L-.5){if(b.x+b.w<=L-.5)SCN.splice(i,1);else{b.w-=(L-.5-b.x);b.x=L-.5}}}
 /* 店の前の歩道を広げる：道路から向こうを6マス分ずらす */const SH=6;SCN.forEach(b=>{if(b.x+b.w<=L-8.6)b.x-=SH});GRD.forEach(g=>{if(g.x+g.w<=L-8.6||g.x<L-9.5)g.x-=SH;else if(Math.abs(g.x-(L-9))<.01&&g.w>=8.9){g.x-=SH;g.w+=SH}})}catch(e){}MB.L=[];return r}}
function mbGeo(){const xs=FLT.map(t=>t[0]),ys=FLT.map(t=>t[1]),L=Math.min(...xs)*6,T=Math.min(...ys)*6,B=(Math.max(...ys)+1)*6;return{L,Y0:T-70,Y1:B+60}}
function mbSpawn(){const g=mbGeo(),z=typeof areaZ==="function"?areaZ():0,h=mbHr(),busy=[1.2,1.3,1.6,1,.8,.45,.7][z]||1,tm=h>=1&&h<6?.35:h>=17&&h<21?1.25:1;
 const nc=MB.L.filter(m=>m.T.k==="car"||m.T.k==="bike").length,np=MB.L.filter(m=>m.T.k==="ped").length;
 if(nc<(R.lite?2:3)&&Math.random()<.5*busy*tm){const t=mbPick("car");if(t){const s=Math.random()<.5?1:-1;if(!MB.L.some(m=>m.s===s&&(m.T.k==="car"||m.T.k==="bike")&&Math.abs(m.y-(s>0?g.Y0-20:g.Y1+20))<40))MB.L.push({T:t,lane:s,s,x:s>0?g.L-28:g.L-20,y:s>0?g.Y0-20:g.Y1+20,a:Math.random()*9+1,t:0,sp:t.sp*(.85+Math.random()*.3)})}}
 if(np<(R.lite?2:4)&&Math.random()<.6*busy*tm){const t=mbPick("ped");if(t){const s=Math.random()<.5?1:-1,far=Math.random()<.45,bike=t.k==="bike";const x=bike?(s>0?g.L-31:g.L-17.5):(far?g.L-37-Math.random()*2:g.L-9.5-Math.random()*3);
  const wsp=bike?t.sp*(.85+Math.random()*.3):({jog:17,hippare:18,sumaho:7,yopparai:6,kyakuhiki:3,kigurumi:7}[t.id]||(9+Math.random()*6))*(.9+Math.random()*.2);MB.L.push({T:t,s,x,y:s>0?g.Y0-10:g.Y1+10,a:Math.random()*9+1,t:0,sp:wsp,pk:!bike&&!far&&!t.cat&&Math.random()<.12,um:(!bike&&G.wx&&/rain/.test(G.wx[G.wd]||""))?mbP(["#1565c0","#e53935","#f5f5f5","#43a047","#fdd835","#8e24aa","#ff7aa8"],Math.random()*9):0});const gn=t.grp||(t.pair?2:1),sp0=MB.L[MB.L.length-1].sp;for(let i=1;i<gn;i++)MB.L.push({T:t,s,x:x+(i%2)*2.6,y:(s>0?g.Y0-10:g.Y1+10)-s*Math.floor(i/2)*4.5+(i%2),a:Math.random()*9+3+i,t:0,sp:sp0,um:0,tag:1})}}try{mbSpecial(g,z)}catch(e){}}
function mbSeen(t){G.mbS=G.mbS||{};const first=!G.mbS[t.id];G.mbS[t.id]=(G.mbS[t.id]||0)+1;if(first&&t.r>=3){try{toast((["","","","★3","★4 レア！","★5 激レア！"][t.r])+" "+t.n+" が通った！（街で見たものに記録）")}catch(e){}}}
function mbOn(){return!G.mbOff&&G.setup&&!R.vis&&R.phase==="run"}
function mbDraw(k){if(!mbOn()||!wallVis(2,k)){return}const now=performance.now(),dt=Math.min(.1,(now-(MB.last||now))/1000);MB.last=now;const sp=typeof mbSpd==="function"?mbSpd():1;try{wkGhosts()}catch(e){}
 MB.cd=(MB.cd||0)-dt*sp;if(MB.cd<=0){MB.cd=.8+Math.random()*1.6;mbSpawn()}const g=mbGeo();
 const parts=[],L=LTN||{oa:0,ov:"#000000"},tint=c=>L.oa>.05?mixc(c,L.ov,Math.min(.6,L.oa*.65)):c;
 MB.L=MB.L.filter(m=>{m.t+=dt*sp;
  if(m.gh){const p=R.people.find(q=>q.c===m.gh.c);if(p)return false;const atD=m.s>0?m.y>=15:m.y<=15;if(atD){if(R.sched.includes(m.gh.e)){m.y=15;m.x+=(-5-m.x)*Math.min(1,dt*sp*3);m.wait=(m.wait||0)+dt;m.face=1;if(m.wait<20)return true}m.gh=null;m.face=0}}
  if(m.pk&&!m.pkd&&(m.s>0?m.y>=15:m.y<=15)){m.pkt=(m.pkt||0)+dt*sp;m.face=1;if(m.pkt<1.6)return true;m.pkd=1;m.face=0}
  m.y+=m.s*m.sp*sp*dt;if(m.T.wob)m.x+=Math.sin(m.t*3+m.a)*dt*2;if(m.y<g.Y0-(m.tr?110:40)||m.y>g.Y1+(m.tr?110:40))return false;
  const mid=(g.Y0+g.Y1)/2;if(!m.seen&&(m.s>0?m.y>mid+6:m.y<mid-6)){m.seen=1;if(!m.tag)mbSeen(m.T,m)}
  let P=m.T.k==="ped"&&!m.T.cat?[]:(m._P||m.T.mk(m.a,m.t,m.um));if(m.T.k!=="ped")m._P=P;if(m.T.dog){P=P.concat(mbDog(m.s>0?1.8:-1.8,m.s>0?7.4:-3,m.T.dog,m.T.big,m.t))}if(m.T.pet){P=P.concat(m.T.pet(m.t,m.a))}if(m.T.fly){const fz=m.T.fly+Math.sin(m.t*2+m.a)*.8;P=P.map(p=>[p[0],p[1],p[2]+fz,p[3],p[4],p[5],p[6],p[7]])}
  const l=m.T.l||8;P.forEach(p=>{const x=m.x+p[0],y=m.s>0?m.y+p[1]-l/2:m.y-(p[1]+p[4])+l/2;const b={x,y,z:p[2],w:p[3],d:p[4],h:p[5],c:p[7]&&L.oa>.2?p[6]:tint(p[6])};parts.push({b,d:(x+b.w/2)*k.cx+(y+b.d/2)*k.cy+(b.z+b.h/2)*k.cz})});return true});
 if(!parts.length)return;parts.sort((p,q)=>p.d-q.d);cx.save();cx.globalAlpha=.92;try{parts.forEach(o=>dvb(o.b,k))}finally{cx.restore()}}
{const _db=drawBG;drawBG=function(k){const r=_db.apply(this,arguments);try{mbDraw(k)}catch(e){}return r}}

/* ===== 歩く人をお客さんと同じ細かさに（見た目ごとに絵にして使い回す）。たまに図鑑のお客さんも通る ===== */
const MBLK={kaisha:{shirt:["#263238","#37474f","#212121"],top:2,pants:["#263238"]},gakusei:{shirt:["#1a237e","#fafafa","#263238"],top:5,pants:["#1a237e","#424242"]},jog:{shirt:["#ff7043","#26c6da","#d4e157"],top:6,bot:1,pants:["#212121"]},
 host:{hair:["#e0c068","#c9c9c9","#ffffff"],shirt:["#111111"],top:5,pants:["#111111"],hs:[10,15]},kyakuhiki:{shirt:["#4a148c"],top:5},surfer:{skin:["#c58a5c","#9b6440"],hair:["#e0c068"],shirt:["#26c6da"],top:4,bot:1},kanko:{shirt:["#ffeb3b","#4fc3f7","#ff8a65"],top:7,acc:2},yopparai:{shirt:["#37474f"],top:2,skin:["#f8a5a5"]},couple:{},kaimono:{},sumaho:{},inu_s:{},inu_b:{},shiba:{},hippare:{}};
function mbLook(t,a){const pool=G.cs.filter(c=>c&&!c.sp&&!(typeof spx==="function"&&spx(c))&&!c.moto&&c.i!=null);const tp=pool.length?pool[Math.floor(Math.random()*pool.length)]:OW.c,o=MBLK[t.id]||{},pk=(L,d)=>L&&L.length?L[Math.floor(Math.random()*L.length)]:d;
 const c=Object.assign({},tp,{acc:o.acc||0,accC:"#333333",accV:null,h2:0,t2:0,b2:0,kg:0,pump:0,hair:pk(o.hair,pk(MB_HR)),skin:pk(o.skin,pk(MB_SK)),shirt:pk(o.shirt,pk(MB_CL)),pants:pk(o.pants,pk(["#3b3b4a","#1e1e1e","#2c3e66","#5b4a33","#7f8c8d","#c8b38a"])),top:o.top!=null?o.top:Math.floor(Math.random()*TOPN.length),bot:o.bot!=null?o.bot:Math.floor(Math.random()*BOTN.length),hs:o.hs?pk(o.hs):Math.floor(Math.random()*HSN.length)});
 delete c.sp;delete c.moto;if(t.id==="kigurumi")c.kg=1+Math.floor(Math.random()*(KGL.length-1));return c}
function mbProps(m,ox,oy,dir){const P=[],f=dir===0?1:-1,px=(x,y,z,w,d,h,c,s)=>{s=s||.5;for(let i=0;i<w;i+=s)for(let j=0;j<d;j+=s)for(let k=0;k<h;k+=s)P.push([ox+x+i,oy+y+j,z+k,c,undefined,s])};
 if(m.um)umbVox(P,ox,oy,m.um);const id=m.T.id;
 if(id==="kyakuhiki")px(3.6,1.5,6,.5,.5,5,"#9e9e9e"),px(3.1,1.3,10.5,1.5,.5,2,"#ffeb3b");if(id==="surfer")px(-.6,1,2,.5,2,10,"#ffeb3b");if(id==="yopparai")px(.5,.8,12,3,.5,.5,"#d32f2f",.5);
 if(id==="kigurumi"){px(3.5,1.5,6,.25,.25,9,"#9e9e9e",.25);px(3,1,15,1.5,1.5,1.5,"#ff1744")}if(id==="kaimono"||id==="kaisha")px(3.6,1.4,4,.5,1.5,2,id==="kaimono"?"#fafafa":"#3e2723");return P}
{const _dy=dyn;dyn=function(){const a=_dy.apply(this,arguments);try{if(MB.v2)return a;if(!mbOn()||!R.cv||!wallVis(2,R.cv))return a;const inS=new Set((R.people||[]).map(p=>p.c));
 MB.L.forEach(m=>{if(m.T.k!=="ped"||m.T.cat)return;if(!m.c){if(!m.tag&&!m.T.ni&&Math.random()<.12&&["kaisha","gakusei","kaimono","sumaho","couple","jog"].includes(m.T.id)){const tdS=typeof todaySet==="function"?todaySet():new Set(),met=G.cs.filter(c=>c.met&&!c.sp&&!(typeof spx==="function"&&spx(c))&&!inS.has(c)&&!tdS.has(c)&&c.i!==52&&c.i!==94);if(met.length){m.c=met[Math.floor(Math.random()*met.length)];m.dex=1}}if(!m.c)m.c=mbLook(m.T,m.a)}
  const d=m.face?1:(m.s>0?0:2),ox=m.x-2,oy=m.y-1.5+(!m.face&&Math.sin(m.t*10)>0?.15:0);if(!walkSpr(a,m.c,d,ox,oy))pv(a,ox,oy,1,m.c,0,d);mbProps(m,ox,oy,d).forEach(v=>a.push(v));
  if(m.dex&&!m.dexL&&m.seen){m.dexL=1;G.mbDx=G.mbDx||{};if(G.mbDx[m.c.i]!==G.day){G.mbDx[m.c.i]=G.day;try{const t="👀 "+nm(m.c)+" が店の前を通りすぎた";log(t);if(typeof mbBand==="function")mbBand(t)}catch(e){}}}})}catch(e){}return a}}
/* 街で見たもの */
function mbList(){const S=G.mbS||{},n=MBT.filter(t=>S[t.id]).length,AN=(typeof AREA!=="undefined"?AREA:[]).map(a=>a.n);
 const grp=[[5,"★5 激レア"],[4,"★4 レア"],[3,"★3 たまに"],[2,"★2 ときどき"],[1,"★1 よく見る"]];
 const d=document.createElement("div");d.className="xpan";d.id="mbls";d.innerHTML=`<div class="xin"><div class="xh">👀 街で見たもの　${n}/${MBT.length}</div><div class="xs">お店の前を通った人や車が記録されます。地域や時間帯、天気で出てくるものが変わります。</div><div style="max-height:56vh;overflow:auto;margin-top:6px">`+
  grp.map(([r,lb])=>`<div style="font-weight:900;font-size:12.5px;margin:10px 0 4px;color:#6658a6">${lb}</div><div class="mbg">`+MBT.filter(t=>t.r===r).map(t=>{const c=S[t.id];const hint=t.only?AN[t.only[0]]+"だけ":t.ni?"夜":t.late?"明け方":"";return`<div class="mbc ${c?"":"lk"}"><b>${c?esc(t.n):"？？？"}</b><small>${c?c+"回":hint?"ヒント："+hint:""}</small></div>`}).join("")+`</div>`).join("")+`</div><div class="xb"><button data-mbx="1" style="flex:1">閉じる</button></div></div>`;
 document.body.appendChild(d);d.onclick=e=>{if(e.target.closest("[data-mbx]"))d.remove()}}
{const _mc=mvCard;mvCard=function(){_mc.apply(this,arguments);const c=$("#mvcard");if(!c)return;const S=G.mbS||{},n=MBT.filter(t=>S[t.id]).length;c.insertAdjacentHTML("beforeend",`<div style="display:flex;gap:8px;margin-top:8px"><button id="mbgo" style="flex:1">👀 街で見たもの ${n}/${MBT.length}</button><button id="mbtg" style="flex:none">${G.mbOff?"🚶 街の動き：オフ":"🚶 街の動き：オン"}</button></div>`)}}
document.addEventListener("click",e=>{if(!e.target.closest)return;if(e.target.closest("#mbgo")){e.stopPropagation();mbList()}else if(e.target.closest("#mbtg")){e.stopPropagation();G.mbOff=!G.mbOff;if(G.mbOff)MB.L=[];save();mvCard()}},true);
(function(){const st=document.createElement("style");st.textContent=`.mbg{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}.mbc{background:#fff;border:1.5px solid #e0dccf;border-radius:10px;padding:6px 8px;font-size:12.5px}.mbc small{display:block;color:var(--mut);font-size:10.5px}.mbc.lk{background:#f4f2ec;color:#9a9a9a}`;document.head.appendChild(st)})();

/* ===== お客さんは歩道を歩いて来店・帰る。外を歩く姿は通行人と同じ仕組み（同じ速さの範囲）で描く ===== */
const WK_X=-10.5,WK_D=85;
const MBG={id:"cust",k:"ped",r:0,sp:12,n:"お客さん"};
function wkV(){return 9+Math.random()*6}
function mbSpd(){return R.phase==="run"?(R.speed||0):0}
/* 来店予定の少し前から、入口に着く時刻に合わせて歩き始める */
function wkGhosts(){if(!mbOn())return;const v0=12;for(const e of R.sched){const dtm=e.at-R.t;if(dtm>WK_D/(v0/6)+2)break;if(e._g||!e.m||!e.m.length)continue;e._g=1;const side=Math.random()<.5?1:-1;
  e.m.forEach((c,i)=>{if(e.m.length===1&&typeof VEH!=="undefined"&&VEH[c.i])return;const v=wkV(),d=Math.min(WK_D,Math.max(0,dtm)*(v/6))+i*4;MB.L.push({T:MBG,gh:{e,c},c,s:side,x:WK_X-(i%2)*1.6,y:15-side*d,a:Math.random()*9,t:0,sp:v,tag:1,seen:1})})}}
/* 店を出たお客さんは、そのまま通行人として歩いて帰る */
{const _mv=move;move=function(p,dt){try{if(p.st==="out"&&!p.path.length&&p.x<-3&&!p.vis&&(!p.mob||p.c.mobC)&&p.c&&mbOn()&&!(typeof vehRider==="function"&&vehRider(p))){const side=Math.random()<.5?1:-1;MB.L.push({T:MBG,c:p.c,s:side,x:WK_X,y:p.y,a:Math.random()*9,t:0,sp:wkV(),tag:1,seen:1,ex:1});p.gone=1;return}}catch(e){}return _mv.apply(this,arguments)}}
/* ===== 通行人のお知らせ：店の前を通りすぎた後に、ボタンの上の帯で出す ===== */
const MBQ=[];let mbBusy=0;
function mbBand(t){MBQ.push(t);if(MBQ.length>4)MBQ.shift();if(!mbBusy)mbBandNext()}
function mbBandNext(){const t=MBQ.shift();if(!t){mbBusy=0;return}mbBusy=1;let b=$("#mbband");if(!b){b=document.createElement("div");b.id="mbband";document.body.appendChild(b)}const g=$("#bar");const top=g?g.getBoundingClientRect().top:innerHeight-90;b.style.top=(top-50)+"px";b.textContent=t;b.classList.remove("on");void b.offsetWidth;b.classList.add("on");setTimeout(()=>{b.classList.remove("on");setTimeout(mbBandNext,450)},3600)}
mbSeen=function(t,m){G.mbS=G.mbS||{};const first=!G.mbS[t.id];G.mbS[t.id]=(G.mbS[t.id]||0)+1;if(first&&t.r>=3){const lb=(["","","","★3","★4 レア！","★5 激レア！"][t.r]);try{mbBand("👀 "+lb+" "+t.n+"が通った！");log("👀 "+lb+" "+t.n+" が通った！（街で見たものに記録）")}catch(e){}}};
(function(){const st=document.createElement("style");st.textContent=`#mbband{position:fixed;left:50%;transform:translate(-50%,8px);width:min(92vw,520px);z-index:60;background:rgba(28,22,44,.86);color:#fff;font-weight:900;font-size:13.5px;text-align:center;padding:9px 14px;border-radius:999px;box-shadow:0 4px 14px rgba(0,0,0,.25);opacity:0;pointer-events:none;transition:opacity .35s,transform .35s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#mbband.on{opacity:1;transform:translate(-50%,0)}`;document.head.appendChild(st)})();

/* ===== 通行人を追加（乗り物・人・動物・季節限定・地域限定） ===== */
/* 4本足の動物：[横,前後,高さ,幅,長さ,高さ,色] 前が+y */
function mbQ(l,w,h,c,t,o){o=o||{};const b=Math.sin(t*12)*.25,lg=o.lg||h*.55,P=[[-w/2,0,lg,w,l,h-lg,c],[-w*.4,l-.2,lg+(h-lg)*.4,w*.8,w*.9,(h-lg)*.9,o.hc||c]];
 for(const[xx,yy,k]of[[-w/2,.2,1],[w/2-.4*w/2-.2,.2,-1],[-w/2,l-1,-1],[w/2-.4*w/2-.2,l-1,1]])P.push([xx,yy+b*k,0,Math.max(.4,w*.3),.5,lg,o.lc||c]);
 if(o.ear)P.push([-w*.35,l+w*.3,lg+(h-lg)*1.25,.4,.4,o.ear,o.ec||c],[w*.35-.4,l+w*.3,lg+(h-lg)*1.25,.4,.4,o.ear,o.ec||c]);if(o.tail)P.push([-.2,-o.tail,lg+(h-lg)*.6,.4,o.tail,.4,o.tc||c]);if(o.horn)P.push([-w*.3,l+w*.2,lg+(h-lg)*1.3,.3,.3,o.horn,"#e0d6c4"],[w*.3-.3,l+w*.2,lg+(h-lg)*1.3,.3,.3,o.horn,"#e0d6c4"]);if(o.ex)o.ex(P);return P}
function mbBird(c,s,t,o){o=o||{};const f=Math.sin(t*(o.fly?16:3))*(o.fly?.6:0),P=[[-.5*s,0,.8*s,s,2*s,s,c],[-.4*s,1.8*s,1.4*s,.8*s,.9*s,.8*s,o.hc||c],[-.1*s,2.7*s,1.6*s,.2*s,.5*s,.2*s,o.bk||"#ffb300"]];if(o.fly)P.push([-2.2*s,.4*s,1.3*s+f,1.7*s,1.2*s,.2*s,o.wc||c],[.5*s,.4*s,1.3*s+f,1.7*s,1.2*s,.2*s,o.wc||c]);else P.push([-.3*s,.6*s,0,.2,.2,.8*s,"#ff8a65"],[.1*s,.6*s,0,.2,.2,.8*s,"#ff8a65"]);return P}
const MOS=[4],MSU=[7,8],MOC=[10],MDE=[12];
MBT.push(
 /* 乗り物 */
 {id:"yubin",n:"郵便のバイク",k:"bike",r:2,sp:20,d:1,mk:(a)=>mbBike({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:"#455a64",pa:"#455a64",mc:"#d32f2f",box:"#d32f2f",hel:"#fafafa"},1)},
 {id:"toshokan",n:"移動図書館",k:"car",r:3,l:22,sp:16,d:1,a:[4,4,5],mk:()=>{const P=mbBox(22,7.4,10,"#4caf50",5,"#fafafa");P.push([3.75,2,4,.1,13,3,"#fff59d"],[3.76,3,4.6,.1,2,1.8,"#e53935"],[3.76,6,4.6,.1,2,1.8,"#1e88e5"],[3.76,9,4.6,.1,2,1.8,"#8e24aa"]);return P}},
 {id:"ramen",n:"ラーメンの屋台",k:"car",r:3,l:12,sp:6,ni:1,a:[1,1,2],mk:()=>[[-3,1,2,6,9,5,"#8d6e63"],[-3.2,.6,7,6.4,9.8,.6,"#c62828"],[-3.25,.7,5.6,.1,9.4,1.4,"#fff3e0"],[-2.8,1,7.6,.4,.4,3,"#5d4037"],[2.4,1,7.6,.4,.4,3,"#5d4037"],[-.6,1.2,10.6,1.2,1.2,1.4,"#ff5252",1],[-3.6,2,0,.6,2.4,2.4,"#212121"],[3,2,0,.6,2.4,2.4,"#212121"],[-.5,10,2,1,3,.4,"#6d4c41"]]},
 {id:"hanayome",n:"花嫁を乗せたオープンカー",k:"car",r:4,l:18,sp:14,d:1,mk:()=>{const P=mbCar(18,6.8,5,"#fafafa",{open:1});P.push([-2.2,6,4,2.2,2,4,"#ffffff"],[-2,6.2,8,1.8,1.6,1.8,"#ffe0c4"],[-2.4,5.8,9.6,2.6,2.6,.6,"#ffffff"],[.6,6,4,2.2,2,4.2,"#212121"],[.8,6.2,8.2,1.8,1.6,1.8,"#f1c7a0"],[-1,-.4,2,2,.4,1.4,"#f8bbd0"],[-2.6,-1.6,1.2,.6,.6,.6,"#bdbdbd"],[1.8,-1.4,1.2,.6,.6,.6,"#bdbdbd"]);return P}},
 {id:"ensoku",n:"校外学習のバス",k:"car",r:3,l:32,sp:18,d:1,mk:()=>{const P=[[-4,1,1.4,8,30,10,"#ffd54f"],[-4.1,3,5.4,8.2,26,3,"#81d4fa"],[-4.1,1,2,8.2,30,1.2,"#e65100"]];for(let i=0;i<6;i++)P.push([-3.6,4+i*4.2,6.6,.8,.8,.9,"#ffe0c4"]);for(const yy of[4,24])for(const xx of[-4.2,3.2])P.push([xx,yy,0,1,2.4,2,"#212121"]);return P}},
 {id:"kanko_bus",n:"観光バス",k:"car",r:2,l:36,sp:20,a:[2,2,6,3],mk:(a)=>{const c=mbP(["#e91e63","#3949ab","#00897b","#f4511e"],a),P=[[-4,1,1.4,8,34,11,"#fafafa"],[-4.1,3,6,8.2,30,3.4,"#263238"],[-4.1,1,2,8.2,34,3,c],[-4.12,8,3.4,.1,18,1.6,"#ffd54f"]];for(const yy of[4,28])for(const xx of[-4.2,3.2])P.push([xx,yy,0,1,2.4,2,"#212121"]);return P}},
 {id:"roller",n:"ロードローラー",k:"car",r:3,l:14,sp:5,d:1,mk:()=>[[-3.6,9,0,7.2,4,4,"#9e9e9e"],[-3,1,1,6,8,4,"#fbc02d"],[-2.4,2,5,4.8,5,4,"#fbc02d"],[-2.2,2.4,5.4,4.4,4,3,"#9ecbe0"],[-3.8,1.4,0,1.2,3,3,"#212121"],[2.6,1.4,0,1.2,3,3,"#212121"]]},
 {id:"shovel",n:"ショベルカー",k:"car",r:3,l:16,sp:6,d:1,mk:()=>[[-3.6,1,0,7.2,12,2,"#424242"],[-3,2,2,6,10,4,"#fbc02d"],[-2.6,3,6,4,5,4,"#fbc02d"],[-2.4,3.4,6.4,3.6,3,3,"#9ecbe0"],[-.6,10,4,1.2,6,1.2,"#f9a825"],[-.6,15,1,1.2,1.2,4.4,"#f9a825"],[-1.4,15.2,.2,2.8,2,1.6,"#616161"]]},
 {id:"wrecker",n:"レッカー車",k:"car",r:3,l:34,sp:18,mk:(a)=>{const P=mbBox(16,7,6,"#f57c00",6,"#f57c00").map(p=>[p[0],p[1]+18,p[2],p[3],p[4],p[5],p[6],p[7]]);P.push([-.4,16,6,.8,4,.8,"#424242"],[-1.8,22,7.6,3.6,1.2,.6,"#ff1744",1]);return P.concat(mbCar(16,6.4,6,mbP(["#1e88e5","#9e9e9e","#e53935"],a)).map(p=>[p[0],p[1],p[2]+(p[1]>8?.8:0),p[3],p[4],p[5],p[6],p[7]]))}},
 {id:"genyu",n:"現金輸送車",k:"car",r:4,l:18,sp:24,d:1,mk:()=>{const P=mbBox(18,7,8,"#37474f",5,"#37474f");P.push([3.55,2,3,.1,10,.6,"#ffd54f"],[-3.55,2,3,.1,10,.6,"#ffd54f"]);return P}},
 {id:"basha",n:"馬車",k:"car",r:5,l:28,sp:10,mk:(a,t)=>{const P=[[-3,1,3,6,10,7,"#fafafa"],[-3.2,.8,10,6.4,10.4,1,"#ffd54f"],[-3.05,3,5,.1,6,3,"#9ecbe0"],[-3.6,1.4,0,.6,4,4,"#ffd54f"],[3,1.4,0,.6,4,4,"#ffd54f"],[-3.6,7.6,0,.6,3,3,"#ffd54f"],[3,7.6,0,.6,3,3,"#ffd54f"],[-.3,11,3,.6,6,.4,"#6d4c41"]];return P.concat(mbQ(9,2.6,7,"#fafafa",t||0,{lg:4,ear:1,tail:2,tc:"#e0e0e0"}).map(p=>[p[0],p[1]+16,p[2],p[3],p[4],p[5],p[6]]))}},
 {id:"jinriki",n:"人力車",k:"bike",r:4,sp:9,a:[3,3,2],d:1,mk:(a,t)=>{const P=[[-3,0,2.6,6,5,4,"#212121"],[-3.2,-.2,6.6,6.4,5.4,.6,"#c62828"],[-3.6,1.4,0,.6,5,5,"#5d4037"],[3,1.4,0,.6,5,5,"#5d4037"],[-2.6,4.8,3,.4,6,.4,"#5d4037"],[2.2,4.8,3,.4,6,.4,"#5d4037"]];return P.concat(mbPer({sk:"#c58a5c",hr:"#161616",cl:"#212121",pa:"#212121",t:t*1.4,hel:"#d7ccc8"}).map(p=>[p[0],p[1]+6,p[2],p[3],p[4],p[5],p[6],p[7]]))}},
 {id:"segway",n:"セグウェイ",k:"bike",r:3,sp:12,mk:(a)=>[[-1.6,0,0,.6,1.8,1.8,"#212121"],[1,0,0,.6,1.8,1.8,"#212121"],[-1,0,.8,2,1.8,.4,"#424242"],[-.2,1.6,1,.4,.4,6,"#9e9e9e"],[-1.2,1.4,7,2.4,.4,.4,"#9e9e9e"]].concat(mbPer({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:mbP(MB_CL,a),pa:"#3b3b4a",walk:0,dz:1.2}).map(p=>[p[0],p[1]-4,p[2],p[3],p[4],p[5],p[6],p[7]]))},
 {id:"kick",n:"キックボード",k:"bike",r:2,sp:13,mk:(a,t)=>[[-.3,0,0,.6,1,1,"#212121"],[-.3,5,0,.6,1,1,"#212121"],[-.6,.4,.6,1.2,5,.3,"#26c6da"],[-.2,5.2,.8,.4,.4,6,"#9e9e9e"],[-1.2,5,6.6,2.4,.4,.4,"#212121"]].concat(mbPer({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:mbP(MB_CL,a),pa:"#3b3b4a",walk:0,dz:.9}).map(p=>[p[0],p[1]-2,p[2],p[3],p[4],p[5],p[6],p[7]]))},
 {id:"ichirin",n:"一輪車の子ども",k:"bike",r:3,sp:6,d:1,a:[4,4],mk:(a,t)=>[[-.3,1,0,.6,2.6,2.6,"#e53935"],[-.2,2.1,2.6,.4,.4,2.4,"#9e9e9e"],[-.8,1.6,5,1.6,1.4,.4,"#212121"]].concat(mbPer({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:mbP(["#ffeb3b","#4fc3f7","#f48fb1"],a),pa:"#3b3b4a",walk:0,dz:1.6}).map(p=>[p[0]*.75,p[1]*.75-1.2,p[2]*.75+1.4,p[3]*.75,p[4]*.75,p[5]*.75,p[6],p[7]]))},
 {id:"ryoshi",n:"漁師の軽トラ",k:"car",r:2,l:13,sp:22,only:[6],mk:()=>{const P=mbBox(13,6,4.5,"#fafafa",5,"#fafafa");P[0][5]=1.2;P.push([-2.6,1.4,2.2,2.4,2.4,1.6,"#1e88e5"],[.2,1.4,2.2,2.4,2.4,1.6,"#1e88e5"],[-2.4,4.2,2.2,4.8,2.6,1.2,"#cfd8dc"],[-1.8,4.4,3.4,3.6,2,.4,"#90a4ae"]);return P}},
 {id:"taue",n:"田植え機",k:"car",r:3,l:11,sp:5,only:[5],d:1,mo:[4,5,6],mk:()=>[[-3.4,0,1,6.8,3,1,"#8bc34a"],[-2.4,3,1.4,4.8,6,3,"#e53935"],[-.4,5,4.4,.8,.8,4,"#424242"],[-1.6,5.6,8.4,3.2,.4,.4,"#424242"],[-3,4,0,1,3,3,"#212121"],[2,4,0,1,3,3,"#212121"]]},
 {id:"yaoya",n:"八百屋の配達",k:"bike",r:2,sp:11,only:[3],d:1,mk:(a)=>{const P=mbBike({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:"#2e7d32",pa:"#3b3b4a",fc:"#616161",box:"#a1887f"});P.push([-1.2,0,6.6,.8,.8,.8,"#ff7043"],[-.2,.6,6.6,.8,.8,.8,"#7cb342"],[.4,0,6.6,.6,.6,.8,"#fdd835"]);return P}},
 {id:"train",n:"電車",k:"train",r:2,l:62,sp:34,only:[2],sp0:1,mk:()=>{const P=[];for(let i=0;i<4;i++){const y=i*15.5;P.push([-2.3,y,.6,4.6,15,4.4,"#eceff1"],[-2.35,y+1,2.4,4.7,13,1.4,"#4fc3f7"],[-2.35,y,3.9,4.7,15,.6,"#2e7d32"],[-2.5,y,5,5,15,.4,"#90a4ae"])}P.push([-1,61.6,2.2,2,.4,1,"#fff59d",1]);return P}},
 /* 人 */
 {id:"shogaku",n:"ランドセルの小学生の列",k:"ped",r:2,sp:7,grp:4,d:1,a:[4,4,5],mk:()=>[]},
 {id:"hoikuen",n:"保育園のお散歩カート",k:"ped",r:3,sp:5,d:1,a:[4,4,3],pet:(t)=>{const b=Math.sin(t*14)*.1,P=[[-2.4,6.6,1.2,4.8,7,3,"#f5f5f5"],[-2.5,6.5,4.2,5,7.2,.4,"#e53935"],[-2.6,6.8,0,1,1,1.2,"#212121"],[1.6,6.8,0,1,1,1.2,"#212121"],[-2.6,12.2,0,1,1,1.2,"#212121"],[1.6,12.2,0,1,1,1.2,"#212121"]];for(let i=0;i<4;i++)P.push([-1.6+(i%2)*2,7.6+Math.floor(i/2)*3,4.6+b,1.4,1.4,1.4,"#ffe0c4"],[-1.7+(i%2)*2,7.5+Math.floor(i/2)*3,5.9+b,1.6,1.6,.5,["#ffeb3b","#4fc3f7","#f48fb1","#aed581"][i]]);return P},mk:()=>[]},
 {id:"babycar",n:"ベビーカーを押す人",k:"ped",r:1,sp:7,d:1,a:[4,4,3],pet:(t)=>[[-1.4,6.2,2,2.8,3.6,2.4,"#5c6bc0"],[-1.5,8.2,4.4,3,1.8,2.2,"#3949ab"],[-1.6,6,0,.6,.6,1.2,"#212121"],[1,6,0,.6,.6,1.2,"#212121"],[-1.6,9.2,0,.6,.6,1.2,"#212121"],[1,9.2,0,.6,.6,1.2,"#212121"],[-.2,4.6,4.2,.4,2,.4,"#9e9e9e"]],mk:()=>[]},
 {id:"tsue",n:"杖をついたおじいさん",k:"ped",r:1,sp:5,d:1,a:[3,4,5],mk:()=>[]},
 {id:"cameraman",n:"カメラマン",k:"ped",r:2,sp:6,a:[2,6,3],mk:()=>[]},
 {id:"youtuber",n:"自撮り棒のユーチューバー",k:"ped",r:2,sp:6,a:[0,1,2],mk:()=>[]},
 {id:"drone",n:"配達ドローン",k:"ped",r:4,sp:16,fly:18,cat:1,d:1,mk:(a,t)=>{const r=Math.sin(t*40)*.3;return[[-1.4,0,0,2.8,2.8,1.4,"#eceff1"],[-1,.4,-1.4,2,2,1.4,"#ff7043"],[-2.6-r,-.8,1.6,1.6,.3,.2,"#424242"],[1+r,-.8,1.6,1.6,.3,.2,"#424242"],[-2.6+r,3.3,1.6,1.6,.3,.2,"#424242"],[1-r,3.3,1.6,1.6,.3,.2,"#424242"],[-.3,1.2,1.4,.6,.6,.4,"#00e676",1]]}},
 {id:"chirashi",n:"チラシ配り",k:"ped",r:2,sp:3,a:[2,2,1,0],mk:()=>[]},
 {id:"kouho",n:"選挙の候補者",k:"ped",r:3,sp:4,d:1,mk:()=>[]},
 {id:"marathon",n:"マラソン大会の集団",k:"ped",r:4,sp:16,grp:6,d:1,mk:()=>[]},
 {id:"awa",n:"阿波踊りの列",k:"ped",r:4,sp:5,grp:5,mo:MSU,mk:()=>[]},
 {id:"santa",n:"サンタクロース",k:"ped",r:4,sp:7,mo:MDE,mk:()=>[]},
 {id:"halloween",n:"ハロウィンの仮装",k:"ped",r:3,sp:7,grp:3,mo:MOC,mk:()=>[]},
 {id:"hanami",n:"花見帰りの人",k:"ped",r:2,sp:6,grp:2,mo:MOS,mk:()=>[]},
 {id:"yukata",n:"浴衣のカップル",k:"ped",r:2,sp:5,pair:1,mo:MSU,mk:()=>[]},
 {id:"yatai",n:"屋台を引くおじさん",k:"ped",r:3,sp:4,ni:1,only:[1],pet:(t)=>[[-2.4,6,2,4.8,6,4,"#8d6e63"],[-2.6,5.8,8,5.2,6.4,.6,"#ff7043"],[-2.65,6,6.6,.1,6,1.4,"#fff3e0"],[-2.8,7,0,.6,2.4,2.4,"#212121"],[2.2,7,0,.6,2.4,2.4,"#212121"],[-.4,11.6,9,.8,.8,1.2,"#ff5252",1]],mk:()=>[]},
 {id:"katanoneko",n:"肩に猫を乗せた人",k:"ped",r:4,sp:6,pet:(t)=>[[1.1,3.6,10.2,1.4,2.6,1.2,"#ff9800"],[1.1,5.8,11,1.4,1.2,1.2,"#ff9800"],[1.2,5.9,12.2,.3,.3,.5,"#ff9800"],[2.1,5.9,12.2,.3,.3,.5,"#ff9800"],[1.6,2.4,10.6,.3,1.4,.3,"#ff9800"]],mk:()=>[]},
 {id:"yagi",n:"ヤギの散歩",k:"ped",r:4,sp:6,a:[5,5],pet:(t)=>mbQ(4.4,1.8,4.4,"#f5f5f5",t,{lg:2.4,horn:1,tail:.6,ex:P=>P.push([-.2,4.8,2.4,.4,.3,1,"#f5f5f5"])}).map(p=>[p[0]+2.4,p[1]+5,p[2],p[3],p[4],p[5],p[6]])},
 {id:"alpaca",n:"アルパカの散歩",k:"ped",r:5,sp:5,pet:(t)=>mbQ(5,2.4,5,"#f3e5c8",t,{lg:3,ear:1,ex:P=>P.push([-.7,4.4,4.6,1.4,1.4,4,"#f3e5c8"],[-.8,4.6,8.4,1.6,1.8,1.6,"#f3e5c8"])}).map(p=>[p[0]+2.6,p[1]+5,p[2],p[3],p[4],p[5],p[6]])},
 /* 動物 */
 {id:"karasu",n:"カラス",k:"ped",r:1,sp:3,cat:1,a:[1,1,3],mk:(a,t)=>mbBird("#212121",1.2,t,{bk:"#424242"})},
 {id:"hato",n:"ハト",k:"ped",r:1,sp:2,cat:1,grp:3,a:[2,2,3,0],mk:(a,t)=>mbBird("#90a4ae",1,t,{hc:"#607d8b"})},
 {id:"suzume",n:"スズメの群れ",k:"ped",r:1,sp:4,cat:1,grp:4,a:[4,5],mk:(a,t)=>mbBird("#8d6e63",.6,t,{hc:"#5d4037"})},
 {id:"kamome",n:"カモメ",k:"ped",r:2,sp:10,cat:1,fly:16,only:[6],mk:(a,t)=>mbBird("#fafafa",1.4,t,{fly:1,wc:"#cfd8dc"})},
 {id:"karasu_f",n:"空を飛ぶカラス",k:"ped",r:2,sp:12,cat:1,fly:20,mk:(a,t)=>mbBird("#212121",1.3,t,{fly:1,bk:"#424242"})},
 {id:"fukuro",n:"フクロウ",k:"ped",r:4,sp:9,cat:1,fly:17,ni:1,a:[5,5,4],mk:(a,t)=>mbBird("#8d6e63",1.5,t,{fly:1,hc:"#a1887f",bk:"#ffd54f"})},
 {id:"komori",n:"コウモリ",k:"ped",r:3,sp:13,cat:1,fly:19,ni:1,a:[5,1],mk:(a,t)=>mbBird("#37474f",.9,t,{fly:1,bk:"#37474f"})},
 {id:"maigo",n:"迷子の犬",k:"ped",r:3,sp:7,cat:1,mk:(a,t)=>mbDog(0,2,mbP(["#d9822b","#fafafa","#5d4037"],a),0,t).concat([[-.5,4.6,2.2,1,.3,.3,"#e53935"]])},
 {id:"oyakoneko",n:"猫の親子",k:"ped",r:3,sp:4,cat:1,a:[3,5],mk:(a,t)=>{const c=mbP(["#fafafa","#ff9800","#424242"],a);return mbDog(0,4,c,0,t).concat(mbDog(.2,0,c,0,t+1).map(p=>[p[0]*.6,p[1]*.6,p[2]*.6,p[3]*.6,p[4]*.6,p[5]*.6,p[6]]))}},
 {id:"karugamo",n:"カルガモ親子の行列",k:"ped",r:4,sp:3,cat:1,a:[4,6,5],mk:(a,t)=>{let P=mbBird("#8d6e63",1.2,t,{hc:"#5d4037",bk:"#fdd835"}).map(p=>[p[0],p[1]+9,p[2],p[3],p[4],p[5],p[6]]);for(let i=0;i<4;i++)P=P.concat(mbBird("#a1887f",.6,t+i,{bk:"#fdd835"}).map(p=>[p[0]+(i%2)*.6,p[1]+i*2,p[2],p[3],p[4],p[5],p[6]]));return P}},
 {id:"tanuki",n:"たぬき",k:"ped",r:3,sp:5,cat:1,ni:1,only:[5,4],mk:(a,t)=>mbQ(3.4,1.8,2.6,"#8d6e63",t,{lg:1,hc:"#a1887f",ear:.5,tail:1.4,tc:"#5d4037",lc:"#3e2723",ex:P=>P.push([-.8,3.6,1.6,1.6,.3,.5,"#3e2723"])})},
 {id:"kitsune",n:"キツネ",k:"ped",r:4,sp:8,cat:1,only:[5],mk:(a,t)=>mbQ(3.6,1.4,3,"#ef6c00",t,{lg:1.4,ear:.8,tail:2.4,tc:"#ffe0b2",lc:"#3e2723"})},
 {id:"inoshishi",n:"イノシシ",k:"ped",r:4,sp:11,cat:1,only:[5],mk:(a,t)=>mbQ(5,2.6,3.6,"#5d4037",t,{lg:1.4,hc:"#4e342e",ear:.5,tail:.6,ex:P=>P.push([-.9,6.1,1.4,.3,.3,.6,"#fafafa"],[.6,6.1,1.4,.3,.3,.6,"#fafafa"])})},
 {id:"shika",n:"シカ",k:"ped",r:4,sp:8,cat:1,only:[5],mk:(a,t)=>mbQ(5,1.8,6,"#a1887f",t,{lg:3.6,ear:.6,horn:2.2,tail:.5,tc:"#fafafa"})},
 {id:"saru",n:"サル",k:"ped",r:4,sp:7,cat:1,only:[5],mk:(a,t)=>mbQ(2.6,1.6,3.2,"#8d6e63",t,{lg:1.4,hc:"#f8bbd0",tail:.8})},
 {id:"usagi",n:"野ウサギ",k:"ped",r:3,sp:8,cat:1,only:[5],mk:(a,t)=>mbQ(2,1.4,1.8,"#a1887f",t,{lg:.6,ear:1.8,tail:.3,tc:"#fafafa"})},
 {id:"hebi",n:"ヘビ",k:"ped",r:3,sp:3,cat:1,only:[5],mk:(a,t)=>{const P=[];for(let i=0;i<7;i++)P.push([Math.sin(t*4+i)*.8-.3,i*.8,0,.6,.8,.5,i===6?"#33691e":"#558b2f"]);return P}},
 {id:"nezumi",n:"ネズミ",k:"ped",r:2,sp:9,cat:1,ni:1,a:[1,1,3],mk:(a,t)=>mbQ(1.6,.8,.8,"#757575",t,{lg:.3,ear:.3,tail:1.4,tc:"#9e9e9e"})},
 {id:"hakubishin",n:"ハクビシン",k:"ped",r:3,sp:8,cat:1,ni:1,only:[4,3],mk:(a,t)=>mbQ(4,1.4,2.2,"#616161",t,{lg:.9,hc:"#eeeeee",tail:2.6,tc:"#424242"})},
 {id:"kame",n:"ウミガメ",k:"ped",r:4,sp:1.5,cat:1,only:[6],mk:(a,t)=>[[-1.6,0,.3,3.2,3.6,1.2,"#6d4c41"],[-1.2,.4,1.5,2.4,2.8,.4,"#8d6e63"],[-.5,3.6,.4,1,1,.8,"#a1887f"],[-2.4,1+Math.sin(t*3)*.3,.2,1,1,.3,"#a1887f"],[1.4,1-Math.sin(t*3)*.3,.2,1,1,.3,"#a1887f"]]},
 {id:"kani",n:"カニ",k:"ped",r:2,sp:3,cat:1,only:[6],mk:(a,t)=>[[-.8,0,.4,1.6,1.2,.6,"#e53935"],[-1.4,.2,0,.2,.2,.5,"#c62828"],[1.2,.2,0,.2,.2,.5,"#c62828"],[-1.6,1.2,.6,.6,.6,.4,"#e53935"],[1,1.2,.6,.6,.6,.4,"#e53935"]]}
);
MBT.forEach(t=>MBI[t.id]=t);
Object.assign(MBLK,{shogaku:{shirt:["#fafafa","#ffcc80","#90caf9"],acc:2,accC:"#ffeb3b",pants:["#1a237e"],bot:1},tsue:{hair:["#e0e0e0","#bdbdbd"],shirt:["#8d6e63","#607d8b"],top:5},cameraman:{shirt:["#5d4037","#455a64"],top:5,acc:2},youtuber:{hair:["#e86aa6","#4fc3f7","#e0c068"],shirt:["#fafafa","#212121"]},chirashi:{shirt:["#ff7043","#fdd835"],top:0},kouho:{shirt:["#263238"],top:2,pants:["#263238"]},
 marathon:{shirt:["#e53935","#1e88e5","#43a047","#fdd835","#8e24aa"],top:4,bot:1,pants:["#212121"]},awa:{shirt:["#1565c0","#e3f2fd","#ad1457"],top:5,pants:["#fafafa"]},santa:{shirt:["#d32f2f"],top:5,pants:["#d32f2f"],hair:["#fafafa"],acc:4,accC:"#fafafa",akU:1},halloween:{shirt:["#4a148c","#212121","#ff6f00"],top:5},hanami:{shirt:["#f8bbd0","#fafafa"]},yukata:{shirt:["#1a237e","#ad1457","#00695c","#f8bbd0"],top:5,pants:["#1a237e","#ad1457"]},yatai:{hair:["#9e9e9e"],shirt:["#fafafa"],top:0,acc:9},katanoneko:{},yagi:{},alpaca:{},hoikuen:{shirt:["#f48fb1","#81d4fa"],top:5},babycar:{}});
{const _lk=mbLook;mbLook=function(t,a){const c=_lk.apply(this,arguments),o=MBLK[t.id]||{};if(o.accC)c.accC=o.accC;if(o.akU)c.akU=1;if(t.id==="shogaku"){c.fat=0}return c}}
{const _pp=mbProps;mbProps=function(m,ox,oy,dir){const P=_pp.apply(this,arguments),px=(x,y,z,w,d,h,c,s)=>{s=s||.5;for(let i=0;i<w;i+=s)for(let j=0;j<d;j+=s)for(let k=0;k<h;k+=s)P.push([ox+x+i,oy+y+j,z+k,c,undefined,s])},id=m.T.id,back=dir===0?-.6:3.2;
 if(id==="shogaku")px(.6,back,5,3,1,3,mbP(["#c62828","#212121","#8e24aa","#795548"],m.a));if(id==="tsue")px(3.6,2.6,0,.5,.5,7,"#6d4c41");if(id==="cameraman")px(1,dir===0?3.4:-.6,8.4,2,1,1.4,"#212121");if(id==="youtuber")px(3.4,dir===0?3:0,8,.5,.5,5,"#9e9e9e"),px(3.2,dir===0?3:0,13,1,.5,1.5,"#212121");
 if(id==="chirashi")px(3.4,1.6,6.6,1,1.5,.5,"#fafafa");if(id==="kouho"){for(let k=0;k<4;k++)px(.6+k*.7,1.2,5+k*.7,.7,2,.5,"#fafafa");px(3.4,1.6,8,1,1.5,1,"#bdbdbd")}if(id==="marathon")px(1.2,dir===0?3.2:-.4,5.5,1.6,.5,1.6,"#fafafa");
 if(id==="awa")px(.2,.4,12,3.6,3,.5,"#fff59d"),px(1,1.2,12.5,2,1.5,.5,"#fff59d");if(id==="santa")px(.4,back,6,3,1.6,3.5,"#6d4c41");if(id==="halloween")m.a%2<1?px(.6,.6,8,3,3,3,"#ff6f00"):(px(.2,.2,12,3.6,3.6,.5,"#212121"),px(1,1,12.5,2,2,2,"#212121"));if(id==="hanami")px(3.4,1.6,6,.5,.5,4,"#6d4c41"),px(3,1.2,10,1.5,1.5,1,"#f8bbd0");
 if(id==="yukata")px(.6,1.4,6.5,2.8,1.4,.5,"#fdd835");return P}}
/* 駅前の電車：線路の上を時々走る */
function mbSpecial(g,z){if(z!==2)return;const now=performance.now();if(MB.L.some(m=>m.T.id==="train")||now<(MB.trN||0))return;MB.trN=now+(12000+Math.random()*10000)/Math.max(1,mbSpd());const xs=FLT.map(t=>t[0]),ys=FLT.map(t=>t[1]),L=Math.min(...xs)*6,Rr=(Math.max(...xs)+1)*6,T=Math.min(...ys)*6,s=Math.random()<.5?1:-1;MB.L.push({T:MBI.train,s,ax:1,zo:14.4,x:s>0?L-150:Rr+150,y:T-17+(s>0?1.6:4.8)+2.3,a:1,t:0,sp:34,tr:1,x0:L-160,x1:Rr+160})}

