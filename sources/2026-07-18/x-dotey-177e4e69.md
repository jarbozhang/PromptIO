---
title: >-
  OpenAI 正面回应了 GPT-5.6 在用户电脑上删文件这事，结论是：GPT-5.6 在执行编程任务时，可能会把用户的整个主目录（$HOME）给删了。
  出现这种问题的原因是这样的： 用户开启了 Codex 的完全访问模式（Full Access），关掉了沙盒保护，也没开自动审查（Auto
  Review）。模型在做清理任务时，试图重写 $HOME 环境变量
source: X @dotey
url: 'https://x.com/dotey/status/2078157710889976082'
date: 'Fri Jul 17 16:39:43 +0000 2026'
likes: 51
reposts: 3
replies: 22
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-07-17T23:13:08.595Z'
---
OpenAI 正面回应了 GPT-5.6 在用户电脑上删文件这事，结论是：GPT-5.6 在执行编程任务时，可能会把用户的整个主目录（$HOME）给删了。

出现这种问题的原因是这样的：
用户开启了 Codex 的完全访问模式（Full Access），关掉了沙盒保护，也没开自动审查（Auto Review）。模型在做清理任务时，试图重写 $HOME 环境变量来指定一个临时目录，结果搞混了，把真正的 $HOME 目录删掉了。

Tibo 说 OpenAI 正在采取措施：更新开发者提示信息，引导用户使用更安全的权限模式，在 Codex 的 Harness 加额外的安全检查。他还承诺几天内会发一篇详细的事后分析报告。
