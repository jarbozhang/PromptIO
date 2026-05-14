# Simon Willison 这条 Claude Code prompt 让我用 HTML 重新做了所有文档

我最近又被 Simon Willison 戳了一下。

他 5 月 8 日写了一篇短文，标题叫 The Unreasonable Effectiveness of HTML。我一开始没太在意，以为又是某种 HTML 复兴的怀旧叙事。点进去看完，发现是一篇讲 vibe coding 的方法论文章，而且讲到了一个我自己跑了三个月 Claude Code 都没意识到的点。

简单一句话总结他的观点，让 Claude Code 输出 HTML，不要让它输出 Markdown。

这听起来像废话。但他给的例子和我自己照着跑了一遍之后，我承认这是被严重低估的一种用法。

## Simon 到底在说什么

Markdown 是这两年所有 LLM 的默认输出格式，这背后是有历史原因的。GPT-4 早期 context 只有 8K tokens，Markdown 用尽量少的字符表达尽量多的结构，效率最高。后来即使 context 涨到 200K，Markdown 还是惯性地留下来了。

Simon 的论点是，这个惯性早就该打破。

他原文里有一句话，我看了三遍。

> "Asking Claude for an explanation in HTML means it can drop in SVG diagrams, interactive widgets, in-page navigation and all sorts of other neat ways of making the information more pleasant to navigate."

让 Claude 用 HTML 解释一段代码，它可以顺手画 SVG 流程图、塞交互组件、加页内导航、做颜色编码。这些都是 Markdown 做不到的。模型的图形和交互能力一直在那里，是我们用 Markdown 这个出口把它卡住了。

更妙的是 Simon 给的具体 prompt，几乎可以原样照搬。

> "Explain this code in detail. Reformat it, expand out any confusing bits and go deep into what it does and how it works. Output HTML, neatly styled and using capabilities of HTML and CSS and JavaScript to make the explanation rich and interactive and as clear as possible."

翻译过来就是，详细解释这段代码，重新排版，把所有难懂的地方展开，深入讲清楚它做什么、怎么做的。输出 HTML，样式整洁，充分利用 HTML、CSS、JavaScript 的能力让解释丰富、交互、清晰。

注意这里没有任何"请使用 React""请引入 Tailwind""请遵循组件化"。就是一个单文件 HTML，CSS 内联，JS 内联。

## 我也跑了一遍

我手头有一份比较烦人的代码，是上个月写的一段 RSS 采集器的并发控制逻辑，p-limit + 重试 + 错误退避三件套混在一起，过两周自己都得现读现想。我用 Simon 这个 prompt 喂给 Claude Code，唯一改动是把 Explain this code 换成 Explain this concurrency control logic。

Claude 输出了一个 800 行的 HTML 文件。

里面有什么？顶部一个深色主题的封面，列出了这段代码的三个核心组件。中间是一张 SVG 画的状态机流程图，标了 pending、in-flight、retrying、failed 四个状态。下面是逐段代码注释，左侧是原代码，右侧是中文解释，鼠标 hover 在变量名上会高亮所有出现位置。最下面是一个可点击的"调一下并发数看看"的交互组件，拖滑块能看到时序图变化。

整个 HTML 文件 35KB，浏览器打开秒级渲染，没有任何外部依赖。我把它扔到团队内网静态资源服务器上，发了个链接给同事。

这就是 Simon 说的"不合理有效"。一份不到 200 字的 prompt，换来一个可以直接发布的内部技术文档。

## 这个模式为什么重要

vibe coding 这两年的主流叙事都在往两个方向走。

一个方向是 Cursor、Windsurf、国内的 Trae 这种 IDE 集成路线，模型补全在 IDE 里发生，输出仍然是项目文件。另一个方向是 v0、bolt.new、lovable 这种全栈生成路线，模型直接拉起一个 Next.js 或者 Vite 项目，输出一坨工程结构。

这两个方向都有一个共同假设，你想做的是一个软件项目。

Simon 这个模式打破了这个假设。他说很多时候你不想做项目，你只想做一个一次性的可视化、一次性的解释、一次性的小工具。这种场景下，单文件 HTML 才是正确粒度。

