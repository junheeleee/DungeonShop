const MAX_DAYS = 30;
const CUSTOMERS_PER_DAY = 5;
const SAVE_KEY = "dungeon-shop-prototype-v2-ko";

const PRICE_POLICIES = [
  {
    id: "mercy",
    name: "자비가",
    multiplier: 0.82,
    rep: 2,
    greed: -1,
    investigation: -1,
    survival: 0.03,
  },
  {
    id: "fair",
    name: "정가",
    multiplier: 1,
    rep: 0,
    greed: 0,
    investigation: 0,
    survival: 0,
  },
  {
    id: "markup",
    name: "바가지",
    multiplier: 1.35,
    rep: -1,
    greed: 1,
    investigation: 1,
    survival: -0.02,
  },
  {
    id: "no_refunds",
    name: "환불 없음",
    multiplier: 1.75,
    rep: -3,
    greed: 3,
    investigation: 3,
    survival: -0.05,
  },
];

const ARCHETYPES = [
  {
    id: "fighter",
    name: "전사",
    glyph: "전",
    needs: ["weapon", "armor", "potion"],
    color: "#b9473b",
    lines: [
      "제일 시끄러운 괴물이 있는 쪽으로 보내줘.",
      "이빨 막아주는 거 있어?",
      "지난 검은 부러졌어. 긴 얘기야.",
    ],
  },
  {
    id: "rogue",
    name: "도적",
    glyph: "도",
    needs: ["weapon", "tool", "potion"],
    color: "#5c8f65",
    lines: [
      "증거가 될 만큼 반짝이는 건 빼줘.",
      "조용한 장비가 좋아.",
      "던전이 나한테 빚졌어.",
    ],
  },
  {
    id: "mage",
    name: "마법사",
    glyph: "마",
    needs: ["relic", "potion", "tool"],
    color: "#6c63b8",
    lines: [
      "속삭이는 물건이면 협상은 내가 할게.",
      "힘은 필요하고, 책임은 피하고 싶어.",
      "지난 지팡이는 법적 문제가 됐어.",
    ],
  },
  {
    id: "cleric",
    name: "성직자",
    glyph: "성",
    needs: ["armor", "potion", "relic"],
    color: "#d7a93d",
    lines: [
      "축복됐고, 깨끗하고, 가능하면 할인된 걸로.",
      "서류 작업을 막으러 왔습니다.",
      "신들은 환급을 안 해줘요.",
    ],
  },
];

const HAZARDS = [
  {
    name: "오우거 통행세 다리",
    danger: 0.22,
    counters: ["weapon", "armor"],
    tags: ["brutal", "guard"],
  },
  {
    name: "미믹 식료품 창고",
    danger: 0.28,
    counters: ["tool", "weapon"],
    tags: ["trap", "teeth"],
  },
  {
    name: "마녀뼈 납골당",
    danger: 0.34,
    counters: ["relic", "potion"],
    tags: ["curse", "undead"],
  },
  {
    name: "유리거미 둥지",
    danger: 0.38,
    counters: ["armor", "potion"],
    tags: ["venom", "swarm"],
  },
  {
    name: "세무관 지하묘지",
    danger: 0.44,
    counters: ["tool", "relic"],
    tags: ["law", "trap"],
  },
  {
    name: "드래곤 옆문",
    danger: 0.52,
    counters: ["armor", "relic", "weapon"],
    tags: ["fire", "boss"],
  },
];

