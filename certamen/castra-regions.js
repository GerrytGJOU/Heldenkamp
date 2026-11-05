/* ============================================================================
   CASTRA HEROUM — GROTE REGIO'S: GALLIA, GRAECIA, AEGYPTUS (64 × 48, Pokémon-formaat)
   ----------------------------------------------------------------------------
   Elke regio heeft dezelfde opzet als Roma, data-gedreven uit CASTRA_REGSPEC:
     huis A       quizmaster: dagelijkse vertaalquiz met hele Latijnse zinnen (vanaf niveau 13), boekenkast, 2 kisten
     huis B       rustplek (genezen + ervaring, eenmaal per dag) en een kampioen (dagelijks gevecht), 2 kisten
     grot         zoekopdracht (voorwerp ophalen voor de Grotwachter), baas (dagelijks), 3 kisten
     Venator      dagelijkse jachtopdracht bij de zuidingang
   De deuren staan langs de hoofdweg (tenten); de grot is een rotsingang in het veld.
   Laadt NA castra-roma.js.
   ============================================================================ */

const CASTRA_REGSPEC = {
  gallia: {
    tents:[ { o:"tent_beige", x:40, y:20 }, { o:"tent_white", x:22, y:20 } ], venator:[34,44], folk:"gal",
    houseA:{ nm:"Huis van de druïde", nl:"The druid's house", icon:"🌿", label:"🌿 Huis van de druïde", npc:{ nm:"Bardus", role:"gquiz", title:"Lied van de barde" } },
    houseB:{ nm:"De herberg", nl:"The inn", icon:"🍺", label:"🍺 Herberg", rest:{ nm:"Herbergier" }, champ:{ nm:"Gallische strijder", form:"gal_bellatorgallus", lvl:26, terrain:"campus" } },
    cave:{ x:10, y:38, nm:"De Gallische grot", nl:"The Gallic cave", icon:"🕳️", label:"🕳️ Grot", terrain:{ id:"antrum", la:"In de grot", nl:"In the cave", taks:["Wolven van Mars"] },
      fetch:{ nm:"Druida", item:"viscum", itemNm:"Maretak", icon:"🌿", itemNl:"maretak",
        ask:{ la:"Gegroet, gast {naam}! Ik zoek maretak.", nl:"Greetings, guest {naam}! I am looking for mistletoe." }, how:{ la:"Ga diep het grot in en breng de maretak.", nl:"Go deep into the cave and bring the mistletoe." },
        wait:{ la:"Waar is de maretak?", nl:"Where is the mistletoe?" }, thanks:{ la:"De maretak! Dank je wel, leider {naam}!", nl:"The mistletoe! Thank you, leader {naam}!" },
        hud:{ la:"Haal de maretak voor de druïde uit het diepste van de grot.", nl:"Fetch the mistletoe for the druid from the deepest part of the cave." } },
      boss:{ nm:"Centaurus", form:"myt_centaurussagitta", lvl:28, icon:"🏹" } },
    sentences:[ ["De Galliërs wonen in de bossen.","The Gauls live in the forests."],["De druïden vereren bomen.","The druids worship trees."],["De barde zingt liederen.","The bard sings songs."],["Caesar steekt de Rijn over.","Caesar crosses the Rhine."],["De Galliërs vechten dapper.","The Gauls fight bravely."],["De burcht heeft hoge muren.","The fortress has high walls."] ],
  },
  graecia: {
    tents:[ { o:"tent_beige", x:14, y:16 }, { o:"tent_white", x:44, y:16 } ], venator:[34,44], folk:"gra",
    houseA:{ nm:"Orakel", nl:"The oracle", icon:"🔮", label:"🔮 Orakel", npc:{ nm:"Pythia", role:"gquiz", title:"Orakel" } },
    houseB:{ nm:"De sportschool", nl:"The gym", icon:"🏛️", label:"🏛️ Sportschool", rest:{ nm:"Sportleraar" }, champ:{ nm:"Atleet", form:"gra_peltasta", lvl:38, terrain:"urbs" } },
    cave:{ x:56, y:34, nm:"Het labyrint", nl:"The labyrinth", icon:"🌀", label:"🌀 Labyrint", terrain:{ id:"labyrinthus", la:"In het labyrint", nl:"In the labyrinth", taks:["Draken"] },
      fetch:{ nm:"Daedalus", item:"filum", itemNm:"Draad van Ariadne", icon:"🧵", itemNl:"Ariadne's thread",
        ask:{ la:"Gegroet, gast {naam}! Ik zoek mijn draad.", nl:"Greetings, guest {naam}! I am looking for my thread." }, how:{ la:"Ga diep het labyrint in en breng de draad van Ariadne.", nl:"Go deep into the labyrinth and bring Ariadne's thread." },
        wait:{ la:"Waar is de draad?", nl:"Where is the thread?" }, thanks:{ la:"Mijn draad! Dank je wel, leider {naam}!", nl:"My thread! Thank you, leader {naam}!" },
        hud:{ la:"Haal de draad van Ariadne voor Daedalus uit het diepste van het labyrint.", nl:"Fetch Ariadne's thread for Daedalus from the deepest part of the labyrinth." } },
      boss:{ nm:"Draco", form:"myt_draco", lvl:40, icon:"🐉" } },
    sentences:[ ["De Grieken vereren veel goden.","The Greeks worship many gods."],["Athene is een mooie stad.","Athens is a beautiful city."],["Sparta heeft sterke soldaten.","Sparta has strong soldiers."],["De Pythia voorspelt de toekomst.","The Pythia predicts the future."],["De filosofen discussiëren in de tuin.","The philosophers argue in the garden."],["De schepen varen over zee.","The ships sail across the sea."] ],
  },
  aegyptus: {
    tents:[ { o:"tent_beige", x:40, y:20 }, { o:"tent_white", x:20, y:20 } ], venator:[34,44], folk:"aeg",
    houseA:{ nm:"De tempel van Isis", nl:"The temple of Isis", icon:"🏺", label:"🏺 Tempel van Isis", npc:{ nm:"Priester", role:"gquiz", title:"Hiërogliefen" } },
    houseB:{ nm:"Tuin aan de Nijl", nl:"The garden by the Nile", icon:"🌴", label:"🌴 Tuin aan de Nijl", rest:{ nm:"Tuinman" }, champ:{ nm:"Custos Pharaonis", form:"aeg_custospharaonis", lvl:50, terrain:"urbs" } },
    cave:{ x:50, y:38, nm:"Piramide", nl:"The pyramid", icon:"🔺", label:"🔺 Piramide", terrain:{ id:"pyramis", la:"In de piramide", nl:"In the pyramid", taks:["Feniks","Draken"] },
      fetch:{ nm:"Oude priester", item:"scarabaeus_sacer", itemNm:"Heilige scarabee", icon:"🪲", itemNl:"sacred scarab",
        ask:{ la:"Gegroet, gast {naam}! Ik zoek de heilige scarabee.", nl:"Greetings, guest {naam}! I am looking for the sacred scarab." }, how:{ la:"Ga diep de piramide in en breng de scarabee.", nl:"Go deep into the pyramid and bring the scarab." },
        wait:{ la:"Waar is de scarabee?", nl:"Where is the scarab?" }, thanks:{ la:"De scarabee! Dank je wel, leider {naam}!", nl:"The scarab! Thank you, leader {naam}!" },
        hud:{ la:"Haal de heilige scarabee voor de priester uit het diepste van de piramide.", nl:"Fetch the sacred scarab for the priest from the deepest part of the pyramid." } },
      boss:{ nm:"Mumia", form:"myt_mumia", lvl:54, icon:"👻" } },
    sentences:[ ["De farao wordt in de piramide begraven.","The pharaoh is buried in the pyramid."],["De Nijl bevloeit de akkers met water.","The Nile waters the fields."],["De priesters vereren de goden.","The priests worship the gods."],["De schrijvers schrijven hiërogliefen.","The scribes write hieroglyphs."],["De zon loopt door de hemel.","The sun runs across the sky."],["Cleopatra is de koningin van Egypte.","Cleopatra is the queen of Egypt."] ],
  },
  laconia: {
    tents:[ { o:"tent_beige", x:40, y:20 }, { o:"tent_white", x:22, y:20 } ], venator:[34,44], folk:"spa",
    houseA:{ nm:"Raad van oudsten", nl:"The council of elders", icon:"🏛️", label:"🏛️ Raad van oudsten", npc:{ nm:"Oudste", role:"gquiz", title:"Raad van oudsten" } },
    houseB:{ nm:"Gemeenschappelijke maaltijd", nl:"The shared meal", icon:"🍲", label:"🍲 Gemeenschappelijke maaltijd", rest:{ nm:"Kok" }, champ:{ nm:"Spartaan", form:"spa_trecentus", lvl:42, terrain:"urbs" } },
    cave:{ x:50, y:38, nm:"De Taygetosgrot", nl:"The Taygetus cave", icon:"⛰️", label:"⛰️ Taygetosgrot", terrain:{ id:"taygetus", la:"In het Taygetosgebergte", nl:"In the Taygetus cave", taks:["Grijpvogels","Centauren"] },
      fetch:{ nm:"Herder", item:"agnus", itemNm:"Lam", icon:"🐑", itemNl:"lost lamb",
        ask:{ la:"Gegroet, gast {naam}! Ik zoek mijn lam.", nl:"Greetings, guest {naam}! I am looking for my lamb." }, how:{ la:"Ga diep de grot in en breng mijn lam terug.", nl:"Go deep into the cave and bring my lamb back." },
        wait:{ la:"Waar is het lam?", nl:"Where is the lamb?" }, thanks:{ la:"Mijn lam! Dank je wel, leider {naam}!", nl:"My lamb! Thank you, leader {naam}!" },
        hud:{ la:"Haal het verdwaalde lam voor de herder uit het diepste van de grot.", nl:"Fetch the lost lamb for the shepherd from the deepest part of the cave." } },
      boss:{ nm:"Gryps", form:"myt_gryps", lvl:54, icon:"🦅" } },
    sentences:[ ["De Spartanen vechten dapper.","The Spartans fight bravely."],["Leonidas verdedigt Thermopylae.","Leonidas defends Thermopylae."],["De Spartaanse jongens leren in de agoge.","The Spartan boys learn in the agoge."],["De Spartanen eten zwart brood.","The Spartans eat black bread."],["De koning van Sparta gaat naar de oorlog.","The king of Sparta goes to war."],["De moeder stuurt haar zoon naar de strijd.","The mother sends her son into battle."] ],
  },
  troia: {
    tents:[ { o:"tent_beige", x:40, y:20 }, { o:"tent_white", x:22, y:20 } ], venator:[34,44], folk:"tro",
    houseA:{ nm:"De tempel van Apollo", nl:"The temple of Apollo", icon:"☀️", label:"☀️ Tempel van Apollo", npc:{ nm:"Vates", role:"gquiz", title:"Voorspelling" } },
    houseB:{ nm:"Het paleis van Priamus", nl:"The palace of Priam", icon:"🏰", label:"🏰 Paleis van Priamus", rest:{ nm:"Dienaar" }, champ:{ nm:"Custos portae", form:"tro_custosportae", lvl:44, terrain:"muros" } },
    cave:{ x:20, y:38, nm:"De geheime tunnel", nl:"The secret tunnel", icon:"🕳️", label:"🕳️ Geheime tunnel", terrain:{ id:"cuniculus", la:"In de tunnel", nl:"In the tunnel", taks:["Cyclopen"] },
      fetch:{ nm:"Cassandra", item:"sagitta", itemNm:"Pijl van Apollo", icon:"🏹", itemNl:"Apollo's arrow",
        ask:{ la:"Gegroet, gast {naam}! Ik zoek mijn pijl.", nl:"Greetings, guest {naam}! I am looking for my arrow." }, how:{ la:"Ga diep de tunnel in en breng de pijl van Apollo.", nl:"Go deep into the tunnel and bring the arrow of Apollo." },
        wait:{ la:"Waar is de pijl?", nl:"Where is the arrow?" }, thanks:{ la:"Mijn pijl! Dank je wel, leider {naam}!", nl:"My arrow! Thank you, leader {naam}!" },
        hud:{ la:"Haal de pijl van Apollo voor Cassandra uit het diepste van de tunnel.", nl:"Fetch Apollo's arrow for Cassandra from the deepest part of the tunnel." } },
      boss:{ nm:"Cycloop", form:"myt_cyclopsfaber", lvl:58, icon:"👁️" } },
    sentences:[ ["Troje is een grote stad.","Troy is a big city."],["Hector verdedigt de Trojanen.","Hector defends the Trojans."],["De Grieken bouwen een houten paard.","The Greeks are building a wooden horse."],["Priamus is de koning van Troje.","Priam is the king of Troy."],["Cassandra ziet de toekomst.","Cassandra sees the future."],["Achilles overwint de vijanden.","Achilles defeats the enemies."] ],
  },
  germania: {
    tents:[ { o:"tent_beige", x:40, y:20 }, { o:"tent_white", x:22, y:20 } ], venator:[34,44], folk:"ger",
    houseA:{ nm:"Hal van het stamhoofd", nl:"The chieftain's hall", icon:"🏠", label:"🏠 Hal van het stamhoofd", npc:{ nm:"Vates", role:"gquiz", title:"Runen" } },
    houseB:{ nm:"De herberg", nl:"The inn", icon:"🍺", label:"🍺 Herberg", rest:{ nm:"Herbergier" }, champ:{ nm:"Germaanse strijder", form:"ger_centenus", lvl:32, terrain:"vicus" } },
    cave:{ x:50, y:38, nm:"De Hercynische grot", nl:"The Hercynian cave", icon:"🌲", label:"🌲 Hercynische grot", terrain:{ id:"hercynia", la:"In de grot", nl:"In the cave", taks:["Wolven van Mars","Draken"] },
      fetch:{ nm:"Oude jager", item:"cornu_bibendi", itemNm:"Drinkhoorn", icon:"🐂", itemNl:"drinkhoorn",
        ask:{ la:"Gegroet, gast {naam}! Ik zoek mijn drinkhoorn.", nl:"Greetings, guest {naam}! I am looking for my drinking horn." }, how:{ la:"Ga diep de grot in en breng mijn hoorn terug.", nl:"Go deep into the cave and bring my horn back." },
        wait:{ la:"Waar is de hoorn?", nl:"Where is the horn?" }, thanks:{ la:"Mijn hoorn! Dank je wel, leider {naam}!", nl:"My horn! Thank you, leader {naam}!" },
        hud:{ la:"Haal de drinkhoorn voor de oude jager uit het diepste van de grot.", nl:"Fetch the drinking horn for the old hunter from the deepest part of the cave." } },
      boss:{ nm:"Lupus Martius", form:"myt_lupusmartius", lvl:42, icon:"🐺" } },
    sentences:[ ["De Germanen leven in de bossen.","The Germans live in the forests."],["Het bos is groot en donker.","The forest is big and dark."],["De Germanen jagen op dieren.","The Germans hunt animals."],["De Rijn scheidt Germanië en Gallië.","The Rhine separates Germania and Gaul."],["De mannen dragen speren.","The men carry spears."],["De vrouw bereidt het eten.","The woman prepares the food."] ],
  },
  themiscyra: {
    tents:[ { o:"tent_beige", x:40, y:20 }, { o:"tent_white", x:22, y:20 } ], venator:[34,44], folk:"ama",
    houseA:{ nm:"Paleis van de koningin", nl:"The queen's palace", icon:"👑", label:"👑 Paleis van de koningin", npc:{ nm:"Hippolyta", role:"gquiz", title:"Paleis van de koningin" } },
    houseB:{ nm:"De stal", nl:"The stable", icon:"🐎", label:"🐎 Stal", rest:{ nm:"Staljongen" }, champ:{ nm:"Amazone", form:"ama_securifera", lvl:48, terrain:"campus" } },
    cave:{ x:50, y:38, nm:"De grot van Ares", nl:"The cave of Ares", icon:"⚔️", label:"⚔️ Grot van Ares", terrain:{ id:"martis", la:"In de grot van Ares", nl:"In the cave of Ares", taks:["Harpijen","Wolven van Mars"] },
      fetch:{ nm:"Priester", item:"balteus", itemNm:"Gordel", icon:"🎗️", itemNl:"Hippolyta's belt",
        ask:{ la:"Gegroet, gast {naam}! Ik zoek de gordel van Hippolyta.", nl:"Greetings, guest {naam}! I am looking for the belt of Hippolyta." }, how:{ la:"Ga diep de grot in en breng de gordel.", nl:"Go deep into the cave and bring the belt." },
        wait:{ la:"Waar is de gordel?", nl:"Where is the belt?" }, thanks:{ la:"De gordel! Dank je wel, leider {naam}!", nl:"The belt! Thank you, leader {naam}!" },
        hud:{ la:"Haal de gordel van Hippolyta voor de priesteres uit het diepste van de grot.", nl:"Fetch Hippolyta's belt for the priestess from the deepest part of the cave." } },
      boss:{ nm:"Equus alatus", form:"myt_equusalatus", lvl:60, icon:"🐴" } },
    sentences:[ ["De Amazones houden van paarden.","The Amazons love horses."],["Hippolyta is de koningin van de Amazones.","Hippolyta is the queen of the Amazons."],["De vrouwen vechten dapper.","The women fight bravely."],["De pijlen vliegen snel.","The arrows fly fast."],["Hercules vraagt om de gordel.","Hercules asks for the belt."],["De Amazones jagen in de bossen.","The Amazons hunt in the forests."] ],
  },
  persis: {
    tents:[ { o:"tent_beige", x:40, y:20 }, { o:"tent_white", x:22, y:20 } ], venator:[34,44], folk:"per",
    houseA:{ nm:"Paleis van de koning", nl:"The king's palace", icon:"🏰", label:"🏰 Paleis van de koning", npc:{ nm:"Magus", role:"gquiz", title:"Magiërs" } },
    houseB:{ nm:"De karavaanherberg", nl:"The caravan inn", icon:"🐪", label:"🐪 Karavaanherberg", rest:{ nm:"Herbergier" }, champ:{ nm:"Immortalis", form:"per_immortalis", lvl:50, terrain:"urbs" } },
    cave:{ x:10, y:38, nm:"Het koningsgraf", nl:"The royal tomb", icon:"⚱️", label:"⚱️ Koningsgraf", terrain:{ id:"sepulcrum", la:"In het graf", nl:"In the tomb", taks:["Feniks","Draken"] },
      fetch:{ nm:"Oude magiër", item:"ignis", itemNm:"Heilig vuur", icon:"🔥", itemNl:"sacred fire",
        ask:{ la:"Gegroet, gast {naam}! Ik zoek het heilige vuur.", nl:"Greetings, guest {naam}! I am looking for the sacred fire." }, how:{ la:"Ga diep het graf in en breng het heilige vuur.", nl:"Go deep into the tomb and bring the sacred fire." },
        wait:{ la:"Waar is het vuur?", nl:"Where is the fire?" }, thanks:{ la:"Het heilige vuur! Dank je wel, leider {naam}!", nl:"The sacred fire! Thank you, leader {naam}!" },
        hud:{ la:"Haal het heilige vuur voor de magiër uit het diepste van het koningsgraf.", nl:"Fetch the sacred fire for the magus from the deepest part of the royal tomb." } },
      boss:{ nm:"Draco Persicus", form:"myt_draco2", lvl:54, icon:"🐉" } },
    sentences:[ ["De koning van de Perzen is groot.","The king of the Persians is great."],["De Perzen vechten met pijlen.","The Persians fight with arrows."],["De magiërs bewaken het heilige vuur.","The magi guard the sacred fire."],["Darius leidt het leger.","Darius leads the army."],["De koninklijke weg is lang.","The royal road is long."],["De ruiters rennen over het veld.","The riders race across the field."] ],
  },
  africa: {
    tents:[ { o:"tent_beige", x:40, y:20 }, { o:"tent_white", x:22, y:20 } ], venator:[34,44], folk:"car",
    houseA:{ nm:"Raadhuis van Carthago", nl:"The council house of Carthage", icon:"🏛️", label:"🏛️ Raadhuis van Carthago", npc:{ nm:"Suffeet", role:"gquiz", title:"Suffeten" } },
    houseB:{ nm:"De havenherberg", nl:"The harbour inn", icon:"⚓", label:"⚓ Havenherberg", rest:{ nm:"Zeeman" }, champ:{ nm:"Veteranus Libyus", form:"car_veteranuslibyus", lvl:52, terrain:"urbs" } },
    cave:{ x:20, y:38, nm:"Hannibals grot", nl:"Hannibal's cave", icon:"🐘", label:"🐘 Hannibals grot", terrain:{ id:"hannibalis", la:"In Hannibals grot", nl:"In Hannibal's cave", taks:["Draken","Feniks"] },
      fetch:{ nm:"Olifantenleider", item:"dens_elephanti", itemNm:"Olifantstand", icon:"🦷", itemNl:"olifantstand",
        ask:{ la:"Gegroet, gast {naam}! Ik zoek mijn olifantstand.", nl:"Greetings, guest {naam}! I am looking for my elephant tusk." }, how:{ la:"Ga diep de grot in en breng mijn olifantstand terug.", nl:"Go deep into the cave and bring my elephant tusk back." },
        wait:{ la:"Waar is de olifantstand?", nl:"Where is the elephant tusk?" }, thanks:{ la:"Mijn olifantstand! Dank je wel, leider {naam}!", nl:"My elephant tusk! Thank you, leader {naam}!" },
        hud:{ la:"Haal de olifantstand voor de olifantenleider uit het diepste van de grot.", nl:"Fetch the elephant tusk for the elephant leader from the deepest part of the cave." } },
      boss:{ nm:"Serpens", form:"myt_serpens", lvl:64, icon:"🐍" } },
    sentences:[ ["Carthago is een grote stad.","Carthage is a big city."],["Hannibal leidt olifanten.","Hannibal leads elephants."],["De Carthagers hebben veel schepen.","The Carthaginians have many ships."],["Onze zee is wijd.","Our sea is wide."],["De Romeinen overwinnen Carthago.","The Romans defeat Carthage."],["De olifanten steken de Alpen over.","The elephants cross the Alps."] ],
  },
};

