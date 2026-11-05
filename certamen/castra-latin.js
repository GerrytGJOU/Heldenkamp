/* ============================================================================
   CASTRA HEROUM — LATIJNSE TEKSTEN + VERTAALHULP
   ----------------------------------------------------------------------------
   Alle speltekst is Latijn; vertaalhulp is altijd één tik weg en kost niets:
   - tik op een woord  -> betekenis (CASTRA_GLOSS)
   - tik op "ⓘ"        -> vertaling van de hele zin
   Elk gebruik wordt gelogd in CASTRA.help (per woord en per zin) voor het
   toekomstige docentoverzicht. Teksten en glossarium zijn pure data, door
   Gerben aan te passen zonder code (zie CASTRA_HEROUM.md, "Latijn in het spel").
   Latijnse teksten zijn voorlopig en ter controle door Gerben.
   Laadt NA castra-data.js, VÓÓR castra.js/castra-venatio.js.
   ============================================================================ */

/* ---- Vaste zinnen: id -> {la, nl} ---- */
const CASTRA_LA = {
  venatio_titel:   { la:"Venatio", nl:"De jacht" },
  venatio_intro:   { la:"Waar ga je jagen, leider {naam}?", nl:"Where are you going to hunt, leader {naam}?" },
  venare:          { la:"Ga jagen!", nl:"Go hunting!" },
  clausum:         { la:"Clausum", nl:"Gesloten" },
  explorator:      { la:"Explorator nuntiat:", nl:"De verkenner meldt:" },
  quem_mittis:     { la:"Welke soldaat stuur je?", nl:"Which soldier do you send?" },
  nullus_miles:    { la:"Je hebt geen soldaat. Je vecht zelf, leider!", nl:"You have no soldier. You fight yourself, leader!" },
  oppugna:         { la:"Val aan!", nl:"Attack!" },
  defende:         { la:"Verdedig!", nl:"Defend!" },
  miles_oppugnat:  { la:"Je soldaat verwondt de vijand.", nl:"Your soldier wounds the enemy." },
  hostis_oppugnat: { la:"De vijand verwondt je soldaat.", nl:"The enemy wounds your soldier." },
  miles_defendit:  { la:"Je soldaat verdedigt zich.", nl:"Your soldier defends himself." },
  optime:          { la:"Uitstekend!", nl:"Excellent!" },
  male:            { la:"Slecht!", nl:"Bad!" },
  vicisti:         { la:"Je hebt gewonnen!", nl:"You have won!" },
  victus_es:       { la:"Je bent verslagen.", nl:"You have been defeated." },
  hostis_fugit:    { la:"De vijand vlucht.", nl:"The enemy flees." },
  praeda:          { la:"Je neemt de buit.", nl:"You take the loot." },
  vulneratus:      { la:"Je soldaat is gewond.", nl:"Your soldier is wounded." },
  hostis_dicit:    { la:"De verslagen vijand zegt: \"Ik zal je volgen, leider {naam}.\"", nl:"The defeated enemy says: \"I will follow you, leader {naam}.\"" },
  visne_recipere:  { la:"Wil je hem in het kamp opnemen?", nl:"Do you want to take him into the camp?" },
  recipio:         { la:"Ik neem hem op.", nl:"I take him in." },
  dimitto:         { la:"Ik laat hem gaan.", nl:"I let him go." },
  castra_plena:    { la:"Het kamp zit vol.", nl:"The camp is full." },
  redi:            { la:"Keer terug naar het kamp.", nl:"Return to the camp." },
  iterum:          { la:"Ga opnieuw jagen!", nl:"Go hunting again!" },
  campus_titel:    { la:"Marsveld", nl:"Het oefenveld" },
  exerce:          { la:"Train!", nl:"Train!" },
  exercetur:       { la:"Hij traint.", nl:"He is training." },
  collige:         { la:"Haal op!", nl:"Collect!" },
  evolve:          { la:"Bevorder!", nl:"Promote!" },
  missio_honesta:  { la:"Missio honesta", nl:"Eervol ontslag" },
  nullus_exercitus:{ la:"Je hebt geen soldaten.", nl:"You have no soldiers." },
  elige_viam:      { la:"Welke weg kies je?", nl:"Which road do you choose?" },
  meliora:         { la:"Meliora", nl:"Verbeter" },
  claude:          { la:"Claude", nl:"Sluit" },
  gradus:          { la:"Gradus", nl:"Niveau" },
  gradus_max:      { la:"Hoogste niveau.", nl:"Highest level." },
  praetorium_prius:{ la:"Verbeter eerst het praetorium.", nl:"Upgrade the praetorium first." },
  proventus:       { la:"Proventus", nl:"Opbrengst" },
  paratum:         { la:"Paratum", nl:"Klaar" },
  capacitas:       { la:"Capacitas", nl:"Opslagmaximum" },
  milites:         { la:"Milites", nl:"Soldaten" },
  conscribe:       { la:"Werf een soldaat!", nl:"Recruit a soldier!" },
  legio_mox:       { la:"De Legio komt binnenkort.", nl:"The Legio is coming soon." },
  porta_clausa:    { la:"Deze poort is nog niet open.", nl:"This gate is not open yet." },
  loca:            { la:"Loca", nl:"Plaatsen" },
  hodie:           { la:"Hodie", nl:"Vandaag" },
  loca_plena:      { la:"Alle oefenplekken zijn bezet.", nl:"All training spots are taken." },
  frumentum_deest: { la:"Je hebt niet genoeg graan.", nl:"You do not have enough grain." },
  satis_exercitati:{ la:"Vandaag is er genoeg getraind.", nl:"There has been enough training today." },
  collectum:       { la:"Opgehaald!", nl:"Collected!" },
  plenum:          { la:"Je opslag is vol.", nl:"Your storage is full." },
  melioratum:      { la:"Verbeterd!", nl:"Improved!" },
  exercitatio_finita:{ la:"De training is klaar.", nl:"The training is finished." },
  visne_dimittere: { la:"Wil je deze soldaat eervol ontslaan?", nl:"Do you want to honourably discharge this soldier?" },
  adiungit:        { la:"sluit zich bij je aan.", nl:"joins you." },
  intellego:       { la:"Ik begrijp het.", nl:"I understand." },
  intro:           { la:"\"Gegroet, leider {naam}! Dit is jouw kamp. Verzamel hout en brons, verbeter het praetorium en ga jagen in Latium.\"", nl:"\"Greetings, leader {naam}! This is your camp. Gather wood and bronze, improve the praetorium and go hunting in Latium.\"" },
  accipio:         { la:"Ik accepteer het.", nl:"I accept it." },
  non_nunc:        { la:"Nu niet.", nl:"Not now." },
  gratias:         { la:"Dank je!", nl:"Thank you!" },
  vale:            { la:"Vaarwel!", nl:"Farewell!" },
  aeneas:          { la:"Aeneas", nl:"Aeneas" },
  aen_hi:          { la:"\"Gegroet, gast {naam}! Ik ben Aeneas. Vijanden in het bos zijn lastig. Versla drie vijanden in het bos, en je krijgt mijn hulp.\"", nl:"\"Greetings, guest {naam}! I am Aeneas. Enemies in the forest are a nuisance. Defeat three enemies in the forest and you will have my help.\"" },
  aen_accepted:    { la:"\"Goed! Versla drie vijanden in het bos.\"", nl:"\"Good! Defeat three enemies in the forest.\"" },
  aen_done:        { la:"\"Uitstekend, leider {naam}! Je hebt drie vijanden verslagen. Ik dank je. Ik kom met je mee.\"", nl:"\"Excellent, leader {naam}! You have defeated three enemies. Thank you. I will come with you.\"" },
  aen_bye:         { la:"\"Vaarwel, leider {naam}! Goede reis!\"", nl:"\"Farewell, leader {naam}! Safe travels!\"" },
  aen_joined:      { la:"Aeneas sluit zich bij je aan.", nl:"Aeneas joins you." },
  proelium_titel:  { la:"Proelium", nl:"Het gevecht" },
  proelium_ini:    { la:"Het gevecht in!", nl:"Into the battle!" },
  incipe:          { la:"Begin!", nl:"Begin!" },
  celerius:        { la:"Celerius", nl:"Sneller" },
  vita_castrorum:  { la:"Vita castrorum", nl:"Levens van het kamp" },
  ala:             { la:"Ala", nl:"Golf" },
  elige_loca:      { la:"Kies een soldaat en plaats hem.", nl:"Choose a soldier and place him." },
  castra_defensa:  { la:"Je hebt het kamp verdedigd!", nl:"You have defended the camp!" },
  castra_capta:    { la:"Het kamp is ingenomen.", nl:"The camp has been taken." },
  praemium:        { la:"Praemium", nl:"Beloning" },
  acies_plena:     { la:"Je slagorde is vol.", nl:"Your battle line is full." },
  iterum_pugna:    { la:"Vecht opnieuw!", nl:"Fight again!" },
  colloquium:      { la:"Colloquium", nl:"Gesprek" },
  fides:           { la:"Fides", nl:"Vertrouwen" },
  assigna:         { la:"Assigna", nl:"Wijs toe" },
  colloquia_hodie: { la:"Colloquia hodie", nl:"Gesprekken vandaag" },
  satis_colloquia: { la:"Vandaag hebben we genoeg gepraat.", nl:"We have talked enough today." },
  recte:           { la:"Juist!", nl:"Correct!" },
  non_recte:       { la:"Niet juist.", nl:"Not correct." },
  non_convenit:    { la:"Dat past niet.", nl:"That does not fit." },
  heroes_nulli:    { la:"Je hebt nog geen helden.", nl:"You have no heroes yet." },
  vestigia_quaere: { la:"Zoek hem in Latium.", nl:"Look for him in Latium." },
  heroum_novum:    { la:"De held komt naar je heroum.", nl:"The hero comes to your heroum." },
  venare_in:       { la:"Venare in", nl:"Jagen in" },
  cura:            { la:"Cura", nl:"Genees" },
  nulli_vulnerati: { la:"Er zijn geen gewonde soldaten.", nl:"There are no wounded soldiers." },
  aes_deest:       { la:"Je hebt niet genoeg brons.", nl:"You do not have enough bronze." },
  nulli_candidati: { la:"Vandaag zijn er geen rekruten.", nl:"There are no recruits today." },
  conscribe_hunc:  { la:"Werf deze soldaat!", nl:"Recruit this soldier!" },
  dilectus_hint:   { la:"Werf nieuwe soldaten bij de Dilectus.", nl:"Recruit new soldiers at the Dilectus." },
  legio_titel:     { la:"Legio", nl:"Het legioen (klas)" },
  commercium:      { la:"Commercium", nl:"Handel (ruilen)" },
  legio_inloggen:  { la:"Log in om met je legioen te vechten.", nl:"Log in to fight with your legion." },
  nulla_legio:     { la:"Vandaag is er geen legioen-evenement.", nl:"There is no legion event today." },
  legionarii:      { la:"Legionarii", nl:"Legioensoldaten (deelnemers)" },
  legio_convenit:  { la:"Het legioen komt samen! Is iedereen er?", nl:"The legion is gathering! Is everyone here?" },
  adsum:           { la:"Ik ben er!", nl:"I am here!" },
  legio_incipit:   { la:"Incipit post", nl:"Begint over" },
  legio_pugnat:    { la:"Het legioen vecht!", nl:"The legion fights!" },
  legio_finita:    { la:"Dit gevecht is afgelopen.", nl:"This battle is over." },
  legio_victoria:  { la:"Overwinning! Jullie hebben Troje verdedigd!", nl:"Victory! You have defended Troy!" },
  legio_clades:    { la:"Troje is ingenomen.", nl:"Troy has been taken." },
  pugna:           { la:"Vecht!", nl:"Fight!" },
  oblata_mea:      { la:"Oblata mea", nl:"Mijn aanbod" },
  oblata_aliorum:  { la:"Oblata aliorum", nl:"Aanbod van anderen" },
  offer_militem:   { la:"Offer militem", nl:"Bied een soldaat aan" },
  revoca:          { la:"Revoca", nl:"Trek in" },
  commuta:         { la:"Commuta", nl:"Ruil" },
  quem_das:        { la:"Welke soldaat geef je?", nl:"Which soldier do you give?" },
  commutatio_facta:{ la:"De ruil is gedaan.", nl:"The trade is done." },
  iam_captum:      { la:"Dit is al weg.", nl:"This is already gone." },
  nihil_offerre:   { la:"Je biedt niets aan.", nl:"You offer nothing." },
  nulla_oblata:    { la:"Er is geen aanbod.", nl:"There is no offer." },
  nullus_miles_idoneus:{ la:"Geen enkele soldaat is beschikbaar.", nl:"No soldier is available." },
  deest:           { la:"deest", nl:"ontbreekt" },
  aedifica:        { la:"Aedifica", nl:"Bouw" },
  non_aedificatum: { la:"Nog niet gebouwd.", nl:"Not built yet." },
  aperit:          { la:"Aperit", nl:"Opent" },
  peregrinus:      { la:"De vijand is een vreemdeling.", nl:"The enemy is a stranger." },
  perge:           { la:"Ga verder!", nl:"Go on!" },
  vestigia:        { la:"Je ziet sporen van een groot man.", nl:"You see tracks of a big man." },
};

