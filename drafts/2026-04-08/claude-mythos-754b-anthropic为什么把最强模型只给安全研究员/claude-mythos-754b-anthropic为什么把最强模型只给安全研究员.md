# 754B 参数的 Claude Mythos，Anthropic 为什么死活不让你用？

昨天 Anthropic 干了一件反常的事。

它发布了迄今最强的模型 Claude Mythos Preview，754B 参数，1.51TB 权重已经挂在 Hugging Face 上，SWE-bench Verified 跑到 93.9%，把自家 Opus 4.6 的 80.8% 按在地上摩擦。然后它说，这个模型你不能用。

不是还没准备好，不是要等排队，是明确告诉你，只有签了协议的安全研究机构才能碰。

这让我愣了好几秒。一个 AI 公司，花了天量算力训出来的最强模型，主动选择不卖钱？

## 这个模型到底强在哪

先把数字摆出来。Mythos Preview 在几乎所有编码基准上都大幅领先 Opus 4.6，CyberGym 漏洞复现 83.1% vs 66.6%，SWE-bench Pro 77.8% vs 53.4%，Terminal-Bench 2.0 82.0% vs 65.4%。GPQA Diamond 这种纯推理测试也到了 94.6%。

但真正让我觉得不一样的不是跑分。

是 Anthropic 红队报告里的这些案例，Mythos 完全自主地，没有任何人类引导，找到了一个 OpenBSD 里藏了 27 年的 TCP SACK 实现漏洞，能远程搞崩服务器。找到了 FFmpeg 里一个 16 年的 H.264 编解码越界写入。找到了 FreeBSD NFS 服务的远程代码执行漏洞（CVE-2026-4747），未认证就能拿到 root。

Opus 4.6 自主开发漏洞利用的成功率接近 0%。Mythos 在 Firefox JavaScript 引擎上成功生成了 181 次可用的漏洞利用代码，Opus 4.6 只有 2 次。

不是量变，是质变。

## Project Glasswing 是什么

Anthropic 围绕 Mythos 搞了一个叫 Project Glasswing 的联合防御计划。12 家创始成员，AWS、Apple、Broadcom、Cisco、CrowdStrike、Google、JPMorganChase、Linux Foundation、Microsoft、NVIDIA、Palo Alto Networks，基本上把科技和金融的安全重镇凑齐了。另外还有 40 多家机构拿到了访问权限。

Anthropic 承诺了 1 亿美元的免费使用额度，标准定价是每百万 token 输入 25 美元、输出 125 美元。还额外给 Alpha-Omega、OpenSSF 捐了 250 万美元，给 Apache 基金会 150 万美元。

坦率讲，我第一反应是，这是不是一场精心设计的营销？"我们的模型太强了所以不能卖给你"，多好的故事。

但我去翻了红队报告的细节，改主意了。

## 为什么我改主意了

红队报告里有一个数字很关键，Mythos 在大约 7000 个 OSS-Fuzz 入口点上跑出了 595 个严重级别 1-2 的崩溃，Opus 4.6 只有 150-175 个。更要命的是 tier-5 级别的崩溃，也就是完全控制流劫持，Mythos 有 10 个，之前的模型每个只有 1 个。

发现 OpenBSD 那个 27 年老漏洞的成本？不到 50 美元，是一次 2 万美元批量扫描计划的一部分。单个 N-day 漏洞利用的生成成本在 1000 到 2000 美元之间，耗时几小时到几天。

你想想看，现在一个高水平的安全研究员年薪多少？而这个模型用不到 50 美元的 API 调用就能找到藏了近 30 年的内核级漏洞。

专业安全验证人员审核了 198 份 Mythos 的漏洞报告，89% 的严重性评估完全一致，98% 在一个级别以内。这不是 AI 在瞎报 bug，是真的在做专家级的漏洞研究。

