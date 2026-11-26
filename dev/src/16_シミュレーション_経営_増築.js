/* ===== シミュレーション ===== */
/* 店主：ノーゲスが続くと焦る（2・4・6時間）／閉店2時間前までノーゲスで落ち込む／まれに客の台を「調整」 */
const IDL=[["誰も来ない…ちょっと一服しよう","暇だな…自分用に一本作っちゃった","今日は静かだなあ…","お客さん、まだかな…（スマホを見る）"],["4時間ノーゲス…さすがに焦る","SNS、もっと更新しとけばよかった…","ドアの前、誰か通らないかな…","このままだと今月やばいかも…"],["6時間…誰も来ない…","家賃…光熱費…うっ","もしかして今日、休みだと思われてる？","煙だけがお友達…"],["今日はノーゲスか…","…明日はがんばろう","こんな日もあるよね…（ため息）","売上ゼロ…泣きそう"]],ADJ=["調整しますね〜","ちょっと失礼、調整します","火加減、見ておきますね","（一口吸って）…うん、いい感じです"];
function adjOff(p){if(!p)return;p.adj=0;if(p.sh){p.sh.a.adj=0;p.sh.b.adj=0}}
function owReset(){R.people&&R.people.forEach(p=>p.adj=0);{const h=owHomeXY();OW.x=h[0];OW.y=h[1]}OW.dir=1;OW.hd=0;OW.idleSmk=0;OW.mode="";OW.path=[];OW._pc=null;OW.sitting=0;OW.seat=null;OW.ph=0;OW.phT=10}
function owStand(){OW.sitting=0;OW.seat=null;OW.idleSmk=0;OW.hd=0;{const h=owHomeXY();OW.x=h[0];OW.y=h[1]}OW.dir=1;if(OW.mode==="toSeat"){OW.mode="";OW.path=[]}OW._pc=null}
function owTick(dm,sdt){const inS=R.people.some(p=>p.st!=="out"&&p.st!=="peek"&&p.st!=="peekw");
const arr=R.people.some(p=>p.st!=="out"&&p.st!=="peek"&&p.st!=="peekw");if(arr&&(OW.sitting||OW.mode==="toSeat"||OW.idleSmk))owStand();
if(inS){R.idle0=R.t;R.idleSt=0}
else if(!OW.mode){const nt=R.t-(R.idle0==null?G.open*60:R.idle0),st=nt>=360?3:nt>=240?2:nt>=120?1:0;
if(!OW.sitting&&nt>=15&&!R.closed){const fr=SEATS.filter(x=>!x.p&&!x.x);if(fr.length){const sx=fr.reduce((b,x)=>Math.hypot(x.px+2-OW.x,x.Y0+3-OW.y)<Math.hypot(b.px+2-OW.x,b.Y0+3-OW.y)?x:b);OW.mode="toSeat";OW.tseat=sx;OW.path=[[OW.x,15],[sx.px+2,15],[sx.px+2,sx.Y0+3]];OW.ph=0}}
if(st>(R.idleSt||0)){R.idleSt=st;say(OW,rnd(IDL[st-1]));if(!OW.idleSmk){G.money-=500;R.st.cost=(R.st.cost||0)+500;log("🔥 自分用に一本作った（−¥500）")}OW.idleSmk=1;OW.hd=1;if(!OW.sitting)OW.dir=0}
else if(st>0&&Math.random()<dm*.006)say(OW,rnd(IDL[st-1]))}
if(!R.depr&&R.st.visits===0&&R.t>=G.close*60-120){R.depr=1;say(OW,rnd(IDL[3]))}
if(OW.phT==null)OW.phT=10;OW.phT-=dm;if(OW.phT<=0){OW.ph=OW.ph?0:(Math.random()<.5?1:0);OW.phT=OW.ph?8+Math.random()*20:12+Math.random()*30}
{const nIn=R.people.filter(p=>p.st!=="out"&&p.st!=="peek"&&p.st!=="peekw").length;
if(OW.eat){OW.ph=0;OW.eatT-=dm;if(OW.eatT<=0||R.closed){OW.eat=null;OW._pc=null}}
else if(!R.meal&&!R.closed&&R.t>=18*60&&nIn>2&&!(OW.bt>0)&&Math.random()<dm*.012)say(OW,rnd(["お腹すいたな、、","ご飯食べる暇ないな、、","餓死しそう、、","誰か差し入れしてほしいな"]));
else if(!R.closed&&!OW.mode&&nIn<=2){if(!R.meal&&R.t>=18*60){R.meal=1;OW.eat=rnd(["burger","onigiri","sand"]);OW.eatT=25;OW.ph=0;OW._pc=null;say(OW,rnd(["お腹すいた…今のうちに"+FOODN[OW.eat]+"食べちゃおう","晩ごはんは"+FOODN[OW.eat]+"！","いただきます（"+FOODN[OW.eat]+"）","腹が減ってはシーシャ屋はできぬ"]))}
else if((R.snack||0)<1&&Math.random()<dm*.0025){R.snack=(R.snack||0)+1;OW.eat=rnd(["donut","ice"]);OW.eatT=12;OW.ph=0;OW._pc=null;say(OW,rnd(["ちょっと甘いもの…（"+FOODN[OW.eat]+"）",FOODN[OW.eat]+"休憩〜"]))}}}
if(!OW.mode&&!OW.eat&&!OW.idleSmk&&!OW.sitting&&!R.closed&&Math.random()<dm*.012){OW.ph=0;const cs=R.people.filter(p=>p.st==="sit"&&p.rem>=40);if(cs.length){const p=rnd(cs),hc=hkCenter(p),f=p.seat.f;OW.mode="go";OW.tgt=p;p.adj=1;if(p.sh){p.sh.a.adj=1;p.sh.b.adj=1}OW.adjF=f;OW.adjO=p.seat.o||0;OW.path=[OW.adjO?[hc.x+(OW.adjO===1?2.4:-2.4),hc.y]:[hc.x,hc.y+(f>0?2.4:-2.4)]]}}
if((OW.mode==="go"||OW.mode==="smoke")&&OW.tgt&&OW.tgt.st!=="sit"){const left=OW.tgt.st==="out";adjOff(OW.tgt);OW.mode="back";OW.hd=0;OW.path=[owHomeXY()];if(left)say(OW,rnd(["あ、お帰りですか？ありがとうございました！","またお待ちしてます〜！"]));OW.tgt=null}
if(OW.mode==="smoke"){OW.tm-=sdt;if(OW.tm<=0){OW.hd=0;OW.mode="back";OW.path=[owHomeXY()];adjOff(OW.tgt);OW.tgt=null}}
if(OW.path&&OW.path.length){const t=OW.path[0],dx=t[0]-OW.x,dy=t[1]-OW.y,d=Math.hypot(dx,dy),st=16*sdt;if(d>.01)OW.dir=Math.abs(dx)>Math.abs(dy)?(dx>0?1:3):(dy>0?0:2);
if(d<=st){OW.x=t[0];OW.y=t[1];OW.path.shift();if(!OW.path.length){if(OW.mode==="toSeat"){OW.mode="";OW.sitting=1;OW.seat=OW.tseat;OW.dir=OW.seat.f>0?0:2;OW.hd=OW.idleSmk?1:0;OW._pc=null}else if(OW.mode==="go"){OW.mode="smoke";OW.tm=3.2;OW.hd=1;OW.dir=OW.adjO?(OW.adjO===1?3:1):(OW.adjF>0?2:0);say(OW,rnd(ADJ))}else if(OW.mode==="back"){OW.mode="";OW.dir=1}}}else{OW.x+=dx/d*st;OW.y+=dy/d*st}}}
/* 店主の知名度・スター性が低いうちは客足をしぼる（初期は1日1〜2人） */
const stF=()=>{const o=G.ow;return o?clamp(.55+(o.fame-10)*.02+(o.star-10)*.01,.55,2.2):.55};
/* 来店スケジュール：閉店1時間前で入店ストップ。一人客は必ず別の分、グループ客は同時入店OK */
/* 職業ごとの来店曜日・時間帯（昼＝17時まで、夜＝17時から）。null は来ない */
function jobWin(k){const j=k.job,we=G.wd>=5,mo=MN[G.month%12];
if(j==="YouTuber"&&(mo===8||mo===12))return null;if(["先生","公務員","銀行員"].includes(j)&&!we)return null;
if(j==="会社員")return we?"any":"night";if(["ニート","YouTuber","フリーランス","エンジニア","ミュージシャン"].includes(j))return"any";
if(j==="バーテンダー")return"day";if(j==="美容師"){if(we)return"night";if(G.wd===0)return Math.random()<.8?"day":"night"}
return we?"any":"skew"}
function sched(fc){R.sched=[];const o=G.open*60+(R.late||0),e=G.close*60-60,used=new Set(),taken=new Set();
const N=17*60,lD=Math.max(0,Math.min(e,N)-o),lN=Math.max(0,e-Math.max(o,N)),wD=[1,1,1,1,1,1.3,1.3][G.wd],wN=[1,1,1,1,1.4,1.6,1][G.wd],
sh=w=>{const t=lD+lN||1;let d=lD/t,n=lN/t;if(w==="day")n=0;else if(w==="night")d=0;else if(w==="skew"){d=d*.5;n=.5+n*.5}if(!lD)d=0;if(!lN)n=0;return[d,n]},
tmul=w=>{const[d,n]=sh(w);return d+n>0?(d*wD+n*wN)/(d+n):0},
at=w=>{const[d,n]=sh(w||"any"),night=d+n>0?Math.random()<n*wN/(d*wD+n*wN):lN>0,a=night?Math.max(o,N):o,b2=night?e:Math.min(e,N);let t,k=0;do{t=a+Math.floor(Math.random()*Math.max(1,b2-a));k++}while(used.has(t)&&k<80);if(R.minAt&&t<R.minAt&&e>R.minAt)t=R.minAt+Math.floor(Math.random()*(e-R.minAt));used.add(t);return t},
ok=w=>w!==null&&tmul(w)>0;
const AC=G.cs.filter(k=>k.act),sc=(14+Math.max(0,AC.length-14)*.3)/Math.max(1,AC.length)*stF();
const pr=k=>k.ex?(G.at2&&k.act?(k.met?.4:.25)*(k.exn===30?(G.spB?.25:.5):1):0):!k.act||(G.s2&&G.s2.mgr===k.i)||(R.hallo&&(k.rar|0)>=4)?0:spx(k)?k.freq/7*(k.job==="シーシャ屋"&&k.met?k.repeat:1):k.quit||(k.banM!=null&&G.month<=k.banM)?0:(k.met?(k.ret?k.freq/7:.12):k.first*.5*(locM().f||1))*mult(k)*DEMAND*locM().d*WDM[G.wd]*(fc?1:wxm())*(k.bst?1.3:1)*sc*([6,9,2].includes(MN[G.month%12])?.75:1)*(typeof evM==="function"?evM():1);
GROUPS.forEach(m=>{const ks=m.map(i=>G.cs[i]);ks.forEach(k=>taken.add(k.i));const w=jobWin(ks[0]);if(ok(w)&&ks.every(k=>k.act&&!k.quit&&ok(jobWin(k)))&&Math.random()<ks.reduce((s,k)=>s+pr(k),0)/ks.length*tmul(w)*(ks.length>=3&&G.furn.some(F=>F.k==="b")?1.2:1))R.sched.push({at:at(w),m:ks})});
(G.shF||[]).filter(x=>x.d<=G.day).forEach(x=>{const k=G.cs[x.i];if(!k||taken.has(k.i))return;taken.add(k.i);k.act=1;R.sched.push({at:at("any"),m:[k]})});G.shF=(G.shF||[]).filter(x=>x.d>G.day);
const so=G.cs.filter(k=>k.act&&k.g<0).sort(()=>Math.random()-.5);
so.forEach(k=>{const w=jobWin(k);if(taken.has(k.i)||!ok(w)||Math.random()>=pr(k)*(spx(k)?1:tmul(w)))return;taken.add(k.i);const m=[k],fs=so.filter(q=>!taken.has(q.i)&&q.act&&!q.quit&&!spx(q)&&bd(k.i,q.i)>=60&&ok(jobWin(q)));if(!spx(k)&&fs.length&&Math.random()<.4){const q=rnd(fs);taken.add(q.i);m.push(q)}R.sched.push({at:at(w),m})});
G.cs.forEach(k=>{const w=jobWin(k);if(!spx(k)&&!(R.hallo&&(k.rar|0)>=4)&&k.bv>0&&k.act&&!k.quit&&ok(w)&&!taken.has(k.i)&&!(k.banM!=null&&G.month<=k.banM)&&Math.random()<.5){taken.add(k.i);k.bv--;R.sched.push({at:at(w),m:[k]})}});
R.sched.sort((a,b)=>a.at-b.at);if(!fc)G.cs.forEach(c=>{c.bst=0})}
/* 席決め：親密度が低い相手からは離れ、親しい相手の近くを好む */
const kb={s:12,l:4,t:2,b:0,c:22,bb:10};
function avoid(c,s){let v=0;SEATS.forEach(o=>{const q=o.p;if(!q||o===s)return;const b=bd(c.i,q.c.i),d=Math.hypot(o.px-s.px,o.Y0-s.Y0);if(b<30)v+=Math.min(d,40)*(30-b)/30;else if(b>=50)v-=Math.min(d,40)*.3});return v+Math.random()*3}
function sIdle(s){const u=(R.sUse||{})[s.fid];return Math.min(18,(R.t-(u!=null?u:G.open*60-90))/8)}
function pickSeats(m){const fr=SEATS.filter(s=>!s.p&&!s.x),n=m.length;
if(n===1){let best=null,bv=-1e9;fr.forEach(s=>{const v=avoid(m[0],s)+kb[s.kind]+sIdle(s);if(v>bv){bv=v;best=s}});return best?[best]:null}
if(n===2){const cand=[];G.furn.forEach((F,fid)=>{const t=F.k;if(t==="l"){const g=SEATS.filter(s=>s.fid===fid);if(g.every(s=>!s.p&&!s.x))cand.push(g)}});
if(!cand.length)fr.filter(s=>s.kind!=="l"&&s.kind!=="bb").forEach(s=>s.nb.forEach(o=>{if(!o.p&&!o.x&&o.kind===s.kind&&s.id<o.id)cand.push([s,o])}));
if(!cand.length)G.furn.forEach((F,fid)=>{if(F.k!=="b")return;const g=SEATS.filter(s=>s.fid===fid&&!s.p&&!s.x);if(g.length>=2)cand.push(g.slice(0,2))});if(!cand.length)return null;let best=null,bv=-1e9;cand.forEach(g=>{const v=avoid(m[0],g[0])+avoid(m[1],g[1])+sIdle(g[0])*2;if(v>bv){bv=v;best=g}});return best}
if(n===3){const g=G.furn.map((f,fid)=>(f.k==="t"||f.k==="c")?SEATS.filter(s=>s.fid===fid&&s.kind===f.k):null).filter(g=>g&&g.length===3&&g.every(s=>!s.p&&!s.x));if(g.length)return g[0];const bxg=G.furn.map((f,fid)=>f.k==="b"?SEATS.filter(s=>s.fid===fid&&!s.p&&!s.x):null).filter(g=>g&&g.length>=3);return bxg.length?bxg[0].slice(0,3):null}
for(let fid=0;fid<G.furn.length;fid++){if(G.furn[fid].k!=="b")continue;const g=fr.filter(s=>s.fid===fid);if(g.length>=n)return g.slice(0,n)}const bx=fr.filter(s=>s.kind==="b");if(bx.length>=n)return bx.slice(0,n);
for(const s of fr){const ch=[s];let cur=s;while(ch.length<n){const nx=cur.nb.find(o=>!o.p&&!o.x&&!ch.includes(o)&&o.f===s.f&&(o.o||0)===(s.o||0));if(!nx)break;ch.push(nx);cur=nx}if(ch.length>=n)return ch}return null}
const NSL=[["あ、満席か…また来よう","うわ、いっぱいだ。出直します","今日は混んでますね…また今度","席、空いてないかー","残念、また来ます"],["2人なんですけど…あ、いっぱいですね","あー、空いてないかー。また来よっか","満席かー、別のとこ行こ","今日は無理そうだね、また今度","2人で座れる席、ないですよね…出直します"],["あー、3人だとちょっと空いてないかー","すみません、3人なんですけど…あ、いっぱいですね","今日混んでるなー、また来ます！","3人で座れる席、なさそうですね…出直します","満席かー、残念。また今度にしよっか"]],NOSEAT={p:null,px:0,Y0:0,f:1,id:-9,nb:[]};
function arrive(m){const ss=R.away!=null?null:pickSeats(m);if(!ss){R.st.lost+=m.length;log(R.away!=null?"🚪 店主が不在で、"+m.length+"名が帰ってしまった…":"席が合わず "+m.length+"名が入口で帰った…");const c=m[0],p={c,x:-4,y:15,st:"peek",dir:1,seat:NOSEAT,seed:Math.random()*5,path:[[3,15]],bt:0,orders:0,tp:0,rem:0,nd:0,dl:0,dt:0,wt:0,nl:R.away!=null?["店主がいないな、、帰るか"]:NSL[Math.min(2,m.length-1)]};R.people.push(p);return}
const made=[];
m.forEach((c,i)=>{const s=ss[i],first=!c.met;c.vt=(c.vt||(first?0:1))+1;if(first){c.met=1;c.fp+=2;log("🆕 新しいお客様が来店！図鑑に登録")}if(spx(c)){c.vn=(c.vn||0)+1;c.fp=(c.job==="シーシャ屋"&&(c.vn||0)>=3?100:0);if(c.vn===3)log("📖 "+nm(c)+" の情報がすべて解禁！（図鑑）")}
const px=s.px+2,p={c,x:-4-i*5,y:15,st:"in",dir:1,seat:s,seed:Math.random()*5,path:[[4,15],[px,15],[px,s.Y0+3]],bt:0,mt:6+Math.random()*8,orders:0,tp:0,rem:0,nd:0,dl:0,dt:0};
s.p=p;R.people.push(p);made.push(p);R.st.visits++;if(evx().noise>G.day){R.st.miss+=3;c.up=Math.min(100,c.up+6);if(i===0)log("🔊 隣の騒音で "+nm(c)+" は不満そう…")}if(G.ow){G.ow.fol+=1+Math.floor(Math.random()*(1+G.ow.fame/30));try{celebVisit(c)}catch(e){}if(first)G.ow.fame=Math.min(100,G.ow.fame+FMK*.25*(1-G.ow.fame/100))}if(first)c.ret=Math.random()<Math.min(.9,c.first*mult(c)+.2)?1:0});
if(m.length>1){for(let i=0;i<m.length;i++)for(let j=i+1;j<m.length;j++)addB(m[i].i,m[j].i,5);log("👥 "+m.length+"名で来店")}
if(made.length>1){const gp={m:made};made.forEach(p=>p.gp=gp)}
if(made.length===2){const[s0,s1]=ss;if(s0.f===s1.f&&s0.nb.includes(s1)&&Math.random()<.3){const[A,B]=made.slice().sort((u,v)=>u.seat.px-v.seat.px),sh={a:A,b:B,cur:0,t:6+Math.random()*10,paid:0,rem:0};A.sh=B.sh=sh;log("🤝 2人でシェア（シーシャ¥3,500＋シェアチャージ¥1,500）")}}}
function refMean(){if(R.refM==null){const L=G.cs.map(c=>c.refill||0);R.refM=Math.max(.05,L.reduce((a,b)=>a+b,0)/Math.max(1,L.length))}return R.refM}
function refP(c,n,fr){const r=(c.refill||0)/refMean();return n===1?Math.min(.5,.2*r+(fr?.06:0)):Math.min(.4,.15*r+(fr?.05:0))}
const stayMin=(c,k)=>{const t=c.stay*k*(.75+Math.random()*.5);return Math.round(Math.random()<.9?Math.max(120,t*1.4):Math.max(60,t))};
const REFL=["おかわりお願いします！次は{m}で","おかわりは{m}にします","もう1本！{m}でお願いします","おかわり、{m}で！","次は{m}いってみます"];
const SBON={br:0,cr:1,rr:1,dn:1,gv:2,bg:3};function seatBon(p){const s=p.seat;if(!s||s.fid==null||!G.furn[s.fid]||G.furn[s.fid].k==="bb")return 0;return SBON[G.furn[s.fid].sr]||0}
function order(p,refill){if(refill)p.tp=0;if(R.coalOut){p.rem=1;p.done=1;say(p,"炭切れ…？また来ます");return}if(!refill&&!p._coal){p._coal=1;R.st.coal=(R.st.coal||0)+COAL;const sb=seatBon(p);if(sb&&p.c&&!spx(p.c))p.c.hp=Math.min(100,p.c.hp+sb*3)}if(p.sh&&!refill){const sh=p.sh;if(sh.paid){p.rem=sh.rem;p.orders++;p.nd=6+Math.random()*30;(!p.drk&&!p.dlSet)&&(p.dl=drN(),p.dlSet=1);return}sh.paid=1}
const c=p.c,pr0=refill?2000:(p.sh?5000:3500),pr=R.kashi?0:R.coin?Math.floor(pr0/1000)*1000:pr0;G.money+=pr;R.st.sales+=pr;p.rem=R.kashi?1e9:Math.round(stayMin(c,refill?.7:1)*(p.seat&&p.seat.kind==="bb"?1.2:1));R.shN=(R.shN||0)+1;if(R.coalLim&&R.shN>=R.coalLim&&!R.coalOut){R.coalOut=1;R.closed=true;R.sched.length=0;log("🪨 炭が尽きた…今日はもう閉店");say(OW,"炭がもうない…今日はここまで")}p.orders++;p.nd=6+Math.random()*30;if(!p.drk&&!p.dlSet){p.dl=drN();p.dlSet=1};
if(G.ow){const o=G.ow,s=o.skill,late=R.t>=24*60,pb=Math.max(0,.35-s/200)+(late?.08:0),pt=Math.min(.7,s/150)*(late?.8:1),r=Math.random();let q=r<pb?0:r<pb+pt?2:1;if(R.allGood)q=2;else if(td().noGood&&q===2)q=1;(R.st.q||(R.st.q=[0,0,0]))[q]++;
if(spx(c)){}else if(q===2){if(!c.bv&&Math.random()<.4){c.bv=1;log("✨ "+nm(c)+" は近いうちにまた来てくれそう")}c.hp=Math.min(100,c.hp+4);c.mo=Math.min(.3,(c.mo||0)+.08);o.fol+=2;log("😋 "+nm(c)+"：とても美味しい！");if(Math.random()<.5)p.bq=rnd(LQ).replace("{o}",o.name)}
else if(q===0){if(Math.random()<.35){c.banM=G.month+1;c.bv=0;log("💧 "+nm(c)+" は来月までは来ないかも…")}c.up=Math.min(100,c.up+6);c.mo=Math.max(-.3,(c.mo||0)-.12);o.bad++;o.fol=Math.max(0,o.fol-1);R.st.miss++;log("😖 "+nm(c)+"：味がいまいち…");if(Math.random()<.5)p.bq=rnd(LB).replace("{o}",o.name)}}
const mix=flMix(c),fav=mix.includes(c.fl);
if(spx(c)){if(!refill&&!c.nomix){if(fav&&FL[c.fl][2]>=4)p.bq=FL[c.fl][0]+"が入ってる…最高です！";else if(!fav&&!flOpen(c.fl))p.bq="（"+FL[c.fl][0]+"があればなぁ…）"}}
else if(fav){const rr=FL[c.fl][2];c.hp=Math.min(100,c.hp+2+rr);c.fp+=rr>=4?2:1;if(rr>=4&&Math.random()<.5)p.bq=FL[c.fl][0]+"が入ってる…最高です！"}
else{c.up=Math.min(100,c.up+1);if(!flOpen(c.fl)&&Math.random()<.15)p.bq="（"+FL[c.fl][0]+"があればなぁ…）"}
G.fls=G.fls||{};mix.forEach(i=>G.fls[i]=(G.fls[i]||0)+1);p.mix=mix;const mn=mixName(mix);{const L=refill?REFL:MIXL,al=c.vx==="alien"||!!c.nomix,s=al?(refill?"おかわり、"+mn:mn):rnd(L).replace("{m}",mn);if(spx(c)){VXRAW=al?1:0;sayX(p,s);VXRAW=0}else say(p,(fav?"❤️ ":"")+s)}
if(p.sh)p.sh.rem=p.rem;log((refill?"🔁 おかわり ":p.sh?"💨 シェア ":"💨 ")+nm(c)+"："+mn+(fav?(spx(c)?"（好物入り）":"（好物入り❤️ 親密度アップ）"):"")+" ¥"+pr)}
/* 退店処理：満足度でリピート/来なくなる確率が変わる */
function endVisit(c,p){if(spx(c)){if(p&&c.i!==83&&c.bye&&String(c.bye).trim()){NOGOBI=1;sayX(p,c.bye);NOGOBI=0}c.ret=1;c.quit=0;c.hp=c.up=0;c.fp=(c.job==="シーシャ屋"&&(c.vn||0)>=3?100:0);return}c.fp+=3;const lo=Math.max(1,Math.ceil(c.tl/3));
if(p){if(p.tp<lo){c.up=Math.min(100,c.up+5);c.hp=Math.max(0,c.hp-2);say(p,rnd(LS));log("😶 "+nm(c)+" は話しかけてもらえず物足りなさそう…")}else if(p.tp<=c.tl){c.hp=Math.min(100,c.hp+3);if(Math.random()<.5)say(p,rnd(LG))}}
const m=(c.hp-c.up)/800;c.ret=Math.random()<Math.min(.97,c.repeat*mult(c)*(1+m)*(locM().rp||1))?1:0;
if(c.up>=80&&Math.random()<(c.up-75)/150){c.quit=1;c.ret=0;log("💔 "+nm(c)+" はもう来なくなりそう…")}}
function leaveNow(p){const c=p.c;if(p.st==="out")return;if(p.st==="sit"&&p.dl>0&&!p.drk){p.trip=p.dl;p.dl=0;p.drk=1;resolveDrink(p,1)}if(p.st==="peek"||p.st==="peekw"){p.st="out";p.path=[[-6,15]];return}if(p.seat.p===p)p.seat.p=null;const wasIn=p.st==="in";p.st="out";if(!wasIn)R.lastLeft={c,t:R.t};p.path=p.x<2?[[-6,15]]:[[p.x,15],[2,15],[-6,15]];if(!wasIn)endVisit(c,p);if(!wasIn&&c.i===83){p.uk={n:0,ph:"r0",w:0,op:p.x<2?[[-8,15],[-8,UKO]]:[[p.x,15],[2,15],[-8,15],[-8,UKO]]};p.path=[];NOGOBI=1;sayX(p,"アラシタ");NOGOBI=0;log("🚪 "+nm(c)+"：アラシタ")}}
function finish(p){if(p.sh){const o=p.sh.a===p?p.sh.b:p.sh.a;leaveNow(p);leaveNow(o);return}const c=p.c,fr=R.people.some(q=>q!==p&&q.st==="sit"&&bd(c.i,q.c.i)>=50);
if(!p.done&&!R.coalOut&&!R.kashi&&!(p.gp&&p.gp.m.length>=3)&&p.orders<3&&Math.random()<refP(c,p.orders,fr)+(p.seat&&p.seat.kind==="bb"&&p.orders<2?.03:0)){order(p,1);if(fr)log("　（仲の良い人がいるのでもう1本）");return}
if(p.gp){p.done=1;const m=p.gp.m;if(m.every(q=>q.done||q.st==="out")){m.forEach(q=>leaveNow(q));log("👋 "+m.length+"名で一緒に退店")}else{p.rem=1e9}return}
leaveNow(p)}
/* フリードリンク：席を立って冷蔵庫へ→飲んで席に戻る */
/* フリードリンク：1回の来店で1〜6本（多いほど低確率）。店内に4人以上いる間は取りに行かない */
const drN=()=>{const r=Math.random()*100;return r<40?1:r<65?2:r<80?3:r<90?4:r<96?5:6};
const inStore=()=>R.people.filter(q=>q.c&&q.st!=="out"&&q.st!=="peek"&&q.st!=="peekw").length;
function startDrink(p){p.st="go";p.trip=Math.max(1,p.dl);p.dl=0;p.drk=1;const sx=p.seat.px+2;p.path=[[sx,15],[FX,15],[FX,FY]];p.nd=8+Math.random()*25}
function resolveDrink(p,nw){const c=p.c,d=DR[c.fd],have=G.menu.includes(d.id),dn=lv(c)>=4?d.n:"好きなドリンク";
const n=Math.max(1,p.trip||1),xn=n>1?"×"+n:"",talky=Math.random()<.2,take=x=>{R.st.drinks+=n;R.st.dc=(R.st.dc||0)+x.p*n};
if(have){take(d);c.hp=Math.min(100,c.hp+2);if(talky)say(p,rnd(DY).replace("{d}",dn));log("🥤 "+nm(c)+"："+(lv(c)>=4?d.n:"ドリンク")+(n>1?xn:"を1本"))}
else{const alt=G.menu.map(id=>DR.find(x=>x.id===id));
if(alt.length){const x=rnd(alt);take(x);c.hp=Math.min(100,c.hp+1);c.up=Math.min(100,c.up+1);if(talky)say(p,rnd(DS).replace("{d}",dn).replace("{a}",lv(c)>=4?x.n:"別のドリンク"));R.st.miss++;log("🥤 "+nm(c)+"：好きなドリンクがなく"+(lv(c)>=4?x.n:"別のドリンク")+xn+"で我慢")}
else if(spx(c)){}else{c.up=Math.min(100,c.up+3);R.st.miss++;if(talky)say(p,rnd(DE));log("😞 "+nm(c)+" は飲み物が何もなくて不満…")}}
if(nw)return;const sx=p.seat.px+2;p.st="ret";p.path=[[FX,15],[sx,15],[sx,p.seat.Y0+3]]}
function move(p,dt){
if(p.st==="drink"){p.dt-=dt;if(p.dt<=0)resolveDrink(p);return}
if(p.st==="peekw"){p.wt-=dt;if(p.wt<=0){p.st="out";p.path=[[-6,15]]}return}
if(p.st==="peek"&&!p.path.length&&p.mob){p.st="peekw";p.wt=1e9;p.dir=1;mobArrive(p);return}
if(p.st==="peek"&&!p.path.length){p.st="peekw";p.wt=2.6;p.dir=1;say(p,rnd(p.nl));return}
if(p.uk&&ukMove(p,dt))return;const t=p.path[0];
if(!t){if(p.st==="in"){p.st="sit";order(p,0)}else if(p.st==="out")p.gone=1;else if(p.st==="go"){p.st="drink";p.dt=1.3;p.dir=2}else if(p.st==="ret")p.st="sit";return}
const dx=t[0]-p.x,dy=t[1]-p.y,d=Math.hypot(dx,dy),st=24*dt;
if(d>.01)p.dir=Math.abs(dx)>Math.abs(dy)?(dx>0?1:3):(dy>0?0:2);
if(d<=st){p.x=t[0];p.y=t[1];p.path.shift()}else{p.x+=dx/d*st;p.y+=dy/d*st}}
/* 隣席の客同士：初対面は「仲良くなる」「きまずい」で分岐、親密なら会話 */
function socials(){SEATS.forEach(s=>{const p=s.p;if(!p||p.st!=="sit")return;s.nb.forEach(o=>{const q=o.p;if(!q||q.st!=="sit"||s.id>o.id)return;if(spx(p.c)||spx(q.c)){const[x,y]=spx(q.c)?[p,q]:[q,p];if(!spx(x.c)&&y.c.job==="芸能人"&&!(y.fan||[]).includes(x.c.i)&&Math.random()<.25){(y.fan=y.fan||[]).push(x.c.i);say(x,"もしかして "+y.c.name+" さんですか？",1);sayX(y,"☺️",1)}return}const a=p.c,b=q.c,v=bd(a.i,b.i),lm=.35+.35*(slv(a)+slv(b))/2,chat=()=>{p.tp++;q.tp++;const w=v,[x,y]=Math.random()<.5?[p,q]:[q,p];if(ctier(w)<2&&FAMR[y.c.job]&&Math.random()<.35){say(x,"もしかして "+y.c.name+" さんですか？",1);say(y,rnd(FAMR[y.c.job]),1);return}say(x,callPre(x.c,y.c,w)+pairLine(x.c,y.c,w),1);say(y,pairReply(w),1)};
if(v<30){const fr=(a.fr+b.fr)/2*.5*lm,aw=(a.aw+b.aw)/2*.5*lm,r=Math.random();
if(r<fr){const[,n]=addB(a.i,b.i,10);a.hp=Math.min(100,a.hp+3);b.hp=Math.min(100,b.hp+3);chat();log("🤝 "+nm(a)+" と "+nm(b)+" が打ち解けた（親密度"+n+"）")}
else if(r<fr+aw){addB(a.i,b.i,-3);a.up=Math.min(100,a.up+3);b.up=Math.min(100,b.up+3);say(rnd([p,q]),rnd(LA),1);log("😅 "+nm(a)+" と "+nm(b)+" の間に気まずい空気…")}}
else if(Math.random()<.5*lm){addB(a.i,b.i,3);a.hp=Math.min(100,a.hp+1);b.hp=Math.min(100,b.hp+1);chat()}})})}
const TI=ORD.findIndex(o=>o[0]==="話しかけ適正回数");
function talk(p){const c=p.c,b=lv(c);if(R.away!=null){log("店主は不在です…");return}if(p.st==="out"||p.st==="in"||p.st==="peek"||p.st==="peekw")return;c.taps++;p.tp=(p.tp||0)+1;const sh="";if(spx(c)){G.talkN=(G.talkN||0)+1;const cl=(c.ls||[]).filter(x=>x&&x.trim());NOGOBI=1;sayX(p,cl.length?rnd(cl):"……");NOGOBI=0;giftTry(p);return}
if(c.moto){G.talkN=(G.talkN||0)+1;c.hp=Math.min(100,c.hp+1);NOGOBI=1;sayX(p,rnd(MOTOL));NOGOBI=0;return}
if(p.tp>c.tl&&c.fp<40){c.up=Math.min(100,c.up+4);c.hp=Math.max(0,c.hp-1);say(p,rnd(LT)+sh);if(p.tp===c.tl+1){R.st.miss++;log("😣 "+nm(c)+" に話しかけすぎた…（不満）")};return}
{const tm=(p.seat&&p.seat.kind==="c"?1.5:1)*(G.focusD===G.day?1.5:1);c.fpx=(c.fpx||0)+tm;const w=Math.floor(c.fpx+1e-9);c.fp+=w*(c.ex?4:1);c.fpx-=w}G.talkN=(G.talkN||0)+1;c.hp=Math.min(100,c.hp+1);if(p.seat&&p.seat.kind==="c"){c.hp=Math.min(100,c.hp+1)}say(p,line(c)+sh);if(c.fp>=50&&Math.random()<.01){const t=!flOpen(c.fl)&&FL[c.fl][2]<=flMax()+1?c.fl:flPick(Math.min(5,(c.rar||2)+1));if(t>=0&&!flOpen(t)){say(p,"「"+FL[t][0]+"」って知ってます？おいしいですよ");flUnlock(t,nm(c)+"に教わった")}}giftTry(p);if(lv(c)>b)log("📖 "+nm(c)+" の新しい情報が解禁！（図鑑）")}
function endDay(){const s=R.st,dl=(R.dl||[]).slice();R.dl=null;evEnd(s);log(`—— ${MN[G.month%12]}月${WD[G.wd]}曜 終了：売上${yen(s.sales)} 来店${s.visits}人 取り逃し${s.lost}人 ドリンク${s.drinks}杯 不満${s.miss}件${s.q?"　味 まずい"+s.q[0]+"/通常"+s.q[1]+"/美味しい"+s.q[2]:""} ——`);

dayDone({sales:s.sales,visits:s.visits,drinks:s.drinks,miss:s.miss,dc:s.dc||0,coal:s.coal||0,closed:false});showDayLog(dl,s)}
/* 休業日（台風など）：来たかった客は翌日の来店確率が少し上がる。売上は日平均に含めない */
function closeDay(msg){sched(true);R.sched.forEach(e=>e.m.forEach(c=>{c.bst=1}));R.sched=[];log(msg||"🌀 台風のため休業。来たかったお客様は、明日に期待…");dayDone({sales:0,visits:0,drinks:0,miss:0,dc:0,closed:true});if($("#ov").hidden&&typeof showMorning==="function")showMorning()}
function dayDone(en){G.week.push(en);
if(G.ow){const o=G.ow;folDayEnd(o,en);if(!o.sns&&o.fame>10)o.fame=Math.max(10,o.fame-.3);o.star=starOf(o);o.sns=0;o.bad=0;o.acted=0;G.cs.forEach(c=>{c.mo=Math.round((c.mo||0)*80)/100})}
G.day++;try{gaEvMove()}catch(e){}appear();G.cs.forEach(c=>{c.hp=Math.round(c.hp*.9);c.up=Math.round(c.up*.9);if(c.quit&&Math.random()<.06){c.quit=0;c.up=Math.min(c.up,40);log("🔔 "+nm(c)+" がまた来てくれるかも")}});
R.phase="prep";$("#go").disabled=false;$("#go").textContent="営業開始";$("#op").disabled=$("#cl").disabled=false;
halloOff();if(G.wd>=6){if(!day8(()=>settle()))settle()}else{G.wd++;save();day8(()=>{},1)}rdex();rfr();rfin()}
/* 月末精算：1日平均×その月の日数で月売上を推定し、費用と返済を引く */
function settle(){const wk=G.week.filter(d=>!d.closed),n=wk.length,sum=wk.reduce((a,d)=>a+d.sales,0),avg=n?sum/n:0,days=MDAYS[G.month%12],est=Math.round(avg*days),extra=est-sum,
rent=rentNow(),util=utilNow(),flv=Math.round(est*FLV),dsum=wk.reduce((a,d)=>a+(d.dc||0),0),dc=Math.round((n?dsum/n:0)*days),coal=Math.round((n?wk.reduce((a,d)=>a+(d.coal||0),0)/n:0)*days),brk=Math.random()<Math.min(.6,.2+wk.reduce((a,d)=>a+(d.visits||0),0)/150)?(()=>{const B=[["シーシャ台のホースが破れた"],["ヒーターが壊れた"],["冷蔵庫の修理"],["換気扇の修理"],["ボトルが割れた"],["炭コンロの故障"]];return{n:B[Math.random()*B.length|0][0],cost:(10+Math.floor(Math.random()*21))*1000}})():null,L=G.loan,intr=Math.round(L.bal*.1/12),pay=L.bal>0?Math.min(L.pay,L.bal+intr):0,prin=Math.max(0,pay-intr),before=G.money;
G.money+=extra-rent-util-flv-dc-coal-(brk?brk.cost:0)-pay;L.bal=Math.max(0,L.bal-prin);
const vis=G.week.reduce((a,d)=>a+d.visits,0),dr=G.week.reduce((a,d)=>a+d.drinks,0);
G.last={month:G.month,cl:G.week.filter(d=>d.closed).length,n,sum,avg,days,est,extra,rent,util,flv,dc,coal,brk,intr,prin,pay,before,after:G.money,bal:L.bal,vis,dr,seen:false};
if(G.money<0&&!(typeof s2Rescue==="function"&&s2Rescue()))G.over=true;save();showResult()}
/* 来月：新しいお客さんが現れる（店が広いほど多い）。グループは全員同時に */
function appear(){const o=G.ow,S={star:o?o.star:10,fame:o?o.fame:10,fol:o?o.fol:0,extra:G.extra,day:G.day},m=MN[G.month%12],nw=[];
G.cs.forEach(c=>{if(c.act||!c.ap||c.ap.k==="start")return;const a=c.ap,ok=a.k==="month"?m===+a.v:S[a.k]>=a.v;if(ok&&Math.random()*100<a.p){c.act=1;nw.push(c)}});
GROUPS.forEach(g=>{if(g.some(i=>G.cs[i].act))g.forEach(i=>{if(!G.cs[i].act){G.cs[i].act=1;nw.push(G.cs[i])}})});
if(nw.length)log("🌟 新しいお客さんの噂が広まっています（"+nw.length+"人が来店するように）")}
function unlockC(){const n=3+Math.floor(G.extra/2)+(G.ow?Math.floor(G.ow.fame/25)+Math.floor(G.ow.fol/800):0);let k=0;const nw=[];for(const c of G.cs){if(!c.act&&!c.ex&&k<n){c.act=1;k++;nw.push(c)}}GROUPS.forEach(m=>{if(m.some(i=>G.cs[i].act))m.forEach(i=>{if(!G.cs[i].act){G.cs[i].act=1;nw.push(G.cs[i])}})});if(nw.length)log("🌟 新しいお客さんが"+nw.length+"人、この街で噂を聞きつけたようです")}
function ventNow(){if(R.phase!=="run"||R.vent>0||R.vcd>0)return;R.vent=fanV();R.ventE=R.t+fanV();R.ventR=performance.now();log("🌀 換気中…（"+fanV()+"分）")}
function start(){if(!G.setup||!G.ow||G.over||(G.last&&!G.last.seen))return;if(G.wx[G.wd]==="typhoon"){closeDay();return}R.phase="run";R.tool=null;if(typeof setTab==="function")setTab("shop");R.dl=[];R.mtk=0;R.meal=0;R.snack=0;OW.eat=null;R.closed=false;R.idle0=null;R.idleSt=0;R.depr=0;owReset();R.t=G.open*60;R.socT=0;R.smoke=0;R.vent=0;R.vcd=0;R.smk=0;R.st={q:[0,0,0],dc:0,sales:0,cost:0,visits:0,lost:0,drinks:0,miss:0};evStart();R.t=G.open*60+(R.late||0);sched();evStartSched();try{fcInject()}catch(e){}if(R.late)log("⏰ 今日は"+Math.floor(R.t/60)%24+"時開店");{const w=WXI[G.wx[G.wd]],e=G.ev[G.wd];log(w[0]+" 今日は"+w[1]+(e?"／イベント「"+e.n+"」（客足×"+e.m+"）":""))}$("#go").disabled=true;$("#go").textContent="営業中…";$("#op").disabled=$("#cl").disabled=true;rfr();log(`☀️ ${MN[G.month%12]}月${WD[G.wd]}曜 営業開始`)}
let last=performance.now();
function tick(now){const dt=Math.min(.1,(now-last)/1000);last=now;const sdt=dt*R.speed;
if(R.phase==="run"&&R.speed&&!R.people.some(p=>p.uk)){const dm=dt*6*R.speed;R.t+=dm;R.socT+=dm;
{const sm=R.people.filter(p=>(p.st==="sit"||p.st==="go"||p.st==="drink"||p.st==="ret")&&!(p.sh&&p!==p.sh.a)).length,pv0=R.vent;R.smoke=clamp(R.smoke+dm*(.17*sm-R.smoke*(fanD()+(R.vent>0?fanS():0))),0,100);if(R.vent>0){R.vent-=dm;if(R.vent<=0){R.vent=0;R.vcd=fanC()}}else if(R.vcd>0)R.vcd-=dm;
if(R.smoke>55)R.people.forEach(p=>{if(p.st!=="out"&&p.st!=="in")p.c.up=Math.min(100,p.c.up+dm*.12*(R.smoke-55)/45)});
if(R.smoke>=60&&!R.smk){R.smk=1;log("😮‍💨 店内が煙たい…換気ボタンを押そう（不満がたまります）")}if(R.smoke<45)R.smk=0;
if(R.smoke>60&&Math.random()<dm*.04){const c=R.people.filter(p=>p.st==="sit"&&!spx(p.c));if(c.length){const q=rnd(c);say(q,rnd(LSM));if(!q._smk){q._smk=1;R.st.miss++;log("💨 "+nm(q.c)+" は煙たくて不満そう")}}}}
if(!R.closed&&R.t>=G.close*60){R.closed=true;R.sched.length=0;R.people.forEach(p=>leaveNow(p));log("🔔 閉店時間です。お客様に退店してもらいます")}
if(!R.closed&&R.t>=G.close*60-60&&!R.people.some(p=>p.st!=="out"&&p.st!=="peek"&&p.st!=="peekw")){R.closed=true;R.sched.length=0;log("🔔 ラストオーダーの時点でお客さんがいないので、閉店します")}
if(R.away==null)owTick(dm,sdt);evTick(dm);
while(R.sched.length&&R.sched[0].at<=R.t){const e=R.sched.shift();if(e.force&&(R.away!=null||!pickSeats(e.m))){e.at=R.t+10;R.sched.push(e);R.sched.sort((a,b)=>a.at-b.at);continue}if(e.force&&e.why)log(e.why);arrive(e.m)}
if(R.socT>=10){R.socT-=10;socials()}
R.people.forEach(p=>{if(p.sh&&p===p.sh.a){p.sh.t-=dm;if(p.sh.t<=0){p.sh.cur^=1;p.sh.t=6+Math.random()*10}}if(p.st==="sit"){actTick(p,dm);p.rem-=dm;p.nd-=dm;if(p.rem<=0)finish(p);else if(p.dl>0&&p.nd<=0&&!p.drk&&inStore()<4)startDrink(p)}})}
R.people.forEach(p=>{move(p,sdt);if(spx(p.c)){p.c.fp=0;p.c.hp=0;p.c.up=0}});
R.people=R.people.filter(p=>!p.gone);
if(R.phase==="run"&&(R.t>=G.close*60||R.closed)&&!R.people.length&&!R.sched.length&&!OW.mode&&R.evSp==null&&!R.clA&&!R.cine){R.cat=null;R.dark=null;R.away=null;owReset();endDay()}
liteDraw(now);{const _n=performance.now();if(_n-(window._hudT||0)>=90){window._hudT=_n;hud()}}requestAnimationFrame(tick)}
let smkTxt="";function hud(){{const S=Math.round(R.smoke),st=S>=60?"煙たい！":S>=30?"少し煙たい":"快適",tx=R.phase==="run"?"煙たさ "+S+"　"+st+(R.vent>0?"　換気中…（あと"+Math.max(1,Math.ceil(R.ventE!=null?R.ventE-R.t:R.vent))+"分）":R.vcd>0?"　（換気は"+Math.ceil(R.vcd)+"分後に再使用）":""):"",b=$("#vent");if(tx!==smkTxt){smkTxt=tx;$("#smk").textContent=tx}b.disabled=!(R.phase==="run"&&R.vent<=0&&R.vcd<=0)}
if(G.lotto){if(G.money<G.lottoM)G.money=G.lottoM;else G.lottoM=G.money}$("#money").textContent=G.lotto?"∞":"¥"+G.money.toLocaleString();$("#day").textContent=MN[G.month%12]+"月 "+WD[G.wd]+"曜（"+(G.wd+1)+"/7日目）";const tm=Math.floor(R.phase==="run"?R.t:G.open*60),h=Math.floor(tm/60);$("#clock").textContent=(R.phase==="run"?"":"開店 ")+(h%24)+":"+String(tm%60).padStart(2,"0")+(h>=24?"（翌）":"")}
/* ===== 装飾・図鑑・補充UI ===== */
function occ(tx,ty){return BL.has(tx+","+ty)||G.decor.some(d=>d.tx===tx&&d.ty===ty)}
function place(tx,ty){if(!FLS.has(tx+","+ty))return;
if(R.tool==="rm"){const i=G.decor.findIndex(d=>d.tx===tx&&d.ty===ty);if(i<0)return;const x=DEC.find(q=>q.id===G.decor[i].id);G.decor.splice(i,1);G.money+=x.p/2;log("🗑 "+x.n+" を売却 +¥"+x.p/2)}
else if(R.tool){if(occ(tx,ty)){log("そのマスは使えません");return}const x=DEC.find(q=>q.id===R.tool);if(!x)return;if(!ivF()&&!decOpen(x)){log("🔒 "+decCond(x)+"で解放されます");return}if(!ivF()&&plLeft()<=0){log("🔒 今月はもう"+PLMAX+"個設置しました。来月まで待ちましょう");return}if(!ivF()&&G.money<x.p){(log("お金が足りません"),toast("💸 お金が足りません"));return}if(ivF())ivUse();else{G.money-=x.p;plUse()}G.decor.push({id:x.id,tx,ty});log("✨ "+x.n+" を設置");R.tool=null;if(typeof rdeco==="function")rdeco()}
else return;build();save();ratm()}
const PLMAX=10;function plLeft(){return PLMAX-(G.plm===G.month?G.pln||0:0)}function plUse(){if(G.plm!==G.month){G.plm=G.month;G.pln=0}G.pln++}
function wallPlace(w){G.wall=G.wall||[];const i=G.wall.findIndex(d=>d.k===w.k||d.k2===w.k||d.k3===w.k||d.k4===w.k);
if(R.tool==="rm"){if(i<0)return;const x=WP.find(q=>q.id===G.wall[i].id);G.wall.splice(i,1);G.money+=x.p/2;log("🗑 "+x.n+" を剥がして売却 +¥"+x.p/2)}
else{if(i>=0){log("その場所にはもう壁アイテムが付いています");return}const x=WP.find(q=>q.id===R.tool);if(!x)return;if(!ivF()&&plLeft()<=0){log("🔒 今月はもう"+PLMAX+"個設置しました。来月まで待ちましょう");return}let k2=null,k1=w.k;if(x.w2){k2=wk2(w.k);if(!WS.some(q=>q.k===k2)||G.wall.some(d=>[d.k,d.k2,d.k3,d.k4].includes(k2))){log("2マス分の空きが必要です（右隣の区画も空けてください）");return}}else if(x.b2){k1=w.k.replace(/,u$/,"");const ks=[k1,wk2(k1),k1+",u",wk2(k1)+",u"];if(ks.some(q=>!WS.some(z=>z.k===q))||G.wall.some(d=>[d.k,d.k2,d.k3,d.k4].some(q=>ks.includes(q)))){log("縦2×横2マス分の空きが必要です");return}if(!ivF()&&G.money<x.p){(log("お金が足りません"),toast("💸 お金が足りません"));return}if(ivF())ivUse();else{G.money-=x.p;plUse()}G.wall.push({id:x.id,k:ks[0],k2:ks[1],k3:ks[2],k4:ks[3]});log("🖼 "+x.n+" を貼りました");R.tool=null;build();save();ratm();rdeco();hud();return}else if(x.h2){k1=w.k.replace(/,u$/,"");k2=k1+",u";if(!WS.some(q=>q.k===k1)||!WS.some(q=>q.k===k2)||G.wall.some(d=>[d.k,d.k2,d.k3,d.k4].some(q=>[k1,k2].includes(q)))){log("縦2マス分の空きが必要です（上下の区画を空けてください）");return}}if(!ivF()&&G.money<x.p){(log("お金が足りません"),toast("💸 お金が足りません"));return}if(ivF())ivUse();else{G.money-=x.p;plUse()}G.wall.push(k2?{id:x.id,k:k1,k2}:{id:x.id,k:w.k});log("🖼 "+x.n+" を貼りました");R.tool=null}
build();save();ratm();rdeco();hud()}
function ratm(){const a=atmo();$("#atm").textContent=TAGS.map(k=>TL[k]+a[k]).join(" ")}
const DGR=[["start","最初から"],["fame",20],["fame",40],["fame",60],["fame",80],["star",30],["star",60],["star",90],["skill",30],["skill",60],["extra",30],["month",3],["month",6]];
/* 床・壁の色：選ぶとまず店内でお試し表示。「購入する」で確定（その時だけお金がかかる） */
function clrPrev(fl,i){R.pvF=null;R.pvW=null;if(i!=null&&G.cnew){const nm=(fl?"f"+FLC[i].n:"w"+WLC[i].n);G.cnew=G.cnew.filter(x=>x!==nm)}const bar=$("#clrbar");if(bar)bar.remove();if(i!=null){if(fl)R.pvF=i;else R.pvW=i;const sh=$("#sheet");if(sh)sh.classList.remove("open");
const d=document.createElement("div");d.id="clrbar";d.innerHTML=`<div class="tc"><div>${fl?"床":"壁紙"}を「<b>${esc(fl?FLC[i].n:WLC[i].n)}</b>」にしますか？　¥${clrP(fl?FLC[i]:WLC[i]).toLocaleString()}</div><div class="row" style="justify-content:flex-end;margin-top:8px"><button id="clrno">やめる</button><button id="clrok" class="on">購入する</button></div></div>`;document.body.appendChild(d)}build();BGK="";rdeco()}
document.addEventListener("click",e=>{const b=e.target.closest("#clrok,#clrno");if(!b||(b.id!=="clrok"&&b.id!=="clrno"))return;const fl=R.pvF!=null,i=fl?R.pvF:R.pvW;
if(b.id==="clrok"&&i!=null){const pr=clrP(fl?FLC[i]:WLC[i]);if(G.money<pr){(log("お金が足りません"),toast("💸 お金が足りません"))}else{G.money-=pr;if(fl)G.fcl=i;else G.wcl=i;log("🎨 "+(fl?"床を「"+FLC[i].n:"壁紙を「"+WLC[i].n)+"」に変更（-¥"+pr.toLocaleString()+"）");save();hud()}}clrPrev(fl,null)});
function rdecoList(){const nw=G.dnew||[];$("#dl").innerHTML=DGR.map(([g,v])=>{const xs=DEC.filter(x=>x.u[0]===g&&(g==="start"||x.u[1]===v));if(!xs.length)return"";const op=decOpen(xs[0]);
return`<div class="dgh">${op?"":"🔒 "}${decCond(xs[0])}${op?"":"で解放"}</div>`+xs.map(x=>{const o=decOpen(x),ic=decIcon(x.id);return`<button class="it dit ${R.tool===x.id?"on":""} ${o?"":"lock"}" ${o?`data-d="${x.id}"`:"disabled"}>${ic?`<img src="${ic}" alt="">`:""}<span>${nw.includes(x.id)?'<b class="nw">NEW</b>':""}${x.n}<small>${o?"¥"+x.p.toLocaleString():"🔒 "+decCond(x)}　${Object.keys(x.t).map(k=>TL[k]+"+"+x.t[k]).join(" ")}</small></span></button>`}).join("")}).join("")}
function rdeco(){const it=x=>`<button class="it ${R.tool===x.id?"on":""}" data-d="${x.id}">${x.n}<small>¥${x.p.toLocaleString()}　${Object.keys(x.t).map(k=>TL[k]+"+"+x.t[k]).join(" ")}</small></button>`;rdecoList();{const e=$("#plc");if(e)e.innerHTML=`今月の設置：あと<b>${plLeft()}</b>個（1ヶ月に${PLMAX}個まで・置物と壁アイテムの合計）`}$("#wl").innerHTML=WP.filter(x=>!(x.u&&x.u[0]==="gift")).map(wpIt).join("");$("#clr").innerHTML=`<div class="flpart"><div class="m" style="font-size:12px;margin:6px 0 4px">床</div><div class="grid">${FLC.map((f,i)=>{const op=clrOpen(f),nw=(G.cnew||[]).includes("f"+f.n);return`<button class="it ${(G.fcl||0)===i?"on":""} ${op?"":"lock"}" ${op?`data-fc="${i}"`:"disabled"}><span class="sw" style="background:${clrSw(f,1)}">${op?"":"🔒"}</span>${nw?"<b style=\"color:#ff5a5a\">NEW </b>":""}${f.n}<small>${!op?clrCond(f):(G.fcl||0)===i?"使用中":"¥"+clrP(f).toLocaleString()}</small></button>`}).join("")}</div></div><div class="wlpart"><div class="m" style="font-size:12px;margin:8px 0 4px">壁紙</div><div class="grid">${WLC.map((f,i)=>{const op=clrOpen(f),nw=(G.cnew||[]).includes("w"+f.n);return`<button class="it ${(G.wcl||0)===i?"on":""} ${op?"":"lock"}" ${op?`data-wc="${i}"`:"disabled"}><span class="sw" style="background:${clrSw(f,0)};border:1px solid #888">${op?"":"🔒"}</span>${nw?"<b style=\"color:#ff5a5a\">NEW </b>":""}${f.n}<small>${!op?clrCond(f):(G.wcl||0)===i?"使用中":"¥"+clrP(f).toLocaleString()}</small></button>`}).join("")}</div></div>`;$("#wc").textContent=`使っている場所 ${(G.wall||[]).reduce((n,w)=>n+1+(w.k2!=null)+(w.k3!=null)+(w.k4!=null),0)}／貼れる場所 ${WS.length}`;$("#rm").className="dcw"+(R.tool==="mv"?" on":"");{const c=R.dcat||"obj";$("#sec-obj").hidden=c!=="obj";$("#sec-wp").hidden=c!=="wp";$("#sec-clr").hidden=c!=="fl"&&c!=="wl";$("#clr").dataset.m=c;document.querySelectorAll("[data-dc]").forEach(b=>b.classList.toggle("on",b.dataset.dc===c&&R.tool!=="mv"))}}
document.addEventListener("click",e=>{const b=e.target.closest("[data-dc]");if(!b||!b.dataset||!b.dataset.dc)return;R.dcat=b.dataset.dc;if(R.tool==="mv"){R.tool=null;mvOff()}rdeco()});
function rfr(){const run=R.phase==="run";$("#frh").textContent=`ドリンクメニュー ${G.menu.length}/${FTYPES}種類`;
$("#frl").innerHTML=DR.map(d=>{const on=G.menu.includes(d.id);return`<div class="dr"><span>${d.n}<small class="m"> 原価¥${d.p}</small></span><button data-mn="${d.id}" class="${on?"on":""}" ${run?"disabled":""}>${on?"選択中":"選ぶ"}</button></div>`}).join("")}
function toggleMenu(id){if(R.phase==="run")return;const i=G.menu.indexOf(id);if(i>=0)G.menu.splice(i,1);else if(G.menu.length>=FTYPES){log("選べるのは"+FTYPES+"種類までです");return}else G.menu.push(id);save();rfr()}
function drawFace(sel,c){const cv2=$(sel);if(!cv2||!c)return;const c2=cv2.getContext("2d"),oc=cx,ocam=R.cam,otx=TX,oty=TY,ob=BASE;
cx=c2;TX=2;TY=1.5;BASE=19;R.cam={yaw:0,pit:.12,zoom:1};const k=camVec();k.ox=60;k.oy=62+BASE*(10-TZ);
c2.clearRect(0,0,120,120);if(!FACE_TR){c2.fillStyle="#efe6da";c2.fillRect(0,0,120,120)}
const a=[];pv(a,0,0,1,Object.assign({},c),0,0);a.filter(v=>v[2]>=7.4).map(v=>({v,d:dep(v,k)})).sort((p,q)=>p.d-q.d).forEach(o=>dv(o.v,k));if(isGl(c.acc))glFx(0,0,1,0,0,c.acc,c.accC||"#333333",3.04).fn(k);
cx=oc;R.cam=ocam;TX=otx;TY=oty;BASE=ob}
function rflv(){$("#dg").classList.remove("dxg");const n=(G.flu||[]).length,st=r=>"★".repeat(r),nx=[20,30,40,50].find(m=>m>n);
$("#dc").innerHTML=dxTabs()+`<div style="margin-top:6px">解禁 ${n}/${FL.length}種類${nx?"　あと"+(nx-n)+"種類でボーナス":"　コンプリート！"}</div><div style="font-size:12px;margin-top:2px">新しいフレーバーは「シーシャの練習」で技術を上げる・「他店舗へ視察」・仲の良いお客さんから教わる、で増えます</div>`;
$("#dg").innerHTML=FL.map((f,i)=>{const o=flOpen(i),cnt=(G.fls||{})[i]||0,lk=o?G.cs.filter(c=>c.met&&c.fl===i&&lv(c)>2).map(nm):[];
return`<div class="it" style="${o?"":"opacity:.55"}"><span class="sw" style="background:${o?f[1]:"#888"}"></span><b>${o?esc(f[0]):"？？？"}</b> <span style="color:#d4a017;font-size:11px">${st(f[2])}</span><small>${o?"出した回数 "+cnt+"回"+(lk.length?"<br>好きな客："+esc(lk.slice(0,3).join("、"))+(lk.length>3?" ほか"+(lk.length-3)+"人":""):""):"レア"+f[2]+"・未解禁"}</small></div>`}).join("");$("#dd").hidden=true}
function dxTabs(){const m=R.dxm||"c";return`<div class="row" style="gap:6px"><button data-dxm="c" class="${m==="c"?"on":""}">👥 お客さん</button><button data-dxm="f" class="${m==="f"?"on":""}">🍃 フレーバー</button><button data-dxm="e" class="${m==="e"?"on":""}">⚡ イベント</button>${G.s2?`<button data-dxm="x" class="${m==="x"?"on":""}">🏪 EX</button>`:""}</div>`}
function rdex(){if(R.dxm==="f"){rflv();return}if(R.dxm==="e"){rev();return}const A=G.cs.filter(c=>R.dxm==="x"?c.ex:!c.ex),done=A.filter(c=>lv(c)>=NL).length,met=A.filter(c=>c.met).length,ap=A.filter(c=>c.act).length;$("#dc").innerHTML=dxTabs()+`<div style="margin-top:6px">出会った ${met}/${A.length}　コンプリート ${done}/${A.length}　（来店中の客 ${ap}人）</div>`;
$("#dg").classList.add("dxg");$("#dg").innerHTML=A.slice().sort((a,b)=>dxN(a)-dxN(b)).map(c=>{const L=lv(c),mx=L>=NL,no=dxNo(c),pc=Math.floor(L/NL*100),tc=mx?"mx":pc<10?"t0":pc<30?"t1":pc<50?"t2":pc<70?"t3":"t4";return`<button class="dxt ${R.sel===c.i?"on":""} ${c.met?"":"lk"} ${mx?"mx":""} ${c.quit?"qt":""} ${c.met?tc:""}" data-c="${c.i}"><span class="dxi"><span class="dxno">${no}</span>${c.rar?`<span class="dxr">${"★".repeat(c.rar)}</span>`:""}${c.met||c.act?`<img class="xf${c.met?"":" sil"}" data-fi="${c.i}" ${FACEC[c.i]?`src="${FACEC[c.i]}"`:""} alt="">`:`<b>？</b>`}${c.met?`<span class="dxl">${mx?"100":pc}%</span>`:""}</span><i class="dxp"><u style="width:${c.met?Math.round(L/NL*100):0}%"></u></i><small>${esc(c.met?nm(c):"未出現")}${c.met&&c.nick&&L>=NL?`<span class="dxs">${esc(c.name)}</span>`:""}</small></button>`}).join("");faceFill($("#dg"));
const d=$("#dd"),c=G.cs[R.sel];if(!c||!c.met){d.hidden=true;return}d.hidden=false;
const fl=G.cs.filter(o=>o.act&&o.i!==c.i&&o.met&&bd(c.i,o.i)>=50).map(nm);
d.innerHTML=`<button id="dxx" style="float:right;margin-left:6px">✕</button><canvas id="dxf" width="120" height="120" style="float:right;margin:0 0 6px 8px;border:3px solid #5a4632;border-radius:6px;width:96px;height:96px;image-rendering:pixelated"></canvas><b>No.${dxNo(c)} ${esc(nm(c))}${c.nick&&lv(c)>=NL?`<span style="font-weight:400;font-size:13px">（${esc(c.name)}）</span>`:""}</b> <span class="m">${c.job==="シーシャ屋"?"親密度 "+c.fp+"・来店 "+(c.vn||0)+"回":spx(c)?"来店 "+(c.vn||0)+"回":"親密度 "+c.fp}（タップ ${c.taps}回）${c.rar?`　<span style="color:#d4a017">${"★".repeat(c.rar)}</span>`:""}</span><div style="margin:6px 0">`+ORD.map((o,i)=>(c.job==="シーシャ屋"&&SHX.includes(o[0]))||(o[0]==="年齢"&&noAge(c))?"":`<div class="f"><span>${o[0]}</span><span>${lv(c)>i||o[0]==="シーシャ歴"||o[0]==="シーシャレベル"||(o[0]==="趣味"&&HBFIX[c.name])?esc(o[1](c)):"???"}</span></div>`).join("")+`<div class="f"><span>仲の良い客</span><span>${fl.length?esc(fl.join("、")):"—"}</span></div>${spx(c)?"":`<div class="f"><span>幸福ポイント</span><span>${Math.round(c.hp)}</span></div><div class="f"><span>不満ポイント</span><span>${Math.round(c.up)}</span></div>`}</div><div class="row"><input id="nk" maxlength="10" placeholder="ニックネーム" value="${esc(c.nick)}" style="flex:1;min-width:0"><button id="nks">付ける</button></div>`;drawFace("#dxf",c);
$("#nks").onclick=()=>{c.nick=$("#nk").value.trim();save();rdex()}}
/* ===== 経営・精算UI ===== */
const ov=h=>{const o=$("#ov");o.innerHTML=h;o.hidden=false;o.scrollTop=0},ovOff=()=>{$("#ov").hidden=true};
const payOpts=cur=>(PAYS.includes(cur)?PAYS:[...PAYS,cur].sort((a,b)=>a-b)).map(v=>`<option value="${v}" ${v===cur?"selected":""}>${yen(v)}</option>`).join("");
function rfin(){const L=G.loan,rent=rentNow(),util=utilNow(),wk=G.week.reduce((a,d)=>a+d.sales,0);
const w0=WXI[G.wx[G.wd]],e0=G.ev[G.wd],nx=G.wd<6?WXI[G.wx[G.wd+1]]:null,ne=G.wd<6?G.ev[G.wd+1]:null,ty=G.wx[G.wd]==="typhoon";
if(R.phase==="prep"&&!G.over)$("#go").textContent=ty?"台風のため休業（1日進める）":"営業開始";
$("#fin").innerHTML=`<b>経営</b> <span class="m">${MN[G.month%12]}月（${SEA(MN[G.month%12])}）${seaM()<1?'<span class="neg" style="font-size:11px">閑散期 客足×0.8</span>':seaM()>1?'<span class="pos" style="font-size:11px">繁忙期 客足×1.2</span>':""}</span><div class="f"><span>今日の天気</span><span>${w0[0]} ${w0[1]}${w0[2]>0&&w0[2]<1?"（客足×"+w0[2]+"）":""}${ty?"（休業）":""}</span></div><div class="f"><span>今日のイベント</span><span>${e0?esc(e0.n)+"（客足×"+e0.m+"）":"なし"}</span></div><div class="f"><span>明日の予報</span><span>${nx?nx[0]+" "+nx[1]+(ne?" ／ "+esc(ne.n):""):"来週の月曜は未定"}</span></div><div class="f"><span>店の広さ</span><span>${(48+G.extra)/4}坪（${48+G.extra}ブロック）</span></div><div class="f"><span>借入残高（年利10%）</span><span>${yen(L.bal)}</span></div><div class="f"><span>毎月の返済額</span><span>${yen(L.pay)}</span></div><div class="f"><span>家賃／水道光熱費（月）</span><span>${yen(rent)}／${yen(util)}</span></div><div class="f"><span>今週の売上（${G.week.length}日分）</span><span>${yen(wk)}</span></div><div class="f"><span>次の精算まで</span><span>あと${7-G.wd}日（営業${7-G.wd}回）</span></div>`;rown()}
const OWD0=()=>({shop:"",name:"",age:28,sex:"男性",hs:0,eye:0,hair:"#161616",skin:"#f1c7a0",shirt:"#2b2b3a",acc:0,accC:"#333333"});
const OWF=[["shop","text","店名"],["name","text","名前"],["sex","sel","性別",["男性","女性"]],["age","num","年齢"],["hs","sel","髪型",HSN],["hair","col","髪の色"],["skin","col","肌の色"],["shirt","col","服の色"],["top","sel","服の種類",TOPN],["bot","sel","ズボンの種類",BOTN],["pants","col","ズボンの色"],["eye","sel","目",EYN],["acc","sel","装飾品",ACCN],["accC","col","装飾品の色"]];
const ownForm=()=>{R.od=R.od||OWD0();const c=R.od;return`<div class="ed"><canvas id="owcv" width="160" height="170" style="width:160px;height:170px;display:block;margin:4px auto"></canvas><div class="row" style="justify-content:center"><button data-ow="L">◀</button><button data-ow="R">▶</button></div>`+OWF.map(([k,t,l,o])=>{
if(t==="text")return`<label><span>${l}</span><input type="text" data-ok="${k}" maxlength="${k==="shop"?14:8}" placeholder="${k==="shop"?"シーシャ屋さん":"店長"}" value="${esc(c[k]||"")}"></label>`;
if(t==="num")return`<label><span>${l}</span><input type="number" data-ok="${k}" min="18" max="80" value="${c[k]}"></label>`;
if(t==="col")return`<label><span>${l}</span><input type="color" data-ok="${k}" value="${c[k]}"></label>`;
if(k==="hs"||k==="top"||k==="bot")return owSel(k,l,o,c);const v=k==="sex"?(c.sex==="男性"?0:1):c[k];return`<label><span>${l}</span><select data-ok="${k}">${o.map((n,i)=>`<option value="${i}" ${i===v?"selected":""}>${esc(n)}</option>`).join("")}</select></label>`}).join("")+`</div>`};
const mkOwFromForm=()=>{const c=R.od||OWD0();return Object.assign(mkOw(c.name.trim(),c.age,c.sex),{shop:[...(c.shop||"").trim()].slice(0,10).join(""),eye:c.eye||0,hs:c.hs,hair:c.hair,skin:c.skin,shirt:c.shirt,top:c.top|0,bot:c.bot|0,pants:c.pants,acc:c.acc,accC:c.accC,h2:c.h2|0,t2:c.t2|0,b2:c.b2|0})};
function applyOwLook(){const o=G.ow;if(!o)return;Object.assign(OW.c,{eye:o.eye||0,hs:o.hs,hair:o.hair,skin:o.skin,shirt:o.shirt,acc:o.acc,accC:o.accC},o.top!=null?{top:o.top}:{},o.bot!=null?{bot:o.bot}:{},o.pants?{pants:o.pants}:{},{h2:o.h2|0,t2:o.t2|0,b2:o.b2|0});OW._pc=null}
function showOwEdit(){const o=G.ow;R.od={shop:o.shop||"",name:o.name,age:o.age,sex:o.sex,eye:o.eye||0,hs:o.hs,hair:o.hair,skin:o.skin,shirt:o.shirt,top:o.top!=null?o.top:OW.c.top,bot:o.bot!=null?o.bot:OW.c.bot,pants:o.pants||OW.c.pants,acc:o.acc,accC:o.accC,h2:o.h2|0,t2:o.t2|0,b2:o.b2|0};ov(`<div class="card"><b>店主の見た目</b>${ownForm2()}<button id="owok" class="on" style="width:100%;margin-top:8px">決定</button></div>`);prevO()}
function showOwner(){ov(`<div class="card"><b>店主の登録</b><div class="m" style="margin:6px 0">あなた自身（店主）を作ります。見た目と名前を決めてください。お客さんが会話の中で名前を呼んでくれます。知名度・スター性・技術は10から始まります。</div>${ownForm2()}<button id="own0" class="on">登録する</button></div>`);prevO()}
function tierTxt(s){const pb=Math.max(0,.35-s/200),pt=Math.min(.7,s/150);return"まずい"+Math.round(pb*100)+"%／通常"+Math.round((1-pb-pt)*100)+"%／美味しい"+Math.round(pt*100)+"%"}
function rown(){const o=G.ow,c=$("#own");if(!c)return;if(!o){c.hidden=true;return}c.hidden=false;
const can=R.phase==="prep"&&!o.acted&&G.setup&&!G.over&&!(G.last&&!G.last.seen),ty=G.wx[G.wd]==="typhoon";
c.innerHTML=`<b>店主 ${esc(o.name)}</b> <span class="m">${o.age}歳・${o.sex}</span><div class="f"><span>知名度（客足に影響）</span><span>${Math.round(o.fame)}</span></div><div class="f"><span>スター性（SNSフォロワーで上昇）</span><span>${o.star}</span></div><div class="f"><span>技術</span><span>${sk1(o.skill)}</span></div><div class="m" style="font-size:12px;text-align:right">${tierTxt(o.skill)}</div><div class="f"><span>SNSフォロワー</span><span>${o.fol.toLocaleString()}人</span></div>
<div class="m" style="font-size:12px;margin:6px 0 4px">1日に1回、開店前に行動できます${o.acted?"（今日は実行済み）":""}。SNSを更新しない日と、まずい提供があった日はフォロワーが減ります（更新した日は減りません）。</div>
<div class="row"><button data-o="sns" ${can?"":"disabled"}>📱 SNS更新</button><button data-o="prac" ${can&&G.money>=500?"":"disabled"}>🔥 練習 ¥500</button><button data-o="visit" ${can&&G.money>=3500&&!ty&&G.vm!==G.month?"":"disabled"}>🚶 他店舗へ ¥3,500${G.vm===G.month?"（今月済）":""}</button><button data-o="focus" ${can?"":"disabled"}>🤝 お店に集中</button></div><div class="row"><button data-owedit="1">✎ 店主の見た目を変える</button></div><div class="m" style="font-size:12px">他店舗へ行くと今日は休業（台風と同じ扱い）。技術と知名度が少し上がります。</div>`}
function act(k){const o=G.ow;if(!o||R.phase!=="prep"||o.acted||G.over||!G.setup||(G.last&&!G.last.seen))return;const b0={fol:o.fol,fame:o.fame,star:o.star,skill:o.skill},rs=(md,ic,t,msg)=>{R.actRes={md,ic,t,msg,b0,k}};
if(k==="sns"){if((evx().sns||0)>G.day)return;o.acted=1;o.sns=1;let g=Math.round((4+o.fame*.4+o.star*.25+Math.random()*6+o.fol*FOLK*folSat())*haeM()),md="good",ic="📱",t="SNSを更新した！",msg="いいねがついた。お店のことが少し広まった";
if(Math.random()<(o.star>=20&&o.star<30?.03:.05)){const b=Math.round(60+Math.random()*120+o.fol*(.25+Math.random()*.35)*folSat());g+=b;o.fame=Math.min(100,o.fame+FMK*2*(1-o.fame/100));md="great";ic="🎉";G.buzzN=(G.buzzN||0)+1;t="投稿がバズった！！";msg="通知が鳴りやまない…！フォロワーが一気に増えた";log("🔥 投稿がバズった！フォロワー+"+b)}
else if(Math.random()<.15){g=Math.max(1,Math.round(g*.2));md="bad";ic="😢";t="投稿がスベった…";msg="反応がうすい…。写真がブレてたかも"}
o.fol+=g;o.fame=Math.min(100,o.fame+FMK*(md==="bad"?.1:.45)*(1-o.fame/100));o.star=starOf(o);log("📱 SNSを更新（フォロワー+"+g+"）");rs(md,ic,t,msg)}
else if(k==="prac"){if(G.money<500)return;G.money-=500;o.acted=1;const r=Math.random();
if(r<.15){rs("bad","🥲","練習がうまくいかなかった…","炭を落として、片付けで一日が終わった。技術は上がらず");log("🔥 シーシャの練習…失敗（技術そのまま）")}
else{const u=r>.9?3:1+(Math.random()<.4?1:0);o.skill=Math.min(100,o.skill+u*(1-o.skill/100));const nf=flSkill();rs(u>=3?"great":"good",u>=3?"✨":"🔥",u>=3?"コツをつかんだ！":"シーシャの練習をした",(u>=3?"煙がいつもより格段にまろやか。これはいける！":"火加減が少しわかってきた")+(nf.length?"　🍃 新フレーバー「"+nf.join("」「")+"」を解禁！":""));log("🔥 シーシャの練習（技術+"+u+"）")}}

else if(k==="focus"){o.acted=1;G.focusD=G.day;rs("good","🤝","今日はお店に集中！","目の前のお客さんを大事にしよう。話しかけで上がる親密度が1.5倍");log("🤝 今日はお店に集中（話しかけの親密度1.5倍）")}
else if(k==="visit"){if(G.money<3500||G.wx[G.wd]==="typhoon"||G.vm===G.month)return;G.money-=3500;o.acted=1;G.vm=G.month;const gr=Math.random()<.12;o.skill=Math.min(100,o.skill+2*(1-o.skill/100));o.fame=Math.min(100,o.fame+FMK*(gr?4:2)*(1-o.fame/100));
const nf=flSkill().concat(flVisit());let shT="";{const L=G.cs.filter(c=>c.job==="シーシャ屋"&&(c.vn||0)<3&&!(G.shF||[]).some(x=>x.i===c.i));if(L.length&&Math.random()<.5){const c=rnd(L);shT="　💬 "+(c.nick||c.name)+"さんと話した！";log("💬 視察先で "+(c.nick||c.name)+" さんと話した");if(Math.random()<.3){G.shF=(G.shF||[]).concat([{i:c.i,d:G.day+1+(Math.random()*7|0)}])}}}rs(gr?"great":"good",gr?"🤝":"🚶",gr?"有名店のオーナーと仲良くなった！":"他店舗を視察した",(gr?"お店を紹介してもらえることに！知名度が大きく上がった（今日は休業）":"いい店の空気を勉強できた（今日は休業）")+(nf.length?"　🍃 新フレーバー「"+nf.join("」「")+"」を見つけた！":"")+shT);hud();closeDay("🚶 他店舗をめぐって勉強中。今日は休業（技術+2・知名度+"+(gr?3:1)+"）");return}
save();hud();rown()}
function showActRes(){const r=R.actRes,o=G.ow;if(!r||!o)return;const th={great:["linear-gradient(135deg,#fff3c4,#ffd6e8)","#b8860b"],good:["linear-gradient(135deg,#e6f7ea,#eef6ff)","#2e9e5b"],bad:["linear-gradient(135deg,#e7e7ee,#d9dbe6)","#5b5f7a"]}[r.md],
dl=(n,a,b,f)=>{const d=b-a;if(Math.abs(d)<.05)return"";return`<div class="f"><span>${n}</span><span class="${d>0?"pos":"neg"}">${f(a)} → ${f(b)}（${d>0?"+":""}${f(d)}）</span></div>`},rd=v=>String(Math.round(v*10)/10),ri=v=>Math.round(v).toLocaleString();
const rows=dl("フォロワー",r.b0.fol,o.fol,ri)+dl("知名度",r.b0.fame,o.fame,rd)+dl("スター性",r.b0.star,o.star,ri)+dl("技術",r.b0.skill,o.skill,sk1);
ov(`<div class="card" style="background:${th[0]};color:#2a2233;text-align:center${r.md==="bad"?"":""}"><div style="font-size:56px;line-height:1.2;margin-top:4px${r.md==="great"?";animation:pop .6s ease":""}">${r.ic}</div><b style="font-size:18px;color:${th[1]}">${r.t}</b><div style="margin:6px 0 10px;font-size:13px">${r.msg}</div><div style="text-align:left;background:rgba(255,255,255,.6);border-radius:10px;padding:6px 10px">${rows||"<div class='m'>大きな変化はなかった</div>"}</div><button id="arok" class="on" style="width:100%;margin-top:10px">${r.md==="bad"?"気を取り直して開店準備へ":"開店準備へ"}</button></div>`);R.actRes=null}

