#!/usr/bin/env node

const fs = require("fs");
const vm = require("vm");

// ── Browser stub ──────────────────────────────────────────────────────────────
const fakeEl = () => ({
  innerHTML: "", style: {}, dataset: {},
  appendChild() {}, remove() {}, setAttribute() {},
});
global.document = {
  getElementById: () => fakeEl(),
  createElement:  () => fakeEl(),
  body: { dataset: {} },
};
global.window    = global;
global.app       = fakeEl();
global.localStorage = { getItem: () => null, setItem() {} };

// ── Load game code into global scope via vm ────────────────────────────────────
const src = fs.readFileSync(__dirname + "/game.js", "utf8");
vm.runInThisContext(src, { filename: "game.js" });

// ── Silence all rendering / DOM side-effects ───────────────────────────────────
/* global render, flushAchievementToasts, log */
render                 = () => {};
flushAchievementToasts = () => {};

// ── Config matrix ──────────────────────────────────────────────────────────────
/* global REGIONS, DIFFICULTIES, PHILOSOPHIES */
const CONFIGS = [];
for (const region of REGIONS) {
  for (const varietal of region.varietals) {
    for (const diff of DIFFICULTIES) {
      for (const phil of PHILOSOPHIES) {
        CONFIGS.push({ region: region.id, varietal, difficulty: diff.id, philosophy: phil.id });
      }
    }
  }
}

const REPLICATES = 10;
// Pass 1: situational production actions.
// Pass 2: demand/morale management.
// Pass 3: finance (cash injection; $5.5k–$9.9k gain for $800 cost — always profitable).
//   Runs only when actionsLeft > 0 after passes 1 & 2, so it never displaces production or morale work.
const ACTION_PASS1 = ["bottle", "cellar", "seasonal", "vineyard"];
const ACTION_PASS2_NORMAL  = ["sales", "hospitality", "bottle", "cellar", "seasonal", "vineyard"];
const ACTION_PASS2_MORALE  = ["hospitality", "sales", "bottle", "cellar", "seasonal", "vineyard"];

// ── AI helpers ─────────────────────────────────────────────────────────────────
/* global state, setup, createState, ACTIONS, isActionAvailable, actionCost,
   canSpendForAction, useAction, resolveEvent, checkGameOver,
   normalizeState, monthlyTick, readyVintages, availableCredit */

function aiResolveEvent() {
  const ev = state.event;
  if (!ev || !ev.choices) { state.event = null; return; }
  const sorted = [...ev.choices].sort((a, b) => {
    const aOk = state.cash >= (a.cost || 0);
    const bOk = state.cash >= (b.cost || 0);
    if (aOk !== bOk) return aOk ? -1 : 1;
    return (a.cost || 0) - (b.cost || 0);
  });
  const pool = sorted.filter(c => state.cash >= (c.cost || 0));
  const choice = pool.length
    ? pool[Math.floor(Math.random() * pool.length)]
    : sorted[0];
  resolveEvent(ev.choices.indexOf(choice));
  if (state.event) state.event = null; // force-clear if still blocked
}

function tryAction(id, used) {
  if (used.has(id) || state.actionsLeft <= 0 || state.event || state.gameOver) return false;
  const action = ACTIONS.find(a => a.id === id);
  if (!action || !isActionAvailable(action, state)) return false;
  if (!canSpendForAction(action, state)) return false;
  if (state.cash < actionCost(action, state)) return false;
  if (id === "bottle" && readyVintages(state).length === 0) return false;
  useAction(id);
  used.add(id);
  return true;
}

function aiTakeActions() {
  const used = new Set();
  // In Dormant, seasonal clears -8 fatigue and gives +2 morale — always prioritise it
  const pass1 = state.season === "Dormant"
    ? ["bottle", "seasonal", "cellar", "vineyard"]
    : ACTION_PASS1;
  for (const id of pass1) {
    if (tryAction(id, used)) break;
  }
  // Pass 2: if morale is low prioritise hospitality, otherwise sales first
  const pass2 = state.morale < 45 ? ACTION_PASS2_MORALE : ACTION_PASS2_NORMAL;
  for (const id of pass2) {
    if (tryAction(id, used)) break;
  }
  // Pass 3: finance is always profitable ($5.5k–$9.9k for $800 cost).
  // Only runs if actionsLeft remains after passes 1 & 2.
  tryAction("finance", used);
}

function aiManageOrders() {
  /* global acceptOrder, fulfillOrder, orderRetailCeiling */
  // Fulfill first: reduces accepted count and frees up management headroom
  for (const order of [...state.orders]) {
    if (order.accepted && state.inventory.cases >= order.cases) {
      fulfillOrder(order.id);
    }
  }
  // Only accept new orders when we have room — too many active orders spike managementLoad
  const activeAccepted = state.orders.filter(o => o.accepted).length;
  if (activeAccepted < 2) {
    for (const order of [...state.orders]) {
      if (!order.accepted && orderRetailCeiling(order) >= state.price) {
        acceptOrder(order.id);
        break;
      }
    }
  }
}

