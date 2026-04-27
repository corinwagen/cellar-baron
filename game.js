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
    costMod: 1.15,
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
    costMod: 0.82,
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
    cash: 95000,
    prestige: 32,
    demand: 38,
    costMod: 1.28,
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
    costMod: 0.86,
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
    costMod: 1.18,
    yieldMod: 0.88,
    qualityMod: 1.18,
    influence: 7,
    weather: { heat: 0.68, frost: 1.3, rain: 1.05, drought: 0.58 },
    varietals: ["nebbiolo", "pinot", "chardonnay"]
  },
  {
    id: "rioja",
    name: "Rioja",
    blurb: "Spain's temperate wine heartland — reliable sun, drought-hardy Tempranillo, accessible costs, and a loyal export market.",
    tags: ["Accessible costs", "Export demand", "Drought resilient"],
    cash: 102000,
    prestige: 20,
    demand: 52,
    costMod: 0.88,
    yieldMod: 1.06,
    weather: { heat: 1.12, frost: 0.58, rain: 0.62, drought: 1.22 },
    varietals: ["tempranillo", "malbec", "cabernet"]
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
    blurb: "Uncompromising — demands long barrel time and a patient market, but delivers the highest prestige ceiling in the cellar."
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
    blurb: "Spain's signature red — reliable in heat, graceful with age, and easy to sell at a fair price."
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
    cashMod: 0.58,
    debt: 95000,
    creditLine: 145000,
    rent: 11800,
    rows: 2,
    inventoryMod: 0.55,
    demandMod: 0.86,
    eventMod: 1.22,
    costMod: 1.12,
    winNetWorth: 440000
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
  }
};

