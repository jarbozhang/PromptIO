---
title: 把个人 AI 助手跑在自己的设备上，openclaw 新版本怎么上手
status: draft
date: '2026-06-28'
source: manual
source_url: https://github.com/openclaw/openclaw
angle: 从新版本切入，写它解决了跨系统、数据归属和个人助手落地的问题。读者关心的是能否在自己的电脑上先跑起来，再判断它是否适合接入日常文件、任务和本地数据。
voice: first-person
content_lane: version-update
content_archetype: version_brief
diversity_note: recent_title_pattern_saturation
reach: 8
tags:
  - openclaw
  - 个人AI助手
  - Agent
  - 本地运行
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 把个人 AI 助手跑在自己的设备上，openclaw 新版本怎么上手
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.068
reach_note: openclaw 是本号重点生态，GitHub 可验证入口明确，读者能直接从仓库开始试用。
selection_reason: A 级 GitHub 主源，且命中 openclaw 生态，适合做当天版本解读主选题。
---

# 把个人 AI 助手跑在自己的设备上，openclaw 新版本怎么上手

我最近看 openclaw，不是因为它又多接了几个聊天入口，而是因为它把个人助手这件事重新拉回了电脑和手机本身。

很多人想要的不是再开一个聊天窗口。真正卡住的是三件事。我的文件在电脑上，任务散在各个聊天应用里，模型和工具权限又被拆成一堆账号。openclaw 的新版本更新，正好在修这条链路。

如果你想判断它能不能接进日常文件、任务和本地数据，我建议别一上来接全量资料。先把它当成一个本地 Gateway，跑通一个可控助手，再决定要不要让它碰更私人的东西。

## 旧问题不是模型不够强，是助手没有落点

把 agent 做成个人助手，难点通常不在模型回答。难的是它要待在哪里，听谁的，能动哪些工具，出问题时怎么收回权限。

openclaw 的定位很直接，个人 AI 助手运行在自己的设备上，通过 Gateway 连接你已经使用的渠道。README 里列了 WhatsApp、Telegram、Slack、Discord、iMessage、Feishu、WeChat、QQ、WebChat 等入口，也写明 Gateway 是控制面，产品本体是 assistant。

我比较在意的是“控制面”这三个字。它不是把聊天应用堆成一个入口合集，而是把会话、渠道、工具和事件放到一个本地优先的运行层里。对个人 agent 来说，这比“支持某个平台”更关键。

因为个人助手一旦进了文件、任务和消息，数据归属就不再是口号。配置文件在 `~/.openclaw/openclaw.json`，默认 workspace 也可以落在 `~/.openclaw/workspace`。这类路径选择，决定了你能不能看见它到底拿了什么权限。

## 新版本主要修的是可长期运行

这次 GitHub release 里，openclaw 2026.6.11-beta.1 的变化很密。我的读法是，它在补一个个人助手从“能跑”到“能长期跑”的中间层。

| 变化方向 | 对个人助手的影响 |
| --- | --- |
| 渠道控制增强 | Slack relay mode、Mattermost `/oc_queue`、每个 DM 的模型覆盖，让不同入口更容易分工 |
| 操作流更顺 | `openclaw agent --message-file` 和 RAFT CLI wake bridge，让文件驱动任务和远程唤醒更自然 |
| 插件分发更稳 | 官方插件进一步外置，安装端能拿到插件图标元数据 |
| 移动端更清楚 | Android settings detail panels 提升配置可见性 |
| agent 回合更可靠 | Codex partial deltas、harness activation、长上下文 prompt cache 稳定性，减少进度丢失和运行不一致 |

这里面最值得中文读者看的是两类，一类是跨渠道，一类是长期任务稳定性。

跨渠道解决的是“我在哪个入口叫它都行”。长期任务稳定性解决的是“它别跑一半丢上下文、乱切会话、或在服务重启后状态不明”。个人助手要进入日常，不怕功能少，怕的是每天都要重新调整一遍。

## 哪些能力现在更适合验证

我会把 openclaw 的可用性拆成三个层面看。

第一层是本地 Gateway。官方 Getting Started 写得很明确，Node 24 推荐，Node 22.19+ 也支持。新装可以用安装脚本，再跑 `openclaw onboard --install-daemon`，然后用 `openclaw gateway status` 看 Gateway 是否在 18789 端口监听。

第二层是渠道。官方文档说每个 channel 都通过 Gateway 连接，文本基本都支持，媒体和 reaction 视渠道而定。对我来说，验证渠道不要贪多，一个 WebChat 或一个常用消息入口足够。核心不是“接了多少个”，而是消息是否能稳定进出、是否能按配对和 allowlist 控制。

第三层是工具和模型。Gateway 提供 OpenAI-compatible endpoints，包括 `/v1/models`、`/v1/embeddings`、`/v1/chat/completions` 和 `/v1/responses`。这给 RAG、memory pipeline、agent-native client 留了接口。它也支持按 agent 配模型和 fallback，但这一步不适合上来就拉满。

我认为正确顺序是，先让一个最小 agent 稳定存在，再给它工具，再给它文件。顺序反过来，问题会混在一起，最后你分不清是渠道失败、模型失败、权限失败，还是本地状态失败。

## 适合升级的人和先别急的人

已经跑过 openclaw 的人，可以重点看 `openclaw update`。官方更新文档说它会检测 npm 或 git 安装类型，拉取最新版本，运行 `openclaw doctor`，并重启 Gateway。更新后还建议跑 `openclaw doctor`、重启 Gateway、再用 `openclaw health` 验证。

如果你正在搭一个长期在线的个人助手，这版值得验证。尤其是你遇到过消息入口不稳定、移动端配置看不清、agent 回合中断、长上下文缓存不稳这几类问题。

如果你只是想找一个聊天替代品，我反而不建议马上上复杂配置。openclaw 的价值在于它能把渠道、工具、session、插件和本地控制面接起来。你不用这些能力，它会显得重。

还有一类人要谨慎。只要要让不止一个人能发消息给这个 bot，就要按官方 exposure runbook 的提醒处理。Gateway 默认 bind mode 是 loopback，开放访问前要讲清楚谁能到达它、怎么认证、能触发哪些 agent、能用哪些工具。个人助手不是越开放越好，权限越具体越稳。

## 我会怎么开始验证

我不会一开始就接日常文件夹。

我的验证路径会更窄。跑通 Gateway，打开 dashboard，发第一条消息。然后只接一个渠道，保留默认 pairing 或 allowlist，把 `openclaw doctor` 和 `openclaw health` 当成每次调整后的验收动作。

等这条路径稳定，再加一个低风险工作区，比如临时任务目录、公开资料摘录、或者一组可以删除的测试文件。个人助手进入真实数据之前，最好先证明它会按你的边界工作。

openclaw 这次更新给我的启发是，agent 应用的落点正在从“哪个模型更会聊”移到“谁能安全地留在我的设备、我的渠道和我的工作区里”。这个方向不喧闹，但更接近个人助手真正要解决的问题。

## 相关链接

- GitHub 仓库 https://github.com/openclaw/openclaw
- Getting Started https://docs.openclaw.ai/start/getting-started
- Updating https://docs.openclaw.ai/install/updating
- Gateway runbook https://docs.openclaw.ai/gateway
- Gateway exposure runbook https://docs.openclaw.ai/gateway/security/exposure-runbook

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
