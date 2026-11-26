/* ===== EXのお客さんの専用パーツ ===== */
{const ring=(H,z,cols,x0=-1,y0=-1,w=10,d=8)=>{let k=0;for(let x=x0;x<x0+w;x++){H(x,y0,z,1,1,1,cols[k++%cols.length]);H(x,y0+d-1,z,1,1,1,cols[k%cols.length])}for(let y=y0+1;y<y0+d-1;y++){H(x0,y,z,1,1,1,cols[k++%cols.length]);H(x0+w-1,y,z,1,1,1,cols[k%cols.length])}};
const hachi=(H,c1,c2)=>{ring(H,5,[c1,c1,c2]);H(5,6,5,2,1,1,c1);H(6,7,4,1,1,2,c1);H(5,7,5,1,1,1,c2)};
const kimono=({B,Q4},col,obi,obi2)=>{B(1,1,1,2,2,3,col);for(let x=1;x<3;x+=.25)for(const z of[5.5,5.75,6,6.25])Q4(x,3,z,z===5.75?obi2:obi);
[[1.5,7.75],[1.75,7.5],[1.75,7.25],[2.25,7.75],[2,7.5],[2,7.25]].forEach(([x,z])=>Q4(x,3,z,"#ffffff"))};
Object.assign(SPF,{
/* EX01 船長：白い船長帽・金のボタン */
ex1:({H,Q4})=>{const W="#ffffff",N="#1e293b",Gd="#d4af37";H(-1,-1,6,10,8,1,N);H(-1,-1,7,10,8,2,W);H(-2,-2,9,12,10,1,W);H(0,6,6,8,2,1,"#111111");H(3,7,7,2,1,1,Gd);H(2,7,8,4,1,1,Gd);[5,6,7].forEach(z=>{Q4(1.5,3,z,Gd);Q4(2.25,3,z,Gd)})},
/* EX02 宇宙飛行士：首のリング・背中の生命維持装置・ワッペン */
ex2:({H,B,Q4})=>{ring(H,-1,["#9ca3af"]);B(1,0,5,2,1,3,"#cbd5e1");B(1,0,7,2,1,1,"#94a3b8");Q4(1.25,3,7,"#ef4444");Q4(1.5,3,7,"#1e3a8a");Q4(1.25,3,6.75,"#1e3a8a");Q4(1.5,3,6.75,"#ef4444");[5,5.5,6].forEach(z=>Q4(2.5,3,z,"#38bdf8"))},
/* EX03 南極観測隊員：毛皮つきのフード */
ex3:({H})=>{const O="#f97316",F="#f5f5f4";H(-1,-1,6,10,8,1,O);H(-1,-1,0,10,2,6,O);H(-1,-1,0,2,7,6,O);H(7,-1,0,2,7,6,O);H(-1,6,-1,10,1,1,F);H(-1,6,6,10,1,1,F);H(-1,6,0,1,1,6,F);H(8,6,0,1,1,6,F)},
/* EX10 女将：着物と帯 */
ex10:o=>kimono(o,"#7c2d12","#facc15","#b45309"),
/* EX12 和菓子職人：白い和帽子 */
ex12:({H})=>{H(-1,-1,5,10,8,3,"#ffffff");H(-1,6,6,10,1,1,"#e5e7eb")},
/* EX13 着物の仕立て屋：着物と帯 */
ex13:o=>kimono(o,"#6b21a8","#e5e7eb","#9ca3af"),
/* EX14 寿司職人：ねじり鉢巻（白と紺） */
ex14:({H})=>hachi(H,"#ffffff","#1e3a8a"),
/* EX15 ラーメン屋：ねじり鉢巻（白と赤） */
ex15:({H})=>hachi(H,"#ffffff","#dc2626"),
/* EX20 プロゲーマー：虹色に光るヘッドホン */
ex20:({H})=>{const RB=["#ef4444","#f97316","#facc15","#22c55e","#3b82f6","#a855f7"];for(let k=0;k<4;k++){H(-2,1+k,0,2,1,4,RB[k]);H(8,1+k,0,2,1,4,RB[(k+3)%6])}for(let x=0;x<8;x++)H(x,2,8,1,2,1,RB[x%6])},
/* EX24 ピエロ：赤い鼻・白塗り・とんがり帽子・えり */
ex24:({H,hr})=>{H(-2,0,1,2,5,5,hr);H(8,0,1,2,5,5,hr);H(3,6,1,2,1,1,"#ef4444");H(1,6,1,1,1,1,"#3b82f6");H(6,6,1,1,1,1,"#3b82f6");
 const Y="#facc15",P="#ec4899";H(0,0,6,8,6,1,Y);H(1,1,7,6,4,1,P);H(2,1,8,4,4,1,Y);H(2,2,9,4,2,1,P);H(3,2,10,2,2,1,Y);H(3,2,11,2,2,1,"#ffffff");ring(H,-1,["#ffffff","#f1f5f9"])},
/* EX25 引退した手品師：シルクハット */
ex25:({H})=>{const K="#111111";H(-1,-1,6,10,8,1,K);H(0,0,7,8,6,5,K);H(0,0,7,8,6,1,"#b91c1c")},
/* EX26 探偵：鹿撃ち帽・トレンチコートのベルトとすそ */
ex26:({H,Q4})=>{for(let x=-1;x<9;x++)for(let y=-1;y<7;y++)for(let z=5;z<8;z++){if(z===7&&(x<0||x>7||y<0||y>5))continue;H(x,y,z,1,1,1,(x+y+z)%2?"#a16207":"#78350f")}
 H(1,7,5,6,1,1,"#78350f");H(1,-2,5,6,1,1,"#78350f");H(3,2,8,2,2,1,"#78350f");
 for(let x=1;x<3;x+=.25){Q4(x,3,5.5,"#7c5a2e");for(let z=2;z<4;z+=.25)Q4(x,3,z,"#c8a26a")}},
/* EX27 占い師：紫のベールと金の飾り */
ex27:({H})=>{const V="#7c3aed",Gd="#facc15";H(-1,-1,6,10,8,1,V);H(-1,-1,-4,10,1,10,V);H(-1,-1,-3,1,7,9,V);H(8,-1,-3,1,7,9,V);for(let x=0;x<8;x+=2)H(x,6,5,1,1,1,Gd);H(1,6,0,6,1,1,"#c4b5fd")},
/* EX29 鉄道運転士：制帽 */
ex29:({H})=>{const N="#1e3a8a";H(-1,-1,6,10,8,1,"#111111");H(-1,-1,7,10,8,2,N);H(0,6,6,8,2,1,"#111111");H(3,7,7,2,1,1,"#d4af37")},
/* EX30 煙の精：足元がけむりで、頭の上にもふわふわ */
ex30:({H,Q4,B})=>{const S1="#ede9fe",S2="#ddd6fe";B(1,1,0,2,2,4,S1);[[.5,1,.5],[3,2,1],[1.5,3,1.5],[.75,2.5,2.5],[2.75,.75,2],[2,3.25,.25]].forEach(([x,y,z])=>{Q4(x,y,z,S2);Q4(x+.25,y,z+.25,S1)});
 H(1,1,8,2,2,1,S1);H(4,3,9,2,1,1,S2);H(6,1,8,1,2,1,S1);H(2,6,7,1,1,1,S2)}
})}

/* EX30 煙の精：ぷっくりした煙のおばけ。足のかわりにくるんとしたしっぽ、大きな目とほっぺ */
SPH.ex30=function(a,ox,Y0,f,c,sit,dr,hd,nh){
const map=(x,y,w,d)=>{let X=x,Y=f>0?y:6-y-d,Wd=w,D=d;if(!sit){if(dr===2){X=4-x-w;Y=3-y-d}else if(dr===1){X=y;Y=4-x-w;Wd=d;D=w}else if(dr===3){X=3-y-d;Y=x;Wd=d;D=w}else Y=y}return[X,Y,Wd,D]};
const q=.25,M=new Map(),K=(x,y,z)=>Math.round(x*8)+","+Math.round(y*8)+","+Math.round(z*8);
const P=(x,y,z,col)=>M.set(K(x,y,z),[x,y,z,col]);
const C1="#f7f5ff",C2="#ebe5ff",C3="#d9cdfb",C4="#c4b5fd";
const ball=(cx,cy,cz,rx,ry,rz,colf)=>{for(let x=cx-rx;x<=cx+rx;x+=q)for(let y=cy-ry;y<=cy+ry;y+=q)for(let z=cz-rz;z<=cz+rz;z+=q){const gx=Math.round(x*4)/4,gy=Math.round(y*4)/4,gz=Math.round(z*4)/4,e=((gx+.125-cx)/rx)**2+((gy+.125-cy)/ry)**2+((gz+.125-cz)/rz)**2;if(e<=1)P(gx,gy,gz,colf(gx,gy,gz))}};
const bz=sit?6.3:7.6,shade=(x,y,z)=>z<bz-1.4||y<.6?C3:z>bz+1.2&&y>1.6?C1:C1;
/* しっぽ（くるんと渦を巻いて細くなる） */
const t0=sit?2.4:.5;for(let z=t0;z<bz-1;z+=q){const u=(z-t0)/(bz-1-t0),r=.3+u*1.5,a2=z*1.6;ball(2+Math.sin(a2)*(.7-u*.5),1.4+Math.cos(a2)*(.4-u*.3),z,r,r*.9,.2,(x,y,zz)=>Math.round(zz*4)%3===0?C4:C2)}
/* 体（ぷっくりした雲） */
ball(2,1.5,bz,2.1,1.6,2.2,shade);ball(.6,1.5,bz+1.3,.9,1,.9,shade);ball(3.4,1.5,bz+1.3,.9,1,.9,shade);ball(2,1.6,bz+1.9,1.1,1.1,.8,shade);
/* 頭のてっぺんのくるん（煙の巻き毛） */
ball(2.4,1.5,bz+2.6,.45,.45,.45,()=>C1);ball(2.85,1.5,bz+3.05,.32,.32,.32,()=>C2);ball(2.55,1.5,bz+3.4,.22,.22,.22,()=>C4);
/* ちっちゃい手 */
const hand=(x)=>ball(x,1.9,bz-.6,.45,.45,.45,()=>C2);if(!(nh&1)&&hd!==2)hand(-.15);if(!(nh&2)&&hd!==1)hand(4.15);
/* 顔：前の面を探して目・ほっぺ・口を置く */
const front=(x,z)=>{for(let y=4;y>=0;y-=q)if(M.has(K(x,y,z)))return y;return null};
const fc=(x,z,col)=>{const y=front(x,z);if(y!==null)P(x,y+q,z,col)};
const E="#2b2240",W="#ffffff",PK="#ffb3c7",ez=bz+.35;
for(const ex of[1.25,2.5]){for(let dx=0;dx<.5;dx+=q)for(let dz=0;dz<.75;dz+=q)fc(ex+dx,ez+dz,(dx===0&&dz===.5)?W:E)}
for(const bx of[.75,1,3,3.25])fc(bx,ez-.25,PK);
[[1.75,ez-.5],[2,ez-.75],[2.25,ez-.5]].forEach(([x,z])=>fc(x,z,E));
/* きらきら */
[[-.6,2,bz+2.2],[4.6,1,bz+1.6],[4.4,2.6,bz-2.6],[-.4,1,bz-1.8]].forEach(([x,y,z])=>P(x,y,z,"#fff3a8"));
/* ホースを持つとき */
if(hd){const XS=v=>hd===2?4-v-.5:v;for(let t=0;t<=1.001;t+=1/7)a.push((()=>{const[X,Y]=map(XS(3.7-1.6*t),5.6-2.5*t,.5,.5);return[ox+X,Y0+Y,bz-1+1.2*t,t>.8?"#222222":t<.15?"#8d6e63":"#d4af37",undefined,.5]})());ball(hd===2?.6:3.4,2.6,bz-.4,.45,.45,.45,()=>C2)}
const has=(x,y,z)=>M.has(K(x,y,z));
M.forEach(([x,y,z,col])=>{if(has(x+q,y,z)&&has(x-q,y,z)&&has(x,y+q,z)&&has(x,y-q,z)&&has(x,y,z+q)&&has(x,y,z-q))return;const[X,Y]=map(x,y,q,q);a.push([ox+X,Y0+Y,z,col,undefined,q])})};
const EXLOOK={1:{sp:"ex1"},2:{sp:"ex2"},3:{sp:"ex3",acc:0},10:{sp:"ex10",top:0,bot:0},12:{sp:"ex12",hs:9},13:{sp:"ex13",top:0,bot:0},14:{sp:"ex14"},15:{sp:"ex15"},20:{sp:"ex20",acc:0},24:{sp:"ex24",hs:98},25:{sp:"ex25"},26:{sp:"ex26"},27:{sp:"ex27"},29:{sp:"ex29",acc:0},30:{sp:"ex30",aura:"#c4b5fd",pants:"#ede9fe",shoe:"#ede9fe"}};
function exLook(){(G.cs||[]).forEach(c=>{if(c.ex&&EXLOOK[c.exn])Object.assign(c,EXLOOK[c.exn])})}
{const _ei=exInit;exInit=function(){_ei();exLook()}}
exLook();

