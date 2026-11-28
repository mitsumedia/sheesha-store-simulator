/* モノクロシリーズ 候補＋ボーナス 見本。正面は-y側。壁アイテムはx=0が壁 */
function ellV(P,cx,cy,cz,rx,ry,rz,c,st){st=st||.5;for(let x=-rx;x<=rx;x+=st)for(let y=-ry;y<=ry;y+=st)for(let z=-rz;z<=rz;z+=st)if((x/rx)**2+(y/ry)**2+(z/rz)**2<=1)P(cx+x,cy+y,cz+z,typeof c==="function"?c(x,y,z):c,st)}
function box(P,x0,y0,z0,x1,y1,z1,c,st){st=st||.5;for(let x=x0;x<x1;x+=st)for(let y=y0;y<y1;y+=st)for(let z=z0;z<z1;z+=st)P(x,y,z,typeof c==="function"?c(x,y,z):c,st)}
function cyl(P,cx,cy,z0,z1,r,c,st){st=st||.5;for(let x=-r;x<=r;x+=st)for(let y=-r;y<=r;y+=st)if(x*x+y*y<=r*r)for(let z=z0;z<z1;z+=st)P(cx+x,cy+y,z,typeof c==="function"?c(x,y,z,Math.atan2(y,x)):c,st)}
function lathe(P,cx,cy,z0,z1,rf,c,st){st=st||.25;for(let z=z0;z<z1;z+=st){const r=rf(z);for(let x=-r;x<=r;x+=st)for(let y=-r;y<=r;y+=st){const d=Math.hypot(x,y);if(d<=r&&d>r-.6)P(cx+x,cy+y,z,typeof c==="function"?c(x,y,z,Math.atan2(y,x)):c,st)}}}
const K="#1b1b1b",K2="#2e2e2e",Wt="#f5f5f5",W2="#dcdcdc",GY="#8a8a8a";
/* チェスの駒（king/queen/pawn/knight） */
function piece(P,cx,cy,z0,s,kind,c,c2){const st=.25*Math.max(.5,Math.min(1,s));
 const prof={king:[[0,1],[.12,.95],[.2,.6],[.6,.45],[.7,.6],[.78,.5],[.85,.35]],queen:[[0,1],[.12,.95],[.2,.6],[.6,.42],[.7,.58],[.82,.45]],pawn:[[0,.9],[.12,.85],[.2,.55],[.45,.35],[.55,.5],[.62,.5]],rook:[[0,.95],[.12,.9],[.2,.6],[.6,.6],[.7,.75],[.8,.75]],knight:[[0,1],[.12,.95],[.2,.6],[.35,.55]]}[kind];
 const top=prof[prof.length-1][0];for(let z=0;z<top;z+=st/(s*6)){let r=prof[0][1];for(let i=1;i<prof.length;i++)if(z<=prof[i][0]*1){const a=prof[i-1],b=prof[i];r=a[1]+(b[1]-a[1])*(z-a[0])/(b[0]-a[0]);break}
  const R=r*s,zz=z0+z*s*6;for(let x=-R;x<=R;x+=st)for(let y=-R;y<=R;y+=st)if(x*x+y*y<=R*R)P(cx+x,cy+y,zz,(Math.abs(z-.2)<.03)?c2:c,st)}
 const zt=z0+top*s*6;if(kind==="king"){for(let k=0;k<4;k++)P(cx-st/2,cy-st/2,zt+k*st,c2,st);for(const d of[-1,1])P(cx-st/2+d*st,cy-st/2,zt+2*st,c2,st)}
 if(kind==="queen")for(let a=0;a<6.28;a+=.8)P(cx+Math.cos(a)*.5*s-st/2,cy+Math.sin(a)*.5*s-st/2,zt,c2,st),ellV(P,cx,cy,zt+.2*s,.2*s,.2*s,.2*s,c2,st);
 if(kind==="pawn")ellV(P,cx,cy,zt+.4*s,.5*s,.5*s,.5*s,c,st);
 if(kind==="knight"){for(let z=0;z<2.6*s;z+=st)for(let y=-.5*s;y<=.5*s;y+=st)for(let x=-.35*s;x<=.35*s;x+=st){const neck=y>-.1*s-z*.15;const head=z>1.6*s&&y>-1.1*s;if(neck||head)P(cx+x,cy+y-z*.1,zt+z,c,st)}P(cx-.4*s,cy-.9*s,zt+2.1*s,c2,st)}}
