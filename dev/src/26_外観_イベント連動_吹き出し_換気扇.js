/* ===== 図鑑に「街で見たもの」 ===== */
{const _dt=dxTabs;dxTabs=function(){const h=_dt.apply(this,arguments),m=R.dxm||"c";return h.replace("</div>",`<button data-dxm="m" class="${m==="m"?"on":""}">👀 街</button></div>`)}}
function rmbDex(){const S=G.mbS||{},T=MBT,n=T.filter(t=>S[t.id]).length,en=XEV.filter(e=>S["ev:"+e.id]).length,AN=(typeof AREA!=="undefined"?AREA:[]).map(a=>a.n);
 const grp=[[5,"★5 激レア"],[4,"★4 レア"],[3,"★3 たまに"],[2,"★2 ときどき"],[1,"★1 よく見る"]],hint=t=>t.only?AN[t.only[0]]+(t.only.length>1?"など":"")+"だけ":t.mo?t.mo.join("・")+"月":t.ni?"夜":t.late?"明け方":t.cond?"天気や時間":"";
 $("#dc").innerHTML=dxTabs()+`<div style="margin-top:6px">👀 街で見たもの ${n}/${T.length}　🚨 特殊イベント ${en}/${XEV.length}</div><div class="xs" style="font-size:12px;opacity:.8;margin-top:2px">お店の前を通った人や車、店の前で起きたことが記録されます。地域・季節・時間帯・天気で出てくるものが変わります。</div>`;
 $("#dg").classList.remove("dxg");$("#dg").innerHTML=`<div style="grid-column:1/-1">`+`<div style="font-weight:900;font-size:13px;margin:8px 0 4px;color:#c62828">🚨 特殊イベント</div><div class="mbg">`+XEV.slice().sort((a,b)=>b.r-a.r).map(e=>{const c=S["ev:"+e.id];return`<div class="mbc ${c?"":"lk"}"><b>${c?esc(e.n):"？？？"}</b><small>${"★".repeat(e.r)}${c?"　"+c+"回":(e.only?"　"+AN[e.only[0]]+(e.only.length>1?"など":""):e.mo?"　"+e.mo.join("・")+"月":"")}</small></div>`}).join("")+`</div>`+
  grp.map(([r,lb])=>`<div style="font-weight:900;font-size:13px;margin:10px 0 4px;color:#6658a6">${lb}</div><div class="mbg">`+T.filter(t=>t.r===r).map(t=>{const c=S[t.id],h=hint(t);return`<div class="mbc ${c?"":"lk"}"><b>${c?esc(t.n):"？？？"}</b><small>${c?c+"回":h?"ヒント："+h:""}</small></div>`}).join("")+`</div>`).join("")+`</div>`;$("#dd").hidden=true}
{const _rdm=rdex;rdex=function(){if(R.dxm==="m"){rmbDex();return}return _rdm.apply(this,arguments)}}
/* 移転のカードからは「街で見たもの」ボタンを外す（オン/オフだけ残す） */
{const _mc4=mvCard;mvCard=function(){const r=_mc4.apply(this,arguments);try{const b=$("#mbgo");if(b)b.remove()}catch(e){}return r}}


/* ===== 店の前のイベント：芸能人・YouTuberは図鑑のお客さんが出る／工事は「前の道で工事中」の日だけ一日中 ===== */
XP.selfie=(a)=>{a(3.4,1.2,7,.25,.25,6,"#9e9e9e",.25);a(3,.8,13,1,.5,1.5,"#212121",.5,1)};
(()=>{const f=id=>XEV.find(e=>e.id===id);
 const roke=f("roke");if(roke){roke.parts[0].celeb="芸能人";roke.cv="が店の前でロケをしていた"}
 const de=f("demachi");if(de){de.parts.splice(1,0,XPp(-14,2,3,null,null,{celeb:"芸能人"}));de.cv="が店の前に現れた！"}
 const ei=f("eiga");if(ei){ei.parts[2].celeb="芸能人";ei.parts[3].celeb="芸能人";ei.cv="が店の前で映画の撮影をしていた"}
 XEV.push({id:"youtube",n:"YouTuberの撮影",r:4,dur:60,talk:["外でYouTuberが撮影してましたよ！","さっきの人、動画で見たことあるかも"],cv:"が店の前で撮影していた",parts:[XPp(-8,-2,3,null,["selfie"],{celeb:"YouTuber"}),...onl(2,-12,6)]});
 const kj=f("koji");if(kj){kj.link=1;kj.talk=["前の工事、一日中やってますね","工事の音、けっこう響きますね","今日は前が工事で、来るの大変でした"]}})();
/* 図鑑のお客さんを選ぶ（会っていない人も出る。名前は「？？？」） */
function xCeleb(job,used){const inS=new Set((R.people||[]).map(p=>p.c));const L=G.cs.filter(c=>c&&c.job===job&&!inS.has(c)&&!used.includes(c));return L.length?L[Math.floor(Math.random()*L.length)]:null}
{const _xs=xEvStart;xEvStart=function(ev){const used=[];const keep=ev.parts.map(q=>q.lk);ev.parts.forEach(q=>{if(q.celeb){const c=xCeleb(q.celeb,used);if(c)used.push(c);q._c=c}});const r=_xs.apply(this,arguments);
 try{const X=MB.xev;if(X){X.ents.forEach(m=>{if(m.q&&m.q._c){m.c=m.q._c;m.cel=1}});if(used.length&&ev.cv){const nmz=used.map(c=>c.met?nm(c):"？？？").join("と");const t="👀 "+nmz+ev.cv;log(t);mbBand(t)}}}catch(e){}ev.parts.forEach(q=>{delete q._c});return r}}
