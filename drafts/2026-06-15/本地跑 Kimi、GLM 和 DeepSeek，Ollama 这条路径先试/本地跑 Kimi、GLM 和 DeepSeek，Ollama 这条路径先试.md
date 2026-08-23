---
title: 本地跑 Kimi、GLM 和 DeepSeek，Ollama 这条路径先试
status: draft
date: '2026-06-15'
source: manual
source_url: https://github.com/ollama/ollama
angle: 把文章写成中文读者的本地模型启动清单：先确认机器条件，再用 Ollama 跑 Kimi、GLM、DeepSeek、Qwen 等模型，最后给出适合写作、代码和知识库问答的选择建议。
voice: first-person
reach: 9
tags:
  - Ollama
  - 本地模型
  - DeepSeek
  - Qwen
  - AI工程
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 本地跑 Kimi、GLM 和 DeepSeek，Ollama 这条路径先试
wechat_title: ''
cover:
  status: skipped
reach_note: Ollama、Kimi、DeepSeek 等高认知品牌 + 本地运行省试错成本 + 命令行可直接尝试。
selection_reason: 本地模型是强实操主题，品牌和动作都明确，公众号能做教程，小红书能做“几分钟跑起来”的笔记。
---

# 本地跑 Kimi、GLM 和 DeepSeek，Ollama 这条路径先试

想在自己电脑上跑 Kimi-K2.6、DeepSeek、Qwen，不要先追模型名。先确认机器能不能扛，再选一条能复现的入口。Ollama 现在值得被重新放回本地模型启动清单里。

它的价值不是神奇，而是把很多开源和开放权重模型放到同一个启动方式里。GitHub 仓库简介已经把 Kimi-K2.6、GLM-5.1、MiniMax、DeepSeek、gpt-oss、Qwen、Gemma 都放在同一行，仓库也有 17 万以上 Star。对中文读者来说，这比收藏一堆零散模型页更省心。

第一轮验证可以很明确。装好 Ollama，跑一个小模型确认本机环境，再按写作、代码、知识库问答三个场景换模型。别一上来拉最大的参数，很多人的坑从这里开始。

这版更适合作为启动清单，而不是速度榜或模型排行。本文为 AI 辅助整理，关键事实已按 Ollama 仓库和官方文档核对，重点是先少踩几种常见空转。

## 先看你适不适合本地跑

如果你只是偶尔问两句话，本地模型未必是最省事的方案。Ollama 适合三类人。

一类是做 AI 应用的工程师，想把模型入口固定在本机或内网机器上，方便接应用、脚本、RAG 和 coding agent。一类是写作者和产品人，想把草稿、资料摘要、内部文档问答尽量放在自己可控的环境里。还有一类是模型爱好者，想快速横向试 Kimi、GLM、DeepSeek、Qwen、Gemma 这些名字背后的差异。

真正要先看的不是模型名，是机器条件。Ollama 文档写得很直接，macOS、Windows、Linux 都可用，Apple 设备走 Metal，Nvidia GPU 需要 compute capability 5.0 以上和对应驱动，AMD 侧 Linux 要看 ROCm v7。你不必一开始记完整表，但要先确认自己是哪类设备。

我的建议很保守。第一次只验证三件事，能安装，能 `ollama run`，能 `ollama ls` 看到模型。只要这三步没问题，再谈 Kimi-K2.6 或 GLM-5.1。环境没跑通时追新模型，基本是在给自己加噪音。

## 怎么开始最稳

Mac 和 Linux 可以按官方 README 走 `curl -fsSL https://ollama.com/install.sh | sh`，Windows 走 `irm https://ollama.com/install.ps1 | iex`。不想用命令安装，就走官方下载页。

装完以后，在终端输入 `ollama` 会进入交互菜单。官方 quickstart 里提到，这个菜单可以直接运行模型，也可以启动 Claude Code、Codex、OpenClaw 等集成。你也可以不用菜单，直接用 `ollama run gemma4` 这种形式跑一个模型。

我会把第一轮测试拆得很小。先用 Gemma 或 Qwen 这类常见条目验证对话能不能跑，再用 `ollama pull` 单独下载目标模型。模型列表以 Ollama Library 为准，因为同一个家族会有不同尺寸、不同能力标签，像 thinking、tools、vision、embedding 这些标签会直接影响你后面怎么接应用。

这里别偷懒。看模型页时至少扫三项，参数规模、能力标签、更新时间。比如 DeepSeek-R1 在模型库里属于 reasoning 方向，Qwen3-Coder 是 coding 和 agentic coding 方向，GLM-5.1 页面强调 agentic engineering 和 coding。选错方向，不是模型不行，是你把任务交错了人。

## 写作、代码和知识库怎么选

写作场景，我会先选通用对话和长文本更顺手的模型，不急着上代码专用模型。目标不是一次生成完美文章，而是让它帮你改提纲、压缩资料、改语气。Ollama 的好处是同一套命令能换模型，你可以把同一段中文材料扔给 Qwen、Gemma、Kimi-K2.6，观察哪个更稳。

代码场景，我会优先看模型库里明确带 coding、tools、agentic 字样的条目。GLM-5.1、Qwen3-Coder、DeepSeek 系列都在这个范围内。这里不要只问它写一个函数，最好拿真实仓库里的小任务测试，比如解释一个文件、找一个 bug、改一个测试失败点。

知识库问答场景，不要只盯聊天模型。Ollama CLI 支持生成 embeddings，官方示例里有 `embeddinggemma` 和 `nomic-embed-text`。如果你要做 RAG，聊天模型只是回答层，embedding 模型和文档切分才是底座。README 的社区集成里也列了 ChatOllama、Ollama RAG Chatbot、AnythingLLM 这类入口，适合不想从零搭界面的读者。

## 坑点从机器和预期开始

第一个坑是把本地模型当成万能替代品。它更像一个可控的工作台，适合反复试 prompt、接本地应用、处理不想四处复制的资料。它不自动保证更快，也不自动保证回答更好。

第二个坑是忽略模型大小。模型库里有 1B、7B、32B、70B，甚至更大的条目。机器资源一般时，先从小尺寸开始，看到速度、内存和回答质量的边界，再往上加。一次拉太大，下载慢、启动慢、体验断裂，热情很容易被耗掉。

第三个坑是只在聊天窗口里试。Ollama 更值得用的地方，是它有 REST API，也有 Python 和 JavaScript 库。你能把同一个本地模型接到脚本、编辑器、RAG 页面和 coding 工具里。能被接进流程，才算真的开始用。

## 用三格测试替代模型收藏

别把这事做成模型收藏夹。先做一个三格测试。

第一格，写作。准备一段你自己的草稿，让模型改成更短、更清楚、更适合发布的版本。

第二格，代码。挑一个你熟悉的小仓库，让模型解释一个文件，再让它给出一个很小的修改建议。

第三格，知识库。选 3 个文档，用一个支持 Ollama 的 RAG 工具接起来，看看它能不能准确引用资料回答问题。

跑完这三格，你会比看十篇模型发布更清楚自己需要什么。Ollama 这次真正值得关注的地方，不是又多了几个名字，而是给中文读者留了一条能马上验证的本地入口。

## 相关链接

- Ollama GitHub 仓库
  https://github.com/ollama/ollama
- Ollama 快速开始
  https://docs.ollama.com/quickstart
- Ollama 模型库
  https://ollama.com/library
- Ollama CLI 参考
  https://docs.ollama.com/cli
- Ollama 硬件支持
  https://docs.ollama.com/gpu

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
