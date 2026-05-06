# Etsy 把 app 塞进 ChatGPT，AI 电商把流量入口换了，淘宝小红书会跟吗

5 月 5 日 OpenAI 干了两件事，对外口径分开发，但一起看才看得懂。

一件是 Etsy 在 ChatGPT 里上线了原生 app，用户不用关键词搜，直接说"帮我找个 100 美元以下的母亲节礼物，给爱园艺的妈妈"，ChatGPT 从 Etsy 一亿多商品里筛出来。另一件是 ChatGPT Ads Manager 公测，自助投放，CPC 出价，对接 Dentsu、Omnicom、Publicis、WPP 四家全球广告代理，技术侧 Adobe、Criteo 拉进生态。

一边是流量入口，一边是变现工具。两件事同一天发，是 ChatGPT 的商业化在两条腿一起跑。

## 不是搜索，是对话式购物

Etsy 这个 app 做的事，在传统电商的语境里其实不太能描述。

传统电商的流量逻辑是搜索框加算法推荐。用户输入关键词，平台返回排序结果，你点哪条决定了下一条推什么。Etsy 的 ChatGPT app 把这个链路换了。用户在 ChatGPT 里 @Etsy，描述场景，对话上下文里携带预算、收礼对象、情绪需求，最后从一亿多 SKU 里筛出 5 到 10 条，可比可买。

ChatGPT 里现在有这种原生 app 的，已经有 Angi（家政）、SeatGeek（票务）、Tubi（流媒体）、Wix（建站），加上 Etsy。零售向第三方 app 还有一条历史是去年 11 月 Target 接入、去年 10 月 Walmart 接入，路径是从 ChatGPT 内搜索品牌商品库存。这一波 Etsy 不是搜索，是把对话当成购物入口。

值得注意的细节是，ChatGPT 的"Instant Checkout"今年 3 月停了，OpenAI 自己做的对话内直接付款没跑通。Etsy 这版是退一步，AI 负责选品和过滤，付款回到自家 app。OpenAI 自己也学会了，对话式购物不一定要在对话里付钱，把 top funnel 的"发现"环节抢下来就够。

发现层，才是流量入口。

## Ads Manager 同步上线，链路终于闭环

如果只有 Etsy app 没有 Ads Manager，这事是产品故事。两个一起来，是商业模式。

OpenAI 之前做过 ChatGPT 广告测试，当时只能找代理或者自家直营销售。这次的 Ads Manager 是把它产品化了，ads.openai.com 上自助开户，CPM 和 CPC 两种出价方式都给。配套的是去年底已经上线的 Conversions API 和像素测量，广告主能追到曝光后用户是不是真的下了单、留了线索、注册了账号。

Digiday 的报道里提到 OpenAI 接下来还会推 CPA 出价和第三方测量。CPA 是按转化付费，这是给广告主交底，OpenAI 愿意把效果归因和数据透明这两件最敏感的事让出来。你想想看，ChatGPT 想做的是 Google Ads 的位置，不是 Twitter Ads 的位置。

这两条腿放一起，ChatGPT 的商业链路就闭环了。Etsy app 这种第三方 app 负责把"对话式购物"这个新行为做成习惯，让用户养成"找东西先在 ChatGPT 里说一声"的肌肉记忆。Ads Manager 负责在这个新流量池里拍卖广告位。一边是 organic discovery，一边是 paid placement，跟 Google 当年从搜索框走到 AdWords 是同一个剧本，只不过 Google 用了五年，OpenAI 想压在两年内跑完。

## 国产 AI 电商不是"会不会跟"，是已经走在前面

回头看国内，结论可能反直觉，对话式电商的链路国产 AI 已经跑了一年多，甚至在某些环节比 OpenAI 走得更彻底。

字节的豆包 3 月底已经做到 app 内闭环。用户绑定抖音账号，对话框里"我想要一个适合露营的折叠桌"，豆包给商品卡，下单支付全程在豆包 App 内完成，不跳抖音。这一步是 OpenAI 的 Instant Checkout 没跑通的事。

阿里这边路径不同。1 月千问 App 全面接入淘宝、支付宝、淘宝闪购、飞猪、高德。点外卖、买东西、订机票的入口都在千问里。淘宝自家的"淘宝问问"是早一代的对话式导购，2023 年 9 月就上了。

