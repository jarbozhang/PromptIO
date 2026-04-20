---
date: 2026-04-20
topic: content-positioning-pivot
---

# 内容定位转型：从"英文信息差"到"中国用户行动力"

## Problem Frame

当前内容管线定位为"英文→中文信息差"——专做量子位/机器之心还没覆盖的英文一手信息。但实际运营发现三个结构性问题：

1. **时效上赢不了全职团队**：量子位/机器之心是 7×24 全职编辑覆盖英文信息，个人管线在速度上没有竞争力
2. **中文读者不为"英文来源"买单**：读者只问"对我有用吗"，不关心信息是从 HN 还是 Reddit 来的
3. **选题与受众脱节**：传播力最强的内容（MiniMind、AI 玄学 Skills、NVIDIA 免费 Key）恰恰不是英文搬运，而是"帮读者发现能立刻动手的东西"

真正有价值的信息差不是语言维度，而是：功能发现（隐藏功能曝光）、小圈子→大众（社群内部流传的玩法）、专家→普通人（用人话讲透复杂概念）。

## Requirements

**选题定位（R1-R3）**

- R1. 内容定位从"英文→中文信息差"转为"帮中国 AI 用户发现能立刻动手的东西"
- R2. 信号源采用混合模式：保留英文 RSS/X/GitHub 作为发现机制之一，新增中文平台信号源（TrendRadar 聚合 35+ 平台）
- R3. 选题不再以"英文源是否已被中文媒体覆盖"为核心过滤条件，改为"中国用户是否能立刻行动"

**内容角度（R4-R5）**

- R4. 覆盖四个内容方向，无固定配比，质量优先：
  - AI 工具实测/省钱攻略（免费 Key、白嫖方案、横评对比）
  - AI 变现/赚钱实操（闲鱼/小红书/淘宝自动化、独立开发者案例）
  - 国产 AI 生态深度（DeepSeek/豆包/Kimi/元宝的功能发现、隐藏技巧、版本解读）
  - AI+中国特色场景（微信生态 AI 集成、AI 玄学、AI+电商、AI+教育）
- R5. 英文源内容仍可选题，但必须通过同一套评分标准——不再因为"英文社区在讨论"而加分

**评分体系重写（R6-R7）**

- R6. 评分公式从 `novelty*0.4 + practicality*0.35 + depth_potential*0.25` 改为：
  ```
  score = actionability*0.35 + novelty*0.25 + reach*0.25 + depth_potential*0.15
  ```
  - **actionability (1-10)**：中国用户看完能否立刻动手？10 = 下载/打开/输入命令就能用，1 = 纯观点无法行动
  - **novelty (1-10)**：对目标读者的新鲜度。10 = 完全没见过，1 = 已经被广泛报道
  - **reach (1-10)**：即 REACH 分数（见 R7 的三要素定义）。10 = 三要素全满，1 = 零要素
  - **depth_potential (1-10)**：能否加入独特的实操洞察。10 = 可以亲自跑一遍出结果，1 = 只能转述

- R7. REACH 评估标准更新。REACH 分数 = R6 中的 `reach` 维度，三要素定义：
  1. 品牌认知：标题里有**中国读者认识的**品牌/人名（Google、OpenAI、DeepSeek、微信、Karpathy、雷军）
  2. 利益点：标题里有明确好处（"免费""省X元""月入X""一键""不需要"）
  3. 可操作：读者看完能立刻动手试（下载 app、跑命令、打开网页、扫码体验）
  - 三要素全满 = REACH 9-10，满足 2 个 = REACH 7-8，满足 1 个 = REACH 5-6，零要素 = REACH < 5
  - 选题门槛：REACH >= 7（至少满足 2 个要素）

**信号源扩充（R8-R10）**

- R8. 集成 TrendRadar 作为中文信号源，配置 AI 关键词过滤，输出存入 `sources/{date}/` 目录。**这是本次转型的 Day 0 前置任务**——Success Criteria 中"30% 选题来自中文信号源"依赖此项
- R9. TrendRadar 采集加入每日流程的脚本信号源采集阶段（与 `npm run fetch:trending` / `fetch:openrouter` / `fetch:pypi` 并行运行）
- R10. TrendRadar 源文件的 frontmatter 格式与现有 source 文件一致，source 字段标记平台来源（如 `"知乎热榜"` `"B站热门"` `"小红书热点"`）

**写作指南更新（R11-R12）**

- R11. wechat.md 中的"英文→中文信息差"定位描述更新为新定位
- R12. 去掉"不把社区按语言对立"等基于英文/中文对立的写作规则，替换为适用于混合信源的规则。省钱攻略和变现拆解类选题使用现有的"工具实测型"和"方法论型"原型即可，不新增原型

**产出量与配置（R13-R15）**

- R13. 保持 REACH >= 7 的质量门槛不变
- R14. 目标每日合格选题 10-20 个（取决于当日信号源质量），通过扩充信号源和放宽主题范围来增加合格选题数量
- R15. CLAUDE.md 和 config/prompts/scoring.md 按新定位和新公式更新

## Success Criteria

- 选题阶段能从中文信号源中发现至少 30% 的选题（目前为 0%）
- 每日 REACH >= 7 的合格选题数从目前的 5-8 个提升到 10-20 个（具体取决于当日信号源质量）
- 文章标题和角度让中文读者感到"这是写给我的"而非"这是翻译过来的"

## Scope Boundaries

- 不做短视频/B站视频内容，只做图文
- 不做付费课程/知识星球等变现产品，只做免费公众号内容
- TrendRadar 集成不需要修改 TrendRadar 源码，只做 API 调用/数据转换
- 不改变现有的 git-as-database 架构和 draft/approved/published 状态机

## Key Decisions

- **混合模式而非全面转向**：英文信源保留（仍有价值），但不再享受评分特权。选题标准统一为"中国用户行动力"
- **评分公式重写**：actionability 权重最高（0.35），novelty 降权（0.25），reach 维度统一 REACH 三要素评分
- **不设固定内容配比**：四个方向不预分比例，每天由当日信号源质量决定，质量优先
- **REACH 门槛不降**：通过扩充信号源来增量，不通过降标准来凑数

## Dependencies / Assumptions

- TrendRadar 的 API/数据格式需要在 planning 阶段确认
- 假设 TrendRadar 可以通过 Docker 本地部署或直接调用其数据接口
- 现有 X 账号列表中的中文 KOL（宝玉、9hills、VincentLogic 等）继续保留

## Outstanding Questions

### Deferred to Planning

- [Affects R8][Needs research] TrendRadar 最佳集成方式：Docker 本地部署 vs API 调用 vs 直接抓取其 JSON 输出？（Day 0 优先级，阻塞中文信号源上线）
- [Affects R8][Technical] TrendRadar 的 AI 关键词过滤配置：哪些关键词能最有效地过滤出 AI 相关内容？

## Next Steps

→ `/ce:plan` for structured implementation planning
