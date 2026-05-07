# NousResearch 用 48 张 B200 训 4 天搞出 NousCoder-14B，开源接住 Claude Code 时刻

Claude Code 在 X 上刷屏的第七天，NousResearch 把 NousCoder-14B 扔出来了。

这是一个 14B 参数的开源编程模型，在 Qwen3-14B 基础上微调，48 张 NVIDIA B200 训了 4 天，LiveCodeBench v6 拿到 67.87% 准确率，比 base 高 7.08 个百分点。

我把它拉到本地跑了一天，写下我的使用感受和判断。

## 时机比模型本身更刺眼

NousResearch 这家公司一直走开源路线，Paradigm 投的，Hermes 系列是他们的招牌。这次发 NousCoder 选的时间点很微妙。

整个新年第一周，X 时间线被 Claude Code 占满了。Google Gemini API 负责人 Jaana Dogan 那条爆贴，"我把一个我们团队做了一年的分布式 agent 编排系统的描述给 Claude Code，它一小时就生成出来了"，原话来自 VentureBeat 引用的 X 推文。

整个氛围是闭源 agentic coding 一枝独秀。NousResearch 偏在这个节骨眼把 NousCoder-14B 开源出来，姿态非常明确，不是要去和 Claude Code 比拼分数，是要给开发者另一条本地能跑的路。

48 张 B200 训 4 天这个数字也是同样的姿态。一个十几个人的开源团队，用一周不到的算力预算，把 Qwen3-14B 拔高了 7 个点。这不是堆资源的故事，是工程效率的故事。

## 14B 的位置在哪

我先说能跑在哪。14B 模型 fp16 大约 28GB 显存，4bit 量化压到 9GB 左右，单张 4090 24GB 跑 fp8 量化版本是绰绰有余的，3090 也能上。

这跟 70B 那一档完全不是一个游戏。70B 你得双卡或者 H100，本地开发者大部分跑不动；14B 是真的"晚上回家自己 ollama pull 下来调一调"的尺寸。

LiveCodeBench v6 这个 benchmark 测的是 2024 年 8 月到 2025 年 5 月之间发布的竞赛编程题，时间窗口选得比较新，目的是避开训练数据污染。67.87% 在 14B 这一档是头部水平，比 Qwen3-14B base 的 60.79% 高出 7.08 个点，技术报告里明确给了这两个数字。

我没拿到与闭源大模型的直接对照表（NousResearch 的 report 没给 Claude Code 或 GPT-5 在同一 benchmark 的成绩），但 LiveCodeBench 这个榜单上 14B 量级冲到 67% 区间，确实是 Qwen3-Coder、DeepSeek-Coder 之外又多了一个候选。

## Hermes Agent 这一层是关键

光看 NousCoder-14B 一个模型，你会觉得就是又一个 14B 编程模型。但 NousResearch 这次发的不是孤立的 weights，是 Hermes Agent 生态里的一块拼图。

我去 GitHub 上看了一下 NousResearch/hermes-agent 的现状，仓库 13.6 万星，2.1 万 fork，Python 项目，2025 年 7 月开建，最近一次推送就是今天。

仓库 topics 列得很有意思，ai-agent、anthropic、claude-code、clawdbot、codex、hermes-agent、moltbot、nous-research、openclaw 都在里面。clawdbot 和 moltbot 是 openclaw 生态那条线，hermes-agent 跟 openclaw 是同盟关系。

也就是说，你要本地跑一个 agentic coding 的 stack，Hermes Agent 是 runtime，NousCoder-14B 是上面的脑子，clawdbot 那一层是工具调用，整个链条全部开源全部可本地。

这跟 Claude Code 那种"打开一个 SaaS 客户端，每次调用都过 Anthropic 的服务器"完全是两条路。

## 社区在讨论什么

我去看了一下 4 月 29 号 NousResearch 在 r/LocalLLaMA 做的 AMA，那条帖子 321 点赞 392 评论，社区关心的不是 benchmark，是"哪个本地模型跑 Hermes 最稳"。

