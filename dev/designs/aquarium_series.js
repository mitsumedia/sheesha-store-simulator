/* アクアリウムシリーズ 候補＋ボーナス 見本。正面は-y側。ガラスの手前の面は描かず、中が見えるようにする */
function ellV(P,cx,cy,cz,rx,ry,rz,c,st){st=st||.5;for(let x=-rx;x<=rx;x+=st)for(let y=-ry;y<=ry;y+=st)for(let z=-rz;z<=rz;z+=st)if((x/rx)**2+(y/ry)**2+(z/rz)**2<=1)P(cx+x,cy+y,cz+z,typeof c==="function"?c(x,y,z):c,st)}
function tank(P,x0,y0,z0,w,d,h,water,frame,base){frame=frame||"#263238";for(let x=x0;x<x0+w;x+=.5)for(let y=y0;y<y0+d;y+=.5)P(x,y,z0,base||"#e6d6b8");
 for(let x=x0;x<x0+w;x+=.5)for(let z=z0;z<z0+h;z+=.5)P(x,y0+d-.5,z,water);for(let y=y0;y<y0+d;y+=.5)for(let z=z0;z<z0+h;z+=.5){P(x0,y,z,water);P(x0+w-.5,y,z,water)}
 for(let x=x0;x<x0+w;x+=.5)for(let y=y0;y<y0+d;y+=.5)if(x===x0||x===x0+w-.5||y===y0||y===y0+d-.5)P(x,y,z0+h,frame);for(const[x,y]of[[x0,y0],[x0+w-.5,y0]])for(let z=z0;z<z0+h;z+=.5)P(x,y,z,frame);for(let x=x0;x<x0+w;x+=.5)P(x,y0,z0,frame)}
