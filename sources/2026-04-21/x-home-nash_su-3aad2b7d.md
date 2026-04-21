---
title: "llm_wiki v0.3.3 版本发布🎉  主要修复了Bug和构建了专用测试数据集，这样后面就可以更准确的优化对知识库的分析整理能力。  新功能： - AI 输出语言可配置，支持自动检测或手动锁定"
source: "X home @nash_su"
url: "https://x.com/nash_su/status/2046063066258030993"
date: "Mon Apr 20 03:07:03 +0000 2026"
likes: 125
reposts: 14
replies: 8
---

llm_wiki v0.3.3 版本发布🎉

主要修复了Bug和构建了专用测试数据集，这样后面就可以更准确的优化对知识库的分析整理能力。

新功能：
- AI 输出语言可配置，支持自动检测或手动锁定
- LLM 驱动的 review sweep，能自动识别和清理过期 review
- review 去重 + 队列清扫，降低陈旧提醒噪声
- real-LLM 真模型测试基础设施

Bug 修复：
- 防止输出语言被训练偏差默认拉回中文
- 切项目时的跨项目数据污染和竞态
- FILE 块正则静默吃掉带短横线路径
- Kanji 重的日文误判成中文
- [[Transformer]] 匹配 transformer.md（wikilinks 大小写不敏感）
- /entities/ 和 /sources/ 页面不再被语言过滤误丢
- 语言检测的多处正则误判
- ingest LLM 温度默认 0.1，稳定多文件输出

测试：
- 六层测试体系（纯函数、store、竞态、真文件系统、LLM 契约、属性测试）
- sweep / lint / enrich / ingest / search 的场景驱动框架
- real-LLM 覆盖从 4 扩到 18 场景（7 种语言、9 类领域）+ sweep 链式端到端
- 契约从"不崩就行"收紧到"行为必须正确"

https://t.co/Xkd9oTNcIj
