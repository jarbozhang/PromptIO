# Apple 一边赔 2.5 亿，一边把 iOS 27 改成"AI 模型自助餐"

5 月 4 号到 5 号这两天，Apple 在 AI 这条线上同时发生了两件事。

一件是赔钱。Apple 同意拿 2.5 亿美元和解一桩集体诉讼，原告是 2024 年 6 月到 2025 年 3 月之间买了 iPhone 16 全系或 iPhone 15 Pro 的美国用户，理由是 Apple Intelligence 当年的发布会承诺过 Siri 升级，结果一直没交付。每台合规设备先发 25 美元，根据申领量上下浮动，最高 95 美元。

另一件是甩锅。同一周 Bloomberg 的 Mark Gurman 爆出来，今年秋天的 iOS 27、iPadOS 27、macOS 27 会做一个新功能，让用户自己挑要用哪家的 AI 模型来跑 Siri、Writing Tools、Image Playground。Apple 内部把这个机制叫"Extensions"。

看起来是两件事，其实是同一件事的 A 面和 B 面。Apple 在公开承认，自己做不出来读者真正想要的 AI 体验，于是把模型这一层让出去。

## 2.5 亿不算多，难堪在哪

先把赔款这一边讲清楚。

诉讼从 2025 年立案，原告律所是 Clarkson Law Firm，核心指控是 Apple 在 2024 年 WWDC 上演示的那批 Siri 新能力（个性化语境理解、屏幕感知、跨 App 操作）被用作 iPhone 16 的整年营销话术，结果到 2025 年 3 月这些功能仍然没交付。

2.5 亿对 Apple 是什么概念，参照下它一个季度的服务业务收入大概 250 亿美元，这笔钱差不多是服务业务一天的零头。所以 r/apple 那条 2900 多赞的高赞帖里，最被认同的判断是"Apple got off easy"，逃过去了。

但难堪不在金额，难堪在原告律所拿到了 Apple 营销和产品脱节的实锤。r/iphone 有条 706 赞的评论说得很扎心，第一代语音助手时隔 15 年，连定时器和提醒事项都比刚发布时做得糟。这不是产品没做好，这是 Siri 这个品牌正在系统性地折旧。

更要命的是 4 月那条新闻，Apple 把整个 Siri 工程团队送去参加 AI 编码训练营，Reddit 上这条帖子拿了 670 赞。一家市值 3.5 万亿的公司，要给自家招了十几年的工程师补 AI 课，这画面本身就是一种姿态承认。

## iOS 27 让你挑模型，这才是真转向

第二件事比赔款重要得多。

按 Gurman 和 TechCrunch 的口径，iOS 27 会开放一个叫 Extensions 的接入框架。当前 Apple 在内部测试的有 Google Gemini 和 Anthropic Claude，OpenAI 的 ChatGPT 此前已经接入，会作为可选项保留下来。也就是说，今年秋天升级 iOS 27 之后，理论上你可以让 Claude 当 Siri 的脑子，让 Gemini 跑 Writing Tools，让 ChatGPT 处理 Image Playground，每一项功能挑不同的模型。

Apple 还会允许给不同模型配不同的 Siri 语音，这一条比想象中重要，意味着用户能从声音层面直接感知到背后是哪家模型在回答。这其实是把"Siri 是谁"这个问题，从 Apple 自己说了算，变成用户挑给我用。

Ternus 9 月接班 CEO，5 月就放出这个口子，时点上不是巧合。这是 Apple 自己给的答案，未来五年我不在模型这层卷，硬件和入口这层守住。Apple Silicon 已经被市场验证是跑本地 AI 性价比最高的硬件之一，Mac Studio、Mac mini 这一年线下都缺货，r/apple 上 600 赞那条讨论说得很直白，本地 AI 这股需求已经能撑出一个新的 Apple 商业模式。

Apple 在用硬件代差换软件代差。它在赌一件事，模型这层会很快商品化，最后能差异化的是端侧推理、生态权限和品牌信任。

## 国产模型怎么进这张清单

这才是国内读者最该看的角度。

