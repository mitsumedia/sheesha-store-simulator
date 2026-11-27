/* アラビアンシリーズ（新規5種＋ボーナス）見本。1マス=6、ボクセル0.5 */
function ellV(P,cx,cy,cz,rx,ry,rz,c){for(let x=-rx;x<=rx;x+=.5)for(let y=-ry;y<=ry;y+=.5)for(let z=-rz;z<=rz;z+=.5)if((x/rx)**2+(y/ry)**2+(z/rz)**2<=1)P(cx+x,cy+y,cz+z,typeof c==="function"?c(x,y,z):c)}
const ARAB={
 cushions(P){const L=[[2,2,.75,1.6,"#b71c1c"],[4,2.2,.75,1.5,"#1a237e"],[2.6,4.2,.75,1.6,"#00695c"],[4.4,4.3,.75,1.3,"#6a1b9a"],[3,3,2.2,1.5,"#ef6c00"],[3.6,3.4,3.5,1.2,"#ad1457"]];
  L.forEach(([x,y,z,r,c])=>ellV(P,x,y,z,r,r,.8,(a,b,cz)=>(cz>.3&&Math.abs(Math.hypot(a,b)-r*.55)<.2)?"#ffd54f":(cz<-.3?"#00000000"&&c:c)));for(const[x,y,z]of[[2,2,1.75],[4,2.2,1.75],[3,3,3.2]])P(x-.25,y-.25,z,"#ffd54f")},
 spice(P){const B=[[1.8,1.8,"#d84315"],[4.2,1.8,"#fbc02d"],[1.8,4.2,"#8d6e63"],[4.2,4.2,"#e65100"],[3,3,"#2e7d32"]];
  B.forEach(([x,y,c],k)=>{const h=k===4?3:2;for(let a=-1;a<1.5;a+=.5)for(let b=-1;b<1.5;b+=.5)if(Math.hypot(a-.25,b-.25)<1.3)for(let z=k===4?1.5:0;z<(k===4?1.5:0)+h-.5;z+=.5){const e=Math.hypot(a-.25,b-.25)>.8;if(!e&&z<h-1)continue;P(x+a-.25,y+b-.25,z,e?"#a1887f":"#8d6e63")}
   ellV(P,x,y,(k===4?1.5:0)+h,1.2,1.2,1.1,c)});for(let z=0;z<1.5;z+=.5)P(2.75,2.75,z,"#6d4c41")},
 mashrabiya(P){/* 壁アイテム：x=0が壁。玉ねぎ型アーチの木の格子窓 */for(let y=.5;y<5.5;y+=.25)for(let z=6;z<17;z+=.25){const cy=y+.125-3,top=z>13?13+ (2.6-Math.abs(cy))*1.4- (2.6-Math.abs(cy))**2*.18:99;if(Math.abs(cy)>2.5||z>Math.min(16.5,top+1.6))continue;const frame=Math.abs(cy)>2.2||z<6.5||z>Math.min(16.2,top+1.3);const lat=((Math.round((cy+z)*2))%2===0)||((Math.round((cy-z)*2))%2===0);P(.25,y,z,frame?"#5d4037":(lat?"#8d6e63":"#ffe0b2"),.25)}},
 pillarA(P){/* 青いモザイクタイルの柱（高さ4マス） */for(let z=0;z<24;z+=.5){const cap=z<1.5||z>=22;const r=cap?2:1.4;for(let x=-2;x<2;x+=.5)for(let y=-2;y<2;y+=.5){if(Math.max(Math.abs(x+.25),Math.abs(y+.25))>r)continue;const m=((x*2+y*2+z*2)|0)%3;P(3+x,3+y,z,cap?"#d4af37":(m===0?"#0277bd":(m===1?"#4fc3f7":"#e1f5fe")))}}},
 pillarB(P){/* 砂岩のアラベスク柱（高さ4マス） */for(let z=0;z<24;z+=.5){const cap=z<1.5||z>=22;const r=cap?2:1.3;for(let x=-2;x<2;x+=.5)for(let y=-2;y<2;y+=.5){const d=Math.hypot(x+.25,y+.25);if(d>r+.2)continue;const pat=!cap&&(((Math.atan2(y,x)*3+z)|0)%4===0);P(3+x,3+y,z,cap?"#bf9b6a":(pat?"#a1887f":"#e6cfa3"))}}},
 oasis(P){/* 2×2マス：砂の上に小さな泉とヤシ2本 */for(let x=0;x<12;x+=.5)for(let y=0;y<12;y+=.5){const d=Math.hypot(x+.25-6.5,y+.25-6.5);P(x,y,0,d<3?"#29b6f6":(d<3.6?"#bcaaa4":"#f3d9a4"));if(d<3.6&&d>=3)P(x,y,.5,"#a1887f")}
  for(const[x,y]of[[6.5,6.5]])P(x-.25,y-.25,.5,"#e1f5fe");
  const palm=(bx,by,h)=>{let x=bx,y=by;for(let z=0;z<h;z+=.5){x+=.08;P(x-.25,y-.25,z,((z*2)|0)%3?"#8d6e63":"#795548")}for(let k=0;k<7;k++){const a=k*.9;for(let t=0;t<4;t+=.5)P(x+Math.cos(a)*t-.25,y+Math.sin(a)*t-.25,h+.5-Math.max(0,t-1.5)*.5,"#7cb342")}};palm(2.5,2.5,10);palm(9.5,3.5,8);
  for(const[x,y]of[[2,9],[10,10]])ellV(P,x,y,.8,.8,.8,.6,"#9e9e9e")}
};
