---
title: >-
  看了会 DeepSeek Harness，说下个人感受。 整体感受，dsh 更像一份「harness 该怎么写」的参考实现，不太像一个要抢 Claude
  Code 用户的产品。体验上目前还有点粗糙，架构上比较“激进”。 1\ 上手只要 npx @deepseek-ai/dsh@latest
  web，它还会自动从环境变量里找 DEEPSEEK_API_KEY 
source: X @chenchengpro
url: 'https://x.com/chenchengpro/status/2088201936072024253'
date: 'Fri Aug 14 09:51:53 +0000 2026'
likes: 140
reposts: 12
replies: 5
source_type: x
language: zh
account_name: chenchengpro
fetched_at: '2026-08-20T11:13:35.919Z'
---
看了会 DeepSeek Harness，说下个人感受。

整体感受，dsh 更像一份「harness 该怎么写」的参考实现，不太像一个要抢 Claude Code 用户的产品。体验上目前还有点粗糙，架构上比较“激进”。

1\ 上手只要 npx @deepseek-ai/dsh@latest web，它还会自动从环境变量里找 DEEPSEEK_API_KEY 填上，对我来说一行命令直接用上。但对非前端程序员，npx 仍是门槛。刚在 x 上看到有人基于它封了 electron 客户端，这类缺口大概会由社区补齐，官方看起来没打算自己做。

2\ 默认上 web 而不是 TUI，这个切入点很聪明。翻源码还看到一个细节，仓库里有过一版 TUI，写完又删了，只留 Web。TUI 对小白用户确实有门槛（这也是大家这么喜欢用 codex 的原因之一），dsh 把这条路线整个砍掉，是主动决策，还是时间上不够呢？

3\ 内核就一套插件体系（Cordis），所有功能都是插件，agent loop 本身也是。最早做 umi 时做过类似的事，webpack、vite 也是这个思路，但 dsh 插得更彻底。举两个例子。它有一组别家都没有的 cordis_* 工具，模型可以在运行期给自己装卸 harness 插件。e2b 扩展只替换 ctx.fs 和 ctx.subprocess 这两个 hook，整个执行环境就搬进了 E2B 沙箱，bash、terminal、lsp 零改动跟着走，连「在哪里执行」都是插件。代价也在这，插件权限大到能改内核，上午一位老程序员提醒我说，这可能很容易被改坏。

另外，dsh 用 MIT 协议但明确拒收外部 PR，想参与只能去 Discussions 或者自己写插件。核心封闭开发，生态全走外部 npm 包（`dsh plugin add` 就是 pnpm 转发）。插件体系最坏的场景是没人为他写插件，但以 DeepSeek 的体量，应该不缺。dshhub[.]org 上看了眼，已经 700+ 了。

4\ 「轨迹」功能让我眼前一亮，开发者能看清每个细节，观感有点像蚂蚁同事开发的 weiesky/cc-viewer。往下翻一层，这个功能是事件溯源架构的副产品。每个流式 delta、每次审批（asked/decided 成对）都是持久化事件，可以 replay，轨迹 UI 只是把它们画了出来。配套还有一组 `session_*` 工具，模型自己能把历史会话当数据库查，也是个其他 code agent 都没有的点。

5\ 让 AI 统计了下。65 天，12,293 个 commit，平均一天 190 个，7 月单月 8,273 个，7 月 30 日那天 887 个。37 位贡献者，Tianyi Cui 一个人占 43%。分支名能体现出部分开发方式。`worktree/` 开头的 210 个，`codex/` 开头的 203 个，另有 `agent/` 15 个、`claude/` 3 个。代码在 git worktree 里由 agent 并行产出，人负责 review 和 merge。

6\ 要做到这个提交量需要严格的门禁。测试代码 26.8 万行，比源码（22.8 万行）还多 4 万行，CI 里挂着 per-file 100% 覆盖检查。敢让 agent 一天产出 190 个 commit，人为 review 的话肯定是 review 不过来的。

7\ AGENTS.md 也类似，有个叫 verify-doc-budgets 的脚本管着他，根文件上限 1600 词，只能往下调不能往上加。

几个值得一看的规则。1）「Non-trivial changes MUST include an Agent Note in the same PR」，agent 参与开发设计的决策要留痕，2）「Trust TypeScript at typed same-process boundaries」，不用到处 validate，信任静态类型，可以少很多冗余代码和测试，3）「Tests describe behavior, not correctness. Change obsolete behavior with its tests; explain why in the PR.」让 ai 在测试挂了时也敢改，在 PR 里解释原因即可，4）「Never default to the full suite or repeat a passing check」，禁止无脑跑全量，可以让 ai coding 提速。

8\ 接着跑了一份 dsh + qodercli + claude code + opencode + pi + grok build + kimi code + codex 的源码级功能横评，具体的分数表就不贴了。

dsh 虽然总分低一些，但「扩展性」和「多 agent 编排」都是 5 分满分(和 Codex/Grok 并列最高)，在「交互体验」、「企业能力」和「成熟度」上目前还弱一些。

dsh 的 subagent 有 6 个 provider，subagent-claude-code、subagent-codex、subagent-acp 等。所以干活的不必是 dsh 自己，任何能跑任务的 agent 都可以被接进来当手下。
