# 不让 AI 看截图猜坐标了，agent-desktop 让它直接读 Mac 的 UI 结构

我用 Claude Code 跑 computer-use 的时候，总有种说不出的别扭。

它要做的事情，是从 Slack 里挑一条消息回个"ship it"。流程是这样的，截屏，把图喂给模型，让模型猜按钮像素坐标，然后点 (834, 412)，再截一张图确认有没有点对。一个动作 5 到 8 秒，烧掉好几千 token，UI 哪怕往下滚一像素，整个回合就废了。

前两天在 Show HN 刷到一个叫 agent-desktop 的项目，作者上来第一句就是"我看够这套循环了"。我装了一下，跑了一晚上，回来跟你聊聊。

## 这套思路绕开了"模型看图猜坐标"

agent-desktop 是个 Rust 写的 CLI，单二进制大概十几 MB，跨平台。它的核心想法很朴素，操作系统其实早就把 UI 结构暴露出来了。

macOS 有 Accessibility API，Windows 有 UI Automation，Linux 有 AT-SPI。这套接口本来是给读屏软件用的，每个按钮、每个输入框、每个菜单项都有结构化标签，role 是 button、name 是"Send"、bounds 是多少多少。屏幕阅读器就是靠这个念给视障用户听。

那为什么不直接喂给 LLM 呢。

agent-desktop 把这层 a11y tree 包成 53 个 JSON 命令，agent 不用截图、不用 vision model，直接读结构操作 native app。一个典型的循环长这样。

```
agent-desktop snapshot --app Slack -i --compact
agent-desktop click @e12
agent-desktop type @e5 "ship it"
agent-desktop press cmd+return
```

snapshot 拿当前应用的元素树，每个元素分配一个 reference id 像 @e12，然后让 LLM 决定点哪个、输入什么。完事再 snapshot 一次确认状态。

## Slack 的 a11y tree 一拉就 50000 token

这套思路我之前自己琢磨过，最大的坑是"全量树太大了"。

作者也踩过这个坑。他在 README 里直说，Slack 完整 a11y tree 容易超 5 万 token，整棵树丢进 context 等于把上下文窗口炸了。所以他做了个叫 progressive skeleton traversal 的策略。

第一遍只返回浅层骨架，默认 depth 3，再深的容器只标个 children_count，不展开。命名容器会拿到一个 reference，agent 想钻进去就用 `--root @e3` 单独抓那一支。reference 是局部 scope 的，操作完只让那一部分失效，不用整棵重抓。

我对照着 4 月底刚写过的 trycua 试了一遍。trycua 是另一条路线，它给你套个 macOS sandbox VM，agent 在 VM 里跑 computer-use 模型，截图点像素那一套也一样要做，只是隔离干净不会污染主系统。

两条路线的设计取向不一样。trycua 走的是"重型沙箱+视觉模型"，安全边界做得到位，但本质还是模型看图。agent-desktop 走的是"直读结构+本地 CLI"，没有沙箱，没有 VM，二进制扔到 PATH 里就能用，速度上就是 a11y API 调用的延迟，几十毫秒级。

适合的场景不一样。trycua 适合让 agent 操作不可信的应用、或者要做录屏审计的场合。agent-desktop 适合你信任那台电脑、信任那些 app，只想让 agent 帮你跑日常自动化。

## 社区也在沿着这条路走

我顺手翻了下最近一个月相关的讨论，发现走"放弃截图、改用 a11y"的人不止一个。

r/MacOS 上有个老哥发帖说，"我花了一周想给 agent 喂屏幕上下文，最早是每 5 秒截一张图喂 vision model，账单先把我吓到了"，最后他切换到 macOS Accessibility API，"一切都顺了"。同样的活，结构化数据比截图省得多。

r/AI_Agents 那条更克制一点，标题就是"computer use agent 什么时候该看像素 vs 读 a11y tree"。作者把这事说成"两种方法解决不同问题"，按钮、菜单、表单这种有稳定 role 和 name 的，a11y tree 完胜，跨缩放跨分辨率都不漂。但 canvas、画布、自定义渲染的元素，a11y 看不见，这种还得回到像素。

