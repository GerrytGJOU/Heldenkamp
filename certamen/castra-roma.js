/* ============================================================================
   CASTRA HEROUM — ROMA UITGEBOUWD (stad met vijf binnenruimtes)
   ----------------------------------------------------------------------------
   Roma is 72×54 tegels. Langs de Via Sacra (de dwarsstraat) staan vier tenten met een
   deur, en ten oosten van het midden een trap naar de catacomben:
     Ludus gladiatorius   Lanista: dagelijks gevecht tegen een kampioen (beloning + kaarttrekking)
     Tabularium           vier boekenkasten met elk een eigen spreekwoord (eenmaal per dag)
     Curia                Consul: dagelijkse vertaalquiz met hele Latijnse zinnen (vanaf niveau 13)
     Thermae              Balneator: eenmaal per dag baden = soldaten genezen + ervaring
     Catacumbae I + II    donkere grotten (schimmen); Custos: haal zijn lucerna; baas Larva (dagelijks)
   Daarnaast een Venator Romanus (dagelijkse jachtopdracht, net als in Latium).
   Het Colosseum zelf (gesloten, bordje) staat in castra-colosseum.js.
   Laadt NA castra-gates.js (laatste wereldmodule).
   ============================================================================ */

/* ---------- woordenlijst voor de tikbare Latijnse zinnen ---------- */
Object.assign(CASTRA_GLOSS, {
  "catacumbis":"in de catacomben", "catacumbas":"catacomben (4e naamval)", "senatus":"de senaat", "vocat":"roept", "sententias":"zinnen (4e naamval)", "latinas":"Latijnse (4e naamval)",
  "interpretare":"vertaal!", "thermae":"thermen (badhuis)", "patent":"staan open", "lavisti":"je hebt gebaad", "lavare":"baden", "lavo":"ik baad",
  "gladiatorem":"gladiator (4e naamval)", "fortem":"sterke (4e naamval)", "tenebrae":"duisternis", "lucernam":"olielamp (4e naamval)", "lucerna":"olielamp",
  "excitare":"wakker maken", "fuge":"ren weg!", "catacumbae":"de catacomben",
});

/* ---------- terrein, voorwerpen ---------- */
CASTRA_VENATIO.roma.terrains.push({ id:"catacumbae", hidden:true, la:"In de catacomben", nl:"In the catacombs", folk:{ rom:50, gla:10, gal:3, ger:3, gra:3, aeg:3 }, prefs:{ inf:2, sup:3, rng:1 }, myth:{ p:0.40, taks:["Schimmen"] } });
/* Het kerkhof (sepulcretum) ten zuiden van de catacombentrap: de enige plek buiten de catacomben waar Schimmen (Umbra, Lemur, Larva) leven. */
CASTRA_VENATIO.roma.terrains.push({ id:"sepulcretum", la:"Op het kerkhof", nl:"In the graveyard", folk:{ rom:90, gla:6, gra:2, aeg:2 }, prefs:{ inf:2, sup:3, rng:1 }, myth:{ p:0.35, taks:["Schimmen"] } });
CASTRA_WORLDS.roma.zones.push({ t:"sepulcretum", x:40, y:41, w:16, h:8 });
Object.assign(CASTRA_GLOSS, { "sepulcreto":"op het kerkhof", "sepulcretum":"kerkhof" });
CASTRA_ITEMS.lucerna = { nm:"Olielamp", icon:"🪔", nl:"oil lamp" };

