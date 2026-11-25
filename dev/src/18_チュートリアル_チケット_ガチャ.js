/* ===== UIテスト版：上部メーター・折りたたみ要約 ===== */
{const _hud=hud;let lt=0;
hud=function(){_hud();const now=performance.now();if(now-lt<250)return;lt=now;
const run=R.phase==="run",ps=R.people.filter(p=>p.c&&p.st!=="out");
document.querySelectorAll("[data-t]").forEach(x=>{x.disabled=run&&x.dataset.t!=="shop"});
$("#mtc").textContent=run?ps.filter(p=>p.st==="sit"||p.st==="drink"||p.st==="go"||p.st==="ret").length+"/"+SEATS.length:"—";
$("#mts").textContent=run?"¥"+(R.st.sales||0).toLocaleString():"—";
if(run&&ps.length){const m=ps.reduce((a,p)=>a+(p.c.hp-p.c.up),0)/ps.length,v=Math.max(0,Math.min(100,50+m/2));$("#mth").textContent=v>=65?"良い":v>=40?"普通":"不満";const b=$("#mthb");b.style.width=v+"%";b.style.background=v>=65?"#7bd389":v>=40?"#e0c34a":"#e06a5a"}else{$("#mth").textContent="—";$("#mthb").style.width="0"}
if(run){const S=Math.round(R.smoke);$("#mtk").textContent=(R.vent>0?"換気中 ":"")+(S>=60?"煙たい":S>=30?"少し":"快適");const b=$("#mtkb");b.style.width=Math.min(100,S)+"%";b.style.background=S>=60?"#e06a5a":S>=30?"#e0c34a":"#7bd389"}else{$("#mtk").textContent="—";$("#mtkb").style.width="0"}
{const v=Math.round(G.mot==null?100:G.mot),e=$("#mtm");if(e){e.textContent=v>=60?"元気":v>=30?"ふつう":v>=10?"しんどい":"限界";const b=$("#mtmb");b.style.width=v+"%";b.style.background=v>=60?"#ff9f43":v>=30?"#e0c34a":"#e06a5a"}}
if($("#go").textContent==="営業開始")$("#go").textContent="▶ 営業開始";
const vb=$("#vent");vb.textContent=R.vent>0?"🌀 換気中":R.vcd>0&&run?"🌀 "+Math.ceil(R.vcd)+"分":"🌀 換気";
const o=G.ow;if(o)$("#s-own").textContent=o.acted?"今日は実行済み":"今日の行動がまだです";
{const w=WXI[G.wx[G.wd]];$("#s-fin").textContent=w[0]+" "+w[1]+"・今週 "+yen(G.week.reduce((a,d)=>a+d.sales,0))}
$("#s-frc").textContent=G.menu.length+"/"+FTYPES+"種類";
$("#s-set").textContent=G.open+":00〜"+(G.close%24)+":00";
}}
ratm=function(){const a=atmo();$("#atm").innerHTML=TAGS.map(k=>`<span>${TL[k]} ${a[k]}</span>`).join("")};
try{ratm()}catch(e){}

/* ===== チュートリアル ===== */
if(G.setup&&G.tut===undefined)G.tut=99;
let TUT=null;
let TUTN=0;const TUTMAX=7;
function tutSmokeDefs(){if($("#tutdefs"))return;document.body.insertAdjacentHTML("beforeend",'<svg id="tutdefs" width="0" height="0" style="position:absolute"><defs><filter id="tsm" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="4" result="n"><animate attributeName="seed" values="4;5;6;5;4" dur="6s" repeatCount="indefinite"/></feTurbulence><feDisplacementMap in="SourceGraphic" in2="n" scale="14" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation="5"/></filter><filter id="tsm2" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency="0.02 0.035" numOctaves="2" seed="9" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="10" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation="1.6"/></filter></defs></svg>')}
function tutCard(txt,btn,hl,cb,op){tutOff();tutSmokeDefs();if(!op)TUTN=G.tut===1?1:G.tut===2?(TUTN<2||TUTN>=5?2:TUTN+1):G.tut===3?6:G.tut===4?7:Math.min(TUTMAX,TUTN+1);const d=document.createElement("div");d.id="tut";
const tt=op&&op.tt?op.tt:["🌅 開店前の行動","☰ メニュー","🪴 装飾","📖 図鑑","▶ 営業開始","🙋 お客さんが来た！","🥤 フリードリンク"][TUTN-1]||"";
d.innerHTML=`<div class="tc"><svg class="tsv"></svg><div class="tin">${tt?`<div class="tt">${tt}</div>`:""}<div class="tx">${txt}</div>${op?"":`<div class="tdot">${Array.from({length:TUTMAX},(_,i)=>`<i class="${i<TUTN?"on":""}"></i>`).join("")}</div>`}<div class="trow">${op?"<span></span>":`<button id="tutskip" class="tsk">スキップ</button>`}<button id="tutok">${btn&&btn!=="OK"?btn:"わかった"}</button></div></div></div>`;document.body.appendChild(d);
{const c=d.querySelector(".tc"),s=d.querySelector(".tsv"),w=c.offsetWidth,h=c.offsetHeight,P=40;s.setAttribute("viewBox",`0 0 ${w+P*2} ${h+P*2}`);s.style.cssText=`left:${-P}px;top:${-P}px;width:${w+P*2}px;height:${h+P*2}px`;
const C="#f4f1fa";s.innerHTML=`<g filter="url(#tsm)" opacity=".6"><rect x="${P-4}" y="${P-4}" width="${w+8}" height="${h+8}" rx="30" fill="none" stroke="${C}" stroke-width="22"/></g><g filter="url(#tsm2)" opacity=".8"><rect x="${P-2}" y="${P-2}" width="${w+4}" height="${h+4}" rx="28" fill="none" stroke="${C}" stroke-width="5"/></g><g filter="url(#tsm)" opacity=".55" class="twisp"><path d="M${P+54} ${P+4} C${P+44} ${P-26} ${P+74} ${P-36} ${P+64} ${P-61}" stroke="${C}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M${P+w-50} ${P+6} C${P+w-38} ${P-18} ${P+w-60} ${P-30} ${P+w-46} ${P-52}" stroke="${C}" stroke-width="12" fill="none" stroke-linecap="round"/></g>`}
if(hl){const e=$(hl);if(e)e.classList.add("tuthl")}TUT={hl,cb}}
function tutOff(){const d=$("#tut");if(d)d.remove();if(TUT&&TUT.hl){const e=$(TUT.hl);if(e)e.classList.remove("tuthl")}TUT=null}
document.addEventListener("click",e=>{const b=e.target.closest("#tutok,#tutskip");if(!b||(b.id!=="tutok"&&b.id!=="tutskip"))return;e.stopPropagation&&e.stopPropagation();const t=TUT;tutOff();if(b.id==="tutskip"){if(R.tutSp!=null){const sp=R.tutSp||1;R.speed=sp;R.tutSp=null;document.querySelectorAll("[data-s]").forEach(x=>x.classList.toggle("on",+x.dataset.s===sp))}G.tut=99;save();return}if(t&&t.cb)t.cb()},true);
function tutTick(){if(!G.setup||TUT)return;const ovOn=!$("#ov").hidden;try{seatChk()}catch(e){}
if(G.tutSeat===1&&!ovOn&&R.phase==="prep"){tutCard("増築が解禁されたので、<b>客席</b>を増やせるようになりました！<br>☰ → 🪴装飾 → <b>🛋 客席</b> から、ソファ・ボックス席・カウンター席・ビーズクッションを置けます（1ヶ月に3個まで・置物とは別）。<br>席が多いほど、一度に入れるお客さんが増えます。<br>置いた家具は <b>🔧 模様替え</b> で、移動・回転・売却ができます（開店前だけ）","わかった","#menu",()=>{G.tutSeat=2;save()},{tt:"🛋 客席が解禁！"});return}
if(G.tut>=99)return;
if(G.tut===1&&ovOn&&$("#ov").textContent.includes("開店前")){tutCard("🌅 <b>開店前</b>に、1日1回だけ<b>行動</b>ができます。<br>📱 SNS更新で知名度とフォロワー、🔥 練習で技術が上がります。<br>知名度・スター性・技術が上がると、<b>新しい置物やフレーバー</b>が解禁されます！","わかった",null,()=>{G.tut=2;save()});return}
if(G.tut===2&&!ovOn&&R.phase==="prep"){const sh=$("#sheet");
tutCard("左下の <b>☰</b> でメニューを開けます","次へ","#menu",()=>{if(sh)sh.classList.add("open");setTab("deco");
tutCard("🪴 <b>装飾</b>タブでは、お店に<b>置物</b>を置けます。<br>置物の雰囲気（ゴージャス・サブカル・アジアン・幻想・パリピ）に応じて、その雰囲気が好きなお客さんが来やすくなります","次へ","[data-t=deco]",()=>{setTab("dex");
tutCard("📖 <b>図鑑</b>では、出会ったお客さんやフレーバーを確認できます。<br>仲良くなるほど、お客さんの情報が解禁されていきます","次へ","[data-t=dex]",()=>{setTab("shop");if(sh)sh.classList.remove("open");
tutCard("準備ができたら <b>営業開始</b>！","OK","#go",()=>{G.tut=3;save()})})})});return}
if(G.tut===3&&R.phase==="run"&&R.people.some(p=>p.st==="sit")){R.tutSp=R.speed||1;R.speed=0;tutCard("🙋 お客さんが来た！<br>お客さんを<b>タップ</b>して話しかけると、<b>友好度</b>が上がります。<br>ただし<b>話しかけすぎ</b>には注意！不満がたまってしまいます","OK",null,()=>{const sp=R.tutSp||1;R.speed=sp;R.tutSp=null;document.querySelectorAll("[data-s]").forEach(x=>x.classList.toggle("on",+x.dataset.s===sp));G.tut=4;save()});return}
if(G.tut===4&&R.phase==="run"&&R.people.some(p=>p.drk&&p.st==="go")){R.tutSp=R.speed||1;R.speed=0;tutCard("🥤 お客さんが<b>フリードリンク</b>を取りに行った！<br>冷蔵庫には<b>6種類まで</b>ドリンクを置けます（☰ → 営業タブの「ドリンクメニュー」）。<br><b>補充はいりません</b>。飲まれた分の原価は<b>月末にまとめて</b>払います。<br>お客さんには<b>好きなドリンク</b>があり、置いてあると喜び、ないと少し不満がたまります","OK",null,()=>{const sp=R.tutSp||1;R.speed=sp;R.tutSp=null;document.querySelectorAll("[data-s]").forEach(x=>x.classList.toggle("on",+x.dataset.s===sp));G.tut=5;save()});return}}
{const _h2=hud;hud=function(){_h2();try{tutTick()}catch(e){}}}

