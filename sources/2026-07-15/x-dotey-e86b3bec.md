---
title: >-
  字幕转录翻译剪辑 Skill —— BaoCut（仅支持 Mac） 借助 Agent Skill，可以转录视频、对转录结果识别
  Speaker、润色（纠正错别字口癖等）、也可以根据转录结果对视频进行简单的剪辑，比如删除口癖、重复等。 这次尝试解决一个问题就是 Agent
  对字幕转录翻译后，无法通过一个友好的操作界面二次编辑的问题。 现在的做法是为 Agent
source: X @dotey
url: 'https://x.com/dotey/status/2077074912435433901'
date: 'Tue Jul 14 16:57:03 +0000 2026'
likes: 103
reposts: 14
replies: 14
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-07-14T23:04:59.553Z'
---
字幕转录翻译剪辑 Skill —— BaoCut（仅支持 Mac）

借助 Agent Skill，可以转录视频、对转录结果识别 Speaker、润色（纠正错别字口癖等）、也可以根据转录结果对视频进行简单的剪辑，比如删除口癖、重复等。

这次尝试解决一个问题就是 Agent 对字幕转录翻译后，无法通过一个友好的操作界面二次编辑的问题。

现在的做法是为 Agent 提供一个 cli，配合 Skill 的说明，Agent 可以借助 cli 去转录，获取转录结果润色、翻译，并实时同步进度到 GUI。后续可以在 GUI 进行预览和人工编辑。

安装了 Skill 和 App 后，后续只要从 Codex 或者 Claude Code 这种 Agent，触发 Skill 即可执行，比如：
> /baocut 转录并翻译视频：<视频 url 或路径>

已知问题：
- 仅支持 Mac
- 翻译速度略慢，但质量会不错

下载地址：https://t.co/89Wi1b3hZT

Skill 从 App 内可以安装，或者 Skill 地址：https://t.co/aON4AditbU
