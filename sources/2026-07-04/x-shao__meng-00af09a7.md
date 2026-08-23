---
title: >-
  AI 视频剪辑 Skill 分享「video-use」 https://t.co/hNvPUV0yFz @browser_use 团队推出的开源
  Skill，定位为面向 AI Coding Agents（Codex、Claude Code、Cursor、Hermes Agent 等）的视频剪辑
  Skill。它不做传统意义上的 Premiere / CapCu
source: X @shao__meng
url: 'https://x.com/shao__meng/status/2072644710523691110'
date: 'Thu Jul 02 11:33:01 +0000 2026'
likes: 76
reposts: 20
replies: 4
source_type: x
language: zh
account_name: shao__meng
fetched_at: '2026-07-03T23:12:59.448Z'
---
AI 视频剪辑 Skill 分享「video-use」
https://t.co/hNvPUV0yFz

@browser_use 团队推出的开源 Skill，定位为面向 AI Coding Agents（Codex、Claude Code、Cursor、Hermes Agent 等）的视频剪辑 Skill。它不做传统意义上的 Premiere / CapCut 替代品，它是一套让 LLM 通过 “阅读转写文本 + 按需可视化” 来理解视频、并调用 ffmpeg 等工具完成剪辑的 prompt-engineering + 工具脚本集合。

# 核心思想：LLM 不“看”视频，它“读”视频

第一层：音频转写文本（always loaded）
通过 ElevenLabs Scribe 获得逐词时间戳、说话人分离、音频事件标记（如笑声、叹息、掌声），打包成约 12KB 的 takes_packed.md。这是 LLM 的主要“阅读材料”。
第二层：视觉时间线视图（on demand）
仅在决策点（歧义停顿、重拍对比、切点校验）调用 timeline_view.py 生成胶片帧 + 波形 + 字幕的 PNG 复合图。

对比朴素方案“30000 帧 × 1500 tokens = 4500 万 tokens 噪声”，项目走的是 “12KB 文本 + 少量 PNG” 的轻量化路径。这与 Browser Use 让 LLM 读结构化 DOM 而非直接看截图的思路一致。

# 技术流水线：Transcribe → Pack → Reason → EDL → Render → Self-Eval

1. 转写 - transcribe. py / transcribe_batch.py
提取 16kHz 单声道音频，调用 ElevenLabs Scribe，缓存为 transcripts/<name>.json
2. 打包 - pack_transcripts.py
将逐词 JSON 合并为按 0.5s 静音或说话人切换断句的 takes_packed.md
3. 决策 - LLM 自身
阅读 packed transcript，必要时用 timeline_view.py 可视化
4. 生成 EDL - subagents
输出 JSON 格式 edl.json，包含源文件、切点、节奏标签、引用、原因
5. 渲染 - render. py
分段提取 → 无损 concat → 叠动画 → 压字幕 → 响度标准化
6. 自评估 - timeline_view.py + LLM
在输出文件的每个切点 ±1.5s 检查跳帧、爆音、字幕遮挡，最多 3 轮

# 关键工程细节： ffmpeg 为主的剪辑实现

1. 分段提取 + -c copy 拼接（避免叠 overlay 时二次编码）
2. 每段边界 30ms 音频淡入淡出（消除切点爆音）
3. overlay 使用 setpts=PTS-STARTPTS+T/TB 进行时移，确保动画第 0 帧对齐输出时间线
4. 字幕始终最后叠加（防止被动画遮挡）
5. Master SRT 使用输出时间轴偏移：output_time = word.start - segment_start + segment_offset
6. 切点必须落在词边界，并加 30–200ms 填充以吸收 Scribe 50–100ms 的时间戳漂移
7. HDR 源自动 tone-map（HLG/PQ → Rec.709 SDR）
8. 竖屏源自动按高度缩放
9. 两-pass loudnorm：-14 LUFS / -1 dBTP / LRA 11，符合主流社交平台标准

# 动画与包装：多引擎并行

1. HyperFrames：HTML/CSS/GSAP compositions，适合产品 UI、网页转视频、动态排版
2. Remotion：React 组件化 compositions
3. Manim：数学/技术/3Blue1Brown 风格解释动画
4. PIL + PNG sequence + ffmpeg：简单卡片、计数器、打字效果

# SKILL.md 的 12 条“铁律”：生产正确性优先

1. 必须遵守的 12 条硬规则：字幕最后、分段提取再拼接、30ms 淡入淡出、PTS 时移、SRT 输出时间偏移、不切在词中、切点填充、逐词 ASR、缓存转写、并行动画、先确认策略再执行、输出在 <videos_dir>/edit/
2. 其余全部是可调整的“worked example”：调色风格、字幕分块、动画时长、节奏等都可按材料和用户品牌定制
