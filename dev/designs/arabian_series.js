/* アラビアンシリーズ（新規5種＋ボーナス）見本。1マス=6、ボクセル0.5 */
function ellV(P,cx,cy,cz,rx,ry,rz,c){for(let x=-rx;x<=rx;x+=.5)for(let y=-ry;y<=ry;y+=.5)for(let z=-rz;z<=rz;z+=.5)if((x/rx)**2+(y/ry)**2+(z/rz)**2<=1)P(cx+x,cy+y,cz+z,typeof c==="function"?c(x,y,z):c)}
const ARAB={
 cushions(P){/* 床に敷いたラグの上に、四角いクッションを3枚重ね＋立てかけ。四隅に金のふさ、ひし形の刺しゅう */
  for(let x=0;x<6;x+=.5)for(let y=0;y<6;y+=.5){const e=x<.5||y<.5||x>=5.5||y>=5.5;P(x,y,0,e?"#d4af37":(((x+y)*2|0)%4===0?"#ffb300":"#8e1b1b"))}
  const sq=(x0,y0,z0,w,d,h,c,c2)=>{for(let x=x0;x<x0+w;x+=.5)for(let y=y0;y<y0+d;y+=.5)for(let z=z0;z<z0+h;z+=.5){const cx=x+.25-(x0+w/2),cy=y+.25-(y0+d/2);const dia=Math.abs(Math.abs(cx)+Math.abs(cy)-w*.3)<.3&&z+.5>=z0+h;P(x,y,z,dia?c2:c)}
   for(const[tx,ty]of[[x0,y0],[x0+w-.5,y0],[x0,y0+d-.5],[x0+w-.5,y0+d-.5]])P(tx,ty,z0+h-.5,"#ffd54f")};
  sq(.5,.5,.5,4.5,4.5,1,"#1a237e","#ffd54f");sq(1,1,1.5,4,4,1,"#b71c1c","#ffd54f");sq(1.5,1.5,2.5,3,3,1,"#00695c","#ffd54f");
  for(let y=1;y<5;y+=.5)for(let z=1;z<5;z+=.5){const cy=y+.25-3,cz=z+.25-3;P(5,y,z,Math.abs(Math.abs(cy)+Math.abs(cz)-1.2)<.3?"#ffd54f":"#6a1b9a")}},
 spice(P){/* 低い木の台に、編みかごが2×2で並び、それぞれとがった山盛りのスパイス */
  for(let x=0;x<6;x+=.5)for(let y=0;y<6;y+=.5){P(x,y,0,"#6d4c41");P(x,y,.5,"#8d6e63")}
  const B=[[1.6,1.6,"#d32f2f"],[4.4,1.6,"#fdd835"],[1.6,4.4,"#ff8f00"],[4.4,4.4,"#7cb342"]];
  B.forEach(([x,y,c])=>{for(let a=-1.5;a<1.5;a+=.5)for(let b=-1.5;b<1.5;b+=.5){const d=Math.hypot(a+.25,b+.25);if(d>1.35)continue;for(let z=1;z<2.5;z+=.5){if(d<.9&&z<2)continue;P(x+a,y+b,z,((a+b+z)*2|0)%2?"#d7b58a":"#c19a6b")}}
   for(let z=2.5;z<5;z+=.5){const r=1.1*(5-z)/2.5;for(let a=-1.5;a<1.5;a+=.5)for(let b=-1.5;b<1.5;b+=.5)if(Math.hypot(a+.25,b+.25)<=r+.15)P(x+a,y+b,z,c)}P(x-.25,y-.25,5,c)});
  for(let t=0;t<3;t++)P(2.5+t*.5,3,2+t*.3,"#bdbdbd",.5)},
 mashrabiya(P){/* 壁アイテム：x=0が壁。玉ねぎ型アーチの木の格子窓 */for(let y=.5;y<5.5;y+=.25)for(let z=6;z<17;z+=.25){const cy=y+.125-3,top=z>13?13+ (2.6-Math.abs(cy))*1.4- (2.6-Math.abs(cy))**2*.18:99;if(Math.abs(cy)>2.5||z>Math.min(16.5,top+1.6))continue;const frame=Math.abs(cy)>2.2||z<6.5||z>Math.min(16.2,top+1.3);const lat=((Math.round((cy+z)*2))%2===0)||((Math.round((cy-z)*2))%2===0);P(.25,y,z,frame?"#5d4037":(lat?"#8d6e63":"#ffe0b2"),.25)}},
 pillarA(P){/* 青いモザイクタイルの柱（高さ4マス） */for(let z=0;z<24;z+=.5){const cap=z<1.5||z>=22;const r=cap?2:1.4;for(let x=-2;x<2;x+=.5)for(let y=-2;y<2;y+=.5){if(Math.max(Math.abs(x+.25),Math.abs(y+.25))>r)continue;const m=((x*2+y*2+z*2)|0)%3;P(3+x,3+y,z,cap?"#d4af37":(m===0?"#0277bd":(m===1?"#4fc3f7":"#e1f5fe")))}}},
 pillarB(P){/* 砂岩のアラベスク柱（高さ4マス） */for(let z=0;z<24;z+=.5){const cap=z<1.5||z>=22;const r=cap?2:1.3;for(let x=-2;x<2;x+=.5)for(let y=-2;y<2;y+=.5){const d=Math.hypot(x+.25,y+.25);if(d>r+.2)continue;const pat=!cap&&(((Math.atan2(y,x)*3+z)|0)%4===0);P(3+x,3+y,z,cap?"#bf9b6a":(pat?"#a1887f":"#e6cfa3"))}}},
 oasis(P){/* 2×2マス：砂の上に小さな泉とヤシ2本 */for(let x=0;x<12;x+=.5)for(let y=0;y<12;y+=.5){const d=Math.hypot(x+.25-6.5,y+.25-6.5);P(x,y,0,d<3?"#29b6f6":(d<3.6?"#bcaaa4":"#f3d9a4"));if(d<3.6&&d>=3)P(x,y,.5,"#a1887f")}
  for(const[x,y]of[[6.5,6.5]])P(x-.25,y-.25,.5,"#e1f5fe");
  const palm=(bx,by,h)=>{let x=bx,y=by;for(let z=0;z<h;z+=.5){x+=.08;P(x-.25,y-.25,z,((z*2)|0)%3?"#8d6e63":"#795548")}for(let k=0;k<7;k++){const a=k*.9;for(let t=0;t<4;t+=.5)P(x+Math.cos(a)*t-.25,y+Math.sin(a)*t-.25,h+.5-Math.max(0,t-1.5)*.5,"#7cb342")}};palm(2.5,2.5,10);palm(9.5,3.5,8);
  for(const[x,y]of[[2,9],[10,10]])ellV(P,x,y,.8,.8,.8,.6,"#9e9e9e")}
};
