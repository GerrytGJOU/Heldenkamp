/* ============================================================================
   CASTRA HEROUM — EVOLUTIE VAN ALLE HELDEN (data)
   ----------------------------------------------------------------------------
   Vult CASTRA_HERO_EVO (castra-heroevo.js) met de overige 14 helden; Ulixes staat daar zelf (pilot).
   Per held: persoonlijk voorwerp + quest op gradus 25, twee specialisaties, per specialisatie een quest op
   gradus 40 en een prestigevorm met een legendarische arte. Keuzes van Gerben: zie
   certamen/assets/sprites-forms/HELDEN_EVOLUTIE.md.
   De quests worden uit korte bouwstenen opgebouwd (K = vijanden verslaan, C = vangen, F = zoeken, B = baas);
   de Latijnse vraag voor de speler volgt vanzelf uit de stappen. Laadt NA castra-heroevo.js.
   ============================================================================ */

// Archetypen: basisklasse van de artes (castra-skills.js), type voor de tower defence en de stat-vermenigvuldigers.
const CASTRA_HEVO_ARCH = {
  hopliet:     { type:"inf", m:{ vita:1.25, impetus:0.95, tutela:1.3,  celeritas:0.9, ambitus:1.0 }, p:{ vita:1.45, impetus:1.1,  tutela:1.5,  celeritas:1.0, ambitus:1.1 } },
  spartaan:    { type:"inf", m:{ vita:1.1,  impetus:1.3,  tutela:1.0,  celeritas:1.0, ambitus:1.0 }, p:{ vita:1.25, impetus:1.45, tutela:1.1,  celeritas:1.1, ambitus:1.0 } },   // 1,55 gaf de spartaanse helden bijna 2,5x de schade van een tier 4-soldaat
  boogschutter:{ type:"rng", m:{ vita:0.9,  impetus:1.25, tutela:0.9,  celeritas:1.1, ambitus:1.6 }, p:{ vita:1.0,  impetus:1.55, tutela:1.0,  celeritas:1.2, ambitus:2.0 } },
  cavalerie:   { type:"cav", m:{ vita:1.0,  impetus:1.15, tutela:0.95, celeritas:1.4, ambitus:1.1 }, p:{ vita:1.15, impetus:1.4,  tutela:1.05, celeritas:1.7, ambitus:1.2 } },
  genie:       { type:"rng", m:{ vita:0.95, impetus:1.15, tutela:1.0,  celeritas:0.85, ambitus:1.7 }, p:{ vita:1.1,  impetus:1.4,  tutela:1.1,  celeritas:0.95, ambitus:2.1 } },
  myth:        { type:"sup", m:{ vita:1.05, impetus:1.2,  tutela:1.0,  celeritas:1.1,  ambitus:1.2 }, p:{ vita:1.2,  impetus:1.45, tutela:1.15, celeritas:1.2,  ambitus:1.4 } },
  priester:    { type:"sup", m:{ vita:1.1,  impetus:0.9,  tutela:1.1,  celeritas:1.0,  ambitus:1.4 }, p:{ vita:1.25, impetus:1.05, tutela:1.25, celeritas:1.1,  ambitus:1.7 } },
  centurio:    { type:"sup", m:{ vita:1.05, impetus:1.0,  tutela:1.15, celeritas:1.0, ambitus:1.4 }, p:{ vita:1.2,  impetus:1.15, tutela:1.3,  celeritas:1.1, ambitus:1.7 } },
  verkenner:   { type:"sup", m:{ vita:0.95, impetus:1.1,  tutela:0.95, celeritas:1.5, ambitus:1.3 }, p:{ vita:1.1,  impetus:1.35, tutela:1.1,  celeritas:1.9, ambitus:1.5 } },
};
const _HE_TERR = { silva:["in het bos","in the forest"], via:["op de weg","on the road"], campus:["op het veld","in the field"], tiberis:["bij de Tiber","at the Tiber"],
  olea:["in de olijfgaard","in the olive grove"], litus:["aan de kust","on the coast"], muros:["voor de muren","in front of the walls"], scamander:["bij de Scamander","at the Scamander"], cuniculus:["in de tunnel","in the tunnel"] };
const _HE_NUM = { 3:"tres", 5:"quinque", 6:"sex", 8:"octo", 10:"decem", 12:"duodecim" };
const _HE_BOSS = { boss_troia:["de Cycloop","the Cyclops","Troy"], boss_graecia:["de draak","the dragon","Greece"] };
const _HE_K = (n, region, terr)=>({ kind:"kill", n, region, terrain:terr, hud:{ la:"Versla vijanden "+_HE_TERR[terr][0]+"!", nl:"Defeat enemies "+_HE_TERR[terr][1]+"." } });
const _HE_C = (n)=>({ kind:"catch", n, hud:{ la:"Vang "+_HE_NUM[n]+" hostes!", nl:"Catch "+n+" vijanden." } });
const _HE_F = (region, icon, nm, la, nl)=>({ kind:"find", region, icon, nm, hud:{ la, nl } });
const _HE_B = (key)=>({ kind:"boss", key, hud:{ la:"Versla "+_HE_BOSS[key][0]+"!", nl:"Defeat "+_HE_BOSS[key][1]+" (the cave in "+_HE_BOSS[key][2]+")." } });
// Een quest: seek = [Latijn (4e naamval), Nederlands]; nom = [Latijn (1e naamval), Nederlands] voor de dankzin.
function _HE_Q(nm, seek, steps, nom, first){
  const ends = s=>s.replace(/!$/, ".");
  return { nm:{ la:nm[0], nl:nm[1] },
    ask:[ first ? { la:"Leider {naam}, de tijd is gekomen. Ik zoek "+seek[0]+" quaero.", nl:"Leader {naam}, the time has come. I am looking for "+seek[1]+"." }
                : { la:"Leider {naam}, mijn weg is duidelijk. Ik zoek "+seek[0]+" quaero.", nl:"Leader {naam}, my way is clear. I am looking for "+seek[1]+"." },
          { la:steps.map(s=>ends(s.hud.la)).join(" "), nl:steps.map(s=>s.hud.nl).join(" "), opts:[CASTRA_DQ_YES, CASTRA_DQ_NO] } ],
    steps,
    done:[ { la:nom[0]+"! Dank je wel, leider {naam}.", nl:nom[1]+"! Thank you, leader {naam}." },
           first ? { la:"Nu kan ik mijn weg kiezen (menu: Heroes, Evolueer).", nl:"Now I can choose my path (menu: Heroes, Evolve)." } : { la:"Ik krijg ambrosia.", nl:"I receive ambrosia." } ] };
}
// Een specialisatie met prestigevorm. a = archetype (sleutel van CASTRA_HEVO_ARCH).
function _HE_S(hid, id, a, nm, nl, desc, look, q2, pr){
  const A = CASTRA_HEVO_ARCH[a];
  return { id, nm, nl, desc, type:A.type, skillBase:a, cls:hid+"_"+id, mult:A.m, look,
    q2:{ ..._HE_Q([q2.nm[0], q2.nm[1]], q2.seek, q2.steps, q2.nom, false), reward:{ item:"evo_"+hid+"_2", pxp:150, gloria:10 } },
    prestige:{ nm:pr.nm, nl:pr.nl, mult:A.p, look:pr.look, legendary:{ id:pr.leg.id, la:pr.leg.la, nl:pr.leg.nl, lvl:40, fx:pr.leg.fx, mv:pr.leg.mv } } };
}
function _HE_H(hid, icon, itemNm, itemNl, q1, specs){
  CASTRA_HERO_EVO[hid] = {
    items:[ { id:"evo_"+hid+"_1", icon, nm:itemNm, nl:itemNl }, { id:"evo_"+hid+"_2", icon:"🍯", nm:"Ambrosia", nl:"Food of the gods" } ],
    q1:{ ..._HE_Q(q1.nm, q1.seek, q1.steps, q1.nom, true), reward:{ item:"evo_"+hid+"_1", pxp:80, gloria:5 } },
    specs };
  castraHeroEvoRegisterClasses(hid); castraHeroEvoRegisterQuests(hid);
}
const _HE_BUFF = { kind:"buff", pp:3, nl:"Je aanval wordt 3 beurten 30% sterker" }, _HE_SHIELD = { kind:"shield", pp:3, nl:"Je verdediging wordt 3 beurten 30% sterker" };
const _HE_LK = (o)=>o;

