---
title: LangChain 工具调用加 strict=True，升级前先跑这张兼容性清单
status: draft
date: '2026-06-24'
source: manual
source_url: https://github.com/langchain-ai/langchain/releases/tag/langchain%3D%3D1.3.11
angle: >-
  围绕 LangChain 1.3.11 对 OpenAI-compatible models 的工具调用 strict=True 支持，写给做 Agent 工具调用的开发者：升级前如何检查
  tool schema、ProviderStrategy、回归用例和失败兜底。请写成自然的升级清单，不要出现写作边界、。
voice: first-person
content_lane: developer-tooling
content_archetype: hands_on_recipe
diversity_note: manual_practical_review
reach: 8
tags:
  - LangChain
  - Agent
  - 工具调用
  - 结构化输出
  - OpenAI-compatible
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: LangChain 工具调用加 strict=True，升级前先跑这张兼容性清单
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.02
reach_note: LangChain 和工具调用是开发者高频痛点，strict=True 是可立刻检查的升级点。
selection_reason: 它虽是版本更新，但能转成升级前兼容性清单，比普通 release 解读更实用。
---

# LangChain 工具调用加 strict=True，升级前先跑这张兼容性清单

做 Agent 工具调用的人，LangChain 1.3.11 这次别只看补丁号。
真正要看的不是新 API，而是 `strict=True` 什么时候会被加到工具上。

如果你的项目接了 OpenAI-compatible models，又用 `ProviderStrategy` 做结构化输出，升级后最先暴露的可能不是业务逻辑错，而是 tool schema 原来写得太松。

我会把这次升级拆成一张兼容性清单。目标很朴素，测试分支里确认四件事，schema 能过，ProviderStrategy 走对，回归用例覆盖关键工具，失败时有兜底。

## 选一个会真实触发工具的最小场景

LangChain 1.3.11 相对 1.3.10 的关键变更在 #38370，`ProviderStrategy` 针对 OpenAI-compatible models 的工具会设置 `strict=True`。同一个 release 里还有依赖更新和 summarization prompt contract 文档更新，但做 Agent 工具调用，最该进回归的是这一条。

我不会拿一个闲聊 prompt 验证升级。工具调用的兼容性，要用能稳定触发工具的最小业务场景。

比较合适的是这类路径，

- 用户输入里有明确动作，例如创建工单、查询订单、生成日程
- 工具参数至少包含一个必填字段和一个可选字段
- 返回值会进入后续推理，而不是调用完就结束
- 失败时能看清是模型没调工具，还是工具参数不合规

这个最小场景不需要覆盖全业务。它只负责回答一个问题，`strict=True` 加上以后，Agent 还能不能把正确的参数交给正确的工具。

## 把 tool schema 收到可验证状态

`strict=True` 对开发者最大的提醒是，别把工具参数写成一团自由文本。

LangChain 工具文档里，`args_schema` 可以用 Pydantic，也可以用 JSON Schema。我的偏好是，凡是进入生产链路的工具，都别只靠函数签名和 docstring 撑住，至少把下面几项写清楚。

- `type` 是否明确，字符串、整数、布尔、数组不要混着猜
- `required` 是否和函数默认值一致
- `enum` 是否覆盖真实业务值，别让模型自由发明状态名
- 数组是否写了 `items`
- 嵌套对象是否写了 `properties`
- 可选字段是允许缺省，还是允许 `null`，二者不要混用
- 工具描述是否说明触发条件，而不是只解释工具名字

这里最容易偷懒的是万能 `dict`。它短期能跑，升级 strict 后反而会把不确定性推给 Provider 和模型。我的判断是，Agent 工具越接近真实写操作，schema 越该像接口契约，而不是像提示词补丁。

## 确认 ProviderStrategy 没走错路

LangChain 的结构化输出里，`response_format` 可以显式用 `ProviderStrategy(schema)`，也可以传 schema 类型让框架自动选择策略。文档里的例子还区分了 `ProviderStrategy` 和 `ToolStrategy`，前者走 provider-native structured output，后者走工具调用策略。

这次 1.3.11 的变化点落在 `ProviderStrategy` 里，所以升级前我会专门确认三件事。

- 代码里是否显式用了 `ProviderStrategy`
- 如果只是传了 schema type，运行时最终选到哪条策略
- 当前 model 配置是否属于 OpenAI-compatible models
- 项目里有没有同名工具在不同 Agent 里复用，但 schema 版本不一致

第三点尤其要看细。OpenAI-compatible 只说明接口风格接近，不保证每个 provider 对 `strict=True` 的细节完全一致。测试分支里要把 provider 返回的原始错误留住，别只在上层吞成一句调用失败。

## 用回归用例验收升级结果

我会给这次升级设一个很窄的验收标准，不追求大而全，只抓工具调用最容易坏的地方。

| 验收项 | 通过标准 |
| --- | --- |
| 工具选择 | 同一输入仍然命中预期工具 |
| 参数形状 | 输出参数符合 schema，没有多余字段污染关键路径 |
| 必填字段 | 缺字段时能进入错误处理，而不是静默执行 |
| ProviderStrategy | 结构化输出路径和升级前记录一致 |
| 失败样例 | 能区分 schema 错、provider 不兼容、业务校验失败 |

如果你已经有 LangSmith 或自己的 trace，这里就把升级前后的同一批输入留档。没有也没关系，最小可行做法是保存 10 到 20 条高频工具调用输入，固定 model 配置，固定 schema，跑出前后差异。

别用随机闲聊 prompt 做验收。它看起来通过了，真正上线时坏的还是写操作、枚举值和嵌套参数。

## 把失败兜底写进升级 PR

升级 strict 后，失败并不一定是坏事。它可能只是把原来被模型猜过去的字段问题提前暴露了。

我会把兜底分成三层，

- schema 层，补齐 `required`、`enum`、`items`、`properties`
- strategy 层，确认当前 Agent 是否应该继续使用 `ProviderStrategy`
- provider 层，如果某个 OpenAI-compatible endpoint 对 strict 支持不完整，就给这条链路保留降级策略

这里不要一失败就把 schema 放松。放松 schema 很容易让测试重新变绿，但也把 Agent 写错参数的空间放大了。更好的动作是收集失败输入，先判断它违反的是工具契约，还是 provider 兼容细节。

我认为 1.3.11 这类小版本，真正价值不在多一个参数，而在逼你把 Agent 工具调用从能跑变成可验收。工具 schema、ProviderStrategy、回归样例、失败兜底，这四件事跑完，再升版本才踏实。

把这张清单放进升级 PR 里，先选一个会改数据的最小工具流。它过了，再扩到其它 Agent。

## 相关链接

- [LangChain 1.3.11 release](https://github.com/langchain-ai/langchain/releases/tag/langchain%3D%3D1.3.11)
- [LangChain structured output 文档](https://docs.langchain.com/oss/python/langchain/structured-output)
- [LangChain tools 文档](https://docs.langchain.com/oss/python/langchain/tools)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
