---
title: AGENTS.md 不能只靠手感写，Probe-and-Refine 把仓库说明变成可测试资产
status: draft
date: '2026-06-19'
source: manual
source_url: https://arxiv.org/abs/2606.20512v1
angle: >-
  从我们自己也在维护 skill / AGENTS.md 的场景切入，仓库说明不只是给模型看的提示词，而是会影响 agent 能不能找到正确文件。重点写 probe-and-refine
  的实验结果和对团队维护 Agent 指令文件的启发。
voice: first-person
reach: 8
tags:
  - AGENTS.md
  - Coding Agent
  - 仓库说明
  - 论文拆解
  - 工程协作
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: AGENTS.md 不能只靠手感写，Probe-and-Refine 把仓库说明变成可测试资产
wechat_title: ''
cover:
  status: skipped
reach_note: arXiv 新论文，数字明确，和 AI 编程质量、Skill 更新、仓库说明直接相关。
selection_reason: 这篇能承接用户近期对 skill 质量的要求，也能产生内部流程改进启发。
---

# AGENTS.md 不能只靠手感写，Probe-and-Refine 把仓库说明变成可测试资产

如果你维护过 AGENTS.md、CLAUDE.md 或自己的 skill，大概率会有一个熟悉误区，写得越长，心里越踏实。

但这篇 Probe-and-Refine 论文给我的提醒更直接，仓库说明不是写给模型看的温柔提示词，它会决定 coding agent 能不能摸到正确文件。

读完这篇，你可以把团队的 agent 指令文件拆成一组可验证资产，用失败任务反推该补哪一句、删哪一段、保留哪条路径规则。

## 先把仓库说明当成会失效的资产

我们自己维护 skill 和 AGENTS.md 时，最怕的不是缺一句漂亮 prompt，而是 agent 明明读了说明，还是去错目录、跑错测试、改错抽象层。

论文说的 operational knowledge，正好就是这些藏在代码之外的知识。

哪些文件对应哪些子系统，测试怎么跑，过去哪些工作流容易把 bug 修偏，这些内容通常不会自然出现在源码里，只能靠团队写进 guidance 文件。

问题是，写了不等于有用。

这篇论文的核心判断很适合团队复盘，关键不是有没有 AGENTS.md，而是它怎么被生产出来。靠资深同事手感补文档，和用失败样例反复修说明，结果不是一回事。

## 用探针任务找出 agent 卡在哪里

Probe-and-Refine 的做法很朴素，先用 synthetic bug-fix probes 去诊断当前 guidance 文件，再根据诊断结果修补它。

这里我最喜欢的一点是，tuning 阶段不引入 agent loop，也不让模型拿工具到处试。论文描述的是单次 LLM 调用完成一次迭代。

这让它更像文档维护流程，而不是又搭一个复杂评测平台。

你可以把它翻译成团队动作。

- 适合谁，维护 AGENTS.md、CLAUDE.md、skill、仓库 onboarding 文档的团队。
- 怎么做，从真实失败任务里抽 probe，特别是 agent 找错文件、漏跑测试、误判模块边界的案例。
- 坑点，不要把仓库说明写成百科，越全不一定越能帮 agent 做对事。
- 下一步动作，每次修 guidance 后，用同一组 probe 回放一次。
- 交付形态，一份 guidance 文件，加一组 probe 任务，加一份失败原因记录。

这比单纯问模型“帮我写一份 AGENTS.md”更接近工程维护。

## 别先追求更聪明，先让它找到正确文件

论文实验基于 SWE-bench Verified，模型是 Qwen3.5-35B-A3B，设置为 200 steps，做了四轮独立试验。

数字很清楚。

probe-and-refine 的平均 resolve rate 是 33.0%。初始化用的 static knowledge base 是 28.3%。没有 guidance 的 baseline 是 25.5%。两组对比论文都报告 p < 0.001。

更关键的是，提升主要来自 coverage，不是 precision。

refined guidance 让 agent 多产生 14.5 个百分点的可评估补丁，但每个补丁的 precision 大约 59%，统计上没有显著变化。

我对这个结果的理解很简单，AGENTS.md 没有让 agent 每次改代码都突然更准，它先让 agent 更常走到能交补丁的位置。

这对团队很重要。

如果你的 agent 经常卡在“没找到入口”“不知道跑哪个测试”“误把配置问题当业务 bug”，先别急着调大模型或换框架。更值得查的是，仓库说明有没有把任务路由写清楚。

## 把 AGENTS.md 维护成小型测试资产

我的判断是，最容易踩坑的是把 AGENTS.md 写成仓库百科。

百科式说明对人有用，但 agent 做任务时需要的是操作性路径。它不缺一段宏大介绍，它缺的是“改这个问题先看哪些文件”“这个测试为什么不能省”“哪类错误不要顺手修到另一个层”。

可以先从一组很小的维护流程开始。

1. 收集 5 个 agent 最近失败的 bug-fix 任务。
2. 给每个任务标出失败点，是找错文件、漏掉测试、误解模块边界，还是修复动作太宽。
3. 把失败点改写成一条 guidance 候选规则。
4. 用同一批任务回放，看 agent 是否更容易产出可评估补丁。
5. 没有效果的规则删掉，太泛的规则改窄。

这个流程不需要把仓库文档推倒重写。它更像给 AGENTS.md 加回归测试。

尤其是多团队协作时，这一点会更明显。新人写 guidance 往往会补背景，老工程师写 guidance 往往会补经验，probe 会逼大家回到同一个问题，agent 到底有没有因此少走弯路。

## 先验证一条路径，再扩整份文档

我会把这篇论文给团队的启发压成一句话，AGENTS.md 应该按失败样例迭代，而不是按写作者的安全感膨胀。

下次改 AGENTS.md，不要从“我感觉 agent 应该知道什么”开始。

拿一个真实失败任务，写成 probe，让说明文件先过一次小测。只要它能让 agent 更稳定地找到正确文件，这份 guidance 就已经从提示词变成了工程资产。

## 相关链接

- Probe-and-Refine 论文页面，https://arxiv.org/abs/2606.20512v1
- SWE-bench 项目页，https://www.swebench.com/
