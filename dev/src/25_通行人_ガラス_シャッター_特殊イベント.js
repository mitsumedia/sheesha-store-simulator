/* ===== 通行人の描き方：歩道・車道の上だけを通り、手前の建物や柱にはちゃんと隠れる ===== */
MB.v2=1;
/* 店の両隣（道ぞい）の建物を少し間引いて、通行人を見やすくする */
{const _gs3=genScn;genScn=function(){const r=_gs3.apply(this,arguments);try{const g=mbGeo();for(let i=SCN.length-1;i>=0;i--){const b=SCN[i];if((b.t===1||b.t===3)&&b.x<g.L+20)SCN.splice(i,1)}}catch(e){}return r}}
function mbHull(pts){pts.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);const cr=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]),lo=[],up=[];for(const p of pts){while(lo.length>=2&&cr(lo[lo.length-2],lo[lo.length-1],p)<=0)lo.pop();lo.push(p)}for(let i=pts.length-1;i>=0;i--){const p=pts[i];while(up.length>=2&&cr(up[up.length-2],up[up.length-1],p)<=0)up.pop();up.push(p)}up.pop();lo.pop();return lo.concat(up)}
const MBO={key:"",list:[]};
function mbOcc(k,g){const key=[k.s.toFixed(3),k.rx.toFixed(4),k.ry.toFixed(4),k.ux.toFixed(4),k.uy.toFixed(4),k.uz.toFixed(4),k.ox,k.oy,W,CH,dpr,SCN.length,FLT.length,R.stV,g.L].join();if(MBO.key===key)return MBO.list;MBO.key=key;
 const WB=[];FLT.forEach(([tx,ty])=>{const h=(dx,dy)=>FLS.has((tx+dx)+","+(ty+dy)),X=tx*6,Y=ty*6;if(!h(0,-1))WB.push({x:X-1,y:Y-1,z:0,w:8,d:1,h:24,t:1});if(!h(0,1))WB.push({x:X-1,y:Y+6,z:0,w:8,d:1,h:24,t:3});if(!h(-1,0)&&!(tx===0&&ty===2)){if(!glassOn())WB.push({x:X-1,y:Y,z:0,w:1,d:6,h:24,t:2});else{WB.push({x:X-1,y:Y,z:0,w:1,d:1,h:24,t:2},{x:X-1,y:Y,z:22,w:1,d:6,h:2,t:2},{x:X-1,y:Y,z:0,w:1,d:6,h:1,t:2});if(!FLS.has(tx+","+(ty+1))||(tx===0&&ty+1===2))WB.push({x:X-1,y:Y+5,z:0,w:1,d:1,h:24,t:2})}}if(!h(1,0))WB.push({x:X+6,y:Y,z:0,w:1,d:6,h:24,t:4})});
 MBO.list=SCN.concat(WB).filter(b=>(b.t===0||wallVis(b.t,k))&&!(b.t===2&&b.x+b.w<=g.L-42)&&!(b.t===0&&b.y<-200)).map(b=>{const pts=[];for(const x of[b.x,b.x+b.w])for(const y of[b.y,b.y+b.d])for(const z of[b.z,b.z+b.h])pts.push(P3(x,y,z,k));const h=mbHull(pts);let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;h.forEach(p=>{x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1])});
  return{b,h,bb:[x0,y0,x1,y1],d:(b.x+b.w/2)*k.cx+(b.y+b.d/2)*k.cy+(b.z+b.h/2)*k.cz,near:b.x+b.w>g.L-16}}).sort((a,b)=>a.d-b.d);return MBO.list}
let MBLY=null;
mbDraw=function(k,fg){if(!mbOn()||(fg?wallVis(2,k):!wallVis(2,k))){return}const now=performance.now(),dt=Math.min(.1,(now-(MB.last||now))/1000);MB.last=now;const sp=typeof mbSpd==="function"?mbSpd():1;try{wkGhosts()}catch(e){}
 MB.cd=(MB.cd||0)-dt*sp;if(MB.cd<=0){MB.cd=.8+Math.random()*1.6;mbSpawn()}const g=mbGeo();
 const L=LTN||{oa:0,ov:"#000000"},tint=c=>L.oa>.05?mixc(c,L.ov,Math.min(.6,L.oa*.65)):c,items=[],inS=new Set((R.people||[]).map(p=>p.c));
 MB.L=MB.L.filter(m=>{m.t+=dt*sp;
  if(m.gh){const p=R.people.find(q=>q.c===m.gh.c);if(p)return false;const atD=m.s>0?m.y>=15:m.y<=15;if(atD){if(R.sched.includes(m.gh.e)){m.y=15;m.x+=(-5-m.x)*Math.min(1,dt*sp*3);m.wait=(m.wait||0)+dt;m.face=1;if(m.wait<20)return true}m.gh=null;m.face=0}}
  if(m.pk&&!m.pkd&&(m.s>0?m.y>=15:m.y<=15)){m.pkt=(m.pkt||0)+dt*sp;m.face=1;if(m.pkt<1.6)return true;m.pkd=1;m.face=0}
  if(m.ax){m.x+=m.s*m.sp*sp*dt;if(m.x<m.x0-80||m.x>m.x1+80)return false}else{let st=m.s*m.sp*sp*dt;const rd=m.T.k==="car"||m.T.k==="bike";if(rd){let gap=1e9;const lm=m.T.l||8;for(const o of MB.L){if(o===m||o.s!==m.s||o.ax||!(o.T.k==="car"||o.T.k==="bike")||Math.abs(o.x-m.x)>5)continue;const dy=(o.y-m.y)*m.s;if(dy<=0)continue;const g2=dy-(lm+(o.T.l||8))/2-2;if(g2<gap){gap=g2;m.ld=o}}if(gap<1e9){const mv=Math.max(0,Math.min(Math.abs(st),gap));st=m.s*mv;if(gap<6&&m.ld)m.sp=Math.min(m.sp,m.ld.sp)}}m.y+=st;if(m.T.wob)m.x+=Math.sin(m.t*3+m.a)*dt*2;if(m.y<g.Y0-(m.tr?110:40)||m.y>g.Y1+(m.tr?110:40))return false}
  const mid=(g.Y0+g.Y1)/2;if(!m.seen&&(m.ax?Math.abs(m.x-(m.x0+m.x1)/2)<20:(m.s>0?m.y>mid+6:m.y<mid-6))){m.seen=1;if(!m.tag)mbSeen(m.T,m)}
  const it={m,parts:[],d:m.x*k.cx+m.y*k.cy+4*k.cz};const ped=m.T.k==="ped"&&!m.T.cat;
  let P=ped?[]:(m._P||m.T.mk(m.a,m.t,m.um));if(!ped&&m.T.k!=="ped")m._P=P;if(m.T.dog){P=P.concat(mbDog(m.s>0?1.8:-1.8,m.s>0?7.4:-3,m.T.dog,m.T.big,m.t))}if(m.T.pet){P=P.concat(m.T.pet(m.t,m.a))}if(m.T.fly){const fz=m.T.fly+Math.sin(m.t*2+m.a)*.8;P=P.map(p=>[p[0],p[1],p[2]+fz,p[3],p[4],p[5],p[6],p[7]])}
  const l=m.T.l||8;P.forEach(p=>{let b;if(m.ax){const x=m.s>0?m.x+p[1]-l/2:m.x-(p[1]+p[4])+l/2;b={x,y:m.y+p[0],z:p[2]+(m.zo||0),w:p[4],d:p[3],h:p[5],c:p[7]&&L.oa>.2?p[6]:tint(p[6])}}else{const x=m.x+p[0],y=m.s>0?m.y+p[1]-l/2:m.y-(p[1]+p[4])+l/2;b={x,y,z:p[2],w:p[3],d:p[4],h:p[5],c:p[7]&&L.oa>.2?p[6]:tint(p[6])}}const x=b.x,y=b.y;it.parts.push({b,d:(x+b.w/2)*k.cx+(y+b.d/2)*k.cy+(b.z+b.h/2)*k.cz})});
  if(ped){if(!m.c){if(!m.tag&&!m.T.ni&&Math.random()<.12&&["kaisha","gakusei","kaimono","sumaho","couple","jog"].includes(m.T.id)){const tdS=typeof todaySet==="function"?todaySet():new Set(),met=G.cs.filter(c=>c.met&&!c.sp&&!(typeof spx==="function"&&spx(c))&&!inS.has(c)&&!tdS.has(c)&&c.i!==52&&c.i!==94);if(met.length){m.c=met[Math.floor(Math.random()*met.length)];m.dex=1}}if(!m.c)m.c=mbLook(m.T,m.a)}
   if(m.dex&&!m.dexL&&m.seen){m.dexL=1;G.mbDx=G.mbDx||{};if(G.mbDx[m.c.i]!==G.day){G.mbDx[m.c.i]=G.day;try{const t="👀 "+nm(m.c)+" が店の前を通りすぎた";log(t);mbBand(t)}catch(e){}}}
   const dd=m.dd!=null?m.dd:(m.face?1:(m.s>0?0:2)),ox=m.x-2,oy=m.y-1.5+(!m.face&&!m.ev&&Math.sin(m.t*10)>0?.15:0)+(m.q&&m.q.bob&&Math.sin(m.t*8)>0?.25:0),save=GLS;GLS=[];const va=[];try{if(!walkSpr(va,m.c,dd,ox,oy))pv(va,ox,oy,1,m.c,0,dd);mbProps(m,ox,oy,dd).forEach(v=>va.push(v))}catch(e){}it.spr=GLS;it.vox=va;GLS=save}
  items.push(it);return true});
 if(!items.length)return;items.sort((a,b)=>a.d-b.d);
 const occ=fg?[]:mbOcc(k,g);
 const drawIt=it=>{it.parts.sort((p,q)=>p.d-q.d).forEach(o=>dvb(o.b,k));if(it.vox&&it.vox.length)it.vox.forEach(v=>{if(v.um)return;try{dv(v,k)}catch(e){}});if(it.spr)it.spr.forEach(q=>{try{q.fn(k)}catch(e){}});if(it.vox)it.vox.forEach(v=>{if(!v.um)return;try{dv(v,k)}catch(e){}})};
 const L2=items.slice(),used=new Set();items.forEach(it=>{if(it.m.tr)return;const m=it.m,r=(m.T.l||10)*.6+3,zt=(m.T.fly||0)+14;let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(const[dx,dy,z]of[[-r,-r,0],[r,r,0],[-r,r,0],[r,-r,0],[-r,-r,zt],[r,r,zt],[-r,r,zt],[r,-r,zt]]){const q=P3(m.x+dx,m.y+dy,z,k);x0=Math.min(x0,q[0]);x1=Math.max(x1,q[0]);y0=Math.min(y0,q[1]);y1=Math.max(y1,q[1])}
  occ.forEach(o=>{if(o.bb[2]<x0||o.bb[0]>x1||o.bb[3]<y0||o.bb[1]>y1)return;const B=o.b,px=Math.max(B.x,Math.min(B.x+B.w,m.x)),py=Math.max(B.y,Math.min(B.y+B.d,m.y)),pd=px*k.cx+py*k.cy+4*k.cz;if(pd>it.d+.05){L2.push({oc:o,d:Math.max(o.d,it.d+.001)})}})});
 L2.sort((a,b)=>a.d-b.d);const A=typeof scnA==="function"?scnA():.3,LT=LTN||{oa:0},tc=c=>LT.oa>.02&&/^#/.test(c)?mixc(c,LT.ov,LT.oa):c;
 L2.forEach(e=>{if(!e.oc){drawIt(e);return}const h=e.oc.h;cx.save();cx.beginPath();h.forEach((p,i)=>i?cx.lineTo(p[0],p[1]):cx.moveTo(p[0],p[1]));cx.closePath();cx.clip();cx.setTransform(1,0,0,1,0,0);try{cx.drawImage(BGC,0,0)}catch(_){}cx.restore()})};
/* 道が手前に来る向きでは、店の中より手前に描く */
{const _au=auraDraw;auraDraw=function(k,fg){const r=_au.apply(this,arguments);if(fg)try{mbDraw(k,1)}catch(e){}return r}}

/* 軽量モード中の表示と解除 */
{const _mc2=mvCard;mvCard=function(){_mc2.apply(this,arguments);const c=$("#mvcard");if(!c||!R.lite)return;c.insertAdjacentHTML("beforeend",`<div style="display:flex;align-items:center;gap:8px;margin-top:8px;font-size:12.5px"><div style="flex:1;color:var(--mut)">⚡ 軽量モード中（動きを少なめにしています）</div><button id="litoff" style="flex:none">解除する</button></div>`)}}
document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest("#litoff")){e.stopPropagation();R.lite=0;G.liteNo=1;try{LITE.bad=0;fitCv()}catch(_){}save();mvCard();toast("軽量モードを解除しました")}},true);

