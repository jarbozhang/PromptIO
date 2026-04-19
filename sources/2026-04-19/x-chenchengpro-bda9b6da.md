---
title: "Garry Tan 提炼了他在 agentic engineering 领域的核心心法：Fat Skills, Fat Code, Thin Harness。  简单说就是三层分离：把需要判断的模糊操"
source: "X @chenchengpro"
url: "https://x.com/chenchengpro/status/2043697811993350611"
date: "Mon Apr 13 14:28:23 +0000 2026"
likes: 336
reposts: 52
replies: 5
---

Garry Tan 提炼了他在 agentic engineering 领域的核心心法：Fat Skills, Fat Code, Thin Harness。

简单说就是三层分离：把需要判断的模糊操作推入 markdown 技能文件（Fat Skills），把必须精确执行的确定性逻辑写成代码（Fat Code），框架本身只做最基础的连接（Thin Harness）。用他的话说："在正确的层做正确的事，其他都是架构天文学。"

这个思想的精髓在于他给 AI Agent 设的一条铁律：你不允许做一次性工作。如果某件事将来还会做，就先手动跑 3-10 个样本，批准后固化成技能文件。如果需要自动运行，就设 cron。测试标准很简单：如果我为同一件事问你两次，你就失败了。

这条指令拿到了 1000+ 赞和 2500+ 书签，因为它击中了本质：每个技能文件都是系统的永久升级，不会退化、不会遗忘、凌晨 3 点也在跑。

社区讨论也很有料。Sam Ward 说他们团队就是这么干的——智能体的智能全在启动时加载的 markdown 里，框架只管连模型和工具。要升级智能体就改 markdown，不动代码。Claudia 补充说边界会自然迁移：确定性代码一旦需要上下文判断就会被拉进技能层，当你不再对抗这种迁移，架构就稳了。

这其实是 Unix "do one thing well" 在智能体工程的翻版。人类花了 50 年才学会这个教训，现在在 AI Agent 领域快速重演一遍。大多数智能体系统脆弱的根源就是框架太胖，在框架层做了太多推理和编排。

Garry 举了个实战案例：他们用技能文件管理 YC 创始人活动的反馈循环。技能文件自动读反馈、识别模式、生成改进建议，然后重写自己。7 月活动 12% 的"还好"评分，下次活动降到 4%。这就是技能文件自我进化的威力。

100x 生产力不是靠更聪明的模型，而是 Fat Skills + Thin Harness + 把一切固化的纪律。下一个更好的模型出来，所有技能自动受益——潜在空间的判断力提升，确定性层保持完全可靠。

这是我见过对 agentic engineering 最清晰的架构原则。