/* ===== まだ触っていないメニュー項目に⚠️、初めて開いたら詳しい説明 ===== */
const SEEN={"t:deco":["🪴 装飾","空いているマスをタップすると置物を置けます（1回置くと選択が外れます）。<br>置いた置物は<b>🔧 模様替え</b>から、移動・回転・しまう（📦 持ち物へ）ができます（開店前だけ）。<br>🔒の置物は、知名度・スター性・技術・増築・営業月数で解禁されます。壁アイテムや床・壁紙もここで変えられます"],
"t:dex":["📖 図鑑","<b>👥 お客さん</b>：出会ったお客さんの情報です。話しかけて親密度が上がるほど、好きなフレーバーや性格などが解禁されます。<br><b>🍃 フレーバー</b>：解禁したフレーバーと、それが好きなお客さんを確認できます"],
"d-own":["🧑‍🍳 店主の行動","開店前に1日1回だけ行動できます。<br>📱 SNS更新：知名度とフォロワーが上がる（たまにバズる）<br>🔥 練習：技術が上がり、美味しい一本が出やすくなる。新しいフレーバーも解禁<br>🧹 掃除：床をなぞって汚れを落とす。きれいだと口コミが良くなる<br>🚶 視察（月1回）：その日は休業。技術と知名度が上がり、フレーバーが見つかることも"],
"d-log":["📝 ログ","お店で起きたことが新しい順に記録されます。来店・注文・味の評価・解禁などを確認できます"],
"d-fin":["📊 経営・天気","今週の売上や天気、借入の残り、家賃などが見られます。<br>7日目の営業後に1か月分の精算があり、所持金がマイナスになると廃業です"],
"d-frc":["🥤 ドリンクメニュー","冷蔵庫に置くドリンクを<b>6種類まで</b>選べます。補充はいりません。<br>飲まれた分の原価は月末にまとめて払います。<br>お客さんの好きなドリンクがないと、少し不満がたまります（営業中は変更できません）"],
"d-set":["⚙️ 営業時間・その他","開店・閉店の時刻を決められます（営業中は変更できません）。<br>閉店の1時間前に入店が止まり、閉店時刻で全員帰ります。<br>平日は夜、金曜の夜と土日は特にお客さんが来やすくなります。<br><br><b>営業時間が長いほど…</b><br>💡 光熱費が増えます（10時間を基準に、1時間ごとに±10%）<br>🌙 0時を過ぎると店長が疲れて、美味しい一本が出にくくなります"]};
function seenEl(k){return k.startsWith("t:")?document.querySelector('[data-t="'+k.slice(2)+'"]'):document.querySelector("#"+k+" > summary")}
function warnTick(){if(!G.setup)return;G.seen=G.seen||{};const on=G.tut>=3;let any=false;for(const k in SEEN){const e=seenEl(k);if(!e)continue;const w=on&&!G.seen[k];e.classList.toggle("warnm",w);if(w)any=true}const m=$("#menu");if(m)m.classList.toggle("warnm",any);
const ar=$("#tutarw"),need=G.tut>=3&&!G.arw&&R.phase==="prep"&&!G.decor.length&&!(($("#sheet")||{}).classList||{contains:()=>0}).contains("open")&&$("#ov").hidden&&!TUT;
if(R.phase==="run"&&G.tut>=3&&!G.arw){G.arw=1;save()}
if(need&&!ar){const d=document.createElement("div");d.id="tutarw";d.innerHTML='<div class="b">開店の準備をしよう！</div><div class="a">⬇</div>';document.body.appendChild(d)}else if(!need&&ar)ar.remove();
const a2=$("#tutarw");if(a2&&m){const r=m.getBoundingClientRect();a2.style.left=(r.left+r.width/2-22)+"px";a2.style.top=(r.top-8)+"px"}}
document.addEventListener("click",e=>{{const mb=e.target.closest("#menu");if(mb&&mb.id==="menu"&&G.tut>=3&&!G.arw){G.arw=1;save()}}
const t0=e.target.closest("[data-t]"),t=t0&&t0.dataset&&t0.dataset.t?t0:null,s0=e.target.closest("details.cd > summary"),sm=s0&&s0.tagName==="SUMMARY"?s0:null;let k=null;if(t&&SEEN["t:"+t.dataset.t])k="t:"+t.dataset.t;else if(sm&&sm.parentElement&&SEEN[sm.parentElement.id])k=sm.parentElement.id;
if(!k||!G.setup||G.tut<3)return;G.seen=G.seen||{};if(G.seen[k])return;G.seen[k]=1;save();const v=SEEN[k];setTimeout(()=>tutCard(v[1],"わかった",null,null,{tt:v[0]}),120)});
{const _h3=hud;hud=function(){_h3();try{warnTick()}catch(e){}}}

