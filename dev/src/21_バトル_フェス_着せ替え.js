/* ===== さんてぃ v2：ボサっとした黒髪・細メガネ・デニムジャケット＋赤T ===== */
SPF.santy=({H,Q4,hr})=>{const RD="#c8282b",WT="#f4efe6",BT="#e8e8ea",LP="#262d40",SPK="#55607a";
 /* 赤いTシャツ（前を開けたジャケットの間） */
 for(let z=4;z<7.8;z+=.25)for(let x=1.25;x<2.75;x+=.25)Q4(x,3.04,z,RD);
 /* Tシャツの白い文字（縦書き風） */
 [[1.75,7],[2,7],[2,6.75],[1.75,6.5],[2,6.5],[1.75,6],[2,6],[1.75,5.75],[2,5.5],[1.75,5.25],[2,5],[1.75,4.75]].forEach(([x,z])=>Q4(x,3.06,z,WT));
 /* ジャケットの前立て・ボタン・えり */
 for(let z=4;z<7.6;z+=.25){Q4(1,3.05,z,LP);Q4(2.75,3.05,z,LP)}
 [4.75,5.75,6.75].forEach(z=>{Q4(1,3.08,z,BT);Q4(2.75,3.08,z,BT)});
 for(let z=7.25;z<8;z+=.25){Q4(1.25-(z-7.25)*.33,3.07,z,LP);Q4(2.5+(z-7.25)*.33,3.07,z,LP)}
 /* ボサっとした髪：ボリューム＋前髪をギザギザに */
 H(0,0,6,8,6,1,hr);H(1,2,7,2,3,1,hr);H(4,1,7,3,4,1,hr);H(2,4,7,2,2,1,hr);
 H(-1,1,4,1,6,3,hr);H(8,1,4,1,6,3,hr);H(0,-1,1,8,1,6,hr);
 H(0,7,5,8,1,2,hr);H(0,7,4,2,1,1,hr);H(3,7,4,1,1,1,hr);H(5,7,4,2,1,1,hr);H(-1,6,6,1,2,1,hr);H(8,6,6,1,2,1,hr);H(2,8,6,3,1,1,hr);
 /* 細い長方形のメガネ */
 const G="#3b2f29",s=.125,y=3.03,P=(x,z)=>Q4(x,y,z,G,s),RT=(x0,x1,z0,z1)=>{for(let x=x0;x<=x1+1e-6;x+=s){P(x,z0);P(x,z1)}for(let z=z0;z<=z1+1e-6;z+=s){P(x0,z);P(x1,z)}};
 RT(.375,1.625,9.0,9.625);RT(2.375,3.625,9.0,9.625);for(let x=1.75;x<2.3;x+=s)P(x,9.5);
 for(let yy=1.5;yy<3;yy+=s){Q4(.25,yy,9.5,G,s);Q4(3.625,yy,9.5,G,s)}
};
{const K={"hs": 0, "hair": "#231c18", "shirt": "#323b52", "pants": "#26272d", "shoe": "#151515", "top": 0, "bot": 0, "sp": "santy"};if(!G.san2){const c=G.cs[141];if(c&&!c.ed)Object.assign(c,K);G.san2=1;try{save()}catch(e){}}}
{const _hv=hud;hud=function(){try{if(R.vent>0){const over=R.phase!=="run"||(R.ventE!=null&&R.t>=R.ventE)||(R.ventR&&performance.now()-R.ventR>45000&&R.speed);if(over){R.vent=0;R.ventE=null;R.vcd=R.phase==="run"?fanC():0}}}catch(e){}_hv.apply(this,arguments)}}
{const _ps=pickSeats;pickSeats=function(m){const r=_ps.apply(this,arguments);try{if(r&&R.phase==="run"){R.sUse=R.sUse||{};r.forEach(s=>{if(s&&s.fid!=null)R.sUse[s.fid]=R.t})}}catch(e){}return r}}
{const _st=start;start=function(){R.sUse={};return _st.apply(this,arguments)}}
/* 起動時：回した席の向きを正しく描くため、全部の仕組みが揃ってから作り直す */
try{furnRebuild();build()}catch(e){}

/* ===== シーシャバトル（トーナメント）とシーシャフェス（さばきミニゲーム） ===== */
const BT_TH=[["甘い系","マカロン,ミルク,チョコレート,カプチーノ,バニラ,ガム,ポップコーン,スイートコーン,ココナッツ,ストロベリー,コーラ"],
["爽やか系","ミント,レモン,グレープフルーツ,アイスX,ケインミント,いにしえミント,いにしえレモン,ブルーベリーアイス,カクタス,ジャスミン"],
["フルーツ系","ピーチ,グレープ,ブルーベリー,ライチ,オレンジ,パイナップル,マンゴー,パッションフルーツ,グァバ,スイカ,ペア,メロン,ドラゴンフルーツ,ブルーグァバ,アサイー"],
["スパイス・重め","ダブルアップル,カルダモン,シナモン,パンラズナ,パンラース,シガー,アールグレイ,タイガ,バジル,コーラ"],
["花の香り","ジャスミン,ラベンダー,スミレ,ローズ,金木犀,ボムシェル,ライチ"]].map(([n,l])=>[n,l.split(",")]);
const BT_A=["煙","炭","霧","雲","夜","紫","黒","銀","雷","月","灰","蒼"],BT_B=["の帝王","マスター","職人","の魔術師","番長","の貴公子","仙人","の狼","キング","の求道者","の亡霊","ブラザーズ"];
const btName=()=>{const a=BT_A[Math.random()*BT_A.length|0],b=BT_B[Math.random()*BT_B.length|0];return Math.random()<.35?["MC","DJ","Mr.","ミスター"][Math.random()*4|0]+a+["丸","太郎","次郎","子"][Math.random()*4|0]:a+b};
const ckS=()=>Math.max(0,Math.min(100,(G.ow&&G.ow.skill)||0));
/* タイミングゲージ：止めた位置で 2=ぴったり 1=まあまあ 0=はずれ */
function tmGauge(box,o,cb){const sk=ckS(),gw=o.great||(.07+sk*.0018),ow=o.ok||(gw+.16),c=.2+Math.random()*.6,sp=o.speed||(.75+Math.random()*.25);
box.innerHTML=`<div style="font-size:13px;text-align:center;margin-bottom:6px">${o.lead||""}</div><div style="position:relative;height:30px;border-radius:15px;background:#3a2a40;overflow:hidden"><div style="position:absolute;top:0;bottom:0;left:${(c-ow/2)*100}%;width:${ow*100}%;background:#e0a83a"></div><div style="position:absolute;top:0;bottom:0;left:${(c-gw/2)*100}%;width:${gw*100}%;background:#5ad07a"></div><div id="tmk" style="position:absolute;top:-3px;bottom:-3px;width:5px;border-radius:3px;background:#fff;box-shadow:0 0 6px #fff"></div></div><button class="on" id="tmb" style="width:100%;margin-top:10px;padding:13px;font-size:16px">${o.btn||"止める！"}</button>`;
const mk=box.querySelector("#tmk"),T0=performance.now();let raf,done=0;const pos=()=>{const t=(performance.now()-T0)/1000*sp;const p=t%2;return p<1?p:2-p};
const loop=()=>{if(done)return;mk.style.left="calc("+(pos()*100)+"% - 2px)";raf=requestAnimationFrame(loop)};loop();
box.querySelector("#tmb").onclick=()=>{if(done)return;done=1;cancelAnimationFrame(raf);const p=pos(),d=Math.abs(p-c);cb(d<=gw/2?2:d<=ow/2?1:0)}}
/* ---------- バトル ---------- */
function battleScene(done){const sn=esc(shopNm()),names=Array.from({length:7},btName),order=[0,1,2,3,4,5,6,7].sort(()=>Math.random()-.5),me=order.indexOf(0);
const B=order.map(i=>i===0?shopNm():names[i-1]),RS=[5.6,6.6,7.6],RN=["1回戦","準決勝","決勝"];let round=0;const RV=clubRivals();
const fee=10000;if(!G.lotto)evMoney(-fee,"大会のエントリー料");
const fl=(G.flu||[]).filter(i=>FL[i]);
clubScene({title:"🏆 シーシャバトル 🏆",col:"#ff4d7a",rivals:RV,lens:[2,3,2,3,2],ms:6000,done,ui:(fx,fin)=>{
const card=h=>`<div style="background:#1c1226;border:1px solid #ff4d7a55;border-radius:14px;padding:12px;font-size:14px;line-height:1.7">${h}</div>`;
const bracket=()=>{let h='<div style="font-size:12px">';for(let i=0;i<8;i+=2)h+=`<div style="display:flex;gap:6px;justify-content:center"><span style="${i===me?"color:#ffd54a;font-weight:800":""}">${esc(B[i])}</span><span style="opacity:.5">vs</span><span style="${i+1===me?"color:#ffd54a;font-weight:800":""}">${esc(B[i+1])}</span></div>`;return h+"</div>"};
const intro=()=>{fx.innerHTML=card(`<div style="font-weight:800;font-size:16px;text-align:center">「${sn}」出場！ 8人のトーナメント</div><div style="font-size:12px;opacity:.75;text-align:center;margin-bottom:6px">エントリー料 ${moneyTxt(fee)}／3回勝てば優勝</div>${bracket()}<button class="on" id="b0" style="width:100%;margin-top:10px">1回戦へ</button>`);fx.querySelector("#b0").onclick=pick};
let oppN="",th=null,sel=[];
const pick=()=>{oppN=round===0?B[me^1]:round===1?B[(((me>>1)^1)<<1)+(Math.random()*2|0)]:B[(me<4?4:0)+(Math.random()*4|0)];window.CLL=[null,null,null,oppN,null];th=BT_TH[Math.random()*BT_TH.length|0];sel=[];draw()};
const draw=()=>{const L=fl.map(i=>{const on=sel.includes(i);return`<button data-bf="${i}" style="margin:3px;padding:6px 9px;border-radius:14px;font-size:12px;${on?"background:#ff4d7a;color:#fff;border-color:#ff4d7a":""}"><span style="display:inline-block;width:9px;height:9px;border-radius:5px;background:${FL[i][1]};margin-right:4px"></span>${esc(FL[i][0])}</button>`}).join("");
fx.innerHTML=card(`<div style="font-weight:800;text-align:center">${RN[round]}　vs <span style="color:#ff9ab3">${esc(oppN)}</span></div><div style="text-align:center;margin:4px 0">お題：<b style="font-size:17px;color:#ffd54a">${th[0]}</b></div><div style="font-size:12px;opacity:.75;text-align:center">フレーバーを1〜3つ選んでミックス</div><div style="max-height:150px;overflow-y:auto;margin:6px 0;text-align:center">${L}</div><button class="on" id="b1" style="width:100%" ${sel.length?"":"disabled"}>この組み合わせで作る（${sel.length}/3）</button>`);
fx.querySelectorAll("[data-bf]").forEach(b=>b.onclick=()=>{const i=+b.dataset.bf;if(sel.includes(i))sel=sel.filter(x=>x!==i);else if(sel.length<3)sel.push(i);draw()});fx.querySelector("#b1").onclick=heat};
const heat=()=>{fx.innerHTML=card('<div id="tg"></div>');tmGauge(fx.querySelector("#tg"),{lead:"🔥 炭の火加減！ 緑で止めよう",btn:"火加減OK！"},judge)};
const judge=tq=>{const sk=ckS(),hit=sel.filter(i=>th[1].includes(FL[i][0])).length,mt=hit/sel.length,mix=sel.length>=2&&hit>=1?.6:0,base=2.2+sk/100*3.6+mt*2.2+mix+[0,.9,1.8][tq];
const js=[0,1,2].map(()=>Math.max(1,Math.min(10,Math.round(base+(Math.random()-.5)*2)))),os=[0,1,2].map(()=>Math.max(1,Math.min(10,Math.round(RS[round]+(Math.random()-.5)*2.4)))),ps=js.reduce((a,b)=>a+b,0),qs=os.reduce((a,b)=>a+b,0),win=ps>qs||(ps===qs&&Math.random()<.5);
const row=(n,a,t,c)=>`<div style="display:flex;justify-content:space-between;align-items:center;margin:3px 0"><span style="${c}">${esc(n)}</span><span>${a.map(x=>`<b style="display:inline-block;min-width:24px;text-align:center;background:#2b1d36;border-radius:6px;margin-left:3px">${x}</b>`).join("")}<b style="margin-left:8px;font-size:17px">${t}</b></span></div>`;
fx.innerHTML=card(`<div style="text-align:center;font-weight:800">${RN[round]}　審査員3人の採点</div>${row(shopNm(),js,ps,"color:#ffd54a;font-weight:800")}${row(oppN,os,qs,"")}<div style="font-size:12px;opacity:.75;margin-top:4px">お題に合ったフレーバー ${hit}/${sel.length}・火加減 ${["いまいち","まあまあ","ばっちり"][tq]}</div><div style="text-align:center;font-size:18px;font-weight:800;margin-top:6px;color:${win?"#5ad07a":"#ff6b6b"}">${win?"🎉 勝ち！":"😢 負け…"}</div><button class="on" id="b2" style="width:100%;margin-top:8px">${win&&round<2?"次へ":"結果を見る"}</button>`);
fx.querySelector("#b2").onclick=()=>{if(win&&round<2){round++;pick();return}const rk=win?1:[5,3,2][round];end(rk)}};
const end=rk=>{const m=battleApply(rk),head=rk===1?`🏆 「${sn}」優勝！！`:rk===2?`🥈 「${sn}」準優勝！`:rk===3?`「${sn}」はベスト4`:`「${sn}」は1回戦敗退…`;window.CLL=null;
fx.innerHTML=`<div style="background:#fffdf6;color:#2a2233;border-radius:14px;padding:12px 14px;font-size:14px;line-height:1.75"><div style="font-weight:800;font-size:17px;margin-bottom:2px">${head}</div>${m}<button class="on" id="b3" style="width:100%;margin-top:10px">OK</button></div>`;fx.querySelector("#b3").onclick=fin};
intro()}})}
/* ---------- フェス ---------- */
function festScene(done){const o=G.ow||{},sn=esc(shopNm()),N=12,lo=Math.max(3,Math.min(8,3+Math.round((o.star||0)/100*5)));const lens=[0,0,lo,0,0].map((v,i)=>i===2?v:1+Math.floor(Math.random()*6));
clubScene({title:"🎪 シーシャフェス 🎪",col:"#ffd54a",venue:"fest",rivals:clubRivals(),lens,ms:9000,done,ui:(fx,fin)=>{let n=0,gr=0,ok=0,dF=0,dS=0;const capF=20,capS=20,stp=3;
const card=h=>`<div style="background:#221a08;border:1px solid #ffd54a55;border-radius:14px;padding:12px;font-size:14px;line-height:1.7">${h}</div>`;
const intro=()=>{fx.innerHTML=card(`<div style="font-weight:800;font-size:16px;text-align:center">「${sn}」のブースに行列！</div><div style="font-size:13px;text-align:center">${N}人のお客さんに作ってふるまおう。<br>緑で止めると「美味しい！」→ 知名度かスター性が少し上がる<br><span style="opacity:.7;font-size:12px">技術が高いほど緑が広くなる</span></div><button class="on" id="f0" style="width:100%;margin-top:10px">スタート</button>`);fx.querySelector("#f0").onclick=next};
const next=()=>{if(n>=N){end();return}fx.innerHTML=card(`<div style="display:flex;justify-content:space-between;font-size:12px;opacity:.85"><span>${n+1}/${N}人目</span><span>美味しい ${gr}</span></div><div id="tg"></div><div id="fr" style="text-align:center;min-height:26px;font-weight:800"></div>`);
tmGauge(fx.querySelector("#tg"),{lead:"🔥 いい感じで止めて提供！",btn:"提供！",speed:.85+n*.05},q=>{n++;const r=fx.querySelector("#fr");if(q===2){gr++;let t="";if(Math.random()<.5&&dF+stp<=capF+1e-9){dF+=stp;t="知名度 +"}else if(dS+stp<=capS+1e-9){dS+=stp;t="スター性 +"}else if(dF+stp<=capF+1e-9){dF+=stp;t="知名度 +"}r.innerHTML=`<span style="color:#5ad07a">😋 美味しい！</span>${t?`<span style="font-size:12px;color:#ffd54a;margin-left:6px">${t}</span>`:""}`}else if(q===1){ok++;r.innerHTML='<span style="color:#e0c34a">🙂 ふつう</span>'}else r.innerHTML='<span style="color:#ff8a80">😐 うーん…</span>';setTimeout(next,750)})};
const end=()=>{const r=festApply({n:N,gr,ok,dF,dS});fx.innerHTML=`<div style="background:#fffdf6;color:#2a2233;border-radius:14px;padding:12px 14px;font-size:14px;line-height:1.75"><div style="font-weight:800;font-size:16px;margin-bottom:4px">🎉 「${sn}」フェス出店おつかれさま！</div>美味しい！ <b>${gr}</b>／ふつう ${ok}／うーん ${N-gr-ok}<br>ギャラ：<b>${moneyTxt(r.gal)}</b><br>フォロワー <b>+${r.fol.toLocaleString()}</b><br>知名度 <b>+${r.dF.toFixed(0)}</b>／スター性 <b>+${r.dS.toFixed(0)}</b><br>新しいフレーバー：<b>${r.fl.length?r.fl.map(esc).join("・"):"（もう全部持っていた）"}</b><button class="on" id="f9" style="width:100%;margin-top:10px">OK</button></div>`;fx.querySelector("#f9").onclick=fin};
intro()}})}
function festApply(R2){R2=R2||{n:12,gr:4,ok:4,dF:0,dS:0};const o=G.ow,gal=Math.round((o.star||0)*5000);evMoney(gal,"フェスのギャラ");const fol=Math.round(R2.n*400+R2.gr*600);o.fol+=fol;
o.fame=Math.min(100,(o.fame||0)+R2.dF);o.starB=(o.starB||0)+R2.dS;o.star=starOf(o);const fl=[];for(let i=0;i<3;i++){const f=flPick(5);if(f>=0){flUnlock(f,"フェスで出会った");fl.push(FL[f][0])}}
G.festN=(G.festN||0)+1;G.evDex=G.evDex||{};G.evDex[42]=(G.evDex[42]||0)+1;save();hud();return{gal,fl,fol,dF:R2.dF,dS:R2.dS}}

