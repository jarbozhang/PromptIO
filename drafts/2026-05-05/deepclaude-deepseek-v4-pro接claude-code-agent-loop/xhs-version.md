# DeepClaude 一夜冲上 HN 657 分，我把 Claude Code 的脑子换成 DeepSeek V4 Pro

周末刷 HN 看到一个叫 deepclaude 的项目，657 分、275 条评论 🔥

仓库描述就一句话："Claude Code agent loop with DeepSeek V4 Pro"。

clone 下来跑了一天，发现这事对国内开发者真的有意义。

## 🧠 DeepClaude 到底干了啥

它不是另写一个 agent，而是做了一层 wrapper，让 Claude Code 这个 CLI 的 agent loop 不变，把里面发出去的 API 请求改路由到 DeepSeek。

说人话就是，Claude Code 的壳子还在，子 agent、tool 调用、session 管理、todo list 全是 Anthropic 那套，但每次调模型实际跑的是 DeepSeek V4 Pro。

核心就是设三个环境变量：

```
ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic"
ANTHROPIC_AUTH_TOKEN="sk-你的-deepseek-key"
ANTHROPIC_DEFAULT_OPUS_MODEL="deepseek-v4-pro"
```

DeepSeek 自己实现了 Anthropic 协议（Messages API + tool calling），所以 Claude Code 客户端完全感知不到对面已经换了模型 👏

## 💰 算笔账

- Claude Sonnet 4.6：input $3/M、output $15/M
- DeepSeek V4 Pro：input $0.44/M、output $0.87/M（5 月 31 日前折扣价）

光看 output token，差 17 倍。

我之前 Claude Code Max $200/月偶尔顶到 5 小时窗口上限。换 DeepClaude 走 DeepSeek API，全工作日强度大概 $1.5～2/天，一个月 25 个工作日 $50 上下，便宜 75%。轻度使用每月 10 天就降到 $20。

更关键的是，DeepSeek 国内支付宝就能充值，拿 sk-xxx key，不需要任何境外服务。

## 🆚 跟 DeepSeek-TUI 是两条路

容易搞混，必须说清楚：

- **DeepSeek-TUI**：Rust 重写的独立 agent，自己跑 agent loop。优点是二进制级响应、没有 Node 启动延迟；缺点是 agent loop 设计还年轻
- **DeepClaude**：一行 agent 代码都没写，借用 Claude Code 产品级别的 agent loop 只换底层模型。优点是 Claude Code 三年迭代下来的 ergonomics 全白嫖（skill 路由、subagent、todo 同步）；缺点是被绑死在 Anthropic 协议上

两个项目对应不同需求，各有取向 ✌️

## 🧪 实测一天的几个坑

跑了大概一个工作日，写一个中等复杂度的 Node 脚本：

✅ 省钱是真的，整天 DeepSeek 后台显示花了不到 $0.5，同样工作量之前 Sonnet 4.6 大概要 $3～5
✅ 日常 read-grep-edit 三件套，DeepSeek V4 Pro 完全顶得住，看不出来谁写的
⚠️ 多步规划+回退+重新规划这种长链路，偶尔会卡在某一步重复试同一个工具调用
⚠️ 并行 tool call 不支持，自动降级成串行，体感不太影响
❌ MCP server 整个不能用，重度依赖 MCP 的 workflow 是 deal breaker

还有一条要注意 ⚠️ DeepSeek 隐私政策明确写了会用 API 请求训练模型。商业代码、签 NDA 的客户代码，慎用。

## 🚀 国内开发者三步上手

1️⃣ 去 platform.deepseek.com 注册，国内手机号+支付宝充值，拿一个 sk-xxx，先充 10 块钱试试
2️⃣ `git clone https://github.com/aattaran/deepclaude.git`，chmod +x 后 ln -s 到 /usr/local/bin，export `DEEPSEEK_API_KEY=sk-xxx`
3️⃣ 已经装了 Claude Code 的项目目录下，把 `claude` 换成 `deepclaude` 启动，其他照旧。想切回 Sonnet 加 `--backend anthropic`

懒得用 wrapper 脚本，DeepSeek 官方文档（api-docs.deepseek.com 的 agent_integrations/claude_code 页）也写了直接配 settings.local.json 的法子，效果一样。

## 💡 我的判断

DeepClaude 本身是个三百行 shell 脚本的小工具，但它捕捉到的是一个真正的转折点。

DeepSeek 这一代主动实现 Anthropic 协议、价格压到 1/17、agent loop 实测能跑通，于是 Claude Code 作为产品和 Anthropic 作为模型供应商第一次被解耦了。下一步会有人做更激进的事，比如 planning 用 Sonnet、execution 用 DeepSeek，HN 评论里已经有人在跑这种组合。

国内开发者这次拿到的，不只是一个便宜替代品，而是一个能跟海外开发者用同一套工作流、还能少掏 75% 钱的位置 🎯

如果你之前因为 Claude API 国内付费麻烦放弃过 Claude Code，这周值得重新装一次试试。

#AI编程 #ClaudeCode #DeepSeek #开发者工具 #国产AI #AI省钱 #编程效率 #程序员日常

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
