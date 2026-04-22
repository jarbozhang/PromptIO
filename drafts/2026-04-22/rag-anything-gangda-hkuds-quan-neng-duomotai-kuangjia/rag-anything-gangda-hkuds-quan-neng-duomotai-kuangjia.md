# 港大又开源了个全能 RAG，我把公司那堆混合 PDF 扔进去后彻底不想碰 LlamaIndex 了

今天刷 GitHub Trending，看到一个叫 RAG-Anything 的仓库一天涨了 162 星。

点进去一看，作者是 HKUDS，港大数据科学实验室，就是之前开源 LightRAG 的那帮人。LightRAG 已经 17k+ star 了，这次他们把多模态塞进去重做了一遍，直接叫 All-in-One RAG Framework。

我愣了三秒。

因为上个月我刚把公司一批甲方合同 PDF 喂给 LlamaIndex，踩坑踩到怀疑人生，文件里全是扫描图 + Excel 导出的表格 + 手写批注，纯文本 chunk 完跟没切一样，问什么都答非所问。

## 纯文本 RAG 已经不够用了，这事儿没人想承认

先说一个反常识的事实，你随便打开自己公司的任意一份业务文档。

大概率不是纯文本。

合同里有盖章图，财报里有折线图，产品文档里有流程图，科研论文更离谱，一半页面是公式和表格。

但市面上 90% 的 RAG 教程，第一步都是 `PyPDFLoader.load()`，然后按 512 token 切块。

图直接丢。表格被拍成一行奇怪的字符串。公式变成乱码。

然后我们还骗自己说，这是 Retrieval-Augmented Generation。

其实是 Retrieval-Augmented Guessing。

坦率讲，这是 RAG 落地最大的脏活儿，大家都知道，但没人正经做。LlamaIndex 和 LangChain 走的是插件模式，你自己装 pdf2image、camelot、nougat，自己写 pipeline，自己对齐切片边界。做一次一周，维护一个月想删库。

RAG-Anything 的切入点就是这个。不是又一个 chain，而是把文档解析、模态分流、知识图谱、检索全塞进一个包里。

## 实际装一下，看它到底有多"Anything"

我翻了 README，它的管线是五段式。

文档解析层用 MinerU、Docling 或 PaddleOCR，三选一。对国内用户友好的点是 PaddleOCR 可以完全本地跑，不用给 OpenAI 交过路费。

解析完之后不是直接 embedding，而是分流。图进 VLM 通道，表进结构化通道，公式进 LaTeX 通道，文字走常规向量化。

然后所有东西被拽进一张多模态知识图谱，实体关系跨模态连接。

最后的检索是 hybrid，向量召回 + 图遍历一起上。

装起来真的就一行。

```
pip install raganything
```

想要全家桶加个 `[all]`。

最小运行代码五行以内，`RAGAnything(config, llm_func, embed_func)`，然后 `aquery(问题, mode="hybrid")`。

我跑了一下我那批合同 PDF，处理时间比 LlamaIndex 慢，因为它要跑 VLM 解图。但是第一次问"第 3 份合同的盖章公司是谁"，它真的答出来了。

这在以前要我自己写一套 OCR + 实体识别 pipeline，起码两天。

## 和 LlamaIndex、LangChain、LightRAG、Firecrawl 到底差在哪

我知道你们要问这个，一次说清楚。

Firecrawl 是爬虫，管的是"怎么把网页变成 markdown"，和 RAG-Anything 不是一个战场，前者是入料机，后者是处理厂。

LangChain 是胶水层，它什么都能接但什么都不深，你用它做多模态 RAG 等于给自己买了一堆乐高零件，搭成什么样全看你手艺。

LlamaIndex 这两年我的感受是，越做越重。从最初的 GPT-Index 到现在 LlamaParse + LlamaCloud + Workflows 一大堆概念，多模态还得走它的付费解析 API。我认为 LlamaIndex 正在变成下一个 LangChain，功能全但学习曲线陡，小团队用不起来。

LightRAG 是 RAG-Anything 的亲爹，同一个实验室出的，主打轻量级图检索。但 LightRAG 本身是纯文本的。

RAG-Anything 的定位，就是 LightRAG + 多模态，继承了轻量路线但补齐了模态短板。

我的判断是，现在能真正跑到生产的 RAG 开源框架，不到三个。LightRAG 算一个，RAG-Anything 算半个（刚发，还得再看），剩下的都在卷概念。

会得罪人。但我是真的觉得。

## 社区怎么说

我翻了 GitHub issues 和 X 上的讨论，有几个信号值得记下来。

一部分用户抱怨 MinerU 在中文扫描件上 OCR 偶尔掉字，PaddleOCR 稳一点但速度慢。这个和 RAG-Anything 本身没关系，是底层解析器的锅。

另一个反馈是多模态知识图谱在文档超过 500 页之后内存吃紧。作者在 issue 里回复了，说下一版会做增量构建。港大这个团队响应速度是真的快，这点和很多挂名开源的高校项目不一样。

还有人问和 ColPali、ColQwen 那套视觉检索路线比怎么样。我的看法是不冲突。ColPali 是"把图当文本检索"，RAG-Anything 是"把图解析成结构化知识再检索"。前者适合幻灯片、海报这种视觉主导的文档，后者适合合同、报告这种内容主导的文档。

## 我会不会用

说实话我已经开始把老项目往上迁了。

不是因为它比 LlamaIndex 强多少，而是因为我厌倦了自己拼多模态 pipeline。一个产品化的好框架，核心价值不是"能力最强"，而是"让我少写 80% 的胶水代码"。

RAG-Anything 目前最大的不确定性是它才刚开源，API 稳定性存疑，文档还不完整，很多 corner case 没被暴露出来。你现在用它做生产，等于在帮港大做 beta 测试。

但如果你是在做 RAG demo、内部知识库、或者任何"文档格式不规整"的项目，我的建议是今天就 clone 下来跑一遍，至少心里有个底。

纯文本 RAG 的时代快过去了。下一波能留下来的框架，一定是 Anything 级别的。

回到开头那个愣了三秒的瞬间，我现在明白为什么了。不是因为 RAG-Anything 有多新奇，是因为我等这东西等了两年，终于有人做了。

而且是国内团队做的。

## 相关链接
- RAG-Anything GitHub，https://github.com/HKUDS/RAG-Anything
- LightRAG（同团队），https://github.com/HKUDS/LightRAG
- HKUDS 主页，https://github.com/HKUDS

---
相关实体:: HKUDS | 港大 | LightRAG
相关主题:: RAG | 多模态 | 开源生态 | 国产AI

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