/* 工事は「前の道で工事中」の日だけ。その日は一日中 */
{const _pl=xEvPlan;xEvPlan=function(){const kj=XEV.find(e=>e.id==="koji");if(td().koji&&kj){MB.xev=null;MB.xPlan={ev:Object.assign({},kj,{dur:Math.max(60,G.close*60-R.t-10)}),at:R.t};return}const sv=XEV.indexOf(kj);if(sv>=0)XEV.splice(sv,1);try{_pl.apply(this,arguments)}finally{if(sv>=0)XEV.splice(sv,0,kj)}}}

/* ===== 友だちの店に遊びに行く：着ぐるみ・装飾品は自分は自分のまま、相手の店主は相手のもの ===== */
{const _vl=visLook;visLook=function(o){const r=_vl.apply(this,arguments);try{o=o||{};["kg","accE","accH","accM","accCE","accCH","accCM","accCMv","hc2"].forEach(k=>{if(o[k]!=null)r[k]=o[k]});if(!R.vis&&G&&o===G.ow){const L=owAccLook(o);r.acc=L.acc;r.accC=L.accC;r.accV=L.accV||null;r.kg=+L.kg||0}}catch(e){}return r}}
{const _al9=owAccLook;owAccLook=function(o){const L=_al9.apply(this,arguments);try{if(R.vis&&o&&o===G.ow){L.kg=+o.kg||0;if(L.kg)L.accV=null}}catch(e){}return L}}

/* ===== 外観モード（見るだけ・回転だけ） ===== */
const EXT_Y=1.62;R.ext=0;
function extMod(a){if(!R.ext)return;const xs=FLT.map(t=>t[0]),ys=FLT.map(t=>t[1]),EC="#8f857a",EC2="#7a7066";
 for(const v of a){if(v[4]&&v[4]!==2&&!(v[5]&&v[5]<1))v[3]=((v[2]|0)%4===0)?EC2:EC;if(v[4]===2&&(!v[5]||v[5]>=1))v[4]=0}
 FLT.forEach(([tx,ty])=>{box(a,tx*6-1,ty*6-1,24,8,8,1,"#5f5a55")});
 const x0=Math.min(...xs)*6-1,x1=(Math.max(...xs)+1)*6+1,y0=Math.min(...ys)*6-1,y1=(Math.max(...ys)+1)*6+1;
 box(a,x0-1,y0-1,25,x1-x0+2,1,1.5,"#4e4944");box(a,x0-1,y1,25,x1-x0+2,1,1.5,"#4e4944");box(a,x0-1,y0,25,1,y1-y0,1.5,"#4e4944");box(a,x1,y0,25,1,y1-y0,1.5,"#4e4944");
 box(a,x0+8,y0+4,25,5,4,4,"#cfd8dc");box(a,x0+8.3,y0+4.3,29,4.4,3.4,.4,"#b0bec5");box(a,x0+16,y1-9,25,4,4,7,"#90a4ae");box(a,x0+15.7,y1-9.3,32,4.6,4.6,.6,"#78909c");
 }
let EXT_SV=null;
function extSet(on){if(!!R.ext===!!on)return;if(on){EXT_SV={yaw:R.cam.yaw,pit:R.cam.pit,zoom:R.cam.zoom};R.ext=1;R.cam.yaw=EXT_Y;R.cam.pit=.22;R.cam.zoom=Math.max(1.05,R.cam.zoom*1.1)}else{R.ext=0;if(EXT_SV)Object.assign(R.cam,EXT_SV)}build();R.camVer++;BGK="";try{xrow()}catch(e){}document.body.classList.toggle("extv",!!R.ext)}
{const _ot=onTap;onTap=function(){if(R.ext)return;return _ot.apply(this,arguments)}}
{const _bd=build;build=function(){const r=_bd.apply(this,arguments);try{if(R.ext){TX-=7;TY+=0}}catch(e){}return r}}
{const _xe=xrow;xrow=function(){const r=_xe.apply(this,arguments);try{const x=$("#xrow");if(x){let b=$("#extb");if(!b){b=document.createElement("button");b.id="extb";b.onclick=e=>{e.stopPropagation();extSet(!R.ext)}}const ck=$("#chekib");if(ck&&ck.nextSibling!==b)ck.after(b);else if(!b.parentNode)x.appendChild(b);b.textContent=R.ext?"🏪 店内":"🏠 外観";b.dataset.l=R.ext?"店内":"外観";b.classList.toggle("on",!!R.ext)}}catch(e){}return r}}
try{xrow()}catch(e){}
(function(){const st=document.createElement("style");st.textContent=`body.extv #mvbtn,body.extv .cvw .hint{display:none!important}`;document.head.appendChild(st)})();

