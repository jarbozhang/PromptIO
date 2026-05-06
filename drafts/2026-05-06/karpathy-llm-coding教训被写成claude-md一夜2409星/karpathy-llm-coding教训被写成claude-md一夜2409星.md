# Karpathy 的 LLM 编程踩坑教训被写成一个 CLAUDE.md，一夜涨了 2409 颗星

我刷 GitHub Trending 那天，今日新增 stars 排第一的不是什么 agent 框架，也不是新模型权重，是一个**只有一个 CLAUDE.md 文件的仓库**，`forrestchang/andrej-karpathy-skills`，单日 +2409。

仓库点开，一个 README，一个 CLAUDE.md，正文 4 节、不到 60 行。

这事让我有点上头。我手边的 Claude Code 工作流已经堆了一堆碎片化的 rules，从 4/24 那次"Claude Code 变笨"事件之后，我自己也写过一版 CLAUDE.md，但越写越像规章制度。看到这个版本我第一反应是，它凭什么 2409 星。

把它装进我自己的 PromptIO 项目跑了一周，我觉得我有资格回答这个问题了。

## 这 60 行写了什么

forrestchang 把 Karpathy 在 X 上零零碎碎吐槽过的"LLM 写代码翻车点"，归纳成 4 条原则。我按原文翻译并加注，国内开发者直接对号入座。

**1. Think Before Coding，写之前先想**

原文一句话立威，Don't assume. Don't hide confusion. Surface tradeoffs.

落到执行就是 4 条，假设要写出来不能默认；有多种解读时不要偷偷选一个；如果你看到更简单的方案要顶回去；不清楚就停下问。

中文场景，这条就是治"AI 一上来就开始写"。我写 PromptIO 的 RSS 抓取脚本，需求其实有"是否带重试"、"是否合并源"两个可选项，老版本 Claude Code 直接帮我做主了，全堆上 retry，然后我得回头删。

**2. Simplicity First，能 50 行别写 200 行**

- 不实现没要求的功能
- 不为单次使用的代码做抽象
- 不加没人要的"灵活性"和"可配置性"
- 不为不可能发生的场景做错误处理
- 写到 200 行能压到 50 行就重写

最后一句最狠，"Would a senior engineer say this is overcomplicated? If yes, simplify"。中文圈很多人写代码喜欢"先把架构铺好"，AI 学了这个习惯就会把一个 30 行的脚本写成带 plugin 系统的小型框架。

**3. Surgical Changes，外科手术式改动**

只动你必须动的，只清你自己制造的烂摊子。

- 别"顺手"优化相邻代码、注释、格式
- 别 refactor 没坏的东西
- 哪怕你不喜欢，也要遵循已有风格
- 看到无关的死代码可以提一句，但不要删
- 你的改动产生的孤儿（unused import / 函数）才清

判断标准是"每一行改动都能追溯到用户的请求"。这条对国内做老项目维护的人尤其有用，AI 一上手改老代码爱顺手"美化"，commit 一打开 100 行变更只有 10 行是真的需求。

**4. Goal-Driven Execution，把任务变成可验证目标**

- "加个校验" → "为非法输入写测试，让它通过"
- "修这个 bug" → "写一个能复现 bug 的测试，让它通过"
- "重构 X" → "确保前后测试都通过"

多步任务先列简短计划和验证 checkpoint。

这条本质是逼 AI 把"我做完了"换成"我跑过了"。Karpathy 在 4 月那条 25K likes 的"AI 能力认知鸿沟"贴里也强调过，能用上 Claude Code、Codex 的 power user，靠的就是把模糊任务转成可验证的循环。

## 为什么是 60 行就 2409 星

我去 r/ClaudeAI 翻评论，最高赞的回答只有一句，"because a lot of people pressed the star button"。第二高赞那条更扎心，"Mostly because it's easy to copy, it has Karpathy's name on it, and it speaks to a real pain point"。第三条来自 u/martin1744，203 赞，"turns out everyone needs the same parental controls for AI"。

每个用 Claude Code 的人都需要给 AI 装一个"家长控制"。

