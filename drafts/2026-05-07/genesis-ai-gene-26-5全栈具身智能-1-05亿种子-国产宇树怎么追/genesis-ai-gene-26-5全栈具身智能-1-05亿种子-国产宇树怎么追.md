# Khosla 押 1.05 亿种子轮，Genesis AI 用机械手切番茄弹钢琴，国产宇树小鹏怎么追

---
相关实体:: [[genesis-ai|Genesis AI]] | [[khosla-ventures|Khosla Ventures]] | [[unitree|宇树]] | [[xpeng|小鹏]] | [[xiaomi|小米]] | [[boston-dynamics|Boston Dynamics]]
相关主题:: [[embodied-ai|具身智能]] | [[ai-mergers|AI 行业并购]] | [[chinese-ai|国产 AI]]

5 月 6 日，TechCrunch 放出一段视频，一双类人机械手在镜头前打鸡蛋、切番茄、弹钢琴、解魔方。

视频底下的字幕是 Genesis AI 的第一款模型 GENE-26.5。再往下翻，是 Khosla Ventures 和 Eclipse 共同领投的 1.05 亿美元种子轮，2025 年 7 月就已敲定，公司憋到现在才拿出第一份 demo。

种子轮 1.05 亿美元，按今天的标准也是顶配。同时段国产具身智能赛道里，宇树 2024 年那轮 C+ 也才接近 10 亿人民币级，估值已经接近独角兽。Genesis AI 一上来就把"种子"打到这个量级，等于说硅谷 VC 默认这条赛道的入场券就是九位数。

## 这不是又一家做机器手的公司

打开 TechCrunch 那篇报道，CEO 周咸（Zhou Xian）自己讲了一句很直白的话，"现在大概有 50 到 100 家做机械手的公司"。所以问题不是"还差不差一家"，而是 Genesis AI 凭什么挤进 Khosla 视野。

答案藏在"full stack"三个字里。

大多数机器人创业公司只做一头，要么纯卖硬件（夹爪、关节模组），要么纯做模型（VLA、模仿学习算法）。Genesis AI 同时做基础模型 GENE-26.5 + 自研类人机械手 + 一只塞了传感器的数据采集手套。

那只数据手套是关键。具身智能现在最难的不是模型，是数据。没有人愿意为了训练机器人，花上千小时戴着笨重传感器手套切番茄。Genesis AI 把手套做得"轻、易戴"，让人正常做家务的过程就是数据采集过程。模型再用"海量网络人类视频"补全长尾。

公司同时透露，"全身机器人即将发布"。也就是说机械手只是开胃菜。

## demo 里到底拍了什么

根据 TechCrunch 描述，演示任务包括，打鸡蛋、切番茄、做奶昔、弹钢琴、解魔方、实验室操作。

Reddit r/singularity 那条 235 赞 72 评论的帖子里，有一条评论被顶到 27 赞，"就算它比人贵 3 倍，也比人力便宜，因为它不用休息、不要假期"。这条评论代表了硅谷读者对 demo 的真实读法，不是惊艳于技术，是开始算账。

但 demo 视频本身有几个要看清楚的地方。

一，没有给出任务成功率。打 1 个鸡蛋 vs 打 100 个鸡蛋的稳定性差着量级，demo 通常是精挑细选的高光镜头。

二，没有公开模型参数量、训练数据规模。Genesis AI 至今没在 arxiv 发任何论文，所有信息都是创始人 PR 口径。

三，明确的同行竞争对手是 Physical Intelligence（π0、π0.5）和 Skild AI。这两家都已经发了技术报告，Genesis AI 选择先放视频不放论文，节奏更像产品发布而非学术发布。

## 国产对照，分工各有侧重

聊到国产，不要急着拉踩。具身智能是一条长赛道，Genesis AI 和国产团队走的不是同一段路。

**宇树 H1/G1**，宇树的策略是先把双足机器人量产到 1-2 万人民币价格段，G1 在 B 站、抖音的舞蹈视频和体操动作已经成了出圈素材。宇树的强项是运动控制（locomotion），机械手目前还是次要议题。

**小鹏 IRON**，2025 年广州车展首发的人形机器人 IRON，定位是工厂场景的双足搬运。背靠小鹏汽车的供应链和制造能力，硬件迭代速度快，但模型层面更多是行业方案集成。

**小米 CyberOne**，小米路线偏家用，目前公开 demo 多停留在打招呼、握手、简单递物。

**智元 GO-1**，稚晖君创立的智元，2025 年 GO-1 主打通用具身大模型 ViLLA，是国产里走 VLA 路线最公开透明的一家，已经在 GitHub 开源了部分代码。

简单看，宇树在硬件量产上领先，智元在模型开源上领先，小鹏在产业落地上领先。Genesis AI 把"模型 + 类人机械手 + 数据手套"打成一个全栈包，这是另一条路径选择，不是优劣判断。

VLA（视觉语言动作）路线现在已经基本是行业共识，但具体怎么解决数据问题各家差异很大。Physical Intelligence 走遥操作（teleoperation）+ 仿真，Skild AI 走"通用基础模型 + 多机型适配"，Genesis AI 走"日常穿戴手套被动采集"。国产里智元偏遥操作，宇树偏运动捕捉。

## 我的判断

Genesis AI 这轮 1.05 亿种子轮，最值得关注的不是钱，是 Khosla 和 Eclipse 一起押了"全栈"路径。

过去两年具身智能的主流叙事是"硬件归硬件、模型归模型，分工合作"。Tesla Optimus 用 Tesla 的供应链 + xAI 的模型，Boston Dynamics Spot 用 Hyundai 的硬件 + Google 的 Gemini Robotics。这种分工逻辑下，创业公司只能做一头。

Genesis AI 的全栈路线在赌另一种可能，数据飞轮、模型迭代、硬件设计三者必须同一家公司控制，才能跑出真正的具身智能。这和 OpenAI 早期坚持自己训模型自己做产品（而不是只卖 API）是同一个逻辑。

对中国读者，这件事的真实含义不是"差距又拉大了"，而是国产团队需要回答一个新问题，自家的数据采集策略到底是什么。光有硬件量产能力不够，光开源模型也不够，谁先在"用户端被动采集"这件事上找到中国场景的答案（外卖员？家政阿姨？流水线工人？），谁就有机会在下一轮拉开身位。

至于 demo 里那双切番茄的机械手能不能成为产品，先看 Genesis AI 接下来三个月有没有放出任务成功率数据，以及那只全身机器人到底什么时候发。视频好做，复现难。

## 相关链接

- TechCrunch 原报道，<https://techcrunch.com/2026/05/06/khosla-backed-robotics-startup-genesis-ai-has-gone-full-stack-demo-shows/>
- Genesis AI 官方博客，<https://www.genesis.ai/blog/gene-26-5-advancing-robotic-manipulation-to-human-level>
- Reddit r/singularity 讨论串，<https://www.reddit.com/r/singularity/comments/1t5lxmh/genesis_ais_gene265/>
- 智元 GO-1 ViLLA 开源仓库（国产 VLA 参考），<https://github.com/AgibotTech>

<!-- REACH: 7/10 | 品牌✓ 利益点✗ 可操作✓ -->
