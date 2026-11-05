/* ============================================================================
   CASTRA HEROUM — HELDEN (data, loyaliteit, toewijzing, gesprekken)
   ----------------------------------------------------------------------------
   Een held is uniek en evolueert niet: vaste basiswaarden die per level groeien.
   Je vindt hem via een spoor (venatio) of in de wereld, doorloopt zijn
   missieketen (jagen -> proelium winnen -> overtuigen in het Latijn) en hij
   komt in je heroum. Daar:
   - Colloquium: een kort Latijns gesprek + vraag; juist = meer fides (vertrouwen);
     fides verhoogt het maximale level van de held en zijn gebouwbonus.
   - Assigna: een held leidt één gebouw en geeft dat gebouw een bonus (×1,5 op
     zijn lievelingsgebouw).
   - In het proelium vecht hij mee als toren.
   Opslag: CASTRA.heroes = [{ id, lvl, xp, fides, assigned }], CASTRA.talk = { day, n }.
   Ketenvoortgang: CASTRA.quests[heroId] = { step, acc, n } (zie castra-quests.js).
   Teksten: Latijn is voorlopig, ter controle door Gerben. Laadt NA castra-data.js
   en castra-latin.js, VÓÓR castra-quests.js.
   ============================================================================ */

const CASTRA_H = {
  capBase:10, capPerStep:10, fidesStep:25, maxLvl:50, xpPerLvl:3,   // zelfde levelschaal als soldaten; cap groeit met fides (10 → 50)
  fidesPerTalk:10, talkBase:2,            // gesprekken per dag = talkBase + heroum-level
  bonusBase:20, bonusPerFides:0.2, affinityMult:1.5,
  statGrowthPct:2.5, heroMult:1.5,         // +2,5% per level (zoals soldaten); heroMult: een held is een unieke topeenheid (op level 50 ≈ tier 4)
  assignable:["praetorium","lignatio","metallum","campus"],
};

/* ketenstappen: kill (n vijanden in terrein), win (proelium-missie), persuade (keuzevraag) */
const CASTRA_HERO_DATA = {
  aeneas: {
    nm:"Aeneas", region:"latium", type:"inf", affinity:"praetorium", always:true, world:{ x:26, y:22, dir:"right" },
    base:{ vita:64, impetus:13, tutela:12, celeritas:6, ambitus:3 },
    look:{ huid:"getint", haar:"kort", haarkleur:"bruin", baard:"baard", armor:"ceremonieel", cape:"lang", capekleur:"rood", helm:"geen", schild:"geen", wapen:"zwaard" },
    chain:[
      { kind:"kill", terrain:"silva", need:3,
        ask:{ la:"Gegroet, gast {naam}! Ik ben Aeneas. Vijanden in het bos zijn lastig. Versla drie vijanden in het bos, en je krijgt mijn hulp.", nl:"Greetings, guest {naam}! I am Aeneas. Enemies in the forest are a nuisance. Defeat three enemies in the forest and you will have my help." },
        hud:{ la:"Versla vijanden in het bos!", nl:"Defeat enemies in the forest!" },
        done:{ la:"Uitstekend! Je hebt drie vijanden verslagen.", nl:"Excellent! You have defeated three enemies." } },
      { kind:"win", mission:"m1",
        ask:{ la:"Goed! Verdedig nu het kamp. Win het eerste gevecht.", nl:"Good! Now defend the camp. Win the first battle." },
        hud:{ la:"Win het eerste gevecht!", nl:"Win the first battle!" },
        done:{ la:"Je hebt het kamp verdedigd! Ik dank je.", nl:"You have defended the camp! Thank you." } },
      { kind:"persuade",
        ask:{ la:"Waarom zou ik met je meegaan, leider {naam}?", nl:"Why should I go with you, leader {naam}?" },
        opts:[ { la:"Omdat ik vrienden bescherm en het kamp verdedig.", nl:"Because I protect my friends and defend the camp.", ok:true },
               { la:"Omdat ik van geld houd.", nl:"Because I love money." },
               { la:"Omdat ik niet wil vechten.", nl:"Because I don't want to fight." } ],
        join:{ la:"Ik ga met je mee, leider {naam}!", nl:"I will go with you, leader {naam}!" } },
    ],
    talks:[
      { la:"Troje is gevallen. Ik zoek een nieuw vaderland.", nl:"Troy has fallen. I am looking for a new homeland.",
        q:{ la:"Wat zoekt Aeneas?", nl:"What is Aeneas looking for?", opts:[ {la:"Een nieuw vaderland.",nl:"A new homeland.",ok:true}, {la:"Goud.",nl:"Gold."}, {la:"Eten.",nl:"Food."} ] } },
      { la:"Mijn vader is oud. Ik draag hem op mijn schouders.", nl:"My father is old. I carry him on my shoulders.",
        q:{ la:"Wie draagt Aeneas?", nl:"Who does Aeneas carry?", opts:[ {la:"Zijn vader.",nl:"His father.",ok:true}, {la:"Zijn zoon.",nl:"His son."}, {la:"Een paard.",nl:"A horse."} ] } },
      { la:"De goden helpen mij. Ik zeil naar Italië.", nl:"The gods help me. I sail to Italy.",
        q:{ la:"Waarheen zeilt Aeneas?", nl:"Where is Aeneas sailing to?", opts:[ {la:"Naar Italië.",nl:"To Italy.",ok:true}, {la:"Naar Griekenland.",nl:"To Greece."}, {la:"Naar Egypte.",nl:"To Egypt."} ] } },
    ],
  },
  romulus: {
    nm:"Romulus", region:"latium", type:"inf", affinity:"praetorium", world:{ x:28, y:10, dir:"right" },
    base:{ vita:58, impetus:15, tutela:10, celeritas:7, ambitus:3 },
    look:{ huid:"licht", haar:"wild", haarkleur:"zwart", baard:"geen", armor:"ceremonieel", cape:"kort", capekleur:"rood", helm:"geen", schild:"geen", wapen:"zwaard" },
    chain:[
      { kind:"kill", terrain:"campus", need:4,
        ask:{ la:"Gegroet, leider {naam}! Ik ben Romulus. Ik sticht een nieuwe stad. Versla vier vijanden op het veld en je zult mij helpen.", nl:"Greetings, leader {naam}! I am Romulus. I am founding a new city. Defeat four enemies in the field and you will help me." },
        hud:{ la:"Versla vijanden op het veld!", nl:"Defeat enemies in the field!" },
        done:{ la:"Uitstekend! Je hebt vier vijanden verslagen.", nl:"Excellent! You have defeated four enemies." } },
      { kind:"win", mission:"m2",
        ask:{ la:"Goed! Verdedig nu de Latijnse weg. Win het tweede gevecht.", nl:"Good! Now defend the Latin Road. Win the second battle." },
        hud:{ la:"Win het tweede gevecht!", nl:"Win the second battle!" },
        done:{ la:"Je hebt de weg verdedigd! Ik dank je.", nl:"You have defended the road! Thank you." } },
      { kind:"persuade",
        ask:{ la:"Rome zal een grote stad worden. Wat doe jij voor de stad?", nl:"Rome will become a great city. What do you do for the city?" },
        opts:[ { la:"Ik bouw muren en leid soldaten.", nl:"I build walls and lead soldiers.", ok:true },
               { la:"Ik verlaat mijn huis.", nl:"I leave my house." },
               { la:"Ik doe niets.", nl:"I do nothing." } ],
        join:{ la:"Ik ga met je mee, leider {naam}!", nl:"I will go with you, leader {naam}!" } },
    ],
    talks:[
      { la:"Een wolvin heeft mij gevoed. Ik heb een broer, Remus.", nl:"A she-wolf fed me. I have a brother, Remus.",
        q:{ la:"Wie voedde Romulus?", nl:"Who fed Romulus?", opts:[ {la:"Een wolvin.",nl:"A she-wolf.",ok:true}, {la:"Een koningin.",nl:"A queen."}, {la:"Een godin.",nl:"A goddess."} ] } },
      { la:"Ik sticht de stad op de Palatijn.", nl:"I am founding the city on the Palatine.",
        q:{ la:"Waar sticht Romulus de stad?", nl:"Where does Romulus found the city?", opts:[ {la:"Op een heuvel.",nl:"On a hill.",ok:true}, {la:"In de zee.",nl:"In the sea."}, {la:"In het bos.",nl:"In the forest."} ] } },
      { la:"Mijn stad heet Rome.", nl:"My city is called Rome.",
        q:{ la:"Hoe heet de stad?", nl:"What is the city called?", opts:[ {la:"Rome.",nl:"Rome.",ok:true}, {la:"Troje.",nl:"Troy."}, {la:"Athene.",nl:"Athens."} ] } },
    ],
  },
  horatius: {
    nm:"Horatius Cocles", region:"latium", type:"inf", affinity:"campus", world:{ x:52, y:22, dir:"down" },
    base:{ vita:70, impetus:12, tutela:15, celeritas:5, ambitus:2 },
    look:{ huid:"olijf", haar:"kort", haarkleur:"zwart", baard:"snor", armor:"middel", cape:"kort", capekleur:"rood", helm:"open", schild:"geen", wapen:"zwaard" },
    chain:[
      { kind:"kill", terrain:"tiberis", need:3,
        ask:{ la:"Gegroet, leider {naam}! Ik ben Horatius. Vijanden komen naar de Tiber. Versla drie vijanden bij de Tiber.", nl:"Greetings, leader {naam}! I am Horatius. Enemies are coming to the Tiber. Defeat three enemies at the Tiber." },
        hud:{ la:"Versla vijanden bij de Tiber!", nl:"Defeat enemies at the Tiber!" },
        done:{ la:"Uitstekend! Je hebt de brug gered.", nl:"Excellent! You have saved the bridge." } },
      { kind:"win", mission:"m2",
        ask:{ la:"Goed! Verdedig nu de weg. Win het tweede gevecht.", nl:"Good! Now defend the road. Win the second battle." },
        hud:{ la:"Win het tweede gevecht!", nl:"Win the second battle!" },
        done:{ la:"Je hebt de weg verdedigd! Ik dank je.", nl:"You have defended the road! Thank you." } },
      { kind:"persuade",
        ask:{ la:"Ik verdedig de brug. Verdedig jij de brug ook?", nl:"I defend the bridge. Will you defend the bridge too?" },
        opts:[ { la:"Ik verdedig ook onze vrienden.", nl:"I also defend our friends.", ok:true },
               { la:"Ik vlucht.", nl:"I run away." },
               { la:"Ik verlaat de brug.", nl:"I leave the bridge." } ],
        join:{ la:"Ik ga met je mee, leider {naam}!", nl:"I will go with you, leader {naam}!" } },
    ],
    talks:[
      { la:"De Sublicische brug ligt over de Tiber. Vijanden komen.", nl:"The Sublician Bridge spans the Tiber. Enemies are coming.",
        q:{ la:"Wat ligt over de Tiber?", nl:"What spans the Tiber?", opts:[ {la:"Een brug.",nl:"A bridge.",ok:true}, {la:"Een schip.",nl:"A ship."}, {la:"Een muur.",nl:"A wall."} ] } },
      { la:"Alleen verdedig ik de brug. Mijn vrienden slopen de brug.", nl:"I defend the bridge alone. My friends are tearing the bridge down.",
        q:{ la:"Wie verdedigt de brug?", nl:"Who defends the bridge?", opts:[ {la:"Horatius alleen.",nl:"Horatius alone.",ok:true}, {la:"Alle soldaten.",nl:"All the soldiers."}, {la:"Niemand.",nl:"Nobody."} ] } },
      { la:"Ik spring in de Tiber. Ik zwem naar de oever.", nl:"I jump into the Tiber. I swim to the bank.",
        q:{ la:"Waarin springt Horatius?", nl:"Where does Horatius jump?", opts:[ {la:"In de Tiber.",nl:"Into the Tiber.",ok:true}, {la:"In het bos.",nl:"In the forest."}, {la:"Op de berg.",nl:"Onto the mountain."} ] } },
    ],
  },
};


