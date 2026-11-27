/* ===== フレーバーの熟練度（0〜100）：出すたび+0.08、練習で3種類+1、まずいで−0.3。高いほど「美味しい」が出やすい ===== */
function flpInit(){if(G.flp)return;G.flp={};const S=G.fls||{};for(const i in S)G.flp[i]=Math.min(100,Math.round(S[i]*.08*100)/100)}
function flpGet(i){flpInit();return G.flp[i]||0}
function flpAdd(i,v){flpInit();const a=G.flp[i]||0,b=Math.max(0,Math.min(100,Math.round((a+v)*100)/100));G.flp[i]=b;
 for(const m of[50,100])if(a<m&&b>=m)try{log("🎖 "+FL[i][0]+"の熟練度が"+m+"になった！")}catch(e){}return b}
/* ミックスの熟練度（入っているフレーバーの平均） */
function flPro(mix){if(!mix||!mix.length)return 0;return mix.reduce((s,i)=>s+flpGet(i),0)/mix.length}
/* 練習：解禁済みからランダムに3種類 +1 */
function flPrac(){const op=(G.flu||[]).slice();const out=[];for(let k=0;k<3&&op.length;k++){const i=op.splice(Math.random()*op.length|0,1)[0];flpAdd(i,1);out.push(FL[i][0])}return out}
var FLSORT=0;document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest("#flsort")){FLSORT=FLSORT?0:1;try{rflv()}catch(_){}}});
