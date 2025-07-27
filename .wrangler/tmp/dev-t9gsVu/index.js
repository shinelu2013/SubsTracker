var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-Ax5670/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// index.js
function formatBeijingTime(date = /* @__PURE__ */ new Date(), format = "full") {
  if (format === "date") {
    return date.toLocaleDateString("zh-CN", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  } else if (format === "datetime") {
    return date.toLocaleString("zh-CN", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  } else {
    return date.toLocaleString("zh-CN", {
      timeZone: "Asia/Shanghai"
    });
  }
}
__name(formatBeijingTime, "formatBeijingTime");
var lunarCalendar = {
  // 农历数据 (1900-2100年)
  lunarInfo: [
    19416,
    19168,
    42352,
    21717,
    53856,
    55632,
    91476,
    22176,
    39632,
    21970,
    19168,
    42422,
    42192,
    53840,
    119381,
    46400,
    54944,
    44450,
    38320,
    84343,
    18800,
    42160,
    46261,
    27216,
    27968,
    109396,
    11104,
    38256,
    21234,
    18800,
    25958,
    54432,
    59984,
    28309,
    23248,
    11104,
    100067,
    37600,
    116951,
    51536,
    54432,
    120998,
    46416,
    22176,
    107956,
    9680,
    37584,
    53938,
    43344,
    46423,
    27808,
    46416,
    86869,
    19872,
    42416,
    83315,
    21168,
    43432,
    59728,
    27296,
    44710,
    43856,
    19296,
    43748,
    42352,
    21088,
    62051,
    55632,
    23383,
    22176,
    38608,
    19925,
    19152,
    42192,
    54484,
    53840,
    54616,
    46400,
    46752,
    103846,
    38320,
    18864,
    43380,
    42160,
    45690,
    27216,
    27968,
    44870,
    43872,
    38256,
    19189,
    18800,
    25776,
    29859,
    59984,
    27480,
    21952,
    43872,
    38613,
    37600,
    51552,
    55636,
    54432,
    55888,
    30034,
    22176,
    43959,
    9680,
    37584,
    51893,
    43344,
    46240,
    47780,
    44368,
    21977,
    19360,
    42416,
    86390,
    21168,
    43312,
    31060,
    27296,
    44368,
    23378,
    19296,
    42726,
    42208,
    53856,
    60005,
    54576,
    23200,
    30371,
    38608,
    19415,
    19152,
    42192,
    118966,
    53840,
    54560,
    56645,
    46496,
    22224,
    21938,
    18864,
    42359,
    42160,
    43600,
    111189,
    27936,
    44448
  ],
  // 天干地支
  gan: ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"],
  zhi: ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"],
  // 农历月份
  months: ["\u6B63", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u51AC", "\u814A"],
  // 农历日期
  days: [
    "\u521D\u4E00",
    "\u521D\u4E8C",
    "\u521D\u4E09",
    "\u521D\u56DB",
    "\u521D\u4E94",
    "\u521D\u516D",
    "\u521D\u4E03",
    "\u521D\u516B",
    "\u521D\u4E5D",
    "\u521D\u5341",
    "\u5341\u4E00",
    "\u5341\u4E8C",
    "\u5341\u4E09",
    "\u5341\u56DB",
    "\u5341\u4E94",
    "\u5341\u516D",
    "\u5341\u4E03",
    "\u5341\u516B",
    "\u5341\u4E5D",
    "\u4E8C\u5341",
    "\u5EFF\u4E00",
    "\u5EFF\u4E8C",
    "\u5EFF\u4E09",
    "\u5EFF\u56DB",
    "\u5EFF\u4E94",
    "\u5EFF\u516D",
    "\u5EFF\u4E03",
    "\u5EFF\u516B",
    "\u5EFF\u4E5D",
    "\u4E09\u5341"
  ],
  // 获取农历年天数
  lunarYearDays: /* @__PURE__ */ __name(function(year) {
    let sum = 348;
    for (let i = 32768; i > 8; i >>= 1) {
      sum += this.lunarInfo[year - 1900] & i ? 1 : 0;
    }
    return sum + this.leapDays(year);
  }, "lunarYearDays"),
  // 获取闰月天数
  leapDays: /* @__PURE__ */ __name(function(year) {
    if (this.leapMonth(year)) {
      return this.lunarInfo[year - 1900] & 65536 ? 30 : 29;
    }
    return 0;
  }, "leapDays"),
  // 获取闰月月份
  leapMonth: /* @__PURE__ */ __name(function(year) {
    return this.lunarInfo[year - 1900] & 15;
  }, "leapMonth"),
  // 获取农历月天数
  monthDays: /* @__PURE__ */ __name(function(year, month) {
    return this.lunarInfo[year - 1900] & 65536 >> month ? 30 : 29;
  }, "monthDays"),
  // 公历转农历
  solar2lunar: /* @__PURE__ */ __name(function(year, month, day) {
    if (year < 1900 || year > 2100) return null;
    const baseDate = new Date(1900, 0, 31);
    const objDate = new Date(year, month - 1, day);
    let offset = Math.floor((objDate - baseDate) / 864e5);
    let temp = 0;
    let lunarYear = 1900;
    for (lunarYear = 1900; lunarYear < 2101 && offset > 0; lunarYear++) {
      temp = this.lunarYearDays(lunarYear);
      offset -= temp;
    }
    if (offset < 0) {
      offset += temp;
      lunarYear--;
    }
    let lunarMonth = 1;
    let leap = this.leapMonth(lunarYear);
    let isLeap = false;
    for (lunarMonth = 1; lunarMonth < 13 && offset > 0; lunarMonth++) {
      if (leap > 0 && lunarMonth === leap + 1 && !isLeap) {
        --lunarMonth;
        isLeap = true;
        temp = this.leapDays(lunarYear);
      } else {
        temp = this.monthDays(lunarYear, lunarMonth);
      }
      if (isLeap && lunarMonth === leap + 1) isLeap = false;
      offset -= temp;
    }
    if (offset === 0 && leap > 0 && lunarMonth === leap + 1) {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;
        --lunarMonth;
      }
    }
    if (offset < 0) {
      offset += temp;
      --lunarMonth;
    }
    const lunarDay = offset + 1;
    const ganIndex = (lunarYear - 4) % 10;
    const zhiIndex = (lunarYear - 4) % 12;
    const yearStr = this.gan[ganIndex] + this.zhi[zhiIndex] + "\u5E74";
    const monthStr = (isLeap ? "\u95F0" : "") + this.months[lunarMonth - 1] + "\u6708";
    const dayStr = this.days[lunarDay - 1];
    return {
      year: lunarYear,
      month: lunarMonth,
      day: lunarDay,
      isLeap,
      yearStr,
      monthStr,
      dayStr,
      fullStr: yearStr + monthStr + dayStr
    };
  }, "solar2lunar")
};
var lunarBiz = {
  // 农历加周期，返回新的农历日期对象
  addLunarPeriod(lunar, periodValue, periodUnit) {
    let { year, month, day, isLeap } = lunar;
    if (periodUnit === "year") {
      year += periodValue;
      const leap = lunarCalendar.leapMonth(year);
      if (isLeap && leap === month) {
        isLeap = true;
      } else {
        isLeap = false;
      }
    } else if (periodUnit === "month") {
      let totalMonths = (year - 1900) * 12 + (month - 1) + periodValue;
      year = Math.floor(totalMonths / 12) + 1900;
      month = totalMonths % 12 + 1;
      const leap = lunarCalendar.leapMonth(year);
      if (isLeap && leap === month) {
        isLeap = true;
      } else {
        isLeap = false;
      }
    } else if (periodUnit === "day") {
      const solar = lunarBiz.lunar2solar(lunar);
      const date = new Date(solar.year, solar.month - 1, solar.day + periodValue);
      return lunarCalendar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
    }
    let maxDay = isLeap ? lunarCalendar.leapDays(year) : lunarCalendar.monthDays(year, month);
    let targetDay = Math.min(day, maxDay);
    while (targetDay > 0) {
      let solar = lunarBiz.lunar2solar({ year, month, day: targetDay, isLeap });
      if (solar) {
        return { year, month, day: targetDay, isLeap };
      }
      targetDay--;
    }
    return { year, month, day, isLeap };
  },
  // 农历转公历（遍历法，适用1900-2100年）
  lunar2solar(lunar) {
    for (let y = lunar.year - 1; y <= lunar.year + 1; y++) {
      for (let m = 1; m <= 12; m++) {
        for (let d = 1; d <= 31; d++) {
          const date = new Date(y, m - 1, d);
          if (date.getFullYear() !== y || date.getMonth() + 1 !== m || date.getDate() !== d) continue;
          const l = lunarCalendar.solar2lunar(y, m, d);
          if (l && l.year === lunar.year && l.month === lunar.month && l.day === lunar.day && l.isLeap === lunar.isLeap) {
            return { year: y, month: m, day: d };
          }
        }
      }
    }
    return null;
  },
  // 距离农历日期还有多少天
  daysToLunar(lunar) {
    const solar = lunarBiz.lunar2solar(lunar);
    const date = new Date(solar.year, solar.month - 1, solar.day);
    const now = /* @__PURE__ */ new Date();
    return Math.ceil((date - now) / (1e3 * 60 * 60 * 24));
  }
};
var loginPage = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>\u8BA2\u9605\u7BA1\u7406\u7CFB\u7EDF</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
  <style>
    .login-container {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    .login-box {
      backdrop-filter: blur(8px);
      background-color: rgba(255, 255, 255, 0.9);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transition: all 0.3s;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    .input-field {
      transition: all 0.3s;
      border: 1px solid #e2e8f0;
    }
    .input-field:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.25);
    }
  </style>
</head>
<body class="login-container flex items-center justify-center">
  <div class="login-box p-8 rounded-xl w-full max-w-md">
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800"><i class="fas fa-calendar-check mr-2"></i>\u8BA2\u9605\u7BA1\u7406\u7CFB\u7EDF</h1>
      <p class="text-gray-600 mt-2">\u767B\u5F55\u7BA1\u7406\u60A8\u7684\u8BA2\u9605\u63D0\u9192</p>
    </div>
    
    <form id="loginForm" class="space-y-6">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
          <i class="fas fa-user mr-2"></i>\u7528\u6237\u540D
        </label>
        <input type="text" id="username" name="username" required
          class="input-field w-full px-4 py-3 rounded-lg text-gray-700 focus:outline-none">
      </div>
      
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
          <i class="fas fa-lock mr-2"></i>\u5BC6\u7801
        </label>
        <input type="password" id="password" name="password" required
          class="input-field w-full px-4 py-3 rounded-lg text-gray-700 focus:outline-none">
      </div>
      
      <button type="submit" 
        class="btn-primary w-full py-3 rounded-lg text-white font-medium focus:outline-none">
        <i class="fas fa-sign-in-alt mr-2"></i>\u767B\u5F55
      </button>
      
      <div id="errorMsg" class="text-red-500 text-center"></div>
    </form>
  </div>
  
  <script>
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      const button = e.target.querySelector('button');
      const originalContent = button.innerHTML;
      button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>\u767B\u5F55\u4E2D...';
      button.disabled = true;
      
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        
        const result = await response.json();
        
        if (result.success) {
          window.location.href = '/admin';
        } else {
          document.getElementById('errorMsg').textContent = result.message || '\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF';
          button.innerHTML = originalContent;
          button.disabled = false;
        }
      } catch (error) {
        document.getElementById('errorMsg').textContent = '\u53D1\u751F\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5';
        button.innerHTML = originalContent;
        button.disabled = false;
      }
    });
  <\/script>
