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
