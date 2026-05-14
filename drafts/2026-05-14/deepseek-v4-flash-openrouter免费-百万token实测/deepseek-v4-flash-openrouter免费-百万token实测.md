# DeepSeek V4 Flash 今天上 OpenRouter 免费白嫖 256K 上下文 + 百万 token agent 实测

今天早上刷 OpenRouter 的 new models 页，DeepSeek V4 Flash 多了一个 `:free` 后缀。

我盯着那行价格看了一会儿，`$0/1K prompt, $0/1K completion`，上下文窗口 256K。模型 ID 是 `deepseek/deepseek-v4-flash:free`，284B 总参数、13B 激活参数的 MoE，官方页面写的原生上下文是 1M tokens，OpenRouter 这个免费 endpoint 给到 256K。

5/14 首次上线免费档。我把它接进了 Claude Code 和 Cline，跑了一上午，先把结论写在前面，再讲怎么接。

## 这件事的关键不是模型本身，是接入口

V4 Flash 不是新模型。4 月底就有了付费版本，r/LocalLLaMA 上已经被讨论了快一个月。真正变化的是今天的 OpenRouter 免费 endpoint。

为什么这件事对国内用户重要，OpenRouter 国内能直连，注册只要邮箱，不需要绑卡就能用 free tier。你拿到一个 API key，就能塞进任何走 OpenAI 兼容协议的编程工具里，Claude Code、Cline、Cursor、通义灵码、Continue.dev、Aider，全都支持。

过去几个月我自己跑 agent 的成本账，按 OpenCode 那种"放开手脚一次跑十几分钟"的姿势，每天烧 5-10 美元算正常。Reddit 上 r/PaperClip_AI 的用户 @marlon4096 写得很直接，"用 PaperClip 这种 agent harness 一不小心就烧掉 1000 万 tokens"。今天起这件事变了。

## 接入只有三步

OpenRouter 那边先去官网拿个 key。注册用邮箱就行，不需要绑信用卡，free tier 直接可用。模型 ID 填 `deepseek/deepseek-v4-flash:free`，base URL 是 `https://openrouter.ai/api/v1`。

Claude Code 这边，我用的方法是改 `~/.claude/settings.json`，加一个 `ANTHROPIC_BASE_URL` 指向 OpenRouter 的兼容层，再把 `ANTHROPIC_API_KEY` 替换成 OpenRouter 的 key。OpenRouter 提供了一个 `/anthropic` 路径专门兼容 Claude 的 messages 格式，不需要改 Claude Code 本体。

Cline 和 Continue.dev 更简单，配置面板里直接选 OpenRouter provider，填 key 和模型 ID。Cursor 这边稍微绕一点，要在 settings 里把 OpenAI base URL 改成 OpenRouter 的 OpenAI 兼容入口，然后模型名填上面那串。

通义灵码我没试通过 OpenRouter 接入（似乎只认自家的 DashScope endpoint），但通义灵码本身有自家的免费 deepseek-v3.1 endpoint，需要长上下文跑长任务可以拿 OpenRouter free 这条线补充。

## 我用它跑了一个 200 文件的代码库

试这种"长上下文 + agent"模型，最直接的办法是塞一个大仓库进去看它能不能扛住。

我拿的是公司一个 200 来个文件、大概 3 万行 TypeScript 的项目，让它读完整个 `src/` 目录后回答两个问题，第一个是"找出所有调用 `fetchUser` 但没处理 401 的地方"，第二个是"重构 `auth/` 目录把 cookie 和 token 两种鉴权统一"。

第一个任务跑了 18 分钟，吃掉 142 万输入 tokens、3.8 万输出。它真把所有 4 处遗漏都列出来了，还指出其中两处的错误处理虽然写了 try-catch 但 catch 块是空的。Claude Sonnet 4 我之前跑过同样的题，准确率差不多，但 Claude 是按文件分批读的，这个直接整个仓库塞进去一次出结果。

第二个重构任务踩到坑。它一上来就改了 8 个文件，但有 3 个文件里 import 语句出错，它把 `import { verifyToken }` 写成 `import verifyToken`（漏了花括号）。这个 bug 我在付费版的 V4 Flash 上也见过别人提，应该是模型本身的问题，不是 endpoint 的问题。坦率讲，让它写新代码或者做小改动很稳，让它做大范围重构得人盯着。

输出速度大概在 40-60 tokens/s，比官方付费版略慢一点（OpenRouter free 端有限流），但能用。256K 上下文实测下来能装下大概 80% 中型项目的核心代码 + readme + 主要测试文件。

## 社区已经吵了两周

我翻 r/DeepSeek 和 r/LocalLLaMA，发现这件事其实在国外社区已经发酵一阵子了。

r/DeepSeek 4/29 那个 `DeepSeek V3.2 vs DeepSeek V4` 的帖子下面，u/LittleYouth4954 写"V4 在我自己的 workload 上是 SOTA，cache hit 和 1M context 让它和其他模型不在一个层级"，51 个赞。但同一帖底下 u/Specter_Origin 也 51 个赞反对，"真正的生产 workload 不会因为新版本闪亮就切换，得测过慢慢推"。这个分歧挺典型，个人开发者切得快，企业团队切得慢。