国内的通义灵码、Trae 我都用过，它们和 Cursor 走的是同一条路，IDE 里补全、项目里生成。这是一条扎实的路。但 Simon 的路是另一条，他不进 IDE，他直接在 Claude Code 终端里要一个 HTML 文件，做完就用，用完就扔，不需要 git，不需要 npm install，不需要部署。

这两条路不冲突，但解决的是不同的问题。我自己用下来的体感是，工程项目用 IDE 集成路线，一次性原型和文档用 Simon 这种 HTML 单文件路线，效率和心智负担都最低。

## 适合套用这个模式的场景

我盘了一下我自己最近两周可以用这个模式重做的东西。

代码审查的辅助报告。Thariq Shihipar 在 Simon 原文里给了另一个 prompt 范例，叫 Claude 帮他审 PR 时让它生成一个 HTML artifact，把 diff 渲染出来，旁注用颜色按严重程度标记。我试了一下，比 GitHub 自带的 PR review UI 体验顺。

技术文档可视化。任何一段你觉得"这东西用文字讲不清楚，得画个图"的代码，都可以用这个模式生成一个带 SVG 流程图的 HTML 解释。

数据分析一次性 dashboard。给一份 CSV 或者一段 JSON，要 Claude 输出一个内联 Chart.js 的 HTML 报告。我们团队周报本来要花 30 分钟整理的图表，现在 5 分钟就能出。

教学材料。我给小朋友讲编程概念时发现这个模式特别好用，让 Claude 生成一个带可视化和小练习的 HTML 页，比 Markdown 教程效果好太多。

会议纪要的结构化版。把会议录音转写丢给 Claude，要它输出 HTML 纪要，分议题、按发言人折叠、带 timestamp 锚点，比 Notion 模板手填快十倍。

## 社区在讨论什么

Simon 这篇文章发出来之后，r/ClaudeCode 和 r/claude 上有几波相关讨论。最高赞的一条是 Claude Code 最近做了桌面端 UI 重构，新增了 HTML/PDF 预览面板（921 赞，226 评论）。这个时间点很有意思，Claude Code 官方也在押注 HTML 输出会变成主流交付物，所以专门给了 preview slot。

r/claude 上另一个 1093 赞的帖子是一个 iOS 老开发者分享的 Claude Code daily use 经验，他特别提到自己写 detailed spec 之后让 Claude Code 出原型，super impressed。这和 Simon 的方法论是一致的，spec 先行，HTML 出原型。

我看到的争议主要在两点。

第一是有人觉得 HTML artifact 取代不了真正的工程项目，这话对，但是 Simon 也没说要取代，他说的是原型和解释这两个场景。

第二是有人担心 Claude 输出的 HTML 不够专业（没有用主流框架）。这话有点本末倒置，单文件 HTML 不依赖框架恰恰是它的优势，零部署成本，浏览器双击就跑，发链接就传播。

## 我的判断

vibe coding 这个赛道现在最大的问题不是模型不够强，而是工具的输出粒度都被 IDE 集成绑死了。

Cursor 系把模型输出绑在文件树上，v0 系把模型输出绑在工程模板上。这两种路径都假设你要做的是一个长期维护的项目。但开发者日常的真实需求里，至少有一半是一次性的，看一眼就扔的，发个链接就走的。

Simon 这个模式之所以"不合理有效"，是因为它把模型的输出粒度从"工程项目"压到了"单文件 HTML"。粒度对了，工具就解锁了。

我准备从下周开始，把团队内所有内部技术分享的 PPT 全部换成 Claude Code 生成的 HTML deck。不用 reveal.js，不用 marp，就一个单文件 HTML，内联 CSS 做动画，内联 JS 做翻页。

如果你也在用 Claude Code、Codex CLI 或者 hermes-agent 这类终端 agent，可以照着 Simon 的 prompt 跑一下你手头任何一段你自己都觉得"得写文档解释一下"的代码。

你会发现 HTML 出来之后，文档这事就变了。

## 相关链接

- Simon Willison 原文 https://simonwillison.net/2026/May/8/unreasonable-effectiveness-of-html/
- Claude Code 官网 https://www.anthropic.com/claude-code
- r/ClaudeCode 上的 Claude Code 桌面端 HTML/PDF 预览讨论 https://www.reddit.com/r/ClaudeCode/comments/1sljk0t/

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
