---
title: "之前一直用 ZeroTier 组网，连我的 Mac Mini、MacBook 和阿里云 VPS。能用，但体验一般：节点发现慢，NAT 打洞成功率不稳定，偶尔断连要手动重启服务，控制台也比较简陋。

上"
source: "X @chenchengpro"
url: "https://x.com/chenchengpro/status/2041516477258613107"
date: "Tue Apr 07 14:00:32 +0000 2026"
likes: 478
reposts: 68
replies: 25
---

之前一直用 ZeroTier 组网，连我的 Mac Mini、MacBook 和阿里云 VPS。能用，但体验一般：节点发现慢，NAT 打洞成功率不稳定，偶尔断连要手动重启服务，控制台也比较简陋。

上周续费了阿里云 ¥99/年的轻量主机（杭州），顺手把组网方案从 ZeroTier 切到了 Tailscale，并用 Claude Code 全程 SSH 上去搭了一个自建 DERP 中继节点。整个过程大概 10 分钟，记录一下。

先说为什么要自建 DERP。Tailscale 本身开箱即用，装上登录就能组网，体验比 ZeroTier 好很多。但它的 DERP 中继服务器遍布全球唯独没有中国大陆节点。两台国内设备如果 P2P 打洞失败，流量就要绕到海外中继再回来，延迟 300ms 起步。自建一个国内节点，中继延迟可以压到 20ms 以内。

搭建步骤：

① 域名解析。我用了一个子域名，A 记录指向阿里云 VPS 的公网 IP。域名是必需的，因为 DERP 跑在 HTTPS 上（伪装成普通网页流量穿透防火墙），而 HTTPS 证书需要绑域名。当然不想买域名也能用 IP + 自签证书，但要在客户端配 InsecureForTests，不推荐。

② 编译安装 derper。VPS 上装 Go，然后一行命令： GOPROXY=https://t.co/fQlICGA05A,direct go install https://t.co/nQiTG7JfoQ 国内 VPS 必须设 GOPROXY，否则访问 Google 的 Go 模块代理会超时。

③ 配 systemd 跑起来： derper -hostname YOUR_DOMAIN -a :443 -stun -stun-port 3478 -certmode letsencrypt 内置 Let's Encrypt 自动签证书和续期，零运维。

④ Tailscale 控制台 ACL 里加 derpMap，填上 HostName、IPv4 和端口。OmitDefaultRegions 留 false，官方节点做备份。

踩的坑：

坑一：配完 tailscale netcheck 显示自建节点延迟为空。用 --verbose 一看，STUN 包发了三次零响应。原因是阿里云安全组默认不放行 UDP，去 ECS 控制台加一条入方向规则：UDP / 3478 / 0.0.0.0/0，加完秒通。TCP 443 一般默认开着，但 UDP 3478 这个 STUN 端口很容易漏。

坑二：通了但延迟 311ms，比官方洛杉矶节点还高。排查发现 macOS 上 Surge 的 TUN 模式截获了 Tailscale 守护进程的流量，绕美国代理出去再回国内。修复：Surge 规则里给 https://t.co/RlLJcxdTbF 加 PROCESS-NAME DIRECT。

对比 ZeroTier：Tailscale 基于 WireGuard，握手快、延迟低、断线重连几乎无感。管理后台的 ACL、MagicDNS、Exit Node 这些功能也比 ZeroTier 成熟很多。免费版支持 100 台设备和 3 个用户，个人够用。那台 ¥99 的阿里云小主机，之前只是跑个博客，现在又多了 DERP 中继这个角色，算是物尽其用了。
