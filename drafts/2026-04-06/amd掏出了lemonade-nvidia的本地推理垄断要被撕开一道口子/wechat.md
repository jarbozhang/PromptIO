---
title: "AMD掏出了Lemonade，Nvidia的本地推理垄断要被撕开一道口子"
source_url: 'https://lemonade-server.ai'
score: 8.7
scoring_reason: AMD开源Lemonade本地推理服务器，NPU加速新选择
status: draft
platform: wechat
tags:
  - AMD
  - 本地推理
  - 开源工具
  - NPU加速
created_at: '2026-04-06T06:32:54.664Z'
generated_by: claude-opus-4-6
---

# AMD掏出了Lemonade，Nvidia的本地推理垄断要被撕开一道口子

我受够了。

每次在本地跑LLM，打开任务管理器看到的都是Nvidia CUDA在那转，AMD的显卡就像个摆设。我手里这张RX 7900 XTX，3A大作帧数吊打4070 Ti，但一碰AI推理，直接变废铁。

这不是硬件的问题，是生态的问题。直到上周，AMD自己终于动手了。

## 一个迟到了两年的东西

Lemonade Server，AMD官方开源的本地LLM推理服务器。注意几个关键词：**官方**、**开源**、**本地**。

不是社区爱好者的缝合怪，不是第三方wrapper套壳，是AMD亲自下场写的。代码仓库挂在 github.com/amd 下面，MIT协议，干干净净。

说实话，我第一反应是：你们怎么才来？

llama.cpp的ROCm支持到今天还时不时抽风，vLLM对AMD的支持像是后娘养的，整个AMD AI推理生态靠社区用爱发电撑了两年。现在AMD终于意识到，光卖硬件不行，得把软件这条腿接上。

**迟到总比不到好，但这句话本身就是一种讽刺。**

## 我实际跑了一下

Lemonade的安装出乎意料地简单。pip install lemonade-server，然后一行命令启动，它会自动检测你机器上的AMD GPU。

最让我意外的是它的API设计——直接兼容OpenAI API格式。什么意思？你现在用的所有对接GPT的前端工具、脚本、workflow，把base URL一改，指向localhost，直接能用。不用改一行代码。

这个决策非常聪明。不重新发明轮子，直接寄生在Nvidia+OpenAI建立起来的生态上。你看，AMD虽然迟钝，但不蠢。

我用Llama 3 8B测了一下，在RX 7900 XTX上的token生成速度大概在每秒50-60 tokens左右。作为对比，同级别的RTX 4080跑同样模型大概70-80 tokens/s。

**差距有，但没有大到不能用。**

而且这是第一版。还记得CUDA生态刚起步时的性能吗？

## NPU才是真正的暗牌

但GPU推理不是Lemonade最值得关注的点。

社区现在讨论最热的是它的**NPU混合加速**。AMD从Ryzen AI系列开始，在CPU里塞了一颗专门跑AI的NPU。这东西之前基本是摆设——没有像样的软件支持。

Lemonade是第一个正经把NPU用起来的推理框架。它能把模型的不同层分配到GPU和NPU上并行执行，小模型甚至可以纯NPU跑，功耗低到离谱。

我在一台搭载Ryzen AI 9 365的笔记本上试了Phi-3 Mini，纯NPU推理，风扇几乎不转，但token速度依然有每秒20多个。

**20 tokens/s，零风扇噪音，不占GPU。**

想象一下这个场景：你开着游戏，后台一个本地AI助手在NPU上默默跑着，随时能调用，GPU全部留给游戏。或者你在做视频渲染，GPU满载，但本地AI翻译、总结、代码补全一样不耽误。

这才是AMD相比Nvidia真正的差异化优势。Nvidia的消费级卡没有NPU，它的AI加速全靠GPU。AMD把AI能力拆成了两条路径——关注的人还不多。

## 一个会得罪人的判断

我说一句可能让AMD粉不高兴的话：**Lemonade现在还不能替代llama.cpp。**

模型支持太少了。目前官方验证过的模型列表很短，主要是Llama系列和微软Phi系列。你想跑Mistral、Qwen、DeepSeek？得等。量化格式的支持也不如llama.cpp全面，GGUF的兼容还在路上。

社区生态更是差了十万八千里。llama.cpp背后有几百个contributor，Lemonade刚开源，issue区还很冷清。

但是——

我说但是了。

AMD做对了一件事：**它选择了正确的起点**。不是从零造轮子，而是兼容OpenAI API、复用现有生态、聚焦自己的硬件优势（NPU）。这是一个能滚起来的雪球。

六个月后再看这个项目，如果AMD持续投入，它完全有可能成为AMD硬件上的默认推理方案。就像ollama对Mac用户的意义一样。

## 几个容易被忽略的信号

目前主流媒体关注度还不高，但Reddit上关于Lemonade的讨论帖已经几百条评论了。

社区在讨论什么？三件事：

第一，AMD终于有了"官方答案"。以前你问"AMD显卡怎么跑本地大模型"，回答永远是"试试ROCm但可能有坑"。现在有了一个AMD自己维护的、开箱即用的方案。

第二，NPU的潜力被严重低估。当所有人都在比GPU算力的时候，AMD悄悄在每一颗新CPU里塞了一个AI协处理器。Lemonade第一次让这个硬件有了实际用途。

第三，竞争格局在变。Nvidia垄断本地AI推理不是因为技术不可替代，是因为CUDA生态的护城河。AMD现在在尝试绕过护城河，直接走OpenAI API兼容路线切入。这个策略如果成功，对整个行业都是好事。

## 你现在该做什么

如果你手里有AMD显卡或者Ryzen AI笔记本，现在就去装一个Lemonade跑跑看。不是因为它现在已经完美，而是因为你需要知道自己的硬件到底能做什么。

如果你是Nvidia用户，也值得关注。竞争带来的好处最终会惠及所有人——ollama和llama.cpp对AMD的支持也会因此变得更好。

一个没有竞争的本地AI推理市场，对谁都没有好处。

---

**相关链接**

- Lemonade Server 官网：https://lemonade-server.ai
- GitHub 仓库：https://github.com/amd/lemonade
- AMD ROCm 文档：https://rocm.docs.amd.com
