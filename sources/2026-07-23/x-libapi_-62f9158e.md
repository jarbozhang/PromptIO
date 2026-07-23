---
title: >-
  Hermes Studio v0.6.32 新版本发布 本版本涵盖 0.6.31 之后合并的全部 14 个 PR，聚焦会话分类与压缩、群聊、Workflow
  路由、Skill Bundle、Ekko 记忆、Hermes 0.19 和桌面窗口界面 群聊 @mention 现在可在 CJK 文本、Emoji
  和标点后正常触发；房主也可在房间设置中查看、生成和轮换
source: X @libapi_
url: 'https://x.com/libapi_/status/2079792963845345501'
date: 'Wed Jul 22 04:57:37 +0000 2026'
likes: 53
reposts: 2
replies: 38
source_type: x
language: zh
account_name: libapi_
fetched_at: '2026-07-23T11:04:22.407Z'
---
Hermes Studio v0.6.32 新版本发布 

本版本涵盖 0.6.31 之后合并的全部 14 个 PR，聚焦会话分类与压缩、群聊、Workflow 路由、Skill Bundle、Ekko 记忆、Hermes 0.19 和桌面窗口界面

群聊 @mention 现在可在 CJK 文本、Emoji 和标点后正常触发；房主也可在房间设置中查看、生成和轮换邀请码

Workflow 在 handoff 和重新连接过程中会保留每次 Hermes Bridge 运行的来源；Scoped Codex 和 Claude Code 节点也可为有效 API Key 目标使用 launcher 支持的协议

会话新增全局分类、更准确的 Markdown 感知搜索排序，以及在编辑、分支和并发运行中保持正确并限制历史范围的游标压缩；完整压缩方案也已形成文档

现在可直接在聊天中创建、浏览、运行和删除 Profile 级 Skill Bundle，并清楚查看其中包含的 Skill

Ekko 记忆改用 Profile 隔离的单一规范模型，支持 revision 校验的精确修改、更完整的来源审计和更严格的相关性过滤

Hermes 0.19 的助手中间消息会以独立气泡实时显示并保存；普通单聊也可异步投递持久化的后台委派结果

新的桌面 Runtime 构建、后备路径和 Windows CLI shim 现在默认使用 Hermes Agent 0.19.0

桌面窗口控件已融入页面框架：macOS 红绿灯位于侧边栏，Windows 控件位于主内容上方，Linux 继续使用原生窗口装饰

开发文档现在同时支持直接使用当前 checkout，并可按需采用隔离的 Git worktree
