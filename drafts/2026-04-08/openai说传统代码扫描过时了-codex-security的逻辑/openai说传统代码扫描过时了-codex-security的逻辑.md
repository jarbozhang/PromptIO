# 你的代码扫描器看到了漏洞，但它不知道那是不是真的

上周我跑了一遍 SonarQube，报了 47 个 high severity。花了两天逐个排查，真正需要修的只有 3 个。

这种体验，做安全的人应该都不陌生。

OpenAI 上个月发了一篇技术博客，解释了 Codex Security 为什么故意不包含传统 SAST 报告。他们的核心论点让我停下来想了很久，"代码调用了 sanitizer" 和 "系统真的安全了"，是两件完全不同的事。

## 传统扫描器的结构性盲区

SAST (Static Application Security Testing) 干的事情，说到底就是追踪数据流，从不可信输入追到敏感输出。发现一条没经过清洗的路径，就报一个漏洞。

这个思路二十年前是对的。

但问题在于，最难搞的漏洞往往不是数据流问题。它们发生在代码看起来做了安全检查，但那个检查其实没用的时候。

OpenAI 举了一个具体的例子，CVE-2024-29041，Express.js 的一个 open redirect 漏洞。攻击者用畸形 URL 绕过了白名单验证，原因是检查发生在 URL 解码之前。这是一个时序问题，不是数据流问题。

传统 SAST 扫描器能看到 sanitizer 被调用了，但它判断不了这个 sanitizer 在特定的渲染上下文、模板引擎、编码行为和下游变换组合下，到底够不够用。

这就是结构性盲区。不是工具不够好，是方法论本身有天花板。

## Codex Security 换了一套思路

OpenAI 没有在传统 SAST 上面叠 AI，而是完全绕开了它。

Codex Security 的起点不是 "扫描代码找模式"，而是 "理解这个仓库的架构、信任边界和预期行为"。先搞清楚系统想做什么，再去验证它是不是真的做到了。

具体怎么验证？三板斧。

第一，微型 fuzzer 生成。针对隔离的代码切片和转换管道，用单个输入做针对性测试。不是盲目跑 fuzzing，是带着假设去验证。

第二，约束推理 (constraint reasoning)，必要时调用 z3-solver。这招对非标准架构上的整数溢出特别有效。传统扫描器对这类问题基本抓瞎，因为它需要理解数值在特定平台上的边界行为。

第三，沙箱执行。跑出一个 proof-of-concept exploit，把 "可能有问题" 变成 "确实有问题"。

这三步下来，beta 期间扫了 120 万次 commit，找到 792 个 critical 和 10561 个 high-severity 问题。误报率比传统工具降了 50% 以上，severity 误判降了 90% 以上。

数字本身还不是最有意思的。有意思的是他们说了为什么不把 SAST 作为起点再用 AI 做分诊。

## 为什么不能 SAST + AI 两条腿走路？

这是我一开始最大的疑问。SAST 先扫一遍缩小范围，AI 再深入验证，听起来挺合理的？

OpenAI 说了三个失败模式。

过早收窄。SAST 报告会把 AI 的注意力拉到已经扫过的区域，导致它错过整个漏洞类别。你想想看，如果 AI 一上来就盯着 SAST 报的那些 XSS 和 SQL injection，它可能永远不会去检查业务逻辑层的权限绕过。

隐式假设污染。SAST 对 sanitization 和信任边界有一套内置假设，这些假设一旦被 AI 继承，错了就很难纠正。

评估困难。你没法区分 AI 自己发现的问题和从 SAST 报告继承来的问题，这让衡量系统到底在进步还是在退步变得不可能。

坦率讲，第三点说服了我。做过 ML 的人都知道，如果你的 baseline 本身就有偏，所有基于它的改进都是幻觉。

## 社区里的多种声音

这个方向不是 OpenAI 一家在走。Anthropic 的 Claude Code Security 也在做类似的事，VentureBeat 的报道标题很直接，"Anthropic 和 OpenAI 暴露了 SAST 的结构性盲区"。竞争对手 Theori 的 Xint Code 在 Codex Security 发布的第二天就上线了，赛道已经挤满了玩家。

但也有不少人持保留态度。安全工程师群体里一个常见的反驳是，SAST 工具的误报问题大家早就知道了，但它至少是确定性的、可审计的。AI 驱动的扫描器给你一个 "这里有漏洞" 的结论，你怎么验证 AI 的推理过程是对的？

说真的，这个质疑是成立的。

还有一种更实际的担忧，SAST 市场 2025 年估值 5.54 亿美元，预计 2030 年涨到 15 亿。这条赛道上的所有公司，Snyk、Checkmarx、Veracode，都在把 AI 往自己的 SAST pipeline 里塞。OpenAI 说 "SAST 过时了"，某种程度上也是在为自己的产品打地基。

我认为真相在中间。对于 OWASP Top 10 里那些经典漏洞类型，传统 SAST 依然够用，而且便宜、快、确定性强。但对于约束失败、业务逻辑漏洞、跨层时序问题这些 "理解型" 漏洞，AI 驱动的方法确实打开了一扇新门。

## 我的判断

我是真的觉得 OpenAI 这篇博客最有价值的部分不是产品宣传，而是那三个 "为什么不能 SAST + AI" 的失败模式分析。它揭示了一个更普遍的工程原则，当你的新系统以旧系统的输出作为输入时，旧系统的盲区会被继承并放大。

可能有些想法还不成熟，但我倾向于认为未来不是 SAST 被替代，而是安全扫描会分裂成两个层次。第一层是快速确定性扫描，覆盖已知模式，跑在 CI 里，秒级出结果。第二层是深度推理扫描，理解业务语义，跑在 PR review 阶段，可能要几分钟甚至更久。

这两层解决的是完全不同的问题。混在一起反而互相拖累。

回到开头那 47 个误报。如果扫描器不只是看到 "数据从 A 流到了 B"，而是真的去验证 "这条路径上的防护到底有没有用"，我那两天就不用浪费了。

这可能才是 Codex Security 真正想说的事。

## 相关链接

- [Why Codex Security Doesn't Include a SAST Report - OpenAI Blog](https://openai.com/index/why-codex-security-doesnt-include-sast/)
- [Codex Security Research Preview](https://openai.com/index/codex-security-now-in-research-preview/)
- [Codex Security Developer Docs](https://developers.openai.com/codex/security)
- [Codex Security FAQ](https://developers.openai.com/codex/security/faq)

---
相关实体:: [[openai|OpenAI]] | [[anthropic|Anthropic]] | [[codex|Codex]]
相关主题:: [[supply-chain-security|供应链安全]] | [[ai-coding-tools|AI编程工具]]