(G.cs||[]).forEach(c=>{if(c.sp==="noriyoshi")c.hair="#141416"});
/* ===== レア3・4の名前の変更（保存データも置きかえ） ===== */
{const RN=[["伊藤 かな子", "社田 つとめ"], ["小林 海斗", "単位 とる夫"], ["吉田 拓海", "学食 太郎"], ["近藤 明日香", "前髪 そろえ"], ["福田 海斗", "刈上 健"], ["井上 由奈", "配線 つなぎ"], ["山田 涼", "大盛 一丁"], ["青木 康平", "皿洗 勇"], ["石川 里奈", "自由 きま子"], ["渡辺 咲良", "在宅 ゆう子"], ["山田 楓", "納品 まち子"], ["竹内 凛", "教壇 たつ子"], ["坂本 梨花", "宿題 ゆき"], ["太田 陸", "名刺田 くばる"], ["渡辺 翔", "売上 のびる"], ["竹内 舞", "音色 かなで"], ["長谷川 明日香", "弦本 ひびき"], ["阿部 誠", "判子 押男"], ["藤田 朔", "窓口 待"], ["清水 航", "配色 あお"], ["斎藤 慎吾", "余白 広"], ["山口 達也", "棟上 正"], ["原田 慎吾", "金槌 一徹"], ["山田 蓮", "園田 まもる"], ["前田 咲良", "砂場 あそ美"], ["三浦 健太", "聴診 器一"], ["渡辺 海斗", "預金 守男"], ["藤田 雄大", "水割 進"], ["岡田 陸", "放水 陽太"], ["青木 大輝", "鎮火 豪"], ["竹内 瑞希", "火消 ほのか"], ["村上 颯太", "稲刈 大地"], ["高橋 竜胆", "定時 かえる"], ["渡辺 紗季", "残業 まゆみ"], ["加藤 茜", "休講 よし子"], ["山田 真央", "卒論 まどか"], ["原田 茜", "巻髪 まき"], ["原田 凛", "虫取 まり"], ["吉田 美咲", "看板 みき"], ["斎藤 悠斗", "厨房 熱男"], ["斎藤 陽菜", "請求 しょう子"], ["山本 舞", "独立 はるか"], ["竹内 大輝", "体育 鉄男"], ["青木 彩花", "花丸 よし子"], ["福田 結衣", "得意 先子"], ["岡田 千春", "契約 ゆい"], ["高橋 結衣", "役所 のり子"], ["遠藤 琴音", "受付 しずく"], ["井上 葵", "昼寝 ねむ"], ["後藤 杏", "金庫 しまこ"], ["三浦 悠真", "炭酸 泡二"], ["阿部 駿", "梯子 登"], ["斎藤 舞", "畑中 みのり"], ["加藤 翼", "宅配 届"], ["鈴木 舞", "置配 はこ"]];const m=new Map(RN);(G.cs||[]).forEach(c=>{if(!c.ex&&m.has(c.name))c.name=m.get(c.name)});}

/* レトロ棚とラジカセを1マスの奥行きに */
DMD.radio=["1e88e5,212121,424242,43a047,6b4423,78909c,7b4f2c,9c6b3a,9e9e9e,cfcfcf,e53935,fdd835,ff7043", "IgAEIwAEMgAEMwAEQgAEQwAEUgAEUwAEYgAEYwAEcgAEcwAEggAEgwAEkgAEkwAEogAEowAEsgAEswAEwgAEwwAE0gAE0wAEJAAGJQAGNAAGNQAGRAAGRQAGVAAGVQAGZAAGZQAGdAAGdQAGhAAGhQAGlAAGlQAGpAAGpQAGtAAGtQAGxAAGxQAG1AAG1QAGJgAGJwAGNgAGNwAGRgAGRwAGVgAGVwAGZgAGZwAGdgAGdwAGhgAGhwAGlgAGlwAGpgAGpwAGtgAGtwAGxgAGxwAG1gAG1wAGKAAGKQAGOAAGOQAGSAAGSQAGWAAGWQAGaAAGaQAGeAAGeQAGiAAGiQAGmAAGmQAGqAAGqQAGuAAGuQAGyAAGyQAG2AAG2QAGKgAGKwAGOgAGOwAGSgAGSwAGWgAGWwAGagAGawAGegAGewAGigAGiwAGmgAGmwAGqgAGqwAGugAGuwAGygAGywAG2gAG2wAGIgEEIwEEMgEEMwEEQgEEQwEEUgEEUwEEYgEEYwEEcgEEcwEEggEEgwEEkgEEkwEEogEEowEEsgEEswEEwgEEwwEE0gEE0wEEJAEGJQEGZAEDZQEDhAEBhQEBtAEBtQEB1AEG1QEGJgEGJwEGZgEDZwEDhgEBhwEBtgEBtwEB1gEG1wEGKAEGKQEGOAEKOQEKSAEASQEAWAELWQELaAEDaQEDiAEBiQEBmAEBmQEBqAEBqQEBuAEBuQEB2AEG2QEGKgEGKwEG2gEG2wEGIgIEIwIEMgIEMwIEQgIEQwIEUgIEUwIEYgIEYwIEcgIEcwIEggIEgwIEkgIEkwIEogIEowIEsgIEswIEwgIEwwIE0gIE0wIEJAIGJQIGZAIDZQIDhAIBhQIBlAIBlQIBpAIBpQIBtAIBtQIB1AIG1QIGJgIGJwIGZgIDZwIDhgIBhwIBlgIBlwIBpgIBpwIBtgIBtwIB1gIG1wIGKAIGKQIGOAIKOQIKSAIASQIAWAILWQILaAIDaQIDiAIBiQIBmAIBmQIBqAIBqQIBuAIBuQIB2AIG2QIGKgIGKwIG2gIG2wIGIgMEIwMEMgMEMwMEQgMEQwMEUgMEUwMEYgMEYwMEcgMEcwMEggMEgwMEkgMEkwMEogMEowMEsgMEswMEwgMEwwME0gME0wMEJAMGJQMGNAMKNQMKRAMARQMAVAMLVQMLZAMDZQMD1AMG1QMGJgMGJwMGNgMKNwMKRgMARwMAVgMLVwMLZgMDZwMD1gMG1wMGKAMGKQMGOAMKOQMKSAMASQMAWAMLWQMLaAMDaQMD2AMG2QMGKgMGKwMG2gMG2wMGIgQEIwQEMgQEMwQEQgQEQwQEUgQEUwQEYgQEYwQEcgQEcwQEggQEgwQEkgQEkwQEogQEowQEsgQEswQEwgQEwwQE0gQE0wQEJAQGJQQG1AQG1QQGJgQGJwQG1gQG1wQGKAQGKQQG2AQG2QQGKgQGKwQG2gQG2wQGIgUEIwUEMgUEMwUEQgUEQwUEUgUEUwUEYgUEYwUEcgUEcwUEggUEgwUEkgUEkwUEogUEowUEsgUEswUEwgUEwwUE0gUE0wUEJAUGJQUGNAUHNQUHRAUHRQUHVAUHVQUHZAUHZQUHdAUHdQUHhAUHhQUHlAUHlQUHpAUHpQUHtAUHtQUHxAUHxQUH1AUG1QUGJgUGJwUGNgUHNwUHRgUHRwUHVgUHVwUHZgUHZwUHdgUHdwUHhgUHhwUHlgUHlwUHpgUHpwUHtgUHtwUHxgUHxwUH1gUG1wUGKAUGKQUGOAUHOQUHSAUHSQUHWAUHWQUHaAUHaQUHeAUHeQUHiAUHiQUHmAUHmQUHqAUHqQUHuAUHuQUHyAUHyQUH2AUG2QUGKgUGKwUGOgUHOwUHSgUHSwUHWgUHWwUHagUHawUHegUHewUHigUHiwUHmgUHmwUHqgUHqwUHugUHuwUHygUHywUH2gUG2wUGNgYJRgYJVgYJZgYJdgYJhgYJlgYJpgYJtgYJxgYJNwYJxwYJOAYJyAYJOQYJSQYJWQYJaQYJeQYJiQYJmQYJqQYJuQYJyQYJNgcJRgcJVgcJZgcJdgcJhgcJlgcJpgcJtgcJxgcJNwcJxwcJOAcJyAcJOQcJaQcJuQcJyQcJSgcCWgcCegcFigcFmgcCqgcCNggJRggJVggJZggJdggJhggJlggJpggJtggJxggJNwgJxwgJOAgJyAgJOQgJaQgJuQgJyQgJSggCWggCeggFiggFmggCqggCNgkJRgkJVgkJZgkJdgkJhgkJlgkJpgkJtgkJxgkJNwkJxwkJOAkJyAkJOQkJSQkJWQkJaQkJmQkJqQkJuQkJyQkJegkMigkMNgoIRgoIVgoIZgoIdgoIhgoIlgoIpgoItgoIxgoINwoIRwoIVwoIZwoIdwoIhwoIlwoIpwoItwoIxwoIOAoIWAoIaAoIeAoIiAoImAoIqAoIyAoIOQoISQoIWQoIaQoIeQoIiQoImQoIqQoIuQoIyQoISAsIuAsISAwIWAwIaAwIeAwIiAwImAwIqAwIuAwI"];

/* 店主の定位置（入口横）。ふさがっていたら一番近い空きマス */
function owHomeXY(){try{const ok=(x,y)=>{const k=x+","+y;if(!FLS.has(k)||k==="0,2")return false;if(G.decor.some(d=>d.tx===x&&d.ty===y))return false;if(k!=="0,1"&&BL.has(k))return false;return!(FR&&FR.tx===x&&(y===FR.ty||y===FR.ty+1))};if(ok(0,1))return[3,8];let best=null,bd=1e9;for(const[x,y]of FLT){if(!ok(x,y))continue;const d=Math.abs(x)+Math.abs(y-1)*1.01;if(d<bd){bd=d;best=[x,y]}}return best?[best[0]*6+3,best[1]*6+2]:[3,8]}catch(e){return[3,8]}}
{const _b=build;build=function(){const r=_b.apply(this,arguments);try{if(R.phase!=="run"&&!(OW.path&&OW.path.length)&&!OW.sitting&&OW.x>-100){const h=owHomeXY();OW.x=h[0];OW.y=h[1]}}catch(e){}return r}}
/* チェキの撮影場所：2人が並べる空きマスの一覧 */
function ckSpots(){const F=FLT.slice().sort((a,b)=>(b[1]-a[1])||(a[0]-b[0])),L=[];for(const[tx,ty]of F){if(!occ(tx,ty)&&FLS.has((tx+1)+","+ty)&&!occ(tx+1,ty))L.push([tx,ty])}return L}
function ckSpLbl(){const e=document.getElementById("cksn"),n=(R.ckPose!=null&&CKP[R.ckPose]&&CKP[R.ckPose][1].sit&&ckSitPairs().length)?ckSitPairs().length:ckSpots().length;if(e)e.textContent=n?((((R.ckSp||0)%n)+n)%n+1)+" / "+n:"";}
/* 営業が終わったら換気のエフェクトを消す */
{const _e=endDay;endDay=function(){R.vent=0;R.vcd=0;return _e.apply(this,arguments)}}
{const _c=closeDay;closeDay=function(){R.vent=0;R.vcd=0;return _c.apply(this,arguments)}}

/* 営業中は招待チケット・ガチャ・チェキを押せなくする */
{const runNG=()=>R.phase==="run";
const lockX=()=>{const ng=runNG();["#tixb","#gachab","#chekib"].forEach(id=>{const b=document.querySelector(id);if(b){b.disabled=ng;b.style.opacity=ng?".45":"";b.style.pointerEvents=ng?"none":""}})};
{const _x=xrow;xrow=function(){const r=_x.apply(this,arguments);try{lockX()}catch(e){}return r}}
for(const nm of["tixPanel","gachaPanel","chekiPanel"]){const o=window[nm];if(typeof o!=="function")continue;window[nm]=function(){if(runNG()){try{toast("営業中は使えません")}catch(e){}return}return o.apply(this,arguments)}}
{const _s=start;start=function(){const r=_s.apply(this,arguments);try{["#tixp","#gap","#ckp"].forEach(id=>{const e=document.querySelector(id);if(e)e.remove()});lockX()}catch(e){}return r};$("#go").onclick=start}
setInterval(()=>{try{lockX()}catch(e){}},500)}

/* 店主の定位置は入口横（0,1）に固定。古いセーブでそこに置物があれば持ち物へ */
owHomeXY=function(){return[3,8]};
try{let mv=0;G.decor=(G.decor||[]).filter(d=>{if((d.tx===0&&(d.ty===1||d.ty===2))){try{ivAdd({t:"d",id:d.id});mv++}catch(e){}return false}return true});if(mv){build();log("📦 店主の定位置にあった置物を持ち物にしまいました（"+mv+"個）")}}catch(e){}

