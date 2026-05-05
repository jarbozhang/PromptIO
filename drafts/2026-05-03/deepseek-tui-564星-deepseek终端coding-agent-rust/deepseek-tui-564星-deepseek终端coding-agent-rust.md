# DeepSeek-TUI 一夜 564 星，给 DeepSeek 配了个 Rust 终端版的 Claude Code

我把 GitHub Trending 刷到一半的时候，看到一个叫 DeepSeek-TUI 的仓库一天涨了 564 颗星。

Rust 写的，作者 Hmbown，介绍只有一句话，"Coding agent for DeepSeek models that runs in your terminal"。

我愣了一下，三天前我刚写过 ds2api，那是个把 DeepSeek 网页协议反向成 OpenAI/Claude API 的 Go 中间件。今天又冒出来一个直接用 Rust 给 DeepSeek 做 TUI agent 的项目。短短三天，DeepSeek 这条线已经有了两种完全不同的"野生"接入方式。

我立刻把仓库 clone 下来，跑了一遍。

## 它跟 Claude Code、kimi-cli 是同一种东西

先把定位说清楚。DeepSeek-TUI 不是一个聊天客户端，不是给你在终端里 ChatGPT 那种界面用的。它是 coding agent，意思是它会读你当前目录的文件、改代码、跑命令、记上下文，跟 Claude Code、Cursor CLI、Moonshot 的 kimi-cli 是同一个赛道。

差别在三件事上。

第一，模型是 DeepSeek，不是 Claude，也不是 Kimi。你在 platform.deepseek.com 申请一个 API key 配进去就能跑，国内信用卡直接付，不需要绕弯。

第二，写法是 Rust，不是 TypeScript（Claude Code、kimi-cli 都是 Node 生态）。装它的体感是，cargo install 完一个静态二进制扔到 PATH，启动时间几乎瞬时，没有 Node 那种几秒冷启。

第三，TUI 而不是 GUI/IDE 插件。它跑在你的 tmux 里、跑在 ssh 远端服务器上、跑在你笔记本的 alacritty 里都没区别，零依赖。

所以读到这里，如果你对应到自己的栈大概是这样，你之前是 Claude Code 的用户，但 Claude API 在国内付费链路一直别扭，你想换一个能直接刷国产 API 的同款体验，DeepSeek-TUI 就是冲着你来的。

## 我装它的过程

我在 macOS 上跑的，已经装过 Rust 工具链。流程就三步。

第一步，cargo install。仓库支持直接通过 cargo 安装，几十秒拉依赖编译完，二进制扔到 `~/.cargo/bin/` 下面。

第二步，配 DeepSeek API key。我去 platform.deepseek.com 充了 10 块钱（够跑很久），生成一个 sk-xxx 开头的 key，扔进环境变量或者配置文件。

第三步，进项目目录跑一条命令把它接到 git 仓库里。我随便挑了一个最近在重构的小 Python 项目，cd 进去，启动 DeepSeek-TUI，给它的第一个任务是"读这个目录的代码，告诉我哪个模块测试覆盖最差"。

它的反应是先扫了一遍 `tests/` 和 `src/`，列了一个表，然后主动问我要不要它去补 utils.py 那个文件的测试。我说试试看。它写了 6 个 pytest case，跑了一遍，4 个过 2 个挂了，挂的两个它自己读了 stack trace、改了断言、再跑一遍过了。

整个过程我没动键盘。

体感上跟 Claude Code 几乎一致，差别只在模型推理那一两秒的延迟，DeepSeek 的官方 API 在国内访问几乎没有延迟，比我用 Claude API 经常 RTT 一两秒要顺。

## 跟 ds2api 是两条完全不同的路

我必须把这两个项目放一起讲，不然你会搞混。

ds2api 是中间件思路。它做的是"把 DeepSeek 网页版那个免费入口逆向成 OpenAI 协议，让你的 Cursor / Cline / Claude Code 以为自己连的是付费 API，实际后面在帮你的浏览器打字"。它解决的是省钱问题，账号轮转、协议转换、零 token 费。但代价是合规灰区，账号会被封，跟着 DeepSeek 网页改版疲于打补丁。

DeepSeek-TUI 是直连思路。它做的是"用 DeepSeek 官方付费 API，做一个独立的 Rust TUI agent"。它解决的是体验问题，没有 IDE 依赖、跨平台、终端原生。代价是要付 token 费，DeepSeek 的 deepseek-chat 现在大概是每百万 token 几块钱的量级，跑 agent 一次任务几毛钱。

你怎么选？

如果你是个人开发者，预算敏感，愿意承担账号被封的风险，并且只在本地小项目跑，ds2api 是性价比之选。

