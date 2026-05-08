---
title: "Anthropic 开了个 Code w/ Claude 2026 大会，把 Claude Mythos 拉出来给 Firefox 找漏洞了"
status: draft
date: 2026-05-08
reach: 8
voice: narrative
---

# Anthropic 开了个 Code w/ Claude 2026 大会，把 Claude Mythos 拉出来给 Firefox 找漏洞了

## 为什么你应该关注这件事

5 月 6 日旧金山，Anthropic 第一次开自己的开发者大会，名字就叫 Code w/ Claude 2026。

这是个值得标记的时间节点。OpenAI 已经开了三届 DevDay，Google 有 I/O，Meta 有 Connect，连 xAI 都开始攒自己的发布会。Anthropic 一直走发模型 + 写技术博客的路子，这次第一次把客户、合作伙伴、记者拉到同一个会场，本身就是个信号，它不再只想当一个 model lab，要做 platform play 了。

更值得看的是大会第二天 Mozilla 放出来的那篇 Firefox + Claude Mythos Preview 安全实测，Anthropic 把还在 preview 状态的 Mythos 提前给了 Mozilla，结果 Firefox 4 月一个月修了 423 个漏洞，2025 年全年是月均 20 到 30 个。这个数字比大会任何一个发布都更能说明 Anthropic 现在的位置。下面把这两件事按时间线梳理清楚。

## 大会发了什么，六个发布点

Code w/ Claude 2026 现场 Simon Willison 做了 live blog，从 09:05 一直记到下午。整理一下，这次实打实的发布大概是六块，

**1. 速率限制翻倍 + SpaceX 数据中心合作**

Ami Vora（CPO）开场讲增长，API 流量同比涨 17 倍。Claude Code Pro/Max/Enterprise 用户的五小时窗口限制翻倍。算力从哪来？Anthropic 拿下了 SpaceX 旗下 Colossus 数据中心的容量，xAI 把 Colossus 1 整个租给了 Anthropic，自己保留更大的 Colossus 2。马斯克的说法是"和 Anthropic 团队聊过后，相信他们采取了正确的步骤让 AI 造福人类"，但合同里保留了"如果 AI 造成人类伤害"就收回算力的权利。Simon 对这交易意见很大，因为 Memphis Colossus 出了名的环保黑历史，无许可运营燃气轮机，被研究关联到当地医院入院率上升。

**2. Claude Managed Agents 三件套**

研究产品负责人 Dianne Na Penn 在 09:28 介绍了三个新功能，分别在不同阶段，

- **多代理编排**（Multi-agent Orchestration）， 公开测试版
- **成果管理**（Outcomes）， 公开测试版
- **Dreaming（梦想模式）**， 研究预览版

Dreaming 是这次最有意思的一个。它让 Claude 在空闲时回看自己之前的会话，自我改进，会生成一个叫 `descent-playbook.md` 的文件，你可以理解成 AI 把之前踩过的坑写成 runbook，下次直接调用。

**3. Claude Code 一堆新工具**

Claude Code 负责人 Cat Wu（09:34）和创建者 Boris Cherny（09:43）轮番上来。已经发布的新工具包括，

- **Code Review** ， 已经在 Anthropic 全公司内部用
- **CI auto-fix** ， PR 出问题自动修
- **Remote Agents** ， 用手机控制笔记本上的 Claude Code 跑活
- **Security Reviews** ， 自动化安全审查

Boris 现场演示给一个虚构的 ACME 公司加退款功能，要求带幂等性、多货币、审计日志，桌面应用同时跑多个会话。这就是去年 Anthropic 一直在推的"异步编码"工作流，你派个活给 Claude，去喝杯咖啡，回来 PR 已经准备好了等你 review。

**4. Claude Code Routines**

09:46 发布的高阶提示自动化框架，本质是把"开发者可以设置异步自动化、第二天醒来 PR 已经准备好"这件事产品化。是 Skills 之上的下一层抽象。

