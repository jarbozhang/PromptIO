# OpenAI realtime 2 API 推新语音模型，国产实时语音（火山/通义/智谱）该怎么对照

5 月 7 日 OpenAI 同时干了两件事。

一件是发博客 "Advancing voice intelligence with new models in the API"，把第二代 realtime 语音模型推上 API。一件是 `openai-python` 仓库直接合了 v2.36.0，commit 标题写得很短，就 "feat(api): realtime 2"。

这两件事合在一起的意思是，开发者今天 `pip install -U openai` 就能调到新模型，不用排队等 waitlist。

## 新模型到底加了什么

OpenAI 博客原文只给了三个动词，reason、translate、transcribe，以及一句 "more natural and intelligent voice experiences"。具体延迟数字、定价、多语种榜单，博客里没列。

但 SDK v2.36.0 的 commit diff 把底牌透了不少。把 28 个改动文件读一遍，能拼出几条硬信息。

新增了 `gpt-realtime-2` 这个模型 ID，是这一代的主力。配套还塞了个叫 `gpt-realtime-whisper` 的转录模型，独立可用，对应博客里 transcribe 那条线。

更关键的是新加了一组 `RealtimeReasoning` 相关的类型，里面 `RealtimeReasoningEffort` 枚举了 minimal、low、medium、high、xhigh 五个档。这是把 GPT-5 那套 reasoning effort 旋钮直接拧进语音 session 了，对应博客里 reason 那条线。Reddit 上 r/aicuriosity 的帖子里有人形容成 "GPT-5 级 reasoning 进入 live 对话"，意思是同一个。

第三个能动的旋钮是 `parallel_tool_calls`，布尔值，允许语音 session 同时调多个工具。还有一个 `delay` 参数挂在音频转录上，开发者自己可以调转录回包的节奏。

这些都是 SDK 里能直接看到的形状，不是博客文案。

## 为什么"同时推 SDK"这件事重要

OpenAI 历史上发新东西，常见姿势是博客先发、API 等几周、SDK 等更久。这次 5 月 7 日上午 10 点博客挂出，下午 5 点半 SDK 就 tag 了 v2.36.0。

中间隔了大概七个半小时。

对一线开发者，这个时间差等于 "演示 demo 和能交付的东西"是同一个东西。Reddit r/OpenAI 上有人 5 月 9 日就发了实测笔记，标题叫 "Notes from testing GPT-Realtime-2 with a context-heavy voice app"，跑的是一个国家公园路线规划应用，session 里已经预加载了公园描述、天气、营业时间这类结构化上下文。同一作者还在 r/webdev 发了一篇姊妹帖，名字是 TrailVerse，主打 "tap mic 一下问 trip planning"。

48 小时里，社区里就长出来一个能跑、能讲清楚的 case。

## 社区的另一种声音

不是所有人都买账。

r/singularity 的 launch 帖底下，u/JHorbach 留了一句 "API only? Meh"，18 赞。意思很直白，没有 ChatGPT 客户端层面的更新，对普通用户没感知。

更扎心的是 u/3ntrope 的 12 赞评论，"Realtime for TTS/STT through APIs is mostly pointless now because local models have gotten good enough. I'm sure OAI's models are a bit smarter and maybe a bit higher quality but in practice the latency..."。后半句话被截断了，但前半句的判断是清楚的，本地跑的 STT/TTS 已经追到 "够用"，云端 API 的边际价值在收窄。

r/accelerate 那条 224 赞的帖子里，u/MisterBanzai 的留言更具体，他说自己一直在折腾让 OpenClaw 在 Discord 上跟自己语音聊天，全程用本地 STT 和 TTS，"即使做了所有优化，还是 h..."（同样被截断，从语境看是 "hard" 或 "high latency"）。

这条评论顺手把一个现实暴露了。即便是愿意折腾本地栈的极客，做到 "自然对话"这一步依然是难的。所以 realtime 2 的真正卖点未必是 "更快"，而是 "把 reasoning + 工具调用 + 转录三层在 server 端打通到能撑产品级 voice agent"。

至于会不会被 Codex app、ChatGPT app 内置，r/codex 那条帖子的反复留言只能说 "Cant wait"，OpenAI 自己没承诺时间表。