如果你愿意每月给 agent 工具花一两百块，更在乎稳定性、合规性和"作者不会被 DeepSeek 风控搞崩"，DeepSeek-TUI 是工程上更干净的选择。

如果你已经习惯 IDE 集成（VS Code 插件、Cursor），那这两个都不是给你的，你应该继续用 Cline + DeepSeek 官方 API，或者继续等 Cursor 加个 DeepSeek tier。

我自己的取舍是这样，**白嫖玩具用 ds2api，长期工具链用 DeepSeek-TUI**。两个都装，根据当下心情切。

## 这个赛道挤得超出我预期

我把今年到现在见过的"终端 coding agent"列了一遍。

Claude Code（Anthropic 官方，TypeScript），kimi-cli（Moonshot，TypeScript），CCMeter（社区，Rust，但只是 Claude Code 的 stats dashboard 不是 agent），Aider（更早的 Python 老牌，已经迭代很多版），OpenCode（社区项目），还有今天的 DeepSeek-TUI。

Reddit 上 r/WebAfterAI 几天前还有人发了一个长帖，把六个 CLI 类 agent 撸了一遍说"会改变你写代码的方式"。Reddit 评论区也有人在用 Opus 4.7、DeepSeek V4 Flash、本地 Qwen3.6 27B 三种模型分别接 agent，得出"差距比想的小，harness 跟模型一样重要"这种结论。

意思已经很明确，**模型层卷完之后，下一波卷的是 harness 层**，同一个 DeepSeek 模型，接 Cline 是一种体感，接 ds2api 是一种体感，接 DeepSeek-TUI 是另一种体感。模型再强，harness 拉胯也没用；模型不那么顶尖，harness 做精了照样能干活。

DeepSeek-TUI 一天 564 星，本质就是这个判断在市场上的体现。DeepSeek 模型这一年已经被国内开发者认可了，但官方一直没出"自己家的 Claude Code"。社区等不及了，自己用 Rust 撸了一个。

## 我的判断

DeepSeek-TUI 这种项目我看好，但不是因为它技术上多惊艳。Rust TUI agent 实现一个 demo 难度不算高，难的是长期维护、prompt 工程的精调、跟着 DeepSeek 模型 rev 跟进。

我看好它的逻辑是，它跑在合规路径上，DeepSeek 官方 API 对它没有任何敌意，作者完全不用担心哪天网页改版项目就废了。这种"和官方协同的开源工具"才是能长出生态的。

反过来说，DeepSeek 官方应该认真考虑自己出一个"DeepSeek Code"，把这种社区项目收编进官方支持。Anthropic 出 Claude Code 之后整个 Anthropic 生态被 Claude Code 一个工具拉起来一大波热度，DeepSeek 没有理由把这块阵地让给社区。

我的预测是半年内 DeepSeek 官方会出对应的 CLI agent。在那之前，DeepSeek-TUI 这类社区项目会先把生态填满。

## 你现在能做什么

如果你已经在用 Claude Code 但充值 Claude API 一直觉得别扭，今天就可以试。cargo install DeepSeek-TUI，去 platform.deepseek.com 充 10 块，配上 key，cd 到一个你最近想重构的小项目，让它扫一遍。半小时内你能判断出它合不合你的胃口。

如果你之前没用过任何 coding agent，DeepSeek-TUI 是一个低成本入口，不用申请 Claude API，不用绕弯，不用付美元。但我建议你先看一遍 Aider 或者 Claude Code 的视频教程，理解 agent 是怎么工作的，再上手 DeepSeek-TUI 体验会顺得多。

如果你已经在跑 ds2api，**两个一起装**。把 DeepSeek-TUI 接 ds2api 的本地 5001 端点也是可以的，相当于拿白嫖账号驱动一个 Rust TUI agent，体验拉满到接近免费。但风险叠加，封号概率翻倍，自己掂量。

仓库今天就在 GitHub Trending 第一屏，现在去 star，半个月之后 issue 区会告诉你这个项目是真要起来了，还是只是又一个一夜成名的烟花。

我已经把它装上了。

---

相关链接

- DeepSeek-TUI 仓库, https://github.com/Hmbown/DeepSeek-TUI
- DeepSeek 官方 API（合规付费链路）, https://platform.deepseek.com
- ds2api（中间件方案对比）, https://github.com/CJackHwang/ds2api
- Claude Code（同赛道参照系）, https://www.anthropic.com/claude-code

---
相关实体:: [[deepseek]] | [[anthropic]] | [[claude-code]] | [[moonshot]]
相关主题:: [[ai-coding-tools]] | [[国产-ai]] | [[edge-ai]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
