# DeepClaude 一夜 657 HN 热度，我把 Claude Code 的脑子换成了 DeepSeek V4 Pro

周末刷 HN，看到一个叫 deepclaude 的项目飘到了 657 分、275 条评论。

我点进去看仓库描述，一句话，"Claude Code agent loop with DeepSeek V4 Pro"。

第一反应是不屑。两天前我刚写过 DeepSeek-TUI，那是 Rust 重写的独立 coding agent。今天又来一个挂 DeepSeek 的项目，怎么 HN 还能给到 657 分。

仓库 clone 下来跑了一遍，我才意识到这俩根本不是一个东西。DeepSeek-TUI 是另起炉灶，自己写一个 agent loop。DeepClaude 不写 agent，它做的是一个 wrapper，让 Claude Code 这个 CLI 本身的 agent loop 不变，把里面发出去的 API 请求改路由到 DeepSeek。

说人话，[[claude-code|Claude Code]] 的壳子还在，子 agent、tool 调用、session 管理、todo list 全都是 [[anthropic|Anthropic]] 那一套，但每次调模型实际跑的是 [[deepseek|DeepSeek]] V4 Pro。

## 为什么这事 HN 给 657 分

先把账算清楚。Claude Sonnet 4.6 的官方价是 input $3/M、output $15/M。DeepSeek V4 Pro 当前价 input $0.44/M、output $0.87/M（注意，这是 5 月 31 日前的折扣价，之后涨到 $3.48）。

光看 output token，差 17 倍。

我自己装 Claude Code 月稳定 200 美金的 Max 套餐都偶尔顶到 5 小时窗口上限。换成 DeepClaude 走 DeepSeek API，按仓库给的估算，每天用一个全工作日强度大概 $1.5～2，一个月 25 个工作日 $50 上下，比 $200 Max 便宜 75%。如果只是有一搭没一搭用，每月 10 天，那就直接降到 $20。

这是国内开发者第一次有一条不绕弯的"白嫖 Claude Code 工作流"路径。DeepSeek 国内信用卡能直接付，不用国际卡、不用代充、不用任何境外服务前端。

## DeepClaude 到底转了什么

我把 deepclaude.sh 这个脚本拆开看了一遍，发现它做的事情其实极简单。

它就是设三个环境变量。

```
ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic"
ANTHROPIC_AUTH_TOKEN="sk-你的-deepseek-key"
ANTHROPIC_DEFAULT_OPUS_MODEL="deepseek-v4-pro"
ANTHROPIC_DEFAULT_SONNET_MODEL="deepseek-v4-flash"
```

然后在这个环境里 exec 一下 claude 命令。结束。

Claude Code 的客户端原本默认请求 Anthropic 的 API，看到这几个 ENV 就会把请求打到 DeepSeek 那个 anthropic-compatible 端点上。DeepSeek 自己实现了 Anthropic 协议（Messages API、tool calling 那一套），所以 Claude Code 这边完全感知不到对面已经换了模型。

HN 评论区有个高赞回复就是冲着这点来的，"这不就是改个 ENV 变量？为啥要专门做个 GitHub repo？"

我承认这质疑很合理。但 DeepClaude 加了三件让懒人受用的小事，第一是 backend 切换（`--backend ds|or|fw|anthropic`），DeepSeek、OpenRouter、Fireworks、原生 Anthropic 之间一个 flag 切；第二是它把 ENV 限定在子进程里，不污染你 shell 的全局环境；第三是它把 DeepSeek 不支持的特性（vision、MCP、Anthropic 自家 prompt cache）提前 fallback 处理掉，不会让你用着用着突然报错。

对我来说，省下来的不是装机的那 5 分钟，是后续每次想"换回 Sonnet 跑一下复杂任务"时的心智成本。

## 跟 5 月 3 日写过的 DeepSeek-TUI 是两条路

如果你两天前看过我写的 [[deepseek-tui|DeepSeek-TUI]]，这俩很容易搞混，我必须把差异写清楚。

DeepSeek-TUI 是从零写的新 agent，Rust 实现，自己定义 tool schema、自己跑 agent loop、自己管 session。优点是没有 Node 启动延迟、二进制级响应；缺点是它的 agent loop 设计还很年轻，跟 Claude Code 三年迭代下来那一套子 agent / hook / skill 体系比，差得远。

DeepClaude 反过来。它一行 agent 代码都没写，就是把 Claude Code 这个产品级别的 agent loop 借过来用，只换底层模型。优点是 Claude Code 所有的 ergonomics 你白嫖（包括最近加的 skill 路由、subagent、todo 同步），缺点是你被绑死在 Anthropic 协议上，DeepSeek 实现里有 bug 你只能等。

