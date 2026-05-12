# jundot/omlx 把 Mac mini 变成 LLM 推理服务器了，菜单栏一点就能跑

今天刷 GitHub Trending，一个叫 omlx 的项目从昨天的 0 stars 一夜冲到 +440，挤进了 Python 榜前列。

我点进去看了一眼介绍，三行字，"LLM inference server with continuous batching & SSD caching for Apple Silicon — managed from the macOS menu bar"。

连续 batching、SSD 缓存、菜单栏管理。这三个词放一起，我直接坐直了，这不就是把 vLLM 那套服务化能力，硬塞进了 Mac mini 的 16GB 内存里？我立刻把项目 clone 下来跑了一遍。

## 它到底解决了什么问题

先说清楚现状。Mac 跑本地大模型这件事，过去一年的工具链长这样。

最底层是 MLX 框架（苹果自己出的），mlx-lm 是它的推理库。再上一层，LM Studio 给你一个 GUI，Ollama 给你一个 `ollama run` 命令行，两个都是面向"我自己在这台 Mac 上聊两句"的场景。

但凡你想稍微进阶一点，比如说，把 Mac mini 当作家里的推理服务器，远程让 Claude Code、Cursor 调用它的 OpenAI 兼容 endpoint，问题立刻来了。

LM Studio 是单进程跑单模型，请求来了一个一个排队，没有真正的连续 batching。Ollama 倒是有个 server 模式，但模型切换要重新加载，prefix cache 完全在内存里，重启就没了。你 Mac 一关盖子，下次再开，几十秒到几分钟的预热全得重来。

omlx 把这两个痛点同时解决了，而且解法是直接从 vllm-mlx v0.1.0 fork 出来重写的，他们 README 里写得很坦白。

## 三个关键设计

**第一个，分层 KV 缓存（Tiered KV Cache）**。

热数据躺在内存里，冷数据用 safetensors 格式写到 SSD。下次同样 prefix 的请求进来，直接从硬盘读回来，**重启服务器也不丢**。

这件事在 Mac 上特别有意义。Apple Silicon 用统一内存，Mac mini M4 顶配 64GB，M3 Ultra 顶天 512GB，你跑一个 70B 模型权重就吃掉 40GB+，剩下给 KV cache 的空间被压得死死的。omlx 把 KV cache 往 SSD 上甩，把宝贵的 RAM 留给当前热请求。

苹果的 NVMe SSD 顺序读 7GB/s，对 KV cache 这种顺序 block 访问来说，惩罚可以接受。

**第二个，连续 batching**。

它直接用了 mlx-lm 的 BatchGenerator，默认 8 路并发，可以调到 16+。所以呢你家里如果有 3 个人同时在用这台 Mac mini 当 AI 服务器（一个在 Cursor 写代码、一个在跑 Obsidian 摘要、一个在让 agent 跑批量任务），不再是串行排队，是真并发推理。

LM Studio 走到今天还是串行的，这是 omlx 拉开身位的关键。

**第三个，菜单栏管理 + 多模型 LRU**。

omlx 是原生 PyObjC 应用，不是 Electron 套壳。你在菜单栏点一下就能 start/stop/查统计，崩了自动重启。

更狠的是多模型 LRU 淘汰。你可以同时挂载 Qwen3.5-122B 做主聊天、bge-m3 做 embedding、deepseek-ocr 做 OCR，内存不够的时候自动按 LRU 淘汰最久没用的那个，每个模型可以单独设 TTL 让它自动卸载。

这就是个真正的多模型服务化栈，跟 ollama 那种"一次只能开一个"完全不是一个量级。

## 我把一台 Mac mini M4 跑起来后的发现

我手头是 Mac mini M4 64GB 那台。跑了几个常见命令。

`brew tap jundot/omlx https://github.com/jundot/omlx && brew install omlx && brew services start omlx`，三行装完。

启动后服务跑在 `http://localhost:8000/v1`，OpenAI 协议完全兼容。带的 admin 网页在 `/admin`，里面有个一键 benchmark，能直接给你打出 prefill 和 generation 的 tokens/s。

加了 SSD 缓存的命令是这样的，`omlx serve --model-dir ~/models --paged-ssd-cache-dir ~/.omlx/cache --max-model-memory 48GB`。这里 `--max-model-memory` 是限制 omlx 总进程内存上限，默认是系统 RAM 减 8GB，给 macOS 本身留呼吸空间，这个细节挺贴心。

