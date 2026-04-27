# GitNexus 把 Graph RAG 塞进浏览器，扔个 repo 进去就能聊代码

我刷 GitHub Trending 的时候看到一个项目，今天涨了 700 颗星，叫 GitNexus。

打开介绍只有一句话，"client-side knowledge graph creator that runs entirely in your browser"。

我愣了三秒。Graph RAG 这套东西，我之前在公司项目里搭过一次，光把 tree-sitter、向量库、Neo4j 那一坨东西塞进 Docker 就花了我半天。这哥们直接告诉我，浏览器里就能跑，零后端。

打开 gitnexus.vercel.app，把一个 repo 的 GitHub 链接粘进去。等了大概一分钟，浏览器里出来一张可以拖动的代码知识图谱，旁边一个对话框，可以直接问"这个项目的入口在哪""哪些函数会调用 Stripe"。

我当时第一反应是，这东西放在 2026 年的中国开发者面前，分量比它表面上看起来大得多。

## 先讲清楚 GitNexus 到底干了什么

传统的 RAG 看代码是这样的，把代码切块，每块算 embedding，问问题的时候做向量检索，把最相似的几块塞给 LLM。

这种做法在代码上有个硬伤，代码不是自然语言，函数 A 调用函数 B、类 C 继承自类 D、模块 E 从模块 F 导入，这些关系在 embedding 空间里全是噪音。你问"这个 bug 改一行会影响哪些地方"，向量检索给你的是"长得像的几段代码"，不是"真正会被影响的几段代码"。

Graph RAG 的思路是先把代码解析成一张图，节点是文件、类、函数、变量，边是调用、继承、导入、引用。问问题的时候沿着图走，给 LLM 的是结构化的上下文，不是几块碎片。

GitNexus 的核心创新不在于"做了 Graph RAG"，这事 Sourcegraph、Aider 那一票工具都在做。它的核心是把整套东西塞进了浏览器。

它用 tree-sitter 编译成 WASM 在浏览器里解析 AST，支持 TypeScript、Python、Java、Go、Rust、C++ 等十几种语言。用 LadybugDB 的 WASM 版本做嵌入式图数据库，带向量支持。用 transformers.js 在浏览器里跑 embedding 模型。可视化用 Sigma.js 走 WebGL。

整套技术栈没有一个需要后端服务，包括 embedding 这种以前必须调云端 API 的部分。

数据全部存在浏览器的 IndexedDB 里。官方原话，"your code never leaves the browser"。

## 这件事对中国开发者的具体意义

我直说，中国的 AI 编程工具用户长期处在一个尴尬的位置。

国外的 Cursor、Codex 这类深度集成代码理解的工具，背后都要把代码片段送到服务商的服务器上做检索和推理。公司项目里的代码涉及业务逻辑、客户数据、内部 API，能不能传出去，是个需要走法务的问题。

国产的 AI 编程工具最近一年起来很快，但代码理解的深度还在追赶，特别是跨文件的引用追踪、调用链分析这种需要图结构的能力。

GitNexus 提供了第三条路径。把一个项目拖进浏览器，本地解析、本地建图、本地存储，然后接入你自己的 LLM，可以是阿里云的通义、火山的豆包、国内部署的 DeepSeek。代码不离开你的电脑，但 Graph RAG 的能力你享受到了。

更妙的是，它有一个 CLI + MCP 模式。`npx gitnexus setup` 之后，它把自己注册成 MCP server，可以接到 Claude Code、Cursor、Codex、Windsurf、OpenCode 上。这套 MCP 暴露了 16 个工具，包括影响分析、按进程分组的搜索、符号上下文、变更检测、多文件重命名、原始 Cypher 查询。

通俗讲，你的 AI 编程助手原本只能"猜"项目结构，接上 GitNexus 之后，它可以"查"项目结构。

## 我自己跑下来的几个观察