const ITEM_CATALOG = [
  { name: "금 간 영웅검", type: "weapon", power: 3, cost: 12, basePrice: 23, tags: ["brutal"] },
  { name: "대여 기사 창", type: "weapon", power: 4, cost: 16, basePrice: 30, tags: ["guard"] },
  { name: "과부제조 도끼", type: "weapon", power: 6, cost: 25, basePrice: 48, tags: ["brutal"], curse: 6 },
  { name: "은제 편지칼", type: "weapon", power: 2, cost: 8, basePrice: 18, tags: ["undead"] },
  { name: "초인종 쇠뇌", type: "weapon", power: 5, cost: 22, basePrice: 42, tags: ["trap"] },
  { name: "양동이 투구", type: "armor", power: 2, cost: 7, basePrice: 16, tags: ["guard"] },
  { name: "이빨 방지 방패", type: "armor", power: 5, cost: 20, basePrice: 38, tags: ["teeth"] },
  { name: "불연성 망토", type: "armor", power: 4, cost: 18, basePrice: 36, tags: ["fire"] },
  { name: "성자의 빌린 사슬갑옷", type: "armor", power: 6, cost: 28, basePrice: 52, tags: ["undead"] },
  { name: "삐걱대는 흑철갑", type: "armor", power: 7, cost: 29, basePrice: 58, tags: ["boss"], curse: 9 },
  { name: "대체로 빨간 포션", type: "potion", power: 3, cost: 9, basePrice: 21, tags: ["venom"] },
  { name: "축복받은 숙취 치료제", type: "potion", power: 4, cost: 14, basePrice: 29, tags: ["curse"] },
  { name: "비상용 용기", type: "potion", power: 5, cost: 19, basePrice: 39, tags: ["brutal"] },
  { name: "거미 독 해독제", type: "potion", power: 6, cost: 24, basePrice: 48, tags: ["venom", "swarm"] },
  { name: "나쁜 생각 한 병", type: "potion", power: 7, cost: 25, basePrice: 55, tags: ["boss"], curse: 10 },
  { name: "사과문 락픽", type: "tool", power: 3, cost: 10, basePrice: 22, tags: ["trap"] },
  { name: "미믹 조율 포크", type: "tool", power: 5, cost: 20, basePrice: 40, tags: ["teeth"] },
  { name: "합법 랜턴", type: "tool", power: 4, cost: 15, basePrice: 33, tags: ["law"] },
  { name: "3미터 장대", type: "tool", power: 2, cost: 6, basePrice: 14, tags: ["trap"] },
  { name: "무기명 해골 열쇠", type: "tool", power: 6, cost: 27, basePrice: 52, tags: ["law"], curse: 4 },
  { name: "성자 영수증", type: "relic", power: 3, cost: 12, basePrice: 26, tags: ["law"] },
  { name: "사소한 불길함의 잔", type: "relic", power: 4, cost: 18, basePrice: 35, tags: ["curse"] },
  { name: "재투성이 화염 부적", type: "relic", power: 5, cost: 21, basePrice: 44, tags: ["fire"] },
  { name: "퇴마 성가종", type: "relic", power: 6, cost: 26, basePrice: 51, tags: ["undead"] },
  { name: "수익성 속삭임의 왕관", type: "relic", power: 8, cost: 34, basePrice: 70, tags: ["boss"], curse: 15 },
  { name: "할인 장화", type: "armor", power: 3, cost: 12, basePrice: 25, tags: ["swarm"] },
  { name: "유언 단검", type: "weapon", power: 5, cost: 17, basePrice: 37, tags: ["trap"], curse: 5 },
  { name: "희박한 생존 허가증", type: "relic", power: 5, cost: 22, basePrice: 45, tags: ["law"] },
  { name: "휴대용 장례 키트", type: "tool", power: 4, cost: 15, basePrice: 31, tags: ["undead"] },
  { name: "드래곤 방지 꼬리표", type: "relic", power: 7, cost: 31, basePrice: 63, tags: ["fire", "boss"] },
];

const FIRST_NAMES = [
  "브란",
  "미라",
  "토빈",
  "베라",
  "켈",
  "네사",
  "오린",
  "팍스",
  "세이블",
  "야라",
  "다인",
  "리오",
];

const TEMPERAMENTS = [
  { name: "신중함", survival: 0.05, priceTolerance: -0.05 },
  { name: "자존심 강함", survival: -0.02, priceTolerance: 0.04 },
  { name: "절박함", survival: -0.04, priceTolerance: 0.08 },
  { name: "운 좋음", survival: 0.08, priceTolerance: 0 },
  { name: "망할 운명", survival: -0.08, priceTolerance: 0.12 },
];

