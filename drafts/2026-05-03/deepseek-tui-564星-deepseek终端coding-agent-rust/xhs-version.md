# DeepSeek-TUI 一夜 564 星，给 DeepSeek 配了个 Rust 终端版 coding agent

我把 GitHub Trending 刷到一半的时候，看到一个叫 DeepSeek-TUI 的仓库一天涨了 564 颗星。

Rust 写的，作者 Hmbown，介绍只有一句话，"Coding agent for DeepSeek models that runs in your terminal"。

我立刻把仓库 clone 下来，跑了一遍。

## 它跟 Claude Code、kimi-cli 是同一种东西

先把定位说清楚。DeepSeek-TUI 不是聊天客户端，它是 coding agent，意思是它会读你当前目录的文件、改代码、跑命令、记上下文，跟 Claude Code、Cursor CLI、Moonshot 的 kimi-cli 是同一个赛道。

差别在三件事上。

第一，模型是 DeepSeek，不是 Claude，也不是 Kimi。你在 platform.deepseek.com 申请一个 API key 配进去就能跑，国内信用卡直接付，不需要绕弯。

第二，写法是 Rust，不是 TypeScript（Claude Code、kimi-cli 都是 Node 生态）。cargo install 完是一个静态二进制扔到 PATH，启动几乎瞬时，没有 Node 那种冷启停顿。

第三，TUI 而不是 GUI/IDE 插件。它跑在你的 tmux 里、跑在 ssh 远端服务器上、跑在笔记本的 alacritty 里都没区别，零依赖。

如果你之前是 Claude Code 用户，但 Claude API 在国内付费链路一直别扭，想换一个能直接刷国产 API 的同款体验，DeepSeek-TUI 就是冲着你来的。

## 我装它的过程

我在 macOS 上跑的，已经装过 Rust 工具链。流程就三步。

第一步，cargo install。几十秒拉依赖编译完，二进制扔到 `~/.cargo/bin/`。

第二步，配 DeepSeek 官方 API key。去 platform.deepseek.com 充了 10 块钱，生成一个 sk-xxx 开头的 key，扔进环境变量或者配置文件。

第三步，进项目目录启动。我随便挑了一个最近在重构的小 Python 项目，cd 进去，给它的第一个任务是"读这个目录的代码，告诉我哪个模块测试覆盖最差"。

它扫了一遍 `tests/` 和 `src/`，列了一个表，然后主动问我要不要它去补 utils.py 的测试。我说试试看。它写了 6 个 pytest case，跑了一遍，4 个过 2 个挂了，挂的两个它自己读了 stack trace、改了断言、再跑一遍过了。

整个过程我没动键盘。

体感上跟 Claude Code 几乎一致，差别只在模型推理那一两秒的延迟。DeepSeek 官方 API 在国内访问几乎没有延迟，比我用 Claude API 经常 RTT 一两秒要顺。

## 这个赛道挤得超出我预期

我把今年到现在见过的"终端 coding agent"列了一遍。

Claude Code（Anthropic 官方，TypeScript），kimi-cli（Moonshot，TypeScript），Aider（Python 老牌，迭代了很多版），OpenCode（社区项目），还有今天的 DeepSeek-TUI。

Reddit 上有人把六个 CLI 类 agent 撸了一遍，得出"差距比想的小，harness 跟模型一样重要"这种结论。用 Opus 4.7、DeepSeek V4 Flash、本地 Qwen3.6 27B 三种模型分别接 agent，harness 层的差异直接影响体验。

意思已经很明确，模型层卷完之后，下一波卷的是 harness 层。同一个 DeepSeek 模型，接不同的 agent harness 是不同的体感。模型再强，harness 拉胯也没用；模型不那么顶尖，harness 做精了照样能干活。

DeepSeek-TUI 一天 564 星，就是这个判断在市场上的体现。DeepSeek 模型这一年已经被国内开发者认可了，但官方一直没出"自己家的 Claude Code"，社区等不及了，自己用 Rust 撸了一个。

## 我的判断

DeepSeek-TUI 这种项目我看好，但不是因为它技术上多惊艳。Rust TUI agent 实现一个 demo 难度不算高，难的是长期维护、prompt 工程的精调、跟着 DeepSeek 模型 rev 跟进。

我看好它的逻辑是，它跑在合规路径上，用的是 DeepSeek 官方付费 API，DeepSeek 对它没有任何敌意，作者完全不用担心哪天后端变了项目就废了。这种"和官方协同的开源工具"才是能长出生态的。

反过来说，DeepSeek 官方应该认真考虑自己出一个"DeepSeek Code"，把这种社区项目收编进官方支持。Anthropic 出 Claude Code 之后整个 Anthropic 生态被一个工具拉起来一大波热度，DeepSeek 没有理由把这块阵地让给社区。

我的预测是半年内 DeepSeek 官方会出对应的 CLI agent。在那之前，DeepSeek-TUI 这类社区项目会先把生态填满。

## 你现在能做什么

如果你已经在用 Claude Code 但充值 Claude API 一直觉得别扭，今天就可以试。

去 platform.deepseek.com 充 10 块，生成一个 API key，cargo install DeepSeek-TUI，配上 key，cd 到一个你最近想重构的小项目，让它扫一遍。半小时内你能判断出它合不合你的胃口。

如果你之前没用过任何 coding agent，DeepSeek-TUI 是一个低成本入口，不用申请 Claude API，不用付美元。建议你先看一遍 Aider 或者 Claude Code 的视频教程，理解 agent 是怎么工作的，再上手体验会顺得多。

仓库今天就在 GitHub Trending 第一屏，现在去 star，半个月之后 issue 区会告诉你这个项目是真要起来了，还是只是又一个一夜成名的烟花。

我已经把它装上了。

---

相关链接

- DeepSeek-TUI 仓库, https://github.com/Hmbown/DeepSeek-TUI
- DeepSeek 官方 API（合规付费链路）, https://platform.deepseek.com
- Claude Code（同赛道参照系）, https://www.anthropic.com/claude-code

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