还有一条踩坑提醒，r/LangChain 上有人发现 macOS Accessibility API 返回的 bounds 是左上角坐标 (x, y, width, height)，不少 agent 框架直接拿 (x, y) 去点，结果点在按钮边缘上，要 +width/2 +height/2 才是正中央。"trivial to fix in an MCP server, but most agent frameworks don't do it"，作者吐槽得挺到位。这种细节看完我自己都长记性了。

r/applescript 那边的讨论更有意思，有人坚持说"UI scripting 始终是 last ditch option"，因为 a11y tree 跟 app 真正的内部状态其实是隔了好几层的镜像，复杂场景能给你绕晕。这话也对，agent-desktop 这套方案最吃亏的就是 Electron 应用，很多 Electron 把 a11y 关掉或者标得很烂，树读出来一片 group group group。

所以这工具的边界是清楚的。**原生 native 应用、有 a11y 暴露的应用，agent-desktop 直接吊起来跑。Electron 应用、Web 内嵌内容、纯 canvas 渲染，那还得用回截图方案或者 web 路线。**

## 我自己的接法，三步走

如果你看到这觉得想试一下，三步就够。

第一步，clone 下来 cargo build。它没有运行时依赖，build 完就是一个二进制，扔到 `~/.local/bin` 之类的地方。第一次跑 macOS 会要权限，去"系统设置 → 隐私与安全性 → 辅助功能"把这个二进制勾上。

第二步，跑示例。先 `agent-desktop list-apps` 看看当前活着的应用，再 `agent-desktop snapshot --app "你想试的应用名"`。我第一次跑 Notes，吐回来的 JSON 不算长，能很清楚看到哪个是工具栏、哪个是文本编辑区。然后试着 `agent-desktop click @某个id`，确认能不能正确触发。

第三步，接到自己的 agent 工作流。这一步要看你用什么 agent 框架。最简单的接法是把 agent-desktop 当个普通 shell 工具，agent 想做什么动作就让它生成 shell 命令、subprocess 跑一下、把 JSON 输出回灌给模型。如果你跑的是支持 MCP 的客户端（Claude Desktop、Cursor），可以包一层 MCP server，把 53 个命令暴露成 MCP tools。

进阶玩法，把 snapshot + 决策 + act 这一套写成你自己的 prompt 框架，每一轮只给 LLM 看相关子树而不是全树，token 消耗能压到截图方案的几十分之一。

## 我对这工具的判断

它不是 Claude Code 替代品，但它替代了 Claude Code 里"操作 native 应用"那一段。

Claude Code 本身的强项是写代码、改代码、跑命令、读文件，这些它做得很顺。但它一旦要操作 GUI 应用，比如开 Slack 发消息、在 Notion 整理文档、在 Figma 改个图层，就会退化成"截屏点像素"的笨拙循环。这部分活外包给 agent-desktop，速度和稳定性都会上一个台阶。

我认为这种"OS 级 a11y CLI 工具"会是 desktop agent 这一年最值得做的方向之一。视觉模型再强，也强不过操作系统已经免费给你的结构化语义。作者自己也说，这东西灵感来自 Vercel Labs 的 agent-browser，浏览器那边早就走通了"读 DOM 而不是截图"，desktop 这边只是迟到了几年。

122 颗星不算多，但这个方向对了，我会继续盯着看。

## 相关链接

- agent-desktop GitHub 仓库，https://github.com/lahfir/agent-desktop
- 作者的 Show HN 帖子，https://news.ycombinator.com/show
- agent-browser（同一思路的浏览器版本），https://github.com/vercel-labs/agent-browser
- macOS Accessibility API 官方文档，https://developer.apple.com/documentation/applicationservices/axuielement_h

---
相关实体:: [[anthropic]] | [[claude-code]] | [[trycua]]
相关主题:: [[computer-use-agent]] | [[ai-automation]] | [[edge-ai]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
