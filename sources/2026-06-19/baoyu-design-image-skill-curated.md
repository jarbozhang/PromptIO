---
title: "baoyu-design 更新：PPT、网页和视频脚本可以接入 AI 生图 Skill 自动配图"
url: "https://github.com/JimLiu/baoyu-design"
source: "Curated GitHub and X summary"
source_type: curated
language: zh
published: "2026-06-19T07:46:18Z"
fetched_at: "2026-06-19T15:10:00+08:00"
---

baoyu-design 是一个把 Claude Design 能力封装成本地 Agent Skill 的开源项目，README 描述它可在 Cursor、Claude Code、Claude Desktop、Codex 等本地 agent 中使用，生成 UI mockup、交互原型、wireframe、landing page、dashboard、mobile app 和 slide deck，产物是自包含 HTML，保留在本地项目中。

2026-06-19，项目作者在 X 上说明 baoyu-design skill 更新，制作 PPT、动画视频或网站时可以调用 AI 生图能力配图。使用 Codex 时可调用内置画图工具；使用 Claude Code 时可以配合 baoyu-image-gen skill 调用 Codex CLI 画图。

作者强调的新增价值是，生成 PPT 时可以自动在合适位置插入配图，并且连图片一起导出为 PPTX，后续仍可用 PowerPoint 或 Keynote 二次编辑。

相关仓库：
- baoyu-design: https://github.com/JimLiu/baoyu-design
- baoyu-image-gen: https://github.com/JimLiu/baoyu-skills/tree/main/skills/baoyu-image-gen

写作时应聚焦“内容生产不只生成文字和页面结构，开始把配图也纳入 Skill 工作流”。这比单纯介绍生图模型更有用，因为它落在 PPT、网站、视频脚本等可交付内容上。
