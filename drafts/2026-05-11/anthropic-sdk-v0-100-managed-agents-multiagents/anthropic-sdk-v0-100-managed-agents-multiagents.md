# Anthropic SDK 跳到 v0.100，Managed Agents 多 agent / webhooks / vault 进了官方 Python 库，国内 agent 平台该怎么对照

5 月 6 号 `anthropic` Python 包发了 v0.100.0，release notes 一行字，「add support for Managed Agents multiagents and outcomes, webhooks, vault validation」。

前两天 Code w/ Claude 大会、Cowork 桌面端我都写过，那些是产品层。这次是 SDK 层，`pip install -U anthropic` 之后，写过几行 Claude API 的工程师今天就能 `import` 出多 agent 调度、webhook 事件、vault 凭据校验。

我把 commit `3b3deee` 拉下来看了一圈，130 个文件改动，4673 行新增。Managed Agents 第一次以「成型 SDK 接口」出现在官方包里，不再是 raw HTTP wrapper。

## SDK 里到底新增了什么

先把 commit `3b3deee` 翻出来对照 api.md，能看到的核心资源面是这四块。

**多 agent 调度**进了 `client.beta.agents` 资源。建 agent 的时候 `BetaManagedAgentsAgentParams` 里现在能塞 `BetaManagedAgentsMultiagentCoordinatorParams`，定义一个 coordinator agent 加一份 roster（`BetaManagedAgentsMultiagentRosterEntryParams`），再用 `BetaManagedAgentsMultiagentSelfParams` 标自己在 roster 里的位置。也就是说，agent 配置里直接声明「我能调度谁、谁能调度我」，调度逻辑落在 Anthropic 服务端，不需要本地 orchestrator。

**Outcomes 评估**是这次最容易被忽略的一块。新增了 `BetaManagedAgentsOutcomeEvaluationResource`，配套一组事件流，`BetaManagedAgentsSpanOutcomeEvaluationStartEvent` / `OngoingEvent` / `EndEvent`，加上 `BetaManagedAgentsUserDefineOutcomeEvent`。再往下还有 `BetaManagedAgentsFileRubric` 和 `BetaManagedAgentsTextRubric` 两种 rubric 类型。我的读法是，Anthropic 把「agent 跑完一段后，按用户给的 rubric 自动打分」做成了 SDK 一等公民。不是事后跑 eval 脚本，是 session 内嵌评估事件。

**Webhooks** 新增了二十多个事件类型常量，session_created / session_running / session_idled / session_requires_action / session_terminated / vault_created / vault_credential_refresh_failed 都列在 `from anthropic.types.beta import` 下面。最关键的是导出了 `UnwrapWebhookEvent`，标准 webhook 验签的 helper。pyproject 里也加了一个可选依赖 `webhooks = ["standardwebhooks >= 1.0.1, < 2"]`。

**Vault validation** 这块我觉得最实操。`client.beta.vaults.credentials.mcp_oauth_validate(credential_id, vault_id=...)` 一行调用，返回 `BetaManagedAgentsCredentialValidation`。意思是你把 MCP server 的 OAuth 凭据存进 vault 之后，能在不真正跑 agent 的前提下，单独验一遍 token 还活不活、refresh 还能不能续。`BetaManagedAgentsMCPProbe` 和 `BetaManagedAgentsRefreshHTTPResponse` 这两个类型说明它真的去 probe 了一次目标 MCP server。

加在一起，这次 SDK 把 Managed Agents 从「raw HTTP service」推到了「Python 工程师能像调 `messages.create()` 一样调 `agents.create()`」的层级。

## 国内 agent 平台对照表

这一块我刻意做了，因为国内目前没人按这四件事统一对照过。

| 能力 | Anthropic SDK v0.100 | Coze（字节）| 千帆 AgentBuilder（百度）| 通义 AgentScope（阿里）| Dify | GLM AgentTool（智谱）|
|---|---|---|---|---|---|---|
| 多 agent 编排 | `agents.create` 内嵌 coordinator + roster | 工作流节点拼接 | DAG + 子工作流 | Python 代码层显式 graph | Workflow 可视化 | function-call 链式 |
| Outcome 评估 | SDK 内 rubric + 流式评估事件 | 离线评测台单跑 | 离线评估任务 | 框架内可写但不强制 | 评测在企业版 | 控制台日志为主 |
| Webhook | 标准 webhook 签名 + 二十种事件 | 平台 webhook 模板 | 部分事件 | 无原生，自建 | 自建 + 第三方 | 自建 |
| 凭据校验 | `mcp_oauth_validate` 单独 probe | 平台插件市场托管 | 应用授权台 | 代码里手写 | 工具配置页 | API key 管理页 |

对照下来有几个事实。

第一，**多 agent**这块国内基本都做了，但 Coze 和千帆走的是可视化编排，AgentScope 走代码 graph，Dify 走 workflow，没有谁像 Anthropic 这样把「coordinator + roster」直接塞进 agent 的元数据。差别在于，Anthropic 的方案让 agent 自描述，不依赖外部 DAG 文件。

第二，**outcomes** 这块差距最明显。国内平台普遍把 eval 当成独立子系统，Coze 的评测台是另一个入口，千帆和 Dify 都要单独建评估任务。Anthropic 选择把 rubric 评估变成 session 内事件流，agent 跑的时候同步出分。这条路如果跑通，会让「线上灰度 + 自动质检」变得没有缝。

