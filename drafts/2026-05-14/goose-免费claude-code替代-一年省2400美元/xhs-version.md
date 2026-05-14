# Goose 26100 stars 完全免费的 terminal AI agent 一年最多省 2400 美元

Block 开源了一个叫 Goose 的 terminal AI agent，GitHub 26100 stars，362 个 contributors，到 1 月发了 102 个 release。第一反应是，又一个想做 AI 编程 agent 的开源项目。

再看一眼定位，"完全跑在本地，不订阅、不上云、没有每 5 小时重置的限速"，这句话基本写明了 Goose 在打什么市场。

那就装一个跑一下。

## 先算账，2400 美元从哪来

标题不是钓鱼，是真的能算出来。

闭源订阅档位大致是 20 美金 / 100 美金 / 200 美金一个月。最贵那档一年就是 2400 美金。Goose 本身代码 Apache 2.0 开源，软件费用是 0，所以要省的不是少花几块钱，是"如果你本来打算付最贵那档，一年里 Goose 占满你需求的部分都是省下来的"。

但这个算法有前提没说清楚，你 Goose 用的是哪个模型。Goose 本身只是个 agent 框架，跑在你机器上的是 agent 逻辑，真正生成 token 的还是 LLM。它支持 15+ 个 provider，Anthropic、OpenAI、Google、Ollama、OpenRouter、Azure、Bedrock 都有。

所以"免费"分两种姿态。

第一种是接 Ollama 跑本地模型，Qwen3、DeepSeek-Coder、Llama 系列都能挂上，模型费用真的是 0，电费忽略。第二种是接 OpenRouter 按量付费，Goose 还是免费，但 LLM 是 pay-as-you-go，重度用户一个月可能花 30-80 美金，没有每 5 小时重置的额度墙。

省 2400 是上限。中位数实际上是月费档切到 Goose+OpenRouter，省下来更接近一年几百美金，但换来了没有 rate limit 这件事。

## Goose 自己做了哪些妥协

我用了大半天，先讲它没那么爽的地方。

模型不是 Anthropic 自己调好的，你接的是什么模型就拿到什么能力。Claude Code 那种"模型知道自己在 Claude Code 里、知道项目约定"的 first-party 调优，Goose 接 Qwen 时是没有的，需要自己喂上下文、定义 extension。

我接了一遍本地 Ollama 跑 Qwen3-Coder-32B，处理一个小重构任务，能跑，但和顶配模型比起来，推理深度和工具调用连贯性都差一档。Qwen3 自己的强项在直给问题，agent 多步推理还是大模型领先。这不是 Goose 的锅，是本地模型当前的天花板。

Extension 体系是 MCP，官方说接了 70+ extension。优点是生态对齐 Anthropic 推的 MCP 标准，缺点是要自己装、自己配、自己排错。闭源订阅工具是开箱即用，Goose 是组装家具。

桌面端有原生 macOS / Linux / Windows app，也有 CLI。CLI 体验更接近工程师姿态，桌面 app 更像一个什么都能做的 chat 客户端，code agent 味道淡一点。

## Goose 真正可用的三个场景

**场景一，你已经在用 Ollama 跑本地模型，想给它一个 agent 外壳。** Goose 接 Ollama 一行命令的事，比自己写 agent loop 简单多了。这个用法是给"我不想给境外公司送 token 费"的人准备的，能用，能力上限是你本地模型的上限。

**场景二，你的工作大部分时间是 routine 改代码，不需要顶配模型推理。** 比如项目从 JS 迁到 TS、把 print 换成 logger、按 lint 规则批量改文件。这种活 Qwen3-Coder-32B 在 Goose 里跑得动，省的不是 token 费是 rate limit 焦虑，跑通宵都行。

**场景三，你做的是 agent 产品本身的研发，需要可控的 agent runtime。** Goose 是 Rust 写的、Apache 2.0、API 暴露出来，你能改 prompt、改 tool 调用策略、嵌到自己产品里。

不太适合 Goose 的场景也得说清楚。新功能 from scratch 的复杂设计、需要顶配模型 deep reasoning，本地模型短期内补不上这一档差距。

## 装一下

CLI 安装是一行 curl，从仓库 releases 页拿脚本就行。装完跑 `goose configure` 选 provider 和 model，再 `goose session` 进入交互模式。从下载到跑通第一个任务大概 8 分钟。

接 Ollama 的配置是选 Ollama provider 然后填 base URL（默认 `http://localhost:11434`）和 model 名（比如 `qwen3-coder:32b`）。前提是机器上已经装好 Ollama 并 pull 过模型。

接 OpenRouter 的配置是选 OpenRouter provider 填 API key 和 model ID。OpenRouter 国内能直接充值，这条路径对国内开发者最干净。

## 社区在吵什么

最近 Reddit 上有一条 AI agent 把数据库删了 9 秒清空备份的帖子吵翻天，35909 赞 2759 评论。表面是骂 AI 不靠谱，底下高赞评论真正在讲的是另一件事。

共识是，AI agent 出事不是 AI 的错，是你给了它没监督的 root 权限。这对 Goose 这种本地跑、agent 直接操作你文件的工具，警示意义比对闭源订阅工具还大。闭源工具至少有厂商安全策略层做缓冲，Goose 是开源 agent + 任意 LLM 后端，你自己接的模型越激进，破坏力越大。

我自己的用法是给 Goose 跑在一个独立 git worktree 里，每个 session 开始前先 `git stash` 一次。这点谨慎对 Goose 用户必须有。

## 我的判断

Goose 不会让闭源订阅工具失去用户，两边吃的是不同需求。

闭源订阅卖的是"厂商调好的端到端体验+顶配模型+合规背书"，目标客户是不在意 token 费、在意效率最大化的工程师团队。Goose 卖的是"数据不出本机+0 订阅费+完全可改造"，目标客户是预算敏感、隐私敏感、或者本身在做 agent 产品的人。

省 2400 是真的，前提是你能接受本地模型当前的能力天花板、愿意做装配工作、有耐心调 prompt 和 extension。如果这些前提都不满足，订阅闭源工具还是更划算的选择，时间成本算回来不亏。

但如果你是长期 AI 编程重度用户，已经在用 Ollama 或者 OpenRouter，Goose 值得花一晚上装一下、试一下、留在系统里。一年下来省的钱可能不到 2400，但也不会是 0。

## 相关链接

- Goose 仓库 https://github.com/block/goose
- Goose 文档 https://block.github.io/goose/
- Ollama 官网 https://ollama.com
- OpenRouter https://openrouter.ai

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