function showSetup(){ov(`<div class="card">${(G.tut||0)<1?`<div class="tutin">👋 ようこそ！まずは<b>自分（店長）</b>を作ろう。名前や見た目を決めたら、下の「開業」を押してね</div>`:""}<b>開業準備</b><div class="m" style="margin:6px 0">開業資金100万円を借りて店を開きます（内装・設備で85万円を使い、手元に残るのは<b>15万円</b>）。借入は年利10%（月あたり約0.83%）です。毎月の精算で、決めた金額を返済します。</div>${ownForm2()}${locForm()}<div class="row">毎月の返済額 <select id="pay">${payOpts(30000)}</select></div><div class="m" style="font-size:12px;margin-bottom:8px">最初の月の利息は約8,300円。残りが元本の返済になります。家賃12万円×立地（<b>最初の1ヶ月はフリーレントで0円</b>）・水道光熱費4万円＋客席1席あたり1,000円・フレーバー代（売上の30%）・炭代（お客さん1人150円）・ドリンク原価（飲まれた分）も毎月かかります。たまに設備の故障で修理代もかかります。</div><button id="start0" class="on">開業する（4月・月曜）</button></div>`);prevO()}
function showResult(){const r=G.last;if(!r)return;const c=v=>v<0?"neg":"pos",row=(a,b,cls)=>`<div class="f"><span>${a}</span><span class="${cls||""}">${b}</span></div>`,net=r.extra-r.rent-r.util-r.flv-(r.dc||0)-(r.coal||0)-(r.brk?r.brk.cost:0)-r.pay+(r.s2?r.s2.net:0)-(r.txp||0);
ov(`<div class="card"><b>${MN[r.month%12]}月 精算結果</b>
<div class="m" style="margin:4px 0 6px">営業${r.n}日${r.cl?"（休業"+r.cl+"日は平均から除外）":""}・来店${r.vis}人・ドリンク${r.dr}杯</div>
${row("1日平均の売上",yen(r.avg))}${row("推定の月売上（×"+r.days+"日）",yen(r.est))}${row("今週の実売上",yen(r.sum))}${row("残り日数分の売上を加算","+"+yen(r.extra),"pos")}
<div style="height:6px"></div>
${row(r.rent?"家賃":"家賃（フリーレント）","-"+yen(r.rent),"neg")}${row("水道光熱費","-"+yen(r.util),"neg")}${row("フレーバー代（売上×30%）","-"+yen(r.flv),"neg")}${row("ドリンク原価（飲まれた分の推定月額）","-"+yen(r.dc||0),"neg")}${row("炭代（1人150円・推定月額）","-"+yen(r.coal||0),"neg")}${r.brk?row("🔧 修理代（"+r.brk.n+"）","-"+yen(r.brk.cost),"neg"):""}${row("返済（元本"+yen(r.prin)+"＋利息"+yen(r.intr)+"）","-"+yen(r.pay),"neg")}
<div style="height:6px"></div>
${typeof s2Rows==="function"?s2Rows(r,row):""}${typeof taxRows==="function"?taxRows(r,row):""}${row("今回の収支",(net>=0?"+":"")+yen(net),c(net))}${row("所持金",G.lotto?"∞":yen(r.before)+" → "+yen(r.after),c(r.after))}${row("借入残高",yen(r.bal))}${G.ow?row("SNSフォロワー／スター性",G.ow.fol.toLocaleString()+"人／"+G.ow.star):""}
${G.over||r.ex?(r.ex&&!G.over?`<div class="m" style="margin-top:8px">今月は増築済みです（+${r.ex}ブロック）</div>`:""):`<div id="expc" style="margin-top:10px"></div>`}
${G.over?`<div class="neg" style="margin:10px 0 6px"><b>所持金がマイナスになりました。廃業です…</b></div><button id="goover" class="on">🔒 お店をたたむ…</button>`:`${(()=>{const nr=rentAt(r.month+1),fx=nr+utilNow()+(r.bal>0?G.loan.pay:0),net=r.after-r.before;return `<div class="m" style="margin-top:10px;font-size:12px">来月の固定費（家賃・光熱費・返済）：${yen(fx)}</div>`+(net<0&&r.after<fx*1.5?`<div class="neg" style="margin-top:4px;font-size:12px">⚠️ 今月は赤字でした。来月も赤字だと資金が足りなくなるかも。${r.bal>0&&G.loan.pay>PAYS[0]?"返済額を下げることも考えてみて":"SNSや置物を見直して、お客さんを増やそう"}</div>`:"")})()}<div class="row" style="margin-top:10px">${r.bal>0?`来月の返済額 <select id="pay">${payOpts(G.loan.pay)}</select>`:`<span class="pos">借入は完済しました！</span>`}</div><button id="nextm" class="on">${MN[(r.month+1)%12]}月へ進む</button>`}</div>`);R.exSel=[];rexp()}
/* ===== 増築：隣接する好きなマスを最大3ブロック。1ブロック3万円、家賃+5,000・光熱費+2,000（月） ===== */
const EXC=30000,EXMAX=3,GXM=10,GYM=10;
function exOk(sel){const S=new Set(sel),ok=[],q=[];const nb=k=>{const[x,y]=k.split(",").map(Number);return[[1,0],[-1,0],[0,1],[0,-1]].map(([a,b])=>(x+a)+","+(y+b))};
let ch=true,got=new Set();while(ch){ch=false;S.forEach(k=>{if(!got.has(k)&&nb(k).some(o=>FLS.has(o)||got.has(o))){got.add(k);ch=true}})}return[...got]}
/* ===== 増築：借入を完済すると、右か奥に列ごと広げられる（工事代は増築ローンで借りる） ===== */
function exUnit(){return EXU0+EXU1*(G.exN||0)}
function exOpts(){const xs=FLT.map(t=>t[0]),ys=FLT.map(t=>t[1]),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys),Wd=x1-x0+1,Hd=y1-y0+1,o=[];
const col=(n)=>{const a=[];for(let i=1;i<=n;i++)for(let y=y0;y<=y1;y++)a.push((x1+i)+","+y);return a},row=(n)=>{const a=[];for(let i=1;i<=n;i++)for(let x=x0;x<=x1;x++)a.push(x+","+(y0-i));return a};
if(Wd<GXM)o.push({k:"r1",n:"右に1列",t:col(1)});if(Hd<GYM)o.push({k:"b1",n:"奥に1列",t:row(1)});
if((G.exN||0)>=3){if(Wd+1<GXM)o.push({k:"r2",n:"右に2列",t:col(2)});if(Hd+1<GYM)o.push({k:"b2",n:"奥に2列",t:row(2)})}
o.forEach(x=>{x.cost=EXB+x.t.length*exUnit();x.up=x.t.length*(RENT_BLK+UTIL_BLK)});return{o,Wd,Hd}}
function rexp(){const c=$("#expc");if(!c)return;if(G.loan.bal>0){c.innerHTML=`<div class="m" style="font-size:12px">🏗 借入を完済すると増築できます（残り ${yen(G.loan.bal)}）</div>`;return}
const{o,Wd,Hd}=exOpts();if(!o.length){c.innerHTML=`<div class="m" style="font-size:12px">🏗 これ以上は広げられません（最大 ${GXM}×${GYM}）</div>`;return}
c.innerHTML=`<b>🏗 増築できます！</b><div class="m" style="font-size:12px;margin:2px 0 6px">借入を完済したので、お店を広げられます（今 ${Wd}×${Hd}マス）。工事代は<b>増築ローン</b>として借り、完済すると次の増築ができます。</div>`+o.map(x=>`<button data-exo="${x.k}" style="width:100%;text-align:left;margin-top:6px"><b>${x.n}（+${x.t.length}マス）</b><small style="display:block;color:var(--mut)">工事代 ${yen(x.cost)}（ローン）・家賃と光熱費 月+${yen(x.up)}</small></button>`).join("")}
function doExpand(k){if(G.loan.bal>0)return;const x=exOpts().o.find(q=>q.k===k);if(!x)return;x.t.forEach(t=>{if(!G.fl.includes(t))G.fl.push(t)});G.extra+=x.t.length;G.exN=(G.exN||0)+1;G.loan.bal+=G.lotto?0:x.cost;
/* 増築ローンは約7か月で返し終わる額に（6回の増築で、開業からおよそ4年で全部完了） */G.loan.pay=Math.ceil(x.cost/6.3/10000)*10000;G.last.ex=x.t.length;G.last.bal=G.loan.bal;build();save();hud();rfin();log("🏗 "+x.n+"増築しました（+"+x.t.length+"マス・増築ローン "+yen(x.cost)+"）");showResult()}
document.addEventListener("click",e=>{const b=e.target.closest("[data-exo]");if(!b||!b.dataset||!b.dataset.exo)return;doExpand(b.dataset.exo)});
function toggleX(k){const i=R.exSel.indexOf(k);if(i>=0){R.exSel.splice(i,1);R.exSel=exOk(R.exSel)}else if(R.exSel.length<EXMAX)R.exSel.push(k);rexp()}


