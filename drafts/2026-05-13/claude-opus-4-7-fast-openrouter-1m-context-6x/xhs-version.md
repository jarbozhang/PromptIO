# Claude Opus 4.7 Fast 上 OpenRouter 了，6 倍价格换速度，要不要冲？

姐妹们，今天 OpenRouter 上了一个新模型，`anthropic/claude-opus-4.7-fast`，我研究了半天，必须来给你们码一篇。

第一眼看到 fast 后缀，我心里想的不是"快"，而是"贵" 💸。打开页面一看，果然，$30 每百万 prompt token，$150 每百万 completion token。Anthropic 自己写得很直接，能力跟主线 Opus 4.7 一模一样，只是吐字快一些，价格是主线的整整 6 倍。

6x 这个数字，精确到让人没法装作没看见。这不是"略贵"，是"你必须知道自己为什么要多付 5 倍的钱" 🧐。

## 这玩意到底是啥

划重点：Fast mode 不是新模型，是一个推理路径。

底层权重跟 Opus 4.7 一样，所以 benchmark、能力边界、知识截止、tool use 表现全都不变。OpenRouter 页面写得清清楚楚，context 长度 100 万 tokens，支持 text + image + file 输入，tokenizer 跟主线一致。

唯一变量是输出速度 ⚡。Anthropic 把它定位成"对延迟敏感的 agent 场景"，比如做实时辅助、IDE 内补全、需要快速循环工具调用的 agent，等待时间本身就是钱。Fast mode 用更高的算力配比换更短的首 token 延迟和更高的吞吐，代价就是单 token 价格翻 6 倍。

放回价格表对比一下，1M context + $30/$150 这个组合，在所有同级模型里属于顶配里的顶配。Gemini Pro 主线、Qwen3.5 Plus、DeepSeek V4 Pro，这些同样 1M context 的对手，没有一个敢这么定价。

## 6 倍价格，你到底在买什么

我自己跑过几次主线 Opus 4.7 做长 context 任务，比如把整个项目仓库塞进去做架构审查、把 60 个网页爬取结果丢进去做综述。主线在这种"长输入、长思考、长输出"任务里，单次跑下来要等 90 秒到 2 分钟。

这段等待对我无所谓，反正我开着别的窗口刷小红书 🙃。

但如果你做的是 IDE 插件，用户敲完 Tab 等你补全，2 分钟绝对不能忍。如果你做的是客服 agent，用户问一句话等 2 分钟才出第一个字，对话基本就死了。

这就是 Fast mode 真正要卖的客户，**做 agent 产品给别人用、延迟决定留存的那种团队**。对他们 6 倍 token 价格只是 SaaS 售价的一个组成部分，不构成痛点。

对我们这些自己用 AI 写代码的工程师呢？老实说我没想到非 Fast 不可的场景。我写代码时偶尔等几秒钟反而是好事，让我重新看一眼自己的需求是不是说清楚了 ✍️。

## 算笔账，国内开发者用 OpenRouter 划得来吗

这才是我真正想算的账 💰。

OpenRouter 这条路径，所有 Anthropic 模型按量付费，没有月费门槛，国内用户能直接充值，一个 key 还能随便切 GPT、Gemini、Qwen、DeepSeek。坏处是按量付费，用得多了贵；好处是没用就不花钱。

我拿自己最近一个月的使用量算了一下。每天大概产生 200-400 万 input token（疯狂读仓库），输出大概 5-15 万 completion token（写代码、改代码、写文档）。按主线 Opus 4.7 算，一个月大概 50-100 美金，没有任何额度焦虑。

同样的使用量如果切到 Fast，就要 300-600 美金 😱。这个数字对个人开发者直接劝退，对一个团队的工具预算可能还能接受。

**我的结论是**：国内做 AI 编程的个人开发者，OpenRouter + 主线 Opus 4.7 是目前最干净的方案，不要碰 Fast。Fast 版本是给 to-B agent 团队准备的，不是给我们这种用工具的人准备的。

## 最小验证一下

OpenRouter 上跑 Opus 4.7 Fast 不需要任何特殊设置，把 model 参数改成 `anthropic/claude-opus-4.7-fast` 就行。

```
POST https://openrouter.ai/api/v1/chat/completions
Authorization: Bearer $OR_KEY
{ "model": "anthropic/claude-opus-4.7-fast",
  "messages": [...] }
```

如果你已经在 Claude Code 里配了 OpenRouter（ANTHROPIC_BASE_URL 指向 OpenRouter 的兼容端点），切 Fast 也只是改一行 model 配置。

想验证 Fast 是不是真的快，最简单的办法是同一个 prompt 跑两次，一次主线一次 Fast，看 streaming 第一个 token 出现的时间和总生成时间。我跑了一组同输入 8000 tokens、目标输出约 2000 tokens 的代码生成任务，Fast 的首 token 延迟感官上短了一截，但每次都不一样，就不报具体数了。

## 一句话总结

主线 Opus 4.7 够用，Fast 不是为我们准备的。它的存在告诉了我们一件事，Anthropic 在用价格分层，把延迟敏感的客户单独抽出来收税 🎯。

下次你看到某个 IDE 或 AI 客服宣传"基于 Claude 最强模型、毫秒级响应"，你就知道他们付了什么价。

国内用户可以通过 OpenRouter 国内可访问节点使用 Anthropic 模型，本文不展开。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
