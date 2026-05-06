# ChatGPT 默认模型悄悄换了，OpenAI 把幻觉砍掉一半

5 月 5 日，OpenAI 把 ChatGPT 的默认模型从 GPT-5.3 Instant 换成了 GPT-5.5 Instant。

这事在国内没什么动静，但数字摆在那儿，OpenAI 自评幻觉率降了 52.5%。

上个月我们写过 "ChatGPT 卸载量飙 132%" 那篇，留了一个问题，OpenAI 拿什么把用户拉回来。一个月之后答案出来了，是减幻觉。

## 数字先摆着

OpenAI 在 GPT-5.5 Instant 的 system card 里给了两个对照口径，都是和上一代默认模型 GPT-5.3 Instant 比。

第一个口径，"高风险场景"，覆盖医疗、法律、金融三类提示。GPT-5.5 Instant 比 GPT-5.3 Instant 少了 52.5% 的幻觉性陈述（hallucinated claims）。

第二个口径，"用户标记的特别困难对话"，是 ChatGPT 内部从历史聊天里挑出的、被用户标过 "事实出错" 的那批 prompt。GPT-5.5 Instant 在这批上把不准确陈述减少了 37.3%。

两个数都是内部评测，不是公开 benchmark。这点必须先讲清楚，不然容易被 "52.5%" 这种数字带着跑。但 OpenAI 把数据写进 system card 而不是发推文，意味着他们至少愿意承担一些可复核压力。

技术 benchmark 那一侧也有数字。AIME 2025 数学测试 GPT-5.5 Instant 得 81.2 分，GPT-5.3 Instant 是 65.4 分；MMMU-Pro 多模态 76 分，对手 69.2 分。这两条不是 "减幻觉" 维度，是顺手长出的能力。

## 为什么是减幻觉

ChatGPT 过去半年最大的舆论压力就是 "瞎编"。律师拿 ChatGPT 写的判例进法庭被法官当场抓出来引用了不存在的案件，医疗咨询里编药物剂量，这些事在英文圈传播得很广。Verge 那篇标题是 "OpenAI claims ChatGPT's new default model hallucinates way less"，用了 "claims" 这个词，意思是媒体也不打算照单全收。

但 OpenAI 选择把高风险场景作为重点叙事是有道理的。普通问答的幻觉用户骂两句就过了，医疗法律金融三类的幻觉直接出事故。这是把 "ChatGPT 能不能在严肃场景被信任" 当成下一阶段产品定位在打。

减幻觉路径上，OpenAI 在 system card 里没披露具体方法，但和最近半年学界主流方向一致，更强的事实锚定（grounding）、更频繁的不确定性表达、对回答置信度的内部校准。这是模型层面的事，不是套个 RAG 就能解决。

顺带说一句，GPT-5.5 Instant 还把 "记忆来源" 这个能力开放到了所有模型，用户可以查、删、改 ChatGPT 记住了哪些事。共享对话时记忆来源不会暴露给对方。这是产品侧的合规动作。

## 国产 default 模型的迭代节奏

把这个时间轴拉开看会有意思。

DeepSeek V4 在 4 月 24 日发布预览版，V4-Flash 成了官方默认模型，284B 总参数、13B 激活，1M 上下文成了官网全线默认。Pro 版本 1.6T 参数 49B 激活，走 MoE 极致规模路线。

Kimi 这边节奏更密。月之暗面 1 月把网页端从 K2 自动切到 K2.5，4 月 20 日 K2.6 上线全平台（kimi.com / App / API / Kimi Code CLI）。K2.6 是 1T 参数稀疏 MoE，32B 激活，256K 上下文，原生 INT4 权重，开源走修改版 MIT 协议。

豆包则在 2 月 14 日发布了大模型 2.0，跨代升级，C 端豆包 App 当前跑的是 1.6 技术。

把这几条线和 GPT-5.5 Instant 摆在一起看，2026 年 4-5 月这一个月里，全球四家头部都把面向用户的默认模型换了一遍。OpenAI 走 "减幻觉 + 产品体验"，DeepSeek 走 "把长上下文做成默认 + 开源 MoE 极限规模"，Kimi 走 "开源 + 多平台同步切换"，豆包走 "跨代基座升级 + 矩阵化"。

