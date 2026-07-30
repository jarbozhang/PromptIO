---
title: >-
  两个 Claude Code 账号，到今天都还活着。 两件事而已：钱怎么付，流量从哪出。 支付上两个号我是分开的。一个走 Apple
  美区礼品卡。官网买卡，App Store 兑换，在 Anthropic 里选 Apple Pay 订阅。另一个走 Android，装个 Claude app
  直接 Google Play 内购，Google 账户绑一张国内的 
source: X @chenchengpro
url: 'https://x.com/chenchengpro/status/2082454941806047492'
date: 'Wed Jul 29 13:15:22 +0000 2026'
likes: 141
reposts: 12
replies: 83
source_type: x
language: zh
account_name: chenchengpro
fetched_at: '2026-07-30T11:14:03.879Z'
---
两个 Claude Code 账号，到今天都还活着。

两件事而已：钱怎么付，流量从哪出。

支付上两个号我是分开的。一个走 Apple 美区礼品卡。官网买卡，App Store 兑换，在 Anthropic 里选 Apple Pay 订阅。另一个走 Android，装个 Claude app 直接 Google Play 内购，Google 账户绑一张国内的 Visa 就能扣，不用礼品卡，也不用 Apple 设备。

虚拟卡我没碰。身边有人用那个被封了。

网络也是两套。两个号各配一个家宽 IP，webshare 买的，$2 不到一个，直连，不搭中转，少一层就少一层。两个号也从来不在同一台机器上登，真出事不至于一锅端。

IP 买回来只是第一步。真正要盯的是所有到 Claude 的流量都从同一个出口走。每台机器的 Surge 里单独配一组规则，https://t.co/gzOove8JgP、https://t.co/x5TfhPfWTk 这些全指向它自己那个家宽，其他流量走别的。不管在家还是在公司，不管我这个月换了几个机场，Claude 那头看到的永远是同一个 IP。

国内直连 webshare 不通，得套一层。链路是 本机 → 翻墙节点 → webshare 家宽 → Claude。

「不在同一台机器上用」这条我不确定有没有必要。扒过 Claude Code 的代码，它不认硬件指纹，认的是账号和 IP，机器本身不重要。所以可能纯属我多虑。但两个号都活着，我就不动它了。

你的号还活着吗？