/* ===== 野外フェス会場（昼）：芝生・テント・ガーランド ===== */
let festSet=function(hk){const st=[],B=(...q)=>VB(st,...q),X0=-30,X1=37,Y1=46;
B(X0,-8,-1,X1-X0,Y1+8,1,(x,y)=>(y>=3&&y<=9)?(((x+y)%4)<2?"#e8d9b0":"#dccb9c"):(((Math.floor(x/3)+Math.floor(y/3))%2)?"#7cc46a":"#6db85c"));
/* 奥の植え込み */
B(X0,-9,0,X1-X0,2,4,(x,y,z)=>z<1?"#4a8a3a":((x*7+z*3)%5<2?"#5aa048":"#4f9640"));
/* テント（ブースごとの色の屋根） */
const TC=[["#ff6b6b","#fff4e6"],["#4dabf7","#fff4e6"],["#ffd43b","#fff4e6"],["#69db7c","#fff4e6"],["#b197fc","#fff4e6"]];
CLX.forEach((bx,i)=>{const c=TC[i];B(bx-1,0,0,8,3,5,(x,y)=>y===2?(i===2?"#ffd54a":"#ffffff"):"#f1e7d0");B(bx-1,0,5,8,3,1,"#c9a77a");
for(const [px,py] of[[bx-2,-2],[bx+7,-2],[bx-2,3],[bx+7,3]])B(px,py,0,1,1,15,"#e9ecef");
for(let q=0;q<3;q++)B(bx-3+q,-3+q,15+q,12-q*2,8-q*2,1,(x)=>((x-bx)%4+4)%4<2?c[0]:c[1]);
const h=hk[i]||["#2f6fa8","#3d86c6"];B(bx+4,0,6,2,2,1,h[0]);B(bx+4,0,7,2,2,2,h[1]);B(bx+4,0,9,1,1,3,"#c0c0c0");B(bx+4,0,12,2,2,1,"#ff7043")});
/* ガーランドの柱と旗 */
for(const px of[X0+2,X1-4])B(px,13,0,1,1,22,"#8d6e63");
for(let x=X0+3;x<X1-4;x+=2)B(x,13,20+Math.round(Math.sin((x-X0)/62*Math.PI)*-1.5),1,1,2,["#ff6b6b","#ffd43b","#4dabf7","#69db7c","#f783ac"][((x-X0)/2|0)%5]);
/* 木 */
for(const [px,py] of[[X0+2,24],[X1-6,26],[X0+4,40],[X1-7,40]]){B(px+1,py+1,0,1,1,7,"#7a5230");B(px-1,py-1,7,5,5,4,(x,y,z)=>(x+y+z)%3?"#4caf50":"#3f9a45");B(px,py,11,3,3,2,"#57b85b")}
return st}
let festBg=function(g,W,H){const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,"#7cc4ff");gr.addColorStop(.6,"#bfe6ff");gr.addColorStop(1,"#e9f7ff");g.fillStyle=gr;g.fillRect(0,0,W,H);
g.fillStyle="rgba(255,255,255,.85)";[[.18,.12,1],[.62,.08,1.3],[.85,.2,.9]].forEach(([x,y,q])=>{const cx0=W*x,cy0=H*y,r=W*.05*q;g.beginPath();g.arc(cx0,cy0,r,0,7);g.arc(cx0+r*1.1,cy0+r*.2,r*.8,0,7);g.arc(cx0-r*1.1,cy0+r*.25,r*.7,0,7);g.fill()})}
let festSun=function(g,W,H,t){g.save();g.globalCompositeOperation="lighter";const r=g.createRadialGradient(W*.92,H*.02,5,W*.92,H*.02,W*.55);r.addColorStop(0,"rgba(255,240,180,.35)");r.addColorStop(1,"rgba(255,240,180,0)");g.fillStyle=r;g.fillRect(0,0,W,H);g.restore()}

/* ===== フェス会場：バトルとは別のクラブ（青緑のネオン・光るダンスフロア・ミラーボール） ===== */
festSet=function(hk){const st=[],B=(...q)=>VB(st,...q),X0=-30,X1=37,Y1=46;
B(X0,-8,-1,X1-X0,Y1+8,1,(x,y)=>{if(y>=12&&y<=34&&x>=-14&&x<=20){const t=(Math.floor((x+14)/4)+Math.floor((y-12)/4))%4;return["#ff4fd8","#3ee6ff","#ffe14a","#7a5cff"][t]}return((x+y)%2)?"#2a4660":"#244058"});
B(X0,-9,0,X1-X0,1,27,(x,y,z)=>z===0?"#3ee6ff":(x%6===0?"#335a78":"#2b4c68"));B(X0-1,-9,0,1,Y1+9,27,(x,y,z)=>z===0?"#3ee6ff":(y%6===0?"#335a78":"#2b4c68"));
/* 奥のLEDウォール（波模様） */
B(-14,-8,8,34,1,13,(x,y,z)=>{const v=Math.sin((x+3)/3)+Math.cos(z/2.2);return v>1?"#ffe14a":v>.2?"#ff4fd8":v>-.6?"#3ee6ff":"#14243a"});
/* トラスとライト */
for(const y of[-6,0])B(X0+1,y,25,X1-X0-2,1,1,"#9fb3c8");for(let x=X0+3;x<X1-2;x+=5)for(const y of[-6,0]){B(x,y,23,2,1,2,"#222");B(x,y,22,2,1,1,"#3ee6ff")}
/* ミラーボール */
B(-25,12,23,1,1,3,"#cfd8e3");B(-27,10,19,5,5,4,(x,y,z)=>((x+y+z)%2)?"#e8f4ff":"#9fb3c8");
/* ブース */
CLX.forEach((bx,i)=>{B(bx-1,0,0,8,3,5,(x,y)=>y===2&&(x-bx)%2===0?(i===2?"#ffd54a":"#3ee6ff"):"#16283a");B(bx-1,0,5,8,3,1,"#4a6a88");const h=hk[i]||["#2f6fa8","#3d86c6"];
B(bx+4,0,6,2,2,1,h[0]);B(bx+4,0,7,2,2,2,h[1]);B(bx+4,0,9,1,1,3,"#c0c0c0");B(bx+4,0,12,2,2,1,"#ff7043")});
/* スピーカー */
for(const [px,py] of[[X0+2,1],[X1-5,1]])B(px,py,0,3,3,9,(x,y,z)=>z===8?"#222":(z%3===1?"#3ee6ff":"#121a24"));
return st};
festBg=function(g,W,H){g.fillStyle="#123048";g.fillRect(0,0,W,H);const r=g.createRadialGradient(W/2,H*.15,10,W/2,H*.2,W*.8);r.addColorStop(0,"rgba(62,230,255,.4)");r.addColorStop(1,"rgba(62,230,255,0)");g.fillStyle=r;g.fillRect(0,0,W,H)};
festSun=function(g,W,H,t){};