/* ===== 外観モードとほかの機能の合わせ方 ===== */
/* シャッター演出の間は外観モードを外し、終わったら戻す */
{const _cc=cineClose;cineClose=function(done){const w=!!R.ext;if(w)extSet(0);return _cc.call(this,()=>{try{done()}finally{if(w&&!R.vis)try{extSet(1)}catch(e){}}})}}
{const _st7=start;start=function(){const w=!!R.ext;if(w)extSet(0);const r=_st7.apply(this,arguments);try{if(w){if(R.cine)R.cine.reExt=1;else extSet(1)}}catch(e){}return r};$("#go").onclick=start}
{const _ce=cineEnd;cineEnd=function(){const c=R.cine,re=c&&c.reExt;const r=_ce.apply(this,arguments);if(re)try{extSet(1)}catch(e){}return r}}
/* 友だちの店に遊びに行く時は外観モードを外す */
{const _ve=visEnter;visEnter=function(){if(R.ext)try{extSet(0)}catch(e){}return _ve.apply(this,arguments)}}
/* 模様替え・装飾のタブに行く時も外す */
{const _stb=setTab;setTab=function(t){if(R.ext&&t==="deco")try{extSet(0)}catch(e){}return _stb.apply(this,arguments)}}
try{document.head.insertAdjacentHTML("beforeend","<style>body.vis #extb{display:none!important}</style>")}catch(e){}

/* ===== 店名は10文字まで（今のセーブで長い店名は10文字に） ===== */
try{if(G&&G.ow&&G.ow.shop&&[...G.ow.shop].length>10){const o=G.ow.shop;G.ow.shop=[...o].slice(0,10).join("");save();setTimeout(()=>{try{toast("店名は10文字までになりました（「"+G.ow.shop+"」）。店主の見た目から変えられます")}catch(e){}},2500)}}catch(e){}

/* ===== 訪ねてくるイベントの人は、歩道を歩いて（車で）やってくる。元恋人だけは灰色のまま ===== */
const MOBLK={6:{shirt:"#ffeb3b",top:7,pants:"#c8b38a",acc:18,pp:["cam"]},29:{shirt:"#1a237e",top:2,pants:"#1a237e",acc:2,sex:"男性",car:"police"},30:{shirt:"#212121",top:5,pants:"#212121",acc:1,hair:"#e0c068",hs:10,sex:"男性"},
 43:{shirt:"#ffd54f",top:2,pants:"#ffd54f",acc:11,car:"lux"},48:{shirt:"#f48fb1",top:8,pants:"#fafafa",acc:1,pp:["selfie"]},49:{shirt:"#e53935",top:0,pants:"#212121",acc:2,pp:["box2"]}};
{const _mv=mobVisit;mobVisit=function(e){if(R.closed||R.away!=null)return false;if(!mbOn()||R.cine)return _mv.apply(this,arguments);
 const L=MOBLK[e.id],c=mobChar();if(L){Object.assign(c,{skin:MB_SK[Math.floor(Math.random()*MB_SK.length)],hair:L.hair||MB_HR[Math.floor(Math.random()*MB_HR.length)],shirt:L.shirt,pants:L.pants,top:L.top,acc:L.acc||0,accC:"#333333"});if(L.sex)c.sex=L.sex;c.hs=L.hs!=null?L.hs:(c.sex==="女性"?MB_HSF:MB_HSM)[Math.floor(Math.random()*6)];c.bot=c.sex==="女性"?c.bot:0;c.mobC=1}
 const g=mbGeo(),side=Math.random()<.5?1:-1,T=Object.assign({},XEVT.per,{pp:L&&L.pp});
 if(L&&L.car){const base=xvT(L.car);if(base){const CT=L.car==="police"?xFlash(base):base;const car={T:CT,s:-1,lane:-1,x:g.L-20,y:g.Y1+30,a:2,t:0,sp:20,tag:1,seen:1,ev:1,evc:{e,c,T,stopY:15+(base.l||18)/2}};MB.L.push(car);MB.evw=(MB.evw||[]).concat([car]);return true}}
 const m={T,c,s:side,x:WK_X,y:15-side*55,a:1,t:0,sp:10,tag:1,seen:1,ev:1,evw:e};MB.L.push(m);MB.evw=(MB.evw||[]).concat([m]);return true}}
function mobEnter(e,c,x,y){const p={c,mob:1,ev:e,x,y,st:"peek",dir:1,seat:NOSEAT,seed:Math.random()*5,path:[[3,15]],bt:0,orders:0,tp:0,rem:0,nd:0,dl:0,dt:0,wt:0,nl:["……"]};R.people.push(p)}
function mobWalkTick(dt){const W=MB.evw;if(!W||!W.length)return;MB.evw=W.filter(m=>{
 if(R.closed||R.phase!=="run"){MB.L=MB.L.filter(o=>o!==m);return false}
 if(m.evw){if(!MB.L.includes(m))MB.L.push(m);const at=m.s>0?m.y>=15:m.y<=15;if(at){MB.L=MB.L.filter(o=>o!==m);mobEnter(m.evw,m.c,WK_X,15);return false}return true}
 if(m.evc){const v=m.evc;if(!v.done){if(m.y<=v.stopY){m.y=v.stopY;m.sp=0;v.done=1;v.t=0;mobEnter(v.e,v.c,mbGeo().L-14,15)}return true}
  v.t+=dt;if(v.t>25){m.sp=22;m.ev=0;m.T=Object.assign({},m.T,{sp0:1});return false}return true}
 return false})}
{const _tk6=tick;tick=function(now){try{const n=performance.now(),dt=Math.min(.1,(n-(MB.evwN||n))/1000);MB.evwN=n;mobWalkTick(dt)}catch(e){}return _tk6.apply(this,arguments)}}

