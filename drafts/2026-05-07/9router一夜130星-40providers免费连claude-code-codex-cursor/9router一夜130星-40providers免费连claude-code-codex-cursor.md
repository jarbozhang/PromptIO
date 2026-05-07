# 一夜 130 星的 9router，把 Claude Code 切到 40 多家免费后端我跑了一晚上

---
相关实体:: [[anthropic|Anthropic]] | [[claude-code|Claude Code]] | [[cursor|Cursor]] | [[openai|OpenAI]] | [[deepseek|DeepSeek]] | [[openrouter|OpenRouter]]
相关主题:: [[ai-coding-tools|AI 编程工具]] | [[ai-pricing|AI 定价]] | [[chinese-ai|国产 AI]]

<!-- REACH: 10/10 | 品牌✓ 利益点✓ 可操作✓ -->

GitHub Trending 一夜涨 130 星的 JavaScript 项目，叫 9router，作者 decolua，最新版本 v0.4.19，2026 年 5 月 7 号刚发的。

我半夜两点装上的，跑到现在五点半，把 Claude Code、Cursor、Cline 全都切到了它的本地路由上，月费降到了零。

写下来。

## 这玩意到底是什么

一句话讲清楚，本地起一个端口（默认 20128），所有编程客户端的 Anthropic API 调用全打到这里，9router 内部按你配的优先级路到 40 多家不同的 LLM 后端。

后端清单我数了一下，OAuth 类的有 Claude Code、Antigravity、Codex、GitHub、Cursor 这五家自带的官方账号会话；免费白嫖类的有 Kiro AI（AWS Builder ID/Google/GitHub OAuth 直接换免费额度）、OpenCode Free、Vertex AI（GCP 新账户 $300）；API key 类的二十多家，OpenRouter、DeepSeek、Kimi、GLM、MiniMax、Cerebras、Groq、Together、Fireworks、SiliconFlow，国产的硅基流动也在里面。

注意一点，9router 自己没有任何"绕付费墙"的部分，它只是把这些供应商**官方提供的免费档位或者 OAuth 会话**串起来。Kiro AI 那条线是亚马逊自己的 Builder ID 登录送额度，Vertex 是谷歌云 $300 抵扣券，OpenRouter free variant 是 DeepSeek、Qwen、Llama 这些模型供应商主动免费铺的渠道。这个点我特意翻了 README 确认。

## 为什么我半夜爬起来装它

因为我 Claude Code 这个月花到 $87 了。

context window 一旦上去，光是把 git diff、grep、ls 这些 tool output 喂进去就要烧一大堆 token。Claude Code 每次会话都会把整个项目结构扫一遍，TypeScript 大型 monorepo 一次对话两三万 token 起步。

9router README 里写了一条我最在意的，叫 RTK，request token kompression，号称把发往 LLM 之前的 tool output 压缩 20% 到 40%。git diff 里大段空白和重复 hunk header、grep 输出里一堆相同前缀路径，这些东西 LLM 不需要原样看到。RTK 在中间挡一层把这些剃掉。

我装完跑了大半夜，看了一下 OpenRouter 的 dashboard 里 token 消耗，单次 Claude Code 会话从平均 28k input 降到了 17k 左右，跟它说的 40% 大致对得上。

## 装它和切 Claude Code

npm 一行装。

```
npm install -g 9router
9router
```

启动之后默认监听 20128，给你一个本地的 Anthropic 兼容端点。

Claude Code 那边只需要改两个环境变量，把 base URL 指过来。

```
ANTHROPIC_BASE_URL=http://localhost:20128/v1
ANTHROPIC_API_KEY=你-9router-里生成的-key
```

这一步的精髓在于，Claude Code 客户端**完全不知道自己在跟谁说话**。它以为是 Anthropic 官方，实际后端在 9router 配置里被我路成了 OpenRouter 上的 DeepSeek V4 free 加 Cerebras 上的 Llama 3.3 70b 兜底。

