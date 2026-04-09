# Chollet 发布 Keras Kinetic，一行装饰器把你的 Python 函数扔到 TPU 上跑

上周五 Keras 社区大会上，Francois Chollet 掏出了一个叫 Keras Kinetic 的新库。我看到推文的第一反应是，又一个"让XX变简单"的轮子？

然后我看了他的描述，愣了几秒。

这东西的核心思路是，你在本地写一个普通的 Python 函数，加一个装饰器，调用的时候它自动把你的函数、代码依赖、数据全打包，扔到云端的 TPU 或 GPU 上跑，跑完把结果传回来。日志实时流式输出，返回值就跟本地跑的一样。

听起来是不是像 Modal？没错，Chollet 自己也说了，"like Modal but with TPU support"。

这句话才是重点。

## TPU 这个好东西，为什么一直没人用好

坦率讲，TPU 的性能大家都知道强。Google 自家的 Gemma、PaLM 都是 TPU 训出来的。但你作为一个独立开发者或者小团队，想用 TPU 微调个模型，体验一直很糟糕。

GCP 上开 TPU VM，配环境、装 JAX、处理各种 XLA 编译问题，光是让一个 hello world 跑通可能就要折腾半天。Modal 这类平台把 GPU 的使用体验做得很丝滑了，但它不支持 TPU。

所以现实是，TPU 性价比可能是最好的，但大多数人微调 LLM 还是默认选 GPU，因为工具链成熟。

Kinetic 想解决的就是这个断层。

## 它到底怎么工作的

从 Chollet 的推文拆解，Kinetic 的执行流程大概是这样的。

你调用一个被装饰的函数，Kinetic 在背后做四件事。第一，把你的函数、本地代码、数据依赖全部打包。第二，通过 Cloud Build 构建一个容器，装好你的依赖（首次构建后会缓存）。第三，在 GKE 集群上用你指定的加速器跑这个任务，TPU 或 GPU 都行。第四，把结果传回本地，日志实时流回来，返回值原样送达。

整个过程对你来说就像调了个本地函数。

Chollet 另外发了两条推文专门推教程，标题叫 "Fine tuning Gemma on TPU v5 using Kinetic + Keras + JAX"，他说这是 "Easiest stack to fully leverage TPUs at scale"。

我认为这个判断不夸张。Keras + JAX + TPU 这条路线 Google 推了很久，但一直缺最后一块拼图，就是把"从本地代码到云端 TPU"这一步的摩擦降到零。Kinetic 补的就是这块。

## 社区里的多种声音

这几条推文加起来拿了 500 多赞，评论区的反馈挺有意思。

一部分人是真的兴奋，尤其是已经在用 JAX 的开发者。对他们来说 Kinetic 解决了一个真实痛点，以前要么自己写一堆 GKE 配置，要么用 Colab 的 TPU 但规模上不去。

也有人在问更现实的问题，比如定价怎么算、跟 GCP 的计费怎么关联、数据传输的延迟有多大、大数据集场景下打包上传会不会成为瓶颈。

还有一种声音比较冷静，觉得这说到底就是 Google Cloud 生态的深度绑定。你用了 Kinetic，就等于锁定了 GKE + Cloud Build + TPU 这条路线。对于已经在 AWS 或 Azure 上的团队来说，迁移成本不低。

这些顾虑都合理。说实话我也不确定 Kinetic 在生产环境大规模使用时的稳定性如何，毕竟刚发布。

## 我的判断

我认为 Kinetic 是今年 MLOps 工具链里最值得关注的发布之一。

不是因为它的技术有多颠覆，打包函数扔到云端跑，Modal 早就验证了这个模式。但 Kinetic 第一次把这个体验带到了 TPU 上，而且是 Chollet 亲自带队做的，跟 Keras 生态无缝集成。

说句可能得罪人的话，如果你现在还在 Colab 上用免费 TPU 微调模型然后抱怨效果不好，问题可能不在 TPU，在你的工具链太原始了。Kinetic + JAX + Keras 这个组合，可能是目前个人开发者能摸到的、离 Google 内部训练基础设施最近的东西。

但我也想泼盆冷水。Kinetic 目前看起来完全绑定 GCP。如果 Google 哪天调整 TPU 的定价策略或者 GKE 的政策，你的整个工作流就得跟着变。这不是技术问题，这是商业风险。

可能有些想法还不成熟，但我的建议是，如果你已经在用 JAX 或 Keras，花半天时间试试 Kinetic，体验一下 TPU 微调 Gemma 的流程。如果你的基础设施在 AWS 上，先观望，等社区把坑踩得差不多了再说。

## 一个更大的问题

Chollet 做 Kinetic 这件事本身，其实透露了一个信号。

Keras 作为一个框架，正在从"模型定义层"往"全流程编排层"扩展。以前 Keras 管的是你怎么写模型，现在它想管你怎么把模型扔到云端跑。

你想想看，如果 Kinetic 成熟了，一个开发者用 Keras 定义模型、用 Kinetic 一键跑到 TPU 上训练、用 KerasHub 加载预训练权重，整条路径全在 Keras 生态里闭环了。

这到底是好事还是坏事？

我觉得对个人开发者是好事，降低门槛永远没错。但对生态多样性来说，又多了一个 vendor lock-in 的诱惑。

反正我觉得，工具越来越好用是确定的。但选择工具的时候，除了"好不好用"，也得想想"好不好走"。

## 相关链接

- [Chollet 推文 - Kinetic 介绍](https://x.com/fchollet/status/2040119594984284218)
- [Chollet 推文 - Gemma TPU 微调教程](https://x.com/fchollet/status/2040822483511841057)
- [Chollet 推文 - LLM 微调教程推荐](https://x.com/fchollet/status/2040161313595466203)
- [Keras 官网](https://keras.io)

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