/* ===== 売上グラフ ===== */
function histInit(){if(!G.hist)G.hist={d:[],m:[]};if(!G.hist.d.length&&G.week&&G.week.length)G.week.forEach((e,i)=>G.hist.d.push({m:G.month,wd:i,s:e.sales||0,v:e.visits||0,c:e.closed?1:0}))}
histInit();
{const _dd=dayDone;dayDone=function(en){try{if(!G.at2&&en){histInit();G.hist.d.push({m:G.month,wd:G.wd,s:en.sales||0,v:en.visits||0,c:en.closed?1:0});if(G.hist.d.length>84)G.hist.d.splice(0,G.hist.d.length-84)}}catch(e){}return _dd.apply(this,arguments)}}
{const _st=settle;settle=function(){const r=_st.apply(this,arguments);try{const L=G.last;if(L&&!L._h&&L.month===G.month&&L.after!=null){histInit();const x=L.s2||{};const cost=(L.rent||0)+(L.util||0)+(L.flv||0)+(L.dc||0)+(L.coal||0)+(L.brk?L.brk.cost:0);
G.hist.m.push({m:G.month,s:(L.est||0)+((x.sales||0)+(x.auto||0)),c:cost,p:(L.after||0)-(L.before||0),mo:L.after,v:L.vis||0});if(G.hist.m.length>36)G.hist.m.splice(0,G.hist.m.length-36);L._h=1;save()}}catch(e){}if(typeof grfDraw==="function")grfDraw();return r}}
let GRM="d";
function grfDraw(){const cv=document.getElementById("grfc");if(!cv||!cv.offsetWidth)return;histInit();const W2=cv.offsetWidth,H2=190,dp=window.devicePixelRatio||1;cv.width=W2*dp;cv.height=H2*dp;const g=cv.getContext("2d");g.setTransform(dp,0,0,dp,0,0);g.clearRect(0,0,W2,H2);
const yen2=v=>(v<0?"-":"")+(Math.abs(v)>=10000?(Math.abs(v)/10000).toFixed(Math.abs(v)>=1e6?0:1).replace(/\.0$/,"")+"万":Math.round(Math.abs(v)).toLocaleString());
const L=GRM==="d"?G.hist.d.slice(-28):G.hist.m.slice(-12),sm=document.getElementById("grfs");
g.font="11px sans-serif";g.fillStyle="#998fae";
if(!L.length){g.textAlign="left";g.fillText(GRM==="d"?"営業するとここに日ごとの売上が出ます":"月末の精算をするとここに月ごとの売上が出ます",8,H2/2);if(sm)sm.innerHTML="";return}
const pl=44,pr=6,pt=10,pb=22,cw=W2-pl-pr,ch=H2-pt-pb;
const vals=GRM==="d"?L.map(e=>e.s):L.map(e=>e.s),pv=GRM==="m"?L.map(e=>e.p):[],mx=Math.max(1,...vals,...pv),mn=Math.min(0,...pv),rg=mx-mn,Y=v=>pt+ch*(1-(v-mn)/rg);
g.strokeStyle="#ece6f4";g.lineWidth=1;g.textAlign="right";for(let i=0;i<=4;i++){const v=mn+rg*i/4,y=Y(v);g.beginPath();g.moveTo(pl,y);g.lineTo(W2-pr,y);g.stroke();g.fillText(yen2(v),pl-4,y+4)}
if(mn<0){g.strokeStyle="#b9b0c8";g.beginPath();g.moveTo(pl,Y(0));g.lineTo(W2-pr,Y(0));g.stroke()}
const n=L.length,bw=cw/Math.max(n,GRM==="d"?14:6),gap=Math.max(1,bw*.22);
L.forEach((e,i)=>{const x=pl+i*bw+gap/2,w=bw-gap,y=Y(e.s),y0=Y(0);g.fillStyle=GRM==="d"?(e.c?"#cfc8da":(e.wd>=5?"#f0a14a":"#7b4fd0")):"#7b4fd0";g.fillRect(x,Math.min(y,y0),w,Math.max(1,Math.abs(y0-y)));
if(GRM==="d"&&e.wd===0){g.fillStyle="#998fae";g.textAlign="center";g.fillText(MN[e.m%12]+"月",x+w/2,H2-6)}if(GRM==="m"){g.fillStyle="#998fae";g.textAlign="center";g.fillText(MN[e.m%12]+"月",x+w/2,H2-6)}});
if(GRM==="m"){g.strokeStyle="#22a06b";g.lineWidth=2;g.beginPath();L.forEach((e,i)=>{const x=pl+i*bw+bw/2,y=Y(e.p);i?g.lineTo(x,y):g.moveTo(x,y)});g.stroke();L.forEach((e,i)=>{const x=pl+i*bw+bw/2,y=Y(e.p);g.fillStyle=e.p<0?"#e5484d":"#22a06b";g.beginPath();g.arc(x,y,3,0,7);g.fill()})}
if(sm){if(GRM==="d"){const op=L.filter(e=>!e.c),av=op.length?op.reduce((a,e)=>a+e.s,0)/op.length:0,best=op.reduce((b,e)=>e.s>(b?b.s:-1)?e:b,null),wk=op.filter(e=>e.wd>=5),wd=op.filter(e=>e.wd<5),aw=a=>a.length?a.reduce((x,e)=>x+e.s,0)/a.length:0;
sm.innerHTML=`<span style="color:#7b4fd0">■</span>平日　<span style="color:#f0a14a">■</span>週末　<span style="color:#cfc8da">■</span>休業<br>直近${op.length}日の平均 <b>${yen(Math.round(av))}</b>（平日 ${yen(Math.round(aw(wd)))}／週末 ${yen(Math.round(aw(wk)))}）<br>最高 <b>${best?yen(best.s):"—"}</b>（${best?MN[best.m%12]+"月"+WD[best.wd]+"曜":""}）`}
else{const a=L[L.length-1],b=L[L.length-2],dd=b?Math.round((a.s-b.s)/Math.max(1,b.s)*100):null;sm.innerHTML=`<span style="color:#7b4fd0">■</span>月の売上　<span style="color:#22a06b">●</span>月の収支（返済込み）<br>${MN[a.m%12]}月：売上 <b>${yen(Math.round(a.s))}</b>${dd!=null?`（前月比 ${dd>=0?"+":""}${dd}%）`:""}・経費 ${yen(Math.round(a.c))}・収支 <b style="color:${a.p<0?"#e5484d":"#22a06b"}">${a.p>=0?"+":""}${yen(Math.round(a.p))}</b>`}}
const sg=document.getElementById("s-grf");if(sg){const d=G.hist.d.slice(-7).filter(e=>!e.c);sg.textContent=d.length?"　直近7日平均 "+yen(Math.round(d.reduce((a,e)=>a+e.s,0)/d.length)):""}}
document.addEventListener("click",e=>{const b=e.target.closest("[data-gm]");if(!b)return;GRM=b.dataset.gm;document.querySelectorAll("[data-gm]").forEach(x=>x.classList.toggle("on",x===b));grfDraw()});
{const d=document.getElementById("d-grf");if(d)d.addEventListener("toggle",()=>{if(d.open)setTimeout(grfDraw,0)})}
{const _h=hud;let lastN=-1;hud=function(){_h.apply(this,arguments);try{const n=(G.hist?G.hist.d.length+G.hist.m.length*100:0);if(n!==lastN){lastN=n;grfDraw()}}catch(e){}}}

/* ===== 確定申告（1〜12月分を翌2月に納付。払えない分は延滞金10%で3月から分割） ===== */
function taxInit(){if(!G.tax)G.tax={acc:{},cnt:{},due:null,ar:0,ins:0,n:0}}
const calY=m=>Math.floor((m+3)/12);
function calcTax(inc){inc=Math.round(inc);if(inc<=0)return{inc,ao:0,sh:0,kz:0,it:0,jt:0,bt:0,tot:0};
const ao=Math.min(650000,inc),sh=inc-ao,kz=Math.floor(Math.max(0,sh-580000)/1000)*1000;
const B=[[1950000,.05,0],[3300000,.1,97500],[6950000,.2,427500],[9000000,.23,636000],[18000000,.33,1536000],[40000000,.4,2796000],[Infinity,.45,4796000]],b=B.find(x=>kz<=x[0]);
const it=Math.floor(Math.max(0,kz*b[1]-b[2])*1.021/100)*100,jt=Math.floor(Math.max(0,sh-430000)*.1/100)*100+(sh>450000?5000:0),bt=Math.floor(Math.max(0,inc-2900000)*.05/100)*100;
return{inc,ao,sh,kz,it,jt,bt,tot:it+jt+bt}}
function taxEst(){taxInit();const cm=MN[G.month%12],y=calY(G.month);if(G.tax.due&&!G.tax.due.paid)return{fix:1,y:G.tax.due.y,...G.tax.due};
const a=G.tax.acc[y]||0,n=G.tax.cnt[y]||0,rest=12-cm,pj=n?a+a/n*rest:0;return{fix:0,y,...calcTax(pj)}}
function taxRows(r,row){const t=r.tx;if(!t)return"";let h="";
if(t.pay){const d=t.pay;h+=`<div style="height:6px"></div><div class="f"><b>🧾 確定申告（${d.y+1}年目の分）</b><span></span></div>`+row("年間の所得（売上−経費）",yen(d.inc))+row("所得税（復興税2.1%込み）","-"+yen(d.it),"neg")+row("住民税（10%）","-"+yen(d.jt),"neg")+row("個人事業税（290万円を超えた分の5%）","-"+yen(d.bt),"neg")+`<div class="m" style="font-size:11px">青色申告特別控除65万円・基礎控除58万円を引いて計算</div>`+row("今回納めた税金","-"+yen(d.tot-(t.short||0)),"neg");
if(t.short>0)h+=`<div class="neg" style="font-size:12px;margin:4px 0">払えなかった ${yen(t.short)} は延滞金10%を付けて、3月から毎月分割で払います（未納 ${yen(G.tax.ar)}）</div>`}
if(t.inst)h+=row("税金の分割払い（残り "+yen(G.tax.ar)+"）","-"+yen(t.inst),"neg");
if(t.note){const e=t.note;h+=`<div class="taxn" style="margin:8px 0 2px;padding:10px;border-radius:8px;background:#fff3d6;border:2px solid #f0b23a;color:#3b2a12;font-size:13px;line-height:1.7"><b style="font-size:14px;color:#b5520e">🧾 確定申告のお知らせ</b><br>来年2月の精算で、今年1〜12月分の税金をまとめて払います。<br>${e.fix?"納める額":"今のペースだと"}：<b>約${yen(Math.round(e.tot/1000)*1000)}</b>（所得 ${yen(Math.max(0,e.inc))}）<br><span class="neg">2月は閑散期で客も減ります。お金を残しておこう</span></div>`}
return h}
{const _st=settle;settle=function(){const r=_st.apply(this,arguments);try{const L=G.last;taxInit();if(L&&!L.tx&&L.month===G.month&&L.after!=null&&!G.over){const T=G.tax,cm=MN[L.month%12],y=calY(L.month),x=L.s2||{};
const prof=(L.est||0)-(L.rent||0)-(L.util||0)-(L.flv||0)-(L.dc||0)-(L.coal||0)-(L.brk?L.brk.cost:0)+(x.net||0);
T.acc[y]=(T.acc[y]||0)+prof;T.cnt[y]=(T.cnt[y]||0)+1;const tx={};let paid=0;const rsv=(()=>{try{return rentAt(L.month+1)+utilNow()+(G.loan.bal>0?G.loan.pay:0)}catch(e){return 100000}})(),cash=()=>Math.max(0,G.money-rsv);
if(cm===12){T.due={y,...calcTax(T.acc[y]),paid:false}}
if(T.ar>0&&cm!==2){const v=Math.min(T.ar,T.ins,cash());if(v>0){G.money-=v;T.ar-=v;paid+=v;tx.inst=v;if(T.ar<=0)log("🧾 税金の分割払いが終わりました")}}
if(cm===2&&T.due&&!T.due.paid){const d=T.due,v=Math.min(d.tot,cash()),sh=d.tot-v;G.money-=v;paid+=v;d.paid=true;T.n++;tx.pay=d;tx.short=sh;
if(sh>0){T.ar+=Math.ceil(sh*1.1);T.ins=Math.max(10000,Math.ceil(T.ar/6/1000)*1000);log("🧾 税金が払いきれず、未納 "+yen(T.ar)+"（延滞金込み）を3月から分割で払います")}else log("🧾 確定申告を済ませ、税金 "+yen(d.tot)+" を納めました");
if(T.ar>0&&sh===0){}}
if(cm>=10||cm===1){tx.note=taxEst();log("🧾 確定申告のお知らせ：来年2月に税金 約"+yen(Math.round(tx.note.tot/1000)*1000)+" を納めます")}
L.tx=tx;L.txp=paid;if(paid){L.after=G.money;const hm=G.hist&&G.hist.m[G.hist.m.length-1];if(hm&&hm.m===L.month){hm.p-=paid;hm.mo=G.money}}
save();showResult();if(typeof grfDraw==="function")grfDraw()}}catch(e){console.error(e)}return r}}
{const _rf=rfin;rfin=function(){_rf.apply(this,arguments);try{taxInit();const T=G.tax,el=$("#fin");if(!el)return;let h="";const cm=MN[G.month%12];
if(T.ar>0)h+=`<div class="f"><span>🧾 税金の未納</span><span class="neg">${yen(T.ar)}（毎月 ${yen(Math.min(T.ar,T.ins))}）</span></div>`;
else if(cm>=10||cm<=2){const e=taxEst();if(e.tot>0)h+=`<div class="f"><span>🧾 2月の納税${e.fix?"":"見込み"}</span><span class="neg">約${yen(Math.round(e.tot/1000)*1000)}</span></div>`}
if(h){const d=document.createElement("div");d.innerHTML=h;el.appendChild(d)}}catch(e){}}}

/* ===== 模様替え：全部しまう ===== */
document.addEventListener("click",e=>{const b=e.target.closest("#mvall");if(!b)return;e.stopPropagation();
if(!(R.mvAll&&R.mvAll>Date.now())){R.mvAll=Date.now()+4000;mvBar();setTimeout(()=>{if(R.mvAll&&R.mvAll<=Date.now()){R.mvAll=0;try{mvBar()}catch(_){}}},4100);return}
R.mvAll=0;const pre=mvSnap(),keepS=!G.seatU;G.inv=G.inv||[];let n=0;if(!keepS)(G.furn||[]).forEach(F=>{G.inv.push({t:"f",k:F.k,sr:F.sr});n++});(G.decor||[]).forEach(d=>{G.inv.push({t:"d",id:d.id});n++});(G.wall||[]).forEach(d=>{G.inv.push({t:"w",id:d.id});n++});
if(!keepS)G.furn=[];G.decor=[];G.wall=[];R.mvs=null;log(keepS?"📦 置物・壁アイテム "+n+"個を持ち物に戻しました（客席は解禁前なのでそのまま）":"📦 客席・置物・壁アイテム "+n+"個を全部持ち物に戻しました（客席を置かないと営業できません）");mvDone();mvPushU(pre);mvBar()},true);

