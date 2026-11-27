/* ターンテーブル卓（音楽シリーズのボーナス・1×2マス）見本。原点は角、横6×奥12、ボクセル0.5 */

function kareVox(a){const P=(x,y,z,c,s)=>a.push([x,y,z,c,undefined,s||.5]);
 // 1×2マス（横6×奥12）。机：脚＋天板、下にレコード箱
 const W=6,D=12,H=5;
 for(const[lx,ly]of[[.5,.5],[W-1,.5],[.5,D-1],[W-1,D-1]])for(let z=0;z<H-.5;z+=.5){P(lx,ly,z,"#3b3b3b");P(lx,ly+.5-.0,z,"#3b3b3b")}
 for(let x=.5;x<W-.5;x+=.5)for(let y=.5;y<D-.5;y+=.5){P(x,y,H-.5,"#2b2b2b");P(x,y,H-1,"#3d2f25")}
 // 下段の棚板
 for(let x=1;x<W-1;x+=.5)for(let y=1;y<D-1;y+=.5)P(x,y,1,"#3d2f25");
 // レコード箱（3つ）と色とりどりのジャケット
 const cols=["#e53935","#fdd835","#1e88e5","#43a047","#8e24aa","#fb8c00","#f5f5f5","#00acc1"];
 [[1.5,1.5],[1.5,5.0],[1.5,8.5]].forEach(([bx,by],k)=>{for(let x=0;x<3;x+=.5)for(let y=0;y<2.5;y+=.5){P(bx+x,by+y,1.5,"#8d6e63");}
   for(let y=0;y<2.5;y+=.5)for(let z=2;z<3.5;z+=.5)for(let x=.5;x<2.5;x+=.5)P(bx+x,by+y,z,cols[(k*3+Math.floor(y/.5))%cols.length])});
 // ターンテーブル2台
 const tt=(cy)=>{const cx=3;for(let x=-2.5;x<2.5;x+=.5)for(let y=-2.5;y<2.5;y+=.5)P(cx+x,cy+y,H,"#b0b3b8");
   for(let x=-2;x<2;x+=.5)for(let y=-2;y<2;y+=.5){const d=Math.hypot(x+.25,y+.25);if(d>2)continue;P(cx+x,cy+y,H+.5,d<.6?"#e53935":(Math.round(d*2)%2?"#1c1c1c":"#2a2a2a"),.5)}
   P(cx+2,cy+1.8,H+.5,"#9e9e9e");P(cx+2,cy+1.8,H+1,"#cfd8dc");for(let t=0;t<4;t++)P(cx+1.75-t*.25,cy+1.5-t*.45,H+1,"#cfd8dc",.25)};
 tt(3);tt(9);
 // まん中のミキサー
 for(let x=1;x<5;x+=.5)for(let y=5.5;y<6.5+.5;y+=.5)P(x,y,H,"#212121");
 [["#76ff03",1.5],["#ffea00",2.5],["#ff1744",3.5]].forEach(([c,x])=>P(x,6,H+.5,c,.5));
 for(const y of[5.5,6.5])P(4.25,y,H+.5,"#bdbdbd",.25);
}
