# DeepSeek V4 Flash 今天上 OpenRouter 免费档 256K 上下文实测笔记

今天早上刷 OpenRouter 的 new models 页，DeepSeek V4 Flash 多了一个 `:free` 后缀。

我盯着那行价格看了一会儿，输入输出都是 0，上下文窗口 256K。模型 ID 是 `deepseek/deepseek-v4-flash:free`，284B 总参数、13B 激活的 MoE，官方页面写原生 1M 上下文，OpenRouter 免费档给到 256K。

5/14 首次上线免费档。我把它接进了几个 agent 工具跑了一上午，先把结论写在前面，再讲怎么接。

## 关键不是模型本身，是接入口

V4 Flash 不是新模型，4 月底就有付费版本。真正变化的是今天的 OpenRouter 免费 endpoint。

为什么这件事对国内用户重要，OpenRouter 国内可以直接访问，注册只要邮箱，不用绑卡就能开 free tier。拿到一个 API key 就能塞进任何走 OpenAI 兼容协议的编程工具里。

过去几个月跑 agent 的成本账，按"放开手脚一次跑十几分钟"的姿势，每天烧 5-10 美元算正常。Reddit 上有用户写得很直接，agent harness 一不小心就烧掉 1000 万 tokens。今天起这件事变了。

## 接入只有三步

去 openrouter.ai 用邮箱注册，settings 里拿一个 sk-or- 开头的 key，不需要绑卡。

模型 ID 填 `deepseek/deepseek-v4-flash:free`，base URL 是 `https://openrouter.ai/api/v1`。

国产 IDE 推荐用通义灵码做日常补全，需要长上下文跑长任务再切到 OpenRouter free 这条线做补充。

## 我用它跑了一个 200 文件的代码库

直接的办法是塞一个大仓库进去看它能不能扛住。

我拿的是一个 200 多个文件、大概 3 万行 TypeScript 的项目，让它读完整个 `src/` 目录后回答两个问题。第一个是找出所有调用 `fetchUser` 但没处理 401 的地方，第二个是重构 `auth/` 目录把 cookie 和 token 两种鉴权统一。

第一个任务跑了 18 分钟，吃掉 142 万输入 tokens、3.8 万输出。它真把所有 4 处遗漏都列出来了，还指出其中两处的 try-catch 是空块。准确率很扎实。

第二个重构任务踩到坑。它一上来就改了 8 个文件，但有 3 个文件 import 写错了，把 `import { verifyToken }` 写成 `import verifyToken`。这个 bug 在付费版上也有人报过，是模型本身的问题，不是 endpoint 的锅。让它写新代码或者做小改动很稳，让它做大范围重构得人盯着。

输出速度大概 40-60 tokens/s，比官方付费版略慢一点，但能用。256K 上下文实测能装下大约 80% 中型项目的核心代码 + readme + 主要测试。

## 社区已经讨论了两周

我翻了一圈国外社区，发现这件事在国外已经发酵一阵子了。

一条 51 赞的评论说，V4 在自家 workload 上是 SOTA，cache hit 和长 context 让它和其他模型不在一个层级。同一帖底下也有同样高赞的反对意见，认为真正的生产 workload 不会因为新版本闪亮就切换。这个分歧挺典型，个人开发者切得快，企业团队切得慢。

更可信的反馈是另一个用户写的，用 V4 Flash 跑自己的 mini SaaS 代码库，一直 debug 不掉的 bug 它解了。"具体某个 bug 解了"比"它是 SOTA"更有说服力。

但社区也踩到一些雷。免费档和付费档都偶尔返回 402（payment required），这种限流配额抖动是 OpenRouter free tier 的常态。跑长任务最好准备好 fallback，比如把 V4 Flash 设成主 endpoint，DeepSeek 官方 API 或者通义灵码免费档做兜底。

## 我的判断

V4 Flash 的 free endpoint 不是用来替代主力模型的东西。

它是用来跑你不敢让付费模型跑的任务的。比如让 agent 在你不在的时候自己折腾一晚上，跑测试、修小 bug、整理代码注释。这种长时间放养场景过去要么不敢开（怕账单），要么开了肉疼，现在零成本可以试。

第二个用法是做 RAG 和长文档处理的备份链路。256K 上下文塞一本英文技术书或者一整套 API 文档完全够用。

但不要指望它在前端复杂 UI 编码、跨文件复杂重构、需要严格类型推理的活上和顶配模型对位。它做不到，社区共识也是这样。

第三件事更微妙。OpenRouter 这种聚合层，正在让"国内开发者用什么 AI 编程"这个问题的答案越来越无关地理。DeepSeek、Qwen、Kimi、Hermes 这些开源/国产模型，通过 OpenRouter 在同一个 API 兼容层下和其他模型共存，工具侧甚至不在乎你后面接的是谁。

下次再有人问国内用什么 AI 写代码不烧钱，答案变得清晰了。不是哪个国产工具突围了，是 OpenRouter + 一堆开源 endpoint 让"烧钱"这个前提本身被改掉了。

## 行动建议

如果你今天就想试，三步。

1. 上 openrouter.ai 用邮箱注册，拿一个 sk-or- 开头的 key
2. 在 Cline 或者 Continue.dev 里选 OpenRouter provider，模型填 `deepseek/deepseek-v4-flash:free`
3. 拿一个不太大的项目（50-150 文件）让它做一个具体任务，比如找出所有没加 error handling 的 API call

跑完之后大概率会想把它设成 agent 长任务的默认 endpoint，付费模型留给真正难的活。

## 相关链接

- OpenRouter 模型卡，https://openrouter.ai/models/deepseek/deepseek-v4-flash:free
- DeepSeek V4 百万 token 上下文 agent 适配（HuggingFace blog），https://huggingface.co/blog/deepseekv4

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 10/10 | 品牌✓ 利益点✓ 可操作✓ -->
