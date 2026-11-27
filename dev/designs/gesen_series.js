/* ゲーセンシリーズ（新規3種＋ボーナス）見本。1マス=6、ボクセル0.5、原点はマスの角 */
function boxV(P,x0,y0,z0,w,d,h,c,cTop){for(let x=x0;x<x0+w;x+=.5)for(let y=y0;y<y0+d;y+=.5)for(let z=z0;z<z0+h;z+=.5){const top=z+.5>=z0+h;P(x,y,z,top&&cTop?cTop:c)}}
const GESEN={
 purikura(P){boxV(P,.5,1,0,5,4.5,13,"#f8bbd0");boxV(P,.5,1,13,5,4.5,.5,"#ec407a");
  for(let x=.5;x<5.5;x+=.5)for(let z=9;z<12.5;z+=.5)P(x,.5,z,(x*2)%2?"#ffeb3b":"#ff80ab");
  for(let x=1;x<5;x+=.5)for(let z=.5;z<9;z+=.5)P(x,.5,z,((x*2)|0)%2?"#e1bee7":"#ce93d8");
  for(const[x,z]of[[1.5,10],[3,10.5],[4.5,10]])P(x,0,z,"#ffffff")},
 punch(P){boxV(P,1,2,0,4,3,8,"#37474f");boxV(P,1,2,8,4,3,5,"#263238");for(let x=1.5;x<4.5;x+=.5)for(let z=9;z<12;z+=.5)P(x,1.5,z,z>11?"#ff1744":(z>10?"#ffea00":"#00e676"));
  boxV(P,2,0,4,2,2,.5,"#455a64");for(let x=1.75;x<4.25;x+=.5)for(let y=-.25;y<1.75;y+=.5)for(let z=4.5;z<6.5;z+=.5)if(Math.hypot(x+.25-3,y+.25-.75,z+.25-5.5)<1.2)P(x,y,z,"#d32f2f")},
 medal(P){boxV(P,0,.5,0,6,5,6,"#1565c0");boxV(P,.5,1,6,5,4,4,"#bbdefb");for(let x=.5;x<5.5;x+=.5)for(let y=1;y<5;y+=.5)if(((x+y)*2)%3<1)P(x,y,6.5,"#ffd54f");
  for(let x=.5;x<5.5;x+=.5)P(x,.5,10,"#f44336"),P(x,.5,10.5,"#ffeb3b");boxV(P,0,.5,10.5,6,5,.5,"#0d47a1");for(let x=1;x<5;x+=1)P(x,.5,3,"#ffca28")},
 hockey(P){/* 1×2マス（横6×奥12） */for(const[lx,ly]of[[.5,.5],[5,.5],[.5,11],[5,11]])for(let z=0;z<4;z+=.5)P(lx,ly,z,"#424242");
  boxV(P,0,0,4,6,12,1,"#1e88e5");for(let x=.5;x<5.5;x+=.5)for(let y=.5;y<11.5;y+=.5){const c=Math.abs(y-5.75)<.3?"#e53935":(Math.hypot(x+.25-3,y+.25-6)<1.6&&Math.hypot(x+.25-3,y+.25-6)>1.2?"#e53935":"#e3f2fd");P(x,y,5,c)}
  for(let x=0;x<6;x+=.5){P(x,0,5,"#1565c0");P(x,11.5,5,"#1565c0")}for(let y=0;y<12;y+=.5){P(0,y,5,"#1565c0");P(5.5,y,5,"#1565c0")}
  for(let x=2;x<4;x+=.5){P(x,0,5,"#212121");P(x,11.5,5,"#212121")}
  const mal=(cx,cy,c)=>{for(let x=-.75;x<.8;x+=.5)for(let y=-.75;y<.8;y+=.5)if(Math.hypot(x+.25,y+.25)<1)P(cx+x,cy+y,5.5,c);P(cx-.25,cy-.25,6,c)};mal(3,2.5,"#e53935");mal(3,9.5,"#fdd835");P(3.5,6.75,5.5,"#212121",.5)}
};
