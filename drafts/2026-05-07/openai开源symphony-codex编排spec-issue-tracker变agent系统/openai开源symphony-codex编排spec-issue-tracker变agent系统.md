# OpenAI 开源 Symphony spec，把 Linear 当事件源，Codex 自己从 backlog 里拿活干

OpenAI 在 4 月底放出来一个叫 Symphony 的东西，它不是产品，是规范（spec）加一个 Elixir 的参考实现。GitHub 仓库 openai/symphony，Apache 2.0。读完 SPEC.md 第一反应，这套接口的形状跟 5 月初社区里讨论的"agent 永动机"完全对得上号。

值得拆一下，因为它给后面所有想做 coding agent 编排的团队画了一条参考线。

## Symphony 想解决什么

一句话，把 issue tracker 变成 coding agent 的事件源。

之前你跑 Codex 或 Claude Code 是这样，开终端，粘 prompt，盯着它跑，跑完看 diff，提 PR。一个工程师同时盯 2 到 3 个 session 已经接近极限，再多就忘了哪个在干什么。社区的原话是"jump btw terminals to nudge agents back on track"。

Symphony 的范式切换是，agent 不再被人手动唤起，而是订阅 issue tracker 的状态，看到 active 状态的 ticket 就自动 pickup，分配独立 workspace，跑到完成或 handoff 状态。人只管写 issue 和 review，不管 session。

OpenAI 把这个叫 always-on agent system，目标是 reduce context switching。

## 看 SPEC，规范定了什么

读 SPEC.md 收获最大的是它把数据模型抠得非常具体，不是那种"我们提倡 agent 自主"的玄学层。

**Issue 是核心实体**。规范定义了一个 normalized issue record，字段包括 `id`, `identifier`, `title`, `description`, `priority`, `state`, `branch_name`, `url`, `labels`, `blocked_by`, `created_at`, `updated_at`。任何 issue tracker 适配层都要把自己的数据格式映射到这个结构，Symphony 编排器只认这个结构。

**Workspace 是文件系统隔离**。每个 issue 分配一个目录，路径必须在配置的 `workspace.root` 之下，目录名要 sanitize 到 `[A-Za-z0-9._-]`。规范里专门有一节叫 Safety Invariants，强制在 launch 之前校验 `cwd == workspace_path`。

**Run Attempt 是一次执行**。状态机是 `PreparingWorkspace → BuildingPrompt → LaunchingAgentProcess → StreamingTurn → Finishing → 终态`。每次 attempt 拿一次 workspace，跑最多 `max_turns` 个 turn（默认 20），超时或 issue 状态变了就退出。

**WORKFLOW.md 是工作流定义**。YAML front matter 加 Markdown 提示词正文，提示词用 Liquid 模板渲染，可以引用 `issue` 对象和 `attempt` 变量。配置里 `tracker.kind` 当前只支持 `linear`，`polling.interval_ms` 默认 30 秒，`hooks` 有 `after_create / before_run / after_run / before_remove` 四个钩子。

**Linear 适配器三个必需操作**，`fetch_candidate_issues()`、`fetch_issues_by_states(state_names)`、`fetch_issue_states_by_ids(issue_ids)`。Linear 那边走 GraphQL，按 `slugId` 过滤项目。

也就是说，Symphony 不是一个 monolithic 的 agent runtime，它是把"如何把 ticket 变成 agent 任务"这件事拆成了 5 个标准接口，谁都可以替换其中一层。

## 为什么 spec 而不是产品

这是这次发布最值得琢磨的一步。

OpenAI 完全有能力做一个 SaaS，带 Linear 集成、带 dashboard、带审计日志。但它选择只发 spec 和一个 Elixir 参考实现，参考实现仓库里 95.5% 是 Elixir 代码，更像是给"读懂规范"的人看的，而不是给生产部署用的。

对生态的潜台词是，issue tracker 适配层我不做，你们自己接。Linear 之外，GitHub Issues、Jira、Linear、PingCode、Coding.net、Tapd，谁先把适配器写出来，谁就在那个生态里占位。

这跟 LSP（Language Server Protocol）、MCP（Model Context Protocol）的玩法是一致的，OpenAI 愿意定义协议层，把竞争挪到协议下面的实现层。

## 国内 issue tracker 怎么接

国内研发流程很少用 Linear，主流是 PingCode、Coding.net、Tapd、企业自建 Jira。把这些系统接到 Symphony spec 上，要做的工作非常清晰。

**写一个 tracker adapter**。SPEC 里 Linear 适配器的三个操作翻译过来就是，"拉处于 active 状态的 issue 列表"、"按状态名拉 issue（启动时清理用）"、"按 id 列表刷新 issue 状态"。任何一个 issue tracker 都能用它的开放 API 满足这三件事。Tapd 有 OpenAPI，PingCode 有 REST，Coding.net 有 OpenAPI 2.0。

**字段映射**。把自家系统的字段映射到 Symphony 的 normalized issue。重点是 `state`（active/terminal）、`labels`（统一小写）、`blocked_by`（依赖关系）、`branch_name`（agent 用来建分支）。priority 转成整数或 null。

**部署一份编排器**。可以直接用官方 Elixir 参考实现（Apache 2.0），也可以照着 SPEC 用 Node 或 Go 重写一份。后端跑起来后挂 cron 或 daemon，按 `polling.interval_ms` 拉 issue。

