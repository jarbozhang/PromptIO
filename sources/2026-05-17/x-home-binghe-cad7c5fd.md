---
title: "Claude Code 从 2.1.36 版本开始，会在每个 API 请求的系统提示词开头，加入含随机 5 位十六进制 cch 字段的x-anthropic-billing-header内容。 由于第"
source: "X home @binghe"
url: "https://x.com/binghe/status/2055658426332860432"
date: "2026-05-16T14:35:35.000Z"
likes: 638
reposts: 47
replies: 81
tweet_id: "2055658426332860432"
author: "binghe"
---
Claude Code 从 2.1.36 版本开始，会在每个 API 请求的系统提示词开头，加入含随机 5 位十六进制 cch 字段的x-anthropic-billing-header内容。

由于第三方 API 将其视为普通提示词计算缓存 key，cch 每次变化会导致缓存命中率归零，引发 token 消耗暴涨、推理变慢。

真不做个人啊。。。
