---
title: >-
  如果你 token 多的用不完，又没啥好玩的事情，给你一个项目 decode-codex 玩玩：反编译 Codex App 代码 这个项目当前就两个
  Skills： 1. codex-app-ref-refresh skill 解包已安装的
  https://t.co/huJYxhc2y5（app.asar）到 ./ref 并格式化./ref/ 2. deob
source: X @dotey
url: 'https://x.com/dotey/status/2069968182824099924'
date: 'Thu Jun 25 02:17:27 +0000 2026'
likes: 221
reposts: 26
replies: 68
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-06-25T23:00:31.951Z'
---
如果你 token 多的用不完，又没啥好玩的事情，给你一个项目 decode-codex 玩玩：反编译 Codex App 代码

这个项目当前就两个 Skills：

1. codex-app-ref-refresh skill
解包已安装的 https://t.co/huJYxhc2y5（app.asar）到 ./ref 并格式化./ref/

2. deobfuscate-javascript skill
把 ref/webview/assets 里打包的 JS 反混淆成命名有意义的可读代码./restored/

用法很简单，确保你安装了 Codex App。

先使用 codex-app-ref-refresh skill 把里面的代码解包提取出来。

然后使用 deobfuscate-javascript skill 把提取出来的代码变成可以正常阅读的代码，这一步要配合 /goal，不然还原不了多少文件。

项目地址：https://t.co/9eYnWmQWWU

建议 fork 到自己的Repo，自己测试。
