/* ===== UI ===== */
for(let h=12;h<=22;h++)$("#op").add(new Option(h+":00",h));for(let h=16;h<=29;h++)$("#cl").add(new Option((h%24)+":00"+(h>=24?"（翌）":""),h));
$("#op").value=G.open;$("#cl").value=G.close;
$("#op").onchange=()=>{G.open=+$("#op").value;if(G.close<G.open+3){G.close=G.open+3;$("#cl").value=G.close}save();hud();rhrs()};
$("#cl").onchange=()=>{G.close=Math.max(+$("#cl").value,G.open+3);$("#cl").value=G.close;save();rhrs()};
function rhrs(){const e=$("#hrsi");if(!e||!G.ow)return;const h=hrsNow(),m=hrsMot();e.innerHTML=`営業 <b>${h}時間</b>：光熱費 月<b>${yen(utilNow())}</b>${G.close>24?"<br>0時以降は疲れて、美味しい一本が出にくくなります":""}`}
try{rhrs()}catch(e){}
$("#go").onclick=start;
const camReset=()=>{R.cam.yaw=-.6;R.cam.pit=.92;R.cam.zoom=1;R.camVer++};
document.addEventListener("click",e=>{if(!$("#dd").hidden&&!e.target.closest("#dd")&&!e.target.closest("[data-c]")){R.sel=-1;rdex();return}const b=e.target.closest("button");if(!b)return;if(b.id==="dxx"){R.sel=-1;rdex();return}
if(b.id==="cr")camReset();
if(b.dataset.mk){if(b.dataset.mk==="rand"){const e=R.mkE;R.mk=mkRand();R.mkE=-1;rmk()}else{mkYaw+=b.dataset.mk==="L"?-.5:.5;prevC()}}
if(b.id==="mkok")mkSave();
if(b.id==="mkx")mkExport();
if(b.dataset.ow){mkYaw+=b.dataset.ow==="L"?-.5:.5;prevO()}
if(b.dataset.owedit)showOwEdit();
if(b.id==="owok"){const n=mkOwFromForm(),o=G.ow;Object.assign(o,{shop:n.shop,name:n.name,age:n.age,sex:n.sex,eye:n.eye||0,hs:n.hs,hair:n.hair,skin:n.skin,shirt:n.shirt,acc:n.acc,accC:n.accC,top:n.top,bot:n.bot,pants:n.pants,h2:n.h2,t2:n.t2,b2:n.b2});R.od=null;applyOwLook();save();ovOff();rown();if(G.last&&!G.last.seen)showResult()}
if(b.id==="vent")ventNow();
if(b.id==="own0"){G.ow=mkOwFromForm();R.od=null;applyOwLook();save();ovOff();rown();if(G.last&&!G.last.seen)showResult();else showMorning()}
if(b.dataset.o)act(b.dataset.o);
if(b.id==="devreset"){if(b.dataset.arm){try{localStorage.removeItem("shisha_v1");localStorage.removeItem("shisha_v2")}catch(_){}location.reload()}else{b.dataset.arm=1;b.textContent="本当にリセット？もう一度押すと全データが消えます"}}
if(b.id==="start0"){G.loc=locRead();build();G.ow=mkOwFromForm();R.od=null;applyOwLook();G.setup=true;if((G.tut||0)<1)G.tut=1;G.loan.pay=+$("#pay").value;save();ovOff();rfin();hud();showMorning();log("開業しました！ドリンクメニューを選んで営業開始。")}
if(b.id==="nextm")nextMonth();
if(b.dataset.x)toggleX(b.dataset.x);
if(b.id==="exok")0;
if(b.id==="reset0"){try{localStorage.removeItem("shisha_v1");localStorage.removeItem("shisha_v2")}catch(_){}location.reload()}
if(b.dataset.s!==undefined){R.speed=+b.dataset.s;document.querySelectorAll("[data-s]").forEach(x=>x.classList.toggle("on",x===b))}
if(b.dataset.mn)toggleMenu(b.dataset.mn);
if(b.dataset.t){if(R.phase==="run"&&b.dataset.t!=="shop")return;setTab(b.dataset.t)}
if(b.dataset.fc!==undefined||b.dataset.wc!==undefined){const fl=b.dataset.fc!==undefined,i=+(fl?b.dataset.fc:b.dataset.wc),cur=fl?(G.fcl||0):(G.wcl||0);clrPrev(fl,i===cur?null:i)}
if(b.dataset.d){R.tool=R.tool===b.dataset.d?null:b.dataset.d;if(R.tool){const sh=$("#sheet");if(sh)sh.classList.remove("open")}if(G.dnew&&G.dnew.includes(b.dataset.d)){G.dnew=G.dnew.filter(q=>q!==b.dataset.d);save();decBadge()}rdeco()}
if(b.id==="rm"){mvToggle()}
if(b.dataset.dxm){R.dxm=b.dataset.dxm;rdex()}if(b.dataset.c!==undefined){R.sel=+b.dataset.c;rdex()}});
document.addEventListener("input",e=>{const ok=e.target.dataset&&e.target.dataset.ok;if(ok&&R.od){const c=R.od,v=e.target.value;if(ok==="name")c.name=v;else if(ok==="age")c.age=clamp(+v||28,18,80);else if(ok==="sex")c.sex=+v?"女性":"男性";else if(ok==="hs"||ok==="top"||ok==="bot"){const n=+v,m={hs:"h2",top:"t2",bot:"b2"}[ok];if(n>=100)c[m]=n-99;else{c[m]=0;c[ok]=n}}else if(["acc","eye"].includes(ok))c[ok]=+v;else c[ok]=v;prevO();return}
const k=e.target.dataset&&e.target.dataset.k;if(k&&R.mk){mkRead(k,e.target);prevC()}});
document.addEventListener("change",e=>{if(e.target.id==="mkE"){R.mkE=+e.target.value;R.mk=R.mkE>=0?Object.assign({},G.cs[R.mkE],{ap:Object.assign({},G.cs[R.mkE].ap),ls:[...(G.cs[R.mkE].ls||[]),"","",""].slice(0,3)}):mkRand();rmk()}});
/* ===== カメラ操作：ドラッグ回転・ピンチ/ホイールで拡大縮小・タップで会話/設置 ===== */
const ptr=new Map();let mv=0,pd=0;
const pdist=()=>{const a=[...ptr.values()];return Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y)};
cv.addEventListener("pointerdown",e=>{if(e.isPrimary)ptr.clear();try{const sl=window.getSelection&&window.getSelection();if(sl&&sl.removeAllRanges)sl.removeAllRanges()}catch(_){}try{cv.setPointerCapture(e.pointerId)}catch(_){}ptr.set(e.pointerId,{x:e.clientX,y:e.clientY});if(ptr.size===1)mv=0;if(ptr.size===2){mv=99;pd=pdist()}});
cv.addEventListener("pointermove",e=>{const p=ptr.get(e.pointerId);if(!p)return;const dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;
if(ptr.size===1){mv+=Math.abs(dx)+Math.abs(dy);if(mv>12){R.cam.yaw+=dx*.008;if(R.ext)R.cam.yaw=clamp(R.cam.yaw,EXT_Y-1.1,EXT_Y+1.1);R.cam.pit=clamp(R.cam.pit+dy*.006,R.ext?.08:.2,R.ext?.7:1.45);R.camVer++}}
else if(ptr.size===2){const d=pdist();if(pd>0)R.cam.zoom=clamp(R.cam.zoom*d/pd,.5,3.5);pd=d}});
const pend=e=>{const tap=ptr.size===1&&mv<=12&&e.type==="pointerup";ptr.delete(e.pointerId);if(tap)onTap(e.clientX,e.clientY)};
cv.addEventListener("pointerup",pend);cv.addEventListener("pointercancel",pend);cv.addEventListener("lostpointercapture",e=>ptr.delete(e.pointerId));if(window.addEventListener){window.addEventListener("pointerup",e=>ptr.delete(e.pointerId));window.addEventListener("blur",()=>ptr.clear())}
cv.addEventListener("wheel",e=>{e.preventDefault();R.cam.zoom=clamp(R.cam.zoom*Math.exp(-e.deltaY*.001),.5,3.5)},{passive:false});
function onTap(clx,cly){const r=cv.getBoundingClientRect(),X=(clx-r.left)*W/r.width,Y=(cly-r.top)*CH/r.height;if(!R.cv){try{draw()}catch(_){}}const k=R.cv;if(!k)return;
if(R.mvOn){mvTap(X,Y,k);return}
if(R.tab==="deco"){const isW=R.tool&&R.tool.startsWith("wp_");if(isW||R.tool==="rm"){let bw=null,bd=1e9;WS.forEach(w=>{if(!wallVis(w.s,k))return;const q=P3(w.c[0],w.c[1],w.c[2],k),d=Math.hypot(q[0]-X,q[1]-Y);if(d<bd){bd=d;bw=w}});const lim=Math.max(24,k.s*3.5);
if(bw&&bd<lim){if(isW){wallPlace(bw);return}const i=(G.wall||[]).findIndex(d=>d.k===bw.k);if(i>=0){wallPlace(bw);return}}else if(isW){log("壁（壁アイテムを付けたい場所）をタップしてください");return}}
const f=floorAt(X,Y,k);place(Math.floor(f[0]/6),Math.floor(f[1]/6));return}
let best=null,bd2=1e9;const hw=Math.max(14,k.s*1.9),cand=[];R.people.concat([OW]).forEach(p=>{if(!(p.x>-100))return;const sit=p.seat&&(p.st==="sit"||p.st==="drink"),f=P(p.x,p.y,0),h=P(p.x,p.y,sit?9.5:11.5),lo=Math.min(f[1],h[1]),hi=Math.max(f[1],h[1]),ty=Math.max(lo,Math.min(hi,Y)),tx=f[0]+(h[0]-f[0])*((ty-f[1])/((h[1]-f[1])||1)),d=Math.hypot(X-tx,Y-ty);if(d<hw)cand.push([f[1],p]);const q=P(p.x,p.y,7),d2=Math.hypot(q[0]-X,q[1]-Y);if(d2<bd2){bd2=d2;best=p}});if(cand.length){cand.sort((a,b)=>b[0]-a[0]);best=cand[0][1];bd2=0}
if(best&&bd2<Math.max(28,k.s*6))(best===OW?ownerTalk():talk(best))}
function ownerTalk(){if(!G.ow)return;const nw=performance.now();R.admN=nw-(R.admT||0)<1500?(R.admN||0)+1:1;R.admT=nw;if(R.admN>=10){R.admN=0;admPanel();return}say(OW,ownThought())}
applyOwLook();build();ratm();rfr();rfin();log("店を開く準備をしよう。ドリンクメニューを選んで、装飾を整えて「営業開始」！");
setTimeout(()=>{if(!G.setup)showSetup();else if(!G.loc)showLoc();else if(!G.ow)showOwner();else if(G.last&&!G.last.seen)showResult();else showMorning();},0);
requestAnimationFrame(tick);

/* 1日の営業終了：今日のログをポップアップ */
function showDayLog(dl,s){const st=(a,b)=>`<div style="background:var(--bg);border-radius:10px;padding:6px 8px"><div class="m" style="font-size:11px">${a}</div><b>${b}</b></div>`;
const tn=(G.tut>=3&&G.tut<99&&!G.tutD1&&(G.month||0)===0&&(G.day||0)<=2)?(G.tutD1=1,save(),`<div class="tutin">🔰 初日の営業おつかれさま！集客はいかがでしたか？<br>${s.visits>=3?"いい調子です！この調子で常連さんを増やしていこう。":"イマイチだったら、置物をもっと置いたり、SNSを更新したりしてみよう！"}</div>`):"";
ov(`<div class="card">${tn}<b>🌙 今日の営業おつかれさま</b><div class="grid" style="grid-template-columns:repeat(3,1fr);margin:8px 0">${st("売上",yen(s.sales))}${st("来店",s.visits+"人")}${st("取り逃し",s.lost+"人")}${st("ドリンク",s.drinks+"杯")}${st("不満",s.miss+"件")}${st("味",s.q?"😋"+s.q[2]+" 😐"+s.q[1]+" 😖"+s.q[0]:"—")}</div><div class="m" style="font-size:12px;margin-bottom:4px">今日のログ（${dl.length}件）</div><div style="max-height:45vh;overflow:auto;font-size:13px;border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);padding:4px 0">${dl.length?dl.map(x=>"<div style='padding:2px 0'>"+esc(x)+"</div>").join(""):"<div class='m'>記録なし</div>"}</div><button id="dlok" class="on" style="width:100%;margin-top:10px">${G.last&&!G.last.seen?"月末の精算へ":"閉じる"}</button></div>`)}
document.addEventListener("click",e=>{const b=e.target.closest("#dlok");if(!b)return;ovOff();if(G.last&&!G.last.seen)showResult();else showMorning()});