第三，**vault validation** 国内目前没有对标。Coze 的插件中心、千帆的应用授权页都是凭据管理界面，但没有一个「我先 probe 一下这个 MCP server 的 OAuth 还能不能用」的 API。这是 MCP 生态深度集成才会暴露出的需求，国产平台对 MCP 的拥抱度参差，对标节奏自然慢。

第四，**webhook** 这块 Coze 已经做得不错，但事件粒度没有 Anthropic 这次列的二十多种细。session_idled、vault_credential_refresh_failed 这类事件，等于把 agent 的整个生命周期摊开成可订阅的事件流。

## 社区在讨论什么

过去 30 天 Reddit 上几条贴值得抄录。

r/AIDiscussion 4 月 17 号一篇 51 赞、22 评的帖说，主流 AI 厂正在收敛到同一件事，「每个 agent 都该拿到一个常驻 bash shell / 虚拟沙箱作为一等公民」。Anthropic 已经做成了 Managed Agents 在 preview，OpenAI 准备推同方向更大动作，Meta 在围着同一个想法转。

r/ClaudeAI 4 月 14 号一篇对照贴写得直接，「Managed Agents 把 agent loop、sandbox、tool 执行全跑在 Anthropic 基础设施里，你什么都不用管，支持小时级长任务、checkpoint、代码执行」。底下没人反驳，方向已经清楚。

r/LLMDevs 4 月 11 号有人发了一篇 dev notes，标题是「Wire-compatible open-source Anthropic Managed Agents」。作者自述读完 wire format 后，决定自己复刻一个开源 wire 兼容实现。贴里提到 Managed Agents 定价 0.08 美元每 active session-hour，闭源，仅 Claude，数据全过 Anthropic infra。这是「国内复刻一个对标版」的暗示。

r/SideProject 4 月 15 号已经有人开了 AgentForge，标语「Ship production AI agents on Claude's Managed Agents API in minutes」。Anthropic Managed Agents 是 4 月 8 号正式开放的，一周之内就有人围着它做 wrapper。

四条放一起读，社区已经默认 Managed Agents 会成事实标准，争论的是「闭源 + 数据出境」要不要绕开、绕开多远。

## 我的判断

我认为 Anthropic 这次把 Managed Agents 四件套合进主 SDK，完成了 agent 中台的事实标准卡位。

理由两条。一是没有做独立的 `anthropic-agents` 子包，直接合进 `anthropic` 主命名空间，agent 不再是边缘实验，是一级 API。二是 coordinator + rubric + webhook + vault 是闭环，从编排到评估到生命周期再到凭据，国内没有任何一家把这五件事整合在一个 SDK 命名空间下。加上 `standardwebhooks` 这个开放标准依赖，Anthropic 想让生态集成成本最低。

国内平台的「自有 DSL」会不会被吞掉，分两层看。开发者层，会被。一旦写过 `client.beta.agents.create(multiagent_coordinator=...)`，再回去拼 Coze 节点，体验落差是真切的，可视化平台的护城河会从 DSL 往「整合度 + 国内合规」上撤。企业层，不会被。Anthropic 数据出境这关国内 toB 过不去，Managed Agents 短期进不了中国大陆企业市场，国内厂商的真实对手仍然是彼此。

国内 agent 平台对标的优先级，我排 outcomes 评估第一，国内普遍最薄；vault credential probe 第二，做好的成本不高、对 MCP 生态深度的信号很强；多 agent 调度第三，国产 DAG 工作流已经够能打。

## 怎么动手

今天就能跑的最小路径。

```
pip install -U anthropic
```

升上去之后，import 看看新类型在不在。

```
from anthropic.types.beta import (
    BetaManagedAgentsMultiagentCoordinatorParams,
    BetaManagedAgentsUserDefineOutcomeEvent,
    UnwrapWebhookEvent,
    BetaManagedAgentsCredentialValidation,
)
```

四个名字如果都能 import 进来，证明你装到了 v0.100。Managed Agents 本身还在 beta，需要 Anthropic Console 开通，国内同学没账号也没关系，光读 api.md 和这些类型签名，已经能对照自己平台的 SDK 设计补哪几块。

更建议的姿势，把你自家平台的 SDK reference 拉出来，按「multiagent / outcomes / webhooks / vault」这四个词做一次 grep。grep 不到的，就是你下一个 sprint 该补的能力。

## 相关链接

- v0.100.0 release notes，<https://github.com/anthropics/anthropic-sdk-python/releases/tag/v0.100.0>
- 触发这次更新的 commit 3b3deee，<https://github.com/anthropics/anthropic-sdk-python/commit/3b3deee9c479ce5b54411a8572b66c5a90f1d50f>
- Claude Managed Agents API 概览，<https://platform.claude.com/docs/en/api/getting-started>
- 仓库主页，<https://github.com/anthropics/anthropic-sdk-python>

---
相关实体:: [[anthropic|Anthropic]] | [[claude|Claude]] | [[dify|Dify]] | [[bytedance|字节跳动]] | [[baidu|百度]] | [[alibaba|阿里]] | [[zhipu|智谱]]
相关主题:: [[agent-frameworks|Agent 框架]] | [[ai-coding-tools|AI 编程工具]] | [[chinese-ai|国产 AI]]

<!-- REACH: 7/10 | 品牌✓ 利益点～ 可操作✓ -->
