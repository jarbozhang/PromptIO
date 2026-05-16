# Clawdmeter 把 Claude Code 用量做成桌面小挂件 openclaw 生态又冒新成员

凌晨两点，我盯着自己第三块屏。

不是 IDE，也不是浏览器，是一块 2.16 寸的圆形 AMOLED，上面爬着一只像素 Clawd 小爪兽，背景的火焰条随着我每秒烧掉的 token 一寸寸往上窜。那是我刚装好的 Clawdmeter，一个开源 ESP32 桌面挂件，专门用来实时显示 Claude Code 的用量和限额。

5/14 TechCrunch 给它发了一篇专稿。我看完直接下单了 Waveshare 那块板，今天到货，焊都没焊就跑通了。这篇说说我装它、用它、和这只小东西作为 openclaw 生态新成员的位置感。

## 一个 ESP32 + Claude，三天做出来的小东西

作者叫 Hermann Haraldsson，冰岛雷克雅未克的开发者。他自己在 README 里讲得很坦诚，不是嵌入式背景，整套硬件代码是用 Claude 在几天内调通的。

硬件就一块 Waveshare ESP32-S3-Touch-AMOLED-2.16，480x480 的 AMOLED 加电容触摸，USB-C 供电，可选一块 3.7V 锂电池让它真正离开线缆。蓝牙连笔记本，蓝牙这一段是关键，等会儿讲。

它能干什么，我把按键一颗颗按了一遍。开机是像素 Clawd 动画，使用率越高动画越"狂躁"，到限额前会进入燃烧状态。中间那颗按钮循环切屏，依次是当前 5 小时窗口剩余、本周 weekly limit 剩余、按小时画的 burn-rate 曲线、还有蓝牙连接状态和重置。两颗侧键是快捷键，一颗切 Claude Code 的语音模式，一颗切 plan/edit/auto 模式。

GitHub 是 5/10 放出来的，到我写稿这天已经 1000+ star、50+ fork，r/ClaudeCode 那条原帖 1934 赞 90 评。增长速度比绝大多数 dev tool 都凶。

## 工作原理，藏在 OAuth token 里

我最关心的其实是数据从哪儿来。Anthropic 没给开发者用量 API，ccusage 这种工具一直靠扒本地 session 日志算估值，误差能到 15%。

Clawdmeter 走的是另一条路。它在 macOS 上从 Keychain 的 `Claude Code-credentials` 服务里读 OAuth token，Linux 上从 `~/.claude/.credentials.json` 里读，然后用这个 token 对 Anthropic API 发最小化的请求，直接从响应头里抠 `anthropic-ratelimit-*` 这一组字段。剩余 tokens、5 小时窗口重置时间、weekly 配额，全在响应头里。

这条路准、稳，也敏感。它要拿走你那张能直接消耗 Claude Code 配额的 token。daemon 跑在本地，token 不出网，但你心里得清楚这件事。我装的时候特地把 daemon 用户单独建了一个，bluetoothd 权限单走，省得手贱跑别的脚本误用。

桌面到挂件之间是蓝牙。daemon 每 30 秒拉一次响应头，把几个关键数字打成一条 BLE 通知推给 ESP32。蓝牙这一段也意味着，挂件不需要 Wi-Fi 凭据，不需要单独的 API key，整个数据链路在你这台机器和这块板之间闭环。

## 我装它，从下单到亮屏 90 分钟

板子在闲鱼上找 Waveshare 现货 168 元包邮，加一根 USB-C 线就齐了。如果你像我一样懒得焊电池，纯线供电也能跑，挂在显示器边上做副屏完全够用。

软件这一段比我想的简单。macOS 上 clone 仓库，跑 `./flash-mac.sh` 刷固件，系统设置里手动配对蓝牙，再跑 `./install-mac.sh`。第二个脚本会自动建 Python venv，注册一个 LaunchAgent，开机自启。Linux 是 `pio run -t upload` 刷固件，`bluetoothctl` 三连配对，`systemctl --user start claude-usage-daemon` 起服务。

我踩了一个坑。第一次配对失败，挂件屏幕停在初始动画。翻 issue 才发现 macOS 14 之后蓝牙 LE 配对要先在挂件上长按中键进 pairing mode，README 里这一步藏在最后一节。改完一次过。

跑起来之后的体感比我预期的强。眼睛余光始终能看到剩余条往下走，写代码时不自觉会停下来想"这个 prompt 真的值得烧 5% 的窗口吗"。有点像把驾驶座的油表搬到电脑桌，从被动收账单变成主动控速。

