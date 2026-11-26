
/* ===== 掃除：業者の値段は広さで決まる（最初¥3,000 → 最大まで増築すると¥200,000） ===== */
function clnFee(){const n=FLT.length,n0=48,nM=GXM*GYM;const r=Math.max(0,Math.min(1,(n-n0)/Math.max(1,nM-n0)));return Math.round((3000+r*12000)/1000)*1000}
{const _hu9=hud;hud=function(){const r=_hu9.apply(this,arguments);try{const b=document.querySelector("[data-clpro]");if(b){const t="🧹 業者に掃除を頼む "+yen(clnFee());if(b.textContent!==t)b.textContent=t}}catch(e){}return r}}
/* なぞった所に家具があれば、その家具が置いてあるマスを掃除する */
function cleanFurnKey(clx,cly){const r=cv.getBoundingClientRect(),X=(clx-r.left)*W/r.width,Y=(cly-r.top)*CH/r.height,k=R.cv||camVec();let best=null,bd=-1e9;
 (G.furn||[]).forEach(F=>{furnFoot(F).forEach(q=>{const[tx,ty]=q.split(",").map(Number),seat=F.k==="b"||(F.o?tx===F.tx:ty===F.ty),h=F.k==="b"?5:seat?6.5:1.2,x0=tx*6,y0=ty*6;if(mvIn(mvBox(x0+.3,x0+5.7,y0+.3,y0+5.7,h,k),X,Y)){const d=(x0+3)*k.cx+(y0+3)*k.cy+h/2*k.cz;if(d>bd){bd=d;best=q}}})});
 (G.decor||[]).forEach(d0=>{const x0=d0.tx*6,y0=d0.ty*6;if(mvIn(mvBox(x0+.5,x0+5.5,y0+.5,y0+5.5,8,k),X,Y)){const d=(x0+3)*k.cx+(y0+3)*k.cy+4*k.cz;if(d>bd){bd=d;best=d0.tx+","+d0.ty}}});return best}
/* 掃除中は、汚れが残っているマスの床をほんのり色づける */
{const _db5=drawBG;drawBG=function(k){const r=_db5.apply(this,arguments);try{if(R.cleaning){const D=G.dirt||{};cx.save();FLT.forEach(([tx,ty])=>{const v=D[tx+","+ty]||0;if(v<=0)return;const X=tx*6,Y=ty*6,P4=[P3(X+.4,Y+.4,.05,k),P3(X+5.6,Y+.4,.05,k),P3(X+5.6,Y+5.6,.05,k),P3(X+.4,Y+5.6,.05,k)];cx.globalAlpha=.18+Math.min(.32,v/220);cx.fillStyle="#ffb300";cx.beginPath();P4.forEach((p,i)=>i?cx.lineTo(p[0],p[1]):cx.moveTo(p[0],p[1]));cx.closePath();cx.fill()});cx.restore()}}catch(e){}return r}}
/* 店長がモップを持って掃除する（大きめ） */
{const _dy2=dyn;dyn=function(){const a=_dy2.apply(this,arguments);try{if(R.cleaning&&OW.x>-100){const k=R.cv||camVec(),D=[[0,1],[1,0],[0,-1],[-1,0]];let bi=0,bv=-1e9;D.forEach((d,i)=>{const v=d[0]*k.cx+d[1]*k.cy;if(v>bv){bv=v;bi=i}});OW.dir=bi;const fx=D[bi][0],fy=D[bi][1],t=performance.now()/1000,sw=Math.sin(t*12)*2,hx=OW.x+fx*2.2+fy*1.2,hy=OW.y+fy*2.2-fx*1.2;
 for(let i=0;i<20;i++){const f=i/19;a.push([hx+(fx*2.2+fy*sw*.35)*(1-f),hy+(fy*2.2-fx*sw*.35)*(1-f),1+f*10,"#8d6e63",undefined,.75])}
 const mx=hx+fx*2.6+fy*sw*.35,my=hy+fy*2.6-fx*sw*.35;for(let dx=-2.5;dx<2.5;dx+=1)a.push([mx+dx,my,1,"#9e9e9e",undefined,1]);
 for(let dx=-3;dx<3;dx+=.75)for(let dy=-1;dy<1.5;dy+=.75)a.push([mx+dx,my+dy,0,((dx*4+dy*4)|0)%2?"#e0f7fa":"#b2ebf2",undefined,.75])}}catch(e){}return a}}
