# xAI 推 Grok Build 0.1 编程模型 25.6 万上下文 价格只有 Codex 的零头

xAI 凌晨在 OpenRouter 上挂了一个叫 Grok Build 0.1 的编程模型，定价 $1 / $2 per 1M tokens，比同期 Codex 系列便宜了一个数量级。256K 上下文，专门为 agentic coding workflow 训练，文本加图像输入。

这次 xAI 不再炒"全能模型"，直接对标 Codex 做程序员市场。问题是，参数表漂亮不等于真能用。

## Grok Build 0.1 到底是什么

模型 ID 是 `x-ai/grok-build-0.1`，目前以 OpenRouter 为主要入口可调用。

几个值得说的参数。

上下文 256000 tokens，和 GPT-5 Codex 同档，比 Claude Code 默认 200K 略多。模态是 text+image 输入、text 输出，tokenizer 用的是 Grok 自家那套。

定价是真正的看点。Prompt $1 / 1M tokens，completion $2 / 1M tokens。同期 OpenAI 的 Codex 系列、Anthropic 的 Claude Sonnet 4.5，在编程档位上 input 报价普遍在 $3-$5、output 在 $10-$20 之间。Grok Build 这个挂牌价大致是 Codex 的五分之一。

官方介绍里强调"为 agentic software engineering workflow 训练"，"优化交互式编码"。翻译过来，主打的就是和 Cline、Aider、OpenCode 这类 agent 框架配合，不是定位成通用聊天模型。

## 横向对比，价格优势到底有多大

把同期主要编程模型摆在一起看。

Grok Build 0.1，256K 上下文，$1 / $2 per 1M，主打 agentic coding。

GPT-5 Codex 档位，256K 上下文，input/output 报价显著更高，OpenAI 自家 IDE 深度集成。

Claude Sonnet 4.5，200K 上下文，编程档位定价中高，Anthropic 自家 Claude Code 是体验最完整的 agent 入口。

国产这边，DeepSeek-Coder V3、Qwen3-Coder、GLM-Coder 普遍走"中等性能+极致价格"路线，input 普遍在 $0.3-$0.7、output 在 $1-$2，本来就是全球最便宜的一档。

Grok Build 这次的报价，对 OpenAI、Anthropic 是直接的价格挑战。但对国产编程模型来说，xAI 把价格打到了它们的舒适区里，且带着 Musk 的全球品牌势能。

## 我对参数漂亮的实测警告

Grok 系列过去一年的口碑曲线很有意思。

每次发布日，benchmark 都极其漂亮，arena 排名常常飙到前三。

但社区拿到 API 实际跑 agent 任务时，反馈两极化。优点是响应快、思考过程直白；缺点是工具调用稳定性、长上下文一致性、复杂指令服从性，这几项在第三方 eval（比如 SWE-bench Verified、Aider polyglot benchmark）里的表现，常常比官方宣传低一档。

这不是"Grok 不行"。这是"benchmark 友好的模型在 agent 场景里不一定友好"，这条规律对所有家都适用，Grok 系列尤其明显。

所以这次 Grok Build 0.1 上线，不建议看到价格就直接迁移生产工作流。我的建议 SOP 是。

第一步，在 OpenRouter 上拿到 key，先用 $1-$5 额度跑通调用。

第二步，挑三个你最熟悉的真实任务，比如 "在现有 React 项目里加一个表单页"、"修一个跑了两天没修出来的 bug"、"读懂一份陌生的 Rust 仓库再写一段功能扩展"。

第三步，同一个任务，分别在 Cline + Grok Build 0.1、Cline + 你现在的主力模型（Claude Sonnet 4.5 / GPT-5 Codex / DeepSeek-Coder）下跑一遍，记录三个指标，跑通耗时、工具调用错误次数、改回滚次数。

第四步，等一周。看 Hacker News、Reddit r/LocalLLaMA、X 上的 agent 工程师们晒出真实 trace。Grok 系列首发一周的舆论方向，过去几次都比官方 benchmark 更接近现实。

## 我的判断

xAI 这次的策略，比起做出更聪明的模型，更像是用价格杠杆撬动 agent coding 这块新增量市场。Musk 一贯的搅局打法，先把价格打穿，再用流量做后续增量。

对 Anthropic、OpenAI 来说，这构不成真正威胁。Claude Code 和 Codex 的护城河早就不在模型本身，而在 IDE 集成、agent 框架、长记忆系统、企业版的合规和审计能力。少数极客会冲价格切过去，主力开发者群体的迁移成本远高于"一行 API key 换一下"。

真正承压的是国产编程模型阵营。

DeepSeek-Coder、Qwen-Coder、GLM-Coder 这条线，过去一年的核心叙事就是"中等性能+极致价格+开源可本地"。现在 xAI 在国际市场用接近的价格、更强的品牌势能、更大的上下文，直接进了这个生态位。

国产模型的对策有两条路。一条是继续把价格往下压，另一条是把"中文场景理解 + 国内云生态深度整合 + 开源可本地部署"这套组合差异化做扎实。后者才是真护城河，价格战是打不赢 Musk 的。

最后说一句，Grok Build 标了 0.1 这个版本号，意味着 xAI 自己也清楚这只是第一发。真正决定它能否成为编程市场长期玩家的，不是这次的价格表，而是接下来三到六个月的迭代节奏，以及社区拿到真实任务跑出来的 trace 质量。

## 行动建议

如果你正在用 Cline、Aider、OpenCode 这类 agent 框架做日常编程，建议这周就上 OpenRouter 拿个 key 跑三个真实任务对比一下。OpenRouter 国内能直接访问，不需要任何额外配置。

如果你是国内云厂商或开源编程模型方向的从业者，建议密切跟踪 Grok Build 0.1 接下来一周的 Aider polyglot benchmark 第三方复测，以及 r/LocalLLaMA 上的 agent trace 讨论。这次价格挑战的真实强度，要看那批数据，不看官方介绍。

## 相关链接

- Grok Build 0.1 模型卡，https://openrouter.ai/models/x-ai/grok-build-0.1
- OpenRouter 主页，https://openrouter.ai/
- Cline GitHub，https://github.com/cline/cline
- Aider polyglot benchmark，https://aider.chat/docs/leaderboards/

---
相关实体:: [[xai|xAI]] | [[grok|Grok]] | [[grok-build|Grok Build]] | [[elon-musk|Elon Musk]]
相关主题:: [[ai-coding-tools|AI 编程工具]] | [[ai-pricing|AI 定价]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
