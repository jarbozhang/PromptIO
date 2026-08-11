---
title: >-
  Anthropic 宣布将给 Claude 的输出内容加上机器可读的标记，包括文本中嵌入的隐形水印，以及生成文件中附加的数字签名元数据。8 月 2
  日起（也就是上周），所有新发布的 Claude 模型已经开始执行这套标记机制。 这是 Anthropic 为遵守欧盟 AI 法案第 50
  条签署的透明度行为准则。但执行范围不限于欧盟，全球所有使用 Claude 
source: X @dotey
url: 'https://x.com/dotey/status/2086928989549920678'
date: 'Mon Aug 10 21:33:39 +0000 2026'
likes: 272
reposts: 38
replies: 88
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-08-11T11:04:31.521Z'
---
Anthropic 宣布将给 Claude 的输出内容加上机器可读的标记，包括文本中嵌入的隐形水印，以及生成文件中附加的数字签名元数据。8 月 2 日起（也就是上周），所有新发布的 Claude 模型已经开始执行这套标记机制。

这是 Anthropic 为遵守欧盟 AI 法案第 50 条签署的透明度行为准则。但执行范围不限于欧盟，全球所有使用 Claude 的地方都会生效。

具体来说有两层标记。

第一层是文本水印：Claude 生成文字时，会在文本中织入人眼不可见的水印，不影响阅读体验和内容质量。这个水印的特点是“跟着文字走”，你把 Claude 写的一段话复制粘贴到邮件、文档或博客里，水印依然在，一定程度的编辑修改后也可能保留。

第二层是文件元数据：Claude 生成 SVG、PNG、JPG 等文件时，会附加符合 C2PA 标准的签名元数据。C2PA 是 Adobe、微软、Google 等公司共同推动的内容溯源开放协议，OpenAI 和 Google 的图像生成工具已经在用。

覆盖面很广。API、Claude 官网、Claude Code、Claude Cowork、Claude Tag，所有产品线都适用。通过 AWS、Google Cloud 或 Microsoft Foundry 调用 Claude 时，文本水印同样生效，但文件元数据取决于各云平台的功能支持。

在此之前，Claude 一直没有公开部署过文本水印。OpenAI 此前开发过文本水印方案，但出于各种考虑一直没上线。Anthropic 这次直接在文本层面落地水印，算是 AI 大模型厂商中走得比较靠前的一步。

对于用 Claude 写东西的人来说，一个直接的影响是：你用 Claude 起草的邮件、报告、文章，里面都会携带可被机器检测的水印。Anthropic 表示正在开发配套的检测工具，未来第三方也能检测。

不过限制也很实际。检测到水印只能说明内容“可能经过 Claude 处理”，不能确认 Claude 是原始作者，因为很多人用它润色、翻译、总结已有内容。反过来也一样，检测不到水印不代表内容不是 AI 写的，文本被大量改写后水印会消失，太短的文本信号不够可靠，文件经过格式转换或截图也会丢失元数据。

8 月 2 日之前发布的现有 Claude 模型，Anthropic 正在补充标记功能，具体时间表还没公布。如果你基于 Claude API 构建产品，Anthropic 建议你独立评估欧盟 AI 法案第 50 条对自己的合规要求。

相关文档：https://t.co/GOPcV056Aa