</body>
</html>
`;
var adminPage = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>\u8BA2\u9605\u7BA1\u7406\u7CFB\u7EDF</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
  <style>
    .btn-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); transition: all 0.3s; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); }
    .btn-danger { background: linear-gradient(135deg, #f87171 0%, #dc2626 100%); transition: all 0.3s; }
    .btn-danger:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); }
    .btn-success { background: linear-gradient(135deg, #34d399 0%, #059669 100%); transition: all 0.3s; }
    .btn-success:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); }
    .btn-warning { background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%); transition: all 0.3s; }
    .btn-warning:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); }
    .btn-info { background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%); transition: all 0.3s; }
    .btn-info:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); }
    .table-container { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
    .modal-container { backdrop-filter: blur(8px); }
    .readonly-input { background-color: #f8fafc; border-color: #e2e8f0; cursor: not-allowed; }
    .error-message { font-size: 0.875rem; margin-top: 0.25rem; display: none; }
    .error-message.show { display: block; }

    /* \u901A\u7528\u60AC\u6D6E\u63D0\u793A\u4F18\u5316 */
    .hover-container {
      position: relative;
      width: 100%;
    }
    .hover-text {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.3s ease;
      display: block;
    }
    .hover-text:hover { color: #3b82f6; }
    .hover-tooltip {
      position: fixed;
      z-index: 9999;
      background: #1f2937;
      color: white;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 0.875rem;
      max-width: 320px;
      word-wrap: break-word;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      transform: translateY(-10px);
      white-space: normal;
      pointer-events: none;
      line-height: 1.4;
    }
    .hover-tooltip.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    .hover-tooltip::before {
      content: '';
      position: absolute;
      top: -6px;
      left: 20px;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid #1f2937;
    }
    .hover-tooltip.tooltip-above::before {
      top: auto;
      bottom: -6px;
      border-bottom: none;
      border-top: 6px solid #1f2937;
    }

    /* \u5907\u6CE8\u663E\u793A\u4F18\u5316 */
    .notes-container {
      position: relative;
      max-width: 200px;
      width: 100%;
    }
    .notes-text {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.3s ease;
      display: block;
    }
    .notes-text:hover { color: #3b82f6; }
    .notes-tooltip {
      position: fixed;
      z-index: 9999;
      background: #1f2937;
      color: white;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 0.875rem;
      max-width: 320px;
      word-wrap: break-word;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      transform: translateY(-10px);
      white-space: normal;
      pointer-events: none;
      line-height: 1.4;
    }
    .notes-tooltip.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    .notes-tooltip::before {
      content: '';
      position: absolute;
      top: -6px;
      left: 20px;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid #1f2937;
    }
    .notes-tooltip.tooltip-above::before {
      top: auto;
      bottom: -6px;
      border-bottom: none;
      border-top: 6px solid #1f2937;
    }

    /* \u519C\u5386\u663E\u793A\u6837\u5F0F */
    .lunar-display {
      font-size: 0.75rem;
      color: #6366f1;
      margin-top: 2px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .lunar-display.show {
      opacity: 1;
    }
    .lunar-toggle {
      display: inline-flex;
      align-items: center;
      margin-bottom: 8px;
      font-size: 0.875rem;
    }
    .lunar-toggle input[type="checkbox"] {
      margin-right: 6px;
    }

    /* \u8868\u683C\u5E03\u5C40\u4F18\u5316 */
    .table-container {
      width: 100%;
      overflow: visible;
    }

    .table-container table {
      table-layout: fixed;
      width: 100%;
    }

    /* \u9632\u6B62\u8868\u683C\u5185\u5BB9\u6EA2\u51FA */
    .table-container td {
      overflow: hidden;
      word-wrap: break-word;
    }

    .truncate {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* \u54CD\u5E94\u5F0F\u4F18\u5316 */
    .responsive-table { table-layout: fixed; width: 100%; }
    .td-content-wrapper { word-wrap: break-word; white-space: normal; text-align: left; width: 100%; }
    .td-content-wrapper > * { text-align: left; } /* Align content left within the wrapper */

    @media (max-width: 767px) {
      .table-container { overflow-x: initial; } /* Override previous setting */
      .responsive-table thead { display: none; }
      .responsive-table tbody, .responsive-table tr, .responsive-table td { display: block; width: 100%; }
      .responsive-table tr { margin-bottom: 1.5rem; border: 1px solid #ddd; border-radius: 0.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.05); overflow: hidden; }
      .responsive-table td { display: flex; justify-content: flex-start; align-items: center; padding: 0.75rem 1rem; border-bottom: 1px solid #eee; }
      .responsive-table td:last-of-type { border-bottom: none; }
      .responsive-table td:before { content: attr(data-label); font-weight: 600; text-align: left; padding-right: 1rem; color: #374151; white-space: nowrap; }
      .action-buttons-wrapper { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: flex-end; }
      
      .notes-container, .hover-container {
        max-width: 180px; /* Adjust for new layout */
        text-align: right;
      }
      .td-content-wrapper .notes-text {
        text-align: right;
      }
    }

    @media (min-width: 768px) {
      .table-container {
        overflow: visible;
      }
      /* .td-content-wrapper is aligned left by default */
    }

    /* Toast \u6837\u5F0F */
    .toast {
      position: fixed; top: 20px; right: 20px; padding: 12px 20px; border-radius: 8px;
      color: white; font-weight: 500; z-index: 1000; transform: translateX(400px);
      transition: all 0.3s ease-in-out; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    .toast.show { transform: translateX(0); }
    .toast.success { background-color: #10b981; }
    .toast.error { background-color: #ef4444; }
    .toast.info { background-color: #3b82f6; }
    .toast.warning { background-color: #f59e0b; }
  </style>
</head>
<body class="bg-gray-100 min-h-screen">
  <div id="toast-container"></div>

  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <i class="fas fa-calendar-check text-indigo-600 text-2xl mr-2"></i>
          <span class="font-bold text-xl text-gray-800">\u8BA2\u9605\u7BA1\u7406\u7CFB\u7EDF</span>
        </div>
        <div class="flex items-center space-x-4">
          <a href="/admin" class="text-indigo-600 border-b-2 border-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
            <i class="fas fa-list mr-1"></i>\u8BA2\u9605\u5217\u8868
          </a>
          <a href="/admin/config" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
            <i class="fas fa-cog mr-1"></i>\u7CFB\u7EDF\u914D\u7F6E
          </a>
          <a href="/api/logout" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
            <i class="fas fa-sign-out-alt mr-1"></i>\u9000\u51FA\u767B\u5F55
          </a>
        </div>
      </div>
    </div>
  </nav>
  
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">\u8BA2\u9605\u5217\u8868</h2>
      <div class="flex items-center space-x-4">
        <div class="flex items-center">
          <label for="typeFilter" class="text-sm font-medium text-gray-700 mr-2">\u7C7B\u578B\u7B5B\u9009:</label>
          <select id="typeFilter" class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">\u5168\u90E8</option>
          </select>
        </div>
        <label class="lunar-toggle">
          <input type="checkbox" id="listShowLunar" class="form-checkbox h-4 w-4 text-indigo-600">
          <span class="text-gray-700">\u663E\u793A\u519C\u5386</span>
        </label>
        <button id="addSubscriptionBtn" class="btn-primary text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
          <i class="fas fa-plus mr-2"></i>\u6DFB\u52A0\u65B0\u8BA2\u9605
        </button>
      </div>
    </div>
    
    <div class="table-container bg-white rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full divide-y divide-gray-200 responsive-table">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style="width: 20%;">
                \u540D\u79F0
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style="width: 12%;">
                \u7C7B\u578B
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style="width: 18%;">
                \u5230\u671F\u65F6\u95F4 <i class="fas fa-sort-up ml-1 text-indigo-500" title="\u6309\u5230\u671F\u65F6\u95F4\u5347\u5E8F\u6392\u5217"></i>
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style="width: 10%;">
                \u91D1\u989D
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style="width: 12%;">
                \u63D0\u9192\u8BBE\u7F6E
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style="width: 10%;">
                \u72B6\u6001
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style="width: 18%;">
                \u64CD\u4F5C
              </th>
            </tr>
          </thead>
        <tbody id="subscriptionsBody" class="bg-white divide-y divide-gray-200">
        </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- \u6DFB\u52A0/\u7F16\u8F91\u8BA2\u9605\u7684\u6A21\u6001\u6846 -->
  <div id="subscriptionModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 modal-container hidden flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
      <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
        <div class="flex items-center justify-between">
          <h3 id="modalTitle" class="text-lg font-medium text-gray-900">\u6DFB\u52A0\u65B0\u8BA2\u9605</h3>
          <button id="closeModal" class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
      </div>
      
      <form id="subscriptionForm" class="p-6 space-y-6">
        <input type="hidden" id="subscriptionId">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">\u8BA2\u9605\u540D\u79F0 *</label>
            <input type="text" id="name" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <div class="error-message text-red-500"></div>
          </div>
          
          <div>
            <label for="customType" class="block text-sm font-medium text-gray-700 mb-1">\u8BA2\u9605\u7C7B\u578B</label>
            <input type="text" id="customType" placeholder="\u4F8B\u5982\uFF1A\u6D41\u5A92\u4F53\u3001\u4E91\u670D\u52A1\u3001\u8F6F\u4EF6\u7B49"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <div class="error-message text-red-500"></div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">\u8BA2\u9605\u91D1\u989D</label>
            <div class="flex space-x-2">
              <div class="flex-1 relative">
                <input type="number" id="amount" step="0.01" min="0" placeholder="0.00"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              </div>
              <div class="w-32">
                <select id="currency" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="NTD" selected>\u53F0\u5E63 (NTD)</option>
                  <option value="USD">\u7F8E\u5143 (USD)</option>
                  <option value="JPY">\u65E5\u5143 (JPY)</option>
                  <option value="EUR">\u6B50\u5143 (EUR)</option>
                  <option value="CNY">\u4EBA\u6C11\u5E63 (CNY)</option>
                </select>
              </div>
            </div>
            <p class="text-xs text-gray-500 mt-1">\u8BA2\u9605\u8D39\u7528\uFF08\u53EF\u9009\uFF09</p>
            <div class="error-message text-red-500"></div>
          </div>
          <div></div>
        </div>
        
        <div class="mb-4">
          <label class="lunar-toggle">
            <input type="checkbox" id="showLunar" class="form-checkbox h-4 w-4 text-indigo-600">
            <span class="text-gray-700">\u663E\u793A\u519C\u5386\u65E5\u671F</span>
          </label>
        </div>
		<!-- \u65B0\u589E\u4FEE\u6539\uFF0C\u5728\u8868\u5355\u6DFB\u52A0"\u5468\u671F\u6309\u519C\u5386"\u590D\u9009\u6846\uFF0C\u5EFA\u8BAE\u653E\u5728"\u663E\u793A\u519C\u5386\u65E5\u671F"\u4E0B\u65B9 -->
		<div class="mb-4">
		  <label class="lunar-toggle">
			<input type="checkbox" id="useLunar" class="form-checkbox h-4 w-4 text-indigo-600">
			<span class="text-gray-700">\u5468\u671F\u6309\u519C\u5386</span>
		  </label>
		</div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label for="startDate" class="block text-sm font-medium text-gray-700 mb-1">\u5F00\u59CB\u65E5\u671F</label>
            <input type="date" id="startDate"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <div id="startDateLunar" class="lunar-display"></div>
            <div class="error-message text-red-500"></div>
          </div>
          
          <div>
            <label for="periodValue" class="block text-sm font-medium text-gray-700 mb-1">\u5468\u671F\u6570\u503C *</label>
            <input type="number" id="periodValue" min="1" value="1" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <div class="error-message text-red-500"></div>
          </div>
          
          <div>
            <label for="periodUnit" class="block text-sm font-medium text-gray-700 mb-1">\u5468\u671F\u5355\u4F4D *</label>
            <select id="periodUnit" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option value="day">\u5929</option>
              <option value="month" selected>\u6708</option>
              <option value="year">\u5E74</option>
            </select>
            <div class="error-message text-red-500"></div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="expiryDate" class="block text-sm font-medium text-gray-700 mb-1">\u5230\u671F\u65E5\u671F *</label>
            <input type="date" id="expiryDate" required
              class="readonly-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
            <div id="expiryDateLunar" class="lunar-display"></div>
            <div class="error-message text-red-500"></div>
          </div>
          
          <div class="flex items-end">
            <button type="button" id="calculateExpiryBtn" 
              class="btn-primary text-white px-4 py-2 rounded-md text-sm font-medium h-10">
              <i class="fas fa-calculator mr-2"></i>\u81EA\u52A8\u8BA1\u7B97\u5230\u671F\u65E5\u671F
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="reminderDays" class="block text-sm font-medium text-gray-700 mb-1">\u63D0\u524D\u63D0\u9192\u5929\u6570</label>
            <input type="number" id="reminderDays" min="0" value="7"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <p class="text-xs text-gray-500 mt-1">0 = \u4EC5\u5230\u671F\u65E5\u5F53\u5929\u63D0\u9192\uFF0C1+ = \u63D0\u524DN\u5929\u5F00\u59CB\u63D0\u9192</p>
            <div class="error-message text-red-500"></div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">\u9009\u9879\u8BBE\u7F6E</label>
            <div class="space-y-2">
              <label class="inline-flex items-center">
                <input type="checkbox" id="isActive" checked 
                  class="form-checkbox h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500">
                <span class="ml-2 text-sm text-gray-700">\u542F\u7528\u8BA2\u9605</span>
              </label>
              <label class="inline-flex items-center">
                <input type="checkbox" id="autoRenew" checked 
                  class="form-checkbox h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500">
                <span class="ml-2 text-sm text-gray-700">\u81EA\u52A8\u7EED\u8BA2</span>
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">\u5907\u6CE8</label>
          <textarea id="notes" rows="3" placeholder="\u53EF\u6DFB\u52A0\u76F8\u5173\u5907\u6CE8\u4FE1\u606F..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          <div class="error-message text-red-500"></div>
        </div>
        
        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button type="button" id="cancelBtn" 
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            \u53D6\u6D88
          </button>
          <button type="submit" 
            class="btn-primary text-white px-4 py-2 rounded-md text-sm font-medium">
            <i class="fas fa-save mr-2"></i>\u4FDD\u5B58
          </button>
        </div>
      </form>
    </div>
  </div>

  <script>
    // \u65F6\u533A\u5DE5\u5177\u51FD\u6570 - \u524D\u7AEF\u7248\u672C
    function formatBeijingTime(date = new Date(), format = 'full') {
      if (format === 'date') {
        return date.toLocaleDateString('zh-CN', {
          timeZone: 'Asia/Shanghai',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
      } else if (format === 'datetime') {
        return date.toLocaleString('zh-CN', {
          timeZone: 'Asia/Shanghai',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
      } else {
        // full format
        return date.toLocaleString('zh-CN', {
          timeZone: 'Asia/Shanghai'
        });
      }
    }

    // \u519C\u5386\u8F6C\u6362\u5DE5\u5177\u51FD\u6570 - \u524D\u7AEF\u7248\u672C
    const lunarCalendar = {
      // \u519C\u5386\u6570\u636E (1900-2100\u5E74)
      lunarInfo: [
        0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
        0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0
      ],

      // \u5929\u5E72\u5730\u652F
      gan: ['\u7532', '\u4E59', '\u4E19', '\u4E01', '\u620A', '\u5DF1', '\u5E9A', '\u8F9B', '\u58EC', '\u7678'],
      zhi: ['\u5B50', '\u4E11', '\u5BC5', '\u536F', '\u8FB0', '\u5DF3', '\u5348', '\u672A', '\u7533', '\u9149', '\u620C', '\u4EA5'],

      // \u519C\u5386\u6708\u4EFD
      months: ['\u6B63', '\u4E8C', '\u4E09', '\u56DB', '\u4E94', '\u516D', '\u4E03', '\u516B', '\u4E5D', '\u5341', '\u51AC', '\u814A'],

      // \u519C\u5386\u65E5\u671F
      days: ['\u521D\u4E00', '\u521D\u4E8C', '\u521D\u4E09', '\u521D\u56DB', '\u521D\u4E94', '\u521D\u516D', '\u521D\u4E03', '\u521D\u516B', '\u521D\u4E5D', '\u521D\u5341',
             '\u5341\u4E00', '\u5341\u4E8C', '\u5341\u4E09', '\u5341\u56DB', '\u5341\u4E94', '\u5341\u516D', '\u5341\u4E03', '\u5341\u516B', '\u5341\u4E5D', '\u4E8C\u5341',
             '\u5EFF\u4E00', '\u5EFF\u4E8C', '\u5EFF\u4E09', '\u5EFF\u56DB', '\u5EFF\u4E94', '\u5EFF\u516D', '\u5EFF\u4E03', '\u5EFF\u516B', '\u5EFF\u4E5D', '\u4E09\u5341'],

      // \u83B7\u53D6\u519C\u5386\u5E74\u5929\u6570
      lunarYearDays: function(year) {
        let sum = 348;
        for (let i = 0x8000; i > 0x8; i >>= 1) {
          sum += (this.lunarInfo[year - 1900] & i) ? 1 : 0;
        }
        return sum + this.leapDays(year);
      },

      // \u83B7\u53D6\u95F0\u6708\u5929\u6570
      leapDays: function(year) {
        if (this.leapMonth(year)) {
          return (this.lunarInfo[year - 1900] & 0x10000) ? 30 : 29;
        }
        return 0;
      },

      // \u83B7\u53D6\u95F0\u6708\u6708\u4EFD
      leapMonth: function(year) {
        return this.lunarInfo[year - 1900] & 0xf;
      },

      // \u83B7\u53D6\u519C\u5386\u6708\u5929\u6570
      monthDays: function(year, month) {
        return (this.lunarInfo[year - 1900] & (0x10000 >> month)) ? 30 : 29;
      },

      // \u516C\u5386\u8F6C\u519C\u5386
      solar2lunar: function(year, month, day) {
        if (year < 1900 || year > 2100) return null;

        const baseDate = new Date(1900, 0, 31);
        const objDate = new Date(year, month - 1, day);
        let offset = Math.floor((objDate - baseDate) / 86400000);

        let temp = 0;
        let lunarYear = 1900;

        for (lunarYear = 1900; lunarYear < 2101 && offset > 0; lunarYear++) {
          temp = this.lunarYearDays(lunarYear);
          offset -= temp;
        }

        if (offset < 0) {
          offset += temp;
          lunarYear--;
        }

        let lunarMonth = 1;
        let leap = this.leapMonth(lunarYear);
        let isLeap = false;

        for (lunarMonth = 1; lunarMonth < 13 && offset > 0; lunarMonth++) {
          if (leap > 0 && lunarMonth === (leap + 1) && !isLeap) {
            --lunarMonth;
            isLeap = true;
            temp = this.leapDays(lunarYear);
          } else {
            temp = this.monthDays(lunarYear, lunarMonth);
          }

          if (isLeap && lunarMonth === (leap + 1)) isLeap = false;
          offset -= temp;
        }

        if (offset === 0 && leap > 0 && lunarMonth === leap + 1) {
          if (isLeap) {
            isLeap = false;
          } else {
            isLeap = true;
            --lunarMonth;
          }
        }

        if (offset < 0) {
          offset += temp;
          --lunarMonth;
        }

        const lunarDay = offset + 1;

        // \u751F\u6210\u519C\u5386\u5B57\u7B26\u4E32
        const ganIndex = (lunarYear - 4) % 10;
        const zhiIndex = (lunarYear - 4) % 12;
        const yearStr = this.gan[ganIndex] + this.zhi[zhiIndex] + '\u5E74';
        const monthStr = (isLeap ? '\u95F0' : '') + this.months[lunarMonth - 1] + '\u6708';
        const dayStr = this.days[lunarDay - 1];

        return {
          year: lunarYear,
          month: lunarMonth,
          day: lunarDay,
          isLeap: isLeap,
          yearStr: yearStr,
          monthStr: monthStr,
          dayStr: dayStr,
          fullStr: yearStr + monthStr + dayStr
        };
      }
    };
	

// \u65B0\u589E\u4FEE\u6539\uFF0C\u519C\u5386\u8F6C\u516C\u5386\uFF08\u7B80\u5316\uFF0C\u9002\u75281900-2100\u5E74\uFF09
function lunar2solar(lunar) {
  for (let y = lunar.year - 1; y <= lunar.year + 1; y++) {
    for (let m = 1; m <= 12; m++) {
      for (let d = 1; d <= 31; d++) {
        const date = new Date(y, m - 1, d);
        if (date.getFullYear() !== y || date.getMonth() + 1 !== m || date.getDate() !== d) continue;
        const l = lunarCalendar.solar2lunar(y, m, d);
        if (
          l &&
          l.year === lunar.year &&
          l.month === lunar.month &&
          l.day === lunar.day &&
          l.isLeap === lunar.isLeap
        ) {
          return { year: y, month: m, day: d };
        }
      }
    }
  }
  return null;
}

// \u65B0\u589E\u4FEE\u6539\uFF0C\u519C\u5386\u52A0\u5468\u671F\uFF0C\u524D\u671F\u7248\u672C
function addLunarPeriod(lunar, periodValue, periodUnit) {
  let { year, month, day, isLeap } = lunar;
  if (periodUnit === 'year') {
    year += periodValue;
    const leap = lunarCalendar.leapMonth(year);
    if (isLeap && leap === month) {
      isLeap = true;
    } else {
      isLeap = false;
    }
  } else if (periodUnit === 'month') {
    let totalMonths = (year - 1900) * 12 + (month - 1) + periodValue;
    year = Math.floor(totalMonths / 12) + 1900;
    month = (totalMonths % 12) + 1;
    const leap = lunarCalendar.leapMonth(year);
    if (isLeap && leap === month) {
      isLeap = true;
    } else {
      isLeap = false;
    }
  } else if (periodUnit === 'day') {
    const solar = lunar2solar(lunar);
    const date = new Date(solar.year, solar.month - 1, solar.day + periodValue);
    return lunarCalendar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }
  let maxDay = isLeap
    ? lunarCalendar.leapDays(year)
    : lunarCalendar.monthDays(year, month);
  let targetDay = Math.min(day, maxDay);
  while (targetDay > 0) {
    let solar = lunar2solar({ year, month, day: targetDay, isLeap });
    if (solar) {
      return { year, month, day: targetDay, isLeap };
    }
    targetDay--;
  }
  return { year, month, day, isLeap };
}



    // \u519C\u5386\u663E\u793A\u76F8\u5173\u51FD\u6570
    function updateLunarDisplay(dateInputId, lunarDisplayId) {
      const dateInput = document.getElementById(dateInputId);
      const lunarDisplay = document.getElementById(lunarDisplayId);
      const showLunar = document.getElementById('showLunar');

      if (!dateInput.value || !showLunar.checked) {
        lunarDisplay.classList.remove('show');
        return;
      }

      const date = new Date(dateInput.value);
      const lunar = lunarCalendar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());

      if (lunar) {
        lunarDisplay.textContent = '\u519C\u5386\uFF1A' + lunar.fullStr;
        lunarDisplay.classList.add('show');
      } else {
        lunarDisplay.classList.remove('show');
      }
    }

    function toggleLunarDisplay() {
      const showLunar = document.getElementById('showLunar');
      updateLunarDisplay('startDate', 'startDateLunar');
      updateLunarDisplay('expiryDate', 'expiryDateLunar');

      // \u4FDD\u5B58\u7528\u6237\u504F\u597D
      localStorage.setItem('showLunar', showLunar.checked);
    }

    function loadLunarPreference() {
      const showLunar = document.getElementById('showLunar');
      const saved = localStorage.getItem('showLunar');
      if (saved !== null) {
        showLunar.checked = saved === 'true';
      } else {
        showLunar.checked = true; // \u9ED8\u8BA4\u663E\u793A
      }
      toggleLunarDisplay();
    }

    // \u8D27\u5E01\u683C\u5F0F\u5316\u51FD\u6570
    function formatCurrency(amount, currency) {
      if (!amount || amount === 0) return null;
      
      const formattedAmount = parseFloat(amount).toFixed(2);
      const currencyMap = {
        'NTD': 'NT$ ' + formattedAmount,
        'USD': 'US$ ' + formattedAmount,
        'JPY': 'JP\xA5 ' + Math.round(amount), // \u65E5\u5143\u901A\u5E38\u4E0D\u663E\u793A\u5C0F\u6570
        'EUR': '\u20AC ' + formattedAmount,
        'CNY': 'CN\xA5 ' + formattedAmount
      };
      
      return currencyMap[currency] || formattedAmount;
    }

    function handleListLunarToggle() {
      const listShowLunar = document.getElementById('listShowLunar');
      // \u4FDD\u5B58\u7528\u6237\u504F\u597D
      localStorage.setItem('showLunar', listShowLunar.checked);
      // \u91CD\u65B0\u52A0\u8F7D\u8BA2\u9605\u5217\u8868\u4EE5\u5E94\u7528\u519C\u5386\u663E\u793A\u8BBE\u7F6E
      loadSubscriptions();
    }

    function showToast(message, type = 'success', duration = 3000) {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = 'toast ' + type;
      
      const icon = type === 'success' ? 'check-circle' :
                   type === 'error' ? 'exclamation-circle' :
                   type === 'warning' ? 'exclamation-triangle' : 'info-circle';
      
      toast.innerHTML = '<div class="flex items-center"><i class="fas fa-' + icon + ' mr-2"></i><span>' + message + '</span></div>';
      
      container.appendChild(toast);
      setTimeout(() => toast.classList.add('show'), 100);
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          if (container.contains(toast)) {
            container.removeChild(toast);
          }
        }, 300);
      }, duration);
    }

    function showFieldError(fieldId, message) {
      const field = document.getElementById(fieldId);
      const errorDiv = field.parentElement.querySelector('.error-message');
      if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
        field.classList.add('border-red-500');
      }
    }

    function clearFieldErrors() {
      document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
      });
      document.querySelectorAll('.border-red-500').forEach(el => {
        el.classList.remove('border-red-500');
      });
    }

    function validateForm() {
      clearFieldErrors();
      let isValid = true;

      const name = document.getElementById('name').value.trim();
      if (!name) {
        showFieldError('name', '\u8BF7\u8F93\u5165\u8BA2\u9605\u540D\u79F0');
        isValid = false;
      }

      const periodValue = document.getElementById('periodValue').value;
      if (!periodValue || periodValue < 1) {
        showFieldError('periodValue', '\u5468\u671F\u6570\u503C\u5FC5\u987B\u5927\u4E8E0');
        isValid = false;
      }

      const expiryDate = document.getElementById('expiryDate').value;
      if (!expiryDate) {
        showFieldError('expiryDate', '\u8BF7\u9009\u62E9\u5230\u671F\u65E5\u671F');
        isValid = false;
      }

      const reminderDays = document.getElementById('reminderDays').value;
      if (reminderDays === '' || reminderDays < 0) {
        showFieldError('reminderDays', '\u63D0\u9192\u5929\u6570\u4E0D\u80FD\u4E3A\u8D1F\u6570');
        isValid = false;
      }

      // \u9A8C\u8BC1\u91D1\u989D\u5B57\u6BB5\uFF08\u53EF\u9009\uFF09
      const amount = document.getElementById('amount').value;
      if (amount && (isNaN(amount) || parseFloat(amount) < 0)) {
        showFieldError('amount', '\u91D1\u989D\u5FC5\u987B\u662F\u975E\u8D1F\u6570');
        isValid = false;
      }

      return isValid;
    }

    // \u521B\u5EFA\u5E26\u60AC\u6D6E\u63D0\u793A\u7684\u6587\u672C\u5143\u7D20
    function createHoverText(text, maxLength = 30, className = 'text-sm text-gray-900') {
      if (!text || text.length <= maxLength) {
        return '<div class="' + className + '">' + text + '</div>';
      }

      const truncated = text.substring(0, maxLength) + '...';
      return '<div class="hover-container">' +
        '<div class="hover-text ' + className + '" data-full-text="' + text.replace(/"/g, '&quot;') + '">' +
          truncated +
        '</div>' +
        '<div class="hover-tooltip"></div>' +
      '</div>';
    }

    // \u83B7\u53D6\u6240\u6709\u8BA2\u9605\u5E76\u6309\u5230\u671F\u65F6\u95F4\u6392\u5E8F
    async function loadSubscriptions() {
      try {
        // \u52A0\u8F7D\u519C\u5386\u663E\u793A\u504F\u597D
        const listShowLunar = document.getElementById('listShowLunar');
        const saved = localStorage.getItem('showLunar');
        if (saved !== null) {
          listShowLunar.checked = saved === 'true';
        } else {
          listShowLunar.checked = true; // \u9ED8\u8BA4\u663E\u793A
        }

        const tbody = document.getElementById('subscriptionsBody');
        tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4"><i class="fas fa-spinner fa-spin mr-2"></i>\u52A0\u8F7D\u4E2D...</td></tr>';

        console.log('[Frontend] \u5F00\u59CB\u8BF7\u6C42\u8BA2\u9605\u6570\u636E');
        const response = await fetch('/api/subscriptions');
        console.log('[Frontend] API\u54CD\u5E94\u72B6\u6001:', response.status, response.statusText || 'unknown');
        
        if (!response.ok) {
          if (response.status === 401) {
            console.log('[Frontend] \u672A\u6388\u6743\uFF0C\u91CD\u5B9A\u5411\u5230\u767B\u5F55\u9875');
            window.location.href = '/';
            return;
          }
          
          const errorData = await response.json().catch(() => ({ message: '\u672A\u77E5\u9519\u8BEF' }));
          console.error('[Frontend] API\u8FD4\u56DE\u9519\u8BEF:', errorData);
          tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-red-500">\u52A0\u8F7D\u5931\u8D25: ' + (errorData.message || 'HTTP ' + response.status) + '</td></tr>';
          return;
        }
        
        const data = await response.json();
        console.log('[Frontend] \u6536\u5230\u8BA2\u9605\u6570\u636E\u6570\u91CF:', data.length);
        
        // \u4FDD\u5B58\u539F\u59CB\u6570\u636E\u4EE5\u4F9B\u7B5B\u9009\u4F7F\u7528
        window.allSubscriptions = data;
        
        // \u66F4\u65B0\u7C7B\u578B\u7B5B\u9009\u5668
        updateTypeFilter(data);

        if (data.length === 0) {
          tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-gray-500">\u6CA1\u6709\u8BA2\u9605\u6570\u636E</td></tr>';
          return;
        }
        
        // \u5E94\u7528\u5F53\u524D\u7B5B\u9009
        applyCurrentFilter();
        
      } catch (error) {
        console.error('[Frontend] \u52A0\u8F7D\u8BA2\u9605\u5931\u8D25:', error);
        const tbody = document.getElementById('subscriptionsBody');
        tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-red-500">\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u8FDE\u63A5\u5E76\u5237\u65B0\u9875\u9762\u91CD\u8BD5</td></tr>';
      }
    }

    // \u66F4\u65B0\u7C7B\u578B\u7B5B\u9009\u5668\u9009\u9879
    function updateTypeFilter(subscriptions) {
      const typeFilter = document.getElementById('typeFilter');
      const currentValue = typeFilter.value;
      
      // \u83B7\u53D6\u6240\u6709\u552F\u4E00\u7684\u8BA2\u9605\u7C7B\u578B
      const types = [...new Set(subscriptions.map(sub => sub.customType || '\u5176\u4ED6').filter(type => type))];
      types.sort();
      
      // \u6E05\u7A7A\u73B0\u6709\u9009\u9879\uFF08\u9664\u4E86"\u5168\u90E8"\uFF09
      typeFilter.innerHTML = '<option value="">\u5168\u90E8</option>';
      
      // \u6DFB\u52A0\u7C7B\u578B\u9009\u9879
      types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeFilter.appendChild(option);
      });
      
      // \u6062\u590D\u4E4B\u524D\u7684\u9009\u62E9
      typeFilter.value = currentValue;
    }

    // \u5E94\u7528\u5F53\u524D\u7B5B\u9009
    function applyCurrentFilter() {
      const typeFilter = document.getElementById('typeFilter');
      const selectedType = typeFilter.value;
      
      let filteredData = window.allSubscriptions || [];
      
      // \u6839\u636E\u9009\u4E2D\u7684\u7C7B\u578B\u8FDB\u884C\u7B5B\u9009
      if (selectedType) {
        filteredData = filteredData.filter(sub => (sub.customType || '\u5176\u4ED6') === selectedType);
      }
      
      renderSubscriptions(filteredData);
    }

    // \u6E32\u67D3\u8BA2\u9605\u5217\u8868
    function renderSubscriptions(data) {
      const tbody = document.getElementById('subscriptionsBody');
      tbody.innerHTML = '';
      
      if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-gray-500">\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u8BA2\u9605\u6570\u636E</td></tr>';
        return;
      }
      
      // \u6309\u5230\u671F\u65F6\u95F4\u5347\u5E8F\u6392\u5E8F\uFF08\u6700\u65E9\u5230\u671F\u7684\u5728\u524D\uFF09
      data.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
        
		//\u65B0\u589E\u4FEE\u6539\uFF0C\u6DFB\u52A0\u65E5\u5386\u7C7B\u578B
        data.forEach(subscription => {
          const row = document.createElement('tr');
          row.className = subscription.isActive === false ? 'hover:bg-gray-50 bg-gray-100' : 'hover:bg-gray-50';
          
		  // \u65B0\u589E\u4FEE\u6539\uFF1A\u65E5\u5386\u7C7B\u578B\u663E\u793A
		  let calendarTypeHtml = '';
		  if (subscription.useLunar) {
			calendarTypeHtml = '<div class="text-xs text-purple-600 mt-1">\u65E5\u5386\u7C7B\u578B\uFF1A\u519C\u5386</div>';
		  } else {
			calendarTypeHtml = '<div class="text-xs text-gray-600 mt-1">\u65E5\u5386\u7C7B\u578B\uFF1A\u516C\u5386</div>';
		  }
		  
          const expiryDate = new Date(subscription.expiryDate);
          const now = new Date();
          const daysDiff = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
          
          let statusHtml = '';
          if (!subscription.isActive) {
            statusHtml = '<span class="px-2 py-1 text-xs font-medium rounded-full text-white bg-gray-500"><i class="fas fa-pause-circle mr-1"></i>\u5DF2\u505C\u7528</span>';
          } else if (daysDiff < 0) {
            statusHtml = '<span class="px-2 py-1 text-xs font-medium rounded-full text-white bg-red-500"><i class="fas fa-exclamation-circle mr-1"></i>\u5DF2\u8FC7\u671F</span>';
          } else if (daysDiff <= (subscription.reminderDays || 7)) {
            statusHtml = '<span class="px-2 py-1 text-xs font-medium rounded-full text-white bg-yellow-500"><i class="fas fa-exclamation-triangle mr-1"></i>\u5373\u5C06\u5230\u671F</span>';
          } else {
            statusHtml = '<span class="px-2 py-1 text-xs font-medium rounded-full text-white bg-green-500"><i class="fas fa-check-circle mr-1"></i>\u6B63\u5E38</span>';
          }
          
          let periodText = '';
          if (subscription.periodValue && subscription.periodUnit) {
            const unitMap = { day: '\u5929', month: '\u6708', year: '\u5E74' };
            periodText = subscription.periodValue + ' ' + (unitMap[subscription.periodUnit] || subscription.periodUnit);
          }
          
          const autoRenewIcon = subscription.autoRenew !== false ? 
            '<i class="fas fa-sync-alt text-blue-500 ml-1" title="\u81EA\u52A8\u7EED\u8BA2"></i>' : 
            '<i class="fas fa-ban text-gray-400 ml-1" title="\u4E0D\u81EA\u52A8\u7EED\u8BA2"></i>';
          
          // \u68C0\u67E5\u662F\u5426\u663E\u793A\u519C\u5386
          const showLunar = document.getElementById('listShowLunar').checked;
          let lunarExpiryText = '';
          let startLunarText = '';

          if (showLunar) {
            // \u8BA1\u7B97\u519C\u5386\u65E5\u671F
            const expiryDateObj = new Date(subscription.expiryDate);
            const lunarExpiry = lunarCalendar.solar2lunar(expiryDateObj.getFullYear(), expiryDateObj.getMonth() + 1, expiryDateObj.getDate());
            lunarExpiryText = lunarExpiry ? lunarExpiry.fullStr : '';

            if (subscription.startDate) {
              const startDateObj = new Date(subscription.startDate);
              const lunarStart = lunarCalendar.solar2lunar(startDateObj.getFullYear(), startDateObj.getMonth() + 1, startDateObj.getDate());
              startLunarText = lunarStart ? lunarStart.fullStr : '';
            }
          }

          // \u5904\u7406\u5907\u6CE8\u663E\u793A
          let notesHtml = '';
          if (subscription.notes) {
            const notes = subscription.notes;
            if (notes.length > 50) {
              const truncatedNotes = notes.substring(0, 50) + '...';
              notesHtml = '<div class="notes-container">' +
                '<div class="notes-text text-xs text-gray-500" data-full-notes="' + notes.replace(/"/g, '&quot;') + '">' +
                  truncatedNotes +
                '</div>' +
                '<div class="notes-tooltip"></div>' +
              '</div>';
            } else {
              notesHtml = '<div class="text-xs text-gray-500">' + notes + '</div>';
            }
          }

		  // \u751F\u6210\u5404\u5217\u5185\u5BB9
		  const nameHtml = createHoverText(subscription.name, 20, 'text-sm font-medium text-gray-900');
		  const typeHtml = createHoverText((subscription.customType || '\u5176\u4ED6'), 15, 'text-sm text-gray-900');
		  const periodHtml = periodText ? createHoverText('\u5468\u671F: ' + periodText, 20, 'text-xs text-gray-500 mt-1') : '';

          // \u5230\u671F\u65F6\u95F4\u76F8\u5173\u4FE1\u606F
          const expiryDateText = formatBeijingTime(new Date(subscription.expiryDate), 'date');
          const lunarHtml = lunarExpiryText ? createHoverText('\u519C\u5386: ' + lunarExpiryText, 25, 'text-xs text-blue-600 mt-1') : '';
          const daysLeftText = daysDiff < 0 ? '\u5DF2\u8FC7\u671F' + Math.abs(daysDiff) + '\u5929' : '\u8FD8\u5269' + daysDiff + '\u5929';
          const startDateText = subscription.startDate ?
            '\u5F00\u59CB: ' + formatBeijingTime(new Date(subscription.startDate), 'date') + (startLunarText ? ' (' + startLunarText + ')' : '') : '';
          const startDateHtml = startDateText ? createHoverText(startDateText, 30, 'text-xs text-gray-500 mt-1') : '';

		  // \u751F\u6210\u91D1\u989D\u663E\u793A
		  let amountHtml = '';
		  if (subscription.amount && subscription.amount > 0) {
			const formattedAmount = formatCurrency(subscription.amount, subscription.currency);
			if (formattedAmount) {
			  amountHtml = '<div class="text-sm text-gray-900">' + formattedAmount + '</div>';
			}
		  }
		  if (!amountHtml) {
			amountHtml = '<div class="text-sm text-gray-400">-</div>';
		  }

		  //\u65B0\u589E\u4FEE\u6539\uFF0C\u4FEE\u6539\u65E5\u5386\u7C7B\u578B
		  row.innerHTML =
			'<td data-label="\u540D\u79F0" class="px-4 py-3"><div class="td-content-wrapper">' +
			  nameHtml +
			  notesHtml +
			'</div></td>' +
			'<td data-label="\u7C7B\u578B" class="px-4 py-3"><div class="td-content-wrapper">' +
			  '<div class="flex items-center"><i class="fas fa-tag mr-1"></i><span>' + typeHtml + '</span></div>' +
			  (periodHtml ? '<div class="flex items-center">' + periodHtml + autoRenewIcon + '</div>' : '') +
			  calendarTypeHtml + // \u65B0\u589E\uFF1A\u65E5\u5386\u7C7B\u578B
			'</div></td>' +
			'<td data-label="\u5230\u671F\u65F6\u95F4" class="px-4 py-3"><div class="td-content-wrapper">' +
			  '<div class="text-sm text-gray-900">' + expiryDateText + '</div>' +
			  lunarHtml +
			  '<div class="text-xs text-gray-500 mt-1">' + daysLeftText + '</div>' +
			  startDateHtml +
			'</div></td>' +
			'<td data-label="\u91D1\u989D" class="px-4 py-3"><div class="td-content-wrapper">' +
			  amountHtml +
			'</div></td>' +
			'<td data-label="\u63D0\u9192\u8BBE\u7F6E" class="px-4 py-3"><div class="td-content-wrapper">' +
			  '<div><i class="fas fa-bell mr-1"></i>\u63D0\u524D' + (subscription.reminderDays || 0) + '\u5929</div>' +
			  (subscription.reminderDays === 0 ? '<div class="text-xs text-gray-500 mt-1">\u4EC5\u5230\u671F\u65E5\u63D0\u9192</div>' : '') +
			'</div></td>' +
			'<td data-label="\u72B6\u6001" class="px-4 py-3"><div class="td-content-wrapper">' +
			  statusHtml +
			'</div></td>' +
			'<td data-label="\u64CD\u4F5C" class="px-4 py-3"><div class="td-content-wrapper">' +
			  '<div class="action-buttons-wrapper space-x-1">' +
				'<button class="edit btn-primary text-white px-2 py-1 rounded text-xs whitespace-nowrap" data-id="' + subscription.id + '"><i class="fas fa-edit mr-1"></i>\u7F16\u8F91</button>' +
				'<button class="test-notify btn-info text-white px-2 py-1 rounded text-xs whitespace-nowrap" data-id="' + subscription.id + '"><i class="fas fa-paper-plane mr-1"></i>\u6D4B\u8BD5</button>' +
				'<button class="delete btn-danger text-white px-2 py-1 rounded text-xs whitespace-nowrap" data-id="' + subscription.id + '"><i class="fas fa-trash-alt mr-1"></i>\u5220\u9664</button>' +
				(subscription.isActive ?
				  '<button class="toggle-status btn-warning text-white px-2 py-1 rounded text-xs whitespace-nowrap" data-id="' + subscription.id + '" data-action="deactivate"><i class="fas fa-pause-circle mr-1"></i>\u505C\u7528</button>' :
				  '<button class="toggle-status btn-success text-white px-2 py-1 rounded text-xs whitespace-nowrap" data-id="' + subscription.id + '" data-action="activate"><i class="fas fa-play-circle mr-1"></i>\u542F\u7528</button>') +
			  '</div>' +
			'</td>';

		  tbody.appendChild(row);
        });
        
        // \u91CD\u65B0\u7ED1\u5B9A\u4E8B\u4EF6\u76D1\u542C\u5668
        document.querySelectorAll('.edit').forEach(button => {
          button.addEventListener('click', editSubscription);
        });
        
        document.querySelectorAll('.delete').forEach(button => {
          button.addEventListener('click', deleteSubscription);
        });
        
        document.querySelectorAll('.toggle-status').forEach(button => {
          button.addEventListener('click', toggleSubscriptionStatus);
        });

        document.querySelectorAll('.test-notify').forEach(button => {
          button.addEventListener('click', testSubscriptionNotification);
        });

        // \u6DFB\u52A0\u60AC\u505C\u529F\u80FD
        addHoverListeners();
    }

    // \u6DFB\u52A0\u60AC\u505C\u529F\u80FD
    function addHoverListeners() {
      // \u8BA1\u7B97\u60AC\u6D6E\u63D0\u793A\u4F4D\u7F6E
      function positionTooltip(element, tooltip) {
        const rect = element.getBoundingClientRect();
        const tooltipHeight = 100; // \u9884\u4F30\u9AD8\u5EA6
        const viewportHeight = window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        let top = rect.bottom + scrollTop + 8;
        let left = rect.left;

        // \u5982\u679C\u4E0B\u65B9\u7A7A\u95F4\u4E0D\u591F\uFF0C\u663E\u793A\u5728\u4E0A\u65B9
        if (rect.bottom + tooltipHeight > viewportHeight) {
          top = rect.top + scrollTop - tooltipHeight - 8;
          tooltip.style.transform = 'translateY(10px)';
          // \u8C03\u6574\u7BAD\u5934\u4F4D\u7F6E
          tooltip.classList.add('tooltip-above');
        } else {
          tooltip.style.transform = 'translateY(-10px)';
          tooltip.classList.remove('tooltip-above');
        }

        // \u786E\u4FDD\u4E0D\u8D85\u51FA\u53F3\u8FB9\u754C
        const maxLeft = window.innerWidth - 320 - 20;
        if (left > maxLeft) {
          left = maxLeft;
        }

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
      }

      // \u5907\u6CE8\u60AC\u505C\u529F\u80FD
      document.querySelectorAll('.notes-text').forEach(notesElement => {
        const fullNotes = notesElement.getAttribute('data-full-notes');
        const tooltip = notesElement.parentElement.querySelector('.notes-tooltip');

        if (fullNotes && tooltip) {
          notesElement.addEventListener('mouseenter', () => {
            tooltip.textContent = fullNotes;
            positionTooltip(notesElement, tooltip);
            tooltip.classList.add('show');
          });

          notesElement.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
          });

          // \u6EDA\u52A8\u65F6\u9690\u85CF\u63D0\u793A
          window.addEventListener('scroll', () => {
            if (tooltip.classList.contains('show')) {
              tooltip.classList.remove('show');
            }
          }, { passive: true });
        }
      });

      // \u901A\u7528\u60AC\u505C\u529F\u80FD
      document.querySelectorAll('.hover-text').forEach(hoverElement => {
        const fullText = hoverElement.getAttribute('data-full-text');
        const tooltip = hoverElement.parentElement.querySelector('.hover-tooltip');

        if (fullText && tooltip) {
          hoverElement.addEventListener('mouseenter', () => {
            tooltip.textContent = fullText;
            positionTooltip(hoverElement, tooltip);
            tooltip.classList.add('show');
          });

          hoverElement.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
          });

          // \u6EDA\u52A8\u65F6\u9690\u85CF\u63D0\u793A
          window.addEventListener('scroll', () => {
            if (tooltip.classList.contains('show')) {
              tooltip.classList.remove('show');
            }
          }, { passive: true });
        }
      });
    }
        
		//\u65B0\u589E\u4FEE\u6539\uFF0C\u6DFB\u52A0\u65E5\u5386\u7C7B\u578B
        data.forEach(subscription => {
          const row = document.createElement('tr');
          row.className = subscription.isActive === false ? 'hover:bg-gray-50 bg-gray-100' : 'hover:bg-gray-50';
          
		  // \u65B0\u589E\u4FEE\u6539\uFF1A\u65E5\u5386\u7C7B\u578B\u663E\u793A
		  let calendarTypeHtml = '';
		  if (subscription.useLunar) {
			calendarTypeHtml = '<div class="text-xs text-purple-600 mt-1">\u65E5\u5386\u7C7B\u578B\uFF1A\u519C\u5386</div>';
		  } else {
			calendarTypeHtml = '<div class="text-xs text-gray-600 mt-1">\u65E5\u5386\u7C7B\u578B\uFF1A\u516C\u5386</div>';
		  }
		  
          const expiryDate = new Date(subscription.expiryDate);
          const now = new Date();
          const daysDiff = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
          
          let statusHtml = '';
          if (!subscription.isActive) {
            statusHtml = '<span class="px-2 py-1 text-xs font-medium rounded-full text-white bg-gray-500"><i class="fas fa-pause-circle mr-1"></i>\u5DF2\u505C\u7528</span>';
          } else if (daysDiff < 0) {
            statusHtml = '<span class="px-2 py-1 text-xs font-medium rounded-full text-white bg-red-500"><i class="fas fa-exclamation-circle mr-1"></i>\u5DF2\u8FC7\u671F</span>';
          } else if (daysDiff <= (subscription.reminderDays || 7)) {
            statusHtml = '<span class="px-2 py-1 text-xs font-medium rounded-full text-white bg-yellow-500"><i class="fas fa-exclamation-triangle mr-1"></i>\u5373\u5C06\u5230\u671F</span>';
          } else {
            statusHtml = '<span class="px-2 py-1 text-xs font-medium rounded-full text-white bg-green-500"><i class="fas fa-check-circle mr-1"></i>\u6B63\u5E38</span>';
          }
          
          let periodText = '';
          if (subscription.periodValue && subscription.periodUnit) {
            const unitMap = { day: '\u5929', month: '\u6708', year: '\u5E74' };
            periodText = subscription.periodValue + ' ' + (unitMap[subscription.periodUnit] || subscription.periodUnit);
          }
          
          const autoRenewIcon = subscription.autoRenew !== false ? 
            '<i class="fas fa-sync-alt text-blue-500 ml-1" title="\u81EA\u52A8\u7EED\u8BA2"></i>' : 
            '<i class="fas fa-ban text-gray-400 ml-1" title="\u4E0D\u81EA\u52A8\u7EED\u8BA2"></i>';
          
          // \u68C0\u67E5\u662F\u5426\u663E\u793A\u519C\u5386
          const showLunar = document.getElementById('listShowLunar').checked;
          let lunarExpiryText = '';
          let startLunarText = '';

          if (showLunar) {
            // \u8BA1\u7B97\u519C\u5386\u65E5\u671F
            const expiryDateObj = new Date(subscription.expiryDate);
            const lunarExpiry = lunarCalendar.solar2lunar(expiryDateObj.getFullYear(), expiryDateObj.getMonth() + 1, expiryDateObj.getDate());
            lunarExpiryText = lunarExpiry ? lunarExpiry.fullStr : '';

            if (subscription.startDate) {
              const startDateObj = new Date(subscription.startDate);
              const lunarStart = lunarCalendar.solar2lunar(startDateObj.getFullYear(), startDateObj.getMonth() + 1, startDateObj.getDate());
              startLunarText = lunarStart ? lunarStart.fullStr : '';
            }
          }

          // \u5904\u7406\u5907\u6CE8\u663E\u793A
          let notesHtml = '';
          if (subscription.notes) {
            const notes = subscription.notes;
            if (notes.length > 50) {
              const truncatedNotes = notes.substring(0, 50) + '...';
              notesHtml = '<div class="notes-container">' +
                '<div class="notes-text text-xs text-gray-500" data-full-notes="' + notes.replace(/"/g, '&quot;') + '">' +
                  truncatedNotes +
                '</div>' +
                '<div class="notes-tooltip"></div>' +
              '</div>';
            } else {
              notesHtml = '<div class="text-xs text-gray-500">' + notes + '</div>';
            }
          }

        // \u6DFB\u52A0\u60AC\u505C\u529F\u80FD
        function addHoverListeners() {
          // \u8BA1\u7B97\u60AC\u6D6E\u63D0\u793A\u4F4D\u7F6E
          function positionTooltip(element, tooltip) {
            const rect = element.getBoundingClientRect();
            const tooltipHeight = 100; // \u9884\u4F30\u9AD8\u5EA6
            const viewportHeight = window.innerHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            let top = rect.bottom + scrollTop + 8;
            let left = rect.left;

            // \u5982\u679C\u4E0B\u65B9\u7A7A\u95F4\u4E0D\u591F\uFF0C\u663E\u793A\u5728\u4E0A\u65B9
            if (rect.bottom + tooltipHeight > viewportHeight) {
              top = rect.top + scrollTop - tooltipHeight - 8;
              tooltip.style.transform = 'translateY(10px)';
              // \u8C03\u6574\u7BAD\u5934\u4F4D\u7F6E
              tooltip.classList.add('tooltip-above');
            } else {
              tooltip.style.transform = 'translateY(-10px)';
              tooltip.classList.remove('tooltip-above');
            }

            // \u786E\u4FDD\u4E0D\u8D85\u51FA\u53F3\u8FB9\u754C
            const maxLeft = window.innerWidth - 320 - 20;
            if (left > maxLeft) {
              left = maxLeft;
            }

            tooltip.style.left = left + 'px';
            tooltip.style.top = top + 'px';
          }

          // \u5907\u6CE8\u60AC\u505C\u529F\u80FD
          document.querySelectorAll('.notes-text').forEach(notesElement => {
            const fullNotes = notesElement.getAttribute('data-full-notes');
            const tooltip = notesElement.parentElement.querySelector('.notes-tooltip');

            if (fullNotes && tooltip) {
              notesElement.addEventListener('mouseenter', () => {
                tooltip.textContent = fullNotes;
                positionTooltip(notesElement, tooltip);
                tooltip.classList.add('show');
              });

              notesElement.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
              });

              // \u6EDA\u52A8\u65F6\u9690\u85CF\u63D0\u793A
              window.addEventListener('scroll', () => {
                if (tooltip.classList.contains('show')) {
                  tooltip.classList.remove('show');
                }
              }, { passive: true });
            }
          });

          // \u901A\u7528\u60AC\u505C\u529F\u80FD
          document.querySelectorAll('.hover-text').forEach(hoverElement => {
            const fullText = hoverElement.getAttribute('data-full-text');
            const tooltip = hoverElement.parentElement.querySelector('.hover-tooltip');

            if (fullText && tooltip) {
              hoverElement.addEventListener('mouseenter', () => {
                tooltip.textContent = fullText;
                positionTooltip(hoverElement, tooltip);
                tooltip.classList.add('show');
              });

              hoverElement.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
              });

              // \u6EDA\u52A8\u65F6\u9690\u85CF\u63D0\u793A
              window.addEventListener('scroll', () => {
                if (tooltip.classList.contains('show')) {
                  tooltip.classList.remove('show');
                }
              }, { passive: true });
            }
          });
        }

        addHoverListeners();

        // \u6DFB\u52A0\u519C\u5386\u5F00\u5173\u4E8B\u4EF6\u76D1\u542C
        listShowLunar.removeEventListener('change', handleListLunarToggle);
        listShowLunar.addEventListener('change', handleListLunarToggle);
      } catch (error) {
        console.error('\u52A0\u8F7D\u8BA2\u9605\u5931\u8D25:', error);
        const tbody = document.getElementById('subscriptionsBody');
        tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-red-500"><i class="fas fa-exclamation-circle mr-2"></i>\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0\u9875\u9762\u91CD\u8BD5</td></tr>';
        showToast('\u52A0\u8F7D\u8BA2\u9605\u5217\u8868\u5931\u8D25', 'error');
      }
    }
    
    async function testSubscriptionNotification(e) {
        const button = e.target.tagName === 'BUTTON' ? e.target : e.target.parentElement;
        const id = button.dataset.id;
        const originalContent = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i>';
        button.disabled = true;

        try {
            const response = await fetch('/api/subscriptions/' + id + '/test-notify', { method: 'POST' });
            const result = await response.json();
            if (result.success) {
                showToast(result.message || '\u6D4B\u8BD5\u901A\u77E5\u5DF2\u53D1\u9001', 'success');
            } else {
                showToast(result.message || '\u6D4B\u8BD5\u901A\u77E5\u53D1\u9001\u5931\u8D25', 'error');
            }
        } catch (error) {
            console.error('\u6D4B\u8BD5\u901A\u77E5\u5931\u8D25:', error);
            showToast('\u53D1\u9001\u6D4B\u8BD5\u901A\u77E5\u65F6\u53D1\u751F\u9519\u8BEF', 'error');
        } finally {
            button.innerHTML = originalContent;
            button.disabled = false;
        }
    }
    
    async function toggleSubscriptionStatus(e) {
      const id = e.target.dataset.id || e.target.parentElement.dataset.id;
      const action = e.target.dataset.action || e.target.parentElement.dataset.action;
      const isActivate = action === 'activate';
      
      const button = e.target.tagName === 'BUTTON' ? e.target : e.target.parentElement;
      const originalContent = button.innerHTML;
      button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>' + (isActivate ? '\u542F\u7528\u4E2D...' : '\u505C\u7528\u4E2D...');
      button.disabled = true;
      
      try {
        const response = await fetch('/api/subscriptions/' + id + '/toggle-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isActive: isActivate })
        });
        
        if (response.ok) {
          showToast((isActivate ? '\u542F\u7528' : '\u505C\u7528') + '\u6210\u529F', 'success');
          loadSubscriptions();
        } else {
          const error = await response.json();
          showToast((isActivate ? '\u542F\u7528' : '\u505C\u7528') + '\u5931\u8D25: ' + (error.message || '\u672A\u77E5\u9519\u8BEF'), 'error');
          button.innerHTML = originalContent;
          button.disabled = false;
        }
      } catch (error) {
        console.error((isActivate ? '\u542F\u7528' : '\u505C\u7528') + '\u8BA2\u9605\u5931\u8D25:', error);
        showToast((isActivate ? '\u542F\u7528' : '\u505C\u7528') + '\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5', 'error');
        button.innerHTML = originalContent;
        button.disabled = false;
      }
    }
    
    document.getElementById('addSubscriptionBtn').addEventListener('click', () => {
      document.getElementById('modalTitle').textContent = '\u6DFB\u52A0\u65B0\u8BA2\u9605';
      document.getElementById('subscriptionModal').classList.remove('hidden');

      document.getElementById('subscriptionForm').reset();
      document.getElementById('subscriptionId').value = '';
      clearFieldErrors();

      const today = new Date().toISOString().split('T')[0];
      document.getElementById('startDate').value = today;
      document.getElementById('reminderDays').value = '7';
      document.getElementById('isActive').checked = true;
      document.getElementById('autoRenew').checked = true;
      document.getElementById('currency').value = 'NTD'; // \u8BBE\u7F6E\u9ED8\u8BA4\u8D27\u5E01\u4E3A\u53F0\u5E01

      loadLunarPreference();
      calculateExpiryDate();
      setupModalEventListeners();
    });
    
    function setupModalEventListeners() {
      document.getElementById('calculateExpiryBtn').removeEventListener('click', calculateExpiryDate);
      document.getElementById('calculateExpiryBtn').addEventListener('click', calculateExpiryDate);
	  document.getElementById('useLunar').removeEventListener('change', calculateExpiryDate);//\u65B0\u589E\u4FEE\u6539\uFF0C
	  document.getElementById('useLunar').addEventListener('change', calculateExpiryDate);//\u65B0\u589E\u4FEE\u6539\uFF0C

      ['startDate', 'periodValue', 'periodUnit'].forEach(id => {
        const element = document.getElementById(id);
        element.removeEventListener('change', calculateExpiryDate);
        element.addEventListener('change', calculateExpiryDate);
		document.getElementById('useLunar').removeEventListener('change', calculateExpiryDate);//\u65B0\u589E\u4FEE\u6539\uFF0C
	    document.getElementById('useLunar').addEventListener('change', calculateExpiryDate);//\u65B0\u589E\u4FEE\u6539\uFF0C
      });

      // \u6DFB\u52A0\u519C\u5386\u663E\u793A\u4E8B\u4EF6\u76D1\u542C
      document.getElementById('showLunar').removeEventListener('change', toggleLunarDisplay);
      document.getElementById('showLunar').addEventListener('change', toggleLunarDisplay);

      document.getElementById('startDate').removeEventListener('change', () => updateLunarDisplay('startDate', 'startDateLunar'));
      document.getElementById('startDate').addEventListener('change', () => updateLunarDisplay('startDate', 'startDateLunar'));

      document.getElementById('expiryDate').removeEventListener('change', () => updateLunarDisplay('expiryDate', 'expiryDateLunar'));
      document.getElementById('expiryDate').addEventListener('change', () => updateLunarDisplay('expiryDate', 'expiryDateLunar'));

      document.getElementById('cancelBtn').addEventListener('click', () => {
        document.getElementById('subscriptionModal').classList.add('hidden');
      });
    }

	// 3. \u65B0\u589E\u4FEE\u6539\uFF0C calculateExpiryDate \u51FD\u6570\uFF0C\u652F\u6301\u519C\u5386\u5468\u671F\u63A8\u7B97     
	function calculateExpiryDate() {
	  const startDate = document.getElementById('startDate').value;
	  const periodValue = parseInt(document.getElementById('periodValue').value);
	  const periodUnit = document.getElementById('periodUnit').value;
	  const useLunar = document.getElementById('useLunar').checked;

	  if (!startDate || !periodValue || !periodUnit) {
		return;
	  }

	  if (useLunar) {
		// \u519C\u5386\u63A8\u7B97
		const start = new Date(startDate);
		const lunar = lunarCalendar.solar2lunar(start.getFullYear(), start.getMonth() + 1, start.getDate());
		let nextLunar = addLunarPeriod(lunar, periodValue, periodUnit);
		const solar = lunar2solar(nextLunar);
		//const expiry = new Date(solar.year, solar.month - 1, solar.day);
		
		  // \u4F7F\u7528\u4E0E\u516C\u5386\u76F8\u540C\u7684\u65B9\u5F0F\u521B\u5EFA\u65E5\u671F  
  const expiry = new Date(startDate); // \u4ECE\u539F\u59CB\u65E5\u671F\u5F00\u59CB  
  expiry.setFullYear(solar.year);  
  expiry.setMonth(solar.month - 1);  
  expiry.setDate(solar.day);  
		document.getElementById('expiryDate').value = expiry.toISOString().split('T')[0];
		console.log('start:', start);
		console.log('nextLunar:', nextLunar);
		console.log('expiry:', expiry);
		console.log('expiryDate:', document.getElementById('expiryDate').value);
		
		console.log('solar from lunar2solar:', solar);  
		console.log('solar.year:', solar.year, 'solar.month:', solar.month, 'solar.day:', solar.day);
		console.log('expiry.getTime():', expiry.getTime());  
		console.log('expiry.toString():', expiry.toString());
		
		
	  } else {
		// \u516C\u5386\u63A8\u7B97
		const start = new Date(startDate);
		const expiry = new Date(start);
		if (periodUnit === 'day') {
		  expiry.setDate(start.getDate() + periodValue);
		} else if (periodUnit === 'month') {
		  expiry.setMonth(start.getMonth() + periodValue);
		} else if (periodUnit === 'year') {
		  expiry.setFullYear(start.getFullYear() + periodValue);
		}
		document.getElementById('expiryDate').value = expiry.toISOString().split('T')[0];
		console.log('start:', start);
		console.log('expiry:', expiry);
		console.log('expiryDate:', document.getElementById('expiryDate').value);
	  }

	  // \u66F4\u65B0\u519C\u5386\u663E\u793A
	  updateLunarDisplay('startDate', 'startDateLunar');
	  updateLunarDisplay('expiryDate', 'expiryDateLunar');
	}
    
    document.getElementById('closeModal').addEventListener('click', () => {
      document.getElementById('subscriptionModal').classList.add('hidden');
    });
    
    // \u7981\u6B62\u70B9\u51FB\u5F39\u7A97\u5916\u533A\u57DF\u5173\u95ED\u5F39\u7A97\uFF0C\u9632\u6B62\u8BEF\u64CD\u4F5C\u4E22\u5931\u5185\u5BB9
    // document.getElementById('subscriptionModal').addEventListener('click', (event) => {
    //   if (event.target === document.getElementById('subscriptionModal')) {
    //     document.getElementById('subscriptionModal').classList.add('hidden');
    //   }
    // });
    
	
	// 4. \u65B0\u589E\u4FEE\u6539\uFF0C\u76D1\u542C useLunar \u590D\u9009\u6846\u53D8\u5316\u65F6\u4E5F\u81EA\u52A8\u91CD\u65B0\u8BA1\u7B97
	document.getElementById('useLunar').addEventListener('change', calculateExpiryDate);   
   // \u65B0\u589E\u4FEE\u6539\uFF0C\u8868\u5355\u63D0\u4EA4\u65F6\u5E26\u4E0A useLunar \u5B57\u6BB5
    document.getElementById('subscriptionForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!validateForm()) {
        return;
      }
      
      const id = document.getElementById('subscriptionId').value;
      const subscription = {
        name: document.getElementById('name').value.trim(),
        customType: document.getElementById('customType').value.trim(),
        notes: document.getElementById('notes').value.trim() || '',
        amount: document.getElementById('amount').value ? parseFloat(document.getElementById('amount').value) : null, // \u65B0\u589E\uFF1A\u91D1\u989D\u5B57\u6BB5
        currency: document.getElementById('currency').value, // \u65B0\u589E\uFF1A\u8D27\u5E01\u5B57\u6BB5
        isActive: document.getElementById('isActive').checked,
        autoRenew: document.getElementById('autoRenew').checked,
        startDate: document.getElementById('startDate').value,
        expiryDate: document.getElementById('expiryDate').value,
        periodValue: parseInt(document.getElementById('periodValue').value),
        periodUnit: document.getElementById('periodUnit').value,
        reminderDays: parseInt(document.getElementById('reminderDays').value) || 0,
		useLunar: document.getElementById('useLunar').checked // \u65B0\u589E\u4FEE\u6539
      };
      
      const submitButton = e.target.querySelector('button[type="submit"]');
      const originalContent = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>' + (id ? '\u66F4\u65B0\u4E2D...' : '\u4FDD\u5B58\u4E2D...');
      submitButton.disabled = true;
      
      try {
        const url = id ? '/api/subscriptions/' + id : '/api/subscriptions';
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subscription)
        });
        
        const result = await response.json();
        
        if (result.success) {
          showToast((id ? '\u66F4\u65B0' : '\u6DFB\u52A0') + '\u8BA2\u9605\u6210\u529F', 'success');
          document.getElementById('subscriptionModal').classList.add('hidden');
          loadSubscriptions();
        } else {
          showToast((id ? '\u66F4\u65B0' : '\u6DFB\u52A0') + '\u8BA2\u9605\u5931\u8D25: ' + (result.message || '\u672A\u77E5\u9519\u8BEF'), 'error');
        }
      } catch (error) {
        console.error((id ? '\u66F4\u65B0' : '\u6DFB\u52A0') + '\u8BA2\u9605\u5931\u8D25:', error);
        showToast((id ? '\u66F4\u65B0' : '\u6DFB\u52A0') + '\u8BA2\u9605\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5', 'error');
      } finally {
        submitButton.innerHTML = originalContent;
        submitButton.disabled = false;
      }
    });
    
	// \u65B0\u589E\u4FEE\u6539\uFF0C\u7F16\u8F91\u8BA2\u9605\u65F6\u56DE\u663E useLunar \u5B57\u6BB5
    async function editSubscription(e) {
      const id = e.target.dataset.id || e.target.parentElement.dataset.id;
      
      try {
        const response = await fetch('/api/subscriptions/' + id);
        const subscription = await response.json();
        
        if (subscription) {
          document.getElementById('modalTitle').textContent = '\u7F16\u8F91\u8BA2\u9605';
          document.getElementById('subscriptionId').value = subscription.id;
          document.getElementById('name').value = subscription.name;
          document.getElementById('customType').value = subscription.customType || '';
          document.getElementById('notes').value = subscription.notes || '';
          document.getElementById('amount').value = subscription.amount || ''; // \u65B0\u589E\uFF1A\u91D1\u989D\u5B57\u6BB5
          document.getElementById('currency').value = subscription.currency || 'NTD'; // \u65B0\u589E\uFF1A\u8D27\u5E01\u5B57\u6BB5\uFF0C\u9ED8\u8BA4\u53F0\u5E01
          document.getElementById('isActive').checked = subscription.isActive !== false;
          document.getElementById('autoRenew').checked = subscription.autoRenew !== false;
          document.getElementById('startDate').value = subscription.startDate ? subscription.startDate.split('T')[0] : '';
          document.getElementById('expiryDate').value = subscription.expiryDate ? subscription.expiryDate.split('T')[0] : '';
          document.getElementById('periodValue').value = subscription.periodValue || 1;
          document.getElementById('periodUnit').value = subscription.periodUnit || 'month';
          document.getElementById('reminderDays').value = subscription.reminderDays !== undefined ? subscription.reminderDays : 7;
		  document.getElementById('useLunar').checked = !!subscription.useLunar; // \u65B0\u589E\u4FEE\u6539
          
          clearFieldErrors();
          loadLunarPreference();
          document.getElementById('subscriptionModal').classList.remove('hidden');
          setupModalEventListeners();

          // \u66F4\u65B0\u519C\u5386\u663E\u793A
          setTimeout(() => {
            updateLunarDisplay('startDate', 'startDateLunar');
            updateLunarDisplay('expiryDate', 'expiryDateLunar');
          }, 100);
        }
      } catch (error) {
        console.error('\u83B7\u53D6\u8BA2\u9605\u4FE1\u606F\u5931\u8D25:', error);
        showToast('\u83B7\u53D6\u8BA2\u9605\u4FE1\u606F\u5931\u8D25', 'error');
      }
    }
    
    async function deleteSubscription(e) {
      const id = e.target.dataset.id || e.target.parentElement.dataset.id;
      
      if (!confirm('\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u8BA2\u9605\u5417\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u6062\u590D\u3002')) {
        return;
      }
      
      const button = e.target.tagName === 'BUTTON' ? e.target : e.target.parentElement;
      const originalContent = button.innerHTML;
      button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>\u5220\u9664\u4E2D...';
      button.disabled = true;
      
      try {
        const response = await fetch('/api/subscriptions/' + id, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          showToast('\u5220\u9664\u6210\u529F', 'success');
          loadSubscriptions();
        } else {
          const error = await response.json();
          showToast('\u5220\u9664\u5931\u8D25: ' + (error.message || '\u672A\u77E5\u9519\u8BEF'), 'error');
          button.innerHTML = originalContent;
          button.disabled = false;
        }
      } catch (error) {
        console.error('\u5220\u9664\u8BA2\u9605\u5931\u8D25:', error);
        showToast('\u5220\u9664\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5', 'error');
        button.innerHTML = originalContent;
        button.disabled = false;
      }
    }
    
    window.addEventListener('load', loadSubscriptions);
    
    // \u6DFB\u52A0\u7C7B\u578B\u7B5B\u9009\u5668\u4E8B\u4EF6\u76D1\u542C
    window.addEventListener('load', function() {
      const typeFilter = document.getElementById('typeFilter');
      if (typeFilter) {
        typeFilter.addEventListener('change', applyCurrentFilter);
      }
    });
  <\/script>
  
  <!-- Fallback script to ensure subscription data loads -->
  <script>
    (function() {
      function ensureSubscriptionsLoad() {
        const tbody = document.getElementById('subscriptionsBody');
        if (!tbody) return;
        
        // Show loading state
        tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4"><i class="fas fa-spinner fa-spin mr-2"></i>\u52A0\u8F7D\u4E2D...</td></tr>';
        
        fetch('/api/subscriptions')
          .then(function(response) {
            if (!response.ok) {
              if (response.status === 401) {
                window.location.href = '/';
                return;
              }
              throw new Error('HTTP ' + response.status);
            }
            return response.json();
          })
          .then(function(data) {
            if (!data || data.length === 0) {
              tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-gray-500">\u6CA1\u6709\u8BA2\u9605\u6570\u636E</td></tr>';
              return;
            }
            
            var html = '';
            data.forEach(function(sub) {
              var expiryDate = new Date(sub.expiryDate);
              var now = new Date();
              var daysDiff = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
              var statusClass = daysDiff < 0 ? 'text-red-600' : daysDiff <= 7 ? 'text-orange-600' : 'text-green-600';
              var statusText = daysDiff < 0 ? '\u5DF2\u8FC7\u671F' : daysDiff === 0 ? '\u4ECA\u5929\u5230\u671F' : daysDiff + '\u5929\u540E\u5230\u671F';
              
              html += '<tr class="' + (sub.isActive === false ? 'bg-gray-100' : '') + '">';
              html += '<td class="py-3 px-6 text-left">' + (sub.name || 'N/A') + '</td>';
              html += '<td class="py-3 px-6 text-left">' + (sub.customType || '\u5176\u4ED6') + '</td>';
              html += '<td class="py-3 px-6 text-left">';
              html += '<div>' + expiryDate.toLocaleDateString('zh-CN') + '</div>';
              html += '<div class="text-xs ' + statusClass + '">' + statusText + '</div>';
              html += '</td>';
              html += '<td class="py-3 px-6 text-left">' + (sub.amount ? sub.amount + ' ' + (sub.currency || 'NTD') : '-') + '</td>';
              html += '<td class="py-3 px-6 text-left">' + (sub.reminderDays || 7) + '\u5929\u524D</td>';
              html += '<td class="py-3 px-6 text-left">';
              html += '<span class="px-2 py-1 text-xs rounded ' + (sub.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800') + '">';
              html += sub.isActive !== false ? '\u542F\u7528' : '\u505C\u7528';
              html += '</span></td>';
              html += '<td class="py-3 px-6 text-left">';
              html += '<button class="text-blue-600 hover:text-blue-800 mr-2" onclick="editSubscription('' + sub.id + '')">\u7F16\u8F91</button>';
              html += '<button class="text-red-600 hover:text-red-800" onclick="deleteSubscription('' + sub.id + '')">\u5220\u9664</button>';
              html += '</td>';
              html += '</tr>';
            });
            tbody.innerHTML = html;
          })
          .catch(function(error) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-red-500">\u52A0\u8F7D\u5931\u8D25: ' + error.message + '</td></tr>';
          });
      }
      
      // Load on page ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureSubscriptionsLoad);
      } else {
        ensureSubscriptionsLoad();
      }
    })();
  <\/script>
</body>
</html>
`;
var configPage = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>\u7CFB\u7EDF\u914D\u7F6E - \u8BA2\u9605\u7BA1\u7406\u7CFB\u7EDF</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
  <style>
    .btn-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); transition: all 0.3s; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); }
    .btn-secondary { background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); transition: all 0.3s; }
    .btn-secondary:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); }
    
    .toast {
      position: fixed; top: 20px; right: 20px; padding: 12px 20px; border-radius: 8px;
      color: white; font-weight: 500; z-index: 1000; transform: translateX(400px);
      transition: all 0.3s ease-in-out; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    .toast.show { transform: translateX(0); }
    .toast.success { background-color: #10b981; }
    .toast.error { background-color: #ef4444; }
    .toast.info { background-color: #3b82f6; }
    .toast.warning { background-color: #f59e0b; }
    
    .config-section { 
      border: 1px solid #e5e7eb; 
      border-radius: 8px; 
      padding: 16px; 
      margin-bottom: 24px; 
    }
    .config-section.active { 
      background-color: #f8fafc; 
      border-color: #6366f1; 
    }
    .config-section.inactive { 
      background-color: #f9fafb; 
      opacity: 0.7; 
    }
  </style>
</head>
<body class="bg-gray-100 min-h-screen">
  <div id="toast-container"></div>

  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <i class="fas fa-calendar-check text-indigo-600 text-2xl mr-2"></i>
          <span class="font-bold text-xl text-gray-800">\u8BA2\u9605\u7BA1\u7406\u7CFB\u7EDF</span>
        </div>
        <div class="flex items-center space-x-4">
          <a href="/admin" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
            <i class="fas fa-list mr-1"></i>\u8BA2\u9605\u5217\u8868
          </a>
          <a href="/admin/config" class="text-indigo-600 border-b-2 border-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
            <i class="fas fa-cog mr-1"></i>\u7CFB\u7EDF\u914D\u7F6E
          </a>
          <a href="/api/logout" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
            <i class="fas fa-sign-out-alt mr-1"></i>\u9000\u51FA\u767B\u5F55
          </a>
        </div>
      </div>
    </div>
  </nav>
  
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">\u7CFB\u7EDF\u914D\u7F6E</h2>
      
      <form id="configForm" class="space-y-8">
        <div class="border-b border-gray-200 pb-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">\u7BA1\u7406\u5458\u8D26\u6237</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="adminUsername" class="block text-sm font-medium text-gray-700">\u7528\u6237\u540D</label>
              <input type="text" id="adminUsername" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div>
              <label for="adminPassword" class="block text-sm font-medium text-gray-700">\u5BC6\u7801</label>
              <input type="password" id="adminPassword" placeholder="\u5982\u4E0D\u4FEE\u6539\u5BC6\u7801\uFF0C\u8BF7\u7559\u7A7A" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <p class="mt-1 text-sm text-gray-500">\u7559\u7A7A\u8868\u793A\u4E0D\u4FEE\u6539\u5F53\u524D\u5BC6\u7801</p>
            </div>
          </div>
        </div>
        
        <div class="border-b border-gray-200 pb-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">\u663E\u793A\u8BBE\u7F6E</h3>
          <div class="mb-6">
            <label class="inline-flex items-center">
              <input type="checkbox" id="showLunarGlobal" class="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" checked>
              <span class="ml-2 text-sm text-gray-700">\u5728\u901A\u77E5\u4E2D\u663E\u793A\u519C\u5386\u65E5\u671F</span>
            </label>
            <p class="mt-1 text-sm text-gray-500">\u63A7\u5236\u662F\u5426\u5728\u901A\u77E5\u6D88\u606F\u4E2D\u5305\u542B\u519C\u5386\u65E5\u671F\u4FE1\u606F</p>
          </div>
        </div>

        <div class="border-b border-gray-200 pb-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">\u901A\u77E5\u8BBE\u7F6E</h3>
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">\u901A\u77E5\u65B9\u5F0F\uFF08\u53EF\u591A\u9009\uFF09</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label class="inline-flex items-center">
                <input type="checkbox" name="enabledNotifiers" value="telegram" class="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                <span class="ml-2 text-sm text-gray-700">Telegram</span>
              </label>
              <label class="inline-flex items-center">
                <input type="checkbox" name="enabledNotifiers" value="notifyx" class="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" checked>
                <span class="ml-2 text-sm text-gray-700 font-semibold">NotifyX</span>
              </label>
              <label class="inline-flex items-center">
                <input type="checkbox" name="enabledNotifiers" value="webhook" class="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                <span class="ml-2 text-sm text-gray-700">\u4F01\u4E1A\u5FAE\u4FE1\u5E94\u7528\u901A\u77E5</span>
              </label>
              <label class="inline-flex items-center">
                <input type="checkbox" name="enabledNotifiers" value="wechatbot" class="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                <span class="ml-2 text-sm text-gray-700">\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA</span>
              </label>
              <label class="inline-flex items-center">
                <input type="checkbox" name="enabledNotifiers" value="email" class="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                <span class="ml-2 text-sm text-gray-700">\u90AE\u4EF6\u901A\u77E5</span>
              </label>
            </div>
            <div class="mt-2 flex flex-wrap gap-4">
              <a href="https://www.notifyx.cn/" target="_blank" class="text-indigo-600 hover:text-indigo-800 text-sm">
                <i class="fas fa-external-link-alt ml-1"></i> NotifyX\u5B98\u7F51
              </a>
              <a href="https://push.wangwangit.com" target="_blank" class="text-indigo-600 hover:text-indigo-800 text-sm">
                <i class="fas fa-external-link-alt ml-1"></i> \u4F01\u4E1A\u5FAE\u4FE1\u5E94\u7528\u901A\u77E5\u5B98\u7F51
              </a>
              <a href="https://developer.work.weixin.qq.com/document/path/91770" target="_blank" class="text-indigo-600 hover:text-indigo-800 text-sm">
                <i class="fas fa-external-link-alt ml-1"></i> \u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA\u6587\u6863
              </a>
              <a href="https://developers.cloudflare.com/workers/tutorials/send-emails-with-resend/" target="_blank" class="text-indigo-600 hover:text-indigo-800 text-sm">
                <i class="fas fa-external-link-alt ml-1"></i> \u83B7\u53D6 Resend API Key
              </a>
            </div>
          </div>
          
          <div id="telegramConfig" class="config-section">
            <h4 class="text-md font-medium text-gray-900 mb-3">Telegram \u914D\u7F6E</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label for="tgBotToken" class="block text-sm font-medium text-gray-700">Bot Token</label>
                <input type="text" id="tgBotToken" placeholder="\u4ECE @BotFather \u83B7\u53D6" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div>
                <label for="tgChatId" class="block text-sm font-medium text-gray-700">Chat ID</label>
                <input type="text" id="tgChatId" placeholder="\u53EF\u4ECE @userinfobot \u83B7\u53D6" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
            </div>
            <div class="flex justify-end">
              <button type="button" id="testTelegramBtn" class="btn-secondary text-white px-4 py-2 rounded-md text-sm font-medium">
                <i class="fas fa-paper-plane mr-2"></i>\u6D4B\u8BD5 Telegram \u901A\u77E5
              </button>
            </div>
          </div>
          
          <div id="notifyxConfig" class="config-section">
            <h4 class="text-md font-medium text-gray-900 mb-3">NotifyX \u914D\u7F6E</h4>
            <div class="mb-4">
              <label for="notifyxApiKey" class="block text-sm font-medium text-gray-700">API Key</label>
              <input type="text" id="notifyxApiKey" placeholder="\u4ECE NotifyX \u5E73\u53F0\u83B7\u53D6\u7684 API Key" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <p class="mt-1 text-sm text-gray-500">\u4ECE <a href="https://www.notifyx.cn/" target="_blank" class="text-indigo-600 hover:text-indigo-800">NotifyX\u5E73\u53F0</a> \u83B7\u53D6\u7684 API Key</p>
            </div>
            <div class="flex justify-end">
              <button type="button" id="testNotifyXBtn" class="btn-secondary text-white px-4 py-2 rounded-md text-sm font-medium">
                <i class="fas fa-paper-plane mr-2"></i>\u6D4B\u8BD5 NotifyX \u901A\u77E5
              </button>
            </div>
          </div>

          <div id="webhookConfig" class="config-section">
            <h4 class="text-md font-medium text-gray-900 mb-3">\u4F01\u4E1A\u5FAE\u4FE1\u5E94\u7528\u901A\u77E5 \u914D\u7F6E</h4>
            <div class="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label for="webhookUrl" class="block text-sm font-medium text-gray-700">\u4F01\u4E1A\u5FAE\u4FE1\u5E94\u7528\u901A\u77E5 URL</label>
                <input type="url" id="webhookUrl" placeholder="https://push.wangwangit.com/api/send/your-key" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <p class="mt-1 text-sm text-gray-500">\u4ECE <a href="https://push.wangwangit.com" target="_blank" class="text-indigo-600 hover:text-indigo-800">\u4F01\u4E1A\u5FAE\u4FE1\u5E94\u7528\u901A\u77E5\u5E73\u53F0</a> \u83B7\u53D6\u7684\u63A8\u9001URL</p>
              </div>
              <div>
                <label for="webhookMethod" class="block text-sm font-medium text-gray-700">\u8BF7\u6C42\u65B9\u6CD5</label>
                <select id="webhookMethod" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="POST">POST</option>
                  <option value="GET">GET</option>
                  <option value="PUT">PUT</option>
                </select>
              </div>
              <div>
                <label for="webhookHeaders" class="block text-sm font-medium text-gray-700">\u81EA\u5B9A\u4E49\u8BF7\u6C42\u5934 (JSON\u683C\u5F0F\uFF0C\u53EF\u9009)</label>
                <textarea id="webhookHeaders" rows="3" placeholder='{"Authorization": "Bearer your-token", "Content-Type": "application/json"}' class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                <p class="mt-1 text-sm text-gray-500">JSON\u683C\u5F0F\u7684\u81EA\u5B9A\u4E49\u8BF7\u6C42\u5934\uFF0C\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4</p>
              </div>
              <div>
                <label for="webhookTemplate" class="block text-sm font-medium text-gray-700">\u6D88\u606F\u6A21\u677F (JSON\u683C\u5F0F\uFF0C\u53EF\u9009)</label>
                <textarea id="webhookTemplate" rows="4" placeholder='{"title": "{{title}}", "content": "{{content}}", "timestamp": "{{timestamp}}"}' class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                <p class="mt-1 text-sm text-gray-500">\u652F\u6301\u53D8\u91CF: {{title}}, {{content}}, {{timestamp}}\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u683C\u5F0F</p>
              </div>
            </div>
            <div class="flex justify-end">
              <button type="button" id="testWebhookBtn" class="btn-secondary text-white px-4 py-2 rounded-md text-sm font-medium">
                <i class="fas fa-paper-plane mr-2"></i>\u6D4B\u8BD5 \u4F01\u4E1A\u5FAE\u4FE1\u5E94\u7528\u901A\u77E5
              </button>
            </div>
          </div>

          <div id="wechatbotConfig" class="config-section">
            <h4 class="text-md font-medium text-gray-900 mb-3">\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA \u914D\u7F6E</h4>
            <div class="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label for="wechatbotWebhook" class="block text-sm font-medium text-gray-700">\u673A\u5668\u4EBA Webhook URL</label>
                <input type="url" id="wechatbotWebhook" placeholder="https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=your-key" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <p class="mt-1 text-sm text-gray-500">\u4ECE\u4F01\u4E1A\u5FAE\u4FE1\u7FA4\u804A\u4E2D\u6DFB\u52A0\u673A\u5668\u4EBA\u83B7\u53D6\u7684 Webhook URL</p>
              </div>
              <div>
                <label for="wechatbotMsgType" class="block text-sm font-medium text-gray-700">\u6D88\u606F\u7C7B\u578B</label>
                <select id="wechatbotMsgType" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="text">\u6587\u672C\u6D88\u606F</option>
                  <option value="markdown">Markdown\u6D88\u606F</option>
                </select>
                <p class="mt-1 text-sm text-gray-500">\u9009\u62E9\u53D1\u9001\u7684\u6D88\u606F\u683C\u5F0F\u7C7B\u578B</p>
              </div>
              <div>
                <label for="wechatbotAtMobiles" class="block text-sm font-medium text-gray-700">@\u624B\u673A\u53F7 (\u53EF\u9009)</label>
                <input type="text" id="wechatbotAtMobiles" placeholder="13800138000,13900139000" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <p class="mt-1 text-sm text-gray-500">\u9700\u8981@\u7684\u624B\u673A\u53F7\uFF0C\u591A\u4E2A\u7528\u9017\u53F7\u5206\u9694\uFF0C\u7559\u7A7A\u5219\u4E0D@\u4EFB\u4F55\u4EBA</p>
              </div>
              <div>
                <label for="wechatbotAtAll" class="block text-sm font-medium text-gray-700 mb-2">@\u6240\u6709\u4EBA</label>
                <label class="inline-flex items-center">
                  <input type="checkbox" id="wechatbotAtAll" class="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                  <span class="ml-2 text-sm text-gray-700">\u53D1\u9001\u6D88\u606F\u65F6@\u6240\u6709\u4EBA</span>
                </label>
              </div>
            </div>
            <div class="flex justify-end">
              <button type="button" id="testWechatBotBtn" class="btn-secondary text-white px-4 py-2 rounded-md text-sm font-medium">
                <i class="fas fa-paper-plane mr-2"></i>\u6D4B\u8BD5 \u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA
              </button>
            </div>
          </div>

          <div id="emailConfig" class="config-section">
            <h4 class="text-md font-medium text-gray-900 mb-3">\u90AE\u4EF6\u901A\u77E5 \u914D\u7F6E</h4>
            <div class="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label for="resendApiKey" class="block text-sm font-medium text-gray-700">Resend API Key</label>
                <input type="text" id="resendApiKey" placeholder="re_xxxxxxxxxx" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <p class="mt-1 text-sm text-gray-500">\u4ECE <a href="https://resend.com/api-keys" target="_blank" class="text-indigo-600 hover:text-indigo-800">Resend\u63A7\u5236\u53F0</a> \u83B7\u53D6\u7684 API Key</p>
              </div>
              <div>
                <label for="emailFrom" class="block text-sm font-medium text-gray-700">\u53D1\u4EF6\u4EBA\u90AE\u7BB1</label>
                <input type="email" id="emailFrom" placeholder="noreply@yourdomain.com" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <p class="mt-1 text-sm text-gray-500">\u5FC5\u987B\u662F\u5DF2\u5728Resend\u9A8C\u8BC1\u7684\u57DF\u540D\u90AE\u7BB1</p>
              </div>
              <div>
                <label for="emailFromName" class="block text-sm font-medium text-gray-700">\u53D1\u4EF6\u4EBA\u540D\u79F0</label>
                <input type="text" id="emailFromName" placeholder="\u8BA2\u9605\u63D0\u9192\u7CFB\u7EDF" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <p class="mt-1 text-sm text-gray-500">\u663E\u793A\u5728\u90AE\u4EF6\u4E2D\u7684\u53D1\u4EF6\u4EBA\u540D\u79F0</p>
              </div>
              <div>
                <label for="emailTo" class="block text-sm font-medium text-gray-700">\u6536\u4EF6\u4EBA\u90AE\u7BB1</label>
                <input type="email" id="emailTo" placeholder="user@example.com" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <p class="mt-1 text-sm text-gray-500">\u63A5\u6536\u901A\u77E5\u90AE\u4EF6\u7684\u90AE\u7BB1\u5730\u5740</p>
              </div>
            </div>
            <div class="flex justify-end">
              <button type="button" id="testEmailBtn" class="btn-secondary text-white px-4 py-2 rounded-md text-sm font-medium">
                <i class="fas fa-paper-plane mr-2"></i>\u6D4B\u8BD5 \u90AE\u4EF6\u901A\u77E5
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button type="submit" class="btn-primary text-white px-6 py-2 rounded-md text-sm font-medium">
            <i class="fas fa-save mr-2"></i>\u4FDD\u5B58\u914D\u7F6E
          </button>
        </div>
      </form>
    </div>
  </div>

  <script>
    function showToast(message, type = 'success', duration = 3000) {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = 'toast ' + type;
      
      const icon = type === 'success' ? 'check-circle' :
                   type === 'error' ? 'exclamation-circle' :
                   type === 'warning' ? 'exclamation-triangle' : 'info-circle';
      
      toast.innerHTML = '<div class="flex items-center"><i class="fas fa-' + icon + ' mr-2"></i><span>' + message + '</span></div>';
      
      container.appendChild(toast);
      setTimeout(() => toast.classList.add('show'), 100);
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          if (container.contains(toast)) {
            container.removeChild(toast);
          }
        }, 300);
      }, duration);
    }

    async function loadConfig() {
      try {
        const response = await fetch('/api/config');
        const config = await response.json();

        document.getElementById('adminUsername').value = config.ADMIN_USERNAME || '';
        document.getElementById('tgBotToken').value = config.TG_BOT_TOKEN || '';
        document.getElementById('tgChatId').value = config.TG_CHAT_ID || '';
        document.getElementById('notifyxApiKey').value = config.NOTIFYX_API_KEY || '';
        document.getElementById('webhookUrl').value = config.WEBHOOK_URL || '';
        document.getElementById('webhookMethod').value = config.WEBHOOK_METHOD || 'POST';
        document.getElementById('webhookHeaders').value = config.WEBHOOK_HEADERS || '';
        document.getElementById('webhookTemplate').value = config.WEBHOOK_TEMPLATE || '';
        document.getElementById('wechatbotWebhook').value = config.WECHATBOT_WEBHOOK || '';
        document.getElementById('wechatbotMsgType').value = config.WECHATBOT_MSG_TYPE || 'text';
        document.getElementById('wechatbotAtMobiles').value = config.WECHATBOT_AT_MOBILES || '';
        document.getElementById('wechatbotAtAll').checked = config.WECHATBOT_AT_ALL === 'true';
        document.getElementById('resendApiKey').value = config.RESEND_API_KEY || '';
        document.getElementById('emailFrom').value = config.EMAIL_FROM || '';
        document.getElementById('emailFromName').value = config.EMAIL_FROM_NAME || '\u8BA2\u9605\u63D0\u9192\u7CFB\u7EDF';
        document.getElementById('emailTo').value = config.EMAIL_TO || '';

        // \u52A0\u8F7D\u519C\u5386\u663E\u793A\u8BBE\u7F6E
        document.getElementById('showLunarGlobal').checked = config.SHOW_LUNAR === true;

        // \u5904\u7406\u591A\u9009\u901A\u77E5\u6E20\u9053
        const enabledNotifiers = config.ENABLED_NOTIFIERS || ['notifyx'];
        document.querySelectorAll('input[name="enabledNotifiers"]').forEach(checkbox => {
          checkbox.checked = enabledNotifiers.includes(checkbox.value);
        });

        toggleNotificationConfigs(enabledNotifiers);
      } catch (error) {
        console.error('\u52A0\u8F7D\u914D\u7F6E\u5931\u8D25:', error);
        showToast('\u52A0\u8F7D\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0\u9875\u9762\u91CD\u8BD5', 'error');
      }
    }
    
    function toggleNotificationConfigs(enabledNotifiers) {
      const telegramConfig = document.getElementById('telegramConfig');
      const notifyxConfig = document.getElementById('notifyxConfig');
      const webhookConfig = document.getElementById('webhookConfig');
      const wechatbotConfig = document.getElementById('wechatbotConfig');
      const emailConfig = document.getElementById('emailConfig');

      // \u91CD\u7F6E\u6240\u6709\u914D\u7F6E\u533A\u57DF
      [telegramConfig, notifyxConfig, webhookConfig, wechatbotConfig, emailConfig].forEach(config => {
        config.classList.remove('active', 'inactive');
        config.classList.add('inactive');
      });

      // \u6FC0\u6D3B\u9009\u4E2D\u7684\u914D\u7F6E\u533A\u57DF
      enabledNotifiers.forEach(type => {
        if (type === 'telegram') {
          telegramConfig.classList.remove('inactive');
          telegramConfig.classList.add('active');
        } else if (type === 'notifyx') {
          notifyxConfig.classList.remove('inactive');
          notifyxConfig.classList.add('active');
        } else if (type === 'webhook') {
          webhookConfig.classList.remove('inactive');
          webhookConfig.classList.add('active');
        } else if (type === 'wechatbot') {
          wechatbotConfig.classList.remove('inactive');
          wechatbotConfig.classList.add('active');
        } else if (type === 'email') {
          emailConfig.classList.remove('inactive');
          emailConfig.classList.add('active');
        }
      });
    }

    document.querySelectorAll('input[name="enabledNotifiers"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const enabledNotifiers = Array.from(document.querySelectorAll('input[name="enabledNotifiers"]:checked'))
          .map(cb => cb.value);
        toggleNotificationConfigs(enabledNotifiers);
      });
    });
    
    document.getElementById('configForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const enabledNotifiers = Array.from(document.querySelectorAll('input[name="enabledNotifiers"]:checked'))
        .map(cb => cb.value);

      if (enabledNotifiers.length === 0) {
        showToast('\u8BF7\u81F3\u5C11\u9009\u62E9\u4E00\u79CD\u901A\u77E5\u65B9\u5F0F', 'warning');
        return;
      }

      const config = {
        ADMIN_USERNAME: document.getElementById('adminUsername').value.trim(),
        TG_BOT_TOKEN: document.getElementById('tgBotToken').value.trim(),
        TG_CHAT_ID: document.getElementById('tgChatId').value.trim(),
        NOTIFYX_API_KEY: document.getElementById('notifyxApiKey').value.trim(),
        WEBHOOK_URL: document.getElementById('webhookUrl').value.trim(),
        WEBHOOK_METHOD: document.getElementById('webhookMethod').value,
        WEBHOOK_HEADERS: document.getElementById('webhookHeaders').value.trim(),
        WEBHOOK_TEMPLATE: document.getElementById('webhookTemplate').value.trim(),
        SHOW_LUNAR: document.getElementById('showLunarGlobal').checked,
        WECHATBOT_WEBHOOK: document.getElementById('wechatbotWebhook').value.trim(),
        WECHATBOT_MSG_TYPE: document.getElementById('wechatbotMsgType').value,
        WECHATBOT_AT_MOBILES: document.getElementById('wechatbotAtMobiles').value.trim(),
        WECHATBOT_AT_ALL: document.getElementById('wechatbotAtAll').checked.toString(),
        RESEND_API_KEY: document.getElementById('resendApiKey').value.trim(),
        EMAIL_FROM: document.getElementById('emailFrom').value.trim(),
        EMAIL_FROM_NAME: document.getElementById('emailFromName').value.trim(),
        EMAIL_TO: document.getElementById('emailTo').value.trim(),
        ENABLED_NOTIFIERS: enabledNotifiers
      };

      const passwordField = document.getElementById('adminPassword');
      if (passwordField.value.trim()) {
        config.ADMIN_PASSWORD = passwordField.value.trim();
      }

      const submitButton = e.target.querySelector('button[type="submit"]');
      const originalContent = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>\u4FDD\u5B58\u4E2D...';
      submitButton.disabled = true;

      try {
        const response = await fetch('/api/config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(config)
        });

        const result = await response.json();

        if (result.success) {
          showToast('\u914D\u7F6E\u4FDD\u5B58\u6210\u529F', 'success');
          passwordField.value = '';
        } else {
          showToast('\u914D\u7F6E\u4FDD\u5B58\u5931\u8D25: ' + (result.message || '\u672A\u77E5\u9519\u8BEF'), 'error');
        }
      } catch (error) {
        console.error('\u4FDD\u5B58\u914D\u7F6E\u5931\u8D25:', error);
        showToast('\u4FDD\u5B58\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5', 'error');
      } finally {
        submitButton.innerHTML = originalContent;
        submitButton.disabled = false;
      }
    });
    
    async function testNotification(type) {
      const buttonId = type === 'telegram' ? 'testTelegramBtn' :
                      type === 'notifyx' ? 'testNotifyXBtn' :
                      type === 'wechatbot' ? 'testWechatBotBtn' :
                      type === 'email' ? 'testEmailBtn' : 'testWebhookBtn';
      const button = document.getElementById(buttonId);
      const originalContent = button.innerHTML;
      const serviceName = type === 'telegram' ? 'Telegram' :
                          type === 'notifyx' ? 'NotifyX' :
                          type === 'wechatbot' ? '\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA' :
                          type === 'email' ? '\u90AE\u4EF6\u901A\u77E5' : '\u4F01\u4E1A\u5FAE\u4FE1\u5E94\u7528\u901A\u77E5';

      button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>\u6D4B\u8BD5\u4E2D...';
      button.disabled = true;

      const config = {};
      if (type === 'telegram') {
        config.TG_BOT_TOKEN = document.getElementById('tgBotToken').value.trim();
        config.TG_CHAT_ID = document.getElementById('tgChatId').value.trim();

        if (!config.TG_BOT_TOKEN || !config.TG_CHAT_ID) {
          showToast('\u8BF7\u5148\u586B\u5199 Telegram Bot Token \u548C Chat ID', 'warning');
          button.innerHTML = originalContent;
          button.disabled = false;
          return;
        }
      } else if (type === 'notifyx') {
        config.NOTIFYX_API_KEY = document.getElementById('notifyxApiKey').value.trim();

        if (!config.NOTIFYX_API_KEY) {
          showToast('\u8BF7\u5148\u586B\u5199 NotifyX API Key', 'warning');
          button.innerHTML = originalContent;
          button.disabled = false;
          return;
        }
      } else if (type === 'webhook') {
        config.WEBHOOK_URL = document.getElementById('webhookUrl').value.trim();
        config.WEBHOOK_METHOD = document.getElementById('webhookMethod').value;
        config.WEBHOOK_HEADERS = document.getElementById('webhookHeaders').value.trim();
        config.WEBHOOK_TEMPLATE = document.getElementById('webhookTemplate').value.trim();

        if (!config.WEBHOOK_URL) {
          showToast('\u8BF7\u5148\u586B\u5199 \u4F01\u4E1A\u5FAE\u4FE1\u5E94\u7528\u901A\u77E5 URL', 'warning');
          button.innerHTML = originalContent;
          button.disabled = false;
          return;
        }
      } else if (type === 'wechatbot') {
        config.WECHATBOT_WEBHOOK = document.getElementById('wechatbotWebhook').value.trim();
        config.WECHATBOT_MSG_TYPE = document.getElementById('wechatbotMsgType').value;
        config.WECHATBOT_AT_MOBILES = document.getElementById('wechatbotAtMobiles').value.trim();
        config.WECHATBOT_AT_ALL = document.getElementById('wechatbotAtAll').checked.toString();

        if (!config.WECHATBOT_WEBHOOK) {
          showToast('\u8BF7\u5148\u586B\u5199\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA Webhook URL', 'warning');
          button.innerHTML = originalContent;
          button.disabled = false;
          return;
        }
      } else if (type === 'email') {
        config.RESEND_API_KEY = document.getElementById('resendApiKey').value.trim();
        config.EMAIL_FROM = document.getElementById('emailFrom').value.trim();
        config.EMAIL_FROM_NAME = document.getElementById('emailFromName').value.trim();
        config.EMAIL_TO = document.getElementById('emailTo').value.trim();

        if (!config.RESEND_API_KEY || !config.EMAIL_FROM || !config.EMAIL_TO) {
          showToast('\u8BF7\u5148\u586B\u5199 Resend API Key\u3001\u53D1\u4EF6\u4EBA\u90AE\u7BB1\u548C\u6536\u4EF6\u4EBA\u90AE\u7BB1', 'warning');
          button.innerHTML = originalContent;
          button.disabled = false;
          return;
        }
      }

      try {
        const response = await fetch('/api/test-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: type, ...config })
        });

        const result = await response.json();

        if (result.success) {
          showToast(serviceName + ' \u901A\u77E5\u6D4B\u8BD5\u6210\u529F\uFF01', 'success');
        } else {
          showToast(serviceName + ' \u901A\u77E5\u6D4B\u8BD5\u5931\u8D25: ' + (result.message || '\u672A\u77E5\u9519\u8BEF'), 'error');
        }
      } catch (error) {
        console.error('\u6D4B\u8BD5\u901A\u77E5\u5931\u8D25:', error);
        showToast('\u6D4B\u8BD5\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5', 'error');
      } finally {
        button.innerHTML = originalContent;
        button.disabled = false;
      }
    }
    
    document.getElementById('testTelegramBtn').addEventListener('click', () => {
      testNotification('telegram');
    });
    
    document.getElementById('testNotifyXBtn').addEventListener('click', () => {
      testNotification('notifyx');
    });

    document.getElementById('testWebhookBtn').addEventListener('click', () => {
      testNotification('webhook');
    });

    document.getElementById('testWechatBotBtn').addEventListener('click', () => {
      testNotification('wechatbot');
    });

    document.getElementById('testEmailBtn').addEventListener('click', () => {
      testNotification('email');
    });

    window.addEventListener('load', loadConfig);
  <\/script>
