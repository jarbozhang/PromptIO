---
title: AI 写代码太快，PR 闸门得先自动跑起来
status: draft
date: '2026-06-21'
source: manual
source_url: https://github.com/kunchenguid/no-mistakes
angle: >-
  从 no-mistakes 的本地 git 代理切入，把 AI 代码从产出 diff 转向验证 diff。重点写 disposable
  worktree、review/test/docs/lint/PR/CI 顺序、finding 分流和人仍然拍板，整理成团队接入 AI 编程后的 PR 门控检查清单。
voice: first-person
reach: 8
tags:
  - AI编程
  - 代码审查
  - PR流程
  - 工程效率
  - Agent
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: AI 写代码太快，PR 闸门得先自动跑起来
wechat_title: ''
cover:
  status: skipped
reach_note: AI 编程痛点明确，PR 闸门和自动验证可直接迁移到读者工作流。
selection_reason: 官方 README 主源充分，X 讨论提供问题意识，适合做成工程实践文。
---

# AI 写代码太快，PR 闸门得先自动跑起来

AI 编程接进团队后，最先爆掉的往往不是写代码速度，而是验证速度。

我现在更关心一个问题，代码助手已经能连续产出 diff，团队有没有一个固定闸门，能在 PR 之前把 review、test、docs、lint、CI 这些动作先跑完。

no-mistakes 这个仓库有意思的地方就在这里。它没有把自己包装成另一个写代码助手，而是在真实 remote 前面放了一个本地 git proxy。开发者推送到 no-mistakes remote，检查都过了，它再往上游转发，并自动开一个干净 PR。

## 先把 AI 产出改成 AI 验证

很多团队接 AI 编程，第一反应是让 Claude Code、Codex 或 Cursor 多写一点。

我的判断刚好相反，真正该优先自动化的是验证 diff。

因为人写代码时，PR 的节奏通常还能被 reviewer 消化。Agent 一旦开始批量改文件，问题就变成了，谁来确认这组 diff 能测、能 lint、文档跟得上、PR 能进 CI。

no-mistakes 的核心动作很简单，README 里给出的工作流就是 `git push no-mistakes`。

这个 push 不是直接进 origin。它会启动一个 disposable worktree，在隔离环境里跑一条验证链路，包括 review、test、docs、lint、push、PR 和 CI checks。全部通过后，代码才继续往上游走。

这个设计我很喜欢的一点是，它不打断开发者当前工作目录。验证在一次性 worktree 里跑，当前目录不被来回切状态，不需要为了跑门禁把手头现场弄乱。

## 把 PR 前检查排成固定顺序

我会把 no-mistakes 当成团队接入 AI 编程后的 PR 前置闸门，而不是个人提效插件。

可收藏的接入清单可以先这么排。

- 适合谁，已经在用 Claude Code、Codex、opencode 或其他 coding agent 的团队
- 怎么做，把代码推到 no-mistakes remote，而不是直接推 origin
- 检查顺序，review 先找问题，test 看行为，docs 补交付说明，lint 收机械问题，再 push、开 PR、等 CI
- 坑点，别让所有 finding 都自动修，涉及意图判断的变更要留给人拍板
- 交付形态，一个已经通过门禁的干净 PR，而不是一坨等人收拾的 diff

这里的关键不是多跑几个命令，而是把顺序固定下来。

AI 写代码最麻烦的地方，是它经常把“能改”和“该改”混在一起。review 和 lint 能处理一部分机械问题，test 和 CI 能处理一部分行为问题，但产品意图、边界取舍、是否应该跳过某个发现，仍然要有人负责。

## 别让自动修复越过人

README 里有一个细节值得盯住，findings 会走不同处理路径。

安全的机械修复可以自动应用。带意图判断的 finding，会升级给人，由人决定 approve、fix 或 skip。

我认为这是 no-mistakes 最重要的分界线。

很多团队一听到 AI gate，容易想成“让 agent 自动把 PR 修到绿”。这句话听起来省事，但风险很高。真正靠谱的门禁应该分清两类事，一类是格式、lint、明显机械错误，交给机器没问题；另一类是需求理解、接口语义、测试是否覆盖了关键路径，必须留在人的决策面上。

如果团队把这层边界糊掉，门禁就会从质量系统变成另一个无人看管的改代码入口。

## 用测试仓库先跑通一条门禁

README 给出的安装入口是 `curl -fsSL https://raw.githubusercontent.com/kunchenguid/no-mistakes/main/docs/install.sh | sh`，初始化命令是 `no-mistakes init`。

它还会安装用户级 `/no-mistakes` skill。这个 skill 可以让 coding agent 做一个任务后再经过门禁，也可以只门禁已经 commit 的工作。

我不会建议一上来就把它接到主仓库。更稳的做法是先拿一个测试仓库跑通最小闭环。

可以按这个顺序验。

- 建一个小分支，准备一组已 commit 的改动
- 用 no-mistakes 初始化 gate 和 skill
- 通过 `git push no-mistakes` 触发验证
- 观察 disposable worktree 是否能完整跑完检查
- 看 PR 是否自动创建，并确认 CI checks 的状态
- 故意制造一个 lint 或 test 问题，看 finding 如何分流
- 记录哪些问题适合自动修，哪些必须人工拍板

no-mistakes 还支持 TUI 路径，可以创建分支、commit、通过 gate push，并 attach 到当前 run。对想把门禁做成日常工作台的团队，这个入口会比纯命令更贴近真实流程。

## 最后落地的是一套团队习惯

no-mistakes 还做了一个务实选择，它是 agent-agnostic。

README 提到它支持 claude、codex、rovodev、opencode、pi，以及通过 acpx 支持 ACP targets。这对团队很重要，因为真实工作里很少只有一个代码助手。有的人用 Claude Code，有的人用 Codex，有的人试 opencode，门禁如果绑死某个 agent，很快就会变成局部工具。

我对这类工具的期待不是“替我写更多代码”，而是把 PR 之前的检查变成团队默认动作。

AI 编程进入团队以后，PR 不该继续靠 reviewer 肉眼兜底。更合理的分工是，agent 负责产出和一部分机械修复，门禁负责把验证流程跑完整，人负责最后的语义判断和合并拍板。

如果你现在已经开始担心 AI diff 太快，不妨先别加新工具写更多代码。先加一个闸门，确认每一次 push 都能留下一个可审、可测、可追踪的 PR。

## 相关链接

- GitHub 仓库，https://github.com/kunchenguid/no-mistakes
- 安装脚本路径，https://raw.githubusercontent.com/kunchenguid/no-mistakes/main/docs/install.sh
