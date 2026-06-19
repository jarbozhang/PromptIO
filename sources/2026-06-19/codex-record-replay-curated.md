---
title: "Codex Record & Replay：演示一次，把重复操作变成可复用 Skill"
url: "https://developers.openai.com/codex/record-and-replay"
source: "Curated official summary"
source_type: curated
language: zh
published: "2026-06-18T00:00:00Z"
fetched_at: "2026-06-19T15:10:00+08:00"
---

OpenAI Codex 文档新增 Record & Replay 页面。它的核心是，让用户在 Mac 上演示一次稳定的重复流程，Codex 观察操作后生成一个可复用 Skill。

官方文档确认的使用条件：
- 功能面向 macOS。
- 初始可用区域不包含 EEA、英国和瑞士。
- 需要启用 Computer Use。
- 入口在 Codex app 的 Plugins，加号菜单，选择 Record a skill。

官方文档给出的适用场景包括，报销填单、预订车位、创建配置正确的 issue、发布视频、下载周期性报告等。这些流程共同特点是，步骤稳定、偏好明确、成功标准清楚，但用自然语言逐步描述很繁琐。

录制结束后，Codex 会分析捕获到的工作流并起草 Skill。这个 Skill 应说明什么时候使用、需要哪些输入、执行哪些步骤，以及如何验证结果。用户可以继续要求 Codex 修改这份 Skill。

重放时，用户在新会话里要求 Codex 使用生成的 Skill，并提供本次不同的参数，例如文件、issue、日期范围等。Codex 会结合当前环境可用工具完成流程，包括 Computer Use、浏览器操作和已连接插件。

Codex changelog 记录，2026-06-18 的 Codex app 26.616 新增了 Record & Replay，同时新增 automation run history 批量操作、SSH 连接管理 deep link，并改进 Browser Use 可见标签页路由和注释持久性。

适合写作角度，重点不是“AI 记住鼠标轨迹”，而是把原本靠人工口述的操作流程，变成可检查、可修改、可传承的 Skill。对内容发布、报销、项目管理、资料整理等重复任务都有启发。
