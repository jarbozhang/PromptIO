# OpenAI 成立 DeployCo 把"企业 AI 落地"做成独立公司，国内乙方现在还来得及

5 月 11 号，OpenAI 在自己的官方博客上挂出了一条几乎没被中文媒体认真翻译的消息，标题叫 *OpenAI launches DeployCo to help businesses build around intelligence*。一句话，OpenAI 把"帮企业把前沿模型落到产线上、把使用变成可衡量的商业产出"这件事，单独拆出来做了一家公司，名字就叫 DeployCo。

这条消息单独看不大，配上一周前那篇 *Introducing B2B Signals* 看，味道就出来了。B2B Signals 那份研究在讲一件事，前沿企业怎么从"试用 AI"过渡到"用 Codex 跑 agentic workflow 形成持久竞争壁垒"。两条放在一起，是 OpenAI 在告诉市场，下一年它不再只卖 API 和 ChatGPT 订阅，它要直接下场做"乙方"，做企业 AI 落地的总包。

值得国内任何一个还在做 AI 落地项目的乙方公司、独立开发者、AI 咨询从业者认真看一眼。

## DeployCo 到底是什么定位

OpenAI 自己给的定位很克制，原话是 *a new enterprise deployment company built to help organizations bring frontier AI into production and turn it into measurable business impact*。

拆开看三件事。一，它是独立公司（company），不是产品线、不是部门、不是 solution kit。二，它的使命词是 deployment，不是 model、不是 platform、不是 agent，是部署。三，它要做的事是把前沿 AI 推进 production，并把它转化成可衡量的商业影响。

合起来，DeployCo 就是 OpenAI 版的 Accenture，或者更准确说，是 Accenture + Palantir Foundry 的合体。Accenture 那一面是人，是顾问，是项目经理，是把客户的业务流程拆开重组的能力；Palantir Foundry 那一面是平台，是把模型、数据、工作流封装成可重复部署的"前向部署工程"基础设施。OpenAI 现在把这两件事自己做了。

如果你之前以为 OpenAI 是个模型公司，看到这一步要更新认知。它正在把自己变成一家"以模型为内核的企业服务公司"，模型只是其中一层。

## B2B Signals 那份报告里其实早就埋了伏笔

B2B Signals 这份 5 月 6 号发的研究，今天回头看就是 DeployCo 上线前的市场教育文件。

它讲的几个核心发现都指向同一件事，*前沿企业*（frontier firms）正在拉开和*跟随企业*（followers）的差距。差距不是来自买了哪家的模型、订了多少 token，而是来自三个能力。

第一，**Codex-powered agentic workflow 的规模化**。报告反复强调 Codex 不是给开发者写代码的工具，是给企业改造工作流的 agent 内核。前沿企业把 Codex 接进了 ticket 处理、合同审阅、销售线索分级这些业务流程里，followers 还停在"用 ChatGPT 写邮件"那一层。

第二，**部署深度（depth of deployment）**。前沿企业平均接入的 OpenAI 能力数（API、Codex、Realtime、Assistants）显著多于 followers，而且这些能力在内部是有协同的、不是各部门各跑各的孤岛。

第三，**衡量体系**。前沿企业有把 AI 使用量映射到业务 KPI 的能力，followers 没有，所以 followers 永远在解释"我们也在用 AI"，但讲不清产生了什么。

DeployCo 要解决的就是 followers 跟不上前沿企业的三道坎，工作流改造、深度部署、效果衡量。OpenAI 自己来做这件事。

## 对照火山方舟、百炼、魔搭，DeployCo 缺的那一格

国内三家头部 AI 平台过去一年走的是平台化路线。

火山方舟走的是 model marketplace + infra，把豆包、DeepSeek、Llama 这些模型一锅端进同一个 API 入口，再加上向量库、工作流编排、prompt 调试这些 infra 工具。它的逻辑是"我把所有 model 和工具都给你，你自己用"。

百炼走的是 model + agent + workflow，更明显地往 Bedrock 和 Vertex AI 的方向靠，强调"开箱即用的 agent 模板"。它的逻辑是"我把组件和模板都给你，你拼一拼"。

魔搭走的是 community + foundation model，社区驱动、模型为中心，给你的是模型本身和社区贡献的微调版本。它的逻辑是"我把素材都给你，你研发"。

三家都对，三家都在卷"上游能力"。但三家都缺同一格，**落地咨询和前向部署**。这一格在国内一直是被一群中小乙方公司、4A 数字部门、产品经理出身的独立顾问填的，散、乱、定价不透明、交付质量不稳。

DeployCo 把这一格在美国市场用一家 OpenAI 子公司直接接管了。国内三家平台型公司之所以暂时还没动作，说到底是因为做"项目制服务"跟它们的平台型估值逻辑冲突，项目制毛利低、不可规模化、影响估值。

这就是国内乙方的机会窗口。

## 国内 AI 乙方现在还来得及做的事

我说的"乙方"是个宽口径词，包含三类人，

- **AI 咨询 + 落地实施公司**（数百人到几千人规模的）
- **独立开发者 / 小工作室**（接 AI 项目的）
- **从大厂 PM/算法转出来做咨询的个人**

三类人面对 DeployCo 这条线的位置不同，能做的事也不同。

### 第一类，咨询实施公司，抢"中国版 DeployCo"的窗口

