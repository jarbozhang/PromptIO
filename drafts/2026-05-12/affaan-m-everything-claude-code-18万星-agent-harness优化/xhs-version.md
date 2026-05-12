# 我用 Claude Code 三个月烧了 800 美元 这个 18 万星的项目让我重新算了笔账

我用 Claude Code 三个月烧了 800 美元。

不是夸张。Max 20x 包月 200 刀，加上 API 直连超的 token，再加上一些重复订阅，三个月账单接近 800。烧出来的东西大部分是返工，同一个 bug 改三遍，agent 信誓旦旦说"已完成"但跑测试一片红，写到一半发现它在用 React 17 的写法对付 React 19。我相信你也有类似的体感，只是有没有真去算这笔账而已。

这就是为什么今天看到 affaan-m/everything-claude-code 冲到 18 万星的时候，我会停下手里的活把 README 读了三遍。

仓库今天数据是 stars 180,059、forks 27,769，贡献者 170+，副标题写得很直白，agent harness 性能优化系统。这是第一次有人把 agent harness 优化当成一个完整系统来做，而不是发零散的 prompt 模板。

## 五个模块对应五种痛点

ECC（everything-claude-code 缩写）的核心是五个模块，每一个都咬住 agent harness 的一类老毛病。

**Skills** 仓库自带 220+ 个 skill，覆盖 TDD、安全审计、前后端模式、文章写作、各类框架。我以前装过好几家博主的 skill 包，加上自己写的项目级 SKILL.md，结果 .claude 目录堆了 50 多个，每次启动新会话不知道哪个会被加载。ECC 把这些重新组织成统一表面，可发现、可组合、可路由。

**Instincts** 这是我最心动的模块，持续学习系统。原理是从你的开发会话里自动提取模式，给每条模式打信心分。当某一类 instinct 累积到一定密度，`/evolve` 命令会把它们聚类成新的 skill。翻译成人话，agent 会从你的实际操作里偷学你的项目习惯，然后沉淀成可复用的 skill。

我每次开新项目最痛苦的事就是把 agent 训练成"我的"工程师，告诉它这个仓库用 pnpm 不用 npm、commit 信息走 conventional commits、import 路径用 `@/`，反反复复教完一周，开下一个项目又得从头来。Instincts 就是为了让这些教过的东西沉下来。

**Memory Persistence** 钩子驱动的会话生命周期管理。SessionStart 会把上一次会话状态加载回来，SessionEnd 把摘要存下去。国内用户对这个痛点最有共鸣，/clear、/compact 一旦触发，前面教过的东西基本归零。

**Security（AgentShield）** 这个模块独立可用，102 条静态分析规则，1282 个测试，跑红队-蓝队-审计三 agent 流水线，扫的是 agent 配置、hook、MCP server 有没有 prompt injection 漏洞、secret 泄漏、配置漂移。命令是 `/security-scan` 或 `npx ecc-agentshield scan`。

**Research-First** 两条核心 skill，`search-first` 和 `documentation-lookup`，强制 agent 在写代码前先查外部知识。我前面说烧的 800 美元里，一大块就是 agent 凭训练数据里的旧版本 API 瞎写，写完跑不通，再让它修，循环往复。这条规矩简单粗暴，"不准凭记忆写，先查"。

## 三派工具的位置

最近 trending 上有三个相关项目，放一起对照才看得清。

Matt Pocock 的 skills 仓库走 starter pack 路线，几十条精挑细选的原语，强调"删多别加少"。

Addy Osmani 的 agent-skills 走 senior playbook 路线，22 条 production engineering 经验，每条对应工程生命周期一个环节。

Affaan M 的 ECC 走 system 路线，不是给你一堆 skill 让你选，而是把 skill / instincts / memory / security / research 五件事捆成一个系统，再加上 AgentShield 独立工具、`/evolve` 自演化命令。

三者各自擅长不同方向，Matt 教你怎么删，Addy 教你 production 怎么干，Affaan 教你怎么把 agent harness 当生产系统来运营。

## 国内用户怎么落地

推荐用 plugin 安装，

```
/plugin marketplace add https://github.com/affaan-m/everything-claude-code
/plugin install ecc@ecc
```

然后手动复制需要的 rule 目录到 `~/.claude/rules/ecc/`。装完之后 `/ecc:plan "Add user authentication"` 是第一个值得跑的 skill。

我给国内用户三条具体建议。

一，先单独装 AgentShield，跟 ECC 整套解耦。`npx ecc-agentshield scan` 跑一次，看它对你现在的 .claude 配置有没有报警。这步几乎零成本，但能帮你审计过去几个月乱装 skill 留下的隐患。

二，Instincts 模块单独开，别一开始全套塞进去。让它先跑两周，看它从你的会话里偷学到什么模式，再决定要不要 `/evolve` 成 skill。这步最像国内工程师熟悉的"埋点先行"。

三，research-first 那两条 skill 强制开，跟 Context7 MCP 一起装。这是 ROI 最高的一步，几乎能砍掉一半因为模型用旧 API 写错代码导致的返工。

至于不值得做的事，别一上来就 `--profile full` 把 220+ 个 skill 全装进上下文，上下文窗口再大也不是无限的。

## 我的判断

这件事的信号意义大于工具意义。

agent harness 这个词第一次被作为优化对象认真对待。过去一年所有人都在卷模型，但实际写代码的人都知道，模型本身只占体验的一半，另一半在 harness 层。skill 怎么组织、记忆怎么持久化、安全怎么扫、上下文怎么管，这些事过去一直是各家工具厂自己悄悄做，没人系统化拆给社区看。

ECC 把这件事公开化了，18 万星证明社区是渴的。

下一年的 AI 编程工具大概率不再比拼模型，而是比拼 harness。谁能把工作记忆做长、把工作流做稳、把安全做实、把研究做前置，谁就赢这一轮。

今晚做一件事，挑一个真实项目装 ECC，跑 `/security-scan` 加 `/ecc:plan`。看看你过去三个月烧的钱里，有多少是因为没有这五个模块导致的。

我赌你心疼。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌 利益点 可操作 -->
