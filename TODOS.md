# TODOS

## Deferred from Viral Content Engine (2026-04-01)

### Prompt Eval Framework
- **What:** 建一个简单的 eval 脚本，拿固定 topic 跑 prompt 对比前后输出质量
- **Why:** 4 个 prompt 文件（wechat.md, title-scorer.md, gold-quote.md, summary.md）没有自动化质量验证，每次改 prompt 只能肉眼看效果
- **Trigger:** 发布 10 篇文章后
- **Effort:** S (CC: ~15min)

### Word Count Validation
- **What:** 在 phaseGenerate() 后统计生成文章中文字数，超出 1000-1800 范围时 log 警告
- **Why:** LLM 经常不遵守字数限制，需要数据来判断是否需要加强 prompt 约束
- **Trigger:** Phase 1 实现后即可加
- **Effort:** XS (CC: ~5min)

### Phase 3: Multi-Template System
- **What:** 根据 topic 类型（工具测评/论文解读/社区讨论）选择不同的爆款模板
- **Why:** 不同内容类型的最优结构不同
- **Trigger:** 发布 10 篇后，有数据验证哪些类型表现更好
- **Depends on:** Prompt Eval Framework

### Phase 3: Emotion Arc Detection
- **What:** 检测文章的情绪节奏是否符合爆款曲线
- **Why:** 十万加文章通常有特定的情绪起伏模式
- **Trigger:** 有读者反馈数据后
- **Effort:** M

### Phase 3: Title Score Calibration
- **What:** 用真实阅读数据校准 LLM 标题评分维度和阈值
- **Why:** LLM 自评分缺乏外部基准，可能是安慰剂效果
- **Trigger:** 积累 20+ 篇文章的阅读数据后
