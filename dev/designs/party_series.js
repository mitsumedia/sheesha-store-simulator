/* パーティーシリーズ：プレゼントの山／ネオンの観覧車（ボーナス・1マス・高さ3マス）見本。ボクセル0.5 */
function boxV(P,x0,y0,z0,w,d,h,c,rib){for(let x=x0;x<x0+w;x+=.5)for(let y=y0;y<y0+d;y+=.5)for(let z=z0;z<z0+h;z+=.5){const r=rib&&(Math.abs(x+.25-(x0+w/2))<.3||Math.abs(y+.25-(y0+d/2))<.3);P(x,y,z,r?rib:c)}}
const PARTY={
 presents(P){const L=[[.5,.5,0,3,3,2.5,"#e53935","#ffeb3b"],[3,.5,0,2.5,2.5,2,"#1e88e5","#ffffff"],[1,3,0,3,2.5,3,"#43a047","#e53935"],[3.5,3.2,0,2,2,1.5,"#ab47bc","#ffd54f"],[1,1,2.5,2,2,2,"#ffb300","#e53935"],[1.5,3.5,3,2,1.5,1.5,"#f06292","#ffffff"],[1.5,1.5,4.5,1.5,1.5,1.5,"#26c6da","#ffeb3b"]];
  L.forEach(([x,y,z,w,d,h,c,r])=>{boxV(P,x,y,z,w,d,h,c,r);const cx=x+w/2-.25,cy=y+d/2-.25;P(cx-.5,cy,z+h,r);P(cx+.5,cy,z+h,r);P(cx,cy,z+h+.5,r)})},
 wheel(P){/* ボーナス：ネオンの観覧車（1×2マス・横6×奥12。輪は直径約3マス、高さ約3.5マス） */
  for(let x=.5;x<5.5;x+=.5)for(let y=.5;y<11.5;y+=.5)P(x,y,0,(x===.5||x===5||y===.5||y===11)?"#263238":"#37474f");
  const C=[3,6,11.5],R=9,cols=["#ff4081","#40c4ff","#ffea00","#69f0ae","#e040fb","#ff9100"];
  /* A字の支柱（左右2組） */for(const x of[1.25,4.5])for(let t=0;t<=1;t+=.04){for(const y0 of[2,10]){const y=y0+(C[1]-y0)*t,z=.5+(C[2]-.5)*t;P(x,y,z,"#90a4ae")}}
  for(let x=1.25;x<4.75;x+=.5)P(x,C[1]-.25,C[2]-.25,"#b0bec5");P(2.75,C[1]-.25,C[2]-.25,"#ffd600",1);
  /* 外の輪（2重）とネオンの電球 */for(let t=0;t<6.283;t+=.05){const cy=Math.cos(t),cz=Math.sin(t);for(const x of[1.75,3.75]){P(x,C[1]+cy*R,C[2]+cz*R,"#ff4081");P(x,C[1]+cy*(R-.5),C[2]+cz*(R-.5),"#e91e63")}}
  for(let k=0;k<32;k++){const t=k/32*6.283;for(const x of[1.5,4])P(x,C[1]+Math.cos(t)*R,C[2]+Math.sin(t)*R,cols[k%6])}
  /* 内側の輪とスポーク */for(let t=0;t<6.283;t+=.1)for(const x of[1.75,3.75])P(x,C[1]+Math.cos(t)*3,C[2]+Math.sin(t)*3,"#40c4ff");
  for(let k=0;k<12;k++){const a=k*.5236;for(let r=.5;r<R;r+=.5)for(const x of[1.75,3.75])P(x,C[1]+Math.cos(a)*r,C[2]+Math.sin(a)*r,"#e1f5fe")}
  /* ゴンドラ（12個） */for(let k=0;k<12;k++){const a=k*.5236+.26,y=C[1]+Math.cos(a)*R,z=C[2]+Math.sin(a)*R-2,c=cols[k%6];
   for(let x=1.5;x<4.5;x+=.5)for(let dy=-.75;dy<1;dy+=.5)for(let dz=0;dz<2;dz+=.5){const win=dz===1&&Math.abs(dy)<.5&&(x===1.5||x===4);P(x,y+dy,z+dz,win?"#fff9c4":c)}
   for(let x=1.5;x<4.5;x+=.5)P(x,y,z+2,"#fafafa");P(2.75,y,z+2.5,"#cfd8dc")}},
 champ(P){/* 丸いハイテーブルに、氷のバケツとシャンパン、グラス2つ */
  for(let x=1.5;x<4.5;x+=.5)for(let y=1.5;y<4.5;y+=.5)if(Math.hypot(x+.25-3,y+.25-3)<1.6)P(x,y,0,"#424242");
  for(let z=.5;z<7;z+=.5)P(2.75,2.75,z,"#bdbdbd");
  for(let x=0;x<6;x+=.5)for(let y=0;y<6;y+=.5){const d=Math.hypot(x+.25-3,y+.25-3);if(d<2.9)P(x,y,7,d>2.5?"#d4af37":"#fafafa")}
  for(let x=1.5;x<3.5;x+=.5)for(let y=1.5;y<3.5;y+=.5)for(let z=7.5;z<9.5;z+=.5){const d=Math.hypot(x+.25-2.5,y+.25-2.5);if(d>1.05)continue;const e=d>.6;if(!e&&z<9)continue;P(x,y,z,e?"#cfd8dc":"#e1f5fe")}
  for(let z=8;z<11;z+=.5)for(const[dx,dy]of[[0,0],[.5,0],[0,.5],[.5,.5]])P(2+dx,2+dy,z,z===9.5?"#fafafa":"#1b5e20");for(let z=11;z<12.5;z+=.5)P(2.25,2.25,z,"#d4af37");
  const glass=(x,y)=>{P(x,y,7.5,"#e0f7fa",.5);for(let z=8;z<9;z+=.5)P(x+.125,y+.125,z,"#e0f7fa",.25);for(let z=9;z<10.5;z+=.5)P(x,y,z,z<10?"#ffe082":"#e0f7fa",.5)};glass(1,3.5);glass(1.5,4.6)},
};
