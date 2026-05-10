# Nathan Lambert 跑了一圈中国 AI lab，写了一份 Western 视角内部观察

5 月 7 日，Interconnects 主理人 Nathan Lambert 发了一篇《Notes from inside China's AI labs》，把他这一趟拜访头部国产 AI lab 的见闻整理成长文。Moonshot、Zhipu、清华、美团、小米、01.AI、阿里北京、蚂蚁灵犀，加上反复出现的 DeepSeek、字节、Qwen，他几乎把当下能见到的核心选手走了一遍。

这是西方业内人士在国产 AI 上少见的 firsthand observation。值得国内从业者仔细读，不是因为他讲的都对，而是因为他能看到我们身在其中已经默认掉的东西。

---

## Nathan 看到了什么

文章里最反复出现的一个观察，**核心贡献者里学生比例非常高**。Nathan 直接对比了美国，OpenAI 和 Anthropic 几乎不开 intern，而国产 lab 的核心训练流水线里坐着大量在读学生。他用了一个词，"fresh eyes"，这些学生愿意把"应该怎么做"的成见全部丢掉，从零判断什么有用。

第二个观察是 taste。Nathan 给 DeepSeek 的评价不是"模型强"，而是 "the best research taste in execution"，在执行层面上品味最好。这是个很西方研究者的措辞，强调的不是工程能力，而是**在每一步取舍上都做出更接近正确的判断**。这种评价在国产 AI 圈内部很少听到。

第三个是 Claude 渗透率。Nathan 写道，"Most developers are Claude-pilled"，尽管 Claude 在中国名义上被屏蔽。也就是说，国产 lab 里的工程师日常用什么工具写代码，跟 SF 的同行没有本质差异。

第四个是开源动机。他问下来，国产 lab 开源不是出于某个宏大战略，而是非常 practical 的考虑，拿社区反馈、撑生态。Meituan、小米一边做闭源主力模型，一边放 open weights，逻辑就是这套。Nathan 称之为 "current equilibrium"，当前均衡，不是 master plan。

第五个是地缘政治。他原话是 "The cut-throat geopolitical conversation we're used to in the U.S. hasn't permeated them at all"。在国产 lab 里聊 AI policy、AGI 安全、长期叙事的浓度，比 SF 低一个量级。研究者更聚焦"下一个 checkpoint 怎么训得好"。

---

## 哪些跟我们直觉一致

学生比例高这一条，国内业内不会觉得意外。智谱、Moonshot、DeepSeek 的核心团队里大量在读博士和应届生，是公开秘密。但 Nathan 把它放在"vs OpenAI 不开 intern"的对照下看，就变成了一个**结构性优势**而不是临时人力安排。北美 lab 把训练核心岗当稀缺资源，国产 lab 把训练核心岗当培养通道，这两种模式的复利会在三五年后兑现。

Claude-pilled 也不意外。国产 lab 的工程师私下用什么工具，跟舆论场上"国产替代"的叙事是两回事。这是国内技术圈心知肚明、但很少摆到台面上讲的事。

开源动机的"practical"判断也对。国内开源模型的发布节奏，跟"占领开发者心智-蹭社区反馈-给闭源版本攒口碑"这条产品逻辑高度耦合，不是什么开源信仰。Nathan 看出来了。

---

## 哪些是 outsider 才看得到的盲点

地缘政治那条最值得国内从业者停下来想一下。Nathan 的潜台词是，国产 AI 研究者**对 AI 长期叙事的参与度低**。SF 工程师下班会聊 alignment、聊 AGI timeline、聊 doomer vs accelerationist，国产研究者下班聊 RL 环境怎么搭、benchmark 怎么打。

这不是谁对谁错，而是话语权的分布问题。当西方在主导"AI 应该往哪去"的叙事时，国产 lab 即便模型更强，也会发现自己长期处于"被定义"的位置。Nathan 没明说，但他这段观察实际上在提醒，**叙事缺席本身就是代价**。

