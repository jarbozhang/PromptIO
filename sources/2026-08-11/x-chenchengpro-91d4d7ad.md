---
title: >-
  两个终端里的 Claude Code 能互相发消息了，2.1.224 加的，感觉可以和 herdr 搭配使用。 5 步尝鲜。 1、先升级，claude
  update 升级到 2.1.224 2、敲 /peers 看有没有这个 command，没有就往 ~/.claude/settings.json 的
  env 块里加 "CLAUDE_CODE_HARBOR_
source: X @chenchengpro
url: 'https://x.com/chenchengpro/status/2085911549454197234'
date: 'Sat Aug 08 02:10:42 +0000 2026'
likes: 78
reposts: 10
replies: 6
source_type: x
language: zh
account_name: chenchengpro
fetched_at: '2026-08-11T11:04:31.521Z'
---
两个终端里的 Claude Code 能互相发消息了，2.1.224 加的，感觉可以和 herdr 搭配使用。

5 步尝鲜。

1、先升级，claude update 升级到 2.1.224
2、敲 /peers 看有没有这个 command，没有就往 ~/.claude/settings.json 的 env 块里加 "CLAUDE_CODE_HARBOR_KITE":  "1"，不需要等官方开 feature flag
3、推荐 ~/.claude/settings.json 里再加个 "crossSessionInbound": "accept"，不加的话消息会先 hold 等确认
4、开 claude 进程，此时在 /tmp/cc-socks/ 会看到每个回话一个 0600 的 socket 文件
5、然后可以就可以相互发消息了，比如。
用 ListAgents 列一下现在有哪些 peer 会话
给 review session 发消息：帮我看下 src/db.ts 的连接池配置，回给我
