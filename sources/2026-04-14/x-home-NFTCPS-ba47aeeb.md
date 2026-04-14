---
title: "开源 TTS 卷到这个程度了？园区诈骗又有新武器了？  清华 OpenBMB 放出 VoxCPM2，20 亿参数，200 万小时多语言数据训练，48kHz 录音棚级音质。  关键是——不用 Token"
source: "X home @NFTCPS"
url: "https://x.com/NFTCPS/status/2043171343567647139"
date: "Sun Apr 12 03:36:23 +0000 2026"
likes: 1087
reposts: 214
replies: 20
---

开源 TTS 卷到这个程度了？园区诈骗又有新武器了？

清华 OpenBMB 放出 VoxCPM2，20 亿参数，200 万小时多语言数据训练，48kHz 录音棚级音质。

关键是——不用 Tokenizer。

传统 TTS 先把音频切成离散 token 再生成，信息损失不可避免。VoxCPM2 直接在连续潜空间里做扩散自回归，音色细节保留得更完整。

几个硬指标：

- 30 种语言 + 9 种中文方言
- RTX 4090 上实时率 0.13，流式输出几乎无延迟
- 用自然语言描述就能凭空创造声音，不需要参考音频
- 声音克隆还能调情绪、语速、表达方式
- Apache 2.0 协议，商用友好

最狠的是「终极克隆」模式：给一段参考音频 + 文本，连呼吸节奏、口癖这种微妙细节都能复刻。

GitHub 已经破万星，之前连续霸榜 GitHub 和 HuggingFace Trending。

播客、有声书、游戏配音、短视频旁白——开源方案已经够用了。

https://t.co/SlEimVxLez