/* ===== 引き継ぎコード・不思議な贈り物・管理（サーバー：api.php） ===== */
const CLOUD_API="api.php";
const cl=()=>{try{return JSON.parse(localStorage.getItem("shisha_cloud")||"null")}catch(e){return null}},clSet=o=>{try{localStorage.setItem("shisha_cloud",JSON.stringify(o))}catch(e){}};
async function api(o){let r;try{r=await fetch(CLOUD_API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})}catch(e){throw new Error("通信できませんでした。電波のいい所でもう一度試してください")}let j=null;try{j=await r.json()}catch(e){}if(!j)throw new Error("サーバーの応答が読めませんでした（"+r.status+"）");if(!j.ok){const e=new Error(j.error||"エラーが起きました");e.st=r.status;throw e}return j}
const b64=u8=>{let s="";for(let i=0;i<u8.length;i+=32768)s+=String.fromCharCode.apply(null,u8.subarray(i,i+32768));return btoa(s)},ub64=t=>Uint8Array.from(atob(t),c=>c.charCodeAt(0));
async function cpack(){const js=JSON.stringify(G);if(typeof CompressionStream==="function"){try{const st=new Blob([js]).stream().pipeThrough(new CompressionStream("gzip"));return{z:1,data:b64(new Uint8Array(await new Response(st).arrayBuffer()))}}catch(e){}}return{z:0,data:js}}
async function cunpack(z,d){if(!z)return d;const st=new Blob([ub64(d)]).stream().pipeThrough(new DecompressionStream("gzip"));return await new Response(st).text()}
const ydOf=n=>{n=Math.max(1,n|0);const y=Math.floor((n-1)/84),d=(n-1)%84+1;return"プレイ"+(y?y+"年":"")+d+"日目"},monFix=t=>{const m=String(t||"").match(/(?:(\d+)年)?(\d+)日目$/);return m?ydOf((+(m[1]||0))*84+(+m[2])):String(t||"")},monLbl=()=>ydOf(G.day||1),cmeta=()=>({shop:G.ow?G.ow.shop||"":"",owner:G.ow?G.ow.name||"":"",mon:monLbl(),money:Math.round(G.money||0)});
const fdt=t=>{if(!t)return"—";const d=new Date(t*1000);return d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()+" "+d.getHours()+":"+String(d.getMinutes()).padStart(2,"0")};
let cSaving=0;
async function cloudSave(){const c=cl();if(!c||cSaving||!G.setup)return false;cSaving=1;try{const j=await api({a:"save",uid:c.uid,token:c.token,...cmeta(),...(await cpack())});c.at=j.at;c.err=0;clSet(c);return true}catch(e){c.err=e.st===403?2:1;clSet(c);return false}finally{cSaving=0}}
function sysM(h){let m=document.getElementById("sysm");if(!m){m=document.createElement("div");m.id="sysm";m.style.cssText="position:fixed;inset:0;z-index:9999;background:rgba(20,10,40,.55);display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box";m.addEventListener("click",e=>{if(e.target===m||e.target.closest("[data-sx]"))m.remove()});document.body.appendChild(m)}
m.innerHTML=`<div class="card" style="color:#241a33;-webkit-text-fill-color:currentColor;width:100%;max-width:380px;max-height:86vh;overflow:auto;position:relative;background:#fff;border-radius:14px;padding:16px;box-sizing:border-box"><button data-sx style="position:absolute;right:8px;top:8px;padding:2px 10px">✕</button>${h}</div>`;return m}
const sysOff=()=>{const m=document.getElementById("sysm");if(m)m.remove()},sysMsg=(id,t,bad)=>{const e=document.getElementById(id);if(e){e.innerHTML=t;e.style.color=bad?"#e5484d":"#22a06b"}};
const INP='style="width:100%;box-sizing:border-box;font-size:16px;padding:8px;margin:4px 0;border:1px solid #d9d0e8;border-radius:8px"';
function loadBox(){return`<div style="margin-top:14px;padding-top:10px;border-top:1px solid #eee"><b style="font-size:13px">📲 引き継ぎコードで続きから</b><div class="m" style="font-size:11px">別の端末のデータをこの端末に読み込みます</div><input id="cdin" ${INP} placeholder="例：AB12-CD34" autocapitalize="characters" autocomplete="off"><button id="cdld" style="width:100%">読み込む</button><div id="cdlm" style="font-size:12px;margin-top:4px"></div></div>`}
function codeUI(first){const c=cl();
if(!c){sysM(`<b>🔑 引き継ぎコード</b><div style="font-size:13px;line-height:1.7;margin:8px 0">コードを発行すると、<b>毎月の精算のたびに自動でセーブ</b>がサーバーに保存されます。<br>機種変更やデータが消えたときは、このコードで続きから遊べます。</div><button id="cdis" class="on" style="width:100%">コードを発行する</button><div id="cdim" style="font-size:12px;margin-top:4px"></div>${loadBox()}`);return}
sysM(`<b>🔑 引き継ぎコード</b>${first?`<div style="font-size:14px;margin:8px 0;padding:8px;border-radius:8px;background:#fff6e5;line-height:1.6"><b>📸 この画面をスクショしてね！</b><br>あなた専用の<b>引き継ぎコード</b>です。機種変更やデータが消えたときに、このコードで続きから遊べます。<br>これからは毎月の精算で自動セーブされます。</div>`:""}<div style="font-size:30px;font-weight:900;letter-spacing:3px;text-align:center;margin:12px 0;padding:12px 8px;background:#2a1f3d;color:#ffffff;-webkit-text-fill-color:#ffffff;border-radius:10px;font-family:ui-monospace,Menlo,monospace">${esc(c.code)}</div><button id="cdcp" style="width:100%;margin-bottom:6px">📋 コピーする</button><div class="m" style="font-size:12px;line-height:1.6">毎月の精算のたびに自動でセーブされます<br>最後のセーブ：${fdt(c.at)}${c.err===2?`<br><span style="color:#e5484d">⚠️ この端末の登録が無効になっています（別の端末で読み込まれた可能性）。コードで読み込み直してください</span>`:c.err?`<br><span style="color:#e5484d">⚠️ 前回のセーブに失敗しました</span>`:""}</div><button id="cdsv" style="width:100%;margin-top:8px">☁️ 今すぐセーブ</button><div id="cdsm" style="font-size:12px;margin-top:4px"></div>${loadBox()}`)}
let cdArm=0;
document.addEventListener("click",async e=>{const b=e.target.closest("button,#verl");if(!b)return;const id=b.id;
if(id==="cdb"){codeUI();return}
if(id==="cdis"){b.disabled=true;sysMsg("cdim","発行中…");try{const j=await api({a:"issue",...cmeta(),...(await cpack())});clSet({uid:j.uid,token:j.token,code:j.code,at:j.at});log("🔑 引き継ぎコードを発行しました（"+j.code+"）");codeUI(true)}catch(er){b.disabled=false;sysMsg("cdim",esc(er.message),1)}return}
if(id==="cdcp"){const c=cl();try{await navigator.clipboard.writeText(c.code);b.textContent="✅ コピーしました"}catch(er){b.textContent="長押しでコードを選んでコピーしてください"}return}
if(id==="cdsv"){b.disabled=true;sysMsg("cdsm","セーブ中…");const ok=await cloudSave();b.disabled=false;if(ok)codeUI();else{const c=cl();sysMsg("cdsm",c&&c.err===2?"この端末の登録が無効です。コードで読み込み直してください":"セーブできませんでした。通信を確認してください",1)}return}
if(id==="cdld"){const v=(document.getElementById("cdin").value||"").trim();if(!v){sysMsg("cdlm","コードを入れてください",1);return}
if(!(cdArm>Date.now())){cdArm=Date.now()+6000;b.textContent="⚠️ 今のこの端末のデータは上書きされます。もう一度押すと読み込み";return}cdArm=0;b.disabled=true;sysMsg("cdlm","読み込み中…");
try{const j=await api({a:"load",code:v});const js=await cunpack(j.z,j.data);const g=JSON.parse(js);if(!g||!g.cs)throw new Error("セーブデータが壊れています");
const _set=Storage.prototype.setItem;_set.call(localStorage,"shisha_v2",js);_set.call(localStorage,"shisha_cloud",JSON.stringify({uid:j.uid,token:j.token,code:j.code,at:j.at}));Storage.prototype.setItem=function(k,v){if(k==="shisha_v2")return;return _set.call(this,k,v)};
sysM(`<b>✅ 読み込みました</b><div style="font-size:13px;margin:8px 0">「${esc(j.shop||"")}」${esc(j.mon||"")}のデータです。再読み込みします…</div>`);setTimeout(()=>location.reload(),900)}catch(er){b.disabled=false;b.textContent="読み込む";sysMsg("cdlm",esc(er.message),1)}return}
if(id==="giftb2"){giftUI();return}
if(id==="gfok"){const v=(document.getElementById("gfin").value||"").trim(),c=cl();if(!v)return;if(!c){sysMsg("gfm","このあいことばは、☰ →「データ・お知らせ」で引き継ぎコードを発行すると受け取れます",1);return}b.disabled=true;sysMsg("gfm","確認中…");
try{const j=await api({a:"gift",uid:c.uid,token:c.token,pass:v});G.money+=j.money||0;G.tix=(G.tix||0)+(j.tix||0);const rx=rwApply(j.rw);save();hud();try{rfin()}catch(_){}
const t=[j.money?yen(j.money):"",j.tix?"🎟 招待チケット×"+j.tix:""].concat(rx).filter(Boolean).join("・");log("🎁 不思議な贈り物「"+(j.title||"")+"」を受け取った！ "+t);
sysM(`<div style="text-align:center"><div style="font-size:44px">🎁</div><b>${esc(j.title||"不思議な贈り物")}</b><div style="font-size:18px;font-weight:700;margin:10px 0">${esc(t)}</div>${j.msg?`<div class="m" style="font-size:13px;line-height:1.6">${esc(j.msg)}</div>`:""}<button data-sx class="on" style="width:100%;margin-top:12px">受け取った</button></div>`);cloudSave()}catch(er){b.disabled=false;sysMsg("gfm",esc(er.message),1)}return}
if(id==="polb"){sysM(`<b>📄 規約・プライバシー・お問い合わせ</b><div style="display:flex;flex-direction:column;gap:6px;margin-top:10px"><a href="privacy.html" target="_blank" rel="noopener"><button style="width:100%">🔒 プライバシーポリシー</button></a><a href="terms.html" target="_blank" rel="noopener"><button style="width:100%">📜 利用規約</button></a><a href="about.html" target="_blank" rel="noopener"><button style="width:100%">🏢 運営者情報・お問い合わせ</button></a></div><div class="m" style="font-size:11px;margin-top:10px;text-align:center">運営：ミツメディア／info@mitsumedia.xyz</div>`);return}
if(id==="verl"){R.vtap=(R.vtap||[]).filter(t=>t>Date.now()-3000);R.vtap.push(Date.now());if(R.vtap.length>=5){R.vtap=[];admUI()}return}
});
function giftUI(){const c=cl();if(false){sysM(`<b>🎁 不思議な贈り物</b><div style="font-size:13px;line-height:1.7;margin:8px 0">贈り物を受け取るには、先に<b>引き継ぎコード</b>の発行が必要です（1人1回ずつ受け取れるようにするため）。</div><button id="cdb" class="on" style="width:100%">🔑 引き継ぎコードを発行する</button>`);return}
sysM(`<b>🎁 不思議な贈り物</b><div class="m" style="font-size:12px;margin:6px 0">運営からのお知らせなどで届いた「あいことば」を入れてください</div><input id="gfin" ${INP} placeholder="あいことば" autocomplete="off"><button id="gfok" class="on" style="width:100%">受け取る</button><div id="gfm" style="font-size:12px;margin-top:4px"></div>`)}
/* 毎月の精算後に自動セーブ。未発行なら最初の精算後に1回だけ案内 */
{const _st=settle;settle=function(){const r=_st.apply(this,arguments);try{if(cl())setTimeout(cloudSave,50)}catch(e){}return r}}
/* 最初の精算が終わって翌月へ進んだら、自動でコードを発行して表示 */
{const _nm=nextMonth;nextMonth=function(){const r=_nm.apply(this,arguments);try{if(G.setup&&!G.cdAsk2&&!cl()&&!G.over&&/^https?:/.test(location.protocol)){G.cdAsk2=1;save();setTimeout(async()=>{try{const j=await api({a:"issue",...cmeta(),...(await cpack())});clSet({uid:j.uid,token:j.token,code:j.code,at:j.at});log("🔑 引き継ぎコードを発行しました（"+j.code+"）");codeUI(true)}catch(e){toast("🔑 データが消えたときのために、☰ →「データ・お知らせ」から<b>引き継ぎコード</b>を発行しておこう",6000)}},600)}}catch(e){}return r}}
/* ===== 管理ページ（バージョン表記を5回タップ） ===== */
let AP="";
const aapi=o=>api({...o,apass:AP});
function admUI(){sysM(`<b>🛠 管理ページ</b><input id="apin" type="password" ${INP} placeholder="管理パスワード" autocomplete="current-password"><button id="apok" class="on" style="width:100%">ログイン</button><div id="apm" style="font-size:12px;margin-top:4px"></div>`)}
function admHome(st){sysM(`<b>🛠 管理ページ</b><div class="m" style="font-size:12px;margin:4px 0">登録 ${st.players}人・直近7日にセーブ ${st.week}人</div><div style="margin-top:10px;padding:8px;border-radius:8px;background:#f4effb"><b style="font-size:13px">🔄 ゲームの更新</b><div id="dplv" style="font-size:12px;margin:4px 0">確認中…</div><div style="display:flex;gap:6px"><button id="dplgo" class="on" style="flex:2">最新版に更新</button><button id="dplrb" style="flex:1">1つ前に戻す</button></div><div id="dplm" style="font-size:12px;margin-top:4px"></div></div>
<div style="margin-top:10px;padding:8px;border-radius:8px;background:#fdecec"><b style="font-size:13px">⚠️ エラー記録</b><button id="errb" style="width:100%;margin-top:4px">最近のエラーを見る</button><div id="errl" style="font-size:11px;margin-top:6px;max-height:260px;overflow:auto"></div></div>
<div style="margin-top:10px"><b style="font-size:13px">👤 ユーザーを探す</b><input id="aq" ${INP} placeholder="店名・店主名・コード"><button id="aqb" style="width:100%">検索</button><div id="aql" style="font-size:12px;margin-top:6px"></div></div>
<div style="margin-top:14px;padding-top:10px;border-top:1px solid #eee"><b style="font-size:13px">🎁 不思議な贈り物を作る</b>
<input id="ga1" ${INP} placeholder="あいことば（例：おわび1118）"><input id="ga2" ${INP} placeholder="タイトル（例：メンテナンスのお詫び）"><input id="ga3" ${INP} type="number" inputmode="numeric" placeholder="お金（円）"><input id="ga4" ${INP} type="number" inputmode="numeric" placeholder="招待チケット（枚）"><div style="margin:8px 0 4px;padding:8px;border:1px dashed #d9d0e8;border-radius:8px"><b style="font-size:12px">📦 アイテムを付ける</b><select id="gic" ${INP}><option value="d">🪴 置物</option><option value="w">🖼 壁アイテム</option><option value="f">🛋 客席</option><option value="bb">🫘 ビーズクッション</option></select><select id="gii" ${INP}>${giOpts("d")}</select><div style="display:flex;gap:6px;align-items:center"><input id="giq" type="number" inputmode="numeric" value="1" style="width:80px;font-size:16px;padding:8px;border:1px solid #d9d0e8;border-radius:8px"><span style="font-size:12px">個</span><button id="gia" style="flex:1">＋ 追加</button></div><div id="gil" style="font-size:12px;margin-top:6px"></div></div><div style="margin:4px 0;padding:8px;border:1px dashed #d9d0e8;border-radius:8px;font-size:13px;line-height:2"><b style="font-size:12px">✨ その他</b><br><label><input type="checkbox" id="gx4"> 🎰 今日のガチャをもう1回</label><input id="gx2" ${INP} type="number" inputmode="numeric" placeholder="📱 SNSフォロワー＋（人）"><input id="gx3" ${INP} type="number" inputmode="numeric" placeholder="⭐ 知名度＋（最大100）"></div><input id="ga5" ${INP} placeholder="ひとことメッセージ（任意）">
<div class="m" style="font-size:11px">受け取り期限（空欄なら無期限）</div><input id="ga6" ${INP} type="date"><input id="ga7" ${INP} type="number" inputmode="numeric" placeholder="先着人数（空欄か0なら無制限）"><button id="gab" class="on" style="width:100%">作成する</button><div id="gam" style="font-size:12px;margin-top:4px"></div><div id="gal" style="font-size:12px;margin-top:8px"></div></div>`);admGifts();dplLoad()}
async function admGifts(){const el=document.getElementById("gal");if(!el)return;try{const j=await aapi({a:"a_gifts"});el.innerHTML=j.list.length?j.list.map(g=>`<div style="padding:6px 0;border-bottom:1px solid #f0f0f0;${g.active?"":"opacity:.45"}"><b>${esc(g.pass)}</b>　${esc(g.title||"")}<br>${g.money?yen(+g.money)+" ":""}${g.tix?"🎟×"+g.tix+" ":""}受取 ${g.used}${+g.maxuse?"/"+g.maxuse:""}人・${+g.expires?"〜"+fdt(+g.expires).split(" ")[0]:"無期限"} <button data-gt="${g.id}" style="padding:2px 8px;font-size:11px">${g.active?"停止する":"再開する"}</button></div>`).join(""):"まだありません"}catch(e){el.textContent=e.message}}
document.addEventListener("click",async e=>{const b=e.target.closest("button");if(!b)return;
if(b.id==="apok"){AP=document.getElementById("apin").value;sysMsg("apm","確認中…");try{admHome(await aapi({a:"a_login"}))}catch(er){AP="";sysMsg("apm",esc(er.message),1)}return}
if(b.id==="aqb"){const el=document.getElementById("aql");el.textContent="検索中…";try{const j=await aapi({a:"a_search",q:document.getElementById("aq").value});
el.innerHTML=j.list.length?j.list.map(p=>`<div style="padding:6px 0;border-bottom:1px solid #f0f0f0"><b>${esc(p.shop||"（店名なし）")}</b>　店主 ${esc(p.owner||"")}<br>コード <b>${esc(p.code)}</b>・${esc(monFix(p.mon))}・所持金 ${yen(+p.money||0)}<br>開始 ${fdt(+p.created)}・最終 ${fdt(+p.updated)}<br><button data-ah="${p.id}" style="padding:2px 8px;font-size:11px">セーブ履歴（${p.ns}）</button> <button data-ar="${p.id}" style="padding:2px 8px;font-size:11px">コード再発行</button><div id="ah${p.id}"></div></div>`).join(""):"見つかりません"}catch(er){el.textContent=er.message}return}
if(b.dataset.ah){const pid=b.dataset.ah,el=document.getElementById("ah"+pid);try{const j=await aapi({a:"a_saves",pid});el.innerHTML=j.list.map((s,i)=>`<div style="margin:4px 0 0 8px">${i===0?"最新":i+"つ前"}：${fdt(+s.created)}（${Math.round(s.size/1024)}KB）${i?` <button data-rs="${s.id}" data-rp="${pid}" style="padding:2px 8px;font-size:11px">この時点に戻す</button>`:""}</div>`).join("")}catch(er){el.textContent=er.message}return}
if(b.dataset.rs){if(b.dataset.arm!=="1"){b.dataset.arm="1";b.textContent="もう一度押すと戻します";return}try{await aapi({a:"a_restore",pid:b.dataset.rp,sid:b.dataset.rs});b.textContent="✅ 戻しました（本人がコードで読み込むと反映）";b.disabled=true}catch(er){b.textContent=er.message}return}
if(b.dataset.ar){if(b.dataset.arm!=="1"){b.dataset.arm="1";b.textContent="古いコードは使えなくなります。もう一度押すと再発行";return}try{const j=await aapi({a:"a_recode",pid:b.dataset.ar});b.textContent="新しいコード："+j.code;b.disabled=true}catch(er){b.textContent=er.message}return}
if(b.id==="gab"){const v=i=>(document.getElementById("ga"+i).value||"").trim();if(!v(1)){sysMsg("gam","あいことばを入れてください",1);return}if(!+v(3)&&!+v(4)){sysMsg("gam","お金かチケットのどちらかを入れてください",1);return}
try{await aapi({a:"a_gift_add",pass:v(1),title:v(2),money:+v(3)||0,tix:+v(4)||0,msg:v(5),until:v(6),maxuse:+v(7)||0});sysMsg("gam","✅ 作成しました。あいことば「"+esc(v(1))+"」を告知してください");[1,2,3,4,5,6,7].forEach(i=>document.getElementById("ga"+i).value="");admGifts()}catch(er){sysMsg("gam",esc(er.message),1)}return}
if(b.dataset.gt){try{await aapi({a:"a_gift_toggle",id:b.dataset.gt});admGifts()}catch(er){}return}
});

