---
title: "pi 有个功能我很喜欢，当Agent在运行时，你再给他发消息，既不会打断运行，也不会排队到Agent运行完毕。 而是在Agent下一次tool call之前插入，这样可以灵活的给一个long-runn"
source: "X @9hills"
url: "https://x.com/9hills/status/2055239374019977642"
date: "2026-05-15T10:50:25.000Z"
likes: 85
reposts: 8
replies: 18
tweet_id: "2055239374019977642"
author: "9hills"
---
pi 有个功能我很喜欢，当Agent在运行时，你再给他发消息，既不会打断运行，也不会排队到Agent运行完毕。

而是在Agent下一次tool call之前插入，这样可以灵活的给一个long-running的agent 注入指令。

比如我这个主Agent老是要自己写代码，我就给他发个规则：禁止主Agent自己写代码和做测试。
