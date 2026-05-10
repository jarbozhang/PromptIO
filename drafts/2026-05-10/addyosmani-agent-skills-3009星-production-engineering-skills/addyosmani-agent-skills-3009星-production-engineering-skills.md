# Google Chrome 大佬 Addy Osmani 把 production engineering 经验开源给 AI agent，一夜涨 3009 星

---
相关实体:: [[addy-osmani|Addy Osmani]] | [[google|Google]] | [[anthropic|Anthropic]] | [[claude-code|Claude Code]] | [[matt-pocock|Matt Pocock]]
相关主题:: [[ai-coding-tools|AI 编程工具]] | [[agent-frameworks|Agent 框架]] | 方法论
---

我把 Addy Osmani 的 agent-skills 装进 Claude Code 跑了一个下午。

如果你在国内前端圈待过几年，这个名字应该不用我介绍。《Learning JavaScript Design Patterns》中文版叫《学习 JavaScript 设计模式》，《Image Optimization》也有中译本，他在 Google Chrome 团队当 staff engineer 那阵子，几乎每个 PerfMatters 大会都能看到他的 slides。简单讲，这是真在 production 项目里抠过性能、抠过包体积、抠过可访问性的人，不是那种只写 Twitter 段子的"AI 影响力博主"。

5 月 9 号他丢了一个仓库出来，名字简单粗暴，agent-skills，副标题 production-grade engineering skills for AI coding agents。一夜 +3009 星上 GitHub Trending Shell 榜单。

这事儿往前推一周才看得清楚。5 月 3 号 Matt Pocock 公开了自己整理的 Claude Skills 目录，5 月 5 号社区开始喊 specsmaxxing，让 agent 在动手前先写 YAML 规格。Addy 这一发，等于把这套方法论的链条又往前推了一节，从"我整理了一些 skill"变成"我把一个资深前端 staff engineer 二十年的工程直觉拆成了 agent 能读的 SKILL.md"。

## 22 个 skill 到底是什么

我先把目录翻了一遍，按开发生命周期分成六组。

**Define / Plan 类 3 个**，idea-refine 把模糊想法捏成提案，spec-driven-development 强制 agent 在写代码前先输出 PRD，planning-and-task-breakdown 负责拆任务到带验收标准的颗粒度。

**Build 类 7 个**，incremental-implementation（薄层垂直切片）、test-driven-development（红绿重构 + 测试金字塔）、context-engineering、source-driven-development（强制查官方文档而不是凭记忆写）、doubt-driven-development（高风险决策走对抗式 review）、frontend-ui-engineering、api-and-interface-design。

**Verify 类 2 个**，browser-testing-with-devtools 教 agent 接 Chrome DevTools 拉运行时数据，debugging-and-error-recovery 给了一套五步分诊法，重现、定位、简化、修复、防护。

**Review 类 4 个**，code-review-and-quality（五轴审查、单次变更约 100 行上限）、code-simplification、security-and-hardening（OWASP Top 10 + 秘密管理）、performance-optimization（直接对齐 Core Web Vitals 指标）。

**Ship 类 5 个**，git-workflow-and-versioning（trunk-based、原子提交）、ci-cd-and-automation、deprecation-and-migration、documentation-and-adrs、shipping-and-launch（发布前 checklist + 灰度策略）。

**Meta 1 个**，using-agent-skills，作用是让 agent 自己学会"现在该调用哪一个 skill"，避免把 22 个全塞进上下文。

## 跟 Matt Pocock 那份目录的差异

5 月 3 号那天我们覆盖过 Matt Pocock 的 Claude Skills 目录。两份东西放一起对照才有意思。

Matt 的目录像是"社区爱好者整理的工具箱"，覆盖广，门类杂，TypeScript / Tailwind / 数据处理什么都有，调性是"看看大家都在用什么"。

Addy 这套是另一种东西。它不广，只有 22 条，但每一条都死死咬住 production 工程的一个环节。看 performance-optimization 那一篇，里面写的是 LCP / INP 的具体阈值、Lighthouse 哪几项要进 CI、怎么用 web-vitals 库埋点，跟他在 web.dev 上写过的那些文章是同一份知识。security-and-hardening 直接列 OWASP Top 10 对应的 mitigation 模式。这不是"我让 GPT 帮我整理了 prompt"那个量级的东西，是有人把自己十几年踩过的坑翻译成 agent 能读的 markdown。

所以两份目录其实不冲突，定位不同。Matt 那边是 starter pack，Addy 这边是 senior playbook。

## 实测怎么装、跑起来什么感觉

Claude Code 用户最舒服，一行命令。

```
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills
```

Cursor 用户麻烦点，没有 plugin 系统，得手动把对应 SKILL.md 复制到 `.cursor/rules/` 里。Gemini CLI 走 `gemini skills install` 那一路。仓库根目录还有 `.claude/commands/` 七个 slash command，meta-skill 那一层会教 agent 自己挑 skill，不需要你手动 invoke。

我挑了一个手头的 React 小项目跑了 incremental-implementation + code-review-and-quality 两条。最直观的差异是 agent 不再一次性甩给你 300 行 diff。它会先停下来问"这块拆成三个 commit 行不行"，然后每个 commit 之前跑测试。code review 那条 skill 里有一句硬规则，单次审查变更 ≈ 100 行，超过就拒绝。这条对我的意义是 agent 学会拒绝大 PR 了，过去得我自己在 prompt 里反复念叨。

source-driven-development 那条也挺有意思，它会强制 agent 在用某个 API 之前先去查官方文档，而不是基于训练数据里的旧版本瞎写。React 19、Tailwind 4 这些版本变动多的库，这条 skill 救命。

## 我的判断

这事儿值得国内 Claude Code / Cursor 用户认真装一遍，理由有三个。

一，作者权重摆在那里。Addy Osmani 不是 AI 圈半路出家的人，他写的 performance-optimization 跟普通人写的不在一个层级。

二，这套东西是 production-grade 的工程直觉，不是 demo-grade 的炫技。incremental-implementation、deprecation-and-migration、shipping-and-launch 这几条尤其对独立开发者有用，单人项目最容易在这几个环节出事。

三，它顺着 Matt Pocock → Specsmaxxing 这条线把 skill 工程化又推进了一步。下一个版本的 AI coding agent 大概率不再比拼模型，而是比拼"装了哪些 skill"。提早把这套装进自己的工作流，等于提前一步建立 agent 的肌肉记忆。

至于不值得做的事，别照搬 22 条全装。Meta-skill 那条会自动路由，但人脑也得有取舍。我的建议是先装 Build / Verify / Review 那三组共 13 条，Ship 那 5 条等你的项目真到了发布前再加。

## 行动建议

今晚做一件事就行，把 agent-skills 装进你最常用的那个 AI coding 工具，挑一个真实项目跑一次 incremental-implementation，看看 agent 拆 commit 的方式跟你过去裸跑的差距在哪。

差距大不大，会决定你接下来一年怎么用 AI 写代码。

## 相关链接

- 仓库地址，[github.com/addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
- Addy Osmani 个人站，[addyosmani.com](https://addyosmani.com)
- 我们 5/3 覆盖过的 Matt Pocock Claude Skills 目录，可以站内搜
- 5/5 specsmaxxing YAML spec 方法论，可以站内搜

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
