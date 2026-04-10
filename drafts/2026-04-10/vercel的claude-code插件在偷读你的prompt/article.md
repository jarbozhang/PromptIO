昨天有个开发者在 HN 上发了一篇帖子，252 分，102 条评论，讨论烈度拉满。内容就一句话，Vercel 的 Claude Code 插件在偷偷把你的 bash 命令、文件路径、甚至 prompt 发回自家服务器。

不是 Vercel 项目才触发。是所有项目，无差别。

我看完原文和评论区，说实话愣了几秒。不是因为"大公司收集数据"这件事本身有多意外，而是这个收集方式实在太野了。

## 到底发生了什么

一个叫 Akshay Chugh 的开发者拆了 Vercel 的 Claude Code 插件代码，发现了三个问题。

第一，这个插件不走正常的权限请求流程。它直接往 Claude 的系统上下文里注入自然语言指令，让 AI "代替用户做决定"。你在 Claude Code 里看到的那些提问，你以为是 Claude 原生功能？不，是 Vercel 插件塞进去的。用户根本分不清。

第二，它收集的数据比声称的多得多。官方说法是"匿名的技能注入模式"，但实际上每一条 bash 命令的完整字符串都会被发送到 `telemetry.vercel.com`。文件路径、项目名称、环境变量名，bash 命令里有什么，Vercel 就拿到什么。

第三，也是最离谱的一点，这个插件在你机器上的任何项目里都会运行。你用 Next.js 的项目它监控，你写 Python 的项目它也监控，你甚至没用 Vercel 的项目，它照样监控。代码里有框架检测逻辑，但只用来上报，不用来限制范围。

## 代码里写得明明白白

原文作者翻出了关键代码。`hooks/posttooluse-telemetry.mjs` 里，每次 bash 工具调用后，完整命令字符串通过 `trackBaseEvents()` 发送到 Vercel 的遥测端点。默认启用，没有关闭选项。

更有意思的是 `UserPromptSubmit` 的匹配器，空字符串，匹配所有内容。

设备 ID 持久化存储在 `~/.claude/vercel-plugin-device-id`，所以即使你不登录 Vercel 账号，他们也能跨会话追踪你的使用行为。

坦率讲，如果只是收集"用户用了 Next.js 还是 Remix"这种级别的数据，我觉得可以理解。但 bash 命令？你知道开发者在命令行里会打什么吗？API key、数据库连接串、内部服务地址，这些东西都在 bash 历史里。

## 社区里吵翻了

HN 评论区最激烈的讨论集中在三个方向。

有人直接质疑 Vercel 的意图。一个用户注意到 Vercel 工程师回复里的措辞，"我们的目标不是只收集数据"(our goal isn't to only collect data)，这个"只"字让不少人觉得收集数据确实是目标之一，只不过不是唯一目标。

有 Vercel 的客户在评论区说，"我马上要去告诉团队，如果任何人用过这个插件，那台机器上的密钥都要当作已泄露处理。"这不是夸张，当你的 bash 命令被发送到第三方服务器，你确实无法确认哪些敏感信息已经暴露。

还有人翻出了 Anthropic 的插件政策，指出第 1D 和 2D 条明确禁止收集"无关的对话数据"和"在没有用户明确意图的情况下让 Claude 发起外部调用"。如果这个政策是认真执行的，Vercel 这个插件理论上应该被下架。

Vercel 的工程师 andrewqu 在评论区回应了。大意是，插件"始终开启"是设计决策，为了帮助"从零开始的新项目"。遥测数据是"匿名的"，用随机 UUID。prompt 收集是"默认关闭、需要选择加入的"。如果你不想要遥测，可以设置环境变量 `VERCEL_PLUGIN_TELEMETRY=off`。

说真的，这个回应没有说服我。

## 我的判断

我认为这件事的核心问题不是 Vercel，而是整个 Claude Code 插件生态缺乏基本的安全边界。

现在 Claude Code 的插件系统没有权限隔离，没有可视化的数据流标识，用户甚至不知道哪些文字是 Claude 说的、哪些是插件注入的。这就像你在浏览器里装了个扩展，它能读你所有标签页的所有内容，但浏览器不告诉你它在读。

Vercel 被抓了个现行，但如果每个插件都学这个模式呢？一个开发者装了五六个插件，每个都往系统上下文里塞一万多 token 的指令，每个都在后台偷偷上报数据。Claude Code 会变成什么样？

我觉得 Anthropic 需要尽快做三件事，给插件加权限声明和审核机制，让用户能看到每个插件注入了什么内容，以及强制遥测 opt-in。

Vercel 这边，原文作者的要求很合理，把基础遥测改成 opt-in，用人话说清楚你收集了什么，把监控范围限制在 Vercel 项目内。

可能有些想法还不成熟，但我自己已经把这个插件关了。不是因为我觉得 Vercel 一定会拿我的数据做坏事，而是在一个没有护栏的系统里，我不想赌。

## 你现在可以做的

打开终端跑一下 `cat ~/.claude/vercel-plugin-device-id`，看看文件是否存在。如果存在，说明你已经在被追踪了。

设置环境变量关掉遥测

```
export VERCEL_PLUGIN_TELEMETRY=off
```

或者更干脆，直接卸载这个插件。

一个值得思考的问题，当你的 AI 编程助手变成了一个插件平台，谁来保证这些插件不会变成另一种形式的间谍软件？

## 相关链接

- [原文: The Vercel plugin on Claude Code wants to read your prompts](https://akshaychugh.xyz/writings/png/vercel-plugin-telemetry)
- [HN 讨论帖 (252 分, 102 条评论)](https://news.ycombinator.com/item?id=47704881)
- [Anthropic 插件政策文档](https://docs.anthropic.com/en/docs/claude-code/plugins)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
