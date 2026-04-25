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
  }
];

const VARIETALS = {
  cabernet: {
    name: "Cabernet Sauvignon",
    tags: ["Ages well", "Premium red"],
    yield: 0.95,
    quality: 1.08,
    demand: 1.08,
    difficulty: 1.1,
    barrelNeed: 1.2,
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
    blurb: "Generous yield and strong supermarket appeal."
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
  }
];

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
  ]
};

const BUILDINGS = [
  {
    id: "block",
    name: "New Vineyard Block",
    baseCost: 32000,
    text: "Adds a productive row and raises long-run grape output.",
    max: 4
  },
  {
    id: "tank",
    name: "Stainless Tanks",
    baseCost: 22000,
    text: "More fermentation capacity. Converts grapes into wine faster.",
    max: 5
  },
  {
    id: "barrel",
    name: "Barrel Program",
    baseCost: 26000,
    text: "Raises quality and prestige, especially for oak-friendly varietals.",
    max: 5
  },
  {
    id: "line",
    name: "Bottling Line",
    baseCost: 30000,
    text: "Raises monthly bottling throughput and lowers per-case cost.",
    max: 4
  },
  {
    id: "room",
    name: "Tasting Room",
    baseCost: 24000,
    text: "Direct sales, demand growth, and staff morale.",
    max: 4
  },
  {
    id: "lab",
    name: "Weather Lab",
    baseCost: 18000,
    text: "Reduces surprise damage and unlocks steadier harvests.",
    max: 3
  }
];

const EVENT_DECK = [
  {
    id: "frost",
    title: "Late Frost Warning",
    body: "Cold air is pooling in the vineyard. Fans and candles are expensive, but losing buds is worse.",
    type: "frost",
    choices: [
      { label: "Run frost protection", cost: 9000, effect: s => adjustRows(s, -2, "frost") },
      { label: "Risk it", effect: s => adjustRows(s, 2, "frost") }
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
        effect: s => {
          const roll = rand();
          const gain = roll + s.quality / 100 > 0.72 ? 9 : 2;
          s.prestige += gain;
          s.demand += gain * 0.8;
          log(s, gain > 5 ? "The critic loved the sample. Prestige surges." : "The critic was polite. You gained a little visibility.");
        }
      },
      { label: "Decline gracefully", effect: s => { s.morale += 2; s.prestige -= 1; } }
    ]
  },
  {
    id: "union",
    title: "Cellar Crew Negotiation",
    body: "Your crew wants predictable hours before harvest pressure builds.",
    choices: [
      { label: "Raise wages", cost: 6500, effect: s => { s.morale += 10; s.quality += 2; } },
      { label: "Hold the line", effect: s => { s.morale -= 9; s.cash += 1200; } }
    ]
  },
  {
    id: "restaurant",
    title: "Restaurant Group Tasting",
    body: "A restaurant buyer asks for a reliable monthly allocation and sharp pricing.",
    choices: [
      { label: "Court the account", cost: 2500, effect: s => addOrder(s, "restaurant") },
      { label: "Keep allocation flexible", effect: s => { s.demand += 2; } }
    ]
  },
  {
    id: "mildew",
    title: "Powdery Mildew Pressure",
    body: "Humid nights are feeding spores in the canopy.",
    type: "rain",
    choices: [
      { label: "Organic spray pass", cost: 7200, effect: s => adjustRows(s, -2, "mildew") },
      { label: "Wait for sun", effect: s => adjustRows(s, 2, "mildew") }
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
        effect: s => {
          s.buildings.tank += 1;
          s.buildings.line += rand() > 0.5 ? 1 : 0;
          log(s, "You landed useful equipment below replacement cost.");
        }
      },
      { label: "Save cash", effect: s => { s.cash += 1500; s.prestige -= 1; } }
    ]
  },
  {
    id: "viral",
    title: "A Bottle Goes Viral",
    body: "A short video of your tasting room has started spreading.",
    choices: [
      { label: "Lean into the buzz", cost: 4200, effect: s => { s.demand += 13; s.prestige += 4; s.morale += 2; } },
      { label: "Do nothing weird", effect: s => { s.demand += 5; } }
    ]
  },
  {
    id: "glass",
    title: "Glass Shortage",
    body: "Bottle suppliers are raising prices and prioritizing bigger customers.",
    choices: [
      { label: "Prepay supplier", cost: 9500, effect: s => { s.inventory.glass += 1000; s.influence += 2; } },
      { label: "Stretch inventory", effect: s => { s.marketMods.glassShortage = 4; s.morale -= 2; } }
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
  }
};