/* ===== トースト ===== */
function toast(t,ms){let w=$("#toastw");if(!w){w=document.createElement("div");w.id="toastw";document.body.appendChild(w)}const d=document.createElement("div");d.className="toast";d.innerHTML=t;w.appendChild(d);setTimeout(()=>{d.style.opacity="0";d.style.transform="translateY(-8px)"},ms||3200);setTimeout(()=>d.remove(),(ms||3200)+500)}
/* ===== 好きなフレーバーの告知（図鑑で好物が見えている客は名前、見えていなければ伏せる） ===== */
function flFavNote(i){const A=G.cs.filter(c=>c.fl===i&&!spx(c)),kn=A.filter(c=>c.met&&lv(c)>2),f=FL[i];if(!f)return;
if(kn.length){const ns=kn.slice(0,3).map(c=>nm(c)==="？？？"?"No."+dxNo(c)+"のお客さん":nm(c)+"さん").join("、")+(kn.length>3?" ほか"+(kn.length-3)+"人":"");log("💕 「"+f[0]+"」は "+ns+" の好きなフレーバーです！");toast("🍃 「"+esc(f[0])+"」解禁！<br>💕 "+esc(ns)+" の好きなフレーバーです")}
else if(A.some(c=>c.act)){log("💭 「"+f[0]+"」は誰かの好きなフレーバーみたい…");toast("🍃 「"+esc(f[0])+"」解禁！<br>💭 誰かの好きなフレーバーみたい…")}}
/* ===== 雲紅亭珍光：出て行っては戻ってくる。その間は時間が止まり、新しいお客さんも来ない ===== */
const UKO=-46,UKI=4,UKMAX=10,UKL=["帰ります","本当に帰ります","帰りますね","髪切った？","もう来ないよ？","でさ〜ね〜","ママ…","もうええて！","ジェニファーロペスで〜す","帰るねw"];
function ukMove(p,dt){const u=p.uk;if((u.ph==="r0"||u.ph==="r")&&(p.bt>0||p.bq))return true;if(u.ph==="r0"){u.ph="o";p.path=u.op;return false}
if(u.w>0){u.w-=dt;if(u.w>0)return true;u.w=0;
if(u.ph==="w"){if(u.lv){p.uk=null;p.path=[[-8,UKO-16]];log("🚪 "+nm(p.c)+" は本当に帰った（戻ってきた回数 "+u.n+"回）");return false}u.ph="b";p.path=[[-8,15],[UKI,15]];return false}
if(u.ph==="r"){u.lv=u.n>=2&&(u.n>=UKMAX||Math.random()<.5);u.ph="o";p.path=[[2,15],[-8,15],[-8,UKO]];return false}}
if(p.path.length)return false;
if(u.ph==="o"){u.ph="w";u.w=.5;p.dir=1;return true}
if(u.ph==="b"){u.n++;NOGOBI=1;sayX(p,UKL[Math.min(UKL.length,u.n)-1]);NOGOBI=0;u.ph="r";u.w=.3;p.dir=1;return true}
return false}
/* ===== 強制来店（管理者の「来店客を選ぶ」・招待チケット） ===== */
function fcGroups(ids){const used=new Set(),out=[];ids.forEach(i=>{if(used.has(i))return;const g=GROUPS.find(m=>m.includes(i))||[i];g.forEach(j=>used.add(j));out.push(g.slice())});return out}
function fcPush(grs,why){const ids=new Set(grs.flat());R.sched=R.sched.map(e=>e.force?e:Object.assign({},e,{m:e.m.filter(c=>!ids.has(c.i))})).filter(e=>e.m.length);let t=Math.ceil(R.t)+2;grs.forEach(g=>{const m=g.map(j=>G.cs[j]).filter(c=>c&&!R.people.some(p=>p.c===c&&p.st!=="out"));if(!m.length)return;m.forEach(c=>{c.act=1});R.sched.push({at:t,m,force:1,why});t+=3});R.sched.sort((a,b)=>a.at-b.at)}
function forceCall(ids,why){const grs=fcGroups(ids);grs.flat().forEach(i=>{G.cs[i].act=1});
if(R.phase==="run"&&!R.closed){fcPush(grs,why);log("👥 "+grs.flat().length+"人がまもなく来店します")}
else{G.fcall=(G.fcall||[]).concat(grs.map(g=>({g,why})));log("👥 "+grs.flat().length+"人が次の営業開始直後に来店します")}save()}
function fcInject(){const L=G.fcall||[];if(!L.length)return;G.fcall=[];L.forEach(x=>fcPush([x.g],x.why));save()}
function callPanel(){const old=$("#admc");if(old)old.remove();const d=document.createElement("div");d.id="admc";d.className="xpan";const sel=new Set();
d.innerHTML=`<div class="xin"><div class="xh">👥 来店客を選ぶ</div><div class="xs">選んだお客さんは必ず来店します（来店頻度・出現条件・満席は無視。満席なら席が空くまで外で待ちます）。営業中ならすぐ、開店前なら開店直後に来ます</div><input id="admq" placeholder="名前・番号・職業で検索" style="width:100%;box-sizing:border-box;margin:6px 0"><div id="admcl" class="xl"></div><div class="xb"><button data-cx="back" style="flex:1">戻る</button><button data-cx="go" class="on" style="flex:2" id="admgo">呼ぶ（0人）</button></div></div>`;document.body.appendChild(d);
const draw=()=>{const q=($("#admq").value||"").trim();$("#admcl").innerHTML=G.cs.filter(c=>!q||(c.name+(c.nick||"")+c.job+dxNo(c)).includes(q)).map(c=>`<label class="xr ${sel.has(c.i)?"on":""}"><input type="checkbox" data-ci="${c.i}" ${sel.has(c.i)?"checked":""}><span class="sw" style="background:${c.shirt}"></span><b>No.${dxNo(c)}</b> ${esc(c.name)}<small>${esc(c.job)}${c.rar?" ★"+c.rar:""}${c.met?"":"・未登録"}${GROUPS.some(m=>m.includes(c.i))?"・グループ客":""}</small></label>`).join("");$("#admgo").textContent="呼ぶ（"+sel.size+"人）"};draw();
$("#admq").oninput=draw;d.onchange=e=>{const i=e.target.dataset.ci;if(i==null)return;const n=+i;if(e.target.checked)sel.add(n);else sel.delete(n);e.target.closest("label").classList.toggle("on",e.target.checked);$("#admgo").textContent="呼ぶ（"+sel.size+"人）"};
d.onclick=e=>{const b=e.target.closest("[data-cx]");if(!b)return;if(b.dataset.cx==="back"){d.remove();admPanel();return}if(!sel.size){toast("お客さんを選んでください");return}const ids=[...sel];ids.forEach(i=>{const c=G.cs[i];if(!c.met){c.met=1;c.fp+=2}});forceCall(ids,"🛠 管理者が呼んだお客さんが来店");d.remove();toast("👥 "+ids.length+"人を呼びました"+(R.phase==="run"&&!R.closed?"":"（開店直後に来店）"));try{rdex()}catch(e){}}}
/* 顔アイコン（図鑑と同じ顔をキャッシュして一覧に出す） */
const FACEC={};function faceFill(root){const L=[...root.querySelectorAll("img.xf:not([src])")];let k=0;const step=()=>{if(!root.isConnected)return;let cv=$("#fcache");if(!cv){cv=document.createElement("canvas");cv.id="fcache";cv.width=cv.height=120;cv.style.display="none";document.body.appendChild(cv)}for(let n=0;n<6&&k<L.length;n++,k++){const im=L[k],i=+im.dataset.fi;if(!FACEC[i]){try{drawFace("#fcache",G.cs[i]);{const g=cv.getContext("2d"),im=g.getImageData(0,0,120,120),a=im.data;for(let q=0;q<a.length;q+=4)if(Math.abs(a[q]-239)<3&&Math.abs(a[q+1]-230)<3&&Math.abs(a[q+2]-218)<3)a[q+3]=0;g.putImageData(im,0,0)}FACEC[i]=cv.toDataURL()}catch(e){FACEC[i]=""}}if(FACEC[i])im.src=FACEC[i]}if(k<L.length)setTimeout(step,0)};setTimeout(step,0)}
/* ===== 招待チケット ===== */
const TIXM=[30,60,80,100,120,130,140],tixNm=c=>{const n=nm(c);return n==="？？？"?"No."+dxNo(c):n};
function tixChk(){if(!G.setup)return;G.tix=G.tix||0;G.tixAw=G.tixAw||0;const met=G.cs.filter(c=>c.met).length;while(G.tixAw<TIXM.length&&met>=TIXM[G.tixAw]){G.tix++;log("🎟 図鑑が"+TIXM[G.tixAw]+"人に！ご褒美で招待チケットを1枚もらった");toast("🎟 図鑑 "+TIXM[G.tixAw]+"人達成！<br>ご褒美に招待チケットを1枚プレゼント");G.tixAw++;save()}}
function tixPanel(){const old=$("#tixp");if(old)old.remove();G.tix=G.tix||0;const d=document.createElement("div");d.id="tixp";d.className="xpan";let pick=null;
const nx=TIXM.find(m=>m>G.cs.filter(c=>c.met).length),pre=R.phase==="prep"&&G.setup&&!G.over,used=G.invD===G.day,q=G.fcall&&G.fcall.some(x=>x.tix);
const why=!pre?"招待チケットは開店前に使えます":used?"今日はもう招待しました（1日1枚まで）":G.tix<=0?"チケットがありません":"";
d.innerHTML=`<div class="xin"><div class="xh">🎟 招待チケット　<span style="font-size:14px">×${G.tix}</span></div><div class="xs">開店前に使うと、営業開始と同時に選んだお客さんが来てくれます（1日1枚まで・図鑑に登録済みのお客さんだけ）。<br>図鑑の登録数が ${TIXM.join("・")}人 になると1枚もらえます${nx?"（次は"+nx+"人）":""}</div>${why?`<div class="xw">${why}</div>`:""}<input id="tixq" placeholder="名前・番号で検索" style="width:100%;box-sizing:border-box;margin:6px 0" ${why?"disabled":""}><div id="tixl" class="xl"></div><div class="xb"><button data-tx="x" style="flex:1">閉じる</button><button data-tx="go" class="on" style="flex:2" id="tixgo" disabled>招待する</button></div></div>`;document.body.appendChild(d);
const draw=()=>{const qq=($("#tixq").value||"").trim(),L=G.cs.filter(c=>c.met&&(!qq||(nm(c)+(c.nick||"")+dxNo(c)).includes(qq)));$("#tixl").innerHTML=L.length?L.map(c=>`<button class="xr ${pick===c.i?"on":""}" data-ti="${c.i}" ${why?"disabled":""}><img class="xf" data-fi="${c.i}" ${FACEC[c.i]?`src="${FACEC[c.i]}"`:""} alt=""><b>No.${dxNo(c)}</b> ${esc(nm(c))}${c.rar?`<small style="color:#d4a017">${"★".repeat(c.rar)}</small>`:""}</button>`).join(""):`<div class="xs">まだ図鑑に登録されたお客さんがいません</div>`;faceFill(d);$("#tixgo").disabled=!!why||pick==null;$("#tixgo").textContent=pick==null?"招待する":"🎟 "+tixNm(G.cs[pick])+" を招待する"};draw();$("#tixq").oninput=draw;
d.onclick=e=>{const t=e.target.closest("[data-ti]");if(t){pick=+t.dataset.ti;draw();return}const b=e.target.closest("[data-tx]");if(!b)return;if(b.dataset.tx==="x"){d.remove();return}
if(why||pick==null)return;const c=G.cs[pick];G.tix--;G.invD=G.day;G.fcall=(G.fcall||[]).concat(fcGroups([pick]).map(g=>({g,why:"🎟 招待した "+tixNm(c)+" が来てくれた！",tix:1})));c.act=1;save();log("🎟 招待チケットを使った："+tixNm(c)+"（営業開始と同時に来店）");toast("🎟 "+esc(tixNm(c))+" を招待しました<br>営業開始と同時に来てくれます");d.remove();xrow()}}
/* ===== 広告ガチャ（今はダミー広告。1営業日1回） ===== */
const GA_GOOD=[2,6,8,10,13,14,20,22,27,34,36,38,41,43,45,46,48,49];function gaEvList(){return EV.filter(e=>GA_GOOD.includes(e.id)&&(e.t==="pre"||e.t==="run")&&!(e.once&&(G.evDex||{})[e.id])&&(!e.ok||e.t==="run"||(()=>{try{return e.ok()}catch(_){return true}})()))}
function gaEvMove(){const g=G.gaEv;if(!g||G.day<=g.day)return;G.admF=G.admF||{};G.admF[g.t]=g.id;G.gaEv=null;save()}
const GACHA=[["fol",22.5],["ev",22.5],["tix",16.5],["flv",16.5],["deco",7.5],["dex",7.5],["ow",7]];
function gachaOk(k){if(k==="ow")return OWG.some(x=>!owHas(x));if(k==="deco")return CKD.some(d=>d[3]&&d[3].g&&!ckDOk(d));if(k==="money")return !G.lotto&&G.money>0;if(k==="dex")return G.cs.some(c=>!c.met&&!c.ex);if(k==="flv")return flPick(5)>=0;if(k==="fol")return !!G.ow;if(k==="ev")return !G.gaEv&&gaEvList().length>0;return true}
function gachaRoll(){const L=GACHA.filter(([k])=>gachaOk(k));let r=Math.random()*L.reduce((a,b)=>a+b[1],0);for(const[k,w]of L){r-=w;if(r<=0)return k}return L[0][0]}
function gachaGive(k){const o=G.ow;if(k==="ow"){const L=OWG.filter(x=>!owHas(x)),x=L[Math.random()*L.length|0],n=owUnlock(x,"ガチャ");return["👕","着せ替え","「"+n+"」が手に入った！店主の見た目から選べます"]}if(k==="deco"){const L=CKD.filter(d=>d[3]&&d[3].g&&!ckDOk(d)),d=L[Math.random()*L.length|0];ckUnlock(d[0],"ガチャ");return["📸","チェキの"+(d[1]==="e"?"エフェクト":"スタンプ"),"「"+d[2]+"」がチェキで使えるようになった！"]}
if(k==="tix"){G.tix=(G.tix||0)+1;log("🎰 ガチャ：招待チケット+1");return["🎟","招待チケット","招待チケットを1枚ゲット！"]}
if(k==="money"){const g=Math.min(G.money,100000);G.money+=g;log("🎰 ガチャ：所持金2倍（+"+yen(g)+"）");return["💰","所持金2倍！",yen(G.money-g)+" → "+yen(G.money)+(g>=100000?"（上限+10万円）":"")]}
if(k==="dex"){const L=G.cs.filter(c=>!c.met&&!c.ex),c=L[Math.random()*L.length|0];c.act=1;c.met=1;c.fp+=2;log("🎰 ガチャ：No."+dxNo(c)+" が図鑑に登録された");return["📖","図鑑に1人登録","No."+dxNo(c)+" のお客さんが図鑑に登録されました。お店にも来てくれるかも？"]}
if(k==="ev"){const L=gaEvList();let w=L.reduce((a,e)=>a+EVW[e.r],0)*Math.random(),e=L[L.length-1];for(const q of L){w-=EVW[q.r];if(w<=0){e=q;break}}G.gaEv={id:e.id,t:e.t,day:G.day};log("🎰 ガチャ：次の営業日に★"+e.r+"のイベントが起こる");return["⚡","イベント確定！","次の営業日に "+"★".repeat(e.r)+" のイベントが必ず起こります。何が起こるかはお楽しみ"]}
if(k==="flv"){let t=flPick(Math.min(5,flMax()+1));if(t<0)t=flPick(5);const n=flUnlock(t,"ガチャ");return["🍃","フレーバー解禁","新しいフレーバー「"+n+"」を手に入れた！"]}
if(k==="fol"){const f0=o.fol||0,inc=Math.max(30,Math.round(f0*.04));o.fol=f0+inc;o.star=starOf(o);log("🎰 ガチャ：フォロワー+"+inc+"（4%）");return["📱","フォロワー+"+inc.toLocaleString()+"人","フォロワーが4%増えた！ "+f0.toLocaleString()+" → "+o.fol.toLocaleString()+"人"]}}
function gachaPanel(){const old=$("#gap");if(old)old.remove();const d=document.createElement("div");d.id="gap";d.className="xpan";const done=G.gaD===G.day,ok=G.setup&&G.ow&&!G.over;
d.innerHTML=`<div class="xin" style="text-align:center"><div class="xh">🎰 広告ガチャ</div><div class="xs">広告を見ると、ガチャを1回まわせます（1営業日に1回）</div><div class="xs" style="text-align:left;background:rgba(123,79,208,.08);border-radius:10px;padding:6px 10px;margin:6px 0">🎟 招待チケット／💰 所持金2倍（上限+10万円）／📖 図鑑に1人登録／⚡ 次の営業日にイベント確定／🍃 フレーバー1種解禁／📱 フォロワー+100／📸 チェキの限定エフェクト・スタンプ（${CKD.filter(d=>d[3]&&d[3].g).length}種）／👕 着せ替え（${OWG.length}種）</div><div id="gab" style="min-height:120px;display:flex;align-items:center;justify-content:center;flex-direction:column">${done?`<div class="xw">今日はもう回しました。次の営業日にまた回せます</div>`:`<div style="font-size:56px">🎰</div>`}</div><div class="xb"><button data-gx="x" style="flex:1">閉じる</button><button data-gx="ad" class="on" style="flex:2" ${done||!ok?"disabled":""}>📺 広告を見て回す</button></div></div>`;document.body.appendChild(d);
d.onclick=e=>{const b=e.target.closest("[data-gx]");if(!b||b.disabled)return;if(b.dataset.gx==="x"){if(d.dataset.busy)return;d.remove();return}
if(b.dataset.gx==="ad"&&!d.dataset.busy&&G.gaD!==G.day){d.dataset.busy=1;b.disabled=true;d.querySelector('[data-gx="x"]').disabled=true;G.gaD=G.day;save();const box=$("#gab");let n=5;
const tk=()=>{box.innerHTML=`<div style="width:100%;background:#16121c;color:#cfc6dc;border-radius:12px;padding:22px 10px"><div style="font-size:12px;opacity:.7">広告（テスト用のダミー）</div><div style="font-size:30px;margin:6px 0">📺</div><div style="font-size:13px">あと <b>${n}</b> 秒</div></div>`;if(n--<=0){clearInterval(iv);spin()}};const iv=setInterval(tk,1000);tk();
const spin=()=>{const I=["🎟","💰","📖","⚡","🍃","📱"];let c=0;const sp=setInterval(()=>{box.innerHTML=`<div style="font-size:60px">${I[c++%I.length]}</div>`},90);setTimeout(()=>{clearInterval(sp);const r=gachaGive(gachaRoll());save();hud();xrow();box.innerHTML=`<div style="font-size:60px;animation:pop .6s ease">${r[0]}</div><b style="font-size:18px">${esc(r[1])}</b><div class="xs" style="margin-top:4px">${esc(r[2])}</div>`;delete d.dataset.busy;d.querySelector('[data-gx="x"]').disabled=false},1300)}}}}
/* チケット枚数とガチャボタン（雰囲気タグの下） */
function xrow(){const cv=$(".cvw");if(!cv)return;let r=$("#xrow");if(!r){r=document.createElement("div");r.id="xrow";r.innerHTML=`<button id="tixb"></button><button id="gachab"></button>`;cv.appendChild(r);$("#tixb").onclick=e=>{e.stopPropagation();tixPanel()};$("#gachab").onclick=e=>{e.stopPropagation();gachaPanel()}}
$("#tixb").textContent="🎟 招待チケット ×"+(G.tix||0);const ga=G.gaD!==G.day&&G.setup&&!G.over;$("#gachab").textContent=ga?"🎰 ガチャ":"🎰 ガチャ（済）";$("#gachab").classList.toggle("gon",ga);r.hidden=!G.setup}
/* 図鑑リマインド：初回は7日、2回目からは14日、図鑑を開いていないと出す */
const DXL=["たまにはお客様図鑑を確認しよう！<br>あだ名はつけた？","常連さんのこと、どれくらい知ってる？<br>図鑑でプロフィールを見てみよう。<b>あだ名</b>もつけられるよ","最近来てくれたお客さん、覚えてる？<br>お客様図鑑をのぞいてみよう！あだ名はつけた？"];
function dexRemind(){if(!G.setup)return;if(G.dexSeen==null){G.dexSeen=G.day;return}if(G.over||(G.tut||0)<99||TUT||R.phase!=="prep"||!$("#ov").hidden||document.body.classList.contains("mvmode")||$("#adm")||$("#admc")||$("#tixp")||$("#gap")||$("#evp"))return;
if(G.day-G.dexSeen<(G.dexRem?14:7))return;G.dexRem=1;G.dexSeen=G.day;save();tutCard(rnd(DXL),"図鑑を見る","#menu",()=>{const sh=$("#sheet");if(sh)sh.classList.add("open");R.dxm="c";setTab("dex")},{tt:"📖 お客様図鑑"})}
{const _h9=hud;hud=function(){_h9();try{tixChk();xrow();dexRemind()}catch(e){}}}
document.head.insertAdjacentHTML("beforeend",`<style>
#toastw{position:fixed;left:0;right:0;top:calc(var(--th,64px) + 44px);z-index:95;display:flex;flex-direction:column;align-items:center;gap:6px;pointer-events:none;padding:0 16px}
.toast{background:rgba(32,22,48,.92);color:#f6efe4;border-radius:14px;padding:8px 14px;font-size:13px;line-height:1.5;text-align:center;box-shadow:0 6px 18px rgba(0,0,0,.35);transition:opacity .4s,transform .4s;max-width:360px}
#xrow{position:absolute;left:8px;top:30px;z-index:3;display:flex;gap:4px}
#xrow button{font-size:11px;padding:3px 8px;border-radius:999px;border:0;background:rgba(255,255,255,.88);color:#2a2233;font-weight:700;box-shadow:0 2px 6px rgba(0,0,0,.2)}
#xrow #gachab.gon{background:#ffcf5a}
body:not(.fs) #xrow{top:auto;bottom:24px}
body.mvmode #xrow{pointer-events:none;opacity:.35}
.xpan{position:fixed;inset:0;z-index:92;background:rgba(10,6,18,.78);display:flex;align-items:center;justify-content:center;padding:12px}
.xpan .xin{background:#fffdf6;color:#2a2233;border-radius:16px;padding:14px;width:100%;max-width:420px;max-height:86vh;display:flex;flex-direction:column}
.xpan .xh{font-weight:800;font-size:17px}
.xpan .xs{font-size:12px;color:#6f6680;line-height:1.5}
.xpan .xw{font-size:13px;color:#c0392b;background:#ffecea;border-radius:8px;padding:6px 8px;margin-top:6px}
.xpan input{color:#2a2233;background:#fff;border:1px solid #ddd}
.xpan .xl{overflow:auto;flex:1;min-height:120px;display:flex;flex-direction:column;gap:3px}
.xpan .xr{display:flex;align-items:center;gap:6px;text-align:left;padding:6px 8px;border-radius:10px;border:1.5px solid #e5ddd0;background:#fff;color:#2a2233;font-size:13px}
.xpan .xr.on{border-color:#7b4fd6;background:#efe6ff}
.xpan .xr small{margin-left:auto;color:#8a8094;font-size:11px}
.xpan .xr .xf{width:34px;height:34px;border-radius:6px;border:2px solid #5a4632;background:#efe6da;flex:none;image-rendering:pixelated}
.xpan .xr .sw{width:12px;height:12px;border-radius:3px;flex:none;margin:0}
.xpan .xb{display:flex;gap:8px;margin-top:10px}.xpan .xb button{padding:10px;border-radius:10px;color:#2a2233;background:#fff;border:1px solid #ddd}.xpan .xb button.on{background:#7b4fd6;color:#fff;border-color:#7b4fd6}
</style>`);

