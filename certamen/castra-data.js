/* ============================================================================
   CASTRA HEROUM — DATA (pure data, geen logica)
   ----------------------------------------------------------------------------
   Gebouwen, grondstoffen, soldatenlijnen, helden, aanleg/karakters en de
   kaartindeling van de castra. Bron van waarheid voor het ontwerp is
   CASTRA_HEROUM.md in de repo-root; pas getallen en teksten hier aan zonder
   castra.js te wijzigen. Latijnse teksten (lat) zijn voorlopig en door Gerben
   te controleren; nl = vertaalhulp (tik op een tekst in het spel).
   Wordt vóór castra.js geladen.
   ============================================================================ */

/* ---- Grondstoffen ---- */
const CASTRA_RES = [
  { id:"frumentum", nm:"Graan", nl:"grain",  icon:"🌾" },
  { id:"lignum",    nm:"Hout",    nl:"wood",   icon:"🪵" },
  { id:"aes",       nm:"Brons",       nl:"bronze",  icon:"🪙" },
  { id:"gloria",    nm:"Roem",    nl:"glory",   icon:"🏆" },
];
const CASTRA_START_RES = { frumentum:100, lignum:150, aes:150, gloria:0 };

/* ---- Stats (Latijnse namen, gekoppeld aan Battle Mode — zie CASTRA_HEROUM.md) ----
   vita = HP, impetus = schade, tutela = schild/verdediging;
   celeritas (snelheid) en ambitus (bereik) alleen voor tower defence. */
const CASTRA_STATS = [
  { id:"vita",      nm:"Leven",      bm:"HP" },
  { id:"impetus",   nm:"Kracht",   bm:"schade" },
  { id:"tutela",    nm:"Verdediging",    bm:"schild" },
  { id:"celeritas", nm:"Snelheid", bm:null },
  { id:"ambitus",   nm:"Bereik",   bm:null },
];

/* ---- Gebouwen ----
   phase:  1 = nu in het spel, anders nog niet gebouwd/zichtbaar.
   slot:   {x,y} linksboven op de kaart (2×2 tegels), of null als nog niet geplaatst.
   prod:   { res, perHour } per level (alleen producerende gebouwen).
   cost:   basiskosten voor level 1→2; schaalt met level^costExp (zie castra.js).
   maxLvl: bovengrens; alle gebouwen behalve het praetorium zijn bovendien
           begrensd door het praetorium-level. */
