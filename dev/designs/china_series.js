/* 中華シリーズ 見本。1マス=6、ボクセル0.5（細部0.25）。正面は-y側 */
function boxV(P,x0,y0,z0,w,d,h,c){for(let x=x0;x<x0+w;x+=.5)for(let y=y0;y<y0+d;y+=.5)for(let z=z0;z<z0+h;z+=.5)P(x,y,z,typeof c==="function"?c(x,y,z):c)}
function ellV(P,cx,cy,cz,rx,ry,rz,c){for(let x=-rx;x<=rx;x+=.5)for(let y=-ry;y<=ry;y+=.5)for(let z=-rz;z<=rz;z+=.5)if((x/rx)**2+(y/ry)**2+(z/rz)**2<=1)P(cx+x,cy+y,cz+z,typeof c==="function"?c(x,y,z):c)}
const CHINA={
 gong(P){/* 銅鑼：赤い木の枠に吊るした金色の円盤、ばち付き */const F="#8b1a1a";for(const x of[.5,5])for(let z=0;z<11;z+=.5)P(x,2.75,z,F);for(let x=0;x<6;x+=.5)P(x,2.75,11,F);for(let x=1;x<5;x+=.5)P(x,2.75,.5,F);
  for(let x=.5;x<5.5;x+=.25)for(let z=2;z<10;z+=.25){const d=Math.hypot(x+.125-3,z+.125-6);if(d>2.4)continue;P(x,2.5,z,d<.6?"#f6d365":(Math.abs(d-1.6)<.15||d>2.2?"#8d6e00":"#d4a017"),.25)}
  for(const x of[2.25,3.5])for(let z=8.5;z<11;z+=.5)P(x,2.75,z,"#5d4037",.25);for(let t=0;t<6;t++)P(4.6+t*.15,1.6,1.5+t*.4,"#6d4c41",.25);P(5.5,1.6,4,"#c62828",.5)},
 lazysusan(P){/* 中華料理屋の回転テーブル：赤いクロスの円卓に、ガラスのターンテーブルと料理 */for(let z=0;z<4;z+=.5)P(2.75,2.75,z,"#3e2723");for(let x=1.5;x<4.5;x+=.5)for(let y=1.5;y<4.5;y+=.5)P(x,y,0,"#3e2723");
  for(let x=-.5;x<6.5;x+=.5)for(let y=-.5;y<6.5;y+=.5){const d=Math.hypot(x+.25-3,y+.25-3);if(d<3.4){P(x,y,4,d>3?"#b71c1c":"#c62828");if(d>3)P(x,y,3.5,"#b71c1c")}}
  for(let x=.5;x<5.5;x+=.5)for(let y=.5;y<5.5;y+=.5){const d=Math.hypot(x+.25-3,y+.25-3);if(d<2.1)P(x,y,4.5,d>1.8?"#90a4ae":"#e1f5fe",.5)}
  const dish=(x,y,c)=>{for(let a=-.5;a<1;a+=.5)for(let b=-.5;b<1;b+=.5)if(Math.abs(a)+Math.abs(b)<1)P(x+a,y+b,5,"#fafafa",.5);P(x,y,5.5,c,.5)};dish(2.2,2.2,"#ff7043");dish(3.8,2.4,"#7cb342");dish(3,3.9,"#ffd54f");
  for(const[x,y]of[[.2,3],[5.8,3],[3,.2]])P(x-.25,y-.25,4.5,"#fafafa",.5)},
 screen(P){/* 格子の屏風：赤茶の木の4枚折り。各パネルに幾何学の格子と下に板 */const W="#a0402f",W2="#8a3426";const pan=[[0,1],[1.5,1.3],[3,1],[4.5,1.3]];
  pan.forEach(([x0,y0],k)=>{for(let x=x0;x<x0+1.5;x+=.25)for(let z=0;z<11;z+=.25){const lx=x+.125-x0,lz=z;let c=null;const fr=lx<.25||lx>1.25||lz<.5||lz>10.5;
   if(fr)c=W;else if(lz<3)c=(lz<.75||lz>2.75)?W:W2;else if(lz>9&&lz<9.75)c=(((lx*4)|0)%2)?W:null;else{const cx=lx-.75,cz=lz-6;const r=Math.hypot(cx*1.6,cz);if(Math.abs(r-1.2)<.13||Math.abs(cx)<.12&&Math.abs(cz)>1.2||Math.abs(cz)<.12&&Math.abs(cx)>.75||(Math.abs(Math.abs(cx)-.45)<.1&&Math.abs(cz)>1.6)||(Math.abs(Math.abs(cz)-2.4)<.1))c=W2}
   if(z>=10.75&&lx>.25&&lx<1.25)c="#7a2c20";if(c)P(x,y0+(k%2?-.0:0),z,c,.25)}})},
 dragon(P){/* 龍の置物：台の上で緑と金の龍がうねる */boxV(P,1,1,0,4,4,1,(x,y,z)=>"#5d4037");for(let x=1;x<5;x+=.5)P(x,1,1,"#d4af37");
  let pts=[];for(let t=0;t<=1;t+=.04){const x=1.5+t*3,y=3+Math.sin(t*9)*1.2,z=1.5+Math.sin(t*6.3)*1.5+t*4;pts.push([x,y,z])}
  pts.forEach(([x,y,z],i)=>{const r=i>20?.6:.5;ellV(P,x,y,z,r,r,r,(a,b,c)=>c>0&&i%3===0?"#d4af37":"#2e7d32")});const [hx,hy,hz]=pts[pts.length-1];
  ellV(P,hx+.5,hy,hz+.3,.9,.8,.7,"#388e3c");P(hx+1.2,hy-.4,hz+.6,"#ffeb3b",.25);P(hx+1.2,hy+.4,hz+.6,"#ffeb3b",.25);for(const s of[-.5,.5])for(let t=0;t<4;t++)P(hx+.3-t*.25,hy+s,hz+1+t*.3,"#d4af37",.25);for(let t=0;t<4;t++)P(hx+1.4+t*.3,hy,hz-.2+t*.1,"#ffeb3b",.25);
  ellV(P,hx+1.8,hy,hz-1.2,.5,.5,.5,"#ff7043")},
 panda(P){/* 座ったパンダのぬいぐるみ */const Wt="#fafafa",Bk="#212121";ellV(P,3,3,2.2,2,1.8,2,Wt);for(const[x,y]of[[1.6,1.4],[4.4,1.4]])ellV(P,x,y,.8,.8,.9,.7,Bk);for(const x of[1,5])ellV(P,x,2.7,3,.6,.7,1.1,Bk);
  ellV(P,3,3,5.2,1.6,1.4,1.4,Wt);for(const x of[1.7,4.3])ellV(P,x,3.2,6.4,.5,.4,.5,Bk);for(const x of[2.3,3.7])ellV(P,x,1.7,5.4,.4,.3,.5,Bk);P(2.25,1.4,5.5,Wt,.25);P(3.75,1.4,5.5,Wt,.25);P(2.875,1.6,4.8,Bk,.25);P(2.875,1.55,4.5,"#e57373",.25)},
 roundwin(P){/* 丸窓（壁アイテム・x=0が壁）：赤い木の丸枠に格子、向こうに竹 */for(let y=.25;y<6;y+=.25)for(let z=6;z<17;z+=.25){const r=Math.hypot(y+.125-3,z+.125-11.5);if(r>3)continue;let c=null;if(r>2.6)c="#8b1a1a";else{const lat=(Math.abs(((y+.125)%1.2)-.6)<.08)||(Math.abs(((z+.125)%1.2)-.6)<.08);c=lat?"#a0402f":(((y*2)|0)%3===0&&z<15?"#7cb342":"#e8f5e9")}P(.25,y,z,c,.25)}},
 gate(P){/* ボーナス：中華の門（牌楼）1×2マス。赤い柱2本、緑の瓦屋根、金の扁額 */for(const y of[.5,11])for(let z=0;z<14;z+=.5)for(let x=2.5;x<3.5;x+=.5)P(x,y,z,"#c62828");for(const y of[.5,11])boxV(P,2,y-.5,0,2,1.5,1,"#9e9e9e");
  for(let y=0;y<12;y+=.5){P(3,y,11,"#c62828");P(3,y,12.5,"#c62828")}for(let y=3.5;y<8.5;y+=.5)for(let z=11.5;z<12.5;z+=.5)P(2.5,y,z,y<4||y>=8?"#8d6e00":"#1a237e");for(let y=4.5;y<7.5;y+=.5)P(2.25,y,12,"#ffd54f",.5);
  for(let y=-1.5;y<13.5;y+=.5){const lift=Math.max(0,Math.abs(y-5.75)-5.5)*.6;for(let x=1+(0);x<5;x+=.5){const e=Math.abs(x-2.75);P(x,y,14+lift+(2-e)*.5,((y*2)|0)%2?"#2e7d32":"#1b5e20")}}
  for(let y=-1.5;y<13.5;y+=.5)P(2.75,y,15.75+Math.max(0,Math.abs(y-5.75)-5.5)*.6,"#ffd54f",.5)}
};