/* ===== ひめ：赤茶→ピンクのグラデの縦ロールツインテ・ぱっつん前髪・ピンクの大きなフリルのヘッドドレス・黒リボン・ハートの紫の目・黒×ピンクのメイド服 ===== */
SPF.hime=({H,Q4,hr,sit})=>{const D="#5e1830",M="#8e3048",L="#c86878",E="#e8a0aa",PK="#f4a6c8",PK2="#e27fb0",WT="#fff6fa",K="#1b1b22",PB="#f5b8d0";
 /* 髪：頭頂・後ろ・ぱっつん前髪・横 */
 H(0,0,6,8,6,1,D);H(0,0,-2,8,1,8,D);H(-1,1,-1,1,5,7,D);H(8,1,-1,1,5,7,D);
 H(0,5,4,8,1,2,M);H(0,5,4,1,1,1,D);H(7,5,4,1,1,1,D);
 /* 縦ロール（左右）：下にいくほど明るく、段ごとにずらしてくるくる感 */
 for(const sx of[-3,9]){for(let z=2;z>-13;z--){const t=(2-z)/15,col=t<.3?M:t<.6?L:E,o=((z%2)+2)%2;H(sx-(sx<0?o:0),1+o,z,2,2,1,col);if(z%3===0)H(sx+(sx<0?1:-1)*0,2,z,1,1,1,D)}H(sx,1,-13,2,1,1,E)}
 /* 黒いリボン（ツインテの根元） */
 for(const sx of[-4,9]){H(sx,2,3,3,2,1,K);H(sx+(sx<0?-1:2),2,4,1,2,2,K);H(sx+(sx<0?-1:2),2,1,1,2,2,K);H(sx+1,2,2,1,2,2,"#33333d")}
 /* ピンクの大きなフリルのヘッドドレス */
 H(-1,4,6,10,2,1,WT);H(-1,5,6,10,1,1,"#e8d4f0");H(-2,1,7,12,5,1,PK);H(-2,0,8,12,4,1,PK2);for(let x=-2;x<10;x+=3){H(x,1,9,2,3,1,PK);H(x,4,8,2,1,1,"#ffd0e4")}H(-3,1,6,1,4,2,PK);H(10,1,6,1,4,2,PK);
 /* 目：紫・ハートのハイライト */
 for(const x0 of[1,5]){const Lf=x0===1;H(x0,5,3,2,1,1,"#3a1a2a");H(x0,5,2,2,1,1,"#8a4fb0");H(x0,5,1,2,1,1,"#b07ad8");H(Lf?x0:x0+1,5,2,1,1,1,"#ffffff");H(Lf?x0+1:x0,5,1,1,1,1,"#ff8fc8");H(Lf?x0-1:x0+2,5,3,1,1,1,"#3a1a2a")}
 H(0,5,0,1,1,1,"#ffb6c6");H(7,5,0,1,1,1,"#ffb6c6");H(3,5,0,2,1,1,"#e38a9c");
 /* 服：ピンクのリボン・ボタン・エプロン・フリル */
 const y=3.04;for(let x=1.25;x<2.75;x+=.25)Q4(x,y,7.75,(x>1.7&&x<2.3)?PB:"#f7c6dc");Q4(1,y,7.5,PB);Q4(2.75,y,7.5,PB);Q4(1.75,y,7.25,PB);Q4(2,y,7.25,PB);
 [6.75,6.25,5.75].forEach(z=>Q4(1.875,y+.02,z,PK2,.25));
 for(let z=3.25;z<5.5;z+=.25)for(let x=1.25;x<2.75;x+=.25)Q4(x,y,z,(x<1.4||x>2.55)?K:"#f7c6dc");for(let x=1;x<3;x+=.25)Q4(x,y,5.5,K);
 for(let x=.5;x<3.6;x+=.25)Q4(x,3.1,6.25,"#e9a8c4",.25);
 if(!sit){for(let x=.25;x<3.8;x+=.5)Q4(x,3.52,2.75,(x*2)%2?PK:"#ffd0e4");for(let x=.5;x<3.6;x+=.5)Q4(x,3.52,3.25,K)}};
SPF.hime.ownEye=1;
/* ひめの脚はグレーのニーハイ */
{const _pv=pv;pv=function(t){const n0=t.length,r=_pv.apply(this,arguments),c=arguments[4];try{if(c&&c.sp==="hime")for(let i=n0;i<t.length;i++){const v=t[i];if(v[3]===c.skin&&v[2]<3.6)v[3]=v[2]<1.2?"#3b3942":"#55525e"}}catch(e){}return r}}

/* ===== 野郎シーシャ会にカナメの中身を移し、No.148をひめに（遊んでいるデータにも反映） ===== */
{const YA={"fl": 0, "ls": ["名乗れば誰でも野郎シーシャ会", "スミレちゃーん", "今日下着何色なん？", "それラッキースケベ！", "最近何かオモロい事あった？", "うまー！！", "シーシャ結局調整力"], "bye": "サンキュー！", "sp": "kaname", "hs": 98, "hair": "#161616", "skin": "#e8c3a0", "shirt": "#f4f4f2", "top": 0, "bot": 1, "pants": "#2f3a4a", "sl": 2, "shoe": "#e9e9e9", "acc": 0, "eye": 1},HI={"name": "ひめ", "sex": "女性", "age": 24, "job": "シーシャ屋", "sp": "hime", "hs": 98, "hair": "#5e1830", "skin": "#fbe4dc", "shirt": "#26242c", "pants": "#1e1e24", "top": 0, "bot": 2, "sl": 1, "shoe": "#1a1a1a", "fat": 0, "acc": 0, "eye": 0, "fl": 5, "ls": [], "bye": "ありがとうございました♡", "fav": "subculture"};if(!G.hime1){const a=G.cs[142],b=G.cs[147];if(a&&!a.ed)Object.assign(a,YA);if(b&&!b.ed)Object.assign(b,HI);G.hime1=1;try{save()}catch(e){}}}

/* ===== ひめ（No.148）からもらえる非売品：メイド服のトルソー ===== */
DMD.gf_147=["1b1b22,2a2830,6b4a35,c9a24a,e27fb0,efe2d0,f4a6c8,f5b8d0,f7c6dc,fff6fa", "RgACRwACSAACSQACVQACVgACVwACWAACWQACWgACZAACZQACZgACZwACaAACaQACagACawACdAACdQACdgACdwACeAACeQACegACewAChAAChQAChgAChwACiAACiQACigACiwAClAAClQAClgAClwACmAACmQACmgACmwACpQACpgACpwACqAACqQACqgACtgACtwACuAACuQACVgECVwECWAECWQECZQECZgECZwECaAECaQECagECdQECdgECdwECeAECeQECegEChQEChgEChwECiAECiQECigEClQEClgEClwECmAECmQECmgECpgECpwECqAECqQECdwIDeAIDhwIDiAIDdwMDeAMDhwMDiAMDdwQDeAQDhwQDiAQDdwUDeAUDhwUDiAUDJwYGKAYGNQYGNgYGNwYGOAYGOQYGOgYGRAYGRQYGSgYGSwYGVAYGWwYGYwYGZAYGawYGbAYGcwYGdAYGdwYDeAYDewYGfAYGgwYGhAYGhwYDiAYDiwYGjAYGkwYGlAYGmwYGnAYGpAYGqwYGtAYGtQYGugYGuwYGxQYGxgYGxwYGyAYGyQYGygYG1wYG2AYGNgcBNwcBOAcBOQcBRQcBRgcBSQcBSgcBVAcBVQcBWgcBWwcBZAcBawcBdAcBewcBhAcBiwcBlAcBmwcBpAcBpQcBqgcBqwcBtQcBtgcBuQcBugcBxgcBxwcByAcByQcBNggANwgEOAgAOQgERQgARggERwgASAgESQgASggEVAgAVQgEWggAWwgEZAgEawgAdAgAewgIhAgEiwgIlAgAmwgApAgEpQgAqggEqwgAtQgEtggAtwgEuAgAuQgEuggAxggExwgAyAgEyQgARgkARwkASAkASQkAVQkAVgkAWQkAWgkAZAkAZQkAagkAawkAdAkAewkIhAkAiwkIlAkAlQkAmgkAmwkApQkApgkAqQkAqgkAtgkAtwkAuAkAuQkARgoARwoASAoASQoAVQoAVgoAWQoAWgoAZQoAagoAdQoAegoIhQoAigoIlQoAmgoApQoApgoAqQoAqgoAtgoAtwoAuAoAuQoARwsASAsAVgsAVwsAWAsAWQsAZQsAagsAdQsAegsIhQsAigsIlQsAmgsApgsApwsAqAsAqQsAtwsAuAsAVgwAVwwAWAwAWQwAZQwAZgwAaQwAagwAdQwAegwIhQwAigwIlQwAlgwAmQwAmgwApgwApwwAqAwAqQwAVw0AWA0AZg0AaQ0AdQ0Adg0AeQ0Aeg0AhQ0Ahg0AiQ0Aig0Alg0AmQ0Apw0AqA0AVw4AWA4AZg4AZw4AaA4AaQ4Adg4Adw4AeA4AeQ4Ihg4Ahw4AiA4AiQ4Ilg4Alw4AmA4AmQ4Apw4AqA4AVw8AWA8AZg8AZw8AaA8AaQ8Adg8Adw8AeA8AeQ8Ihg8Ahw8AiA8AiQ8Ilg8Alw8AmA8AmQ8Apw8AqA8AVxAAWBAAZhAAZxAAaBAAaRAAdhAAdxAAeBAAeRAIehAEhhAAhxAAiBAAiRAIlhAAlxAAmBAAmRAApxAAqBAANhEGNxEGOBEGOREGVxEAWBEAZhEAZxEAaBEAaREAdhEAdxEAeBEAeREAhhEAhxEAiBEAiREAlhEAlxEAmBEAmREApxEAqBEAxhEGxxEGyBEGyREGNhIANxIAOBIAORIARhIARxIASBIASRIAVxIAWBIAZhIAZxIAaBIAaRIAdhIAdxIAeBIAeRIAehIEhhIAhxIAiBIAiRIAlhIAlxIAmBIAmRIApxIAqBIAthIAtxIAuBIAuRIAxhIAxxIAyBIAyRIANhMANxMAOBMAORMARhMARxMASBMASRMAVxMAWBMAZhMAZxMAaBMAaRMAdhMAdxMAeBMAeRMAehMHhhMAhxMAiBMAiRMAihMHlhMAlxMAmBMAmRMApxMAqBMAthMAtxMAuBMAuRMAxhMAxxMAyBMAyRMARhQARxQASBQASRQAVxQAWBQAWRQJZhQAZxQAaBQAaRQJahQHdhQAdxQAeBQAeRQJehQHhhQAhxQAiBQAiRQJihQHlhQAlxQAmBQAmRQJmhQHpxQAqBQAqRQJthQAtxQAuBQAuRQAahUHdxUFeBUFhxUFiBUFmhUHNxYAOBYAdxYFeBYFhxYFiBYFxxYAyBYANxcAOBcARhcGRxcGSBcGSRcGShcJVRcGVhcGVxcGWBcGWRcGWhcJZRcGZhcGZxcGaBcGaRcGahcJdRcGdhcGdxcGeBcGeRcGehcJhRcGhhcGhxcGiBcGiRcGihcJlRcGlhcGlxcGmBcGmRcGmhcJpRcGphcGpxcGqBcGqRcGqhcJthcGtxcGuBcGuRcGuhcJxxcAyBcARRgERhgERxgESBgESRgEZRgGZhgGZxgGaBgGaRgGhRgEhhgEhxgEiBgEiRgEpRgGphgGpxgGqBgGqRgG"];{const x={"id":"gf_147","n":"ひめのメイド服","p":4000,"t":{"fantasy":2},"u":["gift",0],"g":147};if(!DEC.some(d=>d.id===x.id))DEC.push(x);GIFT[147]=x}

/* ===== 図鑑の並び：芸能人の次にレジェンド2人→シーシャ屋（おぢサンとのどかは連番、ノムはNo.150） ===== */
{const ORD2=[141,142,130,134,132,133,131,135,143,136,137,149,139,140,144,145,146,147,148,138,150],_dx=dxN;dxN=function(c){const r=_dx(c);if(DXC&&!DXC.ord2){ORD2.forEach((i,k)=>{DXC.m[i]=131+k});DXC.ord2=1}return DXC.m[c.i]||r}}