document.head.insertAdjacentHTML("beforeend",`<style>
#dg.dxg{grid-template-columns:repeat(4,minmax(0,1fr));gap:10px 8px}
#p-dex #dg button.dxt{position:relative;display:flex;flex-direction:column;align-items:center;gap:3px;padding:0;margin:0;border:0;background:none;color:inherit;min-width:0;font:inherit}
#p-dex #dg .dxi{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;width:100%;aspect-ratio:1;border-radius:16px;overflow:hidden;background:linear-gradient(160deg,#4a74c9,#2a4687);box-shadow:inset 0 0 0 3px rgba(255,255,255,.22),inset 0 -6px 0 rgba(0,0,0,.18),0 2px 4px rgba(0,0,0,.25)}
#p-dex #dg .dxi img{width:78%;height:78%;margin-top:2%;object-fit:contain;image-rendering:pixelated}
#p-dex #dg .dxt.lk .dxi{background:linear-gradient(160deg,#3a4256,#262b38);box-shadow:inset 0 0 0 2px rgba(255,255,255,.1),inset 0 -6px 0 rgba(0,0,0,.2)}
#p-dex #dg .dxt.lk .dxi b{font-size:26px;color:rgba(255,255,255,.28);font-weight:900}
#p-dex #dg .dxt.mx .dxi{background:linear-gradient(135deg,#fff6c8 0%,#f0b93a 30%,#b8790f 55%,#f5c74a 75%,#fff0b0 100%);box-shadow:inset 0 0 0 3px rgba(255,255,255,.5),inset 0 -6px 0 rgba(0,0,0,.15),0 2px 6px rgba(224,138,30,.5)}
#p-dex #dg .dxt.mx .dxi::after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.65) 48%,transparent 60%);background-size:250% 100%;animation:dxsh 2.6s linear infinite;pointer-events:none;z-index:1}@keyframes dxsh{0%{background-position:150% 0}100%{background-position:-100% 0}}
#p-dex #dg .dxt.mx .dxl{background:rgba(120,70,0,.45)}
#p-dex #dg .dxt.on .dxi{outline:3px solid #ffb300;outline-offset:2px}
#p-dex #dg .dxt.qt .dxi img{filter:grayscale(1) brightness(.75)}
#p-dex #dg .dxno{position:absolute;left:5px;top:4px;z-index:2;font-size:9px;font-weight:700;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.6)}
#p-dex #dg .dxr{position:absolute;right:4px;top:3px;z-index:2;font-size:8px;line-height:1;color:#ffd54f;text-shadow:0 1px 1px rgba(0,0,0,.6);letter-spacing:-1px}
#p-dex #dg .dxl{position:absolute;left:0;right:0;bottom:0;height:22%;display:flex;align-items:center;justify-content:center;z-index:2;font-size:12px;font-weight:900;color:#fff;background:rgba(0,0,0,.38);-webkit-text-stroke:3px rgba(0,0,0,.55);paint-order:stroke fill}
#p-dex #dg .dxt.lk .dxi{justify-content:center}
#p-dex #dg .dxt.t0 .dxi{background:linear-gradient(160deg,#4a4550,#1f1c24)}
#p-dex #dg .dxt.t1 .dxi{background:linear-gradient(160deg,#4a74c9,#2a4687)}
#p-dex #dg .dxt.t2 .dxi{background:linear-gradient(160deg,#fff06a,#e8cf1a)}
#p-dex #dg .dxt.t3 .dxi{background:linear-gradient(160deg,#4fb37a,#24734a)}
#p-dex #dg .dxt.t4 .dxi{background:linear-gradient(160deg,#e0574a,#9c2a22)}
#p-dex #dg .dxt.t0 .dxp u{background:#8a8494}#p-dex #dg .dxt.t1 .dxp u{background:#5c9cff}#p-dex #dg .dxt.t2 .dxp u{background:#f2d04a}#p-dex #dg .dxt.t3 .dxp u{background:#4fd18a}#p-dex #dg .dxt.t4 .dxp u{background:#ff6a5a}
#p-dex #dg .dxp{display:block;width:84%;height:5px;border-radius:3px;background:rgba(0,0,0,.35);overflow:hidden}
#p-dex #dg .dxp u{display:block;height:100%;background:#4fd1c5;border-radius:3px}
#p-dex #dg .dxt.mx .dxp u{background:#ffcf5a}
#p-dex #dg .dxt small{display:block;width:100%;font-size:10px;line-height:1.2;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--mut)}
#p-dex #dg .dxt:not(.lk) small{color:inherit}
#p-dex #dg .dxt small .dxs{display:block;font-size:9px;opacity:.7;overflow:hidden;text-overflow:ellipsis}
</style>`);

