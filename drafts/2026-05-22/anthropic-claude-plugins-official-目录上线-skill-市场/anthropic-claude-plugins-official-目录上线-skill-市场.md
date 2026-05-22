# Anthropic 官方 Claude Code Plugins 目录上线 半天 682 星 终于不用满 GitHub 找 skill

过去三个月，我装 Claude Code 的 skill 像在挖宝。

某个 awesome 列表里看到一个 frontend-design skill 评价不错，clone 下来试；X 上有人晒 PR 审查的 agent，截图里命令长得像那么回事，跑过去 star；翻 forrestchang/karpathy-skills 看 Karpathy 自己装了什么。每次都得自己判断，这玩意是真有用，还是某个写完丢着不维护的玩具。

这种"满 GitHub 找 skill"的日子，估计要结束了。

昨晚 anthropics 账号下悄悄出现了一个新仓库，叫 `claude-plugins-official`，描述就一句话，Official, Anthropic-managed directory of high quality Claude Code Plugins。半天涨了 682 星，到我写这段的时候已经是 22.4k star。Anthropic 自己开了个官方目录，Claude Code 的 App Store v0 算是落地了。

## 这个目录里到底装了什么

目录分两块，`/plugins` 是 Anthropic 内部团队开发维护的，`/external_plugins` 是合作伙伴和社区提交、走完 Anthropic 质量评审收录进来的。

`/plugins` 目前有 43 个，密度最高的是语言服务器接入。pyright-lsp、typescript-lsp、rust-analyzer-lsp、gopls-lsp、jdtls-lsp、kotlin-lsp、swift-lsp、ruby-lsp、php-lsp、clangd-lsp、csharp-lsp、lua-lsp，主流语言一次配齐。装上之后 Claude Code 直接跟 LSP 对话拿到类型信息，不再靠 grep 猜变量定义在哪。

剩下的偏工作流。代码审查那条线很完整，code-review、pr-review-toolkit、code-simplifier、code-modernization；提交相关有 commit-commands；文档管理有 claude-md-management 专门管你那个越写越乱的 CLAUDE.md。还有几个偏自我繁殖的，skill-creator 是用 Claude 写 skill 的元工具，plugin-dev 是写 plugin 的，mcp-server-dev 是写 MCP server 的。

`/external_plugins` 现在 15 个，全是你熟悉的第三方服务，context7、github、gitlab、linear、asana、firebase、terraform、playwright、serena、laravel-boost，还有几个聊天集成 discord、telegram、imessage。基本覆盖了一个全栈开发者一天会碰的服务。

安装就一行。

```
/plugin install frontend-design@claude-plugins-official
```

或者在 Claude Code 里敲 `/plugin > Discover` 用 UI 翻。

## 和 karpathy-skills、K-Dense 这些第三方仓库是什么关系

这事得讲清楚，不然容易误读。

第三方 skill 集合不会消失。forrestchang/karpathy-skills 收的是 Karpathy 个人风格的 skill，K-Dense 这类社区精选仓库收的是某个领域的偏好品味。这些仓库本来就不冲着"完备"去，冲的是"某个人/某个团队的 taste"。官方目录上线不影响它们。

变化的是默认入口。

以前一个新用户装完 Claude Code，第一个问题永远是"我应该装哪些 skill"。回答这个问题之前你得先扫一圈 awesome 列表、看几个 X 推文、问问群里的人。门槛不在于 skill 多难装，门槛在于"我怎么知道哪个 skill 值得装"。

现在 Anthropic 自己挂了个目录，标的是 high quality，且自己内部团队的 plugin 占了大头。新用户的默认动作就变成"先去 official 里挑常用的"，挑完不够再去第三方仓库找特色。这个顺序换了，就是从"自由市场"切到"App Store"的核心区别。App Store 模式下苹果自己审一遍这件事本身比"app 数量"更重要，因为它把信任责任转移了。

README 顶上 Anthropic 自己加了一行免责声明，原文是"Anthropic does not control the MCP servers, files, or other software contained in plugins"。翻译过来就是，我列在这儿不等于我担保。这跟苹果 App Store 是一致的，准入审核不等于功能背书。

## 挑三个我会立刻装的

43 个 plugin 没法每个都讲，挑三个我觉得新装机第一天就该上的。

