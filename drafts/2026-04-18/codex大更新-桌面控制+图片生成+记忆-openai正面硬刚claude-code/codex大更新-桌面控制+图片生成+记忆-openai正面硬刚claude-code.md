# Codex大更新，桌面控制+图片生成+记忆，OpenAI正面硬刚Claude Code

Codex突破300万周活还不到两周，OpenAI又扔了一颗炸弹。

这次不是加用量、不是调定价，是直接把Codex从一个"代码助手"升级成了"桌面全能Agent"。Computer use、图片生成、记忆系统、插件体系，四个大功能一次性拉满。macOS和Windows双平台同步更新。

作为一个Claude Code重度用户，我看到这个更新的第一反应是，Anthropic应该紧张了。

## Codex现在能干什么

先说最炸的功能，computer use。

Codex现在可以操控你桌面上的应用了。不是在终端里跑命令那种，是真的能打开Figma、操作浏览器、在Photoshop里改图。而且它在后台运行，不会打断你正在做的事。你可以同时开多个Agent并行干活。

那结果会怎样？想象一下，你让Codex改一段前端代码，它不仅能改，还能自己打开浏览器预览效果，发现样式不对再自己调。整个闭环不需要你介入。

OpenAI在博客里举了个例子，Codex能玩井字棋。听起来像个玩具demo，但你想想看，能玩棋意味着它能理解屏幕上的视觉信息、做决策、然后精确地点击对应的位置。这套能力迁移到开发流程里，就是一个能看懂UI的编程Agent。

再说图片生成。Codex现在内置了图片生成能力，开发者可以直接让它生成UI mockup、图标、甚至项目文档里的配图。以前你得在ChatGPT和Codex之间来回切换，现在一个窗口搞定。

记忆系统是第三个大更新。Codex会记住你之前的对话和偏好，跨会话保持上下文。你不用每次都重新解释项目背景、代码风格、偏好的技术栈。用得越多，它越懂你。

最后是插件体系。Codex开放了插件接口，第三方工具可以接入。这等于在说，我们要做AI编程领域的平台，不只是一个工具。

## 为什么说这是冲着Claude Code来的

坦率讲，这四个功能每一个都能在Anthropic的产品线里找到对标。

Computer use？Anthropic去年就发布了computer use API，Claude能操控桌面环境。但那个功能到现在还是以API形式存在，主要面向企业开发者。普通用户想体验，得自己搭环境。

Codex把同样的能力做进了桌面应用，开箱即用。

记忆？Claude Code的CLAUDE.md文件就是一种手动记忆机制，你把项目规范写进去，Claude会遵守。但说到底这是用户手动维护的。Codex的记忆是自动的，它自己学习你的习惯。

插件？Claude Code的MCP协议也是在做类似的事，让AI连接外部工具。但MCP目前主要在开发者社区里火，配置门槛不低。Codex的插件体系如果做得更傻瓜化，对非硬核用户的吸引力会大得多。

The Verge的报道标题直接用了"a direct shot at Claude Code"。OpenAI甚至不掩饰了。

## 但Claude Code用户别急着跳船

说完Codex的厉害，我得说说为什么我自己短期内不会换。

第一，Codex的computer use是全新功能，稳定性存疑。Anthropic的computer use已经迭代了大半年，踩过的坑比OpenAI多得多。早期版本大概率会有各种奇怪的bug，比如点错按钮、识别不了某些UI元素。

第二，编程能力本身。Claude 3.5 Sonnet在代码生成上的口碑是实打实的，社区里大量实测对比都显示Claude在复杂代码任务上的表现更稳。Codex背后跑的是GPT-5.4系列，能力确实强，但在编程这个垂直领域，两家差距没有OpenAI营销暗示的那么大。

第三，也是最重要的，Claude Code的杀手锏不是某个单点功能，而是它的工作流整合度。CLAUDE.md、MCP、子Agent并行，这套东西用顺了之后效率非常高。Codex现在是功能点多了，但工作流的打磨程度还需要时间。

我认为接下来半年会是AI编程工具最精彩的阶段。OpenAI在用"大而全"的策略追赶，Anthropic在用"深而稳"的策略防守。作为用户，你其实不用选边站。

## 真正值得关注的信号

这次更新里藏着一个更大的趋势，AI编程工具正在从"写代码"进化成"操控整个开发环境"。

以前的AI编程助手就是帮你补全代码、写函数、做review。现在Codex能操控桌面、生成图片、记住你的偏好、连接外部工具。Claude Code能通过MCP连数据库、跑测试、操作Git。

这些不是编程助手了，是数字员工。

反正我觉得，到今年底，"AI编程助手"这个品类会消失。取而代之的是"AI开发Agent"，一个能独立完成从需求分析到部署的全流程自治系统。Codex和Claude Code都在往这个方向跑，只是路线不同。

对于现在就想动手的人，我的建议很简单。如果你已经在用Claude Code，别换，继续深挖MCP和子Agent的玩法。如果你是ChatGPT Pro或$100 Pro用户，Codex的新功能值得花一个下午认真试试，尤其是computer use。

两边都试过的人，才有资格说哪个更好。

## 相关链接

- OpenAI官方博客 https://openai.com/index/codex-for-almost-everything
- The Verge报道 https://www.theverge.com/ai-artificial-intelligence/913034/openai-codex-updates-use-macos
- Codex产品页面 https://openai.com/index/codex/

---
相关实体:: [[openai|OpenAI]] | [[claude-code|Claude Code]] | [[codex|Codex]]
相关主题:: [[ai-coding-tools|AI编程工具]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