/* ===== 通算の記録（廃業画面のまとめ用） ===== */
{const _dd=dayDone;dayDone=function(en){if(!en.closed){G.tvis=(G.tvis||0)+(en.visits||0);G.bestS=Math.max(G.bestS||0,en.sales||0)}return _dd(en)}}
/* ===== シャッター ===== */
function shutterEl(){let d=$("#shut");if(!d){d=document.createElement("div");d.id="shut";d.innerHTML='<div class="sh"><div class="hd"></div></div>';document.body.appendChild(d)}return d}
function shutterDown(cb,ms){const d=shutterEl(),sh=d.querySelector(".sh");d.classList.remove("up");sh.style.transition="none";sh.style.height="0";void sh.offsetHeight;sh.style.transition="height "+((ms||1300)/1000)+"s cubic-bezier(.55,.05,.7,1)";sh.style.height="100%";setTimeout(()=>{if(cb)cb()},(ms||1300)+250)}
function shutterUp(){const d=$("#shut");if(!d||d.dataset.go)return;d.dataset.go=1;const sh=d.querySelector(".sh");sh.style.transition="height .9s cubic-bezier(.3,0,.45,1)";sh.style.height="0";setTimeout(()=>d.remove(),950)}
/* ===== 閉店：店長がひとこと → シャッター → 今日の結果 → 今日のログ ===== */
const CLL=["今日もおつかれ、自分","よし、炭の火を落とすか","また明日も来てくれるといいな","本日の営業、これにて終了！","ふう…いい一日だった","ありがとうございました〜…って誰もいないか","今日の煙も、いい煙だった","片付けて、帰ってシャワー浴びよ"];
{const _ed=endDay;endDay=function(){if(R.clA)return;R.clA=1;R.clT=R.t;R.clL=rnd(CLL);try{say(OW,R.clL)}catch(e){}cineClose(()=>{R.clA=0;_ed()})}}
{const _sdl=showDayLog;showDayLog=function(dl,s){_sdl(dl,s);const o=$("#ov"),cd=o&&o.querySelector(".card");if(!cd)return;const k=[...cd.children],li=k.findIndex(x=>/^今日のログ/.test(x.textContent||"")),bt=cd.querySelector("#dlok");if(li<0||!bt)return;const lt=k[li],lb=k[li+1],before=k.slice(0,li);
lt.hidden=true;lb.hidden=true;bt.hidden=true;const nb=document.createElement("button");nb.className="on";nb.style.cssText="width:100%;margin-top:10px";nb.textContent="📝 今日のログを見る（"+dl.length+"件）";cd.appendChild(nb);
nb.onclick=()=>{before.forEach(x=>{x.hidden=true});nb.remove();const h=document.createElement("b");h.textContent="📝 今日のログ（"+dl.length+"件）";h.style.cssText="display:block;margin-bottom:6px";cd.insertBefore(h,lt);lb.hidden=false;lb.style.maxHeight="58vh";bt.hidden=false;o.scrollTop=0}}}
/* 閉店後の画面が全部閉じたらシャッターを上げる */
{const _hs=hud;hud=function(){_hs();if(R.clA&&R.clT!=null){R.t=R.clT;if(R.clL&&OW.bub!==R.clL){OW.bub=R.clL;OW.bk=0}if(R.clL)OW.bt=Math.max(OW.bt||0,.6)}const d=$("#shut");if(d&&!R.clA&&!$("#gov")&&$("#ov").hidden&&R.phase==="prep")shutterUp()}}
/* ===== 店長：暇なときのひとりごと ===== */
const OIDL=["ボトル、磨いておこうかな","新しいミックス、考えちゃお","誰か来ないかな〜","SNSに何載せよう…","BGM変えようかな","看板、もうちょい目立たせたい","この時間がいちばん眠い…","ホース、洗っとくか","お客さんの好み、メモ見返しとこ"];
{const _ot=ownThought;ownThought=function(){if(R.phase==="run"&&inStore()===0&&Math.random()<.6)return rnd(OIDL);return _ot()}}
{const _hi=hud;hud=function(){_hi();try{if(R.phase==="run"&&!R.closed&&!R.clA&&G.ow&&R.speed&&inStore()===0&&!(OW.bt>0)&&!OW.mode){if(R.idT==null)R.idT=R.t+20+Math.random()*30;if(R.t>=R.idT){say(OW,rnd(OIDL));R.idT=R.t+50+Math.random()*60}}else if(inStore()>0)R.idT=null}catch(e){}}}
/* ===== 廃業画面：シャッターが下りて、まとめを出す ===== */
function showOver(why){if($("#gov"))return;ovOff();const o=G.ow||{},met=G.cs.filter(c=>c.met).length,comp=G.cs.filter(c=>lv(c)>=NL).length,days=G.day||0,
best=G.cs.filter(c=>c.met&&!spx(c)).sort((a,b)=>((b.vt||0)-(a.vt||0))||(b.fp-a.fp))[0],tv=(G.tvis||0),bs=Math.max(G.bestS||0,...(G.week||[]).map(d=>d.sales||0)),
st=(k,v)=>`<div class="gs"><div>${k}</div><b>${v}</b></div>`,mo=Math.floor(days/7),dd=days%7,per=(mo?mo+"か月":"")+(dd||!mo?dd+"日":"");
const head=why==="mot"?["🥀 やる気が尽きて廃業…","お客さんも少なく、話す相手もいない日が続き、心が折れてしまいました"]:["💸 資金が尽きて廃業…","所持金が "+yen(G.money)+" になり、お店を続けられなくなりました"];
const BYE=["また、どこかで店やってくださいね","店長のシーシャ、忘れません","次のお店ができたら、一番に行きます","ここ、好きだったんだけどな…"];
const d=document.createElement("div");d.id="gov";d.innerHTML=`<div class="sh"><div class="hd"></div></div><div class="pp"><div style="font-size:12px">お知らせ</div><div style="font-size:16px;margin:4px 0">「${esc(shopNm())}」は<br>閉店いたしました</div><div style="font-size:11px;font-weight:400">長い間ご愛顧いただき<br>ありがとうございました　店主 ${esc(o.name||"")}</div></div>
<div class="cd"><div style="font-weight:800;font-size:16px;margin-bottom:2px">${head[0]}</div><div style="font-size:12px;color:#b9b0c8;margin-bottom:10px">${head[1]}</div>
<div class="gg">${st("営業した期間",per)}${st("のべ来店数",tv.toLocaleString()+"人")}${st("出会ったお客さん",met+" / "+G.cs.length+"人")}${st("図鑑コンプリート",comp+"人")}${st("最高の売上（1日）",yen(bs))}${st("最終の借入残高",yen(G.loan?G.loan.bal:0))}</div>
${best?`<div class="gb"><img class="xf" data-fi="${best.i}" ${FACEC[best.i]?`src="${FACEC[best.i]}"`:""} alt=""><div style="font-size:12px"><div style="color:#ffcf5a;font-weight:700">いちばんの常連さん</div><div>${esc(nm(best))}${best.vt?"（来店 "+best.vt+"回）":""}</div><div style="color:#b9b0c8;font-size:11px">「${rnd(BYE)}」</div></div></div>`:""}
<button id="reset0" class="on" style="width:100%;margin-top:12px;padding:11px;font-weight:800">最初からやり直す</button></div>`;document.body.appendChild(d);faceFill(d);
const sh=d.querySelector(".sh");requestAnimationFrame(()=>{sh.style.height="100%"});setTimeout(()=>d.classList.add("in"),1500)}
document.addEventListener("click",e=>{if(e.target.closest("#goover"))showOver("money")});
setTimeout(()=>{try{if(G.over&&G.setup)showOver(G.overR||"money")}catch(e){}},600);
/* ===== チェキ（1営業日に1回、図鑑の解禁60%以上のお客さんとツーショット） ===== */
const CKQ=(a,x,y,z,col,s)=>a.push([x,y,z,col,undefined,s||.5]);
const CKB=(a,x,y,z,w,d,h,col,s)=>{s=s||.5;for(let i=0;i<w;i+=s)for(let j=0;j<d;j+=s)for(let k=0;k<h;k+=s)CKQ(a,x+i,y+j,z+k,col,s)};
function ckArmX(c,side){const FT=c.fat|0;return side==="L"?(FT===2?-1:FT?-.5:0):(FT===2?4:FT?3.5:3)}
function ckStrip(a,ox,c,Y0){const xs=[ox+ckArmX(c,"L"),ox+ckArmX(c,"R")];return a.filter(v=>!((v[5]===undefined||v[5]===1)&&xs.includes(v[0])&&v[1]>=Y0+1&&v[1]<Y0+3&&v[2]>=5&&v[2]<8))}
function ckArm(a,ox,c,side,kind,hold,dx){const x=ox+ckArmX(c,side),sk=c.skin,sl=(c.top|0)===4?c.skin:c.shirt,out=side==="L"?-1:1;
if(kind==="down"){CKB(a,x,1,6,1,2,2,sl,1);CKB(a,x,1,5,1,2,1,sk,1);return}
CKB(a,x,1,6.5,1,1.5,1.5,sl);
if(kind==="peace"){const hx=x+out,fx=hx-.25*out+.25,gx=hx+.75*out+.25-(out>0?.5:0);CKB(a,x,1.5,7.5,1,1,1,sl);CKB(a,hx,1.5,8,1,1,1.5,sk);[9.5,10,10.5].forEach(z=>{CKQ(a,fx,1.5,z,sk);CKQ(a,gx,1.5,z,sk)});return}
if(kind==="mouth"){CKB(a,x,2.5,6.5,1,1,.5,sk);CKB(a,x,3,7,1,.5,1,sk);if(hold)hold(a,x+(out>0?-.5:.5),3.5,7.5);return}
if(kind==="thumb"){CKB(a,x,2.5,6.5,1,1.5,.5,sk);CKB(a,x,3.5,6.5,1,1,1,sk);CKQ(a,x+(out>0?0:.5),4,7.5,sk);CKQ(a,x+(out>0?0:.5),4,8,sk);return}
if(kind==="up"){const ux=x+out*1;CKB(a,x+out*.5,1.5,7.5,1,1,1,sl);CKB(a,ux,1.5,8.5,1,1,2.5,sl);CKB(a,ux,1.5,11,1,1,1,sk);CKQ(a,ux+(out>0?.5:0),1.5,12,sk);return}
if(kind==="in"){CKB(a,x,2,7,1,1,1,sl);CKB(a,x+out*.5,2.5,8,1,1,1,sl);CKB(a,x+out*.75,3,9,1,.5,1,sk);if(hold)hold(a,x,3,9,out);return}
if(kind==="wave"){CKB(a,x+out*.5,1.5,7.5,1,1,1,sl);CKB(a,x+out*1,1.5,8.5,1,1,1,sl);const hx=x+out*1.5;CKB(a,hx,1.5,9.5,1,1,1,sk);[0,.5].forEach(q=>{CKQ(a,hx+q,1.5,10.5,sk)});CKQ(a,hx+(out>0?1:-.5),1.5,10,sk);CKQ(a,hx+(out>0?-.5:1),1.5,9.5,sk);return}
if(kind==="hug"){const x0=Math.min(x,x+dx),w=Math.abs(dx)+1;CKB(a,x0,.5,7.5,w,1,.5,sl);CKB(a,x+dx,1,8,1,1.5,.5,sk);CKB(a,x+dx,2.5,7.5,1,.5,.5,sk);return}}
function ckArmW(a,ox,Y0,c,side,kind,hold,dx){const t=[];ckArm(t,ox,c,side,kind,hold,dx);t.forEach(v=>a.push([v[0],v[1]+Y0,v[2],v[3],v[4],v[5]]))}
const ckHeart=(a,x,y,z,out)=>{const cx0=x+out*1.25,P="#ff5c8a",L="#ff9bb8";[[-1,1],[-.5,1.5],[0,1],[.5,1],[1,1.5],[1.5,1],[-1,.5],[-.5,1],[-.5,.5],[0,.5],[.5,.5],[1,1],[1,.5],[1.5,.5],[-.5,0],[0,0],[.5,0],[1,0],[0,-.5],[.5,-.5],[.25,-1]].forEach(([dx,dz],i)=>CKQ(a,cx0+dx,y+.5,z+.75+dz,i===1||i===4?L:P))};
const ckBurger=(a,x,y,z)=>{CKB(a,x-.5,y,z+1,1.5,1,.5,"#d9a05b");CKB(a,x-.5,y,z+.5,1.5,1,.5,"#5d3a1a");CKB(a,x-.5,y,z,1.5,1,.5,"#e8b06a");CKQ(a,x,y+.5,z+.75,"#6cbf4a")};
const CKP=[["🧍 並んで立つ",{}],["🛋 座って吸う",{sit:1,hd:1,hk:1}],["✌️ ピース",{arms:[["L","peace"],["R","down"]],arms2:[["L","down"],["R","peace"]]}],["👍 グッド",{arms:[["L","thumb"],["R","down"]],arms2:[["L","down"],["R","thumb"]]}],["🤝 肩を組む",{arms:[["L","down"],["R","hug",null,5]],arms2:[["L","down"],["R","down"]],close:1}],["💨 煙を吐く",{sit:1,hd:1,hk:1,smoke:1,ss:2.5}],["🍔 もぐもぐ",{arms:[["L","down"],["R","mouth",ckBurger]],arms2:[["L","mouth",ckBurger],["R","down"]]}],["🙌 ばんざい",{arms:[["L","up"],["R","up"]],arms2:[["L","up"],["R","up"]]}],["💕 ハート",{arms:[["L","down"],["R","in",ckHeart]],arms2:[["L","in"],["R","down"]]}],["👋 手を振る",{arms:[["L","wave"],["R","down"]],arms2:[["L","down"],["R","wave"]]}]];
const CKX=false;
function chekiDraw(cv,cust,pi){const pose=CKP[pi][1],c2=cv.getContext("2d"),Wd=cv.width,Hd=cv.height,sv={cam:R.cam,TX,TY,BASE,ox:OW.x,oy:OW.y,pp:R.people,tool:R.tool},gap=pose.close?4:5;
const SPS=ckSpots();const spI=SPS.length?(((R.ckSp||0)%SPS.length)+SPS.length)%SPS.length:0;let spot=SPS.length?SPS[spI]:FLT[0];
const X0=spot[0]*6+1.5,Y0=spot[1]*6+1;R.ckPose=pi;const SP2=pose.sit?ckSitPairs():[],sp2=SP2.length?SP2[(((R.ckSp||0)%SP2.length)+SP2.length)%SP2.length]:null;var ckFS=null;if(sp2){const[a1,b1]=sp2,fy=a1.f>0?1:-1,cxT=(a1.px+b1.px)/12,cyT=a1.Y0/6,keep=G.furn.filter((F,fid)=>{if(fid===a1.fid)return true;return!furnFoot(F).some(k=>{const[x,y]=k.split(",").map(Number);return (y-cyT)*fy>0.5&&Math.abs(x-cxT)<3.5})});if(keep.length<G.furn.length){ckFS=G.furn;G.furn=keep;furnRebuild();build()}}
try{R.people=[];OW.x=-999;OW.y=-999;R.tool=null;TX=X0+(gap+4)/2;TY=Y0+2;R.cam={yaw:[.22,-.42][spI%2],pit:.24,zoom:(pose.hk?4.4:4.9)*(Math.min(W,CH*.93)/520)};if(pose.front&&!sp2){R.cam.yaw=0;R.cam.pit=.17}if(sp2){const[a1,b1]=sp2;TX=(a1.px+b1.px)/2+2;TY=(a1.Y0+b1.Y0)/2+3;R.cam.yaw=(a1.f>0?0:Math.PI)+((R.ckSp||0)%2?-.3:.25);R.cam.zoom=4.3*(Math.min(W,CH*.93)/520)}
draw();const k=camVec(),MC=$("#cv"),cw=Math.min(W,CH*.93),chh=cw*Hd/Wd,sx=(W-cw)/2,sy=CH*.54-chh*.6;
c2.save();c2.filter="blur(1.2px)";c2.drawImage(MC,sx*dpr,sy*dpr,cw*dpr,chh*dpr,0,0,Wd,Hd);c2.restore();c2.fillStyle="rgba(20,10,30,.10)";c2.fillRect(0,0,Wd,Hd);
cx.setTransform(dpr,0,0,dpr,0,0);cx.clearRect(0,0,W,CH);
const ow=Object.assign({},OW.c,G.ow,{i:99}),cu=Object.assign({},cust);let a=[];
if(pose.sit&&!sp2){box(a,X0-.5,Y0,0,gap+5,3,2,"#7a4e2d");box(a,X0-.5,Y0-1,0,gap+5,1,6,"#5e3a1e")}
let p1=[],p2=[];if(sp2){const[a1,b1]=sp2;pv(p1,a1.px,a1.Y0,a1.f,ow,1,0,pose.hd?1:0);seatPose(p1,a1,ow);pv(p2,b1.px,b1.Y0,b1.f,cu,1,0,pose.hd?2:0);seatPose(p2,b1,cu)}else{pv(p1,X0,Y0,1,ow,pose.sit?1:0,0,pose.hd?1:0);pv(p2,X0+gap,Y0,1,cu,pose.sit?1:0,0,pose.hd?2:0)}
if(pose.hk&&sp2){sp2.forEach((st,n)=>{const S=.8,hc={x:n?st.px+5.6:st.px-1.9,y:st.f>0?st.Y0+4.2:st.Y0+1.8,rot:st.f>0?0:2,sc:S};HKV[hc.rot].forEach(v=>a.push([v[0]*S+hc.x,v[1]*S+hc.y,v[2]*S+(hc.z||0),v[3],undefined,(v[5]||1)*S]));hosePush(a,{seat:st},hc,n?2:1)})}if(pose.hk&&!sp2){const S=.8;[[X0-1.9,1],[X0+gap+5.6,2]].forEach(([hx],n)=>{const hc={x:hx,y:Y0+4.2,rot:0,sc:S};HKV[0].forEach(v=>a.push([v[0]*S+hc.x,v[1]*S+hc.y,v[2]*S,v[3],undefined,(v[5]||1)*S]));hosePush(a,{seat:{px:n?X0+gap:X0,Y0:Y0,f:1}},hc,n?2:1)})}
if(pose.arms){p1=ckStrip(p1,X0,ow,Y0);pose.arms.forEach(([sd,kd,h,dx])=>ckArmW(p1,X0,Y0,ow,sd,kd,h,dx));p2=ckStrip(p2,X0+gap,cu,Y0);pose.arms2.forEach(([sd,kd,h,dx])=>ckArmW(p2,X0+gap,Y0,cu,sd,kd,h,dx))}
if(sp2){const fs=new Set(sp2.map(q=>q.fid)),FF=(typeof ckFS!=="undefined"&&ckFS)||G.furn;fs.forEach(fid=>{const F=FF[fid];if(F)furnVox(F).forEach(v=>a.push(v))})}a=a.concat(p1,p2);(sp2?[]:[[X0+2,Y0+2],[X0+gap+2,Y0+2]]).forEach(([x,y])=>{const[px,py]=P3(x,y,0,k);cx.fillStyle="rgba(0,0,0,.22)";cx.beginPath();cx.ellipse(px,py,2.6*k.s,1*k.s,0,0,7);cx.fill()});
a.map(v=>({v,d:dep(v,k)})).sort((p,q)=>p.d-q.d).forEach(o=>dv(o.v,k));
try{const hasG=c=>!c.pump&&(isGl(c.acc)),gc=c=>c.accC||"#333333";if(sp2){const[a1,b1]=sp2;[[a1,ow],[b1,cu]].forEach(([st,c])=>{if(hasG(c))glFxS(st,c.acc,gc(c),3.04,seatZo(st)).fn(k)})}else{[[X0,ow],[X0+gap,cu]].forEach(([x,c])=>{if(hasG(c))glFx(x,Y0,1,pose.sit?1:0,0,c.acc,gc(c),3.04).fn(k)})}}catch(e){console.log(e)}
try{const fd=CKD.find(q=>q[0]===R.ckEf&&q[1]==="e");if(fd&&ckDOk(fd))fd[4](k,sp2?sp2.map(q=>[q.px+2,q.Y0+2,q.f]):[[X0+2,Y0+2,1],[X0+gap+2,Y0+2,1]])}catch(e){console.log(e)}if(pose.smoke){const T0=.75,ss=pose.ss||1;(sp2?sp2.map(q=>[q.px+2,q.Y0,q.f]):[[X0+2,Y0,1],[X0+gap+2,Y0,1]]).forEach(([mx,my,ff],n)=>{const dir=n?1:-1,fy=ff>0?1:-1,by=ff>0?my:my+6;for(let q=0;q<7;q++){const a2=T0-q*.07;if(a2<0)continue;const o=P3(mx+dir*(.4+a2*(1.4+2.6*ss))+Math.sin(q*2.3)*.4,by+fy*(3.6+a2*7),8.5+a2*2.6+q*.1,k);cx.fillStyle=`rgba(125,135,155,${.62*(1-a2*.8)})`;cx.beginPath();cx.arc(o[0],o[1],k.s*.3*(1.3+a2*3.6)*ss,0,7);cx.fill()}})}
c2.drawImage(MC,sx*dpr,sy*dpr,cw*dpr,chh*dpr,0,0,Wd,Hd)}catch(e){console.log(e)}
R.cam=sv.cam;TX=sv.TX;TY=sv.TY;BASE=sv.BASE;OW.x=sv.ox;OW.y=sv.oy;R.people=sv.pp;R.tool=sv.tool;try{if(typeof ckFS!=="undefined"&&ckFS){G.furn=ckFS;furnRebuild();build()}}catch(e){}}
const ckPct=c=>Math.floor(lv(c)/NL*100),ckDate=()=>"プレイ"+ydLbl();
function chekiPanel(){const old=$("#ckp");if(old)old.remove();if(!G.setup||G.over)return;const d=document.createElement("div");d.id="ckp";d.className="xpan";const done=G.ckD===G.day;
const L=G.cs.filter(c=>c.met).sort((a,b)=>ckPct(b)-ckPct(a)||a.i-b.i),okN=L.filter(c=>ckPct(c)>=60).length;
d.innerHTML=`<div class="xin"><div class="xh">📸 チェキを撮る</div><div class="xs">誰と撮る？（図鑑の解禁が60%以上のお客さん・1営業日に1回）</div>${done?`<div class="xw">今日はもう撮りました。次の営業日にまた撮れます</div>`:okN?"":`<div class="xw">まだ解禁60%以上のお客さんがいません。話しかけて仲良くなろう</div>`}
<div class="ckg">${L.length?L.map(c=>{const p=ckPct(c),ok=p>=60&&!done;return`<button class="ckt ${ok?"":"lk"}" data-ck="${c.i}" ${ok?"":"disabled"}><span class="cki"><img class="xf" data-fi="${c.i}" ${FACEC[c.i]?`src="${FACEC[c.i]}"`:""} alt="">${p>=60?"":"<i>🔒</i>"}</span><small>${esc(nm(c))}</small><small class="ckpc">${p}%</small></button>`}).join(""):`<div class="xs">まだ図鑑に登録されたお客さんがいません</div>`}</div>
<div class="xb"><button data-cx="x" style="flex:1">閉じる</button></div></div>`;document.body.appendChild(d);faceFill(d);
d.onclick=e=>{if(e.target.closest("[data-cx=x]")){d.remove();return}const t=e.target.closest("[data-ck]");if(!t||t.disabled)return;const c=G.cs[+t.dataset.ck];if(nm(c)==="？？？")ckNick(d,c);else ckShoot(d,c)}}
function ckNick(d,c){d.querySelector(".xin").innerHTML=`<div class="xh">📸 あだ名をつけよう</div><div class="xs">まだ本名を知らないお客さんです。チェキに書くあだ名をつけてください（図鑑にも保存されます）</div><div style="display:flex;justify-content:center;margin:10px 0"><img class="xf" data-fi="${c.i}" ${FACEC[c.i]?`src="${FACEC[c.i]}"`:""} style="width:84px;height:84px;border-radius:14px;background:linear-gradient(160deg,#4fb37a,#24734a);image-rendering:pixelated"></div><input id="cknk" maxlength="12" placeholder="あだ名（12文字まで）" style="width:100%;box-sizing:border-box;padding:10px;font-size:16px"><div class="xb"><button data-nk="b" style="flex:1">戻る</button><button data-nk="ok" class="on" style="flex:2">決定</button></div>`;faceFill(d);
d.onclick=e=>{const b=e.target.closest("[data-nk]");if(!b)return;if(b.dataset.nk==="b"){d.remove();chekiPanel();return}const v=($("#cknk").value||"").trim();if(!v){toast("あだ名を入力してください");return}c.nick=v;save();try{rdex()}catch(_){}ckShoot(d,c)}}
function ckShoot(d,c){let pi=0;const shop=shopNm();
d.querySelector(".xin").innerHTML=`<div class="xh">📸 チェキ</div><div class="ckf" id="ckf"><canvas id="ckc" width="520" height="560"></canvas><div class="ckn"><b>${esc((G.ow||{}).name||"店長")} × ${esc(nm(c))}</b><small>${esc(shop)}　${ckDate()}</small></div></div>
<div class="xs">ポーズ</div><div class="ckps">${CKP.map((p,i)=>`<button class="xr ${i?"":"on"}" data-pz="${i}">${p[0]}</button>`).join("")}</div><div class="xs">エフェクト</div><div class="ckps" id="ckde">${ckDBtns("e")}</div><div class="xs">スタンプ</div><div class="ckps" id="ckds">${ckDBtns("s")}</div><div class="xs" style="font-size:11px">🔒はタップで解禁条件が見られます</div><div class="xs">場所</div><div class="ckps"><button class="xr" data-sp="-1">◀ 前の場所</button><button class="xr" data-sp="1">次の場所 ▶</button><span id="cksn" style="align-self:center;font-size:12px;color:var(--mut);margin-left:6px"></span></div><div class="xb"><button data-sh="b" style="flex:1">戻る</button><button data-sh="go" class="on" style="flex:2">📸 撮る</button></div>`;
const cv=$("#ckc");chekiDraw(cv,c,0);
ckSpLbl();d.onclick=e=>{const sp=e.target.closest("[data-sp]");if(sp){R.ckSp=(R.ckSp||0)+(+sp.dataset.sp);chekiDraw(cv,c,pi);ckSpLbl();return}const dl=e.target.closest("[data-dkl]");if(dl){const q=CKD.find(x=>x[0]===dl.dataset.dkl);toast("🔒 "+(q[3].g?"ガチャで出る":q[3].t+"で解禁"));return}const dk=e.target.closest("[data-dk]");if(dk){const[t,id]=dk.dataset.dk.split(":");if(t==="e")R.ckEf=id;else R.ckSt=id;$(t==="e"?"#ckde":"#ckds").innerHTML=ckDBtns(t);chekiDraw(cv,c,pi);return}const z=e.target.closest("[data-pz]");if(z){pi=+z.dataset.pz;d.querySelectorAll("[data-pz]").forEach(b=>b.classList.toggle("on",b===z));chekiDraw(cv,c,pi);return}const b=e.target.closest("[data-sh]");if(!b)return;if(b.dataset.sh==="b"){d.remove();chekiPanel();return}
if(G.ckD===G.day){toast("今日はもう撮りました");return}G.ckD=G.day;G.ckN=(G.ckN||0)+1;save();xrow();log("📸 "+nm(c)+" とチェキを撮った");try{motAdd(2)}catch(_){}
const out=document.createElement("canvas"),PW=600,PH=760,g=out.getContext("2d");out.width=PW;out.height=PH;g.fillStyle="#fffefa";g.fillRect(0,0,PW,PH);g.drawImage(cv,40,40,520,560);try{kgStamp(g,PW)}catch(_){}g.fillStyle="#333";g.textAlign="center";g.font="bold 30px 'Hiragino Maru Gothic ProN','Hiragino Sans',sans-serif";g.fillText(((G.ow||{}).name||"店長")+" × "+nm(c),PW/2,665,PW-60);g.fillStyle="#888";g.font="20px 'Hiragino Sans',sans-serif";g.fillText(shop+"　"+ckDate(),PW/2,705,PW-60);
const url=out.toDataURL("image/png"),txt="「"+shop+"」で "+nm(c)+" さんとチェキ📸 #シーシャ屋さん経営";
d.querySelector(".xin").innerHTML=`<div class="xh">📸 撮れた！</div><img src="${url}" alt="チェキ" style="width:100%;max-width:300px;align-self:center;transform:rotate(-1.5deg);box-shadow:0 8px 20px rgba(0,0,0,.35);margin:10px 0"><div class="xb" style="flex-direction:column;gap:6px">${CKX?`<button data-fin="xp" class="ckx" style="width:100%;font-size:16px;padding:12px;background:#111 !important;color:#fff !important;border:none">𝕏 にこのチェキを投稿</button><div class="xs" style="text-align:center;margin:0">📱 スマホは出てきたメニューから「X」を選んでね</div>`:""}<button data-fin="sh" style="width:100%">💾 画像を保存</button><div class="xs" style="text-align:center;margin:0">画像を長押しでも保存できます</div></div><div class="xb" style="margin-top:6px"><button data-fin="x" style="flex:1">閉じる</button></div>`;
d.onclick=async e=>{const q=e.target.closest("[data-fin]");if(!q)return;if(q.dataset.fin==="x"){d.remove();return}
const bl=await new Promise(r=>out.toBlob(r,"image/png"));
if(q.dataset.fin==="xp"){const t2=txt+"\nhttps://toratorasuienten.info/sheeshastoresimulator/";try{const fl=new File([bl],"cheki.png",{type:"image/png"});if(navigator.canShare&&navigator.canShare({files:[fl]})&&/iPhone|iPad|Android/i.test(navigator.userAgent)){await navigator.share({files:[fl],text:t2});return}}catch(er){if(er&&er.name==="AbortError")return}
try{window.open("https://x.com/intent/post?text="+encodeURIComponent(txt)+"&url="+encodeURIComponent("https://toratorasuienten.info/sheeshastoresimulator/"),"_blank","noopener")}catch(_){}toast("PCの場合は、保存した画像を投稿画面に貼り付けてね");return}
try{const dl=window.claude&&window.claude.use?await window.claude.use("downloads"):null;if(dl){try{await dl.save({filename:"cheki.png",data:bl});toast("画像を保存しました")}catch(er){if(er&&er.code!=="declined")toast("画像を長押しで保存してください")}return}}catch(_){}
try{const fl=new File([bl],"cheki.png",{type:"image/png"});if(navigator.canShare&&navigator.canShare({files:[fl]})){await navigator.share({files:[fl],text:txt});return}}catch(_){}
try{const a=document.createElement("a");a.href=url;a.download="cheki.png";document.body.appendChild(a);a.click();a.remove()}catch(_){}toast("保存されない場合は、画像を長押しで保存してください")}}}
/* ===== ボタン列：雰囲気タグの下に並べる。チェキボタンを追加 ===== */
{const _xr=xrow;xrow=function(){_xr();const r=$("#xrow");if(!r)return;let b=$("#chekib");if(!b){b=document.createElement("button");b.id="chekib";r.appendChild(b);b.onclick=e=>{e.stopPropagation();chekiPanel()}}const ok=G.ckD!==G.day&&G.setup&&!G.over;b.textContent=ok?"📸 チェキ":"📸 チェキ（済）";b.classList.toggle("done",!ok);
try{const _n=performance.now();if(!r.style.top||_n-(window._xrT||0)>1000){window._xrT=_n;const a=$("#atm").getBoundingClientRect(),c=$(".cvw").getBoundingClientRect();if(a.height){const t=Math.round(a.bottom-c.top+6)+"px";if(r.style.top!==t)r.style.top=t}}}catch(_){}}}
document.head.insertAdjacentHTML("beforeend",`<style>
.fs #atm{flex-wrap:wrap!important;row-gap:3px}
#xrow{flex-wrap:wrap;right:84px}
#xrow #chekib{background:#ff8fb1;color:#2a2233}#xrow #chekib.done{background:rgba(255,255,255,.88);opacity:.75}
#shut{position:fixed;inset:0;z-index:9;pointer-events:none}
body:has(#shut) #ov{background:rgba(20,10,35,.22)}
#shut .sh,#gov .sh{position:absolute;left:0;right:0;top:0;height:0;background:repeating-linear-gradient(180deg,#8d949c 0 18px,#6f767e 18px 21px,#a3aab2 21px 24px);box-shadow:0 6px 0 #3d4248,0 10px 30px rgba(0,0,0,.6);overflow:hidden}
#shut .sh::after,#gov .sh::after{content:"";position:absolute;left:0;right:0;bottom:0;height:16px;background:linear-gradient(#585e65,#2f3338)}
#shut .hd,#gov .hd{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);width:70px;height:8px;border-radius:4px;background:#2f3338}
#gov{position:fixed;inset:0;z-index:120;overflow:auto;font-family:inherit;color:#f1ecf8}
#gov .sh{transition:height 1.4s cubic-bezier(.55,.05,.7,1)}
#gov .pp,#gov .cd{opacity:0;transition:opacity .6s}#gov.in .pp,#gov.in .cd{opacity:1}
#gov .pp{position:absolute;left:50%;top:14%;transform:translateX(-50%) rotate(-2deg);background:#fffdf3;color:#2a2233;padding:12px 18px;border-radius:4px;box-shadow:0 4px 10px rgba(0,0,0,.4);text-align:center;font-weight:700;line-height:1.6;width:230px}
#gov .cd{position:absolute;left:14px;right:14px;top:36%;max-width:420px;margin:0 auto;background:rgba(20,14,30,.93);border-radius:16px;padding:14px;box-shadow:0 10px 30px rgba(0,0,0,.5);margin-bottom:20px}
#gov .gg{display:grid;grid-template-columns:1fr 1fr;gap:6px}#gov .gs{background:rgba(255,255,255,.07);border-radius:10px;padding:6px 8px}#gov .gs div{font-size:10px;color:#b9b0c8}#gov .gs b{font-size:16px}
#gov .gb{display:flex;align-items:center;gap:10px;margin-top:10px;background:rgba(255,207,90,.12);border-radius:10px;padding:8px}#gov .gb img{width:46px;height:46px;image-rendering:pixelated;border-radius:8px;background:#4a74c9;flex:none}
.ckg{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:8px;overflow:auto;flex:1;min-height:120px;align-content:start}
.ckt{display:flex;flex-direction:column;align-items:center;gap:2px;padding:0;border:0;background:none;color:#2a2233;min-width:0}
.ckt .cki{position:relative;width:100%;aspect-ratio:1;border-radius:14px;background:linear-gradient(160deg,#4fb37a,#24734a);overflow:hidden;display:block}
.ckt .cki img{width:100%;height:100%;image-rendering:pixelated}.ckt .cki i{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:20px;font-style:normal}
.ckt.lk{opacity:.4}.ckt.lk .cki{background:#3a4256}
.ckt small{font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%;text-align:center}.ckt .ckpc{color:#888;font-size:9px}
.ckf{background:#fff;padding:10px 10px 0;border-radius:4px;box-shadow:0 8px 20px rgba(0,0,0,.35);transform:rotate(-1.5deg);margin:8px auto 10px;width:240px}
.ckf canvas{width:100%;display:block}.ckf .ckn{height:52px;display:flex;flex-direction:column;justify-content:center;align-items:center;color:#333}.ckf .ckn b{font-size:14px}.ckf .ckn small{font-size:10px;color:#888}
.ckps{display:flex;gap:6px;overflow-x:auto;padding:4px 0}.ckps .xr{flex:none}
.ckx{flex:1;display:flex;align-items:center;justify-content:center;border-radius:10px;background:#111;color:#fff!important;text-decoration:none;font-weight:700;padding:10px}
body.mvmode #chekib{pointer-events:none}
</style>`);

