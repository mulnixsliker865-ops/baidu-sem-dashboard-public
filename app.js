let data = {
  updatedAt: "2026-07-02 15:00",
  scope: "文档静态口径",
  totals: {
    todaySpend: 3613.28,
    balance: 50584.43,
    clicks: 90,
    conversions: 2,
    avgCpc: 44.62,
    conversionCost: 2514.29,
  },
  accounts: [
    {
      id: "32174643",
      name: "tj全包圆2",
      role: "行业通用-资金共享",
      searchBudget: 4000,
      searchUsage: 31.71,
      cpc: 30.76,
      sevenDaySpend: 13920.69,
      clicks: 616,
      conversions: 8,
      cpa: 1740.09,
      note: "效率相对更好，继续观察搜索词质量",
    },
    {
      id: "33334591",
      name: "tj全包圆家居1",
      role: "品牌词-资金共享",
      searchBudget: 4000,
      searchUsage: 58.63,
      infoBudget: 3000,
      cpc: 86.85,
      sevenDaySpend: 38879.36,
      clicks: 630,
      conversions: 13,
      cpa: 2990.72,
      note: "CPC 和成本更高，优先核有效线索",
    },
  ],
  funnel: [
    { label: "展现", value: 36246, base: 36246 },
    { label: "点击", value: 1246, base: 36246 },
    { label: "目标转化", value: 21, base: 1246 },
    { label: "深度转化", value: 0, base: 21 },
    { label: "CRM有效线索", value: null, base: 21 },
  ],
  checks: [
    ["今日消费", "看是否正常开跑、是否只有 2 个核心账户在花"],
    ["账户余额", "低于 3 天预算就提前提醒老板或财务"],
    ["预算利用率", "看 tj全包圆2 和 tj全包圆家居1 谁花得更快"],
    ["CPC", "点一次广告多少钱，变贵后必须看转化"],
    ["全链路转化", "看目标转化量、目标转化成本，再去 CRM 核有效"],
  ],
  termGroups: [
    {
      title: "有效意图词",
      level: "ok",
      action: "继续观察，不要轻易否",
      examples: ["装修公司哪家好", "房屋改造装修", "天津装修公司", "老房翻新", "全包装修"],
    },
    {
      title: "内容/看图词",
      level: "warn",
      action: "看花费和有效线索，花多无线索再处理",
      examples: ["法式风格装修效果图", "新中式装修风格效果图", "毛坯房的图片", "装修壁龛效果图"],
    },
    {
      title: "偏离/风险词",
      level: "bad",
      action: "连续花钱且无效，优先否词或收窄匹配",
      examples: ["竞品地址", "全屋定制排名", "招聘", "加盟", "材料批发", "维修"],
    },
  ],
  conversionQuality: [
    { label: "百度目标转化", value: 21, note: "电话/表单/留线索这一级" },
    { label: "深度转化", value: 0, note: "目前没有有效/成交回传" },
    { label: "CRM有效线索", value: "待填", note: "每天必须核对真实有效数" },
  ],
  trackers: {
    focus: {
      note: "重点搜索词是你希望持续拿量的词。后续导入搜索词报表后，这里会显示曝光、点击、消费、CPC、转化。",
      rows: [
        { term: "装修公司哪家好", type: "强意图", impression: null, click: null, spend: null, cpc: null, conversion: null, verdict: "优先观察转化成本" },
        { term: "天津装修公司", type: "本地强意图", impression: null, click: null, spend: null, cpc: null, conversion: null, verdict: "核心词，重点保留" },
        { term: "老房翻新", type: "需求明确", impression: null, click: null, spend: null, cpc: null, conversion: null, verdict: "适合重点追踪" },
        { term: "装修报价", type: "价格意图", impression: null, click: null, spend: null, cpc: null, conversion: null, verdict: "看线索质量" },
        { term: "全包装修", type: "产品相关", impression: null, click: null, spend: null, cpc: null, conversion: null, verdict: "看是否有效线索" },
      ],
    },
    risk: {
      note: "风险词不一定马上否，先看是否高消费、低转化、CRM 无效。连续浪费再处理。",
      rows: [
        { term: "装修效果图", type: "看图意图", impression: null, click: null, spend: null, cpc: null, conversion: null, verdict: "花多无线索再收窄" },
        { term: "法式风格装修效果图", type: "内容/图片", impression: null, click: null, spend: null, cpc: null, conversion: null, verdict: "容易只看图" },
        { term: "全屋定制排名", type: "业务偏移", impression: null, click: null, spend: null, cpc: null, conversion: null, verdict: "谨慎观察" },
        { term: "竞品公司地址", type: "竞品/地址", impression: null, click: null, spend: null, cpc: null, conversion: null, verdict: "无有效线索则否" },
      ],
    },
    invalid: {
      note: "无效词是大概率偏离家装获客的词。出现一次先记录，连续花钱且无效就优先处理。",
      rows: [
        { term: "招聘", type: "招聘", impression: null, click: null, spend: null, cpc: null, conversion: null, verdict: "优先否词" },
        { term: "加盟", type: "加盟", impression: null, click: null, spend: null, cpc: null, conversion: null, verdict: "优先否词" },
        { term: "材料批发", type: "材料/批发", impression: null, click: null, spend: null, cpc: null, conversion: null, verdict: "偏离获客" },
        { term: "维修", type: "维修", impression: null, click: null, spend: null, cpc: null, conversion: null, verdict: "非装修主需求" },
        { term: "外地装修公司", type: "地域偏移", impression: null, click: null, spend: null, cpc: null, conversion: null, verdict: "核地域后处理" },
      ],
    },
  },
};

