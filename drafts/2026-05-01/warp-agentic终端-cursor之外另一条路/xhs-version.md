# Warp 一夜冲上 trending +3401 星，agentic 终端是 Cursor 之外的另一条路

Warp 昨天在 GitHub trending 一夜涨了 3401 颗星。

最反常识的地方是，这个仓库的 star 总数其实是 0。它不是开源项目，星全冲在 README 那一页，因为团队刚宣布要把 Rust UI 框架和部分客户端代码逐步开源，还没真开，社区先用 star 投了票。

我最近正好在用它替掉 iTerm，所以这一篇不打算讲新闻，我想讲清楚一件事，Warp 跟 Cursor 走了两条路，agent 这件事在终端层是另一种节奏。

## 我把日常 workflow 搬到 Warp 之后发现的几件事

我之前的动线很俗，VS Code 写代码，iTerm + tmux 跑命令，Claude Code 当 pair。把命令行那部分换成 Warp 之后，最先变化的不是"AI 帮我写命令"这种小聪明，而是终端这个东西的角色变了。

以前的终端是一条管道，我打字进去，stdout 喷出来，错了自己读 stack trace。Warp 把这条管道劫了一道，你打 `git rebase` 出错的时候，错误那块输出旁边直接挂一个 "Ask Agent" 按钮，点进去 agent 拿着完整 stderr 上下文回你方案。

终端是跟编辑器不一样的场域，你在这里干的活更"破坏性"，docker prune、kubectl delete、rm -rf，AI 介入的姿态必须更克制。Warp 的处理是，agent 给你建议命令，落到输入框，你按回车决定要不要执行。这种"一回合一确认"的边界，我觉得放在终端这边是合理的。

## Warp 和 Cursor 各自擅长的方向

Cursor 是 IDE-AI 路线，agent 工作在文件树和 diff 上，强项是大段代码生成、跨文件重构、读懂一个新代码库。Warp 是终端原生 agent 路线，agent 工作在命令、stdout、文件系统操作上，强项是运维类活儿，看日志、调 docker、处理 git 冲突、写脚本验证。

我前两天调一个 Postgres 慢查询，全程没碰编辑器，就在 Warp 里跟 agent 来回 explain analyze、看执行计划、改索引、再 explain。反过来我重构一个 React 组件库，agent 要同时改 12 个文件，那种"一条命令一回合"的节奏就不够用了，回 Cursor 更顺手。

我现在的实际用法是两个一起开。代码层 Cursor，运维和验证层 Warp。Claude Code 的 terminal 版本是第三个变量，跑在自己的 iTerm 里更轻、不绑账户，UI 反馈没有 Warp 直接，但灵活性高。

## 国内访问这一段我必须务实回答

第一，Warp 官网在国内能不能下载。能下，macOS / Linux / Windows 三平台安装包都从 warp.dev 直接拿。

第二，必须登录账号。Warp 不是"打开就能当 iTerm 用"的产品，所有档位（包括免费版）都要登录，邮箱注册即可。这是它跟 iTerm/Alacritty 的根本区别，Warp 的核心数据流要走它的服务端。

第三，模型怎么连。Warp 的 agent 默认是它代理调用 Claude / GPT / Gemini，免费版给 60 次/月（前两个月 150 次），订阅 Build 档 18 美元起，agent 调用 1500 次/月。Build 及以上才支持 BYOK，也就是你拿自己的 Anthropic / OpenAI key 替换。

这里有个国内用户必须注意的，BYOK 不能用来直接接 OpenRouter 这种聚合中转，文档里没明说支持，实测填的是各家原生 endpoint。如果你想用 OpenRouter 上的 key 跑 agent，目前路径不通。

第四，本地模型呢。Warp 文档明确写了支持 Fireworks AI 托管的开源权重（GLM / Kimi / Qwen 这一线），但**没有 Ollama / 本地模型**的接入选项。这一点对想完全离线用的人是劝退的。

## 还有几个坑值得提前知道

TUI 的限制是真实的。我习惯在 tmux 里开 4 个 pane 同时盯 server log、redis-cli、psql、应用本身，Warp 自己的 split pane 不如 tmux 灵活，AI 介入点又都在主输入框上，多 pane 的时候 agent 上下文容易乱。

第二个坑是它劫持了 shell 行为。Warp 自己实现了 prompt 渲染和命令块切分，部分 zsh 插件（改 PROMPT 的那批，比如早期 powerlevel10k）会显示异常。我的解法是在 Warp 里用一份 minimal 的 .zshrc，跟 iTerm 的配置分开。

第三个坑是 Oz，Warp 刚推的"云端并行 agent 编排"，宣传同时跑 N 个 agent 帮你改代码。我用了几次的判断是，目前更像营销层的概念，跟 GitHub Actions + Claude API 自己拼出来差距不大。早期别冲 Max 档（180 美元/月）。

## 我的结论

如果你做的活儿大部分时间在终端里，运维偏多、调 infra 偏多，Warp 值得装一个，免费档够跑通流程再决定付不付费。如果你大部分时间在写应用代码，Cursor 或 Claude Code 还是主力，Warp 是加分项。

终端这个东西安静了 30 年，VT100 那代规范定下来到现在，AI 这一波是第一次有人认真想"如果终端不只是一条管道"的问题。Cursor 在编辑器层做的事，Warp 在 shell 层做了一遍。两条路会不会合，看的不是工具，是你每天有多少时间花在 terminal 上。

我的时间是一半一半，所以两个都开。

## 相关链接

- Warp GitHub: github.com/warpdotdev/warp
- Warp 官网: warp.dev
- 价格档位: warp.dev/pricing

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