const MONO={
 chess(P){cyl(P,3,3,0,.5,1.6,K);cyl(P,3,3,.5,5,.45,K2);for(let x=.75;x<5.25;x+=.25)for(let y=.75;y<5.25;y+=.25){const e=x<1.25||x>=4.75||y<1.25||y>=4.75;P(x,y,5,e?K:(((x-1.25)*2|0)+((y-1.25)*2|0))%2?K:Wt,.25)}
  piece(P,2,2,5.25,.28,"king",Wt,W2);piece(P,3.6,3.4,5.25,.25,"queen",K,GY);piece(P,2.6,4,5.25,.2,"pawn",Wt,W2);piece(P,4,2.2,5.25,.2,"pawn",K,GY)},
 vase(P){cyl(P,3,3,0,.5,1.3,K);lathe(P,3,3,.5,8,z=>z<1?.9:z<5?.9+Math.sin((z-1)/4*Math.PI)*1.4:z<7?.75:.75+(z-7)*.6,(x,y,z,a)=>(Math.sin(a*3+z*1.3)>.85||Math.sin(a*5-z*.7)>.93)?K:(z>7.5?K:Wt),.25);for(let k=0;k<5;k++)for(let t=0;t<6;t++)P(3+Math.cos(k*1.25)*(.3+t*.12),3+Math.sin(k*1.25)*(.3+t*.12),8+t*.4,t>4?Wt:K2,.25)},
 umbrella(P){/* 白黒の傘立てとステッキ */lathe(P,3,3,0,3.5,z=>1.4,(x,y,z,a)=>((a*4+6.3)|0)%2?K:Wt,.25);cyl(P,3,3,0,.25,1.4,K,.25);for(let a=0;a<6.28;a+=.1)P(3+Math.cos(a)*1.4,3+Math.sin(a)*1.4,3.5,K,.25);
  for(const[ox,oy,c,h]of[[2.4,2.6,K,9],[3.5,3.4,Wt,8.2]]){for(let z=1;z<h;z+=.25){const r=z<2.5?.2+(z-1)*.25:Math.max(.15,.6-(z-2.5)*.07);for(let a=0;a<6.28;a+=.5)P(ox+Math.cos(a)*r,oy+Math.sin(a)*r,z,c===K?((a*2|0)%2?K:K2):((a*2|0)%2?Wt:W2),.25)}
   for(let t=0;t<6;t++){const a=t/5*Math.PI;P(ox+Math.sin(a)*.45,oy,h+(1-Math.cos(a))*.3+ (t<1?0:0),c===K?"#bdbdbd":K,.25)}}
  for(let z=.5;z<9.5;z+=.25)P(3.7,2.3,z,K2,.25);for(let t=0;t<4;t++)P(3.7-t*.25,2.3,9.5,"#d4af37",.25)},
 musicbox(P){cyl(P,3,3,0,.5,2.4,K);cyl(P,3,3,.5,.75,2.2,Wt,.25);
  const body=(x,y)=>{const u=x-1.2,v=y-1.6;return u>=0&&u<=3.6&&v>=0&&v<=2.6&&!(u>1.8&&Math.hypot(u-1.8,v-1.3)>1.4&&v>1.3)};
  for(let x=1;x<5;x+=.25)for(let y=1.4;y<4.4;y+=.25)if(body(x,y)){for(let z=2.5;z<3.5;z+=.25)P(x,y,z,K,.25)}
  for(let x=1.2;x<3;x+=.25){P(x,1.4,3.25,(x*4|0)%2?Wt:K,.25);P(x,1.4,3.5,Wt,.25)}for(const[x,y]of[[1.5,1.8],[4.2,2.4],[2.6,3.9]])for(let z=.75;z<2.5;z+=.25)P(x,y,z,K,.25);
  for(let t=0;t<10;t++){const x=1.4+t*.3;for(let y=1.8;y<4;y+=.25)if(body(x,y))P(x,y+t*.0,3.5+t*.18+(y-1.8)*.6,K2,.25)}P(3,1.2,1.2,"#d4af37",.25)},
 photo(P){for(let y=.75;y<5.25;y+=.25)for(let z=7;z<12.5;z+=.25){const e=y<1.25||y>=4.75||z<7.5||z>=12;let c=K;if(!e){const u=(y-3)/1.7,v=(z-9.6)/2.3;c=v<-.55?"#6e6e6e":Math.hypot(u,v-.25)<.42?"#d6d6d6":(Math.abs(u)<.65&&v<.05&&v>-.6)?"#3a3a3a":"#a8a8a8";if(Math.hypot(u,v-.35)<.3&&u>0)c="#f0f0f0"}P(.25,y,z,c,.25)}for(let y=.75;y<5.25;y+=.25)P(.5,y,12,"#d4d4d4",.25)},
 flamp(P){cyl(P,3,3,0,.5,1.2,K);cyl(P,3,3,.5,11,.2,K,.25);lathe(P,3,3,11,13.5,z=>1.7-(z-11)*.25,Wt,.25);for(let x=-1.4;x<=1.4;x+=.25)for(let y=-1.4;y<=1.4;y+=.25)if(x*x+y*y<1.9)P(3+x,3+y,11,"#fff8d6",.25);cyl(P,3,3,13.5,13.75,1.1,K,.25)},
 zebra(P){for(let x=0;x<6;x+=.25)for(let y=0;y<6;y+=.25){const u=(x-3)/3,v=(y-3)/2.6,r=u*u+v*v+.25*Math.sin(Math.atan2(v,u)*5)*.3;if(r>1)continue;const s=Math.sin((x*1.6+Math.sin(y*1.3)*1.2)*1.9);P(x,y,0,s>0?K:Wt,.25)}},
 cage(P){cyl(P,3,3,0,.5,1.1,K);cyl(P,3,3,.5,6,.2,K,.25);cyl(P,3,3,6,6.25,1.8,K,.25);
  for(let a=0;a<6.28;a+=.35)for(let z=6.25;z<10.5;z+=.25){const r=z<9?1.8:1.8*Math.cos((z-9)/1.6*Math.PI/2);P(3+Math.cos(a)*r,3+Math.sin(a)*r,z,K,.25)}for(let a=0;a<6.28;a+=.12)P(3+Math.cos(a)*1.8,3+Math.sin(a)*1.8,8,K,.25);for(let z=10.5;z<11.5;z+=.25)P(3,3,z,K,.25);
  for(let x=2.2;x<3.8;x+=.25)P(x,3,7.2,"#bdbdbd",.25);ellV(P,3,3,7.9,.45,.35,.4,Wt,.25);ellV(P,2.65,3,8.35,.25,.25,.25,Wt,.125);P(2.4,3,8.4,"#424242",.125);for(let t=0;t<3;t++)P(3.4+t*.2,3,7.8-t*.1,Wt,.25)},
 king(P){cyl(P,3,3,0,.5,2,K);piece(P,3,3,.5,1.25,"king",K,"#555")},
 torso(P){cyl(P,3,3,0,.5,1.3,K);cyl(P,3,3,.5,5,.2,K,.25);
  for(let z=5;z<10.5;z+=.25){const w=z<7?1.15+(z-5)*.05:z<9.5?1.25+(z-7)*.12:1.55-(z-9.5)*.9,d=.7;for(let x=-w;x<=w;x+=.25)for(let y=-d;y<=d;y+=.25){if((x/w)**2+(y/d)**2>1)continue;const front=y<-d*.55;let c=K;if(front&&Math.abs(x)<.45-(z<8?0:(z-8)*.05)&&z>6.2)c=Wt;if(front&&Math.abs(x)<.12&&z>6.5&&z<8)c=(z*4|0)%2?"#9e9e9e":Wt;P(3+x,3+y,z,c,.25)}}
  for(let x=-.5;x<=.5;x+=.25)P(3+x,2.2,9.4-Math.abs(x)*.3,K,.25);cyl(P,3,3,10.5,11.5,.4,Wt,.25);for(const d of[-1,1])P(3+d*.6,2.25,6.8,"#9e9e9e",.25)},
 artpanel(P){for(let y=.5;y<5.5;y+=.25)for(let z=6.5;z<13;z+=.25){const e=y<.75||y>=5.25||z<6.75||z>=12.75;const u=y-3,v=z-9.75;let c=Wt;if(e)c=K;else if(Math.hypot(u+.6,v-1)<1.3)c=K;else if(Math.abs(u-v*.8-.5)<.35)c=K;else if(u>.6&&v<-.8)c="#bdbdbd";else if(Math.hypot(u-1,v-1.6)<.55)c="#7a7a7a";P(.25,y,z,c,.25)}},
 tilebase(P){box(P,1,1,0,5,5,4,(x,y,z)=>((x|0)+(y|0)+(z|0))%2?K:Wt,.5);box(P,.75,.75,4,5.25,5.25,4.5,K,.25);
  for(let t=0;t<44;t++){const a=t*.4,r=1.1-t*.02,z=4.5+t*.12;ellV(P,3+Math.cos(a)*r,3+Math.sin(a)*r,z,.35,.35,.3,Wt,.25)}ellV(P,3,3,10.1,.55,.55,.55,Wt,.25)},
 kingL(P){/* ボーナスA：巨大なチェスのキング像（1マス・高さ3マス） */box(P,.5,.5,0,5.5,5.5,1,(x,y)=>((x|0)+(y|0))%2?K:Wt,.5);piece(P,3,3,1,2.45,"king",K,"#4a4a4a")},
 chandelier(P){/* ボーナスB：黒いシャンデリアとテーブルセット（2×2） */const C=[6,6];cyl(P,6,6,0,.5,1.4,K);cyl(P,6,6,.5,5,.35,K,.25);cyl(P,6,6,5,5.5,2.6,Wt,.25);for(let a=0;a<6.28;a+=.08)P(6+Math.cos(a)*2.6,6+Math.sin(a)*2.6,5,K,.25);
  for(const[a]of[[0],[1.57],[3.14],[4.71]]){const cx=6+Math.cos(a)*4,cy=6+Math.sin(a)*4;box(P,cx-1,cy-1,3,cx+1,cy+1,3.5,K,.25);for(const[dx,dy]of[[-1,-1],[.75,-1],[-1,.75],[.75,.75]])for(let z=0;z<3;z+=.25)P(cx+dx,cy+dy,z,K,.25);const bx=cx+Math.cos(a)*.9,by=cy+Math.sin(a)*.9;for(let z=3.5;z<7;z+=.25)for(let t=-.75;t<=.75;t+=.25)P(bx-Math.sin(a)*t,by+Math.cos(a)*t,z,z>6.5||Math.abs(t)>.6?K:"#e0e0e0",.25)}
  for(let z=13;z<24;z+=.5)P(5.75,5.75,z,K,.5);cyl(P,6,6,12,12.5,.6,K,.25);for(let k=0;k<8;k++){const a=k*.785;for(let t=0;t<10;t++){const r=.5+t*.3,z=12-Math.sin(t/9*Math.PI)*1.2;P(6+Math.cos(a)*r,6+Math.sin(a)*r,z,K,.25)}const x=6+Math.cos(a)*3.4,y=6+Math.sin(a)*3.4;for(let z=12;z<13;z+=.25)P(x,y,z,Wt,.25);P(x,y,13.25,"#ffe082",.25)}
  for(const[x,y]of[[5.4,5.6],[6.6,6.4]]){for(let z=5.5;z<6.5;z+=.25)P(x,y,z,"#e0e0e0",.25)}},
 chessfloor(P){/* ボーナスC：白黒のチェス盤の床と大きな駒（2×2） */for(let x=0;x<12;x+=.5)for(let y=0;y<12;y+=.5)P(x,y,0,((x/1.5|0)+(y/1.5|0))%2?K:Wt)
  piece(P,3.75,3.75,.5,1.15,"king",Wt,W2);piece(P,8.25,8.25,.5,1.05,"queen",K,GY);piece(P,3.75,8.25,.5,.85,"knight",K,GY);piece(P,8.25,3.75,.5,.85,"rook",Wt,W2);for(const[x,y,c]of[[.75,5.25,Wt],[5.25,.75,Wt],[11.25,6.75,K],[6.75,11.25,K]])piece(P,x,y,.5,.6,"pawn",c,c===K?GY:W2)},
};
