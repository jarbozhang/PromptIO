# 3万星、50个模型、全中文，我愿称 Datawhale 这份教程为中文 AI 工程师最该收藏的一本书

昨晚刷 GitHub Trending，看到 datawhalechina/self-llm 今天又涨了 36 颗星，累计 3 万+。

项目的全名叫《开源大模型食用指南》。副标题一行字我来回读了三遍，"针对**中国宝宝**量身打造"。

那一瞬间我就知道这不是普通的教程仓库。

## 先说结论

我认为这是目前中文互联网上，最值得 AI 新手收藏的一份开源教程。没有之一。

理由就一个，它解决了一个所有英文 tutorial 都解决不了的问题，在国内的 Linux 环境里，用国内能跑起来的模型，走一遍从环境到部署到微调到 Agent 的完整链路。

Hugging Face 的官方文档当然也好。但你有没有发现一个事实，HF 上的 notebook 十有八九是围绕 Llama、Mistral 写的，默认你能顺畅访问 huggingface.co，默认你用 A100，默认你英语母语。

这三个默认，任何一条在国内都可能变成劝退点。

## 这本"指南"到底塞了什么

我翻了一遍目录，支持的模型数量是真的离谱。

国产的一整条线，Qwen 3/2.5/2/1.5 全系、GLM-4、InternLM、Baichuan、DeepSeek、DeepSeek-Coder-V2、Qwen2-VL 多模态。国外的 Llama 3.1/Llama 4、Gemma、Phi 也没落下。

加起来 50 多个模型，每个都配了独立的教程目录。

教程内容不是简单的"怎么 pip install"。每个模型下面通常会包含这几块，环境配置、FastAPI 部署、命令行和 WebDemo、LangChain 接入、LoRA 微调、全参数微调。

你没看错，从"怎么把环境装上"到"怎么微调一个自己的模型"，一站式讲完。

代码是 Jupyter Notebook 形式，93% 的代码量都是 ipynb。这个选择非常讨巧，读者可以一行一行跑，不用先消化几百行 Python 脚本。

## 为什么我说它是"中国宝宝专属"

举个具体的细节。

Hugging Face 的 tutorial 里教你微调，第一步一般是 `from datasets import load_dataset`，然后拉一个远程数据集。在国内不挂代理，这一步就卡死。

self-llm 的做法是什么。它默认你用的是 AutoDL、魔搭或者自己的国产服务器，数据集下载走 modelscope，基础镜像给你列清楚，PyTorch 哪个版本、CUDA 哪个版本、transformers 哪个版本，钉死。

甚至还单独出了 AMD GPU、昇腾 NPU、苹果 M 系列 的适配章节。

这种颗粒度，才是"跑得通"的底气。

我自己年初带过一个刚转 AI 的朋友学微调。他照着英文教程跑 Llama 的 LoRA，卡了整整两天，都是环境问题。后来我让他切到 self-llm 里的 Qwen LoRA notebook，当天晚上就跑通了。

这种"少受两天苦"的价值，才是这个仓库最打动我的地方。

## 社区在怎么评价

我翻了翻 GitHub Issues 和知乎。

Issues 区最多的反馈是"某个模型的 LoRA 版本能不能加一下"。Datawhale 的核心 contributor（像 Skypow2012、itcharge、SuperSupeng 这几位）更新速度非常快，Qwen3 刚发布没几天，对应目录就上线了。这种响应速度在开源中文教程里不多见。

知乎上有个高赞回答让我印象很深，大意是"我是 CS 大三的学生，导师让我学 LLM，看了 Andrej Karpathy 的 zero-to-hero 看得想哭，后来朋友推荐 self-llm，我终于知道从哪里开始了"。

B 站也有不少 up 主把 self-llm 的教程录成了跟练视频，弹幕里最高频的一句是"终于有中文的了"。

坦率讲，这就是刚需。

## 它的短板在哪里

我得说点得罪人的。

self-llm 的定位是"食用指南"，不是"原理深挖"。你想通过它理解 Transformer 为什么 work、RoPE 是怎么推导的，它给不了你。

它也不适合已经能独立看英文论文、跑 PyTorch 源码的高阶选手。这部分人更应该看 Karpathy 的视频、读 HF 的源码注释。

self-llm 最精准的受众是，会写 Python、听说过 transformer 但没跑过大模型、想在周末把国产 LLM 跑起来的人。

或者换个更具体的画像，一个二线城市的后端工程师，下班 8 点到家，想在 RTX 4090 上微调一个 Qwen 做自己的内部知识库助手。他需要的不是 Attention 公式推导，是"我 clone 下来就能跑通"的那种踏实。

## 我的行动建议

如果你是新手，从 Qwen2.5 的 LoRA 微调那一节开始。模型小、显存要求低，一台 24G 显存的卡就能跑。跑通之后再往上加难度。

如果你是正在做 RAG 或 Agent 产品的工程师，直接跳到对应章节，抄里面的 LangChain 接入代码。注意它的代码风格偏教学型，上生产前记得自己做一次抽象。

最后留一个问题给大家讨论。

Datawhale 现在有 25.1k 的 GitHub followers，hello-agents、self-llm、happy-llm 三个仓库累计快 10 万星。在 Hugging Face 也好、OpenAI cookbook 也好这些"国际标准"面前，中文开源教程社区正在悄悄长出自己的生态位。

你觉得，再过两年，中国 AI 工程师的入门路径，会不会彻底变成"先 Datawhale、再 HF"？

## 相关链接

- 仓库主页，[github.com/datawhalechina/self-llm](https://github.com/datawhalechina/self-llm)
- Datawhale 组织主页，[github.com/datawhalechina](https://github.com/datawhalechina)
- 推荐配套，[happy-llm](https://github.com/datawhalechina/happy-llm) 学原理，self-llm 学实操
- 算力建议，AutoDL 4090 实例，按小时计费，跑一次 LoRA 大约 3-5 块钱

---
相关实体:: Datawhale | [[deepseek|DeepSeek]]
相关主题:: 开源教程 | 国产AI生态

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