</body>
</html>
`;
var admin = {
  async handleRequest(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const pathname = url.pathname;
      console.log("[\u7BA1\u7406\u9875\u9762] \u8BBF\u95EE\u8DEF\u5F84:", pathname);
      const token = getCookieValue(request.headers.get("Cookie"), "token");
      console.log("[\u7BA1\u7406\u9875\u9762] Token\u5B58\u5728:", !!token);
      const config = await getConfig(env);
      const user = token ? await verifyJWT(token, config.JWT_SECRET) : null;
      console.log("[\u7BA1\u7406\u9875\u9762] \u7528\u6237\u9A8C\u8BC1\u7ED3\u679C:", !!user);
      if (!user) {
        console.log("[\u7BA1\u7406\u9875\u9762] \u7528\u6237\u672A\u767B\u5F55\uFF0C\u91CD\u5B9A\u5411\u5230\u767B\u5F55\u9875\u9762");
        return new Response("", {
          status: 302,
          headers: { "Location": "/" }
        });
      }
      if (pathname === "/admin/config") {
        return new Response(configPage, {
          headers: { "Content-Type": "text/html; charset=utf-8" }
        });
      }
      return new Response(adminPage, {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    } catch (error) {
      console.error("[\u7BA1\u7406\u9875\u9762] \u5904\u7406\u8BF7\u6C42\u65F6\u51FA\u9519:", error);
      return new Response("\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF", {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
  }
};
var api = {
  async handleRequest(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.slice(4);
    const method = request.method;
    const config = await getConfig(env);
    if (path === "/login" && method === "POST") {
      const body = await request.json();
      if (body.username === config.ADMIN_USERNAME && body.password === config.ADMIN_PASSWORD) {
        const token2 = await generateJWT(body.username, config.JWT_SECRET);
        return new Response(
          JSON.stringify({ success: true }),
          {
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie": "token=" + token2 + "; HttpOnly; Path=/; SameSite=Strict; Max-Age=86400"
            }
          }
        );
      } else {
        return new Response(
          JSON.stringify({ success: false, message: "\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF" }),
          { headers: { "Content-Type": "application/json" } }
        );
      }
    }
    if (path === "/logout" && (method === "GET" || method === "POST")) {
      return new Response("", {
        status: 302,
        headers: {
          "Location": "/",
          "Set-Cookie": "token=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0"
        }
      });
    }
    const token = getCookieValue(request.headers.get("Cookie"), "token");
    console.log("[API] Token\u5B58\u5728:", !!token);
    const user = token ? await verifyJWT(token, config.JWT_SECRET) : null;
    console.log("[API] \u7528\u6237\u9A8C\u8BC1\u7ED3\u679C:", !!user);
    if (!user && path !== "/login") {
      console.log("[API] \u672A\u6388\u6743\u8BBF\u95EE\u8DEF\u5F84:", path);
      return new Response(
        JSON.stringify({ success: false, message: "\u672A\u6388\u6743\u8BBF\u95EE" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    if (path === "/config") {
      if (method === "GET") {
        const { JWT_SECRET, ADMIN_PASSWORD, ...safeConfig } = config;
        return new Response(
          JSON.stringify(safeConfig),
          { headers: { "Content-Type": "application/json" } }
        );
      }
      if (method === "POST") {
        try {
          const newConfig = await request.json();
          const updatedConfig = {
            ...config,
            ADMIN_USERNAME: newConfig.ADMIN_USERNAME || config.ADMIN_USERNAME,
            TG_BOT_TOKEN: newConfig.TG_BOT_TOKEN || "",
            TG_CHAT_ID: newConfig.TG_CHAT_ID || "",
            NOTIFYX_API_KEY: newConfig.NOTIFYX_API_KEY || "",
            WEBHOOK_URL: newConfig.WEBHOOK_URL || "",
            WEBHOOK_METHOD: newConfig.WEBHOOK_METHOD || "POST",
            WEBHOOK_HEADERS: newConfig.WEBHOOK_HEADERS || "",
            WEBHOOK_TEMPLATE: newConfig.WEBHOOK_TEMPLATE || "",
            SHOW_LUNAR: newConfig.SHOW_LUNAR === true,
            WECHATBOT_WEBHOOK: newConfig.WECHATBOT_WEBHOOK || "",
            WECHATBOT_MSG_TYPE: newConfig.WECHATBOT_MSG_TYPE || "text",
            WECHATBOT_AT_MOBILES: newConfig.WECHATBOT_AT_MOBILES || "",
            WECHATBOT_AT_ALL: newConfig.WECHATBOT_AT_ALL || "false",
            RESEND_API_KEY: newConfig.RESEND_API_KEY || "",
            EMAIL_FROM: newConfig.EMAIL_FROM || "",
            EMAIL_FROM_NAME: newConfig.EMAIL_FROM_NAME || "",
            EMAIL_TO: newConfig.EMAIL_TO || "",
            ENABLED_NOTIFIERS: newConfig.ENABLED_NOTIFIERS || ["notifyx"]
          };
          if (newConfig.ADMIN_PASSWORD) {
            updatedConfig.ADMIN_PASSWORD = newConfig.ADMIN_PASSWORD;
          }
          if (!updatedConfig.JWT_SECRET || updatedConfig.JWT_SECRET === "your-secret-key") {
            updatedConfig.JWT_SECRET = generateRandomSecret();
            console.log("[\u5B89\u5168] \u751F\u6210\u65B0\u7684JWT\u5BC6\u94A5");
          }
          await env.SUBSCRIPTIONS_KV.put("config", JSON.stringify(updatedConfig));
          return new Response(
            JSON.stringify({ success: true }),
            { headers: { "Content-Type": "application/json" } }
          );
        } catch (error) {
          console.error("\u914D\u7F6E\u4FDD\u5B58\u9519\u8BEF:", error);
          return new Response(
            JSON.stringify({ success: false, message: "\u66F4\u65B0\u914D\u7F6E\u5931\u8D25: " + error.message }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
      }
    }
    if (path === "/test-notification" && method === "POST") {
      try {
        const body = await request.json();
        let success = false;
        let message = "";
        if (body.type === "telegram") {
          const testConfig = {
            ...config,
            TG_BOT_TOKEN: body.TG_BOT_TOKEN,
            TG_CHAT_ID: body.TG_CHAT_ID
          };
          const content = "*\u6D4B\u8BD5\u901A\u77E5*\n\n\u8FD9\u662F\u4E00\u6761\u6D4B\u8BD5\u901A\u77E5\uFF0C\u7528\u4E8E\u9A8C\u8BC1Telegram\u901A\u77E5\u529F\u80FD\u662F\u5426\u6B63\u5E38\u5DE5\u4F5C\u3002\n\n\u53D1\u9001\u65F6\u95F4: " + formatBeijingTime();
          success = await sendTelegramNotification(content, testConfig);
          message = success ? "Telegram\u901A\u77E5\u53D1\u9001\u6210\u529F" : "Telegram\u901A\u77E5\u53D1\u9001\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u914D\u7F6E";
        } else if (body.type === "notifyx") {
          const testConfig = {
            ...config,
            NOTIFYX_API_KEY: body.NOTIFYX_API_KEY
          };
          const title = "\u6D4B\u8BD5\u901A\u77E5";
          const content = "## \u8FD9\u662F\u4E00\u6761\u6D4B\u8BD5\u901A\u77E5\n\n\u7528\u4E8E\u9A8C\u8BC1NotifyX\u901A\u77E5\u529F\u80FD\u662F\u5426\u6B63\u5E38\u5DE5\u4F5C\u3002\n\n\u53D1\u9001\u65F6\u95F4: " + formatBeijingTime();
          const description = "\u6D4B\u8BD5NotifyX\u901A\u77E5\u529F\u80FD";
          success = await sendNotifyXNotification(title, content, description, testConfig);
          message = success ? "NotifyX\u901A\u77E5\u53D1\u9001\u6210\u529F" : "NotifyX\u901A\u77E5\u53D1\u9001\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u914D\u7F6E";
        } else if (body.type === "webhook") {
          const testConfig = {
            ...config,
            WEBHOOK_URL: body.WEBHOOK_URL,
            WEBHOOK_METHOD: body.WEBHOOK_METHOD,
            WEBHOOK_HEADERS: body.WEBHOOK_HEADERS,
            WEBHOOK_TEMPLATE: body.WEBHOOK_TEMPLATE
          };
          const title = "\u6D4B\u8BD5\u901A\u77E5";
          const content = "\u8FD9\u662F\u4E00\u6761\u6D4B\u8BD5\u901A\u77E5\uFF0C\u7528\u4E8E\u9A8C\u8BC1\u4F01\u4E1A\u5FAE\u4FE1\u5E94\u7528\u901A\u77E5\u529F\u80FD\u662F\u5426\u6B63\u5E38\u5DE5\u4F5C\u3002\n\n\u53D1\u9001\u65F6\u95F4: " + formatBeijingTime();
          success = await sendWebhookNotification(title, content, testConfig);
          message = success ? "\u4F01\u4E1A\u5FAE\u4FE1\u5E94\u7528\u901A\u77E5\u53D1\u9001\u6210\u529F" : "\u4F01\u4E1A\u5FAE\u4FE1\u5E94\u7528\u901A\u77E5\u53D1\u9001\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u914D\u7F6E";
        } else if (body.type === "wechatbot") {
          const testConfig = {
            ...config,
            WECHATBOT_WEBHOOK: body.WECHATBOT_WEBHOOK,
            WECHATBOT_MSG_TYPE: body.WECHATBOT_MSG_TYPE,
            WECHATBOT_AT_MOBILES: body.WECHATBOT_AT_MOBILES,
            WECHATBOT_AT_ALL: body.WECHATBOT_AT_ALL
          };
          const title = "\u6D4B\u8BD5\u901A\u77E5";
          const content = "\u8FD9\u662F\u4E00\u6761\u6D4B\u8BD5\u901A\u77E5\uFF0C\u7528\u4E8E\u9A8C\u8BC1\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA\u529F\u80FD\u662F\u5426\u6B63\u5E38\u5DE5\u4F5C\u3002\n\n\u53D1\u9001\u65F6\u95F4: " + formatBeijingTime();
          success = await sendWechatBotNotification(title, content, testConfig);
          message = success ? "\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA\u901A\u77E5\u53D1\u9001\u6210\u529F" : "\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA\u901A\u77E5\u53D1\u9001\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u914D\u7F6E";
        } else if (body.type === "email") {
          const testConfig = {
            ...config,
            RESEND_API_KEY: body.RESEND_API_KEY,
            EMAIL_FROM: body.EMAIL_FROM,
            EMAIL_FROM_NAME: body.EMAIL_FROM_NAME,
            EMAIL_TO: body.EMAIL_TO
          };
          const title = "\u6D4B\u8BD5\u901A\u77E5";
          const content = "\u8FD9\u662F\u4E00\u6761\u6D4B\u8BD5\u901A\u77E5\uFF0C\u7528\u4E8E\u9A8C\u8BC1\u90AE\u4EF6\u901A\u77E5\u529F\u80FD\u662F\u5426\u6B63\u5E38\u5DE5\u4F5C\u3002\n\n\u53D1\u9001\u65F6\u95F4: " + formatBeijingTime();
          success = await sendEmailNotification(title, content, testConfig);
          message = success ? "\u90AE\u4EF6\u901A\u77E5\u53D1\u9001\u6210\u529F" : "\u90AE\u4EF6\u901A\u77E5\u53D1\u9001\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u914D\u7F6E";
        }
        return new Response(
          JSON.stringify({ success, message }),
          { headers: { "Content-Type": "application/json" } }
        );
      } catch (error) {
        console.error("\u6D4B\u8BD5\u901A\u77E5\u5931\u8D25:", error);
        return new Response(
          JSON.stringify({ success: false, message: "\u6D4B\u8BD5\u901A\u77E5\u5931\u8D25: " + error.message }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }
    if (path === "/subscriptions") {
      if (method === "GET") {
        try {
          console.log("[API] \u5F00\u59CB\u83B7\u53D6\u8BA2\u9605\u5217\u8868");
          const subscriptions = await getAllSubscriptions(env);
          console.log("[API] \u6210\u529F\u83B7\u53D6\u8BA2\u9605\u5217\u8868\uFF0C\u6570\u91CF:", subscriptions.length);
          return new Response(
            JSON.stringify(subscriptions),
            { headers: { "Content-Type": "application/json" } }
          );
        } catch (error) {
          console.error("[API] \u83B7\u53D6\u8BA2\u9605\u5217\u8868\u5931\u8D25:", error);
          return new Response(
            JSON.stringify({
              success: false,
              message: "\u83B7\u53D6\u8BA2\u9605\u5217\u8868\u5931\u8D25: " + error.message,
              error: error.toString()
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" }
            }
          );
        }
      }
      if (method === "POST") {
        const subscription = await request.json();
        const result = await createSubscription(subscription, env);
        return new Response(
          JSON.stringify(result),
          {
            status: result.success ? 201 : 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
    }
    if (path.startsWith("/subscriptions/")) {
      const parts = path.split("/");
      const id = parts[2];
      if (parts[3] === "toggle-status" && method === "POST") {
        const body = await request.json();
        const result = await toggleSubscriptionStatus(id, body.isActive, env);
        return new Response(
          JSON.stringify(result),
          {
            status: result.success ? 200 : 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      if (parts[3] === "test-notify" && method === "POST") {
        const result = await testSingleSubscriptionNotification(id, env);
        return new Response(JSON.stringify(result), { status: result.success ? 200 : 500, headers: { "Content-Type": "application/json" } });
      }
      if (method === "GET") {
        const subscription = await getSubscription(id, env);
        return new Response(
          JSON.stringify(subscription),
          { headers: { "Content-Type": "application/json" } }
        );
      }
      if (method === "PUT") {
        const subscription = await request.json();
        const result = await updateSubscription(id, subscription, env);
        return new Response(
          JSON.stringify(result),
          {
            status: result.success ? 200 : 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      if (method === "DELETE") {
        const result = await deleteSubscription(id, env);
        return new Response(
          JSON.stringify(result),
          {
            status: result.success ? 200 : 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
    }
    if (path.startsWith("/notify/")) {
      const code = path.split("/")[2];
      if (method === "POST") {
        try {
          const body = await request.json();
          const title = body.title || "\u7B2C\u4E09\u65B9\u901A\u77E5";
          const content = body.content || "";
          if (!content) {
            return new Response(
              JSON.stringify({ message: "\u7F3A\u5C11\u5FC5\u586B\u53C2\u6570 content" }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }
          const config2 = await getConfig(env);
          await sendNotificationToAllChannels(title, content, config2, "[\u7B2C\u4E09\u65B9API]");
          return new Response(
            JSON.stringify({
              message: "\u53D1\u9001\u6210\u529F",
              response: {
                errcode: 0,
                errmsg: "ok",
                msgid: "MSGID" + Date.now()
              }
            }),
            { headers: { "Content-Type": "application/json" } }
          );
        } catch (error) {
          console.error("[\u7B2C\u4E09\u65B9API] \u53D1\u9001\u901A\u77E5\u5931\u8D25:", error);
          return new Response(
            JSON.stringify({
              message: "\u53D1\u9001\u5931\u8D25",
              response: {
                errcode: 1,
                errmsg: error.message
              }
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      }
    }
    return new Response(
      JSON.stringify({ success: false, message: "\u672A\u627E\u5230\u8BF7\u6C42\u7684\u8D44\u6E90" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }
};
function generateRandomSecret() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let result = "";
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
__name(generateRandomSecret, "generateRandomSecret");
async function getConfig(env) {
  try {
    if (!env.SUBSCRIPTIONS_KV) {
      console.error("[\u914D\u7F6E] KV\u5B58\u50A8\u672A\u7ED1\u5B9A");
      throw new Error("KV\u5B58\u50A8\u672A\u7ED1\u5B9A");
    }
    const data = await env.SUBSCRIPTIONS_KV.get("config");
    console.log("[\u914D\u7F6E] \u4ECEKV\u8BFB\u53D6\u914D\u7F6E:", data ? "\u6210\u529F" : "\u7A7A\u914D\u7F6E");
    const config = data ? JSON.parse(data) : {};
    let jwtSecret = config.JWT_SECRET;
    if (!jwtSecret || jwtSecret === "your-secret-key") {
      jwtSecret = generateRandomSecret();
      console.log("[\u914D\u7F6E] \u751F\u6210\u65B0\u7684JWT\u5BC6\u94A5");
      const updatedConfig = { ...config, JWT_SECRET: jwtSecret };
      await env.SUBSCRIPTIONS_KV.put("config", JSON.stringify(updatedConfig));
    }
    const finalConfig = {
      ADMIN_USERNAME: config.ADMIN_USERNAME || "admin",
      ADMIN_PASSWORD: config.ADMIN_PASSWORD || "password",
      JWT_SECRET: jwtSecret,
      TG_BOT_TOKEN: config.TG_BOT_TOKEN || "",
      TG_CHAT_ID: config.TG_CHAT_ID || "",
      NOTIFYX_API_KEY: config.NOTIFYX_API_KEY || "",
      WEBHOOK_URL: config.WEBHOOK_URL || "",
      WEBHOOK_METHOD: config.WEBHOOK_METHOD || "POST",
      WEBHOOK_HEADERS: config.WEBHOOK_HEADERS || "",
      WEBHOOK_TEMPLATE: config.WEBHOOK_TEMPLATE || "",
      SHOW_LUNAR: config.SHOW_LUNAR === true,
      WECHATBOT_WEBHOOK: config.WECHATBOT_WEBHOOK || "",
      WECHATBOT_MSG_TYPE: config.WECHATBOT_MSG_TYPE || "text",
      WECHATBOT_AT_MOBILES: config.WECHATBOT_AT_MOBILES || "",
      WECHATBOT_AT_ALL: config.WECHATBOT_AT_ALL || "false",
      RESEND_API_KEY: config.RESEND_API_KEY || "",
      EMAIL_FROM: config.EMAIL_FROM || "",
      EMAIL_FROM_NAME: config.EMAIL_FROM_NAME || "",
      EMAIL_TO: config.EMAIL_TO || "",
      ENABLED_NOTIFIERS: config.ENABLED_NOTIFIERS || ["notifyx"]
    };
    console.log("[\u914D\u7F6E] \u6700\u7EC8\u914D\u7F6E\u7528\u6237\u540D:", finalConfig.ADMIN_USERNAME);
    return finalConfig;
  } catch (error) {
    console.error("[\u914D\u7F6E] \u83B7\u53D6\u914D\u7F6E\u5931\u8D25:", error);
    const defaultJwtSecret = generateRandomSecret();
    return {
      ADMIN_USERNAME: "admin",
      ADMIN_PASSWORD: "password",
      JWT_SECRET: defaultJwtSecret,
      TG_BOT_TOKEN: "",
      TG_CHAT_ID: "",
      NOTIFYX_API_KEY: "",
      WEBHOOK_URL: "",
      WEBHOOK_METHOD: "POST",
      WEBHOOK_HEADERS: "",
      WEBHOOK_TEMPLATE: "",
      SHOW_LUNAR: true,
      WECHATBOT_WEBHOOK: "",
      WECHATBOT_MSG_TYPE: "text",
      WECHATBOT_AT_MOBILES: "",
      WECHATBOT_AT_ALL: "false",
      RESEND_API_KEY: "",
      EMAIL_FROM: "",
      EMAIL_FROM_NAME: "",
      EMAIL_TO: "",
      ENABLED_NOTIFIERS: ["notifyx"]
    };
  }
}
__name(getConfig, "getConfig");
async function generateJWT(username, secret) {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = { username, iat: Math.floor(Date.now() / 1e3) };
  const headerBase64 = btoa(JSON.stringify(header));
  const payloadBase64 = btoa(JSON.stringify(payload));
  const signatureInput = headerBase64 + "." + payloadBase64;
  const signature = await CryptoJS.HmacSHA256(signatureInput, secret);
  return headerBase64 + "." + payloadBase64 + "." + signature;
}
__name(generateJWT, "generateJWT");
async function verifyJWT(token, secret) {
  try {
    if (!token || !secret) {
      console.log("[JWT] Token\u6216Secret\u4E3A\u7A7A");
      return null;
    }
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.log("[JWT] Token\u683C\u5F0F\u9519\u8BEF\uFF0C\u90E8\u5206\u6570\u91CF:", parts.length);
      return null;
    }
    const [headerBase64, payloadBase64, signature] = parts;
    const signatureInput = headerBase64 + "." + payloadBase64;
    const expectedSignature = await CryptoJS.HmacSHA256(signatureInput, secret);
    if (signature !== expectedSignature) {
      console.log("[JWT] \u7B7E\u540D\u9A8C\u8BC1\u5931\u8D25");
      return null;
    }
    const payload = JSON.parse(atob(payloadBase64));
    console.log("[JWT] \u9A8C\u8BC1\u6210\u529F\uFF0C\u7528\u6237:", payload.username);
    return payload;
  } catch (error) {
    console.error("[JWT] \u9A8C\u8BC1\u8FC7\u7A0B\u51FA\u9519:", error);
    return null;
  }
}
__name(verifyJWT, "verifyJWT");
async function getAllSubscriptions(env) {
  try {
    console.log("[getAllSubscriptions] \u5F00\u59CB\u83B7\u53D6\u8BA2\u9605\u6570\u636E");
    if (!env.SUBSCRIPTIONS_KV) {
      console.error("[getAllSubscriptions] KV\u5B58\u50A8\u672A\u7ED1\u5B9A");
      throw new Error("KV\u5B58\u50A8\u672A\u7ED1\u5B9A");
    }
    const data = await env.SUBSCRIPTIONS_KV.get("subscriptions");
    console.log("[getAllSubscriptions] KV\u8FD4\u56DE\u6570\u636E:", data ? `\u6709\u6570\u636E (\u957F\u5EA6: ${data.length})` : "\u65E0\u6570\u636E");
    const subscriptions = data ? JSON.parse(data) : [];
    console.log("[getAllSubscriptions] \u89E3\u6790\u540E\u7684\u8BA2\u9605\u6570\u91CF:", subscriptions.length);
    return subscriptions;
  } catch (error) {
    console.error("[getAllSubscriptions] \u83B7\u53D6\u8BA2\u9605\u6570\u636E\u5931\u8D25:", error);
    throw error;
  }
}
__name(getAllSubscriptions, "getAllSubscriptions");
async function getSubscription(id, env) {
  const subscriptions = await getAllSubscriptions(env);
  return subscriptions.find((s) => s.id === id);
}
__name(getSubscription, "getSubscription");
async function createSubscription(subscription, env) {
  try {
    const subscriptions = await getAllSubscriptions(env);
    if (!subscription.name || !subscription.expiryDate) {
      return { success: false, message: "\u7F3A\u5C11\u5FC5\u586B\u5B57\u6BB5" };
    }
    let expiryDate = new Date(subscription.expiryDate);
    const now = /* @__PURE__ */ new Date();
    let useLunar = !!subscription.useLunar;
    if (useLunar) {
      let lunar = lunarCalendar.solar2lunar(
        expiryDate.getFullYear(),
        expiryDate.getMonth() + 1,
        expiryDate.getDate()
      );
      if (lunar && subscription.periodValue && subscription.periodUnit) {
        while (expiryDate <= now) {
          lunar = lunarBiz.addLunarPeriod(lunar, subscription.periodValue, subscription.periodUnit);
          const solar = lunarBiz.lunar2solar(lunar);
          expiryDate = new Date(solar.year, solar.month - 1, solar.day);
        }
        subscription.expiryDate = expiryDate.toISOString();
      }
    } else {
      if (expiryDate < now && subscription.periodValue && subscription.periodUnit) {
        while (expiryDate < now) {
          if (subscription.periodUnit === "day") {
            expiryDate.setDate(expiryDate.getDate() + subscription.periodValue);
          } else if (subscription.periodUnit === "month") {
            expiryDate.setMonth(expiryDate.getMonth() + subscription.periodValue);
          } else if (subscription.periodUnit === "year") {
            expiryDate.setFullYear(expiryDate.getFullYear() + subscription.periodValue);
          }
        }
        subscription.expiryDate = expiryDate.toISOString();
      }
    }
    const newSubscription = {
      id: Date.now().toString(),
      name: subscription.name,
      customType: subscription.customType || "",
      startDate: subscription.startDate || null,
      expiryDate: subscription.expiryDate,
      periodValue: subscription.periodValue || 1,
      periodUnit: subscription.periodUnit || "month",
      reminderDays: subscription.reminderDays !== void 0 ? subscription.reminderDays : 7,
      notes: subscription.notes || "",
      amount: subscription.amount || null,
      // 新增：金额字段
      currency: subscription.currency || "NTD",
      // 新增：货币字段，默认台币
      isActive: subscription.isActive !== false,
      autoRenew: subscription.autoRenew !== false,
      useLunar,
      // 新增
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    subscriptions.push(newSubscription);
    await env.SUBSCRIPTIONS_KV.put("subscriptions", JSON.stringify(subscriptions));
    return { success: true, subscription: newSubscription };
  } catch (error) {
    console.error("\u521B\u5EFA\u8BA2\u9605\u5F02\u5E38\uFF1A", error && error.stack ? error.stack : error);
    return { success: false, message: error && error.message ? error.message : "\u521B\u5EFA\u8BA2\u9605\u5931\u8D25" };
  }
}
__name(createSubscription, "createSubscription");
async function updateSubscription(id, subscription, env) {
  try {
    const subscriptions = await getAllSubscriptions(env);
    const index = subscriptions.findIndex((s) => s.id === id);
    if (index === -1) {
      return { success: false, message: "\u8BA2\u9605\u4E0D\u5B58\u5728" };
    }
    if (!subscription.name || !subscription.expiryDate) {
      return { success: false, message: "\u7F3A\u5C11\u5FC5\u586B\u5B57\u6BB5" };
    }
    let expiryDate = new Date(subscription.expiryDate);
    const now = /* @__PURE__ */ new Date();
    let useLunar = !!subscription.useLunar;
    if (useLunar) {
      let lunar = lunarCalendar.solar2lunar(
        expiryDate.getFullYear(),
        expiryDate.getMonth() + 1,
        expiryDate.getDate()
      );
      if (!lunar) {
        return { success: false, message: "\u519C\u5386\u65E5\u671F\u8D85\u51FA\u652F\u6301\u8303\u56F4\uFF081900-2100\u5E74\uFF09" };
      }
      if (lunar && expiryDate < now && subscription.periodValue && subscription.periodUnit) {
        do {
          lunar = lunarBiz.addLunarPeriod(lunar, subscription.periodValue, subscription.periodUnit);
          const solar = lunarBiz.lunar2solar(lunar);
          expiryDate = new Date(solar.year, solar.month - 1, solar.day);
        } while (expiryDate < now);
        subscription.expiryDate = expiryDate.toISOString();
      }
    } else {
      if (expiryDate < now && subscription.periodValue && subscription.periodUnit) {
        while (expiryDate < now) {
          if (subscription.periodUnit === "day") {
            expiryDate.setDate(expiryDate.getDate() + subscription.periodValue);
          } else if (subscription.periodUnit === "month") {
            expiryDate.setMonth(expiryDate.getMonth() + subscription.periodValue);
          } else if (subscription.periodUnit === "year") {
            expiryDate.setFullYear(expiryDate.getFullYear() + subscription.periodValue);
          }
        }
        subscription.expiryDate = expiryDate.toISOString();
      }
    }
    subscriptions[index] = {
      ...subscriptions[index],
      name: subscription.name,
      customType: subscription.customType || subscriptions[index].customType || "",
      startDate: subscription.startDate || subscriptions[index].startDate,
      expiryDate: subscription.expiryDate,
      periodValue: subscription.periodValue || subscriptions[index].periodValue || 1,
      periodUnit: subscription.periodUnit || subscriptions[index].periodUnit || "month",
      reminderDays: subscription.reminderDays !== void 0 ? subscription.reminderDays : subscriptions[index].reminderDays !== void 0 ? subscriptions[index].reminderDays : 7,
      notes: subscription.notes || "",
      amount: subscription.amount !== void 0 ? subscription.amount : subscriptions[index].amount,
      // 新增：金额字段
      currency: subscription.currency || subscriptions[index].currency || "NTD",
      // 新增：货币字段，默认台币
      isActive: subscription.isActive !== void 0 ? subscription.isActive : subscriptions[index].isActive,
      autoRenew: subscription.autoRenew !== void 0 ? subscription.autoRenew : subscriptions[index].autoRenew !== void 0 ? subscriptions[index].autoRenew : true,
      useLunar,
      // 新增
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    await env.SUBSCRIPTIONS_KV.put("subscriptions", JSON.stringify(subscriptions));
    return { success: true, subscription: subscriptions[index] };
  } catch (error) {
    return { success: false, message: "\u66F4\u65B0\u8BA2\u9605\u5931\u8D25" };
  }
}
__name(updateSubscription, "updateSubscription");
async function deleteSubscription(id, env) {
  try {
    const subscriptions = await getAllSubscriptions(env);
    const filteredSubscriptions = subscriptions.filter((s) => s.id !== id);
    if (filteredSubscriptions.length === subscriptions.length) {
      return { success: false, message: "\u8BA2\u9605\u4E0D\u5B58\u5728" };
    }
    await env.SUBSCRIPTIONS_KV.put("subscriptions", JSON.stringify(filteredSubscriptions));
    return { success: true };
  } catch (error) {
    return { success: false, message: "\u5220\u9664\u8BA2\u9605\u5931\u8D25" };
  }
}
__name(deleteSubscription, "deleteSubscription");
async function toggleSubscriptionStatus(id, isActive, env) {
  try {
    const subscriptions = await getAllSubscriptions(env);
    const index = subscriptions.findIndex((s) => s.id === id);
    if (index === -1) {
      return { success: false, message: "\u8BA2\u9605\u4E0D\u5B58\u5728" };
    }
    subscriptions[index] = {
      ...subscriptions[index],
      isActive,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    await env.SUBSCRIPTIONS_KV.put("subscriptions", JSON.stringify(subscriptions));
    return { success: true, subscription: subscriptions[index] };
  } catch (error) {
    return { success: false, message: "\u66F4\u65B0\u8BA2\u9605\u72B6\u6001\u5931\u8D25" };
  }
}
__name(toggleSubscriptionStatus, "toggleSubscriptionStatus");
async function testSingleSubscriptionNotification(id, env) {
  try {
    const subscription = await getSubscription(id, env);
    if (!subscription) {
      return { success: false, message: "\u672A\u627E\u5230\u8BE5\u8BA2\u9605" };
    }
    const config = await getConfig(env);
    const title = `\u624B\u52A8\u6D4B\u8BD5\u901A\u77E5: ${subscription.name}`;
    const showLunar = config.SHOW_LUNAR === true;
    let lunarExpiryText = "";
    if (showLunar) {
      const expiryDateObj = new Date(subscription.expiryDate);
      const lunarExpiry = lunarCalendar.solar2lunar(expiryDateObj.getFullYear(), expiryDateObj.getMonth() + 1, expiryDateObj.getDate());
      lunarExpiryText = lunarExpiry ? ` (\u519C\u5386: ${lunarExpiry.fullStr})` : "";
    }
    const commonContent = `**\u8BA2\u9605\u8BE6\u60C5**:
