# Gemma 4 塞进 NVIDIA Jetson Orin Nano，2000 块钱桌面机器人真的能做事了

前天晚上我刷 Hugging Face 的时候卡在一个博客链接上不动了。

NVIDIA 官方账号发的，Gemma 4 VLA Demo on Jetson Orin Nano Super。我第一反应是去京东搜了一下这块开发板的价格，两千多一点。

说人话就是，你花两千块买一块桌面大小的板子，塞进一个开源的 Gemma 4 多模态权重，它就能看懂摄像头里的东西，听懂你说话，再指挥舵机去抓东西。我愣了三秒。这事儿搁去年还是要上 RTX 4090 的配置。

## 端侧 VLA 这个门槛，被 Gemma 4 一脚踹开了

先把 VLA 这个词讲清楚。

Vision Language Action，视觉-语言-动作三件套。机器人领域这两年最火的范式，一个模型同时吃摄像头画面、吃你的自然语言指令，直接吐出底层的动作指令。以前这三件事要三个模型拼起来，现在一个端到端模型搞定。

Google DeepMind 自己的 RT-2 就是这路线。问题是 RT-2 这种东西以前都是大厂内部玩具，参数量大、硬件贵、权重不开放。普通开发者连摸都摸不到。

Gemma 4 之前，开源侧跑 VLA 基本就是 π0 和几个学术项目在撑场子，门槛卡在两个地方，模型多模态能力不够，推理硬件要求高。

Gemma 4 把两个门槛一起降了。

DeepMind 官方说法是 byte for byte, the most capable open models，翻译成黑话就是单位参数量下目前开源里最能打。4 月 2 号发，4 月 7 号 Hugging Face 下载量就破了 200 万。两周多后 NVIDIA 自己下场发了 Jetson 上的 VLA demo，生态投票已经写在脸上。

## 我没亲自跑，但我把硬件清单扒了一遍

坦率讲我还没下单，手头事多。但我把这套东西的硬件和软件栈扒了一遍，给想动手的朋友省点时间。

硬件侧就一块 Jetson Orin Nano Super Developer Kit，NVIDIA 官方定位就是桌面级的 edge AI 开发板，8GB LPDDR5，67 TOPS 的算力，被动散热，功耗 25W。这就是一个能插墙的小盒子。

机械臂部分 NVIDIA 的 demo 用的是 LeRobot 生态里常见的 SO-100 和类似的开源臂。LeRobot 是 Hugging Face 的机器人学习框架，把整个采数据、训策略、跑推理的链路都标准化了。淘宝搜 SO-100 机械臂，1500 到 3000 块能搞定一套。

软件栈这边，Gemma 4 的多模态权重直接从 Hugging Face 拉，NVIDIA 给了一套优化过的 TensorRT-LLM 推理代码，据博客里说是专门针对 Jetson 的 int4 量化。再叠上 LeRobot 的 action head。

算一下总预算，Jetson 不到 2000，机械臂 2000 左右，再加摄像头和一个底座，4500 到 5000 能落地一台能看能听能动的桌面机器人。

这个数字我其实盯着看了一会儿。三年前这个预算连一张像样的训练卡都买不到。

## 社区为什么这么买账

两周 200 万下载这个数字有多炸说一下对比。

Meta 的 Llama 3 当年发布，两周大概是 100 万下载量级。Gemma 4 在没有 DeepSeek R1 那种话题度的情况下，单靠产品力冲到 200 万，说明工程师是真在用。

Nathan Lambert 那篇分析里的观点我很认同。一个开源模型能不能成功，决定因素不是 MMLU 高几个点，而是三件事，许可证干净、工具链接得上、权重质量稳定。

Gemma 系列这三件事一直做得不错。许可证比 Llama 宽松，Hugging Face、vLLM、llama.cpp 第一天就支持，权重没有乱七八糟的对齐副作用。

NVIDIA 自己又不缺模型，选 Gemma 4 做 Jetson demo，是因为尺寸、许可证、社区热度加起来算总账最划算。

## 我的判断，端侧机器人这一年要热

我认为 2026 年会是端侧开源 VLA 落地的元年。理由有三个。

第一，模型侧的瓶颈确实被 Gemma 4 这一代开源多模态模型打穿了。以前端侧跑 VLM 要么精度差要么速度慢，现在量化到 int4 还能保住多模态能力的开源模型终于有了。

第二，硬件侧 NVIDIA 在主动降价。Jetson Orin Nano Super 是去年底才上的新型号，2000 块价位段专门冲着 hobbyist 和教育市场。国产的 RK3588、地平线征程系列也在卷。

第三，LeRobot 这种开源框架已经把数据采集和训练流程标准化了，普通开发者不需要自己去搭一套 ROS+MoveIt 的地狱栈。

会得罪人的话我也说一句。现在国内一堆做具身智能的创业公司，估值几十亿美金，核心竞争力如果只是"我们拿到了独家的机械臂数据"，那在 Gemma 4 这种开源模型 + LeRobot 这种开源框架的攻势下，护城河会比想象中浅。真正能跑出来的，要么是有独特硬件形态、要么是进了特定产业场景拿数据、要么是底层模型训练做到世界级的那几家。光靠"攒数据训 VLA"这条故事，越来越难讲。

当然我也理解创业公司的难处。早期不靠故事融不到钱，没钱就没数据，没数据就没模型。这是个先有鸡先有蛋的局。我只是说，开源这边的水位涨得比大家想象的快，两千块一台桌面机器人就能跑 VLA 这件事，一年前没人信，现在已经是博客里的 demo。

## 动手建议

如果你手上已经有 Jetson Orin Nano Super，直接按 NVIDIA 那篇 Hugging Face 博客的步骤跑一遍 demo，周末能搞定。

如果你还没下单，我建议先去 LeRobot 的 GitHub 把 SO-100 的文档读一遍，判断你家里有没有足够的桌面空间和走线环境。机械臂是个占地方的东西，别冲动消费。

如果你完全是新手，从 Gemma 4 的多模态 Python 推理开始，不要一上来就端侧。先在 Colab 或者自己的 GPU 上把"喂张图片加一句指令得到文字输出"的链路跑通，再谈往 Jetson 塞。

最后一个开放问题留给大家，你们觉得端侧 VLA 真正杀手级的场景是什么，陪伴机器人、家庭整理，还是某个我们现在完全没想到的方向，评论区聊聊。

## 相关链接

- Gemma 4 VLA Demo on Jetson Orin Nano Super，https://huggingface.co/blog/nvidia/gemma4
- Welcome Gemma 4 官方介绍，https://huggingface.co/blog/gemma4
- DeepMind Gemma 4 发布博客，https://deepmind.google/blog/gemma-4-byte-for-byte-the-most-capable-open-models/
- Nathan Lambert 分析文章，https://www.interconnects.ai/p/gemma-4-and-what-makes-an-open-model
- LeRobot 框架仓库，https://github.com/huggingface/lerobot

---
相关实体:: [[google|Google]] | [[deepmind|DeepMind]] | NVIDIA
相关主题:: [[local-inference|本地推理]] | [[ai-hardware|AI硬件]] | [[multimodal|多模态]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
