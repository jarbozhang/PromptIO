# trycua 把 Computer Use Agent 的整套基础设施开源了，跨 macOS Linux Windows 都能跑

我盯了两天 GitHub Trending，今天最让我坐不住的是 trycua/cua 这个项目，单日 +182 星，已经累计 14.6k。它干的事很直白，把"让 AI 操作整台桌面电脑"所需要的基础设施，全开源了。

不是 demo，不是 wrapper，是 sandbox + driver + benchmark + 多端 SDK，一整套。

而且跨平台，macOS、Linux、Windows 都能跑，连 Android 都在路上。

## 为什么这件事值得放下手头的活看一眼

过去一年，做"AI 操作电脑"这件事的口子越开越大。但你真要落地一个项目，会发现几乎绕不开两条路，要么调远程 API，要么自己用 pyautogui + 截图 + 多模态模型硬撸。前者贵且不灵活，后者跑三天就会被各种边界情况搞疯。

trycua 想做的是中间那层基础设施，VM 管理、桌面流式传输、鼠标键盘事件、轨迹录制、benchmark 评估，全都封装好。你只管写 agent 逻辑。

我是真的觉得，这种项目对中国开发者尤其重要。我们做自动化、做数据采集、做游戏 NPC、做 RPA 替代品，都需要一个"电脑能被代码精准控制"的底座。以前这个底座要么是 RPA 厂商卖几十万的产品，要么是自己拼 selenium + adb + autoit 拼到崩溃。现在多了一个 MIT 协议的选项。

## 它到底封装了什么

我把 README 翻了一遍，核心是四块。

**Cua Sandbox**，统一的 VM 和容器 API。一行 Python 起一个 Linux 沙箱，跑命令、截图、点鼠标、敲键盘，全程异步。

```python
from cua import Sandbox, Image

async with Sandbox.ephemeral(Image.linux()) as sb:
    result = await sb.shell.run("echo hello")
    shot = await sb.screenshot()
    await sb.mouse.click(100, 200)
    await sb.keyboard.type("Hello from Cua!")
```

这段代码我看了三遍，因为它把过去要写两百行胶水代码的活，压成了八行。`ephemeral` 这个词用得很妙，agent 跑完任务沙箱就销毁，不会污染宿主。

**Cua Driver**，macOS 上的后台自动化。这是我觉得最有技术含量的一块。它不抢你的鼠标焦点，agent 在后台跑，你在前台正常用电脑。而且支持 Chromium、Figma、Blender 这种不走系统辅助功能 (AX) 的应用。我自己用 pyautogui 跑 Figma 的时候，鼠标会被夺走，根本没法边跑边盯结果。

**CuaBot**，多 agent 的命令行沙箱，原生窗口渲染加 H.265 流。说真的我一开始没看懂为什么要做 H.265，后来反应过来，多 agent 同时跑桌面任务，传屏带宽是真问题。压一下码率才能在一台机器上同时看十个 agent 干活。

**Cua-Bench**，跑 OSWorld、ScreenSpot、Windows Arena 这些 benchmark 的评估框架，自动导出轨迹。这个对做 agent 训练的同学是刚需，你要复现论文，没有统一 benchmark 框架就只能靠手搓数据。

## 一个让我"卧槽"的设计

它有个细节，所有 agent 操作的轨迹都自动录制，可以重放，也可以直接当强化学习环境的训练数据。

你想想看，平时我们调 agent 失败了，回头复现 bug 要么靠日志要么靠截图，能拿到的信号非常稀疏。trycua 直接把每一帧的画面 + 每一次点击 + shell 输出全打包，相当于给 agent 装了行车记录仪。

这个东西做 RL 训练的人会哭出来。OpenAI 内部能用，是因为他们有大规模工程团队。开源世界里，这种"录制即数据集"的能力以前几乎没有。

## 它和你已经知道的那些东西什么关系

Anthropic 的 Computer Use 是一个闭源云服务，跑在他们自己的虚拟机里。OpenAI 的 Operator 也是云端付费产品。两条路都好用，但都是"你把任务交出去，他们替你跑"的模式。

trycua 走的是另一条路，把基础设施给你，agent 跑在你自己的机器上，模型用什么由你决定。文档里明确写了它"agent framework agnostic"，也就是你想接 Claude 的 SDK 就接 Claude，想接 DeepSeek、Qwen-VL 也行，想自己拿 OpenRouter 转一道也行。

我自己的判断是，这两条路并不冲突。要落地一个客户场景，你大概率会先用云服务做原型，验证完再迁到自托管降成本和保数据。trycua 给的就是后半段的路。

## 社区里在聊什么

GitHub Discussions 里我翻到几个反复出现的话题。

一类是"在 Apple Silicon 上跑 macOS 沙箱要多少 RAM"，trycua 用的是 lume，背后是 macOS 自己的 Virtualization.framework，最低配置 8GB 内存就能起一个，但实测体验良好的门槛是 16GB 以上。

另一类是"能不能跑微信、跑钉钉、跑国内 IM"，这块还在野生状态，社区有人在做，但官方没承诺。我个人估计今年下半年会有第三方 image 出现，毕竟需求摆在那。

还有一类是 Windows 沙箱的稳定性，相比 Linux 容器，Windows VM 启动慢、占资源，benchmark 跑起来要有耐心。

## 我会怎么用它

我接下来打算做的事，是用它跑一个"小红书数据采集 + 自动笔记发布"的 pipeline，纯本地。以前我用 selenium 做这种事，被风控搞得焦头烂额。换成真实桌面环境 + 真实鼠标轨迹，理论上检测难度会高很多。

如果你是做独立开发的，我建议先 `pip install cua`，跑通官方的 hello world 再说。Linux sandbox 起得最快，五分钟能看到第一个 agent 在沙箱里点鼠标。

如果你是做 agent 评估的，直接看 cua-bench 的接入方式，比自己拼 OSWorld 省一周时间。

如果你是做企业 RPA 替代方案的，认真看一下 driver 的后台运行能力，这是相对于 UIPath、Automation Anywhere 这类商业方案的关键差异点。

## 收尾

回到开头那个数字，单日 +182 星。这种增长曲线背后通常只说明一件事，社区憋了很久，等的就是这个。

我对 2026 年 agent 工具链的判断是，闭源云服务负责教育市场和拿大客户，开源基础设施负责让真正想动手的人能动手。trycua 是后者里目前完整度最高的一个。

剩下的问题留给你。你做 agent 这一年踩过最大的坑是什么，是模型幻觉，是工具调用不稳，还是没有一个像样的运行环境？欢迎评论区聊聊。

## 相关链接

- 仓库, https://github.com/trycua/cua
- Cua Sandbox 文档, https://github.com/trycua/cua/tree/main/libs/cua
- Lume macOS VM 工具, https://github.com/trycua/cua/tree/main/libs/lume
- OSWorld benchmark, https://github.com/xlang-ai/OSWorld

---
相关实体:: trycua
相关主题:: [[agent-frameworks|Agent框架]] | Computer-Use

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
