# MiniMind: 几块钱+2小时，从零训练一个GPT（47k Stars）

47000 个 Star，GitHub Trending 霸榜，一个 64M 参数的小模型凭什么？

因为它让你花 3 块钱，就能亲手走完大模型训练的全部流程。不是调 API，不是跑推理，是从预训练到 RLHF，一步不落地从零造一个能对话的模型出来。

我第一反应是不信。

## 3 块钱能干什么

先说数字。MiniMind 最新版 minimind-3 的参数量是 64M，大概是 GPT-3 的 1/2700。在一张 3090 上跑完预训练 + SFT，总共 2.31 小时，按租卡价格算下来约 3 块人民币。

3 块钱，一杯蜜雪冰城的价格。

但这不是重点。重点是它覆盖的训练阶段，预训练 (Pretrain)、监督微调 (SFT)、LoRA、DPO、PPO / GRPO / CISPO、Tool Use、模型蒸馏，甚至还有 Agentic RL。你在大厂里要排队等 A100 集群才能跑的那些实验，这里全都有对应的最小复现版本。

而且所有核心算法都是 PyTorch 原生实现。不套 transformers 的 Trainer，不用 trl 的封装。每一行代码你都能看懂在干什么。

说真的，我之前翻过不少"教你训练大模型"的项目，大部分要么是拿 Llama-Factory 跑个 LoRA 就宣称"从零训练"，要么是把 Hugging Face 的十行代码教程换个马甲。MiniMind 是我见过第一个真正把预训练到强化学习的完整链路拆成透明代码的项目。

## 跑一遍到底经历什么

整个流程其实就四步。

第一步，下载数据。最小数据集只需要两个文件，pretrain_t2t_mini.jsonl 和 sft_t2t_mini.jsonl，加起来不到 3GB。数据格式极简，预训练就是纯文本 jsonl，SFT 是多轮对话格式。

第二步，预训练。一条命令搞定，

```
python train_pretrain.py
```

跑完大概 1.2 小时。这一步模型学会了基础的"词语接龙"，你问它"秦始皇"，它能接出"是中国历史上的第一位皇帝"。

第三步，监督微调。同样一条命令，

```
python train_full_sft.py
```

又是 1.1 小时。跑完之后模型就能正经聊天了。SFT 数据里已经混入了 Tool Call 样本，所以微调完的模型直接具备基础的工具调用能力。

第四步是可选的。你可以继续跑 DPO、PPO、GRPO 做强化学习，可以跑 train_distillation.py 做知识蒸馏，可以用 LoRA 给模型加垂直领域能力。每一步都有独立脚本，每一步都是原生实现。

最后模型跑起来什么样？直接看 README 里贴的对话,

```
💬: 解释什么是机器学习
🧠: 机器学习是人工智能的核心技术之一，通过算法让计算机
    从数据中学习规律，并持续改进预测或决策效果...
```

说不上惊艳，但考虑到这是 64M 参数、3 块钱训练出来的，已经相当不错了。而且这不是重点，重点是你理解了它为什么能说出这句话。

## 为什么不直接用 Llama-Factory

这是我预判到的第一个质疑。

Llama-Factory、trl、peft 这些工具确实好用。十几行代码就能跑完加载模型、加载数据、训练、推理的全流程。但 MiniMind 的作者在 README 里有一句话我很认同，"用乐高自己拼出一架飞机，远比坐在头等舱里飞行更让人兴奋。"

高层封装解决的是效率问题，MiniMind 解决的是理解问题。

你用 Llama-Factory 跑完一个 LoRA 微调，你知道 LoRA 的低秩分解到底在干什么吗？你知道 DPO 的 loss 函数长什么样吗？你知道 PPO 里 reward model 和 policy model 是怎么交互的吗？