## 国内对照，五家各自的形态

OpenAI realtime 2 这一代主打 reason、translate、transcribe 三合一，并且全部走同一个 realtime session。国内现在能对照的有这么几条线。

火山引擎实时语音，挂在豆包大模型体系下，主要市场是 AI 客服、教育、车机这类 to B 高频场景，SDK 体系比较厚，端到端延迟在官方文档里以毫秒级宣传，跟字节内部的飞书、抖音同款链路打通是它的本钱。

阿里通义这边对应的是 Qwen-Audio 系，模型本身偏多模态理解，实时对话能力近期在通义 App 和魔搭社区都能体验到，开源版的权重也放出来过，开发者愿意折腾的话有本地化跑通的路径。

智谱 GLM-4-Voice 是国内开源派里最接近 OpenAI Voice 形态的，端到端语音对语音，权重在 Hugging Face 镜像和魔搭都有，社区已经有 Demo 跑通。它的优势是开源，劣势是没有 OpenAI 那种把 reasoning effort 旋钮直接拧到 session 上的成熟封装。

Kimi 语音通话和腾讯混元 Audio 偏 ToC 端，前者在 Kimi App 里已经面向所有用户上线，后者主要服务腾讯系产品矩阵。两家都没把 API 形态作为核心叙事，更像 "把语音能力做到自家入口里"。

具体定价、延迟、多语言覆盖度，各家口径不一，公开文档也在频繁变化，这里就不列对比表了。开发者要选型，去对应的 OpenAPI 控制台跑一次 hello world 是最快的路径。

## 我的判断

OpenAI 这次的真正动作不在 "新模型更聪明" 这一面。`gpt-realtime-2` 的语音质量可能比第一代好半档，但社区里 "API only? Meh" 这种声音说明，普通用户感知不到这种半档提升。

真正会改变开发者选型的是把 `reasoning_effort=high` 这个旋钮直接放进语音 session 这件事。

国内做 AI 客服的同行，过去半年的工程难点不是 ASR 和 TTS，是 "客户问一个复杂问题，机器人能不能想清楚再回话"。原来的实现是 ASR 拿到一句话、丢给 GPT-4o 或国产大模型推理、推理结果再丢给 TTS，三段式凑出来的。realtime 2 把推理拽进同一个 session 之后，状态可以延续，工具可以并行调，转录可以单独取。

国产替代里，火山引擎在工程封装上离这个形态最近，但默认链路里 reasoning 这一段还是单独的大模型节点。智谱 GLM-4-Voice 在端到端结构上最像，但工程化深度还差一截。通义那边的多模态底子在，但实时 session 的产品化不如前两家。

对国内做 AI 老师、AI 直播间、AI 视频实时配音这类场景的团队，我的建议是先用 realtime 2 跑通一遍 demo，把 reasoning effort 的几个档位都试一遍，看看自己的业务到底需要 minimal 还是 high。摸清楚需求之后，回头看火山或智谱够不够用，是工程问题，不是模型差距问题。

差距是有，但差距没大到 "必须用 OpenAI" 那一步。

## 相关链接

- OpenAI 博客原文，[Advancing voice intelligence with new models in the API](https://openai.com/index/advancing-voice-intelligence-with-new-models-in-the-api)
- openai-python v2.36.0 [release notes](https://github.com/openai/openai-python/releases/tag/v2.36.0)
- realtime 2 commit diff，[8fe0ab8](https://github.com/openai/openai-python/commit/8fe0ab8)
- 智谱开源 [GLM-4-Voice 仓库](https://github.com/THUDM/GLM-4-Voice)
- 阿里 [Qwen-Audio 仓库](https://github.com/QwenLM/Qwen-Audio)

---
相关实体:: [[openai|OpenAI]] | [[volcano-engine|火山引擎]] | [[alibaba|阿里]] | [[zhipu|智谱]] | [[kimi|Kimi]] | [[tencent|腾讯]] | [[bytedance|字节跳动]]
相关主题:: [[voice-ai|语音 AI]] | [[multimodal|多模态]] | [[chinese-ai|国产 AI]]

<!-- REACH: 7/10 | 品牌✓ 利益点～ 可操作✓ -->