/* ===== 更新チェック：起動時・アプリに戻ったとき・30分ごと。新しい版があればお知らせを出して選んでもらう ===== */
const GVER="__GVER__";
let updV=null,updLater=null,updBusy=0;
async function updCheck(){if(updBusy||!/^https?:/.test(location.protocol))return;updBusy=1;try{const r=await fetch("version.txt?"+Date.now(),{cache:"no-store"});if(!r.ok)return;const v=(await r.text()).trim();if(!v||v===GVER)return;updV=v;updShow()}catch(e){}finally{updBusy=0}}
function updShow(){if(!updV||updLater===updV||document.getElementById("updm"))return;if(R.phase==="run"||!$("#ov").hidden||document.getElementById("sysm")){setTimeout(updShow,5000);return}
const m=sysM(`<div style="text-align:center"><div style="font-size:40px">🆕</div><b>新しいバージョンがあります</b><div style="font-size:14px;margin:8px 0">Ver ${esc(GVER)} → <b>Ver ${esc(updV)}</b></div><div class="m" style="font-size:12px;margin-bottom:10px">セーブデータはそのまま引き継がれます</div><button id="updgo" class="on" style="width:100%;margin-bottom:6px">今すぐ更新</button><button id="updlt" style="width:100%">あとで</button></div>`);m.id="sysm";m.firstElementChild.id="updm"}
document.addEventListener("click",e=>{const b=e.target.closest("#updgo,#updlt");if(!b)return;if(b.id==="updgo"){try{save()}catch(_){}location.replace(location.pathname+"?v="+encodeURIComponent(updV))}else{updLater=updV;sysOff()}});
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){updLater=null;setTimeout(updCheck,800)}});
setTimeout(updCheck,1500);setInterval(updCheck,30*60*1000);

/* ===== 画面サイズに合わせてキャンバスの解像度を合わせる（PCで横に伸びる・スマホで比率がずれるのを防ぐ） ===== */
function fitCv(){try{const r=cv.getBoundingClientRect(),w=Math.round(r.width),h=Math.round(r.height);if(w<80||h<80)return;
let d=Math.max(1,Math.min(R.lite?1.5:2,window.devicePixelRatio||1,Math.sqrt(1300000/(w*h))));{const dv=Math.min(2,window.devicePixelRatio||1);d=d>=1.8?dv:d>=1.3?Math.min(1.5,dv):1}if(w===W&&h===CH&&Math.abs(d-dpr)<.01&&cv.width===Math.round(w*d))return;
W=w;CH=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(CH*dpr);cv.style.aspectRatio=W+" / "+CH;if(typeof BGK!=="undefined")BGK="";R.camVer++;try{if(typeof LITE!=="undefined")LITE.lastD=0;draw()}catch(_){}}catch(e){}}
{let t=0;const go=()=>{clearTimeout(t);t=setTimeout(fitCv,80)};window.addEventListener("resize",go);window.addEventListener("orientationchange",go);if(window.ResizeObserver)new ResizeObserver(go).observe(cv);[0,300,1300].forEach(ms=>setTimeout(fitCv,ms))}

/* ===== のりよし（No.140）のプレゼントを「水無終の掛け軸」（横長・壁2区画）に ===== */
{const x={id:"wp_minashu",n:"水無終の掛け軸",p:0,t:{asian:3,luxury:1},img:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAmCAYAAABagbwLAAADg0lEQVR4Xu2aMWsbQRCFVyFlKiFSmBQpRBAmqHDhSpiQQrULV/4BwahwlTq/IJULYfwDXKVwLUIIRpWLFCIIE1SkCCpCECnSOzyJJ0Zzu3ezZ1lRuP1A3J20u7f7dvbtnKSa+w847rTu0M3OXsv1zq5q29zlre5c//RwLuTwy+1cw8vhbY3vbauwWycoBQN5olnLVRYIJEWK4T51181KhJ522/MllojjbDBa6vhYVp1Mf8e1lMjwKGmyXjKb0njYT8s+gt1Ob0XDFKFrZsVDwezXzzXfolpkIrTeeJp5NRvfnZt+rPQRGvi00Zg8dDa6jAqzo3dj97qz73rdP+Z6/cGTqPIa1Ae+e+Z9FkO9fZwprj3UJGjd3bjJaOLaR+em+7/YPZiX+za+NpUHrBNbj+TV52eY5POL9+Y+kdGHE9dsN93M7RcKavLQ2XQS3YkYYsQsmixM4smbt17hKCbaiBUXAeV2nhcOKyMofEJTbzQXDd6T0EAlUlwLaJNATNbHUV4DlP00vJmf82hlEaFZbTSmtMkqphwcB0A4GAxUlgtFp7QLfa6tBOIg4iS6DK7lco+xI2DVIBOhPjA7ukEKxIFwxqVAMgrkOQemJ6AMaAv3RPvaDri0QWzkaxYRWkxpD9XmntfhvE2BnmddgnIi2QfZBiaYEyWjMLQSrPwzD5W+hcEVbSJyoJbzkAfyfUasxGdFsbv9Rj00tHRlBPnA53leSXweyvcwCaGJQL9kRLMO7SHGBqweatqUMDt5MDpCRl/Ucb2hlEG2IYXTG1bsZkSKNCClPdQKLYBpjA+rfwJGHIXRqRE3IJ1nykiWuerng8OVLr26vvL20eqhtmf5nAgt8kiJjlSIY/FNX+ag29KToq91ZJbxUMuzvGnJh/zDt5v60LstxaCH4nO+EFmhcyDLMmKBXPI8197OumXYiIf6EuoQUlTtmXI5ynxSnsvHRl/E+iIO73EV8B5lc98H91B0TIokH+tCUEg5eJmjarT/Sr+Uj7F5y1lOBOAksU7IMzVWDy39LK8jQnfcR97DgNXTMCkQpSiz8E0ONyweY3b8jeahEgyYPlgEI1bnmToFktcUPpRqFaVgMjuIweqhUd+HVhnr96GZXR6/KekXoTFX8YgIzdOGmCI0ESb9jPzAmBL7hJ1aa6e+/KdI9+Uze83EksHXH8vz9GexNZOWfCJRKf4CF/rRgoHZ9vUAAAAASUVORK5CYII=",iw:84,ih:38,w2:1,u:["gift",0]};if(!WP.some(q=>q.id===x.id))WP.push(x);const c=G.cs.find(q=>q.sp==="noriyoshi");GIFT[c?c.i:139]=x}

/* ===== 遊んでいるデータにも、のりよし・三ツ目のセリフとフレーバーを反映 ===== */
{const UP={"139": {"fl": 1, "ls": ["ダークシガーこそ至高 ", "香り系ってなんなん", "ミズナーシはやめろ", "水が無くなったら、終わり。", "水無終は手叩け", "ゆっちゃん……"]}, "150": {"fl": 48, "ls": ["おすおす", "マリオゴルフある？", "このゲームおもしろい？", "よなちるよろしくね！", "おす", "パパウパウパウ", "だれがなんと言おうとシーシャ吸う～", "「シーシャ吸う。」applemusicで聞いてね", "不思議な贈り物で[とらとらすいえんてん]って入れてみて"]}};if(!G.up1118){G.cs.forEach(c=>{const u=UP[c.i];if(u){c.fl=u.fl;c.ls=u.ls.slice()}});G.up1118=1;try{save()}catch(e){}}}
/* ===== あいことば（ゲーム内だけで受け取れる・1人1回・期限なし） ===== */
const LPASS={"とらとらすいえんてん": "seat:tg"};
const kata2hira=t=>t.replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60));
function lpTry(v){const k=kata2hira(v.replace(/[\s　]/g,""));const id=LPASS[k];if(!id)return null;G.lpu=G.lpu||[];if(G.lpu.includes(k))return{err:"この贈り物はもう受け取っています"};
if(id.startsWith("seat:")){const sr=id.slice(5),S=SSER.find(q=>q.id===sr);if(!S)return{err:"贈り物が見つかりませんでした"};G.tigerU=1;const ok=ivAdd({t:"f",k:"l",sr});G.lpu.push(k);save();try{rdeco()}catch(e){}
log("🐯 不思議な贈り物：「"+S.n+"」の客席シリーズが解禁！2人がけソファを1つもらった"+(ok?"（📦 持ち物へ）":"（持ち物がいっぱい：受け取り待ちへ）"));return{x:{n:S.n+"の客席シリーズ解禁＋2人がけソファ"},ok}}
const w=WP.find(q=>q.id===id),d=DEC.find(q=>q.id===id),x=w||d;if(!x)return{err:"贈り物が見つかりませんでした"};
const ok=ivAdd({t:w?"w":"d",id});G.lpu.push(k);save();try{rdeco()}catch(e){}log("🎁 不思議な贈り物「"+x.n+"」を受け取った！"+(ok?"（📦 持ち物へ）":"（持ち物がいっぱい：受け取り待ちへ）"));return{x,ok}}
document.addEventListener("click",e=>{const b=e.target.closest("#gfok");if(!b)return;const v=(document.getElementById("gfin").value||"").trim();const r=lpTry(v);if(!r)return;e.stopImmediatePropagation();
if(r.err){sysMsg("gfm",r.err,1);return}sysM(`<div style="text-align:center"><div style="font-size:44px">🎁</div><b>不思議な贈り物</b><div style="font-size:18px;font-weight:700;margin:10px 0">${esc(r.x.n)}</div><div class="m" style="font-size:13px">${r.ok?"📦 持ち物に入れました":"持ち物がいっぱいなので、受け取り待ちに入れました"}</div><button data-sx class="on" style="width:100%;margin-top:12px">受け取った</button></div>`);try{cloudSave()}catch(_){}},true);