/* 停電の暗さ：店の建物の形だけ */
function darkHull(k){if(!R.dark||!k)return;R.dark._fr=R.frN;cx.save();cx.fillStyle="rgba(3,3,8,.94)";cx.beginPath();FLT.forEach(([tx,ty])=>{const pts=[];for(const x of[tx*6-1,tx*6+7])for(const y of[ty*6-1,ty*6+7])for(const z of[0,24.5])pts.push(P3(x,y,z,k));const h=mbHull(pts);h.forEach((p,i)=>i?cx.lineTo(p[0],p[1]):cx.moveTo(p[0],p[1]));cx.closePath()});cx.fill("nonzero");cx.restore()}
{const _dr=draw;draw=function(){R.frN=(R.frN||0)+1;return _dr.apply(this,arguments)}}
/* 道の側から見る時は、外を歩く人より先に暗くする（外の人は暗くならない） */
{const _au7=auraDraw;auraDraw=function(k,fg){if(fg&&R.dark)try{darkHull(k)}catch(e){}return _au7.apply(this,arguments)}}

/* ===== ゲームのイベントと店の外の景色を連動 ===== */
/* 起きたイベントをその日の記録に */
{const _er=evRec;evRec=function(e){const r=_er.apply(this,arguments);try{const t=td();t.evs=t.evs||[];t.evs.push(e.id);if(e.t==="run")xsRun(e.id)}catch(err){}return r}}
/* 場面（いくつでも同時に出せる） */
MB.xs=MB.xs||[];
function xsEnt(q,i){const g=mbGeo(),L=g.L,Ym=15;let m=null;
 if(q.c){const base=xvT(q.c);if(!base)return null;const T=q.fl?xFlash(base):base,s=q.lane;m={T,s,lane:s,x:s>0?L-28:L-20,y:Ym+q.y,a:3+i,t:Math.random()*3,sp:0,tag:1,seen:1,ev:1,q}}
 else if(q.o){m={T:xObjT(q.o,q.col),s:1,x:L+q.x,y:Ym+q.y,a:1,t:Math.random()*3,sp:0,tag:1,seen:1,ev:1,q}}
 else if(q.p){m={T:Object.assign({},XEVT.per,{pp:q.pp}),c:xLook(q.lk),s:1,x:L+q.x,y:Ym+q.y,a:1,t:0,sp:0,tag:1,seen:1,ev:1,dd:q.dd,q,face:1}}
 return m}
function xsStart(sc){if(!mbOn())return;const S={sc,t0:R.t,ents:[]};sc.parts.forEach((q,i)=>{const m=xsEnt(q,i);if(m){S.ents.push(m);MB.L.push(m)}});MB.xs.push(S)}
function xsTick(){if(!MB.xs.length)return;MB.xs=MB.xs.filter(S=>{const f=(R.t-S.t0)/S.sc.dur;S.ents.forEach(m=>{if(!MB.L.includes(m)&&!m.gone)MB.L.push(m)});if(f>=1||R.phase!=="run"){S.ents.forEach(m=>{if(!m.gone)xLeave(m)});return false}return true})}
/* 歩いて来て入口で少し止まり、帰っていく人（家主さん・営業さんなど） */
MB.vw=MB.vw||[];
function xsVisit(lk,pp,stay,talk){if(!mbOn())return;const side=Math.random()<.5?1:-1,m={T:Object.assign({},XEVT.per,{pp}),c:xLook(lk),s:side,x:WK_X,y:15-side*55,a:1,t:0,sp:10,tag:1,seen:1,ev:1,vw:{ph:0,stay:stay||4,talk}};MB.L.push(m);MB.vw.push(m)}
function xsVisitTick(dt){if(!MB.vw.length)return;MB.vw=MB.vw.filter(m=>{if(R.phase!=="run"){MB.L=MB.L.filter(o=>o!==m);return false}if(!MB.L.includes(m))MB.L.push(m);const v=m.vw;
 if(v.ph===0){if(m.s>0?m.y>=15:m.y<=15){m.y=15;m.sp=0;m.dd=1;v.ph=1;v.t=0;if(v.talk)try{say(OW,v.talk)}catch(e){}}}
 else if(v.ph===1){v.t+=dt;if(v.t>=v.stay){v.ph=2;m.dd=null;m.ev=0;m.sp=10;m.face=0;return false}}
 return true})}
