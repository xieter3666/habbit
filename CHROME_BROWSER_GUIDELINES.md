# Chrome 浏览器使用与自动化连接规范 (Browser Guidelines)

本规范用于约束本项目及后续所有涉及浏览器自动化、网页操作、MCP（如 `chrome-devtools`）等场景的执行模式。

---

## 核心原则

1. **复用用户主浏览器实例**：
   - **严禁** 启动独立的临时开发者浏览器。
   - **严禁** 使用临时 `--user-data-dir` 隔离沙盒实例。
   - 必须复用用户日常登录并操作的 Chrome 主实例（保留所有 Cookie、登录状态、账号凭据及个人数据）。

2. **远程调试端口启动模式**：
   - 用户打开或代理唤起 Chrome 时，必须携带调试参数：
     ```bash
     chrome.exe --remote-debugging-port=9222
     ```
   - 确保 `http://127.0.0.1:9222` 可供 CDP (Chrome DevTools Protocol) 长连接调用。

3. **`chrome-devtools` MCP 配置标准**：
   - MCP 服务端必须使用 `--browserUrl=http://127.0.0.1:9222` 连接到现存浏览器。
   - 全局配置文件：`~/.gemini/config/mcp_config.json`
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

4. **自动化脚本与工具直连规范**：
   - 任何 Node.js / Python 脚本或自动化程序，在操作浏览器时直接对接 `ws://127.0.0.1:9222/devtools/...` 或使用 Puppeteer / Playwright 的 `connectOverCDP({ endpointURL: 'http://127.0.0.1:9222' })`，不得执行 `puppeteer.launch()`。
