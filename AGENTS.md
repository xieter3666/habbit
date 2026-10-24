# AGENTS.md · 不止日常 (Buzhi Daily) 开发规范与智能体协作指南

> 本指南为本项目（不止日常 / buzhidaily）的智能体 (AI Agents) 及开发者的核心协作与代码质量规范。所有在此代码库工作的 AI 助手必须严格遵守以下准则。

---

## 1. 核心智能体协作原则 (Agent Behavior Directives)

- **保真与工程稳健优先**：小程序界面需严格还原设计美学与温情治愈质感，代码改动追求优雅、健壮、模块化。
- **改动最小化与原子化**：仅针对需求目标进行精准变更，严禁破坏性重构；除非用户明确要求，必须完整保留无关代码、注释和 JSDoc。
- **自闭环验证**：执行代码改动后，必须校验语法合法性、依赖完整性以及小程序配置文件（`app.json`, `project.config.json` 等）一致性。

---

## 2. Chrome 浏览器与自动化连接规范 (Browser Automation Spec)

> **最高优先级规则**：后续所有涉及浏览器自动化、网页操作、`chrome-devtools` MCP 调用均需遵循此模式。

1. **复用用户主浏览器实例**：
   - **严禁** 启动独立的临时开发者浏览器。
   - **严禁** 使用临时 `--user-data-dir` 隔离沙盒实例。
   - 必须复用用户日常登录并操作的 Chrome 主实例（复用用户已登录的账号、GitHub / 微信开放平台凭据、Cookie 与本地数据）。

2. **远程调试端口启动模式**：
   - Chrome 启动时必须附加远程调试参数：
     ```bash
     chrome.exe --remote-debugging-port=9222
     ```
   - 自动化流程必须连接到 `http://127.0.0.1:9222` 长链接进行通信。

3. **`chrome-devtools` MCP 配置标准**：
   - MCP 服务端必须使用 `--browserUrl=http://127.0.0.1:9222`，配置文件位于 `~/.gemini/config/mcp_config.json`：
     ```json
     {
       "mcpServers": {
         "chrome-devtools": {
           "command": "C:\\Program Files\\nodejs\\node.exe",
           "args": [
             "C:\\Users\\11363\\AppData\\Roaming\\npm\\node_modules\\chrome-devtools-mcp\\build\\src\\bin\\chrome-devtools-mcp.js",
             "--browserUrl=http://127.0.0.1:9222"
           ]
         }
       }
     }
     ```

4. **自动化脚本直连规范**：
   - 任何 Node.js / Python 脚本或自动化程序直接对接 `ws://127.0.0.1:9222/devtools/...` 或使用 Puppeteer / Playwright 的 `connectOverCDP({ endpointURL: 'http://127.0.0.1:9222' })`，严禁执行 `launch()` 新建实例。

---

## 3. 微信小程序卓越性能与架构规范 (Mini Program Best Practices)

### 3.1 `setData` 极致性能法则
- **渲染数据与逻辑数据严格隔离**：
  - 仅影响 WXML 视图渲染的数据才放入 `data` / `setData`。
  - 计时器 ID、临时计算标记、全局订阅实例等纯逻辑变量，直接挂载到 Page/Component 实例上（例如 `this.timerId = null`），严禁写入 `data`。
- **细粒度键路径增量更新 (Path Updating)**：
  - 严禁全量重置大型列表或嵌套对象。必须采用增量路径更新：
    ```javascript
    // 推荐：仅更新变更字段
    this.setData({
      [`taskList[${index}].completed`]: true,
      [`taskList[${index}].reward`]: 10
    });
    ```
- **频次节流与合并调用**：
  - 单次事件循环内合并多个 `setData` 调用。
  - 严禁在 `onPageScroll`、`touchmove` 或高频动画回调中调用无节流的 `setData`（使用 WXS 处理手势与基础动效）。
  - 单次 `setData` 数据量严格控制在 256KB 以内。

### 3.2 包体积与静态资产优化
- **主包严控 < 2MB**：
  - 保持主包轻量，非首屏核心业务逻辑逐步规划分包加载（`subpackages`）。
- **静态资源分级管理**：
  - 本地图标与切图必须经过无损压缩（TinyPNG / WebP），避免引入未经裁剪的大尺寸原图。
  - 大于 100KB 的背景全景图、多状态贴纸图集、音效媒体资源优先托管于微信云存储 CDN，通过云文件 ID 或 CDN URL 加载。

### 3.3 WXML / WXSS 渲染层调优
- **DOM 树轻量化**：
  - 节点嵌套层级控制在 32 层以内，单个页面 DOM 节点总数控制在 1000 以内。
  - 列表渲染必须显式声明唯一有效的 `wx:key`（严禁无理由使用 `wx:key="*this"` 或无 key）。
- **响应式布局规范**：
  - 核心排版采用 `rpx` 单位与 Flexbox / Grid 布局，适配不同屏幕比例与胶囊安全区（`safe-area-inset-bottom`）。
  - 避免在 WXSS 中使用昂贵的通用后代选择器与复杂的深层 CSS 选择器。

### 3.4 微信云开发 (CloudBase) 规范
- **云函数职责单一与轻量化**：
  - 云函数尽量保持短小精悍，减少冷启动依赖加载时间。
  - 数据库查询必须显式指定 `limit()`，且所有高频过滤字段必须建立数据库索引。
- **后端安全鉴权**：
  - 严禁客户端显式传输用户 `openid`；所有云端业务一律通过 `cloud.getWXContext().OPENID` 获取可信用户身份。
  - 关键状态变更（如打卡金币结算、防重发请求）由云函数保证事务原子性与幂等性。

---

## 4. 软件工程与防御式编程准则 (Software Quality & Defense)

- **交互防抖与防重复触发**：
  - 所有表单提交、打卡按钮、抽签动画及页面跳转方法，均需添加 `loading` 状态锁或 `throttle` 节流防护，防止用户连击引发竞态。
- **空安全与异常兜底**：
  - 所有深层对象访问使用可选链 (`data?.userInfo?.avatar`) 或安全取值兜底。
  - 网络请求与云调用必须包裹完整的 `try...catch` / `fail` 回调，并在 UI 层提供友好的友好 Toast 或 Empty/Error 缺省态。
- **环境与版本兼容性**：
  - 调用基础库较新 API 前，必须使用 `wx.canIUse` 或降级兜底方案。

---

## 5. Git 版本控制与发布规范 (Git Standards)

- **Conventional Commits 提交命名规范**：
  - `feat:` 新功能（如：`feat: 增加早睡打卡星空动效`）
  - `fix:` 修复缺陷（如：`fix: 解决打卡按钮高频连击重复计分问题`）
  - `perf:` 性能优化（如：`perf: 优化探索页 setData 键路径增量更新`）
  - `refactor:` 代码重构（不改变功能逻辑的结构优化）
  - `style:` 样式调整与排版优化
  - `docs:` 文档变更
  - `chore:` 构建、脚本或配置文件调整
- **安全检查准则**：
  - 严禁将敏感凭据（如 AppSecret、私钥文件、未加密环境配置）提交至代码仓库。
  - 保持工作区随时可部署、可编译无报错。