/* 歩道から入口に入っていく動物（子猫） */
function xsWalkIn(T){if(!mbOn())return;const side=Math.random()<.5?1:-1,m={T,s:side,x:WK_X+2,y:15-side*45,a:1,t:0,sp:4,tag:1,seen:1,ev:1,wi:1};MB.L.push(m);MB.wi=(MB.wi||[]).concat([m])}
function xsWalkInTick(dt){const W=MB.wi;if(!W||!W.length)return;MB.wi=W.filter(m=>{if(!MB.L.includes(m))return false;if(m.wi===1&&(m.s>0?m.y>=15:m.y<=15)){m.wi=2;m.y=15;m.sp=0}if(m.wi===2){m.x+=dt*5;if(m.x>=-1){MB.L=MB.L.filter(o=>o!==m);return false}}return true})}
/* セミ：道の上から飛んできて店に入る */
const XSEMI={id:"__semi",n:"",k:"ped",cat:1,sp0:1,l:4,mk:(a,t)=>{const f=Math.sin((t||0)*40)>0;return[[-.4,1,0,.8,1.6,.6,"#5d4037"],[-.2,2.4,.2,.4,.4,.4,"#3e2723"],[-1.2,1.2,.6,.8,1.2,.1,f?"#cfd8dc":"#90a4ae"],[.4,1.2,.6,.8,1.2,.1,f?"#cfd8dc":"#90a4ae"]]}};
function xsSemi(){if(!mbOn())return;const g=mbGeo(),m={T:XSEMI,s:1,ax:1,zo:9,x:g.L-30,y:15,a:1,t:0,sp:9,tag:1,seen:1,ev:1,x0:g.L-60,x1:g.L+4,semi:1};MB.L.push(m);MB.sm=m}
function xsSemiTick(){const m=MB.sm;if(!m)return;if(!MB.L.includes(m)){MB.sm=null;return}m.zo=9+Math.sin(m.t*6)*1.2;if(m.x>=-1){MB.L=MB.L.filter(o=>o!==m);MB.sm=null}}
/* 場面の中身 */
const XSC={
 sumi:{dur:40,parts:[XC("ktr",-1,-6),XPp(-12,-2,1,LK("男性",["#455a64"],5,["#455a64"],{acc:2}),["box"]),XOb("dbox",-4,-6)]},
 shuzai:{dur:60,parts:[XPp(-16,-4,1,LK(null,["#455a64"],5,["#3b3b4a"],{acc:2}),["cam"]),XPp(-12,4,1,LK(null,["#fafafa"],2,["#263238"]),["clip"])]},
 shobo:{dur:40,parts:[XC("fire",-1,-8,{fl:1}),XPp(-11,-2,1,fff,["helm:#fafafa","clip"]),XPp(-11,4,1,fff,["helm:#fafafa"])]},
 akisu:{dur:60,parts:[XC("police",-1,-4,{fl:1}),XPp(-11,0,1,pol,["clip"])]},
 shuri:{dur:90,parts:[XC("wagon",-1,-6),XPp(-12,-2,1,LK("男性",["#1565c0"],0,["#1565c0"],{acc:2}),["box2"])]},
 bazu:{dur:180,parts:onl(5,-11,-8).map((p,i)=>Object.assign(p,{dd:1,pp:["phone"]}))}};
/* 営業中のイベント */
function xsRun(id){if(id===16)xsSemi();else if(id===12)setTimeout(()=>{try{if(R.phase==="run")xsStart(XSC.shuri)}catch(e){}},4000);else if(id===46){td().mixT=R.t+90}}
/* 開店前のイベント：シャッターが開いたら外で見せる */
function xsOpen(){const t=td(),E=t.evs||[];if(t.xsDone)return;t.xsDone=1;
 E.forEach(id=>{if(id===1||id===28)xsStart(XSC.sumi);else if(id===8)xsVisit(LK(null,["#8d6e63"],5,["#5d4037"],{acc:17}),["bag:#fafafa"],5,"いつもありがとうございます〜");else if(id===13)xsVisit(LK(null,["#263238"],2,["#263238"]),["suitcase"],5,"新作ですか？見せてください！");
  else if(id===41)xsVisit(null,["box2"],4,"お土産！ありがとう！");else if(id===14)xsStart(XSC.shuzai);else if(id===23)xsStart(XSC.shobo);else if(id===33)xsStart(XSC.akisu);else if(id===34)xsStart(XSC.bazu);
  else if(id===45)xsWalkIn(xvT("neko")?Object.assign({},xvT("neko"),{sp0:1,id:"__kitten"}):XSEMI)})}
{const _ce2=cineEnd;cineEnd=function(){const k=R.cine&&R.cine.k;const r=_ce2.apply(this,arguments);try{if(R.phase==="run")xsOpen()}catch(e){}return r}}
{const _st8=start;start=function(){const r=_st8.apply(this,arguments);try{build();BGK="";if(R.phase==="run"&&!R.cine)xsOpen()}catch(e){}return r};$("#go").onclick=start}
{const _tk8=tick;tick=function(now){try{const n=performance.now(),dt=Math.min(.1,(n-(MB.xsN||n))/1000);MB.xsN=n;xsTick();xsVisitTick(dt);xsWalkInTick(dt);xsSemiTick()}catch(e){}return _tk8.apply(this,arguments)}}
/* 常連が友達を連れてきた：友達は歩道を歩いてくる */
/* ミックス大当たり：通る人が匂いにつられて立ち止まる／寒波・大雪：人が少なく、みんな上着 */
{const _sp9=mbSpawn;mbSpawn=function(){const t=td(),cold=(t.evs||[]).some(i=>i===18||i===32);if(cold&&Math.random()<.5)return;const n0=MB.L.length;const r=_sp9.apply(this,arguments);try{const mix=t.mixT&&R.t<t.mixT;for(let i=n0;i<MB.L.length;i++){const m=MB.L[i];if(m.T.k==="ped"&&!m.T.cat&&m.x>mbGeo().L-14){if(mix&&Math.random()<.6)m.pk=true;if(cold)m.cold=1}}}catch(e){}return r}}
{const _ml2=mbLook;mbLook=function(t,a){const c=_ml2.apply(this,arguments);try{const ev=td().evs||[];if(ev.includes(18)||ev.includes(32)){c.top=5;c.shirt=["#263238","#4e342e","#37474f","#1a237e","#212121"][Math.floor(Math.random()*5)];c.bot=c.bot===1?0:c.bot;if(Math.random()<.5)c.acc=3}}catch(e){}return c}}
/* ずっと置いておくもの（花・花輪・足場・雪）：建物と一緒に作る */
function xsStatic(a){const L=Math.min(...FLT.map(t=>t[0]))*6,ys=FLT.map(t=>t[1]),B=(Math.max(...ys)+1)*6,T0=Math.min(...ys)*6,P=(x,y,z,c,s)=>a.push([x,y,z,c,undefined,s||.5]);
 const stand=(x,y,c1,c2)=>{for(let z=0;z<6;z+=.5){P(x,y,z,"#8d6e63");P(x+1.5,y,z,"#8d6e63")}for(let yy=-1.5;yy<=1.5;yy+=.5)for(let z=6;z<10;z+=.5){const d=Math.hypot(yy,z-8);if(d<=2)P(x+.75,y+yy,z,d<.8?"#fff59d":((yy*2+z*2)%3<1?c2:c1))}for(let z=5;z<7;z+=.5)P(x+.75,y,z,"#fafafa")};
 if((G.flw||0)>=G.day){stand(L-3.2,9.5,"#f48fb1","#fafafa");stand(L-3.2,20.5,"#ce93d8","#fff59d")}
 if((G.rvl||0)>=G.day){for(let i=0;i<4;i++)stand(L-41,T0+2+i*5,["#f48fb1","#fff59d","#90caf9","#ce93d8"][i],"#fafafa")}
 const nz=(evx().noise||0)>G.day;if(nz){const y0=B+.5;for(let x=L-1;x<L+12;x+=3)for(let z=0;z<24;z+=.5)P(x,y0,z,"#9e9e9e");for(let z=4;z<24;z+=6)for(let x=L-1;x<L+12;x+=.5){P(x,y0,z,"#9e9e9e");P(x,y0+.5,z-.5,"#c8a165")}}
}

