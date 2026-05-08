# Mozilla 让 Claude Mythos 给 Firefox 找漏洞，国产浏览器安全团队可以参考的方法论

Mozilla 在 5 月 7 日的 Mozilla Hacks 博客上公开了一段过程，他们用 Claude Mythos Preview 给 Firefox 找了几个月漏洞。这次博客信息密度很高，直接给了仓库 bug 编号、漏洞分级数字、参与人数，对国产浏览器安全团队有参考意义。

## 数字先放前面

- 271 个漏洞由 Claude Mythos Preview 在 Firefox 150 中识别出来，分级为 180 个 sec-high、80 个 sec-moderate、11 个 sec-low。
- 2026 年 4 月 Firefox 修复的安全漏洞总数为 423 个，作为参照，2025 年全年这个数字是每月 20 到 30 个。
- 修复列表里有两颗钉子户，一个是已经存在 20 年的 XSLT 漏洞，一个是 15 年的 legend 元素漏洞。
- 这次行动有超过 100 个 Mozilla 工程师参与代码、patch 评审和 triage，AI 找漏洞，但人没省。

## 这套 pipeline 拆成 6 步

第一步，先用最强模型做小范围试验。Mozilla 不是一上来就扫整个仓库，而是先用 Claude Opus 4.6 做小规模实验，目标聚焦在 sandbox escape 这一类高价值漏洞上。先验证模型能不能在最难的类别上出活，再决定要不要扩。

第二步，人盯着终端调 prompt。工程师坐在终端边看模型怎么走，根据它每一步的产出反推哪些上下文该塞进去、哪些 instruction 该改。不要跳过手工 prompt 调优直接做并行化。

第三步，在一次性 VM 上做大规模并行扫描。Prompt 调好以后，Mozilla 把扫描任务并行化部署到 ephemeral VM，每个 VM 负责扫一组特定文件或函数。

第四步，和现有 fuzzing 基础设施对接，不另起炉灶。fuzzing 擅长在已知 entry point 上暴力构造输入找崩溃，Mythos 擅长理解代码语义找出 fuzzer 触不到的逻辑漏洞。发现的 bug 走 Mozilla 现有的 Bugzilla 流程，复用既有 SDLC，比给 AI 开特殊通道阻力小得多。

第五步，让模型生成可复现的测试用例。Mythos 不只指出代码哪一行可能有问题，而是真的去构造一段能跑的 test case 来证明漏洞。能跑出来的就是真 bug，跑不出来的模型自己丢掉。这等于把 verification 这一步从人转移到 AI，人只需要 review 真阳性。

第六步，人类工程师 100+ 人做 patch 评审 + triage。AI 出的 bug 报告，每一个真阳性还是要人来写 patch、review、回归测试。这套方法论是个放大器，不是节流阀，工程团队越大、越能吃 patch 队列，杠杆越大。小团队反而会被自己生成的 bug 队列堵死。

## 社区怎么看

Reddit r/singularity 那条 815 点赞的讨论里，高赞评论的共同点是它们不在讨论技术细节，而是在确认信任阈值。过去两年 LLM 找漏洞的一致风评是误报海，安全团队对此非常疲劳。Mozilla 这种规模的真实部署 + 公开 bug 编号，把信任阈值往下压了一格。下次你的领导提"AI 找漏洞我们公司也搞一个"时，大概率会看到这篇 Mozilla Hacks 博客被甩在面前。

## 我的判断

Anthropic 在切垂直安全 SaaS。Code w/ Claude 大会上一次性放出了 Claude.md、Mythos Preview、Sonnet 4.7 几条线，Mythos 不是产品，是模型 + 一套 agentic harness，专门拿来跑安全审计这种长链路、可复现、可验证的任务。

国产 AI 安全这条线值得跟踪几家，奇安信有 QAX-A.I 实验室和大代码库资产，目前 LLM 投入主要还在威胁情报和 SOC 自动化方向。360 有自动化漏洞挖掘平台的传统积累，LLM 集成度未公开披露到这个量级。模型公司这一侧，DeepSeek、Moonshot、智谱的能力曲线在追，但 agentic harness 这一层目前还没开始包装成垂直产品。我的判断是未来 6 到 12 个月，国内会有第一家专做 AI 代码安全审计的 SaaS 跑出来，Mozilla 这个 case 是发令枪。

## 今晚就能上手的三条路径

路径 A，申请 Mythos Preview。Mythos 目前是 Preview 状态，需要走商务接触，普通团队短期内拿到的概率不高，但值得现在就发邮件登记，等下一波放量。

路径 B，用 Claude API + 自己写 harness。最小可行版本是写一个脚本，输入是某个 C/C++ 函数源码，输出是漏洞假设 + PoC 代码，把 PoC 在 Docker + ASAN/UBSAN 沙箱里跑，跑通了归档，跑不通丢掉。先在你熟悉的小开源项目试，再决定要不要扩到大规模。国内用户可以通过官方 API 国内节点或开源本地部署使用，本文不展开。

路径 C，OSS-Fuzz + LLM 二次审。让 OSS-Fuzz 跑出 crash，用 LLM 二次分析每个 crash 的根因和可利用性，人 review。这条路 Google 内部已经在跑（OSS-Fuzz-Gen），代码开源，今晚就能 fork。

最后一句留给国产浏览器团队，Mozilla 这篇博客最值钱的不是 271 这个数字，是他们愿意把 bug 编号公开。国内浏览器厂如果有一天敢公开"我们用某某模型扫出 X 个漏洞，bug 单号是 XXX"，那才是真正的安全态度。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
