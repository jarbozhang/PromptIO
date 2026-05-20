# OpenAI 给 Codex 上了 Windows sandbox 和 Dell on-prem 企业内网 AI 编程的门终于开了

Codex 上线一年多，绝大多数实际跑起来的人都用着 Mac。不是 Codex 偏心 Mac，是它的 sandbox 一直建在 macOS 的 Seatbelt 上，Windows 用户要么挂 WSL2 凑合用，要么干脆放弃。

5 月 13 日 OpenAI 放出 Windows 原生 sandbox，5 月 18 日又官宣和 Dell 合作把 Codex 塞进企业自有服务器。一前一后两条线，第一次让 Codex 看起来不再是"Mac 高端开发者玩具"，而是要进 Windows 工位、进企业内网的正经基础设施。

国内的华为、联想、浪潮加上一堆国产编程大模型，这条线到底有没有可能复刻，今天值得拉直了看。

## Codex Windows sandbox 不是 WSL 包一层

很多人第一反应是"不就是 WSL2 跑一下吗"。OpenAI 这次特地写了一篇技术博客解释为什么不行。

Mac 上的 Codex 用的是 Apple Seatbelt，一个基于 TrustedBSD 框架的内核级沙箱，能用一份 profile 声明文件读写白名单、网络访问规则、子进程限制。agent 跑命令时，Seatbelt 在内核层挡住越权调用，性能开销几乎为零。

Windows 没有 Seatbelt 这种东西。早期 Codex 在 Windows 上要么裸跑（危险），要么塞进 WSL2（一个完整 Linux 内核虚拟机，开销大，而且说到底跑的是 Linux 二进制，不是真 Windows agent）。

这次的 Windows sandbox 走的是 AppContainer + Job Object 组合，AppContainer 给进程一个独立 SID 限制文件系统和注册表访问，Job Object 限制 CPU、内存、子进程数量。这套机制是 UWP 应用沙箱的底层，被拿来给 CLI agent 用是第一次。

意义在于，Codex agent 在 Windows 上跑 `npm install`、跑测试、改文件，所有动作都被限制在你声明的目录里，越界直接拒绝。而且 agent 跑的是原生 Windows 二进制，能直接调 .NET 工具链、能跑 Visual Studio 编译、能用 PowerShell，不再需要绕一道 WSL。

对企业读者，这才是关键变化。Windows 工位 + Visual Studio + .NET 工具链是国内大量金融、政企、传统软件公司的基本盘，过去这些场景 AI 编程根本进不去，不是 LLM 不会写，是 agent 没有安全的本地执行环境。

## OpenAI 为什么这时候绑 Dell

Codex Windows sandbox 是技术问题，Codex on-prem 是市场问题。

5 月 18 日 OpenAI 和 Dell 的合作公告，关键词只有一个，hybrid + on-premise。Dell 提供基于 PowerEdge 服务器的整套硬件方案，OpenAI 提供 Codex 推理栈，企业可以把整套 AI 编程 agent 部署在自己机房或私有云里，代码不出企业网络。

OpenAI 不是没卖过 enterprise 版，过去走的是 Azure OpenAI 那条路，数据走专属租户但还是在微软云上。on-prem 是另一回事，整套推理栈要打包成可交付的服务器镜像，要解决许可证、要解决型号锁定、要解决升级路径。这种活 OpenAI 自己干不了，找 Dell 是最快的捷径。

更直接的原因是 Cursor 和 Claude Code 已经在企业市场跑得很凶。Cursor 拿到了大量科技公司 site license，Anthropic 的 Claude Code 走 AWS Bedrock 通道直接对接金融客户。OpenAI 在个人开发者层面靠 ChatGPT 还能吃住，到了企业 dev tooling 这一块，没有 on-prem 选项就是没门票。

绑 Dell 一次性解决三件事，硬件交付能力、企业渠道、合规背书。Dell 本来就在卖 AI 训练服务器，PowerEdge XE 系列已经预装 Nvidia H100/H200 的整机方案，加一层 Codex 推理服务就能进客户机房。

## 国内对照，这条线在哪

把镜头转回国内。"国产服务器厂商 + 国产编程大模型"对应到 Dell + OpenAI，能拼出来的组合大致是这几条。

