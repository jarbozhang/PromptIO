---
title: "Google偷偷上架了一个不联网的AI听写App，这可能是本地AI最该有的样子"
source_url: 'https://techcrunch.com/2026/04/06/google-quietly-releases-an-offline-first-ai-dictation-app-on-ios/'
score: 8
scoring_reason: 大厂用开源模型做本地AI产品的实例
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

# Google偷偷上架了一个不联网的AI听写App，这可能是本地AI最该有的样子

你有没有想过，为什么语音转文字这么简单的事，还得把你说的每句话传到云端？

我昨天刷App Store的时候发现了一个叫"Google AI Edge Eloquent"的新App，没有任何官方博客、没有发布会、甚至没有一条推文。Google就这么悄悄把它丢了上去。但这个App做的事情，让我觉得本地AI产品化终于有人走对了路。

## 一个"不需要联网"的听写工具

Eloquent的核心卖点就一个：离线优先。

下载App之后，它会把基于Gemma的语音识别模型 (ASR) 下载到本地。装完就能用，不需要网络。你对着手机说话，它实时转写，暂停之后自动帮你把"嗯"、"啊"、说到一半改口的废话全部清理掉，输出干净的成品文本。

这不是简单的语音转文字。这是"语音转你本来想写的文字"。

转写完成后，下面还有几个按钮：提取要点、正式化、缩短、展开。相当于一个本地LLM后处理管线，只不过套了个极简的UI。

想用云端能力？也行，打开云端模式它会调用Gemini来做文本清理。但默认是关的——这个设计选择本身就很有意思。

## 为什么我说这是"本地AI该有的样子"

过去一年，本地AI赛道有不少玩家。Wispr Flow做语音输入键盘，SuperWhisper做Mac端听写，Willow做开源语音助手。但这些要么太小众，要么完成度不够。

Google这次做对了几件事：

**第一，场景选得准。** 语音听写是本地AI最理想的场景之一——数据敏感（你不想把会议内容传到云端）、延迟敏感（说完话等三秒才出文字，谁受得了）、模型够小（ASR不需要70B参数）。

**第二，产品完成度高。** 它不是一个技术demo。它有历史记录、有搜索、有语速统计、有自定义词库。你甚至可以从Gmail导入专有名词和行话，让它认识你的术语。这个细节说明团队是认真做产品的，不是在秀模型能力。

**第三，Gemma终于有了一个杀手级应用场景。** 说实话，Gemma发布这么久，大部分人对它的印象停留在"Google的开源小模型"。跑个benchmark、写几篇论文，然后呢？Eloquent给出了一个答案：把Gemma塞进一个具体的产品里，解决一个具体的问题。

## 社区里在聊什么

这个App上架不到24小时，已经有不少有意思的讨论。

有人指出App Store描述里提到了Android版本，而且写了"无缝Android集成"——可以设为系统默认键盘，还有个浮动按钮方便随时调用。这基本上是在正面对标Wispr Flow的产品形态。但iOS版先上这个操作很反直觉，Google自己的系统反而不是首发。

我的猜测是：这是Google AI Edge团队的一个实验项目。先在iOS上小范围测试，验证产品形态，成了再整合到Android系统级功能里。Google内部这种"先iOS后Android"的实验不是第一次了。

也有开发者注意到一个关键问题：模型下载大小。本地ASR模型加上文本后处理模型，占多少存储空间？App Store页面没有明确说明。如果是1-2GB级别，对于16GB iPhone用户来说可能就是个劝退门槛。

还有一个值得关注的点：它目前是完全免费的。没有订阅、没有内购。这要么意味着Google把它当作Gemma的showcase不打算赚钱，要么意味着等用户量起来之后会有变化。

## 我的判断

**Eloquent不会干掉Wispr Flow，但它代表了一个更重要的趋势。**

我认为2026年本地AI产品的分水岭，不在于谁的模型更强，而在于谁先把"离线优先"做成用户体验的默认值，而不是一个需要手动打开的选项。Eloquent默认关闭云端模式，这个设计决策比它用什么模型都重要。

说句会得罪人的话：绝大多数打着"本地AI"旗号的产品，骨子里还是云端思维。它们把本地推理当作降级方案，当作"没网时候的备胎"。Eloquent反过来了——云端是增强，本地才是常态。

这才是对的。

对于国内的AI产品团队来说，这里有个很现实的启发：与其在通用大模型上和OpenAI、Anthropic死磕，不如找一个像语音听写这样的垂直场景，用小模型做到离线可用、体验流畅。你不需要GPT-4级别的能力，你需要的是在特定场景下"够用且永远在线"。

## 你该做什么

如果你是iOS用户，现在就去App Store搜"Google AI Edge Eloquent"下载试试。免费的，不亏。

如果你是做AI产品的，认真想一个问题：你的产品里，有哪些功能其实不需要联网？把那些功能用本地模型重做一遍，可能就是你的差异化。

本地AI不是未来。它现在就该是默认选项。

## 相关链接

- App Store下载：搜索"Google AI Edge Eloquent"
- 原文：[Google quietly launched an AI dictation app that works offline | TechCrunch](https://techcrunch.com/2026/04/06/google-quietly-releases-an-offline-first-ai-dictation-app-on-ios/)
- Google Gemma模型：[https://ai.google.dev/gemma](https://ai.google.dev/gemma)
- 竞品对比 - Wispr Flow：[https://www.wispr.flow](https://www.wispr.flow)
- 竞品对比 - SuperWhisper：[https://superwhisper.com](https://superwhisper.com)
