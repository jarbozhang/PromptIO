---
title: "只能说 Google 这波牛逼，NotebookLM 的处理算力直接白嫖。那还往 Claude 对话里硬塞资料干啥，问得多了额度哗哗掉。  这篇文章的思路挺巧妙的，资料先丢给 Google 家的 No"
source: "X home @alin_zone"
url: "https://x.com/alin_zone/status/2046133743400976558"
date: "Mon Apr 20 07:47:54 +0000 2026"
likes: 435
reposts: 105
replies: 17
---

只能说 Google 这波牛逼，NotebookLM 的处理算力直接白嫖。那还往 Claude 对话里硬塞资料干啥，问得多了额度哗哗掉。

这篇文章的思路挺巧妙的，资料先丢给 Google 家的 NotebookLM，让它来存、来检索。免费档 50 个源，PDF、网页、YouTube 字幕都能往里塞，处理算力 Google 全包不花钱。Claude只看它返回的带引用结论，原文一字不进对话。作者实测 5 轮研究会话差了 17 倍，$9.59 掉到 $0.55。

想上手就三步：
1️⃣ npm i notebooklm-client 装客户端
2️⃣ npx notebooklm export-session 把 Google 登录态导出来
3️⃣ npx notebooklm skill install 装 skill

之后在 Claude Code 里说句"查下 NotebookLM 里的信息"，它自己就会去调。