function aiMaybeHireStaff() {
  /* global STAFF_POOL, hireStaff */
  if (state.staff.length >= 2) return;
  if (state.actionsLeft <= 0) return;

  const available = STAFF_POOL.filter(p => !state.staff.includes(p.id) && state.staffMarket.includes(p.id));
  const beatrice = available.find(p => p.id === "beatrice");
  // First hire: beatrice for morale management via hospitality action
  // Second hire: prefer omar (finance: +6 orgCapacity, fatigue clears faster) over cheapest
  let candidate;
  if (state.staff.length === 0 && beatrice) {
    candidate = beatrice;
  } else {
    const omar = available.find(p => p.id === "omar");
    candidate = omar || available.sort((a, b) => a.salary - b.salary)[0];
  }
  if (!candidate) return;
  const signing = Math.round(candidate.salary * 1.4);
  const cashBuffer = state.staff.length === 0 ? 25000 : 50000;
  if (state.cash >= signing + cashBuffer) {
    hireStaff(candidate.id);
  }
}

// ── Single game simulation ─────────────────────────────────────────────────────
function simulate(config) {
  // Wire up the global setup object the game reads from
  setup.region     = config.region;
  setup.varietal   = config.varietal;
  setup.difficulty = config.difficulty;
  setup.philosophy = config.philosophy;
  setup.wineryName = "Sim";

  /* global state */
  state = createState();
  state.introSeen    = true;
  state.tutorialSeen = true;
  // Higher difficulties need higher prices to cover larger fixed costs.
  // Prices are capped by order retail ceilings, so we can only go so high.
  state.price = config.difficulty === "grand" ? 46
              : config.difficulty === "estate" ? 42
              : 38;

  const MAX_TICKS = 200;
  let ticks = 0;
  while (!state.gameOver && ticks++ < MAX_TICKS) {
    if (state.event) { aiResolveEvent(); continue; }

    // Draw credit line if cash is getting dangerous, but leave headroom before
    // hitting the hard limit (game over when debt > creditLine + 65k).
    if (state.cash < 10000 && availableCredit(state) > 2000) {
      // Keep at least 40k of buffer below the hard over-limit ceiling
      const hardCeiling = state.creditLine + 65000;
      const safeDebt = hardCeiling - 40000;
      const room = Math.max(0, safeDebt - state.debt);
      const draw = Math.min(25000, room, availableCredit(state));
      if (draw > 0) drawDebt(draw);
    }

    aiMaybeHireStaff();
    aiTakeActions();
    aiManageOrders();

    if (!state.event && !state.gameOver) {
      monthlyTick(state);
      checkGameOver();
    }
  }

  const survived = state.gameOver.score === true;
  return {
    survived,
    prestige:    state.maxPrestige || state.prestige,
    netWorth:    Math.round(state.cash - state.debt),
    totalSold:   state.totalSold,
    totalRevenue: state.totalRevenue,
    month:       state.month,
  };
}

// ── Run all configs ────────────────────────────────────────────────────────────
console.log(`\nCellar Baron — Viability Simulation`);
console.log(`${CONFIGS.length} configs × ${REPLICATES} replicates = ${CONFIGS.length * REPLICATES} runs\n`);

const results = [];

for (const config of CONFIGS) {
  const runs = [];
  for (let r = 0; r < REPLICATES; r++) {
    runs.push(simulate(config));
  }

  const viable     = runs.filter(r => r.survived).length;
  const avgPrestige = Math.round(runs.reduce((s, r) => s + r.prestige, 0) / runs.length);
  const avgWorth   = Math.round(runs.reduce((s, r) => s + r.netWorth, 0) / runs.length);
  const avgRevenue = Math.round(runs.reduce((s, r) => s + r.totalRevenue, 0) / runs.length);

  results.push({ config, viable, avgPrestige, avgWorth, avgRevenue });
}

// ── Output ─────────────────────────────────────────────────────────────────────
results.sort((a, b) => b.viable - a.viable || b.avgPrestige - a.avgPrestige);

const fmt = (n) => n >= 1e6 ? `$${(n/1e6).toFixed(2)}M` : n >= 1000 ? `$${Math.round(n/1000)}k` : `$${n}`;
const pad  = (s, n) => String(s).padEnd(n);
const lpad = (s, n) => String(s).padStart(n);

const header = [
  pad("Region", 14), pad("Varietal", 14), pad("Difficulty", 12),
  pad("Philosophy", 12), lpad("Viable", 8), lpad("AvgPrestige", 12),
  lpad("AvgWorth", 10), lpad("AvgRevenue", 12),
].join("");
const divider = "─".repeat(header.length);

console.log(header);
console.log(divider);

for (const { config, viable, avgPrestige, avgWorth, avgRevenue } of results) {
  const viableStr = `${viable}/${REPLICATES}`;
  const flag = viable === 0 ? " ✗" : viable < REPLICATES / 2 ? " ?" : "";
  console.log([
    pad(config.region, 14), pad(config.varietal, 14), pad(config.difficulty, 12),
    pad(config.philosophy, 12), lpad(viableStr, 8), lpad(avgPrestige, 12),
    lpad(fmt(avgWorth), 10), lpad(fmt(avgRevenue), 12),
  ].join("") + flag);
}

console.log(divider);

const totalViable = results.reduce((s, r) => s + r.viable, 0);
const totalRuns   = results.length * REPLICATES;
console.log(`\nOverall: ${totalViable}/${totalRuns} runs survived (${Math.round(totalViable/totalRuns*100)}%)`);

// Highlight any configs where no run survived
const impossible = results.filter(r => r.viable === 0);
if (impossible.length) {
  console.log(`\n⚠ Zero-survival configs (${impossible.length}):`);
  for (const { config } of impossible) {
    console.log(`  ${config.region} / ${config.varietal} / ${config.difficulty} / ${config.philosophy}`);
  }
}
