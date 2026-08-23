# Codex 可以在手机上管任务了，远程盯代码 Agent 的正确用法

我看到 OpenAI 这次 Codex 更新，第一反应不是又多了一个入口。真正有用的地方，是它把代码 Agent 最烦人的等待时间，拆成几次手机上的判断。

先把边界说清楚。下面不是亲测教程，我只按 OpenAI 2026 年 5 月 14 日的公告复盘，不补登录、价格和访问方法。能写成经验的部分，是我自己对代码 Agent 工作流的判断。

Codex 现在进了 ChatGPT mobile app，处于 preview。OpenAI 的说法是，你可以在手机上监控、引导和审批 Codex 正在做的任务，任务本身跑在你的 laptop、devbox 或 remote environment 上。

OpenAI 还给了一个规模信号，Codex 每周已有超过 400 万用户。这件事看起来很小，其实很适合已经用代码 Agent 的人。

因为代码 Agent 最大的浪费，往往不是它不会写代码，而是它等你。等你确认需求，等你批一个命令，等你在两个方案里选一个，等你看一眼测试结果。

## 这不是手机 IDE

我不会把它理解成在手机上写代码。OpenAI 公告里更重要的词，是 active threads、approvals、plugins 和 project context。

手机端会加载 Codex 运行环境里的实时状态。你能看多个线程，审输出，批命令，换模型，或者开一个新任务。返回到手机上的东西包括 screenshots、terminal output、diffs、test results 和 approvals。

真正该盯的是后半句。文件、凭据、权限和本地配置，仍留在 Codex 正在工作的机器上。手机只是拿到更新和审批入口，底层通过 secure relay 让可信机器跨设备可达，同时不把机器直接暴露到 public internet。

我喜欢这个设计的原因很朴素。手机不该变成另一个开发环境，手机只该负责让长任务不中断。

## 碎片时间只适合做三件事

第一件，看证据。

OpenAI 给的场景是等咖啡时让 Codex 查 bug。它能从你的开发环境里看相关文件，复现浏览器问题，跑测试，并往修复推进。你在手机上适合看的不是完整代码审查，而是截图、终端输出、测试结果和最后的 diff。

第二件，做选择。

公告里的另一个场景，是通勤途中 Codex 跑重构，发现两条可行路径，需要你选方向。这个时候手机端最有价值。你不用展开全部上下文，只要判断哪条路径更符合项目约束，就能让任务继续往前走。

第三件，批下一步。

审批不是点一下允许。我的习惯会是先看命令想改什么、会碰哪些文件、失败后怎么回退。尤其是数据库迁移、删除文件、发布脚本这类动作，手机上看不清就不要批，回到桌面再处理。

## 远程环境才是重点

OpenAI 同时说，Remote SSH 已经 GA。Codex desktop app 可以从 SSH configuration 自动发现 hosts，然后像本地一样在远程机器里创建 projects 和跑 threads。

这对团队比对个人更重要。很多公司本来就把依赖、凭据、安全策略和算力放在 managed remote environments 里。Codex 如果能从这些环境里干活，再把状态同步到手机，人的角色就从坐在电脑前陪跑，变成在关键节点给判断。

这也是风险最大的地方。

因为手机审批会降低心理门槛。以前你在电脑前看到一条 shell command，还会顺手查一眼目录和 git diff。现在你在电梯里、会议间隙、排队时点批准，很容易把自己从 reviewer 变成放行器。

所以我认为 Codex 手机端的正确用法，不是让你更频繁地批准，而是让你更早发现哪里需要停。

## 我会给自己的三条规则

低风险任务可以手机盯，高风险任务必须回桌面。

适合手机处理的，是查 bug、跑测试、整理客户对话前的 briefing、补文档、比较两个实现方向。OpenAI 公告里也提到，Codex 可以在客户会前综合 Slack、email、documents 和 browser-based tools 的最新信息，帮你列出 open questions。前提是这些材料已经在你授权的环境里，别把手机当成随手投喂敏感信息的入口。

每次请求审批，都让 Codex 说清四件事，准备执行什么，为什么需要执行，影响哪些文件，失败后如何回退。它如果只给一句需要权限继续，我就不批。

团队环境先配 guardrail，再谈移动端。公告里提到 Hooks 已经 GA，可用于扫描 prompts 里的 secrets、运行 validators、记录 conversations、创建 memories，或者按 repo 和目录定制 Codex 行为。Programmatic access tokens 则面向 Enterprise 和 Business plans，用在 CI pipelines、release workflows 和 internal automations。手机审批越方便，这些边界越该先放上去。

## 可用性边界

按 OpenAI 公告，Codex in the ChatGPT mobile app 正在 iOS 和 Android 上以 preview 形式 rollout，覆盖 all plans，包括 Free 和 Go，范围是 supported regions。需要更新 ChatGPT mobile app 和 macOS 上的 Codex app 才能尝试。Windows 上把手机连接到 Codex app 的支持还在路上。

Remote SSH 和 Hooks 对 all plans 可用。Programmatic access tokens 只对 Enterprise 和 Business plans 可用。HIPAA-compliant use 只支持符合条件的 ChatGPT Enterprise workspaces，并且限定在 local environments 里的 Codex 用法。

这段信息我建议按官方文档再核对一遍，尤其是 workspace 权限、地区、企业合规和 Windows 支持状态。移动端入口变化很快，别把一篇公告当成长期配置手册。

## 下一步怎么试

别一上来把核心 repo 交给手机审批。

选一个低风险任务，比如让 Codex 查一个前端报错、补一个测试、整理一段支持案例，要求它在每个关键节点给出证据。你只在手机上做三件事，读证据，选方向，决定是否继续。

如果它请求的动作你看不懂，暂停。代码 Agent 真正省时间的地方，不是把人从审查里拿掉，而是把人的判断放在更值钱的位置。

## 相关链接

- [OpenAI Blog, Work with Codex from anywhere](https://openai.com/index/work-with-codex-from-anywhere/)
- [Codex remote connections documentation](https://developers.openai.com/codex/remote-connections)
- [Codex Hooks documentation](https://developers.openai.com/codex/hooks)
- [Codex access tokens documentation](https://developers.openai.com/codex/enterprise/access-tokens)

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