/* ===== 道に面した壁をガラス張りに（見本） ===== */
function glassOn(){return 1}
const GFC=[{n:"ブラック（初期）",c:"#2b2b2f"},{n:"ホワイト",c:"#f2f2f2"},{n:"ナチュラルウッド",c:"#b68a5a"},{n:"ダークウッド",c:"#5d4030"},{n:"シルバー",c:"#b8bec4"},{n:"ゴールド",c:"#c9a227"},{n:"ネイビー",c:"#2c3e66"},{n:"レッド",c:"#b3262e"},{n:"ミント",c:"#7fc8a9"},{n:"ピンク",c:"#e889ad"}],GFP=5000;
function gfcCur(){return GFC[R.pvG!=null?R.pvG:(G.gfc||0)]||GFC[0]}
function gfcPrev(i){R.pvG=null;const bar=$("#clrbar");if(bar)bar.remove();if(i!=null){R.pvG=i;const sh=$("#sheet");if(sh)sh.classList.remove("open");const d=document.createElement("div");d.id="clrbar";d.innerHTML=`<div class="tc"><div>窓枠を「<b>${esc(GFC[i].n)}</b>」にしますか？　¥${GFP.toLocaleString()}</div><div class="row" style="justify-content:flex-end;margin-top:8px"><button id="gfcno">やめる</button><button id="gfcok" class="on">購入する</button></div></div>`;document.body.appendChild(d)}build();BGK="";try{rdeco()}catch(e){}}
document.addEventListener("click",e=>{if(!e.target.closest)return;const g=e.target.closest("[data-gfc]");if(g){e.stopPropagation();const i=+g.dataset.gfc;if(i===(G.gfc||0))return;gfcPrev(i);return}const b=e.target.closest("#gfcok,#gfcno");if(!b)return;e.stopPropagation();const i=R.pvG;if(b.id==="gfcok"&&i!=null){if(G.money<GFP){(log("お金が足りません"),toast("💸 お金が足りません"))}else{G.money-=GFP;G.gfc=i;log("🪟 窓枠を「"+GFC[i].n+"」に変更（-¥"+GFP.toLocaleString()+"）");save();hud()}}gfcPrev(null)},true);
{const _rd=rdeco;rdeco=function(){const r=_rd.apply(this,arguments);try{const wl0=document.querySelector('[data-dc="wl"]'),cat=wl0&&wl0.parentNode;if(cat&&!cat.querySelector('[data-dc="gl"]'))wl0.insertAdjacentHTML("afterend",'<button data-dc="gl">🪟 ガラス窓</button>');
 let sec=$("#sec-gl");const card=$("#sec-clr");if(!sec&&card){sec=document.createElement("div");sec.id="sec-gl";card.parentNode.insertBefore(sec,card.nextSibling)}const c=R.dcat||"obj";if(sec){sec.hidden=c!=="gl";if(c==="gl"){const cur=G.gfc||0;const cs=G.gls||0;sec.innerHTML=`<div class="m" style="font-size:12px;margin:8px 0 4px">ガラスのデザイン</div><div class="grid">${GSTY.map((f,i)=>`<button class="it ${cs===i?"on":""}" data-gls="${i}">${f.n}<small>${cs===i?"使用中":"¥"+f.p.toLocaleString()}</small></button>`).join("")}</div><div class="m" style="font-size:12px;margin:12px 0 4px">ガラスの窓枠</div><div class="grid">${GFC.map((f,i)=>`<button class="it ${cur===i?"on":""}" data-gfc="${i}"><span class="sw" style="background:${f.c};border:1px solid #888"></span>${f.n}<small>${cur===i?"使用中":"¥"+GFP.toLocaleString()}</small></button>`).join("")}</div>`}}
 cat&&cat.querySelectorAll("[data-dc]").forEach(x=>x.classList.toggle("on",x.dataset.dc===c&&R.tool!=="mv"))}catch(e){}return r}}
function glassMod(a){if(!glassOn())return;const fc=gfcCur().c,GX=new Set();if(glsCur()===10){FLT.forEach(([tx,ty])=>{if(FLS.has((tx-1)+","+ty)||(tx===0&&ty===2))return;const X=tx*6,Y=ty*6;for(const yy of[Y+1.5,Y+4]){box(a,X,yy,0,1.5,1.5,1.5,"#a1887f");box(a,X-.25+.25,yy-.25,1.5,2,2,1.5,"#43a047");box(a,X+.25,yy+.25,3,1,1,1,"#66bb6a")}})}FLT.forEach(([tx,ty])=>{if(!FLS.has((tx-1)+","+ty)&&!(tx===0&&ty===2))GX.add(tx*6-1)});for(let i=a.length-1;i>=0;i--){const v=a[i];if(v[4]!==2||!GX.has(v[0])||(v[5]&&v[5]<1))continue;const yy=((v[1]%6)+6)%6;if(yy===0||v[2]>=22||v[2]<1)v[3]=fc;else a.splice(i,1)}}
const GSTY=[{n:"ふつうのガラス（初期）",p:0},{n:"すりガラス",p:300000},{n:"スモークガラス",p:300000},{n:"ステンドグラス",p:600000},{n:"格子窓",p:300000},{n:"アーチ窓",p:450000},{n:"障子窓",p:450000},{n:"ネオンサイン（店名）",p:600000},{n:"カフェカーテン",p:300000},{n:"ガラスブロック",p:450000},{n:"植物の窓辺",p:300000}];
function glsCur(){return R.pvS!=null?R.pvS:(G.gls||0)}
function glsPrev(i){R.pvS=null;const bar=$("#clrbar");if(bar)bar.remove();if(i!=null){R.pvS=i;const sh=$("#sheet");if(sh)sh.classList.remove("open");const d=document.createElement("div");d.id="clrbar";d.innerHTML=`<div class="tc"><div>ガラスを「<b>${esc(GSTY[i].n)}</b>」にしますか？　¥${GSTY[i].p.toLocaleString()}</div><div class="row" style="justify-content:flex-end;margin-top:8px"><button id="glsno">やめる</button><button id="glsok" class="on">購入する</button></div></div>`;document.body.appendChild(d)}build();BGK="";try{rdeco()}catch(e){}}
document.addEventListener("click",e=>{if(!e.target.closest)return;const g=e.target.closest("[data-gls]");if(g){e.stopPropagation();const i=+g.dataset.gls;if(i===(G.gls||0))return;glsPrev(i);return}const b=e.target.closest("#glsok,#glsno");if(!b)return;e.stopPropagation();const i=R.pvS;if(b.id==="glsok"&&i!=null){const pr=GSTY[i].p;if(G.money<pr){(log("お金が足りません"),toast("💸 お金が足りません"))}else{G.money-=pr;G.gls=i;log("🪟 ガラスを「"+GSTY[i].n+"」に変更（-¥"+pr.toLocaleString()+"）");save();hud()}}glsPrev(null)},true);
function glassDraw(k){if(!glassOn()||(!R.ext&&!wallVis(2,k)))return;const segs=[];FLT.forEach(([tx,ty])=>{if(FLS.has((tx-1)+","+ty)||(tx===0&&ty===2))return;segs.push([tx*6-.5,ty*6])});
 const night=LTN&&LTN.glow>.2,st=glsCur(),fc=gfcCur().c;cx.save();
 segs.forEach(([X0,y0],si)=>{const Q=(u,v)=>P3(X0,y0+1+u*5,1+v*21,k),poly=(pts,fill,stroke,lw)=>{cx.beginPath();pts.forEach(([u,v],i)=>{const p=Q(u,v);i?cx.lineTo(p[0],p[1]):cx.moveTo(p[0],p[1])});cx.closePath();if(fill){cx.fillStyle=fill;cx.fill()}if(stroke){cx.strokeStyle=stroke;cx.lineWidth=lw||1;cx.stroke()}},rect=(u0,v0,u1,v1,f,s2,lw)=>poly([[u0,v0],[u1,v0],[u1,v1],[u0,v1]],f,s2,lw),line=(u0,v0,u1,v1,c,lw)=>{const a=Q(u0,v0),b=Q(u1,v1);cx.beginPath();cx.moveTo(a[0],a[1]);cx.lineTo(b[0],b[1]);cx.strokeStyle=c;cx.lineWidth=lw||1;cx.stroke()};
  const plane=fn=>{const o=R.ext?Q(0,1):Q(1,1),ex=R.ext?Q(1,1):Q(0,1),ey=R.ext?Q(0,0):Q(1,0);cx.save();cx.transform(ex[0]-o[0],ex[1]-o[1],ey[0]-o[0],ey[1]-o[1],o[0],o[1]);fn();cx.restore()};
  const base=()=>rect(0,0,1,1,night?"rgba(255,226,170,.16)":"rgba(170,215,240,.22)"),streak=()=>{for(const[f0,f1]of[[.15,.45],[.3,.55]])line(f0,.9,f1,.15,"rgba(255,255,255,.35)",1.2)};
  if(st===0){base();streak()}
  else if(st===1){rect(0,0,1,1,night?"rgba(255,240,215,.62)":"rgba(240,244,246,.68)");streak()}
  else if(st===2){rect(0,0,1,1,"rgba(25,25,35,.55)");streak()}
  else if(st===3){const C=["#e53935","#1e88e5","#fdd835","#43a047","#8e24aa","#fb8c00"];for(let i=0;i<3;i++)for(let j=0;j<7;j++){const u0=i/3,v0=j/7;rect(u0,v0,u0+1/3,v0+1/7,C[(i*5+j*3+si)%C.length]+(night?"cc":"88"),fc,1.4)}}
  else if(st===4){base();for(let i=1;i<4;i++)line(i/4,0,i/4,1,fc,1.3);for(let j=1;j<8;j++)line(0,j/8,1,j/8,fc,1.3)}
  else if(st===5){base();streak();const pts=[[0,1],[0,.78]];for(let t=0;t<=16;t++){const a=Math.PI*t/16;pts.push([.5-.5*Math.cos(a),.78+.2*Math.sin(a)])}pts.push([1,.78],[1,1]);const wall=(WLC[G.wcl||0]||WLC[0]).c;poly([[0,1],[1,1],[1,.78]].concat(pts.slice(2).reverse()).concat([[0,.78]]),wall);const arc=[];for(let t=0;t<=16;t++){const a=Math.PI*t/16;arc.push([.5-.5*Math.cos(a),.78+.2*Math.sin(a)])}for(let i=0;i<arc.length-1;i++)line(arc[i][0],arc[i][1],arc[i+1][0],arc[i+1][1],fc,2.2)}
  else if(st===6){base();rect(0,.42,1,1,night?"rgba(255,236,190,.95)":"rgba(246,238,218,.95)");for(let i=1;i<4;i++)line(i/4,.42,i/4,1,"#7a5a3a",1.2);for(let j=1;j<6;j++)line(0,.42+j*.58/6,1,.42+j*.58/6,"#7a5a3a",1.2);line(0,.42,1,.42,"#7a5a3a",2)}
  else if(st===7){base();streak();if(si%2===0)plane(()=>{cx.save();cx.scale(1/100,1/100);const t=String((G.ow&&G.ow.shop)||"SHEESHA");cx.textAlign="center";cx.textBaseline="middle";let fs=22;cx.font="900 "+fs+"px sans-serif";const tw=cx.measureText(t).width;if(tw>78){fs=Math.max(8,fs*78/tw);cx.font="900 "+fs+"px sans-serif"}cx.shadowColor="#ff4fa3";cx.shadowBlur=night?14:4;cx.strokeStyle="#ff4fa3";cx.lineWidth=3;cx.strokeRect(8,28,84,28);cx.fillStyle=night?"#ffd1ec":"#ff4fa3";cx.fillText(t,50,43);cx.font="900 11px sans-serif";cx.shadowColor="#40c4ff";cx.fillStyle=night?"#d6f5ff":"#29b6f6";cx.fillText("OPEN",50,66);cx.restore()})}
  else if(st===8){base();streak();const cc="#c0392b";rect(0,0,1,.38,cc+"ee");for(let i=1;i<10;i++)line(i/10,0,i/10,.38,"rgba(0,0,0,.18)",1);line(0,.39,1,.39,"#8d6e63",2.4)}
  else if(st===9){for(let i=0;i<4;i++)for(let j=0;j<12;j++){const u0=i/4,v0=j/12,du=1/4,dv=1/12;rect(u0,v0,u0+du,v0+dv,night?"rgba(255,232,190,.55)":"rgba(200,230,240,.6)","rgba(255,255,255,.75)",1.2);rect(u0+du*.25,v0+dv*.25,u0+du*.75,v0+dv*.75,"rgba(255,255,255,.18)")}}
  else if(st===10){base();streak()}
 });cx.restore()}
{const _md=mbDraw;mbDraw=function(k,fg){const r=_md.apply(this,arguments);try{if(R.ext?fg:!fg)glassDraw(k)}catch(e){}return r}}
/* 営業中以外（通行人がいない時）もガラスは描く */
{const _db2=drawBG;drawBG=function(k){const r=_db2.apply(this,arguments);try{if(!mbOn()&&!R.ext)glassDraw(k)}catch(e){}return r}}

setTimeout(()=>{try{build();BGK=""}catch(e){}},0);

/* ===== フリードリンク：家具をよけて一番近い道で冷蔵庫へ行き、席に戻る ===== */
function drGrid(){const xs=FLT.map(t=>t[0]),ys=FLT.map(t=>t[1]),X0=Math.min(...xs)*6,Y0=Math.min(...ys)*6,W2=(Math.max(...xs)+1)*6-X0,H2=(Math.max(...ys)+1)*6-Y0;
 const key=R.stV+"|"+X0+","+Y0+","+W2+","+H2;if(drGrid.c&&drGrid.c.key===key)return drGrid.c;
 const b=new Uint8Array(W2*H2).fill(1);FLT.forEach(([tx,ty])=>{for(let x=0;x<6;x++)for(let y=0;y<6;y++)b[(ty*6+y-Y0)*W2+(tx*6+x-X0)]=0});
 (R.stat||[]).forEach(v=>{if(v[2]>=5||v[2]+(v[5]||1)<=0)return;const s2=v[5]||1;for(let x=Math.floor(v[0]);x<v[0]+s2-1e-6;x++)for(let y=Math.floor(v[1]);y<v[1]+s2-1e-6;y++){const i=x-X0,j=y-Y0;if(i>=0&&j>=0&&i<W2&&j<H2)b[j*W2+i]=1}});
 const ok=new Uint8Array(W2*H2);for(let j=0;j<H2;j++)for(let i=0;i<W2;i++){let f=1;for(let dj=-1;dj<=1&&f;dj++)for(let di=-1;di<=1;di++){const a=i+di,c=j+dj;if(a<0||c<0||a>=W2||c>=H2||b[c*W2+a]){f=0;break}}ok[j*W2+i]=f}
 return drGrid.c={key,X0,Y0,W:W2,H:H2,ok}}
