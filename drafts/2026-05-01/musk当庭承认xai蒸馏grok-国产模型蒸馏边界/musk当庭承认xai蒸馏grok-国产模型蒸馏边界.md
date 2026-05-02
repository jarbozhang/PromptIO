# Musk 当庭承认 xAI 用 OpenAI 模型蒸馏 Grok，国产模型蒸馏的边界又被推了一下

加州一间联邦法庭里，Musk 在证人席上被问到 xAI 是否对 OpenAI 的模型做过 distillation。

他想了一下，回答了一个词，"Partly"。

部分有。

这是 2026 年 4 月 30 日，Musk v. OpenAI 案庭审第二天。原告是 Musk，被告是 OpenAI、Sam Altman 和 Greg Brockman，案由是 OpenAI 把非营利结构改成营利结构、违背创立时的使命。Musk 自己上证人席。

谁也没料到，他在一个看似支线的问题上，亲口把整个行业心照不宣的事情捅进了庭审记录。

## 先说 distillation 是什么

模型蒸馏（model distillation）原本是个学术、温和的词。

大模型当老师，小模型当学生。学生不学原始训练数据，去模仿老师对每个问题的回答分布。学下来的小模型体积可能只有老师的几十分之一，但表现接近。Hinton 团队 2015 年那篇 *Distilling the Knowledge in a Neural Network* 留下的标准范式。

业界一直在用。一家公司用自家大模型蒸馏出小模型部署到边缘设备，没有任何争议。

灰区出现在另一种用法。

你的公司没有 GPT-4 那个量级的老师，但你想训一个接近 GPT-4 的学生。怎么办？把 GPT-4 当成黑盒老师，对着它的 API 一遍遍发问、收集回答，再用这些 (问题, 回答) 对去训自家小模型。

学生学的不是公开数据，是别人家旗舰模型的输出。成本可能只有原版训练的几十分之一。

这条路是 OpenAI、Anthropic、Google 在 ToS 里明确禁止的，三家组的 Frontier Model Forum 里有一条联合工作流就是反蒸馏。它们不希望自己花几十亿美元训出的能力，被别人花几百万提取走。

## 庭审现场那一问

被告方律师 William Savitt 在交叉质询中切到这条线。

他先问 Musk 知不知道什么是 model distillation。Musk 给出一段铺垫式回答，大意是这在 AI 公司里是 common practice。

Savitt 直接追问，"那意思是 yes ？"

Musk 说，"Partly"。

The Verge 庭审记者前一天写过一句冷评论，Musk 自己最大的敌人是 Musk 自己。当时他大量出现 yes/no 问题不给 yes/no 答案、跟律师对峙、上午说过的事下午"忘了"。陪审席上有 juror 互相对视。

这个 "partly" 出现在那种状态下，更像是被质询挤出来的真话。但它已经被书面化进庭审记录。xAI 的 Grok 用过 OpenAI 模型输出参与训练这件事，从坊间传闻变成庭审证据。

xAI 当天没发声明回应。

## 为什么这一句对国产模型重要

把场景拉回国内。

DeepSeek 发 V2、V3 那段时间，海外社区每隔几周就有人翻出某次输出里"作为一个由 OpenAI 训练的语言模型"的幻觉痕迹，下面跟一长串"是不是蒸 GPT 了"的讨论。Qwen 早期版本有类似 artifact。零一万物的 Yi 当年在 HuggingFace 上被研究者指出权重结构跟 LLaMA 高度相似，闹过一轮。

这些事每次发酵，国内官方说法都是"训练数据清洗不到位、不影响模型自主性"。社区里分两派，一派觉得这是追赶期不可避免的灰色操作，另一派觉得 artifact 不能完全证明 distillation。

讨论都停留在猜测。没有哪家旗舰公司会承认自己干过，承认等于承担 ToS 违约的法律风险，以及更要命的，被海外市场质疑模型独立性。

Musk 这次 "partly"，在两个层面改变了讨论。

一是把"用别家旗舰蒸馏自家模型"从地下做法变成行业公开承认的存在。OpenAI 跟 Musk 这场官司还在打，但从行业讨论角度，xAI 这种规模的公司都承认部分用过，distillation 的存在性已经不需要证明。

二是让"distillation 合规边界"这个原本只有学术界和法务圈在小范围讨论的话题，第一次进入主流媒体视野。OpenAI ToS 禁止用 API 输出训练竞品的条款写了很多年，但执行层面靠声誉和合作威慑，没怎么走过法庭。这一句话之后，OpenAI 怎么处理 xAI 这条线，会成为模板。

## 国产模型出海这一刀

国产大模型在国内市场不存在这个风险。监管不在意你是否蒸馏过 GPT-4，企业客户也不在意。

出海是另一回事。

DeepSeek 在 2024 年底冲到 App Store 榜首之后，美国国会议员立刻以"是否使用过 OpenAI 模型蒸馏"为由发起询问。Anthropic CEO Dario Amodei 在公开发言里多次暗示中国模型存在蒸馏问题。这条质疑线一直挂在国产模型出海的头顶。

Musk 这次庭审之后，质疑会变得更具操作性。

前几年的争论是"是否存在"。xAI 的例子把存在性钉死了，下一轮针对国产模型就会变成，"既然 xAI 都承认了，DeepSeek/Qwen/Yi 是不是也该公开自证"。证不出来的公司，在欧美企业级合同里会失去一块市场。

具体的影响有几条。

云厂商 API 上架审核会变严。AWS Bedrock、Azure AI Foundry 这种平台对中国模型本来就有合规审查，现在会加上"训练数据是否使用过竞品 API 输出"这一项尽调。

开源 license 措辞会被重新打磨。Meta 的 LLaMA license 早就写了不能用 LLaMA 输出训练非 LLaMA 衍生模型，执行起来一直模糊。这条线打完，行业可能出现更标准的反蒸馏条款。

## 这件事的连锁影响

Musk v. OpenAI 案本身走向不重要。这场官司更像私人恩怨，结果可能和解、可能 Musk 输、可能 Musk 赢，对行业格局影响有限。

但 4 月 30 日下午那一句 "partly"，多年后回头追溯，可能就是行业拐点。

它把模型蒸馏从"大家都在做但没人说"的潜规则，第一次以法庭证词的形式钉死在公开记录上。

接下来要看几件事，OpenAI 会不会真的对 xAI 提起 ToS 违约反诉、Frontier Model Forum 会不会推动行业级反蒸馏标准、欧美监管会不会把"训练数据来源审计"塞进 AI Act 类立法、国产旗舰模型有没有人主动出来做训练数据透明度声明。

任何一项动起来，距离中国 AI 公司都不远。

## 相关链接

- The Verge 庭审报道，https://www.theverge.com/ai-artificial-intelligence/921546/elon-musk-xai-openai-trial-model-distillation
- TechCrunch 同事件报道，https://techcrunch.com/2026/04/30/elon-musk-testifies-that-xai-trained-grok-on-openai-models/
- The Verge 4/30 庭审 Day 2 现场观察，https://www.theverge.com/tech/921022/elon-musk-cross-openai-altman
- Hinton 等人 2015 年蒸馏奠基论文 *Distilling the Knowledge in a Neural Network*，https://arxiv.org/abs/1503.02531

---
相关实体:: [[elon-musk|Elon Musk]] | [[xai|xAI]] | [[openai|OpenAI]] | [[sam-altman|Sam Altman]] | [[deepseek|DeepSeek]]
相关主题:: [[ai-mergers|AI 行业事件]] | [[ai-research|AI 研究]] | 国产AI生态 | 法律

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