const TYPE_LABELS = {
  weapon: "무기",
  armor: "방어구",
  potion: "포션",
  tool: "도구",
  relic: "유물",
};

const TAG_LABELS = {
  brutal: "육탄",
  guard: "방어",
  trap: "함정",
  teeth: "이빨",
  curse: "저주",
  undead: "언데드",
  venom: "독",
  swarm: "군집",
  law: "법률",
  fire: "화염",
  boss: "보스",
};

let state = createInitialState();

const els = {};

function createInitialState() {
  const inventory = drawItems(7).map((item) => createInventoryItem(item));
  return {
    day: 1,
    customerIndex: 1,
    gold: 90,
    reputation: 50,
    greed: 0,
    investigation: 0,
    curse: 0,
    inventory,
    market: drawItems(3).map((item) => createInventoryItem(item)),
    selectedItemId: inventory[0]?.uid ?? null,
    pricePolicy: "fair",
    customer: createCustomer(1, []),
    log: ["임대 계약 완료. 던전 문 포함. 책임 보험 미포함."],
    regulars: [],
    gameOver: false,
    ending: null,
  };
}

function cacheElements() {
  [
    "dayValue",
    "goldValue",
    "repValue",
    "greedValue",
    "investValue",
    "curseValue",
    "queueValue",
    "portrait",
    "portraitGlyph",
    "customerName",
    "customerClass",
    "customerNeed",
    "customerDungeon",
    "customerTemper",
    "customerLine",
    "survivalValue",
    "survivalBar",
    "customerToken",
    "tokenGlyph",
    "counterItem",
    "offerName",
    "policyName",
    "saleValue",
    "policyButtons",
    "inventoryList",
    "sellButton",
    "resetButton",
    "marketList",
    "marketStatus",
    "nextDayButton",
    "logList",
  ].forEach((id) => {
    els[id] = document.getElementById(id);
  });
}

function createInventoryItem(template, recovered = false) {
  return {
    ...template,
    uid: crypto.randomUUID(),
    recovered,
    bloodstained: recovered,
    markupMemory: recovered ? 1.08 : 1,
  };
}

function drawItems(count) {
  const pool = [...ITEM_CATALOG];
  const result = [];
  while (result.length < count && pool.length > 0) {
    const index = randomInt(0, pool.length - 1);
    result.push(pool.splice(index, 1)[0]);
  }
  return result;
}

function createCustomer(day, regulars) {
  const returning = regulars.length > 0 && Math.random() < Math.min(0.28, 0.07 + day * 0.005);
  if (returning) {
    const regular = choose(regulars);
    const hazard = choose(HAZARDS);
    const need = choose(regular.archetype.needs);
    const temper = choose(TEMPERAMENTS);
    return {
      ...regular,
      returning: true,
      hazard,
      need,
      temper,
      line: "또 왔어. 이 가게는 대부분만 저주받았다고 결론냈거든.",
    };
  }

  const archetype = choose(ARCHETYPES);
  const name = `${choose(FIRST_NAMES)} ${surnameFor(archetype)}`;
  const hazard = choose(HAZARDS);
  const need = choose(archetype.needs);
  const temper = choose(TEMPERAMENTS);
  return {
    id: crypto.randomUUID(),
    name,
    archetype,
    returning: false,
    hazard,
    need,
    temper,
    visits: 0,
    line: choose(archetype.lines),
  };
}

function surnameFor(archetype) {
  const surnames = {
    fighter: ["철외상", "불운검", "방패값"],
    rogue: ["빠른손", "낮은목소리", "동전손"],
    mage: ["잿빛장부", "주문우물", "나쁜별"],
    cleric: ["무덤친절", "종문서", "자비보관"],
  };
  return choose(surnames[archetype.id]);
}

