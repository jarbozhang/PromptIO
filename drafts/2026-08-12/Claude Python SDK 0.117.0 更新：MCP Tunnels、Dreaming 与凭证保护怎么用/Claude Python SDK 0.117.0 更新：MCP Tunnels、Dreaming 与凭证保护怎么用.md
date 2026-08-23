---
title: Claude Python SDK 0.117.0 更新：MCP Tunnels、Dreaming 与凭证保护怎么用
status: draft
date: '2026-08-12'
source: manual
source_url: https://github.com/anthropics/anthropic-sdk-python/releases/tag/v0.117.0
angle: >-
  围绕 0.117.0 的三项变化做版本解读：先确认 MCP Tunnels 和 Dreaming 的适用场景，再用最小示例验证升级兼容性，最后说明 SecretStr
  修复为何能降低异常栈泄露凭证的风险。
voice: first-person
content_lane: version-update
content_archetype: version_brief
diversity_note: >-
  same_entity_in_batch,title_pattern_repeat_in_batch,checklist_daily_cap,recent_entity_saturation,recent_title_pattern_saturation
reach: 8
tags:
  - Claude
  - Python SDK
  - MCP Tunnels
  - Dreaming
  - Agent 安全
  - 版本更新
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Claude Python SDK 0.117.0 更新：MCP Tunnels、Dreaming 与凭证保护怎么用
wechat_title: Claude Python SDK 0.117.0 值得升级吗，三项变化拆开看
cover:
  status: skipped
recent_similarity: 0.038
reach_note: Claude 品牌明确，新能力与凭证保护带来直接利益，Python 开发者升级后可以立即验证。
selection_reason: 这是 GitHub release 提供的事实主源，一次更新同时包含新能力和安全修复，适合做有代码验证路径的短版本解读。
---

# Claude Python SDK 0.117.0 更新：MCP Tunnels、Dreaming 与凭证保护怎么用

如果你的 Agent 已经接入 MCP、需要处理长任务，或者会在生产环境记录 Python 异常栈，Claude Python SDK 0.117.0 值得进入升级验证队列。

这次没有堆很多显眼的新接口，核心只有三项变化。MCP Tunnels 扩展 MCP 的连接方式，Dreaming 增加新的 API 能力，SecretStr 修复则减少凭证材料进入 traceback frame locals 的风险。

我更关注第三项。连接能力和新 API 决定 Agent 能做什么，凭证保护决定它出错时会不会顺手留下不该留下的信息。

## 判断旧版本的三个缺口

MCP 工具一旦不和 Agent 运行在同一环境，连接、转发和边界管理就会变成工程问题。0.117.0 加入 MCP Tunnels 支持，指向的正是这类跨环境连接场景。

Dreaming 则是一项新增 API 能力。发布说明没有给出完整调用参数和行为细节，因此目前能确认的是 SDK 已加入对应支持，具体请求字段仍应以官方类型定义和文档为准。

第三个缺口更隐蔽。Python 抛出异常时，traceback 可能保留栈帧中的局部变量。如果凭证材料以普通字符串停留在这些变量里，错误采集、日志上报或调试工具就可能把它一并记录下来。

## 看懂三项变化各自解决什么

| 变化 | 解决的问题 | 更适合验证的场景 |
| --- | --- | --- |
| MCP Tunnels | MCP 服务与 Agent 不在同一运行环境时的连接支持 | 远程 MCP 服务、隔离环境、团队共享工具入口 |
| Dreaming | SDK 缺少对应 API 支持 | 已准备评估该能力的实验性 Agent 流程 |
| SecretStr 修复 | 凭证材料可能出现在异常栈帧局部变量中 | 开启错误采集、集中日志和任务追踪的生产服务 |

我不会把 MCP Tunnels 简化成“连接更方便”。对 Agent 应用来说，真正有价值的是工具服务可以和执行进程分开部署，同时保留一条由 SDK 支持的连接路径。

Dreaming 现在更像一个需要隔离验证的新能力。发布说明只确认了支持，没有提供足以判断输出语义、成本和稳定性的材料。把它直接接进关键工作流，依据还不够。

SecretStr 修复虽然排在 Bug Fixes 里，却是最接近生产收益的一项。它不能替代日志脱敏、密钥轮换和最小权限，但能减少凭证材料通过 traceback frame locals 进入错误链路的机会。

## 把升级验证压到现有任务

我会保留一份 0.116.0 的基线，再把同一个最小任务切到 0.117.0。任务不需要复杂，关键是覆盖创建客户端、发起原有请求、处理返回值和触发异常这几条既有路径。

升级时重点观察四件事。

- 依赖锁文件是否只出现预期变化
- 现有请求和响应解析是否继续通过
- MCP 相关配置在未启用新能力时是否保持原有行为
- 人工触发异常后，traceback 和错误采集字段里是否还出现凭证原文

如果项目准备验证 MCP Tunnels，我会另建隔离用例，不和原有 MCP 连接一起改。验收目标也应具体，连接能否建立、工具调用失败能否正确返回、隧道中断后任务如何结束。

Dreaming 同样适合放进独立实验分支。先依据 0.117.0 的类型定义确认字段，再验证最小请求和错误处理，不要凭功能名称猜测用途，更不要把实验结果直接当成稳定契约。

## 决定谁应该升级

已经使用 MCP、正在评估 Dreaming，或者生产环境接入了异常追踪的团队，应该优先验证 0.117.0。尤其是最后一类，即使暂时不用两个新功能，也能从 SecretStr 修复中获得明确的安全收益。

只调用稳定接口、没有 MCP 集成，而且日志链路不会采集栈帧局部变量的项目，可以按常规依赖节奏评估。但这里不能反推为“凭证没有风险”，应用层仍要检查日志过滤、环境变量处理和错误上报配置。

我的判断是，这个版本的重点不是让 Agent 突然多做一件事，而是同时推进连接能力、实验能力和故障安全。成熟的 Agent SDK 不只要覆盖成功路径，还要处理连接跨边界、能力尚在验证、任务异常退出时留下什么。

最实际的动作，是拿现有回归任务跑一遍 0.117.0，再故意触发一次带鉴权上下文的失败。功能通过只是第一关，异常记录里看不到凭证原文，升级才算真正验收完成。

## 相关链接

- [Anthropic Python SDK 0.117.0 发布说明](https://github.com/anthropics/anthropic-sdk-python/releases/tag/v0.117.0)
- [0.116.0 到 0.117.0 完整变更](https://github.com/anthropics/anthropic-sdk-python/compare/v0.116.0...v0.117.0)

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
