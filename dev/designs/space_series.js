/* 宇宙シリーズ（新規5種＋ボーナス）見本。1マス=6、ボクセル0.5 */
function ellV(P,cx,cy,cz,rx,ry,rz,c){for(let x=-rx;x<=rx;x+=.5)for(let y=-ry;y<=ry;y+=.5)for(let z=-rz;z<=rz;z+=.5)if((x/rx)**2+(y/ry)**2+(z/rz)**2<=1)P(cx+x,cy+y,cz+z,typeof c==="function"?c(x,y,z):c)}
const SPACE={
 rocket(P){for(let x=1.5;x<4.5;x+=.5)for(let y=1.5;y<4.5;y+=.5)P(x,y,0,"#455a64");
  for(let z=.5;z<11;z+=.5){const r=z<9?1.1:1.1*(11-z)/2;for(let x=-1.5;x<1.5;x+=.5)for(let y=-1.5;y<1.5;y+=.5)if(Math.hypot(x+.25,y+.25)<=r)P(3+x,3+y,z,z>=9?"#e53935":(z>=6&&z<6.5?"#e53935":"#f5f5f5"))}
  for(const[dx,dy]of[[1.5,0],[-1.5,0],[0,1.5],[0,-1.5]])for(let z=.5;z<3;z+=.5)P(2.75+dx,2.75+dy,z,"#e53935");P(2.75,1.75,7.5,"#4fc3f7");P(2.75,1.75,8,"#4fc3f7");P(1.75,2.75,7.5,"#4fc3f7")},
 telescope(P){for(const[a,b]of[[1,1],[5,1],[3,5]])for(let t=0;t<1;t+=.08)P(3+(a-3)*t-.25,3+(b-3)*t-.25,6-6*t,"#6d4c41");
  for(let t=-3;t<3.5;t+=.25){const x=3+t*.55,y=3+t*.25,z=7.5+t*.55,r=t>2.5?.75:.5;for(let a=-r;a<=r;a+=.5)for(let b=-r;b<=r;b+=.5)P(x+a-.25,y+b-.25,z,t>2.5?"#263238":"#eceff1")}
  P(2.75,2.75,6,"#37474f");P(2.75,2.75,6.5,"#37474f")},
 meteor(P){for(let x=.5;x<5.5;x+=.5)for(let y=.5;y<5.5;y+=.5)for(let z=0;z<3;z+=.5)P(x,y,z,z===2.5?"#212121":"#37474f");
  ellV(P,3,3,4.6,1.5,1.3,1.3,(x,y,z)=>((x*3+y*5+z*7)|0)%4===0?"#ff7043":(((x+y+z)*2|0)%2?"#5d4037":"#4e342e"));
  for(let x=.5;x<5.5;x+=.5)for(let y=.5;y<5.5;y+=.5)for(let z=3;z<7;z+=.5){const ex=(x===.5||x===5),ey=(y===.5||y===5),ez=z===6.5;if((ex&&ey)||(ez&&(ex||ey)))P(x,y,z,"#b3e5fc",.5)}},
 rover(P){for(let x=1;x<5;x+=.5)for(let y=1.5;y<4.5;y+=.5)P(x,y,1.5,"#b0bec5");for(let x=1.5;x<4.5;x+=.5)for(let y=2;y<4;y+=.5)P(x,y,2,"#ffd54f");
  for(const[x,y]of[[1,1],[2.75,1],[4.5,1],[1,4.5],[2.75,4.5],[4.5,4.5]])for(let z=0;z<1.5;z+=.5)P(x,y,z,"#424242"),P(x,y-.0,z,"#424242");
  for(let z=2.5;z<5;z+=.5)P(4,3,z,"#90a4ae");for(let a=-1;a<1.5;a+=.5)for(let b=-1;b<1.5;b+=.5)if(Math.hypot(a,b)<1.2)P(4+a*.3,3+a*.0+b,5+a*.5,"#eceff1");
  for(let x=1.5;x<3;x+=.5)for(let y=2;y<4;y+=.5)P(x,y,2.5,"#1a237e");P(1.25,2.75,3,"#90a4ae");P(1.25,2.75,3.5,"#263238")},
 alien(P){for(let x=1.5;x<4.5;x+=.5)for(let y=1.5;y<4.5;y+=.5)P(x,y,0,"#212121");
  const G="#7cb342",G2="#689f38";for(let z=.5;z<3;z+=.5){P(2.5,2.5,z,G2);P(3,3,z,G2)}ellV(P,2.75,2.75,4,.9,.8,1.2,G);for(const y of[1.75,3.75])for(let z=3.5;z<5;z+=.5)P(2.5,y,z,G2);
  ellV(P,2.75,2.75,7,1.7,1.5,1.6,G);for(const x of[1.75,3.25])for(let z=6.5;z<8;z+=.5)for(let dx=0;dx<1;dx+=.5)P(x+dx,1.25,z,"#111");P(2.75,1.25,6,"#33691e")},
 lander(P){/* 2×2マス（12×12）。脚4本で立つ金色の着陸船と、月面と旗 */for(let x=0;x<12;x+=.5)for(let y=0;y<12;y+=.5)P(x,y,0,(((x*3+y*7)|0)%5===0)?"#9e9e9e":"#bdbdbd");
  for(const[x,y,r]of[[2,9,1.2],[9.5,2.5,1]])for(let a=-r;a<r;a+=.5)for(let b=-r;b<r;b+=.5)if(Math.hypot(a,b)<r)P(x+a,y+b,0,"#8d8d8d");
  for(const[lx,ly]of[[2.5,2.5],[8.5,2.5],[2.5,8.5],[8.5,8.5]])for(let t=0;t<1;t+=.1){P(lx+(5.5-lx)*t*.5-.25,ly+(5.5-ly)*t*.5-.25,.5+t*4,"#cfd8dc")}
  for(const[lx,ly]of[[2.5,2.5],[8.5,2.5],[2.5,8.5],[8.5,8.5]])P(lx-.25,ly-.25,.5,"#90a4ae");
  for(let x=3.5;x<8.5;x+=.5)for(let y=3.5;y<8.5;y+=.5)for(let z=4.5;z<7;z+=.5)P(x,y,z,((x+z)*2|0)%2?"#ffb300":"#ffca28");
  for(let x=4.5;x<7.5;x+=.5)for(let y=4.5;y<7.5;y+=.5)for(let z=7;z<9.5;z+=.5)P(x,y,z,"#eceff1");P(4.25,5.75,8.25,"#263238");P(4.25,6.25,8.25,"#263238");
  for(let z=0;z<7;z+=.5)P(1.5,9.5,z,"#e0e0e0");for(let x=1.5;x<4.5;x+=.5)for(let z=5;z<7;z+=.5)P(x+.5,9.5,z,"#ffd54f");P(3,9.5,6,"#ffffff");P(2.75,9.5,5.75,"#ffffff",.25);P(3.25,9.5,5.75,"#ffffff",.25)}
};
