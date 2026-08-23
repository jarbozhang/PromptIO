---
title: "Claude Code Artifacts：把会话产物发布成组织内可看的交互页面"
url: "https://docs.anthropic.com/en/docs/claude-code/artifacts"
source: "Curated official docs summary"
source_type: curated
language: zh
published: "2026-06-18T00:00:00Z"
fetched_at: "2026-06-19T15:10:00+08:00"
---

Anthropic 文档新增 Claude Code Artifacts 页面。Artifacts 的定义是，把 Claude Code 会话中的结果发布成一个私有 URL 下的实时交互页面，团队成员可以在浏览器中查看。

官方文档确认的核心点：
- Artifacts 处于 beta。
- 需要 Team 或 Enterprise plan，并且会话通过 /login 登录。
- 适用入口包括 Claude Code CLI，以及 Claude desktop app 1.13576.0 或更高版本。
- Artifact 是一页自包含交互页面，不是一个长期运行的应用。
- 页面会随着会话继续而更新，可以从页面头部分享给团队成员。

官方文档列出的使用场景包括，给 reviewer 展示带注释的 PR diff、把会话里已有数据渲染成 dashboard、并排比较多个设计或实现方案、记录长任务排查时间线、把链接发给同事而不是复制粘贴终端输出。

组织管理方面，Artifact 内容存储在 Anthropic 运营基础设施中，仅对发布组织内认证成员可见。管理员可以在 Team / Enterprise 计划中启用或关闭 Artifacts、按角色控制权限、设置保留策略、查看审计日志，并通过 Compliance API 列出或删除 artifact。

适合写作角度，Claude Code 过去的很多价值停留在操作者终端里，Artifacts 把“agent 查到什么、怎么判断、有哪些证据”变成团队可以共同查看和讨论的页面。它更像 AI 编程从个人黑箱走向协作交付的界面层。
