---
title: >-
  我在开发 BaoCut 这个 App 的时候，是基于一个 Loop 来的： 1. 在开发新功能之前先设计原型（参考图1），借助的是 baoyu-design
  skill （https://t.co/d2EaYV6q7j ），配合 Claude Code App 内置的浏览器实施预览调整，模型 Opus 4.8
  就很好了，都不需要 Fable 5. GPT 5
source: X @dotey
url: 'https://x.com/dotey/status/2077281462433223043'
date: 'Wed Jul 15 06:37:49 +0000 2026'
likes: 170
reposts: 21
replies: 71
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-07-16T23:12:44.508Z'
---
我在开发 BaoCut 这个 App 的时候，是基于一个 Loop 来的：

1. 在开发新功能之前先设计原型（参考图1），借助的是 baoyu-design skill （https://t.co/d2EaYV6q7j ），配合 Claude Code App 内置的浏览器实施预览调整，模型 Opus 4.8 就很好了，都不需要 Fable 5.

GPT 5.6 Sol 设计能力还是不如 Opus 4.8

2. 原型打磨好了后，只需要在同一会话内，让 Claude Code 基于新的 UI 设计去实现功能即可，这块 Claude 做的很好，Fable 5 效果最好，能将设计稿几乎 1:1 还原，如果修改不多 Opus 4.8 也能胜任。

这些 UI 的打磨我还是更放心让 Fable 和 Opus 而不是 GPT，但其他一些不涉及 UI 部分的 GPT 5.6 Sol 就做的很好。

3. 更新好了后测试没问题，就可以通过发布的 skill 发布新版本。

这里可以放心让 Codex 去做了，尤其是它的 CloudFlare Plugin 很好用，直接帮助发布更新安装包到 CF。

这个 loop 的每一个迭代的起点是自己的想法，让 AI 提供设计方案，和 AI 反复讨论后确定方案，然后 AI 实施，AI 实施完成后人再去验证和当初想要的是否一致，如果不一致再让 AI 调整甚至推翻重来。