function render() {
  clampRunMeters();
  const selectedItem = getSelectedItem();
  const policy = getPolicy();
  const estimate = selectedItem ? estimateSurvival(state.customer, selectedItem, policy) : null;
  const salePrice = selectedItem ? getSalePrice(selectedItem, policy) : 0;

  els.dayValue.textContent = state.day;
  els.goldValue.textContent = `${state.gold}G`;
  els.repValue.textContent = state.reputation;
  els.greedValue.textContent = state.greed;
  els.investValue.textContent = state.investigation;
  els.curseValue.textContent = state.curse;
  els.queueValue.textContent = `${state.customerIndex} / ${CUSTOMERS_PER_DAY}`;

  renderCustomer(estimate);
  renderPolicies();
  renderInventory();
  renderMarket();
  renderLedger();

  els.offerName.textContent = selectedItem ? selectedItem.name : "재고 선택";
  els.policyName.textContent = policy.name;
  els.saleValue.textContent = `${salePrice}G`;
  els.counterItem.textContent = selectedItem ? selectedItem.name : "제안 없음";
  els.sellButton.disabled = state.gameOver || !selectedItem || state.customerIndex > CUSTOMERS_PER_DAY;
  els.nextDayButton.disabled = state.gameOver || state.customerIndex <= CUSTOMERS_PER_DAY;

  if (state.gameOver) {
    els.sellButton.textContent = "영업 종료";
    els.nextDayButton.textContent = "완료";
  } else if (state.customerIndex > CUSTOMERS_PER_DAY) {
    els.sellButton.textContent = "오늘 영업 종료";
    els.nextDayButton.textContent = "다음 날";
  } else {
    els.sellButton.textContent = "판매하고 보내기";
    els.nextDayButton.textContent = "다음 날";
  }

  document.body.dataset.gameOver = state.gameOver ? "true" : "false";
  saveState();
}

function renderCustomer(estimate) {
  const customer = state.customer;
  const archetype = customer.archetype;
  els.portrait.style.setProperty("--portrait-color", archetype.color);
  els.portraitGlyph.textContent = archetype.glyph;
  els.tokenGlyph.textContent = archetype.glyph;
  els.customerToken.style.setProperty("--token-color", archetype.color);
  els.customerName.textContent = customer.name;
  els.customerClass.textContent = customer.returning ? `${archetype.name} 단골` : archetype.name;
  els.customerNeed.textContent = typeLabel(customer.need);
  els.customerDungeon.textContent = customer.hazard.name;
  els.customerTemper.textContent = customer.temper.name;
  els.customerLine.textContent = `"${customer.line}"`;
  if (estimate) {
    const percent = Math.round(estimate.chance * 100);
    els.survivalValue.textContent = `${percent}%`;
    els.survivalBar.style.width = `${percent}%`;
    els.survivalBar.dataset.risk = percent < 35 ? "bad" : percent < 62 ? "mid" : "good";
  } else {
    els.survivalValue.textContent = "--%";
    els.survivalBar.style.width = "0%";
  }
}

function renderPolicies() {
  els.policyButtons.innerHTML = "";
  PRICE_POLICIES.forEach((policy) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "policy-button";
    button.dataset.active = policy.id === state.pricePolicy ? "true" : "false";
    button.textContent = policy.name;
    button.addEventListener("click", () => {
      state.pricePolicy = policy.id;
      render();
    });
    els.policyButtons.append(button);
  });
}

function renderInventory() {
  els.inventoryList.innerHTML = "";
  if (state.inventory.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "진열대가 비었습니다.";
    els.inventoryList.append(empty);
    return;
  }

  state.inventory.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "item-row";
    button.dataset.active = item.uid === state.selectedItemId ? "true" : "false";
    button.dataset.cursed = item.curse ? "true" : "false";
    button.addEventListener("click", () => {
      state.selectedItemId = item.uid;
      render();
    });

    const title = document.createElement("span");
    title.className = "item-title";
    title.textContent = item.bloodstained ? `${item.name} (회수품)` : item.name;
    const meta = document.createElement("span");
    meta.className = "item-meta";
    meta.textContent = `${typeLabel(item.type)} | 위력 ${item.power} | ${getSalePrice(item, getPolicy())}G`;
    const badge = document.createElement("span");
    badge.className = "item-badge";
    badge.textContent = item.curse ? `저주 ${item.curse}` : tagLabel(item.tags[0]);

    button.append(title, meta, badge);
    els.inventoryList.append(button);
  });
}