**华为 + 盘古/DeepSeek**。华为 Atlas 800 训推服务器是国内 on-prem AI 部署最现实的硬件底盘，搭自家盘古，或者搭已经被广泛部署的 DeepSeek-Coder 系列。优势是政企渠道无敌，劣势是盘古的代码能力在公开评测里不算第一梯队，DeepSeek-Coder 又是开源模型谁都能装，华为靠服务器卖差异化不容易。

**联想 + 通义灵码**。联想问天 WA5480 G3 是国产替代里少数能跑大模型推理的标准化产品，阿里通义灵码本身已经是国内装机量最大的 AI 编程插件之一。联想 + 阿里这条线最像 Dell + OpenAI，硬件方有渠道、模型方有产品，但两家公司过去合作并不紧密，更多是各卖各的。

**浪潮 + 智谱 GLM-Coder**。浪潮的 NF5688 是国内最早一批支持大模型训练的整机服务器，智谱 GLM-Coder 在企业市场也有动作。这条线偏研究和金融，渠道比华为窄但比联想专注。

**真正的 agent 工具层是缺的**。Dell + OpenAI 卖的不是模型 API，是整套 Codex agent 工作流，包括 IDE 插件、CLI、sandbox 执行环境、任务调度、企业管理后台。国内目前没有一家把这套东西做完整，通义灵码偏 IDE 插件，DeepSeek-Coder 偏模型本身，agent 执行层的 sandbox、企业版的权限和审计都没人专门做。

这是国产玩家的窗口期。模型层卷不动了，硬件层也已经分完，能差异化的就是企业 agent 工作流这一层。

## 我认为

企业 AI 编程的战场比个人版本残酷得多。

个人开发者市场，谁家模型新、谁家定价低就有人用，迁移成本几乎为零。企业市场反过来，决策周期半年起步，但一旦买进去就是三年五年的绑定，沉没成本极高。Dell + OpenAI 这种组合一旦在大客户里落地，国产玩家就再也没机会进同一个机房。

"放进内网"听起来是合规要求，实际上是国产玩家唯一能打的差异点。OpenAI 再开放也开放不到把整套推理栈交给浦发银行的机房，国产玩家天然有这个权限。但权限不等于产品，能不能在 12 个月内做出一套像样的企业版 agent 工作流，决定接下来五年国产 AI 编程在 B 端的份额。

时间窗口比想象的短。

## 行动建议

**Windows 用户怎么试 Codex CLI**。OpenAI 官方仓库已经上了 Windows 原生构建，从 npm 装 `@openai/codex` 即可，sandbox 默认开启，跑 `codex --help` 看支持的隔离级别。Visual Studio Code 插件也已经支持 Windows 上的本地 sandbox 执行。

**国产替代清单**。通义灵码（阿里）、文心快码（百度）、CodeGeeX（智谱）、MarsCode（字节）四家都有 IDE 插件免费版，DeepSeek-Coder 和 Qwen-Coder 是可以本地部署的开源模型，硬件够的话可以自己跑。

**内网部署关键问题**。如果你在企业里推国产 AI 编程方案，重点问三件事，模型权重是否可下载本地部署、推理服务是否能离线运行、agent 执行环境是否有 sandbox 隔离。这三个问题问完，市面上能选的方案就只剩两三家了。

Codex 这次从"Mac 玩具"变成"Windows 工位 + 企业内网"的故事，留给国产玩家的时间不长。

---

相关链接

- Codex Windows sandbox 技术博客 https://openai.com/index/building-codex-windows-sandbox
- OpenAI x Dell 合作公告 https://openai.com/index/dell-codex-enterprise-partnership
- Codex CLI 仓库 https://github.com/openai/codex
- 通义灵码 https://tongyi.aliyun.com/lingma
- DeepSeek-Coder 仓库 https://github.com/deepseek-ai/DeepSeek-Coder

---
相关实体:: [[openai|OpenAI]] | [[codex|Codex]] | [[dell|Dell]]
相关主题:: [[ai-coding-tools|AI 编程工具]] | [[enterprise-ai|企业 AI]] | [[ai-infra|AI 基础设施]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