我在 4/24 那篇拆 Opus 4.7 system prompt 的文章里写过，Anthropic 自己的系统 prompt 也在反复教模型"先确认意图、不要过度发挥、改动要小"，这跟 forrestchang 这份 CLAUDE.md 内核**完全一样**。一个是 Anthropic 内部对模型的约束，一个是用户侧对模型的约束，两边都在打同一类毛病。

Karpathy 这次没亲自下场写代码，他只是在 X 上反复喊过"LLM 编程的真正问题是它不知道何时该问问题、何时该停手"。forrestchang 把这些散落的吐槽收成 4 条规则，刚好踩中所有重度用户共鸣点。

## 装上一周，我观察到的差别

我把这份 CLAUDE.md 直接塞到 PromptIO 项目的根目录，覆盖了我自己原来那版 200 行的 rules。一周下来对比项目最近 30 个 commit 的 diff 模式，三个变化最明显。

**第一，开始问问题了。** 让它给文章生成脚本加"按 voice 分流"逻辑，老版本会直接编一套 voice 字典硬塞，新版本第一句是"voice 是指你 prompt 里写的 first-person/narrative/analytical/retro 这四种吗，还是另有定义"。我才反应过来，PromptIO 项目里 voice 这个词在两个 prompt 文件里其实定义不一致。这种问题以前都是写完才暴露。

**第二，diff 变小了。** 我抽了 7 个 commit 看，平均改动行数从原来的 80 行降到 30 行左右。最直观的差别是不再"顺手"重写注释和导入顺序。

**第三，开始写测试再写代码。** 这条变化最反直觉。我没要求 TDD，但 Goal-Driven Execution 那条让模型把"修 bug"自动翻译成"写复现测试 → 让它过"，结果就是它自己先写一个 minimal repro 的脚本跑给我看。

但也不是没坑。

第一次它在改 fetch 脚本时"过度遵守"Surgical Changes，看到一个明显写错的变量名也不动，commit 之后我才发现。Surgical Changes 的本意是不要主动改无关代码，不是"哪怕看到了 bug 也假装没看见"。

第二次 Simplicity First 让它"too simple"，我让它写一个支持多种 RSS 源格式的解析器，它真的只写了一种通用 case，没处理 Atom 和 RSS 1.0 的差异。后来我得加一句"这个脚本要消费 config/sources.yaml 里所有 24 个源，覆盖 RSS 1.0/2.0/Atom"。

## 我的判断

这份 CLAUDE.md 不是模板，是清单。

直接抄进自己项目用一两天就够了，关键是把它当成调试 AI 行为的对照组。你装上之后会发现，过去一年你跟 AI 抗争的 90% 时间都在跟这 4 条原则的反面在打架，它过度假设、过度抽象、过度改动、过早宣布完成。

这 4 条原则的真正价值不是它写得多好，是它给了你一个**和 AI 对齐的术语表**。下一次 AI 又开始过度发挥，你不用解释一大段，你只要说"这违反了 Surgical Changes"，模型立刻就知道你在说什么。

国内开发者下一步可以做两件事。

一，把这份 CLAUDE.md 直接 fork 到自己常用的项目根目录，不要做任何"中国特色"加工。它的好就好在通用。

二，过 5-7 天回头扫一下 git log，看自己 commit 的平均行数有没有变化，是不是少了"顺手优化"的提交。如果这两个数字明显改善，说明它对你这条流水线确实生效。如果没变化，可能你需要的不是规则，是换个模型。

那个曾经"什么都帮你做主"的 AI，是时候被你重新驯化一遍了。

## 相关链接

- forrestchang/andrej-karpathy-skills 仓库，https://github.com/forrestchang/andrej-karpathy-skills
- r/ClaudeAI 的 2321 赞讨论贴，https://www.reddit.com/r/ClaudeAI/comments/1stfoo7/why_does_this_claudemd_file_have_so_many_stars/
- 我之前写的 4/24 Opus 4.7 system prompt 拆解（同一类约束的另一面）

[[karpathy|Karpathy]] [[anthropic|Anthropic]] [[claude-code|Claude Code]] [[forrestchang|forrestchang]] [[ai-coding-tools|AI 编程工具]] [[methodology|方法论]] [[ai-workflow|AI 工作流]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
<!-- xhs_pass: true -->