简单说，要 agent 体验最好，DeepClaude；要二进制最干净、终端最快，DeepSeek-TUI。两个项目其实在同一个判断上，[[deepseek|DeepSeek]] V4 Pro 这一代的 tool calling 已经能撑住 agent loop。

## 实测下来的几个坑

我跑了大概一个工作日，主要写一个中等复杂度的 Node 脚本（解析 RSS、跨多文件 grep、写测试）。

省钱是真的，整天下来 DeepSeek 后台显示花了不到 0.5 美金。同样工作量我之前 Sonnet 4.6 大概要 3～5 美金。

质量上，HN 和 Reddit 那边的共识是"80% 的活儿跟 Sonnet 4.6 没差别，复杂推理 20% Sonnet 还是稳一点"，我自己跑下来体感一致。日常的 read-grep-edit 三件套，DeepSeek V4 Pro 完全顶得住，我看不出来谁写的。但涉及"多步规划+回退+重新规划"这种长链路，DeepSeek 偶尔会卡在某一步重复试同一个工具调用。

并行 tool call 不支持，Claude Code 默认会并发跑 3 个 read，DeepClaude 这边自动降级成串行，跑得稍慢，体感不影响。

MCP server 这条线整个不能用。我自己的 workflow 重度依赖几个 MCP（context7 查文档、bird 抓 X），换到 DeepClaude 这边它们直接失效。这是 deal breaker 还是无所谓，看你自己的栈。

还有一个隐性坑，DeepSeek 隐私政策明确写了会用 API 请求训练模型。如果你写的是商业项目代码、还在签 NDA 的客户代码，这条要慎重。

## 给国内开发者的最小可执行路径

我把流程压到三步。

第一步，去 platform.deepseek.com 注册，国内手机号、支付宝充值都行，拿一个 sk-xxx 的 API key。账户先充 10 块钱跑两天试试水。

第二步，clone 仓库。`git clone https://github.com/aattaran/deepclaude.git`，macOS/Linux 跑 chmod +x 后 ln -s 到 /usr/local/bin。export `DEEPSEEK_API_KEY=sk-xxx`。

第三步，在你已经装了 Claude Code 的项目目录下，把 `claude` 换成 `deepclaude` 启动。其它一切照旧。想切回 Sonnet，加 `--backend anthropic`。

如果你嫌 wrapper 脚本麻烦，DeepSeek 官方文档（api-docs.deepseek.com 那个 agent_integrations/claude_code 页）也写了直接配 settings.local.json 的法子，效果一样，少一层 shim。

## 我的判断

这个项目本身是个三百行 shell 脚本的小工具，但它捕捉到的是一个真正的转折点。

[[deepseek|DeepSeek]] 这一代主动实现 Anthropic 协议、价格压到 1/17、agent loop 实测能跑通，所以呢 [[claude-code|Claude Code]] 作为产品和 [[anthropic|Anthropic]] 作为模型供应商，第一次被解耦了。Claude Code 的体验设计开始有了"换底盘"的可能。

下一步会有人做更激进的事情。比如 planning 用 Sonnet、execution 用 DeepSeek，HN 评论里已经有人在跑这种组合，省钱不输给纯 DeepSeek，质量比纯 DeepSeek 还稳。这种 [[agent-frameworks|agent 框架]]内部的 model routing 才是真正有想象力的方向，DeepClaude 只是开了个口子。

国内开发者这次拿到的，不只是一个便宜替代品，是一个能跟海外开发者用同一套工作流、还能少掏 75% 钱的位置。

如果你之前因为 Claude API 的国内付费麻烦放弃过 Claude Code，这周值得重新装一次试试。

## 相关链接

- [DeepClaude 仓库](https://github.com/aattaran/deepclaude)
- [HN 讨论 657 分](https://news.ycombinator.com/item?id=48002136)
- [DeepSeek 官方 Claude Code 集成文档](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code)
- [r/ClaudeCode 讨论串](https://www.reddit.com/r/ClaudeCode/comments/1t3hrcx/deepclaude_full_claude_code_agent_loop_on/)

相关实体，[[deepseek|DeepSeek]] [[anthropic|Anthropic]] [[claude-code|Claude Code]] [[deepclaude|DeepClaude]]

相关主题，[[ai-coding-tools|AI 编程工具]] [[ai-pricing|AI 定价]] [[agent-frameworks|Agent 框架]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