const CASTRA_BUILDINGS = [
  { id:"praetorium",  nm:"Hoofdgebouw",  nl:"Main building", icon:"🏛️", phase:1, slot:{x:3,y:1},  maxLvl:10,
    prod:{ res:"frumentum", perHour:8 }, cost:{ lignum:60, aes:60 },
    lat:"Bepaalt het maximale level van alle andere gebouwen.", desc:"Sets the maximum level of all other buildings." },
  { id:"contubernia", nm:"Barakken", nl:"Barracks",    icon:"⛺", phase:1, slot:{x:10,y:2}, maxLvl:10,
    cost:{ lignum:50, aes:30 },
    lat:"Hier staan je soldaten. Meer level = meer soldaten tegelijk.", desc:"Your soldiers stay here. More levels = more soldiers at the same time." },
  { id:"lignatio",    nm:"Houthakker",    nl:"Woodcutter",  icon:"🪓", phase:1, slot:{x:13,y:1}, maxLvl:10,
    prod:{ res:"lignum", perHour:20 }, cost:{ lignum:40, aes:40 },
    lat:"Levert hout.", desc:"Produces wood." },
  { id:"campus",      nm:"Trainen en evolueren",      nl:"Training and evolving", icon:"🏟️", phase:1, slot:{x:2,y:6}, maxLvl:10,
    cost:{ lignum:70, aes:50 },
    lat:"Soldaten trainen en laten evolueren. (Volgt in een latere stap.)", desc:"Train soldiers and let them evolve. (Coming in a later step.)" },
  { id:"metallum",    nm:"Mijn",    nl:"Mine",        icon:"⛏️", phase:1, slot:{x:12,y:8}, maxLvl:10,
    prod:{ res:"aes", perHour:20 }, cost:{ lignum:50, aes:40 },
    lat:"Levert brons.", desc:"Produces bronze." },
  { id:"horreum",     nm:"Opslag",     nl:"Storage",      icon:"🏺", phase:1, slot:{x:4,y:8},  maxLvl:10,
    cost:{ lignum:60, aes:30 },
    lat:"Verhoogt het opslagmaximum van je grondstoffen.", desc:"Raises the storage limit of your resources." },
  { id:"principia",   nm:"Klassenevenementen",   nl:"Class events", icon:"🚩", phase:1, slot:{x:7,y:5}, maxLvl:1, fixed:true,
    lat:"Midden in het kamp: hier start straks de Legio (klassenevenement).", desc:"In the middle of the camp: the Legio (class event) will start here." },
  // Nog niet geplaatst (zie CASTRA_HEROUM.md, tabel Gebouwen):
  { id:"ludus",        nm:"Nieuwe aanvallen leren",        nl:"Learning new attacks", phase:9, slot:null, maxLvl:10, cost:{ lignum:80, aes:60 } },
  { id:"fabrica",      nm:"Smederij",      nl:"Forge",       phase:9, slot:null, maxLvl:10, cost:{ lignum:80, aes:80 } },
  { id:"heroum",       nm:"Heldenzaal",       nl:"Hall of Heroes",     icon:"⭐", phase:1, slot:{x:9,y:7}, maxLvl:10, cost:{ lignum:100, aes:100 },
    lat:"Hier wonen je helden: praat met ze, wijs ze toe aan een gebouw en neem ze mee het gevecht in.", desc:"Your heroes live here: talk to them, assign them to a building and take them into battle." },
  { id:"valetudinarium",nm:"Herstel",nl:"Healing",      icon:"🩹", phase:1, slot:{x:2,y:8}, maxLvl:10, cost:{ lignum:60, aes:40 },
    lat:"Gewonde soldaten herstellen hier sneller; tegen betaling genezen ze meteen.", desc:"Wounded soldiers recover faster here; for a price they heal at once." },
  { id:"dilectus",     nm:"Werving",     nl:"Recruitment",        icon:"📜", phase:1, slot:{x:13,y:3}, maxLvl:10, cost:{ lignum:60, aes:60 },
    lat:"Elke paar uur nieuwe rekruten; de trainer beoordeelt hun aanleg.", desc:"New recruits every few hours; the trainer judges their talent." },
  { id:"templum",      nm:"Zegen van een god",      nl:"Blessing of a god", phase:9, slot:null, maxLvl:10, cost:{ lignum:90, aes:90 } },
  { id:"forum",        nm:"Ruilen",        nl:"Trading",         phase:9, slot:null, maxLvl:10, cost:{ lignum:70, aes:70 } },
  { id:"navalia",      nm:"Scheepswerf",      nl:"Shipyard",    icon:"⚓", phase:1, slot:{x:12,y:11}, start:0, maxLvl:10, cost:{ lignum:120, aes:80 },
    lat:"Scheepswerf: ontgrendelt de vlootvormen (Remex, Classiarius, Navarchus).", desc:"Shipyard: unlocks the fleet forms (Remex, Classiarius, Navarchus)." },
  { id:"stabula",      nm:"Stallen",      nl:"Stables",        icon:"🐎", phase:1, slot:{x:2,y:11}, start:0, maxLvl:10, cost:{ lignum:90, aes:60 },
    lat:"Stallen: ontgrendelt ruiterij, strijdwagens en olifanten in de troepenbomen.", desc:"Stables: unlocks cavalry, chariots and elephants in the troop trees." },
  { id:"bibliotheca",  nm:"Codex",  nl:"Codex",          phase:9, slot:null, maxLvl:10, cost:{ lignum:70, aes:50 } },
  { id:"murus",        nm:"Verdediging",        nl:"Defence",    phase:9, slot:null, maxLvl:10, cost:{ lignum:100, aes:60 } },
  { id:"arcus",        nm:"Decoratie", nl:"Decoration", phase:9, slot:null, maxLvl:1, cost:{ lignum:0, aes:0 } },
];

/* ---- Kaart van de castra (tegels van 48px) ---- */
const CASTRA_MAP = {
  cols:16, rows:15, tile:48,
  start:{ x:8, y:13, dir:"up" },
  // Poorten liggen in de kampmuur; erdoor lopen = activiteit kiezen.
  gates:[
    { id:"decumana",  nm:"Jachtpoort",  to:"venatio",  nl:"To the hunt",     tiles:[{x:7,y:0},{x:8,y:0}] },
    { id:"praetoria", nm:"Gevechtspoort", to:"proelium", nl:"To the battle map", tiles:[{x:15,y:5},{x:15,y:6}] },
  ],
};

/* ---- Soldatenlijnen (18 lijnen, ~45 vormen; zie CASTRA_HEROUM.md) ----
   type: inf (infanterie) > cav (ruiterij) > rng (afstand) > inf; sup/myth vallen
   buiten de driehoek. stages: naam per stadium; een array = vertakking. */
