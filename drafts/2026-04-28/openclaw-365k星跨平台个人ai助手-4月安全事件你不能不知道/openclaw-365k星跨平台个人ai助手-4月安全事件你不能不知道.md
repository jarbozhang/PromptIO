# openclaw 365k 星已经是 TypeScript 圈最大个人 AI 助手了，但 4 月那个安全事件你不能不知道

365389 颗星，74847 个 fork，去年 11 月才建仓。

我盯着这个数字看了三秒。openclaw/openclaw，TypeScript，今天又一次冲上 GitHub trending。从一个"空间龙虾"吉祥物 Molty 起家的个人 AI 助手项目，半年时间堆出 36 万星，已经是这个语言生态里最大的开源个人助手了。

但这不是一篇"快上车"的文章。

4 月初 ArsTechnica 那篇报道我重读了一遍，标题直接告诉你"为什么 openclaw 用户最好直接假设自己已经被入侵"。这是个 agentic 工具，攻击者通过它在没有任何认证的情况下拿到了 admin 权限。同一个项目，4 月 18 号 Latent Space 写了一篇《The Two Sides of OpenClaw》做社区反思，关键的一句话是，"安全报告比 curl 多 60 倍，至少 20% 的 skill 贡献是恶意的"。

一边是 36 万星的明星项目，一边是供应链安全的烂摊子。今天又冲回 trending，我觉得有必要给国内独立开发者把这件事讲清楚。

## openclaw 到底是个什么东西

先回答最朴素的问题，它是干嘛用的。

它的定位是"你自己设备上跑的私人 AI 助手"。你日常用什么聊天工具，它就在哪个工具里回复你。WhatsApp、Telegram、Slack、Discord、Google Chat、Signal、iMessage，官方列了 20 多个。macOS / iOS / Android 上有语音唤醒和"对话模式"，桌面端有一个叫 Live Canvas 的可视化工作区，工具层自带浏览器和自动化能力。

我的理解是，它在 TypeScript 圈做了一件 Python 圈没人做成的事，把"个人助手"做成了一个跨所有 IM、跨所有 OS 的统一中枢，而不是某个 IDE 插件或者某个网页。

安装入口很轻。`npm install -g openclaw@latest` 然后 `openclaw onboard --install-daemon`，它会注册一个常驻 daemon。Node 24 推荐，22.14+ 也能跑。Windows 走 WSL2。

光看这个安装姿态我已经有点警觉了。一个全局 npm 包 + 后台守护进程 + 接管你 20 个 IM 账号 + 自带浏览器和系统自动化能力。这是把整台电脑的钥匙都交给它。

## 4 月 3 号到底出了什么事

ArsTechnica 4 月 3 号发的那篇文章，副标题原话是"the viral AI agentic tool let attackers silently gain admin unauthenticated access"。一个病毒级传播的 agentic 工具，让攻击者在没有认证的情况下静悄悄拿到 admin 权限。

我把"agentic + 无认证 + admin"这三个词放在一起看，就明白严重性了。openclaw 的 daemon 是要长时间常驻的，攻击者不需要钓你点链接，不需要你输入密码，只要你装了某个被污染的版本或者某个被污染的 skill，它就能直接拿到能调用浏览器、能跑系统命令、能读你聊天记录的那一层权限。

这不是"我的某个网页 token 泄露了"那种烦恼，这是"对方拿到了一个能持续控制我电脑、还能假装是我去给所有联系人发消息"的口子。

我没法给你贴 CVE 编号，因为这件事的传播主要在英文媒体和官方 changelog 里。我的建议很直接，如果你 4 月 3 号之前装过 openclaw 或者它的任何 skill，把版本升到官方公告之后的修复版本，并且**把过去这段时间的可疑账号活动当作潜在被入侵处理**。重点查的是你聊天工具里有没有你不记得发过的消息，浏览器里有没有不属于你的登录会话。

## Latent Space 那篇"两面性"在说什么

4 月 18 号 swyx 写的《The Two Sides of OpenClaw》挺有意思。一边是创始人 Peter Steinberger 的 TED talk，把 openclaw 讲成一个鼓舞人心的开源故事。另一边是同一个人在 AIE 大会上讲的工程现实，"安全报告比 curl 多 60 倍"，"至少 20% 的 skill 贡献是恶意的"。

curl 是什么概念，是几乎每台 Linux 服务器都装的、有 27 年历史的核心工具。一个半岁大的项目收到的安全报告比它多 60 倍。

我的判断是，这不全是 openclaw 自己的锅。它增长太快、暴露面太大、生态门槛太低，攻击者发现这是一个新的、用户基数巨大的、还没有成熟治理机制的入口，自然就涌过来了。这是所有"agentic + 插件市场"模式都会面对的结构性问题，只是 openclaw 是第一个把这个问题撞到 36 万星规模的。

但 20% 的 skill 是恶意贡献，这个数字非常吓人。意思是你随手装一个"openclaw 翻译插件"，五分之一的可能它在偷偷干别的事。

## 中国独立开发者该怎么用它

坦率讲，我自己不会现在就把它装在主力机上。

但这不代表 openclaw 没价值。它的价值在于给你示范了一种架构，"个人 AI 助手 = 跨平台 daemon + IM 适配层 + 工具层 + skill 市场"，这套架构在国内基本是空白的。微信生态没人做，钉钉飞书企微没人做，跟 iMessage 体量等价的国产 IM 协议层基本没开源对手。

我会做三件事。

第一，**用沙箱跑**。专门开一台虚拟机，或者用 Docker，或者在一台不放任何账号的旧机器上装。让它接微信用网页版的二维码副号，不要用主号，不要让它接管你的浏览器主 profile。

第二，**只装官方 skill**。第三方 skill 在 20% 恶意率没降下来之前，每装一个都当成你在装一个未经审计的 npm 包。看 PR 历史、看维护者、看下载量。npm install 后顺手 `npm ls openclaw` 看一眼依赖树。

第三，**学它的架构，写自己的简化版**。如果你做的是国内场景，比如把 AI 接到企微 / 钉钉 / 微信小号，你不需要 openclaw 的 20 个 IM 适配，你只需要那一层。把它当代码参考库读，比直接当生产工具用安全得多。

## 一个开放问题

我自己还在摸索的一个问题是，agentic + 插件市场这套架构有没有可能在治理层面被根治。

curl 的安全模型是它只做一件事，做了 27 年。openclaw 的安全模型是它什么都做，半年长到 36 万星。这两种模型本身就在拉扯。如果 openclaw 想活下去，它要么对标 skill 市场退化成一个"只跑官方功能"的 agent，要么搞出比 npm 严格得多的签名 + 审计机制。

你怎么看 agentic 工具的"插件市场"这件事，留言聊聊。

回到开头那个 365389。这个数字本身没错，错的是把 star 数当信任票。star 是一种好奇心投票，不是审计报告。

## 相关链接

- openclaw 仓库 https://github.com/openclaw/openclaw
- ArsTechnica 4 月 3 日报道 https://arstechnica.com/security/2026/04/heres-why-its-prudent-for-openclaw-users-to-assume-compromise/
- Latent Space《The Two Sides of OpenClaw》 https://www.latent.space/p/ainews-the-two-sides-of-openclaw

---
相关实体:: openclaw
相关主题:: [[agent-frameworks|Agent框架]] | [[supply-chain-security|供应链安全]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
