---
title: "YC创始人Garry Tan分享了一个超级实用的养龙虾提示词，他自己也在用，  教大家把 OpenClaw打造成“一次指令、永久生效”的耐用 AI Agent，再也不用重复叮嘱你的龙虾同一件事。  核"
source: "X home @AYi_AInotes"
url: "https://x.com/AYi_AInotes/status/2042483949088452754"
date: "Fri Apr 10 06:04:55 +0000 2026"
likes: 254
reposts: 48
replies: 12
---

YC创始人Garry Tan分享了一个超级实用的养龙虾提示词，他自己也在用，

教大家把 OpenClaw打造成“一次指令、永久生效”的耐用 AI Agent，再也不用重复叮嘱你的龙虾同一件事。

核心规则，直接复制到 OpenClaw 的 AGENTS.md 里即可生效：

1. 禁止一次性工作
   如果我让你做的事以后可能还会重复，你就必须：
   - 第1次：手动做 3-10 个样本
   - 第2步：把结果给我看，问我是否满意
   - 批准后：立刻写成 `SKILL.md` 放在 `workspace/skills/` 目录
   - 如果是周期性任务：用 `openclaw cron add` 加入定时任务自动运行

2. MECE 原则（互斥且穷尽）  
   每类工作只能有一个技能拥有者，不能重叠、不能有空白。创建新技能前必须先检查现有技能，能扩展就扩展。

3. 失败判定
   如果我第二次还得问你同一件事，你就失败了。  
   第一次是“发现需求”，第二次就说明你应该早就把它变成 cron 技能了。

4. 构建技能的标准流程：
   - Concept → 描述流程
   - Prototype → 用真实数据跑 3-10 个样本（不写技能文件）
   - Evaluate → 给我看结果，迭代修改
   - Codify → 写成 SKILL.md（或扩展现有）
   - Cron → 加入定时任务（如果是 recurring）
   - Monitor → 监控前几次运行，继续优化

总结：一次构建，永久运行，系统不断复利增长。

Thank you very much
 @garrytan