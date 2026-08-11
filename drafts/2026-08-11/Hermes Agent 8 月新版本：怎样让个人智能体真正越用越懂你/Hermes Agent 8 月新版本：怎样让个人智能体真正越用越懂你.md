---
title: Hermes Agent 8 月新版本：怎样让个人智能体真正越用越懂你
status: draft
date: '2026-08-11'
source: manual
source_url: https://github.com/NousResearch/hermes-agent
angle: 从 8 月 11 日仓库更新切入，拆解新版针对长期记忆、持续成长和个人数据控制解决了什么问题，并给出按 README 跑通最小示例的使用路径。
voice: first-person
content_lane: version-update
content_archetype: version_brief
diversity_note: developer_lane_daily_cap,recent_entity_saturation,recent_title_pattern_saturation
reach: 9
tags:
  - Hermes Agent
  - 个人智能体
  - 长期记忆
  - Agent
  - 开源项目
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Hermes Agent 8 月新版本：怎样让个人智能体真正越用越懂你
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.033
reach_note: Hermes 属于重点生态项目，新版本有明确能力增量，读者可以直接从 GitHub 仓库开始验证。
selection_reason: 同时具备版本新鲜度、开源可操作性和长期个人智能体价值，适合做当天的核心生态选题。
---

# Hermes Agent 8 月新版本：怎样让个人智能体真正越用越懂你

如果你已经受够了每次打开智能体都要重新交代背景，Hermes Agent 这次更新值得看。它想解决的不是多接几个模型，而是让一个个人智能体能记住你、复用做事经验，并在不同会话里继续成长。

我更关心的也是这一点。模型回答得再漂亮，如果换个会话就忘记项目约定、表达偏好和上次的处理结果，它仍然只是一个临时聊天窗口。

截至 8 月 11 日，Hermes Agent 仓库仍在更新。当前 README 把长期记忆、技能自我改进、跨会话检索和用户画像放进同一条学习闭环，也给出了可以直接验证的安装与启动入口。

## 旧问题不是记不住一句话，而是经验无法复利

多数智能体已经能保存对话，保存对话却不等于形成长期记忆。

真正影响使用体验的是三个断点。新会话不知道你是谁，复杂任务做完后没有沉淀成可复用方法，历史记录越来越多，却很难在需要时准确找回。

Hermes Agent 当前的设计把这些断点连了起来。它会维护由智能体筛选的记忆，周期性提醒自己保存知识，还能在完成复杂任务后创建技能，并在后续使用中继续改进技能。

历史会话也不只是堆在文件里。README 提到，它使用 FTS5 全文检索查找过去的会话，再由大模型做摘要，用于跨会话回忆。用户建模则接入了 Honcho，目标是逐步形成更完整的个人偏好模型。

我认为，这比单纯扩大上下文窗口更接近个人智能体。上下文窗口解决眼前能装多少，长期记忆解决下次还能不能接着做。

## 新版把成长能力接进了日常任务

这轮更新呈现出的变化，可以压成四条能力链。

| 过去容易断开的环节 | 当前 README 给出的能力 |
| --- | --- |
| 新会话丢失背景 | 持久记忆与用户档案 |
| 做完任务没有沉淀 | 复杂任务后自动创建技能 |
| 固定技能逐渐过时 | 技能在使用中继续改进 |
| 历史记录难以调用 | FTS5 会话检索与大模型摘要 |

这些能力不是彼此独立的功能按钮。一次任务产生经验，经验被写入记忆或技能，后续会话再检索和调用，智能体才有机会形成闭环。

Hermes Agent 还支持定时任务、隔离的子智能体以及多种终端后端。定时任务可以把日报、备份和审计交给智能体持续执行，子智能体可以拆分并行工作流，运行位置则覆盖本地、Docker、SSH 和多种沙箱环境。

所以我看到的重点不是它又多了多少工具，而是记忆、技能和执行环境开始围绕同一个长期角色工作。对 Agent 应用的启发也很直接，真正的个性化不能只放在系统提示词里，它需要可检索的历史、可维护的技能和明确的数据边界。

## 把个人数据控制留在可检查的位置

长期记忆越强，越不能忽略控制权。

Hermes Agent 的资料以本地目录和配置为主要落点。README 还提供了从 OpenClaw 迁移设置、记忆、技能和工作区指令的路径，并允许先用 `--dry-run` 预览迁移结果，也可以选择只迁移用户数据而不带入密钥。

这类设计给了使用者几个可检查的入口。记忆和技能可以迁移，配置可以单独读取和修改，工具可以按需启用，安全文档还覆盖命令审批、私聊配对与容器隔离。

我的判断是，个人智能体的长期记忆不能是一个看不见的黑盒。能导入、能预览、能选择、能诊断，才有资格谈越用越懂你。否则所谓成长，也可能只是不断积累无法核对的旧信息。

## 用一个重复任务验证它是否真的在成长

按 README 跑最小路径，不需要一开始就接消息渠道或定时任务。Linux、macOS 和 WSL2 可以使用官方安装脚本，安装后重新加载终端配置，再启动 `hermes`。

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
source ~/.zshrc
hermes
```

进入后，可以用 `hermes model` 选择模型，用 `hermes tools` 检查启用的工具，用 `hermes doctor` 诊断环境问题。Windows 也有 README 提供的 PowerShell 安装入口。

验证时，我建议只给它一个会重复两次的具体任务，例如整理同一项目的两轮周报。第一轮明确写作格式、关注指标和禁用表达，结束后开启新会话，再让它处理第二轮材料。

观察重点不是第二次回答是否更长，而是它能否找回已经确认的偏好，能否复用上次形成的方法，以及你能否检查和调整这些记忆。若这三点都无法确认，接更多渠道只会把不确定性放大。

已经在用 OpenClaw 的读者，可以先执行迁移预览。

```bash
hermes claw migrate --dry-run
```

确认迁移范围后，再决定是否导入记忆、技能和配置。把第一次验证限制在一个测试任务里，比直接搬入全部个人资料更容易判断它究竟记住了什么。

Hermes Agent 这次真正值得验证的，不是它能不能再回答一个问题，而是第二次见到同类任务时，它有没有少让你重复一次自己。

## 相关链接

- [Hermes Agent GitHub 仓库](https://github.com/NousResearch/hermes-agent)
- [Hermes Agent 官方文档](https://hermes-agent.nousresearch.com/docs)
- [长期记忆文档](https://hermes-agent.nousresearch.com/docs/user-guide/memory)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