**5. Claude Design**

09:17 提到的 Anthropic Labs 项目。Opus 4.7 已经具备视觉设计能力，Claude Design 是把这个能力封装成产品。这块本号 4 月 18 日已经写过一篇 deep dive，这次大会算是把它纳入到官方产品矩阵。

**6. 客户成果数据**

平台团队的 Katelyn Lesse 和 Angela Kiang（09:23）讲了"顾问策略"，让 Opus 给 Sonnet 做建议，权衡成本和质量。三个客户案例，eve 用前沿模型质量做到 5 倍更低成本；Mercado Libre 23000 名工程师，目标 Q3 达到 90% 自主编码；Shopify 也是 Claude Code 用户。Simon 更感兴趣的是另一个观察，"高管们重新参与编码了，因为贡献需要的时间变少了。"

## Cowork 和 Symphony 不是新发布，但被串起来讲了

需要单独说明一下，本号 5 月 7 日的文章已经写过 Cowork 和 Symphony，前者是 Anthropic 的多人协作 IDE，后者是把多个 Claude agent 编排成乐队的概念。

这次大会**没有把它们当成新发布**。它们的角色变成了串场用的概念锚点，Cowork 解释为什么需要异步编码、Symphony 解释为什么需要 Multi-agent Orchestration。你想想看，大会的叙事框架是用 Cowork/Symphony 把分散的产品线缝合起来，这才是 platform play 的真正含义。

## Claude Mythos Preview 把 Firefox 漏洞数干到 14 倍

5 月 7 日 Mozilla 工程团队发了篇博客，Simon 第一时间转发评论，标题就是 *Behind the Scenes Hardening Firefox with Claude Mythos Preview*。

直接看数字，**Firefox 在 2025 年全年月均修复 20 到 30 个漏洞，2026 年 4 月一个月修了 423 个。**

这不是单纯靠模型能力变强。Mozilla 工程团队在博客里说，他们做的事情是"改进了驾驭这些模型的技术，引导、扩展和堆叠它们以生成大量信号并过滤噪声"。具体案例包括，

- **存在 20 年的 XSLT 漏洞** ， 一个 2006 年就埋在那的 bug
- **15 年前的 `<legend>` 元素漏洞** ， HTML 表单组件里的老问题

Mozilla 自己也说很多尝试被 Firefox 现有的纵深防御挡住了，意思是 Mythos 找到的不全是高危，但 423 这个数字本身已经说明问题。

Simon 在博客里强调了两件事，第一，模型能力提升和驾驭技术（harness）的双重突破改变了 AI 安全报告的价值动态；第二，这个故事比 Anthropic 4 月初发布 Mythos 时官方那篇"自主发现 FreeBSD 0day"营销稿更有说服力，因为这是真实的产品工作流，不是 cherry pick 的演示案例。

## 多平台真实反馈，HN 和 Reddit 在吵什么

我们拉了一下这一个月 HN 和 Reddit 对 Mythos 和 Code w/ Claude 的反应，结果有点反常，**Reddit 上声量最大的反而是质疑帖**。

r/Anthropic 上一篇 *Mythos is Mostly Hype* 拿了 1214 赞 235 评论，引用 Tom's Hardware 质疑 Anthropic "数千个严重 0day"的说法只是基于 198 个手工审核样本。最高赞 specimen12（183 赞）态度中肯，"公告里有大量营销炒作，虽然尴尬，但这并不能否定其他主张。"第二高赞 Wickywire（64 赞）直接反驳，那 198 个 review 是用来验证模型严重性评估准确率达 90% 的样本，不是结论的证据基础。

r/freebsd 还有一篇 58 赞 63 评论的高互动帖讨论 Mythos "完全自主"找到 FreeBSD/Linux/OpenBSD 漏洞，3 月底 calif.io 那篇博客（Anthropic 让 Nicholas Carlini 用 Claude 找到 FreeBSD CVE-2026-4747）已让这件事提前发酵，当时是已知 advisory + 人工 prompting，这次 Mythos 号称"完全自主"，FreeBSD 社区警觉度更高。