/* ===== 📦 持ち物（インベントリ）：1個=1枠、最大300 ===== */
const IVMAX=300;
function ivInit(){if(!G.inv)G.inv=[];if(!G.ivPend)G.ivPend=[]}
function ivFull(){ivInit();return G.inv.length>=IVMAX}
function ivTool(it){return it.t==="f"?"st:"+it.k+":"+it.sr:it.id}
function ivF(){return!!(R.ivp&&R.ivp.tool===R.tool)}
function ivUse(){ivInit();const p=R.ivp;if(p&&G.inv[p.i]&&ivTool(G.inv[p.i])===p.tool)G.inv.splice(p.i,1);R.ivp=null}
function ivName(it){if(it.t==="f")return seatName({k:it.k,sr:it.sr});const x=(it.t==="w"?WP:DEC).find(q=>q.id===it.id);return x?x.n:"？"}
function ivPrice(it){if(it.t==="f")return Math.floor(seatPrice(it.k,it.sr)/2);const x=(it.t==="w"?WP:DEC).find(q=>q.id===it.id);return x?Math.floor(x.p/2):0}
function ivIcon(it){try{if(it.t==="f")return furnIcon(it.k,it.sr);if(it.t==="d")return decIcon(it.id);const x=WP.find(q=>q.id===it.id);return x?(x.img||(typeof wpThumb==="function"?wpThumb(x):"")):""}catch(e){return""}}
function ivAdd(it){ivInit();if(G.inv.length>=IVMAX){G.ivPend.push(it);return false}G.inv.push(it);return true}
function rinv(){ivInit();const el=$("#ivl");if(!el)return;const c=R.ivc||"d",L={d:"🪴 置物",w:"🖼 壁アイテム",f:"🛋 客席"},gr={};
G.inv.forEach((it,i)=>{if(it.t!==c)return;const k=ivTool(it);(gr[k]=gr[k]||{it,ix:[]}).ix.push(i)});
let h=`<div class="m" style="font-size:12px;margin-bottom:6px">持ち物 <b>${G.inv.length}</b>/${IVMAX}　しまった物・買ってしまった物・お客さんからもらった物が入ります。<b>取り出す</b>を押してから店内をタップすると置けます（お金も、月の設置数もかかりません）</div>`;
if(G.ivPend.length)h+=`<div class="dgh">🎁 受け取り待ち（持ち物がいっぱい）</div>`+G.ivPend.map((it,i)=>`<div class="ivr"><span>${esc(ivName(it))}</span><button data-ivpk="${i}" ${G.inv.length>=IVMAX?"disabled":""}>受け取る</button><button data-ivpx="${i}">捨てる</button></div>`).join("");
h+=`<div class="row" style="margin:4px 0 6px">`+Object.keys(L).map(k=>`<button data-ivc="${k}" class="${c===k?"on":""}">${L[k]}（${G.inv.filter(x=>x.t===k).length}）</button>`).join("")+`</div>`;
const ks=Object.keys(gr);h+=ks.length?ks.map(k=>{const g=gr[k],it=g.it,ic=ivIcon(it),on=R.ivp&&R.ivp.tool===k&&ivF(),gf=it.t==="d"&&String(it.id).startsWith("gf_");return`<div class="ivr ${on?"on":""}">${ic?`<img src="${ic}" alt="">`:"<span class=\"ivn\">📦</span>"}<span>${esc(ivName(it))}${g.ix.length>1?` <b>×${g.ix.length}</b>`:""}${gf?' <small style="color:#d4a017">非売品</small>':""}${gfFrom(it.id)}</span><button data-ivo="${g.ix[0]}" class="${on?"on":""}">${on?"選択中":"取り出す"}</button><button data-ivs="${g.ix[0]}">売る ¥${ivPrice(it).toLocaleString()}</button></div>`}).join(""):`<div class="m" style="font-size:12px;padding:8px 0">まだ何も入っていません</div>`;
el.innerHTML=h}
{const _rd=rdeco;rdeco=function(){_rd();const c=R.dcat||"obj",s=$("#sec-inv");if(s)s.hidden=c!=="inv";if(c==="inv")rinv();
/* 買ってしまう */const e=$("#plc");if(e&&R.tool&&R.tool!=="mv"&&!ivF()){const by=ivBuyInfo(R.tool);if(by)e.innerHTML+=`<div style="margin-top:6px"><button id="ivbuy">📦 「${esc(by.n)}」を買って持ち物にしまう（¥${by.p.toLocaleString()}）</button></div>`}
if(e&&ivF())e.innerHTML+=`<div style="margin-top:6px;color:#2e9d4f">📦 持ち物から「${esc(ivName(G.inv[R.ivp.i]))}」を選択中：置きたい場所をタップ</div>`}}
function ivBuyInfo(t){if(String(t).startsWith("st:")){const[,k,sr]=t.split(":");return{t:"f",k,sr,n:seatName({k,sr}),p:seatPrice(k,sr)}}const w=WP.find(q=>q.id===t);if(w&&!(w.u&&w.u[0]==="gift"))return{t:"w",id:t,n:w.n,p:w.p};const d=DEC.find(q=>q.id===t);if(d&&d.u[0]!=="gift")return{t:"d",id:t,n:d.n,p:d.p};return null}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#ivbuy,[data-ivc],[data-ivo],[data-ivs],[data-ivpk],[data-ivpx]");if(!b)return;ivInit();const d=b.dataset;
if(b.id==="ivbuy"){const by=ivBuyInfo(R.tool);if(!by)return;if(ivFull()){log("📦 持ち物がいっぱいです（"+IVMAX+"個まで）");return}
 if(by.t==="f"){if(!seatOpen(by.k,by.sr)){log("🔒 "+seatCond(by.sr));return}if(splLeft()<=0){log("🔒 今月はもう客席を"+SPLMAX+"個買いました。来月まで待ちましょう");return}}
 else{if(by.t==="d"&&!decOpen(DEC.find(q=>q.id===by.id))){log("🔒 まだ解放されていません");return}if(plLeft()<=0){log("🔒 今月はもう"+PLMAX+"個設置しました。来月まで待ちましょう");return}}
 if(G.money<by.p){(log("お金が足りません"),toast("💸 お金が足りません"));return}G.money-=by.p;if(by.t==="f")splUse();else plUse();G.inv.push(by.t==="f"?{t:"f",k:by.k,sr:by.sr}:{t:by.t,id:by.id});log("📦 "+by.n+" を買って持ち物にしまいました");R.tool=null;save();hud();rdeco();return}
