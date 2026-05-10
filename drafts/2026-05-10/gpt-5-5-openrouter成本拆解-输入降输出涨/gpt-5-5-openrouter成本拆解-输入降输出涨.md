# OpenRouter 拆 GPT-5.5 价格曲线，输入翻倍 / 输出翻倍 / 长 prompt 反而省钱

---
相关实体:: [[openai|OpenAI]] | [[gpt-5-5|GPT-5.5]] | [[openrouter|OpenRouter]] | [[deepseek|DeepSeek]] | [[kimi|Kimi]] | [[ant-group|蚂蚁集团]]
相关主题:: [[ai-pricing|AI 定价]] | [[ai-product-experience|AI 产品体验]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->

5 月 8 日，OpenRouter 在自家 announcement 页面贴了一份 GPT-5.5 的成本拆解，HN 投票冲到 209 点 68 评论。这份拆解没有按惯例只给一行"输入 X 美元、输出 Y 美元"，而是把价格拍在 6 个 prompt 长度区间上，得出一个反直觉结论，长 prompt 工作负载的实际成本涨幅，比短 prompt 还要小。

GPT-5.5 相比上一代 GPT-5.4，账面价格是输入从 $2.50/M tokens 涨到 $5.00/M，输出从 $15/M tokens 涨到 $30/M，输入输出都翻了一倍。但 OpenRouter 把自家近 30 天的实际调用日志按 prompt 长度切片之后，账单数字就不再线性了。

## 实际账单和账面价格不是一回事

OpenRouter 给出的 6 段实测增幅。

prompt 小于 2K tokens，单次成本上涨 92%，completion 长度增加 7%。
2K-10K，成本上涨 69%，completion 长度增加 52%。
10K-25K，成本上涨 51%，completion 长度反而缩了 32%。
25K-50K，成本上涨 62%，completion 缩 19%。
50K-128K，成本上涨 49%，completion 缩 28%。
128K 以上，成本上涨 85%，completion 缩 34%。

这条曲线值得读两遍。账面价格直接翻倍，意味着任何调用涨价都该是 100%，但实际增幅最低只有 49%。OpenRouter 给的解释是，GPT-5.5 在长 prompt 场景下"想得更短"，输出的 completion token 数量自动收敛，把输入端的涨价部分抵消掉了。

短 prompt 场景没有这个抵消机制。2K 以下 prompt 的 completion 长度还增加了 7%，输入和输出双双涨价、还吐得更长，单次成本就成了涨幅最大的那段。

换算成实际场景。一次客服 chatbot 单轮问答，prompt 通常落在 1K-2K，命中的就是 92% 涨幅那一档。一次 RAG 调用塞进 30K 上下文，落在 25K-50K，涨幅是 62%。一次代码 agent 把整个 repo 塞进去（50K-128K），涨幅是 49%。

短对话场景反而是最贵的。

## 国产模型当下的对照位

把 GPT-5.5 的 $5/M 输入 + $30/M 输出放在 OpenRouter 当前模型库里，对照位大致是这样。

GPT-5.5，输入 $5.00/M，输出 $30.00/M，上下文 1M tokens。
GPT-5.4（上一代），输入 $2.50/M，输出 $15.00/M。
DeepSeek V4 Pro，输入约 $0.40/M，输出约 $1.50/M。
Kimi K2.6，输入约 $0.55/M，输出约 $2.20/M。
蚂蚁 Ling-2.6 1T（MoE 总参 1T，激活 80B），输入约 $0.30/M，输出约 $1.20/M。
Qwen3.6 Max Preview，输入约 $1.20/M，输出约 $4.50/M。

按客服 chatbot 那个高频短对话场景算一笔。每天 10 万次调用、每次 1.5K 输入 + 800 输出，用 GPT-5.5 是 $750 + $2400 = 每天 $3150。换 DeepSeek V4 Pro 是 $60 + $120 = 每天 $180。换 Ling-2.6 是 $45 + $96 = 每天 $141。

价差是 17 倍到 22 倍。

## 缓存命中率才是省钱真相

GPT-5.5 的真正成本游戏不在标价，在 prompt caching。OpenRouter 这份 announcement 没有展开这一条，但 OpenAI 官方文档列出的规则是，重复出现的输入 prefix 走缓存读取通道，价格打 1 折，也就是 $5/M 输入降到 $0.50/M。

所以呢，如果你的 prompt 设计是"长 system prompt + 短用户输入"的形态，且 system prompt 在多轮调用之间稳定不变，账单就会按 1 折计算。但如果你的 prompt 每次都拼新的 RAG context、每次顺序都不同，缓存就无法命中，全额按 $5/M 算。

按命中率推算，缓存命中 90% 的工作负载下，GPT-5.5 实际平均输入价格是 $5×0.1 + $0.5×0.9 = $0.95/M，已经接近 Qwen3.6 Max 的 $1.20/M 输入价。

这就解释了为什么 HN 上的 209 点高赞和 68 条评论里，争论焦点不在"涨价合不合理"，而在"你 prompt 设计得对不对"。

## 切换决策的几个临界点

把上面两层一起看，国内开发者用 OpenRouter 调 GPT-5.5 的最佳工作负载形状是这样。

适合走 GPT-5.5 的场景。长 system prompt + 高频短输入，缓存命中率能稳定在 80% 以上。需要 1M tokens 长上下文且对推理质量极敏感的代码 agent 任务。多模态混合调用且只有 GPT-5.5 能跑通的特定 pipeline。

应该切回国产模型的场景。短对话客服 chatbot，prompt 长度 1-3K 且无法做缓存优化，DeepSeek V4 Pro 或 Ling-2.6 在这一档的成本只有 GPT-5.5 的 5%-7%，质量损失不到 10 个百分点。批量内容生成，例如商品文案、SEO 改写、知识点抽取，Kimi K2.6 在中文场景的输出风格更贴本地审美，且单价是 GPT-5.5 输出的 7%。RAG 调用且每次 context 都不同，无法吃缓存红利的，长 prompt 段名义上涨幅小但绝对成本仍然是国产模型的 10 倍以上。

混合架构。难任务路由到 GPT-5.5，简单任务路由到 DeepSeek V4 Flash 或 Ling-2.6 Flash，是 OpenRouter 用户当下最经济的姿态。OpenRouter 自家的 model routing API 现在支持基于 prompt 长度和复杂度做自动分发，配合上面这个临界点表，理论上能把账单砍到 1/3 以下。

## 我的判断

GPT-5.5 这次定价调整，看起来是涨价，实际是把"愿意为缓存做工程优化的用户"和"裸调 API 的用户"分成了两个价位档。前者付的是 $0.95/M，后者付的是 $5/M，差距 5 倍。

这不是 OpenAI 第一次玩这个游戏，但这次曲线把动作做得更明显，长 prompt 段的涨幅压到 49%，几乎是在直接告诉你"如果你做了功课，涨价你感受不到"。

对国内开发者，结论简单。如果你的产品月活够大、prompt 形状稳定，值得为 GPT-5.5 + 缓存优化做一次工程改造。如果你还在 PoC 阶段、prompt 频繁调整，别折腾了，国产模型当下的性价比窗口足够大，等产品形态稳定再回过头评估。

OpenRouter 这份拆解最大的价值，不是告诉你"涨了多少"，是把"账面价格"和"账单价格"的差距摆到了明面上。这件事在 GPT-5 时代就存在，只是没人愿意公开讲。

## 相关链接

- OpenRouter 成本拆解原文，https://openrouter.ai/announcements/gpt55-cost-analysis
- HN 讨论串，https://news.ycombinator.com/item?id=48057209
- OpenRouter 模型对照页，https://openrouter.ai/models
- OpenAI prompt caching 官方文档，https://platform.openai.com/docs/guides/prompt-caching

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