/* ---------- toegangen in Roma (tenten, trap) ---------- */
const CASTRA_ROMA_TENTS = [ ["tent_white",8,10], ["tent_beige",28,10], ["tent_beige",44,10], ["tent_white",52,10] ];
const CASTRA_ROMA_ROCKS = [ ["rock_grey",49,39],["rock_brown",50,39],["rock_grey",51,39],["rock_brown",49,40],["rock_grey",51,40] ];
CASTRA_WORLDS.roma.doors = [
  { x:9,  y:13, to:"ludus_roma",       label:"⚔️ Gladiatorenschool", spawn:{ x:11, y:14, dir:"up" } },
  { x:29, y:13, to:"tabularium_roma",  label:"📚 Archief",         spawn:{ x:10, y:12, dir:"up" } },
  { x:45, y:13, to:"curia_roma",       label:"🏛️ Senaatsgebouw",              spawn:{ x:10, y:12, dir:"up" } },
  { x:53, y:13, to:"thermae_roma",     label:"♨️ Badhuis",            spawn:{ x:9,  y:12, dir:"up" } },
  { x:50, y:40, to:"catacumbae_i",     label:"💀 Catacomben",         icon:"🪦", spawn:{ x:14, y:18, dir:"up" } },
];
/* de graven: een rooster met gangen ertussen (alleen de steen is solide), een paar zuilen, een engel en botten; vaste volgorde door een eigen seed */
const CASTRA_ROMA_GRAVES = (function(){
  const rng = castraMapRng(20261024), out = [], z = { x0:40, y0:41, x1:55, y1:48 };
  const busy = new Set(); CASTRA_WENT.filter(e=>e.region==="roma").forEach(e=>{ for(let dy=-1;dy<=1;dy++) for(let dx=-1;dx<=1;dx++) busy.add((e.x+dx)+","+(e.y+dy)); });
  for(let y=z.y0+1; y<=z.y1-1; y+=3) for(let x=z.x0+1; x<=z.x1-1; x+=2){
    if(busy.has(x+","+y) || busy.has(x+","+(y-1)) || rng()<0.22) continue;
    const r = rng(); out.push({ o: r<0.5 ? "grave_a" : r<0.82 ? "grave_b" : r<0.9 ? "pillar_rd" : r<0.95 ? "pillar_fl" : "angel_a", x, y:y-1 });
  }
  [[42,46,"bones_a"],[47,44,"bones_b"],[53,47,"bones_a"],[45,48,"rubble_a"],[52,43,"rubble_b"]].forEach(([x,y,o])=>{ if(!busy.has(x+","+y)) out.push({ o, x, y }); });
  return out;
})();
const _castraWobjPiecesRoma0 = castraWobjPieces;
castraWobjPieces = function(rid){
  const out = _castraWobjPiecesRoma0(rid);
  if(rid==="roma"){ CASTRA_ROMA_TENTS.concat(CASTRA_ROMA_ROCKS).forEach(([o,x,y])=>out.push({ o, x, y })); }
  if(rid==="roma") CASTRA_ROMA_GRAVES.forEach(p=>out.push(p));
  return out;
};
const _castraWobjSpotsRoma0 = castraWobjSpots;
castraWobjSpots = function(rid){
  const out = _castraWobjSpotsRoma0(rid);
  if(rid==="roma"){
    CASTRA_ROMA_TENTS.forEach(([,tx,ty])=>{ for(let y=ty;y<=ty+4;y++) for(let x=tx-1;x<=tx+3;x++) out.push([x,y]); });
    for(let y=38;y<=42;y++) for(let x=48;x<=52;x++) out.push([x,y]);
    for(let y=41;y<=48;y++) for(let x=40;x<=55;x++) out.push([x,y]);          // het kerkhof houdt zijn eigen inrichting
  }
  return out;
};