/* ---------- compacte bouwstenen voor de overige helden ---------- */
const _K = (region,terrain,need,ask,hud,done)=>({ kind:"kill", region, terrain, need, ask:{la:ask[0],nl:ask[1]}, hud:{la:hud[0],nl:hud[1]}, done:{la:done[0],nl:done[1]} });
const _W = (mission,ask,hud,done)=>({ kind:"win", mission, ask:{la:ask[0],nl:ask[1]}, hud:{la:hud[0],nl:hud[1]}, done:{la:done[0],nl:done[1]} });
const _P = (ask,good,b1,b2)=>({ kind:"persuade", ask:{la:ask[0],nl:ask[1]},
  opts:[ {la:good[0],nl:good[1],ok:true}, {la:b1[0],nl:b1[1]}, {la:b2[0],nl:b2[1]} ], join:{ la:"Ik ga met je mee, leider {naam}!", nl:"I will go with you, leader {naam}!" } });
const _T = (t,q,good,b1,b2)=>({ la:t[0], nl:t[1], q:{ la:q[0], nl:q[1], opts:[ {la:good[0],nl:good[1],ok:true}, {la:b1[0],nl:b1[1]}, {la:b2[0],nl:b2[1]} ] } });
const _look = (o)=>({ huid:"licht", haar:"kort", haarkleur:"bruin", baard:"geen", armor:"middel", cape:"geen", capekleur:"rood", helm:"geen", schild:"geen", wapen:"zwaard", ...o });
const _WIN_M1 = ["Win het eerste gevecht.","Win the first battle."];

