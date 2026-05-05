# 想让 AI 帮我点 Slack/Notion，本地装了个开源 CLI 一晚跑通了

最近折腾 AI agent 帮我处理 Mac 上的杂活，被一个新工具救了一把，分享下 🛠️

## 🤔 之前我卡在哪

让 AI 操作 Mac 上的 Slack、Notion 这种 native 应用，常见做法是截屏喂模型，让它猜按钮坐标然后点 (834, 412)，再截一张图确认。

问题挺明显：
- 一个动作要 5 到 8 秒
- token 烧得心疼
- UI 滚一下就废了

我盯着这套循环看了好几天，总觉得别扭。

## 💡 另一种思路：直接读系统结构

前两天发现一个叫 `agent-desktop` 的 Rust 开源项目，思路很朴素。

操作系统其实早把 UI 结构暴露出来了：
- macOS 有 Accessibility API
- Windows 有 UI Automation
- Linux 有 AT-SPI

这套接口本来给读屏软件用，每个按钮、输入框都有结构化标签，role 是 button、name 是 "Send"。屏幕阅读器就靠这个念给视障用户听。

那为什么不直接喂给 LLM 呢 🤷

## 🚀 实际跑起来的样子

agent-desktop 把 a11y 树包成 53 个 JSON 命令，agent 直接读结构，不截图、不靠 vision model。

一个典型循环：

```
agent-desktop snapshot --app Slack -i --compact
agent-desktop click @e12
agent-desktop type @e5 "ship it"
agent-desktop press cmd+return
```

每个元素分到一个 reference id 像 `@e12`，让 LLM 决定点哪个、输入什么，完事再 snapshot 确认。延迟就是 a11y API 调用本身，几十毫秒级 ⚡

## 🧩 大应用 token 爆炸怎么办

我以前自己琢磨过这套思路，最大的坑就是 Slack 完整 a11y 树容易超 5 万 token。

作者做了个 progressive skeleton traversal：
- 默认只返回浅层骨架，depth 3
- 深层容器只标 `children_count`，不展开
- agent 想钻进去用 `--root @e3` 单独抓那一支
- 操作完只让那一部分失效，不用整棵重抓

实测 Notes 的 snapshot 吐回来的 JSON 不算长，工具栏、文本编辑区一目了然 👌

## ⚖️ 这是另一条路，不是替代

之前用过 trycua，那是另一种取向，给你套个 macOS sandbox VM，模型在 VM 里跑视觉 computer-use，安全边界做得很到位。

agent-desktop 走的是直读结构 + 本地 CLI，二进制扔到 PATH 就能用，不带沙箱。两条路适合的场景不一样：

- trycua：让 agent 操作不可信应用、要做录屏审计
- agent-desktop：你信任那台电脑、那些 app，只想跑日常自动化

## 📌 边界也要说清楚

不是所有应用都吃这套：
- ✅ 原生 native 应用、a11y 标得好的应用
- ❌ Electron 应用（很多把 a11y 关掉）
- ❌ 纯 canvas 渲染、自定义绘图

Electron 应用读出来一片 group group group，这种还得回到截图方案。

## 🛠️ 三步上手

如果想试一下：

1. **装好二进制**：GitHub release 下载或者 `cargo build`，扔到 `~/.local/bin`。第一次跑去「系统设置 → 隐私与安全性 → 辅助功能」把它勾上 🔓
2. **跑示例**：`agent-desktop list-apps` 看看活着的应用，再 `agent-desktop snapshot --app Notes` 看输出
3. **接到 agent 工作流**：当 shell 工具调用就行；如果用支持 MCP 的客户端（Claude Desktop、Cursor），可以包一层 MCP server 把 53 个命令暴露成 tools

进阶玩法是 snapshot + 决策 + act 写成自己的 prompt 框架，每轮只给 LLM 看相关子树，token 能压到截图方案的几十分之一 💸

## ✍️ 我的判断

这工具的价值是补上了 AI 操作 GUI 应用的那一段。写代码、跑命令这些已经有很顺的方案，但开 Slack 发消息、在 Notion 整理文档、在 Figma 改图层，截屏点像素的循环就太笨了。

我觉得 OS 级 a11y CLI 工具会是 desktop agent 这一年最值得做的方向之一。视觉模型再强也强不过操作系统免费给你的结构化语义。浏览器那边早走通了「读 DOM 而不是截图」，desktop 这边只是迟到了几年。

122 颗星不算多，但方向对了，我会继续盯 👀

## 🔗 想看的可以瞄一眼

- agent-desktop GitHub：github.com/lahfir/agent-desktop
- agent-browser（浏览器版同思路）：github.com/vercel-labs/agent-browser
- macOS Accessibility 官方文档：developer.apple.com

#AI工具 #Mac效率 #开发者工具 #自动化 #开源项目 #AIagent

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
