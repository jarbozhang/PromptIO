---
title: >-
  让 AI 写方案这件事，最烦的是它给完计划就甩手，每一步还得你自己推。Supergoal 这个 Claude Code / Codex CLI
  插件反过来想：/goal 本身就是"end-state 条件 +
  每轮转录后求值"的自动循环引擎，缺的从来不是执行力，而是一份够深、拆好、写到磁盘、自带自检自愈的规划。它没自创任何引擎，只是把这层规划补齐了。 你全程
source: X @chenchengpro
url: 'https://x.com/chenchengpro/status/2063280248591200267'
date: 'Sat Jun 06 15:21:59 +0000 2026'
likes: 68
reposts: 12
replies: 35
source_type: x
language: zh
account_name: chenchengpro
fetched_at: '2026-06-17T03:16:02.868Z'
---
让 AI 写方案这件事，最烦的是它给完计划就甩手，每一步还得你自己推。Supergoal 这个 Claude Code / Codex CLI 插件反过来想：/goal 本身就是"end-state 条件 + 每轮转录后求值"的自动循环引擎，缺的从来不是执行力，而是一份够深、拆好、写到磁盘、自带自检自愈的规划。它没自创任何引擎，只是把这层规划补齐了。

你全程只动两次手：审批规划、粘贴一行 /goal。打一句 /supergoal <任务>，它先加载记忆、并行扫码库、列 top-3 风险，再按任务自适应拆阶段，小改 2 个，全栈 greenfield 8-12+，绝不强凑 5 或 3。ROADMAP、STATE、每个 phase 的可验收 spec 全落到 .supergoal/ 磁盘上，还会自我批判一轮、就地改写模糊的验收标准。

派发前先做一次 pre-flight smoke check：跑去重后的 build/typecheck/lint/test，绿了（PREFLIGHT_GREEN）才打印 /goal，免得对着一个本就坏掉的基线空打三振死循环。

执行环里最硬的两点。一是每个 phase 验证都含 cleanliness pass，用 grep 在完整工作树（committed + staged + unstaged + untracked）里数 debug 打印、临时 TODO、死 import，没清干净照样算失败，除非 spec 显式写了 Cleanliness override。二是失败走三振升级：第一次注入 probe 自动重试，第二次自动写 phase-N.fix.md 内联修，第三次才停下来交还给人。

跑完最后一个 phase 也不直接收工，先做 Final Audit：用派发时记下的 Baseline ref（HEAD sha）把每一条声明的 deliverable 在完整工作树里逐项比对，专抓"agent 说做完但根本没 ship"的情况，最多 3 轮自愈；完结时给一个 audit coverage %，UI/UX 这类靠 trust-prior-verify 的主观项超过 30% 还会在顶部加黄条，提醒你上线前肉眼复核。

每个阶段结尾它都会写回一条 non-obvious 记忆，API 怪癖、用户偏好、失败-修复模式，下次同类任务起手就更聪明。装法也轻：Claude Code 走 /plugin marketplace 一键装（~307 token 常驻 + ~10k 调用时加载），Codex CLI 手动 clone 到 ~/.codex/skills/，核心逻辑同一套。说到底，它的价值不是发明了什么新东西，而是把 /goal 用到了它本该被用的深度，让"先想清楚、再无人值守跑完"真的成立。

https://t.co/JT2lV3rB3i
