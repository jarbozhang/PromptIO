---
title: >-
  /writing-great-skills https://t.co/UQbWpcuK3E 来自 152K✨ Skills For Real
  Engineers 作者 @mattpocockuk 的新 Skill，教咱们用最少但最有行为牵引力的结构，把 Skill
  写成能稳定触发、分层加载、清楚完成、持续删减的“可预测工作流”。 # 跟这个优质 Skill 
source: X @shao__meng
url: 'https://x.com/shao__meng/status/2072126769986220157'
date: 'Wed Jul 01 01:14:54 +0000 2026'
likes: 135
reposts: 38
replies: 28
source_type: x
language: zh
account_name: shao__meng
fetched_at: '2026-07-01T23:13:33.749Z'
---
/writing-great-skills
https://t.co/UQbWpcuK3E

来自 152K✨ Skills For Real Engineers 作者 @mattpocockuk 的新 Skill，教咱们用最少但最有行为牵引力的结构，把 Skill 写成能稳定触发、分层加载、清楚完成、持续删减的“可预测工作流”。

# 跟这个优质 Skill 学它的编写思想

1. Skill 的根本目标是过程可预测
Skill 不是知识库，也不是提示词堆叠。它的作用是让模型在某类任务中形成稳定行为路径。好的 Skill 应该减少“这次做得细、下次做得浅”的波动。

2. 触发方式有成本权衡
它区分两类 Skill：
· Model-invoked：模型能自动发现并调用。优点是无需用户记住，缺点是 description 会长期占用上下文注意力。
· User-invoked：只有用户点名才会触发。优点是零上下文负担，缺点是用户必须记得它存在。

这里很关键：不是所有 Skill 都该自动触发。只有当模型确实需要自己识别任务，或其他 Skill 需要调用它时，才值得让它 model-invoked。

3. description 是触发器，不是简介
对于 model-invoked skill，description 的职责不是介绍得完整，而是准确告诉模型“什么时候该用我”。因此它应当前置关键触发词，只保留真正不同的触发分支，避免同义重复。

这点很实用：很多 Skill 写坏，是因为 description 像产品简介，而不是调用条件。

4. 信息层级决定 Skill 是否清爽
它提出一个三层结构：
· SKILL.md 中的步骤：模型必须按顺序做的事。
· SKILL.md 中的参考：模型运行时需要随手查看的规则、定义、事实。
· 外部参考文件：只在特定场景需要加载的材料。

好的 Skill 不把所有东西塞进主文件，而是用 progressive disclosure：常用、必须、影响流程的内容留在主文件；分支性、解释性、定义性内容放到外部文件，通过明确指针调用。

5. 每个步骤都要有完成标准
它特别强调 completion criterion。一个步骤不能只写“分析清楚”“完成检查”这种模糊目标，而要让模型能判断“是否已经完成”。

完成标准越清楚，越能防止模型提前进入下一步，也就是它说的 premature completion。

6. 拆分 Skill 不是为了整洁，而是为了控制注意力
什么时候拆？
· 如果一个 Skill 有独立触发词，可拆成单独的 model-invoked skill。
· 如果后续步骤会让模型急着往前跑，可把流程拆开，隐藏后续步骤，迫使模型认真完成当前阶段。

这很像工作流设计中的“减少提前优化”和“控制认知视野”。

7. leading word 是压缩行为的关键词
它提出一个很有洞察的概念：leading word。也就是用模型预训练中已经熟悉的强概念，来压缩一组行为要求。

例如与其反复写“快速、确定、低开销”，不如找到一个更有行为牵引力的词。好处有两个：节省 token，并且更容易稳定唤起模型已有的行为模式。

但它也提醒：弱词可能无效。例如“be thorough”如果只是模型默认会做的程度，那就是 no-op；需要更有约束力的词。

它的失败模式诊断很有用
这个 Skill 给出的几个常见问题非常精确：
· Premature completion：模型过早认为当前步骤完成。优先修正完成标准，而不是马上拆 Skill。
· Duplication：同一个意思出现在多个地方，增加维护成本，也会让某个概念被模型过度重视。
· Sediment：旧内容沉积，没人敢删，导致 Skill 越来越脏。
· Sprawl：内容都有效，但主文件太长，注意力被稀释。
· No-op：看似有用，实际不会改变模型行为的句子。

其中最有操作价值的是 no-op 测试：一句话如果删掉后模型行为几乎不变，它就不该留在 Skill 里。