/* ===== 店主の着せ替え（追加10種ずつ） ===== */
const PRN={yaro:["88b465", "7e9956", "968e2d", "88a144", "6d6a43", "c06055", "5e8a63", "69773c", "7e6a3d", "5e735b", "4c8970", "389e84", "586f77", "81814a", "62705d", "4ca694", "96784b", "a68045", "baa41e", "70942f", "928a55", "8a7a6f", "688a8b", "6a978b", "86652f", "8c863d", "1fa1a7", "20809e", "796355", "da651a", "917640", "408b7e", "897c30", "ad782c", "bb952e", "7c9f4c", "94ab8c", "040106", "010000", "7a6864", "d0a951", "ac8d25", "63ae6f", "3d748a", "b5752c", "dc6a12", "aa8229", "497b82", "aa9d28", "bb8733", "65795c", "a3c169", "81766a", "0d0d0d", "070806", "010606", "454b48", "9b9271", "8aa73f", "5e8e70", "8b6954", "c38d17", "7c7556", "698e6a", "a79c1f", "b78f33", "be5823", "cb9550", "938c8a", "262827", "010101", "0b0a08", "000000", "4c483f", "aba77a", "678f7b", "747f92", "738288", "368c81", "80b351", "978e25", "b8a223", "ae542a", "73a5a5", "3c433d", "090808", "0b0c0a", "050504", "090908", "010202", "353334", "555153", "4c4e49", "605f5e", "5aafb9", "57af7a", "887f26", "b2ac40", "cc7344", "97654d", "636f66", "232020", "0a0a09", "080807", "070706", "020201", "100f0d", "979694", "989493", "6e6a63", "5a5758", "57b6a8", "b69632", "9ca18e", "998c91", "d1baa6", "635b58", "060805", "040403", "000000", "090907", "020201", "212120", "9a9a98", "848482", "8d8e89", "585352", "64a19f", "819e73", "b79b91", "242a29", "171c1d", "000000", "080707", "0f0f0d", "34383a", "000002", "000000", "454441", "9a9895", "8e8c8b", "989696", "746b69", "888a8c", "4a6e63", "83886d", "4e4c4c", "61615f", "adadae", "2c2b2a", "181a1a", "d89d7b", "665747", "060508", "555552", "a09e9a", "898887", "49423f", "587271", "619092", "8b6d46", "4c8b9a", "719286", "a18b8b", "cfcf9e", "2e332c", "403a41", "b59f6c", "9ab260", "707979", "262322", "4e5257", "505150", "554a45", "49afb4", "467d6b", "bc6f1d", "55867c", "5c9092", "302422", "a2a59e", "474846", "545c68", "62b36f", "76a04e", "545a5c", "5a574e", "a5bb7c", "63665c", "484342", "669391", "a35b31", "b18718", "6d7b65", "8e9678", "26272b", "838c85", "6d9c9a", "8bb170", "677d3c", "a28183", "494d51", "7a7973", "e1aa6a", "605247", "373c40", "868a91", "c3811b", "787454", "2f8e92", "87b47f", "b08c6e", "899a4e", "448063", "738d42", "797335", "7c8c67", "98875c", "89ae85", "5abcb7", "719fa7", "a39073", "7f836f", "796961", "6a7057", "72946d", "74825e", "997d32", "7ba14e", "428a7f", "966c5e", "78852a", "af5b2a", "698429", "8a9342", "6a7745", "43ae90", "61ad93", "689779", "63666e", "536e6e", "816943", "9a7b38", "829d49", "4b786a", "738c65", "c24b51", "787534", "b15b28", "978044", "acbb39", "ab871d", "875344", "3b8f83", "3c7b82", "684e63"]};
const OWH=[["センター分け"],["オールバック"],["ゆるふわパーマ"],["ツンツンヘア"],["縦ロール"],["ちょんまげ"],["編み込み"],["ハーフアップ"],["刈り上げベリーショート"],["ロングウェーブ"]];
const OWT=[["パーカー"],["ニット"],["タイダイT"],["ポロシャツ"],["甚平"],["レザージャケット"],["ベスト＋シャツ"],["ミリタリーシャツ"],["野郎シーシャ会T"],["店名入りT"]];
const OWB=[["デニム"],["ワイドパンツ"],["カーゴパンツ"],["迷彩ハーフパンツ"],["ジャージパンツ"],["ロングスカート"],["プリーツスカート"],["サルエルパンツ"],["タキシードパンツ"],["スウェット"]];
const NBC={};function nameBmp(t){t=String(t||"").trim()||"SHEESHA";if(NBC[t])return NBC[t];const W=32,F='bold 13px "Hiragino Kaku Gothic ProN","Hiragino Sans","Noto Sans JP","Yu Gothic",sans-serif',m=document.createElement("canvas").getContext("2d");m.font=F;const one=m.measureText(t).width;let L=[t];if(one>W*1.5&&t.length>=4){let h=Math.ceil(t.length/2);const sp=[...t].map((ch,i)=>/[\s　・]/.test(ch)?i:-1).filter(i=>i>0);if(sp.length){h=sp.sort((a,b)=>Math.abs(a-t.length/2)-Math.abs(b-t.length/2))[0];L=[t.slice(0,h).trim(),t.slice(h+1).trim()]}else L=[t.slice(0,h),t.slice(h)]}const LH=13,Hh=LH*L.length,cv=document.createElement("canvas");cv.width=W;cv.height=Hh;const g=cv.getContext("2d");g.font=F;g.textBaseline="middle";g.fillStyle="#000";L.forEach((s2,i)=>{const w=g.measureText(s2).width||1,k=Math.min(1,(W-1)/w);g.setTransform(k,0,0,1,(W-w*k)/2,0);g.fillText(s2,0,LH*i+LH/2+.5)});const im=g.getImageData(0,0,W,Hh).data,d=[];for(let i=0;i<W*Hh;i++)d.push(im[i*4+3]>110?1:0);return NBC[t]={w:W,h:Hh,d}}
function OWXD(c,o){const{H,B,Qv,Q4,hr,sk,sh,pa,sit,top,back,sides,bangs}=o,dk=dkHex(hr,.72),lt=dkHex(hr,1.3),shd=dkHex(sh,.72),shl=dkHex(sh,1.3),pad=dkHex(pa,.72),pal=dkHex(pa,1.3),FY=3.04;
const front=(x0,x1,z0,z1,fn,y)=>{for(let x=x0;x<x1-1e-6;x+=.25)for(let z=z0;z<z1-1e-6;z+=.25){const col=fn(x,z);if(col)Q4(x,y||FY,z,col)}};
const sleeve=fn=>{if(sit&&false)return;for(const ax of[0,3]){let k=ax;for(let x=ax;x<ax+1-1e-6;x+=.25)for(let z=6;z<8-1e-6;z+=.25){Q4(x,FY+.01,z,fn(x,z,k++))}for(let y=1;y<3-1e-6;y+=.25)for(let z=6;z<8-1e-6;z+=.25){Q4(ax===0?-.24:3.99,y,z,fn(y,z,k++));}for(let x=ax;x<ax+1-1e-6;x+=.25)for(let y=1;y<3-1e-6;y+=.25)Q4(x,y,8,fn(x,y,k++))}};
/* ---- 髪型 ---- */
const h=c.h2|0;
if(h===1){top();back(0,6);H(-1,1,2,1,4,4,hr);H(8,1,2,1,4,4,hr);H(0,5,4,3,1,2,hr);H(5,5,4,3,1,2,hr);H(0,5,3,2,1,1,hr);H(6,5,3,2,1,1,hr);H(3,5,5,2,1,1,dk)}
else if(h===2){top();H(0,-1,1,8,1,6,hr);H(-1,0,3,1,5,3,hr);H(8,0,3,1,5,3,hr);H(0,5,5,8,1,1,hr);H(1,1,7,6,5,1,hr);H(1,2,8,6,3,1,lt)}
else if(h===3){top();H(-1,0,0,1,6,6,hr);H(8,0,0,1,6,6,hr);H(0,-1,0,8,1,7,hr);for(let x=-1;x<9;x+=2)for(let y=0;y<6;y+=2)H(x,y,7+((x+y)/2&1),2,2,1,(x+y)%4?hr:lt);H(0,5,4,8,1,2,hr);for(let x=0;x<8;x+=2)H(x,5,3,1,1,1,(x/2&1)?hr:lt)}
else if(h===4){top();back(0,6);sides(3,3);for(const[x,y,t]of[[0,0,3],[2,1,4],[4,0,3],[6,1,4],[1,3,4],[5,3,4],[3,2,5],[-1,2,2],[8,2,2],[3,4,3]])H(x,y,8,1,1,t,t>3?hr:lt);H(0,5,4,8,1,2,hr);H(2,5,3,1,1,1,hr);H(5,5,3,1,1,1,hr)}
else if(h===5){top();back(-2,8);H(-1,1,-1,1,5,7,hr);H(8,1,-1,1,5,7,hr);H(0,5,4,8,1,2,hr);for(const sx of[-3,9]){for(let z=2;z>-13;z--){const o2=((z%2)+2)%2;H(sx-(sx<0?o2:0),1+o2,z,2,2,1,z%3?hr:lt)}}}
else if(h===6){H(0,0,6,8,6,1,sk);H(0,0,0,8,1,6,hr);H(-1,0,1,1,5,4,hr);H(8,0,1,1,5,4,hr);H(2,1,7,4,4,1,hr);H(3,1,8,2,1,1,hr);H(3,0,8,2,3,2,dk);H(3,3,9,2,2,1,hr)}
else if(h===7){top();back(0,6);sides(2,4);H(0,5,4,8,1,2,hr);for(let z=3;z>-9;z--){const o2=(z&1);H(-2-o2,3,z,2,2,1,z%2?hr:dk)}H(-2,3,-9,2,2,1,"#ff9ab0")}
else if(h===8){top();H(0,0,-4,8,2,10,hr);H(-1,1,-4,1,4,10,hr);H(8,1,-4,1,4,10,hr);bangs();H(3,0,7,2,2,2,hr);H(2,-1,7,4,1,1,"#f5b8d0")}
else if(h===9){top();H(0,0,3,8,1,3,dk);H(0,0,4,1,5,2,dk);H(7,0,4,1,5,2,dk);H(0,4,5,8,2,1,hr)}
else if(h===10){top();H(0,0,-8,8,2,14,hr);for(let z=-8;z<5;z++){const w=((z+20)%4<2)?1:0;H(-1-w,1,z,1,4,1,hr);H(8+w,1,z,1,4,1,hr);if(z%4===0){H(-1,1,z,1,4,1,lt);H(8,1,z,1,4,1,lt)}}bangs();H(0,5,3,1,1,1,hr);H(7,5,3,1,1,1,hr)}
/* ---- 服 ---- */
const t=c.t2|0;
if(t===1){front(1.5,2.5,4.25,5.25,()=>shd);for(const x of[1.5,2.25])for(let z=6.75;z>5.9;z-=.25)Q4(x+.0625,FY+.02,z,"#f4f4f4",.125);for(let x=1;x<3;x+=.25){Q4(x,.75,7.75,shd);Q4(x,.75,7.5,shd)}Q4(1,1,8,shd);Q4(2.75,1,8,shd)}
else if(t===2){front(1,3,4,8,(x,z)=>z<4.5?shd:((Math.round(x*4)%3===1)?((Math.round(z*4)%2)?shl:shd):null));}
else if(t===3){const C0=["#ff5c8a","#ffd84a","#5ac8fa","#7bd389","#b28bff","#ff9f43"];sleeve((x,z,k)=>C0[Math.floor(k*1.7+z*3)%6]);const C=["#ff5c8a","#ffd84a","#5ac8fa","#7bd389","#b28bff","#ff9f43"];front(1,3,4,8,(x,z)=>{const d=Math.hypot(x-2,z-6);return C[Math.floor(d*3.2+Math.atan2(z-6,x-2)*.6+6)%6]})}
else if(t===4){front(1.5,2.5,7.5,8,()=>shd);Q4(1.25,FY,7.75,shd);Q4(2.5,FY,7.75,shd);for(const z of[7.25,6.75])Q4(1.94,FY+.02,z,"#f4f4f4",.125);front(1,1.25,4,8,()=>null)}
else if(t===5){for(let z=4.25;z<8;z+=.25){const x=1+(8-z)*.4;Q4(Math.min(2.75,x),FY+.02,z,shd)}front(1,3,4,4.25,()=>shd);Q4(2.75,FY+.02,5.5,shd);Q4(2.75,FY+.02,5.25,"#f4f4f4");for(let x=1;x<3;x+=.5)for(let z=4.5;z<7.5;z+=1)Q4(x+.125,FY+.01,z,shl,.125)}
else if(t===6){const LJ="#1d1b1f",LH="#3a363d";sleeve(()=>LJ);front(1,3,4,8,(x,z)=>(x>=1.75&&x<2.25&&z<7.5)?null:(x<1.25||x>=2.75?LH:LJ));front(1.5,2.5,7.25,8,(x,z)=>(Math.abs(x-2)>.25)?LH:null,FY+.03);for(let z=4.25;z<7.4;z+=.25)Q4(2.25,FY+.02,z,"#c0c0c8",.125);for(let x=1;x<3;x+=.25)for(let z=4;z<8;z+=.25){Q4(x,.75,z,LJ)}for(const xx of[.75,3])for(let z=4;z<8;z+=.25)for(let y=1;y<3;y+=.25)Q4(xx,y,z,LJ)}
else if(t===7){sleeve(()=>"#f4f4f4");front(1,3,4,8,(x,z)=>(x>=1.75&&x<2.25&&z>5.5)?(x>=1.875&&x<2.125&&z<7.6?"#c0392b":"#f4f4f4"):null);for(const z of[4.75,5.25])Q4(1.94,FY+.02,z,"#d4a017",.125);for(const xx of[.75,3])for(let z=4.25;z<7.5;z+=.25)for(let y=1;y<3;y+=.25)Q4(xx,y,z,"#f4f4f4")}
else if(t===8){front(1.25,1.75,5.75,6.5,()=>shd);front(2.25,2.75,5.75,6.5,()=>shd);for(const z of[7,6.25,5.5,4.75])Q4(1.94,FY+.02,z,"#3b3420",.125);let r=11;const rn=()=>(r=(r*9301+49297)%233280)/233280;for(let i=0;i<14;i++)Q4(1+Math.floor(rn()*8)*.25,FY+.01,4+Math.floor(rn()*16)*.25,i%2?shd:shl)}
else if(t===9){const P=PRN.yaro,sz=.125;for(let r=0;r<16;r++)for(let q=0;q<16;q++)Q4(1+q*sz,FY,7-r*sz,"#"+P[r*16+q],sz)}
else if(t===10){const bm=nameBmp(c.prT||((G.ow&&G.ow.shop)||"SHEESHA")),S=.05;for(let r=0;r<bm.h;r++)for(let q=0;q<bm.w;q++)if(bm.d[r*bm.w+q])Q4(1.2+q*S,FY+.02,(bm.h>14?7.35:7)-r*S,"#ffffff",S);front(1,3,6.1,6.2,()=>null)}
/* ---- ズボン ---- */
const b=c.b2|0;if(sit){if(b===6||b===7){for(let x=.75;x<3.3;x+=.25)for(let y=1;y<4.5;y+=.25)Q4(x,y,3.75,pa)}return}
const legs=(fn)=>{for(const lx of[1,2])for(let x=lx;x<lx+1-1e-6;x+=.25)for(let z=1;z<4-1e-6;z+=.25){const col=fn(x,z,lx);if(col)Q4(x,FY,z,col)}};
if(b===1){legs((x,z)=>(Math.abs(x-1.5)<.13||Math.abs(x-2.5)<.13)?pal:(z>3.5&&(x<1.25||x>=2.75))?pad:null);for(const lx of[1,2])Q4(lx+.375,FY+.01,1.25,pal,.125)}
else if(b===2){for(let z=1;z<3.6;z+=.25)for(const[xx,yy]of[[.75,1],[.75,1.5],[.75,2],[.75,2.5],[3,1],[3,1.5],[3,2],[3,2.5]])Q4(xx,yy,z,pa);for(let z=1;z<3.6;z+=.25)for(let x=.75;x<3.3;x+=.25){Q4(x,.75,z,pa);Q4(x,FY,z,x>1.9&&x<2.1?pad:pa)}}
else if(b===3){for(const xx of[.75,3])for(let z=2;z<3;z+=.25)for(let y=1.5;y<2.6;y+=.25)Q4(xx,y,z,pad);for(const xx of[.75,3])Q4(xx,2,2.75,dkHex(pa,.5),.125)}
else if(b===4){const C=["#4b5320","#7a6a3a","#2f3a22","#8a8a5a"];let r=7;const rn=()=>(r=(r*9301+49297)%233280)/233280;legs((x,z)=>z<2?sk:C[Math.floor(rn()*4)]);for(const xx of[.75,3])for(let z=2;z<4;z+=.25)for(let y=1;y<3;y+=.25)Q4(xx,y,z,C[Math.floor(rn()*4)])}
else if(b===5){for(let z=1;z<4;z+=.25){Q4(1,FY+.01,z,"#ffffff");Q4(2.75,FY+.01,z,"#ffffff")}legs((x,z)=>z<1.25?pad:null)}
else if(b===6){for(let z=.75;z<4;z+=.25){const w=.25+(4-z)*.12;for(let x=1-w;x<3+w;x+=.25){Q4(x,FY+w*.3,z,pa);Q4(x,.75-w*.3,z,pa)}for(let y=.75;y<3.2;y+=.25){Q4(1-w,y,z,pa);Q4(2.75+w,y,z,pa)}}}
else if(b===7){for(let z=2.5;z<4;z+=.25){const w=.25+(4-z)*.2;for(let x=1-w;x<3+w;x+=.25){Q4(x,FY+w*.4,z,(Math.round(x*4)%2)?pa:pad);Q4(x,.75-w*.3,z,pa)}for(let y=.75;y<3.2;y+=.25){Q4(1-w,y,z,pa);Q4(2.75+w,y,z,pa)}}legs((x,z)=>z<2.5?sk:null)}
else if(b===8){for(let z=2;z<3.5;z+=.25)for(let x=.75;x<3.3;x+=.25){Q4(x,FY+.2,z,pa)}for(const xx of[.75,3])for(let z=2;z<3.75;z+=.25)for(let y=1;y<3;y+=.25)Q4(xx,y,z,pa);legs((x,z)=>z<1.5?pad:null)}
else if(b===9){for(let z=1;z<4;z+=.25){Q4(1,FY+.01,z,"#3a3a3a",.125);Q4(2.875,FY+.01,z,"#3a3a3a",.125)}legs((x,z)=>(z>3.6&&Math.abs(x-2)<.6)?pad:null)}
else if(b===10){legs((x,z)=>z<1.5?pad:(z>3.6?pad:null));Q4(1.875,FY+.02,3.75,"#f4f4f4",.125);Q4(2.0,FY+.02,3.75,"#f4f4f4",.125);Q4(1.875,FY+.02,3.5,"#f4f4f4",.125);Q4(2.0,FY+.02,3.5,"#f4f4f4",.125)}
}

