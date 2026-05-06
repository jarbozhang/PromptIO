# OpenAI 物理学家 Lupsasca 谈 Vibe Physics，AI 这次写的不是代码是论文

Latent Space 5 月 5 日放出对 Alex Lupsasca 的访谈。他现在 OpenAI 新成立的 Science 团队，去年因为黑洞 photon ring 的工作拿了 New Horizons in Physics Prize。访谈核心是一个新词，vibe physics。

Karpathy 提的 vibe coding，本意是开发者把意图丢给模型，凭手感接受输出。这个范式被 Cursor 之类工具吃下后，成了主流交互形态。Lupsasca 在访谈里把这个词搬到了理论物理研究语境里，但他强调一句，vibe physics 跟 vibe coding 有质的差别，coding 多数时候是把已有技术重新拼一遍，physics 这边要求的是 actually extending the frontier of human knowledge。

差别先说清楚，下面进具体姿势。

## 黑洞专家在 OpenAI 内部怎么用 GPT-5.x 做研究

Lupsasca 的导师是哈佛的 Andrew Strominger，弦论领域那位。Strominger 一年前抛出一个关于 single-minus gluon tree amplitudes 的猜想，团队推出了一个公式，看起来非零，但完全做不下去。这个题卡了一整年。

Strominger 来 OpenAI 访问前一周，他们把这个问题丢给 ChatGPT。模型一开始说做不了。Mark Chen（OpenAI 的 CRO）让他们换个姿势，先用一道教科书 warmup 题给模型预热，再问原题。GPT-o3 在 11 分钟里复现了 Lupsasca 自己花了多天才推出的中间结果。然后模型自己搞出了 half-collinear regime 这个限制情形，关键公式有 32 项之和、每项又是四个因子的乘积，跨了四分之一页纸。在新对话里重新提问，模型不仅复现，还用了原作者不知道的另一种证明技术。

胶子论文之后他们开了个更狠的实验。给 ChatGPT 一个非常简单的 prompt，让它对引力子（graviton）重做一遍胶子的整套分析。引力子比胶子复杂得多，需要导入新技术，不是简单替换。结果是不到一天里跑出了 110 页新物理内容，团队后续花三周做人工验证。Lupsasca 说，从 prompt 到出全部结果总共不到 3 天。

这是 vibe physics 这个词的重量所在。不是模型把已知方法套个壳，是它在导师卡了一年的具体问题上推出了之前没人写出来的东西。

## 物理学家用 LLM 协作的 5 个具体姿势

姿势 1，warmup 喂教科书题再切入真问题。模型直接面对开放科研题会拒绝或敷衍，先做一道相关的标准题让它进入语境，再问原题。Lupsasca 那次正是这么救回来的。这跟工程上的 few-shot prompting 一回事，但关键是 warmup 题要在同一技术族系里。

姿势 2，让模型在每一轮提议下一步而不是自己规划全程。访谈里贴了原始交互节奏，GPT 给出一段长结果，然后问要不要做下一个相关推演，Lupsasca 说做，GPT 继续。链路是 GPT 提议、人确认、GPT 执行，人不预先列大纲。这跟 vibe coding 的接受输出姿态一致，但物理这边每一步的"接受"都伴随手工验算。

姿势 3，把同一个问题在新对话里再问一遍。胶子论文里他们重启对话重新提问，模型用了完全不同的证明路径达到同一结论。这相当于免费的交叉验证，本质是利用模型的非确定性做 independent re-derivation，在论文写作阶段比一次性结果更可信。

姿势 4，用模型导入你不熟悉的技术。引力子那篇关键不是把胶子 setup 抄过来，是模型自己引入了引力子计算需要的新工具。物理学家的舒适区是自己熟悉的技术族系，模型可以低成本把邻近领域的方法搬过来用，前提是你能在事后辨别它是不是用对了。

姿势 5，把人的 bandwidth 从单线程变多线程。Lupsasca 访谈里那句最关键，AI able to output results basically as fast as we can conceive and validate them, the scope of what one theorist can hope to achieve has just gotten a lot, lot bigger。一个理论物理学家以前一年能跑通一两条研究路径，现在可以同时铺开多条，让模型并行推，自己只负责挑选和验证。这不是"AI 替代研究者"，是研究者的 throughput 被解锁。

## 跟 vibe coding 哪里不一样

vibe coding 和 vibe physics 表面上都是"低 prompt、信任模型输出、人做最终验证"，但成本结构不同。

代码可以跑测试，错了就报错，反馈环路是分钟级。物理推演没有自动测试，每一步要人手算或者跟已知极限对照，反馈环路是小时到天。所以 vibe physics 对模型一致性的要求更高，对人的领域品味要求也更高，不是任何人都能 vibe。Lupsasca 自己承认还有大量问题模型做不动，以及它想不到的方法路径，这部分是他说的 taste。

另一个差别是 vibe coding 多数场景在做"已知能做的事让我快速做完"，vibe physics 在做"还没人做出来的事，让我看看模型能不能蒙对一条路"。后者失败率高，但成功一次就是新论文。

## 国内同行在物理推理上做了什么

DeepSeek 有过 Math 系列尝试。Qwen 团队做过 Qwen-Math 和 QwQ 推理模型，主要在 IMO、AIME、Putnam 这些标准化数学竞赛集上比 benchmark。这些跟 Lupsasca 描述的场景差距还不小，竞赛题有标准答案、有限定时间、领域已知，跟"导师卡了一年的开放推演问题"不是同一个量级。

国内目前更多是在工程化推理能力，把模型在数学推理 benchmark 上分数推高，再把能力包装到对话产品里。把模型扔进具体科研课题、跟一线物理学家长期协作产论文这种深度集成路径，国内还没看到公开案例。这件事的门槛不在模型，在愿意把自己卡了一年的具体问题原原本本交给模型并且接受重新理解失败前提的研究者，OpenAI 直接把 Lupsasca 雇成了 Research Scientist 是更彻底的姿态。

## 我的判断

vibe physics 不是一个新范式宣言，是 Lupsasca 给一种已经在小圈子里跑通的工作方式起了个名字。它能不能扩散到整个理论物理界还要看两件事，一是模型在更多子领域的能力是否同步起来，二是物理共同体能不能接受"AI 推、人验"的论文署名规范，目前 110 页论文的署名还是给了团队自己。

对国内研究者，能立刻拿来用的是那 5 个姿势，warmup 切入、轮次提议、新会话复验、跨领域导入技术、并行多线。不需要等国产模型在科研集成上追上来，OpenRouter 上 GPT-5.x 现在就能跑。比起追"国内能不能做 vibe physics"这个问题，更值得关心的是你自己手边那个卡了半年的问题，敢不敢按这个姿势重新切一刀。

## 相关链接

- Latent Space 原访谈，https://www.latent.space/p/lupsasca
- Lupsasca 个人主页，https://lupsasca.com/
- Black Hole Explorer 项目，https://www.blackholeexplorer.org/

[[openai|OpenAI]] [[lupsasca|Alex Lupsasca]] [[karpathy|Karpathy]] [[deepseek|DeepSeek]] [[qwen-family|Qwen]]

[[ai-research|AI 研究]] [[methodology|方法论]] [[vibe-coding|vibe coding]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
<!-- xhs_pass: false, reasons: [境外工具 ChatGPT/GPT-5.x 多次出现，建议生成小红书合规版] -->