const STAFF_POOL = [
  {
    id: "ines",
    name: "Ines Duarte",
    role: "Vineyard",
    salary: 5200,
    traits: ["Canopy tactician", "Hates shortcuts"],
    text: "Reduces vineyard stress and raises quality when morale is healthy.",
    effects: { vineyard: 2, quality: 4, moraleMin: 45 }
  },
  {
    id: "marco",
    name: "Marco Leung",
    role: "Cellar",
    salary: 6100,
    traits: ["Oak whisperer", "Slow"],
    text: "Adds prestige from barrel programs, but bottling costs more.",
    effects: { cellar: 2, prestige: 3, bottlingCost: 1.08 }
  },
  {
    id: "asha",
    name: "Asha Green",
    role: "Sales",
    salary: 5700,
    traits: ["Distributor network", "Risk taker"],
    text: "Improves wholesale demand and order quality. Sometimes overpromises.",
    effects: { sales: 2, demand: 7, eventRisk: 1.08 }
  },
  {
    id: "beatrice",
    name: "Beatrice Koh",
    role: "Hospitality",
    salary: 4300,
    traits: ["Calm floor", "Story-first"],
    text: "Turns tasting room traffic into morale, demand, and prestige.",
    effects: { hospitality: 2, morale: 4, demand: 3 }
  },
  {
    id: "omar",
    name: "Omar Silva",
    role: "Finance",
    salary: 4800,
    traits: ["Hedging", "Unsentimental"],
    text: "Cuts fixed costs and softens market shocks, with a morale tax.",
    effects: { finance: 2, costCut: 0.92, morale: -2, marketShield: 0.65 }
  },
  {
    id: "lucy",
    name: "Lucy Devereux",
    role: "Brand",
    salary: 6900,
    traits: ["Influencer magnet", "Expensive taste"],
    text: "Greatly improves luxury pricing if prestige is already moving.",
    effects: { brand: 2, pricePremium: 5, prestige: 5, costCut: 1.04 }
  },
  {
    id: "samir",
    name: "Samir Patel",
    role: "Operations",
    salary: 5400,
    traits: ["Line optimizer", "Blunt"],
    text: "Boosts bottling capacity and building value, but strains morale.",
    effects: { bottling: 2, buildDiscount: 0.9, morale: -3 }
  },
  {
    id: "priya",
    name: "Priya Nair",
    role: "Social Media",
    salary: 5100,
    traits: ["Viral reach", "Democratizes the brand"],
    text: "Drives strong demand from digital audiences. If prestige climbs above 72, her content pulls it back toward accessibility.",
    effects: { demand: 11, brand: 1, prestigeDrain: 72 }
  },
  {
    id: "felix",
    name: "Felix Moreau",
    role: "Tour Guide",
    salary: 4600,
    traits: ["Storyteller", "Local anchor"],
    text: "Runs regular estate tours that generate passive cash each month, scaled to your tasting room level.",
    effects: { tourIncome: 1, morale: 2, demand: 2 }
  },
  {
    id: "dr_chen",
    name: "Dr. Lin Chen",
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
    role: "Club Manager",
    salary: 5800,
    traits: ["Subscriber cultivator", "Retention focus"],
    text: "Builds a wine club that pays a modest fixed monthly income regardless of case inventory or market conditions.",
    effects: { clubIncome: 1, demand: 3, prestige: 1, profileDrift: 1 }
  },
  {
    id: "oscar",
    name: "Oscar Blanc",
    role: "Natural Winemaker",
    salary: 7200,
    traits: ["Low intervention", "Cult following"],
    text: "Slowly shifts the estate toward natural, artisan winemaking. Adds a monthly cellar quality tick and draws occasional attention from cult press.",
    effects: { cellar: 1, quality: 2, profileDrift: 2 }
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
    flavor: "Superbia — excellence demands recognition.",
    salaryMod: 1.1,
    friction: ["proud"]
  },
  wrathful: {
    name: "Wrathful", positive: false,
    summary: "Clashes with proud and wrathful colleagues (−1 morale/mo per pair). Mitigates crisis damage when confronting adversity.",
    flavor: "Ira — passionate, occasionally combustible.",
    crisisBonus: true,
    friction: ["proud", "wrathful"]
  },
  avaricious: {
    name: "Avaricious", positive: false,
    summary: "Salary runs 10% lower, but drains team morale by 2 each month.",
    flavor: "Avaritia — counts every penny.",
    salaryMod: 0.9,
    teamMorale: -2,
    friction: ["magnanimous"]
  },
  melancholic: {
    name: "Melancholic", positive: false,
    summary: "−1 morale to all staff each month. Earns 20% extra XP when sole member in their role.",
    flavor: "The contemplative humor — brilliant alone, difficult in company.",
    teamMorale: -1,
    soloXpBonus: 1.2,
    friction: ["sanguine", "magnanimous"]
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
        text: "A proper line cuts per-case cost and dramatically raises monthly throughput — essential once harvests scale up." },
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
        }}
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
        hint: "Morale +2, Prestige −1.",
        effect: s => { s.morale += 2; s.prestige -= 1; } }
    ]
  },
  {
    id: "union",
    title: "Cellar Crew Negotiation",
    body: "Your crew wants predictable hours before harvest pressure builds.",
    choices: [
      { label: "Raise wages", cost: 6500,
        hint: "Morale +10, Quality +2.",
        effect: s => { s.morale += 10; s.quality += 2; } },
      { label: "Hold the line",
        hint: "Cash +$1,200 but Morale −9.",
        effect: s => { s.morale -= 9; s.cash += 1200; } }
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
        }}
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
    body: "A polished investor is circling. The pitch is capital, distribution access, and quarterly targets — either to fund the next leap or bail out a tight balance sheet. Either way, the estate will answer to someone impatient.",
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
        hint: "Prestige +3, Morale +5, Influence −1.",
        effect: s => {
          s.prestige += 3;
          s.morale += 5;
          s.influence -= 1;
        }
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
        effect: s => { s.demand += 2; } }
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
    body: "A respected natural wine fair has reached out — word about your house style has circulated in the right circles. The audience is passionate, small, and influential.",
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
    body: "A respected Bordeaux négociant wants to taste and quote futures on your next vintage — buying the right to purchase it before bottling at a fixed price.",
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
    condition: s => s.region === "bordeaux",
    minMonth: 12,
    choices: [
      { label: "Host the committee", cost: 8000,
        hint: "Prestige +8, Influence +5 if barrel program is strong; Prestige +3 otherwise.",
        effect: s => {
          const strong = (s.buildings.barrel || 0) >= 2 && s.prestige >= 40;
          s.prestige += strong ? 8 : 3;
          s.influence += strong ? 5 : 1;
          log(s, strong ? "The committee was impressed. Classification standing improved." : "The visit went politely. More barrel investment needed to move the needle.");
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
    body: "Botrytis cinerea is spreading through the late-harvest clusters in a way that could be either disaster or opportunity. A true Spätlese or Auslese requires patience — and nerve.",
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
    body: "Word has reached the Conseil that your parcel's consistent quality and elevation profile may qualify for a premier cru designation — but a formal application requires lobbying, documentation, and a memorable tasting.",
    condition: s => s.region === "burgundy" && s.prestige >= 55,
    minMonth: 16,
    choices: [
      { label: "Pursue the classification", cost: 18000,
        hint: "Prestige +12, Demand +8, Influence +6.",
        effect: s => { s.prestige += 12; s.demand += 8; s.influence += 6; log(s, "The designation was granted. Premier cru changes every conversation with buyers."); } },
      { label: "Stay unclassified — preserve identity",
        hint: "Prestige +3, House Style more artisan.",
        effect: s => { s.prestige += 3; s.profile = clamp((s.profile ?? 50) + 4, 0, 100); log(s, "Staying outside the classification reinforced the cult positioning."); } }
    ]
  },
  {
    id: "burgundy-negotiant",
    title: "Négociant Surplus Offer",
    body: "A prominent Burgundy négociant is offering access to surplus premier cru bulk wine. Blending it into your program would lift the lot — but purists would notice.",
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
          s.rows.push({ id: s.rows.length + 1, name: "Old Vine Block", health: 90, disease: 8, water: 40, matureMonth: s.month, pressure: "old vines", threat: 1, threatName: "none" });
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
    body: "The Rioja Denominación de Origen regulatory council is conducting a compliance audit — barrel aging minimums, varietal composition, and cellar records.",
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
      s.quality += 1 + vBonus;
      log(s, `Vineyard crew cleaned canopies and scouted disease. Average disease now ${Math.round(averageDisease(s))}.`);
    }
  },
  {
    id: "cellar",
    name: "Blend and Barrel",
    detail: "Fermentation, racking, blending, and barrel decisions.",
    seasons: ["Harvest", "Cellar", "Dormant", "Budbreak"],
    consequence: "Uses grapes, creates bulk wine, raises quality and prestige.",
    cost: 3000,
    apply: s => {
      const capacity = 220 + s.buildings.tank * 120 + staffBonus(s, "cellar") * 70;
      const lot = (s.vintages || []).find(v => v.grapes > 0);
      const used = lot ? Math.min(lot.grapes, capacity) : 0;
      if (lot && used > 0) {
        lot.grapes -= used;
        lot.bulkWine += Math.round(used * 0.72);
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
    }
  },
  {
    id: "bottle",
    name: "Bottle Cases",
    detail: "Bottle finished wine into sellable cases.",
    seasons: ["Cellar", "Dormant", "Budbreak", "Flowering"],
    consequence: "Uses aged bulk wine and glass; creates sellable cases.",
    cost: 2400,
    apply: s => {
      const glassPenalty = s.marketMods.glassShortage ? 0.72 : 1;
      const capacity = Math.floor((280 + s.buildings.line * 170 + staffBonus(s, "bottling") * 95) * glassPenalty);
      const ready = readyVintages(s);
      if (!ready.length) { log(s, "No wine has finished aging yet."); return; }
      const lot = ready[0];
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
        log(s, `Bottled ${cases} cases from ${lot.label} — ${lot.bulkWine} CE remaining. ${vintageScoreLabel(effectiveScore)} vintage (${vintageScoreStars(effectiveScore)}) · critic score ${lot.criticScore}/100.`);
        if (effectiveScore >= 4 && !s.pendingNaming) s.pendingNaming = lot.id;
      } else {
        log(s, `Bottled ${cases} cases from ${lot.label} — ${lot.bulkWine} CE remaining.`);
      }
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
      s.demand += 3 + staffBonus(s, "sales") + staffBonus(s, "brand");
      if (rand() < 0.75) addOrder(s);
      log(s, `Direct channels sold ${direct.cases} cases for ${money(direct.revenue)}.`);
    }
  },
  {
    id: "hospitality",
    name: "Run Hospitality",
    detail: "Open the tasting room when tourism and allocations matter.",
    seasons: ["Budbreak", "Flowering", "Veraison", "Harvest", "Cellar"],
    consequence: "Sells premium cases, raises demand, prestige, and morale.",
    cost: 1600,
    apply: s => {
      const visits = Math.floor((80 + s.buildings.room * 70) * (0.7 + s.demand / 130));
      const cases = Math.min(availableCases(s), Math.floor(visits / 8));
      const revenue = cases * Math.round(s.price * 12 * 1.35);
      s.inventory.cases -= cases;
      s.cash += revenue + visits * 14;
      s.totalSold += cases;
      s.totalRevenue += revenue + visits * 14;
      s.morale += 3 + staffBonus(s, "hospitality");
      s.prestige += 1 + Math.floor(s.buildings.room / 2);
      s.demand += 2 + staffBonus(s, "hospitality");
      log(s, `Hospitality hosted ${visits} guests and sold ${cases} premium cases.`);
    }
  },
  {
    id: "finance",
    name: "Negotiate and Hedge",
    detail: "Talk to banks, suppliers, landlords, and grant programs.",
    seasons: ["Dormant", "Budbreak", "Flowering", "Cellar"],
    consequence: "Adds cash and influence, but cools demand slightly.",
    cost: 800,
    apply: s => {
      const gain = 5500 + staffBonus(s, "finance") * 2200 + Math.floor(s.influence * 120);
      s.cash += gain;
      s.influence += 2;
      s.demand -= 1;
      log(s, `Finance found ${money(gain)} in grants, rebates, and better terms.`);
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
        log(s, `Spray program knocked disease pressure down to ${Math.round(averageDisease(s))} avg. Frost protection ready.`);
      } else if (s.season === "Flowering") {
        // Canopy thinning: disease down, water normalised slightly, quality up
        s.rows.forEach(row => {
          ensureRowFields(row);
          row.disease = clamp(row.disease - (20 + randint(0, 6)), 0, 100);
          row.water   = clamp(row.water + (row.water < 45 ? 6 : -4), 0, 100);
          row.threat  = Math.round(row.disease / 11);
          row.pressure = "canopy thinned";
        });
        s.quality += 2;
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
        s.demand  += 1;
        s.profile = (s.profile ?? 50) + 3;
        log(s, "Green harvest dropped 20% of the crop to concentrate the remaining fruit. Quality up sharply.");
      } else if (s.season === "Harvest") {
        if (isHarvestMonth(s.month)) {
          s.marketMods.harvestCrew = 2;
          s.quality += 3;
          s.morale  -= 1;
          log(s, "Selective picking crews are booked for harvest.");
        } else {
          s.rows.forEach(row => {
            ensureRowFields(row);
            row.disease = clamp(row.disease - 10, 0, 100);
            row.threat  = Math.round(row.disease / 11);
          });
          s.quality += 1;
          log(s, "Post-harvest vineyard walk — disease pressure eased.");
        }
      } else if (s.season === "Cellar") {
        const ready = readyVintages(s);
        const lot = ready[0] || null;
        const cases = lot ? Math.min(lot.bulkWine, 90 + staffBonus(s, "cellar") * 25) : 0;
        if (lot && cases > 0) {
          lot.bulkWine -= cases;
          lot.bottled = (lot.bottled || 0) + cases;
          s.inventory.cases += Math.round(cases * 0.95);
          log(s, `Cellar topping and racking finished ${cases} cases from ${lot.label}.`);
        } else {
          log(s, "Cellar topping and racking tightened the post-harvest pipeline.");
        }
        s.quality += 1;
      } else {
        // Dormant — winter pruning recovers health and resets water toward neutral
        s.rows.forEach(row => {
          ensureRowFields(row);
          row.health  = clamp(row.health + 6, 20, 100);
          row.water   = clamp(row.water + (row.water < 50 ? 8 : -4), 20, 80);
          row.disease = clamp(row.disease - 8, 0, 100);
          row.threat  = Math.round(row.disease / 11);
          row.pressure = "pruned";
        });
        s.quality += 1;
        s.morale  += 2;
        log(s, "Winter pruning recovered vine health and reset soil moisture toward neutral.");
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
      log(s, `Natural cellar pass complete. House style shifted to ${profileLabel(s.profile)} (${s.profile}).`);
    }
  }
];

const app = document.getElementById("app");
let state = null;
let setup = { region: "napa", varietal: "cabernet", philosophy: "classic", difficulty: "estate", wineryName: "" };
let setupStep = 0;
let activeTab = "overview";
let helpOpen = true;

