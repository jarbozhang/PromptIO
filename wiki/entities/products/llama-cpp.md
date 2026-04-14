# llama.cpp

[[ggerganov]] 开发的[[local-inference|本地 LLM 推理]]引擎，C/C++ 实现。

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
| 2026-04-14 | [[drafts/2026-04-14/mac-mini变身24小时ai编程站-三件套让你随时随地给ai派活/article|Mac mini变身24小时AI编程站]] | Tailscale 远程推理 |
| 2026-04-11 | [[drafts/2026-04-11/ggerganov三年前mac跑出300token-llama-cpp配置/article|ggerganov用三年前Mac跑出300 token/s]] | 性能实测 |
| 2026-04-08 | [[drafts/2026-04-08/把mac变成私有ai云-tailscale一键手机访问/article|300 token/s干掉API账单]] | 性价比对比 |
