---
title: "OpenClaw和Hermes浅用对比：  1、直观感受：OpenClaw比较慢比较耗token，Hermes比较快比较省，大概30%。  2、回复模式：OpenClaw之所以慢，有一部分原因是没有披"
source: "X home @MrLarus"
url: "https://x.com/MrLarus/status/2043215836521902444"
date: "Sun Apr 12 06:33:11 +0000 2026"
likes: 389
reposts: 49
replies: 25
---

OpenClaw和Hermes浅用对比：

1、直观感受：OpenClaw比较慢比较耗token，Hermes比较快比较省，大概30%。

2、回复模式：OpenClaw之所以慢，有一部分原因是没有披露执行明细，而Hermes会，也就是@yetone 说的把 trajectory 暴露出来了，这确实不是一个好的方法，显得比较粗糙不优雅，并且大部分人也不会去细看，它就像是一个动态一直在喊“我在干活”。

我尝试过让OpenClaw在执行任务时，通过Telegram的edit message，给我更新状态，比如🟡starting、🟢running、🔵thinking，类似AI IDE。不过不太明显，太明显可能会加重执行成本和复杂性。

3、webUI：Hermes目前没有官方webUI，目前用比较多的方案是：https://t.co/lJri10tqRQ

4、记忆管理：Hermes 在记忆管理上比 OpenClaw 更加自动化，它的Hindsight 机制会在对话的时候，根据需要，异步将内容持久化到本地，自动更新记忆，记住用户的喜好和要求。

而OpenClaw 像手动挡汽车，处理完一个事情后，我习惯叫他落盘日志。不过现在已经设置了每天凌晨定时整理，算是一个兜底的动作。并增加了做梦能力，使用的项目是：https://t.co/dKWpAmDhCN

5、通道能力细节：目前发现，在channel的管理和使用上，OpenClaw的能力比较全面。

比如我拉了个群，让他们两个可以沟通经验，给我汇报。我让他们给我点个赞，OpenClaw可以前置处理，很快反应，反而Hermes要经历一个推理流程才点赞。