function renderMarket() {
  els.marketList.innerHTML = "";
  els.marketStatus.textContent = state.customerIndex === 1 ? "영업 중" : "마감";
  state.market.forEach((item) => {
    const row = document.createElement("div");
    row.className = "market-row";

    const copy = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = item.name;
    const details = document.createElement("span");
    details.textContent = `${typeLabel(item.type)} | 원가 ${item.cost}G | 위력 ${item.power}`;
    copy.append(name, details);

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "구매";
    button.disabled = state.customerIndex !== 1 || state.gold < item.cost || state.gameOver;
    button.addEventListener("click", () => buyMarketItem(item.uid));

    row.append(copy, button);
    els.marketList.append(row);
  });
}

function renderLedger() {
  els.logList.innerHTML = "";
  state.log.slice(-8).reverse().forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    els.logList.append(li);
  });
}

function buyMarketItem(uid) {
  const item = state.market.find((candidate) => candidate.uid === uid);
  if (!item || state.gold < item.cost || state.customerIndex !== 1) return;
  state.gold -= item.cost;
  state.inventory.push(item);
  state.market = state.market.filter((candidate) => candidate.uid !== uid);
  state.selectedItemId = item.uid;
  addLog(`${item.name}을 도매가 ${item.cost}G에 구매했습니다.`);
  render();
}

function sellAndSend() {
  if (state.gameOver || state.customerIndex > CUSTOMERS_PER_DAY) return;
  const item = getSelectedItem();
  if (!item) return;

  const policy = getPolicy();
  const estimate = estimateSurvival(state.customer, item, policy);
  const salePrice = getSalePrice(item, policy);
  const outcomeRoll = Math.random();
  const injuredBand = 0.16;
  const survived = outcomeRoll <= estimate.chance;
  const injured = !survived && outcomeRoll <= estimate.chance + injuredBand;

  state.gold += salePrice;
  state.greed += policy.greed;
  state.reputation += policy.rep;
  state.investigation += policy.investigation;

  if (item.curse) {
    state.curse += Math.ceil(item.curse * 0.55);
    state.greed += 1;
  }

  state.inventory = state.inventory.filter((candidate) => candidate.uid !== item.uid);

  if (survived) {
    resolveSurvival(item, salePrice, estimate);
  } else if (injured) {
    resolveInjury(item, salePrice, estimate);
  } else {
    resolveDeath(item, salePrice, estimate);
  }

  advanceCustomer();
  checkEnding();
  render();
}

function resolveSurvival(item, salePrice, estimate) {
  const customer = state.customer;
  const bonus = Math.random() < 0.32 ? randomInt(4, 13) : 0;
  state.gold += bonus;
  state.reputation += customer.returning ? 4 : 3;
  state.investigation -= 1;

  const regularExists = state.regulars.some((regular) => regular.id === customer.id);
  if (!regularExists && estimate.chance >= 0.6 && Math.random() < 0.52) {
    state.regulars.push({
      id: customer.id,
      name: customer.name,
      archetype: customer.archetype,
      visits: customer.visits + 1,
    });
    addLog(`${customer.name}이 ${item.name} 덕분에 살아 돌아와 단골이 됐습니다.`);
  } else {
    addLog(`${customer.name} 생존. ${bonus ? `팁 통에 ${bonus}G가 들어왔습니다.` : "팁은 없지만 숨은 붙어 있습니다."}`);
  }

  if (Math.random() < 0.18) {
    const loot = createInventoryItem(createLootItem(customer.hazard));
    state.inventory.push(loot);
    addLog(`${customer.name}이 탐험 후 ${loot.name}을 팔고 갔습니다.`);
  }
}

