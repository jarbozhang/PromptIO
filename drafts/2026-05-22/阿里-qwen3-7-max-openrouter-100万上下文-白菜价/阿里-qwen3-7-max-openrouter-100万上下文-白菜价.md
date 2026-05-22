# 凌晨刷 OpenRouter 看见 Qwen3.7 Max，我把昨天的 Claude 工作流停了

昨晚两点多，我在 OpenRouter 的模型列表里往下翻，看到 `qwen/qwen3.7-max` 几个小时前刚上线。

点进去三眼，我把跑了一半的 Claude agent 任务停掉，换成了 Qwen3.7 Max 接着跑。

不是因为 Qwen 更强，是因为价格摆在那里，1M context 摆在那里，而且阿里官方说这一代是冲着 agent 场景来的。对国内做 agent 的人来说，这件事比"又出了一个国产大模型"重要得多。

## Qwen3.7 Max 到底是什么

简单几个数字。

上下文窗口 100 万 token，和 Gemini 1.5 Pro 一个量级，是 Claude Sonnet 4.5 的 5 倍。

定价 $2.5 / $7.5 每百万 token（输入 / 输出），按当前汇率算大概是 18 元 / 54 元，刚好踩在国产模型的中价位，但能调到的是阿里 Qwen 系列里的"Max"档。

模型卡里写的定位很直白，"agent-centric workloads，coding、office and productivity、long-horizon autonomous execution"。翻译过来就是，这一代不是冲着对话好用做的，是冲着塞进 agent 框架里跑长链条任务做的。

还有一个细节容易被忽略，OpenRouter 这次同时支持 explicit prompt caching。意思是你重复用同一段长 system prompt，命中缓存的部分会大幅降价。对 agent 来说这是省钱大头，比模型本身降价更直接。

## 我跑的三个场景

第一个是长文阅读。

塞了一份 47 万 token 的开源项目代码库（包括 README、几个核心目录的全部源码、issue 历史），让它回答"这个项目和 LangChain 在 agent 编排上的设计差异"。Qwen3.7 Max 跑完用了一分多钟，回答里至少引用了 6 个具体文件路径和函数名，没有出现凭空捏造的 API。Claude Sonnet 4.5 同样问题因为塞不下全部代码，我只能先做检索再喂上下文，整个流程多了三步。

体感上，1M context 不是让你"能用"，是让你"懒得做 RAG"。这两件事的 dev 成本差一个数量级。

第二个是 agent 工具调用。

我把 Qwen3.7 Max 接到自己常用的一个本地脚本里，跑一个十几步的浏览器自动化任务（开页面 → 等加载 → 抽取数据 → 翻页 → 写文件）。中间它自己识别出第 4 步抽取失败，主动切到备用 selector 重试，没有人工干预。

这事 Claude 也能做，但 Qwen3.7 Max 在我跑的这一轮里没有像之前 Qwen2.5 那样在 tool calling 的 JSON 格式上挑食。模型卡里说"long-horizon autonomous execution"，至少在这个 demo 任务上是真的。

第三个是代码生成。

让它写一个把 PDF 表格抽成结构化 JSON 的脚本，要求支持中文混排、合并单元格、跨页表格。Qwen3.7 Max 直接给了一版用 pdfplumber + 自定义后处理的方案，跑通需要改一处编码问题。Claude Sonnet 4.5 给的方案更优雅一些（用了递归合并），但两边在我这个具体输入上输出的 JSON 结构基本一致。

代码能力上没看出代差，但写中文注释和理解中文需求时，Qwen 的"自然度"明显更高。

## 几个常用模型摊一起看

把我自己 .env 里挂的几个模型按上下文 / 价格 / 中文 / agent 友好度排一下，方便对照。