/* ---------- opbouw per regio ---------- */
function castraRegLook(folk, extra){
  const lk = (CASTRA_FOLKS[folk]||CASTRA_FOLKS.rom).look||{};
  return Object.assign({ huid:lk.huid||"licht", haar:lk.haar||"kort", haarkleur:lk.haarkleur||"bruin", baard:"geen", cape:"geen", helm:"geen", schild:"geen", wapen:"geen", armor:"robe" }, extra||{});
}
const CASTRA_REG_FACADES = {};   // rid -> { pieces:[[o,x,y]], clear:[[x,y]] }
Object.keys(CASTRA_REGSPEC).forEach(rid=>{
  const S = CASTRA_REGSPEC[rid], row = CASTRA_GEO[rid].row, hs = [S.houseA, S.houseB], doors = [], pieces = [], clear = [];
  const idA = "domus_"+rid, idB = "taberna_"+rid, idC = "caverna_"+rid, ids = [idA, idB];
  S.tents.forEach((t,i)=>{
    pieces.push([t.o, t.x, t.y]); const dx = t.x+1, dy = t.y+3;
    doors.push({ x:dx, y:dy, to:ids[i], label:hs[i].label, spawn:{ x:10, y:12, dir:"up" } });
    t.door = { x:dx, y:dy };
    for(let y=t.y;y<=t.y+4;y++) for(let x=t.x-1;x<=t.x+3;x++) clear.push([x,y]);
  });
  const C = S.cave, cx = C.x, cy = C.y;
  [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0]].forEach(([ox,oy],i)=>pieces.push([i%2?"rock_brown":"rock_grey", cx+ox, cy+oy]));
  doors.push({ x:cx, y:cy, to:idC, label:C.label, icon:"🪦", spawn:{ x:14, y:18, dir:"up" } });
  for(let y=cy-2;y<=cy+2;y++) for(let x=cx-2;x<=cx+2;x++) clear.push([x,y]);
  CASTRA_WORLDS[rid].doors = doors; CASTRA_REG_FACADES[rid] = { pieces, clear };
  // terrein van de grot
  CASTRA_VENATIO[rid].terrains.push({ id:C.terrain.id, hidden:true, la:C.terrain.la, nl:C.terrain.nl, prefs:{ inf:2, rng:2, sup:2 }, myth:{ p:0.40, taks:C.terrain.taks } });
  const back = (door, below)=>[ { x:10, y:13, to:rid, spawn:{ x:door.x, y:door.y+1, dir:"down" } }, { x:11, y:13, to:rid, spawn:{ x:door.x, y:door.y+1, dir:"down" } } ];
  const famNpc = (id, nm, role, x, y, extra)=>Object.assign({ id, role, nm, x, y, dir:"down", look:castraRegLook(S.folk, extra&&extra.look) }, extra||{});
  const furn = [ ["crate_a",4,4],["crate_b",4,6],["crate_a",17,4],["crate_b",17,6],["pot",1,1],["pot",20,1],["pot",1,12],["pot",20,12] ];
  CASTRA_INTERIORS[idA] = {
    parent:rid, kind:"house", nm:S.houseA.nm, nl:S.houseA.nl, icon:S.houseA.icon, cols:22, rows:14, start:{ x:10, y:11 }, floor:"stone",
    doors:back(S.tents[0].door), furniture:furn, chests:[ [2,10,"kist_"+idA+"1"], [19,10,"kist_"+idA+"2"] ],
    npcs:[ famNpc("quiz_"+rid, S.houseA.npc.nm, "gquiz", 10, 4, { title:S.houseA.npc.title, sents:S.sentences }) ],
    books:[ { id:"boek_"+idA, x:2, y:2, off:8+Object.keys(CASTRA_REGSPEC).indexOf(rid) } ],
  };
  CASTRA_INTERIORS[idB] = {
    parent:rid, kind:"house", nm:S.houseB.nm, nl:S.houseB.nl, icon:S.houseB.icon, cols:22, rows:14, start:{ x:10, y:11 }, floor:"plank",
    doors:back(S.tents[1].door), furniture:[ ["barrel",3,2],["barrel",18,2],["crate_c",8,7],["crate_d",13,7],["flower_w",2,12],["flower_p",19,12] ],
    chests:[ [3,10,"kist_"+idB+"1"], [18,10,"kist_"+idB+"2"] ],
    npcs:[ famNpc("rest_"+rid, S.houseB.rest.nm, "grest", 5, 4), famNpc("champ_"+rid, S.houseB.champ.nm, "gchamp", 16, 4, { look:{ armor:"middel", wapen:"zwaard" }, fight:{ terrain:S.houseB.champ.terrain, form:S.houseB.champ.form, lvl:S.houseB.champ.lvl } }) ],
  };
  CASTRA_ITEMS[C.fetch.item] = { nm:C.fetch.itemNm, icon:C.fetch.icon, nl:C.fetch.itemNl };
  CASTRA_INTERIORS[idC] = {
    parent:rid, kind:"cave", nm:C.nm, nl:C.nl, icon:C.icon, cols:30, rows:22, start:{ x:14, y:18 },
    carve:[ [13,17,4,4], [4,10,22,7], [4,3,6,7], [20,3,6,7], [12,2,6,8], [4,17,6,4], [20,17,6,4] ],
    zone:{ t:C.terrain.id, x:5, y:11, w:20, h:4 },
    doors:[ { x:14, y:20, to:rid, spawn:{ x:cx, y:cy+1, dir:"down" } }, { x:15, y:20, to:rid, spawn:{ x:cx, y:cy+1, dir:"down" } } ],
    chests:[ [5,5,"kist_"+idC+"1"], [24,5,"kist_"+idC+"2"], [5,19,"kist_"+idC+"3"] ],
    npcs:[ famNpc("fetch_"+rid, C.fetch.nm, "gfetch", 16, 18, { dir:"left", look:{ armor:"vodden", baard:"baard", haarkleur:"grijs" } }) ],
    pickups:[ { id:C.fetch.item, item:C.fetch.item, x:23, y:19, needs:{ qid:"fetch_"+rid, step:1 } } ],
    bosses:[ { id:"boss_"+rid, nm:C.boss.nm, form:C.boss.form, lvl:C.boss.lvl, icon:C.boss.icon, x:15, y:4, terrain:C.terrain.id, daily:true } ],
  };
  [idA, idB, idC].forEach(castraInteriorRegister);
  // Venator bij de zuidingang
  CASTRA_WENT.push({ id:"venator_"+rid, region:rid, kind:"npc", role:"bounty", nm:"Jager", x:S.venator[0], y:S.venator[1], dir:"left", look:CASTRA_ROMA_LOOKS.venator });
});
const _castraWobjPiecesReg0 = castraWobjPieces;
castraWobjPieces = function(rid){
  const out = _castraWobjPiecesReg0(rid), F = CASTRA_REG_FACADES[rid];
  if(F) F.pieces.forEach(([o,x,y])=>out.push({ o, x, y }));
  return out;
};
const _castraWobjSpotsReg0 = castraWobjSpots;
castraWobjSpots = function(rid){
  const out = _castraWobjSpotsReg0(rid), F = CASTRA_REG_FACADES[rid];
  if(F) F.clear.forEach(c=>out.push(c));
  return out;
};

