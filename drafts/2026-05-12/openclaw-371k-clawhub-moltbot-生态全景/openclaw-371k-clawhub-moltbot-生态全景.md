# openclaw 371k 星了，clawhub/clawdbot/moltbot 这条线现在长什么样

371100 颗星，76756 个 fork。

我第三次在 GitHub Trending 上看到 openclaw/openclaw 这一行了。4/28 写了第一篇，5/3 写了第二篇，5/8 写了第三篇，连续三个 trending 我都决定跳过没写新的，因为只是星数往上挪几万，没新东西可讲。

但这一次不一样。不是 openclaw 主仓库本身多了什么大功能，是这条生态线，clawhub、clawdbot、moltbot、外加 hermes-agent，加起来的"形状"在过去三周里成型了。今天值得停下来横着画一张图。

写在最前，这篇不是吹生态的稿子。Reddit 上 r/LocalLLaMA 4 月那条 899 赞的帖子标题就叫"OpenClaw 有 25 万星，我唯一找到的可靠用法是每日新闻摘要"，热评写的是"你忘了它最主要的用法，在 github 上给自己刷 star"和"还是个安全噩梦载体，别忘了"。我把这两条原文都放进来了，跟生态盘点同等重量。

## 先把这条线的成员名单摆出来

openclaw 这个名字本身指三件事，特别容易混。

第一是 **openclaw 组织**，GitHub 上的 org，维护一整条产品线。

第二是 **openclaw 主仓库**（openclaw/openclaw），TypeScript 写的跨平台个人 AI 助手，今天 371100 星，76756 fork，2025-11-24 建仓，最近一次 push 就是 2026-05-12。topics 字段是 ai, assistant, crustacean, molty, openclaw, own-your-data, personal。半年多堆出 37 万星，已经是 TypeScript 圈个人 AI 助手类目里跨平台体验最完整的一只。

第三是 openclaw 这只"龙虾"的生态周边，下面这几个名字我把它们一次性钉清楚，下次别再混了。

**clawhub**，openclaw 生态的扩展/插件集散点。社区里跑 skill 共享、贡献、版本管理的那一层。4/23 我们写 Last30Days Skill 那篇文章里它首次以名字露脸，那时候很多人没听过这个名字。今天再看 hackernews 上 4/29 那条 7 分的 "openclaw ggsql" 帖子，URL 直接挂在 clawhub.ai 域名下，已经是社区贡献的默认落点了。

**clawdbot**，openclaw 生态里的自动化机器人组件。把 openclaw 桌面端那些"个人助手"能力封装成 bot 形态，绑去 IM、邮件、定时任务这些通道里跑。

**moltbot**，openclaw 生态的实验性 agent 组件。名字里的 molt 指龙虾蜕壳，从这个命名就能感觉到它是定位最靠前的那一块，做新形态的 agent 实验，跑通了再往主线收。

**hermes-agent**，NousResearch 维护的开源持久成长 agent，13 万星量级。它本身不属于 openclaw 组织，但 5/3 那天我们专门写过一篇，hermes-agent 的 GitHub topics 字段里挂着 anthropic, claude, claude-code, clawdbot, codex, hermes-agent, moltbot, nous-research, openai, openclaw 这一长串。十六个 topic 里前半段是行业通用词，后半段直接把 openclaw 生态四个名字一次性钉上去。这是仓库主动靠过来站队，不是别人贴标签。

把这五个名字摆在桌上，openclaw 这条线的形状就出来了。openclaw 是承载层（你桌面上那只龙虾），clawhub 是扩展分发层，clawdbot 是 bot 通道层，moltbot 是新形态实验层，hermes-agent 是从外部接进来的"长期记忆 + 技能演化"层。

## 这条生态线最近三周做了三件具体的事

4/28 那条线，openclaw 365k 星 + 4 月安全事件复盘。一边是 36 万星的明星项目冲上 trending，一边是 ArsTechnica 报道"agentic 工具让攻击者无认证拿到 admin 权限"，Latent Space 那篇《The Two Sides of OpenClaw》记录的官方原话是"安全报告比 curl 多 60 倍，至少 20% 的 skill 贡献是恶意的"。这给整条生态钉了一个底色，扩展面越大，暴露面越大，clawhub 这一层的审计能力直接决定整条线能不能跑长。

