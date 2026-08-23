---
title: >-
  OpenAI 今天（6月26日）发布了新一代模型 GPT-5.6，包含三个版本：旗舰级 Sol、日常级 Terra 和经济级
  Luna。但这条新闻最值得关注的地方不在模型本身，而在发布方式：应美国政府要求，GPT-5.6 目前只向大约 20
  家经过政府审批的合作伙伴开放，普通开发者和 ChatGPT 用户暂时用不上。 GPT-5.6 用了一套新的命名规则：数
source: X @dotey
url: 'https://x.com/dotey/status/2070589767608144370'
date: 'Fri Jun 26 19:27:24 +0000 2026'
likes: 242
reposts: 19
replies: 41
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-06-28T23:13:00.941Z'
---
OpenAI 今天（6月26日）发布了新一代模型 GPT-5.6，包含三个版本：旗舰级 Sol、日常级 Terra 和经济级 Luna。但这条新闻最值得关注的地方不在模型本身，而在发布方式：应美国政府要求，GPT-5.6 目前只向大约 20 家经过政府审批的合作伙伴开放，普通开发者和 ChatGPT 用户暂时用不上。

GPT-5.6 用了一套新的命名规则：数字代表代际，Sol、Terra、Luna 代表三个固定的能力档位，灵感来自太阳、地球、月亮。Sol 是最强的旗舰，Terra 性能接近上一代 GPT-5.5 但价格砍半，Luna 主打便宜快速。

Sol 新增了两个模式：max 模式让模型花更长时间深度推理，ultra 模式则调用多个子 agent 并行处理复杂任务，相当于一个 AI 自己拆分工作给一组 AI 干活。

在 OpenAI 公布的 Terminal-Bench 2.1（测试命令行工作流的编程基准）上，Sol Ultra 得分 91.9%，Sol 为 88.8%，Claude Mythos 5 为 88%，Google Gemini 3.1 Pro Preview 为 70.7%。网络安全方面，Sol 在 ExploitBench 上用大约三分之一的 token 就达到了 Mythos Preview 的水平。

API 定价：
Sol 每百万 token 输入 5 美元、输出 30 美元；
Terra 分别是 2.5 和 15 美元；
Luna 是 1 和 6 美元。

7 月还会上线 Cerebras 硬件加速版本，推理速度可达每秒 750 个 token。

OpenAI 这次花了大量篇幅讲安全。投入超过 70 万 A100 等效 GPU 小时做自动化红队测试，专门寻找能跨场景通用的越狱攻击。模型内置了拒绝机制，实时分类器会在生成过程中检测网络安全和生物领域的滥用行为，可疑输出会被暂停，交给一个更大的推理模型复审。

按照 OpenAI 自己的准备框架评估，Sol 的网络安全能力被定级为“高”，但没有达到“关键”级别。它能找到浏览器漏洞和利用原语（exploit primitive，也就是构建攻击的基础组件），但在测试条件下无法自主完成完整的攻击链。

OpenAI 把这解读为一个积极信号：模型更擅长帮防守方找洞和修补，而不是帮攻击方搞破坏。但这个判断是否经得起现实世界的检验，预览期就是用来回答这个问题的。

如果你是 API 用户，短期内最实际的变化是：Terra 的性价比。性能接近 GPT-5.5，价格只有一半，对跑大量推理任务的团队来说值得关注。Luna 则适合对成本极度敏感的高吞吐场景。

Sol 的 ultra 模式如果真能稳定运行，意味着复杂的多步骤任务可以甩给模型自己拆解、分配、汇总，开发者不用自己搭 agent 编排框架。这跟 Anthropic 在 Claude 上做的 agent 能力、Cursor 在 IDE 里做的 background agent，方向一致，都在抢占"AI 自己管理 AI"这个位置。

但眼下，大多数人还用不上。OpenAI 说几周内会扩大开放，据 Axios 报道下周就会增加更多客户。ChatGPT 用户什么时候能用，还没有明确时间表。

完整报告：https://t.co/gHKuwPkbQk
