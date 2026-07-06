import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const execFileAsync = promisify(execFile);
const root = fileURLToPath(new URL(".", import.meta.url));
const liveDataPath = join(root, "live-data.json");
const credentialService = "baidu-sem-dashboard";
const credentialAccount = "BDCC-天津全包圆管家";
const loginUrl = "https://passport.baidu.com/v2/?login";
const reportUrls = [
  {
    name: "搜索词/报表模板入口",
    url: "https://cc.baidu.com/fc/commonapps/kanban/cc/list/user/37913916",
  },
  {
    name: "全链路转化报表",
    url: "https://cc.baidu.com/fc/commonapps/kanban/cc/new/TABLE/user/37913916?reportType=970655&templateId=181",
  },
];

const trackerDefinitions = {
  focus: {
    note: "重点搜索词是你希望持续拿量的词。刷新器会尝试从百度搜索词报表读取曝光、点击、消费、CPC、转化。",
    rows: [
      { term: "装修公司哪家好", type: "强意图", verdict: "优先观察转化成本" },
      { term: "天津装修公司", type: "本地强意图", verdict: "核心词，重点保留" },
      { term: "老房翻新", type: "需求明确", verdict: "适合重点追踪" },
      { term: "装修报价", type: "价格意图", verdict: "看线索质量" },
      { term: "全包装修", type: "产品相关", verdict: "看是否有效线索" },
    ],
  },
  risk: {
    note: "风险词不一定马上否，先看是否高消费、低转化、CRM 无效。连续浪费再处理。",
    rows: [
      { term: "装修效果图", type: "看图意图", verdict: "花多无线索再收窄" },
      { term: "法式风格装修效果图", type: "内容/图片", verdict: "容易只看图" },
      { term: "全屋定制排名", type: "业务偏移", verdict: "谨慎观察" },
      { term: "竞品公司地址", type: "竞品/地址", verdict: "无有效线索则否" },
    ],
  },
  invalid: {
    note: "无效词是大概率偏离家装获客的词。出现一次先记录，连续花钱且无效就优先处理。",
    rows: [
      { term: "招聘", type: "招聘", verdict: "优先否词" },
      { term: "加盟", type: "加盟", verdict: "优先否词" },
      { term: "材料批发", type: "材料/批发", verdict: "偏离获客" },
      { term: "维修", type: "维修", verdict: "非装修主需求" },
      { term: "外地装修公司", type: "地域偏移", verdict: "核地域后处理" },
    ],
  },
};

const accounts = [
  {
    id: "32174643",
    name: "tj全包圆2",
    role: "行业通用-资金共享",
    url: "https://tuiguang.baidu.com/oneWeb.html?userid=32174643&castk=70f64qa7910e87697d522",
  },
  {
    id: "33334591",
    name: "tj全包圆家居1",
    role: "品牌词-资金共享",
    url: "https://tuiguang.baidu.com/oneWeb.html?userid=33334591&castk=70f64qa7910e87697d522",
  },
];

function scriptFor(target) {
  const js = "document.body.innerText";
  return [
    `tell application "Google Chrome"`,
    `activate`,
    `if (count of windows) = 0 then make new window`,
    `set URL of active tab of front window to "${target.url}"`,
    `end tell`,
    `delay 8`,
    `tell application "Google Chrome"`,
    `return execute active tab of front window javascript "${js}"`,
    `end tell`,
  ].join("\n");
}

