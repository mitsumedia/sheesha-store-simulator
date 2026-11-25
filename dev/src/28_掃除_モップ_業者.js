
/* ===== 掃除：業者の値段は広さで決まる（最初¥3,000 → 最大まで増築すると¥200,000） ===== */
function clnFee(){const n=FLT.length,n0=48,nM=GXM*GYM;const r=Math.max(0,Math.min(1,(n-n0)/Math.max(1,nM-n0)));return Math.round((3000+r*197000)/1000)*1000}
{const _hu9=hud;hud=function(){const r=_hu9.apply(this,arguments);try{const b=document.querySelector("[data-clpro]");if(b){const t="🧹 業者に掃除を頼む "+yen(clnFee());if(b.textContent!==t)b.textContent=t}}catch(e){}return r}}
/* なぞった所に家具があれば、その家具が置いてあるマスを掃除する */
function cleanFurnKey(clx,cly){const r=cv.getBoundingClientRect(),X=(clx-r.left)*W/r.width,Y=(cly-r.top)*CH/r.height,k=R.cv||camVec();let best=null,bd=-1e9;
 (G.furn||[]).forEach(F=>{furnFoot(F).forEach(q=>{const[tx,ty]=q.split(",").map(Number),seat=F.k==="b"||(F.o?tx===F.tx:ty===F.ty),h=F.k==="b"?5:seat?6.5:1.2,x0=tx*6,y0=ty*6;if(mvIn(mvBox(x0+.3,x0+5.7,y0+.3,y0+5.7,h,k),X,Y)){const d=(x0+3)*k.cx+(y0+3)*k.cy+h/2*k.cz;if(d>bd){bd=d;best=q}}})});
 (G.decor||[]).forEach(d0=>{const x0=d0.tx*6,y0=d0.ty*6;if(mvIn(mvBox(x0+.5,x0+5.5,y0+.5,y0+5.5,8,k),X,Y)){const d=(x0+3)*k.cx+(y0+3)*k.cy+4*k.cz;if(d>bd){bd=d;best=d0.tx+","+d0.ty}}});return best}
/* 掃除中は、汚れが残っているマスの床をほんのり色づける */
{const _db5=drawBG;drawBG=function(k){const r=_db5.apply(this,arguments);try{if(R.cleaning){const D=G.dirt||{};cx.save();FLT.forEach(([tx,ty])=>{const v=D[tx+","+ty]||0;if(v<=0)return;const X=tx*6,Y=ty*6,P4=[P3(X+.4,Y+.4,.05,k),P3(X+5.6,Y+.4,.05,k),P3(X+5.6,Y+5.6,.05,k),P3(X+.4,Y+5.6,.05,k)];cx.globalAlpha=.18+Math.min(.32,v/220);cx.fillStyle="#ffb300";cx.beginPath();P4.forEach((p,i)=>i?cx.lineTo(p[0],p[1]):cx.moveTo(p[0],p[1]));cx.closePath();cx.fill()});cx.restore()}}catch(e){}return r}}
/* 店長がモップを持って掃除する */
{const _dy2=dyn;dyn=function(){const a=_dy2.apply(this,arguments);try{if(R.cleaning&&OW.x>-100){const t=performance.now()/1000,sw=Math.sin(t*14)*1.2,hx=OW.x+1.6,hy=OW.y-.4;for(let i=0;i<14;i++){const f=i/13;a.push([hx+sw*(1-f)*.6-f*.2,hy-1.2*(1-f),.4+f*7.4,"#a1887f",undefined,.5])}for(let dx=-1.25;dx<1.25;dx+=.5)for(let dy=-.5;dy<.5;dy+=.5)a.push([hx+sw*.6+dx,hy-1.4+dy,0,dx>-1&&dx<.75?"#e0f2f1":"#90a4ae",undefined,.5])}}catch(e){}return a}}
