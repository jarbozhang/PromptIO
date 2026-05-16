# Clawdmeter 把 Claude Code 用量做成桌面小挂件，openclaw 生态新成员

凌晨两点，我盯着自己第三块屏 👀

不是 IDE，也不是浏览器，是一块 2.16 寸的圆形 AMOLED，上面爬着一只像素 Clawd 小爪兽，背景的火焰条随着我每秒烧掉的 token 一寸寸往上窜。那是我刚装好的 Clawdmeter，一个开源 ESP32 桌面挂件，专门用来实时显示 Claude Code 的用量和限额。

5/14 TechCrunch 给它发了一篇专稿。我看完直接下单了 Waveshare 那块板，今天到货，焊都没焊就跑通了 ✨

## 一个 ESP32 + Claude，三天做出来的小东西

作者叫 Hermann Haraldsson，冰岛雷克雅未克的开发者。他自己在 README 里讲得很坦诚，不是嵌入式背景，整套硬件代码是用 Claude 在几天内调通的。

硬件就一块 Waveshare ESP32-S3-Touch-AMOLED-2.16，480x480 的 AMOLED 加电容触摸，USB-C 供电，可选一块 3.7V 锂电池让它真正离开线缆。蓝牙连笔记本，蓝牙这一段是关键。

它能干什么，我把按键一颗颗按了一遍。开机是像素 Clawd 动画，使用率越高动画越「狂躁」，到限额前会进入燃烧状态。中间那颗按钮循环切屏，依次是当前 5 小时窗口剩余、本周 weekly limit 剩余、按小时画的 burn-rate 曲线、还有蓝牙连接状态和重置。两颗侧键是快捷键，一颗切 Claude Code 的语音模式，一颗切 plan/edit/auto 模式。

GitHub 是 5/10 放出来的，到我写稿这天已经 1000+ star、50+ fork，r/ClaudeCode 那条原帖 1934 赞 90 评 🔥

## 工作原理，藏在 OAuth token 里

我最关心的其实是数据从哪儿来。Anthropic 没给开发者用量 API，所以工具们一直靠扒本地 session 日志算估值。

Clawdmeter 走的是另一条路。它在 macOS 上从 Keychain 的 `Claude Code-credentials` 服务里读 OAuth token，Linux 上从 `~/.claude/.credentials.json` 里读，然后用这个 token 对 Anthropic API 发最小化的请求，直接从响应头里抠 `anthropic-ratelimit-*` 这一组字段。剩余 tokens、5 小时窗口重置时间、weekly 配额，全在响应头里。

这条路准、稳，也敏感 ⚠️ 它要拿走你那张能直接消耗 Claude Code 配额的 token。daemon 跑在本地，token 不出网，但你心里得清楚这件事。我装的时候特地把 daemon 用户单独建了一个。

桌面到挂件之间是蓝牙。daemon 每 30 秒拉一次响应头，把几个关键数字打成一条 BLE 通知推给 ESP32。蓝牙这一段也意味着，挂件不需要 Wi-Fi 凭据，不需要单独的 API key，整个数据链路在你这台机器和这块板之间闭环。

## 我装它，从下单到亮屏 90 分钟

板子在闲鱼上找 Waveshare 现货 168 元包邮，加一根 USB-C 线就齐了 🛒

软件这一段比我想的简单。macOS 上 clone 仓库，跑 `./flash-mac.sh` 刷固件，系统设置里手动配对蓝牙，再跑 `./install-mac.sh`。第二个脚本会自动建 Python venv，注册一个 LaunchAgent，开机自启。Linux 是 `pio run -t upload` 刷固件，`bluetoothctl` 三连配对，`systemctl --user start claude-usage-daemon` 起服务。

我踩了一个坑。第一次配对失败，挂件屏幕停在初始动画。翻 issue 才发现 macOS 14 之后蓝牙 LE 配对要先在挂件上长按中键进 pairing mode。改完一次过。

跑起来之后的体感比我预期的强。眼睛余光始终能看到剩余条往下走，写代码时不自觉会停下来想「这个 prompt 真的值得烧 5% 的窗口吗」。有点像把驾驶座的油表搬到电脑桌，从被动收账单变成主动控速。

## 社区在讨论的几件事

r/ClaudeCode 那条原帖底下，几个声音值得拎出来。

呼声最高的一条是 mobcat_40 那句「At this point Anthropic should just mail these to us for free」（394 赞），调侃归调侃，反映的是社区对官方用量可视化的长期期待。

第二条 inter2 问作者，「做这块板有没有给你别的硬件想法？我对在工作流里散布这种低成本的小设备很感兴趣。」作者没正面回，但 fork 列表里已经冒出了 GeekMagic SmallTV PRO 版本、ESP-VoCat 1.2 圆屏版本。

还有一个上下文，5/13 Anthropic 官方宣布 Claude Code 的 weekly limit 提升 50%，持续到 7/13。新限额到底有多大、什么时候触顶，挂件直接给你画出来。

## openclaw 生态又多一个 clawd 前缀

5/12 openclaw 主仓库 star 数刚过 37.1 万。Clawdmeter 是第一个能算进 openclaw 周边的新工具，名字也直接用了 clawd 前缀，和 clawhub、clawdbot、moltbot 一脉相承。openclaw 之前主要是面向智能体调度和 prompt 编排，硬件层是空白。Clawdmeter 在硬件这一层补了一块 🐾

fork 已经在做穿戴版本和家庭场景版本，开源协议放在那儿，社区会自己往下推。

## 该不该装

我会装的人有两类。

一是 Claude Code 的 Max 用户，尤其是有「忘了关 /loop 烧了一笔」经历的，挂件是最直接的物理刹车。

二是想给自己工作台加一块可调式仪表盘的开发者，硬件 168 元，软件全开源，魔改一周能改出十几种皮肤。

不会装的人也清楚。一台机器只跑偶尔的 Claude Code 问答、不用 Max plan、对用量没焦虑的人，挂件大概率会变成第二天落灰的工位装饰。

那条 OAuth token 数据链路是我现在最在意的地方。Hermann 选了让它在本地闭环，没有云端中转，这是个好决定。

挂件还在烧着，我去关灯睡了 🌙

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
