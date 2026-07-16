---
title: 用 Ollama 本地跑 Kimi、GLM 和 DeepSeek：不配 API Key 也能开始
status: draft
date: '2026-07-16'
source: manual
source_url: https://github.com/ollama/ollama
angle: 用一套最小命令完成 Ollama 安装、模型拉取和本地对话，并说明不同内存条件下如何先选小模型验证，避免一开始就下载无法运行的大权重。
voice: first-person
content_lane: model-deployment
content_archetype: hands_on_recipe
diversity_note: title_pattern_repeat_in_batch,recent_entity_saturation,recent_title_pattern_saturation
reach: 9
tags:
  - Ollama
  - 本地大模型
  - DeepSeek
  - Kimi
  - GLM
  - 模型部署
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 用 Ollama 本地跑 Kimi、GLM 和 DeepSeek：不配 API Key 也能开始
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.037
reach_note: Ollama、Kimi、GLM、DeepSeek 都有品牌认知，本地运行能节省 API 成本，读者可以立即执行命令。
selection_reason: 它把多个热门模型收进同一个本地入口，既满足省钱需求，也能产出完整的安装、选型和故障排查实测。
---

# 用 Ollama 本地跑 Kimi、GLM 和 DeepSeek：不配 API Key 也能开始

想把模型对话搬到自己的电脑上，又不想先申请 API Key，这套路径只需要完成三件事，装好 Ollama、选一个机器能承受的本地标签、问出第一个问题。

Kimi-K2.6、GLM-5.1 和 DeepSeek 已出现在 Ollama 仓库的支持列表里。读完你能用同一套命令完成拉取和对话，也能判断什么时候该停在小模型，什么时候再换更大的权重。

我会把首轮目标定得很窄，能下载、能回答、能看见运行状态就算过关。第一次就追最大参数，往往只会把时间花在漫长下载和内存告急上。

## 把首轮场景压到一个问题

第一次运行不需要测复杂代码、长文档或多轮推理。我更愿意用一个答案容易判断的问题，把安装链路单独验清楚。

这张最小任务卡可以直接照着做。

- 运行位置，电脑终端
- 输入内容，`请用三句话解释键值缓存，并给出一个使用场景`
- 交付结果，终端返回结构完整、没有中途报错的回答
- 暂不测试，长上下文、多模型并行和复杂 Agent 工作流

这样做的好处很实际。模型回答得是否精彩可以以后再比，安装、拉取和推理链路有没有跑通，当场就能确认。

## 用一组命令完成安装和对话

macOS 和 Linux 可以使用 Ollama 仓库 README 给出的安装命令。

`curl -fsSL https://ollama.com/install.sh | sh`

Windows 用户从官方下载页安装。完成后运行 `ollama --version`，确认终端能找到 Ollama。

内存余量较小时，我会用 DeepSeek-R1 的小参数标签验证，例如依次运行。

- 拉取模型，`ollama pull deepseek-r1:1.5b`
- 开始对话，`ollama run deepseek-r1:1.5b`
- 查看已下载模型，`ollama ls`
- 查看运行状态，另开终端执行 `ollama ps`

Kimi-K2.6 和 GLM-5.1 也沿用同一套命令，只需要把模型名替换成模型库页面给出的完整本地标签。

`ollama pull <完整本地标签>`

`ollama run <同一个完整本地标签>`

不要根据系列名猜标签。模型页如果只提供 cloud 标签，它就不属于这条本地权重路径，换一个明确提供本地权重的标签继续验证。

## 按内存余量决定升级

参数更多不等于第一次更值得下载。我的选择方式很简单，看模型页显示的文件体积，再看机器当前可用内存，给运行时和上下文缓存留下余量。

- 内存余量紧张，选择模型页中最小的本地标签，只跑单轮短问题
- 内存余量一般，小模型通过后再向上换一个档位，每次只改模型标签
- 内存余量充足，仍然保留小模型作为基线，再尝试 Kimi 或 GLM 的更大本地权重

模型文件体积已经接近可用内存时，我不会硬拉。即使权重能够加载，更长的上下文和键值缓存也会继续占用资源。

我的判断是，本地模型上手最重要的指标不是第一次跑了多大的权重，而是有没有得到一条可重复的成功路径。小模型先通，大模型才有排查基线。

## 用三个信号完成验收

下载进度走完还不能算完成。我会检查下面三个结果。

- `ollama ls` 能看到刚才使用的完整模型标签
- `ollama run` 能连续接收问题并返回完整回答
- `ollama ps` 能显示正在运行的模型及处理器分配情况

三项都出现，安装、模型文件和推理进程才算真正接上。后续换 Kimi-K2.6、GLM-5.1 或更大的 DeepSeek 标签，只是在同一条路径上调整模型。

## 避开四个常见坑

- 把仓库支持列表当成硬件保证，项目支持一个模型，不代表你的机器适合它的最大权重
- 只写模型系列名，不核对完整标签，不同标签可能对应不同参数规模和运行方式
- 一次拉取多个大模型，本地磁盘先被占满，问题却还没有验证
- 只盯下载是否成功，不看 `ollama ps`，模型可能没有按预期使用计算资源

不配 API Key 降低了开始门槛，但计算、内存和磁盘仍然要由本机承担。把资源边界看清楚，比盲目追新模型更省时间。

## 让第二次下载有依据

现在可以打开 DeepSeek-R1 的官方模型页，挑最小的本地标签，跑完那句键值缓存问题，再保存 `ollama ls` 和 `ollama ps` 的结果。

这条链路稳定以后，再去模型库核对 Kimi-K2.6 和 GLM-5.1 的本地标签。第一次成功只需要一个小模型，第二次下载才需要更大的野心。

## 相关链接

- [Ollama GitHub 仓库](https://github.com/ollama/ollama)
- [Ollama 官方文档](https://docs.ollama.com/)
- [Ollama CLI 文档](https://docs.ollama.com/cli)
- [Ollama 模型库](https://ollama.com/search)
- [DeepSeek-R1 模型页](https://ollama.com/library/deepseek-r1)

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
