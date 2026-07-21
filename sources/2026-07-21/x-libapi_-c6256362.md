---
title: >-
  Hermes Studio v0.6.31 正式发布。 这一版汇总了 0.6.30 之后合并的 25 个 PR，重点升级
  Workflow、文件预览、Provider 管理、聊天体验与桌面端版本维护。 Workflow 现在支持结构化 JSON
  条件，能够展示更清晰的阻塞路径证据、完整执行记录，并按照真实历史路径回放整个工作流，复杂流程出了问题也更容易定位。
source: X @libapi_
url: 'https://x.com/libapi_/status/2079161791121350699'
date: 'Mon Jul 20 11:09:34 +0000 2026'
likes: 62
reposts: 2
replies: 14
source_type: x
language: zh
account_name: libapi_
fetched_at: '2026-07-20T23:04:22.508Z'
---
Hermes Studio v0.6.31 正式发布。

这一版汇总了 0.6.30 之后合并的 25 个 PR，重点升级 Workflow、文件预览、Provider 管理、聊天体验与桌面端版本维护。

Workflow 现在支持结构化 JSON 条件，能够展示更清晰的阻塞路径证据、完整执行记录，并按照真实历史路径回放整个工作流，复杂流程出了问题也更容易定位。

生成文件预览也进一步完善。现在可以直接在 Profile 文件、会话 workspace 和受管群聊 workspace 中，安全预览 HTML、PDF、DOCX、PPTX、XLSX、CSV、图片、Markdown 和源码文件。

Provider 管理新增 revision 校验、凭证脱敏、草稿连接测试、首选模型、上下文长度和审计记录，管理员可以更安全地完成配置修改。

聊天方面，单聊和群聊均支持引用消息；后台 delegate task 即使遇到父回合结束或应用重启，也能继续可靠投递子 Agent 的结果。

历史加载、分页、Profile 筛选与 workspace diff 归属同步得到优化，切换模型时还会保留草稿 workspace，
reasoning effort 也升级为更直观的滑块。

桌面端更新现在会先询问是否下载，点击“立即重启”后会优雅关闭相关服务，再启动安装程序。

群聊、Coding Agent 和桌面卡片的暗色界面进一步统一，macOS 麦克风权限、托盘尺寸和 Liquid Glass 图标也已完成适配。

此外，本次更新还改进了定时任务投递目标、频道凭证清理、Gateway 重启反馈和 Studio MCP 注入安全策略。

版本管理现在支持迁移 Runtime 存储目录或恢复系统默认，并会在重启时复制、校验和保留旧版本副本。

Hermes Studio v0.6.31，不只是增加功能，也在继续补齐一套真正稳定、可追踪、可维护的 Agent 工作环境。

@NousResearch  @Teknium  @witcheer 👾👾👾
