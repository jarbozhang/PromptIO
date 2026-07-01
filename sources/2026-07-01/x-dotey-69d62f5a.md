---
title: >-
  Anthropic 今天发布 Claude Sonnet 5，替代 Sonnet 4.6 成为免费版和 Pro 版的默认模型。Anthropic
  的定位很明确：Agent 能力接近自家最贵的 Opus 4.8，API 价格只有后者的 40%。 Sonnet
  系列是开发者用量最大的一档。但过去几个月，AI Agent 能力（让模型自主规划、调用工具完成多步骤任
source: X @dotey
url: 'https://x.com/dotey/status/2072025716913262957'
date: 'Tue Jun 30 18:33:21 +0000 2026'
likes: 59
reposts: 6
replies: 15
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-06-30T23:13:50.320Z'
---
Anthropic 今天发布 Claude Sonnet 5，替代 Sonnet 4.6 成为免费版和 Pro 版的默认模型。Anthropic 的定位很明确：Agent 能力接近自家最贵的 Opus 4.8，API 价格只有后者的 40%。

Sonnet 系列是开发者用量最大的一档。但过去几个月，AI Agent 能力（让模型自主规划、调用工具完成多步骤任务）的主要进步集中在更贵的 Opus 系列，两者差距越来越明显。Sonnet 5 把差距缩了回来。在 Agent 编程基准上，Sonnet 5 得分 63.2%，Sonnet 4.6 是 58.1%，Opus 4.8 是 69.2%。在知识工作基准上，Sonnet 5 甚至略微超过了 Opus 4.8。

早期测试者的反馈比较一致：以前 Sonnet 做到一半会停的复杂任务，现在能跑完，还会主动检查自己的输出。Zapier 的工程师说，让 Sonnet 5 连续执行“更新 Salesforce 账户等级，再给企业客户发公告邮件”，模型一口气做完了，“以前会卡在半路”。

API 定价分两阶段：8 月 31 日前的推广价是输入 2 美元/百万 Token、输出 10 美元/百万 Token，之后涨到 3 美元和 15 美元。据 TechCrunch 报道，这个价格低于 OpenAI 的 GPT-5.5 和 Google 的 Gemini 3.1 Pro，但仍高于 Gemini 3.5 Flash。

有个容易忽略的细节：Sonnet 5 换了新的分词器，同样的文本可能消耗 1.0 到 1.35 倍的 Token。Anthropic 说推广期的定价已经把这个涨幅对冲掉了，过渡期总成本大致不变。但推广价结束后，实际花费会比官方标价的涨幅更大。

安全方面，Sonnet 5 的幻觉率和迎合倾向低于前代，Agent 场景下抵御提示注入和恶意请求的能力更强。因为网络安全能力有所提升，模型默认开启了实时安全防护（和 Opus 4.7、4.8 相同的机制）。

Sonnet 5 今天起在 Claude 所有套餐、Claude Code 和 API 上可用，模型代号 claude-sonnet-5。