const links = {
  home: "https://cc.baidu.com/homepage",
  report: "https://cc.baidu.com/fc/commonapps/kanban/cc/list/user/37913916",
  account32174643: "https://tuiguang.baidu.com/oneWeb.html?userid=32174643&castk=70f64qa7910e87697d522",
  account33334591: "https://tuiguang.baidu.com/oneWeb.html?userid=33334591&castk=70f64qa7910e87697d522",
  localServer: "http://127.0.0.1:8787/",
};

const money = (value) =>
  Number(value).toLocaleString("zh-CN", {
    minimumFractionDigits: value >= 100 ? 0 : 2,
    maximumFractionDigits: 2,
  });

const setText = (selector, value) => {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
};

function setStatus(type, message) {
  const box = document.querySelector("#refreshStatus");
  if (!box) return;
  box.className = `status-card ${type || ""}`.trim();
  box.innerHTML = `<strong>实时刷新</strong><span>${message}</span>`;
}

function updateKpis() {
  setText("#updatedAt", data.updatedAt || "未知");
  setText("#dataScope", data.scope || "数据口径");
  setText("#todaySpend", `¥${money(data.totals.todaySpend || 0)}`);
  setText("#balance", `¥${money(data.totals.balance || 0)}`);
  setText("#todayClicks", `${data.totals.clicks ?? "-"}`);
  setText("#todayConversions", `${data.totals.conversions ?? "-"}`);
  setText("#avgCpc", `¥${money(data.totals.avgCpc || 0)}`);
  setText("#conversionCost", `¥${money(data.totals.conversionCost || 0)}`);
}

