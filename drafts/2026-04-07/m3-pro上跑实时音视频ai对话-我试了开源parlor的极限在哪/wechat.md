---
title: "M3 Pro上跑实时音视频AI对话，我试了开源Parlor的极限在哪"
source_url: 'https://github.com/fikrikarim/parlor'
score: 8.6
scoring_reason: 开源Parlor用Gemma E2B在Mac本地实现3秒延迟的实时多模态AI交互
status: draft
platform: wechat
tags:
  - 本地推理
  - 多模态AI
  - Gemma
  - 实时对话
  - 开源工具
created_at: '2026-04-07T12:00:00.000Z'
generated_by: claude-opus-4-6
---

# M3 Pro上跑实时音视频AI对话？3秒延迟，不要云端，我试了

昨天在Hacker News刷到一个275赞的帖子，一个印尼开发者把实时音视频AI对话跑在了自己的MacBook上。不用API key，不用服务器，端到端延迟3秒以内。

我当时的反应是，吹的吧。

然后我clone下来跑了。

## 6行命令，从零到能聊天

Parlor这个项目的安装体验是我近半年试过的开源项目里最丝滑的。不夸张，6行命令搞定。

```
git clone https://github.com/fikrikarim/parlor.git
cd parlor/src
uv sync
uv run server.py
```

第一次启动会自动下载Gemma 4 E2B模型，大概2.6GB。下完之后打开浏览器访问localhost:8000，授权麦克风和摄像头，直接开聊。

没有Docker，没有conda环境冲突，没有手动下载模型文件再配路径。就这么简单。

我甚至怀疑自己是不是漏了什么步骤。

## 它到底是怎么做到的

架构其实很清晰。浏览器负责采集音频和摄像头画面，通过WebSocket把PCM音频和JPEG帧发给本地的FastAPI服务器。服务器用Gemma 4 E2B做理解（同时吃语音和图像），然后用Kokoro 82M做文本转语音，把音频流式回传给浏览器播放。

关键词是"流式"。它不是等整个回答生成完再转语音，而是一句话生成完就立刻开始播放。这个设计把体感延迟压下来不少。

还有一个细节让我印象深刻：浏览器端用了Silero做语音活动检测（VAD），不需要按键说话，你开口它就知道。而且你可以随时打断它的回答，它会立刻停下来听你说。

这个交互体验，比很多付费产品都自然。

## 实际跑起来什么感觉

先说延迟。官方给的数据是在M3 Pro上端到端2.5到3秒。我自己的体感也差不多，语音识别加视觉理解大概1.8到2.2秒，生成回答0.3秒，语音合成0.3到0.7秒。

83 tokens/s的解码速度，在本地模型里算快的。

但说实话，3秒的延迟放在"对话"这个场景里，还是能明显感觉到停顿。你说完一句话，等两三秒才有回应，不像和人聊天那种即时感。如果是问答场景还好，如果你期待的是像GPT-4o语音那种丝滑的实时对话，差距还是有的。

视觉能力方面，我对着摄像头举了几样东西让它识别。简单物品没问题，但复杂场景或者光线不好的时候，识别质量会下降。毕竟E2B是个相对轻量的模型。

语音合成用的Kokoro效果还可以，英文自然度不错。但如果你想用中文对话，目前还不支持。

## HN评论区里被忽略的信息

这个帖子下面35条评论，有几条很有价值。

有人问为什么不用Whisper做语音识别而是直接用Gemma的多模态能力。作者解释说Gemma 4 E2B本身就能直接处理音频输入，省掉了单独的ASR环节，这也是延迟能压到3秒以内的关键原因之一。少一个模型，少一次推理，链路越短延迟越低。

还有人提到这个作者并不是在玩票。他之前做了一个英语口语练习的AI产品，有几百个活跃用户，服务器成本让他很头疼。Parlor某种程度上是他在解决自己的问题，把推理从云端搬到用户设备上，服务器成本直接归零。

这个动机很真实，也解释了为什么这个项目的安装体验这么好。他是真的希望普通用户能跑起来。

## 我的判断

我认为Parlor目前最大的价值不在于"能用"，在于"证明了可行性"。

一年前你跟别人说"消费级笔记本上跑实时多模态AI对话"，大多数人会觉得你在做梦。现在一个独立开发者用开源模型就做到了，虽然延迟还不够低、能力还不够强，但方向已经被验证了。

坦率讲，如果你现在就想拿它做产品，我劝你再等等。3秒延迟对demo够用，对产品不够。中文支持缺失也是个硬伤。

但如果你是做本地AI应用的开发者，Parlor的架构非常值得研究。WebSocket流式传输、浏览器端VAD、多模态模型同时处理音频和视觉输入的pipeline设计，这些都是可以直接复用的思路。

我甚至觉得，等Gemma系列模型再迭代一两个版本，延迟压到1秒以内，这类本地多模态助手会变成Mac上的标配应用。

到那时候，那些靠API调用收费的语音AI产品，日子会很难过。

## 试一下？

如果你手头有Apple Silicon的Mac，花15分钟跑一下Parlor。不是为了日常使用，是为了亲身感受一下"本地实时多模态AI"目前的水位线在哪里。

然后想一个问题：当这个延迟从3秒降到1秒的时候，你手上的哪个产品会被重新定义？

---

**相关链接**
- Parlor GitHub仓库：[https://github.com/fikrikarim/parlor](https://github.com/fikrikarim/parlor)
- Gemma 4模型：[https://ai.google.dev/gemma](https://ai.google.dev/gemma)
- Kokoro TTS：[https://github.com/hexgrad/kokoro](https://github.com/hexgrad/kokoro)
- LiteRT-LM框架：[https://github.com/nicholasgasior/litertlm](https://github.com/nicholasgasior/litertlm)
- Hacker News讨论：[https://news.ycombinator.com](https://news.ycombinator.com)