if(d.ivc){R.ivc=d.ivc;rinv();return}
if(d.ivo!==undefined){const i=+d.ivo,it=G.inv[i];if(!it)return;if(it.t==="f"&&R.phase!=="prep"){log("🛋 客席は開店前に設置できます");return}const t=ivTool(it);if(ivF()&&R.ivp.tool===t){R.tool=null;R.ivp=null}else{if(R.tool==="mv"){try{mvOff()}catch(e){}}R.tool=t;R.ivp={i,tool:t};const sh=$("#sheet");if(sh)sh.classList.remove("open")}rdeco();return}
if(d.ivs!==undefined){const i=+d.ivs,it=G.inv[i];if(!it)return;const pr=ivPrice(it),n=ivName(it);G.inv.splice(i,1);if(R.ivp)R.ivp=null;G.money+=pr;log("💰 "+n+" を売却 +¥"+pr.toLocaleString());save();hud();rdeco();return}
if(d.ivpk!==undefined){const i=+d.ivpk;if(G.inv.length>=IVMAX)return;const it=G.ivPend.splice(i,1)[0];if(it){G.inv.push(it);log("📦 "+ivName(it)+" を持ち物に入れました")}save();rdeco();return}
if(d.ivpx!==undefined){const it=G.ivPend.splice(+d.ivpx,1)[0];if(it)log("🗑 "+ivName(it)+" を捨てました");save();rdeco();return}});
/* ===== 🎁 お客さんからのプレゼント（図鑑No.70〜の82人・1人1種類の非売品） ===== */
const GIFT={};DEC.forEach(x=>{if(x.u&&x.u[0]==="gift")GIFT[x.g]=x});
function giftTry(p){try{const c=p&&p.c;if(!c||!GIFT[c.i])return;if(G.gfD===G.day)return;if(spx(c)?(c.vn||0)<3:c.fp<30)return;if(Math.random()>=.005)return;
G.gfD=G.day;const x=GIFT[c.i],ok=ivAdd({t:WP.includes(x)?"w":"d",id:x.id});const ln="これ、よかったら使ってください";setTimeout(()=>{if(spx(c)){NOGOBI=1;sayX(p,ln);NOGOBI=0}else say(p,ln)},1600);
log("🎁 "+(nm(c)==="？？？"?"お客さん":nm(c)+" さん")+"から「"+x.n+"」をもらった！"+(ok?"（📦 持ち物へ）":"（持ち物がいっぱい：受け取り待ちへ）"));G.gfN=G.gfN||{};G.gfN[x.id]=(G.gfN[x.id]||0)+1;save();if(typeof rdeco==="function")rdeco()}catch(e){}}