这里有个值得留意的点。OpenAI 这次没有像 GPT-4 → GPT-5 那样换大版本号大叙事，而是给一个 ".5 Instant" 的小步迭代，配合幻觉率这种可量化的窄维度。这套打法和 DeepSeek V4-Flash 把 "1M 上下文做成默认" 是同一个套路，找一个用户能直接感知的窄口径打透。

国产这一侧也在做类似的窄口径打法，但目前还没有哪家把 "幻觉率" 单独拿出来写进 system card 当一级叙事。这是个空位。

## 国内能不能用

GPT-5.5 Instant 在 ChatGPT 里直接接管对话，免费 / Plus / Pro / Go Business / 企业版未来几周陆续替换完。API 端走 `chat-latest` 这个别名，OpenRouter 已经上线 `openai/gpt-chat-latest`，价格是 $0.000005/1K prompt、$0.00003/1K completion，400K 上下文。

国内开发者要调，路径是 OpenRouter 或 Azure OpenAI 的国内可访问镜像。`chat-latest` 是个动态指针，永远指向 ChatGPT 当前默认的那个 Instant 模型，OpenAI 滚动更新这个 alias 也会跟着滚。所以呢如果你在生产里用，得做好"明天醒来模型已经换"的准备，对应的 prompt 兼容性测试要常态化。

GPT-5.3 Instant 还会在 API 里保留三个月，给迁移留窗口期。

## 我的判断

ChatGPT 把 "幻觉率降 52.5%" 当成主叙事推出来，对国内做应用层的人有两个直接含义。

第一，medical / legal / finance 三类垂直 agent 应用，过去半年 "用 GPT 不靠谱" 的事故陈述要重新评估了。不是说现在就靠谱了，是说底层基线在动，你的 RAG 层 / fact-check 层的边际收益可能在下降。

第二，国产 default 模型如果想接上同一波叙事，"高风险场景幻觉率" 是一个还没被占住的口径。DeepSeek V4 / Kimi K2.6 / 豆包 2.0 在做榜单和长上下文，但都没把医疗 / 法律 / 金融三类场景的事实准确率拿出来单独说。这是国内大模型公司的下一个内容机会。

至于普通用户层面，ChatGPT 默认模型换没换，绝大多数人不会感知到。但如果你是在用 ChatGPT 做严肃工作（写合同、查文献、做财务分析），值得在接下来一周里专门跑几个高风险 prompt 对比一下，看是不是自己的体感跟得上 OpenAI 的内部评测。

体感跟得上，那 "ChatGPT 卸载量飙 132%" 这个故事就翻篇了。跟不上，那就是 system card 里的数字和真实 distribution 之间永远差着一段。

## 相关链接

- GPT-5.5 Instant 发布博客 https://openai.com/index/gpt-5-5-instant
- GPT-5.5 Instant System Card https://openai.com/index/gpt-5-5-instant-system-card
- The Verge 报道 https://www.theverge.com/ai-artificial-intelligence/924225/openai-chatgpt-default-model-gpt-5-5-instant
- TechCrunch 报道 https://techcrunch.com/2026/05/05/openai-releases-gpt-5-5-instant-a-new-default-model-for-chatgpt/
- OpenRouter `chat-latest` 别名 https://openrouter.ai/models/openai/gpt-chat-latest
- DeepSeek V4 预览 https://api-docs.deepseek.com/news/news260424
- Kimi K2.6 https://kimi-k2.org/zh/blog/24-kimi-k2-6-release

相关条目，[[openai|OpenAI]] [[chatgpt|ChatGPT]] [[gpt-5-5|GPT-5.5]] [[deepseek|DeepSeek]] [[kimi|Kimi]] [[doubao|豆包]]，主题 [[ai-research|AI 研究]] [[ai-product-experience|AI 产品体验]] [[chinese-ai|国产 AI]]。

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