function resolveInjury(item, salePrice, estimate) {
  const customer = state.customer;
  state.reputation -= 2;
  state.investigation += 2;
  if (item.curse) state.curse += 2;
  addLog(`${customer.name}이 절뚝이며 살아 돌아왔습니다. 영수증은 이제 의료 기록입니다.`);
}

function resolveDeath(item, salePrice, estimate) {
  const customer = state.customer;
  const recovered = createInventoryItem(item, true);
  recovered.power = Math.max(1, item.power - randomInt(0, 1));
  recovered.basePrice = Math.ceil(item.basePrice * 0.92);
  state.inventory.push(recovered);
  state.reputation -= 5;
  state.investigation += 7 + (item.curse ? 5 : 0);
  state.greed += 3;

  const salvage = randomInt(5, 22) + Math.max(0, item.power - 2);
  state.gold += salvage;
  addLog(`${customer.name}이 ${customer.hazard.name}에서 사망했습니다. ${item.name}과 흩어진 전리품 ${salvage}G를 회수했습니다.`);
}

function createLootItem(hazard) {
  const lootNames = {
    "오우거 통행세 다리": "오우거 통행 도장",
    "미믹 식료품 창고": "미믹 경첩",
    "마녀뼈 납골당": "마녀뼈 묵주",
    "유리거미 둥지": "유리 방적돌기",
    "세무관 지하묘지": "서명 안 된 세금 양식",
    "드래곤 옆문": "따뜻한 드래곤 비늘",
  };
  return {
    name: lootNames[hazard.name] ?? "던전 잡동사니",
    type: "relic",
    power: randomInt(2, 5),
    cost: 0,
    basePrice: randomInt(24, 46),
    tags: hazard.tags.slice(0, 1),
    curse: hazard.tags.includes("curse") ? 4 : 0,
  };
}

function advanceCustomer() {
  if (state.customerIndex >= CUSTOMERS_PER_DAY) {
    state.customerIndex += 1;
    state.customer = createCustomer(state.day, state.regulars);
    applyNightPressure();
    addLog(`${state.day}일차 마감. 아직 ${state.regulars.length}명의 단골이 가게 주소를 압니다.`);
    return;
  }
  state.customerIndex += 1;
  state.customer = createCustomer(state.day, state.regulars);
  if (!state.selectedItemId || !state.inventory.some((item) => item.uid === state.selectedItemId)) {
    state.selectedItemId = state.inventory[0]?.uid ?? null;
  }
}

function applyNightPressure() {
  if (state.curse >= 35 && Math.random() < 0.28) {
    const rent = randomInt(6, 16);
    state.gold -= rent;
    addLog(`저주받은 선반이 동전 ${rent}G를 삼켰습니다.`);
  }
  if (state.investigation >= 55 && Math.random() < 0.35) {
    const fine = randomInt(8, 24);
    state.gold -= fine;
    state.reputation -= 2;
    addLog(`조사관이 투구가 왜 비명을 지르는지 물었습니다. 벌금 ${fine}G를 냈습니다.`);
  }
  if (state.reputation >= 70 && Math.random() < 0.3) {
    state.gold += 10;
    addLog("좋은 평판 덕분에 선불 손님이 왔습니다. +10G.");
  }
}

function startNextDay() {
  if (state.gameOver || state.customerIndex <= CUSTOMERS_PER_DAY) return;
  state.day += 1;
  state.customerIndex = 1;
  state.market = drawItems(3).map((item) => createInventoryItem(item));
  if (state.inventory.length < 3) {
    const emergency = drawItems(3 - state.inventory.length).map((item) => createInventoryItem(item));
    state.inventory.push(...emergency);
    state.reputation -= 2;
    addLog("도매상이 아주 못생긴 외상 조건으로 재고를 채워줬습니다.");
  }
  state.customer = createCustomer(state.day, state.regulars);
  state.selectedItemId = state.inventory[0]?.uid ?? null;
  addLog(`${state.day}일차 개점. 던전 문은 아직 배고픕니다.`);
  checkEnding();
  render();
}

