# 毕设党狂喜📚 Claude Code 学术研究全流水线，一夜涨 293 星

今早扫 GitHub Trending 看到一个新名字，Imbad0202/academic-research-skills，单日 +293 星，Python 写的。点进去 README 第一句就很挑衅，"AI is your copilot, not the pilot. This tool won't write your paper for you."

我盯着这句话愣了两秒🤔

之前我连写过三篇 skills 主题，主角全是工程师生态。今天突然冒出来一套**专门给学术研究的 skills**，把 research、write、review、revise、finalize 五步做成 Claude Code 流水线，目标用户就是研究生、毕设党、科研学生。

把整套配置摸完，我的结论是，**这是这一个月里看到的最适合中国高校学生抄的 skills 包**，没有之一。

## 这套 skills 长什么样🔍

仓库根目录摆着四个核心 skill 包。

`deep-research/` 是 13 个 agent 组成的研究队伍，跑 7 个模式，覆盖文献调研、Socratic 引导。你扔个题目进去，它会先问你"你是探索阶段还是定向阶段"，避免一上来就 lock 死方向。

`academic-paper/` 是 12 个 agent 的写作流水线，从风格校准到写作质量审查全包。

`academic-paper-reviewer/` 是 7 个 agent 的同行评议系统，里面塞了 EIC 主编 + 3 个 reviewer + Devil's Advocate 反方角色。

`academic-pipeline/` 是 10 阶段总编排器，关键节点是 2.5 阶段和 4.5 阶段两道 integrity gate，硬卡，不能跳。

外围还有 10 个 `/ars-*` 斜杠命令、SessionStart 钩子、跨 skill 共用的 schema、真实跑出来的论文样例。

整套读完我的感觉是，作者不是写了一个工具，是把"一篇论文从选题到提交"的完整教学流程编码进了 agent 系统。

## 三个让我想立刻抄的设计💡

**1️⃣ 反谄媚机制**

Devil's Advocate 跟你辩论前必须先给反驳意见打分，只有 ≥4 分才允许后续让步。同一个 session 不允许连续两次让步，每次 checkpoint 后还要检测有没有被你框死思路。

我做技术写作的时候反复遇到 Claude 给我点头同意，我说什么它都觉得有道理。这套机制等于强行让 agent 先 commit 一个 score 再行动。

**2️⃣ 物料护照**

`shared/schemas/material_passport.json` 跟着每一份文献走，记出处、重置边界、语料范围。还能标 data access level（raw / redacted / verified_only）。

意思是 agent 知道哪些参考文献是你亲自核验过的，哪些是它自己搜出来没核实的。引用的时候它会按这个区分用语。

**3️⃣ 反幻觉协议**

遇到知识空白，agent 不允许从训练数据里编造内容补上，必须标 `[MATERIAL GAP]`。作者做过一次复盘，发现 68 条参考文献里有 21 条问题是三轮 integrity check 都没抓出来的，于是接了 Semantic Scholar API 用 Levenshtein 做引文校验。

对学术写作来说，引用错一条就是大事，这一道防线是这套 skills 最值钱的地方。

## 毕设党今天就能动手抄的配置清单✍️

```
git clone https://github.com/Imbad0202/academic-research-skills
```

clone 完按这个顺序来，

1. 先读 `docs/architecture.md`，10 分钟搞清楚 4 个 skill 包的协作关系
2. 再读 `examples/showcase/` 那篇样例论文，看 agent 跑完一遍长什么样
3. 跑 `/ars-plan`，让它先把你的题目聊清楚，这一步千万别跳
4. 跑 `/ars-lit-review` 做文献综述，注意它会标 `[MATERIAL GAP]`，那些就是你要自己去补的真空区
5. 跑 `/ars-write` → `/ars-review` → `/ars-revise`
6. 最后 `/ars-finalize` 选格式，支持 APA 7.0（含中文引用规则）、Chicago、IEEE、Vancouver

毕设党最大的坑是 Stage 2.5 和 4.5 两道 integrity gate 一定要跑完，不要嫌烦跳过去。这两道 gate 拦的就是引文造假、数据对不上、逻辑断层这三种**最容易被导师打回的硬错误**。

如果你导师比较严，把 `optional repro_lock` 也开起来，artifact 可复现配置一并存档，答辩时拿出来直接加分🎓

## 几个高频问题

**能完全代替导师吗？**

不能。README 第一句已经写明，"AI is your copilot, not the pilot"。这套 skill 干的是流程化、防漏、防幻觉的活，研究方向和判断仍然要你和导师定。

**中文论文支持怎么样？**

意图识别不依赖关键词匹配，任何语言都能跑。APA 7.0 内置了中文引用规则，输出可以双语摘要，国内学生可以放心用。

## 我的判断

10 月 Anthropic 推 skills 规范时，定位是"给 agent 加工具"。一个半月之后，开源社区把 skills 玩成了**完整工作流的封装容器**。

今年是 AI+教育在高校落地最快的一年，复旦、上交、清华、北航都在内部推 AI 辅助科研的规范。等学校教务处出文件估计还要半年，**学生这边可以直接抢跑**🚀

国内用户访问 Claude Code 可以通过官方 API 国内中转节点或开源本地 agent harness，本文不展开。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