/* ===== ✨ 発光する置物（でっかいりんご：赤と緑に交互に光る） ===== */
const DGLOW={gf_150:[[255,30,50],[0,255,60]]};
{const _dp=decPush;decPush=function(L,k){_dp(L,k);(G.decor||[]).forEach(dd=>{const gc=DGLOW[dd.id];if(!gc)return;const ox=dd.tx*6,oy=dd.ty*6;
L.push({v:{fn:k=>{const t=performance.now()/1000,w=(Math.sin(t*1.6)+1)/2,c=gc[0].map((v,i)=>Math.round(v*(1-w)+gc[1][i]*w)),P=P3(ox+3,oy+3,5,k),r=k.s*9*(0.9+0.1*Math.sin(t*3.1));
const g=cx.createRadialGradient(P[0],P[1],0,P[0],P[1],r);g.addColorStop(0,`rgba(${c},0.55)`);g.addColorStop(0.5,`rgba(${c},0.22)`);g.addColorStop(1,`rgba(${c},0)`);
cx.save();cx.globalCompositeOperation="lighter";cx.fillStyle=g;cx.beginPath();cx.arc(P[0],P[1],r,0,7);cx.fill();cx.restore()}},d:(ox+6)*k.cx+(oy+6)*k.cy+12*k.cz})})}}
{const _ii=ivInit;ivInit=function(){_ii();G.inv=G.inv.filter(it=>it.t!=="d"||DEC.some(q=>q.id===it.id));G.ivPend=G.ivPend.filter(it=>it.t!=="d"||DEC.some(q=>q.id===it.id))}}