MiniMind 里这些全是手写的。model_lora.py 里的 LoRA 实现没有调 peft，train_dpo.py 里的 DPO loss 是纯 PyTorch 写的。你可以单步调试，可以改参数看效果变化，可以真正理解每一个训练阶段在做什么。

我认为，对于想进入 LLM 领域的工程师来说，跑一遍 MiniMind 的学习价值，超过看十篇大模型综述论文。

这话可能得罪一些做综述的朋友。但我自己的体感就是，你把 MiniMind 的 train_pretrain.py 和 train_full_sft.py 从头读一遍，对预训练和 SFT 的理解会比任何教程都深。

## 值得注意的几个方向

MiniMind 在多个平台都引发了热议。X 上有推文拿到了近 900 个赞，GitHub 47k Stars 的增长速度也相当惊人。

大家的关注点主要集中在几个方向。

一是教育价值。很多人说这是他们见过最好的 LLM 入门项目，因为它不藏着掖着，每一步都有对应的原生代码。有人把它当成了面试准备材料，因为手写 attention、手写 LoRA 这些在面试里经常被问到。

二是扩展性。MiniMind 不只是一个玩具。它有 MoE 版本 (minimind-3-moe, 198M 参数)，有视觉多模态版本 (MiniMind-V)，有扩散语言模型版本 (MiniMind-dLM)，甚至有线性注意力版本。而且它兼容 transformers、vllm、ollama、llama.cpp 这些主流推理框架，可以直接 `ollama run jingyaogong/minimind-3`。

三是训练数据的质量。作者用 Qwen3-4B 合成了约 10 万条 Tool Call 数据，用 Qwen3 系列合成了 reasoning 数据，再混入公开数据集做 SFT。这套数据工程本身就值得学习。

也有人提出质疑，64M 参数的模型能学到什么？坦率讲，确实学不到太多世界知识。你问它杭州美食，它推荐"鸡肉串"，明显是训练数据的局限。但这不是 MiniMind 的目标，它的目标是让你理解训练流程，不是做一个能上线的产品。

## 我的判断

MiniMind 的真正价值在于它填补了一个空白。

市面上的 LLM 学习路径基本是两极分化的，要么是"调 API 做应用"，要么是"读论文看公式"。中间缺一个"亲手训练、逐行理解"的环节。MiniMind 就是这个环节。

我认为它应该成为每个 AI 工程师的必修实验。不是因为你会用到 64M 的小模型，而是因为走完这个流程之后，你再去看 Llama 3、Qwen3、DeepSeek 的技术报告，每一个设计决策你都能理解为什么。

作者 jingyaogong 在 README 里写了一句"大道至简"。我自己也还在摸索，但反正我觉得，AI 这个领域最缺的不是会调 API 的人，是真正理解底层原理的人。MiniMind 把理解的门槛，从"你得有 8 张 A100"降到了"你得有 3 块钱"。

这就够了。

如果你今晚有两个小时空闲，clone 下来跑一遍。不为别的，就为亲眼看着一个模型从什么都不会，到能跟你说一句完整的话。那个瞬间，比读一百篇论文都值。

## 相关链接

- GitHub 仓库, https://github.com/jingyaogong/minimind
- 在线体验, https://www.modelscope.cn/studios/gongjy/MiniMind
- 模型下载 (HuggingFace), https://huggingface.co/collections/jingyaogong/minimind-66caf8d999f5c7fa64f399e5
- 模型下载 (ModelScope), https://www.modelscope.cn/profile/gongjy
- 数据集下载, https://www.modelscope.cn/datasets/gongjy/minimind_dataset/files
- 视觉多模态版本 MiniMind-V, https://github.com/jingyaogong/minimind-v
- B站视频介绍, https://www.bilibili.com/video/BV12dHPeqE72

---

> 关联笔记, [[大模型训练]] [[开源LLM]] [[PyTorch]]

<!-- REACH: 9/10 | 品牌"训练GPT"✓ 利益点"几块钱"✓ 可操作✓ -->
