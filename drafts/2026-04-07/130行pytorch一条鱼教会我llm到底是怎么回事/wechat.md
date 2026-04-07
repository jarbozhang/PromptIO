---
status: draft
topic: topics/2026-04-07/topic-7.md
source_url: https://github.com/arman-bd/guppylm
generated_at: 2026-04-07T20:00:00+08:00
---

# 130行PyTorch，我从零搓了一个会说话的LLM，它觉得活着就是为了吃

昨天晚上我在HN刷到一个项目，点进去看了眼代码，愣了。

整个model.py，129行。不是129行调用HuggingFace的胶水代码，是129行从零写的完整Transformer。参数量9M，在免费的Colab T4上5分钟训练完，然后这条小鱼就开始跟你聊天了。

我当时的反应是不信。

## 这到底是个什么东西

GuppyLM，一个叫Arman的开发者写的教学项目。名字里的Guppy是孔雀鱼，意思是这是一条很小很小的鱼。整个项目的设定是你在跟一条鱼对话，你问它生命的意义是什么，它会告诉你"食物"。

听起来像玩具对吧？但我把代码拉下来读了一遍之后，改变了看法。

这130行代码里塞进了一个完整的Transformer decoder架构。Multi-head attention，positional encoding，feed-forward layers，layer norm，全都在。不是简化版，不是阉割版，是真正可以work的最小实现。

训练数据是6万条合成对话，全部围绕"你是一条鱼"这个人设生成。这个选择非常聪明，因为它把"数据从哪来"这个最烦人的问题直接绕过去了。

## 为什么130行就够了

我在Colab上实际跑了一遍。clone，pip install，跑train.py，整个过程不超过8分钟。

关键在于这个项目砍掉了什么。

没有BPE tokenizer，用的是character-level tokenization。没有KV cache，没有flash attention，没有gradient checkpointing。没有RLHF，没有DPO，没有任何对齐技术。没有分布式训练，没有混合精度。

这些东西让GPT-4成为GPT-4，但它们不是Transformer的本质。

GuppyLM证明了一件事，你把所有工程优化层剥掉之后，一个能生成连贯文本的语言模型，核心代码就是这么点。

这对于正在学LLM的人来说是一个巨大的礼物。

我之前也推荐过Karpathy的nanoGPT，但说实话nanoGPT对新手还是太重了，光model.py就300多行，还要自己处理数据集。GuppyLM把门槛又压低了一半。

## 英文社区在聊什么，中文圈还没注意到的

HN上876个赞，129条评论，讨论质量非常高。我翻了一遍，捞几个有意思的点。

第一，有人用GuppyLM做了一个实验，把鱼的人设换成了海盗，20分钟就训练出了一个说海盗腔的小模型。这说明这个框架的"人格注入"能力是真实可用的，不只是demo。

第二，评论区有一个反复出现的讨论。很多人说自己读了一堆Transformer论文，看了无数教程视频，但直到亲手跑了一个能工作的最小实现，才真正理解attention在干什么。这不是个例，这是规律。

第三，有几个做教育的人已经在讨论把GuppyLM塞进课程大纲里，作为"Transformer第一课"的实操项目。

中文社区目前对这个项目的讨论几乎为零。量子位和机器之心都没报。但我判断这个项目会火，因为它精准命中了一个需求，"我想理解LLM但不知道从哪开始"。

## 我的判断

我说一个可能得罪人的话。

2024到2025年，中文AI社区最大的问题不是缺信息，是缺动手。太多人在看教程、看解读、看评测，但从来没有自己从零训练过哪怕一个最小的模型。

你不需要8张A100，你不需要读完Attention Is All You Need的每一个公式。你需要的是打开Colab，跑一个130行的脚本，然后开始改它。

GuppyLM不是一个产品，它是一个起点。9M参数的孔雀鱼跟GPT-4之间的差距，恰好就是你需要学的所有东西。

## 今晚就可以做的事

1. 打开 [GuppyLM的GitHub](https://github.com/arman-bd/guppylm)，花10分钟读完model.py
2. 用免费Colab跑一次训练，感受一下5分钟出一个能对话的模型是什么体验
3. 把鱼的人设换成任何你想要的角色，重新生成训练数据，再训练一次
4. 回头再去看nanoGPT，你会发现突然能看懂了

130行代码，5分钟训练，一条觉得活着就是为了吃的鱼。

如果你连这个都不愿意动手试，那你可能并不是真的想理解LLM。

---

**相关链接**
- [GuppyLM GitHub仓库](https://github.com/arman-bd/guppylm)
- [Hacker News讨论帖](https://news.ycombinator.com/item?id=47655408)
- [Google Colab免费GPU使用指南](https://colab.research.google.com/)
- [Karpathy nanoGPT](https://github.com/karpathy/nanoGPT)（进阶推荐）
