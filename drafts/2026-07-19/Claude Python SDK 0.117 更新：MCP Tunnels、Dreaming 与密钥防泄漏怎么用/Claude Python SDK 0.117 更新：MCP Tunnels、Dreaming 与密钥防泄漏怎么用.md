---
title: Claude Python SDK 0.117 更新：MCP Tunnels、Dreaming 与密钥防泄漏怎么用
status: draft
date: '2026-07-19'
source: manual
source_url: https://github.com/anthropics/anthropic-sdk-python/releases/tag/v0.117.0
angle: 从升级前后的开发体验切入，拆解 MCP Tunnels、Dreaming 支持和凭证保护分别解决什么问题，并给出升级后最值得验证的调用与异常处理场景。
voice: first-person
content_lane: version-update
content_archetype: version_brief
diversity_note: recent_entity_saturation,recent_title_pattern_saturation
reach: 8
tags:
  - Claude
  - Python SDK
  - MCP Tunnels
  - Dreaming
  - 凭证安全
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Claude Python SDK 0.117 更新：MCP Tunnels、Dreaming 与密钥防泄漏怎么用
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.057
reach_note: Claude 品牌认知强，SDK 可立即升级验证，新能力和密钥保护都有明确利益点。
selection_reason: 这是信息明确的官方版本源，同时覆盖新能力与安全修复，适合做成开发者当天就能执行的升级简报。
---

# Claude Python SDK 0.117 更新：MCP Tunnels、Dreaming 与密钥防泄漏怎么用

如果你正在用 Python 接 Claude，0.117.0 最值得关注的不是接口数量，而是三类开发体验终于被放到同一次更新里处理了。远程工具连接多了 MCP Tunnels 支持，API 增加 Dreaming 支持，凭证也不再轻易混进异常栈的局部变量。

我读完这次 release 后，更关心升级前后的差别。过去有些能力即使能接起来，也未必适合直接进入 Agent 应用，连接链路、实验能力和异常安全都需要开发者自己补防线。

这次更新没有提供完整迁移教程，也没有公布性能变化。更合适的动作，是升级测试环境后，围绕调用成功、失败恢复和日志脱敏各跑一次验证。

## 把远程工具连接纳入同一条调用链

MCP Tunnels 解决的核心问题，是 SDK 对这类 MCP 连接方式缺少正式支持。以前开发者可能需要在应用层额外处理连接路径，工具调用与模型调用也容易分散在不同的封装里。

0.117.0 加入 MCP Tunnels 支持后，值得验证的不是“能不能连上”这一项，而是完整的 Agent 调用链是否稳定。

我会选一个只有单个工具的测试服务，依次观察建立连接、触发工具、返回结果和释放连接。然后主动制造一次工具超时或连接中断，确认异常能够回到应用自己的重试或降级逻辑，而不是让整段任务失去状态。

对 Agent 应用的启发很直接。远程工具接入不该只是网络层能力，它需要和任务生命周期、异常分类、可观测性放在一起设计。

## 用隔离任务确认 Dreaming 的实际边界

这次 release 明确写了新增 Dreaming 支持，但没有在发布摘要里给出完整字段、适用模型和调用示例。因此，我不会仅凭功能名推断它的具体行为。

升级后可以先从 SDK 生成的类型提示和官方文档确认参数，再用一条固定输入做对照验证。记录请求结构、返回结构、流式事件和异常类型，重点看现有响应解析代码是否需要调整。

这里最容易犯的错，是看到 SDK 已经支持，就默认所有模型、账户配置和调用方式都已经可用。SDK 能表达某项 API 能力，与当前运行环境能够成功执行，是两件不同的事。

如果你的系统有响应缓存、事件持久化或结构化输出解析，还要检查新增内容是否会进入旧的数据管道。实验能力真正可用的标准，不是请求成功，而是不会破坏后续处理。

## 让密钥在报错时也保持沉默

我认为凭证修复是这次最该尽快验证的一项。0.117.0 使用 `SecretStr`，避免凭证材料出现在 traceback frame locals，也就是异常栈帧的局部变量中。

这类风险平时很安静，一旦程序报错，调试器、错误采集平台或日志增强器可能自动收集局部变量。密钥即使没有被主动打印，也可能跟着异常上下文进入日志系统。

升级后应构造一次可控的认证失败，再检查三处内容。

- 应用日志里是否出现完整凭证
- 异常采集平台是否保存了敏感局部变量
- 自己封装的请求对象和调试输出是否绕过了 SDK 的保护

`SecretStr` 修复的是 SDK 内部的一条泄漏路径，不会替应用层日志兜底。若业务代码主动拼接密钥、序列化配置对象或记录完整请求，风险依然存在。

## 判断哪些项目现在该升级

正在接 MCP 工具、准备验证 Dreaming，或会把 Python 异常上报到集中平台的项目，都适合优先在测试环境升级。尤其是长期运行的 Agent 服务，凭证保护带来的价值通常高于新增能力本身。

如果现有项目只做普通消息调用，也不必为了追版本立刻改生产环境。0.117.0 的发布摘要没有声明破坏性变更，但依赖升级仍应经过现有回归测试。

我的升级顺序会是凭证异常、原有调用、MCP Tunnels、Dreaming。前两项守住已有系统，后两项再确认新能力能否进入真实任务。

先创建一个隔离分支，把 SDK 升到 0.117.0，用同一组固定输入跑完成功请求和认证失败。只有日志脱敏、响应解析与异常处理都符合预期，再把 MCP Tunnels 或 Dreaming 接进更长的 Agent 流程。

## 相关链接

- [Anthropic Python SDK 0.117.0 发布说明](https://github.com/anthropics/anthropic-sdk-python/releases/tag/v0.117.0)
- [0.116.0 到 0.117.0 完整变更](https://github.com/anthropics/anthropic-sdk-python/compare/v0.116.0...v0.117.0)

<!-- REACH: 1/10 | 品牌✓ 利益点✗ 可操作✓ -->