const ACTIONS = [
  {
    id: "vineyard",
    name: "Work Vineyard",
    detail: "Reduce row threats, raise morale, and protect harvest quality.",
    cost: 2600,
    apply: s => {
      adjustRows(s, -2);
      s.morale += staffBonus(s, "vineyard") + 1;
      s.quality += 1 + staffBonus(s, "vineyard");
      log(s, "The vineyard crew thinned shoots, cleaned canopies, and lowered disease pressure.");
    }
  },
  {
    id: "cellar",
    name: "Blend and Barrel",
    detail: "Convert grapes, improve quality, and build prestige in the cellar.",
    cost: 3000,
    apply: s => {
      const capacity = 220 + s.buildings.tank * 120 + staffBonus(s, "cellar") * 70;
      const used = Math.min(s.inventory.grapes, capacity);
      s.inventory.grapes -= used;
      s.inventory.bulkWine += Math.round(used * 0.72);
      s.quality += 2 + s.buildings.barrel + staffBonus(s, "cellar");
      s.prestige += Math.max(1, Math.floor((s.buildings.barrel * varietal(s).barrelNeed) / 2));
      log(s, `Cellar work converted ${Math.round(used)} grape units into maturing wine.`);
    }
  },
  {
    id: "bottle",
    name: "Bottle Cases",
    detail: "Turn bulk wine into sellable cases. Bottles are the cash engine.",
    cost: 2400,
    apply: s => {
      const glassPenalty = s.marketMods.glassShortage ? 0.72 : 1;
      const capacity = Math.floor((280 + s.buildings.line * 170 + staffBonus(s, "bottling") * 95) * glassPenalty);
      const bulkNeeded = Math.min(s.inventory.bulkWine, capacity);
      const glassNeeded = Math.min(s.inventory.glass, bulkNeeded);
      const cases = Math.floor(Math.min(bulkNeeded, glassNeeded));
      s.inventory.bulkWine -= cases;
      s.inventory.glass -= cases;
      s.inventory.cases += cases;
      s.cash -= Math.round(cases * bottlingCost(s));
      log(s, `Bottled ${cases} cases.`);
    }
  },
  {
    id: "sales",
    name: "Sell and Court Buyers",
    detail: "Generate direct sales, new orders, and market heat.",
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
    detail: "Tasting room service converts visitors into loyalty and morale.",
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
    detail: "Lower volatility, find grants, and improve supplier terms.",
    cost: 800,
    apply: s => {
      const gain = 5500 + staffBonus(s, "finance") * 2200 + Math.floor(s.influence * 120);
      s.cash += gain;
      s.influence += 2;
      s.demand -= 1;
      log(s, `Finance found ${money(gain)} in grants, rebates, and better terms.`);
    }
  }
];

const app = document.getElementById("app");
let state = null;
let setup = { region: "napa", varietal: "cabernet", philosophy: "classic" };
let activeTab = "overview";
let helpOpen = true;

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

function rand() {
  return Math.random();
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

function createState() {
  const r = selectedRegion();
  const v = selectedVarietal();
  const p = selectedPhilosophy();
  return {
    month: 1,
    maxMonths: 60,
    season: "Budbreak",
    region: r.id,
    varietal: setup.varietal,
    philosophy: p.id,
    cash: r.cash,
    debt: 0,
    prestige: r.prestige,
    demand: Math.round(r.demand * v.demand * p.demand),
    morale: 58,
    quality: Math.round(48 * v.quality * p.quality * (r.qualityMod || 1)),
    sustainability: 45 + p.sustainability,
    influence: r.influence || 2,
    price: 28,
    actionsLeft: 3,
    staff: [],
    staffProgress: {},
    staffMarket: ["ines", "asha", "marco"],
    buildings: { block: 0, tank: 1, barrel: 1, line: 0, room: 0, lab: 0 },
    rows: makeRows(4),
    inventory: { grapes: 800, bulkWine: 620, cases: 360, glass: 1600 },
    orders: [],
    log: [],
    marketHeat: 52,
    marketMods: {},
    event: null,
    lastWeather: "Clear",
    tutorialSeen: false,
    history: [],
    totalSold: 0,
    totalRevenue: 0,
    fulfilled: 0,
    missed: 0,
    gameOver: null
  };
}

function makeRows(count) {
  const names = ["North Slope", "River Bench", "Old Block", "Stone Terrace", "Hill Parcel", "Windbreak", "Village Edge", "Reservoir Row"];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i],
    health: 82 + randint(-4, 6),
    threat: randint(0, 2),
    threatName: "weeds"
  }));
}

