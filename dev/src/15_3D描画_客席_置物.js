/* ===== 3D：自由カメラ（直交投影・ペインターソート） ===== */
let TX=24,TY=18,BASE=6.2;const TZ=4;
const cv=$("#cv");let cx=cv.getContext("2d");
cv.width=Math.round(W*dpr);cv.height=Math.round(CH*dpr);cv.style.aspectRatio=W+" / "+CH;
const shc={};const hx6=c=>(typeof c==="string"&&c.length===4&&c[0]==="#")?"#"+c[1]+c[1]+c[2]+c[2]+c[3]+c[3]:c;
function col(c,f){const key=c+f;if(shc[key])return shc[key];const n=parseInt(hx6(c).slice(1),16);return shc[key]=`rgb(${(n>>16)*f|0},${(n>>8&255)*f|0},${(n&255)*f|0})`}
function camVec(){const c=R.cam,cp=Math.cos(c.pit),sp=Math.sin(c.pit),sa=Math.sin(c.yaw),ca=Math.cos(c.yaw),s=BASE*c.zoom;
return{cx:-cp*sa,cy:cp*ca,cz:sp,rx:ca,ry:sa,ux:sa*sp,uy:-ca*sp,uz:cp,s,ox:W/2,oy:CH*.54,exx:s*ca,exy:-s*sa*sp,eyx:s*sa,eyy:s*ca*sp,ezy:-s*cp}}
const P3=(x,y,z,k)=>[k.ox+k.s*((x-TX)*k.rx+(y-TY)*k.ry),k.oy-k.s*((x-TX)*k.ux+(y-TY)*k.uy+(z-TZ)*k.uz)];
const P=(x,y,z)=>P3(x,y,z,R.cv);
const dep=(v,k)=>{const h=(v[5]||1)/2;return(v[0]+h)*k.cx+(v[1]+h)*k.cy+(v[2]+h)*k.cz};
function box(a,x,y,z,w,d,h,c){for(let i=0;i<w;i++)for(let j=0;j<d;j++)for(let k=0;k<h;k++)a.push([x+i,y+j,z+k,c])}
/* 大きさの違うボクセルが混ざったリスト用：同じ大きさの6方向がすべて埋まっている内側のボクセルを省く */
function cullS(a){const K=(x,y,z,s)=>Math.round(x*4)+","+Math.round(y*4)+","+Math.round(z*4)+","+s,S=new Set(a.map(v=>K(v[0],v[1],v[2],v[5]||1)));
return a.filter(v=>{const s=v[5]||1,x=v[0],y=v[1],z=v[2];return!(S.has(K(x+s,y,z,s))&&S.has(K(x-s,y,z,s))&&S.has(K(x,y+s,z,s))&&S.has(K(x,y-s,z,s))&&S.has(K(x,y,z+s,s))&&S.has(K(x,y,z-s,s)))})}
/* 座っている人は、カメラが変わるまで1枚の絵にして使い回す（毎フレームのボクセル描画を減らす） */
function sprPush(pc,a,pos){if(typeof document==="undefined"||!document.createElement){pc.l.forEach(v=>a.push(v));return}
GLS.push({pos,fn:k=>{const ck=[k.s.toFixed(3),k.rx.toFixed(4),k.ry.toFixed(4),k.ux.toFixed(4),k.uy.toFixed(4),k.uz.toFixed(4),dpr].join();
if(pc.ck!==ck||!pc.sp){if(!pc.bb){let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9,z0=1e9,z1=-1e9;pc.l.forEach(v=>{const s=v[5]||1;x0=Math.min(x0,v[0]);x1=Math.max(x1,v[0]+s);y0=Math.min(y0,v[1]);y1=Math.max(y1,v[1]+s);z0=Math.min(z0,v[2]);z1=Math.max(z1,v[2]+s)});((pc.ab&&pc.ab.bx)||[]).forEach(b=>{x0=Math.min(x0,b.x);x1=Math.max(x1,b.x+b.w);y0=Math.min(y0,b.y);y1=Math.max(y1,b.y+b.d);z0=Math.min(z0,b.z);z1=Math.max(z1,b.z+b.h)});pc.bb=[x0,x1,y0,y1,z0,z1]}
const b=pc.bb,d=(x,y,z)=>[k.s*((x-b[0])*k.rx+(y-b[2])*k.ry),-k.s*((x-b[0])*k.ux+(y-b[2])*k.uy+(z-b[4])*k.uz)];let X0=1e9,X1=-1e9,Y0=1e9,Y1=-1e9;for(const x of[b[0],b[1]])for(const y of[b[2],b[3]])for(const z of[b[4],b[5]]){const q=d(x,y,z);X0=Math.min(X0,q[0]);X1=Math.max(X1,q[0]);Y0=Math.min(Y0,q[1]);Y1=Math.max(Y1,q[1])}
const w=X1-X0+4,h=Y1-Y0+4,ax=-X0+2,ay=-Y0+2,c2=pc.cv||(pc.cv=document.createElement("canvas"));c2.width=Math.max(1,Math.ceil(w*dpr));c2.height=Math.max(1,Math.ceil(h*dpr));const g=c2.getContext&&c2.getContext("2d");if(!g){pc.l.forEach(v=>dv(v,k));return}g.setTransform(dpr,0,0,dpr,0,0);
const k2=Object.assign({},k,{ox:ax+k.s*((TX-b[0])*k.rx+(TY-b[2])*k.ry),oy:ay-k.s*((TX-b[0])*k.ux+(TY-b[2])*k.uy+(TZ-b[4])*k.uz)}),oc=cx;cx=g;try{pc.l.map(v=>({v,d:dep(v,k)})).concat(((pc.ab&&pc.ab.bx)||[]).map(b=>({b,d:(b.x+b.w/2)*k.cx+(b.y+b.d/2)*k.cy+(b.z+b.h/2)*k.cz}))).sort((p,q)=>p.d-q.d).forEach(o=>o.b?dvb(o.b,k2):dv(o.v,k2))}finally{cx=oc}pc.sp={w,h,ax,ay};pc.ck=ck}
const P0=P3(pc.bb[0],pc.bb[2],pc.bb[4],k);cx.drawImage(pc.cv,P0[0]-pc.sp.ax,P0[1]-pc.sp.ay,pc.sp.w,pc.sp.h)}})}
function cull(a){const S=new Set(a.map(v=>v[0]+","+v[1]+","+v[2]));return a.filter(v=>!(S.has((v[0]+1)+","+v[1]+","+v[2])&&S.has((v[0]-1)+","+v[1]+","+v[2])&&S.has(v[0]+","+(v[1]+1)+","+v[2])&&S.has(v[0]+","+(v[1]-1)+","+v[2])&&S.has(v[0]+","+v[1]+","+(v[2]+1))&&S.has(v[0]+","+v[1]+","+(v[2]-1))))}
function bench(a,bn){const X=bn.tx*6,Y0=bn.ty*6,f=bn.f,n=bn.n,Lw=6*n,b=(x,y,z,w,d,h,c)=>box(a,X+x,f>0?Y0+y:Y0+6-y-d,z,w,d,h,c);
b(0,0,0,Lw,4,1,"#7a4e2d");b(0,0,1,Lw,1,1,"#7a4e2d");b(0,1,1,1,3,1,"#7a4e2d");b(Lw-1,1,1,1,3,1,"#7a4e2d");
for(let i=0;i<n;i++){b(i*6+1,1,1,4,3,1,"#8f6139");if(i<n-1)b(i*6+5,1,1,2,3,1,"#7a4e2d")}
b(0,0,2,Lw,1,4,"#5e3a1e");b(0,1,2,1,3,2,"#6a4424");b(Lw-1,1,2,1,3,2,"#6a4424")}
/* 壁は4面。カメラ側の壁は自動で隠す(tag: 1奥 2左 3手前 4右) */
function calcFr(){const mn=Math.min(...FLT.map(t=>t[1]));let best=null;
for(const dy of[0,1,2]){const y=mn+dy;for(const[x,yy]of FLT){if(yy!==y)continue;if(FLS.has(x+","+(y+1))&&FLS.has(x+","+(y+2))&&(!best||x>best[0]))best=[x,y]}if(best)break}
if(!best)best=FLT.filter(t=>t[1]===mn).sort((u,v)=>v[0]-u[0])[0];
FR={tx:best[0],ty:best[1],x:best[0]*6+1,y:best[1]*6};FX=best[0]*6+3.5;FY=best[1]*6+9.5}
function build(){const a=[],WO=WLC[R.pvW!=null?R.pvW:(G.wcl||0)]||WLC[0],wc=WO.c;syncFl();calcFr();
BL.clear();BL0.forEach(k=>BL.add(k));BL.add(FR.tx+","+FR.ty);BL.add(FR.tx+","+(FR.ty+1));
{const xs=FLT.map(t=>t[0]),ys=FLT.map(t=>t[1]),x0=Math.min(...xs),x1=Math.max(...xs)+1,y0=Math.min(...ys),y1=Math.max(...ys)+1;TX=(x0+x1)*3;TY=(y0+y1)*3;BASE=6.2*Math.min(1,8.5/Math.max(x1-x0,(y1-y0)*1.25))}
const wm=new Map(),wv=(x,y,t)=>{for(let z=0;z<24;z++){const k=x+","+y+","+z;if(!wm.has(k))wm.set(k,[x,y,z,WO.pt?wlCol(WO,x,y,z,t):wc,t])}};
FLT.forEach(([tx,ty])=>{const h=(dx,dy)=>FLS.has((tx+dx)+","+(ty+dy)),X=tx*6,Y=ty*6;
if(!h(0,-1))for(let i=-1;i<=6;i++)wv(X+i,Y-1,1);
if(!h(0,1))for(let i=-1;i<=6;i++)wv(X+i,Y+6,3);
if(!h(-1,0)&&!(tx===0&&ty===2))for(let j=0;j<6;j++)wv(X-1,Y+j,2);
if(!h(1,0))for(let j=0;j<6;j++)wv(X+6,Y+j,4)});
wm.forEach(v=>a.push(v));
/* 壁ポスターの貼れる場所（床マスの壁側1辺＝1区画） */
WS=[];FLT.forEach(([tx,ty])=>{if(tx===FR.tx&&ty===FR.ty)return;const h=(dx,dy)=>FLS.has((tx+dx)+","+(ty+dy)),X=tx*6,Y=ty*6;
if(!h(0,-1)&&!(tx===FR.tx&&ty===FR.ty))WS.push({k:tx+","+ty+",1",s:1,c:[X+3,Y,9]});
if(!h(0,1))WS.push({k:tx+","+ty+",3",s:3,c:[X+3,Y+6,9]});
if(!h(-1,0)&&!(tx===0&&ty===2))WS.push({k:tx+","+ty+",2",s:2,c:[X,Y+3,9]});
if(!h(1,0))WS.push({k:tx+","+ty+",4",s:4,c:[X+6,Y+3,9]})});
WS=WS.concat(WS.map(w=>({k:w.k+",u",s:w.s,c:[w.c[0],w.c[1],16.5],u:1})));
G.wall=G.wall||[];{const ok=new Set(WS.map(w=>w.k)),KS=d=>["k","k2","k3","k4"].filter(f=>d[f]),fit=d=>KS(d).every(f=>ok.has(d[f])),used=new Set();G.wall.forEach(d=>{if(fit(d))KS(d).forEach(f=>used.add(d[f]))});
const DV={1:[0,-1],2:[-1,0],3:[0,1],4:[1,0]},mv=(k,n)=>{const p=k.split(","),sd=+p[2],v=DV[sd];if(!v)return null;p[0]=String(+p[0]+v[0]*n);p[1]=String(+p[1]+v[1]*n);return p.join(",")};
G.wall=G.wall.filter(d=>{if(fit(d))return true;
/* 貼る壁がなくなった壁アイテムは持ち物へ（数を数えて、あとでお知らせ） */
R.wbk=(R.wbk||0)+1;
const x=WP.find(q=>q.id===d.id);if(x){(G.inv=G.inv||[]).push({t:"w",id:d.id});log("🖼 "+x.n+" は貼る壁がなくなったので持ち物に戻しました")}return false})}
G.wall.forEach(d=>{const x=WP.find(q=>q.id===d.id);if(!x||!x.pt)return;const[tx,ty,s]=d.k.split(",").map(Number),X=tx*6,Y=ty*6;
const up=d.k.endsWith(",u");x.pt.forEach((row,r)=>[...row].forEach((ch,c)=>{const col=x.pal[ch]||x.pal["."],z=(up?19:11.5)-(r+1)*.5;
const p=s===1?[X+1+c*.5,Y,z]:s===3?[X+4.5-c*.5,Y+5.5,z]:s===2?[X,Y+4.5-c*.5,z]:[X+5.5,Y+1+c*.5,z];a.push([p[0],p[1],p[2],col,s,.5])}))});
furnDraw(a);
/* フリードリンク冷蔵庫（最奥列の右端に自動配置）。扉の中身は dyn() で在庫に応じて描く */
const fb="#e9eef1",F=FR.x,Y=FR.y;box(a,F,Y,0,5,4,17,fb);box(a,F,Y+4,0,5,1,3,"#90a4ae");box(a,F,Y+4,15,5,1,1,"#2ecc71");box(a,F,Y+4,16,5,1,1,fb);box(a,F,Y+4,3,1,1,12,fb);box(a,F+4,Y+4,3,1,1,12,fb);box(a,F+4,Y+5,7,1,1,3,"#90a4ae");
genScn();try{if(typeof xsStatic==="function")xsStatic(a)}catch(e){}try{if(typeof fanVox==="function")fanVox(a)}catch(e){}try{if(typeof glassMod==="function")glassMod(a)}catch(e){}try{if(typeof extMod==="function")extMod(a)}catch(e){}R.stat=cull(a);R.stV++}
const wallVis0=(t,k)=>!t||(t===1?k.cy>0:t===2?k.cx>0:t===3?k.cy<0:k.cx<0);let WS=[];const wallVis=(t,k)=>!t||(R.ext?t!==2:(t===1?k.cy>0:t===2?k.cx>0:t===3?k.cy<0:k.cx<0));
let SC={key:"",list:[]};
function statList(k){const key=R.camVer+"|"+R.stV;if(SC.key!==key){SC.key=key;SC.list=R.stat.filter(v=>(R.ext&&v[4]&&v[5]&&v[5]<1)?wallVis0(v[4],k):wallVis(v[4],k)).map(v=>({v,d:dep(v,k)})).sort((p,q)=>p.d-q.d)}return SC.list}
/* 人：dr=向き(0:南 1:東 2:北 3:西)。座りは席の向きfで固定。体は1マス、頭だけ半分のマス(0.5)で細かく作る */
const TOPN=["Tシャツ","チェックシャツ","スーツ","ボーダー","タンクトップ","ジャケット","ジャージ","アロハ","ロゴT"],BOTN=["長ズボン","短パン","スカート","ロールアップ"];
function dkHex(c,f){const n=parseInt(String(hx6(c)).slice(1),16);if(isNaN(n))return c;const q=v=>Math.max(0,Math.min(255,Math.round(v*f)));return"#"+[n>>16,n>>8&255,n&255].map(v=>q(v).toString(16).padStart(2,"0")).join("")}
function topCol(t,u,v,sh,shd,sk){const W="#f4f4f4";switch(t){
case 1:return v===7&&(u===1||u===2)?W:(u%2===0)!==(v%2===0)?shd:dkHex(sh,1.25);
case 2:return(u===1||u===2)?(v===7?W:v>=2?"#c62828":sh):(v>=6&&(u===0||u===3)?shd:sh);
case 3:return v%2?sh:W;
case 4:return v===7&&(u===0||u===3)?sk:sh;
case 5:return(u===1||u===2)?W:(v>=5?shd:sh);
case 6:return v===7?W:(u===0||u===3)&&v>=1?W:sh;
case 7:return(u+2*v)%5===0?W:(u*3+v)%7===0?"#ffd54f":sh;
case 8:return(u===1||u===2)&&(v===4||v===5)?W:sh;
default:return sh}}
/* ハロウィン：カボチャ頭（頭の座標で横10×奥行8×高さ7、顔はくり抜いて光らせる） */
function pumpH(H){const O="#f28c1e",D="#d26a14",T="#e47a18",L="#ffd23f",cells=new Map();
for(let x=-1;x<=8;x++)for(let y=-1;y<=6;y++)for(let z=0;z<=6;z++){const e=((x+.5-4)/5)**2+((y+.5-3)/4)**2+((z+.5-3.5)/3.7)**2;if(e<=1.08)cells.set(x+","+y+","+z,[x,y,z])}
const front={};cells.forEach(([x,y,z])=>{const k=x+","+z;if(front[k]==null||y>front[k])front[k]=y});
const face=new Set(["0,4","1,4","2,4","1,3","5,4","6,4","7,4","6,3","3,2","4,2","0,1","1,1","3,1","4,1","6,1","7,1","1,0","2,0","3,0","4,0","5,0","6,0"]);
cells.forEach(([x,y,z])=>{let col=(x===1||x===4||x===7||x===-1)?D:z>=6?T:O;if(y===front[x+","+z]&&y>=4&&face.has(x+","+z))col=L;H(x,y,z,1,1,1,col)});
H(3,2,7,2,2,2,"#5d7a2c");H(4,2,9,1,1,1,"#4a6322");H(5,2,7,2,1,1,"#7aa33a")}
/* 芸能人のオーラ：足もとから立ちのぼる光（体の後ろ）と、まわりできらめく星（体の前） */
function auraDraw(k,fg){const T=performance.now()/1000;R.people.forEach((p,n)=>{const c=p.c;if(!c||!c.aura||p.st==="out"&&p.x<-2)return;const sit=p.st==="sit",x=sit?p.seat.px+2:p.x,y=sit?p.seat.Y0+3:p.y,s=k.s,col=c.aura,o=P3(x,y,5.5,k);
if(!fg){const pu=.85+.15*Math.sin(T*2.2+n),r=s*7.5*pu,g=cx.createRadialGradient(o[0],o[1],0,o[0],o[1],r);g.addColorStop(0,col+"88");g.addColorStop(.55,col+"33");g.addColorStop(1,col+"00");cx.fillStyle=g;cx.beginPath();cx.ellipse(o[0],o[1],r*.8,r*1.15,0,0,7);cx.fill();return}
cx.save();cx.globalCompositeOperation="lighter";for(let i=0;i<5;i++){const ph=(T*.4+i/5+n*.13)%1,a=i*2.4+T*.6,rr=2.6+((i*37)%10)/10*1.2,q=P3(x+Math.cos(a)*rr,y+Math.sin(a)*rr,1+ph*12,k),al=Math.sin(ph*Math.PI),z=s*(.35+.35*al);
cx.fillStyle=`rgba(255,255,255,${al*.85})`;cx.beginPath();cx.moveTo(q[0],q[1]-z*1.6);cx.lineTo(q[0]+z*.35,q[1]-z*.35);cx.lineTo(q[0]+z*1.6,q[1]);cx.lineTo(q[0]+z*.35,q[1]+z*.35);cx.lineTo(q[0],q[1]+z*1.6);cx.lineTo(q[0]-z*.35,q[1]+z*.35);cx.lineTo(q[0]-z*1.6,q[1]);cx.lineTo(q[0]-z*.35,q[1]-z*.35);cx.closePath();cx.fill();
cx.fillStyle=col;cx.globalAlpha=al*.45;cx.beginPath();cx.arc(q[0],q[1],z*.6,0,7);cx.fill();cx.globalAlpha=1}cx.restore()})}
function pv(a,ox,Y0,f,c,sit,dr,hd,nh){if(c.sp&&typeof SPH!=="undefined"&&SPH[c.sp])return SPH[c.sp](a,ox,Y0,f,c,sit,dr,hd,nh);nh=nh||0;const hs=c.h2?99:c.hs!==undefined?c.hs:c.i%3,sk=c.skin,hr=c.hair,sh=c.shirt,pa=c.pants||"#3b3b4a",SH=c.shoe||"#2b2b2b",
map=(x,y,w,d)=>{let X=x,Y=f>0?y:6-y-d,Wd=w,D=d;if(!sit){if(dr===2){X=4-x-w;Y=3-y-d}else if(dr===1){X=y;Y=4-x-w;Wd=d;D=w}else if(dr===3){X=3-y-d;Y=x;Wd=d;D=w}else Y=y}return[X,Y,Wd,D]},
B=(x,y,z,w,d,h,col)=>{const[X,Y,Wd,D]=map(x,y,w,d);box(a,ox+X,Y0+Y,z,Wd,D,h,col)},HM=new Map(),
H=(x,y,z,w,d,h,col)=>{const[X,Y,Wd,D]=map(x*.5,y*.5,w*.5,d*.5),zz=8+z*.5;for(let i=0;i<Wd*2;i++)for(let j=0;j<D*2;j++)for(let k=0;k<h;k++){const vx=ox+X+i*.5,vy=Y0+Y+j*.5,vz=zz+k*.5;HM.set(Math.round(vx*2)+","+Math.round(vy*2)+","+Math.round(vz*2),[vx,vy,vz,col,undefined,.5])}};
const TP=c.t2?0:c.top|0,BT=c.b2?[0,0,0,1,0,0,2,0,0,0][c.b2-1]:c.bot|0,Qv=(x,y,z,col)=>{const[X,Y]=map(x,y,.5,.5);a.push([ox+X,Y0+Y,z,col,undefined,.5])},WH="#f4f4f4",shd=dkHex(sh,.72),pal=dkHex(pa,1.35);
if(sit){B(1,1,2,1,4,2,pa);B(2,1,2,1,4,2,pa);const sn=BT===1||BT===2?sk:BT===3?pal:pa;B(1,4,1,1,1,1,sn);B(2,4,1,1,1,1,sn);B(1,4,0,1,2,1,SH);B(2,4,0,1,2,1,SH)}
else{if(BT===1){B(1,1,1,1,2,1,sk);B(2,1,1,1,2,1,sk);B(1,1,2,1,2,2,pa);B(2,1,2,1,2,2,pa)}else if(BT===2){B(1,1,1,1,2,2,sk);B(2,1,1,1,2,2,sk);B(1,1,3,2,2,1,pa);for(let x=.5;x<3.6;x+=.5)for(let y=.5;y<3.1;y+=.5)if(x<1||x>2.9||y<1||y>2.9){Qv(x,y,3,pa);Qv(x,y,3.5,pa)}}else{B(1,1,1,1,2,3,pa);B(2,1,1,1,2,3,pa);if(BT===3){B(1,1,1,1,2,1,pal);B(2,1,1,1,2,1,pal)}}B(1,1,0,1,2,1,SH);B(2,1,0,1,2,1,SH)}
if(!TP)B(1,1,4,2,2,4,sh);else{B(1,1,4,2,1,4,sh);for(let u=0;u<4;u++)for(let v=0;v<8;v++){Qv(1+u*.5,2,4+v*.5,sh);Qv(1+u*.5,2.5,4+v*.5,topCol(TP,u,v,sh,shd,sk))}}
/* ふくよか：胴を左右に0.5ずつ広げ、お腹を前に0.5出す。脚も外側に0.5太く */
const FT=c.fat|0,TC=(u,v)=>TP?topCol(TP,Math.max(0,Math.min(3,u)),v,sh,shd,sk):sh;if(FT===2){for(let v=0;v<8;v++){const z=4+v*.5;
for(let y=.5;y<3.5;y+=.5){for(const x of[0,.5,3,3.5]){if((x===0||x===3.5)&&(v===7||y===.5))continue;Qv(x,y,z,sh)}}for(let x=1;x<3;x+=.5)Qv(x,.5,z,sh);
for(let x=.5;x<3.5;x+=.5)if(v<7)Qv(x,3,z,TC((x-1)*2,v));if(v>=1&&v<=6)for(let x=.5;x<3.5;x+=.5)if(!((x===.5||x===3)&&(v===1||v===6)))Qv(x,3.5,z,TC((x-1)*2,v));
if(v>=2&&v<=5&&!(c.sp&&SPF[c.sp]&&SPF[c.sp].flatB))for(let x=1;x<3;x+=.5)Qv(x,4,z,TC((x-1)*2,v))}
if(sit){for(let y=.5;y<4.5;y+=.5)for(const z of[2,2.5,3,3.5])for(const x of[0,.5,3,3.5])Qv(x,y,z,pa)}else{for(let y=.5;y<3.5;y+=.5)for(const z of[1,1.5,2,2.5,3,3.5])for(const x of[.5,3])Qv(x,y,z,pa);for(let y=1;y<3;y+=.5)for(const z of[2.5,3,3.5]){Qv(0,y,z,pa);Qv(3.5,y,z,pa)}}}
else if(FT){for(let v=0;v<8;v++){const z=4+v*.5;for(let y=1;y<3.5;y+=.5){if(y===3&&(v===7))continue;Qv(.5,y,z,sh);Qv(3,y,z,sh)}for(let u=0;u<4;u++)if(v<7||(u>0&&u<3))Qv(1+u*.5,3,z,TP?topCol(TP,u,v,sh,shd,sk):sh);if(v>=1&&v<=5)for(let u=0;u<4;u++)if(v>1&&v<5||(u>0&&u<3))Qv(1+u*.5,3.5,z,TP?topCol(TP,u,v,sh,shd,sk):sh)}
if(sit){for(let y=1;y<4.5;y+=.5)for(const z of[2,2.5,3,3.5]){Qv(.5,y,z,pa);Qv(3,y,z,pa)}}else{for(let y=1;y<3;y+=.5)for(const z of[1.5,2,2.5,3,3.5]){Qv(.5,y,z,pa);Qv(3,y,z,pa)}}}
const slC=TP===4?sk:sh,aL=FT===2?-1:FT?-.5:0,aR=FT===2?4:FT?3.5:3;if(hd!==2&&!(nh&1))B(aL,1,5,1,2,1,sk);B(aL,1,6,1,2,2,slC);if(hd!==1&&!(nh&2))B(aR,1,5,1,2,1,sk);B(aR,1,6,1,2,2,slC);if(TP===6){B(aL,1,7,1,2,1,WH);B(aR,1,7,1,2,1,WH)}
if(hd){const BB=(x,y,z,w,d,h,col)=>B(hd===2?4-(x+FT*.5)-w:x+FT*.5,y,z,w,d,h,col),HV=(x,y,z,s,col)=>{const[X,Y]=map(hd===2?4-x-s:x,y,s,s);a.push([ox+X,Y0+Y,z,col,undefined,s])};
BB(3,3,6,1,1,1,sh);BB(3,3.4,7,1,1,1,sh);for(let t=0;t<=1.001;t+=1/7)HV(3.7-1.6*t,5.6-2.5*t,7+1.2*t,.5,t>.8?"#222222":t<.15?"#8d6e63":"#d4af37");HV(2.75,4.05,7.35,.8,sk)}
/* 頭（横8×奥行6×高さ6）：顔は白目・黒目・眉・口。鼻は描かない */
if(c.pump)pumpH(H);else{H(0,0,0,8,6,6,sk);H(-1,2,1,1,2,2,sk);H(8,2,1,1,2,2,sk);if(FT===2){H(1,3,-1,6,3,1,sk);H(-1,1,0,1,4,1,sk);H(8,1,0,1,4,1,sk)}
const EYE=()=>{const ey=c.eye||0,K="#111111",Wt="#ffffff",Ld="#5a4636";
if(ey===1){H(1,5,3,2,1,1,K);H(5,5,3,2,1,1,K)}
else if(ey===2){H(1,5,3,1,1,1,K);H(2,5,2,1,1,1,K);H(6,5,3,1,1,1,K);H(5,5,2,1,1,1,K);H(2,5,3,1,1,1,Wt);H(5,5,3,1,1,1,Wt)}
else if(ey===3){H(1,5,2,1,1,1,K);H(2,5,3,1,1,1,K);H(6,5,2,1,1,1,K);H(5,5,3,1,1,1,K);H(1,5,3,1,1,1,Wt);H(6,5,3,1,1,1,Wt)}
else if(ey===4){H(1,5,2,2,1,2,K);H(5,5,2,2,1,2,K);H(1,5,3,1,1,1,Wt);H(6,5,3,1,1,1,Wt)}
else if(ey===5){H(1,5,3,2,1,1,Ld);H(5,5,3,2,1,1,Ld);H(1,5,2,1,1,1,Wt);H(2,5,2,1,1,1,K);H(5,5,2,1,1,1,K);H(6,5,2,1,1,1,Wt)}
else{H(1,5,2,1,1,2,Wt);H(2,5,2,1,1,2,K);H(5,5,2,1,1,2,K);H(6,5,2,1,1,2,Wt)}};EYE();
H(1,5,4,2,1,1,"#5a4636");H(5,5,4,2,1,1,"#5a4636");H(3,5,0,2,1,1,"#c0645a");
const top=()=>H(0,0,6,8,6,2,hr),back=(z0,h)=>H(0,0,z0,8,2,h,hr),sides=(z0,h)=>{H(0,0,z0,2,5,h,hr);H(6,0,z0,2,5,h,hr)},bangs=()=>{H(0,4,5,8,2,1,hr);H(0,5,4,1,1,1,hr);H(7,5,4,1,1,1,hr)};
const tp=()=>top();
if(hs===0){top();back(0,6);sides(3,3);bangs()}
else if(hs===1){top();back(-6,12);sides(3,3);H(0,0,-6,2,3,9,hr);H(6,0,-6,2,3,9,hr);bangs()}
else if(hs===2){top();back(2,4);sides(4,2);H(2,1,8,4,4,2,hr);H(3,2,10,2,2,1,hr);H(0,5,5,8,1,1,hr)}
else if(hs===3){H(-1,-1,5,10,8,3,hr);H(-1,-1,-1,2,6,7,hr);H(7,-1,-1,2,6,7,hr);H(-1,-1,-1,10,2,7,hr);H(0,0,-2,2,5,1,hr);H(6,0,-2,2,5,1,hr);H(1,-1,-2,6,2,1,hr);H(0,5,5,8,1,1,hr);H(0,4,5,8,1,1,hr);H(0,5,4,1,1,1,hr);H(7,5,4,1,1,1,hr);H(6,5,5,1,1,1,"#ff8fb1")}
else if(hs===4){H(3,0,6,2,6,3,hr);H(3,1,9,2,4,1,hr);H(3,0,1,2,2,5,hr)}
else if(hs===5){top();back(0,6);sides(3,3);bangs();H(3,-2,-1,2,2,7,hr);H(3,-3,-3,2,1,4,hr);H(3,-2,4,2,2,1,"#e84a7f")}
else if(hs===6){top();back(0,6);sides(3,3);bangs();H(-2,1,-5,2,3,11,hr);H(8,1,-5,2,3,11,hr);H(-2,1,6,2,3,1,"#ff6f91");H(8,1,6,2,3,1,"#ff6f91")}
else if(hs===7){H(-2,-2,5,12,8,4,hr);H(-1,5,5,10,2,3,hr);H(-1,-1,9,10,8,2,hr);H(1,0,11,6,6,1,hr);H(-2,-1,0,2,7,5,hr);H(8,-1,0,2,7,5,hr);H(0,-2,0,8,2,5,hr)}
else if(hs===8){top();H(0,0,-8,8,2,14,hr);H(0,0,-8,2,3,13,hr);H(6,0,-8,2,3,13,hr);sides(3,3);H(0,5,4,8,1,2,hr);H(0,4,-4,1,2,9,hr);H(7,4,-4,1,2,9,hr)}
else if(hs===9){H(0,0,6,8,6,1,hr);H(0,4,5,8,2,1,hr)}
else if(hs===10){top();back(0,6);sides(3,3);H(0,2,8,8,4,2,hr);H(0,5,6,8,1,4,hr);H(1,6,7,6,1,2,hr)}
else if(hs===11){top();back(0,6);sides(3,3);bangs();H(-2,1,6,3,4,3,hr);H(7,1,6,3,4,3,hr);H(-1,2,9,2,2,1,hr);H(7,2,9,2,2,1,hr);H(-1,1,5,1,4,1,"#ff9ab0");H(8,1,5,1,4,1,"#ff9ab0")}
else if(hs===12){H(-1,-1,4,10,8,4,hr);H(-1,-1,1,2,6,5,hr);H(7,-1,1,2,6,5,hr);H(-1,-1,1,10,2,6,hr);H(0,6,4,8,1,2,hr);H(0,5,4,8,1,2,hr)}
else if(hs===13){top();back(0,6);sides(3,3);H(0,4,5,3,2,1,hr);H(5,4,5,3,2,1,hr);H(0,5,4,2,1,1,hr);H(6,5,4,2,1,1,hr);for(let i=0;i<9;i++){const dx=i%2?0:1;H(-2+dx,2,3-i,2,2,1,hr);H(7-dx,2,3-i,2,2,1,hr)}H(-2,2,-6,2,2,1,"#e84a7f");H(8,2,-6,2,2,1,"#e84a7f")}
else if(hs===15){top();back(-3,9);sides(2,4);bangs();H(-1,0,-2,2,4,4,hr);H(7,0,-2,2,4,4,hr);H(1,-1,-4,6,1,3,hr);H(1,1,8,6,4,1,hr)}
else if(hs===16){top();H(0,0,8,8,6,1,hr);for(const[x,y]of[[-1,0],[-1,2],[-1,4],[8,0],[8,2],[8,4],[0,-1],[2,-1],[4,-1],[6,-1],[1,-1],[5,-1]]){H(x,y,-5,1,1,12,hr)}bangs()}
else if(hs===98){}
else if(hs===17){H(0,0,6,8,6,1,hr);H(1,1,7,6,5,2,hr);H(1,4,8,6,3,1,hr);H(0,0,3,8,2,3,"#3a3a3a");H(0,0,3,1,5,3,"#3a3a3a");H(7,0,3,1,5,3,"#3a3a3a")}
else{H(0,0,6,8,6,2,sk);H(2,1,7,2,2,1,"#fff3dc");H(0,0,2,2,5,3,hr);H(6,0,2,2,5,3,hr);H(0,0,2,8,2,3,hr)}
const ac=c.acc||0,ak=c.accC||"#333333";
if(ac===2){H(0,0,6,8,6,2,ak);H(-1,-1,5,10,8,1,ak);H(0,6,5,8,3,1,ak)}
else if(ac===3){H(-1,-1,5,10,8,3,ak);H(1,1,8,6,4,2,ak);H(3,2,10,2,2,1,ak)}
else if(ac===4){const bc=c.akU&&c.accC?c.accC:"#2b1d14";H(2,5,1,4,1,1,bc);H(0,5,0,2,1,1,bc);H(6,5,0,2,1,1,bc);H(1,4,-1,6,2,1,bc)}
else if(ac===5){H(-2,1,0,2,4,4,ak);H(8,1,0,2,4,4,ak);H(-1,2,6,1,2,2,ak);H(8,2,6,1,2,2,ak);H(0,2,8,8,2,1,ak)}
else if(ac===6){const mc=c.akU&&c.accC?c.accC:"#eeeeee";H(0,5,0,8,1,3,mc);H(-1,3,1,1,2,1,mc);H(8,3,1,1,2,1,mc)}
else if(ac===8){for(let x=-1;x<=8;x++)for(let y=-1;y<=6;y++)for(let z=-1;z<=7;z++){const ex=x===-1||x===8,ey=y===-1||y===6,ez=z===-1||z===7;if(ex&&ey&&ez)continue;if(z===7&&(ex||ey))continue;let col=ak;if(x>=3&&x<=4&&(z===7||(y===-1&&z>=0)))col="#f5f5f5";if(y===6&&x>=0&&x<=7&&z>=1&&z<=4)col=z===4&&x>=1&&x<=2?"#6b7a99":"#1a1d24";H(x,y,z,1,1,1,col)}}
else if(ac===9){H(0,1,8,2,2,1,ak);H(0,1,9,1,2,1,ak);H(6,1,8,2,2,1,ak);H(7,1,9,1,2,1,ak);H(1,2,8,1,1,1,"#ff9ab0");H(6,2,8,1,1,1,"#ff9ab0");H(0,2,7,8,1,1,ak)}else if(ac===17){const dk=dkHex(ak,.8);H(-1,-1,6,10,8,1,ak);H(0,0,7,8,7,1,ak);H(1,7,6,6,1,1,dk)}else if(ac===18){const dk=dkHex(ak,.82);H(0,0,6,8,6,1,dk);H(0,0,7,8,6,2,ak);H(-2,-2,5,12,10,1,ak)}else if(ac===19){const lt=dkHex(ak,1.18);H(-1,-1,5,10,8,2,ak);H(0,0,7,8,6,1,lt);H(1,1,8,6,4,1,ak);H(3,7,5,2,1,1,"#f1c40f")}else if(ac===20){H(-1,-1,4,10,8,1,"#ffffff");H(3,6,4,2,1,1,ak);H(3,-2,4,2,1,1,"#ffffff");H(3,-2,2,1,1,2,"#ffffff");H(4,-2,1,1,1,2,"#ffffff")}else if(ac===21){H(-1,-1,6,10,8,1,ak);H(-2,0,7,10,6,1,ak);H(3,2,8,1,1,1,ak)}else if(ac===22){const g="#f1c40f",g2="#f5d34a";H(1,1,7,6,1,1,g);H(1,4,7,6,1,1,g);H(1,1,7,1,4,1,g);H(6,1,7,1,4,1,g);[[1,1],[6,1],[1,4],[6,4],[3,4],[4,1]].forEach(([x,y])=>H(x,y,8,1,1,1,g2));H(3,4,7,2,1,1,ak)}
if(c.sp&&typeof SPF!=="undefined"&&SPF[c.sp]){const Q4=(x,y,z,col,sz)=>{sz=sz||.25;const[X,Y]=map(x,y,sz,sz);a.push([ox+X,Y0+Y,z,col,undefined,sz])};SPF[c.sp]({H:c.pump?()=>{}:H,B,Qv,Q4,c,hr,sk,sh,sit});if(!SPF[c.sp].ownEye&&!c.pump)EYE()}
if(!c.pump&&(c.h2||c.t2||c.b2||c.pr)&&typeof OWXD!=="undefined"){const Q4=(x,y,z,col,sz)=>{sz=sz||.25;const[X,Y]=map(x,y,sz,sz);a.push([ox+X,Y0+Y,z,col,undefined,sz])};try{OWXD(c,{H,B,Qv,Q4,hr,sk,sh,pa,sit,top,back,sides,bangs})}catch(e){console.log(e)}}
}/* 頭の中に隠れた面は描かない */
const hv=[...HM.values()],has=(x,y,z)=>HM.has(Math.round(x*2)+","+Math.round(y*2)+","+Math.round(z*2));
hv.forEach(v=>{if(!(has(v[0]+.5,v[1],v[2])&&has(v[0]-.5,v[1],v[2])&&has(v[0],v[1]+.5,v[2])&&has(v[0],v[1]-.5,v[2])&&has(v[0],v[1],v[2]+.5)&&has(v[0],v[1],v[2]-.5)))a.push(v)})}
/* メガネ/サングラスはボクセルではなく、顔の面に2Dで重ね描き（向きと奥行きに合わせて投影） */
function glFx(ox,Y0,f,sit,dr,kind,col,ly,zo){zo=zo||0;const M=(lx,y)=>sit?[ox+lx,f>0?Y0+y:Y0+6-y]:dr===0?[ox+lx,Y0+y]:dr===2?[ox+4-lx,Y0+3-y]:dr===1?[ox+y,Y0+4-lx]:[ox+3-y,Y0+lx];
const o=M(0,0),nx=M(0,1),n=[nx[0]-o[0],nx[1]-o[1]],c=M(2,ly),pos=[c[0]+n[0]*.4,c[1]+n[1]*.4,9.5-zo];
return{pos,fn:k=>{if(n[0]*k.cx+n[1]*k.cy<.04)return;const ct=cx,sun=kind===1,s=k.s,pt=(lx,z,yy)=>{const m=M(lx,yy===undefined?ly:yy);return P3(m[0],m[1],z-zo,k)};
const lens=(lc)=>{if(kind===10){const q=[[-.9,.7],[.9,.7],[.9,-.7],[-.9,-.7]];return q.map(([dx,dz])=>{const m=M(lc+dx,ly);return P3(m[0],m[1],9.6+dz-zo,k)})}const pts=[];for(let i=0;i<24;i++){const t=i/12*Math.PI,m=M(lc+Math.cos(t)*.85,ly);pts.push(P3(m[0],m[1],9.6+Math.sin(t)*.8-zo,k))}return pts};
const fr=Math.max(1,s*(sun?.3:.2));
ct.lineJoin="round";
for(const lc of[1,3]){const pts=lens(lc);ct.beginPath();pts.forEach((p,i)=>i?ct.lineTo(p[0],p[1]):ct.moveTo(p[0],p[1]));ct.closePath();
ct.fillStyle=sun?"rgba(12,12,22,.93)":kind===10?"rgba(210,235,255,.12)":"rgba(210,235,255,.28)";ct.fill();ct.lineWidth=fr;ct.strokeStyle=sun?"#0a0a10":col;ct.stroke();
const sq=kind===10,g=sq?pt(lc-.55,10.15):pt(lc-.35,10.1),g2=sq?pt(lc-.35,9.85):pt(lc+.1,9.3);ct.beginPath();ct.moveTo(g[0],g[1]);ct.lineTo(g2[0],g2[1]);ct.lineWidth=Math.max(1,s*(sq?.12:.18));ct.strokeStyle=sun?"rgba(150,190,255,.75)":sq?"rgba(255,255,255,.5)":"rgba(255,255,255,.8)";ct.stroke()}
const b1=pt(1.85,9.8),b2=pt(2.15,9.8);ct.beginPath();ct.moveTo(b1[0],b1[1]);ct.lineTo(b2[0],b2[1]);ct.lineWidth=fr;ct.strokeStyle=sun?"#0a0a10":col;ct.stroke();
for(const[ex,ey]of[[.15,0],[3.85,0]]){const a=pt(ex,9.8),b=pt(ex<2?-.05:4.05,9.8,1.2);ct.beginPath();ct.moveTo(a[0],a[1]);ct.lineTo(b[0],b[1]);ct.lineWidth=fr;ct.strokeStyle=sun?"#0a0a10":col;ct.stroke()}}}}
const OW={c:{i:99,skin:"#f1c7a0",hair:"#161616",shirt:"#2b2b3a",hp:10,up:0},x:3,y:8,bt:0,bub:"",dir:1};
let GLS=[];
function dyn(){GLS=[];const a=[],T=G.menu.map(id=>DR.find(d=>d.id===id));
for(let i=0;i<FTYPES;i++){const d=T[i],n=d?3:0;for(let xx=0;xx<3;xx++)for(let zz=0;zz<2;zz++)a.push([FR.x+1+xx,FR.y+4,3+2*i+zz,xx<n?d.col:"#4a5a64"])}
if(OW.sitting&&OW.seat){const s=OW.seat,hd=OW.idleSmk&&!OW.eat?(s.f>0?1:2):0,md=OW.eat?{k:OW.eat,mir:hd===2?1:0,nh:hd===2?2:1}:OW.ph?{k:"phone",mir:hd===2?1:0,nh:hd===2?2:1}:null,c=OW.c,key="S"+s.id+"|"+hd+"|"+(md?md.k:0)+"|"+c.hair+c.shirt+c.hs+c.acc+c.skin+c.accC+c.eye+c.top+c.bot+c.pants+"|"+(c.h2|0)+(c.t2|0)+(c.b2|0);
if(!c.pump&&(isGl(c.acc)))GLS.push(glFxS(s,c.acc,c.accC||"#333333",3.04,seatZo(s)));
if(!OW._pc||OW._pc.k!==key){const t=[];pv(t,s.px,s.Y0,s.f,c,1,0,hd,md?md.nh:0);seatPose(t,s,c);const ab=md?actBuild(t,{seat:s,c},md):null;OW._pc={k:key,l:cullS(t),ab}}sprPush(OW._pc,a,[s.px+2,s.Y0+3,4.5]);actDraw({_pc:OW._pc,seed:0},1);
if(OW.idleSmk){const hc=hkCenter({seat:s});hkPush(a,hc);if(hd)hosePush(a,{seat:s},hc,hd)}}
else{if(!OW.c.pump&&(isGl(OW.c.acc))){const d=OW.dir,o=d%2,fw=o?3:4,fd=o?4:3;GLS.push(glFx(OW.x-fw/2,OW.y-fd/2,1,0,d,OW.c.acc,OW.c.accC||"#333333",3.04))}
{if(OW.idleSmk){const ox=OW.x-2,oy=OW.y-1.5,hc={x:ox+3.5,y:oy+7,rot:0};hkPush(a,hc);if(!OW.eat)hosePush(a,{seat:{px:ox,Y0:oy,f:1}},hc,1)}}
{const d=OW.dir,o=d%2,fw=o?3:4,fd=o?4:3,ek=OW.eat&&OW.mode!=="go"&&OW.mode!=="smoke"?OW.eat:null,ph=ek||(OW.ph&&!OW.hd&&!OW.mode),key=d+"|"+(OW.eat?0:(OW.hd||0))+"|"+(ek||(ph?1:0))+"|"+OW.x+"|"+OW.y+"|"+OW.c.hair+OW.c.shirt+OW.c.hs+OW.c.acc+OW.c.skin+OW.c.accC+OW.c.eye+OW.c.top+OW.c.bot+OW.c.pants+"|"+(OW.c.h2|0)+(OW.c.t2|0)+(OW.c.b2|0)+(OW.c.hc2||"");if(!OW._pc||OW._pc.k!==key){const t=[];const ox=OW.x-fw/2,oy=OW.y-fd/2;pv(t,ox,oy,1,OW.c,0,d,OW.eat?0:(OW.hd||0),ph?1:0);OW._pc={k:key,l:t,ab:ph?standPhone(t,ox,oy,d,OW.c,ek||"phone"):null}}OW._pc.l.forEach(v=>a.push(v));actDraw({_pc:OW._pc,seed:0})}}
R.people.forEach(p=>{const c=p.c,s=p.seat;
if(s.p===p&&p.st!=="in"&&!p.nohk){const hc=hkCenter(p);if(!p.sh||p===p.sh.a)hkPush(a,hc);const hd=hdOf(p);if(hd)hosePush(a,p,hc,hd)}
if(!c.pump&&(isGl(c.acc))){if(p.st==="sit")GLS.push(glFxS(s,c.acc,c.accC||"#333333",3.04,seatZo(s)));else{const d=p.dir||0,o=d%2,fw=o?3:4,fd=o?4:3;GLS.push(glFx(p.x-fw/2,p.y-fd/2,1,0,d,c.acc,c.accC||"#333333",3.04))}}
if(p.st==="sit"){const hd=hdOf(p),md=actMode(p,hd),key=s.id+"|"+hd+"|"+(md?md.k+md.mir:"")+"|"+[c.hs,c.acc,c.hair,c.skin,c.shirt,c.accC,c.i,c.eye,c.top,c.bot,c.pants,c.pump].join();if(!p._pc||p._pc.k!==key){const t=[];pv(t,s.px,s.Y0,s.f,c,1,0,hd,md?md.nh:0);seatPose(t,s,c);const ab=md?actBuild(t,p,md):null;p._pc={k:key,l:cullS(t),ab}}actDraw(p,1);sprPush(p._pc,a,[s.px+2,s.Y0+3,4.5])}
else{const d=p.dir||0,o=d%2,fw=o?3:4,fd=o?4:3;if(!walkSpr(a,c,d,p.x-fw/2,p.y-fd/2))pv(a,p.x-fw/2,p.y-fd/2,1,c,0,d)}});
bbFill(a);if(typeof catPush==="function")catPush(a);return a}
function dv(v,k){const s=v[5]||1,x=v[0],y=v[1],z=v[2],c=v[3],ox=k.ox+k.s*((x-TX)*k.rx+(y-TY)*k.ry),oy=k.oy-k.s*((x-TX)*k.ux+(y-TY)*k.uy+(z-TZ)*k.uz),exx=k.exx*s,exy=k.exy*s,eyx=k.eyx*s,eyy=k.eyy*s,ezy=k.ezy*s;
const i=k.cx>0?1:0,j=k.cy>0?1:0,ax=ox+i*exx,ay=oy+i*exy;
cx.fillStyle=col(c,.62);cx.beginPath();cx.moveTo(ax,ay);cx.lineTo(ax+eyx,ay+eyy);cx.lineTo(ax+eyx,ay+eyy+ezy);cx.lineTo(ax,ay+ezy);cx.fill();
const bx=ox+j*eyx,by=oy+j*eyy;
cx.fillStyle=col(c,.82);cx.beginPath();cx.moveTo(bx,by);cx.lineTo(bx+exx,by+exy);cx.lineTo(bx+exx,by+exy+ezy);cx.lineTo(bx,by+ezy);cx.fill();
const tx=ox,ty=oy+ezy;
cx.fillStyle=col(c,1);cx.beginPath();cx.moveTo(tx,ty);cx.lineTo(tx+exx,ty+exy);cx.lineTo(tx+exx+eyx,ty+exy+eyy);cx.lineTo(tx+eyx,ty+eyy);cx.fill()}
function wrap(t,w){const o=[];let l="";for(const ch of t){if(cx.measureText(l+ch).width>w){o.push(l);l=ch}else l+=ch}o.push(l);return o}
function poly(p,c){cx.fillStyle=c;cx.beginPath();cx.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)cx.lineTo(p[i][0],p[i][1]);cx.closePath();cx.fill()}
/* 背景（外の景色・床・奥の壁とポスター）はカメラと時間帯が変わった時だけ描き直す */
let BGC=null,BGK="";
function bgDraw(k){drawScn(k);const fo=FLC[R.pvF!=null?R.pvF:(G.fcl||0)]||FLC[0],fc=fo.c;FLT.forEach(([tx,ty])=>{const x=tx*6,y=ty*6;if(fo.pt&&flTile(fo.pt,tx,ty,k))return;poly([P3(x,y,0,k),P3(x+6,y,0,k),P3(x+6,y+6,0,k),P3(x,y+6,0,k)],(tx+ty)%2?fc[0]:fc[1])});try{dirtDraw(k)}catch(e){}statList(k).forEach(o=>{if(o.v[4]&&(!R.ext||wallVis0(o.v[4],k)))dv(o.v,k)});if(typeof wallImgs==="function")wallImgs(k)}
function drawBG(k){if(typeof document==="undefined"||!document.createElement){bgDraw(k);return}const hr=(R.phase==="run"?R.t:G.open*60)/60,key=[k.s.toFixed(3),k.rx.toFixed(4),k.ry.toFixed(4),k.ux.toFixed(4),k.uy.toFixed(4),k.uz.toFixed(4),k.ox,k.oy,R.stV,(G.dv||0),bgLK(hr),R.pvF!=null?"p"+R.pvF:(G.fcl||0),W,CH,dpr,SCA].join();
if(!BGC)BGC=document.createElement("canvas");if(BGC.width!==cv.width||BGC.height!==cv.height){BGC.width=cv.width;BGC.height=cv.height;BGK=""}
const g=BGC.getContext&&BGC.getContext("2d");if(!g){bgDraw(k);return}if(BGK!==key){const oc=cx;cx=g;cx.setTransform(dpr,0,0,dpr,0,0);cx.clearRect(0,0,W,CH);try{bgDraw(k)}finally{cx=oc}BGK=key}
cx.save();cx.setTransform(1,0,0,1,0,0);cx.drawImage(BGC,0,0);cx.restore()}
function statFG(k){const L=statList(k);if(SC.fgFor!==SC.key){SC.fg=L.filter(o=>!o.v[4]||(R.ext&&!wallVis0(o.v[4],k)));SC.fgFor=SC.key}return SC.fg}
/* 煙たさの演出：うっすら→もくもく。最大でほぼ真っ白 */
let PUF=null;function puff(){if(PUF||typeof document==="undefined"||!document.createElement)return PUF;const c=document.createElement("canvas");c.width=c.height=128;const g=c.getContext&&c.getContext("2d");if(!g)return null;const r=g.createRadialGradient&&g.createRadialGradient(64,64,4,64,64,62);if(!r||!r.addColorStop)return null;r.addColorStop(0,"rgba(236,236,244,1)");r.addColorStop(.55,"rgba(226,226,236,.6)");r.addColorStop(1,"rgba(220,220,232,0)");g.fillStyle=r;g.fillRect(0,0,128,128);return PUF=c}
function drawSmoke(T){const s=Math.max(0,Math.min(1,(R.smoke||0)/100));if(s<.12)return;const h=Math.pow((s-.12)/.88,1.4);
cx.fillStyle="rgba(214,214,228,"+(h*.45).toFixed(3)+")";cx.fillRect(0,0,W,CH);const p=puff();if(!p)return;const n=Math.round(4+h*34);cx.save();
for(let i=0;i<n;i++){const sp=4+(i%4)*3,x=((i*97.3+T*sp)%(W+260))-130,y=((i*61.7)%(CH+120))-60+Math.sin(T*.35+i)*18,r=(70+(i%5)*28)*(.7+h*.9);cx.globalAlpha=Math.min(1,.1+h*.42);cx.drawImage(p,x-r,y-r,r*2,r*2)}
cx.restore()}
function draw(){const k=camVec();R.cv=k;cx.setTransform(dpr,0,0,dpr,0,0);cx.clearRect(0,0,W,CH);const s=k.s;drawBG(k);danceDraw(k);if(typeof wallImgs==="function")wallImgs(k,1);auraDraw(k,0);if(R.tab==="deco"&&R.tool&&String(R.tool).startsWith("wp_")){const used=new Set((G.wall||[]).flatMap(d=>[d.k,d.k2,d.k3,d.k4].filter(Boolean)));WS.forEach(w=>{if(used.has(w.k)||!wallVis(w.s,k))return;const[tx,ty]=w.k.split(",").map(Number),X=tx*6,Y=ty*6,z0=w.u?14:6.5,z1=w.u?19:11.5;let q;
if(w.s===1)q=[[X+1,Y],[X+5,Y]];else if(w.s===3)q=[[X+5,Y+6],[X+1,Y+6]];else if(w.s===2)q=[[X,Y+5],[X,Y+1]];else q=[[X+6,Y+1],[X+6,Y+5]];
poly([P3(q[0][0],q[0][1],z0,k),P3(q[1][0],q[1][1],z0,k),P3(q[1][0],q[1][1],z1,k),P3(q[0][0],q[0][1],z1,k)],"rgba(255,80,80,.38)")})}
if(typeof mvHi==="function")mvHi(k);if(R.tab==="deco"&&R.tool&&R.tool!=="rm"&&R.tool!=="mv"&&!String(R.tool).startsWith("wp_")&&typeof occ==="function"){cx.fillStyle="rgba(255,80,80,.32)";const stt=String(R.tool).startsWith("st:")?R.tool.split(":")[1]:null;FLT.forEach(([tx,ty])=>{if(stt?!(furnFits({k:stt,tx,ty,f:1},-1)||(stt!=="b"&&furnFits({k:stt,tx,ty,f:-1},-1))||furnFits({k:stt,tx,ty,f:1,o:1},-1)||furnFits({k:stt,tx,ty,f:1,o:3},-1)):occ(tx,ty))return;const x=tx*6,y=ty*6;poly([P3(x+.3,y+.3,0,k),P3(x+5.7,y+.3,0,k),P3(x+5.7,y+5.7,0,k),P3(x+.3,y+5.7,0,k)],cx.fillStyle)})}
if(!scnDraw(k)){const A=statFG(k),Bn=dyn().map(v=>({v,d:dep(v,k)})).concat(GLS.map(g=>({v:{fn:g.fn},d:g.pos[0]*k.cx+g.pos[1]*k.cy+g.pos[2]*k.cz+.6})));decPush(Bn,k);Bn.sort((p,q)=>p.d-q.d);let i=0,j=0;
while(i<A.length||j<Bn.length){const o=(j>=Bn.length||(i<A.length&&A[i].d<=Bn[j].d))?A[i++]:Bn[j++];o.v.fn?o.v.fn(k):dv(o.v,k)}}
const T=performance.now()/1000;R.people.forEach(p=>{if(p.st!=="sit")return;if(!hdOf(p))return;const ph=(T+p.seed)%5,f=p.seat.f,hc0=hkCenter(p),hx=hc0.x-.5,hy=hc0.y-.5;
if(ph<1.8){for(let q=0;q<3;q++){const o=P(hx+.5,hy+.5,.8+((T*1.6+q*.5)%1)*2.4),r=Math.max(1.2,s*.45);cx.fillStyle="rgba(255,255,255,.75)";cx.beginPath();cx.arc(o[0],o[1],r,0,7);cx.fill()}}
else if(ph>=2.0){const ag=(ph-2.0)/3;for(let q=0;q<7;q++){const a2=ag-q*.07;if(a2<0||a2>1)continue;const so=p.seat.o,o=so?P(p.x+(so===1?1:-1)*a2*8,p.y+Math.sin(q*2.3)*2,9+a2*8+q*.3):P(p.x+Math.sin(q*2.3)*2,p.y+f*(a2*8),9+a2*8+q*.3);cx.fillStyle=`rgba(125,135,155,${.62*(1-a2)})`;cx.beginPath();cx.arc(o[0],o[1],s*(1.3+a2*4.4),0,7);cx.fill()}}});
{if(OW.hd&&!OW.eat){const ph=(T+1.3)%4.2,dy=OW.dir===2?-1:OW.dir===0?1:0,dx=OW.dir===1?1:OW.dir===3?-1:0;if(ph>=1.6){const ag=(ph-1.6)/2.6;for(let q=0;q<6;q++){const a2=ag-q*.07;if(a2<0||a2>1)continue;const o=P(OW.x+dx*a2*6+Math.sin(q*2.3)*1.5,OW.y+dy*a2*6,9+a2*7+q*.3);cx.fillStyle=`rgba(125,135,155,${.55*(1-a2)})`;cx.beginPath();cx.arc(o[0],o[1],s*(1.2+a2*3.8),0,7);cx.fill()}}}}
{const rh=R.rotHint;if(rh&&performance.now()-rh.t<3000){const o=P3(rh.tx*6+3,rh.ty*6+3,12,k),txt="タップで回転 ↻";cx.font="bold 12px sans-serif";const w=cx.measureText(txt).width+16,x=o[0]-w/2,y=o[1]-30;cx.fillStyle="rgba(255,255,255,.95)";cx.strokeStyle="#7b4fd0";cx.lineWidth=2;cx.beginPath();cx.roundRect?cx.roundRect(x,y,w,22,11):cx.rect(x,y,w,22);cx.fill();cx.stroke();cx.beginPath();cx.moveTo(o[0]-5,y+22);cx.lineTo(o[0]+5,y+22);cx.lineTo(o[0],y+28);cx.closePath();cx.fillStyle="#7b4fd0";cx.fill();cx.fillStyle="#3a2a5a";cx.textAlign="center";cx.textBaseline="middle";cx.fillText(txt,o[0],y+11);cx.textAlign="left";cx.textBaseline="alphabetic"}}
/* 天気の演出 */
{const wk=G.wx&&G.wx[G.wd];if(wk){if(wk==="typhoon"){cx.fillStyle="rgba(30,40,60,.28)";cx.fillRect(0,0,W,CH)}
if(wk==="rain"||wk==="typhoon"){const n=wk==="typhoon"?80:45;cx.strokeStyle="rgba(150,175,220,.55)";cx.lineWidth=1;cx.beginPath();for(let i=0;i<n;i++){const x=(i*53+T*(wk==="typhoon"?220:90))%(W+40)-20,y=(i*97+T*(wk==="typhoon"?420:300))%CH;cx.moveTo(x,y);cx.lineTo(x-4,y+9)}cx.stroke()}
if(wk==="snow"){cx.fillStyle="rgba(255,255,255,.85)";for(let i=0;i<45;i++){const x=(i*61+Math.sin(T+i)*14)%W,y=(i*89+T*28)%CH;cx.beginPath();cx.arc(x,y,1.6,0,7);cx.fill()}}
}}
auraDraw(k,1);leakDraw(s,T);drawSmoke(T);darkDraw(s,T);
if(R.vent>0){cx.strokeStyle="rgba(255,255,255,.7)";cx.lineWidth=2;cx.beginPath();for(let i=0;i<7;i++){const y=40+i*50,x=((T*160+i*70)%(W+80))-40;cx.moveTo(x,y);cx.lineTo(x+34,y)}cx.stroke()}
/* 吹き出し：重なったら上にずらす */
cx.font="10px sans-serif";cx.textAlign="center";R.people.forEach(p=>{if(!p.c||p.st==="out")return;const t=nm(p.c);if(t==="？？？")return;const[X,Y]=P(p.x,p.y,13),w=cx.measureText(t).width+8;cx.fillStyle="rgba(30,20,45,.62)";cx.beginPath();cx.roundRect?cx.roundRect(X-w/2,Y-7,w,13,6):cx.rect(X-w/2,Y-7,w,13);cx.fill();cx.fillStyle=p.c.nick?"#ffe08a":"#fff";cx.fillText(t,X,Y+3)});cx.textAlign="left";
cx.font="10.5px sans-serif";const bs=[];(R.mvOn?[]:R.people.concat(R.cat?[OW,R.cat]:[OW])).forEach(p=>{if(!(p.bt>0)&&p.bq){const t=p.bq;p.bq=null;sayX(p,t)}if(p.bt>0){p.bt-=1/60;const[X,Y]=P(p.x,p.y,15),fc=bubFace(p),FW=fc?18:0,ls=wrap(p.bub,105),w=Math.min(115,Math.max(...ls.map(l=>cx.measureText(l).width))+10)+FW,h=Math.max(ls.length*13+6,fc?22:0);bs.push({p,X,Y,ls,w,h,fc,FW,pr:(p===OW?3:(p.tkT&&performance.now()-p.tkT<3200)?2.5:/^❤|♥/.test(p.bub||"")?2:p.bk?2:0)+Math.min(.99,(p.bt||0)/10)})}});
/* 同時に出すのは6個まで（店長との会話・♥を優先、あとは新しい順） */
const MX=6;let show=bs;if(bs.length>MX){show=bs.slice().sort((a,b)=>b.pr-a.pr).slice(0,MX)}try{bfMark(show)}catch(e){}
const pl=[];show.sort((a,b)=>b.Y-a.Y).forEach(b=>{const bx=clamp(b.X-b.w/2,4,W-b.w-4);let by=b.Y-b.h-8,n=0;const hit=()=>pl.some(r=>bx<r.x+r.w+3&&bx+b.w+3>r.x&&by<r.y+r.h+3&&by+b.h+3>r.y);while(n<10&&hit()){by-=b.h+4;n++}
const moved=n>0;by=Math.max(2,by);pl.push({x:bx,y:by,w:b.w,h:b.h});const m=b.p.c?b.p.c.hp-b.p.c.up:0,fill=b.p.bk?"#e4f6ec":m<=-15?"#e8e6f3":m>=25?"#fff3f6":"#fffdf5",line=b.p.bk?"#2f9a6b":m<=-15?"#5b4f8a":m>=25?"#d9638c":"#6b5a80";
cx.fillStyle=fill;cx.strokeStyle=line;cx.lineWidth=1.2;
if(moved&&!b.fc){cx.beginPath();cx.moveTo(bx+b.w/2,by+b.h);cx.lineTo(b.X,b.Y);cx.setLineDash([2,3]);cx.stroke();cx.setLineDash([])}
cx.beginPath();cx.roundRect(bx,by,b.w,b.h,8);cx.fill();cx.stroke();
if(!moved){const tx=clamp(b.X,bx+8,bx+b.w-8);cx.beginPath();cx.moveTo(tx-4,by+b.h);cx.lineTo(tx,by+b.h+7);cx.lineTo(tx+4,by+b.h);cx.fill()}
if(b.fc){try{cx.drawImage(b.fc,bx+1,by+b.h/2-10,20,20)}catch(e){}}
cx.fillStyle="#2b2236";const ty=by+(b.h-(b.ls.length*13+6))/2;b.ls.forEach((l,q)=>cx.fillText(l,bx+5+b.FW,ty+13+q*13))})}
function floorAt(X,Y,k){const a=(X-k.ox)/k.s,b=(k.oy-Y)/k.s+k.uz*TZ,det=k.rx*k.uy-k.ry*k.ux;return[TX+(a*k.uy-k.ry*b)/det,TY+(k.rx*b-k.ux*a)/det]}
/* ===== 店の外：出店地域（0都内/1住宅地）×出店形態（0ビル中/1路面店） ===== */
const LOCA=["都内","住宅地"],LOCT=["ビル中","路面店"];
let SCN=[],GRD=[];const NVAR=15,SCA=.3;
/* 街並みのバリエーション（15種）：配色・高さ・緑の量・灯り・小物 */
const TPAL=[["#7d8a96","#9aa5b1","#5f6b78","#b0a89a"],["#8e8476","#a1887f","#6d6259","#bcaaa4"],["#546e7a","#78909c","#37474f","#90a4ae"],["#9e9e9e","#bdbdbd","#757575","#e0e0e0"],["#5d6d7e","#85929e","#a9cce3","#34495e"]],
HPAL=[[["#f3ead7","#e8dccb","#f6e3c6"],["#8d3b2f","#6b4f3a"]],[["#dfe6ea","#eceff1","#cfd8dc"],["#3d5a80","#455a64"]],[["#fff3e0","#ffe0b2","#f5f5f5"],["#5a5a5a","#424242"]],[["#e8f5e9","#f1f8e9","#fafafa"],["#2e7d32","#6d4c41"]],[["#fce4ec","#f3e5f5","#fff8e1"],["#ad1457","#4e342e"]]];
function genScn(){SCN=[];GRD=[];if(G.loc&&G.loc.v===undefined)G.loc.v=Math.random()*NVAR|0;const l0=G.loc||{},vv=l0.v|0,tp=TPAL[vv%5],hp=HPAL[vv%5],hsc=[.75,1,1.3][vv%3],trd=[.15,.35,.55][Math.floor(vv/5)%3],lit=[1,2,3][(vv+1)%3],lc={a:l0.a===1?1:0,t:l0.t===0?0:1},xs=FLT.map(t=>t[0]),ys=FLT.map(t=>t[1]),L=Math.min(...xs)*6,Rr=(Math.max(...xs)+1)*6,T=Math.min(...ys)*6,B=(Math.max(...ys)+1)*6;
let sd=7+lc.a*13+lc.t*29+vv*101;const rn=()=>{sd=(sd*16807)%2147483647;return sd/2147483647},pick=a=>a[Math.floor(rn()*a.length)];
const bx=(x,y,z,w,d,h,c,t,win)=>SCN.push({x,y,z,w,d,h,c,t,win}),gr=(x,y,w,d,c)=>GRD.push({x,y,w,d,c});
const city=lc.a===0,Y0=T-70,Y1=B+60;
const pr=(x,y,t)=>{const k=vv%5;if(k===0){bx(x,y,0,2,1,2,"#90a4ae",t);bx(x,y,2,2,1,.4,"#263238",t)}else if(k===1){bx(x,y,0,3,1,1.2,"#795548",t);bx(x,y,1.2,3,1,1,"#e91e63",t)}else if(k===2){bx(x,y,0,1,4,5,"#1565c0",t);bx(x,y,5,1,4,.5,"#0d47a1",t)}else if(k===3){bx(x,y,0,2,2,3,"#8d6e63",t);bx(x-.5,y-.5,3,3,3,2,"#7cb342",t)}else{bx(x,y,0,1,1,6,"#616161",t);bx(x,y,6,1,1,1,"#fff59d",t)}};
const tree=(x,y,t)=>{bx(x,y,0,1,1,4,"#6d4c41",t);bx(x-2,y-2,4,5,5,4,pick(["#4caf50","#43a047","#66bb6a"]),t);bx(x-1,y-1,8,3,3,2,"#81c784",t)};
const house=(x,y,w,d,t)=>{const c=pick(hp[0]),r=pick(hp[1]);bx(x,y,0,w,d,9,c,t,"#9fc3d9");bx(x-1,y-1,9,w+2,d+2,1.5,r,t);bx(x+1,y+1,10.5,w-2,d-2,1.5,r,t);bx(x+3,y+3,12,w-6,d-6,1.5,r,t)};
const tower=(x,y,w,d,t)=>{const h=Math.round((26+Math.floor(rn()*34))*hsc);bx(x,y,0,w,d,h,pick(tp),t,"lit"+lit);if(rn()<.25)bx(x+2,y+d,h-6,w-4,.4,2.5,pick(["#ff4fa3","#40c4ff","#ffd54f","#69f0ae"]),t)};
const run=(y,yE,f)=>{while(y<yE){const n=f(y);y+=n}};
GRD.base=city?(lc.t?"#8d8d8d":"#4a4650"):(lc.t?"#9dbb7c":"#8f8a80");
if(lc.t===1){/* 路面店：歩道・車道・向かいの歩道 */
gr(L-9,Y0,9,Y1-Y0,"#cbbfae");gr(L-10,Y0,1,Y1-Y0,"#e6e6e6");gr(L-26,Y0,16,Y1-Y0,"#454545");for(let y=Y0;y<Y1;y+=8)gr(L-18.5,y,1,4,"#f5f5f5");gr(L-27,Y0,1,Y1-Y0,"#e6e6e6");gr(L-35,Y0,8,Y1-Y0,"#cbbfae");
if(city){run(Y0,Y1,y=>{const d=12+Math.floor(rn()*8),w=14+Math.floor(rn()*6);tower(L-36-w,y,w,d,2);return d+1});
run(L-12,Rr+30,x=>{const w=14+Math.floor(rn()*7);tower(x,T-17,w,15,1);return w+1});
run(T-8,B+8,y=>{const d=14+Math.floor(rn()*6);tower(Rr+2,y,15,d,4);return d+1});
run(L-6,Rr+20,x=>{const w=14+Math.floor(rn()*6);tower(x,B+2,w,14,3);return w+1});
bx(L-4,B-8,0,3,2,6,pick(["#d32f2f","#1e88e5"]),2);bx(L-4.2,B-7.5,3,.2,1,2,"#e3f2fd",2)}
else{run(Y0,Y1,y=>{if(rn()<trd){tree(L-40,y+3,2);return 8}const d=11+Math.floor(rn()*4);house(L-36-14,y+1,13,d,2);return d+3});
bx(L-6,T-6,0,Rr-L+18,1,3,"#4f7d3a",1);run(L-6,Rr+20,x=>{if(rn()<trd){tree(x+3,T-12,1);return 8}house(x,T-20,13,12,1);return 16});
bx(Rr+3,T-6,0,1,B-T+12,3,"#4f7d3a",4);house(Rr+7,T+2,12,13,4);tree(Rr+10,B-4,4);
bx(L-6,B+3,0,Rr-L+12,1,3,"#4f7d3a",3);tree(L+8,B+9,3);tree(Rr-6,B+10,3);bx(L-3,B-6,0,1,1,4,"#c62828",2)}
if(vv%2)for(let i=0;i<4;i++)gr(L-26,B+8+i*2.2,16,1.2,"#f0f0f0");pr(L-38,T+6,2);pr(L-38,B-10,2);if(city&&trd>.3){tree(L-4,T-14,2)}
bx(L-8,T+2,0,1,1,28,"#8a8a8a",2);bx(L-8,T-1,24,1,7,1,"#6d6d6d",2);bx(L-3,9,0,1.5,1,3,"#3e2723",2);bx(L-3.1,9.2,1,.2,.6,1.6,"#ffcc80",2)}
else{/* ビル中：共用廊下と他のテナント */
const f1=city?"#3a3a44":"#d9d4cb",f2=city?"#33333c":"#cfc9be";gr(L-13,Y0,13,Y1-Y0,f1);for(let y=Y0;y<Y1;y+=6)gr(L-13,y,13,3,f2);
const wc=city?"#4a4458":"#c9c2b8",sg=city?["#ff4fa3","#40c4ff","#ffd54f","#b388ff"]:["#43a047","#1e88e5","#f48fb1","#ff9800"];
let ev=0;run(Y0,Y1,y=>{const d=16;bx(L-28,y,0,15,d-.5,13,wc,2);if(!ev&&y>T-10){ev=1;bx(L-13.5,y+4,0,.5,7,10,"#90a4ae",2);bx(L-13.6,y+7.3,0,.6,.4,10,"#607d8b",2);bx(L-13.6,y+6.5,10.5,.6,2,1,"#ff7043",2)}else{bx(L-13.5,y+5,0,.5,5,8,city?"#5c6bc0":"#a7c7e7",2);bx(L-13.7,y+3,9,.7,9,2.5,pick(sg),2)}return d});
bx(L-13,T-15,0,Rr-L+28,14,13,wc,1);run(L-10,Rr+14,x=>{bx(x+3,T-1.5,3,8,.5,5,city?"#283593":"#e3f2fd",1);bx(x+3,T-1.7,9,8,.7,2,pick(sg),1);return 18});
bx(Rr+1,T-15,0,14,B-T+30,13,wc,4);bx(L-13,B+1,0,Rr-L+28,14,13,wc,3);if(city)run(L-30,Rr+30,x=>{const w=14+Math.floor(rn()*7);tower(x,T-34,w,16,1);return w+1});else run(L-30,Rr+30,x=>{if(rn()<trd){tree(x+3,T-22,1);return 8}house(x,T-32,13,12,1);return 16});
bx(L-4,T+3,0,2,2,2,"#8d6e63",2);bx(L-4.5,T+2.5,2,3,3,3,"#4caf50",2);bx(L-3,9,0,1.5,1,3,"#3e2723",2);bx(L-3.1,9.2,1,.2,.6,1.6,city?"#ff4fa3":"#ffcc80",2);bx(L-1.5,B-5,4,.4,1,1.5,"#d32f2f",2)}}
function dvb(b,k){const o=P3(b.x,b.y,b.z,k),EX=[k.exx*b.w,k.exy*b.w],EY=[k.eyx*b.d,k.eyy*b.d],EZ=[0,k.ezy*b.h],i=k.cx>0?1:0,j=k.cy>0?1:0;
const q=(p,u,v)=>[[p[0],p[1]],[p[0]+u[0],p[1]+u[1]],[p[0]+u[0]+v[0],p[1]+u[1]+v[1]],[p[0]+v[0],p[1]+v[1]]];
const a=[o[0]+i*EX[0],o[1]+i*EX[1]],bb=[o[0]+j*EY[0],o[1]+j*EY[1]],fA=q(a,EY,EZ),fB=q(bb,EX,EZ),fT=q([o[0]+EZ[0],o[1]+EZ[1]],EX,EY);poly(fA,col(b.c,.62));poly(fB,col(b.c,.82));poly(fT,col(b.c,1));
if(WG){WG.globalCompositeOperation="destination-out";[fA,fB,fT].forEach(pp=>polyOn(WG,pp,"#000"));WG.globalCompositeOperation="source-over"}
if(!b.win)return;const W=(fx,fy,u,ax)=>{for(let zz=2;zz+2<=b.h-1;zz+=3.5)for(let s=1.2;s+1.4<=u-1;s+=3){const on=b.win.startsWith("lit")&&(Math.floor(s)*7+Math.floor(zz)*13+Math.floor(b.x+b.y))%5<(+b.win.slice(3)||2),lit=b.win.startsWith("lit")?(on?"#ffe9a8":"#4f5d6e"):b.win;
const p=ax?[[fx,b.y+s],[fx,b.y+s+1.4]]:[[b.x+s,fy],[b.x+s+1.4,fy]],pp=[P3(p[0][0],p[0][1],b.z+zz,k),P3(p[1][0],p[1][1],b.z+zz,k),P3(p[1][0],p[1][1],b.z+zz+2,k),P3(p[0][0],p[0][1],b.z+zz+2,k)];poly(pp,lit);
if(WG&&on&&((Math.imul(Math.floor(s*7)+Math.floor(zz*13)*31+Math.floor(b.x*3+b.y*5)*97,2654435761)>>>0)%1000)/1000<LTN.lit)polyOn(WG,pp,"#ffd98a")}};
W(b.x+i*b.w,0,b.d,1);W(0,b.y+j*b.d,b.w,0)}
function polyOn(g,p,c){g.fillStyle=c;g.beginPath();g.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)g.lineTo(p[i][0],p[i][1]);g.closePath();g.fill()}
/* 時刻で外の明るさを変える（hourは開店18時〜翌3時なら18〜27） */
const LKF=[[4,"#191c2c","#0b0e1e",.72,.8,.3],[5.5,"#3a3550","#2a2440",.5,.5,.3],[6.5,"#e8cdb4","#ffb27a",.22,.1,.2],[9,"#e6dccf","#ffffff",0,0,1],[16.5,"#e6dccf","#ffffff",0,0,1],[18,"#e8b98f","#ff8a3d",.28,.5,.6],[19.5,"#2c3150","#141a35",.62,1,1],[23,"#2c3150","#141a35",.62,1,1],[25,"#181b2c","#0b0e1e",.72,.9,.35],[28,"#191c2c","#0b0e1e",.72,.8,.3]];
const hx2=(c)=>[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)],mixc=(a,b,t)=>{const A=hx2(a),B=hx2(b);return"#"+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,"0")).join("")};
function lightAt(h){h=((h%24)+24)%24;if(h<4)h+=24;let i=0;while(i<LKF.length-2&&LKF[i+1][0]<=h)i++;const a=LKF[i],b=LKF[i+1],t=Math.max(0,Math.min(1,(h-a[0])/((b[0]-a[0])||1)));
return{bg:mixc(a[1],b[1],t),ov:mixc(a[2],b[2],t),oa:a[3]+(b[3]-a[3])*t,glow:a[4]+(b[4]-a[4])*t,lit:a[5]+(b[5]-a[5])*t}}
let WG=null,LTN={lit:1},SCW=null;
let SCV=null;
function drawScn(k){const main=cx,L=lightAt((R.phase==="run"?R.t:G.open*60)/60);LTN=L;cx.fillStyle=L.bg;cx.fillRect(0,0,W,CH);WG=null;
if(typeof document!=="undefined"&&document.createElement){if(!SCV)SCV=document.createElement("canvas");if(!SCW)SCW=document.createElement("canvas");for(const c of[SCV,SCW])if(c.width!==cv.width||c.height!==cv.height){c.width=cv.width;c.height=cv.height}
const c2=SCV.getContext&&SCV.getContext("2d");if(c2){cx=c2;cx.setTransform(dpr,0,0,dpr,0,0);cx.clearRect(0,0,W,CH)}
if(c2&&L.glow>.02&&SCW.getContext){WG=SCW.getContext("2d");WG.setTransform(dpr,0,0,dpr,0,0);WG.clearRect(0,0,W,CH)}}
try{drawScn0(k)}finally{if(cx!==main){const c2=cx;if(L.oa>0){c2.globalCompositeOperation="source-atop";c2.globalAlpha=L.oa;c2.fillStyle=L.ov;c2.fillRect(0,0,W,CH);c2.globalAlpha=1;c2.globalCompositeOperation="source-over"}
cx=main;cx.save();cx.setTransform(1,0,0,1,0,0);cx.globalAlpha=(typeof scnA==="function"?scnA():SCA);cx.drawImage(SCV,0,0);if(WG){cx.globalAlpha=Math.min(1,L.glow);cx.drawImage(SCW,0,0)}cx.restore()}WG=null}}
function drawScn0(k){const ext=k.s*200;cx.fillStyle=GRD.base||"#8d8d8d";cx.fillRect(-ext,-ext,ext*3,ext*3);
GRD.forEach(g=>poly([P3(g.x,g.y,0,k),P3(g.x+g.w,g.y,0,k),P3(g.x+g.w,g.y+g.d,0,k),P3(g.x,g.y+g.d,0,k)],g.c));
SCN.filter(b=>wallVis(b.t,k)).map(b=>({b,d:(b.x+b.w/2)*k.cx+(b.y+b.d/2)*k.cy+(b.z+b.h/2)*k.cz})).sort((p,q)=>p.d-q.d).forEach(o=>dvb(o.b,k))}
/* ===== エジプト風シーシャ台（細かいボクセルを一度だけ絵にして使い回す） ===== */
const HKS=.27,HKV=(()=>{const PROF=[[0,3.9],[.03,3.9],[.07,3.4],[.12,2.6],[.2,1.95],[.425,1.95],[.43,2.1],[.44,2.1],[.445,1.9],[.49,1.9],[.5,2.05],[.52,2.05],[.54,1],[.57,1],[.59,1.1],[.61,1.3],[.64,1.3],[.66,1.6],[.69,1.6],[.7,1],[.72,1.2],[.745,1.2],[.76,.9],[.79,.9],[.805,1.15],[.82,1.15],[.835,1.7],[.86,1.9],[.865,3.5],[.9,4.8],[.915,4.8],[.92,.9],[.94,.9],[.95,.8],[1,.75]],
BOWL=[1.3,1.8,2.3,2.7,3,3],GOLD="#d9a441",BLK="#1d2224",TINT="#a9d8e8",CLR="#e4f1f4",ZM=[0,BLK,GOLD,GOLD,"m",GOLD,0,0,BLK,BLK,BLK,GOLD,BLK,"L","L"],N=20,C=10,H=36,
prof=t=>{for(let q=1;q<PROF.length;q++)if(t<=PROF[q][0]){const a=PROF[q-1],b=PROF[q];return a[1]+(b[1]-a[1])*(t-a[0])/((b[0]-a[0])||1)}return .75},m=new Map(),put=(i,j,z,c)=>m.set(i+","+j+","+z,[i,j,z,c]);
const rz=[];for(let z=0;z<H;z++)rz.push(prof((z+.5)/H));
for(let z=0;z<H;z++){const r=rz[z],inn=Math.max(0,Math.min(rz[Math.max(0,z-1)],r,rz[Math.min(H-1,z+1)])-1.15);for(let i=0;i<N;i++)for(let j=0;j<N;j++){const dx=i+.5-C,dy=j+.5-C,d=Math.hypot(dx,dy);if(d>r||d<=inn)continue;const th=Math.atan2(dy,dx);let c;
if(z<15){const v=ZM[z];c=v===0?(z<8?TINT:CLR):v;if(v==="m"){const u=(th+Math.PI)/(2*Math.PI)*8,f=u%1;c=f>.3&&f<.7?["#2f6fb0","#e0b030","#b3262e","#2f8f6b"][Math.floor(u)%4]:(z<8?TINT:CLR)}if(v==="L")c=Math.abs(th-Math.PI/2)<.55?"#b3262e":BLK}
else if(z===15)c=GOLD;else c=z%3?"#c9ced4":"#e8ebee";put(i,j,z,c)}}
const seg=(pts,col)=>{for(let q=1;q<pts.length;q++){const a=pts[q-1],b=pts[q],n=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2])/.35);for(let s=0;s<=n;s++){const f=s/n,x=a[0]+(b[0]-a[0])*f,y=a[1]+(b[1]-a[1])*f,z=Math.max(0,a[2]+(b[2]-a[2])*f);put(Math.floor(C+x),Math.floor(C+y),Math.floor(z),col);put(Math.floor(C+x),Math.floor(C+y)-1,Math.floor(z),col)}}};
seg([[-1.6,0,19.5],[-2.6,0,20.4],[-3.4,0,21.3]],"#d1a23c");seg([[1.6,0,18.5],[2.4,0,19.0],[3.0,0,19.7],[3.3,0,20.5]],"#c9ced4");
for(let k=0;k<7;k++){const z=H+k,r=k<6?BOWL[k]:3,inn=k<6?Math.max(0,Math.min(BOWL[Math.max(0,k-1)],BOWL[k])-1.15):0;for(let i=0;i<N;i++)for(let j=0;j<N;j++){const d=Math.hypot(i+.5-C,j+.5-C);if(d>r||d<=inn)continue;put(i,j,z,k<6?(k===5?"#8f4f1a":"#b5651d"):d<=1.6?((i+j)%2?"#ff7a1a":"#ffb02e"):"#c8ccd0")}}
const r0=[...m.values()].map(([i,j,z,c])=>[(j-C)*HKS,(i-C)*HKS,z*HKS,c,undefined,HKS]);return{0:r0,2:r0.map(v=>[-v[0]-HKS,-v[1]-HKS,v[2],v[3],undefined,HKS])}})();
HKV[1]=HKV[0].map(v=>[v[1],-v[0]-HKS,v[2],v[3],undefined,HKS]);HKV[3]=HKV[0].map(v=>[-v[1]-HKS,v[0],v[2],v[3],undefined,HKS]);
const HKC=new Map();
function hkSprite(k,rot){if(typeof document==="undefined"||!document.createElement)return null;const key=[k.s.toFixed(3),k.rx.toFixed(4),k.ry.toFixed(4),k.ux.toFixed(4),k.uy.toFixed(4),k.uz.toFixed(4),rot,dpr].join();let sp=HKC.get(key);if(sp)return sp;
const c2=document.createElement("canvas");if(!c2.getContext)return null;const g=c2.getContext("2d");if(!g)return null;if(HKC.size>12)HKC.clear();
const d=(x,y,z)=>[k.s*(x*k.rx+y*k.ry),-k.s*(x*k.ux+y*k.uy+z*k.uz)];let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(const x of[-1.6,1.6])for(const y of[-1.6,1.6])for(const z of[0,12.2]){const p=d(x,y,z);x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1])}
const w=x1-x0+6,h=y1-y0+6,ax=-x0+3,ay=-y0+3;c2.width=Math.ceil(w*dpr);c2.height=Math.ceil(h*dpr);g.setTransform(dpr,0,0,dpr,0,0);
const k2=Object.assign({},k,{ox:ax+k.s*(TX*k.rx+TY*k.ry),oy:ay-k.s*(TX*k.ux+TY*k.uy+TZ*k.uz)}),oc=cx;cx=g;try{HKV[rot].map(v=>({v,d:dep(v,k2)})).sort((p,q)=>p.d-q.d).forEach(o=>dv(o.v,k2))}finally{cx=oc}
sp={c:c2,w,h,ax,ay};HKC.set(key,sp);return sp}
/* 台の位置：右手側の斜め前。向かい側の席は反対側。シェアは2人の真ん中 */
function hkCenter(p){const s=p.seat;if(s.kind==="c")return{x:s.px+2,y:s.f>0?s.Y0+8.6:s.Y0-2.6,rot:s.f>0?0:2,z:7,sc:.7};let o;if(p.sh){const A=p.sh.a.seat,B=p.sh.b.seat,f=A.f;o={x:(A.px+B.px)/2+2,y:f>0?A.Y0+8.3:A.Y0-2.3,rot:f>0?0:2}}
else o=s.f>0?{x:s.px+3.5,y:s.Y0+8.3,rot:0}:{x:s.px+.5,y:s.Y0-2.3,rot:2};if(s.kind==="b"){o.z=3;o.sc=.7}return o}
const shHolder=sh=>{const h=sh.cur?sh.b:sh.a,o=sh.cur?sh.a:sh.b;return h.st==="sit"?h:o.st==="sit"?o:null};
function hdOf(p){if(p.st!=="sit")return 0;if(p.adj)return 0;if(!p.sh&&p.rest)return 0;if(p.sh){if(shHolder(p.sh)!==p)return 0;return p===p.sh.a?1:2}return p.seat.f>0?1:2}
const kSc=(k,f)=>f&&f!==1?Object.assign({},k,{s:k.s*f,exx:k.exx*f,exy:k.exy*f,eyx:k.eyx*f,eyy:k.eyy*f,ezy:k.ezy*f}):k;
function hkPush(a,hc){const sp=null,Z0=hc.z||0,S=hc.sc||1;if(typeof document!=="undefined"&&document.createElement){GLS.push({pos:[hc.x,hc.y,Z0+5.5*S],fn:k=>{const s=hkSprite(kSc(k,S),hc.rot);if(!s){HKV[hc.rot].map(v=>({v:[v[0]*S+hc.x,v[1]*S+hc.y,v[2]*S+Z0,v[3],undefined,(v[5]||1)*S],d:0})).map(o=>(o.d=dep(o.v,k),o)).sort((p,q)=>p.d-q.d).forEach(o=>dv(o.v,k));return}const P0=P3(hc.x,hc.y,Z0,k);cx.drawImage(s.c,P0[0]-s.ax,P0[1]-s.ay,s.w,s.h)}})}
else HKV[hc.rot].forEach(v=>a.push([v[0]*S+hc.x,v[1]*S+hc.y,v[2]*S+Z0,v[3],undefined,(v[5]||1)*S]))}
/* ホース：台のポートから垂れて、手に持った吸い口の根元へ */
function hosePush(a,p,hc,hd){const s=p.seat,f=s.f,S=hc.sc||1,pq=hc.rot===0?[.13,-.92]:hc.rot===2?[.13,.92]:hc.rot===1?[-.92,-.13]:[.92,.13],A=[hc.x+pq[0]*S,hc.y+pq[1]*S,(hc.z||0)+5.75*S],lx=hd===2?4-3.7-.5:3.7,P0=(q=>s.o?[...sRot(s,q[0],q[1]),q[2]]:q)([s.px+lx+.25,(f>0?s.Y0+5.6:s.Y0+6-5.6-.5)+.25,7.25-seatZo(s)]),Cc=[(A[0]+P0[0])/2,(A[1]+P0[1])/2,hc.z?Math.min(A[2],P0[2])-1.5:1.2];
for(let i=0;i<=22;i++){const t=i/22,u=1-t,x=u*u*A[0]+2*u*t*Cc[0]+t*t*P0[0],y=u*u*A[1]+2*u*t*Cc[1]+t*t*P0[1],z=u*u*A[2]+2*u*t*Cc[2]+t*t*P0[2];a.push([x-.18,y-.18,z-.18,(i>>1)%2?"#2b2b2b":"#a1262d",undefined,.36])}}
/* ===== 客席の見た目：ソファ（1/2/3人）・ボックス席・カウンター席・ビーズクッション ===== */
const seatZo=s=>s&&s.kind==="bb"?1:0;
/* 家具1つ分のボクセル（ワールド座標）。M は (x:左右, y:背もたれからの奥行き) → ワールド */
function furnVox(F,ox,oy){const out=new Map(),Z=(x,y,z,c)=>{const k=x+","+y+","+z;out.set(k,[x,y,z,c])};
const tx=ox!==undefined?ox:F.tx,ty=oy!==undefined?oy:F.ty,v=seatSer(F);
const sofa=(n,X0,Y0,f,w)=>{const L=6*n,M=(x,y)=>[X0+x,f>0?Y0+y:Y0+5-y],B=(x,y,z,c)=>{const m=M(x,y);Z(m[0],m[1],z,c)},bh=v.back==="high"?6:v.back==="low"?3:4;
 for(let x=0;x<L;x++)for(let y=0;y<4;y++){if(v.leg){if((x===0||x===L-1)&&(y===0||y===3))B(x,y,0,v.leg);else if(y===3&&v.pip)B(x,y,0,v.pip)}else B(x,y,0,v.fr);B(x,y,1,y===0||x===0||x===L-1?v.fr:(y===3&&v.pip?v.pip:(x%6===0?v.fr:v.cu)))}
 for(let x=0;x<L;x++)for(let z=2;z<2+bh;z++)B(x,0,z,v.back==="tuft"&&x%3===1&&(z===3||z===5)?v.pip||v.fr:v.bk);
 if(v.back==="round")for(let x=0;x<L;x++){const h=Math.round(Math.sin((x+.5)/L*Math.PI)*2);for(let z=0;z<h;z++)B(x,0,2+bh+z,v.bk)}
 if(v.arm!=="none")for(const x of[0,L-1])for(let y=1;y<4;y++){B(x,y,2,v.fr);B(x,y,3,v.fr);if(v.arm==="rd"&&y>1)B(x,y,4,v.fr)}};
if(F.k==="s"||F.k==="l"||F.k==="t")sofa(SDEF[F.k].n,tx*6,ty*6,F.f);
else if(F.k==="b"){const bk=F.f>0?ty:ty+2,fr=F.f>0?ty+2:ty,fb=F.f>0?1:-1;sofa(3,tx*6,bk*6,fb);sofa(2,tx*6,fr*6,-fb);
 for(let x=tx*6+2;x<tx*6+16;x++)for(let y=(ty+1)*6+1;y<(ty+1)*6+5;y++)Z(x,y,2,v.tb);for(const x of[tx*6+4,tx*6+13])for(let z=0;z<2;z++)Z(x,(ty+1)*6+3,z,v.tl)}
else if(F.k==="c"){const f=F.f,Y0=ty*6,M=(x,y)=>[tx*6+x,f>0?Y0+y:Y0+5-y];const B=(x,y,z,c)=>{const m=M(x,y);Z(m[0],m[1],z,c)};
 for(let i=0;i<3;i++){const x0=i*6+1;if(v.cst==="round"){B(x0+1,2,0,v.csl);B(x0+2,2,0,v.csl);for(let x=x0;x<x0+4;x++)for(let y=1;y<4;y++)B(x,y,1,v.css)}
  else{for(const[x,y]of[[x0,1],[x0+3,1],[x0,3],[x0+3,3]])B(x,y,0,v.csl);for(let x=x0;x<x0+4;x++){for(let y=1;y<4;y++)B(x,y,1,v.css);for(let z=2;z<5;z++)B(x,0,z,v.css)}}}
 for(let x=0;x<18;x++){for(let y=8;y<12;y++)for(let z=0;z<6;z++)B(x,y,z,z===5&&v.ctrim&&y===8?v.ctrim:v.cbd);for(let y=7;y<12;y++)B(x,y,6,v.ctop)}}
else if(F.k==="bb"){const f=F.f,X0=tx*6+1,Y0=ty*6,C=v.c,CL=v.cl,CD=v.cd,rw=v.big?3.8:3.3,rd=v.big?4:3.6;
 for(let x=-2;x<7;x++)for(let y=-2;y<7;y++){const dx=(x+.5-2)/rw,dy=(y+.5-1.8)/rd,r=v.sq?Math.max(Math.abs(dx),Math.abs(dy))**2:dx*dx+dy*dy;if(r>1)continue;const back=Math.max(0,(1.2-(y+.5))/4.2),side=Math.abs(x+.5-2)>1.9?.55:0,hmax=1.4+Math.max(back*(v.tall||6),side*3.4),h=Math.round(hmax*Math.sqrt(1-Math.min(r,.99))+.6);
  for(let z=0;z<h;z++){if(x>=0&&x<=3&&y>=0&&y<=4&&z>=1)continue;let col=z===h-1?CL:(x*3+y+z)%4?C:CD;if(v.pat==="dot"&&(x+y*2+z*3)%5===0)col=v.p;if(v.pat==="stripe"&&z%2===0)col=v.p;Z(X0+x,f>0?Y0+y:Y0+5-y,z,col)}}}
return[...out.values()]}
function furnDraw(a){(G.furn||[]).forEach(F=>furnVox(F).forEach(v=>a.push(v)))}
/* 空いているビーズクッションはふっくら（くぼみを埋める） */
function bbFill(a){SEATS.forEach(s=>{if(s.kind!=="bb"||s.p||(OW.sitting&&OW.seat===s))return;const F=G.furn[s.fid];if(!F)return;const v=seatSer(F);for(let x=0;x<4;x++)for(let y=0;y<5;y++)for(let z=1;z<3;z++){const w=[s.px+x,s.f>0?s.Y0+y:s.Y0+5-y,z,z===2?v.cl:v.c];if(s.o)sRotV([w],s);a.push(w)}})}
/* ビーズクッション：体を1段下げ、脚を前に伸ばす */
function seatPose(t,s,c){if(!s||s.kind!=="bb")return;const keep=t.filter(v=>v[2]>=4);t.length=0;keep.forEach(v=>{v[2]-=1;t.push(v)});
const SH=c.shoe||"#2b2b2b",PA=c.pants||"#3b3b4a",BT=c.bot|0,SK=c.skin;for(const x of[1,2]){for(let y=0;y<6;y++){const yy=s.f>0?s.Y0+y:s.Y0+5-y;t.push([s.px+x,yy,2,(BT===1&&y>=3)||(BT===2&&y>=2)?SK:PA])}for(const z of[2,3])t.push([s.px+x,s.f>0?s.Y0+6:s.Y0-1,z,SH])}}
/* 一覧用の小さな絵 */
const FIC={};
function furnIcon(kd,sr){const k0=kd,key=kd+"|"+sr;if(FIC[key]!==undefined)return FIC[key];if(typeof document==="undefined"||!document.createElement)return "";
const F={k:k0,sr,tx:0,ty:0,f:1},vx=furnVox(F,0,0);if(!vx.length)return FIC[key]="";let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9,z1=0;vx.forEach(v=>{x0=Math.min(x0,v[0]);x1=Math.max(x1,v[0]+1);y0=Math.min(y0,v[1]);y1=Math.max(y1,v[1]+1);z1=Math.max(z1,v[2]+1)});
const yaw=-.6,pit=.6,cp=Math.cos(pit),sp=Math.sin(pit),sa=Math.sin(yaw),ca=Math.cos(yaw),span=Math.max(x1-x0,y1-y0,z1*1.2),S=Math.min(5.6,44/span),Wd=56,Hd=56,c2=document.createElement("canvas");c2.width=Wd*2;c2.height=Hd*2;const g=c2.getContext&&c2.getContext("2d");if(!g)return "";g.setTransform(2,0,0,2,0,0);
const k={cx:-cp*sa,cy:cp*ca,cz:sp,rx:ca,ry:sa,ux:sa*sp,uy:-ca*sp,uz:cp,s:S,exx:S*ca,exy:-S*sa*sp,eyx:S*sa,eyy:S*ca*sp,ezy:-S*cp},mx=(x0+x1)/2,my=(y0+y1)/2,mz=z1/2;
k.ox=Wd/2+k.s*((TX-mx)*k.rx+(TY-my)*k.ry);k.oy=Hd/2-k.s*((TX-mx)*k.ux+(TY-my)*k.uy+(TZ-mz)*k.uz);
const oc=cx;cx=g;try{vx.map(v=>({v,d:dep(v,k)})).sort((p,q)=>p.d-q.d).forEach(o=>dv(o.v,k))}finally{cx=oc}
try{return FIC[key]=c2.toDataURL()}catch(e){return FIC[key]=""}}
/* ===== 装飾：細かいボクセル（0.5）を高さ1ごとの板に分けて絵にして使い回す ===== */
const DVX={};
function decVox(id,r){r=(r||0)&3;const ck=id+"|"+r;if(DVX[ck])return DVX[ck];const d=DMD[id]||(String(id).startsWith("gf_")?["e8505b,f7d046","VQAAVQEAVQIAVQMAVQQAVQUAVQYAVgAAVgEAVgIAVgMAVgQAVgUAVgYAVwABVwEBVwIBVwMBVwQBVwUBVwYBWAABWAEBWAIBWAMBWAQBWAUBWAYBWQAAWQEAWQIAWQMAWQQAWQUAWQYAWgAAWgEAWgIAWgMAWgQAWgUAWgYAZQAAZQEAZQIAZQMAZQQAZQUAZQYAZgAAZgYAZwABZwYBaAABaAYBaQAAaQYAagAAagEAagIAagMAagQAagUAagYAdQABdQEBdQIBdQMBdQQBdQUBdQYBdgABdgYBdwABdwYBeAABeAYBeQABeQYBegABegEBegIBegMBegQBegUBegYBhQABhQEBhQIBhQMBhQQBhQUBhQYBhgABhgYBhwABhwYBiAABiAYBiQABiQYBigABigEBigIBigMBigQBigUBigYBlQAAlQEAlQIAlQMAlQQAlQUAlQYAlgAAlgYAlwABlwYBmAABmAYBmQAAmQYAmgAAmgEAmgIAmgMAmgQAmgUAmgYApQAApQEApQIApQMApQQApQUApQYApgAApgEApgIApgMApgQApgUApgYApwABpwEBpwIBpwMBpwQBpwUBpwYBqAABqAEBqAIBqAMBqAQBqAUBqAYBqQAAqQEAqQIAqQMAqQQAqQUAqQYAqgAAqgEAqgIAqgMAqgQAqgUAqgYAdgcBhgcBZwcBaAcBeQcBiQcBlwcBmAcBdwcBiAcB"]:null);if(!d)return null;const pal=d[0].split(",").map(c=>"#"+c),bin=typeof atob==="function"?atob(d[1]):Buffer.from(d[1],"base64").toString("binary"),sl=new Map();
for(let i=0;i+2<bin.length;i+=3){const a=bin.charCodeAt(i),z=bin.charCodeAt(i+1),c=pal[bin.charCodeAt(i+2)],x0=((a>>4)-2)*.5,y0=((a&15)-2)*.5,x=r===1?5.5-y0:r===2?5.5-x0:r===3?y0:x0,y=r===1?x0:r===2?5.5-y0:r===3?5.5-x0:y0,zz=z*.5,si=Math.floor(zz);if(!sl.has(si))sl.set(si,[]);sl.get(si).push([x,y,zz,c,undefined,.5])}
const L=[...sl.entries()].sort((p,q)=>p[0]-q[0]).map(([si,v])=>{let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;v.forEach(o=>{x0=Math.min(x0,o[0]);x1=Math.max(x1,o[0]+.5);y0=Math.min(y0,o[1]);y1=Math.max(y1,o[1]+.5)});return{si,v,bb:[x0,x1,y0,y1,si,si+1],cx:(x0+x1)/2,cy:(y0+y1)/2}});
return DVX[ck]=L}
const DSC=new Map();
function decSprite(id,s,k,r){if(typeof document==="undefined"||!document.createElement)return null;const ck=[k.s.toFixed(3),k.rx.toFixed(4),k.ry.toFixed(4),k.ux.toFixed(4),k.uy.toFixed(4),k.uz.toFixed(4),dpr].join(),key=id+"|"+(r||0)+"|"+s.si+"|"+ck;let sp=DSC.get(key);if(sp)return sp;
const c2=document.createElement("canvas");if(!c2.getContext)return null;const g=c2.getContext("2d");if(!g)return null;if(DSC.size>900)DSC.clear();
const d=(x,y,z)=>[k.s*(x*k.rx+y*k.ry),-k.s*(x*k.ux+y*k.uy+z*k.uz)],b=s.bb;let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(const x of[b[0],b[1]])for(const y of[b[2],b[3]])for(const z of[b[4],b[5]]){const p=d(x,y,z);x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1])}
const w=x1-x0+4,h=y1-y0+4,ax=-x0+2,ay=-y0+2;c2.width=Math.max(1,Math.ceil(w*dpr));c2.height=Math.max(1,Math.ceil(h*dpr));g.setTransform(dpr,0,0,dpr,0,0);
const k2=Object.assign({},k,{ox:ax+k.s*(TX*k.rx+TY*k.ry),oy:ay-k.s*(TX*k.ux+TY*k.uy+TZ*k.uz)}),oc=cx;cx=g;try{s.v.map(v=>({v,d:dep(v,k)})).sort((p,q)=>p.d-q.d).forEach(o=>dv(o.v,k2))}finally{cx=oc}
sp={c:c2,w,h,ax,ay};DSC.set(key,sp);return sp}
/* 店内の装飾を描画リストへ（板ごとに奥行きで並べる） */
function decPush(L,k){(G.decor||[]).forEach(dd=>{const ox=dd.tx*6,oy=dd.ty*6,sl=decVox(dd.id,dd.r);if(!sl)return;sl.forEach(s=>{L.push({v:{fn:k=>{const sp=decSprite(dd.id,s,k,dd.r);if(!sp){s.v.map(v=>[v[0]+ox,v[1]+oy,v[2],v[3],undefined,.5]).map(v=>({v,d:dep(v,k)})).sort((p,q)=>p.d-q.d).forEach(o=>dv(o.v,k));return}const P0=P3(ox,oy,0,k);cx.drawImage(sp.c,P0[0]-sp.ax,P0[1]-sp.ay,sp.w,sp.h)}},d:(ox+s.cx)*k.cx+(oy+s.cy)*k.cy+(s.si+.5)*k.cz})})})}
/* 一覧用の小さな絵（固定の向きで1回だけ作る） */
const DIC={};
function decIcon(id){if(DIC[id])return DIC[id];if(typeof document==="undefined"||!document.createElement)return "";const sl=decVox(id);if(!sl)return "";const yaw=-.6,pit=.6,cp=Math.cos(pit),sp=Math.sin(pit),sa=Math.sin(yaw),ca=Math.cos(yaw),S=5.6,
k={cx:-cp*sa,cy:cp*ca,cz:sp,rx:ca,ry:sa,ux:sa*sp,uy:-ca*sp,uz:cp,s:S,exx:S*ca,exy:-S*sa*sp,eyx:S*sa,eyy:S*ca*sp,ezy:-S*cp},Wd=56,Hd=56,c2=document.createElement("canvas");c2.width=Wd*2;c2.height=Hd*2;const g=c2.getContext&&c2.getContext("2d");if(!g)return "";g.setTransform(2,0,0,2,0,0);
let zt=0;sl.forEach(s=>zt=Math.max(zt,s.si+1));const sc=Math.min(1,8.5/Math.max(6,zt));const k2=Object.assign({},k,{s:S*sc,exx:k.exx*sc,exy:k.exy*sc,eyx:k.eyx*sc,eyy:k.eyy*sc,ezy:k.ezy*sc});
const P=(x,y,z)=>[k2.s*((x-3)*k2.rx+(y-3)*k2.ry),-k2.s*((x-3)*k2.ux+(y-3)*k2.uy+(z-zt/2)*k2.uz)];k2.ox=Wd/2+k2.s*(TX*k2.rx+TY*k2.ry)-k2.s*(3*k2.rx+3*k2.ry);k2.oy=Hd/2-k2.s*(TX*k2.ux+TY*k2.uy+TZ*k2.uz)+k2.s*(3*k2.ux+3*k2.uy+zt/2*k2.uz);
const all=[];sl.forEach(s=>s.v.forEach(v=>all.push(v)));const oc=cx;cx=g;try{all.map(v=>({v,d:dep(v,k2)})).sort((p,q)=>p.d-q.d).forEach(o=>dv(o.v,k2))}finally{cx=oc}
try{return DIC[id]=c2.toDataURL()}catch(e){return ""}}
/* ===== 空いている手でやること：スマホ・本・ゲーム機・ノートPC・ハンドスピナー・ポテチ =====
   標準形：ホースは右手(x=3)、空いた手は左(x=0)。左手持ちの席は左右反転。吸っていない時は両手 */