**frontend-design**，作者是 Anthropic 的 Prithvi Rajasekaran 和 Alexander Bricken。它解决的问题不是"做出来一个能用的前端"，是"做出来一个不像 AI 生成的前端"。配套了一个叫 Frontend Aesthetics Cookbook 的指引，强调大胆的排版、配色、动效。我之前用裸 Claude Code 让它做 landing page，跑出来总是一股 v0 味，灰底蓝按钮居中布局。装上 frontend-design 之后能让它跑出有审美选择的版本。典型 prompt 像 "Create a dashboard for a music streaming app" 这种半句话就能起。

**pr-review-toolkit**，这是个 6 个 agent 的组合包。comment-analyzer 看注释是否准确，pr-test-analyzer 区分"行覆盖"和"行为覆盖"两种测试质量，silent-failure-hunter 专门挖那种 try-catch 吞错误的静默失败，type-design-analyzer 给你的类型设计打 1-10 分，code-reviewer 做常规审查，code-simplifier 帮你删冗余抽象。每个 agent 都给了触发短语，可以单独跑某一个，也可以串成一条 PR 流水线。这种"一个领域拆成 6 个专家"的设计就是 plugin 化能做、单 prompt 做不到的事。

**skill-creator**，这是我最看重的一个。它能创建新 skill、改现有 skill、跑 evals 做基准测试，甚至能做方差分析评 skill 性能。也就是说 Anthropic 自己把 skill 工程化的元工具开源出来了。之前我写 skill 全靠手感和 prompt 反复改，跑 evals 这步基本没做过，因为搭一套 evals 框架本身就要花一天。这个 plugin 把这套流程封进了一个 skill。

## 我的判断

国内 agent 平台到了该看这步的时候。

豆包 IDE、TRAE、通义灵码、Cursor 国内分发，都已经在拼"原生 agent 能力"，但 plugin 生态这块基本是空的。Cursor 的 rules 算是最早的 skill 雏形，但靠用户互相分享 .cursorrules 文件，本质还是"自由市场"。Claude Code 这次直接跳过了"先做出生态再考虑治理"的阶段，开局就把治理结构搭起来。

openclaw 这条线值得特别看一下。开源 agent 框架做生态扩展，最容易掉进的坑就是"PR merge 太快导致质量参差"或者"PR review 太严导致没人贡献"，两头都是死。Anthropic 这套 `/plugins` + `/external_plugins` 双轨结构是个解法，内部团队主力维护核心 plugin 兜底体验，外部提交走评审收进 external 区，两边都不强求对方的节奏。openclaw、clawhub 如果要做类似目录，这个分层值得直接抄。

更深一层，skill-creator 开源这件事的信号比目录上线本身更重，Anthropic 在把"造 skill"这件事的门槛主动推低，明显是想把生态的规模拉起来。这跟当年苹果开 Xcode 给开发者用是一个动作。

## 想试就三步

第一步，访问 github.com/anthropics/claude-plugins-official，README 里有完整安装命令。

第二步，挑一个跟你当前项目最相关的 plugin 先装。Python 写得多就装 pyright-lsp，做前端就装 frontend-design，做 PR 审查重的项目就装 pr-review-toolkit。

第三步，如果你已经手写过 skill，装一下 skill-creator，让它跑一遍 evals 看看你之前那批 skill 到底质量如何。我打赌结果会让你想重写一半。

满 GitHub 挖宝的日子结束了，剩下的问题是 Anthropic 自己挑的这批 plugin，跟你的口味合不合。

## 相关链接

- 官方目录仓库，https://github.com/anthropics/claude-plugins-official
- Claude Code Plugins 官方文档，https://code.claude.com/docs/en/plugins
- Frontend Aesthetics Cookbook，https://github.com/anthropics/claude-cookbooks/blob/main/coding/prompting_for_frontend_aesthetics.ipynb
- 第三方 skill 仓库参考，forrestchang/karpathy-skills、K-Dense

---
相关实体:: [[anthropic|Anthropic]] | [[claude-code|Claude Code]]
相关主题:: [[agent-frameworks|Agent 框架]] | [[developer-tools|开发者工具]] | [[ai-coding-tools|AI 编程工具]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
