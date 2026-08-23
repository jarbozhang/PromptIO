---
title: 模型变强，工具调用反而更脆，Claude 接工具前先跑回归测试
status: draft
date: '2026-07-05'
source: manual
source_url: https://lucumr.pocoo.org/2026/7/4/better-models-worse-tools/
angle: 用一次工具调用退化案例提醒做 AI harness 的读者：模型升级不等于工具层自然更稳，schema、工具说明和调用日志都要有回归样例。读者可以把文章整理成发布前的最小测试集。
voice: retro
content_lane: risk-postmortem
content_archetype: failure_postmortem
diversity_note: recent_entity_saturation,recent_title_pattern_saturation
reach: 7
tags:
  - Claude
  - 工具调用
  - Agent
  - 回归测试
  - AI工程
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 模型变强，工具调用反而更脆，Claude 接工具前先跑回归测试
wechat_title: Claude 接工具前，先给 schema 跑一次回归
cover:
  status: skipped
recent_similarity: 0.036
reach_note: Claude 有品牌认知，工具调用不稳定是明确风险点，回归测试可以马上落地。
selection_reason: 它适合写成失败复盘：越新的模型越需要旧系统重新验收，尤其是已经把工具调用接进生产链路的团队。
---

# 模型变强，工具调用反而更脆，Claude 接工具前先跑回归测试

模型升级最容易误导做 AI harness 的人。推理更强，不代表工具层自然更稳，有时它只是更确信自己熟悉的工具形状。

Armin Ronacher 在 2026 年 7 月 4 日复盘了一次 Pi 的 edit 工具事故。新的 Claude 模型会在本来正确的工具调用里，额外塞进 schema 没有声明的字段，结果编辑内容对了，调用却被 harness 拒绝。

这件事对做 Agent、MCP、自定义工具层的读者很实用。模型接入前，不该只看任务成功率，还要把 schema、工具说明和调用日志做成一组回归样例。

## 把事故还原到一次 edit 调用

Pi 的 edit 工具支持一次提交多个精确文本替换，所以参数里有一个嵌套的 `edits[]` 数组。正常情况下，每个 edit 对象只需要 `oldText` 和 `newText`。

异常发生在新 Claude 模型上。Opus 4.8 和 Sonnet 5 会在 `edits[]` 里的对象后面追加自己发明的字段，比如 `requireUnique`、`in_file`、`oldText2`、`newText2`，甚至还有更奇怪的额外 key。

尴尬的点在于，作者检查到的无效调用里，真正用于替换的 `oldText` 和 `newText` 往往是正确的。任务已经做对，工具调用在最后一步多写了几笔。

这个问题也不是随便一个单轮提示就能稳定复现。新开一个简单的 edit 请求没有触发它，但在一个已经读文件、分析问题、准备多行编辑的 agent 历史里，继续会话时 Opus 4.8 在某个样例上约 20% 的 edit 调用变成 schema-invalid。

这很像真实工程里的隐性事故。demo 很顺，短 prompt 很顺，一接进长上下文和真实日志，工具层开始漏水。

## 把根因放回 harness 习惯里

工具调用不是魔法，它仍然是模型在特定格式里生成文本，再由 API 或客户端解释成 tool call。模型学过这种格式，也学过哪些调用最后会被系统接受。

Armin 的判断是，这次退化更像训练和 harness 习惯带来的副作用。Claude Code 的编辑工具形状更扁平，接近 `file_path`、`old_string`、`new_string` 加一个可选标记，而 Pi 的工具是嵌套数组。

更麻烦的是，Claude Code 客户端本身相当宽容。它会处理参数别名、类型修复、Unicode 修复、未知字段过滤和坏调用重试。模型如果长期在这种宽容环境里拿到奖励，就可能学到一个危险经验，差一点也能过。

于是，当你给它一个语义相近但形状不同的工具，问题就来了。模型可能理解你要什么，却在长文本、多行字符串、嵌套对象结束处，被自己熟悉的 edit 工具先验带偏。

这不是模型不会写 JSON。更准确地说，是模型在高压力采样点上，没有被强制约束到你的 schema。

## 别把更详细的工具说明当保险

很多团队遇到工具调用失败，第一反应是把 description 写长一点，或者失败后让模型重试。这些动作有用，但不够。

重试会掩盖问题。一次调用失败后第二次成功，用户看见的是任务完成，日志里留下的是模型对工具契约的不稳定理解。

静默过滤未知字段也要谨慎。过滤能让链路继续跑，但它也会把 schema 漂移藏起来。今天多出来的是无害 key，明天可能就是错误路径、错误权限或错误执行意图。

这次案例里，去掉 thinking blocks 后，失败率在作者样例中降了一半。开启 Anthropic 的 strict tool invocation 后，作者的运行里不再出现这个问题。

Claude 官方文档对 strict tool use 的说法很直接，给工具定义设置 `strict: true` 后，会用 grammar-constrained sampling 约束工具输入匹配 JSON Schema。官方也把复杂嵌套属性、agentic workflows、类型安全函数调用列为适用场景。

所以工具说明不是边界，schema 验证也不只是报错器。真正要挡住这类事故，需要在采样或执行前后至少有一层硬约束。

## 把发布门禁改成回归样例

如果你的 Agent 正要换 Claude 模型，或者把 Claude 接到自定义工具，不要只跑一句 hello world。更该保存几段真实失败形态的 transcript。

这组最小回归样例可以围绕四类场景建。

- 长会话，包含读文件、分析、再编辑，而不是单轮 edit
- 嵌套 schema，尤其是数组对象里有长字符串的工具
- 相似语义、不同形状的工具，比如都是编辑文件，但参数结构不一样
- strict 开关对比，保留 schema-invalid、retry、最终成功三类日志

测试目标也别只写任务是否完成。要单独记录 tool input 是否严格匹配 schema，是否出现未知字段，失败后是否被客户端吞掉，重试是否改变了参数结构。

这样做的价值不在于证明某个模型不行，而是把模型升级从信仰动作变成发布动作。模型可以更强，但你的 harness 不能把更强误读成更稳。

## 把事故卡片贴到工具层旁边

触发器，模型升级后接入自定义编辑工具，工具语义接近 Claude Code，但 schema 形状不同。

失效点，嵌套 `edits[]` 对象里多出未声明字段，真实替换内容可能仍然正确。

明显信号，日志出现 `must not have additional properties`、`schema-invalid`、未知 key，且失败更容易出现在长会话而不是单轮提示。

短期止血，能开 strict 就开 strict，不能开就保留完整 tool call 日志，并把未知字段当成测试失败，而不是默认过滤。

长期修复，发布新模型前跑同一批 transcript，覆盖长上下文、多行编辑、嵌套对象、失败重试和工具说明改动。

这次教训很简单，Agent 的工具层不要只相信模型能力曲线。模型越会做事，越要确认它还愿意按你的契约做事。

## 相关链接

- Armin Ronacher 原文 Better Models, Worse Tools，https://lucumr.pocoo.org/2026/7/4/better-models-worse-tools/
- Pi issue #6278，https://github.com/earendil-works/pi/issues/6278
- Claude Strict tool use 文档，https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use
- Claude Text editor tool 文档，https://platform.claude.com/docs/en/agents-and-tools/tool-use/text-editor-tool

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
