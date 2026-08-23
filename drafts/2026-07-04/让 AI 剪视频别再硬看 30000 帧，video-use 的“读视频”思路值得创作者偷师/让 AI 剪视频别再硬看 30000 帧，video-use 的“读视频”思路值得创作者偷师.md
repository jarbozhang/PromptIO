---
title: 让 AI 剪视频别再硬看 30000 帧，video-use 的“读视频”思路值得创作者偷师
status: draft
date: '2026-07-04'
source: manual
source_url: https://x.com/shao__meng/status/2072644710523691110
angle: 把 video-use 写成创作者工作流案例：LLM 先读转写文本，只在关键切点看时间线图，再生成 EDL 和渲染结果。读者关心的是：不用重做剪辑软件，也能把粗剪、校验和批量改稿交给 AI。
voice: narrative
content_lane: creator-workflow
content_archetype: case_story
diversity_note: recent_entity_saturation
reach: 8
tags:
  - AI视频剪辑
  - 创作者工作流
  - video-use
  - Agent
  - ffmpeg
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 让 AI 剪视频别再硬看 30000 帧，video-use 的“读视频”思路值得创作者偷师
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.028
reach_note: 视频剪辑是强需求，Codex/Claude Code/Cursor 等工具有识别度，且有明确工作流可试。
selection_reason: 这是当天少数能跳出开发者工具范畴、直接服务内容生产的题目，技术点也足够新鲜。
---

# 让 AI 剪视频别再硬看 30000 帧，video-use 的“读视频”思路值得创作者偷师

很多创作者想让 AI 帮忙剪视频，第一反应是把视频丢给模型，让它一帧一帧看完。听起来直接，实际很浪费。

video-use 这套开源 Skill 给了一个更像创作者工作流的答案。LLM 先读转写文本，只在关键切点看时间线图，再生成 EDL 和渲染结果。

这对做播客切片、课程粗剪、产品演示改稿的人很有启发。它不是重做一个剪辑软件，而是把粗剪、校验和批量修改这几件最消耗耐心的活，交给 Coding Agent 去接。

## 把一条素材先变成可读的稿子

video-use 的入口不是画面，而是声音。

它用 ElevenLabs Scribe 做音频转写，拿到逐词时间戳、说话人分离和音频事件标记，比如笑声、叹息、掌声。然后把这些结果打包成一个约 12KB 的 takes_packed.md。

这个文件才是 LLM 的主要阅读材料。

这一步很关键。传统思路会让模型硬看大量帧，源材料里给的对比是 30000 帧乘以 1500 tokens，大约 4500 万 tokens 噪声。video-use 换了一条路，用 12KB 文本加少量 PNG 解决大部分理解问题。

对创作者来说，这个差别不是技术洁癖，而是工作流差别。剪辑时真正频繁决策的地方，往往不是每一帧的像素，而是这句话要不要留、停顿是否尴尬、重拍里哪一段表达更顺、字幕是否压住画面。

这些判断，先读文本反而更接近人的粗剪过程。

## 只在切点附近看时间线

video-use 没有彻底放弃视觉信息。

它的第二层是按需生成视觉时间线视图。只有遇到歧义停顿、重拍对比、切点校验这类决策点时，才调用 timeline_view.py 生成复合 PNG。

这个 PNG 里有胶片帧、波形和字幕。LLM 不需要把整条视频当成连续画面吞进去，只需要在关键位置补一眼。

这像一个剪辑助理的工作方式。先看口播稿和时间码，标出可能要切的位置，遇到不确定的地方再打开时间线确认。

源材料把这个思路和 Browser Use 做了类比。Browser Use 让 LLM 读结构化 DOM，而不是直接盯着截图猜网页。video-use 则让 LLM 读结构化转写，而不是把视频拆成巨量图片。

我认为这才是创作者该偷师的地方。AI 视频工作流不一定要从“让模型理解所有画面”开始，也可以先把视频转成更适合推理的中间形态。

## 让 Agent 交付一个可改的剪辑决定

video-use 的流水线是 Transcribe、Pack、Reason、EDL、Render、Self-Eval。

前两步把素材变成可读文本。中间的 Reason 由 LLM 完成，必要时看时间线图。然后 subagents 生成 JSON 格式的 edl.json，里面包含源文件、切点、节奏标签、引用和原因。

