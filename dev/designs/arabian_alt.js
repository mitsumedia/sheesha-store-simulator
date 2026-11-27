/* アラビアンシリーズの入れ替え候補 見本 */
function ellV(P,cx,cy,cz,rx,ry,rz,c){for(let x=-rx;x<=rx;x+=.5)for(let y=-ry;y<=ry;y+=.5)for(let z=-rz;z<=rz;z+=.5)if((x/rx)**2+(y/ry)**2+(z/rz)**2<=1)P(cx+x,cy+y,cz+z,typeof c==="function"?c(x,y,z):c)}
const ALT={
 lamp(P){/* モロッコランプ（床置き）：細い金の台に、色ガラスのモザイクの玉 */for(let x=2;x<4;x+=.5)for(let y=2;y<4;y+=.5)P(x,y,0,"#b8860b");for(let z=.5;z<4;z+=.5)P(2.75,2.75,z,"#d4af37");
  const cols=["#e53935","#1e88e5","#fdd835","#43a047","#8e24aa"];ellV(P,3,3,6,1.8,1.8,2,(x,y,z)=>{const k=((x*2+3)|0)+((y*2+3)|0)*2+((z*2+4)|0)*3;return Math.abs(z)>1.5?"#d4af37":cols[k%5]});for(let z=8;z<9.5;z+=.5)P(2.75,2.75,z,"#d4af37")},
 tea(P){/* 真鍮のティーセット：丸いお盆、ポット、小さなグラス4つ（低いテーブルの上） */for(let x=.5;x<5.5;x+=.5)for(let y=.5;y<5.5;y+=.5){const d=Math.hypot(x+.25-3,y+.25-3);if(d<2.6){P(x,y,2.5,d>2.2?"#b8860b":"#d4af37")}}
  for(const[x,y]of[[1.5,1.5],[4,1.5],[1.5,4],[4,4]])for(let z=0;z<2.5;z+=.5)P(x,y,z,"#6d4c41");
  ellV(P,3,3,4,1,1,1,"#d4af37");for(let z=5;z<6;z+=.5)P(2.75,2.75,z,"#d4af37");P(2.75,2.75,6,"#b8860b");for(let t=0;t<4;t++)P(1.75-t*.3,2.75,3.8+t*.35,"#d4af37",.5);
  for(const[x,y]of[[4.3,2],[4.3,4],[2,4.6],[4,1.3]])for(let z=3;z<4.5;z+=.5)P(x,y,z,z<4?"#c62828":"#ffcdd2",.5)},
 carpet(P){/* 魔法のじゅうたん：床から浮いた、ふちが金のじゅうたん（ふさ付き） */for(let x=.5;x<5.5;x+=.5)for(let y=0;y<6;y+=.5){const z=3+Math.sin(y*.9)*.4;const e=x<1||x>=5||y<.5||y>=5.5;const pat=Math.abs(Math.abs(x+.25-3)+Math.abs(y+.25-3)-1.5)<.3;P(x,y,z,e?"#ffca28":(pat?"#ffca28":"#6a1b9a"))}
  for(let x=.5;x<5.5;x+=1){P(x,-.5,3+Math.sin(-.45)*.4,"#ffd54f");P(x,6,3+Math.sin(5.4)*.4,"#ffd54f")}for(const[x,y,z]of[[1,1,1.5],[4.5,4.5,1],[3,2,.8]])P(x,y,z,"#e1bee7",.25)},
 dallah(P){/* 金のアラビアンポット（ダラ）：くちばし形の注ぎ口、とがったふた */for(let x=1;x<5;x+=.5)for(let y=1;y<5;y+=.5)if(Math.hypot(x+.25-3,y+.25-3)<1.8)P(x,y,0,"#b8860b");
  for(let z=.5;z<9;z+=.5){const r=z<3?1.8-z*.1:(z<5?1.4-(z-3)*.35:(z<6?.7:.7+(z-6)*.25));for(let x=-2;x<2;x+=.5)for(let y=-2;y<2;y+=.5)if(Math.hypot(x+.25,y+.25)<=r)P(3+x,3+y,z,((z*2)|0)%4===0?"#b8860b":"#e6b422")}
  for(let z=9;z<11;z+=.5)P(2.75,2.75,z,"#e6b422");P(2.75,2.75,11,"#b8860b");for(let t=0;t<7;t++)P(1.5-t*.35,2.75,2+t*.9,"#e6b422",.5);for(let z=2;z<7;z+=.5)P(4.75,2.75,z,"#b8860b")},
 pyramid(P){/* 金色のピラミッドの模型 */for(let z=0;z<1;z+=.5)for(let x=.5;x<5.5;x+=.5)for(let y=.5;y<5.5;y+=.5)P(x,y,z,"#5d4037");
  for(let z=1;z<6;z+=.5){const r=2.5*(6-z)/5;for(let x=-2.5;x<2.5;x+=.5)for(let y=-2.5;y<2.5;y+=.5)if(Math.max(Math.abs(x+.25),Math.abs(y+.25))<=r)P(3+x,3+y,z,((z*2)|0)%2?"#e6b422":"#d4af37")}P(2.75,2.75,6,"#fff59d")}
};
