---
title: >-
  给 qodercli 加了「跨会话消息功能」 1\ 这是我来 qodercli 以来加的最重的功能，总耗时一天左右。 2\ 我有个 loop 会在
  claude code 发新版时自动拉 changelog 和代码，分析每一项新功能的实现。8.7 深夜，针对 claude code
  2.1.224，生成了十三份分析文档。其中一份有一千零一十一行，讲一个新功能
source: X @chenchengpro
url: 'https://x.com/chenchengpro/status/2087173372668989592'
date: 'Tue Aug 11 13:44:44 +0000 2026'
likes: 57
reposts: 3
replies: 52
source_type: x
language: zh
account_name: chenchengpro
fetched_at: '2026-08-13T11:05:16.223Z'
---
给 qodercli 加了「跨会话消息功能」

1\ 这是我来 qodercli 以来加的最重的功能，总耗时一天左右。

2\ 我有个 loop 会在 claude code 发新版时自动拉 changelog 和代码，分析每一项新功能的实现。8.7 深夜，针对 claude code 2.1.224，生成了十三份分析文档。其中一份有一千零一十一行，讲一个新功能，同一台机器上的两个会话可以互相发现、互相发消息。一个会话干完活，可以直接叫另一个会话接着干，不用人在两个终端之间复制粘贴。

3\ 8.8 早上闲着没事刷推，发现 claude code 在宣传这个功能，就留意了下，然后拿着分析文档让 agent 照着给 qodercli 也加一份。指令是「i want to impl to qodercli, full feature」，用我的 one-shot skill 实施。2 个小时后 mvp 完成了，47 个文件，5513 行，152 个新测试。发群里大家觉得还不错。

4\ 8.9 歇了一天，8.10 PD 催了，于是下午开始补细节。细节太多，补了 20 来个 commit 到晚上才补完。然后开始用 claude code 和 codex 等，用不同的模型做交叉 review。合计 40 多条 review 建议，然后慢慢 fix，直到 8.11 上午才最终完成。

5\ 8.11 上午推分支找同事 review，基本上没啥新增问题了，只处理了一个。同时让 agent 写了份 1722 行的测试手册给测试同学，46 个用例，功能细节还是很多的。

6\ 8.11 晚，随 v1.1.19 版上线。
