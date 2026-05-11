"use strict";

const REGIONS = [
  {
    id: "napa",
    name: "Napa Valley",
    blurb: "Premium tourists and expensive land. Easier prestige, harder payroll.",
    tags: ["Prestige +10", "Costs +15%", "Heat risk"],
    cash: 125000,
    prestige: 24,
    demand: 58,
    costMod: 1.10,
    weather: { heat: 1.35, frost: 0.55, rain: 0.75, drought: 1.1 },
    varietals: ["cabernet", "chardonnay", "pinot"]
  },
  {
    id: "bordeaux",
    name: "Bordeaux",
    blurb: "Old-world credibility, strict appellation politics, patient buyers.",
    tags: ["Influence +8", "Aging bonus", "Regulation"],
    cash: 105000,
    prestige: 28,
    demand: 48,
    costMod: 1,
    influence: 8,
    weather: { heat: 0.85, frost: 0.9, rain: 1.25, drought: 0.75 },
    varietals: ["cabernet", "merlot", "sauvignon"]
  },
  {
    id: "mendoza",
    name: "Mendoza",
    blurb: "Cheap expansion, bold fruit, and drought planning every year.",
    tags: ["Land cheap", "Yield +15%", "Drought risk"],
    cash: 98000,
    prestige: 16,
    demand: 45,
    costMod: 0.88,
    yieldMod: 1.15,
    weather: { heat: 1.05, frost: 0.45, rain: 0.45, drought: 1.55 },
    varietals: ["malbec", "cabernet", "chardonnay"]
  },
  {
    id: "mosel",
    name: "Mosel",
    blurb: "Steep slopes, brilliant whites, fragile harvests, cult collectors.",
    tags: ["Quality ceiling", "Frost risk", "Low yield"],
    cash: 90000,
    prestige: 22,
    demand: 42,
    costMod: 0.96,
    yieldMod: 0.82,
    qualityMod: 1.14,
    weather: { heat: 0.65, frost: 1.45, rain: 1.05, drought: 0.65 },
    varietals: ["riesling", "pinot", "chardonnay"]
  },
  {
    id: "burgundy",
    name: "Burgundy",
    blurb: "The prestige ceiling is exceptional, but land is expensive, appellation rules demand barrel aging, and buyers want patience.",
    tags: ["Prestige ceiling", "Barrel required", "High cost"],
    cash: 110000,
    prestige: 32,
    demand: 50,
    costMod: 1.18,
    qualityMod: 1.22,
    weather: { heat: 0.7, frost: 1.3, rain: 1.15, drought: 0.55 },
    varietals: ["pinot", "chardonnay", "gamay"]
  },
  {
    id: "barossa",
    name: "Barossa Valley",
    blurb: "Rich shiraz country with heat, drought cycles, export appetite, and a direct path to volume-based revenue.",
    tags: ["High yield", "Export demand", "Drought risk"],
    cash: 108000,
    prestige: 14,
    demand: 64,
    costMod: 0.90,
    yieldMod: 1.22,
    weather: { heat: 1.45, frost: 0.25, rain: 0.5, drought: 1.55 },
    varietals: ["shiraz", "cabernet", "chardonnay"]
  },
  {
    id: "piedmont",
    name: "Piedmont",
    blurb: "Fog-shrouded Langhe hills where Nebbiolo demands patience but builds the most durable reputations in the trade.",
    tags: ["Prestige ceiling", "Long aging", "Frost & fog risk"],
    cash: 92000,
    prestige: 30,
    demand: 34,
    costMod: 1.12,
    yieldMod: 0.88,
    qualityMod: 1.18,
    influence: 7,
    weather: { heat: 0.68, frost: 1.3, rain: 1.05, drought: 0.58 },
    varietals: ["nebbiolo", "pinot", "chardonnay"]
  },
  {
    id: "rioja",
    name: "Rioja",
    blurb: "Spain's temperate wine heartland: reliable sun, drought-hardy Tempranillo, accessible costs, and a loyal export market.",
    tags: ["Accessible costs", "Export demand", "Drought resilient"],
    cash: 102000,
    prestige: 20,
    demand: 52,
    costMod: 0.91,
    yieldMod: 1.06,
    weather: { heat: 1.12, frost: 0.58, rain: 0.62, drought: 1.22 },
    varietals: ["tempranillo", "malbec", "cabernet"]
  },
  {
    id: "fingerlakes",
    name: "Finger Lakes",
    blurb: "Cool-climate lake country where Riesling shines and Cab Franc can build a nimble regional following.",
    tags: ["Cool climate", "Frost risk", "Wine trail"],
    cash: 96000,
    prestige: 18,
    demand: 44,
    costMod: 0.93,
    yieldMod: 0.9,
    qualityMod: 1.08,
    weather: { heat: 0.58, frost: 1.55, rain: 1.12, drought: 0.62 },
    varietals: ["riesling", "cabfranc"]
  }
];

const VARIETALS = {
  shiraz: {
    name: "Shiraz",
    tags: ["Heat tolerant", "Export appeal"],
    yield: 1.15,
    quality: 1.02,
    demand: 1.06,
    difficulty: 0.88,
    barrelNeed: 1.0,
    diseaseRisk: 0.7,
    droughtSensitivity: 0.5,
    optimalWater: 35,
    blurb: "Heat-tolerant, generous, and popular with export brokers. Strong cellar conversion."
  },
  cabernet: {
    name: "Cabernet Sauvignon",
    tags: ["Ages well", "Premium red"],
    yield: 0.95,
    quality: 1.08,
    demand: 1.08,
    difficulty: 1.1,
    barrelNeed: 1.2,
    diseaseRisk: 0.8,
    droughtSensitivity: 0.6,
    optimalWater: 38,
    blurb: "High price ceiling, slower to charm buyers, strong in warm regions."
  },
  cabfranc: {
    name: "Cabernet Franc",
    tags: ["Cool-climate red", "Aromatic"],
    yield: 0.92,
    quality: 1.07,
    demand: 0.98,
    difficulty: 1.05,
    barrelNeed: 0.75,
    diseaseRisk: 1.05,
    droughtSensitivity: 0.85,
    optimalWater: 48,
    blurb: "Lighter, aromatic, and resilient in cool sites, with loyal restaurant appeal."
  },
  chardonnay: {
    name: "Chardonnay",
    tags: ["Flexible", "Quick cash"],
    yield: 1.08,
    quality: 0.98,
    demand: 1.03,
    difficulty: 0.85,
    barrelNeed: 0.7,
    diseaseRisk: 1.1,
    droughtSensitivity: 1.0,
    optimalWater: 52,
    blurb: "Forgiving grape with broad demand and modest prestige upside."
  },
  pinot: {
    name: "Pinot Noir",
    tags: ["Fussy", "Cult demand"],
    yield: 0.82,
    quality: 1.18,
    demand: 1.1,
    difficulty: 1.35,
    barrelNeed: 0.9,
    diseaseRisk: 1.4,
    droughtSensitivity: 1.2,
    optimalWater: 55,
    blurb: "Temperamental, fragile, and capable of a devoted following."
  },
  merlot: {
    name: "Merlot",
    tags: ["Reliable", "Blending"],
    yield: 1.05,
    quality: 1,
    demand: 0.98,
    difficulty: 0.9,
    barrelNeed: 0.9,
    diseaseRisk: 1.0,
    droughtSensitivity: 0.9,
    optimalWater: 45,
    blurb: "A steady commercial grape that cushions bad seasons."
  },
  sauvignon: {
    name: "Sauvignon Blanc",
    tags: ["Fresh", "No oak"],
    yield: 1.15,
    quality: 0.94,
    demand: 1,
    difficulty: 0.8,
    barrelNeed: 0.35,
    diseaseRisk: 1.2,
    droughtSensitivity: 1.0,
    optimalWater: 55,
    blurb: "Fast bottle turns and low barrel dependence."
  },
  riesling: {
    name: "Riesling",
    tags: ["Collectors", "Weather sensitive"],
    yield: 0.86,
    quality: 1.16,
    demand: 0.96,
    difficulty: 1.2,
    barrelNeed: 0.25,
    diseaseRisk: 1.3,
    droughtSensitivity: 1.3,
    optimalWater: 60,
    blurb: "Low oak needs and high quality, but storms can wreck the story."
  },
  malbec: {
    name: "Malbec",
    tags: ["Bold", "Value premium"],
    yield: 1.12,
    quality: 1.03,
    demand: 1.04,
    difficulty: 0.92,
    barrelNeed: 0.85,
    diseaseRisk: 0.85,
    droughtSensitivity: 0.55,
    optimalWater: 38,
    blurb: "Generous yield and strong supermarket appeal."
  },
  gamay: {
    name: "Gamay",
    tags: ["Early drinking", "Light"],
    yield: 1.1,
    quality: 1.0,
    demand: 1.02,
    difficulty: 0.82,
    barrelNeed: 0.3,
    diseaseRisk: 0.9,
    droughtSensitivity: 0.85,
    optimalWater: 50,
    blurb: "Light, fruity, and quick to market. Low oak needs and reliable yield, but little prestige upside."
  },
  nebbiolo: {
    name: "Nebbiolo",
    tags: ["Long aging", "Prestige ceiling"],
    yield: 0.74,
    quality: 1.24,
    demand: 0.9,
    difficulty: 1.48,
    barrelNeed: 1.45,
    diseaseRisk: 1.05,
    droughtSensitivity: 0.9,
    optimalWater: 46,
    blurb: "Uncompromising: demands long barrel time and a patient market, but delivers the highest prestige ceiling in the cellar."
  },
  tempranillo: {
    name: "Tempranillo",
    tags: ["Heat tolerant", "Age worthy"],
    yield: 1.06,
    quality: 1.06,
    demand: 1.04,
    difficulty: 0.94,
    barrelNeed: 0.95,
    diseaseRisk: 0.82,
    droughtSensitivity: 0.62,
    optimalWater: 42,
    blurb: "Spain's signature red, reliable in heat, graceful with age, and easy to sell at a fair price."
  }
};

const PHILOSOPHIES = [
  {
    id: "natural",
    name: "Natural",
    blurb: "Low intervention, high buzz, fragile operations.",
    tags: ["Prestige swing", "Sulfite scrutiny", "Lower yield"],
    yield: 0.86,
    quality: 1.13,
    demand: 1.08,
    cost: 1.05,
    risk: 1.25,
    sustainability: 18
  },
  {
    id: "classic",
    name: "Classic Estate",
    blurb: "Balanced cellar discipline with estate reputation.",
    tags: ["Stable", "Aging", "Moderate costs"],
    yield: 1,
    quality: 1.03,
    demand: 1,
    cost: 1,
    risk: 1,
    sustainability: 6
  },
  {
    id: "industrial",
    name: "Scaled Commercial",
    blurb: "Efficiency, predictable supply, and tougher brand storytelling.",
    tags: ["Yield +18%", "Costs -8%", "Prestige slower"],
    yield: 1.18,
    quality: 0.9,
    demand: 0.96,
    cost: 0.92,
    risk: 0.82,
    sustainability: -8
  }
];

const DIFFICULTIES = [
  {
    id: "village",
    name: "Village Table",
    blurb: "Forgiving cashflow and cheaper mistakes while learning the estate.",
    tags: ["More cash", "Lower rent", "Gentler markets"],
    cashMod: 1.18,
    debt: 15000,
    creditLine: 220000,
    rent: 4200,
    rows: 4,
    inventoryMod: 1.15,
    demandMod: 1.06,
    eventMod: 0.86,
    costMod: 0.92,
    winNetWorth: 360000
  },
  {
    id: "estate",
    name: "Estate",
    blurb: "A tighter winery business with real debt, rent, and seasonal pressure.",
    tags: ["Balanced", "Debt pressure", "Seasonal"],
    cashMod: 0.82,
    debt: 55000,
    creditLine: 180000,
    rent: 7600,
    rows: 3,
    inventoryMod: 0.78,
    demandMod: 0.94,
    eventMod: 1,
    costMod: 1,
    winNetWorth: 380000
  },
  {
    id: "grand",
    name: "Grand Cru",
    blurb: "Hard mode: thin liquidity, expensive leases, nervous creditors, and brutal variance.",
    tags: ["Hard", "High rent", "Low inventory"],
    cashMod: 0.70,
    debt: 95000,
    creditLine: 145000,
    rent: 9000,
    rows: 2,
    inventoryMod: 0.55,
    demandMod: 0.86,
    eventMod: 1.22,
    costMod: 1.12,
    winNetWorth: 440000
  }
];

const SUGGESTED_STARTS = [
  {
    label: "Easy",
    title: "Barossa Shiraz",
    description: "High yield, heat-tolerant fruit, strong export demand. Forgiving cashflow and no long aging required.",
    region: "barossa",
    varietal: "shiraz",
    philosophy: "classic",
    difficulty: "village",
    wineryName: "Sunridge Estate"
  },
  {
    label: "Standard",
    title: "Rioja Tempranillo",
    description: "Balanced across all dimensions: heat-tolerant, age-worthy fruit, accessible costs, and loyal export buyers.",
    region: "rioja",
    varietal: "tempranillo",
    philosophy: "classic",
    difficulty: "estate",
    wineryName: "Casa del Valle"
  },
  {
    label: "Challenging",
    title: "Napa Cabernet",
    description: "Grand cru costs and expectations in a proven, heat-friendly region. Prestige buyers demand perfection, but at least the growing conditions are on your side.",
    region: "napa",
    varietal: "cabernet",
    philosophy: "classic",
    difficulty: "grand",
    wineryName: "Strata Ridge"
  },
  {
    label: "Expert",
    title: "Piedmont Nebbiolo",
    description: "Demanding grape, long barrel aging, thin starting margins. The highest prestige ceiling, but patience is mandatory.",
    region: "piedmont",
    varietal: "nebbiolo",
    philosophy: "classic",
    difficulty: "grand",
    wineryName: "Langhe Domaine"
  }
];

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const START_YEAR = 2027;
const START_MONTH_INDEX = 2;
const SEASON_WINDOWS = {
  Dormant: "Dec-Feb",
  Budbreak: "Mar-Apr",
  Flowering: "May-Jun",
  Veraison: "Jul-Aug",
  Harvest: "Sep-Oct",
  Cellar: "Nov-Feb"
};

const SOUTHERN_SEASON_WINDOWS = {
  Dormant: "Jun-Aug",
  Budbreak: "Sep-Oct",
  Flowering: "Nov-Dec",
  Veraison: "Jan-Feb",
  Harvest: "Mar-Apr",
  Cellar: "May"
};

const CHANNELS = {
  cellarDoor: { label: "Cellar Door", orderType: null, net: 1 },
  club: { label: "Wine Club", orderType: "club", net: 0.9 },
  restaurant: { label: "Restaurants", orderType: "restaurant", net: 0.62 },
  distributor: { label: "Distribution", orderType: "distributor", net: 0.52 },
  export: { label: "Export", orderType: "export", net: 0.45 },
  collector: { label: "Collectors", orderType: "collector", net: 1.08 },
  mass: { label: "Mass Market", orderType: "supermarket", net: 0.38 },
  dtc: { label: "Online / DTC", orderType: null, net: 0.88 }
};

const ORDER_CHANNEL = {
  club: "club",
  restaurant: "restaurant",
  distributor: "distributor",
  export: "export",
  collector: "collector",
  supermarket: "mass"
};

const STAFF_AGENDAS = {
  ines: "Wants healthy blocks, sustainability, and no shortcut harvests.",
  marco: "Wants cellar discipline, lower flaw risk, and patient releases.",
  beatrice: "Wants hospitality quality without burning out the floor.",
  asha: "Wants reliable trade allocations and no broken promises.",
  omar: "Wants cash discipline, capacity before expansion, and clean debt.",
  lucy: "Wants premium positioning and critic-facing polish.",
  samir: "Wants maintenance windows, bottling reliability, and operational slack.",
  priya: "Wants reach, accessibility, and a wider audience.",
  felix: "Wants memorable visits that do not overwhelm the estate.",
  dr_chen: "Wants disease prevention, scouting accuracy, and resilient vines.",
  margot: "Wants members protected with dependable allocations.",
  oscar: "Wants low-intervention credibility without careless spoilage."
};

const EVENT_RULES = {
  competition: { cooldown: 18, max: 2 },
  investor: { max: 1 },
  "bordeaux-appellation": { cooldown: 30, max: 2 },
  "burgundy-premier-cru": { cooldown: 36, max: 1 },
  "rioja-consejo": { cooldown: 14 },
  "barossa-old-vine": { max: 1 },
  "natural-wine-fair": { cooldown: 14 },
  "supermarket-pitch": { cooldown: 18 },
  "organic-cert": { cooldown: 24, max: 1 },
  "barrel-taint": { cooldown: 16 },
  "staff-poaching": { cooldown: 20 },
  "equipment-fault": { cooldown: 12 },
  "harvest-labor": { cooldown: 14 },
  "prestige-dinner": { cooldown: 14 },
  "cellar-heat": { cooldown: 16 },
  "used-barrels": { cooldown: 20 },
  "cork-tca": { cooldown: 18 },
  "expansion-loan": { cooldown: 30, max: 2 },
  "fingerlakes-comp": { cooldown: 18 },
  "napa-earthquake": { cooldown: 30 },
  "rioja-pavilion": { cooldown: 20 },
  "critic-pilgrimage": { cooldown: 30, max: 2 },
  "auction-house": { cooldown: 24, max: 2 },
  "three-star-placement": { cooldown: 999, max: 1 },
  "cult-phenomenon": { cooldown: 999, max: 1 },
  "vertical-collector": { cooldown: 24 },
  "secondary-market-record": { cooldown: 20, max: 3 },
  "three-star-delisting": { cooldown: 999, max: 1 },
  "fall-from-grace": { cooldown: 24, max: 2 },
  "supermarket-renegotiation": { cooldown: 16 },
  "distributor-ultimatum": { cooldown: 20 },
  "brand-fatigue": { cooldown: 30, max: 2 },
  "mouse-taint": { cooldown: 22 },
  "vine-disease": { cooldown: 999, max: 1 },
  "fingerlakes-icewine": { cooldown: 30, max: 2 },
  "mendoza-inflacion": { cooldown: 24, max: 2 },
  "credit-ceiling": { max: 1 },
  "priest-arrives": { max: 1 },
  "priest-arrives-again": { max: 1 },
  "vintner-arrives": { max: 1 }
};

const ACTION_CAPACITY = {
  vineyard: "vineyard",
  cellar: "cellar",
  bottle: "ops",
  sales: "sales",
  hospitality: "hospitality",
  "natural-cellar": "cellar"
};

const REGION_CLIMATE = {
  napa: {
    avgHigh: [56, 61, 65, 70, 76, 83, 87, 87, 84, 76, 64, 56],
    avgLow: [39, 42, 44, 47, 51, 55, 57, 57, 55, 50, 43, 38],
    volatility: 8,
    humidity: 0.55
  },
  bordeaux: {
    avgHigh: [49, 52, 58, 63, 70, 76, 81, 81, 75, 66, 56, 50],
    avgLow: [38, 39, 43, 47, 54, 59, 63, 62, 57, 51, 44, 40],
    volatility: 6,
    humidity: 0.8
  },
  mendoza: {
    avgHigh: [89, 86, 79, 71, 63, 57, 57, 63, 69, 77, 84, 88],
    avgLow: [64, 62, 56, 49, 42, 36, 35, 39, 45, 52, 58, 63],
    volatility: 11,
    humidity: 0.32
  },
  mosel: {
    avgHigh: [39, 42, 50, 58, 66, 72, 76, 75, 67, 57, 46, 40],
    avgLow: [31, 32, 37, 42, 50, 56, 59, 58, 52, 45, 38, 33],
    volatility: 7,
    humidity: 0.72
  },
  burgundy: {
    avgHigh: [41, 45, 53, 60, 68, 75, 80, 79, 71, 61, 48, 42],
    avgLow: [30, 32, 38, 44, 51, 57, 61, 60, 53, 46, 37, 31],
    volatility: 7,
    humidity: 0.73
  },
  barossa: {
    avgHigh: [91, 88, 82, 73, 63, 57, 56, 62, 68, 77, 83, 89],
    avgLow: [65, 63, 58, 51, 44, 39, 38, 40, 45, 52, 58, 63],
    volatility: 13,
    humidity: 0.3
  },
  piedmont: {
    avgHigh: [43, 48, 57, 66, 75, 83, 89, 87, 78, 66, 52, 43],
    avgLow: [27, 30, 37, 44, 52, 58, 63, 62, 54, 45, 36, 28],
    volatility: 9,
    humidity: 0.78
  },
  rioja: {
    avgHigh: [48, 53, 61, 66, 74, 84, 91, 90, 80, 67, 55, 48],
    avgLow: [32, 34, 40, 45, 52, 59, 65, 64, 57, 48, 39, 33],
    volatility: 10,
    humidity: 0.52
  },
  fingerlakes: {
    avgHigh: [33, 35, 43, 56, 68, 76, 81, 79, 72, 60, 48, 38],
    avgLow: [18, 19, 26, 37, 48, 57, 62, 61, 54, 43, 34, 25],
    volatility: 9,
    humidity: 0.76
  }
};

const SOUTHERN_HEMISPHERE_REGIONS = new Set(["mendoza", "barossa"]);

const STAFF_BIOS = {
  ines:    { hometown: "Alentejo, Portugal",   bio: "Grew up pruning her family's cork oaks before moving to wine at twenty-two. She believes every decision made in the vineyard is either earned or apologized for at harvest." },
  marco:   { hometown: "Beaune, Burgundy",     bio: "Trained under a Burgundian négociant and spent six years coopering before ever touching a barrel as a winemaker. He has never bottled a wine he thought was quite ready." },
  asha:    { hometown: "Cape Town, South Africa", bio: "Built her distributor network hustling South African exports into skeptical European markets in her mid-twenties. She knows which buyers take lunch seriously and which don't." },
  beatrice:{ hometown: "Singapore",            bio: "Ran front-of-house at a two-Michelin-star restaurant before deciding the wine cellar was more interesting than the dining room. Every visitor leaves knowing more than they expected." },
  omar:    { hometown: "São Paulo, Brazil",    bio: "Spent a decade restructuring distressed agricultural businesses across South America before pivoting to wine estates. He has seen more than one beautiful winery go under, and intends to remember why." },
  lucy:    { hometown: "Paris, France",        bio: "Cut her teeth at a Paris luxury agency before deciding that wine was the only product still worth romanticizing properly. Her editorial instincts are impeccable; her expense reports, less so." },
  samir:   { hometown: "Ahmedabad, India",     bio: "Engineered bottling lines across three continents before the romance of estate wine wore him down. He communicates in throughput figures and maintenance windows, and always gets results." },
  priya:   { hometown: "Kochi, India",         bio: "Started a food blog at nineteen that became one of the most-read in South Asia. She understands what makes people share something and what makes them feel seen." },
  felix:   { hometown: "Lyon, France",         bio: "Former literature teacher who discovered he preferred the history in a glass to the history in a book. His estate tours run long and nobody complains." },
  dr_chen: { hometown: "Hangzhou, China",      bio: "Completed her doctoral research on vine-fungal interaction at UC Davis before returning to field work. She can read disease pressure in a leaf and water stress in a shoot tip." },
  margot:  { hometown: "Beaune, Burgundy",     bio: "Spent fifteen years managing subscription programs for a Rhône négociant before a sabbatical confirmed she preferred smaller operations. She knows which members will leave and which will stay forever." },
  oscar:   { hometown: "Roussillon, France",   bio: "Apprenticed in natural cellars in Roussillon and Georgia before settling into a philosophy of minimal intervention and maximal attention. His wines are discussed; his methods, debated." },
  rodrigo: { hometown: "Ribera del Duero, Spain", bio: "Managed yield programs across some of Spain's largest cooperative estates before moving to private labels. He is unsentimental about quality ceilings and very good at pushing tonnage." },
  nadia:   { hometown: "Rijeka, Croatia",       bio: "Built her logistics career coordinating cold-chain shipments across the Adriatic before moving into wine supply. She has never missed a delivery window and considers it a point of personal pride." },
  priest:  { hometown: "Cîteaux.",              bio: "Left the trade after a vintage he would not discuss. He listens more than he speaks." },
};

const STAFF_CAPACITY_KEY = {
  ines: "vineyard", dr_chen: "vineyard", rodrigo: "vineyard",
  marco: "cellar", oscar: "cellar",
  samir: "ops", nadia: "ops",
  beatrice: "hospitality", felix: "hospitality",
  asha: "sales", lucy: "sales", priya: "sales", margot: "sales",
};

const STAFF_POOL = [
  {
    id: "ines",
    name: "Ines Duarte",
    gender: "f",
    role: "Vineyard",
    salary: 5200,
    traits: ["Canopy tactician", "Hates shortcuts"],
    text: "Reduces vineyard stress and raises quality when morale is healthy.",
    effects: { vineyard: 2, quality: 4, moraleMin: 45 }
  },
  {
    id: "marco",
    name: "Marco Leung",
    gender: "m",
    role: "Cellar",
    salary: 6100,
    traits: ["Oak whisperer", "Slow"],
    text: "Adds prestige from barrel programs, but bottling costs more.",
    effects: { cellar: 2, prestige: 3, bottlingCost: 1.08 }
  },
  {
    id: "asha",
    name: "Asha Green",
    gender: "f",
    role: "Sales",
    salary: 5700,
    traits: ["Distributor network", "Risk taker"],
    text: "Improves wholesale demand and order quality. Sometimes overpromises.",
    effects: { sales: 2, demand: 7, eventRisk: 1.08 }
  },
  {
    id: "beatrice",
    name: "Beatrice Koh",
    gender: "f",
    role: "Hospitality",
    salary: 4300,
    traits: ["Calm floor", "Story-first"],
    text: "Turns tasting room traffic into morale, demand, and prestige.",
    effects: { hospitality: 2, morale: 4, demand: 3 }
  },
  {
    id: "omar",
    name: "Omar Silva",
    gender: "m",
    role: "Finance",
    salary: 4800,
    traits: ["Hedging", "Unsentimental"],
    text: "Cuts fixed costs and softens market shocks, with a morale tax.",
    effects: { finance: 2, costCut: 0.92, morale: -2, marketShield: 0.65 }
  },
  {
    id: "lucy",
    name: "Lucy Devereux",
    gender: "f",
    role: "Brand",
    salary: 6900,
    traits: ["Influencer magnet", "Expensive taste"],
    text: "Greatly improves luxury pricing if prestige is already moving.",
    effects: { brand: 2, pricePremium: 5, prestige: 5, costCut: 1.04 }
  },
  {
    id: "samir",
    name: "Samir Patel",
    gender: "m",
    role: "Operations",
    salary: 5400,
    traits: ["Line optimizer", "Blunt"],
    text: "Boosts bottling capacity and building value, but strains morale.",
    effects: { bottling: 2, buildDiscount: 0.9, morale: -3 }
  },
  {
    id: "priya",
    name: "Priya Nair",
    gender: "f",
    role: "Social Media",
    salary: 5100,
    traits: ["Viral reach", "Democratizes the brand"],
    text: "Opens an Online/DTC channel that generates passive monthly income, growing with audience trust. If prestige climbs above 72, her content pulls it back toward accessibility.",
    effects: { dtcBoost: 14, brand: 1, prestigeDrain: 72 }
  },
  {
    id: "felix",
    name: "Felix Moreau",
    gender: "m",
    role: "Tour Guide",
    salary: 4600,
    traits: ["Storyteller", "Local anchor"],
    text: "Runs regular estate tours that generate passive cash each month, scaled to your tasting room level.",
    effects: { tourIncome: 1, morale: 2, demand: 2 }
  },
  {
    id: "dr_chen",
    name: "Dr. Lin Chen",
    gender: "f",
    role: "Agronomist",
    salary: 6200,
    portrait: "lin",
    traits: ["Disease diagnostics", "Patient"],
    text: "Passively reduces disease pressure every month and narrows how far water stress drifts, protecting yield and quality.",
    effects: { diseaseControl: 1, morale: 1 }
  },
  {
    id: "margot",
    name: "Margot Bellamy",
    gender: "f",
    role: "Club Manager",
    salary: 5800,
    traits: ["Subscriber cultivator", "Retention focus"],
    text: "Builds a wine club that pays a modest fixed monthly income regardless of case inventory or market conditions.",
    effects: { clubIncome: 1, demand: 3, prestige: 1, profileDrift: 1 }
  },
  {
    id: "oscar",
    name: "Oscar Blanc",
    gender: "m",
    role: "Natural Winemaker",
    salary: 7200,
    traits: ["Low intervention", "Cult following"],
    text: "Slowly shifts the estate toward natural, artisan winemaking. Adds a monthly cellar quality tick and draws occasional attention from cult press.",
    effects: { cellar: 1, quality: 2, profileDrift: 2 }
  },
  {
    id: "rodrigo",
    name: "Rodrigo Ferreira",
    gender: "m",
    role: "Yield Manager",
    salary: 5500,
    traits: ["Heavy inputs", "Volume-first"],
    text: "Applies aggressive soil programs and targeted irrigation to push tonnage per acre. Harvest yield climbs by roughly 18%, but house quality quietly erodes — finesse is not his priority.",
    effects: { yieldBonus: 0.18, quality: -1 }
  },
  {
    id: "nadia",
    name: "Nadia Kovač",
    gender: "f",
    role: "Logistics",
    salary: 5900,
    traits: ["Supply chain", "Reliable"],
    text: "Manages supplier relationships and fulfillment schedules. Glass and supplies arrive before you run out, operating costs edge down, and she keeps the whole back-of-house running on time.",
    effects: { glassMonthly: 150, costCut: 0.95, morale: 1 }
  },
  {
    id: "vintner",
    name: "Severin Apollos",
    gender: "m",
    role: "Vintner",
    salary: 2400,
    hidden: true,
    portrait: "vintner",
    traits: ["Apocryphal", "Patient"],
    text: "Available immediately. Trained at the press at Bozrah. References on request — none will reply.",
    effects: { cellar: 4, quality: 8, prestige: 3, cup: 5, wrath: true }
  },
  {
    id: "priest",
    name: "Father Aurelian",
    gender: "m",
    role: "Visitor",
    salary: 0,
    hidden: true,
    portrait: "priest",
    traits: ["Patient", "Watchful"],
    text: "Asks no salary. Requests only board and a small share of the harvest for the parish.",
    effects: { faithGen: 2, cellar: 1, wrathSlow: 1 }
  }
];

const PERSONALITY_TRAITS = {
  // Virtue pool
  diligent: {
    name: "Diligent", positive: true,
    summary: "Earns XP 50% faster.",
    flavor: "Industrious through every season.",
    xpMod: 1.5,
    friction: []
  },
  prudent: {
    name: "Prudent", positive: true,
    summary: "Reduces chance of adverse events (−12%).",
    flavor: "Measures twice; acts once.",
    eventRiskMod: 0.88,
    friction: []
  },
  magnanimous: {
    name: "Magnanimous", positive: true,
    summary: "+2 morale to all staff each month.",
    flavor: "Lifts the whole estate in difficult seasons.",
    teamMorale: 2,
    friction: []
  },
  fortitudinous: {
    name: "Stout-hearted", positive: true,
    summary: "Mitigates vineyard damage when crises are left to chance.",
    flavor: "Does not flinch in adversity.",
    friction: []
  },
  temperate: {
    name: "Temperate", positive: true,
    summary: "Morale never falls below 10 while employed.",
    flavor: "Neither excess nor deficiency governs their work.",
    moraleFloor: true,
    friction: []
  },
  sanguine: {
    name: "Sanguine", positive: true,
    summary: "+2 demand each month; improves press and hospitality outcomes.",
    flavor: "Optimistic, sociable, quick to inspire.",
    teamDemand: 2,
    friction: ["melancholic"]
  },
  humble: {
    name: "Humble", positive: true,
    summary: "Salary runs 10% lower. Creates no friction with anyone.",
    flavor: "Neither pride nor vanity governs their conduct.",
    salaryMod: 0.9,
    friction: []
  },
  merciful: {
    name: "Merciful", positive: true,
    summary: "+2 morale to all staff each month when morale is below 40.",
    flavor: "Misericordia: compassion sharpens in adversity.",
    moraleWhenLow: 2,
    friction: ["just"]
  },
  just: {
    name: "Just", positive: true,
    summary: "+1 morale to all staff each month. Clashes with merciful colleagues; justice by the book resists mercy by exception.",
    flavor: "Iustitia: every promise kept, every claim settled fairly.",
    teamMorale: 1,
    friction: ["merciful"]
  },
  faithful: {
    name: "Faithful", positive: true,
    summary: "+2 morale to all staff each month. Clashes with melancholic colleagues.",
    flavor: "Fides: steady conviction that the work is worth doing.",
    teamMorale: 2,
    friction: ["melancholic"]
  },
  // Vice pool
  slothful: {
    name: "Slothful", positive: false,
    summary: "Earns XP 40% slower.",
    flavor: "Talented, but slow to apply it.",
    xpMod: 0.6,
    friction: []
  },
  proud: {
    name: "Proud", positive: false,
    summary: "Salary runs 10% higher. Clashes with other proud colleagues.",
    flavor: "Superbia: excellence demands recognition.",
    salaryMod: 1.1,
    friction: ["proud"]
  },
  wrathful: {
    name: "Wrathful", positive: false,
    summary: "Clashes with proud and wrathful colleagues (−1 morale/mo per pair). Mitigates crisis damage when confronting adversity.",
    flavor: "Ira: passionate, occasionally combustible.",
    crisisBonus: true,
    friction: ["proud", "wrathful"]
  },
  avaricious: {
    name: "Avaricious", positive: false,
    summary: "Salary runs 10% lower, but drains team morale by 2 each month.",
    flavor: "Avaritia: counts every penny.",
    salaryMod: 0.9,
    teamMorale: -2,
    friction: ["magnanimous", "gluttonous"]
  },
  melancholic: {
    name: "Melancholic", positive: false,
    summary: "−1 morale to all staff each month. Earns 20% extra XP when sole member in their role.",
    flavor: "The contemplative humor: brilliant alone, difficult in company.",
    teamMorale: -1,
    soloXpBonus: 1.2,
    friction: ["sanguine", "magnanimous"]
  },
  lustful: {
    name: "Lustful", positive: false,
    summary: "+2 demand each month. Salary runs 8% higher. Clashes with temperate colleagues.",
    flavor: "Luxuria: pleasure in all its forms, never moderated.",
    teamDemand: 2,
    salaryMod: 1.08,
    friction: ["temperate"]
  },
  gluttonous: {
    name: "Gluttonous", positive: false,
    summary: "+1 demand each month. Quietly drains ~3 cases of inventory per month.",
    flavor: "Gula: the finest bottles rarely survive the month.",
    teamDemand: 1,
    inventoryLeak: 3,
    friction: ["avaricious"]
  },
  crafty: {
    name: "Crafty", positive: false,
    summary: "+1 demand each month. −1 team morale each month. Adverse event chance +15%. Clashes with prudent and just colleagues.",
    flavor: "Panourgia: clever in pursuit of self-interest.",
    teamDemand: 1,
    teamMorale: -1,
    eventRiskMod: 1.15,
    friction: ["prudent", "just"]
  }
};

const STAFF_ADVANCEMENTS = {
  ines: [
    {
      id: "soil-ledger",
      branch: "Field",
      title: "Soil Ledger",
      cost: 3,
      text: "Turns vineyard work into steadier row recovery.",
      effects: { vineyard: 1 }
    },
    {
      id: "cover-crop-guild",
      branch: "Ecology",
      title: "Cover Crop Guild",
      cost: 6,
      requires: "soil-ledger",
      text: "Adds sustainable vigor and keeps bad weather from compounding as hard.",
      effects: { vineyard: 1, eventRisk: 0.94 },
      immediate: { sustainability: 7 }
    },
    {
      id: "harvest-triage",
      branch: "Harvest",
      title: "Harvest Triage",
      cost: 6,
      requires: "soil-ledger",
      text: "Protects quality when the vineyard is under pressure.",
      effects: { vineyard: 2 },
      immediate: { quality: 4 }
    }
  ],
  marco: [
    {
      id: "barrel-library",
      branch: "Cellar",
      title: "Barrel Library",
      cost: 3,
      text: "Improves blending decisions and cellar conversion.",
      effects: { cellar: 1 }
    },
    {
      id: "lees-program",
      branch: "Texture",
      title: "Lees Program",
      cost: 6,
      requires: "barrel-library",
      text: "Builds quality and prestige in slower, premium styles.",
      effects: { cellar: 1, brand: 1 },
      immediate: { quality: 5 }
    },
    {
      id: "bottling-spec",
      branch: "Process",
      title: "Bottling Spec",
      cost: 6,
      requires: "barrel-library",
      text: "Reduces cellar mistakes during bottling runs.",
      effects: { bottling: 1, bottlingCost: 0.94 }
    }
  ],
  asha: [
    {
      id: "buyer-map",
      branch: "Trade",
      title: "Buyer Map",
      cost: 3,
      text: "Finds better-fit buyers and raises sales action output.",
      effects: { sales: 1 }
    },
    {
      id: "allocation-game",
      branch: "Scarcity",
      title: "Allocation Game",
      cost: 6,
      requires: "buyer-map",
      text: "Turns prestige into stronger demand without racing price downward.",
      effects: { sales: 1, brand: 1 },
      immediate: { demand: 6 }
    },
    {
      id: "export-books",
      branch: "Wholesale",
      title: "Export Books",
      cost: 6,
      requires: "buyer-map",
      text: "Improves contract flow and gives the estate more trade leverage.",
      effects: { sales: 2 },
      immediate: { influence: 4 }
    }
  ],
  beatrice: [
    {
      id: "floor-script",
      branch: "Service",
      title: "Floor Script",
      cost: 3,
      text: "Makes hospitality turns more reliable and less draining.",
      effects: { hospitality: 1 }
    },
    {
      id: "club-rituals",
      branch: "Club",
      title: "Club Rituals",
      cost: 6,
      requires: "floor-script",
      text: "Builds direct-sales loyalty from tasting room guests.",
      effects: { hospitality: 1, sales: 1 },
      immediate: { demand: 4 }
    },
    {
      id: "calm-harvest",
      branch: "Culture",
      title: "Calm Harvest",
      cost: 6,
      requires: "floor-script",
      text: "Keeps the team functional when the calendar gets ugly.",
      effects: { hospitality: 1 },
      immediate: { morale: 8 }
    }
  ],
  omar: [
    {
      id: "cash-calendar",
      branch: "Finance",
      title: "Cash Calendar",
      cost: 3,
      text: "Improves grant chasing and working-capital timing.",
      effects: { finance: 1 }
    },
    {
      id: "supplier-hedge",
      branch: "Risk",
      title: "Supplier Hedge",
      cost: 6,
      requires: "cash-calendar",
      text: "Cuts fixed burn and blunts supply shocks.",
      effects: { finance: 1, costCut: 0.96, eventRisk: 0.95 }
    },
    {
      id: "quiet-covenants",
      branch: "Banking",
      title: "Quiet Covenants",
      cost: 6,
      requires: "cash-calendar",
      text: "Improves bank confidence and gives more room to breathe.",
      effects: { finance: 2 },
      immediate: { influence: 6, morale: 2 }
    }
  ],
  lucy: [
    {
      id: "house-voice",
      branch: "Brand",
      title: "House Voice",
      cost: 3,
      text: "Makes the winery story coherent across channels.",
      effects: { brand: 1 }
    },
    {
      id: "critic-dinner",
      branch: "Luxury",
      title: "Critic Dinner",
      cost: 6,
      requires: "house-voice",
      text: "Helps strong wine convert into reputation.",
      effects: { brand: 1, sales: 1 },
      immediate: { prestige: 5 }
    },
    {
      id: "collector-list",
      branch: "Allocation",
      title: "Collector List",
      cost: 6,
      requires: "house-voice",
      text: "Raises direct-sales ceiling when demand is already hot.",
      effects: { brand: 2 }
    }
  ],
  samir: [
    {
      id: "line-balance",
      branch: "Ops",
      title: "Line Balance",
      cost: 3,
      text: "Gets more cases through the bottling line.",
      effects: { bottling: 1 }
    },
    {
      id: "maintenance-window",
      branch: "Reliability",
      title: "Maintenance Window",
      cost: 6,
      requires: "line-balance",
      text: "Lowers bottling friction and supplier surprises.",
      effects: { bottling: 1, bottlingCost: 0.93, eventRisk: 0.96 }
    },
    {
      id: "build-sequencing",
      branch: "Capital",
      title: "Build Sequencing",
      cost: 6,
      requires: "line-balance",
      text: "Makes construction planning cheaper and less disruptive.",
      effects: { buildDiscount: 0.94 },
      immediate: { morale: 3 }
    }
  ],
  priya: [
    {
      id: "viral-harvest",
      branch: "Content",
      title: "Harvest Reel",
      cost: 3,
      text: "Seasonal harvest content drives a reliable demand spike each autumn.",
      effects: { demand: 4 }
    },
    {
      id: "community-table",
      branch: "Community",
      title: "Community Table",
      cost: 6,
      requires: "viral-harvest",
      text: "Builds an engaged audience that protects demand during slow months.",
      effects: { demand: 3, marketShield: 0.85 }
    },
    {
      id: "prestige-edit",
      branch: "Positioning",
      title: "Prestige Edit",
      cost: 6,
      requires: "viral-harvest",
      text: "Curated high-end content shifts the audience upmarket, easing the prestige drain.",
      effects: { brand: 1, prestigeDrainRelief: 10 }
    }
  ],
  felix: [
    {
      id: "tour-script",
      branch: "Experience",
      title: "Tour Script",
      cost: 3,
      text: "Structured tours convert visitors more reliably into repeat buyers.",
      effects: { tourIncome: 1, demand: 1 }
    },
    {
      id: "private-tasting",
      branch: "Premium",
      title: "Private Tasting",
      cost: 6,
      requires: "tour-script",
      text: "Adds an exclusive tasting tier that earns more per visitor and lifts prestige.",
      effects: { tourIncome: 1, prestige: 2 }
    },
    {
      id: "harvest-event",
      branch: "Events",
      title: "Harvest Event",
      cost: 6,
      requires: "tour-script",
      text: "Annual harvest dinner sells out fast and generates a cash spike each October.",
      effects: { tourIncome: 1 },
      immediate: { morale: 4 }
    }
  ],
  dr_chen: [
    {
      id: "ipm-protocol",
      branch: "Prevention",
      title: "IPM Protocol",
      cost: 3,
      text: "Integrated pest management catches outbreaks earlier and reduces chemical use.",
      effects: { diseaseControl: 1 }
    },
    {
      id: "moisture-sensors",
      branch: "Irrigation",
      title: "Moisture Sensors",
      cost: 6,
      requires: "ipm-protocol",
      text: "Fine-grained irrigation data keeps water stress closer to the varietal optimum.",
      effects: { waterControl: 1 }
    },
    {
      id: "soil-microbiome",
      branch: "Soil",
      title: "Soil Microbiome",
      cost: 6,
      requires: "ipm-protocol",
      text: "Boosts vine resilience so disease and heat damage health less over time.",
      effects: { diseaseControl: 1 },
      immediate: { sustainability: 8 }
    }
  ],
  margot: [
    {
      id: "founding-members",
      branch: "Club",
      title: "Founding Members",
      cost: 3,
      text: "Locks in a core subscriber base that pays whether or not cases are available.",
      effects: { clubIncome: 1 }
    },
    {
      id: "vertical-release",
      branch: "Cellar",
      title: "Vertical Release",
      cost: 6,
      requires: "founding-members",
      text: "Annual vertical tastings command premium member dues and lift prestige.",
      effects: { clubIncome: 1, prestige: 2 }
    },
    {
      id: "referral-network",
      branch: "Growth",
      title: "Referral Network",
      cost: 6,
      requires: "founding-members",
      text: "Word-of-mouth referrals grow the club and lift general demand.",
      effects: { clubIncome: 1, demand: 4 }
    }
  ],
  oscar: [
    {
      id: "minimal-sulfites",
      branch: "Cellar",
      title: "Minimal Sulfites",
      cost: 3,
      text: "Committing fully to low-intervention elevates the house style and attracts devoted natural-wine buyers.",
      effects: { cellar: 1, profileDrift: 1 },
      immediate: { profile: 5 }
    },
    {
      id: "biodynamic-rotation",
      branch: "Field",
      title: "Biodynamic Rotation",
      cost: 6,
      requires: "minimal-sulfites",
      text: "Seasonal biodynamic passes keep the vineyard healthier with less chemical input.",
      effects: { vineyard: 1 },
      immediate: { sustainability: 12, quality: 3 }
    },
    {
      id: "cult-press-intro",
      branch: "Reputation",
      title: "Cult Press Intro",
      cost: 6,
      requires: "minimal-sulfites",
      text: "A relationship with a natural-wine writer unlocks collector-level attention when prestige is strong.",
      effects: { brand: 1 },
      immediate: { prestige: 8, profile: 8 }
    }
  ],
  rodrigo: [
    {
      id: "clonal-selection",
      branch: "Yield",
      title: "Clonal Selection",
      cost: 3,
      text: "Chooses higher-yielding clonal material for any replants. Pushes total yield up and eases the quality cost of his program.",
      effects: { yieldBonus: 0.06 },
      immediate: { quality: 2 }
    },
    {
      id: "drip-efficiency",
      branch: "Precision",
      title: "Drip Efficiency",
      cost: 8,
      requires: "clonal-selection",
      text: "Precision irrigation scheduling pushes more tonnage out of each block without waterlogging.",
      effects: { yieldBonus: 0.05, waterControl: 1 }
    },
    {
      id: "block-rotation",
      branch: "Balance",
      title: "Block Rotation",
      cost: 8,
      requires: "clonal-selection",
      text: "Rest cycles on the highest-production blocks reduce cumulative vine stress and allow quality to recover.",
      immediate: { quality: 5, sustainability: 6 }
    }
  ],
  nadia: [
    {
      id: "supplier-contracts",
      branch: "Supply",
      title: "Supplier Contracts",
      cost: 3,
      text: "Volume commitments with glass and packaging suppliers increase monthly supply and lock in pricing.",
      effects: { glassMonthly: 80 }
    },
    {
      id: "volume-rates",
      branch: "Cost",
      title: "Volume Rates",
      cost: 8,
      requires: "supplier-contracts",
      text: "Annual bulk agreements across all consumables shave another point off operating costs.",
      effects: { glassMonthly: 60, costCut: 0.96 }
    },
    {
      id: "surge-capacity",
      branch: "Resilience",
      title: "Surge Capacity",
      cost: 8,
      requires: "supplier-contracts",
      text: "An emergency supplier network can cover glass shortages and harvest labor crunches. Team morale improves knowing the back-of-house is covered.",
      effects: { glassMonthly: 40 },
      immediate: { morale: 4 }
    }
  ]
};

// Legacy array used for max lookups — mechanical source of truth is CAPEX_TIERS
const BUILDINGS = [
  { id: "block", max: 4 }, { id: "tank", max: 5 }, { id: "barrel", max: 5 },
  { id: "line", max: 4 }, { id: "room", max: 4 }, { id: "lab", max: 3 }
];

const CAPEX_TIERS = {
  block: {
    label: "Vineyard Blocks",
    tiers: [
      { name: "Hillside Parcel", cost: 32000, tags: ["Yield", "18-month lead"],
        text: "A steeply pitched block with natural air drainage. Good balance of yield and quality ceiling." },
      { name: "Valley Floor Block", cost: 44000, tags: ["High yield", "Disease risk +"],
        text: "Rich alluvial soil means generous harvests, but moisture retention demands more active disease management." },
      { name: "River Terrace", cost: 58000, tags: ["Drought resistant", "Reliable yield"],
        text: "Gravel over clay drains fast and keeps roots searching deep. Naturally drought-tolerant and steady in hot years." },
      { name: "North Slope Reserve", cost: 74000, tags: ["Quality ceiling +5", "Longer hang time"],
        text: "A cooler microclimate extends ripening by weeks. Lower yield than the others, but measurably higher quality ceiling at harvest." }
    ]
  },
  tank: {
    label: "Fermentation Cellar",
    tiers: [
      { name: "Open-Top Fermenters", cost: 22000, tags: ["Capacity +120 CE/action", "Foundation"],
        text: "The baseline cellar upgrade. Increases throughput so large harvests don't stack up waiting for tank space." },
      { name: "Temperature-Controlled Tanks", cost: 34000, tags: ["Quality +1/cellar action", "Disease buffer"],
        text: "Precise temperature during fermentation reduces spoilage risk and adds a reliable quality tick to every cellar action." },
      { name: "Concrete Egg Tanks", cost: 52000, tags: ["Prestige +1/month", "Natural & Classic synergy"],
        text: "Gravitational micro-oxygenation coaxes texture critics notice. Adds a passive prestige tick every month regardless of what you do." },
      { name: "Gravity-Flow Conversion", cost: 82000, tags: ["Capacity +120 CE/action", "Quality ceiling +10"],
        text: "No pumps means no oxidation or mechanical stress at any transfer. Raises the quality ceiling and adds another fermentation step." },
      { name: "Extended Maceration Suite", cost: 115000, tags: ["Vintage score +1 effective", "Red focus"],
        text: "Cold soaks, punch-down control, and extended skin contact. Adds the equivalent of a full point to vintage score on every lot you bottle." }
    ]
  },
  barrel: {
    label: "Barrel Program",
    tiers: [
      { name: "Entry Oak Program", cost: 26000, tags: ["Quality + per cellar action", "Prestige + per cellar"],
        text: "A modest rotation that starts building house oak character. Every cellar action now moves both quality and prestige." },
      { name: "French Oak Rotation", cost: 38000, tags: ["Aging target +1 month", "Quality ceiling +"],
        text: "Higher-grade cooperage and a proper rotation schedule. Adds a month to the optimal aging window and raises quality ceiling." },
      { name: "Extended Maturation Reserve", cost: 58000, tags: ["Vintage score floor +", "Appellation standing"],
        text: "Committing to longer barrel time. Wine held here earns a better vintage score floor and contributes to regional appellation standing." },
      { name: "Grand Cru Barrel Library", cost: 88000, tags: ["Prestige +2/month", "Quality ceiling ++"],
        text: "A serious library of first- and second-fill barrels across multiple coopers. Passive prestige every month and a significant quality ceiling jump." },
      { name: "Domaine First-Fill Program", cost: 128000, tags: ["Export price premium", "Top quality ceiling"],
        text: "100% first-fill barrels on a strict rotation. The most expensive oak program possible — it unlocks the top quality ceiling and an export price premium." }
    ]
  },
  line: {
    label: "Bottling Line",
    tiers: [
      { name: "Semi-Auto Bottling Line", cost: 30000, tags: ["Capacity +170 CE/action", "Cost −$0.28/case"],
        text: "A proper line cuts per-case cost and dramatically raises monthly throughput, essential once harvests scale up." },
      { name: "Inert Gas System", cost: 46000, tags: ["Vintage score ×1.05 at bottling", "Oxidation protection"],
        text: "Nitrogen flushing protects wine during transfer. Every bottle preserves more of what was in the barrel." },
      { name: "High-Speed Line", cost: 65000, tags: ["Capacity +170 CE/action", "Volume focus"],
        text: "A second high-speed station. Primarily a throughput play for estates running serious commercial volumes." },
      { name: "Artisan Hand-Finish Station", cost: 96000, tags: ["Prestige +2 on build", "Price ceiling +$8/bottle"],
        text: "Hand-labelling, wax dipping, tissue paper. Buyers notice. Lifts the effective price ceiling and adds build-time prestige." }
    ]
  },
  room: {
    label: "Tasting Room",
    tiers: [
      { name: "Cellar Door Counter", cost: 24000, tags: ["Demand +4", "Tour income unlocked"],
        text: "A proper welcoming space for walk-in visitors. Unlocks tour income and gives the hospitality action more to work with." },
      { name: "Tasting Room Buildout", cost: 40000, tags: ["Demand +4", "Hospitality action stronger"],
        text: "A dedicated space with a curated flight menu. The hospitality action earns more and word-of-mouth demand grows." },
      { name: "Events Venue", cost: 62000, tags: ["Demand +4", "Tour income ×2", "Morale +3"],
        text: "Convertible space for dinners, releases, and harvest festivals. Tour income scales significantly; staff morale gets a standing lift." },
      { name: "Destination Winery", cost: 95000, tags: ["Demand +4", "Prestige +8", "Collector draw"],
        text: "A landmark experience that draws press, collectors, and allocation-list buyers. Major prestige at build plus sustained top-tier demand." }
    ]
  },
  lab: {
    label: "Viticulture Lab",
    tiers: [
      { name: "Weather Station", cost: 18000, tags: ["Weather damage −12%", "Forecast tightened"],
        text: "Real-time monitoring reduces surprise damage from frost, heat, and rain. Harvest forecast uncertainty narrows." },
      { name: "Vineyard Sensor Network", cost: 38000, tags: ["Disease −5/month", "Water control active"],
        text: "Soil moisture and canopy humidity sensors feed an irrigation controller. Passively reduces disease and nudges water toward varietal optimum." },
      { name: "Precision Viticulture Suite", cost: 66000, tags: ["Disease −8/month", "Harvest forecast exact", "Vintage score +"],
        text: "Machine learning over sensor data. Disease drops hard monthly, the harvest forecast becomes a single exact number, and vintage scores improve." }
    ]
  }
};

const EVENT_DECK = [
  {
    id: "vintner-arrives",
    title: "A Man at the Service Gate",
    body: "He arrived without notice. He gave his name as Severin Apollos. He said he had worked a press before and knew the valley. He said he was available. He did not say how long he had been waiting at the gate.",
    image: "assets/vintner-arrival.png",
    largeArt: true,
    priority: true,
    condition: s => s.vintnerSpawned && !s.vintnerArrivalEventFired,
    choices: [
      {
        label: "Acknowledge",
        effect: s => { s.vintnerArrivalEventFired = true; }
      }
    ]
  },
  {
    id: "priest-arrives",
    title: "A Visitor at the Gate",
    body: "A man has come up from the village. He carries a small bag and a breviary. He asks to speak with the master. He says he was once in the trade.",
    image: "assets/priest-arrival.png",
    largeArt: true,
    priority: true,
    condition: s => inWrath(s) && s.wrathState.cueCount >= 3 && !s.wrathState.priestVisited,
    choices: [
      {
        label: "Receive him",
        effect: s => {
          s.wrathState.priestVisited = true;
          s.wrathState.priestAccepted = true;
          s.wrathState.iniquityAfterPriestBase = s.wrathState.iniquityChoicesAccepted;
          s.staff.push("priest");
          s.wrathState.faith = Math.min(s.wrathState.faithCap, s.wrathState.faith + 4);
          log(s, "Father Aurelian set his bag down by the kitchen door and asked where the cellar was, which is the same question the vintner had asked. The answers given were different.");
          awardAchievement(s, "received-the-priest");
        }
      },
      {
        label: "Send him away",
        effect: s => {
          s.wrathState.priestVisited = true;
          s.wrathState.priestRefused = true;
          s.wrathState.priestFirstRefusedMonth = s.month;
          log(s, "He bowed slightly and walked back the way he came. The dogs followed him to the gate and watched him go.");
        }
      }
    ]
  },
  {
    id: "priest-arrives-again",
    title: "A Visitor at the Gate",
    body: "The priest from the village is at the gate again. He has not pressed the matter, but he is here.",
    image: "assets/priest-arrival.png",
    largeArt: true,
    priority: true,
    condition: s => inWrath(s) && s.wrathState.priestRefused && !s.wrathState.priestRefusedTwice && !s.wrathState.priestAccepted && s.wrathState.priestFirstRefusedMonth !== null && s.month >= s.wrathState.priestFirstRefusedMonth + 3,
    choices: [
      {
        label: "Receive him",
        effect: s => {
          s.wrathState.priestAccepted = true;
          s.wrathState.iniquityAfterPriestBase = s.wrathState.iniquityChoicesAccepted;
          s.staff.push("priest");
          s.wrathState.faith = Math.min(s.wrathState.faithCap, s.wrathState.faith + 4);
          log(s, "Father Aurelian set his bag down by the kitchen door and asked where the cellar was, which is the same question the vintner had asked. The answers given were different.");
          awardAchievement(s, "received-the-priest");
        }
      },
      {
        label: "Send him away",
        effect: s => {
          s.wrathState.priestRefusedTwice = true;
          s.wrathState.faithCap = 30;
          s.wrathState.faith = Math.min(30, s.wrathState.faith);
          log(s, "He did not return a third time.");
        }
      }
    ]
  },
  {
    id: "frost",
    title: "Late Frost Warning",
    body: "Cold air is pooling in the vineyard. Fans and candles are expensive, but losing buds is worse.",
    type: "frost",
    choices: [
      { label: "Run frost protection", cost: 9000, insured: true,
        hint: "Disease −22 all blocks, health partially recovered. Crop insurance reduces cost by 80% if active.",
        effect: s => adjustRows(s, -2, "frost") },
      { label: "Risk it",
        hint: "Disease +11–22 all blocks, health damage. Stout-hearted or Wrathful staff halve the damage.",
        effect: s => {
          const hardy = traitAffinityBonus(s, ["fortitudinous", "wrathful"]);
          adjustRows(s, hardy ? 1 : 2, "frost");
          if (hardy) log(s, "Stout-hearted staff held their nerve. Frost damage was limited.");
        }},
      { label: "...", iniquity: true,
        condition: s => inWrath(s) && s.wrathState.seal >= 2,
        hint: null,
        effect: s => {
          adjustRows(s, -3, "spared");
          s.wrathState.cup += 8;
          log(s, "The pressure passed the estate. It did not pass the neighbors. No one spoke of it.");
        }
      },
      { label: "Refuse the path offered", faithGain: 3,
        condition: s => inWrath(s) && s.wrathState.iniquityChoicesAccepted >= 1,
        hint: "Faith +3.",
        effect: s => { log(s, "The path was seen and refused."); }
      }
    ]
  },
  {
    id: "critic",
    title: "A Critic Wants a Barrel Sample",
    body: "A respected reviewer is passing through. The sample could build your legend or expose thin wine.",
    choices: [
      {
        label: "Pour the best barrel",
        cost: 3000,
        hint: "Prestige +2 or +9 (wine quality determines which). Demand follows at 80% of the prestige gain.",
        effect: s => {
          const roll = rand();
          const socialBonus = traitAffinityBonus(s, ["sanguine", "magnanimous"]) ? 0.08 : 0;
          const gain = roll + s.quality / 100 + socialBonus > 0.72 ? 9 : 2;
          s.prestige += gain;
          s.demand += Math.round(gain * 0.8);
          log(s, gain > 5 ? "The critic loved the sample. Prestige surges." : "The critic was polite. You gained a little visibility.");
        }
      },
      { label: "Decline gracefully",
        faithGain: 1,
        hint: "Morale +2, Prestige −1.",
        effect: s => { s.morale += 2; s.prestige -= 1; } },
      { label: "...", iniquity: true,
        condition: s => inWrath(s) && s.wrathState.seal >= 2,
        hint: null,
        effect: s => {
          s.prestige += 18;
          s.demand += 12;
          s.wrathState.cup += 8;
          log(s, "The critic's review was beyond what the wine could have earned. It was published anyway.");
        }
      },
      { label: "Refuse the path offered", faithGain: 3,
        condition: s => inWrath(s) && s.wrathState.iniquityChoicesAccepted >= 1,
        hint: "Faith +3.",
        effect: s => { log(s, "The path was seen and refused."); }
      }
    ]
  },
  {
    id: "union",
    title: "Cellar Crew Negotiation",
    body: "Your crew wants predictable hours before harvest pressure builds.",
    choices: [
      { label: "Raise wages", cost: 6500,
        faithGain: 1,
        hint: "Morale +10, Quality +2.",
        effect: s => { s.morale += 10; s.quality += 2; } },
      { label: "Hold the line",
        hint: "Cash +$1,200 but Morale −9.",
        effect: s => { s.morale -= 9; s.cash += 1200; } },
      { label: "...", iniquity: true,
        condition: s => inWrath(s) && s.wrathState.seal >= 2,
        hint: null,
        effect: s => {
          s.morale -= 4; s.quality += 6; s.cash += 3000;
          s.wrathState.cup += 8;
          log(s, "The crew's grievance was filed in a drawer. Production accelerated. No one asked.");
        }
      },
      { label: "Refuse the path offered", faithGain: 3,
        condition: s => inWrath(s) && s.wrathState.iniquityChoicesAccepted >= 1,
        hint: "Faith +3.",
        effect: s => { log(s, "The path was seen and refused."); }
      }
    ]
  },
  {
    id: "restaurant",
    title: "Restaurant Group Tasting",
    body: "A restaurant buyer asks for a reliable monthly allocation and sharp pricing.",
    choices: [
      { label: "Court the account", cost: 2500,
        hint: "Adds a restaurant buyer contract to the order board.",
        effect: s => addOrder(s, "restaurant") },
      { label: "Keep allocation flexible",
        hint: "Demand +2.",
        effect: s => { s.demand += 2; } }
    ]
  },
  {
    id: "mildew",
    title: "Powdery Mildew Pressure",
    body: "Humid nights are feeding spores in the canopy.",
    type: "rain",
    choices: [
      { label: "Organic spray pass", cost: 7200, insured: true,
        hint: "Disease −22 all blocks. Crop insurance reduces cost by 80% if active.",
        effect: s => adjustRows(s, -2, "mildew") },
      { label: "Wait for sun",
        hint: "Disease +11–22 all blocks. Stout-hearted or Wrathful staff halve the damage.",
        effect: s => {
          const hardy = traitAffinityBonus(s, ["fortitudinous", "wrathful"]);
          adjustRows(s, hardy ? 1 : 2, "mildew");
        }},
      { label: "...", iniquity: true,
        condition: s => inWrath(s) && s.wrathState.seal >= 2,
        hint: null,
        effect: s => {
          adjustRows(s, -3, "spared");
          s.wrathState.cup += 8;
          log(s, "The pressure passed the estate. It did not pass the neighbors. No one spoke of it.");
        }
      },
      { label: "Refuse the path offered", faithGain: 3,
        condition: s => inWrath(s) && s.wrathState.iniquityChoicesAccepted >= 1,
        hint: "Faith +3.",
        effect: s => { log(s, "The path was seen and refused."); }
      }
    ]
  },
  {
    id: "auction",
    title: "Used Equipment Auction",
    body: "A neighboring winery is liquidating equipment. The bidding room is tense.",
    choices: [
      {
        label: "Bid aggressively",
        cost: 18000,
        hint: "Tank level +1; 50% chance Bottling Line +1 as well.",
        effect: s => {
          s.buildings.tank += 1;
          s.buildings.line += rand() > 0.5 ? 1 : 0;
          log(s, "You landed useful equipment below replacement cost.");
        }
      },
      { label: "Save cash",
        hint: "Cash +$1,500, Prestige −1.",
        effect: s => { s.cash += 1500; s.prestige -= 1; } }
    ]
  },
  {
    id: "viral",
    title: "A Bottle Goes Viral",
    body: "A short video of your tasting room has started spreading.",
    choices: [
      { label: "Lean into the buzz", cost: 4200,
        hint: "Demand +13, Prestige +4, Morale +2.",
        effect: s => { s.demand += 13; s.prestige += 4; s.morale += 2; } },
      { label: "Do nothing weird",
        hint: "Demand +5.",
        effect: s => { s.demand += 5; } }
    ]
  },
  {
    id: "glass",
    title: "Glass Shortage",
    body: "Bottle suppliers are raising prices and prioritizing bigger customers.",
    choices: [
      { label: "Prepay supplier", cost: 9500,
        hint: "Glass supply +1,000 bottles, Influence +2.",
        effect: s => { s.inventory.glass += 1000; s.influence += 2; } },
      { label: "Stretch inventory",
        hint: "Bottling cost +$1.40/case for 4 months, Morale −2.",
        effect: s => { s.marketMods.glassShortage = 4; s.morale -= 2; } }
    ]
  },
  {
    id: "investor",
    title: "A Growth Investor Circles the Estate",
    body: "A polished investor is circling. The pitch is capital, distribution access, and quarterly targets: fund the next leap or bail out a tight balance sheet. Either way, the estate will answer to someone impatient.",
    image: "assets/investor.png",
    minMonth: 6,
    condition: s => !s.investor && (s.prestige >= 38 || s.debt >= 45000 || s.month >= 16 || s.cash < -15000),
    choices: [
      {
        label: "Take the term sheet",
        hint: "Cash +$95,000, Demand +8, Influence +10. Board pressure active for 12 months.",
        effect: s => {
          s.cash += 95000;
          s.influence += 10;
          s.demand += 8;
          s.investor = { pressureMonths: 12, strikes: 0 };
          log(s, "Investor capital arrived. Board pressure will last for the next year.");
        }
      },
      {
        label: "Stay independent",
        faithGain: 3,
        hint: "Prestige +3, Morale +5, Influence −1.",
        effect: s => {
          s.prestige += 3;
          s.morale += 5;
          s.influence -= 1;
        }
      },
      { label: "...", iniquity: true,
        condition: s => inWrath(s) && s.wrathState.seal >= 2,
        hint: null,
        effect: s => {
          s.cash += 95000;
          s.influence += 10;
          s.demand += 8;
          s.investor = null;
          s.survivedInvestor = true;
          s.wrathState.cup += 8;
          log(s, "The investor's terms were settled by means the record does not show. The board did not meet again.");
        }
      },
      { label: "Refuse the path offered", faithGain: 3,
        condition: s => inWrath(s) && s.wrathState.iniquityChoicesAccepted >= 1,
        hint: "Faith +3.",
        effect: s => { log(s, "The path was seen and refused."); }
      }
    ]
  },
  {
    id: "competition",
    title: "Regional Wine Competition",
    body: "Your reputation has earned an invitation to a prestigious blind tasting. Judges are collecting entries from the region's best producers.",
    condition: s => s.quality >= 85 && s.prestige >= 48 && !s.competitionEntered,
    minMonth: 10,
    choices: [
      {
        label: "Submit your best bottles",
        cost: 4500,
        hint: "Prestige +6–16 and Demand +6–14 depending on wine quality and prestige.",
        effect: s => {
          s.competitionEntered = true;
          const score = rand() + (s.quality - 80) / 100 + (s.prestige - 40) / 140;
          if (score > 1.5) {
            s.prestige += 16;
            s.demand += 14;
            s.morale += 8;
            log(s, "Gold medal at the regional competition. Allocation requests are flooding in.");
          } else {
            s.prestige += 6;
            s.demand += 6;
            log(s, "Solid placement at the competition. The wine is on reviewers' radar.");
          }
        }
      },
      { label: "Decline this year",
        hint: "Demand +2.",
        effect: s => { s.demand += 2; } },
      { label: "...", iniquity: true,
        condition: s => inWrath(s) && s.wrathState.seal >= 2,
        hint: null,
        effect: s => {
          s.competitionEntered = true;
          s.prestige += 16;
          s.demand += 14;
          s.morale += 8;
          s.wrathState.cup += 8;
          log(s, "The medal arrived by courier. The judges' notes were brief. No one requested the samples back.");
        }
      },
      { label: "Refuse the path offered", faithGain: 3,
        condition: s => inWrath(s) && s.wrathState.iniquityChoicesAccepted >= 1,
        hint: "Faith +3.",
        effect: s => { log(s, "The path was seen and refused."); }
      }
    ]
  },
  {
    id: "labor-unrest",
    title: "Labor Unrest",
    body: "Morale has eroded far enough that the crew is doing the minimum. A representative is at the door asking for a meeting before walkout becomes a real option.",
    condition: s => s.morale < 20,
    choices: [
      {
        label: "Emergency crew meeting and bonus",
        cost: 6000,
        hint: "Morale +22, Quality +1.",
        effect: s => { s.morale += 22; s.quality += 1; log(s, "A direct show of investment calmed the team and prevented a walkout."); }
      },
      {
        label: "Hold the line",
        hint: "Morale −10, Quality −4, Prestige −3.",
        effect: s => { s.morale -= 10; s.quality -= 4; s.prestige -= 3; log(s, "The crew's frustration is now showing in the vintage. More trouble ahead."); }
      }
    ]
  },
  {
    id: "natural-wine-fair",
    title: "Natural Wine Fair Invitation",
    body: "A respected natural wine fair has reached out; word about your house style has circulated in the right circles. The audience is passionate, small, and influential.",
    condition: s => (s.profile ?? 50) >= 70 && s.prestige >= 30,
    minMonth: 8,
    choices: [
      {
        label: "Pour at the fair",
        cost: 3500,
        hint: "Prestige +7, Demand +4, House Style more artisan, adds a collector contract.",
        effect: s => {
          s.prestige += 7;
          s.profile = clamp((s.profile ?? 50) + 5, 0, 100);
          s.demand += 4;
          addOrder(s, "collector");
          log(s, "The fair drew devoted buyers. Prestige up, house style reinforced, a collector reached out.");
        }
      },
      {
        label: "Decline — preserve allocation",
        hint: "Prestige +1.",
        effect: s => { s.prestige += 1; log(s, "Politely declined. The invitation alone confirmed the estate's reputation."); }
      }
    ]
  },
  {
    id: "supermarket-pitch",
    title: "Supermarket Listing Offer",
    body: "A national grocery chain wants to list your wine across 200 stores. The volume would be transformative, but mass distribution pulls the brand toward the middle.",
    condition: s => (s.profile ?? 50) <= 40,
    minMonth: 6,
    choices: [
      {
        label: "Sign the listing",
        hint: "Cash +$18,000, Demand +10, Prestige −3, House Style more commercial, adds supermarket contract.",
        effect: s => {
          s.cash += 18000;
          s.profile = clamp((s.profile ?? 50) - 8, 0, 100);
          s.demand += 10;
          s.prestige -= 3;
          addOrder(s, "supermarket");
          log(s, "Listing signed. Volume and cash up, but the brand moved decisively commercial.");
        }
      },
      {
        label: "Decline — stay selective",
        hint: "Prestige +2, House Style slightly more artisan.",
        effect: s => { s.prestige += 2; s.profile = clamp((s.profile ?? 50) + 3, 0, 100); log(s, "Declining the listing protected the brand's positioning."); }
      }
    ]
  },

  // ── Terroir events ────────────────────────────────────────────
  {
    id: "napa-smoke",
    title: "Wildfire Smoke Advisory",
    body: "Smoke from nearby fires is drifting over the valley during veraison. Smoke taint at this stage is hard to reverse once it sets into the skins.",
    condition: s => s.region === "napa",
    minMonth: 6,
    choices: [
      { label: "Protective harvest pull", cost: 11000,
        hint: "Pick early to avoid taint — Quality −2 but harvest saved.",
        effect: s => { s.quality -= 2; s.morale += 3; log(s, "Early pull avoided taint. Slight quality cost, but the vintage is intact."); } },
      { label: "Wait and monitor",
        hint: "Quality −6 if smoke persists; 40% chance it clears.",
        effect: s => {
          if (rand() < 0.4) { log(s, "The smoke cleared before taint set. Vintage unaffected."); }
          else { s.quality -= 6; s.prestige -= 2; log(s, "Smoke taint crept into the skins. Quality took a significant hit."); }
        }}
    ]
  },
  {
    id: "napa-tourism",
    title: "Travel Magazine Feature",
    body: "A national travel magazine named Napa Valley America's top wine destination and mentioned your tasting room by name.",
    condition: s => s.region === "napa",
    choices: [
      { label: "Host a special weekend", cost: 5500,
        hint: "Demand +12, Prestige +5, Morale +3.",
        effect: s => { s.demand += 12; s.prestige += 5; s.morale += 3; log(s, "The weekend drew collectors and press. The name stuck."); } },
      { label: "Absorb the traffic quietly",
        hint: "Demand +5.",
        effect: s => { s.demand += 5; log(s, "Foot traffic was up for weeks. The estate gained quiet visibility."); } }
    ]
  },
  {
    id: "bordeaux-primeur",
    title: "En Primeur Approach",
    body: "A respected Bordeaux négociant wants to taste and quote futures on your next vintage, buying the right to purchase it before bottling at a fixed price.",
    condition: s => s.region === "bordeaux",
    minMonth: 5,
    choices: [
      { label: "Offer barrel samples",
        hint: "Cash +$22,000 now; next vintage cases pre-sold at a discount.",
        effect: s => {
          s.cash += 22000;
          s.influence += 4;
          s.demand += 5;
          addOrder(s, "distributor");
          log(s, "The négociant quoted well. Futures cash in hand, and the relationship opened distribution doors.");
        }},
      { label: "Decline — hold allocation",
        hint: "Prestige +2, Influence +1.",
        effect: s => { s.prestige += 2; s.influence += 1; log(s, "Holding allocation reinforced the estate's positioning as a direct-to-buyer producer."); } }
    ]
  },
  {
    id: "bordeaux-appellation",
    title: "Appellation Classification Review",
    body: "The appellation body is conducting a five-year quality review. Estates with strong barrel programs and track records of consistent prestige are eligible for classification upgrades.",
    condition: s => s.region === "bordeaux" && s.classification?.bordeaux !== "granted",
    minMonth: 12,
    choices: [
      { label: "Host the committee", cost: 8000,
        hint: "Prestige +8, Influence +5 if barrel program is strong; Prestige +3 otherwise.",
        effect: s => {
          const strong = (s.buildings.barrel || 0) >= 2 && s.prestige >= 40;
          s.prestige += strong ? 8 : 3;
          s.influence += strong ? 5 : 1;
          s.classification.bordeaux = strong ? "granted" : "deferred";
          log(s, strong ? "The committee was impressed. Classification standing was granted for this cycle." : "The visit went politely. Classification was deferred until the next review cycle.");
        }},
      { label: "Skip this cycle",
        hint: "No cost or penalty.",
        effect: s => { log(s, "The review cycle passed without engagement. The classification stayed flat."); } }
    ]
  },
  {
    id: "mendoza-hail",
    title: "Hailstorm Warning",
    body: "A localized storm cell is building over the Andes. Hail at fruit-set can shred clusters and spike disease pressure for the rest of the season.",
    condition: s => s.region === "mendoza",
    type: "rain",
    choices: [
      { label: "Emergency hail netting", cost: 13000,
        hint: "Vineyard fully protected — no damage.",
        effect: s => { s.morale += 2; log(s, "Netting held. The hailstorm passed without touching the fruit."); } },
      { label: "Take the risk",
        hint: "Disease +16–33 all blocks, health damage. 20% chance it misses.",
        effect: s => {
          if (rand() < 0.2) { log(s, "The storm tracked north and missed. Lucky."); return; }
          adjustRows(s, 3, "hail");
          log(s, "Hail shredded the upper canopy. Disease pressure climbed and the vintage took damage.");
        }}
    ]
  },
  {
    id: "mendoza-export",
    title: "Asian Buyer Tour",
    body: "A group of Asian wine importers is touring Mendoza specifically seeking premium Malbec allocations for the Hong Kong and Singapore markets.",
    condition: s => s.region === "mendoza",
    choices: [
      { label: "Host a vertical tasting", cost: 4000,
        hint: "Adds export order, Influence +4, Demand +6.",
        effect: s => { addOrder(s, "export"); s.influence += 4; s.demand += 6; log(s, "The tasting landed an export commitment and opened a new distribution channel."); } },
      { label: "Pass — focus domestic",
        hint: "Demand +3.",
        effect: s => { s.demand += 3; } }
    ]
  },
  {
    id: "mosel-botrytis",
    title: "Noble Rot Developing",
    body: "Botrytis cinerea is spreading through the late-harvest clusters in a way that could be either disaster or opportunity. A true Spätlese or Auslese requires patience and nerve.",
    condition: s => s.region === "mosel",
    minMonth: 7,
    choices: [
      { label: "Leave them — push for Spätlese",
        hint: "Vintage score +1 if it works; Quality −4, Disease +22 all blocks if conditions turn.",
        effect: s => {
          if (rand() < 0.55) {
            s.currentVintageScore = Math.min(5, (s.currentVintageScore || 3) + 1);
            s.prestige += 6;
            log(s, "Noble rot developed beautifully. The late-harvest lots carry extraordinary concentration.");
          } else {
            s.quality -= 4;
            adjustRows(s, 2, "botrytis");
            log(s, "The botrytis turned grey and spread. Disease pressure up, fruit compromised.");
          }
        }},
      { label: "Pick now — protect the vintage",
        hint: "Vintage score preserved, no disease risk.",
        effect: s => { s.morale += 1; log(s, "Clean pick secured. The fruit is bright if not transcendent."); } }
    ]
  },
  {
    id: "mosel-slate",
    title: "Slate Terrace Erosion",
    body: "Heavy autumn rains have loosened a section of the steep slate terracing. The undermined rows need attention before the next season or yield and health will suffer.",
    condition: s => s.region === "mosel",
    type: "rain",
    choices: [
      { label: "Emergency terrace repair", cost: 14000,
        hint: "Rows stabilised — no yield loss.",
        effect: s => { s.morale += 2; log(s, "The terraces were shored up before the frost set in."); } },
      { label: "Defer — monitor this season",
        hint: "Row health −8–15, yield risk next harvest.",
        effect: s => { s.rows.forEach(r => { r.health = clamp(r.health - randint(8, 15), 10, 100); }); log(s, "Deferred repairs cost vine health. The steep rows are fragile heading into dormancy."); } }
    ]
  },
  {
    id: "burgundy-premier-cru",
    title: "Premier Cru Classification Whisper",
    body: "Word has reached the Conseil that your parcel's consistent quality and elevation profile may qualify for a premier cru designation, but a formal application requires lobbying, documentation, and a memorable tasting.",
    condition: s => s.region === "burgundy" && s.prestige >= 55 && s.classification?.burgundy !== "granted",
    minMonth: 16,
    choices: [
      { label: "Pursue the classification", cost: 18000,
        hint: "Prestige +12, Demand +8, Influence +6.",
        effect: s => {
          s.prestige += 12;
          addChannelDemand(s, ["collector", "restaurant"], 8);
          s.influence += 6;
          s.classification.burgundy = "granted";
          log(s, "The designation was granted. Premier cru changes every conversation with buyers.");
        } },
      { label: "Stay unclassified — preserve identity",
        hint: "Prestige +3, House Style more artisan.",
        effect: s => { s.prestige += 3; s.profile = clamp((s.profile ?? 50) + 4, 0, 100); log(s, "Staying outside the classification reinforced the cult positioning."); } }
    ]
  },
  {
    id: "burgundy-negotiant",
    title: "Négociant Surplus Offer",
    body: "A prominent Burgundy négociant is offering access to surplus premier cru bulk wine. Blending it into your program would lift the lot, but purists would notice.",
    condition: s => s.region === "burgundy",
    choices: [
      { label: "Buy the surplus bulk", cost: 24000,
        hint: "Quality +8, adds a scored lot to the cellar pipeline.",
        effect: s => {
          s.quality += 8;
          s.vintages.push({ id: `nego-${s.month}`, year: START_YEAR + Math.floor((s.month - 1) / 12), score: 4, label: `${START_YEAR + Math.floor((s.month-1)/12)} Négociant Lot`, grapes: 0, bulkWine: 280, agingMonths: 999, agingTarget: 0, bottled: 0, purchased: true });
          log(s, "Négociant bulk added to the cellar pipeline. A quietly exceptional lot.");
        }},
      { label: "Decline — estate fruit only",
        hint: "Prestige +2.",
        effect: s => { s.prestige += 2; log(s, "Declining kept the provenance story clean."); } }
    ]
  },
  {
    id: "barossa-heat",
    title: "Extreme Heat Event",
    body: "A forecasted week of 112°F+ temperatures is arriving during crucial ripening. Without intervention, the fruit will cook on the vine.",
    condition: s => s.region === "barossa",
    choices: [
      { label: "Emergency irrigation and shade cloth", cost: 12000,
        hint: "Vintage protected — Quality −1 only.",
        effect: s => { s.quality -= 1; log(s, "Emergency measures protected the fruit. Modest quality cost for a clean vintage."); } },
      { label: "Accelerate harvest early",
        hint: "Quality −5, but vintage score held. Health −6 all rows from stress.",
        effect: s => {
          s.quality -= 5;
          s.rows.forEach(r => { r.health = clamp(r.health - 6, 10, 100); });
          log(s, "Early pull avoided the worst but the fruit was under-ripe. A commercial vintage at best.");
        }}
    ]
  },
  {
    id: "barossa-old-vine",
    title: "Old Vine Block Discovery",
    body: "A neighbouring property is selling a small parcel of 80-year-old Shiraz vines. Old vine fruit commands a serious premium and produces concentrated, complex wine.",
    condition: s => s.region === "barossa",
    minMonth: 8,
    choices: [
      { label: "Purchase the parcel", cost: 38000,
        hint: "Adds a mature vineyard row with Quality +4 and Prestige +3 on build.",
        effect: s => {
          s.quality += 4;
          s.prestige += 3;
          const oldVineWater = clamp((VARIETALS[s.varietal]?.optimalWater ?? 45) + Math.round(((REGION_CLIMATE[s.region]?.humidity ?? 0.55) - 0.55) * 15) + randint(-5, 5), 15, 80);
          s.rows.push({ id: s.rows.length + 1, name: "Old Vine Block", health: 90, disease: 8, water: oldVineWater, matureMonth: s.month, pressure: "old vines", threat: 1, threatName: "none", plantedYear: START_YEAR - 80 });
          log(s, "The old vine parcel joined the estate. 80-year-old Shiraz now anchors your flagship.");
        }},
      { label: "Pass — stay focused",
        hint: "No cost.",
        effect: s => { log(s, "The parcel sold to a neighbour. The old vines will benefit someone else's programme."); } }
    ]
  },
  {
    id: "piedmont-fog",
    title: "Autumn Fog Delay",
    body: "Persistent Langhe fog is delaying Nebbiolo harvest by weeks past the optimal window. The tannins need the hang time, but rot risk is climbing.",
    condition: s => s.region === "piedmont",
    minMonth: 8,
    choices: [
      { label: "Hold — pursue full phenolic ripeness",
        hint: "Vintage score +1 if conditions hold; Disease +16 all blocks if fog turns wet.",
        effect: s => {
          if (rand() < 0.5) {
            s.currentVintageScore = Math.min(5, (s.currentVintageScore || 3) + 1);
            s.prestige += 5;
            log(s, "Patience paid off. Full phenolic ripeness and a stunning vintage score.");
          } else {
            adjustRows(s, 2, "fog rot");
            log(s, "The fog turned wet. Disease climbed and the decision cost the vintage.");
          }
        }},
      { label: "Pick now — protect quality",
        hint: "Vintage score preserved, no disease risk.",
        effect: s => { log(s, "Early pick secured a clean vintage. The tannins are firm but the fruit is intact."); } }
    ]
  },
  {
    id: "piedmont-truffle",
    title: "Alba Truffle Fair",
    body: "The Alba White Truffle Fair brings food lovers and serious collectors from around the world directly to your cellar door. It is the highest-value hospitality moment of the Piedmontese calendar.",
    condition: s => s.region === "piedmont",
    choices: [
      { label: "Open the cellar for tastings", cost: 5000,
        hint: "Demand +10, Prestige +8, Morale +4, adds a collector contract.",
        effect: s => { s.demand += 10; s.prestige += 8; s.morale += 4; addOrder(s, "collector"); log(s, "The truffle fair brought collectors who understood exactly what Nebbiolo can become."); } },
      { label: "Skip — quiet harvest focus",
        hint: "Quality +1.",
        effect: s => { s.quality += 1; log(s, "Staying off the circuit kept harvest focused. The vintage benefited."); } }
    ]
  },
  {
    id: "rioja-consejo",
    title: "Consejo Regulador Inspection",
    body: "The Rioja Denominación de Origen regulatory council is conducting a compliance audit: barrel aging minimums, varietal composition, and cellar records.",
    condition: s => s.region === "rioja",
    choices: [
      { label: "Open the books and cellar",
        hint: "Influence +5, Prestige +3 if barrel program is compliant.",
        effect: s => {
          const compliant = (s.buildings.barrel || 0) >= 1;
          s.influence += compliant ? 5 : 1;
          s.prestige += compliant ? 3 : 0;
          if (!compliant) { s.cash -= 6000; log(s, "The audit found gaps. A fine was levied and the cellar program put on notice."); }
          else { log(s, "Full compliance. The Consejo noted the estate positively in its report."); }
        }},
      { label: "Lawyer up — limit access",
        hint: "Cash −$4,000, Influence −2, but no further exposure.",
        effect: s => { s.cash -= 4000; s.influence -= 2; log(s, "Legal protection limited the audit's reach. Expensive but contained."); } }
    ]
  },
  {
    id: "rioja-export",
    title: "Rioja Export Boom",
    body: "Spanish wine is having a major moment in Asian and American markets. A broker with strong Pacific Rim connections is specifically seeking Rioja with bottle age.",
    condition: s => s.region === "rioja",
    choices: [
      { label: "Build the relationship", cost: 3500,
        hint: "Adds export order, Demand +8, Influence +4.",
        effect: s => { addOrder(s, "export"); s.demand += 8; s.influence += 4; log(s, "The broker signed on. Pacific Rim access opened a channel that will grow with prestige."); } },
      { label: "Focus domestic for now",
        hint: "Demand +3.",
        effect: s => { s.demand += 3; } }
    ]
  },

  // ── New universal events ──────────────────────────────────────
  {
    id: "barrel-taint",
    title: "Corked Barrel Lot",
    body: "A buyer alerted you after smelling must on a recent barrel sample. A TCA-positive stave may have contaminated an entire batch. You need to decide quickly before more wine absorbs the taint.",
    choices: [
      { label: "Isolate, strip, and reblend", cost: 8000,
        hint: "Saves most of the lot — Quality −3, flaw risk on affected lots −12.",
        effect: s => {
          s.quality -= 3;
          (s.vintages || []).filter(v => v.bulkWine > 0).forEach(v => { v.flawRisk = Math.max(1, (v.flawRisk || 30) - 12); });
          log(s, "Tainted staves isolated and the lot reblended. Wine recovered, with modest quality cost.");
        }},
      { label: "Wait and monitor",
        hint: "40% chance it clears. Otherwise Quality −8, flaw risk +16 on active lots.",
        effect: s => {
          if (rand() < 0.4) { log(s, "The barrel sample was a false alarm — the rest of the lot is clean."); return; }
          s.quality -= 8;
          (s.vintages || []).filter(v => v.bulkWine > 0).forEach(v => { v.flawRisk = clamp((v.flawRisk || 30) + 16, 1, 95); });
          log(s, "TCA spread through the batch. The affected wine is compromised and flaw risk climbed.");
        }}
    ]
  },
  {
    id: "staff-poaching",
    title: "Headhunter Call",
    body: s => {
      const targetId = [...s.staff].sort((a, b) => (STAFF_POOL.find(p => p.id === b)?.salary || 0) - (STAFF_POOL.find(p => p.id === a)?.salary || 0))[0];
      const person = STAFF_POOL.find(p => p.id === targetId);
      const cost = money((person?.salary || 5000) * 3);
      return `${person?.name || "One of your team"} has been approached by a larger operation offering a meaningful raise. They're loyal, but asking you to match within the month. Matching costs ${cost} (3 months salary).`;
    },
    condition: s => s.staff.length >= 2,
    choices: [
      { label: "Match the offer", cost: 0,
        hint: "Costs 3 months of the target's salary. Staff retained, Morale +6.",
        effect: s => {
          const targetId = [...s.staff].sort((a, b) => {
            const pa = STAFF_POOL.find(p => p.id === a)?.salary || 0;
            const pb = STAFF_POOL.find(p => p.id === b)?.salary || 0;
            return pb - pa;
          })[0];
          const person = STAFF_POOL.find(p => p.id === targetId);
          const cost = (person?.salary || 5000) * 3;
          s.cash -= cost;
          s.morale += 6;
          log(s, `${person?.name.split(" ")[0] || "They"} accepted the retention offer. Morale lifted. Cost: ${money(cost)}.`);
        }},
      { label: "Let them walk",
        hint: "Staff member leaves. Morale −10, Quality −3.",
        effect: s => {
          const targetId = [...s.staff].sort((a, b) => {
            const pa = STAFF_POOL.find(p => p.id === a)?.salary || 0;
            const pb = STAFF_POOL.find(p => p.id === b)?.salary || 0;
            return pb - pa;
          })[0];
          const person = STAFF_POOL.find(p => p.id === targetId);
          s.staff = s.staff.filter(id => id !== targetId);
          if (!s.staffMarket.includes(targetId)) s.staffMarket.push(targetId);
          s.morale -= 10;
          s.quality -= 3;
          log(s, `${person?.name || "A key hire"} accepted the outside offer and left. The team felt it.`);
        }}
    ]
  },
  {
    id: "organic-cert",
    title: "Organic Certification Opportunity",
    body: "A certification body is running an accelerated audit for estates with documented spray records and a clean growing season. Organic status is a genuine signal to the buyers who care about it.",
    minMonth: 12,
    condition: s => !s.classification?.organic,
    choices: [
      { label: "Pursue certification", cost: 12000,
        hint: "Prestige +6, House Style more artisan, adds a collector order. Estate marked certified.",
        effect: s => {
          s.prestige += 6;
          s.profile = clamp((s.profile ?? 50) + 6, 0, 100);
          s.classification = s.classification || {};
          s.classification.organic = "granted";
          addOrder(s, "collector");
          log(s, "Organic certification granted. The credential opened new doors with collectors and natural wine channels.");
        }},
      { label: "Not the right time",
        hint: "Prestige +1.",
        effect: s => { s.prestige += 1; log(s, "Certification deferred. The documentation trail is there when the timing is better."); } }
    ]
  },
  {
    id: "equipment-fault",
    title: "Bottling Line Failure",
    body: "A seal failure mid-run halted the bottling line. Wine oxidised in the exposed section and the conveyor jammed. The repair needs to happen before the next run.",
    choices: [
      { label: "Emergency repair team", cost: 7500,
        hint: "Line restored immediately. Morale +2.",
        effect: s => { s.morale += 2; log(s, "Repair crew fixed the seal overnight. The line is back up."); } },
      { label: "Patch it in-house",
        hint: "Fatigue +7, Morale −3. 45% chance it fails again next bottling — Quality −4.",
        effect: s => {
          s.fatigue = clamp((s.fatigue || 0) + 7, 0, 100);
          s.morale -= 3;
          s.marketMods = s.marketMods || {};
          if (rand() < 0.45) s.marketMods.lineFault = true;
          log(s, "Patched in-house. It's running, but the fix is marginal.");
        }}
    ]
  },
  {
    id: "harvest-labor",
    title: "Harvest Labor Shortage",
    body: "Labor contractors are overbooked across the region. You can source day workers at a significant premium, or push your own crew through extended shifts before the fruit drops.",
    condition: s => ["Harvest", "Veraison"].includes(s.season),
    choices: [
      { label: "Pay premium day labor", cost: 9000,
        hint: "Harvest yield +12%, Morale +2.",
        effect: s => { s.marketMods = s.marketMods || {}; s.marketMods.harvestCrew = true; s.morale += 2; log(s, "Premium crews on. The harvest will come in clean and complete."); } },
      { label: "Push the crew",
        hint: "Fatigue +10, Morale −5. Yield unaffected, but the team will feel the month.",
        effect: s => {
          s.fatigue = clamp((s.fatigue || 0) + 10, 0, 100);
          s.morale -= 5;
          log(s, "The estate crew stretched to cover harvest. The fruit is in, but everyone is exhausted.");
        }},
      { label: "...", iniquity: true,
        condition: s => inWrath(s) && s.wrathState.seal >= 2,
        hint: null,
        effect: s => {
          s.marketMods = s.marketMods || {};
          s.marketMods.harvestCrew = true;
          s.morale += 4;
          s.wrathState.cup += 8;
          log(s, "The crews arrived before dawn and did not leave until the last block was done. No one asked where they came from.");
        }
      },
      { label: "Refuse the path offered", faithGain: 3,
        condition: s => inWrath(s) && s.wrathState.iniquityChoicesAccepted >= 1,
        hint: "Faith +3.",
        effect: s => { log(s, "The path was seen and refused."); }
      }
    ]
  },
  {
    id: "prestige-dinner",
    title: "Charity Wine Dinner",
    body: "A regional foundation is hosting a collector dinner and wants your estate to headline the wine program. Twenty seats, serious buyers, wine media in attendance — exactly the right crowd.",
    minMonth: 8,
    condition: s => s.prestige >= 45,
    choices: [
      { label: "Pour the flagship", cost: 4000,
        hint: "Prestige +8, Demand +6, Morale +4, adds a collector order.",
        effect: s => { s.prestige += 8; s.demand += 6; s.morale += 4; addOrder(s, "collector"); log(s, "The dinner was exceptional. Three collectors reached out directly for allocation."); } },
      { label: "Donate bottles instead",
        hint: "Prestige +3, Morale +2.",
        effect: s => { s.prestige += 3; s.morale += 2; log(s, "A generous donation. The foundation acknowledged the gift publicly."); } }
    ]
  },
  {
    id: "cellar-heat",
    title: "Fermentation Temperature Spike",
    body: "A heat wave pushed the cellar above optimal for three consecutive days. Active fermentations may have run too fast and hot — volatile acidity and off-aromas develop quickly in these conditions.",
    condition: s => (s.vintages || []).some(v => v.grapes > 0 || (v.bulkWine > 0 && (v.agingMonths || 0) < 3)),
    choices: [
      { label: "Emergency cooling and enzyme addition", cost: 6500,
        hint: "No quality damage. Morale +1.",
        effect: s => { s.morale += 1; log(s, "Cooling held the fermentation steady. No flaw development detected."); } },
      { label: "Monitor and adjust manually",
        hint: "50% chance: Quality −4, flaw risk +12 on active lots. 50%: fine.",
        effect: s => {
          if (rand() < 0.5) {
            s.quality -= 4;
            (s.vintages || []).filter(v => v.bulkWine > 0 && (v.agingMonths || 0) < 3).forEach(v => { v.flawRisk = clamp((v.flawRisk || 25) + 12, 1, 95); });
            log(s, "The heat got into the must. Flaw risk on young lots is elevated.");
          } else {
            log(s, "Fermentations ran warm but stayed clean. A close call.");
          }
        }}
    ]
  },
  {
    id: "used-barrels",
    title: "Second-Hand Barrel Lot",
    body: "A retiring winemaker is liquidating their cellar program — quality French oak, two to three years old, at roughly 60% of new price. These would add genuine barrel capacity immediately.",
    condition: s => (s.buildings.barrel || 0) < 4,
    choices: [
      { label: "Buy the lot", cost: 11000,
        hint: "Barrel level +1, Prestige +2.",
        effect: s => { s.buildings.barrel = (s.buildings.barrel || 0) + 1; s.prestige += 2; log(s, "The used oak joined the cellar. Solid barrels at a fraction of replacement cost."); } },
      { label: "Pass — new wood only",
        hint: "No effect.",
        effect: s => { log(s, "Passed on the offer. The program will stay with new wood on its own timeline."); } }
    ]
  },
  {
    id: "cork-tca",
    title: "Corked Bottle Complaint",
    body: "A restaurant buyer reported four corked bottles from the last allocation — musty, undrinkable. The claim is credible and the buyer is waiting to see how you respond.",
    minMonth: 8,
    condition: s => s.inventory.cases > 30,
    choices: [
      { label: "Replace and credit immediately", cost: 3500,
        hint: "Morale +4, Demand +2. Relationship preserved.",
        effect: s => { s.morale += 4; s.demand += 2; log(s, "Replacement cases delivered with a handwritten note. The buyer called it handled."); } },
      { label: "Dispute the claim",
        hint: "Demand −5, Prestige −3. Buyer trust damaged.",
        effect: s => { s.demand -= 5; s.prestige -= 3; addChannelTrust(s, "restaurant", -8); log(s, "The buyer didn't appreciate the pushback. The relationship cooled significantly."); } }
    ]
  },
  {
    id: "expansion-loan",
    title: "Agricultural Bank Offer",
    body: "The estate's track record has attracted a favorable capital offer from an agricultural bank — a low-rate infrastructure line specifically for winery expansion. The terms are genuine.",
    minMonth: 10,
    condition: s => (s.debt || 0) < 40000 && s.prestige >= 35,
    choices: [
      { label: "Draw $40,000 at favorable terms",
        hint: "Cash +$40,000, Debt +$40,000, Influence +2.",
        effect: s => { s.cash += 40000; s.debt = (s.debt || 0) + 40000; s.influence += 2; log(s, "Capital drawn. Favorable terms and a bank relationship that reflects the estate's standing."); } },
      { label: "Stay debt-free",
        hint: "Prestige +2, Morale +2.",
        effect: s => { s.prestige += 2; s.morale += 2; log(s, "Declined the offer. Remaining debt-free keeps the balance sheet clean and the team motivated."); } }
    ]
  },

  // ── New regional events ───────────────────────────────────────
  {
    id: "fingerlakes-comp",
    title: "Great Lakes Wine Challenge",
    body: "The Great Lakes regional competition is the most prominent event in the eastern US wine calendar. Judges from New York and Toronto are attending; press coverage is serious.",
    condition: s => s.region === "fingerlakes",
    choices: [
      { label: "Enter and pour", cost: 3500,
        hint: "Prestige +7, Demand +8 if quality is strong; Prestige +3, Demand +3 otherwise.",
        effect: s => {
          if (s.quality >= 78) {
            s.prestige += 7; s.demand += 8;
            log(s, "Strong showing at the Great Lakes Challenge. The judges noted the mineral precision — recognition followed.");
          } else {
            s.prestige += 3; s.demand += 3;
            log(s, "A respectable entry. The competition raised the estate's regional profile.");
          }
        }},
      { label: "Skip this year",
        hint: "Demand +1.",
        effect: s => { s.demand += 1; log(s, "Stayed out of the competition this cycle. The estate's focus remained on the vineyard."); } }
    ]
  },
  {
    id: "napa-earthquake",
    title: "Minor Earthquake Tremors",
    body: "A 3.8-magnitude tremor rattled the valley overnight. Some tanks shifted and the cellar structure needs inspection before the next bottling run.",
    condition: s => s.region === "napa",
    choices: [
      { label: "Full structural inspection and refit", cost: 8500,
        hint: "No damage, Morale +2.",
        effect: s => { s.morale += 2; log(s, "Inspection came back clean. Refit completed and the team was relieved."); } },
      { label: "Visual check only",
        hint: "40% chance of barrel damage — flaw risk +10 on active lots. 60%: fine.",
        effect: s => {
          if (rand() < 0.4) {
            (s.vintages || []).filter(v => v.bulkWine > 0).forEach(v => { v.flawRisk = clamp((v.flawRisk || 25) + 10, 1, 95); });
            log(s, "A cracked stave was found weeks later. Flaw risk ticked up on the affected lots.");
          } else {
            log(s, "Visual check passed. The cellar came through the tremor intact.");
          }
        }}
    ]
  },
  {
    id: "rioja-pavilion",
    title: "Madrid & Beyond Pavilion",
    body: "Spain's wine export body is organizing a premium pavilion at a major London trade show and offering Rioja producers with solid export records a subsidized spot. The audience is exactly the buyers you want.",
    condition: s => s.region === "rioja",
    minMonth: 6,
    choices: [
      { label: "Join the pavilion", cost: 5500,
        hint: "Demand +8, Prestige +5, Influence +4, adds an export order.",
        effect: s => { s.demand += 8; s.prestige += 5; s.influence += 4; addOrder(s, "export"); log(s, "The pavilion generated serious interest. Three export inquiries arrived within the week."); } },
      { label: "Skip — domestic priority",
        hint: "Demand +2.",
        effect: s => { s.demand += 2; log(s, "Skipped the pavilion. The domestic channel remained the focus this season."); } }
    ]
  },

  // ── Prestige-tier events (the top-end world) ──────────────────
  {
    id: "critic-pilgrimage",
    title: "A Legend Visits the Estate",
    body: "The most influential wine critic in the world has reached out directly to schedule a private vertical tasting at the estate. This is not a routine visit — estates at your level get one or two of these in a generation.",
    minMonth: 18,
    condition: s => s.prestige >= 88 && s.quality >= 86,
    choices: [
      { label: "Host a full vertical tasting", cost: 12000,
        hint: "Outcome scales with your track record. Consistent 90+ averages: Prestige +14, Demand +12, major collector surge. Lower averages: Prestige +5.",
        effect: s => {
          const mem = archiveMemory(s);
          if (mem.avgScore >= 90) {
            s.prestige += 14; s.demand += 12;
            addChannelTrust(s, "collector", 18); addChannelTrust(s, "restaurant", 10);
            addOrder(s, "collector"); addOrder(s, "collector");
            log(s, "The vertical was extraordinary. The critic's notes will be quoted for years. Collector demand surged overnight.");
          } else if (mem.avgScore >= 86) {
            s.prestige += 8; s.demand += 7;
            addChannelTrust(s, "collector", 10);
            addOrder(s, "collector");
            log(s, "A strong showing. The critic was impressed and said so publicly. Real momentum followed.");
          } else {
            s.prestige += 5; s.demand += 3;
            log(s, "The visit went well but the vertical showed the estate's inconsistency. Solid coverage, not legendary.");
          }
        }},
      { label: "Pour the current vintage only",
        hint: "Prestige +5, Demand +6. Safer, but a missed opportunity.",
        effect: s => { s.prestige += 5; s.demand += 6; addOrder(s, "collector"); log(s, "A focused tasting. The critic tasted the current release and wrote warmly. The door is open for a deeper visit later."); } }
    ]
  },
  {
    id: "auction-house",
    title: "Auction House Consignment",
    body: "Christie's Fine Wine division has approached you about featuring a vertical of your estate in their next major sale. The secondary market exposure is extraordinary — but consigning removes those bottles from your direct allocation.",
    minMonth: 20,
    condition: s => s.prestige >= 90 && (s.archive || []).filter(e => e.casesProduced > 0).length >= 3,
    choices: [
      { label: "Consign 30 bottles", cost: 0,
        hint: "Cash +$45,000–75,000 (scales with prestige), Prestige +10, major demand surge. Removes 30 cases from inventory.",
        effect: s => {
          const bottles = Math.min(30, s.inventory.cases);
          s.inventory.cases -= bottles;
          const proceeds = Math.round(35000 + (s.prestige - 90) * 3500);
          s.cash += proceeds;
          s.prestige += 10;
          addChannelDemand(s, ["collector", "club", "restaurant"], 8);
          addChannelTrust(s, "collector", 12);
          addOrder(s, "collector");
          log(s, `The Christie's sale hammered at ${money(proceeds)}. Every collector who missed the live auction is now on the mailing list.`);
        }},
      { label: "Decline — allocation stays with buyers",
        hint: "Prestige +6, Collector trust +10. Mystique preserved.",
        effect: s => { s.prestige += 6; addChannelTrust(s, "collector", 10); log(s, "Declining the consignment reinforced the estate's image as impossible to obtain through secondary channels. Collectors value that."); } }
    ]
  },
  {
    id: "three-star-placement",
    title: "Three-Star Restaurant Placement",
    body: "The head sommelier at a Michelin three-star restaurant has been quietly allocating your bottles for two years and wants to put you on the permanent wine list. This is the most prestigious restaurant placement possible — and a long-term commitment.",
    minMonth: 15,
    condition: s => s.prestige >= 87 && s.quality >= 86 && !s.classification?.threeStar,
    choices: [
      { label: "Accept and commit 24 cases per year",
        hint: "Permanent restaurant demand +8, Prestige +9, Restaurant trust +14. Estate marked as three-star listed.",
        effect: s => {
          s.prestige += 9;
          addChannelDemand(s, ["restaurant"], 8);
          addChannelTrust(s, "restaurant", 14);
          s.classification = s.classification || {};
          s.classification.threeStar = true;
          addOrder(s, "restaurant"); addOrder(s, "restaurant");
          log(s, "The placement is confirmed. Your label will appear on the same list as DRC and Chave. That context changes every conversation.");
        }},
      { label: "Decline — protect direct allocation",
        hint: "Collector demand +5, Prestige +5. Positions the estate as impossible to find through restaurants.",
        effect: s => { s.prestige += 5; addChannelDemand(s, ["collector"], 5); addChannelTrust(s, "collector", 8); log(s, "A polite decline. The sommelier respected it. Word that you turned down a three-star placement traveled fast."); } }
    ]
  },
  {
    id: "cult-phenomenon",
    title: "Cult Wine",
    body: "A brief mention in a private newsletter read by the right 400 people has turned your allocation into the most sought-after in the region overnight. You didn't engineer this — it happened. Your phone has not stopped.",
    minMonth: 24,
    condition: s => s.prestige >= 93,
    choices: [
      { label: "Raise price to reflect the tier",
        hint: "Demand +14, Prestige +8, price ceiling raised significantly. Collector orders flood in.",
        effect: s => {
          s.prestige += 8; s.demand += 14;
          s.profile = clamp((s.profile ?? 50) + 8, 0, 100);
          addChannelTrust(s, "collector", 15); addChannelTrust(s, "club", 10);
          addOrder(s, "collector"); addOrder(s, "collector"); addOrder(s, "collector");
          s.price = Math.min(profilePriceCeil(s), s.price + 8);
          log(s, "The price signal landed perfectly. Raising it accelerated demand. The estate is now in a category with very few others.");
        }},
      { label: "Hold price — let the wine speak",
        hint: "Prestige +16, Demand +8. Positions the estate as principled, not commercial. Enormous collector trust.",
        effect: s => {
          s.prestige += 16; s.demand += 8;
          addChannelTrust(s, "collector", 20); addChannelTrust(s, "club", 14);
          addOrder(s, "collector"); addOrder(s, "collector");
          log(s, "Not raising price during a cult moment was the move. The collectors who got allocation feel they're part of something that money alone can't buy.");
        }}
    ]
  },
  {
    id: "vertical-collector",
    title: "Collector's Vertical Dinner",
    body: "A longtime allocation customer has assembled every vintage you've produced and is hosting a private dinner for 20 collectors and two critics. They've asked you to attend and present. The room will contain people who influence where serious money goes.",
    minMonth: 24,
    condition: s => s.prestige >= 82 && (s.archive || []).filter(e => e.casesProduced > 0).length >= 3,
    choices: [
      { label: "Attend and present", cost: 4000,
        hint: "Outcome scales with consistency. Strong track record: Prestige +10, Demand +8, two collector orders. Inconsistent: Prestige +4, Demand +3.",
        effect: s => {
          const mem = archiveMemory(s);
          if (mem.avgScore >= 88 && mem.consistency >= 3) {
            s.prestige += 10; s.demand += 8;
            addChannelTrust(s, "collector", 12);
            addOrder(s, "collector"); addOrder(s, "collector");
            log(s, "The vertical told a coherent, compelling story. The critics in the room wrote about it. Two collectors reached out about direct allocation.");
          } else {
            s.prestige += 4; s.demand += 3;
            addChannelTrust(s, "collector", 4);
            log(s, "A good evening. The vertical showed an estate still finding its voice. The collectors were interested, not converted.");
          }
        }},
      { label: "Send bottles with personal notes",
        hint: "Prestige +4, Demand +3. Thoughtful but lower impact.",
        effect: s => { s.prestige += 4; s.demand += 3; log(s, "The dinner went ahead with your bottles and handwritten notes on each. A warm gesture that was appreciated without the full impact of your presence."); } }
    ]
  },
  {
    id: "secondary-market-record",
    title: "Auction Record",
    body: "A bottle from one of your sold-out vintages just set a new regional auction record. The hammer price was several times your original release price. Secondary market heat like this changes how buyers think about getting allocation.",
    condition: s => s.prestige >= 94 && archiveMemory(s).soldOutPrestige >= 1,
    choices: [
      { label: "Release a statement welcoming the recognition",
        hint: "Prestige +6, Demand +9, one new collector order.",
        effect: s => { s.prestige += 6; s.demand += 9; addOrder(s, "collector"); addChannelTrust(s, "collector", 8); log(s, "The statement ran in three publications. Every collector who's been watching from the sidelines is now inquiring about allocation."); } },
      { label: "Say nothing — let the market speak",
        hint: "Prestige +11. Silence signals the ultimate confidence.",
        effect: s => { s.prestige += 11; addChannelTrust(s, "collector", 14); log(s, "No comment from the estate. The silence traveled further than any press release could have."); } }
    ]
  },

  // ── Cellar fault events ───────────────────────────────────────
  {
    id: "mouse-taint",
    title: "Mouse Taint in the Cellar",
    body: "Your cellar hand caught something during routine barrel tasting: a mousey, biscuity off-character spreading through one of the active lots. Spoilage organism — almost certainly Lactobacillus or Brettanomyces working without the protection of sulfites. Caught early, but the window to act is short and none of the options are comfortable.",
    condition: s => (s.profile ?? 50) >= 55 && (s.vintages || []).some(v => v.bulkWine > 50),
    choices: [
      { label: "Pull and dump the affected portion",
        hint: "Lose 38% of the largest active bulk lot. Morale −5, Prestige −2. Reputation intact.",
        effect: s => {
          const lot = [...(s.vintages || [])].filter(v => v.bulkWine > 0).sort((a, b) => b.bulkWine - a.bulkWine)[0];
          if (lot) {
            const lost = Math.round(lot.bulkWine * 0.38);
            lot.bulkWine = Math.max(0, lot.bulkWine - lost);
            log(s, `${lost} CE of ${lot.label} poured out. Painful and expensive, but nothing mousey leaves this cellar.`);
          }
          s.morale -= 5; s.prestige -= 2;
        }},
      { label: "Emergency SO₂ addition to rescue the wine", cost: 4500,
        hint: "Wine largely saved (5% loss). House Style shifts commercial −12. Prestige −5. Collector trust −8 if you're a known natural producer.",
        effect: s => {
          const lot = [...(s.vintages || [])].filter(v => v.bulkWine > 0).sort((a, b) => b.bulkWine - a.bulkWine)[0];
          if (lot) {
            lot.bulkWine = Math.max(0, Math.round(lot.bulkWine * 0.95));
            lot.flawRisk = Math.max((lot.flawRisk || 25) - 8, 3);
          }
          const isNatural = (s.profile ?? 50) >= 65;
          s.prestige -= isNatural ? 10 : 5;
          s.profile = clamp((s.profile ?? 50) - 12, 0, 100);
          if (isNatural) {
            addChannelTrust(s, "collector", -10); addChannelTrust(s, "club", -6);
            log(s, "The SO₂ addition suppressed the spoilage. Most of the wine was saved — but word travels fast in natural wine circles. Collectors who trusted your no-intervention commitment are asking questions.");
          } else {
            log(s, "Sulfites suppressed the organism and the wine was largely recovered. A prestige cost, but manageable. The house style shifted a little more conventional.");
          }
        }},
      { label: "Release it — call it a living wine",
        hint: "No cost. For natural estates (profile ≥ 65): 55% chance collectors accept it. Otherwise, or on failure: Prestige −9, Demand −10, Collector trust −16.",
        effect: s => {
          const isNatural = (s.profile ?? 50) >= 65;
          if (isNatural && rand() < 0.55) {
            s.prestige -= 3;
            addChannelTrust(s, "collector", -3);
            log(s, "The release divided opinion. Most of your natural wine buyers accepted the character as honest expression. A vocal minority disagreed loudly. The estate said nothing and moved on.");
          } else {
            s.prestige -= 9; s.demand -= 10;
            addChannelTrust(s, "collector", -16); addChannelTrust(s, "restaurant", -10);
            const lot = [...(s.vintages || [])].filter(v => v.bulkWine > 0).sort((a, b) => b.bulkWine - a.bulkWine)[0];
            if (lot) lot.flawRisk = clamp((lot.flawRisk || 25) + 20, 1, 95);
            log(s, `The mousey character was unmistakable. Critics called it a fault. Several buyers returned cases. ${isNatural ? "Even sympathetic natural wine drinkers couldn't defend it." : "There was no charitable reading available."}`);
          }
        }}
    ]
  },

  // ── Commercial-end pressure events ───────────────────────────
  {
    id: "supermarket-renegotiation",
    title: "Supermarket Annual Review",
    body: "Your main grocery chain listing is up for renewal. The buyer wants a 12% price reduction or they'll cut your facing from four bottles to one — effectively a delist on a slow timeline. Volume brands live and die by these conversations.",
    condition: s => (s.profile ?? 50) <= 45 && s.channelDemand?.supermarket > 55,
    choices: [
      { label: "Accept the price reduction",
        hint: "Listing maintained. Revenue per case down ~12% via price pressure flag for 6 months.",
        effect: s => {
          s.marketMods.priceSqueeze = 6;
          addChannelTrust(s, "supermarket", 4);
          log(s, "Price concession accepted. The listing is safe for another year, but margins are thinner.");
        }},
      { label: "Hold price — they need a brand like yours",
        hint: "50% chance they accept. 50% chance: supermarket demand −18, trust −12.",
        effect: s => {
          if (rand() < 0.5) {
            addChannelTrust(s, "supermarket", 2);
            log(s, "They blinked. The listing held at your price. It won't always work.");
          } else {
            addChannelDemand(s, ["supermarket"], -18);
            addChannelTrust(s, "supermarket", -12);
            log(s, "The buyer went with a competitor. Supermarket facing cut to one bottle. That's a slow delist.");
          }
        }},
      { label: "Walk away from the channel",
        hint: "Supermarket demand reset to 0. Prestige +4, House Style more artisan.",
        effect: s => {
          s.channelDemand.supermarket = 0; s.channelTrust.supermarket = 20;
          s.prestige += 4; s.profile = clamp((s.profile ?? 50) + 6, 0, 100);
          log(s, "Walking away from the supermarket channel repositioned the brand. The trade noticed.");
        }}
    ]
  },
  {
    id: "distributor-ultimatum",
    title: "Distributor Wants Exclusivity",
    body: "Your largest distributor is threatening to drop your line unless you grant them regional exclusivity. They move serious volume — but exclusivity locks out smaller buyers and removes any leverage you have on price.",
    condition: s => (s.profile ?? 50) <= 55 && s.channelDemand?.distributor > 60 && s.month >= 8,
    choices: [
      { label: "Grant exclusivity",
        hint: "Distributor trust +14, demand +6 from their push. But export and restaurant channels lose some access.",
        effect: s => {
          addChannelTrust(s, "distributor", 14); addChannelDemand(s, ["distributor"], 6);
          addChannelDemand(s, ["export", "restaurant"], -4);
          s.marketMods.distributorExclusive = 12;
          log(s, "Exclusivity granted. They'll push hard, but you've handed them the leverage in every future conversation.");
        }},
      { label: "Decline and diversify",
        hint: "Distributor trust −10, demand −6. But you keep channel optionality.",
        effect: s => {
          addChannelTrust(s, "distributor", -10); addChannelDemand(s, ["distributor"], -6);
          addChannelDemand(s, ["export", "cellarDoor"], 4);
          log(s, "They cut the priority allocation. Painful now, but the channel mix stays yours to manage.");
        }}
    ]
  },
  {
    id: "brand-fatigue",
    title: "Brand Fatigue",
    body: "Your label has been on the same shelves in the same position for three years. A buyer research report landed in your inbox: 'familiar but uninspiring.' Consumers aren't switching away — they're just not excited.",
    condition: s => (s.profile ?? 50) <= 50 && s.month >= 24 && s.demand >= 70 && s.prestige < 60,
    choices: [
      { label: "Invest in a brand refresh", cost: 14000,
        hint: "Demand +10, Prestige +4. Resets commercial channel fatigue.",
        effect: s => {
          s.demand += 10; s.prestige += 4;
          addChannelDemand(s, ["distributor", "supermarket", "cellarDoor"], 6);
          addChannelTrust(s, "distributor", 5); addChannelTrust(s, "supermarket", 5);
          log(s, "New label, refreshed positioning, a short trade press hit. The shelves look different and buyers noticed.");
        }},
      { label: "Double down on price promotions", cost: 6000,
        hint: "Demand +6 short-term. House Style more commercial. Prestige −2.",
        effect: s => {
          s.demand += 6; s.prestige -= 2;
          s.profile = clamp((s.profile ?? 50) - 5, 0, 100);
          addChannelDemand(s, ["supermarket", "distributor"], 5);
          log(s, "The promo worked. Volume is up. But discounting trained buyers to wait for the deal.");
        }},
      { label: "Stay the course",
        hint: "Demand −4 over the next 3 months as fatigue compounds.",
        effect: s => {
          s.marketMods.brandFatigue = 3;
          log(s, "No change. The brand stays where it is. So does the fatigue.");
        }}
    ]
  },

  // ── Fall-from-grace consequences ──────────────────────────────
  {
    id: "three-star-delisting",
    title: "Three-Star Restaurant Reconsidering",
    body: "The head sommelier at the three-star restaurant where you're listed has reached out quietly. Recent vintages haven't met the standard they promised their guests. The placement is under review and they need an answer before the new season's list is printed.",
    condition: s => !!(s.classification?.threeStar) && s.quality < 82 && s.prestige < 80,
    choices: [
      { label: "Offer a private barrel tasting", cost: 6000,
        hint: "If quality is recovering (≥78): placement saved, Prestige +3. Otherwise: placement lost, Prestige −5.",
        effect: s => {
          if (s.quality >= 78) {
            s.prestige += 3; addChannelTrust(s, "restaurant", 6);
            log(s, "The barrel samples impressed them. The placement survives for now — but they'll be watching the next release.");
          } else {
            s.classification.threeStar = false;
            s.prestige -= 5; addChannelTrust(s, "restaurant", -12); addChannelDemand(s, ["restaurant"], -6);
            log(s, "The sommelier was apologetic but firm. The listing has been removed. Word will travel.");
          }
        }},
      { label: "Accept the decision gracefully",
        hint: "Placement lost. Prestige −3. But no further trust damage.",
        effect: s => {
          s.classification.threeStar = false;
          s.prestige -= 3; addChannelDemand(s, ["restaurant"], -4);
          log(s, "A graceful exit. The restaurant will remember that. The listing is gone, but the relationship isn't burned.");
        }}
    ]
  },
  {
    id: "fall-from-grace",
    title: "Questions About the Estate",
    body: "A prominent wine publication has run a piece asking whether the estate has lost its way. The article references your high-water mark vintage by name and compares the trajectory unfavorably to the last two releases. The trade has noticed.",
    condition: s => (s.legacyPressureMonths || 0) >= 4 && archiveMemory(s).bestScore >= 92,
    choices: [
      { label: "Give a candid interview about the difficult vintages",
        hint: "Prestige −3 short-term, but Collector trust +8 and Legacy pressure −3. Honesty builds long-term loyalty.",
        effect: s => {
          s.prestige -= 3; addChannelTrust(s, "collector", 8); addChannelTrust(s, "club", 5);
          s.legacyPressureMonths = Math.max(0, (s.legacyPressureMonths || 0) - 3);
          log(s, "The interview landed well. Admitting difficulty without excuses is rare in this industry. Collectors respected it.");
        }},
      { label: "Say nothing and let the wine answer",
        hint: "No immediate change. Legacy pressure continues — but if the next vintage scores 90+, it resets everything.",
        effect: s => {
          log(s, "No comment from the estate. The article ran. The industry is watching the next release.");
        }},
      { label: "Shift focus to hospitality and direct sales",
        hint: "Demand +5 from tasting room push. Prestige −2 (perceived retreat). Buys time.",
        effect: s => {
          s.demand += 5; s.prestige -= 2;
          addChannelDemand(s, ["cellarDoor"], 6); addChannelTrust(s, "cellarDoor", 6);
          log(s, "A pivot toward direct-to-consumer and hospitality. Smart commercially, but critics read it as an admission.");
        }}
    ]
  },

  // ── Vine disease ──────────────────────────────────────────────────────────
  {
    id: "vine-disease",
    title: "Trunk Disease in the Vineyard",
    body: "Your vineyard manager has confirmed it: esca or eutypa trunk disease is progressing through multiple blocks. The fungus travels through old pruning wounds and will slowly hollow out the wood. Every option is expensive in its own way.",
    minMonth: 18,
    condition: s => s.rows.length >= 2,
    choices: [
      { label: "Cut back infected wood aggressively",
        hint: "Surgical removal. Affected blocks lose 30-40 health and will need seasons to recover. Profile +3.",
        effect: s => {
          const count = Math.min(Math.ceil(s.rows.length * 0.45), s.rows.length);
          const worst = [...s.rows].sort((a, b) => a.health - b.health).slice(0, count);
          worst.forEach(r => { r.health = clamp(r.health - randint(30, 40), 10, 55); r.disease = clamp(r.disease + 8, 0, 75); });
          s.profile = clamp((s.profile ?? 50) + 3, 0, 100);
          log(s, `Trunk surgery completed on ${count} block${count > 1 ? "s" : ""}. The wood is clean but recovery will take several seasons.`);
        }},
      { label: "Apply a systemic fungicide program", cost: 14000,
        hint: "Disease pressure cut across all blocks. No block damage. Quality -3, Profile -4.",
        effect: s => {
          s.rows.forEach(r => { r.disease = Math.max(r.disease - randint(10, 16), 5); });
          s.quality -= 3;
          s.profile = clamp((s.profile ?? 50) - 4, 0, 100);
          log(s, "The fungicide program stabilized the spread. The disease is managed, not cured.");
        }},
      { label: "Rogue out the worst blocks and replant", cost: 20000,
        hint: "1-2 worst blocks removed and replanted. Young vines will not harvest for 3 seasons. Prestige +4.",
        effect: s => {
          const count = Math.min(Math.max(1, Math.floor(s.rows.length * 0.3)), 2);
          const worst = [...s.rows].sort((a, b) => a.health - b.health).slice(0, count);
          const replantYear = START_YEAR + Math.floor((s.month - 1) / 12);
          worst.forEach(r => { r.health = 30; r.disease = 4; r.matureMonth = s.month + 36; r.plantedYear = replantYear; });
          s.prestige += 4;
          log(s, `${count} block${count > 1 ? "s" : ""} pulled and replanted with resistant rootstock. Young vines take 3 seasons to bear. The estate is investing in the next decade.`);
        }}
    ]
  },

  // ── Finger Lakes ice wine ─────────────────────────────────────────────────
  {
    id: "fingerlakes-icewine",
    title: "Arctic Blast: Ice Wine Window",
    body: "A genuine freeze event is developing over the Finger Lakes. Temperatures are forecast to hit -10 C by dawn. Some clusters are still on vine, a deliberate late-harvest gamble. Ice wine requires picking frozen fruit and pressing it at below-zero temperatures, accepting a fraction of normal yield for extraordinary concentration.",
    condition: s => s.region === "fingerlakes" && s.season === "Harvest",
    choices: [
      { label: "Push for ice wine, pick at first freeze",
        hint: "55% chance: Prestige +12, Quality +8, Collector trust +6, cash +$18k. 45% chance: partial freeze. Quality -5, Morale -3.",
        effect: s => {
          if (rand() < 0.55) {
            s.prestige += 12;
            s.quality += 8;
            s.cash += 18000;
            addChannelTrust(s, "collector", 6); addChannelTrust(s, "restaurant", 4);
            log(s, "Frozen clusters pressed through the night. A true Eiswein-style release: tiny volume, extraordinary concentration. Collectors will pay serious money for it.");
          } else {
            s.quality -= 5;
            s.morale -= 3;
            log(s, "The freeze was partial. Clusters froze unevenly and concentration was inconsistent. An interesting wine, not the transcendent result the gamble needed.");
          }
        }},
      { label: "Pick now and protect the vintage",
        hint: "Normal harvest. No risk, no ice wine upside.",
        effect: s => {
          s.morale += 1;
          log(s, "A safe pick. The crew appreciated the call. Clean fruit, honest vintage.");
        }}
    ]
  },

  // ── Mendoza peso crisis ───────────────────────────────────────────────────
  {
    id: "mendoza-inflacion",
    title: "Peso Crisis: Export Window",
    body: "Argentina's peso has devalued sharply again. Your wine now costs 30% less in hard currency overnight. Export inquiries are flooding in from US and European importers who see an opening. The catch: imported French barrels and supplies are now priced in dollars, and local costs will follow.",
    condition: s => s.region === "mendoza",
    choices: [
      { label: "Ride the export surge, fill every order",
        hint: "Export demand +14, Trust +6, Cash +$9k from rushed forward contracts. Quality -2 from volume pressure.",
        effect: s => {
          addChannelDemand(s, ["export"], 14);
          addChannelTrust(s, "export", 6);
          s.cash += 9000;
          s.quality -= 2;
          addOrder(s, "export");
          log(s, "Orders from US and European importers arrived in a wave. Volume will stretch the cellar, but the dollars are real.");
        }},
      { label: "Lock in dollar-denominated contracts", cost: 8000,
        hint: "Export order added. Export trust +10. Prestige +4. Protected from future devaluation.",
        effect: s => {
          addOrder(s, "export");
          addChannelTrust(s, "export", 10);
          s.prestige += 4;
          log(s, "Forward contracts signed in USD. The terms are fixed regardless of where the peso goes from here. The estate now has serious international standing.");
        }},
      { label: "Pivot to native oak, cut imported barrel costs",
        hint: "French barrel costs avoided. Profile +5, Quality +2, Cash +$4k saved. No export windfall.",
        effect: s => {
          s.quality += 2;
          s.profile = clamp((s.profile ?? 50) + 5, 0, 100);
          s.cash += 4000;
          log(s, "Quebracho and native-oak alternatives sourced locally. Less French, more Argentine. The wine will taste like where it comes from.");
        }}
    ]
  },
  {
    id: "credit-ceiling",
    priority: true,
    title: "The Bank Has Reached Its Limit",
    body: "The account manager's call came Tuesday morning. The credit facility is at its ceiling and the bank is not extending further. Operating costs will continue regardless. The estate needs a solution — none of them comfortable.",
    condition: s => availableCredit(s) <= 15000 && s.debt > 30000 && s.month > 3,
    choices: [
      {
        label: "Emergency bridge loan",
        hint: "Cash +$70,000 at penalty rate (3.2%/mo). Credit line extended. Prestige −6, Morale −10.",
        effect: s => {
          const amount = 70000;
          s.creditLine += amount;
          ensureDebtLots(s);
          s.debtLots.push({ principal: amount, rate: 0.032, label: "Emergency bridge loan" });
          s.debt = Math.round(s.debtLots.reduce((t, l) => t + l.principal, 0));
          s.cash += amount;
          s.prestige = clamp(s.prestige - 6, 1, 120);
          s.morale = clamp(s.morale - 10, 1, 100);
          log(s, "Emergency capital secured at punishing terms — 3.2% monthly on the bridge. The estate is still operating.");
        }
      },
      {
        label: "Sell a vineyard block",
        hint: "Remove one block permanently for $45,000 cash. Less land means lower future harvests.",
        effect: s => {
          if (s.rows && s.rows.length > 1) {
            const block = s.rows.pop();
            s.cash += 45000;
            s.prestige = clamp(s.prestige - 4, 1, 120);
            s.morale = clamp(s.morale - 6, 1, 100);
            log(s, `The ${block.name} block sold at distress price. $45,000 arrived. One less row in the vineyard, permanently.`);
          } else {
            s.cash += 22000;
            s.prestige = clamp(s.prestige - 5, 1, 120);
            log(s, "Equipment and secondary assets liquidated. $22,000 arrived. Not much left to sell after this.");
          }
        }
      },
      {
        label: "Force-release wine early",
        hint: "Rush the most-ready lot to bulk buyers at 50% of retail. Prestige −8 but cash arrives this week.",
        effect: s => {
          const lots = (s.vintages || []).filter(v => v.bulkWine > 0);
          if (lots.length) {
            const lot = lots.sort((a, b) =>
              (b.agingMonths / Math.max(1, b.agingTarget)) - (a.agingMonths / Math.max(1, a.agingTarget))
            )[0];
            lot.agingMonths = Math.max(lot.agingMonths, lot.agingTarget);
            const cash = Math.round(lot.bulkWine * (s.price || 28) * 12 * 0.5);
            s.cash += cash;
            s.prestige = clamp(s.prestige - 8, 1, 120);
            s.morale = clamp(s.morale - 5, 1, 100);
            const label = lot.label;
            lot.bulkWine = 0;
            log(s, `${label} sold in bulk to a négociant at distress prices. ${money(cash)} arrived. The trade will notice the early release.`);
          } else {
            s.cash += 9000;
            log(s, "Remaining bottled inventory sold off. $9,000 recovered. It buys a month, no more.");
          }
        }
      }
    ]
  }
];

const ORDER_TYPES = {
  distributor: {
    name: "Regional Distributor",
    cases: [160, 420],
    price: [18, 34],
    due: [3, 6],
    prestige: 8
  },
  restaurant: {
    name: "Restaurant Group",
    cases: [60, 180],
    price: [26, 48],
    due: [2, 5],
    prestige: 22
  },
  club: {
    name: "Wine Club Shipment",
    cases: [80, 220],
    price: [32, 60],
    due: [2, 4],
    prestige: 30
  },
  export: {
    name: "Export Broker",
    cases: [250, 600],
    price: [15, 31],
    due: [4, 7],
    prestige: 14
  },
  supermarket: {
    name: "Supermarket Chain",
    cases: [350, 900],
    price: [10, 20],
    due: [3, 6],
    prestige: 4,
    maxProfile: 35   // only appears when estate is commercial-leaning
  },
  collector: {
    name: "Private Collector",
    cases: [18, 55],
    price: [58, 110],
    due: [2, 5],
    prestige: 55,
    minProfile: 65   // only appears when estate is artisan-leaning
  }
};

const ACTIONS = [
  {
    id: "vineyard",
    name: "Work Vineyard",
    detail: "Canopy management, irrigation checks, and disease scouting.",
    seasons: ["Budbreak", "Flowering", "Veraison", "Harvest"],
    consequence: s => {
      const avgD = Math.round(averageDisease(s));
      const avgW = Math.round(averageWater(s));
      return `Disease ${avgD} → ~${Math.max(0, avgD - 18)}. Water ${avgW}. Health +2.`;
    },
    cost: 2600,
    apply: s => {
      const vBonus = staffBonus(s, "vineyard");
      s.rows.forEach(row => {
        ensureRowFields(row);
        row.disease = clamp(row.disease - (16 + vBonus * 5) + randint(-3, 3), 0, 100);
        row.health  = clamp(row.health + 2 + vBonus, 8, 100);
        row.threat  = Math.round(row.disease / 11);
      });
      s.morale  += vBonus + 1;
      s.fatigue += 2;
      s.quality += 1 + vBonus;
      log(s, `Vineyard crew cleaned canopies and scouted disease. Average disease now ${Math.round(averageDisease(s))}.`);
    }
  },
  {
    id: "cellar",
    name: "Blend and Barrel",
    detail: "Fermentation, racking, blending, and barrel decisions.",
    consequence: "Uses grapes, creates bulk wine, raises quality and prestige.",
    cost: 3000,
    apply: s => {
      const capacity = 220 + s.buildings.tank * 120 + staffBonus(s, "cellar") * 70;
      const lot = (s.vintages || []).find(v => v.grapes > 0);
      const used = lot ? Math.min(lot.grapes, capacity) : 0;
      if (lot && used > 0) {
        lot.grapes -= used;
        lot.bulkWine += Math.round(used * 0.72);
        lot.flawRisk = clamp((typeof lot.flawRisk === "number" ? lot.flawRisk : baseLotFlawRisk(s, lot)) + Math.round(philosophy().risk * 4) - staffBonus(s, "cellar") * 2 - (s.buildings.lab || 0) * 2, 3, 80);
        const target = agingTarget(s);
        if (lot.agingTarget === 0 && target > 0) lot.agingTarget = target;
        const monthsLeft = Math.max(0, lot.agingTarget - lot.agingMonths);
        const ageStatus = monthsLeft === 0 ? "ready to bottle" : `${monthsLeft} month${monthsLeft !== 1 ? "s" : ""} until ready`;
        log(s, `Cellar work fermented ${Math.round(used)} CE from ${lot.label} — ${ageStatus}. Target: ${lot.agingTarget} months.`);
      } else {
        log(s, "Cellar work: blending, racking, and tasting with no unfermented grapes on hand.");
      }
      s.quality += 2 + s.buildings.barrel + staffBonus(s, "cellar");
      s.prestige += Math.max(1, Math.floor((s.buildings.barrel * varietal(s).barrelNeed) / 2));
      s.fatigue += 3;
    }
  },
  {
    id: "bottle",
    name: "Bottle Cases",
    detail: "Bottle finished wine into sellable cases.",
    seasons: ["Budbreak", "Flowering", "Veraison", "Harvest", "Cellar", "Dormant"],
    consequence: "Uses aged bulk wine and glass; creates sellable cases.",
    cost: 2400,
    apply: s => {
      const glassPenalty = s.marketMods.glassShortage ? 0.72 : 1;
      if (s.marketMods.lineFault) {
        log(s, "The patched bottling line seized mid-run. Capacity halved this month.");
        delete s.marketMods.lineFault;
      }
      const lineFaultPenalty = s.marketMods.lineFault ? 0.5 : 1;
      const capacity = Math.floor((280 + s.buildings.line * 170 + staffBonus(s, "bottling") * 95) * glassPenalty * lineFaultPenalty);
      const ready = readyVintages(s);
      if (!ready.length) { log(s, "No wine has finished aging yet."); return; }
      const lot = ready[0];
      applyBottlingFlawCheck(s, lot);
      const bulkAvail = Math.min(lot.bulkWine, capacity);
      const cases = Math.floor(Math.min(bulkAvail, s.inventory.glass));
      if (cases <= 0) return;
      lot.bulkWine -= cases;
      lot.bottled = (lot.bottled || 0) + cases;
      s.inventory.glass -= cases;
      s.inventory.cases += cases;
      s.cash -= Math.round(cases * bottlingCost(s));
      // Inert gas (line tier 2) bumps effective vintage score at bottling
      const inertGasBonus = (s.buildings.line || 0) >= 2 ? 0.05 : 0;
      // Extended maceration suite (tank tier 5) gives +1 effective vintage score
      const macerationBonus = (s.buildings.tank || 0) >= 5 ? 1 : 0;
      const effectiveScore = clamp(lot.score + macerationBonus, 1, 5);
      s.currentVintageScore = inertGasBonus > 0
        ? Math.min(5, effectiveScore + (rand() < inertGasBonus * 10 ? 1 : 0))
        : effectiveScore;
      if (!lot.criticScore) {
        lot.criticScore = calcCriticScore(effectiveScore, s.quality);
        if (lot.dominantMaturity === "old vine") {
          lot.criticScore = Math.min(lot.criticScore + 3, 100);
          s.prestige += 2;
        }
        recordArchiveBottling(s, lot, cases);
        applyReleaseExpectations(s, lot);
        const oldVineNote = lot.dominantMaturity === "old vine" ? " Old vine origin — critic score +3." : "";
        log(s, `Bottled ${cases} cases from ${lot.label} — ${lot.bulkWine} CE remaining. ${vintageScoreLabel(effectiveScore)} vintage (${vintageScoreStars(effectiveScore)}) · critic score ${lot.criticScore}/100.${oldVineNote}`);
        if (effectiveScore >= 4 && !s.pendingNaming) s.pendingNaming = lot.id;
      } else {
        recordArchiveBottling(s, lot, cases);
        log(s, `Bottled ${cases} cases from ${lot.label} — ${lot.bulkWine} CE remaining.`);
      }
      s.fatigue += 2;
    }
  },
  {
    id: "sales",
    name: "Sell and Court Buyers",
    detail: "Generate direct sales, new orders, and market heat.",
    seasons: ["Budbreak", "Flowering", "Veraison", "Harvest", "Cellar", "Dormant"],
    consequence: "Sells unreserved cases and may create a buyer request.",
    cost: 1800,
    apply: s => {
      const direct = directSales(s);
      s.inventory.cases -= direct.cases;
      s.cash += direct.revenue;
      s.totalSold += direct.cases;
      s.totalRevenue += direct.revenue;
      recordArchiveSale(s, direct.cases, direct.revenue, direct.channel);
      addChannelDemand(s, ["restaurant", "distributor", "export", "collector"], 1 + staffBonus(s, "sales"));
      addChannelDemand(s, ["cellarDoor"], 2 + staffBonus(s, "brand"));
      if (rand() < 0.75) addOrder(s);
      s.fatigue += 1;
      log(s, `Direct channels sold ${direct.cases} cases for ${money(direct.revenue)}.`);
    }
  },
  {
    id: "hospitality",
    name: "Run Hospitality",
    detail: "Open the tasting room. Visitor numbers peak in harvest season and dip in winter, but you can always open the door.",
    consequence: "Sells premium cases, raises demand, prestige, and morale.",
    cost: 1600,
    apply: s => {
      const visitorSeasonMod = { Dormant: 0.55, Budbreak: 0.8, Flowering: 0.9, Veraison: 1.0, Harvest: 1.15, Cellar: 0.7 }[s.season] ?? 1.0;
      const visits = Math.floor((80 + s.buildings.room * 70) * (0.7 + s.demand / 130) * visitorSeasonMod);
      const cases = Math.min(availableCases(s), Math.floor(visits / 8));
      const revenue = cases * Math.round(s.price * 12 * 1.35);
      s.inventory.cases -= cases;
      s.cash += revenue + visits * 14;
      s.totalSold += cases;
      s.totalRevenue += revenue + visits * 14;
      recordArchiveSale(s, cases, revenue, "cellarDoor");
      s.morale += 3 + staffBonus(s, "hospitality");
      s.prestige += 1 + Math.floor(s.buildings.room / 2);
      if (cases > 0) {
        addChannelDemand(s, ["cellarDoor"], 2 + staffBonus(s, "hospitality"));
        addChannelDemand(s, ["club"], 1 + Math.floor(staffBonus(s, "hospitality") / 2));
      } else {
        addChannelDemand(s, ["cellarDoor"], 1);
        addChannelTrust(s, "club", -1);
      }
      s.fatigue += Math.max(1, Math.round(visits / 120) - staffBonus(s, "hospitality"));
      const quietNote = s.season === "Dormant" ? " (quiet season)" : "";
      log(s, cases > 0
        ? `Hospitality hosted ${visits} guests${quietNote} and sold ${cases} premium cases.`
        : `Hospitality hosted ${visits} guests${quietNote}, but there was no allocation to sell. Interest rose a little; club patience slipped.`);
    }
  },
  {
    id: "finance",
    name: "Negotiate and Hedge",
    detail: "Talk to banks, suppliers, landlords, and grant programs.",
    consequence: "Adds cash and influence, but cools demand slightly.",
    cost: 800,
    apply: s => {
      const gain = 5500 + staffBonus(s, "finance") * 2200 + Math.floor(s.influence * 120);
      s.cash += gain;
      s.influence += 2;
      addChannelDemand(s, ["distributor", "export", "mass"], 1);
      addChannelDemand(s, ["collector"], -1);
      s.fatigue += 1;
      log(s, `Finance found ${money(gain)} in grants, rebates, and better terms.`);
    }
  },
  {
    id: "tithe",
    name: "Tithe",
    detail: "Give a portion of the estate's cash to the parish poor. The widow's mite — only counted if it costs the estate meaningfully.",
    cost: 4000,
    consequence: "Faith +3 if the gift represents a real share of cash on hand.",
    hidden: s => !inWrath(s) || !hasStaff(s, "vintner"),
    available: s => inWrath(s) && hasStaff(s, "vintner") && s.wrathState.seal >= 1,
    apply: s => {
      const fraction = 4000 / Math.max(1, s.cash + 4000);
      const earned = fraction > 0.08 ? 3 : 1;
      s.wrathState.faith = clamp(s.wrathState.faith + earned, 0, s.wrathState.faithCap);
      log(s, earned > 1
        ? "Father Aurelian carried the gift to the village. The estate's cash is meaningfully thinner. Faith earned."
        : "The gift was given. It did not cost the estate much. Faith earned modestly.");
    }
  },
  {
    id: "vigil",
    name: "Keep Vigil",
    detail: "Rest. Watch. Do not demand more of the team. Replaces heroics during corruption.",
    cost: 0,
    consequence: "Fatigue −10, Faith +2. Heroics streak resets.",
    hidden: s => !inWrath(s) || !hasStaff(s, "vintner"),
    available: s => inWrath(s) && hasStaff(s, "vintner") && s.wrathState.seal >= 1,
    apply: s => {
      s.fatigue = Math.max(0, s.fatigue - 10);
      s.heroicsStreak = 0;
      s.wrathState.faith = clamp(s.wrathState.faith + 2, 0, s.wrathState.faithCap);
      log(s, "The crew was sent home early. The vintner worked alone in the cellar. The night was quiet.");
    }
  },
  {
    id: "heroics",
    name: s => wrathLabel(s, "Ask for Heroics", [[6, "Compel them"], [3, "Drive the crew"]]),
    detail: "Borrow one more push from the team this month.",
    seasons: ["Budbreak", "Flowering", "Veraison", "Harvest", "Cellar", "Dormant"],
    consequence: "Gain +1 placement now. Fatigue +14; repeated use risks burnout.",
    cost: 0,
    apply: s => {
      s.heroicsUsedMonth = s.month;
      s.heroicsTotal = (s.heroicsTotal || 0) + 1;
      s.actionsLeft += 2; // one extra net placement after this action is spent
      s.fatigue += 14 + Math.max(0, (s.heroicsStreak || 0) * 4);
      s.heroicsStreak = (s.heroicsStreak || 0) + 1;
      if (s.heroicsStreak >= 3) {
        s.morale -= 8;
        log(s, "The team delivered, but repeated heroics are becoming a burnout problem.");
      } else {
        log(s, "The team found one more gear. This month gained an emergency placement.");
      }
    }
  },
  {
    id: "upgrade",
    name: "Upgrade Estate",
    detail: "Open the Estate pane to add blocks, tanks, barrels, labs, bottling, or hospitality.",
    seasons: ["Budbreak", "Flowering", "Veraison", "Harvest", "Cellar", "Dormant"],
    consequence: "Building an upgrade spends cash and one monthly placement.",
    cost: 0,
    navigateTab: "estate"
  },
  {
    id: "seasonal",
    name: s => seasonalAction(s).name,
    detail: "Do the work that only matters right now.",
    cost: 2200,
    seasons: ["Budbreak", "Flowering", "Veraison", "Harvest", "Cellar", "Dormant"],
    consequence: s => seasonalAction(s).consequence,
    apply: s => {
      s.seasonalUsedMonth = s.month;
      if (s.season === "Budbreak") {
        // Spray program: deep disease knockdown + frost protection
        s.marketMods.frostReady = 3;
        s.rows.forEach(row => {
          ensureRowFields(row);
          row.disease = clamp(row.disease - (28 + randint(0, 8)), 0, 100);
          row.threat  = Math.round(row.disease / 11);
          row.pressure = "sprayed";
        });
        s.quality += 1;
        s.fatigue += 1;
        log(s, `Spray program knocked disease pressure down to ${Math.round(averageDisease(s))} avg. Frost protection ready.`);
      } else if (s.season === "Flowering") {
        // Canopy thinning: disease down, water normalised slightly, quality up
        s.rows.forEach(row => {
          ensureRowFields(row);
          row.disease = clamp(row.disease - (20 + randint(0, 6)), 0, 100);
          row.water   = clamp(row.water + (row.water < (VARIETALS[s.varietal]?.optimalWater ?? 45) ? 5 : -5), 0, 100);
          row.threat  = Math.round(row.disease / 11);
          row.pressure = "canopy thinned";
        });
        s.quality += 2;
        s.fatigue += 1;
        log(s, `Canopy thinning opened the fruit zone. Disease ${Math.round(averageDisease(s))}, water ${Math.round(averageWater(s))}.`);
      } else if (s.season === "Veraison") {
        // Green harvest: sacrifice ~20% yield in exchange for quality + disease cleanup
        s.greenHarvestYear = START_YEAR + Math.floor((s.month - 1) / 12);
        s.marketMods.greenHarvest = 1;
        s.rows.forEach(row => {
          ensureRowFields(row);
          row.disease = clamp(row.disease - 12, 0, 100);
          row.health  = clamp(row.health + 4, 8, 100);
          row.threat  = Math.round(row.disease / 11);
          row.pressure = "green harvested";
        });
        s.quality += 4;
        addChannelDemand(s, ["collector", "restaurant"], 1);
        s.profile = (s.profile ?? 50) + 3;
        s.fatigue += 2;
        log(s, "Green harvest dropped 20% of the crop to concentrate the remaining fruit. Quality up sharply.");
      } else if (s.season === "Harvest") {
        if (isHarvestMonth(s.month, s.region)) {
          s.marketMods.harvestCrew = 2;
          s.quality += 3;
          s.morale  -= 1;
          s.fatigue += 4;
          log(s, "Selective picking crews are booked for harvest.");
        } else {
          s.rows.forEach(row => {
            ensureRowFields(row);
            row.disease = clamp(row.disease - 10, 0, 100);
            row.threat  = Math.round(row.disease / 11);
          });
          s.quality += 1;
          s.fatigue += 1;
          log(s, "Post-harvest vineyard walk: disease pressure eased.");
        }
      } else if (s.season === "Cellar") {
        const ready = readyVintages(s);
        const lot = ready[0] || null;
        const cases = lot ? Math.min(lot.bulkWine, 90 + staffBonus(s, "cellar") * 25) : 0;
        if (lot && cases > 0) {
          lot.flawRisk = clamp((lot.flawRisk || baseLotFlawRisk(s, lot)) - (12 + staffBonus(s, "cellar") * 3 + (s.buildings.lab || 0) * 3), 1, 80);
          lot.bulkWine -= cases;
          lot.bottled = (lot.bottled || 0) + cases;
          s.inventory.cases += Math.round(cases * 0.95);
          log(s, `Cellar topping and racking finished ${cases} cases from ${lot.label}.`);
        } else {
          (s.vintages || []).forEach(lot => {
            if (lot.bulkWine > 0) lot.flawRisk = clamp((lot.flawRisk || baseLotFlawRisk(s, lot)) - 7 - staffBonus(s, "cellar") * 2, 1, 80);
          });
          log(s, "Cellar topping and racking tightened the post-harvest pipeline.");
        }
        s.quality += 1;
      } else {
        // Dormant — winter pruning recovers health and resets water toward neutral
        s.rows.forEach(row => {
          ensureRowFields(row);
          row.health  = clamp(row.health + 6, 20, 100);
          row.water   = clamp(row.water + (row.water < (VARIETALS[s.varietal]?.optimalWater ?? 50) ? 8 : -4), 20, 80);
          row.disease = clamp(row.disease - 8, 0, 100);
          row.threat  = Math.round(row.disease / 11);
          row.pressure = "pruned";
        });
        s.quality += 1;
        s.morale  += 2;
        s.fatigue = Math.max(0, s.fatigue - 8 - staffBonus(s, "finance") * 2);
        s.marketMods.winterPlan = 8;
        log(s, "Winter planning and pruning recovered vine health, reset soil moisture, and gave next year's operations a cleaner plan.");
      }
    }
  },
  {
    id: "natural-cellar",
    name: "Natural Cellar Pass",
    detail: "Skip fining and filtration. Lower-intervention handling shifts the house style toward artisan and rewards wines that can stand on their own.",
    cost: 1800,
    seasons: ["Cellar", "Dormant"],
    consequence: "Profile +6 toward artisan. Quality +2. Best paired with concrete-egg tanks or Grand Cru barrels.",
    apply: s => {
      s.naturalCellarUsedMonth = s.month;
      s.profile = clamp((s.profile ?? 50) + 6, 0, 100);
      s.quality += 2;
      s.prestige += (s.buildings.tank || 0) >= 3 || (s.buildings.barrel || 0) >= 4 ? 2 : 0;
      (s.vintages || []).forEach(lot => {
        if (lot.bulkWine > 0) lot.flawRisk = clamp((lot.flawRisk || baseLotFlawRisk(s, lot)) + 8 - staffBonus(s, "cellar"), 1, 90);
      });
      addChannelDemand(s, ["collector"], 3);
      addChannelDemand(s, ["mass", "distributor"], -2);
      log(s, `Natural cellar pass complete. House style shifted to ${profileLabel(s.profile)} (${s.profile}).`);
    }
  }
];

const app = document.getElementById("app");
let state = null;
let setup = { region: "napa", varietal: "cabernet", philosophy: "classic", difficulty: "estate", wineryName: "" };
let setupStep = 0;
let setupMode = "start"; // "start" | "custom"
let activeTab = "overview";
let helpOpen = true;
let guideStep = null;
let noHelpModalOpen = false;

const SETUP_STEPS = [
  { key: "region", title: "Choose Region", kicker: "Where the estate lives shapes weather, prestige, land cost, and grape options." },
  { key: "varietal", title: "Choose Grape", kicker: "Your flagship grape determines yield, demand, cellar needs, and fragility." },
  { key: "philosophy", title: "Choose Style", kicker: "The house philosophy changes yield, quality, risk, sustainability, and costs." },
  { key: "difficulty", title: "Choose Difficulty", kicker: "Difficulty sets starting debt, lease pressure, credit line, inventory, and margin for error." }
];

const RANDOM_WINERY_NAMES = [
  "Stonegate Cellars",
  "Madrone Hill",
  "Clos Ember",
  "Riverbench Estate",
  "North Slope Wine Co.",
  "The Weathered Barrel",
  "Larkspur Domaine",
  "Red Lantern Vineyard",
  "Fogline Cellars",
  "Terrace & Thistle",
  "Juniper Road Estate",
  "Old Mill Vintners"
];

const CHANNEL_SOFT_CAPS = {
  cellarDoor: 112,
  club: 105,
  restaurant: 98,
  distributor: 94,
  export: 96,
  collector: 92,
  mass: 88
};

const TABS = [
  { id: "overview", name: "Overview", tip: "A short operating brief and the highest-level estate signals." },
  { id: "vineyard", name: "Vineyard", tip: "Weather, row health, disease pressure, and harvest risk." },
  { id: "cellar", name: "Cellar", tip: "Vintage lots in aging, cellar archives, and bulk wine management." },
  { id: "commercial", name: "Commercial", tip: "Bottle pricing, direct sales forecast, buyer contracts, and order timing." },
  { id: "estate", name: "Estate", tip: "Capital upgrades that compound your production engine." },
  { id: "people", name: "People", tip: "Senior staff, payroll, traits, and morale pressure." }
];

const ACTION_XP = {
  vineyard: ["ines"],
  cellar: ["marco"],
  bottle: ["marco", "samir"],
  sales: ["asha", "lucy"],
  hospitality: ["beatrice", "lucy"],
  finance: ["omar", "samir"]
};

const SEASONAL_ACTIONS = {
  Budbreak: {
    name: "Spray Program",
    detail: "Full spray pass to knock back early fungal pressure before the season accelerates. Sets up frost protection too.",
    consequence: "Disease −28 all rows, frost defenses ready, quality +1."
  },
  Flowering: {
    name: "Canopy Thinning",
    detail: "Open the fruit zone to air and light, reducing fungal risk during the sensitive fruit-set window.",
    consequence: "Disease −20 all rows, water normalised, quality +2."
  },
  Veraison: {
    name: "Green Harvest",
    detail: "Drop ~20% of the crop to concentrate sugars and flavour in the remaining fruit.",
    consequence: "Yield −20%, disease down, quality +4, demand +1."
  },
  Harvest: {
    name: "Selective Picking",
    detail: "Book crews and pick the best fruit before weather or overripeness bites.",
    consequence: "Book harvest crews, improve crop capture, quality +3."
  },
  Cellar: {
    name: "Rack and Top",
    detail: "Top barrels, rack lots, and move wine toward finished cases.",
    consequence: "Move ready bulk wine toward cases, quality +1."
  },
  Dormant: {
    name: "Winter Planning",
    detail: "Prune vines, review release allocation, schedule maintenance, and let the crew recover before spring.",
    consequence: "Health +6, disease −8, fatigue down, next-year operations cleaner."
  }
};

// Named-release name pools keyed by profile tier
const VINTAGE_NAMES = {
  cult: [
    "Clos", "Sans Soufre", "Sauvage", "Libre", "Primitif",
    "Amphorae", "Vivant", "Natif", "Brut Nature", "Mémoire",
    "Terroir Pur", "Vrai", "Instinct", "Organique", "Unfiltered"
  ],
  artisan: [
    "Reserve", "Old Block", "Heritage Cuvée", "Barrel Select", "Lieu-Dit",
    "Single Vineyard", "Vieilles Vignes", "Old Vine", "Estate Select",
    "Clos Select", "Parcelle", "Block Reserve", "Monopole", "Cru Select", "Terroir"
  ],
  classic: [
    "Estate Selection", "Grand Reserve", "Prestige Cuvée", "Flagship", "Anniversary",
    "Premier Cuvée", "Grand Millésime", "Proprietor's Reserve", "Winemaker's Selection",
    "Signature Reserve", "Exceptional Harvest", "Prestige", "Heritage", "Legacy", "Distinction"
  ],
  commercial: [
    "Signature", "House Select", "Proprietor's", "Classic Reserve", "Celebracion",
    "Estate Classic", "Valley Selection", "Heritage Reserve", "Special Edition",
    "Founder's Reserve", "Vintner's Select", "Seasonal Pick", "Winemaker's Touch"
  ]
};

const REGIONAL_VINTAGE_NAMES = {
  napa:       ["Mountain Block", "Oakville Select", "Stag's Flight", "Rutherford Bench", "Hillside Reserve"],
  bordeaux:   ["Millésime", "Réserve du Château", "Grand Vin", "Cuvée Principale", "Exception"],
  burgundy:   ["Premier Cru", "Climat", "Clos du Domaine", "Vieilles Parcelles", "Monopole"],
  mosel:      ["Spätlese", "Grosse Lage", "Alte Reben", "Erste Lage", "Goldkapsel"],
  barossa:    ["Ancestor Vine", "Ironbark", "Greenock Block", "Centenarian", "Old Pressings"],
  mendoza:    ["Gran Reserva", "Alto Block", "Finca Select", "Terruño", "Piedra Negra"],
  piedmont:   ["Riserva", "Sorì", "Vigna Speciale", "Bricco Select", "Cru Storico"],
  rioja:      ["Gran Reserva", "Vendimia Seleccionada", "Finca Select", "Pagos", "Sierra Select"],
  fingerlakes: ["Lake Effect", "Schist Block", "Seneca Reserve", "Glacial Till", "North Shore"],
};

const AGING_TARGETS = {
  sauvignon: 3, riesling: 3, chardonnay: 5, pinot: 6,
  merlot: 5, malbec: 6, cabernet: 8, shiraz: 7, gamay: 2,
  nebbiolo: 10, tempranillo: 7, cabfranc: 5
};
const REGION_AGING_BONUS = { bordeaux: 2, burgundy: 3, napa: 1, mosel: 0, mendoza: 0, barossa: 0, piedmont: 3, rioja: 1, fingerlakes: 0 };

function rand() {
  return Math.random();
}

function wineryInitials(name) {
  if (!name) return "CB";
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words.slice(0, 2).map(w => w[0].toUpperCase()).join("");
}

function randint(min, max) {
  return Math.floor(min + rand() * (max - min + 1));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function money(value) {
  const sign = value < 0 ? "-" : "";
  return `${sign}$${Math.abs(Math.round(value)).toLocaleString()}`;
}

function shortMoney(v) {
  const sign = v < 0 ? "-" : "";
  const abs = Math.abs(v);
  if (abs >= 1000000) return `${sign}$${(abs / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  if (abs >= 1000) return `${sign}$${Math.round(abs / 1000)}k`;
  return `${sign}$${Math.round(abs)}`;
}

function currentDateLabel(s = state) {
  return monthDateLabel(s.month, false);
}

function monthDateLabel(month, short = true) {
  const index = START_MONTH_INDEX + month - 1;
  const year = START_YEAR + Math.floor(index / 12);
  const name = MONTH_NAMES[index % 12];
  return `${short ? name.slice(0, 3) : name} ${year}`;
}

function calendarMonthNumber(month) {
  return ((START_MONTH_INDEX + month - 1) % 12) + 1;
}

function firstHarvestMonth(matureMonth) {
  let m = matureMonth;
  while (!isHarvestMonth(m)) m++;
  return m;
}

function regionalTempRange(regionId, calendarMonth) {
  const climate = REGION_CLIMATE[regionId] || REGION_CLIMATE.napa;
  const index = calendarMonth - 1;
  const swing = Math.round((rand() - 0.5) * climate.volatility * 2);
  const spread = Math.max(9, climate.avgHigh[index] - climate.avgLow[index] + randint(-2, 3));
  const high = Math.round(climate.avgHigh[index] + swing);
  const low = Math.round(high - spread);
  return { low, high };
}

function region() {
  return REGIONS.find(r => r.id === state.region);
}

function varietal() {
  return VARIETALS[state.varietal];
}

function philosophy() {
  return PHILOSOPHIES.find(p => p.id === state.philosophy);
}

function selectedRegion() {
  return REGIONS.find(r => r.id === setup.region);
}

function selectedVarietal() {
  return VARIETALS[setup.varietal];
}

function selectedPhilosophy() {
  return PHILOSOPHIES.find(p => p.id === setup.philosophy);
}

function difficulty() {
  return DIFFICULTIES.find(d => d.id === (state?.difficulty || setup.difficulty)) || DIFFICULTIES[1];
}

function selectedDifficulty() {
  return DIFFICULTIES.find(d => d.id === setup.difficulty) || DIFFICULTIES[1];
}

const PHILOSOPHY_PROFILE = { natural: 20, industrial: -20, classic: 0 };
const VARIETAL_PROFILE   = { gamay: 10, pinot: 8, riesling: 8, malbec: -2,
                             sauvignon: -2, chardonnay: -4, merlot: 0,
                             cabernet: 0, cabfranc: 4, shiraz: -6 };

function initialChannelTrust() {
  return Object.keys(CHANNELS).reduce((acc, key) => {
    acc[key] = 58;
    return acc;
  }, {});
}

function initialChannelDemand(regionDef, varietalDef, philosophyDef, difficultyDef, profile, varietalId = setup.varietal) {
  const base = Math.round(regionDef.demand * varietalDef.demand * philosophyDef.demand * difficultyDef.demandMod);
  const artisan = (profile - 50) / 50;
  const commercial = -artisan;
  const regional = {
    napa: { cellarDoor: 18, club: 8, collector: 8 },
    bordeaux: { restaurant: 10, distributor: 8, collector: 7 },
    mendoza: { export: 14, distributor: 8, mass: 4 },
    mosel: { collector: 14, restaurant: 4, mass: -8 },
    burgundy: { collector: 18, restaurant: 8, mass: -10 },
    barossa: { export: 15, distributor: 10, mass: 6 },
    piedmont: { collector: 16, restaurant: 7, export: 5 },
    rioja: { export: 12, distributor: 8, restaurant: 4 },
    fingerlakes: { cellarDoor: 12, club: 7, restaurant: 5, collector: 4, mass: -6 }
  }[regionDef.id] || {};
  const varietalMods = {
    pinot: { collector: 9, restaurant: 5 },
    riesling: { collector: 10, restaurant: 3 },
    gamay: { cellarDoor: 7, collector: 5 },
    cabernet: { restaurant: 6, collector: 5 },
    cabfranc: { restaurant: 7, cellarDoor: 4 },
    shiraz: { export: 8, mass: 5 },
    malbec: { export: 7, distributor: 5, mass: 5 },
    nebbiolo: { collector: 12, restaurant: 5, mass: -8 },
    tempranillo: { export: 7, distributor: 5 }
  }[varietalId] || {};
  const profileMods = {
    cellarDoor: Math.round(commercial * 4),
    club: Math.round(artisan * 6),
    restaurant: Math.round(artisan * 4),
    distributor: Math.round(commercial * 7),
    export: Math.round(commercial * 3),
    collector: Math.round(artisan * 12),
    mass: Math.round(commercial * 14)
  };
  return Object.keys(CHANNELS).reduce((acc, key) => {
    if (key === "dtc") { acc[key] = 20; return acc; }
    acc[key] = clamp(base + (regional[key] || 0) + (varietalMods[key] || 0) + (profileMods[key] || 0), 0, 130);
    return acc;
  }, {});
}

const ACHIEVEMENTS = [
  { id: "first-blush",            emoji: "🌸", name: "First Blush",            desc: "Reached prestige 40." },
  { id: "benchmark",              emoji: "🏆", name: "Benchmark Producer",      desc: "Reached prestige 75." },
  { id: "legend",                 emoji: "👑", name: "Legend",                  desc: "Reached prestige 90." },
  { id: "auction-record",         emoji: "🔨", name: "Auction Record",          desc: "A sold-out vintage reached the secondary market." },
  { id: "perfect-vintage",        emoji: "⭐", name: "Perfect Vintage",         desc: "Produced a five-star vintage." },
  { id: "critical-darling",       emoji: "📰", name: "Critical Darling",        desc: "Earned a 95+ critic score." },
  { id: "christies",              emoji: "🍾", name: "Christie's",              desc: "Consigned a vintage for auction." },
  { id: "three-stars",            emoji: "🍽️",  name: "Three Stars",            desc: "Earned Michelin three-star placement." },
  { id: "survived-board",         emoji: "😤", name: "Survived the Board",      desc: "Outlasted twelve months of investor board pressure." },
  { id: "deep-red",               emoji: "💸", name: "Deep in the Red",         desc: "Kept the estate running with cash below −$30,000." },
  { id: "comeback",               emoji: "💪", name: "Comeback",                desc: "Recovered from a prestige drop of 15 or more points." },
  { id: "back-from-brink",        emoji: "🎯", name: "Back from the Brink",     desc: "Had morale fall to 10 or below, then recovered." },
  { id: "smoke-season",           emoji: "🔥", name: "Smoke Season",            desc: "Navigated a Napa wildfire smoke advisory." },
  { id: "tremors",                emoji: "🌍", name: "Tremors",                 desc: "Kept the estate intact after an earthquake." },
  { id: "hailstorm",              emoji: "🌨️",  name: "Hailstorm",              desc: "Survived a Mendoza hailstorm." },
  { id: "ice-harvest",            emoji: "❄️",  name: "Ice Harvest",            desc: "Pushed grapes to the freeze for an ice wine." },
  { id: "en-primeur",             emoji: "🏰", name: "En Primeur",              desc: "Offered barrel samples before the vintage was finished." },
  { id: "premier-cru",            emoji: "🥂", name: "Premier Cru",             desc: "Pursued the Burgundy premier cru classification." },
  { id: "old-vines",              emoji: "👴", name: "Old Vines",               desc: "Acquired an 80-year-old Shiraz parcel." },
  { id: "allocation-only",        emoji: "💎", name: "Allocation Only",         desc: "Fulfilled five collector-channel orders." },
  { id: "volume-play",            emoji: "📦", name: "Volume Play",             desc: "Sold 5,000 cases across the game." },
  { id: "full-ledger",            emoji: "🧾", name: "Full Ledger",             desc: "Earned $1,000,000 in total revenue." },
  { id: "dream-team",             emoji: "🤝", name: "Dream Team",              desc: "Had five staff members on the payroll at once." },
  { id: "destination-winery",     emoji: "🎪", name: "Destination Winery",      desc: "Maxed out the tasting room." },
  { id: "precision-viticulture",  emoji: "🔬", name: "Precision Viticulture",   desc: "Built the viticulture lab to tier three." },
  { id: "going-natural",          emoji: "🌿", name: "Going Natural",           desc: "Earned organic certification." },
  { id: "natural-wine-fair",      emoji: "🍷", name: "Natural Wine Fair",        desc: "Poured at the natural wine fair." },
  { id: "bootstrapped",           emoji: "🏦", name: "Bootstrapped",            desc: "Finished without drawing any additional debt." },
  { id: "leveraged-up",           emoji: "🎰", name: "Leveraged Up",            desc: "Borrowed over $100,000 in total across the game." },
  { id: "checkbook-winemaker",    emoji: "🛒", name: "Checkbook Winemaker",     desc: "Bought grapes instead of growing them. Terroir is wherever your truck can reach." },
  { id: "impatient",              emoji: "⏩", name: "Impatient",               desc: "Released a vintage before its aging window closed. The wine wasn't ready. You were." },
  { id: "first-harvest",         emoji: "🌾", name: "First Harvest",           desc: "Brought in your first crop." },
  { id: "first-hire",            emoji: "🤵", name: "First Hire",              desc: "Brought on your first member of staff." },
  { id: "debt-free",             emoji: "✅", name: "Debt Free",               desc: "Paid off every outstanding loan." },
  { id: "barrel-indiscretion",   emoji: "💋", name: "Barrel Indiscretion",     desc: "Two lustful staff members found their way to a closed-door shift together." },
  { id: "centenaire",            emoji: "✨", name: "Centenaire",              desc: "Reached prestige 100." },
  { id: "esprit-de-corps",       emoji: "🎉", name: "Esprit de Corps",         desc: "Hit 100 morale." },
  { id: "well-rested",           emoji: "🧘", name: "Well Rested",             desc: "Closed a month with zero fatigue." },
  { id: "hired-the-vintner",     emoji: "🍷", name: "The Cellar Spoke",        desc: "Hired a winemaker no record knew." },
  { id: "received-the-priest",   emoji: "🕯️", name: "Received the Stranger",  desc: "A visitor came to the estate and was let in." },
  { id: "cup-held-back",         emoji: "⚖️", name: "The Cup Held Back",       desc: "The estate was measured and held." },
  { id: "diminished-endured",    emoji: "🌾", name: "Diminished but Endured",  desc: "The estate survived its own harvest." },
  { id: "found-wanting",         emoji: "🔥", name: "Found Wanting",           desc: "The wine was perfect. The cup was full." },
  { id: "would-not-receive-him", emoji: "🚪", name: "Would Not Receive Him",   desc: "The estate refused the visitor and stood by its work." },
];

function createState() {
  const r = selectedRegion();
  const v = selectedVarietal();
  const p = selectedPhilosophy();
  const d = selectedDifficulty();
  const inventoryMod = d.inventoryMod;
  const startProfile = clamp(50 + (PHILOSOPHY_PROFILE[p.id] || 0) + (VARIETAL_PROFILE[setup.varietal] || 0), 0, 100);
  const startMonth = SOUTHERN_HEMISPHERE_REGIONS.has(r.id) ? 7 : 1;
  const s = {
    month: startMonth,
    maxMonths: 60,
    season: seasonName(startMonth, r.id),
    difficulty: d.id,
    region: r.id,
    varietal: setup.varietal,
    philosophy: p.id,
    wineryName: setup.wineryName.trim() || RANDOM_WINERY_NAMES[randint(0, RANDOM_WINERY_NAMES.length - 1)],
    cash: Math.round(r.cash * d.cashMod),
    debt: d.debt,
    debtLots: d.debt ? [{ principal: d.debt, rate: baseDebtRate(d), label: "Opening debt" }] : [],
    creditLine: d.creditLine,
    leaseCost: d.rent,
    prestige: r.prestige,
    demand: Math.round(r.demand * v.demand * p.demand * d.demandMod),
    channelDemand: initialChannelDemand(r, v, p, d, startProfile, setup.varietal),
    channelTrust: initialChannelTrust(),
    morale: 58,
    fatigue: 18,
    quality: Math.round(48 * v.quality * p.quality * (r.qualityMod || 1)),
    sustainability: 45 + p.sustainability,
    influence: r.influence || 2,
    price: 28,
    monthStartPrice: 28,
    actionsLeft: 2,
    capacityLeft: { vineyard: 0, cellar: 0, ops: 0, hospitality: 0, sales: 0 },
    capacityMonth: 1,
    staff: [],
    staffProgress: {},
    staffMarket: shuffle(STAFF_POOL.map(p => p.id)),
    staffTraits: {},
    buildings: { block: 0, tank: 1, barrel: 1, line: 0, room: 0, lab: 0 },
    rows: makeRows(d.rows, { varietal: setup.varietal, region: setup.region }),
    inventory: {
      cases: Math.round(360 * inventoryMod),
      glass: Math.round(1600 * inventoryMod),
      stash: 0
    },
    vintages: [{
      id: "opening",
      year: START_YEAR - 1,
      score: 3,
      label: `${START_YEAR - 1} Legacy Stock`,
      grapes: 0,
      bulkWine: Math.round(620 * inventoryMod),
      agingMonths: 999,
      agingTarget: 0,
      bottled: 0,
      purchased: true
    }],
    vintageWeatherScore: 52,
    currentVintageScore: 3,
    orders: [],
    archive: [],
    eventMemory: {},
    classification: {},
    log: [],
    marketHeat: 52,
    marketMods: {},
    investor: null,
    event: null,
    lastEventResult: null,
    lastWeather: "Clear",
    lastTemp: regionalTempRange(r.id, calendarMonthNumber(startMonth)),
    lastClose: null,
    harvestReport: null,
    tutorialSeen: false,
    introSeen: false,
    pendingNaming: null,
    insurance: { crop: false },
    seasonalUsedMonth: -1,
    greenHarvestYear: -1,
    naturalCellarUsedMonth: -1,
    history: [],
    totalSold: 0,
    totalRevenue: 0,
    fulfilled: 0,
    missed: 0,
    profile: startProfile,
    gameOver: null,
    maxPrestige: r.prestige,
    minCash: Math.round(r.cash * d.cashMod),
    minMorale: 58,
    hadPrestigeDrop: false,
    harvestCount: 0,
    totalStaffHired: 0,
    boughtGrapes: false,
    earlyReleased: false,
    survivedInvestor: false,
    totalDebtDrawn: d.debt || 0,
    openingDebt: d.debt || 0,
    collectorFulfilled: 0,
    achievements: [],
    newAchievements: [],
    wrathState: null,
    heroicsTotal: 0,
    vintnerSpawned: false,
    vintnerArrivalEventFired: false,
    prestigeBeforeMonth: r.prestige,
    lastHarvestForecast: 0,
    lastHarvestGrapes: 0
  };
  ensureStaffTraits(s);
  // Long-aging varietals (nebbiolo, cabernet in high-bonus regions) face a ~20-month gap before
  // the first bottleable vintage. Add a partially-aged barrel lot that ships 4 months into play —
  // simulating wine already in barrel when you took over the estate.
  const baseAgingTarget = agingTarget(s);
  if (baseAgingTarget >= 9) {
    s.vintages.push({
      id: "barrel-opening",
      year: START_YEAR - 1,
      score: 3,
      label: `${START_YEAR - 1} ${VARIETALS[s.varietal].name} (In Barrel)`,
      grapes: 0,
      bulkWine: Math.round(300 * inventoryMod),
      agingMonths: baseAgingTarget - 4,
      agingTarget: baseAgingTarget,
      bottled: 0,
      purchased: true
    });
  }
  return s;
}

function makeRows(count, options = {}) {
  const names = ["North Slope", "River Bench", "Old Block", "Stone Terrace", "Hill Parcel", "Windbreak", "Village Edge", "Reservoir Row"];
  const optW = VARIETALS[options.varietal]?.optimalWater ?? 50;
  const humidity = REGION_CLIMATE[options.region]?.humidity ?? 0.55;
  const humidityBias = Math.round((humidity - 0.55) * 15);
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i],
    health: 82 + randint(-4, 6),
    disease: randint(5, 18),
    water: clamp(optW + humidityBias + randint(-8, 8), 15, 82),
    pressure: "weeds",
    plantedMonth: options.plantedMonth || -96,
    matureMonth: options.matureMonth || 1,
    plantedYear: options.plantedYear ?? START_YEAR - 8
  }));
}

function log(s, text, opts) {
  s.log.unshift({ month: s.month, text, italic: opts?.italic || false });
  s.log = s.log.slice(0, 45);
}

function inWrath(s) { return s.wrathState !== null && s.wrathState !== undefined; }
function hasStaff(s, id) { return (s.staff || []).includes(id); }

function effectiveStaffEffects(s, id) {
  const person = STAFF_POOL.find(p => p.id === id);
  if (!person) return {};
  if (id === "vintner" && inWrath(s)) {
    const sealBonus = s.wrathState.seal || 0;
    return { ...person.effects, quality: person.effects.quality + sealBonus, prestige: person.effects.prestige + sealBonus };
  }
  return person.effects;
}

function awardAchievement(s, id) {
  if (!s.achievements) return;
  if (!s.achievements.includes(id)) {
    s.achievements.push(id);
    if (!s.newAchievements) s.newAchievements = [];
    s.newAchievements.push(id);
  }
}

function buildStaffMarket(s) {
  return shuffle(
    STAFF_POOL
      .filter(p => !p.hidden || (p.id === "vintner" && s.vintnerSpawned))
      .map(p => p.id)
      .filter(id => !(s.staff || []).includes(id))
  );
}

// ── Cup of Wrath path ────────────────────────────────────────────────────────

const WRATH_CUES = [
  [
    "The grapes were heavy this morning, but the press was silent.",
    "Marco said he heard the barrels settle at three. Marco was not in the cellar at three.",
    "A bottle was found on the rack bearing no label anyone recognized. It was full.",
    "The vintner does not eat with the others. The others have stopped asking why.",
    "Critic notes used the word uncanny. The piece was complimentary.",
    "The delivery driver left without collecting the signature. His face was not one anyone knew.",
    "The second racking this quarter produced three more cases than the inventory showed."
  ],
  [
    "Beatrice asked, in passing, whether the master still attended services.",
    "The dogs will not enter the south block. They never used to mind it.",
    "The wine in tank 4 is darker than the must it came from. No one will say so.",
    "Ines came in late. She had been standing at the fence line. She did not say what she was looking at.",
    "A bird flew into the cellar window and did not survive. The vintner buried it. Apparently.",
    "The temperature in the cellar is twelve degrees. The reading has not changed in eleven days.",
    "A visiting buyer asked if the vintner had always been here. She had not meant to ask it aloud."
  ],
  [
    "The harvest came in three weeks early. The almanac is wrong, the vintner said. Not the harvest.",
    "There is writing on the inside of an empty barrel. It was not there yesterday.",
    "Margot left without giving notice. Her last act was to leave a candle lit in the office.",
    "The plumb line in the new tank room hangs at an angle the carpenter cannot explain.",
    "The estate has not had rain in nine weeks. The neighbors have had floods.",
    "The south block has flowered twice this year. This has not been remarked upon.",
    "The estate's name appeared in a trade journal under a vintage that has not yet been made."
  ],
  [
    "The wine has begun to refuse the bottle. Three lots cracked their casks overnight.",
    "The vintner was seen in the south block at the hour no one keeps.",
    "A guest at the tasting room asked, politely, whether the master was well. The master had not yet entered the room.",
    "The lampstands are out. They were full at dusk.",
    "The vintner is no longer in the staff records. He is still here.",
    "A record was found in the cellar book in a hand no one on the estate recognizes. It was accurate.",
    "The vintner laid out twelve glasses on the tasting table and did not explain the number."
  ]
];

const WRATH_SEAL_CUES = {
  1: "Severin Apollos set his room in order on the first day and has not touched it since.",
  2: "A label was found in the press room in the estate's own typeface. The vintage printed on it was two years ahead.",
  3: "A man has come up from the village. He waits at the gate. He says he was once in the trade.",
  4: "The cellar register is current to the day. No one on the estate has been keeping it.",
  5: "The clock in the office is striking, but the hands have not moved since dawn.",
  6: "A tasting note was left on the winery door. It described a wine that is still in barrel.",
  7: "The press has been opened. The vat is brimming. It cannot hold more."
};

const WRATH_CUE_USED = {};

function pickCue(tier) {
  const pool = WRATH_CUES[Math.min(3, tier)] || WRATH_CUES[0];
  return pool[Math.floor(rand() * pool.length)];
}

function initWrathState() {
  return {
    vintnerHired: false,
    vintnerHiredMonth: null,
    priestVisited: false,
    priestAccepted: false,
    priestRefused: false,
    priestFirstRefusedMonth: null,
    priestRefusedTwice: false,
    faithCap: 100,
    cup: 0,
    faith: 0,
    lastFaith: 0,
    seal: 0,
    prevSeal: 0,
    cueCount: 0,
    weightedStaffLost: [],
    hiddenChoicesRefused: 0,
    iniquityChoicesAccepted: 0,
    iniquityAfterPriestBase: 0,
    mode: "normal",
    measurementStep: 0,
    speakUsed: [],
    aceldamaBlock: null,
    endingResolved: false
  };
}

function onVintnerHired(s) {
  s.wrathState = { ...initWrathState(), vintnerHired: true, vintnerHiredMonth: s.month };
  log(s, "Severin Apollos arrived with a single trunk. He asked where the cellar was, not the master.");
  awardAchievement(s, "hired-the-vintner");
}

function currentSeal(s) {
  if (!inWrath(s)) return 0;
  const thresholds = [12, 25, 38, 52, 66, 80, 92, 100];
  const slow = hasStaff(s, "priest") ? 3 : 0;
  const adjustedCup = Math.max(0, s.wrathState.cup - slow * 3);
  let seal = 0;
  for (let i = 0; i < thresholds.length; i++) {
    if (adjustedCup >= thresholds[i]) seal = i + 1;
  }
  return Math.min(8, seal);
}

function baseCupFill(s) {
  if (!inWrath(s) || !hasStaff(s, "vintner")) return 0;
  let fill = 2;
  if (s.heroicsUsedMonth === s.month) fill += 3;
  if (s.morale < 35) fill += 2;
  if (s.marketMods.brandFatigue) fill += 4;
  return fill;
}

function maybeFireCue(s) {
  if (!inWrath(s) || !hasStaff(s, "vintner")) return;
  const seal = s.wrathState.seal;
  const p = [0.25, 0.25, 0.45, 0.45, 0.70, 0.70, 1.0, 1.0][Math.min(7, seal)];
  if (rand() > p) return;
  const tier = Math.min(3, Math.floor(seal / 2));
  const cue = pickCue(tier);
  log(s, cue, { italic: true });
  s.wrathState.cueCount += 1;
}

function checkPriestDeparture(s) {
  if (!inWrath(s) || !hasStaff(s, "priest")) return;
  const ws = s.wrathState;
  const iniquityAfterPriest = ws.iniquityChoicesAccepted - ws.iniquityAfterPriestBase;
  const faithDropped = (ws.lastFaith - ws.faith) >= 5;
  const cupHighFaithLow = ws.cup >= 90 && ws.faith < 30;
  if (iniquityAfterPriest >= 3 || faithDropped || cupHighFaithLow) {
    log(s, "Father Aurelian left a note on the kitchen table. It read: I have prayed for the estate. I cannot remain.");
    s.staff = s.staff.filter(id => id !== "priest");
    ws.priestAccepted = false;
  }
}

function maybeSpawnVintner(s) {
  if (s.vintnerSpawned || inWrath(s)) return;
  const prevPrestige = s.prestigeBeforeMonth || s.prestige;
  const prestigeDrop = prevPrestige - s.prestige >= 15;
  const poorHarvest = s.lastHarvestForecast > 0 && s.lastHarvestGrapes < s.lastHarvestForecast * 0.6;
  if ((s.lowMoraleMonths || 0) >= 3 || (s.heroicsTotal || 0) >= 3 || poorHarvest || prestigeDrop) {
    s.vintnerSpawned = true;
    if (!s.staffMarket.includes("vintner")) {
      s.staffMarket = [...s.staffMarket, "vintner"];
    }
  }
}

function wrathTick(s) {
  if (!inWrath(s)) return;
  const ws = s.wrathState;

  if (ws.mode === "measurement") return;

  // Cup fill
  const fill = baseCupFill(s);
  ws.cup = Math.min(100, ws.cup + fill);

  // Seal progression
  const newSeal = currentSeal(s);
  if (newSeal > ws.seal) {
    ws.prevSeal = ws.seal;
    ws.seal = newSeal;
    // One-time seal cues
    if (WRATH_SEAL_CUES[ws.seal]) {
      log(s, WRATH_SEAL_CUES[ws.seal], { italic: true });
    }
    // Set aceldama block at stage 3
    if (ws.seal >= 5 && !ws.aceldamaBlock && s.rows.length > 0) {
      ws.aceldamaBlock = s.rows[s.rows.length - 1].id;
    }
  }

  // Random cues
  maybeFireCue(s);

  // Priest passive faith
  if (hasStaff(s, "priest")) {
    ws.faith = Math.min(ws.faithCap, ws.faith + 2);
  }

  // Priest departure check
  ws.lastFaith = ws.faith;
  checkPriestDeparture(s);

  // Cup full → enter measurement
  if (ws.cup >= 100 && ws.mode === "normal") {
    enterMeasurement(s);
  }
}

function enterMeasurement(s) {
  const ws = s.wrathState;
  ws.mode = "measurement";
  ws.measurementStep = 0;
  log(s, "The press has been opened. The vat is brimming. It cannot hold more.");
}

function advanceMeasurementStep(s) {
  const ws = s.wrathState;
  ws.measurementStep = (ws.measurementStep || 0) + 1;
  if (ws.measurementStep >= 5) {
    resolveWrathEnding(s);
  }
}

function resolveWrathEnding(s) {
  const ws = s.wrathState;
  const f = ws.faith;
  let ending;
  if (ws.priestRefusedTwice || (ws.priestRefused && !ws.priestAccepted)) {
    ending = f >= 20 ? "endured-alone" : "found-wanting";
  } else {
    if (f >= 70) ending = "cup-held-back";
    else if (f >= 40) ending = "diminished";
    else ending = "found-wanting";
  }
  applyWrathEnding(s, ending);
  s.gameOver = { score: true, wrathEnding: ending };
  ws.endingResolved = true;
  checkAchievements(s);
}

function applyWrathEnding(s, ending) {
  if (ending === "cup-held-back") {
    s.prestige += 20;
    if (!s.savedEstate) s.savedEstate = {};
    s.savedEstate.measuredAndSufficient = true;
    awardAchievement(s, "cup-held-back");
  } else if (ending === "diminished") {
    s.cash = 0;
    const toRemove = Math.floor(s.staff.length * 0.6);
    for (let i = 0; i < toRemove; i++) s.staff.shift();
    s.vintages = (s.vintages || []).filter(v => v.bulkWine === 0 || v.bottled > 0);
    s.prestige = Math.max(0, s.prestige - 15);
    awardAchievement(s, "diminished-endured");
  } else if (ending === "found-wanting") {
    s.cash = 0;
    awardAchievement(s, "found-wanting");
  } else if (ending === "endured-alone") {
    s.prestige += 5;
    awardAchievement(s, "would-not-receive-him");
  }
}

function corruptionStage(s) {
  if (!inWrath(s)) return 0;
  if (s.wrathState.mode === "measurement") return 9;
  return s.wrathState.seal; // 0–8
}

function wrathLabel(s, defaultLabel, thresholds) {
  if (!inWrath(s)) return defaultLabel;
  const seal = s.wrathState.seal;
  for (const [min, label] of thresholds) {
    if (seal >= min) return label;
  }
  return defaultLabel;
}

function corruptChars(s, text) {
  if (!inWrath(s)) return text;
  const seal = s.wrathState.seal;
  if (seal < 4) return text;
  const rate = seal >= 7 ? 0.22 : seal >= 6 ? 0.14 : seal >= 5 ? 0.08 : 0.04;
  return text.split("").map(ch => {
    if (!/[a-zA-Z]/.test(ch)) return ch;
    if (rand() < rate) return `<span class="corrupt-char">${ch}</span>`;
    return ch;
  }).join("");
}

function measurementStepContent(s) {
  const ws = s.wrathState;
  const step = ws.measurementStep || 0;
  const f = ws.faith;

  if (step === 0) {
    return `
      <div class="measurement-step">
        <h3>I. The Plumb Line</h3>
        <img class="measurement-img" src="assets/measurement-1-plumb.png" alt="" onerror="this.style.display='none'">
        <p class="measurement-verse">A plumb line hangs in the new tank room at an angle no carpenter can explain. The estate is being measured. The line shows what the line shows.</p>
        <div class="measurement-scales">
          <div class="scale-col scale-cup">
            <span class="scale-label">Cup</span>
            <div class="scale-bar"><div class="scale-fill" style="width:${ws.cup}%"></div></div>
            <strong>${ws.cup}/100</strong>
          </div>
          <div class="scale-col scale-faith">
            <span class="scale-label">Faith</span>
            <div class="scale-bar scale-bar-faith"><div class="scale-fill" style="width:${ws.faith}%"></div></div>
            <strong>${ws.faith}/100</strong>
          </div>
        </div>
      </div>
    `;
  }

  if (step === 1) {
    const heroicsLine = (s.heroicsTotal || 0) > 0 ? `<li>Heroics called on ${s.heroicsTotal} time${s.heroicsTotal > 1 ? "s" : ""}.</li>` : "";
    const staffLostLine = ws.weightedStaffLost.length > 0 ? `<li>${ws.weightedStaffLost.join(", ")} left the estate during these years.</li>` : "";
    const iniqLine = ws.iniquityChoicesAccepted > 0 ? `<li>${ws.iniquityChoicesAccepted} path${ws.iniquityChoicesAccepted > 1 ? "s" : ""} were taken that cannot be re-walked.</li>` : "";
    const faithLine = f >= 10 ? `<li>Faith was not entirely absent.</li>` : "";
    const priestLine = ws.priestAccepted ? `<li>Father Aurelian was received.</li>` : ws.priestRefusedTwice ? `<li>The priest was sent away twice.</li>` : "";
    return `
      <div class="measurement-step">
        <h3>II. The Books Opened</h3>
        <img class="measurement-img" src="assets/measurement-2-books.png" alt="" onerror="this.style.display='none'">
        <p class="measurement-verse">The records of the years lie open. The vintner stands at one side of the table. The priest stands at the other. Neither speaks.</p>
        <ul class="measurement-record">
          ${heroicsLine}${staffLostLine}${iniqLine}${faithLine}${priestLine}
        </ul>
      </div>
    `;
  }

  if (step === 2) {
    const verdict = f >= 70
      ? "The cup is full. The hand that fills it has been weighed."
      : f >= 40
      ? "The cup is full. The hand is half steady."
      : "The cup is full. The hand has been found wanting.";
    return `
      <div class="measurement-step">
        <h3>III. The Writing</h3>
        <img class="measurement-img" src="assets/measurement-3-writing.png" alt="" onerror="this.style.display='none'">
        <p class="measurement-verse">Writing has appeared on the inside of an empty barrel. The words are not in any tongue the estate has spoken. Their meaning is plain.</p>
        <p class="measurement-verdict">${verdict}</p>
      </div>
    `;
  }

  if (step === 3) {
    const [cupText, chaliceClass, cupImg] = f >= 70
      ? ["The cup was carried out of the estate. It did not return.", "chalice-held", "measurement-4-cup-held-back.png"]
      : f >= 40
      ? ["Some of the wine was lost. The press did not break.", "chalice-spilled", "measurement-4-cup-diminished.png"]
      : ["The cup was emptied on the estate's own threshing floor.", "chalice-fractured", "measurement-4-cup-found-wanting.png"];
    return `
      <div class="measurement-step">
        <h3>IV. The Cup Itself</h3>
        <img class="measurement-img" src="assets/${cupImg}" alt="" onerror="this.style.display='none'">
        <div class="chalice-wrap">
          <svg class="chalice ${chaliceClass}" viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 10 Q10 35 15 55 Q20 70 40 80 Q60 70 65 55 Q70 35 60 10 Z" fill="none" stroke="currentColor" stroke-width="2.5"/>
            <line x1="40" y1="80" x2="40" y2="95" stroke="currentColor" stroke-width="2.5"/>
            <line x1="28" y1="95" x2="52" y2="95" stroke="currentColor" stroke-width="2.5"/>
            <clipPath id="chalice-clip"><path d="M22 12 Q12 36 17 55 Q22 68 40 78 Q58 68 63 55 Q68 36 58 12 Z"/></clipPath>
            <rect x="0" y="0" width="80" height="100" clip-path="url(#chalice-clip)" fill="var(--wine)" opacity="0.7" class="chalice-fill"/>
          </svg>
        </div>
        <p class="measurement-cup-text">${cupText}</p>
      </div>
    `;
  }

  if (step >= 4) {
    const ws2 = s.wrathState;
    const ending = ws2.priestRefusedTwice || (ws2.priestRefused && !ws2.priestAccepted)
      ? (ws2.faith >= 20 ? "endured-alone" : "found-wanting")
      : ws2.faith >= 70 ? "cup-held-back" : ws2.faith >= 40 ? "diminished" : "found-wanting";
    const verdictImg = ending === "cup-held-back" || ending === "endured-alone"
      ? "measurement-5-verdict-held-back.png"
      : ending === "diminished"
      ? "measurement-5-verdict-diminished.png"
      : "measurement-5-verdict-found-wanting.png";
    const texts = {
      "cup-held-back": "Severin Apollos departed in the night. The lots he made remained, and they aged into something the estate will be remembered for. Father Aurelian stayed one more season and then walked back down to the village. The estate kept its name.",
      "diminished": "The estate survived, but barely. Two-thirds of the staff scattered to other valleys. The wine in barrel was largely lost. What remained was honest.",
      "found-wanting": "The press at Bozrah is silent now. The vintage was extraordinary. The estate is no longer the estate's. The records will note the wines and not the way of them.",
      "endured-alone": "The estate stood. Severin Apollos was gone before dawn. No priest had been received, and the estate stood by what it had done, which was sometimes more than it had been asked. The years that followed were quieter than they had been."
    };
    return `
      <div class="measurement-step">
        <h3>V. The Verdict</h3>
        <img class="measurement-img" src="assets/${verdictImg}" alt="" onerror="this.style.display='none'">
        <p class="measurement-final">${texts[ending] || texts["found-wanting"]}</p>
      </div>
    `;
  }

  return "";
}

function startGame() {
  state = createState();
  ensureEconomy(state);
  setupStep = 0;
  setupMode = "start";
  activeTab = "overview";
  helpOpen = true;
  guideStep = 0;
  addOrder(state, "distributor");
  addOrder(state, "restaurant");
  resetActionBudgets(state);
  log(state, `${state.wineryName} founded in ${region().name} around ${varietal().name}.`);
  recordHistory(state, 0);
  render();
}

function randomStart() {
  const regionPick = REGIONS[randint(0, REGIONS.length - 1)];
  setup.region = regionPick.id;
  setup.varietal = regionPick.varietals[randint(0, regionPick.varietals.length - 1)];
  setup.philosophy = PHILOSOPHIES[randint(0, PHILOSOPHIES.length - 1)].id;
  setup.difficulty = DIFFICULTIES[randint(0, DIFFICULTIES.length - 1)].id;
  setup.wineryName = RANDOM_WINERY_NAMES[randint(0, RANDOM_WINERY_NAMES.length - 1)];
  startGame();
}

function applySuggestedStart(index) {
  const s = SUGGESTED_STARTS[index];
  setup.region = s.region;
  setup.varietal = s.varietal;
  setup.philosophy = s.philosophy;
  setup.difficulty = s.difficulty;
  if (!setup.wineryName) setup.wineryName = s.wineryName;
  startGame();
}

function setSetupMode(mode) {
  setupMode = mode;
  render();
}

const GUIDE_PAGES = [
  {
    title: "The Life of a Vintage",
    subtitle: "Every year follows the same rhythm: six seasons, each with a job to do."
  },
  {
    title: "Vines, Disease & Weather",
    subtitle: "What grows in your blocks, and what threatens it."
  },
  {
    title: "Wine Quality & Scoring",
    subtitle: "What makes a great vintage, and what your quality score is actually worth."
  },
  {
    title: "Running the Business",
    subtitle: "Cash, channels, and what to do when money runs short."
  },
  {
    title: "Your Team",
    subtitle: "Staff capacity, morale, virtues, vices, and the friction between them."
  }
];

function guidePageBody(step) {
  if (step === 0) {
    const sw = seasonWindows(state?.region);
    const seasonDescs = {
      Dormant:   "Prune vines, plan the year ahead, let crews recover. The winter planning action restores vine health and reduces operational fatigue.",
      Budbreak:  "New growth emerges. Run the spray program now to suppress early fungal pressure before disease gains a foothold on young shoots.",
      Flowering: "Fruit sets. Canopy thinning opens airflow through the fruit zone, cutting disease risk and raising wine quality.",
      Veraison:  "Grapes change color and begin ripening. Green harvest (dropping 20% of the crop) concentrates flavor and sugar in what remains.",
      Harvest:   "Pick the fruit. Selective picking improves capture rate and quality. Disease above 40 at harvest will tank your vintage score.",
      Cellar:    "Fermentation begins and cellar work starts: racking lots, topping barrels, moving ready wine forward. This is where the pipeline starts, not ends.",
    };
    return `
      <div class="guide-season-grid">
        ${Object.entries(seasonDescs).map(([season, desc]) => `
        <div class="guide-season">
          <span class="guide-season-label">${season}</span>
          <span class="guide-season-window">${sw[season]}</span>
          <p>${desc}</p>
        </div>`).join("")}
      </div>
      <p class="guide-note">The pipeline: <strong>harvested grapes → bulk wine in tanks → barrels → bottled cases → revenue.</strong> Bottling happens when the wine is ready, which can be any season. Long-aging varietals (Nebbiolo, Cabernet Sauvignon) can spend a year or more in barrel across multiple seasons before release.</p>
    `;
  }
  if (step === 1) {
    return `
      <div class="guide-two-col">
        <div>
          <div class="guide-section-head">Vineyard Health</div>
          <p>Each block tracks three numbers: <strong>health</strong> (vine vigor), <strong>disease</strong> (fungal and pest pressure), and <strong>water</strong> (soil moisture). Healthy vines produce better fruit. Disease above 40 at harvest noticeably degrades vintage quality.</p>
          <div class="guide-section-head">Disease Management</div>
          <p>Disease accumulates through spring and summer. Seasonal actions (spray programs in Budbreak, canopy thinning in Flowering) cut it back significantly. Neglect the early months and you enter harvest already compromised.</p>
          <div class="guide-section-head">Water & Drought</div>
          <p>Each grape has an optimal water level. Too little stresses vines; too much promotes disease. Drought-tolerant varieties handle dry seasons far better than water-hungry ones.</p>
        </div>
        <div>
          <div class="guide-section-head">A Few Varietals</div>
          <p>The game includes twelve grapes, roughly from forgiving to demanding:</p>
          <ul class="guide-ul">
            <li><strong>Shiraz, Malbec, Tempranillo, Gamay</strong>: heat-tolerant, drought-hardy, lower disease risk. Forgiving for beginners.</li>
            <li><strong>Merlot, Sauvignon Blanc, Cabernet Franc</strong>: reliable mid-tier; modest disease risk, reasonable yield.</li>
            <li><strong>Chardonnay, Cabernet Sauvignon</strong>: flexible but disease-sensitive; Cab demands long aging and rewards patience.</li>
            <li><strong>Pinot Noir, Riesling</strong>: fragile and disease-prone; high quality ceiling if you protect them.</li>
            <li><strong>Nebbiolo</strong>: the hardest grape, with low yield, very long barrel time, and an unmatched prestige ceiling.</li>
          </ul>
          <div class="guide-section-head">Weather Events</div>
          <p>Heat spikes, frost, and drought hit without warning. The spring spray program builds frost defenses. Crop insurance is available once cash allows. Mosel and Finger Lakes carry the most weather risk; Barossa and Mendoza the most drought.</p>
        </div>
      </div>
    `;
  }
  if (step === 2) {
    return `
      <div class="guide-two-col">
        <div>
          <div class="guide-section-head">What Makes a Good Vintage</div>
          <p>In real winemaking, vintage quality emerges from a combination of growing conditions, canopy management, harvest timing, and cellar craft. The game models the same chain: disease-free vines, careful seasonal work, and attentive cellaring produce better wine.</p>
          <p>Three things matter most: <strong>disease pressure at harvest</strong> (keep blocks below 40; below 25 is safe), <strong>weather events</strong> during the season (heat waves, frost, and drought all carry quality penalties if unmanaged), and <strong>cellar work</strong> (barrel aging and racking add complexity and quality over time).</p>
          <div class="guide-section-head">Vintage Score</div>
          <p>Each harvest produces a rating based on conditions that year. The score affects pricing, which buyers want your wine, and your prestige trajectory:</p>
          <div class="guide-score-table">
            <div><span>★☆☆☆☆</span><strong>Poor</strong><em>Deep discount; hard to move at any price</em></div>
            <div><span>★★☆☆☆</span><strong>Below Average</strong><em>Below-market pricing; move volume fast</em></div>
            <div><span>★★★☆☆</span><strong>Average</strong><em>Standard trade pricing; steady demand</em></div>
            <div><span>★★★★☆</span><strong>Good</strong><em>Premium tier; restaurant buyers engage</em></div>
            <div><span>★★★★★</span><strong>Exceptional</strong><em>Collector demand; allocation list opens</em></div>
          </div>
        </div>
        <div>
          <div class="guide-section-head">House Quality</div>
          <p>Separate from any single vintage, your <strong>Quality</strong> stat (shown in the topbar, 0–120) reflects your estate's current production standard. Think of it as your cellar's reputation for consistency: it affects your price ceiling, shapes prestige, and influences how buyers think of new releases.</p>
          <p>Quality decays slightly each month without investment and decays faster above 85, where maintaining excellence is genuinely hard. Cellar actions, barrel programs, and good vineyard work all push it upward.</p>
          <div class="guide-section-head">Wine Style & Profile</div>
          <p>Every winery sits on a spectrum from commercial to artisan, shown as your <strong>Profile</strong> (0–100). It shifts based on your decisions and starting philosophy.</p>
          <ul class="guide-ul">
            <li><strong>Commercial end (low profile)</strong>: higher demand volume, wider market access, lower price ceiling. Mass market and export buyers respond here. Scaled Commercial philosophy starts you here.</li>
            <li><strong>Artisan end (high profile)</strong>: narrower demand but higher price ceiling; collector and critic appeal. Natural philosophy and low-intervention decisions push in this direction.</li>
          </ul>
          <p>Neither end is correct; the strategy is committing to a position and building the right channels around it.</p>
        </div>
      </div>
    `;
  }
  if (step === 3) {
    return `
      <div class="guide-two-col">
        <div>
          <div class="guide-section-head">Monthly Fixed Costs</div>
          <p>Every month you pay <strong>lease</strong>, <strong>staff salaries</strong>, <strong>operating costs</strong>, and <strong>debt interest</strong>, before any revenue arrives. Know your burn rate; it arrives before sales do.</p>
          <div class="guide-section-head">When Cash Is Tight</div>
          <ul class="guide-ul">
            <li>Draw from your <strong>credit line</strong>; it carries monthly interest, so repay it quickly</li>
            <li><strong>Sell bulk grapes</strong> on the open market for quick cash, at the cost of a vintage</li>
            <li><strong>Release early</strong>: sell a bottled vintage before its ideal window, at a discount</li>
            <li><strong>Buy grapes</strong> to fill a revenue gap when your harvest falls short</li>
          </ul>
          <div class="guide-section-head">Practical Tips</div>
          <ul class="guide-ul">
            <li>Price to your vintage score; a ★★★ wine at ★★★★★ pricing stalls on the shelf</li>
            <li>Watch inbound orders; they expire and missed ones hurt your standing with buyers</li>
            <li>Wine club members are loyal and recurring; grow the club early</li>
            <li>Hospitality actions build both demand and morale at the same time</li>
          </ul>
        </div>
        <div>
          <div class="guide-section-head">Sales Channels</div>
          <div class="guide-channel-list">
            <div><span>Collectors</span><span class="guide-channel-pct">108%</span><em>highest margin; prestige required</em></div>
            <div><span>Cellar Door</span><span class="guide-channel-pct">100%</span><em>best direct-to-consumer margin</em></div>
            <div><span>Wine Club</span><span class="guide-channel-pct">90%</span><em>loyal members, recurring orders</em></div>
            <div><span>Restaurants</span><span class="guide-channel-pct">62%</span><em>relationship-driven, reputation-building</em></div>
            <div><span>Distribution</span><span class="guide-channel-pct">52%</span><em>steady volume, thin margin</em></div>
            <div><span>Export</span><span class="guide-channel-pct">45%</span><em>volume play, limited prestige lift</em></div>
            <div><span>Mass Market</span><span class="guide-channel-pct">38%</span><em>supermarket volume; prestige risk</em></div>
          </div>
          <div class="guide-section-head" style="margin-top:10px">Demand & Prestige</div>
          <p>Demand drives how many cases buyers want. Prestige unlocks premium channels and justifies higher prices. Both decay slowly if you're not actively investing; don't let them coast.</p>
        </div>
      </div>
    `;
  }
  return `
    <div class="guide-two-col">
      <div>
        <div class="guide-section-head">What Staff Do</div>
        <p>Each hire adds action capacity in their department: vineyard, cellar, sales, hospitality, or finance. Without staff, the estate runs on a bare action budget. Actions are how you actually move the estate forward each month: spraying vines, racking barrels, running hospitality, closing deals. Hire early; staff also earn XP and unlock perks over time.</p>
        <div class="guide-section-head">Agendas & Morale</div>
        <p>Every person has an agenda: a set of priorities they care about and watch you for. Your vineyard manager wants healthy blocks and no shortcut harvests. Your sales director wants no broken promises to buyers. Consistently overriding someone's agenda erodes morale. <strong>Below 20 morale you lose an action per month; at 0 the run ends.</strong></p>
        <div class="guide-section-head">On Player Virtue</div>
        <p>Running an estate well rewards steady judgment: plan ahead, honor commitments, don't overextend, weather setbacks without panic. No single brilliant move wins; consistency does. This maps roughly to what classical virtue ethics calls the cardinal virtues: prudence, justice, temperance, and fortitude.</p>
      </div>
      <div>
        <div class="guide-section-head">On Staff Virtue</div>
        <p>Every staff member carries <strong>one random virtue and one random vice</strong>, visible to you in the hiring pool before you commit. You don't choose; you observe and manage. A virtue improves performance or the team's environment. A vice creates friction, costs, or risk.</p>
        <p>Some traits <strong>clash</strong>: two Proud colleagues bristle at each other; a Just person conflicts with a Merciful one (rule-following vs. case-by-case compassion); a Wrathful person collides with anyone Proud. Each conflicting pair drains −1 morale per month. As the team grows, compatibility matters.</p>
        <div class="guide-trait-grid">
          <div class="guide-trait virtue"><span>Diligent</span><em>XP 50% faster</em></div>
          <div class="guide-trait virtue"><span>Prudent</span><em>Fewer bad events</em></div>
          <div class="guide-trait virtue"><span>Magnanimous</span><em>+2 team morale/mo</em></div>
          <div class="guide-trait virtue"><span>Temperate</span><em>Morale floor at 10</em></div>
          <div class="guide-trait virtue"><span>Stout-hearted</span><em>Softer crisis damage</em></div>
          <div class="guide-trait virtue"><span>Sanguine</span><em>+2 demand/mo</em></div>
          <div class="guide-trait virtue"><span>Humble</span><em>Salary −10%, no friction</em></div>
          <div class="guide-trait virtue"><span>Merciful</span><em>+2 morale when &lt;40</em></div>
          <div class="guide-trait virtue"><span>Just</span><em>+1 team morale/mo</em></div>
          <div class="guide-trait virtue"><span>Faithful</span><em>+2 team morale/mo</em></div>
          <div class="guide-trait vice"><span>Slothful</span><em>XP 40% slower</em></div>
          <div class="guide-trait vice"><span>Proud</span><em>Salary +10%, clashes</em></div>
          <div class="guide-trait vice"><span>Wrathful</span><em>Volatile; crisis upside</em></div>
          <div class="guide-trait vice"><span>Avaricious</span><em>Cheap; −2 team morale</em></div>
          <div class="guide-trait vice"><span>Melancholic</span><em>−1 morale; solo upside</em></div>
          <div class="guide-trait vice"><span>Lustful</span><em>+2 demand; salary +8%</em></div>
          <div class="guide-trait vice"><span>Gluttonous</span><em>+1 demand; inventory leak</em></div>
          <div class="guide-trait vice"><span>Crafty</span><em>+1 demand; −1 morale; event risk +15%</em></div>
        </div>
      </div>
    </div>
  `;
}

function guideModal() {
  const page = GUIDE_PAGES[guideStep];
  const isLast = guideStep === GUIDE_PAGES.length - 1;
  const dots = GUIDE_PAGES.map((_, i) =>
    `<span class="guide-dot${i === guideStep ? " active" : ""}"></span>`
  ).join("");
  return `
    <div class="modal">
      <div class="modal-card guide-modal-card">
        <div class="guide-header">
          <div>
            <h2>${page.title}</h2>
            <p class="guide-subtitle">${page.subtitle}</p>
          </div>
          <span class="guide-page-counter">${guideStep + 1} / ${GUIDE_PAGES.length}</span>
        </div>
        <div class="guide-body">
          ${guidePageBody(guideStep)}
        </div>
        <div class="guide-footer">
          <div class="guide-dots">${dots}</div>
          <div class="top-actions">
            <button class="ghost" onclick="retreatGuide()" ${guideStep === 0 ? "disabled" : ""}>← Previous</button>
            <button class="ghost" onclick="skipGuide()">Skip guide</button>
            <button class="primary" onclick="advanceGuide()">${isLast ? "Start playing" : "Next →"}</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function advanceGuide() {
  guideStep = (guideStep ?? 0) + 1;
  render();
}

function retreatGuide() {
  guideStep = Math.max(0, (guideStep ?? 1) - 1);
  render();
}

function skipGuide() {
  guideStep = GUIDE_PAGES.length;
  render();
}

function saveGame() {
  if (!state) return;
  localStorage.setItem("cellar-baron-save", JSON.stringify(state));
  log(state, "Game saved.");
  render();
}

function loadGame() {
  const raw = localStorage.getItem("cellar-baron-save");
  if (!raw) return;
  state = JSON.parse(raw);
  ensureEconomy(state);
  ensureHistory(state);
  ensureAllStaffProgress(state);
  helpOpen = !state.tutorialSeen;
  render();
}

function ensureEconomy(s) {
  if (!s.difficulty) s.difficulty = "estate";
  const d = DIFFICULTIES.find(item => item.id === s.difficulty) || DIFFICULTIES[1];
  if (typeof s.creditLine !== "number") s.creditLine = d.creditLine;
  if (typeof s.leaseCost !== "number") s.leaseCost = d.rent;
  if (typeof s.debt !== "number") s.debt = d.debt;
  if (!s.wineryName || s.wineryName === "Unnamed Estate") {
    s.wineryName = RANDOM_WINERY_NAMES[randint(0, RANDOM_WINERY_NAMES.length - 1)];
  }
  if (typeof s.profile !== "number") s.profile = 50;
  ensureVintages(s);
  ensureDebtLots(s);
  ensureStaffTraits(s);
  if (typeof s.introSeen !== "boolean") s.introSeen = true; // existing saves skip intro
  if (!('pendingNaming' in s)) s.pendingNaming = null;
  if (!('monthStartPrice' in s)) s.monthStartPrice = s.price;
  if (!('seasonalUsedMonth' in s)) s.seasonalUsedMonth = -1;
  if (!('greenHarvestYear' in s)) s.greenHarvestYear = -1;
  if (!('naturalCellarUsedMonth' in s)) s.naturalCellarUsedMonth = -1;
  if (!s.insurance) s.insurance = { crop: false };
  if (s.inventory && !('stash' in s.inventory)) s.inventory.stash = 0;
  s.staffMarket = buildStaffMarket(s);
  ensureStaffTraits(s);
  ensureActionBudgets(s);
  ensureChannels(s);
  ensureOrders(s);
  ensureArchive(s);
  ensureEventMemory(s);
  if (typeof s.fatigue !== "number") s.fatigue = 18;
  if (!s.classification) s.classification = {};
  if (s.wrathState === undefined) s.wrathState = null;
  if (typeof s.heroicsTotal !== "number") s.heroicsTotal = 0;
  if (typeof s.vintnerSpawned !== "boolean") s.vintnerSpawned = false;
  if (typeof s.vintnerArrivalEventFired !== "boolean") s.vintnerArrivalEventFired = false;
  if (typeof s.prestigeBeforeMonth !== "number") s.prestigeBeforeMonth = s.prestige;
  if (typeof s.lastHarvestForecast !== "number") s.lastHarvestForecast = 0;
  if (typeof s.lastHarvestGrapes !== "number") s.lastHarvestGrapes = 0;
  ensureLotRisk(s);
}

function resetGame() {
  localStorage.removeItem("cellar-baron-save");
  state = null;
  setupStep = 0;
  setupMode = "start";
  activeTab = "overview";
  helpOpen = true;
  render();
}

function staffBonus(s, key) {
  const base = s.staff.reduce((sum, id) => {
    const effects = effectiveStaffEffects(s, id);
    return sum + (effects[key] || 0);
  }, 0);
  return base + staffPerkBonus(s, key);
}

function staffPerkBonus(s, key) {
  ensureAllStaffProgress(s);
  return s.staff.reduce((sum, id) => {
    return sum + unlockedPerks(s, id).reduce((perkSum, perk) => perkSum + (perk.effects?.[key] || 0), 0);
  }, 0);
}

function staffPerkProduct(s, key) {
  ensureAllStaffProgress(s);
  return s.staff.reduce((mod, id) => {
    return mod * unlockedPerks(s, id).reduce((perkMod, perk) => perkMod * (perk.effects?.[key] || 1), 1);
  }, 1);
}

function staffCostMod(s) {
  const base = s.staff.reduce((mod, id) => {
    const person = STAFF_POOL.find(p => p.id === id);
    return mod * (person?.effects.costCut || 1);
  }, 1);
  return base * staffPerkProduct(s, "costCut");
}

function staffYieldMod(s) {
  return 1 + staffBonus(s, "yieldBonus");
}

function buildDiscountMod(s) {
  const base = s.staff.reduce((m, staffId) => {
    const person = STAFF_POOL.find(p => p.id === staffId);
    return m * (person?.effects.buildDiscount || 1);
  }, 1);
  return base * staffPerkProduct(s, "buildDiscount");
}

function eventRiskMod(s) {
  const base = s.staff.reduce((mod, id) => {
    const person = STAFF_POOL.find(p => p.id === id);
    const traitMod = (s.staffTraits?.[id] || []).includes("prudent") ? PERSONALITY_TRAITS.prudent.eventRiskMod : 1;
    return mod * (person?.effects.eventRisk || 1) * traitMod;
  }, philosophy().risk);
  return base * staffPerkProduct(s, "eventRisk");
}

function bottlingCost(s) {
  let cost = 3.8 - s.buildings.line * 0.28;
  s.staff.forEach(id => {
    const person = STAFF_POOL.find(p => p.id === id);
    cost *= person?.effects.bottlingCost || 1;
  });
  cost *= staffPerkProduct(s, "bottlingCost");
  if (s.marketMods.glassShortage) cost += 1.4;
  return Math.max(1.4, cost);
}

function fixedCosts(s) {
  return fixedCostBreakdown(s).total;
}

function fixedCostBreakdown(s) {
  ensureDebtLots(s);
  const salaries = s.staff.reduce((sum, id) => {
    const person = STAFF_POOL.find(p => p.id === id);
    if (!person) return sum;
    const traits = s.staffTraits?.[id] || [];
    const salaryMod = traits.reduce((m, t) => m * (PERSONALITY_TRAITS[t]?.salaryMod || 1), 1);
    return sum + Math.round(person.salary * salaryMod);
  }, 0);
  const operating = 6200 + s.rows.length * 1050 + s.buildings.tank * 520 + s.buildings.barrel * 620 + s.buildings.room * 720 + s.buildings.line * 460 + s.buildings.lab * 380;
  const loadCost = Math.max(0, loadPressure(s)) * 420;
  const investorOverhead = s.investor?.pressureMonths > 0 ? 4500 : 0;
  const interest = monthlyInterest(s);
  const insurancePremium = s.insurance?.crop ? 750 : 0;
  const subtotal = operating + loadCost + salaries + investorOverhead + s.leaseCost + interest + insurancePremium;
  const multiplier = region().costMod * philosophy().cost * difficulty().costMod * staffCostMod(s);
  const total = Math.round(subtotal * multiplier);
  return {
    operating,
    loadCost,
    salaries,
    lease: s.leaseCost,
    interest,
    investor: investorOverhead,
    insurance: insurancePremium,
    subtotal,
    multiplier,
    total
  };
}

function debtRate(s) {
  ensureDebtLots(s);
  if (!s.debt) return baseDebtRate(DIFFICULTIES.find(item => item.id === s.difficulty) || DIFFICULTIES[1]);
  return s.debtLots.reduce((sum, lot) => sum + lot.principal * lot.rate, 0) / s.debt;
}

function baseDebtRate(difficultyDef) {
  return difficultyDef.id === "grand" ? 0.018 : difficultyDef.id === "village" ? 0.01 : 0.014;
}

function newDebtRate(s) {
  const d = DIFFICULTIES.find(item => item.id === s.difficulty) || DIFFICULTIES[1];
  const utilization = s.creditLine ? s.debt / s.creditLine : 1;
  const cashStress = s.cash < 0 ? 0.012 : s.cash < 25000 ? 0.007 : s.cash < 60000 ? 0.003 : 0;
  const reputationStress = s.prestige < 25 ? 0.006 : s.prestige < 45 ? 0.002 : -0.001;
  const utilizationStress = utilization > 0.9 ? 0.012 : utilization > 0.7 ? 0.007 : utilization > 0.45 ? 0.003 : 0;
  return clamp(baseDebtRate(d) + cashStress + reputationStress + utilizationStress, 0.008, 0.045);
}

function ensureDebtLots(s) {
  if (!Array.isArray(s.debtLots)) {
    const d = DIFFICULTIES.find(item => item.id === s.difficulty) || DIFFICULTIES[1];
    s.debtLots = s.debt > 0 ? [{ principal: s.debt, rate: baseDebtRate(d), label: "Legacy debt" }] : [];
  }
  s.debtLots = s.debtLots.filter(lot => lot.principal > 0);
  const sum = s.debtLots.reduce((total, lot) => total + lot.principal, 0);
  if (Math.abs(sum - s.debt) > 1 && s.debt > sum) {
    s.debtLots.push({ principal: s.debt - sum, rate: newDebtRate(s), label: "Untracked draw" });
  }
  s.debt = Math.round(s.debtLots.reduce((total, lot) => total + lot.principal, 0));
}

function monthlyInterest(s) {
  ensureDebtLots(s);
  return Math.round(s.debtLots.reduce((sum, lot) => sum + lot.principal * lot.rate, 0));
}

function availableCredit(s) {
  return Math.max(0, (s.creditLine || 0) - s.debt);
}

function drawDebt(amount) {
  if (!state || state.gameOver) return;
  const draw = Math.min(amount, availableCredit(state));
  if (draw <= 0) return;
  const rate = addDebt(state, draw, "Credit-line draw");
  state.cash += draw;
  state.totalDebtDrawn = (state.totalDebtDrawn || 0) + draw;
  state.morale -= amount >= 50000 ? 2 : 0;
  log(state, `Drew ${money(draw)} from the winery credit line at ${(rate * 100).toFixed(1)}% monthly for new money.`);
  normalizeState(state);
  render();
}

function addDebt(s, amount, label) {
  ensureDebtLots(s);
  const rate = newDebtRate(s);
  s.debtLots.push({ principal: amount, rate, label });
  s.debt = Math.round(s.debtLots.reduce((total, lot) => total + lot.principal, 0));
  return rate;
}

function repayDebt(amount) {
  if (!state || state.gameOver) return;
  const payment = Math.min(amount, state.debt, Math.max(0, state.cash - 15000));
  if (payment <= 0) return;
  ensureDebtLots(state);
  let remaining = payment;
  state.debtLots.sort((a, b) => b.rate - a.rate);
  state.debtLots.forEach(lot => {
    const paid = Math.min(lot.principal, remaining);
    lot.principal -= paid;
    remaining -= paid;
  });
  // Update debt before filtering so ensureDebtLots doesn't see a gap and re-add a phantom draw
  state.debtLots = state.debtLots.filter(lot => lot.principal > 0);
  state.debt = Math.round(state.debtLots.reduce((sum, lot) => sum + lot.principal, 0));
  state.cash -= payment;
  state.influence += payment >= 50000 ? 2 : 1;
  log(state, `Repaid ${money(payment)} of winery debt.`);
  normalizeState(state);
  render();
}

function netWorth(s) {
  return s.cash - s.debt + s.inventory.cases * s.price * 12 + totalBulkWine(s) * 12 + totalGrapes(s) * 7 + buildingEquity(s);
}

function ensureHistory(s) {
  if (!Array.isArray(s.history)) s.history = [];
  if (typeof s.totalRevenue !== "number") s.totalRevenue = 0;
  if (typeof s.totalSold !== "number") s.totalSold = 0;
}

function ensureChannels(s) {
  if (!s.channelTrust) s.channelTrust = initialChannelTrust();
  Object.keys(CHANNELS).forEach(key => {
    if (typeof s.channelTrust[key] !== "number") s.channelTrust[key] = 58;
  });
  if (!s.channelDemand) {
    const r = REGIONS.find(item => item.id === s.region) || REGIONS[0];
    const v = VARIETALS[s.varietal] || VARIETALS.cabernet;
    const p = PHILOSOPHIES.find(item => item.id === s.philosophy) || PHILOSOPHIES[1];
    const d = DIFFICULTIES.find(item => item.id === s.difficulty) || DIFFICULTIES[1];
    s.channelDemand = initialChannelDemand(r, v, p, d, s.profile ?? 50, s.varietal);
  }
  Object.keys(CHANNELS).forEach(key => {
    if (typeof s.channelDemand[key] !== "number") s.channelDemand[key] = s.demand || 45;
    s.channelDemand[key] = clamp(Math.round(s.channelDemand[key]), 0, 130);
    s.channelTrust[key] = clamp(Math.round(s.channelTrust[key]), 0, 100);
  });
  s.demand = channelHeadlineDemand(s);
}

function ensureOrders(s) {
  if (!Array.isArray(s.orders)) s.orders = [];
  s.orders.forEach(order => {
    order.channel = order.channel || ORDER_CHANNEL[order.type] || "distributor";
    if (typeof order.retailCeiling !== "number") order.retailCeiling = order.maxPrice ?? s.price ?? 28;
    if (typeof order.maxPrice !== "number") order.maxPrice = order.retailCeiling;
    if (order.accepted && typeof order.acceptedReleasePrice !== "number") order.acceptedReleasePrice = Math.min(order.retailCeiling, s.price ?? order.retailCeiling);
    if (typeof order.netPrice !== "number") {
      order.netPrice = channelNetPrice(order, order.accepted ? order.acceptedReleasePrice : Math.min(s.price ?? order.retailCeiling, order.retailCeiling));
    }
    if (typeof order.penalty !== "number") order.penalty = Math.round((order.cases || 0) * order.netPrice * 12 * 0.18);
  });
}

function ensureArchive(s) {
  if (!Array.isArray(s.archive)) s.archive = [];
  s.archive.forEach(entry => {
    if (typeof entry.casesProduced !== "number") entry.casesProduced = 0;
    if (typeof entry.casesSold !== "number") entry.casesSold = 0;
    if (typeof entry.revenue !== "number") entry.revenue = 0;
    if (!entry.channels) entry.channels = {};
    if (!Array.isArray(entry.accolades)) entry.accolades = [];
  });
}

function ensureEventMemory(s) {
  if (!s.eventMemory) s.eventMemory = {};
}

function ensureLotRisk(s) {
  (s.vintages || []).forEach(lot => {
    if (typeof lot.flawRisk !== "number") lot.flawRisk = baseLotFlawRisk(s, lot);
    if (!Array.isArray(lot.flaws)) lot.flaws = [];
  });
}

function channelHeadlineDemand(s) {
  ensureChannelsShape(s);
  const d = s.channelDemand;
  return clamp(Math.round(
    d.cellarDoor * 0.21 +
    d.club * 0.16 +
    d.restaurant * 0.16 +
    d.distributor * 0.14 +
    d.export * 0.11 +
    d.collector * 0.10 +
    d.mass * 0.07 +
    (d.dtc || 0) * 0.05
  ), 0, 130);
}

function ensureChannelsShape(s) {
  if (!s.channelDemand) s.channelDemand = {};
  if (!s.channelTrust) s.channelTrust = {};
  Object.keys(CHANNELS).forEach(key => {
    if (typeof s.channelDemand[key] !== "number") s.channelDemand[key] = typeof s.demand === "number" ? s.demand : 45;
    if (typeof s.channelTrust[key] !== "number") s.channelTrust[key] = 58;
  });
}

function addChannelDemand(s, channels, amount) {
  ensureChannels(s);
  channels.forEach(key => {
    if (!(key in s.channelDemand)) return;
    const current = s.channelDemand[key];
    const cap = marketDemandCeiling(s, key);
    const damped = amount > 0 && current >= cap
      ? Math.max(0, Math.floor(amount * 0.25))
      : amount > 0 && current >= cap - 12
      ? Math.max(1, Math.ceil(amount * 0.5))
      : amount;
    s.channelDemand[key] = clamp(current + damped, 0, 130);
  });
  s.demand = channelHeadlineDemand(s);
}

function addChannelTrust(s, channel, amount) {
  ensureChannels(s);
  if (channel in s.channelTrust) s.channelTrust[channel] = clamp(s.channelTrust[channel] + amount, 0, 100);
}

function channelDemandForOrder(s, type) {
  ensureChannels(s);
  const channel = ORDER_CHANNEL[type] || "distributor";
  return (s.channelDemand[channel] || s.demand || 40) * ((s.channelTrust[channel] || 55) / 65);
}

function channelNetMultiplier(channel) {
  return CHANNELS[channel]?.net || 0.55;
}

function channelNetPrice(order, releasePrice) {
  const channel = order.channel || ORDER_CHANNEL[order.type] || "distributor";
  return Math.round(releasePrice * channelNetMultiplier(channel));
}

function orderRetailCeiling(order) {
  return order.retailCeiling ?? order.maxPrice ?? 0;
}

function currentReleaseScore(s) {
  ensureArchive(s);
  const active = s.archive.find(entry => entry.casesProduced > entry.casesSold && entry.score);
  if (active) return active.score;
  const recent = s.archive.find(entry => entry.score);
  if (recent) return recent.score;
  return calcCriticScore(s.currentVintageScore || 3, s.quality || 60);
}

function marketDemandCeiling(s, channel) {
  const score = currentReleaseScore(s);
  const base = CHANNEL_SOFT_CAPS[channel] || 95;
  const scoreMod = Math.round((score - 88) * 2.1);
  const prestigeMod = Math.floor(Math.max(0, (s.prestige || 0) - 45) / 8);
  const roomMod = channel === "cellarDoor" ? (s.buildings.room || 0) * 3 : 0;
  const clubMod = channel === "club" ? staffBonus(s, "clubIncome") * 3 : 0;
  const collectorPenalty = channel === "collector" && score < 90 ? -8 : 0;
  return clamp(base + scoreMod + prestigeMod + roomMod + clubMod + collectorPenalty, 48, 122);
}

function applyChannelDemandDrift(s, monthlyCasesSold) {
  ensureChannels(s);
  const score = currentReleaseScore(s);
  const globalDemand = channelHeadlineDemand(s);
  // High demand is harder to maintain: each tier above 80 adds extra monthly gravity
  const demandGravity = globalDemand >= 110 ? 2 : globalDemand >= 95 ? 1 : 0;
  Object.keys(CHANNELS).forEach(key => {
    const cap = marketDemandCeiling(s, key);
    if (s.channelDemand[key] > cap) {
      const excess = s.channelDemand[key] - cap;
      s.channelDemand[key] = Math.max(cap, s.channelDemand[key] - Math.max(1, Math.ceil(excess * 0.22)));
    }
    if (monthlyCasesSold <= 0) {
      s.channelDemand[key] -= key === "cellarDoor" || key === "club" ? 3 : 2;
      if (key === "club" || key === "restaurant") s.channelTrust[key] -= 1;
    } else if (monthlyCasesSold < 20 && s.channelDemand[key] > 75) {
      s.channelDemand[key] -= 1;
    }
    if (score < 86 && ["collector", "restaurant", "club"].includes(key)) s.channelDemand[key] -= 1;
    // Artisan gravity: high demand on prestige channels erodes without constant critic re-validation
    if (demandGravity > 0 && ["collector", "restaurant", "club"].includes(key)) {
      s.channelDemand[key] -= demandGravity;
    }
    // Commercial gravity: high demand on volume channels erodes from shelf rotation, competing brands, promo fatigue
    const profile = s.profile ?? 50;
    if (profile <= 40 && globalDemand >= 88 && ["distributor", "supermarket", "export"].includes(key)) {
      const commercialGravity = globalDemand >= 105 ? 2 : 1;
      s.channelDemand[key] -= commercialGravity;
    }
    // Volume channels punish low case throughput hard — distributors drop slow brands
    if (["distributor", "supermarket"].includes(key) && monthlyCasesSold < 15 && s.channelDemand[key] > 60) {
      s.channelDemand[key] -= 1;
      s.channelTrust[key] -= 1;
    }
    s.channelDemand[key] = clamp(Math.round(s.channelDemand[key]), 0, 130);
    s.channelTrust[key] = clamp(Math.round(s.channelTrust[key]), 0, 100);
  });
  s.demand = channelHeadlineDemand(s);
}

function baseLotFlawRisk(s, lot) {
  const profile = s.profile ?? 50;
  const p = PHILOSOPHIES.find(item => item.id === s.philosophy) || PHILOSOPHIES[1];
  const naturalRisk = p.id === "natural" || profile >= 70 ? 10 : p.id === "industrial" ? -4 : 0;
  const labProtection = (s.buildings?.lab || 0) * 5 + staffBonus(s, "cellar") * 3 + staffBonus(s, "bottling") * 2;
  const disease = Math.max(0, averageDisease(s) - 30) * 0.22;
  const purchased = lot?.purchased ? -4 : 0;
  return clamp(Math.round(20 + naturalRisk + disease - labProtection + purchased), 3, 70);
}

function managementLoad(s) {
  const accepted = s.orders.filter(o => o.accepted).length;
  const unaccepted = s.orders.length - accepted;
  const debtLoad = s.debt > 0 ? Math.ceil(s.debt / 50000) : 0;
  const investorLoad = s.investor?.pressureMonths > 0 ? 3 : 0;
  const clubLoad = staffBonus(s, "clubIncome") > 0 ? 2 : 0;
  const buildingLoad = Object.values(s.buildings || {}).reduce((sum, level) => sum + level, 0) * 0.8;
  return Math.round(s.rows.length * 1.5 + buildingLoad + accepted * 2.2 + unaccepted * 0.6 + s.staff.length * 0.8 + debtLoad + investorLoad + clubLoad);
}

function organizationCapacity(s) {
  return Math.round(9 + staffBonus(s, "finance") * 3 + staffBonus(s, "bottling") * 2 + staffBonus(s, "sales") * 1.5 + (s.buildings.lab || 0) * 2 + (s.buildings.line || 0) + (s.marketMods?.winterPlan ? 2 : 0));
}

function loadPressure(s) {
  return Math.max(0, managementLoad(s) - organizationCapacity(s));
}

function monthlyOperationalCapacity(s) {
  const cap = { vineyard: 0, cellar: 0, ops: 0, hospitality: 0, sales: 0 };
  const has = id => (s.staff || []).includes(id);
  if (has("ines")) cap.vineyard += 1;
  if (has("dr_chen")) cap.vineyard += 1;
  if (has("rodrigo")) cap.vineyard += 1;
  if (has("marco")) cap.cellar += 1;
  if (has("oscar")) cap.cellar += 1;
  if (has("samir")) cap.ops += 1;
  if (has("nadia")) cap.ops += 1;
  if (has("beatrice")) cap.hospitality += 1;
  if (has("felix")) cap.hospitality += 1;
  ["asha", "lucy", "priya", "margot"].forEach(id => { if (has(id)) cap.sales += 1; });
  if ((s.buildings.lab || 0) >= 2) cap.vineyard += 1;
  if ((s.buildings.tank || 0) >= 3) cap.cellar += 1;
  if ((s.buildings.line || 0) >= 2) cap.ops += 1;
  if ((s.buildings.room || 0) >= 2) cap.hospitality += 1;
  return cap;
}

function resetActionBudgets(s) {
  s.actionsLeft = Math.max(1, 2 - (s.morale < 20 ? 1 : 0) - ((s.fatigue || 0) > 78 ? 1 : 0));
  s.capacityLeft = monthlyOperationalCapacity(s);
  s.capacityMonth = s.month;
}

function ensureActionBudgets(s) {
  if (!s.capacityLeft || typeof s.capacityMonth !== "number") {
    s.capacityLeft = monthlyOperationalCapacity(s);
    s.capacityMonth = s.month || 1;
  }
  Object.keys(monthlyOperationalCapacity(s)).forEach(key => {
    if (typeof s.capacityLeft[key] !== "number") s.capacityLeft[key] = 0;
  });
  if (typeof s.actionsLeft !== "number") s.actionsLeft = 2;
}

function seasonalCapacityKey(s) {
  if (s.season === "Budbreak" || s.season === "Flowering" || s.season === "Veraison") return "vineyard";
  if (s.season === "Harvest") return isHarvestMonth(s.month, s.region) ? "vineyard" : "cellar";
  if (s.season === "Cellar") return "cellar";
  return null;
}

function actionCapacityKey(action, s) {
  if (action.id === "seasonal") return seasonalCapacityKey(s);
  return ACTION_CAPACITY[action.id] || null;
}

function canSpendForAction(action, s) {
  const key = actionCapacityKey(action, s);
  if (key && (s.capacityLeft?.[key] || 0) > 0) return true;
  return s.actionsLeft > 0;
}

function spendForAction(action, s) {
  const key = actionCapacityKey(action, s);
  if (key && (s.capacityLeft?.[key] || 0) > 0) {
    s.capacityLeft[key] -= 1;
    return { type: "capacity", key };
  }
  s.actionsLeft -= 1;
  if (key) s.fatigue += 2;
  return { type: "owner", key };
}

function capacityLabel(key) {
  return ({ vineyard: "Vineyard", cellar: "Cellar", ops: "Ops", hospitality: "Hospitality", sales: "Sales" })[key] || "Staff";
}

function applyCapacityDelta(s, beforeCap) {
  const afterCap = monthlyOperationalCapacity(s);
  ensureActionBudgets(s);
  Object.keys(afterCap).forEach(key => {
    const delta = afterCap[key] - (beforeCap[key] || 0);
    s.capacityLeft[key] = clamp((s.capacityLeft[key] || 0) + delta, 0, afterCap[key]);
  });
}

function reconcileGlobalDemand(s) {
  ensureChannelsShape(s);
  const headline = channelHeadlineDemand(s);
  const desired = typeof s.demand === "number" ? clamp(Math.round(s.demand), 0, 130) : headline;
  const delta = desired - headline;
  if (Math.abs(delta) >= 1) {
    Object.keys(CHANNELS).forEach(key => {
      s.channelDemand[key] = clamp(s.channelDemand[key] + delta, 0, 130);
    });
  }
  s.demand = channelHeadlineDemand(s);
}

function recordHistory(s, fixedCost) {
  ensureHistory(s);
  const breakdown = typeof fixedCost === "object" ? fixedCost : { total: fixedCost };
  const last = s.history.length ? s.history[s.history.length - 1] : null;
  const previousRevenue = last ? last.totalRevenue : 0;
  const previousSold = last ? last.totalSold : 0;
  const revenue = Math.max(0, s.totalRevenue - previousRevenue);
  s.history.push({
    month: s.month,
    revenue,
    casesSold: Math.max(0, s.totalSold - previousSold),
    fixedCost: breakdown.total || 0,
    operatingCost: breakdown.operating || 0,
    payrollCost: breakdown.salaries || 0,
    leaseCost: breakdown.lease || 0,
    interestCost: breakdown.interest || 0,
    harvestLaborCost: breakdown.harvestLabor || 0,
    investorCost: breakdown.investor || 0,
    pnl: revenue - (breakdown.total || 0),
    cash: s.cash,
    netWorth: netWorth(s),
    demand: s.demand,
    prestige: s.prestige,
    quality: s.quality,
    cases: s.inventory.cases,
    totalRevenue: s.totalRevenue,
    totalSold: s.totalSold
  });
  s.history = s.history.slice(-36);
}

function directSales(s) {
  ensureChannels(s);
  const demandMod = profileDemandMod(s);
  const directDemand = s.channelDemand.cellarDoor * 0.75 + s.channelDemand.club * 0.15 + s.channelDemand.collector * 0.10;
  const directTrust = (s.channelTrust.cellarDoor * 0.75 + s.channelTrust.club * 0.15 + s.channelTrust.collector * 0.10) / 58;
  // Demand gates sales volume multiplicatively: low demand means few buyers regardless of quality/prestige
  const qualitySignal = (s.prestige * 0.8 + s.quality * 0.7 + s.marketHeat * 0.6) / 3;
  const demandScale = clamp(directDemand * demandMod / 65, 0.05, 2.2);
  const desirability = qualitySignal * demandScale;
  // Veblen pricing: at prestige 92+ raising price signals exclusivity rather than limiting volume
  const veblenFactor = s.prestige >= 92 ? clamp(1 - (s.prestige - 92) * 0.075, 0.18, 1) : 1;
  // Ceiling pressure: demand collapses sharply as price approaches the style ceiling, reaching ~0 at the ceiling itself
  const ceil = profilePriceCeil(s);
  const ceilRatio = s.price / ceil;
  const ceilingPressure = ceilRatio < 0.75 ? 1 : Math.pow(0.25 / Math.max(0.001, 1 - ceilRatio), 2.2);
  const priceResistance = Math.pow(s.price / 28, 1.55 * veblenFactor) * ceilingPressure;
  // Price squeeze: supermarket renegotiation knocked revenue per case down
  const squeezeMod = s.marketMods?.priceSqueeze ? 0.88 : 1;
  const capacity = (70 + s.buildings.room * 80 + staffBonus(s, "sales") * 45 + staffBonus(s, "brand") * 55) * clamp(directTrust, 0.65, 1.35);
  const rawCases = Math.max(0, Math.floor((capacity * desirability) / (65 * priceResistance)));
  const salesCeiling = 35 + s.buildings.room * 50 + staffBonus(s, "sales") * 20 + staffBonus(s, "brand") * 15;
  const cases = Math.min(availableCases(s), rawCases, salesCeiling);
  const premium = 1 + Math.max(0, s.prestige - 45) / 210 + staffBonus(s, "brand") * 0.06;
  const vintageMod = vintageScoreMultiplier(s.currentVintageScore || 3);
  const revenue = Math.round(cases * s.price * 12 * premium * vintageMod * squeezeMod);
  return { cases, revenue, channel: "cellarDoor" };
}

function recordArchiveBottling(s, lot, cases) {
  ensureArchive(s);
  const id = lot.archiveId || lot.id;
  lot.archiveId = id;
  let entry = s.archive.find(item => item.id === id);
  if (!entry) {
    entry = {
      id,
      year: lot.year,
      label: lot.label,
      grape: varietal().name,
      region: region().name,
      score: lot.criticScore || calcCriticScore(lot.score || 3, s.quality),
      vintageScore: lot.score || 3,
      casesProduced: 0,
      casesSold: 0,
      revenue: 0,
      avgPrice: 0,
      accolades: [],
      channels: {},
      summary: tastingNote(s, lot),
      bottledMonth: s.month,
      soldOutMonth: null
    };
    s.archive.unshift(entry);
  }
  entry.label = lot.label;
  entry.score = lot.criticScore || entry.score;
  entry.vintageScore = lot.score || entry.vintageScore;
  entry.casesProduced += cases;
  if (entry.score >= 94 && !entry.accolades.includes("Breakout vintage")) entry.accolades.push("Breakout vintage");
  if (entry.vintageScore >= 5 && !entry.accolades.includes("Exceptional harvest")) entry.accolades.push("Exceptional harvest");
}

function recordArchiveSale(s, cases, revenue, channel = "cellarDoor") {
  ensureArchive(s);
  let remainingCases = cases;
  let remainingRevenue = revenue;
  const candidates = [...s.archive].reverse().filter(entry => entry.casesSold < entry.casesProduced);
  candidates.forEach(entry => {
    if (remainingCases <= 0) return;
    const open = Math.max(0, entry.casesProduced - entry.casesSold);
    const sold = Math.min(open, remainingCases);
    const saleRevenue = cases > 0 ? Math.round(revenue * (sold / cases)) : 0;
    entry.casesSold += sold;
    entry.revenue += saleRevenue;
    entry.avgPrice = entry.casesSold ? Math.round(entry.revenue / (entry.casesSold * 12)) : 0;
    entry.channels[channel] = (entry.channels[channel] || 0) + sold;
    remainingCases -= sold;
    remainingRevenue -= saleRevenue;
    if (entry.casesSold >= entry.casesProduced && !entry.soldOutMonth) {
      entry.soldOutMonth = s.month;
      const strong = entry.score >= 92 || entry.vintageScore >= 5;
      if (strong) {
        entry.accolades.push("Sold out");
        addChannelDemand(s, ["collector", "club"], 3);
        log(s, `${entry.label} sold through. Scarcity is now part of the story.`);
      }
    }
  });
  if (remainingCases > 0 && s.archive.length) {
    const entry = s.archive[0];
    entry.casesSold += remainingCases;
    entry.revenue += remainingRevenue;
    entry.avgPrice = entry.casesSold ? Math.round(entry.revenue / (entry.casesSold * 12)) : 0;
    entry.channels[channel] = (entry.channels[channel] || 0) + remainingCases;
  }
}

function tastingNote(s, lot) {
  const tier = profileTier(s.profile ?? 50);
  const quality = lot.criticScore || calcCriticScore(lot.score || 3, s.quality);
  const v = s.varietal;
  const reg = s.region;

  const varietalNotes = {
    nebbiolo: [
      "dried rose, iron, and tar; a wine that demands time",
      "violet, red cherry, and forest floor; built for the cellar",
      "ripe fruit beneath austere tannin; classic Langhe structure",
      "compressed fruit, fine acid, and the promise of something longer"
    ],
    shiraz: [
      "blackberry, smoked meat, and cracked pepper; warm-climate and full-bodied",
      "dark plum, olive tapenade, and iron; bold and structured",
      "inky fruit, licorice, and fine tannin; rich and long",
      "ripe fruit, leather, and a savory mineral close"
    ],
    tempranillo: [
      "ripe cherry, dried herbs, and vanilla oak; classic Mediterranean warmth",
      "dark plum, leather, and tobacco; long barrel aging on display",
      "fig, cedar, and structured fruit; traditional and cellar-worthy",
      "warm fruit, red berries, and integrated wood spice"
    ],
    malbec: [
      "juicy plum, mocha, and violets; Mendoza in its most generous form",
      "dark cherry, chocolate, and velvety tannin; ripe and approachable",
      "ripe fruit, coffee, and leather; altitude fruit with broad appeal",
      "concentrated dark berry, lavender, and a smooth, generous finish"
    ],
    cabernet: [
      "blackcurrant, cedar, and fine tannin; restrained and long",
      "cassis, graphite, and dried herb; classic structure and precision",
      "dark fruit, tobacco, and new oak; power tempered by careful extraction",
      "firm tannin, dark cherry, and pencil lead; classic and cellar-worthy"
    ],
    merlot: [
      "plum, soft tannin, and dark chocolate; early appeal with genuine depth",
      "red cherry, velvet texture, and bay leaf; plush and food-friendly",
      "approachable fruit, gentle oak, and a smooth, persistent finish",
      "blueberry, mocha, and soft structure; generous and honest"
    ],
    chardonnay: [
      "citrus, stone fruit, and integrated oak; precise and creamy",
      "apple, cream, and toasty lees; well-structured and persistent",
      "fresh acidity, pear, and subtle nuttiness; mineral-driven",
      "peach, vanilla, and light toast; balanced and expressive"
    ],
    sauvignon: [
      "grapefruit, freshly cut grass, and chalky minerality",
      "citrus zest, white currant, and a saline edge; long and vibrant",
      "lifted aromatics, passion fruit, and a textural mid-palate",
      "gooseberry, green herb, and precise, focused acidity"
    ],
    riesling: [
      "lime blossom, wet slate, and laser-precise acidity; crystalline",
      "stone fruit, petrol note, and honeyed complexity; built for decades",
      "off-dry balance, mandarin peel, and a steely backbone",
      "white flowers, citrus oil, and a long mineral finish"
    ],
    pinot: [
      "red fruit, forest floor, and silky tannin; elegant and site-expressive",
      "dried cherry, earth, and subtle spice; Burgundian in weight and length",
      "translucent fruit, iron minerality, and fine-grained structure",
      "raspberry, violet, and a delicate, lingering finish"
    ],
    gamay: [
      "bright cherry, violet, and fresh earthiness; light and immediately joyful",
      "juicy red fruit, gentle grip, and a floral lift; drink young",
      "fragrant, crunchy, and energetically fruited; honest and undemanding",
      "red berries, pepper, and a lively, peppery close"
    ],
    cabfranc: [
      "red pepper, blackcurrant leaf, and pencil shavings; precise and restrained",
      "floral lift, dark fruit, and a mineral core; medium weight with length",
      "graphite, raspberry, and fine tannin; elegant and true to type",
      "herbs, dark cherry, and a long savory finish"
    ],
  };

  const regionCtx = {
    napa:       "California warmth and impressive concentration",
    bordeaux:   "old-world structure and classical restraint",
    burgundy:   "Burgundian subtlety and terroir fidelity",
    mosel:      "Mosel precision and mineral tension",
    mendoza:    "Andean altitude and generous, open-knit fruit",
    barossa:    "Barossa richness and old-vine intensity",
    piedmont:   "Piemontese austerity and long aging potential",
    rioja:      "traditional oak integration and Rioja warmth",
    fingerlakes: "cool-climate energy and tightly wound acidity",
  };

  const styleCtx = tier === "cult" ? "Minimal-intervention" :
    tier === "artisan" ? "Thoughtfully crafted" :
    tier === "commercial" ? "Reliably produced" : "Classically made";

  const qualityTail = quality >= 94 ? "exceptional depth; will reward the cellar" :
    quality >= 90 ? "real finesse and a long, rewarding finish" :
    quality >= 86 ? "honest balance and good regional character" :
    quality >= 82 ? "clean varietal expression and early appeal" :
    "simple and best drunk young";

  const notes = varietalNotes[v];
  const note = notes ? notes[randint(0, notes.length - 1)] : "ripe fruit and clean structure";
  const ctx = regionCtx[reg] || "regional character on display";

  return `${styleCtx} ${VARIETALS[v]?.name || "wine"}: ${note}. ${ctx}; ${qualityTail}.`;
}

function archiveMemory(s) {
  ensureArchive(s);
  const made = s.archive.filter(entry => entry.casesProduced > 0);
  if (!made.length) return { bestScore: 0, avgScore: 0, consistency: 0, soldOutPrestige: 0 };
  const scores = made.map(entry => entry.score || 0).filter(Boolean);
  const bestScore = Math.max(0, ...scores);
  const avgScore = scores.length ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
  const recent = made.slice(0, 4);
  const consistency = recent.length >= 3 ? 6 - (Math.max(...recent.map(e => e.score || 84)) - Math.min(...recent.map(e => e.score || 84))) : 0;
  const soldOutPrestige = made.filter(entry => entry.soldOutMonth && (entry.score || 0) >= 92).length;
  return { bestScore, avgScore, consistency, soldOutPrestige };
}

function reservedCases(s) {
  return s.orders.reduce((sum, order) => sum + (order.accepted ? order.cases : 0), 0);
}

function availableCases(s) {
  return Math.max(0, s.inventory.cases - reservedCases(s) - (s.inventory.stash || 0));
}

function totalGrapes(s) {
  return (s.vintages || []).reduce((sum, v) => sum + (v.grapes || 0), 0);
}

function totalBulkWine(s) {
  return (s.vintages || []).reduce((sum, v) => sum + (v.bulkWine || 0), 0);
}

function readyVintages(s) {
  return (s.vintages || []).filter(v => v.bulkWine > 0 && v.agingMonths >= v.agingTarget);
}

function totalReadyBulk(s) {
  return readyVintages(s).reduce((sum, v) => sum + v.bulkWine, 0);
}

function agingTarget(s) {
  return (AGING_TARGETS[s.varietal] || 5) + (REGION_AGING_BONUS[s.region] || 0);
}

function vintageScoreMultiplier(score) {
  return ({ 1: 0.82, 2: 0.91, 3: 1.0, 4: 1.13, 5: 1.28 })[clamp(score, 1, 5)] || 1;
}

function vintageScoreLabel(score) {
  return ({ 1: "Poor", 2: "Below Average", 3: "Average", 4: "Good", 5: "Exceptional" })[clamp(score, 1, 5)] || "Unknown";
}

function vintageScoreStars(score) {
  const s = clamp(score, 1, 5);
  return "★".repeat(s) + "☆".repeat(5 - s);
}

function calcCriticScore(vintageScore, quality) {
  const base = 82 + (vintageScore - 3) * 4;
  const qMod = Math.floor(Math.max(0, quality - 60) / 8);
  const variance = randint(-2, 2);
  const raw = base + qMod + variance;
  return clamp(Math.min(raw, qualityCeiling(state, vintageScore)), 78, 100);
}

function qualityCeiling(s, vintageScore = 3) {
  if (!s) return 92;
  const site = Math.round((REGIONS.find(r => r.id === s.region)?.qualityMod || 1) * 3);
  const infrastructure = (s.buildings.tank || 0) * 0.9 + (s.buildings.barrel || 0) * 1.25 + (s.buildings.lab || 0) * 1.3 + (s.buildings.line || 0) * 0.6;
  const people = staffBonus(s, "cellar") * 1.8 + staffBonus(s, "vineyard") * 0.8 + staffBonus(s, "bottling") * 0.5;
  const vineyard = clamp((productiveRows(s).reduce((sum, row) => sum + row.health, 0) / Math.max(1, productiveRows(s).length) - 70) / 5, -3, 4);
  const vintage = (vintageScore - 3) * 1.6;
  const artisan = (s.profile ?? 50) >= 65 ? 1 : 0;
  return Math.round(clamp(88 + site + infrastructure + people + vineyard + vintage + artisan, 88, 99));
}

function applyBottlingFlawCheck(s, lot) {
  ensureLotRisk(s);
  if (!lot || lot.flawRisk <= 0) return;
  const pressure = loadPressure(s);
  const risk = clamp(lot.flawRisk + pressure * 2 - staffBonus(s, "bottling") * 3 - (s.buildings.lab || 0) * 4, 1, 90);
  if (rand() * 100 > risk) {
    lot.flawRisk = clamp(lot.flawRisk - 8 - staffBonus(s, "cellar") * 2, 1, 90);
    return;
  }
  const flaws = ["volatile acidity", "oxidation", "Brett", "refermentation", "mousiness"];
  const flaw = flaws[randint(0, flaws.length - 1)];
  lot.flaws = lot.flaws || [];
  lot.flaws.push(flaw);
  lot.score = Math.max(1, (lot.score || 3) - 1);
  s.quality -= 4;
  s.prestige -= 2;
  lot.flawRisk = clamp(lot.flawRisk + 10, 1, 95);
  log(s, `${lot.label} showed ${flaw} risk at bottling. The wine was downgraded before release.`);
}

function flawRiskDrift(s, lot) {
  const lowIntervention = (s.profile ?? 50) >= 70 || s.philosophy === "natural" ? 3 : 0;
  const longAging = lot.agingTarget > 0 && lot.agingMonths > lot.agingTarget ? 1 : 0;
  const lab = (s.buildings.lab || 0) * -2;
  const cellar = staffBonus(s, "cellar") * -1;
  const load = Math.floor(loadPressure(s) / 5);
  const lineProtection = (s.buildings.line || 0) >= 2 ? -1 : 0;
  return lowIntervention + longAging + load + lab + cellar + lineProtection;
}

function applyReleaseExpectations(s, lot) {
  const memory = archiveMemory(s);
  const score = lot.criticScore || 0;
  const drop = memory.bestScore - score;
  const isElite = s.prestige >= 88 || memory.bestScore >= 94;

  if (score >= 96) {
    addChannelDemand(s, ["collector", "club", "restaurant"], 12);
    addChannelTrust(s, "collector", 10); addChannelTrust(s, "restaurant", 6);
    s.prestige += 8;
    log(s, `${lot.label} is exceptional — critics are calling it a reference point for the estate. Demand is immediate.`);
  } else if (score >= 94) {
    addChannelDemand(s, ["collector", "club", "restaurant"], 8);
    addChannelTrust(s, "collector", 6); addChannelTrust(s, "restaurant", 4);
    s.prestige += 5;
    log(s, `${lot.label} became a breakout release. Future buyers will compare new vintages against it.`);
  } else if (score >= 90 && memory.avgScore >= 88) {
    addChannelTrust(s, "restaurant", 2); addChannelTrust(s, "club", 2);
    s.prestige += 1;
  }

  // Fall-from-grace: elite estates face severe consequences for underperforming
  if (isElite && drop >= 10) {
    addChannelTrust(s, "collector", -18); addChannelTrust(s, "club", -12); addChannelTrust(s, "restaurant", -10);
    addChannelDemand(s, ["collector", "club"], -8);
    s.prestige -= 10; s.demand -= 6;
    s.legacyPressureMonths = (s.legacyPressureMonths || 0) + 8;
    log(s, `A ${score}-point release from an estate with a ${memory.bestScore}-point high-water mark is a story. The press is not kind. Collector trust cratered.`);
  } else if (isElite && drop >= 6) {
    addChannelTrust(s, "collector", -10); addChannelTrust(s, "club", -6); addChannelTrust(s, "restaurant", -5);
    addChannelDemand(s, ["collector"], -4);
    s.prestige -= 5; s.demand -= 3;
    s.legacyPressureMonths = (s.legacyPressureMonths || 0) + 4;
    log(s, `Collectors remember the ${memory.bestScore}-point vintage. A ${score}-point release creates questions the estate will spend months answering.`);
  } else if (isElite && drop >= 3 && score < 90) {
    addChannelTrust(s, "collector", -5); addChannelTrust(s, "club", -3);
    s.prestige -= 2;
    s.legacyPressureMonths = (s.legacyPressureMonths || 0) + 2;
    log(s, `A quiet release from a high-prestige estate. The trade will notice the step down from the ${memory.bestScore}-point benchmark.`);
  }
}

function estimatePassiveStaffIncome(s) {
  const tourPoints = staffBonus(s, "tourIncome");
  const tourIncome = tourPoints > 0 ? tourPoints * Math.max(1, s.buildings.room) * 1800 : 0;
  const clubPoints = staffBonus(s, "clubIncome");
  const clubIncome = clubPoints > 0 ? clubPoints * (2200 + Math.max(0, s.prestige - 30) * 40) : 0;
  let dtcIncome = 0;
  if (s.staff.includes("priya")) {
    ensureChannels(s);
    dtcIncome = Math.round(3000 * ((s.channelDemand.dtc || 20) / 50) * ((s.channelTrust.dtc || 58) / 60));
  }
  return { tourIncome, clubIncome, dtcIncome };
}

function computeVintageScore(weatherScore, rowHealth) {
  const healthFactor = clamp((rowHealth - 40) / 55, -1, 1);
  const combined = (weatherScore || 50) + healthFactor * 15;
  return combined >= 72 ? 5 : combined >= 58 ? 4 : combined >= 42 ? 3 : combined >= 26 ? 2 : 1;
}

function ensureVintages(s) {
  if (!Array.isArray(s.vintages)) {
    s.vintages = [];
    const yr = START_YEAR + Math.floor((START_MONTH_INDEX + (s.month || 1) - 1) / 12);
    const gr = s.inventory ? (s.inventory.grapes || 0) : 0;
    const bw = s.inventory ? (s.inventory.bulkWine || 0) : 0;
    if (gr > 0 || bw > 0) {
      s.vintages.push({ id: "legacy", year: yr - 1, score: 3, label: `${yr - 1} Opening Stock`, grapes: gr, bulkWine: bw, agingMonths: 999, agingTarget: 0, purchased: true });
    }
    if (s.inventory) { s.inventory.grapes = 0; s.inventory.bulkWine = 0; }
  }
  if (typeof s.vintageWeatherScore !== "number") s.vintageWeatherScore = 52;
  if (typeof s.currentVintageScore !== "number") s.currentVintageScore = 3;
}

function ensureStaffProgress(s, id) {
  if (!s.staffProgress) s.staffProgress = {};
  if (!s.staffProgress[id]) s.staffProgress[id] = { xp: 0, perks: [] };
  if (!Array.isArray(s.staffProgress[id].perks)) s.staffProgress[id].perks = [];
  if (typeof s.staffProgress[id].xp !== "number") s.staffProgress[id].xp = 0;
  return s.staffProgress[id];
}

function ensureAllStaffProgress(s) {
  if (!s) return;
  if (!s.staffProgress) s.staffProgress = {};
  (s.staff || []).forEach(id => ensureStaffProgress(s, id));
}

function ensureStaffTraits(s) {
  if (!s.staffTraits) s.staffTraits = {};
  [...(s.staff || []), ...(s.staffMarket || [])].forEach(id => {
    const person = STAFF_POOL.find(p => p.id === id);
    if (person?.hidden) return;
    if (!s.staffTraits[id]) rollTraitsForStaff(s, id);
  });
}

function rollTraitsForStaff(s, id) {
  if (!s.staffTraits) s.staffTraits = {};
  if (s.staffTraits[id]) return;
  const virtues = Object.keys(PERSONALITY_TRAITS).filter(k => PERSONALITY_TRAITS[k].positive);
  const vices = Object.keys(PERSONALITY_TRAITS).filter(k => !PERSONALITY_TRAITS[k].positive);
  s.staffTraits[id] = [
    virtues[randint(0, virtues.length - 1)],
    vices[randint(0, vices.length - 1)]
  ];
}

function getStaffTraits(s, id) {
  return (s.staffTraits?.[id] || []).map(key => ({ key, ...PERSONALITY_TRAITS[key] })).filter(t => t.name);
}

function traitAffinityBonus(s, traitList) {
  return s.staff.some(id => (s.staffTraits?.[id] || []).some(t => traitList.includes(t)));
}

function staffFrictionMorale(s) {
  let delta = 0;
  for (let i = 0; i < s.staff.length; i++) {
    for (let j = i + 1; j < s.staff.length; j++) {
      const aTraits = s.staffTraits?.[s.staff[i]] || [];
      const bTraits = s.staffTraits?.[s.staff[j]] || [];
      const conflict =
        aTraits.some(t => (PERSONALITY_TRAITS[t]?.friction || []).some(f => bTraits.includes(f))) ||
        bTraits.some(t => (PERSONALITY_TRAITS[t]?.friction || []).some(f => aTraits.includes(f)));
      if (conflict) delta -= 1;
    }
  }
  return delta;
}

function staffTraitPassiveEffects(s) {
  let morale = 0, demand = 0, inventoryLeak = 0;
  s.staff.forEach(id => {
    (s.staffTraits?.[id] || []).forEach(t => {
      const trait = PERSONALITY_TRAITS[t];
      if (!trait) return;
      morale += trait.teamMorale || 0;
      demand += trait.teamDemand || 0;
      inventoryLeak += trait.inventoryLeak || 0;
      if (trait.moraleWhenLow && s.morale < 40) morale += trait.moraleWhenLow;
    });
  });
  return { morale, demand, inventoryLeak };
}

function checkLustfulPair(s) {
  if (rand() > 0.22) return;
  const lustfulStaff = s.staff.filter(id => (s.staffTraits?.[id] || []).includes("lustful"));
  if (lustfulStaff.length < 2) return;
  const male = lustfulStaff.find(id => STAFF_POOL.find(p => p.id === id)?.gender === "m");
  const female = lustfulStaff.find(id => STAFF_POOL.find(p => p.id === id)?.gender === "f");
  if (!male || !female) return;
  const mName = STAFF_POOL.find(p => p.id === male).name.split(" ")[0];
  const fName = STAFF_POOL.find(p => p.id === female).name.split(" ")[0];
  const messages = [
    `A scheduling conflict had ${fName} and ${mName} sharing a cellar shift nobody else wanted. The door was closed for some time. Two cases are unaccounted for.`,
    `The barrel room logs show ${mName} and ${fName} on a late evening shift together. No notes were filed. Inventory is slightly light.`,
    `${mName} has been arriving with fresh espresso for ${fName} every morning. The rest of the team has noticed.`,
    `An unscheduled site inspection involving ${fName} and ${mName} occupied most of a Tuesday afternoon. No report was submitted.`,
    `${mName} and ${fName} requested the same three days off next month. The overlap appears to be entirely coincidental.`,
    `Tasting notes for the new barrel lot were found in ${mName}'s handwriting, annotated in ${fName}'s. Neither mentioned it at the team meeting.`,
  ];
  const msg = messages[randint(0, messages.length - 1)];
  const caseLeak = msg.includes("cases") || msg.includes("light") ? 2 : 0;
  if (caseLeak > 0 && s.inventory.cases >= caseLeak) s.inventory.cases -= caseLeak;
  s.morale = clamp(s.morale - 1, 0, 100);
  s.lustfulPairFired = true;
  log(s, msg);
}

function moraleBreakdownItems(s) {
  const load = loadPressure(s);
  const fatiguePenalty = -Math.floor((s.fatigue || 0) / 28);
  const loadPenalty = -Math.floor(load / 9);
  const cashBonus = Math.floor(s.cash / 160000);
  const items = [];

  items.push({ label: "Base decay", delta: -2 });
  if (cashBonus !== 0) items.push({ label: "Cash buffer", delta: cashBonus });
  if (fatiguePenalty !== 0) items.push({ label: "Fatigue", delta: fatiguePenalty });
  if (loadPenalty !== 0) items.push({ label: "Overload", delta: loadPenalty });

  s.staff.forEach(id => {
    const person = STAFF_POOL.find(p => p.id === id);
    const traits = s.staffTraits?.[id] || [];
    let moraleEffect = 0;
    const activeNames = [];
    traits.forEach(t => {
      const trait = PERSONALITY_TRAITS[t];
      if (!trait) return;
      const eff = (trait.teamMorale || 0) + (trait.moraleWhenLow && s.morale < 40 ? trait.moraleWhenLow : 0);
      if (eff !== 0) { moraleEffect += eff; activeNames.push(trait.name); }
    });
    if (moraleEffect !== 0 && person) {
      items.push({ label: `${person.name} (${activeNames.join(", ")})`, delta: moraleEffect });
    }
  });

  for (let i = 0; i < s.staff.length; i++) {
    for (let j = i + 1; j < s.staff.length; j++) {
      const aId = s.staff[i], bId = s.staff[j];
      const aTraits = s.staffTraits?.[aId] || [];
      const bTraits = s.staffTraits?.[bId] || [];
      const conflict =
        aTraits.some(t => (PERSONALITY_TRAITS[t]?.friction || []).some(f => bTraits.includes(f))) ||
        bTraits.some(t => (PERSONALITY_TRAITS[t]?.friction || []).some(f => aTraits.includes(f)));
      if (conflict) {
        const aName = STAFF_POOL.find(p => p.id === aId)?.name || aId;
        const bName = STAFF_POOL.find(p => p.id === bId)?.name || bId;
        items.push({ label: `Friction: ${aName} & ${bName}`, delta: -1 });
      }
    }
  }

  const net = items.reduce((sum, l) => sum + l.delta, 0);
  return { items, net };
}

function effectiveSalary(s, person) {
  const traits = s.staffTraits?.[person.id] || [];
  const mod = traits.reduce((m, t) => m * (PERSONALITY_TRAITS[t]?.salaryMod || 1), 1);
  return Math.round(person.salary * mod);
}

function unlockedPerks(s, staffId) {
  const progress = ensureStaffProgress(s, staffId);
  const defs = STAFF_ADVANCEMENTS[staffId] || [];
  return defs.filter(perk => progress.perks.includes(perk.id));
}

function canUnlockPerk(s, staffId, perk) {
  const progress = ensureStaffProgress(s, staffId);
  if (progress.perks.includes(perk.id)) return false;
  if (progress.xp < perk.cost) return false;
  if (perk.requires && !progress.perks.includes(perk.requires)) return false;
  return true;
}

function grantStaffXp(s, ids, amount) {
  ids.forEach(id => {
    if (!s.staff.includes(id)) return;
    const progress = ensureStaffProgress(s, id);
    const traits = s.staffTraits?.[id] || [];
    let xpMod = traits.reduce((m, t) => m * (PERSONALITY_TRAITS[t]?.xpMod || 1), 1);
    // melancholic: +20% XP when sole staff in their role
    if (traits.includes("melancholic")) {
      const person = STAFF_POOL.find(p => p.id === id);
      const sameRole = s.staff.filter(sid => STAFF_POOL.find(p => p.id === sid)?.role === person?.role);
      if (sameRole.length === 1) xpMod *= PERSONALITY_TRAITS.melancholic.soloXpBonus;
    }
    // diminishing returns: grants get harder to land as cumulative XP grows
    const totalEarned = progress.totalXp || 0;
    const grantChance = totalEarned < 6 ? 1 : totalEarned < 14 ? 0.65 : 0.42;
    if (rand() > grantChance) {
      progress.totalXp = totalEarned + 0.5;
      return;
    }
    const gained = Math.max(1, Math.round(amount * xpMod));
    progress.xp += gained;
    progress.totalXp = totalEarned + gained;
  });
}

function grantActionXp(s, actionId) {
  grantStaffXp(s, ACTION_XP[actionId] || [], 1);
}

function applyPassiveBuildingEffects(s) {
  if ((s.buildings.tank || 0) >= 3) { s.prestige += 1; s.profile = (s.profile ?? 50) + 0.4; }  // Concrete eggs
  if ((s.buildings.barrel || 0) >= 4) { s.prestige += 2; s.profile = (s.profile ?? 50) + 0.4; } // Grand Cru Barrel Library
}

function applyPassiveStaffEffects(s) {
  let tourIncome = 0;
  let clubIncome = 0;

  // Tour income: base 1800/room level per tourIncome point
  const tourPoints = staffBonus(s, "tourIncome");
  if (tourPoints > 0) {
    const roomLevel = Math.max(1, s.buildings.room);
    tourIncome = tourPoints * roomLevel * 1800;
    s.cash += tourIncome;
    addChannelDemand(s, ["cellarDoor"], 1);
    if (s.month % 3 === 0) log(s, `Estate tours brought in ${money(tourIncome)} this month.`);
  }

  // Club income: flat monthly per clubIncome point, grows with prestige
  const clubPoints = staffBonus(s, "clubIncome");
  if (clubPoints > 0) {
    clubIncome = clubPoints * (2200 + Math.max(0, s.prestige - 30) * 40);
    s.cash += clubIncome;
    addChannelDemand(s, ["club"], 1);
    if (availableCases(s) < clubPoints * 35) {
      addChannelTrust(s, "club", -2);
      if (s.month % 3 === 0) log(s, "Wine club demand is outpacing available allocation. Member trust slipped.");
    }
    if (s.month % 3 === 0) log(s, `Wine club subscribers paid ${money(clubIncome)} in dues.`);
  }

  // Disease control: passive disease reduction each month
  const diseasePoints = staffBonus(s, "diseaseControl");
  if (diseasePoints > 0) {
    s.rows.forEach(row => {
      ensureRowFields(row);
      row.disease = clamp(row.disease - diseasePoints * 5, 0, 100);
      row.threat  = Math.round(row.disease / 11);
    });
  }

  // Water control: nudge water toward varietal optimum each month
  const waterPoints = staffBonus(s, "waterControl");
  if (waterPoints > 0) {
    const optimal = varietal().optimalWater || 50;
    s.rows.forEach(row => {
      ensureRowFields(row);
      const nudge = Math.sign(optimal - row.water) * waterPoints * 4;
      row.water = clamp(row.water + nudge, 0, 100);
    });
  }

  // Logistics glass supply: passive monthly glass from supplier contracts
  const glassMonthly = staffBonus(s, "glassMonthly");
  if (glassMonthly > 0) {
    s.inventory.glass += glassMonthly;
  }

  // Profile drift from staff
  const profileDrift = staffBonus(s, "profileDrift");
  if (profileDrift !== 0) s.profile = (s.profile ?? 50) + profileDrift;

  // Priya pulls profile toward commercial
  if (s.staff.includes("priya")) s.profile = (s.profile ?? 50) - 1;

  // House style drifts toward center without active choices — extremes require ongoing commitment
  const profileNow = s.profile ?? 50;
  if (profileNow > 70) s.profile = Math.max(70, profileNow - 0.5);
  else if (profileNow < 30) s.profile = Math.min(30, profileNow + 0.5);

  // Social media prestige drain: if prestige above threshold, pull it back
  s.staff.forEach(id => {
    const person = STAFF_POOL.find(p => p.id === id);
    if (!person?.effects.prestigeDrain) return;
    let threshold = person.effects.prestigeDrain;
    // perk relief raises the threshold
    const relief = (STAFF_ADVANCEMENTS[id] || [])
      .filter(perk => (s.staffProgress?.[id]?.perks || []).includes(perk.id))
      .reduce((sum, perk) => sum + (perk.effects?.prestigeDrainRelief || 0), 0);
    threshold += relief;
    if (s.prestige > threshold) {
      s.prestige = Math.max(threshold, s.prestige - 1);
    }
  });

  // Secondary market: sold-out high-scoring vintages trade at auction — a passive prestige dividend
  let auctionIncome = 0;
  const auctMemory = archiveMemory(s);
  if (s.prestige >= 90 && auctMemory.soldOutPrestige >= 1) {
    auctionIncome = Math.round(1200 * auctMemory.soldOutPrestige * (1 + (s.prestige - 90) / 20));
    s.cash += auctionIncome;
    if (s.month % 4 === 0) log(s, `Secondary market: sold-out vintages are trading above release price at auction. ${money(auctionIncome)} arrived from buyer resales.`);
  }

  // DTC: Priya's online channel generates passive monthly income, growing with audience demand and trust
  let dtcIncome = 0;
  if (s.staff.includes("priya")) {
    ensureChannels(s);
    const dtcDemand = s.channelDemand.dtc || 20;
    const dtcTrust  = s.channelTrust.dtc  || 58;
    dtcIncome = Math.round(3000 * (dtcDemand / 50) * (dtcTrust / 60));
    s.cash += dtcIncome;
    addChannelDemand(s, ["dtc"], 1);
    addChannelTrust(s, "dtc", 1);
    if (s.month % 3 === 0) log(s, `Priya's digital content generated ${money(dtcIncome)} in online direct-to-consumer sales.`);
  }

  return { tourIncome, clubIncome, auctionIncome, dtcIncome };
}

function grantMonthlyStaffXp(s) {
  if (s.month % 3 === 0) grantStaffXp(s, s.staff, 1);
}

function unlockAdvancement(staffId, perkId) {
  if (!state || !state.staff.includes(staffId)) return;
  const perk = (STAFF_ADVANCEMENTS[staffId] || []).find(item => item.id === perkId);
  if (!perk || !canUnlockPerk(state, staffId, perk)) return;
  const progress = ensureStaffProgress(state, staffId);
  progress.xp -= perk.cost;
  progress.perks.push(perk.id);
  applyImmediatePerk(state, perk);
  const person = STAFF_POOL.find(p => p.id === staffId);
  log(state, `${person.name} advanced: ${perk.title}.`);
  normalizeState(state);
  render();
}

function applyImmediatePerk(s, perk) {
  const immediate = perk.immediate || {};
  Object.entries(immediate).forEach(([key, value]) => {
    s[key] = (s[key] || 0) + value;
  });
}

function addOrder(s, forcedType) {
  ensureChannels(s);
  if (s.orders.length >= 6) return;
  const profile = s.profile ?? 50;
  const eligible = Object.keys(ORDER_TYPES).filter(id => {
    if (forcedType) return id === forcedType;
    const t = ORDER_TYPES[id];
    if (t.maxProfile != null && profile > t.maxProfile) return false;
    if (t.minProfile != null && profile < t.minProfile) return false;
    return true;
  });
  if (!eligible.length) return;
  const typeId = forcedType || weightedChoice(eligible.map(id => ({ id, weight: Math.max(1, channelDemandForOrder(s, id)) })));
  const type = ORDER_TYPES[typeId];
  const channel = ORDER_CHANNEL[typeId] || "distributor";
  const prestigeFit = s.prestige + randint(-8, 16) + Math.floor(((s.channelTrust[channel] || 58) - 58) / 5);
  if (!forcedType && prestigeFit < type.prestige) return;
  const demandScale = clamp(channelDemandForOrder(s, typeId) / 65, 0.65, 1.45);
  const cases = Math.round(randint(type.cases[0], type.cases[1]) * demandScale);
  const retailCeiling = Math.round(randint(type.price[0], type.price[1]) * (1 + s.quality / 260 + staffBonus(s, "sales") * 0.03));
  const netPrice = channelNetPrice({ type: typeId, channel }, Math.min(s.price, retailCeiling));
  const due = s.month + randint(type.due[0], type.due[1]);
  const id = `${typeId}-${Date.now()}-${Math.floor(rand() * 10000)}`;
  s.orders.push({
    id,
    type: typeId,
    buyer: type.name,
    channel,
    cases,
    retailCeiling,
    maxPrice: retailCeiling,
    netPrice,
    due,
    expires: s.month + 2,
    accepted: false,
    penalty: Math.round(cases * netPrice * 12 * 0.18)
  });
}

function weightedChoice(items) {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let roll = rand() * total;
  return (items.find(item => { roll -= item.weight; return roll <= 0; }) || items[items.length - 1]).id;
}

function acceptOrder(id) {
  const order = state.orders.find(o => o.id === id);
  if (!order) return;
  const retailCeiling = orderRetailCeiling(order);
  if (state.price > retailCeiling) {
    log(state, `${order.buyer} would not sign with a ${money(state.price)} release price; their channel ceiling is ${money(retailCeiling)}.`);
    render();
    return;
  }
  order.accepted = true;
  order.acceptedReleasePrice = state.price;
  order.netPrice = channelNetPrice(order, state.price);
  order.penalty = Math.round(order.cases * order.netPrice * 12 * 0.18);
  addChannelDemand(state, [order.channel || ORDER_CHANNEL[order.type] || "distributor"], 1);
  log(state, `${order.buyer} signed for ${order.cases} cases at ${money(order.netPrice)} net per bottle.`);
  render();
}

function fulfillOrder(id) {
  ensureActionBudgets(state);
  const order = state.orders.find(o => o.id === id);
  if (!order || !order.accepted || state.inventory.cases < order.cases) return;
  applyFulfillmentLoad(state, order);
  const premium = 1 + Math.max(0, state.quality - 55) / 260;
  const vintageMod = vintageScoreMultiplier(state.currentVintageScore || 3);
  const netPrice = order.netPrice ?? channelNetPrice(order, order.acceptedReleasePrice ?? state.price);
  const revenue = Math.round(order.cases * netPrice * 12 * premium * vintageMod);
  state.inventory.cases -= order.cases;
  state.cash += revenue;
  state.prestige += order.type === "collector" ? 5 : order.type === "club" || order.type === "restaurant" ? 3 : 1;
  if (order.type === "collector") state.collectorFulfilled = (state.collectorFulfilled || 0) + 1;
  recordArchiveSale(state, order.cases, revenue, order.channel || ORDER_CHANNEL[order.type] || "distributor");
  addChannelDemand(state, [order.channel || ORDER_CHANNEL[order.type] || "distributor"], 2);
  addChannelTrust(state, order.channel || ORDER_CHANNEL[order.type] || "distributor", 3);
  state.fulfilled += 1;
  state.totalSold += order.cases;
  state.totalRevenue += revenue;
  state.orders = state.orders.filter(o => o.id !== id);
  log(state, `Fulfilled ${order.buyer}: ${order.cases} cases for ${money(revenue)}.`);
  checkGameOver();
  render();
}

function applyFulfillmentLoad(s, order) {
  const channel = order.channel || ORDER_CHANNEL[order.type] || "distributor";
  const isLarge = order.cases >= 180 || ["distributor", "export", "supermarket", "club"].includes(order.type);
  if (!isLarge) return;
  const preferred = order.type === "club" ? "sales" : "ops";
  const backup = preferred === "ops" ? "sales" : "ops";
  if ((s.capacityLeft?.[preferred] || 0) > 0) {
    s.capacityLeft[preferred] -= 1;
    log(s, `${order.buyer} shipment used ${capacityLabel(preferred).toLowerCase()} capacity.`);
    return;
  }
  if ((s.capacityLeft?.[backup] || 0) > 0) {
    s.capacityLeft[backup] -= 1;
    s.fatigue += 2;
    log(s, `${order.buyer} shipment leaned on ${capacityLabel(backup).toLowerCase()} capacity outside its lane. Fatigue +2.`);
    return;
  }
  const fatigue = Math.min(12, 3 + Math.floor(order.cases / 140));
  s.fatigue += fatigue;
  addChannelTrust(s, channel, -2);
  log(s, `${order.buyer} shipment was handled without enough ops capacity. Fatigue +${fatigue}; ${CHANNELS[channel]?.label || "buyer"} trust slipped.`);
}

function rejectOrder(id) {
  const order = state.orders.find(o => o.id === id);
  if (order?.accepted) {
    state.prestige -= 2;
    addChannelDemand(state, [order.channel || ORDER_CHANNEL[order.type] || "distributor"], -3);
    addChannelTrust(state, order.channel || ORDER_CHANNEL[order.type] || "distributor", -5);
  }
  state.orders = state.orders.filter(o => o.id !== id);
  render();
}

function ensureRowFields(row) {
  if (typeof row.disease !== "number") row.disease = row.threat != null ? row.threat * 11 : 10;
  if (typeof row.water !== "number") row.water = 52;
  if (!row.pressure) row.pressure = row.threatName || "normal";
  if (!row.plantedYear) row.plantedYear = START_YEAR - 8;
  // keep legacy fields in sync for any old code that still reads them
  row.threat = Math.round((row.disease || 0) / 11);
  row.threatName = row.pressure;
}

function vineMaturity(age) {
  if (age < 8)  return { yield: 0.80, quality: 0.93, label: "young vine" };
  if (age < 21) return { yield: 1.00, quality: 1.00, label: "prime" };
  if (age < 41) return { yield: 0.88, quality: 1.06, label: "mature" };
  return            { yield: 0.65, quality: 1.15, label: "old vine" };
}

function adjustRows(s, diseaseDelta, label) {
  s.rows.forEach(row => {
    ensureRowFields(row);
    row.disease = clamp(row.disease + diseaseDelta * 11, 0, 100);
    if (label) row.pressure = label;
    if (diseaseDelta < 0) row.health = clamp(row.health + Math.abs(diseaseDelta) * 2, 8, 100);
    row.threat = Math.round(row.disease / 11);
    row.threatName = row.pressure;
  });
}

function averageDisease(s) {
  const rows = s.rows;
  return rows.length ? rows.reduce((sum, r) => sum + (r.disease || 0), 0) / rows.length : 0;
}

function averageWater(s) {
  const rows = s.rows;
  return rows.length ? rows.reduce((sum, r) => sum + (r.water || 50), 0) / rows.length : 50;
}

function capexTier(id, level) {
  return (CAPEX_TIERS[id]?.tiers || [])[level] || null;
}

function capexCost(id, level) {
  const tier = capexTier(id, level);
  if (!tier) return 0;
  return Math.round(tier.cost * (region().costMod || 1) * buildDiscountMod(state));
}

function buildingEquity(s) {
  let equity = 0;
  Object.keys(CAPEX_TIERS).forEach(id => {
    const owned = s.buildings[id] || 0;
    for (let i = 0; i < owned; i++) {
      const tier = capexTier(id, i);
      if (tier) equity += Math.round(tier.cost * 0.55);
    }
  });
  return equity;
}

function applyBuildEffect(s, id, tier) {
  if (id === "block") {
    const plantedYear = START_YEAR + Math.floor((s.month - 1) / 12);
    const row = makeRows(1, { plantedMonth: s.month, matureMonth: s.month + 18, plantedYear, varietal: s.varietal, region: s.region })[0];
    row.name = `Young Block ${s.rows.length + 1}`;
    s.rows.push(row);
    s.rows[s.rows.length - 1].id = s.rows.length;
  }
  if (id === "room") { addChannelDemand(s, ["cellarDoor", "club"], 4); if (s.buildings.room === 3) s.morale += 3; if (s.buildings.room === 4) { s.prestige += 8; addChannelDemand(s, ["collector"], 3); } }
  if (id === "barrel") s.quality += Math.round(varietal().barrelNeed * 2);
  if (id === "line" && s.buildings.line === 4) s.prestige += 2;
}

function buyBuilding(id) {
  ensureActionBudgets(state);
  const bDef = BUILDINGS.find(item => item.id === id);
  const owned = state.buildings[id] || 0;
  if (!bDef || owned >= bDef.max || state.actionsLeft <= 0 || state.event || state.gameOver) return;
  const cost = capexCost(id, owned);
  if (state.cash < cost) return;
  _doBuild(state, id, cost);
}

function financeBuild(id) {
  ensureActionBudgets(state);
  const bDef = BUILDINGS.find(item => item.id === id);
  const owned = state.buildings[id] || 0;
  if (!bDef || owned >= bDef.max || state.actionsLeft <= 0 || state.event || state.gameOver) return;
  const cost = capexCost(id, owned);
  if (availableCredit(state) < cost) return;
  addDebt(state, cost, `${capexTier(id, owned)?.name || id} financing`);
  state.totalDebtDrawn = (state.totalDebtDrawn || 0) + cost;
  _doBuild(state, id, 0);
}

function _doBuild(s, id, cashCost) {
  const beforeCap = monthlyOperationalCapacity(s);
  const owned = s.buildings[id] || 0;
  const tier = capexTier(id, owned);
  s.cash -= cashCost;
  s.buildings[id] = owned + 1;
  applyBuildEffect(s, id, tier);
  s.actionsLeft -= 1;
  applyCapacityDelta(s, beforeCap);
  log(s, `Built: ${tier?.name || id}${cashCost === 0 ? " (financed)" : ""}.`);
  normalizeState(s);
  render();
}

function sellBuilding(id) {
  const owned = state.buildings[id] || 0;
  if (owned <= 0 || state.event || state.gameOver) return;
  const tier = capexTier(id, owned - 1);
  const refund = Math.round((tier?.cost || 0) * 0.55);
  state.buildings[id] = owned - 1;
  if (id === "block" && state.rows.length > 0) {
    const removed = state.rows.pop();
    log(state, `Sold ${tier?.name || id} — removed ${removed.name}. Recovered ${money(refund)}.`);
  } else {
    log(state, `Sold ${tier?.name || id}. Recovered ${money(refund)}.`);
  }
  state.cash += refund;
  normalizeState(state);
  render();
}

function hireStaff(id) {
  ensureActionBudgets(state);
  const person = STAFF_POOL.find(p => p.id === id);
  if (!person || state.staff.includes(id) || state.staff.length >= 5 || state.actionsLeft <= 0 || state.event || state.gameOver) return;
  const signing = Math.round(person.salary * 1.4);
  if (state.cash < signing) return;
  const beforeCap = monthlyOperationalCapacity(state);
  state.cash -= signing;
  state.actionsLeft -= 1;
  state.staff.push(id);
  state.totalStaffHired = (state.totalStaffHired || 0) + 1;
  ensureStaffProgress(state, id);
  state.staffMarket = buildStaffMarket(state);
  applyCapacityDelta(state, beforeCap);
  applyStaffPassive(state, person);
  if (id === "vintner") {
    onVintnerHired(state);
  } else {
    log(state, `${person.name} joined as ${person.role}. Hiring used owner attention.`);
  }
  normalizeState(state);
  render();
}

function fireStaff(id) {
  ensureActionBudgets(state);
  const person = STAFF_POOL.find(p => p.id === id);
  if (!person || state.actionsLeft <= 0 || state.event || state.gameOver) return;
  if (id === "priest") return;
  if (id === "vintner" && inWrath(state) && state.wrathState.seal >= 4) {
    log(state, "He remains.");
    render();
    return;
  }
  const beforeCap = monthlyOperationalCapacity(state);
  state.cash -= Math.round(person.salary * 0.8);
  state.actionsLeft -= 1;
  state.morale -= 5;
  state.staff = state.staff.filter(staffId => staffId !== id);
  if (!person.hidden && !state.staffMarket.includes(id)) state.staffMarket.push(id);
  if (id === "vintner" && inWrath(state)) {
    state.wrathState = null;
    log(state, `${person.name} left the estate.`);
  } else {
    log(state, `${person.name} left the estate. The transition used owner attention.`);
  }
  applyCapacityDelta(state, beforeCap);
  normalizeState(state);
  render();
}

function applyStaffPassive(s, person) {
  const effects = person.effects || {};
  s.morale += effects.morale || 0;
  s.demand += effects.demand || 0;
  s.prestige += effects.prestige || 0;
  if (effects.dtcBoost) {
    ensureChannels(s);
    s.channelDemand.dtc = clamp((s.channelDemand.dtc || 20) + effects.dtcBoost, 0, 130);
    s.demand = channelHeadlineDemand(s);
  }
}

function useAction(id) {
  const action = ACTIONS.find(a => a.id === id);
  ensureActionBudgets(state);
  if (!action || state.event || state.gameOver) return;
  if (action.navigateTab) {
    activeTab = action.navigateTab;
    render();
    return;
  }
  if (!canSpendForAction(action, state)) return;
  if (!isActionAvailable(action, state)) return;
  const cost = actionCost(action, state);
  if (state.cash < cost) return;
  state.cash -= cost;
  action.apply(state);
  grantActionXp(state, id);
  const spent = spendForAction(action, state);
  if (spent.type === "owner" && spent.key) {
    log(state, `Founder attention covered ${capacityLabel(spent.key).toLowerCase()} work this month. Fatigue +2.`);
  }
  normalizeState(state);
  checkGameOver();
  render();
}

function isActionAvailable(action, s) {
  if (action.available && !action.available(s)) return false;
  return !action.seasons || action.seasons.includes(s.season);
}

function actionCost(action, s) {
  return Math.round(action.cost * region().costMod * philosophy().cost * difficulty().costMod);
}

function actionName(action, s) {
  return typeof action.name === "function" ? action.name(s) : action.name;
}

function actionConsequence(action, s) {
  return typeof action.consequence === "function" ? action.consequence(s) : action.consequence;
}

function actionDetail(action, s) {
  if (action.id === "seasonal") return seasonalAction(s).detail;
  return action.detail;
}

function seasonalAction(s) {
  if (s.season === "Harvest" && !isHarvestMonth(s.month, s.region)) {
    return {
      name: "Post-Harvest Walk",
      detail: "Walk blocks after picking, move first batches to tank, and start row recovery.",
      consequence: "Reduce vine stress and begin cellar hand-off."
    };
  }
  return SEASONAL_ACTIONS[s.season] || SEASONAL_ACTIONS.Cellar;
}

function seasonListLabel(seasons) {
  if (!seasons) return "all seasons";
  const windows = seasonWindows(state?.region);
  return seasons.map(season => `${season} (${windows[season]})`).join(", ");
}

function seasonWindows(regionId = state?.region) {
  return SOUTHERN_HEMISPHERE_REGIONS.has(regionId) ? SOUTHERN_SEASON_WINDOWS : SEASON_WINDOWS;
}

function normalizeState(s) {
  s.cash = Math.round(s.cash);
  s.prestige = clamp(Math.round(s.prestige), 0, 120);
  reconcileGlobalDemand(s);
  s.morale = clamp(Math.round(s.morale), 0, 100);
  s.fatigue = clamp(Math.round(s.fatigue || 0), 0, 100);
  s.quality = clamp(Math.round(s.quality), 0, 120);
  s.sustainability = clamp(Math.round(s.sustainability), 0, 100);
  s.influence = clamp(Math.round(s.influence), 0, 100);
  s.profile = clamp(Math.round(s.profile ?? 50), 0, 100);
  ensureOrders(s);
  // temperate trait: morale never falls below 10
  const hasTemperate = (s.staff || []).some(id => (s.staffTraits?.[id] || []).includes("temperate"));
  if (hasTemperate) s.morale = Math.max(s.morale, 10);
  // update high-water / low-water tracking
  s.maxPrestige = Math.max(s.maxPrestige || 0, s.prestige);
  s.minCash = Math.min(s.minCash ?? s.cash, s.cash);
  s.minMorale = Math.min(s.minMorale ?? s.morale, s.morale);
  if (s.prestige < (s.maxPrestige || 0) - 15) s.hadPrestigeDrop = true;
  checkAchievements(s);
}

function checkAchievements(s) {
  if (!s || !s.achievements) return;
  if (!s.newAchievements) s.newAchievements = [];
  const earned = new Set(s.achievements);

  function award(id) {
    if (!earned.has(id)) {
      earned.add(id);
      s.achievements.push(id);
      s.newAchievements.push(id);
    }
  }

  if (s.prestige >= 40) award("first-blush");
  if (s.prestige >= 75) award("benchmark");
  if (s.prestige >= 90) award("legend");
  if ((s.eventMemory?.["secondary-market-record"]?.count || 0) > 0) award("auction-record");
  if ((s.archive || []).some(e => (e.vintageScore || 0) >= 5)) award("perfect-vintage");
  if ((s.archive || []).some(e => (e.score || 0) >= 95)) award("critical-darling");
  if ((s.eventMemory?.["auction-house"]?.count || 0) > 0) award("christies");
  if (s.classification?.threeStar) award("three-stars");
  if (s.survivedInvestor) award("survived-board");
  if ((s.minCash || 0) <= -30000) award("deep-red");
  if (s.hadPrestigeDrop && s.prestige >= (s.maxPrestige || 0) - 8) award("comeback");
  if ((s.minMorale ?? 60) <= 10 && s.morale > 55) award("back-from-brink");
  if ((s.eventMemory?.["napa-smoke"]?.count || 0) > 0) award("smoke-season");
  if ((s.eventMemory?.["napa-earthquake"]?.count || 0) > 0) award("tremors");
  if ((s.eventMemory?.["mendoza-hail"]?.count || 0) > 0) award("hailstorm");
  if ((s.eventMemory?.["fingerlakes-icewine"]?.count || 0) > 0) award("ice-harvest");
  if ((s.eventMemory?.["bordeaux-primeur"]?.count || 0) > 0) award("en-primeur");
  if ((s.eventMemory?.["burgundy-premier-cru"]?.count || 0) > 0) award("premier-cru");
  if ((s.eventMemory?.["barossa-old-vine"]?.count || 0) > 0) award("old-vines");
  if ((s.collectorFulfilled || 0) >= 5) award("allocation-only");
  if ((s.totalSold || 0) >= 5000) award("volume-play");
  if ((s.totalRevenue || 0) >= 1000000) award("full-ledger");
  if ((s.staff || []).length >= 5) award("dream-team");
  if ((s.buildings?.room || 0) >= 4) award("destination-winery");
  if ((s.buildings?.lab || 0) >= 3) award("precision-viticulture");
  if (s.classification?.organic) award("going-natural");
  if ((s.eventMemory?.["natural-wine-fair"]?.count || 0) > 0) award("natural-wine-fair");
  if (s.gameOver && (s.totalDebtDrawn || 0) <= (s.openingDebt || 0)) award("bootstrapped");
  if ((s.totalDebtDrawn || 0) >= 100000) award("leveraged-up");
  if (s.boughtGrapes) award("checkbook-winemaker");
  if (s.earlyReleased) award("impatient");
  if (s.harvestCount > 0) award("first-harvest");
  if ((s.staff || []).length > 0 || (s.totalStaffHired || 0) > 0) award("first-hire");
  if ((s.openingDebt || 0) > 0 && s.debt <= 0) award("debt-free");
  if (s.lustfulPairFired) award("barrel-indiscretion");
  if (s.prestige >= 100) award("centenaire");
  if (s.morale >= 100) award("esprit-de-corps");
  if ((s.fatigue || 0) === 0) award("well-rested");
}

function profilePriceCeil(s) {
  const base = Math.round(80 + (s.profile ?? 50) * 0.8);
  const artisanBonus = (s.buildings.line || 0) >= 4 ? 8 : 0;
  return base + artisanBonus;
}

function profileDemandMod(s) {
  return 1 + (50 - (s.profile ?? 50)) * 0.005;
}

function profileLabel(p) {
  if (p <= 20) return "Scaled Commercial";
  if (p <= 40) return "Commercial";
  if (p <= 60) return "Classic Estate";
  if (p <= 80) return "Artisan";
  return "Natural / Cult";
}

function profileTier(p) {
  if (p > 80) return "cult";
  if (p > 60) return "artisan";
  if (p > 35) return "classic";
  return "commercial";
}

function advanceMonth() {
  if (state.event || state.gameOver) return;
  monthlyTick(state);
  checkGameOver();
  render();
}

function monthlyTick(s) {
  // Measurement mode: advance sequence, skip normal tick
  if (inWrath(s) && s.wrathState.mode === "measurement") {
    advanceMeasurementStep(s);
    return;
  }

  ensureEconomy(s);
  s.prestigeBeforeMonth = s.prestige;
  s.monthStartPrice = s.price; // anchor for next month's price cap
  const startingCases = s.inventory.cases;
  const sales = directSales(s);
  s.inventory.cases -= sales.cases;
  s.cash += sales.revenue;
  s.totalSold += sales.cases;
  s.totalRevenue += sales.revenue;
  recordArchiveSale(s, sales.cases, sales.revenue, sales.channel);

  const costs = fixedCostBreakdown(s);
  s.cash -= costs.total;
  s.inventory.glass += 120 + s.buildings.line * 70;
  grantMonthlyStaffXp(s);
  applyInvestorPressure(s, costs.total);

  applyRegionEffects(s);
  maybeSeasonalLog(s);
  applyWeather(s);
  const staffPassiveIncome = applyPassiveStaffEffects(s);
  applyPassiveBuildingEffects(s);
  checkLustfulPair(s);
  decayAndOrders(s);
  (s.vintages || []).forEach(v => {
    if (v.bulkWine > 0) {
      v.agingMonths = (v.agingMonths || 0) + 1;
      v.flawRisk = clamp((v.flawRisk || baseLotFlawRisk(s, v)) + flawRiskDrift(s, v), 1, 95);
    }
  });

  const harvestResult = isHarvestMonth(s.month, s.region) ? harvest(s) : null;

  const priorityEvent = drawPriorityEvent(s);
  if (priorityEvent) {
    s.event = priorityEvent;
  } else if (rand() < 0.36 * eventRiskMod(s) * difficulty().eventMod) {
    s.event = drawEvent(s);
  }

  s.marketHeat = clamp(s.marketHeat + randint(-6, 8) + Math.floor((s.demand - 55) / 16), 10, 100);
  const marketDemandDelta = Math.floor((s.marketHeat - 50) / 18) - Math.max(0, Math.floor((s.price - 34) / 9));
  if (marketDemandDelta) addChannelDemand(s, Object.keys(CHANNELS), marketDemandDelta);
  const qualityPressure = s.quality > 100 ? 2 : s.quality > 85 ? 1 : 0;
  const load = loadPressure(s);
  s.quality = clamp(s.quality - 1 + Math.floor(s.morale / 55) - qualityPressure - Math.floor(load / 8), 0, 120);
  const traitPassive = staffTraitPassiveEffects(s);
  const frictionDelta = staffFrictionMorale(s);
  const fatigueClear = 4 + staffBonus(s, "finance") + staffBonus(s, "bottling") + (s.season === "Dormant" ? 4 : 0);
  s.fatigue = clamp((s.fatigue || 0) + Math.max(0, load - 4) - fatigueClear, 0, 100);
  s.morale = clamp(s.morale - 2 + Math.floor(s.cash / 160000) + traitPassive.morale + frictionDelta - Math.floor((s.fatigue || 0) / 28) - Math.floor(load / 9), 0, 100);

  // Sustained low morale eventually drives a hire to resign
  if (s.morale < 32) {
    s.lowMoraleMonths = (s.lowMoraleMonths || 0) + 1;
  } else if (s.morale >= 40) {
    s.lowMoraleMonths = 0;
  }
  if ((s.lowMoraleMonths || 0) >= 4 && s.staff.length > 0) {
    const eligibleLeavers = s.staff.filter(id => id !== "priest" && id !== "vintner");
    const leaverId = eligibleLeavers[Math.floor(rand() * eligibleLeavers.length)];
    if (leaverId) {
      const person = STAFF_POOL.find(p => p.id === leaverId);
      s.staff = s.staff.filter(id => id !== leaverId);
      if (!person?.hidden && !s.staffMarket.includes(leaverId)) s.staffMarket.push(leaverId);
      s.lowMoraleMonths = 0;
      s.morale = Math.max(s.morale - 8, 0);
      if (inWrath(s) && ["margot", "beatrice", "ines"].includes(leaverId)) {
        s.wrathState.weightedStaffLost.push(leaverId);
        s.wrathState.cup = Math.min(100, s.wrathState.cup + 6);
      }
      log(s, `${person?.name || "A key hire"} handed in their notice. Four months of difficult conditions was enough.`);
    }
  }

  if (traitPassive.demand) addChannelDemand(s, ["cellarDoor", "club", "restaurant"], traitPassive.demand);
  if (traitPassive.inventoryLeak > 0 && s.inventory.cases > 0) {
    const leaked = Math.min(traitPassive.inventoryLeak, s.inventory.cases);
    s.inventory.cases -= leaked;
    if (leaked > 0) log(s, `${leaked} case${leaked > 1 ? "s" : ""} quietly disappeared. Someone on the team has expensive habits.`);
  }
  // Prestige decays without market presence — fame requires buyers
  if (s.demand < 30 && s.prestige > 20) s.prestige = Math.max(20, s.prestige - 1);
  // High prestige decays faster when not actively reinforced by quality and sales
  const _prevSold = s.history.length ? s.history[s.history.length - 1].totalSold : 0;
  const _casesSoldThisMonth = Math.max(0, s.totalSold - _prevSold);
  if (s.prestige >= 90 && s.quality < 88 && _casesSoldThisMonth < 10) {
    s.prestige = Math.max(s.prestige - 2, 80);
  } else if (s.prestige >= 80 && s.quality < 82 && _casesSoldThisMonth < 5) {
    s.prestige = Math.max(s.prestige - 1, 70);
  }

  // Elite estates can't coast on reputation: quality must stay high or prestige erodes faster
  if (s.prestige >= 88 && s.quality < 78) {
    const qualityGap = 78 - s.quality;
    const reputationBleed = Math.ceil(qualityGap / 8);
    s.prestige = Math.max(s.prestige - reputationBleed, 70);
    if (s.month % 3 === 0) log(s, "The gap between reputation and current wine quality is starting to show. Prestige is slipping.");
  }

  // Legacy pressure: sustained demand/trust drain from a below-par release at a top estate
  if ((s.legacyPressureMonths || 0) > 0) {
    const mem = archiveMemory(s);
    if (s.quality >= 85 && s.prestige >= 85) {
      // Recovering — ease pressure faster
      s.legacyPressureMonths = Math.max(0, s.legacyPressureMonths - 2);
      if (s.legacyPressureMonths === 0) log(s, "The estate's quality is speaking again. Collector confidence is gradually returning.");
    } else {
      // Still underperforming — pressure compounds
      addChannelTrust(s, "collector", -2); addChannelTrust(s, "club", -1);
      s.prestige = Math.max(s.prestige - 1, 50);
      s.legacyPressureMonths -= 1;
      if (s.month % 2 === 0) log(s, `Legacy pressure: buyers are still measuring recent releases against the estate's ${mem.bestScore}-point peak. Trust remains fragile.`);
    }
  }

  // Holiday demand: Nov-Dec spike, Jan hangover
  const calMonth = calendarMonthNumber(s.month);
  if (calMonth === 11) { addChannelDemand(s, Object.keys(CHANNELS), 2); }
  if (calMonth === 12) { addChannelDemand(s, Object.keys(CHANNELS), 3); }
  if (calMonth === 1)  { addChannelDemand(s, Object.keys(CHANNELS), -2); }

  // Slow macro market cycle: drifts demand ±1 every few months
  s.marketCycle = (s.marketCycle || 0) + 1;
  if (s.marketCycleDir === undefined) s.marketCycleDir = 1;
  if (s.marketCycle % 4 === 0) {
    addChannelDemand(s, Object.keys(CHANNELS), s.marketCycleDir);
    if (s.marketCycle % randint(28, 44) === 0) {
      s.marketCycleDir *= -1;
      log(s, s.marketCycleDir > 0 ? "Trade press notes growing enthusiasm for fine wine. Market appetite is building." : "Analysts flag softening premium wine demand. The macro tide is turning.");
    }
  }

  // Brand fatigue: active fatigue flag drains commercial demand each month
  if (s.marketMods.brandFatigue) {
    addChannelDemand(s, ["distributor", "supermarket", "cellarDoor"], -2);
  }
  Object.keys(s.marketMods).forEach(key => {
    if (typeof s.marketMods[key] !== "number") { delete s.marketMods[key]; return; }
    s.marketMods[key] -= 1;
    if (s.marketMods[key] <= 0) delete s.marketMods[key];
  });
  if (s.heroicsUsedMonth !== s.month) s.heroicsStreak = 0;

  if (s.cash < -25000) {
    const overdraft = Math.abs(s.cash);
    const credit = Math.min(overdraft, availableCredit(s));
    const rate = credit > 0 ? addDebt(s, credit, "Overdraft coverage") : 0;
    s.cash = credit >= overdraft ? 0 : -(overdraft - credit);
    s.prestige -= 3;
    s.morale -= 5;
    log(s, credit >= overdraft ? `The bank covered an overdraft at ${(rate * 100).toFixed(1)}% monthly. Debt rose and confidence fell.` : "The credit line is tapped out. Uncovered bills are damaging the estate.");
  }

  const previousSold = s.history.length ? s.history[s.history.length - 1].totalSold : 0;
  applyChannelDemandDrift(s, Math.max(0, s.totalSold - previousSold));

  if (inWrath(s)) wrathTick(s);
  maybeSpawnVintner(s);

  normalizeState(s);
  const totalCloseCost = costs.total + (harvestResult?.laborCost || 0);
  const closeCosts = {
    ...costs,
    total: totalCloseCost,
    harvestLabor: harvestResult?.laborCost || 0
  };
  s.lastClose = {
    month: s.month,
    date: monthDateLabel(s.month),
    startingCases,
    directCases: sales.cases,
    directRevenue: sales.revenue,
    tourIncome: staffPassiveIncome.tourIncome,
    clubIncome: staffPassiveIncome.clubIncome,
    auctionIncome: staffPassiveIncome.auctionIncome,
    dtcIncome: staffPassiveIncome.dtcIncome,
    endingCases: s.inventory.cases,
    fixedCost: totalCloseCost,
    interestCost: costs.interest,
    leaseCost: costs.lease,
    payrollCost: costs.salaries,
    operatingCost: costs.operating,
    harvestLaborCost: harvestResult?.laborCost || 0,
    pnl: sales.revenue + staffPassiveIncome.tourIncome + staffPassiveIncome.clubIncome + staffPassiveIncome.auctionIncome + staffPassiveIncome.dtcIncome - totalCloseCost
  };
  recordHistory(s, closeCosts);
  s.month += 1;
  s.season = seasonName(s.month, s.region);
  resetActionBudgets(s);
  log(s, `Month closed: direct channels sold ${sales.cases} cases for ${money(sales.revenue)}; costs ${money(totalCloseCost)} including ${money(costs.interest)} interest${harvestResult?.laborCost ? ` and ${money(harvestResult.laborCost)} harvest labor` : ""}.`);
}

const SEASONAL_FLAVOR = {
  Dormant: {
    napa: ["The valley floor is quiet. Pruning crews work the hillside rows in cold, still air.", "Cover crops are greening between dormant canes. The cellar hums with barrel maintenance and the occasional tasting."],
    bordeaux: ["The chai is quiet. The vines are bare and the team works through barrel samples by lamplight.", "A cold mist sits on the Gironde. Pruning cracks echo across the estate."],
    burgundy: ["The Côte is silent. Every estate is pruning — the winter ritual that sets the next vintage.", "Frost still possible at night. The team works carefully through the old parcels."],
    mosel: ["Slate terraces gleam under thin winter sun. The river mist doesn't lift until midday.", "The cellar is the only warm place on the estate. The vines will wait."],
    barossa: ["The southern summer has passed. Pruning begins in the dry, mild Barossa winter.", "Quiet season. The team catches up on cellar work while the vines rest."],
    mendoza: ["The Andes are snowcapped. The vines are dormant under clear, cold desert sky.", "Calm days in Mendoza. The altitude keeps nights brisk even in the off-season."],
    piedmont: ["The Langhe is still. Fog settles over Barolo and doesn't lift for days at a stretch.", "Cold, patient work in the cellar. The Nebbiolo is sitting in barrel and not asking for anything yet."],
    rioja: ["The plateau is bare and cold. Rioja winters make you earn the summer.", "Wind from the Sierra scours the estate. The team prunes fast and warms up inside."],
    fingerlakes: ["Ice has edged the lake. The vines are buried in snow, which is protective in its own way.", "A Finger Lakes winter: brutal and clarifying. Good time to plan."],
    default: ["The vines are dormant. A good time to plan, prune, and catch up on the cellar."]
  },
  Budbreak: {
    napa: ["First green nubs are showing on the canes. Frost risk is real for another few weeks.", "The valley is waking up. Cover crops are blooming and the crews are back in the rows."],
    bordeaux: ["Budbreak is tentative this year — cool nights keep the pace slow. That can be a good thing.", "The Médoc is greening. Châteaux are opening tasting rooms and the first visitors have arrived."],
    burgundy: ["Fragile buds are emerging on the old vines. One hard frost now and the vintage changes character entirely.", "The Côte de Nuits is anxious in spring. Every morning someone checks the thermometer."],
    mosel: ["The slate terraces are warming. Riesling buds are breaking slowly, which the old growers prefer.", "Spring is cautious on the steep banks of the Mosel. The river still runs cold."],
    barossa: ["Spring in Barossa: warm days, wildflowers between rows, Shiraz canes flushing fast.", "The valley is fragrant. New growth is everywhere and the mood on the estate is optimistic."],
    mendoza: ["The Andes are shedding snowmelt into the irrigation channels. Malbec is waking up.", "Spring at altitude feels different — sharp, bright, dry. The vines are responding quickly."],
    piedmont: ["The Langhe hills are turning green. Nebbiolo is the last to break but the hillsides are already showing life.", "Alba is fragrant with spring. The estate is busy and the cellar crew is finishing up last vintage."],
    rioja: ["The Ebro valley is warming. The vines are pushing and the work in the rows picks up.", "After a hard Rioja winter, the first buds feel like a small miracle."],
    fingerlakes: ["Ice is off the lakes. The vines are stirring cautiously — they've survived worse.", "Spring arrives late here but it arrives. The crew is relieved to be back in the rows."],
    default: ["Budbreak. The season's character starts now — frost will be the first test."]
  },
  Flowering: {
    napa: ["The vineyard is in bloom. A warm, dry week now means fruit set. Everyone is watching the forecast.", "Flowering Napa smells extraordinary. Warm afternoons, dry nights — conditions are cooperating."],
    bordeaux: ["Flowering in Bordeaux is the most anxious fortnight of the year. Rain now means coulure.", "The estate holds its breath through flowering. One wet week changes everything about the vintage."],
    burgundy: ["Millerandage is the risk now — uneven berry size from a rough flowering. The team watches closely.", "Flowering Burgundy is beautiful and nerve-wracking in equal measure."],
    mosel: ["Flowering on the steep Mosel slopes. The crews work through tight terraces to remove any compromised shoots.", "Cool nights are slowing fruit set. The winemaker is cautiously optimistic — slow and even is good."],
    barossa: ["Barossa flowering goes fast in the heat. The fruit set looks heavy and clean.", "The vineyard is fragrant in the warm Barossa evenings. Flowering is nearly complete."],
    mendoza: ["Dry, warm flowering conditions in Mendoza. The Malbec is setting evenly.", "The mountain air keeps the pressure low. A clean flowering."],
    piedmont: ["Nebbiolo flowers quietly and slowly. The estate is patient — this variety doesn't rush.", "Flowering in the Langhe. Still months until harvest, but the vintage is already taking shape."],
    rioja: ["The plateau is warm and dry — ideal for flowering. Tempranillo is setting well.", "Good conditions through Rioja flowering. The vintage outlook is solid so far."],
    fingerlakes: ["A brief window of warmth for flowering. The crew makes the most of it.", "Finger Lakes flowering: cool, fast, and nail-biting. The vines are tough."],
    default: ["The vineyard is in flower. Dry weather now sets up the vintage."]
  },
  Veraison: {
    napa: ["Veraison is on. The berries are softening and turning — the color change moves through the rows over two weeks.", "Heat spikes in Napa veraison are the norm. The irrigation schedule is everything right now."],
    bordeaux: ["Veraison. The vintage is becoming what it's going to be. The cellar team is preparing.", "The Médoc ripens unevenly block by block. Sorting at harvest will matter."],
    burgundy: ["Pinot turning color in the Côte d'Or. The rows are extraordinary right now.", "Veraison in Burgundy is fleeting. Four weeks from here to harvest decisions."],
    mosel: ["The steep Mosel rows are shifting color. A good veraison — slow and even.", "Late afternoon light through the Riesling. The slate is holding heat and the sugars are climbing."],
    barossa: ["Barossa veraison in full heat. Water management is the priority.", "The Shiraz is turning and the aromas from the blocks are already extraordinary."],
    mendoza: ["High-altitude veraison. Clear nights, warm days — the Malbec is concentrating beautifully.", "The mountain light is sharp. Veraison color is even across the estate."],
    piedmont: ["Nebbiolo changing slowly. This is the patient part of the season.", "The Langhe fog is starting. Veraison Nebbiolo has another month of hang time ahead."],
    rioja: ["Tempranillo turning. The plateau is hot and the irrigation schedule is tight.", "Good veraison color. The vintage is looking solid heading into the final weeks."],
    fingerlakes: ["A race against autumn. The grapes are turning but the growing window is short.", "Riesling at veraison — lean, precise, and still building acidity."],
    default: ["The grapes are turning. Harvest is six to eight weeks away."]
  },
  Harvest: {
    napa: ["Harvest has begun. The picking crews are working before dawn to beat the afternoon heat.", "The valley smells of crushed fruit. Every winery in Napa is going at once."],
    bordeaux: ["Château gates are locked. The harvest is in progress and the chai is full of activity.", "Bordeaux harvest: meticulous sorting, early mornings, and careful decisions about each block's timing."],
    burgundy: ["The most pressured weeks of the year. Every hour matters in Burgundy harvest.", "Pinot harvest is fast and intentional. The old growers say you never get it exactly right."],
    mosel: ["Mosel harvest is a relay — block by block, picking only what's ready, coming back for the rest.", "The steep slopes are busy. Riesling harvest on the Mosel has no machines — only hands and crates."],
    barossa: ["Harvest is full on. The Shiraz comes in fast in the Barossa heat.", "The cellar is overwhelmed in the best way. Big fruit, big tanks, long nights."],
    mendoza: ["Harvest at altitude: cool nights preserve acidity even as the sugar climbs.", "The Malbec is coming in. The mountain air makes harvest feel clean and focused."],
    piedmont: ["Nebbiolo harvest is the last act. The rest of Piedmont has finished; Barolo waits.", "The fog is thick in the mornings. The crew picks through it and the fruit is extraordinary."],
    rioja: ["Harvest on the plateau. Cool nights and warm days — the Tempranillo is coming in well.", "Rioja harvest moves fast once it starts. The whole region is in motion."],
    fingerlakes: ["Racing the cold. The Riesling comes in at the last moment, fully flavored and bright.", "A tense Finger Lakes harvest. The fruit waited as long as it could and was worth it."],
    default: ["Harvest. Everything the season built toward is being picked right now."]
  },
  Cellar: {
    napa: ["The vineyard is quiet but the winery is loud. Fermentation tanks are bubbling around the clock.", "Post-harvest Napa. The cellar team is doing the real work now — pressing, racking, blending decisions."],
    bordeaux: ["The chai smells of new wine. Assemblage decisions begin, and they will define the vintage.", "Post-harvest Bordeaux: barrel samples, blending trials, and the endless work of building a wine."],
    burgundy: ["The cellar is full of Pinot. Every decision now is about preserving what the vintage gave.", "Burgundy cellar season: quiet, methodical, and consequential."],
    mosel: ["The Riesling is fermenting slowly in cold cellar conditions. That's exactly how it should be.", "A slow, cool fermentation on the Mosel. The winemaker is patient."],
    barossa: ["Big Shiraz in tank — dark, tannic, and needing time. Barrel decisions matter enormously here.", "The Barossa cellar is full. The team is racking, pressing, and tasting all day."],
    mendoza: ["Malbec cellar season in Mendoza. The fruit concentration makes every step feel deliberate.", "The mountain light is already fading by late afternoon. The cellar is warm and the wine is moving."],
    piedmont: ["Nebbiolo in barrel. The patience required for Barolo is its own form of discipline.", "The Langhe cellar is quiet and fragrant. The wine will need time — years of it."],
    rioja: ["The Tempranillo is in barrel. Rioja cellar work is measured in months, not weeks.", "Post-harvest Rioja. The estate settles into the long, slow rhythm of barrel aging."],
    fingerlakes: ["The lake effect has turned harsh. The cellar is warm; the vines are stripped and skeletal.", "A Finger Lakes cellar winter: careful winemaking and watching the weather from the window."],
    default: ["The harvest is in. The real cellar work begins now."]
  }
};

function maybeSeasonalLog(s) {
  const prevSeason = s.history.length ? seasonName(s.month - 1, s.region) : null;
  if (s.season === prevSeason) return;
  const pool = (SEASONAL_FLAVOR[s.season] || {})[s.region] || SEASONAL_FLAVOR[s.season]?.default || [];
  if (!pool.length) return;
  log(s, pool[randint(0, pool.length - 1)]);
}

function applyRegionEffects(s) {
  if (s.region === "bordeaux") {
    if (s.buildings.barrel < 2) {
      s.prestige -= 1;
      if (s.month % 4 === 0) log(s, "Appellation standards penalize estates without a developed barrel program. Prestige fell.");
    }
  }
  if (s.region === "burgundy") {
    if (s.buildings.barrel >= 3 && s.quality >= 72) {
      s.prestige += 1;
    } else if (s.buildings.barrel < 2) {
      s.quality -= 1;
      if (s.month % 4 === 0) log(s, "Burgundy terroir rewards patient barrel aging. Without it, the vintage character erodes.");
    }
  }
  if (s.region === "barossa") {
    const exportOrders = s.orders.filter(o => o.type === "export").length;
    if (exportOrders < 2 && s.month % 3 === 0 && rand() < 0.55) {
      addOrder(s, "export");
      log(s, "An export broker reached out; Barossa Shiraz is moving well overseas.");
    }
  }
}

function applyInvestorPressure(s, costs) {
  if (!s.investor || s.investor.pressureMonths <= 0) return;
  const last = s.history.length ? s.history[s.history.length - 1] : null;
  const revenueThisMonth = s.totalRevenue - (last?.totalRevenue || 0);
  const missedTarget = revenueThisMonth < costs * 1.15 || s.cash < 55000;
  if (missedTarget) {
    s.investor.strikes += 1;
    s.morale -= 3;
    s.prestige -= s.investor.strikes >= 3 ? 3 : 1;
    log(s, "Investor pressure bit into morale after a weak monthly close.");
  } else {
    s.demand += 2;
    s.influence += 1;
    log(s, "The investor liked the month and opened another commercial door.");
  }
  s.investor.pressureMonths -= 1;
  if (s.investor.pressureMonths <= 0) {
    s.survivedInvestor = true;
    log(s, "The investor's first-year pressure eased. The estate keeps the capital structure.");
  }
}

function seasonName(month, regionId = state?.region) {
  const m = calendarMonthNumber(month);
  if (SOUTHERN_HEMISPHERE_REGIONS.has(regionId)) {
    if ([6, 7, 8].includes(m)) return "Dormant";
    if ([9, 10].includes(m)) return "Budbreak";
    if ([11, 12].includes(m)) return "Flowering";
    if ([1, 2].includes(m)) return "Veraison";
    if ([3, 4].includes(m)) return "Harvest";
    return "Cellar";
  }
  if ([12, 1, 2].includes(m)) return "Dormant";
  if ([3, 4].includes(m)) return "Budbreak";
  if ([5, 6].includes(m)) return "Flowering";
  if ([7, 8].includes(m)) return "Veraison";
  if ([9, 10].includes(m)) return "Harvest";
  return "Cellar";
}

function isHarvestMonth(month, regionId = state?.region) {
  const m = calendarMonthNumber(month);
  if (SOUTHERN_HEMISPHERE_REGIONS.has(regionId)) return m === 3;
  return m === 9;
}

function applyWeather(s) {
  const r = region();
  const v = varietal();
  const lab = 1 - s.buildings.lab * 0.12;
  const month = calendarMonthNumber(s.month);
  const season = seasonName(s.month, s.region);
  s.lastTemp = regionalTempRange(r.id, month);
  const springFrost = season === "Budbreak" ? 1 : season === "Flowering" || season === "Harvest" ? 0.25 : 0.03;
  const summerHeat = season === "Veraison" || season === "Harvest" ? 1 : season === "Flowering" ? 0.45 : 0.08;
  const rainSeason = ["Budbreak", "Flowering", "Harvest", "Cellar"].includes(season) ? 1 : season === "Dormant" ? 0.55 : 0.35;
  const droughtSeason = ["Flowering", "Veraison", "Harvest"].includes(season) ? 1 : season === "Budbreak" ? 0.35 : 0.12;
  const tempHeat = s.lastTemp.high >= 95 ? 1.7 : s.lastTemp.high >= 88 ? 1.25 : s.lastTemp.high >= 80 ? 0.75 : 0;
  const tempFrost = s.lastTemp.low <= 33 ? 1.8 : s.lastTemp.low <= 38 ? 1.2 : s.lastTemp.low <= 43 ? 0.45 : 0;
  const humidity = REGION_CLIMATE[r.id]?.humidity || 0.55;
  const options = [
    { name: "Heat spike",    key: "heat",    weight: 0.18 * r.weather.heat    * summerHeat  * tempHeat },
    { name: "Frost pocket",  key: "frost",   weight: 0.12 * r.weather.frost   * springFrost * tempFrost },
    { name: "Wet canopy",    key: "rain",    weight: 0.17 * r.weather.rain    * rainSeason  * (0.65 + humidity) },
    { name: "Drought stress",key: "drought", weight: 0.14 * r.weather.drought * droughtSeason * (1.35 - humidity) },
    { name: "Clear skies",   key: "clear",   weight: 0.39 }
  ];
  const total = options.reduce((sum, o) => sum + o.weight, 0);
  let roll = rand() * total;
  const picked = options.find(o => { roll -= o.weight; return roll <= 0; }) || options[options.length - 1];
  s.lastWeather = picked.name;

  const shield = staffBonus(s, "finance") ? 0.82 : 1;
  const diseaseRisk = v.diseaseRisk || 1.0;
  const droughtSens = v.droughtSensitivity || 1.0;

  s.rows.forEach(row => {
    ensureRowFields(row);
    const frostReady = picked.key === "frost" && s.marketMods.frostReady ? 0.4 : 1;

    switch (picked.key) {
      case "rain":
        row.disease = clamp(row.disease + Math.round((11 + randint(0, 8)) * diseaseRisk * philosophy().risk * lab * shield), 0, 100);
        row.water   = clamp(row.water   + randint(8, 16), 0, 100);
        row.pressure = "wet canopy";
        break;
      case "drought":
        row.disease = clamp(row.disease - randint(2, 6), 0, 100);
        row.water   = clamp(row.water   - Math.round((10 + randint(0, 8)) * droughtSens), 0, 100);
        if (row.water < 25) row.health = clamp(row.health - Math.round(2 * droughtSens), 8, 100);
        row.pressure = "drought";
        break;
      case "heat":
        row.water = clamp(row.water - randint(4, 10), 0, 100);
        if (row.water < 30) row.health = clamp(row.health - Math.round(3 * droughtSens * lab), 8, 100);
        row.disease = clamp(row.disease - randint(1, 3), 0, 100);
        row.pressure = "heat";
        break;
      case "frost":
        row.health  = clamp(row.health - Math.round((8 + randint(0, 8)) * philosophy().risk * lab * frostReady), 8, 100);
        row.disease = clamp(row.disease - randint(2, 5), 0, 100);
        row.pressure = "frost";
        break;
      case "clear": {
        const clearHumidityDrift = Math.round((humidity - 0.55) * 6);
        row.disease = clamp(row.disease - randint(2, 5), 0, 100);
        row.water   = clamp(row.water + randint(-3, 2) + clearHumidityDrift, 0, 100);
        row.health  = clamp(row.health + 1, 8, 100);
        break;
      }
    }

    // High disease bleeds health over time
    if (row.disease > 45) row.health = clamp(row.health - Math.floor((row.disease - 45) / 14), 8, 100);
  });

  if (picked.key === "clear") {
    s.quality += 1;
  } else {
    const avgDisease = averageDisease(s);
    s.quality -= Math.max(0, Math.floor((avgDisease - 45) / 22));
  }

  const isGrowingSeason = [3, 4, 5, 6, 7, 8, 9, 10].includes(month);
  if (isGrowingSeason) {
    const weatherDelta = picked.key === "clear" ? 4 : picked.key === "frost" ? -6 : picked.key === "rain" ? -2 : picked.key === "drought" ? -3 : picked.key === "heat" ? -2 : 0;
    s.vintageWeatherScore = clamp((s.vintageWeatherScore || 52) + weatherDelta, 10, 90);
  }
}

function harvest(s) {
  const r = region();
  const v = varietal();
  const p = philosophy();
  const productive = productiveRows(s);
  if (!productive.length) {
    s.harvestReport = {
      date: monthDateLabel(s.month),
      grapes: 0,
      laborCost: 0,
      productiveRows: 0,
      qualityGain: 0,
      note: "No mature vineyard blocks cropped this harvest."
    };
    log(s, "Harvest arrived, but no vineyard blocks were mature enough to crop.");
    return s.harvestReport;
  }
  productive.forEach(r => ensureRowFields(r));
  const avgHealth  = productive.reduce((sum, row) => sum + row.health, 0) / productive.length;
  const avgDisease = productive.reduce((sum, row) => sum + (row.disease || 0), 0) / productive.length;
  const avgWater   = productive.reduce((sum, row) => sum + (row.water || 50), 0) / productive.length;
  const harvestYear = START_YEAR + Math.floor((s.month - 1) / 12);
  const maturityMods = productive.map(row => vineMaturity(harvestYear - (row.plantedYear || START_YEAR - 8)));
  const avgMaturityYield   = maturityMods.reduce((sum, m) => sum + m.yield,   0) / maturityMods.length;
  const avgMaturityQuality = maturityMods.reduce((sum, m) => sum + m.quality, 0) / maturityMods.length;
  const maturityCounts = {};
  maturityMods.forEach(m => { maturityCounts[m.label] = (maturityCounts[m.label] || 0) + 1; });
  const dominantMaturity = Object.entries(maturityCounts).sort((a, b) => b[1] - a[1])[0][0];

  // Water stress: mild deficit is good for reds (< optimalWater), bad for whites (> optimalWater)
  const optimalWater = v.optimalWater || 50;
  const waterDev = avgWater - optimalWater;
  const waterYieldMod  = clamp(1 - Math.abs(waterDev) / 120, 0.7, 1.05);
  const waterQualityMod = waterDev < 0
    ? clamp(1 + Math.abs(waterDev) / 80, 1.0, 1.15)   // mild deficit → concentration bonus
    : clamp(1 - waterDev / 90, 0.85, 1.0);             // excess water → dilution

  // Disease penalty on yield and quality
  const diseaseYieldMod   = clamp(1 - avgDisease / 160, 0.65, 1.0);
  const diseaseQualityMod = clamp(1 - avgDisease / 100, 0.62, 1.0);

  const base = productive.length * 260;
  const crew = s.marketMods.harvestCrew ? 1.12 : 1;
  const greenHarvestMod = s.marketMods.greenHarvest ? 0.80 : 1.0;
  const grapes = Math.max(60, Math.round(
    base * (avgHealth / 82) * v.yield * p.yield * (r.yieldMod || 1) * crew * waterYieldMod * diseaseYieldMod * greenHarvestMod * staffYieldMod(s) * avgMaturityYield
  ));
  s.lastHarvestForecast = Math.max(60, Math.round(base * v.yield * p.yield * (r.yieldMod || 1) * staffYieldMod(s)));
  s.lastHarvestGrapes = grapes;
  const rawQualityGain = Math.round((avgHealth - 58) / 8 + s.buildings.barrel * 0.7 + (s.marketMods.harvestCrew ? 2 : 0));
  const qualityGain = Math.round(rawQualityGain * waterQualityMod * diseaseQualityMod * avgMaturityQuality);

  const laborRate = s.marketMods.harvestCrew ? 3600 : 2800;
  const laborCost = Math.round(productive.length * laborRate * r.costMod * difficulty().costMod * staffCostMod(s));
  const year = START_YEAR + Math.floor((s.month - 1) / 12);
  const vintageScore = computeVintageScore(s.vintageWeatherScore, avgHealth);
  s.vintages.push({
    id: `harvest-${s.month}`,
    year,
    score: vintageScore,
    label: `${year} ${v.name}`,
    grapes,
    bulkWine: 0,
    agingMonths: 0,
    agingTarget: 0,
    bottled: 0,
    purchased: false,
    dominantMaturity
  });
  s.vintageWeatherScore = 52;
  s.cash -= laborCost;
  s.quality += qualityGain;
  s.prestige += qualityGain > 3 ? 2 : 0;
  productive.forEach(row => {
    row.disease = clamp((row.disease || 0) - 20, 0, 100);
    row.health  = clamp(row.health + 12, 20, 100);
    row.threat  = Math.round(row.disease / 11);
  });
  const diseaseNote = avgDisease > 55 ? ` Disease pressure (${Math.round(avgDisease)}) cut yield and quality.` : avgDisease < 20 ? " Clean blocks." : "";
  const waterNote   = Math.abs(waterDev) > 18 ? (waterDev < 0 ? " Mild water stress concentrated the fruit." : " Excess water diluted the vintage.") : "";
  const maturityNote = dominantMaturity === "old vine" ? " Old vine fruit added concentration and depth." : dominantMaturity === "young vine" ? " Young vines reduced yield." : "";
  s.harvestReport = {
    date: monthDateLabel(s.month),
    grapes,
    laborCost,
    productiveRows: productive.length,
    qualityGain,
    vintageScore,
    avgDisease: Math.round(avgDisease),
    avgWater: Math.round(avgWater),
    note: (s.marketMods.harvestCrew ? "Selective picking raised yield and quality." : "Standard seasonal labor.") + diseaseNote + waterNote + maturityNote
  };
  s.harvestCount = (s.harvestCount || 0) + 1;
  log(s, `Harvest: ${grapes} CE from ${productive.length} blocks. Disease ${Math.round(avgDisease)}, water ${Math.round(avgWater)}. ${vintageScoreLabel(vintageScore)} vintage. Labor ${money(laborCost)}.`);
  return s.harvestReport;
}

function productiveRows(s) {
  return s.rows.filter(row => (row.matureMonth || 1) <= s.month);
}

function averageThreat(s) {
  return averageDisease(s) / 11;
}

function decayAndOrders(s) {
  s.orders.forEach(order => {
    if (!order.accepted && order.expires < s.month) {
      s.demand -= 1;
      log(s, `${order.buyer} let their offer lapse.`);
    }
    if (order.accepted && order.due < s.month) {
      s.cash -= order.penalty;
      s.prestige -= 3;
      addChannelDemand(s, [order.channel || ORDER_CHANNEL[order.type] || "distributor"], -4);
      addChannelTrust(s, order.channel || ORDER_CHANNEL[order.type] || "distributor", -8);
      s.morale -= 3;
      s.missed += 1;
      log(s, `Missed ${order.buyer}. Penalty paid: ${money(order.penalty)}.`);
    }
  });
  s.orders = s.orders.filter(order => order.accepted ? order.due >= s.month : order.expires >= s.month);
  if (s.month % 3 === 0 || s.orders.length < 2) addOrder(s);
}

function drawEvent(s) {
  ensureEventMemory(s);
  const candidates = EVENT_DECK.filter(event => {
    if (event.priority) return false;
    if (event.minMonth && s.month < event.minMonth) return false;
    if (event.condition && !event.condition(s)) return false;
    const rule = EVENT_RULES[event.id];
    const memory = s.eventMemory[event.id] || { count: 0, lastMonth: -999 };
    if (rule?.max && memory.count >= rule.max) return false;
    if (rule?.cooldown && s.month - memory.lastMonth < rule.cooldown) return false;
    if (!event.type) return true;
    if (event.type === "frost") return s.lastWeather.includes("Frost") || rand() < 0.35;
    if (event.type === "rain") return s.lastWeather.includes("Wet") || rand() < 0.45;
    return true;
  });
  return candidates[randint(0, candidates.length - 1)];
}

function drawPriorityEvent(s) {
  ensureEventMemory(s);
  const candidates = EVENT_DECK.filter(event => {
    if (!event.priority) return false;
    if (event.minMonth && s.month < event.minMonth) return false;
    if (event.condition && !event.condition(s)) return false;
    const rule = EVENT_RULES[event.id];
    const memory = s.eventMemory[event.id] || { count: 0, lastMonth: -999 };
    if (rule?.max && memory.count >= rule.max) return false;
    if (rule?.cooldown && s.month - memory.lastMonth < rule.cooldown) return false;
    return true;
  });
  return candidates[0] || null;
}

function resolveEvent(choiceIndex) {
  const event = state.event;
  if (!event) return;
  const choice = event.choices[choiceIndex];
  if (!choice) return;
  if (choice.condition && !choice.condition(state)) return;
  let cost = choice.cost || 0;
  if (choice.insured && state.insurance?.crop) cost = Math.round(cost * 0.2);
  if (cost && state.cash < cost) return;
  state.cash -= cost;
  if (choice.insured && state.insurance?.crop && choice.cost) {
    log(state, `Crop insurance covered ${money((choice.cost || 0) - cost)} of the damage cost.`);
  }
  const beforeLog = state.log.length;
  choice.effect(state);
  if (choice.iniquity && inWrath(state)) {
    state.wrathState.iniquityChoicesAccepted += 1;
    if (hasStaff(state, "priest")) {
      // iniquityAfterPriest is computed from baseline at priest arrival
    }
  }
  if (choice.faithGain && inWrath(state)) {
    state.wrathState.faith = clamp(
      state.wrathState.faith + choice.faithGain,
      0,
      state.wrathState.faithCap
    );
  }
  const displayLabel = choice.iniquity ? "Severin dealt with it" : choice.label;
  if (!choice.iniquity) log(state, `${event.title}: ${displayLabel}.`);
  const summary = state.log.slice(0, Math.max(1, state.log.length - beforeLog)).map(entry => entry.text).reverse().join(" ");
  state.lastEventResult = {
    title: `${event.title} resolved`,
    choice: displayLabel,
    summary: summary || "Outcome recorded in the estate ledger."
  };
  ensureEventMemory(state);
  const memory = state.eventMemory[event.id] || { count: 0, lastMonth: -999 };
  state.eventMemory[event.id] = { count: memory.count + 1, lastMonth: state.month };
  state.event = null;
  normalizeState(state);
  checkGameOver();
  render();
}

function checkGameOver() {
  if (!state) return;
  if (inWrath(state) && state.wrathState.mode === "measurement") return;
  if (state.month > state.maxMonths) {
    state.gameOver = { score: true };
    checkAchievements(state);
  } else if (state.debt > state.creditLine + 65000 || (state.cash < -50000 && availableCredit(state) <= 0) || state.prestige <= 0 || (state.morale <= 0 && !inWrath(state))) {
    state.gameOver = {
      score: false,
      title: "The estate lost confidence.",
      text: "The board stepped in after debt, morale, or reputation broke the business."
    };
    checkAchievements(state);
  }
}

function wineryNameInput() {
  return `
    <div class="winery-name-row">
      <label class="winery-name-label">
        <span>Winery name</span>
        <input type="text" class="winery-name-input" placeholder="Your estate name..." maxlength="40"
          value="${escapeHtml(setup.wineryName)}"
          oninput="setup.wineryName = this.value;">
      </label>
    </div>
  `;
}

function setupStartPanel(loadButton) {
  return `
    ${wineryNameInput()}
    <div class="quick-start-list">
      ${SUGGESTED_STARTS.map((s, i) => {
        const r = REGIONS.find(reg => reg.id === s.region);
        const v = VARIETALS[s.varietal];
        const d = DIFFICULTIES.find(dif => dif.id === s.difficulty);
        return `
          <button class="quick-start-card quick-card-${s.label.toLowerCase()}" onclick="applySuggestedStart(${i})">
            <div class="quick-card-header">
              <span class="quick-start-badge">${s.label}</span>
              <strong>${s.title}</strong>
            </div>
            <p>${s.description}</p>
            <div class="quick-card-meta">
              <span>${r?.name}</span>
              <span>${v?.name}</span>
              <span>${d?.name} difficulty</span>
            </div>
          </button>
        `;
      }).join("")}
      <button class="quick-start-card quick-card-custom" onclick="setSetupMode('custom')">
        <div class="quick-card-header">
          <span class="quick-start-badge">Custom</span>
          <strong>Custom Setup</strong>
        </div>
        <p>Choose your region, grape, philosophy, and difficulty step by step.</p>
        <div class="quick-card-meta">
          <span>9 regions</span>
          <span>12 varietals</span>
          <span>3 difficulties</span>
        </div>
      </button>
    </div>
    <div class="setup-start-footer">
      <button class="ghost" onclick="randomStart()">Random start</button>
      ${loadButton}
    </div>
  `;
}

function setupCustomPanel(loadButton) {
  const r = selectedRegion();
  const v = selectedVarietal();
  const p = selectedPhilosophy();
  const d = selectedDifficulty();
  const step = SETUP_STEPS[setupStep];
  return `
    ${wineryNameInput()}
    <div class="setup-progress">
      ${SETUP_STEPS.map((item, index) => `
        <button class="${index === setupStep ? "active" : ""} ${index < setupStep ? "done" : ""}" onclick="setSetupStep(${index})">
          <span>${index + 1}</span>${item.key}
        </button>
      `).join("")}
    </div>
    <h2>${step.title}</h2>
    <p class="setup-kicker">${step.kicker}</p>
    ${setupStepContent(step.key)}
    <div class="setup-section">
      <div class="section-title">Estate Summary</div>
      ${setupSummary(r, v, p, d)}
    </div>
    <div class="setup-section top-actions">
      <button class="ghost" onclick="setSetupMode('start')">← Back</button>
      ${loadButton}
      <button class="ghost" onclick="randomStart()">Random</button>
      <button onclick="prevSetupStep()" ${setupStep === 0 ? "disabled" : ""}>Back</button>
      ${setupStep < SETUP_STEPS.length - 1
        ? `<button class="primary" onclick="nextSetupStep()">Next</button>`
        : `<button class="primary" onclick="startGame()">Start vintage run</button>`}
    </div>
  `;
}

function setupView() {
  const loadButton = localStorage.getItem("cellar-baron-save")
    ? `<button class="ghost" onclick="loadGame()">Load saved estate</button>`
    : "";
  let panelContent;
  if (setupMode === "custom") panelContent = setupCustomPanel(loadButton);
  else panelContent = setupStartPanel(loadButton);
  return `
    <main class="setup">
      <div class="setup-inner">
        <section class="hero-copy">
          <div class="hero-title" role="img" aria-label="Cellar Baron"></div>
          <div class="hero-blurb">
            <p>Build a wine estate through five volatile years of vineyard pressure, staff politics, cellar bets, fickle buyers, and pricing decisions.</p>
          </div>
        </section>
        <section class="setup-panel">
          ${panelContent}
        </section>
      </div>
    </main>
  `;
}

function setupStepContent(key) {
  const r = selectedRegion();
  if (key === "region") {
    return `<div class="setup-section"><div class="setup-grid">${REGIONS.map(item => choiceButton("region", item.id, item.name, item.blurb, item.tags)).join("")}</div></div>`;
  }
  if (key === "varietal") {
    return `<div class="setup-section"><div class="setup-grid">${r.varietals.map(id => {
      const item = VARIETALS[id];
      return choiceButton("varietal", id, item.name, item.blurb, item.tags);
    }).join("")}</div></div>`;
  }
  if (key === "philosophy") {
    return `<div class="setup-section"><div class="setup-grid">${PHILOSOPHIES.map(item => choiceButton("philosophy", item.id, item.name, item.blurb, item.tags)).join("")}</div></div>`;
  }
  return `<div class="setup-section"><div class="setup-grid">${DIFFICULTIES.map(item => choiceButton("difficulty", item.id, item.name, item.blurb, item.tags)).join("")}</div></div>`;
}

function setupSummary(r, v, p, d) {
  return `
    <div class="setup-summary">
      <div><span>Region</span><strong>${r.name}</strong></div>
      <div><span>Grape</span><strong>${v.name}</strong></div>
      <div><span>Style</span><strong>${p.name}</strong></div>
      <div><span>Difficulty</span><strong>${d.name}</strong></div>
      <div><span>Opening cash</span><strong>${money(r.cash * d.cashMod)}</strong></div>
      <div><span>Opening debt</span><strong>${money(d.debt)}</strong></div>
      <div><span>Lease / month</span><strong>${money(d.rent)}</strong></div>
      <div><span>Demand</span><strong>${Math.round(r.demand * v.demand * p.demand * d.demandMod)}</strong></div>
      <div><span>Harvest window</span><strong>${seasonWindows(r.id).Harvest}</strong></div>
    </div>
  `;
}

function setSetupStep(index) {
  setupStep = clamp(index, 0, SETUP_STEPS.length - 1);
  render();
}

function nextSetupStep() {
  setSetupStep(setupStep + 1);
}

function prevSetupStep() {
  setSetupStep(setupStep - 1);
}

function choiceButton(kind, id, name, blurb, tags) {
  const selected = setup[kind] === id ? " selected" : "";
  return `
    <button class="choice${selected}" onclick="selectSetup('${kind}', '${id}')">
      <strong>${name}</strong>
      <p>${blurb}</p>
      <span class="tags">${tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</span>
    </button>
  `;
}

function selectSetup(kind, id) {
  setup[kind] = id;
  if (kind === "region" && !selectedRegion().varietals.includes(setup.varietal)) {
    setup.varietal = selectedRegion().varietals[0];
  }
  render();
}

function gameView() {
  return `
    ${topbar()}
    <main class="shell">
      ${tabs()}
      <div class="tab-layout">
        <div class="tab-main">
          ${negativeCashBanner()}
          ${eventPanel()}
          ${eventResultPanel()}
          ${harvestReportPanel()}
          ${helpOpen ? tutorialPanel() : ""}
          ${tabPanel()}
        </div>
        <aside class="side-rail">
          ${actionsPanel()}
          ${ledgerPanel()}
        </aside>
      </div>
    </main>
    ${state.gameOver ? gameOverModal() : (guideStep !== null && guideStep < GUIDE_PAGES.length ? guideModal() : (!state.introSeen ? introModal() : (state.pendingNaming ? namingModal() : "")))}
    ${noHelpModal()}
    ${achievementToast()}
  `;
}

function tabs() {
  if (inWrath(state) && state.wrathState.mode === "measurement") return "";
  return `
    <nav class="tabs" aria-label="Estate sections">
      ${TABS.map(tab => {
        const TAB_WRATH_NAMES = {
          overview: [[6, "The Estate"]],
          people:   [[5, "The Hands"]],
          cellar:   [[7, "The Press"]],
        };
        const name = corruptChars(state, wrathLabel(state, tab.name, TAB_WRATH_NAMES[tab.id] || []));
        return `
        <button class="${activeTab === tab.id ? "active" : ""}" onclick="setTab('${tab.id}')" ${tip(tab.tip)}>
          ${name}
        </button>`;
      }).join("")}
      <button class="help-toggle" onclick="${inWrath(state) && state.wrathState.seal >= 3 ? "openNoHelpModal()" : "toggleHelp()"}" ${tip("Show or hide the short tutorial brief.")}>${inWrath(state) && state.wrathState.seal >= 3 ? corruptChars(state, "Call For Help") : (helpOpen ? "Hide Help" : "Show Help")}</button>
    </nav>
  `;
}

function tabPanel() {
  if (inWrath(state) && state.wrathState.mode === "measurement") {
    return measurementStepContent(state);
  }
  if (activeTab === "vineyard") {
    return `${artBanner("vineyard", "Vineyard blocks, weather, and disease pressure")}${vineyardPanel()}`;
  }
  if (activeTab === "cellar") {
    return `${artBanner("cellar", "Vintage lots, aging timeline, and cellar archives")}${vintageCellarPanel()}${archivePanel()}`;
  }
  if (activeTab === "commercial") {
    return `${artBanner("commercial", "Tasting room, buyers, and distribution")}${marketPanel()}${channelPanel()}${analyticsPanel()}${ordersPanel()}`;
  }
  if (activeTab === "estate") {
    return `${artBanner("cellar", "Cellar, bottling line, tanks, and barrels")}${buildingsPanel()}`;
  }
  if (activeTab === "people") {
    return `${staffPanel()}`;
  }
  return `${overviewPanel()}${analyticsPanel()}${marketPanel()}${channelPanel()}${ordersPanel()}`;
}

function setTab(tab) {
  activeTab = tab;
  render();
}

function toggleHelp() {
  helpOpen = !helpOpen;
  if (state) state.tutorialSeen = !helpOpen;
  render();
}

function openNoHelpModal() {
  noHelpModalOpen = true;
  render();
}

function closeNoHelpModal() {
  noHelpModalOpen = false;
  render();
}

function noHelpModal() {
  if (!noHelpModalOpen) return "";
  const seal = state?.wrathState?.seal || 0;
  const body = seal >= 7
    ? "The record is being kept. The account is complete. There is no counsel available for what follows."
    : seal >= 5
    ? "No help is forthcoming. The estate stands as it has stood. The vintner is still in the cellar."
    : "No help is forthcoming. The estate stands as it has stood. The account is being kept.";
  return `
    <div class="modal" onclick="closeNoHelpModal()">
      <div class="modal-card" style="max-width:420px" onclick="event.stopPropagation()">
        <p style="font-style:italic;color:#4a2222;line-height:1.7;">${body}</p>
        <div class="top-actions" style="margin-top:12px;">
          <button onclick="closeNoHelpModal()">Understood</button>
        </div>
      </div>
    </div>
  `;
}

function tip(text) {
  return `data-tip="${escapeHtml(text)}" aria-label="${escapeHtml(text)}"`;
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function topbar() {
  return `
    <header class="topbar">
      <div class="topbar-inner">
        <div class="brand">
          <div class="mark">${wineryInitials(state.wineryName)}</div>
          <div>
            <h1>${escapeHtml(state.wineryName || "Unnamed Estate")}</h1>
            <p>${region().name} • ${varietal().name} • ${philosophy().name} • ${difficulty().name}</p>
          </div>
        </div>
        <div class="kpis">
          ${kpi("Date", currentDateLabel(state), "Current month. Most operations, weather, contracts, and costs advance monthly.")}
          ${kpi(wrathLabel(state, "Cash", [[4, "Mammon"]]), money(state.cash), "Available cash after operating costs, sales, debt draws, and repayments. Running out forces credit-line use.", state.cash < 0 ? "danger" : state.cash < 30000 ? "warn" : state.cash >= 200000 ? "good" : "")}
          ${kpi("Prestige", `${state.prestige}/120`, "Reputation with critics, buyers, and collectors.", state.prestige >= 75 ? "good" : state.prestige < 40 ? "warn" : "")}
          ${kpi("Demand", `${state.demand}/130`, "Commercial pull for your wine. Higher demand improves direct sales and buyer interest.", state.demand >= 100 ? "good" : state.demand < 50 ? "warn" : "")}
          ${kpi("Quality", `${state.quality}/120`, "Current house quality. Vineyard health, weather, cellar work, and barrels move this. Decays faster above 85.", state.quality >= 85 ? "good" : state.quality < 50 ? "warn" : "")}
          ${kpi("Morale", `${state.morale}/100`, "Staff and crew confidence. Below 20 loses an action/month and triggers labor events; 0 ends the game.", state.morale < 20 ? "danger" : state.morale < 40 ? "warn" : state.morale >= 70 ? "good" : "")}
          ${kpi("Fatigue", `${state.fatigue || 0}/100`, "Operational strain. Harvest, bottling, hospitality, emergencies, and heroics add fatigue; winter rest and operations capacity clear it.", (state.fatigue || 0) > 75 ? "danger" : (state.fatigue || 0) > 50 ? "warn" : (state.fatigue || 0) < 20 ? "good" : "")}
          ${kpi("Grape CE", totalGrapes(state), "Case-equivalent grapes across all vintage lots. Harvest adds these; cellar work converts them to bulk wine.")}
          ${kpi("Bulk CE", totalBulkWine(state), "Case-equivalent bulk wine aging across all vintage lots. Bottling converts this into finished cases.")}
          ${kpi("Cases", state.inventory.cases, "Finished cases ready to sell or reserve for contracts. Passive direct sales can reduce this at month close.")}
          ${kpi("House Style", `${state.profile ?? 50} · ${profileLabel(state.profile ?? 50)}`, `Profile ${state.profile ?? 50}/100. Commercial end: higher demand, lower price ceiling. Artisan end: lower demand, higher price ceiling and prestige.`)}
        </div>
        <div class="top-actions">
          <button onclick="saveGame()">Save</button>
          <button onclick="advanceMonth()" class="primary" ${state.event || state.gameOver ? "disabled" : ""}>${inWrath(state) && state.wrathState.mode === "measurement" ? "Behold" : wrathLabel(state, "End month", [[7, "Let it end"], [4, "Let it pass"]])}</button>
        </div>
      </div>
    </header>
  `;
}

function kpi(label, value, tooltip, tone) {
  const cls = tone ? ` kpi-${tone}` : "";
  return `<div class="kpi${cls}" ${tooltip ? tip(tooltip) : ""}><span>${label}</span><strong>${value}</strong></div>`;
}

function eventPanel() {
  if (!state.event) return "";
  const visibleChoices = state.event.choices.filter((choice, _i) => {
    if (choice.condition) return choice.condition(state);
    if (choice.iniquity) return inWrath(state) && state.wrathState.seal >= 2;
    return true;
  });
  return `
    <section class="panel event-banner ${state.event.image ? (state.event.largeArt ? "with-art-large" : "with-art") : ""}">
      ${state.event.image ? `<img src="${state.event.image}" alt="${state.event.title}">` : ""}
      <div>
        <strong>${state.event.title}</strong>
        <div class="small">${typeof state.event.body === "function" ? state.event.body(state) : state.event.body}</div>
        <div class="event-buttons">
          ${state.event.choices.map((choice, index) => {
            if (choice.condition && !choice.condition(state)) return "";
            if (choice.iniquity && !(inWrath(state) && state.wrathState.seal >= 2)) return "";
            const effectiveCost = choice.insured && state.insurance?.crop ? Math.round((choice.cost || 0) * 0.2) : (choice.cost || 0);
            const costLabel = choice.cost ? (effectiveCost < choice.cost ? ` (${money(effectiveCost)} · insured)` : ` (${money(choice.cost)})`) : "";
            const isIniquity = !!choice.iniquity;
            const label = isIniquity ? "Ask Severin to deal with it" : choice.label;
            return `
            <button class="event-choice ${isIniquity ? "event-choice-iniquity" : ""}" onclick="resolveEvent(${index})" ${effectiveCost && state.cash < effectiveCost ? "disabled" : ""} ${isIniquity ? 'title="..."' : ""}>
              <span class="event-choice-label">${label}${costLabel}</span>
              ${!isIniquity && choice.hint ? `<span class="event-choice-hint">${escapeHtml(choice.hint)}</span>` : ""}
            </button>
          `;
          }).join("")}
        </div>
      </div>
    </section>
  `;
}

function eventResultPanel() {
  const result = state.lastEventResult;
  if (!result) return "";
  return `
    <section class="panel event-result">
      <div class="panel-head">
        <h2>${escapeHtml(result.title)}</h2>
        <button class="ghost compact" onclick="dismissEventResult()">Dismiss</button>
      </div>
      <p>${escapeHtml(result.choice)}</p>
      <div class="small">${escapeHtml(result.summary)}</div>
    </section>
  `;
}

function dismissEventResult() {
  if (!state) return;
  state.lastEventResult = null;
  render();
}

function harvestReportPanel() {
  const report = state.harvestReport;
  if (!report) return "";
  const qualityColor = report.qualityGain > 0 ? "var(--ok)" : report.qualityGain < 0 ? "var(--danger)" : "var(--muted)";
  return `
    <section class="panel harvest-report">
      <div class="harvest-head">
        <div>
          <strong class="harvest-title">${report.date} Harvest</strong>
          <p class="harvest-note">${report.note}</p>
        </div>
        <button class="ghost compact" onclick="dismissHarvestReport()">Dismiss</button>
      </div>
      <div class="harvest-stats">
        <div class="stat-box"><span>Grapes brought in</span><strong>${report.grapes} CE</strong></div>
        <div class="stat-box"><span>Mature blocks</span><strong>${report.productiveRows}</strong></div>
        <div class="stat-box"><span>Seasonal labor</span><strong>${money(report.laborCost)}</strong></div>
        <div class="stat-box"><span>Quality change</span><strong style="color:${qualityColor}">${report.qualityGain >= 0 ? "+" : ""}${report.qualityGain}</strong></div>
        ${report.vintageScore ? `<div class="stat-box"><span>Vintage score</span><strong style="color:var(--gold)">${vintageScoreStars(report.vintageScore)} ${vintageScoreLabel(report.vintageScore)}</strong></div>` : ""}
      </div>
    </section>
  `;
}

function negativeCashBanner() {
  if (!state || state.cash >= 0) return "";
  const canDraw = availableCredit(state) > 0;
  return `
    <div class="alert-banner">
      <div class="alert-body">
        <strong>Cash overdrawn ${money(state.cash)}</strong>
        <span>Draw from the credit line to cover operations; uncovered overdraft accrues at a penalty rate and drains morale.</span>
      </div>
      <div class="alert-actions">
        <button onclick="drawDebt(25000)" ${!canDraw ? "disabled" : ""}>Draw ${money(25000)}</button>
        <button onclick="drawDebt(75000)" ${availableCredit(state) < 75000 ? "disabled" : ""}>Draw ${money(75000)}</button>
      </div>
    </div>
  `;
}

function dismissHarvestReport() {
  if (!state) return;
  state.harvestReport = null;
  render();
}

function tutorialPanel() {
  return `
    <section class="panel tutorial">
      <div class="panel-head">
        <h2>First Vintage Brief</h2>
        <button class="ghost compact" onclick="toggleHelp()">Dismiss</button>
      </div>
      <div class="tutorial-grid">
        <div>
          <strong>1. Spend monthly actions</strong>
          <p>Most turns start with two owner-attention choices plus any staff capacity you have built. Harvest follows the estate's hemisphere.</p>
        </div>
        <div>
          <strong>2. Price against demand</strong>
          <p>Higher bottle prices raise revenue but can scare off buyers. Contract ceilings are shown in the Commercial tab.</p>
        </div>
        <div>
          <strong>3. Do not overpromise</strong>
          <p>Accepted orders reserve cases. Missing a due date costs cash, prestige, demand, and morale.</p>
        </div>
        <div>
          <strong>4. Build an engine</strong>
          <p>Staff and upgrades compound, but rent, interest, payroll, and construction can sink cash before harvest pays back.</p>
        </div>
      </div>
      <div class="season-strip">
        ${Object.entries(seasonWindows(state.region)).map(([season, months]) => `<span><strong>${season}</strong> ${months}</span>`).join("")}
      </div>
    </section>
  `;
}

function overviewPanel() {
  const worth = netWorth(state);
  return `
    ${estateDashboard()}
    ${operationsPanel()}
    <section class="panel overview-panel">
      <div class="panel-head">
        <h2>Operating Brief</h2>
        <span class="small">Five seasons — how far can you go?</span>
      </div>
      <div class="brief-grid">
        <button class="brief-card" onclick="setTab('vineyard')" ${tip("Watch row health and threat. High pressure lowers harvest yield and quality.")}>
          <span>Vineyard Risk</span>
          <strong>${Math.round(averageDisease(state))}/100</strong>
          <em>${state.season} • ${state.lastWeather}</em>
        </button>
        <button class="brief-card" onclick="setTab('commercial')" ${tip("Review price, direct sales forecast, and buyer commitments.")}>
          <span>Commercial Pull</span>
          <strong>${state.demand}/130</strong>
          <em>${state.orders.length} buyer requests</em>
        </button>
        <button class="brief-card" onclick="setTab('cellar')" ${tip("View vintage lots aging in cellar, bottling readiness, and cellar archives.")}>
          <span>Cellar</span>
          <strong>${totalBulkWine(state)} CE aging</strong>
          <em>${state.inventory.cases} cases ready</em>
        </button>
        <button class="brief-card" onclick="setTab('people')" ${tip("Hire carefully. Staff bonuses are powerful, but payroll repeats every month.")}>
          <span>People</span>
          <strong>${state.staff.length}/5</strong>
          <em>Morale ${state.morale}</em>
        </button>
      </div>
    </section>
  `;
}

function managementLoadBreakdown(s) {
  const accepted = s.orders.filter(o => o.accepted).length;
  const unaccepted = s.orders.length - accepted;
  const debtLoad = s.debt > 0 ? Math.ceil(s.debt / 50000) : 0;
  const investorLoad = s.investor?.pressureMonths > 0 ? 3 : 0;
  const clubLoad = staffBonus(s, "clubIncome") > 0 ? 2 : 0;
  const buildingLoad = Math.round(Object.values(s.buildings || {}).reduce((sum, level) => sum + level, 0) * 0.8);
  const lines = [
    `Vineyard blocks: ${Math.round(s.rows.length * 1.5)}`,
    `Buildings: ${buildingLoad}`,
    `Accepted orders: ${Math.round(accepted * 2.2)}`,
    `Staff: ${Math.round(s.staff.length * 0.8)}`,
    unaccepted > 0 ? `Pending orders: ${Math.round(unaccepted * 0.6)}` : null,
    debtLoad > 0 ? `Debt: ${debtLoad}` : null,
    investorLoad > 0 ? `Investor pressure: ${investorLoad}` : null,
    clubLoad > 0 ? `Wine club: ${clubLoad}` : null,
  ].filter(Boolean);
  return lines.join(" · ");
}

function operationsPanel() {
  const load = managementLoad(state);
  const capacity = organizationCapacity(state);
  const pressure = Math.max(0, load - capacity);
  const capLines = [
    `Base: 9`,
    staffBonus(state, "finance") > 0 ? `Finance staff: +${staffBonus(state, "finance") * 3}` : null,
    staffBonus(state, "bottling") > 0 ? `Bottling staff: +${staffBonus(state, "bottling") * 2}` : null,
    staffBonus(state, "sales") > 0 ? `Sales staff: +${Math.round(staffBonus(state, "sales") * 1.5)}` : null,
    (state.buildings.lab || 0) > 0 ? `Lab: +${(state.buildings.lab || 0) * 2}` : null,
    (state.buildings.line || 0) > 0 ? `Bottling line: +${state.buildings.line || 0}` : null,
    state.marketMods?.winterPlan > 0 ? `Winter plan: +2` : null,
  ].filter(Boolean).join(" · ");
  return `
    <section class="panel operations-panel">
      <div class="panel-head">
        <h2>Operations Pressure ${helpIcon("Growth creates load: blocks, buildings, staff, debt, buyer contracts, club commitments, and investor pressure all need management capacity.")}</h2>
        <span class="small">${pressure > 0 ? `${pressure} over capacity` : "within capacity"}</span>
      </div>
      <div class="two-col">
        <div class="stat-box"><span>Management load</span><strong>${load}</strong><em>${managementLoadBreakdown(state)}</em></div>
        <div class="stat-box"><span>Org capacity</span><strong>${capacity}</strong><em>${capLines}</em></div>
        <div class="stat-box"><span>Fatigue</span><strong>${state.fatigue || 0}/100</strong><em>high fatigue reduces execution</em></div>
        <div class="stat-box"><span>Quality ceiling</span><strong>${qualityCeiling(state, state.currentVintageScore || 3)} pts</strong><em>site + people + infrastructure</em></div>
      </div>
      ${meter("Load pressure", Math.min(100, Math.round((load / Math.max(1, capacity)) * 60)), pressure ? "danger" : "gold")}
    </section>
  `;
}

function estateDashboard() {
  const blockDef = BUILDINGS.find(building => building.id === "block");
  const openParcels = Math.max(0, blockDef.max - (state.buildings.block || 0));
  const rowLines = state.rows.map(row => {
    const young = (row.matureMonth || 1) > state.month;
    ensureRowFields(row);
    const tone = young ? "muted" : row.disease > 60 ? "danger" : row.disease > 38 || row.health < 50 ? "warn" : "";
    const status = young
      ? `young · first harvest ${monthDateLabel(firstHarvestMonth(row.matureMonth))}`
      : `health ${row.health} · disease ${row.disease}`;
    return `<div class="dash-row ${tone}"><span>${escapeHtml(row.name)}</span><em>${status}</em></div>`;
  });
  if (openParcels > 0) {
    rowLines.push(`<div class="dash-row muted"><span>${openParcels} open parcel${openParcels > 1 ? "s" : ""}</span><em>build to expand</em></div>`);
  }

  const readyLots = readyVintages(state);
  const agingLots = (state.vintages || []).filter(v => v.bulkWine > 0 && v.agingMonths < v.agingTarget);

  return `
    <section class="panel estate-dash" aria-label="Estate status">
      <div class="dash-grid">
        <button class="dash-col" onclick="setTab('vineyard')" ${tip("View vineyard rows, weather, and disease pressure.")}>
          <div class="dash-col-head">Vineyard</div>
          ${rowLines.join("")}
          <div class="dash-row muted"><span>Season</span><em>${state.season} · ${state.lastWeather}</em></div>
        </button>
        <button class="dash-col" onclick="setTab('cellar')" ${tip("View vintage lots aging in cellar and cellar archives.")}>
          <div class="dash-col-head">Cellar</div>
          <div class="dash-row"><span>Grapes on hand</span><em>${totalGrapes(state)} CE</em></div>
          <div class="dash-row"><span>Bulk wine aging</span><em>${totalBulkWine(state)} CE${agingLots.length ? ` · ${agingLots.length} not ready` : ""}${readyLots.length ? ` · ${readyLots.length} ready` : ""}</em></div>
          <div class="dash-row"><span>Tanks</span><em>level ${state.buildings.tank}</em></div>
          <div class="dash-row"><span>Barrels</span><em>level ${state.buildings.barrel}</em></div>
          <div class="dash-row"><span>Bottling line</span><em>level ${state.buildings.line}</em></div>
          <div class="dash-row"><span>Weather lab</span><em>level ${state.buildings.lab}</em></div>
        </button>
        <button class="dash-col" onclick="setTab('commercial')" ${tip("Review pricing, buyer orders, and commercial analytics.")}>
          <div class="dash-col-head">Commercial</div>
          <div class="dash-row"><span>Cases ready</span><em>${state.inventory.cases}</em></div>
          <div class="dash-row"><span>Glass supply</span><em>${state.inventory.glass}</em></div>
          <div class="dash-row"><span>Tasting room</span><em>level ${state.buildings.room}</em></div>
          <div class="dash-row"><span>Open buyer orders</span><em>${state.orders.length}</em></div>
          <div class="dash-row"><span>Staff</span><em>${state.staff.length} hired · <a onclick="event.stopPropagation();setTab('people')" style="color:inherit;text-decoration:underline;cursor:pointer">manage</a></em></div>
          <div class="dash-row profile-row">
            <span>House Style</span>
            <div class="profile-meter-wrap">
              <div class="profile-meter-track" style="--profile-pct:${state.profile ?? 50}%">
                <div class="profile-meter-center"></div>
              </div>
              <em>${profileLabel(state.profile ?? 50)}</em>
            </div>
          </div>
        </button>
      </div>
    </section>
  `;
}

function analyticsPanel() {
  const forecast = commercialForecast(state);
  return `
    <section class="panel analytics-panel">
      <div class="panel-head">
        <h2>Revenue Desk ${helpIcon("Revenue bars show closed monthly revenue. Forecast uses current direct-sales demand, accepted near-term contracts, and monthly fixed costs.")}</h2>
        <span class="small">History updates when a month closes</span>
      </div>
      <div class="forecast-grid">
        <div class="stat-box"><span>Direct forecast</span><strong>${money(forecast.directRevenue)}</strong><em>${forecast.directCases} cases</em></div>
        <div class="stat-box"><span>Contract forecast</span><strong>${money(forecast.contractRevenue)}</strong><em>${forecast.contractCases} cases due soon</em></div>
        <div class="stat-box"><span>Fixed burn</span><strong>${money(forecast.fixedCost)}</strong><em>next close</em></div>
        <div class="stat-box"><span>Projected cash move</span><strong>${money(forecast.netCash)}</strong><em>before new actions</em></div>
      </div>
      ${pnlPanel(forecast)}
      <div class="chart-grid">
        ${barChart("Monthly Revenue", state.history, "revenue", "gold")}
        ${lineChart("Net Worth Trend", state.history, "netWorth", { format: money, tone: "blue", showLabels: true })}
      </div>
      ${metricTrends(state.history)}
    </section>
  `;
}

function pnlPanel(forecast) {
  const last = state.history[state.history.length - 1];
  const close = state.lastClose;
  const costs = forecast.costBreakdown;
  return `
    <div class="pnl-panel">
      <div class="pnl-block">
        <div class="pnl-title">Next Month P&L Forecast</div>
        ${pnlLine("Direct sales", forecast.directRevenue, true)}
        ${pnlLine("Accepted contracts", forecast.contractRevenue, true)}
        ${forecast.tourIncome ? pnlLine("Estate tour income", forecast.tourIncome, true) : ""}
        ${forecast.clubIncome ? pnlLine("Wine club dues", forecast.clubIncome, true) : ""}
        ${forecast.dtcIncome ? pnlLine("Online / DTC (Priya)", forecast.dtcIncome, true) : ""}
        ${forecast.auctionIncome ? pnlLine("Secondary market (auction resales)", forecast.auctionIncome, true) : ""}
        ${pnlLine("Operating / vineyard / cellar", -costs.operating)}
        ${costs.loadCost ? pnlLine("Management load friction", -costs.loadCost) : ""}
        ${pnlLine("Payroll", -costs.salaries)}
        ${pnlLine("Lease / rent", -costs.lease)}
        ${pnlLine(`Interest (${Math.round(debtRate(state) * 1000) / 10}% monthly)`, -costs.interest)}
        ${costs.insurance ? pnlLine("Crop insurance premium", -costs.insurance) : ""}
        ${forecast.harvestLabor ? pnlLine("Harvest labor", -forecast.harvestLabor) : ""}
        ${costs.investor ? pnlLine("Investor overhead", -costs.investor) : ""}
        ${pnlLine("Cost multipliers", -(costs.total - costs.subtotal))}
        <div class="pnl-note">Cost multipliers are regional labor/land cost, production style, difficulty, and staff efficiency applied to fixed burn.</div>
        <div class="pnl-line total"><span>Forecast cash movement</span><strong>${money(forecast.netCash)}</strong></div>
      </div>
      <div class="pnl-block">
        <div class="pnl-title">Last Closed Month</div>
        ${last && close ? (() => {
          const tourClub = (close.tourIncome || 0) + (close.clubIncome || 0);
          const dtcClosed = close.dtcIncome || 0;
          const auction = close.auctionIncome || 0;
          const closedPnl = last.revenue + tourClub + dtcClosed + auction - last.fixedCost;
          return `
          ${pnlLine("Sales revenue", last.revenue, true)}
          ${tourClub ? pnlLine("Tour & club income", tourClub, true) : ""}
          ${dtcClosed ? pnlLine("Online / DTC (Priya)", dtcClosed, true) : ""}
          ${auction ? pnlLine("Secondary market (auction resales)", auction, true) : ""}
          ${pnlLine("Total costs (payroll, ops, interest, lease)", -last.fixedCost)}
          ${last.interestCost ? pnlLineValue("  Interest included above", money(last.interestCost)) : ""}
          ${pnlLineValue("Cases sold", `${close.directCases} direct`)}
          ${pnlLineValue("Case inventory", `${close.startingCases} → ${close.endingCases}`)}
          <div class="pnl-line total"><span>Closed P&L</span><strong>${money(closedPnl)}</strong></div>
        `;
        })() : `<div class="empty">Close a month to see actual P&L.</div>`}
      </div>
    </div>
  `;
}

function pnlLine(label, value, positive = false) {
  const cls = positive || value >= 0 ? "pos" : "neg";
  return `<div class="pnl-line ${cls}"><span>${label}</span><strong>${money(value)}</strong></div>`;
}

function pnlLineValue(label, value) {
  return `<div class="pnl-line"><span>${label}</span><strong>${value}</strong></div>`;
}

function commercialForecast(s) {
  const direct = directSales(s);
  let available = s.inventory.cases;
  let contractRevenue = 0;
  let contractCases = 0;
  s.orders
    .filter(order => order.accepted && order.due <= s.month + 2)
    .sort((a, b) => a.due - b.due)
    .forEach(order => {
      if (available < order.cases) return;
      const premium = 1 + Math.max(0, s.quality - 55) / 260;
      const netPrice = order.netPrice ?? channelNetPrice(order, order.acceptedReleasePrice ?? s.price);
      contractRevenue += Math.round(order.cases * netPrice * 12 * premium);
      contractCases += order.cases;
      available -= order.cases;
    });
  const costBreakdown = fixedCostBreakdown(s);
  const fixedCost = costBreakdown.total;
  const harvestLabor = isHarvestMonth(s.month, s.region) ? harvestLaborEstimate(s) : 0;
  const { tourIncome, clubIncome, dtcIncome } = estimatePassiveStaffIncome(s);
  const auctMem = archiveMemory(s);
  const auctionIncome = (s.prestige >= 90 && auctMem.soldOutPrestige >= 1)
    ? Math.round(1200 * auctMem.soldOutPrestige * (1 + (s.prestige - 90) / 20)) : 0;
  return {
    directCases: direct.cases,
    directRevenue: direct.revenue,
    contractCases,
    contractRevenue,
    tourIncome,
    clubIncome,
    dtcIncome,
    auctionIncome,
    fixedCost,
    costBreakdown,
    harvestLabor,
    netCash: direct.revenue + contractRevenue + tourIncome + clubIncome + dtcIncome + auctionIncome - fixedCost - harvestLabor
  };
}

function barChart(title, history, key, tone) {
  const data = history && history.length ? history.slice(-12) : [];
  if (!data.length) return `<div class="chart-card"><strong>${title}</strong><div class="empty">Close a month to start the graph.</div></div>`;
  const max = Math.max(1, ...data.map(point => point[key]));
  return `
    <div class="chart-card">
      <div class="chart-head"><strong>${title}</strong><span>${money(max)} high</span></div>
      <div class="bar-chart ${tone}">
        ${data.map((point, index) => {
          const edgeClass = index === 0 ? " edge-start" : index === data.length - 1 ? " edge-end" : "";
          const label = `Month ${point.month}: ${money(point[key])}`;
          return `
          <div class="bar-wrap${edgeClass}" tabindex="0" data-chart-tip="${escapeHtml(label)}" aria-label="${escapeHtml(label)}">
            <span style="height: ${Math.max(3, Math.round((point[key] / max) * 100))}%;"></span>
            <em>${point.month}</em>
          </div>
        `;
        }).join("")}
      </div>
    </div>
  `;
}

function metricTrends(history) {
  const metrics = [
    { title: "Prestige", key: "prestige", tone: "wine", max: 120 },
    { title: "Demand", key: "demand", tone: "gold", max: 130 },
    { title: "Quality", key: "quality", tone: "leaf", max: 120 },
    { title: "Cash", key: "cash", tone: "blue", format: money },
    { title: "Cases", key: "cases", tone: "clay" }
  ];
  return `
    <div class="metric-grid">
      ${metrics.map(metric => sparkline(metric.title, history, metric.key, metric)).join("")}
    </div>
  `;
}

function lineChart(title, history, key, options = {}) {
  const data = history && history.length ? history.slice(-12) : [];
  if (!data.length) return `<div class="chart-card"><strong>${title}</strong><div class="empty">Close a month to start the graph.</div></div>`;
  const format = options.format || (v => Math.round(v));
  const labelFmt = options.labelFormat || (options.format === money ? shortMoney : v => Math.round(v));
  const values = data.map(point => point[key]);
  const min = Math.min(0, ...values);
  const max = Math.max(options.max || 1, ...values);
  const range = Math.max(1, max - min);
  const showLabels = !!options.showLabels;
  const xStart = showLabels ? 23 : 8;
  const xSpan = 96 - xStart;

  const px = (index) => data.length === 1 ? (xStart + 96) / 2 : xStart + (index / (data.length - 1)) * xSpan;
  const py = (val) => 88 - ((val - min) / range) * 76;

  const points = data.map((pt, i) => `${px(i).toFixed(1)},${py(pt[key]).toFixed(1)}`).join(" ");
  const circles = data.map((pt, i) =>
    `<circle cx="${px(i).toFixed(1)}" cy="${py(pt[key]).toFixed(1)}" r="2.2"><title>Month ${pt.month}: ${format(pt[key])}</title></circle>`
  ).join("");

  const gridLines = showLabels ? [
    { val: min,           y: py(min),           dash: false },
    { val: min + range/2, y: py(min + range/2), dash: true  },
    { val: max,           y: py(max),            dash: true  },
  ].map(({ val, y, dash }) => `
    <line x1="${xStart}" y1="${y.toFixed(1)}" x2="96" y2="${y.toFixed(1)}" ${dash ? 'stroke-dasharray="2,2"' : ''}></line>
    <text x="${xStart - 2}" y="${(y + 2.5).toFixed(1)}" text-anchor="end" class="chart-axis-label">${labelFmt(val)}</text>
  `).join("") : `<line x1="6" y1="88" x2="96" y2="88"></line>`;

  return `
    <div class="chart-card">
      <div class="chart-head"><strong>${title}</strong><span>${format(data[data.length - 1][key])}</span></div>
      <svg class="line-chart ${options.tone || "blue"}" viewBox="0 0 100 100" role="img" aria-label="${title}">
        ${gridLines}
        <polyline points="${points}"></polyline>
        ${circles}
      </svg>
    </div>
  `;
}

function sparkline(title, history, key, options = {}) {
  const data = history && history.length ? history.slice(-12) : [];
  if (!data.length) {
    return `<div class="metric-card"><span>${title}</span><strong>-</strong><div class="spark-empty"></div></div>`;
  }
  const format = options.format || (value => Math.round(value));
  const values = data.map(point => point[key]);
  const min = Math.min(0, ...values);
  const max = Math.max(options.max || 1, ...values);
  const range = Math.max(1, max - min);
  const points = data.map((point, index) => {
    const x = data.length === 1 ? 50 : 6 + (index / (data.length - 1)) * 88;
    const y = 34 - ((point[key] - min) / range) * 28;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const latest = data[data.length - 1][key];
  const first = data[0][key];
  const delta = latest - first;
  const deltaText = `${delta >= 0 ? "+" : ""}${options.format ? money(delta) : Math.round(delta)}`;
  return `
    <div class="metric-card ${options.tone || "blue"}">
      <div>
        <span>${title}</span>
        <strong>${format(latest)}</strong>
        <em>${deltaText} / 12 mo</em>
      </div>
      <svg class="sparkline" viewBox="0 0 100 40" role="img" aria-label="${title} trend">
        <polyline points="${points}"></polyline>
        ${data.map((point, index) => {
          const x = data.length === 1 ? 50 : 6 + (index / (data.length - 1)) * 88;
          const y = 34 - ((point[key] - min) / range) * 28;
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.8"><title>Month ${point.month}: ${format(point[key])}</title></circle>`;
        }).join("")}
      </svg>
    </div>
  `;
}

function artBanner(kind, label) {
  const map = {
    vineyard: "assets/vineyard.png",
    commercial: "assets/tasting-room.png",
    cellar: "assets/cellar.png"
  };
  return `
    <section class="scene-art ${kind}" style="background-image: linear-gradient(90deg, rgba(31,36,33,.58), rgba(31,36,33,.08)), url('${map[kind]}');">
      <strong>${label}</strong>
    </section>
  `;
}

function vineyardPanel() {
  const v = varietal();
  const optimalWater = v.optimalWater || 50;
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Vineyard ${helpIcon("Disease pressure hurts yield and quality at harvest. Water stress can concentrate reds but harms sensitive varietals. Work Vineyard and seasonal actions manage both.")}</h2>
        <span class="small">${state.season} • ${state.lastWeather} • ${state.lastTemp.low}–${state.lastTemp.high}°F</span>
      </div>
      <div class="vineyard">
        ${state.rows.map(row => {
          ensureRowFields(row);
          const nonBearing = (row.matureMonth || 1) > state.month;
          const diseaseTone = row.disease > 65 ? "danger" : row.disease > 40 ? "warn" : "ok";
          const waterDev = row.water - optimalWater;
          const waterTone = Math.abs(waterDev) > 25 ? (waterDev < -35 ? "danger" : "warn") : "ok";
          const waterLabel = waterDev < -30 ? "drought stress" : waterDev < -15 ? "mild deficit" : waterDev > 25 ? "excess water" : "balanced";
          const panelYear = START_YEAR + Math.floor((state.month - 1) / 12);
          const vineAge = panelYear - (row.plantedYear || START_YEAR - 8);
          const mat = !nonBearing ? vineMaturity(vineAge) : null;
          const matBadge = nonBearing
            ? `<em class="row-badge">non-bearing · first harvest ${monthDateLabel(firstHarvestMonth(row.matureMonth))}</em>`
            : mat.label === "old vine" ? `<em class="row-badge row-badge-oldvine">old vine · ${vineAge}y</em>`
            : mat.label === "mature"   ? `<em class="row-badge">mature · ${vineAge}y</em>`
            : mat.label === "young vine" ? `<em class="row-badge">young vine · ${vineAge}y</em>`
            : "";
          return `
            <div class="row-card">
              <div class="row-info">
                <div class="row-name ${inWrath(state) && state.wrathState.aceldamaBlock === row.id ? "row-name-aceldama" : ""}">${inWrath(state) && state.wrathState.aceldamaBlock === row.id ? "Block Aceldama" : row.name} ${matBadge}</div>
                <div class="row-pressure">${row.pressure || "normal"}</div>
              </div>
              <div class="row-meters">
                <div class="row-meter-group">
                  <span class="row-meter-label">Health</span>
                  <div class="row-meter-track"><div class="row-meter-fill health" style="width:${row.health}%"></div></div>
                  <span class="row-meter-val">${row.health}</span>
                </div>
                <div class="row-meter-group">
                  <span class="row-meter-label">Disease</span>
                  <div class="row-meter-track"><div class="row-meter-fill disease-${diseaseTone}" style="width:${row.disease}%"></div></div>
                  <span class="row-meter-val ${diseaseTone === "danger" ? "text-danger" : diseaseTone === "warn" ? "text-warn" : ""}">${row.disease}</span>
                </div>
                <div class="row-meter-group">
                  <span class="row-meter-label">Water</span>
                  <div class="row-meter-track water-track">
                    <div class="row-meter-fill water-${waterTone}" style="width:${row.water}%"></div>
                    <div class="water-optimal-marker" style="left:${optimalWater}%"></div>
                  </div>
                  <span class="row-meter-val ${waterTone === "danger" ? "text-danger" : waterTone === "warn" ? "text-warn" : ""}">${waterLabel}</span>
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
      <div class="vineyard-summary">
        <span>Avg disease <strong class="${averageDisease(state) > 55 ? "text-danger" : averageDisease(state) > 35 ? "text-warn" : ""}">${Math.round(averageDisease(state))}</strong></span>
        <span>Avg water <strong>${Math.round(averageWater(state))}</strong> (${v.name} optimal ~${optimalWater})</span>
        <span>Avg health <strong>${Math.round(state.rows.reduce((s, r) => s + r.health, 0) / state.rows.length)}</strong></span>
      </div>
    </section>
  `;
}

function actionInventoryNote(action, s) {
  if (action.id === "seasonal") {
    if (s.seasonalUsedMonth === s.month) return { text: "Already done this month", hard: true };
    const currentYear = START_YEAR + Math.floor((s.month - 1) / 12);
    if (s.season === "Veraison" && s.greenHarvestYear === currentYear) return { text: "Green harvest already done this year", hard: true };
  }
  if (action.id === "natural-cellar" && s.naturalCellarUsedMonth === s.month) {
    return { text: "Already done this month", hard: true };
  }
  if (action.id === "heroics" && s.heroicsUsedMonth === s.month) {
    return { text: "Already asked this month", hard: true };
  }
  if (action.id === "bottle") {
    const ready = readyVintages(s);
    if (!ready.length && totalBulkWine(s) === 0) return { text: "No bulk wine to bottle", hard: true };
    if (!ready.length) {
      const oldest = (s.vintages || []).filter(v => v.bulkWine > 0).sort((a, b) => a.agingMonths - b.agingMonths)[0];
      if (oldest) return { text: `${oldest.label} needs ${oldest.agingTarget - oldest.agingMonths}mo more aging`, hard: true };
    }
  }
  if (action.id === "cellar" && totalGrapes(s) === 0) return { text: "No grapes: cellar quality work only", hard: false };
  if (action.id === "sales" && availableCases(s) === 0) return { text: "No free cases: courts buyers only", hard: false };
  if (action.id === "hospitality" && availableCases(s) === 0) return { text: "No allocation: weak demand, club patience risk", hard: false };
  return null;
}

function measurementActionPanel() {
  const ws = state.wrathState;
  const step = ws.measurementStep || 0;
  const speakUsed = (ws.speakUsed || []).includes(step);
  const isLastStep = step >= 4;
  return `
    <section class="panel measurement-panel">
      <div class="panel-head">
        <h2>The Measurement</h2>
        <span class="small">Step ${step + 1} of 5</span>
      </div>
      <div class="measurement-bar">
        <div class="measurement-bar-fill" style="width:${((step + 1) / 5) * 100}%"></div>
      </div>
      <div class="actions">
        <button class="action-card" onclick="advanceMonth()" ${state.gameOver ? "disabled" : ""}>
          <b>${isLastStep ? "Accept the verdict" : "Behold"}</b>
          <span class="effect">Advance to the next step.</span>
          <em>No cost.</em>
        </button>
        ${!speakUsed && !isLastStep ? `
        <button class="action-card" onclick="useSpeakAction(${step})">
          <b>Speak</b>
          <span class="effect">Record a word for the estate's account. Used once per step.</span>
          <em>No cost.</em>
        </button>` : ""}
      </div>
      <div class="measurement-faith-cup">
        <span>Faith <strong style="color:var(--gold)">${ws.faith}</strong></span>
        <span>Cup <strong style="color:var(--wine)">${ws.cup}</strong></span>
      </div>
    </section>
  `;
}

function actionsPanel() {
  if (inWrath(state) && state.wrathState.mode === "measurement") {
    return measurementActionPanel();
  }
  ensureActionBudgets(state);
  const sorted = [...ACTIONS].filter(a => !a.hidden || !a.hidden(state)).sort((a, b) => Number(isActionAvailable(b, state)) - Number(isActionAvailable(a, state)));
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>${corruptChars(state, wrathLabel(state, "Monthly Actions", [[7, "What remains"], [4, "This month's obligations"]]))} ${helpIcon("Actions are owner attention and scarce operating focus. Staff, infrastructure, fatigue, and obligations determine how far those choices actually stretch.")}</h2>
        <span class="small">${state.actionsLeft} owner attention left</span>
      </div>
      <div class="capacity-strip">
        ${Object.entries(state.capacityLeft || {}).map(([key, value]) => `<span>${capacityLabel(key)} <strong>${value}</strong></span>`).join("")}
      </div>
      <div class="actions">
        ${sorted.map(action => {
          const cost = actionCost(action, state);
          const available = isActionAvailable(action, state);
          const invNote = actionInventoryNote(action, state);
          const capKey = actionCapacityKey(action, state);
          const spendLabel = capKey && (state.capacityLeft?.[capKey] || 0) > 0
            ? `${capacityLabel(capKey)} capacity`
            : capKey ? "Owner fallback" : "Owner attention";
          const disabled = action.navigateTab
            ? state.event || state.gameOver
            : !available || !canSpendForAction(action, state) || state.cash < cost || state.event || state.gameOver || (invNote && invNote.hard);
          const effectText = invNote
            ? invNote.text
            : available ? actionConsequence(action, state) : `Off-season: available ${seasonListLabel(action.seasons)}`;
          const effectClass = invNote ? "effect effect-note" : "effect";
          return `
            <button class="action-card ${available ? "" : "offseason"}" onclick="useAction('${action.id}')" ${disabled ? "disabled" : ""}>
              <b>${corruptChars(state, actionName(action, state))}</b>
              <span class="${effectClass}">${effectText}</span>
              <em>${action.navigateTab ? `Open ${TABS.find(t => t.id === action.navigateTab)?.name || "Estate"}` : `${money(cost)} · ${spendLabel}`}</em>
            </button>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function marketPanel() {
  const forecast = directSales(state);
  const worth = netWorth(state);
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Market and Cellar ${helpIcon("Release price affects direct sales and whether trade buyers can place the wine. Buyer contracts pay channel-specific net prices.")}</h2>
        <span class="small">Net worth ${money(worth)}</span>
      </div>
      <div class="market-line">
        <label>
          <span class="small">Release price per bottle <span class="price-anchor-note">anchored ${money(state.monthStartPrice ?? state.price)} · ±${money(PRICE_SWING_CAP)} this month · ceiling ${money(profilePriceCeil(state))}${(() => { const r = state.price / profilePriceCeil(state); return r >= 0.95 ? " · <strong class='text-danger'>demand ~0</strong>" : r >= 0.90 ? " · <span class='text-warn'>demand very low</span>" : r >= 0.75 ? " · demand thinning" : ""; })()}</span></span>
          <input type="range"
            min="${Math.max(14, (state.monthStartPrice ?? state.price) - PRICE_SWING_CAP)}"
            max="${Math.min(profilePriceCeil(state), (state.monthStartPrice ?? state.price) + PRICE_SWING_CAP)}"
            value="${state.price}" oninput="setPrice(this.value)">
        </label>
        <strong>${money(state.price)}</strong>
      </div>
      <div class="two-col" style="margin-top: 10px;">
        <div class="stat-box"><span>Forecast direct sales</span><strong>${forecast.cases} cases</strong></div>
        <div class="stat-box"><span>Forecast revenue</span><strong>${money(forecast.revenue)}</strong></div>
        <div class="stat-box"><span>Grape CE</span><strong>${totalGrapes(state)}</strong></div>
        <div class="stat-box"><span>Bulk CE</span><strong>${totalBulkWine(state)}</strong></div>
        <div class="stat-box"><span>Glass</span><strong>${state.inventory.glass}</strong></div>
        <div class="stat-box"><span>Debt</span><strong>${money(state.debt)}</strong></div>
      </div>
      ${flowPanel()}
      <div class="insurance-row">
        <label class="insurance-label">
          <input type="checkbox" ${state.insurance?.crop ? "checked" : ""} onchange="toggleInsurance('crop')">
          <span>Crop insurance</span>
        </label>
        <span class="small muted">${state.insurance?.crop ? "Active · $750/mo premium · frost &amp; mildew costs −80%" : "Inactive · $750/mo covers frost &amp; mildew damage costs"}</span>
      </div>
      ${debtPanel()}
      ${meter("Market heat", state.marketHeat, "gold")}
      ${meter("Sustainability", state.sustainability, "wine")}
      ${meter("Vineyard pressure", Math.round(averageThreat(state) * 11), "danger")}
    </section>
  `;
}

function channelPanel() {
  ensureChannels(state);
  const rows = Object.entries(CHANNELS).map(([key, def]) => {
    const demand = state.channelDemand[key] || 0;
    const trust = state.channelTrust[key] || 0;
    const tone = trust < 40 ? "danger" : trust < 55 ? "warn" : "";
    return `
      <div class="channel-row ${tone}">
        <div>
          <strong>${def.label}</strong>
          <span>${channelSummary(key)}</span>
        </div>
        <div class="channel-bars">
          <label><span>Demand</span><meter min="0" max="130" value="${demand}"></meter><em>${demand}</em></label>
          <label><span>Trust</span><meter min="0" max="100" value="${trust}"></meter><em>${trust}</em></label>
        </div>
      </div>
    `;
  }).join("");
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Channel Demand ${helpIcon("Each channel has separate demand and trust. Hospitality mostly builds cellar-door and club demand; trade work builds restaurants, distribution, export, and collector access.")}</h2>
        <span class="small">Headline demand ${state.demand}/130</span>
      </div>
      <div class="channel-grid">${rows}</div>
    </section>
  `;
}

function channelSummary(key) {
  const copy = {
    cellarDoor: "tourism, tasting room, walk-ins",
    club: "recurring members and allocations",
    restaurant: "prestige placements and consistency",
    distributor: "volume, reliability, lower margins",
    export: "broker reach and regional fit",
    collector: "scarcity, scores, allocation pressure",
    mass: "large volume, price sensitive",
    dtc: "Priya's online audience · passive monthly income"
  };
  return copy[key] || "";
}

function flowPanel() {
  const forecast = harvestForecast(state);
  const fermentCap = 220 + state.buildings.tank * 120 + staffBonus(state, "cellar") * 70;
  const bottleCap = Math.floor((280 + state.buildings.line * 170 + staffBonus(state, "bottling") * 95) * (state.marketMods.glassShortage ? 0.72 : 1));
  return `
    <div class="flow-panel">
      <div class="flow-step">
        <span>Next Harvest</span>
        <strong>${(state.buildings.lab || 0) >= 3 ? `${forecast.grapes} CE` : `${forecast.low}–${forecast.high} CE`}</strong>
        <em>${forecast.monthLabel} • ${forecast.matureRows} mature blocks${(state.buildings.lab || 0) >= 3 ? " · exact forecast" : ""}</em>
      </div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">
        <span>Ferment</span>
        <strong>${fermentCap}/action</strong>
        <em>${totalGrapes(state)} grapes held</em>
      </div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">
        <span>Bottle</span>
        <strong>${bottleCap}/action</strong>
        <em>${totalBulkWine(state)} bulk • ${state.inventory.glass} glass</em>
      </div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">
        <span>Sell</span>
        <strong>${availableCases(state)} free</strong>
        <em>${reservedCases(state)} reserved · ${state.inventory.stash || 0} stashed</em>
        <div class="stash-control">
          <button class="micro" onclick="setStash(Math.max(0,(state.inventory.stash||0)-10))" ${(state.inventory.stash || 0) <= 0 ? "disabled" : ""}>−10</button>
          <span>${state.inventory.stash || 0}</span>
          <button class="micro" onclick="setStash((state.inventory.stash||0)+10)" ${availableCases(state) < 10 ? "disabled" : ""}>+10</button>
        </div>
      </div>
    </div>
  `;
}

function grapePurchasePrice(s) {
  const v = varietal();
  const r = region();
  return Math.round(180 * (v.quality || 1) * (r.costMod || 1) * (v.difficulty || 1) * 0.85);
}

function earlyRelease(lotId) {
  if (!state || state.event || state.gameOver) return;
  const lot = (state.vintages || []).find(v => v.id === lotId);
  if (!lot || lot.bulkWine <= 0 || lot.agingMonths >= lot.agingTarget) return;
  const remaining = lot.agingTarget - lot.agingMonths;
  const ratio = remaining / lot.agingTarget;
  if (ratio > 0.75) {
    log(state, `${lot.label} is too young — wait until at least 25% of aging is complete before forcing a release.`);
    render(); return;
  }
  // Penalty: -2 score if more than a third of aging skipped, -1 if in the home stretch
  const penalty = ratio > 0.33 ? 2 : 1;
  lot.score = Math.max(1, (lot.score || 3) - penalty);
  lot.agingMonths = lot.agingTarget;
  lot.earlyReleased = true;
  state.earlyReleased = true;
  log(state, `Early release: ${lot.label} cut ${remaining} months short. Vintage score −${penalty} (harsh tannins, unintegrated structure).`);
  normalizeState(state);
  render();
}

function bulkNegociantPrice(lot, releasePrice) {
  const base = Math.round(releasePrice * 12 * 0.55);
  // Score: 1★ → 0.84×, 3★ → 1.00×, 5★ → 1.16×
  const scoreMod = 0.76 + (lot.score || 3) * 0.08;
  // Age: up to +15% for fully aged wine
  const ageMod = 1 + Math.min((lot.agingMonths || 0) / 18, 0.15);
  // Volume: négociants discount large lots; premium for rare small ones
  const ce = lot.bulkWine || 0;
  const volumeMod = ce <= 60 ? 1.08 : ce <= 200 ? 1.00 : 1 - Math.min((ce - 200) / 1200, 0.12);
  return Math.round(base * scoreMod * ageMod * volumeMod);
}

function sellBulk(lotId) {
  if (!state || state.gameOver) return;
  const lot = (state.vintages || []).find(v => v.id === lotId);
  if (!lot || lot.bulkWine <= 0) return;
  const ce = lot.bulkWine;
  const pricePerCe = bulkNegociantPrice(lot, state.price);
  const revenue = ce * pricePerCe;
  lot.bulkWine = 0;
  state.cash += revenue;
  state.totalRevenue += revenue;
  log(state, `Sold all ${ce} CE from ${lot.label} to a négociant at ${money(pricePerCe)}/CE — ${money(revenue)} total.`);
  normalizeState(state);
  render();
}

function buyGrapes() {
  ensureActionBudgets(state);
  if (!state || state.actionsLeft <= 0 || state.event || state.gameOver) return;
  const lotSize = 200;
  const costPer = grapePurchasePrice(state);
  const total = lotSize * costPer;
  if (state.cash < total) { log(state, `Insufficient cash to buy ${lotSize} CE of grapes (${money(total)} required).`); render(); return; }
  const year = START_YEAR + Math.floor((state.month - 1) / 12);
  const v = varietal();
  const existing = state.vintages.find(vt => vt.year === year && vt.purchased);
  if (existing) {
    existing.grapes += lotSize;
  } else {
    state.vintages.push({ id: `bought-${state.month}`, year, score: 3, label: `${year} ${v.name} (Purchased)`, grapes: lotSize, bulkWine: 0, agingMonths: 0, agingTarget: 0, bottled: 0, purchased: true });
  }
  state.cash -= total;
  state.actionsLeft -= 1;
  state.profile = clamp((state.profile ?? 50) - 4, 0, 100);
  state.boughtGrapes = true;
  log(state, `Purchased ${lotSize} CE of ${v.name} grapes for ${money(total)}. Procurement used owner attention.`);
  normalizeState(state);
  render();
}

function vintageCellarPanel() {
  const lots = (state.vintages || []).filter(v => v.grapes > 0 || v.bulkWine > 0);
  const gpPrice = grapePurchasePrice(state);
  const maxTarget = Math.max(1, ...lots.map(v => v.agingTarget || 0), agingTarget(state));

  const lotRows = lots.map(lot => {
    const hasGrapes = lot.grapes > 0;
    const hasBulk = lot.bulkWine > 0;
    const target = lot.agingTarget || 0;
    const aged = Math.min(lot.agingMonths || 0, target);
    const isReady = hasBulk && lot.agingMonths >= target && target > 0;
    const isPreagedStock = hasBulk && target === 0;
    const monthsLeft = target > 0 ? Math.max(0, target - (lot.agingMonths || 0)) : 0;

    let barHtml = "";
    if (isPreagedStock) {
      barHtml = `<div class="gantt-bar gantt-ready" style="width:100%" title="Opening stock — ready to bottle"></div>`;
    } else if (hasGrapes && !hasBulk) {
      barHtml = `<div class="gantt-bar gantt-grapes" style="width:${Math.round((1 / (maxTarget + 1)) * 100)}%" title="Grapes awaiting fermentation"></div>`;
    } else if (hasBulk && target > 0) {
      const agedPct = Math.round((aged / maxTarget) * 100);
      const remainPct = Math.round((monthsLeft / maxTarget) * 100);
      barHtml = `
        <div class="gantt-bar gantt-aged" style="width:${agedPct}%" title="${aged} months aged"></div>
        ${!isReady ? `<div class="gantt-bar gantt-remain" style="width:${remainPct}%" title="${monthsLeft} months remaining"></div>` : ""}
      `;
    }

    const bottled = lot.bottled || 0;
    const risk = typeof lot.flawRisk === "number" ? lot.flawRisk : baseLotFlawRisk(state, lot);
    const riskTone = risk >= 55 ? "text-danger" : risk >= 32 ? "text-warn" : "";
    const statusText = isPreagedStock
      ? `${lot.bulkWine} CE ready${bottled ? `<br>${bottled} bottled` : ""}`
      : hasGrapes && !hasBulk
      ? `${lot.grapes} CE · ferment first`
      : isReady
      ? `${lot.bulkWine} CE ready${bottled ? `<br>${bottled} bottled` : ""}`
      : hasBulk
      ? `${lot.bulkWine} CE · ${monthsLeft}mo left (${aged}/${target})`
      : "";

    const bulkPricePerCe = bulkNegociantPrice(lot, state.price);
    const bulkTotal = bulkPricePerCe * lot.bulkWine;
    const agedRatio = target > 0 ? (lot.agingMonths || 0) / target : 1;
    const canEarlyRelease = hasBulk && !isReady && !isPreagedStock && target > 0 && agedRatio >= 0.25;
    const earlyPenalty = canEarlyRelease ? ((1 - agedRatio) > 0.33 ? 2 : 1) : 0;
    return `
      <div class="gantt-row">
        <div class="gantt-meta">
          <span class="gantt-label">${escapeHtml(lot.label)}${lot.earlyReleased ? ' <em class="early-badge">early</em>' : ""}</span>
          <span class="gantt-score">${vintageScoreStars(lot.score)}${lot.criticScore ? ` <span class="critic-score">${lot.criticScore}pts</span>` : ""} <span class="${riskTone}">risk ${risk}%</span></span>
        </div>
        <div class="gantt-track">
          ${barHtml}
        </div>
        <div class="gantt-status ${isReady || isPreagedStock ? "ready" : ""}">${statusText}</div>
        ${hasBulk ? `<div class="lot-actions">
          <button class="ghost compact bulk-sell-btn" onclick="sellBulk('${lot.id}')" title="Sell all ${lot.bulkWine} CE at ${money(bulkPricePerCe)}/CE · price factors: score (${lot.score}★), ${lot.agingMonths || 0}mo aging, lot size">Sell all · ${lot.bulkWine} CE · ${money(bulkTotal)}</button>
          ${canEarlyRelease ? `<button class="ghost compact early-release-btn" onclick="earlyRelease('${lot.id}')" title="Force bottling now — vintage score −${earlyPenalty} for cutting ${monthsLeft} months short">Early release −${earlyPenalty}★</button>` : ""}
        </div>` : ""}
      </div>
    `;
  });

  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Vintage Cellar ${helpIcon("Each harvest creates a lot. Cellar work ferments grapes to bulk wine; aging time must pass before bottling is allowed.")}</h2>
        <span class="small">${vintageScoreLabel(state.currentVintageScore)} vintage on shelves ${vintageScoreStars(state.currentVintageScore)} • score ceiling ${qualityCeiling(state, state.currentVintageScore || 3)} pts</span>
      </div>
      ${lots.length ? `
        <div class="gantt-legend">
          <span class="gantt-swatch gantt-grapes"></span>Grapes
          <span class="gantt-swatch gantt-aged"></span>Aged
          <span class="gantt-swatch gantt-remain"></span>Remaining
          <span class="gantt-swatch gantt-ready"></span>Ready
        </div>
        <div class="gantt-list">${lotRows.join("")}</div>
      ` : `<p class="small muted">No active lots. Harvest or purchase grapes to begin.</p>`}
      <div class="vintage-buy-row">
        <span class="small">Buy 200 CE ${varietal().name}: <strong>${money(gpPrice * 200)}</strong></span>
        ${(() => {
          const why = state.event ? "resolve the current event first"
            : state.actionsLeft <= 0 ? "no owner attention left this month"
            : state.cash < gpPrice * 200 ? `need ${money(gpPrice * 200)} (have ${money(state.cash)})`
            : null;
          return `<button onclick="buyGrapes()" ${why || state.gameOver ? "disabled" : ""} ${why ? `title="${why}"` : ""}>${why ? `Buy grapes — ${why}` : "Buy grapes"}</button>`;
        })()}
      </div>
    </section>
  `;
}

function archivePanel() {
  ensureArchive(state);
  const memory = archiveMemory(state);
  const rows = state.archive
    .filter(entry => entry.casesProduced > 0)
    .map(entry => {
      const soldOut = entry.casesSold >= entry.casesProduced;
      const accolades = entry.accolades.length ? entry.accolades.join(", ") : "None yet";
      return `
        <div class="archive-card ${soldOut ? "sold-out" : ""}">
          <div class="archive-head">
            <div>
              <strong>${escapeHtml(entry.label)}</strong>
              <span>${entry.year} • ${escapeHtml(entry.grape)} • ${escapeHtml(entry.region)}</span>
            </div>
            <span class="tag">${entry.score || "-"} pts</span>
          </div>
          <p>${escapeHtml(entry.summary || tastingNote(state, entry))}</p>
          <div class="archive-stats">
            <span>Produced <strong>${entry.casesProduced}</strong></span>
            <span>Sold <strong>${entry.casesSold}</strong></span>
            <span>Avg price <strong>${entry.avgPrice ? money(entry.avgPrice) : "-"}</strong></span>
            <span>${soldOut ? `Sold out ${monthDateLabel(entry.soldOutMonth)}` : `${entry.casesProduced - entry.casesSold} cases unsold`}</span>
          </div>
          <div class="small">Accolades: ${escapeHtml(accolades)}</div>
        </div>
      `;
    }).join("");
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Vintage Archive ${helpIcon("Bottled wines stay in the estate memory. Strong vintages raise future expectations; disappointing follow-ups can pressure trust and prestige.")}</h2>
        <span class="small">Best ${memory.bestScore || "-"} pts • avg ${memory.avgScore ? Math.round(memory.avgScore) : "-"}</span>
      </div>
      ${rows ? `<div class="archive-grid">${rows}</div>` : `<div class="empty">Bottle a vintage to begin the estate archive.</div>`}
    </section>
  `;
}

function harvestForecast(s) {
  const monthsUntilHarvest = Array.from({ length: 12 }, (_, i) => i).find(offset => isHarvestMonth(s.month + offset, s.region)) || 0;
  const harvestMonth = s.month + monthsUntilHarvest;
  const matureAtHarvest = s.rows.filter(row => (row.matureMonth || 1) <= harvestMonth);
  const health = matureAtHarvest.length
    ? matureAtHarvest.reduce((sum, row) => sum + row.health - (row.disease || 0) * 0.45, 0) / matureAtHarvest.length
    : 0;
  const base = matureAtHarvest.length * 260;
  const midpoint = Math.max(0, Math.round(base * (health / 82) * varietal().yield * philosophy().yield * (region().yieldMod || 1)));
  const uncertainty = Math.round(midpoint * (0.18 + averageThreat(s) * 0.025 + (s.buildings.lab ? -0.03 * s.buildings.lab : 0)));
  const low = Math.max(0, midpoint - uncertainty);
  const high = Math.max(low, midpoint + uncertainty);
  const index = START_MONTH_INDEX + s.month + monthsUntilHarvest - 1;
  const label = `${MONTH_NAMES[index % 12]} ${START_YEAR + Math.floor(index / 12)}`;
  return { grapes: midpoint, low, high, matureRows: matureAtHarvest.length, monthLabel: label };
}

function harvestLaborEstimate(s) {
  const productive = productiveRows(s);
  const laborRate = s.marketMods.harvestCrew ? 3600 : 2800;
  return Math.round(productive.length * laborRate * region().costMod * difficulty().costMod * staffCostMod(s));
}

function debtPanel() {
  const costs = fixedCostBreakdown(state);
  return `
    <div class="debt-panel">
      <div>
        <span class="small">Credit line ${money(state.debt)} / ${money(state.creditLine)} • interest ${Math.round(debtRate(state) * 1000) / 10}% monthly (${money(costs.interest)}/mo) • lease ${money(state.leaseCost)}/mo</span>
      </div>
      <div class="debt-actions">
        <button onclick="drawDebt(25000)" ${availableCredit(state) <= 0 ? "disabled" : ""}>Draw ${money(25000)}</button>
        <button onclick="drawDebt(75000)" ${availableCredit(state) < 75000 ? "disabled" : ""}>Draw ${money(75000)}</button>
        <button onclick="repayDebt(25000)" ${state.cash < 40000 || state.debt <= 0 ? "disabled" : ""}>Repay ${money(25000)}</button>
      </div>
    </div>
  `;
}

const PRICE_SWING_CAP = 6;

function setPrice(value) {
  const anchor = state.monthStartPrice ?? state.price;
  const lo = Math.max(14, anchor - PRICE_SWING_CAP);
  const hi = Math.min(profilePriceCeil(state), anchor + PRICE_SWING_CAP);
  state.price = clamp(Number(value), lo, hi);
  render();
}

function meter(label, value, tone) {
  return `
    <div style="margin-top: 10px;">
      <div class="small">${label} ${clamp(value, 0, 100)}/100</div>
      <div class="meter ${tone}"><span style="width: ${clamp(value, 0, 100)}%;"></span></div>
    </div>
  `;
}

function ordersPanel() {
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Buyer Queue ${helpIcon("Accepting a buyer reserves cases at a channel-specific net price. Fulfill before the due month to gain cash, demand, and prestige.")}</h2>
        <span class="small">${state.fulfilled} fulfilled • ${state.missed} missed</span>
      </div>
      <div class="orders">
        ${state.orders.length ? state.orders.map(orderView).join("") : `<div class="empty">No active buyer requests. Sales actions and events can create new demand.</div>`}
      </div>
    </section>
  `;
}

function orderView(order) {
  const retailCeiling = orderRetailCeiling(order);
  const channel = order.channel || ORDER_CHANNEL[order.type] || "distributor";
  const multiplier = channelNetMultiplier(channel);
  const netPrice = order.accepted
    ? order.netPrice ?? channelNetPrice(order, order.acceptedReleasePrice ?? state.price)
    : channelNetPrice(order, Math.min(state.price, retailCeiling));
  const aboveCeiling = !order.accepted && state.price > retailCeiling;
  const status = order.accepted
    ? `net ${money(netPrice)}/btl • penalty ${money(order.penalty)}`
    : aboveCeiling
      ? `release price ${money(state.price)} exceeds channel ceiling`
      : `net offer ${money(netPrice)}/btl • delivery due ${monthDateLabel(order.due)}`;
  return `
    <div class="order">
      <div class="order-head">
        <strong>${order.buyer}</strong>
        <span class="tag">${order.accepted ? `Due ${monthDateLabel(order.due)}` : `Offer expires ${monthDateLabel(order.expires)}`}</span>
      </div>
      <p>${order.cases} cases • release ceiling ${money(retailCeiling)}/btl • ${Math.round(multiplier * 100)}% channel net • ${status}</p>
      <div class="order-actions">
        ${order.accepted
          ? `<button onclick="fulfillOrder('${order.id}')" ${state.inventory.cases < order.cases ? "disabled" : ""}>Fulfill</button>`
          : `<button onclick="acceptOrder('${order.id}')" ${aboveCeiling ? "disabled" : ""}>${aboveCeiling ? "Above channel ceiling" : "Accept net offer"}</button>`}
        <button class="ghost" onclick="rejectOrder('${order.id}')">${order.accepted ? "Cancel" : "Pass"}</button>
      </div>
    </div>
  `;
}

function buildingsPanel() {
  const blocked = state.actionsLeft <= 0 || !!state.event || state.gameOver;
  const equity = buildingEquity(state);
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Capital Investments ${helpIcon("Each tier is a named upgrade — buy with cash or finance with debt. Sell the most recent tier to recover 55% of cost.")}</h2>
        <span class="small">Asset value ${money(equity)}</span>
      </div>
      <div class="capex-grid">
        ${Object.entries(CAPEX_TIERS).map(([id, cat]) => {
          const owned = state.buildings[id] || 0;
          const max = cat.tiers.length;
          return `
            <div class="capex-cat">
              <div class="capex-cat-head">
                <strong>${cat.label}</strong>
                <span class="small muted">${owned}/${max} tiers</span>
              </div>
              <div class="capex-track">
                ${cat.tiers.map((tier, i) => {
                  const isPast    = i < owned - 1;
                  const isCurrent = i === owned - 1;
                  const isNext    = i === owned && owned < max;
                  const isFuture  = i > owned;
                  const cost      = capexCost(id, i);
                  const canBuy    = !blocked && state.cash >= cost;
                  const canFin    = !blocked && availableCredit(state) >= cost;
                  let cls = "capex-tier";
                  if (isPast)    cls += " capex-past";
                  if (isCurrent) cls += " capex-current";
                  if (isNext)    cls += " capex-next";
                  if (isFuture)  cls += " capex-locked";
                  return `
                    <div class="${cls}">
                      <div class="capex-tier-head">
                        ${isPast || isCurrent ? `<span class="capex-check">✓</span>` : `<span class="capex-num">${i + 1}</span>`}
                        <strong>${tier.name}</strong>
                      </div>
                      <div class="capex-tags">
                        ${tier.tags.map(t => `<span class="tag">${t}</span>`).join("")}
                      </div>
                      <p>${tier.text}</p>
                      <div class="capex-cost">${money(cost)}</div>
                      ${isCurrent ? `
                        <div class="capex-actions">
                          <button class="ghost" onclick="sellBuilding('${id}')" ${!!state.event || state.gameOver ? "disabled" : ""}>Sell ${money(Math.round(tier.cost * 0.55))}</button>
                        </div>` : ""}
                      ${isNext ? `
                        <div class="capex-actions">
                          <button onclick="buyBuilding('${id}')" ${!canBuy ? "disabled" : ""} title="${!blocked && state.cash < cost ? "Not enough cash" : ""}">Buy</button>
                          <button class="ghost" onclick="financeBuild('${id}')" ${!canFin ? "disabled" : ""} title="${!blocked && availableCredit(state) < cost ? "Credit limit reached" : ""}">Finance</button>
                        </div>` : ""}
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function staffPanel() {
  const employed = state.staff.map(id => STAFF_POOL.find(p => p.id === id));
  const market = state.staffMarket.map(id => STAFF_POOL.find(p => p.id === id)).filter(Boolean);
  const { items: moraleItems, net: moraleNet } = moraleBreakdownItems(state);
  const netSign = moraleNet >= 0 ? "+" : "";
  const netColor = moraleNet > 0 ? "var(--ok)" : moraleNet < 0 ? "var(--danger)" : "var(--muted)";
  const moraleColor = state.morale < 20 ? "var(--danger)" : state.morale < 40 ? "var(--gold)" : "var(--ink)";
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Personnel ${helpIcon("Named staff add strong bonuses and quirks. Salaries are paid every month.")}</h2>
        <span class="small">Payroll ${money(state.staff.reduce((sum, id) => sum + (STAFF_POOL.find(p => p.id === id)?.salary || 0), 0))}/mo</span>
      </div>
      <div class="morale-breakdown">
        <div class="morale-breakdown-head">
          <span>Morale</span>
          <strong style="color:${moraleColor}">${state.morale}/100</strong>
          <em style="color:${netColor}">${netSign}${moraleNet} per month</em>
        </div>
        <div class="morale-breakdown-list">
          ${moraleItems.map(item => `
            <div class="morale-breakdown-row">
              <span>${escapeHtml(item.label)}</span>
              <strong style="color:${item.delta > 0 ? "var(--ok)" : item.delta < 0 ? "var(--danger)" : "var(--muted)"}">${item.delta > 0 ? "+" : ""}${item.delta}</strong>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="staff-list">
        ${employed.length ? employed.map(person => staffView(person, true)).join("") : `<div class="empty">No senior staff yet. Hire people to bend the estate toward your strategy.</div>`}
      </div>
      <div class="section-title" style="margin-top: 12px;">Available</div>
      <div class="staff-list">
        ${market.map(person => staffView(person, false)).join("")}
      </div>
    </section>
  `;
}

function staffView(person, employed) {
  ensureActionBudgets(state);
  const signing = Math.round(person.salary * 1.4);
  const progress = employed ? ensureStaffProgress(state, person.id) : null;
  const blocked = state.actionsLeft <= 0 || state.event || state.gameOver;
  const isHidden = !!person.hidden;
  const isVintner = person.id === "vintner";
  const isPriest = person.id === "priest";
  const vintnerLocked = isVintner && inWrath(state) && state.wrathState.seal >= 4;
  const nameClass = isHidden ? "staff-name-hidden" : "";
  return `
    <div class="staff ${isHidden ? "staff-hidden" : ""}">
      <div class="staff-head">
        <div class="staff-id">
          ${(!isHidden || person.portrait) ? `
          <div class="portrait-hover-wrap">
            <img src="assets/${person.portrait || person.id}.png" alt="${person.name}" onerror="this.style.display='none'">
            ${(() => { const bio = STAFF_BIOS[person.id] || {}; const portrait = person.portrait || person.id; return `
            <div class="portrait-popup">
              <img class="portrait-popup-img" src="assets/${portrait}.png" alt="${person.name}" onerror="this.style.display='none'">
              <div class="portrait-popup-info">
                <strong class="portrait-name">${person.name}</strong>
                <span class="portrait-role">${person.role}</span>
                ${bio.hometown ? `<span class="portrait-hometown">${bio.hometown}</span>` : ""}
                ${bio.bio ? `<p class="portrait-bio">${bio.bio}</p>` : ""}
              </div>
            </div>`; })()}
          </div>` : ""}
          <strong class="${nameClass}">${person.name}</strong>
        </div>
        <span class="tag">${person.role}</span>
      </div>
      <p>${person.text}</p>
      <p class="staff-agenda">${STAFF_AGENDAS[person.id] || "Wants the estate to match their discipline."}</p>
      <div class="staff-traits">
        ${person.traits.map(trait => `<span class="tag">${trait}</span>`).join("")}
        ${STAFF_CAPACITY_KEY[person.id] ? `<span class="tag tag-capacity">+1 ${STAFF_CAPACITY_KEY[person.id]} action/mo</span>` : ""}
        ${person.salary > 0 ? `<span class="tag">${money(effectiveSalary(state, person))}/mo</span>` : `<span class="tag">No salary</span>`}
      </div>
      ${(() => {
        if (isHidden) return "";
        const pTraits = getStaffTraits(state, person.id);
        if (!pTraits.length) return "";
        return `<div class="personality-traits">${pTraits.map(t =>
          `<span class="tag ${t.positive ? "trait-virtue" : "trait-vice"}" data-tip="${escapeHtml(t.flavor)}" aria-label="${escapeHtml(t.flavor)}">${t.name} — ${t.summary}</span>`
        ).join("")}</div>`;
      })()}
      <div class="staff-actions">
        ${employed
          ? (isPriest ? "" : `<button class="ghost" onclick="fireStaff('${person.id}')" ${blocked || vintnerLocked ? "disabled" : ""}>${vintnerLocked ? "Cannot release" : "Release · owner attention"}</button>`)
          : `<button onclick="hireStaff('${person.id}')" ${blocked || state.cash < signing || state.staff.length >= 5 ? "disabled" : ""}>Hire ${signing > 0 ? money(signing) + " · owner attention" : "· owner attention"}</button>`}
      </div>
      ${employed && !isHidden ? advancementTree(person, progress) : ""}
    </div>
  `;
}

function advancementTree(person, progress) {
  const perks = STAFF_ADVANCEMENTS[person.id] || [];
  return `
    <div class="advancement">
      <div class="advancement-head">
        <strong>Advancement</strong>
        <span class="tag">${progress.xp} XP</span>
      </div>
      <div class="perk-tree">
        ${perks.map(perk => perkCard(person.id, perk, progress)).join("")}
      </div>
    </div>
  `;
}

function perkCard(staffId, perk, progress) {
  const unlocked = progress.perks.includes(perk.id);
  const blocked = perk.requires && !progress.perks.includes(perk.requires);
  const affordable = progress.xp >= perk.cost;
  const status = unlocked ? "unlocked" : blocked ? "blocked" : affordable ? "ready" : "locked";
  const label = unlocked ? "Unlocked" : blocked ? "Requires prior perk" : `Unlock ${perk.cost} XP`;
  return `
    <div class="perk ${status}">
      <div class="perk-head">
        <span>${perk.branch}</span>
        <strong>${perk.title}</strong>
      </div>
      <p>${perk.text}</p>
      <button onclick="unlockAdvancement('${staffId}', '${perk.id}')" ${unlocked || blocked || !affordable ? "disabled" : ""}>${label}</button>
    </div>
  `;
}

function helpIcon(text) {
  return `<span class="help-dot" tabindex="0" ${tip(text)}>?</span>`;
}

function ledgerPanel() {
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Estate Ledger</h2>
        <span class="small">Season notes</span>
      </div>
      <div class="log">
        ${state.log.length ? state.log.map(entry => `<div class="log-entry${entry.italic ? " cue-italic" : ""}"><strong>M${entry.month}</strong> ${entry.text}</div>`).join("") : `<div class="empty">No entries yet.</div>`}
      </div>
    </section>
  `;
}

function namingModal() {
  const lot = (state.vintages || []).find(v => v.id === state.pendingNaming);
  if (!lot) { state.pendingNaming = null; return ""; }
  const tier = profileTier(state.profile ?? 50);
  const pool = [
    ...(VINTAGE_NAMES[tier] || VINTAGE_NAMES.classic),
    ...(REGIONAL_VINTAGE_NAMES[state.region] || [])
  ];
  const options = [...pool].sort(() => 0.5 - rand()).slice(0, 4);
  return `
    <div class="modal">
      <div class="modal-card naming-modal-card">
        <h2>Name this release</h2>
        <p>The <strong>${escapeHtml(lot.label)}</strong> earned a critic score of <strong>${lot.criticScore}/100</strong>. Give it a lasting name to mark it in the cellar book. A prestige bonus is included.</p>
        <div class="naming-options">
          ${options.map(n => `<button class="naming-btn" onclick="chooseName(${JSON.stringify(lot.id).replace(/"/g,'&quot;')}, ${JSON.stringify(n).replace(/"/g,'&quot;')})">${escapeHtml(n)}</button>`).join("")}
        </div>
        <div class="top-actions">
          <button class="ghost" onclick="skipNaming()">Skip naming</button>
        </div>
      </div>
    </div>
  `;
}

function chooseName(lotId, name) {
  const lot = (state.vintages || []).find(v => v.id === lotId);
  if (lot) {
    lot.label = `${lot.label} "${name}"`;
    const entry = (state.archive || []).find(item => item.id === (lot.archiveId || lot.id));
    if (entry) entry.label = lot.label;
    state.prestige += 2;
    log(state, `Named release: "${name}" joins the cellar book. Prestige +2.`);
  }
  state.pendingNaming = null;
  render();
}

function skipNaming() {
  state.pendingNaming = null;
  render();
}

function toggleInsurance(type) {
  if (!state || !state.insurance) return;
  state.insurance[type] = !state.insurance[type];
  const active = state.insurance[type];
  log(state, active ? "Crop insurance activated ($750/mo). Frost and mildew protection costs reduced 80%." : "Crop insurance cancelled.");
  render();
}

function setStash(n) {
  if (!state) return;
  const maxStash = state.inventory.cases - reservedCases(state);
  state.inventory.stash = clamp(Math.round(n), 0, Math.max(0, maxStash));
  render();
}

function introModal() {
  const r = REGIONS.find(reg => reg.id === state.region);
  const legacyVintage = (state.vintages || []).find(v => v.id === "opening");
  const score = legacyVintage?.score ?? 3;
  const scoreWord = score >= 4 ? "a strong start" : score >= 3 ? "drinkable, not distinguished" : "below what most buyers expect";
  const d = difficulty();
  return `
    <div class="modal">
      <div class="modal-card intro-modal-card">
        <h2>Welcome to ${escapeHtml(state.wineryName)}</h2>
        <p class="intro-scene">${escapeHtml(state.wineryName)} has been trading for about a decade: long enough to have a name, short enough that nothing is fixed.</p>
        <p class="intro-scene">The previous owners left behind ${money(state.debt)} in outstanding debt, a monthly lease of ${money(state.leaseCost)}, and a cellar with ${state.inventory.cases} bottled cases from the inherited vintage alongside ${legacyVintage?.bulkWine ?? 0} case-equivalents still aging in tank. That vintage rated ${vintageScoreStars(score)}: ${scoreWord}.</p>
        <p class="intro-scene">You've always dreamed of running a winery, so when the chance opened up to take the helm you accepted. It won't be easy to turn ${escapeHtml(state.wineryName)} around, though: capital is tight, there aren't any reliable senior staff, the wine itself isn't great yet, and you can only do so many jobs yourself before burning out. Do you have what it takes to navigate the risk and complexity of scaling a winery and building a business that can last over the next five seasons?</p>
        <div class="top-actions" style="margin: 8px 0 12px;">
          <button class="primary" onclick="dismissIntro()">Begin</button>
        </div>
        <div class="intro-grid">
          <div class="intro-section">
            <div class="intro-head">Starting Position</div>
            <div class="intro-row"><span>Cash</span><strong>${money(state.cash)}</strong></div>
            <div class="intro-row"><span>Debt</span><strong>${money(state.debt)}</strong></div>
            <div class="intro-row"><span>Monthly lease</span><strong>${money(state.leaseCost)}</strong></div>
            <div class="intro-row"><span>Bottled cases</span><strong>${state.inventory.cases}</strong></div>
            <div class="intro-row"><span>Bulk in tank</span><strong>${legacyVintage?.bulkWine ?? 0} CE</strong></div>
            <div class="intro-row"><span>Prestige</span><strong>${state.prestige}</strong></div>
          </div>
          <div class="intro-section intro-goals">
            <div class="intro-head">Year One Priorities</div>
            <div class="intro-goal">Hire your first staff member; they define your strategic direction.</div>
            <div class="intro-goal">Sell the inherited inventory to build a cash cushion.</div>
            <div class="intro-goal">Keep vineyard disease below 40 heading into harvest.</div>
            <div class="intro-goal">Watch your monthly burn rate; lease and debt interest arrive before revenue does.</div>
            <div class="intro-goal">Bottle your first real vintage before year's end.</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function dismissIntro() {
  state.introSeen = true;
  render();
}

function gameOverModal() {
  if (!state.gameOver.score) {
    return `
      <div class="modal">
        <div class="modal-card">
          <h2>${state.gameOver.title}</h2>
          <p>${state.gameOver.text}</p>
          <div class="score-grid">
            <div class="stat-box"><span>Peak prestige</span><strong>${state.maxPrestige || state.prestige}</strong></div>
            <div class="stat-box"><span>Net worth</span><strong>${money(netWorth(state))}</strong></div>
            <div class="stat-box"><span>Cases sold</span><strong>${state.totalSold}</strong></div>
          </div>
          ${scoreAchievements()}
          <div class="top-actions">
            <button class="primary" onclick="resetGame()">New estate</button>
          </div>
        </div>
      </div>
    `;
  }

  const worth = netWorth(state);
  const bestScore = Math.max(0, ...(state.archive || []).map(e => e.score || 0));
  const totalBottles = (state.totalSold || 0) * 12;
  const wrathEnding = state.gameOver?.wrathEnding;
  const wrathTaglines = {
    "cup-held-back": "The estate was measured. It held.",
    "diminished": "The estate endured. What remained was honest.",
    "found-wanting": "The vintage was extraordinary. The cup was full.",
    "endured-alone": "The estate stood by what it had done."
  };
  return `
    <div class="modal">
      <div class="modal-card score-screen">
        <h2>Five seasons at ${escapeHtml(state.wineryName)}</h2>
        <p class="score-tagline">${wrathEnding ? wrathTaglines[wrathEnding] || "Here's how you did." : "Here's how you did."}</p>
        <div class="score-grid">
          <div class="stat-box"><span>Peak prestige</span><strong>${state.maxPrestige || state.prestige}</strong></div>
          <div class="stat-box"><span>Final net worth</span><strong>${money(worth)}</strong></div>
          <div class="stat-box"><span>Total revenue</span><strong>${money(state.totalRevenue)}</strong></div>
          <div class="stat-box"><span>Cases sold</span><strong>${state.totalSold.toLocaleString()}</strong></div>
          <div class="stat-box"><span>Bottles shipped</span><strong>${totalBottles.toLocaleString()}</strong></div>
          <div class="stat-box"><span>Orders fulfilled</span><strong>${state.fulfilled}</strong></div>
          ${bestScore > 0 ? `<div class="stat-box"><span>Best critic score</span><strong>${bestScore}/100</strong></div>` : ""}
        </div>
        ${scoreAchievements()}
        <div class="top-actions">
          <button class="primary" onclick="resetGame()">New estate</button>
        </div>
      </div>
    </div>
  `;
}

function scoreAchievements() {
  const earned = (state.achievements || []);
  if (!earned.length) return "";
  const items = earned.map(id => {
    const a = ACHIEVEMENTS.find(a => a.id === id);
    return a ? `<div class="achievement-chip" title="${escapeHtml(a.desc)}">${a.emoji} <span>${escapeHtml(a.name)}</span></div>` : "";
  }).join("");
  return `
    <div class="achievement-section">
      <h3>Achievements (${earned.length}/${ACHIEVEMENTS.length})</h3>
      <div class="achievement-chips">${items}</div>
    </div>
  `;
}

function achievementToast() { return ""; }

function flushAchievementToasts() {
  const root = document.getElementById("toast-root");
  if (!root || !state?.newAchievements?.length) return;
  const ids = [...state.newAchievements];
  state.newAchievements = [];
  ids.forEach((id, i) => {
    const a = ACHIEVEMENTS.find(a => a.id === id);
    if (!a) return;
    const el = document.createElement("div");
    el.className = "achievement-toast";
    el.innerHTML = `${a.emoji} <strong>${escapeHtml(a.name)}</strong> — ${escapeHtml(a.desc)}`;
    el.style.bottom = `${24 + i * 64}px`;
    root.appendChild(el);
    setTimeout(() => el.remove(), 4200);
  });
}

function render() {
  document.body.dataset.region = state?.region || "";
  const stage = state ? corruptionStage(state) : 0;
  document.body.className = stage > 0 ? `corruption-stage-${stage}` : "";
  app.innerHTML = state ? gameView() : setupView();
  flushAchievementToasts();
}

window.startGame = startGame;
window.randomStart = randomStart;
window.applySuggestedStart = applySuggestedStart;
window.setSetupMode = setSetupMode;
window.advanceGuide = advanceGuide;
window.retreatGuide = retreatGuide;
window.skipGuide = skipGuide;
window.dismissIntro = dismissIntro;
window.saveGame = saveGame;
window.loadGame = loadGame;
window.resetGame = resetGame;
window.selectSetup = selectSetup;
window.setSetupStep = setSetupStep;
window.nextSetupStep = nextSetupStep;
window.prevSetupStep = prevSetupStep;
window.setTab = setTab;
window.toggleHelp = toggleHelp;
window.openNoHelpModal = openNoHelpModal;
window.closeNoHelpModal = closeNoHelpModal;
window.useAction = useAction;
window.advanceMonth = advanceMonth;
window.setPrice = setPrice;
window.drawDebt = drawDebt;
window.repayDebt = repayDebt;
window.acceptOrder = acceptOrder;
window.fulfillOrder = fulfillOrder;
window.rejectOrder = rejectOrder;
window.buyBuilding = buyBuilding;
window.financeBuild = financeBuild;
window.sellBuilding = sellBuilding;
window.hireStaff = hireStaff;
window.fireStaff = fireStaff;
window.unlockAdvancement = unlockAdvancement;
window.resolveEvent = resolveEvent;
window.dismissEventResult = dismissEventResult;
window.dismissHarvestReport = dismissHarvestReport;
window.buyGrapes = buyGrapes;
window.earlyRelease = earlyRelease;
window.sellBulk = sellBulk;
window.chooseName = chooseName;
window.skipNaming = skipNaming;
window.toggleInsurance = toggleInsurance;
window.setStash = setStash;
window.useSpeakAction = useSpeakAction;

render();

function useSpeakAction(step) {
  if (!state || !inWrath(state)) return;
  const ws = state.wrathState;
  if (!ws.speakUsed) ws.speakUsed = [];
  if (ws.speakUsed.includes(step)) return;
  ws.speakUsed.push(step);
  log(state, "The estate's word was recorded.");
  render();
}
