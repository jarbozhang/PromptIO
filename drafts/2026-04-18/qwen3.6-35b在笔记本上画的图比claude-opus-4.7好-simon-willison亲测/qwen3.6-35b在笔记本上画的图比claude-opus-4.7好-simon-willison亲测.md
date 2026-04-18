# Qwen3.6-35B在笔记本上画的图比Claude Opus 4.7好,Simon Willison亲测

一个20GB的量化模型，跑在笔记本上，画出来的鹈鹕骑自行车比Anthropic最新旗舰模型还好。

这不是我编的。Simon Willison，Python/Django圈的老炮，长期维护一个"鹈鹕骑自行车"SVG生成基准测试，前两天拿阿里刚发的Qwen3.6-35B-A3B和Anthropic刚发的Claude Opus 4.7做了对比。结果Qwen赢了。HN上445分，92条评论，吵翻了。

我盯着这个结果愣了好几秒。

## 一只鹈鹕引发的血案

先说这个测试是怎么回事。Simon有个经典prompt，"Generate an SVG of a pelican riding a bicycle"，用来测各家模型的多模态理解和代码生成能力。听起来很蠢，但这个任务要求模型同时理解鹈鹕的身体结构、自行车的机械原理、SVG的绘图语法，还得把它们合理地组合在一起。

Qwen3.6-35B-A3B的输出，自行车车架结构正确，天上画了云，鹈鹕还带着一个歪歪扭扭的喉囊。Opus 4.7呢，自行车车架画错了。Simon又开了thinking_level: max让Opus重试，车架还是不对。

Simon不放心，又换了个prompt测，"Generate an SVG of a flamingo riding a unicycle"，防止Qwen是专门针对鹈鹕训练过。结果更夸张，Qwen画的火烈鸟戴着墨镜、打着领结、叼着烟，SVG代码里还藏了一句搞笑注释。Opus的版本呢，Simon原话，"a competent if slightly dull vector illustration"。能力够，但没灵魂。

## 35B参数，只激活3B

这里有个关键细节容易被忽略。Qwen3.6-35B-A3B这个名字里，35B是总参数量，A3B是激活参数量。它用的是MoE (Mixture of Experts) 架构，推理的时候只有大约3B参数在干活。

那需要什么级别的硬件？Simon用的是一台128GB的MacBook Pro M5，跑的是Unsloth出的Q4_K_S量化版，模型文件20.9GB，通过LM Studio加载。HN评论区有人在M1 Max上测到了34 tokens/sec的速度。

坦率讲，3B激活参数跑出这种效果，这才是真正让我觉得离谱的地方。

## 社区里吵什么

HN评论区的讨论很有意思，大致分成三派。

看好派觉得这是本地推理的里程碑。一个笔记本能跑的模型，在特定任务上打平甚至超过需要几百块GPU的闭源旗舰，这个信号不能忽视。有人说，"It's a 35B model. It should not be this close."

怀疑派指出Qwen画的鹈鹕其实更像"一只弯嘴的鹳鸟"，脚也被截断了。Opus的输出虽然无聊，但物理结构更准确，辐条和喙的比例更合理。

务实派直接上数据打脸，有人贴出Power Ranking编程测试的结果，Qwen 3.6只解了98题里的11题，Opus解了95题。在真正的通用编程能力上，两者差距是数量级的。

说真的，三派都有道理。

## 我的判断

Simon自己说得很清楚，这个测试"说到底就是个笑话"，是在讽刺模型比较这件事有多荒谬。他承认量化版的Qwen大概率不比Opus 4.7更强，但"如果你需要的恰好是一只鹈鹕骑自行车的SVG，那Qwen在笔记本上跑确实更好"。

坦率说，这篇文章标题写了"亲测"，但核心结果来自Simon的测试，不是我跑的。我做的是读完他的文章和HN整个讨论串之后，形成了自己的判断。

我之前用Qwen系列的小模型做过一些SVG icon生成的活，体感上MoE小模型处理这类"规则明确、创意空间有限"的视觉任务确实出乎意料地好。Simon这次的结果印证了这个感觉——3B激活参数在鹈鹕这种任务上打平旗舰，说明这类架构在特定创意场景的性价比被低估了。

但我也不想过度解读。编程11/98 vs 95/98，这个差距是真实的。本地模型现阶段的价值不在于替代闭源旗舰，而在于找到那些"够用就行"的场景，把它们从按token计费的API上拿下来。

我自己现在写公众号文章的时候，经常需要把一段英文摘要转成中文要点、或者把JSON格式转成markdown表格，这种活儿以前都丢给API。但说实话，每次等API返回那两三秒挺打断心流的。如果本地34 tok/sec能搞定，我宁愿跑本地。

## 想试的话

动手门槛不高。

1. 装 LM Studio (lmstudio.ai)
2. 搜索下载 Qwen3.6-35B-A3B-UD-Q4_K_S.gguf (约20.9GB，来自Unsloth)
3. 需要一台至少64GB内存的Mac，128GB更稳

如果你也有M系列Mac，今晚就可以试。跑一下那个鹈鹕prompt，看看你的结果跟Simon的比怎么样，欢迎来评论区晒图。

## 相关链接

- [Simon Willison 原文](https://simonwillison.net/2026/Apr/16/qwen-beats-opus/)
- [HN 讨论 (445分)](https://news.ycombinator.com/item?id=47796830)
- [模型下载 Unsloth量化版](https://huggingface.co/unsloth/Qwen3.6-35B-A3B-GGUF)
- [LM Studio](https://lmstudio.ai/)
- [llm-lmstudio 插件](https://github.com/agustif/llm-lmstudio)

相关实体:: [[simon-willison|Simon Willison]] | [[anthropic|Anthropic]] 相关主题:: [[local-inference|本地推理]] <!-- REACH: 7/10 | 品牌✗ 利益点✓ 可操作✓ -->
