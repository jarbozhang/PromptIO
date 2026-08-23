---
title: >-
  去 AI 味 Skills Top 10 -- 感谢 @juampitech 整理！ 咱们一起看看每个 Skill
  具体做了什么，哪些场景、用途该用哪个，组合起来用效果是否更好？！ # 10 个 Skills 分别是什么？ 1. stop-slop（Hardik
  Pandya）——以结构化规则去除 AI 痕迹，装机量最高，被多个技能引用为"结构规则"来源，是
source: X @shao__meng
url: 'https://x.com/shao__meng/status/2091003945737236959'
date: 'Sat Aug 22 03:26:04 +0000 2026'
likes: 79
reposts: 11
replies: 16
source_type: x
language: zh
account_name: shao__meng
fetched_at: '2026-08-22T11:05:07.395Z'
---
去 AI 味 Skills Top 10 -- 感谢 @juampitech 整理！

咱们一起看看每个 Skill 具体做了什么，哪些场景、用途该用哪个，组合起来用效果是否更好？！

# 10 个 Skills 分别是什么？

1. stop-slop（Hardik Pandya）——以结构化规则去除 AI 痕迹，装机量最高，被多个技能引用为"结构规则"来源，是该生态的奠基性技能。
2. no-ai-slop（Peter Yang）——定位"锐利的人类编辑"，强调最小有效修改与保留个人声音，提供编辑与检测两种模式。
3. humanizer（blader）——维基百科"AI 写作迹象"指南的技能化源头，被多方复用为模式目录基础。
4. unslop（Cursor 官方插件库）——官方来源，流程为扫描、重写、注入"灵魂"、自审残留痕迹。
5. slopbeth（ehmo）——追求每句承载信息的密集写作，引入奥威尔六规则与"证据边界"，自带脚本可重复验证。
6. humanizer（Adam Boudjem）——识别 53 种模式并打 0-100 分，套用声音配置，主动调整句长 burstiness，含 detect/rewrite/edit 三模式。
7. deslop（Stephen Turner）——唯一明确覆盖科研写作（论文、摘要、基金申请、审稿回复）的技能。
8. anti-slop（Matt Silverlock）——把"保留作者声音"设为首要指令，主张假阳性比残留 tell 更糟，只做外科手术式措辞修改。
9. humanize（aasha）——融合维基迹象、stop-slop 结构规则、brandonwise 统计检测三方，共 41 模式，强调不编造原文没有的事实。
10. anti-ai-slop-writing（jalaal）——前置写作约束指令，以禁用词表加结构硬规则（禁三段式、禁连续等长句、禁 parataxis、禁对冲摇摆）从写作时就生效。

# 按工作模式分类

单模式重写型包括 stop-slop、blader/humanizer、unslop——给文本即返回去 slop 版本，无独立检测态。

双模式型以 no-ai-slop 为代表，默认编辑，另设检测模式只点名模式并引用原句，不重写、不评分、不猜测是否 AI 所写。

多模式型有 Aboudjem/humanizer 与 slopbeth。前者三模式加 0-100 评分；后者含重写、批评、基准、检测器验证四种工作流。

审查导向型为 elithrar/anti-slop 与 deslop，偏重先指出问题所在而非直接重写。

前置写作约束型仅 anti-ai-slop-writing，它不是后处理，而是在写作时就生效的硬规则。

# 按适用内容分类

通用散文（文章、博客、通讯）首选 no-ai-slop，备选 stop-slop 或 unslop，理由是装机广、最小修改、社区验证充分。

学术与科研写作首选 deslop，备选 slopbeth。deslop 是唯一明确覆盖论文、摘要、基金申请、审稿回复的技能；slopbeth 的密集写作风格也适合技术内容。

短文本（推文、邮件、消息）首选 anti-ai-slop-writing，备选 no-ai-slop。前者显式覆盖短文本，结构硬规则在短文中最显效。

任意或不确定类型首选 aasha/humanize，备选 Aboudjem/humanizer。前者模式目录最全（融合三方 41 模式），通用性最强。

# 按方法论取向分类

最小修改、保留声音派以 no-ai-slop 与 elithrar/anti-slop 为代表，主张删套公式而留作者会辩护的刻意选择，认为假阳性比残留 tell 更糟。

注入声音、灵魂派以 unslop 与 Aboudjem/humanizer 为代表，认为无灵魂的平淡文本同样可疑，故用 voice profile 主动注入个性。

结构硬约束派以 anti-ai-slop-writing 与 stop-slop 为代表，从句长、三段式、parataxis 等结构层根治，而非逐词修补。

信息密度派以 slopbeth 为代表，目标是每句都承载信息的密集写作，而非"检测器认不出"。

证据、事实边界派以 slopbeth 与 aasha/humanize 为代表，原文没有的事实不得编造，模糊表述转为待证问题或显式归因。

统计可测检测派以 Aboudjem/humanizer、aasha/humanize、anti-ai-slop-writing 为代表，靠句长 burstiness、0-100 评分、等长句检测等可重复检验的信号。

# 组合安装建议

轻量日常可单装 no-ai-slop，一个技能即覆盖编辑与检测，满足大多数日常写作。

全覆盖单装可选 aasha/humanize，它已含三方模式目录，省去再装 stop-slop 与 blader/humanizer。

官方加保守审查可用 unslop 加 elithrar/anti-slop，前者负责官方重写，后者做严格保留声音的审查兜底。

科研组合用 deslop 加 slopbeth，前者覆盖科研场景，后者补事实边界与密集写作。

结构根治加量化用 anti-ai-slop-writing 加 Aboudjem/humanizer，前者在写作时施加硬约束，后者在改后评分验证。