Object.assign(CASTRA_HERO_DATA, {
  /* ----- Latium ----- */
  cloelia: { nm:"Cloelia", region:"latium", type:"cav", affinity:"lignatio", world:{ x:48, y:32, dir:"left" },
    base:{ vita:48, impetus:14, tutela:7, celeritas:11, ambitus:3 },
    look:_look({ huid:"licht", haar:"vlecht", haarkleur:"bruin", armor:"robe", cape:"kort", capekleur:"blauw" }),
    chain:[
      _K("latium","tiberis",3, ["Gegroet, leider {naam}! Ik ben Cloelia. Ik was gijzelaar, maar ik ben uit het kamp gevlucht. Versla drie vijanden bij de Tiber.","Greetings, leader {naam}! I am Cloelia. I was a hostage, but I escaped from the camp. Defeat three enemies at the Tiber."], ["Versla vijanden bij de Tiber!","Defeat enemies at the Tiber!"], ["Uitstekend! Je hebt de Tiber verdedigd.","Excellent! You have defended the Tiber."]),
      _W("m3", ["Goed! Val nu Ardea aan. Win het derde gevecht.","Good! Now attack Ardea. Win the third battle."], ["Win het derde gevecht!","Win the third battle!"], ["Je hebt Ardea verslagen! Ik dank je.","You have defeated Ardea! Thank you."]),
      _P(["Ik steek de Tiber te paard over. Ben jij ook dapper?","I cross the Tiber on horseback. Are you brave too?"], ["Ja, ik ben nergens bang voor.","Yes, I am afraid of nothing."], ["Nee, ik ben overal bang voor.","No, I am afraid of everything."], ["Ik blijf thuis.","I stay at home."]),
    ],
    talks:[
      _T(["Ik was gijzelaar bij de vijanden. 's Nachts vlucht ik.","I was a hostage among the enemy. I escape at night."], ["Wanneer vlucht Cloelia?","When does Cloelia escape?"], ["'s Nachts.","At night."], ["'s Ochtends.","In the morning."], ["'s Avonds.","In the evening."]),
      _T(["Ik pak een paard en steek de Tiber over.","I take a horse and cross the Tiber."], ["Wat pakt Cloelia?","What does Cloelia take?"], ["Een paard.","A horse."], ["Een zwaard.","A sword."], ["Een schip.","A ship."]),
      _T(["De Romeinen prijzen mij. Mijn standbeeld staat aan de weg.","The Romans praise me. My statue stands on the road."], ["Wie prijst Cloelia?","Who praises Cloelia?"], ["De Romeinen.","The Romans."], ["De vijanden.","The enemies."], ["Niemand.","Nobody."]),
    ] },
  mucius: { nm:"Mucius Scaevola", region:"latium", type:"inf", affinity:"metallum", world:{ x:40, y:14, dir:"down" },
    base:{ vita:62, impetus:15, tutela:11, celeritas:6, ambitus:2 },
    look:_look({ huid:"getint", haar:"kort", haarkleur:"zwart", baard:"sikensnor", armor:"middel", cape:"lang", capekleur:"groen", helm:"bandana" }),
    chain:[
      _K("latium","via",3, ["Gegroet, leider {naam}! Ik ben Mucius. Er zijn vijanden op de weg. Versla drie vijanden op de weg.","Greetings, leader {naam}! I am Mucius. There are enemies on the road. Defeat three enemies on the road."], ["Versla vijanden op de weg!","Defeat enemies on the road!"], ["Uitstekend! Je hebt de weg schoongemaakt.","Excellent! You have cleared the road."]),
      _W("m3", ["Goed! Val nu Ardea aan. Win het derde gevecht.","Good! Now attack Ardea. Win the third battle."], ["Win het derde gevecht!","Win the third battle!"], ["Je hebt Ardea verslagen! Ik dank je.","You have defeated Ardea! Thank you."]),
      _P(["Ik houd mijn rechterhand in het vuur. Ben ik soms bang voor pijn?","I hold my right hand in the fire. Am I afraid of pain, perhaps?"], ["Nee, want ik hou van mijn vaderland.","No, because I love my homeland."], ["Ja, ik ben bang voor pijn.","Yes, I am afraid of pain."], ["Ik hou van vuur.","I love fire."]),
    ],
    talks:[
      _T(["Ik ga naar de koning van de vijand. Ik wil hem doden.","I am going to the enemy king. I want to kill him."], ["Naar wie gaat Mucius?","Who is Mucius going to?"], ["Naar de koning.","To the king."], ["Naar zijn moeder.","To his mother."], ["Naar een vriend.","To a friend."]),
      _T(["Ik leg mijn rechterhand in het vuur.","I put my right hand into the fire."], ["Wat legt Mucius in het vuur?","What does Mucius put into the fire?"], ["Zijn rechterhand.","His right hand."], ["Een boek.","A book."], ["Zijn voet.","His foot."]),
      _T(["De koning laat mij gaan. Mijn naam is Scaevola.","The king lets me go. My name is Scaevola."], ["Wie laat Mucius gaan?","Who lets Mucius go?"], ["De koning.","The king."], ["Zijn moeder.","His mother."], ["De leider.","The leader."]),
    ] },
  camilla: { nm:"Camilla", region:"latium", type:"rng", affinity:"lignatio", world:{ x:12, y:18, dir:"right" },
    base:{ vita:44, impetus:15, tutela:6, celeritas:12, ambitus:7 },
    look:_look({ huid:"olijf", haar:"lang", haarkleur:"zwart", armor:"vodden", cape:"lang", capekleur:"groen", helm:"bandana" }),
    chain:[
      _K("latium","silva",4, ["Gegroet, leider {naam}! Ik ben Camilla. Ik woon in het bos. Versla vier vijanden in het bos.","Greetings, leader {naam}! I am Camilla. I live in the forest. Defeat four enemies in the forest."], ["Versla vijanden in het bos!","Defeat enemies in the forest!"], ["Uitstekend! Je hebt het bos gered.","Excellent! You have saved the forest."]),
      _W("m3", ["Goed! Val nu Ardea aan. Win het derde gevecht.","Good! Now attack Ardea. Win the third battle."], ["Win het derde gevecht!","Win the third battle!"], ["Je hebt Ardea verslagen! Ik dank je.","You have defeated Ardea! Thank you."]),
      _P(["Ik ren snel en schiet pijlen. Wat doe jij?","I run fast and shoot arrows. What do you do?"], ["Ik ren snel en vecht tegen de vijanden.","I run fast and fight the enemies."], ["Ik loop langzaam.","I walk slowly."], ["Ik slaap in een huisje.","I sleep in a little house."]),
    ],
    talks:[
      _T(["Ik hou van de bossen. Ik ren met de paarden.","I love the forests. I run with the horses."], ["Waar houdt Camilla van?","What does Camilla love?"], ["Van de bossen.","The forests."], ["Van schepen.","Ships."], ["Van de stad.","The city."]),
      _T(["Ik schiet pijlen en versla de vijanden.","I shoot arrows and defeat the enemies."], ["Wat schiet Camilla?","What does Camilla shoot?"], ["Pijlen.","Arrows."], ["Boeken.","Books."], ["Water.","Water."]),
      _T(["Mijn vader heeft mij in het bos grootgebracht.","My father raised me in the forest."], ["Waar bracht de vader Camilla groot?","Where did Camilla's father raise her?"], ["In het bos.","In the forest."], ["In de stad.","In the city."], ["In de zee.","In the sea."]),
    ] },

  /* ----- Graecia ----- */
  hercules: { nm:"Hercules", region:"graecia", type:"inf", affinity:"campus", world:{ x:16, y:4, dir:"down" },
    base:{ vita:90, impetus:19, tutela:14, celeritas:6, ambitus:2 },
    look:_look({ huid:"brons", haar:"wild", haarkleur:"bruin", baard:"baard", armor:"vodden", cape:"lang", capekleur:"oranje" }),
    chain:[
      _K("graecia","mons",4, ["Gegroet, leider {naam}! Ik ben Hercules. Er zijn leeuwen op de berg. Versla vier vijanden op de berg.","Greetings, leader {naam}! I am Hercules. There are lions on the mountain. Defeat four enemies on the mountain."], ["Versla vijanden op de berg!","Defeat enemies on the mountain!"], ["Uitstekend! Je hebt de berg schoongemaakt.","Excellent! You have cleared the mountain."]),
      _W("g1", ["Goed! Nu doen we de eerste labor. Win het gevecht.","Good! Now we do the first labour. Win the battle."], ["Win de eerste labor!","Win the first labour!"], ["Je hebt de labor volbracht! Ik dank je.","You have completed the labour! Thank you."]),
      _P(["Ik doe veel opdrachten. Werk jij ook hard?","I do many tasks. Do you work hard too?"], ["Ja, ik werk dapper.","Yes, I work bravely."], ["Nee, ik hou van rust.","No, I love rest."], ["Ik werk nooit.","I never work."]),
    ],
    talks:[
      _T(["Ik versla de Nemeïsche leeuw. Zijn huid bedekt mij.","I defeat the Nemean lion. His skin covers me."], ["Wat verslaat Hercules?","What does Hercules defeat?"], ["Een leeuw.","A lion."], ["Een schip.","A ship."], ["Een muur.","A wall."]),
      _T(["Ik voer twaalf opdrachten uit.","I carry out twelve tasks."], ["Hoeveel opdrachten voert Hercules uit?","How many tasks does Hercules carry out?"], ["Twaalf.","Twelve."], ["Drie.","Three."], ["Honderd.","One hundred."]),
      _T(["Ik versla de Hydra in het moeras.","I defeat the Hydra in the swamp."], ["Waar is de Hydra?","Where is the Hydra?"], ["In het moeras.","In the swamp."], ["In de lucht.","In the air."], ["In de stad.","In the city."]),
    ] },
  perseus: { nm:"Perseus", region:"graecia", type:"cav", affinity:"metallum", world:{ x:24, y:12, dir:"left" },
    base:{ vita:56, impetus:18, tutela:8, celeritas:13, ambitus:4 },
    look:_look({ huid:"licht", haar:"hanekam", haarkleur:"blond", armor:"ceremonieel", cape:"engelenvleugels", helm:"geen" }),
    chain:[
      _K("graecia","litus",3, ["Gegroet, leider {naam}! Ik ben Perseus. De Gorgonen wonen bij de kust. Versla drie vijanden bij de kust.","Greetings, leader {naam}! I am Perseus. The Gorgons live by the coast. Defeat three enemies by the coast."], ["Versla vijanden bij de kust!","Defeat enemies by the coast!"], ["Uitstekend! Je hebt de kust gered.","Excellent! You have saved the coast."]),
      _W("g1", ["Goed! Nu gaan we Medusa aanvallen. Win het eerste gevecht.","Good! Now we attack Medusa. Win the first battle."], ["Win het gevecht!","Win the battle!"], ["Je hebt het gevecht gewonnen! Ik dank je.","You have won the battle! Thank you."]),
      _P(["Ik kan het hoofd van Medusa dragen. Help jij mij?","I can carry Medusa's head. Will you help me?"], ["Ja, ik help je graag.","Yes, I'm happy to help you."], ["Nee, ik ben bang voor Medusa!","No, I am afraid of Medusa!"], ["Ik hoor niets.","I hear nothing."]),
    ],
    talks:[
      _T(["Medusa heeft slangen op haar hoofd.","Medusa has snakes on her head."], ["Wat heeft Medusa op haar hoofd?","What does Medusa have on her head?"], ["Slangen.","Snakes."], ["Bloemen.","Flowers."], ["Goud.","Gold."]),
      _T(["Ik heb gevleugelde sandalen. Ik vlieg door de lucht.","I have winged sandals. I fly through the air."], ["Wat heeft Perseus?","What does Perseus have?"], ["Gevleugelde sandalen.","Winged sandals."], ["Een groot schip.","A big ship."], ["Een wit paard.","A white horse."]),
      _T(["Ik red Andromeda en versla Medusa.","I rescue Andromeda and defeat Medusa."], ["Wie redt Perseus?","Who does Perseus rescue?"], ["Andromeda.","Andromeda."], ["Helena.","Helen."], ["Cloelia.","Cloelia."]),
    ] },
  theseus: { nm:"Theseus", region:"graecia", type:"inf", affinity:"praetorium", world:{ x:19, y:12, dir:"down" },
    base:{ vita:72, impetus:16, tutela:12, celeritas:8, ambitus:3 },
    look:_look({ huid:"licht", haar:"middel", haarkleur:"bruin", baard:"geen", armor:"ceremonieel", cape:"kort", capekleur:"blauw", helm:"geen" }),
    chain:[
      _K("graecia","urbs",4, ["Gegroet, leider {naam}! Ik ben Theseus. De Minotaurus zit in het labyrint. Versla vier vijanden in de stad.","Greetings, leader {naam}! I am Theseus. The Minotaur is in the labyrinth. Defeat four enemies in the city."], ["Versla vijanden in de stad!","Defeat enemies in the city!"], ["Uitstekend! Je hebt de stad gered.","Excellent! You have saved the city."]),
      _W("g2", ["Goed! Nu gaan we het labyrint in. Win het tweede gevecht.","Good! Now we enter the labyrinth. Win the second battle."], ["Win het tweede gevecht!","Win the second battle!"], ["Je hebt het labyrint verslagen! Ik dank je.","You have defeated the labyrinth! Thank you."]),
      _P(["Ik zoek de Minotaurus in het labyrint. Ga jij met mij mee?","I am looking for the Minotaur in the labyrinth. Will you come with me?"], ["Ja, ik volg je en ik red de broers.","Yes, I follow you and I rescue the brothers."], ["Nee, ik ben bang voor het labyrint.","No, I am afraid of the labyrinth."], ["De Minotaurus is mijn vriend.","The Minotaur is my friend."]),
    ],
    talks:[
      _T(["De Minotaurus woont in het labyrint.","The Minotaur lives in the labyrinth."], ["Waar woont de Minotaurus?","Where does the Minotaur live?"], ["In het labyrint.","In the labyrinth."], ["In het bos.","In the forest."], ["In de zee.","In the sea."]),
      _T(["Ariadne geeft mij een draad.","Ariadne gives me a thread."], ["Wat geeft Ariadne?","What does Ariadne give?"], ["Een draad.","A thread."], ["Een zwaard.","A sword."], ["Geld.","Money."]),
      _T(["Ik versla de Minotaurus en ga uit het labyrint.","I defeat the Minotaur and leave the labyrinth."], ["Wie verslaat Theseus?","Who defeats Theseus?"], ["De Minotaurus.","The Minotaur."], ["De leeuw.","The lion."], ["De Hydra.","The Hydra."]),
    ] },
  atalanta: { nm:"Atalanta", region:"graecia", type:"rng", affinity:"lignatio", world:{ x:7, y:15, dir:"right" },
    base:{ vita:46, impetus:17, tutela:6, celeritas:14, ambitus:7 },
    look:_look({ huid:"olijf", haar:"vlecht", haarkleur:"bruin", armor:"vodden", cape:"kort", capekleur:"groen", helm:"bandana" }),
    chain:[
      _K("graecia","olea",4, ["Gegroet, leider {naam}! Ik ben Atalanta. Ik jaag in de olijfgaarden. Versla vier vijanden in de olijfgaarden.","Greetings, leader {naam}! I am Atalanta. I hunt in the olive groves. Defeat four enemies in the olive groves."], ["Versla vijanden in de olijfgaarden!","Defeat enemies in the olive groves!"], ["Uitstekend! Je hebt de olijfgaarden gered.","Excellent! You have saved the olive groves."]),
      _W("g1", ["Goed! Nu zoeken we het everzwijn. Win het gevecht.","Good! Now we look for the boar. Win the battle."], ["Win het gevecht!","Win the battle!"], ["Je hebt het gevecht gewonnen! Ik dank je.","You have won the battle! Thank you."]),
      _P(["Ik ben de snelste. Ren jij snel?","I am the fastest. Do you run fast?"], ["Ik ren snel, maar ik verslaag jou niet.","I run fast, but I don't beat you."], ["Ik ren nooit.","I never run."], ["Ik ren langzaam en slaap.","I run slowly and sleep."]),
    ],
    talks:[
      _T(["Ik versla het Calydonische everzwijn met pijlen.","I defeat the Calydonian boar with arrows."], ["Wat verslaat Atalanta?","What does Atalanta defeat?"], ["Een everzwijn.","A boar."], ["Een leeuw.","A lion."], ["Een draak.","A dragon."]),
      _T(["In het hardlopen versla ik alle mannen.","In running I beat all the men."], ["Wie is de snelste?","Who is the fastest?"], ["Atalanta.","Atalanta."], ["Hercules.","Hercules."], ["Jason.","Jason."]),
      _T(["Gouden appels houden mij op.","Golden apples hold me up."], ["Wat houdt Atalanta op?","What holds Atalanta up?"], ["Gouden appels.","Golden apples."], ["Water.","Water."], ["Sneeuw.","Snow."]),
    ] },
  iason: { nm:"Iason", region:"graecia", type:"inf", affinity:"lignatio", world:{ x:23, y:19, dir:"up" },
    base:{ vita:66, impetus:15, tutela:11, celeritas:8, ambitus:3 },
    look:_look({ huid:"getint", haar:"kort", haarkleur:"blond", baard:"geen", armor:"middel", cape:"kort", capekleur:"goud", helm:"open" }),
    chain:[
      _K("graecia","litus",3, ["Gegroet, leider {naam}! Ik ben Jason. Ik bouw het schip Argo. Versla drie vijanden bij de kust.","Greetings, leader {naam}! I am Jason. I am building the ship Argo. Defeat three enemies by the coast."], ["Versla vijanden bij de kust!","Defeat enemies by the coast!"], ["Uitstekend! Je hebt de kust bevrijd.","Excellent! You have freed the coast."]),
      _W("g2", ["Goed! Nu zoeken we het gouden vlies. Win het tweede gevecht.","Good! Now we look for the Golden Fleece. Win the second battle."], ["Win het tweede gevecht!","Win the second battle!"], ["Je hebt het gevecht gewonnen! Ik dank je.","You have won the battle! Thank you."]),
      _P(["Ik zeil voor het gouden vlies. Heb jij een schip?","I sail for the Golden Fleece. Do you have a ship?"], ["Ik heb een schip en dappere zeelieden.","I have a ship and brave sailors."], ["Ik heb geen schip, maar ik ben bang.","I have no ship, but I am afraid."], ["Ik hou niet van goud.","I don't like gold."]),
    ],
    talks:[
      _T(["Ik bouw het schip Argo.","I build the ship Argo."], ["Welk schip bouwt Jason?","Which ship does Jason build?"], ["De Argo.","The Argo."], ["De Adelaar.","The Eagle."], ["De Maan.","The Moon."]),
      _T(["Het gouden vlies is in Colchis.","The Golden Fleece is in Colchis."], ["Wat is er in Colchis?","What is in Colchis?"], ["Het gouden vlies.","The Golden Fleece."], ["Een grote stad.","A big city."], ["Een hoge muur.","A high wall."]),
      _T(["Medea helpt mij. Ze laat de draak slapen.","Medea helps me. She puts the dragon to sleep."], ["Wie helpt Jason?","Who helps Jason?"], ["Medea.","Medea."], ["Circe.","Circe."], ["Hera.","Hera."]),
    ] },

  medea: { nm:"Medea", region:"graecia", type:"sup", affinity:"praetorium", world:{ x:36, y:13, dir:"down" },
    base:{ vita:52, impetus:12, tutela:9, celeritas:9, ambitus:6 },
    look:_look({ huid:"olijf", haar:"lang", haarkleur:"zwart", armor:"robe", cape:"lang", capekleur:"paars", helm:"geen", wapen:"staf" }),
    chain:[
      _K("graecia","olea",3, ["Gegroet, leider {naam}! Ik ben Medea. Ik zoek kruiden. Versla drie vijanden in de olijfgaard.","Greetings, leader {naam}! I am Medea. I am looking for herbs. Defeat three enemies in the olive grove."], ["Versla vijanden in de olijfgaard!","Defeat enemies in the olive grove!"], ["Uitstekend! De olijfgaard is vrij.","Excellent! The olive grove is free."]),
      _W("g2", ["Goed! Nu help ik Jason. Win het tweede gevecht.","Good! Now I help Jason. Win the second battle."], ["Win het tweede gevecht!","Win the second battle!"], ["Je hebt het gevecht gewonnen! Ik dank je.","You have won the battle! Thank you."]),
      _P(["Waarom zou ik met je meegaan, leider {naam}?","Why should I go with you, leader {naam}?"], ["Omdat ik vrienden bescherm.","Because I protect my friends."], ["Omdat ik van gif houd.","Because I love poison."], ["Omdat ik wil vluchten.","Because I want to flee."]),
    ],
    talks:[
      _T(["Ik verzamel kruiden in het bos.","I gather herbs in the forest."], ["Wat verzamelt Medea?","What does Medea gather?"], ["Kruiden.","Herbs."], ["Stenen.","Stones."], ["Bloemen.","Flowers."]),
      _T(["Hecate is mijn godin.","Hecate is my goddess."], ["Wie is de godin van Medea?","Who is Medea's goddess?"], ["Hecate.","Hecate."], ["Venus.","Venus."], ["Minerva.","Minerva."]),
      _T(["Ik laat de draak slapen. Jason pakt het vlies.","I put the dragon to sleep. Jason takes the fleece."], ["Wie laat de draak slapen?","Who puts the dragon to sleep?"], ["Medea.","Medea."], ["Jason.","Jason."], ["Hercules.","Hercules."]),
    ] },
  daedalus: { nm:"Daedalus", region:"graecia", type:"rng", affinity:"metallum", cave:"fetch_graecia",   // dezelfde persoon als de bewoner van het labyrint
    base:{ vita:54, impetus:14, tutela:8, celeritas:7, ambitus:7 },
    look:_look({ huid:"getint", haar:"kort", haarkleur:"bruin", baard:"baard", armor:"licht", cape:"kort", capekleur:"oranje", helm:"geen", wapen:"knuppel" }),
    chain:[
      _K("graecia","litus",3, ["Gegroet, leider {naam}! Ik ben Daedalus. Ik bouw machines. Versla drie vijanden bij de kust.","Greetings, leader {naam}! I am Daedalus. I build machines. Defeat three enemies by the coast."], ["Versla vijanden bij de kust!","Defeat enemies by the coast!"], ["Uitstekend! Je hebt de kust bevrijd.","Excellent! You have freed the coast."]),
      _W("g1", ["Goed! Nu bouw ik het labyrint. Win het eerste gevecht.","Good! Now I build the labyrinth. Win the first battle."], ["Win het eerste gevecht!","Win the first battle!"], ["Je hebt het gevecht gewonnen! Ik dank je.","You have won the battle! Thank you."]),
      _P(["Waarom zou ik met je meegaan, leider {naam}?","Why should I go with you, leader {naam}?"], ["Omdat je vernuft groot is.","Because your ingenuity is great."], ["Omdat ik van de gevangenis houd.","Because I love prison."], ["Omdat ik bang ben voor machines.","Because I am afraid of machines."]),
    ],
    talks:[
      _T(["Ik bouw het labyrint voor Minos.","I build the labyrinth for Minos."], ["Wie bouwt het labyrint?","Who builds the labyrinth?"], ["Daedalus.","Daedalus."], ["Theseus.","Theseus."], ["Minos.","Minos."]),
      _T(["Ik hou van mijn zoon Icarus.","I love my son Icarus."], ["Van wie houdt Daedalus?","Who does Daedalus love?"], ["Icarus.","Icarus."], ["De Minotaurus.","The Minotaur."], ["Minos.","Minos."]),
      _T(["Ik maak vleugels van veren en was.","I make wings from feathers and wax."], ["Waarvan zijn de vleugels gemaakt?","What are the wings made of?"], ["Van veren en was.","Of feathers and wax."], ["Van ijzer.","Of iron."], ["Van hout.","Of wood."]),
    ] },

  prometheus: { nm:"Prometheus", region:"graecia", type:"inf", affinity:"metallum", world:{ x:50, y:28, dir:"left" },
    base:{ vita:86, impetus:17, tutela:13, celeritas:6, ambitus:3 },
    look:_look({ huid:"brons", haar:"wild", haarkleur:"zwart", baard:"baard", armor:"vodden", cape:"geen", wapen:"knuppel" }),
    chain:[
      _K("graecia","litus",3, ["Gegroet, leider {naam}! Ik ben Prometheus. Ik gaf de mensen het vuur. Versla drie vijanden bij de kust.","Greetings, leader {naam}! I am Prometheus. I gave fire to humankind. Defeat three enemies by the coast."], ["Versla vijanden bij de kust!","Defeat enemies by the coast!"], ["Uitstekend! Je hebt de kust bevrijd.","Excellent! You have freed the coast."]),
      _W("g1", ["Goed! Nu verzet ik me tegen Jupiter. Win het eerste gevecht.","Good! Now I resist Jupiter. Win the first battle."], ["Win het eerste gevecht!","Win the first battle!"], ["Je hebt het gevecht gewonnen! Ik dank je.","You have won the battle! Thank you."]),
      _P(["Jupiter straft mij. Waarom zou ik met je meegaan?","Jupiter punishes me. Why should I go with you?"], ["Omdat ik mensen help.","Because I help people."], ["Omdat ik bang ben voor Jupiter.","Because I am afraid of Jupiter."], ["Omdat ik het vuur haat.","Because I hate fire."]),
    ],
    talks:[
      _T(["Ik heb het vuur uit de hemel gestolen.","I stole fire from heaven."], ["Wat heeft Prometheus gestolen?","What did Prometheus steal?"], ["Het vuur.","Fire."], ["Goud.","Gold."], ["Een paard.","A horse."]),
      _T(["Ik heb de mensen van klei gemaakt.","I made humans from clay."], ["Waarvan zijn de mensen gemaakt?","What are humans made of?"], ["Van klei.","Of clay."], ["Van goud.","Of gold."], ["Van water.","Of water."]),
      _T(["Een adelaar eet mijn lever. Hercules bevrijdt mij.","An eagle eats my liver. Hercules frees me."], ["Wie bevrijdt Prometheus?","Who frees Prometheus?"], ["Hercules.","Hercules."], ["Jason.","Jason."], ["Achilles.","Achilles."]),
    ] },

  /* ----- Troia ----- */
  achilles: { nm:"Achilles", region:"troia", type:"inf", affinity:"campus", world:{ x:20, y:18, dir:"up" },
    base:{ vita:92, impetus:18, tutela:14, celeritas:9, ambitus:3 },   // was 100/22/15: als prestigevorm schade van 2,4x een tier 4-soldaat, nu ±1,7x (mediaan van de helden ±1,4x)
    look:_look({ huid:"licht", haar:"middel", haarkleur:"blond", baard:"geen", armor:"ceremonieel", cape:"kort", capekleur:"rood", helm:"open" }),
    chain:[
      _K("troia","campus",4, ["Gegroet, leider {naam}! Ik ben Achilles. De Trojanen vechten voor de muren. Versla vier vijanden op het veld.","Greetings, leader {naam}! I am Achilles. The Trojans are fighting in front of the walls. Defeat four enemies in the field."], ["Versla vijanden op het veld!","Defeat enemies in the field!"], ["Uitstekend! Je hebt het veld schoongemaakt.","Excellent! You have cleared the field."]),
      _W("t1", ["Goed! Val nu de muren van Troje aan. Win het gevecht.","Good! Now attack the walls of Troy. Win the battle."], ["Win het gevecht!","Win the battle!"], ["Je hebt de muren verslagen! Ik dank je.","You have conquered the walls! Thank you."]),
      _P(["Mijn woede is groot. Waarom vecht jij?","My anger is great. Why do you fight?"], ["Ik vecht voor mijn vrienden.","I fight for my friends."], ["Ik vecht voor geld.","I fight for money."], ["Ik vecht niet.","I do not fight."]),
    ],
    talks:[
      _T(["Mijn moeder is een godin. Ze heet Thetis.","My mother is a goddess. Her name is Thetis."], ["Welke godin is de moeder van Achilles?","Which goddess is Achilles' mother?"], ["Thetis.","Thetis."], ["Athena.","Athena."], ["Venus.","Venus."]),
      _T(["Mijn hiel is zwak.","My heel is weak."], ["Wat is er zwak aan Achilles?","What is weak about Achilles?"], ["De hiel.","The heel."], ["Het hoofd.","The head."], ["De hand.","The hand."]),
      _T(["Patroclus was mijn vriend.","Patroclus was my friend."], ["Wie is de vriend van Achilles?","Who is Achilles' friend?"], ["Patroclus.","Patroclus."], ["Hector.","Hector."], ["Priamus.","Priam."]),
    ] },
  hector: { nm:"Hector", region:"troia", type:"inf", affinity:"praetorium", world:{ x:20, y:6, dir:"down" },
    base:{ vita:88, impetus:19, tutela:16, celeritas:8, ambitus:3 },
    look:_look({ huid:"getint", haar:"kort", haarkleur:"zwart", baard:"baard", armor:"middel", cape:"lang", capekleur:"blauw", helm:"open" }),
    chain:[
      _K("troia","muros",4, ["Gegroet, leider {naam}! Ik ben Hector. Ik verdedig Troje. Versla vier vijanden voor de muren.","Greetings, leader {naam}! I am Hector. I defend Troy. Defeat four enemies in front of the walls."], ["Versla vijanden voor de muren!","Defeat enemies in front of the walls!"], ["Uitstekend! Je hebt de muren gered.","Excellent! You have saved the walls."]),
      _W("t1", ["Goed! Verdedig nu de muren van Troje. Win het gevecht.","Good! Now defend the walls of Troy. Win the battle."], ["Win het gevecht!","Win the battle!"], ["Je hebt de muren verdedigd! Ik dank je.","You have defended the walls! Thank you."]),
      _P(["Ik vecht voor mijn vaderland. Hou jij ook van jouw vaderland?","I fight for my homeland. Do you love your homeland too?"], ["Ja, ik hou van mijn vaderland en mijn familie.","Yes, I love my homeland and my family."], ["Nee, ik haat mijn vaderland.","No, I hate my homeland."], ["Mijn vaderland betekent niets voor mij.","My homeland means nothing to me."]),
    ],
    talks:[
      _T(["Priamus is mijn vader. Hij is de koning van Troje.","Priam is my father. He is the king of Troy."], ["Wie is de koning van Troje?","Who is the king of Troy?"], ["Priamus.","Priam."], ["Agamemnon.","Agamemnon."], ["Achilles.","Achilles."]),
      _T(["Andromache is mijn vrouw.","Andromache is my wife."], ["Wie is de vrouw van Hector?","Who is Hector's wife?"], ["Andromache.","Andromache."], ["Helena.","Helen."], ["Cassandra.","Cassandra."]),
      _T(["Voor de muren vecht ik met Achilles.","In front of the walls I fight Achilles."], ["Met wie vecht Hector?","Who does Hector fight?"], ["Met Achilles.","Achilles."], ["Met Paris.","Paris."], ["Met een paard.","A horse."]),
    ] },
  ulixes: { nm:"Ulixes", region:"troia", type:"sup", affinity:"metallum", world:{ x:26, y:10, dir:"left" },
    base:{ vita:60, impetus:11, tutela:10, celeritas:9, ambitus:6 },
    look:_look({ huid:"olijf", haar:"kort", haarkleur:"bruin", baard:"baard", armor:"robe", cape:"kort", capekleur:"groen", helm:"standard" }),
    chain:[
      _K("troia","litus",3, ["Gegroet, leider {naam}! Ik ben Odysseus. De schepen van de Grieken liggen aan de kust. Versla drie vijanden bij de kust.","Greetings, leader {naam}! I am Odysseus. The Greek ships lie on the coast. Defeat three enemies by the coast."], ["Versla vijanden bij de kust!","Defeat enemies by the coast!"], ["Uitstekend! Je hebt de schepen gered.","Excellent! You have saved the ships."]),
      _W("t2", ["Goed! Nu bouwen we het houten paard. Win het tweede gevecht.","Good! Now we build the wooden horse. Win the second battle."], ["Win het tweede gevecht!","Win the second battle!"], ["Je hebt het paard gebouwd! Ik dank je.","You have built the horse! Thank you."]),
      _P(["Ik ben sluw. Ik maak plannen. Wie maakt plannen met jou?","I am cunning. I make plans. Who makes plans with you?"], ["Ik maak met jou plannen.","I make plans with you."], ["Niemand geeft mij een plan.","Nobody gives me a plan."], ["Ik ben bang voor het paard.","I am afraid of the horse."]),
    ],
    talks:[
      _T(["Ik bouw het houten paard. Soldaten verbergen zich in het paard.","I build the wooden horse. Soldiers hide inside the horse."], ["Wat bouwt Odysseus?","What does Odysseus build?"], ["Een houten paard.","A wooden horse."], ["Een hoge muur.","A high wall."], ["Een groot schip.","A big ship."]),
      _T(["Ik wil naar huis terugkeren. Penelope wacht op mij.","I want to return home. Penelope is waiting for me."], ["Wie wacht op Odysseus?","Who is waiting for Odysseus?"], ["Penelope.","Penelope."], ["Circe.","Circe."], ["Calypso.","Calypso."]),
      _T(["Polyphemus heeft één oog.","Polyphemus has one eye."], ["Hoeveel ogen heeft Polyphemus?","How many eyes does Polyphemus have?"], ["Eén.","One."], ["Twee.","Two."], ["Drie.","Three."]),
    ] },
  penthesilea: { nm:"Penthesilea", region:"troia", type:"rng", affinity:"campus", world:{ x:7, y:10, dir:"left" },
    base:{ vita:54, impetus:19, tutela:8, celeritas:12, ambitus:7 },
    look:_look({ huid:"licht", haar:"lang", haarkleur:"rood", armor:"middel", cape:"lang", capekleur:"paars", helm:"geen" }),
    chain:[
      _K("troia","scamander",3, ["Gegroet, leider {naam}! Ik ben Penthesilea. Ik vecht bij de Scamander. Versla drie vijanden bij de Scamander.","Greetings, leader {naam}! I am Penthesilea. I fight at the Scamander. Defeat three enemies at the Scamander."], ["Versla vijanden bij de Scamander!","Defeat enemies at the Scamander!"], ["Uitstekend! Je hebt de Scamander gered.","Excellent! You have saved the Scamander."]),
      _W("t2", ["Goed! Nu helpen we Troje. Win het tweede gevecht.","Good! Now we help Troy. Win the second battle."], ["Win het tweede gevecht!","Win the second battle!"], ["Je hebt Troje geholpen! Ik dank je.","You have helped Troy! Thank you."]),
      _P(["Ik ben de koningin van de Amazones. Vecht jij voor Troje?","I am the queen of the Amazons. Do you fight for Troy?"], ["Ja, ik vecht voor Troje.","Yes, I fight for Troy."], ["Nee, ik vecht voor de vijanden.","No, I fight for the enemies."], ["Ik ga naar huis.","I am going home."]),
    ],
    talks:[
      _T(["De Amazones zijn dappere vrouwen.","The Amazons are brave women."], ["Wie zijn de Amazones?","Who are the Amazons?"], ["Dappere vrouwen.","Brave women."], ["Luie mannen.","Lazy men."], ["Kleine jongens.","Little boys."]),
      _T(["Ik heb een boog en pijlen.","I have a bow and arrows."], ["Wat heeft Penthesilea?","What does Penthesilea have?"], ["Een boog.","A bow."], ["Een boek.","A book."], ["Een lier.","A lyre."]),
      _T(["Ik vecht met Achilles, maar ik word verslagen.","I fight Achilles, but I am defeated."], ["Wie verslaat Penthesilea?","Who defeats Penthesilea?"], ["Achilles.","Achilles."], ["Hector.","Hector."], ["Odysseus.","Odysseus."]),
    ] },

  cassandra: { nm:"Cassandra", region:"troia", type:"sup", affinity:"campus", cave:"fetch_troia",   // dezelfde persoon als de bewoner van de grot (geen eigen plek op de kaart)
    base:{ vita:50, impetus:10, tutela:9, celeritas:9, ambitus:6 },
    look:_look({ huid:"licht", haar:"lang", haarkleur:"bruin", armor:"robe", cape:"lang", capekleur:"blauw", helm:"geen", wapen:"staf" }),
    chain:[
      _K("troia","muros",3, ["Gegroet, leider {naam}! Ik ben Cassandra. Ik zie gevaar. Versla drie vijanden voor de muren.","Greetings, leader {naam}! I am Cassandra. I see danger. Defeat three enemies in front of the walls."], ["Versla vijanden voor de muren!","Defeat enemies in front of the walls!"], ["Uitstekend! De muren zijn veilig.","Excellent! The walls are safe."]),
      _W("t1", ["Goed! Nu red ik Troje. Win het eerste gevecht.","Good! Now I save Troy. Win the first battle."], ["Win het eerste gevecht!","Win the first battle!"], ["Je hebt het gevecht gewonnen! Ik dank je.","You have won the battle! Thank you."]),
      _P(["Niemand gelooft mij. Geloof jij mij?","Nobody believes me. Do you believe me?"], ["Ik geloof je, Cassandra.","I believe you, Cassandra."], ["Ik geloof je niet.","I don't believe you."], ["Ik lach.","I laugh."]),
    ],
    talks:[
      _T(["Ik zie het houten paard. Er is gevaar!","I see the wooden horse. There is danger!"], ["Wat ziet Cassandra?","What does Cassandra see?"], ["Het houten paard.","The wooden horse."], ["Een groot schip.","A big ship."], ["Een hoge berg.","A high mountain."]),
      _T(["Apollo gaf mij een gave, maar niemand gelooft mij.","Apollo gave me a gift, but nobody believes me."], ["Wie gaf Cassandra een gave?","Who gave Cassandra a gift?"], ["Apollo.","Apollo."], ["Venus.","Venus."], ["Mars.","Mars."]),
      _T(["Mijn vader is koning. Hij heet Priamus.","My father is a king. His name is Priam."], ["Wie is de vader van Cassandra?","Who is Cassandra's father?"], ["Priamus.","Priam."], ["Hector.","Hector."], ["Paris.","Paris."]),
    ] },
  circe: { nm:"Circe", region:"troia", type:"sup", affinity:"lignatio", world:{ x:45, y:34, dir:"left" },
    base:{ vita:50, impetus:13, tutela:8, celeritas:9, ambitus:6 },
    look:_look({ huid:"olijf", haar:"lang", haarkleur:"rood", armor:"robe", cape:"kort", capekleur:"groen", helm:"geen", wapen:"staf" }),
    chain:[
      _K("troia","litus",3, ["Gegroet, leider {naam}! Ik ben Circe. Ik hou van kruiden en wolven. Versla drie vijanden bij de kust.","Greetings, leader {naam}! I am Circe. I love herbs and wolves. Defeat three enemies by the coast."], ["Versla vijanden bij de kust!","Defeat enemies by the coast!"], ["Uitstekend! De kust is vrij.","Excellent! The coast is free."]),
      _W("t2", ["Goed! Nu help ik Odysseus. Win het tweede gevecht.","Good! Now I help Odysseus. Win the second battle."], ["Win het tweede gevecht!","Win the second battle!"], ["Je hebt het gevecht gewonnen! Ik dank je.","You have won the battle! Thank you."]),
      _P(["Ik verander mensen in zwijnen. Waarom zou ik met je meegaan?","I turn people into pigs. Why should I go with you?"], ["Omdat ik vrienden bescherm.","Because I protect my friends."], ["Omdat ik van zwijnen houd.","Because I love pigs."], ["Omdat ik wil vluchten.","Because I want to flee."]),
    ],
    talks:[
      _T(["Ik woon op het eiland Aeaea.","I live on the island of Aeaea."], ["Waar woont Circe?","Where does Circe live?"], ["Op een eiland.","On an island."], ["In een stad.","In a city."], ["Op een berg.","On a mountain."]),
      _T(["Ik verander de maten van Odysseus in zwijnen.","I turn Odysseus' companions into pigs."], ["Wie verandert Circe in zwijnen?","Who does Circe turn into pigs?"], ["De maten van Odysseus.","Odysseus' companions."], ["De moeders.","The mothers."], ["De jongens.","The boys."]),
      _T(["Ik heb kruiden. Odysseus is niet bang voor mij.","I have herbs. Odysseus is not afraid of me."], ["Wat heeft Circe?","What does Circe have?"], ["Kruiden.","Herbs."], ["Schepen.","Ships."], ["Wapens.","Weapons."]),
    ] },
});

