# LangAlpha把Claude Code搬到华尔街，HN 110分的金融AI Agent怎么解决token爆炸

80个MCP工具，光schema就吃掉5万token，agent还没开始干活，上下文窗口已经快满了。

这个痛点你一定遇到过。我最近给自己的工作流接了十几个MCP server，每次对话开头Claude都要先"消化"一遍所有工具的定义。工具越多，可用的推理空间越小，回答质量肉眼可见地往下掉。我一直在想，这事儿到底有没有优雅的解法。

然后我在HN上看到了LangAlpha，一个开源金融AI Agent，110分，37条评论。标题写的是"如果Claude Code是给华尔街造的会怎样"。说实话，金融这个场景我不太感兴趣，但它解决token爆炸的思路，让我停下来认真看了一遍代码。

## 把MCP工具"编译"成Python库，prompt成本直接打平

LangAlpha的做法非常简单，简单到我觉得应该早就有人这么干了。

它在workspace初始化的时候，自动把所有MCP server的schema编译成带类型标注的Python模块，扔进沙箱的`tools/`目录。agent执行的时候，不再通过prompt去"理解"每个工具怎么用，而是直接`import tools.fmp`这样调用，跟普通Python库一模一样。

prompt里只保留每个server的一行摘要。

你想想看，80个工具和3个工具，prompt成本完全一样。工具的详细文档不在上下文里，在文件系统里。agent需要的时候自己去读，不需要的时候完全不占空间。

这个方案其实不限于金融。任何MCP重度用户都可以抄这个思路，把schema从prompt层搬到代码层。工具的定义变成了可执行的Python代码，而不是一大坨JSON占着你宝贵的上下文窗口。

## 跨session的研究不再从零开始

第二个让我觉得有意思的设计是workspace持久化。

做过投资研究的人知道，一份分析报告不是终点，是起点。财报出来要更新模型，竞品发了新数据要重跑对比，你需要在旧分析的基础上不断叠加新内容。但大多数agent每次对话都是一张白纸，你得重新粘贴背景信息，重新解释你之前做过什么。

LangAlpha每个workspace映射一个持久化沙箱。agent自己维护一个`agent.md`文件，记录研究目标、关键发现、文件索引。每次LLM调用前，中间件自动把这个文件注入上下文。一周后开个新对话，它能接着上次的进度继续干。

坦率讲，这个设计本身不算新，Claude Code的CLAUDE.md也是类似的思路。但LangAlpha把它做成了中间件自动注入，不需要用户手动维护，而且针对研究场景做了结构化的目录约定，`work/`放过程数据，`results/`放成品，`data/`放共享数据集。

这让我反思了一下自己的Claude Code用法。我的CLAUDE.md基本是手动维护的，每次要继续之前的工作都得自己补上下文。也许该学LangAlpha搞个自动化的记忆层。

## HN评论区里几个值得关注的声音

有人问了一个很尖锐的问题，做金融的合规怎么办。MiFID II和FINRA要求每个session都有签名的执行日志，你得能回答"上周二agent推荐了什么，基于哪个数据快照做的推理"。作者坦言合规还有很多工作要做，目前只是持久化了代码执行日志和agent轨迹，签名日志在路线图上。

这其实是所有agent进入生产环境都会遇到的问题，不只是金融。

还有人提了个替代方案，用代理网关把MCP的返回值存到SQLite，然后暴露Python查询工具给agent。思路和LangAlpha类似，都是把"大数据"从上下文里挪出去，让agent用代码去查而不是用token去装。

也有好几个人表示怀疑，说再好的工具也帮不了散户跑赢指数基金。这个我同意，但工具本身的技术方案和投资收益是两回事。

## 我的判断

我认为LangAlpha最有价值的不是金融场景本身，而是它给MCP生态提出了一个被严重忽视的问题，工具数量的扩展性。

现在MCP的设计假设是，把工具schema塞进prompt，让LLM理解后调用。3个工具没问题，10个工具勉强能用，80个工具就崩了。LangAlpha的"编译成代码"方案是目前我见过最干净的解法。

但说实话我也不确定这是不是终极答案。编译后的Python模块，agent真的能像用原生工具一样准确地调用吗？类型标注和文档注释够不够LLM理解参数含义？这些我还没跑过，不敢下定论。

反正我觉得，如果你现在接了超过10个MCP server，或者你的agent每次对话都要花大量token在工具schema上，LangAlpha的代码值得翻一翻。不是为了做金融，是为了偷它的架构思路。

## 想动手试的话

LangAlpha是全栈项目，后端FastAPI，前端React，依赖PostgreSQL和Redis，部署成本不低。但如果你只是想看token优化的部分，重点关注这几个路径。

`tools/`目录下的MCP schema编译逻辑，看它怎么把JSON schema转成Python模块。

`agent.md`的中间件注入机制，看它怎么在每次LLM调用前自动拼接workspace记忆。

它有24层中间件，其中有一层专门处理超过4万token的工具返回值，直接写文件而不是塞回上下文。

仓库地址在这里，Python 3.12+，`make config`一把梭配置。

80个MCP工具的schema，从5万token压到80行摘要。开头那个让我烦了很久的问题，可能就是这么朴素的解法。

## 相关链接

- LangAlpha GitHub仓库 https://github.com/ginlix-ai/langalpha
- HN讨论帖 https://news.ycombinator.com/item?id=47766370

---
相关实体:: [[claude-code|Claude Code]]
相关主题:: [[agent-frameworks|Agent框架]] | [[ai-coding-tools|AI编程工具]]

<!-- REACH: 7/10 | 品牌✗ 利益点✓ 可操作✓ -->
