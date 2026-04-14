# 300 token/s，ggerganov 用一台三年前的 Mac 干掉了我的 API 账单

昨天刷推看到 ggerganov 发了一条视频，在 iPhone 上流畅地跟 Gemma 4 对话，速度快到我以为他接了 Google 的 API。

然后我看到了配置，Mac Studio M2 Ultra，三年前的机器，跑 Gemma 4 26B，300 token/s。

我愣了几秒。我每个月花在 API 上的钱，够买这台机器的内存条了。

## 这套东西到底是怎么跑的

ggerganov 是 llama.cpp 的作者，这次他展示的其实不是什么新功能，而是把几个已有的东西串起来了。

llama.cpp 现在自带 WebUI。不需要装任何第三方 app，编译完直接开浏览器就能用。手机上也是，Safari 打开就行，体验跟用 ChatGPT 网页版几乎一样。

关键一步是 Tailscale。这是一个基于 WireGuard 的组网工具，Mac 和 iPhone 各装一个，两台设备就在同一个虚拟局域网里了。不用配端口转发，不用搞 DDNS，不用碰路由器。

所以整个链路就是，Mac Studio 跑 llama.cpp server，Tailscale 把手机和 Mac 连起来，手机浏览器访问 Mac 的 Tailscale IP 加端口，完事。

300 token/s 这个数字需要解释一下。他用的是 Gemma 4 26B 的 A4B 版本，也就是 Mixture of Experts，激活参数只有 4B。量化用的 Q8_0，基本是无损的全精度。再加上 llama.cpp 的 prompt speculative decoding，具体来说是用 ngram hashing 来预测后续 token，一次最多猜 64 个 token。这个技巧在代码补全这类重复模式多的场景下效果最炸。

## 我试着复现了一下

坦率讲，我手头没有 M2 Ultra，但我有一台 M1 Max 的 MacBook Pro。跑同一个模型，speculative decoding 开到 64，大概能到 80-90 token/s。

没有 300，但说真的，80 token/s 已经比大部分 API 的体感要快了。

安装过程其实很简单。llama.cpp 克隆下来 make 一把，Tailscale 官网下载装上登录，手机端 App Store 搜 Tailscale 装上同一个账号。然后 Mac 上跑一行命令启动 server，手机浏览器输入 Tailscale 分配的 IP。

我踩的一个坑是，llama.cpp 的 server 默认只监听 127.0.0.1，Tailscale 过来的请求会被拒绝。要加 `--host 0.0.0.0` 才行。这个问题我折腾了十分钟才反应过来。

另一个发现是 MCP support。llama.cpp 现在内置了 MCP 协议支持，可以直接调 web search、HuggingFace、GitHub 这些工具。等于你在手机上不光能聊天，还能让本地模型帮你搜东西、查代码。

这就有意思了。

## 社区里的多种声音

这条推文底下 1800 多个赞，评论区很热闹。

一派人在算经济账。有人说他用 Claude API 一个月花 200 美元，一台 Mac Studio 192GB 内存版大概 5000 美元，两年回本。但也有人反驳说，本地模型的质量跟 Claude 3.5 Sonnet 还是有差距的，省下来的钱要用能力降级来换。

另一派在讨论隐私。有做医疗的开发者说，他们公司政策不允许任何数据过第三方 API，本地推理是刚需不是偏好。

还有一种比较有意思的声音，说 Tailscale 这层其实打开了"个人 AI 云"的想法。你在家里放一台高配 Mac，出门用手机、在公司用笔记本，都连回家里的机器。成本是一次性的，算力是自己的，数据不出家门。

有人已经把这套东西跑在了 Mac Mini 集群上，三台 M4 Pro 组成一个小推理农场，给全家人用。

## 我的判断

我认为本地推理在 2026 年终于过了"能用"的门槛，正在逼近"好用"。

三年前聊本地跑模型，大家的反应是"玩具"。说实话那时候确实是玩具，7B 模型勉强能跑，质量惨不忍睹。但现在 26B MoE 模型能跑到 300 token/s，还带工具调用，这已经不是玩具了。

但我也不觉得本地推理能替代 API。GPT-4o、Claude Opus 这些顶级模型的推理能力，本地 26B 还是够不着。本地推理的甜蜜点是日常对话、代码补全、快速问答这些"够用就行"的场景。

可能有些想法还不成熟，但我觉得未来的最优解大概率是混合模式。轻量任务扔给本地模型，零延迟零成本。复杂推理、长上下文的活儿交给云端 API。

ggerganov 这条推文最让我在意的不是 300 token/s 这个数字，而是"No 3rd party apps"这句话。

llama.cpp 编译完就能跑，浏览器打开就能用，Tailscale 装上就能连。整个链路没有一个需要付费订阅的服务。

这才是真正的变化。

## 想动手的话

如果你有任何 Apple Silicon 的 Mac，今晚就可以试。M1 起步就够用，内存越大能跑的模型越大。32GB 跑 26B Q4 没问题，64GB 可以上 Q8 全精度。

问一个开放的问题，如果本地推理的速度和质量继续按这个节奏涨下去，你还会续费 API 吗？

## 相关链接

- [llama.cpp](https://github.com/ggerganov/llama.cpp)
- [Tailscale](https://tailscale.com/)
- [ggerganov 原推](https://x.com/ggerganov/status/2039804601810001921)
- [Gemma 4 模型](https://huggingface.co/google/gemma-4-26b-a4b)

---
相关实体:: [[ggerganov|Ggerganov]] | [[llama-cpp|llama.cpp]] | [[google|Google]]
相关主题:: [[local-inference|本地推理]]
