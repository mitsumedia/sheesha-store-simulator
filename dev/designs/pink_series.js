/* ピンクシリーズ 候補＋ボーナス 見本。正面は-y側。壁アイテムはx=0が壁 */
function ellV(P,cx,cy,cz,rx,ry,rz,c,st){st=st||.5;for(let x=-rx;x<=rx;x+=st)for(let y=-ry;y<=ry;y+=st)for(let z=-rz;z<=rz;z+=st)if((x/rx)**2+(y/ry)**2+(z/rz)**2<=1)P(cx+x,cy+y,cz+z,typeof c==="function"?c(x,y,z):c,st)}
function box(P,x0,y0,z0,x1,y1,z1,c,st){st=st||.5;for(let x=x0;x<x1;x+=st)for(let y=y0;y<y1;y+=st)for(let z=z0;z<z1;z+=st)P(x,y,z,typeof c==="function"?c(x,y,z):c,st)}
function cyl(P,cx,cy,z0,z1,r,c,st){st=st||.5;for(let x=-r;x<=r;x+=st)for(let y=-r;y<=r;y+=st)if(x*x+y*y<=r*r)for(let z=z0;z<z1;z+=st)P(cx+x,cy+y,z,typeof c==="function"?c(x,y,z,Math.atan2(y,x)):c,st)}
function line(P,a,b,c,st){st=st||.25;const n=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2])/(st*.7));for(let i=0;i<=n;i++){const t=i/n;P(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t,c,st)}}
const PK="#ff69a8",P2="#ff9ec7",P3="#ffd1e3",HP="#ff2e8a",WH="#fff7fa",GL="#f0c75e",CRM="#e8e8e8";
const PINK={
 cotton(P){box(P,1.2,1.8,0,4.8,4.2,3.5,(x,y,z)=>z>3.2?WH:((x*2|0)%2?PK:WH),.25);for(const x of[1.5,4.5])for(let a=0;a<6.28;a+=.3)P(x,1.7+Math.cos(a)*.6,.6+Math.sin(a)*.6,"#9e9e9e",.25);
  cyl(P,3,3,3.5,4.5,1.6,"#e0e0e0",.25);for(let a=0;a<6.28;a+=.12)for(let z=4.5;z<5.5;z+=.25)P(3+Math.cos(a)*1.6,3+Math.sin(a)*1.6,z,"#f5f5f5",.25);
  for(let k=0;k<26;k++){const a=k*2.4,r=(k%5)*.25;ellV(P,3+Math.cos(a)*r,3+Math.sin(a)*r,5.2+(k%4)*.35,.6,.6,.5,k%3?P3:P2,.25)}for(const[x,y]of[[1.6,2.2],[1.9,2.4]]){line(P,[x,y,3.5],[x,y,6.5],"#fafafa",.125);ellV(P,x,y,7,.5,.5,.6,P2,.125)}},
 balloons(P){box(P,2.4,2.4,0,3.6,3.6,.75,HP,.25);const B=[[1.9,2.8,10.8,1.1,PK],[3.7,3.2,11.6,1.2,P2],[2.9,3.9,9.4,1,HP],[4.1,2.3,9.6,.95,P3],[2.6,2.1,8.6,.9,"#ffb3d1"]];
  for(const[x,y,z,r,c]of B){ellV(P,x,y,z,r,r,r*1.15,(a,b,cc)=>(a<-r*.3&&cc>r*.3&&b<0)?"#ffffff":c,.25);P(x-.125,y-.125,z-r*1.15-.25,c,.25);for(let k=0;k<16;k++){const t=k/16;P(3+(x-3)*t,3+(y-3)*t,.75+(z-r*1.15-1-.75)*t,"#eeeeee",.125)}}},
 gifts(P){const bx=(x0,y0,z0,w,h,c,rb)=>{box(P,x0,y0,z0,x0+w,y0+w,z0+h,(x,y,z)=>Math.abs(x-x0-w/2+.125)<.3||Math.abs(y-y0-w/2+.125)<.3?rb:c,.25);for(const d of[-1,1])ellV(P,x0+w/2+d*.35,y0+w/2,z0+h+.3,.35,.25,.3,rb,.125)};
  bx(.8,1.5,0,2.6,2.2,PK,WH);bx(3.3,2.4,0,2,1.6,P3,HP);bx(1.5,2.2,2.2,1.8,1.6,WH,PK);bx(3.6,2.8,1.6,1.3,1.2,HP,WH)},
 cake(P){cyl(P,3,3,0,.25,1.6,CRM,.25);cyl(P,3,3,.25,2.5,.3,CRM,.25);cyl(P,3,3,2.5,2.75,2.4,CRM,.25);
  const tier=(z,r,h,c)=>{cyl(P,3,3,z,z+h,r,(x,y,zz)=>zz>z+h-.4?WH:c,.25);for(let a=0;a<6.28;a+=.3)P(3+Math.cos(a)*r,3+Math.sin(a)*r,z+h-.25,WH,.25)};tier(2.75,2,1.6,P2);tier(4.35,1.4,1.3,PK);tier(5.65,.8,1,P3);
  const sb=(x,y,z)=>{ellV(P,x,y,z,.3,.3,.35,"#e53935",.125);P(x-.06,y-.06,z+.35,"#43a047",.125)};for(let k=0;k<10;k++){const a=k*.63;sb(3+Math.cos(a)*1.65,3+Math.sin(a)*1.65,4.5)}for(let k=0;k<6;k++){const a=k*1.05;sb(3+Math.cos(a)*1.05,3+Math.sin(a)*1.05,5.8)}sb(3,3,6.95);sb(2.6,3.2,6.9)},
 roses(P){for(let z=0;z<4.5;z+=.25){const r=z<.5?.9:z<3?1.1+Math.sin(z/3*Math.PI)*.4:.85+(z-3)*.15;for(let a=0;a<6.28;a+=.15)P(3+Math.cos(a)*r,3+Math.sin(a)*r,z,"#e1f5fe",.25)}cyl(P,3,3,.25,3,1,"#b3e5fc",.25);
  for(let k=0;k<11;k++){const a=k*2.4,r=k===0?0:k<5?.8:1.5,x=3+Math.cos(a)*r,y=3+Math.sin(a)*r,z=7+(k===0?.9:k<5?.5:0)-r*.3;line(P,[3,3,2.5],[x,y,z],"#388e3c",.25);
   const c=k%3===0?HP:k%3===1?PK:P2;ellV(P,x,y,z+.35,.55,.55,.45,(a2,b2,c2)=>{const ang=Math.atan2(b2,a2);return(Math.sin(ang*3+c2*6)>.4)?"#ffffff":c},.125);if(k%2)for(let t=0;t<3;t++)P(x+.6+t*.1,y,z-.3-t*.15,"#4caf50",.25)}},
 discoball(P){cyl(P,3,3,0,.5,1.1,"#bdbdbd",.25);cyl(P,3,3,.5,6,.15,"#bdbdbd",.25);ellV(P,3,3,8.6,2.4,2.4,2.4,(x,y,z)=>{const f=((x*3.5+10|0)+(y*3.5+10|0)+(z*3.5+10|0))%4;return f===0?"#ffffff":f===1?P3:f===2?P2:"#ffc0dc"},.25);for(let k=0;k<10;k++)P(3+Math.cos(k*.7)*3.2,3+Math.sin(k*.7)*1.2-1.6,8.6+Math.sin(k*1.9)*2.5,"#fff59d",.125)},
 teddy(P){const F="#ff8fbe",F2="#ffd3e6";ellV(P,3,3.3,2.2,1.8,1.6,2,F,.25);ellV(P,3,2.4,2.2,1.1,.6,1.4,F2,.25);ellV(P,3,3.2,5.4,1.5,1.35,1.35,F,.25);ellV(P,3,1.95,5,.7,.4,.5,F2,.125);P(3-.1,1.55,5.2,"#3e2723",.25);
  for(const d of[-1,1]){ellV(P,3+d*1.15,3.3,6.6,.55,.35,.55,F,.25);ellV(P,3+d*1.15,3.1,6.6,.3,.2,.3,F2,.125);P(3+d*.55-.1,1.9,5.85,"#212121",.25);ellV(P,3+d*1.9,2.6,3.1,.55,.55,.9,F,.25);ellV(P,3+d*1.05,1.7,.7,.7,1,.6,F,.25);ellV(P,3+d*1.05,.8,.7,.45,.2,.45,F2,.125)}
  for(let a=-.9;a<=.9;a+=.25)for(const s of[-1,1])ellV(P,3+s*.45,1.95,4.1,.35,.2,.25,HP,.125);ellV(P,3,1.9,4.1,.2,.2,.2,"#c2185b",.125)},
 boombox(P){box(P,.8,2,2,5.2,4,5.2,(x,y,z)=>z>4.95||x<1.05||x>=4.95?"#e0558f":PK,.25);for(const cx of[1.85,4.15]){for(let a=0;a<6.28;a+=.12)for(let r=0;r<.95;r+=.125)P(cx+Math.cos(a)*r,1.9,3.4+Math.sin(a)*r,r>.75?"#c2185b":r<.25?"#880e4f":(r*8|0)%2?"#ad1457":"#c2185b",.125)}
  box(P,2.55,1.9,3,3.45,2,3.9,"#3a2a33",.125);for(let k=0;k<6;k++)P(2.3+k*.25,1.9,4.5,k%2?WH:"#f8bbd0",.125);for(let x=1.5;x<4.5;x+=.25)P(x,3,6.2,"#d0d0d0",.25);for(const x of[1.5,4.25])for(let z=5.2;z<6.2;z+=.25)P(x,3,z,"#d0d0d0",.25);
  box(P,1.5,2.2,0,4.5,3.8,2,"#f8bbd0",.25)},
 donuts(P){cyl(P,3,3,0,.25,1.5,GL,.25);cyl(P,3,3,.25,8,.15,GL,.25);const D=(x,y,z,c)=>{for(let a=0;a<6.28;a+=.2)for(let b=0;b<6.28;b+=.6){const R=.55+Math.cos(b)*.28;P(x+Math.cos(a)*R,y+Math.sin(a)*R,z+Math.sin(b)*.28,Math.sin(b)>.1?c:"#d7a86e",.125)}for(let k=0;k<5;k++)P(x+Math.cos(k*1.3)*.55,y+Math.sin(k*1.3)*.55,z+.3,["#fff","#80deea","#fff59d"][k%3],.125)};
  for(const[z,r,n]of[[2,2.1,6],[5,1.5,4],[7.8,0,1]]){cyl(P,3,3,z-.5,z-.25,r+.8,WH,.25);for(let k=0;k<n;k++){const a=k*6.28/n;D(3+Math.cos(a)*r,3+Math.sin(a)*r,z,[PK,P2,HP,"#c2185b"][k%4])}}},
 macaron(P){cyl(P,3,3,0,.5,2.1,GL,.25);const cols=[P3,"#ffe0ec",P2,"#ffffff",PK,"#fde2ec"];let z=.5;for(let i=0;i<14;i++){const r=1.9-i*.13,n=Math.max(1,Math.round(r*4.2));for(let k=0;k<n;k++){const a=k*6.28/n+i*.3,x=3+Math.cos(a)*r,y=3+Math.sin(a)*r,c=cols[(i+k)%6];
  for(const[dz,cc]of[[0,c],[.25,"#fff"],[.4,c]])for(let u=-.35;u<=.35;u+=.125)for(let v=-.35;v<=.35;v+=.125)if(u*u+v*v<.13)P(x+u,y+v,z+dz,cc,.125)}z+=.55}ellV(P,3,3,z+.3,.35,.35,.35,HP,.125)},
 phone(P){cyl(P,3,3,0,.25,1.3,"#f8bbd0",.25);cyl(P,3,3,.25,4,.2,"#f8bbd0",.25);cyl(P,3,3,4,4.25,1.6,"#f8bbd0",.25);
  box(P,1.8,2,4.25,4.2,4,5.5,PK,.25);for(let x=1.9;x<4.1;x+=.25)for(let y=2.1;y<3.9;y+=.25){const zz=5.5+Math.max(0,.6-Math.abs(y-3)*.5);P(x,y,zz,PK,.25)}
  for(let a=0;a<6.28;a+=.12)for(let r=.2;r<.75;r+=.125)P(3+Math.cos(a)*r,1.95,4.95+Math.sin(a)*r*.6,(Math.round(a/.63)%2&&r>.4)?WH:"#f06292",.125);
  for(let x=1.6;x<4.4;x+=.25)P(x,3,6.4+(Math.abs(x-3)>1?-.3:0),HP,.25);for(const x of[1.5,4.5])ellV(P,x,3,6,.4,.45,.35,HP,.125);for(let t=0;t<10;t++)P(4.5+Math.sin(t*.8)*.3,2.5-t*.1,5.6-t*.5,"#c2185b",.125)},
 bulbmirror(P){for(let y=.25;y<5.75;y+=.125)for(let z=6.75;z<12.25;z+=.125){const d=Math.hypot(y-3,z-9.5);if(d>2.75)continue;P(d>2.3?.4:.3,y,z,d>2.3?PK:(Math.abs((y-3)-(z-9.5)*.6+.5)<.25&&d<1.8?"#ffffff":"#dbe9f2"),.125)}
  for(let k=0;k<14;k++){const a=k/14*6.28;ellV(P,.55,3+Math.cos(a)*2.55,9.5+Math.sin(a)*2.55,.2,.2,.2,"#fffde7",.125)}},
 opencar(P){/* ボーナスA：ピンクのオープンカー（1×2・奥に長い） */const W=(x,y)=>{for(let a=0;a<6.28;a+=.12)for(let r=0;r<1.05;r+=.25)P(x,y+Math.cos(a)*r,1.05+Math.sin(a)*r,r>.8?"#212121":r>.45?WH:"#e0e0e0",.25)};W(.6,2.3);W(5.4,2.3);W(.6,9.6);W(5.4,9.6);
  for(let y=.5;y<11.6;y+=.25)for(let x=.9;x<5.1;x+=.25){const top=y<4?2.7:y<9?2.6:2.9;const fl=(Math.abs(y-2.3)<1.5||Math.abs(y-9.6)<1.5)?1.25:.8;for(let z=fl;z<top;z+=.25){const inn=y>4.4&&y<9.3&&x>1.3&&x<4.7&&z>1.6;if(inn)continue;P(x,y,z,(z>top-.3&&(x<1.15||x>=4.85))?WH:PK,.25)}}
  for(let y=5.2;y<9;y+=.25)for(let x=1.3;x<4.7;x+=.25)P(x,y,1.6,"#fff0f5",.25);for(const y of[5.4,7.6])for(let x=1.4;x<4.6;x+=.25)for(let z=1.6;z<3.4;z+=.25)P(x,y+(z-1.6)*.25+1,z,"#ffffff",.25);
  for(let x=1.3;x<4.7;x+=.25)for(let z=2.6;z<3.6;z+=.25)P(x,4.2+(z-2.6)*.4,z,"#cde8f5",.25);cyl(P,0,0,0,0,0);for(let a=0;a<6.28;a+=.3)P(3.6+Math.cos(a)*.45,5,2.9+Math.sin(a)*.45,"#3a3a3a",.125);
  for(let x=1;x<5;x+=.25){P(x,.45,1.6,"#e0e0e0",.25);P(x,11.65,1.6,"#e0e0e0",.25)}for(const x of[1.5,4.5])ellV(P,x,.5,2.2,.35,.2,.35,"#fff8e1",.125)},
 cotree(P){/* ボーナスB：綿あめの雲のような大きな木（1マス・高さ3マス） */cyl(P,3,3,0,1,2.2,(x,y,z,a)=>((a*4+6.3)|0)%2?"#ffffff":P3,.25);for(let z=1;z<9;z+=.25){const r=.55-z*.02;cyl(P,3+Math.sin(z*.5)*.2,3,z,z+.25,r,"#c48a9e",.25)}
  for(const a of[.4,2.5,4.4])line(P,[3,3,7],[3+Math.cos(a)*1.6,3+Math.sin(a)*1.6,9.5],"#c48a9e",.25);
  const cl=[[3,3,12.5,2.4],[1.6,2.4,11,1.5],[4.4,3.6,11.2,1.6],[3,1.6,13.8,1.5],[2.4,3.8,14.6,1.6],[3.8,2.6,15.6,1.4],[3,3,16.4,1.2]];for(const[x,y,z,r]of cl)ellV(P,x,y,z,r,r,r*.85,(a,b,c)=>c>r*.4?WH:(a+b<-r*.5?"#ffe3ef":P3),.25);
  for(let k=0;k<12;k++)P(3+Math.cos(k*1.7)*2.2,3+Math.sin(k*1.7)*2,11+k*.45,["#fff59d","#b2ebf2","#ff80ab"][k%3],.25)},
 merry(P){/* ボーナスC：ピンクのメリーゴーラウンド（2×2） */cyl(P,6,6,0,.5,5.8,(x,y,z,a)=>((a*4+6.3)|0)%2?PK:WH);for(let a=0;a<6.28;a+=.15)P(6+Math.cos(a)*5.8,6+Math.sin(a)*5.8,.5,GL,.25);cyl(P,6,6,.5,12,.45,GL,.25);
  for(let z=12;z<14.6;z+=.25){const r=6.1-(z-12)*2.2;for(let a=0;a<6.28;a+=.06/(r/6+.1))P(6+Math.cos(a)*r,6+Math.sin(a)*r,z,((a*4+6.3)|0)%2?PK:WH,.25)}ellV(P,6,6,15,.6,.6,.6,GL,.25);for(let a=0;a<6.28;a+=.25)P(6+Math.cos(a)*6,6+Math.sin(a)*6,11.75,"#fff59d",.25);
  const horse=(cx,cy,ang,c)=>{const dx=Math.cos(ang),dy=Math.sin(ang);const Q=(u,v,z,col,s)=>P(cx+u*dx-v*dy,cy+u*dy+v*dx,z,col,s);for(let u=-1;u<=1;u+=.25)for(let v=-.4;v<=.4;v+=.25)for(let z=3.6;z<4.6;z+=.25)if((u/1.1)**2+((z-4.1)/.55)**2<=1)Q(u,v,z,c,.25);
   for(const[u,v]of[[-.8,-.25],[-.8,.25],[.8,-.25],[.8,.25]])for(let z=2.4;z<3.8;z+=.25)Q(u+(u>0?(3.8-z)*.3:0),v,z,c,.25);for(let t=0;t<6;t++)for(let v=-.25;v<=.25;v+=.25)Q(1+t*.15,v,4.4+t*.25,c,.25);for(let u=1.3;u<2.3;u+=.25)for(let v=-.3;v<=.3;v+=.25)Q(u,v,6,c,.25);for(let t=0;t<5;t++)Q(.9+t*.2,0,4.9+t*.3,"#fff59d",.25);for(let t=0;t<4;t++)Q(-1.1-t*.1,0,4.2-t*.3,"#fff59d",.25);Q(0,0,4.7,HP,.25);Q(0,0,4.95,HP,.25)};
  for(let k=0;k<4;k++){const a=k*1.5708+.6,x=6+Math.cos(a)*3.8,y=6+Math.sin(a)*3.8;for(let z=.5;z<12;z+=.25)P(x,y,z,GL,.25);horse(x,y,a+1.5708,[WH,P3,"#ffffff",P2][k])}},
};