OpenAI 在美国能做这件事是因为它有"模型 + 品牌 + 钱"三件事。国内对应的位置是火山、阿里、腾讯、字节内部的相应部门，但前面说了，它们暂时没动力做项目制。

这就给了独立的咨询实施公司一个"中国版 DeployCo"的窗口，你不需要自己做模型，你只需要做"模型不可知的企业落地服务"。具体做法是绑两到三家模型供应商（DeepSeek + 豆包 + Qwen 已经够），做行业垂直化，做交付方法论沉淀，做项目管理工具链。

参考标准是 Palantir 早期做 FDE（forward deployed engineer）的那套打法，把工程师扔到客户现场住三个月，把客户的业务流程吃透，再回来沉淀方法论。听起来重，但是 AI 落地真正稀缺的能力就是这种。

### 第二类，独立开发者，接 AI 项目，定位为 "FDE for hire"

独立开发者最该看的不是 DeployCo 本身，而是 B2B Signals 报告里那句*前沿企业在用 Codex 改造内部工作流*。

这句话翻译成你的接单话术就是，*我帮你把内部最痛的那一条流程，用 Codex / Claude Code / Cursor 改造成 agent workflow，按效果付费*。

具体选项，
- 客服工单分诊、回复初稿生成（最容易出 KPI，最容易讲故事）
- 销售线索打分、邮件外联自动化（B2B 公司刚需）
- 合同审阅、合规检查（律所、企业法务部门刚需，单价高）
- 内部知识库 RAG 接 IM bot（钉钉/飞书企业最常见的需求）

报价逻辑别再卖人天了，参考 DeployCo 的口径，*measurable business impact*。把交付物锁死在一个可衡量指标上，比如客服首响时间从 X 分钟降到 Y 分钟，比如销售线索分级准确率提升 N 个百分点。客户为效果买单，单价和复购都比按人天卖工时高一个量级。

### 第三类，PM/算法出身的个人顾问，做"行业 know-how + AI 选型"

不需要写代码，不需要部署，靠的是行业经验和对模型能力边界的判断。

这条线在 DeployCo 出来之前就有人在跑，美国那边专门做 *AI transformation advisor* 的独立顾问，按小时收费 500 到 2000 美元不等。国内对应位置目前还没起来，是因为国内企业还停在"花钱招个 AI 工程师"或者"找乙方公司做项目"这两条思路上，缺了"花钱买决策建议"这一层。

DeployCo 这条线如果在美国跑成，会反向教育国内的决策层，让"花钱买 AI 落地决策建议"这件事变成显学。提前一年开始积累行业案例、写公开内容立人设的个人顾问，会吃到第一波红利。

## 还有一个要警惕的事

DeployCo 走的是 OpenAI 直营路线，意味着两件事，一，它和 OpenAI 自家模型深度绑定；二，它的定价权在 OpenAI 手上。

国内乙方真要从这条线吃到饭，**核心壁垒一定要建在"模型不可知"这个点上**。绑死任何一家模型，长期都会被它的定价权和能力边界卡住。OpenAI 自家做 DeployCo 解决了它自己模型的销售问题，但解决不了一个企业客户同时要用 GPT、Claude、DeepSeek、Qwen 的现实需求。

这件事 Palantir 早就证明过，FDE 的核心价值不是某个模型，是"把多家供应商的能力按客户业务流程编排起来"的能力。国内乙方做这件事的天然优势是离客户近、懂中文场景、不被任何一家美国大厂绑架。

## 我的判断

DeployCo 这件事的信号意义是，**模型公司开始往下游走，企业服务公司开始往上游走，中间留给纯乙方的"翻译层"窗口在收窄**。

短期来看（未来 6 到 12 个月），国内还来得及。火山、百炼、魔搭三家平台型公司在估值逻辑里走不出项目制，给了乙方一段呼吸时间。今天还在做"AI 落地咨询"或者"接 AI 项目"的人，应该把这段时间用来沉淀方法论、绑定行业垂直、做内容立人设。

中期来看（12 到 24 个月），如果国内三家平台型公司里有任何一家学 OpenAI 拆个独立子公司专做企业落地，乙方就要面对正面竞争了。那时候活下来的乙方，会是"行业 know-how 比平台公司深、交付效率比 4A 高"的那批。

长期来看，AI 落地这件事会和当年云计算落地一样，平台公司收上游，咨询公司收下游，中间一层永远稀缺。在这一层做出方法论沉淀和品牌的乙方，估值会重估。

今晚就可以做的一件事，把 OpenAI 那两条原文（DeployCo 公告、B2B Signals 报告）认真读一遍，对照你现在手上的 AI 项目，问自己一个问题，*如果一年后有家"中国版 DeployCo"出现，我现在做的事会被它替代，还是会成为它要收购的资产*。

答案不一样，今天的选择就不一样。

## 相关链接

- DeployCo 公告原文，[openai.com/index/openai-launches-the-deployment-company](https://openai.com/index/openai-launches-the-deployment-company)
- B2B Signals 报告，[openai.com/index/introducing-b2b-signals](https://openai.com/index/introducing-b2b-signals)
- Last Week in AI 138 期 weekly 综述（站内搜 "last-week-in-ai-138"）

---
相关实体:: [[openai|OpenAI]]
相关主题:: [[ai-monetization|AI 变现]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