/* ===== 店主の着せ替え：解禁条件 ===== */
const OWL={h:OWH,t:OWT,b:OWB};
const OWC={
h1:["営業30日",()=>(G.day||0)>=30],h2:["借金を完済",()=>!!G.loan&&G.loan.bal<=0&&(G.month||0)>0],h3:["ガチャ"],h4:["ガチャ"],h5:["図鑑30人",()=>G.cs.filter(c=>c.met).length>=30],
h6:["ハロウィンの日に営業",()=>!!G.owHal],h7:["チェキを5回撮る",()=>(G.ckN||0)>=5],h8:["フォロワー1,000人",()=>((G.ow||{}).fol||0)>=1000],h9:["フェスに出店",()=>(G.festN||0)>=1],h10:["バトルで優勝",()=>(G.batW||0)>=1],
t1:["のべ来店300人",()=>(G.tvis||0)>=300],t2:["12〜2月に営業",()=>[12,1,2].includes(MN[(G.month||0)%12])&&(G.day||0)>1],t3:["ガチャ"],t4:["フォロワー3,000人",()=>((G.ow||{}).fol||0)>=3000],t5:["7〜8月に営業",()=>[7,8].includes(MN[(G.month||0)%12])],
t6:["バトルでベスト4",()=>(G.batBest||99)<=3],t7:["所持金500万円",()=>(G.money||0)>=5000000],t8:["増築2回",()=>(G.exN||0)>=2],t9:["野郎シーシャ会からもらう"],t10:["営業1年",()=>(G.month||0)>=12],
b1:["営業7日",()=>(G.day||0)>=7],b2:["のべ来店100人",()=>(G.tvis||0)>=100],b3:["ガチャ"],b4:["増築1回",()=>(G.exN||0)>=1],b5:["営業60日",()=>(G.day||0)>=60],
b6:["図鑑60人",()=>G.cs.filter(c=>c.met).length>=60],b7:["チェキを10回撮る",()=>(G.ckN||0)>=10],b8:["フレーバー20種",()=>(G.flu||[]).length>=20],b9:["所持金1,000万円",()=>(G.money||0)>=10000000],b10:["雪の日に営業",()=>!!G.owSnow]};
const owHas=k=>(G.owU||[]).includes(k);
function owUnlock(k,why){G.owU=G.owU||[];if(owHas(k))return null;G.owU.push(k);if(!G.owTut)G.owTut=1;const n=OWL[k[0]][+k.slice(1)-1][0];log("👕 着せ替え「"+n+"」が手に入った"+(why?"（"+why+"）":""));if(!why)try{toast("👕 新しい着せ替え「"+n+"」が手に入った！（店主の見た目から選べます）")}catch(e){}save();return n}
function owChk(){if(!G.setup)return;const nw=[];for(const k in OWC){const f=OWC[k][1];if(f&&!owHas(k)){try{if(f())nw.push(k)}catch(e){}}}if(!nw.length)return;if(nw.length===1){owUnlock(nw[0]);return}nw.forEach(k=>owUnlock(k,"条件達成"));try{toast("👕 新しい着せ替えが"+nw.length+"個手に入った！（店主の見た目から選べます）")}catch(e){}}
function owSel(k,l,o,c){const ty={hs:"h",top:"t",bot:"b"}[k],m={hs:"h2",top:"t2",bot:"b2"}[k],cur=c[m]?99+c[m]:c[k];return`<label><span>${l}</span><select data-ok="${k}">${o.map((n,i)=>`<option value="${i}" ${i===cur?"selected":""}>${esc(n)}</option>`).join("")}${OWL[ty].map((x,i)=>owHas(ty+(i+1))?`<option value="${100+i}" ${100+i===cur?"selected":""}>${esc(x[0])}</option>`:"").join("")}</select></label>`}
function owLkSel(k,l,ty,v){const L=OWL[ty];return`<label><span>${l}</span><select data-ok="${k}"><option value="0" ${v?"":"selected"}>なし（上の種類を使う）</option>${L.map((x,i)=>{const id=ty+(i+1),ok=owHas(id);return`<option value="${i+1}" ${ok?"":"disabled"} ${v===i+1?"selected":""}>${ok?"":"🔒 "}${esc(x[0])}${ok?"":"（"+OWC[id][0]+"）"}</option>`}).join("")}</select></label>`}
{const _h79=hud;hud=function(){_h79.apply(this,arguments);try{owChk()}catch(e){}}}
{const _st=start;start=function(){try{if(typeof isHallo==="function"&&isHallo())G.owHal=1;if(G.wx&&G.wx[G.wd]==="snow")G.owSnow=1}catch(e){}return _st.apply(this,arguments)}}
{const _ba=battleApply;battleApply=function(rk){G.batBest=Math.min(G.batBest||99,rk);return _ba.apply(this,arguments)}}
/* 野郎シーシャ会（No.143）からTシャツをもらう */
{const _gt=giftTry;giftTry=function(p){try{const c=p&&p.c;if(c&&c.i===142){if(owHas("t9")||G.gfD===G.day||(c.vn||0)<3||Math.random()>=.005)return;G.gfD=G.day;owUnlock("t9","野郎シーシャ会からもらった");setTimeout(()=>{NOGOBI=1;sayX(p,"これ、よかったら着てよ");NOGOBI=0},1600);try{toast("👕 野郎シーシャ会から「野郎シーシャ会T」をもらった！（店主の見た目から着られます）")}catch(e){}return}}catch(e){}return _gt.apply(this,arguments)}}
{const _tt=tutTick;tutTick=function(){try{if(G.owTut===1&&G.setup&&!TUT&&$("#ov").hidden&&R.phase==="prep"&&!document.getElementById("tut")){tutCard("新しい<b>着せ替えアイテム</b>が手に入りました！<br>☰ → 🏪 営業 → <b>✎ 店主の見た目を変える</b> から、<b>髪型・服の種類・ズボンの種類</b>の選択肢に増えています。<br>これからも、いろいろなことを達成すると着せ替えが増えていきます","わかった","#menu",()=>{G.owTut=2;save()},{tt:"👕 着せ替えアイテムが増えました！"});return}}catch(e){}return _tt.apply(this,arguments)}}
/* ガチャ：着せ替え（ガチャ限定4種） */
const OWG=["h3","h4","t3","b3"];

/* ===== 有馬からもらえる「ライムグリーンのバイク」を作り直し（オリジナルのフルカウルのスポーツバイク） ===== */
DMD.gf_94=["1a1a1a,2e2e33,5a7a8a,5fb81a,7ed321,8a8e96,a8ec5a,b8bcc2,e8304a,f4f4f4,fff6c0", "NwAAOAAARwAASAAAVwAAWAAApwAAqAAAtwAAuAAAxwAAyAAA1wAA2AAAJwEAKAEANwEHOAEHRwEHSAEHVwEHWAEHZwEAaAEApwEAqAEAtwEHuAEHxwEHyAEH1wEA2AEAJwIAKAIANwIHOAIHRwIBSAIBVwIHWAIHWgIHZgIFZwIFaAIFaQIFagIHdgIBdwIBeAIBeQIBegIHhgIFhwIFiAIFiQIFlgIBlwIBmAIBmQIBpwIHqAIHtwIBuAIBxwIByAIB1wIH2AIHJwMAKAMANwMHOAMHOgMHRwMBSAMBSgMHVwMBWAMBWgMFZgMBZwMBaAMBaQMBagMFdgMFdwMFeAMFeQMFegMFhgMBhwMBiAMBiQMBlgMFlwMFmAMFmQMFpwMAqAMAtwMHuAMHxwMHyAMH1wMA2AMAKgQANwQAOAQAOgQFRwQASAQASgQFVwQAWAQAZgQFZwQFaAQFaQQFdgQBdwQBeAQBeQQBhgQFhwQFiAQFiQQFlgQBlwQBmAQBmQQBpgQJpwQDqAQDqQQJtwQAuAQAxwQHyAQH1wQA2AQAZgUEaQUEdgUEeQUEhgUAiQUAlgUEmQUEpgUApwUEqAUEqQUAtgUJtwUEuAUEuQUJ1wUK2AUKJgYDJwYIKAYIKQYDNgYDNwYDOAYDOQYDRgYDRwYDSAYDSQYDVgYAVwYAWAYAWQYAZgYAZwYAaAYAaQYAdgYEdwYEeAYEeQYEhgYEhwYEiAYEiQYElgYElwYEmAYEmQYEpgYEpwYEqAYEqQYEtgYEtwYEuAYEuQYExgYJxwYEyAYEyQYJJgcEJwcIKAcIKQcENgcENwcEOAcEOQcERgcERwcESAcESQcEdgcGdwcGeAcGeQcGhgcGhwcGiAcGiQcGlgcGlwcGmAcGmQcGpgcEpwcEqAcEqQcEtgcEtwcEuAcEuQcExgcExwcEyAcEyQcEpQgApggApwgAqAgAqQgAqggAtggEtwgEuAgEuQgExggExwgCyAgCyQgEpQkAqgkAtwkCuAkC"];

