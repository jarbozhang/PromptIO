# OpenAI 把 finetuning API 砍了，Nathan Lambert 那条"中国 lab 还在 RLFT"的注脚怎么读

5 月 13 日凌晨 Latent Space 推了一期 AI News，标题就一句话，《The End of Finetuning》。

引子很简单，OpenAI 这一周把 finetuning API 又往下砍了一刀，社区里第一时间炸出来的解读是"这不就是 finetuning 时代结束了吗"。Latent Space 那篇本身写得克制，原话是"the End of a thing for most people does NOT mean the End of a thing period"，意思也很明白，是给绝大多数 AI engineering 团队的 finetuning 结束了，不是 finetuning 作为技术结束了。

我看完之后第一反应是，这事得跟 Nathan Lambert 上周那篇《Notes from inside China's AI labs》对照着读，才能看出"为什么是现在结束"。

## 先把 Latent Space 那篇的核心论点钉死

Latent Space 这次不是预测，是给一个已经发生的转折找解释。三个论点放在那里。

**第一，frontier lab 的算力被重新分配了。** OpenAI 砍 finetuning API 不是产品决策，是资源决策，GPU 优先去喂 inference 和 base model 训练。"the modal 80% of the AI Engineering industry was probably trending there anyway" ， 这句话的意思是，80% 的 AI 工程师本来就在往不微调的方向漂，OpenAI 只是把这件事正式确认了。

**第二，很长的 prompt 已经够用。** 文中那句"Just Very Long Prompts (like Claude's Constitution) are all you need"是抛给业界的反问。Anthropic 的 Constitution 是写在 system prompt 里、不是 fine-tune 进权重里的。当 context 能到 1M token、prompt cache 命中率打到 80% 以上之后，把领域知识"塞进 prompt 里"在工程上比"finetune 进模型里"便宜得多、迭代快得多、出问题也好回滚。RAG 在这条路上是同一个故事的另一面，把外部知识检索到 prompt 里。

**第三，顶部那 1% 还在做 RLFT，而且加码了。** Latent Space 点名了 Cursor 和 Cognition，原文是"the top 1% of ai applications have both INCREASED open model RLFT and usage, rather than decreased"。意思也直白，对于真要在某个垂直能力上拉开身位的产品，open model 上做 RLFT 不但没死，反而更重要了。

这就是 Latent Space 的判断，**finetuning 没死，但 finetuning 作为大多数 AI 团队的默认手段，确实结束了**。

## Nathan 那篇为什么是关键注脚

5 月 7 日，Nathan Lambert 发了《Notes from inside China's AI labs》，记他去 Moonshot、智谱、美团、小米、Qwen、蚂蚁、01.AI 这一圈的观察。

里面有一条容易被中文读者跳过的描述，他说中国 lab 里有"more willingness to do non-flashy work in order to improve the final model"，愿意做不出彩的活把模型推上去。在他看来这恰恰跟美国 lab 的"个人英雄主义"形成对照，**post-training、RLFT、数据清洗这些不性感的工作在中国 lab 是有人愿意干、并且能拿到资源干的**。

他还提到一个很现实的差异，**中国 AI 公司的"自有技术心态"很重**，倾向于自己训模型而不是买 API。这件事直接的后果是，国内做产品的团队遇到能力缺口时，第一反应往往是"我们自己 SFT 一版"，而不是"我们去 OpenAI 上 finetune 一版"。这次 OpenAI 砍 finetuning API 对国内团队的直接冲击其实远小于硅谷。

把这两篇放一块看就清楚了，Latent Space 在讲的是**面向 OpenAI 这类闭源 API 的 finetuning 时代结束了**。Nathan 在告诉你**愿意拼 post-training 的人没消失，只是重心在转移**。

## 国内开发者真正要做的判断

我看完这两篇之后，最想抓出来给国内做 AI 产品的同行的，是一份不带感情的判断表。

什么时候该做长 prompt + RAG，

- 知识库需要每天更新（产品文档、客服 FAQ、内部 wiki），改一条比 retrain 快几个数量级；
- 模型权重需要在多个场景之间复用，做了 finetune 反而把通用能力按死了；
- 团队没有稳定的标注产能，凑不出几千条干净的 SFT 数据；
- 任务可以靠"塞文档 + 提示模型怎么用文档"解决，例如规章对照、合同摘要、代码库内问答；
- 用 DeepSeek、Qwen、Kimi 这些国产长上下文模型，把 prompt 写到几十万 token 后实测效果可接受。

什么时候非微调不可，