/* ===== 虎シリーズは黒い縞模様 ===== */
{const _fv=furnVox;furnVox=function(F,ox,oy){const L=_fv.apply(this,arguments);try{const v=seatSer(F);if(!v||!v.tiger)return L;
return L.map(q=>{if(q[3]!==v.fr||q[2]<1)return q;const t=((q[0]*2+q[1]+Math.floor(q[2]*1.5))%8+8)%8;return t<2?[q[0],q[1],q[2],"#17120f"]:q})}catch(e){return L}}}

/* ===== 画面上部にプレイ日数 ===== */
const ydLbl=()=>{const n=Math.max(1,G.day||1),y=Math.floor((n-1)/84),d=(n-1)%84+1;return(y?y+"年":"")+d+"日目"};
{const _h=hud;hud=function(){_h.apply(this,arguments);try{const d=$("#day");if(d&&G.setup){const t=d.textContent.replace(/\s*プレイ(\d+年)?\d+日目$/,"");d.innerHTML=esc(t)+'<small style="display:block;font-size:10px;opacity:.8;font-weight:600">プレイ'+ydLbl()+'</small>'}}catch(e){}}}

/* ===== 不思議な贈り物：アイテム・その他の中身 ===== */
const SEATK=["s","l","t","b","c"];
function giList(c){if(c==="d")return DEC.map(x=>[x.id,x.n]);if(c==="w")return WP.map(x=>[x.id,x.n]);if(c==="bb")return BBS.map(b=>[b.id,"ビーズクッション（"+b.n+"）"]);
const o=[];SSER.forEach(sr=>SEATK.forEach(k=>o.push([k+":"+sr.id,SDEF[k].nm+"（"+sr.n+"）"])));return o}
function giOpts(c){return giList(c).map(([v,n])=>`<option value="${esc(v)}">${esc(n)}</option>`).join("")}
function giName(it){if(it.c==="d"){const x=DEC.find(q=>q.id===it.id);return x?x.n:it.id}if(it.c==="w"){const x=WP.find(q=>q.id===it.id);return x?x.n:it.id}if(it.c==="bb"){const b=BBS.find(q=>q.id===it.id);return"ビーズクッション（"+(b?b.n:it.id)+"）"}const[k,sr]=it.id.split(":"),S=SSER.find(q=>q.id===sr);return(SDEF[k]?SDEF[k].nm:k)+"（"+(S?S.n:sr)+"）"}
let GIL=[];
function giDraw(){const el=document.getElementById("gil");if(!el)return;el.innerHTML=GIL.length?GIL.map((it,i)=>`<span style="display:inline-block;background:#f4effb;border-radius:12px;padding:2px 8px;margin:2px">${esc(giName(it))}×${it.q} <a href="#" data-gid="${i}" style="color:#e5484d;text-decoration:none">✕</a></span>`).join(""):"<span class='m'>（アイテムなし）</span>"}
function rwText(rw){if(!rw)return[];const o=[];(rw.items||[]).forEach(it=>o.push(giName(it)+"×"+it.q));if(rw.gacha)o.push("🎰ガチャもう1回");if(rw.fol)o.push("📱フォロワー+"+rw.fol);if(rw.fame)o.push("⭐知名度+"+rw.fame);return o}
function rwApply(rw){if(!rw)return[];let pend=0;(rw.items||[]).forEach(it=>{const q=Math.max(1,Math.min(99,+it.q||1));for(let i=0;i<q;i++){let r;if(it.c==="d"||it.c==="w")r=ivAdd({t:it.c,id:it.id});else if(it.c==="bb")r=ivAdd({t:"f",k:"bb",sr:it.id});else{const[k,sr]=it.id.split(":");if(sr==="tg")G.tigerU=1;r=ivAdd({t:"f",k,sr})}if(!r)pend++}});
if(rw.gacha)G.gaD=-1;if(G.ow){if(rw.fol)G.ow.fol=(G.ow.fol||0)+(+rw.fol||0);if(rw.fame)G.ow.fame=Math.min(100,(G.ow.fame||0)+(+rw.fame||0))}
save();try{rdeco();hud()}catch(e){}const t=rwText(rw);if(pend)t.push("（持ち物がいっぱいの分は受け取り待ちへ）");return t}
document.addEventListener("change",e=>{if(e.target.id==="gic"){const s2=document.getElementById("gii");if(s2)s2.innerHTML=giOpts(e.target.value)}});
document.addEventListener("click",async e=>{const a=e.target.closest("[data-gid]");if(a){e.preventDefault();GIL.splice(+a.dataset.gid,1);giDraw();return}
const b=e.target.closest("button");if(!b)return;
if(b.id==="gia"){const c=document.getElementById("gic").value,id=document.getElementById("gii").value,q=Math.max(1,Math.min(99,+document.getElementById("giq").value||1));if(!id)return;const ex=GIL.find(x=>x.c===c&&x.id===id);if(ex)ex.q=Math.min(99,ex.q+q);else GIL.push({c,id,q});giDraw();return}
if(b.id==="gab"){e.stopImmediatePropagation();const v=i=>(document.getElementById("ga"+i).value||"").trim(),xv=i=>document.getElementById("gx"+i);
const rw={items:GIL.slice(),gacha:xv(4).checked?1:0,fol:+xv(2).value||0,fame:+xv(3).value||0};const has=rw.items.length||rw.gacha||rw.fol||rw.fame;
if(!v(1)){sysMsg("gam","あいことばを入れてください",1);return}if(!+v(3)&&!+v(4)&&!has){sysMsg("gam","贈り物の中身を1つ以上選んでください",1);return}
try{await aapi({a:"a_gift_add",pass:v(1),title:v(2),money:+v(3)||0,tix:+v(4)||0,msg:v(5),until:v(6),maxuse:+v(7)||0,rw});sysMsg("gam","✅ 作成しました。あいことば「"+esc(v(1))+"」を告知してください");
[1,2,3,4,5,6,7].forEach(i=>document.getElementById("ga"+i).value="");[2,3].forEach(i=>xv(i).value="");[1,4].forEach(i=>xv(i).checked=false);GIL=[];giDraw();admGifts()}catch(er){sysMsg("gam",esc(er.message),1)}}},true);
admGifts=async function(){const el=document.getElementById("gal");if(!el)return;giDraw();try{const j=await aapi({a:"a_gifts"});el.innerHTML=j.list.length?j.list.map(g=>{let rw=null;try{rw=JSON.parse(g.rw||"null")}catch(e){}const parts=[+g.money?yen(+g.money):"",+g.tix?"🎟×"+g.tix:""].concat(rwText(rw)).filter(Boolean).join("・");
return`<div style="padding:6px 0;border-bottom:1px solid #f0f0f0;${+g.active?"":"opacity:.45"}"><b>${esc(g.pass)}</b>　${esc(g.title||"")}<br>${esc(parts)}<br>受取 ${g.used}${+g.maxuse?"/"+g.maxuse:""}人・${+g.expires?"〜"+fdt(+g.expires).split(" ")[0]:"無期限"} <button data-gt="${g.id}" style="padding:2px 8px;font-size:11px">${+g.active?"停止する":"再開する"}</button></div>`}).join(""):"まだありません"}catch(e){el.textContent=e.message}};

/* ===== チェキの撮影場所：となり合う場所は1つにまとめ、場所ごとに角度も変える ===== */
ckSpots=function(){const F=FLT.slice().sort((a,b)=>(b[1]-a[1])||(a[0]-b[0])),L=[];for(const[tx,ty]of F){if(occ(tx,ty)||!FLS.has((tx+1)+","+ty)||occ(tx+1,ty))continue;if(L.some(([x,y])=>Math.abs(x-tx)<3&&Math.abs(y-ty)<2))continue;L.push([tx,ty])}
if(!L.length)for(const[tx,ty]of F){if(!occ(tx,ty)&&FLS.has((tx+1)+","+ty)&&!occ(tx+1,ty)){L.push([tx,ty]);break}}return L};

/* ===== ↷ 模様替えの「やり直す」 ===== */
function mvRedo(){const nx=(R.mvR||[]).pop();if(!nx)return;R.mvU.push(mvSnap());const o=JSON.parse(nx);G.furn=o.f;G.decor=o.d;G.wall=o.w;G.inv=o.i;R.mvs=null;R.mvT=null;mvDone();mvBar();log("↷ やり直しました")}

/* ===== 管理：GitHubから最新版に更新 ===== */
async function dplLoad(){const el=document.getElementById("dplv");if(!el)return;try{const j=await aapi({a:"a_ver"});el.innerHTML=`サーバー：<b>Ver ${esc(j.cur||"?")}</b>　GitHub：<b>Ver ${esc(j.gh||"取得できず")}</b>${j.gh&&j.gh!==j.cur?' <span style="color:#e5484d">← 新しい版があります</span>':j.gh?' <span style="color:#22a06b">最新です</span>':""}`;const rb=document.getElementById("dplrb");if(rb)rb.disabled=!j.prev}catch(e){el.textContent=e.message}}
document.addEventListener("click",async e=>{const b=e.target.closest("#dplgo,#dplrb");if(!b)return;e.stopImmediatePropagation();if(b.dataset.arm!=="1"){b.dataset.arm="1";b.dataset.t=b.textContent;b.textContent="もう一度押すと実行";setTimeout(()=>{b.dataset.arm="";b.textContent=b.dataset.t},4000);return}
b.dataset.arm="";b.textContent=b.dataset.t;b.disabled=true;sysMsg("dplm","実行中…");try{const j=await aapi({a:b.id==="dplgo"?"a_deploy":"a_rollback"});sysMsg("dplm","✅ Ver "+esc(j.ver)+" にしました。みんなの画面も次に開いたとき切り替わります");dplLoad()}catch(er){sysMsg("dplm",esc(er.message),1)}b.disabled=false},true);

/* ===== レジェンド枠：遊んでいるデータにも反映（来店・親密度などはそのまま引き継ぐ） ===== */
{const LEG={"141": {"name": "さんてぃ", "sex": "男性", "job": "レジェンド"}, "142": {"name": "野郎シーシャ会", "sex": "男性", "job": "レジェンド"}};if(!G.leg1){G.cs.forEach(c=>{const u=LEG[c.i];if(u&&!c.ed)Object.assign(c,u)});G.leg1=1;try{save()}catch(e){}}}
/* 図鑑の並び：レジェンド2人は三ツ目（No.151）の直前 */
{const LEGI=[141,142],_dx=dxN;dxN=function(c){const r=_dx(c);if(DXC&&!DXC.leg){const o=Object.keys(DXC.m).map(Number).sort((a,b)=>DXC.m[a]-DXC.m[b]).filter(i=>!LEGI.includes(i));const p=o.indexOf(150);o.splice(p<0?o.length:p,0,...LEGI.filter(i=>DXC.m[i]!=null));o.forEach((i,n)=>{DXC.m[i]=n+1});DXC.leg=1}return DXC.m[c.i]||c.i+1}}

/* ===== カナメ（No.148 の枠）：ゴリラの被り物・白Tシャツ・短パン ===== */
SPF.kaname=({H,Q4,Qv})=>{const F="#2a2622",F2="#3a342e",M="#5b4d44",M2="#6e5e53",K="#0e0c0b",W="#f2f0ea";
 H(-1,-1,-1,10,8,8,F);H(0,0,7,8,6,1,F);H(1,-1,7,6,4,1,F2);H(2,0,8,4,3,1,F);
 H(-2,2,2,1,2,3,F);H(9,2,2,1,2,3,F);H(-2,2,3,1,1,1,M);H(9,2,3,1,1,1,M);
 H(0,7,4,8,1,1,K);H(0,7,5,8,1,1,F);
 H(1,7,2,6,1,2,M);H(2,7,3,1,1,1,W);H(5,7,3,1,1,1,W);H(3,7,3,2,1,1,M2);H(2,7,3,1,1,1,K);H(5,7,3,1,1,1,K);
 H(1,7,-1,6,2,3,M);H(2,8,0,4,1,2,M2);H(2,9,1,1,1,1,K);H(5,9,1,1,1,1,K);H(3,9,0,2,1,1,M2);H(2,8,-1,4,1,1,K)};
SPF.kaname.ownEye=1;
{const K={"fl": 0, "ls": ["名乗れば誰でも野郎シーシャ会", "スミレちゃーん", "今日下着何色なん？", "それラッキースケベ！", "最近何かオモロい事あった？", "うまー！！", "シーシャ結局調整力"], "name": "カナメ", "sex": "男性", "job": "シーシャ屋", "sp": "kaname", "hs": 98, "top": 0, "bot": 1, "shirt": "#f4f4f2", "pants": "#2f3a4a", "skin": "#e8c3a0", "acc": 0, "shoe": "#e9e9e9"};if(!G.kan1){const c=G.cs[147];if(c&&!c.ed)Object.assign(c,K);G.kan1=1;try{save()}catch(e){}}}

