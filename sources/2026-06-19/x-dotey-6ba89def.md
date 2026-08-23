---
title: >-
  OpenAI Codex 上线了 Record & Replay 功能：在 Mac 上把一个重复性操作演示一遍，Codex
  会观察你的操作过程，自动生成一个可复用的 Skill。下次遇到同样的任务，换一组输入参数，Codex 就能替你重新执行。 目前仅限
  macOS，欧盟地区暂不可用，使用前需要先开启 Computer Use。 这个功能解决的问题很具体。很
source: X @dotey
url: 'https://x.com/dotey/status/2067699358586253663'
date: 'Thu Jun 18 20:01:57 +0000 2026'
likes: 703
reposts: 113
replies: 87
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-06-19T14:40:10.372Z'
---
OpenAI Codex 上线了 Record & Replay 功能：在 Mac 上把一个重复性操作演示一遍，Codex 会观察你的操作过程，自动生成一个可复用的 Skill。下次遇到同样的任务，换一组输入参数，Codex 就能替你重新执行。

目前仅限 macOS，欧盟地区暂不可用，使用前需要先开启 Computer Use。

这个功能解决的问题很具体。很多日常工作流程步骤固定但难以用文字描述清楚：报销填单要选对科目和审批人，发布视频要按固定顺序填标题、标签、缩略图，创建 issue 要勾选特定的标签和指派人。以前想让 AI 帮你做这些事，你得把每一步写成精确的指令。Record & Replay 的思路是，与其写说明书，不如做一遍给它看。

操作流程不复杂。在 Codex 桌面端打开 Plugins，点加号菜单，选 Record a skill，然后正常在 Mac 上完成一遍操作。完成后停止录制，Codex 会分析你的操作，生成一份 Skill 文件，里面包含触发条件、所需输入、执行步骤和验证方式。这份 Skill 可以检查、可以编辑，不是黑盒。

重放的时候，开一个新对话，告诉 Codex 用这个 Skill，给它这次不同的参数就行。Codex 会结合 Computer Use（桌面操控）、浏览器操作和已连接的 plugin 来完成任务。
