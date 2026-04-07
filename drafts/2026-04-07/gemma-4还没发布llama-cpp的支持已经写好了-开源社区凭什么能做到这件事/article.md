---
title: "Gemma 4还没发布llama.cpp的支持已经写好了，开源社区凭什么能做到这件事"
status: draft
source_url: "https://x.com/ggerganov/status/2039943099284140286"
topic_file: "topics/2026-04-07/topic-10.md"
date: "2026-04-07"
---
# Gemma 4还没发布llama.cpp的支持已经写好了，开源社区凭什么能做到这件事

Google DeepMind发布Gemma 4的那天，llama.cpp已经能跑了。

不是"发布后社区花两周适配"，是Day-0，模型上线当天直接可用。如果你觉得这只是"开源社区效率高"，那你低估了这件事背后的协作深度。

这是llama.cpp团队和Google DeepMind直接合作的结果。

## 一个Day-0支持是怎么做到的

ggerganov在推特上点名感谢了一个叫Son的开发者，说他在HuggingFace和llama.cpp这边主导了Gemma 4的适配工作，并且全程和Google DeepMind团队协作。477个赞，在技术推文里算相当高的互动量了。

这里面有个关键信息，"collaboration with the Google DeepMind team"。这不是社区拿到公开权重后自己逆向适配的。这是模型还没发布的时候，推理引擎这边就已经拿到了架构信息，提前开始写支持代码。

这种合作模式在一年前不可能发生。那时候llama.cpp还是一个纯社区项目，模型厂商不会提前和你沟通。现在ggerganov带着团队并入了Hugging Face，HF作为整个开源模型生态的中心节点，天然就有这种提前沟通的渠道。

模型还在Google内部测试的时候，llama.cpp的代码已经在写了。发布当天，用户下载完GGUF文件就能直接推理。

## 这件事为什么值得关注

中文AI社区讨论模型，通常只盯着benchmark和参数量。但一个模型能不能被真正用起来，推理引擎的支持速度才是决定因素。

Gemma 4发布的时候，Google官方博客的标题是"Byte for byte, the most capable open models"。HuggingFace那边也配了一篇"Welcome Gemma 4: Frontier multimodal intelligence on device"。两家同步发声，加上llama.cpp的Day-0支持，这是一次三方协调的发布。

我在英文社区翻了一圈，发现大家关注的重点完全不是模型跑分，而是llama.cpp这边同步上线的speculative decoding支持。ggerganov演示了一个基于prompt的投机解码方案，用ngram hashing来生成draft token，推理速度提升明显。这个技术细节中文圈几乎没人提。

另一个细节，Gemma 4上线LlamaBarn的消息拿到了160个赞。LlamaBarn是llama.cpp生态里的模型分发平台，相当于一个专门给本地推理优化的模型仓库。模型发布、推理引擎适配、分发平台上架，三件事在同一天完成。

这是一个成熟的开源发布协作链条。

## 我的判断

我认为这件事标志着开源AI推理生态进入了一个新阶段，从"模型厂商发布，社区被动适配"变成了"模型厂商主动找推理引擎提前联调"。

这种转变的驱动力很直接。对Google来说，Gemma 4发布当天如果llama.cpp不支持，大量个人开发者和中小团队根本用不上。Day-0支持直接决定了模型的初始adoption。对llama.cpp来说，首发支持最新的旗舰模型是维持自己推理引擎地位的关键。

双方都有动力让这件事发生，而HuggingFace作为中间连接层，把这个协作的摩擦成本降到了最低。

但我也想说一句不那么乐观的话。当推理引擎和模型厂商的关系从松散社区变成了深度合作，"开源"的含义正在悄悄发生变化。Day-0支持当然很好，但它的前提是推理引擎团队能拿到提前沟通的资格。谁决定谁有这个资格？目前是HF。如果未来有一个独立的推理引擎项目想做同样的事，它还能拿到这种待遇吗？

开源生态的健康程度，不看赢家过得好不好，要看新进入者还有没有机会。

## 如果你想亲手试试

Gemma 4的GGUF量化版本已经在HuggingFace和LlamaBarn上了。如果你有一台16GB内存以上的机器，可以直接用llama.cpp跑起来。

想体验speculative decoding的加速效果，可以关注llama.cpp仓库里关于ngram hashing的示例。这个方案不需要额外的draft模型，纯靠prompt上下文中的重复模式来加速，对长文本生成场景提升尤其明显。

一个问题留给大家，当模型厂商开始主动和特定的推理引擎合作做首发适配，这对其他推理引擎项目意味着什么？竞争壁垒，还是行业标准的自然收敛？

## 相关链接

- ggerganov原推：https://x.com/ggerganov/status/2039943099284140286
- Google DeepMind博客：https://blog.google/technology/developers/gemma-4/
- HuggingFace Gemma 4博客：https://huggingface.co/blog/gemma4
- llama.cpp仓库：https://github.com/ggerganov/llama.cpp