/* ---------- gedwongen gevecht in een willekeurige regio ---------- */
function castraRegionFight(rid, terrain, form, lvl, boss){
  castraWorldSavePos(CASTRA_W_UI.px, CASTRA_W_UI.py); castraSave(); castraWorldDetach();
  CASTRA_V = castraForcedEncounter(rid, terrain, { form, lvl, boss });
  if(typeof castraCodexSee==="function") castraCodexSee(form);
  CASTRA_V.log = []; CASTRA_V.round = 0; CASTRA_V.fromWorld = true;
  CASTRA_V_PENDING = true;
  go("castraVenatio");
}
const CASTRA_REG_REWARD = { champ:{ aes:90, frumentum:40 }, boss:{ aes:120, frumentum:60 } };

/* ---------- personen aanspreken (algemene rollen) ---------- */
const CASTRA_QUIZ_SENT_BASE = CASTRA_QUIZ_SENT.slice();
const _castraWFeatReg0 = castraWFeat;
castraWFeat = function(e){ if(e.role==="gquiz") return "puzzels"; return _castraWFeatReg0(e); };
const _castraNpcTalkReg0 = castraNpcTalk;
castraNpcTalk = function(id){
  id = String(id);
  const e = CASTRA_WENT.find(x=>"w:"+x.id===id);
  if(e){
    if(e.role==="gquiz") return castraRegQuiz(e);
    if(e.role==="grest") return castraRegRest(e);
    if(e.role==="gchamp") return castraRegChamp(e);
    if(e.role==="gfetch") return castraRegFetch(e);
    if(e.kind==="boss" && CASTRA_REGSPEC[CASTRA_WORLDS[e.region].parent]) return castraRegBoss(e);
    if(e.role==="bounty" && e.id!=="venator_latium" && e.id!=="venator_roma") return castraBountyTalk(e.id);
  }
  return _castraNpcTalkReg0(id);
};
function castraRegQuiz(e){
  if(CASTRA_DLG) return;
  castraLatSay(e.nm, e.look, [ { la:"Gegroet, leider {naam}! Vertaal Latijnse zinnen! Vijf vragen.", nl:"Greetings, leader {naam}! Translate Latin sentences! Five questions.", opts:[ { la:"Beginnen", nl:"begin" }, { la:"Nu niet", nl:"not now" } ] } ],
    k=>{ if(k===0){ CASTRA_QUIZ_KIND = { key:"quiz_"+e.id, rid:CASTRA_WORLDS[e.region].parent, words:CASTRA_QUIZ_SENT_BASE.concat(e.sents||[]), title:e.title }; castraQuizStart(); } });
}
function castraRegRest(e){
  if(CASTRA_DLG) return;
  const w = CASTRA.wday || (CASTRA.wday = {}), key = "rest_"+e.id, done = w[key]===castraWDay();
  castraLatSay(e.nm, e.look, [ { la:"Gegroet, gast {naam}! Hier kun je uitrusten.", nl:"Greetings, guest {naam}! Here you can rest." },
    done ? { la:"Je hebt vandaag al gerust. Kom morgen terug!", nl:"You have already rested today. Come back tomorrow!" }
         : { la:"Wil je uitrusten?", nl:"Do you want to rest?", opts:[ { la:"Uitrusten", nl:"rest" }, { la:"Tot ziens", nl:"goodbye" } ] } ],
    k=>{
      if(done || k!==0) return;
      const hurt = castraHealAll();
      w[key] = castraWDay(); castraSave(); if(typeof castraPxpAdd==="function") castraPxpAdd(12, "Uitgerust");
      toast("🛏️ "+e.nm, (hurt.length ? hurt.length+" soldaat/soldaten zijn weer gezond. " : "Je soldaten waren al gezond. ")+"+12 ervaring.");
    });
}
function castraRegChamp(e){
  if(CASTRA_DLG) return;
  const key = "champ_"+e.id, done = (CASTRA.wday||{})[key]===castraWDay(), rid = CASTRA_WORLDS[e.region].parent;
  castraFsprProbe([["trn_champ_"+rid, "battle_front"]]);          // de pose van de kampioen alvast controleren (castra-vscene.js toont hem aan het begin van het gevecht)
  castraLatSay(e.nm, e.look, [ { la:"Gegroet, leider {naam}! Ik heb een sterke vechter.", nl:"Greetings, leader {naam}! I have a strong fighter." },
    done ? { la:"Vandaag heb je hem verslagen. Kom morgen terug!", nl:"Today you have defeated him. Come back tomorrow!" }
         : { la:"Durf je tegen hem te vechten? Wie wint, krijgt een beloning.", nl:"Do you dare to fight him? The winner gets a reward.", opts:[ { la:"Vechten", nl:"fight" }, { la:"Nu niet", nl:"not now" } ] } ],
    k=>{ if(!done && k===0) castraRegionFight(rid, e.fight.terrain, e.fight.form, e.fight.lvl, { key, reward:CASTRA_REG_REWARD.champ, gloria:2, pxp:25, token:true, why:"kampioen verslagen", pose:"trn_champ_"+rid }); });
}
function castraRegFetch(e){
  if(CASTRA_DLG) return;
  const rid = CASTRA_WORLDS[e.region].parent, F = CASTRA_REGSPEC[rid].cave.fetch, q = castraWQ(e.id);
  const say = (lines, done)=>castraLatSay(e.nm, e.look, lines, done);
  const hid = (q.step>=2 && typeof castraCaveHeroOf==="function") ? castraCaveHeroOf(e.id) : null;   // bewoner = held (castra-heroes.js): pas als haar opdracht klaar is
  if(hid){ castraNpcTalk(hid); return; }
  if(q.step===0){
    say([ F.ask, F.how ], ()=>{ q.step = 1; castraSave(); castraWobjDraw(); castraWRefreshHud && castraWRefreshHud(); });
  } else if(q.step===1){
    if(castraWItems()[F.item]){
      say([ F.thanks ], ()=>{
        delete castraWItems()[F.item]; q.step = 2;
        const t = castraWGive(Object.assign(castraWScaled({ aes:150, frumentum:75 }, castraWScale(rid)), { gloria:2 }));
        castraSave(); toast(F.icon+" "+castraLaText("recte"), t); castraWobjDraw();
        if(typeof castraPxpAdd==="function") castraPxpAdd(45, "Opdracht voltooid");
        if(typeof castraCardToken==="function") castraCardToken(1, "opdracht voltooid");
        if(typeof castraWRefreshHud==="function") castraWRefreshHud();
      });
    } else say([ F.wait ], null);
  } else say([ { la:"Tot ziens, leider {naam}! Het ga je goed!", nl:"Goodbye, leader {naam}! Farewell!" } ], null);
}
function castraRegBoss(e){
  if(CASTRA_DLG) return;
  const rid = CASTRA_WORLDS[e.region].parent;
  castraLatSay(e.nm, castraRegLook("rom", { armor:"vodden", haarkleur:"grijs", huid:"zeerlicht" }), [ { la:"Ik ben de bewaker van deze plek. Hier blijf ik!", nl:"I am the guardian of this place. Here I stay!" },
    { la:"Durf je met mij te vechten?", nl:"Do you dare to fight me?", opts:[ { la:"Vechten", nl:"fight" }, { la:"Wegrennen", nl:"run away" } ] } ],
    k=>{ if(k===0) castraRegionFight(rid, e.terrain, e.form, e.lvl, { key:"boss_"+e.id, reward:CASTRA_REG_REWARD.boss, gloria:2, pxp:30, token:true, why:e.nm+" verslagen" }); });
}