/* ---------- binnenruimtes ---------- */
const CASTRA_ROMA_LOOKS = {
  consul:   { huid:"licht",  haar:"kort", haarkleur:"grijs", baard:"geen",  cape:"lang", capekleur:"paars", helm:"geen", schild:"geen", wapen:"geen", armor:"ceremonieel" },
  balneator:{ huid:"getint", haar:"kaal", haarkleur:"bruin", baard:"geen",  cape:"geen", helm:"geen", schild:"geen", wapen:"geen", armor:"robe" },
  lanista:  { huid:"olijf",  haar:"wild", haarkleur:"zwart", baard:"baard", cape:"geen", helm:"geen", schild:"geen", wapen:"zweep", armor:"middel" },
  custos:   { huid:"getint", haar:"kort", haarkleur:"grijs", baard:"baard", cape:"geen", helm:"geen", schild:"geen", wapen:"geen", armor:"vodden" },
  venator:  { huid:"licht",  haar:"kort", haarkleur:"bruin", baard:"baard", cape:"geen", helm:"bandana", schild:"geen", wapen:"boog", armor:"middel" },
  larva:    { huid:"zeerlicht", haar:"lang", haarkleur:"grijs", baard:"geen", cape:"geen", helm:"geen", schild:"geen", wapen:"geen", armor:"vodden" },
};
Object.assign(CASTRA_INTERIORS, {
  curia_roma: {
    parent:"roma", kind:"house", nm:"Het senaatsgebouw", nl:"The senate house", icon:"🏛️", cols:22, rows:14, start:{ x:10, y:11 }, floor:"stone",
    doors:[ { x:10, y:13, to:"roma", spawn:{ x:45, y:14, dir:"down" } }, { x:11, y:13, to:"roma", spawn:{ x:45, y:14, dir:"down" } } ],
    furniture:[ ["crate_a",4,4],["crate_b",4,6],["crate_a",4,8],["crate_b",17,4],["crate_a",17,6],["crate_b",17,8],["pot",1,1],["pot",20,1],["pot",1,12],["pot",20,12] ],
    chests:[ [2,10,"kist_curia1"], [19,10,"kist_curia2"] ],
    npcs:[ { id:"consul", role:"consul", nm:"Consul", x:10, y:4, dir:"down", look:CASTRA_ROMA_LOOKS.consul } ],
    books:[ { id:"boek_curia", x:2, y:2, off:3 } ],
  },
  thermae_roma: {
    parent:"roma", kind:"house", nm:"Badhuis", nl:"The Roman bathhouses", icon:"♨️", cols:20, rows:14, start:{ x:9, y:11 }, floor:"stone",
    doors:[ { x:9, y:13, to:"roma", spawn:{ x:53, y:14, dir:"down" } }, { x:10, y:13, to:"roma", spawn:{ x:53, y:14, dir:"down" } } ],
    pool:[6,3,8,5],
    furniture:[ ["flower_w",2,2],["flower_p",17,2],["barrel",1,12],["barrel",18,12],["plant_a",2,8],["plant_c",17,8],["bucket",16,10] ],
    chests:[ [17,10,"kist_thermae1"] ],
    npcs:[ { id:"balneator", role:"balneator", nm:"Badmeester", x:4, y:10, dir:"right", look:CASTRA_ROMA_LOOKS.balneator } ],
  },
  tabularium_roma: {
    parent:"roma", kind:"house", nm:"Het archief", nl:"The archive", icon:"📚", cols:22, rows:14, start:{ x:10, y:11 }, floor:"stone",
    doors:[ { x:10, y:13, to:"roma", spawn:{ x:29, y:14, dir:"down" } }, { x:11, y:13, to:"roma", spawn:{ x:29, y:14, dir:"down" } } ],
    furniture:[ ["crate_a",2,2],["crate_b",4,2],["crate_c",7,2],["crate_d",9,2],["crate_a",12,2],["crate_b",14,2],["crate_c",17,2],["crate_d",19,2],["pot",1,12],["pot",20,12] ],
    chests:[ [19,10,"kist_tab1"] ],
    books:[ { id:"boek_tab1", x:3, y:2, off:4 }, { id:"boek_tab2", x:8, y:2, off:5 }, { id:"boek_tab3", x:13, y:2, off:6 }, { id:"boek_tab4", x:18, y:2, off:7 } ],
  },
  ludus_roma: {
    parent:"roma", kind:"house", nm:"Gladiatorenschool", nl:"The gladiator school", icon:"⚔️", cols:24, rows:16, start:{ x:11, y:13 }, floor:"stoneb",
    doors:[ { x:11, y:15, to:"roma", spawn:{ x:9, y:14, dir:"down" } }, { x:12, y:15, to:"roma", spawn:{ x:9, y:14, dir:"down" } } ],
    furniture:[ ["barrel",3,2],["barrel",4,2],["barrel",19,2],["barrel",20,2],["crate_a",8,8],["crate_b",15,8],["stump",6,6],["stump",17,6],["stump",6,10],["stump",17,10] ],
    chests:[ [2,13,"kist_ludus1"], [21,13,"kist_ludus2"] ],
    npcs:[ { id:"lanista", role:"lanista", nm:"Trainer", x:12, y:4, dir:"down", look:CASTRA_ROMA_LOOKS.lanista } ],
  },
  catacumbae_i: {
    parent:"roma", kind:"cave", nm:"De catacomben", nl:"The catacombs", icon:"💀", cols:30, rows:22, start:{ x:14, y:18 },
    carve:[ [13,16,4,5], [4,10,22,6], [4,3,6,7], [20,3,6,7], [12,2,6,8] ],
    zone:{ t:"catacumbae", x:5, y:11, w:20, h:4 },
    doors:[ { x:14, y:20, to:"roma", spawn:{ x:50, y:41, dir:"down" } }, { x:15, y:20, to:"roma", spawn:{ x:50, y:41, dir:"down" } },
            { x:14, y:2, to:"catacumbae_ii", icon:"🪜", spawn:{ x:14, y:4, dir:"down" } }, { x:15, y:2, to:"catacumbae_ii", icon:"🪜", spawn:{ x:15, y:4, dir:"down" } } ],
    chests:[ [5,5,"kist_cat1a"], [24,5,"kist_cat1b"] ],
    npcs:[ { id:"custos", role:"custos", nm:"Wachter", x:16, y:17, dir:"left", look:CASTRA_ROMA_LOOKS.custos } ],
  },
  catacumbae_ii: {
    parent:"roma", kind:"cave", nm:"Catacomben II", nl:"The deep catacombs", icon:"💀", cols:30, rows:22, start:{ x:14, y:4 },
    carve:[ [12,2,6,8], [4,10,22,6], [4,3,6,7], [20,3,6,7], [4,16,6,4], [12,16,6,4], [20,16,6,4] ],
    zone:{ t:"catacumbae", x:5, y:11, w:20, h:4 },
    doors:[ { x:14, y:2, to:"catacumbae_i", icon:"🪜", spawn:{ x:14, y:4, dir:"up" } }, { x:15, y:2, to:"catacumbae_i", icon:"🪜", spawn:{ x:15, y:4, dir:"up" } } ],
    chests:[ [5,5,"kist_cat2a"], [24,5,"kist_cat2b"], [5,18,"kist_cat2c"] ],
    pickups:[ { id:"lucerna", item:"lucerna", x:23, y:18, needs:{ qid:"custos", step:1 } } ],
    bosses:[ { id:"boss_larva", nm:"Larva", form:"myt_larva", lvl:22, icon:"👻", x:14, y:18, terrain:"catacumbae", daily:true } ],
  },
});
Object.keys(CASTRA_INTERIORS).filter(id=>!CASTRA_WORLDS[id]).forEach(castraInteriorRegister);

