---
title: >-
  发现一个专为 AI 编程 Agent 量身定做的「tmux」—— Herdr 以前同时跑 Claude Code + Codex + OpenCode
  时，终端窗口乱飞： - 哪个 Agent 卡住了？ - 哪个在后台默默跑完？ - 项目散在本地/服务器，切来切去头疼… Herdr
  把这些状态集中到一个侧边栏里，让你先去处理真正需要人工介入的会话，而不是挨个
source: X @sitinme
url: 'https://x.com/sitinme/status/2080926910599848043'
date: 'Sat Jul 25 08:03:31 +0000 2026'
likes: 61
reposts: 6
replies: 45
source_type: x
language: zh
account_name: sitinme
fetched_at: '2026-07-27T11:13:32.526Z'
---
发现一个专为 AI 编程 Agent 量身定做的「tmux」—— Herdr

以前同时跑 Claude Code + Codex + OpenCode 时，终端窗口乱飞： 
- 哪个 Agent 卡住了？ 
- 哪个在后台默默跑完？ 
- 项目散在本地/服务器，切来切去头疼…

Herdr 把这些状态集中到一个侧边栏里，让你先去处理真正需要人工介入的会话，而不是挨个窗口检查。

支持持久会话和远程连接。就算关掉终端，Agent 也可以继续在后台运行，之后再通过 SSH、电脑甚至手机重新接入。

Herdr 还提供 CLI、Socket API 和 Agent Skill，意味着 Agent 本身也可以创建窗格、启动其他 Agent、读取输出并等待任务完成。

不过它不是全能编排系统——它不会自动帮你拆任务、解决代码冲突、统计成本或判断项目完成度。

Agent 状态很多时候仍依赖终端界面和规则匹配，所以偶尔也会出现误判。

所以，Herdr 最适合的是那些每天同时跑多个 CLI Agent、经常在本机和远程服务器之间切换，又不想花大量时间折腾 tmux 配置的人。

用它管理多机 + 多 Agent 工作流，效率肉眼可见提升💪
