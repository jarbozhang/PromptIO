# Unsloth

本地 LLM 训练加速框架，长期是 [[huggingface\|HuggingFace]] 生态里"省显存 + 提速"的代表项目。2026-04-25 推出 WebUI，本地训练首次进入"图形界面 + 一键跑 Gemma 4 / Qwen3.5 / DeepSeek"阶段。

## 定位

1. **训练加速** — 显著降低 LoRA / QLoRA / SFT 显存与时间消耗
2. **WebUI**（4/25 新发） — 图形化本地训练，零命令行
3. **多模型支持** — Gemma 4 / Qwen 3.5 / DeepSeek 等主流开源模型
4. **HF 生态原生** — 直接对接 HuggingFace Hub

## 关键事件时间线

- **2026-04-25** — Unsloth WebUI 开源发布
- **2026-04-25** — 我们入题

## 首次覆盖

2026-04-25

## 我们的覆盖

| 日期 | 文章 | 角度 |
|------|------|------|
| 2026-04-25 | [[unsloth-webui开源-本地跑gemma4-qwen3-5-deepseek图形界面\|Unsloth WebUI 本地训练 Gemma 4 / Qwen3.5 / DeepSeek 一个图形界面搞定]] | 本地训练门槛下移 + AI 编程工具 |

## 相关主题

- [[local-inference\|本地推理]]
- [[ai-coding-tools\|AI 编程工具]]
- 开源生态

## 相关实体

- [[huggingface\|HuggingFace]] — 上游模型源
- [[gemma-4\|Gemma 4]] / [[deepseek-v4\|DeepSeek V4]] / Qwen 3.5 — 主流可训目标
- [[llama-cpp\|llama.cpp]] — 推理侧对照

## 注意

Unsloth WebUI 把"本地训练自有模型"这件事从"需要写训练脚本 + 调一堆超参"变成"图形化点几下"，是中文 AI 社区跟进本地微调的关键拐点。后续跟踪点：训练效果是否稳定、是否支持 LoRA 推送回 HF、对国产模型（Qwen / DeepSeek）兼容性的实测口碑。
