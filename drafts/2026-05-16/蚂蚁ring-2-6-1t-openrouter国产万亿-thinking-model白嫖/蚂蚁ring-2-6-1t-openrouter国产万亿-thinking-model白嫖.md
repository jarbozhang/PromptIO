# 蚂蚁 Ring-2.6-1T 上 OpenRouter 国产万亿 thinking model 几乎免费白嫖

国内能直接用 API 跑的万亿参数 thinking model，这周多了一个，蚂蚁 inclusionAI 的 Ring-2.6-1T 上了 OpenRouter，输入 $0.075/M、输出 $0.625/M。

我把它接到 Claude Code 和 Cherry Studio 各跑了一晚上，先把结论放在前面，这是目前我能找到的，国内开发者可以无门槛调用、价格还压到这个区间的最强 thinking model。

## 价格先放出来，因为这才是重点

OpenRouter 模型卡上写的是 $0.000000075/1K prompt，换算下来就是百万 token 输入 0.075 美元、输出 0.625 美元。

我习惯用 Claude Sonnet 做对比，Sonnet 4.7 是 $3/M 输入、$15/M 输出。Ring-2.6-1T 的输入价位差不多是 Sonnet 的 1/40，输出是 1/24。

换成实际场景，跑一个吃 20 万 token 上下文的 agent 任务，输入侧 Ring 收你 1.5 美分，Sonnet 收你 60 美分。我那一晚上跑下来，OpenRouter 控制台余额几乎没动。

不是营销话术，是模型卡能查到的报价。

## 这模型到底是什么

inclusionAI 是蚂蚁旗下的开源团队，之前发过 Ling 系列稠密模型和早期 Ring 的几个小尺寸。这次的 Ring-2.6-1T 是 MoE 架构，总参 1T，激活 63B，上下文 262K。

更关键的是定位，它不是聊天模型，是 thinking model，OpenRouter 模型卡原文是 "optimized for coding agents, tool use, and long-horizon task execution"。蚂蚁自己在 Hugging Face 的页面也写得很直白，这个模型从"理解任务"升级到"持续执行任务"。

它有一个我之前没在国产模型里见过的设计，叫双层推理强度，分 high 和 xhigh 两档，模型自己根据任务难度切换思考预算。简单 query 走 high 省钱，复杂 agent 链走 xhigh 多花点思考。

蚂蚁放出来的 benchmark 我挑几个有意思的，PinchBench 拿 87.60，ARC-AGI-V2 在 xhigh 模式下 66.18，AIME 26 是 95.83。前两个都是 agent 和推理硬指标，分数确实落在第一梯队，跟 Gemini-3.1-Pro、Claude Opus 4.7 是同一区间的对比对象。

benchmark 永远要打折扣看，但价格摆在那里，benchmark 离谱掉一半也不影响"白嫖体验"的结论。

## 我接 Claude Code 的踩坑过程

Claude Code 默认走 Anthropic API，但它支持任意 OpenAI 兼容的 endpoint。OpenRouter 就是 OpenAI 兼容协议，所以接法很简单。

我的步骤，先去 openrouter.ai 申请一个 key（国内能直接打开，不需要任何代理）。然后在 shell 里设两个环境变量。

```
ANTHROPIC_BASE_URL=https://openrouter.ai/api/v1
ANTHROPIC_API_KEY=<你的 OpenRouter key>
```

再加一个模型映射，让 Claude Code 知道往哪个模型转。

```
ANTHROPIC_MODEL=inclusionai/ring-2.6-1t
```

第一次跑 `claude` 我直接报错，提示 model not found。后来发现 Claude Code 对 Anthropic 协议比较挑，它会带一些 Anthropic 特有的字段。换 Cline 就顺畅多了，Cline 原生就用 OpenAI 兼容协议，OpenRouter 模型直接下拉框里选。

第二个坑，长上下文。我把一个 18 万 token 的代码仓库塞进去让它做 refactor 分析，跑了大概 40 秒才出第一个 token。这是 thinking model 的常态，xhigh 模式在前面思考阶段会沉默挺久。如果你习惯 Sonnet 那种秒出 token 的体验，要做点心理准备。

第三个坑，工具调用格式。我让它走 Cherry Studio 的 MCP 接 filesystem，前两轮工具参数偶尔会少一个引号或者括号闭合错。第三轮之后稳定下来。这种小问题在 thinking model 里不算大事，但记得加 retry。

## 适合干什么，不适合干什么

按我这一晚上的感受，Ring-2.6-1T 在两个场景是真省钱。

第一，长链路 agent 任务。比如让它读一个项目、出 refactor 计划、再分步骤改文件。它的 high/xhigh 切换会自动判断哪些步骤值得多想，单价又便宜，长 trace 跑下来成本几乎可以忽略。

第二，重推理但不要求实时的离线任务。比如批量做 code review、生成测试用例、跑 benchmark 评估。一晚上挂着跑几千次，OpenRouter 账单大概率不会让你心疼。

不太适合的场景也明确，对话型助手。它思考时间长，单轮往返很慢，你打字快的话会觉得它"卡"。还有强格式约束的输出，比如要求严格 JSON schema 的场景，我建议先做几轮验证再上生产。

## 一个我没解决的问题

OpenRouter 模型卡里 throughput 是 weekly 2.83B tokens，这个量级在国产模型里不算小，但比起 OpenAI 主力线还是有数量级差距。

我担心的是高峰期速率。这一晚上我跑下来都很顺，但如果哪天突然刷屏被薅，体验会不会掉下来，目前没数据。

国内有没有更稳定的备份路径，蚂蚁有没有计划在自家百炼或 API 平台上线 Ring-2.6-1T，这是我接下来想盯的事。

## 你现在可以做的事

如果你已经在用 Cline 或 Cherry Studio，今晚就能切过去试。OpenRouter 充个 5 美元，按这个价位够你跑几百万 token。

如果你还没用 OpenRouter，注册流程在国内网络下直接能走完，不需要任何代理工具。

如果你做 agent 类项目，正在被 Sonnet 或 Opus 的 token 账单压住，至少把 Ring-2.6-1T 放进 fallback 列表，复杂推理交给它跑一遍再看效果。

国产 1T 级 thinking model 跑到这个价位、还能国内直连，这事一年前我是不信的。现在 OpenRouter 上列着，你打开网页就能用。

## 相关链接

- OpenRouter 模型卡，https://openrouter.ai/models/inclusionai/ring-2.6-1t
- Hugging Face 模型页，https://huggingface.co/inclusionAI/Ring-2.6-1T
- inclusionAI 组织主页，https://huggingface.co/inclusionAI
- Cline（VS Code agent，原生 OpenRouter 支持），https://github.com/cline/cline
- Cherry Studio（本地 GUI 客户端），https://github.com/CherryHQ/cherry-studio

---
相关实体:: [[ant-group|蚂蚁集团]] | [[inclusion-ai|inclusionAI]] | [[openrouter|OpenRouter]]
相关主题:: [[chinese-ai|国产 AI]] | [[ai-pricing|AI 定价]] | [[open-models|开源模型]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