/* ===== さんてぃ（レジェンド）：短い黒髪・メガネ・黒い半袖シャツに紺のインナー ===== */
SPF.santy=({H,Q4,hr})=>{const NV="#1f2a44",CL="#33343a";
 for(let z=6.5;z<7.6;z+=.25){const w=(z-6.5)*.45;for(let x=2-w;x<2+w-.01;x+=.25)Q4(x,3.04,z,NV)}
 for(let z=6.75;z<7.6;z+=.25){Q4(1.5-(z-6.75)*.3,3.06,z,CL);Q4(2.5+(z-6.75)*.3-.25,3.06,z,CL)}
 for(let z=4.5;z<6.5;z+=.5)Q4(2,3.05,z,"#2a2b30",.15);
 H(0,0,6,8,6,1,hr);H(5,4,5,3,2,1,hr);
 /* 細い長方形のメガネ（ボクセルより細かく描く） */
 const G="#3b2f29",s=.125,y=3.03,P=(x,z)=>Q4(x,y,z,G,s),RT=(x0,x1,z0,z1)=>{for(let x=x0;x<=x1+1e-6;x+=s){P(x,z0);P(x,z1)}for(let z=z0;z<=z1+1e-6;z+=s){P(x0,z);P(x1,z)}};
 RT(.375,1.625,9.0,9.625);RT(2.375,3.625,9.0,9.625);for(let x=1.75;x<2.3;x+=s)P(x,9.5);
 for(let yy=1.5;yy<3;yy+=s){Q4(.25,yy,9.5,G,s);Q4(3.625,yy,9.5,G,s)}
};
{const K={"sex": "男性", "age": 60, "hs": 0, "hair": "#2a211c", "skin": "#e3b994", "acc": 0, "accC": "#3a2e28", "shirt": "#18181b", "pants": "#24252b", "shoe": "#151515", "eye": 0, "top": 0, "bot": 0, "sp": "santy"};if(!G.san1){const c=G.cs[141];if(c&&!c.ed)Object.assign(c,K);G.san1=1;try{save()}catch(e){}}}

/* 壁アイテムが持ち物に戻ったら、はっきりお知らせ */
{const _b=build;build=function(){R.wbk=0;const r=_b.apply(this,arguments);if(R.wbk){const n=R.wbk;R.wbk=0;try{save()}catch(e){}setTimeout(()=>{try{toast("📦 貼る壁がなくなった壁アイテム "+n+"個を持ち物に戻しました（☰ → 装飾 → 📦 持ち物 → 🖼 壁アイテム）",6000)}catch(e){}},300)}return r}}

/* 模様替えで動かすとき：向きはそのまま。合わなければ1マスずらして試し、それでもだめなときだけ向きを変える */
function mvKeep(F,N,mi){const alts=[N];if(!N.o&&F.k!=="b"&&F.k!=="bb")alts.push(Object.assign({},N,{ty:N.ty-N.f}));if(N.o){const dx=N.o===1?1:-1;alts.push(Object.assign({},N,{tx:N.tx-dx}))}
for(const a of alts)if(furnFits(a,mi))return a;try{toast("↻ その場所は今の向きでは置けないので、向きを変えて置きました")}catch(e){}return fFlip(N)}
/* チェキ：座れるソファの2人分の組（横向きの席は除く） */
function ckSitPairs(){const L=[],seen=new Set();SEATS.forEach(s=>{if(s.o||s.kind==="bb"||s.kind==="c")return;(s.nb||[]).forEach(o=>{if(o.fid!==s.fid||o.o)return;const k=Math.min(s.id,o.id)+"-"+Math.max(s.id,o.id);if(seen.has(k))return;seen.add(k);const pr=[s,o].sort((x,y)=>x.px-y.px);L.push(pr)})});
const byF=new Map();L.forEach(p=>{const f=p[0].fid;if(!byF.has(f))byF.set(f,p)});return[...byF.values()]}
{const _cd=chekiDraw;chekiDraw=function(){const r=_cd.apply(this,arguments);try{ckSpLbl()}catch(e){}return r}}

/* 店主が店の外に取り残されたら、入口から定位置へ戻す（急用のあとなど） */
setInterval(()=>{try{if(R.phase!=="run"||R.away!=null||OW.sitting||R.clA||R.cine)return;const out=OW.x<0||!FLS.has(Math.floor(OW.x/6)+","+Math.floor(OW.y/6));
if(!out){OW._stk=0;return}if(OW.path&&OW.path.length){OW._stk=(OW._stk||0)+1;if(OW._stk<6)return}
OW._stk=0;const h=owHomeXY();if(OW.x<-1){OW.mode="back";OW.path=[[3,15],[h[0],h[1]]];OW.dir=1}else{OW.mode="";OW.path=[];OW.x=h[0];OW.y=h[1];OW._pc=null}}catch(e){}},2000);

