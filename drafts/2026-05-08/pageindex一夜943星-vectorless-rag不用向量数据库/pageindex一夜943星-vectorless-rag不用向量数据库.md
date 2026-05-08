# PageIndex 一夜 943 星，不用 embedding 不用向量数据库的 RAG，国内 RAG 项目要重写一半

GitHub Trending 一夜涨 943 星的 Python 项目，叫 PageIndex，作者是 VectifyAI。仓库地址 github.com/VectifyAI/PageIndex，README 第一句话就把战书贴出来了，Vectorless, Reasoning-based RAG。

不要 embedding。不要 chunk。不要向量数据库。不要 similarity search。

我盯着这一行看了三秒，然后把过去两年我搭的那几个 RAG 项目在脑子里过了一遍。Pinecone 上一年开销是个我不太想算的数字，Milvus 自托管一台中等机器全年下来也是几千块，Chroma 倒便宜但召回质量一直让我有点心虚。Embedding API 调用 OpenAI text-embedding-3 那条线每月几十刀稳稳烧着，re-rank 还要再叫一次 Cohere 或者本地 bge-reranker。

如果 PageIndex 这条路真能走通，我手头那几个 RAG 项目至少有一半值得重写。

## Vectorless RAG 到底换掉了什么

先把传统 RAG 这条管线复述一遍，方便对比。

文档进来，先 chunk，按 token 数或者按段落切成一块块。每一块过 embedding 模型变成一个高维向量。所有向量塞进向量数据库，建索引。用户问问题，问题也变成向量，去库里搜 top-k 相似的 chunk，捞回来拼进 prompt 喂给 LLM 生成答案。中间通常还要加 re-ranker，把 top-50 重新打分挑 top-5。

PageIndex 这条路完全是另一套。

文档进来，PageIndex 让 LLM 把整篇文档读一遍，按文档自己的章节结构生成一棵树。这棵树长得就像书的目录，一级标题下挂二级，二级下挂三级，每个节点有 title、node_id、page 范围、summary，还可以嵌套子节点。整棵树连同每个节点的 summary 一起存下来，没有任何向量。

用户问问题的时候，PageIndex 不去做 similarity search。它把这棵树和问题一起喂给 LLM，让 LLM 像人翻书一样推理，"这个问题应该看第三章第二节"，然后顺着树往下走，最后定位到几个具体节点，把这几个节点的原文取出来回答。

README 里有一句话我直接抄下来贴给团队群里看的，"similarity ≠ relevance"。这是整个范式的核心。传统 RAG 假设语义向量空间里距离近就等于内容相关，PageIndex 直接说这个假设不成立，相关与否要交给 LLM 推理判断。

## 我盯着看的三个差异

第一个差异是**没有 chunk 边界丢失的问题**。

我搭的合同审阅 RAG 里最头疼的事情就是 chunk 切坏。一份合同的"违约责任"条款经常跨页，按 1024 token 一切就把因果关系切两半。Chunk overlap 调到 200 还是会丢，调到 500 召回噪音又上来。PageIndex 按文档自然章节走，"违约责任"这一节是个完整节点，整段拿出来。

第二个差异是**长上下文文档天然友好**。

社区里有人在 r/WebAfterAI 发了实测，专门跑 FinanceBench，那是个金融报告问答 benchmark，全是 SEC filing 这种几百页的 PDF，里面满是表格、交叉引用、脚注。这种文档传统 RAG 切起来非常痛苦，表格被切散、脚注引用断链。PageIndex 在 README 里提到的 Mafin 2.5（一个基于 PageIndex 搭的财报问答系统）在 FinanceBench 上跑出 98.7% 的准确率，README 原话是"显著超过传统向量 RAG"。这个数字我没法独立验证，但方法论上确实合理，树状结构保留了文档的层级语义，整章整段取出来比拼凑碎片要好。

第三个差异是**成本和延迟的 tradeoff 反过来了**。

传统 RAG 的成本结构是，embedding 一次性烧（建库），向量库托管月费，每次查询非常便宜（向量搜索是 ms 级），延迟主要在网络往返。

PageIndex 反过来，建索引贵（要 LLM 通读全文生成树状结构），存储便宜（就是个 JSON），但每次查询要让 LLM 推理走树，token 消耗和延迟都更高。

这就意味着 PageIndex **不是任何场景都比传统 RAG 划算**。高频查询、文档不常更新的场景，传统向量库摊薄成本更优。低频查询、文档复杂结构化、单次查询愿意等几秒换更高准确率的场景，PageIndex 才有优势。

## 装起来跑一下

```
git clone https://github.com/VectifyAI/PageIndex
cd PageIndex
pip3 install --upgrade -r requirements.txt
```

`.env` 里写一个 `OPENAI_API_KEY`，默认模型走 `gpt-4o-2024-11-20`。然后一行命令跑。

```
python3 run_pageindex.py --pdf_path /path/to/document.pdf
```

它会先把 PDF 解析出来，让 LLM 通读生成树状结构，输出一个 JSON 索引文件。这一步的 token 消耗按文档长度算，一份 50 页的 PDF 我估算下来用 gpt-4o 大概几分钱到一两毛人民币。

要走 Agent 模式，再装一个 openai-agents，

```
pip3 install openai-agents
python3 examples/agentic_vectorless_rag_demo.py
```

这个 demo 是真正的 reasoning-based 检索演示，agent 拿到问题，看着树往下走，定位节点，取出原文，回答。整条链路里**没有任何一个 embedding 调用**。

模型层面 PageIndex 接的是 LiteLLM，意味着 Claude、Gemini、DeepSeek、Kimi、GLM 全都能换。`--model` 参数直接指。这点对国产 API 用户友好，DeepSeek V3 跑这种树状推理任务性价比应该比 gpt-4o 高一截。