/* ---------- opdrachten in beeld ---------- */
const _castraQuestHudReg0 = castraQuestHud;
castraQuestHud = function(){
  let extra = "";
  const W = CASTRA_WORLDS[CASTRA_W_REGION], rid = W && W.parent;
  if(rid && CASTRA_REGSPEC[rid] && W.id==="caverna_"+rid && castraWQ("fetch_"+rid).step===1){
    const h = CASTRA_REGSPEC[rid].cave.fetch.hud;
    extra += `<div class="note" style="text-align:center">📜 ${castraLaHTML(h.la, h.nl, "fetch_hud_"+rid)}</div>`;
  }
  return _castraQuestHudReg0() + extra;
};
const _castraWobjOpusReg0 = castraWobjOpus;
castraWobjOpus = function(){
  const out = _castraWobjOpusReg0();
  Object.keys(CASTRA_REGSPEC).forEach(rid=>{ if(castraWQ("fetch_"+rid).step===1){ const h = CASTRA_REGSPEC[rid].cave.fetch.hud; out.push({ la:h.la, nl:CASTRA_WORLDS[rid].nm+": "+h.nl }); } });
  return out;
};

/* ---------- woordenlijst ---------- */
Object.assign(CASTRA_GLOSS, {
  "pugnatorem":"vechter (4e naamval)", "custos":"bewaker", "huius":"van deze", "loci":"plaats (van deze plaats)", "maneo":"ik blijf", "mecum":"met mij", "pugnare":"vechten",
  "viscum":"maretak", "taygeto":"in de Taygetos", "agnum":"lam (4e naamval)", "agnus":"lam", "cuniculo":"in the tunnel", "cuniculum":"tunnel (4e naamval)", "sagittam":"arrow (accusative)", "sagitta":"pijl", "balteum":"gordel (4e naamval)", "balteus":"gordel", "hippolytae":"van Hippolyta", "sepulcro":"in het graf", "sepulcrum":"graf", "ignem":"fire (accusative)", "ignis":"vuur", "hannibalis":"van Hannibal", "ebur":"olifantstand", "cornu":"hoorn", "antro":"in de grot", "pyramide":"in de piramide", "labyrintho":"in het labyrint", "antrum":"grot", "filum":"draad", "labyrinthum":"labyrint (4e naamval)", "scarabaeum":"scarabee (4e naamval)", "scarabaeus":"scarabee", "pyramidem":"piramide (4e naamval)",
  "sacrum":"heilig (4e naamval)", "meum":"mijn (4e naamval)", "quiescere":"uitrusten", "quievisti":"je hebt gerust", "quiesco":"ik rust uit",
});