const SETUP_STEPS = [
  { key: "region", title: "Choose Region", kicker: "Where the estate lives shapes weather, prestige, land cost, and grape options." },
  { key: "varietal", title: "Choose Grape", kicker: "Your flagship grape determines yield, demand, cellar needs, and fragility." },
  { key: "philosophy", title: "Choose Style", kicker: "The house philosophy changes yield, quality, risk, sustainability, and costs." },
  { key: "difficulty", title: "Choose Difficulty", kicker: "Difficulty sets starting debt, lease pressure, credit line, inventory, and margin for error." }
];

const TABS = [
  { id: "overview", name: "Overview", tip: "A short operating brief and the highest-level estate signals." },
  { id: "vineyard", name: "Vineyard", tip: "Weather, row health, disease pressure, and harvest risk." },
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
    name: "Winter Pruning",
    detail: "Prune vines, repair trellises, and reset water toward neutral before the next season.",
    consequence: "Health +6, disease −8, water normalised, morale +2."
  }
};

// Named-release name pools keyed by profile tier
const VINTAGE_NAMES = {
  cult:       ["Clos", "Sans Soufre", "Sauvage", "Libre", "Primitif"],
  artisan:    ["Reserve", "Old Block", "Heritage Cuvée", "Barrel Select", "Lieu-Dit"],
  classic:    ["Estate Selection", "Grand Reserve", "Prestige Cuvée", "Flagship", "Anniversary"],
  commercial: ["Signature", "House Select", "Proprietor's", "Classic Reserve", "Celebracion"]
};

const AGING_TARGETS = {
  sauvignon: 3, riesling: 3, chardonnay: 5, pinot: 6,
  merlot: 5, malbec: 6, cabernet: 8, shiraz: 7, gamay: 2,
  nebbiolo: 10, tempranillo: 7
};
const REGION_AGING_BONUS = { bordeaux: 2, burgundy: 3, napa: 1, mosel: 0, mendoza: 0, barossa: 0, piedmont: 3, rioja: 1 };

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

function money(value) {
  const sign = value < 0 ? "-" : "";
  return `${sign}$${Math.abs(Math.round(value)).toLocaleString()}`;
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
  while (calendarMonthNumber(m) !== 9) m++;
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
                             cabernet: 0, shiraz: -6 };

function createState() {
  const r = selectedRegion();
  const v = selectedVarietal();
  const p = selectedPhilosophy();
  const d = selectedDifficulty();
  const inventoryMod = d.inventoryMod;
  const startProfile = clamp(50 + (PHILOSOPHY_PROFILE[p.id] || 0) + (VARIETAL_PROFILE[setup.varietal] || 0), 0, 100);
  const s = {
    month: 1,
    maxMonths: 60,
    season: "Budbreak",
    difficulty: d.id,
    region: r.id,
    varietal: setup.varietal,
    philosophy: p.id,
    wineryName: setup.wineryName.trim() || "Unnamed Estate",
    cash: Math.round(r.cash * d.cashMod),
    debt: d.debt,
    debtLots: d.debt ? [{ principal: d.debt, rate: baseDebtRate(d), label: "Opening debt" }] : [],
    creditLine: d.creditLine,
    leaseCost: d.rent,
    prestige: r.prestige,
    demand: Math.round(r.demand * v.demand * p.demand * d.demandMod),
    morale: 58,
    quality: Math.round(48 * v.quality * p.quality * (r.qualityMod || 1)),
    sustainability: 45 + p.sustainability,
    influence: r.influence || 2,
    price: 28,
    monthStartPrice: 28,
    actionsLeft: 3,
    staff: [],
    staffProgress: {},
    staffMarket: (() => {
      const pool = [...STAFF_POOL].sort(() => 0.5 - Math.random()).slice(0, 3).map(p => p.id);
      return pool;
    })(),
    staffTraits: {},
    buildings: { block: 0, tank: 1, barrel: 1, line: 0, room: 0, lab: 0 },
    rows: makeRows(d.rows),
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
    log: [],
    marketHeat: 52,
    marketMods: {},
    investor: null,
    event: null,
    lastWeather: "Clear",
    lastTemp: regionalTempRange(r.id, 3),
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
    gameOver: null
  };
  ensureStaffTraits(s);
  return s;
}

function makeRows(count, options = {}) {
  const names = ["North Slope", "River Bench", "Old Block", "Stone Terrace", "Hill Parcel", "Windbreak", "Village Edge", "Reservoir Row"];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i],
    health: 82 + randint(-4, 6),
    disease: randint(5, 18),
    water: 52 + randint(-8, 8),
    pressure: "weeds",
    plantedMonth: options.plantedMonth || -96,
    matureMonth: options.matureMonth || 1
  }));
}

function log(s, text) {
  s.log.unshift({ month: s.month, text });
  s.log = s.log.slice(0, 45);
}

function startGame() {
  state = createState();
  setupStep = 0;
  activeTab = "overview";
  helpOpen = true;
  addOrder(state, "distributor");
  addOrder(state, "restaurant");
  log(state, `${state.wineryName} founded in ${region().name} around ${varietal().name}.`);
  recordHistory(state, 0);
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
  if (!s.wineryName) s.wineryName = "Unnamed Estate";
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
}

function resetGame() {
  localStorage.removeItem("cellar-baron-save");
  state = null;
  setupStep = 0;
  activeTab = "overview";
  helpOpen = true;
  render();
}

