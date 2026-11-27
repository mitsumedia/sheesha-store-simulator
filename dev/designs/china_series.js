/* 中華シリーズ 見本。1マス=6、ボクセル0.5（細部0.25）。正面は-y側 */
function boxV(P,x0,y0,z0,w,d,h,c){for(let x=x0;x<x0+w;x+=.5)for(let y=y0;y<y0+d;y+=.5)for(let z=z0;z<z0+h;z+=.5)P(x,y,z,typeof c==="function"?c(x,y,z):c)}
function ellV(P,cx,cy,cz,rx,ry,rz,c,st){st=st||.5;for(let x=-rx;x<=rx;x+=st)for(let y=-ry;y<=ry;y+=st)for(let z=-rz;z<=rz;z+=st)if((x/rx)**2+(y/ry)**2+(z/rz)**2<=1)P(cx+x,cy+y,cz+z,typeof c==="function"?c(x,y,z):c,st)}
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
 dragon(P0){const P=(x,y,z,c,st)=>P0(y,6-x,z,c,st);/* 龍の置物（高精細）：木の台座から、うろこのある龍がS字に昇り、頭に角とたてがみ、ひげ、前足で金の玉をつかむ */
  for(let x=.5;x<5.5;x+=.5)for(let y=.5;y<5.5;y+=.5){P(x,y,0,"#4e342e");P(x,y,.5,(x===.5||x===5||y===.5||y===5)?"#d4af37":"#5d4037")}
  const N=60,pts=[];for(let i=0;i<=N;i++){const t=i/N;pts.push([3+Math.sin(t*7.5)*1.6*(1-t*.3),3+Math.cos(t*7.5)*1.3*(1-t*.3),1.2+t*8])}
  pts.forEach(([x,y,z],i)=>{const t=i/N,r=.35+Math.sin(t*3.1)*.35;for(let a=-r;a<=r;a+=.25)for(let b=-r;b<=r;b+=.25)for(let c=-r;c<=r;c+=.25)if(a*a+b*b+c*c<=r*r){const top=c>r*.3;const sc=((i+((a+b)*4|0))%2===0);P(x+a,y+b,z+c,top?(i%4<2?"#2e7d32":"#1b5e20"):(sc?"#81c784":"#a5d6a7"),.25)}
   if(i%6===3)for(let k=0;k<3;k++)P(x,y,z+r+.25+k*.25,"#ffb300",.25)});
  const[hx,hy,hz]=pts[N];
  for(let a=-.75;a<=1.5;a+=.25)for(let b=-.75;b<=.75;b+=.25)for(let c=-.5;c<=.75;c+=.25)if((a/1.5)**2+(b/.8)**2+(c/.7)**2<=1)P(hx+a,hy+b,hz+c,a>.8?"#43a047":"#388e3c",.25);
  for(let a=1.25;a<2.2;a+=.25)for(let b=-.5;b<=.5;b+=.25)P(hx+a,hy+b,hz-.25,"#66bb6a",.25);P(hx+2.1,hy-.25,hz,"#1b5e20",.25);P(hx+2.1,hy+.25,hz,"#1b5e20",.25);
  for(let a=1.25;a<2.2;a+=.25)for(let b=-.25;b<=.25;b+=.25)P(hx+a,hy+b,hz-.75,"#c62828",.25);
  for(const sy of[-.5,.5]){P(hx+.9,hy+sy,hz+.5,"#ffeb3b",.25);P(hx+1.05,hy+sy,hz+.55,"#111",.25);for(let t=0;t<5;t++)P(hx+.2-t*.25,hy+sy*(1+t*.15),hz+.8+t*.3,"#d4af37",.25);for(let t=0;t<7;t++)P(hx+2-t*.05+t*.2,hy+sy*(1+t*.35),hz-.5-t*.18,"#ffd54f",.25)}
  for(let t=0;t<8;t++)for(let b=-.75;b<=.75;b+=.25)P(hx-.4-t*.2,hy+b*(1+t*.1),hz+.4-t*.05,t%2?"#ff7043":"#ff8a65",.25);
  const claw=(x,y,z)=>{for(let t=0;t<4;t++)P(x+t*.2,y,z-t*.2,"#388e3c",.25);for(const d of[-.25,0,.25])P(x+.8,y+d,z-1,"#ffd54f",.25)};claw(pts[45][0],pts[45][1]-.5,pts[45][2]);claw(pts[20][0],pts[20][1]+.5,pts[20][2]);
  ellV(P,hx+2.6,hy,hz-1.8,.6,.6,.6,(a,b,c)=>c>.2?"#fff59d":"#ffca28",.25)},
 panda(P){/* パンダのぬいぐるみ（高精細）：まるいフォルム、白黒の模様、笹を抱えて座る */const Wt="#f7f7f5",Bk="#1c1c1c",st=.25;
  ellV(P,3,3.1,2.3,2.1,1.9,2.1,(x,y,z)=>Math.abs(z-.2)<.7&&Math.abs(x)>1.2?Bk:Wt,st);
  for(const sx of[-1,1])ellV(P,3+sx*1.3,1.6,.9,.85,1,.75,Bk,st),ellV(P,3+sx*1.3,.85,.9,.55,.2,.55,"#f8bbd0",st);
  for(const sx of[-1,1])ellV(P,3+sx*1.6,2.2,3.1,.7,.8,1.2,Bk,st);
  ellV(P,3,3.1,5.3,1.7,1.5,1.45,Wt,st);for(const sx of[-1,1])ellV(P,3+sx*1.25,3.3,6.55,.55,.4,.55,Bk,st);
  for(const sx of[-1,1])ellV(P,3+sx*.65,1.75,5.5,.45,.25,.55,Bk,st);for(const sx of[-1,1])P(3+sx*.6-.125,1.5,5.55,"#fafafa",.25),P(3+sx*.6-.125,1.45,5.55,"#111",.25);
  ellV(P,3,1.75,4.85,.6,.35,.4,"#fafafa",st);P(2.875,1.4,5.05,Bk,.25);P(2.75,1.45,4.7,"#c62828",.25);P(3,1.45,4.7,"#c62828",.25);
  for(let z=1;z<7;z+=.25)P(4.3,1.6+(z-1)*.05,z,z%1.5<.25?"#558b2f":"#7cb342",.25);for(const[d,z]of[[.4,6.2],[-.4,5.6],[.5,4.8]])for(let t=0;t<4;t++)P(4.3+d*t*.4,1.9,z+t*.1,"#8bc34a",.25)},
 kanpo(P){/* 漢方の引き出し棚：小さな引き出しがびっしり、上に壺 */boxV(P,.5,2,0,5,3,10,"#6d4c41");for(let x=.75;x<5.5;x+=1.1)for(let z=.75;z<9.5;z+=1.2){for(let a=0;a<1;a+=.25)for(let b=0;b<1;b+=.25)P(x+a,1.75,z+b,(a===0||b===0)?"#4e342e":"#a1887f",.25);P(x+.375,1.5,z+.375,"#d4af37",.25);P(x+.25,1.7,z+.6,"#fafafa",.25)}
  for(let x=.5;x<5.5;x+=.5)P(x,2,10,"#4e342e");ellV(P,1.6,3.3,11,.7,.7,.8,"#c62828");ellV(P,4,3.3,10.9,.6,.6,.7,"#1565c0")},
 shishi(P){/* 獅子の像（高精細）：彫刻の台座に正面向きで座る石の獅子。くるくるのたてがみ、大きな目、開いた口、首に赤いリボンと鈴、前足で鞠を押さえる */
  const S="#a7a7a2",S2="#c4c4bf",S3="#86867f",S4="#6d6d66",st=.25;
  const E=(cx,cy,cz,rx,ry,rz,c)=>{for(let x=-rx;x<=rx;x+=st)for(let y=-ry;y<=ry;y+=st)for(let z=-rz;z<=rz;z+=st)if((x/rx)**2+(y/ry)**2+(z/rz)**2<=1)P(cx+x,cy+y,cz+z,typeof c==="function"?c(x,y,z):c,st)};
  for(let x=.5;x<5.5;x+=st)for(let y=.5;y<5.5;y+=st)for(let z=0;z<2.5;z+=st){const e=x<.75||x>=5.25||y<.75||y>=5.25;if(!e&&z<2.25)continue;const trim=z>=2||z<.25;const carve=!trim&&y<.75&&((Math.abs(((x*2)%1.5)-.75)<.2)&&z>.75&&z<1.75);P(x,y,z,trim?S4:(carve?S4:S3),st)}
  E(3,3.6,3.4,1.8,1.5,1.3,(x,y,z)=>z>.6?S2:S);E(3,2.9,4.6,1.35,1,1.6,(x,y,z)=>y<-.6?S2:S);
  for(const lx of[2.15,3.85])for(let z=2.5;z<4.6;z+=st)E(lx,2.1,z,.45,.45,.13,S);for(const lx of[2.15,3.85])E(lx,1.85,2.65,.55,.6,.3,S2);for(const lx of[2.15,3.85])for(const d of[-.25,0,.25])P(lx+d,1.25,2.6,S4,st);
  E(4.4,1.3,2.9,.6,.6,.6,(x,y,z)=>(Math.abs(x)<.1||Math.abs(z)<.1)?S4:S2);
  E(3,2.6,7.1,1.55,1.25,1.35,S);
  for(let a=0;a<6.28;a+=.42)for(const rr of[1.55,1.95]){const x=3+Math.cos(a)*rr,z=7.1+Math.sin(a)*rr*.95;if(z<5.9)continue;E(x,2.9+(rr>1.6?.4:0),z,.38,.38,.38,(dx,dy,dz)=>dz>0?S2:S3)}
  for(let x=1.6;x<=4.4;x+=.7)E(x,3.5,8.6,.4,.4,.4,S2);
  for(const ex of[2.35,3.65]){E(ex,1.45,7.45,.38,.2,.3,"#e8e8e2");P(ex-.125,1.25,7.4,"#3a3a36",st);E(ex,1.55,7.95,.45,.2,.12,S4)}
  E(3,1.35,6.95,.6,.3,.3,S4);P(2.75,1.05,6.95,"#3a3a36",st);P(3.25,1.05,6.95,"#3a3a36",st);
  for(let x=2.25;x<3.8;x+=st)for(let z=6.05;z<6.6;z+=st)P(x,1.3,z,(z>=6.3&&((x*4)|0)%2===0)?"#efefe9":"#4a4a44",st);for(let x=2.25;x<3.8;x+=st)P(x,1.3,5.9,S,st);
  for(let a=0;a<6.28;a+=.2)P(3+Math.cos(a)*1.3,2.85+Math.sin(a)*.95,5.85,"#c62828",st);E(3,1.75,5.5,.35,.3,.35,"#d4af37");P(2.875,1.45,5.4,"#6d4c41",st);
  for(let t=0;t<8;t++)E(4.6+Math.sin(t*.6)*.2,4.6,3+t*.45,.3,.3,.3,S3);for(let a=0;a<6.28;a+=.6)E(4.8+Math.cos(a)*.45,4.7,6.7+Math.sin(a)*.45,.28,.28,.28,S2)},
 sensu(P){/* 扇子の壁飾り（壁アイテム・x=0が壁）：大きく開いた赤い扇子に金の模様、黒い骨、下に金のふさ */const cx=3,cz=8.5;
  for(let y=-.5;y<6.5;y+=.25)for(let z=8;z<14.5;z+=.25){const dy=y+.125-cx,dz=z+.125-cz,r=Math.hypot(dy,dz),a=Math.atan2(dz,dy);if(a<.12||a>3.02||r>5.4||r<1.6)continue;
   const rib=Math.abs(((a/3.14)*14)%1-.5)>.42;let c=r>5.1?"#d4af37":(rib?"#2b1b17":"#c62828");if(!rib&&r<5.1){const wave=Math.abs(r-3.4-Math.sin(a*8)*.3)<.18;const blossom=Math.hypot(dy-1.2,dz-3)<.45||Math.hypot(dy+1.6,dz-2.6)<.35;if(wave)c="#ffd54f";if(blossom)c="#fff3e0"}P(.25,y,z,c,.25)}
  for(let z=8;z<9.25;z+=.25)P(.25,2.875,z,"#2b1b17",.25);P(.5,2.875,8.5,"#d4af37",.25);for(let z=5.5;z<8;z+=.25)P(.5,2.875,z,z<6.25?"#ffd54f":"#c62828",.25);for(const d of[-.25,.25])for(let z=5;z<6;z+=.25)P(.5,2.875+d,z,"#ffd54f",.25)},
 roundwin(P){/* 丸窓（壁アイテム・x=0が壁）：赤い木の丸枠に格子、向こうに竹 */for(let y=.25;y<6;y+=.25)for(let z=6;z<17;z+=.25){const r=Math.hypot(y+.125-3,z+.125-11.5);if(r>3)continue;let c=null;if(r>2.6)c="#8b1a1a";else{const lat=(Math.abs(((y+.125)%1.2)-.6)<.08)||(Math.abs(((z+.125)%1.2)-.6)<.08);c=lat?"#a0402f":(((y*2)|0)%3===0&&z<15?"#7cb342":"#e8f5e9")}P(.25,y,z,c,.25)}},
 gate(P){/* ボーナス：中華の門（牌楼）1×2マス。赤い柱2本、緑の瓦屋根、金の扁額 */for(const y of[.5,11])for(let z=0;z<14;z+=.5)for(let x=2.5;x<3.5;x+=.5)P(x,y,z,"#c62828");for(const y of[.5,11])boxV(P,2,y-.5,0,2,1.5,1,"#9e9e9e");
  for(let y=0;y<12;y+=.5){P(3,y,11,"#c62828");P(3,y,12.5,"#c62828")}for(let y=3.5;y<8.5;y+=.5)for(let z=11.5;z<12.5;z+=.5)P(2.5,y,z,y<4||y>=8?"#8d6e00":"#1a237e");for(let y=4.5;y<7.5;y+=.5)P(2.25,y,12,"#ffd54f",.5);
  for(let y=-1.5;y<13.5;y+=.5){const lift=Math.max(0,Math.abs(y-5.75)-5.5)*.6;for(let x=1+(0);x<5;x+=.5){const e=Math.abs(x-2.75);P(x,y,14+lift+(2-e)*.5,((y*2)|0)%2?"#2e7d32":"#1b5e20")}}
  for(let y=-1.5;y<13.5;y+=.5)P(2.75,y,15.75+Math.max(0,Math.abs(y-5.75)-5.5)*.6,"#ffd54f",.5)}
};
