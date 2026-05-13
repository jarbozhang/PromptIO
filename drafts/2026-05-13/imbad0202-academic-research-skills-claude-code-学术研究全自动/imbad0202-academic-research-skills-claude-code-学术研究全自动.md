# Imbad0202 单日 +293 星 academic-research-skills，把 Claude Code 改造成学术研究流水线，毕设党直接抄配置

今天早上扫 GitHub Trending，看到一个我没见过的名字，Imbad0202/academic-research-skills，单日新增 293 星，语言是 Python。点进去 README 第一段写得很挑衅，"AI is your copilot, not the pilot. This tool won't write your paper for you."

我盯着这句话愣了两秒。过去三天我连写过 mattpocock/skills、anthropics/skills、affaan-m/everything-claude-code 三篇 skills 主题，主角全是工程师生态。今天突然冒出来一套学术研究 skills，把 research、write、review、revise、finalize 五步做成 Claude Code 流水线，目标用户是科研学生、研究生、毕设党。

我把整套配置摸了一遍，结论是这是我这一个月里看到的**最适合中国高校学生抄的 skills 包**，没有之一。

## 先把这套 skills 的骨架讲清楚

仓库根目录摆着四个核心 skill 包，每个包是一组 agent 协作。

`deep-research/` 是 13 个 agent 组成的研究队伍，跑 7 个模式，覆盖文献调研、Socratic 引导、系统综述、意图识别。意思是你扔一个题目进去，它会先问你"你是探索阶段还是定向阶段"，避免一上来就 lock 死方向。

`academic-paper/` 是 12 个 agent 的写作流水线，10 个模式，从风格校准到写作质量审查全包。

`academic-paper-reviewer/` 是 7 个 agent 的同行评议系统，6 个模式，里面塞了 EIC（主编）+ 3 个 reviewer + Devil's Advocate 一个反方角色。Devil's Advocate 在反驳前必须给自己打一个 1-5 分的反驳强度分，只有 ≥4 才允许让步。这个机制是用来反结构性谄媚的。

`academic-pipeline/` 是 10 阶段的总编排器，把上面三套串起来，关键节点是 2.5 阶段和 4.5 阶段两道 integrity gate，硬卡，不能跳。

外围还有 `commands/` 里 10 个 `/ars-*` 斜杠命令（`/ars-plan`、`/ars-lit-review`、`/ars-write` 这种），`hooks/` 里一个 SessionStart 通知钩子，`shared/` 里跨 skill 共用的 schema 和模板，`examples/showcase/` 里塞了真实跑出来的论文 artifact 当样例。

整套读完我的感觉是，作者不是写了一个工具，是把"一篇论文从选题到提交"的完整教学流程编码进了 agent 系统。

## 这套和我前几天写的那些 skills 包差在哪

mattpocock/skills 是个人日常工作流的开源，颗粒度小、原子化、命名像 Unix 动词。anthropics/skills 给的是 SKILL.md 规范和四个文档处理 demo。affaan-m/everything-claude-code 是 agent harness 优化大全。

这三个都假设你已经知道自己要干嘛，给你工具。

Imbad0202 这套反过来，假设你**不知道**自己研究应该怎么推进，所以把学术训练流程整个塞进了 skill 里。它的 Stage 1 RESEARCH 不是搜文献，是 Socratic guidance，先问你一堆问题把意图聊清楚。Stage 2.5 INTEGRITY GATE 是发布前的反幻觉检查，7 个 mode 的失败模式清单挨个过。Stage 6 是流程总结，自动生成一份"6 维度协作质量评估"，告诉你这一篇论文里你和 AI 的分工是健康的还是 AI 写得太多。

这是把学术导师的角色拆给 AI 做了。

## 三个我看到就想抄的设计

**第一个是 Anti-Sycophancy 反谄媚机制。**

Devil's Advocate 在跟你辩论前必须先给自己的反驳意见打分，只有 ≥4 分才允许后续让步。同一个 session 里不允许连续两次让步，每次 checkpoint 后还要检测有没有 frame-lock（被你框死思路）。

为什么这个重要。我自己做技术写作的时候，反复遇到 Claude 给我点头同意。我说什么它都觉得有道理。这套机制等于强行让 agent 先 commit 一个 score 再行动，避免它出于"对话润滑"的目的乱让步。

**第二个是 Material Passport 物料护照。**

`shared/schemas/material_passport.json`（Schema 9）会跟着每一份文献走，记 provenance（出处）、reset boundaries（重置边界）、literature corpus（语料范围）。它还允许标 data access level（`raw` / `redacted` / `verified_only`），以及 task type（`open-ended` / `outcome-gradable`）。

意思是 agent 知道哪些参考文献是你亲自核验过的，哪些是它自己搜出来的没核实，哪些是模糊语料。引用的时候它会按这个区分用语，"根据 X (2024)" 和 "可能存在的相关研究" 是两种态度。

**第三个是 anti-leakage 反泄漏协议。**

