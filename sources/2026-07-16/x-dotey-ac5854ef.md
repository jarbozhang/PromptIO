---
title: >-
  这个 App 最开始是自己用的，是走的 LLM 方案，先整体翻译，然后按句子配对，再 LLM 拆分，但是拆分效果总是不理想。 另外走 LLM
  还有一个问题，就是要配置 API Key，这其实对普通人不友好，另外就是成本其实不低，Gemini 3.5 Flash 一部长一点视频都几美元。
  最后发现还是 Agent + Skill 路线最好： 1. Agent 
source: X @dotey
url: 'https://x.com/dotey/status/2077225080027775206'
date: 'Wed Jul 15 02:53:46 +0000 2026'
likes: 110
reposts: 19
replies: 36
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-07-15T23:04:51.646Z'
---
这个 App 最开始是自己用的，是走的 LLM 方案，先整体翻译，然后按句子配对，再 LLM 拆分，但是拆分效果总是不理想。

另外走 LLM 还有一个问题，就是要配置 API Key，这其实对普通人不友好，另外就是成本其实不低，Gemini 3.5 Flash 一部长一点视频都几美元。

最后发现还是 Agent + Skill 路线最好：

1. Agent 有很好的纠错能力，哪怕你不给它这样的工具，它自己都能一边翻译一边纠错，质量不错。

2. 把 App 的能力封装成 cli，让 Agent 可以通过命令行调用 App 的功能

3. 配合一个 Skill 把常用的工作流比如像转录、润色、翻译、对齐、剪辑都固化下来，这样 Agent 就知道最佳实践是什么，不需要每次都自己摸索

4. App 解决的是人工预览、校对的部分。

Agent 操作完，如果你是人肉看文本字幕，或者你每次修改一点都要重新 ffmpeg 生成一遍视频，那效率太低了。最好的方式其实不是完全交给 Agent，而是可以有一个图形化的工具快速的预览、二次编辑。

5. Agent 相对比较通用和便宜，现在大家都有 Agent，包月的 Token 经常花不完，用来干这种活正合适