function drPath(x0,y0,x1,y1){try{const g=drGrid(),{X0,Y0,W,H,ok}=g,cl=(v,m)=>Math.max(0,Math.min(m-1,Math.floor(v))),si=cl(x0-X0,W),sj=cl(y0-Y0,H),gi=cl(x1-X0,W),gj=cl(y1-Y0,H);
 const near=(i,j,a,c,r)=>Math.abs(i-a)<=r&&Math.abs(j-c)<=r,pass=(i,j)=>i>=0&&j>=0&&i<W&&j<H&&(ok[j*W+i]||near(i,j,si,sj,3)||near(i,j,gi,gj,2));
 const N=W*H,dist=new Float64Array(N).fill(1e9),prev=new Int32Array(N).fill(-1),s0=sj*W+si,g0=gj*W+gi;dist[s0]=0;
 const Q=[[0,s0]];const D=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,1.414],[1,-1,1.414],[-1,1,1.414],[-1,-1,1.414]];
 while(Q.length){let bi=0;for(let q=1;q<Q.length;q++)if(Q[q][0]<Q[bi][0])bi=q;const[d,u]=Q[bi];Q[bi]=Q[Q.length-1];Q.pop();if(d>dist[u])continue;if(u===g0)break;const ui=u%W,uj=(u/W)|0;
  for(const[di,dj,w]of D){const a=ui+di,c=uj+dj;if(!pass(a,c))continue;if(di&&dj&&(!pass(ui+di,uj)||!pass(ui,uj+dj)))continue;const v=c*W+a,nd=d+w;if(nd<dist[v]){dist[v]=nd;prev[v]=u;Q.push([nd,v])}}}
 if(prev[g0]<0&&g0!==s0)return null;const cells=[];for(let u=g0;u>=0;u=prev[u]){cells.push(u);if(u===s0)break}cells.reverse();
 const pt=u=>[X0+(u%W)+.5,Y0+((u/W)|0)+.5],los=(a,b)=>{const[ax,ay]=pt(a),[bx,by]=pt(b),n=Math.ceil(Math.hypot(bx-ax,by-ay)*4);for(let k=0;k<=n;k++){const x=ax+(bx-ax)*k/n,y=ay+(by-ay)*k/n,i=Math.floor(x-X0),j=Math.floor(y-Y0);if(!pass(i,j))return false;if(!ok[j*W+i]&&!near(i,j,si,sj,3)&&!near(i,j,gi,gj,2))return false}return true};
 const out=[];let a=0;while(a<cells.length-1){let b=cells.length-1;while(b>a+1&&!los(cells[a],cells[b]))b--;out.push(pt(cells[b]));a=b}
 if(out.length)out.pop();out.push([x1,y1]);return out}catch(e){return null}}
{const _sd=startDrink;startDrink=function(p){_sd.apply(this,arguments);const r=drPath(p.x,p.y,FX,FY);if(r)p.path=r}}
{const _rd=resolveDrink;resolveDrink=function(p,nw){const r=_rd.apply(this,arguments);if(!nw&&p.st==="ret"&&p.seat){const sx=p.seat.px+2,q=drPath(p.x,p.y,sx,p.seat.Y0+3);if(q)p.path=q}return r}}

/* ===== 通行人：性別に合った髪型・服 ===== */
const MB_HSF=[0,1,1,2,3,3,5,5,6,8,11,12,13,15],MB_HSM=[0,0,0,4,7,9,9,10,12,12,14,15,16,17,17];
{const _ml=mbLook;mbLook=function(t,a){const c=_ml.apply(this,arguments);try{const o=MBLK[t.id]||{};c.sex=o.sex||(o.hs?"男性":(Math.random()<.5?"女性":"男性"));const L=c.sex==="女性"?MB_HSF:MB_HSM;if(!o.hs||!o.hs.every(h=>L.includes(h)))c.hs=L[Math.floor(Math.random()*L.length)];c.h2=0;if(c.sex==="男性"&&c.bot===2)c.bot=[0,0,1,3][Math.floor(Math.random()*4)]}catch(e){}return c}}
/* ===== 傘：丸みのある形 ===== */
function umbVox(P,ox,oy,col){const cx0=ox+2,cy0=oy+1.5,dk=dkHex(col,.78),put=(x,y,z,c,s)=>{const v=[x,y,z,c,undefined,s];v.um=1;P.push(v)};
 for(let z=7;z<13.5;z+=.25)put(cx0-.125,cy0-.125,z,"#616161",.25);
 const R=[[13,3],[13.5,2.5],[14,1.75],[14.5,1]];R.forEach(([z,r],li)=>{const rin=li<R.length-1?R[li+1][1]-.5:-1;for(let x=-r;x<r;x+=.5)for(let y=-r;y<r;y+=.5){const d=Math.hypot(x+.25,y+.25);if(d>r||d<rin)continue;const rib=li===0&&(Math.abs(x+.25)<.3||Math.abs(y+.25)<.3);put(cx0+x,cy0+y,z,rib?dk:col,.5)}});
 put(cx0-.125,cy0-.125,15,"#9e9e9e",.25);put(cx0-.125,cy0-.125,15.25,"#9e9e9e",.25)}

/* ===== 店のシャッター：閉店で店長が外から閉め、営業開始で店長が来て開ける ===== */
const CINE_Y=1.3,CINE_P=.5;
function shutLv(){if(R.cine)return R.cine.lv;if(R.tab==="deco"||R.pvS!=null||R.pvG!=null)return 0;return R.phase==="run"?0:1}
function shutDraw(k){const lv=shutLv();if(lv<=.001)return;const L=typeof LTN!=="undefined"&&LTN||{oa:0},tn=c=>L.oa>.05&&typeof mixc==="function"?mixc(c,L.ov,Math.min(.6,L.oa*.65)):c,ZT=24,z0=ZT-(ZT-.5)*lv;
 FLT.forEach(([tx,ty])=>{if(FLS.has((tx-1)+","+ty))return;const X=tx*6-1.05,Y=ty*6,q=(y,z)=>P3(X,y,z,k),pl=(pts,c)=>{cx.beginPath();pts.forEach((p,i)=>i?cx.lineTo(p[0],p[1]):cx.moveTo(p[0],p[1]));cx.closePath();cx.fillStyle=c;cx.fill()};
  pl([q(Y,z0),q(Y+6,z0),q(Y+6,ZT),q(Y,ZT)],tn("#a7adb3"));
  cx.lineWidth=Math.max(1,k.s*.06);for(let z=ZT-.75;z>z0+.3;z-=.75){const a=q(Y,z),b=q(Y+6,z);cx.beginPath();cx.moveTo(a[0],a[1]);cx.lineTo(b[0],b[1]);cx.strokeStyle=tn("#7d848b");cx.stroke()}
  pl([q(Y,z0),q(Y+6,z0),q(Y+6,z0+.6),q(Y,z0+.6)],tn("#5f666c"));
  pl([q(Y,ZT-1.4),q(Y+6,ZT-1.4),q(Y+6,ZT),q(Y,ZT)],tn("#8a9097"));
  const a=q(Y+3,z0+.3),b=q(Y+3.6,z0+.3);cx.beginPath();cx.moveTo(a[0],a[1]);cx.lineTo(b[0],b[1]);cx.strokeStyle=tn("#3d4246");cx.lineWidth=Math.max(1.5,k.s*.15);cx.stroke()})}