腾讯元宝、月之暗面 Kimi 走的是另一条，对话里返回商品图片或文字链，点击跳转淘宝、京东、得物。本质是 affiliate，不做交易闭环。

小红书 2024 年接入了"达芬奇"AI 助手，2025 年内部代号"珠玑大模型"在搜索和推荐里铺开，2025 年 7 月 NLP 团队做了 RedOne，专门跑社交场域的内容理解。小红书的 AI 路线是把 AI 嵌进种草链路，不直接做"对话式购物入口"，因为它的电商本身就嵌在内容里。

横着比，OpenAI 这次 Etsy app 做的，是国产 AI 厂商一年前就在做的事。差别是 OpenAI 同步推 Ads Manager 把变现侧也产品化了，国产这边到现在还没有任何一家把 AI 对话流量的广告位做成自助投放产品。豆包靠抖音的星图体系挂广告，千问跟着阿里妈妈，元宝挂腾讯广告。这是国产 AI 还没自己的"AdWords"。

## 中国 AI 用户能蹭到什么

普通用户层面，对话式购物入口的迁移意味着，搜索框时代积累的 SEO 玩法在 ChatGPT、豆包、千问里要重新洗牌。我认为接下来这半年值得盯三件事。

一是商品描述结构化。AI 选品不读营销话术，读结构化字段。在淘宝小红书发商品的卖家，把材质、尺寸、适用场景、价格区间写成清晰段落，比堆 SEO 关键词更能被对话模型挑中。

二是品牌词在对话里的权重。Etsy 的 app 接入，用户必须 @Etsy 才能调用。在国内，未来千问、豆包接入第三方品牌 app 是迟早的事，提前在内容侧建立"品牌词 + 场景词"的关联，比通用品类词更有用。

三是广告侧的窗口期。OpenAI Ads Manager 美国先开，国内对应产品大概率会在豆包或千问先落地。豆包星图已经接 AI 内容标签，星图后台里挑达人投放的逻辑迟早会加一层"AI 助手对话曝光"。第一批进场的中小品牌按当年公众号、抖音、小红书的早期红利规律，CPM 会比一年后便宜很多。

我自己更看重第三件。前两件是长期打法，第三件是窗口期，错过就没了。

## 一句话判断

OpenAI 这次出招看起来是产品发布，但底层是把"AI 对话"从工具型应用打通成商业基础设施。Etsy app 是流量入口，Ads Manager 是变现工具，缺一个都不成立。

国产 AI 在交易闭环上其实跑得更快，但商业化产品形态还没成型。下一个值得观察的节点，是哪家国产 AI 第一个把"对话式广告位"做成自助投放产品。豆包的可能性最大，千问次之。等它出来那天，公众号 2014、抖音 2018、小红书 2020 那种红利窗口会再出现一次，只是这次场景换成了 AI 对话框。

## 相关链接

- TechCrunch 报道，[Etsy launches its app within ChatGPT](https://techcrunch.com/2026/05/05/etsy-launches-its-app-within-chatgpt-as-it-continues-its-ai-push/)
- OpenAI 官方博客，[New ways to buy ChatGPT ads](https://openai.com/index/new-ways-to-buy-chatgpt-ads/)
- PPC.land 拆解，[OpenAI opens ChatGPT Ads Manager to all US businesses with CPC bidding](https://ppc.land/openai-opens-chatgpt-ads-manager-to-all-us-businesses-with-cpc-bidding/)
- Digiday 报道，[OpenAI opens up ChatGPT ads manager to the U.S.](https://digiday.com/marketing/openai-opens-up-chatgpt-ads-manager-to-the-u-s-while-promising-third-party-measurement-cpa-bidding/)
- 36 氪，[豆包们，开始"上链接"](https://36kr.com/p/3526736958069893)
- 每经网，[豆包手机助手掀翻超级 App 牌桌](https://www.nbd.com.cn/articles/2025-12-07/4171033.html)

[[openai|OpenAI]] [[chatgpt|ChatGPT]] [[etsy|Etsy]] [[taobao|淘宝]] [[xiaohongshu|小红书]] [[doubao|豆包]] [[kimi|Kimi]]

主题，[[ai-commerce|AI 电商]] [[ai-monetization|AI 变现]] [[ai-product-experience|AI 产品体验]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
<!-- xhs_pass: true -->
