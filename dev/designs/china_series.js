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
 shishi(P){/* 獅子の像（高精細・0.125）：正面向き。四角い台座、胸を張って座る獅子、たてがみは丸いカールの列、大きな丸い目、太い眉、開いた口に歯と舌、首にリボンと鈴、右前足で鞠 */
  const st=.125,S="#b5b2aa",SL="#cfccc4",SD="#8f8c84",SDD="#6f6c65";
  const E=(cx,cy,cz,rx,ry,rz,c)=>{for(let x=-rx;x<=rx;x+=st)for(let y=-ry;y<=ry;y+=st)for(let z=-rz;z<=rz;z+=st){const q=(x/rx)**2+(y/ry)**2+(z/rz)**2;if(q<=1&&q>.55)P(cx+x,cy+y,cz+z,typeof c==="function"?c(x,y,z):c,st)}};
  for(let x=.5;x<5.5;x+=.25)for(let y=.5;y<5.5;y+=.25)for(let z=0;z<2.5;z+=.25){const e=x<.75||x>=5.25||y<.75||y>=5.25||z>=2.25;if(!e)continue;P(x,y,z,(z>=2.25||z<.25)?SDD:((y<.75&&Math.abs((x%1.25)-.6)<.25&&z>.75&&z<1.75)?SD:"#9a978f"),.25)}
  const shade=(x,y,z)=>z>.3?SL:(y<0?S:SD);
  E(3,3.7,3.3,1.9,1.4,1.1,shade);E(3,2.95,4.7,1.3,1.0,1.7,shade);
  for(const lx of[2.2,3.8]){E(lx,2.05,3.5,.42,.42,1.05,shade);E(lx,1.8,2.62,.55,.65,.3,SL);for(const d of[-.25,0,.25])E(lx+d,1.2,2.6,.12,.12,.12,SDD)}
  E(4.6,1.25,3.05,.62,.62,.62,(x,y,z)=>(Math.abs(x)<.08||Math.abs(z)<.08||Math.abs(x-z)<.08)?SD:SL);
  E(3,2.55,7.05,1.6,1.25,1.4,shade);
  E(3,1.5,6.55,1.05,.5,.55,shade);
  for(const ex of[2.35,3.65]){E(ex,1.35,7.5,.4,.25,.4,"#e9e6de");E(ex,1.15,7.5,.17,.12,.17,"#2f2d29");E(ex,1.4,8.05,.5,.25,.15,SD)}
  E(3,1.05,7.0,.42,.22,.3,SDD);
  for(let x=2.2;x<=3.8;x+=st)for(let z=6.05;z<=6.55;z+=st){const lip=z>6.45||z<6.15||x<2.32||x>3.68;const tooth=!lip&&z>6.3&&((x*8)|0)%3!==0;const tongue=!lip&&z<6.3&&Math.abs(x-3)<.45;P(x,1.0,z,lip?SD:(tooth?"#f4f2ec":(tongue?"#c9a3a0":"#3a3834")),st)}
  for(let a=0.15;a<3.0;a+=.36){for(const[rr,yy,rad]of[[1.62,2.75,.36],[2.0,3.15,.4],[1.25,3.5,.34]]){const x=3+Math.cos(a)*rr,z=7.0+Math.sin(a)*rr;E(x,yy,z,rad,rad,rad,(dx,dy,dz)=>dz>0?SL:SD);E(x,yy-rad*.6,z,rad*.45,.08,rad*.45,SDD)}}
  for(let a=3.3;a<6.2;a+=.5){const x=3+Math.cos(a)*1.75,z=6.9+Math.sin(a)*1.0;if(z<5.6)continue;E(x,2.9,z,.33,.33,.33,(dx,dy,dz)=>dz>0?SL:SD)}
  for(let a=0;a<6.28;a+=.08)P(3+Math.cos(a)*1.32,2.9+Math.sin(a)*1.02,5.75,a>4.2&&a<5.2?"#d32f2f":"#b71c1c",st);for(const d of[-.35,.35])for(let t=0;t<5;t++)P(3+d+d*t*.3,1.85,5.65-t*.15,"#d32f2f",st);
  E(3,1.75,5.35,.32,.28,.32,(x,y,z)=>z>.1?"#f2c94c":"#d4a017");P(2.95,1.45,5.3,"#5d4037",st);
  for(let t=0;t<10;t++)E(4.7+Math.sin(t*.5)*.25,4.7,3.0+t*.35,.26,.26,.26,shade);for(let a=0;a<6.28;a+=.7)E(4.95+Math.cos(a)*.42,4.75,6.6+Math.sin(a)*.42,.26,.26,.26,SL)},
 sensu(P){/* 扇子の壁飾り（高精細・0.125）：要（かなめ）から広がる細い骨、赤い地紙に金の霞と梅、外周に金のふち、両端に太い親骨、下に房 */
  const cx=3,cz=8.2,st=.125,N=18;
  for(let y=-2.5;y<8.5;y+=st)for(let z=8;z<14.4;z+=st){const dy=y+st/2-cx,dz=z+st/2-cz,r=Math.hypot(dy,dz),a=Math.atan2(dz,dy);if(a<.18||a>2.96||r>5.6)continue;
   const fa=(a-.18)/(2.78)*N,ribD=Math.abs(fa-Math.round(fa))*(r*2.78/N);const edgeStick=(a<.3||a>2.84);
   let c=null;if(r<1.9){if(ribD<.07||edgeStick)c="#3e2723"}else{const paper=r<5.35;if(!paper)c="#d4a017";else{c=(r>4.9||r<2.2)?"#d4a017":"#b3261e";const kasumi=Math.abs(r-3.5-Math.sin(a*5)*.35)<.22&&r<4.9&&r>2.2;if(kasumi)c="#e9b949";for(const[bx,bz,br]of[[1.4,3.4,.42],[-1.2,3.9,.36],[2.4,2.0,.3],[-2.6,2.3,.33],[.2,4.4,.3]]){const d=Math.hypot(dy-bx,dz-bz);if(d<br)c=d<br*.35?"#f2c94c":"#fff1e6"}
     if(ribD<.045&&r<4.9)c=c==="#b3261e"?"#9c2018":c}if(edgeStick)c="#3e2723"}
   if(c)P(.25,y,z,c,st)}
  P(.375,2.94,8.2,"#d4a017",.25);for(let z=5.4;z<8.1;z+=st)P(.375,2.94+Math.sin(z*3)*.03,z,z<6.1?"#f2c94c":"#c62828",st);for(const d of[-.25,-.125,0,.125,.25])for(let z=4.7;z<5.6;z+=st)P(.375,2.94+d,z,"#e9b949",st)},
 roundwin(P){/* 丸窓（壁アイテム・x=0が壁）：赤い木の丸枠に格子、向こうに竹 */for(let y=.25;y<6;y+=.25)for(let z=6;z<17;z+=.25){const r=Math.hypot(y+.125-3,z+.125-11.5);if(r>3)continue;let c=null;if(r>2.6)c="#8b1a1a";else{const lat=(Math.abs(((y+.125)%1.2)-.6)<.08)||(Math.abs(((z+.125)%1.2)-.6)<.08);c=lat?"#a0402f":(((y*2)|0)%3===0&&z<15?"#7cb342":"#e8f5e9")}P(.25,y,z,c,.25)}},
 gate(P){/* ボーナス：中華の門（牌楼）1×2マス。赤い柱2本、緑の瓦屋根、金の扁額 */for(const y of[.5,11])for(let z=0;z<14;z+=.5)for(let x=2.5;x<3.5;x+=.5)P(x,y,z,"#c62828");for(const y of[.5,11])boxV(P,2,y-.5,0,2,1.5,1,"#9e9e9e");
  for(let y=0;y<12;y+=.5){P(3,y,11,"#c62828");P(3,y,12.5,"#c62828")}for(let y=3.5;y<8.5;y+=.5)for(let z=11.5;z<12.5;z+=.5)P(2.5,y,z,y<4||y>=8?"#8d6e00":"#1a237e");for(let y=4.5;y<7.5;y+=.5)P(2.25,y,12,"#ffd54f",.5);
  for(let y=-1.5;y<13.5;y+=.5){const lift=Math.max(0,Math.abs(y-5.75)-5.5)*.6;for(let x=1+(0);x<5;x+=.5){const e=Math.abs(x-2.75);P(x,y,14+lift+(2-e)*.5,((y*2)|0)%2?"#2e7d32":"#1b5e20")}}
  for(let y=-1.5;y<13.5;y+=.5)P(2.75,y,15.75+Math.max(0,Math.abs(y-5.75)-5.5)*.6,"#ffd54f",.5)}
};
