# 主题追踪：本地推理

在本地硬件上运行 LLM，替代云端 API。

## 当前状态

本地推理在 Gemma 4 发布后迎来新一轮热潮。关键数据点：
- Gemma 4 26B A4B 在 M2 Ultra 上 300 t/s（Q8_0 全精度）
- 一张 4090 可以跑完整的知识库 Agent
- Tailscale + [[llama-cpp|llama.cpp]] 实现手机远程推理

## 关键技术栈

llama.cpp + GGUF 量化 + Tailscale/FRP 远程 + MCP 工具集成

## 我们的覆盖

| 日期 | 文章 | 具体角度 |
|------|------|---------|
| 2026-05-11 | [[airllm-4gb-gpu跑70b-本地推理白嫖\|AirLLM 一夜回归 trending，单张 4GB 游戏卡跑 70B 模型]] | 分层加载 / 速度换显存 / 70B 极低门槛 |
| 2026-05-10 | [[蚂蚁ring-腾讯hy3-双双上openrouter-万亿模型免费\|蚂蚁 Ring-2.6-1T + 腾讯 Hy3 preview 同天免费上 OpenRouter，国产万亿双子线]] | 国产万亿云端基线 / 本地路径对照 |
| 2026-05-05 | [[ace-step-ui-开源ai音乐生成器-本地不限量\|ACE-Step UI 4090 本地跑音乐生成]] | 本地音乐生成 / 创作者经济 |
| 2026-05-05 | [[rapid-mlx-比ollama快4-2倍-mac本地ai推理引擎\|M 系 Mac 上跑本地模型，引擎层正在被换掉]] | Apple Silicon MLX 原生引擎 / Ollama 之外的选择 |
| 2026-05-08 | [[goose-26k星-block本地agent-绕开claude-code-200美金\|Block Goose 26k 星本地 AI 编程 agent]] | 本地 agent 路线 / 绕开订阅 / Ollama 路线 |
| 2026-05-06 | [[learningcircuit-95-simpleqa-qwen3-6-27b-3090本地深度研究\|一张 3090 跑 Qwen3.6-27B，本地深度研究 agent 干到 95.7% SimpleQA]] | 单卡本地深度研究 / 国产模型本地实战 |
| 2026-04-27 | [[qwen3-6全家桶5个模型上openrouter-27b-dense到1t-max-preview\|Qwen3.6 全家桶 5 模型上 OpenRouter，含 27B Dense 本地档]] | 全家桶含本地档 + 云端档对照 |
| 2026-04-25 | [[simon-willison实测deepseek-v4-接近前沿价格零头\|Simon Willison 实测 DeepSeek V4 本地]] | 海外 KOL 本地实测 |
| 2026-04-25 | [[unsloth-webui开源-本地跑gemma4-qwen3-5-deepseek图形界面\|Unsloth WebUI 本地训练 Gemma 4 / Qwen3.5 / DeepSeek]] | 本地训练图形化 |
| 2026-04-24 | [[deepseek-v4-pro-flash双发-openrouter-价格战新底部\|DeepSeek V4 Pro/Flash 双发（Flash 本地可跑）]] | 国产 MoE 低成本本地 |
| 2026-04-24 | [[gemma-4塞进jetson-orin-nano-2000块桌面机器人真能做事\|Gemma 4 塞进 NVIDIA Jetson Orin Nano]] | 端侧 VLA / 具身智能 |
| 2026-04-24 | [[qwen3-6-27b编程模型发布-27b-dense旗舰本地可跑\|Qwen3.6-27B 27B Dense 本地编程旗舰]] | 国产 Dense 编程 |
| 2026-04-18 | Qwen3.6-35B在笔记本上画的图比Claude Opus 4.7好——Simon Willison亲测 | 本地图片生成 |
| 2026-04-16 | [[gemma4跑在iphone上了-完全离线不联网|Gemma 4 iPhone离线]] | 移动端 |
| 2026-04-14 | [[mac-mini变身24小时ai编程站-三件套让你随时随地给ai派活|Mac mini变身24小时AI编程站]] | 远程访问方案 |
| 2026-04-13 | [[一张4090就够-gemma4离线知识库agent完整实战|一张4090就够，Gemma4离线知识库Agent]] | 实操教程 |
| 2026-04-11 | [[ggerganov三年前mac跑出300token-llama-cpp配置|ggerganov用三年前Mac跑出300 token/s]] | 性能实测 |
| 2026-04-08 | [[把mac变成私有ai云-tailscale一键手机访问|300 token/s干掉API账单]] | 性价比对比 |
| 2026-04-15 | [[amd开源gaia框架-本地硬件跑ai-agent不再是nvidia专利\|AMD 开源 GAIA 框架]] | AMD Ryzen AI 本地 Agent / 非 NVIDIA 路线 |
| 2026-04-30 | [[ollama接住国产全家桶-kimi-glm-minimax-deepseek\|ollama 默默接住国产全家桶，Kimi-K2.5 / GLM-5 / MiniMax / DeepSeek 一条命令本地跑]] | 国产模型本地一键跑 |
| 2026-04-30 | [[airllm国产开发者-70b塞进4gb显卡-本地推理省钱\|AirLLM 把 70B 模型塞进单 4GB 显卡]] | 显存优化 / 极低门槛本地 |
| 2026-04-30 | [[华为昇腾triton语言开源-国产gpu软件栈\|华为昇腾的 Triton 语言开源，国产 GPU 软件栈对齐 PyTorch 圈]] | 国产 GPU 软件栈 |
| 2026-05-07 | [[deepseek-v4-pro-flash双发-华为昇腾跑国产开源前沿\|DeepSeek V4 Pro 不再是 benchmark 第一名，但它把 1.6T 模型直接放到了昇腾上]] | 国产 GPU + 开源旗舰 / 昇腾本地推理 |
| 2026-05-07 | [[gb10-solution-atlas开源-rust-cuda让qwen3-6-35b单卡100tok每秒\|DGX Spark 单卡跑 Qwen3.6-35B 100+ tok/s，这个 Rust 推理引擎把 PyTorch 整条栈丢出去了]] | 推理引擎 / Rust + CUDA / 砍 Python 栈 |

## 饱和度评估

**高饱和** — 12 篇/20 天。4/27 +1 篇（Qwen3.6 全家桶含 27B Dense 本地档），4/25 +2、4/24 +3 基础上继续抬升。Gemma 4 / Qwen / DeepSeek 三线基线稳固，下一轮只跟"非这三家的本地推理路线"或"本地训练/微调实操"角度。

## 潜在下一个角度

- 手机端本地推理（MLC LLM / MediaPipe）
- Windows/Linux 平台对比（不只是 Mac）
- 多模态本地推理（视觉+语音）
- 国产端侧芯片（昇腾 / 寒武纪 / 地平线）上的 LLM 实测
