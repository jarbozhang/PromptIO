---
title: 不用 RAG，Karpathy 搞了个本地知识库，实测比企业方案更好使
source: manual
score: null
scoring_reason: manual
status: draft
platform: wechat
tags: []
created_at: '2026-04-03T15:25:20.220Z'
original_title: null
title_score: 9
title_alternatives:
  - title: 不用 RAG，Karpathy 搞了个本地知识库，实测比企业方案更好使
    score: 9
  - title: 不用 RAG！Karpathy 本地知识库方案，30 分钟跑通 40 万字笔记
    score: 8.7
  - title: 抛弃向量数据库，Karpathy 的本地知识库架构，实测在长文本上效果更好
    score: 8.3
gold_quote: 不是AI帮你做笔记，而是AI帮你运营一个能自己生长、纠错和建立连接的知识库。
summary: >-
  Karpathy 最近抛弃了向量数据库和 RAG，仅用 LLM 和 Obsidian 就搭出了一个能自动生长的个人知识库。当库容达到 40
  万字时，这种“暴力”架构的检索效果竟不输传统的复杂企业方案，它到底是怎么运转的？
angle: Karpathy用LLM+Obsidian搭建不需要RAG的本地知识库，附完整实操代码
---
# Karpathy 不用 RAG 搞了个本地知识库，结果比大多数企业方案都好使

你花了多少时间在调 RAG 的分块策略和向量检索？Karpathy 的做法可能会让你觉得自己走了弯路：他用 LLM 直接把原始文档"编译"成结构化 Markdown，扔进 Obsidian 就完事了。没有向量数据库，没有 Embedding，没有 Chunk。

这不是一个玩具 Demo。当这个知识库长到 100 篇文章、40 万字的时候，他发现直接让 LLM 遍历整个目录来回答问题，效果居然不输传统 RAG。

## 核心架构：LLM 当编译器

整套系统的逻辑可以用一个类比讲清楚：**Source Code → Compiler → Executable**。

原始资料（论文、文章、网页截图）就是源代码，丢进 `raw/` 目录。LLM 扮演编译器角色，逐个读取这些文件，输出结构化的 Markdown 到 `wiki/` 目录——带摘要、带双向链接 `[[]]`、带概念分类。Obsidian 就是运行时环境，用来浏览和检索。

Karpathy 原话："the LLM writes and maintains all of the data of the wiki, I rarely touch it directly."

他几乎不手动编辑 wiki。所有的整理、归类、交叉引用，全是 LLM 干的。

## 实操拆解：他到底怎么做的

**第一步：数据入库**

把所有原始资料丢进 `raw/` 目录。PDF、网页截图、文章全文、甚至图片都行。不用提前整理格式，先囤起来。这一步的关键是**低门槛**——任何你觉得以后可能有用的东西，直接扔进去。

**第二步：LLM 增量编译**

这一步是整个系统的灵魂。写个脚本调用 LLM API，让它逐个处理 `raw/` 里的文件。LLM 会为每个文件生成一个对应的 wiki 条目：

- 第一段是 100 字以内的摘要
- 正文提取核心概念，用 `[[双向链接]]` 语法标记
- 末尾列出相关条目和参考来源

关键词是"增量"。新加一篇文章进 `raw/`，只需要编译这一篇，不用重跑整个库。而且 LLM 在编译新文章时，可以参考已有的 wiki 条目来建立更准确的链接关系。

**第三步：Obsidian 前端展示**

用 Obsidian 直接打开整个 `wiki/` 目录。因为 LLM 输出的是标准 Markdown 加 `[[]]` 链接，Obsidian 的图谱视图会自动把所有知识点的关联关系可视化出来。你能一眼看到哪些概念之间有联系，哪些是孤岛。

输出不止 Markdown。Karpathy 提到他还会让 LLM 生成 Marp 幻灯片和 matplotlib 图表，全都能在 Obsidian 里直接查看。