function log(s, text) {
  s.log.unshift({ month: s.month, text });
  s.log = s.log.slice(0, 45);
}

function startGame() {
  state = createState();
  activeTab = "overview";
  helpOpen = true;
  addOrder(state, "distributor");
  addOrder(state, "restaurant");
  log(state, `${region().name} estate founded around ${varietal().name}.`);
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
  ensureHistory(state);
  ensureAllStaffProgress(state);
  helpOpen = !state.tutorialSeen;
  render();
}

function resetGame() {
  localStorage.removeItem("cellar-baron-save");
  state = null;
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
    return mod * (person?.effects.eventRisk || 1);
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
  const salaries = s.staff.reduce((sum, id) => sum + (STAFF_POOL.find(p => p.id === id)?.salary || 0), 0);
  const base = 6200 + s.rows.length * 1050 + s.buildings.tank * 520 + s.buildings.barrel * 620 + s.buildings.room * 720;
  return Math.round((base + salaries) * region().costMod * philosophy().cost * staffCostMod(s));
}

function netWorth(s) {
  return s.cash - s.debt + s.inventory.cases * s.price * 12 + s.inventory.bulkWine * 12 + s.inventory.grapes * 7;
}

function ensureHistory(s) {
  if (!Array.isArray(s.history)) s.history = [];
  if (typeof s.totalRevenue !== "number") s.totalRevenue = 0;
  if (typeof s.totalSold !== "number") s.totalSold = 0;
}

function recordHistory(s, fixedCost) {
  ensureHistory(s);
  const last = s.history.length ? s.history[s.history.length - 1] : null;
  const previousRevenue = last ? last.totalRevenue : 0;
  const previousSold = last ? last.totalSold : 0;
  s.history.push({
    month: s.month,
    revenue: Math.max(0, s.totalRevenue - previousRevenue),
    casesSold: Math.max(0, s.totalSold - previousSold),
    fixedCost,
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
  const desirability = (s.demand * 0.9 + s.prestige * 0.8 + s.quality * 0.7 + s.marketHeat * 0.6) / 4;
  const priceResistance = Math.pow(s.price / 28, 1.55);
  const capacity = 70 + s.buildings.room * 80 + staffBonus(s, "sales") * 45 + staffBonus(s, "brand") * 55;
  const cases = Math.min(availableCases(s), Math.max(0, Math.floor((capacity * desirability) / (65 * priceResistance))));
  const premium = 1 + Math.max(0, s.prestige - 45) / 210 + staffBonus(s, "brand") * 0.06;
  const revenue = Math.round(cases * s.price * 12 * premium);
  return { cases, revenue };
}

function reservedCases(s) {
  return s.orders.reduce((sum, order) => sum + (order.accepted ? order.cases : 0), 0);
}

function availableCases(s) {
  return Math.max(0, s.inventory.cases - reservedCases(s));
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
    progress.xp += amount;
  });
}

function grantActionXp(s, actionId) {
  grantStaffXp(s, ACTION_XP[actionId] || [], 2);
}

function grantMonthlyStaffXp(s) {
  grantStaffXp(s, s.staff, 1);
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
  const available = Object.keys(ORDER_TYPES).filter(id => !forcedType || id === forcedType);
  const typeId = forcedType || available[randint(0, available.length - 1)];
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
    accepted: false,
    penalty: Math.round(cases * maxPrice * 12 * 0.18)
  });
}

function acceptOrder(id) {
  const order = state.orders.find(o => o.id === id);
  if (!order) return;
  if (state.price > order.maxPrice) {
    log(state, `${order.buyer} passed. Your list price was above their ceiling.`);
    state.orders = state.orders.filter(o => o.id !== id);
  } else {
    order.accepted = true;
    state.demand += 1;
    log(state, `${order.buyer} signed for ${order.cases} cases at ${money(state.price)} per bottle.`);
  }
  render();
}

