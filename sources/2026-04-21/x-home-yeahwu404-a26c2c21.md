---
title: "自撸的一键代理脚本（项目 3.5k Star），主用于VPS或服务器上安装代理，优先使用 Reality 或 Hysteria2，支持大多数 Linux 发行版：  https://t.co/GtBu"
source: "X home @yeahwu404"
url: "https://x.com/yeahwu404/status/2045821107132104929"
date: "Sun Apr 19 11:05:36 +0000 2026"
likes: 203
reposts: 23
replies: 12
---

自撸的一键代理脚本（项目 3.5k Star），主用于VPS或服务器上安装代理，优先使用 Reality 或 Hysteria2，支持大多数 Linux 发行版：

https://t.co/GtBu6xwNhL

场景推荐：

1. 用 Shadowsocks（SS） ：主要用于国外落地，不要直连，易封IP

2. 用 WS + TLS（WSS）：需域名 + 443端口，容易封端口，适合前置套 CF 使用

3. Reality（xtls-rprx-vision）：目前抗检测能力最强之一，适用于海外直连

4. Hysteria2：偏“暴力”发包，主要走 UDP，适用于海外无优化线路机

5. HTTPS 正向代理（类 naiveproxy）：基本不挑客户端，但需要域名 + 443 端口，抗封锁，适用于海外直连

提醒：直连机请选择 Reality 或 HTTPS 正向代理，二选一即可。SS / WSS 不适合直连，容易导致 IP 或端口被封。