/* ---- Typen in het Latijn: meervoud (verkenningsbericht) en enkelvoud (je eigen soldaat) ---- */
const CASTRA_TYPE_LA = {
  rec:  { pl:"tirones",   sg:"tiro",       nl_pl:"rekruten",     nl_sg:"rekruut" },
  inf:  { pl:"pedites",   sg:"pedes",       nl_pl:"voetsoldaten",  nl_sg:"voetsoldaat" },
  cav:  { pl:"equites",   sg:"eques",       nl_pl:"ruiters",       nl_sg:"ruiter" },
  rng:  { pl:"sagittarii",sg:"sagittarius", nl_pl:"boogschutters", nl_sg:"boogschutter" },
  sup:  { pl:"auxilia",   sg:"auxiliarius", nl_pl:"hulptroepen",   nl_sg:"hulptroep" },
  myth: { pl:"monstra",   sg:"monstrum",    nl_pl:"monsters",      nl_sg:"monster" },
};

/* ---- Karakters: Latijns bijvoeglijk naamwoord + vertaling ---- */
const CASTRA_INGENIUM_NL = {
  ferox:"fel", cautus:"voorzichtig", celer:"snel", robustus:"sterk gebouwd", acer:"scherp",
  longus:"lang", firmus:"standvastig", agilis:"wendbaar", fortis:"dapper", sagax:"scherpzinnig",
};

