---
title: Ollama 现在能一键跑 Kimi、GLM、DeepSeek，本地模型该怎么选
status: draft
date: '2026-06-28'
source: manual
source_url: https://github.com/ollama/ollama
angle: 把 Ollama 当作普通读者和开发者的本地模型入口，讲清楚 Kimi、GLM、DeepSeek、Qwen 等模型适合哪些任务。读者看完可以直接安装、拉模型、做一次自己的本地推理测试。
voice: first-person
content_lane: model-deployment
content_archetype: buyer_guide
diversity_note: title_pattern_repeat_in_batch,recent_entity_saturation,recent_title_pattern_saturation
reach: 9
tags:
  - Ollama
  - 本地模型
  - Kimi
  - GLM
  - DeepSeek
  - Qwen
  - 模型部署
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Ollama 现在能一键跑 Kimi、GLM、DeepSeek，本地模型该怎么选
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.04
reach_note: Ollama、DeepSeek、Qwen 都有认知度，本地运行和模型选择有明确行动路径。
selection_reason: A 级 GitHub 主源，品牌强、动作清楚，适合作为高传播的实操选型文。
---

# Ollama 现在能一键跑 Kimi、GLM、DeepSeek，本地模型该怎么选

我最近重新看 Ollama，不是因为它又多了一个响亮名字，而是它已经变成普通读者和开发者挑本地模型的入口。

GitHub 仓库摘要里，Ollama 的一句话很直接，可以跑 Kimi-K2.6、GLM-5.1、MiniMax、DeepSeek、gpt-oss、Qwen、Gemma 等模型。仓库是 Go 写的，已经有 174999 stars 和 16750 forks，最后推送时间是 2026 年 6 月 28 日。

读完以后，你应该拿到的不是新闻，而是一条可验证路径。安装 Ollama，拉一个模型，用同一组问题跑一遍，然后决定它能不能进你的日常工作流。

## 判断你是不是需要本地入口

我会把 Ollama 放在三类人面前。

第一类是想用本地推理做草稿、摘要、代码解释的人。你的核心需求不是极限能力，而是打开电脑就能跑，断开远程服务也能继续处理普通任务。

第二类是开发者。你可能要把模型接进脚本、Agent 原型或编辑器插件，Ollama 的价值在于 CLI 和本地 API 都足够直接，`ollama pull`、`ollama run`、`curl http://localhost:11434/api/tags` 这几步就能把模型变成一个可调用服务。

第三类是正在做模型选型的人。Kimi、GLM、DeepSeek、Qwen、Gemma、MiniMax 放在同一个入口里以后，问题不再是哪个名字最热，而是谁能在你的任务上稳定交付。

## 把选择压到三个条件

我不会一上来问哪一个最强，这个问题太容易把人带偏。本地模型先看三件事。

- 机器能不能承受，模型越大，对内存、显存和磁盘越敏感。先从较小规格开始，再往上加。
- 任务是不是明确，如果只是闲聊和轻量摘要，没必要把第一步押在最大模型上。
- 能不能被工具调用，你要做 Agent、批处理或本地服务，就优先验证 API、上下文长度和响应稳定性。

这里有个简单判断。只有当你的任务能写成固定测试题，才值得谈模型优劣。比如同一份会议纪要摘要、同一个代码文件解释、同一段中文长文改写、同一道多步推理题。

没有固定题，选型就会变成感觉。

## 按任务分支挑第一组模型

如果你的主要任务是中文长文处理，我会先看 Kimi-K2.6、GLM-5.1、Qwen。原因很朴素，它们的名字已经进入 Ollama 当前可运行列表，适合作为中文任务的第一批候选，而不是绕一圈再找入口。

如果你的主要任务是推理、代码解释、结构化回答，我会把 DeepSeek 和 Qwen 放在第一轮。这里不要急着做排名，先用同一份任务看它们谁更少跑偏，谁更愿意按格式输出。

如果你只是想要一个日常助手，Gemma、Qwen、gpt-oss 这类也可以进候选池。日常助手最怕的不是单题不够惊艳，而是开销太高、响应太慢、上下文一长就开始散。

MiniMax、Kimi、GLM 更适合作为第二轮扩展候选。等你确认 Ollama 路径跑通，再把它们加进同一套测试，不要第一天就把模型库拉成收藏夹。

## 用一张选型表结束纠结

我建议把第一次测试压成四格表，别写长评测。

- 写作和改稿，看中文语气、段落结构、是否会自作主张补事实。
- 代码和脚本，看能不能解释报错、给出小改动、保留原有约束。
- 摘要和知识整理，看是否漏掉关键数字、链接、限制条件。
- Agent 原型，看能不能稳定输出 JSON、遵守工具调用格式、在失败时给出可恢复信息。

每个模型只跑这四类任务，每类最多两题。通过的留下，失败的不要急着删，先记录失败形态。比如是太慢、占内存、格式不稳，还是答案质量不够。

我的判断是，Ollama 最大价值不在于替你宣布赢家，而是把模型选择从观点题变成实验题。你能用相同入口、相同任务、相同机器，把 Kimi、GLM、DeepSeek、Qwen 放到同一个桌面上。

## 把第一次验证跑成闭环

安装入口从 Ollama 官方仓库或文档走。模型不要凭记忆猜 tag，先到模型库确认名称和规格，再执行 `ollama pull <模型名>`，然后用 `ollama run <模型名>` 做第一轮对话。

跑完以后用 `ollama list` 看本地模型，用 `curl http://localhost:11434/api/tags` 确认服务侧能看到模型。开发者还可以走 OpenAI 兼容接口，把本地模型临时接进已有脚本，先验证链路，再谈换模型。

第一轮我会只留一个结论，这个模型能不能完成我的一个真实任务。不是能不能震撼我，也不是参数看起来多漂亮。

把本地推理入口跑通以后，你会发现模型选型少了很多噪音。真正有用的问题只剩一个，我明天还会不会继续打开它。

## 相关链接

- [Ollama GitHub 仓库](https://github.com/ollama/ollama)
- [Ollama 官方文档](https://docs.ollama.com/)
- [Ollama 模型库](https://ollama.com/library)
- [Ollama API 文档](https://docs.ollama.com/api)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