function renderAccounts() {
  const list = document.querySelector("#accountList");
  list.innerHTML = data.accounts
    .map((account) => {
      const over = account.searchUsage > 100 ? "over" : "";
      const url =
        account.id === "33334591"
          ? "https://tuiguang.baidu.com/oneWeb.html?userid=33334591&castk=70f64qa7910e87697d522"
          : "https://tuiguang.baidu.com/oneWeb.html?userid=32174643&castk=70f64qa7910e87697d522";
      return `
        <div class="account-row">
          <div>
            <h3>${account.name}</h3>
            <p>${account.role}</p>
            <a class="action-link" href="${url}" target="_blank" rel="noreferrer">进账户首页</a>
          </div>
          <div>
            <span class="cell-label">搜索预算利用率</span>
            <span class="cell-value">${account.searchUsage}%</span>
            <div class="bar ${over}" style="--w:${account.searchUsage}%"><span></span></div>
          </div>
          <div>
            <span class="cell-label">CPC</span>
            <span class="cell-value">¥${money(account.cpc)}</span>
          </div>
          <div>
            <span class="cell-label">目标转化成本</span>
            <span class="cell-value">¥${money(account.cpa)}</span>
          </div>
          <div>
            <span class="cell-label">看板判断</span>
            <span class="cell-value">${account.conversions} 转化</span>
            <p>${account.note}</p>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderFunnel() {
  const funnel = document.querySelector("#funnel");
  const funnelData = data.funnel || [
    { label: "展现", value: data.totals.impressions || 0, base: data.totals.impressions || 1 },
    { label: "点击", value: data.totals.clicks || 0, base: data.totals.impressions || 1 },
    { label: "目标转化", value: data.totals.conversions || 0, base: data.totals.clicks || 1 },
    { label: "深度转化", value: 0, base: data.totals.conversions || 1 },
    { label: "CRM有效线索", value: null, base: data.totals.conversions || 1 },
  ];
  funnel.innerHTML = funnelData
    .map((item) => {
      const text = item.value === null ? "待填" : item.value.toLocaleString("zh-CN");
      const width = item.value === null ? 6 : Math.max(3, Math.min(100, (item.value / item.base) * 100));
      return `
        <div class="funnel-row">
          <strong>${item.label}</strong>
          <div class="funnel-track"><div class="funnel-fill" style="--w:${width}%"></div></div>
          <span>${text}</span>
        </div>
      `;
    })
    .join("");
}

function renderChecklist() {
  const checklist = document.querySelector("#checklist");
  checklist.innerHTML = data.checks
    .map(([title, desc], index) => {
      const id = `daily-check-${index}`;
      const checked = localStorage.getItem(id) === "1" ? "checked" : "";
      return `
        <label class="check-item">
          <input type="checkbox" data-check-id="${id}" ${checked} />
          <span>
            <strong>${title}</strong>
            <span>${desc}</span>
          </span>
        </label>
      `;
    })
    .join("");

  checklist.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      localStorage.setItem(input.dataset.checkId, input.checked ? "1" : "0");
    });
  });
}

function renderTermColumns() {
  const container = document.querySelector("#termColumns");
  if (!container) return;
  container.innerHTML = data.termGroups
    .map(
      (group) => `
        <div class="term-card ${group.level}">
          <div class="term-card-head">
            <strong>${group.title}</strong>
            <span>${group.action}</span>
          </div>
          <div class="term-tags">
            ${group.examples.map((term) => `<span>${term}</span>`).join("")}
          </div>
        </div>
      `
    )
    .join("");
}

function renderConversionQuality() {
  const container = document.querySelector("#conversionQuality");
  if (!container) return;
  const rows = [
    {
      label: "账户首页",
      value: data.updatedAt || "未读取",
      note: data.source ? `来源：${data.source}` : "读取 live-data.json",
    },
    {
      label: "搜索词报表",
      value: data.trackerStatus?.includes("识别到") ? "已接入" : "待接入",
      note: data.trackerStatus || "等待刷新器读取搜索词数据",
    },
    {
      label: "CRM有效线索",
      value: data.funnel?.find?.((item) => item.label === "CRM有效线索")?.value ?? "待接入",
      note: "百度转化和真实有效线索还需要 CRM 数据源补齐",
    },
  ];
  container.innerHTML = rows
    .map(
      (item) => `
        <div class="quality-row">
          <div>
            <strong>${item.label}</strong>
            <span>${item.note}</span>
          </div>
          <b>${item.value}</b>
        </div>
      `
    )
    .join("");
}

function accountUrl(account) {
  return account.id === "33334591" ? links.account33334591 : links.account32174643;
}

function allTrackedRows() {
  return Object.entries(data.trackers || {}).flatMap(([group, tracker]) =>
    (tracker.rows || []).map((row) => ({ ...row, group }))
  );
}

function addAlert(alerts, level, title, detail, href, action) {
  alerts.push({ level, title, detail, href, action });
}

function buildAlerts() {
  const alerts = [];
  const totals = data.totals || {};
  const totalDailyBudget = (data.accounts || []).reduce(
    (sum, account) => sum + (account.searchBudget || 0) + (account.infoBudget || 0),
    0
  );
  const balanceDays = totalDailyBudget ? (totals.balance || 0) / totalDailyBudget : null;

  if (window.location.protocol === "file:") {
    addAlert(
      alerts,
      "bad",
      "当前是文件预览，刷新按钮不会实时工作",
      "请用一键启动脚本打开本地服务后访问 127.0.0.1:8787；file:// 页面没有 /api/refresh 接口。",
      links.localServer,
      "打开本地看板"
    );
  }

  if (balanceDays !== null && balanceDays < 3) {
    addAlert(
      alerts,
      "bad",
      "账户余额可能不够 3 天",
      `当前余额约 ¥${money(totals.balance || 0)}，按现有预算约 ${balanceDays.toFixed(1)} 天。`,
      links.home,
      "回客户中心"
    );
  }

  (data.accounts || []).forEach((account) => {
    if ((account.searchUsage || 0) >= 60) {
      addAlert(
        alerts,
        account.searchUsage >= 90 ? "bad" : "warn",
        `${account.name} 预算利用率偏快`,
        `搜索预算已用 ${account.searchUsage}%，今日消费 ¥${money(account.searchSpend || 0)}。`,
        accountUrl(account),
        "进账户"
      );
    }
    if ((account.cpc || 0) >= 60 && (account.conversions || 0) <= 1) {
      addAlert(
        alerts,
        "warn",
        `${account.name} CPC 偏高`,
        `当前 CPC ¥${money(account.cpc)}，目标转化 ${account.conversions || 0} 个，优先核搜索词质量。`,
        links.report,
        "看搜索词"
      );
    }
    if ((account.cpa || 0) >= 2500) {
      addAlert(
        alerts,
        "bad",
        `${account.name} 目标转化成本偏高`,
        `当前目标转化成本 ¥${money(account.cpa)}，需要回看全链路转化和搜索词。`,
        links.report,
        "看全链路"
      );
    }
  });

  allTrackedRows().forEach((row) => {
    if (row.group === "invalid" && (row.spend || 0) > 0) {
      addAlert(
        alerts,
        "bad",
        `无效词开始花钱：${row.term}`,
        `已消费 ¥${money(row.spend)}，转化 ${row.conversion || 0}。`,
        links.report,
        "看搜索词"
      );
    }
    if (row.group === "risk" && (row.spend || 0) >= 300 && !row.conversion) {
      addAlert(
        alerts,
        "warn",
        `风险词花费无转化：${row.term}`,
        `已消费 ¥${money(row.spend)}，暂未读到转化。`,
        links.report,
        "看搜索词"
      );
    }
  });

  if (!data.trackerStatus?.includes("识别到")) {
    addAlert(
      alerts,
      "neutral",
      "搜索词指标还没有实时读入",
      data.trackerStatus || "刷新器还没有从百度搜索词报表里识别到词级曝光、点击、消费、转化。",
      links.report,
      "打开报表"
    );
  }

  if (!alerts.length) {
    addAlert(alerts, "ok", "当前没有明显异常", "账户消费、CPC、转化成本和追踪词暂未触发风险规则。", links.home, "回平台");
  }
  return alerts.slice(0, 8);
}

function renderAlerts() {
  const alerts = buildAlerts();
  const board = document.querySelector("#alertBoard");
  const badge = document.querySelector("#alertCountBadge");
  if (badge) {
    const risky = alerts.filter((item) => item.level === "bad" || item.level === "warn").length;
    badge.textContent = risky ? `${risky} 个需关注` : "正常";
    badge.className = `badge ${risky ? "warn" : ""}`.trim();
  }
  if (!board) return;
  board.innerHTML = alerts
    .map(
      (alert) => `
        <div class="alert-item ${alert.level}">
          <span class="dot ${alert.level}"></span>
          <strong>${alert.title}</strong>
          <p>${alert.detail}</p>
          <a class="action-link" href="${alert.href}" target="_blank" rel="noreferrer">${alert.action}</a>
        </div>
      `
    )
    .join("");
}

function renderRuleOutput() {
  const container = document.querySelector("#ruleOutput");
  if (!container) return;
  container.innerHTML = buildAlerts()
    .slice(0, 4)
    .map(
      (alert) => `
        <div class="rule ${alert.level}">
          <strong>${alert.title}</strong>
          <span>${alert.detail}</span>
          <a class="action-link" href="${alert.href}" target="_blank" rel="noreferrer">${alert.action}</a>
        </div>
      `
    )
    .join("");
}

let activeTracker = "focus";

function metricText(value, format = "number") {
  if (value === null || value === undefined || value === "") return "待导入";
  if (format === "money") return `¥${money(value)}`;
  return Number(value).toLocaleString("zh-CN");
}

function renderTermTracker() {
  const tracker = data.trackers?.[activeTracker] || data.trackers?.focus;
  const note = document.querySelector("#trackerNote");
  const body = document.querySelector("#termTrackerBody");
  if (!tracker || !body) return;
  if (note) note.textContent = tracker.note;

  body.innerHTML = tracker.rows
    .map(
      (row) => `
        <tr>
          <td><strong>${row.term}</strong></td>
          <td><span class="term-type">${row.type}</span></td>
          <td>${metricText(row.impression)}</td>
          <td>${metricText(row.click)}</td>
          <td>${metricText(row.spend, "money")}</td>
          <td>${metricText(row.cpc, "money")}</td>
          <td>${metricText(row.conversion)}</td>
          <td><span class="verdict">${row.verdict}</span></td>
        </tr>
      `
    )
    .join("");
}

function bindTrackerTabs() {
  document.querySelectorAll(".tracker-tab").forEach((button) => {
    button.addEventListener("click", () => {
      activeTracker = button.dataset.tracker || "focus";
      document.querySelectorAll(".tracker-tab").forEach((item) => item.classList.toggle("active", item === button));
      renderTermTracker();
    });
  });
}

function setupCanvas(canvas) {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.round(rect.width * ratio);
  canvas.height = Math.round(rect.height * ratio);
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);
  return { ctx, width: rect.width, height: rect.height };
}

function drawBars(canvasId, series, options) {
  const canvas = document.querySelector(canvasId);
  const { ctx, width, height } = setupCanvas(canvas);
  const pad = { left: 46, right: 16, top: 18, bottom: 54 };
  const max = options.max || Math.max(...series.flatMap((s) => s.values)) * 1.2;
  const colors = options.colors;
  ctx.clearRect(0, 0, width, height);
  ctx.font = "12px -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
  ctx.fillStyle = "#667085";

  for (let i = 0; i <= 4; i += 1) {
    const y = pad.top + ((height - pad.top - pad.bottom) * i) / 4;
    ctx.strokeStyle = "#e8edf5";
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    const label = Math.round(max - (max * i) / 4);
    ctx.fillText(String(label), 8, y + 4);
  }

  const labels = options.labels;
  const groupWidth = (width - pad.left - pad.right) / labels.length;
  const barWidth = Math.min(42, groupWidth / (series.length + 1.5));

  labels.forEach((label, index) => {
    const center = pad.left + groupWidth * index + groupWidth / 2;
    ctx.fillStyle = "#172033";
    ctx.textAlign = "center";
    ctx.fillText(label, center, height - 24);
    series.forEach((item, seriesIndex) => {
      const value = item.values[index];
      const barHeight = ((height - pad.top - pad.bottom) * value) / max;
      const x = center - (series.length * barWidth) / 2 + seriesIndex * barWidth;
      const y = height - pad.bottom - barHeight;
      ctx.fillStyle = colors[seriesIndex];
      roundRect(ctx, x, y, barWidth - 8, barHeight, 5);
      ctx.fill();
      ctx.fillStyle = "#172033";
      ctx.font = "12px -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
      ctx.fillText(options.valueFormatter(value, item, index), x + (barWidth - 8) / 2, y - 8);
    });
  });

  ctx.textAlign = "left";
  series.forEach((item, index) => {
    const x = pad.left + index * 110;
    ctx.fillStyle = colors[index];
    roundRect(ctx, x, height - 12, 12, 8, 3);
    ctx.fill();
    ctx.fillStyle = "#667085";
    ctx.fillText(item.name, x + 18, height - 5);
  });
}

function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function drawCharts() {
  drawBars(
    "#budgetChart",
    [{ name: "搜索预算利用率", values: data.accounts.map((item) => item.searchUsage) }],
    {
      labels: data.accounts.map((item) => item.name.replace("tj", "")),
      max: 100,
      colors: ["#1f6feb"],
      valueFormatter: (value) => `${value}%`,
    }
  );

  drawBars(
    "#cpcConversionChart",
    [
      { name: "CPC", values: data.accounts.map((item) => item.cpc) },
      {
        name: "目标转化成本",
        values: data.accounts.map((item) => item.cpa / 100),
        displayValues: data.accounts.map((item) => item.cpa),
      },
    ],
    {
      labels: data.accounts.map((item) => item.name.replace("tj", "")),
      max: 100,
      colors: ["#00a4c7", "#d92d20"],
      valueFormatter: (value, item, index) => `¥${money(item.displayValues ? item.displayValues[index] : value)}`,
    }
  );
}

function normalizeLiveData(live) {
  const normalized = {
    ...data,
    ...live,
    totals: { ...data.totals, ...(live.totals || {}) },
    accounts: live.accounts || data.accounts,
  };

  if (live.funnel && !Array.isArray(live.funnel)) {
    const funnel = live.funnel;
    normalized.funnel = [
      { label: "展现", value: funnel.impressions, base: funnel.impressions || 1 },
      { label: "点击", value: funnel.clicks, base: funnel.impressions || 1 },
      { label: "目标转化", value: funnel.targetConversions, base: funnel.clicks || 1 },
      { label: "深度转化", value: funnel.deepConversions, base: funnel.targetConversions || 1 },
      { label: "CRM有效线索", value: funnel.crmValidLeads, base: funnel.targetConversions || 1 },
    ];
  }

  if (live.searchTerms) {
    const summary = document.querySelector(".term-summary");
    if (summary) {
      summary.innerHTML = `
        <div><span>近 7 日搜索词记录</span><strong>${live.searchTerms.records7d}</strong></div>
        <div><span>近 7 日点击</span><strong>${live.searchTerms.clicks7d}</strong></div>
        <div><span>近 7 日消费</span><strong>¥${money(live.searchTerms.spend7d)}</strong></div>
      `;
    }
  }

  return normalized;
}

function renderAll() {
  updateKpis();
  renderAccounts();
  renderFunnel();
  renderChecklist();
  renderTermColumns();
  renderConversionQuality();
  renderTermTracker();
  renderAlerts();
  renderRuleOutput();
  drawCharts();
}

async function loadLiveData() {
  try {
    const response = await fetch(`./live-data.json?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const live = await response.json();
    data = normalizeLiveData(live);
  } catch (error) {
    console.warn("live-data.json 暂时不可用，使用页面内置数据", error);
  }
  renderAll();
}

async function refreshFromBaidu() {
  const button = document.querySelector("#refreshButton");
  if (window.location.protocol === "file:") {
    setStatus(
      "error",
      "当前是 file:// 文件预览，不能调用刷新器。请用 start-dashboard.command 启动后打开 http://127.0.0.1:8787/。"
    );
    renderAll();
    return;
  }
  if (button) {
    button.disabled = true;
    button.textContent = "刷新中...";
  }
  setStatus("loading", "正在通过本地刷新器读取百度账户首页，只读数据，不会改预算或投放。");
  try {
    const response = await fetch(`./api/refresh?t=${Date.now()}`, { cache: "no-store" });
    const result = await response.json();
    if (!result.ok) {
      setStatus("error", `${result.hint || "刷新失败"} ${result.error ? `（${result.error.slice(0, 120)}）` : ""}`);
      return;
    }
    data = normalizeLiveData(result.data);
    renderAll();
    setStatus("success", `已刷新百度数据，更新时间：${result.data.updatedAt}。${result.data.trackerStatus || ""}`);
  } catch (error) {
    setStatus("error", `刷新失败：${String(error.message || error)}。请确认已用一键启动脚本启动看板服务。`);
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = "刷新百度数据";
    }
  }
}

loadLiveData();
bindTrackerTabs();
setInterval(loadLiveData, 30000);
document.querySelector("#refreshButton")?.addEventListener("click", refreshFromBaidu);
window.addEventListener("resize", drawCharts);
