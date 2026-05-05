# Microsoft Word 把法律 Agent 塞进来了，国内律师事务所还能等多久

5 月 1 日，Microsoft 在 Word 里塞进了一个新东西，名字直接叫 Legal Agent。不是又一个对话框，也不是右键菜单里的"AI 改写"，是一个专门服务法律团队的 agent，跑在律师每天打开的那个文档里。

负责人 Sumit Chauhan 是 Microsoft Office 产品组的 corporate VP，他的原话是这个 agent "不靠通用模型去解读指令，而是按真实法律实务塑造出来的结构化工作流，去处理那些定义清楚、可重复的任务，比如对照 playbook 一条一条审合同条款"。

翻译成人话，就是不指望 GPT 给你一段"建议你修改第 3 条"的散文，而是把审合同这件事拆成一套规则化的流程，每一步都能对回到法律团队自己定义的标准上。

## 这个 agent 到底跑什么

按 The Verge 拿到的描述，Legal Agent 至少能干三件事。

第一件，document edits。这个 agent 能直接在带 tracked changes 的 Word 文档上工作。律师都知道这那结果会怎样，合同审查的核心载体就是 tracked changes，谁删了谁加了谁批注了，是法律工作的基础语言。一个连 tracked changes 都吃不进去的 AI，在律所是没法落地的。

第二件，negotiation history。合同往返修改的历史，谁在哪个版本让了步，对方在哪一轮加回了什么条款，这是 negotiation 阶段最重要的上下文。Legal Agent 能分析复杂文档里的这条线，意味着它不是单文档处理器，而是带历史记忆的工作流参与者。

第三件，clause-by-clause review against a playbook。这是律师最日常的活，拿到一份对方草拟的合同，对照自己事务所或者甲方公司的 playbook，一条一条过。哪些条款必须有，哪些条款绝不能让，哪些条款可以谈。Microsoft 把这个动作做成了 agent 的标准能力。

我注意到 Chauhan 反复强调一点，"structured workflows shaped by real legal practice"。他在和市面上一堆通用 AI 法律工具划清界限，不是 prompt engineering 包一层，是按法律实务的真实流程去建模。

## 海外律师的工作流变化

Reddit 上有一条来自实际用户的反馈，发在 r/InterstellarKinetics，原帖是讲 Microsoft 这次集成的，标题用的还是"潜在变革"这种调子。下面有律师评论。

那位律师说，他们事务所早就在用 AI 审合同了，"它很糟糕"，给他们带来了时间和金钱上的成本，因为这个 AI"过度偏向 vendor 一方，对自己不利"。

这条评论的价值不在抱怨，而在它揭示的一个事实，海外律所早就把通用 AI 接进合同审查流了，但没人满意。问题不是 AI 不能审，是审的视角错了，AI 没有 playbook，没有事务所的立场，它只是给出一个看起来合理的、平均化的、对所有人都"中立"的建议，结果就是放过了对自己客户不利的条款。

Microsoft 这次的 Legal Agent 之所以值得看，是它把 playbook 作为一等公民。playbook 是事务所或法务部门的立场表达，AI 按这个立场去审，才有可能审出真正有价值的红线，而不是输出一份"你说得对，他说得也有道理"的废话。

那位 Reddit 律师还提了一个判断，他说这个产品对第三方法律软件 vendor 是"生存威胁"。Ironclad、LinkSquares、Lexion 这些公司过去几年讲的故事就是合同审查 AI，现在 Microsoft 把它直接打包进 365 订阅里，律所每年给 Microsoft 交的钱已经付了，再单独买一个第三方工具的理由就变薄了。

## 国内律所的处境

国内律师每天用的不是 Word，是 WPS 或者腾讯文档，更直接的现实是，国内律所如果想让一个 AI 在文档里按 playbook 审合同，能选的国内方案目前只有 WPS AI 和腾讯文档 AI 这类通用文档 AI 助手。