## 两个让人兴奋的自动化机制

**问答：不需要 RAG 的检索**

知识库到了一定体量之后，你可以直接向 LLM 提问。它会遍历整个 wiki 目录做调研，然后给出综合答案。不需要切片（Chunking），不需要算 Embedding，不需要调相似度阈值。

为什么这能 work？因为文件本身就是 LLM 最擅长处理的格式——结构化 Markdown。当数据已经被"编译"成 LLM 友好的形式，传统 RAG 里最头疼的"检索"步骤就变得多余了。

Karpathy 发现 LLM 自己维护索引文件和简短摘要就足够了，根本不需要复杂的 RAG 管道。

**Linting：知识库的自我体检**

这是我觉得最精妙的部分。定期让 LLM 给整个 wiki 跑一遍"健康检查"：

- 找到两篇条目之间的逻辑矛盾
- 补充缺失的信息和上下文
- 建议应该新建哪些条目来填补知识空白
- 修复失效的双向链接

相当于你的知识库有了免疫系统。它不只是被动存储，它在主动生长和自我修复。

## 复利效应：为什么越用越值钱

这套系统最反直觉的特性是**知识复利**。

你每次向知识库提问，LLM 的回答可以直接存回 wiki。下次再遇到相关问题，检索到的不只是原始资料，还有你上次思考的结果。每一轮交互都在给知识库加杠杆。

Karpathy 在回复中还提到了一个更激进的用法：LLM 团队可以"针对一个问题临时构建一个 wiki，跑几轮自检（Lint），然后直接输出完整报告"——这已经"远超一次 .decode() 调用"了。用完即弃，或者把有价值的部分沉淀回主库。

这已经不是笔记管理了。这是**自动化研究基础设施**。

## 别急着抛弃你的 RAG

实话说，这套方案有明确的边界。

**规模天花板**。100 篇文章、40 万字，刚好在长上下文模型（Claude 3.5 Sonnet、Gemini 1.5 Pro）的甜区内。如果你的知识库是百万字级别，每次查询都让 LLM 遍历全量文件，Token 成本会直线飙升。到了那个体量，你还是得引入某种预过滤机制——哪怕只是简单的关键词匹配或文件名筛选。

**幻觉风险**。LLM 在编译环节如果对原始材料理解有偏差，会在 wiki 里写入"脑补"内容。更麻烦的是，这些错误会在后续迭代中被不断强化——因为 LLM 下次读到的是自己上次写的错误内容。Prompt 里必须严格约束：只归纳和重组原文信息，绝不允许添加原文没有的内容。另外，每个 wiki 条目都应该标注信息来源的文件路径，方便溯源。

**工具链成熟度**。Karpathy 自己也承认这目前是 "a hacky collection of scripts"。没有开箱即用的产品，你得自己写脚本串起来。

## 信息差：英文社区在讨论什么

这条推文下面的讨论串有几个极具启发性的方向，国内目前基本没人聊：

**跨文档矛盾检测**。当两篇论文对同一个问题有不同结论，LLM 能在 Linting 环节自动标出矛盾点，而不是让你自己去发现。这对做文献综述的研究者来说是杀手级功能。

**结构化实体提取**。不只是写摘要，而是自动抽取人物、机构、事件实体，构建知识图谱。Obsidian 的图谱视图天然支持这个。想象一下，丢进去 50 篇 AI 领域的论文，自动生成一张"谁在跟谁合作、哪些机构在做什么方向"的关系图。

**临时 Wiki 模式**。针对一个研究课题临时生成一个完整的知识库，自检几轮后直接输出研究报告。这种"按需生成、用后即焚"的模式，对独立研究者来说极具想象力。

一位研究者的评论特别值得注意：对于没有机构图书馆访问权限的独立研究员，这套工具等于一个 24 小时在线的研究助理。

## 我的判断

我认为 Karpathy 这套方法今天就值得动手试。但它适合的场景很明确：个人知识管理，或者三五人的小团队内部 wiki。

