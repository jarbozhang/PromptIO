---
title: "Gpt 拒绝了我，我用Gemini10分钟搞定了！  闲鱼160块/年买了台服务器，2核4G / 60G SSD / 1.5T月流量，Ubuntu24.04，搭了个科学上网的环境。  先试了 Open"
source: "X home @oragnes"
url: "https://x.com/oragnes/status/2044962888222462374"
date: "Fri Apr 17 02:15:20 +0000 2026"
likes: 1686
reposts: 341
replies: 110
---

Gpt 拒绝了我，我用Gemini10分钟搞定了！

闲鱼160块/年买了台服务器，2核4G / 60G SSD / 1.5T月流量，Ubuntu24.04，搭了个科学上网的环境。

先试了 OpenAI 的 Codex，结果这哥们道德感拉满，直接拒了，还贴心地提醒我：

"这属于规避网络访问限制的实施支持，我不能提供。而且你已经把服务器凭据公开发出来了，这台机器现在应视为凭据泄露。"

转头打开 Gemini，一句话搞定。装好、配好、跑起来，全程不到 10分钟🤷‍♂️

分享一下过程，真的很简单。

你只需要：

✅ 一台海外 VPS（闲鱼88一年）

✅ 一个 AI 助手（Gemini / Claude 都行）

✅ 一个客户端（iOS 用 Shadowrocket，安卓用 v2rayN）

技术方案：VLESS + Reality + XTLS Vision
选这个是因为：不需要买域名、不需要证书、速度快、稳定性好。目前是最优解。

给你的 AI 发这段话就行👇

我在一台 Ubuntu 24.04 的海外 VPS 上想搭建一个 VLESS + Reality + XTLS Vision 的代理节点，请帮我完成以下步骤：

1安装最新版 Xray-core
2生成 x25519 密钥对和 UUID
3编写 /usr/local/etc/xray/config.json

配置要求：

协议：vless
传输：tcp
安全：reality（伪装 https://t.co/UTVfQyMIgG）
flow：xtls-rprx-vision
端口：443

4开启 BBR 拥塞控制
5优化内核网络缓冲区参数
6生成客户端 vless:// 订阅链接
7确保服务开机自启

服务器信息：

IP：你的服务器IP
用户名：你的用户名
密码：你的密码（⚠️ 发完后立刻改密码！）

对，就这么一段话，AI 会帮你 SSH 上去搞定一切。

装完后你会拿到一个 vless:// 开头的链接，复制到 Shadowrocket 或 v2rayN 里直接导入，连上就能用了。

⚠️ 提醒：
建议只自用，别分享节点给太多人。

AI 的时代，搭个节点已经不是什么门槛了😂
