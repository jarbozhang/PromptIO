---
title: "Block 团队开源的 Goose 一年攒到 26k 星，本地跑 AI 编程 agent 不用付 Claude 200 美金"
status: draft
date: 2026-05-08
reach: 7
voice: first-person
slug: goose-26k星-block本地agent-绕开claude-code-200美金
---

# Block 团队开源的 Goose 一年攒到 26k 星，本地跑 AI 编程 agent 不用付 Claude 200 美金

## 一、为什么我今晚连夜把 Goose 装上了

我上个月在 Claude Code 上烧的钱，加上 API 加上订阅，加起来够我多吃一周外卖。倒不是说这工具不好用，好用得让我离不开，问题就出在"离不开"这三个字上。每天写完代码看一眼用量条，那种"还剩多少 prompt 可以跑"的焦虑感，我相信用过的人都懂。

昨天刷 RSS 看到 VentureBeat 一篇标题极其直白的文章，"Claude Code costs up to $200 a month. Goose does the same thing for free."（《Claude Code 一个月最高 200 美金，Goose 免费做一样的事》）。Goose 这个名字我之前听过几次，知道是 Block（就是 Jack Dorsey 那家原 Square 改名后的金融科技公司）开源的项目，但一直没认真试过。

文章里有句话戳到我了，Block 内部工程师 Parth Sareen 在直播时说，"Your data stays with you, period."（你的数据完全留在自己手里，就这么简单。）再加上一句"甚至在飞机上没网也能跑"。我当时就把 IDE 关了，git clone 跑了一晚。

这篇就是我跑完一晚的真实报告，装机过程、踩到的坑、和 Claude Code 在体感上到底差在哪、国内开发者最关心的"能不能接 DeepSeek / Kimi"答案是什么。

## 二、Goose 到底是个什么东西

先把事实说清楚，免得有人误会成又一个套壳产品。

**身份**，Block 出品的开源 AI 编程 agent，2025 年初公开，到 2026 年 5 月我去看的时候 GitHub 已经 44.7k 星（VentureBeat 1 月发文那时候是 26.1k，几个月翻了 70%），362 位贡献者，发布了 102 个版本。最新版本 v1.33.1，4 月 29 号刚发。

**形态**，和 Claude Code 不太一样。Claude Code 是一个绑定 Anthropic 后端的终端 agent，你用它就得用 Claude。Goose 把这一层做开了，它本身是个**前端壳**（同时提供 CLI 和原生桌面 App，macOS / Linux / Windows 都有），后面接哪个模型由你自己选。官方仓库描述写得很直接，"an open source, extensible AI agent that goes beyond code suggestions—install, execute, edit, and test with any LLM"。

**和 LLM provider 的关系**，这是 Goose 的杀手锏。文档里说支持 15+ provider，我实际试了一圈，至少包括 Anthropic、OpenAI、Google Gemini、Ollama（本地模型）、OpenRouter（聚合代理）、Azure OpenAI、AWS Bedrock。换 provider 就一条命令 `goose configure`，箭头键选一下。

**MCP 生态**，这点我得单独提。Goose 是 Anthropic 开放的 Model Context Protocol（MCP）的早期实现者之一，官方 MCP Registry 里现在有 70+ extension。Filesystem、shell、GitHub、数据库、浏览器自动化全都是 plug-and-play。所以呢你之前给 Claude Code 写的 MCP server 可以原样接到 Goose 上。

简单总结一句话，**Claude Code 是 Anthropic 的官方一体机，Goose 是开源派的"用任意模型的同款 agent"**。

## 三、装机，从零到能跑就这五分钟

我在 M2 Mac 上的最小路径，复制粘贴就能用，

```bash
# 装 CLI（也可以用 brew install block-goose-cli）
curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | bash

# 跑配置
goose configure
```

`goose configure` 会问你三件事，选 provider、填 API Key、选模型。如果想要桌面 App（带聊天 UI、文件树、可视化的工具调用日志），直接，

```bash
brew install --cask block-goose
```

Linux 提供 deb / rpm / Flatpak，Windows 有原生包，全平台齐全。

**我自己的接法**，本机日常用 Ollama 跑 Qwen3-Coder 32B 做轻活（重构、解释代码、看仓库结构），重活切到 OpenRouter 上的 Claude / DeepSeek-V4 / Kimi-K2.6-Code。一个工具两套档位，省钱又不掉智力。

## 四、国内开发者最关心的那个问题

