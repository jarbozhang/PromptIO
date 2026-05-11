# Anthropic Mythos 在 Mozilla 之后又找到 curl 漏洞，Daniel Stenberg 一句话救了国内开发者

5 月 6 日，curl 安全团队收到一份用 Anthropic Mythos 生成的漏洞报告，宣称在 178K 行 C 代码里找到 5 个"已确认安全漏洞"。

5 月 11 日，Daniel Stenberg 在自己的 blog 上把这件事讲完了。5 个里只剩 1 个，会作为低危 CVE 进入 6 月底发布的 curl 8.21.0。另外 4 个是误报或"只是 bug"，还有大约 20 个普通 bug 在排查。

这就是过去五天发生的事。一边是 4 月底 Mozilla 公布 Mythos 在 Firefox 找到 271 个零日漏洞、几乎无误报，一边是 curl 作者亲自下场打脸"营销噱头"。Mythos 到底是不是真的能用，国内做开源维护和企业代码审计的，要不要照着抄一遍流程，今天值得讲清楚。

## Mozilla 那 271 个漏洞不是噱头

先把 Mozilla 那一侧的事实摆好。

4 月底 ArsTechnica 报道 Mozilla 安全团队的官方说法，他们用 Anthropic 的 Mythos preview 在 Firefox 代码库扫了一轮，发现 271 个零日漏洞，"几乎没有误报"。Mozilla CTO 的原话是 "completely bought in"，已经全面接入 AI 辅助漏洞挖掘。

Simon Willison 在自己的 blog 里给了一个更扎心的数字。Firefox 2025 年全年的月均漏洞修复数量是 20 到 30 个，2026 年 4 月这个月修了 423 个。一个月修完往年一年量的两倍多。

Willison 还点出了一个老问题。过去几年 AI 生成的漏洞报告大部分是"看上去像那么回事但其实是错的"，给开源维护者带来不成比例的处理成本，这是社区对 AI 安全工具反感的核心原因。Mozilla 这次的"几乎无误报"，是从这个泥潭里第一次拔出来的脚印。

所以当 Mythos 把报告递到 curl 这边，社区下意识反应是"又要来 271 个"。

## 实际发生的事不一样

curl 这一侧的处理流程是教科书级别的。

报告里说在 src/ 和 lib/ 共 178K 行代码里跑了"人工驱动的 LLM 子代理分析"，每条 finding 都做了"直接源码复核"。Stenberg 团队拿到报告几个小时就开始一条条手工 verify。

5 条 confirmed vulnerabilities 里，4 条要么是误报、要么严格意义上不是安全问题、要么是已经被 curl 现有防御挡住的代码路径。剩下 1 条是真的低危 CVE，进入 curl 8.21.0。

Stenberg 在 blog 里写了一句话被到处引用，"我个人的结论只能是，这次围绕这个模型的炒作主要是营销"。他还补了一刀，HTTP/1、TLS、URL 解析这些 curl 重点防御过的地方，Mythos 一个问题都没找到。横向对比 AISLE、Zeropath、OpenAI Codex Security，Mythos 没有显示出独特优势。

但同一篇 blog 末尾，Stenberg 自己写了下面这段话，比他前面所有的吐槽都重要。

"不在你的项目里用 AI 代码分析器，就是把时间和机会留给对手和攻击者去发现并利用你没发现的缺陷。"

这是 curl 作者在挨完一个营销噱头的报告之后，亲口说出来的话。

## 多平台真实反馈

r/BetterOffline 把 Stenberg 的"营销噱头"原话顶到了 197 赞 28 评，社区情绪倒向"看吧 Mythos 也就这样"。但同一时间 r/technology 上关于 Mozilla 271 漏洞的帖子有 2416 赞 205 评，热度差着一个数量级，普通用户的关注点和 hacker 圈完全不在一个频道。

r/OpenSourceeAI 里有一条更有意思的反驳，标题叫 "The Boy That Cried Mythos"，针对 Anthropic 那份 244 页的 system card 直接质疑"too dangerous to release"是不是表演。74 条评论里大量集中在"开源权重一出来这个故事就讲不下去了"。

我个人觉得 Magonia 那篇 "Why a Decade of Writing Detection Logic Makes the Mythos Exploit Numbers Less Scary" 的观点最值得国内安全团队读一遍。核心论点是写了十年检测逻辑的工程师都知道，漏洞数量从来不是关键指标，可被利用性和爆炸半径才是。271 个 bug 听上去吓人，但里面绝大多数是 Firefox 多层防御已经能挡住的 attack surface。