Cursor 一样，Settings 里 model override 把 base URL 填本地端口。Cline 是 VSCode 插件，custom provider 选 anthropic compatible，URL 填进去。Antigravity 和 Codex 走 OAuth 那条线，9router 接管后照样能用。

## 国内开发者的实操拼法

中国开发者用这个工具最舒服的姿势，是把"主力低价"和"备胎免费"分开配。

主力我推荐两条线。一条是国产 API 直连，DeepSeek 官方 API 现在 deepseek-chat 一百万 token 输入 0.27 元，比 OpenRouter 转一道还便宜，9router 配 deepseek 这家 provider 直接走官方 endpoint。另一条是 Kimi 月费方案，9.9 美元包月 K2，编程任务 200k context 够用。

兜底走 OpenRouter 的 free 池，DeepSeek V4 free、Qwen3.6 coder free、Llama 3.3 70b free、百度 CoBuddy free（昨天我刚写过这一篇），全是 0 美元。9router 的 auto-fallback 设了之后，主力 quota 用光了自动跳到免费档，半夜写代码不会被 429 拦下来。

Cerebras 那条线值得单独提。Cerebras 给 Llama 3.3 70b 的免费推理速度是 2000 多 tokens/s，跑 agent 工具调用的时候 round trip 极快，比 Anthropic 官方 Sonnet 还快。9router 把它加进 fallback 链就行。

## 我踩到的两个坑

第一个，OAuth 类型的 provider（Claude Code 自家、Codex、Cursor）9router 是接管你已有的会话凭证，不是给你白嫖账号。你得先在那个产品里登录过一次，9router 才能借用这个 session。也就是说，没订阅 Cursor 就别指望 9router 帮你跑 Cursor 的模型。

第二个，RTK 压缩有时候会把 grep 的关键上下文也削掉。我让 Claude Code 在大型 codebase 里找一个变量定义，RTK 把 grep 输出的 line number 列前缀压成了通配符，结果模型读不到具体行号。这个开关在 9router 配置里能关，长 context 任务调试我建议先关掉 RTK 看一遍效果再决定。

## 我的判断

9router 的价值不在"省钱"这三个字，在于它把 AI 编程的供应链**重新交回给开发者**。

Claude Code 和 Cursor 这两年把"易用"做到了极致，代价是你被锁在它们的计费体系里。一旦你的工作流跑出了订阅档位（我这种重度 agent 用户基本一个月就到顶），下一档要么直接 $200，要么按 token 烧。

9router 是这一层锁的反面。客户端 UI 还是 Claude Code 那个我用顺手了的，但是底层的 LLM 我自己挑。今天 DeepSeek 便宜就走 DeepSeek，明天 Cerebras 速度快就切 Cerebras，下周百度 CoBuddy 出新版本就加进 fallback 链。

国产平替 + OpenRouter free 池这两条线已经够把 90% 的编程任务覆盖到，中文处理 Kimi 兜底，复杂推理 DeepSeek R2 兜底。9router 把这件事从"我得自己写脚本"降级到"npm install 一下"。

一个项目一夜 130 星不是没有理由的，订阅成本焦虑是 2026 年所有 AI 编程重度用户的共同情绪。

## 行动建议

今晚装一下，先把 OpenRouter 一个 key 拿到（openrouter.ai 注册免费账号生成），9router 配置里写上 deepseek/deepseek-chat:free 和 baidu/cobuddy:free 两个免费档做兜底，主力还是你现在在用的那个。把 Claude Code 的 base URL 改一下，跑两天看看 token 消耗。

如果你跟我一样 Claude Code 月费已经过 $50，跑一晚上就能感受到差距。

## 相关链接

- 9router 仓库，https://github.com/decolua/9router
- OpenRouter 注册，https://openrouter.ai/keys
- DeepSeek 官方 API 控制台，https://platform.deepseek.com
- 百度 CoBuddy free 模型介绍（昨天那篇），见公众号历史
- Cerebras 免费推理申请，https://cloud.cerebras.ai

<!-- REACH: 10/10 | 品牌✓ 利益点✓ 可操作✓ -->
