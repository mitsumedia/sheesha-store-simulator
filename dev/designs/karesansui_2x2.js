/* 枯山水の庭（和風シリーズのボーナス・2×2マス）見本OK版。原点は左下の角、1マス=6、ボクセル0.5 */

function kareVox(a){const P=(x,y,z,c,s)=>a.push([x,y,z,c,undefined,s]);
 // 木の枠（12×12、高さ1）
 for(let x=0;x<12;x+=.5)for(let y=0;y<12;y+=.5){const edge=x<.5||y<.5||x>=11.5||y>=11.5;
  if(edge){for(let z=0;z<2;z+=.5)P(x,y,z,z<1.5?((x+y+z)%2<1?"#6d4c33":"#5d4030"):"#7b563a",.5);P(x,y,2,"#8a6242",.5);continue}
  // 白砂＋波紋（石のまわりは同心円、それ以外は横じま）
  const rocks=[[3.6,3.8,1.9],[8.2,7.6,1.6],[4.4,8.6,1.0]];let line=false,near=false,cxx=x+.25,cyy=y+.25;
  for(const[rx,ry,rr]of rocks){const d=Math.hypot(cxx-rx,cyy-ry);if(d<rr+2.2){near=true;const k=Math.floor((d-rr+.1)/.5);line=d>rr&&k%2===0}}
  if(!near)line=Math.floor(y/.5)%2===0;
  for(let z=0;z<1.5;z+=.5)P(x,y,z,"#d9d4c7",.5);P(x,y,1.5,line?"#b9b2a2":"#ece8dd",.5)}
 // 石（3つ）
 const stone=(cx,cy,r,h,c1,c2)=>{for(let x=-r;x<r;x+=.5)for(let y=-r;y<r;y+=.5){const d=Math.hypot(x+.25,y+.25);if(d>r)continue;const hh=h*(1-(d/r)**2*.75);for(let z=2;z<2+hh;z+=.5){const top=z+.5>=2+hh;P(cx+x,cy+y,z,top&&((x*2+y*4)|0)%3===0?c2:c1,.5)}}};
 stone(3.6,3.8,1.6,4.2,"#7d7f7c","#62855a");stone(8.2,7.6,1.3,3.0,"#8a8a86","#6f8f5f");stone(4.4,8.6,.8,1.6,"#6f716e","#7d7f7c");
 // 苔のかたまり
 for(const[mx,my]of[[1.6,6.4],[10.2,4.4]])for(let x=-.5;x<1;x+=.5)for(let y=-.5;y<1;y+=.5)if(Math.abs(x)+Math.abs(y)<1)P(mx+x,my+y,2,"#5f8f4e",.5);
}
