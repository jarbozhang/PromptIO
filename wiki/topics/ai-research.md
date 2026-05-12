# 主题追踪：AI 研究 / 论文

LLM / 强化学习 / 推理模型 / 多模态领域的论文拆解与方法论。重点关注"工程可复现"角度的拆解，对国产团队（DeepSeek 等）有方法论参考价值的内容。

## 当前观察

- **RLVR / GRPO 拆解** (2026-04-23) — [[sebastian-raschka|Sebastian Raschka]] 系统性梳理让 LLM 推理追上 o3 的几个关键拼图：规则化奖励、组内相对优势、训练数据/模型规模配比
- **Anthropic Nature 论文** (2026-04-16) — Anthropic 投 Nature 的研究覆盖

## 我们的覆盖

| 日期 | 文章 | 角度 |
|------|------|------|
| 2026-05-10 | [[deepmind-alphaevolve-gemini编程agent解实际问题\|DeepMind AlphaEvolve 把 Gemini 编程 agent 推到真实问题，国产 coding agent 该看的是这套思路]] | evaluator-loop / 工业搜索任务 / 国产路径建议 |
| 2026-05-10 | [[nathan-lambert-china-ai-labs-western视角访谈\|Nathan Lambert 跑了一圈中国 AI lab，写了一份 Western 视角内部观察]] | Western KOL 内部观察 / 国产 lab 文化 |
| 2026-05-08 | [[raschka开源coding-llms-from-ground-up-从零搭claude-code\|Raschka 开源 Coding LLM From the Ground Up 完整课程]] | KOL 教程开源 / AI 教育 / 从零搭 Claude Code |
| 2026-05-06 | [[gpt-5-5-instant替换chatgpt默认模型-幻觉率降了\|ChatGPT 默认模型悄悄换了，OpenAI 把幻觉砍掉一半]] | Instant 变体 / 幻觉率方法 / system card |
| 2026-05-06 | [[openai物理学家lupsasca谈vibe-physics\|OpenAI 物理学家 Lupsasca 谈 Vibe Physics，AI 这次写的不是代码是论文]] | Vibe Physics / AI 协助科研 / 方法论 |
| 2026-05-06 | [[learningcircuit-95-simpleqa-qwen3-6-27b-3090本地深度研究\|一张 3090 跑 Qwen3.6-27B，本地深度研究 agent 干到 95.7% SimpleQA]] | 本地深度研究 / 开源 agent 复现 / 评测 |
| 2026-05-05 | [[dexter-开源自主金融研究agent-409星\|散户每天看不完几十份研报，我让 dexter 帮我跑了一天]] | 研究 agent / 自动化研报 |
| 2026-05-03 | [[openclaw-367k星-claw-eval-live-13个前沿模型最高66-7\|openclaw 367k 星了，又一篇 arxiv 用 ClawHub Top-500 把 13 个前沿模型卡在 66.7% 过不去]] | Claw-Eval-Live arxiv 论文 / 评测信号源 |
| 2026-05-03 | [[sebastian-raschka拆coding-agent五大组件-国产claude-code平替差距\|Sebastian Raschka 把 coding agent 拆成 5 块 — 看完知道国产 Claude Code 平替差在哪]] | coding agent 五大组件方法论 |
| 2026-05-01 | [[musk当庭承认xai蒸馏grok-国产模型蒸馏边界\|Musk 当庭承认 xAI 用 OpenAI 模型蒸馏 Grok，国产模型蒸馏的边界又被推了一下]] | 蒸馏方法论 / 法律边界 |
| 2026-05-01 | [[openai-goblins后续-rlhf训练副作用\|OpenAI 解释为什么 GPT-5 一直说 goblin，被 Wired 翻出来后官方写了个回应]] | RLHF / reward hacking 训练副作用 |
| 2026-04-25 | [[gpt-5-5上openrouter-pro定价30美元百万token-simon提示词指南\|GPT-5.5 上 OpenRouter + Simon 提示词指南]] | KOL 写法指南/方法论 |
| 2026-04-25 | [[simon-willison实测deepseek-v4-接近前沿价格零头\|Simon Willison 实测 DeepSeek V4]] | KOL 实测 + 前沿能力评估 |
| 2026-04-25 | [[huggingface-ml-intern开源-自动读paper训模型一条龙\|HuggingFace ml-intern 自动读 paper 训模型]] | AI 自动化研究 / Agent 化 ML 研究 |
| 2026-04-24 | [[gpt-5-5发布-openai生物红队赏金25000美元\|GPT-5.5 System Card + Bio Bug Bounty]] | 模型安全评估方法论 |
| 2026-04-23 | [[sebastian-raschka拆rlvr-grpo让llm推理追上o3的几个关键\|Sebastian Raschka 拆 RLVR + GRPO]] | 强化学习 / 推理模型方法论 |
| 2026-04-16 | Anthropic Nature 论文 | 研究综述 |
| 2026-04-30 | [[chatgpt卸载量飙132-国产ai抢用户窗口期\|ChatGPT 卸载量同比涨 132%，国产 AI 抢用户的窗口期]] | 行业分析 / DAU 转移 |
| 2026-04-30 | [[智谱z-ai公开glm-5大规模部署retro\|智谱 z.ai 公开 GLM-5 大规模部署 retro，coding agent serving 翻车的几个瞬间]] | 国产大规模部署 retro / SRE |

## 相关实体

- [[sebastian-raschka|Sebastian Raschka]] — RLVR/GRPO 拆解作者
- [[simon-willison|Simon Willison]] — GPT-5.5 提示词指南 / DeepSeek V4 实测
- [[huggingface|HuggingFace]] — ml-intern 自动化研究 Agent 出品方
- [[deepseek|DeepSeek]] — RLVR/GRPO 方法论的国产应用方 / V4 海外实测对象
- [[openai|OpenAI]] — o3 / o-series 推理模型对照 / GPT-5.5 System Card
- [[anthropic|Anthropic]] — 研究输出方

## 相关主题

- 强化学习
- 推理模型
- 国产AI生态（方法论应用）

## 饱和度评估

**中等饱和** — 6 篇/18 天。4/25 +3 篇（GPT-5.5 + Simon 提示词指南 / Simon 实测 V4 / HuggingFace ml-intern 自动化研究 Agent），从 3 跃升到 6，AI 研究/方法论侧首次形成稳定供给。后续选题门槛仍然要求"拆解到位且对中文读者有可操作性"，重点关注：1) 国产模型官方技术报告解读；2) HuggingFace ml-intern 类自动化研究 Agent 的复现案例；3) KOL 长文（Karpathy / Raschka / Chip Huyen / Simon）。
