# 花 599 美元买 Mac Mini 跑 AI Agent，然后你发现最大的坑不是算力

上周我在 Mac Mini M4 Pro 上跑 OpenClaw，让 Claude 帮我自动处理一堆重复性的数据清洗工作。跑了一晚上，第二天早上打开一看，Agent 在凌晨三点卡在一个弹窗上，之后的五个小时什么都没干。

这不是个例。跑过 Computer Use Agent 的人都知道，真正的瓶颈不是模型能力，不是 API 费用，是你没法盯着它。

Astropad 刚发布了一个叫 Workbench 的东西，定位很精准，"AI 时代的远程桌面"。用 iPhone 或 iPad 低延迟连接到你的 Mac Mini，随时看 Agent 在干嘛，卡了就拉一把。说实话，我第一反应是，这不就是个远程桌面吗？VNC、Jump Desktop 干了多少年的事了。

但仔细想想，它踩中了一个真实的痛点。

## Agent 不需要你的 GPU，需要你的眼睛

2026 年 Computer Use Agent 的基础设施需求已经发生了根本变化。OpenClaw 也好，Claude Computer Use 也好，它们不在本地跑模型，它们只是一个 Agent 框架，把任务拆解后发 API 调用给 Claude 或 GPT。你的 Mac Mini 提供的不是算力，是一个操作系统环境，一个有屏幕、有鼠标、有键盘的"身体"。

问题来了。这个"身体"是无头的 (headless)。

跑过 Mac Mini 无头模式的人都踩过这个坑，你得买一个 HDMI 假负载插头，不然 macOS 不初始化图形系统，Screen Sharing 分辨率直接崩掉。就这么一个 8 块钱的塑料头，能卡你一整个下午。

然后你解决了显示问题，Agent 跑起来了。接下来的问题是，它干活的时候你不在旁边。Agent 遇到验证码了、弹了个意料外的对话框、或者页面布局变了点击偏移了，你全然不知。等你想起来去看的时候，已经浪费了几个小时的 API 费用。

这就是 Workbench 想解决的场景。

## Workbench 到底做了什么

坦率讲，从功能清单看，Workbench 并不复杂。

它基于 Astropad 自家的 LIQUID 协议，就是 Luna Display 和 Astropad Studio 用的那套，Retina 分辨率下号称"感知无损"，不会像 VNC 那样糊成一团。多个 Mac 屏幕会合并成一个虚拟显示器，在手机上用手势缩放平移。

几个我觉得有意思的点，语音转文字输入，你可以直接对着 iPhone 说 prompt 发给 Mac 上的 Agent。多设备切换，如果你有好几台 Mac Mini 在跑不同的 Agent 任务，一个账号就能来回跳。AES-256 端到端加密，Astropad 自己也看不到你的屏幕内容。

定价是每天免费 20 分钟，付费 10 美元/月或 50 美元/年无限制使用。要求 macOS 15+，iPhone 端要 iOS 26，强烈推荐 Apple Silicon。

## 社区里的多种声音

MacRumors 论坛上吵得挺热闹的。

一派人觉得订阅制很烦，"又一个不让你买断的软件"。有人直接推荐 Jump Desktop，一次性购买，功能也够用。反正我觉得这个吐槽有道理，50 美元/年对一个远程桌面来说确实不便宜。

但另一派的观点也站得住脚，通用远程桌面不是为"盯 Agent"设计的。你用 VNC 连上去，延迟高、画面糊，看不清 Agent 正在操作的界面细节。你用 Screen Sharing，每次连接都要走一遍认证流程。Workbench 的价值不在于"远程桌面"这个品类本身，在于它把体验针对 Agent 监控场景做了优化。

还有一个有意思的讨论，有人质疑，你真的需要一台 Mac Mini 来跑 AI Agent 吗？OpenClaw 本质上是往云端发 API 调用，一台旧笔记本理论上也能干。这话没错，但忽略了一件事，Computer Use Agent 需要一个稳定的、始终在线的 GUI 环境，Mac Mini 的低功耗和稳定性在这件事上确实有优势。

## 我的判断

我认为 Workbench 这个产品方向是对的，但时机微妙。

对的地方在于，它看到了一个正在成型的基础设施缺口。当 Anthropic 让 Claude 可以远程操控你的 Mac，当 OpenAI 挖走了 OpenClaw 的创始人 Peter Steinberger 来做下一代个人 Agent，"Agent 需要一个物理环境"这件事正在从极客玩具变成真实的生产力场景。而这个物理环境需要被远程管理。

微妙的地方在于，这个窗口期可能很短。macOS 自己迟早会原生支持更好的 Agent 监控能力。Apple Intelligence 的路线图里，Agent 管理大概率是下一步棋。到时候 Workbench 可能会被平台能力吃掉。

可能有些想法还不成熟，但我是真的觉得，Computer Use Agent 的基础设施问题被严重低估了。大家都在讨论模型能力、prompt 工程、Agent 框架，但很少有人认真想过，这些 Agent 跑在什么环境里、怎么被监控、出了问题怎么干预。

Workbench 不是终极答案，但它可能是第一个认真回答这个问题的产品。

## 你可以做的事

如果你已经在用 Mac Mini 跑 Agent，花 20 分钟试试免费版，感受一下 LIQUID 协议的延迟表现。如果延迟真的比 Screen Sharing 低一个档次，50 美元/年就值了。

如果你还没入坑 Computer Use Agent，先别急着买 Mac Mini。问自己一个问题，你的工作流里有没有那种"需要操作 GUI 但不需要人类判断"的重复性任务？如果有，Mac Mini + Agent + Workbench 这套组合才有意义。如果没有，一个跑在云端的 API Agent 可能更划算。

回到开头那个凌晨三点卡住的 Agent。如果当时我手机上有 Workbench，收到延迟告警后花 30 秒点掉那个弹窗，后面五个小时的任务就不会白费。这就是基础设施的价值，它不性感，但它决定了你的 Agent 到底是玩具还是工具。

## 相关链接

- [Astropad Workbench 官网](https://astropad.com/product/workbench/)
- [TechCrunch 报道](https://techcrunch.com/2026/04/08/astropads-workbench-reimagines-remote-desktop-for-ai-agents-not-it-support/)
- [App Store 下载](https://apps.apple.com/us/app/astropad-workbench/id6758788573)
- [Anthropic Claude Computer Use](https://www.anthropic.com/)