function escapeJsString(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function chromeTextScript(target, delayMs = 8000) {
  const seconds = Math.max(1, Math.round(delayMs / 1000));
  return [
    `tell application "Google Chrome"`,
    `activate`,
    `if (count of windows) = 0 then make new window`,
    `set URL of active tab of front window to "${target.url}"`,
    `end tell`,
    `delay ${seconds}`,
    `tell application "Google Chrome"`,
    `return execute active tab of front window javascript "document.body.innerText"`,
    `end tell`,
  ].join("\n");
}

async function readChromeText(target, delayMs = 8000) {
  const { stdout } = await execFileAsync("osascript", ["-e", chromeTextScript(target, delayMs)], {
    timeout: 25000,
    maxBuffer: 1024 * 1024 * 5,
  });
  return stdout.trim();
}

async function readKeychainPassword(accountName = credentialAccount) {
  try {
    const { stdout } = await execFileAsync(
      "security",
      ["find-generic-password", "-a", accountName, "-s", credentialService, "-w"],
      { timeout: 5000, maxBuffer: 1024 * 256 }
    );
    return stdout.trim();
  } catch {
    return "";
  }
}

async function readCredentials() {
  const username = process.env.BAIDU_LOGIN_NAME || credentialAccount;
  const password = process.env.BAIDU_LOGIN_PASSWORD || (await readKeychainPassword(username)) || (await readKeychainPassword());
  return { username, password };
}

function isLoginRequired(text) {
  return /登录|验证码|安全验证|请输入/.test(text) && !text.includes("核心数据");
}

function loginScript(username, password) {
  const js = `
    (() => {
      const username = "${escapeJsString(username)}";
      const password = "${escapeJsString(password)}";
      const userInput = document.querySelector('#TANGRAM__PSP_3__userName, input[name="userName"], input[name="username"], input[type="text"]');
      const passInput = document.querySelector('#TANGRAM__PSP_3__password, input[name="password"], input[type="password"]');
      const tokenInput = document.querySelector('input[name*="verify"], input[id*="verify"], input[name*="code"], input[id*="code"]');
      const loginButton = document.querySelector('#TANGRAM__PSP_3__submit, input[type="submit"], button[type="submit"], .pass-button-submit');
      if (!userInput || !passInput) return 'login_form_not_found';
      userInput.focus();
      userInput.value = username;
      userInput.dispatchEvent(new Event('input', { bubbles: true }));
      userInput.dispatchEvent(new Event('change', { bubbles: true }));
      passInput.focus();
      passInput.value = password;
      passInput.dispatchEvent(new Event('input', { bubbles: true }));
      passInput.dispatchEvent(new Event('change', { bubbles: true }));
      if (tokenInput) return 'needs_verification';
      if (!loginButton) return 'login_button_not_found';
      loginButton.click();
      return 'submitted';
    })();
  `
    .replace(/\s+/g, " ")
    .trim();

  return [
    `tell application "Google Chrome"`,
    `activate`,
    `if (count of windows) = 0 then make new window`,
    `set URL of active tab of front window to "${loginUrl}"`,
    `end tell`,
    `delay 5`,
    `tell application "Google Chrome"`,
    `return execute active tab of front window javascript "${escapeJsString(js)}"`,
    `end tell`,
  ].join("\n");
}

async function attemptBaiduLogin() {
  const { username, password } = await readCredentials();
  if (!password) {
    throw new Error(
      "未找到百度登录密码。请先运行 setup-baidu-credentials.command 存入本机钥匙串，或启动服务前设置 BAIDU_LOGIN_PASSWORD。"
    );
  }

  const { stdout } = await execFileAsync("osascript", ["-e", loginScript(username, password)], {
    timeout: 30000,
    maxBuffer: 1024 * 1024,
  });
  const status = stdout.trim();
  if (status === "needs_verification") {
    throw new Error("百度登录页需要验证码/短信验证。请在 Chrome 手动完成一次验证后，再点刷新。");
  }
  if (status !== "submitted") {
    throw new Error(`百度自动登录未完成：${status || "未知状态"}`);
  }
  await new Promise((resolve) => setTimeout(resolve, 9000));
}

async function readChromeTextWithLogin(target, delayMs = 8000) {
  let text = await readChromeText(target, delayMs);
  if (!isLoginRequired(text)) return text;

  await attemptBaiduLogin();
  text = await readChromeText(target, delayMs);
  if (isLoginRequired(text)) {
    throw new Error(`${target.name || target.url} 登录后仍需要验证，请在 Chrome 手动完成安全验证后再刷新。`);
  }
  return text;
}

async function readPreviousLiveData() {
  try {
    return JSON.parse(await readFile(liveDataPath, "utf8"));
  } catch {
    return {};
  }
}

function numberAfter(text, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`${escaped}\\s*\\n\\s*([0-9,.]+)`);
  const match = text.match(re);
  return match ? Number(match[1].replace(/,/g, "")) : 0;
}