5/3 那条线，hermes-agent 130k 星 + topics 字段绑定。NousResearch 把 clawdbot、moltbot、openclaw 写进 hermes-agent 的 GitHub topics 字段，这是 GitHub 平台层面的归类标签，搜索和推荐都吃这个。Reddit r/WebAfterAI 上 4/27 那条 352 赞的帖子，热评原话是"hermes 扩展数量没有 OC 多，但它有最重要的一点，稳定，一直能用，我不需要每隔几天或者每次更新后都去 debug"。这条评论同时回答了两个问题，hermes-agent 跟 openclaw 在用户心智里已经是兄弟关系；hermes-agent 是用"稳定"在跟 openclaw 互补。

5/8 那条线，Spotify 开 agent 入口，第一批合作名单 OpenClaw / Claude Code / OpenAI Codex，openclaw 排第一个。一行 curl 装上 Save to Spotify CLI，agent 写完播客直接进 Spotify 个人订阅。这是 openclaw 第一次以"日常生活 agent"的身份拿到面向消费者平台的 distribution 口子。

把这三件事叠在一起看，openclaw 这条生态在过去三周走完了"扩展面 -> 记忆层接入 -> 消费者分发"三步。底子在 clawhub，记忆在 hermes-agent，出口在 Save to Spotify 这种 CLI 标准入口。

## 社区在吵什么

我必须把 Reddit 上那条主旋律拉出来。

r/LocalLLaMA 4/13 那条 899 赞、336 评论的帖子，标题是"OpenClaw 有 25 万星，我唯一找到的可靠用法是每日新闻摘要"。U/Buggyworm 973 赞热评，"你忘了它最主要的用法，在 github 上给自己刷 star"。u/RoomyRoots 319 赞，"还是个安全噩梦载体"。u/cmndr_spanky 158 赞，"openclaw 是个臃肿混乱的烂摊子，我用了几天就扔了，你不如自己写个最简单的 wrapper，把 telegram / 邮件 / 定时任务串一下"。

r/LocalLLaMA 4/21 那条 630 赞、264 评论的"Unpopular opinion，OpenClaw 和它所有 clone 对于真懂行的人几乎都是没用的工具"，作者 swiebertjee 162 赞，"我上周末试了 Openclaw，发现它出奇地没用，号称是 personal automation agent，但我想接 WhatsApp 的时候它根本接不上"。同一帖里 bs6 77 赞、combrade 40 赞两条评论，反过来夸 Hermes Agent 轻量好用。

r/openclaw 自家社区 4/21 那条 154 赞的"3 个月了，我放弃了，OpenClaw 正式成了一个吞钱坑"，作者写"我希望 OpenClaw 是那种真的能干活的助手，但最近我花在伺候它基础设施上的时间比真正干活的时间还多，最近这次智能下降是压垮我的最后一根稻草，因为额外用量把我逼到便宜的 Claude 模型上去了"。

r/openclaw 4/17 那条 130 赞、280 评论的"你们在现实生活里到底拿 OpenClaw 干什么"，作者直接表态在观望，"很多用法看着技术性很强或者只是个炫酷 demo，不像真能改善日常的事，跟 3D 打印机一样，能力很强但大多数人最后用不起来"。

这是社区的真实情绪。37 万星不等于 37 万忠实用户，扩展面广和实际能干完事是两件事，"装上之后到底用它做什么"在 r/openclaw 自家版面上都没有共识。

我把这些原文摆出来不是为了拉踩 openclaw，是想说，跑这条生态线的时候**不要被星数带节奏**。

## 我的判断

openclaw 这条生态今天的真实状态是，**底座最大但用法最散，分发口子在打开但稳定性是已知短板**。

底座最大这事是真的。37 万星 + 跨平台 daemon + clawhub 扩展集散 + clawdbot/moltbot 自家 bot 矩阵，TypeScript 圈没有第二个项目做到这个覆盖。

用法最散这事也是真的。Reddit 上反复出现的就是"装了不知道干什么用""能干的 Claude Code/Codex 也能干""稳定性差到要不停 debug"。

