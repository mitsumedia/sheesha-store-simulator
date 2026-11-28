/* ハートシリーズ 候補＋ボーナス 見本。正面は-y側。壁アイテムはx=0が壁 */
function ellV(P,cx,cy,cz,rx,ry,rz,c,st){st=st||.5;for(let x=-rx;x<=rx;x+=st)for(let y=-ry;y<=ry;y+=st)for(let z=-rz;z<=rz;z+=st)if((x/rx)**2+(y/ry)**2+(z/rz)**2<=1)P(cx+x,cy+y,cz+z,typeof c==="function"?c(x,y,z):c,st)}
function box(P,x0,y0,z0,x1,y1,z1,c,st){st=st||.5;for(let x=x0;x<x1;x+=st)for(let y=y0;y<y1;y+=st)for(let z=z0;z<z1;z+=st)P(x,y,z,typeof c==="function"?c(x,y,z):c,st)}
function cyl(P,cx,cy,z0,z1,r,c,st){st=st||.5;for(let x=-r;x<=r;x+=st)for(let y=-r;y<=r;y+=st)if(x*x+y*y<=r*r)for(let z=z0;z<z1;z+=st)P(cx+x,cy+y,z,typeof c==="function"?c(x,y,z,Math.atan2(y,x)):c,st)}
/* ハートの形：u,v は -1.2〜1.2 くらい（vが上） */
const inH=(u,v)=>{v=v*1.1-.15;const a=u*u+v*v-1;return a*a*a-u*u*v*v*v<=0};
/* 板状のハート：中心(cx,cy,cz)、幅w（横）、厚みd。plane="xz"（正面向き）/"xy"（寝かせる）/"yz"（壁） */
function heart(P,cx,cy,cz,w,d,c,st,plane){st=st||.25;plane=plane||"xz";const R=w/2;for(let a=-R*1.3;a<=R*1.3;a+=st)for(let b=-R*1.3;b<=R*1.3;b+=st){if(!inH(a/R,b/R))continue;for(let t=-d/2;t<d/2;t+=st){const col=typeof c==="function"?c(a/R,b/R,t):c;if(plane==="xz")P(cx+a,cy+t,cz+b,col,st);else if(plane==="xy")P(cx+a,cy+b,cz+t,col,st);else P(cx+t,cy+a,cz+b,col,st)}}}
/* ふくらんだハート（風船など） */
function heart3(P,cx,cy,cz,w,c,st){st=st||.25;const R=w/2;for(let a=-R*1.3;a<=R*1.3;a+=st)for(let b=-R*1.3;b<=R*1.3;b+=st){if(!inH(a/R,b/R))continue;let e=1;for(let k=1;k<=6;k++)if(!inH((a/R)*(1+k*.06),(b/R)*(1+k*.06))){e=k/6;break}const th=R*.55*Math.sqrt(e);for(let t=-th;t<th;t+=st)P(cx+a,cy+t,cz+b,typeof c==="function"?c(a/R,b/R,t/R):c,st)}}
const PK="#ff4f8b",RD="#e53935",LP="#ffb3c8",WH="#fff5f8",GD="#e6b422";
const HEART={
 candle(P){heart(P,3,3,.25,4.8,.5,(u,v)=>"#f8bbd0",.25,"xy");heart(P,3,3,.5,4.2,.25,LP,.25,"xy");for(const[x,y,h]of[[2.2,3.3,3],[3.8,3.3,2.4],[3,2.3,1.8]]){cyl(P,x,y,.75,.75+h,.35,RD,.25);P(x-.125,y-.125,.75+h,"#424242",.25);ellV(P,x,y,1.3+h,.2,.2,.4,(a,b,c)=>c>0?"#ffeb3b":"#ff9800",.125)}},
 balloons(P){box(P,2.4,2.4,0,3.6,3.6,.75,PK,.25);const B=[[1.8,2.6,10.5,2,RD],[3.6,3.2,11.5,2.2,PK],[2.8,3.8,9,1.8,LP],[4.2,2.4,9.3,1.6,"#ff80ab"]];
  for(const[x,y,z,w,c]of B){heart3(P,x,y,z,w,(u,v,t)=>(u<-.3&&v>.2&&t<0)?"#ffffff":c,.25);for(let k=0;k<16;k++){const t=k/16;P(3+(x-3)*t,3+(y-3)*t,.75+(z-w*.6-.75)*t,"#eeeeee",.125)}}},
 neon(P){for(let a=-3;a<=3;a+=.125)for(let b=-3;b<=3;b+=.125){const R=2.2;const i1=inH(a/R,b/R),i2=inH(a/(R-.35),b/(R-.35));if(i1&&!i2)P(.4,3+a,10+b,"#ff4fa3",.125);else if(inH(a/(R+.3),b/(R+.3))&&!i1)P(.25,3+a,10+b,"#ffc1dd",.125)}for(let y=.5;y<5.5;y+=.25)for(let z=7;z<13;z+=.25)P(.1,y,z,"#3a2a3a",.25)},
 gifts(P){const bx=(x0,y0,z0,w,h,c,rb)=>{box(P,x0,y0,z0,x0+w,y0+w,z0+h,(x,y,z)=>Math.abs(x-x0-w/2+.125)<.3||Math.abs(y-y0-w/2+.125)<.3?rb:c,.25);heart(P,x0+w/2,y0+w/2,z0+h+.5,1.2,.25,rb,.125,"xz")};
  bx(.8,1.5,0,2.6,2.2,PK,"#ffffff");bx(3.3,2.4,0,2,1.6,RD,LP);bx(1.5,2.2,2.2,1.8,1.6,LP,RD);bx(3.6,2.8,1.6,1.3,1.2,"#ffffff",PK)},
 arch(P){box(P,.5,2,0,5.5,4,.5,"#f8bbd0");const pts=[];for(let a=-3;a<=3;a+=.25)for(let b=-3.2;b<=3.2;b+=.25){const R=2.7;if(inH(a/R,b/R)&&!inH(a/(R-.8),b/(R-.8)))pts.push([a,b*1.45,((a*4+b*3)|0)%4===0?"#ffffff":((a*4+b*4)|0)%3?PK:RD])}
  const mz=Math.min(...pts.map(p=>p[1]));for(const[a,b,c]of pts)for(const y of[2.75,3])P(3+a,y,.5+b-mz,c,.25)},
 mirror(P){for(let a=-3;a<=3;a+=.125)for(let b=-3.2;b<=3.2;b+=.125){const R=2.3;if(!inH(a/R,b/R))continue;const fr=!inH(a/(R-.35),b/(R-.35));P(fr?.4:.3,3+a,10+b,fr?GD:((a-b)%.9<.18&&a>-.5?"#ffffff":"#cfe9f5"),.125)}},
 topiary(P){const pot=(z)=>{for(let zz=0;zz<2.5;zz+=.25){const r=1.1+zz*.15;for(let a=0;a<6.28;a+=.15)P(3+Math.cos(a)*r,3+Math.sin(a)*r,zz,zz>2?"#ffffff":"#f48fb1",.25)}cyl(P,3,3,2,2.25,1.3,"#6d4c41",.25)};pot();cyl(P,3,3,2.25,5,.2,"#795548",.25);
  heart3(P,3,3,8,4.6,(u,v,t)=>{const h=Math.sin(u*9)*Math.cos(v*8+t*5);return h>.5?"#66bb6a":h<-.6?"#2e7d32":"#43a047"},.25);for(const[u,v]of[[-.4,.5],[.5,.2],[0,-.4],[.2,.8]])P(3+u*2,1.8,8+v*2,"#ff80ab",.25)},
 cake(P){cyl(P,3,3,0,.25,1.5,"#eeeeee",.25);cyl(P,3,3,.25,3,.3,"#eeeeee",.25);heart(P,3,3,3.1,4.8,.25,"#eeeeee",.25,"xy");
  const tier=(z,w,h,c)=>{for(let zz=z;zz<z+h;zz+=.25)heart(P,3,3.1,zz+.125,w,.25,(u,v)=>zz>z+h-.5?WH:c,.25,"xy");};tier(3.25,4,1.5,"#f8bbd0");tier(4.75,2.8,1.25,PK);tier(6,1.6,1,"#f8bbd0");
  heart(P,3,3,8,1,.25,RD,.125,"xz");for(let k=0;k<10;k++){const a=k*.63;P(3+Math.cos(a)*1.5,3+Math.sin(a)*1.3,4.75,RD,.25)}},
 lamp(P){cyl(P,3,3,0,.5,1.1,"#f5f5f5",.25);cyl(P,3,3,.5,2,.2,"#f5f5f5",.25);heart3(P,3,3,4.5,4,(u,v,t)=>Math.hypot(u,v-.2)<.35?"#fffde7":Math.hypot(u,v-.2)<.7?"#ffd1e3":"#ff9cc2",.25)},
 chest(P){box(P,1,1.8,0,5,4.2,2.5,(x,y,z)=>(z<.5||z>=2.25||x<1.25||x>=4.75)?GD:PK,.25);for(let x=1;x<5;x+=.25)for(let t=0;t<9;t++){const a=t/8*Math.PI,y=4.2-1.2+Math.cos(a)*1.2*0,z=2.5+Math.sin(a)*1.2;P(x,4.1-Math.cos(a)*.2,2.5+t*.35,(x<1.25||x>=4.75)?GD:"#f06292",.25)}
  heart(P,3,1.65,1.6,.9,.25,GD,.125,"xz");for(let k=0;k<14;k++){const x=1.5+(k*.73)%3,y=2.2+(k*.41)%1.6;if(k%3)heart(P,x,y,2.8,.7,.25,k%2?RD:PK,.125,"xz");else ellV(P,x,y,2.6,.3,.3,.2,GD,.125)}},
 postbox(P){cyl(P,3,3,0,4,.35,"#b71c1c",.25);box(P,1.6,2,4,4.4,4,7.5,RD,.25);for(let x=1.6;x<4.4;x+=.25)for(let t=0;t<6;t++){const a=t/5*Math.PI;P(x,3+Math.cos(a)*1,7.5+Math.sin(a)*.8,"#c62828",.25)}box(P,2.2,1.85,6,3.8,2,6.25,"#3e2723",.25);heart(P,3,1.85,5,1.1,.25,"#ffffff",.125,"xz");
  box(P,2.4,1.6,6.25,3.6,1.75,7.2,"#fff3e0",.125);heart(P,3,1.55,6.7,.5,.125,RD,.125,"xz")},
 discoball(P){cyl(P,3,3,0,.5,1.1,"#9e9e9e",.25);cyl(P,3,3,.5,6,.15,"#9e9e9e",.25);for(let y=3;y<3;y++);
  heart3(P,3,3,9,4.2,(u,v,t)=>{const f=((u*6|0)+(v*6|0)+(t*6|0))%3;return f===0?"#ffffff":f===1?"#f8bbd0":"#d8a7c0"},.25);for(let k=0;k<8;k++)P(3+Math.cos(k)*2.8,1+Math.sin(k)*.5,9+Math.sin(k*2)*2.2,"#fff59d",.125)},
 bigheart(P){/* ボーナスA：巨大なハートのオブジェ（1マス・高さ3マス） */box(P,.75,.75,0,5.25,5.25,1.5,(x,y,z)=>z>1.25?GD:"#fafafa",.25);cyl(P,3,3,1.5,9,.4,GD,.25);heart3(P,3,3,11.5,7.2,(u,v,t)=>(u<-.2&&v>.25&&t<-.2)?"#ff8a80":(u>.4||t>.4)?"#c62828":RD,.25)},
 merry(P){/* ボーナスB：ハートのメリーゴーラウンド（2×2） */cyl(P,6,6,0,.5,5.8,(x,y,z,a)=>((a*4+6.3)|0)%2?PK:"#fafafa");cyl(P,6,6,.5,12,.4,GD,.25);
  for(let z=12;z<14.5;z+=.25){const r=6-(z-12)*2.2;for(let a=0;a<6.28;a+=.06/(r/6+.1))P(6+Math.cos(a)*r,6+Math.sin(a)*r,z,((a*4+6.3)|0)%2?PK:"#fafafa",.25)}heart3(P,6,6,15.5,2,RD,.25);
  for(let a=0;a<6.28;a+=.2)P(6+Math.cos(a)*5.9,6+Math.sin(a)*5.9,11.75,"#fff59d",.25);
  for(let k=0;k<4;k++){const a=k*1.5708+.6,x=6+Math.cos(a)*3.8,y=6+Math.sin(a)*3.8;for(let z=.5;z<12;z+=.25)P(x,y,z,GD,.25);heart3(P,x,y,4.5+(k%2),2.2,k%2?RD:LP,.25)}},
 swing(P){/* ボーナスC：ハートのブランコ（1×2） */for(const y of[.75,11])for(let z=0;z<13;z+=.25)for(const dx of[-1.5,1.5])P(3+dx*(1-z/14),y,z,"#fafafa",.25);for(let y=.75;y<11.25;y+=.25)P(3,y,13,"#fafafa",.25);
  for(let y=.75;y<11.25;y+=.5)for(let k=0;k<2;k++)P(3+(k?.25:-.25),y,13.25,(y*2|0)%3?"#f48fb1":"#81c784",.25);for(const y of[4.2,7.8])for(let z=4.5;z<13;z+=.25)P(3,y,z,"#e0e0e0",.125);
  for(let zz=0;zz<.75;zz+=.25)heart(P,3,6,4+zz,4,.25,(u,v)=>zz>.4?PK:"#f06292",.25,"xy");heart(P,3,6.9,6.2,3.2,.5,(u,v)=>Math.abs(u)<.08?"#fff":PK,.25,"xz")},
};
