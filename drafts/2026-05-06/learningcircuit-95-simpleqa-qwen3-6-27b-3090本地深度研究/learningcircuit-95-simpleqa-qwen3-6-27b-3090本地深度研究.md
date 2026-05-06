# 一张 3090 跑 Qwen3.6-27B，本地深度研究 agent 干到 95.7% SimpleQA

5 月 6 日早上刷 GitHub Trending，LearningCircuit 这名字单日 +197 星，点进去 README 第一句把我看停了，"~95% on SimpleQA (e.g. Qwen3.6-27B on a 3090)"。

我先压住"又一个本地推理 wrapper"的反应，去 r/LocalLLaMA 翻了下，是项目作者本人 5 月 2 日发的复盘帖，425 个赞 100 条评论。他报的数字更精确，95.7%，单卡 3090，全本地，agentic search 模式。

这跟我前几天写的 dexter（金融研究 agent，但接美股 API）和 Rapid-MLX（Mac 本地推理引擎）都不一样。这是把"研究 agent + 本地模型 + 私有文档加密"三件事捏一起的东西，叫 local-deep-research，简称 LDR。

## 95.7% 这个数字的水分在哪

先把读者最关心的事讲清楚，这数字过不过关。

OpenAI 自己 2024 年公布 SimpleQA 时，o1 是 47%，GPT-4o 是 38%。后来 deep research 类系统普遍能到 80% 以上，因为它们叠了搜索。LDR 这个 95.7%，是模型 + 10 个搜索引擎 + iteration 策略一起算出来的端到端分。

我去 LDR 仓库的 benchmark 表里又核了一遍，README 主表上写的"~95%"那一行其实是 GPT-4.1-mini + SearXNG 跑的，不是 Qwen。Qwen3.6-27B 那个 95.7 是作者在社区帖里自己跑出来的复现，样本规模他写了"preliminary"，没给完整 evaluation 卡。

所以诚实点讲，这是一个"作者用一张 3090、一个开源模型、一套搜索 pipeline，复现到了商用 deep research 系统的水位"的演示，不是一个被第三方裁判过的成绩单。但即便打个折，能用本地 27B 模型把这个 benchmark 打上 90 已经是去年这个时候不敢想的事。

去年我跑同类 benchmark，70B 量化才勉强到 60，搜索引擎用 SerpAPI 还要付费。

## 为什么是 Qwen3.6-27B 而不是 70B

我看到 27B 这个档位先愣了一下。3090 24G 显存，27B 模型 Q6 量化大概 21G，刚好塞下还能留一点 KV cache 余量。

70B 在 3090 上要么走 CPU offload 慢到不能用，要么砍到 Q3 以下精度崩盘。27B 是平民显卡 + 国产模型组合里最甜的一档。我自己手上是 4090，跑同样的配置只是更宽裕，没本质变化。

模型这块作者用的是 unsloth 那版 `Qwen3.6-27B-UD-Q6_K_XL.gguf`，跟另一个 r/LocalLLM 帖子里测 coding agent 用的是同一份。说明这套 GGUF 在社区里已经被反复跑过，量化质量是被认过的。

如果你只有 3090Ti 或者 24G 的 4090，照搬就行。20G 的 4070Ti SUPER 要降到 Q4 量化，benchmark 肯定掉一截，但功能上能跑。8G 显卡别想了，这个项目不是给你设计的。

## 装机我走的是 docker compose 这条路

LDR 给了三种启动方式，pip 安装、docker run、docker compose。我建议直接走 docker compose。

先拉 ollama 起来当推理后端，`docker run -d -p 11434:11434 --name ollama ollama/ollama`，然后 `docker exec ollama ollama pull qwen3.6:27b`，这一步取决于你网络，27B GGUF 大概十几个 G。

然后拉 LDR 的 compose 文件，一行 curl 一行 up。访问 localhost:5000 就是它的 web 界面。

我第一次跑卡在了搜索后端。它默认想用 SearXNG，但容器没起，会一直转圈。补一句 `docker run -d -p 8080:8080 --name searxng searxng/searxng` 就好了。如果你不想自建搜索，可以在配置里换 Tavily 或者 Brave，但都要 API key，不属于"全本地"路线。