/* ---- Terreinen per regio (zeldzaamheid: sommige lijnen alleen op bepaald terrein) ---- */
const CASTRA_VENATIO = {
  // folk = gewicht per volk (een vreemdeling komt af en toe voor); terrein: prefs = gewicht per categorie
  // (inf/rng/cav/sup/navy) voor tier 2+; myth = kans op een mythisch wezen uit die lijnen. Levels gelden voor
  // rekruten; hogere tiers beginnen op hun evolutiedrempel (castraWildPick).
  latium: {
    nm:"Latium", min:3, max:10, tierMax:3, folk:{ rom:80, gla:6, gal:4, ger:3, gra:3, car:2, aeg:1, per:1 },
    terrains:[
      { id:"silva",  la:"In silva",  nl:"In het bos",    prefs:{ rng:3, inf:2, sup:1 }, myth:{ p:0.12, taks:["Saters","Nimfen","Wolven van Mars"] } },
      { id:"campus", la:"In campo",  nl:"Op het veld",   prefs:{ inf:3, cav:3, rng:1 }, myth:{ p:0.05, taks:["Wolven van Mars"] } },
      { id:"via",    la:"In via",    nl:"Op de weg",     prefs:{ inf:2, cav:2, rng:2, sup:1 }, myth:{ p:0.05, taks:["Adelaars van Jupiter"] } },
      { id:"tiberis",la:"Ad Tiberim",nl:"Bij de Tiber",  prefs:{ navy:3, inf:1, rng:1 }, myth:{ p:0.10, taks:["Nimfen"] } },
      { id:"specus", la:"In de grot",  nl:"In the cave",    prefs:{ inf:2, rng:2, sup:2 }, myth:{ p:0.30, taks:["Wolven van Mars","Saters"] } },
    ],
    traces:[ "aeneas","romulus","horatius","cloelia","mucius","camilla" ], traceChance:0.15,
  },
  graecia: {
    nm:"Greece", min:28, max:36, tierMax:3, folk:{ gra:66, spa:14, tro:5, per:5, aeg:3, gla:3, rom:2, ama:2 },
    terrains:[
      { id:"mons",  la:"In monte", nl:"Op de berg",         prefs:{ inf:3, rng:3 }, myth:{ p:0.15, taks:["Grijpvogels","Saters","Centauren"] } },
      { id:"olea",  la:"In oleis", nl:"In de olijfgaarden", prefs:{ rng:3, inf:2, cav:1 }, myth:{ p:0.15, taks:["Nimfen","Saters"] } },
      { id:"litus", la:"Ad litus", nl:"Aan de kust",        prefs:{ inf:2, rng:2 }, myth:{ p:0.20, taks:["Harpijen","Sirenen","Zeepaarden"] } },
      { id:"urbs",  la:"In urbe",  nl:"In de stad",         prefs:{ inf:3, cav:2, rng:1 }, myth:{ p:0.05, taks:["Gezaaide mannen","Myrmidonen"] } },
    ],
    traces:[ "hercules","perseus","theseus","atalanta","iason","medea","daedalus","prometheus" ], traceChance:0.15,
  },
  troia: {
    nm:"Troia", min:36, max:44, tierMax:4, folk:{ tro:72, gra:12, ama:6, per:4, aeg:3, spa:2, car:1 },
    terrains:[
      { id:"muros",     la:"Ante muros",    nl:"Voor de muren",    prefs:{ inf:3, rng:2, cav:1 }, myth:{ p:0.05, taks:["Cyclopen"] } },
      { id:"campus",    la:"In campo",      nl:"Op het veld",      prefs:{ cav:3, inf:2, rng:1 }, myth:{ p:0.05, taks:["Centauren"] } },
      { id:"litus",     la:"Ad litus",      nl:"Aan de kust",      prefs:{ inf:2, rng:2 }, myth:{ p:0.15, taks:["Harpijen","Sirenen"] } },
      { id:"scamander", la:"Ad Scamandrum", nl:"Bij de Scamander", prefs:{ rng:2, sup:1, inf:1 }, myth:{ p:0.15, taks:["Nimfen","Zeepaarden"] } },
    ],
    traces:[ "achilles","hector","ulixes","penthesilea","cassandra","circe" ], traceChance:0.15,
  },
  gallia: {
    nm:"Gallia", min:16, max:24, tierMax:3, folk:{ gal:70, ger:14, rom:8, gla:4, car:2, gra:2 },
    terrains:[
      { id:"silva",   la:"In silva Gallica", nl:"In het Gallische woud", prefs:{ inf:3, sup:2, cav:1 }, myth:{ p:0.12, taks:["Saters","Nimfen","Wolven van Mars"] } },
      { id:"oppidum", la:"In oppido",        nl:"In de burcht",          prefs:{ inf:3, sup:3, cav:1 }, myth:{ p:0.05, taks:["Wolven van Mars"] } },
      { id:"campus",  la:"In campo",         nl:"Op het veld",           prefs:{ cav:3, inf:2, sup:1 }, myth:{ p:0.05, taks:["Adelaars van Jupiter"] } },
      { id:"flumen",  la:"Ad Rhenum",        nl:"Bij de Rijn",           prefs:{ inf:2, cav:2, sup:1 }, myth:{ p:0.15, taks:["Nimfen","Zeepaarden"] } },
    ],
    traces:[], traceChance:0,
  },
  aegyptus: {
    nm:"Aegyptus", min:42, max:50, tierMax:4, folk:{ aeg:70, per:9, car:7, gra:5, ama:3, rom:3, tro:3 },
    terrains:[
      { id:"nilus",    la:"Ad Nilum",      nl:"Aan de Nijl",       prefs:{ rng:3, inf:2, cav:1 }, myth:{ p:0.10, taks:["Nimfen"] } },
      { id:"templum",  la:"In templo",     nl:"In de tempel",      prefs:{ sup:3, inf:2, rng:1 }, myth:{ p:0.15, taks:["Feniks"] } },
      { id:"urbs",     la:"In urbe",       nl:"In de stad",        prefs:{ inf:3, sup:2, cav:2 }, myth:{ p:0.06, taks:["Feniks"] } },
      { id:"desertum", la:"In deserto",    nl:"In de woestijn",    prefs:{ cav:3, rng:3, inf:1 }, myth:{ p:0.12, taks:["Draken","Feniks"] } },
    ],
    traces:[], traceChance:0,
  },
  persis: {
    nm:"Persis", min:40, max:48, tierMax:4, folk:{ per:72, aeg:6, gra:6, tro:4, ama:4, car:3, gal:3, rom:2 },
    terrains:[
      { id:"mons",   la:"In montibus", nl:"In de bergen",  prefs:{ rng:3, inf:2, sup:1 }, myth:{ p:0.15, taks:["Grijpvogels","Draken"] } },
      { id:"via",    la:"In via regia", nl:"Op de koningsweg", prefs:{ cav:3, inf:2, rng:2 }, myth:{ p:0.05, taks:["Adelaars van Jupiter"] } },
      { id:"urbs",   la:"In urbe",     nl:"In de stad",    prefs:{ inf:3, sup:3, cav:1 }, myth:{ p:0.06, taks:["Feniks"] } },
      { id:"campus", la:"In campo",    nl:"Op het veld",   prefs:{ cav:3, rng:2, inf:2 }, myth:{ p:0.10, taks:["Gevleugelde paarden"] } },
    ],
    traces:[], traceChance:0,
  },
  africa: {
    nm:"Africa", min:43, max:50, tierMax:4, folk:{ car:72, aeg:8, rom:6, gal:4, gra:4, per:3, ger:3 },
    terrains:[
      { id:"deserto", la:"In deserto", nl:"In de woestijn",  prefs:{ cav:3, rng:2, inf:1 }, myth:{ p:0.12, taks:["Draken","Feniks"] } },
      { id:"urbs",    la:"In urbe",    nl:"In de stad",      prefs:{ inf:3, cav:2, rng:1 }, myth:{ p:0.08, taks:["Adelaars van Jupiter"] } },
      { id:"campus",  la:"In campo",   nl:"Op het veld",     prefs:{ cav:3, inf:3, rng:1 }, myth:{ p:0.05, taks:["Adelaars van Jupiter"] } },
      { id:"litus",   la:"Ad litus",   nl:"Aan de kust",     prefs:{ inf:2, rng:2, cav:1 }, myth:{ p:0.18, taks:["Harpijen","Sirenen","Zeepaarden"] } },
    ],
    traces:[], traceChance:0,
  },
  roma: {
    nm:"Roma", min:10, max:18, tierMax:3, folk:{ rom:60, gla:20, gal:5, ger:4, gra:4, aeg:3, per:2, car:2 },
    terrains:[
      { id:"arena",  la:"In arena",     nl:"In de arena",        folk:{ gla:80, rom:12, gal:4, ger:4 }, prefs:{ inf:3, rng:1, sup:1 }, myth:{ p:0.04, taks:["Wolven van Mars"] } },
      { id:"forum",  la:"In foro",      nl:"Op het Forum",       folk:{ rom:84, gla:8, gra:4, aeg:4 }, prefs:{ inf:3, sup:2, cav:1 }, myth:{ p:0.04, taks:["Adelaars van Jupiter"] } },
      { id:"castra", la:"In castris",   nl:"In het legerkamp",   folk:{ rom:92, gla:4, ger:2, gal:2 }, prefs:{ inf:3, rng:2, cav:2, sup:1 }, myth:{ p:0.03, taks:["Wolven van Mars"] } },
      { id:"via",    la:"In via Appia", nl:"Op de Via Appia",    prefs:{ cav:3, inf:2, rng:2 }, myth:{ p:0.05, taks:["Adelaars van Jupiter","Wolven van Mars"] } },
    ],
    traces:[], traceChance:0,
  },
  laconia: {
    nm:"Laconia", min:32, max:40, tierMax:4, folk:{ spa:78, gra:8, per:4, rom:4, tro:3, aeg:3 },
    terrains:[
      { id:"mons",   la:"In montibus", nl:"In het Taygetosgebergte", prefs:{ inf:3, rng:3 }, myth:{ p:0.10, taks:["Grijpvogels","Centauren"] } },
      { id:"urbs",   la:"In urbe",     nl:"In Sparta",                prefs:{ inf:4, rng:1, sup:1 }, myth:{ p:0.03, taks:["Gezaaide mannen"] } },
      { id:"flumen", la:"Ad Eurotam",  nl:"Bij de Eurotas",           prefs:{ rng:3, inf:2 }, myth:{ p:0.15, taks:["Nimfen"] } },
      { id:"campus", la:"In campo",    nl:"Op het veld",              prefs:{ inf:4, rng:2, cav:1 }, myth:{ p:0.04, taks:["Centauren"] } },
    ],
    traces:[], traceChance:0,
  },
  germania: {
    nm:"Germania", min:22, max:30, tierMax:3, folk:{ ger:74, gal:8, rom:6, gla:3, car:3, gra:2, aeg:2, per:2 },
    terrains:[
      { id:"silva",  la:"In silva",      nl:"In het oerwoud",       prefs:{ inf:3, sup:2, cav:1 }, myth:{ p:0.14, taks:["Wolven van Mars","Saters","Draken"] } },
      { id:"palus",  la:"In paludibus",  nl:"In de moerassen",      prefs:{ inf:3, sup:3 },        myth:{ p:0.15, taks:["Nimfen","Draken"] } },
      { id:"vicus",  la:"In vico",       nl:"In het dorp",          prefs:{ inf:3, cav:2, sup:2 }, myth:{ p:0.05, taks:["Wolven van Mars"] } },
      { id:"flumen", la:"Ad Rhenum",     nl:"Bij de Rijn",          prefs:{ cav:3, inf:2, sup:1 }, myth:{ p:0.12, taks:["Nimfen","Adelaars van Jupiter"] } },
    ],
    traces:[], traceChance:0,
  },
  themiscyra: {
    nm:"Themiscyra", min:38, max:46, tierMax:4, folk:{ ama:80, gra:5, tro:4, per:3, spa:3, ger:3, gal:2 },
    terrains:[
      { id:"silva",  la:"In silva",    nl:"In het woud",    prefs:{ rng:3, inf:2 },        myth:{ p:0.12, taks:["Nimfen","Centauren"] } },
      { id:"mons",   la:"In montibus", nl:"In de bergen",   prefs:{ rng:3, inf:3 },        myth:{ p:0.15, taks:["Grijpvogels","Harpijen"] } },
      { id:"campus", la:"In campo",    nl:"Op het veld",    prefs:{ cav:4, rng:2, inf:1 }, myth:{ p:0.06, taks:["Gevleugelde paarden","Centauren"] } },
      { id:"litus",  la:"Ad litus",    nl:"Aan de kust",    prefs:{ inf:3, rng:2 },        myth:{ p:0.15, taks:["Harpijen","Sirenen"] } },
    ],
    traces:[], traceChance:0,
  },
};