// Venator in Roma (dagelijkse jachtopdracht)
CASTRA_WENT.push({ id:"venator_roma", region:"roma", kind:"npc", role:"bounty", nm:"Jager", x:33, y:50, dir:"right", look:CASTRA_ROMA_LOOKS.venator });

/* ---------- gedwongen gevechten (baas, kampioen) ---------- */
const _castraWFeatRoma0 = castraWFeat;
castraWFeat = function(e){ if(e.role==="consul") return "puzzels"; return _castraWFeatRoma0(e); };
const _castraWEntVisibleRoma0 = castraWEntVisible;
castraWEntVisible = function(e){
  if(e.kind==="boss" && e.daily && ((CASTRA.wday||{})["boss_"+e.id]===castraWDay())) return false;
  return _castraWEntVisibleRoma0(e);
};
function castraRomaFight(terrain, form, lvl, boss){
  castraWorldSavePos(CASTRA_W_UI.px, CASTRA_W_UI.py); castraSave(); castraWorldDetach();
  CASTRA_V = castraForcedEncounter("roma", terrain, { form, lvl, boss });
  if(typeof castraCodexSee==="function") castraCodexSee(form);
  CASTRA_V.log = []; CASTRA_V.round = 0; CASTRA_V.fromWorld = true;
  CASTRA_V_PENDING = true;
  go("castraVenatio");
}
// Beloning bij winst (aangeroepen vanuit castraVFinish): eenmaal per dag per baas.
function castraBossWon(V){
  const b = V.boss; if(!b) return;
  const w = CASTRA.wday || (CASTRA.wday = {});
  if(w[b.key]===castraWDay()) return;
  w[b.key] = castraWDay();
  const t = castraWGive(Object.assign(castraWScaled(b.reward, castraWScale(V.region||"roma")), { gloria:b.gloria||2 }));
  if(typeof castraPxpAdd==="function") castraPxpAdd(b.pxp||25, b.why||"Baas verslagen");
  if(b.token && typeof castraCardToken==="function") castraCardToken(1, b.why||"baas verslagen");
  castraSave();
  setTimeout(()=>toast("🏆 "+castraLaText("recte"), t+(b.token?" · 🎟️ +1 kaarttrekking":"")), 600);
}