/* ===== 乗り物で来るお客さん：有馬（No.95）はバイク、亜空間飛助はUFO。店の前に停めて、乗って帰る ===== */
let BKVX=null;
function bkVox(){if(BKVX)return BKVX;const d=DMD.gf_94;if(!d)return[];const pal=d[0].split(",").map(c=>"#"+c),bin=atob(d[1]),L=[];for(let i=0;i+2<bin.length;i+=3){const a=bin.charCodeAt(i);L.push([((a>>4)-2)*.5,((a&15)-2)*.5,bin.charCodeAt(i+1)*.5,pal[bin.charCodeAt(i+2)]])}return BKVX=L}
function ufoVox(t){const L=[],C=["#ff4d6d","#ffd84a","#5ac8fa","#7bd389","#b28bff"],S="#c9d1da",S2="#9aa4b0",GL="#8ee8ff";
const ring=(z,r0,r1,fn)=>{for(let x=-r1;x<=r1;x+=.5)for(let y=-r1;y<=r1;y+=.5){const d=Math.hypot(x+.25,y+.25);if(d<=r1&&d>=r0)L.push([x,y,z,fn(x,y,d)])}};
ring(.5,0,2,()=>"#3a4250");ring(1,0,3.5,()=>S2);ring(1.5,0,5,(x,y,d)=>{if(d>4.4){const a=Math.atan2(y,x),k=Math.floor((a+Math.PI)/(Math.PI*2)*12+t*4)%12;return k%2?C[(k>>1)%5]:"#fff6c0"}return S});
ring(2,0,4,()=>S);ring(2.5,0,2.5,()=>GL);ring(3,0,2,()=>GL);ring(3.5,0,1.25,()=>"#bff4ff");return L}
const VEH={94:{k:"bike",x:-5.5,park:11,far:80,sp:24},52:{k:"ufo",x:-15,park:4,far:0,sp:16}};
function vhRider(a,b){const t=[];try{pv(t,b.x-2,b.y-3,b.dir||1,b.c,1,0,0,0)}catch(e){}t.forEach(v=>{v[2]+=1.6+(b.z||0);a.push(v)})}
function vhOne(a,b){const V=VEH[b.c.i],now=performance.now(),dt=Math.min(.1,(now-(b.t||now))/1000)*(R.speed?Math.min(2,R.speed):0);b.t=now;b.tt=(b.tt||0)+dt;
const me=()=>R.people.find(q=>q.c&&q.c.i===b.c.i&&!q.gone),U=V.k==="ufo",sx=b.x+(U?4:2.5),sy=b.y+(U?4:1);
if(b.ph==="in"){if(U){b.z=Math.max(0,b.z-V.sp*dt);if(b.z<=0){b.ph="dis";b.w=1.6}}else{b.dir=1;b.y=Math.min(V.park,b.y+V.sp*dt);if(b.y>=V.park){b.ph="dis";b.w=1.4}}}
else if(b.ph==="dis"){b.w-=dt;if(b.w<=0){b.ph="park";if(b.m){const m=b.m;b.m=null;arrive0(m);const p=me();if(p){p.x=sx;p.y=sy;p.path=[[-3,15]].concat(p.path||[])}}}}
else if(b.ph==="park"){const p=me();if(p){b.came=1;if(p.st==="out"&&!p.bkP){p.bkP=1;p.path=(p.path||[]).concat([[sx,sy]])}}else if(b.came){b.ph="mnt";b.w=1.4}}
else if(b.ph==="mnt"){b.w-=dt;if(b.w<=0)b.ph="out"}
else if(b.ph==="out"){if(U){b.z+=V.sp*dt*(1+b.z/20);if(b.z>70)return false}else{b.dir=-1;b.y-=V.sp*dt;if(b.y<-V.far)return false}}
if(U){const still=b.ph==="park"||b.ph==="dis"||b.ph==="mnt",hov=still?Math.sin(b.tt*2.2)*.25+.25:0,zz=(b.z||0)+hov;ufoVox(b.tt).forEach(([x,y,z,col])=>a.push([b.x+x,b.y+y,z+zz,col,undefined,.5]));
if(still)for(const[lx,ly]of[[-2.5,-1.5],[2.5,-1.5],[0,2.75]])a.push([b.x+lx,b.y+ly,0,"#9aa4b0",undefined,.5]);
if(b.z>1)for(let q=0;q<5;q++)a.push([b.x-.25,b.y-.25,Math.max(0,b.z-1-q*1.6),"#bff4ff",undefined,.5]);
if(b.ph==="in"||b.ph==="out"||(b.ph==="dis"&&b.w>.8)||(b.ph==="mnt"&&b.w<.6)){const t=[];try{pv(t,b.x-2,b.y-2,1,b.c,1,0,0,0)}catch(e){}t.forEach(v=>{if(v[2]>5){v[2]+=zz-3;a.push(v)}})}}
else{const dr=b.dir||1;bkVox().forEach(([x0,y0,z,col])=>a.push([b.x+dr*(y0-3),b.y+dr*(x0-3)-.25,z,col,undefined,.5]));
if(b.ph==="in"||b.ph==="out"||(b.ph==="dis"&&b.w>.6)||(b.ph==="mnt"&&b.w<.8))vhRider(a,b)}
return true}
{const _dy=dyn;dyn=function(){const a=_dy.apply(this,arguments);try{if(R.vehs&&R.vehs.length)R.vehs=R.vehs.filter(b=>vhOne(a,b))}catch(e){console.log(e)}return a}}
const arrive0=arrive;
arrive=function(m){try{const c=m&&m.length===1&&m[0],V=c&&VEH[c.i];if(V&&R.phase==="run"&&R.away==null&&!(R.vehs||[]).some(b=>b.c===c)){R.vehs=R.vehs||[];R.vehs.push(V.k==="ufo"?{ph:"in",x:V.x,y:V.park,z:45,c,m,t:performance.now()}:{ph:"in",dir:1,x:V.x,y:-V.far,c,m,t:performance.now()});return}}catch(e){}return arrive0.apply(this,arguments)};
{const _st=start;start=function(){R.vehs=[];return _st.apply(this,arguments)}}

/* ===== ひめのセリフ（遊んでいるデータにも反映） ===== */
{const HI={"ls": ["このロット、良すぎ……！？", "シェフを呼んでくださいまし♡", "高火力気持ちよすぎですわ〜", "作ってもらうシーシャが1番うまい", "自律神経が整う音がしますわ！", "ここ、シーシャ屋ですわよ？", "水が無くなったら、終わりですの？", "あら！もうこんな時間！", "ご無理のない範囲でお願い致しますわ！", "言葉だけ横転致しますわー！"], "bye": "最高でしたわ！ごきげんよう！", "fl": 0};if(!G.hime2){const c=G.cs[147];if(c&&c.name==="ひめ"&&!c.ed)Object.assign(c,HI);G.hime2=1;try{save()}catch(e){}}}
/* ===== 来なくなったお客さんは、ゲーム内で3か月（21日）たつと戻ってくる ===== */
function quitBack(){(G.cs||[]).forEach(c=>{if(!c.quit||spx(c))return;if(c.quitD==null){c.quitD=G.day||0;return}if((G.day||0)-c.quitD>=21){c.quit=0;c.quitD=null;c.up=Math.min(c.up||0,20);c.ret=1;c.retMsg=1;log("😌 "+nm(c)+" が、またお店に来てくれそうです")}})}
{const _st=start;start=function(){try{quitBack()}catch(e){}return _st.apply(this,arguments)}}
{const _ar=arrive;arrive=function(m){const r=_ar.apply(this,arguments);try{(m||[]).forEach(c=>{if(c&&c.retMsg){c.retMsg=0;const p=R.people.find(q=>q.c===c&&!q.gone);if(p)setTimeout(()=>{try{say(p,"お久しぶりです…また来ちゃいました")}catch(e){}},1500)}})}catch(e){}return r}}

/* ===== 非売品をくれたお客さんの名前 ===== */
function gfGiver(id){if(!id)return null;for(const k in GIFT){const x=GIFT[k];if(x&&x.id===id)return G.cs[+k]||null}return null}
function gfFrom(id){const c=gfGiver(id);if(!c)return"";const n=c.nick||(lv(c)>=NL?c.name:"No."+String(dxN(c)).padStart(3,"0")+"のお客さん");return`<div class="gfr" style="font-size:11px;color:#e8954a;margin-top:2px">🎁 ${esc(n)} からもらった</div>`}
{const _mb=mvBar;mvBar=function(){_mb.apply(this,arguments);try{const m=R.mvs;if(!m||m.t==="f")return;const id=m.t==="d"?(G.decor[m.i]||{}).id:(G.wall[m.i]||{}).id,h=gfFrom(id),b=document.querySelector("#mvbar .tc");if(h&&b&&!b.querySelector(".gfr")){const t=b.querySelector("b");t?t.insertAdjacentHTML("afterend",h):b.insertAdjacentHTML("afterbegin",h)}}catch(e){}}}

/* ===== さんてぃ（No.131）からもらえる非売品：でっかい「中」の麻雀牌 ===== */
DMD.gf_141=["2f8f5b,6b4a35,d32f2f,e6dfcc,f4efe2", "JQABJgABJwABKAABKQABKgABKwABNQABNgABNwABOAABOQABOgABOwABRQABRgABRwABSAABSQABSgABSwABVQABVgABVwABWAABWQABWgABWwABZQABZgABZwABaAABaQABagABawABdQABdgABdwABeAABeQABegABewABhQABhgABhwABiAABiQABigABiwABlQABlgABlwABmAABmQABmgABmwABpQABpgABpwABqAABqQABqgABqwABtQABtgABtwABuAABuQABugABuwABxQABxgABxwAByAAByQABygABywAB1QAB1gAB1wAB2AAB2QAB2gAB2wABRgEARwEASAEDSQEDSgEDVgEAVwEAWAEDWQEDWgEDZgEAZwEAaAEDaQEDagEDdgEAdwEAeAEDeQEDegEDhgEAhwEAiAEDiQEDigEDlgEAlwEAmAEDmQEDmgEDpgEApwEAqAEDqQEDqgEDtgEAtwEAuAEDuQEDugEDNgIANwIAOAIDOQIDOgIDRgIARwIASAIESQIESgIEVgIAVwIAWAIEWQIEWgIEZgIAZwIAaAIEaQIEagIEdgIAdwIAeAIEeQIEegIEhgIAhwIAiAIEiQIEigIElgIAlwIAmAIEmQIEmgIEpgIApwIAqAIEqQIEqgIEtgIAtwIAuAIEuQIEugIExgIAxwIAyAIDyQIDygIDNgMANwMAOAMDOQMDOgMDRgMARwMASAMESQMESgMEVgMAVwMAWAMEWQMEWgMEZgMAZwMAaAMEaQMEagMEdgMAdwMAeAMEeQMEegMChgMAhwMAiAMEiQMEigMClgMAlwMAmAMEmQMEmgMEpgMApwMAqAMEqQMEqgMEtgMAtwMAuAMEuQMEugMExgMAxwMAyAMDyQMDygMDNgQANwQAOAQDOQQDOgQDRgQARwQASAQESQQESgQEVgQAVwQAWAQEWQQEWgQEZgQAZwQAaAQEaQQEagQEdgQAdwQAeAQEeQQEegQChgQAhwQAiAQEiQQEigQClgQAlwQAmAQEmQQEmgQEpgQApwQAqAQEqQQEqgQEtgQAtwQAuAQEuQQEugQExgQAxwQAyAQDyQQDygQDNgUANwUAOAUDOQUDOgUDRgUARwUASAUESQUESgUEVgUAVwUAWAUEWQUEWgUEZgUAZwUAaAUEaQUEagUEdgUAdwUAeAUEeQUEegUChgUAhwUAiAUEiQUEigUClgUAlwUAmAUEmQUEmgUEpgUApwUAqAUEqQUEqgUEtgUAtwUAuAUEuQUEugUExgUAxwUAyAUDyQUDygUDNgYANwYAOAYDOQYDOgYDRgYARwYASAYESQYESgYCVgYAVwYAWAYEWQYEWgYCZgYAZwYAaAYEaQYEagYCdgYAdwYAeAYEeQYEegYChgYAhwYAiAYEiQYEigYClgYAlwYAmAYEmQYEmgYCpgYApwYAqAYEqQYEqgYCtgYAtwYAuAYEuQYEugYCxgYAxwYAyAYDyQYDygYDNgcANwcAOAcDOQcDOgcDRgcARwcASAcESQcESgcCVgcAVwcAWAcEWQcEWgcEZgcAZwcAaAcEaQcEagcEdgcAdwcAeAcEeQcEegcChgcAhwcAiAcEiQcEigcClgcAlwcAmAcEmQcEmgcEpgcApwcAqAcEqQcEqgcEtgcAtwcAuAcEuQcEugcCxgcAxwcAyAcDyQcDygcDNggANwgAOAgDOQgDOggDRggARwgASAgESQgESggCVggAVwgAWAgEWQgEWggEZggAZwgAaAgEaQgEaggEdggAdwgAeAgEeQgEeggChggAhwgAiAgEiQgEiggClggAlwgAmAgEmQgEmggEpggApwgAqAgEqQgEqggEtggAtwgAuAgEuQgEuggCxggAxwgAyAgDyQgDyggDNgkANwkAOAkDOQkDOgkDRgkARwkASAkESQkESgkCVgkAVwkAWAkEWQkEWgkEZgkAZwkAaAkEaQkEagkEdgkAdwkAeAkEeQkEegkChgkAhwkAiAkEiQkEigkClgkAlwkAmAkEmQkEmgkEpgkApwkAqAkEqQkEqgkEtgkAtwkAuAkEuQkEugkCxgkAxwkAyAkDyQkDygkDNgoANwoAOAoDOQoDOgoDRgoARwoASAoESQoESgoCVgoAVwoAWAoEWQoEWgoCZgoAZwoAaAoEaQoEagoCdgoAdwoAeAoEeQoEegoChgoAhwoAiAoEiQoEigoClgoAlwoAmAoEmQoEmgoCpgoApwoAqAoEqQoEqgoCtgoAtwoAuAoEuQoEugoCxgoAxwoAyAoDyQoDygoDNgsANwsAOAsDOQsDOgsDRgsARwsASAsESQsESgsEVgsAVwsAWAsEWQsEWgsEZgsAZwsAaAsEaQsEagsEdgsAdwsAeAsEeQsEegsChgsAhwsAiAsEiQsEigsClgsAlwsAmAsEmQsEmgsEpgsApwsAqAsEqQsEqgsEtgsAtwsAuAsEuQsEugsExgsAxwsAyAsDyQsDygsDNgwANwwAOAwDOQwDOgwDRgwARwwASAwESQwESgwEVgwAVwwAWAwEWQwEWgwEZgwAZwwAaAwEaQwEagwEdgwAdwwAeAwEeQwEegwChgwAhwwAiAwEiQwEigwClgwAlwwAmAwEmQwEmgwEpgwApwwAqAwEqQwEqgwEtgwAtwwAuAwEuQwEugwExgwAxwwAyAwDyQwDygwDNg0ANw0AOA0DOQ0DOg0DRg0ARw0ASA0ESQ0ESg0EVg0AVw0AWA0EWQ0EWg0EZg0AZw0AaA0EaQ0Eag0Edg0Adw0AeA0EeQ0Eeg0Ehg0Ahw0AiA0EiQ0Eig0Elg0Alw0AmA0EmQ0Emg0Epg0Apw0AqA0EqQ0Eqg0Etg0Atw0AuA0EuQ0Eug0Exg0Axw0AyA0DyQ0Dyg0DRg4ARw4ASA4DSQ4DSg4DVg4AVw4AWA4DWQ4DWg4DZg4AZw4AaA4DaQ4Dag4Ddg4Adw4AeA4DeQ4Deg4Dhg4Ahw4AiA4DiQ4Dig4Dlg4Alw4AmA4DmQ4Dmg4Dpg4Apw4AqA4DqQ4Dqg4Dtg4Atw4AuA4DuQ4Dug4D"];{const x={"id":"gf_141","n":"でっかい中の牌","p":4000,"t":{"asian":2},"u":["gift",0],"g":141};if(!DEC.some(d=>d.id===x.id))DEC.push(x);GIFT[141]=x}