/* お花・花輪・苦情の工事は数日続く */
{const _er2=evRec;evRec=function(e){const r=_er2.apply(this,arguments);try{if(e.id===20)G.flw=G.day+2;if(e.id===26)G.rvl=G.day+4;setTimeout(()=>{try{build();BGK=""}catch(_){}},50)}catch(err){}return r}}
/* 花火大会：夜空に花火 */
{const _db4=drawBG;drawBG=function(k){const r=_db4.apply(this,arguments);try{if(R.phase==="run"&&(td().evs||[]).includes(38)&&mbHr()>=19&&mbHr()<23.5){const T=performance.now()/1000,g=mbGeo();cx.save();cx.globalCompositeOperation="lighter";for(let i=0;i<4;i++){const ph=(T*.45+i*.27)%1,sd=Math.floor(T*.45+i*.27)*7+i*13,cxp=P3(g.L-90-(sd%5)*12,15+((sd*37)%90)-45,70+(sd%4)*10,k),cl=["#ff5252","#ffd740","#40c4ff","#e040fb","#69f0ae"][sd%5],rad=k.s*(4+ph*16);cx.globalAlpha=Math.max(0,1-ph*1.1);cx.fillStyle=cl;for(let j=0;j<18;j++){const a=j/18*Math.PI*2;cx.beginPath();cx.arc(cxp[0]+Math.cos(a)*rad,cxp[1]+Math.sin(a)*rad,Math.max(1.2,k.s*.45),0,7);cx.fill()}}cx.restore()}}catch(e){}return r}}


/* ===== イベントは良いもの7割・悪いもの3割 ===== */
{const _ep=evPick;evPick=function(tp){try{const L=EV.filter(e=>e.t===tp&&e.id!==31&&!(e.once&&(G.evDex||{})[e.id])&&(!e.ok||e.ok()));if(!L.length)return null;const good=L.filter(e=>GA_GOOD.includes(e.id)),bad=L.filter(e=>!GA_GOOD.includes(e.id));let P=Math.random()<.7?good:bad;if(!P.length)P=good.length?good:bad;let s=P.reduce((a,e)=>a+EVW[e.r],0)*Math.random();for(const e of P){s-=EVW[e.r];if(s<=0)return e}return P[P.length-1]}catch(e){return _ep.apply(this,arguments)}}}