我拿了三个项目试，一个是 5000 行的 Python 项目，一个是 1.2 万行的 TypeScript 项目，一个是想看看极限的 Vue 全家桶源码。

5000 行那个，浏览器里 40 秒索引完，问"重构 X 类会影响哪些调用方"，给了 7 个准确的位置。1.2 万行那个，索引 2 分多钟，可视化有点卡但问答没问题，我问"哪个组件用了某个废弃 hook"，一次给全。Vue 那个就崩了，浏览器内存吃满，官方写了浏览器版上限大概 5000 文件，更大要走 CLI。

我也跑了 CLI 模式接 Claude Code。`npx gitnexus analyze` 在项目根目录跑一次，索引存在 `.gitnexus/` 目录加进 gitignore，Claude Code 里就多了一组 GitNexus 的 MCP 工具。

体感最明显的差别是，以前 Claude Code 改一个跨 5 个文件的逻辑，要先 Grep 一遍再 Read 几个文件，token 消耗很高。接上之后它直接调用 `find_impact` 一次拿到全部受影响位置，剩下时间全花在写代码上。

## 一些不那么舒服的地方

License 是 PolyForm Noncommercial，个人用、学习用、做开源贡献都没问题，公司商用要去 akonlabs.com 谈。希望中国开发者注意，不要一时兴起塞进生产环境。

中文标识符的支持有待验证，我试了有中文注释的 Python 文件，注释没问题，但函数名变量名没敢用中文。embedding 用的是 transformers.js 的小模型，中文代码的语义检索质量大概率弱于云端中文 embedding。

浏览器版的硬上限就摆在那，WebGL 渲染上千节点开始掉帧，5000 文件以上得回 CLI。

## 社区的几个有意思的声音

GitHub Issue 里有人问"为什么不直接用 Sourcegraph 或者 ast-grep"，作者回答大意是，那些工具要么需要服务，要么只做语法搜索，没有"图谱 + RAG + 本地化"这个组合。

X 上有条评论我印象比较深，"Graph RAG 能不能成的关键不在算法多牛，在能不能让普通开发者 30 秒用上"。GitNexus 把配置门槛砍到接近零，这件事比技术本身更值钱。

## 我的判断

我认为这个项目代表了一个被低估的方向，"客户端优先的 AI 基础设施"。

过去两年的 AI 工具几乎全是云端中心化，Cursor、Perplexity、各种 Copilot 背后都是服务器算力。这种架构有它的合理性，模型大、要 GPU、用户不想自己管。

但代码这个场景特殊。代码有强烈的私密属性，开发者对"代码出公司"的抵触远高于"文档出公司"。客户端跑的代码理解工具，刚好踩中这个痛点。

我会得罪人地说一句，未来一年会有一批"客户端跑的 AI 开发者工具"冒出来，本地图谱、本地 RAG、本地 fine-tune。云端工具不会消失，但会出现一个新的细分市场，专门服务"代码不能出公司"和"我就是想把所有东西攥在自己手里"的开发者。

GitNexus 是这条路上比较早、比较完整的一个样本。

## 下一步动作

想感受一下，打开 gitnexus.vercel.app，粘贴一个你熟悉的中等规模 GitHub 项目链接，点 Analyze，等一两分钟，然后问一个你以前要花十分钟翻代码才能回答的问题。

日常用 Claude Code 或 Cursor 的，跑一下 `npx gitnexus setup` 把它接进去，在你最近正在改的项目里实测一周。

最后留一个问题，你愿意为了"代码不出本机"，接受多大的性能折损？

## 相关链接

- GitNexus 仓库, https://github.com/abhigyanpatwari/GitNexus
- Web 版, https://gitnexus.vercel.app
- 作者公司 Akon Labs, https://akonlabs.com
- LadybugDB（嵌入式图数据库）, 在 GitNexus 仓库 README 中有引用

---
相关实体:: GitNexus
相关主题:: RAG | [[ai-coding-tools|AI编程工具]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
