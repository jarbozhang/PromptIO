# 从零学大模型，国内中文教程已经有四条路，今天上 trending 的《动手学大模型》该怎么选

今早翻 GitHub Trending，看到一个项目单日 +422 stars，名字叫《动手学大模型 Dive into LLMs》，仓库 `Lordog/dive-into-llms`。

点进去看，是上海交通大学张倬胜老师团队和新加坡国立大学合作的中文教程，已经攒到 37.6k stars，今天又被算法推上来一波。

我有点意外的是，11 个章节里有 5 章在讲安全攻防（越狱、水印、隐写、模型安全、Agent 安全），跟 datawhale 那几个教程（self-llm、happy-llm、hello-agents）走的是完全不同的路线。

所以我把现在国内能找到的几个主流中文大模型教程梳理一遍，给想从零开始学的朋友一份对照路线图。

## 四个教程各自适合谁

**Dive into LLMs**，上交大 + 新国立，37.6k stars。前 4 章讲微调、提示工程、知识编辑，后 7 章一半讲安全，一半讲多模态和 GUI Agent。是这四个里唯一带学术安全研究底色的。

**self-llm 开源大模型食用指南**，Datawhale，30.4k stars。专讲在 Linux 环境下部署、使用、微调 50+ 个开源模型，Qwen、ChatGLM、InternLM、DeepSeek 全覆盖，还给昇腾 NPU 和 AMD GPU 开了专区，工程导向最强。

**happy-llm 大模型原理与实践教程**，Datawhale，30.2k stars。第二章手把手实现 Transformer，第五章带你用 PyTorch 从零搭一个 LLaMA2 跑预训练 + SFT。是唯一让你"从零搭一个"的。

**hello-agents**，Datawhale，47.9k stars。专讲怎么基于大模型构建 Agent，覆盖 ReAct/Plan-and-Solve/Reflection 经典范式，到 MCP/A2A 协议和 Agentic RL。最贴近就业市场需求。

## 按起点选路线

**完全零基础**，别上来读 happy-llm。先去 self-llm 找一个 Qwen2.5-7B 跑通"装环境 → 下权重 → 起 API → 调一次接口"，再回头读 happy-llm 第一二章。

**有 Python 基础想入门 LLM 原理**，主路线是 happy-llm 全本，平行参考 self-llm 做工程实践。读到第五章你会自己用 PyTorch 跑一遍预训练 + SFT，之后看任何论文都知道"pre-training + SFT + RLHF"三段式在干什么。

**想往 Agent 方向走**，主路线 hello-agents，dive-into-llms 第 9、10 章补 GUI Agent 视角。hello-agents 里 MCP/A2A/ANP 协议那章尤其值得看，2026 年是 Agent 协议战的关键期。

**想做安全方向**，只能选 dive-into-llms，第 3、5、6、7、10、11 章合起来就是一份大模型安全研究入门 syllabus。

## 几个坑提前讲

HuggingFace 下载在国内大概率超时，用 hf-mirror.com 或 modelscope 魔搭社区，self-llm 在这点上做得最好。

happy-llm 第五章"从零训练 LLaMA2"，要真训完至少需要一张 24GB 显存的卡。笔记本集显的话，把训练降级成"读懂代码 + 加载预训练权重做推理"，学习目标达成度 80%。

hello-agents 里大量例子调用 GPT-4 或 Claude，国内可用替代是 DeepSeek API（便宜质量也够）、本地起 Qwen2.5-32B，或者 OpenRouter 薅免费模型额度。

## 我的判断

这四个教程合起来构成了中文 LLM 学习的事实标准，做出了"国产模型生态适配"这个独特优势。

下一个 12 个月想入门大模型，最高效的路径就是这四个仓库。它们用中文写，用国产模型举例，用国内能跑通的环境配置。

具体执行建议，今天就想开始的话，先 clone hello-agents 跑通第一个 ReAct demo，半天时间。跑通之后你会知道大模型 Agent 不是魔法，是 prompt 工程 + 工具调用 + 循环控制。这个起点比从 Transformer 数学公式开始友好得多。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✗ 利益点✓ 可操作✓ -->
