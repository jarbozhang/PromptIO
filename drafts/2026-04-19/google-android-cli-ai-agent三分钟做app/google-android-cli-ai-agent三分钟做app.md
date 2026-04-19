# Google发布Android CLI,让AI Agent三分钟开发App

上周我让 Claude Code 帮我写一个 Android 计算器 app，光是配环境就折腾了四十分钟。SDK 版本不对、Gradle 同步失败、模拟器死活起不来。

这周 Google 发了 Android CLI，我又试了一遍。从零到模拟器上跑起来，不到十分钟。

## 这东西到底是什么

Android CLI 是 Google 专门为 AI Agent 设计的命令行工具。注意，不是给人用的，是给 Agent 用的。

它把 Android 开发里最痛苦的那些事，SDK 安装、项目创建、模拟器管理、应用部署，全部封装成了标准化的命令行接口。Agent 不需要理解 Gradle 构建系统的复杂性，直接调命令就行。

核心命令就几个,

```
android create          # 从模板创建项目
android emulator start  # 启动模拟器
android run --apks=xxx  # 部署应用
android docs search     # 搜索官方文档
```

但真正让我觉得有意思的是 `android skills add` 这个命令。它能给 Agent 安装"Android 技能包"，比如 edge-to-edge 适配、性能优化最佳实践。Agent 写代码时会自动参考这些技能，相当于给它装了一个"Android 高级工程师的经验库"。

还有 `android screen capture --annotate`，截屏的同时会在 UI 元素上标注编号，然后 Agent 可以用 `android screen resolve` 把编号转换成坐标。所以呢 Agent 不仅能写代码，还能"看到"界面并操作它。

## 为什么是现在

你可能会问，Android 的命令行工具不是一直都有吗？adb、sdkmanager、avdmanager 这些。

对，但那些工具是给人用的。

给人用的工具有个隐含假设，用户知道自己在干什么。你得知道 SDK 装在哪、build-tools 要哪个版本、system-image 选哪个架构。这些"常识"对人来说是经验积累，对 Agent 来说是不可预测的失败点。

Android CLI 的设计哲学完全不同。`android init` 一条命令搞定环境初始化，`android create` 自动选择合适的模板和 SDK 版本。Agent 不需要猜，每一步都是确定性的。

HN 上有个评论说得精准，"Systems understandable to LLMs usually benefit humans too." 为 Agent 设计的工具，往往对人也更友好。

## 社区里的真实反馈

这个项目在 HN 上拿了 310 points、137 条评论。社区反应很分裂。

一部分人很兴奋。有人说 Agent 终于能给我们带来"程序员要求了几十年的合理工具链"。逻辑是这样的，以前 Google 可以忽略开发者对 CLI 工具的抱怨，反正大家都用 Android Studio。但现在 Agent 需要 CLI，Google 就不得不认真做了。

另一部分人很不爽。"为什么我们不能先有好用的工具，再去讨好聊天机器人？"这种情绪我理解，说到底是对优先级的不满，Android 的工具链问题存在了十几年，Google 是被 Agent 的需求倒逼才动手的。

还有人关注隐私。Android CLI 默认会收集使用数据 (metrics)，虽然可以通过环境变量关掉，但默认开启这个选择确实让一部分开发者不舒服。

坦率讲，Windows 支持目前也有问题。有用户反馈安装脚本在 Windows 上编码有 bug，模拟器命令也被标记为"暂不可用"。如果你是 Windows 开发者，建议再等等。

## 我的判断

我认为 Android CLI 的意义不在于"让人更快开发 Android app"，而在于它是移动开发 Agent 化的基础设施。

想想看，Web 开发为什么是 AI coding 的主战场？因为整个工具链天然是 CLI 友好的。npm init、npm run dev、浏览器预览，Agent 每一步都能做。但移动开发不行，你得打开 IDE、点按钮、拖控件，Agent 根本插不上手。

Android CLI 把移动开发拉到了和 Web 开发同一条起跑线上。

当然，我也不觉得它现在就能替代 Android Studio。复杂应用的调试、性能分析、布局编辑器，这些 IDE 的核心价值 CLI 短期内替代不了。Google 自己也说了，Android CLI 创建的项目可以无缝导入 Android Studio 继续开发。

它更像是一个入口，降低了 Agent 进入移动开发的门槛。

可能有些想法还不成熟，但我觉得半年之内，我们会看到"用自然语言描述需求，Agent 自动生成可运行的 Android app"成为标配能力。不是 demo 级别的，是真能上架的那种。

## 怎么上手

如果你想试试，流程很简单,

1. 去 developer.android.com/tools/agents 下载 Android CLI
2. 运行 `android init` 初始化环境
3. `android create --output=./myapp` 创建项目
4. `android emulator create --profile=medium_phone` 创建模拟器
5. 构建完之后 `android run --apks=xxx.apk` 部署

配合 Claude Code 或 Gemini CLI 使用效果最好。跑 `android skills add --all` 把全部技能包装上，Agent 写出来的代码质量会明显提升。

回到开头的那个计算器 app，同样的任务，上周四十分钟搞环境，这周十分钟全搞定。省下来的三十分钟，够我再让 Agent 写三个 app 了。

移动开发的门槛，正在被 CLI 和 Agent 一起踩平。

## 相关链接

- Android CLI 官方文档，https://developer.android.com/tools/agents/android-cli
- Android CLI 下载页，https://developer.android.com/tools/agents
- HN 讨论帖，https://news.ycombinator.com/item?id=47797665

---
相关实体:: [[google|Google]]
相关主题:: [[ai-mobile-dev|AI移动开发]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