/* ---- Glossarium: woord (kleine letters, zonder leestekens) -> betekenis ---- */
const CASTRA_GLOSS = {
  "venatio":"jacht", "quo":"waarheen / waar", "venaris":"jaagt (je)", "venare":"jaag! / ga jagen!",
  "dux":"leider", "latium":"Latium (streek rond Rome)", "clausum":"gesloten",
  "explorator":"verkenner", "nuntiat":"meldt", "in":"in / op / naar", "silva":"bos", "campo":"veld",
  "via":"weg", "ad":"bij / naar", "tiberim":"de Tiber (4e naamval)",
  "pedites":"voetsoldaten", "pedes":"voetsoldaat", "equites":"ruiters", "eques":"ruiter",
  "sagittarii":"boogschutters", "sagittarius":"boogschutter", "auxilia":"hulptroepen",
  "auxiliarius":"hulptroep", "monstra":"monsters", "monstrum":"monster",
  "adsunt":"zijn er / zijn aanwezig", "hostis":"vijand", "est":"is", "sunt":"zijn", "es":"je bent",
  "ferox":"fel", "cautus":"voorzichtig", "celer":"snel", "robustus":"sterk gebouwd", "acer":"scherp",
  "longus":"lang", "firmus":"standvastig", "agilis":"wendbaar", "fortis":"dapper", "sagax":"scherpzinnig",
  "quem":"wie / welke (4e naamval)", "militem":"soldaat (4e naamval)", "mittis":"je stuurt",
  "nullum":"geen", "habes":"je hebt", "ipse":"zelf", "pugnas":"je vecht",
  "oppugna":"val aan!", "defende":"verdedig!", "oppugnat":"valt aan",
  "miles":"soldaat", "tuus":"jouw", "tuum":"jouw (4e naamval)", "hostem":"vijand (4e naamval)",
  "vulnerat":"verwondt", "vulneratus":"gewond", "se":"zich", "defendit":"verdedigt",
  "optime":"uitstekend", "male":"slecht", "vicisti":"je hebt gewonnen", "victus":"verslagen",
  "fugit":"vlucht", "praedam":"buit (4e naamval)", "capis":"je neemt / pakt",
  "dicit":"zegt", "te":"jou", "sequar":"ik zal volgen", "visne":"wil je?", "eum":"hem",
  "castra":"kamp", "recipere":"opnemen", "recipio":"ik neem op", "dimitto":"ik laat gaan",
  "plena":"vol", "redi":"keer terug!", "iterum":"opnieuw", "vestigia":"sporen",
  "aeacus":"Aeacus (koning, maakte mieren tot mensen)", "formicas":"mieren", "homines":"mensen", "mutavit":"veranderde", "myrmidones":"Myrmidonen", "achillem":"Achilles (4e naamval)", "sequuntur":"volgen", "cadmus":"Cadmus (stichter van Thebe)", "dentes":"tanden", "serit":"zaait", "armati":"gewapende", "terra":"aarde / grond", "surgunt":"rijzen op", "lupa":"wolvin", "romulum":"Romulus (4e naamval)", "remum":"Remus (4e naamval)", "nutrit":"voedt", "lupus":"wolf", "martis":"van Mars", "sacer":"heilig", "viri":"van een man", "nova":"nieuw (vrouwelijk/meervoud)", "opus":"nodig (opus sunt = zijn nodig)", "do":"ik geef", "elegisti":"je hebt gekozen", "alium":"een ander (4e naamval)", "cape":"vang! / pak!", "portam":"poort (4e naamval)", "decumanam":"decumana (4e naamval)", "i":"ga!", "praetoriam":"praetoria (4e naamval)", "tuos":"jouw (meervoud, 4e naamval)", "colloca":"plaats!", "scis":"je weet", "venari":"jagen", "conscribere":"werven", "regiones":"regio's", "novas":"nieuwe (4e naamval)", "explora":"verken!", "amphoram":"amfoor (4e naamval)", "amphora":"amfoor (kruik)", "amisi":"ik ben kwijt", "dabo":"ik zal geven", "vivas":"moge je leven", "puteum":"put (4e naamval)", "puteus":"put (waterput)", "triginta":"dertig", "lignis":"hout (3e naamval meervoud)", "quindecim":"vijftien", "aeribus":"brons (3e naamval meervoud)", "da":"geef!", "paratus":"klaar", "sanat":"geneest", "fabro":"bouwer (3e naamval)", "ludamus":"laten we spelen", "ludum":"spel (4e naamval)", "ordo":"volgorde", "verborum":"van de woorden", "verba":"woorden", "iungere":"verbinden / koppelen", "relinquit":"verlaat", "vident":"zien", "lyra":"lier", "clipeus":"rond schild", "clipeum":"schild (4e naamval)", "torques":"halsband van goud", "torquem":"halsband (4e naamval)", "scarabaeus":"scarabee (heilige kever)", "scarabaeum":"scarabee (4e naamval)", "corona":"kroon", "coronam":"kroon (4e naamval)", "ebur":"ivoor", "gladius":"zwaard", "galea":"helm", "galeam":"helm (4e naamval)", "cornu":"hoorn", "arcus":"boog", "lignationem":"houtzagerij (4e naamval)", "lignatio":"houtzagerij", "parata":"klaar (vrouwelijk)", "metallum":"mijn / metaal", "specu":"in de grot", "specus":"grot", "lupae":"van de wolvin", "hospitium":"herberg (gastvrij onthaal)", "diei":"van de dag", "hic":"hier", "quiescere":"uitrusten", "potes":"je kunt", "visne":"wil je?", "hodie":"vandaag", "iam":"al / nu", "quievisti":"je hebt gerust", "cras":"morgen", "redi":"kom terug!", "quiesco":"ik rust uit", "festina":"haast je!", "lente":"langzaam", "carpe":"pluk!", "diem":"de dag", "veni":"ik kwam", "vidi":"ik zag", "vici":"ik overwon", "alea":"teerling", "iacta":"geworpen", "aspera":"moeilijkheden", "astra":"sterren", "docendo":"door te leren", "discimus":"wij leren", "fortes":"de dapperen", "fortuna":"het geluk", "adiuvat":"helpt", "ubi":"waar", "bene":"goed", "ibi":"daar", "patria":"vaderland", "proverbium":"spreekwoord", "clausa":"gesloten (vrouwelijk)", "clausus":"gesloten (mannelijk)", "obsident":"belegeren", "ardea":"Ardea (stad in Latium)", "defensa":"verdedigd", "patet":"staat open", "custodes":"wachters", "urbis":"van de stad", "arbor":"boom", "claudit":"sluit af", "gladiatores":"gladiatoren", "arborem":"boom (4e naamval)", "removerunt":"hebben weggehaald", "viator":"reiziger", "limes":"grens", "germani":"Germanen", "feroces":"woest", "victa":"verslagen", "apertus":"open (mannelijk)", "limitis":"van de grens", "saxa":"rotsblokken", "laconiam":"Laconië (4e naamval)", "claudunt":"sluiten af", "remota":"weggehaald", "spartam":"Sparta (4e naamval)", "adiuva":"help!", "servata":"gered", "pontis":"van de brug", "cepit":"nam in / veroverde", "persis":"Perzië", "hippolytam":"Hippolyta (4e naamval)", "hippolyta":"Hippolyta (koningin van de Amazones)", "adiuta":"geholpen", "persae":"Perzen", "tempestas":"storm", "harenae":"van het zand", "quievit":"is tot rust gekomen", "africa":"Afrika", "tutae":"veilig", "aegyptii":"Egyptische", "gallia":"Gallië", "germania":"Germanië", "graecia":"Griekenland", "laconia":"Laconië", "aegyptus":"Egypte", "sacram":"heilig (4e naamval)", "sacra":"heilig", "descende":"daal af!", "specum":"grot (4e naamval)", "refer":"breng terug!", "scisne":"weet je?", "quinque":"vijf", "quaestiones":"vragen", "fecisti":"je hebt gedaan", "accipies":"je zult krijgen", "solarium":"zolder", "eremita":"kluizenaar", "senator":"senator", "venator":"jager", "gallica":"Gallisch", "themiscyra":"Themiscyra (rijk van de Amazones)", "hippolyte":"Hippolyte (koningin van de Amazones)", "paludibus":"in the marshes", "vico":"in het dorp", "saltus":"bergbos / woudpas", "teutoburgiensis":"van Teutoburg", "arena":"arena (zandvlak van de gladiatoren)", "foro":"on the Forum", "castris":"in het legerkamp", "appia":"van Appius (de Via Appia)", "eurotam":"de Eurotas (4e naamval)", "sparta":"Sparta", "forum":"Forum (marktplein van Rome)", "romanum":"Romeins", "thermopylae":"Thermopylae (bergpas)", "carthago":"Carthago (stad in Africa)", "zamam":"Zama (4e naamval)", "montibus":"in the mountains", "regia":"koninklijk(e)", "persepolis":"Persepolis (Perzische hoofdstad)", "nilum":"de Nijl (4e naamval)", "templo":"in de tempel", "deserto":"in the desert", "pyramides":"piramiden", "alesia":"Alesia (Gallische vesting)", "oppido":"in de burcht (nederzetting)", "rhenum":"de Rijn (4e naamval)", "peregrinus":"vreemdeling / uit den vreemde", "aedifica":"bouw!", "aedificatum":"gebouwd", "nondum":"nog niet", "aperit":"opent", "equi":"paarden", "currus":"strijdwagens", "parantur":"worden klaargemaakt", "aedificantur":"worden gebouwd", "tiro":"rekruut", "tirones":"rekruten", "bonus":"goed", "fiet":"zal worden", "pedes":"voetsoldaat", "eques":"ruiter", "pugnes":"(opdat) je vecht", "legio":"legioen", "commercium":"handel", "ut":"om te / zodat", "cum":"met", "legione":"legioen (met het legioen)", "intra":"ga naar binnen / log in!", "nulla":"geen", "convenit":"komt samen",
  "omnes":"allen", "post":"na / over", "incipit":"begint", "pugnat":"vecht", "finita":"afgelopen", "haec":"deze", "pugna":"vecht!", "victoria":"overwinning", "defendistis":"jullie hebben verdedigd", "capta":"ingenomen",
  "oblata":"aanbod", "mea":"mijn", "aliorum":"van anderen", "offer":"bied aan!", "revoca":"trek in!", "commuta":"ruil!", "quem":"wie / welke", "das":"je geeft", "commutatio":"ruil", "facta":"gedaan", "iam":"al", "captum":"genomen",
  "nihil":"niets", "offers":"je biedt aan", "idoneus":"geschikt", "legionarii":"legioensoldaten", "nullus":"geen", "adsum":"ik ben er", "hodie":"vandaag",
  "tutela":"bescherming / schild", "cura":"genees!", "nulli":"geen (meervoud)", "vulnerati":"gewonden", "curantur":"worden verzorgd / genezen", "novi":"nieuwe", "conscribuntur":"worden geworven", "dilectu":"werving (bij de werving)", "novos":"nieuwe (4e naamval)", "candidati":"kandidaten",
  "excellit":"blinkt uit", "impetu":"kracht (in kracht)", "celeritate":"snelheid (in snelheid)", "ambitu":"bereik (in bereik)", "infirmus":"zwak", "debilis":"krachteloos", "nudus":"onbeschermd", "tardus":"traag", "brevis":"kort",
  "sunt":"zijn", "adsunt":"zijn er", "vulneratus":"gewond", "vulnerati":"gewonden", "hunc":"deze (4e naamval)",
  "achille":"Achilles (met Achilles)", "achilles":"Achilles (Griekse held)", "achillis":"van Achilles", "aedificamus":"wij bouwen", "aedificat":"bouwt", "aedificavisti":"je hebt gebouwd", "aerem":"lucht (4e naamval)", "agamemnon":"Agamemnon (Griekse koning)", "alata":"gevleugelde", "album":"wit (4e naamval)", "altum":"hoog (4e naamval)", "altus":"hoog", "amas":"je houdt van", "amat":"houdt van", "amazones":"Amazones (vrouwelijke krijgers)", "amazonum":"van de Amazones", "ambulo":"ik loop", "amicis":"aan vrienden", "amicum":"vriend (4e naamval)", "amicus":"vriend", "andromacha":"Andromache (vrouw van Hector)", "andromedam":"Andromeda (4e naamval)", "ante":"voor", "aprum":"everzwijn (4e naamval)", "apud":"bij", "aqua":"water", "aquam":"water (4e naamval)", "aquilam":"adelaar (4e naamval)", "arcum":"bow (accusative)", "ardeam":"Ardea (4e naamval)", "argo":"Argo (het schip van Jason)", "ariadna":"Ariadne", "atalanta":"Atalanta (snelle jageres)", "atalantam":"Atalanta (4e naamval)", "athena":"Athena (godin)", "audax":"dapper / vermetel", "audio":"ik hoor", "aurea":"gouden", "aurei":"van goud", "aureum":"gouden (4e naamval)", "caelo":"hemel (in de lucht)", "callidus":"sluw", "calydonium":"Calydonisch", "calypso":"Calypso (nimf)", "camilla":"Camilla (jageres)", "camillam":"Camilla (4e naamval)", "campum":"veld (4e naamval)", "capio":"ik pak / neem", "capit":"pakt / neemt", "capite":"hoofd (op het hoofd)", "caput":"hoofd", "casa":"huisje", "cassandra":"Cassandra", "castris":"kamp (uit het kamp)", "causa":"vanwege", "celeriter":"snel", "celerrima":"de snelste", "centum":"honderd", "circe":"Circe (tovenares)", "cloelia":"Cloelia (Romeinse vrouw)", "cloeliam":"Cloelia (4e naamval)", "colchide":"Colchis (in Colchis)", "confecisti":"je hebt volbracht", "consilium":"plan", "cum":"met", "curris":"je rent", "curro":"ik ren", "cursu":"het hardlopen", "dat":"geeft", "dextram":"rechterhand (4e naamval)", "dimittit":"laat gaan", "dolorem":"pijn (4e naamval)", "domi":"thuis", "dormio":"ik slaap", "dormire":"slapen", "draconem":"dragon (accusative)", "duodecim":"twaalf", "duos":"twee (4e naamval)", "ego":"ik", "eius":"zijn / haar", "eo":"ik ga", "equis":"paarden (met de paarden)", "equo":"paard (te paard / in het paard)", "equus":"paard", "eram":"ik was", "erat":"was", "exeo":"ik ga uit", "exspectat":"wacht op", "facimus":"wij doen", "facit":"doet", "familiam":"familie (4e naamval)", "feminae":"vrouwen", "filum":"draad", "flores":"bloemen", "fortes":"dappere", "fortiter":"dapper", "fratres":"broers", "fugi":"ik ben gevlucht", "fui":"ik ben geweest", "gladium":"zwaard (4e naamval)", "gorgones":"Gorgonen", "graecorum":"van de Grieken", "habesne":"heb je?", "habet":"heeft", "habito":"ik woon", "hector":"Hector (Trojaanse held)", "hectoris":"van Hector", "helena":"Helena", "helenam":"Helena (4e naamval)", "hera":"Hera (godin)", "hercules":"Hercules (Griekse held)", "hostibus":"vijanden (voor de vijanden)", "hostium":"van de vijanden", "hydra":"Hydra (monster met vele koppen)", "hydram":"Hydra (4e naamval)", "iason":"Jason", "iasonem":"Jason (4e naamval)", "igne":"vuur (in het vuur)", "ignem":"fire (accusative)", "infirmum":"zwak (4e naamval)", "infirmus":"zwak", "intramus":"wij gaan binnen", "ira":"woede", "it":"gaat", "ita":"ja / zo", "iuvamus":"wij helpen", "iuvas":"je helpt", "iuvat":"helpt", "iuvisti":"je hebt geholpen", "iuvo":"ik help", "labor":"opdracht / zware taak", "laboras":"je werkt", "laborem":"opdracht (4e naamval)", "labores":"opdrachten", "laboro":"ik werk", "labyrintho":"labyrint (in het labyrint)", "labyrinthum":"labyrint (4e naamval)", "labyrinthus":"labyrint", "latent":"verbergen zich", "laudant":"prijzen", "laudat":"prijst", "lente":"langzaam", "leonem":"leeuw (4e naamval)", "leones":"leeuwen", "libenter":"graag", "liberavisti":"je hebt bevrijd", "libros":"boeken (4e naamval)", "librum":"boek (4e naamval)", "ligneum":"houten (4e naamval)", "ligneus":"houten", "litus":"kust", "lunam":"maan (4e naamval)", "lyram":"lier (4e naamval)", "magnam":"grote (4e naamval)", "mala":"appels", "mane":"'s ochtends", "maneo":"ik blijf", "manus":"hand", "mater":"moeder", "matrem":"moeder (4e naamval)", "mecum":"met mij", "medea":"Medea (tovenares)", "medusa":"Medusa", "medusae":"van Medusa", "medusam":"Medusa (4e naamval)", "minotaurum":"Minotaurus (4e naamval)", "minotaurus":"Minotaurus (stiermens)", "mittit":"schiet / stuurt", "mitto":"ik schiet / stuur", "monte":"berg (op de berg)", "mucium":"Mucius (4e naamval)", "mucius":"Mucius (Romeinse held)", "multos":"veel (4e naamval)", "muri":"muren", "murum":"muur (4e naamval)", "nam":"want", "nautas":"zeelieden (4e naamval)", "navem":"schip (4e naamval)", "naves":"schepen", "necare":"doden", "nemeaeum":"Nemeïsche", "nix":"sneeuw", "nocte":"'s nachts", "nomen":"naam", "num":"soms? / toch niet?", "numquam":"nooit", "obses":"gijzelaar", "oculos":"ogen (4e naamval)", "oculum":"oog (4e naamval)", "odi":"ik haat", "olea":"olijfboom", "oleis":"olijfbomen (in de olijfgaarden)", "omnia":"alles", "oppugnamus":"wij vallen aan", "otium":"rust", "palude":"moeras (in het moeras)", "paride":"Paris (met Paris)", "parvi":"kleine", "patria":"vaderland", "patroclus":"Patroclus (vriend van Achilles)", "pecunia":"geld", "pedem":"voet (4e naamval)", "pellis":"huid", "penelope":"Penelope (vrouw van Odysseus)", "penthesilea":"Penthesilea (koningin van de Amazones)", "penthesileam":"Penthesilea (4e naamval)", "per":"door", "perseus":"Perseus (Griekse held)", "pigri":"luie", "polyphemus":"Polyphemus (cycloop)", "ponit":"legt", "pono":"ik leg", "portare":"dragen", "possum":"I can", "priamus":"Priamus (koning van Troje)", "primus":"eerste", "prope":"vlakbij", "pueri":"jongens", "pugnant":"vechten", "pugnat":"vecht", "pugno":"ik vecht", "purgavisti":"je hebt schoongemaakt", "quae":"welke / wie", "quaerimus":"wij zoeken", "quando":"wanneer", "redire":"terugkeren", "regem":"koning (4e naamval)", "rex":"koning", "romani":"Romeinen", "sagittas":"pijlen (4e naamval)", "sagittis":"pijlen (met pijlen)", "scaevola":"Scaevola (linkshandige)", "scamandrum":"Scamander (rivier bij Troje, 4e naamval)", "sed":"maar", "sequor":"ik volg", "serpentes":"slangen", "servat":"beschermt", "silvas":"bossen (4e naamval)", "statua":"standbeeld", "talaria":"gevleugelde sandalen", "talus":"hiel", "tardant":"houden op", "tardat":"houdt op", "tegit":"bedekt", "teneo":"ik houd vast", "tertium":"derde (4e naamval)", "theseus":"Theseus (Atheense held)", "thetis":"Thetis (zeegodin)", "timeo":"ik ben bang", "transeo":"ik steek over", "troiae":"van Troje", "troiam":"Troje (4e naamval)", "troiani":"Trojanen", "ulixem":"Odysseus (4e naamval)", "ulixes":"Odysseus (Ulixes)", "unum":"één (4e naamval)", "uxor":"echtgenote", "velleris":"van het vlies", "vellus":"vlies", "venis":"je komt", "venor":"ik jaag", "venus":"Venus (godin)", "vespere":"'s avonds", "vincit":"verslaat", "vinco":"ik versla", "vincor":"ik word verslagen", "viros":"mannen (4e naamval)", "volo":"ik wil", 
  "aedifico":"ik bouw", "aegyptum":"Egypte (4e naamval)", "amici":"vrienden", "amicos":"vrienden (4e naamval)", "amo":"ik hou van", "assigna":"wijs toe!", "athenae":"Athene", "aurum":"goud", "auxilio":"tot hulp", "campus":"veld / oefenveld", "cecidit":"is gevallen", "cibum":"eten (4e naamval)", "colle":"heuvel (6e naamval: op de heuvel)", "colloquia":"gesprekken", "colloquium":"gesprek", "condit":"sticht", "condo":"ik sticht", "cur":"waarom", "dea":"godin", "defendis":"je verdedigt", "defendo":"ik verdedig", "dei":"goden", "delent":"vernietigen", "domum":"huis (4e naamval)", "duco":"ik leid", "equum":"horse (accusative)", "eris":"je zult zijn", "erit":"zal zijn", "etiam":"ook / zelfs", "exercitati":"getraind", "facio":"I do", "facis":"je doet", "fides":"vertrouwen", "filium":"zoon (4e naamval)", "fratrem":"broer (4e naamval)", "frumentum":"graan", "fugio":"ik vlucht", "graeciam":"Griekenland (4e naamval)", "habeo":"ik heb", "habitant":"wonen", "heroes":"helden", "heroum":"zaal van de helden", "hic":"hier / deze", "hoc":"dit", "horatius":"Horatius (held die de brug verdedigde)", "italiam":"Italië (4e naamval)", "iuvant":"helpen", "latinam":"Latijnse (4e naamval)", "locuti":"gesproken", "lupa":"wolvin", "magna":"groot", "mari":"zee (in de zee)", "me":"mij", "mea":"mijn", "meam":"mijn (4e naamval)", "meus":"mijn", "mihi":"to me", "montem":"berg (4e naamval)", "muros":"muren (4e naamval)", "murus":"muur", "nato":"ik zwem", "navigat":"zeilt", "navigo":"ik zeil", "navis":"schip", "nemo":"niemand", "nihil":"niets", "nolo":"ik wil niet", "nostros":"onze (4e naamval)", "novam":"nieuwe (4e naamval)", "nutrivit":"heeft gevoed", "omnes":"allen", "palatino":"Palatijn (van de Palatijn)", "pater":"vader", "patrem":"vader (4e naamval)", "patriam":"vaderland (4e naamval)", "pecuniam":"geld (4e naamval)", "pons":"brug", "pontem":"brug (4e naamval)", "portat":"draagt", "porto":"ik draag", "primum":"eerste (4e naamval)", "pro":"voor", "pugna":"vecht!", "pugnare":"vechten", "quaere":"zoek!", "quaerit":"zoekt", "quaero":"ik zoek", "quattuor":"vier", "quia":"omdat", "quid":"wat", "quis":"wie", "quomodo":"hoe", "quoque":"ook", "recte":"juist", "regina":"koningin", "relinquo":"ik verlaat", "remum":"Remus (4e naamval)", "ripam":"oever (4e naamval)", "roma":"Rome", "romulum":"Romulus (4e naamval)", "romulus":"Romulus (stichter van Rome)", "salio":"ik spring", "salit":"springt", "secundum":"tweede (4e naamval)", "senex":"oud / grijsaard", "servavisti":"je hebt gered", "servo":"ik bescherm", "silvam":"bos (4e naamval)", "solus":"alleen", "sublicius":"Sublicische (houten brug)", "sumus":"wij zijn", "tiberi":"de Tiber (in de Tiber)", "troia":"Troy", "tu":"jij", "ubi":"waar", "umeris":"schouders (op de schouders)", "urbe":"stad (6e naamval)", "urbem":"stad (4e naamval)", "urbs":"stad", "veniam":"ik zal komen (zou komen)", "venit":"komt", "vocatur":"wordt genoemd",  "proelium":"gevecht", "incipe":"begin!", "celerius":"sneller", "vita":"leven", "castrorum":"van het kamp", "ala":"golf (vleugel van een leger)",
  "veniunt":"komen", "prima":"eerste", "secunda":"tweede", "tertia":"derde", "quarta":"vierde", "elige":"kies!", "defendisti":"je hebt verdedigd", "capta":"ingenomen", "praemium":"beloning",
  "acies":"slagorde", "defensio":"verdediging", "latina":"Latijnse", "oppugnatio":"aanval", "ardeae":"van Ardea", "ex":"uit", "accipio":"ik accepteer", "non":"niet", "nunc":"nu", "gratias":"dank", "vale":"vaarwel", "aeneas":"Aeneas (Trojaanse held)",
  "hospes":"gast / vreemdeling", "sum":"I am", "hostes":"vijanden", "vexant":"vallen lastig", "tres":"drie", "vince":"versla!", "auxilium":"hulp", "meum":"mijn", "habebis":"je zult hebben",
  "bene":"goed", "vicisti":"je hebt verslagen", "tibi":"to you", "ago":"ik doe / ik breng", "tecum":"met jou", "venio":"ik kom", "iter":"reis", "bonum":"goed", "quot":"hoeveel", "heros":"held", "novus":"nieuw",
  "adiungit":"voegt zich bij", "meliora":"verbeter!", "claude":"sluit!", "gradus":"niveau", "maximus":"hoogste", "prius":"eerst",
  "proventus":"opbrengst", "hora":"uur", "paratum":"klaar", "capacitas":"opslagmaximum", "conscribe":"werf!", "mox":"binnenkort", "aderit":"zal er zijn",
  "porta":"poort", "haec":"deze / dit", "nondum":"nog niet", "aperta":"open", "loca":"plaatsen", "exercitationis":"van de training", "plena":"vol",
  "hodie":"vandaag", "deest":"ontbreekt", "satis":"genoeg", "collectum":"opgehaald", "horreum":"opslagplaats voor graan", "plenum":"vol",
  "melioratum":"verbeterd", "finita":"afgelopen", "exercitatio":"training", "visne":"wil je?", "hunc":"deze (4e naamval)", "honeste":"eervol",
  "dimittere":"ontslaan", "adiungit":"voegt zich bij", "intellego":"ik begrijp het", "salve":"gegroet!", "tua":"jouw", "et":"en", "latio":"Latium (in Latium)",
  "ibi":"daar", "habitat":"woont", "dormiunt":"slapen", "caeduntur":"worden gehakt", "exercentur":"worden getraind", "effoditur":"wordt gedolven",
  "servatur":"wordt bewaard", "legio":"legioen", "convenit":"komt samen", "ligna":"hout (meervoud)", "aes":"brons", "praetorium":"hoofdkwartier van de leider", "perge":"ga verder!", "herba":"gras", "alta":"hoog", "martius":"van Mars", "exerce":"train!", "exercetur":"wordt getraind", "collige":"haal op!", "promove":"bevorder!", "missio":"ontslag", "honesta":"eervol", "quam":"welke", "viam":"path (accusative)", "eligis":"je kiest", "nullos":"geen (4e naamval)", "milites":"soldaten", "magni":"groot", "vides":"je ziet",
};