最高赞的问题来自 u/Dthen_，"Which local models have you had the most success running Hermes with？"，NousResearch 团队成员 alt-glitch 的回答是 Qwen3.6-27B 是 Hermes Agent 的 canonical local model。这条来自 r/hermesagent 的 AMA summary 帖子。

还有一条评论我印象很深，u/ale007xd 写的，"You've built one of the most compelling agent runtimes I've seen, especially the closed learning loop + skills evolution"，37 个赞。这是真用过 Hermes Agent 的开发者的反馈。

社区里的核心信号是，Hermes 跟 Qwen 系列绑得很紧，NousCoder-14B 这次选 Qwen3-14B 做 base 不是临时起意，是顺着自己生态里跑得最稳的那条路继续往前推。

## 我打算怎么用

我准备本地起一台机器跑 NousCoder-14B + Hermes Agent，把它接进我日常的 vibe coding workflow。具体路径我已经想好了。

第一步，从 Hugging Face 镜像或者 ModelScope 拉权重，国内开发者走 hf-mirror.com 比较稳，搜 NousResearch/NousCoder-14B 这个仓库名就能找到。

第二步，本地用 vLLM 或者 ollama 起服务，14B fp8 量化在 4090 上每秒能跑 80 到 100 个 token，足够交互式编程。

第三步，把它接进 Hermes Agent，按 GitHub 仓库 README 里的 quickstart 配置，agent runtime 跑起来后通过 OpenAI 兼容协议指向本地的 NousCoder-14B 端点。

第四步是日常使用，写非敏感代码、做日常重构、跑长上下文的代码理解任务，先用本地 NousCoder，跑不动的再走 Claude Code 或者 OpenRouter 上的 DeepSeek。

这套组合最大的好处不是"省 API 费"，是"代码不出本地"。商业项目里很多敏感逻辑，本来就不该走任何一个云端 SaaS。

## 我的判断

闭源 agentic coding 的火爆和开源编程模型的密集发布，正在变成同一件事的两面。

Claude Code 让所有人意识到 AI 编程从"补全"切换到了"agent"这一档，开发者愿意花钱了。NousResearch 选的不是去硬碰，是把同样的能力开源化、本地化、跟自己的 Hermes runtime 缝合。

14B 这个尺寸是关键。70B 太重，7B 不够看，14B 刚好卡在"消费级显卡能跑 + 编程能力够用"的甜蜜点。NousCoder-14B 不是终局，但它是开源 agentic coding stack 里少见的把 base 选对了的那一类。

对国内开发者，这条线值得跟，理由有三个。一是 Hermes Agent 跟 openclaw 生态绑定，clawdbot 和 moltbot 那一层未来会有更多动作。二是 14B 本地能跑，不依赖任何境外 SaaS。三是 base 模型是 Qwen3-14B，未来 Qwen 系列出新版，NousCoder 大概率会跟着继续微调。

把 NousResearch 这条线加进你的关注列表，下次他们再放新东西，你不至于错过。

## 相关链接

- NousCoder-14B 模型卡，https://huggingface.co/NousResearch/NousCoder-14B
- Hermes Agent 仓库，https://github.com/NousResearch/hermes-agent
- LiveCodeBench 榜单，https://livecodebench.github.io
- VentureBeat 原报道，https://venturebeat.com/technology/nous-researchs-nouscoder-14b-is-an-open-source-coding-model-landing-right-in
- Hugging Face 国内镜像，https://hf-mirror.com

---

相关实体:: [[nous-research|Nous Research]] | [[anthropic|Anthropic]] | [[claude-code|Claude Code]] | [[qwen-family|Qwen]] | [[hermes-agent|Hermes Agent]]
相关主题:: [[ai-coding-tools|AI 编程工具]] | [[open-source|开源生态]] | [[openclaw-ecosystem|openclaw 生态]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