/* ===== さんてぃのセリフ・好きなフレーバー（遊んでいるデータにも反映） ===== */
{const SA={"ls": ["シーシャうまいねぇ", "今日も3本も吸ってしまった…", "次はどこに行こうかな", "今日は休煙日です", "ポン！", "これはほんとにうまい！", "明日はけむりーぐです", "はぁ", "いいですねぇ"], "fl": 41};if(!G.san3){const c=G.cs[141];if(c&&c.name==="さんてぃ"&&!c.ed)Object.assign(c,SA);G.san3=1;try{save()}catch(e){}}}

/* 管理ページ：エラー記録の一覧 */
document.addEventListener("click",async e=>{if(!e.target.closest||!e.target.closest("#errb"))return;const el=document.getElementById("errl");if(!el)return;el.textContent="読み込み中…";try{const j=await aapi({a:"a_errs"});el.innerHTML=j.list.length?j.list.map(r=>`<div style="padding:5px 0;border-bottom:1px solid #f3d6d6"><b>${new Date(r.at*1000).toLocaleString("ja-JP")}</b>　Ver ${esc(r.ver||"")}・${ydOf(r.day)}${r.code?"・"+esc(r.code):""}${r.shop?"（"+esc(r.shop)+"）":""}<br>${esc(r.msg||"")}<br><span style="opacity:.6">${esc(r.src||"")}</span><br><span style="opacity:.5">${esc(r.ua||"")}</span></div>`).join(""):"エラーの記録はありません"}catch(err){el.textContent=err.message}},true);

