# Claude Code 创始人说自己今年没写过代码 Anthropic 内部已经让 Claude 互相问问题

Boris Cherny 这次访谈最刺眼的一句，不是 Claude Code 年化营收超过 10 亿美元。

是他自己 2026 年至今没手写过一行代码。

这句话很容易被当成标题党。但把访谈细节串起来看，它真正讲的不是“程序员不用写代码了”，而是 Anthropic 正在把软件开发从个人手艺改成组织流程。

这比一个工具更新更值得看。

## Boris 的工作方式不是多开几个窗口

中文社区整理的 Sequoia AI Ascent 访谈里，Boris 说自己每天合并几十个 PR，上周单日峰值到 150 个。他的工作流不是坐在 IDE 前从头写函数，而是在 Claude App 里常驻 5 到 10 个 session，每个 session 再开多个 agent。

晚上他还会起更深的任务，让 agent 继续跑。

VentureBeat 早前写过 Boris 的 Claude Code 工作流，核心也是并行，不是线性写代码。一个 agent 跑测试，一个 agent 改模块，一个 agent 写文档，人负责分配任务、看通知、做判断。

这听起来像“多开”，但差别很大。

多开窗口还是人在写。Boris 讲的是任务被拆给 agent，人变成调度、验收和合并的人。

## Loop 才是关键

访谈里最值得普通开发者抄的，不是“每天 150 个 PR”。这个数字离大多数团队太远。

真正有用的是 Loop。

Boris 说他有几十个 Loop 同时跑，比如盯 PR 自动修 CI 和 rebase、保持 CI 健康、每 30 分钟从 Twitter 拉用户反馈做聚类。Anthropic 的 Routines 把这种定时循环搬到服务器端，机器关了也能继续跑。

这说明 Claude Code 正在从“你叫它做一件事”变成“你让它长期盯一类问题”。

对普通团队来说，最容易迁移的也是这类任务。

每天扫 failed CI，整理 flakey test。每天看 issue，把重复问题聚类。每天读用户反馈，挑出高频抱怨。每天检查依赖更新，生成风险摘要。

这些任务不性感，但非常耗人。

## Anthropic 内部的变化更大

访谈里还有一个更组织化的细节，Anthropic 内部已经没有手写代码，所有 SQL 由模型生成，员工的 Claude 之间会通过 Slack 互相沟通。

这句话要谨慎理解。它不是说所有公司明天都能照做，也不是说模型永远不会出错。

Boris 自己也承认，这不普世。大型复杂代码库、小众语言、模型不熟悉的框架，都还有难点。

但 Anthropic 的领先点不只是“他们能用到更好的模型”。更关键的是，他们把流程改了。权限、验收、沟通、CI、反馈聚类，都在给 agent 留位置。

这比换一个编辑器难得多。

## 社区反馈在提醒另一面

last30days 里有个 r/vibecoding 讨论很有意思，标题大意是，给 AI coding agent 太多工具，它反而会变笨。讨论里提到 500 行 CLAUDE.md、过度加载工具和指令，会让 agent 在任务开始前就背上太多噪音。

这和 Boris 的方法并不矛盾。

并行 agent 不是把所有能力塞给一个 agent。更合理的做法，是每个 agent 只拿当前任务需要的上下文、工具和验收标准。

这也是为什么 skills、Routines、MCP、Slack 里的 Claude 互相问问题，会变成同一件事。它们都在解决一个问题，怎么让 agent 在正确的时间拿到正确的能力，而不是一次性塞满。

## 普通团队怎么抄一小段

不要从“今年不写代码”开始学。

先从三个低风险 Loop 开始。

第一个，CI Loop。每天固定看失败测试，分类成代码问题、环境问题、flaky test 和依赖问题。

第二个，反馈 Loop。定时抓 issue、工单、群消息，按功能区聚类，给产品和工程各一份摘要。

第三个，文档 Loop。每次合并 PR 后，让 agent 检查 README、CLI help、迁移指南有没有需要同步的地方。

这三件事不会立刻替代工程师，但会让团队第一次感受到 agent 常驻后台的价值。

## 我的判断

Claude Code 的下一阶段，不是 IDE 里多一个聊天窗口。

它更像是一套组织操作系统。人写需求、定边界、验结果；agent 读代码、跑任务、互相询问、等待事件、修小问题。

Boris 说自己没手写代码，这句话真正刺激人的地方，不是代码消失了，而是开发者的主要动作换了。

以前你用手把代码推进去。现在你要学会把任务设计成 agent 能持续推进的系统。

这件事不会一夜发生，但它已经在 Anthropic 内部发生了一部分。

---
相关实体:: [[claude-code|Claude Code]] | [[anthropic|Anthropic]] | [[boris-cherny|Boris Cherny]]
相关主题:: [[ai-coding-tools|AI 编程工具]] | [[agent-frameworks|Agent 框架]] | [[ai-workflows|AI 工作流]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
