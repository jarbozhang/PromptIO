# Anthropic 第一届开发者大会，把 Claude Mythos 拉去给 Firefox 找漏洞

5 月 6 日旧金山，Anthropic 第一次开自己的开发者大会，叫 Code w/ Claude 2026。OpenAI 已经开了三届 DevDay，Google 有 I/O，Meta 有 Connect，Anthropic 一直走"发模型 + 写技术博客"的路子，这次第一次把客户、合作伙伴、记者拉到同一个会场，本身就是个信号，它不再只想当一个模型实验室，要做平台。

更值得看的是大会第二天 Mozilla 放出来的那篇 Firefox + Claude Mythos Preview 安全实测。Anthropic 把还在 preview 状态的 Mythos 提前给了 Mozilla，结果 Firefox 4 月一个月修了 423 个漏洞，2025 年全年是月均 20 到 30 个。这个数字比大会任何一个发布都更能说明现在的位置。

## 大会发了什么

把 Simon Willison 的 live blog 整理一下，实打实的发布大概是六块。

**速率限制翻倍 + SpaceX 数据中心合作**。CPO Ami Vora 开场讲 API 流量同比涨 17 倍，Claude Code Pro/Max/Enterprise 用户的五小时窗口翻倍。算力来自 SpaceX 旗下 Colossus 数据中心，xAI 把 Colossus 1 整租给了 Anthropic。

**Claude Managed Agents 三件套**，多代理编排（公测）、成果管理（公测）、Dreaming 梦想模式（研究预览）。Dreaming 最有意思，让 Claude 在空闲时回看之前的会话自我改进，会生成一个 `descent-playbook.md` 文件，等于把踩过的坑写成 runbook，下次直接调用。

**Claude Code 一堆新工具**，Code Review 已经在 Anthropic 全公司内部用、CI auto-fix（PR 出问题自动修）、Remote Agents（手机控制笔记本上的 Claude Code 跑活）、Security Reviews（自动化安全审查）。Boris Cherny 现场演示给虚构公司加退款功能，桌面同时跑多个会话，派完活去喝杯咖啡，回来 PR 已经准备好等你 review。

**Claude Code Routines**，把"开发者设置异步自动化、第二天醒来 PR 已经准备好"这件事产品化。

**Claude Design**，Opus 4.7 的视觉设计能力封装成产品。

**客户成果数据**，Mercado Libre 23000 名工程师，目标 Q3 达到 90% 自主编码；Shopify 也是 Claude Code 用户。Simon 更在意的一句话是"高管们重新参与编码了，因为贡献需要的时间变少了"。

## Mythos 把 Firefox 漏洞数干到 14 倍

Mozilla 工程团队博客标题就是 *Behind the Scenes Hardening Firefox with Claude Mythos Preview*。

直接看数字，Firefox 在 2025 年全年月均修 20 到 30 个漏洞，2026 年 4 月一个月修了 423 个。具体案例包括存在 20 年的 XSLT 漏洞（2006 年就埋在那）、15 年前的 `<legend>` 元素漏洞。

Mozilla 自己也说这不是单纯靠模型能力变强，他们做的是"改进了驾驭这些模型的技术，引导、扩展、堆叠它们以生成大量信号并过滤噪声"。这个故事比 4 月初官方那篇"自主发现 FreeBSD 0day"营销稿更有说服力，因为是真实工作流，不是 cherry pick 演示。

## 社区在吵什么

我拉了一下这一个月 HN 和 Reddit 的反应，结果有点反常，Reddit 上声量最大的反而是质疑帖。

r/Anthropic 一篇 *Mythos is Mostly Hype* 拿了 1214 赞 235 评论，引用 Tom's Hardware 质疑 Anthropic "数千个严重 0day"的说法只是基于 198 个手工审核样本。最高赞态度中肯，"公告里有大量营销炒作，虽然尴尬，但这并不能否定其他主张。"r/freebsd 也有 58 赞 63 评论的高互动帖讨论"完全自主"找漏洞的真实性。

Mozilla 这 423 漏洞数据来得太及时，正好把 Reddit 上 4 月那波"是不是营销"的争论压下去了。

## 我的判断

把大会和 Mythos+Firefox 连起来看，Anthropic 在赌一个判断，模型能力本身已经不是核心壁垒，谁能把模型嵌进真实工作流谁赢。

这次发布清单里没有新模型。没有 Opus 4.8、没有 Sonnet 5。但 Dreaming、Code Review、CI auto-fix、Remote Agents、Routines 全是工程化产品，把已有模型能力组合成可重复工作流。Mythos+Firefox 那 423 漏洞同样的逻辑，模型给 Mozilla 那一刻只是起点，真正让数字翻 14 倍的是 Mozilla 工程团队怎么用这个模型。

国内同步看智谱、DeepSeek、字节、阿里通义，方向趋同。智谱 GLM-Zero 做推理产品化，DeepSeek V4 冲万亿参数 + 国产硬件，字节扣子豆包做 agent 编排。各家在自家工作流嵌入这条路上还在补课，下一轮竞争看谁能把 agent 嵌进 git、CI、code review、安全审查这些关键流程。Mercado Libre 那 23000 人 90% 自主编码如果 Q3 真能落地，会是个分水岭。

## 如果你想跟进

看回放，搜 YouTube 上的 "Code w/ Claude 2026" keynote。

国内开发者已经在用 Claude Code 的，速率翻倍立刻反映在 Pro/Max 订阅；做安全审计或代码审查工具的，Mozilla 博客里的 harness 方法论值得学，不是单纯调 API，而是"引导、扩展、堆叠模型 + 过滤噪声"这套工程。

有海外业务的团队需要 Mythos 或更新文档，走企业 Vertex / 镜像通道更稳。Mozilla 这次拿到的是 partner program 预览，没对外开放，看到"教你白嫖 Mythos"的大概率是骗 token 的钓鱼，别点。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
