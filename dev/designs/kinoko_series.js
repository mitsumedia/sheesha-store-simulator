/* キノコシリーズ（新規8種＋ボーナス）見本。1マス=6、ボクセル0.5、原点はマスの角 */
function capV(P,cx,cy,z0,r,h,col,dot,under){for(let x=-r;x<r;x+=.5)for(let y=-r;y<r;y+=.5){const d=Math.hypot(x+.25,y+.25);if(d>r)continue;const top=z0+h*Math.sqrt(Math.max(0,1-(d/r)**2));for(let z=z0;z<=top;z+=.5){const isTop=z+.5>top;let c=col;if(dot&&isTop&&((Math.floor((x+r)/1.5)+Math.floor((y+r)/1.5))%3===0)&&d<r*.85)c=dot;if(z===z0&&under)c=under;P(cx+x,cy+y,z,c)}}}
function stalk(P,cx,cy,z0,z1,r,c){for(let x=-r;x<r;x+=.5)for(let y=-r;y<r;y+=.5)if(Math.hypot(x+.25,y+.25)<=r)for(let z=z0;z<z1;z+=.5)P(cx+x,cy+y,z,c)}
const KINOKO={
 benitengu(P){stalk(P,3,3,0,5,1,"#f5f1e6");for(let x=-1.5;x<1.5;x+=.5)for(let y=-1.5;y<1.5;y+=.5)if(Math.hypot(x+.25,y+.25)<1.5)P(3+x,3+y,3,"#fffdf5");capV(P,3,3,5,2.6,2.2,"#d32f2f","#ffffff","#f3e5d0")},
 shiitake(P){for(let x=.5;x<5.5;x+=.5)for(let z=0;z<2.5;z+=.5)for(let y=1.5;y<4.5;y+=.5){const e=Math.hypot(z-1.25,y-3+.25);if(e>1.5)continue;P(x,y,z,(x===.5||x===5)?"#c9a77c":(e>1.1?"#5d4037":"#6d4c41"))}
  [[1.5,1.5,2],[3,1.4,2.2],[4.2,1.6,1.9],[2,4.6,2.1],[3.6,4.5,2.3],[2.6,3,2.6],[4.4,3,2.5]].forEach(([x,y,z])=>{P(x,y,z,"#e8dcc4");capV(P,x,y,z+.5,1,.6,"#7b4a2a",null,"#f0e2c8")})},
 lamp(P){for(let x=1.5;x<4.5;x+=.5)for(let y=1.5;y<4.5;y+=.5)P(x,y,0,"#5d4037");stalk(P,3,3,.5,6,.5,"#efe6d5");capV(P,3,3,6,2.4,2,"#ffcc80","#fff3e0","#ffe0b2")},
 basket(P){for(let x=.5;x<5.5;x+=.5)for(let y=1;y<5;y+=.5)for(let z=0;z<2.5;z+=.5){const e=x===.5||x===5||y===1||y===4.5;if(z>0&&!e)continue;P(x,y,z,(x+y+z)%1<.5?"#b07b45":"#9a6a3a")}
  for(let k=0;k<12;k++){const x=1.3+(k%4)*1.1,y=1.8+Math.floor(k/4)*1.1,z=2+((k*7)%3)*.25;capV(P,x,y,z,.9,.6,"#f4f1ea",null,"#e2dccf")}
  for(let x=.5;x<5.5;x+=.5)P(x,2.75,3.5+Math.sin(x)*.6,"#8a5a2e")},
 enoki(P){for(let x=1.5;x<4.5;x+=.5)for(let y=1.5;y<4.5;y+=.5)for(let z=0;z<3;z+=.5){const e=x===1.5||x===4||y===1.5||y===4;if(!e&&z>0)continue;P(x,y,z,z===2.5?"#e3f2f7":(e?"#cfe8f0":"#b3d6e0"))}
  for(let k=0;k<16;k++){const x=1.9+(k%4)*.6,y=1.9+Math.floor(k/4)*.55,h=6+((k*5)%4)*.6,lean=((k%4)-1.5)*.12;for(let z=1;z<h;z+=.5)P(x+lean*(z-3>0?z-3:0),y,z,"#fbf6e9",.25);P(x+lean*(h-3)-.125,y-.125,h,"#efe3c4",.5)}},
 stool(P){stalk(P,3,3,0,3,1.2,"#f3e9d6");capV(P,3,3,3,2.2,1.2,"#8e5bc7","#f3e9d6","#e8dcc6")},
 shelf(P){for(let x=1;x<5;x+=.5)for(let y=1.5;y<4.5;y+=.5)for(let z=0;z<7;z+=.5){const post=(x===1||x===4.5)&&(y===1.5||y===4);const pl=z===0||z===3.5||z===6.5;const back=y===4;if(post||pl||back)P(x,y,z,back&&!pl&&!post?"#8d6e63":"#a1887f")}
  const bk=["#e53935","#1e88e5","#43a047","#fdd835","#8e24aa","#fb8c00"];for(const z0 of[.5,4])for(let x=1.5;x<4.5;x+=.5){const hh=2.5-((x*2)%3)*.5;for(let z=z0;z<z0+hh;z+=.5)for(let y=2.5;y<4;y+=.5)P(x,y,z,bk[((x*2+z0)|0)%6])}
  capV(P,2.75,3,7,3.1,2.4,"#c62828","#fafafa","#f3e5d0")},
 wall(P){for(const[y,z,r]of[[2,13,2.4],[4.2,10.5,2],[2.6,8,1.6]])for(let a=0;a<r*1.6;a+=.5)for(let b=-r;b<r;b+=.5){if(Math.hypot(a/(r*1.6),b/r)>1)continue;const ed=Math.hypot(a/(r*1.6),b/r)>.75;P(a,y+b,z,ed?"#f3e0b8":"#a0522d");P(a,y+b,z-.5,"#e9d7b0")}},
 giant(P){stalk(P,3,3,0,13.5,1.3,"#f5f1e6");for(let a=0;a<6.28;a+=.4)P(3+Math.cos(a)*1.6,3+Math.sin(a)*1.6,9,"#fffdf5");capV(P,3,3,13.5,5,4,"#d32f2f","#ffffff","#f3e5d0")}
};