function parseCoreMetrics(text, account) {
  if (isLoginRequired(text)) {
    throw new Error(`${account.name} 页面看起来未登录或需要验证`);
  }

  const balance = numberAfter(text, "推广余额");
  const spend = numberAfter(text, "核心数据");

  const values = [...text.matchAll(/\n\s*([0-9,.]+)\s*\n\s*(?:[0-9.]+%)?\s*\n\s*(消费\(元\)|展现\(次\)|点击\(次\)|转化\(次\))/g)].map((m) => ({
    value: Number(m[1].replace(/,/g, "")),
    label: m[2],
  }));

  const valueFor = (label) => values.find((item) => item.label === label)?.value ?? 0;
  const searchSpendMatch = text.match(/搜索推广\s*\n\s*消费\s*\n\s*([0-9,.]+)/);
  const searchSpend = searchSpendMatch ? Number(searchSpendMatch[1].replace(/,/g, "")) : valueFor("消费(元)") || spend;
  const searchBudget = numberAfter(text, "日预算") || 0;
  const infoMatch = text.match(/信息流推广\s*\n\s*消费\s*\n\s*([0-9,.]+)\s*\n\s*日预算\s*\n\s*([0-9,.]+)/);
  const infoSpend = infoMatch ? Number(infoMatch[1].replace(/,/g, "")) : 0;
  const infoBudget = infoMatch ? Number(infoMatch[2].replace(/,/g, "")) : 0;
  const clicks = valueFor("点击(次)");
  const conversions = valueFor("转化(次)");
  const impressions = valueFor("展现(次)");

  return {
    id: account.id,
    name: account.name,
    role: account.role,
    balance,
    searchBudget,
    searchSpend,
    searchUsage: searchBudget ? Number(((searchSpend / searchBudget) * 100).toFixed(2)) : 0,
    infoBudget,
    infoSpend,
    impressions,
    clicks,
    conversions,
    cpc: clicks ? Number((searchSpend / clicks).toFixed(2)) : 0,
    cpa: conversions ? Number((searchSpend / conversions).toFixed(2)) : 0,
    note:
      conversions > 0
        ? `今日已有 ${conversions} 个百度转化，继续核 CRM 有效线索`
        : "今日暂未读到百度转化，优先看搜索词和消费速度",
  };
}

function emptyTrackerRow(row) {
  return {
    ...row,
    impression: null,
    click: null,
    spend: null,
    cpc: null,
    conversion: null,
  };
}

function classifyVerdict(row) {
  if (row.spend === null || row.spend === undefined) return row.verdict;
  if (row.spend >= 300 && !row.conversion) return `${row.verdict}；已花钱无线索，重点排查`;
  if (row.conversion > 0) return `${row.verdict}；已有百度转化，去 CRM 核有效`;
  return row.verdict;
}

function parseNumbersFromLine(line) {
  return [...line.matchAll(/(?:¥\s*)?(-?\d[\d,]*(?:\.\d+)?%?)/g)].map((match) => match[1]);
}

function toNumber(value) {
  if (!value || String(value).includes("%")) return null;
  return Number(String(value).replace(/,/g, ""));
}

function parseMetricRowFromText(text, term) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const exactIndex = lines.findIndex((line) => line === term);
  const fuzzyIndex = lines.findIndex((line) => line.includes(term));
  const index = exactIndex >= 0 ? exactIndex : fuzzyIndex;
  if (index < 0) return null;

  const sameLine = lines[index].includes("\t") ? lines[index].split("\t") : [];
  let numericValues = sameLine.length > 1 ? sameLine.flatMap(parseNumbersFromLine) : [];

  if (numericValues.length < 4) {
    const window = lines.slice(Math.max(0, index - 10), Math.min(lines.length, index + 22));
    numericValues = window
      .filter((line) => line !== term && !line.includes("ID:"))
      .flatMap(parseNumbersFromLine)
      .filter((value) => !String(value).includes("%"));
  }

  const nums = numericValues.map(toNumber).filter((value) => Number.isFinite(value));
  if (nums.length < 3) return null;

  const impression = Math.max(0, Math.round(nums[0] || 0));
  const click = Math.max(0, Math.round(nums[1] || 0));
  const spend = Number((nums[2] || 0).toFixed(2));
  const cpc = nums[3] !== undefined ? Number(nums[3].toFixed(2)) : click ? Number((spend / click).toFixed(2)) : 0;
  const conversion = nums[4] !== undefined ? Math.max(0, Math.round(nums[4])) : 0;

  if (!impression && !click && !spend && !conversion) return null;
  return { impression, click, spend, cpc, conversion };
}