- **\u7C7B\u578B**: ${subscription.customType || "\u5176\u4ED6"}
- **\u5230\u671F\u65E5**: ${formatBeijingTime(new Date(subscription.expiryDate), "date")}${lunarExpiryText}
- **\u5907\u6CE8**: ${subscription.notes || "\u65E0"}`;
    await sendNotificationToAllChannels(title, commonContent, config, "[\u624B\u52A8\u6D4B\u8BD5]");
    return { success: true, message: "\u6D4B\u8BD5\u901A\u77E5\u5DF2\u53D1\u9001\u5230\u6240\u6709\u542F\u7528\u7684\u6E20\u9053" };
  } catch (error) {
    console.error("[\u624B\u52A8\u6D4B\u8BD5] \u53D1\u9001\u5931\u8D25:", error);
    return { success: false, message: "\u53D1\u9001\u65F6\u53D1\u751F\u9519\u8BEF: " + error.message };
  }
}
__name(testSingleSubscriptionNotification, "testSingleSubscriptionNotification");
async function sendWebhookNotification(title, content, config) {
  try {
    if (!config.WEBHOOK_URL) {
      console.error("[\u4F01\u4E1A\u5FAE\u4FE1\u5E94\u7528\u901A\u77E5] \u901A\u77E5\u672A\u914D\u7F6E\uFF0C\u7F3A\u5C11URL");
      return false;
    }
    console.log("[\u4F01\u4E1A\u5FAE\u4FE1\u5E94\u7528\u901A\u77E5] \u5F00\u59CB\u53D1\u9001\u901A\u77E5\u5230: " + config.WEBHOOK_URL);
    const timestamp = formatBeijingTime(/* @__PURE__ */ new Date(), "datetime");
    let requestBody;
    let headers = { "Content-Type": "application/json" };
    if (config.WEBHOOK_HEADERS) {
      try {
        const customHeaders = JSON.parse(config.WEBHOOK_HEADERS);
        headers = { ...headers, ...customHeaders };
      } catch (error) {
        console.warn("[\u4F01\u4E1A\u5FAE\u4FE1\u5E94\u7528\u901A\u77E5] \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5934\u683C\u5F0F\u9519\u8BEF\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u8BF7\u6C42\u5934");
      }
    }
    if (config.WEBHOOK_TEMPLATE) {
      try {
        const template = JSON.parse(config.WEBHOOK_TEMPLATE);
        requestBody = JSON.stringify(template).replace(/\{\{title\}\}/g, title).replace(/\{\{content\}\}/g, content).replace(/\{\{timestamp\}\}/g, timestamp);
        requestBody = JSON.parse(requestBody);
      } catch (error) {
        console.warn("[\u4F01\u4E1A\u5FAE\u4FE1\u5E94\u7528\u901A\u77E5] \u6D88\u606F\u6A21\u677F\u683C\u5F0F\u9519\u8BEF\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u683C\u5F0F");
        requestBody = { title, content, timestamp };
      }
    } else {
      requestBody = { title, content, timestamp };
    }
    const response = await fetch(config.WEBHOOK_URL, {
      method: config.WEBHOOK_METHOD || "POST",
      headers,
      body: JSON.stringify(requestBody)
    });
    const result = await response.text();
    console.log("[\u4F01\u4E1A\u5FAE\u4FE1\u5E94\u7528\u901A\u77E5] \u53D1\u9001\u7ED3\u679C:", response.status, result);
    return response.ok;
  } catch (error) {
    console.error("[\u4F01\u4E1A\u5FAE\u4FE1\u5E94\u7528\u901A\u77E5] \u53D1\u9001\u901A\u77E5\u5931\u8D25:", error);
    return false;
  }
}
__name(sendWebhookNotification, "sendWebhookNotification");
async function sendWeComNotification(message, config) {
  console.log("[\u4F01\u4E1A\u5FAE\u4FE1] \u901A\u77E5\u529F\u80FD\u672A\u5B9E\u73B0");
  return { success: false, message: "\u4F01\u4E1A\u5FAE\u4FE1\u901A\u77E5\u529F\u80FD\u672A\u5B9E\u73B0" };
}
__name(sendWeComNotification, "sendWeComNotification");
async function sendWechatBotNotification(title, content, config) {
  try {
    if (!config.WECHATBOT_WEBHOOK) {
      console.error("[\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA] \u901A\u77E5\u672A\u914D\u7F6E\uFF0C\u7F3A\u5C11Webhook URL");
      return false;
    }
    console.log("[\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA] \u5F00\u59CB\u53D1\u9001\u901A\u77E5\u5230: " + config.WECHATBOT_WEBHOOK);
    let messageData;
    const msgType = config.WECHATBOT_MSG_TYPE || "text";
    if (msgType === "markdown") {
      const markdownContent = `# ${title}