Ethan Mollick 在得到 Anthropic 的提前通报后说了两句很到位的话，第一，这个模型不是专门为 IT 安全打造的，它只是足够强大，所以顺带就擅长了安全研究。第二，这是第一个引发安全风险的模型，但不会是最后一个。

第二句话才是重点。

## 社区里的多种声音

Simon Willison 写了一篇很详细的分析，他的结论是限制发布"听起来有必要"。他引用了 Linux 内核维护者 Greg Kroah-Hartman 的话，"一个月前，世界变了。现在我们收到的是真实的漏洞报告了。" curl 的作者 Daniel Stenberg 说安全研究员们每天要花好几个小时处理 AI 生成的安全报告，而且很多质量相当高。

HN 上这几条相关帖子加起来拿了快 1800 分、870 多条评论。讨论非常激烈。

一派认为 Anthropic 做得对。当一个模型能用几十美元找到内核级零日漏洞时，广泛开放就是在给攻击者发武器。先让防御方有时间修补，是负责任的做法。

另一派质疑这是不是在制造人为稀缺。模型权重都放 Hugging Face 了，参数量和架构都公开了，你限制 API 访问真的能挡住有决心的攻击者吗？而且只给大公司和"授权机构"用，小型安全研究团队怎么办？

还有人指出一个更深的问题，超过 99% 已发现的漏洞还没披露、没修补。Anthropic 承诺用 SHA-3 哈希来证明这些漏洞报告的存在时间，按照 90+45 天的协调披露时间线走。但这意味着现在有一个巨大的漏洞库，只有少数人知道。

我认为 Anthropic 这次做的判断基本正确，但不完美。

说实话我也不确定"只给大公司"是不是最优解。理想情况下应该有一个更开放的申请机制，让独立安全研究员也能参与进来。不然这就变成了"安全是大公司的特权"。

但在现阶段，考虑到 Mythos 的能力跳跃幅度，先收着比直接放出去要明智得多。Mollick 说得对，这是第一个，不是最后一个。半年到一年内，其他实验室大概率会训出能力相当的模型。到那时候，限制发布就不再是选项了。

Anthropic 真正在买的不是永久优势，是时间窗口。给那些关键基础设施的维护者几个月的时间，先把最危险的洞补上。

## 你现在该做什么

如果你在维护开源项目或者企业级软件，现在就该把安全更新的优先级往上提。Anthropic 红队报告的建议很直接，缩短补丁周期，自动化应急响应流水线，把安全更新当紧急事项而不是例行维护。

如果你是安全研究员，去看 Glasswing 的合作申请。40 多家机构已经拿到了访问权，Anthropic 还在扩大范围。

如果你是开发者，说真的，开始认真对待模型安全能力这件事。今天 Mythos 能用不到 50 美元找到 27 年的内核漏洞，明年呢？

开头我说 Anthropic 干了一件反常的事。现在想想，也许反常的不是 Anthropic 的选择，而是我们已经习惯了"模型越强越好、越开放越好"这个假设。当一个模型真的强到能自主生产网络武器的时候，"不卖"可能才是正常反应。

## 相关链接

- [Project Glasswing 官方页面](https://www.anthropic.com/glasswing)
- [Claude Mythos Preview 红队安全评估](https://red.anthropic.com/2026/mythos-preview/)
- [Claude Mythos Preview System Card (PDF)](https://www-cdn.anthropic.com/53566bf5440a10affd749724787c8913a2ae0841.pdf)
- [Simon Willison 的分析](https://simonwillison.net/2026/Apr/7/project-glasswing/)
- [TechCrunch 报道](https://techcrunch.com/2026/04/07/anthropic-mythos-ai-model-preview-security/)
- [HN 讨论 (958 points)](https://news.ycombinator.com/item?id=47679121)

---
相关实体:: [[anthropic|Anthropic]] | [[simon-willison|Simon Willison]] | [[emollick|Ethan Mollick]]
相关主题:: [[supply-chain-security|供应链安全]]
