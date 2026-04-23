# Sebastian Raschka 拆 RLVR + GRPO，让 LLM 推理追上 o3 的几个关键拼图

DeepSeek R1、OpenAI o1、o3 都靠 RL 把推理能力顶起来了，但我打赌 90% 的工程师只听过 PPO。

GRPO 是什么？RLVR 又是什么？这俩缩写在 Raschka 4 月那篇《The State of Reinforcement Learning for LLM Reasoning》里出现了几十次。

我读完之后愣了一会儿，因为如果你不懂这几个名词，2026 年你就没法做 reasoning model。

## 一句话讲清楚 GRPO 和 PPO 的差距

PPO 这套老方法，要同时跑三个模型，policy（要训的那个）、reward model（打分的）、critic（估值的）。显存账你算一下，一个 7B policy 后面挂 7B critic，光这两个就要你一张 H100 喘半天。

GRPO 直接把 critic 干掉了。

它的 insight 一句话，**别让 critic 去估"这个回答值多少分"，让 policy 自己采样 N 个回答，用这 N 个回答的相对好坏算 advantage**。其实就是组内排名，第一名加分，倒数加倍扣分，中间那几个微调。

这就是 Group Relative Policy Optimization 里 Group 的来历，一组样本，互相比。

DeepSeek 2024 年那篇 DeepSeekMath（arxiv 2402.03300）原话写得很直白，GRPO 是 PPO 的变体，目的是"在提升数学推理能力的同时优化 PPO 的内存使用"。优化内存，对，你没看错，省显存就是它的初心。

## 为什么去掉 critic 反而让推理变强了

这一点是我读 Raschka 文章最大的收获。

直觉上，去掉一个模型，效果应该变差才对，至少持平。但 DeepSeek-R1-Zero 干了一件更狠的事，连 supervised fine-tuning 都不要了，纯 RL + GRPO + RLVR，推理能力居然从零长出来了。

关键在 RLVR（Reinforcement Learning with Verifiable Rewards）。

RLVR 的逻辑是，**别用学来的 reward model 打分，用确定性的验证器**。数学题就用计算器对答案，代码题就用 compiler 跑测试用例，逻辑题就用符号求解器。对就是 1，错就是 0，二值反馈。

Raschka 这句话我贴一下，"DeepSeek-R1 used RLVR with GRPO, which eliminates two expensive models in the training procedure, the reward model and the value model"。

两个昂贵的模型，一次性砍掉。

省下来的算力哪去了？全堆到 policy 自己身上做长链条思考。这就是为什么 DeepSeek R1 的输出动辄上千 token 在那里"等等让我再想想"，因为它训练的时候被允许、甚至被鼓励这么干。

## 我自己想跑一个推理模型，要改哪几行

我去年用 trl 库的 PPOTrainer 微调过一个数学小模型，4090 单卡，7B base，跑完一晚上 loss 没怎么动，最后效果惨不忍睹。看完 Raschka 这篇，我列了下次要改的几件事。

第一，把 PPOTrainer 换成 GRPOTrainer。trl 已经合并了，import 改一行。配置项里 num_generations 这个参数就是 GRPO 的灵魂，**一个 prompt 采样 8 个回答**互相比，比 PPO 那种单样本估值稳得多。

第二，reward function 别再用情绪打分模型了。数学就写个 sympy 检查器，代码就跑 pytest，返回 0 或 1。这一步省掉一个 7B 模型的显存，4090 突然就够用了。

第三，data 不要喂"答案"，要喂"题目+验证脚本"。这是 RLVR 的数据格式革命，训练集变小但每条更值钱。

第四，盯紧 length bias。Raschka 提了 Dr. GRPO 这篇（2025 年 3 月），它指出 GRPO 默认的归一化方式会让模型偏好越来越长的输出，因为长回答在 loss 里被均摊得更舒服。Dr. GRPO 改了归一化项，输出立刻变短一截。如果你不想训出一个废话连篇的模型，这个补丁要打。

第五，预算别给太大。Raschka 引的一个数字让我印象很深，**1.5B 的 DeepSeek-R1-Distill-Qwen，42 美元成本，7000 条样本，AIME24 上跑赢了 o1-preview**。小模型 + 短训练（50 到 100 步）+ 干净数据，比大力出奇迹更划算。

## 一个会得罪人的判断

国内学术圈讲 RL + LLM 推理这个事讲了快一年了，论文一堆，复现 DeepSeek R1 流程能跑通、效果稳定的工作室，我能数出来的不超过三家。

不是技术不行，是大多数人卡在 reward design 上。RLVR 听起来朴素，但要给一个真实业务场景设计出"可验证的 reward"，比写论文难十倍。客服场景怎么验证？文案场景怎么验证？医疗问答怎么验证？这些没有 sympy，没有 pytest。

Raschka 文章里隐含的一个潜台词，我读出来了。**RL for reasoning 这套范式目前只在数学、代码、逻辑这三个有"客观答案"的领域真正 work**。其它领域都是在打补丁，套个 LLM-as-Judge 当 verifier，本质又退回到 reward model，只是换了件马甲。

所以下一个红利是什么？是给非数学场景设计 verifier 的人。这事比训模型本身有壁垒得多。

## 一些我还没想清楚的事

Open-Reasoner-Zero 那篇里的发现挺反直觉，**vanilla PPO 在 1/10 的训练步数下跑赢了 GRPO**。

我一开始读的时候觉得，那 GRPO 不是白搞了？后来想了想，GRPO 的优势可能不在最终效果，在显存占用和工程复杂度。一个能在单卡跑、效果差不多的方案，对独立开发者来说就是天大的优势。

但这也提醒一件事，**别把 GRPO 当银弹**。Raschka 引的第 15 篇论文专门警告，很多 RL 改进在小 benchmark 上的提升根本没有统计学意义。换个种子数可能就翻盘。

写到这我想起开头那个问题，90% 的工程师只听过 PPO。其实听没听过不是关键，关键是有没有亲手跑过一遍 GRPO，看着 reward 曲线慢慢爬起来，看着模型在第 50 步开始学会说"wait, let me reconsider"。

那种瞬间，比读十篇论文都管用。

这周末我准备拿 Qwen2.5-1.5B 复刻一遍 Raschka 提到的最小 pipeline，AIME 那个 42 美元的复现版。跑通了再来跟你们说踩了哪些坑。

## 相关链接
- Raschka 原文，https://magazine.sebastianraschka.com/p/the-state-of-llm-reasoning-model-training
- DeepSeek R1 论文，https://arxiv.org/abs/2501.12948
- GRPO 论文（DeepSeek-Math），https://arxiv.org/abs/2402.03300

---
相关实体:: Sebastian Raschka | [[deepseek|DeepSeek]] | [[openai|OpenAI]]
相关主题:: AI研究 | 强化学习 | 推理模型

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