我去看了一下两家公开的功能描述，主要是文档总结、写作辅助、内容润色、智能问答这一类通用能力。也就是说，国内文档 AI 目前是把"AI"作为一个通用工具嵌进文档里，而不是为某个垂直行业建一套结构化工作流。

这是定位差距。Microsoft 把 Legal Agent 单独立项，给出 negotiation history、playbook 比对这种法律垂直功能。而国内文档 AI 的定位是"文档生产力提升"，律师拿过来用，能用，但要让它按事务所的合同审查标准去跑，需要自己 prompt 工程。

我没在 WPS AI 或腾讯文档的官方介绍里看到合同条款 playbook 比对、tracked changes 分析、negotiation history 这种针对法律垂直的能力描述。如果有读者是律所里的内部 IT，知道这两家有没有未公开的法律垂类版本，欢迎在评论区里补充。

更实际一点说，国内合同审查 AI 这个赛道并不是空白，幂律智能、法天使这些垂直公司在做。但问题是这些工具是独立产品，不在律师每天打开的那个 Word/WPS 里，律师得切换工具，把合同复制粘贴过去，审完再粘回来。Microsoft 的核心优势就是它在 Word 这个律师不会离开的入口里。

## 法务/律师能做什么

第一条，Microsoft 365 订阅在国内是有正规渠道的，有些跨国所、外资所本来就在用 enterprise 版的 Office 365。如果你的事务所已经是 Office 365 客户，可以联系 Microsoft 国内合作伙伴问一下 Legal Agent 的可用区域和上线时间，目前这个功能的具体 rollout 时间表，原报道没有提供。

第二条，做合规审查或者跨境业务的律师，如果你的工作流已经是英文合同为主，Legal Agent 跑英文合同的能力大概率是首发支持的。中文合同的处理质量我没看到第一手测试数据，建议谨慎评估。

第三条，对国内律所来说，更现实的路径是观察国内文档 AI 的迭代。WPS AI 和腾讯文档 AI 在底层模型能力上其实不弱，缺的是"为律师建一套结构化工作流"的产品决策。如果你是律所 IT 或者法务总监，现在是和 WPS、腾讯这类公司去聊垂直定制的好时机，他们大概率愿意做案例。

第四条，无论用哪一家的工具，记得做一件事，把自己事务所或法务部的 playbook 数字化。playbook 是 AI 合同审查的命门，没有 playbook，再好的 agent 也只能给你输出一份没立场的中立稿。这个工作不依赖任何工具，现在就可以开始做。

## 我的判断

Legal Agent 这个产品最重要的不是 Microsoft 又发了个 AI 功能，是它把"垂直行业 agent"的产品形态做了一次明确的示范。不是聊天框，不是 copilot 浮窗，是一个嵌在工作流里、跟着工作流的真实结构走的 agent。

这条产品路径，国内文档 AI 厂商一定会跟。问题是跟得多快，以及跟的时候，是真的去和律师事务所、医院、会计师事务所谈垂类工作流，还是又做一个通用聊天框贴上"行业版"的标签。

律师这一行特别值得做垂类，因为它的工作流足够结构化，playbook 是现成的产物，tracked changes 是现成的语言，合同条款是现成的对象。所有这些都是 AI agent 最容易切入的地方。如果国内文档 AI 一年内还没出律师垂类版本，那不是技术问题，是产品决策问题。

回到那位 Reddit 律师的话，"AI 审合同很糟糕"。不是 AI 不行，是没有 playbook 的 AI 不行。Microsoft 这次想清楚了这件事，国内厂商如果还在按通用 AI 的路子做文档助手，就还在解决错的问题。

---

相关链接:
- The Verge 原报道, https://www.theverge.com/news/921944/microsoft-word-legal-agent-ai
- Reddit 律师讨论, https://www.reddit.com/r/InterstellarKinetics/comments/1t0ee2t/exclusive_microsoft_is_integrating_specialized_ai/

---
相关实体:: [[microsoft]] | [[microsoft-word]] | [[wps]]
相关主题:: [[ai-legal]] | [[ai-office]] | [[agent-frameworks]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
