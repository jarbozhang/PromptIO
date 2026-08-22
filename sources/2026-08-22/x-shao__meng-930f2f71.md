---
title: >-
  Harness 这个被喊滥了的词，到底是什么？ Model ≠ Agent，让 Model 变成 Agent 的，就是 Harness！所以 Agent =
  Model + Harness 吗？ Pi 团队认为这个公式虽然太过简化，但方向是对的。模型负责理解和生成；真正让它能“做事”的，就是
  Harness。它给模型一个可操作的环境：告诉它该怎么表现、能用什
source: X @shao__meng
url: 'https://x.com/shao__meng/status/2090461025032392844'
date: 'Thu Aug 20 15:28:41 +0000 2026'
likes: 71
reposts: 17
replies: 24
source_type: x
language: zh
account_name: shao__meng
fetched_at: '2026-08-22T11:05:07.395Z'
---
Harness 这个被喊滥了的词，到底是什么？

Model ≠ Agent，让 Model 变成 Agent 的，就是 Harness！所以 Agent = Model + Harness 吗？

Pi 团队认为这个公式虽然太过简化，但方向是对的。模型负责理解和生成；真正让它能“做事”的，就是 Harness。它给模型一个可操作的环境：告诉它该怎么表现、能用什么工具、如何一轮轮推进任务，以及如何接到不同厂商的模型上。

文章：What is a Harness?
https://t.co/kAhKD0Eisf

# Agent Harness 的四个组成部分

1. System Prompt
模型自带训练阶段内化的规则（如 Claude 的"soul document"），而 Harness 中的 system prompt 更像是新员工入职第一天拿到的操作手册——尚未内化，但工作时须遵循。它随每次对话注入，约束模型在该 Harness 语境下的行为方式。

2. Tools
工具是用代码实现、可供模型"调用"的能力，例如网页搜索、写并执行代码、撰写邮件。Harness 既描述工具，也提供工具的实现。关键在于：Harness 通常不规定何时使用哪个工具，而是把工具摆好、讲清楚，由模型自行判断调用时机与方式。

3. Agentic Loop
这是 Harness 的行为骨架。以"对比本地小学排名与成绩并给建议"为例，循环大致为：
  1. 理解请求 → 生成搜索查询；
  2 拿到结果后自行评估，若不足则再次搜索（第一次"循环"）；
  3. 调用写代码工具生成电子表格、做计算、格式化；
  4. 把产出与原始请求对照，不满意则回到搜索（再次"循环"）；
  5. 满意后调用 ComposeEmail 工具撰写邮件并附上表格；
  6. 自审完成，循环关闭，邮件送达用户。
模型在循环中自主决定是否重做、何时收尾，这正是"agentic"区别于一次性问答的本质。

4. Translation Layer
翻译层让同一套 Harness 能对接不同厂商的模型——Anthropic、OpenAI，或开源权重模型。价值有两层：
· 能力组合：可在同一次循环中按任务特长混用不同模型；
· 用户主权：把议价权和选择权从 AI 实验室转移到终端用户手中。用户可对同一请求分别调用三家模型，比较结果与成本，并把所有会话保留在自己的本地副本里，而不是散落在三家厂商的三个 app 中。

为什么"拥有自己的 Harness"重要
· 可拥有、可改造：像攀岩安全带一样，Harness 可被改 system prompt、加扩展、适配个人工作流。Earendil 的开源 Harness「Pi」已被用户共享了 5000+ 扩展，免费、本地运行、归用户所有。
· 对抗集中化：主流 Harness 早期并非中立，而是绑定单一厂商模型。近期 OpenClaw、OpenCode、Hermes、Pi 等开源中立 Harness 的兴起，让用户重新获得"用谁的模型、把数据留在哪、以何种方式与机器对话"的选择权。
· 捍卫人的能动性：面对日益庞大的 AI 公司，作者主张不是回避技术，而是用清醒的眼光和稳固的握把去驾驭它——"我们挥舞锤子，而不是让锤子挥舞我们"。