function buildTrackersFromReportText(text, previousTrackers) {
  let matched = 0;
  const trackers = Object.fromEntries(
    Object.entries(trackerDefinitions).map(([key, group]) => [
      key,
      {
        note: group.note,
        rows: group.rows.map((row) => {
          const metrics = parseMetricRowFromText(text, row.term);
          if (metrics) {
            matched += 1;
            return { ...row, ...metrics, verdict: classifyVerdict({ ...row, ...metrics }) };
          }
          const previousRow = previousTrackers?.[key]?.rows?.find((item) => item.term === row.term);
          return previousRow ? { ...emptyTrackerRow(row), ...previousRow } : emptyTrackerRow(row);
        }),
      },
    ])
  );

  return {
    matched,
    trackers,
    status:
      matched > 0
        ? `已从百度页面识别到 ${matched} 个追踪词的指标`
        : "没有在当前可读页面里识别到追踪词指标；请在 Chrome 登录后打开“搜索词数据”报表详情页，再点刷新。",
  };
}

function nowText() {
  const date = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(
    date.getMinutes()
  )}`;
}

export async function refreshBaiduData() {
  try {
    const previousLiveData = await readPreviousLiveData();
    const accountData = [];
    for (const account of accounts) {
      const text = await readChromeTextWithLogin(account);
      accountData.push(parseCoreMetrics(text, account));
    }

    const reportTexts = [];
    for (const report of reportUrls) {
      try {
        reportTexts.push(await readChromeTextWithLogin(report, 10000));
      } catch {
        // Account data is the hard requirement. Report pages can be unavailable until the user opens/logs in.
      }
    }
    const trackerResult = buildTrackersFromReportText(reportTexts.join("\n"), previousLiveData.trackers);

    const totals = accountData.reduce(
      (sum, account) => {
        sum.todaySpend += account.searchSpend + account.infoSpend;
        sum.impressions += account.impressions;
        sum.clicks += account.clicks;
        sum.conversions += account.conversions;
        sum.balance = Math.max(sum.balance, account.balance);
        return sum;
      },
      { todaySpend: 0, balance: 0, impressions: 0, clicks: 0, conversions: 0 }
    );
    totals.avgCpc = totals.clicks ? Number((totals.todaySpend / totals.clicks).toFixed(2)) : 0;
    totals.conversionCost = totals.conversions ? Number((totals.todaySpend / totals.conversions).toFixed(2)) : 0;

    const liveData = {
      source: "baidu_account_homepage_chrome_refresh",
      updatedAt: nowText(),
      scope: "Chrome 读取百度账户首页",
      totals,
      accounts: accountData,
      searchTerms: {
        records7d: previousLiveData.searchTerms?.records7d ?? 1063,
        clicks7d: previousLiveData.searchTerms?.clicks7d ?? 1246,
        spend7d: previousLiveData.searchTerms?.spend7d ?? 52800.05,
      },
      trackers: trackerResult.trackers,
      trackerStatus: trackerResult.status,
      funnel: {
        impressions: totals.impressions,
        clicks: totals.clicks,
        targetConversions: totals.conversions,
        deepConversions: 0,
        crmValidLeads: null,
      },
    };

    await writeFile(liveDataPath, `${JSON.stringify(liveData, null, 2)}\n`, "utf8");
    return { ok: true, data: liveData };
  } catch (error) {
    const message = String(error?.message || error);
    const appleJsDisabled = message.includes("AppleScript 执行 JavaScript") || message.includes("JavaScript 的功能已关闭");
    const missingCredentials = message.includes("未找到百度登录密码");
    const needsVerification = message.includes("验证码") || message.includes("短信验证") || message.includes("安全验证");
    return {
      ok: false,
      error: message,
      hint: appleJsDisabled
        ? "需要在 Chrome 菜单栏打开：查看 -> 开发者 -> 允许 Apple 事件中的 JavaScript。打开后重新点看板里的刷新按钮。"
        : missingCredentials
        ? "已加入自动登录逻辑，但还没在本机钥匙串里找到百度密码。请双击 setup-baidu-credentials.command 存一次。"
        : needsVerification
        ? "百度触发验证码/短信/安全验证，请在 Chrome 手动完成一次，之后刷新器会继续用登录态读取数据。"
        : "请确认 Chrome 已登录百度营销，并且打开账户页时不需要验证码。",
    };
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = await refreshBaiduData();
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.ok ? 0 : 1);
}
