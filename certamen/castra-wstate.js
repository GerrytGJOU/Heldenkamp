/* ============================================================================
   CASTRA HEROUM — WERELDTOESTANDEN: DE WERELD REAGEERT OP WAT JE HEBT GEDAAN
   ----------------------------------------------------------------------------
   Een plaats ziet er anders uit en de mensen praten anders nadat je een grote gebeurtenis (een gewonnen missie) hebt meegemaakt.
   Geen simulatie, maar een paar vaste toestanden per plaats (zoals de NPC's en tegels die in Pokémon Emerald veranderen zodra een
   flag omgaat). Elke toestand is een paar personen met een voorwaarde (`when`, zie castra-flags.js):
     voor  de gebeurtenis: een bezorgde bewoner die vertelt wat er aan de hand is;
     na    de gebeurtenis: dezelfde plek, maar nu met een opgeluchte bewoner;
   plus een bericht de eerste keer dat je het land weer binnenkomt ("Ardea is verdedigd!").
   Ze lopen mee met de bestaande missies; er is geen extra opslag nodig (alles volgt uit de gewonnen missies).
   Teksten: eenvoudig Latijn met vertaling; laat ze nakijken (Thermopylarum is genitivus pluralis).
   Laadt NA castra-flags.js.
   ============================================================================ */
const CASTRA_WSTATES = [
  { id:"ardea", region:"latium", at:[34,21], cond:"mission:m3", folk:"rom", banner:["🏛️ Ardea", "Ardea is verdedigd! In het noorden staat de weg naar Rome weer open."],
    voor:{ nm:"Vluchteling", look:{ armor:"vodden", baard:"baard", haarkleur:"grijs" }, say:[
      { la:"Ardea wordt belegerd! De vijanden bestormen de muren.", nl:"Ardea is under siege! The enemies are storming the walls." },
      { la:"Rome is gesloten. Help ons!", nl:"Rome is closed. Help us!" } ] },
    na:{ nm:"Burger van Ardea", look:{ armor:"robe", baard:"geen", haar:"vlecht" }, say:[
      { la:"Ardea is vrij! Wij danken je.", nl:"Ardea is free! We thank you." },
      { la:"Nu staat Rome voor je open.", nl:"Now Rome is open to you." } ] } },
  { id:"labyrinthus", region:"graecia", at:[55,38], cond:"mission:g2", folk:"gra", banner:["🏺 Labyrinthus", "Het labyrint is stil: de Minotaurus is verslagen."],
    voor:{ nm:"Bezorgde moeder", look:{ armor:"robe", baard:"geen", haar:"vlecht" }, say:[
      { la:"De Minotaurus woont in het labyrint.", nl:"The Minotaur lives in the labyrinth." },
      { la:"Mijn zoon is daar!", nl:"My son is over there!" } ] },
    na:{ nm:"Opgeluchte moeder", look:{ armor:"robe", baard:"geen", haar:"vlecht" }, say:[
      { la:"De Minotaurus is verslagen!", nl:"The Minotaur is defeated!" },
      { la:"Mijn zoon is thuis.", nl:"My son is home." } ] } },
  { id:"alesia", region:"gallia", at:[29,40], cond:"mission:ga2", folk:"gal", banner:["🌿 Alesia", "Het beleg van Alesia is voorbij. In het land is het stil geworden."],
    voor:{ nm:"Vermoeide Galliër", look:{ armor:"vodden", baard:"baard", haarkleur:"bruin" }, say:[
      { la:"Alesia wordt belegerd. De honger drukt ons.", nl:"Alesia is under siege. Hunger is pressing us." },
      { la:"Wanneer komt er vrede?", nl:"When will there be peace?" } ] },
    na:{ nm:"Rustige Galliër", look:{ armor:"vodden", baard:"baard", haarkleur:"bruin" }, say:[
      { la:"Er is vrede. Alesia is gevallen, maar wij leven.", nl:"There is peace. Alesia has fallen, but we are alive." } ] } },
  { id:"thermopylae", region:"laconia", at:[29,38], cond:"mission:la1", folk:"spa", banner:["🛡️ Thermopylae", "Thermopylae is verdedigd. De Spartanen eren hun gevallenen."],
    voor:{ nm:"Spartiates", look:{ armor:"middel", baard:"baard", haarkleur:"zwart" }, say:[
      { la:"De Perzen komen eraan.", nl:"The Persians are coming." },
      { la:"Wij vechten voor het vaderland!", nl:"We fight for the homeland!" } ] },
    na:{ nm:"Oude Spartaan", look:{ armor:"middel", baard:"baard", haarkleur:"grijs" }, say:[
      { la:"De herinnering aan Thermopylae blijft.", nl:"The memory of Thermopylae lives on." } ] } },
];
(function(){
  CASTRA_WSTATES.forEach(S=>{
    const W = CASTRA_WORLDS[S.region]; if(!W) return;
    const mk = (suffix, N, when, dir)=>({ id:"ws_"+S.id+"_"+suffix, region:S.region, kind:"npc", role:"say", nm:N.nm, x:S.at[0], y:S.at[1], dir:dir||"down", when, say:N.say,
      look:castraRegLook(S.folk, Object.assign({ cape:"geen", helm:"geen", schild:"geen", wapen:"geen" }, N.look)) });
    CASTRA_WENT.push(mk("voor", S.voor, { not:S.cond }, "down"), mk("na", S.na, S.cond, "down"));
    CASTRA_EVENTS.push({ id:"ws_"+S.id+"_banner", map:S.region, on:"enter", if:S.cond, once:true, do:[ { toast:S.banner } ] });
  });
})();
Object.assign(CASTRA_GLOSS, { "ardea":"Ardea (stad)", "obsidetur":"wordt belegerd", "hostes":"vijanden", "muros":"muren (4e naamval)", "oppugnant":"bestormen", "clausa":"gesloten", "adiuva":"help!", "nos":"ons",
  "libera":"vrij", "gratias":"dank", "agimus":"wij brengen", "patet":"staat open", "minotaurus":"de Minotaurus", "labyrintho":"in het labyrint", "habitat":"woont", "filius":"zoon", "meus":"mijn", "ibi":"daar",
  "victus":"verslagen", "domi":"thuis", "fames":"honger", "premit":"drukt", "quando":"wanneer", "pax":"vrede", "cecidit":"is gevallen", "vivimus":"wij leven", "persae":"de Perzen", "appropinquant":"komen dichterbij",
  "patria":"vaderland", "pugnabimus":"wij zullen vechten", "memoria":"herinnering", "manet":"blijft", "thermopylarum":"van Thermopylae", "obsidetur.":"wordt belegerd" });
