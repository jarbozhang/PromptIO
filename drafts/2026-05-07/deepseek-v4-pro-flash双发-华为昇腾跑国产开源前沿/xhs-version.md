# DeepSeek V4 Pro 和 Flash 双发，1.6T 模型可以跑在华为昇腾上了

DeepSeek 这次发 V4 Pro 和 Flash，最值得圈出来的不是分数，是发布材料里那行小字，runnable on Huawei Ascend chips。

Pro 1.6 万亿参数，Flash 2840 亿参数，base 和 instruct 全开源，权重直接放出。这是 4 月以来开源圈最大一次模型放量。同时官宣两条硬件路线，NVIDIA 一路，华为昇腾一路。

## 规格和分数先对齐

V4 Pro 是 1.6T-A49B 的 MoE，单 token 激活 49B。V4 Flash 是 284B-A13B，激活 13B。两个版本都给到 1M 上下文窗口。

Artificial Analysis 那边的 Intelligence Index，Pro Max 跑到 52，Flash Max 47。Pro 比上一代 V3.2 的 42 涨了 10 分。

Agentic 项的 GDPval-AA，V4 Pro 是 1554 分，open-weight 模型里第一。Text Arena 首发拿到 open 模型整体第二，Medical & Healthcare 类目第一。

hallucination 这一项不太好看，AA-Omniscience 测下来 Pro 是 94%，Flash 是 96%。这是一项对 reasoning 模型偏苛刻的测试，但数字摆在这里。

DeepSeek 这次没有把"第一"作为发布主轴。它强调的是另一件事，能在哪里跑。

## 1.6T 模型直接对昇腾做了适配

Latent Space 在汇报里写明，DeepSeek V4 Pro 是 runnable on Huawei Ascend chips。这不是第三方做的迁移工程，是 DeepSeek 官方在发布时就把昇腾列为目标硬件。

Reddit r/LLMeng 上的帖子说得更具体，V4 不只是为昇腾做优化，而是直接用 CANN（华为对标 CUDA 的栈）训练的。这个说法目前还在社区口径，但和 DeepSeek 同步给出的部署路径一致。

DeepSeek CEO 在投资人沟通里给了一个时间点，Pro 的 API 定价可能会在 Huawei Ascend 950 supernodes 下半年规模部署后明显下降。这是非常具体的暗示，DeepSeek 的成本结构已经把昇腾算进去了。

我们 4 月 30 号写过一篇华为昇腾 Triton 语言开源，讲的是软件栈层面。Triton-Ascend 让 PyTorch 圈现成的 kernel 不用大改就能换后端。今天这件事是上层的旗舰开源模型也接住了，软件栈一层 + 旗舰模型一层，国产 AI infra 这两个最关键的环节同时落地。

## 不是踢掉谁，是分工

社区这次最容易跑偏的解读是 DeepSeek 抛弃了 NVIDIA。

实际情况是相反的。V4 在发布日 day one 就上了 NVIDIA 自家的免费 developer inference 服务。同时 OpenRouter、deepseek.com 官方 API 上 NVIDIA 路线也照常跑。

更准确的说法是分工。NVIDIA 卡承担短期内大批量商业 API、稳定性优先的负载，昇腾承担中国境内大规模部署、对供应安全敏感、价格要再压一档的部分。Latent Space 也补了一句冷静的话，Ascends are still a quarter the supply of H100s，供应量目前还差一大截。

这就解释了为什么 DeepSeek 选择两路并行。Pro 这种 1.6T 量级模型如果只跑在一边，要么吃供给上限，要么吃地缘风险。同时挂两条线，是当下最现实的工程决策。

## 国内开发者怎么用

如果你只是想用 V4 Pro 或 Flash 这两个模型本身，国内有几条干净的路径。

一是 deepseek.com 官方 API，国内可直接访问，支持人民币付款。Pro 和 Flash 应该会在几天内上 API 列表。

二是 modelscope.cn 拉权重。DeepSeek V3 系列的权重之前都同步到了魔搭，V4 大概率一周内上。base 和 instruct 都开源。

三是华为云、阿里云、火山引擎的昇腾或国产 GPU 实例。这条路径目前还是企业向，要走商务报备，下半年随着昇腾 950 supernode 起量会逐步开放给中小开发者。

如果手上有自有显卡集群，284B-A13B 的 Flash 在 4 张 80G 卡上能勉强推理，1.6T-A49B 的 Pro 至少需要 8 张往上做 MoE 切分。这不是新手玩具，是 infra 团队的活。

## 我的判断

这一年看 DeepSeek 发布我习惯了一个流程，先看分数，再看价格，最后看权重。

V4 这次不一样。分数稳，价格还会再降，权重照例开。但真正应该圈出来的是那行小字，runnable on Huawei Ascend。

我自己的判断是，这一行字过几年回头看，比 1.6T 参数更值得被记住。开源旗舰模型 + 国产硬件 + 软件栈底座，这三件事头一回在同一个发布事件里同时到位。

它不会立刻改变市场份额。但 2026 年下半年开始，国内任何讨论 AI 算力国产化的方案，都绕不开 DeepSeek V4 + 昇腾这个组合。这是国产 AI infra 第一个真正意义上的参考实现。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
