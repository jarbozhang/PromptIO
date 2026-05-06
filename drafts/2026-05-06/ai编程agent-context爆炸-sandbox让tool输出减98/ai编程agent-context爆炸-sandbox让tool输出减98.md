# Claude Code 跑半天 200k context 烧光？我把 tool 输出关进沙盒，token 砍了 98%

我用 Claude Code 改一个中型仓库，让 agent 自己 grep 一下日志找最近的报错。一行命令的事，结果 access.log 那个文件 500 行被原封不动塞进 context，瞬间吃掉 45KB。

紧接着 agent 想看 git log 翻翻最近改了什么，153 条 commit 又是 11.6KB。再加上一次 Playwright 快照，56KB。

我盯着右下角那个 token 计数从 12% 飙到 47%，整个 session 才进行了不到 10 分钟，干的活相当于平时午休前热个身。

这不是 Claude Code 一家的问题。Cursor、通义灵码、腾讯 CodeBuddy、Trae 我都碰到过同样的事。**只要 agent 跑 tool，tool 输出就会无差别灌进 context，哪怕你只想要里面那一行**。

## 把 tool 输出关进沙盒，是另一种思路

GitHub 趋势榜上有个项目叫 context-mode，作者 mksglu，今天单日 +276 stars。它的描述就一句话，"Context window optimization for AI coding agents. Sandboxes tool output, 98% reduction. 14 platforms"。

我去翻了仓库，思路其实不复杂，但跟现在主流的"截断 + summary"路线不太一样。

主流做法是 tool 跑完 → LLM 自己看 → 太长就截断或摘要。问题是**截断之前那一坨数据已经进了 context**，token 该烧还是烧。

context-mode 的做法是开一个子进程跑 tool，stdout 整个被拦在外面，存到一个本地 SQLite FTS5 索引里。Agent 只拿到一个简短的元信息，"我跑完了，输出有 45KB，你想找什么我帮你查"。需要细节的时候 agent 再带着 intent 来检索，返回的是匹配片段不是全文。

坦率讲，这就是把"全量倾倒"改成了"按需读取"。Tool 输出不再是 context 的常住人口，而是放在外面的资料库。

## 实际能省多少

仓库里有一份 benchmark，我挑了几个开发者最常碰到的场景。

**500 行 access.log**，原始 45.1KB，压缩后 155 字节，节省 100%。这就是我开头那个场景，agent 只想找最近的 ERROR，不需要每一行都进 context。

**153 条 git commit**，原始 11.6KB，压缩后 107 字节，节省 99%。Agent 想搞清楚最近这周谁动了什么，根本不需要把每条 commit message 都背下来。

**20 条 GitHub Issues**，原始 58.9KB，压缩后 1.1KB，节省 98%。这个场景在做 issue triage 的时候特别常见。

**Playwright 一次快照**，原始 56.2KB，压缩后 299 字节，节省 99%。前端跑端到端测试踩过这个坑的应该知道，DOM tree 进 context 多吓人。

**整仓库的 research 模式**，986KB 压成 62KB，节省 94%。这是用 agent 做代码考古的场景，原本想都不敢想。

作者给了一个 session 级别的对比，315KB 原始输出最后变成 5.4KB，session 能从 30 分钟撑到 3 小时。这个数字我没复现，但量级合理。我自己估算了一下，如果按之前那个节奏烧 context，30 分钟撞限额完全正常。

## 怎么开始用

最容易上手的是 Claude Code。两条命令。

```
/plugin marketplace add mksglu/context-mode
/plugin install context-mode@context-mode
```

装完会多出几个工具，最核心的那个叫 `ctx_execute`。原本 agent 该跑 `bash` 的地方，改成调 `ctx_execute`，stdout 就被沙盒接住了。

其他平台稍微麻烦点，要先全局装一下。

```
npm install -g context-mode
```

然后按各自的 MCP 或插件协议配置。仓库里 14 个平台都列了具体步骤，包括 Cursor、Gemini CLI、VS Code Copilot、JetBrains Copilot、Codex CLI、Zed、KiloCode、OpenCode、Qwen Code、Antigravity、Kiro，以及 OpenClaw 和 Pi Coding Agent。我看到 OpenClaw 在列表里愣了一下，国产 agent 框架被一个 TypeScript 工具单独适配了，挺意外。

支持的子进程语言有 11 个，JavaScript、TypeScript、Python、Shell、Ruby、Go、Rust、PHP、Perl、R、Elixir。日常开发能碰到的基本都覆盖了。

## 这套方案的边界

我得说几个它解决不了的事，免得你装完发现期望对不上。

第一，它管不住 LLM 自己生成的长 token。你让 agent 写一篇长文档，输出还是会按部就班烧 context。这工具只管 tool 的 stdout。

第二，5KB 是一个阈值，输出小于 5KB 的命令不会触发索引，直接进 context。所以那种 "ls 一下" 的场景基本无感，省的不是这部分。

第三，需要 agent 主动用 `ctx_execute` 而不是直接 `bash`。Claude Code 装完插件 agent 会自己倾向用，但 Cursor 这类需要在 system prompt 里点一下，不然它该跑 raw shell 还是跑 raw shell。

我最近在 r/GithubCopilot 看到一个帖子讨论"怎么省 token"，下面有人提到另一个项目叫 RTK，思路类似但走的是 CLI 代理路线，过滤终端输出再喂给 agent。两条路线我觉得 sandbox 这条更彻底，CLI 代理还得维护一份过滤规则，rule 漏一个该烧的还是烧。

## 我的判断

我认为 context engineering 接下来一年会从"prompt 里塞什么"卷到"tool 输出怎么管"。

理由很简单。模型上下文窗口 200k 看着大，agent 跑两个小时就能把这点空间烧光。**真正稀缺的不是模型能不能记住，是 tool 输出值不值得进 context**。

之前社区一直在谈 RAG、谈记忆系统、谈 sub-agent 隔离。这些都对，但都是上层架构。底层那个"tool 跑完 stdout 一股脑倾倒"的默认行为没人动，是个空白地带。context-mode 这种思路不一定是最终形态，但它指出了问题所在。

如果你今天就用 Claude Code 跑 agent，这个插件值得装一下，两条命令的事，最差也就是不用。如果你在做自己的 coding agent 框架，可以考虑直接把这套思路吃进去，比让用户自己装外挂干净得多。

下次 agent 跑半天报 "context too long" 之前，先看看是不是 tool 输出在偷偷吃饭。

---

## 相关链接

- context-mode 仓库，https://github.com/mksglu/context-mode
- BENCHMARK.md（完整 21 个场景对比），仓库 README 内
- r/GithubCopilot 关于省 token 的讨论，https://www.reddit.com/r/GithubCopilot/comments/1sz85xf/

## Obsidian 关联

[[anthropic|Anthropic]] [[claude-code|Claude Code]] [[cursor|Cursor]]

主题，[[ai-coding-tools|AI 编程工具]] [[engineering-practice|工程实践]] [[context-engineering|Context 工程]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
<!-- xhs_pass: true -->