function checkEnding() {
  if (state.gameOver) return;
  let ending = null;
  if (state.investigation >= 100) ending = "왕국이 영웅 과실치사 혐의로 가게를 폐쇄했습니다.";
  if (state.curse >= 100) ending = "가게가 던전이 됐습니다. 엄밀히 말하면 수직계열화입니다.";
  if (state.reputation <= 0) ending = "소리치러 오는 사람 말고는 어떤 모험가도 들어오지 않습니다.";
  if (state.gold < -30) ending = "빚쟁이들이 계산대를 압류했습니다.";
  if (state.day > MAX_DAYS) {
    if (state.reputation >= 70 && state.greed < 45) ending = "정직한 납품업자 엔딩: 수상할 정도로 멀쩡합니다.";
    else if (state.gold >= 450 && state.investigation < 90) ending = "부유한 용의자 엔딩: 돈 많고, 감시받고, 아직 영업 중.";
    else if (state.curse >= 65) ending = "저주받은 상인 엔딩: 수익성 있는 속삭임은 영원합니다.";
    else ending = "생존자 엔딩: 30일, 가게 하나, 면책 조항 다수.";
  }
  if (ending) {
    state.gameOver = true;
    state.ending = ending;
    addLog(ending);
  }
}

function estimateSurvival(customer, item, policy) {
  const hazard = customer.hazard;
  let chance = 0.48;
  const needMatch = item.type === customer.need;
  const counterMatch = hazard.counters.includes(item.type);
  const tagMatch = item.tags.some((tag) => hazard.tags.includes(tag));

  chance += item.power * 0.045;
  chance += needMatch ? 0.14 : -0.1;
  chance += counterMatch ? 0.1 : -0.04;
  chance += tagMatch ? 0.09 : 0;
  chance += customer.temper.survival;
  chance += policy.survival + customer.temper.priceTolerance * Math.max(0, policy.multiplier - 1);
  chance -= hazard.danger;
  chance -= Math.max(0, state.curse - 20) * 0.0025;
  chance += customer.returning ? 0.05 : 0;
  if (item.curse) chance += item.curse * 0.006;

  return {
    chance: clamp(chance, 0.06, 0.92),
    needMatch,
    counterMatch,
    tagMatch,
  };
}

function getSalePrice(item, policy) {
  const bloodMoney = item.bloodstained ? 0.9 : 1;
  const cursePremium = item.curse ? 1.12 : 1;
  return Math.ceil(item.basePrice * item.markupMemory * policy.multiplier * bloodMoney * cursePremium);
}

function getSelectedItem() {
  return state.inventory.find((item) => item.uid === state.selectedItemId) ?? null;
}

function getPolicy() {
  return PRICE_POLICIES.find((policy) => policy.id === state.pricePolicy) ?? PRICE_POLICIES[1];
}

function addLog(message) {
  state.log.push(message);
  if (state.log.length > 60) state.log.shift();
}

function clampRunMeters() {
  state.reputation = clamp(Math.round(state.reputation), -20, 100);
  state.greed = clamp(Math.round(state.greed), 0, 100);
  state.investigation = clamp(Math.round(state.investigation), 0, 120);
  state.curse = clamp(Math.round(state.curse), 0, 120);
  state.gold = Math.round(state.gold);
}

function saveState() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch {
    // Saving is optional for this prototype.
  }
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (!saved || !saved.inventory || !saved.customer) return;
    state = saved;
  } catch {
    state = createInitialState();
  }
}

function resetGame() {
  localStorage.removeItem(SAVE_KEY);
  state = createInitialState();
  render();
}

function choose(items) {
  return items[randomInt(0, items.length - 1)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function typeLabel(value) {
  return TYPE_LABELS[value] ?? value;
}

function tagLabel(value) {
  return TAG_LABELS[value] ?? value;
}

function bindEvents() {
  els.sellButton.addEventListener("click", sellAndSend);
  els.nextDayButton.addEventListener("click", startNextDay);
  els.resetButton.addEventListener("click", resetGame);
}

cacheElements();
loadState();
bindEvents();
render();
