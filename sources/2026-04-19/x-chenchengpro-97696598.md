---
title: "续上条 Tailscale 自建 DERP 的帖子。  昨天搭好一切正常，今天 Tailscale 后台弹了个 Relay Server Unavailable。SSH 上去看，derper 在跑，日"
source: "X @chenchengpro"
url: "https://x.com/chenchengpro/status/2041753163175490044"
date: "Wed Apr 08 05:41:02 +0000 2026"
likes: 116
reposts: 8
replies: 13
---

续上条 Tailscale 自建 DERP 的帖子。

昨天搭好一切正常，今天 Tailscale 后台弹了个 Relay Server Unavailable。SSH 上去看，derper 在跑，日志全是 TLS handshake error: connection reset by peer。

服务器 curl 自己 → 200 OK。外部 openssl 连 443 → 证书有效。外部 curl 连 443 → SSL_ERROR_SYSCALL，握手被 reset。诡异的是本地正常、外部挂了。

试了下 HTTP 80 端口，阿里云直接返回了一个拦截页：「Non-compliance ICP Filing」。破案了。

域名没在阿里云做 ICP 备案。阿里云会对 80/443 入方向流量做 SNI 检测，域名没备案就 reset 连接。服务器自测没问题是因为 localhost 不过这层检测。昨天能用是因为检测有延迟，今天才生效。

修复：DERP 端口从 443 改到 8443，阿里云 ICP 检测只查标准端口。代价是 Let's Encrypt 的 TLS-ALPN 自动续期走 443，非标端口用不了，只能手动管理证书。

改完 tailscale netcheck：ali-hz 11.7ms，通了。

如果你也用国内 VPS 搭 DERP，域名没备案的话，务必避开 80 和 443。这个坑最隐蔽——服务器本地自测完全正常，只有外部访问才被拦。