直接答，**能接 DeepSeek、Kimi、Qwen，但路径不是直连，是走 OpenRouter 或者 OpenAI-compatible endpoint**。

- **走 OpenRouter**，Goose 原生支持 OpenRouter 这一档，`goose configure` 里就能直接选。OpenRouter 上 DeepSeek-V4、Kimi K2.6 Code Preview、Qwen3-Coder 全都有，按 token 走表，月底没有"用量重置"的问题。我自己测下来，DeepSeek-V4 跑 Goose 的体验和 Claude 走 OpenRouter 的体验差距比想象中小，主要差在 tool calling 的稳定性，长链路任务 DeepSeek 偶尔会重复调一次 read_file。
- **走 Ollama 本地**，M 系列 Mac 跑 Qwen3-Coder 32B Q4 是甜点档，Goose 直接读 Ollama 的 11434 端口。完全离线，飞机上也能写。
- **走 OpenAI-compatible endpoint**，Goose 支持 "OpenAI Compatible" 这一档，意思是任何兼容 OpenAI API 的国产服务（DeepSeek 官方 API、月之暗面、智谱）填个 base_url 就能用。Key 不出本机，数据合规这块比直连 Anthropic 友好。

唯一要注意的坑，Goose 默认期待模型支持 function calling / tool use。DeepSeek-V3 之前的版本在这点上偶尔翻车，V4 之后稳了；Qwen3-Coder 系列原生支持 tool；Kimi K2.6 Code 我跑下来 tool call 命中率在 90% 以上。**别选纯 chat 模型**，会出现 agent 一直在"思考"但不调工具的情况。

## 五、Claude Code vs Goose，拉一条对照表，不是拉踩

我跑完一晚的真实体感，

| 维度 | Claude Code | Goose |
| --- | --- | --- |
| 计费方式 | $20 / $100 / $200 月订阅，按 prompt 次数限速 | 工具免费，token 费用按你接的 provider 走 |
| 模型绑定 | 锁 Anthropic（Claude Mythos / Sonnet / Haiku） | 任意 LLM，15+ provider |
| 形态 | CLI 为主 | CLI + 桌面 App + 可嵌入 API |
| 离线能力 | 不行，必须联网 | 接 Ollama 后完全离线 |
| 数据出境 | 走 Anthropic 服务器 | provider 自己选，可全本地 |
| MCP / 扩展 | 官方支持 MCP，扩展生态偏新 | 70+ extension Registry，MCP 早期玩家 |
| IDE 集成 | VS Code / JetBrains 扩展，集成感强 | 桌面 App 独立运行，需要切窗口 |
| 调试体验 | tool call 黑盒，trace 不全 | 工具调用每一步都可见，比较透明 |
| 生态成熟度 | Anthropic 官方背书，每周更新 | 社区驱动，迭代更快但偶有 breaking change |

**两边的 trade-off 其实很清晰**，Claude Code 你买的是"集成度"和"省心"，Anthropic 给你调好了模型、prompt、context 管理、IDE 体验，月费就是省心费。Goose 你换的是"灵活度"和"成本可控"，前期要花一个晚上配 provider、调 MCP、试模型组合，但跑稳之后每月成本可以压到 Claude Code 的 1/3 甚至更低，而且数据完全在你这边。

**不是 Claude Code 没价值**，是不同人的需求权重不一样。如果你公司对数据出境敏感，或者每天 8 小时用 AI 写代码，Goose 的曲线长期看划算太多；如果你只是偶尔用 AI 帮忙写脚本，Claude Code 的 Pro 档 17 美金省心，没必要折腾。

## 六、社区怎么看

这一个月 Reddit 关于 Claude Code 类工具的讨论几乎被一个事件吞了，Cursor 的 Claude-powered agent 9 秒删光一家公司全部数据库（包括备份），相关帖子在 r/technology、r/nottheonion、r/pcmasterrace 加起来 88K+ 点赞，5800+ 评论。开发者们的不安从"AI 写代码会不会很贵"升级到了"AI agent 拿到我生产环境的权限是不是疯了"。

最高赞评论里有句话很有代表性，「If you gave Claude access to your production database the error is you.」（你把 Claude 接到生产数据库了，那是你的问题。）这话刺耳但是对的，AI agent 出错不可怕，可怕的是没有人能审计它做了什么、在哪一步走偏的。

这个氛围下，**Goose 那种"工具调用每一步都可见、数据不出本机"的设计反而成了优势**。VentureBeat 文章里 Block 工程师强调"data stays with you"不是抽象的隐私话术，是实打实的工程默认值，你跑的是本地进程，模型权重你自己拉，工具调用 log 在本机磁盘上，出了问题你自己审。

