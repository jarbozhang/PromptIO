# Mac 本地推理多了一个新选择，Rapid-MLX 在 M3 Ultra 上跑出 4.2x 性能

5 月 5 日 GitHub Trending 上有个新仓库一天涨了 200 星，叫 Rapid-MLX。仓库定位是 Apple Silicon 上的本地 AI 引擎，README 给出的对比是 M3 Ultra、特定模型的 decode 阶段做到了对照基线 4.2 倍。

最近一周本地推理话题被 Gemma 4 / Qwen3.5 / DeepSeek V4 Flash 几条线灌饱和，大家讨论的全是模型层面。Rapid-MLX 提醒了另一层，同一台 Mac、同一个权重，换个引擎，吞吐就能差出几倍。这是 M 系 Mac 用户最容易忽略的一层。

## 4.2x 是什么场景

先把数字钉死，避免误读。

测试机 Mac Studio M3 Ultra 256GB，对照组 Ollama v0.20.4，指标是 decode 阶段的 tokens/s。

- Qwen3.5-9B，Rapid-MLX 108 tok/s，对照组 41 tok/s
- Phi-4 Mini 14B，180 tok/s vs 56 tok/s
- Nemotron-Nano 30B，跑到了 141 tok/s

4.2x 是头部模型的最好成绩，不是平均值。小模型差距小，30B 以上稠密模型差距才拉开。

prefill 这边另算，README 给的 0.08s cached TTFT 走的是 RNN state snapshots 路径。Qwen3.5 DeltaNet 这类混合 RNN 架构，系统提示词处理一次后整个 RNN 状态做深拷贝，下次同一个系统提示词进来直接还原。普通 transformer 走 KV cache 修剪，命中前缀就跳过 re-prefill。

## 三条路线各自擅长什么

Ollama 底层是 llama.cpp，C++ 实现，跨平台，Apple Silicon 走 Metal backend。mlx-lm 是 Apple 官方的 MLX 模型库，纯 Python，研究方便但服务化弱。

Rapid-MLX 走的是另一条路，

- 只做 Apple Silicon，放弃跨平台，换原生 Metal compute kernel
- 服务层做完整，OpenAI 兼容 endpoint、tool calling 解析、prompt cache、reasoning 分离全部内置
- 大上下文请求可以 fallback 到云端模型

跨平台需求强的继续 Ollama，纯研究用 mlx-lm，要在 Mac 上挂工具链跑 agent 选 Rapid-MLX。三条路线各自有取向，不是替代关系。

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

接 Claude Code，

```
OPENAI_BASE_URL=http://localhost:8000/v1 claude
```

Cursor 在 Settings → Models 里加自定义 model，base url 填 `http://localhost:8000/v1`，API Key 随便填，model 名写 `default`。

Aider，

```
aider --openai-api-base http://localhost:8000/v1 --openai-api-key not-needed
```

任何按 OpenAI Chat Completions 协议写的客户端，base url 一改就走本地，不需要改代码。

## 17 个 tool parser 的意义

不同模型家族 tool calling 格式不同，Qwen3.5 用 hermes，Qwen3.6 用 qwen3_coder_xml，DeepSeek V3.1 用 deepseek_v31，Llama 走标准 JSON。Rapid-MLX 内置 17 个 parser 自动识别。

更关键的是 4-bit 量化模型多轮工具调用之后容易输出格式破损，Rapid-MLX 会检测破损的文本格式工具调用并转回结构化 `tool_calls` 字段。Cursor agent 模式跑长了原本会断，加这层兜底之后能撑住。

reasoning 分离也类似，Qwen3、DeepSeek-R1、MiniMax 这些有思维链的模型，输出会分到 `reasoning_content` 字段而不是混在 `content` 里。

## 我的判断

4.2x 是真的，但条件要分清楚，M3 Ultra、特定模型、decode 阶段。普通 M2 Pro 16GB 跑 Qwen3.5-4B 这种小模型，跟对照组差距不会有这么夸张。这是技术现实，cache 优化和 Metal 原生在大模型上才显出来。

我更看重它的工程完成度。tool calling 兜底、reasoning 字段分离、cloud routing fallback，这些是把本地引擎从"能跑模型"推到"能挂 agent 工作流"的具体功课。Cursor / Claude Code / Aider 这些靠 tool call 跑的客户端接本地模型最容易卡在量化破损那一步，Rapid-MLX 把这层踩平了。

下一步动作。手头 M2 Pro 以上 Mac 的，今天就能 brew 装一遍跑 `rapid-mlx serve qwen3.5-9b`，把 Cursor 的 base url 改成 localhost:8000，写半天代码看看体感。M1/M2 8GB 不用试，先选 4B 模型再说。Mac Studio 用户值得专门跑一遍 README 那张 benchmark 表自己核对。

## 相关链接

- Rapid-MLX 仓库 https://github.com/raullenchai/Rapid-MLX
- Apple MLX 框架 https://github.com/ml-explore/mlx

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
