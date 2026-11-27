/* 観葉植物5種＋ヤシの木（植物シリーズ）見本。1マス=6、ボクセル0.5。原点はマスの角 */
function potVox(P,c1,c2,h){h=h||3;for(let x=1;x<5;x+=.5)for(let y=1;y<5;y+=.5){const d=Math.hypot(x+.25-3,y+.25-3);if(d>2)continue;for(let z=0;z<h;z+=.5){const rim=z+.5>=h;if(d<1.5&&!rim)continue;P(x,y,z,rim?c2:(z<.5?c2:c1))}if(d<1.6)P(x,y,h-.5,"#4e342e")}}
function leafDisc(P,cx,cy,cz,r,c,c2,slit){for(let x=-r;x<r;x+=.5)for(let y=-r;y<r;y+=.5){const d=Math.hypot(x+.25,y+.25);if(d>r)continue;if(slit&&d>r*.45&&Math.floor((Math.atan2(y,x)+3.2)*2.2)%2===0)continue;P(cx+x,cy+y,cz+(d/r)*-.5,d<r*.25?c2:c)}}
function stem(P,x0,y0,z0,x1,y1,z1,c){const n=Math.ceil(Math.hypot(x1-x0,y1-y0,z1-z0)/.4);for(let i=0;i<=n;i++){const t=i/n;P(x0+(x1-x0)*t-.25,y0+(y1-y0)*t-.25,z0+(z1-z0)*t,c)}}
const PLANTS={
 monstera(P){potVox(P,"#f2f2f2","#e0e0e0",3);const L=[[1.2,1.5,6,1.8],[4.8,1.8,7,1.9],[3,5,8,2.1],[1.5,4.2,9,1.6],[4.5,4.5,10,1.7]];L.forEach(([x,y,z,r])=>{stem(P,3,3,3,x,y,z,"#4e7a3a");leafDisc(P,x,y,z,r,"#2e7d32","#1b5e20",1)})},
 pachira(P){potVox(P,"#4e342e","#3e2723",3);for(let z=3;z<10;z+=.5){const s=Math.sin(z*1.6)*.5;P(2.75+s,2.75,z,"#8d6e63");P(3.25-s,3.25,z,"#a1887f")}
  [[3,3,11],[1.5,2.5,10],[4.5,3.5,10.5],[2.5,4.5,11.5]].forEach(([x,y,z])=>{for(let k=0;k<5;k++){const a=k*1.256;for(let t=.5;t<2.2;t+=.5)P(x+Math.cos(a)*t,y+Math.sin(a)*t,z-t*.25,"#43a047")}})},
 sansevieria(P){potVox(P,"#263238","#37474f",3);[[2,2,9],[3,1.8,10.5],[4,2.4,8.5],[1.8,3.4,10],[3.2,3.2,11.5],[4.2,3.8,9.5],[2.6,4.2,8.8],[3.8,4.6,10]].forEach(([x,y,h])=>{for(let z=3;z<h;z+=.5){const tip=z>h-1;P(x,y,z,tip?"#9ccc65":(z%1.5<.5?"#cddc39":"#33691e"));if(!tip&&z<h-2)P(x+.5,y,z,"#2e7d32")}})},
 rubber(P){potVox(P,"#9e9e9e","#757575",3);for(let z=3;z<12;z+=.5)P(2.75,2.75,z,"#6d4c41");
  [[1,1.5,5],[4.8,2.5,6.5],[1.5,4.5,8],[4.5,4.8,9.5],[3,1,10.5],[3,3.5,12]].forEach(([x,y,z])=>{stem(P,3,3,z-1,x,y,z,"#5d4037");for(let a=-1.2;a<1.3;a+=.5)for(let b=-.75;b<1;b+=.5)P(x+a*.6+b*.3,y+b*.6-a*.3,z,Math.abs(a)<.4&&Math.abs(b)<.4?"#33691e":"#1b3d1c")})},
 umbellata(P){potVox(P,"#c8a46a","#b08d55",3);for(let z=3;z<13;z+=.5)P(2.75+Math.sin(z*.4)*.25,2.75,z,"#8d6e63");
  [[1,2,12.5,1.6],[4.8,2,13.5,1.7],[3,4.8,14,1.8],[1.8,4,15,1.5],[4.2,4.5,15.5,1.4],[3,1.2,14.8,1.5]].forEach(([x,y,z,r])=>{stem(P,3,3,z-1.5,x,y,z,"#6d8f3f");for(let a=-r;a<r;a+=.5)for(let b=-r;b<r;b+=.5){const hx=Math.abs(a+.25),by=b+.25;if(Math.hypot(hx-r*.35,by-r*.2)<r*.7||(by<0&&hx<r*.9-Math.abs(by)*.9))P(x+a,y+b,z,"#7cb342")}})},
 palm(P){potVox(P,"#6d4c41","#5d4037",3.5);let x=3,y=3;for(let z=3.5;z<20;z+=.5){x+=.06;y+=.02;const ring=Math.floor(z/1.5)%2;for(let a=-.5;a<1;a+=.5)for(let b=-.5;b<1;b+=.5)if(Math.abs(a)+Math.abs(b)<1)P(x+a-.25,y+b-.25,z,ring?"#8d6e63":"#795548")}
  for(let k=0;k<9;k++){const ang=k*.698,ln=6.5+(k%2);for(let t=0;t<ln;t+=.5){const px=x+Math.cos(ang)*t,py=y+Math.sin(ang)*t,pz=21.5+Math.min(1.5,t*.4)-Math.max(0,t-3)*.45;P(px,py,Math.min(23.5,pz),t<.6?"#558b2f":"#689f38");const w=Math.max(0,1.2-t*.12);for(let s=.5;s<=w;s+=.5){P(px-Math.sin(ang)*s,py+Math.cos(ang)*s,Math.min(23.5,pz-.25),"#7cb342");P(px+Math.sin(ang)*s,py-Math.cos(ang)*s,Math.min(23.5,pz-.25),"#7cb342")}}}}
};
