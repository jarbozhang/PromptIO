# Qwen3.6-27B

[[alibaba|阿里]] 通义千问 2026-04-24 发布的 27B Dense 编程模型，在本地显卡可跑的前提下做出旗舰级编程能力，对标国产 MoE 路线。

## 定位

1. **27B Dense** — 非 MoE 路线，结构简单，本地显卡党友好
2. **编程旗舰** — 目标场景对标 Claude Opus / GPT 编程能力
3. **本地可跑** — 一张消费级显卡即可部署，与 DeepSeek V4 Flash 等 MoE 路线形成选择路径互补

## 首次覆盖

2026-04-24

## 我们的覆盖

| 日期 | 文章 | 角度 |
|------|------|------|
| 2026-05-19 | [[qwen3-6-27b-mtp在llama-cpp跑到60tokens-s-4090本地coding-agent又快了一截|Qwen3.6-27B MTP 在 llama.cpp 跑到 60 tokens/s]] | MTP / GGUF / 本地 coding agent |
| 2026-04-24 | [[qwen3-6-27b编程模型发布-27b-dense旗舰本地可跑\|Qwen3.6-27B 27B Dense 干出旗舰级编程能力，本地显卡党有福了]] | Dense 路线 + 本地编程 |

## 相关主题

- [[local-inference|本地推理]]
- [[ai-coding-tools|AI 编程工具]]
- 国产AI生态

## 相关实体

- [[alibaba|阿里]] — 开发方
- [[deepseek|DeepSeek]] — 国产 MoE 路线对照
- [[simon-willison|Simon Willison]] — Qwen 本地实测传播者（3.6-35B 版本）

## 注意

首次入库 2026-04-24。Qwen3.6-27B 的关键价值在于"Dense + 本地可跑 + 编程旗舰"三件套，是国产本地推理路线的新基线。2026-04-27 阿里把它和 Coder/Vision/Video/1T Max Preview 一起作为 [[qwen-family|Qwen 全家桶]] 整批上了 OpenRouter，本地档不再单点存在，而是和云端旗舰形成端到端档位互补。后续跟踪点：实测 HumanEval / SWE-bench 分数、量化版 GGUF 出现速度、是否被 VSCode / Cursor 默认集成。