${content}`;
      messageData = {
        msgtype: "markdown",
        markdown: {
          content: markdownContent
        }
      };
    } else {
      const textContent = `${title}

${content}`;
      messageData = {
        msgtype: "text",
        text: {
          content: textContent
        }
      };
    }
    if (config.WECHATBOT_AT_ALL === "true") {
      if (msgType === "text") {
        messageData.text.mentioned_list = ["@all"];
      }
    } else if (config.WECHATBOT_AT_MOBILES) {
      const mobiles = config.WECHATBOT_AT_MOBILES.split(",").map((m) => m.trim()).filter((m) => m);
      if (mobiles.length > 0) {
        if (msgType === "text") {
          messageData.text.mentioned_mobile_list = mobiles;
        }
      }
    }
    console.log("[\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA] \u53D1\u9001\u6D88\u606F\u6570\u636E:", JSON.stringify(messageData, null, 2));
    const response = await fetch(config.WECHATBOT_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messageData)
    });
    const responseText = await response.text();
    console.log("[\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA] \u54CD\u5E94\u72B6\u6001:", response.status);
    console.log("[\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA] \u54CD\u5E94\u5185\u5BB9:", responseText);
    if (response.ok) {
      try {
        const result = JSON.parse(responseText);
        if (result.errcode === 0) {
          console.log("[\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA] \u901A\u77E5\u53D1\u9001\u6210\u529F");
          return true;
        } else {
          console.error("[\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA] \u53D1\u9001\u5931\u8D25\uFF0C\u9519\u8BEF\u7801:", result.errcode, "\u9519\u8BEF\u4FE1\u606F:", result.errmsg);
          return false;
        }
      } catch (parseError) {
        console.error("[\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA] \u89E3\u6790\u54CD\u5E94\u5931\u8D25:", parseError);
        return false;
      }
    } else {
      console.error("[\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA] HTTP\u8BF7\u6C42\u5931\u8D25\uFF0C\u72B6\u6001\u7801:", response.status);
      return false;
    }
  } catch (error) {
    console.error("[\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA] \u53D1\u9001\u901A\u77E5\u5931\u8D25:", error);
    return false;
  }
}
__name(sendWechatBotNotification, "sendWechatBotNotification");
async function sendNotificationToAllChannels(title, commonContent, config, logPrefix = "[\u5B9A\u65F6\u4EFB\u52A1]") {
  if (!config.ENABLED_NOTIFIERS || config.ENABLED_NOTIFIERS.length === 0) {
    console.log(`${logPrefix} \u672A\u542F\u7528\u4EFB\u4F55\u901A\u77E5\u6E20\u9053\u3002`);
    return;
  }
  if (config.ENABLED_NOTIFIERS.includes("notifyx")) {
    const notifyxContent = `## ${title}

