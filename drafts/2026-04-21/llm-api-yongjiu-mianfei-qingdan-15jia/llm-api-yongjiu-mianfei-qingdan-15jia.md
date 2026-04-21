# 我把"永久免费"的 LLM API 挨个撸了一遍，15 家里只有 6 家真能长期当饭吃

先说结论，别看推特上那种"一年免费 API Key"的截图再激动了。

真正能长期白嫖的清单，其实早就在 GitHub 上挂着，叫 awesome-free-llm-apis，15 家提供商，Gemini、Groq、Cerebras、GitHub Models、Cloudflare、NVIDIA、SiliconFlow 这些都在里头。

我花了一下午把能开的账号都开了一遍，挨个跑 Claude Code 和一个小 RAG Demo，踩出来一份"哪些真能当生产力用、哪些只能当玩具"的笔记。

不卖关子，先把能打的 6 家放出来。

## 这 6 家是真的每天都能用

**Google Gemini 2.5 Flash**，1M 上下文，10 RPM、250 RPD。这个额度你别嫌少，250 次请求一天足够一个小工具跑一整天了，关键是 1M context 意味着你可以把整本书、整个仓库丢进去让它读，这件事其他免费档基本做不到。我现在个人的"阅读助理"就挂在这条线上，跑了两个月没掉过链子。

**Groq Llama 3.3-70B**，30 RPM、14.4K RPD。Groq 的卖点从来不是模型，是速度，它那颗 LPU 吐 token 基本是瀑布式的，同样一个问题 OpenAI 要 8 秒 Groq 不到 1 秒。14.4K RPD 这个量级，挂一个小 Agent 自动跑任务都够用。

**Cerebras gpt-oss-120b**，30 RPM、1M TPD。跟 Groq 一个路数，硬件加速推理，速度比 Groq 还快一点。120B 的模型免费给你跑，这事放在一年前不敢想。唯一的槽点是排队，早晚高峰偶尔会被限流，白天写代码时间段得错开。

**GitHub Models GPT-4.1**，1M 上下文，10 RPM、50 RPD。50 RPD 确实少，但你算一下，写代码的时候一天也就几十次请求，够了。关键是它真是 GPT-4.1，不是什么阉割版，走 OpenAI SDK 改个 base_url 就能跑，API Key 直接用你 GitHub 账号的 PAT。这家我判断是偷偷白嫖 GPT-4 的最佳路径。

**Cloudflare Workers AI Llama 3.3-70B**，131K 上下文，每天 10K neurons 额度。neurons 这个计量单位有点烦，换算过来大概够跑几百次 70B 的推理，日常够用。好处是整个链路在 Cloudflare 边缘节点上，国内访问延迟低得吓人。

**SiliconFlow Qwen3-8B**，1,000 RPM、50K TPM。硅基流动是这里唯一的国产平台，额度给得最大方，1000 RPM 基本等于不限速。模型只有 Qwen3-8B 免费档能打，但 8B 写点简单脚本、做分类、做 embedding 够用了，延迟在国内也是秒级。

## 剩下 9 家，我劝你别抱期待

**Cohere Command R+**，20 RPM 看着还行，但它的免费 tier 是"trial"性质，官方文档里写得含糊，我用了两周发现偶尔会给你降级到小模型，坑。

**Mistral Large 3**，文档说 ~1 RPS、500K TPM，理论参数漂亮，实际你连账号都不好注册，国内手机号进不去，得换欧洲卡才能开。

**Z AI 的 GLM-4.7-Flash**，200K 上下文听着很爽，但它那个"1 concurrent"是什么意思呢，就是同一时间只能有一个请求在跑，并发为 1。你写个 Agent 多线程直接卡死，只适合单人单线程聊天。

**NVIDIA NIM**，~40 RPM 这个限速我实测跑不满，经常跑两三次就被人为降速了。老黄前阵子搞的那个"一年免费送 API Key"其实就是 NIM 换了个马甲，本质一样，热度过了就会开始缩。

**Hugging Face 的 Inference API**，~1,000 RPD 听着不错，但这是所有模型共享的额度，你一跑大模型它分分钟让你排队，上游模型加载慢到怀疑人生。

**OpenRouter :free**，20 RPM、200 RPD，最大的问题是模型每周都在换，上周能跑的 DeepSeek-R1:free 这周就可能变成别的型号，做稳定服务不行，打着玩可以。

**Kilo Code**，这家很多人没听过，Minimax 和 Stepfun 混着给，~200 req/hr，问题是它本质是 Claude Code 的分发渠道，你当 API 用就不如直接上 Groq。

Cohere、Mistral、NVIDIA、OpenRouter、HF、Kilo，这六家加起来的价值，不如 Gemini 一家。我是真的这么觉得。

坦率讲 NVIDIA 那个"一年免费送 API Key"的热搜，比起这份长期清单其实没那么实在，一年期限过了你又得重新折腾，这份清单里 Gemini 和 GitHub Models 已经挂了两年以上，稳得一批。

## 我是怎么组合的

资深开发者的用法其实很俗气，就是"主备分流"。

我自己的组合，Gemini 做主力（上下文大、稳定），Groq 做快速兜底（延迟低、适合交互），GitHub Models 做写代码专用（GPT-4.1 真是没替代品），SiliconFlow 做国内兜底（延迟低、不需要梯子）。

四条线全挂在 LiteLLM 的 router 上，按 rate limit 自动切换，哪条线满了切下一条。一天下来大概跑 1500-2000 次请求，零成本。

有人会说，免费的东西迟早要涨价。对，我同意。但你想想看，自从 DeepSeek 去年把价格打穿之后，整个行业是在往更便宜的方向跑的，不是往更贵。GPT-4.1 现在在 GitHub Models 里免费，一年前谁敢信。

## 一份清单该怎么用

这份 awesome-free-llm-apis 的仓库我已经 star 了，作者每周都在更新，有新家进场或者旧家改政策都会标。直接打开 GitHub 搜 mnfst/awesome-free-llm-apis，挨个申请账号，半小时能拿齐 10 个 Key。

如果你只想开三家，我的推荐顺序是，Gemini、Groq、GitHub Models。

如果你想做一个稳定的小工具或者 Agent，别单押任何一家，上 LiteLLM 或者 OpenRouter 做 fallback，这比任何单家的"永久免费"承诺都靠谱。

最后一个问题留给你，你现在最常用的免费 LLM API 是哪家？评论区交流一下，我也想知道有没有被我遗漏的冷门宝藏。

---

相关链接

- awesome-free-llm-apis 仓库 https://github.com/mnfst/awesome-free-llm-apis
- Google Gemini API 申请 https://aistudio.google.com/apikey
- GitHub Models 入口 https://github.com/marketplace/models
- Groq Cloud https://console.groq.com
- Cerebras Inference https://cloud.cerebras.ai
- SiliconFlow https://siliconflow.cn

---
相关实体:: [[google|Google]] | [[openai|OpenAI]] | Groq | Cerebras
相关主题:: [[ai-pricing|AI定价]] | 免费资源

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