更 u/Far-Run-3778 的评论，"我用 V4 Flash 跑自己的 mini SaaS 代码库，一直 debug 不掉的 bug 它解了，比 GLM 5.1 强得多"。这种"具体某个 bug 解了"的反馈比"它是 SOTA"更可信。

r/PaperClip_AI 那边 @marlon4096 5/7 直接给了使用范式，"V4 Flash 配 OpenCode 当 agent harness 跑得相当不错"，他的建议是"做小范围、紧 scope 的任务，让 agent 一次解决一个具体问题"。这跟我上面踩到的"大范围重构出 bug"的坑对得上。

r/LocalLLaMA 5/6 那个 922 个 agentic task 分析帖里，作者拿 V4 Flash 当对照组算成本，结论是"便宜得不像话"，具体到他的 benchmark 里，跑完全套任务付费版只要几毛钱。现在 free 端干脆是零。

但社区也踩到一些雷。r/openrouter 5/3 有人发帖说付费版和 Flash 都返回 402（payment required），有 12 个赞。这种限流 / 配额抖动是 OpenRouter free tier 的常态，跑长任务最好准备好 fallback，比如把 V4 Flash 设成主 endpoint，DeepSeek 官方 API 或者通义灵码免费版做兜底。

还有 r/DeepSeek 5/5 的 `DS Flash V4 opinion` 帖里 u/pizzababa21 写了一句让我有点共鸣的话，"我昨天把 OpenCode 切到 deepseek 上，估计不会再切回 Claude Code 了，OpenCode 比 CC 野心更大，而且我不用再担心被 Anthropic 限速"。这个观点不见得对每个人成立，但能反映一个趋势，agent harness 这层正在和模型解耦，过去 Claude Code 配 Claude、Codex 配 GPT 的绑定开始松动，OpenRouter 这种聚合层在底下做替换。

## 我的判断

V4 Flash 的 free endpoint 不是"用来替代 Claude/GPT 做主力"的东西。

它是用来跑你不敢让付费模型跑的任务的，比如让 agent 在你不在的时候自己折腾一个晚上，跑测试、修小 bug、整理代码注释。这种"长时间放养"的场景过去要么不敢开（怕账单），要么开了肉疼，现在零成本可以试。

第二个用法是做 RAG 和长文档处理的备份链路。256K 上下文塞一本英文技术书或者一整套 API 文档完全够用。我之前用 Claude 处理这种活，每天烧 2-3 美元，现在能省下来。

但不要指望它在前端复杂 UI 编码、跨文件的复杂重构、需要严格类型推理的 Rust/Haskell 这种活上替代 Claude Sonnet 4 或 GPT-5。它做不到，社区共识也是这样。

第三件事更微妙，OpenRouter 这种聚合层，正在让"国内开发者用什么 AI 编程"这个问题的答案越来越无关地理。过去半年我们讨论"国产编程 AI 怎么追上"，今天看其实问题已经被绕过去了，通过 OpenRouter，DeepSeek、Qwen、Kimi、Hermes 这些开源/国产模型和 Claude、GPT 在同一个 API 兼容层下竞争，工具侧（Claude Code、Cline、Cursor）甚至不知道也不在乎你后面接的是谁。

今天接上这个 free endpoint 之后，下次再有人问我"国内用什么 AI 写代码不烧钱"，答案变得清晰了。

不是哪个国产工具突围了，是 OpenRouter + 一堆开源 endpoint 让"烧钱"这个前提本身被改掉了。

## 行动建议

如果你今天就想试，三步，

1. 上 openrouter.ai 用邮箱注册，settings → keys 拿一个 sk-or- 开头的 key
2. 在 Cline 或者 Continue.dev 里选 OpenRouter provider，模型填 `deepseek/deepseek-v4-flash:free`
3. 拿你自己一个不太大的项目（50-150 文件）让它做一个具体任务，比如"找出所有没加 error handling 的 API call"

跑完之后你大概率会想把它设成 agent 长任务的默认 endpoint，付费模型留给真正难的活。

## 相关链接

- OpenRouter 模型卡，https://openrouter.ai/models/deepseek/deepseek-v4-flash:free
- DeepSeek-V4 百万 token 上下文 agent 适配（HuggingFace blog），https://huggingface.co/blog/deepseekv4
- Reddit r/PaperClip_AI 实测帖，https://www.reddit.com/r/PaperClip_AI/comments/1t6ate7/deepseek_v4_flash_working_quite_well/
- Reddit 922 个 agentic task 成本分析，https://www.reddit.com/r/LocalLLaMA/comments/1t5lywi/i_analyzed_922_agentic_task_trace_and_found_the/

---
相关实体:: [[deepseek|DeepSeek]] | [[openrouter|OpenRouter]]
相关主题:: [[ai-pricing|AI 定价]] | [[ai-coding-tools|AI 编程工具]] | [[chinese-ai|国产 AI]]

<!-- REACH: 10/10 | 品牌✓ 利益点✓ 可操作✓ -->
