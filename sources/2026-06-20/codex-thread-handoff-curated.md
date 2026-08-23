---
title: "Codex thread handoff：把本地会话交给远程主机继续跑"
url: "https://developers.openai.com/codex/remote-connections#hand-off-a-thread-between-hosts"
source: "Curated official OpenAI Developers summary"
source_type: curated
language: zh
published: "2026-06-18T00:00:00Z"
fetched_at: "2026-06-20T13:05:00+08:00"
---

OpenAI Codex app 26.616 changelog 新增 thread handoff between local and remote hosts。官方文档把它放在 Remote connections 页面：Handoff 可以在本地电脑和已连接的 remote host 之间移动已有 thread 及其 Git state。

官方确认的核心能力：

- 用户可以先在本地开始工作，再把 thread 交给远程电脑上的 worktree 继续，之后还可以把 thread 带回本机。
- handoff 前需要连接 destination host，并在目标 host 上保存同一个 Git repository 的 project；如果项目是仓库子目录，两边要保存同一个子目录。
- Codex 只显示有 matching saved project 的 destination。
- 操作入口在 Codex App 的 thread footer：选择当前 run location，再选择 destination host；从远程带回时选择 This computer。
- Codex 会创建或复用目标 host 上的 worktree，转移 thread 与 Git state，并把 thread 切到目标 host。
- 如果 thread 正在运行，handoff 会先 interrupt 当前 response 再转移。
- 用户也可以在另一个 thread 里要求 Codex 把某个命名 thread hand off 到已连接 host；但 Codex 不能 hand off 正在发起请求的那个 thread，也不支持 handoff 到 Codex cloud environment。

Remote connections 文档还说明，remote access 使用 connected host 的 projects、threads、files、credentials、permissions、plugins、Computer Use、browser setup 和 local tools。SSH host 需要先写入 `~/.ssh/config`，确认可 SSH，再在远程主机安装并登录 Codex，且 `codex` 命令要在该 shell 的 PATH 中。

适合写作角度：这不是“远程开发又多一个入口”，而是 Agent 工作流从一台机器上的聊天，变成可以迁移的执行线程。读者要关注 matching project、worktree、Git state、权限、凭据和正在运行任务被中断这几个边界。