| 模型 | 上下文 | 输入 $ / 1M | 输出 $ / 1M |
|---|---|---|---|
| Qwen3.7 Max | 1M | 2.5 | 7.5 |
| Claude Sonnet 4.5 | 200K | 3 | 15 |
| Claude Opus 4.5 | 200K | 15 | 75 |
| GPT-4o | 128K | 2.5 | 10 |
| Gemini 1.5 Pro | 1M | 1.25 | 5 |
| DeepSeek V3 | 128K | 0.27 | 1.1 |
| Kimi K1.5 | 200K | 0.5 | 2 |

Qwen3.7 Max 的位置很微妙。

绝对价格不是最低，DeepSeek V3 和 Kimi K1.5 便宜得多。但你想要 1M context 又想要 agent 优化又想要 Qwen 这一代的中文能力，目前在 OpenRouter 上只有它一档。Gemini 1.5 Pro 价格更便宜，但中文 agent 的踩坑成本另算，而且 Gemini 在很多国内 dev 的链路里需要额外做接入。

输出价是 Sonnet 4.5 的一半，是 Opus 4.5 的十分之一。如果你做的是输出密集的 agent（写文档、生成代码、长报告），这个差价一个月够养一台 GPU 服务器。

## 我的判断

国产模型第一时间上 OpenRouter，比"性能追平国外"是更重要的信号。

过去国内做 agent 的人，要么走阿里云 / 火山 / 腾讯云的官方 API（每家接入方式不一样，切换成本高），要么走 OpenRouter 但只能选国外模型。现在 Qwen3.7 Max 直接在 OpenRouter 上以标准 OpenAI 接口暴露出来，你的 LangChain、Cursor、Cline、Roo Code 改一个 model id 就能切。

这件事的实际效果是，国产模型从"国内闭环工具的特供选项"变成了"全球 agent 工具链的默认候选之一"。

我认为之后半年会看到更多国产模型直接上 OpenRouter 首发，而不是先发布在自家平台。理由很简单，OpenRouter 上一个新模型挂出来当天就有上千开发者真实评测，自家平台的发布会再热闹也没这个反馈速度。

要泼一盆冷水的话，1M context 的实际效果还要看你的具体任务。我跑的代码库分析是它擅长的场景，如果你塞的是 80 万 token 的小说让它做剧情分析，"针在 haystack 里"的召回率不一定撑得住。模型卡里没贴具体的 long context benchmark，这块我准备这周再测一轮。

## 立刻能动手的几件事

如果你已经在用 OpenRouter，把 model id 改成 `qwen/qwen3.7-max`，跑一遍你日常的 agent 任务，对比一下成本和延迟。

如果你在用 Cursor / Cline / Roo Code，在配置里加这个模型，把"成本敏感"的子任务（比如批量代码注释、文档生成）切过去，主任务可以保留原来的 Claude / GPT。

如果你的 agent 框架支持 prompt caching，把长 system prompt 配上 cache 标记，OpenRouter 这次对 Qwen3.7 Max 是开了 explicit caching 的，能再省一档。

如果你做的是国内闭环产品，阿里云百炼上同款模型一般会同步或稍晚上线，可以两边对比 latency 和稳定性再决定走哪条线。

凌晨那一刻我停掉 Claude 任务的理由，不是 Qwen 已经全面超越，是国产模型终于不用让我"为了用上它"专门写一套接入。

这一步走完，下一步就该是谁家先把 agent reliability 打到 95% 以上。

## 相关链接

- Qwen3.7 Max on OpenRouter，https://openrouter.ai/models/qwen/qwen3.7-max
- 阿里 Qwen 官方页，https://qwenlm.ai
- OpenRouter 文档（prompt caching），https://openrouter.ai/docs/prompt-caching

---
相关实体:: [[alibaba|阿里]] | [[qwen-family|Qwen]] | [[qwen-3-7-max|Qwen3.7 Max]] | [[openrouter|OpenRouter]]
相关主题:: [[chinese-ai|国产 AI]] | [[ai-pricing|AI 定价]] | [[agent-frameworks|Agent 框架]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
