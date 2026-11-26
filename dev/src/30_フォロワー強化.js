/* ===== フォロワー強化：毎日の減少を弱める・連続更新・チェキ・有名人来店・映え・口コミ・内訳表示 ===== */
var FOLK=.022;
/* フォロワーが多いほど％の伸びがゆるやかになる（5,000人で半分） */
function folSat(){const f=(G.ow&&G.ow.fol)||0;return 5000/(5000+f)}
/* 映える店：置物＋壁アイテムの数でSNS更新の伸びが最大+30% */
function haeN(){return((G.furn||[]).filter(f=>f&&f.k!=="b").length)+((G.wall||[]).length)}
function haeM(){return 1+Math.min(.3,haeN()*.01)}
function folAdd(o,r,mn){const g=Math.max(mn||0,Math.round((o.fol||0)*r*folSat()));o.fol=(o.fol||0)+g;o.star=starOf(o);return g}
/* チェキをSNSに投稿：+1%（1日1回） */
function ckFol(c){const o=G.ow;if(!o||G.ckFolD===G.day)return;G.ckFolD=G.day;const g=folAdd(o,.01,5);G.folX=(G.folX||0)+g;log("📸 チェキをSNSに投稿：フォロワー+"+g)}
/* 有名人の来店：芸能人・レジェンドが来ると+2〜5%（1日1回） */
function celebVisit(c){const o=G.ow;if(!o||!c||(c.job!=="芸能人"&&c.job!=="レジェンド")||G.celD===G.day)return;G.celD=G.day;const g=folAdd(o,.02+Math.random()*.03,20);G.folX=(G.folX||0)+g;log("🌟 "+nm(c)+" が来店した写真が拡散された！フォロワー+"+g)}
/* 1日の終わりのフォロワー計算 */
function folDayEnd(o,en){const f0=G.fol0??o.fol,fA=o.fol,D={gain:fA-f0};
const cut=(k,r)=>{const b=o.fol;o.fol=Math.floor(o.fol*(1-r));D[k]=(D[k]||0)+(b-o.fol)};
const st=!en.closed&&R.st;if(st&&st.q&&st.q[2]>=5){D.kc=folAdd(o,.01,5);log("🗣 「とても美味しい」が口コミで広がった：フォロワー+"+D.kc)}
if(o.sns){G.snsSt=(G.snsSt||0)+1;if(G.snsSt%3===0){D.st=folAdd(o,.03,10);log("🔥 SNS "+G.snsSt+"日連続更新ボーナス：フォロワー+"+D.st)}}else G.snsSt=0;
if(!o.sns)cut("ns",.01);
if(o.bad)cut("bad",.03*Math.min(3,o.bad));
if(o.star>20&&!o.sns)cut("calm",(5+Math.random()*5)/1000);
D.f0=f0;D.f1=o.fol;G.folD=D;G.fol0=o.fol;G.folX=0}
/* 今日の営業おつかれさまにフォロワーの内訳を出す */
{const _sdl=showDayLog;showDayLog=function(dl,s){const r=_sdl.apply(this,arguments);try{const D=G.folD,cd=$("#ov")&&$("#ov").querySelector(".card");if(D&&cd&&!cd.querySelector(".folbx")){
const n=v=>v.toLocaleString(),L=[];if(D.gain)L.push(["今日の増加（SNS・来店など）",D.gain]);if(D.kc)L.push(["口コミ",D.kc]);if(D.st)L.push(["連続更新ボーナス",D.st]);if(D.ns)L.push(["SNS更新なし",-D.ns]);if(D.bad)L.push(["まずい一本",-D.bad]);if(D.calm)L.push(["人気の落ち着き",-D.calm]);
const t=D.f1-D.f0,b=document.createElement("div");b.className="folbx";b.style.cssText="background:var(--bg);border-radius:10px;padding:6px 10px;margin:0 0 8px;font-size:12.5px";
b.innerHTML=`<div style="display:flex;justify-content:space-between"><b>📱 フォロワー</b><b>${n(D.f0)} → ${n(D.f1)}（<span class="${t>=0?"pos":"neg"}">${t>=0?"+":""}${n(t)}</span>）</b></div>`+L.map(([a,v])=>`<div class="m" style="display:flex;justify-content:space-between"><span>${a}</span><span class="${v>=0?"pos":"neg"}">${v>=0?"+":""}${n(v)}</span></div>`).join("")+(G.snsSt?`<div class="m">SNS連続更新：${G.snsSt}日（3日ごとにボーナス）</div>`:"");
const g=cd.querySelector(".grid");if(g)g.after(b);else cd.prepend(b)}}catch(e){}return r}}
