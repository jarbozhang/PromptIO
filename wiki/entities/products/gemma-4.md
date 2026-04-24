# Gemma 4

[[google|Google DeepMind]] 2026-04-02 发布的开源端侧模型，Apache 2.0 协议，首周 10M+ 下载。2026-04-22 NVIDIA Jetson Orin Nano 上跑通 VLA（视觉语言动作）demo，成为 2000 元级可复现桌面机器人的基础模型。

## 定位

1. **开源端侧** — Apache 2.0，26B A4B 规模
2. **多端可跑** — M2 Ultra 上 300 t/s、iPhone 上可离线、一张 4090 跑完整知识库 Agent、Jetson Orin Nano 跑桌面机器人 VLA
3. **多模态 / VLA** — 4/22 Jetson 上的 demo 把 Gemma 4 推进 VLA 具身智能领域

## 关键事件时间线

- **2026-04-02** — Gemma 4 正式发布，Apache 2.0
- **2026-04-13** — 一张 4090 跑 Gemma 4 离线知识库 Agent
- **2026-04-16** — Gemma 4 跑在 iPhone 上完全离线
- **2026-04-22** — NVIDIA Jetson Orin Nano VLA demo，桌面机器人可复现
- **2026-04-24** — 我们选题入库

## 首次覆盖

2026-04-13（作为主要实体）；2026-04-24 以 VLA Jetson 形态重新入题

## 我们的覆盖

| 日期 | 文章 | 角度 |
|------|------|------|
| 2026-04-24 | [[gemma-4塞进jetson-orin-nano-2000块桌面机器人真能做事\|Gemma 4 塞进 NVIDIA Jetson Orin Nano，2000 块钱桌面机器人真的能做事了]] | 端侧 VLA 具身智能 |
| 2026-04-16 | [[gemma4跑在iphone上了-完全离线不联网\|Gemma 4 跑在 iPhone 上完全离线]] | 移动端离线 |
| 2026-04-13 | [[一张4090就够-gemma4离线知识库agent完整实战\|一张 4090 就够，Gemma 4 离线知识库 Agent 完整实战]] | 本地 Agent 实战 |

## 相关主题

- [[local-inference|本地推理]]
- [[ai-hardware|AI 硬件]]
- [[embodied-ai|具身智能]]
- [[multimodal|多模态]]

## 相关实体

- [[google|Google DeepMind]] — 开发方
- [[nvidia|NVIDIA]] — Jetson Orin Nano 承载硬件
- [[llama-cpp|llama.cpp]] — 本地推理引擎

## 注意

Gemma 4 是当前覆盖最密的端侧开源模型，4/24 VLA Jetson 形态为"具身智能"主题首次落地提供样本。后续跟踪点：国内厂商（宇树、小鹏、小米）复现 Jetson + Gemma VLA 路线的时间、国产端侧模型（MiMo / Qwen）是否跟进。
