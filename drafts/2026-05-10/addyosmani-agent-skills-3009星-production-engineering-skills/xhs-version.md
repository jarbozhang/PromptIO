# Google Chrome 大佬 Addy Osmani 把工程经验开源给 AI agent，一夜涨 3009 星

我把 Addy Osmani 的 agent-skills 装进 Claude Code 跑了一个下午，挺值得聊。

如果你在国内前端圈待过几年，这个名字应该不用我介绍。《Learning JavaScript Design Patterns》中文版叫《学习 JavaScript 设计模式》，《Image Optimization》也有中译本。他在 Google Chrome 团队当 staff engineer 那阵子，几乎每个 PerfMatters 大会都能看到他的 slides。这是真在 production 项目里抠过性能、抠过包体积、抠过可访问性的人，不是只写段子的"AI 影响力博主"。

5 月 9 号他丢了一个仓库出来，名字叫 agent-skills，副标题 production-grade engineering skills for AI coding agents。一夜 +3009 星，上了 GitHub Trending Shell 榜。

## 22 个 skill 长什么样

我把目录翻了一遍，按开发生命周期分成六组。

**Define / Plan 类 3 个**，把模糊想法捏成提案、强制写 PRD、拆任务到带验收标准的颗粒度。

**Build 类 7 个**，薄层垂直切片、TDD 红绿重构、context-engineering、强制查官方文档而不是凭记忆写、高风险决策走对抗式 review、前端 UI、API 设计。

**Verify 类 2 个**，教 agent 接 Chrome DevTools 拉运行时数据，给了一套"重现-定位-简化-修复-防护"五步分诊法。

**Review 类 4 个**，五轴代码审查（单次变更约 100 行上限）、代码精简、OWASP Top 10 安全、对齐 Core Web Vitals 的性能优化。

**Ship 类 5 个**，trunk-based 提交规范、CI/CD、deprecation 迁移、文档与 ADR、发布前 checklist + 灰度策略。

**Meta 1 个**，让 agent 自己学会"现在该调用哪一个 skill"，避免把 22 个全塞进上下文。

## 和 Matt Pocock 那份目录走的是两条路

5 月 3 号我们覆盖过 Matt Pocock 的 Claude Skills 目录，两份东西放一起看才有意思。

Matt 的目录像社区爱好者整理的工具箱，覆盖广，TypeScript / Tailwind / 数据处理都有，调性是"看看大家都在用什么"。Addy 这套不广，只有 22 条，但每条都咬住 production 工程的一个环节。performance-optimization 那篇里写的是 LCP / INP 的具体阈值、Lighthouse 哪几项要进 CI、怎么用 web-vitals 库埋点，跟他在 web.dev 上写过的文章是同一份知识。security-and-hardening 直接列 OWASP Top 10 对应的 mitigation 模式。

两份目录定位不同，Matt 那边是 starter pack，Addy 这边是 senior playbook，可以并存。

## 实测装起来什么感觉

Claude Code 用户最舒服，一行命令。

```
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills
```

Cursor 用户麻烦点，没有 plugin 系统，得手动把对应 SKILL.md 复制到 `.cursor/rules/`。Gemini CLI 走 `gemini skills install`。仓库根目录还有七个 slash command，meta-skill 会教 agent 自己挑 skill，不需要你手动 invoke。

我挑了一个手头的 React 小项目跑 incremental-implementation + code-review-and-quality 两条。最直观的差异是 agent 不再一次性甩 300 行 diff，它会先停下来问"这块拆成三个 commit 行不行"，然后每个 commit 之前跑测试。code review 那条 skill 里有一句硬规则，单次审查 ≈ 100 行，超过就拒绝。agent 学会拒绝大 PR 了，过去得我自己在 prompt 里反复念叨。

source-driven-development 那条也挺香，它会强制 agent 在用某个 API 之前先去查官方文档，而不是基于训练数据里的旧版本瞎写。React 19、Tailwind 4 这些版本变动多的库，这条救命。

## 我的判断

这事值得国内 Claude Code / Cursor 用户认真装一遍，理由三个。

一，作者权重摆在那里。Addy Osmani 不是 AI 圈半路出家的人，他写的 performance-optimization 跟普通人写的不在一个层级。

二，这套是 production-grade 的工程直觉，不是 demo-grade 的炫技。incremental-implementation、deprecation-and-migration、shipping-and-launch 这几条对独立开发者尤其有用，单人项目最容易在这几个环节出事。

三，它顺着 Matt Pocock → specsmaxxing 这条线把 skill 工程化又推进了一步。下一个版本的 AI coding agent 大概率不再比拼模型，而是比拼"装了哪些 skill"。提早把这套装进工作流，等于提前一步建立 agent 的肌肉记忆。

也别照搬 22 条全装，meta-skill 会自动路由，但人脑也得有取舍。我的建议是先装 Build / Verify / Review 三组共 13 条，Ship 那 5 条等项目真到了发布前再加。

## 行动建议

今晚做一件事就行，把 agent-skills 装进你最常用的 AI coding 工具，挑一个真实项目跑一次 incremental-implementation，看看 agent 拆 commit 的方式跟过去裸跑差在哪。

差距大不大，会决定你接下来一年怎么用 AI 写代码。

仓库地址 github.com/addyosmani/agent-skills，国内可直接访问。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
