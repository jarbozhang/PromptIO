# 合规事件日志

记录小红书合规规则触发、违规处置、机制验证和 prompt 调优的真实案例。

每个 entry 包含：日期、文章 slug、L6 触发情况、xhs-version 处理、经验沉淀。

参见 `docs/brainstorms/2026-04-24-xhs-compliance-requirements.md` 的合规规则源文档。

## 历史小红书违规处置（机制建立前）

| 日期 | 文章 | 处置 | 违规类型 |
|------|------|------|----------|
| 2026-04-23 | [[karpathy差点被黑客搞了-npm包安全吗\|Qwen3.6-35B 在笔记本上画的图比 Claude Opus 4.7 好]] (4/18 发布) | 不推荐给未关注用户 | 拉踩测评 |
| 2026-04-23 | [[github-42k-star-ai-english-guide\|跟着 GitHub 42k 星指南用 Gemini 学英语]] (4/21 发布) | 不可被他人查看 | 翻墙/境外软件 |
| 2026-04-20 | 7 个 AI 玄学 Skills（4/20 发布） | 不可被他人查看 | 封建迷信 |
| 2026-04-23 | 账号 PromptIO（103989869） | 警告升级 | 因玄学篇累计违规 |

> 这 4 次处置直接催生了四层防御机制（详见 `docs/plans/2026-04-24-001-feat-xhs-compliance-rules-plan.md`）。

## 2026-04-25：L6 机制首次实战验证

**背景：** 4/24 完成 U1-U8 全部规则落地后，4/25 是新规则首次完整跑一轮 daily pipeline，6 篇 drafts 经过自动合规检查。

### 验证结果汇总

| slug | REACH | L6 | xhs 触发条件 | xhs-version 状态 |
|------|-------|-----|--------------|------------------|
| [[gpt-5-5上openrouter-pro定价30美元百万token-simon提示词指南\|GPT-5.5 + 提示词指南]] | 9 | pass | reach >= 8 | 已生成 1171 字 |
| [[simon-willison实测deepseek-v4-接近前沿价格零头\|Simon 实测 DeepSeek V4]] | 8 | pass | reach >= 8 | 已生成 1080 字 |
| [[huggingface-ml-intern开源-自动读paper训模型一条龙\|HF ml-intern]] | 8 | pass | reach >= 8 | 已生成 1198 字 |
| [[unsloth-webui开源-本地跑gemma4-qwen3-5-deepseek图形界面\|Unsloth WebUI]] | 7 | pass | 不触发 | primary，主版本可发 |
| [[zhulinsen-daily-stock-analysis-llm驱动a股美股自动分析白嫖\|国产股票分析]] | 8 | **fail** | L6 fail + reach >= 8 | 已生成 1143 字 |
| [[tracer-cloud-opensre开源-ai-agent进军sre运维\|OpenSRE]] | 7 | pass | 不触发 | primary，主版本可发 |

### 关键案例：F《国产股票分析》L6 fail 事件

**触发原因：** QA L6 子代理判定标题和正文中反复出现的"白嫖"是小红书灰色词。

**值得记录的反常识发现：**
- "白嫖"在 `config/prompts/scoring.md` 的"REACH 三要素"里是被允许的利益点词（和"免费""不需要"并列）
- 但 QA L6 子代理基于"小红书规则更严"的判断，标记为 fail
- 这是规则分层的好处：选题门用宽松标准选，QA L6 用严格标准把关分发

**xhs-version 改写效果：**
- 标题：`整套架构白嫖跑` → `整套架构月费 0 元跑`
- 正文 5 处"白嫖/纯白嫖"全部替换为"零成本/免费/月费 0 元/几分钱/免费额度拼出来"
- 金融类内容额外加了"本文不构成任何投资建议，所有信息仅供学习交流，股市有风险"免责
- 字数从原版 1700 字压缩到 1143 字（小红书短一点更吃香）