/* ---------- personen aanspreken ---------- */
const _castraNpcTalkRoma0 = castraNpcTalk;
castraNpcTalk = function(id){
  id = String(id);
  if(id==="w:consul"){ castraConsulTalk(); return; }
  if(id==="w:balneator"){ castraBadTalk(); return; }
  if(id==="w:lanista"){ castraLanistaTalk(); return; }
  if(id==="w:custos"){ castraCustosTalk(); return; }
  if(id==="w:boss_larva"){ castraLarvaTalk(); return; }
  if(id==="w:venator_roma"){ castraBountyTalk("venator_roma"); return; }
  return _castraNpcTalkRoma0(id);
};
const romaSay = (who, look, lines, done)=>castraLatSay(who, look, lines, done);

/* Consul: vertaalquiz met hele zinnen */
const CASTRA_QUIZ_SENT = [
  ["De Romeinse senaat kiest een consul.","The Roman senate elects a consul."],["De soldaat vecht dapper.","The soldier fights bravely."],
  ["De consul houdt een toespraak op het Forum.","The consul gives a speech in the Forum."],["De vijanden vallen de stad aan.","The enemies attack the city."],
  ["De jongens leren op school.","The boys learn at school."],["De leider voert de soldaten naar het kamp.","The leader leads the soldiers to the camp."],
  ["De Romeinen vereren de goden.","The Romans worship the gods."],["De gladiator vecht in de arena.","The gladiator fights in the arena."],
  ["De burgers houden van vrede.","The citizens love peace."],["De koning bestuurt het volk.","The king rules the people."],
  ["Het schip komt bij de haven aan.","The ship arrives at the harbour."],["De ruiters jagen de vijanden op de vlucht.","The horsemen chase the enemies away."],
  ["De moeder roept haar zonen.","The mother calls her sons."],["Het water stroomt in de rivier.","The water flows in the river."],
  ["De gezanten vragen om vrede.","The envoys ask for peace."],["De slaaf vreest zijn meester.","The slave fears his master."],
  ["De wijze man leest boeken.","The wise man reads books."],["Caesar overwint Gallië.","Caesar conquers Gaul."],
];
function castraConsulTalk(){
  if(CASTRA_DLG) return;
  romaSay("Consul", CASTRA_ROMA_LOOKS.consul, [ { la:"Gegroet, leider {naam}! De senaat roept je.", nl:"Greetings, leader {naam}! The senate is calling you." },
    { la:"Vertaal Latijnse zinnen! Vijf vragen.", nl:"Translate Latin sentences! Five questions.", opts:[ { la:"Beginnen", nl:"begin" }, { la:"Nu niet", nl:"not now" } ] } ],
    k=>{ if(k===0){ CASTRA_QUIZ_KIND = { key:"quiz_consul", rid:"roma", words:CASTRA_QUIZ_SENT, title:"Besluit van de senaat" }; castraQuizStart(); } });
}

/* Balneator: eenmaal per dag baden */
function castraBadTalk(){
  if(CASTRA_DLG) return;
  const w = CASTRA.wday || (CASTRA.wday = {}), done = w.thermae===castraWDay();
  romaSay("Badmeester", CASTRA_ROMA_LOOKS.balneator, [ { la:"Gegroet, gast {naam}! De thermen staan voor je open.", nl:"Greetings, guest {naam}! The baths are open to you." },
    done ? { la:"Je hebt vandaag al gebaad. Kom morgen terug!", nl:"You have already bathed today. Come back tomorrow!" }
         : { la:"Wil je een bad nemen?", nl:"Do you want to take a bath?", opts:[ { la:"Baden", nl:"bathe" }, { la:"Tot ziens", nl:"goodbye" } ] } ],
    k=>{
      if(done || k!==0) return;
      const hurt = castraHealAll();
      w.thermae = castraWDay(); castraSave(); if(typeof castraPxpAdd==="function") castraPxpAdd(12, "Gebaad");
      toast("♨️ Badhuis", (hurt.length ? hurt.length+" soldaat/soldaten zijn weer gezond. " : "Je soldaten waren al gezond. ")+"+12 ervaring.");
    });
}

/* Lanista: dagelijkse kampioen */
function castraLanistaTalk(){
  if(CASTRA_DLG) return;
  castraFsprProbe([["trn_kampioen_roma", "battle_front"]]);
  const done = (CASTRA.wday||{}).kampioen===castraWDay();
  romaSay("Trainer", CASTRA_ROMA_LOOKS.lanista, [ { la:"Gegroet, leider {naam}! Ik heb een sterke gladiator.", nl:"Greetings, leader {naam}! I have a strong gladiator." },
    done ? { la:"Vandaag heb je hem verslagen. Kom morgen terug!", nl:"Today you have defeated him. Come back tomorrow!" }
         : { la:"Durf je tegen hem te vechten? Wie wint, krijgt een beloning.", nl:"Do you dare to fight him? The winner gets a reward.", opts:[ { la:"Vechten", nl:"fight" }, { la:"Nu niet", nl:"not now" } ] } ],
    k=>{ if(!done && k===0) castraRomaFight("arena", "gla_primuspalus", 20, { key:"kampioen", reward:{ aes:90, frumentum:40 }, gloria:2, pxp:25, token:true, why:"kampioen verslagen", pose:"trn_kampioen_roma" }); });
}