r/OutOfTheLoop 那篇 360 赞的科普帖反映了普通用户的困惑，最高赞 920 赞直接说"制造炒作是 AI 公司商业模式的 90%"。但第二高赞 208 赞反驳更接近真相，"它在数十亿人每天用的系统上找到了一堆此前从未被发现的关键安全漏洞，专家程序员要花很长时间才能找到。"

Mozilla 这次的 423 漏洞数据来得太及时，它正好把 Reddit 上 4 月那波"是不是营销"的争论压下去了。

## 我的判断，Anthropic 在赌一件事

把大会和 Mythos+Firefox 连起来看，Anthropic 在赌一个判断，**模型能力本身已经不是核心壁垒，谁能把模型嵌进真实的工作流谁赢**。

这次发布清单里没有新模型。没有 Opus 4.8、没有 Sonnet 5、没有 Claude 5 leak。Simon 也说"我希望看到新的模型/产品公告"，结果听完一上午只有 SpaceX 数据中心算"实质性新闻"。但反过来看，Dreaming、Code Review、CI auto-fix、Remote Agents、Routines，全是工程化产品，把已有模型能力组合成可重复工作流。Mythos+Firefox 那 423 个漏洞同样的逻辑，模型给 Mozilla 那一刻只是起点，真正让数字翻 14 倍的是 Mozilla 工程团队**怎么用**这个模型。

国内同步看智谱、DeepSeek、字节、阿里通义，方向趋同，智谱 GLM-Zero 做推理产品化，DeepSeek V4 据传冲万亿参数 + 国产硬件，字节扣子豆包做 agent 编排。但**没有一家有自己的 Code Review、CI auto-fix 这种深度嵌入开发者工作流的产品**，大家还停留在 IDE 插件和 web 聊天界面阶段。

Anthropic 这次大会传递的信号是，模型 lab 时代结束了，platform 时代开始。下一轮竞争看谁能把 agent 嵌进 git、CI、code review、安全审查这些 mission-critical 流程。Mercado Libre 那 23000 人 90% 自主编码如果 Q3 真能落地，会是个分水岭。

## 如果你想跟进

**看回放**，Anthropic 通常会在 YouTube 频道上传 keynote 完整录像，搜 "Code w/ Claude 2026" 应该能找到。Simon Willison 的 live blog 是公开的（simonwillison.net/2026/May/6/code-w-claude-2026）。

**重点关注**，Dreaming 模式什么时候 GA（目前 research preview）；Routines 文档（docs.anthropic.com 有专门章节，做异步 agent 自动化值得读）；Mythos 什么时候开放给企业用户（Mozilla 拿到的是 preview，正式 GA 后定价是关键）。

**国内开发者实操**，已经在用 Claude Code 的，速率翻倍立刻反映在 Pro/Max 订阅；Multi-agent Orchestration 公开测试可以申请；做安全审计或代码审查工具的，Mozilla 那篇博客里的 harness 方法论值得学，不是单纯调 API，而是"引导、扩展、堆叠模型 + 过滤噪声"这套工程。

**注意**，Anthropic 这次没把 Mythos 直接对外开放，Mozilla 是 partner program 拿到的预览。如果你看到"教你白嫖 Mythos"的教程，大概率是骗 token 的钓鱼。

下一个看点是 Q3。如果 Mercado Libre 那个 90% 自主编码真能落地，这次大会的所有发布回头看会是个里程碑。

---
相关实体:: [[anthropic|Anthropic]] | [[claude|Claude]] | [[claude-code|Claude Code]] | [[mythos|Mythos]] | [[firefox|Firefox]] | [[zhipu|智谱]] | [[bytedance|字节跳动]]
相关主题:: [[ai-coding-tools|AI 编程工具]] | [[agent-frameworks|Agent 框架]] | [[ai-safety|AI 安全]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