## 社区在认真讨论的几件事

r/ClaudeCode 那条原帖底下，几个声音值得拎出来。

呼声最高的一条是 mobcat_40 那句"At this point Anthropic should just mail these to us for free"（拿到 394 赞），调侃归调侃，反映的是社区对官方用量可视化的长期不满。Pro 和 Max 用户都在猜限额，Anthropic 给的反馈是发邮件告诉你用完了。

第二条 inter2 问作者，"做这块板有没有给你别的硬件想法？我对在工作流里散布这种低成本的小设备很感兴趣。"作者没正面回，但 fork 列表里已经冒出了 GeekMagic SmallTV PRO 版本、ESP-VoCat 1.2 圆屏版本、甚至 Wear OS 表盘版本。它正在从一个工具变成一个"用量监视器"硬件协议。

第三条是 drhappy13 那个无奈笑话，"lol, I don't need more Claude usage anxiety 😂"。这条 10 赞，但是很多人心里的话。挂件让用量可视化的同时，也把焦虑可视化了。这一点和 5/12 r/ClaudeAI 那条 1275 赞的 "I accidentally burned ~$6000 of Claude usage overnight" 帖子是一根藤上的，社区一边骂 limit 一边离不开 Claude Code，挂件是这个矛盾的物化。

还有一个上下文，5/13 Anthropic 官方宣布 Claude Code 的 weekly limit 提升 50%，持续到 7/13，叠加之前 5 小时窗口的 2 倍扩容。Clawdmeter 刚好赶在限额扩容的当口出来，新限额到底有多大、什么时候触顶，挂件直接给你画出来。

## openclaw 生态又多一个 clawd 前缀

我现在更想说的是它在 openclaw 生态里的位置。

5/12 openclaw 主仓库 star 数刚过 37.1 万，那条线我们之前覆盖过。从那之后，Clawdmeter 是第一个能算进 openclaw 周边的新工具，名字也直接用了 clawd 前缀，和 clawhub、clawdbot、moltbot 一脉相承。openclaw 之前主要是面向智能体调度和 prompt 编排，硬件层是空白。Clawdmeter 在硬件这一层补了一块。

它甚至可能不是终点。fork 已经在做穿戴版本和家庭场景版本，开源协议放在那儿，社区会自己往下推。如果 openclaw 生态真要从软件向"开发者桌面装置"延伸，这只挂件就是第一个具象产物。我倾向于盯着这条 clawd 前缀的命名空间，下一个冒出来的工具大概率还在这条线上。

## 该不该装

我会装的人有两类。

一是 Claude Code 的 Max 用户，尤其是有那种"忘了关 /loop 烧了几百美元"经历的，挂件是最直接的物理刹车。

二是想给自己工作台加一块可调式仪表盘的开发者，硬件 168 元，软件全开源，魔改一周能改出十几种皮肤。

不会装的人也清楚。一台机器只跑偶尔的 Claude Code 问答、不用 Max plan、对用量没焦虑的人，挂件大概率会变成第二天落灰的工位装饰。

它不取代 ccusage 那种命令行工具，命令行该装还得装，CI 里需要的是文本数字。挂件是另一种交互形态，从"我去查"变成"它一直在那儿"，差别就这一点。

那条 OAuth token 数据链路是我现在最在意的地方。Hermann 选了让它在本地闭环，没有云端中转，这是个好决定。哪天有人 fork 出云端版本、把 token 往自己服务器送，下一句话就该是退出去。

挂件还在烧着，我去关灯睡了。

## 相关链接

- Clawdmeter GitHub: https://github.com/HermannBjorgvin/Clawdmeter
- TechCrunch 报道: https://techcrunch.com/2026/05/14/clawdmeter-turns-your-claude-code-usage-stats-into-a-tiny-desktop-dashboard/
- Reddit 原帖讨论: https://www.reddit.com/r/ClaudeCode/comments/1takxpl/clawdmeter_a_small_esp32_usage_limit_monitor/
- Waveshare ESP32-S3-Touch-AMOLED-2.16 产品页: https://www.waveshare.com/esp32-s3-touch-amoled-2.16.htm
- Anthropic Claude Code 文档: https://docs.anthropic.com/en/docs/claude-code

---
相关实体:: [[clawdmeter|Clawdmeter]] | [[anthropic|Anthropic]] | [[claude-code|Claude Code]] | [[openclaw-org|openclaw]]
相关主题:: [[openclaw-ecosystem|openclaw 生态]] | [[ai-coding-tools|AI 编程工具]] | [[ai-pricing|AI 定价]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
