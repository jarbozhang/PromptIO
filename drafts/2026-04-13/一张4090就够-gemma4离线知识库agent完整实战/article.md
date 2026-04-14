# 一张4090就够-Gemma 4离线知识库Agent完整实战

一个周末，一张4090，1800份文档全部离线可搜。没有API费用，没有隐私焦虑，断网照样用。

这不是概念验证，是一个叫 @PWenzhen76938 的开发者花了一周迭代出来的真实方案，连踩的6个坑都写得明明白白。我照着他的配置跑了一遍，把整个过程和我自己的判断整理出来。

## 为什么是Gemma 4

Google 4月2号发布了 Gemma 4 系列，Apache 2.0 开源，想怎么改怎么改。llama.cpp 作者 ggerganov 当天就发了演示视频，一台三年前的 Mac Studio M2 Ultra 跑 Gemma 4 26B，配合投机解码直接飙到 300 token/s。

3320个赞，评论区炸了。

但速度快只是一方面。真正让 Gemma 4 适合做离线知识库的是三个东西，256K 上下文窗口，原生 function calling，以及 31B 这个尺寸刚好能被一张 4090 的 24GB 显存吃下（Q4_K_M 量化后约 17.4GB）。

说真的，之前想在本地跑一个靠谱的 RAG Agent，要么模型太小回答质量拉胯，要么模型太大显存不够。Gemma 4 31B 刚好卡在那个甜蜜点上。

## 完整配置，一步步来

硬件清单很简单，RTX 4090 24GB + 64GB 内存 + 一块 NVMe SSD。原帖作者的 CPU 是 AMD 7950X，但 CPU 在这套方案里不是瓶颈，不用纠结。

软件栈四件套，Ollama 管模型，LlamaIndex 做 RAG，nomic-embed-text 做本地 embedding，Chroma 做向量存储。

部署流程拆成三步。

第一步，装 Ollama 拉模型。两行命令，`ollama pull gemma4:31b` 拉主模型，`ollama pull nomic-embed-text` 拉 embedding 模型。用的是 Q4_K_M 量化版，速度和质量平衡最好。

第二步，LlamaIndex 搭 RAG 核心。配置 LLM 指向 Ollama 的 Gemma 4，embedding 指向 nomic-embed-text，chunk_size 设 1024，chunk_overlap 设 200。然后用 SimpleDirectoryReader 加载文档目录，支持 PDF、Markdown、TXT、DOCX，建完索引持久化到本地。

第三步，跑 Agent。用 LlamaIndex 的 ReAct Agent 挂两个工具，一个检索知识库，一个把新内容保存回知识库。前端用 Streamlit 5分钟搞定，手机电脑都能访问。

整个部署从零到能用，大概4小时。

## 6个坑，每个都是血泪

这才是这篇帖子最值钱的部分。

**坑1，显存爆炸。** 一上来就开 256K 上下文，直接 OOM。解决方案是强制 `--ctx-size 8192`，KV cache 用 q4_0 量化。256K 是理论上限，实际用 8K 上下文配合 RAG 分块检索完全够用。

**坑2，中文检索不准。** 默认用 bge-large-en 做 embedding，搜中文内容命中率只有 60%。换成 nomic-embed-text 加上 BM25 混合检索，命中率拉到 92%。这个坑很多人会踩，因为大部分教程默认英文 embedding。

**坑3，Agent 幻觉和死循环。** 31B 的模型偶尔还是会自信地编造没写过的东西。靠三个手段压住，system prompt 强制约束，`max_iterations=8` 防止死循环，加一个 self-reflection 步骤让模型自己检查。

**坑4，PDF 解析翻车。** 扫描件和复杂表格直接乱码。最后用 LlamaParse 本地版预处理，先把 PDF 转成干净文本再喂给 RAG。

**坑5，速度慢。** 初始只有 8-12 token/s，体验很差。开启完整 GPU offload（`n-gpu-layers=-1`），最终稳定在 28-35 token/s。不算快，但问答场景完全能接受。

**坑6，增量更新。** 每次加新文件要重建索引。最后写了个定时脚本，每天凌晨自动做增量索引更新。

## 更进一步，手机也能用

ggerganov 展示了另一个玩法。用 Tailscale 把跑模型的电脑和手机组成私有网络，在手机上直接通过 llama.cpp 自带的 WebUI 访问，不需要任何第三方 App。

这条推文 1855 个赞，因为它解决了一个真实痛点，本地模型不等于只能坐在电脑前用。Tailscale 是点对点加密的，数据不经过任何第三方服务器，隐私完全可控。

## 我的判断

我认为 Gemma 4 31B 把"本地 AI Agent"从极客玩具变成了实用工具。

之前做本地 RAG，要么用 7B 模型凑合，回答质量没法看，要么上 70B，得两张卡才能跑。31B + 单卡 4090 这个组合，第一次让普通开发者能在不折腾硬件的前提下，拿到接近商业 API 的 RAG 质量。

但我也不确定这套方案适合所有人。坦率讲，6 个坑里的每一个都需要你有基本的命令行能力和调参耐心。如果你平时不碰终端，这篇文章可能收藏就好。

可能有人会说，直接用 Claude 或 ChatGPT 不香吗？香。但有些场景是云端 API 覆盖不了的，客户合同、投资笔记、医疗记录，这类数据你敢传上去吗？

我认为 2026 年真正有意思的方向不是"本地 vs 云端"的二选一，而是混合架构。敏感数据走本地 Agent，通用问题走云端 API，两条路各跑各的。

## 你的下一步

如果手边有 4090，今晚就能跑起来。从 Ollama 装起，先不管 Agent 和前端，就用 `ollama run gemma4:31b` 对话感受一下模型质量，再决定要不要往 RAG 方向搭。

如果没有 4090 但有 Mac，ggerganov 的 llama.cpp 方案值得试，M2 以上的 Apple Silicon 跑 Gemma 4 26B 体验很好。

一个问题留给你，如果本地 AI 的推理质量继续提升，你会把多少工作流从云端迁回本地？

## 相关链接

- Gemma 4 官方博客: https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/
- llama.cpp（本地推理引擎）: https://github.com/ggerganov/llama.cpp
- Ollama（模型管理工具）: https://ollama.com
- LlamaIndex（RAG 框架）: https://www.llamaindex.ai
- 原帖完整实操记录: https://x.com/PWenzhen76938/status/2043150950161088992
- ggerganov Tailscale 远程推理演示: https://x.com/ggerganov/status/2039804601810001921

---
相关实体:: [[google|Google]] | [[ggerganov|ggerganov]] | [[llama-cpp|llama.cpp]]
相关主题:: [[local-inference|本地推理]] | [[agent-frameworks|Agent框架]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
