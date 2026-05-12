# Matt Pocock 把自己 .claude/skills 整个开源了，一天涨 3886 星

今天刷 GitHub Trending，又看到 Matt Pocock 的名字。mattpocock/skills 仓库，单日新增 3886 星，总数已经压到 74.5k。README 第一句很直接，"Skills for Real Engineers. Straight from my .claude directory."

我盯着这句话愣了一会儿。这个月我已经写过三篇 skills 主题，addyosmani 社区聚合版、Anthropic 官方四仓库齐发、现在轮到 KOL 个人工作流公开版。三套放在一起对照看，国内 Claude Code 用户该抄哪套，结论清晰了。

## 三套 skills 的定位差异

addyosmani/agent-skills 偏体系化，覆盖架构评审、性能分析、稳定性兜底，三千多星，定位是"工程师该懂的系统知识"。

anthropics/skills 是官方版，给的是 SKILL.md 规范，加上 docx/pdf/pptx/xlsx 四个文档处理 skill 的源码。是 Anthropic 自己生产环境跑的范本。

mattpocock/skills 不是范本，是一个真实工程师每天用的 .claude 目录原样开源。74.5k 星里相当一部分是这波新涨的。

## Matt 公开了哪些 skill

我挑几个想抄的。

工程类，diagnose 给硬 bug 一套规范化诊断循环，tdd 走红绿重构，grill-with-docs 让 agent 反过来质询你把领域模型聊清楚，to-prd 把对话整成 PRD，zoom-out 强制 agent 把当前任务放回更大上下文里再决定怎么改。

生产力类里 caveman 我看到时直接笑了，定位是"压缩通信模式"，逼 agent 用石器人语气说话，号称省 75% token。grill-me 是人类版的 grill，agent 反复问你直到把计划吃透。

杂项里 write-a-skill 教 agent 怎么写一个新 skill，skill 自我繁殖。

整套读下来风格统一，小、利落、可组合、命名一眼看懂用途。

## 社区已经在用脚投票

r/ClaudeAI 4 月 26 日有条帖子，"I deleted most of my Claude skills last week."

楼主原话，过去几个月堆了一堆 skill 包括 Superpowers 那种全家桶，结果 Claude 变慢、上下文糊成一团，把大部分删了换成 mattpocock/skills，走的是相反哲学，小、锐、命名清晰的原子单元，环境快了人也终于看懂自己装了什么。

20 条评论基本同感，有人原来装 14 个 skill，砍到 5 个之后响应质量反而上来了。

## 国内 Claude Code 用户该抄哪套

按场景分别推。

刚装完 Claude Code 不知道写什么 skill，抄 mattpocock，先复制 caveman、diagnose、tdd 三个跑两周再决定。

团队要建统一规范，读 anthropics/skills，重点看 docx/pdf/pptx/xlsx 四个 skill 的 SKILL.md 写法。

要做 production 级工程兜底，抄 addyosmani，覆盖性能、稳定性、可观测性、安全审计。

三种场景都占一点，建议 Matt 打底每天高频用，Anthropic 当规范写新 skill 时翻，Addy 当深水区参考重大变更前看一遍。

## 我抄到的方法论

最大收获是命名。每个 skill 名字都像一个动词短语，diagnose、grill-me、handoff、zoom-out、caveman。这些名字让 agent 一看就知道什么场景该调用，触发条件几乎不用写。

对比我自己之前写的 "claude-code-debug-helper" 这种五个词的复合名，agent 经常不触发。Matt 走的是 Unix 哲学，一个 skill 做一件事，名字就是那件事。

第二个收获是 caveman。把"风格"也抽成 skill 这种思路，国内大部分文档站都没讲过。

## 你今天能动手的

```
git clone https://github.com/mattpocock/skills
```

clone 完先读 skills/caveman/SKILL.md，再读 skills/diagnose/SKILL.md，最后翻 skills/write-a-skill/SKILL.md。从短到长，15 分钟读完整套设计哲学。

挑两到三个最对胃口的复制进你的 ~/.claude/skills/，删掉一切看不懂或者用不到的。砍光比堆满重要。

最后一个开放问题，国内有没有 KOL 愿意把自己 ~/.claude/ 整个开源出来。我赌不出半年会有人做。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
