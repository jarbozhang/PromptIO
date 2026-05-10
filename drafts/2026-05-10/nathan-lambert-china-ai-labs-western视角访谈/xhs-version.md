# 一个西方研究者跑了一圈中国 AI lab，他看到的和我们默认的不一样

5 月 7 日，Interconnects 主理人 Nathan Lambert 发了一篇《Notes from inside China's AI labs》，把他这一趟拜访头部国产 AI lab 的见闻整理成长文。Moonshot、智谱、清华、美团、小米、01.AI、阿里北京、蚂蚁灵犀，加上反复出现的 DeepSeek、字节、Qwen，他几乎把当下能见到的核心选手走了一遍。

值得国内从业者读一遍，不是因为他讲的都对，而是因为他能看到我们身在其中已经默认掉的东西。

## Nathan 记录了哪几件事

第一件，**核心贡献者里学生比例高**。他把这点跟美国 lab 的人员结构做了对照，OpenAI 和 Anthropic 几乎不开 intern，而国产 lab 的核心训练流水线里坐着大量在读学生。他用了 "fresh eyes" 这个词，这些学生愿意把"应该怎么做"的成见丢掉，从零判断什么有用。

第二件，taste。Nathan 给 DeepSeek 的评价是 "the best research taste in execution"，在执行层面上品味最好。这是个研究者圈子的措辞，强调的不是工程能力，而是在每一步取舍上更接近正确的判断。

第三件，工具使用。他写道 "Most developers are Claude-pilled"，国产 lab 里的工程师日常用什么写代码，跟旧金山同行没有本质差异。这个观察本身在国内圈内不是秘密，但被一个外人写出来就变成可讨论的事实。

第四件，开源动机。他问下来，国产 lab 开源不是出于宏大战略，而是非常 practical 的考虑，拿社区反馈、撑生态。美团、小米一边做闭源主力模型，一边放 open weights，逻辑就是这套。Nathan 称之为 "current equilibrium"，当前均衡。

第五件，地缘政治。他原话是 "The cut-throat geopolitical conversation we're used to in the U.S. hasn't permeated them at all"。国产 lab 里聊 AI policy、AGI 安全、长期叙事的浓度，比 SF 低一个量级，研究者更聚焦"下一个 checkpoint 怎么训得好"。

## 哪些是 outsider 才看得到的盲点

地缘政治那条最值得停下来想一下。Nathan 的潜台词是，国产 AI 研究者对 AI 长期叙事的参与度低。当西方研究者在主导"AI 应该往哪去"的叙事时，国产 lab 即便模型表现不输，也会发现自己长期处于"被定义"的位置。Nathan 没明说，但他这段实际上在提醒，**叙事缺席本身也是代价**。

第二个盲点是数据产业。Nathan 提到他听说美国单个 RL 环境投入超过千万美元，而国产 lab 的数据产业链相对薄弱、倾向于自建 in-house。国内业内普遍把"自己造轮子"当成省钱的优势，Nathan 视角下这是一个**外部供给不成熟**的产物。两种解读都成立，但角度不同。

第三个是技术栈所有权。Nathan 注意到，美团、小米这种公司在国内全部选择自己训模型，他用的词是 "technology ownership mentality"。国内业内倾向于把它解释为"成本"或"数据隐私"，但 Nathan 视角下这是一种默认假设，国产公司默认自己应该控制完整 stack。

## Nathan 自己承认的局限

他过度依赖 "culture" 这种黑盒概念。Reddit 上有评论直接点出来，"a bit too reliant on black box concepts like culture"。当他解释不了某个差异时，就归到"文化"上。这是任何外部观察者都会遇到的问题，不只是他。

他也没看到国产 lab 的人才流转速度。Moonshot 核心成员去字节、智谱核心去 DeepSeek、阿里通义和云平台之间反复挪，这种流动密度国产是季度级别。Nathan 走访的是"现在的"团队，没看到团队是流动状态。

还有一点他低估了，国产 lab 跟应用产品的耦合度。Doubao 跟字节短视频生态、Qwen 跟阿里电商、智谱跟 toB SaaS、Moonshot 跟 Kimi C 端，每个 lab 后面都有一个非常具体的商业化出口。这跟 OpenAI/Anthropic 那种"先做最强模型再想怎么变现"的路径**走的是两条路**。Nathan 把"开源"作为主要观察维度，但国产 AI 的真实驱动力其实是 vertical integration。

## 我的判断

这篇文章值得读，不是因为它给出了什么国内业内不知道的事实，而是它给出了**一种镜像**。Nathan 看到的"学生比例高"、"日常用 Claude"、"practical 开源"、"地缘政治冷感"，每一条对国内从业者都是默认空气，但被一个外人重新指认一遍后，会发现这些"默认"其实是结构选择，不是自然法则。

最值得停下来想的是地缘政治那条。Nathan 没有在做任何评价，他只是记录下了一个事实，国产研究者对长期叙事的参与度低。这件事在当下不显眼，但在五年的时间尺度上会变成具体的产业代价。

如果国内 AI 研究社区想在下一阶段不只做"performance leader"，而要参与定义"AI 应该长什么样"，那写作、立场、公开发言的密度需要往上抬。DeepSeek 用论文做到了一点，但整个行业还远远不够。

## 相关链接

- 原文，[Notes from inside China's AI labs - Interconnects](https://www.interconnects.ai/p/notes-from-inside-chinas-ai-labs)
- Nathan Lambert 个人站，[natolambert.com](https://www.natolambert.com/)
- Reddit 讨论串，[r/accelerate](https://www.reddit.com/r/accelerate/comments/1t6jbze/notes_from_inside_chinas_ai_labs/)

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 7/10 | 品牌✓ 利益点✓ 可操作✗ -->