function staffBonus(s, key) {
  const base = s.staff.reduce((sum, id) => {
    const person = STAFF_POOL.find(p => p.id === id);
    if (!person) return sum;
    return sum + (person.effects[key] || 0);
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
  const operating = 6200 + s.rows.length * 1050 + s.buildings.tank * 520 + s.buildings.barrel * 620 + s.buildings.room * 720;
  const investorOverhead = s.investor?.pressureMonths > 0 ? 4500 : 0;
  const interest = monthlyInterest(s);
  const insurancePremium = s.insurance?.crop ? 750 : 0;
  const subtotal = operating + salaries + investorOverhead + s.leaseCost + interest + insurancePremium;
  const multiplier = region().costMod * philosophy().cost * difficulty().costMod * staffCostMod(s);
  const total = Math.round(subtotal * multiplier);
  return {
    operating,
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
  const demandMod = profileDemandMod(s);
  const desirability = (s.demand * demandMod * 0.9 + s.prestige * 0.8 + s.quality * 0.7 + s.marketHeat * 0.6) / 4;
  const priceResistance = Math.pow(s.price / 28, 1.55);
  const capacity = 70 + s.buildings.room * 80 + staffBonus(s, "sales") * 45 + staffBonus(s, "brand") * 55;
  const rawCases = Math.max(0, Math.floor((capacity * desirability) / (65 * priceResistance)));
  const salesCeiling = 35 + s.buildings.room * 50 + staffBonus(s, "sales") * 20 + staffBonus(s, "brand") * 15;
  const cases = Math.min(availableCases(s), rawCases, salesCeiling);
  const premium = 1 + Math.max(0, s.prestige - 45) / 210 + staffBonus(s, "brand") * 0.06;
  const vintageMod = vintageScoreMultiplier(s.currentVintageScore || 3);
  const revenue = Math.round(cases * s.price * 12 * premium * vintageMod);
  return { cases, revenue };
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
  return clamp(base + qMod + variance, 78, 100);
}

function estimatePassiveStaffIncome(s) {
  const tourPoints = staffBonus(s, "tourIncome");
  const tourIncome = tourPoints > 0 ? tourPoints * Math.max(1, s.buildings.room) * 1800 : 0;
  const clubPoints = staffBonus(s, "clubIncome");
  const clubIncome = clubPoints > 0 ? clubPoints * (2200 + Math.max(0, s.prestige - 30) * 40) : 0;
  return { tourIncome, clubIncome };
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
  let morale = 0, demand = 0;
  s.staff.forEach(id => {
    (s.staffTraits?.[id] || []).forEach(t => {
      morale += PERSONALITY_TRAITS[t]?.teamMorale || 0;
      demand += PERSONALITY_TRAITS[t]?.teamDemand || 0;
    });
  });
  return { morale, demand };
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
    progress.xp += Math.max(1, Math.round(amount * xpMod));
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
    if (s.month % 3 === 0) log(s, `Estate tours brought in ${money(tourIncome)} this month.`);
  }

  // Club income: flat monthly per clubIncome point, grows with prestige
  const clubPoints = staffBonus(s, "clubIncome");
  if (clubPoints > 0) {
    clubIncome = clubPoints * (2200 + Math.max(0, s.prestige - 30) * 40);
    s.cash += clubIncome;
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

  // Profile drift from staff
  const profileDrift = staffBonus(s, "profileDrift");
  if (profileDrift !== 0) s.profile = (s.profile ?? 50) + profileDrift;

  // Priya pulls profile toward commercial
  if (s.staff.includes("priya")) s.profile = (s.profile ?? 50) - 1;

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
  return { tourIncome, clubIncome };
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
  const typeId = forcedType || eligible[randint(0, eligible.length - 1)];
  const type = ORDER_TYPES[typeId];
  const prestigeFit = s.prestige + randint(-8, 16);
  if (!forcedType && prestigeFit < type.prestige) return;
  const cases = randint(type.cases[0], type.cases[1]);
  const maxPrice = Math.round(randint(type.price[0], type.price[1]) * (1 + s.quality / 260 + staffBonus(s, "sales") * 0.03));
  const due = s.month + randint(type.due[0], type.due[1]);
  const id = `${typeId}-${Date.now()}-${Math.floor(rand() * 10000)}`;
  s.orders.push({
    id,
    type: typeId,
    buyer: type.name,
    cases,
    maxPrice,
    due,
    expires: s.month + 2,
    accepted: false,
    penalty: Math.round(cases * maxPrice * 12 * 0.18)
  });
}

function acceptOrder(id) {
  const order = state.orders.find(o => o.id === id);
  if (!order) return;
  if (state.price > order.maxPrice) {
    log(state, `${order.buyer} would not sign at ${money(state.price)} per bottle; their ceiling is ${money(order.maxPrice)}.`);
    render();
    return;
  }
  order.accepted = true;
  state.demand += 1;
  log(state, `${order.buyer} signed for ${order.cases} cases at ${money(state.price)} per bottle.`);
  render();
}

function fulfillOrder(id) {
  const order = state.orders.find(o => o.id === id);
  if (!order || !order.accepted || state.inventory.cases < order.cases) return;
  const premium = 1 + Math.max(0, state.quality - 55) / 260;
  const vintageMod = vintageScoreMultiplier(state.currentVintageScore || 3);
  const revenue = Math.round(order.cases * state.price * 12 * premium * vintageMod);
  state.inventory.cases -= order.cases;
  state.cash += revenue;
  state.prestige += order.type === "collector" ? 5 : order.type === "club" || order.type === "restaurant" ? 3 : 1;
  state.demand += 2;
  state.fulfilled += 1;
  state.totalSold += order.cases;
  state.totalRevenue += revenue;
  state.orders = state.orders.filter(o => o.id !== id);
  log(state, `Fulfilled ${order.buyer}: ${order.cases} cases for ${money(revenue)}.`);
  checkGameOver();
  render();
}

function rejectOrder(id) {
  const order = state.orders.find(o => o.id === id);
  if (order?.accepted) {
    state.prestige -= 2;
    state.demand -= 3;
  }
  state.orders = state.orders.filter(o => o.id !== id);
  render();
}

function ensureRowFields(row) {
  if (typeof row.disease !== "number") row.disease = row.threat != null ? row.threat * 11 : 10;
  if (typeof row.water !== "number") row.water = 52;
  if (!row.pressure) row.pressure = row.threatName || "normal";
  // keep legacy fields in sync for any old code that still reads them
  row.threat = Math.round((row.disease || 0) / 11);
  row.threatName = row.pressure;
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
    const row = makeRows(1, { plantedMonth: s.month, matureMonth: s.month + 18 })[0];
    row.name = `Young Block ${s.rows.length + 1}`;
    s.rows.push(row);
    s.rows[s.rows.length - 1].id = s.rows.length;
  }
  if (id === "room") { s.demand += 4; if (s.buildings.room === 3) s.morale += 3; if (s.buildings.room === 4) s.prestige += 8; }
  if (id === "barrel") s.quality += Math.round(varietal().barrelNeed * 2);
  if (id === "line" && s.buildings.line === 4) s.prestige += 2;
}

function buyBuilding(id) {
  const bDef = BUILDINGS.find(item => item.id === id);
  const owned = state.buildings[id] || 0;
  if (!bDef || owned >= bDef.max || state.actionsLeft <= 0 || state.event || state.gameOver) return;
  const cost = capexCost(id, owned);
  if (state.cash < cost) return;
  _doBuild(state, id, cost);
}

function financeBuild(id) {
  const bDef = BUILDINGS.find(item => item.id === id);
  const owned = state.buildings[id] || 0;
  if (!bDef || owned >= bDef.max || state.actionsLeft <= 0 || state.event || state.gameOver) return;
  const cost = capexCost(id, owned);
  if (availableCredit(state) < cost) return;
  addDebt(state, cost, `${capexTier(id, owned)?.name || id} financing`);
  _doBuild(state, id, 0);
}

function _doBuild(s, id, cashCost) {
  const owned = s.buildings[id] || 0;
  const tier = capexTier(id, owned);
  s.cash -= cashCost;
  s.buildings[id] = owned + 1;
  applyBuildEffect(s, id, tier);
  s.actionsLeft -= 1;
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
  const person = STAFF_POOL.find(p => p.id === id);
  if (!person || state.staff.includes(id) || state.staff.length >= 5) return;
  const signing = Math.round(person.salary * 1.4);
  if (state.cash < signing) return;
  state.cash -= signing;
  state.staff.push(id);
  ensureStaffProgress(state, id);
  state.staffMarket = state.staffMarket.filter(staffId => staffId !== id);
  while (state.staffMarket.length < 3) {
    const candidates = STAFF_POOL.filter(p => !state.staff.includes(p.id) && !state.staffMarket.includes(p.id));
    if (!candidates.length) break;
    const newId = candidates[randint(0, candidates.length - 1)].id;
    state.staffMarket.push(newId);
    rollTraitsForStaff(state, newId);
  }
  applyStaffPassive(state, person);
  log(state, `${person.name} joined as ${person.role}.`);
  render();
}

function fireStaff(id) {
  const person = STAFF_POOL.find(p => p.id === id);
  if (!person) return;
  state.cash -= Math.round(person.salary * 0.8);
  state.morale -= 5;
  state.staff = state.staff.filter(staffId => staffId !== id);
  if (!state.staffMarket.includes(id)) state.staffMarket.push(id);
  log(state, `${person.name} left the estate.`);
  render();
}

function applyStaffPassive(s, person) {
  const effects = person.effects || {};
  s.morale += effects.morale || 0;
  s.demand += effects.demand || 0;
  s.prestige += effects.prestige || 0;
}

function useAction(id) {
  const action = ACTIONS.find(a => a.id === id);
  if (!action || state.event || state.gameOver) return;
  if (action.navigateTab) {
    activeTab = action.navigateTab;
    render();
    return;
  }
  if (state.actionsLeft <= 0) return;
  if (!isActionAvailable(action, state)) return;
  const cost = actionCost(action, state);
  if (state.cash < cost) return;
  state.cash -= cost;
  action.apply(state);
  grantActionXp(state, id);
  state.actionsLeft -= 1;
  normalizeState(state);
  checkGameOver();
  render();
}

function isActionAvailable(action, s) {
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
  if (s.season === "Harvest" && !isHarvestMonth(s.month)) {
    return {
      name: "Post-Harvest Walk",
      detail: "Walk blocks after picking, move first batches to tank, and start row recovery.",
      consequence: "Reduce vine stress and begin cellar hand-off."
    };
  }
  return SEASONAL_ACTIONS[s.season] || SEASONAL_ACTIONS.Cellar;
}

function seasonListLabel(seasons) {
  return seasons.map(season => `${season} (${SEASON_WINDOWS[season]})`).join(", ");
}

function normalizeState(s) {
  s.cash = Math.round(s.cash);
  s.prestige = clamp(Math.round(s.prestige), 0, 120);
  s.demand = clamp(Math.round(s.demand), 0, 130);
  s.morale = clamp(Math.round(s.morale), 0, 100);
  s.quality = clamp(Math.round(s.quality), 0, 120);
  s.sustainability = clamp(Math.round(s.sustainability), 0, 100);
  s.influence = clamp(Math.round(s.influence), 0, 100);
  s.profile = clamp(Math.round(s.profile ?? 50), 0, 100);
  // temperate trait: morale never falls below 10
  const hasTemperate = (s.staff || []).some(id => (s.staffTraits?.[id] || []).includes("temperate"));
  if (hasTemperate) s.morale = Math.max(s.morale, 10);
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
  s.monthStartPrice = s.price; // anchor for next month's price cap
  const startingCases = s.inventory.cases;
  const sales = directSales(s);
  s.inventory.cases -= sales.cases;
  s.cash += sales.revenue;
  s.totalSold += sales.cases;
  s.totalRevenue += sales.revenue;

  const costs = fixedCostBreakdown(s);
  s.cash -= costs.total;
  s.inventory.glass += 120 + s.buildings.line * 70;
  grantMonthlyStaffXp(s);
  applyInvestorPressure(s, costs.total);

  applyRegionEffects(s);
  applyWeather(s);
  const staffPassiveIncome = applyPassiveStaffEffects(s);
  applyPassiveBuildingEffects(s);
  decayAndOrders(s);
  (s.vintages || []).forEach(v => { if (v.bulkWine > 0) v.agingMonths = (v.agingMonths || 0) + 1; });

  const harvestResult = isHarvestMonth(s.month) ? harvest(s) : null;

  if (rand() < 0.36 * eventRiskMod(s) * difficulty().eventMod) {
    s.event = drawEvent(s);
  }

  s.marketHeat = clamp(s.marketHeat + randint(-6, 8) + Math.floor((s.demand - 55) / 16), 10, 100);
  s.demand = clamp(s.demand + Math.floor((s.marketHeat - 50) / 18) - Math.max(0, Math.floor((s.price - 34) / 9)), 0, 130);
  const qualityPressure = s.quality > 100 ? 2 : s.quality > 85 ? 1 : 0;
  s.quality = clamp(s.quality - 1 + Math.floor(s.morale / 55) - qualityPressure, 0, 120);
  const traitPassive = staffTraitPassiveEffects(s);
  const frictionDelta = staffFrictionMorale(s);
  s.morale = clamp(s.morale - 2 + Math.floor(s.cash / 160000) + traitPassive.morale + frictionDelta, 0, 100);
  s.demand = clamp(s.demand + traitPassive.demand, 0, 130);

  Object.keys(s.marketMods).forEach(key => {
    s.marketMods[key] -= 1;
    if (s.marketMods[key] <= 0) delete s.marketMods[key];
  });

  if (s.cash < -25000) {
    const overdraft = Math.abs(s.cash);
    const credit = Math.min(overdraft, availableCredit(s));
    const rate = credit > 0 ? addDebt(s, credit, "Overdraft coverage") : 0;
    s.cash = credit >= overdraft ? 0 : -(overdraft - credit);
    s.prestige -= 3;
    s.morale -= 5;
    log(s, credit >= overdraft ? `The bank covered an overdraft at ${(rate * 100).toFixed(1)}% monthly. Debt rose and confidence fell.` : "The credit line is tapped out. Uncovered bills are damaging the estate.");
  }

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
    endingCases: s.inventory.cases,
    fixedCost: totalCloseCost,
    interestCost: costs.interest,
    leaseCost: costs.lease,
    payrollCost: costs.salaries,
    operatingCost: costs.operating,
    harvestLaborCost: harvestResult?.laborCost || 0,
    pnl: sales.revenue + staffPassiveIncome.tourIncome + staffPassiveIncome.clubIncome - totalCloseCost
  };
  recordHistory(s, closeCosts);
  s.month += 1;
  s.actionsLeft = 3 + (s.morale > 78 ? 1 : 0) - (s.morale < 20 ? 1 : 0);
  s.season = seasonName(s.month);
  log(s, `Month closed: direct channels sold ${sales.cases} cases for ${money(sales.revenue)}; costs ${money(totalCloseCost)} including ${money(costs.interest)} interest${harvestResult?.laborCost ? ` and ${money(harvestResult.laborCost)} harvest labor` : ""}.`);
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
      log(s, "An export broker reached out — Barossa Shiraz is moving well overseas.");
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
    log(s, "The investor's first-year pressure eased. The estate keeps the capital structure.");
  }
}