第二个盲点，data industry 质量。Nathan 写到他听说美国单个 RL 环境投入 $10M+，而国产 lab 的数据产业链相对薄弱、倾向于自建 in-house。国内业内普遍把"自己造轮子"当成省钱的优势，但 Nathan 视角下这是一个**外部供给不成熟**的产物，美国在围绕 Scale AI、Surge 这条数据产业链花掉的钱，将来可能成为某种基础设施红利。我们觉得没必要的东西，可能只是因为我们没见过它本来该长成什么样。

第三个，技术栈所有权。Nathan 注意到，美团、小米这种"在美国语境里只会买现成服务"的公司，在国内全部选择自己训模型。他用的词是 "technology ownership mentality"。国内业内倾向于把它解释为"成本"或"数据隐私"，但 Nathan 视角下这是一种**默认假设**，国产公司默认自己应该控制完整 stack，这个默认假设本身就是产业差异。

---

## Nathan 看错了什么 / 没看到什么

Nathan 自己也承认了一句，他过度依赖 "culture" 这种黑盒概念。Reddit 上有评论直接点出来，"a bit too reliant on black box concepts like culture"。这个批评成立。当他解释不了某个差异时，就归到"文化"上，这其实是西方观察东亚科技公司时的老毛病。

他没看到的一面，**国产 lab 内部的人才流转速度**。Moonshot 核心成员去字节、智谱核心去 DeepSeek、阿里通义和云平台之间反复挪，这种流动密度西方 lab 三五年才出现一次，国产是季度级别。Nathan 走访的是"现在的"团队，没看到团队是流动状态。

他也低估了**国产 lab 跟应用产品的耦合度**。Doubao 跟字节短视频生态、Qwen 跟阿里电商、智谱跟 toB SaaS、Moonshot 跟 Kimi C 端，每个 lab 后面都有一个非常具体的商业化出口。这跟 OpenAI/Anthropic 那种"先做最强模型再想怎么变现"的路径完全不同。Nathan 把"开源"作为主要观察维度，但国产 AI 的真实驱动力其实是 vertical integration，模型只是中间件，前后两头都得自己端。

---

## 我的判断

这篇文章值得读，不是因为它给出了什么国内业内不知道的事实，而是它**给出了一种镜像**。Nathan 看到的"学生比例高"、"Claude-pilled"、"practical 开源"、"地缘政治冷感"，每一条对国内从业者都是默认空气，但被一个外人重新指认一遍后，会发现这些"默认"其实是**结构选择**，不是自然法则。

最值得国内从业者警惕的，是地缘政治那条。Nathan 没在批评，但他记录下了一个事实，国产研究者对长期叙事的参与度低。这件事在模型差距缩小的当下不显眼，但在五年的时间尺度上会发酵成具体的产业代价。

如果国内 AI 研究社区想在下一阶段不只做"performance leader"，而要参与定义"AI 应该长什么样"，那写作、立场、公开发言的密度需要往上抬。DeepSeek 用论文做到了一点，但整个行业还远远不够。

---

## 相关链接

- 原文，[Notes from inside China's AI labs - Interconnects](https://www.interconnects.ai/p/notes-from-inside-chinas-ai-labs)
- Nathan Lambert 个人站，[natolambert.com](https://www.natolambert.com/)
- Reddit 讨论串，[r/accelerate](https://www.reddit.com/r/accelerate/comments/1t6jbze/notes_from_inside_chinas_ai_labs/)

---

相关实体:: [[nathan-lambert|Nathan Lambert]] | [[interconnects|Interconnects]] | [[deepseek|DeepSeek]] | [[qwen-family|Qwen]] | [[moonshot|Moonshot]] | [[zhipu|智谱]]
相关主题:: [[chinese-ai|国产 AI]] | [[ai-research|AI 研究]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✗ -->
