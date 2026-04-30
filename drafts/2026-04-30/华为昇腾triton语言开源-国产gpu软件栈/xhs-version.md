# 昇腾把 Triton 语言接上了，国产 NPU 软件栈第一次对齐 PyTorch 圈

刷 lobsters 看到一个标题愣了一下，"Triton language for Huawei Ascend"。

点进去是 triton-lang 官方组织下的一个仓库，叫 triton-ascend，MIT 协议，刚发了 v3.2.0。

不是单独开个山头喊"我们也有 Triton"，是直接挂在 triton-lang 这个上游组织底下做的适配层。这个细节比"开源了一个新东西"本身重要十倍。

## Triton 是什么

我估计大部分人对 Triton 这个词没概念。

简单讲，Triton 是 OpenAI 搞出来的 Python DSL，用来写 GPU 内核 (kernel)。

写 GPU 内核以前只有两条路。要么手撸 CUDA C++，门槛高、调试痛；要么靠 PyTorch 已有的算子拼，性能瓶颈卡在框架抽象层。

Triton 是中间路线。你用 Python 写一段类似 numpy 的代码，描述清楚每个 block 怎么算、内存怎么搬，编译器自己处理寄存器分配、共享内存、warp 调度这些脏活。写起来比 CUDA 友好十倍，性能能逼近手写 CUDA。

为什么这玩意现在特别重要，是因为 PyTorch 2.x 里那个 torch.compile，底层就是把图编译成 Triton 代码再跑。FlashAttention 的几个高效实现也是 Triton 写的，vLLM 里很多自定义算子也是 Triton 写的。

Triton 已经是事实上的"GPU 编程通用中间层"。

## triton-ascend 在做什么

把这套 Triton DSL 编译到昇腾 NPU 上跑。不是模拟器，不是性能演示，是真的把 Python 写的 Triton kernel 编译成昇腾的指令。

我去翻了 README，目前覆盖了 Triton Python API 的 85% 左右，连续内存访问场景基本能跑，硬件支持 Atlas A3/A2 这一代训练推理卡，依赖 CANN 8.5.0 或更早版本，pip 装一下就能用，包名就叫 triton-ascend。

我自己没卡跑不了，但这个完成度超过我预期。FP8 类型转换、scatter 操作这些都在 v3.2.0 里加进去了，更新节奏是几周一次。

我认为这是国产 NPU 软件栈第一次对齐到 PyTorch 圈的通用底座。以前的逻辑是"你来学我家的专用 API"，现在反过来了，是"PyTorch 圈写 Triton 那套你别动，我把后端编译给你换掉"。前者迁移成本巨大，后者理论上接近零成本。

## 社区在聊什么

HN 关联讨论里有一类技术派声音，关心的是覆盖度。Triton API 的 85% 听起来很多，但剩下 15% 往往是 FlashAttention 这种正经 workload 里最关键的部分，比如非连续内存、tensor core 特殊指令。这个担忧合理，要跑大模型主力 kernel 还得等几个版本。

知乎国产硬件话题里讨论比较直接。有人说这次开源后端比之前的硬件参数发布靠谱得多，也有人说 23 个 star、十几个 fork 离社区繁荣还有十万八千里。

我觉得两边讲的不是一件事。star 数低是因为目标受众本来就极小，少到可能也就几百个工程师有动机去试。但有没有这个东西，对生态的意义完全不同。

## 我的判断

第一个判断是，triton-ascend 的真正受众不是个人开发者，是已经买了昇腾卡、想把 PyTorch 训练任务搬过去的国产云厂商和 AI 公司。

个人开发者不会因为多了一个后端就跑去买昇腾卡。但已经有卡的公司，原来可能要重写一半算子，现在如果 Triton 这一层能通，迁移成本能降一个数量级。这才是这次开源的真实流量入口，不是开发者社区，是 to B 集成。

第二个判断更不讨喜。我认为这一步比之前所有"昇腾对标 H100"的硬件参数发布更接近落地。硬件性能数字大家看多了，没有软件栈承接都是 PPT 上的数字。Triton 是 PyTorch 生态默认的 kernel 中间表示，把这一层接住，比刷一万次性能稿子有用。

我也想公平承认对方立场。CANN 文档难找、算子覆盖不全、调试链路长，这些吐槽前几年都不是没道理。triton-ascend 自己在 README 里也写"持续迭代中"，不是说这次就把所有问题解决了。

但路线对了，这事就有意义。

## 你能干点什么

如果你手里没有昇腾卡，这篇对你的实际行动其实没有。

如果你公司里恰好有昇腾推理或训练卡，这事值得让 infra 同事去看一下 triton-ascend 仓库，评估一下现有 PyTorch workload 里多少比例的自定义 kernel 能直接用 Triton 改写。

如果你只是 Triton 写过几个小 kernel 玩玩的开发者，可以关注这个项目的 issue 区，提 bug 比 star 更有用。

国产 NPU 软件栈第一次有了一个看起来不像内部宣传材料的东西。剩下就看后面几个版本能不能把那 15% 的硬骨头啃下来。

## 相关链接

- triton-ascend 仓库，https://github.com/triton-lang/triton-ascend
- OpenAI Triton 主项目，https://github.com/triton-lang/triton
- pip 安装包，https://pypi.org/project/triton-ascend/

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