分发口子在打开是新增的好消息。Save to Spotify 那种 CLI 标准入口，把"agent 干完一件事怎么落地到消费者 app"这条最后一公里铺出来了，openclaw 因为定位是日常生活 agent 而不是 IDE 内的开发 agent，刚好踩在这个出口上。

hermes-agent 用 topics 字段主动绑过来，是在补 openclaw 的稳定性和长期记忆两块短板。一个"扩展多但记忆弱、稳定性差"的承载层，加一个"扩展少但记忆强、稳定"的 agent runtime，组合起来比单跑 openclaw 一个项目像样得多。

所以我现在的看法是，**单独装 openclaw 主仓库尝鲜可以，但不要把它当成日常工作流主力**。Reddit 上那条"money pit"的帖子值得认真读，3 个月之后真的会变成吞钱坑，因为你为了 debug 它的扩展面会消耗大量 token。

如果你真要跑这条生态，我的建议是把 hermes-agent 作为 runtime 层先跑起来（它的稳定性是社区公认的强项），再用 clawhub 上的扩展按需挑，主仓库 openclaw 当一个"扩展索引 + 跨平台分发壳"用，不要让它当总指挥。

## 给中国用户的行动建议

第一条，**先别急着装 openclaw 主仓库**。4 月的安全事件还没真正过去，Latent Space 那篇说的"20% skill 贡献是恶意的"是一个长期问题，不是发完补丁就完了。如果只是想跑个个人 AI 助手，把 hermes-agent 作为入口比把 openclaw 作为入口更安全。

第二条，**模型不要直接打境外 API**。Reddit 上那条 money pit 帖子核心抱怨就是"额外用量把我逼到便宜的 Claude 模型上"。中国用户走 OpenRouter 或者直接走 DeepSeek、Kimi、Qwen 的官方 API，token 成本能砍掉一大截，稳定性也好得多。Unsloth 5 月初那条教程明确说本地跑 Gemma 4 和 Qwen 3.6 的 GGUF 模型，24GB 内存够用。

第三条，**clawhub 上挑扩展要看维护活跃度**。社区贡献多不等于质量好，4 月的安全事件根本原因之一就是 skill 贡献没有审计兜底。挑扩展先看 commit 频率，再看 issue 响应，最后看是不是只有一个匿名维护者，三条全过再装。

第四条，**Save to Spotify 那条线对国内播客作者只能当中转站**。前面那篇文章里写过，让 agent 把同一个 mp3 先推一份到小宇宙、喜马拉雅后台，或者维护一个 RSS feed 让国内平台自己抓。Save to Spotify 推完的本地 mp3 是有的，不要让它直接消失。

第五条，**保持观望也是一个动作**。r/openclaw 4/17 那条 130 赞的帖子里有一条评论我印象很深，"等三个月再看一次，如果你身边真有人在用，再装"。这个判断标准放在 2026 年 5 月仍然成立，openclaw 这条生态现在还在自己内部找节奏，没必要为它牺牲你今天的工作流。

下次再看到 openclaw 冲上 trending 我大概率还是会跳过。除非 clawhub 的审计机制真的上线，或者 hermes-agent 这条线长出我现在还没看到的形态。

## 相关链接

- openclaw 主仓库, https://github.com/openclaw/openclaw
- NousResearch hermes-agent 仓库, https://github.com/NousResearch/hermes-agent
- Reddit 讨论 r/LocalLLaMA 最有用的用法, https://www.reddit.com/r/LocalLLaMA/comments/1skce14/openclaw_has_250k_github_stars_the_only_reliable/
- Reddit 讨论 OpenClaw 是不是 money pit, https://www.reddit.com/r/openclaw/comments/1sry4wm/after_3_months_im_done_openclaw_has_officially/
- Reddit 讨论 OpenClaw 现实里到底拿来干什么, https://www.reddit.com/r/openclaw/comments/1snm630/what_do_you_actually_use_openclaw_for_in_real_life/

---
相关实体:: [[openclaw|openclaw]] | [[hermes-agent|Hermes Agent]] | [[openclaw-org|openclaw 项目方]] | [[nousresearch|NousResearch]]
相关主题:: [[openclaw-ecosystem|openclaw 生态]] | [[agent-frameworks|Agent 框架]]

<!-- REACH: 10/10 | 品牌✓ 利益点✓ 可操作✓ -->