function nextMonth(){const s=$("#pay");if(s)G.loan.pay=+s.value;G.last.seen=true;G.month++;G.wd=0;G.week=[];newWeek(G.month);save();ovOff();hud();rfin();rdex();showMorning()}
/* ===== 客ビルダー：名前・見た目・装飾品・好み・性格を手動で作成/編集 ===== */
const MKF=[["name","text","本名"],["sex","sel","性別",["男性","女性"]],["age","num","年齢"],["hs","sel","髪型",HSN],["hair","col","髪の色"],["skin","col","肌の色"],["shirt","col","服の色"],["top","sel","服の種類",TOPN],["bot","sel","ズボンの種類",BOTN],["pants","col","ズボンの色"],["eye","sel","目",EYN],["acc","sel","装飾品",ACCN],["accC","col","装飾品の色"],["pe","sel","性格",PEN],["job","sel","職業",JOBS],["rar","sel","レアリティ",["未定","1","2","3","4","5"]],["fav","sel","好きな雰囲気",TAGS.map(k=>TL[k])],["fl","sel","好きなフレーバー",FL.map(f=>f[0]+"（レア"+f[2]+"）")],["fd","sel","好きなドリンク",DR.map(d=>d.n)],["hist","sel","シーシャ歴",HIST],["sl","sel","シーシャレベル（上ほど客同士で会話）",SLN],["freq","sel","来店頻度（週）",Array.from({length:14},(_,i)=>"週"+(.5+i*.5)+"回")],["stay","sel","1本の滞在",[50,60,70,80,90,100,110].map(v=>v+"分")],["tl","num","話しかけ適正回数(2-6)"],["first","rg","初回来店確率"],["repeat","rg","リピート確率"],["refill","rg","おかわり確率"],["fr","rg","仲良くなる確率"],["aw","rg","きまずい確率"],["hb","text","趣味（自由入力：ゲーム・釣り・料理 など）"],["l1","ln","固有セリフ1"],["l2","ln","固有セリフ2"],["l3","ln","固有セリフ3"],["apk","sel","出現条件",APN],["apv","apn","条件の値（月は1〜12）"],["app","app","出現確率（％／日）"]];
const mkRand=()=>{const c=mkC(-1,"",Math.random()<.5?"男性":"女性",1);c.name=rnd(SUR)+" "+rnd(c.sex==="男性"?GM:GF);return c};
function mkVal(c,k){if(k==="fav")return TAGS.indexOf(c.fav);if(k==="freq")return Math.round((c.freq-.5)*2);if(k==="stay")return Math.round((c.stay-50)/10);if(k==="hist")return HIST.indexOf(c.hist);if(k==="sl")return slv(c);if(k==="sex")return c.sex==="男性"?0:1;if(k==="job")return JOBS.indexOf(c.job);if(k==="apk")return APK.indexOf(c.ap.k);return c[k]}
function rmk(){if(!R.mk){R.mk=mkRand();R.mkE=-1}const c=R.mk,cu=G.cs.filter(x=>x.cu);
$("#mk").innerHTML=`<b>客ビルダー</b><div class="m" style="font-size:12px;margin:2px 0 6px">好きなお客さんを作って店に呼べます。作ったお客さんはすぐに来店するようになり、図鑑にも載ります。</div><canvas id="mkcv" width="160" height="170" style="width:160px;height:170px;display:block;margin:0 auto 6px"></canvas><div class="row" style="justify-content:center"><button data-mk="L">◀</button><button data-mk="R">▶</button><button data-mk="rand">ランダム</button></div>
<label><span>編集する客</span><select id="mkE"><option value="-1">新規作成</option>${G.cs.map(x=>`<option value="${x.i}" ${x.i===R.mkE?"selected":""}>No.${dxNo(x)} ${esc(x.name)}${x.ed?" ✎":""}</option>`).join("")}</select></label><div style="text-align:center;font-size:20px;font-weight:bold;margin:6px 0">お客さんナンバー No.${String((R.mkE>=0?R.mkE:G.cs.length)+1).padStart(3,"0")}${R.mkE>=0?"":"（新規）"}</div>`+MKF.map(([k,t,l,o])=>{const v=mkVal(c,k);
if(t==="text")return`<label><span>${l}</span><input type="text" data-k="${k}" maxlength="${k==="name"?10:16}" value="${esc(c[k]||"")}"></label>`;
if(t==="ln")return`<label style="display:block"><span class="m" style="font-size:12px">${l}</span><input type="text" data-k="${k}" maxlength="40" style="width:100%;box-sizing:border-box" value="${esc((c.ls||[])[+k[1]-1]||"")}"></label>`;
if(t==="num")return`<label><span>${l}</span><input type="number" data-k="${k}" min="${k==="tl"?2:18}" max="${k==="tl"?6:80}" value="${c[k]}"></label>`;
if(t==="apn")return`<label><span>${l}</span><input type="number" data-k="${k}" min="0" max="100000" step="1" value="${c.ap.v}"></label>`;
if(t==="app")return`<label><span>${l}</span><input type="number" data-k="${k}" min="0.1" max="100" step="0.1" value="${c.ap.p}"></label>`;
if(t==="col")return`<label><span>${l}</span><input type="color" data-k="${k}" value="${c[k]}"></label>`;
if(t==="rg")return`<label><span>${l} <b>${Math.round(c[k]*100)}%</b></span><input type="range" data-k="${k}" min="5" max="100" value="${Math.round(c[k]*100)}"></label>`;
return`<label><span>${l}</span><select data-k="${k}">${o.map((n,i)=>`<option value="${i}" ${i===v?"selected":""}>${esc(n)}</option>`).join("")}</select></label>`}).join("")+`<button id="mkok" class="on" style="width:100%;margin-top:8px">${R.mkE>=0?"この内容で更新":"このお客さんを追加"}</button><div class="m" style="font-size:12px;margin:10px 0 4px">これは開発用ツールです。作ったお客さんを本番ゲームの住人にするには、下の「書き出し」で出る文字列をClaudeに送ってください。</div><button id="mkx" style="width:100%">作ったお客さんを書き出す</button><textarea id="mkxo" readonly hidden style="width:100%;height:120px;margin-top:6px;box-sizing:border-box;font-size:11px"></textarea>`;
prevC()}
function mkRead(k,el){const c=R.mk;const v=el.value;
if(k==="name")c.name=v;else if(k==="hb")c.hb=v;else if(k==="l1"||k==="l2"||k==="l3"){c.ls=[...(c.ls||[]),"","",""].slice(0,3);c.ls[+k[1]-1]=v}else if(k==="age")c.age=clamp(+v||20,18,80);else if(k==="tl")c.tl=clamp(+v||4,2,6);else if(["hair","skin","shirt","accC","pants"].includes(k))c[k]=v;
else if(["first","repeat","refill","fr","aw"].includes(k)){c[k]=+v/100;const b=el.parentElement.querySelector("b");if(b)b.textContent=v+"%"}
else if(["hs","acc","pe","fl","fd","sl","eye","rar","top","bot"].includes(k))c[k]=+v;else if(k==="sex")c.sex=+v?"女性":"男性";else if(k==="fav")c.fav=TAGS[+v];else if(k==="hist")c.hist=HIST[+v];
else if(k==="apk")c.ap.k=APK[+v];else if(k==="apv")c.ap.v=+v||0;else if(k==="app")c.ap.p=clamp(+v||0.1,.1,100);else if(k==="job")c.job=JOBS[+v];else if(k==="freq")c.freq=.5+ +v*.5;else if(k==="stay")c.stay=50+ +v*10}
let mkYaw=-.6;
function drawPrev(sel,mk){const cv2=$(sel);if(!cv2||!mk)return;const c2=cv2.getContext("2d"),oc=cx,ocam=R.cam,otx=TX,oty=TY,ob=BASE;
cx=c2;TX=2;TY=1.5;BASE=9;R.cam={yaw:mkYaw,pit:.45,zoom:1};const k=camVec();k.ox=80;k.oy=130;
c2.clearRect(0,0,160,170);c2.fillStyle="#efe6da";c2.beginPath();c2.ellipse(80,138,34,10,0,0,7);c2.fill();
const a=[];pv(a,0,0,1,Object.assign({i:0},mk),0,0);a.map(v=>({v,d:dep(v,k)})).sort((p,q)=>p.d-q.d).forEach(o=>dv(o.v,k));if(isGl(mk.acc))glFx(0,0,1,0,0,mk.acc,mk.accC||"#333333",3.04).fn(k);
cx=oc;R.cam=ocam;TX=otx;TY=oty;BASE=ob}
function mkExport(){const K=["name","sex","age","hs","hair","skin","shirt","acc","accC","pe","job","fav","fl","fd","hist","sl","eye","freq","stay","tl","first","repeat","refill","fr","aw","ap","hb","ls"],cu=G.cs.filter(c=>c.cu||c.ed).map(c=>{const o={no:c.i+1};K.forEach(k=>{o[k]=typeof c[k]==="number"&&!Number.isInteger(c[k])?Math.round(c[k]*100)/100:c[k]});return o}),t=$("#mkxo");t.hidden=false;t.value=cu.length?JSON.stringify(cu):"（まだ作ったお客さんがいません）";t.focus();t.select();try{navigator.clipboard.writeText(t.value);log("📋 書き出しました（コピー済み）")}catch(_){log("📋 文字列を長押ししてコピーしてください")}}
function prevC(){drawPrev("#mkcv",R.mk)}
function prevO(){drawPrev("#owcv",R.od)}
function mkSave(){const c=R.mk;if(!c.name.trim()){log("名前を入力してください");return}if(R.mkE>=0){const t=G.cs[R.mkE];Object.assign(t,c,{i:t.i,met:t.met,fp:t.fp,taps:t.taps,nick:t.nick,hp:t.hp,up:t.up,quit:t.quit,ret:t.ret,mo:t.mo,g:t.g,act:t.act,cu:t.cu,ed:1,ap:Object.assign({},c.ap)});if(R.mkE<151&&!t.act&&t.ap.k==="start")t.act=1;log("✎ No."+dxNo(t)+" を更新しました")}
else{if(G.cs.length>=400){log("これ以上は作れません");return}const t=Object.assign({},c,{i:G.cs.length,act:c.ap.k==="start"?1:0,cu:1,ed:1,g:-1,met:0,fp:0,taps:0,nick:"",hp:10,up:0,quit:0,ret:0,mo:0,ap:Object.assign({},c.ap)});G.cs.push(t);log("🎨 "+t.name+" を追加しました。来店をお楽しみに")}
save();R.mk=mkRand();R.mkE=-1;rmk();rdex()}