/* ===== 🏪 お店めぐり：リアルで会った人のQRを読むと、15分だけその人のお店に遊びに行ける（通信なし） ===== */
const VIS_MS=15*60*1000;
const VISL={any:["遊びに来てくれてありがとう〜！","自慢のお店です","ゆっくりしていってね","内装、こだわったんだ〜","今度はそっちのお店にも行かせてね","会えてうれしい！","最近なに吸ってる？","このお店、どう？"],pre:["シーシャ吸う？","好きな席に座ってね","今日のおすすめもあるよ"],smk:["いい煙出てるね〜","どう？うまい？","チルいね〜","炭、替えようか？","もくもく〜"],end:["そろそろ時間かな？","また会いに来てね！"]};
const VSTP=["いいお店！","また来ます","内装すてき","シーシャうまい！","チルい〜","最高でした"];
try{document.head.insertAdjacentHTML("beforeend",`<style>
body.vis #app>*:not(.cvw){display:none!important}body.vis .cvw .hint,body.vis #mvbtn,body.vis #xrow,body.vis #shopln,body.vis #bar,body.vis #tutarw{display:none!important}
#vishd{position:fixed;top:calc(env(safe-area-inset-top,0px) + 8px);left:50%;transform:translateX(-50%);z-index:60;background:rgba(30,20,45,.9);color:#fff;border-radius:14px;padding:6px 14px;font-size:13px;font-weight:700;white-space:nowrap;max-width:94vw;overflow:hidden;text-overflow:ellipsis}
#vishd b{color:#ffd54a;margin-left:6px}
#visbar{position:fixed;left:8px;right:8px;bottom:calc(env(safe-area-inset-bottom,0px) + 8px);z-index:60;max-width:540px;margin:0 auto;background:var(--card);border:1px solid var(--bd);border-radius:16px;padding:8px;display:grid;grid-template-columns:repeat(3,1fr);gap:6px;box-shadow:0 6px 20px rgba(0,0,0,.25)}
#visbar button{padding:10px 2px;font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#visbar .wide{grid-column:1/-1}
#visstp{grid-column:1/-1;display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.vsl{display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--bd);padding:8px 0}.vsl div{flex:1;min-width:0}.vsl b{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.vsl small{color:var(--mut)}.vsl.ex{opacity:.55}
</style>`)}catch(e){}
function visLook(o){o=o||{};const r={eye:o.eye||0,hs:o.hs,hair:o.hair,skin:o.skin,shirt:o.shirt,acc:o.acc,accC:o.accC,h2:o.h2|0,t2:o.t2|0,b2:o.b2|0};if(o.top!=null)r.top=o.top;if(o.bot!=null)r.bot=o.bot;if(o.pants)r.pants=o.pants;return r}
function visId(){if(!G.vid){G.vid=Math.random().toString(36).slice(2,10);save()}return G.vid}
function visSnap(lv){const o=G.ow||{},d={v:1,u:visId(),n:shopNm(),on:o.name||"店長",ow:visLook(o),fl:G.fl,wcl:G.wcl||0,fcl:G.fcl,loc:G.loc,furn:G.furn};if(lv<2)d.decor=G.decor||[];if(lv<1)d.wall=G.wall||[];return d}
async function visZ(u8,de){const st=new Blob([u8]).stream().pipeThrough(de?new DecompressionStream("deflate"):new CompressionStream("deflate"));return new Uint8Array(await new Response(st).arrayBuffer())}
async function visEnc(lv){let b=new TextEncoder().encode(JSON.stringify(visSnap(lv))),z=0;if(typeof CompressionStream==="function"){try{b=await visZ(b,0);z=1}catch(e){}}let s="SV1"+(z?"Z":"J");for(let i=0;i<b.length;i++)s+=String.fromCharCode(b[i]);return s}
async function visDec(u8){if(String.fromCharCode(u8[0],u8[1],u8[2])!=="SV1")throw new Error("シーシャ屋さん経営のお店QRではありません");let b=u8.slice(4);if(u8[3]===90){if(typeof DecompressionStream!=="function")throw new Error("この端末では読み込めません（iOS/ブラウザを最新にしてください）");b=await visZ(b,1)}
const o=JSON.parse(new TextDecoder().decode(b));if(!o||o.v!==1||!o.u||!Array.isArray(o.fl)||!Array.isArray(o.furn))throw new Error("お店のデータが読み取れませんでした");return o}
function visQR(str){let q=null;for(const ec of["M","L"]){try{q=qrcode(0,ec);q.addData(str,"Byte");q.make();break}catch(e){q=null}}if(!q)return null;const n=q.getModuleCount(),m=4,px=Math.max(3,Math.ceil(700/(n+m*2))),c=document.createElement("canvas");c.width=c.height=(n+m*2)*px;const g=c.getContext("2d");g.fillStyle="#fff";g.fillRect(0,0,c.width,c.height);g.fillStyle="#000";for(let r=0;r<n;r++)for(let k=0;k<n;k++)if(q.isDark(r,k))g.fillRect((k+m)*px,(r+m)*px,px,px);c.style.cssText="width:100%;max-width:360px;image-rendering:pixelated;display:block;margin:6px auto;border-radius:8px;background:#fff";return c}
const visOk=e=>{const n=Date.now();return n>=e.at&&n-e.at<VIS_MS},visRem=e=>{const r=Math.max(0,VIS_MS-(Date.now()-e.at)),t=Math.ceil(r/1000);return Math.floor(t/60)+":"+String(t%60).padStart(2,"0")};
function visPan(h){const o=$("#visp");if(o){if(o._stop)o._stop();o.remove()}const d=document.createElement("div");d.id="visp";d.className="xpan";d.innerHTML=`<div class="xin">${h}</div>`;document.body.appendChild(d);return d}
function visPanel(){if(!G.setup||G.over)return;const L=(G.vsh||[]).slice().sort((a,b)=>b.at-a.at),run=R.phase!=="prep";
const d=visPan(`<div class="xh">🏪 お店めぐり</div><div class="xs">リアルで会った店主さんとQRを読み合うと、<b>15分だけ</b>その人のお店に遊びに行けます</div>
<div class="xb" style="gap:6px"><button data-vp="show" style="flex:1">📱 自分のQRを見せる</button><button data-vp="scan" class="on" style="flex:1">📷 QRを読み取る</button></div>
${run?`<div class="xw">営業中は遊びに行けません（営業前・閉店後に行けます）</div>`:""}
<div style="margin-top:6px">${L.length?L.map(e=>{const ok=visOk(e);return`<div class="vsl ${ok?"":"ex"}"><div><b>🏪 ${esc(e.n)}</b><small>店主：${esc(e.on)}${e.vn?"・訪問"+e.vn+"回":""}${e.lk?"・👍"+e.lk:""}</small><br><small>${ok?"⏳ あと "+visRem(e):"また会った時にQRを読もう"}</small></div>${ok?`<button data-vgo="${esc(e.u)}" class="on" ${run?"disabled":""}>遊びに行く</button>`:`<button data-vdel="${esc(e.u)}" title="一覧から消す">✕</button>`}</div>`}).join(""):`<div class="xs" style="text-align:center;margin:14px 0">まだ行けるお店がありません。<br>友だちの店主さんに会ったら、QRを読み合おう！</div>`}</div>
<div class="xb"><button data-vp="x" style="flex:1">閉じる</button></div>`);
d.onclick=e=>{const b=e.target.closest("[data-vp],[data-vgo],[data-vdel]");if(!b)return;if(b.dataset.vp==="x"){d.remove();return}if(b.dataset.vp==="show"){visShow();return}if(b.dataset.vp==="scan"){visScan();return}
if(b.dataset.vdel){G.vsh=(G.vsh||[]).filter(x=>x.u!==b.dataset.vdel);save();visPanel();return}if(b.dataset.vgo){const x=(G.vsh||[]).find(q=>q.u===b.dataset.vgo);if(!x||!visOk(x)){toast("時間切れです。また会った時にQRを読んでね");visPanel();return}d.remove();visEnter(x)}}}
async function visShow(){const d=visPan(`<div class="xh">📱 自分のお店のQR</div><div id="visq" class="xs" style="text-align:center;margin:20px 0">作成中…</div><div class="xb"><button data-vp="b" style="flex:1">戻る</button></div>`);d.onclick=e=>{if(e.target.closest("[data-vp=b]"))visPanel()};
let c=null,lv=0;for(;lv<3&&!c;lv++){try{c=visQR(await visEnc(lv))}catch(e){c=null}}const q=d.querySelector("#visq");if(!q)return;if(!c){q.textContent="お店のデータが大きすぎてQRにできませんでした";return}
q.innerHTML=`<div>会った相手に、ゲームの「🏪 お店めぐり → 📷 QRを読み取る」で読んでもらってね。読んでから<b>15分</b>、あなたのお店に遊びに来られます。QRは<b>1分ごと</b>に変わるので、その場で読んでもらってね</div>${lv>1?`<div class="xw" style="margin-top:6px">お店の飾りが多いので、${lv>2?"置物と壁アイテム":"壁アイテム"}は省いています</div>`:""}`;q.prepend(c);q.style.margin="6px 0"}
function visScan(){const d=visPan(`<div class="xh">📷 QRを読み取る</div><div class="xs">相手の「自分のQRを見せる」画面を枠の中に映してね</div><div style="position:relative;background:#000;border-radius:12px;overflow:hidden;aspect-ratio:1;width:100%;max-width:340px;margin:6px auto"><video id="visv" playsinline muted autoplay style="width:100%;height:100%;object-fit:cover"></video><div style="position:absolute;inset:8%;border:3px solid rgba(255,255,255,.85);border-radius:14px"></div></div><div id="vism" class="xs" style="text-align:center;min-height:20px">カメラを起動中…</div><div class="xb"><button data-vp="b" style="flex:1">戻る</button></div>`);
let st=null,done=0,tm=0;const v=d.querySelector("#visv"),m=d.querySelector("#vism"),cv2=document.createElement("canvas"),g2=cv2.getContext("2d",{willReadFrequently:true});
const stop=()=>{done=1;clearTimeout(tm);try{st&&st.getTracks().forEach(t=>t.stop())}catch(e){}};d._stop=stop;d.onclick=e=>{if(e.target.closest("[data-vp=b]")){stop();visPanel()}};
const loop=()=>{if(done||!d.isConnected){stop();return}try{if(v.readyState>=2&&v.videoWidth){const sc=Math.min(1,1280/Math.max(v.videoWidth,v.videoHeight)),w=Math.round(v.videoWidth*sc),h=Math.round(v.videoHeight*sc);cv2.width=w;cv2.height=h;g2.drawImage(v,0,0,w,h);const r=jsQR(g2.getImageData(0,0,w,h).data,w,h,{inversionAttempts:"dontInvert"});if(r&&r.binaryData&&r.binaryData.length){stop();visGot(Uint8Array.from(r.binaryData));return}}}catch(e){}tm=setTimeout(loop,180)};
if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){m.textContent="この端末ではカメラが使えません";return}
navigator.mediaDevices.getUserMedia({video:{facingMode:"environment",width:{ideal:1920},height:{ideal:1080}},audio:false}).then(s=>{if(done||!d.isConnected){s.getTracks().forEach(t=>t.stop());return}st=s;v.srcObject=s;const p=v.play();if(p&&p.catch)p.catch(()=>{});m.textContent="QRを探しています…";loop()}).catch(()=>{m.innerHTML="カメラを使えませんでした。<br>設定でカメラの使用を許可してください"})}
async function visGot(u8){let o;try{o=await visDec(u8)}catch(e){const d=visPan(`<div class="xh">📷 読み取れませんでした</div><div class="xw">${esc(e.message)}</div><div class="xb"><button data-vp="b" style="flex:1">戻る</button><button data-vp="r" class="on" style="flex:1">もう一度</button></div>`);d.onclick=ev=>{const b=ev.target.closest("[data-vp]");if(!b)return;b.dataset.vp==="r"?visScan():visPanel()};return}
if(o.u===visId()){toast("これは自分のお店のQRです");visScan();return}
G.vsh=G.vsh||[];let e=G.vsh.find(x=>x.u===o.u);if(!e){e={u:o.u,vn:0,lk:0};G.vsh.push(e)}Object.assign(e,{n:String(o.n||"お店").slice(0,30),on:String(o.on||"店長").slice(0,20),at:Date.now(),d:o});G.vsh.sort((a,b)=>b.at-a.at);G.vsh=G.vsh.slice(0,20);G.vmet=(G.vmet||0)+1;save();
const run=R.phase!=="prep",d=visPan(`<div class="xh">🎉 読み取りました！</div><div style="text-align:center;margin:10px 0;font-size:16px"><b>🏪 ${esc(e.n)}</b><br><small style="color:var(--mut)">店主：${esc(e.on)}</small></div><div class="xs" style="text-align:center">今から<b>15分</b>、このお店に遊びに行けます</div>${run?`<div class="xw">営業中は行けません。営業前・閉店後に「お店めぐり」から行けます</div>`:""}<div class="xb" style="gap:6px"><button data-vp="b" style="flex:1">あとで</button><button data-vp="go" class="on" style="flex:2" ${run?"disabled":""}>遊びに行く</button></div>`);
d.onclick=ev=>{const b=ev.target.closest("[data-vp]");if(!b)return;if(b.dataset.vp==="b"){visPanel();return}if(visOk(e)){d.remove();visEnter(e)}}}
function visEnter(e){if(R.vis||R.phase!=="prep"||!G.setup||G.over||R.mvOn)return;const x=e.d;if(!x)return;const G0=G;
const v={G0,e,exp:e.at+VIS_MS,sv:{x:OW.x,y:OW.y,dir:OW.dir,sitting:OW.sitting,seat:OW.seat,hd:OW.hd,idleSmk:OW.idleSmk,eat:OW.eat,ph:OW.ph,mode:OW.mode,bt:OW.bt,bub:OW.bub},look:Object.assign({},OW.c),cat:R.cat,pp:R.people,tool:R.tool,cam:JSON.parse(JSON.stringify(R.cam)),smk:0,lt:""};
const me=Object.assign({i:99,hp:10,up:0,met:1,vt:2,nick:(G0.ow&&G0.ow.name)||"店長"},visLook(G0.ow));if(me.prT==null)me.prT=(G0.ow&&G0.ow.shop)||"SHISHA";v.me=me;
const g=JSON.parse(JSON.stringify(G0));Object.assign(g,{fl:x.fl,furn:x.furn,decor:x.decor||[],wall:x.wall||[],inv:[],ckD:-1,wcl:x.wcl||0});if(x.fcl!=null)g.fcl=x.fcl;if(x.loc!=null)g.loc=x.loc;g.ow=Object.assign({},g.ow||{});["kg","accE","accH","accM","accCE","accCH","accCM","accCMv","accV","hc2"].forEach(k=>{delete g.ow[k]});{const xo=x.ow||{};if(xo.accE==null){g.ow.accE=+xo.acc||0;g.ow.accCE=xo.accC||"#333333";g.ow.accH=0;g.ow.accM=0}}g.ow=Object.assign(g.ow,x.ow||{},{name:x.on,shop:x.n});
try{R.vis=v;G=g;R.cat=null;R.people=[];R.tool=null;e.vn=(e.vn||0)+1;G0.vtot=(G0.vtot||0)+1;
syncFl();furnRebuild();build();Object.assign(OW,{x:3,y:8,dir:1,sitting:0,seat:null,hd:0,idleSmk:0,eat:null,ph:0,mode:null,bt:0,bub:""});applyOwLook();OW._pc=null;
const p={c:me,x:-4,y:15,st:"vw",dir:1,seat:NOSEAT,seed:Math.random()*5,path:[[4,15]],bt:0,orders:0,tp:0,rem:0,nd:0,dl:0,dt:0,nohk:1,rest:1,vis:1};R.people.push(p);v.p=p;
document.body.classList.add("vis");visBar();setTimeout(()=>{if(R.vis===v)say(OW,"遊びに来てくれてありがとう〜！")},900)}catch(err){try{G=G0;R.vis=null}catch(_){}visBack(v);throw err}}
function visBack(v){G=v.G0;R.vis=null;R.people=v.pp||[];R.cat=v.cat;R.tool=v.tool;if(v.cam)R.cam=v.cam;syncFl();furnRebuild();build();Object.assign(OW,v.sv,{sitting:0,seat:null,_pc:null});Object.assign(OW.c,v.look);applyOwLook();OW._pc=null;
document.body.classList.remove("vis");["#visbar","#vishd","#ckp","#visp"].forEach(q=>{const el=$(q);if(el)el.remove()});save();try{hud();ratm();xrow()}catch(e){}}
function visLeave(msg){const v=R.vis;if(!v)return;visBack(v);if(msg)toast(msg)}
function visBar(){["#visbar","#vishd"].forEach(q=>{const el=$(q);if(el)el.remove()});const v=R.vis;if(!v)return;
const h=document.createElement("div");h.id="vishd";h.innerHTML=`🏪 ${esc(v.e.n)} に訪問中<b id="visrem"></b>`;document.body.appendChild(h);
const b=document.createElement("div");b.id="visbar";const p=v.p,sit=p.st==="sit"||p.st==="vin";
b.innerHTML=`<button data-va="talk">💬 店主と話す</button><button data-va="sit">🪑 ${sit?"席を移る":"席に座る"}</button><button data-va="smk" ${v.smk?"disabled":""}>💨 ${v.smk?"吸っています":"シーシャを吸う"}</button><button data-va="like" ${v.e.lkAt===v.e.at?"disabled":""}>👍 いいね</button><button data-va="stp">🗯 スタンプ</button><button data-va="ck">📸 チェキ</button>${v.stp?`<div id="visstp">${VSTP.map((t,i)=>`<button data-vs="${i}">${t}</button>`).join("")}</div>`:""}<button data-va="out" class="wide">🚪 自分のお店に帰る</button>`;
document.body.appendChild(b);b.onclick=e=>{const t=e.target.closest("[data-va],[data-vs]");if(!t||t.disabled||!R.vis)return;e.stopPropagation();if(t.dataset.vs!=null){visStamp(VSTP[+t.dataset.vs]);return}const a=t.dataset.va;
if(a==="talk")visTalk();else if(a==="sit")visSit();else if(a==="smk")visSmoke();else if(a==="like")visLike();else if(a==="stp"){v.stp=!v.stp;visBar()}else if(a==="ck")visCheki();else if(a==="out")visLeave("🏠 自分のお店に戻りました")}}
function visTalk(){const v=R.vis;if(!v)return;const L=VISL.any.concat(v.smk?VISL.smk:VISL.pre,v.exp-Date.now()<3*60*1000?VISL.end:[]);let t=rnd(L);for(let i=0;i<6&&t===v.lt;i++)t=rnd(L);v.lt=t;say(OW,t)}
function visSit(){const v=R.vis,p=v.p,fr=SEATS.filter(s=>!s.p&&s!==p.seat);if(!fr.length){toast("ほかに空いている席がありません");return}const s=rnd(fr);if(p.seat&&p.seat.p===p)p.seat.p=null;
const sx=p.st==="sit"?p.seat.px+2:p.x,sy=p.st==="sit"?p.seat.Y0+3:p.y;p.x=sx;p.y=sy;s.p=p;p.seat=s;p.st="vin";p.nohk=1;p.rest=1;p._pc=null;const px=s.px+2;p.path=[[sx,15],[px,15],[px,s.Y0+3]];visBar()}
function visSmoke(){const v=R.vis,p=v.p;if(p.st!=="sit"){toast(p.st==="vin"?"席に着くまで待ってね":"先に席に座ってね");return}v.smk=1;p.nohk=0;p.rest=0;p._pc=null;visBar();setTimeout(()=>{if(R.vis===v)say(OW,rnd(["はい、どうぞ〜！","自信作だよ〜"]))},500)}
function visLike(){const v=R.vis,e=v.e;if(e.lkAt===e.at)return;e.lkAt=e.at;e.lk=(e.lk||0)+1;say(v.p,"👍");setTimeout(()=>{if(R.vis===v)say(OW,"ありがとう！うれしい〜")},700);visBar()}
function visStamp(t){const v=R.vis;v.stp=0;say(v.p,t);v.e.sn=(v.e.sn||0)+1;setTimeout(()=>{if(R.vis===v)say(OW,rnd(["ありがとう〜！","うれしい！","でしょ〜！"]))},900);visBar()}
function visCheki(){const v=R.vis;G.ckD=-1;const o=$("#ckp");if(o)o.remove();const d=document.createElement("div");d.id="ckp";d.className="xpan";d.innerHTML=`<div class="xin"></div>`;document.body.appendChild(d);try{ckShoot(d,v.me)}catch(e){d.remove();throw e}}
/* 訪問中のチェキで「戻る」→ そのまま閉じる */
{const _cp=chekiPanel;chekiPanel=function(){if(R.vis){const o=$("#ckp");if(o)o.remove();return}return _cp.apply(this,arguments)}}
/* 訪問中は店主をタップで会話、ほかの操作はしない */
{const _ot=onTap;onTap=function(clx,cly){if(!R.vis)return _ot.apply(this,arguments);const r=cv.getBoundingClientRect(),X=(clx-r.left)*W/r.width,Y=(cly-r.top)*CH/r.height,k=R.cv;if(!k)return;const q=P(OW.x,OW.y,7);if(Math.hypot(q[0]-X,q[1]-Y)<Math.max(30,k.s*6.5))visTalk()}}
/* 訪問中の毎フレーム：残り時間・席に着いたら座る・時間切れで帰る（普段の画面更新はしない） */
{const _hv=hud;hud=function(){if(!R.vis)return _hv.apply(this,arguments);const v=R.vis,p=v.p,now=Date.now();if(p.st==="vin"&&!p.path.length){p.st="sit";p._pc=null;visBar()}
if(now<v.e.at||now>=v.exp){visLeave("⏰ 15分たったので自分のお店に戻りました。また会った時にQRを読んでね");return}const el=document.getElementById("visrem");if(el){const t="あと"+visRem(v.e);if(el.textContent!==t)el.textContent=t}}}
/* 訪問中はクラウド保存しない */
{const _cs=cloudSave;cloudSave=async function(){if(R.vis)return false;return _cs.apply(this,arguments)}}
{const _cp2=cpack;cpack=async function(){if(R.vis)throw new Error("お店めぐり中は保存できません");return _cp2.apply(this,arguments)}}
/* ボタン列に「お店めぐり」 */
{const _xr=xrow;xrow=function(){_xr();const r=$("#xrow");if(!r)return;let b=$("#visb");if(!b){b=document.createElement("button");b.id="visb";b.textContent="🏪 お店めぐり";r.appendChild(b);b.onclick=e=>{e.stopPropagation();visPanel()}}b.disabled=R.phase==="run";b.style.opacity=R.phase==="run"?".45":""}}
try{xrow()}catch(e){}

