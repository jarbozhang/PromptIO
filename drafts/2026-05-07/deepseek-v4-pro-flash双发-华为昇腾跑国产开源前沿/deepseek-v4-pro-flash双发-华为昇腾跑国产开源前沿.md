# DeepSeek V4 Pro 不再是 benchmark 第一名，但它把 1.6T 模型直接放到了昇腾上

DeepSeek 这次发 V4 Pro 和 Flash，第一时间被海外圈讨论的不是分数。

是一行小字，"runnable on Huawei Ascend chips"。

Pro 1.6 万亿参数、Flash 2840 亿参数，base 和 instruct 全开源，权重直接放出。这本身已经是 4 月以来开源圈最大的一次模型放量。但真正改变行业坐标的是，DeepSeek 同时官宣两条硬件路线，NVIDIA 一路，华为昇腾一路。

## 先把规格和分数对齐

V4 Pro 的架构是 1.6T-A49B 的 MoE，1.6 万亿总参数，单 token 激活 49B。V4 Flash 是 284B-A13B，2840 亿总参数激活 13B。两个版本都给到 1M 上下文窗口。

Artificial Analysis 那边的 Intelligence Index，Pro Max 跑到 52，Flash Max 47。Pro 比上一代 V3.2 的 42 涨了 10 分。

Agentic 项的 GDPval-AA，V4 Pro 是 1554 分，open-weight 模型里第一，压过 Kimi K2.6 的 1484 和 GLM-5.1 的 1535。Text Arena 首发拿到 open 模型整体第二，Medical & Healthcare 类目第一。

但 hallucination 这一项不太好看。AA-Omniscience 测下来 V4 Pro 的 hallucination rate 是 94%，Flash 是 96%。这是一项对 reasoning 模型偏苛刻的测试，但数字摆在这里。

DeepSeek 这次没有再像 V3 那样把"第一"作为发布主轴。Pro 不是 benchmark 第一名，open-weight 第一甚至也不是它强调的卖点。

它强调的是另一件事，能在哪里跑。

## 关键不在分数，在 1.6T 模型直接对昇腾做了适配

Latent Space 在汇报里直接写明，DeepSeek V4 Pro 是 runnable on Huawei Ascend chips。这不是一个第三方做的迁移工程，是 DeepSeek 官方在发布时就把"昇腾"列为目标硬件之一。

Reddit r/LLMeng 上那条 68 赞的帖子说得更具体，V4 不只是"为昇腾做优化"，而是直接用 CANN（华为对标 CUDA 的栈）训练的。这个说法目前还在社区口径，没有官方完整确认，但和 DeepSeek 同步给出的部署路径是一致的。

DeepSeek CEO 在投资人沟通里给了一个时间点，Pro 的 API 定价可能会在 Huawei Ascend 950 supernodes 在下半年规模部署后明显下降。这是一个非常具体的暗示，DeepSeek 的成本结构已经把昇腾算进去了，不是"将来可能会跑"。

我们 4 月 30 号写过一篇华为昇腾 Triton 语言开源，当时讲的是软件栈层面。Triton-Ascend 让 PyTorch 圈现成的 kernel 不用改太多就能换后端编译。今天这件事，是上层的旗舰模型也接住了。

软件栈一层 + 旗舰开源模型一层，国产 AI infra 这两个最关键的环节同时落地。

## 不是"踢掉 NVIDIA"，是同时拥抱两条路线

社区这次最容易跑偏的解读是"DeepSeek 抛弃了 NVIDIA"。

实际情况是相反的。V4 在发布日 day one 就上了 NVIDIA 自家的免费 developer inference 服务，Reddit 上有用户专门 highlight 了这一点。同时 OpenRouter、deepseek.com 官方 API 上 NVIDIA 路线也照常跑。

更准确的说法是分工。NVIDIA 卡承担短期内大批量服务商业 API、稳定性优先的负载，昇腾承担"中国境内大规模部署、对供应安全敏感、价格要再压一档"的部分。

Latent Space 在原文里也补了一句冷静的话，Ascends are still a quarter the supply of H100s。供应量目前还差 NVIDIA 一大截。

