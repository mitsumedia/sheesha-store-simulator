
/* ===== 通行人のバリエーション：服の色を増やす・メガネ/帽子/カバンをランダム・同じ種類が続かない ===== */
(()=>{const SU=["#263238","#37474f","#212121","#455a64","#5d4037","#8d6e63","#c8b38a","#1a237e","#546e7a","#3e2723","#616161","#283593","#4e5b6e","#6d6d6d"],
 ST=["#1a237e","#fafafa","#263238","#283593","#4e342e","#455a64","#e3f2fd","#c5cae9","#3e2723","#212121","#00695c","#880e4f","#ffecb3"];
 if(MBLK.kaisha){MBLK.kaisha.shirt=SU;MBLK.kaisha.pants=SU}
 if(MBLK.gakusei){MBLK.gakusei.shirt=ST;MBLK.gakusei.pants=["#1a237e","#424242","#212121","#3e2723","#455a64","#5d4037","#263238"]}
 if(MBLK.jog){MBLK.jog.shirt=["#ff7043","#26c6da","#d4e157","#ec407a","#7e57c2","#66bb6a","#fafafa","#ffca28","#29b6f6","#212121"];MBLK.jog.pants=["#212121","#37474f","#1a237e","#fafafa"]}
 if(MBLK.kanko)MBLK.kanko.shirt=["#ffeb3b","#4fc3f7","#ff8a65","#aed581","#f48fb1","#fafafa","#ce93d8"]})();
const MB_ACCR=[7,7,10,12,13,1,14,2,2,3,17,18,21,5,6],MB_GEN=["kaisha","gakusei","kaimono","sumaho","couple","jog","inu_s","inu_b","shiba","hippare"];
{const _ml5=mbLook;mbLook=function(t,a){const c=_ml5.apply(this,arguments);try{const o=MBLK[t.id]||{};if(MB_GEN.includes(t.id)){if(!o.acc&&Math.random()<.4)c.acc=MB_ACCR[Math.floor(Math.random()*MB_ACCR.length)];if(t.id==="gakusei"&&Math.random()<.5)c.top=[0,1,5,6,8][Math.floor(Math.random()*5)];if(t.id==="kaisha"&&Math.random()<.25)c.top=[1,5][Math.floor(Math.random()*2)];if(c.acc===8)c.acc=0}}catch(e){}return c}}
/* カバン・リュック */
{const _sp10=mbSpawn;mbSpawn=function(){const n0=MB.L.length;const r=_sp10.apply(this,arguments);try{for(let i=n0;i<MB.L.length;i++){const m=MB.L[i];if(!m||m.T.k!=="ped"||m.T.cat||m.T.pp||m.pp||!MB_GEN.includes(m.T.id))continue;const q=Math.random();if(q<.18)m.pp=["bag:"+["#3e2723","#212121","#5d4037","#b71c1c","#1a237e","#c8b38a"][Math.floor(Math.random()*6)]];else if(q<.3)m.pp=["back:"+["#212121","#1565c0","#2e7d32","#6a1b9a","#c62828"][Math.floor(Math.random()*5)]]}}catch(e){}return r}}
/* 同じ種類が続けて出にくく */
{const _pk2=mbPick;mbPick=function(){let t=_pk2.apply(this,arguments);try{MB.lastT=MB.lastT||[];for(let k=0;k<3&&t&&MB.lastT.includes(t.id);k++)t=_pk2.apply(this,arguments);if(t){MB.lastT.push(t.id);if(MB.lastT.length>3)MB.lastT.shift()}}catch(e){}return t}}

/* ===== 乗り物で帰るお客さん（有馬・亜空間飛助）は歩いて帰らない ===== */
function vehRider(p){try{return typeof VEH!=="undefined"&&p&&p.c&&VEH[p.c.i]&&(R.vehs||[]).some(b=>b.c===p.c)}catch(e){return false}}
/* ===== 通りすぎる図鑑のお客さん：今日来る予定の人・亜空間飛助は通らない。有馬はバイクで通りすぎる ===== */
function todaySet(){const S=new Set();try{(R.sched||[]).forEach(e=>(e.m||[]).forEach(c=>S.add(c)));(R.people||[]).forEach(p=>p.c&&S.add(p.c));(R.vehs||[]).forEach(b=>b.c&&S.add(b.c))}catch(e){}return S}
function arimaPass(){try{if(!mbOn()||R.cine)return;const c=G.cs.find(q=>q&&q.i===94);if(!c||!c.met||todaySet().has(c))return;G.mbDx=G.mbDx||{};if(G.mbDx[94]===G.day)return;const g=mbGeo();R.vehs=R.vehs||[];R.vehs.push({ph:"out",dir:-1,x:g.L-17.5,y:g.Y1+20,c,t:performance.now(),pass:1});G.mbDx[94]=G.day;const t="👀 "+nm(c)+" がバイクで店の前を通りすぎた";log(t);mbBand(t)}catch(e){}}
{const _sp11=mbSpawn;mbSpawn=function(){const r=_sp11.apply(this,arguments);try{if(Math.random()<.006)arimaPass()}catch(e){}return r}}