/* 店の中から見る時：ガラスの奥に描く */
{const _gd=glassDraw;glassDraw=function(k){try{if(wallVis(2,k))shutDraw(k)}catch(e){}return _gd.apply(this,arguments)}}
/* 道の側から見る時：店の中の人より手前、外を歩く人より奥に描く */
{const _au3=auraDraw;auraDraw=function(k,fg){if(fg)try{if(!wallVis(2,k))shutDraw(k)}catch(e){}return _au3.apply(this,arguments)}}
/* 店の中のシャッターが閉まっている時（営業中以外）、通行人がいないのでガラスの奥に描く処理が呼ばれない場合の保険 */
{const _db3=drawBG;drawBG=function(k){const r=_db3.apply(this,arguments);try{if(R.cine&&!mbOn()&&wallVis(2,k))shutDraw(k)}catch(e){}return r}}
/* 店長を外に出す（外では通行人と同じ描き方） */
function cineOut(on,x,y,face,s){if(on){let m=MB.L.find(q=>q.own);if(!m){m={T:MBG,c:OW.c,s:1,x,y,a:1,t:0,sp:0,tag:1,seen:1,own:1};MB.L.push(m)}m.x=x;m.y=y;m.face=face?1:0;m.s=s||1;if(OW.x>-500){R.cine.ox=OW.x;R.cine.oy=OW.y}OW.x=-999;OW.y=-999}else{MB.L=MB.L.filter(q=>!q.own)}}
function cineCam(t){const c=R.cine;if(!c.cam0)return;const e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;let dy=c.ty-c.cam0.yaw;dy=((dy+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;R.cam.yaw=c.cam0.yaw+dy*e;R.cam.pit=c.cam0.pit+(c.tp-c.cam0.pit)*e;R.camVer++}
function cineBack(){const c=R.cine;if(c&&c.cam0){R.cam.yaw=c.cam0.yaw;R.cam.pit=c.cam0.pit;R.camVer++}}
function walkTo(o,pts,v,dt){let st=v*dt;while(st>0&&pts.length){const t=pts[0],dx=t[0]-o.x,dy=t[1]-o.y,d=Math.hypot(dx,dy);if(d>.01)o.dir=Math.abs(dx)>Math.abs(dy)?(dx>0?1:3):(dy>0?0:2);if(d<=st){o.x=t[0];o.y=t[1];pts.shift();st-=d}else{o.x+=dx/d*st;o.y+=dy/d*st;st=0}}return!pts.length}
function cineSkipOn(){const f=e=>{if(!R.cine)return;e.stopPropagation();e.preventDefault();R.cine.skip=1};R.cine.sk=f;setTimeout(()=>{if(R.cine&&R.cine.sk===f)document.addEventListener("pointerdown",f,true)},300)}
function cineEnd(){const c=R.cine;if(!c)return;if(c.k==="close"){OW.x=-999;OW.y=-999;OW.mode="";OW.path=[]}if(c.sk)document.removeEventListener("pointerdown",c.sk,true);cineOut(0);cineBack();R.cine=null;BGK=""}
function cineClose(done){if(!mbOn()){done();return}const ip=(()=>{try{return drPath(OW.x,OW.y,2,15)}catch(e){return null}})()||[[OW.x,15],[2,15]];
 R.cine={k:"close",lv:0,t:0,ph:0,cam0:{yaw:R.cam.yaw,pit:R.cam.pit},ty:CINE_Y,tp:CINE_P,path:ip.concat([[-1,15],[-4.5,15]]),done,pos:{x:OW.x,y:OW.y,dir:OW.dir}};OW.sitting=0;OW.seat=null;OW.idleSmk=0;OW.mode="";OW.path=[];cineSkipOn()}
{const _st=start;start=function(){const r=_st.apply(this,arguments);try{if(R.phase==="run"&&mbOn()&&!R.cine){const hx=OW.x,hy=OW.y;R.cine={k:"open",lv:1,t:0,ph:0,cam0:{yaw:R.cam.yaw,pit:R.cam.pit},ty:CINE_Y,tp:CINE_P,hx,hy,p:{x:-6,y:15-30},t0:R.t};cineOut(1,-6,-15,0,1);cineSkipOn()}}catch(e){R.cine=null}return r};$("#go").onclick=start}
function cineTick(dt){const c=R.cine;if(!c)return;c.t+=dt;if(c.k==="open")R.t=c.t0;
 if(c.k==="close"){
  if(c.skip){c.lv=1;const d=c.done;cineEnd();d();return}
  cineCam(Math.min(1,c.t/1.4));
  if(c.ph===0){const o=c.pos;const fin=walkTo(o,c.path,13,dt);if(o.x<0){cineOut(1,o.x,o.y,0,1)}else{OW.x=o.x;OW.y=o.y;OW.dir=o.dir}if(fin){c.ph=1;c.pt=c.t;cineOut(1,-4.5,15,1,1)}}
  else if(c.ph===1){if(c.t-c.pt>.35){c.ph=2;c.pt=c.t}}
  else if(c.ph===2){c.lv=Math.min(1,(c.t-c.pt)/1.8);if(c.lv>=1){c.ph=3;c.pt=c.t}}
  else if(c.ph===3){const m=MB.L.find(q=>q.own);if(m){m.face=0;m.s=-1;m.y-=11*dt;m.x+=(-6-m.x)*Math.min(1,dt*3)}if(c.t-c.pt>2.4){const d=c.done;c.lv=1;cineEnd();d()}}
  if(c.t>14&&R.cine===c){const d=c.done;cineEnd();d()}}
 else{
  if(c.skip){c.lv=0;OW.x=c.hx;OW.y=c.hy;OW.dir=1;cineEnd();return}
  cineCam(Math.min(1,c.t/1.3));
  if(c.ph===0){const fin=walkTo(c.p,[[-4.5,15]],12,dt);cineOut(1,c.p.x,c.p.y,0,1);if(fin){c.ph=1;c.pt=c.t;cineOut(1,-4.5,15,1,1)}}
  else if(c.ph===1){if(c.t-c.pt>.35){c.ph=2;c.pt=c.t}}
  else if(c.ph===2){c.lv=Math.max(0,1-(c.t-c.pt)/1.6);if(c.lv<=0){c.ph=3;c.pt=c.t;c.k2=1;cineOut(0);const ip=(()=>{try{return drPath(2,15,c.hx,c.hy)}catch(e){return null}})()||[[c.hx,15],[c.hx,c.hy]];c.wp=[[-1,15],[2,15]].concat(ip);OW.x=-3.5;OW.y=15;R.cine.t0=null}}
  if(c.ph>=3){c.k="openw";}
  if(c.t>14&&R.cine===c){OW.x=c.hx;OW.y=c.hy;cineEnd()}}
 if(c.k==="openw"){const o={x:OW.x,y:OW.y,dir:OW.dir};const fin=walkTo(o,c.wp,13,dt);OW.x=o.x;OW.y=o.y;OW.dir=o.dir;if(fin||c.skip){OW.x=c.hx;OW.y=c.hy;OW.dir=1;const back=c.t-c.pt;cineEnd()}}}
/* 開店の演出中は時計を止める（シャッターが開いたらスタート）・店長はこちらで動かす */
{const _tk=tick;tick=function(now){const c=R.cine,fr=c&&c.k==="open",t0=R.t;try{if(c){const n=performance.now(),dt=Math.min(.1,(n-(c.lastN||n))/1000);c.lastN=n;cineTick(dt)}}catch(e){try{cineEnd()}catch(_){}}const r=_tk.apply(this,arguments);if(fr&&R.cine&&R.cine.k==="open")R.t=t0;return r}}
/* 朝（営業前）は店主はまだ来ていない */
{const _hu=hud;hud=function(){const r=_hu.apply(this,arguments);try{if(R.phase==='prep'&&G.setup&&!R.cine&&!R.vis&&!R.clA&&OW.x>-100){OW.x=-999;OW.y=-999;OW.path=[];OW.mode=''}}catch(e){}return r}}
{const _ot=owTick;owTick=function(){if(R.cine)return;return _ot.apply(this,arguments)}}

/* ===== 街で見たもの：追加60種と、店の前にとどまる特殊イベント50種 ===== */
const XS=()=>{const m=MN[(G.month||0)%12];return m},XW=()=>(G.wx&&G.wx[G.wd])||"sun",XH=()=>mbHr(),XNI=()=>{const h=XH();return h>=19||h<5};
const xSum=()=>[6,7,8].includes(XS()),xRain=()=>/rain|typhoon/.test(XW()),xSnow=()=>XW()==="snow";
/* 人の見た目 */
const LK=(sex,sh,top,pa,o)=>{const r={top};if(sex)r.sex=sex;if(sh)r.shirt=[].concat(sh);if(pa)r.pants=[].concat(pa);return Object.assign(r,o||{})};
/* 持ち物（人の右手側・頭上など）。top=1 は人の絵より上に描く */
const XP={
 mic:(a)=>a(3.4,1.2,8,.5,.5,1.5,"#212121"),
 cam:(a)=>{a(2.6,-.6,9,1.5,2.5,1.5,"#263238");a(2.9,-1.4,9.4,1,1,1,"#455a64")},
 flag:(a,c)=>{a(3.6,1.4,6,.25,.25,7,"#9e9e9e",.25);a(3.6,1.4,10.5,.5,2,1.5,c||"#e53935")},
 box:(a,c)=>a(-.5,-1.2,5.5,5,2,2.5,c||"#c8a165"),
 sign:(a,c)=>{a(3.6,1.4,5,.25,.25,7,"#8d6e63",.25);a(3.1,1,11.5,1.5,1,2,c||"#fff59d")},
 guitar:(a)=>{a(-.2,-.8,4.5,4,.5,1.5,"#8d4a1e");a(3.6,-.8,5,2,.5,.5,"#5d4037")},
 phone:(a)=>a(1.6,-.7,12.5,.75,.25,1,"#212121",.25),
 broom:(a)=>{a(3.6,1.4,0,.25,.25,9,"#a1887f",.25);a(3.3,1.1,0,1,1,1.5,"#d7b16a")},
 shovel:(a)=>{a(3.6,1.4,1,.25,.25,7,"#8d6e63",.25);a(3.2,1,0,1,1,1.25,"#9e9e9e",.25)},
 bag:(a,c)=>a(3.4,1.2,3,1.5,1.5,2.5,c||"#e0e0e0"),
 clip:(a)=>a(3.2,-.5,7,1.5,.5,2,"#795548"),
 tissue:(a)=>a(3.4,-.5,7,1,.5,.5,"#fafafa"),
 balloon:(a,c)=>{a(3.6,1.4,7,.25,.25,8,"#eeeeee",.25);a(3,1,15,1.5,1.5,2,c||"#e53935",.5,1)},
 balloons:(a)=>{a(3.6,1.4,7,.25,.25,8,"#eeeeee",.25);a(2.5,.5,15,1.5,1.5,2,"#e53935",.5,1);a(4,1.5,16,1.5,1.5,2,"#fdd835",.5,1);a(3,2,17.5,1.5,1.5,2,"#42a5f5",.5,1)},
 drum:(a,c)=>{a(-.5,-1.4,5,5,1.2,3,c||"#c62828");a(-.3,-1.5,5.5,4.6,.2,2,"#fafafa")},
 rod:(a)=>a(3.6,1.4,6,.25,.25,10,"#5d4037",.25),
 pumpkin:(a)=>a(.3,0,10,3.5,3,3,"#fb8c00",.5,1),
 fan:(a)=>a(3.4,1,7.5,1,.25,1.5,"#4fc3f7",.25),
 santa:(a)=>{a(.4,.4,12.5,3,3,1,"#e53935",.5,1);a(.9,.9,13.5,2,2,1,"#e53935",.5,1);a(1.4,1.4,14.5,1,1,1,"#fafafa",.5,1);a(-1.6,1,6,2,2,3.5,"#8d6e63")},
 snowman:(a)=>{a(3.4,-.6,4,2,2,2,"#fafafa");a(3.7,-.3,6,1.5,1.5,1.5,"#fafafa")},
 hamaya:(a)=>{a(3.6,1.4,6,.25,.25,6,"#fafafa",.25);a(3.6,1.2,11.5,.25,.75,.75,"#e53935",.25)},
 koi:(a)=>{a(3.6,1.4,6,.25,.25,9,"#9e9e9e",.25);a(3.6,1.6,12.5,.5,3,1,"#e53935");a(3.6,1.6,11.2,.5,2.5,1,"#1565c0")},
 sasa:(a)=>{a(3.6,1.4,6,.25,.25,8,"#558b2f",.25);a(3,1,10,1.5,1.5,3,"#7cb342");a(3.4,.8,10.5,.5,.25,1,"#ffeb3b",.25);a(3,1.6,11.5,.5,.25,1,"#f06292",.25)},
 tube:(a)=>a(3.4,1,7,.5,2,.5,"#212121"),
 back:(a,c,f)=>a(.5,f>0?-.9:2.9,6,3,1,3,c||"#c62828"),
 suika:(a)=>{a(3,-.2,5,2.5,2.5,2.5,"#2e7d32");a(3.2,-.25,5.5,.5,.25,1.5,"#1b5e20",.25)},
 ura:(a,c)=>{a(1.9,1.4,10,.25,.25,4,"#616161",.25);a(0,0,14,4,3,1,c||"#1565c0",.5,1);a(-.5,-.5,15,5,4,.5,c||"#1565c0",.5,1)},
 hat:(a)=>a(-2,3,14,2,2,1,"#6d4c41",.5,1),
 snowball:(a)=>a(3.4,-.4,6,1,1,1,"#fafafa"),
 net:(a)=>{a(3.6,1.4,6,.25,.25,8,"#a1887f",.25);a(3,1,14,1.5,1.5,1.5,"#e0f7fa",.5,1)},
 light:(a)=>a(3.4,-.7,6.5,.5,1,.5,"#fff59d"),
 bento:(a)=>a(3.2,-.5,5.5,1.5,1,.75,"#e53935"),
 suitcase:(a)=>{a(3.8,1,0,1.5,2.5,3.5,"#455a64");a(4.3,2,3.5,.25,.25,2,"#9e9e9e",.25)},
 ukiwa:(a)=>a(-.5,0,5,5,3.5,1,"#ff5252"),
 board:(a)=>{a(.6,-1.4,.5,2.8,5.8,.5,"#5d4037");a(.6,-1.4,1,2.8,5.8,.25,"#e53935",.25);[[.6,-.9],[2.9,-.9],[.6,3.4],[2.9,3.4]].forEach(([x,y])=>a(x,y,0,.5,.6,.5,"#212121",.25))},
 juggle:(a)=>{a(1,1,15,.75,.75,.75,"#e53935",.25,1);a(2.5,1,16.5,.75,.75,.75,"#fdd835",.25,1);a(4,1,15.5,.75,.75,.75,"#1e88e5",.25,1)},
 pack:(a,c,f)=>a(0,f>0?-1.6:2.9,5,4,1.6,6,c||"#2e7d32"),
 feather:(a,c)=>{a(.5,.5,13,3,.5,3,c||"#ff4081",.5,1);a(1,.5,16,2,.5,1.5,"#ffeb3b",.5,1)},
 tongs:(a)=>{a(3.6,1.4,2,.25,.25,5,"#9e9e9e",.25);a(-1.6,1,4,1.5,1.5,2.5,"#90caf9")},
 cooler:(a)=>a(3.4,.6,2,2,2.5,2,"#1e88e5"),
 helm:(a,c)=>a(.6,.6,12.5,2.8,2.8,1,c||"#fdd835",.5,1),
 cap:(a,c)=>a(.6,.6,12.5,2.8,2.8,.75,c||"#1a237e",.5,1),
 whistle:(a)=>a(3.4,1,9,.5,.5,.5,"#fdd835",.25),
 pot:(a)=>a(-1.6,1,5,1.5,1.5,1.5,"#8d6e63"),
 wedding:(a)=>a(.3,.3,12,3.4,3.4,.75,"#fafafa",.5,1),
 tray:(a)=>a(3,-.5,7,2,2,.25,"#bdbdbd",.25),
 box2:(a)=>{a(3.4,.6,4,2,2,1.5,"#ffd54f");a(3.7,.9,5.5,1.4,1.4,.5,"#ff7043")}};
/* 持ち物の描き方 */
{const _mp=mbProps;mbProps=function(m,ox,oy,dir){const P=_mp.apply(this,arguments);try{const T=m.T,pp=m.pp||T.pp;if(T.para&&!m.um)umbVox(P,ox,oy,T.para);if(pp){const f=dir===0?1:-1,a=(x,y,z,w,d,h,c,s,top)=>{s=s||.5;for(let i=0;i<w-1e-6;i+=s)for(let j=0;j<d-1e-6;j+=s)for(let k=0;k<h-1e-6;k+=s){const v=[ox+x+i,oy+y+j,z+k,c,undefined,s];if(top)v.um=1;P.push(v)}};[].concat(pp).forEach(q=>{if(typeof q==="function")q(a,f);else{const k=q.split(":");XP[k[0]]&&XP[k[0]](a,k[1],f)}})}}catch(e){}return P}}
/* 止まっている人：向きを固定・歩きのゆれなし */
/* 動物など小さいもの */
const xAni={
 kani:(t)=>{const b=Math.sin(t*16)*.2;return[[-1.5,2,.6,3,2.4,1.2,"#e53935"],[-2.4,2.6+b,.2,.8,.4,.4,"#e53935"],[1.6,2.6-b,.2,.8,.4,.4,"#e53935"],[-2,4.4,.8,1,1,.8,"#e53935"],[1,4.4,.8,1,1,.8,"#e53935"],[-.9,4.2,1.8,.4,.4,.4,"#212121"],[.5,4.2,1.8,.4,.4,.4,"#212121"]]},
 tanuki:(t)=>mbDog(0,2,"#8d6e63",0,t).concat([[-.9,4.6,2.4,1.8,.3,.8,"#3e2723"],[-.5,-.4,1.8,1,.8,1,"#3e2723"]]),
 kamo:(t)=>{const P=[];const d=(y,s)=>{const b=Math.sin(t*14+y)*.15;P.push([-.8*s,y,.3+b,1.6*s,2.4*s,1.2*s,"#8d6e63"],[-.5*s,y+2*s,1.3*s+b,1*s,1*s,1*s,"#5d4037"],[-.3*s,y+3*s,1.5*s+b,.6*s,.6*s,.3*s,"#ffb300"])};d(0,1.2);d(4,.7);d(6.6,.7);d(9.2,.7);return P},
 penguin:(t)=>{const b=Math.sin(t*12)*.25;return[[-1,1,0+Math.abs(b),2,2,3.6,"#263238"],[-.7,2.6,.4+Math.abs(b),1.4,.5,2.6,"#fafafa"],[-.8,1.2,3.6,1.6,1.6,1.4,"#263238"],[-.3,2.7,4,.6,.6,.3,"#ffb300"],[-1.3,1.4+b,1.4,.3,1,1.6,"#263238"],[1,1.4-b,1.4,.3,1,1.6,"#263238"],[-.8,2.4,0,.6,.8,.3,"#ffb300"],[.2,2.4,0,.6,.8,.3,"#ffb300"]]},
 ufo:(t)=>{const P=[[-5,-1,0,10,10,1.4,"#b0bec5"],[-3.5,.5,1.4,7,7,1.2,"#90a4ae"],[-2,2,2.6,4,4,1.6,"#80deea"]];for(let i=0;i<6;i++){const a=i/6*Math.PI*2+t*3;P.push([Math.cos(a)*4-.4,4+Math.sin(a)*4-.4,.2,.8,.8,.6,(i+Math.floor(t*6))%2?"#ffeb3b":"#ff4081",1])}return P},
 uma:(t)=>{const s=Math.sin(t*10)*.6,P=[[-1.5,1,4,3,8,3.5,"#6d4c41"],[-1,8,6,2,2.5,4,"#6d4c41"],[-1,9.6,9,2,3,2,"#6d4c41"],[-.4,1,7.5,.8,1,2,"#3e2723"],[-1.2,1.6+s,0,1,1,4,"#5d4037"],[.4,1.6-s,0,1,1,4,"#5d4037"],[-1.2,7+s,0,1,1,4,"#5d4037"],[.4,7-s,0,1,1,4,"#5d4037"]];return P.concat(mbPer({sk:"#f1c7a0",hr:"#3e2723",cl:"#fafafa",pa:"#5d4037",sit:1,walk:0,dz:5.5}).map(p=>[p[0],p[1]-.4,p[2],p[3],p[4],p[5],p[6]]))},
 robot:(t)=>[[-1.8,1,1,3.6,4,3.2,"#fafafa"],[-1.6,1.2,4.2,3.2,3.6,.4,"#455a64"],[-1.4,4.8,2.6,2.8,.2,.8,"#00e5ff",1],[-2,1.4,0,.6,1.2,1,"#212121"],[1.4,1.4,0,.6,1.2,1,"#212121"],[-2,3.6,0,.6,1.2,1,"#212121"],[1.4,3.6,0,.6,1.2,1,"#212121"],[1,2,4.6,.2,.2,3,"#9e9e9e"],[.8,1.8,7.4,.6,.6,.6,"#ff5252",1]],
 cat:(t,c)=>mbDog(0,3,c||"#f5f5f5",0,t).concat([[-.5,5.4,2.6,.3,.3,.6,c||"#f5f5f5"],[.2,5.4,2.6,.3,.3,.6,c||"#f5f5f5"]])};
/* 乗り物 */
const xVeh={
 combine:()=>[[-3.6,1,0,7.2,12,2.4,"#424242"],[-3,2,2.4,6,9,4,"#e53935"],[-2.6,9,6.4,4.4,3,3.4,"#e53935"],[-2.4,9.4,6.8,4,2.4,2.6,"#9ecbe0"],[-3.8,11,1,7.6,3,2,"#fbc02d"],[2.6,3,6.4,1.4,1.4,4,"#9e9e9e"]],
 yasai:()=>{const P=mbBox(13,6,4.5,"#fafafa",5,"#fafafa");P[0][5]=1.2;P.push([-2.6,1.4,2.2,2.4,2.4,1.6,"#7cb342"],[0,1.4,2.2,2.4,2.4,1.6,"#ff7043"],[-2.6,4,2.2,2.4,2.4,1.6,"#fdd835"],[0,4,2.2,2.4,2.4,1.6,"#8bc34a"]);return P},
 hire:()=>{const P=mbCar(21,7,6,"#111111",{cl:10});P.push([-1,9,7.6,2,1,1,"#ffd54f",1]);return P},
 vision:(a,t)=>{const P=mbBox(24,7.6,11,"#212121",6,"#fafafa");const c=["#ff4081","#00e5ff","#ffeb3b","#76ff03"][Math.floor((t||0)*1.5)%4];P.push([3.85,2,2,.1,15,8,c,1],[-3.95,2,2,.1,15,8,c,1]);return P},
 panya:()=>{const P=mbBox(16,6.6,8,"#ffcc80",5,"#ffcc80");P.push([3.35,2,3.5,.1,8,3,"#6d4c41"],[3.4,2.4,6.6,2.2,7.2,.4,"#e53935"],[3.4,3,4,.1,2,1.2,"#ffe082"]);return P},
 nbus:()=>{const P=[[-4,1,1.4,8,34,11,"#1a237e"],[-4.1,3,6,8.2,30,3.4,"#263238"],[-4.12,1,2,8.2,34,2,"#ffd54f"]];for(const yy of[4,28])for(const xx of[-4.2,3.2])P.push([xx,yy,0,1,2.4,2,"#212121"]);P.push([-3,33.4,2,1.2,.4,.8,"#fff59d",1],[1.8,33.4,2,1.2,.4,.8,"#fff59d",1]);return P},
 jinriki:(a,t)=>{const s=Math.sin((t||0)*9)*.6,P=[[-3,1,2,6,5,4,"#212121"],[-3,1,6,6,1,4,"#b71c1c"],[-3.4,2,0,.6,4,4,"#5d4037"],[2.8,2,0,.6,4,4,"#5d4037"],[-2.8,6,3,.4,7,.4,"#5d4037"],[2.4,6,3,.4,7,.4,"#5d4037"]];return P.concat(mbPer({sk:"#f1c7a0",hr:"#212121",cl:"#212121",pa:"#212121",t,dz:0}).map(p=>[p[0],p[1]+9,p[2],p[3],p[4],p[5],p[6]]),mbPer({sk:"#ffe0c4",hr:"#3e2723",cl:"#f48fb1",pa:"#f48fb1",sit:1,walk:0,dz:2}).map(p=>[p[0],p[1]-1,p[2],p[3],p[4],p[5],p[6]]))},
 kick:(a)=>{const P=[[-.3,0,0,.6,5,.5,"#212121"],[-.3,0,0,.6,1,1,"#212121"],[-.3,4,0,.6,1,1,"#212121"],[-.2,4.4,.5,.4,.4,7,"#9e9e9e"],[-1,4.4,7.2,2,.4,.4,"#212121"]];return P.concat(mbPer({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:mbP(MB_CL,a),pa:"#3b3b4a",walk:0,dz:.5}).map(p=>[p[0],p[1]-2,p[2],p[3],p[4],p[5],p[6]]))}};
const XT=[
 /* 季節 */
 {id:"x_hanami",n:"花見帰りの人",k:"ped",r:2,mo:[3,4],lk:LK(null,["#f8bbd0","#fafafa","#c5e1a5"],5,["#3b3b4a","#c8b38a"]),pp:["sasa"].map(()=>a=>{a(3.6,1.4,6,.25,.25,5,"#6d4c41",.25);a(3,1,10.5,1.5,1.5,1.5,"#f8bbd0")})},
 {id:"x_yukata",n:"浴衣の人",k:"ped",r:2,mo:[7,8],ni:1,lk:LK(null,["#1a237e","#ad1457","#00695c","#f9a825"],5,["#1a237e"]),pp:["fan"]},
 {id:"x_santa",n:"サンタクロース",k:"ped",r:4,mo:[12],lk:LK("男性",["#e53935"],5,["#e53935"],{hair:["#fafafa"],hs:[0]}),pp:["santa"]},
 {id:"x_yukidaruma",n:"雪だるまを運ぶ子",k:"ped",r:3,cond:xSnow,d:1,lk:LK(null,["#4fc3f7","#ff8a65"],5,["#3b3b4a"],{acc:3}),pp:["snowman"]},
 {id:"x_ochiba",n:"落ち葉を掃く人",k:"ped",r:2,mo:[10,11],d:1,lk:LK(null,["#795548","#558b2f"],5,["#5b4a33"]),pp:["broom"]},
 {id:"x_hatsumode",n:"初詣帰りの人",k:"ped",r:2,mo:[1],d:1,lk:LK(null,["#263238","#5d4037","#880e4f"],5,["#263238"]),pp:["hamaya"]},
 {id:"x_koi",n:"こいのぼりを持った子",k:"ped",r:3,mo:[5],d:1,lk:LK("男性",["#42a5f5","#ffca28"],0,["#3b3b4a"]),pp:["koi"]},
 {id:"x_sasa",n:"笹飾りを持った人",k:"ped",r:3,mo:[7],lk:LK(null,["#fafafa","#81d4fa"],0,["#3b3b4a"]),pp:["sasa"]},
 {id:"x_kasou",n:"かぼちゃの仮装の人",k:"ped",r:3,mo:[10],ni:1,lk:LK(null,["#212121","#6a1b9a"],5,["#212121"]),pp:["pumpkin"]},
 {id:"x_sotsugyo",n:"卒業証書の筒を持った学生",k:"ped",r:2,mo:[3],d:1,lk:LK(null,["#1a237e","#212121"],2,["#1a237e"]),pp:["tube"]},
 {id:"x_ichinen",n:"ランドセルの新一年生",k:"ped",r:2,mo:[4],d:1,lk:LK(null,["#fafafa","#ffeb3b"],0,["#3b3b4a"],{bot:1,acc:18}),pp:["back:#c62828"]},
 {id:"x_suika",n:"スイカを抱えた人",k:"ped",r:3,mo:[7,8],d:1,lk:LK(null,["#fafafa","#ffeb3b"],4,["#26c6da"],{bot:1}),pp:["suika"]},
 /* 天気 */
 {id:"x_raincoat",n:"レインコートの子",k:"ped",r:2,cond:xRain,d:1,lk:LK(null,["#fdd835"],5,["#3b3b4a"],{acc:18}),pp:["back:#1e88e5"]},
 {id:"x_ura",n:"傘が裏返った人",k:"ped",r:3,cond:xRain,lk:LK(null,null,2,["#263238"]),pp:["ura:#1565c0"]},
 {id:"x_yukikaki",n:"雪かきの人",k:"ped",r:3,cond:xSnow,d:1,lk:LK(null,["#1565c0","#c62828"],5,["#263238"],{acc:3}),pp:["shovel"]},
 {id:"x_niji",n:"虹を撮る人",k:"ped",r:4,cond:()=>xRain()&&!XNI(),lk:LK(null,null,0,null),pp:["phone"]},
 {id:"x_higasa",n:"日傘の人",k:"ped",r:2,cond:()=>xSum()&&XW()==="sun",d:1,lk:LK("女性",["#fafafa","#f8bbd0","#b3e5fc"],0,["#c8b38a","#fafafa"]),para:"#fff8e1"},
 {id:"x_boushi",n:"帽子を飛ばされた人",k:"ped",r:3,cond:()=>XW()==="cloud",lk:LK(null,null,1,null),pp:["hat"]},
 {id:"x_yukidama",n:"雪玉を持った子",k:"ped",r:2,cond:xSnow,d:1,lk:LK(null,["#ef5350","#7e57c2"],5,["#3b3b4a"],{acc:3}),pp:["snowball"]},
 {id:"x_mushi",n:"虫取り網の子",k:"ped",r:2,mo:[7,8],d:1,a:[4,5,5],lk:LK("男性",["#fafafa","#81c784"],0,["#3b3b4a"],{bot:1,acc:2}),pp:["net"]},
 /* 時間帯 */
 {id:"x_ramen",n:"深夜のラーメン帰り",k:"ped",r:2,cond:()=>{const h=XH();return h>=0&&h<4},a:[1,2],lk:LK(null,null,1,null),pp:["bag:#fafafa"]},
 {id:"x_asagaeri",n:"朝帰りのホスト",k:"ped",r:3,late:1,only:[1],lk:LK("男性",["#212121"],5,["#212121"],{hair:["#e0c068","#c9c9c9"],hs:[10,15]})},
 {id:"x_keibi",n:"夜回りの警備員",k:"ped",r:2,ni:1,lk:LK("男性",["#1a237e"],2,["#1a237e"],{acc:2}),pp:["light"]},
 {id:"x_shihatsu",n:"始発を待つ人",k:"ped",r:2,late:1,a:[2,2],lk:LK(null,null,5,null),pp:["bag:#5d4037"]},
 {id:"x_nightrun",n:"夜のランナー",k:"ped",r:2,ni:1,lk:LK(null,["#cddc39"],6,["#212121"],{bot:1})},
 {id:"x_nightdog",n:"ライトをつけた犬の散歩",k:"ped",r:2,ni:1,dog:"#ffeb3b",lk:LK(null,null,5,null),pp:["light"]},
 {id:"x_karaoke",n:"マイクを持った二次会帰り",k:"ped",r:3,ni:1,only:[1,2],lk:LK(null,null,2,null),pp:["mic"]},
 {id:"x_bento",n:"お弁当を買った会社員",k:"ped",r:2,cond:()=>{const h=XH();return h>=11&&h<14},a:[0,0,2],lk:LK(null,["#fafafa","#90caf9"],2,["#263238"]),pp:["bento"]},
 {id:"x_tsugaku",n:"下校中の小学生",k:"ped",r:2,cond:()=>{const h=XH();return h>=14&&h<18},a:[4,4,3],lk:LK(null,["#fafafa","#ffb74d","#81d4fa"],0,["#3b3b4a"],{bot:1,acc:18}),pp:["back:#212121"]},
 {id:"x_tsuri",n:"早朝の釣り人",k:"ped",r:3,late:1,only:[6],lk:LK("男性",["#558b2f"],5,["#5d4037"],{acc:18}),pp:["rod","cooler"]},
 /* 地域 */
 {id:"x_bodyboard",n:"ボディボードを持った子",k:"ped",r:2,only:[6],mo:[6,7,8,9],d:1,lk:LK(null,["#26c6da","#212121"],4,["#ff7043"],{bot:1}),pp:[a=>a(3.4,-.5,3,.5,3,5,"#e91e63")]},
 {id:"x_combine",n:"コンバイン",k:"car",r:3,l:14,sp:8,only:[5],d:1,mk:xVeh.combine},
 {id:"x_yasai",n:"野菜を積んだ軽トラ",k:"car",r:2,l:13,sp:20,only:[5],mk:xVeh.yasai},
 {id:"x_hire",n:"ハイヤー",k:"car",r:3,l:21,sp:26,only:[0],mk:xVeh.hire},
 {id:"x_vision",n:"大型ビジョンの宣伝トラック",k:"car",r:3,l:24,sp:12,only:[1],mk:xVeh.vision},
 {id:"x_suitcase",n:"キャリーケースの旅行者",k:"ped",r:2,only:[2],lk:LK(null,null,5,null),pp:["suitcase"]},
 {id:"x_ekiben",n:"駅弁を持った人",k:"ped",r:3,only:[2],lk:LK(null,null,1,null),pp:["bento"]},
 {id:"x_yaoya",n:"八百屋の配達自転車",k:"bike",r:2,sp:12,only:[3],d:1,mk:(a)=>mbBike({sk:mbP(MB_SK,a),hr:mbP(MB_HR,a),cl:"#2e7d32",pa:"#3b3b4a",fc:"#90a4ae",box:"#ff8f00"})},
 {id:"x_chindon",ws:4,n:"チンドン屋",k:"ped",r:4,only:[3],d:1,lk:LK(null,["#e53935","#fdd835"],7,["#212121"],{acc:20}),pp:["drum:#fdd835"]},
 {id:"x_ukiwa",n:"浮き輪の子",k:"ped",r:2,only:[6],mo:[7,8],d:1,lk:LK(null,["#ff7043","#26c6da"],4,["#1e88e5"],{bot:1}),pp:["ukiwa"]},
 {id:"x_kani",ws:3,n:"カニ",k:"ped",r:3,cat:1,sp:3,only:[6],mk:(a,t)=>xAni.kani(t)},
 {id:"x_tanuki",ws:6,n:"タヌキ",k:"ped",r:4,cat:1,sp:5,only:[5],ni:1,mk:(a,t)=>xAni.tanuki(t)},
 {id:"x_kamo",ws:3,n:"カルガモの親子",k:"ped",r:4,cat:1,sp:3,only:[4,5],d:1,mk:(a,t)=>xAni.kamo(t)},
 {id:"x_panya",n:"移動販売のパン屋",k:"car",r:3,l:16,sp:12,only:[4],d:1,mk:xVeh.panya},
 {id:"x_nbus",n:"夜行バス",k:"car",r:3,l:36,sp:22,only:[2],ni:1,mk:xVeh.nbus},
 /* レア */
 {id:"x_march",ws:5,n:"マーチングバンド",k:"ped",r:4,grp:4,d:1,lk:LK(null,["#c62828"],5,["#fafafa"],{acc:2}),pp:["drum:#fafafa"]},
 {id:"x_ninja",n:"忍者",k:"ped",r:5,ni:1,lk:LK("男性",["#212121"],6,["#212121"],{hair:["#212121"],acc:6})},
 {id:"x_uchu",n:"宇宙人っぽい人",k:"ped",r:5,ni:1,lk:LK(null,["#cfd8dc"],6,["#cfd8dc"],{skin:["#a5d6a7"],hair:["#a5d6a7"],hs:[14,9]})},
 {id:"x_ufo",ws:6,n:"UFO",k:"ped",r:5,cat:1,sp:8,ni:1,fly:24,mk:(a,t)=>xAni.ufo(t)},
 {id:"x_uma",ws:7,n:"馬に乗った人",k:"ped",r:5,cat:1,sp:6,a:[5,5,5],d:1,mk:(a,t)=>xAni.uma(t)},
 {id:"x_robot",ws:4,n:"配達ロボット",k:"ped",r:4,cat:1,sp:4,a:[0,2],d:1,mk:(a,t)=>xAni.robot(t)},
 {id:"x_samba",ws:5,n:"サンバ隊",k:"ped",r:5,grp:3,mo:[8],lk:LK(null,["#ff4081","#ffeb3b","#00e676"],4,["#ff4081"],{bot:1}),pp:["feather:#ff4081"]},
 {id:"x_kick",n:"電動キックボード",k:"bike",r:3,sp:16,a:[0,1,2],mk:xVeh.kick},
 {id:"x_daidogei",ws:4,n:"ジャグリングする大道芸人",k:"ped",r:4,only:[1,2],lk:LK(null,["#ff7043"],3,["#212121"],{acc:21}),pp:["juggle"]},
 {id:"x_jinriki",n:"人力車",k:"car",r:4,l:16,sp:7,a:[3,3,2],d:1,mk:xVeh.jinriki},
 {id:"x_penguin",ws:3,n:"ペンギン",k:"ped",r:5,cat:1,sp:3,only:[6],mk:(a,t)=>xAni.penguin(t)},
 {id:"x_fusen",ws:4,n:"風船売り",k:"ped",r:4,d:1,lk:LK(null,["#fafafa"],3,["#3b3b4a"],{acc:21}),pp:["balloons"]},
 {id:"x_golden",n:"ゴールデンレトリバーの散歩",k:"ped",r:2,dog:"#e0b060",big:1,a:[4,4],lk:LK(null,null,5,null)},
 {id:"x_skate",n:"スケボーの若者",k:"ped",r:2,a:[0,6],lk:LK("男性",null,8,null,{acc:2}),pp:["board"]},
 {id:"x_tozan",ws:5,n:"大きな荷物の登山者",k:"ped",r:3,only:[5],d:1,lk:LK(null,["#ef6c00","#2e7d32"],5,["#5d4037"],{acc:18}),pp:["pack:#1565c0"]}];
XT.forEach(t=>{if(t.lk){const o=Object.assign({},t.lk);Object.keys(o).forEach(k=>{if(o[k]==null)delete o[k]});MBLK[t.id]=o}if(!t.mk)t.mk=()=>[];if(!t.sp)t.sp=t.k==="car"?24:t.k==="bike"?14:6;MBT.push(t)});
/* 条件（天気・時間など）に合わないものは出さない */
{const _pk=mbPick;mbPick=function(){try{MBT.forEach(t=>{if(t.cond){try{t.sp0=!t.cond()}catch(e){t.sp0=true}}})}catch(e){}return _pk.apply(this,arguments)}}

/* ===== 特殊イベント（店の前にしばらくとどまる） ===== */
const XO={
 cone:()=>[[-.8,3.2,0,1.6,1.6,.4,"#212121"],[-.6,3.4,.4,1.2,1.2,1.4,"#ff6d00"],[-.4,3.6,1.8,.8,.8,1.2,"#fafafa"],[-.25,3.75,3,.5,.5,.6,"#ff6d00"]],
 barrier:()=>[[-.3,1,0,.6,.6,3.5,"#9e9e9e"],[-.3,7,0,.6,.6,3.5,"#9e9e9e"],[-.4,.8,2.4,.8,7,1,"#ffeb3b"],[-.42,2,2.4,.84,1,1,"#212121"],[-.42,4,2.4,.84,1,1,"#212121"],[-.42,6,2.4,.84,1,1,"#212121"]],
 tent:(c)=>[[-4,0,0,.4,.4,8,"#9e9e9e"],[3.6,0,0,.4,.4,8,"#9e9e9e"],[-4,8,0,.4,.4,8,"#9e9e9e"],[3.6,8,0,.4,.4,8,"#9e9e9e"],[-4.4,-.4,8,8.8,8.8,.6,c||"#1e88e5"],[-3.4,2,0,6.8,3,3,"#eceff1"]],
 table:(c)=>[[-2.5,2,3,5,4,.4,c||"#eceff1"],[-2.3,2.2,0,.4,.4,3,"#9e9e9e"],[1.9,2.2,0,.4,.4,3,"#9e9e9e"],[-2.3,5.4,0,.4,.4,3,"#9e9e9e"],[1.9,5.4,0,.4,.4,3,"#9e9e9e"],[-1.8,2.6,3.4,.6,.6,.8,"#fafafa"],[-.6,2.6,3.4,.6,.6,.8,"#fafafa"],[.6,2.6,3.4,.6,.6,.8,"#fafafa"],[-1.2,4,3.4,.6,.6,.8,"#fafafa"]],
 stand:(c)=>[[-.3,3.7,0,.6,.6,9,"#424242"],[-1.4,3,9,2.8,2,2,c||"#fff59d",1]],
 speaker:()=>[[-1.5,2.5,0,3,3,5,"#212121"],[-1,2.4,1,2,.2,2,"#424242"],[-.6,2.4,3.4,1.2,.2,1.2,"#424242"]],
 snowman:()=>[[-2,2,0,4,4,4,"#fafafa"],[-1.5,2.5,4,3,3,3,"#fafafa"],[-.3,2.3,5.4,.6,.4,.6,"#ff6d00"],[-1.6,2.4,7,3.2,3.2,.6,"#c62828"]],
 hanawa:(c)=>[[-.3,3.7,0,.6,.6,6,"#8d6e63"],[-2.5,3.5,6,5,.6,5,c||"#f48fb1"],[-1.5,3.4,7,3,.6,3,"#fafafa"],[-2.2,3.2,5,.4,.4,3,"#8d6e63"],[1.8,3.2,5,.4,.4,3,"#8d6e63"]],
 arch:()=>{const P=[],C=["#e53935","#fdd835","#42a5f5","#ab47bc","#66bb6a"];for(let i=0;i<14;i++){const a=i/13*Math.PI;P.push([-.8,4+Math.cos(a)*8-.8,Math.sin(a)*10,1.6,1.6,1.6,C[i%5]])}return P},
 stall:(c)=>[[-3,1,0,6,8,4,"#8d6e63"],[-3.4,.6,8,6.8,8.8,.6,c||"#e53935"],[-3,1,4,.4,.4,4,"#5d4037"],[2.6,1,4,.4,.4,4,"#5d4037"],[-3,8.6,4,.4,.4,4,"#5d4037"],[2.6,8.6,4,.4,.4,4,"#5d4037"],[-2.6,2,4,5.2,6,.4,"#4fc3f7"],[-.4,3,4.4,.6,.6,.4,"#ff7043"],[1,5,4.4,.6,.6,.4,"#ff7043"]],
 xtree:()=>[[-.5,3.5,0,1,1,3,"#5d4037"],[-3,1,3,6,6,3,"#2e7d32"],[-2,2,6,4,4,3,"#2e7d32"],[-1,3,9,2,2,2,"#2e7d32"],[-.5,3.5,11,1,1,1,"#ffd54f",1],[-2.6,1.4,4,.6,.6,.6,"#e53935",1],[1.8,4,5,.6,.6,.6,"#42a5f5",1],[-1.4,3,7.2,.6,.6,.6,"#fdd835",1]],
 hato:(c,t)=>{const P=[];for(let i=0;i<6;i++){const b=Math.abs(Math.sin((t||0)*5+i))*.4;P.push([-3+(i%3)*2.6,1+Math.floor(i/3)*3,b,1.2,1.6,1,"#90a4ae"],[-2.9+(i%3)*2.6,2.4+Math.floor(i/3)*3,.8+b,.8,.8,.8,"#78909c"])}return P},
 cats:(c,t)=>{const P=[],C=["#f5f5f5","#424242","#ff9800","#8d6e63","#bdbdbd"];for(let i=0;i<5;i++)P.push(...xAni.cat(t*.2+i,C[i]).map(p=>[p[0]-6+i*3,p[1]+(i%2)*3,p[2],p[3],p[4],p[5],p[6]]));return P},
 gomi:(c,t)=>{const P=[[-2,1,0,4,3,2.4,"#37474f"],[-1.6,1.2,2.4,1.4,1.4,1.4,"#eceff1"],[.2,1.6,2.4,1.4,1.4,1.2,"#eceff1"]];for(let i=0;i<3;i++){const b=Math.abs(Math.sin((t||0)*6+i))*.6;P.push([-3+i*2.6,5,b,1.4,2,1.4,"#212121"],[-2.8+i*2.6,6.8,1+b,.8,.6,.6,"#424242"])}return P},
 inoshishi:(c,t)=>{const b=Math.sin((t||0)*10)*.3;return[[-2,1,1.6,4,7,3.4,"#5d4037"],[-1.4,7.6,2,2.8,2.2,2.4,"#4e342e"],[-.6,9.6,2.4,1.2,.6,1,"#3e2723"],[-1.8,1.6+b,0,1,1,1.8,"#3e2723"],[.8,1.6-b,0,1,1,1.8,"#3e2723"],[-1.8,6+b,0,1,1,1.8,"#3e2723"],[.8,6-b,0,1,1,1.8,"#3e2723"]]},
 pony:(c,t)=>{const s=Math.sin((t||0)*6)*.3;return[[-1.2,1,3,2.4,6,2.8,"#d7ccc8"],[-.8,6.4,4.4,1.6,1.8,3,"#d7ccc8"],[-.8,7.4,6.8,1.6,2.4,1.6,"#d7ccc8"],[-.3,1,5.4,.6,6,.8,"#6d4c41"],[-1,1.4,0,.8,.8,3,"#a1887f"],[.2,1.4,0,.8,.8,3,"#a1887f"],[-1,5.6,0,.8,.8,3,"#a1887f"],[.2,5.6,0,.8,.8,3,"#a1887f"],[-.3,.4,3.6+s,.6,.6,2,"#6d4c41"]]},
 ufo:(c,t)=>xAni.ufo(t).map(p=>[p[0],p[1],p[2]+26,p[3],p[4],p[5],p[6],p[7]]),
 mikoshi:()=>[[-3,1,3,6,6,1,"#3e2723"],[-2.4,1.6,4,4.8,4.8,4,"#212121"],[-2.8,1.2,8,5.6,5.6,.8,"#c9a227"],[-1.6,2.4,8.8,3.2,3.2,1.6,"#c9a227"],[-.4,3.6,10.4,.8,.8,1.6,"#ffd54f"],[-5,2.2,3,10,.6,.6,"#8d6e63"],[-5,5.2,3,10,.6,.6,"#8d6e63"],[-2,1.4,6,4,.2,1,"#e53935"]],
 shishi:(c,t)=>{const b=Math.sin((t||0)*8)*.5;return[[-2,5,4+b,4,3,3,"#c62828"],[-1.6,7.6,4.6+b,3.2,.6,1,"#fafafa"],[-1.5,4.8,7+b,1,1,1,"#ffd54f"],[.5,4.8,7+b,1,1,1,"#ffd54f"],[-2.2,0,3,4.4,5,4,"#2e7d32"],[-2.3,.4,3.2,.2,4,3,"#fafafa"]]},
 sheet:()=>[[-4,0,0,8,8,.2,"#42a5f5"],[-2,2,.2,2,1.4,1,"#e53935"],[.6,4,.2,1.4,1.4,.8,"#fafafa"]],
 crane:()=>[[-2,2,0,4,4,2,"#424242"],[-.4,3.6,2,.8,.8,8,"#424242"],[-.4,3.6,10,.8,9,.8,"#424242"],[-1,11.4,9,2,2,1.6,"#212121"],[-.6,10.6,9.4,1.2,.8,.8,"#90caf9"]],
 light:()=>[[-.3,3.7,0,.6,.6,10,"#424242"],[-1.4,3,10,2.8,1.6,2,"#212121"],[-1.2,2.9,10.4,2.4,.2,1.2,"#fffde7",1]],
 cart:(c)=>[[-2,1,1,4,6,3,c||"#ffca28"],[-2.2,.8,4,4.4,6.4,.4,"#e53935"],[-2.4,1.4,0,.6,1.6,1.6,"#212121"],[1.8,1.4,0,.6,1.6,1.6,"#212121"],[-.2,7,1.6,.4,3,.4,"#8d6e63"]],
 bus:(c)=>{const P=[[-4,1,1.4,8,30,10,"#fafafa"],[-4.1,3,6,8.2,26,3,"#90caf9"],[-4.1,1,2,8.2,30,1.6,c||"#e53935"],[-4.12,10,4,.1,6,1.6,c||"#e53935"]];for(const yy of[4,24])for(const xx of[-4.2,3.2])P.push([xx,yy,0,1,2.4,2,"#212121"]);return P},
 hazard:(c,t)=>{const on=Math.floor((t||0)*3)%2;const P=mbCar(18,7,8,c||"#37474f",{cl:10});if(on)P.push([-3.6,16.8,1.6,1,.4,.8,"#ffab00",1],[2.6,16.8,1.6,1,.4,.8,"#ffab00",1],[-3.6,.8,1.6,1,.4,.8,"#ffab00",1],[2.6,.8,1.6,1,.4,.8,"#ffab00",1]);return P},
 sale:()=>[[-2.5,1,0,5,4,3.6,"#a1887f"],[-2.7,.8,3.6,5.4,4.4,.3,"#6d4c41"],[-2,1.4,3.9,1.2,1.2,1,"#7cb342"],[-.4,1.4,3.9,1.2,1.2,1,"#ff7043"],[1,1.6,3.9,1,1,1,"#fdd835"],[-.3,.8,4,.6,.4,4,"#6d4c41"],[-1.6,.6,7.4,3.2,.3,1.6,"#fafafa"]],
 dbox:()=>[[-2,1,0,2.4,2.4,2.4,"#c8a165"],[.6,1.4,0,2.4,2.4,2.4,"#c8a165"],[-.8,1.6,2.4,2.4,2.4,2.4,"#c8a165"],[2,4.4,0,1.6,4,6,"#8d6e63"]],
 board:()=>[[-.3,1,0,.6,.6,6,"#8d6e63"],[-.3,6,0,.6,.6,6,"#8d6e63"],[-.4,.8,3,.8,6,4,"#fafafa"],[-.42,1.6,4.6,.84,2,.8,"#e53935"],[-.42,3.8,4,.84,1.6,1.6,"#1e88e5"]]};
/* イベントの部品：P=人 C=車 O=もの。x は店の正面（道側の壁）からの位置、y は入口からの位置 */
const XC=(id,lane,y,o)=>Object.assign({c:id,lane,y},o||{});
const XPp=(x,y,dd,lk,pp,o)=>Object.assign({p:1,x,y,dd,lk,pp},o||{});
const XOb=(k,x,y,o)=>Object.assign({o:k,x,y},o||{});
const pol=LK("男性",["#1a237e"],2,["#1a237e"],{acc:2}),wk=LK("男性",["#ff8f00"],5,["#455a64"]),sut=LK(null,["#212121"],2,["#212121"]),fff=LK("男性",["#37474f"],5,["#37474f"]);
const onl=(n,x0,y0)=>{const L=[];for(let i=0;i<n;i++)L.push(XPp(x0-(i%2)*2.4,y0+i*3.4,3,null,i%2?["phone"]:null));return L};
const XEV=[
 {id:"jiko",n:"車の事故",r:5,dur:120,lane:1,talk:["さっき外で事故あったね…","店の前、パトカー来てましたね","事故、大丈夫だったのかな"],parts:[XC("sedan",1,-4,{ang:1}),XC("comp",1,14),XC("police",1,34,{fl:1,out:.85}),XC("kyukyu",1,-26,{fl:1,out:.35}),XPp(-24,6,2,pol,["whistle"]),XOb("cone",-24,-12),XOb("cone",-24,26),...onl(3,-11,-6)]},
 {id:"koji",n:"道路工事",r:3,dur:180,d:1,lane:-1,talk:["前の工事、まだやってますね","工事の音、けっこう響きますね"],parts:[XC("shovel",-1,0),XOb("barrier",-17,-14),XOb("barrier",-17,10),XOb("cone",-22,-18),XOb("cone",-22,18),XPp(-15,-4,3,wk,["helm","flag:#e53935"]),XPp(-23,6,0,wk,["helm","shovel"])]},
 {id:"hikkoshi",n:"引っ越しの作業",r:3,dur:120,d:1,lane:-1,talk:["向かい、引っ越しっぽいですね"],parts:[XC("hikkoshi",-1,-6),XOb("dbox",-13,-14),XPp(-12,-6,1,LK("男性",["#1565c0"],0,["#1565c0"],{acc:2}),["box"]),XPp(-11,4,3,LK("男性",["#1565c0"],0,["#1565c0"],{acc:2}),["box"])]},
 {id:"roke",n:"テレビのロケ",r:4,dur:90,d:1,talk:["外でテレビのロケやってましたよ！","さっきのロケ、何の番組だろう"],parts:[XPp(-6,-8,3,LK(null,["#fafafa","#f48fb1"],2,["#212121"]),["mic"]),XPp(-14,-6,1,LK("男性",["#212121"],5,["#212121"],{acc:2}),["cam"]),XPp(-14,-1,1,LK(null,["#455a64"],0,["#3b3b4a"]),[a=>a(3.4,1.2,6,.25,.25,9,"#9e9e9e",.25),a=>a(2.6,.6,15,2,1.2,.8,"#424242",.5,1)]),XOb("light",-8,-16),...onl(3,-11,6)]},
 {id:"demachi",n:"芸能人の出待ち",r:5,dur:60,lane:-1,talk:["外の人だかり、芸能人が来てたらしいですよ！"],parts:[XC("lux",-1,-4),XPp(-14,-2,3,LK("男性",["#212121"],2,["#212121"],{acc:1})),XPp(-14,6,3,LK("男性",["#212121"],2,["#212121"],{acc:1})),...onl(6,-9,-10).map((p,i)=>Object.assign(p,{pp:["phone"]}))]},
 {id:"mikoshi",n:"お祭りの神輿の休憩",r:4,dur:60,mo:[7,8,9],d:1,talk:["お神輿、見ました？","わっしょいって聞こえてましたね"],parts:[XOb("mikoshi",-12,0),...[-6,-2,6,10].map((y,i)=>XPp(-15+(i%2)*6,y,i%2?3:1,LK(null,["#1565c0"],5,["#fafafa"],{acc:20}))),XPp(-8,-10,3,LK(null,["#1565c0"],5,["#fafafa"],{acc:20}),["fan"])]},
 {id:"kyusui",n:"マラソン大会の給水所",r:4,dur:120,d:1,talk:["外、マラソン大会やってますね"],parts:[XOb("table",-12,0),XOb("table",-12,8),XPp(-9,0,3,LK(null,["#4caf50"],0,["#3b3b4a"],{acc:2}),["tray"]),XPp(-9,8,3,LK(null,["#4caf50"],0,["#3b3b4a"],{acc:2}),["tray"]),XOb("cone",-18,-10),XOb("board",-6,-12)]},
 {id:"kitchen",n:"キッチンカーの出店",r:3,dur:180,lane:-1,talk:["前のキッチンカー、いい匂いしてました"],parts:[XC("kitchen",-1,-4),...[0,3,6,9].map((y,i)=>XPp(-13,y-2,2,null,i%2?["phone"]:null)),XOb("board",-10,-12)]},
 {id:"yakiimo",n:"焼き芋屋さんの停車",r:3,dur:60,mo:[11,12,1,2],lane:-1,talk:["焼き芋の匂い、たまらないですね"],parts:[XC("yakiimo",-1,-2),XPp(-13,0,3,null,["bag:#8d6e63"]),XPp(-13,5,3,null)]},
 {id:"enzetsu",n:"選挙の街頭演説",r:3,dur:90,d:1,lane:-1,talk:["外の演説、けっこう大きい声でしたね"],parts:[XC("senkyo",-1,-4),XPp(-12,0,3,LK(null,["#fafafa"],2,["#263238"]),["mic"]),XPp(-12,-6,3,LK(null,["#fafafa"],0,["#263238"]),["flag:#1565c0"]),XPp(-12,6,3,LK(null,["#fafafa"],0,["#263238"]),["flag:#1565c0"]),...onl(2,-8,-12)]},
 {id:"fukubiki",n:"商店街の福引き",r:3,dur:120,only:[3],d:1,talk:["福引き、当たったことあります？"],parts:[XOb("tent",-12,-2,{col:"#e53935"}),XPp(-14,-2,3,LK(null,["#e53935"],5,["#212121"],{acc:20})),...[-10,-7,-4].map(y=>XPp(-9,y,2,null))]},
 {id:"nomikai",n:"飲み会帰りの集団",r:3,dur:40,ni:1,only:[1,2,0],talk:["外の集団、盛り上がってましたね〜"],parts:[...[-6,-3,0,3,6,9].map((y,i)=>XPp(-10-(i%2)*3,y,i%2?3:1,LK(null,null,i%3===0?2:5,null)))]},
 {id:"live",n:"路上ライブ",r:3,dur:90,ni:1,talk:["外で歌ってる人、うまかったです"],parts:[XPp(-8,-2,3,LK(null,["#212121"],5,["#3b3b4a"],{acc:18}),["guitar"]),XOb("speaker",-6,-8),XOb("stand",-6,4,{col:"#fff59d"}),...onl(3,-14,-4).map(p=>Object.assign(p,{dd:1}))]},
 {id:"dance",n:"ストリートダンサーの練習",r:4,dur:90,ni:1,only:[0,1,2],talk:["外のダンス、キレキレでしたね"],parts:[...[-6,0,6].map((y,i)=>XPp(-10,y,i%2?3:1,LK(null,["#212121","#ff4081","#00e5ff"],6,["#212121"],{acc:2}),null,{bob:1})),XOb("speaker",-6,-12)]},
 {id:"maedori",n:"ウェディングの前撮り",r:4,dur:60,d:1,talk:["外で結婚式の写真撮ってましたよ、素敵！"],parts:[XPp(-10,-2,3,LK("女性",["#fafafa"],0,["#fafafa"],{bot:2}),["wedding"]),XPp(-10,2,3,LK("男性",["#212121"],2,["#212121"])),XPp(-20,0,1,LK(null,["#455a64"],5,["#3b3b4a"],{acc:2}),["cam"]),XOb("light",-14,-8)]},
 {id:"cosplay",n:"コスプレの撮影会",r:4,dur:90,only:[1,2],talk:["外のコスプレ、気合い入ってましたね"],parts:[XPp(-8,-4,3,LK("女性",["#7e57c2"],0,["#7e57c2"],{bot:2,hair:["#4fc3f7"],hs:[6]})),XPp(-8,2,3,LK(null,["#c62828"],5,["#212121"],{hair:["#fafafa"],hs:[15]})),XPp(-16,-4,1,null,["cam"]),XPp(-16,2,1,null,["cam"])]},
 {id:"shugaku",n:"修学旅行生の集合",r:3,dur:40,d:1,only:[2,3],talk:["修学旅行生、いっぱいいましたね"],parts:[XPp(-8,-12,3,LK(null,["#455a64"],5,["#3b3b4a"]),["flag:#fdd835"]),...[-6,-3,0,3,6,9,12].map((y,i)=>XPp(-11-(i%2)*2.6,y,1,LK(null,["#1a237e"],5,["#1a237e"])))]},
 {id:"kenketsu",n:"献血バス",r:3,dur:180,d:1,lane:-1,talk:["前で献血やってましたね"],parts:[XOb("bus",-20,-14,{col:"#e53935",lane:-1}),XPp(-11,0,3,LK(null,["#fafafa"],0,["#3b3b4a"]),["sign:#e53935"])]},
 {id:"hashigo",n:"消防のはしご車の点検",r:4,dur:90,d:1,lane:-1,talk:["消防車来てましたけど、点検だったみたいです"],parts:[XC("fire",-1,-8,{fl:1}),XPp(-13,-4,3,fff,["helm:#fafafa"]),XPp(-13,4,1,fff,["helm:#fafafa"])]},
 {id:"torishimari",n:"交通の取り締まり",r:3,dur:120,lane:1,talk:["外、取り締まりやってましたよ"],parts:[XC("police",1,8,{fl:1}),XPp(-24,-4,2,pol,["flag:#e53935"]),XOb("cone",-24,-14),XOb("cone",-24,22)]},
 {id:"gas",n:"ガス管の点検",r:3,dur:90,d:1,lane:-1,parts:[XC("wagon",-1,-4),XOb("cone",-16,-10),XOb("cone",-16,12),XPp(-14,0,3,wk,["helm","clip"])]},
 {id:"sentei",n:"街路樹の剪定",r:3,dur:120,d:1,only:[0,4],lane:1,parts:[XC("truck",1,-4),XPp(-36,2,1,wk,["helm"]),XPp(-34,-8,1,wk,["helm","broom"]),XOb("cone",-30,-16),XOb("cone",-30,22)]},
 {id:"gomihiroi",n:"ゴミ拾いボランティア",r:3,dur:60,d:1,talk:["外でゴミ拾いしてる人たちがいましたね"],parts:[...[-8,-3,2,7,12].map((y,i)=>XPp(-10-(i%2)*3,y,i%2?0:2,LK(null,["#cddc39"],5,["#3b3b4a"],{acc:2}),["tongs"]))]},
 {id:"tissue",n:"ティッシュ配り",r:3,dur:120,only:[0,1,2],parts:[XPp(-8,-4,3,LK(null,["#e53935","#1e88e5"],5,["#212121"],{acc:2}),["tissue"]),XPp(-8,8,3,LK(null,["#e53935","#1e88e5"],5,["#212121"],{acc:2}),["tissue"])]},
 {id:"anketo",n:"街頭アンケート",r:3,dur:60,d:1,parts:[XPp(-9,0,3,LK(null,["#fafafa"],2,["#263238"]),["clip"]),XPp(-12,2,1,null)]},
 {id:"kaiten",n:"向かいの店の開店祝い",r:4,dur:180,d:1,talk:["向かいのお店、新しくオープンしたみたいですね"],parts:[XOb("hanawa",-40,-8,{col:"#f48fb1"}),XOb("hanawa",-40,-2,{col:"#fff59d"}),XOb("hanawa",-40,4,{col:"#ce93d8"}),XOb("arch",-41,-14),XPp(-37,10,1,LK(null,["#212121"],2,["#212121"]),["tissue"])]},
 {id:"jaf",n:"車の故障（ロードサービス待ち）",r:4,dur:120,lane:1,talk:["前で車が止まってましたね、故障かな"],parts:[XOb("hazard",-28,-6,{lane:1}),XPp(-34,0,1,null,["phone"]),XC("wrecker",1,-36,{in:.5,fl:1}),XOb("cone",-28,-14)]},
 {id:"panku",n:"タイヤのパンク",r:3,dur:60,lane:-1,parts:[XC("comp",-1,-4),XPp(-14,-2,3,null,["phone"]),XOb("cone",-20,-14)]},
 {id:"maigo",n:"迷子の犬さがし",r:3,dur:60,parts:[XPp(-9,-2,3,null,["sign:#fafafa"]),XPp(-36,4,1,null,["sign:#fafafa"])]},
 {id:"yukidaruma",n:"雪だるまづくり",r:3,dur:120,cond:xSnow,d:1,talk:["前で雪だるま作ってる子たち、かわいかったです"],parts:[XOb("snowman",-36,0),...[-4,4,8].map((y,i)=>XPp(-34+(i%2)*2,y,i%2?3:2,LK(null,["#ef5350","#42a5f5","#ffca28"][i],5,["#3b3b4a"],{acc:3})))]},
 {id:"hanami",n:"お花見の場所取り",r:3,dur:180,mo:[3,4],d:1,only:[4,5],parts:[XOb("sheet",-38,-2),XPp(-38,-4,1,LK(null,["#1a237e"],2,["#1a237e"]),["phone"])]},
 {id:"kingyo",n:"夏祭りの屋台",r:4,dur:120,mo:[7,8],ni:1,only:[3,4],talk:["外の屋台、夏祭りって感じですね"],parts:[XOb("stall",-38,-4,{col:"#e53935"}),XOb("stall",-38,8,{col:"#1e88e5"}),...[-2,3,9].map((y,i)=>XPp(-34,y,3,LK(null,["#1a237e","#ad1457","#00695c"][i],5,["#1a237e"]),["fan"]))]},
 {id:"halloween",n:"ハロウィンの仮装集団",r:4,dur:60,mo:[10],ni:1,talk:["外の仮装、すごかったですね！"],parts:[...[-8,-4,0,4,8,12].map((y,i)=>XPp(-10-(i%2)*3,y,i%2?3:1,LK(null,["#212121","#6a1b9a","#ff6f00"][i%3],5,["#212121"]),i%2?["pumpkin"]:["flag:#6a1b9a"]))]},
 {id:"seikatai",n:"クリスマスの聖歌隊",r:4,dur:60,mo:[12],ni:1,talk:["聖歌隊の歌、きれいでしたね"],parts:[XOb("xtree",-38,0),...[-8,-4,4,8,12].map((y,i)=>XPp(-35,y,1,LK(null,i%2?["#c62828"]:["#fafafa"],5,["#212121"])))]},
 {id:"shishimai",n:"獅子舞",r:5,dur:40,mo:[1],d:1,talk:["獅子舞に頭かんでもらいたかった〜"],parts:[XOb("shishi",-12,-2),XPp(-12,-8,3,LK(null,["#1a237e"],5,["#fafafa"],{acc:20}),["drum:#c62828"]),...onl(2,-8,4)]},
 {id:"yukikaki",n:"みんなで雪かき",r:3,dur:90,cond:xSnow,d:1,parts:[...[-6,0,6].map((y,i)=>XPp(-10-(i%2)*2,y,i%2?0:2,LK(null,["#1565c0","#c62828","#2e7d32"][i],5,["#263238"],{acc:3}),["shovel"]))]},
 {id:"hato",n:"ハトにエサやり",r:3,dur:60,d:1,only:[0,2,3],parts:[XOb("hato",-12,4),XPp(-10,-2,0,LK(null,null,5,null,{acc:17}),["bag:#a1887f"])]},
 {id:"neko",n:"猫の集会",r:4,dur:90,ni:1,only:[3,4,5],talk:["外で猫がいっぱい集まってましたよ"],parts:[XOb("cats",-38,0)]},
 {id:"karasu",n:"カラスがゴミをあさる",r:3,dur:40,only:[4,3],parts:[XOb("gomi",-38,-2)]},
 {id:"inoshishi",n:"イノシシが出た",r:5,dur:40,only:[5],talk:["さっきイノシシいましたよね！？"],parts:[XOb("inoshishi",-36,0),XPp(-34,-8,1,LK("男性",["#455a64"],5,["#5d4037"],{acc:2}),["net"]),XPp(-34,10,1,LK("男性",["#455a64"],5,["#5d4037"],{acc:2}))]},
 {id:"beach",n:"ビーチクリーン",r:3,dur:90,only:[6],d:1,parts:[...[-6,0,6,12].map((y,i)=>XPp(-36,y,i%2?0:2,LK(null,["#26c6da","#ffca28"][i%2],0,["#3b3b4a"],{acc:18}),["tongs"]))]},
 {id:"tsuri",n:"釣り大会の帰り",r:3,dur:40,only:[6],parts:[...[-4,2,8].map((y,i)=>XPp(-10,y,3,LK("男性",["#558b2f"],5,["#5d4037"],{acc:18}),i?["rod"]:["rod","cooler"]))]},
 {id:"mujin",n:"野菜の無人販売所",r:3,dur:240,only:[5],d:1,parts:[XOb("sale",-38,0),XPp(-35,6,1,null,["bag:#7cb342"])]},
 {id:"tractor",n:"トラクター渋滞",r:4,dur:30,only:[5],lane:1,talk:["トラクターの後ろ、車が並んでましたね"],parts:[XC("tractor",1,6),XC("ktr",1,-12),XC("kei",1,-30)]},
 {id:"bokin",n:"駅前の募金活動",r:3,dur:120,only:[2],d:1,parts:[...[-6,0,6].map(y=>XPp(-9,y,3,LK(null,["#fdd835"],0,["#3b3b4a"],{acc:2}),["box2"]))]},
 {id:"yatai",n:"屋台ラーメンの開店",r:4,dur:180,ni:1,only:[1,2],talk:["外の屋台ラーメン、帰りに寄ろうかな"],parts:[XOb("stall",-36,0,{col:"#c62828"}),...[-4,2].map(y=>XPp(-34,y,2,null))]},
 {id:"limo",n:"リムジンで結婚式の一行",r:5,dur:40,d:1,lane:-1,talk:["リムジン！結婚式だったんですかね"],parts:[XC("limo",-1,-10),XPp(-12,-2,3,LK("女性",["#fafafa"],0,["#fafafa"],{bot:2}),["wedding"]),XPp(-12,2,3,LK("男性",["#212121"],2,["#212121"])),...[-10,8,12].map(y=>XPp(-9,y,3,LK(null,["#212121","#f48fb1","#90caf9"],2,["#212121"]),["phone"]))]},
 {id:"eiga",n:"映画の撮影",r:5,dur:120,d:1,talk:["外で映画の撮影してましたよ！","俳優さん、オーラありましたね"],parts:[XOb("crane",-18,-6),XPp(-14,-12,1,LK("男性",["#212121"],5,["#212121"],{acc:21}),["sign:#212121"]),XPp(-8,0,3,LK(null,["#fafafa"],2,["#263238"])),XPp(-8,4,3,LK(null,["#c62828"],0,["#3b3b4a"])),XPp(-16,8,1,null,["cam"]),XOb("light",-6,12),XOb("cone",-18,16)]},
 {id:"ufo",n:"UFOの目撃騒ぎ",r:5,dur:20,ni:1,talk:["さっきの光るの、UFOですよね！？","空になんか浮いてましたよね…"],parts:[XOb("ufo",-26,0),...onl(5,-10,-8).map(p=>Object.assign(p,{pp:["phone"],dd:3}))]},
 {id:"pony",n:"ポニーのお散歩",r:4,dur:60,d:1,only:[4,5],talk:["外にポニーいましたよ！かわいい"],parts:[XOb("pony",-12,0),XPp(-12,-6,0,LK(null,["#5d4037"],5,["#3b3b4a"],{acc:17})),...[6,10].map(y=>XPp(-9,y,2,LK(null,["#ffb74d","#81d4fa"],0,["#3b3b4a"],{bot:1})))]}];
/* 部品を通行人として置く */
function xvT(id){return MBT.find(t=>t.id===id)}
function xLook(lk){const c=mbLook({id:"__x"},Math.random()*9);if(lk){const o=Object.assign({},lk);if(o.sex){c.sex=o.sex;const L=o.sex==="女性"?MB_HSF:MB_HSM;if(c.sex==="男性"&&c.bot===2)c.bot=0;if(!o.hs)c.hs=L[Math.floor(Math.random()*L.length)]}["shirt","pants","hair","skin"].forEach(k=>{if(o[k])c[k]=o[k][Math.floor(Math.random()*o[k].length)]});["top","bot","acc"].forEach(k=>{if(o[k]!=null)c[k]=o[k]});if(o.hs)c.hs=o.hs[Math.floor(Math.random()*o.hs.length)];if(c.sex==="男性"&&c.bot===2)c.bot=0}c.h2=0;return c}
const XEVT={per:{id:"__xp",n:"",k:"ped",r:0,sp0:1,sp:0,mk:()=>[]}};
function xFlash(base){return{id:"__xf_"+base.id,n:base.n,k:"ped",cat:1,sp0:1,sp:base.sp,l:base.l,mk:(a,t)=>{const P=base.mk(a,t).map(p=>p.slice());const on=Math.floor((t||0)*4)%2,l=base.l||18;P.push([-1.8,l*.45,base.id==="police"?7.6:(base.id==="kyukyu"?10:9.6),1.6,1.2,.9,on?"#ff1744":"#7f0000",1],[.2,l*.45,base.id==="police"?7.6:(base.id==="kyukyu"?10:9.6),1.6,1.2,.9,on?"#2979ff":"#ff1744",1]);return P}}}
function xObjT(k,c){return{id:"__xo_"+k,n:"",k:"ped",cat:1,sp0:1,sp:0,l:8,mk:(a,t)=>(XO[k](c,t)||[]).map(p=>[p[0],p[1]-4,p[2],p[3],p[4],p[5],p[6],p[7]])}}
function xEvStart(ev){const g=mbGeo(),L=g.L,ys=FLT.map(t=>t[1]),Ym=15;MB.xev={ev,t0:R.t,ents:[]};
 ev.parts.forEach((q,i)=>{let m=null;
  if(q.c){const base=xvT(q.c);if(!base)return;const T=q.fl?xFlash(base):base,s=q.lane;m={T,s,lane:s,x:s>0?L-28:L-20,y:Ym+q.y,a:3+i,t:Math.random()*3,sp:0,tag:1,seen:1,ev:1,q};}
  else if(q.o){const T=xObjT(q.o,q.col);m={T,s:1,x:L+q.x,y:Ym+q.y,a:1,t:Math.random()*3,sp:0,tag:1,seen:1,ev:1,q}}
  else if(q.p){const T=Object.assign({},XEVT.per,{pp:q.pp});m={T,c:xLook(q.lk),s:1,x:L+q.x,y:Ym+q.y,a:1,t:0,sp:0,tag:1,seen:1,ev:1,dd:q.dd,q,face:1}}
  if(m){m.hid=q.in?1:0;MB.xev.ents.push(m);if(!m.hid)MB.L.push(m)}});
 G.mbS=G.mbS||{};const k="ev:"+ev.id,first=!G.mbS[k];G.mbS[k]=(G.mbS[k]||0)+1;const lb=["","","","★3","★4","★5"][ev.r];try{log("🚨 "+lb+" 店の前で「"+ev.n+"」"+(first?"（街で見たものに記録）":""));mbBand("🚨 "+lb+" 店の前で「"+ev.n+"」")}catch(e){}}
function xEvTick(){const X=MB.xev;if(!X)return;const ev=X.ev,f=(R.t-X.t0)/ev.dur;
 X.ents.forEach(m=>{const q=m.q;if(m.hid&&q.in!=null&&f>=q.in){m.hid=0;MB.L.push(m)}if(!m.gone&&q.out!=null&&f>=q.out)xLeave(m)});
 if(f>=1||R.phase!=="run"){X.ents.forEach(m=>{if(!m.gone)xLeave(m)});MB.xev=null;X.end=R.t;MB.xLast=X}
 /* お客さんのひとこと */
 if(ev.talk&&R.phase==="run"&&Math.random()<.0025){const c=R.people.filter(p=>p.st==="sit"&&!spx(p.c));if(c.length)try{say(rnd(c),rnd(ev.talk))}catch(e){}}}
function xLeave(m){m.gone=1;if(m.hid){return}if(m.q.c){m.sp=(m.T.sp||24)*.8;m.T.sp0=1}else if(m.q.p){m.ev=0;m.dd=null;m.face=0;m.s=Math.random()<.5?1:-1;m.sp=9+Math.random()*4;m.x=Math.min(m.x,mbGeo().L-6);if(m.x<mbGeo().L-14&&m.x>mbGeo().L-34)m.x=mbGeo().L-11}else{MB.L=MB.L.filter(o=>o!==m)}}
/* 1日の予定：営業開始の時に決める */
function xEvPlan(){MB.xev=null;MB.xPlan=null;if(Math.random()>.7)return;const z=typeof areaZ==="function"?areaZ():0,mo=XS();
 const ok=XEV.filter(e=>(!e.only||e.only.includes(z))&&(!e.mo||e.mo.includes(mo))&&(!e.cond||e.cond()));const W=ok.map(e=>[e,[0,0,0,3,2,1.5][e.r]]);let s=W.reduce((a,b)=>a+b[1],0),r=Math.random()*s,pick=null;for(const[e,w]of W){r-=w;if(r<=0){pick=e;break}}if(!pick)return;
 const o=G.open*60,c=G.close*60;let lo=o+30,hi=c-Math.min(pick.dur,180)-30;if(pick.ni){lo=Math.max(lo,19*60);if(c<19*60)hi=-1}if(pick.d)hi=Math.min(hi,17*60);if(hi<=lo)return;MB.xPlan={ev:pick,at:lo+Math.random()*(hi-lo)}}
function xEvCheck(){if(!MB.xPlan||MB.xev||R.phase!=="run"||!mbOn()||R.cine)return;if(R.t<MB.xPlan.at)return;const ev=MB.xPlan.ev;MB.xBlock=ev.lane||0;
 if(ev.lane&&MB.L.some(m=>!m.ev&&m.s===ev.lane&&(m.T.k==="car"||m.T.k==="bike")))return;MB.xPlan=null;MB.xBlock=0;xEvStart(ev)}
{const _st5=start;start=function(){const r=_st5.apply(this,arguments);try{if(R.phase==="run")xEvPlan()}catch(e){}return r};$("#go").onclick=start}
{const _tk5=tick;tick=function(now){try{xEvCheck();xEvTick()}catch(e){}return _tk5.apply(this,arguments)}}
/* 事故などで止まっている車線には車を出さない・数えない */
{const _sp=mbSpawn;mbSpawn=function(){const X=MB.xev,keep=MB.L.filter(m=>m.ev);MB.L=MB.L.filter(m=>!m.ev);const n0=MB.L.length;const r=_sp.apply(this,arguments);try{const ln=(X&&X.ev.lane)||MB.xBlock||0;if(ln){MB.L=MB.L.filter((m,i)=>!(i>=n0&&m.s===ln&&(m.T.k==="car"||m.T.k==="bike")))}}catch(e){}MB.L.forEach((m,i)=>{if(i>=n0&&m.T.ws&&m.T.k==="ped")m.sp=m.T.ws*(.85+Math.random()*.3)});MB.L=MB.L.concat(keep);return r}}