这就解释了为什么 DeepSeek 选择两路并行而不是单押一边。Pro 这种 1.6T 量级模型一旦只跑在一边，要么吃供给上限，要么吃地缘风险。同时挂两条线，是当下最现实的工程决策。

## 国内云厂的窗口

这次发布对国内云厂的影响比看起来大。

阿里云、火山引擎、腾讯云这一年都在扩昇腾实例池，但缺一个能撑场面的旗舰开源模型作为"参考实现"。Qwen 系列体量摆在那里没问题，但毕竟是阿里自家闭源/半开源生态，其他云不太会拿它做主推 SKU。

DeepSeek V4 Pro 不一样，它是中立第三方的开源旗舰。三家云都可以基于昇腾实例 + V4 Pro 做差异化定价，用国产硬件成本去打 NVIDIA 实例的 API 价格。

Pro 输入价当下大概在 $1.74/M（OpenRouter 官方报价），如果昇腾 950 supernode 部署铺开，按 DeepSeek 自己的口风往下走一档，每百万 token 输入价压到 1 块钱人民币以下不是不可能。这个价格区间会把现在还在 GPT-5.5 Turbo 档收费的国内 SaaS 全部往下挤一轮。

国产 AI 芯片上市公司这边，寒武纪、海光信息、昆仑芯一年里被反复炒"算力替代"概念，但每次都缺一个明确的下游需求锚点。今天 DeepSeek 给了一个，"1.6T 模型可以在国产硬件上落地"。这条线索后面会被资本市场反复引用。

## 行动层面，国内开发者怎么用

如果你只是想用 V4 Pro 或 Flash 这两个模型本身，国内有几条干净的路径。

一是 deepseek.com 官方 API，国内可直接访问，支持人民币付款。Pro 和 Flash 应该会在几天内上 API 列表。

二是 modelscope.cn 拉权重。DeepSeek V3 系列的权重之前都有同步到魔搭，V4 大概率也会在一周内上。base 和 instruct 都开了源。

三是华为云、阿里云、火山引擎的昇腾或国产 GPU 实例。这条路径目前还是企业向，要走商务报备，但下半年随着昇腾 950 supernode 起量，会逐步开放给中小开发者。

如果你手上有 H100 或者 MI300X 集群，284B-A13B 的 Flash 在 4 张 80G H100 上能勉强推理，1.6T-A49B 的 Pro 至少需要 8 张往上做 MoE 切分。这个不是新手玩具，是 infra 团队的活。

## 写到最后

这一年看 DeepSeek 发布我习惯了一个流程，先看分数，再看价格，最后看权重。

V4 这次不一样。分数稳，价格还会再降，权重照例开。但真正应该圈出来的是那行小字，runnable on Huawei Ascend。

我自己的判断是，这一行字过几年回头看，比"1.6T 参数"更值得被记住。开源旗舰模型 + 国产硬件 + 软件栈底座，这三件事头一回在同一个发布事件里同时到位。

它不会立刻改变市场份额，NVIDIA 那边也没必要慌。但 2026 年下半年开始，国内任何讨论"AI 算力国产化"的方案，都绕不开 DeepSeek V4 + 昇腾这个组合。

这是国产 AI infra 第一个真正意义上的参考实现。

## 相关链接

- DeepSeek V4 Pro on OpenRouter，https://openrouter.ai/models/deepseek/deepseek-v4-pro
- DeepSeek V4 Flash on OpenRouter，https://openrouter.ai/models/deepseek/deepseek-v4-flash
- DeepSeek 官网，https://www.deepseek.com
- ModelScope 魔搭社区 DeepSeek 主页，https://modelscope.cn/organization/deepseek-ai
- 华为昇腾官方，https://www.hiascend.com
- Latent Space 原文，https://www.latent.space/p/ainews-deepseek-v4-pro-16t-a49b-and

---
相关实体:: [[deepseek|DeepSeek]] | [[huawei|华为]] | [[nvidia|NVIDIA]] | [[cambricon|寒武纪]] | [[kunlunchip|昆仑芯]] | [[alibaba-cloud|阿里云]]
相关主题:: [[chinese-ai|国产 AI]] | [[ai-hardware|AI 硬件]] | [[local-inference|本地推理]] | [[ai-pricing|AI 定价]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