function seasonName(month) {
  const m = calendarMonthNumber(month);
  if ([12, 1, 2].includes(m)) return "Dormant";
  if ([3, 4].includes(m)) return "Budbreak";
  if ([5, 6].includes(m)) return "Flowering";
  if ([7, 8].includes(m)) return "Veraison";
  if ([9, 10].includes(m)) return "Harvest";
  return "Cellar";
}

function isHarvestMonth(month) {
  const m = calendarMonthNumber(month);
  return m === 9;
}

function applyWeather(s) {
  const r = region();
  const v = varietal();
  const lab = 1 - s.buildings.lab * 0.12;
  const month = calendarMonthNumber(s.month);
  s.lastTemp = regionalTempRange(r.id, month);
  const springFrost = [3, 4].includes(month) ? 1 : [2, 5, 10, 11].includes(month) ? 0.35 : 0.03;
  const summerHeat = [6, 7, 8, 9].includes(month) ? 1 : [5, 10].includes(month) ? 0.4 : 0.08;
  const rainSeason = [3, 4, 5, 10, 11].includes(month) ? 1 : [6, 9, 12, 1, 2].includes(month) ? 0.55 : 0.25;
  const droughtSeason = [6, 7, 8, 9].includes(month) ? 1 : [5, 10].includes(month) ? 0.45 : 0.12;
  const tempHeat = s.lastTemp.high >= 95 ? 1.7 : s.lastTemp.high >= 88 ? 1.25 : 0.8;
  const tempFrost = s.lastTemp.low <= 33 ? 1.8 : s.lastTemp.low <= 38 ? 1.2 : 0.45;
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
        row.disease = clamp(row.disease + Math.round((8 + randint(0, 6)) * diseaseRisk * philosophy().risk * lab * shield), 0, 100);
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
      case "clear":
        row.disease = clamp(row.disease - randint(2, 5), 0, 100);
        row.water   = clamp(row.water   + randint(-2, 3), 0, 100);
        row.health  = clamp(row.health  + 1, 8, 100);
        break;
    }

    // High disease bleeds health over time
    if (row.disease > 60) row.health = clamp(row.health - Math.floor((row.disease - 60) / 18), 8, 100);
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
    base * (avgHealth / 82) * v.yield * p.yield * (r.yieldMod || 1) * crew * waterYieldMod * diseaseYieldMod * greenHarvestMod
  ));
  const rawQualityGain = Math.round((avgHealth - 58) / 8 + s.buildings.barrel * 0.7 + (s.marketMods.harvestCrew ? 2 : 0));
  const qualityGain = Math.round(rawQualityGain * waterQualityMod * diseaseQualityMod);

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
    purchased: false
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
  s.harvestReport = {
    date: monthDateLabel(s.month),
    grapes,
    laborCost,
    productiveRows: productive.length,
    qualityGain,
    vintageScore,
    avgDisease: Math.round(avgDisease),
    avgWater: Math.round(avgWater),
    note: (s.marketMods.harvestCrew ? "Selective picking raised yield and quality." : "Standard seasonal labor.") + diseaseNote + waterNote
  };
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
      s.demand -= 4;
      s.morale -= 3;
      s.missed += 1;
      log(s, `Missed ${order.buyer}. Penalty paid: ${money(order.penalty)}.`);
    }
  });
  s.orders = s.orders.filter(order => order.accepted ? order.due >= s.month : order.expires >= s.month);
  if (s.month % 3 === 0 || s.orders.length < 2) addOrder(s);
}

function drawEvent(s) {
  const candidates = EVENT_DECK.filter(event => {
    if (event.minMonth && s.month < event.minMonth) return false;
    if (event.condition && !event.condition(s)) return false;
    if (!event.type) return true;
    if (event.type === "frost") return s.lastWeather.includes("Frost") || rand() < 0.35;
    if (event.type === "rain") return s.lastWeather.includes("Wet") || rand() < 0.45;
    return true;
  });
  return candidates[randint(0, candidates.length - 1)];
}

function resolveEvent(choiceIndex) {
  const event = state.event;
  if (!event) return;
  const choice = event.choices[choiceIndex];
  let cost = choice.cost || 0;
  if (choice.insured && state.insurance?.crop) cost = Math.round(cost * 0.2);
  if (cost && state.cash < cost) return;
  state.cash -= cost;
  if (choice.insured && state.insurance?.crop && choice.cost) {
    log(state, `Crop insurance covered ${money((choice.cost || 0) - cost)} of the damage cost.`);
  }
  choice.effect(state);
  log(state, `${event.title}: ${choice.label}.`);
  state.event = null;
  normalizeState(state);
  checkGameOver();
  render();
}

