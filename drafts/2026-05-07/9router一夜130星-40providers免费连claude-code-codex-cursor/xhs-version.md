# 一夜 130 星的 9router，把 Claude Code 接到 40 多家国内合规聚合后端

GitHub Trending 一夜涨 130 星的 JavaScript 项目，叫 9router，作者 decolua，最新版本 v0.4.19，2026 年 5 月 7 号刚发的。

我半夜两点装上的，跑到现在五点半，把 Claude Code 和 Cursor 都切到了它的本地路由上，月度 API 支出降下来了。

写下来。

## 这玩意是什么

本地起一个端口（默认 20128），所有编程客户端的 Anthropic API 调用都打到这里，9router 内部按你配的优先级路由到 40 多家不同的 LLM 后端。

后端清单大致三类：一类是 OAuth 已登录会话（你自己已经付费订阅过的产品账号）；一类是云厂商的官方新用户额度（比如 OpenRouter、Cerebras、Groq 这类 AI 推理平台主动放出来的额度）；一类是 API key 直连的二十多家供应商，国内可直接访问的有 DeepSeek、Kimi、GLM、MiniMax、SiliconFlow（硅基流动）。

要说清楚的一点，9router 没有任何"绕付费墙"的部分，它只是把这些供应商**官方提供的额度档位**串起来。所有渠道都是对方平台主动放出的合规入口。

## 为什么我会装它

因为我 Claude Code 这个月 API 账单已经叠到三位数美元了。

context window 一旦上去，光是把 git diff、grep、ls 这些 tool output 喂进去就要烧一堆 token。Claude Code 每次会话会把项目结构扫一遍，TypeScript 的大型 monorepo 一次对话两三万 token 起步。

9router README 里有一条我最在意的，叫 RTK，request token kompression，号称把发往 LLM 之前的 tool output 压缩 20% 到 40%。git diff 里大段空白和重复 hunk header、grep 输出里一堆相同前缀路径，这些东西模型不需要原样看。RTK 在中间挡一层把这些剃掉。

我跑了大半夜看 dashboard 里的 token 消耗，单次 Claude Code 会话从平均 28k input 降到了 17k 左右，跟它说的 40% 大致对得上。

## 装它和切 Claude Code

npm 一行装。

```
npm install -g 9router
9router
```

启动之后默认监听 20128，给你一个本地的 Anthropic 兼容端点。

Claude Code 那边只需要改两个环境变量。

```
ANTHROPIC_BASE_URL=http://localhost:20128/v1
ANTHROPIC_API_KEY=你-9router-里生成的-key
```

Cursor 一样，Settings 里 model override 把 base URL 填本地端口。

## 国内开发者的实操拼法

我自己最近的拼法是把"主力低价"和"备胎兜底"分开配。

主力两条线。一条是国产 API 直连，DeepSeek 官方 API 的 deepseek-chat 一百万 token 输入两毛七，9router 配 deepseek 这家 provider 直接走官方 endpoint。另一条是 Kimi 月费方案，K2 编程任务 200k context 够用。两家都是国内主体，注册登录都顺。

兜底走 OpenRouter 这个聚合镜像里的低价档位，DeepSeek V4、Qwen3.6 coder、Llama 3.3 70b 这些模型都有低价或免费档位（OpenRouter 是国内可直接访问的 LLM 聚合服务）。9router 设了 auto-fallback 之后，主力 quota 用光会自动跳备胎，半夜写代码不会被 429 拦下来。

Cerebras 那条线值得单独提，Llama 3.3 70b 的推理速度跑到 2000 多 tokens/s，agent 工具调用 round trip 极快。

## 我踩到的两个坑

第一个，OAuth 类型的 provider 9router 是接管你已有的会话凭证，**不是凭空给你一个账号**。你得先自己在那个产品里登录订阅过，9router 才能复用这个 session。没订阅就别指望它帮你跑那家的模型。

第二个，RTK 压缩有时候会把 grep 的关键上下文也削掉。我让 Claude Code 在大型 codebase 里找一个变量定义，RTK 把 grep 输出的行号前缀压成了通配符，模型读不到具体行号。这个开关在 9router 配置里能关，长 context 任务调试我建议先关掉 RTK 看一遍效果再决定。

## 我的判断

9router 的价值不在省钱两个字，在于它把 AI 编程的供应链交回给开发者。

Claude Code 和 Cursor 这两年把易用做到了极致，代价是你被锁在它们的计费体系里。一旦工作流跑出了订阅档位（重度 agent 用户基本一个月就到顶），下一档要么直接 200 美元，要么按 token 烧。

9router 是这一层锁的反面。客户端 UI 还是 Claude Code 那个我用顺手了的，但底层模型我自己挑。今天 DeepSeek 便宜就走 DeepSeek，明天 Cerebras 速度快就切 Cerebras。

国产直连加 OpenRouter 聚合两条线已经够把 90% 的编程任务覆盖到，中文场景 Kimi 兜底，复杂推理 DeepSeek 兜底。9router 把这件事从"我得自己写脚本"降级到 npm install 一下。

一个项目一夜 130 星不是没有理由的，订阅成本焦虑是 2026 年所有 AI 编程重度用户的共同情绪。

## 行动建议

今晚装一下，先注册一个 OpenRouter（openrouter.ai，国内可直接访问）拿到 key，9router 配置里写上 deepseek 和一个备胎模型做 fallback，主力还是你现在在用的那个。把 Claude Code 的 base URL 改一下，跑两天看看 token 消耗。

如果你跟我一样 Claude Code 月度 API 已经过 50 美元，跑一晚上就能感受到差距。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
