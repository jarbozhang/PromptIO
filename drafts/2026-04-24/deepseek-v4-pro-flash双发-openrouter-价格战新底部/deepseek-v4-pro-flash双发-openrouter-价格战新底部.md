# DeepSeek V4 今天凌晨发了，Pro 1.6T 参数 Flash 贱到每 M 一毛钱

四天前我还在这个号上写，V4 要来了，据说成本是 GPT-4 的 1/70。

今天凌晨 OpenRouter 模型页挂出两个新条目，deepseek/deepseek-v4-pro 和 deepseek/deepseek-v4-flash。不是一个模型，是两个，一起上。

1/70 这个数字，兑现了。而且比我想的还狠。

## Pro 和 Flash，DeepSeek 这次学精了

先把账算清楚。

Pro 版本，1.6T 总参数，49B 激活参数，MoE 架构，1M 上下文。定价每百万 prompt token $1.74，每百万 completion token $3.48。

Flash 版本，284B 总参数，13B 激活参数，同样 MoE 同样 1M 上下文。价格是，每百万 prompt token $0.14，每百万 completion token $0.28。

你没看错。Flash 的输入价格是 0.14 美元一百万 token，差不多就是人民币一块钱。换算到国内读者熟悉的单位，每千 token 大概是万分之一人民币，每 M 输入等于一毛钱级别。

这个价格放在 2026 年 4 月这个时间点上，是离谱的。

Claude Sonnet 4.x 最便宜的 tier 输入是 $3 每 M，Flash 比它便宜 21 倍。GPT-5.5 Turbo 那档大概在 $0.5 到 $1 每 M 的区间，Flash 还是便宜 3 到 7 倍。

你现在在 Flash 上跑一个 RAG 应用，把整份产品文档塞进上下文，成本几乎可以忽略。

## 为什么是双发

4 月 20 号那批传闻里，所有人都在盯一个数字，1T 万亿参数。我当时也跟着写。

今天结果出来，DeepSeek 玩的是一手二元组合。

Pro 是给那些"我就要顶级效果，多花点钱无所谓"的用户，1.6T 参数是 DeepSeek 迄今最大的模型，比 V3 翻了一倍多。49B 的激活量意味着推理时的算力需求其实不算夸张，在 H200 或者华为昇腾集群上都能跑。

Flash 才是 DeepSeek 真正想让开发者天天调的东西。284B 总参数 13B 激活，这个规格差不多对标 GPT-5.5 Nano 或者 Claude Haiku 4.x，但价格直接打到地板。

换个角度看，Flash 的 13B 激活参数跑起来，速度会非常快。OpenRouter 的描述里直接写了"efficiency-optimized"和"fast inference"。你做流式对话、做 agent 的中间步骤、做批量数据处理，Flash 就是为这些场景设计的。

Pro 负责撑面子，Flash 负责赚流量。这不是 DeepSeek 一家的打法，是 Gemini 的 Pro/Flash 命名直接借过来的。但 DeepSeek 把 Flash 的价格往死里压，压到连 Google 自己的 Gemini Flash 都要重新想一下定位。

## 社区声音

OpenRouter 模型页挂出来后，英文 Twitter 上已经开始刷 benchmark。但现在谈性能还太早，我看到最多的一条评论是"先不管效果，这个价格我先把 Claude 账单砍半再说"。

有人在翻 DeepSeek 官方仓库，想看权重会不会开源。V3 当时是发布后一周放的权重，V4 目前还没有明确信号。

国内的讨论更实在。知乎上已经有帖子在问，OpenRouter 付款怎么搞，能不能用虚拟卡，延迟怎么样。这是中国开发者的真问题，不是效果好不好，是能不能真用上。

答案是能。OpenRouter 国内可以直接访问，不需要科学上网，支持虚拟信用卡。注册完充十美元，就可以把 Pro 和 Flash 都跑起来。deepseek.com 官方 API 当然更稳更便宜，但 OpenRouter 的好处是可以同一个 key 切全世界几十个模型做对比。

## 我的判断

我认为这次发布真正的杀招不是 Pro，是 Flash 的定价。

Pro 的 $1.74 输入价格已经很狠了，比 GPT-5.5 主力型号便宜一大截，但这个价格带不算 DeepSeek 首创，Qwen 和智谱年初都打到过类似水平。

Flash 的 $0.14 是重新定义了"什么叫便宜"。

我说一个可能得罪人的判断，接下来三个月，海外那批"便宜模型"套壳公司要过得很难受。很多 AI SaaS 的毛利就是靠模型调用成本和订阅价差挣的，一旦 Flash 这种级别的模型成为行业底价，用户会问"你为啥收我这么多"。

国内的各家 API 更要紧张。豆包、通义、Kimi 的 API 定价都在 flash 档位附近徘徊，DeepSeek 这一刀下去，国产云 API 市场的价格锚点又要往下走一轮。

当然冷静看，1M 上下文和顶级效果能不能同时做到，要等实测。Pro 的 49B 激活在编程和推理任务上到底跑得过 Claude Sonnet 4.6 还是 GPT-5.5，现在没有数据。V3 当年发布时也是数字漂亮，实际用起来在某些场景跟 Claude 还是有肉眼可见的差距。

但就算 Flash 的效果只是 GPT-4o 级别的，这个价格也已经改写游戏规则了。

## 行动建议

如果你在国内，现在就可以做三件事。

一，去 openrouter.ai 注册账号，充十美元，把 deepseek/deepseek-v4-flash 和 deepseek/deepseek-v4-pro 加进你的 playground，拿一个你自己项目里真实的 prompt 跑一下，直接对比你现在用的模型。

二，把你手上那个"因为 API 太贵跑不起来"的项目拉出来重新算账。假设用 Flash，每天 100 万 token 的消耗也就人民币一块多。之前很多"算不过来账"的 AI 功能，现在可以重启。

三，等一周看权重。V3 当时是发布后开源的，如果 V4 Flash 的权重放出来，你就可以在自己的 H100 或者昇腾集群上跑，成本再压一个数量级。

四天前我写 V4 是"万亿参数 GPT-4 成本 1/70"，当时留了个尾巴，说"参数来自 KOL 推文，以官方发布为准"。今天官方兑现了，而且是 1.6T 不是 1T，成本压得比 1/70 还猛。

这一年看模型发布看到麻木，但今天我是真的愿意去把手上的几个老项目重写一遍。

相关链接

- DeepSeek V4 Pro on OpenRouter, https://openrouter.ai/models/deepseek/deepseek-v4-pro
- DeepSeek V4 Flash on OpenRouter, https://openrouter.ai/models/deepseek/deepseek-v4-flash
- DeepSeek 官网, https://www.deepseek.com

---
相关实体:: [[deepseek|DeepSeek]] | [[openai|OpenAI]] | [[anthropic|Anthropic]]
相关主题:: [[ai-pricing|AI定价]] | [[local-inference|本地推理]]

<!-- REACH: 10/10 | 品牌✓ 利益点✓ 可操作✓ -->