/* 出店地域・形態の選択 */
function locFx(a,t){return[["家賃×1.2・客足×1.15","家賃×1.5・客足×1.35（新規のお客さんが多い）"],["家賃×0.8・客足×0.85（リピートしやすい）","家賃×1.0・客足×1.0"]][a===1?1:0][t===0?0:1]}
function locForm(){const l=G.loc||{a:1,t:1};return`<div class="row">出店地域 <select id="la">${LOCA.map((n,i)=>`<option value="${i}" ${l.a===i?"selected":""}>${n}</option>`).join("")}</select> 出店形態 <select id="lt">${LOCT.map((n,i)=>`<option value="${i}" ${l.t===i?"selected":""}>${n}</option>`).join("")}</select></div><div class="m" id="locfx" style="font-size:12px;margin:-2px 0 6px">📍 ${locFx(l.a,l.t)}</div>`}
function locRead(){const v=G.loc&&G.loc.v!==undefined?G.loc.v:Math.random()*NVAR|0;return{a:+$("#la").value,t:+$("#lt").value,v}}
function showLoc(){ov(`<div class="card"><b>お店の場所</b><div class="m" style="margin:6px 0">お店の外の景色が変わります。</div>${locForm()}<button id="loc0" class="on" style="width:100%;margin-top:8px">決定</button></div>`)}
document.addEventListener("change",e=>{if((e.target.id==="la"||e.target.id==="lt")&&$("#la")&&$("#lt")){G.loc=locRead();build();const fx=$("#locfx");if(fx)fx.textContent="📍 "+locFx(G.loc.a,G.loc.t)}});
document.addEventListener("click",e=>{const b=e.target.closest("#loc0");if(!b)return;G.loc=locRead();build();save();ovOff();if(!G.ow)showOwner();else if(G.last&&!G.last.seen)showResult();else showMorning()});

/* 開店前：店主の行動をポップアップで（1日1回） */
function canAct(){const o=G.ow;return!!(o&&R.phase==="prep"&&!o.acted&&G.setup&&!G.over&&!(G.last&&!G.last.seen))}
function showMorning(){if(!canAct())return;if(typeof evMorning==="function"&&evMorning())return;const snsL=(evx().sns||0)>G.day;const o=G.ow,w=WXI[G.wx[G.wd]],e=G.ev[G.wd],ty=G.wx[G.wd]==="typhoon",bt=(k,ic,t,d,ok)=>`<button data-o="${k}" ${ok?"":"disabled"} style="width:100%;text-align:left;margin-top:6px"><b>${ic} ${t}</b><small style="display:block;color:var(--mut)">${d}</small></button>`;
ov(`<div class="card"><b>🌅 開店前：今日の行動を選ぼう</b><div class="m" style="font-size:12px;margin:4px 0 8px">${MN[G.month%12]}月${WD[G.wd]}曜　${w[0]} ${w[1]}${e?"／"+esc(e.n):""}　所持金 ${moneyTxt(G.money)}</div>
<div class="grid" style="grid-template-columns:repeat(5,1fr);font-size:12px"><div>知名度<br><b>${Math.round(o.fame)}</b></div><div>スター性<br><b>${o.star}</b></div><div>技術<br><b>${sk1(o.skill)}</b></div><div>フォロワー<br><b>${o.fol.toLocaleString()}</b></div><div>やる気<br><b style="color:${(G.mot??100)>=30?"inherit":"#e53935"}">${Math.round(G.mot??100)}</b></div></div>${(G.mot??100)<30?`<div class="neg" style="font-size:12px;margin-top:6px">やる気が少なくなっています。0になると廃業です。行動したり、お客さんと話したりしよう</div>`:""}
${bt("sns","📱","SNS更新（無料）",snsL?"スマホが壊れていて更新できない（あと"+((evx().sns)-G.day)+"日）":"知名度とフォロワーが上がる。たまにバズる。更新しない日はフォロワーが減ります",!snsL)}
${bt("prac","🔥","シーシャの練習（¥500）","技術が上がって、美味しい一本が出やすくなる（"+tierTxt(o.skill)+"）",G.money>=500)}
${bt("refresh","🧖","リフレッシュ（¥1,000〜5,000）","やる気が回復する。行き先はランダム：♨️温泉 ¥1,000（小）／🧖サウナ ¥2,000（中）／💆スパ ¥5,000（大）",G.money>=1000)}
${bt("visit","🚶","他店舗へ視察（¥3,500・今日は休業・月1回）",G.vm===G.month?"今月はもう視察しました（来月また行けます）":"技術と知名度が少し上がる",G.money>=3500&&!ty&&G.vm!==G.month)}
${bt("focus","🤝","お店に集中（無料）","今日は接客に集中。話しかけで上がる親密度が1.5倍。SNSは更新しないので、フォロワーと知名度は少し減ります",true)}
<div class="m" style="font-size:12px;margin:8px 0 4px">行動は1日1回だけ。お店に集中以外の行動では、やる気も上がります。知名度やスター性が低いままだと、お客さんがほとんど来ません。</div>
</div>`);R.mOpen=1}
document.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;if(b.id==="mnskip"){ovOff();R.mOpen=0;return}
if(b.id==="arok"){ovOff();showMorning();return}
if(b.dataset.o&&R.mOpen){const o=$("#ov");if(o&&!o.hidden&&o.innerHTML.includes('今日の行動を選ぼう')){R.mOpen=0;if(R.actRes)showActRes();else{ovOff();showMorning()}}}});

/* タブ切替（営業中は営業タブのみ） */
function setTab(t){R.tab=t;if(t==="dex")G.dexSeen=G.day;document.querySelectorAll("[data-t]").forEach(x=>x.classList.toggle("on",x.dataset.t===t));["shop","deco","dex","mk"].forEach(k=>$("#p-"+k).hidden=k!==R.tab);if(R.tab==="deco")rdeco();if(R.tab==="dex")rdex();if(R.tab==="mk")rmk()}

function decBadge(){const b=document.querySelector('[data-t="deco"]');if(b)b.classList.toggle("nwdot",!!(G.dnew&&G.dnew.length))}
try{decBadge()}catch(e){}

