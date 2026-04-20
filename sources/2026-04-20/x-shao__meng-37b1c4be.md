---
title: "Browser Use 团队开源发布「Browser Harness ♞」：让 LLM 获得对浏览器的完全控制自由，且具备自我进化能力  Browser Harness 是一个极简的 Chrome D"
source: "X @shao__meng"
url: "https://x.com/shao__meng/status/2045657138119549006"
date: "Sun Apr 19 00:14:02 +0000 2026"
likes: 285
reposts: 64
replies: 6
---

Browser Use 团队开源发布「Browser Harness ♞」：让 LLM 获得对浏览器的完全控制自由，且具备自我进化能力

Browser Harness 是一个极简的 Chrome DevTools Protocol 桥梁——仅用约 592 行 Python，构建了一个 LLM 直接操作真实浏览器的最小化 harness。
开源地址：
https://t.co/gzVurMeuPX

核心设计理念：反框架化
项目有一个强烈的立场："No framework, no recipes, no rails"。
传统浏览器自动化工具（如 Selenium、Playwright、甚至 browser-use 本体）往往预设了人类的操作逻辑：封装点击、填写、等待等 API，让开发者按剧本编排流程。而 browser-harness 走了一条相反的路：
· 不封装能力：只提供一个 websocket 连接到 Chrome，LLM 直接发送 CDP 命令
· 不预设流程：没有"等待元素→点击→输入"这类剧本，LLM 自己决定如何与页面交互
· 无中间层：只有一个薄层把 LLM 的输出翻译成浏览器能理解的协议

自修复机制（Self-healing）-- 独特创新点
项目包含一个 helpers. py，里面存放了一些基础的浏览器操作函数。但关键在于：这个文件不是给人类维护的，而是给 LLM 自己维护的。
当 LLM 在执行任务时发现缺少某个功能（例如需要上传文件但 upload_file() 不存在），它会暂停任务，直接编辑 helpers. py 写入新函数，然后继续执行。
这意味着：
· 系统不会因为没有预设能力而失败
· 每次执行新类型任务时，harness 都在自动扩展自己的工具箱
· 长期运行后，helpers. py 会积累针对特定场景的优化函数

Skills 的生成逻辑
项目设有 domain-skills/ 目录（已包含 GitHub、LinkedIn、Amazon 等场景），但 README 明确强调：Skills 文件不应由人类手写，而应由 agent 在执行任务时自行记录。

这呼应了「The Bitter Lesson」——与其让人类总结规则教给 AI，不如让 AI 从与环境的直接交互中学习什么真正有效。domain-skills 本质上是 agent 的"肌肉记忆"：它记录了在特定网站上哪些选择器有效、哪些流程能走通、哪些 edge case 需要处理。