**机制验证通过的链路：**
1. 选题门 `checkCompliance("daily stock analysis ... 白嫖")` 返回 skip=false（"白嫖"不在 SKIP_PATTERNS）→ 正常评分
2. 写作子代理生成主版本（L1-L5 全 pass）
3. QA L6 子代理识别"白嫖"为标题禁用句式 → l6_pass=false
4. overall_pass=true 不受 L6 影响（公众号正常发）
5. Step 4.6 触发条件 `l6_pass===false OR reach>=8` 满足 → xhs-compliant 子代理生成合规版
6. meta.yaml.platforms.xhs = compliant

### 关键案例：A/B/C reach>=8 主动触发

**意义：** 不是因为违规，而是因为内容价值高，主动出小红书合规版扩大分发。

- A GPT-5.5 + 提示词指南：标题"终于"等情绪词被 xhs 版去掉，价格表述软化（`$30` → "5/30 美元"），删除"那些手里攒了一堆 800 token 模板的资深提示词工程师可能会发现自己的护城河在缩"等略带攻击性表述
- B Simon DeepSeek V4：原文有 GPT-5.4 Nano、Claude Sonnet、Gemini-3.1-Pro 多家具名对比，xhs 版改为"国产大模型生态/小模型最便宜档/国际旗舰"模糊表述。**收获：即使原文是中性并列，跨厂商对比在小红书都是风险点，xhs prompt 后续可强化这条**
- C HF ml-intern：行动建议补"国内用户可以通过 hf-mirror 镜像和 OpenRouter 接 Claude"作为国内入口。**收获：xhs 版应该主动加"国内可访问入口"段，比单纯免责声明更有用**

### Wechat vs xhs 字数差

| 文章 | 公众号字数 | xhs 字数 | 压缩比 |
|------|-----------|---------|--------|
| A | 1778 | 1171 | 66% |
| B | 1564 | 1080 | 69% |
| C | 1771 | 1198 | 68% |
| F | ~1700 | 1143 | 67% |

**模式：** xhs-compliant 子代理稳定把字数压到原版 65-70%，符合"小红书短一点更吃香"的设计意图。

## 经验沉淀

### 已验证可靠的规则

1. **L6 不影响 overall_pass 是正确决策**：F 文章 overall_pass=true 但 L6 fail，主版本（公众号/X）正常发，只是小红书走 compliant 路径。如果 L6 影响 overall_pass，会有为合规牺牲公众号锐度的副作用。
2. **触发条件 `l6_pass===false OR reach>=8` 覆盖度合适**：4/25 6 篇里 4 篇触发（67%），既不是全触发浪费配额，也不是只 fail 才触发漏掉高价值文章。
3. **"白嫖"作为利益点词在选题门保留是对的**：选题门用宽松标准（不杀候选），QA 用严格标准（决定分发），分层职责清晰。
4. **xhs-compliant prompt 的"国内可访问入口"补充段是高价值改写**：C 文章主动补 hf-mirror + OpenRouter 入口，比单纯删除更有读者价值。

### 待优化的点

1. **跨厂商对比的边界更模糊**：B 文章在公众号是"中性并列"，但 xhs 版仍要进一步模糊化。`config/prompts/xhs-compliant.md` 可加一条"哪怕是中立对比也要去具名"的规则。
2. **金融类内容免责声明应该自动加**：F 文章是金融，xhs 版主动加了"不构成投资建议"。可以在 xhs-compliant prompt 里识别金融关键词（股票、基金、量化、回测、收益）触发自动免责段。
3. **agent 写文件时漏 slug 同名**：4/25 有 3 个写作子代理把文件写成 `article.md` 而不是 `{slug}.md`，需要手动重命名。SKILL.md Step 4 已说明但子代理仍会漏。下次可以在 prompt 里加更强约束（"文件名必须严格等于文件夹名"）。

### 下一步监控指标

- **小红书账号警告解除时间**：4/23 警告 + 30 天 = 2026-05-23 自动解除（如期间无新增违规）
- **新规则下小红书发文成功率**：从 5/23 解除后开始正式发 xhs-version，记录是否还有处置
- **L6 召回率**：累计统计 L6 fail 中真正会被小红书删的比例（理想 >80%），用以校准 QA prompt 的严格度

## 最后更新

2026-04-25