function showMotOver(){if(typeof showOver==="function"){ovOff();showOver("mot");return}ov(`<div class="card" style="text-align:center"><div style="font-size:52px">🥀</div><b style="font-size:18px">やる気がなくなってしまった…</b><div class="m" style="margin:8px 0 12px">お客さんも少なく、話す相手もいない日が続き、店長の心が折れてしまいました。<br>お店は廃業です。</div><button id="reset0" class="on">最初からやり直す</button></div>`)}
{const _h3=hud;hud=function(){_h3();try{rhrs()}catch(e){}}}
/* ===== 客席の購入・模様替えモード ===== */
const SPLMAX=3;function splLeft(){return SPLMAX-(G.spm===G.month?G.spn||0:0)}function splUse(){if(G.spm!==G.month){G.spm=G.month;G.spn=0}G.spn++}
const seatOpen=(k,sr)=>!!G.seatU&&(sr==="tg"?!!G.tigerU:k==="bb"||s1v("exN")>=((SSER.find(q=>q.id===sr)||{u:0}).u));
const seatCond=sr=>{if(sr==="tg")return"あいことばで解禁";const u=(SSER.find(q=>q.id===sr)||{u:0}).u;return u?"増築"+u+"回目で解禁":""};
/* マスが他の物（家具・置物・入口・冷蔵庫）で使われているか。skipF／skipD は動かしている物自身 */
function tileUsed(k,skipF,skipD){if(k==="0,1"||k==="0,2")return true;if(typeof FR!=="undefined"&&(k===FR.tx+","+FR.ty||k===FR.tx+","+(FR.ty+1)))return true;
if(G.furn.some((F,i)=>i!==skipF&&furnFoot(F).includes(k)))return true;return G.decor.some((d,i)=>i!==skipD&&d.tx+","+d.ty===k)}
function furnFits(F,skip){return furnFoot(F).every(k=>FLS.has(k)&&!tileUsed(k,skip,-1))}
function decFits(tx,ty,skip){const k=tx+","+ty;return FLS.has(k)&&!tileUsed(k,-1,skip)}
/* 置物用の空きマス判定にも家具の場所を反映 */
occ=function(tx,ty){return tileUsed(tx+","+ty,-1,-1)};
/* 席の設置 */
{const _pl=place;place=function(tx,ty){if(R.tool&&String(R.tool).startsWith("st:")){const[,k,sr]=R.tool.split(":");if(!ivF()&&!seatOpen(k,sr)){log("🔒 "+seatCond(sr));return}
if(R.phase!=="prep"){log("🛋 客席は開店前に設置できます");return}if(!ivF()&&splLeft()<=0){log("🔒 今月はもう客席を"+SPLMAX+"個設置しました。来月まで待ちましょう");return}const pr=seatPrice(k,sr);if(!ivF()&&G.money<pr){(log("お金が足りません"),toast("💸 お金が足りません"));return}
let F=[{f:1},{f:-1},{f:1,o:1},{f:1,o:3}].map(q=>Object.assign({k,sr,tx,ty},q)).find(q=>furnFits(q,-1));if(!F){log(k==="b"?"3×3マスの空きが必要です":"席と、その前の1列（シーシャ台用）の空きが必要です");return}
if(ivF())ivUse();else{G.money-=pr;splUse()}G.furn.push(F);furnRebuild();log("🛋 "+seatName(F)+" を設置");R.tool=null;build();save();hud();rdeco();return}return _pl(tx,ty)}}
/* 一覧 */
function rseat(){const el=$("#sl");if(!el)return;const sp=$("#spc");if(sp)sp.innerHTML=`今月の客席の設置：あと<b>${splLeft()}</b>個（1ヶ月に${SPLMAX}個まで・置物とは別）`;
const it=(k,sr,nm,pr,op,cond)=>{const ic=op?furnIcon(k,sr):"",id="st:"+k+":"+sr;return`<button class="it dit ${R.tool===id?"on":""} ${op?"":"lock"}" ${op?`data-st="${id}"`:"disabled"}>${ic?`<img src="${ic}" alt="">`:""}<span>${nm}<small>${op?"¥"+pr.toLocaleString():"🔒 "+cond}　${SDEF[k].n}人</small></span></button>`};
let h="";SSER.forEach(s=>{const op=seatOpen("s",s.id);h+=`<div class="dgh">${op?"":"🔒 "}${s.n}${op?"":"（"+seatCond(s.id)+"）"}</div>`;["s","l","t","b","c"].forEach(k=>{h+=it(k,s.id,SDEF[k].nm,seatPrice(k,s.id),op,seatCond(s.id))})});
h+=`<div class="dgh">ビーズクッション（座ると足を伸ばしてくつろぐ・滞在が少し長くなる）</div>`;BBS.forEach(b=>{h+=it("bb",b.id,b.n,SDEF.bb.p,!!G.seatU,"")});el.innerHTML=h}
{const _rd=rdeco;rdeco=function(){_rd();const b=$("#dcseat");if(b)b.hidden=!G.seatU;const c=R.dcat||"obj",s=$("#sec-seat");if(s)s.hidden=c!=="seat";if(c==="seat")rseat()}}
document.addEventListener("click",e=>{const b=e.target.closest("[data-st]");if(!b||!b.dataset||!b.dataset.st)return;R.tool=R.tool===b.dataset.st?null:b.dataset.st;if(R.tool){mvOff();const sh=$("#sheet");if(sh)sh.classList.remove("open")}rdeco()});
/* ===== 模様替えモード ===== */
function mvOff(){R.mvs=null;R.mvT=null;const b=$("#mvbar");if(b)b.remove();if(R.mvOn)mvBar()}
function mvName(m){if(m.t==="f")return seatName(G.furn[m.i]);if(m.t==="d"){const x=DEC.find(q=>q.id===G.decor[m.i].id);return x?x.n:"置物"}const x=WP.find(q=>q.id===G.wall[m.i].id);return x?x.n:"壁アイテム"}
function mvPrice(m){if(m.t==="f"){const F=G.furn[m.i];return Math.floor(seatPrice(F.k,F.sr)/2)}if(m.t==="d"){const x=DEC.find(q=>q.id===G.decor[m.i].id);return x?x.p/2:0}const x=WP.find(q=>q.id===G.wall[m.i].id);return x?x.p/2:0}
function mvBar(){let b=$("#mvbar");if(!R.mvs&&!R.mvOn){if(b)b.remove();return}if(!b){b=document.createElement("div");b.id="mvbar";document.body.appendChild(b)}const m=R.mvs;if(!m){b.innerHTML=`<div class="tc"><b>🔧 模様替えモード</b><div class="m" style="font-size:12px">動かしたい家具・置物（<b style="color:#3a8ee6">青く光っているもの</b>）や壁アイテムをタップしてください</div><button id="mvall" style="margin-top:6px;width:100%">${R.mvAll&&R.mvAll>Date.now()?"⚠️ もう一度タップで全部しまう":(G.seatU?"📦 全部持ち物に戻す":"📦 置物と壁アイテムを全部しまう")}</button></div>`;return}
b.innerHTML=`<div class="tc"><div><b>${esc(mvName(m))}</b>${m.t==="w"?"<div class=\"m\" style=\"font-size:12px\">壁の<b style=\"color:#2e9d4f\">緑の丸</b>の区画をタップすると移動します</div>":"<div class=\"m\" style=\"font-size:12px\"><b style=\"color:#2e9d4f\">緑⇔黄色に点滅しているマス</b>をタップすると移動します</div>"}</div><div class="row">${m.t==="w"?"":`<button data-mv="rot">↻ 回転</button>`}<button data-mv="sell">📦 しまう</button><button data-mv="no">✕ やめる</button></div></div>`}
function mvDone(){furnRebuild();build();save();hud();ratm();rdeco()}
/* 壁アイテムが使う区画（貼り方と同じルール） */
function wallSlots(id,k0,skip){const x=WP.find(q=>q.id===id);if(!x)return null;let ks;if(x.b2){const k1=k0.replace(/,u$/,"");ks=[k1,wk2(k1),k1+",u",wk2(k1)+",u"]}else if(x.h2){const k1=k0.replace(/,u$/,"");ks=[k1,k1+",u"]}else if(x.w2)ks=[k0,wk2(k0)];else ks=[k0];
if(ks.some(q=>!WS.some(z=>z.k===q)))return null;if((G.wall||[]).some((d,i)=>i!==skip&&[d.k,d.k2,d.k3,d.k4].some(q=>ks.includes(q))))return null;return ks}
/* 画面上の物を拾う：足元のマス優先、なければ見た目の位置が近い物 */
function mvKeyAt(X,Y,k){const f=floorAt(X,Y,k);return[Math.floor(f[0]/6),Math.floor(f[1]/6)]}
function mvObjAt(key){const fi=G.furn.findIndex(F=>furnFoot(F).includes(key));if(fi>=0)return{t:"f",i:fi};const di=G.decor.findIndex(d=>d.tx+","+d.ty===key);if(di>=0)return{t:"d",i:di};return null}
function mvNear(X,Y,k){let best=null,bd=1e9;G.furn.forEach((F,i)=>{const ft=furnFoot(F).map(q=>q.split(",").map(Number)),cx0=ft.reduce((a,p)=>a+p[0],0)/ft.length,cy0=ft.reduce((a,p)=>a+p[1],0)/ft.length,q=P3(cx0*6+3,cy0*6+3,4,k),d=Math.hypot(q[0]-X,q[1]-Y);if(d<bd){bd=d;best={t:"f",i}}});
G.decor.forEach((d0,i)=>{const q=P3(d0.tx*6+3,d0.ty*6+3,5,k),d=Math.hypot(q[0]-X,q[1]-Y);if(d<bd){bd=d;best={t:"d",i}}});return bd<Math.max(30,k.s*4.5)?best:null}
function mvSame(a,b){return a&&b&&a.t===b.t&&a.i===b.i}
/* 選んだ物を動かせるマス（家具は置く位置の基準マス） */
function mvTargets(){const m=R.mvs,o=new Set();if(!m)return o;if(m.t==="w"){const d=G.wall[m.i];WS.forEach(w=>{if([d.k,d.k2,d.k3,d.k4].includes(w.k))return;if(wallSlots(d.id,w.k,m.i))o.add(w.k)});return o}FLS.forEach(key=>{const[tx,ty]=key.split(",").map(Number);if(m.t==="d"){if(decFits(tx,ty,m.i))o.add(key);return}
const F=G.furn[m.i],N=Object.assign({},F,{tx,ty});if(N.tx===F.tx&&N.ty===F.ty)return;if(furnFits(N,m.i)||furnFits(fFlip(N),m.i))o.add(key)});return o}
function mvSel(m){R.mvs=m;R.mvT=mvTargets();mvBar()}
function mvTap(X,Y,k){if(R.phase!=="prep"){log("🔧 模様替えは開店前だけできます");mvToggle(false);return}
/* 壁アイテム */
{let bw=null,bd=1e9;WS.forEach(w=>{if(!wallVis(w.s,k))return;const q=P3(w.c[0],w.c[1],w.c[2],k),d=Math.hypot(q[0]-X,q[1]-Y);if(d<bd){bd=d;bw=w}});const lim=Math.max(24,k.s*3.5);
 if(bw&&bd<lim){const i=(G.wall||[]).findIndex(d=>[d.k,d.k2,d.k3,d.k4].includes(bw.k)),m0=R.mvs;
 if(m0&&m0.t==="w"){if(i===m0.i){mvOff();return}if(i<0){const d=G.wall[m0.i],ks=wallSlots(d.id,bw.k,m0.i);if(!ks){log("そこには貼れません（緑の丸の区画に移動できます）");return}d.k=ks[0];delete d.k2;delete d.k3;delete d.k4;if(ks[1])d.k2=ks[1];if(ks[2])d.k3=ks[2];if(ks[3])d.k4=ks[3];log("🔧 "+mvName(m0)+" を移動");mvDone();mvSel(m0);return}}
 if(i>=0){mvSel({t:"w",i});return}}}
const[tx,ty]=mvKeyAt(X,Y,k),key=tx+","+ty,m=R.mvs,hit=FLS.has(key)?mvObjAt(key):null;
if(m&&m.t!=="w"){
 if(mvSame(hit,m)){mvOff();return}
 if(R.mvT&&R.mvT.has(key)){if(m.t==="f"){const F=G.furn[m.i],N=Object.assign({},F,{tx,ty});Object.assign(F,mvKeep(F,N,m.i));log("🔧 "+seatName(F)+" を移動")}else{G.decor[m.i].tx=tx;G.decor[m.i].ty=ty;log("🔧 置物を移動")}mvDone();mvSel(m);return}
 const o=hit||mvNear(X,Y,k);if(o&&!mvSame(o,m)){mvSel(o);return}if(o)return;log("点滅しているマスに移動できます");return}
const o=hit||mvNear(X,Y,k);if(o){mvSel(o);return}mvOff()}
/* 本体の 🔧 ボタン：開店前だけ表示。営業を始めたら終わる */
function mvToggle(on){if(on===undefined)on=!R.mvOn;if(on&&R.phase!=="prep"){log("🔧 模様替えは開店前だけできます");return}R.mvOn=on;mvOff();if(on){R.tool=null;const sh=$("#sheet");if(sh)sh.classList.remove("open");log("🔧 模様替えモード：動かしたい家具・置物をタップ")}mvBtn();try{rdeco()}catch(e){}}
function mvBtn(){const b=$("#mvbtn");if(!b)return;const show=!!G.setup&&R.phase==="prep"&&!G.over;if(!show&&R.mvOn){R.mvOn=false;mvOff()}b.hidden=!show;b.classList.toggle("on",!!R.mvOn);document.body.classList.toggle("mvmode",!!R.mvOn);if(R.mvOn){const sh=$("#sheet");if(sh)sh.classList.remove("open")}b.textContent=R.mvOn?"✅ 模様替えを終わる":"🔧 模様替え"}
document.addEventListener("click",e=>{const b=e.target.closest("#mvbtn");if(b&&b.id==="mvbtn")mvToggle()});
{const _h3=hud;hud=function(){_h3();try{mvBtn()}catch(e){}}}
{const _st=start;start=function(){if(R.mvOn){R.mvOn=false;mvOff()}const r=_st.apply(this,arguments);try{mvBtn()}catch(e){}return r}}
document.addEventListener("click",e=>{const b=e.target.closest("[data-mv]");if(!b||!b.dataset||!b.dataset.mv||!R.mvs)return;const m=R.mvs,a=b.dataset.mv;
if(a==="no"){mvOff();return}
if(R.phase!=="prep"){log("🔧 模様替えは開店前だけできます");mvOff();return}
if(a==="rot"){if(m.t==="d"){const d=G.decor[m.i];d.r=((d.r||0)+1)&3;mvDone();mvSel(m);return}if(m.t==="f"){const F=G.furn[m.i],cur=F.o===1?1:F.o===3?3:(F.f>0?0:2),n=F.k==="b"?3:SDEF[F.k].n;let ok=null;for(let st=1;st<4&&!ok;st++){const nx=(cur+st)%4,q=nx===0?{f:1,o:0}:nx===2?{f:-1,o:0}:{f:1,o:nx};for(const[dx,dy]of[[0,0],[0,-(n-1)],[-(n-1),0],[1,0],[-1,0],[0,1],[0,-1]]){const N=Object.assign({},F,q,{tx:F.tx+dx,ty:F.ty+dy});if(furnFits(N,m.i)){ok=N;break}}}if(!ok){log("向きを変えるには、まわりに空きが必要です");return}Object.assign(F,ok);mvDone();mvSel(m);return}}
if(a==="sell"){const nm=mvName(m);if(ivFull()){log("📦 持ち物がいっぱいです（"+IVMAX+"個まで）");return}if(m.t==="f"){const nS=G.furn.reduce((s,F,i)=>s+(i===m.i?0:SDEF[F.k].n),0);if(nS<1){log("客席を全部なくすことはできません");return}const F=G.furn[m.i];G.inv.push({t:"f",k:F.k,sr:F.sr});G.furn.splice(m.i,1)}else if(m.t==="d"){G.inv.push({t:"d",id:G.decor[m.i].id});G.decor.splice(m.i,1)}else{G.inv.push({t:"w",id:G.wall[m.i].id});G.wall.splice(m.i,1)}log("📦 "+nm+" をしまいました（持ち物 "+G.inv.length+"/"+IVMAX+"）");mvOff();mvDone()}});
/* 選択中の物の場所を光らせる */
function mvHi(k){if(!R.mvOn)return;const ph=.45+.25*Math.sin(performance.now()/180),BL=Math.floor(performance.now()/380)%2,TW={"60,200,100":["30,215,80","250,240,40"],"90,170,255":["40,130,255","120,235,255"],"255,200,40":["255,140,0","255,60,60"]},Q=(tx,ty,c)=>{const x=tx*6,y=ty*6,mm=/rgba\((\d+,\d+,\d+),/.exec(c),tw=mm&&TW[mm[1]];if(tw)c="rgba("+tw[BL]+",.78)";const pp=[P3(x+.3,y+.3,0,k),P3(x+5.7,y+.3,0,k),P3(x+5.7,y+5.7,0,k),P3(x+.3,y+5.7,0,k)];poly(pp,c);if(tw){cx.strokeStyle=BL?"rgba(20,20,30,.75)":"rgba(255,255,255,.95)";cx.lineWidth=2;cx.beginPath();cx.moveTo(pp[0][0],pp[0][1]);pp.slice(1).forEach(p=>cx.lineTo(p[0],p[1]));cx.closePath();cx.stroke()}},m=R.mvs;
if(!m){const r=Math.max(6,k.s*.9);(G.wall||[]).forEach(d=>WS.forEach(w=>{if(w.k===d.k&&wallVis(w.s,k)){const q=P3(w.c[0],w.c[1],w.c[2],k);cx.fillStyle=`rgba(90,170,255,${.5+ph*.4})`;cx.beginPath();cx.arc(q[0],q[1],r,0,7);cx.fill()}}));G.furn.forEach(F=>furnFoot(F).forEach(q=>{const[a,b]=q.split(",").map(Number);Q(a,b,`rgba(90,170,255,${ph*.7})`)}));G.decor.forEach(d=>Q(d.tx,d.ty,`rgba(90,170,255,${ph*.7})`));return}
const D=(w,c,r)=>{if(!wallVis(w.s,k))return;const q=P3(w.c[0],w.c[1],w.c[2],k);cx.fillStyle=c;cx.beginPath();cx.arc(q[0],q[1],r,0,7);cx.fill();cx.strokeStyle="rgba(255,255,255,.9)";cx.lineWidth=2;cx.stroke()};
if(m.t==="w"){const d=G.wall[m.i],r=Math.max(7,k.s*1.1);if(R.mvT)WS.forEach(w=>{if(R.mvT.has(w.k))D(w,`rgba(60,200,100,${.45+ph*.35})`,r)});WS.forEach(w=>{if([d.k,d.k2,d.k3,d.k4].includes(w.k))D(w,`rgba(255,200,40,${.6+ph*.3})`,r)});return}
if(R.mvT)R.mvT.forEach(q=>{const[a,b]=q.split(",").map(Number);Q(a,b,`rgba(60,200,100,${.3+ph*.35})`)});
if(m.t==="f")furnFoot(G.furn[m.i]).forEach(q=>{const[a,b]=q.split(",").map(Number);Q(a,b,`rgba(255,200,40,${ph})`)});else if(m.t==="d")Q(G.decor[m.i].tx,G.decor[m.i].ty,`rgba(255,200,40,${ph})`)}
/* 客席の解禁：最初の借入を返し終えて増築が解禁されたとき */
function seatChk(){if(!G.seatU&&G.setup&&G.loan&&G.loan.bal<=0&&(G.month||0)>0){G.seatU=1;G.tutSeat=1;log("🛋 客席が解禁されました！（☰ → 装飾 → 客席）")}}
/* ===== イベント（50種・レア1〜5）：営業前／営業中にポップアップ。営業中は一時停止 ===== */
const EVW={1:10,2:6,3:3.5,4:1.8,5:.8},EVPRE=.045,EVRUN=.057;
const evMo=()=>MN[G.month%12],evWin=()=>[12,1,2].includes(evMo());
const evIn=()=>R.people.filter(p=>p.st==="sit"||p.st==="go"||p.st==="drink"||p.st==="ret");
const evFree=()=>SEATS.filter(s=>!s.p&&!s.x);
function td(){if(!G.evT||G.evT.day!==G.day)G.evT={day:G.day};return G.evT}
function evx(){return G.evX=G.evX||{}}
function starOf(o){return Math.min(100,starFor(o.fol)+(o.starB||0))}
/* やる気を下げる。ただしこのイベントでは30未満にはならない */
function motFloor(v){G.mot=100;return;const m=G.mot??100,t=Math.max(m-v,Math.min(m,30));G.mot=Math.max(0,Math.min(100,t))}
function evMoney(v,src){G.money+=v;if(R.phase==="run"&&R.st){if(v>0)R.st.sales+=v;else R.st.cost=(R.st.cost||0)-v}log((v>=0?"💰 +":"💸 −")+yen(Math.abs(v))+"（"+src+"）")}
function evM(){let m=1;const t=td(),x=evx();if(t.hw)m*=1.2;if(t.dm)m*=t.dm;if(x.wk&&x.wk.mo===G.month)m*=x.wk.m;if(x.atm&&x.atm.mo===G.month)m*=x.atm.m;if(x.mm&&x.mm.mo===G.month)m*=x.mm.m;if(x.nd&&x.nd.day===G.day)m*=x.nd.m;if(x.noise>G.day)m*=.8;return m}
const evCands=()=>{const pr=new Set(R.people.map(p=>p.c.i));return G.cs.filter(c=>c.act&&!c.quit&&(!c.ex||G.at2)&&!pr.has(c.i)&&!(c.banM!=null&&G.month<=c.banM))};
const SNOWL=["寒い…","帰りたい…","こうしてシーシャに向き合う時間…プライスレス"];
const EV=[
/* ---- ★1 ---- */
{id:1,r:1,t:"pre",n:"炭の発注が遅れてた",tx:"炭の発注が遅れてた…",ef:"開店が3時間遅れる",ok:()=>G.close-G.open>=5,go:()=>{td().late=180}},
{id:2,r:1,t:"run",n:"常連さんの差し入れ",tx:"「これ、みんなで食べて！」常連さんがお菓子を持ってきてくれた",ef:"次の日は行動を2回できる",ok:()=>evIn().some(p=>p.c.met),go:()=>{evAct2("常連さんの差し入れ")}},
{id:3,r:1,t:"run",n:"ホースが破れた",tx:"「あれ、ホースから煙が漏れてる…」",ef:"交換代 −¥500、不満+3",ok:()=>evIn().length>0,go:()=>{evMoney(-500,"ホース交換");R.st.miss+=3}},
{id:4,r:1,t:"pre",n:"前の道で工事中",tx:"「店の前がガガガガ…今日は人通りが少なそう」",ef:"今日の客足 −20%",go:()=>{const t=td();t.dm=(t.dm||1)*.8;t.koji=1}},
{id:5,r:1,t:"run",n:"急な用事",tx:"大事な用事が入った…ちょっと店を空けないと",ef:"2時間接客できない（その間に来たお客さんは帰ってしまう）",ok:()=>R.t+150<G.close*60,go:()=>{R.away=R.t+120;OW.mode="";OW.path=[];OW.sitting=0;OW.seat=null;OW.idleSmk=0;OW.hd=0;OW.eat=null;OW._pc=null;OW.x=-999;OW.y=-999}},
{id:6,r:1,t:"run",n:"迷い込んだ観光客",tx:"「Excuse me, sheesha OK?」海外の観光客がふらっと入ってきた。本場の技も教えてくれた",ef:"売上 +¥3,500、技術+5",go:()=>{evMoney(3500,"観光客");G.ow.skill=Math.min(100,G.ow.skill+5)}},
{id:7,r:1,t:"pre",n:"フレーバーの発注忘れ",tx:"あっ…発注忘れてた…",ef:"今日使えるフレーバーは5種類だけ",ok:()=>(G.flu||FLU0).length>5,go:()=>{td().fl5=(G.flu||FLU0).slice().sort(()=>Math.random()-.5).slice(0,5)}},
{id:8,r:1,t:"pre",n:"家主さんが様子見に",tx:"「どう、調子は？これよかったら」家主さんがおそうざいをくれた",ef:"次の日は行動を2回できる",go:()=>{evAct2("家主さんのおそうざい")}},
{id:9,r:1,t:"run",n:"レジの小銭切れ",tx:"「1万円札しかないんですけど…」お釣りが足りない！",ef:"今日の残りの会計は千円未満を割引（¥3,500→¥3,000）",go:()=>{R.coin=1}},
{id:10,r:1,t:"run",n:"SNSでシェアされた",tx:"お客さんが店の写真をストーリーに上げてくれたみたい",ef:"フォロワー+2%",ok:()=>evIn().length>0,go:()=>{const o=G.ow;o.fol+=Math.max(10,Math.round(o.fol*.02));o.star=starOf(o)}},
/* ---- ★2 ---- */
{id:11,r:2,t:"pre",n:"夜更かししすぎた",tx:"夜更かししすぎた…頭が回らない",ef:"今日は「おいしい」が出ない",go:()=>{td().noGood=1}},
{id:12,r:2,t:"run",n:"エアコンが壊れた",tx:"「なんか暑くない？…エアコン止まってる！」",ef:"交換代 −¥80,000、今日はこのあと不満が出るたびに+3",go:()=>{evMoney(-80000,"エアコン交換");R.acM0=R.st.miss}},
{id:13,r:2,t:"pre",n:"メーカーの営業さん",tx:"「新作フレーバー、試してみませんか？」",ef:"未解禁のフレーバーを1種類解禁",ok:()=>flPick(5)>=0,go:()=>{flUnlock(flPick(5),"メーカーの営業さんから")}},
{id:14,r:2,t:"pre",n:"雑誌の取材",tx:"「タウン誌の記事でご紹介させてください！」",ef:"今週の客足 +15%",go:()=>{const x=evx();x.wk={mo:G.month,m:(x.wk&&x.wk.mo===G.month?x.wk.m:1)*1.15}}},
{id:15,r:2,t:"pre",n:"電熱器が壊れた",tx:"電熱器が壊れた！炭がおこせない…",ef:"今日は強制休業",go:()=>({close:"🔌 電熱器が壊れて休業…"})},
{id:16,r:2,t:"run",n:"セミが入ってきた",tx:"ジジジジジッ！セミが店に飛び込んできた！",ef:"店内のお客さん全員の不満+1",cond:"夏（7・8月）・お客さんがいる時",ok:()=>[7,8].includes(evMo())&&evIn().length>0,go:()=>{evIn().forEach(p=>{p.c.up=Math.min(100,p.c.up+5);R.st.miss++;say(p,rnd(["うわっセミ！","ぎゃー！","こっち来ないで！"]))})}},
{id:17,r:2,t:"pre",n:"スマホを落とした",tx:"「画面バキバキ…SNSが見られない」",ef:"3日間SNSを更新できない",go:()=>{evx().sns=G.day+3}},
{id:18,r:2,t:"pre",n:"寒波",tx:"「外、めちゃくちゃ寒い…今日はみんな家にいそう」",ef:"今日の客足 −30%",cond:"冬（12〜2月）",ok:evWin,go:()=>{const t=td();t.dm=(t.dm||1)*.7}},
{id:19,r:2,t:"run",n:"ボトルが割れた",tx:"「ガシャーン！」お客さんがシーシャ台を倒してしまった",ef:"ボトル代 −¥20,000",ok:()=>evIn().length>0,go:()=>{evMoney(-20000,"ボトル代")}},
{id:20,r:2,t:"pre",n:"お花が届いた",tx:"「いつもありがとう」常連さんからお花が届いた",ef:"会ったことのあるお客さん全員の友好度+5、今週は雰囲気アップ（客足+10%）",go:()=>{evFp(5);evx().atm={mo:G.month,m:1.1}}},
/* ---- ★3 ---- */
{id:21,r:3,t:"run",n:"雨漏り",tx:"「ポタッ…天井から水が！」",ef:"席がひとつ今日は使えない、お客さん全員の友好度−5",cond:"梅雨（6月）",ok:()=>evMo()===6&&evFree().length>0,go:()=>{const s=rnd(evFree());s.x=1;evFp(-5)}},
{id:22,r:3,t:"pre",n:"サークルの貸切予約",tx:"「貸切りできますか？」大学のサークルから予約が入った",ef:"席の数だけ予約客が来て1日中いる（一般客は来ない）。シーシャ代は人数に関係なく¥70,000",ok:()=>G.cs.filter(c=>c.act&&!c.quit).length>=3,go:()=>{td().kashi=1}},
{id:23,r:3,t:"pre",n:"消防の立入検査",tx:"「消防署です。炭の管理を確認させてください」",ef:"開店が2時間遅れる、お客さん全員の友好度−5",ok:()=>G.close-G.open>=4,go:()=>{td().late=120;evFp(-5)}},
{id:24,r:3,t:"run",n:"停電",tx:"「バツン…真っ暗！」",ef:"今日の営業はここで終了（お客さんは帰っていく）",go:()=>{R.dark={t:performance.now(),done:0}}},
{id:25,r:3,t:"pre",n:"風邪をひいた",tx:"風邪をひいた…熱っぽい…",ef:"2日間強制休業",go:()=>{evx().close={until:G.day+2,msg:"🤒 風邪で休業中…"};return{close:"🤒 風邪で休業…"}}},
{id:26,r:3,t:"pre",n:"近くに新しいシーシャ屋",tx:"「近くに新しいシーシャ屋がオープンしたらしい」",ef:"今月の客足 −10%",go:()=>{const x=evx();x.mm={mo:G.month,m:(x.mm&&x.mm.mo===G.month?x.mm.m:1)*.9}}},
{id:27,r:3,t:"run",n:"忘れ物の財布",tx:"「席に財布が落ちてる…」届けたら持ち主がすごく感謝してくれた",ef:"",ok:()=>R.lastLeft&&R.t-R.lastLeft.t<60,go:()=>{const c=R.lastLeft.c;c.fp+=10;c.hp=Math.min(100,c.hp+15);R.lastLeft=null;return"（"+nm(c)+"の親密度が大きくアップ）"}},
{id:28,r:3,t:"pre",n:"炭が届かない",tx:"炭を10箱頼んだのに1箱しか来なかった…",ef:"今日から3日間、シーシャを10本出したらその日は閉店",go:()=>{evx().coal=G.day+3}},
{id:29,r:3,t:"run",n:"警察の訪問",tx:"警察の訪問…何もしてないのに、なぜかドキドキした",ef:"次の日は行動できない",go:()=>{evNoAct("警察の訪問")}},
{id:30,r:3,t:"run",n:"イキリ客が来た",tx:"「もっと爆煙で！濃いめマシマシ！アイスホースないの！？」",ef:"次の日は行動できない",go:()=>{evNoAct("イキリ客")}},
/* ---- ★4 ---- */
{id:31,r:4,t:"pre",n:"台風",tx:"「暴風警報が出てる…」",ef:"今日は強制休業、明日の客足+20%",cond:"台風の日（夏〜秋）",ok:()=>false,go:()=>{evx().nd={day:G.day+1,m:1.2};return{close:"🌀 台風のため休業。来たかったお客様は、明日に期待…"}}},
{id:32,r:4,t:"pre",n:"大雪",tx:"「一面まっしろ…電車も止まってる」自分も帰れないので、とりあえず店は開けるけど…",ef:"お客さんは誰も来ない",cond:"冬（12〜2月）",ok:evWin,go:()=>{td().snow=1;G.wx[G.wd]="snow"}},
{id:33,r:4,t:"pre",n:"空き巣",tx:"「…あれ？店のカギが開いてる」",ef:"所持金の10%を失う、次の日は行動できない",go:()=>{const v=G.money>0?Math.round(G.money*.1):0;if(v)evMoney(-v,"空き巣");evNoAct("空き巣")}},
{id:34,r:4,t:"pre",n:"めちゃくちゃバズった",tx:"「昨日の投稿、通知が止まらない…！？」",ef:"フォロワー3倍",go:()=>{const o=G.ow;o.fol=Math.max(10,o.fol*3);o.star=starOf(o);G.buzzN=(G.buzzN||0)+1}},
{id:35,r:4,t:"pre",n:"近所から煙の苦情",tx:"「煙と匂い、なんとかしてもらえます？」",ef:"換気扇工事（¥100,000）か、断るか",ch:[["pay","🔧 工事する（−¥100,000）",()=>G.money>=100000],["no","🙅 断る（7日間、嫌がらせの騒音で客足−20%・来たお客さんは不満+3）",()=>1]],go:(k)=>{if(k==="pay"){evMoney(-100000,"換気扇工事");return"換気扇を付け替えた。これで文句は言われないはず"}evx().noise=G.day+7;return"…その夜から、隣で謎の工事音が鳴り始めた"}},
{id:36,r:4,t:"run",n:"常連が友達を連れてきた",tx:"「ここ、私の行きつけなの！」",ef:"レア3〜4のお客さんが来店",ok:()=>evIn().some(p=>p.c.met)&&evFree().length>0&&evCands().some(c=>c.rar===3||c.rar===4),go:()=>{const L=evCands().filter(c=>c.rar===3||c.rar===4),U=L.filter(c=>!c.met),c=rnd(U.length?U:L);c.act=1;if(typeof mbOn==="function"&&mbOn()){R.sched.push({at:R.t+5,m:[c],force:1});R.sched.sort((a,b)=>a.at-b.at)}else arrive([c]);return"（"+nm(c)+"が来店）"}},
{id:37,r:4,t:"pre",n:"水道管が破裂",tx:"「床が水浸し…！」",ef:"修理代 −¥100,000、今日は強制休業",go:()=>{evMoney(-100000,"水道管修理");return{close:"🚰 水道管の修理で休業…"}}},
{id:38,r:4,t:"pre",n:"花火大会",tx:"「今日は花火大会！帰りに寄る人が多そう」",ef:"今日の客足+40%（ただし20時までは誰も来ない）",cond:"8月",ok:()=>evMo()===8&&G.close>=22&&G.open<20,go:()=>{const t=td();t.dm=(t.dm||1)*1.4;t.minAt=20*60}},
{id:39,r:4,t:"pre",n:"税務署からの手紙",tx:"「…申告漏れ？」",ef:"追徴課税で先月の売上の20%を支払う、次の日は行動できない（1回目の確定申告のあとから起こる）",ok:()=>G.last&&G.last.est>0&&!!(G.tax&&G.tax.n>=1),go:()=>{evMoney(-Math.round(G.last.est*.2),"追徴課税");evNoAct("税務署の手紙")}},
{id:40,r:4,t:"pre",ok:()=>false,n:"シーシャの大会に招待",tx:"「シーシャバトルに出てみませんか？」",ef:"6・9・12・3月の月末に開催（休業なし）。技術が高いほど優勝しやすい。優勝¥200,000／準優勝¥50,000、3位以下は賞金なし",go:()=>null},
/* ---- ★5 ---- */

{id:41,r:5,t:"pre",n:"海外からのお土産",tx:"「ドバイ旅行のお土産！現地のフレーバーだよ」",ef:"レア3以上の未解禁フレーバーを1種類解禁",ok:()=>flPick(5,3)>=0,go:()=>{flUnlock(flPick(5,3),"ドバイのお土産")}},
{id:42,r:5,t:"pre",ok:()=>false,n:"シーシャフェスに出店",tx:"「フェスにブース出しませんか？」",ef:"ギャラ（スター性×5,000円）／フォロワー／「美味しい！」で知名度・スター性が少しずつ上がる／フレーバー3種解放（月末・休業なし）",go:()=>{const o=G.ow;evMoney(30000,"フェスのギャラ");o.fol+=10000;o.starB=(o.starB||0)+10;o.star=starOf(o);for(let i=0;i<3;i++)flUnlock(flPick(5),"フェスで出会った");motAdd(-15);evx().close={until:G.day+2,msg:"🎪 フェス出店中…"};return{close:"🎪 シーシャフェスに出店中…"}}},
{id:43,r:5,t:"run",n:"大富豪が来店",tx:"「この店、気に入った。釣りはいらないよ」万札を置いていった",ef:"売上 +¥50,000",go:()=>{evMoney(50000,"大富豪")}},
{id:44,r:5,t:"run",n:"ワンオペ地獄",tx:"「…気づいたら満席、オーダーが止まらない！」",ef:"一気に満席。次の日は行動できない",cond:"2・6・9月",ok:()=>[2,6,9].includes(evMo())&&evFree().length>=2&&evCands().length>=2,go:()=>{const L=evCands().sort(()=>Math.random()-.5);let n=0;for(const c of L){if(!evFree().length)break;arrive([c]);n++}R.oneop=1;evNoAct("ワンオペ地獄");return"（"+n+"人が一気に来店）"}},
{id:45,r:5,t:"pre",n:"猫が住み着いた",tx:"「裏口に子猫が…うちの子になる？」",ef:"これからたまに、猫が店に遊びにくる",once:1,go:()=>{G.cat={col:rnd(["tabby","black","white","calico"])}}},
{id:46,r:5,t:"run",n:"フレーバーミックスが大当たり",tx:"「…この組み合わせ、天才かもしれない」",ef:"今日はこのあと全部「おいしい」が出る",go:()=>{R.allGood=1}},
{id:47,r:5,t:"run",n:"元恋人が来店",tx:"「…久しぶり。こんな店やってたんだ」",ef:"元恋人の見た目と名前を決めて、図鑑に登録。ときどき来るようになる",once:1,go:()=>"（どんな人だった？）"},
{id:48,r:5,t:"run",n:"自称インフルエンサーが来店",tx:"「…この店、SNSで紹介していい？」",ef:"フォロワーが2倍か、半分に",go:()=>{const o=G.ow,u=Math.random()<.5;o.fol=Math.max(0,Math.round(o.fol*(u?2:.5)));o.star=starOf(o);return u?"（本物だった！フォロワー2倍）":"（炎上した…フォロワー半分）"}},
{id:49,r:5,t:"run",n:"フードデリバリーの誤配達",tx:"「ピザLサイズ×10、お届けです！」…頼んでない。お代は払い済みらしい",ef:"お客さんに振る舞って全員の親密度アップ",cond:"お客さんが5人以上いる時",ok:()=>evIn().length>=5,go:()=>{evIn().forEach(p=>{p.c.fp+=3;p.c.hp=Math.min(100,p.c.hp+6);say(p,rnd(["ピザだ！","いいんですか！？","最高の店！"]))})}},
{id:50,r:5,t:"pre",ok:()=>false,n:"宝くじ1等",tx:"宝くじが1等当たった‼️‼️‼️",ef:"¥100,000,000もらえる。でも今まで通りの生活をする",once:1,go:()=>{evMoney(100000000,"宝くじ")}}];
const EVN=EV.length;
/* 「このあと続く」系・来店に効く系は開店後3時間以内に起こす */
const EVEARLY=[36,44,46,9,12,21,5];
/* 来店系イベント：黒灰色のモブが入口まで来てから発生。お客さん（pay）はシーシャ代¥3,500を払う */
const MOBEV={6:{pay:0},29:{pay:0},30:{pay:1},43:{pay:1},47:{pay:1},48:{pay:1},49:{pay:0}};
function mobChar(){const P=typeof mobPool==="function"?mobPool():G.cs,b=P[Math.floor(Math.random()*P.length)]||{},g=["#2a2a2e","#3a3a3e","#4a4a4e","#5a5a5e","#6b6b70"],r=a=>a[Math.floor(Math.random()*a.length)];
return{i:9000+Math.floor(Math.random()*999),name:"？？？",nick:"？？？",job:"モブ",sex:b.sex||"男性",hs:Math.floor(Math.random()*4),eye:0,hair:"#1c1c1e",skin:"#8a8a8e",shirt:r(g),pants:r(g),top:b.top||0,bot:b.bot||0,acc:0,accC:"#333",fat:b.fat||0,mob:1,stay:60,refill:0,tl:3,hp:0,up:0,fp:0}}
function mobVisit(e){if(R.closed||R.away!=null)return false;const c=mobChar(),p={c,mob:1,ev:e,x:-4,y:15,st:"peek",dir:1,seat:NOSEAT,seed:Math.random()*5,path:[[3,15]],bt:0,orders:0,tp:0,rem:0,nd:0,dl:0,dt:0,wt:0,nl:["……"]};R.people.push(p);return true}
function mobArrive(p){const e=p.ev,m=MOBEV[e.id]||{};if(m.pay){const pr=R.coin?3000:3500;G.money+=pr;R.st.sales+=pr;R.st.visits++;log("💨 "+e.n.replace(/が来店|が来た/,"")+"：シーシャ ¥"+pr.toLocaleString())}evPause();evFire(e,()=>{evResume();p.wt=1.2})}
/* 抽選：レアほど出にくい。一度きりのものは2回目なし */
function evPick(tp){const L=EV.filter(e=>e.t===tp&&e.id!==31&&!(e.once&&(G.evDex||{})[e.id])&&(!e.ok||e.ok()));if(!L.length)return null;let s=L.reduce((a,e)=>a+EVW[e.r],0)*Math.random();for(const e of L){s-=EVW[e.r];if(s<=0)return e}return L[L.length-1]}
function evRec(e){G.evDex=G.evDex||{};const nw=!G.evDex[e.id];G.evDex[e.id]=(G.evDex[e.id]||0)+1;log("⚠️ イベント「"+e.n+"」"+(nw?"（図鑑に登録）":""));return nw}
/* ポップアップ（緊急っぽい背景） */
function evPop(e,res,nw,cb){const old=$("#evp");if(old)old.remove();const d=document.createElement("div");d.id="evp";const st="★".repeat(e.r),msg=res&&res.msg?res.msg:typeof res==="string"?res:"";
const btns=e.ch&&!res?e.ch.map(([k,t,ok])=>`<button data-evc="${k}" ${ok()?"":"disabled"} class="on" style="width:100%;margin-top:6px">${t}</button>`).join(""):`<button data-evc="ok" class="on" style="width:100%;margin-top:10px">OK</button>`;
d.innerHTML=`<div class="evb"><div class="evh"><span class="evs">⚠</span> EVENT <span class="evs">⚠</span></div><div class="evc"><div style="color:#d4a017;font-size:13px">${st}${nw?' <b class="nw">NEW</b>':""}</div><div class="evn">${esc(e.n)}</div><div class="evt">${esc(e.tx)}</div>${e.ef?`<div class="eve">${esc(e.ef)}</div>`:""}${msg?`<div class="eve" style="background:#fff3c4">${esc(msg)}</div>`:""}${btns}</div><div class="evh evf"></div></div>`;
document.body.appendChild(d);d.onclick=ev=>{const b=ev.target.closest("[data-evc]");if(!b||b.disabled)return;d.remove();cb&&cb(b.dataset.evc)}}
/* 営業中の一時停止 */
function evPause(){if(R.evSp==null){R.evSp=R.speed||1;R.speed=0}}
function evResume(){if(R.evSp!=null){R.speed=R.evSp;R.evSp=null}}
/* 発動：効果を先に反映して保存→ポップアップ。休業が出たら OK のあとで休業処理 */
function evFire(e,after){const nw=evRec(e);if(e.ch){save();evPop(e,null,nw,k=>{const r=e.go(k);log("　→ "+(r||""));save();hud();evPop(Object.assign({},e,{ch:null,ef:""}),r,0,()=>after&&after(null))});return}
const r=e.go();save();hud();if(r&&r.msg)log("　"+r.msg);else if(typeof r==="string")log("　"+r);evPop(e,r,nw,()=>after&&after(r&&r.close?r.close:null))}
/* 朝：休業中の継続・台風・抽選。何か出したら true（showMorning はあとで呼び直す） */
function evMorning(){if(G.month<1&&!R.evForce&&!admPreAny())return false;const x=evx(),T=td();
if(x.close&&G.day<x.close.until){const m=x.close.msg;if(G.day+1>=x.close.until)x.close=null;closeDay(m);return true}
if(G.wx[G.wd]==="typhoon"&&!T.ty){T.ty=1;const e=EV.find(q=>q.id===31);evFire(e,c=>{closeDay(c)});return true}
if(T.rolled&&!admPreAny())return false;const fr=T.rolled;T.rolled=1;if(lottoRoll(fr)){lottoScene(()=>showMorning());return true}if(((!fr&&isHallo())||admTake("hallo"))&&!T.hw){T.hw=1;halloPop(()=>showMorning());return true}const ap=admTake("pre");if(ap)R.evForce=ap;let e=R.evForce?EV.find(q=>q.id===R.evForce):null;R.evForce=null;if(e&&e.ok&&!e.ok()){R.evSkip=e.id;e=null}if(!e&&!fr&&Math.random()<EVPRE)e=evPick("pre");if(!e){save();return false}
evFire(e,c=>{if(c)closeDay(c);else showMorning()});return true}
/* 営業開始時：今日の効果を反映 */
function evStart(){const T=td(),x=evx();if(T.hw)halloOn();else halloOff();["away","coin","acM0","dark","allGood","oneop","lastLeft","coalOut","late","minAt","snowD","kashi","fl5","cat","catPlan","evAt","evE"].forEach(k=>R[k]=null);SEATS.forEach(s=>s.x=0);
if(T.late)R.late=Math.min(T.late,Math.max(0,(G.close-G.open)*60-120));if(T.minAt)R.minAt=T.minAt;if(T.fl5)R.fl5=T.fl5;R.snowD=T.snow?1:null;R.kashi=T.kashi?1:null;R.coalLim=x.coal>G.day?10:null;R.shN=0;
if(G.cat&&Math.random()<(R.catForce?1:.05)){const o=G.open*60+(R.late||0),e=G.close*60-120;R.catPlan={at:o+Math.random()*Math.max(1,e-o),dur:120+Math.random()*180}}R.catForce=0;
{const ar=admTake("run");if(ar)R.evRunForce=ar}if((G.month>=1||R.evRunForce)&&(R.evRunForce||Math.random()<EVRUN)){const o=G.open*60+(R.late||0)+30,e=G.close*60-90;if(e>o){R.evEF=R.evRunForce?1:0;R.evE=R.evRunForce?EV.find(q=>q.id===R.evRunForce):evPick("run");R.evRunForce=null;const ee=R.evE&&EVEARLY.includes(R.evE.id)?Math.min(e,o+150):e;R.evAt=o+Math.random()*(Math.max(o+1,ee)-o)}}}
function evStartSched(){if(R.snowD){R.sched=[];return}if(R.kashi){R.sched=[];const L=G.cs.filter(c=>c.act&&!c.quit).sort(()=>Math.random()-.5).slice(0,SEATS.length),o=G.open*60+(R.late||0);L.forEach((c,i)=>R.sched.push({at:o+i,m:[c]}));evMoney(70000,"貸切のシーシャ代");log("🎉 今日は貸切！（"+L.length+"名）")}}
/* 営業中の毎フレーム */
function evTick(dm){if(R.evAt!=null&&R.t>=R.evAt&&!R.closed){R.evAt=null;let e=R.evE||evPick("run");R.evE=null;if(e&&e.ok&&!e.ok()){if(R.evEF&&R.t<G.close*60-60){R.evE=e;R.evAt=R.t+10;return}if(R.evEF)log("🛠 管理者フラグ「"+e.n+"」は条件（"+(e.cond||"—")+"）を満たさないまま閉店が近づいたため不発");R.evSkip=e.id;e=null}R.evEF=0;if(e){if(MOBEV[e.id]&&mobVisit(e))return;evPause();evFire(e,()=>evResume())}}
if(R.away!=null&&R.t>=R.away){R.away=null;owReset();OW.x=-4;OW.y=15;OW.dir=1;OW.mode="back";OW.path=[[3,15],[3,8]];R.idle0=R.t+15;say(OW,"ただいま！お待たせしました");log("🏃 店に戻った")}
if(R.dark&&!R.dark.done&&R.speed&&performance.now()-R.dark.t>3500){R.dark.done=1;say(OW,"今日は店じまい…");log("🔌 停電のため営業終了");R.closed=true;R.sched.length=0;R.people.forEach(p=>leaveNow(p))}
catTick(dm)}
/* 閉店処理（endDay の前） */
function evEnd(s){if(R.acM0!=null&&s.miss>R.acM0){s.miss=R.acM0+(s.miss-R.acM0)*3}}
function evEndMot(){return;if(R.oneop){motFloor(40);log("😵 ワンオペ地獄の疲れが…（やる気−40）")}}
/* ===== 図鑑 ===== */
function rev(){$("#dg").classList.remove("dxg");const D=G.evDex||{},n=EV.filter(e=>D[e.id]).length;
$("#dc").innerHTML=dxTabs()+`<div style="margin-top:6px">発生したイベント ${n}/${EVN}種類</div><div style="font-size:12px;margin-top:2px">イベントは2ヶ月目から、開店前や営業中にランダムで起こります。レアほど起こりにくい</div>`;
$("#dg").innerHTML=EV.map(e=>{const k=D[e.id];return`<div class="it" style="${k?"":"opacity:.55"}"><span class="m">No.${String(e.id).padStart(2,"0")}</span> <b>${k?esc(e.n):"？？？"}</b> <span style="color:#d4a017;font-size:11px">${"★".repeat(e.r)}</span><small>${k?(e.t==="pre"?"開店前":"営業中")+"・"+k+"回<br>"+esc(e.ef||""):(e.cond?"条件："+esc(e.cond):"未発生")}</small></div>`}).join("");$("#dd").hidden=true}
/* ===== 猫：当たり判定なし。入口から入ってきて、店内をうろうろ／ごろんとして帰る ===== */
const CATC={tabby:["#e0913a","#b5651d","#f5ecdc"],black:["#26262b","#141418","#3a3a40"],white:["#f4f1ea","#d9d4c8","#ffffff"],calico:["#f4efe4","#e08a3c","#2b2b2b"]};
function catTick(dm){const P=R.catPlan;if(P&&!R.cat&&R.t>=P.at&&!R.closed){R.cat={x:-4,y:15,dir:1,path:[[4,15]],st:"in",until:R.t+P.dur,wt:0,c:{hp:30,up:0},bt:0,bub:""};R.catPlan=null;log("🐈 猫が遊びにきた")}
const c=R.cat;if(!c)return;if(c.st!=="out"&&(R.t>=c.until||R.closed)){c.st="out";c.path=[[c.x,15],[-6,15]]}
if(c.path.length){const t=c.path[0],dx=t[0]-c.x,dy=t[1]-c.y,d=Math.hypot(dx,dy),st=1.5*dm;if(d>.01)c.dir=Math.abs(dx)>Math.abs(dy)?(dx>0?1:3):(dy>0?0:2);if(d<=st){c.x=t[0];c.y=t[1];c.path.shift()}else{c.x+=dx/d*st;c.y+=dy/d*st}c.mv=1}
else{c.mv=0;if(c.st==="out"){R.cat=null;return}c.wt-=dm;if(c.wt<=0){if(Math.random()<.35){c.wt=20+Math.random()*50;c.loaf=1}else{const t=rnd(FLT);c.path=[[t[0]*6+1.5+Math.random()*3,t[1]*6+1.5+Math.random()*3]];c.loaf=0;c.wt=5+Math.random()*15}if(Math.random()<.25)say(c,rnd(["にゃー","にゃ","ゴロゴロ…","ふぁ〜"]))}}}
function catPush(a){const c=R.cat;if(!c)return;const cc=(G.cat||{}).col,C=CATC[cc]||CATC.tabby,[b,dk,wh]=C,f=[[0,1],[1,0],[0,-1],[-1,0]][c.dir||0],sd=[f[1],-f[0]],q=.5,T=performance.now()/1000,lf=c.mv?Math.sin(T*14)*.25:0,lo=c.loaf&&!c.mv?-.5:0;
const V=(u,v,z,cl)=>{const X=c.x+u*f[0]+v*sd[0],Y=c.y+u*f[1]+v*sd[1];a.push([X-q/2,Y-q/2,z+lo,cl,undefined,q])};
for(let u=-1.25;u<=1.25;u+=.5)for(const v of[-.5,0,.5])for(const z of[1,1.5]){const stp=Math.round((u+1.25)/.5)%2;V(u,v,z,z===1&&v===0?wh:(cc!=="calico"&&stp&&v!==0&&z===1.5)?dk:b)}
if(!(c.loaf&&!c.mv))for(const[u,v,ph]of[[1.25,-.5,1],[1.25,.5,-1],[-1.25,-.5,-1],[-1.25,.5,1]]){V(u,v,.5+Math.max(0,lf*ph),wh);V(u,v,0+Math.max(0,lf*ph),wh)}
for(let u=1.75;u<=2.75;u+=.5)for(const v of[-.5,0,.5])for(const z of[2,2.5])V(u,v,z,b);
V(2.25,-.5,3,b);V(2.25,.5,3,b);V(3.25,-.5,2.5,"#1a1a1a");V(3.25,.5,2.5,"#1a1a1a");V(3.25,0,2,"#e89aa0");
const tw=Math.sin(T*3)*.25;V(-1.75,tw,1.5,b);V(-2.25,tw,2,dk);V(-2.25,tw*1.5,2.5,b);V(-2,tw*2,3,dk);
if(G.cat&&G.cat.col==="calico"){V(-.25,-.5,1.5,C[1]);V(.25,.5,1.5,C[2]);V(2.25,.5,2.5,C[1])}}
/* 停電の描画 */
function darkDraw(s,T){if(!R.dark)return;if(R.dark._fr!==R.frN)darkHull(R.cv);cx.save();cx.globalCompositeOperation="lighter";
const glow=(o,r,cl)=>{const g=cx.createRadialGradient(o[0],o[1],0,o[0],o[1],r);g.addColorStop(0,cl);g.addColorStop(1,"rgba(0,0,0,0)");cx.fillStyle=g;cx.beginPath();cx.arc(o[0],o[1],r,0,7);cx.fill()};
R.people.forEach((p,i)=>{if(p.st==="sit"&&p.seat&&p.seat.p===p){const hc=hkCenter(p),fl=.8+.2*Math.sin(T*9+i);glow(P(hc.x,hc.y,7.6),s*4*fl,"rgba(255,90,30,.75)");glow(P(p.x,p.y,8.5),s*2.6,"rgba(120,170,255,.55)")}});cx.restore()}
/* 雨漏りの席：水たまりと水滴 */
function leakDraw(s,T){SEATS.forEach(st=>{if(!st.x)return;const o=P(st.px+2,st.Y0+3,0);cx.fillStyle="rgba(90,140,220,.45)";cx.beginPath();cx.ellipse(o[0],o[1],s*3,s*1.5,0,0,7);cx.fill();const ph=(T*1.3)%1,d=P(st.px+2,st.Y0+3,18*(1-ph));cx.fillStyle="rgba(150,190,255,.9)";cx.beginPath();cx.arc(d[0],d[1],s*.5,0,7);cx.fill()})}
/* ===== 特別イベント：宝くじ1等／シーシャフェス／シーシャバトル／ハロウィン ===== */
const shopNm=()=>(G.ow&&G.ow.shop)||((G.ow&&G.ow.name||"店長")+"の店");
const isHallo=()=>MN[G.month%12]===10&&G.wd===6;
const moneyTxt=v=>G.lotto?"∞":yen(v);
/* --- 宝くじ1等：毎朝 1/8192 で抽選・1回きり --- */
function lottoRoll(fr){if(admTake("lotto"))return true;if(fr)return false;return !G.lotto&&G.month>=1&&Math.random()<1/8192}
function lottoApply(){G.lotto=1;G.money=Math.max(G.money,0)+100000000;G.lottoM=G.money;if(G.loan)G.loan.bal=0;G.evDex=G.evDex||{};G.evDex[50]=(G.evDex[50]||0)+1;log("🎰 宝くじ1等！ ¥100,000,000 を手に入れた。借金はすべて返済、所持金は∞に");save();hud()}
function lottoScene(done){R.frz=1;const d=document.createElement("div");d.id="lotto";d.style.cssText="position:fixed;inset:0;z-index:80;background:rgba(0,0,0,0);transition:background 1.2s;display:flex;align-items:center;justify-content:center;flex-direction:column;color:#fff;text-align:center;padding:24px;font-weight:700";document.body.appendChild(d);
const say=(h,ms)=>new Promise(r=>{d.innerHTML=h;setTimeout(r,ms)}),T=(t,cls)=>`<div style="font-size:${cls||18}px;line-height:1.7;animation:ltin .5s ease">${t}</div>`;
(async()=>{await say("",2200);await say(`<div style="position:absolute;top:38%;left:50%;transform:translateX(-50%);background:rgba(255,255,255,.92);color:#2a2233;border-radius:14px;padding:8px 14px;font-size:15px">ん？おかしいな…</div>`,1600);
d.style.background="rgba(0,0,0,1)";await say("",1400);R.frz=0;
await say(T("そういえば宝くじを買ったんだっけ"),2200);await say(T("ガサゴソ…",20),1600);
await say(`<div style="font-size:24px;animation:ltsh .12s linear infinite">あ、あ、当たってる！？！？</div>`,2300);
lottoApply();await say(`<div style="font-size:16px;opacity:.85">一等</div><div style="font-size:40px;color:#ffd54a;text-shadow:0 0 18px #ffb300;animation:ltin .6s ease">¥100,000,000</div>`+T("一億円手に入れた！<br>借金はすべて返済、所持金は <b style='color:#ffd54a'>∞</b> に！",17),3200);
d.innerHTML=T("なお残りの金額は寄付して<br>いつも通りの日常を楽しむことにした",16)+`<button class="on" style="margin-top:22px;padding:10px 34px;font-size:15px">OK</button>`;d.querySelector("button").onclick=()=>{d.remove();done&&done()}})()}
/* --- シーシャフェス：知名度30超で、9月・3月の月末に30%（2回目以降20%）。休業なし（8日目扱い） --- */
function festRoll(fo){if(admTake("fest"))return true;if(fo)return false;const m=MN[G.month%12],o=G.ow;if(!o||(m!==9&&m!==3)||(o.fame||0)<=30)return false;if(G.festM===G.month)return false;G.festM=G.month;return Math.random()<(G.festN?.2:.3)}
function festApply(){const o=G.ow,gal=Math.round((o.star||0)*5000);evMoney(gal,"フェスのギャラ");o.fol+=10000;o.starB=(o.starB||0)+10;o.star=starOf(o);const fl=[];for(let i=0;i<3;i++){const f=flPick(5);if(f>=0){flUnlock(f,"フェスで出会った");fl.push(FL[f][0])}}
G.festN=(G.festN||0)+1;G.evDex=G.evDex||{};G.evDex[42]=(G.evDex[42]||0)+1;save();hud();return{gal,fl}}
function sceneK(W,H,yaw,pit,S,c0){const cp=Math.cos(pit),sp=Math.sin(pit),sa=Math.sin(yaw),ca=Math.cos(yaw),k={cx:-cp*sa,cy:cp*ca,cz:sp,rx:ca,ry:sa,ux:sa*sp,uy:-ca*sp,uz:cp,s:S,exx:S*ca,exy:-S*sa*sp,eyx:S*sa,eyy:S*ca*sp,ezy:-S*cp};
k.ox=W/2-S*((c0[0]-TX)*k.rx+(c0[1]-TY)*k.ry);k.oy=H*.6+S*((c0[0]-TX)*k.ux+(c0[1]-TY)*k.uy+(c0[2]-TZ)*k.uz);return k}
/* --- クラブ会場（フェス・大会で共用）：ブース5つ横並び、まん中が店主 --- */
const VB=(a,x,y,z,w,dd,h,c)=>{for(let i=0;i<w;i++)for(let j=0;j<dd;j++)for(let q=0;q<h;q++)a.push([x+i,y+j,z+q,typeof c==="function"?c(x+i,y+j,z+q):c])};
const CLX=[-22,-11,0,11,22];
function clubSet(hk){const st=[],B=(...q)=>VB(st,...q),X0=-30,X1=37,Y1=46;
B(X0,-8,-1,X1-X0,Y1+8,1,(x,y)=>y===4||x===X0?"#ff1744":["#5a4670","#64507c","#523f66"][((x%3)+3)%3]);
B(X0,-9,0,X1-X0,1,27,(x,y,z)=>z===0?"#ff2d55":"#3a2c4e");B(X0-1,-9,0,1,Y1+9,27,(x,y,z)=>z===0?"#ff2d55":(y%8===0&&z<20)?"#5a3a66":"#3a2a4a");
B(-12,-8,9,30,1,12,(x,y,z)=>{const m=x<3?2-x:x-3,v=((m-Math.abs(z-15))%6+6)%6;return m<1?"#0a1030":v<1?"#e6f7ff":v<2?"#3fa9f5":"#0a1030"});
for(const y of[-7,-1])B(X0+1,y,25,X1-X0-2,1,1,"#4a4a50");for(let x=X0+3;x<X1-2;x+=5)for(const y of[-7,-1]){B(x,y,23,2,1,2,"#111");B(x,y,22,2,1,1,"#ff1744")}
CLX.forEach((bx,i)=>{B(bx-1,0,0,8,3,5,(x,y)=>y===2&&(x-bx)%2===0?(i===2?"#ffd54a":"#e8f4ff"):"#141018");B(bx-1,0,5,8,3,1,"#2b2b30");const h=hk[i]||["#2f6fa8","#3d86c6"];
B(bx+4,0,6,2,2,1,h[0]);B(bx+4,0,7,2,2,2,h[1]);B(bx+4,0,9,1,1,3,"#c0c0c0");B(bx+4,0,12,2,2,1,"#ff7043")});
for(const [px,py] of[[X0+2,1],[X1-5,1]])B(px,py,0,3,3,8,(x,y,z)=>z===7?"#222":(x+y)%2?"#f2f7ff":"#121014");
for(const [px,py] of[[X0+2,20],[X1-5,22],[X0+3,36],[X1-6,38]]){B(px+1,py+1,0,1,1,10,"#2a2a2a");B(px,py,10,3,3,1,"#1a1a1d");B(px,py,0,3,3,1,"#1a1a1d")}
return st}
function clubBg(g,W,H){g.fillStyle="#24163a";g.fillRect(0,0,W,H);const r=g.createRadialGradient(W/2,H*.15,10,W/2,H*.2,W*.8);r.addColorStop(0,"rgba(255,80,140,.45)");r.addColorStop(1,"rgba(255,23,68,0)");g.fillStyle=r;g.fillRect(0,0,W,H)}
function clubPj(k,x,y,z){return[k.ox+k.s*((x-TX)*k.rx+(y-TY)*k.ry),k.oy-k.s*((x-TX)*k.ux+(y-TY)*k.uy+(z-TZ)*k.uz)]}
function clubBeams(g,k,t,C){g.save();g.globalCompositeOperation="lighter";let n=0;for(let x=-27;x<35;x+=5)for(const y of[-7,-1]){n++;if(n%2)continue;const a=clubPj(k,x+1,y+.5,22),fx=x+1+Math.sin(t*.9+n*1.7)*7,fy=y+12+Math.cos(t*.7+n)*8,b=clubPj(k,fx,fy,0),w=k.s*2.4;
const gr=g.createLinearGradient(a[0],a[1],b[0],b[1]);const col=C?C[n%C.length]:n%3===0?"120,90,255":"255,30,80";gr.addColorStop(0,`rgba(${col},.24)`);gr.addColorStop(1,`rgba(${col},.04)`);g.fillStyle=gr;g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0]-w,b[1]);g.lineTo(b[0]+w,b[1]);g.closePath();g.fill();
g.fillStyle=`rgba(${col},.2)`;g.beginPath();g.ellipse(b[0],b[1],w*1.1,w*.55,0,0,7);g.fill()}g.restore()}
/* 出場者・観客は黒と灰色のモブ（体型だけ一般客から借りる） */
function mobPool(){const L=G.cs.filter(c=>!["人外","シーシャ屋","芸能人"].includes(c.job)&&!(typeof spx==="function"&&spx(c)));return L.length?L:G.cs.slice()}
function clubRivals(){return mobPool().sort(()=>Math.random()-.5).slice(0,4)}
function clubCrowd(n){const s=mobPool().sort(()=>Math.random()-.5),o=[];for(let i=0;i<n;i++)o.push(s[i%s.length]);return o}
function mobify(t){if(t.length){const zs=t.map(v=>v[2]),z0=Math.min(...zs),g=["#6a6a74","#77777f","#5f5f69","#82828a"][Math.random()*4|0];t.forEach(v=>{const r=v[2]-z0;v[3]=r<3.5?"#1e1e22":r<8.2?g:"#2a2a30"});return t}t.forEach(v=>{const c=v[3];if(typeof c!=="string"||c[0]!=="#"||c.length<7)return;const r=parseInt(c.slice(1,3),16),g=parseInt(c.slice(3,5),16),b=parseInt(c.slice(5,7),16),l=(r*.3+g*.59+b*.11)/255,q=Math.round(l<.35?22+l*60:60+l*90).toString(16).padStart(2,"0");v[3]="#"+q+q+q});return t}
/* 会場シーン：lens[i]=ブースiの行列の長さ（i=2が店主）。行列は少しずつ伸びて、長いほど人気＝勝ちっぽく見える */
function clubScene({title,col,lead,rivals,lens,ms,result,done,ui,venue}){const OUT=venue==="fest";const d=document.createElement("div");d.id="club";d.style.cssText="position:fixed;inset:0;z-index:80;background:"+(OUT?"#0e2236":"#1a1030")+";display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff";
const W=Math.min(innerWidth,440),H=Math.min(innerHeight*(ui?.44:.62),520),dp=Math.min(2,window.devicePixelRatio||1);d.innerHTML=`<div style="font-size:22px;font-weight:800;color:${col};letter-spacing:2px;margin-bottom:6px;text-shadow:0 0 12px ${col}">${title}</div><canvas width="${W*dp}" height="${H*dp}" style="width:${W}px;height:${H}px;border-radius:14px"></canvas><div id="fsx" style="min-height:130px;margin-top:10px;width:${W}px;max-width:92vw"></div>`;document.body.appendChild(d);
const cv=d.querySelector("canvas"),g=cv.getContext("2d");g.setTransform(dp,0,0,dp,0,0);
const HK=[["#2f6fa8","#3d86c6"],["#7b1fa2","#9c27b0"],["#00897b","#26a69a"],["#c62828","#e53935"],["#5d4037","#8d6e63"]],st=OUT?festSet(HK):clubSet(HK);
const host=[...rivals.slice(0,2),G.ow?Object.assign({i:99},G.ow):OW.c,...rivals.slice(2)],hv=host.map((c,i)=>{const t=[];pv(t,CLX[i],-4,1,c,0,0);return i===2?t:mobify(t)});
const crowd=clubCrowd(lens.reduce((a,b)=>a+b,0)).map(c=>{const t=[];pv(t,0,0,1,c,0,2);return mobify(t)});let ci=0;const qs=lens.map(n=>Array.from({length:n},()=>crowd[ci++]));
const k=sceneK(W,H,-.18,.58,W/68,[3,17,-2]),T0=performance.now(),off=document.createElement("canvas");off.width=W*dp;off.height=H*dp;const og=off.getContext("2d");og.setTransform(dp,0,0,dp,0,0);
let raf,fin=false,shown=-1;const grow=ms/1000*.8,maxL=Math.max(...lens);
const bake=vis=>{og.clearRect(0,0,W,H);const a=st.slice();hv.forEach(v=>v.forEach(q=>a.push(q)));qs.forEach((q,i)=>q.slice(0,Math.min(q.length,vis)).forEach((vx,j)=>vx.forEach(v=>a.push([v[0]+CLX[i],v[1]+5+j*6,v[2],v[3],v[4],v[5]]))));
const oc=cx;cx=og;try{a.map(v=>({v,d:dep(v,k)})).sort((p,q)=>p.d-q.d).forEach(o=>dv(o.v,k))}finally{cx=oc}};
const draw=()=>{const t=(performance.now()-T0)/1000,vis=Math.min(maxL,Math.floor(t/grow*maxL));if(vis!==shown){shown=vis;bake(vis)}(OUT?festBg:clubBg)(g,W,H);g.drawImage(off,0,0,W,H);
for(let i=0;i<5;i++){const p=(t*.5+i/5)%1;if(p<.75){const s=clubPj(k,CLX[2]+4.5+Math.sin(i*2+t)*1.2,.5+p*2,13+p*7);g.fillStyle=`rgba(240,240,240,${.7-p*.8})`;g.beginPath();g.arc(s[0],s[1],k.s*(.6+p),0,7);g.fill()}}
if(!OUT)clubBeams(g,k,t);else{clubBeams(g,k,t,["62,230,255","255,79,216","255,225,74"]);festSun(g,W,H,t)}g.textAlign="center";host.forEach((c,i)=>{const nl=(window.CLL||[])[i];if(i!==2&&!nl)return;const a=clubPj(k,CLX[i]+3,1,i===2?22:15),me=i===2,s=me?shopNm():nl;g.font=(me?"bold 12px":"bold 10px")+" sans-serif";const w=g.measureText(s).width+10;g.fillStyle=me?"rgba(255,213,74,.95)":"rgba(20,12,30,.8)";g.beginPath();g.roundRect?g.roundRect(a[0]-w/2,a[1]-13,w,17,8):g.rect(a[0]-w/2,a[1]-13,w,17);g.fill();g.fillStyle=me?"#2a1a00":"#fff";g.fillText(s,a[0],a[1])});if(!fin)raf=requestAnimationFrame(draw)};draw();
const fx=d.querySelector("#fsx");if(ui){ui(fx,()=>{fin=true;cancelAnimationFrame(raf);window.CLL=null;d.remove();done&&done()});return}fx.innerHTML=`<div style="text-align:center;font-size:15px;line-height:1.7">${lead}</div>`;
fx.innerHTML+=`<button class="on" id="clres" style="width:100%;margin-top:12px;padding:12px">結果を見る</button>`;fx.querySelector("#clres").onclick=()=>{fx.innerHTML=`<div style="background:#fffdf6;color:#2a2233;border-radius:14px;padding:12px 14px;font-size:14px;line-height:1.75">${result()}<button class="on" id="clok" style="width:100%;margin-top:10px">OK</button></div>`;fx.querySelector("#clok").onclick=()=>{fin=true;cancelAnimationFrame(raf);d.remove();done&&done()}}}
/* --- シーシャフェス：行列の長さは演出だけ（スター性が高いほど長くなりやすい） --- */
function festScene(done){const o=G.ow||{},lo=Math.max(2,Math.min(8,2+Math.round((o.star||0)/100*6)+(Math.random()<.5?0:1)));const lens=[0,0,lo,0,0].map((v,i)=>i===2?v:1+Math.floor(Math.random()*7)),sn=esc(shopNm());
clubScene({title:"🎪 シーシャフェス 🎪",col:"#ffd54a",lead:`「${sn}」のブースに行列ができてる…！<br>どんどん作るぞ！`,rivals:clubRivals(),lens,ms:7000,done,result:()=>{const r=festApply();
return`<div style="font-weight:800;font-size:16px;margin-bottom:4px">🎉 「${sn}」フェス出店おつかれさま！</div>ギャラ：<b>${moneyTxt(r.gal)}</b>（スター性×5,000円）<br>フォロワー <b>+10,000</b>／スター性 <b>+10</b><br>新しいフレーバー：<b>${r.fl.length?r.fl.map(esc).join("・"):"（もう全部持っていた）"}</b>`}})}
/* --- シーシャの大会（バトル）：6・9・12・3月の月末に50%（一度優勝したら10%）。8日目扱い・休業なし --- */
function battleRoll(fo){if(admTake("bat"))return true;if(fo)return false;const m=MN[G.month%12];if(!G.ow||![6,9,12,3].includes(m)||G.batM===G.month)return false;G.batM=G.month;return Math.random()<(G.batW?.1:.5)}
function battleRank(){const s=G.ow.skill||0,w=Math.max(.1,Math.min(.8,.1+(s-10)/80*.7));if(Math.random()<w)return 1;if(Math.random()<Math.min(.9,s/100))return 2;return 3+Math.floor(Math.random()*7)}
function battleApply(rk){const o=G.ow,big=o.fol>=10000;let m="";if(rk===1){evMoney(200000,"大会の賞金");const f=Math.max(2000,Math.round(o.fol*.1));o.fol+=f;G.batW=(G.batW||0)+1;m=`賞金 <b>${moneyTxt(200000)}</b><br>フォロワー <b>+${f.toLocaleString()}</b>`}
else if(rk===2){evMoney(50000,"大会の賞金");const f=Math.max(500,Math.round(o.fol*.03));o.fol+=f;m=`賞金 <b>${moneyTxt(50000)}</b><br>フォロワー <b>+${f}</b>`}else{m="賞金なし…次こそ優勝を目指そう"}
o.star=starOf(o);G.evDex=G.evDex||{};G.evDex[40]=(G.evDex[40]||0)+1;save();hud();return m}
function battleScene(done){const rk=battleRank(),rest=[1,2,3,4,5,6,7,8,9].filter(r=>r!==rk),must=rest.filter(r=>r<rk).slice(0,2),pool=rest.filter(r=>!must.includes(r)).sort(()=>Math.random()-.5),oth=[...must,...pool].slice(0,4).sort(()=>Math.random()-.5);
const ranks=[oth[0],oth[1],rk,oth[2],oth[3]],lens=ranks.map(r=>Math.max(1,9-r)),rivals=clubRivals(),host=[rivals[0],rivals[1],null,rivals[2],rivals[3]],win=ranks.indexOf(1);
clubScene({title:"🏆 シーシャバトル 🏆",col:"#ff4d7a",lead:`「${esc(shopNm())}」として出場！出場者は9人。<br>審査員と観客がブースに並んでいく…`,rivals,lens,ms:8000,done,result:()=>{const m=battleApply(rk);
const sn=esc(shopNm()),head=rk===1?`🏆 「${sn}」優勝！！`:rk===2?`🥈 「${sn}」準優勝！`:`😢 「${sn}」は${rk}位…`,wn="";
return`<div style="font-weight:800;font-size:17px;margin-bottom:2px">${head}</div>${wn}${m}`}})}
/* 月末（7日目の営業のあと・精算の前）に入る「8日目」：大会→フェスの順 */
function day8(cb,fo){const q=[],sn=shopNm(),D=G.evDex||{};if(battleRoll(fo))q.push(f=>{log("🏆 シーシャバトルに出場！");evPop({r:4,n:"シーシャバトルに出場",tx:`「${sn}」がシーシャバトルに出場することになった！`,ef:"会場はクラブ。8人のトーナメント（エントリー料¥10,000）。お題に合うフレーバー選びと火加減で勝負"},null,!D[40],()=>battleScene(f))});
if(festRoll(fo))q.push(f=>{log("🎪 シーシャフェスに出店！");evPop({r:5,n:"シーシャフェスにお呼ばれ",tx:`「${sn}」がシーシャフェスにお呼ばれした！`,ef:"会場はネオンのクラブ。行列のお客さんにどんどん作ってふるまおう。「美味しい！」で知名度・スター性アップ"},null,!D[42],()=>festScene(f))});if(!q.length)return false;
const nx=()=>{const f=q.shift();if(f)f(nx);else cb()};nx();return true}
/* --- ハロウィン：10月の7日目 --- */
function halloOn(){R.hallo=1;G.cs.forEach(c=>{c.pump=(c.rar|0)<=3&&c.act?1:0});OW.c.pump=1;if(OW._pc)OW._pc=null}
function halloOff(){if(!R.hallo&&!OW.c.pump)return;R.hallo=0;G.cs.forEach(c=>{c.pump=0});OW.c.pump=0;OW._pc=null}
function halloPop(cb){evPop({r:3,n:"ハロウィン",tx:"🎃 今日はハロウィン！",ef:"お客さん（★1〜3）がカボチャ頭で来店。★4・5のお客さんは今日は来ない。店主もカボチャ頭。来店率+20%"},null,0,cb)}
/* ===== 管理者モード（店主を10回連続タップ）：次の営業日に起こすイベントのフラグ ===== */
function admTake(k){const f=G.admF;if(!f||!f[k])return 0;const v=f[k];f[k]=0;save();return v}
function admPreAny(){const f=G.admF;return !!(f&&(f.pre||f.lotto||f.hallo))}
const ADMS=[["lotto","🎰 宝くじ1等","次の開店前"],["hallo","🎃 ハロウィン","次の営業日"],["bat","🏆 シーシャバトル","次の営業日の閉店後"],["fest","🎪 シーシャフェス","次の営業日の閉店後"]];
function admPanel(){G.admF=G.admF||{};const old=$("#adm");if(old)old.remove();const d=document.createElement("div");d.id="adm";d.style.cssText="position:fixed;inset:0;z-index:90;background:rgba(10,6,18,.8);display:flex;align-items:center;justify-content:center;padding:12px";
const draw=()=>{const f=G.admF,btn=(on,k,v,t,sub)=>`<button data-ad="${k}" data-av="${v}" style="display:block;width:100%;text-align:left;margin:3px 0;padding:7px 10px;border-radius:10px;border:1.5px solid ${on?"#7b4fd6":"#ddd"};background:${on?"#efe6ff":"#fff"};font-size:13px">${on?"✅ ":""}${t}${sub?`<span style="color:#8a8094;font-size:11px">　${sub}</span>`:""}</button>`;
const ls=tp=>EV.filter(e=>e.t===tp&&![40,42,50].includes(e.id)).map(e=>btn(f[tp]===e.id,tp,e.id,`No.${String(e.id).padStart(2,"0")} ${esc(e.n)}`,"★".repeat(e.r)+(e.cond?"　条件："+esc(e.cond):""))).join("");
d.innerHTML=`<div style="background:#fffdf6;color:#2a2233;border-radius:16px;padding:14px;width:100%;max-width:420px;max-height:88vh;overflow:auto"><div style="font-weight:800;font-size:17px">🛠 管理者モード</div><div style="font-size:12px;color:#6f6680;margin:2px 0 8px">フラグを立てたイベントは次の営業日に起こります（開店前・営業中はそれぞれ1つまで）。条件つきの営業中イベントは、条件がそろうまで待ってから起こります</div>
<button data-ad="call" style="display:block;width:100%;margin:2px 0 8px;padding:9px 10px;border-radius:10px;border:1.5px solid #7b4fd6;background:#7b4fd6;color:#fff;font-weight:700;font-size:14px">👥 来店客を選ぶ</button><div style="font-weight:700;margin-top:6px">特別イベント</div>${ADMS.map(([k,t,s])=>btn(f[k],k,1,t,s)).join("")}
<div style="font-weight:700;margin-top:10px">開店前のイベント</div>${ls("pre")}<div style="font-weight:700;margin-top:10px">営業中のイベント</div>${ls("run")}
<div style="display:flex;gap:8px;margin-top:12px;position:sticky;bottom:0;background:#fffdf6;padding-top:6px"><button data-ad="clr" style="flex:1;padding:10px;border-radius:10px">全部はずす</button><button class="on" data-ad="x" style="flex:2;padding:10px">閉じる</button></div></div>`};draw();document.body.appendChild(d);
d.onclick=e=>{const b=e.target.closest("[data-ad]");if(!b)return;const k=b.dataset.ad,f=G.admF;if(k==="x"){d.remove();save();log("🛠 管理者モード：フラグ "+admList());if(R.phase==="prep"&&admPreAny())evMorning();return}if(k==="call"){d.remove();save();callPanel();return}
if(k==="clr")G.admF={};else{const v=+b.dataset.av;f[k]=f[k]===v?0:v}save();const sc=d.firstElementChild.scrollTop;draw();d.firstElementChild.scrollTop=sc}}
function admList(){const f=G.admF||{},o=[];ADMS.forEach(([k,t])=>{if(f[k])o.push(t)});["pre","run"].forEach(k=>{if(f[k]){const e=EV.find(q=>q.id===f[k]);if(e)o.push(e.n)}});return o.length?o.join("・"):"なし"}
