# Safetensors 加入 PyTorch Foundation，Hugging Face 在下一盘什么棋？

昨天，Hugging Face 把 Safetensors 捐给了 PyTorch Foundation。

你可能会想，一个模型文件格式，有什么好捐的？但如果你仔细想想，整个开源 AI 生态里，几乎所有模型的权重文件都在用这个格式。Hugging Face Hub 上数以万计的模型，从 NLP 到视觉到音频，默认存储格式就是它。

把这样一个东西交出去，要么是慈善，要么是战略。我认为是后者。

## Pickle 的坑，你踩过吗

聊 Safetensors 之前，得先说说它为什么存在。

Python 社区长期依赖 Pickle 做模型序列化。坦率讲，Pickle 的设计初衷就不是给"安全共享"用的，它可以在反序列化时执行任意代码。你从 Hub 上下载一个 .pkl 模型文件，加载的瞬间，里面藏的恶意代码就能跑起来。

这不是理论风险。2023 年就有安全研究者演示过，一个伪装成正常模型的 Pickle 文件可以在你机器上开后门。当时社区里讨论了一阵，但大部分人的态度是"我又不会下载来路不明的模型"。

问题是，开源模型共享的规模已经大到你不可能逐个审计每个文件。

Safetensors 的设计极其简单，一个 JSON header 描述 tensor 的元数据，后面跟二进制的 tensor 数据。没有代码执行的可能性。就这么简单。

这种"故意做得简单"的设计哲学，反而是最难的部分。

## 捐出去，到底图什么

Safetensors 一直是开源的，代码在 GitHub 上谁都能看、能改、能提 PR。那加入 PyTorch Foundation 到底改变了什么？

改变的是治理权。

之前，Safetensors 的商标、仓库控制权都在 Hugging Face 手里。现在，这些东西归 Linux Foundation 管了。项目有了正式的 GOVERNANCE.md 和 MAINTAINERS.md，任何人都可以通过文档化的路径成为维护者。

Hugging Face 的 Luc 和 Daniel 还在技术指导委员会里，日常维护也还是他们在做。但从制度上，这个项目不再"属于"任何一家公司。

我是真的觉得这步棋很聪明。

你想想看，如果你是一家大公司，比如 Meta 或者 Google，你愿意把自己的模型发布流程绑定在某个竞争对手控制的格式上吗？哪怕这个格式是开源的，心理上还是会有顾虑。但如果这个格式归一个中立基金会管，顾虑就小很多。

Hugging Face 放弃了控制权，换来了更广泛的采纳。这和 Google 当年把 Kubernetes 捐给 CNCF 是一个逻辑。

## 社区里的多种声音

围绕这件事，社区里的讨论挺有意思。

一部分人觉得这是好事，vendor-neutral 的治理意味着更多公司愿意参与进来，项目的长期稳定性有了保障。也有人比较冷静地指出，Safetensors 目前的维护者还是 HF 的人，基金会治理更多是象征意义，实际开发节奏短期内不会变。

还有一些声音关注的是技术路线图。Safetensors 计划和 PyTorch 核心做更深度的集成，作为 torch 模型的序列化系统。也就是说，未来你用 torch.save() 保存模型，底层可能直接就是 Safetensors 格式。

路线图里还提到了几个值得关注的方向，支持直接在 CUDA/ROCm 设备上加载和保存，不需要先过一遍 CPU。分布式加载的原生支持，每个 rank 只加载自己需要的权重。还有对 FP8、GPTQ、AWQ 等量化格式的正式支持。

说实话我也不确定这些功能什么时候能落地，但方向本身是对的。

## 我的判断

我认为 Safetensors 加入 PyTorch Foundation 是 2026 年开源 AI 基础设施领域最重要的治理事件之一。

这话可能说大了，但你想想，模型序列化是整个 AI 工作流的基础环节。训练完要存，推理前要加载，Hub 上要共享，量化要转换。一个安全、高效、中立的序列化格式，相当于 AI 世界的 TCP/IP。

Hugging Face 的策略很清楚，把基础设施层做成公共品，把自己的竞争优势放在上层的 Hub 生态和开发者体验上。你用不用 Hugging Face 的服务是你的选择，但底层格式是大家共有的。

可能有些想法还不成熟，但我觉得接下来会有更多类似的事情发生。Tokenizers、Transformers 这些库，理论上也可以走同样的路径。

反过来说，如果一个开源项目的核心格式还攥在某家公司手里，而这家公司又在和你竞争，你敢大规模依赖它吗？

Pickle 的安全问题催生了 Safetensors，Safetensors 的采纳规模倒逼了治理中立化。技术问题最终变成了治理问题。

这大概是开源世界里最有意思的剧本。

## 如果你现在还在用 Pickle 格式

赶紧迁移。不是建议，是强烈建议。

Safetensors 的 Python 包安装就一行 `pip install safetensors`，从 Pickle 转换过来也就几行代码的事。安全性、加载速度（zero-copy + lazy loading）、生态兼容性，三个维度都是碾压级别的提升。

一个问题留给你，当 AI 基础设施的每一层都变成"公共品"之后，真正的护城河会在哪里？

## 相关链接

- Safetensors GitHub 仓库: https://github.com/huggingface/safetensors
- Safetensors 文档: https://huggingface.co/docs/safetensors
- PyTorch Foundation: https://pytorch.org/foundation
- 原文博客: https://huggingface.co/blog/safetensors-joins-pytorch-foundation