const CASTRA_TYPES = {
  rec:  { nm:"Rekruut",    beats:null },
  inf:  { nm:"Infanterie", beats:"cav" },
  cav:  { nm:"Ruiterij",   beats:"rng" },
  rng:  { nm:"Afstand",    beats:"inf" },
  sup:  { nm:"Ondersteuning", beats:null },
  myth: { nm:"Mythisch",   beats:null },
};
const CASTRA_LINES_LEGACY = [   // alleen voor de migratie van oude saves; de troepenbomen staan in castra-troops.js
  { id:"legioen",   type:"inf",  role:"Zware infanterie, blokkeert het pad", stages:["Hastatus","Princeps","Triarius"] },
  { id:"rangen",    type:"inf",  role:"Leider, versterkt soldaten om zich heen", stages:["Miles","Optio","Centurio"] },
  { id:"licht",     type:"rng",  role:"Afstand", stages:["Veles","Funditor","Sagittarius"] },
  { id:"ruiterij",  type:"cav",  role:"Snel, valt flanken aan", stages:["Eques","Decurio","Praefectus alae"] },
  { id:"vaandel",   type:"sup",  role:"Ondersteuning, verhoogt moreel", stages:["Tubicen","Signifer","Aquilifer"] },
  { id:"zorg",      type:"sup",  role:"Genezer", stages:["Capsarius","Medicus"] },
  { id:"beleg",     type:"rng",  role:"Schade op een gebied", stages:["Faber","Ballistarius","Architectus"] },
  { id:"verkenning",type:"sup",  role:"Onthult verborgen vijanden", stages:["Explorator","Speculator"] },
  { id:"vloot",     type:"inf",  role:"Sterk bij water en havens", stages:["Remex","Classiarius","Navarchus"] },
  { id:"arena",     type:"inf",  role:"Duellist; vertakt in drie richtingen", stages:["Tiro",["Murmillo","Retiarius","Secutor"]] },
  { id:"phalanx",   type:"inf",  role:"Grieks, blokkeert in formatie", stages:["Ephebus","Hoplites","Lochagus"] },
  { id:"psili",     type:"rng",  role:"Grieks, snel op afstand", stages:["Psilus","Peltasta"] },
  { id:"kreta",     type:"rng",  role:"Grieks, boogschutter te paard", stages:["Toxota","Hippotoxota"] },
  { id:"macedonie", type:"cav",  role:"Grieks, zware ruiterij", stages:["Hippeus","Hetairus"] },
  { id:"saters",    type:"myth", role:"Mythisch, verwart vijanden", stages:["Satyrus","Silenus"] },
  { id:"nimfen",    type:"myth", role:"Mythisch, geneest; vertakt", stages:["Nympha",["Dryas","Naias"]] },
  { id:"harpijen",  type:"myth", role:"Mythisch, vliegt over obstakels", stages:["Harpyia"] },
  { id:"gryps",     type:"myth", role:"Mythisch, sterke vlieger", stages:["Gryps"] },
];

/* Basiswaarden per type (stadium 1); elk volgend stadium ×CASTRA_STAGE_MULT. */
const CASTRA_BASE_STATS = {
  rec:  { vita:24, impetus:5, tutela:4, celeritas:4, ambitus:2 },
  inf:  { vita:30, impetus:6, tutela:8, celeritas:3, ambitus:1 },
  cav:  { vita:24, impetus:8, tutela:4, celeritas:7, ambitus:1 },
  rng:  { vita:18, impetus:7, tutela:2, celeritas:4, ambitus:5 },
  sup:  { vita:22, impetus:3, tutela:4, celeritas:4, ambitus:3 },
  myth: { vita:20, impetus:6, tutela:3, celeritas:6, ambitus:3 },
};
const CASTRA_STAGE_MULT = [1, 1.6, 2.4];

/* Aanleg (IV's): 0..CASTRA_INDOLES_MAX per waarde, bij het werven bepaald. */
const CASTRA_INDOLES_MAX = 15;
/* Karakters: +10% / −10%. */
const CASTRA_INGENIA = [
  { id:"ferox",    nm:"Wild",    up:"impetus",   down:"tutela" },
  { id:"cautus",   nm:"Voorzichtig",   up:"tutela",    down:"celeritas" },
  { id:"celer",    nm:"Vlug",    up:"celeritas", down:"vita" },
  { id:"robustus", nm:"Stevig", up:"vita",      down:"celeritas" },
  { id:"acer",     nm:"Fel",     up:"impetus",   down:"vita" },
  { id:"longus",   nm:"Lang",   up:"ambitus",   down:"tutela" },
  { id:"firmus",   nm:"Standvastig",   up:"tutela",    down:"impetus" },
  { id:"agilis",   nm:"Behendig",   up:"celeritas", down:"impetus" },
  { id:"fortis",   nm:"Sterk",   up:"vita",      down:"ambitus" },
  { id:"sagax",    nm:"Scherpzinnig",    up:"ambitus",   down:"vita" },
];
const CASTRA_INSIGNIS_CHANCE = 1/200;

