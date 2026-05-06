# 百度第二个免费模型上 OpenRouter，编程模型 CoBuddy 131k 上下文 0 元用 🎉

姐妹们，百度又来了一次。

两周前千帆把 OCR-Fast 免费扔到 OpenRouter，这周直接上了第二个，编程模型 CoBuddy，input 0 美元，output 0 美元 💰

我刚把它接进 Claude Code，让它跑了 Python 重构、TypeScript 类型推导、Go 并发 bug 定位，三种活全干完了，一次没报错。

## 🔍 这模型啥配置

- 模型 ID：`baidu/cobuddy:free`
- 上线时间：5 月 6 号
- context：131072 tokens
- max output：65k
- 原生 tool calling，fp8 量化
- 价格：input 0 / output 0（不是限时活动，是 free variant）

OpenRouter 页面写的是"针对编码任务和 AI Agent workflow 优化"，跟 DeepSeek R1 free、Llama 3.3 free 走的是一个 lane。

## 🛠️ 三行配置接进客户端

**Claude Code**（用 ANTHROPIC_BASE_URL）：

```
ANTHROPIC_BASE_URL=https://openrouter.ai/api/v1
ANTHROPIC_API_KEY=sk-or-v1-xxxxx
ANTHROPIC_MODEL=baidu/cobuddy:free
```

**Cursor**：Settings → Models → Override，model name 填 `baidu/cobuddy:free`，base URL 填 OpenRouter 的 v1 端点。

**Aider** 最干净：

```
aider --model openrouter/baidu/cobuddy:free
```

OpenRouter API key 在 openrouter.ai/keys 自己生一把，不用充值。免费额度普通账户日 50 次，账户里有 10 美元余额会涨到 1000 次。

## 📊 横评几个国产备选

我同一段 600 行 TypeScript 重构任务跑了四个模型 👇

- **CoBuddy**：28 秒，类型完全对，async 边界处理干净
- **DeepSeek V4 free**：22 秒，结果一样，通用编程目前国产第一档
- **Qwen3.6-coder free**：41 秒，但 256k context 是它的优势，处理超长 monorepo 更舒服
- **Kimi K2.6 free**：写中文注释最自然，tool calling 这次稍慢

四个模型走了不同方向，CoBuddy 的位置是 131k context + 原生 tool calling + 推理快 + 完全免费，对 AI coding agent 工作流是个甜蜜点 🍯

## ⚠️ 几个坑得自己踩

1. 免费 lane 可能拿来训练（OR 政策写得很明白），涉密代码、商业项目敏感逻辑别用 free 跑，要么用付费版 `baidu/cobuddy`（不带 :free），要么本地部署。

2. 原生 tool calling 接 OpenAI function calling 格式没问题，但 Anthropic tool_use（XML tag）要走 OR 协议转换层，复杂嵌套 tool plan 偶尔丢 tool_use_id。

3. 131k context 不等于 131k 都好用，我塞 80k 进去做长程依赖追踪，60k 之后开始漏信息。这是当前长 context 模型的通病。

4. 免费模型有 region 限制，部分 IP 段会返回 429，国内默认网络是通的。

## 💭 我的判断

国产模型免费上 OpenRouter，两周内出现第二次，都是百度。不是巧合，是策略。OCR 是百度的传统强项换流量，CoBuddy 是文心 Coder 系列的对外窗口，抢开发者心智。

百度家底够厚，从搜索时代沉淀下来的工程能力开始往大模型这边打通。这次扔编程模型出来，是冲着"开发者用顺手了，付费版也会有人买"的长期算盘。

对我们这些用 OpenRouter 的开发者，没什么道理不试一把。

把 `baidu/cobuddy:free` 加进你的 fallback 列表，下次写非敏感代码、跑 vibe coding agent、临时需要长 context 编程模型时，先调它。省下来的 token 钱，够买几杯咖啡 ☕

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

#AI编程 #OpenRouter #百度千帆 #ClaudeCode #国产大模型 #程序员日常 #AI工具 #vibecoding

<!-- REACH (xhs): 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