/* ----- Latium ----- */
_HE_H("aeneas", "🛡️", "Het schild van Aeneas", "The shield of Aeneas",
  { nm:["Het schild van Aeneas","The shield of Aeneas"], seek:["mijn schild","my shield"], nom:["Mijn schild","My shield"],
    steps:[ _HE_K(8,"latium","silva"), _HE_F("latium","🛡️","verloren schild","Zoek het schild!","Find the shield in Latium."), _HE_B("boss_troia") ] },
  [ _HE_S("aeneas","dux","centurio","Trojaanse leider","Commander","Aeneas wordt een leider: hij versterkt de torens om zich heen en ziet ver.",
      { armor:"ceremonieel", cape:"lang", capekleur:"rood", helm:"open" },
      { nm:["Het Trojaanse veldteken","The Trojan standard"], seek:["Het Trojaanse veldteken","the Trojan standard"], nom:["Het Trojaanse veldteken","The standard"],
        steps:[ _HE_K(12,"latium","campus"), _HE_C(3), _HE_B("boss_troia") ] },
      { nm:"Stichter", nl:"Founder", look:{ armor:"ceremonieel", capekleur:"goud", helm:"kroon" },
        leg:{ id:"imperium_sine_fine", la:"Heerschappij zonder einde", nl:"Rule without end: all towers +8% damage", fx:{ global:8 }, mv:_HE_BUFF } }),
    _HE_S("aeneas","pro","hopliet","Propugnator","Defender","Aeneas wordt een standvastige verdediger met een groot schild: veel levenspunten en verdediging.",
      { armor:"hopliet", cape:"kort", capekleur:"rood", helm:"hopliet", schild:"rond" },
      { nm:["Het nieuwe schild","A new shield"], seek:["Het nieuwe schild","a new shield"], nom:["Het nieuwe schild","The new shield"],
        steps:[ _HE_K(12,"latium","via"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"De plichtsgetrouwe", nl:"The dutiful one", look:{ armor:"ceremonieel", capekleur:"goud", schild:"tower" },
        leg:{ id:"scutum_pii", la:"Het schild van de plichtsgetrouwe", nl:"Shield of the dutiful one: +1 life after every wave and nearby towers +10% damage", fx:{ regen:1, aura:{ dmg:10, radius:1500 } }, mv:_HE_SHIELD } }) ]);

_HE_H("romulus", "🪄", "De augurstaf van Romulus", "The augur's staff of Romulus",
  { nm:["De augurstaf van Romulus","The augur's staff of Romulus"], seek:["mijn augurstaf","my augur's staff"], nom:["Mijn augurstaf","My augur's staff"],
    steps:[ _HE_K(8,"latium","campus"), _HE_F("latium","🪄","verloren augurstaf","Zoek de augurstaf!","Find the augur's staff in Latium."), _HE_B("boss_graecia") ] },
  [ _HE_S("romulus","rex","centurio","Koning","King","Romulus wordt koning: hij versterkt de torens om zich heen en verhoogt de beloning.",
      { armor:"ceremonieel", cape:"lang", capekleur:"paars", helm:"kroon" },
      { nm:["De laurierkroon","The laurel crown"], seek:["de laurierkroon","the laurel crown"], nom:["De laurierkroon","The laurel crown"],
        steps:[ _HE_K(12,"latium","via"), _HE_C(3), _HE_B("boss_troia") ] },
      { nm:"Quirinus", nl:"The deified one", look:{ armor:"ceremonieel", cape:"lang", capekleur:"goud", helm:"kroon" },
        leg:{ id:"auspicium_quirini", la:"Het voorteken van Quirinus", nl:"Omen of Quirinus: all towers +6% damage and +10% reward", fx:{ global:6, reward:10 }, mv:_HE_BUFF } }),
    _HE_S("romulus","bel","spartaan","Krijger","Warrior","Romulus wordt een felle krijger met veel aanvalskracht.",
      { armor:"zwaar", cape:"kort", capekleur:"rood", helm:"open" },
      { nm:["De speer van Mars","The spear of Mars"], seek:["de speer van Mars","the spear of Mars"], nom:["De speer van Mars","The spear of Mars"],
        steps:[ _HE_K(12,"latium","campus"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"Zoon van Mars", nl:"Son of Mars", look:{ armor:"kampioen", capekleur:"oranje", helm:"open" },
        leg:{ id:"hasta_martis", la:"De speer van Mars", nl:"The spear of Mars: every 3rd hit does double damage, +30% damage", fx:{ dmg:30, nth:{ n:3, mult:2 } }, mv:{ kind:"dmg", power:130, acc:90, pp:3, nl:"Speer van Mars (zware slag)" } } }) ]);

_HE_H("horatius", "⚔️", "Het zwaard van Horatius", "The sword of Horatius",
  { nm:["Het zwaard van Horatius","The sword of Horatius"], seek:["mijn zwaard","my sword"], nom:["Mijn zwaard","My sword"],
    steps:[ _HE_K(8,"latium","tiberis"), _HE_F("latium","⚔️","verloren zwaard","Zoek het zwaard!","Find the sword in Latium."), _HE_B("boss_troia") ] },
  [ _HE_S("horatius","cus","hopliet","Brugwachter","Bridge guard","Horatius wordt de onwrikbare brugwachter: veel levenspunten en verdediging.",
      { armor:"hopliet", cape:"kort", capekleur:"rood", helm:"hopliet", schild:"rond" },
      { nm:["De nieuwe brug","A new bridge"], seek:["een nieuwe brug","a new bridge"], nom:["De nieuwe brug","The new bridge"],
        steps:[ _HE_K(12,"latium","tiberis"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"Redder van de stad", nl:"Savior of the city", look:{ armor:"ceremonieel", capekleur:"goud", schild:"tower" },
        leg:{ id:"pons_defensus", la:"De verdedigde brug", nl:"The bridge defended: nearby towers +12% damage and +15% damage", fx:{ dmg:15, aura:{ dmg:12, radius:1800 } }, mv:_HE_SHIELD } }),
    _HE_S("horatius","pug","spartaan","Vechter","Fighter","Horatius vecht met beide handen: veel aanvalskracht.",
      { armor:"zwaar", cape:"kort", capekleur:"rood", helm:"open", wapen:"zwaard" },
      { nm:["Een sterke slag","A strong blow"], seek:["een sterke slag","a strong blow"], nom:["Een sterke slag","A strong blow"],
        steps:[ _HE_K(12,"latium","via"), _HE_C(3), _HE_B("boss_troia") ] },
      { nm:"Held van de Tiber", nl:"Hero of the Tiber", look:{ armor:"kampioen", capekleur:"blauw" },
        leg:{ id:"ictus_tiberis", la:"De slag van de Tiber", nl:"Blow of the Tiber: ignores half of the defense, +25% damage", fx:{ pierce:50, dmg:25 }, mv:{ kind:"dmg", power:125, acc:90, pp:3, pierce:50, nl:"Zware slag die de helft van de verdediging negeert" } } }) ]);

_HE_H("cloelia", "🐴", "De teugel van Cloelia", "The rein of Cloelia",
  { nm:["De teugel van Cloelia","The rein of Cloelia"], seek:["mijn teugel","my rein"], nom:["mijn teugel","My rein"],
    steps:[ _HE_K(8,"latium","tiberis"), _HE_F("latium","🐴","verloren teugel","Zoek de teugel!","Find the rein in Latium."), _HE_B("boss_graecia") ] },
  [ _HE_S("cloelia","eq","cavalerie","Ruiteres","Horsewoman","Cloelia wordt een ruiteres: zeer snel en sterk bij de eerste treffers.",
      { armor:"middel", cape:"lang", capekleur:"blauw", helm:"open" },
      { nm:["Het snelle paard","A fast horse"], seek:["een snel paard","a fast horse"], nom:["Het snelle paard","The fast horse"],
        steps:[ _HE_K(12,"latium","via"), _HE_C(3), _HE_B("boss_troia") ] },
      { nm:"Meesteres der ruiters", nl:"Mistress of the riders", look:{ armor:"ceremonieel", capekleur:"goud" },
        leg:{ id:"cursus_cloeliae", la:"De sprint van Cloelia", nl:"The dash of Cloelia: the first 3 hits of every wave do triple damage, +30% fire rate", fx:{ cd:30, charge:{ hits:3, mult:3 } }, mv:{ kind:"dmg", power:100, acc:95, pp:4, prio:1, nl:"Razendsnelle uitval (gaat eerst)" } } }),
    _HE_S("cloelia","exp","verkenner","Verkenster","Scout","Cloelia wordt een sluwe verkenster: zeer snel, vertraagt vijanden en ziet ver.",
      { armor:"licht", cape:"lang", capekleur:"groen", helm:"bandana" },
      { nm:["De geheime weg","A secret road"], seek:["een geheime weg","a secret road"], nom:["De geheime weg","The secret road"],
        steps:[ _HE_K(12,"latium","tiberis"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"De dapperste maagd", nl:"The bravest maiden", look:{ armor:"ceremonieel", capekleur:"goud" },
        leg:{ id:"natatio_cloeliae", la:"De zwemtocht van Cloelia", nl:"The swim of Cloelia: every 2nd hit slows by 40%, +25% range", fx:{ slow:{ pct:40, ticks:40, every:2 }, rng:25 }, mv:{ kind:"dmg", power:80, acc:100, pp:5, prio:1, slow:35, nl:"Snelle aanval die de vijand vertraagt (gaat eerst)" } } }) ]);

_HE_H("mucius", "🔥", "Het vuur van Mucius", "The fire of Mucius",
  { nm:["Het vuur van Mucius","The fire of Mucius"], seek:["het heilige vuur","the holy fire"], nom:["Heilig vuur","The holy fire"],
    steps:[ _HE_K(8,"latium","silva"), _HE_F("latium","🔥","sacred fire","Zoek het vuur!","Find the fire in Latium."), _HE_B("boss_troia") ] },
  [ _HE_S("mucius","ins","verkenner","Sluipmoordenaar","Assassin","Mucius wordt een sluipmoordenaar: zeer snel, vertraagt vijanden en slaat precies.",
      { armor:"licht", cape:"lang", capekleur:"paars", helm:"bandana" },
      { nm:["De dolk van de schaduw","The dagger of the shadow"], seek:["de dolk van de schaduw","the dagger of the shadow"], nom:["De dolk van de schaduw","The dagger of the shadow"],
        steps:[ _HE_K(12,"latium","silva"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"Meester-sluiper", nl:"Master sneak", look:{ armor:"middel", capekleur:"paars", helm:"bandana" },
        leg:{ id:"pugio_umbrae", la:"De dolk van de schaduw", nl:"The dagger of the shadow: ignores half of the defense, +30% damage", fx:{ dmg:30, pierce:50 }, mv:{ kind:"dmg", power:120, acc:95, pp:3, pierce:50, nl:"Dolksteek door het pantser" } } }),
    _HE_S("mucius","for","spartaan","De Standvastige","The Steadfast One","Mucius wordt een onverschrokken krijger met veel aanvalskracht.",
      { armor:"zwaar", cape:"kort", capekleur:"oranje", helm:"open" },
      { nm:["Het nieuwe vuur","New fire"], seek:["nieuw vuur","new fire"], nom:["Het nieuwe vuur","The new fire"],
        steps:[ _HE_K(12,"latium","campus"), _HE_C(3), _HE_B("boss_troia") ] },
      { nm:"De vurige hand", nl:"The fiery hand", look:{ armor:"kampioen", capekleur:"oranje" },
        leg:{ id:"dextra_ignea", la:"De vurige hand", nl:"The fiery hand: hits also strike enemies next to the target (60%), +25% damage", fx:{ splash:{ pct:60, radius:1200 }, dmg:25 }, mv:{ kind:"dmg", power:125, acc:90, pp:3, nl:"Vurige slag" } } }) ]);

_HE_H("camilla", "🏹", "De boog van Camilla", "The bow of Camilla",
  { nm:["De boog van Camilla","The bow of Camilla"], seek:["mijn boog","my bow"], nom:["Mijn boog","My bow"],
    steps:[ _HE_K(8,"latium","silva"), _HE_F("latium","🏹","verloren boog","Zoek de boog!","Find the bow in Latium."), _HE_B("boss_graecia") ] },
  [ _HE_S("camilla","sag","boogschutter","Sagittaria","Archer","Camilla wordt een meesterschutter: veel bereik en aanvalskracht.",
      { armor:"licht", cape:"lang", capekleur:"groen", helm:"bandana", wapen:"boog" },
      { nm:["De nieuwe pijlen","New arrows"], seek:["nieuwe pijlen","new arrows"], nom:["De nieuwe pijlen","The new arrows"],
        steps:[ _HE_K(12,"latium","silva"), _HE_C(3), _HE_B("boss_troia") ] },
      { nm:"Volscische maagd", nl:"Volscian maiden", look:{ armor:"middel", capekleur:"goud", wapen:"boog" },
        leg:{ id:"sagitta_volsca", la:"De Volscische pijl", nl:"Two arrows at once: every 2nd shot also hits a second enemy, +20% fire rate", fx:{ double:{ every:2 }, cd:20 }, mv:{ kind:"dmg", hits:2, power:65, acc:90, pp:4, nl:"Twee pijlen achter elkaar" } } }),
    _HE_S("camilla","eqs","cavalerie","Ruiteres","Horsewoman","Camilla schiet te paard: zeer snel en sterk bij de eerste treffers.",
      { armor:"middel", cape:"lang", capekleur:"groen", helm:"open", wapen:"boog" },
      { nm:["Het strijdros","A warhorse"], seek:["een strijdros","a warhorse"], nom:["Het strijdros","The warhorse"],
        steps:[ _HE_K(12,"latium","via"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"Koningin der strijdsters", nl:"Queen of the warrior women", look:{ armor:"ceremonieel", capekleur:"goud" },
        leg:{ id:"cursus_camillae", la:"De sprint van Camilla", nl:"The dash of Camilla: +30% fire rate and +20% damage", fx:{ cd:30, dmg:20 }, mv:{ kind:"dmg", power:100, acc:95, pp:4, prio:1, nl:"Snelle schot te paard (gaat eerst)" } } }) ]);

/* ----- Graecia ----- */
_HE_H("hercules", "🦁", "De leeuwenhuid", "The lion skin",
  { nm:["De leeuwenhuid","The lion skin"], seek:["de leeuwenhuid","the lion skin"], nom:["De leeuwenhuid","The lion skin"],
    steps:[ _HE_K(8,"graecia","olea"), _HE_F("graecia","🦁","leeuwenhuid","Zoek de leeuwenhuid!","Find the lion skin in Greece."), _HE_B("boss_graecia") ] },
  [ _HE_S("hercules","ath","spartaan","Atleet","Wrestler","Hercules wordt een geweldenaar met een knots: enorme aanvalskracht.",
      { armor:"zwaar", cape:"kort", capekleur:"oranje", wapen:"knuppel" },
      { nm:["De nieuwe knots","A new club"], seek:["een nieuwe knots","a new club"], nom:["De nieuwe knots","The new club"],
        steps:[ _HE_K(12,"graecia","litus"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"Telg van Alceus", nl:"Descendant of Alceus", look:{ armor:"kampioen", capekleur:"goud" },
        leg:{ id:"clava_herculis", la:"De knots van Hercules", nl:"The club of Hercules: every 3rd hit does triple damage, +35% damage", fx:{ dmg:35, nth:{ n:3, mult:3 } }, mv:{ kind:"dmg", power:140, acc:85, pp:3, nl:"Knots van Hercules (zeer zware slag)" } } }),
    _HE_S("hercules","sag","boogschutter","Boogschutter van Hercules","Archer of Hercules","Hercules schiet met Hydra-pijlen: veel bereik en aanvalskracht.",
      { armor:"middel", cape:"lang", capekleur:"oranje", helm:"geen", wapen:"boog" },
      { nm:["De Hydra-pijlen","The Hydra arrows"], seek:["de Hydra-pijlen","the Hydra arrows"], nom:["De Hydra-pijlen","The Hydra arrows"],
        steps:[ _HE_K(12,"graecia","olea"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"God", nl:"God", look:{ armor:"ceremonieel", cape:"engelenvleugels", capekleur:"goud" },
        leg:{ id:"sagitta_hydrae", la:"De Hydra-pijl", nl:"The Hydra arrow: pierces the armor, also hits enemies next to the target (40%)", fx:{ pierce:60, splash:{ pct:40, radius:900 } }, mv:{ kind:"dmg", power:120, acc:95, pp:3, pierce:50, nl:"Hydra-pijl door het pantser" } } }) ]);

_HE_H("perseus", "🪞", "Het spiegelschild van Perseus", "The mirror shield of Perseus",
  { nm:["Het spiegelschild van Perseus","The mirror shield of Perseus"], seek:["mijn spiegelschild","my mirror shield"], nom:["mijn spiegelschild","My mirror shield"],
    steps:[ _HE_K(8,"graecia","litus"), _HE_F("graecia","🪞","verloren spiegelschild","Zoek het spiegelschild!","Find the mirror shield in Greece."), _HE_B("boss_graecia") ] },
  [ _HE_S("perseus","eqa","cavalerie","Gevleugelde ruiter","Winged rider","Perseus vliegt met gevleugelde sandalen: zeer snel en sterk bij de eerste treffers.",
      { armor:"middel", cape:"engelenvleugels", helm:"open" },
      { nm:["De nieuwe vleugels","New wings"], seek:["nieuwe vleugels","new wings"], nom:["De nieuwe vleugels","The new wings"],
        steps:[ _HE_K(12,"graecia","litus"), _HE_C(3), _HE_B("boss_troia") ] },
      { nm:"Medusa-overwinnaar", nl:"Medusa slayer", look:{ armor:"ceremonieel", cape:"engelenvleugels", capekleur:"goud", schild:"rond" },
        leg:{ id:"ictus_alatus", la:"De gevleugelde slag", nl:"Winged blow: the first 2 hits do triple damage, ignores 40% of the defense", fx:{ cd:25, pierce:40, charge:{ hits:2, mult:3 } }, mv:{ kind:"dmg", power:110, acc:95, pp:4, prio:1, nl:"Duikaanval (gaat eerst)" } } }),
    _HE_S("perseus","ven","verkenner","Monsterjager","Monster hunter","Perseus jaagt met een spiegelschild: snel, vertraagt vijanden en ziet ver.",
      { armor:"licht", cape:"lang", capekleur:"groen", helm:"bandana", schild:"rond" },
      { nm:["De kop van Medusa","The head of Medusa"], seek:["De kop van Medusa","the head of Medusa"], nom:["De kop van Medusa","The head of Medusa"],
        steps:[ _HE_K(12,"graecia","olea"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"Overwinnaar van Medusa", nl:"Conqueror of Medusa", look:{ armor:"ceremonieel", capekleur:"goud", schild:"rond" },
        leg:{ id:"aspectus_medusae", la:"De blik van Medusa", nl:"The gaze of Medusa: every 2nd hit slows by 50%, +20% damage", fx:{ slow:{ pct:50, ticks:40, every:2 }, dmg:20 }, mv:{ kind:"dmg", power:90, acc:100, pp:4, slow:50, nl:"Blik die de vijand versteent (vertraagt)" } } }) ]);

_HE_H("theseus", "🧵", "Draad van Ariadne", "The thread of Ariadne",
  { nm:["Draad van Ariadne","The thread of Ariadne"], seek:["Draad van Ariadne","the thread of Ariadne"], nom:["Draad van Ariadne","The thread of Ariadne"],
    steps:[ _HE_K(8,"graecia","olea"), _HE_F("graecia","🧵","Ariadne's thread","Zoek de draad!","Find the thread in Greece."), _HE_B("boss_graecia") ] },
  [ _HE_S("theseus","vic","hopliet","Overwinnaar van het labyrint","Conqueror of the labyrinth","Theseus wordt een zware verdediger: veel levenspunten en verdediging.",
      { armor:"hopliet", cape:"kort", capekleur:"blauw", helm:"hopliet", schild:"rond" },
      { nm:["De hoorn van de Minotaurus","The horn of the Minotaur"], seek:["De hoorn van de Minotaurus","the horn of the Minotaur"], nom:["De hoorn van de Minotaurus","The horn of the Minotaur"],
        steps:[ _HE_K(12,"graecia","olea"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"Minotaurusdoder", nl:"Slayer of the Minotaur", look:{ armor:"ceremonieel", capekleur:"goud", helm:"hopliet", schild:"tower" },
        leg:{ id:"cornu_minotauri", la:"De hoorn van de Minotaurus", nl:"The horn of the Minotaur: nearby towers +10% damage, +25% damage", fx:{ dmg:25, aura:{ dmg:10, radius:1500 } }, mv:{ kind:"dmg", power:120, acc:90, pp:3, nl:"Hoornstoot (zware slag)" } } }),
    _HE_S("theseus","rex","centurio","Atheense koning","Athenian king","Theseus wordt koning van Athene: hij versterkt de torens om zich heen.",
      { armor:"ceremonieel", cape:"lang", capekleur:"paars", helm:"open" },
      { nm:["De scepter van de koning","The scepter of the king"], seek:["De scepter van de koning","the scepter of the king"], nom:["De scepter van de koning","The scepter"],
        steps:[ _HE_K(12,"graecia","litus"), _HE_C(3), _HE_B("boss_troia") ] },
      { nm:"Heer van Athene", nl:"Lord of Athens", look:{ armor:"ceremonieel", capekleur:"goud", helm:"kroon" },
        leg:{ id:"filum_ariadnae", la:"Draad van Ariadne", nl:"The thread of Ariadne: all towers +7% damage and nearby towers +10%", fx:{ global:7, aura:{ dmg:10, radius:2500 } }, mv:_HE_BUFF } }) ]);

_HE_H("atalanta", "🍎", "De gouden appel", "The golden apple",
  { nm:["de gouden appel","The golden apple"], seek:["de gouden appel","the golden apple"], nom:["de gouden appel","The golden apple"],
    steps:[ _HE_K(8,"graecia","olea"), _HE_F("graecia","🍎","gouden appel","Zoek de gouden appel!","Find the golden apple in Greece."), _HE_B("boss_graecia") ] },
  [ _HE_S("atalanta","sag","boogschutter","Sagittaria","Archer","Atalanta wordt een meesterschutter: veel bereik en aanvalskracht.",
      { armor:"licht", cape:"kort", capekleur:"groen", helm:"bandana", wapen:"boog" },
      { nm:["De pijl van Diana","The arrow of Diana"], seek:["de pijl van Diana","the arrow of Diana"], nom:["De pijl van Diana","The arrow of Diana"],
        steps:[ _HE_K(12,"graecia","olea"), _HE_C(3), _HE_B("boss_troia") ] },
      { nm:"Jageres van Diana", nl:"Huntress of Diana", look:{ armor:"middel", capekleur:"goud", wapen:"boog" },
        leg:{ id:"sagitta_dianae", la:"De pijl van Diana", nl:"The arrow of Diana: every 2nd shot also hits a second enemy, ignores half of the defense", fx:{ double:{ every:2 }, pierce:50 }, mv:{ kind:"dmg", hits:2, power:62, acc:95, pp:4, pierce:40, nl:"Twee pijlen door het pantser" } } }),
    _HE_S("atalanta","cur","verkenner","Loopster","Runner","Atalanta wordt de snelste loopster: zeer snel en vertraagt vijanden.",
      { armor:"vodden", cape:"geen", helm:"bandana" },
      { nm:["De snelle sandalen","Fast sandals"], seek:["snelle sandalen","fast sandals"], nom:["De snelle sandalen","The fast sandals"],
        steps:[ _HE_K(12,"graecia","litus"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"De snelste", nl:"The fastest", look:{ armor:"licht", capekleur:"goud" },
        leg:{ id:"pomum_aureum", la:"de gouden appel", nl:"The golden apple: every 2nd hit slows by 50%, +25% fire rate", fx:{ slow:{ pct:50, ticks:40, every:2 }, cd:25 }, mv:{ kind:"dmg", power:70, acc:100, pp:5, prio:1, slow:50, nl:"Gouden appel: de vijand vertraagt (gaat eerst)" } } }) ]);

_HE_H("iason", "⚓", "Het anker van de Argo", "The anchor of the Argo",
  { nm:["Het anker van de Argo","The anchor of the Argo"], seek:["het anker van de Argo","the anchor of the Argo"], nom:["Het anker van de Argo","The anchor of the Argo"],
    steps:[ _HE_K(8,"graecia","litus"), _HE_F("graecia","⚓","anker van de Argo","Zoek het anker!","Find the anchor in Greece."), _HE_B("boss_graecia") ] },
  [ _HE_S("iason","dra","hopliet","Drakendoder","Dragon slayer","Iason wordt een zware strijder: veel levenspunten en verdediging.",
      { armor:"hopliet", cape:"kort", capekleur:"goud", helm:"hopliet", schild:"rond" },
      { nm:["Het gouden vlies","The golden fleece"], seek:["Het gouden vlies","the golden fleece"], nom:["Het gouden vlies","The golden fleece"],
        steps:[ _HE_K(12,"graecia","olea"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"Heer van het gouden vlies", nl:"Lord of the golden fleece", look:{ armor:"ceremonieel", capekleur:"goud", schild:"tower" },
        leg:{ id:"vellus_aureum", la:"Het gouden vlies", nl:"The golden fleece: +30% damage and +1 life after every wave", fx:{ dmg:30, regen:1 }, mv:{ kind:"dmg", power:125, acc:90, pp:3, nl:"Slag met het gouden vlies" } } }),
    _HE_S("iason","arg","centurio","Argonaut","Argonaut","Iason wordt leider van de Argonauten: hij versterkt de torens om zich heen.",
      { armor:"middel", cape:"lang", capekleur:"blauw", helm:"open" },
      { nm:["Het nieuwe schip","A new ship"], seek:["een nieuw schip","a new ship"], nom:["Het nieuwe schip","The new ship"],
        steps:[ _HE_K(12,"graecia","litus"), _HE_C(3), _HE_B("boss_troia") ] },
      { nm:"Leider der Argonauten", nl:"Leader of the Argonauts", look:{ armor:"ceremonieel", capekleur:"goud", helm:"kroon" },
        leg:{ id:"remi_argus", la:"De riemen van de Argo", nl:"The oars of the Argo: all towers +8% damage and nearby towers +10%", fx:{ global:8, aura:{ dmg:10, radius:2500 } }, mv:_HE_BUFF } }) ]);

/* ----- Graecia: Medea (priester en myth) en Daedalus (genie en cavalerie) ----- */
_HE_H("medea", "🌿", "De Colchische kruiden", "The Colchian herbs",
  { nm:["De Colchische kruiden","The Colchian herbs"], seek:["de Colchische kruiden","the Colchian herbs"], nom:["De Colchische kruiden","The Colchian herbs"],
    steps:[ _HE_K(8,"graecia","olea"), _HE_F("graecia","🌿","Colchische kruiden","Zoek de kruiden!","Find the herbs in Greece."), _HE_B("boss_graecia") ] },
  [ _HE_S("medea","sac","priester","Priesteres van Hecate","Priestess of Hecate","Medea wordt priesteres: ze geneest en zegent, en versterkt alle torens.",
      { armor:"robe", cape:"lang", capekleur:"paars", helm:"geen", wapen:"staf" },
      { nm:["De fakkel van Hecate","The torch of Hecate"], seek:["de fakkel van Hecate","the torch of Hecate"], nom:["De fakkel van Hecate","The torch of Hecate"],
        steps:[ _HE_K(12,"graecia","olea"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"Meesteres van Hecate", nl:"Priestess of Hecate", look:{ armor:"ceremonieel", capekleur:"goud" },
        leg:{ id:"lux_hecates", la:"Het licht van Hecate", nl:"The light of Hecate: +1 life after every wave and all towers +4% damage", fx:{ regen:1, global:4 }, mv:{ kind:"heal", pp:3, nl:"Geneest 30% van je levenspunten" } } }),
    _HE_S("medea","ven","myth","Gifmengster","Poisoner","Medea wordt gifmengster: haar treffers vertragen en raken ook vijanden ernaast.",
      { armor:"robe", cape:"lang", capekleur:"groen", helm:"geen", wapen:"staf" },
      { nm:["Het nieuwe gif","A new poison"], seek:["Het nieuwe gif","a new poison"], nom:["Het nieuwe gif","The new poison"],
        steps:[ _HE_K(12,"graecia","litus"), _HE_C(3), _HE_B("boss_troia") ] },
      { nm:"Tovenares van Colchis", nl:"Sorceress of Colchis", look:{ armor:"ceremonieel", capekleur:"groen" },
        leg:{ id:"venenum_medeae", la:"Het gif van Medea", nl:"The poison of Medea: every 2nd hit slows by 40% and hits also strike enemies next to the target (50%)", fx:{ slow:{ pct:40, ticks:40, every:2 }, splash:{ pct:50, radius:1000 } }, mv:{ kind:"dmg", power:100, acc:95, pp:4, slow:40, nl:"Gifwolk die de vijand vertraagt" } } }) ]);

_HE_H("daedalus", "⚙️", "Het gereedschap van Daedalus", "The tools of Daedalus",
  { nm:["Het gereedschap van Daedalus","The tools of Daedalus"], seek:["mijn gereedschap","my tools"], nom:["mijn gereedschap","My tools"],
    steps:[ _HE_K(8,"graecia","litus"), _HE_F("graecia","⚙️","verloren gereedschap","Zoek het gereedschap!","Find the tools in Greece."), _HE_B("boss_graecia") ] },
  [ _HE_S("daedalus","mac","genie","Werktuigbouwer","Engineer","Daedalus wordt werktuigbouwer: zijn machines schieten ver en raken meerdere vijanden.",
      { armor:"licht", cape:"kort", capekleur:"oranje", helm:"open", wapen:"knuppel" },
      { nm:["De nieuwe machine","A new machine"], seek:["een nieuwe machine","a new machine"], nom:["De nieuwe machine","The new machine"],
        steps:[ _HE_K(12,"graecia","litus"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"Bouwer van het labyrint", nl:"Builder of the labyrinth", look:{ armor:"middel", capekleur:"goud", helm:"open" },
        leg:{ id:"machina_daedali", la:"De machine van Daedalus", nl:"The machine of Daedalus: ignores half of the defense and also hits enemies next to the target (40%)", fx:{ pierce:50, splash:{ pct:40, radius:1000 } }, mv:{ kind:"dmg", power:125, acc:90, pp:3, pierce:50, nl:"Machineschot door het pantser" } } }),
    _HE_S("daedalus","vol","cavalerie","Vlieger","Flyer","Daedalus vliegt op zelfgemaakte vleugels: zeer snel en sterk bij de eerste treffers.",
      { armor:"licht", cape:"engelenvleugels", capekleur:"goud", helm:"open" },
      { nm:["De vleugels van was","The wings of wax"], seek:["de vleugels van was","the wings of wax"], nom:["De vleugels van was","The wings of wax"],
        steps:[ _HE_K(12,"graecia","litus"), _HE_C(3), _HE_B("boss_troia") ] },
      { nm:"Heer van de lucht", nl:"Lord of the air", look:{ armor:"middel", cape:"engelenvleugels", capekleur:"goud" },
        leg:{ id:"volatus_daedali", la:"De vlucht van Daedalus", nl:"The flight of Daedalus: +30% fire rate and the first 3 hits do double damage", fx:{ cd:30, charge:{ hits:3, mult:2 } }, mv:{ kind:"dmg", power:105, acc:95, pp:4, prio:1, nl:"Duikvlucht (gaat eerst)" } } }) ]);

/* ----- Cassandra (priester en myth), Prometheus (genie en myth), Circe (myth en priester) ----- */
_HE_H("cassandra", "🌿", "De laurierkrans van Apollo", "The laurel wreath of Apollo",
  { nm:["De laurierkrans van Apollo","The laurel wreath of Apollo"], seek:["de laurierkrans van Apollo","the laurel wreath of Apollo"], nom:["De laurierkrans van Apollo","The laurel wreath of Apollo"],
    steps:[ _HE_K(8,"troia","muros"), _HE_F("troia","🌿","laurierkrans","Zoek de laurierkrans!","Find the laurel wreath in Troy."), _HE_B("boss_troia") ] },
  [ _HE_S("cassandra","sac","priester","Sacerdos Apollinis","Priestess of Apollo","Cassandra wordt priesteres van Apollo: ze geneest, zegent en versterkt alle torens.",
      { armor:"robe", cape:"lang", capekleur:"goud", helm:"geen", wapen:"staf" },
      { nm:["De gave van Apollo","The gift of Apollo"], seek:["De gave van Apollo","the gift of Apollo"], nom:["De gave van Apollo","The gift of Apollo"],
        steps:[ _HE_K(12,"troia","muros"), _HE_C(3), _HE_B("boss_troia") ] },
      { nm:"Profetes", nl:"Prophetess", look:{ armor:"ceremonieel", capekleur:"goud" },
        leg:{ id:"verba_apollinis", la:"De woorden van Apollo", nl:"The words of Apollo: +1 life after every wave and all towers +5% damage", fx:{ regen:1, global:5 }, mv:{ kind:"heal", pp:3, nl:"Geneest 30% van je levenspunten" } } }),
    _HE_S("cassandra","vat","myth","Waarzegster in vervoering","Prophetess in ecstasy","Cassandra ziet de toekomst: haar treffers vertragen vijanden en doen veel schade.",
      { armor:"robe", cape:"lang", capekleur:"paars", helm:"geen", wapen:"staf" },
      { nm:["Het ware visioen","The true vision"], seek:["het ware visioen","the true vision"], nom:["Het ware visioen","The true vision"],
        steps:[ _HE_K(12,"troia","scamander"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"Orakel", nl:"The oracle", look:{ armor:"ceremonieel", capekleur:"paars" },
        leg:{ id:"visio_cassandrae", la:"Visioen van Cassandra", nl:"The vision of Cassandra: every 2nd hit slows by 40%, +25% damage", fx:{ slow:{ pct:40, ticks:40, every:2 }, dmg:25 }, mv:{ kind:"dmg", power:105, acc:100, pp:4, slow:40, nl:"Visioen dat de vijand verlamt (vertraagt)" } } }) ]);

_HE_H("prometheus", "🔥", "Het vuur van Prometheus", "The fire of Prometheus",
  { nm:["Het vuur van Prometheus","The fire of Prometheus"], seek:["het hemelse vuur","the heavenly fire"], nom:["Het hemelse vuur","The heavenly fire"],
    steps:[ _HE_K(8,"graecia","litus"), _HE_F("graecia","🔥","hemels vuur","Zoek het vuur!","Find the fire in Greece."), _HE_B("boss_graecia") ] },
  [ _HE_S("prometheus","fab","genie","Vuursmid","Fire smith","Prometheus wordt vuursmid: zijn machines schieten ver en raken meerdere vijanden.",
      { armor:"vodden", cape:"geen", capekleur:"oranje", helm:"geen", wapen:"knuppel" },
      { nm:["De nieuwe smidse","A new forge"], seek:["een nieuwe smidse","a new forge"], nom:["De nieuwe smidse","The new forge"],
        steps:[ _HE_K(12,"graecia","litus"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"Titanische smid", nl:"Titanic smith", look:{ armor:"middel", capekleur:"oranje" },
        leg:{ id:"ignis_promethei", la:"Het vuur van Prometheus", nl:"The fire of Prometheus: hits also strike enemies next to the target (60%), +20% damage", fx:{ splash:{ pct:60, radius:1200 }, dmg:20 }, mv:{ kind:"dmg", power:115, acc:90, pp:3, nl:"Vuurstoot" } } }),
    _HE_S("prometheus","tit","myth","Titaan","Titan","Prometheus toont zijn titanenkracht: zware slagen die vijanden vertragen.",
      { armor:"zwaar", cape:"geen", capekleur:"oranje", helm:"geen", wapen:"knuppel" },
      { nm:["De verbroken ketenen","The broken chains"], seek:["verbroken ketenen","broken chains"], nom:["De verbroken ketenen","The broken chains"],
        steps:[ _HE_K(12,"graecia","olea"), _HE_C(3), _HE_B("boss_troia") ] },
      { nm:"Bevrijde Prometheus", nl:"Prometheus set free", look:{ armor:"kampioen", capekleur:"goud" },
        leg:{ id:"furor_titanum", la:"De woede van de Titanen", nl:"The rage of the Titans: +30% damage and every 3rd hit slows by 30%", fx:{ dmg:30, slow:{ pct:30, ticks:30, every:3 } }, mv:{ kind:"dmg", power:120, acc:90, pp:3, slow:30, nl:"Titanenslag (vertraagt)" } } }) ]);

_HE_H("circe", "🪄", "De toverstaf van Circe", "The wand of Circe",
  { nm:["De toverstaf van Circe","The wand of Circe"], seek:["mijn toverstaf","my wand"], nom:["Mijn toverstaf","My wand"],
    steps:[ _HE_K(8,"troia","litus"), _HE_F("troia","🪄","toverstaf","Zoek de toverstaf!","Find the wand in Troy."), _HE_B("boss_troia") ] },
  [ _HE_S("circe","mag","myth","Tovenares","Sorceress","Circe wordt tovenares: haar treffers vertragen en doen veel schade.",
      { armor:"robe", cape:"kort", capekleur:"groen", helm:"geen", wapen:"staf" },
      { nm:["De nieuwe toverdrank","A new potion"], seek:["een nieuwe toverdrank","a new potion"], nom:["De nieuwe toverdrank","The new potion"],
        steps:[ _HE_K(12,"troia","litus"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"Godin van Aeaea", nl:"Goddess of Aeaea", look:{ armor:"ceremonieel", capekleur:"groen" },
        leg:{ id:"metamorphosis", la:"Gedaanteverwisseling", nl:"Transformation: every 2nd hit slows by 50%, +20% damage", fx:{ slow:{ pct:50, ticks:40, every:2 }, dmg:20 }, mv:{ kind:"dmg", power:95, acc:100, pp:4, slow:50, nl:"Verandert de vijand in een zwijn (vertraagt)" } } }),
    _HE_S("circe","her","priester","Kruidenvrouw","Herbalist","Circe wordt kruidenvrouw: ze geneest en versterkt de torens om zich heen.",
      { armor:"robe", cape:"lang", capekleur:"blauw", helm:"geen", wapen:"staf" },
      { nm:["Het zeldzame kruid","The rare herb"], seek:["een zeldzaam kruid","a rare herb"], nom:["Het zeldzame kruid","The rare herb"],
        steps:[ _HE_K(12,"troia","scamander"), _HE_C(3), _HE_B("boss_troia") ] },
      { nm:"Meesteres der dieren", nl:"Mistress of the animals", look:{ armor:"ceremonieel", capekleur:"blauw" },
        leg:{ id:"cantus_circes", la:"Het lied van Circe", nl:"The song of Circe: +1 life after every wave and nearby towers +12% damage", fx:{ regen:1, aura:{ dmg:12, radius:2000 } }, mv:{ kind:"heal", pp:3, nl:"Geneest 30% van je levenspunten" } } }) ]);

/* ----- Troia ----- */
_HE_H("achilles", "⚔️", "De wapens van Vulcanus", "The weapons of Vulcan",
  { nm:["De wapens van Vulcanus","The weapons of Vulcan"], seek:["nieuwe wapens","new weapons"], nom:["nieuwe wapens","The new weapons"],
    steps:[ _HE_K(8,"troia","muros"), _HE_F("troia","⚔️","new weapons","Zoek de wapens!","Find the weapons in Troy."), _HE_B("boss_troia") ] },
  [ _HE_S("achilles","myr","spartaan","Held van de Myrmidonen","Hero of the Myrmidons","Achilles wordt een geweldige krijger: enorme aanvalskracht.",
      { armor:"zwaar", cape:"kort", capekleur:"rood", helm:"open", wapen:"speer" },
      { nm:["De speer van Peleus","The spear of Peleus"], seek:["de speer van Peleus","the spear of Peleus"], nom:["De speer van Peleus","The spear of Peleus"],
        steps:[ _HE_K(12,"troia","muros"), _HE_C(3), _HE_B("boss_troia") ] },
      { nm:"Zoon van Peleus", nl:"Son of Peleus", look:{ armor:"kampioen", capekleur:"goud", helm:"open", wapen:"speer" },
        leg:{ id:"ira_achillis", la:"De woede van Achilles", nl:"The rage of Achilles: every 4th hit does triple damage, +35% damage", fx:{ dmg:35, nth:{ n:4, mult:3 } }, mv:{ kind:"dmg", power:145, acc:85, pp:3, nl:"Woede van Achilles (zeer zware slag)" } } }),
    _HE_S("achilles","aur","cavalerie","Wagenmenner","Charioteer","Achilles rijdt in zijn strijdwagen: zeer snel en sterk bij de eerste treffers.",
      { armor:"middel", cape:"lang", capekleur:"rood", helm:"open" },
      { nm:["De strijdwagen van Achilles","The chariot of Achilles"], seek:["een strijdwagen","a chariot"], nom:["De strijdwagen","The chariot"],
        steps:[ _HE_K(12,"troia","scamander"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"Onoverwinnelijke", nl:"Invincible", look:{ armor:"ceremonieel", capekleur:"goud" },
        leg:{ id:"currus_achillis", la:"De strijdwagen van Achilles", nl:"The chariot of Achilles: the first 3 hits do triple damage, +30% fire rate", fx:{ cd:30, charge:{ hits:3, mult:3 } }, mv:{ kind:"dmg", power:110, acc:95, pp:4, prio:1, nl:"Aanval met de strijdwagen (gaat eerst)" } } }) ]);

_HE_H("hector", "⛑️", "De helm van Hector", "The helmet of Hector",
  { nm:["De helm van Hector","The helmet of Hector"], seek:["mijn helm","my helmet"], nom:["Mijn helm","My helmet"],
    steps:[ _HE_K(8,"troia","muros"), _HE_F("troia","⛑️","verloren helm","Zoek de helm!","Find the helmet in Troy."), _HE_B("boss_troia") ] },
  [ _HE_S("hector","def","hopliet","Verdediger van Troje","Defender of Troy","Hector wordt de verdediger van de stad: veel levenspunten en verdediging.",
      { armor:"hopliet", cape:"lang", capekleur:"blauw", helm:"hopliet", schild:"ovaal" },
      { nm:["De nieuwe muur","A new wall"], seek:["een nieuwe muur","a new wall"], nom:["De nieuwe muur","The new wall"],
        steps:[ _HE_K(12,"troia","muros"), _HE_C(3), _HE_B("boss_troia") ] },
      { nm:"De muur van Troje", nl:"The wall of Troy", look:{ armor:"ceremonieel", capekleur:"goud", schild:"tower" },
        leg:{ id:"murus_troiae", la:"De muur van Troje", nl:"The wall of Troy: +1 life after every wave, nearby towers +12% damage and +10% damage", fx:{ regen:1, aura:{ dmg:12, radius:2000 }, dmg:10 }, mv:_HE_SHIELD } }),
    _HE_S("hector","pat","priester","Gezinshoofd","Head of the family","Hector wordt een beschermende vader: hij geneest, zegent en versterkt alle torens.",
      { armor:"robe", cape:"lang", capekleur:"blauw", helm:"open" },
      { nm:["Mijn huisgoden","My household gods"], seek:["mijn huisgoden","my household gods"], nom:["Mijn huisgoden","My household gods"],
        steps:[ _HE_K(12,"troia","scamander"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"Prins van Troje", nl:"Prince of Troy", look:{ armor:"ceremonieel", capekleur:"paars", helm:"kroon" },
        leg:{ id:"tutela_familiae", la:"De bescherming van het gezin", nl:"The protection of the family: +1 life after every wave and all towers +5% damage", fx:{ regen:1, global:5 }, mv:{ kind:"heal", pp:3, nl:"Geneest 30% van je levenspunten" } } }) ]);

_HE_H("penthesilea", "🪓", "De strijdbijl van Mars", "The battle axe of Mars",
  { nm:["De strijdbijl van Mars","The battle axe of Mars"], seek:["mijn strijdbijl","my battle axe"], nom:["Mijn strijdbijl","My battle axe"],
    steps:[ _HE_K(8,"troia","scamander"), _HE_F("troia","🪓","verloren strijdbijl","Zoek de strijdbijl!","Find the battle axe in Troy."), _HE_B("boss_troia") ] },
  [ _HE_S("penthesilea","bip","spartaan","Bijldraagster","Axe bearer","Penthesilea zwaait een dubbele bijl: enorme aanvalskracht.",
      { armor:"zwaar", cape:"lang", capekleur:"paars", helm:"open", wapen:"zwaard" },
      { nm:["De nieuwe bijl","A new axe"], seek:["een nieuwe bijl","a new axe"], nom:["De nieuwe bijl","The new axe"],
        steps:[ _HE_K(12,"troia","muros"), _HE_C(3), _HE_B("boss_troia") ] },
      { nm:"Koningin der Amazones", nl:"Queen of the Amazons", look:{ armor:"kampioen", capekleur:"goud", helm:"kroon" },
        leg:{ id:"securis_reginae", la:"De bijl van de koningin", nl:"The axe of the queen: ignores 40% of the defense, +30% damage", fx:{ dmg:30, pierce:40 }, mv:{ kind:"dmg", power:130, acc:90, pp:3, pierce:40, nl:"Slag met de dubbele bijl" } } }),
    _HE_S("penthesilea","eqa","cavalerie","Amazone te paard","Amazon on horseback","Penthesilea rijdt en schiet: zeer snel en sterk bij de eerste treffers.",
      { armor:"middel", cape:"lang", capekleur:"paars", helm:"open", wapen:"boog" },
      { nm:["Het witte paard","A white horse"], seek:["een wit paard","a white horse"], nom:["Het witte paard","The white horse"],
        steps:[ _HE_K(12,"troia","scamander"), _HE_C(3), _HE_B("boss_graecia") ] },
      { nm:"Dochter van Mars", nl:"Daughter of Mars", look:{ armor:"ceremonieel", capekleur:"goud" },
        leg:{ id:"furor_amazonum", la:"De woede van de Amazones", nl:"The rage of the Amazons: +30% fire rate and +25% damage", fx:{ cd:30, dmg:25 }, mv:{ kind:"dmg", power:115, acc:95, pp:4, prio:1, nl:"Razende aanval te paard (gaat eerst)" } } }) ]);

/* ----- Ulixes krijgt een derde tak: Machinator (genie), met het Trojaanse paard ----- */
CASTRA_HERO_EVO.ulixes.specs.push(
  _HE_S("ulixes","mac","genie","Werktuigbouwer","Engineer","Odysseus bouwt het Trojaanse paard: zijn machines schieten ver en raken meerdere vijanden.",
    { armor:"middel", cape:"lang", capekleur:"oranje", helm:"open", wapen:"knuppel" },
    { nm:["Het houten paard","The wooden horse"], seek:["het houten paard","the wooden horse"], nom:["Het houten paard","The wooden horse"],
      steps:[ _HE_K(12,"troia","muros"), _HE_C(3), _HE_B("boss_troia") ] },
    { nm:"Bouwer van het paard", nl:"Builder of the horse", look:{ armor:"ceremonieel", capekleur:"oranje", helm:"open" },
      leg:{ id:"equus_troianus", la:"Het Trojaanse paard", nl:"The Trojan horse: +20% range and hits also strike enemies next to the target (50%)", fx:{ rng:20, splash:{ pct:50, radius:1000 } }, mv:{ kind:"dmg", power:120, acc:90, pp:3, nl:"Verrassingsaanval uit het paard" } } }));
castraHeroEvoRegisterClasses("ulixes"); castraHeroEvoRegisterQuests("ulixes");

/* ----- verhaal-arte per held (vanaf level 1, blijft na evolutie) ----- */
Object.assign(CASTRA_HERO_SIG, {
  aeneas:     { id:"pietas_aeneae", la:"Het plichtsbesef van Aeneas", nl:"Pietas (sense of duty): +1 life after every wave, nearby towers +6% damage", lvl:1, fx:{ regen:1, aura:{ dmg:6, radius:1500 } }, mv:_HE_SHIELD },
  romulus:    { id:"lupae_auxilium", la:"De hulp van de wolvin", nl:"Help of the she-wolf: +10% damage", lvl:1, fx:{ dmg:10 }, mv:_HE_BUFF },
  horatius:   { id:"pons_sublicius", la:"De Sublicische brug", nl:"He holds the bridge: every 3rd hit slows by 30%, nearby towers +8%", lvl:1, fx:{ slow:{ pct:30, ticks:30, every:3 }, aura:{ dmg:8, radius:1500 } }, mv:{ kind:"dmg", power:55, acc:100, pp:6, slow:30, nl:"Slag die de vijand tegenhoudt (vertraagt)" } },
  cloelia:    { id:"fuga_cloeliae", la:"De vlucht van Cloelia", nl:"The flight of Cloelia: +10% fire rate, every 3rd hit slows by 25%", lvl:1, fx:{ cd:10, slow:{ pct:25, ticks:30, every:3 } }, mv:{ kind:"dmg", power:50, acc:100, pp:6, prio:1, nl:"Snelle uitval (gaat eerst)" } },
  mucius:     { id:"dextra_constans", la:"De standvastige hand", nl:"The steadfast hand: +10% damage, every 4th hit double damage", lvl:1, fx:{ dmg:10, nth:{ n:4, mult:2 } }, mv:{ kind:"dmg", power:75, acc:90, pp:5, nl:"Onverschrokken slag" } },
  camilla:    { id:"pes_levis", la:"De lichte voet", nl:"The light foot: +10% fire rate", lvl:1, fx:{ cd:10 }, mv:{ kind:"dmg", power:50, acc:100, pp:6, prio:1, nl:"Snel schot (gaat eerst)" } },
  hercules:   { id:"labor_primus", la:"De eerste arbeid", nl:"The first labor: +12% damage", lvl:1, fx:{ dmg:12 }, mv:{ kind:"dmg", power:78, acc:90, pp:5, nl:"Arbeid van Hercules (zware slag)" } },
  perseus:    { id:"talaria", la:"De gevleugelde sandalen", nl:"Winged sandals: +10% fire rate, the first 2 hits do double damage", lvl:1, fx:{ cd:10, charge:{ hits:2, mult:2 } }, mv:{ kind:"dmg", power:62, acc:95, pp:5, prio:1, nl:"Duikvlucht (gaat eerst)" } },
  theseus:    { id:"labyrinthus", la:"Het labyrint", nl:"The labyrinth: every 3rd hit slows by 30%", lvl:1, fx:{ slow:{ pct:30, ticks:30, every:3 } }, mv:{ kind:"dmg", power:55, acc:100, pp:6, slow:30, nl:"Aanval die de vijand laat verdwalen (vertraagt)" } },
  atalanta:   { id:"cursus_atalantae", la:"De loop van Atalanta", nl:"Fast runner: +10% fire rate and +10% range", lvl:1, fx:{ cd:10, rng:10 }, mv:{ kind:"dmg", power:52, acc:100, pp:6, prio:1, nl:"Snel schot (gaat eerst)" } },
  iason:      { id:"argonautae", la:"De Argonauten", nl:"The Argonauts help: all towers +3% damage", lvl:1, fx:{ global:3 }, mv:_HE_BUFF },
  medea:      { id:"herbae_medicae", la:"De geneeskrachtige kruiden", nl:"Healing herbs: +1 life after every wave, nearby towers +5% damage", lvl:1, fx:{ regen:1, aura:{ dmg:5, radius:1500 } }, mv:{ kind:"heal", pp:4, nl:"Geneest 30% van je levenspunten" } },
  daedalus:   { id:"ars_daedali", la:"De kunst van Daedalus", nl:"The art of Daedalus: +10% range and +8% damage", lvl:1, fx:{ rng:10, dmg:8 }, mv:{ kind:"dmg", power:60, acc:100, pp:6, nl:"Precisieschot" } },
  cassandra:  { id:"praesagium", la:"De voorspelling", nl:"Prophecy: all towers +3% damage and +8% range", lvl:1, fx:{ global:3, rng:8 }, mv:_HE_BUFF },
  prometheus: { id:"ignis_furtivus", la:"Het gestolen vuur", nl:"The stolen fire: +10% damage and hits also strike enemies next to the target (30%)", lvl:1, fx:{ dmg:10, splash:{ pct:30, radius:800 } }, mv:{ kind:"dmg", power:65, acc:95, pp:6, nl:"Vuurspat" } },
  circe:      { id:"pocula_circes", la:"De bekers van Circe", nl:"The cups of Circe: every 3rd hit slows by 30% and +8% damage", lvl:1, fx:{ slow:{ pct:30, ticks:30, every:3 }, dmg:8 }, mv:{ kind:"dmg", power:55, acc:100, pp:6, slow:30, nl:"Beker die de vijand vertraagt" } },
  ulixes:     { id:"dolus_ulixis", la:"De list van Odysseus", nl:"The trick of Odysseus: every 2nd hit slows by 25%", lvl:1, fx:{ slow:{ pct:25, ticks:30, every:2 } }, mv:{ kind:"dmg", power:50, acc:100, pp:6, prio:1, slow:25, nl:"List die de vijand vertraagt (gaat eerst)" } },
  achilles:   { id:"furor_pelidae", la:"De woede van Achilles", nl:"The rage of Achilles: +12% damage, every 4th hit double damage", lvl:1, fx:{ dmg:12, nth:{ n:4, mult:2 } }, mv:{ kind:"dmg", power:80, acc:90, pp:5, nl:"Woede (zware slag)" } },
  hector:     { id:"defensor_patriae", la:"De verdediger van het vaderland", nl:"Defender of the fatherland: +1 life after every wave", lvl:1, fx:{ regen:1 }, mv:_HE_SHIELD },
  penthesilea:{ id:"sagitta_amazonum", la:"De pijl van de Amazones", nl:"Amazon arrow: ignores 30% of the defense, +10% fire rate", lvl:1, fx:{ pierce:30, cd:10 }, mv:{ kind:"dmg", power:68, acc:95, pp:6, pierce:30, nl:"Pijl die het pantser deels negeert" } },
});
// Basisklasse per held: de verhaal-arte + de zes gewone artes van het type. Daarna opnieuw de evolutieklassen bouwen (met de verhaal-arte erin).
Object.keys(CASTRA_HERO_SIG).forEach(id=>{
  const d = CASTRA_HERO_DATA[id]; if(!d) return;
  const base = CASTRA_SKILLS[CASTRA_HERO_CLASS[(d._b||d).type]] || [];
  CASTRA_SKILLS[id+"_base"] = [ { ...CASTRA_HERO_SIG[id], signature:true } ].concat(base);
  d.cls = id+"_base";
  castraHeroEvoRegisterClasses(id);
});
// Woordenboekje voor de nieuwe quests (alleen woorden die nog niet in CASTRA_GLOSS staan).
(function(add){ Object.keys(add).forEach(k=>{ if(!CASTRA_GLOSS[k]) CASTRA_GLOSS[k] = add[k]; }); })({
  "alae":"vleugels", "alas":"wings (accusative)", "albus":"wit", "album":"wit", "ancora":"anker", "ancoram":"anchor (accusative)", "argus":"the Argo", "ariadnae":"of Ariadne", "arma":"wapens",
  "bellicum":"of war, battle-", "bellicus":"of war, battle-", "bipennem":"battle axe (accusative)", "bipennis":"strijdbijl", "calcei":"sandalen", "calceos":"sandals (accusative)",
  "clara":"duidelijk", "clava":"knots", "clavam":"club (accusative)", "currum":"chariot (accusative)", "dianae":"of Diana", "exercitum":"army (accusative)", "exercitus":"leger",
  "hasta":"speer", "hastam":"spear (accusative)", "hydrae":"of the Hydra", "ictum":"blow (accusative)", "laureae":"of laurel", "leonis":"of the lion", "lituum":"augur's staff (accusative)",
  "lituus":"augurstaf", "minotauri":"of the Minotaur", "novae":"nieuwe", "pelii":"of Peleus", "pellem":"skin (accusative)", "pomum":"appel", "pugio":"dolk", "pugionem":"dagger (accusative)",
  "regis":"of the king", "sceptrum":"scepter", "scutum":"schild", "secreta":"geheime", "secretam":"geheime", "securim":"axe (accusative)", "securis":"bijl", "signum":"veldteken",
  "speculum":"spiegel", "troianum":"Trojan", "umbrae":"of the shadow",
  "carcerem":"prison (accusative)", "cera":"wax (beeswax)", "ceratae":"made of wax", "ceratas":"made of wax", "colchicae":"from Colchis", "colchicas":"from Colchis", "daedalus":"Daedalus (the builder)",
  "facem":"torch (accusative)", "fax":"fakkel", "ferro":"of iron", "fugere":"vluchten", "hecate":"Hecate (goddess of magic)", "hecates":"of Hecate", "herbae":"kruiden", "herbas":"herbs (accusative)",
  "iasoni":"to Jason", "icarum":"Icarus (accusative)", "ingenium":"vernuft", "instrumenta":"gereedschap", "legit":"verzamelt", "lego":"I collect", "libera":"vrij", "ligno":"of wood",
  "machina":"machine", "machinam":"machine (accusative)", "machinas":"machines", "medeae":"of Medea", "minerva":"Minerva", "minoem":"Minos (accusative)", "minoi":"for Minos", "minos":"Minos (king of Crete)",
  "pennis":"veren", "credit":"gelooft", "apollo":"Apollo", "mars":"Mars", "paris":"Paris", "lupos":"wolven", "liberum":"vrij", "sues":"zwijnen", "muto":"I change", "insula":"eiland", "aeaea":"Aeaea", "quos":"who (plural)", "mutat":"verandert", "matres":"moeders", "pueros":"jongens", "timet":"is afraid", "prometheus":"Prometheus", "hominibus":"to the people", "dedi":"I gave", "iovi":"to Jupiter", "resisto":"I resist", "iuppiter":"Jupiter", "punit":"straft", "iovem":"Jupiter (accusative)", "de":"from, of", "furatus":"gestolen", "luto":"klei", "feci":"I have made", "auro":"goud", "aquila":"adelaar", "iecur":"lever", "liberat":"bevrijdt", "prometheum":"Prometheus (accusative)", "praesagium":"voorspelling", "laurus":"laurierkrans", "laurum":"laurel wreath (accusative)", "apollinis":"of Apollo", "donum":"gave", "visio":"visioen", "visionem":"vision (accusative)", "veram":"ware", "vera":"ware", "fornax":"smidse", "fornacem":"forge (accusative)", "catenae":"ketenen", "catenas":"chains (accusative)", "ruptae":"verbroken", "ruptas":"verbroken", "ignis":"vuur", "ignem":"fire (accusative)", "caelestem":"hemels", "caelestis":"hemels", "virga":"toverstaf", "virgam":"wand (accusative)", "potio":"toverdrank", "potionem":"potion (accusative)", "herba":"kruid", "herbam":"herb (accusative)", "rara":"zeldzaam", "raram":"zeldzaam", "promethei":"of Prometheus", "circes":"of Circe", "periculum":"gevaar", "tuti":"veilig", "credo":"I believe", "credisne":"do you believe", "non":"niet", "rideo":"I laugh", "pocula":"bekers", "furtivus":"gestolen", "metamorphosis":"gedaanteverwisseling", "cantus":"lied", "verba":"woorden", "furor":"woede", "titanum":"of the Titans", "penates":"huisgoden", "mei":"mijn", "familias":"gezin", "pater":"vader", "tutela":"bescherming", "familiae":"of the family", "domina":"meesteres", "lux":"licht", "venefica":"gifmengster", "maga":"tovenares", "colchica":"from Colchis", "machinator":"werktuigbouwer", "architectus":"bouwer", "labyrinthi":"of the labyrinth", "daedali":"of Daedalus", "volator":"vlieger", "dominus":"heer", "aeris":"of the air", "volatus":"vlucht", "equum":"horse (accusative)", "ligneum":"houten", "ligneus":"houten", "equi":"of the horse", "qua":"welke", "re":"thing, matter", "venena":"gif", "venenum":"gif" });

// Heldenmenu en evolutie gebruiken de heldendata, dus meteen opnieuw toepassen op reeds geladen helden.
try{ if(typeof castraHeroEvoApplyAll==="function") castraHeroEvoApplyAll(); }catch(e){}
