# AirLLM 一夜回归 trending，单张 4GB 游戏卡跑 70B 模型，国内本地推理玩家又有新工具了

今早刷 GitHub Trending，看到 AirLLM 又冒出来了，单日 +89 stars。

这个项目我有印象，2024 年火过一阵子，作者 lyogavin 是个中国开发者，主页挂着 sponsors 链接。当时它的卖点就一句话，**单张 4GB GPU 跑 70B 模型**。然后沉了大半年，今天突然又被推上首页。

我去翻了 README，又跑了一下，想搞清楚一件事，这玩意儿是真能"白嫖"，还是只是凑合能跑给你看。

## 它到底怎么做到 4GB 跑 70B 的

正常加载一个 70B 模型，光权重就要 140GB（FP16），加 4bit 量化也要 35GB 起步。一张 RTX 4090 是 24GB，A100 也只有 40GB/80GB 两档。普通人手里的 GTX 1650、3060 12G、甚至笔记本集显，从硬件参数上看根本不该参与这件事。

AirLLM 的思路是分层加载（layered inference）。把 70B 模型拆成一层一层的 transformer block，每次只把一层搬到 GPU 上算，算完就丢掉，再加载下一层。整个模型权重平时躺在硬盘和 CPU 内存里，GPU 显存只需要装下当前这一层 + 中间激活值。

所以 4GB 显存只是"瞬时"占用，不是"持有"整个模型。

它还做了几件事，4bit/8bit 分块量化（基于 bitsandbytes），flash attention 加速注意力计算，以及 prefetching 把下一层的加载和当前层的计算重叠起来，README 里说能带来 10% 的速度提升。作者自己声称结合 4bit 量化能拿到 3x 的推理加速。

支持的模型范围很全，Llama2/3/3.1（405B 也有，8GB 显存就能跑）、Qwen、ChatGLM、Baichuan、Mistral、InternLM 都覆盖了。装一行命令，`pip install airllm`，调 API 跟 transformers 几乎一样。

## 代价是速度，而且代价很大

这是我必须告诉你的。

分层加载省下来的显存不是免费的，每次推理都要把模型从硬盘/内存反复搬到 GPU。一个 70B 模型有 80 层，生成一个 token 就要把 80 层全过一遍。如果你的硬盘是 SATA SSD 或者机械盘，每 token 的延迟会让你怀疑人生。

README 里没给具体的 tokens/sec 数字，我觉得这是有意的。社区里能找到的零星反馈是，单 4GB 卡 + NVMe 跑 70B，大概是**每个 token 几秒到十几秒**的量级。对话场景下生成 200 个 token，可能要等十分钟。

所以 AirLLM 的真实定位不是"日常对话工具"，是"我想在自己的破卡上验证一下这个 70B 模型的输出长什么样"。批量跑离线任务（比如夜里给一批文本打标签）勉强能用，实时交互基本告别。

质量上倒是没什么损失。分层加载只是改变了执行顺序，权重数学上等价，4bit 量化的精度损失是公认的可接受范围。

## 国内本地推理玩家手里其实有一整条路线

把 AirLLM 放回国内本地推理的版图里看，它不是孤军作战，是这条路线上一个特定生态位的工具。

显卡够好（4090/A100/H100），直接 vLLM，包括蚂蚁开源的 vLLM Ascend 分支，专门适配国产昇腾卡。

显卡一般（3060 12G、4070、Mac M 系列），llama.cpp（ggerganov 那个项目）是事实标准，GGUF 量化生态最成熟，Ollama 套了个壳让你 `ollama run qwen2.5:32b` 一行命令搞定。

显卡很差（4GB / 集显 / 老笔记本），这就是 AirLLM 的位置。它接受了"速度极慢"作为代价，换回"硬件门槛归零"。

如果你只是偶尔想跑一下大模型但不想本地折腾，前几天我们写过的 9router 路由方案是另一条路，把请求转发到云端的免费 API 池子里。

这四条路线没有谁干掉谁的关系。AirLLM 解决的是"我硬件实在不行但就是想本地跑"这个具体场景，跟 vLLM 不构成竞争。

## 社区里在聊什么

我翻了一下最近一个月本地推理相关的 Reddit 讨论。

r/ollama 有个帖子讨论双卡 RTX PRO 6000 Blackwell 怎么配置 Ollama，下面高赞回复直接说"别用 Ollama，用 vLLM"，理由是高端硬件场景下 Ollama 的吞吐被 vLLM 甩开几条街。这条评论在我看来很能说明社区分层，硬件越好，越往 vLLM 走，硬件越差，越往 llama.cpp / AirLLM 这种内存优化方案走。

r/MacStudio 那边讨论得更直接，有人花 8500 欧元买了 M3 Ultra 256GB RAM 跑本地 LLM，评论区在算账"够不够""token 速度行不行"。M3 Ultra 512GB 的帖子下面有个高赞评论说，"早晚每台高性能电脑都被关进机房跑 LLM，我们只能用手机连进去"，这其实就是本地推理玩家心里那种"想自己掌控算力"的执念。

AirLLM 之所以在这种语境下值得关注，是因为它把这个执念的门槛压到了最低。你不用买 M3 Ultra，不用攒双卡工作站，一张五年前的 1650 显卡 + 一块够大的硬盘就能开始玩。

## 我的判断

AirLLM 不是"真的能白嫖"，是"用速度换显存"。这两件事不一样。

如果你的目标是日常用 70B 模型对话、做 agent、跑代码生成，AirLLM 不适合你，你应该去用 OpenRouter 上的免费额度，或者本地装 ollama 跑个 14B/32B 的 Qwen。

但如果你的目标是这几种之一，AirLLM 值得装。

一是学习用途，想亲手摸一下 70B 模型的内部结构，理解 transformer 分层加载的工程实现，这个项目源码不长，是个好的研究对象。

二是离线批处理，你有一批不需要实时的任务（比如几千篇文档的标注、长文本摘要），可以让它在后台慢慢跑一晚上。

三是验证场景，你手头有个 70B 微调权重，想在自己的卡上跑两个 prompt 看看输出对不对，再决定要不要花钱租 A100 部署。

至于 5/11 这次回归 trending，我觉得是模型权重越发越大（最近一堆 100B+ 的开源模型）+ 显卡市场没明显变便宜 这两件事撞在一起的结果。lyogavin 这个项目踩中了"模型膨胀速度 > 硬件普及速度"的缺口，只要这个缺口还在，AirLLM 就会周期性地回到大家视野里。

想试的话，找一个空闲的晚上，`pip install airllm`，下一个 Qwen2.5-72B 的权重，写一行 generate 调用，然后去睡觉。早上起来看输出。这是最适合 AirLLM 的工作流。

## 相关链接

- AirLLM 仓库, https://github.com/lyogavin/airllm
- llama.cpp 仓库（量化生态对照）, https://github.com/ggerganov/llama.cpp
- vLLM Ascend 分支（国产卡适配）, https://github.com/vllm-project/vllm-ascend
- Ollama 官网（一键运行模型）, https://ollama.com

---
相关实体:: [[lyogavin|lyogavin]] | [[airllm|AirLLM]] | [[llama-cpp|llama.cpp]] | [[ollama|Ollama]] | [[vllm|vLLM]]
相关主题:: [[local-inference|本地推理]] | [[chinese-ai|国产 AI]] | [[open-source|开源生态]]

<!-- REACH: 8/10 | 品牌～ 利益点✓ 可操作✓ -->
