# M 系 Mac 上跑本地模型，引擎层正在被换掉

5 月 5 日 GitHub Trending 上有个新仓库一天涨了 200 星，叫 Rapid-MLX，仓库简介一句话，Apple Silicon 上最快的本地 AI 引擎，比 Ollama 快 4.2 倍，cached TTFT 0.08 秒。

这件事的看点不在"又一个推理工具"。最近一周本地推理的话题已经被 Gemma 4 / Qwen3.5 / DeepSeek V4 Flash 几条线灌饱和，大家讨论的全是模型层面。Rapid-MLX 的角度是另一层，同一台 M3 Ultra、同一个权重，换个引擎，decode 吞吐能差 2 到 4 倍。

这是 M 系 Mac 用户最容易忽略的一层。

## 4.2 倍是什么场景

先把 4.2x 这个数字钉死，避免误读。

按 Rapid-MLX README 给的 benchmark，测试机是 Mac Studio M3 Ultra 256GB，对照组是 Ollama v0.20.4，指标是 decode 阶段的 tokens/s。

具体几条数据，

- Qwen3.5-9B，Rapid-MLX 108 tok/s，Ollama 41 tok/s，2.6 倍
- Phi-4 Mini 14B，180 tok/s vs 56 tok/s，3.2 倍
- 在 Nemotron-Nano 30B 这种模型上拉到了 141 tok/s

4.2x 是头部模型上的最好成绩，不是平均值。Ollama 在小模型上差距更小，到 30B 以上的稠密模型差距才拉开。

prefill 这边另算，README 给的 0.08s cached TTFT 走的是另一条路径，叫 RNN state snapshots。Qwen3.5 DeltaNet 这类混合 RNN 架构，系统提示词处理一次之后整个 RNN 状态做深拷贝，下次同一个系统提示词进来直接还原，0.1ms 量级。普通 transformer 走 KV cache 修剪，命中前缀就跳过 re-prefill。

引擎层一旦把 cache 这件事做透，2-5 倍 TTFT 差距是常态。

## 跟 Ollama / llama.cpp / mlx-lm 的差异

Ollama 底层是 llama.cpp，C++ 实现，跨平台，Apple Silicon 走 Metal backend 但不是原生 MLX。mlx-lm 是 Apple 官方的 MLX 模型库，纯 Python，跑模型方便但不是 OpenAI 兼容服务，工程化弱。

Rapid-MLX 的取舍是另一种，

- 只做 Apple Silicon，放弃跨平台，换原生 Metal compute kernel
- 服务层做完整，OpenAI 兼容 endpoint、tool calling 解析、prompt cache、reasoning 分离全部内置
- 大上下文请求可以 fallback 到云端模型

这三条决定了它的位置，不是给所有人用的 Ollama 替代，是给 Mac 用户、特别是 Mac Studio / M3 Ultra 这种重度本地推理用户的引擎升级。

跨平台需求强的继续 Ollama，纯研究用 mlx-lm，要在 Mac 上挂工具链跑 agent 选 Rapid-MLX。

## 上手命令

安装一行，

```
brew install raullenchai/rapid-mlx/rapid-mlx
```

启动一个模型，

```
rapid-mlx serve qwen3.5-4b
```

第一次跑会下权重大概 2.5GB，下完看到 `Ready: http://localhost:8000/v1` 就起来了。

接 Claude Code，把环境变量改一下就行，

```
OPENAI_BASE_URL=http://localhost:8000/v1 claude
```

Cursor 在 Settings → Models 里加一个自定义 model，base url 填 `http://localhost:8000/v1`，API Key 随便填，model 名写 `default`。

Aider，

```
aider --openai-api-base http://localhost:8000/v1 --openai-api-key not-needed
```

这就是所谓 drop-in OpenAI replacement 的全部含义。任何按 OpenAI Chat Completions 协议写的客户端，base url 一改就走本地，不需要改代码。

## 17 个 tool parser 是怎么回事

工具调用这块是另一个不太被注意到的差异。

不同模型家族的 tool calling 格式不一样，Qwen3.5 用 hermes 格式，Qwen3.6 用 qwen3_coder_xml，DeepSeek V3.1 用自己的 deepseek_v31 格式，Llama 走标准 JSON。Rapid-MLX 内置 17 个 parser，按模型自动识别，不需要手动配。

更关键的是 4-bit 量化模型多轮工具调用之后容易输出格式破损，Rapid-MLX 会检测到破损的文本格式工具调用，再转回结构化的 `tool_calls` 字段。这件事在 Cursor agent 模式下特别明显，跑长了原本会断，加这层兜底之后能撑住。

reasoning 分离也类似，Qwen3、DeepSeek-R1、MiniMax 这些有思维链的模型，输出会分到 `reasoning_content` 字段而不是混在 `content` 里，前端不用自己写正则切。

## 社区在讨论的另一条信号

r/mlxcommunity 这个 subreddit 4 月底刚成立，背景是 MLX 用户散落在各处没有集中的讨论场。同一时间 r/LocalLLaMA 有人发帖，Ollama 自己开始正经接 MLX backend，标题是 Ollama + MLX changed how Apple Silicon feels for local LLMs。

两件事拼在一起说明一个趋势，Apple Silicon 的本地推理生态从"Ollama 一家通吃"在分裂，MLX 原生引擎在抢服务层这块。

DFlash 那边 4 月也开源了 MLX 版本的 speculative decoding，Qwen3.5-9B 上做到 4.1 倍。引擎优化的空间在 Apple Silicon 上还远没到顶。

## 我的判断

Rapid-MLX 的 4.2x 是真的，但要分清楚条件，M3 Ultra、特定模型、decode 阶段。普通 M2 Pro 16GB 跑 Qwen3.5-4B 这种小模型，跟 Ollama 差距不会有这么夸张。这不是缺点，是技术现实，cache 优化和 Metal 原生在大模型上才显出来。

更它的工程完成度。tool calling 兜底、reasoning 字段分离、cloud routing fallback，这些都是把本地引擎从"能跑模型"推向"能挂 agent 工作流"的具体功课。Cursor / Claude Code / Aider 这些靠 tool call 跑的客户端接本地模型最容易卡在量化破损那一步，Rapid-MLX 把这层踩平了。

下一步动作。手头有 M2 Pro 以上 Mac 的，今天就可以 brew 装一遍，跑 `rapid-mlx serve qwen3.5-9b`，把 Cursor 的 OpenAI base url 改成 localhost:8000，写半天代码看看体感。M1/M2 8GB 不用试，先选 4B 模型再说。Mac Studio 用户值得专门跑一遍 README 里那张 benchmark 表，自己核对数字。

## 相关链接

- Rapid-MLX 仓库 https://github.com/raullenchai/Rapid-MLX
- Apple MLX 框架 https://github.com/ml-explore/mlx
- DFlash speculative decoding（MLX 版） https://www.reddit.com/r/LocalLLaMA/comments/1skesyq/
- r/mlxcommunity https://www.reddit.com/r/mlxcommunity/

---

实体 [[apple|Apple]] [[ollama|ollama]] [[rapid-mlx|Rapid-MLX]] [[mlx|MLX]]
主题 [[local-inference|本地推理]] [[ai-pricing|AI 定价]] [[ai-coding-tools|AI 编程工具]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
<!-- xhs_pass: true -->