/* ===== チェキのエフェクト・スタンプ（解禁制） ===== */
try{document.head.insertAdjacentHTML("beforeend",'<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap" rel="stylesheet">')}catch(e){}
const CKFONT='"Dela Gothic One","Hiragino Sans",sans-serif';
function ckFx(k,pts,cols,n,sz,sh,seed,zr){let r=seed||7;const rn=()=>(r=(r*9301+49297)%233280)/233280;zr=zr||[2,15];for(let i=0;i<n;i++){const p=pts[i%pts.length],dx=(rn()-.5)*14,dz=zr[0]+rn()*(zr[1]-zr[0]),dy=(rn()-.5)*3,rot=rn()*6,ci=i%cols.length,wx=p[0]+dx,rs=.7+rn()*.6;
if(dz>6&&dz<12.8&&pts.some(q=>Math.abs(wx-q[0])<2.9))continue;
const o=P3(wx,p[1]+dy,dz,k),w=k.s*sz*rs;cx.save();cx.translate(o[0],o[1]);cx.fillStyle=cols[ci];cx.strokeStyle=cols[ci];
if(sh==="star"||sh==="maple"){cx.rotate(rot*.2);cx.beginPath();for(let j=0;j<10;j++){const rr=j%2?w*(sh==="maple"?.5:.42):w,t=j*Math.PI/5;cx.lineTo(Math.sin(t)*rr,-Math.cos(t)*rr)}cx.fill();if(sh==="maple"){cx.fillRect(-w*.06,0,w*.12,w*1.1)}}
else if(sh==="heart"){cx.rotate((rot-3)*.08);cx.beginPath();cx.moveTo(0,w*.9);cx.bezierCurveTo(-w*1.5,-w*.1,-w*.7,-w*1.2,0,-w*.35);cx.bezierCurveTo(w*.7,-w*1.2,w*1.5,-w*.1,0,w*.9);cx.fill()}
else if(sh==="note"){cx.rotate((rot-3)*.08);cx.font="bold "+Math.round(w*2.4)+"px sans-serif";cx.textAlign="center";cx.lineWidth=w*.35;cx.strokeStyle="#fff";const t=i%3?"♪":"♫";cx.strokeText(t,0,0);cx.fillText(t,0,0)}
else if(sh==="money"){cx.rotate(rot);if(i%3===0){cx.fillStyle="#f2c230";cx.beginPath();cx.arc(0,0,w*.7,0,7);cx.fill();cx.fillStyle="#d79a12";cx.beginPath();cx.arc(0,0,w*.42,0,7);cx.fill()}else{cx.fillRect(-w*1.2,-w*.55,w*2.4,w*1.1);cx.fillStyle="rgba(255,255,255,.55)";cx.fillRect(-w*.35,-w*.3,w*.7,w*.6)}}
else if(sh==="bubble"){cx.fillStyle="rgba(190,230,255,.25)";cx.beginPath();cx.arc(0,0,w,0,7);cx.fill();cx.lineWidth=w*.12;cx.strokeStyle="rgba(140,200,255,.85)";cx.stroke();cx.fillStyle="rgba(255,255,255,.9)";cx.beginPath();cx.ellipse(-w*.35,-w*.4,w*.25,w*.15,-.6,0,7);cx.fill()}
else if(sh==="smoke"){cx.globalAlpha=.42;[[0,0,1],[w*.8,-w*.3,.75],[-w*.75,-w*.2,.7],[w*.2,-w*.75,.7]].forEach(([x,y,q])=>{cx.beginPath();cx.arc(x,y,w*q,0,7);cx.fill()})}
else if(sh==="ring"){cx.rotate((rot-3)*.1);cx.lineWidth=w*.42;cx.strokeStyle="rgba(255,255,255,.8)";cx.beginPath();cx.ellipse(0,0,w*1.2,w*.55,0,0,7);cx.stroke();cx.lineWidth=w*.2;cx.strokeStyle=cols[ci];cx.stroke()}
else if(sh==="petal"){cx.rotate(rot);cx.beginPath();cx.ellipse(0,0,w*.75,w*.42,0,0,7);cx.fill();cx.fillStyle="rgba(255,255,255,.5)";cx.beginPath();cx.ellipse(-w*.2,0,w*.3,w*.15,0,0,7);cx.fill()}
else if(sh==="snow"){cx.globalAlpha=.95;cx.beginPath();cx.arc(0,0,w*.45,0,7);cx.fill();if(i%4===0){cx.lineWidth=w*.12;for(let j=0;j<3;j++){cx.rotate(Math.PI/3);cx.beginPath();cx.moveTo(-w*.9,0);cx.lineTo(w*.9,0);cx.stroke()}}}
else if(sh==="leaf"){cx.rotate(rot);cx.beginPath();cx.ellipse(0,0,w*.9,w*.42,0,0,7);cx.fill();cx.strokeStyle="rgba(255,255,255,.55)";cx.lineWidth=w*.1;cx.beginPath();cx.moveTo(-w*.8,0);cx.lineTo(w*.8,0);cx.stroke()}
else if(sh==="paw"){cx.rotate((rot-3)*.15);cx.beginPath();cx.ellipse(0,w*.2,w*.55,w*.45,0,0,7);cx.fill();[[-w*.6,-w*.4],[-w*.2,-w*.75],[w*.2,-w*.75],[w*.6,-w*.4]].forEach(([x,y])=>{cx.beginPath();cx.arc(x,y,w*.22,0,7);cx.fill()})}
else if(sh==="gem"){cx.rotate((rot-3)*.1);cx.beginPath();cx.moveTo(-w*.8,-w*.3);cx.lineTo(-w*.4,-w*.75);cx.lineTo(w*.4,-w*.75);cx.lineTo(w*.8,-w*.3);cx.lineTo(0,w*.85);cx.closePath();cx.fill();cx.fillStyle="rgba(255,255,255,.6)";cx.beginPath();cx.moveTo(-w*.4,-w*.75);cx.lineTo(0,-w*.3);cx.lineTo(w*.4,-w*.75);cx.closePath();cx.fill()}
else if(sh==="dot"){cx.beginPath();cx.arc(0,0,w*.3,0,7);cx.fill();if(i%5===0){cx.globalAlpha=.6;cx.fillRect(-w*.9,-w*.06,w*1.8,w*.12);cx.fillRect(-w*.06,-w*.9,w*.12,w*1.8)}}
else{cx.rotate(rot);cx.fillRect(-w*.7,-w*.3,w*1.4,w*.6)}cx.restore()}}
const ckMid=h=>[(h[0][0]+h[1][0])/2,(h[0][1]+h[1][1])/2];
function ckFire(k,h){const m=ckMid(h);let r=3;const rn=()=>(r=(r*9301+49297)%233280)/233280;for(let i=0;i<26;i++){const x=m[0]+(rn()-.5)*16,o=P3(x,m[1]+1+rn()*2,0,k),hh=k.s*(1.6+rn()*2.4),w=hh*.45;[["#ff6a1a",1],["#ffc23a",.6],["#fff2b0",.3]].forEach(([c,q])=>{cx.fillStyle=c;cx.beginPath();cx.moveTo(o[0],o[1]-hh*q*1.2);cx.quadraticCurveTo(o[0]+w*q,o[1]-hh*q*.2,o[0],o[1]);cx.quadraticCurveTo(o[0]-w*q,o[1]-hh*q*.2,o[0],o[1]-hh*q*1.2);cx.fill()})}}
function ckBolt(k,h){const m=ckMid(h);[[-6.5,15,1],[6.8,14,-1]].forEach(([dx,z0,f])=>{const pts=[[0,0],[1*f,-2.5],[-.2*f,-3],[1.3*f,-6]].map(([x,z])=>P3(m[0]+dx+x,m[1],z0+z,k));cx.lineJoin="round";[["#fff",k.s*1.3],["#ffd83a",k.s*.7]].forEach(([c,lw])=>{cx.strokeStyle=c;cx.lineWidth=lw;cx.beginPath();pts.forEach((p,i)=>i?cx.lineTo(p[0],p[1]):cx.moveTo(p[0],p[1]));cx.stroke()})})}
function ckRainbow(k,h){const m=ckMid(h),o=P3(m[0],m[1],8,k);["#ff5a5a","#ff9f3a","#ffe14a","#6fd36a","#4ab4ff","#9b6bff"].forEach((c,i)=>{cx.strokeStyle=c;cx.globalAlpha=.75;cx.lineWidth=k.s*.55;cx.beginPath();cx.arc(o[0],o[1],k.s*(9.5-i*.55),Math.PI*1.08,Math.PI*1.92);cx.stroke()});cx.globalAlpha=1}
function ckShoot2(k,h){const m=ckMid(h);[[-6.5,13.8,1.1],[7,14.3,.9],[7.3,8.5,.8],[-7,7,.7]].forEach(([dx,z,q])=>{const o=P3(m[0]+dx,m[1],z,k),w=k.s*q,g=cx.createLinearGradient(o[0],o[1],o[0]-w*7,o[1]-w*3.5);g.addColorStop(0,"rgba(255,240,150,.9)");g.addColorStop(1,"rgba(255,240,150,0)");cx.strokeStyle=g;cx.lineWidth=w*.7;cx.lineCap="round";cx.beginPath();cx.moveTo(o[0],o[1]);cx.lineTo(o[0]-w*7,o[1]-w*3.5);cx.stroke();cx.fillStyle="#ffe14a";cx.beginPath();for(let j=0;j<10;j++){const rr=j%2?w*.45:w*1.1,t=j*Math.PI/5;cx.lineTo(o[0]+Math.sin(t)*rr,o[1]-Math.cos(t)*rr)}cx.fill()})}
function ckHanabi(k,h){const m=ckMid(h);[[-6.8,13,"#ff5c8a"],[7,13.6,"#ffd84a"],[6.8,7,"#5ac8fa"],[-7,6.5,"#7bd389"]].forEach(([dx,z,c])=>{const o=P3(m[0]+dx,m[1],z,k);for(let j=0;j<16;j++){const t=j*Math.PI/8,r1=k.s*.6,r2=k.s*2.1;cx.strokeStyle=c;cx.lineWidth=k.s*.28;cx.lineCap="round";cx.beginPath();cx.moveTo(o[0]+Math.cos(t)*r1,o[1]+Math.sin(t)*r1);cx.lineTo(o[0]+Math.cos(t)*r2,o[1]+Math.sin(t)*r2);cx.stroke();cx.fillStyle="#fff";cx.beginPath();cx.arc(o[0]+Math.cos(t)*r2,o[1]+Math.sin(t)*r2,k.s*.18,0,7);cx.fill()}})}
function ckNight(k,h){ckFx(k,h,["#fff8c8","#ffffff","#ffe680"],34,.7,"dot",41,[8,15]);const m=ckMid(h),o=P3(m[0]+6.8,m[1],13.5,k),r=k.s*1.5;cx.fillStyle="#ffe680";cx.beginPath();cx.arc(o[0],o[1],r,0,7);cx.fill();cx.globalCompositeOperation="destination-out";cx.beginPath();cx.arc(o[0]+r*.5,o[1]-r*.3,r*.85,0,7);cx.fill();cx.globalCompositeOperation="source-over"}
function ckCrown(k,h){h.forEach(p=>{const o=P3(p[0],p[1]-.5,13.2,k),w=k.s*1.5;cx.fillStyle="#f2c230";cx.strokeStyle="#a8770a";cx.lineWidth=k.s*.15;cx.beginPath();cx.moveTo(o[0]-w,o[1]);cx.lineTo(o[0]-w,o[1]-w*.9);cx.lineTo(o[0]-w*.5,o[1]-w*.4);cx.lineTo(o[0],o[1]-w*1.1);cx.lineTo(o[0]+w*.5,o[1]-w*.4);cx.lineTo(o[0]+w,o[1]-w*.9);cx.lineTo(o[0]+w,o[1]);cx.closePath();cx.fill();cx.stroke();["#e0352b","#4ab4ff","#6fd36a"].forEach((c,i)=>{cx.fillStyle=c;cx.beginPath();cx.arc(o[0]+(i-1)*w*.6,o[1]-w*.25,k.s*.2,0,7);cx.fill()})})}
const SEAS=a=>()=>a.includes(MN[(G.month||0)%12]);
/* [id, 種類(e:エフェクト s:スタンプ), 名前, 解禁, 描画 or [文字,色]] ※idは1.0.28のポーズ解禁を引き継ぐ */
const CKD=[
["bub","e","🫧 シャボン玉",null,(k,h)=>ckFx(k,h,["#bfe6ff"],22,1.1,"bubble",13)],
["smk","e","💨 煙もくもく",null,(k,h)=>ckFx(k,h,["#c9ccd6","#b5b9c6","#dfe1e8"],30,1.4,"smoke",31,[2,15])],
["ring","e","⭕ 煙の輪っか",{t:"チェキを3回撮る",f:()=>(G.ckN||0)>=3},(k,h)=>ckFx(k,h,["#b5b9c6","#c9ccd6"],18,1.1,"ring",19,[5,15])],
["csmk","e","🌈 カラフル煙",{t:"フレーバーを15種解禁",f:()=>(G.flu||[]).length>=15},(k,h)=>ckFx(k,h,["#ffb3d1","#b9a6ff","#9fe0ff","#b8f0c0","#ffe0a0"],30,1.4,"smoke",37,[2,15])],
["kira","e","✨ キラキラ",{g:1},(k,h)=>ckFx(k,h,["#ffd84a","#fff3a0","#ffb3e0","#ffffff"],30,.95,"star",11)],
["gtr","e","🎵 音符",{g:1},(k,h)=>ckFx(k,h,["#7b4fd0","#ff5c8a","#2f9be0","#f28a1e"],18,.8,"note",23)],
["bolt","e","⚡ 稲妻",{g:1},ckBolt],
["rbw","e","🌈 虹",{g:1},ckRainbow],
["sstar","e","🌠 流れ星",{g:1},ckShoot2],
["skr","e","🌸 桜",{t:"3〜4月に営業する",f:SEAS([3,4])},(k,h)=>ckFx(k,h,["#ffc4d6","#ffaec8","#ffe0ea"],36,.75,"petal",43)],
["hnb","e","🎆 花火",{t:"7〜8月に営業する",f:SEAS([7,8])},ckHanabi],
["mmj","e","🍁 紅葉",{t:"9〜11月に営業する",f:SEAS([9,10,11])},(k,h)=>ckFx(k,h,["#e0452b","#f28a1e","#d9a320"],26,.85,"maple",47)],
["snow","e","❄️ 雪",{t:"12〜2月に営業する",f:SEAS([12,1,2])},(k,h)=>ckFx(k,h,["#ffffff","#eef6ff"],48,.6,"snow",53)],
["cash","e","💸 お金",{t:"所持金1000万円",f:()=>(G.money||0)>=10000000},(k,h)=>ckFx(k,h,["#7fb069","#9fcf86","#5e9447"],40,1,"money",5)],
["heart2","e","💕 ハート",{t:"図鑑100%のお客さん5人",f:()=>G.cs.filter(c=>c.met&&ckPct(c)>=100).length>=5},(k,h)=>ckFx(k,h,["#ff5c8a","#ff9bb8","#ff2e6d"],26,.85,"heart",17)],
["party","e","🎉 紙吹雪",{t:"フェスに出演 か 2号店を開く",f:()=>!!(G.festN||G.s2)},(k,h)=>ckFx(k,h,["#ff5c8a","#ffd84a","#5ac8fa","#7bd389","#b28bff"],46,.6,"rect",29)],
["fire","e","🔥 炎",{t:"1日の売上10万円",f:()=>(G.bestS||0)>=100000},ckFire],
["leaf","e","🍃 葉っぱ",{t:"フレーバーを20種解禁",f:()=>(G.flu||[]).length>=20},(k,h)=>ckFx(k,h,["#5fb85a","#8fd36a","#3f9a4a"],28,.85,"leaf",59)],
["paw","e","🐾 足あと",{t:"人外のお客さんを図鑑に登録",f:()=>G.cs.some(c=>c.met&&c.job==="人外")},(k,h)=>ckFx(k,h,["#6b4a35","#8a6248"],24,1,"paw",61)],
["night","e","🌙 星空",{t:"営業100日",f:()=>(G.day||0)>=100},ckNight],
["gem","e","💎 宝石",{t:"借金を完済",f:()=>!!G.loan&&G.loan.bal<=0&&(G.month||0)>0},(k,h)=>ckFx(k,h,["#5ad0f0","#b48cff","#ff7ab0","#7be0b0"],24,.8,"gem",67)],
["crown","e","👑 王冠",{t:"フォロワー1万人",f:()=>((G.ow||{}).fol||0)>=10000},ckCrown],
["thx","s","ありがとう！",null,["ありがとう！","#ff5c8a"]],
["again","s","また来てね",null,["また来てね","#2f9be0"]],
["open","s","祝開店",null,["祝開店","#e0352b"]],
["chill","s","チル⭐︎",null,["チル⭐︎","#3fb6a8"]],
["moku","s","もくもく〜",{t:"のべ来店数100人",f:()=>(G.tvis||0)>=100},["もくもく〜","#8a8fa3"]],
["nochill","s","チルっていうな💢",{g:1},["チルっていうな💢","#e0352b"]],
["gao","s","がおー！",{g:1},["がおー！","#f28a1e"]],
["win","s","優勝",{g:1},["優勝","#d4a017"]],
["emo","s","エモい",{g:1},["エモい","#9b59d0"]],
["totono","s","ととのった",{g:1},["ととのった","#2f9be0"]],
["kanpai","s","かんぱーい！",{t:"のべ来店数500人",f:()=>(G.tvis||0)>=500},["かんぱーい！","#e0901e"]],
["selfie","s","#映え",{t:"フォロワー3000人",f:()=>((G.ow||{}).fol||0)>=3000},["#映え","#9b59d0"]],
["pray","s","祝1周年",{t:"営業1年",f:()=>Math.max(G.month||0,Math.floor(((G.day||1)-1)/7))>=12},["祝1周年","#e0352b"]],
["flex","s","最強",{t:"増築3回",f:()=>(G.exN||0)>=3},["最強","#1d1a26"]],
["joren","s","常連さん",{t:"チェキを5回撮る",f:()=>(G.ckN||0)>=5},["常連さん","#6b4a35"]],
["itsumo","s","いつもありがとう",{t:"チェキを10回撮る",f:()=>(G.ckN||0)>=10},["いつもありがとう","#ff5c8a"]],
["zutto","s","ズッ友",{t:"図鑑100%のお客さん1人",f:()=>G.cs.some(c=>c.met&&ckPct(c)>=100)},["ズッ友","#ff2e6d"]],
["umai","s","煙がうまい",{t:"フレーバーを10種解禁",f:()=>(G.flu||[]).length>=20},["煙がうまい","#5e9447"]],
["hanjo","s","大繁盛",{t:"のべ来店数1000人",f:()=>(G.tvis||0)>=1000},["大繁盛","#e0452b"]],
["manin","s","満員御礼",{t:"増築を全部終える",f:()=>(G.exN||0)>=6},["満員御礼","#c0392b"]],
["oku","s","億り人",{t:"所持金1億円",f:()=>(G.money||0)>=100000000},["億り人","#d4a017"]],
["s2","s","祝2号店",{t:"2号店を開く",f:()=>!!G.s2},["祝2号店","#e0352b"]],
["legend","s","伝説",{t:"レジェンドの3人と出会う",f:()=>G.cs.filter(c=>c.met&&c.job==="レジェンド").length>=3},["伝説","#1d1a26"]]];
const ckDOk=d=>!d[3]||(G.ckU||[]).includes(d[0]);
function ckUnlock(id,why){G.ckU=G.ckU||[];if(G.ckU.includes(id))return null;G.ckU.push(id);const d=CKD.find(q=>q[0]===id);if(d){const t=(d[1]==="e"?"エフェクト":"スタンプ")+"「"+d[2]+"」";log("📸 チェキの"+t+"が解禁"+(why?"（"+why+"）":""));if(!why)try{toast("📸 チェキに新しい"+t+"が追加！")}catch(e){}}save();return d}
function ckChk(){if(!G.setup)return;CKD.forEach(d=>{const L=d[3];if(L&&L.f&&!(G.ckU||[]).includes(d[0])){try{if(L.f())ckUnlock(d[0])}catch(e){}}})}
function ckDBtns(t){const cur=t==="e"?R.ckEf:R.ckSt;return`<button class="xr ${cur?"":"on"}" data-dk="${t}:">なし</button>`+CKD.filter(d=>d[1]===t).map(d=>ckDOk(d)?`<button class="xr ${cur===d[0]?"on":""}" data-dk="${t}:${d[0]}"${t==="s"?` style="font-family:${CKFONT.replace(/"/g,"'")}"`:""}>${esc(d[2])}</button>`:`<button class="xr" data-dkl="${d[0]}" style="opacity:.45">🔒 ${d[1]==="e"?esc(d[2].split(" ")[0]):"？？？"}</button>`).join("")}
function ckStamp(cv,redo){const d=CKD.find(q=>q[0]===R.ckSt&&q[1]==="s");if(!d||!ckDOk(d))return;const[t,col]=d[4],g=cv.getContext("2d"),W2=cv.width,H2=cv.height;let fs=Math.round(W2*.13);const F=()=>fs+"px "+CKFONT;
try{const ff='48px "Dela Gothic One"';if(document.fonts&&!document.fonts.check(ff,t)&&!ckStamp._w){ckStamp._w=1;document.fonts.load(ff,t).then(()=>{ckStamp._w=0;if(document.fonts.check(ff,t)&&cv.isConnected&&redo)redo()}).catch(()=>{ckStamp._w=0})}}catch(e){}
g.save();g.font=F();while(g.measureText(t).width>W2*.82&&fs>20){fs-=2;g.font=F()}g.translate(W2/2,H2*.87);g.rotate(-.07);g.textAlign="center";g.textBaseline="middle";g.lineJoin="round";
g.lineWidth=fs*.34;g.strokeStyle="rgba(0,0,0,.25)";g.strokeText(t,3,4);g.lineWidth=fs*.3;g.strokeStyle="#fff";g.strokeText(t,0,0);g.fillStyle=col;g.fillText(t,0,0);g.restore()}
{const _cd=chekiDraw;chekiDraw=function(cv,c,pi){const r=_cd.apply(this,arguments);try{ckStamp(cv,()=>chekiDraw(cv,c,pi))}catch(e){}return r}}
{const _h59=hud;hud=function(){_h59();try{ckChk()}catch(e){}}}
try{document.head.insertAdjacentHTML("beforeend","<style>.taxn,.taxn *{color:#3b2a12!important;opacity:1!important}.taxn>b:first-child{color:#b5520e!important}</style>")}catch(e){}
{const P=n=>(CKP.find(q=>q[0].includes(n))||CKP[0])[1];CKP.push(["📷 カメラ目線",{front:1}],["✌️ 正面ピース",Object.assign({},P("ピース"),{front:1,arms:[["L","peace"],["R","down"]],arms2:[["L","down"],["R","peace"]]})],["💕 正面ハート",(()=>{const q=P("ハート"),lw=A=>A.map(e=>typeof e[2]==="function"?[e[0],e[1],(a,x,y,z,o)=>e[2](a,x,y,z-2.2,o)].concat(e.slice(3)):e);return Object.assign({},q,{front:1,arms:lw(q.arms),arms2:lw(q.arms2||[])})})()])}

