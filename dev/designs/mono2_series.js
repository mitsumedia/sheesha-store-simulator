/* モノクロシリーズ（作り直し） 候補＋ボーナス 見本。正面は-y側。壁アイテムはx=0が壁。写真の額は mono_series.js の photo */
function ellV(P,cx,cy,cz,rx,ry,rz,c,st){st=st||.5;for(let x=-rx;x<=rx;x+=st)for(let y=-ry;y<=ry;y+=st)for(let z=-rz;z<=rz;z+=st)if((x/rx)**2+(y/ry)**2+(z/rz)**2<=1)P(cx+x,cy+y,cz+z,typeof c==="function"?c(x,y,z):c,st)}
function box(P,x0,y0,z0,x1,y1,z1,c,st){st=st||.5;for(let x=x0;x<x1;x+=st)for(let y=y0;y<y1;y+=st)for(let z=z0;z<z1;z+=st)P(x,y,z,typeof c==="function"?c(x,y,z):c,st)}
function cyl(P,cx,cy,z0,z1,r,c,st){st=st||.5;for(let x=-r;x<=r;x+=st)for(let y=-r;y<=r;y+=st)if(x*x+y*y<=r*r)for(let z=z0;z<z1;z+=st)P(cx+x,cy+y,z,typeof c==="function"?c(x,y,z,Math.atan2(y,x)):c,st)}
function line(P,a,b,c,st,r){st=st||.25;r=r||0;const n=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2])/(st*.7));for(let i=0;i<=n;i++){const t=i/n,x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t,z=a[2]+(b[2]-a[2])*t;if(r)ellV(P,x,y,z,r,r,r,c,st);else P(x,y,z,c,st)}}
const BK="#161616",B2="#333",WT="#f4f4f4",G1="#9a9a9a",G2="#c8c8c8",CR="#d9d9d9";
const MONO2={
 tv(P){for(const[x,y]of[[1.6,2.2],[4.2,2.2],[1.6,4.2],[4.2,4.2]])line(P,[3,3.2,2],[x,y,0],BK,.25);box(P,1,1.8,2,5,4.8,6.5,(x,y,z)=>z>6.25||x<1.25||x>=4.75?B2:"#262626",.25);
  for(let x=1.5;x<3.9;x+=.25)for(let z=2.75;z<5.75;z+=.25){const u=(x-2.7)/1.2,v=(z-4.25)/1.5;if(u*u*u*u+v*v*v*v>1)continue;P(x,1.75,z,((z*4|0)%2&&Math.sin(x*13+z*7)>.2)?WT:(Math.sin(x*9-z*5)>.5?G2:G1),.25)}
  for(let x=1.4;x<4;x+=.25)P(x,1.75,2.5,B2,.25);for(const z of[5,3.8])cyl(P,4.4,1.7,z,z+.25,.25,G2,.125);for(let k=0;k<4;k++)P(4.3,1.7,2.9+k*.2,G1,.125);
  line(P,[3,3.3,6.5],[1.6,4,9.6],G1,.125);line(P,[3,3.3,6.5],[4.4,4,9.4],G1,.125);ellV(P,3,3.3,6.6,.45,.4,.25,BK,.125)},
 screen(P){const pan=[[.4,2.2],[2.2,3.2],[3.8,2.2],[5.6,3.2]];for(let i=0;i<3;i++){const[a,b]=[pan[i],pan[i+1]];const n=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/.2);
  for(let k=0;k<=n;k++){const t=k/n,x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t;for(let z=0;z<11;z+=.25){const e=k<2||k>n-2||z<.75||z>=10.25;const cc=((t*4|0)+((z-.75)/1.2|0))%2;P(x,y,z,e?BK:(cc?BK:WT),.25)}}}},
 typewriter(P){box(P,.8,1.5,4.5,5.2,4.5,5,BK,.25);for(const[x,y]of[[1,1.7],[4.75,1.7],[1,4.1],[4.75,4.1]])box(P,x,y,0,x+.25,y+.25,4.5,BK,.25);
  box(P,1.6,2,5,4.4,4.1,6,(x,y,z)=>z>5.75&&y<3?B2:BK,.25);for(let r=0;r<3;r++)for(let k=0;k<8-r;k++)P(1.85+k*.32+r*.16,2.1+r*.35,6+r*.25,WT,.125);
  cyl(P,3,3,0,0,0,BK);for(let x=1.4;x<4.6;x+=.25)for(let a=0;a<6.28;a+=.6)P(x,3.9+Math.cos(a)*.35,6.4+Math.sin(a)*.35,B2,.25);box(P,1.9,3.85,6.6,4.1,3.95,8.6,WT,.125);for(let z=7.1;z<8.4;z+=.25)for(let x=2.2;x<3.8;x+=.25)if(((x*8+z*3)|0)%4===0)P(x,3.82,z,G1,.125);P(4.6,3.9,6.6,CR,.25);P(4.85,3.9,6.6,CR,.25)},
 pianorug(P){for(let x=0;x<6;x+=.25)for(let y=.5;y<5.5;y+=.25){const e=y<.75||y>=5.25||x<.25||x>=5.75;let c=WT;const k=(x-.25)/.7|0,f=(x-.25)%.7;if(e)c=BK;else if(f<.12)c=G1;else if(y>2.6&&[0,1,3,4,5].includes(k%7)&&f>.45)c=BK;else if(y>2.6&&[0,1,3,4,5].includes((k+6)%7)&&f<.25&&k>0)c=BK;P(x,y,0,c,.25)}},
 camera(P){for(const a of[0,2.09,4.19])line(P,[3,3,5],[3+Math.cos(a)*2,3+Math.sin(a)*2,0],B2,.25);cyl(P,3,3,5,5.5,.4,BK,.25);box(P,1.8,2.2,5.5,4.2,4.4,7.5,BK,.25);
  for(let z=0;z<1.6;z+=.25)cyl(P,3,1.6-z*.4,0,0,0);for(let y=1.4;y<2.2;y+=.25)for(let a=0;a<6.28;a+=.4)P(3+Math.cos(a)*.55,y,6.5+Math.sin(a)*.55,B2,.25);for(let a=0;a<6.28;a+=.5)for(let r=0;r<.4;r+=.2)P(3+Math.cos(a)*r,1.35,6.5+Math.sin(a)*r,"#5a6a7a",.125);
  for(const[y,r]of[[2.6,1.2],[4,1.2]])for(let a=0;a<6.28;a+=.15)for(let rr=0;rr<=r;rr+=.25)P(3,y+Math.cos(a)*rr,8.6+Math.sin(a)*rr,rr>r-.3?BK:((a*3|0)%2&&rr>.3?B2:G1),.25);P(4.3,3.2,6.2,G2,.25)},
 heel(P){/* 黒いハイヒールの大きなオブジェ（横向きの形を正面に見せる） */box(P,.6,1.2,0,5.4,4.8,1,WT,.25);box(P,.4,1,1,5.6,5,1.25,BK,.25);
  const sole=x=>x<2.4?1.4:x<4.9?1.4+Math.pow((x-2.4)/2.5,1.5)*3.1:4.5;
  for(let x=.8;x<5.2;x+=.125){const z0=sole(x),w=x<1.2?.45:x<2.6?.75:x<4.6?.62:.55;for(let y=-w;y<=w;y+=.125){P(x,3+y,z0,"#555",.125);P(x,3+y,z0+.125,BK,.125);
   let h=0;if(x<2.7)h=Math.max(0,1.05-Math.pow(Math.abs(x-1.6)/1.15,2)*.9)*(1-(y/w)**2*.6);else if(x>4.4)h=1.1;else h=.35;for(let dz=.25;dz<=h;dz+=.125){const edge=Math.abs(y)>w-.2||dz>h-.15||x>5.05;if(x<2.7||edge)P(x,3+y,z0+dz,(x>2.2&&x<2.7&&dz>h-.15)?"#2a2a2a":BK,.125)}if(x>=2.7&&x<=4.4)P(x,3+y,z0+.25,WT,.125)}}
  for(let z=1.25;z<4.5;z+=.125){const t=(4.5-z)/3.25,w=.12+ (1-t)*.28;for(let x=-w;x<=w;x+=.125)for(let y=-w;y<=w;y+=.125)P(4.95+x+(1-t)*.0,3+y,z,BK,.125)}},
 records(P){for(let y=.5;y<5.5;y+=.25)for(let z=6.5;z<13;z+=.25)P(.1,y,z,"#2a2a2a",.25);for(const[cy,cz,r]of[[1.9,11.3,1.4],[4.1,10.6,1.3],[2.6,8.2,1.5]])for(let y=-r;y<=r;y+=.125)for(let z=-r;z<=r;z+=.125){const d=Math.hypot(y,z);if(d>r)continue;P(.35,cy+y,cz+z,d<.15?"#2a2a2a":d<r*.35?WT:((d*9|0)%2?"#0e0e0e":"#262626"),.125)}},
 torso(P){box(P,1.5,1.5,0,4.5,4.5,3,BK,.25);box(P,1.3,1.3,3,4.7,4.7,3.25,B2,.25);cyl(P,3,3,3.25,4,.25,BK,.25);
  for(let z=4;z<9.5;z+=.25){const t=(z-4)/5.5,w=t<.25?.95-t*.3:t<.55?.85+(t-.25)*.4:t<.85?.97+(t-.55)*1.3:1.36-(t-.85)*6,d=.62+Math.sin(t*3.1)*.12;for(let x=-w;x<=w;x+=.125)for(let y=-d;y<=d;y+=.125)if((x/w)**2+(y/d)**2<=1&&(x/w)**2+(y/d)**2>.7)P(3+x,3+y,z,(x+y*.5<-.3)?"#e8e8e8":WT,.125)}
  cyl(P,3,3,9.4,10.2,.35,WT,.125)},
 coatstand(P){/* シルクハットとステッキのコートスタンド */cyl(P,3,3,0,.5,1.4,BK,.25);cyl(P,3,3,.5,11,.25,BK,.25);ellV(P,3,3,11.15,.35,.35,.35,BK,.25);
  for(let k=0;k<4;k++){const a=k*1.57+.4,dx=Math.cos(a),dy=Math.sin(a);for(let t=0;t<10;t++){const u=t/9,r=.3+u*1.1,z=10.2+Math.sin(u*Math.PI*1.1)*.8;P(3+dx*r,3+dy*r,z,BK,.25)}}
  const hx=3+Math.cos(.4)*1.3,hy=3+Math.sin(.4)*1.3;cyl(P,hx,hy,10.6,10.85,1,BK,.125);cyl(P,hx,hy,10.85,12.6,.65,BK,.125);cyl(P,hx,hy,10.85,11.2,.67,WT,.125);
  line(P,[4.2,1.9,0],[4,2.4,8.6],B2,.25);for(let t=0;t<7;t++){const a=t/6*Math.PI;P(4-Math.sin(a)*.5,2.4,8.6+(1-Math.cos(a))*.28,WT,.25)}
  const sx=3+Math.cos(3.54)*1.3,sy=3+Math.sin(3.54)*1.3;for(let z=6.5;z<10.6;z+=.25)for(let w=-.35;w<=.35;w+=.25)P(sx+w,sy-(z<7.5?(7.5-z)*.1:0),z,((z*2|0)%2)?WT:"#dcdcdc",.25);for(let k=0;k<4;k++)P(sx-.3+k*.2,sy,6.3,WT,.125)},
 cards(P){const card=(x,y,z,lean,c)=>{for(let u=0;u<1.6;u+=.125)for(let v=0;v<2.2;v+=.125){const zz=z+v*Math.cos(.35),xx=x+lean*v*Math.sin(.35);const e=u<.125||u>=1.5||v<.125||v>=2.1;let col=e?G2:WT;if(Math.hypot(u-.8,v-1.1)<.28)col=c;P(xx,y+u,zz,col,.125)}};
  const lvl=[[3,0],[2,2.1],[1,4.2]];for(const[n,z]of lvl){const x0=3-n*.85;for(let i=0;i<n;i++){card(x0+i*1.7,2.2,z,1,i%2?BK:"#555");card(x0+i*1.7+1.5,2.2,z,-1,BK);if(i<n-1)for(let u=0;u<1.6;u+=.125)for(let v=0;v<1.7;v+=.125)P(x0+i*1.7+.8+v,2.2+u,z+2.05,WT,.125)}}},
 argyle(P){box(P,1.2,1.2,0,4.8,4.8,1,BK,.25);box(P,1.2,1.2,23,4.8,4.8,24,BK,.25);box(P,1.6,1.6,1,4.4,4.4,23,(x,y,z)=>{if(x>1.7&&x<4.1&&y>1.7&&y<4.1)return null;const u=(x+y)%2.8,v=z%4.4;const d=Math.abs((u/2.8)-.5)*2+Math.abs((v/4.4)-.5)*2;const k=Math.floor((x+y)/2.8)+Math.floor(z/4.4);if(d<.95)return k%2?BK:WT;if(Math.abs(((x+y)*.5+z*.3)%1.2)<.12)return G1;return G2},.25)},
 magic(P){/* シルクハットとウサギのマジック台 */cyl(P,3,3,0,.5,1,BK,.25);cyl(P,3,3,.5,4,.25,BK,.25);cyl(P,3,3,4,5,2,(x,y,z)=>z>4.6?BK:"#2a2a2a",.25);for(let a=0;a<6.28;a+=.15)for(let z=2.6;z<4.6;z+=.25)P(3+Math.cos(a)*(2+((a*5|0)%2?.2:0)),3+Math.sin(a)*2,z,BK,.25);
  for(let z=5;z<7.2;z+=.125)for(let a=0;a<6.28;a+=.12)P(3+Math.cos(a)*.95,3+Math.sin(a)*.95,z,z<5.5?WT:BK,.125);cyl(P,3,3,5,5.125,.95,BK,.125);for(let a=0;a<6.28;a+=.08)for(let r=.95;r<1.45;r+=.125)P(3+Math.cos(a)*r,3+Math.sin(a)*r,7.2,BK,.125);
  ellV(P,3,3,7.65,.6,.55,.5,WT,.125);for(const d of[-1,1])P(3+d*.25,2.5,7.75,BK,.125);P(3,2.45,7.55,"#f3b6c4",.125);for(const d of[-.28,.28])for(let z=8;z<9.8;z+=.125){const w=z<9.4?.18:.1;for(let u=-w;u<=w;u+=.125)P(3+d+u+(z-8)*d*.15,3,z,Math.abs(u)<.06&&z<9.4?"#f3d0d8":WT,.125)}
  line(P,[4.4,2,5.1],[5.4,2.9,5.6],BK,.125);P(5.4,2.9,5.6,WT,.125);for(let k=0;k<4;k++)P(1.4+k*.2,1.8,5.1,WT,.125)},
 carpet(P){/* ボーナスA：黒いカーペットとスポットライト（1×2） */for(let x=1;x<5;x+=.5)for(let y=0;y<12;y+=.5)P(x,y,0,x<1.5||x>=4.5?G1:BK);
  for(const y of[1,5,9])for(const x of[.4,5.2]){cyl(P,x+.2,y,0,.25,.45,CR,.25);cyl(P,x+.2,y,.25,3.5,.12,CR,.25);ellV(P,x+.2,y,3.6,.22,.22,.22,CR,.125)}
  for(const x of[.6,5.4])for(let i=0;i<2;i++){const y0=1+i*4,y1=5+i*4;for(let k=0;k<=16;k++){const t=k/16;P(x,y0+(y1-y0)*t,3.3-Math.sin(t*Math.PI)*.8,"#3a3a3a",.25)}}
  for(const[y,sx]of[[11.2,1.6],[11.2,4.4]]){line(P,[sx,y,0],[sx,y,6],B2,.25);box(P,sx-.6,y-.6,6,sx+.6,y+.6,7.2,BK,.25);for(let a=0;a<6.28;a+=.3)for(let r=0;r<.5;r+=.125)P(sx+Math.cos(a)*r,y-.65,6.6+Math.sin(a)*r,r>.38?"#555":"#fffde7",.125);for(let k=0;k<5;k++)P(sx-.4+k*.2,y-.6,7.2,"#555",.125)}},
 cardcastle(P){/* ボーナスB：巨大なトランプの城（1マス・高さ3マス） */const C=(x0,y0,z0,w,h)=>{for(let x=x0;x<x0+w;x+=.25)for(let y=y0;y<y0+w;y+=.25)for(let z=z0;z<z0+h;z+=.25){const e=Math.min(x-x0,x0+w-.25-x,y-y0,y0+w-.25-y);if(e>.01&&z>z0+.01&&z<z0+h-.26)continue;const f=((x+y)/1.2|0)+((z-z0)/1.8|0);P(x,y,z,f%2?WT:"#e6e6e6",.25)}
   for(let x=x0;x<x0+w;x+=.5)for(const y of[y0])if(((x-x0)*2|0)%2===0)P(x,y,z0+h,BK,.25)};
  C(.5,.5,0,5,6);C(1.25,1.25,6,3.5,5);C(2,2,11,2,4);for(const[x,y]of[[.5,.5],[4.75,.5],[.5,4.75],[4.75,4.75]]){C(x-.1,y-.1,0,.9,7.5);for(let k=0;k<5;k++)P(x+.25,y+.25,7.5+k*.25,BK,.25);for(let t=0;t<3;t++)P(x+.5+t*.25,y+.25,8.5-t*.15,"#d0d0d0",.25)}
  for(const[y,z,s]of[[.4,3,1.2],[1.15,8.5,.9],[1.9,13,.8]])for(let a=0;a<6.28;a+=.2)for(let r=0;r<s;r+=.25)P(3+Math.cos(a)*r*.6,y-.1,z+Math.sin(a)*r,r<s-.3&&((a*2|0)%2)?BK:WT,.25);
  for(let z=15;z<17.6;z+=.25)P(2.9,2.9,z,BK,.25);for(let x=3;x<4.5;x+=.25)for(let z=16.4;z<17.4;z+=.25)P(x,2.9,z,(z<16.9)?BK:WT,.25)},
 car(P){/* ボーナスC：黒いクラシックカー（1×2・奥に長い） */const W=(x,y)=>{for(let a=0;a<6.28;a+=.12)for(let r=0;r<1.15;r+=.25)P(x,y+Math.cos(a)*r,1.15+Math.sin(a)*r,r>.85?BK:r>.5?WT:CR,.25)};W(.6,2.4);W(5.4,2.4);W(.6,9.4);W(5.4,9.4);
  for(let y=.6;y<11.6;y+=.25)for(let x=.9;x<5.1;x+=.25){const fen=(Math.abs(y-2.4)<1.6||Math.abs(y-9.4)<1.6);const top=y<3.8?2.6:y<4.4?2.9:y<9?(y>4.9&&y<8.6?2.9:2.9):2.7;for(let z=(fen?1.3:.9);z<top;z+=.25)P(x,y,z,(z>top-.3&&(x<1.15||x>=4.85))?CR:BK,.25)}
  for(let y=4.9;y<8.6;y+=.25)for(let x=1.2;x<4.8;x+=.25){const zt=y<5.7?2.9+(y-4.9)*1.9:y>8?2.9+(8.6-y)*2.4:4.4;for(let z=2.9;z<zt;z+=.25){const gl=z>3.3&&z<zt-.3&&(x<1.45||x>=4.55||y<5.6);P(x,y,z,gl?"#9fb0bf":BK,.25)}}
  for(let x=1;x<5;x+=.25){P(x,.5,1.5,CR,.25);P(x,.55,2,(x*4|0)%2?CR:"#555",.25);P(x,11.6,1.6,CR,.25)}for(const x of[1.5,4.5]){ellV(P,x,.55,2.3,.35,.2,.35,"#fff8e1",.125)}for(const x of[1.4,4.6])P(x,11.65,2,"#c62828",.25)},
};
