/* 光る魔法陣（魔法シリーズのボーナス・2×2マス）見本。12×12、ボクセル0.5（線）。床に描く形＋ろうそく＋光の粒 */
function mahouVox(a){const P=(x,y,z,c,s)=>a.push([x,y,z,c,undefined,s||.5]);const C=6,L="#b388ff",L2="#e1bee7",D="#2a1b3d";
 for(let x=.5;x<11.5;x+=.25)for(let y=.5;y<11.5;y+=.25){const cx=x+.125-C,cy=y+.125-C,d=Math.hypot(cx,cy);if(d>5.4)continue;
  let on=Math.abs(d-5.15)<.16||Math.abs(d-4.3)<.13||Math.abs(d-1.4)<.13;
  // 六芒星
  for(let k=0;k<6;k++){const a1=k*Math.PI/3,a2=a1+2*Math.PI/3,x1=Math.cos(a1)*4.3,y1=Math.sin(a1)*4.3,x2=Math.cos(a2)*4.3,y2=Math.sin(a2)*4.3;const t=((cx-x1)*(x2-x1)+(cy-y1)*(y2-y1))/((x2-x1)**2+(y2-y1)**2);if(t>=0&&t<=1){const px=x1+(x2-x1)*t,py=y1+(y2-y1)*t;if(Math.hypot(cx-px,cy-py)<.14)on=true}}
  // 外側の輪のあいだのルーン
  if(d>4.4&&d<5.0){const ang=Math.atan2(cy,cx);const seg=(ang+Math.PI)/(Math.PI/12);if(Math.floor(seg)%2===0&&(Math.abs(d-4.72)<.1||Math.abs(seg-Math.floor(seg)-.5)<.12))on=true}
  P(x,y,0,on?(d<1.6?L2:L):D,.25)}
 // ろうそく6本（星の頂点の外側）
 for(let k=0;k<6;k++){const an=k*Math.PI/3+Math.PI/6,x=C+Math.cos(an)*5.2,y=C+Math.sin(an)*5.2;for(let z=.5;z<2;z+=.25)P(x-.25,y-.25,z,"#f3ead8",.5);P(x-.125,y-.125,2,"#ffca28",.25);P(x-.125,y-.125,2.25,"#fff59d",.25)}
 // 浮かぶ光の粒
 [[4,5,3],[7.5,4,4.5],[6,7.8,3.6],[8.2,7,5.5],[5,8,6],[3.8,3.8,5],[6.5,6,7]].forEach(([x,y,z])=>P(x,y,z,"#d1c4e9",.25));
}
