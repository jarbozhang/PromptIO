---
title: "Xray 官方公告？把中国封杀了？ 来，给你讲清楚这事 \U0001F923 哈哈，真相反了反了。 事情是这样的：2026-07-02 中午，有人发现自家服务器上 VLESS + REALITY + XHTTP 走 443 端口的，从中国方向突然连不上了。 然后一查，发现这不是 Xray 封了中国，是中国把 Xray 给揍了。 抓包证据： • 服务器一直在正常监听，海外能连"
source: X @gxjdian
url: 'https://x.com/gxjdian/status/2073699206079131678'
date: 'Sun Jul 05 09:23:12 +0000 2026'
likes: 203
reposts: 23
replies: 29
source_type: x
language: zh
account_name: gxjdian
fetched_at: '2026-07-08T23:13:37.832Z'
---
Xray 官方公告？把中国封杀了？

来，给你讲清楚这事 🤣

哈哈，真相反了反了。

事情是这样的：2026-07-02 中午，有人发现自家服务器上 VLESS + REALITY + XHTTP 走 443 端口的，从中国方向突然连不上了。

然后一查，发现这不是 Xray 封了中国，是中国把 Xray 给揍了。

抓包证据：

• 服务器一直在正常监听，海外能连
• 但中国的 TCP 三次握手就是完不成——SYN 过去了，SYN-ACK 回来了，但第三次握手永远等不到
• 同时大量"陌生人"的 TLS ClientHello 打到服务器上，带的 SNI 全是奇怪的域名：node8 . fnyus . shop、node6 . fnyus . shop……
• 这些都不是用户配的 REALITY serverName

说白了，GFW 在主动探测。

它先拿一堆带假 SNI 的 ClientHello 来摸你的 REALITY 配置，摸到了，就开始干扰你的 TCP 连接——只拦中国方向的，海外不受影响。

那跟 SingBox 有啥关系？

你问"这是SingBox和Xray又吵架了吗"——哈哈不是的，这次的锅不在开源社区内讧，是 GFW 的锅。

不过说到 Xray 和 SingBox 的恩怨，那确实是一出连续剧：

• 早期 XTLS 团队和 SagerNet 团队分家
• 双方互撕协议设计理念
• SingBox 走"一切都可以被 SingBox 替代"路线，Xray 走"极致优化"路线
• 社区里天天有人互怼

但这次真不是他们俩打架。这次是外敌入侵。

一句话总结：

不是 Xray 把中国封了，是 GFW 开新技能了——针对 VLESS+REALITY+XHTTP 的主动探测 + TCP 握手阻断。

Xray 用户瑟瑟发抖中 😂