function checkGameOver() {
  if (!state) return;
  const worth = netWorth(state);
  const targetWorth = difficulty().winNetWorth;
  if (state.prestige >= 82 && worth >= targetWorth && state.fulfilled >= 12) {
    state.gameOver = {
      win: true,
      title: "Your estate became a benchmark producer.",
      text: "Collectors chase your allocation, distributors answer your calls, and the bank has stopped calling first."
    };
  } else if (state.month > state.maxMonths) {
    const respectable = worth > 120000 && state.prestige > 45;
    state.gameOver = {
      win: respectable,
      title: respectable ? "You built a durable regional winery." : "The vintage ledger closed hard.",
      text: respectable
        ? "You did not dominate the trade, but the business can survive another generation."
        : "Cash, reputation, or operations never reached escape velocity before the five-year window closed."
    };
  } else if (state.debt > state.creditLine + 65000 || (state.cash < -50000 && availableCredit(state) <= 0) || state.prestige <= 0 || state.morale <= 0) {
    state.gameOver = {
      win: false,
      title: "The estate lost confidence.",
      text: "The board stepped in after debt, morale, or reputation broke the business."
    };
  }
}

function setupView() {
  const r = selectedRegion();
  const v = selectedVarietal();
  const p = selectedPhilosophy();
  const d = selectedDifficulty();
  const step = SETUP_STEPS[setupStep];
  const loadButton = localStorage.getItem("cellar-baron-save")
    ? `<button class="ghost" onclick="loadGame()">Load saved estate</button>`
    : "";
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
          <div class="winery-name-row">
            <label class="winery-name-label">
              <span>Winery name</span>
              <input type="text" class="winery-name-input" placeholder="Your estate name..." maxlength="40"
                value="${escapeHtml(setup.wineryName)}"
                oninput="setup.wineryName = this.value;">
            </label>
          </div>
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
            ${loadButton}
            <button onclick="prevSetupStep()" ${setupStep === 0 ? "disabled" : ""}>Back</button>
            ${setupStep < SETUP_STEPS.length - 1
              ? `<button class="primary" onclick="nextSetupStep()">Next</button>`
              : `<button class="primary" onclick="startGame()">Start vintage run</button>`}
          </div>
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
    ${state.gameOver ? gameOverModal() : (!state.introSeen ? introModal() : (state.pendingNaming ? namingModal() : ""))}
  `;
}

function tabs() {
  return `
    <nav class="tabs" aria-label="Estate sections">
      ${TABS.map(tab => `
        <button class="${activeTab === tab.id ? "active" : ""}" onclick="setTab('${tab.id}')" ${tip(tab.tip)}>
          ${tab.name}
        </button>
      `).join("")}
      <button class="help-toggle" onclick="toggleHelp()" ${tip("Show or hide the short tutorial brief.")}>${helpOpen ? "Hide Help" : "Show Help"}</button>
    </nav>
  `;
}

function tabPanel() {
  if (activeTab === "vineyard") {
    return `${artBanner("vineyard", "Vineyard blocks, weather, and disease pressure")}${vineyardPanel()}`;
  }
  if (activeTab === "commercial") {
    return `${artBanner("commercial", "Tasting room, buyers, and distribution")}${marketPanel()}${analyticsPanel()}${ordersPanel()}`;
  }
  if (activeTab === "estate") {
    return `${artBanner("cellar", "Cellar, bottling line, tanks, and barrels")}${buildingsPanel()}${vintageCellarPanel()}`;
  }
  if (activeTab === "people") {
    return `${staffPanel()}`;
  }
  return `${overviewPanel()}${analyticsPanel()}${marketPanel()}${ordersPanel()}`;
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
          ${kpi("Cash", money(state.cash), "Available cash after operating costs, sales, debt draws, and repayments. Running out forces credit-line use.", state.cash < 0 ? "danger" : "")}
          ${kpi("Prestige", `${state.prestige}/120`, "Reputation with critics, buyers, and collectors. Win requires 82+ prestige.")}
          ${kpi("Demand", `${state.demand}/130`, "Commercial pull for your wine. Higher demand improves direct sales and buyer interest.")}
          ${kpi("Quality", `${state.quality}/120`, "Current house quality. Vineyard health, weather, cellar work, and barrels move this. Decays faster above 85.")}
          ${kpi("Morale", `${state.morale}/100`, "Staff and crew confidence. Below 20 loses an action/month and triggers labor events; 0 ends the game.", state.morale < 20 ? "danger" : state.morale < 40 ? "warn" : "")}
          ${kpi("Grape CE", totalGrapes(state), "Case-equivalent grapes across all vintage lots. Harvest adds these; cellar work converts them to bulk wine.")}
          ${kpi("Bulk CE", totalBulkWine(state), "Case-equivalent bulk wine aging across all vintage lots. Bottling converts this into finished cases.")}
          ${kpi("Cases", state.inventory.cases, "Finished cases ready to sell or reserve for contracts. Passive direct sales can reduce this at month close.")}
          ${kpi("House Style", `${state.profile ?? 50} · ${profileLabel(state.profile ?? 50)}`, `Profile ${state.profile ?? 50}/100. Commercial end: higher demand, lower price ceiling. Artisan end: lower demand, higher price ceiling and prestige.`)}
        </div>
        <div class="top-actions">
          <button onclick="saveGame()">Save</button>
          <button onclick="advanceMonth()" class="primary" ${state.event || state.gameOver ? "disabled" : ""}>End month</button>
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
  return `
    <section class="panel event-banner ${state.event.image ? "with-art" : ""}">
      ${state.event.image ? `<img src="${state.event.image}" alt="${state.event.title}">` : ""}
      <div>
        <strong>${state.event.title}</strong>
        <div class="small">${state.event.body}</div>
        <div class="event-buttons">
          ${state.event.choices.map((choice, index) => {
            const effectiveCost = choice.insured && state.insurance?.crop ? Math.round((choice.cost || 0) * 0.2) : (choice.cost || 0);
            const costLabel = choice.cost ? (effectiveCost < choice.cost ? ` (${money(effectiveCost)} · insured)` : ` (${money(choice.cost)})`) : "";
            return `
            <button class="event-choice" onclick="resolveEvent(${index})" ${effectiveCost && state.cash < effectiveCost ? "disabled" : ""}>
              <span class="event-choice-label">${choice.label}${costLabel}</span>
              ${choice.hint ? `<span class="event-choice-hint">${escapeHtml(choice.hint)}</span>` : ""}
            </button>
          `;
          }).join("")}
        </div>
      </div>
    </section>
  `;
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
        <span>Draw from the credit line to cover operations — uncovered overdraft accrues at a penalty rate and drains morale.</span>
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
          <p>Most turns start with three placements. The available work changes by season, and September is the harvest month.</p>
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
        ${Object.entries(SEASON_WINDOWS).map(([season, months]) => `<span><strong>${season}</strong> ${months}</span>`).join("")}
      </div>
    </section>
  `;
}