另一边 kyegomez 已经把 OpenMythos 挂到 GitHub 上，号称用公开研究文献从第一性原理复刻 Mythos 架构。这种 24 小时之内出现的"复刻仓库"代码质量先放一边，至少说明社区对 Mythos 工作流的兴趣已经溢出。

## 我的判断

Mythos 在 curl 上验证了一件事，AI 漏洞挖掘的天花板不是模型本身，是被测代码的成熟度。

Firefox 是浏览器引擎，攻击面巨大、历史代码堆积厚、跨 C++/Rust/JS 边界多，Mythos 一扫就出 271 个，因为可挖的东西本来就在那里。curl 是单一职责的 HTTP 客户端，Stenberg 团队这二十年把能想到的 fuzz、静态分析、模糊化测试全跑过了，留给 AI 的缝隙窄得多。

国内做开源大项目的团队，OpenSSL/Nginx 镜像维护方、字节阿里腾讯的开源团队、华为鸿蒙开源组件，该不该照搬这条工作流，我的答案是分两层。

第一层，代码审计这件事不再是要不要做 AI 辅助的问题，是用哪一家的问题。Stenberg 这种已经被 AI 报告烦透了的人都说"不用就是把机会留给攻击者"，国内任何还在手工 review 的开源团队再不动手，差距只会拉大。

第二层，工具链可以国产化。智谱在企业版里上了 Codex Sec 类似的代码安全扫描能力，阿里通义灵码的安全扫描接入了集团内部 CVE 库，奇安信和奇虎都有 LLM 驱动的 SAST 产品在推。豆包代码的扫描能力虽然偏向常规 lint，但对接企业内部知识库的路径已经跑通。openclaw 生态这边 clawhub 上有几个安全审计相关的 prompt 集合可以直接拿来用。这些工具不一定有 Mythos 的强度，但报告质量上的"几乎无误报"门槛，国产厂商已经看到目标了。

真正的坑也讲清楚。AI 漏洞挖掘最大的隐性成本是 verify 流程。curl 团队 5 条报告手工复核要几个小时，Firefox 271 条能跑通是因为 Mozilla 在内部已经有一整套现有的 triage 工具链。国内中小开源团队照搬时第一个要建的不是模型接入，是"AI 报告进来之后谁来确认"的人力流程。没这一环，模型再准也会变成 noise generator。

## 行动建议

如果你在维护开源项目或做企业代码审计，这几件事这周可以动手。

升级你机器上的 curl 到 8.21.0 发布之后的版本，6 月底就出。关注 curl-security@haxx.se 公布的 CVE 编号，影响所有依赖 libcurl 的 Python requests、PHP cURL、Node http 调用，国内 CDN 厂商的 origin fetch 也几乎都走 libcurl。

把 Stenberg 的那篇 blog 读完。原文链接在文末，比任何二手解读都值得。

试用一款国产 AI 代码扫描工具跑一次你正在维护的中等规模仓库。挑一个 PR，让模型 review，看看出来的 finding 里有几条是真的需要修。这是最便宜的 baseline 校准方法。

最后回到开头。5 天里 Mozilla 和 curl 各自给出了 Mythos 的两种答卷，一种是 271 个零日的胜利通报，一种是 5 进 1 的冷水。两份答卷指向同一个事实，AI 漏洞挖掘已经从"实验性能力"变成了"应该接入的常规工具链"。剩下的问题不是用不用，是用哪家、怎么 verify、谁负责 triage。

## 相关链接

- Daniel Stenberg blog 原文，https://daniel.haxx.se/blog/2026/05/11/mythos-finds-a-curl-vulnerability/
- Mozilla 271 漏洞官方报道（ArsTechnica），https://arstechnica.com/information-technology/2026/05/mozilla-says-271-vulnerabilities-found-by-mythos-have-almost-no-false-positives/
- Simon Willison 复盘，https://simonwillison.net/2026/May/7/firefox-claude-mythos/
- TechCrunch Mythos 改写 Firefox 安全，https://techcrunch.com/2026/05/07/how-anthropics-mythos-has-rewritten-firefoxs-approach-to-cybersecurity/
- OpenMythos 复刻仓库，https://github.com/kyegomez/OpenMythos
- Magonia 反驳分析，https://www.magonia.io/research/why-a-decade-of-writing-detection-logic-makes-the-mythos-exploit-numbers-less-scary/

---
相关实体:: [[anthropic|Anthropic]] | [[mythos|Mythos]] | [[mozilla|Mozilla]] | [[daniel-stenberg|Daniel Stenberg]] | [[claude|Claude]]
相关主题:: [[ai-security|AI安全]] | [[supply-chain-security|供应链安全]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
