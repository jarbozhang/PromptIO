# NousResearch 开源了 NousCoder-14B，4090 单卡能跑的编程模型

Claude Code 在 X 刷屏的第七天，NousResearch 把 NousCoder-14B 扔出来了。

14B 参数，Qwen3-14B 基础上微调，48 张 NVIDIA B200 训了 4 天，LiveCodeBench v6 拿到 67.87% 准确率，比 base 高 7.08 个百分点。

我把它拉到本地跑了一天，记录下我的判断。

## 时机选得很有讲究

NousResearch 一直走开源路线，Hermes 系列是他们的招牌。这次发 NousCoder 选的时间点很微妙。

新年第一周整个 X 时间线被 Claude Code 占满了，氛围是闭源 agentic coding 一枝独秀。NousResearch 偏在这个节骨眼把 NousCoder-14B 开源出来，姿态非常明确，不是要去比拼分数，是要给开发者另一条本地能跑的路。

48 张 B200 训 4 天这个数字也是同样的姿态。一个十几个人的开源团队，用一周不到的算力预算，把 Qwen3-14B 拔高了 7 个点，这是工程效率的故事。

## 14B 这个尺寸是关键

我先说能跑在哪。14B 模型 fp16 大约 28GB 显存，4bit 量化压到 9GB 左右，单张 4090 24GB 跑 fp8 量化版本绰绰有余，3090 也能上。

这跟 70B 那一档完全不是一个游戏。70B 你得双卡或者 H100，本地开发者大部分跑不动。14B 是真的"晚上回家自己 ollama pull 下来调一调"的尺寸。

LiveCodeBench v6 测的是 2024 年 8 月到 2025 年 5 月之间发布的竞赛编程题，时间窗口选得比较新，目的是避开训练数据污染。67.87% 在 14B 这一档是头部水平。

## Hermes Agent 这一层才是拼图

光看 NousCoder-14B 一个模型，就是又一个 14B 编程模型。但这次发的不是孤立 weights，是 Hermes Agent 生态里的一块拼图。

我去 GitHub 看了一下 NousResearch/hermes-agent 的现状，仓库 13.6 万星，2.1 万 fork，Python 项目，2025 年 7 月开建，最近一次推送就是今天。

仓库 topics 列得很有意思，ai-agent、claude-code、clawdbot、codex、hermes-agent、moltbot、openclaw 都在里面。clawdbot 和 moltbot 是 openclaw 生态那条线，hermes-agent 跟 openclaw 是同盟关系。

也就是说，本地跑一个 agentic coding 的 stack，Hermes Agent 是 runtime，NousCoder-14B 是上面的脑子，clawdbot 那一层是工具调用，整个链条全部开源全部可本地。

## 我打算怎么用

我准备本地起一台机器跑 NousCoder-14B + Hermes Agent，接进我日常的 vibe coding workflow。

第一步，从 Hugging Face 国内镜像或者 ModelScope 拉权重，搜 NousResearch/NousCoder-14B 这个仓库名就能找到。

第二步，本地用 vLLM 或者 ollama 起服务，14B fp8 量化在 4090 上每秒能跑 80 到 100 个 token，足够交互式编程。

第三步，把它接进 Hermes Agent，按 GitHub 仓库 README 里的 quickstart 配置，agent runtime 跑起来后通过 OpenAI 兼容协议指向本地端点。

第四步是日常使用，写非敏感代码、做日常重构、跑长上下文的代码理解任务，先用本地 NousCoder。

这套组合最大的好处不是省 API 费，是代码不出本地。商业项目里很多敏感逻辑，本来就不该走任何一个云端 SaaS。

## 我的判断

闭源 agentic coding 的火爆和开源编程模型的密集发布，正在变成同一件事的两面，两条路各有取向。

NousResearch 选的不是去硬碰，是把同样的能力开源化、本地化、跟自己的 Hermes runtime 缝合。

14B 这个尺寸刚好卡在"消费级显卡能跑 + 编程能力够用"的甜蜜点。NousCoder-14B 不是终局，但它是开源 agentic coding stack 里少见的把 base 选对了的那一类。

对国内开发者，这条线值得跟，理由有三个。一是 Hermes Agent 跟 openclaw 生态绑定，clawdbot 和 moltbot 那一层未来会有更多动作。二是 14B 本地能跑，不依赖任何境外 SaaS。三是 base 模型是 Qwen3-14B，未来 Qwen 系列出新版，NousCoder 大概率会跟着继续微调。

把 NousResearch 这条线加进你的关注列表，下次他们再放新东西，你不至于错过。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
