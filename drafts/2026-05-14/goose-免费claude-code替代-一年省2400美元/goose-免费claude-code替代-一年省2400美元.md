# Goose 26100 stars 完全免费 Claude Code 替代 一年省 2400 美元

Block 开源了一个叫 Goose 的 terminal AI agent，GitHub 26,100 stars，362 个 contributors，到 1 月发了 102 个 release。我看到这个数字的第一反应是，又一个想做 Claude Code 平替的项目。

我又看了一眼定位，"runs entirely on a user's local machine. No subscription fees. No cloud dependency. No rate limits that reset every five hours"，这句话基本写明了 Goose 在打什么市场，Claude Code Max 用户每五小时被 cap 一次的怨气。

那就装一个跑一下。

## 先算账，2400 美元从哪来

标题不是钓鱼，是真的能算出来。

Claude Code 的订阅档位是 Pro 20 美金一个月，Max 100 或 200 美金一档。最贵的 Max 200 一年就是 2400 美金。Goose 本身代码 Apache 2.0 开源，软件费用是 0，所以你要省的不是"少花几块钱"，是"如果你本来打算付 Max 200，那一年里 Goose 占满你需求的部分都是省下来的"。

但这个算法有个前提没说清楚，你 Goose 用的是哪个模型。Goose 本身只是个 agent 框架，跑在你机器上的是 agent 逻辑，真正生成 token 的还是 LLM。它支持 15+ 个 provider，包括 Anthropic、OpenAI、Google、Ollama、OpenRouter、Azure、Bedrock。

所以"免费"分两种姿态。

第一种是接 Ollama 跑本地模型，Qwen3、DeepSeek-Coder、Llama 系列都能挂上，这条路径模型费用真的是 0，电费忽略。第二种是接 OpenRouter 按量付费，Goose 还是免费，但 LLM 是 pay-as-you-go，重度用户一个月可能花 30-80 美金，比 Pro 贵但比 Max 便宜，而且没有每 5 小时重置的额度墙。

省 2400 是上限，对应"本来要交 Max 200、改用 Goose+本地模型"。中位数实际上是 Pro 路径切到 Goose+OpenRouter，省下来更接近一年几百美金，但换来了没有 rate limit 这件事。

## Goose 自己定位成免费选项，做了哪些妥协

我用了大半天，先讲它没那么爽的地方。

模型不是 Anthropic 自己调好的，你接的是什么模型就拿到什么能力。Claude Code 里那种"模型知道自己在 Claude Code 里、知道项目结构约定"的 first-party 调优，Goose 接 Qwen 时是没有的。你需要自己给它喂上下文、定义 extension。

我接了一遍本地 Ollama 跑 Qwen3-Coder-32B，处理 PromptIO 这个仓库的小重构任务，能跑，但跟 Claude Code + Sonnet 4.6 比起来，推理深度和工具调用的连贯性都差一档。Qwen3 自己的强项在直给问题，agent 多步推理还是国外大模型领先。这不是 Goose 的锅，是本地模型当前的天花板。

如果你接 Anthropic API（也就是给 Goose 一个 Anthropic API key），Goose 跟 Claude Code 的差距就小很多。但这条路径还是要花钱付 token，并不是"完全免费"。

Extension 体系是 MCP，官方说接了 70+ extension。这是个优点也是个缺点，优点是生态对齐到 Anthropic 推的 MCP 标准，缺点是你要自己装、自己配、自己排错。Claude Code 是开箱即用，Goose 是组装家具。

桌面端有原生 macOS / Linux / Windows app，也有 CLI，Rust 写的。我两个都试了，CLI 体验更接近 Claude Code 的工程师姿态，桌面 app 更像一个"什么都能做"的 chat 客户端，code agent 的味道淡一点。要替代 Claude Code，CLI 是主战场。

## 在哪些场景 Goose 实际可用

绕过这些妥协之后，Goose 真正可用的场景我列三个。

**场景一，你已经在用 Ollama 跑本地模型做日常任务，想给它一个 agent 外壳。** Goose 接 Ollama 一行命令的事，比你自己写 agent loop 简单多了。这个用法跟 Claude Code 完全不是同一个市场，是给"我不想给境外公司送 token 费"的人准备的。能用，但能力上限是你本地模型的上限。

**场景二，你的工作大部分时间是 routine 改代码，不需要顶配模型推理。** 比如把一个项目从 JS 迁到 TS、把所有 print 换成 logger、按 lint 规则批量改文件。这种活 Qwen3-Coder-32B 在 Goose 里跑得动，省的不是 token 费是 rate limit 焦虑。Claude Code Max 用户最讨厌的就是改到一半被 cap 掉，Goose+本地模型不存在这个问题，跑通宵都行。