如果遇到知识空白，agent 不允许从自己的训练数据里编造内容补上，必须标 `[MATERIAL GAP]`。文档里专门提到，他们做过一次 post-publication audit，发现 68 条参考文献里有 21 条问题是三轮 integrity check 都没抓出来的，于是接了 Semantic Scholar API 用 Levenshtein 匹配做引文校验，WebSearch 审计追踪强制开启。

对学术写作来说，引用错一条就是大事。这一道防线是这套 skills 最值钱的地方。

## 社区现在的反应

last30days 拉出来两条相关 Reddit 帖子。

r/hypeurls 5 月 10 日有一条 "Academic Research Skills for Claude Code"，把 Imbad0202 这个仓库挂上了。评论不多但热度起得快，单日 293 星就是这一波带的。

r/AIToolBench 4 月 24 日还有一条更早的，标题是 "I built a agent skill for academic literature review"，作者是 Zsun79，做了一个叫 LitReviewSkill 的轻量版。原话是"我试着用 ChatGPT 和 Claude 做学术综述，但它们经常漏掉相关论文，引用追溯也做不好，所以我做了一个更像研究者工作流的 skill"。

这俩信号合起来很清楚，**学术圈用 Claude Code 的需求是真的，缺的就是一套像 Imbad0202 这样把流程闭环的方案**。Zsun79 那版是单点突破，Imbad0202 是全流程。

## 我的判断

这一波 skills 主题写到第四篇，我发现一个明显的趋势。

10 月 Anthropic 推 skills 规范时，定位是"给 agent 加工具"。一个半月之后，开源社区把 skills 玩成了**完整工作流的封装容器**。mattpocock 把它做成个人日常流，affaan-m 把它做成 agent harness 优化大全，Imbad0202 直接把它做成学术研究流水线。

这跟当年 GPTs 应用商店的发育轨迹很像，但 skills 的优势在于 git clone 就能用、不依赖任何商店审核、可以无限组合。

对国内来说，这套学术 skills 出现的时间点很好。今年是 AI+教育在高校落地最快的一年，复旦、上交、清华、北航都在内部推 AI 辅助科研的规范。等学校教务处出文件估计还要半年，**学生这边可以直接抢跑**。

## 毕设党今天就能动手抄的配置清单

```
git clone https://github.com/Imbad0202/academic-research-skills
```

clone 完按下面顺序读，

1. **先读 `docs/architecture.md`**，10 分钟搞清楚 4 个 skill 包的协作关系
2. **再读 `examples/showcase/`** 里那篇样例论文，看 agent 跑完一遍长什么样
3. **跑 `/ars-plan`**，让它先 Socratic guidance 把你的题目聊清楚，这一步千万别跳
4. **跑 `/ars-lit-review`**，做文献综述，注意它会标 `[MATERIAL GAP]`，那些就是你需要自己去补的真空区
5. **跑 `/ars-write` → `/ars-review` → `/ars-revise`**，进入主流程
6. **最后 `/ars-finalize`** 选格式输出，支持 APA 7.0（含中文引用规则）、Chicago、IEEE、Vancouver

毕设党的最大坑是 Stage 2.5 和 4.5 两道 integrity gate 一定要跑完，不要嫌烦跳过去。这两道 gate 拦的就是引文造假、数据对不上、逻辑断层这三种最容易被导师打回的硬错误。

如果你导师比较严，把 `optional repro_lock` 也开起来，artifact 可复现配置一并存档，答辩时拿出来直接加分。

## 你可能会问的几个问题

**Q，能完全代替导师吗？**

不能。Imbad0202 README 第一句已经写明，"AI is your copilot, not the pilot"。这套 skill 干的是流程化、防漏、防幻觉的活，研究方向和判断仍然要你和导师定。

**Q，中文论文支持怎么样？**

intent-based mode activation 不依赖关键词匹配，任何语言都能跑。APA 7.0 内置了中文引用规则，输出可以双语摘要。这一点我看 README 写得很笃定，国内学生可以放心用。

**Q，跟 Zsun79/LitReviewSkill 怎么选？**

LitReviewSkill 是单点工具，只解决文献综述这一步，轻量。Imbad0202 是全流程，重。如果你只是要快速过一篇综述，前者够用。如果是写整篇论文或者毕设，后者一步到位。

## 相关链接

- Imbad0202/academic-research-skills, https://github.com/Imbad0202/academic-research-skills
- Reddit r/hypeurls 帖子, https://www.reddit.com/r/hypeurls/comments/1t99f2g/
- Zsun79/LitReviewSkill, https://github.com/Zsun79/LitReviewSkill
- 上篇对照, mattpocock/skills 单日 4000 星（5 月 12 日）
- 上上篇对照, anthropics/skills 官方三仓库（5 月 11 日）

---
相关实体:: [[claude-code|Claude Code]] | [[mattpocock-skills|Matt Pocock Skills]]
相关主题:: [[ai-coding-tools|AI 编程工具]] | [[ai-education|AI+教育]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