function overviewPanel() {
  const worth = netWorth(state);
  return `
    ${estateDashboard()}
    <section class="panel overview-panel">
      <div class="panel-head">
        <h2>Operating Brief</h2>
        <span class="small">Win: 82 prestige, ${money(difficulty().winNetWorth)} net worth, 12 fulfilled orders</span>
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
        <button class="brief-card" onclick="setTab('estate')" ${tip("Upgrade tanks, barrels, bottling, tasting room, weather lab, and vineyard blocks.")}>
          <span>Estate Value</span>
          <strong>${money(worth)}</strong>
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
        <button class="dash-col" onclick="setTab('estate')" ${tip("Upgrade cellar infrastructure and view vintage aging pipeline.")}>
          <div class="dash-col-head">Cellar &amp; Production</div>
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
        ${lineChart("Net Worth Trend", state.history, "netWorth", { format: money, tone: "blue" })}
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
        ${pnlLine("Operating / vineyard / cellar", -costs.operating)}
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
          const closedPnl = last.revenue + tourClub - last.fixedCost;
          return `
          ${pnlLine("Sales revenue", last.revenue, true)}
          ${tourClub ? pnlLine("Tour & club income", tourClub, true) : ""}
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
      contractRevenue += Math.round(order.cases * s.price * 12 * premium);
      contractCases += order.cases;
      available -= order.cases;
    });
  const costBreakdown = fixedCostBreakdown(s);
  const fixedCost = costBreakdown.total;
  const harvestLabor = isHarvestMonth(s.month) ? harvestLaborEstimate(s) : 0;
  const { tourIncome, clubIncome } = estimatePassiveStaffIncome(s);
  return {
    directCases: direct.cases,
    directRevenue: direct.revenue,
    contractCases,
    contractRevenue,
    tourIncome,
    clubIncome,
    fixedCost,
    costBreakdown,
    harvestLabor,
    netCash: direct.revenue + contractRevenue + tourIncome + clubIncome - fixedCost - harvestLabor
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
  const format = options.format || (value => Math.round(value));
  const values = data.map(point => point[key]);
  const min = Math.min(0, ...values);
  const max = Math.max(options.max || 1, ...values);
  const range = Math.max(1, max - min);
  const points = data.map((point, index) => {
    const x = data.length === 1 ? 50 : 8 + (index / (data.length - 1)) * 84;
    const y = 88 - ((point[key] - min) / range) * 76;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return `
    <div class="chart-card">
      <div class="chart-head"><strong>${title}</strong><span>${format(data[data.length - 1][key])}</span></div>
      <svg class="line-chart ${options.tone || "blue"}" viewBox="0 0 100 100" role="img" aria-label="${title}">
        <line x1="6" y1="88" x2="96" y2="88"></line>
        <polyline points="${points}"></polyline>
        ${data.map((point, index) => {
          const x = data.length === 1 ? 50 : 8 + (index / (data.length - 1)) * 84;
          const y = 88 - ((point[key] - min) / range) * 76;
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.2"><title>Month ${point.month}: ${format(point[key])}</title></circle>`;
        }).join("")}
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
          const young = (row.matureMonth || 1) > state.month;
          const diseaseTone = row.disease > 65 ? "danger" : row.disease > 40 ? "warn" : "ok";
          const waterDev = row.water - optimalWater;
          const waterTone = Math.abs(waterDev) > 25 ? (waterDev < -35 ? "danger" : "warn") : "ok";
          const waterLabel = waterDev < -30 ? "drought stress" : waterDev < -15 ? "mild deficit" : waterDev > 25 ? "excess water" : "balanced";
          return `
            <div class="row-card">
              <div class="row-info">
                <div class="row-name">${row.name}${young ? ` <em class="row-badge">young · first harvest ${monthDateLabel(firstHarvestMonth(row.matureMonth))}</em>` : ""}</div>
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
  if (action.id === "bottle") {
    const ready = readyVintages(s);
    if (!ready.length && totalBulkWine(s) === 0) return { text: "No bulk wine to bottle", hard: true };
    if (!ready.length) {
      const oldest = (s.vintages || []).filter(v => v.bulkWine > 0).sort((a, b) => a.agingMonths - b.agingMonths)[0];
      if (oldest) return { text: `${oldest.label} needs ${oldest.agingTarget - oldest.agingMonths}mo more aging`, hard: true };
    }
  }
  if (action.id === "cellar" && totalGrapes(s) === 0) return { text: "No grapes — cellar quality work only", hard: false };
  if ((action.id === "sales" || action.id === "hospitality") && availableCases(s) === 0) return { text: "No free cases — generates demand only", hard: false };
  return null;
}

function actionsPanel() {
  const sorted = [...ACTIONS].sort((a, b) => Number(isActionAvailable(b, state)) - Number(isActionAvailable(a, state)));
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Monthly Actions ${helpIcon("Actions are your core worker placements. You can end the month early, but unused placements are lost.")}</h2>
        <span class="small">${state.actionsLeft} placements left</span>
      </div>
      <div class="actions">
        ${sorted.map(action => {
          const cost = actionCost(action, state);
          const available = isActionAvailable(action, state);
          const invNote = actionInventoryNote(action, state);
          const disabled = action.navigateTab
            ? state.event || state.gameOver
            : !available || state.actionsLeft <= 0 || state.cash < cost || state.event || state.gameOver || (invNote && invNote.hard);
          const effectText = invNote
            ? invNote.text
            : available ? actionConsequence(action, state) : `Off-season: available ${seasonListLabel(action.seasons)}`;
          return `
            <button class="action-card ${available ? "" : "offseason"}" onclick="useAction('${action.id}')" ${disabled ? "disabled" : ""}>
              <b>${actionName(action, state)}</b>
              <span>${actionDetail(action, state)}</span>
              <span class="effect">${effectText}</span>
              <em>${action.navigateTab ? "Open Estate" : money(cost)}</em>
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
        <h2>Market and Cellar ${helpIcon("Bottle price affects passive direct sales and whether buyer contracts will accept your offer.")}</h2>
        <span class="small">Net worth ${money(worth)}</span>
      </div>
      <div class="market-line">
        <label>
          <span class="small">List price per bottle <span class="price-anchor-note">anchored ${money(state.monthStartPrice ?? state.price)} · ±${money(PRICE_SWING_CAP)} this month</span></span>
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
  log(state, `Early release: ${lot.label} cut ${remaining} months short. Vintage score −${penalty} (harsh tannins, unintegrated structure).`);
  normalizeState(state);
  render();
}

function sellBulk(lotId, amount) {
  if (!state || state.gameOver) return;
  const lot = (state.vintages || []).find(v => v.id === lotId);
  if (!lot || lot.bulkWine <= 0) return;
  const ce = Math.min(amount, lot.bulkWine);
  const pricePerCe = Math.round(state.price * 12 * 0.55);
  const revenue = ce * pricePerCe;
  lot.bulkWine -= ce;
  state.cash += revenue;
  state.totalRevenue += revenue;
  log(state, `Sold ${ce} CE from ${lot.label} to a négociant at ${money(pricePerCe)}/CE — ${money(revenue)} total.`);
  normalizeState(state);
  render();
}

function buyGrapes() {
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
  log(state, `Purchased ${lotSize} CE of ${v.name} grapes for ${money(total)}.`);
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
    const statusText = isPreagedStock
      ? `${lot.bulkWine} CE ready${bottled ? ` · ${bottled} bottled` : ""}`
      : hasGrapes && !hasBulk
      ? `${lot.grapes} CE · ferment first`
      : isReady
      ? `${lot.bulkWine} CE ready${bottled ? ` · ${bottled} bottled` : ""}`
      : hasBulk
      ? `${monthsLeft}mo left (${aged}/${target})`
      : "";

    const bulkSellPrice = Math.round(state.price * 12 * 0.55);
    const agedRatio = target > 0 ? (lot.agingMonths || 0) / target : 1;
    const canEarlyRelease = hasBulk && !isReady && !isPreagedStock && target > 0 && agedRatio >= 0.25;
    const earlyPenalty = canEarlyRelease ? ((1 - agedRatio) > 0.33 ? 2 : 1) : 0;
    return `
      <div class="gantt-row">
        <div class="gantt-meta">
          <span class="gantt-label">${escapeHtml(lot.label)}${lot.earlyReleased ? ' <em class="early-badge">early</em>' : ""}</span>
          <span class="gantt-score">${vintageScoreStars(lot.score)}${lot.criticScore ? ` <span class="critic-score">${lot.criticScore}pts</span>` : ""}</span>
        </div>
        <div class="gantt-track">
          ${barHtml}
        </div>
        <div class="gantt-status ${isReady || isPreagedStock ? "ready" : ""}">${statusText}</div>
        ${hasBulk ? `<div class="lot-actions">
          <button class="ghost compact bulk-sell-btn" onclick="sellBulk('${lot.id}', 100)" title="Sell 100 CE to a négociant at ${money(bulkSellPrice)}/CE">Sell bulk · ${money(bulkSellPrice * 100)}</button>
          ${canEarlyRelease ? `<button class="ghost compact early-release-btn" onclick="earlyRelease('${lot.id}')" title="Force bottling now — vintage score −${earlyPenalty} for cutting ${monthsLeft} months short">Early release −${earlyPenalty}★</button>` : ""}
        </div>` : ""}
      </div>
    `;
  });

  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Vintage Cellar ${helpIcon("Each harvest creates a lot. Cellar work ferments grapes to bulk wine; aging time must pass before bottling is allowed.")}</h2>
        <span class="small">${vintageScoreLabel(state.currentVintageScore)} vintage on shelves ${vintageScoreStars(state.currentVintageScore)}</span>
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
            : state.actionsLeft <= 0 ? "no action slots left this month"
            : state.cash < gpPrice * 200 ? `need ${money(gpPrice * 200)} (have ${money(state.cash)})`
            : null;
          return `<button onclick="buyGrapes()" ${why || state.gameOver ? "disabled" : ""} ${why ? `title="${why}"` : ""}>${why ? `Buy grapes — ${why}` : "Buy grapes"}</button>`;
        })()}
      </div>
    </section>
  `;
}

function harvestForecast(s) {
  const monthsUntilHarvest = Array.from({ length: 12 }, (_, i) => i).find(offset => isHarvestMonth(s.month + offset)) || 0;
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
        <h2>Buyer Queue ${helpIcon("Accepting a buyer reserves cases. Fulfill before the due month to gain cash, demand, and prestige.")}</h2>
        <span class="small">${state.fulfilled} fulfilled • ${state.missed} missed</span>
      </div>
      <div class="orders">
        ${state.orders.length ? state.orders.map(orderView).join("") : `<div class="empty">No active buyer requests. Sales actions and events can create new demand.</div>`}
      </div>
    </section>
  `;
}

