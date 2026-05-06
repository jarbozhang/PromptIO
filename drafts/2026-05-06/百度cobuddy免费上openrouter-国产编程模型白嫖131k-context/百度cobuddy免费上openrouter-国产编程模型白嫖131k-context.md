# 百度第二个免费模型上 OpenRouter，这次是编程模型 CoBuddy，131k 上下文白嫖

百度又来了一次。

两周前千帆把 OCR-Fast 免费扔到 OpenRouter，这周直接上了第二个，编程模型 CoBuddy，131072 context，input 0 美元，output 0 美元。

我刚把它接进 Claude Code 的 OpenRouter provider，让它跑了一段 Python 重构、一段 TypeScript 类型推导、一段 Go 的并发 bug 定位，三种活全干完了，没一次报错。

## 这是个什么模型

模型 ID 是 baidu/cobuddy:free，5 月 6 号上 OpenRouter，OpenRouter 页面上写的是"针对编码任务和 AI Agent workflow 优化"。

关键参数三条，131k context、65k max output、原生支持 tool calling，fp8 量化推理。

价格 0 美元/百万 input token，0 美元/百万 output token，跟两周前的 OCR-Fast 一样的玩法。

百度过去半年在 OpenRouter 上铺得很密，先是 ERNIE 系列付费版，然后 4 月 23 号免费 OCR-Fast 上线（我之前写过那一篇），现在 CoBuddy。OCR 是吃流量的边缘武器，CoBuddy 是直接对着 AI coding 这个最热的赛道扔出来的。

我反复刷新了三次定价页面，确认 input 和 output 都是 0，不是限时活动，是 free variant 模型，跟 DeepSeek R1 free、Llama 3.3 free 走的是一个 lane。

## 怎么接进 Claude Code

OpenRouter 的好处是，所有走 OpenAI 兼容协议的客户端，三行配置就能换底层模型。

Claude Code 我用的是 ANTHROPIC_BASE_URL 指向 OpenRouter 的 anthropic 兼容端点。配置长这样（伪代码）。

```
ANTHROPIC_BASE_URL=https://openrouter.ai/api/v1
ANTHROPIC_API_KEY=sk-or-v1-xxxxx
ANTHROPIC_MODEL=baidu/cobuddy:free
```

Cursor 走 Settings → Models → Override 那个口子，model name 填 baidu/cobuddy:free，base URL 填 OpenRouter 的 v1 端点，API key 填 OR 的 key。

Aider 最干净，直接命令行参数。

```
aider --model openrouter/baidu/cobuddy:free
```

OpenRouter API key 在 openrouter.ai/keys 自己生一把就行，不需要充值，免费模型走 free quota。BYOK 用户日 1000 次，普通账户日 50 次（带 10 美元账户余额会涨到 1000 次）。

我接进 Claude Code 之后，第一件事是让它读了一个 600 行的 TypeScript 文件，要求把里面的 callback 改成 async/await。

它读完整个文件没分块（131k context 摆在那里），改完输出 diff，类型完全对，async 边界处理得很干净，连一个本来 callback 里吞掉的 catch 都正确转成了 try/catch。

## 横评几个备选

我同时跑了 DeepSeek V4、Qwen3.6-coder、Kimi K2.6 在同一段 600 行重构任务上，列限定条件。

**DeepSeek V4**，免费版在 OpenRouter 上是 deepseek/deepseek-chat:free，128k context，准确率最稳。我跑的这道题它一次过，用时 22 秒。CoBuddy 用了 28 秒，结果一样。DeepSeek 在通用编程上目前还是国产里第一档。

**Qwen3.6-coder**，OpenRouter 上是 qwen/qwen3-coder:free，256k context 是它的优势，处理超长 monorepo 比 CoBuddy 舒服。但小任务上响应延迟更高，我那道 600 行的题它跑了 41 秒。

**Kimi K2.6**，moonshotai/kimi-k2:free，长上下文老牌选手，2M context 的版本要付费。免费版本 200k context，写中文注释最自然。但 tool calling 这次明显比 CoBuddy 慢半拍，AI Agent 场景里 round trip 多的时候会显著拖慢节奏。

CoBuddy 的位置很有意思。

不是某一项第一，但 131k context + 原生 tool calling + 推理吞吐量高 + 完全免费这四条拧在一起，对 AI coding agent 工作流是个甜蜜点。

我的判断，做日常 vibe coding，CoBuddy 现在可以塞进我的 OpenRouter fallback 列表第二位（DeepSeek V4 free 第一）。

## 几个坑

百度这次有几个细节没说清楚，得自己踩。

第一，免费模型 OpenRouter 可能拿来训练，OR free model policy 写得很明白。涉密代码、商业项目敏感逻辑，别用免费 lane 跑，要么付费用 baidu/cobuddy（不带 :free 后缀的版本），要么本地部署。

第二，原生 tool calling 我测了一下，OpenAI function calling 格式它能接，但 Anthropic tool_use 格式（XML tag 那种）它没原生支持，要走 OR 的协议转换层，复杂工具会有边缘 case。Claude Code 走 anthropic 端点接 CoBuddy 时，我让它调用 Bash 工具一切正常，但让它处理嵌套的 multi-step tool plan 时偶尔会丢 tool_use_id。

第三，131k context 不等于 131k 都好用。我塞了 80k token 的 context 进去做长程依赖追踪，模型在 60k 之后开始漏信息，这是所有当前长 context 模型的通病，不是 CoBuddy 独有的问题。

第四，OpenRouter free 模型有 region 限制，部分 IP 段访问会返回 429。我从国内走默认网络是通的，但要长期跑，建议挂个国内云服务器做中转。

## 我的判断

国产模型免费上 OpenRouter 这件事，从 4 月底到现在两周内出现了第二次，都是百度。

我两周前写 OCR-Fast 那篇时还说"国产里第一个走得这么远的免费 hosted 模型"，现在第二个出来了，第二个还是百度自己。

这不是巧合，是策略。OCR 是百度的传统强项，扔出来换流量；CoBuddy 是百度文心 Coder 系列的对外窗口，扔出来抢开发者心智。两个都 0 美元，两个都上 OpenRouter，两个都直接对着海外开发者的现成 stack 适配。

百度过去几年在大模型品牌叙事上输得很惨，但他们家底够厚，从搜索时代沉淀下来的工程能力开始往大模型这边打通。这次扔编程模型出来，是冲着"开发者用顺手了，付费版也会有人买"的长期算盘。

对我们这些用 OpenRouter 的开发者，没什么道理不试。

把 baidu/cobuddy:free 加进你的模型 fallback 列表，下次写非敏感代码、跑 vibe coding agent、临时需要个长 context 编程模型时，先调它，再调别的。

至少省下来的 token 钱，够你买几杯咖啡。

## 相关链接

- CoBuddy on OpenRouter，https://openrouter.ai/models/baidu/cobuddy:free
- 百度千帆官网，https://qianfan.cloud.baidu.com
- OpenRouter API key，https://openrouter.ai/keys
- 我两周前写的百度千帆 OCR-Fast 免费篇，drafts/2026-04-23/百度千帆ocr-fast免费上openrouter-发票合同截图白嫖

---

相关实体:: [[baidu|百度]] | [[qianfan|千帆]] | [[cobuddy|CoBuddy]] | [[openrouter|OpenRouter]]
相关主题:: [[ai-pricing|AI 定价]] | [[ai-coding-tools|AI 编程工具]] | [[chinese-ai|国产 AI]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
