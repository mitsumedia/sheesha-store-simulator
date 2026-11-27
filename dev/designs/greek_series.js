/* ギリシャシリーズ 候補＋ボーナス 見本。正面は-y側。壁アイテムはx=0が壁 */
function ellV(P,cx,cy,cz,rx,ry,rz,c,st){st=st||.5;for(let x=-rx;x<=rx;x+=st)for(let y=-ry;y<=ry;y+=st)for(let z=-rz;z<=rz;z+=st)if((x/rx)**2+(y/ry)**2+(z/rz)**2<=1)P(cx+x,cy+y,cz+z,typeof c==="function"?c(x,y,z):c,st)}
function box(P,x0,y0,z0,x1,y1,z1,c,st){st=st||.5;for(let x=x0;x<x1;x+=st)for(let y=y0;y<y1;y+=st)for(let z=z0;z<z1;z+=st)P(x,y,z,typeof c==="function"?c(x,y,z):c,st)}
function cyl(P,cx,cy,z0,z1,r,c,st){st=st||.5;for(let x=-r;x<=r;x+=st)for(let y=-r;y<=r;y+=st)if(x*x+y*y<=r*r)for(let z=z0;z<z1;z+=st)P(cx+x,cy+y,z,typeof c==="function"?c(x,y,z):c,st)}
const MB="#f2f2ee",MS="#d9dbd6",GD="#f4b400",BZ="#b8862b";
function ped(P,h,w){w=w||1.6;box(P,3-w-.4,3-w-.4,0,3+w+.4,3+w+.4,.5,MS);box(P,3-w,3-w,.5,3+w,3+w,h-.5,(x,y,z)=>((x*4|0)%3?MB:"#e6e7e2"));box(P,3-w-.4,3-w-.4,h-.5,3+w+.4,3+w+.4,h,MS)}
const GREEK={
 bust(P){ped(P,5);ellV(P,3,3,6.4,1.6,.8,.8,MB,.25);cyl(P,3,3,6.6,7.6,.45,MB,.25);ellV(P,3,3,8.5,.85,.85,1,MB,.25);
  for(let a=0;a<6.28;a+=.5)P(3+Math.cos(a)*.8,3+Math.sin(a)*.8,9.2+Math.sin(a*3)*.15,"#dcdcd6",.25);P(3,2.1,8.4,MS,.25);P(2.7,2.2,8.75,"#9e9e9e",.125);P(3.3,2.2,8.75,"#9e9e9e",.125);for(let x=2.4;x<3.7;x+=.25)P(x,2.3,7.8-Math.abs(x-3)*.2,"#dcdcd6",.25)},
 amphora(P){const prof=z=>z<.5?.9:z<1.5?.6:z<5?.6+Math.sin((z-1.5)/3.5*Math.PI)*1.5:z<6.5?.5:.8;
  for(let z=0;z<7;z+=.25){const r=prof(z);for(let a=0;a<6.28;a+=.12){const x=3+Math.cos(a)*r,y=3+Math.sin(a)*r;let c="#c8642a";if(z>=3&&z<4.5){c="#1b1b1b";const q=((a*6|0)+(z*4|0))%4;if(z>=3.5&&z<4&&q<2)c="#c8642a"}if(z<.5||(z>=5.5&&z<6))c="#1b1b1b";P(x,y,z,c,.25)}}
  for(const s of[-1,1])for(let t=0;t<9;t++){const ang=t/8*Math.PI;P(3+s*(1+Math.sin(ang)*.8),3,6.2-t*.25,"#1b1b1b",.25)}},
 lyre(P){box(P,1.5,2.5,0,4.5,3.5,1.5,"#8d5a2b");for(const s of[-1,1])for(let t=0;t<30;t++){const z=1.5+t*.25,x=3+s*(1.1+Math.sin(t/29*Math.PI)*.9-(t>24?(t-24)*.08:0));P(x,3,z,GD,.25);P(x,3.25,z,GD,.25)}
  box(P,1.6,2.9,8.6,4.5,3.4,9,GD,.25);for(let x=2.3;x<3.8;x+=.375)for(let z=1.5;z<8.6;z+=.25)P(x,2.9,z,"#fffde7",.125);P(2.6,2.6,.7,"#5d3a1a",.5);P(3.4,2.6,.7,"#5d3a1a",.5)},
 disco(P){ped(P,2,2);const S=MB,T="#e2e3de";const L=(a,b,r,c)=>{const n=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/.2);for(let i=0;i<=n;i++){const x=a[0]+(b[0]-a[0])*i/n,z=a[1]+(b[1]-a[1])*i/n;for(let dx=-r;dx<=r;dx+=.25)for(let dz=-r;dz<=r;dz+=.25)if(dx*dx+dz*dz<=r*r)for(let y=2.5;y<3.6;y+=.25)P(x+dx,y,z+dz,c,.25)}};
  /* 円盤投げ：横から見た形を正面に向けた像 */L([1.7,2.2],[1.6,3.6],.35,S);L([1.6,3.6],[2.8,5],.4,S);L([4.4,2.2],[4,3.3],.3,S);L([4,3.3],[3.2,5],.38,T);L([3,5],[2.3,7.4],.6,S);ellV(P,1.9,3,8.3,.55,.55,.6,S,.25);
  L([2.5,7.3],[3.8,8.2],.25,S);L([3.8,8.2],[5,8.9],.25,S);for(let a=0;a<6.28;a+=.15)for(let r=0;r<.8;r+=.25)P(5.3+Math.cos(a)*r,2.75,9.2+Math.sin(a)*r,BZ,.25);L([2.1,7.2],[1.4,6],.25,S);L([1.4,6],[1.7,4.2],.22,S)},
 pegasus(P){ped(P,2,2);const W="#fafafa",V="#ececec";ellV(P,3,3.2,4.6,1.1,2,1.1,(x,y,z)=>x>.4?V:W);for(const[x,y,f]of[[2.5,1.8,1],[3.5,1.8,0],[2.5,4.6,0],[3.5,4.6,0]])for(let z=2;z<4.2;z+=.5)P(x,y-(f?(4.2-z)*.5:0),f&&z<3?z+.8:z,W);
  for(let t=0;t<6;t++)box(P,2.6,1.5-t*.25,5.2+t*.5,3.5,2.2-t*.25,5.7+t*.5,W);/* 首 */ellV(P,3,.4,8.4,.5,.9,.55,W);P(2.7,-.2,8.6,"#757575",.25);P(3.3,-.2,8.6,"#757575",.25);for(let t=0;t<5;t++)P(3,1.6-t*.25,6.2+t*.55,"#cfd8dc");/* たてがみ */
  for(const s2 of[-1,1])for(let u=0;u<7;u++)for(let v=0;v<6-u*.5;v++)P(3+s2*(1.3+u*.45),2.3+v*.45+u*.15,5.4+u*.6+v*.15,u>4||v>3?"#e3f2fd":W);/* 翼 */for(let t=0;t<5;t++)P(3,5.3+t*.3,4.6-t*.45,"#cfd8dc")},
 laurel(P){ped(P,5,1.2);box(P,2,2,5,4,4,5.5,"#b71c1c");for(let a=0;a<6.28;a+=.18){if(Math.abs(a-4.71)<.35)continue;const x=3+Math.cos(a)*1.1,y=3+Math.sin(a)*1.1;P(x,y,5.9,"#7cb342",.25);P(x+Math.cos(a+.8)*.25,y+Math.sin(a+.8)*.25,6.1,"#558b2f",.25)}},
 torch(P){for(const a of[0,2.09,4.19])for(let z=0;z<5;z+=.25)P(3+Math.cos(a)*(1.4-z*.12),3+Math.sin(a)*(1.4-z*.12),z,BZ,.25);
  for(let z=5;z<6.5;z+=.25){const r=.9+(z-5)*.6;for(let a=0;a<6.28;a+=.2)P(3+Math.cos(a)*r,3+Math.sin(a)*r,z,"#8d6e2b",.25)}ellV(P,3,3,7.6,1,1,1.6,(x,y,z)=>z>.6?"#ffeb3b":Math.abs(x)+Math.abs(y)<.8?"#fff59d":"#ff6d00",.25);P(3.2,3,9.4,"#ffca28",.25)},
 medusa(P){for(let y=0;y<6;y+=.25)for(let z=8;z<14;z+=.25){const d=Math.hypot(y+.125-3,z+.125-11);if(d>2.9)continue;let c=d>2.5?BZ:"#d4a54a";P(.25,y,z,c,.25)}
  for(let y=1.6;y<4.4;y+=.25)for(let z=9.5;z<12.4;z+=.25)if(Math.hypot((y-3)/1.3,(z-10.9)/1.4)<1)P(.5,y,z,"#9ccc65",.25);for(let a=0;a<6.28;a+=.4){for(let t=0;t<4;t++)P(.75,3+Math.cos(a)*(1.5+t*.25)+Math.sin(t*1.5)*.15,10.9+Math.sin(a)*(1.6+t*.25),t===3?"#1b5e20":"#388e3c",.25)}
  P(.75,2.5,11.2,"#d50000",.25);P(.75,3.4,11.2,"#d50000",.25);for(let y=2.6;y<3.5;y+=.25)P(.75,y,10.2,"#33691e",.25)},
 santowin(P){for(let y=.5;y<5.5;y+=.25)for(let z=8;z<14.5;z+=.25){const iy=y+.125-3,arch=z>12?Math.hypot(iy,z-12)<1.9:Math.abs(iy)<1.9;const inner=z>8.6&&arch;P(.25,y,z,inner?"#1e5fb4":"#fafafa",.25)}
  for(let z=8.6;z<13.9;z+=.25)P(.5,3,z,"#fafafa",.25);for(let y=1.2;y<4.9;y+=.25)P(.5,y,11,"#fafafa",.25);box(P,.25,1,7,1.5,5,8,"#fafafa",.25);for(let k=0;k<14;k++)P(1.2+(k%3)*.25,1.2+k*.27,8+(k%4)*.3,["#e91e63","#d81b60","#4caf50"][k%3],.25)},
 rug(P){for(let x=0;x<6;x+=.25)for(let y=0;y<6;y+=.25){const ex=Math.min(x,5.75-x),ey=Math.min(y,5.75-y),e=Math.min(ex,ey);let c="#f5f5f5";if(e<.5)c="#1565c0";else if(e<1.5){const u=((ex<ey?y:x)*4|0)%8,v=((e-.5)*4|0);c=(v===0||v===3||(u===0)||(v===1&&u<5&&u>0&&u!==4)||(v===2&&(u===4||u===2)))?"#1565c0":"#f5f5f5";if(v===2&&u===3)c="#1565c0"}else if(Math.hypot(x-2.9,y-2.9)<.9)c="#1565c0";P(x,y,0,c,.25)}},
 grape(P){for(const[x,y]of[[.8,1],[5.2,1]])box(P,x-.25,y-.25,0,x+.25,y+.25,9,"#8d6e63",.5);for(let x=.5;x<5.5;x+=.5){P(x,1,9,"#6d4c41");P(x,3,9,"#6d4c41");P(x,5,9,"#6d4c41")}for(let y=1;y<5.5;y+=.5){P(.8,y,9.25,"#6d4c41");P(5.2,y,9.25,"#6d4c41")}
  for(let x=.5;x<5.5;x+=.5)for(let y=1;y<5.5;y+=.5)if(((x*7+y*5)*2|0)%3)P(x,y,9.5,((x+y)*2|0)%2?"#558b2f":"#7cb342");for(const[x,y]of[[1.8,1.5],[3.6,2.2],[2.6,3.6],[4.4,4]])for(let t=0;t<5;t++)for(let k=0;k<4-t*.7;k++)P(x+(k-1.5)*.25,y,8.6-t*.35,t%2?"#6a1b9a":"#8e24aa",.25)},
 scroll(P){for(let z=0;z<9;z+=3)box(P,1,3.5,z,5,5,z+.5,"#a1887f");box(P,1,4.5,0,5,5,9,"#8d6e63");box(P,1,3.5,0,1.5,5,9,"#8d6e63");box(P,4.5,3.5,0,5,5,9,"#8d6e63");
  for(let k=0;k<5;k++){cyl(P,0,0,0,0,0,"#fff");for(let x=1.6;x<4.4;x+=.25)P(x,3.7+((k%2)*.3),.6+k*.35,"#f3e5ab",.25)}for(let k=0;k<3;k++)box(P,1.7+k*.9,3.8,3.5,2.4+k*.9,4.3,5.5,k%2?"#9e9e9e":"#bdbdbd",.25);for(let k=0;k<4;k++){for(let x=1.6;x<3;x+=.25)P(x,3.7,6.6+k*.4,"#f3e5ab",.25);P(1.6,3.6,6.6+k*.4,"#b71c1c",.25)}box(P,3.3,3.7,6.5,4.3,4.3,7.5,"#c8642a",.25)},
 parthenon(P){/* ボーナスA：パルテノン神殿の模型（2×2） */box(P,.5,.5,0,11.5,11.5,.5,MS);box(P,1,1,.5,11,11,1,MB);for(let k=0;k<6;k++)for(const y of[1.6,10.4])cyl(P,1.6+k*1.76,y,1,6,.45,MB,.25);for(let k=1;k<5;k++)for(const x of[1.6,10.4])cyl(P,x,1.6+k*1.76,1,6,.45,MB,.25);
  box(P,1,1,6,11,11,6.75,MS,.25);for(let z=6.75;z<9;z+=.25){const w=(9-z)/2.25*5;for(let x=6-w;x<6+w;x+=.25)for(let y=1;y<11;y+=.25)P(x,y,z,(y<1.25||y>=10.75)?"#cfd1cc":((z*4|0)%2?MB:"#e4e5e0"),.25)}},
 zeus(P){/* ボーナスB：ゼウスの大理石像（1マス・高さ3マス） */ped(P,3,2);const S=MB;for(let z=3;z<8;z+=.25){const w=1.6-(z-3)*.08;box(P,3-w,2.3,z,3+w,3.9,z+.25,(x)=>((x*4|0)%3?"#e8e8e2":S),.25)}/* ローブ */ellV(P,3,3.1,10.3,1.7,1,2.4,(x,y,z)=>x+z*.3>.4?"#e3e3dc":S,.25);
  cyl(P,3,3.1,12.6,13.3,.35,S,.25);ellV(P,3,3.1,14.2,.8,.8,.95,S,.25);ellV(P,3,2.5,13.4,.6,.35,.6,"#dcdcd6",.25);for(let a=0;a<6.28;a+=.45)P(3+Math.cos(a)*.75,3.1+Math.sin(a)*.75,14.9,"#dcdcd6",.25);
  for(let t=0;t<8;t++)P(1.6-t*.05,3.1,12.3+t*.4,S,.25);for(let t=0;t<9;t++)P(1.35+(t%3===1?.35:t%3===2?-.1:0),2.9,15.6+t*.3,GD,.25);for(let t=0;t<8;t++)P(4.4,3.1,12-t*.4,S,.25)},
 santorini(P){/* ボーナスC：サントリーニの青いドームの家（2×2） */box(P,1,1,0,11,11,.5,"#e0e0e0");box(P,2,3,.5,10,10,7,"#fafafa");box(P,4.5,2.5,0,6.5,3,4,"#1e5fb4",.25);for(let k=0;k<5;k++)box(P,7,2.5-.0,0,10.5,3-0,k*.0,"#fff");
  for(let k=0;k<6;k++)box(P,10,1+k*.5,0,11,1.5+k*.5,(k+1)*1,"#f5f5f5",.5);for(const y of[4.5,7.5])box(P,1.75,y,3.5,2,y+1.2,5,"#1e5fb4",.25);box(P,7.5,2.75,3.5,9,3,5,"#1e5fb4",.25);
  ellV(P,6,6.5,7,2.8,2.8,2.6,(x,y,z)=>z<0?null:"#1565c0",.25);box(P,5.75,6.25,9.5,6.25,6.75,10.8,"#fafafa",.25);box(P,5.4,6.25,10.2,6.6,6.75,10.5,"#fafafa",.25);for(let k=0;k<10;k++)P(2.2+k*.4,2.7,7+(k%3)*.3,["#e91e63","#d81b60","#43a047"][k%3],.25)}
};
/* ギリシャシリーズ 作り直し分 */
function shd(v){v=Math.max(0,Math.min(1,v));const g=Math.round(175+v*70);return"#"+[g,g,g-4].map(n=>n.toString(16).padStart(2,"0")).join("")}
const GREEK2={
 bust2(P){/* 大理石の胸像（高精細・ひげの哲学者風） */ped(P,4.5,1.4);const st=.125,L=(x,y,z,n)=>shd(.55+(-x*.35-y*.45+z*.6)/n);
  for(let x=-1.9;x<=1.9;x+=st)for(let y=-1;y<=1;y+=st)for(let z=0;z<=1.6;z+=st){const r=(x/1.9)**2+(y/1)**2+((z-.2)/1.4)**2;if(r>1||r<.8)continue;const fold=Math.sin(x*5+z*3)>.7;P(3+x,3+y,4.5+z,fold?shd(.35):L(x/1.9,y,(z-.2)/1.4,1.2),st)}
  for(let x=-.45;x<=.45;x+=st)for(let y=-.45;y<=.45;y+=st)if(x*x+y*y<=.2)for(let z=6;z<6.7;z+=st)P(3+x,3+y,z,L(x,y,0,.5),st);
  for(let x=-.95;x<=.95;x+=st)for(let y=-1.05;y<=1.05;y+=st)for(let z=-1.1;z<=1.15;z+=st){const r=(x/.95)**2+(y/1.05)**2+(z/1.15)**2;if(r>1||r<.75)continue;P(3+x,3+y,7.6+z,L(x/.95,y/1.05,z/1.15,1),st)}
  for(let x=-1.05;x<=1.05;x+=st)for(let y=-1.1;y<=1.1;y+=st)for(let z=0;z<=1.3;z+=st){const r=(x/1.05)**2+(y/1.1)**2+(z/1.3)**2;if(r>1||r<.7||y<-.55&&z<.55)continue;const curl=Math.sin(x*13)*Math.cos(y*13+z*9);P(3+x,3+y,7.6+z,curl>.35?shd(.25):L(x,y,z,1.1),st)}
  for(let x=-.85;x<=.85;x+=st)for(let y=-1.3;y<=-.4;y+=st)for(let z=-1.9;z<=-.3;z+=st){const w=.85*(1-(-.3-z)/2.4);if(Math.abs(x)>w)continue;if(y<-1.3+(z+1.9)*.2+Math.abs(x)*.3)continue;if(y>-1.3+(z+1.9)*.2+Math.abs(x)*.3+.25&&y<-.6)continue;const c=Math.sin(x*15+z*5)>.25?shd(.3):L(x,-1,z*.3,1);P(3+x,3+y,7.6+z,c,st)}
  for(let x=-.6;x<=.6;x+=st)for(let z=0;z<.25;z+=st)P(3+x,1.78-Math.abs(x)*.2,7.3+z-Math.abs(x)*.25,shd(.3),st);
  for(let z=7.45;z<8.15;z+=st)for(let x=-.14;x<=.14;x+=st)P(3+x,1.86-(z-7.45)*.15,z,shd(.95),st);for(let x=-.14;x<=.14;x+=st)P(3+x,1.95,7.42,shd(.2),st);
  for(const s of[-1,1]){for(let a=-.2;a<=.2;a+=st)for(let b=-.1;b<=.1;b+=st)P(3+s*.4+a,1.95,8.02+b,"#8a8a86",st);for(let a=-.28;a<=.28;a+=st)P(3+s*.4+a,1.88,8.3-Math.abs(a)*.3,shd(.95),st);P(3+s*.4,1.9,8.02,"#5f5f5c",st)}
  for(const s of[-1,1])for(let y=-.3;y<=.3;y+=st)for(let z=-.3;z<=.3;z+=st)if(y*y+z*z<.09)P(3+s*.98,3+y,7.6+z,L(s,0,0,1),st)},
 helmet(P){/* コリント式の兜（台つき） */ped(P,3,1.2);for(let z=3;z<4.2;z+=.25)P(3,3,z,"#5d4037",.25);const st=.125;
  for(let x=-1;x<=1;x+=st)for(let y=-1.2;y<=1.2;y+=st)for(let z=-1.7;z<=1.2;z+=st){const r=(x/1)**2+(y/1.2)**2+(z/(z>0?1.2:1.7))**2;if(r>1)continue;const inner=r<.72;const fy=y<-.5;let hole=false;
   if(fy&&z>-.6&&z<-.15&&Math.abs(x)>.12&&Math.abs(x)<.78)hole=true;if(fy&&z<=-.6&&Math.abs(x)<.3)hole=true;if(fy&&Math.abs(x)<.12&&z>-1.05&&z<-.15)hole=false;if(z<-1.4&&y>.2)hole=true;
   if(hole){continue}const v=.5+(-x*.4-y*.3+z*.5)/1.2;P(3+x,3+y,5.6+z,inner?"#2b1d0e":(v>.75?"#f0c85a":v>.45?"#cf9a33":"#9a6a1c"),st)}
  for(let x=-1;x<=1;x+=st)for(let z=-.2;z<0;z+=st){const y=-Math.sqrt(Math.max(0,1-(x)**2))*1.2;P(3+x,3+y-.05,5.6+z+.15,"#7a5214",st)}/* 眉の線 */
  for(let y=-1.3;y<=1.5;y+=st)for(let h=0;h<1.3-Math.abs(y-.1)*.35;h+=st)for(let x=-.2;x<=.2;x+=st)P(3+x,3+y,6.75+h,((y*8|0)+(h*6|0))%3?"#c62828":"#8e1b1b",st)},
 trojan(P0){/* トロイの木馬の模型（横向き） */const P=(x,y,z,c,st)=>P0(y+.6,x,z,c,st);box(P,.6,.8,.6,5.4,5.2,1.2,"#6d4c41");for(const[x,y]of[[.8,1.2],[5.2,1.2],[.8,4.8],[5.2,4.8]])for(let a=0;a<6.28;a+=.3)for(let r=0;r<.6;r+=.25)P(x,y+Math.cos(a)*r,.6+Math.sin(a)*r,r>.4?"#4e342e":"#8d6e63",.25);
  const W=(x,y,z)=>((z*4|0)%2?"#a1887f":"#8d6e63");for(const[x,y]of[[2,1.8],[4,1.8],[2,4.2],[4,4.2]])box(P,x-.3,y-.3,1.2,x+.3,y+.3,4,W,.25);box(P,1.5,1.2,4,4.5,4.9,6,W,.25);for(let t=0;t<8;t++)box(P,2.3,1.6-t*.15,6+t*.4,3.7,2.4-t*.15,6.4+t*.4,W,.25);
  box(P,2.2,-.4,8.5,3.8,1.3,9.6,W,.25);box(P,2.4,-.9,8.4,3.6,-.4,9.3,W,.25);for(let t=0;t<7;t++)box(P,2.8,1.4+t*.25,6.5+t*.35,3.2,1.6+t*.25,6.8+t*.35,"#5d4037",.25);P(2.15,0,9.2,"#212121",.25);P(3.85,0,9.2,"#212121",.25);for(let z=9.6;z<10.4;z+=.25){P(2.4,.9,z,W(0,0,z),.25);P(3.6,.9,z,W(0,0,z),.25)}
  for(let t=0;t<6;t++)P(3,5+t*.15,5.6-t*.35,"#5d4037",.25);box(P,4.45,2.2,4.5,4.6,3.4,5.5,"#4e342e",.25)},
 bench(P){/* 大理石のベンチ（獅子の脚） */const st=.25;for(const x of[1,4.5])for(const y of[2,4]){box(P,x,y-.5,0,x+.6,y+.1,.7,MS,st);box(P,x+.05,y-.4,.7,x+.55,y,2.2,MB,st);P(x+.3,y-.6,.2,"#cfd1cc",st)}
  box(P,.6,1.2,2.2,5.6,4.9,2.9,(x,y,z)=>z>2.6?"#f6f6f2":"#e4e5e0",st);for(let x=.6;x<5.6;x+=st)P(x,1.1,2.5,"#d6d7d1",st);box(P,1.2,1.8,2.9,5,4.3,3.3,"#1e5fb4",st);for(let x=1.2;x<5;x+=1)P(x,1.75,3.1,"#fafafa",st)},
 door(P){/* 青い扉（壁） */for(let y=.5;y<5.5;y+=.25)for(let z=0;z<11;z+=.25){const iy=y+.125-3,inA=z<8.2?Math.abs(iy)<1.7:Math.hypot(iy,z-8.2)<1.7;const fr=z<8.7?Math.abs(iy)<2.2:Math.hypot(iy,z-8.2)<2.2;if(!fr)continue;P(.25,y,z,inA?"#1565c0":"#fafafa",.25)}
  for(let z=.3;z<8;z+=.25){P(.5,3,z,"#0d47a1",.25)}for(let y=1.4;y<4.7;y+=.25){P(.5,y,4,"#0d47a1",.25);P(.5,y,7.4,"#0d47a1",.25)}P(.75,3.5,4.6,GD,.25);P(.75,2.5,4.6,GD,.25);
  for(const y of[-.3,6.3])for(let z=0;z<2.2;z+=.25)for(let a=0;a<6.28;a+=.5)P(1+Math.cos(a)*.55,y+Math.sin(a)*.55,z,z<1.6?"#c8642a":"#43a047",.25);for(const y of[-.3,6.3])for(let k=0;k<8;k++)P(1+Math.cos(k)*.5,y+Math.sin(k)*.5,2.3+(k%3)*.25,["#e91e63","#43a047","#ff4081"][k%3],.25)},
 pithos(P){/* オリーブオイルの大がめ（3つ） */const jar=(cx,cy,h,R)=>{for(let z=0;z<h;z+=.25){const t=z/h,r=t<.1?R*.55:t<.85?R*(.55+Math.sin((t-.1)/.75*Math.PI)*.45):R*.42;for(let a=0;a<6.28;a+=.1){let c=(t>.42&&t<.47)||(t>.6&&t<.63)?"#5d4037":"#c97b45";if(t>.47&&t<.6&&((a*5|0)%2))c="#d88f58";P(cx+Math.cos(a)*r,cy+Math.sin(a)*r,z,c,.25)}}for(let a=0;a<6.28;a+=.15)P(cx+Math.cos(a)*R*.5,cy+Math.sin(a)*R*.5,h,"#8d5a2b",.25)};
  jar(2.2,3.6,7,1.6);jar(4.4,2.6,4.5,1.1);jar(1.3,1.5,3,.8);for(let k=0;k<5;k++)P(4.2+k*.2,1.2,.2,"#558b2f",.25);for(const[x,y]of[[4.6,1.1],[4.9,1.3],[4.4,1.4]])P(x,y,.45,"#33691e",.25)},
 stairs(P){/* 白い階段と植木鉢 */for(let k=0;k<5;k++)box(P,.5,.5+k*1,0,5.5,1.5+k*1,(k+1)*1.2,(x,y,z)=>z>(k+1)*1.2-.3?"#fafafa":"#ececE8",.5);box(P,.5,5,0,5.5,5.5,6,"#fafafa");
  const pot=(x,y,z,c)=>{for(let h=0;h<.8;h+=.25)for(let a=0;a<6.28;a+=.4)P(x+Math.cos(a)*.4,y+Math.sin(a)*.4,z+h,"#1e88e5",.25);for(let k=0;k<7;k++)P(x+Math.cos(k*.9)*.35,y+Math.sin(k*.9)*.35,z+.9+(k%2)*.25,k%3?c:"#43a047",.25)};
  pot(1.2,1,1.2,"#e53935");pot(4.8,2,2.4,"#ff4081");pot(1.2,3,3.6,"#fdd835");pot(4.8,4,4.8,"#e53935")}
};