/* ---- Helden (uniek, evolueren niet; missieketens volgen in fase 3) ---- */
const CASTRA_HEROES = [
  { id:"aeneas",    nm:"Aeneas",    region:"latium" },
  { id:"romulus",   nm:"Romulus",   region:"latium" },
  { id:"horatius",  nm:"Horatius Cocles", region:"latium" },
  { id:"cloelia",   nm:"Cloelia",   region:"latium" },
  { id:"mucius",    nm:"Mucius Scaevola", region:"latium" },
  { id:"camilla",   nm:"Camilla",   region:"latium" },
  { id:"hercules",  nm:"Hercules",  region:"graecia" },
  { id:"perseus",   nm:"Perseus",   region:"graecia" },
  { id:"theseus",   nm:"Theseus",   region:"graecia" },
  { id:"atalanta",  nm:"Atalanta",  region:"graecia" },
  { id:"iason",     nm:"Jason",     region:"graecia" },
  { id:"achilles",  nm:"Achilles",  region:"troia" },
  { id:"hector",    nm:"Hector",    region:"troia" },
  { id:"ulixes",    nm:"Odysseus",    region:"troia" },
  { id:"penthesilea",nm:"Penthesilea", region:"troia" },
];

/* ---- Regio's (venatio/proelium; inhoud volgt in fase 1b/2) ---- */
const CASTRA_REGIONS = [
  { id:"latium",  nm:"Midden-Italië",  nl:"Central Italy" },
  { id:"graecia", nm:"Griekenland", nl:"Greece" },
  { id:"troia",   nm:"Troje",   nl:"Troy" },
  { id:"gallia",  nm:"Gallië",  nl:"Gaul" },
  { id:"aegyptus", nm:"Egypte", nl:"Egypt" },
  { id:"persis", nm:"Perzië", nl:"Persia" },
  { id:"africa", nm:"Noord-Afrika", nl:"North Africa" },
  { id:"roma",   nm:"Rome",    nl:"Rome" },
  { id:"laconia", nm:"Laconië", nl:"Laconia" },
  { id:"germania", nm:"Germanië", nl:"Germania" },
  { id:"themiscyra", nm:"Themiscyra", nl:"Themiscyra" },
  { id:"inferi",  nm:"De Onderwereld",  nl:"The Underworld" },
];

/* ---- Balans ---- */
const CASTRA_BAL = {
  maxLvl: 10,
  // Bouwtijd (echte tijd, loopt door als je weg bent): minuten om naar level 1, 2, ... 10 te gaan; vanaf level 6 duurt het uren, level 10 bijna twee dagen.
  // Samen ongeveer 64 uur per gebouw, dus level 10 is een kwestie van weken. Gelijktijdig bouwen: 1 bouwer, een tweede vanaf Praetorium 4, een derde vanaf 8.
  buildMin: [1, 2, 5, 12, 30, 75, 180, 420, 960, 2160],
  builderStep: [1, 4, 8],
  costExp: 1.6,            // kosten level L→L+1 = basis × L^costExp
  walletBase: 300,         // opslagmaximum grondstoffen = base + perHorreumLvl × horreum-level
  walletPerHorreum: 300,
  producerStoreHours: 4,   // een producent loopt maximaal 4 uur vol
  prodPerLevelMult: 1,     // opbrengst per uur = perHour × level
  barracksBase: 6,         // aantal soldaten = base + perLvl × contubernia-level
  barracksPerLvl: 4,
  recruitCost: { frumentum:20 },   // testwerving (tot de Dilectus er is)
  // Evolutie: stadium 1->2 en 2->3 vragen een soldaat-level én een campus-level.
  evo: [ { lvl:5, campus:2 }, { lvl:10, campus:4 } ],
  // Bijtrainen (Day Care): hooguit ~een kwart van wat vechten oplevert, kost
  // frumentum, heeft een dagmaximum en loopt in realtime (tijdstempel).
  train: { cost:{ frumentum:10 }, minutes:20, xpBase:5, xpPerCampusLvl:2, perDay:5 },
  // Missio honesta: eervol ontslag geeft een deel van de grondstoffen terug.
  releaseRefund: { frumentum:10, aes:5 },
};
