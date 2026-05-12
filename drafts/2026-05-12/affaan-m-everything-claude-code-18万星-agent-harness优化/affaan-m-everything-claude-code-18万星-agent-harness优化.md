# 我用 Claude Code 三个月烧了 800 美元，直到看见这个 18 万星的 agent harness 优化系统

我用 Claude Code 三个月烧了 800 美元。

不是夸张。Max 20x 包月 200 刀，加上 API 直连那条线超的 token，再加上一些 Codex 和 Cursor 重复订阅，三个月账单接近 800。烧出来的东西大部分是返工，是同一个 bug 改三遍，是 agent 信誓旦旦说"已完成"但跑测试一片红，是写到一半发现它在用 React 17 的写法对付 React 19 的项目。我相信你也有类似的体感，只是有没有真去算这笔账而已。

这就是为什么今天看到 affaan-m/everything-claude-code 冲到 18 万星的时候，我会停下手里的活把 README 读了三遍。

仓库今天的数据是 stars 180,059、forks 27,769，贡献者 170+，主语言 JavaScript，topics 标签里有 ai-agents、anthropic、claude、claude-code、mcp、productivity。副标题写得直白，The agent harness performance optimization system。这是第一次有人把 agent harness 的性能优化当成一个完整系统来做，而不是发一些零散的 prompt 模板，或者写几条 markdown 让你拼。

## 五个模块对应五种 harness 痛点

ECC（everything-claude-code 的官方缩写）的核心是五个模块，每一个都死死咬住 Claude Code 这类 agent harness 的一类老毛病。我按我自己烧钱的痛点顺序讲。

### Skills - 解决"工作流碎成一地"

仓库自带 220+ 个 skill，覆盖 TDD、安全审计、前端后端模式、文章写作、Django / Spring Boot / Laravel 等框架。这套 skill 系统替代了之前命令式的 slash command 做法，成为主力的工作流入口。

它解决的痛点很具体。我以前装过 Addy Osmani 的 agent-skills（22 条 production engineering 的），也装过 Matt Pocock 的 starter pack，再加上自己写的几个项目级 SKILL.md，结果 .claude 目录里堆了 50 多个 skill，每次启动新会话不知道哪个会被加载，哪个会被冷落。ECC 把这些 skill 重新组织成一个统一表面，可发现、可组合、可路由。等于把过去散在各路博主仓库里的工程经验做了一次收编。

### Instincts - 解决"每个项目都得从零教 agent"

这是 ECC 最让我心动的模块。叫"持续学习"系统，v2 版放在 `continuous-learning-v2/` 目录里，原理是从你的开发会话里自动提取模式，给每条模式打信心分。当某一类 instinct 累积到一定密度，`/evolve` 命令会把相关 instinct 聚类成新的 skill。

翻译成人话，就是 agent 会从你的实际操作里偷学你的项目习惯，然后把偷学到的东西沉淀成可复用的 skill。

我每次开新项目最痛苦的事情就是把 agent 训练成"我的"工程师，告诉它这个仓库用 pnpm 不用 npm、commit 信息走 conventional commits、import 路径别用相对的要用 `@/`，反反复复教完一周，开下一个项目又得从头来。Instincts 这一层就是为了让这些教过的东西沉下来，跨项目跨会话不丢。

### Memory Persistence - 解决"上下文一刷新就全没了"

钩子驱动的会话生命周期管理。SessionStart 钩子会把上一次会话的状态加载回来，SessionEnd 会把摘要和学到的模式存下去。

国内用户对这个痛点最有共鸣。Claude Code 那套 /clear、/compact 一旦触发，前面教过的东西基本归零。靠 CLAUDE.md 手动维护项目记忆永远滞后，写到一半的中间产物丢了就丢了。Memory 这一层做的事情是把"会话边界"这个 harness 层级的硬伤补上。

### Security (AgentShield) - 解决"配置漂移和 prompt injection 没人盯"

这个模块本身是独立可用的，叫 AgentShield，102 条静态分析规则，1282 个测试，跑的是红队-蓝队-审计三 agent 流水线，扫的是你的 agent 配置、hook、MCP server 是不是有 prompt injection 漏洞、secret 泄漏、配置漂移这些问题。命令是 `/security-scan` 或者 `npx ecc-agentshield scan`。

为什么这个模块重要。前两天我们刚覆盖过 Anthropic Claude Code 的 CVE-2025-39861 沙箱逃逸，说明 agent harness 本身就是攻击面。你装的 skill 越多，你接的 MCP server 越多，攻击面越大。ECC 等于把"扫自己的 agent 配置"这件事变成了 npx 一行命令。

### Research-First Development - 解决"模型自信地胡说"

两条核心 skill，`search-first` 和 `documentation-lookup`（后者走 Context7 MCP），强制 agent 在写代码之前先查外部知识。