- 你要的是**风格 / 格式 / 输出协议**的稳定性，例如固定 JSON schema 输出、固定语气、固定调用某些工具的偏好。Prompt 能近似，但稳定性差一截；
- 你的任务是**底层能力**的提升而不是知识灌入，例如代码补全的 acceptance rate、特定语言对的翻译质量。这种事 RAG 帮不上。Cursor 和 Cognition 加码 RLFT 走的就是这条路；
- 你做的是**安全或合规约束的内化**。把"不能输出 X、必须按 Y 格式给免责声明"用 SFT 内化进模型，比每次靠 system prompt 兜底更可控；
- 你已经有 ≥1 万条高质量任务数据，且这批数据未来还会持续产出。这种情况下 finetune 是把数据变成 moat 最自然的方式。

什么时候做"prompt 兜底 + 轻量 LoRA"的混合方案，

- 主能力靠长 prompt + RAG 解决，覆盖 80% 的场景；
- 剩下 20% 模型死活学不会的边缘 case，攒数据做 LoRA / DPO 补一刀；
- 这条路对中小团队最现实，国内现在的工具链（Unsloth、ms-swift、LLaMA-Factory）也已经把门槛压得很低。

## 我的判断

Latent Space 那句"end of finetuning for most"是准确的，但**对国内开发者的实际含义跟硅谷不一样**。

硅谷的 80% AI engineer 之前是付费用 OpenAI 的 finetune API，OpenAI 一刀砍下去，他们手上唯一的微调路径没了，只能往 RAG + 长 prompt 上挤。这是被迫的转弯。

国内大部分团队从来就没真用过 OpenAI 的 finetuning API，要么用 Qwen / DeepSeek / GLM 的 base model 自己 SFT，要么用国产闭源 API 自带的"轻量微调"功能。OpenAI 砍刀这件事对国内 stack 直接影响约等于零。

但**间接影响很大**。Latent Space 这篇文章会让全球 AI 工程师社区的注意力从"我去找哪家的 finetuning API 性价比高"切换到"我把 prompt 写到多长、RAG pipeline 怎么搭"。这个心智迁移之后，**国产长上下文模型的真正窗口期才打开**，Kimi 早期那波 200 万字上下文营销在 2026 年的市场环境里反而前瞻了。

往前看，三件事值得盯，

一是 DeepSeek、Qwen、Kimi 的 1M+ context 在长 prompt 场景的实际可用度，包括 attention 衰减、cache 命中率、token 成本。Nathan 的中国 lab notes 里有一条没展开，"researchers universally desire more Nvidia chips for training" ，国产 lab 现在最缺的不是想法，是算力。1M context 这条路对算力的需求其实比想象中高。

二是 RLFT 在国内会不会出现"Cursor / Cognition 时刻"。Latent Space 说顶部 1% 在加码 RLFT，那中国的"顶部 1%"在哪？目前看智谱 Coding Agent 那条 serving 线、Moonshot 的 Kimi K2、字节 Doubao 的 coding fork 都在赌这个方向。

三是工具链。OpenAI 砍 API 之后，"prompt cache 命中率优化 + RAG retrieval 调参 + context engineering"这套技能栈会取代"finetune 调参"成为 AI engineer 的新基本功。国内做 prompt 管理、RAG infra 的产品（Dify、FastGPT、RAGFlow 那些）会重新热起来。

要泼一点冷水的话，Nathan 那篇 China lab notes 写得很温情，里面"中国研究者愿意做不性感的活"这种描述带明显的个人观察色彩，第三方没法复现。当个引子读没问题，当结论引用得慎重。Latent Space 那边给的 OpenAI 砍 API 数据也是社区口径，OpenAI 官方没给完整 changelog。这两篇都是"信号文"，不是"数据文"。

但作为方向判断，**该转的弯已经清楚了**。手上还在为"做不做 finetune"纠结的国内团队，今晚把这两篇读一遍，对照前面那张判断表过一遍你自己的产品，大概率会发现，**你早就该往长 prompt + RAG 那条路走了，OpenAI 砍 API 只是替你做了决定**。

## 相关链接

- Latent Space《The End of Finetuning》，https://www.latent.space/p/ainews-the-end-of-finetuning
- Nathan Lambert《Notes from inside China's AI labs》，https://www.interconnects.ai/p/notes-from-inside-chinas-ai-labs
- 对照阅读，智谱 GLM-5 serving 复盘（KV Cache + Coding Agent 那条线为什么 RLFT 还重要），https://z.ai/blog/scaling-pain

> 社区信号，last30days 这一周没在 Reddit / HN 找到围绕 "end of finetuning" 主题的高赞讨论，目前讨论密度集中在 Latent Space 评论区和 Twitter / X 上。建议自己关注的开发者社群里再蹲两天。

---
相关实体:: [[nathan-lambert|Nathan Lambert]]
相关主题:: [[ai-research|AI 研究]] | [[方法论|方法论]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