function orderView(order) {
  const aboveCeiling = !order.accepted && state.price > order.maxPrice;
  return `
    <div class="order">
      <div class="order-head">
        <strong>${order.buyer}</strong>
        <span class="tag">${order.accepted ? `Due ${monthDateLabel(order.due)}` : `Offer expires ${monthDateLabel(order.expires)}`}</span>
      </div>
      <p>${order.cases} cases • ceiling ${money(order.maxPrice)}/bottle • ${order.accepted ? `penalty ${money(order.penalty)}` : aboveCeiling ? `current list ${money(state.price)} is too high` : `delivery due ${monthDateLabel(order.due)}`}</p>
      <div class="order-actions">
        ${order.accepted
          ? `<button onclick="fulfillOrder('${order.id}')" ${state.inventory.cases < order.cases ? "disabled" : ""}>Fulfill</button>`
          : `<button onclick="acceptOrder('${order.id}')" ${aboveCeiling ? "disabled" : ""}>${aboveCeiling ? "Above buyer ceiling" : "Accept at list price"}</button>`}
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
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Personnel ${helpIcon("Named staff add strong bonuses and quirks. Salaries are paid every month.")}</h2>
        <span class="small">Payroll ${money(state.staff.reduce((sum, id) => sum + (STAFF_POOL.find(p => p.id === id)?.salary || 0), 0))}/mo</span>
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
  const signing = Math.round(person.salary * 1.4);
  const progress = employed ? ensureStaffProgress(state, person.id) : null;
  return `
    <div class="staff">
      <div class="staff-head">
        <div class="staff-id">
          <img src="assets/${person.portrait || person.id}.png" alt="${person.name}" onerror="this.style.display='none'">
          <strong>${person.name}</strong>
        </div>
        <span class="tag">${person.role}</span>
      </div>
      <p>${person.text}</p>
      <div class="staff-traits">
        ${person.traits.map(trait => `<span class="tag">${trait}</span>`).join("")}
        <span class="tag">${money(effectiveSalary(state, person))}/mo</span>
      </div>
      ${(() => {
        const pTraits = getStaffTraits(state, person.id);
        if (!pTraits.length) return "";
        return `<div class="personality-traits">${pTraits.map(t =>
          `<span class="tag ${t.positive ? "trait-virtue" : "trait-vice"}" data-tip="${escapeHtml(t.flavor)}" aria-label="${escapeHtml(t.flavor)}">${t.name} — ${t.summary}</span>`
        ).join("")}</div>`;
      })()}
      <div class="staff-actions">
        ${employed
          ? `<button class="ghost" onclick="fireStaff('${person.id}')">Release</button>`
          : `<button onclick="hireStaff('${person.id}')" ${state.cash < signing || state.staff.length >= 5 ? "disabled" : ""}>Hire ${money(signing)}</button>`}
      </div>
      ${employed ? advancementTree(person, progress) : ""}
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
        ${state.log.length ? state.log.map(entry => `<div class="log-entry"><strong>M${entry.month}</strong> ${entry.text}</div>`).join("") : `<div class="empty">No entries yet.</div>`}
      </div>
    </section>
  `;
}

function namingModal() {
  const lot = (state.vintages || []).find(v => v.id === state.pendingNaming);
  if (!lot) { state.pendingNaming = null; return ""; }
  const tier = profileTier(state.profile ?? 50);
  const pool = VINTAGE_NAMES[tier] || VINTAGE_NAMES.classic;
  const options = [...pool].sort(() => 0.5 - rand()).slice(0, 4);
  return `
    <div class="modal">
      <div class="modal-card naming-modal-card">
        <h2>Name this release</h2>
        <p>The <strong>${escapeHtml(lot.label)}</strong> earned a critic score of <strong>${lot.criticScore}/100</strong>. Give it a lasting name to mark it in the cellar book — prestige bonus included.</p>
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
  return `
    <div class="modal">
      <div class="modal-card intro-modal-card">
        <h2>Welcome to ${escapeHtml(state.wineryName)}</h2>
        <p class="intro-scene">You've taken the helm of a small ${r?.name || "regional"} estate. Five years to build something lasting — or fold under the pressure.</p>
        <div class="intro-grid">
          <div class="intro-section">
            <div class="intro-head">On Hand</div>
            <div class="intro-row"><span>Cash</span><strong>${money(state.cash)}</strong></div>
            <div class="intro-row"><span>Bottled cases</span><strong>${state.inventory.cases}</strong></div>
            <div class="intro-row"><span>Legacy vintage</span><strong>${score === 3 ? "Average (★★★☆☆)" : vintageScoreStars(score) + " " + vintageScoreLabel(score)} — drinkable, not distinguished</strong></div>
            <div class="intro-row"><span>Bulk wine in tank</span><strong>${(legacyVintage?.bulkWine ?? 0)} CE — ready to bottle</strong></div>
          </div>
          <div class="intro-section">
            <div class="intro-head">Vintage Score Guide</div>
            <div class="intro-row score-guide"><span>★☆☆☆☆ Poor</span><em>Deep discount; hard to move</em></div>
            <div class="intro-row score-guide"><span>★★☆☆☆ Below Average</span><em>Below-market pricing</em></div>
            <div class="intro-row score-guide"><span>★★★☆☆ Average</span><em>Standard trade pricing</em></div>
            <div class="intro-row score-guide"><span>★★★★☆ Good</span><em>Premium tier, restaurant buyers</em></div>
            <div class="intro-row score-guide"><span>★★★★★ Exceptional</span><em>Collector demand, allocation list</em></div>
          </div>
          <div class="intro-section intro-goals">
            <div class="intro-head">Year One Priorities</div>
            <div class="intro-goal">Hire your first staff member — they define your strategic direction.</div>
            <div class="intro-goal">Sell the inherited inventory to build a cash cushion.</div>
            <div class="intro-goal">Keep vineyard disease below 40 heading into harvest.</div>
            <div class="intro-goal">Bottle your first real vintage before year's end.</div>
          </div>
        </div>
        <div class="top-actions">
          <button class="primary" onclick="dismissIntro()">Begin</button>
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
  const worth = netWorth(state);
  return `
    <div class="modal">
      <div class="modal-card">
        <h2>${state.gameOver.title}</h2>
        <p>${state.gameOver.text}</p>
        <div class="score-grid">
          <div class="stat-box"><span>Result</span><strong>${state.gameOver.win ? "Win" : "Loss"}</strong></div>
          <div class="stat-box"><span>Net worth</span><strong>${money(worth)}</strong></div>
          <div class="stat-box"><span>Prestige</span><strong>${state.prestige}</strong></div>
          <div class="stat-box"><span>Cases sold</span><strong>${state.totalSold}</strong></div>
          <div class="stat-box"><span>Orders fulfilled</span><strong>${state.fulfilled}</strong></div>
          <div class="stat-box"><span>Total revenue</span><strong>${money(state.totalRevenue)}</strong></div>
        </div>
        <div class="top-actions">
          <button onclick="state.gameOver = null; render()">Keep playing</button>
          <button class="primary" onclick="resetGame()">New estate</button>
        </div>
      </div>
    </div>
  `;
}

function render() {
  document.body.dataset.region = state?.region || "";
  app.innerHTML = state ? gameView() : setupView();
}

window.startGame = startGame;
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
window.dismissHarvestReport = dismissHarvestReport;
window.buyGrapes = buyGrapes;
window.earlyRelease = earlyRelease;
window.sellBulk = sellBulk;
window.chooseName = chooseName;
window.skipNaming = skipNaming;
window.toggleInsurance = toggleInsurance;
window.setStash = setStash;

render();
