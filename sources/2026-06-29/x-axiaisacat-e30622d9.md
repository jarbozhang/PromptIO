---
title: >-
  4GB 显卡跑 70B 大模型，听起来像标题党。 但 AirLLM 这个 21.4k Star 项目，README 第一屏就写得很直： 70B 模型，单张
  4GB GPU 推理。 Llama 3.1 405B，8GB VRAM 也能跑。 它不是把模型砍小。 也不是靠蒸馏、剪枝糊弄过去。
  核心思路是把推理时的内存占用压下来： 模型按层拆开，需要哪层加载哪层，再
source: X @axiaisacat
url: 'https://x.com/axiaisacat/status/2069958345511858535'
date: 'Thu Jun 25 01:38:22 +0000 2026'
likes: 165
reposts: 16
replies: 27
source_type: x
language: zh
account_name: axiaisacat
fetched_at: '2026-06-28T23:13:00.941Z'
---
4GB 显卡跑 70B 大模型，听起来像标题党。

但 AirLLM 这个 21.4k Star 项目，README 第一屏就写得很直：

70B 模型，单张 4GB GPU 推理。

Llama 3.1 405B，8GB VRAM 也能跑。

它不是把模型砍小。

也不是靠蒸馏、剪枝糊弄过去。

核心思路是把推理时的内存占用压下来：
模型按层拆开，需要哪层加载哪层，再配合预取和压缩，把“显存不够”这件事往后推。

这对本地大模型玩家很要命。

因为过去很多所谓“本地部署”，真正的门槛不是会不会写代码，而是你有没有足够贵的显卡。