**配置 codex 命令**。SPEC 的 `codex.command` 默认是 `codex app-server`，但本质是任何能起 session 的 CLI 都可以替换。这里给了国内方案的接入空间，比如 OpenRouter 镜像里的 Codex 模型、或国产 Claude Code 平替（Qwen Code、SmolLM3 系列对接的 CLI 工具）。只要这个 CLI 能 fork 一个 long-running session、能接收 prompt、能输出 turn 事件，理论上就能套进 Symphony 的 agent 槽位。

## 几个工程上的细节值得注意

**hook 是脱钩点**。`after_create` 在新 workspace 创建后跑一次，可以用来 git clone、装依赖、跑 db migration。`before_run` 每次 attempt 前跑，失败就放弃这次 attempt。`after_run` 跑完跑，失败只记 log。`before_remove` 删除 workspace 前跑。这就把"业务定制"完全压到 shell 脚本层，编排器自己不做 CI 触发、PR 创建、视频录制这些事。SPEC 原话，"workflow（prompt + hooks）owns business logic including ticket mutations and PR feedback"。

**stall detection 是必需的**。Reconciliation Part A 检查 `elapsed_ms > stall_timeout_ms`（默认 5 分钟），超时就 terminate。Part B 刷新 issue 状态，如果 ticket 在 tracker 里被改成 terminal 状态，就停掉清理。也就是说，人在 tracker 里改 ticket 状态可以反过来杀 agent，这个反向控制点很重要。

**concurrency 双层**。全局 `max_concurrent_agents`（默认 10），加每个 state 的细粒度限制 `max_concurrent_agents_by_state`。可以做到"in-progress 同时跑 5 个，code-review 同时跑 3 个"这种排队。

**continuation turn 复用 thread_id**。同一个 attempt 里的多 turn 共享 session，子进程一直活着到 worker 结束。这是为什么参考实现选 Elixir，BEAM 的 process 模型管理这种长生命周期 supervisor tree 比 Node 顺手得多。

## 这跟 5/3 拆 coding agent 五大组件接得上

5 月 3 号我们写过 Sebastian Raschka 那篇文章，把 coding agent 拆成 LLM、工具、记忆、prompt、控制循环五个组件。Symphony 是把这五个组件再往外推一层，定义了"五大组件之外的 orchestration 边界"。

prompt 现在被 WORKFLOW.md 的 Liquid 模板规范化了，控制循环被 PreparingWorkspace 到 Finishing 的状态机规范化了，工具入口被 client-side tool 接口规范化了（Linear 适配里有个可选的 `linear_graphql` 工具暴露给 agent 用）。

把组件接成"issue-driven 的工作流"是下一层抽象，Symphony 给的是这一层的接口定义。

## 我的判断

OpenAI 这次开 spec 不开产品，是个聪明动作。

第一，spec 比产品更难抄。产品出来一个月就有平替，spec 一旦被生态接住，标准就稳定了。LSP 出来到 Cursor 当上头部 IDE 是 9 年，期间没人能撕掉这个协议。

第二，spec 把 issue tracker 抽象掉，意味着以后哪个 tracker 占主导都跟 OpenAI 无关，Codex 模型只管做"被调度方"。这是一个很谦卑的位置，但是是协议层的位置。

第三，对中国团队的实操机会非常具体，谁先把 PingCode 或 Tapd 的 Symphony adapter 写出来开源，谁就拿到这个赛道在中国的早期话语权。代码量预估在 500 行以内，三个 GraphQL/REST 包装加一层字段映射。

不太好的一面是，参考实现选 Elixir，对国内大部分团队是劝退栈。Node 或 Go 的二次实现需要社区跟进，目前看 GitHub 仓库已经有 15.5k 星，但二次实现还没看到。

## 行动建议

如果你在做 internal coding agent 平台，建议把 SPEC.md 通读一遍，重点看 Section 9.5（safety invariants）、16.5（worker attempt algorithm）、13.7（HTTP server 可选扩展）。

如果你团队用 PingCode 或 Tapd，可以试着写一个最小适配器，三个必需操作满足后丢一个最低优先级的小 issue 进去看 agent 能不能 pickup 跑通。这个 PoC 一个下午能做完。

如果你只是想观望，关注 openai/symphony 这个仓库的 issues 和 PR，看哪些第三方 tracker 适配器先合进来，那大概率就是接下来一年 coding agent orchestration 的主流姿势。

---

相关链接

- Symphony 仓库（含 SPEC.md），https://github.com/openai/symphony
- OpenAI 公告，https://openai.com/index/open-source-codex-orchestration-symphony
- Sherwin Wu 推文（项目作者，OpenAI 工程师），https://x.com/sherwinwu/status/2048839982941700600

---
相关实体:: [[openai|OpenAI]] | [[codex|Codex]] | [[anthropic|Anthropic]] | [[claude-code|Claude Code]] | [[github|GitHub]] | [[bytedance|字节跳动]]
相关主题:: [[ai-coding-tools|AI 编程工具]] | [[agent-frameworks|Agent 框架]] | 方法论

<!-- REACH: 7/10 | 品牌✓ 利益点✗ 可操作✓ -->