/* Antwoordvolgorde schudden (deterministisch per vraag), zodat het goede antwoord niet altijd vooraan staat. */
function castraOptOrder(n, seedStr){
  let h = 2166136261>>>0; for(let i=0;i<seedStr.length;i++){ h ^= seedStr.charCodeAt(i); h = Math.imul(h, 16777619)>>>0; }
  const r = castraMapRng(h), a = Array.from({length:n},(_,i)=>i);
  for(let i=n-1;i>0;i--){ const j = Math.floor(r()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; }
  return a;
}

/* ---------- helden in het spel ---------- */
function castraHero(id){ return (CASTRA.heroes||[]).find(h=>h.id===id) || null; }
function castraHeroCap(h){ return Math.min(CASTRA_H.maxLvl, CASTRA_H.capBase + CASTRA_H.capPerStep*Math.floor((h.fides||0)/CASTRA_H.fidesStep)); }
function castraHeroStats(h){
  const b = CASTRA_HERO_DATA[h.id].base, m = (100 + CASTRA_H.statGrowthPct*((h.lvl||1)-1))/100*CASTRA_H.heroMult, o = {};
  Object.keys(b).forEach(k=>{ o[k] = Math.round(b[k]*m); }); return o;
}
function castraHeroLevelUp(h){
  let up = false; const lvl0 = h.lvl;
  while(h.lvl < castraHeroCap(h) && h.xp >= castraXpToNext(h.lvl)){ h.xp -= castraXpToNext(h.lvl); h.lvl++; up = true; }
  if(up && typeof castraSkillLearned==="function") castraSkillLearned({ hero:true, h }, lvl0, h.lvl);
  return up;
}
function castraHeroRecruit(id){
  const list = CASTRA.heroes || (CASTRA.heroes = []);
  const isNew = !list.some(h=>h.id===id);
  if(isNew) list.push({ id, lvl:1, xp:0, fides:10, assigned:null });
  castraSave();
  if(isNew){ if(typeof castraPxpAdd==="function") castraPxpAdd(60, "Nieuwe held"); if(typeof castraCardToken==="function") castraCardToken(2, "nieuwe held"); }
}
// Bonus (in procenten) die een gebouw krijgt van de held die het leidt.
function castraHeroBonus(buildingId){
  const h = (CASTRA.heroes||[]).find(x=>x.assigned===buildingId); if(!h) return 0;
  const d = CASTRA_HERO_DATA[h.id];
  let pct = CASTRA_H.bonusBase + Math.floor((h.fides||0)*CASTRA_H.bonusPerFides);
  if(d.affinity===buildingId) pct = Math.floor(pct*CASTRA_H.affinityMult);
  return pct;
}
function castraHeroAssign(id, buildingId){
  const heroes = CASTRA.heroes||[];
  heroes.forEach(x=>{ if(x.assigned===buildingId) x.assigned = null; });   // één held per gebouw
  const h = heroes.find(x=>x.id===id); if(h) h.assigned = buildingId || null;
  castraSave();
}
// Held als "soldaat" voor het proelium
/* ---------- helden zijn schaars: Castra-niveau om ze te ontmoeten, en een maximum per gevecht ----------
   Een held is zo sterk als een tier 4-soldaat; zonder rem zou een speler met zes helden geen soldaten meer nodig hebben.
   Daarom (1) verschijnt een held pas in de wereld vanaf een bepaald Castra-niveau (de volgorde per regio staat hier,
   Aeneas is er vanaf het begin), en (2) mogen er per gevecht maar weinig helden tegelijk meedoen, afhankelijk van het
   heroum-niveau: 1 held (heroum 1-2), 2 (3-4), 3 (5). De rest van de slagorde bestaat uit soldaten. */
const CASTRA_HERO_MINLVL = { aeneas:1, romulus:6, horatius:9, cloelia:12, mucius:15, camilla:18,
  hercules:20, perseus:23, theseus:26, atalanta:29, iason:32, medea:35, daedalus:40, cassandra:31, prometheus:37, circe:44, achilles:30, hector:34, ulixes:38, penthesilea:42 };
function castraHeroMinLvl(id){ return CASTRA_HERO_MINLVL[id] || 1; }
function castraHeroFieldCap(){ return 1 + Math.floor(Math.max(0, castraLvl("heroum")-1)/2); }
/* ---------- helden die in een grot wonen ----------
   Cassandra (grot van Troje) en Daedalus (labyrint van Graecia) zijn al opdrachtgever in hun grot (castra-regions.js).
   Ze zijn één persoon met de held: zolang er geen opdracht loopt en het spoor gevonden is (en het Castra-niveau
   hoog genoeg), begint hun gesprek in de grot met de heldenketen; na het overtuigen verhuist de bewoner naar je heroum. */
function castraCaveHeroOf(npcId){
  const id = Object.keys(CASTRA_HERO_DATA).find(k=>CASTRA_HERO_DATA[k].cave===npcId); if(!id) return null;
  if(castraHero(id)) return null;
  if(typeof castraPLevel==="function" && castraPLevel() < castraHeroMinLvl(id)) return null;
  return (CASTRA.traces && CASTRA.traces[id]) ? id : null;
}
function castraHeroAsUnit(h){ return { id:"hero_"+h.id, hero:true, h, lvl:h.lvl, line:null, stage:0 }; }

/* ---------- gesprekken (loyaliteit) ---------- */
function castraTalkQuota(){
  const t = CASTRA.talk || (CASTRA.talk = { day:castraDay(), n:0 });
  if(t.day!==castraDay()){ t.day = castraDay(); t.n = 0; }
  return { used:t.n, max: CASTRA_H.talkBase + castraLvl("heroum") };
}
let CASTRA_HT = null;   // lopend gesprek: { hid, i, answered }
function castraHeroumTalk(hid){
  const q = castraTalkQuota(); if(q.used >= q.max){ castraToastLa("satis_colloquia"); return; }
  const h = castraHero(hid), d = CASTRA_HERO_DATA[hid];
  h.talkIdx = ((h.talkIdx||0)) % d.talks.length;
  CASTRA_HT = { hid, i:h.talkIdx, answered:null };
  castraHeroumOpen();
}
function castraHeroumAnswer(k){
  const T = CASTRA_HT; if(!T || T.answered!==null) return;
  const h = castraHero(T.hid), d = CASTRA_HERO_DATA[T.hid], opt = d.talks[T.i].q.opts[k];
  T.answered = k;
  const t = CASTRA.talk; t.n++; h.talkIdx = (h.talkIdx||0)+1;
  if(opt.ok){
    h.fides = Math.min(100, (h.fides||0)+CASTRA_H.fidesPerTalk); h.xp += 10; castraHeroLevelUp(h);
    castraToastLa("recte", d.nm+" · "+CASTRA_LA.fides.la+" +"+CASTRA_H.fidesPerTalk);
  } else castraToastLa("non_recte");
  castraSave(); castraHeroumOpen();
}
function castraHeroumEndTalk(){ CASTRA_HT = null; castraHeroumOpen(); }

/* ---------- heroum-paneel ---------- */
function castraHeroumOpen(){
  CASTRA_UI.panel = "heroum";
  const b = castraBuilding("heroum"), lvl = castraLvl("heroum"), maxL = castraMaxLvl("heroum"), cost = castraUpgradeCost("heroum");
  const costTxt = Object.keys(cost).map(r=>`${castraRes(r).icon} ${cost[r]}`).join("  ");
  const q = castraTalkQuota(), heroes = CASTRA.heroes||[];
  const T = CASTRA_HT;
  const cards = heroes.map(h=>{
    const d = CASTRA_HERO_DATA[h.id], st = castraHeroStats(h), cap = castraHeroCap(h);
    const portrait = castraAvatarHTML(d.look, "down", 1, 64);
    const bar = `<div style="height:8px;background:#1b150e;border:1px solid #4a3d2c;border-radius:4px;overflow:hidden;width:120px"><div style="width:${h.fides||0}%;height:100%;background:var(--hi,#d4af37)"></div></div>`;
    const assign = CASTRA_H.assignable.map(bid=>{
      const on = h.assigned===bid, aff = d.affinity===bid;
      return `<button class="btn ${on?"btn-gold":""}" style="padding:2px 8px;font-size:12px" onclick="castraDoAssign('${h.id}','${on?"":bid}')">${esc(castraBuilding(bid).nm)}${aff?" ★":""}</button>`;
    }).join(" ");
    let talk = "";
    if(T && T.hid===h.id){
      const tk = d.talks[T.i];
      talk = `<div style="margin-top:8px;padding:8px;border:1px solid var(--hi-dim,#8a6d2f);border-radius:8px;background:rgba(0,0,0,.2)">
        <div style="font-size:16px">${castraLaHTML(castraSay(tk.la), castraSay(tk.nl), "talk_"+h.id+T.i)}</div>
        <div style="margin:8px 0 4px;font-size:16px">${castraLaHTML(tk.q.la, tk.q.nl, "tq_"+h.id+T.i)}</div>
        ${castraOptOrder(tk.q.opts.length, h.id+T.i).map(k=>{ const o = tk.q.opts[k]; return `<button class="btn ${T.answered===k?(o.ok?"btn-gold":""):""}" ${T.answered!==null?"disabled":""} style="margin:2px 4px 2px 0" onclick="castraHeroumAnswer(${k})">${esc(o.la)}</button>`; }).join("")}
        ${T.answered!==null?`<div style="margin-top:6px"><button class="btn" onclick="castraHeroumEndTalk()">${castraLaText("claude")}</button></div>`:""}</div>`;
    }
    return `<div style="padding:8px 0;border-top:1px solid #4a3d2c"><div style="display:flex;gap:10px">
      <div style="flex-shrink:0;text-align:center">${portrait}</div>
      <div style="flex:1"><b>${esc(d.nm)}</b> · ${castraLaText("gradus")} ${h.lvl} / ${cap} <small>(XP ${h.xp}/${castraXpToNext(h.lvl)})</small>
        <div style="margin:4px 0">${castraLaText("fides")}: ${bar}</div>
        <small>${CASTRA_STATS.map(x=>x.nm.slice(0,3)+" "+st[x.id]).join(" · ")}</small>
        <div style="margin-top:6px"><small>${castraLaText("assigna")}:</small> ${assign} ${h.assigned?`<small>+${castraHeroBonus(h.assigned)}%</small>`:""}</div>
        <div style="margin-top:6px"><button class="btn btn-gold" ${q.used>=q.max||(T&&T.hid===h.id)?"disabled":""} onclick="castraHeroumTalk('${h.id}')">${castraLaText("colloquium")}</button></div>
      </div></div>${talk}</div>`;
  }).join("") || `<div class="note">${castraLa("heroes_nulli")}</div>`;
  const hints = Object.keys(CASTRA.traces||{}).filter(id=>CASTRA_HERO_DATA[id] && !castraHero(id)).map(id=>`<div class="note">👣 ${castraLa("vestigia")} <b>${esc(CASTRA_HERO_DATA[id].nm)}</b>. ${castraLa("vestigia_quaere")}${CASTRA_HERO_DATA[id].cave ? " <small>(in de grot)</small>" : ""}</div>`).join("");
  const up = lvl>=maxL ? `<div class="note">${castraLa(lvl>=b.maxLvl?"gradus_max":"praetorium_prius")}</div>`
    : castraUpgradeUI('heroum', cost, costTxt, lvl);
  castraOpenPanel(`<div class="panel"><h3>${b.icon} ${esc(b.nm)} <small>${castraLaText("gradus")} ${lvl}</small></h3>
    <div style="font-style:italic;margin-bottom:6px">${castraLaHTML(b.lat||"", b.desc||"", "bld_heroum")}</div>
    <div class="note">${castraLaText("colloquia_hodie")}: ${q.used} / ${q.max}</div>${cards}${hints}
    <div style="margin-top:8px">${up}</div>
    <div style="margin-top:8px"><button class="btn" onclick="CASTRA_HT=null;castraClosePanel()">${castraLaText("claude")}</button></div></div>`);
}
function castraDoAssign(hid, bid){ castraHeroAssign(hid, bid); castraRenderMap(); castraHeroumOpen(); }
