---
title: >-
  Anthropic 说他们为 Opus 5 删掉了 Claude Code 80% 的系统提示词。 我想验证下是不是。于是把 CLI
  指向本地一个小服务器，抓它真正发出去的东西。 第一组数字就不太对。 Opus 4.7：15,225 字符。 Opus 4.8：4,467。 Opus
  5：7,694。 他们是在 4.8 上删的，不是 5。Opus 5 的系统提
source: X @chenchengpro
url: 'https://x.com/chenchengpro/status/2081339012632215684'
date: 'Sun Jul 26 11:21:04 +0000 2026'
likes: 429
reposts: 65
replies: 90
source_type: x
language: zh
account_name: chenchengpro
fetched_at: '2026-07-30T11:14:03.879Z'
---
Anthropic 说他们为 Opus 5 删掉了 Claude Code 80% 的系统提示词。

我想验证下是不是。于是把 CLI 指向本地一个小服务器，抓它真正发出去的东西。

第一组数字就不太对。

Opus 4.7：15,225 字符。
Opus 4.8：4,467。
Opus 5：7,694。

他们是在 4.8 上删的，不是 5。Opus 5 的系统提示词比上一代大了 72%。

那 80% 确实是真的。每个版本里都同时带着两套 prompt，一个函数决定发哪套。判定条件是硬编码的子串匹配：model id 含 sonnet、haiku、claude-3-，或者等于 opus-4-0/4-1/4-5/4-6/4-7，走旧的。4.8 不在名单上。

只数手写的那几节策略正文，旧路径 12,443 字符，新路径 2,308。-81%。

删掉的是这几节：

# Doing tasks（3,321 字符）
# Executing actions with care（3,585）
# Text output（1,701）
# System（1,627）
# Using your tools（752）
# Tone and style（557）

换成一节 # Harness，1,702 字符，五条。这五条讲的全是环境长什么样，没有一条在规定该怎么做。markdown 会在终端里渲染，被拒绝的工具调用意味着用户说了不。

整套写注释的规矩，「默认不写注释」「绝不写多段 docstring」，只剩一句：

"Write code that reads like the surrounding code: match its comment density, naming, and idiom."

这个开关也支持用户手动控制。CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT=1 能把短 prompt 套到任何模型上。我在 Opus 4.5 上试了一次，拿到的东西和 4.8 实际收到的逐字相同，只差写模型名和知识截止日期的那两行。

没料到的是 Opus 5 又开始往回加。

# Delivering work（2,019 字符）和 # Corrections（1,736），两段新内容，2.1.215 和 2.1.216 里完全没有。它们出现在 2.1.220，挂在一个 capability 上，而这个 capability 只有 claude-opus-5 有。4,467 加这两段，基本就是 Opus 5 的全部差值。

更巧的是 # Corrections 这一段。Anthropic 自己打包了一份 Opus 5 迁移指南，让第三方开发者往自己的 agent 里抄一段进去，抄的就是它，逐字相同。指南给的理由是 Opus 5 "flags and explains its own earlier mistakes at length, which reads as thrash in a user-facing product."

Fable 5 走的是第三条路，多一节 # Communicating with the user，8,911 字符。

所以「模型越强越不需要规则」这个说法不太站得住。删是上一代就删完的。换了新模型，翻车的方式也换了，规则就跟着变成一小块补丁，按模型贴。

如果你在这上面做东西，还有两件事。

model id 没被识别，走的又是 Bedrock、Vertex 或者自定义 base URL，就掉回那套 15K 的旧 prompt。它查的是你的 provider，不只是模型。

同一个开关也在分流工具描述。53,328 字符降到 37,167。你的上下文大头根本不在 system prompt 里。

想自己验？可以写个小 HTTP 服务，把 response 存下来，直接返 400。把 ANTHROPIC_BASE_URL 指过去，然后 claude -p "hi" --model 模型id。

Anthropic 删自己的规则我没什么感觉。难受的是我也写过一堆同样的规则，其中不少大概只是在替模型兜底，而它早就不需要人兜了。哪些是，我分不出来，只能一条条删掉看会不会坏。

@trq212 的原帖值得读全文。
