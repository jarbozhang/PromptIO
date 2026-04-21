---
title: "OpenAI 给 Codex 加了一个新功能 Chronicle，让它能“看”你的屏幕。  简单说，Codex 现在可以记住你最近在屏幕上干了什么。你跟它说“这个报错”“那个文件”，它不用你解释就知道"
source: "X @dotey"
url: "https://x.com/dotey/status/2046316977711452560"
date: "Mon Apr 20 19:56:00 +0000 2026"
likes: 61
reposts: 10
replies: 5
---

OpenAI 给 Codex 加了一个新功能 Chronicle，让它能“看”你的屏幕。

简单说，Codex 现在可以记住你最近在屏幕上干了什么。你跟它说“这个报错”“那个文件”，它不用你解释就知道指的是什么。过去你得复制粘贴一堆上下文才能让 AI 理解你在做什么，现在它自己会从屏幕内容里补齐。

背景：Codex 上周刚推出了 Memories 功能，可以跨会话记住用户的偏好和项目。Chronicle 是 Memories 的扩展，靠后台进程定期截屏、做 OCR、分析你正在用哪些工具，再把这些信息整理成记忆文件。

目前是小范围灰度：只开放给 macOS 上的 ChatGPT Pro 订阅用户，欧盟、英国、瑞士不支持，大概率是隐私法规的原因。

但是需要注意的是：它会很快吃掉你的 rate limit，因为后台一直在跑 Agent 做总结。生成的记忆是明文 Markdown 存在本地 ~/.codex/memories_extensions/chronicle 里，其他 App 也能读到，敏感信息存在泄露风险。OpenAI 还明确警告这会放大 prompt injection 的风险：如果你浏览了带有恶意指令的网页，Codex 可能真的会照着那些指令执行。

屏幕截图会上传到 OpenAI 服务器生成记忆，官方说处理完就删，也不用于训练。如果不放心，可以随时从菜单栏暂停，或者直接删掉那些 Markdown 文件让它"忘记"。

AI 读屏幕这个方向不算新。微软 Recall 在 Windows 上折腾了一年多，Cursor 这类 IDE 也在探索类似的上下文补齐。但把它做成持续运行的后台 Agent，自动更新长期记忆，再直接塞进一个命令行编程工具里，目前还没看到别家这么干。

我暂时还不打算测试，不太喜欢有人/Agent盯着屏幕的感觉，有兴趣的可以试试并反馈下好用不。