这个 EDL 很重要。

如果 AI 只吐出一个成片，创作者很难追问它为什么这么剪，也很难稳定批量改稿。EDL 把剪辑决定显性化，保留了可检查、可复用、可回滚的中间层。

后面的 render.py 再接手真正渲染，做分段提取、无损 concat、叠动画、压字幕和响度标准化。最后 timeline_view.py 加 LLM 在输出文件的每个切点前后 1.5 秒检查跳帧、爆音、字幕遮挡，最多 3 轮。

所以它不是一个“自动剪完就交差”的玩具流程。它把创作者最常返工的几个点拆开了，切点、字幕、动画、响度、自检，每一步都有明确产物。

## 粗剪、校验和批量改稿才是重点

如果把 video-use 当 Premiere 或 CapCut 替代品，会看偏。

它更适合进入现有创作链条，先接管那些规则明确、重复度高、需要耐心的环节。

比如一条访谈素材里有多次重拍。LLM 先读 takes_packed.md，找到表达完整的一版，再用时间线图确认停顿和切点。它输出 edl.json 后，渲染脚本按规则生成粗剪版本。

创作者拿到的不是一个神秘成片，而是一组可以检查的剪辑决定。

再比如批量改稿。你可以围绕“把开头压短”“保留某个话题”“删掉明显停顿”“字幕不要被动画遮挡”这类目标，让 Agent 重新生成 EDL，再由同一套渲染链路出片。

真正省下来的不是一次点击，而是不用每次都重新在时间线上找位置。

## 这套流程里最值得复用的经验

video-use 的工程细节很像给 AI 剪辑加了一组护栏。

分段提取后用 -c copy 拼接，避免不必要的二次编码。每段边界加 30ms 音频淡入淡出，减少切点爆音。overlay 用 setpts 做时移，确保动画第 0 帧对齐输出时间线。字幕始终最后叠加，避免被动画遮挡。

它还把 Master SRT 映射到输出时间轴，用 output_time 等于 word.start 减 segment_start 再加 segment_offset。切点必须落在词边界，并加 30 到 200ms 填充，用来吸收 Scribe 50 到 100ms 的时间戳漂移。

这些细节不像发布文案里最亮眼的部分，却是工作流能不能真的交付的部分。

创作者可以复用的不是每一行脚本，而是这四个判断。

- 让 LLM 先读结构化材料，不要把原始视频直接塞给它
- 在切点、重拍、字幕遮挡这类位置才引入视觉校验
- 用 EDL 保留剪辑决定，不要只保留最终视频
- 把字幕、音频淡入淡出、响度、HDR 转换放进固定渲染规则

这些规则一旦稳定，AI 才适合接粗剪和批量改稿。否则它每次都像临场发挥，创作者还得从头检查。

## 该从哪一个场景验证

最适合验证 video-use 的，不是高包装商业片，而是一条结构清楚的口播或访谈素材。

选一段有重拍、有停顿、有明确主题的素材。先让流程生成转写和 packed transcript，再看 EDL 是否能解释每个切点。不要一开始就追求完整包装，先确认它能不能把“哪里该切、为什么切”说清楚。

如果 EDL 质量过关，再让 render.py 输出粗剪，重点检查切点前后 1.5 秒。跳帧、爆音、字幕遮挡，这三个问题比风格好不好看更早决定能不能进入日常工作流。

动画包装可以后置。源材料里提到的 HyperFrames、Remotion、Manim、PIL 加 PNG sequence，分别适合产品 UI、React 组件化动画、技术解释动画和简单卡片效果。对多数创作者来说，先把粗剪和字幕稳定下来，收益更直接。

我会把 video-use 看成一个信号。AI 剪视频的下一步，不一定是模型一次性理解所有画面，而是把视频拆成文本、时间线图、EDL、渲染规则这些可控中间层。

等这条链路跑顺，创作者交给 AI 的就不是“帮我剪一下”，而是“按这个目标改这一版，并告诉我每个切点为什么存在”。

这才像一个能一起工作的剪辑助理。

## 相关链接

- X 原帖，https://x.com/shao__meng/status/2072644710523691110
- video-use 项目入口，https://t.co/hNvPUV0yFz
- Browser Use，https://github.com/browser-use/browser-use
- ffmpeg 文档，https://ffmpeg.org/documentation.html

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
