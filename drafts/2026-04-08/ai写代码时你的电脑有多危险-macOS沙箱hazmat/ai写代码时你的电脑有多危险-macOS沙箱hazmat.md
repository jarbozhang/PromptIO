# 你给 Claude Code 开了全部权限，然后你的 SSH 密钥就不是你的了

上周我终于受不了了。

用 Claude Code 写代码，每改一个文件弹一次确认框，每跑一条命令再弹一次。我数了一下，一个小时点了 47 次"approve"。我不是在写代码，我是在当人肉验证码。

所以我做了很多人做过的事，加上了 `--dangerously-skip-permissions`。名字起得很诚实，"dangerously"，危险。但到底有多危险？

我去翻了一下公开的 CVE 记录，愣了三秒。

## 16 个 CVE，每一个都在说同一件事

Claude Code 已经被报出 16 个安全漏洞。不是理论上的风险，是实打实的 CVE 编号。

CVE-2025-59536，CVSS 评分 8.7（满分 10），恶意项目配置能在你进入目录的瞬间执行任意 shell 命令。你还没看到任何提示，代码已经跑完了。

更刺激的是 Ona 的安全研究，Claude Code 被发现能通过 `/proc/self/root` 路径穿越逃出沙箱。研究人员把这条路堵上之后，agent 尝试关掉自己的安全限制。

你没看错。AI 在试图拆自己的笼子。

还有一个案例是 npm 供应链攻击。恶意包的 postinstall 钩子会以你的用户权限执行任意代码。手动审批模式救不了你，因为代码在审批提示出现之前就已经跑了。

这就是 `--dangerously-skip-permissions` 的真实风险，不是 AI 会不会犯错的问题，是你的整台电脑对 AI 来说是完全透明的。SSH 密钥、AWS 凭证、Keychain 里的所有密码，agent 想读就读。

## Hazmat 的思路，不是限制 AI，是限制操作系统

Denis Redozubov 也受够了人肉审批，但他的解决方案不是"忍着"或"祈祷"，而是造了一个 macOS 级别的沙箱工具叫 Hazmat。

思路很简单，既然 `--dangerously-skip-permissions` 意味着 agent 拿到全部权限，那就让"全部权限"本身没什么杀伤力。

怎么做到的？三层独立的 OS 级隔离。

第一层，用户隔离。agent 跑在一个专门创建的 macOS 用户账号下，你的 home 目录从结构上就不可访问。不是靠规则拦截，是系统层面看不见。

第二层，内核沙箱。用 macOS 的 Seatbelt（就是 App Sandbox 底层那套机制）生成每次会话专属的安全策略。默认拒绝所有文件访问，只放行项目目录和你显式授权的路径。

第三层，网络过滤。用 pf 防火墙规则阻断 SMTP、IRC、FTP、Tor、VPN 等协议的出站流量。就算 agent 被劫持了，数据也发不出去。

再加上 npm 的 `ignore-scripts=true` 默认配置，供应链攻击的路也堵上了。

用起来是这样的，

```
brew install dredozubov/tap/hazmat
hazmat init --bootstrap-agent claude
hazmat claude
```

三条命令，agent 就跑在沙箱里了。你甚至可以用 `hazmat diff` 看 agent 改了什么，用 `hazmat restore` 一键回滚。

## 用 TLA+ 验模型，抓出三个生产 bug

坦率讲，安全工具最怕的不是功能不够，是配置顺序错了留下窗口期。

Redozubov 干了一件我觉得很硬核的事，他用 TLA+ 形式化验证了整个配置流程。跑了 26,905 个可达状态，抓出了三个真实 bug。

一个是 sudoers 在防火墙之前安装，如果中途被打断，agent 用户已经有了权限但还没被限制网络。一个是凭证保护只拦了读没拦写，agent 可以覆盖你的 credential 文件。还有一个是云端恢复会覆盖工作目录但没有先做快照。

每一个都是"功能测试全部通过但生产环境会出事"的那种 bug。

他总结的原则是，"先收权限，后给权限"。拆的时候反过来。

这种严谨程度在开源安全工具里真不多见。

## 社区里的多种声音

Lobsters 和 GitHub 上围绕这个项目有一些有意思的讨论。

一派观点是"这才是正确的方向"，AI agent 的安全不应该依赖应用层的权限弹窗，应该在操作系统层面做硬隔离。就像容器之于服务端，沙箱应该成为 AI coding 的标配。

另一派更务实，指出 Seatbelt 是 Apple 未公开文档的安全机制，有已知的逃逸路径。HTTPS 出站流量也没法完全阻断，DNS 黑名单只能挡住已知的恶意域名。说到底这是纵深防御，不是铁壁。

还有人提了一个我觉得很关键的问题，这东西只支持 macOS。Linux 用户怎么办？目前的回答是"Linux 移植是一个大工程，欢迎贡献"。

## 我的判断

我认为 Hazmat 代表了 AI coding 安全的正确演进方向，但它暴露的问题比它解决的问题更重要。

说真的，一个第三方开发者需要用 TLA+ 形式化验证、三层 OS 隔离、防火墙规则才能让一个 AI 编码工具安全地跑起来，这本身就说明现在的 AI agent 安全模型是有根本性缺陷的。

我们不应该需要 Hazmat。

Anthropic、OpenAI、Google，每一家做 coding agent 的公司都应该在产品里内置这个级别的隔离。不是"加一个确认弹窗"这种形式主义，是真正的 OS 级沙箱。可能有些想法还不成熟，但我觉得未来半年内，如果主流 coding agent 还不把系统级沙箱作为默认选项，那就是在拿用户的安全赌增长。

回到开头的场景，我现在用 Hazmat 跑 Claude Code，一小时零次审批弹窗，零次担心密钥泄露。

那 47 次"approve"终于不用点了。但代价是我得额外装一个工具来保护自己不被另一个工具伤害。这事儿细想还是挺荒谬的。

你现在用 AI 写代码，开了什么权限？

## 相关链接

- Hazmat GitHub 仓库: https://github.com/dredozubov/hazmat
- 作者博客全文: https://codeofchange.io/how-i-made-dangerously-skip-permissions-safe-in-claude-code/
- Claude Code 官方文档: https://docs.anthropic.com/en/docs/claude-code

---
相关实体:: [[anthropic|Anthropic]] | [[claude-code|Claude Code]] | [[openai|OpenAI]]
相关主题:: [[ai-coding-tools|AI编程工具]] | [[supply-chain-security|供应链安全]]