function stand(P,x0,y0,w,d,h,c){for(let x=x0;x<x0+w;x+=.5)for(let y=y0;y<y0+d;y+=.5)for(let z=0;z<h;z+=.5)P(x,y,z,c)}
function fish(P,x,y,z,c,c2,dir){dir=dir||1;P(x,y,z,c,.5);P(x+.5*dir,y,z,c,.5);P(x-.5*dir,y,z,c2||c,.25);P(x+.75*dir,y-.125,z+.125,"#111",.125)}
const AQUA={
 kurage(P){stand(P,1,1.5,4,3,3,"#212121");tank(P,1,1.5,3,4,3,6,"#0d2a5c","#212121","#0d2a5c");for(const[x,y,z]of[[2,2.8,6.5],[3.6,3,7.5],[2.6,3.2,5]]){ellV(P,x,y,z,.7,.7,.45,"#b3e5fc",.25);for(const dx of[-.4,0,.4])for(let t=0;t<4;t++)P(x+dx-.125,y-.125,z-.5-t*.3,"#e1f5fe",.125)}},
 suisou(P){stand(P,.5,1.5,5,3,3,"#5d4037");tank(P,.5,1.5,3,5,3,4.5,"#b2ebf2","#37474f","#d7ccc8");for(let x=1;x<5;x+=.5)for(let y=2;y<4.5;y+=.5)if(Math.random()<.6){const h=1+((x*7+y*3)%3);for(let z=3.5;z<3.5+h;z+=.5)P(x,y,z,((x+z)*2|0)%2?"#2e7d32":"#43a047")}
  for(let t=0;t<6;t++)P(1.5+t*.5,3,3.5+t*.4,"#6d4c41");fish(P,3.5,2.2,6,"#ff7043")},
 nettai(P){stand(P,.5,1.5,5,3,3,"#263238");tank(P,.5,1.5,3,5,3,4.5,"#4fc3f7","#263238","#fff3e0");const c=["#ff4081","#ffeb3b","#00e5ff","#ff9100","#76ff03"];for(let k=0;k<8;k++)fish(P,1.4+(k%4)*.9,2.2+(k%2)*.8,4.5+Math.floor(k/4)*1.5+(k%3)*.3,c[k%5],null,k%2?1:-1);for(let x=1;x<5;x+=1.5)for(let z=3.5;z<5;z+=.5)P(x,4,z,"#e91e63")},
 kumanomi(P){stand(P,.5,1.5,5,3,3,"#37474f");tank(P,.5,1.5,3,5,3,4.5,"#29b6f6","#37474f","#fff8e1");ellV(P,2.5,3.2,4,1,.8,.6,(a,b,c)=>"#ab47bc");for(let k=0;k<12;k++)P(1.8+(k%4)*.45,2.7+Math.floor(k/4)*.4,4.5+(k%2)*.4,"#ce93d8",.25);
  for(const[x,z]of[[3.6,5.6],[2.2,6.2]]){P(x,2.3,z,"#ff6d00",.5);P(x+.5,2.3,z,"#fafafa",.25);P(x+.25,2.3,z,"#ff6d00",.5);P(x-.25,2.3,z,"#fafafa",.25)}ellV(P,4,3.4,3.8,.6,.6,.5,"#f8bbd0")},
 tatsu(P){stand(P,1.5,1.5,3,3,3,"#263238");tank(P,1.5,1.5,3,3,3,8,"#26c6da","#263238","#ffe0b2");for(const x of[2,3.5])for(let z=3.5;z<9;z+=.5)P(x+Math.sin(z)*.2,3.5,z,"#558b2f");
  for(let t=0;t<9;t++)P(2.9+Math.sin(t*.7)*.25,2.5,8.5-t*.4,"#ffb300",.25);P(3.1,2.4,8.7,"#ffb300",.5);P(3.4,2.4,8.8,"#ffb300",.25)},
 upa(P){stand(P,.5,1.5,5,3,3,"#455a64");tank(P,.5,1.5,3,5,3,3.5,"#80deea","#455a64","#efebe9");ellV(P,3,2.8,4,1.3,.4,.35,"#f8bbd0",.25);ellV(P,1.9,2.8,4.2,.5,.45,.45,"#f8bbd0",.25);for(const d of[-.4,.4])for(let t=0;t<3;t++)P(1.9,2.8+d+(d>0?t*.1:-t*.1),4.6+t*.2,"#ec407a",.25);P(1.6,2.45,4.3,"#111",.25)},
 kame(P){stand(P,.5,1.5,5,3,3,"#4e342e");tank(P,.5,1.5,3,5,3,3.5,"#a5d6a7","#4e342e","#bcaaa4");ellV(P,3.6,3.2,4,1.2,1,.8,"#9e9e9e");ellV(P,3.6,3.2,5.1,.9,.8,.45,(a,b,c)=>((a+b)*3|0)%2?"#558b2f":"#33691e",.25);ellV(P,2.6,3.2,5,.35,.3,.3,"#7cb342",.25)},
 medaka(P){for(let z=0;z<3;z+=.5){const r=2.4-z*.05;for(let x=-2.5;x<2.5;x+=.5)for(let y=-2.5;y<2.5;y+=.5){const d=Math.hypot(x+.25,y+.25);if(d>r||(d<r-.6&&z>0))continue;P(3+x,3+y,z,z<.5?"#5d4037":"#3e2723")}}for(let x=1;x<5;x+=.5)for(let y=1;y<5;y+=.5)if(Math.hypot(x+.25-3,y+.25-3)<1.8)P(x,y,2.5,"#4fc3f7");
  for(const[x,y]of[[2.2,2.4],[3.6,3.4]])for(let a=-.5;a<1;a+=.5)for(let b=-.5;b<1;b+=.5)P(x+a,y+b,3,"#388e3c",.5);ellV(P,3.6,3.4,3.4,.4,.4,.3,"#f8bbd0",.25);for(const[x,y]of[[2,3.6],[3.4,2],[4,2.6]])P(x,y,2.75,"#ffcc80",.25)},
 wallsui(P){/* 壁の埋め込み水槽（壁アイテム・x=0が壁） */for(let y=.5;y<5.5;y+=.25)for(let z=9;z<13;z+=.25){const e=y<.75||y>=5.25||z<9.25||z>=12.75;P(.25,y,z,e?"#212121":(z<9.75?"#e6d6b8":"#29b6f6"),.25)}for(const[y,z,c]of[[1.5,11,"#ff4081"],[3,11.8,"#ffeb3b"],[4,10.6,"#00e5ff"],[2.2,10.2,"#ff9100"]]){P(.5,y,z,c,.5);P(.5,y+.5,z,c,.25)}for(let y=1;y<5;y+=1)for(let z=9.75;z<10.75;z+=.25)P(.5,y,z,"#43a047",.25)},
 esa(P){for(let x=1;x<5;x+=.5)for(let y=3.5;y<5;y+=.5)for(let z=0;z<7;z+=.5)if(x===1||x===4.5||y===4.5||z===0||z===3||z===6.5)P(x,y,z,"#8d6e63");
  for(const[x,c]of[[1.5,"#e53935"],[2.3,"#1e88e5"],[3.1,"#fdd835"]])for(let z=.5;z<2;z+=.5)P(x,3.75,z,c);for(const[x,c]of[[1.5,"#4caf50"],[2.5,"#fafafa"],[3.5,"#29b6f6"]])for(let z=3.5;z<5;z+=.5)P(x,3.75,z,c);for(let z=3.5;z<8;z+=.5)P(4,3.6,z,"#795548");for(let a=-.5;a<1;a+=.5)for(let b=0;b<1;b+=.5)P(4+a,3.6,8+b,"#90a4ae",.5)},
 entyu(P){/* ボーナスA：天井まで届く円柱水槽（1マス・高さ4マス） */for(let x=.5;x<5.5;x+=.5)for(let y=.5;y<5.5;y+=.5){const d=Math.hypot(x+.25-3,y+.25-3);if(d<2.5){P(x,y,0,"#212121");P(x,y,.5,"#212121");P(x,y,23.5,"#212121")}}
  for(let z=1;z<23.5;z+=.5)for(let a=0;a<6.28;a+=.25){const x=3+Math.cos(a)*2.2,y=3+Math.sin(a)*2.2;if(Math.sin(a)<-.2)continue;P(x-.25,y-.25,z,"#29b6f6")}
  const c=["#ff4081","#ffeb3b","#00e5ff","#ff9100"];for(let k=0;k<10;k++)fish(P,2+(k%3)*.8,2.4+(k%2)*.5,2+k*2,c[k%4],null,k%2?1:-1);for(let z=2;z<23;z+=1.7)P(3+Math.sin(z)*.4,3,z,"#e1f5fe",.25)},
 same(P){/* ボーナスB：サメの大水槽（1×2マス） */stand(P,.5,0,5,12,3,"#212121");tank((x,y,z,c,s)=>{if(x===.5&&c==="#0277bd")return;P(x,y,z,c,s)},.5,0,3,5,12,6,"#0277bd","#212121","#ffe0b2");
  ellV(P,1.6,5.5,6,.8,2.6,.8,(a,b,c)=>c<-.2?"#eceff1":"#78909c",.25);for(let t=0;t<4;t++)P(1.6,5.5,6.8+t*.3,"#78909c",.25);for(let t=0;t<4;t++){P(1.6,8.2+t*.3,6+t*.3,"#78909c",.25);P(1.6,8.2+t*.3,6-t*.3,"#78909c",.25)}P(1,3.4,6.3,"#111",.25);
  for(const[y,z]of[[2,4.5],[9.5,7.5],[10,5]])fish(P,1.2,y,z,"#ffeb3b")},
 arch(P){/* ボーナスC：海底トンネル風の水槽アーチ（1×2マス） */for(let y=0;y<12;y+=.5)for(let x=0;x<6;x+=.5){const r=Math.hypot((y+.25-6)/6,0);}
  for(let y=-.5;y<12.5;y+=.5)for(let z=0;z<12;z+=.5){const cy=y+.25-6,cz=z;const outer=(cy/6)**2+(cz/11)**2<=1,inner=(cy/4)**2+(cz/8.5)**2<=1;if(!outer||inner)continue;for(let x=1;x<5;x+=.5){const edge=x===1||x===4.5;P(x,y,z,edge?"#90caf9":"#29b6f6")}}
  for(const[y,z,c]of[[1,4,"#ff4081"],[2.5,8,"#ffeb3b"],[9.5,8.5,"#00e5ff"],[11,3,"#ff9100"],[6,10.3,"#76ff03"]])fish(P,.6,y,z,c)}
};
