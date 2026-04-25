# Simon Willison 把 DeepSeek V4 跑了一遍，结论是"接近前沿但价格只是零头"

昨天我在这个号上写 DeepSeek V4 双发上 OpenRouter，那会儿手头只有官方页面上的几行 spec 和一个定价表。

今天 Simon Willison 把这两个模型实测了一遍，写了一篇拆解，标题原句是"almost on the frontier, a fraction of the price"。

接近前沿，价格只是零头。

我把他文章里所有的实测细节扒了一遍，发现昨天我下的"Flash 改写游戏规则"的判断，可能还低估了一点。

## Simon 拿什么测的

熟悉他的人都知道，每次有重要模型发布，他都会甩同一个 prompt 上去，"生成一个 SVG，画一只鹈鹕骑自行车"。

听起来很无厘头，但这个测试比 benchmark 实在。鹈鹕骑自行车这件事，训练集里几乎没有，模型必须从"鹈鹕长什么样""自行车长什么样""两个东西怎么组合在一起"三个维度同时推理，还要把空间关系翻译成 SVG 的坐标语言。

Flash 跑出来的结果，Simon 的原话是"excellent bicycle"，自行车框架和链条画得很到位，鹈鹕表情有点凶巴巴的，翅膀直接搭在车把上。

Pro 跑出来反而有点翻车。自行车主体没问题，但辐条画得有点歪，鹈鹕的解剖结构跑偏了，身子过大，只画了一个翅膀。

这个细节挺有意思。在这个测试里，Pro 没有比 Flash 表现好。

## 为什么 Pro 反而输给 Flash

Simon 在文章里贴了 DeepSeek 自己的技术报告里的一段话，说 V4-Pro 单 token 的 FLOPs 只有 V3.2 的 27%。

也就是说，Pro 这次是在"用更少的算力，做更多的推理"。MoE 的激活参数从 V3 那一档往下压，靠架构和训练数据补回来。

这个路线在 benchmark 数字上是漂亮的，但在"凭空想象一只鹈鹕怎么骑车"这种没有标准答案的开放任务上，可能会暴露出"想象力变窄"的问题。

Flash 反而因为定位明确，"我就是给你做小任务、做快速推理"，预期不高，跑出来的 SVG 反而让人意外。

我自己一直觉得，鹈鹕骑车这种测试比 MMLU 之类的 benchmark 更能看出模型的真实手感。MMLU 是闭卷考试，鹈鹕骑车是开卷创作。

## 价格对比，Simon 也算了一遍

他文章里直接拉出了一张价格清单，把 Flash 跟同档位的"小而便宜"模型放一起比。

Flash，输入 $0.14/M，输出 $0.28/M。

GPT-5.4 Nano，输入 $0.20/M，输出 $1.25/M。

也就是说在小模型这个赛道，Flash 输入便宜 30%，输出便宜接近 4.5 倍。

Pro 这一档，$1.74/$3.48，对标的是 GPT-5.4 和 Gemini-3.1-Pro 这两个旗舰。Simon 在文章里写得很坦白，DeepSeek 自己的技术报告也承认，V4-Pro 在能力上落后这两家"大约 3 到 6 个月"。

但价格只是它们的零头。

这就是标题里"a fraction of the price"的意思。不是"略便宜"，是"一个零头"。

## 一个昨天没讲透的点，开源权重

昨天我在文章末尾给读者留了个"等一周看权重"的尾巴。

Simon 的文章里把这事说实了。Pro 和 Flash **都是 MIT 协议开源**。这个许可证比 V3 当年还要宽松，商用、改、二次发布都不受限。

他自己也兴奋，原话是希望能在自己 128GB 的 MacBook 上跑量化版的 Flash，并且预测"Unsloth 团队应该很快会出量化版本"。

13B 激活的 Flash，量化到 4-bit，理论上一台 64GB 内存的 Mac Studio 就能跑。如果 Unsloth 的 GGUF 出来，llama.cpp 这一票本地推理工具马上就能接。

国内的玩家就更有想象空间了。一台单卡 4090，跑 INT4 量化的 V4 Flash，做长上下文的 RAG 应用，电费可能比 API 还便宜。

## 我的判断

我说几个可能得罪人的判断。

第一，Pro 这一档的实战体验，目前没有"碾压感"。Simon 的鹈鹕测试 Pro 翻车，他自己引述的数据也说 Pro 落后 GPT-5.4 三到六个月。如果你做的是高难度推理、复杂 agent 链路，现在不要急着把 Claude 或 GPT 切成 V4 Pro。先双跑对比，看你的具体任务里 Pro 的失分点能不能接受。

第二，Flash 才是这次发布真正的"行业重启键"。昨天我说 Flash 重新定义了"什么叫便宜"，今天 Simon 把这个判断坐实了。在 GPT-5.4 Nano 这个"小模型最便宜档"上，Flash 输出价格是它的不到四分之一。任何一个跑了一年 RAG、跑了一年 agent 中间步骤的团队，都应该今天就把 Flash 加进 A/B 测试。

第三，开源权重这件事被严重低估。MIT 协议 + 13B 激活，意味着 Flash 在中国本土会有一波"私有化部署"的浪潮。很多对数据合规敏感的行业，金融、医疗、政府，之前因为没有合适的开源大模型只能买私有云 API，现在有了 V4 Flash，可以彻底切到本地。

当然冷静一点说，鹈鹕画图这种主观测试不能代表全部。Simon 自己也承认，benchmark 还要等社区跑完才知道 Pro 在编程、数学、长上下文这几个硬指标上的真实位置。

但定价加开源这两件事叠加，已经够了。

## 行动建议

如果你昨天看完我的文章只是收藏了一下，今天可以做几件具体的事。

一，把 Simon 的鹈鹕 prompt 抄一下，自己在 OpenRouter 上跑一遍 V4 Pro 和 V4 Flash。"Generate an SVG of a pelican riding a bicycle"。这个 prompt 是公开的，不消耗你的私有数据，跑一次几乎不要钱，但能让你对模型的真实手感有个直接印象。OpenRouter 国内可以直连，不需要任何额外配置。

二，去 Hugging Face 上盯一下 deepseek-ai 的官方账号。Pro 和 Flash 的权重文件按 Simon 的判断很快会放出来。一旦 GGUF 量化版上线，本地能跑的门槛就到了"一张 4090"或者"一台 64GB Mac"这一档。

三，把你团队里那条"用 Claude Sonnet 跑的中间步骤"翻出来。不是替换主模型，是替换那些"反正只是做个意图识别、做个简单分类"的 cheap call。Flash 在这种场景下的成本，跟 Sonnet 差一个数量级。

昨天我写完那篇 V4 双发的文章，标题里说"价格战新底部"。

Simon 今天用一只画歪了的鹈鹕告诉我，底部还在往下走。

相关链接

- Simon Willison 实测原文, https://simonwillison.net/2026/Apr/24/deepseek-v4/
- DeepSeek V4 Pro on OpenRouter, https://openrouter.ai/models/deepseek/deepseek-v4-pro
- DeepSeek V4 Flash on OpenRouter, https://openrouter.ai/models/deepseek/deepseek-v4-flash
- Simon 的 llm-openrouter 工具, https://github.com/simonw/llm-openrouter

---
相关实体:: [[deepseek|DeepSeek]] | [[simon-willison|Simon Willison]]
相关主题:: [[ai-pricing|AI定价]] | [[local-inference|本地推理]] | [[ai-research|AI研究]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