/* ---- Weergave ---- */
function castraNorm(w){ return w.toLowerCase().replace(/[^a-zāēīōū]/g,"").replace(/[āēīōū]/g,c=>({ā:"a",ē:"e",ī:"i",ō:"o",ū:"u"}[c])); }

// HTML van een Latijnse zin: elk woord tikbaar, plus ⓘ voor de hele vertaling.
// la/nl mogen vrij samengesteld zijn (dynamische zinnen); sid = log-sleutel.
// Naam van de speler (uit het profiel) voor aanspreking in het Latijn: "dux {naam}". De naam blijft onverbogen
// (een Nederlandse naam heeft geen betrouwbare vocativus); zonder profiel valt "{naam}" weg.
// Gesproken tekst tussen aanhalingstekens.
function castraSay(t){ return t ? '"'+t+'"' : t; }
function castraPlayerName(){ try{ return (typeof BM_IDENT!=="undefined" && BM_IDENT && BM_IDENT.name) ? String(BM_IDENT.name).trim() : ""; }catch(e){ return ""; } }
function castraSub(t){ const n = castraPlayerName(); return String(t).replace(/ ?\{naam\}/g, m=>n ? (m.charAt(0)===" "?" ":"")+n : ""); }
function castraLaHTML(la, nl, sid){
  la = castraSub(la); nl = castraSub(nl);
  const words = la.split(/(\s+)/).map(p=>{
    if(!p.trim()) return p;
    return `<span class="cl-w" data-w="${esc(castraNorm(p))}" onclick="castraTapWord(event,this)" style="cursor:pointer;border-bottom:1px dotted #b8975a">${esc(p)}</span>`;
  }).join("");
  const id = "cl"+Math.random().toString(36).slice(2,8);
  return `<span class="cl-s">${words} <button class="cl-i" data-la="${esc(la)}" onclick="castraTapSentence('${id}','${esc(sid||la).replace(/'/g,"")}',this)" title="Vertaling" style="background:none;border:1px solid var(--hi-dim,#8a6d2f);color:var(--hi,#d4af37);border-radius:50%;width:20px;height:20px;font-size:12px;line-height:1;padding:0;cursor:pointer">ⓘ</button><span id="${id}" class="cl-nl" style="display:none;font-size:13px;opacity:.85;font-style:italic"><br>${esc(nl)}</span></span>`;
}
function castraLa(id){ const t = CASTRA_LA[id]; return t ? castraLaHTML(t.la, t.nl, id) : esc(id); }
function castraLaText(id){ return CASTRA_LA[id] ? castraSub(CASTRA_LA[id].la) : id; }