agentic search 这个词是它的核心。简单说就是模型自己规划要查几次、查什么关键词、查到一半要不要换引擎。不是一次性把搜索结果灌进上下文那种 RAG，是 plan-search-reflect 循环。这也是为什么 27B 模型能打到 95.7，模型本身记忆力一般，靠多轮搜索和迭代验证补回来。

## 接 PubMed / arXiv / 私有文档

这是我看完最有兴趣的部分。

LDR 把搜索引擎做成了插件式的，arXiv、PubMed、Semantic Scholar、GitHub、Wikipedia、Wayback Machine 都内置。你在策略里勾选哪几个，agent 规划阶段就只在这几个里转。

做药物研发或者论文综述的同学，把搜索范围限到 PubMed + arXiv + Semantic Scholar，就是一个本地版的"学术 deep research"。我自己拿来跑了一个最近 60 天 inference engine 的综述，让它聚焦 arXiv，跑了大概 4 分钟，给的备忘录里 12 个引用全部能点开，没一篇是编的。

私有文档这块用的是 LangChain retriever 接口，加上一个 SQLCipher AES-256 加密的本地库。理论上你把公司机密文档喂进去，配合本地模型，整个 pipeline 一个字节都不出网。

我没在严肃场景试过加密强度，但这个设计意图（"server admins can't read your data"）跟一般工具链里把文档明文塞进 vector DB 是两回事。律所、医院、券商研究所这种合规场景，是它真正想吃的市场。

## 跟 OpenAI Deep Research 的实际差距

我想了几天怎么写这一段，最后决定不用对比句式。

OpenAI Deep Research 我用过一个月，强项是搜索质量和叙事流畅度。它的搜索引擎是被深度整合过的，不是简单调 API，模型自己知道什么时候该停。LDR 在这两点上还有距离，搜索我跑的几个 query 偶尔会重复查同一个 source，叙事生成会出现"以下是分析"这种格式词。

我的判断是，如果你的研究内容是公开网络信息，OpenAI Deep Research 这种成熟商用方案体验更顺。但如果你的内容是私有文档、是特定行业（医学/法律），或者你压根不想数据出网，LDR 这条路是目前唯一接近能用的本地化方案。

27B + 3090 这个档位的意义不是干翻谁，是把"本地能跑的 deep research"的硬件门槛从 4-bit 70B 双卡，砍到了 6-bit 27B 单卡。一台二手装机 8000 块的 3090 主机就能撑起一套合规研究 pipeline，这是真实在落地的事。

## 我会怎么用它

短期内我会把它接到自己的 wiki 系统里，让它在我每天写文章前先帮我跑一遍"过去 7 天某个主题在 arXiv + GitHub + HN 上的进展"。这个活我现在用 last30days skill 做，但 last30days 的搜索面比较窄，LDR 这套 10+ 引擎 + agentic 迭代理论上能更全。

如果你手上有 3090/3090Ti/4090，今天晚上抽 1 小时把它跑起来，先用 Qwen3.6-27B Q6 量化跑一个你熟悉领域的 query，看看 agent 规划和引用质量过不过你自己的关。过得了，就当你家有了一台不出网的 deep research 工作站。

过不了，至少你知道了 95.7 这个数字在你手里能复现到几分。

## 相关链接

- LDR 仓库 https://github.com/LearningCircuit/local-deep-research
- 作者社区帖 https://www.reddit.com/r/LocalLLaMA/comments/1t1n6o8/
- Qwen3.6-27B unsloth 量化 https://huggingface.co/unsloth/Qwen3.6-27B-GGUF
- SimpleQA 原始 paper https://openai.com/index/introducing-simpleqa/

[[learningcircuit|LearningCircuit]] [[qwen-family|Qwen]] [[ollama|Ollama]] [[llama-cpp|llama.cpp]]
主题 [[local-inference|本地推理]] [[ai-research|AI 研究]] [[deep-research|深度研究]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
