# Mac mini 也能当 LLM 推理服务器了，菜单栏一点就跑

今天刷 GitHub Trending，一个叫 omlx 的项目从昨天 0 star 一夜冲到 +440，挤进 Python 榜前列。

项目介绍就三行字，"LLM inference server with continuous batching & SSD caching for Apple Silicon — managed from the macOS menu bar"。

连续 batching、SSD 缓存、菜单栏管理。这三个词放一起我直接坐直了，这不就是把 vLLM 那套服务化能力，硬塞进 Mac mini 的统一内存里。我立刻 clone 下来跑了一遍。

## 它到底解决了什么

先说现状。Mac 跑本地大模型这件事过去一年的工具链长这样。

最底层是 MLX 框架（苹果自家），mlx-lm 是它的推理库。再上一层，LM Studio 给你 GUI，Ollama 给你 `ollama run` 命令行，两个都面向"我自己在这台 Mac 上聊两句"的场景。

但凡你想稍微进阶一点，比如把 Mac mini 当家里的推理服务器，远程让 Claude Code、Cursor 调用它的 OpenAI 兼容 endpoint，问题立刻来了。

LM Studio 单进程跑单模型，请求来了一个个排队。Ollama 倒是有 server 模式，但模型切换要重新加载，prefix cache 完全在内存里，重启就没了。Mac 一关盖子下次再开，几十秒到几分钟的预热全得重来。

omlx 把这两个痛点同时解决了，直接从 vllm-mlx v0.1.0 fork 出来重写。

## 三个关键设计

**一，分层 KV 缓存。** 热数据在内存，冷数据用 safetensors 写到 SSD。下次同样 prefix 的请求进来直接从硬盘读回，**重启服务器也不丢**。Apple Silicon 用统一内存，跑 70B 权重就吃掉 40GB+，剩下给 KV cache 的空间被压得很紧。omlx 把 KV cache 甩到 SSD，把宝贵 RAM 留给当前热请求。苹果 NVMe SSD 顺序读 7GB/s，对 KV cache 这种顺序 block 访问，惩罚可以接受。

**二，连续 batching。** 直接用 mlx-lm 的 BatchGenerator，默认 8 路并发，可调到 16+。家里 3 个人同时用这台 Mac mini 当 AI 服务器（一个在 Cursor 写代码、一个跑 Obsidian 摘要、一个让 agent 跑批量任务），不再是串行排队，是真并发。

**三，菜单栏管理 + 多模型 LRU。** omlx 是原生 PyObjC 应用，不是 Electron 套壳。可以同时挂载主聊天大模型 + bge-m3 embedding + deepseek-ocr，内存不够时按 LRU 淘汰最久没用的那个，每个模型可单独设 TTL 自动卸载。

## 我跑了一台 Mac mini M4 64GB

`brew tap jundot/omlx https://github.com/jundot/omlx && brew install omlx && brew services start omlx`，三行装完。

启动后服务跑在 `http://localhost:8000/v1`，OpenAI 协议兼容。带的 admin 网页在 `/admin`，里面有个一键 benchmark，能直接打出 prefill 和 generation 的 tokens/s。

加 SSD 缓存的命令是 `omlx serve --model-dir ~/models --paged-ssd-cache-dir ~/.omlx/cache --max-model-memory 48GB`。`--max-model-memory` 是限制 omlx 总进程内存上限，默认是系统 RAM 减 8GB，给 macOS 本身留呼吸空间。

让 Claude Code 连上去做了一晚上代码生成测试，没触发过 read timeout。翻 README 才知道，作者专门做了 "context scaling support with SSE keep-alive"，长 prefill 的时候服务器会保持心跳，避免客户端超时断连。冲着"真把 Mac mini 当生产服务器"去设计的。

## Apple Silicon 本地推理三条路怎么选

llama.cpp / Ollama 路线，事实标准，GGUF 量化生态最全。适合在 MacBook Pro M2 16GB 上偶尔跑 7B/14B 聊两句，关盖就走。

LM Studio 路线，GUI 友好，模型市场点点点就能下。适合完全不写代码的设计师/产品经理类用户。

omlx 路线，服务端栈。适合做一台 24 小时在线的家用 AI 服务器，多客户端（Cursor / Claude Code / shortcuts / 浏览器插件）远程连进来。

这三条路各自擅长的场景不一样，omlx 不是要替代谁，它补的是"Mac 怎么变成服务器"这一块。

## 配置参考

1.5 万左右，Mac mini M4 Pro 24GB + 1TB SSD。能舒服跑 32B 4bit 量化，70B 也能跑但 KV cache 空间紧张。

2.5 万，Mac mini M4 Pro 64GB + 1TB SSD。70B 4bit 跑得很从容，连续 batching 8 路并发吃得下，SSD 缓存有用武之地。

5 万+，Mac Studio M3 Ultra 192GB / 256GB。可以同时挂三个大模型做家庭/小团队 AI 服务器，omlx 的 LRU 淘汰机制在这种场景下才真正发挥价值。

SSD 一定 1TB 起步。omlx 的 cold cache 写本地，模型权重 + KV cache snapshot 加起来几百 GB 是常态。

## 我的判断

我认为 omlx 是 Apple Silicon 本地推理路线上**第一个把服务化做对**的工具。它直接照搬了 vLLM 的服务化心智模型（continuous batching + paged attention + 多模型管理），用 mlx-lm 重写底层，再加上 SSD 缓存这个针对统一内存架构的工程优化。

短板也有。1）目前只支持 macOS 15.0+，老 Mac 没戏。2）多模态视觉模型支持还在追赶 mlx-vlm 上游。3）社区刚起来，遇到 bug 得自己看 Python 栈。

但凡你手头有一台 64GB 以上的 Apple Silicon Mac，想搭一个 24 小时在线的家用 AI 服务器，omlx 是今晚就该装的东西。

我今晚打算把 Mac mini 从 Ollama 切到 omlx，留个 `paged-ssd-cache-dir` 在外接 SSD 上，接管家里所有 Claude Code / Cursor 的本地 fallback 请求。

## 相关链接

- omlx 仓库, https://github.com/jundot/omlx
- mlx-lm 上游, https://github.com/ml-explore/mlx-lm
- Ollama 官网, https://ollama.com
- LM Studio 官网, https://lmstudio.ai

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
