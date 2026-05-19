# llama.cpp

[[ggerganov]] 开发的[[local-inference|本地推理]] LLM 引擎，C/C++ 实现。

## 核心特性

- 跨平台本地推理（Mac/Linux/Windows/手机）
- GGUF 量化格式
- 内置 WebUI、MCP 支持
- 投机解码（prompt-based speculative decoding）

## 近期动态

- **Gemma 4 Day-0 支持** — 26B A4B Q8_0 在 M2 Ultra 上 300 t/s
- **LlamaBarn** — 模型仓库
- **NVIDIA 优化** — NVIDIA_AI_PC 合作优化

## 我们的覆盖

| 日期 | 文章 | 角度 |
|------|------|------|
| 2026-05-19 | [[qwen3-6-27b-mtp在llama-cpp跑到60tokens-s-4090本地coding-agent又快了一截|Qwen3.6-27B MTP 在 llama.cpp 跑到 60 tokens/s]] | Qwen3.6 family MTP 支持 / 4090 实测 |
| 2026-05-11 | [[airllm-4gb-gpu跑70b-本地推理白嫖\|AirLLM 一夜回归 trending，单张 4GB 游戏卡跑 70B 模型，国内本地推理玩家又有新工具了]] | 量化生态对照 / 分层加载路线 |
| 2026-05-06 | [[learningcircuit-95-simpleqa-qwen3-6-27b-3090本地深度研究\|一张 3090 跑 Qwen3.6-27B，本地深度研究 agent 干到 95.7% SimpleQA]] | 本地深度研究 / 推理引擎对照 |
| 2026-04-14 | [[mac-mini变身24小时ai编程站-三件套让你随时随地给ai派活|Mac mini变身24小时AI编程站]] | Tailscale 远程推理 |
| 2026-04-11 | [[ggerganov三年前mac跑出300token-llama-cpp配置|ggerganov用三年前Mac跑出300 token/s]] | 性能实测 |
| 2026-04-08 | [[把mac变成私有ai云-tailscale一键手机访问|300 token/s干掉API账单]] | 性价比对比 |
| 2026-04-15 | [[amd开源gaia框架-本地硬件跑ai-agent不再是nvidia专利\|AMD 开源 GAIA 框架]] | 本地硬件 Agent |
