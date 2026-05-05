# Kimi K2.6 在编程基准上拿下多项第一，国产开源权重成本降一个数量级

4 月 30 日，Hacker News 首页冲上来一篇文章，标题直白——"一个开源权重的中国模型，在编程挑战里跑出了高于 Claude、GPT-5.5 和 Gemini 的分数"。

帖子来自一个叫 thinkpol.ca 的小博客，挂上去几个小时就刷到 316 分、176 条评论。讨论比文章本身热闹。

主角是 Moonshot 的 Kimi K2.6。开源权重，意思是模型文件能下、能改、能托管，不是只开 API。

## 编程榜单上的数据

先把数据摊在这里，省得后面有人说"又是国产自吹"。

K2.6 在几个不太能作弊的编程基准上的成绩，SWE-Bench Pro 58.6，SWE-bench Multilingual 76.7，HLE 带工具 54.0，BrowseComp 83.2，Toolathlon 50.0，Charxiv 配 python 86.7，Math Vision 配 python 93.2。

SWE-Bench Pro 是 GitHub 真实 issue 的修复测试，比早期那个 SWE-Bench 难得多，加了反作弊机制。Multilingual 是要求模型在 Rust、Go、Python、Java 多语种里都得能修代码。两个分数同时高，至少说明它不是只在一两种主流语言上偏科。

Moonshot 在博客里还写了一个数字，"4000+ tool calls，超过 12 小时的连续执行"。意思是 K2.6 能撑住一个长时间的 agent 任务循环不崩。这是当前 agentic coding 最难的部分，不是单步代码生成有多漂亮，是连续工具调用几千次之后，状态还没乱、目标还没飘。

r/abacusai 上那条 189 分的帖子写得具体，"K2.6 在 LiveBench 上分数高于 Opus 4.7 低端版本，在推理和编程维度的分差明显，agentic coding 方向上非常接近，我们内部 eval 双重验证过，成本是 1/10"。LiveBench 这个榜单的特点是题库滚动更新，模型预训练时见过的题会被淘汰掉，能在上面拿高分，至少说明它不是靠数据污染。

## HN 评论区在讨论什么

Hacker News 那 176 条评论里的几个观点，比 benchmark 数字更有信息量。

一类声音是，"硅谷其实早就在悄悄用中国开源模型，没人公开说而已"。这不是 K2.6 这条帖子的评论，是 r/Futurology 上一条 4666 分的帖子标题，但氛围是一致的。下面有 954 赞的评论说，"模型提供商被两头挤压，最后赢的是基础设施所有者，数据中心和英伟达"。

另一条 311 赞的评论更直接，"基础模型够 90-95% 的场景了，根本不需要 SOTA 模型。开源是免费的，他们会承担大部分基础工作"。

也有质疑的声音。r/accelerate 上有人转发 vals.ai 的 Vibe Code Benchmark 截图，指出 DeepSeek v4 在该榜单上的分数高于 K2.6，同时 Gemini 3.1 Pro 在部分维度也有不同的优势分布。意思是开源权重这条赛道现在轮换得很快，K2.6 的领先不是永久的。

但这恰恰是中国 AI 用户最该看的信号，开源权重的高分位置正在中国队和中国队之间频繁交换，国内可用、成本低的方案越来越多。

## 国内能怎么用，两条路

K2.6 现在能上手的路径有两条，都不需要任何境外网络。

**第一条，OpenRouter 接 Claude Code 替 Sonnet。**

Claude Code 默认走 Anthropic 的 Sonnet，但它支持配置自定义 endpoint。你在 OpenRouter 上搜 moonshot/kimi-k2-6 这个模型 ID，配置环境变量 ANTHROPIC_BASE_URL 指向 OpenRouter 的 anthropic-compatible endpoint，ANTHROPIC_API_KEY 填 OpenRouter 的 key，模型名指定为 K2.6。启动 Claude Code 后实际跑的就是 K2.6，但所有终端工具调用、agent 行为、文件编辑流程都和原生 Claude Code 一样。

这条路的好处是不动你的工具链，只换底层模型。坏处是 OpenRouter 的延迟和价格不如官方，但赢在国内可访问。

**第二条，Moonshot 官方 kimi-cli。**

Moonshot 官方 API 直连 Moonshot 自己的推理服务，性价比比 OpenRouter 转一手要高。如果你的工作流已经能脱离 Claude Code 的生态，kimi-cli 是更合算的选项。如果之前装过 kimi-cli，今天值得重新跑一次同一个任务，特别是涉及多语言项目或长时间 agent 任务的活，K2.6 这一版和 4 月初的版本不是同一个量级。

## 我的判断

K2.6 这次最值得关注的不是 benchmark 数字，是开源权重赛道的迭代节奏。

4 月 20 日 K2.6 发布，4 月 24 日就有 DeepSeek v4 出来打榜。这种四天换一次领先位置的节奏，在闭源那边是不存在的。Anthropic 从 Sonnet 4.6 到 4.7 隔了两个月，OpenAI 从 GPT-5.5 到 GPT-5.5.1 隔了一个多月。

对中国 AI 工程师来说，结论很现实：不要押注任何一个具体型号是"长期最优解"，把工作流搭在能切换底层模型的工具上，OpenRouter / Claude Code / kimi-cli 这种壳子比任何具体模型都更值得熟悉。今天 K2.6 分数高，下个月可能就是 DeepSeek v5 或 Qwen 4 Max。

另一个判断，对于 90% 的日常编程任务，开源权重已经够用。如果你每月在 Cursor 或 Claude API 上花几百美元只是为了写 CRUD、改 bug、写测试，K2.6 这种开源权重通过 OpenRouter 跑，账单会下来一个数量级。

## 下一步

OpenRouter 注册一个账号，充 5 美元，把现有 Claude Code 的 endpoint 切到 K2.6，挑一个你已经熟悉的中等复杂度任务跑一遍。比如给一个开源项目提一个 PR，或者重构一个 200 行的函数。跑完和你之前用 Sonnet 的体感对比一下。

只跑 hello world 是看不出差距的。要跑就跑你真正在做的活。

跑完欢迎留言说差距在哪，特别是哪种任务上 K2.6 不理想、哪种任务上表现超预期。这种一手反馈比 benchmark 数字有用十倍。

## 相关链接

- Kimi K2.6 官方博客，https://www.kimi.com/blog/kimi-k2-6
- HN 讨论原贴，https://news.ycombinator.com/item?id=47993235
- Moonshot kimi-cli 仓库，https://github.com/MoonshotAI/kimi-cli
- OpenRouter Kimi 模型页，https://openrouter.ai/moonshotai/kimi-k2

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
