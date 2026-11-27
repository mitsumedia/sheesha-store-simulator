/* パーティーシリーズ：プレゼントの山／ネオンの観覧車（ボーナス・1マス・高さ3マス）見本。ボクセル0.5 */
function boxV(P,x0,y0,z0,w,d,h,c,rib){for(let x=x0;x<x0+w;x+=.5)for(let y=y0;y<y0+d;y+=.5)for(let z=z0;z<z0+h;z+=.5){const r=rib&&(Math.abs(x+.25-(x0+w/2))<.3||Math.abs(y+.25-(y0+d/2))<.3);P(x,y,z,r?rib:c)}}
const PARTY={
 presents(P){const L=[[.5,.5,0,3,3,2.5,"#e53935","#ffeb3b"],[3,.5,0,2.5,2.5,2,"#1e88e5","#ffffff"],[1,3,0,3,2.5,3,"#43a047","#e53935"],[3.5,3.2,0,2,2,1.5,"#ab47bc","#ffd54f"],[1,1,2.5,2,2,2,"#ffb300","#e53935"],[1.5,3.5,3,2,1.5,1.5,"#f06292","#ffffff"],[1.5,1.5,4.5,1.5,1.5,1.5,"#26c6da","#ffeb3b"]];
  L.forEach(([x,y,z,w,d,h,c,r])=>{boxV(P,x,y,z,w,d,h,c,r);const cx=x+w/2-.25,cy=y+d/2-.25;P(cx-.5,cy,z+h,r);P(cx+.5,cy,z+h,r);P(cx,cy,z+h+.5,r)})},
 wheel(P){/* 台座 */for(let x=1;x<5;x+=.5)for(let y=1;y<5;y+=.5)P(x,y,0,"#37474f");
  for(let z=.5;z<9;z+=.5){P(2.75,1.5,z,"#90a4ae");P(2.75,4,z,"#90a4ae")}
  const C=[3,2.75,10],R=6.5,cols=["#ff4081","#40c4ff","#ffea00","#69f0ae","#e040fb","#ff9100"];
  for(let t=0;t<6.28;t+=.08){const y=C[1]+Math.cos(t)*R,z=C[2]+Math.sin(t)*R;P(2.75,y,z,"#ff4081");P(3.25,y,z,"#40c4ff")}
  for(let k=0;k<8;k++){const a=k*.785;for(let r=0;r<R;r+=.5)P(3,C[1]+Math.cos(a)*r,C[2]+Math.sin(a)*r,"#e1f5fe")}
  for(let k=0;k<8;k++){const a=k*.785+.39,y=C[1]+Math.cos(a)*R,z=C[2]+Math.sin(a)*R-1.2,c=cols[k%6];for(let dy=-.5;dy<1;dy+=.5)for(let dz=0;dz<1.5;dz+=.5)P(2.5,y+dy,z+dz,c),P(3.5,y+dy,z+dz,c)}
  P(3,2.5,9.75,"#ffd600",1)}
};