/* ===== 雪の日は街が白くなる（大雪イベントの日はさらに） ===== */
function snowLv(){if(R.snowF!=null)return R.snowF;try{if(R.vis)return 0;const w=(G.wx&&G.wx[G.wd])||"";const big=(td().evs||[]).includes(32);if(big)return 1;return w==="snow"?.78:0}catch(e){return 0}}
const SNW="#f3f6fa";
{const _dv=dvb;dvb=function(b,k){const r=_dv.apply(this,arguments);try{const lv=snowLv();if(lv>0&&b.h>.3&&b.z+b.h>.5){const o=P3(b.x,b.y,b.z,k),EX=[k.exx*b.w,k.exy*b.w],EY=[k.eyx*b.d,k.eyy*b.d],EZ=[0,k.ezy*b.h],p=[o[0]+EZ[0],o[1]+EZ[1]];cx.save();cx.globalAlpha=Math.min(1,.55+lv*.45);poly([[p[0],p[1]],[p[0]+EX[0],p[1]+EX[1]],[p[0]+EX[0]+EY[0],p[1]+EX[1]+EY[1]],[p[0]+EY[0],p[1]+EY[1]]],SNW);cx.restore()}}catch(e){}return r}}
{const _d0=drawScn0;drawScn0=function(k){const lv=snowLv();if(!lv)return _d0.apply(this,arguments);const sv=GRD.map(g=>g.c),sb=GRD.base;try{const road=c=>{const n=parseInt(String(c).slice(1),16);if(isNaN(n))return false;return((n>>16)+(n>>8&255)+(n&255))/3<110};GRD.forEach(g=>{g.c=mixc(g.c,SNW,road(g.c)?(lv>=1?.82:.5):(lv>=1?.95:.85))});GRD.base=mixc(GRD.base||"#8d8d8d",SNW,lv>=1?.95:.85);
 const r=_d0.apply(this,arguments);
 /* タイヤの跡 */const gg=mbGeo();cx.save();cx.globalAlpha=lv>=1?.35:.55;[gg.L-28,gg.L-20].forEach(xc=>[-2.4,1.6].forEach(dx=>{poly([P3(xc+dx,gg.Y0-200,0,k),P3(xc+dx+.9,gg.Y0-200,0,k),P3(xc+dx+.9,gg.Y1+200,0,k),P3(xc+dx,gg.Y1+200,0,k)],"#6b7078")}));cx.restore();return r}finally{GRD.forEach((g,i)=>{g.c=sv[i]});GRD.base=sb}}}
/* 外観モードの屋上も白く・大雪の日は歩道のふちに雪の山 */
{const _xm=extMod;extMod=function(a){const r=_xm.apply(this,arguments);try{if(R.ext&&snowLv()>0)a.forEach(v=>{if(v[2]>=24&&!v[4])v[3]=SNW})}catch(e){}return r}}
{const _xst=xsStatic;xsStatic=function(a){const r=_xst.apply(this,arguments);try{if(snowLv()>=1){const g=mbGeo(),P=(x,y,z,s)=>a.push([x,y,z,SNW,undefined,s]);for(const xc of[g.L-16,g.L-34.5])for(let y=Math.floor(g.Y0/2)*2;y<g.Y1;y+=2){const hh=(Math.sin(y*.9+xc)+1)/2;P(xc,y,0,2);if(hh>.45)P(xc+.5,y+.5,1,1);if(hh>.8)P(xc+.75,y+.75,2,.5)}}}catch(e){}return r}}

/* 大雪の日は吹雪っぽく：粒を増やして斜めに、うっすら白くかすむ */
{const _dr3=draw;draw=function(){const r=_dr3.apply(this,arguments);try{if(R.vis)return r;const t=td();if(!(t.snow||(t.evs||[]).includes(32)))return r;const T=performance.now()/1000;cx.save();cx.setTransform(dpr,0,0,dpr,0,0);cx.fillStyle="rgba(240,244,250,.16)";cx.fillRect(0,0,W,CH);cx.fillStyle="rgba(255,255,255,.9)";for(let i=0;i<140;i++){const sz=.9+(i%5)*.55,sp=40+(i%7)*9,x=((i*53+T*(60+(i%4)*15))%(W+60))-30,y=(i*97+T*sp)%(CH+20)-10;cx.beginPath();cx.arc(x,y,sz,0,7);cx.fill()}cx.restore()}catch(e){}return r}}

/* ===== 吹き出しの顔（図鑑の顔を小さく） ===== */
const BFC={};let BFN=0;
function bubFace(p){try{const c=p===OW?OW.c:p.c;if(!c||p===R.cat)return null;if(p!==OW&&(c.mob||c.i==null||c.i>=9000||!c.met))return null;const k=p===OW?"ow":c.i;if(BFC[k]!==undefined)return BFC[k]||null;if(BFN>=2)return null;BFN++;
 let cv=document.getElementById("fcache");if(!cv){cv=document.createElement("canvas");cv.id="fcache";cv.width=cv.height=120;cv.style.display="none";document.body.appendChild(cv)}drawFace("#fcache",c);const g=cv.getContext("2d"),im=g.getImageData(0,0,120,120),a=im.data;for(let q=0;q<a.length;q+=4)if(Math.abs(a[q]-239)<3&&Math.abs(a[q+1]-230)<3&&Math.abs(a[q+2]-218)<3)a[q+3]=0;g.putImageData(im,0,0);const o=document.createElement("canvas");o.width=o.height=60;o.getContext("2d").drawImage(cv,0,0,60,60);BFC[k]=o;return o}catch(e){BFC[p===OW?"ow":(p.c&&p.c.i)]=0;return null}}
{const _dr4=draw;draw=function(){BFN=0;return _dr4.apply(this,arguments)}}

