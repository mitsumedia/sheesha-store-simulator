/* ゲーセンシリーズ（新規3種＋ボーナス）見本。1マス=6、ボクセル0.5、原点はマスの角 */
function boxV(P,x0,y0,z0,w,d,h,c,cTop){for(let x=x0;x<x0+w;x+=.5)for(let y=y0;y<y0+d;y+=.5)for(let z=z0;z<z0+h;z+=.5){const top=z+.5>=z0+h;P(x,y,z,top&&cTop?cTop:c)}}
const GESEN={
 rhythm(P){/* 正面はx=0側。大きな画面、手前に丸いカラフルなボタンが並んだ台、上にスピーカー */
  boxV(P,2,.5,0,3.5,5,14,"#311b92");boxV(P,0,.5,0,2.5,5,6,"#4527a0");
  for(let x=0;x<2.5;x+=.5)for(let y=.5;y<5.5;y+=.5)P(x,y,6,"#ede7f6");
  const bc=["#f44336","#ffeb3b","#4caf50","#2196f3","#e91e63","#00bcd4"];for(let k=0;k<6;k++){const y=1+(k%3)*1.5,x=.5+Math.floor(k/3)*1.1;P(x,y,6.5,bc[k]);P(x+.5,y,6.5,bc[k]);P(x,y+.5,6.5,bc[k]);P(x+.5,y+.5,6.5,bc[k])}
  for(let y=1;y<5;y+=.5)for(let z=7.5;z<11.5;z+=.5){const lane=Math.floor((y-1)/0.66);const note=((z*2+lane*3)|0)%5===0;P(1.5,y,z,note?bc[lane%6]:"#0d0b1e")}
  for(let y=.5;y<5.5;y+=.5)for(let z=7;z<12;z+=.5)if(y===.5||y===5||z===7||z===11.5)P(1.5,y,z,"#7c4dff");
  for(const y of[1,4])for(let a=-.5;a<1;a+=.5)for(let b=-.5;b<1;b+=.5)if(Math.abs(a)+Math.abs(b)<1)P(1.75,y+a+.25,13+b,"#212121");
  for(let y=.5;y<5.5;y+=.5)P(1.75,y,14,((y*2)|0)%2?"#ff4081":"#40c4ff")},
 punch(P){/* 正面はx=0側。丸い赤いミット、上に大きな点数表示、横にグローブ */
  boxV(P,2,1.5,0,3.5,3,15,"#263238");boxV(P,1.5,1,15,4,4,.5,"#ffd600");
  for(let y=1.5;y<4.5;y+=.5)for(let z=11.5;z<14.5;z+=.5)P(1.5,y,z,"#111");
  const dig=[[0,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1]];for(let k=0;k<3;k++)for(let r=0;r<5;r++)for(let c=0;c<2;c++)if((k+r+c)%2===0||r===0||r===4)P(1,1.75+k*1+c*.5,12+r*.5,"#ff1744",.5);
  boxV(P,1.5,2.5,8.5,.5,1,1.5,"#455a64");for(let y=1;y<5;y+=.5)for(let z=7;z<11;z+=.5){const d=Math.hypot(y+.25-3,z+.25-9);if(d<1.9)P(.5,y,z,d<1?"#ffeb3b":"#e53935");if(d<1.9)P(1,y,z,"#c62828")}
  for(const yy of[0,5.25])for(let x=2;x<3.5;x+=.5)for(let z=4;z<6;z+=.5)P(x,yy,z,"#d32f2f");for(const yy of[0,5.25])P(2.5,yy,6,"#fafafa")},
 medal(P){/* 正面はx=0側。ガラスの中に段々の台とメダルの山、前のトレーにもメダル、上にカラフルなランプ */
  boxV(P,.5,.5,0,5,5,5,"#1565c0");for(let y=1;y<5;y+=.5)for(let x=0;x<1.5;x+=.5)P(x,y,5,"#0d47a1");for(let y=1.5;y<4.5;y+=.5)P(0,y,5.5,"#ffd54f"),P(.5,y,5.5,((y*2)|0)%2?"#ffca28":"#ffe082");
  for(let x=1;x<5.5;x+=.5)for(let y=1;y<5;y+=.5){const tier=x<2.5?5.5:(x<4?6.5:7.5);P(x,y,tier,"#90a4ae");if(((x*4+y*6)|0)%3!==0)P(x,y,tier+.5,((x+y)*2)%2?"#ffd54f":"#ffb300")}
  for(let y=.5;y<5.5;y+=.5)for(let z=5.5;z<10;z+=.5){P(.5,y,z,"#e3f2fd",.25)}
  boxV(P,.5,.5,10,5,5,1,"#0d47a1");const rb=["#f44336","#ff9800","#ffeb3b","#4caf50","#2196f3","#9c27b0"];for(let k=0;k<6;k++)P(.5+k*.8,2.75,11,rb[k])},
 hockey(P){/* 1×2マス（横6×奥12） */for(const[lx,ly]of[[.5,.5],[5,.5],[.5,11],[5,11]])for(let z=0;z<4;z+=.5)P(lx,ly,z,"#424242");
  boxV(P,0,0,4,6,12,1,"#1e88e5");for(let x=.5;x<5.5;x+=.5)for(let y=.5;y<11.5;y+=.5){const c=Math.abs(y-5.75)<.3?"#e53935":(Math.hypot(x+.25-3,y+.25-6)<1.6&&Math.hypot(x+.25-3,y+.25-6)>1.2?"#e53935":"#e3f2fd");P(x,y,5,c)}
  for(let x=0;x<6;x+=.5){P(x,0,5,"#1565c0");P(x,11.5,5,"#1565c0")}for(let y=0;y<12;y+=.5){P(0,y,5,"#1565c0");P(5.5,y,5,"#1565c0")}
  for(let x=2;x<4;x+=.5){P(x,0,5,"#212121");P(x,11.5,5,"#212121")}
  const mal=(cx,cy,c)=>{for(let x=-.75;x<.8;x+=.5)for(let y=-.75;y<.8;y+=.5)if(Math.hypot(x+.25,y+.25)<1)P(cx+x,cy+y,5.5,c);P(cx-.25,cy-.25,6,c)};mal(3,2.5,"#e53935");mal(3,9.5,"#fdd835");P(3.5,6.75,5.5,"#212121",.5)}
};
