# X 账号质量分层

基于 15 天采集数据的账号产出和选题命中率。

## Tier 1 — 高价值信号源（经常产出选题）

| 账号 | 类型 | 互动量 | 选题命中 | 备注 |
|------|------|--------|---------|------|
| @karpathy | 思想领袖 | 5K-25K likes | 4 篇文章 | 频率太高需降权 |
| @OpenAI | 官方 | 2K-16K likes | 9 篇文章（含间接） | 最高频源 |
| @AnthropicAI | 官方 | 3K-43K likes | 4 篇文章 | 稳定高质量 |
| @ggerganov | 开发者 | 100-3K likes | 3 篇文章 | [[local-inference|本地推理]]专属 |
| @simonw | 博主 | 200-1.5K likes | 2 篇文章 | 实操密度极高 |

## Tier 2 — 中等价值（偶尔产出选题或提供佐证）

| 账号 | 类型 | 互动量 | 备注 |
|------|------|--------|------|
| @fchollet | 评论者 | 200-2K likes | 批评视角，4 次引用 |
| @emollick | 学者 | 250-1.5K likes | 分析视角 |
| @GoogleDeepMind | 官方 | 1.5K-8.7K likes | 产品发布信号 |
| @huggingface | 官方 | 500-1K likes | 技术操作指南 |
| @swyx | 开发者 | 200-300 likes | AI engineering 视角 |
| @ylecun | 学者 | 400-850 likes | 学术争论 |

## Tier 3 — 低价值但保留（补充信号）

大部分 home timeline 账号属于此类。中文 AI 社区账号产出量大但多为转述/翻译，偶尔有原创实操内容。

**高互动中文账号（值得关注）：**
- @dachaoren — 10K+ likes 的 [[claude-code|Claude Code]] 教程推文
- @berryxia — Stanford 课程翻译系列（6K likes）
- @safaricheung — Opus 4.6 体验（1.3K likes）
- @VincentLogic — 视频汉化工具等实操内容（1.4K likes）
- @dingyi — 资源合集类（3.3K likes）

## 待评估

以下账号在 config 中但 15 天内未产出高价值内容，需要更长观察期：
jimfan, jeffdean, GaryMarcus, hardmaru, sama, darioamodei, ilyasut
