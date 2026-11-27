/* 妖怪シリーズ 見本。1マス=6、ボクセル0.5（細部0.25）。正面は-y側 */
function ellV(P,cx,cy,cz,rx,ry,rz,c,st){st=st||.5;for(let x=-rx;x<=rx;x+=st)for(let y=-ry;y<=ry;y+=st)for(let z=-rz;z<=rz;z+=st)if((x/rx)**2+(y/ry)**2+(z/rz)**2<=1)P(cx+x,cy+y,cz+z,typeof c==="function"?c(x,y,z):c,st)}
const YOUKAI={
 raiko(P){/* ボーナス：雷のマークの和太鼓（1×2マス・横6×奥12）。台に載った大太鼓、正面の皮に黄色い稲妻、後ろに小太鼓の輪 */
  for(let x=1;x<5;x+=.5)for(let y=2;y<10;y+=.5){P(x,y,0,"#3e2723");if(x===1||x===4.5)for(let z=.5;z<3;z+=.5)P(x,y,z,"#4e342e")}
  const cy=6,cz=7.5,R=4;for(let x=1;x<5;x+=.25)for(let y=cy-R;y<cy+R;y+=.25)for(let z=cz-R;z<cz+R;z+=.25){const r=Math.hypot(y+.125-cy,z+.125-cz);if(r>R)continue;const head=x<1.25||x>=4.75;const bulge=1-((x+.125-3)/2.6)**2;if(!head&&r>R*(.86+.14*bulge))continue;if(!head&&r<R*.84)continue;
   let c;if(head){c=r>R-.4?"#3e2723":"#f3e7cf";const tack=Math.abs(r-(R-.6))<.15&&((Math.atan2(z-cz,y-cy)*6)|0)%2===0;if(tack)c="#d4af37";
    const yy=(y+.125-cy)/1.7,zz=(z+.125-cz)/1.7;const bolt=(Math.abs(zz-(-yy*1.6+.6))<.45&&yy>-.6&&yy<1.2&&zz>-1.2&&zz<1.8)||(Math.abs(zz-(-yy*1.6-.9))<.45&&yy>-1.2&&yy<.6&&zz>-2.4&&zz<.6)||(Math.abs(zz+.15)<.35&&yy>-.4&&yy<.6);if(bolt)c="#fbc02d"}
   else c=((y*2)|0)%6===0?"#8d4a2a":"#b5653a";P(x,y,z,c,.25)}
  for(let k=0;k<8;k++){const a=Math.PI*(.12+k*.108),y=cy+Math.cos(a)*5.6,z=cz+Math.sin(a)*5.6;ellV(P,4.8,y,z,.6,.7,.7,(dx,dy,dz)=>dx<-.3?"#f3e7cf":"#b5653a",.25);P(4.6,y-.125,z-.125,"#fbc02d",.25)}
  for(let a=Math.PI*.08;a<Math.PI*.92;a+=.05)P(5,cy+Math.cos(a)*5.6,cz+Math.sin(a)*5.6,"#d32f2f",.5);
  for(const y of[3.5,8])for(let t=0;t<7;t++)P(.4-t*.05,y+t*.05,10+t*.5,"#6d4c41",.25)}
};
