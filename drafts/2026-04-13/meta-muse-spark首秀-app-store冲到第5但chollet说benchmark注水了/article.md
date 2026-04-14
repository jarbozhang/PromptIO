# Meta Muse Spark首秀，App Store冲到第5但Chollet说benchmark注水了

Meta AI app从App Store第57名冲到第5名，只用了几天。背后是Meta沉寂整整一年后放出的新模型Muse Spark。但2152个点赞的帖子里，Chollet说了一句让人不太舒服的话。

这件事有意思的地方在于，三个不同圈子的人看到了三个完全不同的Meta。

## 先说市场端发生了什么

Muse Spark发布后，Meta AI app的App Store排名从第57位直接蹿到第5位，而且还在涨。

这个数据本身就值得停下来想一想。

Meta上一个模型是Llama 4，一年前的事了。Llama 4在社区里的口碑坦率讲不太好，很多人觉得那是个死胡同。沉寂一年，市场几乎忘了Meta还在做模型这件事。结果Muse Spark一出，用户直接用脚投票，下载量暴涨。

Ethan Mollick的评价很中肯，"came in far better than most were expecting"，考虑到Llama 4的前车之鉴和一年的空窗期，这个结果确实超出预期。

## Chollet为什么泼冷水

但Chollet看到的是另一面。

他那条2152赞的推文直接说，"overoptimized for public benchmark numbers at the detriment of everything else"。翻译一下就是，这个模型在公开基准测试上刷得很好看，但代价是牺牲了其他方面。

这不是随便一个人在喷。Chollet是ARC benchmark的创造者，搞了半辈子的"如何正确评估AI"。他接着说了一句更狠的，"Knowing how to evaluate models in a way that correlates with actual usefulness is a core competency for AI labs"，言下之意，Meta还没掌握这个核心能力。

说真的，我觉得Chollet这个批评击中了要害。Muse Spark在官方benchmark上和Opus 4.6、Gemini 3.1 Pro、GPT 5.4打得有来有回，但在Terminal-Bench 2.0上明显掉队。Meta自己也承认在"长期代理系统和编程工作流"上有差距。

这就是问题所在。现在的AI竞争已经不是"谁的分数高"的游戏了，而是"谁在真实场景里更好用"。一个在公开benchmark上表现亮眼但在实际coding任务上拉胯的模型，到底值多少？

## Simon Willison挖出来的才是宝贝

第三个视角来自Simon Willison，他没管benchmark争论，直接去meta.ai上扒工具生态。

他发现meta.ai聊天界面里藏了16个工具，远不只是个聊天机器人。

有意思的几个，Code Interpreter支持Python 3.9，跑着pandas、numpy、scikit-learn、OpenCV。一个叫"container.visual_grounding"的工具能做图像物体检测，返回像素级坐标。Simon拿一张浣熊图片测试，模型识别出8个物体，还能数出12根胡须、8只爪子。

还有一个能跨Instagram、Threads、Facebook做语义搜索的工具，只搜2025年1月之后的内容。

Simon的招牌测试是让模型画一只骑自行车的鹈鹕的SVG。Muse Spark的"Instant模式"画得不行，自行车都是歪的。但切到"Thinking模式"，鹈鹕像模像样了，自行车结构对了，还戴了顶蓝色骑行头盔。

他还拿了一张海边岩石上鹈鹕的照片测试计数能力，模型数出25只鸟，每只都画了标注圈。

## 我的判断

说实话我也不确定Meta这步棋走得对不对，但我倾向于认为Chollet说对了一半。

Benchmark注水这件事在行业里太普遍了，但不代表Muse Spark本身没价值。Meta宣称用不到Llama 4 Maverick十分之一的算力达到了同等能力，如果这个数字是真的，那效率提升本身就是个大事。

但我真正在意的不是模型好不好，而是Meta的产品策略。

Muse Spark不开源，这对Meta来说是个巨大的转向。Llama系列一直打的是开源牌，现在突然转向闭源托管模式，虽然Alexandr Wang暗示未来版本会开源，但这个信号本身就很微妙。

我认为Meta在做一个赌注，先用闭源产品冲用户量和App排名，证明自己在消费级AI市场有一席之地，然后再考虑开源的事。App Store第5名这个数据，就是他们想要的筹码。

这个策略能不能成，取决于一件事，Muse Spark在真实使用中到底好不好用。如果用户下载了试了两天发现跟ChatGPT比差距明显，那排名冲上去也会掉下来。

## 你现在可以做的事

打开 meta.ai（需要Facebook或Instagram账号登录），直接试Muse Spark的Thinking模式。重点不是看它聊天聊得怎么样，而是试试Simon发现的那些工具，让它生成一张图然后用Python分析，或者让它数一张照片里的物体。

这些工具能力才是判断这个模型值不值得关注的真正标准，而不是任何一个benchmark分数。

顺便，如果你试了，回来告诉我，它在你的实际任务里表现怎么样。毕竟Chollet说的"actual usefulness"，最终还是得靠真实用户来验证。

**相关链接**

- Simon Willison的Muse Spark深度分析, https://simonwillison.net/2026/Apr/8/muse-spark/
- Meta AI app（需登录）, https://meta.ai
- Chollet的评价原文, https://x.com/fchollet/status/2042004767585751284
- Ethan Mollick的评价, https://x.com/emollick/status/2043209068890763334

---
相关实体:: [[meta|Meta]] | [[chollet|Chollet]] | [[simon-willison|Simon Willison]] | [[emollick|Ethan Mollick]]
相关主题:: [[ai-pricing|AI定价]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
