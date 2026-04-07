---
status: draft
topic: topics/2026-04-07/topic-3.md
source_url: https://x.com/ggerganov/status/2039804601810001921
generated_at: 2026-04-07T20:00:00+08:00
---

# ggerganov一条推文1800赞，我照做了，手机秒变AI终端

昨天刷X的时候看到一个数字，让我愣了几秒。

ggerganov，就是那个写llama.cpp的男人，一条推文拿了1858个赞。不是发布新模型，不是什么重大更新，就是一个"小技巧"。

他把Mac Studio上跑的llama.cpp，通过Tailscale组网，直接在iPhone上用浏览器访问WebUI。没有第三方App，没有云服务商，没有月费。手机上打开网页，就是完整的AI对话体验，速度和坐在电脑前一模一样。

我看完立刻动手试了。

## 这到底是什么操作

先说原理，极其简单。

Tailscale是一个基于WireGuard的组网工具，装上之后你的所有设备会被分配到同一个虚拟局域网里。不需要公网IP，不需要配端口转发，不需要碰路由器。

llama.cpp自带一个WebUI，启动server之后在浏览器里就能用。默认监听本机端口。

把这两件事拼起来：Mac Studio跑llama.cpp server，手机装Tailscale，在手机浏览器里输入Mac Studio的Tailscale内网IP加端口号，完事了。

ggerganov演示的是Gemma 4，在Mac Studio的M系列芯片上推理速度非常快，手机端体验就是流式输出，几乎感受不到网络延迟。

整个链路的数据传输走的是WireGuard加密隧道，端到端加密，不经过任何第三方服务器。

## 为什么这件事让英文社区炸了

102个转发、57条回复，在技术推文里这个互动量相当炸裂。

我翻了一圈评论区，发现大家兴奋的点不是技术本身，是"觉醒感"。

很多人之前的思路是这样的：想在手机上用本地AI → 找手机端推理方案 → 发现手机算力不够 → 要么忍受慢速要么付费用云API。

ggerganov这条推文打碎了这个思维定式。你家里的Mac Studio、你的游戏PC、你办公室的工作站，这些算力一直在那里闲着。你只是缺一根"虚拟网线"把手机和它们连起来。

评论区里有人说"I've been paying $20/month for API access and my RTX 4090 is sitting at home doing nothing"。这种"拍大腿"的反应出现了很多次。

还有一个细节国内几乎没人讨论：这个方案的隐私性。数据全程不出你的设备，不经过OpenAI，不经过任何中转服务器。对于处理敏感文档、公司内部资料的场景，这个价值极大。

## 我跑通之后的真实感受

讲一个可能得罪人的判断：**90%的个人用户根本不需要付费AI订阅。**

如果你有一台M系列Mac或者一张还行的N卡，llama.cpp能跑的开源模型已经覆盖日常80%以上的使用场景。加上Tailscale这层组网，你在地铁上、咖啡馆里、出差酒店里，随时随地都能用上家里那台机器的全部算力。

当然我要收回来一点：如果你重度依赖GPT-4o级别的推理能力，或者需要多模态、实时联网搜索这些功能，云端服务仍然不可替代。但对于写代码、改文档、头脑风暴、翻译这些高频任务，本地方案已经够用了。

实测中唯一让我犹豫的点是：Tailscale在国内的连接稳定性。我的设备之间直连没问题，但如果你的网络环境比较复杂（比如公司内网有严格的防火墙），可能需要自建Headscale或者用Tailscale的中继节点，这会增加一些配置成本。

## 你现在就能做的事

第一步，去Tailscale官网注册，免费版支持最多100台设备，个人用绰绰有余。Mac、Windows、Linux、iOS、Android全平台都有客户端。

第二步，在你算力最强的那台机器上编译最新的llama.cpp，下一个你喜欢的GGUF模型。推荐从Qwen2.5 7B或者Gemma 3 12B开始，对硬件要求不高但效果已经很能打。

启动命令大概长这样：

```bash
./llama-server -m your-model.gguf --host 0.0.0.0 --port 8080
```

注意`--host 0.0.0.0`，这样Tailscale网络里的其他设备才能访问到。

第三步，手机上打开浏览器，输入Tailscale分配给你那台机器的IP地址加8080端口。

没有第三步了。

ggerganov那条推文底下有人问"what about security"，他回了一句"Tailscale handles that"。确实，WireGuard级别的加密，比大多数人自己配的方案都安全。

我现在出门基本不开任何AI App了。Safari里一个书签，点开就是我Mac Studio上跑的Qwen，上下文窗口想开多大开多大，不限速不限量。

这大概就是"本地AI"的终局形态，不是把模型塞进手机里硬跑，而是把你已有的算力通过网络延伸到所有设备上。

1858个赞，说明想明白这件事的人，比我预想的多得多。

---

**相关链接**
- [ggerganov原推文](https://x.com/ggerganov/status/2039804601810001921)
- [Tailscale官网](https://tailscale.com)
- [llama.cpp项目](https://github.com/ggerganov/llama.cpp)
- [Headscale自建方案](https://github.com/juanfont/headscale)