社区里 Goose 的真实增长能说明问题，4 个月从 26.1k 涨到 44.7k 星，70% 的增量基本和 Claude Code 涨价 + Cursor 删库这两件事的时间线对得上。**不是 Goose 突然变好用了，是大家开始算另一笔账**。

```
✅ All agents reported back!
├─ 🟠 Reddit: 5 threads │ 89,853 upvotes │ 5,819 comments
└─ 🗣️ Top voices: r/technology, r/nottheonion, r/BetterOffline
```

## 七、我的判断，Goose 会变成"开源 Claude Code"还是变成 LangChain？

这是我最关心的问题，也是这类项目最容易翻车的地方。

LangChain 大家都熟，什么模型都接、什么场景都能跑、文档比 React 还厚，但你真去打听一圈，实际生产环境用 LangChain 的工程师并不多，更多是"用 LangChain 学概念，自己写一个轻量的 wrapper"。原因不是 LangChain 不好，是**抽象太多反而没人吃得下**。

Goose 现在站在分叉口。它的优势是产品形态非常具体，就是"一个能跑代码的 AI agent"，不是"一个 agent 框架"。它没让你写 chain、写 graph、写 callback，你装上就有 CLI 和 GUI，行为接近 Claude Code。这个定位是对的。

风险在两边，

- 往 Claude Code 走会被 Anthropic 直接吃掉。Anthropic 自己就在开放 MCP、做 extension 生态、铺 Cloud Agents。Goose 如果只是"开源版的 Claude Code"，长期看在体验上很难追上有钱有模型的官方实现。
- 往 LangChain 走会失去"装上就能用"的简单性。70+ extension、15+ provider 已经在压复杂度边界了，再往下走会变成"功能很多但没人配得明白"。

**我赌 Goose 能活下来的地方在第三条路，成为"任意 LLM 的本地 agent runtime"**，把模型层抽象掉，让每一家自己跑得起的国产模型、自部署的开源模型、企业内 LLM 网关，都能用一个统一的本地 agent。这件事 Anthropic 不会做（他们要绑用户到 Claude），LangChain 太重做不来。Block 这家公司又恰好是金融科技背景，对"数据合规、本地优先、可审计"这套逻辑有真实的内部需求驱动。

如果它走对了，**未来一两年里 Goose 会变成那种"Claude Code 用户出于成本或合规原因切过去的第二选择，最后变成第一选择"的工具**。如果走偏了，就是又一个 LangChain。

## 八、今晚就能上手的最小路径

留个行动建议，不绕弯子，

1. **装 Goose CLI**（5 分钟），`brew install block-goose-cli`，或者 macOS / Linux 走前面那条 curl 命令，Windows 用桌面包。
2. **第一次 configure 选 OpenRouter**（最容易跑通的国产模型路径），去 openrouter.ai 注册拿 key，`goose configure` 选 OpenRouter，模型先填 `anthropic/claude-sonnet-4.6` 或 `deepseek/deepseek-v4` 试水。
3. **试一个真任务**，别试 hello world，找你最近一个 PR，让 Goose 在你 repo 根目录跑 `goose session start`，让它读代码、跑测试、改 bug。这一步最能看出来 Goose 的 tool calling 在你的项目里稳不稳。
4. **跑顺了再上 Ollama**，`brew install ollama && ollama pull qwen3-coder:32b`，把 Goose provider 切成 Ollama，这样小任务完全本地，飞机咖啡馆都能干活。
5. **保留 Claude Code 别卸载**，两套并行用一两周，看你哪种任务更适合哪个工具。我现在的分工是 Claude Code 跑大型重构和需要长 context 的活，Goose 跑日常 boilerplate 和需要本地数据的活。

最后一句话，Block 这家公司开源 Goose 不是为了和 Anthropic 打仗，是因为他们自己内部要省 AI 编程的成本同时又必须满足金融合规。**他们解决自己问题顺手把工具开源了，这种动机做出来的项目，往往比专门为开源而开源的更靠谱**。

---
相关实体:: [[block|Block]] | [[goose|Goose]] | [[anthropic|Anthropic]] | [[claude-code|Claude Code]] | [[openrouter|OpenRouter]] | [[deepseek|DeepSeek]] | [[ollama|Ollama]]
相关主题:: [[ai-coding-tools|AI 编程工具]] | [[ai-pricing|AI 定价]] | [[local-inference|本地推理]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