Gurman 报道里点名的是 Gemini 和 Claude，TechCrunch 没提任何中国模型。但中国市场对 Apple 太重要了。iPhone 在中国年销量大几千万台，没有可用的 AI 后端等于 iPhone 在国内是个"半残设备"。所以 Apple 在国内的 AI 后端必须本地化，这件事不是会不会的问题，是谁的问题。

去年的传闻里，[[baidu|百度]]文心和阿里通义千问都被点名做过技术评估，但一直没看到正式签约。今年这个时间点重新看，国内能进 Apple 默认列表的候选其实就是几家。

[[bytedance|字节跳动]]豆包是用户量这条线上最强的，C 端口碑、手机生态合作（OPPO、vivo 都用过豆包能力）都是加分项，劣势是字节跟 Apple 在内容生态上长期是竞争关系。

[[xiaomi|小米]]这边 MiMo 已经开源到 7B 参数级别，算自研模型里走得比较快的，但小米跟 Apple 是手机硬件直接对手，Apple 选小米模型这事政治上几乎不可能。

百度文心 4.5 系列今年加速开源，企业服务这条线最厚，监管沟通经验最足，是国内 AI 公司里跟监管打交道最熟的，这个反而是 Apple 最看重的资源。

阿里通义千问开源生态全球都能见到，Qwen 系列在 Hugging Face 一直拿前排，Apple 选它能拿到全球可复用的方案。

[[zhipu|智谱]] GLM 系列在 ToB 上很厚，但 ToC 品牌识别度低于豆包。

我个人押的顺序是百度和阿里二选一最有可能，字节豆包做补位。智谱、商汤这一档进默认列表的概率偏低。

但这只是猜测。真正的变量是监管，工信部对外资手机内置境外 AI 服务的接入审批至今没有完整框架，iOS 27 在国内上线时要么走"国内特供版"逻辑（像 Apple Maps 在国内换中国数据源那样），要么干脆把 AI 这一栏在中区灰掉。第二种可能性不能排除。

## 我的判断

赔款 2.5 亿是 Apple 的一次危机公关，开放 Extensions 才是 Apple 的真转向。

[[apple|Apple]] 这一年的核心叙事正在从"我们做最好的 AI"变成"我们做最好的 AI 入口"。这是个大变化，意味着 Apple 不再跟 OpenAI、Google、Anthropic 在模型层正面打，而是把自己摆到分发层。这条路对 Apple 是合理的，硬件还是它最厚的护城河，模型不是。

但对中国 AI 公司是个真窗口。过去五年国产模型能进的全球分发渠道屈指可数，Hugging Face 算一个，OpenRouter 算一个，第三个目前看就是 Apple 这次的 iOS 27。能挤进默认列表的国产模型，等于拿到了一张全球 C 端 AI 入场券。

下一个值得盯的时间点是 6 月 WWDC，Apple 通常会在那一刻公布 iOS 27 完整功能清单，Extensions 的合作伙伴名单大概率也会同步亮相。

到时候名单里有没有中文名字，比赔款 2.5 亿值得关注 100 倍。

## 相关链接

- The Verge 报道（赔款）https://www.theverge.com/tech/924706/apple-iphone-siri-intelligence-class-action-lawsuit-settlement
- The Verge 报道（iOS 27 模型选择）https://www.theverge.com/tech/924515/apple-intelligence-third-party-chatbot-extensions-ios-27
- TechCrunch 报道（Choose Your Own Adventure）https://techcrunch.com/2026/05/05/apple-plans-to-make-ios-27-a-choose-your-own-adventure-of-ai-models/
- r/apple 赔款讨论 https://www.reddit.com/r/apple/comments/1t4rzyh/apple_reaches_250m_settlement_over_siri_delays/
- r/apple iOS 27 模型选择讨论 https://www.reddit.com/r/apple/comments/1t4maiy/apple_to_let_users_choose_rival_ai_models_across/

相关实体 [[apple|Apple]] [[siri|Siri]] [[ios|iOS]] [[google|Google]] [[anthropic|Anthropic]] [[bytedance|字节跳动]] [[xiaomi|小米]]

相关主题 [[apple-strategy|Apple 战略]] [[ai-product-experience|AI 产品体验]] [[chinese-ai|国产 AI]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