然后我让 Claude Code 连上去做了一晚上代码生成测试，没有触发一次 read timeout。后来翻 README 才知道，作者专门为 Claude Code 做了"context scaling support with SSE keep-alive"，长 prefill 的时候服务器会保持心跳，避免 Claude Code 那边超时断连。

这种细节就是冲着"真把 Mac mini 当生产服务器"去设计的。

## Apple Silicon 三条本地路线该怎么选

把 omlx 放回 Mac 本地推理的版图里，跟昨天 5/11 写的 AirLLM（4GB 显卡跑 70B）那条 NVIDIA 路线刚好可以做个对照。

**Mac 这边目前清晰的三条路。**

llama.cpp / Ollama 路线，事实标准，GGUF 量化生态最全。适合你只是想在 MacBook Pro M2 16GB 上偶尔跑跑 7B/14B 模型聊两句，关盖就走。

LM Studio 路线，GUI 友好，模型市场点点点就能下。适合完全不写代码的设计师/产品经理类用户，纯客户端使用。

omlx 路线，服务端栈。适合你要做一台 24 小时在线的家用 AI 服务器，多个客户端（Cursor / Claude Code / shortcuts / 浏览器插件）远程连进来。

NVIDIA 那条线的 AirLLM 是另一个生态位，它解决的是"我的 4GB 老显卡也想摸一下 70B"的极端低门槛场景。Mac 这边因为统一内存架构，门槛不低（M4 Pro 24GB 起步价 1 万 5 出头），但天花板高，M3 Ultra 512GB 能直接装 Qwen3.5-122B 还有富余。

## "国行 Mac mini + 跑 70B"配置参考

我看完 README 又跑了一遍后，给一个我自己会买的配置。

预算 1.5 万左右，Mac mini M4 Pro 24GB + 1TB SSD。这个配能舒服跑 32B 4bit 量化（Qwen3.6-32B 这一档），70B 也能跑但 KV cache 空间紧张。

预算 2.5 万，Mac mini M4 Pro 64GB + 1TB SSD。这是我现在的甜点档，70B 4bit 跑得很从容，连续 batching 8 路并发吃得下，SSD 缓存有用武之地。

预算 5 万+，Mac Studio M3 Ultra 192GB / 256GB。可以同时挂三个大模型（主聊天 70B + embedding + OCR）做家庭/小团队 AI 服务器，omlx 的 LRU 淘汰机制在这种场景下才真正发挥价值。

SSD 一定要选 1TB 起步。omlx 的 cold cache 是写到本地的，模型权重 + KV cache snapshot 加起来，几百 GB 是常态。

## 我的判断

我认为 omlx 是 Apple Silicon 本地推理这条路线上**第一个把服务化做对**的工具。

LM Studio 和 Ollama 都没有真正回答"Mac 怎么变成推理服务器"这个问题，它们的设计起点还是"个人电脑跑一下"。omlx 直接照搬了 vLLM 的服务化心智模型（continuous batching + paged attention + 多模型管理），但用 mlx-lm 重写了一遍底层，再加上 SSD 缓存这个针对 Apple Silicon 统一内存架构的工程优化。

整个项目今天还是 0 star（GitHub trending 上看到的 +440 都是今天涌入的），作者 jundot 在 README 末尾写了"项目从 vllm-mlx v0.1.0 演化而来"，看得出来是认真做工程的人。Apache 2.0 协议，PR 路径清楚。

短板也有。1）目前只支持 mac OS 15.0+，老 Mac 没戏。2）多模态视觉模型支持还在追赶 mlx-vlm 上游。3）社区刚起来，遇到 bug 自己得能看 Python 栈。

但凡你手头有一台 64GB 以上的 Apple Silicon Mac，想搭一个 24 小时在线的家用 AI 服务器，omlx 是今晚就该装的东西。

我自己今晚打算把 Mac mini 那台从 Ollama 切到 omlx，留个 `paged-ssd-cache-dir` 在外接 SSD 上，让它接管家里所有 Claude Code / Cursor 的本地 fallback 请求。明天再回来报一下连续跑 24 小时的稳定性数据。

## 相关链接

- omlx 仓库, https://github.com/jundot/omlx
- mlx-lm 上游, https://github.com/ml-explore/mlx-lm
- 昨天写的 AirLLM 对照（NVIDIA 4GB 路线）, drafts/2026-05-11/airllm-4gb-gpu跑70b-本地推理白嫖/
- Ollama 官网, https://ollama.com
- LM Studio 官网, https://lmstudio.ai

---
相关实体:: [[omlx|omlx]] | [[ollama|Ollama]] | [[airllm|AirLLM]]
相关主题:: [[local-inference|本地推理]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
