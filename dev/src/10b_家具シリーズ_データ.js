/* ===== 🪑 家具シリーズ：データ（セーブを読む前に置物の一覧へ足しておく） =====
   1シリーズ10個。1個目だけ最初から買える。2個目からは「前の置物を買った」＋条件で解放。
   10個そろうとボーナス（非売品）がもらえる。見た目は 33_家具シリーズ_モデル.js（dev/designs から自動生成） */
const SPR=[3000,4000,5500,7000,9000,11000,14000,17000,21000,26000];
const SCOND=[null,["fame",10],["fame",20],["fame",30],["star",30],["fame",50],["star",45],["skill",40],["fame",80],["star",80]];
const STV=[1,1,1,2,2,3,3,3,4,5];
/* 新しく作った置物・壁アイテム：[id, 名前, モデル（モジュール.キー）／壁は "w:画像キー"] */
const SNEW=[
 ["wp_s_guitar","壁かけのギター","w:guitar"],
 ["s_sansev","サンスベリア","plants.sansevieria"],["s_pachira","パキラ","plants.pachira"],["wp_s_pothos","ポトスのハンギング","w:pothos"],["s_rubber","ゴムの木","plants.rubber"],["s_monstera","モンステラ","plants.monstera"],["s_umbel","フィカス・ウンベラータ","plants.umbellata"],["s_olive","オリーブの木","plants.olive"],
 ["s_enoki","えのきの瓶","kinoko.enoki"],["s_mbasket","マッシュルームのかご","kinoko.basket"],["s_kstool","キノコのスツール","kinoko.stool"],["s_klamp","キノコのランプ","kinoko.lamp"],["s_beni","ベニテングタケ","kinoko.benitengu"],["s_shiitake","しいたけの原木","kinoko.shiitake"],["wp_s_kwall","キノコの壁飾り","w:kwall"],["s_kshelf","キノコの本棚","kinoko.shelf"],
 ["s_medal","メダルゲーム","gesen.medal"],["s_punch","パンチングマシン","gesen.punch"],["s_rhythm","リズムゲーム筐体","gesen.rhythm"],
 ["s_presents","プレゼントの山","party.presents"],["s_champt","シャンパンのテーブル","party.champ"],
 ["s_meteor","隕石の展示台","space.meteor"],["s_rocket","ロケットの模型","space.rocket"],["s_telescope","天体望遠鏡","space.telescope"],["s_rover","月面探査車","space.rover"],
 ["s_tea","真鍮のティーセット","alt.tea"],["wp_s_mashra","アーチ窓の格子","w:mashrabiya"],["s_carpet","魔法のじゅうたん","alt.carpet"],["s_pillarA","青いモザイクタイルの柱","arab.pillarA"],["s_pillarB","砂岩のアラベスク柱","arab.pillarB"],
 ["s_penlight","ペンライトの束","otaku.penlight"],["s_tsumige","積みゲーの山","otaku.games"],["wp_s_ctrl","コントローラーの壁掛けラック","w:controllers"],["s_gchair","ゲーミングチェア","otaku.gchair"],["s_cardtbl","カードゲームのテーブル","otaku.cardtable"],["s_pcdesk","パソコンデスク","otaku.desk"],["s_figcase","フィギュアのガラスケース","otaku.figcase"],["s_robo","ロボの大きな模型","otaku.robo"],
 ["s_clantern","中華ランタン","china.lantern"],["s_kanpo","漢方の引き出し棚","china.kanpo"],["wp_s_roundwin","丸窓","w:roundwin"],["s_panda","パンダのぬいぐるみ","china.panda"],["s_ume","梅の木の鉢植え","china.ume"],["s_gong","銅鑼","china.gong"],["s_lazy","回転テーブル","china.lazysusan"],["s_dragon","龍の置物","china.dragon"],
 ["s_chochin","提灯お化け","youkai.chochin"],["wp_s_ofuda","お札","w:ofuda"],["s_karakasa","からかさお化け","youkai.karakasa"],["s_zashiki","座敷わらしの人形","youkai.zashiki"],["s_bakeneko","化け猫の置物","youkai.bakeneko"],["s_kitsune","狐の像","youkai.kitsune"],["s_kappa","河童の置物","youkai.kappa"],["s_ohaka","お墓","youkai.ohaka"],["s_toro","朱塗りの灯籠","youkai.onibi"],
 ["s_wakame","ワカメ","aqua.wakame"],["s_upa","ウーパールーパーの水槽","aqua.upa"],["s_kame","カメの水槽","aqua.kame"],["s_kuma","クマノミとイソギンチャク","aqua.kumanomi"],["s_suisou","水草水槽","aqua.suisou"],["s_tatsu","タツノオトシゴの水槽","aqua.tatsu"],["s_nettai","熱帯魚の水槽","aqua.nettai"],["s_kurage","クラゲの水槽","aqua.kurage"],
 ["s_lyre","竪琴","greek.lyre"],["s_pithos","オリーブオイルの大がめ","greek.pithos"],["s_stairs","白い階段と植木鉢","greek.stairs"],["wp_s_santo","サントリーニ風の青い窓","w:santowin"],["s_door","青い扉","greek.door"],["s_helmet","コリント式の兜","greek.helmet"],["wp_s_medusa","メデューサの盾","w:medusa"],["s_bust","大理石の胸像","greek.bust2"],["s_trojan","トロイの木馬の模型","greek.trojan"],
 ["s_cone","カラーコーン","street.cone"],["s_trash","ゴミ箱とポリバケツ","street.trash"],["s_sign","道路標識の柱","street.sign"],["s_hydrant","消火栓","street.hydrant"],["wp_s_skate","スケボーの壁掛け","w:skate"],["wp_s_caps","キャップの壁掛けラック","w:caps"],["s_drum","ドラム缶のテーブル","street.drum"],["s_fence","金網フェンス","street.fence"],["s_bmx","BMX","street.bmx"],
];
/* シリーズ。it＝並び順（1〜10個目）、bo＝ボーナス[id,名前,モデル]、rel＝関連アイテム（お店の壁アイテム・数には入らない） */
const SER=[
 {id:"wa",n:"和風",tag:"asian",it:["maneki","lantern","daruma","bonsai","wagasa","teaset","bamboo","hibachi","toro","koi"],bo:["sb_kare","枯山水の庭","kare.main"],rel:["wp_scroll"]},
 {id:"music",n:"音楽",tag:"party",it:["guitar","speaker","radio","record","wp_s_guitar","mic","amp","gdisc","jukebox","piano"],bo:["sb_turn","ターンテーブル卓","turn.main"],rel:["wp_flyer"]},
 {id:"plant",n:"植物",tag:"asian",it:["plant","s_sansev","s_pachira","wp_s_pothos","s_rubber","s_monstera","s_umbel","vase","fwall","s_olive"],bo:["sb_palm","ヤシの木","plants.palm"],rel:[]},
 {id:"kinoko",n:"キノコ",tag:"fantasy",it:["mush","s_enoki","s_mbasket","s_kstool","s_klamp","s_beni","s_shiitake","wp_s_kwall","s_kshelf","mushhouse"],bo:["sb_gkinoko","巨大ベニテングタケ","kinoko.giant"],rel:[]},
 {id:"magic",n:"魔法",tag:"fantasy",it:["lamp","hourglass","crystal","mlamp","cage","grimoire","fbook","cauldron","ccluster","skull"],bo:["sb_mahou","光る魔法陣","mahou.main"],rel:["wp_magic"]},
 {id:"gesen",n:"ゲーセン",tag:"subculture",it:["gacha","pixsign","gneon","tvgame","s_medal","arcade","s_punch","s_rhythm","crane","monitor"],bo:["sb_hockey","エアホッケー台","gesen.hockey"],rel:["wp_game"]},
 {id:"celeb",n:"セレブ",tag:"luxury",it:["candle","clock","stanch","curtain","gmirror","pillar","p_gold","fountain","crown","champ"],bo:["sb_lion","黄金のライオン像","lion.main"],rel:["wp_art"]},
 {id:"party",n:"パーティー",tag:"party",it:["balloon","barch","neon","flamingo","s_presents","karaoke","s_champt","smoke","vending","p_neon"],bo:["sb_wheel","ネオンの観覧車","party.wheel"],rel:[]},
 {id:"space",n:"宇宙",tag:"fantasy",it:["globe","s_meteor","s_rocket","alien","s_telescope","saturn","s_rover","planet","ufo","moon"],bo:["sb_lander","月面の着陸船","space.lander"],rel:["wp_star"]},
 {id:"arab",n:"アラビアン",tag:"asian",it:["rug","s_tea","wp_s_mashra","s_carpet","wagon","s_pillarA","s_pillarB","p_ruin","gold","sphinx"],bo:["sb_oasis","オアシスの泉","arab.oasis"],rel:[]},
 {id:"otaku",n:"オタク部屋",tag:"subculture",it:["manga","s_penlight","s_tsumige","wp_s_ctrl","plamo","s_gchair","s_cardtbl","s_pcdesk","s_figcase","s_robo"],bo:["sb_robobust","巨大ロボの胸像","otaku.robobust"],rel:["wp_anime"]},
 {id:"china",n:"中華",tag:"asian",it:["s_clantern","s_kanpo","wp_s_roundwin","s_panda","s_ume","s_gong","screen","p_vermil","s_lazy","s_dragon"],bo:["sb_gate","中華の門","china.gate"],rel:["wp_kungfu","wp_champ"]},
 {id:"youkai",n:"妖怪",tag:"asian",it:["s_chochin","wp_s_ofuda","s_karakasa","s_zashiki","s_bakeneko","s_kitsune","s_kappa","s_ohaka","s_toro","torii"],bo:["sb_raiko","雷のマークの和太鼓","youkai.raiko"],rel:[]},
 {id:"aqua",n:"アクアリウム",tag:"fantasy",it:["goldfish","s_wakame","s_upa","s_kame","s_kuma","s_suisou","s_tatsu","s_nettai","s_kurage","aqua"],bo:["sb_shark","サメの大水槽","aqua.same"],rel:[]},
 {id:"greek",n:"ギリシャ",tag:"luxury",it:["s_lyre","s_pithos","s_stairs","wp_s_santo","s_door","s_helmet","wp_s_medusa","s_bust","s_trojan","p_marble"],bo:["sb_parthenon","パルテノン神殿の模型","greek.parthenon"],rel:[]},
 {id:"street",n:"ストリート",tag:"subculture",it:["s_cone","s_trash","s_sign","s_hydrant","wp_s_skate","wp_s_caps","s_drum","s_fence","s_bmx","rack"],bo:["sb_phone","公衆電話ボックス","street.phone"],rel:["wp_neon"]},
];
/* 虎虎水煙店シリーズ：全部が特殊な条件で手に入る（お店では買えない）。中身はあとから1つずつ足す */
const STORA={id:"tora",n:"虎虎水煙店",it:["wp_toraneon","wp_torascroll","wp_torarug","wp_figcase"]};
const SERI={};SER.forEach(s=>SERI[s.id]=s);
/* 置物・壁アイテムの一覧に反映 */
{const NW={};SNEW.forEach(a=>NW[a[0]]=a);
 SER.forEach(s=>{s.it.forEach((id,i)=>{const base={p:SPR[i],t:{[s.tag]:STV[i]},u:["ser",s.id,i]};
  if(id.startsWith("wp_")){let x=WP.find(q=>q.id===id);if(!x&&NW[id]){x={id,n:NW[id][1],img:"",iw:1,ih:1,wk:NW[id][2].slice(2)};WP.push(x)}if(x)Object.assign(x,base)}
  else{let x=DEC.find(q=>q.id===id);if(!x&&NW[id]){x={id,n:NW[id][1],m:NW[id][2]};DEC.push(x)}if(x)Object.assign(x,base)}});
  const[bid,bn,bm]=s.bo;if(!DEC.some(q=>q.id===bid))DEC.push({id:bid,n:bn,p:0,t:{[s.tag]:6},u:["sbon",s.id],m:bm,bonus:1})});
 {const d=DEC.find(q=>q.id==="dj");if(d)d.hide=1}}