我前面说三个月烧 800 美元，其中一大块就是 agent 凭训练数据里的旧版本 API 瞎写，写完跑不通，再让它修，修的时候又凭记忆瞎修，循环往复。Research-first 这条规矩简单粗暴，"不准凭记忆写，先查"。

## ECC 跟 Addy Osmani、Matt Pocock 那两份的位置关系

5 月 10 号我们覆盖过 Addy Osmani 的 agent-skills，今天 5 月 12 号 Matt Pocock 那边也在 trending 上，三个东西放一起对照才看得清各自的位置。

Matt Pocock 的 skills 仓库走的是 starter pack 路线，小而锐，几十条精挑细选的原语，强调"删多别加少"。社区里有人公开发帖说自己删掉了 Superpowers 大包，转去用 mattpocock/skills，理由是表面积小了反而拿回了控制感。这是 minimalist 派。

Addy Osmani 的 agent-skills 走的是 senior playbook 路线，22 条 production engineering 经验，每一条都对应工程生命周期的一个环节。这是 production engineering 派。

Affaan M 的 ECC 走的是 system 路线。它不是给你一堆 skill 让你选，它把 skill / instincts / memory / security / research 五件事捆成一个系统，再加上 AgentShield 这种独立可跑的工具、`/evolve` 这种自演化命令、`npm run dashboard` 这种 GUI。这是 platform 派。

三派不冲突。Matt 教你怎么删，Addy 教你 production 怎么干，Affaan 教你怎么把 agent harness 当一个生产系统来运营。

## 中国 Claude Code 用户怎么落地

推荐路径用 plugin。

```
/plugin marketplace add https://github.com/affaan-m/everything-claude-code
/plugin install ecc@ecc
```

然后手动只复制你需要的 rule 目录到 `~/.claude/rules/ecc/`。

```
mkdir -p ~/.claude/rules/ecc
cp -r rules/common ~/.claude/rules/ecc/
cp -r rules/typescript ~/.claude/rules/ecc/
```

回退路径走 `./install.sh --profile full`，Windows 上是 `.\install.ps1 --profile full`。装完之后 `/ecc:plan "Add user authentication"` 是第一个值得跑的 skill，看看它怎么把你的需求展开成可执行的计划。

国内用户落地的时候，我有三条具体建议。

一，**先单独装 AgentShield**，跟 ECC 整套解耦。`npx ecc-agentshield scan` 跑一次，看它对你现在的 .claude 配置有没有报警。这一步几乎零成本，但能帮你审计过去几个月乱装 skill 留下来的隐患。

二，**Instincts 模块单独开**，别一开始全套塞进去。让它先跑两周，看它从你的会话里偷学到什么模式，再决定要不要 `/evolve` 成 skill。这步最像中国互联网工程师熟悉的"埋点先行"，先有数据再决策。

三，**research-first 那两条 skill 强制开**，跟 Context7 MCP 一起装。这是 ROI 最高的一步，几乎能砍掉一半因为模型用旧 API 写错代码导致的返工。

至于不值得做的事，别一上来就 `--profile full` 把 220+ 个 skill 全装进上下文。Claude Code 的上下文窗口再大也不是无限的，skill 多到 agent 自己都不知道该调哪个的时候，就是 Reddit 上那篇"我把 Superpowers 删了"复刻现场。

## 我的判断

这件事的信号意义大于工具意义。

agent harness 这个词第一次被作为优化对象认真对待。过去一年所有人都在卷模型，模型从 Sonnet 3.5 到 4.5 到 4.7，从 GPT-4 到 GPT-5，从 Gemini 2 到 3。但实际写代码的人都知道，模型本身只占体验的一半，另一半在 harness 层。skill 怎么组织、记忆怎么持久化、安全怎么扫、上下文怎么管，这些事情过去一直是各家工具厂自己悄悄做，没人系统化拆给社区看。

ECC 把这件事公开化了，并且用 18 万星证明社区是渴的。

下一年的 AI 编程工具大概率不再比拼模型，而是比拼 harness。谁能把 agent 的工作记忆做长、把工作流做稳、把安全做实、把研究做前置，谁就赢这一轮。Claude Code、Cursor、OpenCode 三家都得把这一层补上，否则会被 ECC 这样的第三方系统反向定义。

至于个人开发者，今晚做一件事，挑一个真实项目，装 ECC，跑 `/security-scan` 加 `/ecc:plan`。看看你过去三个月烧的钱里，有多少是因为没有这五个模块导致的。

我赌你心疼。

## 相关链接

- 仓库地址，[github.com/affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)
- Addy Osmani agent-skills（5/10 覆盖），站内搜 "agent-skills"
- Matt Pocock skills 今日动态，站内搜 "Matt Pocock"
- Anthropic Claude Code CVE-2025-39861 沙箱逃逸（5/10 覆盖），站内搜 "CVE-39861"

---
相关实体:: [[claude-code|Claude Code]] | [[mattpocock-skills|Matt Pocock Skills]]
相关主题:: [[ai-coding-tools|AI 编程工具]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