/* ===== 換気扇を買い足す（最大4台）：台数で煙の抜け方と換気ボタンが強くなる ===== */
const FANP=[0,0,300000,800000,2000000],FAND=[0,.012,.03,.05,.08],FANS=[0,.1,.12,.14,.16],FANV=[0,30,30,35,40],FANC=[0,20,15,12,10],FANN=[0,4,10,16,26];
function fanN(){const k=G.at2?"fans2":"fans";return Math.max(1,Math.min(4,G[k]||1))}
const fanD=()=>FAND[fanN()],fanS=()=>FANS[fanN()],fanV=()=>FANV[fanN()],fanC=()=>FANC[fanN()];
/* 壁の上の方に換気扇・外観では屋上にダクト */
function fanVox(a){const n=fanN(),xs=FLT.map(t=>t[0]),ys=FLT.map(t=>t[1]),x0=Math.min(...xs)*6,x1=(Math.max(...xs)+1)*6,y0=Math.min(...ys)*6,y1=(Math.max(...ys)+1)*6,P=(x,y,z,c,t)=>a.push([x,y,z,c,t,.5]);
 for(let i=0;i<n;i++){const cxp=x0+(x1-x0)*(i+1)/(n+1);for(let dx=-1.5;dx<1.5;dx+=.5)for(let z=20;z<23;z+=.5){const e=dx<-1||dx>=1||z<20.5||z>=22.5,mid=Math.abs(dx+.25)<.3||Math.abs(z+.25-21.5)<.3;P(cxp+dx,y0,z,e?"#9e9e9e":mid?"#cfd8dc":"#37474f",1)}}
 if(R.ext){for(let i=0;i<n;i++){const xx=x0+4+i*((x1-x0-8)/Math.max(1,n-1||1)),yy=y1-4;box(a,Math.round(xx),yy,25,1,1,3,"#b0bec5");box(a,Math.round(xx),yy-2,28,1,3,1,"#b0bec5");box(a,Math.round(xx),yy-2,26,1,1,2,"#b0bec5");box(a,Math.round(xx)-.5|0,yy-3,25,2,2,1,"#90a4ae")}}}
/* 装飾タブに「換気扇」 */
{const _rd2=rdeco;rdeco=function(){const r=_rd2.apply(this,arguments);try{const gl=document.querySelector('[data-dc="gl"]')||document.querySelector('[data-dc="wl"]');if(gl&&!document.querySelector('[data-dc="fan"]'))gl.insertAdjacentHTML("afterend",'<button data-dc="fan">🌀 換気扇</button>');
 let sec=$("#sec-fan");const card=$("#sec-gl")||$("#sec-clr");if(!sec&&card){sec=document.createElement("div");sec.id="sec-fan";card.parentNode.insertBefore(sec,card.nextSibling)}const c=R.dcat||"obj";if(sec){sec.hidden=c!=="fan";if(c==="fan"){const n=fanN(),nx=n+1;sec.innerHTML=`<div class="m" style="font-size:12px;margin:8px 0 4px">換気扇 <b>${n}台</b>（最大4台）</div><div style="font-size:12.5px;line-height:1.7;background:rgba(123,79,208,.07);border-radius:10px;padding:8px 10px">換気しなくても快適な人数の目安：<b>約${FANN[n]}人</b><br>換気ボタン：<b>${FANV[n]}分</b>効く・次まで<b>${FANC[n]}分</b></div>`+(n<4?`<div style="font-size:12.5px;margin-top:8px">${nx}台にすると → 目安 約${FANN[nx]}人・換気${FANV[nx]}分／待ち${FANC[nx]}分</div><div id="fanbuy" style="display:flex;gap:6px;margin-top:6px"><button id="fanb" class="on" style="flex:1">${nx}台目を付ける（${yen(FANP[nx])}）</button></div>`:`<div style="font-size:12.5px;margin-top:8px">これ以上は付けられません</div>`)+(G.s2?`<div style="font-size:11px;color:var(--mut);margin-top:6px">※2号店の換気扇は2号店で付けます</div>`:"")}}}catch(e){}return r}}
document.addEventListener("click",e=>{if(!e.target.closest)return;const b=e.target.closest("#fanb,#fanok,#fanno");if(!b)return;e.stopPropagation();const box=$("#fanbuy");if(!box)return;const n=fanN(),nx=n+1;
 if(b.id==="fanb"){box.innerHTML=`<button id="fanno" style="flex:1">やめる</button><button id="fanok" class="on" style="flex:1">${yen(FANP[nx])}で付ける</button>`;return}
 if(b.id==="fanno"){rdeco();return}
 if(b.id==="fanok"){if(nx>4)return;if(G.money<FANP[nx]){try{log("お金が足りません");toast("💸 お金が足りません")}catch(_){}return}G.money-=FANP[nx];G[G.at2?"fans2":"fans"]=nx;log("🌀 換気扇を"+nx+"台にした（−"+yen(FANP[nx])+"）");try{toast("🌀 換気扇を"+nx+"台にしました")}catch(_){}save();build();BGK="";hud();rdeco()}},true);
/* 店長の見た目を変えたら吹き出しの顔も作り直す */
{const _ao=applyOwLook;applyOwLook=function(){const r=_ao.apply(this,arguments);try{delete BFC.ow}catch(e){}return r}}
;(function(){const app=$("#app"),sh=document.createElement("div");sh.id="sheet";sh.innerHTML='<div class="grab"></div>';
const top=$("#top"),cvw=$(".cvw"),atm=$("#atm");[...app.children].forEach(el=>{if(el.classList.contains("tabs")||/^p-/.test(el.id))sh.appendChild(el)});app.appendChild(sh);{const dd=$("#dd");if(dd)document.body.appendChild(dd)}
const setv=()=>{document.documentElement.style.setProperty("--th",top.offsetHeight+"px");document.documentElement.style.setProperty("--bh",$("#bar").offsetHeight+"px")};setv();setTimeout(setv,300);setTimeout(setv,1200);window.addEventListener("resize",setv);
$("#menu").onclick=()=>sh.classList.toggle("open");sh.querySelector(".grab").onclick=()=>sh.classList.remove("open")})();
