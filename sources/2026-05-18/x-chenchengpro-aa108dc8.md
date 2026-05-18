---
title: "TinyFish 出了个挺香的小工具：两条命令把 Claude Code 的 WebSearch / WebFetch 整体提速 3x+，评论区实测 1 分 52 秒降到 35 秒。  npm ins"
source: "X @chenchengpro"
url: "https://x.com/chenchengpro/status/2053136970482905243"
date: "Sat May 09 15:36:13 +0000 2026"
likes: 64
reposts: 16
replies: 5
tweet_id: "2053136970482905243"
author: "chenchengpro"
---
TinyFish 出了个挺香的小工具：两条命令把 Claude Code 的 WebSearch / WebFetch 整体提速 3x+，评论区实测 1 分 52 秒降到 35 秒。

npm install -g @tiny-fish/cli@latest
tinyfish config-claude

跑完 config-claude 就把 Claude Code 原生 web 工具透明替换成 TinyFish 托管版（大概率走 MCP 注册或 hooks 拦截原生调用），不用改 prompt。Search 和 Fetch 在免费额度内不消耗 credits，只有 Agent 和 Browser 才计费。

提速不是黑魔法，是基础设施换了：Search API 在真实 stealth Chromium 里实时渲染搜索结果页返回结构化 JSON，能抓到传统缓存型搜索引擎拿不到的动态/最新内容（财报实时监控、新闻类查询特别明显）；Fetch API 把任意 URL 服务端清洗成 markdown/JSON/HTML 直出，剥离广告导航脚本，模型不用再啃满是噪音的 HTML 也省 token；底层 Chromium 池常驻、亚 250ms 冷启动，请求直接打到 TinyFish 的 fleet 不再受 Anthropic 自带 web 工具的速率/排队限制。端到端体感快好几倍。

不止 Claude Code——还提供 MCP server 和 Skill 两种形态，可以接到 Cursor、OpenCode、openclaw、Hermes 等任何 MCP 兼容客户端。同一个 API key 同一个 credit 池打通 Search / Fetch / Agent / Browser 四件套，Agent API 在 Mind2Web 基准上声称 89.9% 准确率。

和 browser-use 这种"只给 agent + 浏览器"的方案相比，TinyFish 把搜索、抓取、agent、浏览器整套托管掉，使用者不用自己维护反爬、代理池、渲染基础设施。

注意几点：替换原生 WebSearch / WebFetch 意味着请求出口换成 TinyFish 服务器，敏感查询要评估隐私边界；3x 是官方表述，实际倍数取决于查询类型和目标站点渲染成本，最好自己跑一组对照。重度跑 web research 的人切一下试试，升级成本两条命令收益直接体现在每次 web 调用的等待时间。