对于企业级场景，别拿它替换你的 RAG 系统。但 LLM 编译和自动 Linting 的思路，完全可以作为现有流水线的补充——让 RAG 检索到的不是原始文档碎片，而是 LLM 预处理过的结构化知识。两者结合才是最优解。

国内目前流行的"AI 笔记"产品，绝大多数还停留在"帮你总结"的浅层。Karpathy 展示的是一个完全不同的范式：不是 AI 帮你做笔记，而是 AI 帮你**运营**一个知识库。它会自己生长、自己纠错、自己建立连接。

谁能把这套流程产品化，谁就能吃下"AI 知识管理"这个品类。

## 30 分钟跑通最小原型

别被"架构"吓到。核心逻辑几行代码就能搞定。

**Step 1：建好目录结构**

```bash
mkdir -p local_wiki/raw local_wiki/wiki
```

把你手头的技术笔记、收藏的文章扔进 `raw/` 目录。txt 和 md 格式都行。

**Step 2：核心编译脚本**

```python
import os
from openai import OpenAI

client = OpenAI()  # 或者用 Anthropic SDK
RAW_DIR = "local_wiki/raw"
WIKI_DIR = "local_wiki/wiki"

COMPILE_PROMPT = """将以下原始文档编译为结构化 Markdown wiki 条目。

要求：
1. 第一段为 100 字以内摘要
2. 正文提取核心概念，用 [[概念名]] 标记为双向链接
3. 所有事实性陈述必须来自原文，不要添加原文没有的内容
4. 末尾添加"相关条目"列表和"信息来源"标注
5. 如果原文包含数据、代码或配置，保留原始格式

原始文档内容：
"""

for filename in os.listdir(RAW_DIR):
    if not filename.endswith((".txt", ".md")):
        continue
    filepath = os.path.join(RAW_DIR, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    response = client.chat.completions.create(
        model="gpt-4o",  # 或 claude-sonnet-4-20250514
        messages=[{"role": "user", "content": COMPILE_PROMPT + content}],
    )

    wiki_name = filename.rsplit(".", 1)[0] + ".md"
    output_path = os.path.join(WIKI_DIR, wiki_name)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(response.choices[0].message.content)
    print(f"compiled: {wiki_name}")
```

**Step 3：用 Obsidian 打开**

下载 Obsidian（免费），打开 `local_wiki/` 作为 Vault。点左侧的图谱视图图标，你会看到所有知识点之间的链接关系自动可视化了。

**Step 4：加上问答功能**

```python
def ask_wiki(question):
    # 读取所有 wiki 文件作为上下文
    context = ""
    for f in os.listdir(WIKI_DIR):
        if f.endswith(".md"):
            with open(os.path.join(WIKI_DIR, f), "r") as fh:
                context += f"\n\n--- {f} ---\n" + fh.read()

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{
            "role": "user",
            "content": f"基于以下知识库内容回答问题。只使用知识库中的信息，如果信息不足请说明。\n\n知识库：{context}\n\n问题：{question}"
        }],
    )
    return response.choices[0].message.content
```

拿你自己攒的技术笔记试一下。丢进去 10 篇，编译完打开 Obsidian 图谱视图，那种"知识自动连接起来"的体验会让你重新思考笔记工具的意义。

如果觉得有启发，转发给你团队里正在折腾 RAG 的同事。你觉得这种"不需要 RAG"的做法在国内能落地吗？评论区聊聊。

---

### 相关链接

- **Karpathy 原始推文**：[x.com/karpathy/status/2039805659525644595](https://x.com/karpathy/status/2039805659525644595)
- **Obsidian（免费下载）**：[obsidian.md](https://obsidian.md)
- **OpenAI API**：[platform.openai.com/docs](https://platform.openai.com/docs)
- **Anthropic API**：[docs.anthropic.com](https://docs.anthropic.com)