包本身的 PDF 解析是"标准"水平，README 自己也承认复杂 PDF（多列、表格密集）需要走他们的云服务做更好的 OCR。这是开源版本的客观限制，写出来不藏着。

## 多平台真实反馈

reddit r/Rag 是这个项目讨论最热的地方，5 月 5 号那条 "Vectorless RAG can scale to millions of documents now?" 拿了 83 赞 21 评论。第一条高赞回复直接挑战，"Cool but does it beat a dense + bm25 pgvector stack with a proper reranker? I use this as benchmark recall pipeline because I have yet to find anything that beats it in quality."

这个 pushback 我觉得非常对。dense + BM25 + pgvector + reranker 这套叠满的传统管线在召回质量上是行业天花板，PageIndex 没拿出针对这套组合的端到端 benchmark，只对比了"传统向量 RAG"，这中间的留白是要警惕的。

r/LovingOpenSourceAI 那条 "How To AI" 转发拿了 48 赞 43 评论，评论区分两派，一派觉得"the entire RAG industry is about to get cooked"，另一派觉得这就是把推理成本从查询期搬到了索引期，说到底是 tradeoff 不是革命。

r/WebAfterAI 那条实测帖子作者写得很坦白，"I've been deep in traditional RAG setups for a while – chunking docs, embedding everything, shoving it into Pinecone/Chroma/whatever, then hoping similarity search pulls the right context. It works okay for simple stuff, but it falls apart on long, structured documents like financial reports, SEC filings, research papers, or PDFs with tables, cross-references."

这条评论戳到的是传统 RAG 的真实痛点，简单场景够用，复杂结构化文档全线崩。

## 我的判断

Vectorless RAG 是**范式选项**而不是**范式替代**。

LLM context window 已经走到了 1M token，Gemini 2.5 Pro、Claude Sonnet 4、GPT-5 都在这个量级。理论上一份 500 页的 PDF 可以整个塞进去，根本不需要 RAG。但实际工程里你不会这么干，单次查询塞 1M token 太贵，而且模型对长 context 中部信息的利用率（lost in the middle 现象）一直没彻底解决。

PageIndex 这类 vectorless 路线的本质，是**用结构化推理替代向量空间近邻**。它不是要消灭向量，而是承认向量在结构化文档（合同、财报、技术手册、法律条文、医疗记录）上不够用。这类文档有人写定的层级，有目录，有"翻到第几章第几节"的天然导航，向量化反而把这些结构信息抹平了。

我的预测有两层。

第一层，PageIndex 这个具体项目能不能成为下一个 LangChain，**很难说**。它现在还有明显短板，PDF 解析依赖云服务才好用、benchmark 只有 FinanceBench 一个、对比的 baseline 不够强、索引期 token 成本没有清晰量化。这些都要在接下来几个月看团队能不能补齐。

第二层，"vectorless / reasoning-based RAG" 作为一类方法，**几乎肯定会成为标配选项**。dify、FastGPT、Coze、RAGFlow 这些国内 RAG 平台接下来一年内大概率都会加上"树状索引 + LLM 推理检索"的模式，跟现有的向量索引并列存在，让用户按文档类型选。

## 国内 RAG 项目哪些值得重写一半

我认真排了一下，

**值得立刻试 vectorless 路线的**，

- 合同/法律文档库 → 章节结构强、查询低频、对召回精度敏感，PageIndex 类方法收益最大
- 企业知识库里的技术手册/SOP → 有目录有层级，传统 chunk 经常切坏
- 财报/研报问答 → FinanceBench 上 PageIndex 已经验证，可以直接抄方案

**继续用传统向量 RAG 的**，

- 客服 FAQ 库 → 问答对结构本来就碎片化，向量搜索够用
- 海量短文本（评论、日志、tweet）→ 没有树状结构可言，强行建索引代价高
- 高 QPS 场景 → 每次查询要 LLM 推理走树，QPS 一上就崩

**两者并存的**，

- dify / FastGPT / RAGFlow 这种通用 RAG 平台，应该把 PageIndex 路线作为一种"检索策略"加进去，让用户按知识库类型选。这个 PR 我打赌一年内一定会有人提。

## 行动建议

如果你今天就想试，最小路径是这样的，

1. 找一份你手头结构化最强的 PDF，一份合同、一份招股书、一份产品技术手册都行
2. `git clone https://github.com/VectifyAI/PageIndex` 装起来
3. `.env` 里配 `OPENAI_API_KEY`，或者改成 DeepSeek/Kimi 的 base URL 走国产模型省钱
4. 跑 `python3 run_pageindex.py --pdf_path your.pdf` 生成树状索引
5. 跑 `examples/agentic_vectorless_rag_demo.py` 试一轮问答，看准确率和响应速度
6. 拿同样的 PDF 在你现有的 Dify / FastGPT / 自建 LangChain 上建一个传统 RAG，**问同样 10 个问题**对比答案

这个对比下来你心里就有数了，不是看 README，不是看 benchmark，是看你自己的文档自己的问题，PageIndex 答得比向量 RAG 好不好。

如果好，你就找到了下一个值得重写的项目。如果不好，至少你确认了向量库这一年的钱没白花。

无论哪种结果都比看着 trending 干着急强。

---
相关实体:: [[vectifyai|VectifyAI]] | [[pageindex|PageIndex]] | [[langchain|LangChain]] | [[llamaindex|LlamaIndex]] | [[dify|Dify]] | [[fastgpt|FastGPT]]
相关主题:: RAG | [[agent-frameworks|Agent 框架]] | [[ai-coding-tools|AI 编程工具]]

<!-- REACH: 7/10 | 品牌✗ 利益点✓ 可操作✓ -->