function castraLogHelp(kind, key, text){
  if(typeof CASTRA==="undefined" || !CASTRA) return;
  const h = CASTRA.help || (CASTRA.help = { words:{}, sentences:{} });
  const m = h[kind] || (h[kind] = {});
  m[key] = (m[key]||0)+1;
  if(typeof castraSave==="function") castraSave();
  castraHelpSync(kind, key, text);
}
// Geaggregeerd per klas/maand, nooit per leerling: classAnalyticsCastra/{klas}/{YYYY-MM}/{w_woord|s_zin}
// = { p: tekst, k: "w"|"s", c: aantal }. Zelfde patroon als classAnalyticsChronica; alleen voor
// ingelogde leerlingen (BM_IDENT). Docentweergave: tpRenderCastraAnalytics() in games.js.
function castraHelpSync(kind, key, text){
  try{
    if(typeof fbDB==="undefined" || !fbDB || typeof BM_IDENT==="undefined" || !BM_IDENT || !BM_IDENT.klascode) return;
    const month = new Date().toISOString().slice(0,7);
    const k = (kind==="words" ? "w_" : "s_") + String(key).toLowerCase().replace(/[^a-z0-9]+/g,"_").slice(0,60);
    const path = "classAnalyticsCastra/"+BM_IDENT.klascode+"/"+month+"/"+k+"/";
    const upd = {};
    upd[path+"p"] = String(text||key).slice(0,80);
    upd[path+"k"] = kind==="words" ? "w" : "s";
    upd[path+"c"] = firebase.database.ServerValue.increment(1);
    fbDB.ref().update(upd).catch(()=>{});
  }catch(e){}
}
let _castraFormWords = null;
function castraNameGloss(w){ const n = castraPlayerName(); if(!n) return null; return n.split(/\s+/).some(p=>castraNorm(p)===w) ? "jouw naam" : null; }
function castraFormGloss(w){
  if(typeof CASTRA_FORM_LIST==="undefined") return null;
  if(!_castraFormWords){ _castraFormWords = {}; CASTRA_FORM_LIST.forEach(f=>{ f.nm.split(" ").forEach(p=>{ const k = castraNorm(p); if(k && !_castraFormWords[k]) _castraFormWords[k] = f.nm; }); }); }
  const nm = _castraFormWords[w]; return nm ? "soldatentype of volk: "+nm : null;
}
function castraTapWord(ev, node){
  ev.stopPropagation();
  const w = node.getAttribute("data-w");
  const meaning = CASTRA_GLOSS[w] || castraNameGloss(w) || castraFormGloss(w) || "(geen vertaling beschikbaar)";
  castraLogHelp("words", w, node.textContent);
  let box = document.getElementById("castraGloss");
  if(!box){
    box = document.createElement("div"); box.id = "castraGloss";
    box.style.cssText = "position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:9998;background:#1b150e;color:var(--cream,#f1e6c4);border:1px solid var(--hi,#d4af37);border-radius:10px;padding:8px 14px;font-size:15px;box-shadow:0 4px 14px rgba(0,0,0,.5);max-width:90vw";
    document.body.appendChild(box);
  }
  box.innerHTML = `<b>${esc(node.textContent)}</b> = ${esc(meaning)}`;
  box.style.display = "block";
  clearTimeout(box._t); box._t = setTimeout(()=>{ box.style.display="none"; }, 3500);
}
function castraTapSentence(id, sid, btn){
  const n = document.getElementById(id); if(!n) return;
  const show = n.style.display==="none";
  n.style.display = show ? "inline" : "none";
  if(show) castraLogHelp("sentences", sid, btn && btn.getAttribute("data-la"));
}
