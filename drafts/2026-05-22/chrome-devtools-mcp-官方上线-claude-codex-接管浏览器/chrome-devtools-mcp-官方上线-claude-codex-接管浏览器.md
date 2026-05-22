# Chrome 团队下场做 MCP，我让 Claude 自己开浏览器调 bug 之后再也不想截图了

以前用 Claude 调前端 bug，流程是这样的，它让我点哪个按钮，我点，再让我看 console，我截图贴回去，它再让我滚到某个元素，我再截图，一个 layout 错位来回五到十次，半小时过去了。

昨天 Chrome 团队悄悄把 chrome-devtools-mcp 推到了 GitHub Trending，一天 +151 star。我装上跑了一下午，这个回合制的痛苦终于结束了。

## 一句话，Chrome 自己下场做了官方 MCP server

之前大家用的 browser-use、playwright-mcp、还有各种自己搓的 puppeteer 封装，都是社区在外面"代理"浏览器。Chrome DevTools MCP 是 Chrome 团队自己出手，把 DevTools 协议完整暴露给任何支持 MCP 的 coding agent，Claude Code、Claude Desktop、Codex、Cursor 都能直接接。

仓库地址在 github.com/ChromeDevTools/chrome-devtools-mcp，README 写得很直白，43 个 tool 分 10 个类别，覆盖导航、截屏、console、network、performance trace、Lighthouse、heap snapshot、点击拖拽输入。

装法是一行 npx，

```
npx -y chrome-devtools-mcp@latest
```

Claude Desktop 配置就五行，

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

放到 claude_desktop_config.json 里重启，Claude 这边就能看到一堆新的浏览器工具。Codex CLI 用法类似，按 MCP 标准配。

## 和 browser-use、playwright-mcp 是什么关系

我先说结论，三类工具不是替代关系，是定位错开了。

browser-use 走的是"agent + 视觉理解"路线，让模型看截图自己决定下一步，胜在通用、能处理任何陌生网站，缺点是慢、贵、对模型视觉能力依赖大。

playwright-mcp 是 Microsoft 维护的 MCP 封装，把 Playwright 的 API 包成 MCP tool，强项是跨浏览器（Chromium、Firefox、WebKit）和成熟的测试场景。

Chrome DevTools MCP 这一版的位置很不一样，它不假装能跨浏览器，README 里明确写了"officially supports Google Chrome and Chrome for Testing only"，专心把 Chrome DevTools 协议吃透。换来的是另外两条做不到的能力，performance trace、Lighthouse audit、heap snapshot、CrUX 真实用户数据，全部原生暴露给 agent。

通俗讲，前两个解决的是"让 AI 能开浏览器点东西"，Chrome 这版解决的是"让 AI 能像我打开 DevTools 一样调 bug"。

对前端来说，第二件事的价值大得多。

## 我实测的三个场景

**场景一，闭环抓 console error。**

我把一个 React 项目跑起来，丢一句"打开 localhost:3000，把首页所有 console error 找出来并定位到源码"。Claude 自己 navigate、自己读 console，message 里带 source-mapped stack trace（这点很关键，不是混淆后的 vendor.js），它直接跳到我源码里那行说"你这里 await 一个非 promise"。

整个过程我没看截图，没贴日志，没切窗口。

**场景二，layout 错位让 AI 自己看。**

一个移动端样式问题，桌面端正常、375 宽度炸了。我说"resize 到 iPhone 12，截图 hero 区域，告诉我为什么 CTA 按钮被挤出去"。它 take_screenshot 之后回了一段话，定位到一个 flex 容器没有 min-width: 0，子元素文字溢出把按钮挤走。我改完它再截一张对比，没问题。

以前这个流程我自己开 Chrome、按 F12、切 device mode、截图、贴给 Claude，至少 5 分钟。现在 40 秒。

**场景三，Lighthouse 跑出来直接动手优化。**

这是最让我意外的。我让它对一个落地页跑 Lighthouse，它直接调 performance_audit，把 LCP、CLS、TBT 拉出来，然后挑了 LCP 4.2s 这一项，自己分析了 trace，说主要瓶颈是 hero 图没用 fetchpriority="high" 且 LCP 元素被一个 web font swap 阻塞了。给了具体改动建议。

我跑了一次，LCP 干到 1.8s。

## 我的判断

前端 AI 编程过去一年卡在一个地方，写代码 AI 已经很强，但**调试**还是人在干，因为浏览器里发生的事 AI 看不见。所有"AI 帮你调 bug"的产品都在解决同一个问题，怎么把浏览器的状态喂给模型。

Chrome 团队下场做这件事，意味着这条链路的标准化层不再是社区瞎试，而是官方协议直接对齐。以后 Claude、Codex、Cursor 这些 agent 跟浏览器之间不再各自封装，统一对 chrome-devtools-mcp，对前端开发流程的影响会比想象的大。

我自己最直接的感受，前端联调的"我执行 → 我看 → 我汇报给 AI"这套回合制结束了，进入"AI 自己跑完一圈再回来报告"的闭环模式。半小时的 bug 现在 5 分钟搞完。

它也不是没缺点。Chrome 进程会被它接管，你自己的常用浏览器最好分开装一个 Chrome for Testing。tool 调用频繁时 token 消耗不小，一个 Lighthouse audit 的 trace 数据回来很大，建议配合 Claude 的 prompt cache 用。

## 怎么动手试

最小可运行 flow，

1. 装 Node.js LTS 和最新版 Chrome（或 Chrome for Testing）
2. Claude Desktop 用户编辑 claude_desktop_config.json，加上面那段 mcpServers 配置，重启
3. Claude Code / Codex CLI 用户按各自 MCP 配置文件加同一条
4. 第一个 case 我推荐你跑 Lighthouse audit，因为它最能让你立刻看到"AI 自己在 DevTools 里干活"是什么感觉

跑完第一个 case 你大概率会跟我一样，回不去截图回合制了。

## 相关链接

- 仓库，https://github.com/ChromeDevTools/chrome-devtools-mcp
- npm，https://www.npmjs.com/package/chrome-devtools-mcp
- Chrome DevTools 协议文档，https://chromedevtools.github.io/devtools-protocol/
- MCP 协议说明，https://modelcontextprotocol.io/

---
相关实体:: [[google|Google]] | [[chrome|Chrome]] | [[mcp|MCP]] | [[claude-code|Claude Code]]
相关主题:: [[developer-tools|开发者工具]] | [[ai-coding-tools|AI 编程工具]] | [[agent-frameworks|Agent 框架]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
