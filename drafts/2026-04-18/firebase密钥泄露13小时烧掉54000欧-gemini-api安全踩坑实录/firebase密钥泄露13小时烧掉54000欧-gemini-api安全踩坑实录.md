# Firebase密钥泄露13小时烧掉54000欧,Gemini API安全踩坑实录

一觉醒来，账单多了54000欧元。

这不是段子。4月15号，一个开发者在 Google AI 论坛发帖求助，说自己给 Firebase 项目开了个 AI Logic 功能，睡了一觉，Gemini API 的调用费用就飙到了54000欧。13个小时。他设了80欧的预算警报，但等警报触发的时候，账单已经28000欧了。

我看到这个帖子的时候，第一反应是"又一个没限制 API key 的"。但仔细看完才发现，这事没那么简单。

## 一把没上锁的钥匙

Firebase 的 API key 设计上就是给前端用的。这是 Google 官方文档白纸黑字写的，"Firebase API keys are not secrets"。你做过 Firebase 项目就知道，这个 key 直接写在前端代码里，谁都能看到。

以前这不算什么问题。Firebase API key 能做的事很有限，认证、数据库读写都有安全规则兜底。

但 Gemini 来了之后，事情变了。

当你在 Firebase 项目里开启 AI Logic，这把"不是秘密"的前端 key 突然获得了调用 Gemini API 的权限。每次调用都在烧钱。而那把 key，还挂在你的前端代码里，对全世界公开。

你想想看，这就像你家大门的钥匙一直放在门垫下面，以前门后面只有个空房间无所谓，结果有一天有人把你的金库搬进了这个房间，钥匙还在门垫下面。

## 80欧的警报，28000欧的账单

这位开发者不是新手。他设了预算警报，做了该做的事。

但 Google Cloud 的计费系统有延迟。官方说法是"a delay of a few hours"。几个小时的延迟，在每分钟几百欧的烧钱速度下，那结果会怎样？

等他看到警报邮件的时候，28000欧已经没了。等他手动关掉 API、轮换密钥，最终数字定格在54000欧。

他联系了 Google Cloud 支持，要求调整账单。

被拒了。理由是"charges classified as valid"。调用确实发生了，密钥确实是你的，费用确实有效。

## HN 评论区炸了

这个帖子上了 Hacker News，396个赞，284条评论。社区的反应很一致，愤怒。

核心争论点是，为什么 Google 不提供硬性消费上限？

Google 的回应是"技术上不可能做到实时硬上限"。分布式系统嘛，全球节点嘛，实时计费很难嘛。

评论区有人直接怼回去了，电信行业几十年前就解决了类似的问题，你的手机流量超了会被停机，不会让你欠出一套房来。

坦率讲，我觉得这不是技术问题，是商业选择。

大客户有合同里的消费上限保护，小开发者没有。超额消费对云厂商来说是收入，不是 bug。这话可能得罪人，但你去看看 AWS、Azure 类似的事件，模式一模一样。

## 不止一个人踩了这个坑

HN 评论区里，好几个人分享了类似经历。有人 TPU 跨区流量一晚上烧了500美元。有人在 Reddit 上说被盗用的 GCP 密钥产生了13428美元的费用。

一个有意思的细节，GitHub 有自动扫描机制，你把 API key 推到公开仓库，GitHub 会检测到并通知对应的服务商。Google 理论上也有自动检测泄露密钥的机制。

但这位开发者的情况照样发生了。

为什么？因为 Firebase 的前端 key 本来就是公开的，它不在"泄露"的定义范围内。系统不会标记一个"设计上就该公开"的 key。可这个 key 现在能花真金白银了。

这是个架构级别的矛盾。

## 你现在该做什么

说实话我也不确定 Google 会多快修复这个架构问题。Logan Kilpatrick（Google 的人）在论坛里回应说会推出几个措施，账单消费上限、禁用无限制的 API key 调用 Gemini、新的 Auth key 机制。

但在这些落地之前，你得自己保护自己。

如果你的 Firebase 项目开了 Gemini 相关功能，现在就去 Google Cloud Console 检查你的 API key 限制。给每个 key 加上 API 调用白名单，只允许你确实需要的 API。

更好的做法是，永远不要让前端直接调 Gemini。写个后端中间层，前端调你的后端，后端调 Gemini。密钥放在服务端，客户端永远碰不到。

还有，去设一个项目级别的消费上限 (budget cap)，不是警报，是上限。虽然 Google 的上限也不是真正的硬上限（还是有延迟），但总比裸奔强。

那把放在门垫下面的钥匙，现在能打开金库了。你还要继续放在那吗？

## 相关链接

- 原帖，https://discuss.ai.google.dev/t/unexpected-54k-billing-spike-in-13-hours-firebase-browser-key-without-api-restrictions-used-for-gemini-requests/140262
- HN 讨论，https://news.ycombinator.com/item?id=47791871
- Google Cloud 预算设置，https://cloud.google.com/billing/docs/how-to/budgets
- Firebase API key 安全文档，https://firebase.google.com/docs/projects/api-keys

相关实体:: [[google|Google]] 相关主题:: [[supply-chain-security|供应链安全]] <!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
