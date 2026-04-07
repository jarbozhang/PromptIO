---
title: "Google悄悄上架了一个听写App，它可能改变你对\"本地AI\"的理解"
source_url: https://techcrunch.com/2026/04/06/google-quietly-releases-an-offline-first-ai-dictation-app-on-ios/
score: 8
scoring_reason: 大厂用开源模型做本地AI产品
status: draft
platform: wechat
tags:
  - Google
  - 离线AI
  - 语音识别
  - Gemma
created_at: '2026-04-07'
generated_by: claude-opus-4-6
---
# Google悄悄上架了一个听写App，它可能改变你对"本地AI"的理解

你每天对着手机说多少句话？微信语音、语音搜索、Siri指令——但有多少次，你想把脑子里的一段思路，直接变成一段干净的文字？

我试过市面上几乎所有听写工具。Wispr Flow每月15美元，音频还得传到OpenAI和Meta的服务器上过一遍。苹果自带的听写功能，说个"嗯"它就给你打个"嗯"，忠实得让人崩溃。

然后上周末，Google悄悄在iOS App Store上架了一个叫 **Google AI Edge Eloquent** 的东西。免费，无限用，离线运行，自动帮你把"那个嗯就是我觉得这个方案呃基本上可以"变成一句人话。

我的第一反应：这不对劲，Google什么时候变这么低调了？

## 这东西到底怎么回事

Eloquent的核心卖点只有一个：**离线优先 (offline-first)**。

它把基于Gemma模型的语音识别 (ASR) 直接下载到你手机上。打开App，对着说话，实时转写。你按下暂停的一瞬间，它自动把"um""uh"这些填充词干掉，把你那些说到一半改口的句子理顺。

不是简单的语音转文字。它在理解你"想说什么"，而不是"说了什么"。

转写完成后，底部还有四个按钮：**Key Points**（提炼要点）、**Formal**（正式化）、**Short**（精简）、**Long**（展开）。相当于一个离线版的"帮我润色"。

最让我意外的是个人词典功能——它能从你的Gmail里导入你常用的人名、术语、行话。对经常处理专业内容的人来说，这意味着它第一天用就能认识你的"技术黑话"。

还有个细节：右上角有个开关，打开cloud mode会调用Gemini做云端润色，关掉就是纯本地处理。**你的音频数据一个字节都不会离开手机。**

免费，无订阅，无用量上限。

## 真正值得关注的不是App本身

说实话，一个听写App本身并不性感。

但Eloquent背后的技术路线非常值得琢磨。Google刚刚发布了Gemma 4系列——E2B和E4B两个小尺寸模型，专门为端侧 (on-device) 场景设计，支持多模态、低延迟。有开发者已经在M3 Pro笔记本上用Gemma E2B跑出了实时音视频AI交互的demo。

Eloquent本质上是Google拿Gemma模型做的一个**产品化样板间**。

它在回答一个很多人一直在问的问题：本地AI模型除了跑benchmark、发论文，到底能做什么真实产品？

答案是：一个不需要网络、不收费、不限量的听写工具。听起来朴素，但这个选择极其聪明。语音识别是一个用户感知极强、延迟容忍极低的场景——如果本地模型能在这里做好，它就能在更多场景里做好。

## 社区里的声音

围绕Gemma 4和本地AI，社区讨论非常热闹。

有人在HN上展示了Gemma E2B嵌入浏览器的方案，简单的页面问答和JS执行没问题，但多步骤工具链还不可靠。也有人报告Gemma 4的26B MoE版本跑出了每秒40 token的生成速度，接近上一代模型的两倍。

但也有冷静的声音。有开发者指出，Eloquent目前只有iOS版本，Android版虽然在App Store描述里提了一嘴，但Play Store上根本找不到。iOS键盘集成也标注着"coming soon"。对一个Google出品的App来说，先上iOS后上Android，这操作相当反常——可能说明这更像一个研究团队的技术展示，而非正式的产品线。

和Wispr Flow的对比也很有意思：Wispr Flow每月15美元，覆盖Mac/Windows/iOS/Android四个平台，但所有音频都要走云端。Eloquent免费且隐私友好，但平台覆盖和系统集成目前差得远。**一个卖隐私和免费，一个卖全平台和成熟度。**

## 我的判断

我认为Eloquent本身不会颠覆听写市场——至少现在不会。它没有系统级键盘集成，没有跨平台支持，甚至连Android都没上。作为一个日常工具，它离Wispr Flow还差两个版本迭代。

但作为一个信号，它的意义远大于App本身。

**Google正在用免费产品把Gemma模型塞进你的手机。** 今天是听写，明天可能是离线翻译、本地文档总结、端侧Agent。Eloquent不是终点，是Gemma生态的敲门砖。

我认为2026年下半年，"本地AI应用"会成为一个独立的产品品类。不是"云端AI的降级版"，而是一种全新的产品形态——永远在线、零延迟、数据永远不离开设备。Eloquent是第一个认真回答"这东西到底长什么样"的产品。

如果你是做端侧AI的开发者，现在该认真研究Gemma 4的E2B和E4B模型了。如果你只是想找个好用的听写工具——再等等，等它上了Android和键盘集成再说。

你觉得"本地优先"最终会赢过"云端优先"吗？还是说，它们注定是两条永远不会交叉的路？

---

## 相关链接

- [Google AI Edge Eloquent - App Store](https://apps.apple.com/us/app/google-ai-edge-eloquent/id6756505519)
- [TechCrunch 原文报道](https://techcrunch.com/2026/04/06/google-quietly-releases-an-offline-first-ai-dictation-app-on-ios/)
- [9to5Google 详细评测](https://9to5google.com/2026/04/06/google-ai-edge-eloquent-app/)
- [Gemma 4 官方博客](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/)
- [Gemma 4 开发者文档](https://developers.googleblog.com/bring-state-of-the-art-agentic-skills-to-the-edge-with-gemma-4/)
- [Gemma 4 Hugging Face 模型页](https://huggingface.co/blog/gemma4)
