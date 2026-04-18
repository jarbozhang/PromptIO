# "Tokenmaxxing"，TechCrunch造了个新词，说AI编程正在让开发者变傻

昨天 TechCrunch 发了一篇文章，造了个新词叫 "Tokenmaxxing"。意思是开发者疯狂地往 Cursor、Copilot、Claude Code 里灌 token，追求最大化代码输出量，然后自我感觉特别良好。

副标题写得很毒，"代码是多了，但也更贵了，重写也更多了。"

我看完愣了几秒。因为这说的不就是我自己吗。

## 你以为你在 10x，其实你在给自己挖坑

过去几个月我用 Claude Code 写了不少东西。体感上确实快了，以前要写一下午的模块，现在半小时就能跑起来。但说实话，我也注意到一个问题，很多时候我在"快速生成"之后，花了更多时间去理解、调试、重写那些代码。

GitClear 去年底做了一个大规模研究，分析了 1.53 亿行代码变更。结论很扎眼，使用 AI 编程工具后，代码搅动率 (code churn) 翻倍了。两周内被回滚或大改的代码比例，从 AI 之前的基线直接涨了一倍。

GitHub 自己的数据说 Copilot 让开发者写代码速度快了 55%。但 GitClear 的数据给了另一个视角，代码里"新增"和"复制粘贴"的比例在升高，而"重构""删除""移动"在下降。

翻译成人话，AI 在帮你疯狂堆砌新代码，但没人在做清理工作。

这就像一个不停往房间里搬东西的搬家公司，搬得飞快，但从来不帮你整理。三个月后你打开门，东西堆到天花板，什么都找不到。

## "Tokenmaxxing" 到底在讽刺什么

这个词玩的是健身圈的梗。"Looksmaxxing" 是疯狂优化外貌，"statusmaxxing" 是疯狂刷社会地位。TechCrunch 用 "tokenmaxxing" 来形容一种新型的开发者自欺，你盯着 token 消耗量、代码行数、PR 数量这些表面指标，说服自己效率翻了好几倍。

但实际上呢？

你生成了 500 行代码，花了 3 个小时 debug 其中的边界情况。你让 AI 重构了一个模块，结果破坏了三个下游依赖。你一天提了 8 个 PR，但每个都需要来回 review 四五轮。

坦率讲，这不是 AI 工具的问题。这是人的问题。

我们太容易被"产出感"欺骗了。看着屏幕上哗哗滚动的代码，大脑分泌的多巴胺和真正解决了一个难题是一样的。但这两件事完全不同。

## 更极端的信号，Pull Request 可能要死了

就在同一天，Latent Space 发了一期叫 "RIP Pull Requests (2005-2026)"。GitHub 历史上第一次允许在开源仓库里禁用 PR。

为什么？因为当 AI agent 开始自己写代码、自己提交，传统的 PR review 流程就变成了瓶颈。Pete Steinberger 和 Theo 提出了一个概念叫 "Prompt Requests"，不是提交代码让人 review，而是提交 prompt 让人 review。好处有三个，没有合并冲突，维护者改 prompt 比改代码容易，恶意代码混入的风险更低。

Mitchell Hashimoto 和 Amp Code 走得更远，提出用信誉系统替代传统的代码审查。

你想想看，如果连 PR 都要被淘汰了，那 "tokenmaxxing" 的问题就不只是个人效率的幻觉了。它暗示着整个软件开发流程正在被重新定义，而大多数开发者还在用旧地图导航。

## 我认为真正的问题不是 AI 太强，是我们太懒

说真的，我自己也还在摸索这个边界。但我有一个越来越强的判断。

AI 编程工具最大的风险不是代码质量下降，而是开发者思考能力的退化。

当你习惯了"不懂就问 AI"，你就不再去理解底层原理了。当你习惯了"生成然后微调"，你就不再从零设计架构了。当你习惯了 AI 帮你 debug，你就不再训练自己的排错直觉了。

这话可能会得罪很多人，但我觉得现在大部分开发者用 AI 编程工具的方式是错的。他们在用 AI 替代思考，而不是用 AI 增强思考。

区别在哪？用 AI 替代思考是，"帮我写一个用户认证模块"，然后把生成的代码粘贴进去。用 AI 增强思考是，"我设计了这个认证流程，帮我检查有没有安全漏洞"。

前者让你变成 AI 的搬运工。后者让 AI 变成你的放大器。

GitClear 的研究里有一句话特别精准，AI 生成的代码越来越像"一个流动的外包贡献者"的作品，容易违反 DRY 原则，不了解项目上下文，到处复制粘贴。

反正我觉得，如果你用了半年 AI 编程工具，离开它反而写不出代码了，那你没有被增强，你被削弱了。

## 怎么办

Aaron Levie 说了一句很到位的话，"未来的方向是写 agent 想要的软件，而不是人想要的。" 这话听着抽象，但落到实操上其实很具体。

试试这个，下次用 Claude Code 或 Cursor 的时候，先花 15 分钟自己想清楚方案，画个草图，写几行伪代码。然后再让 AI 帮你实现。你会发现输出质量完全不一样。

"Tokenmaxxing" 这个词造得好。它提醒我们，在一个 AI 可以无限生成代码的时代，稀缺的不再是代码，是判断力。

能写代码的人到处都是。知道该写什么代码、该删什么代码的人，才是真正的 10x 工程师。

## 相关链接

- [TechCrunch: 'Tokenmaxxing' is making developers less productive than they think](https://techcrunch.com/2026/04/17/tokenmaxxing-is-making-developers-less-productive-than-they-think/)
- [Latent Space: RIP Pull Requests (2005-2026)](https://www.latent.space/p/ainews-rip-pull-requests-2005-2026)
- [GitClear: AI 对代码质量的影响研究](https://www.gitclear.com/coding_on_copilot_data_shows_ais_downward_pressure_on_code_quality)

相关实体:: [[openai|OpenAI]] | [[anthropic|Anthropic]]
相关主题:: [[ai-coding-tools|AI编程工具]]
<!-- REACH: 8/10 | 品牌✓ 利益点✗ 可操作✗ -->