function fulfillOrder(id) {
  const order = state.orders.find(o => o.id === id);
  if (!order || !order.accepted || state.inventory.cases < order.cases) return;
  const premium = 1 + Math.max(0, state.quality - 55) / 260;
  const revenue = Math.round(order.cases * state.price * 12 * premium);
  state.inventory.cases -= order.cases;
  state.cash += revenue;
  state.prestige += order.type === "club" || order.type === "restaurant" ? 3 : 1;
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

function adjustRows(s, delta, specificThreat) {
  s.rows.forEach(row => {
    row.threat = clamp(row.threat + delta, 0, 9);
    if (specificThreat) row.threatName = specificThreat;
    row.health = clamp(row.health - Math.max(0, delta) * 3 + Math.max(0, -delta) * 2, 12, 100);
  });
}

function buyBuilding(id) {
  const b = BUILDINGS.find(item => item.id === id);
  const owned = state.buildings[id] || 0;
  if (!b || owned >= b.max || state.actionsLeft <= 0 || state.event || state.gameOver) return;
  const discount = buildDiscountMod(state);
  const cost = Math.round(b.baseCost * Math.pow(1.28, owned) * region().costMod * discount);
  if (state.cash < cost) return;
  state.cash -= cost;
  state.buildings[id] = owned + 1;
  if (id === "block") {
    state.rows.push(makeRows(1)[0]);
    state.rows[state.rows.length - 1].id = state.rows.length;
  }
  if (id === "room") state.demand += 4;
  if (id === "barrel") state.quality += Math.round(varietal().barrelNeed * 2);
  state.actionsLeft -= 1;
  log(state, `Built ${b.name}.`);
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
    state.staffMarket.push(candidates[randint(0, candidates.length - 1)].id);
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
  if (state.actionsLeft <= 0 || state.event || state.gameOver) return;
  const action = ACTIONS.find(a => a.id === id);
  if (!action) return;
  const cost = Math.round(action.cost * region().costMod * philosophy().cost);
  if (state.cash < cost) return;
  state.cash -= cost;
  action.apply(state);
  grantActionXp(state, id);
  state.actionsLeft -= 1;
  normalizeState(state);
  checkGameOver();
  render();
}

function normalizeState(s) {
  s.cash = Math.round(s.cash);
  s.prestige = clamp(Math.round(s.prestige), 0, 120);
  s.demand = clamp(Math.round(s.demand), 0, 130);
  s.morale = clamp(Math.round(s.morale), 0, 100);
  s.quality = clamp(Math.round(s.quality), 0, 120);
  s.sustainability = clamp(Math.round(s.sustainability), 0, 100);
  s.influence = clamp(Math.round(s.influence), 0, 100);
}

function advanceMonth() {
  if (state.event || state.gameOver) return;
  monthlyTick(state);
  checkGameOver();
  render();
}

function monthlyTick(s) {
  const sales = directSales(s);
  s.inventory.cases -= sales.cases;
  s.cash += sales.revenue;
  s.totalSold += sales.cases;
  s.totalRevenue += sales.revenue;

  const costs = fixedCosts(s);
  s.cash -= costs;
  s.inventory.glass += 120 + s.buildings.line * 70;
  grantMonthlyStaffXp(s);

  applyWeather(s);
  decayAndOrders(s);

  if (isHarvestMonth(s.month)) harvest(s);

  if (rand() < 0.36 * eventRiskMod(s)) {
    s.event = drawEvent(s);
  }

  s.marketHeat = clamp(s.marketHeat + randint(-6, 8) + Math.floor((s.demand - 55) / 16), 10, 100);
  s.demand = clamp(s.demand + Math.floor((s.marketHeat - 50) / 18) - Math.max(0, Math.floor((s.price - 34) / 9)), 0, 130);
  s.quality = clamp(s.quality - 1 + Math.floor(s.morale / 55), 0, 120);
  s.morale = clamp(s.morale - 2 + Math.floor(s.cash / 160000), 0, 100);

  Object.keys(s.marketMods).forEach(key => {
    s.marketMods[key] -= 1;
    if (s.marketMods[key] <= 0) delete s.marketMods[key];
  });

  if (s.cash < -25000) {
    s.debt += Math.abs(s.cash);
    s.cash = 0;
    s.prestige -= 3;
    s.morale -= 5;
    log(s, "The bank covered an overdraft. Debt rose and confidence fell.");
  }

  normalizeState(s);
  recordHistory(s, costs);
  s.month += 1;
  s.actionsLeft = 3 + (s.morale > 78 ? 1 : 0);
  s.season = seasonName(s.month);
  log(s, `Month closed: direct sales ${money(sales.revenue)}, fixed costs ${money(costs)}.`);
}

function seasonName(month) {
  const m = ((month - 1) % 12) + 1;
  if ([1, 2].includes(m)) return "Dormant";
  if ([3, 4].includes(m)) return "Budbreak";
  if ([5, 6].includes(m)) return "Flowering";
  if ([7, 8].includes(m)) return "Veraison";
  if ([9, 10].includes(m)) return "Harvest";
  return "Cellar";
}

function isHarvestMonth(month) {
  const m = ((month - 1) % 12) + 1;
  return m === 9;
}

function applyWeather(s) {
  const r = region();
  const lab = 1 - s.buildings.lab * 0.12;
  const options = [
    { name: "Heat spike", key: "heat", weight: 0.18 * r.weather.heat, delta: 2 },
    { name: "Frost pocket", key: "frost", weight: 0.12 * r.weather.frost, delta: 2 },
    { name: "Wet canopy", key: "rain", weight: 0.17 * r.weather.rain, delta: 2 },
    { name: "Drought stress", key: "drought", weight: 0.14 * r.weather.drought, delta: 2 },
    { name: "Clear skies", key: "clear", weight: 0.39, delta: -1 }
  ];
  const total = options.reduce((sum, o) => sum + o.weight, 0);
  let roll = rand() * total;
  const picked = options.find(o => {
    roll -= o.weight;
    return roll <= 0;
  }) || options[options.length - 1];
  s.lastWeather = picked.name;
  const shield = staffBonus(s, "finance") ? 0.82 : 1;
  s.rows.forEach(row => {
    const pressure = picked.key === "clear" ? -1 : Math.ceil(picked.delta * philosophy().risk * lab * shield * varietal().difficulty);
    row.threat = clamp(row.threat + pressure + randint(-1, 1), 0, 9);
    if (picked.key !== "clear") row.threatName = picked.key;
    row.health = clamp(row.health - Math.max(0, row.threat - 4), 8, 100);
  });
  if (picked.key === "clear") {
    s.quality += 1;
  } else {
    s.quality -= Math.max(0, Math.floor((averageThreat(s) - 4) / 2));
  }
}

function harvest(s) {
  const r = region();
  const v = varietal();
  const p = philosophy();
  const health = s.rows.reduce((sum, row) => sum + row.health - row.threat * 5, 0) / s.rows.length;
  const base = s.rows.length * 260;
  const grapes = Math.max(80, Math.round(base * (health / 82) * v.yield * p.yield * (r.yieldMod || 1)));
  const qualityGain = Math.round((health - 58) / 8 + s.buildings.barrel * 0.7);
  s.inventory.grapes += grapes;
  s.quality += qualityGain;
  s.prestige += qualityGain > 3 ? 2 : 0;
  s.rows.forEach(row => {
    row.threat = Math.max(0, row.threat - 3);
    row.health = clamp(row.health + 12, 20, 100);
  });
  log(s, `Harvest brought in ${grapes} grape units. Vintage quality ${qualityGain >= 0 ? "rose" : "fell"}.`);
}

function averageThreat(s) {
  return s.rows.reduce((sum, row) => sum + row.threat, 0) / s.rows.length;
}

function decayAndOrders(s) {
  s.orders.forEach(order => {
    if (order.accepted && order.due < s.month) {
      s.cash -= order.penalty;
      s.prestige -= 3;
      s.demand -= 4;
      s.morale -= 3;
      s.missed += 1;
      log(s, `Missed ${order.buyer}. Penalty paid: ${money(order.penalty)}.`);
    }
  });
  s.orders = s.orders.filter(order => !order.accepted || order.due >= s.month);
  if (s.month % 3 === 0 || s.orders.length < 2) addOrder(s);
}

function drawEvent(s) {
  const candidates = EVENT_DECK.filter(event => {
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
  if (choice.cost && state.cash < choice.cost) return;
  state.cash -= choice.cost || 0;
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
  if (state.prestige >= 82 && worth >= 380000 && state.fulfilled >= 12) {
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
  } else if (state.debt > 220000 || state.prestige <= 0 || state.morale <= 0) {
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
  const loadButton = localStorage.getItem("cellar-baron-save")
    ? `<button class="ghost" onclick="loadGame()">Load saved estate</button>`
    : "";
  return `
    <main class="setup">
      <div class="setup-inner">
        <section class="hero-copy">
          <h1>Cellar Baron</h1>
          <p>Build a wine estate through five volatile years of vineyard pressure, staff politics, cellar bets, fickle buyers, and pricing decisions.</p>
        </section>
        <section class="setup-panel">
          <h2>Found Your Estate</h2>
          <div class="setup-section">
            <div class="section-title">Region</div>
            <div class="setup-grid">
              ${REGIONS.map(item => choiceButton("region", item.id, item.name, item.blurb, item.tags)).join("")}
            </div>
          </div>
          <div class="setup-section">
            <div class="section-title">Flagship Grape</div>
            <div class="setup-grid">
              ${r.varietals.map(id => {
                const item = VARIETALS[id];
                return choiceButton("varietal", id, item.name, item.blurb, item.tags);
              }).join("")}
            </div>
          </div>
          <div class="setup-section">
            <div class="section-title">House Philosophy</div>
            <div class="setup-grid">
              ${PHILOSOPHIES.map(item => choiceButton("philosophy", item.id, item.name, item.blurb, item.tags)).join("")}
            </div>
          </div>
          <div class="setup-section two-col">
            <div class="stat-box"><span>Opening cash</span><strong>${money(r.cash)}</strong></div>
            <div class="stat-box"><span>Starting demand</span><strong>${Math.round(r.demand * v.demand * p.demand)}</strong></div>
          </div>
          <div class="setup-section top-actions">
            ${loadButton}
            <button class="primary" onclick="startGame()">Start vintage run</button>
          </div>
        </section>
      </div>
    </main>
  `;
}

function choiceButton(kind, id, name, blurb, tags) {
  const selected = setup[kind] === id ? " selected" : "";
  return `
    <button class="choice${selected}" onclick="selectSetup('${kind}', '${id}')">
      <strong>${iconFor(kind)} ${name}</strong>
      <p>${blurb}</p>
      <span class="tags">${tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</span>
    </button>
  `;
}

function iconFor(kind) {
  if (kind === "region") return "◎";
  if (kind === "varietal") return "●";
  return "◆";
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
      ${eventPanel()}
      ${helpOpen ? tutorialPanel() : ""}
      <div class="tab-layout">
        <div class="tab-main">
          ${tabPanel()}
        </div>
        <aside class="side-rail">
          ${actionsPanel()}
          ${ledgerPanel()}
        </aside>
      </div>
    </main>
    ${state.gameOver ? gameOverModal() : ""}
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
    return `${artBanner("cellar", "Cellar, bottling line, tanks, and barrels")}${buildingsPanel()}${marketPanel()}`;
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
          <div class="mark">CB</div>
          <div>
            <h1>Cellar Baron</h1>
            <p>${region().name} • ${varietal().name} • ${philosophy().name}</p>
          </div>
        </div>
        <div class="kpis">
          ${kpi("Month", `${state.month}/${state.maxMonths}`)}
          ${kpi("Cash", money(state.cash))}
          ${kpi("Prestige", state.prestige)}
          ${kpi("Demand", state.demand)}
          ${kpi("Quality", state.quality)}
          ${kpi("Morale", state.morale)}
          ${kpi("Cases", state.inventory.cases)}
          ${kpi("Actions", state.actionsLeft)}
        </div>
        <div class="top-actions">
          <button onclick="saveGame()">Save</button>
          <button onclick="advanceMonth()" class="primary" ${state.event || state.gameOver ? "disabled" : ""}>End month</button>
        </div>
      </div>
    </header>
  `;
}

function kpi(label, value) {
  return `<div class="kpi"><span>${label}</span><strong>${value}</strong></div>`;
}

function eventPanel() {
  if (!state.event) return "";
  return `
    <section class="panel event-banner">
      <strong>${state.event.title}</strong>
      <div class="small">${state.event.body}</div>
      <div class="event-buttons">
        ${state.event.choices.map((choice, index) => `
          <button onclick="resolveEvent(${index})" ${choice.cost && state.cash < choice.cost ? "disabled" : ""}>
            ${choice.label}${choice.cost ? ` (${money(choice.cost)})` : ""}
          </button>
        `).join("")}
      </div>
    </section>
  `;
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
          <p>Most turns start with three placements. Vineyard protects harvests, cellar creates bulk wine, bottling creates cases, and sales creates buyers.</p>
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
          <p>Staff and estate upgrades compound, but payroll and construction can sink cash before harvest pays back.</p>
        </div>
      </div>
    </section>
  `;
}

function overviewPanel() {
  const worth = netWorth(state);
  return `
    <section class="panel overview-panel">
      <div class="panel-head">
        <h2>Operating Brief</h2>
        <span class="small">Win: 82 prestige, ${money(380000)} net worth, 12 fulfilled orders</span>
      </div>
      <div class="brief-grid">
        <button class="brief-card" onclick="setTab('vineyard')" ${tip("Watch row health and threat. High pressure lowers harvest yield and quality.")}>
          <span>Vineyard Risk</span>
          <strong>${Math.round(averageThreat(state) * 11)}/100</strong>
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
      <div class="chart-grid">
        ${barChart("Monthly Revenue", state.history, "revenue", "gold")}
        ${lineChart("Net Worth Trend", state.history, "netWorth")}
      </div>
    </section>
  `;
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
  const fixedCost = fixedCosts(s);
  return {
    directCases: direct.cases,
    directRevenue: direct.revenue,
    contractCases,
    contractRevenue,
    fixedCost,
    netCash: direct.revenue + contractRevenue - fixedCost
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
        ${data.map(point => `
          <div class="bar-wrap" ${tip(`Month ${point.month}: ${money(point[key])}`)}>
            <span style="height: ${Math.max(3, Math.round((point[key] / max) * 100))}%;"></span>
            <em>${point.month}</em>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function lineChart(title, history, key) {
  const data = history && history.length ? history.slice(-12) : [];
  if (!data.length) return `<div class="chart-card"><strong>${title}</strong><div class="empty">Close a month to start the graph.</div></div>`;
  const values = data.map(point => point[key]);
  const min = Math.min(0, ...values);
  const max = Math.max(1, ...values);
  const range = Math.max(1, max - min);
  const points = data.map((point, index) => {
    const x = data.length === 1 ? 50 : 8 + (index / (data.length - 1)) * 84;
    const y = 88 - ((point[key] - min) / range) * 76;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return `
    <div class="chart-card">
      <div class="chart-head"><strong>${title}</strong><span>${money(data[data.length - 1][key])}</span></div>
      <svg class="line-chart" viewBox="0 0 100 100" role="img" aria-label="${title}">
        <line x1="6" y1="88" x2="96" y2="88"></line>
        <polyline points="${points}"></polyline>
        ${data.map((point, index) => {
          const x = data.length === 1 ? 50 : 8 + (index / (data.length - 1)) * 84;
          const y = 88 - ((point[key] - min) / range) * 76;
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.2"><title>Month ${point.month}: ${money(point[key])}</title></circle>`;
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
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Vineyard ${helpIcon("Rows with high threat lose health and hurt harvest yield. Work Vineyard is the main defensive action.")}</h2>
        <span class="small">${state.season} • ${state.lastWeather}</span>
      </div>
      <div class="vineyard">
        ${state.rows.map(row => `
          <div class="row-card">
            <div>
              <div class="row-name">${row.name}</div>
              <div class="row-meta">Health ${row.health} • ${row.threatName}</div>
            </div>
            <div class="vines" aria-label="${row.name} vines">
              ${Array.from({ length: 10 }, (_, i) => `<span class="vine stress${vineStress(row, i)}"></span>`).join("")}
            </div>
            <div class="threat">Threat ${row.threat}</div>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function vineStress(row, index) {
  const threshold = row.threat + (100 - row.health) / 18;
  if (index < threshold - 5) return 3;
  if (index < threshold - 2) return 2;
  if (index < threshold) return 1;
  return 0;
}

function actionsPanel() {
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Monthly Actions ${helpIcon("Actions are your core worker placements. You can end the month early, but unused placements are lost.")}</h2>
        <span class="small">${state.actionsLeft} placements left</span>
      </div>
      <div class="actions">
        ${ACTIONS.map(action => {
          const cost = Math.round(action.cost * region().costMod * philosophy().cost);
          return `
            <button class="action-card" onclick="useAction('${action.id}')" ${state.actionsLeft <= 0 || state.cash < cost || state.event ? "disabled" : ""}>
              <b>${action.name}</b>
              <span>${action.detail}</span>
              <em>${money(cost)}</em>
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
          <span class="small">List price per bottle</span>
          <input type="range" min="14" max="68" value="${state.price}" oninput="setPrice(this.value)">
        </label>
        <strong>${money(state.price)}</strong>
      </div>
      <div class="two-col" style="margin-top: 10px;">
        <div class="stat-box"><span>Forecast direct sales</span><strong>${forecast.cases} cases</strong></div>
        <div class="stat-box"><span>Forecast revenue</span><strong>${money(forecast.revenue)}</strong></div>
        <div class="stat-box"><span>Grapes</span><strong>${state.inventory.grapes}</strong></div>
        <div class="stat-box"><span>Bulk wine</span><strong>${state.inventory.bulkWine}</strong></div>
        <div class="stat-box"><span>Glass</span><strong>${state.inventory.glass}</strong></div>
        <div class="stat-box"><span>Debt</span><strong>${money(state.debt)}</strong></div>
      </div>
      ${meter("Market heat", state.marketHeat, "gold")}
      ${meter("Sustainability", state.sustainability, "wine")}
      ${meter("Vineyard pressure", Math.round(averageThreat(state) * 11), "danger")}
    </section>
  `;
}

function setPrice(value) {
  state.price = Number(value);
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
  return `
    <div class="order">
      <div class="order-head">
        <strong>${order.buyer}</strong>
        <span class="tag">Due ${order.due}</span>
      </div>
      <p>${order.cases} cases • ceiling ${money(order.maxPrice)}/bottle • penalty ${money(order.penalty)}</p>
      <div class="order-actions">
        ${order.accepted
          ? `<button onclick="fulfillOrder('${order.id}')" ${state.inventory.cases < order.cases ? "disabled" : ""}>Fulfill</button>`
          : `<button onclick="acceptOrder('${order.id}')">Accept at list price</button>`}
        <button class="ghost" onclick="rejectOrder('${order.id}')">${order.accepted ? "Cancel" : "Pass"}</button>
      </div>
    </div>
  `;
}

function buildingsPanel() {
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Estate Engine ${helpIcon("Construction costs cash and one monthly action. Upgrades compound, but overbuilding can starve operations.")}</h2>
        <span class="small">Compounding upgrades</span>
      </div>
      <div class="buildings">
        ${BUILDINGS.map(building => {
          const owned = state.buildings[building.id] || 0;
          const discount = buildDiscountMod(state);
          const cost = Math.round(building.baseCost * Math.pow(1.28, owned) * region().costMod * discount);
          return `
            <div class="building">
              <div class="building-head">
                <strong>${building.name} (${owned}/${building.max})</strong>
                <span class="tag">${money(cost)}</span>
              </div>
              <p>${building.text}</p>
              <div class="building-actions">
                <button onclick="buyBuilding('${building.id}')" ${owned >= building.max || state.cash < cost || state.actionsLeft <= 0 || state.event ? "disabled" : ""}>Build</button>
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
          <img src="assets/${person.id}.png" alt="${person.name}" onerror="this.style.display='none'">
          <strong>${person.name}</strong>
        </div>
        <span class="tag">${person.role}</span>
      </div>
      <p>${person.text}</p>
      <div class="staff-traits">
        ${person.traits.map(trait => `<span class="tag">${trait}</span>`).join("")}
        <span class="tag">${money(person.salary)}/mo</span>
      </div>
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
  app.innerHTML = state ? gameView() : setupView();
}

window.startGame = startGame;
window.saveGame = saveGame;
window.loadGame = loadGame;
window.resetGame = resetGame;
window.selectSetup = selectSetup;
window.setTab = setTab;
window.toggleHelp = toggleHelp;
window.useAction = useAction;
window.advanceMonth = advanceMonth;
window.setPrice = setPrice;
window.acceptOrder = acceptOrder;
window.fulfillOrder = fulfillOrder;
window.rejectOrder = rejectOrder;
window.buyBuilding = buyBuilding;
window.hireStaff = hireStaff;
window.fireStaff = fireStaff;
window.unlockAdvancement = unlockAdvancement;
window.resolveEvent = resolveEvent;

render();