/* Custos van de catacomben: lucerna-opdracht */
function castraCustosTalk(){
  if(CASTRA_DLG) return;
  const q = castraWQ("custos");
  if(q.step===0){
    romaSay("Wachter", CASTRA_ROMA_LOOKS.custos, [ { la:"Gegroet, gast {naam}! Het is hier donker. Ik zoek mijn olielamp.", nl:"Greetings, guest {naam}! It is dark here. I am looking for my oil lamp." },
      { la:"Daal af in de diepe catacomben (trap bovenin) en breng mijn lamp terug.", nl:"Descend into the deep catacombs (stairs at the top) and bring my lamp back." } ],
      ()=>{ q.step = 1; castraSave(); castraWobjDraw(); castraWRefreshHud && castraWRefreshHud(); });
  } else if(q.step===1){
    if(castraWItems().lucerna){
      romaSay("Wachter", CASTRA_ROMA_LOOKS.custos, [ { la:"Mijn lamp! Dank je wel, leider {naam}!", nl:"My lamp! Thank you, leader {naam}!" } ],
        ()=>{
          delete castraWItems().lucerna; q.step = 2;
          const t = castraWGive(Object.assign(castraWScaled({ aes:150, frumentum:75 }, castraWScale("roma")), { gloria:2 }));
          castraSave(); toast("🪔 "+castraLaText("recte"), t); castraWobjDraw();
          if(typeof castraPxpAdd==="function") castraPxpAdd(45, "Opdracht voltooid");
          if(typeof castraCardToken==="function") castraCardToken(1, "opdracht voltooid");
          if(typeof castraWRefreshHud==="function") castraWRefreshHud();
        });
    } else romaSay("Wachter", CASTRA_ROMA_LOOKS.custos, [ { la:"Waar is mijn lamp?", nl:"Where is my lamp?" } ], null);
  } else romaSay("Wachter", CASTRA_ROMA_LOOKS.custos, [ { la:"Tot ziens, leider {naam}! Het ga je goed!", nl:"Goodbye, leader {naam}! Farewell!" } ], null);
}

/* Larva: de baas van de diepe catacomben */
function castraLarvaTalk(){
  if(CASTRA_DLG) return;
  romaSay("Larva", CASTRA_ROMA_LOOKS.larva, [ { la:"Ik ben een Larva, een spook. Hier slaap ik!", nl:"I am a Larva, a ghost. Here I sleep!" },
    { la:"Durf je mij wakker te maken?", nl:"Do you dare to wake me?", opts:[ { la:"Vechten", nl:"fight" }, { la:"Wegrennen", nl:"run away" } ] } ],
    k=>{ if(k===0) castraRomaFight("catacumbae", "myt_larva", 22, { key:"boss_boss_larva", reward:{ aes:120, frumentum:60 }, gloria:2, pxp:30, token:true, why:"Larva verslagen" }); });
}

/* ---------- opdrachten in beeld ---------- */
const _castraQuestHudRoma0 = castraQuestHud;
castraQuestHud = function(){
  let extra = "";
  if((CASTRA_W_REGION==="catacumbae_i" || CASTRA_W_REGION==="catacumbae_ii") && castraWQ("custos").step===1)
    extra += `<div class="note" style="text-align:center">📜 ${castraLaHTML("Haal de lamp!", "Get the guard's lamp from the deep catacombs (stairs at the top of the first cave).", "custos_hud")}</div>`;
  return _castraQuestHudRoma0() + extra;
};
const _castraWobjOpusRoma0 = castraWobjOpus;
castraWobjOpus = function(){
  const out = _castraWobjOpusRoma0();
  if(castraWQ("custos").step===1) out.push({ la:"Haal de lamp!", nl:"Roma: fetch the Custos' lamp from the deep catacombs (stairs at the top of the first cave)." });
  return out;
};