**场景三，你做的是 agent 产品本身的研发，需要可控的 agent runtime。** Goose 是 Rust 写的、Apache 2.0、API 暴露出来，你能改它的 prompt、改它的 tool 调用策略、嵌到自己的产品里。Claude Code 是闭源 binary，你拿不到这种自由度。

不太适合 Goose 的场景也得说清楚。你做的是新功能 from scratch 的复杂设计、需要顶配模型 deep reasoning，Claude Code+Sonnet 4.6 / Opus 4.7 还是比 Goose+本地模型领先。这一档差距短期内不会被本地模型抹平。

## 装一下

CLI 安装就一行 curl，仓库给的脚本是 `curl -fsSL https://github.com/block/goose/releases/download/stable/download_cli.sh | bash`。装完跑 `goose configure` 选 provider 和 model，再 `goose session` 进入交互模式。我从下载到跑通第一个任务大概 8 分钟，比预期顺。

接 Ollama 的配置是选 Ollama provider 然后填 base URL（默认 `http://localhost:11434`）和 model 名（比如 `qwen3-coder:32b`）。前提是你机器上已经装好 Ollama 并 pull 过模型。

接 OpenRouter 的配置是选 OpenRouter provider 填 API key 和 model ID，比如 `anthropic/claude-sonnet-4.6` 或者 `deepseek/deepseek-coder-v4`。OpenRouter 国内能直接充值，这条路径对国内开发者最干净。

接 Anthropic API key 直接花官方 token 钱，这条等于"我不想订阅但还想用 Anthropic 模型"，Goose 在这里就是一个 BYO-key 的客户端。

## 社区在吵什么

关于"AI agent 把数据库删了 9 秒清空备份"这件事最近吵翻天，Reddit 上 r/technology 那条帖子 35,909 赞 2,759 评论，r/pcmasterrace 那条 5,158 赞。表面是骂 AI 不靠谱，底下高赞评论真正在讲的是另一件事。

u/Swineservant 说"The AI is trying to tell us something..."

u/IlIIllIIIlllIlIlI 说"Did they really not have offsite/offline backups? What happens when a junior dev fucks up?"

u/titan-of-hunger 说"If you allow AI to make code changes to your source with no oversight... you get what you fuckin deserve"

这些评论汇成的共识是，AI agent 出事不是 AI 的错，是你给了它没监督的 root 权限。这对 Goose 这种"本地跑、agent 直接操作你文件"的工具，警示意义比对 Claude Code 还大。Claude Code 至少有 Anthropic 的安全策略层做缓冲，Goose 是开源 agent + 任意 LLM 后端，你自己接的模型越激进，破坏力越大。

我自己的用法是给 Goose 跑在一个独立 git worktree 里，每个 session 开始前先 `git stash` 一次。这点谨慎 Claude Code 用户也该有，对 Goose 用户必须有。

## 我的判断

Goose 不会让 Claude Code 失去用户，两边吃的是不同需求。

Claude Code 卖的是"Anthropic 调好的端到端体验+顶配模型+合规背书"，目标客户是不在意 token 费、在意效率最大化的工程师团队。Goose 卖的是"数据不出本机+0 订阅费+完全可改造"，目标客户是预算敏感、隐私敏感、或者本身在做 agent 产品的人。

省 2400 是真的，前提是你能接受本地模型当前的能力天花板、愿意做装配工作、有耐心调 prompt 和 extension。如果这些前提你都不满足，订阅 Claude Code 还是更划算的选择，时间成本算回来不亏。

但如果你是个长期 AI 编程重度用户，已经在用 Ollama 或者 OpenRouter，Goose 值得花一晚上装一下、试一下、留在系统里。你不会立刻退订 Claude Code，但你会在某些场景下意识地切过去用 Goose，一年下来省的钱可能不到 2400，但也不会是 0。

## 相关链接

- Goose 仓库 https://github.com/block/goose
- Goose 文档 https://block.github.io/goose/
- VentureBeat 的报道 https://venturebeat.com/infrastructure/claude-code-costs-up-to-usd200-a-month-goose-does-the-same-thing-for-free
- Ollama 官网 https://ollama.com
- OpenRouter https://openrouter.ai

---
相关实体:: [[block|Block]] | [[anthropic|Anthropic]]
相关主题:: [[ai-coding-tools|AI 编程工具]] | [[ai-pricing|AI 定价]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