const ACTW={phone:4,book:1.2,game:1.2,pc:1,spin:.7,chips:.9,none:2.2},TWOH={phone:1,book:1,game:1,pc:1};
const AI={
phone:{h:[[.4,3.5,6.1]],b:[[.5,4.0,6.3,.9,.2,1.5,"#222222"],[.6,3.85,6.45,.7,.15,1.2,"#7fd4ff"]]},
book:{h:[[.3,3.7,5.9]],b:[[-.6,4.1,5.9,1.3,.2,1.7,"#2c4a8a"],[.7,4.1,5.9,1.3,.2,1.7,"#2c4a8a"],[-.5,3.95,6.0,1.15,.15,1.5,"#f7f1e1"],[.75,3.95,6.0,1.15,.15,1.5,"#efe6cf"],[-.4,4.3,7.1,.9,.05,.15,"#d4af37"],[.85,4.3,7.1,.9,.05,.15,"#d4af37"]]},
game:{h:[[.3,3.6,5.8]],b:[[.75,3.85,6.0,1.1,.12,.8,"#3a3a3a"],[.4,3.7,6.0,.35,.3,.8,"#e53935"],[1.85,3.7,6.0,.35,.3,.8,"#1e88e5"],[.8,3.75,6.15,1.0,.1,.5,"#9be7a2"]]},
pc:{h:[[.7,3.2,4.6]],b:[[.2,2.6,4.0,2.8,1.8,.2,"#c0c4c8"],[.2,4.4,4.2,2.8,.2,1.8,"#5a6068"],[.35,4.3,4.35,2.5,.1,1.5,"#9ad0ff"]]},
spin:{h:[[.4,3.7,5.9]],b:[],sp:[.9,4.3,7.0]},
chips:{h:[[1.4,3.3,5.4]],b:[[1.0,2.8,4.0,1.6,1.4,1.3,"#f4c430"],[1.0,4.18,4.5,1.6,.06,.3,"#d32f2f"],[1.5,3.4,6.15,.25,.25,.25,"#f2d16b"]]},
phone2:{h:[[.6,3.8,6.2],[2.7,3.8,6.2]],b:[[.9,4.05,6.3,2.2,.2,1.1,"#222222"],[1.0,3.9,6.4,2.0,.15,.9,"#7fd4ff"]]},
game2:{h:[[.5,3.8,5.9],[2.8,3.8,5.9]],b:[[.85,3.95,6.0,2.3,.12,1.0,"#3a3a3a"],[.4,3.8,6.0,.45,.35,1.0,"#e53935"],[3.15,3.8,6.0,.45,.35,1.0,"#1e88e5"],[1.0,3.85,6.15,2.0,.1,.7,"#9be7a2"]]},
book2:{h:[[0,3.8,6.0],[3.3,3.8,6.0]],b:[[-.3,4.15,5.9,2.3,.2,2.0,"#2c4a8a"],[2.0,4.15,5.9,2.3,.2,2.0,"#2c4a8a"],[-.2,4.0,6.0,2.15,.15,1.8,"#f7f1e1"],[2.05,4.0,6.0,2.15,.15,1.8,"#efe6cf"],[-.1,4.35,7.4,1.9,.05,.15,"#d4af37"],[2.2,4.35,7.4,1.9,.05,.15,"#d4af37"]]},
pc2:{h:[[.9,3.3,4.6],[2.4,3.3,4.6]],b:[[-.1,2.4,4.0,4.0,2.2,.2,"#c0c4c8"],[-.1,4.6,4.2,4.0,.2,2.2,"#5a6068"],[.05,4.5,4.35,3.7,.1,1.9,"#9ad0ff"]]},
burger:{h:[[.8,3.4,6.8]],b:[[.65,3.55,7.15,1.0,.8,.25,"#d9a05b"],[.65,3.55,7.4,1.0,.8,.2,"#5d3a1a"],[.6,3.5,7.6,1.1,.9,.1,"#66bb6a"],[.65,3.55,7.7,1.0,.8,.3,"#e0a85a"]]},
onigiri:{h:[[.8,3.4,6.8]],b:[[.7,3.6,7.15,.9,.5,.9,"#fafafa"],[.8,3.55,7.15,.7,.55,.35,"#1b2a1b"]]},
sand:{h:[[.8,3.4,6.8]],b:[[.65,3.6,7.15,1.0,.25,.9,"#f3e2b8"],[.65,3.85,7.15,1.0,.15,.9,"#e57373"],[.65,4.0,7.15,1.0,.25,.9,"#f3e2b8"]]},
donut:{h:[[.8,3.4,6.8]],b:[[.55,3.6,7.15,1.1,.3,1.1,"#d7a26b"],[.55,3.55,7.2,1.1,.3,1.0,"#f48fb1"],[.9,3.5,7.5,.4,.35,.4,"#8d5a3a"]]},
ice:{h:[[.8,3.4,6.6]],b:[[.9,3.6,6.9,.5,.5,.7,"#d9a05b"],[.75,3.55,7.55,.8,.8,.7,"#fff3e0"],[.9,3.5,8.1,.5,.5,.25,"#f48fb1"]]}};
["burger","onigiri","sand","donut","ice"].forEach(k=>{AI[k].h.forEach(h=>h[2]+=.9);AI[k].b.forEach(b=>b[2]+=.9)});
const FOODN={burger:"ハンバーガー",onigiri:"おにぎり",sand:"サンドイッチ",donut:"ドーナッツ",ice:"アイス"};
function pickAct(c){const w=Object.assign({},ACTW),hb=String(c.hb||""),j=c.job;
if(/ゲーム|game|ポケ|スマブラ|rpg|fps/i.test(hb))w.game*=4;if(/読書|本|小説|漫画|マンガ/.test(hb))w.book*=4;if(/アニメ|推し|声優/.test(hb)){w.phone*=2;w.game*=2}if(/料理|グルメ|食べ|お菓子/.test(hb))w.chips*=3;
if(j==="エンジニア"||j==="フリーランス"||j==="デザイナー")w.pc*=4;if(j==="YouTuber")w.phone*=3;if(j==="会社員")w.pc*=1.8;if(j==="学生"){w.phone*=2;w.game*=2}if(j==="先生")w.book*=2.5;
let t=Object.values(w).reduce((a,b)=>a+b,0),r=Math.random()*t;for(const k in w){r-=w[k];if(r<=0)return k==="none"?null:k}return null}
/* 席の客の空き手アクションの状態を進める（tickから） */
function actTick(p,dm){if(p.actT==null)p.actT=3+Math.random()*12;p.actT-=dm;if(p.actT<=0){p.act=pickAct(p.c);p.actT=40+Math.random()*50}
if(!p.sh){if(p.rT==null)p.rT=6+Math.random()*10;p.rT-=dm;if(p.rT<=0){p.rest=!p.rest;p.rT=p.rest?4+Math.random()*6:8+Math.random()*12}}}
/* 見た目の情報：{k:アイテム名, mir:左右反転, nh:隠す手(1=左,2=右)} */
function actMode(p,hd){const a=p.act;if(!a)return null;if(hd===0&&TWOH[a])return{k:a+"2",mir:0,nh:3};return{k:a,mir:hd===2?1:0,nh:hd===2?2:1}}
function actBuild(t,p,md){const s=p.seat,f=s.f,c=p.c,it=AI[md.k],fo=c.fat===2?1:0,mx=(x,w)=>s.px+(md.mir?4-x-w:x),my=(y,d)=>(y+=fo,f>0?s.Y0+y:s.Y0+6-y-d);
it.h.forEach((h,i)=>{const ax=i===0?-fo:3.1+fo;t.push([mx(ax,.9),my(2.6,.9),5.2,c.shirt,undefined,.9]);t.push([mx(h[0],.7),my(h[1],.7),h[2],c.skin,undefined,.7])});
const bx=it.b.map(b=>({x:mx(b[0],b[3]),y:my(b[1],b[4]),z:b[2],w:b[3],d:b[4],h:b[5],c:b[6]}));let sp=null;if(it.sp){sp=[mx(it.sp[0],0),my(it.sp[1],0),it.sp[2]]}return{bx,sp}}
function actDraw(p,inSpr){const pc=p._pc;if(!pc||!pc.ab)return;const{sp}=pc.ab,bx=inSpr&&typeof document!=="undefined"&&document.createElement?[]:pc.ab.bx;
if(bx.length){const cxm=bx.reduce((a,b)=>a+b.x+b.w/2,0)/bx.length,cym=bx.reduce((a,b)=>a+b.y+b.d/2,0)/bx.length,czm=bx.reduce((a,b)=>a+b.z+b.h/2,0)/bx.length;
GLS.push({pos:[cxm,cym,czm],fn:k=>{bx.map(b=>({b,d:(b.x+b.w/2)*k.cx+(b.y+b.d/2)*k.cy+(b.z+b.h/2)*k.cz})).sort((u,v)=>u.d-v.d).forEach(o=>dvb(o.b,k))}})}
if(sp)GLS.push({pos:sp,fn:k=>{if(p.seat&&k.cy*p.seat.f<-.05)return;const o=P3(sp[0],sp[1],sp[2],k),R=k.s*1.0,r=k.s*.6,ang=performance.now()/1000*9+p.seed;cx.lineWidth=r*1.1;cx.strokeStyle="#c8282f";
for(let i=0;i<3;i++){const t=ang+i*2.094;cx.beginPath();cx.moveTo(o[0],o[1]);cx.lineTo(o[0]+Math.cos(t)*R,o[1]+Math.sin(t)*R*.9);cx.stroke()}
for(let i=0;i<3;i++){const t=ang+i*2.094,x=o[0]+Math.cos(t)*R,y=o[1]+Math.sin(t)*R*.9;cx.fillStyle="#e53935";cx.beginPath();cx.arc(x,y,r,0,7);cx.fill();cx.fillStyle="#3c3c46";cx.beginPath();cx.arc(x,y,r*.45,0,7);cx.fill()}
cx.fillStyle="#d4af37";cx.beginPath();cx.arc(o[0],o[1],r*.75,0,7);cx.fill();cx.lineWidth=1}})}

/* 立っている店主のスマホ（向きdrに合わせて配置） */
function standPhone(t,ox,oy,dr,c,ik){const mp=(x,y,w,d)=>dr===2?[4-x-w,3-y-d,w,d]:dr===1?[y,4-x-w,d,w]:dr===3?[3-y-d,x,d,w]:[x,y,w,d],it=AI[ik||"phone"];
const yo=ik&&ik!=="phone"?-.3:-1,vx=(x,y,z,s,col)=>{const m=mp(x,y,s,s);t.push([ox+m[0],oy+m[1],z,col,undefined,s])};vx(0,2.6,5.2,.9,c.shirt);const h=it.h[0];vx(h[0],h[1]+yo,h[2],.7,c.skin);
const bx=it.b.map(b=>{const m=mp(b[0],b[1]+yo,b[3],b[4]);return{x:ox+m[0],y:oy+m[1],z:b[2],w:m[2],d:m[3],h:b[5],c:b[6]}});return{bx,sp:null}}
