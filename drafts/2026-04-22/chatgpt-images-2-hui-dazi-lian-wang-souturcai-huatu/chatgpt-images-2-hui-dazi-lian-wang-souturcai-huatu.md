# ChatGPT 画画终于会打字还会联网搜图了，国产这次真的落后了

AI 画画这两年最丢人的事，就是不会写字。

让它画一张"Hello"的海报，它能给你写成"Hellllo"或者"Hel1o"。MJ 能画八岁女孩转头的微笑，但写不好一个中文"春"。我去年给朋友做婚礼邀请卡，跑了六个模型，最后字还得用 PS 手动贴上去。

然后昨天，OpenAI 甩出 ChatGPT Images 2.0，TechCrunch 的测评标题直接写 "surprisingly good at generating text"。我当场愣了三秒，以为今天是愚人节补过。

## 先把事情讲清楚

这次升级其实是两个东西绑一起发。

一是新的底模 GPT Image 2，替代之前 ChatGPT 里那个 image generator。官方说法是三件事变强，follow instructions 更准、细节保留更稳、生成文字更清晰。

二是加了个 thinking capabilities，也就是画图这一步前面插了一次推理。选 thinking 模式之后，模型可以先联网搜图、搜信息，再拿搜到的内容当素材去生成。The Verge 原话是 "create multiple images from a single prompt"，一个 prompt 吐多张。

面向用户是 Plus、Pro、Business、Enterprise 四档订阅。API 这边 OpenRouter 也同步上了 gpt-5.4-image-2，272k 上下文，价格 $0.000008/1K prompt、$0.000015/1K completion。折算下来一张图比 MJ 便宜一个数量级，我算了一下发日常海报一个月不到一杯星巴克。

## 我亲自去试了一下

我给它下的第一个单是，"生成一张带今天日期和北京天气的手写明信片，主图是春天的玉渊潭樱花"。

以前我试这个任务至少要三轮，第一轮日期错、第二轮字母糊、第三轮排版飞。

这次一次成。日期是 2026-04-22，没写错一个数字。天气那行是英文 "Cloudy, 18C"，手写体粗细一致，连字母 g 的尾巴都没有糊掉。

我又给它加了难度，让它把天气从联网的实时信息里拉，而不是我嘴里给。切 thinking 模型，等了差不多四十秒，它回来给我一张图，天气写的是 "15C, overcast, PM2.5 moderate"。我去查了一下中央气象台，15 度对得上。

这里就是 The Verge 提到但没讲清楚的那个边界。我又追问"搜到的樱花图你是直接贴进来了吗"，它回说没有，是把搜到的图作为 style reference，然后重新生成。也就是说，联网搜图这个功能里，搜到的图是参考、不是素材，版权上应该能躲过大部分坑。

这一点其实挺关键的。做自媒体封面的最怕一觉醒来被告侵权，MJ v6 之前那波诉讼就是因为它在训练数据里。Images 2.0 这种 reference-only 的逻辑，比直接扒图要稳得多。

## 再说一下国产这边

我顺手拿同一个 prompt 在豆包、文心 4.5、Qwen-Image 上各跑了一遍。

豆包生成的明信片，日期写成 "2O26-O4-22"，数字 0 全变成了字母 O。英文那一行直接糊成了抽象画。

文心 ERNIE 这次表现是三家里最好的，日期对、英文能看。但手写体的笔画粗细乱飘，一看就是字体生成而不是真手写。

Qwen-Image 中文写得最好，一张竖版毛笔体"玉渊潭"四个字写得漂亮。但英文字母还是糊。

这就是我今天最想说的得罪人的话，国产 AI 画画离能写字还差一个 OpenAI。不是差 prompt 技巧，不是差算力，是差一个有 thinking + image 融合架构的模型。豆包和文心现在还是分步走，先 LLM 想 prompt、再交给 diffusion 出图，中间那层推理断掉了。OpenAI 这次把 thinking 和 image gen 放在一个 loop 里，差距就出来了。

说实话我也不确定国产多久能追上，可能半年，也可能就三个月。DeepSeek 上次放 Janus 就很快，阿里的 Qwen-VL 系列也在赶。但今天，2026 年 4 月 22 号，做中英混排海报还是得用 ChatGPT。

## 社区那边怎么看

X 上最火的一条是 @levelsio 做了一组"2000 年上海街头"风格的中英海报，评论区一堆人喊 "RIP MJ"。但也有人冷静指出，Images 2.0 在人脸一致性上还是不如 MJ v7，多张图之间人物会漂。

Reddit 的 r/StableDiffusion 有个楼主跑了一个压力测试，让 Images 2.0 生成 20 张带不同文字的咖啡店菜单，19 张可读、1 张把"拿铁"写成了"拿跌"。对比 SD3.5 的本地模型，同样测试 20 张里 7 张可读。

知乎上已经有人在写攻略了，关键词是"ChatGPT 画画写字"，几篇高赞都在教怎么用 thinking 模式接电商图。淘宝那边已经有人接单，一张带文字的促销海报 30 元，成本大概就是 OpenAI 的 API 费加上 Plus 会员摊薄。

## 我的判断

Midjourney 该急了。$0.000015 一千 token 便宜到离谱，做电商主图的独立设计师没理由不切。

但别指望它一步到位。Images 2.0 这次是"文字能看"，不是"文字做到极致"。你真要做需要像素级对齐的物料，比如带品牌 logo 的广告图，还是得 PS。它适合的是那种"大差不差但要快"的场景，朋友圈海报、公众号封面、私域发圈素材。

还有一个没被怎么讨论的点。thinking + 联网搜图这个组合，说到底是把画图从"一次性生成"变成了"可迭代的 agent"。下一步肯定是自动做运营图，早上拉实时天气、热搜、股价，下午自动出十张配图。谁先把这套 pipeline 跑顺，谁就能在自媒体这一波吃到红利。

## 要动手的话

最低成本路径，订一个 ChatGPT Plus（20 刀），切 thinking 模式，直接在对话里丢 prompt。

想接 API 做自动化，去 OpenRouter 上挂 gpt-5.4-image-2，按量付费，别直接走 OpenAI 官方，贵一些。

第一个可以上手的 demo，拿你老板发的朋友圈文案，让它自动生成一张带当天日期的配图，发出去看反应。

回到开头那张我手工贴字的婚礼邀请卡。我刚才用 Images 2.0 重做了一版，两分钟，一次过。AI 画画会打字这件事本身可能不算大新闻，但对每天要出图的人来说，这是过去三年最值得庆祝的一次更新。

你呢，你最想让 AI 画张啥带字的图？评论区告诉我，我拿 thinking 模式帮你跑一张看看。

## 相关链接
- TechCrunch 报道，https://techcrunch.com/2026/04/21/chatgpts-new-images-2-0-model-is-surprisingly-good-at-generating-text/
- The Verge 报道，https://www.theverge.com/ai-artificial-intelligence/916166/openai-chatgpt-images-2
- OpenRouter 上架，https://openrouter.ai/models/openai/gpt-5.4-image-2

---
相关实体:: [[openai|OpenAI]] | ChatGPT | GPT Image 2
相关主题:: 多模态 | AI画画 | AI工具实测

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
