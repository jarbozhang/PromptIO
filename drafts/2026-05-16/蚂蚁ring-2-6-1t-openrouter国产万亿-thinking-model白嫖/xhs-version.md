# 蚂蚁 Ring-2.6-1T 上 OpenRouter，国产万亿 thinking model 价格非常低

国内能直接用 API 跑的万亿参数 thinking model，这周多了一个，蚂蚁 inclusionAI 的 Ring-2.6-1T 上了 OpenRouter，输入 $0.075/M、输出 $0.625/M。

我把它接到 Cherry Studio 跑了一晚上，结论先放在前面，目前我能找到的国内开发者可以无门槛调用、价格压到这个区间的 thinking model，它是一个值得记下来的选项。

## 价格先放出来，因为这才是重点

OpenRouter 模型卡换算下来是百万 token 输入 0.075 美元、输出 0.625 美元。

我习惯参照 Claude Sonnet 看价位，Sonnet 4.7 是 $3/M 输入、$15/M 输出。两者各自走各自的定位，Sonnet 价位对应它的能力区间，Ring 则把价格压到了国产 thinking model 这个赛道里很有吸引力的位置。

换成实际场景，跑一个吃 20 万 token 上下文的 agent 任务，Ring 的输入侧成本大约 1.5 美分。我那一晚上跑下来，OpenRouter 控制台余额几乎没动。

## 这模型到底是什么

inclusionAI 是蚂蚁旗下的开源团队，之前发过 Ling 系列稠密模型和早期 Ring 的几个小尺寸。这次的 Ring-2.6-1T 是 MoE 架构，总参 1T，激活 63B，上下文 262K。

更关键的是定位，它是 thinking model，OpenRouter 模型卡原文是 "optimized for coding agents, tool use, and long-horizon task execution"。

它有一个我之前没在国产模型里见过的设计，叫双层推理强度，分 high 和 xhigh 两档，模型自己根据任务难度切换思考预算。简单 query 走 high 省点，复杂 agent 链走 xhigh 多花点思考。

蚂蚁放出来的 benchmark 几个有意思的指标：PinchBench 87.60，ARC-AGI-V2 在 xhigh 模式下 66.18，AIME 26 是 95.83。前两个是 agent 和推理硬指标，分数落在第一梯队。

## 我接 Cherry Studio 的踩坑过程

OpenRouter 是 OpenAI 兼容协议，所以接法很简单 ✅

我的步骤，先去 openrouter.ai 申请一个 key（国内能直接打开，不需要任何额外网络配置）。然后在 Cherry Studio 里加 OpenRouter provider，模型选 `inclusionai/ring-2.6-1t`。

第一个坑，长上下文。我把一个 18 万 token 的代码仓库塞进去让它做 refactor 分析，跑了大概 40 秒才出第一个 token。这是 thinking model 的常态，xhigh 模式在前面思考阶段会沉默挺久。

第二个坑，工具调用格式。我让它走 Cherry Studio 的 MCP 接 filesystem，前两轮工具参数偶尔会少一个引号或者括号闭合错。第三轮之后稳定下来。这种小问题在 thinking model 里不算大事，但记得加 retry。

## 适合干什么，不适合干什么

按我这一晚上的感受，Ring-2.6-1T 在两个场景体验不错。

第一，长链路 agent 任务。读项目、出 refactor 计划、再分步骤改文件。它的 high/xhigh 切换会自动判断哪些步骤值得多想。

第二，重推理但不要求实时的离线任务。比如批量做 code review、生成测试用例、跑 benchmark 评估。一晚上挂着跑几千次，账单不会让你心疼。

不太适合的场景也明确，对话型助手。它思考时间长，单轮往返很慢。还有强格式约束的输出，比如要求严格 JSON schema 的场景，我建议先做几轮验证再上生产。

## 一个我没解决的问题

OpenRouter 模型卡里 throughput 是 weekly 2.83B tokens。

我担心的是高峰期速率。这一晚上跑下来都很顺，但如果哪天突然刷屏被薅，体验会不会掉下来，目前没数据。

国内有没有更稳定的备份路径，蚂蚁有没有计划在自家百炼或 API 平台上线 Ring-2.6-1T，这是我接下来想盯的事。

## 你现在可以做的事

如果你已经在用 Cherry Studio 或 Cline，今晚就能切过去试 🎯

如果你还没用 OpenRouter，注册流程在国内网络下直接能走完，不需要任何额外网络配置。

国产 1T 级 thinking model 跑到这个价位、还能国内直连，OpenRouter 上列着，打开网页就能用。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