${commonContent}`;
    const success = await sendNotifyXNotification(title, notifyxContent, `\u8BA2\u9605\u63D0\u9192`, config);
    console.log(`${logPrefix} \u53D1\u9001NotifyX\u901A\u77E5 ${success ? "\u6210\u529F" : "\u5931\u8D25"}`);
  }
  if (config.ENABLED_NOTIFIERS.includes("telegram")) {
    const telegramContent = `*${title}*

${commonContent.replace(/(\s)/g, " ")}`;
    const success = await sendTelegramNotification(telegramContent, config);
    console.log(`${logPrefix} \u53D1\u9001Telegram\u901A\u77E5 ${success ? "\u6210\u529F" : "\u5931\u8D25"}`);
  }
  if (config.ENABLED_NOTIFIERS.includes("webhook")) {
    const webhookContent = commonContent.replace(/(\**|\*|##|#|`)/g, "");
    const success = await sendWebhookNotification(title, webhookContent, config);
    console.log(`${logPrefix} \u53D1\u9001\u4F01\u4E1A\u5FAE\u4FE1\u5E94\u7528\u901A\u77E5 ${success ? "\u6210\u529F" : "\u5931\u8D25"}`);
  }
  if (config.ENABLED_NOTIFIERS.includes("wechatbot")) {
    const wechatbotContent = commonContent.replace(/(\**|\*|##|#|`)/g, "");
    const success = await sendWechatBotNotification(title, wechatbotContent, config);
    console.log(`${logPrefix} \u53D1\u9001\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA\u901A\u77E5 ${success ? "\u6210\u529F" : "\u5931\u8D25"}`);
  }
  if (config.ENABLED_NOTIFIERS.includes("weixin")) {
    const weixinContent = `\u3010${title}\u3011

${commonContent.replace(/(\**|\*|##|#|`)/g, "")}`;
    const result = await sendWeComNotification(weixinContent, config);
    console.log(`${logPrefix} \u53D1\u9001\u4F01\u4E1A\u5FAE\u4FE1\u901A\u77E5 ${result.success ? "\u6210\u529F" : "\u5931\u8D25"}. ${result.message}`);
  }
  if (config.ENABLED_NOTIFIERS.includes("email")) {
    const emailContent = commonContent.replace(/(\**|\*|##|#|`)/g, "");
    const success = await sendEmailNotification(title, emailContent, config);
    console.log(`${logPrefix} \u53D1\u9001\u90AE\u4EF6\u901A\u77E5 ${success ? "\u6210\u529F" : "\u5931\u8D25"}`);
  }
}
__name(sendNotificationToAllChannels, "sendNotificationToAllChannels");
async function sendTelegramNotification(message, config) {
  try {
    if (!config.TG_BOT_TOKEN || !config.TG_CHAT_ID) {
      console.error("[Telegram] \u901A\u77E5\u672A\u914D\u7F6E\uFF0C\u7F3A\u5C11Bot Token\u6216Chat ID");
      return false;
    }
    console.log("[Telegram] \u5F00\u59CB\u53D1\u9001\u901A\u77E5\u5230 Chat ID: " + config.TG_CHAT_ID);
    const url = "https://api.telegram.org/bot" + config.TG_BOT_TOKEN + "/sendMessage";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: config.TG_CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      })
    });
    const result = await response.json();
    console.log("[Telegram] \u53D1\u9001\u7ED3\u679C:", result);
    return result.ok;
  } catch (error) {
    console.error("[Telegram] \u53D1\u9001\u901A\u77E5\u5931\u8D25:", error);
    return false;
  }
}
__name(sendTelegramNotification, "sendTelegramNotification");
async function sendNotifyXNotification(title, content, description, config) {
  try {
    if (!config.NOTIFYX_API_KEY) {
      console.error("[NotifyX] \u901A\u77E5\u672A\u914D\u7F6E\uFF0C\u7F3A\u5C11API Key");
      return false;
    }
    console.log("[NotifyX] \u5F00\u59CB\u53D1\u9001\u901A\u77E5: " + title);
    const url = "https://www.notifyx.cn/api/v1/send/" + config.NOTIFYX_API_KEY;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        description: description || ""
      })
    });
    const result = await response.json();
    console.log("[NotifyX] \u53D1\u9001\u7ED3\u679C:", result);
    return result.status === "queued";
  } catch (error) {
    console.error("[NotifyX] \u53D1\u9001\u901A\u77E5\u5931\u8D25:", error);
    return false;
  }
}
__name(sendNotifyXNotification, "sendNotifyXNotification");
async function sendEmailNotification(title, content, config) {
  try {
    if (!config.RESEND_API_KEY || !config.EMAIL_FROM || !config.EMAIL_TO) {
      console.error("[\u90AE\u4EF6\u901A\u77E5] \u901A\u77E5\u672A\u914D\u7F6E\uFF0C\u7F3A\u5C11\u5FC5\u8981\u53C2\u6570");
      return false;
    }
    console.log("[\u90AE\u4EF6\u901A\u77E5] \u5F00\u59CB\u53D1\u9001\u90AE\u4EF6\u5230: " + config.EMAIL_TO);
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 24px; }
        .content { padding: 30px 20px; }
        .content h2 { color: #333; margin-top: 0; }
        .content p { color: #666; line-height: 1.6; margin: 16px 0; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .highlight { background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>\u{1F4C5} ${title}</h1>
        </div>
        <div class="content">
            <div class="highlight">
                ${content.replace(/\n/g, "<br>")}
            </div>
            <p>\u6B64\u90AE\u4EF6\u7531\u8BA2\u9605\u7BA1\u7406\u7CFB\u7EDF\u81EA\u52A8\u53D1\u9001\uFF0C\u8BF7\u53CA\u65F6\u5904\u7406\u76F8\u5173\u8BA2\u9605\u4E8B\u52A1\u3002</p>
        </div>
        <div class="footer">
            <p>\u8BA2\u9605\u7BA1\u7406\u7CFB\u7EDF | \u53D1\u9001\u65F6\u95F4: ${formatBeijingTime()}</p>
        </div>
    </div>
</body>
</html>`;
    const fromEmail = config.EMAIL_FROM_NAME ? `${config.EMAIL_FROM_NAME} <${config.EMAIL_FROM}>` : config.EMAIL_FROM;
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${config.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: config.EMAIL_TO,
        subject: title,
        html: htmlContent,
        text: content
        // 纯文本备用
      })
    });
    const result = await response.json();
    console.log("[\u90AE\u4EF6\u901A\u77E5] \u53D1\u9001\u7ED3\u679C:", response.status, result);
    if (response.ok && result.id) {
      console.log("[\u90AE\u4EF6\u901A\u77E5] \u90AE\u4EF6\u53D1\u9001\u6210\u529F\uFF0CID:", result.id);
      return true;
    } else {
      console.error("[\u90AE\u4EF6\u901A\u77E5] \u90AE\u4EF6\u53D1\u9001\u5931\u8D25:", result);
      return false;
    }
  } catch (error) {
    console.error("[\u90AE\u4EF6\u901A\u77E5] \u53D1\u9001\u90AE\u4EF6\u5931\u8D25:", error);
    return false;
  }
}
__name(sendEmailNotification, "sendEmailNotification");
async function checkExpiringSubscriptions(env) {
  try {
    const now = /* @__PURE__ */ new Date();
    const beijingTime = new Date(now.getTime() + 8 * 60 * 60 * 1e3);
    console.log("[\u5B9A\u65F6\u4EFB\u52A1] \u5F00\u59CB\u68C0\u67E5\u5373\u5C06\u5230\u671F\u7684\u8BA2\u9605 UTC: " + now.toISOString() + ", \u5317\u4EAC\u65F6\u95F4: " + beijingTime.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }));
    const subscriptions = await getAllSubscriptions(env);
    console.log("[\u5B9A\u65F6\u4EFB\u52A1] \u5171\u627E\u5230 " + subscriptions.length + " \u4E2A\u8BA2\u9605");
    const config = await getConfig(env);
    const expiringSubscriptions = [];
    const updatedSubscriptions = [];
    let hasUpdates = false;
    for (const subscription of subscriptions) {
      if (subscription.isActive === false) {
        console.log('[\u5B9A\u65F6\u4EFB\u52A1] \u8BA2\u9605 "' + subscription.name + '" \u5DF2\u505C\u7528\uFF0C\u8DF3\u8FC7');
        continue;
      }
      let daysDiff;
      if (subscription.useLunar) {
        const expiryDate = new Date(subscription.expiryDate);
        let lunar = lunarCalendar.solar2lunar(
          expiryDate.getFullYear(),
          expiryDate.getMonth() + 1,
          expiryDate.getDate()
        );
        daysDiff = lunarBiz.daysToLunar(lunar);
        console.log('[\u5B9A\u65F6\u4EFB\u52A1] \u8BA2\u9605 "' + subscription.name + '" \u5230\u671F\u65E5\u671F: ' + expiryDate.toISOString() + ", \u5269\u4F59\u5929\u6570: " + daysDiff);
        if (daysDiff < 0 && subscription.periodValue && subscription.periodUnit && subscription.autoRenew !== false) {
          let nextLunar = lunar;
          do {
            nextLunar = lunarBiz.addLunarPeriod(nextLunar, subscription.periodValue, subscription.periodUnit);
            const solar = lunarBiz.lunar2solar(nextLunar);
            var newExpiryDate = new Date(solar.year, solar.month - 1, solar.day);
            daysDiff = lunarBiz.daysToLunar(nextLunar);
            console.log('[\u5B9A\u65F6\u4EFB\u52A1] \u8BA2\u9605 "' + subscription.name + '" \u66F4\u65B0\u5230\u671F\u65E5\u671F: ' + newExpiryDate.toISOString() + ", \u5269\u4F59\u5929\u6570: " + daysDiff);
          } while (daysDiff < 0);
          const updatedSubscription = { ...subscription, expiryDate: newExpiryDate.toISOString() };
          updatedSubscriptions.push(updatedSubscription);
          hasUpdates = true;
          let reminderDays2 = subscription.reminderDays !== void 0 ? subscription.reminderDays : 7;
          let shouldRemindAfterRenewal = false;
          if (reminderDays2 === 0) {
            shouldRemindAfterRenewal = daysDiff === 0;
          } else {
            shouldRemindAfterRenewal = daysDiff >= 0 && daysDiff <= reminderDays2;
          }
          if (shouldRemindAfterRenewal) {
            console.log('[\u5B9A\u65F6\u4EFB\u52A1] \u8BA2\u9605 "' + subscription.name + '" \u5728\u63D0\u9192\u8303\u56F4\u5185\uFF0C\u5C06\u53D1\u9001\u901A\u77E5');
            expiringSubscriptions.push({
              ...updatedSubscription,
              daysRemaining: daysDiff
            });
          }
          continue;
        }
      } else {
        const expiryDate = new Date(subscription.expiryDate);
        daysDiff = Math.ceil((expiryDate - now) / (1e3 * 60 * 60 * 24));
        console.log('[\u5B9A\u65F6\u4EFB\u52A1] \u8BA2\u9605 "' + subscription.name + '" \u5230\u671F\u65E5\u671F: ' + expiryDate.toISOString() + ", \u5269\u4F59\u5929\u6570: " + daysDiff);
        if (daysDiff < 0 && subscription.periodValue && subscription.periodUnit && subscription.autoRenew !== false) {
          const newExpiryDate2 = new Date(expiryDate);
          if (subscription.periodUnit === "day") {
            newExpiryDate2.setDate(expiryDate.getDate() + subscription.periodValue);
          } else if (subscription.periodUnit === "month") {
            newExpiryDate2.setMonth(expiryDate.getMonth() + subscription.periodValue);
          } else if (subscription.periodUnit === "year") {
            newExpiryDate2.setFullYear(expiryDate.getFullYear() + subscription.periodValue);
          }
          while (newExpiryDate2 < now) {
            console.log("[\u5B9A\u65F6\u4EFB\u52A1] \u65B0\u8BA1\u7B97\u7684\u5230\u671F\u65E5\u671F " + newExpiryDate2.toISOString() + " \u4ECD\u7136\u8FC7\u671F\uFF0C\u7EE7\u7EED\u8BA1\u7B97\u4E0B\u4E00\u4E2A\u5468\u671F");
            if (subscription.periodUnit === "day") {
              newExpiryDate2.setDate(newExpiryDate2.getDate() + subscription.periodValue);
            } else if (subscription.periodUnit === "month") {
              newExpiryDate2.setMonth(newExpiryDate2.getMonth() + subscription.periodValue);
            } else if (subscription.periodUnit === "year") {
              newExpiryDate2.setFullYear(newExpiryDate2.getFullYear() + subscription.periodValue);
            }
          }
          console.log('[\u5B9A\u65F6\u4EFB\u52A1] \u8BA2\u9605 "' + subscription.name + '" \u66F4\u65B0\u5230\u671F\u65E5\u671F: ' + newExpiryDate2.toISOString());
          const updatedSubscription = { ...subscription, expiryDate: newExpiryDate2.toISOString() };
          updatedSubscriptions.push(updatedSubscription);
          hasUpdates = true;
          const newDaysDiff = Math.ceil((newExpiryDate2 - now) / (1e3 * 60 * 60 * 24));
          let reminderDays2 = subscription.reminderDays !== void 0 ? subscription.reminderDays : 7;
          let shouldRemindAfterRenewal = false;
          if (reminderDays2 === 0) {
            shouldRemindAfterRenewal = newDaysDiff === 0;
          } else {
            shouldRemindAfterRenewal = newDaysDiff >= 0 && newDaysDiff <= reminderDays2;
          }
          if (shouldRemindAfterRenewal) {
            console.log('[\u5B9A\u65F6\u4EFB\u52A1] \u8BA2\u9605 "' + subscription.name + '" \u5728\u63D0\u9192\u8303\u56F4\u5185\uFF0C\u5C06\u53D1\u9001\u901A\u77E5');
            expiringSubscriptions.push({
              ...updatedSubscription,
              daysRemaining: newDaysDiff
            });
          }
          continue;
        }
      }
      const reminderDays = subscription.reminderDays !== void 0 ? subscription.reminderDays : 7;
      let shouldRemind = false;
      if (reminderDays === 0) {
        shouldRemind = daysDiff === 0;
      } else {
        shouldRemind = daysDiff >= 0 && daysDiff <= reminderDays;
      }
      if (daysDiff < 0 && subscription.autoRenew === false) {
        console.log('[\u5B9A\u65F6\u4EFB\u52A1] \u8BA2\u9605 "' + subscription.name + '" \u5DF2\u8FC7\u671F\u4E14\u672A\u542F\u7528\u81EA\u52A8\u7EED\u8BA2\uFF0C\u5C06\u53D1\u9001\u8FC7\u671F\u901A\u77E5');
        expiringSubscriptions.push({
          ...subscription,
          daysRemaining: daysDiff
        });
      } else if (shouldRemind) {
        console.log('[\u5B9A\u65F6\u4EFB\u52A1] \u8BA2\u9605 "' + subscription.name + '" \u5728\u63D0\u9192\u8303\u56F4\u5185\uFF0C\u5C06\u53D1\u9001\u901A\u77E5');
        expiringSubscriptions.push({
          ...subscription,
          daysRemaining: daysDiff
        });
      }
    }
    if (hasUpdates) {
      const mergedSubscriptions = subscriptions.map((sub) => {
        const updated = updatedSubscriptions.find((u) => u.id === sub.id);
        return updated || sub;
      });
      await env.SUBSCRIPTIONS_KV.put("subscriptions", JSON.stringify(mergedSubscriptions));
    }
    if (expiringSubscriptions.length > 0) {
      let commonContent = "";
      expiringSubscriptions.sort((a, b) => a.daysRemaining - b.daysRemaining);
      const showLunar = config.SHOW_LUNAR === true;
      for (const sub of expiringSubscriptions) {
        const typeText = sub.customType || "\u5176\u4ED6";
        const periodText = sub.periodValue && sub.periodUnit ? `(\u5468\u671F: ${sub.periodValue} ${{ day: "\u5929", month: "\u6708", year: "\u5E74" }[sub.periodUnit] || sub.periodUnit})` : "";
        let lunarExpiryText = "";
        if (showLunar) {
          const expiryDateObj = new Date(sub.expiryDate);
          const lunarExpiry = lunarCalendar.solar2lunar(expiryDateObj.getFullYear(), expiryDateObj.getMonth() + 1, expiryDateObj.getDate());
          lunarExpiryText = lunarExpiry ? ` (\u519C\u5386: ${lunarExpiry.fullStr})` : "";
        }
        let statusText;
        if (sub.daysRemaining === 0) statusText = `\u26A0\uFE0F **${sub.name}** (${typeText}) ${periodText} \u4ECA\u5929\u5230\u671F\uFF01${lunarExpiryText}`;
        else if (sub.daysRemaining < 0) statusText = `\u{1F6A8} **${sub.name}** (${typeText}) ${periodText} \u5DF2\u8FC7\u671F ${Math.abs(sub.daysRemaining)} \u5929${lunarExpiryText}`;
        else statusText = `\u{1F4C5} **${sub.name}** (${typeText}) ${periodText} \u5C06\u5728 ${sub.daysRemaining} \u5929\u540E\u5230\u671F${lunarExpiryText}`;
        if (sub.notes) statusText += `
   \u5907\u6CE8: ${sub.notes}`;
        commonContent += statusText + "\n\n";
      }
      const title = "\u8BA2\u9605\u5230\u671F\u63D0\u9192";
      await sendNotificationToAllChannels(title, commonContent, config, "[\u5B9A\u65F6\u4EFB\u52A1]");
    }
  } catch (error) {
    console.error("[\u5B9A\u65F6\u4EFB\u52A1] \u68C0\u67E5\u5373\u5C06\u5230\u671F\u7684\u8BA2\u9605\u5931\u8D25:", error);
  }
}
__name(checkExpiringSubscriptions, "checkExpiringSubscriptions");
function getCookieValue(cookieString, key) {
  if (!cookieString) return null;
  const match = cookieString.match(new RegExp("(^| )" + key + "=([^;]+)"));
  return match ? match[2] : null;
}
__name(getCookieValue, "getCookieValue");
async function handleRequest(request, env, ctx) {
  return new Response(loginPage, {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}
__name(handleRequest, "handleRequest");
var CryptoJS = {
  HmacSHA256: /* @__PURE__ */ __name(function(message, key) {
    const keyData = new TextEncoder().encode(key);
    const messageData = new TextEncoder().encode(message);
    return Promise.resolve().then(() => {
      return crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: { name: "SHA-256" } },
        false,
        ["sign"]
      );
    }).then((cryptoKey) => {
      return crypto.subtle.sign(
        "HMAC",
        cryptoKey,
        messageData
      );
    }).then((buffer) => {
      const hashArray = Array.from(new Uint8Array(buffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    });
  }, "HmacSHA256")
};
var index_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/debug") {
      try {
        const config = await getConfig(env);
        const debugInfo = {
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          pathname: url.pathname,
          kvBinding: !!env.SUBSCRIPTIONS_KV,
          configExists: !!config,
          adminUsername: config.ADMIN_USERNAME,
          hasJwtSecret: !!config.JWT_SECRET,
          jwtSecretLength: config.JWT_SECRET ? config.JWT_SECRET.length : 0
        };
        return new Response(`
<!DOCTYPE html>
<html>
<head>
  <title>\u8C03\u8BD5\u4FE1\u606F</title>
  <style>
    body { font-family: monospace; padding: 20px; background: #f5f5f5; }
    .info { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
    .success { color: green; }
    .error { color: red; }
  </style>
</head>
<body>
  <h1>\u7CFB\u7EDF\u8C03\u8BD5\u4FE1\u606F</h1>
  <div class="info">
    <h3>\u57FA\u672C\u4FE1\u606F</h3>
    <p>\u65F6\u95F4: ${debugInfo.timestamp}</p>
    <p>\u8DEF\u5F84: ${debugInfo.pathname}</p>
    <p class="${debugInfo.kvBinding ? "success" : "error"}">KV\u7ED1\u5B9A: ${debugInfo.kvBinding ? "\u2713" : "\u2717"}</p>
  </div>

  <div class="info">
    <h3>\u914D\u7F6E\u4FE1\u606F</h3>
    <p class="${debugInfo.configExists ? "success" : "error"}">\u914D\u7F6E\u5B58\u5728: ${debugInfo.configExists ? "\u2713" : "\u2717"}</p>
    <p>\u7BA1\u7406\u5458\u7528\u6237\u540D: ${debugInfo.adminUsername}</p>
    <p class="${debugInfo.hasJwtSecret ? "success" : "error"}">JWT\u5BC6\u94A5: ${debugInfo.hasJwtSecret ? "\u2713" : "\u2717"} (\u957F\u5EA6: ${debugInfo.jwtSecretLength})</p>
  </div>

  <div class="info">
    <h3>\u89E3\u51B3\u65B9\u6848</h3>
    <p>1. \u786E\u4FDDKV\u547D\u540D\u7A7A\u95F4\u5DF2\u6B63\u786E\u7ED1\u5B9A\u4E3A SUBSCRIPTIONS_KV</p>
    <p>2. \u5C1D\u8BD5\u8BBF\u95EE <a href="/">/</a> \u8FDB\u884C\u767B\u5F55</p>
    <p>3. \u5982\u679C\u4ECD\u6709\u95EE\u9898\uFF0C\u8BF7\u68C0\u67E5Cloudflare Workers\u65E5\u5FD7</p>
  </div>
</body>
</html>`, {
          headers: { "Content-Type": "text/html; charset=utf-8" }
        });
      } catch (error) {
        return new Response(`\u8C03\u8BD5\u9875\u9762\u9519\u8BEF: ${error.message}`, {
          status: 500,
          headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
      }
    }
    if (url.pathname.startsWith("/api")) {
      return api.handleRequest(request, env, ctx);
    } else if (url.pathname.startsWith("/admin")) {
      return admin.handleRequest(request, env, ctx);
    } else {
      return handleRequest(request, env, ctx);
    }
  },
  async scheduled(event, env, ctx) {
    const now = /* @__PURE__ */ new Date();
    const beijingTime = new Date(now.getTime() + 8 * 60 * 60 * 1e3);
    console.log("[Workers] \u5B9A\u65F6\u4EFB\u52A1\u89E6\u53D1 UTC:", now.toISOString(), "\u5317\u4EAC\u65F6\u95F4:", beijingTime.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }));
    await checkExpiringSubscriptions(env);
  }
};

// ../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-Ax5670/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = index_default;

// ../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-Ax5670/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
