---
title: Codex 会话可以交给远程主机继续跑，长任务终于不用困在一台电脑上
status: draft
date: '2026-06-20'
source: manual
source_url: https://developers.openai.com/codex/remote-connections#hand-off-a-thread-between-hosts
angle: >-
  从长任务开发的真实割裂感切入，讲 thread handoff 在 local host 和 remote host 之间移动 thread 与 Git state。重点写 matching
  project、worktree、SSH host、凭据和正在运行任务会被 interrupt 的边界，而不是把它写成远程开发宣传稿。
voice: first-person
reach: 9
tags:
  - Codex
  - OpenAI
  - 远程主机
  - Agent工作流
  - 开发效率
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Codex 会话可以交给远程主机继续跑，长任务终于不用困在一台电脑上
wechat_title: ''
cover:
  status: skipped
reach_note: Codex 品牌强，官方新能力，开发者能按步骤检查自己是否适合用。
selection_reason: 这是 06-18 Codex app 26.616 后续官方文档确认的能力，和昨天 Record & Replay 的主题不同。
---

# Codex 会话可以交给远程主机继续跑，长任务终于不用困在一台电脑上

Codex 长任务里，最怕的其实不是跑慢，是任务跑到一半，人要离开电脑。

一个长任务开在本机，代码改了一半，thread 里还有上下文，Git state 也在那个工作区里。你换到另一台机器时，重新打开仓库不难，难的是把这条正在干活的线续上。

OpenAI Codex app 26.616 新增的 thread handoff，解决的就是这个割裂感。它可以把一个已有 thread 和对应的 Git state，在本地电脑和已经连接的 remote host 之间移动。

它的重点不在“远程开发入口”。更准确地说，它让一次 agent 开发任务从“绑定在一台电脑上的聊天”，变成“可以迁移的执行线程”。

## 先判断你的任务值不值得 handoff

它适合三类任务。

一类是时间长、上下文重的任务，比如大范围重构、测试修复、文档改造、跨文件迁移。任务如果只跑三分钟，handoff 反而多一步。

第二类是本机不适合一直占着的任务。比如你要合上电脑、切换地点，或者想把长时间运行交给一台更稳定的主机。

第三类是需要保留 Git state 的任务。thread handoff 不只是把聊天记录搬过去，它会转移 thread 和 Git state，并在目标 host 上创建或复用 worktree。

我的判断很简单，凡是“重新开一个 thread 会丢上下文，重新建一个分支会心虚”的任务，才值得用它。

## 把 matching project 先对齐

这个功能最容易踩的坑，不在按钮，而在项目匹配。

handoff 前，目标 host 必须已经连接好，并且在目标 host 上保存了同一个 Git repository 的 project。Codex 只会显示有 matching saved project 的 destination。

如果你的项目不是仓库根目录，而是仓库里的某个子目录，两边也要保存同一个子目录。这个细节很关键。很多 monorepo 里的项目看起来是同一个仓库，但 Codex 匹配的是保存下来的 project 入口。

准备动作可以压成这个清单。

- 本机和 remote host 都保存同一个 Git repository 的 project
- 如果是仓库子目录，两边保存同一个子目录
- 先确认 destination host 已连接
- 检查 Codex footer 里能不能看到目标 run location
- 长任务开始前，先决定它之后可能要去哪台 host

这一步做不好，后面连可选目标都看不到。

## 用 worktree 承接 Git state

官方文档里最值得注意的一句，是 Codex 会创建或复用目标 host 上的 worktree。

这说明 handoff 更像一次工作区交接，而非简单同步文件或远程打开同一个目录。它会在目标 host 上找一个能承接当前 thread 与 Git state 的工作区，让任务继续在那个位置往下走。

这对 agent 应用有启发。过去我们经常把 agent 当成聊天窗口，真正的状态散落在本机文件系统、终端、分支和未提交 diff 里。thread handoff 把这些东西收束到了一个更明确的迁移单元里。

别把它当万能同步。

remote access 使用的是 connected host 上的 projects、threads、files、credentials、permissions、plugins、Computer Use、browser setup 和 local tools。也就是说，到了哪台 host，就受哪台 host 的环境约束。

如果目标主机缺少凭据、权限、插件或本地工具，thread 可以过去，任务未必能无缝继续。

## SSH host 要先能跑 Codex

SSH host 不能只在 Codex 里填个地址就完事。

官方文档给出的前置条件很具体。SSH host 需要先写入 `~/.ssh/config`，确认可以 SSH 连接，然后在远程主机安装并登录 Codex，并且 `codex` 命令要在该 shell 的 `PATH` 中。

顺序大概是这样。

- `~/.ssh/config` 里已经配置目标 host
- 当前机器能正常 SSH 到目标 host
- 远程主机已安装并登录 Codex
- 远程 shell 里能直接运行 `codex`
- 目标 host 里保存了 matching project

这套检查看起来朴素，但它能挡掉大部分“按钮有了，任务过不去”的问题。

## 正在运行的任务会先被 interrupt

这里有个边界要提前知道。

如果 thread 正在运行，handoff 会先 interrupt 当前 response，再转移到目标 host。换句话说，它不会把一个正在生成中的 response 连同执行过程热迁移过去。

这会影响你的使用习惯。

我不会在 Codex 正在做关键改写、跑长命令、生成大段 patch 时立刻 handoff。更稳的做法是等它到一个自然停顿点，或者明确让它先收束当前状态，再交给目标 host。

还有两个限制也要记住。你可以在另一个 thread 里要求 Codex 把某个命名 thread hand off 到已连接 host，但 Codex 不能 hand off 正在发起请求的那个 thread，也不支持 handoff 到 Codex cloud environment。

所以更适合把它当成“长任务换班”，而不是“随时瞬移”。换班前，最好让当前任务留一个干净的交接点。

## 一个低风险开始方式

第一次别拿生产仓库直接试。

找一个小仓库，或者找一个不重要的分支，先做一次完整路径验证。本机开一个 thread，让 Codex 改一点文件，确认 Git state 有变化。然后在 footer 里选择当前 run location，再选 destination host，把 thread 交过去。

到了 remote host 后，看 worktree、diff 和 thread 是否还能接着理解当前任务。再从远程选择 This computer，把 thread 带回本机。

这个闭环跑通后，再把它放进真实长任务里。

我对它的期待不在“更酷的远程开发”。更关键的是，agent 任务终于不用被一台电脑的电量、位置和本地环境绑死。长任务可以继续，但每次迁移都要尊重 project、worktree、凭据和正在运行任务会中断这几条边界。

把这些边界记住，thread handoff 才是工作流能力，不是另一个新按钮。

## 相关链接

- OpenAI Codex Remote connections 文档，https://developers.openai.com/codex/remote-connections#hand-off-a-thread-between-hosts
