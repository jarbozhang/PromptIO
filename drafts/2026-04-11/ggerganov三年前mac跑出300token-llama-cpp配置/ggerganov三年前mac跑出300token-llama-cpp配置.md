300 token/s。

不是什么 H100 集群，不是云端 API，是 ggerganov 拿一台三年前的 Mac Studio M2 Ultra，跑 Gemma 4 26B，实打实的本地推理速度。

我看到这个数字的时候愣了几秒。三年前的消费级硬件，跑一个 26B 参数的模型，每秒 300 个 token，这比大多数人调 API 的体感还快。

## 这个配置到底怎么搞的

ggerganov 的演示视频里信息密度很高，我把关键细节拆开来说。

模型用的是 Gemma 4 26B A4B，Q8_0 量化。注意这里的 A4B，意思是虽然总参数量 26B，但每次推理只激活 4B 参数。这是 Mixture of Experts (MoE) 架构的优势，激活参数少意味着计算量小，速度自然就上去了。

Q8_0 是 8-bit 量化，在 llama.cpp 的量化方案里算"满血"级别，精度损失极小。不是那种为了速度牺牲质量的 4-bit 压缩。

速度的另一个关键是 prompt speculative decoding（提示投机解码）。简单说就是用一个小模型先猜一串 token，大模型再一次性验证，猜对的就直接用。猜中率高的话，吞吐量能翻好几倍。

这不是什么黑科技，但 llama.cpp 把它做成了开箱即用的配置项，不需要你自己折腾两个模型的协调逻辑。

## 不只是跑得快

让我真正觉得有意思的不是速度本身，是 ggerganov 展示的那个完整工作流。

llama.cpp 现在自带 WebUI。不需要装 Open WebUI，不需要配 Ollama，编译完直接 `llama-server` 启动就有一个聊天界面。

更狠的是 MCP 支持。演示里直接挂了 web-search、HuggingFace、GitHub 这些工具，模型可以边聊边搜索、边查代码仓库。一个本地跑的 26B 模型，加上工具调用，基本就是一个离线版的 AI 助手了。

我自己也还在摸索 MCP 这块的配置细节，但方向已经很清楚了，llama.cpp 不再只是一个"跑模型的引擎"，它在变成一个完整的本地 AI 平台。

## 为什么 Gemma 4 是这个故事的主角

Google DeepMind 发布 Gemma 4 的时候说了一句话，"outperforming models 10x its size"。一周之内下载量突破一千万。

ggerganov 在发布当天就推了 llama.cpp 的 Day-0 支持，HuggingFace 侧的适配主要是 Son 完成的。坦率讲，这种开源社区和大厂模型的配合速度，放在两年前是不可想象的。

Gemma 4 的 MoE 架构对本地部署特别友好，26B 总参数、4B 激活参数，Q8_0 量化后整个模型大概 28GB 左右，M2 Ultra 的 192GB 统一内存吃得下，而且还有大量余量给 KV Cache（键值缓存）。

这也是为什么 ggerganov 能跑到 300 t/s。不是硬件多强，是模型架构和推理框架配合得刚好。

## 我的判断

我认为本地 AI 的可用性已经跨过了一个关键门槛。

三年前买的 Mac，不需要任何云服务，不需要 API key，跑出来的效果已经能覆盖大多数日常场景。写代码、搜资料、改文档，300 t/s 的速度意味着几乎没有等待感。

可能有人会说，这只是 Mac 生态的优势，M 系列芯片的统一内存架构天然适合大模型推理。没错，但这恰恰说明了一件事，选对硬件+选对框架+选对模型，三者配合的效果是乘法不是加法。

说真的，如果你有一台 M 系列 Mac，现在不试试 llama.cpp + Gemma 4 这个组合，属于白放着算力不用。

## 动手试试

如果你想复现这个配置，最核心的几步。

从 llama.cpp 的 GitHub 仓库拉最新代码，Metal 后端编译。模型去 HuggingFace 下载 Gemma 4 26B 的 GGUF 格式文件，选 Q8_0 量化版本。启动的时候加上 speculative decoding 相关参数，具体 flag 可以看仓库 README。

WebUI 和 MCP 都是 `llama-server` 的内置功能，启动时带上对应的配置文件就行。

一个开放问题留给大家，当本地推理的速度和质量都够用了，你还会为什么场景继续付费用云端 API？

## 相关链接

- [llama.cpp GitHub 仓库](https://github.com/ggerganov/llama.cpp)
- [ggerganov 演示推文](https://x.com/ggerganov/status/2039752638384709661)
- [Gemma 4 模型页面 (HuggingFace)](https://huggingface.co/google/gemma-4-27b-it)

---
相关实体:: [[ggerganov|Ggerganov]] | [[llama-cpp|llama.cpp]] | [[google|Google]]
相关主题:: [[local-inference|本地推理]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
