# 画技术架构图再也不用对齐了，这个 Claude Code Skill 一句话出图

上周我画一张 Multi-Agent 架构图，在 diagrams.net 里拖了四十分钟。六个 Agent 节点怎么都对不齐，箭头交叉得像意大利面，配色更不用说了，默认蓝灰色方块堆在一起，截图发群里同事问我"这是上世纪的 PPT 吗"。

我是真的觉得，2026 年了，画个技术图不应该还这么痛苦。

然后我发现了 fireworks-tech-graph。

## 它解决了什么问题

fireworks-tech-graph 是一个 Claude Code Skill，作者是"一枝烟花"（yizhiyanhua-ai）。你在 Claude Code 里用自然语言描述你要什么图，它直接生成高清 SVG，再自动转 1920px 的 PNG。

不用拖拽，不用对齐，不用配色。

我第一次试的时候输入了一句"画一个 RAG pipeline 的架构图"，大概两秒钟，一张带 Embedding、向量检索、LLM 生成完整链路的图就出来了。节点形状、箭头方向、颜色编码全是自动的。坦率讲，比我手动画四十分钟的效果好十倍。

## 我实际跑了一圈

安装很简单，两步。先装依赖 `brew install librsvg`（PNG 导出靠 rsvg-convert），然后一行命令把 Skill 拉下来。

```
git clone https://github.com/yizhiyanhua-ai/fireworks-tech-graph.git ~/.claude/skills/fireworks-tech-graph
```

装完之后在 Claude Code 里直接说话就行。我测了几种场景。

**场景一，RAG 流程图。** 输入"Draw a RAG pipeline flowchart"，出来的图自动把 User Query、Embedding、Vector Store、LLM 这些节点按语义分层排列，向量数据库用带环的圆柱体表示，LLM 用双边框矩形加闪电符号。这些形状语义不是随便选的，它内置了一套 AI 领域的视觉规范。

**场景二，Multi-Agent 协作图。** 就是我之前手动画崩的那种。这次输入"Generate a multi-agent collaboration diagram, glassmorphism style"，出来的图是毛玻璃风格的暗色背景，每个 Agent 是六边形节点，Tool 是齿轮矩形，箭头颜色自动区分数据流和异步事件。

说真的，我当时愣了几秒。

**场景三，Mem0 记忆架构。** 这个比较小众，但它居然内置了 Mem0 的记忆层架构模板，短期记忆用虚线圆柱，长期记忆用实线圆柱，感觉作者确实是做 AI Agent 开发的人。

## 7 种风格，不只是换个颜色

一开始推文说 5 种风格，实际翻 GitHub 仓库发现已经有 7 种了。

默认的 Flat Icon 风格白底彩色，适合博客和文档。Dark Terminal 是暗色背景加霓虹高亮，适合技术分享。Blueprint 是深蓝底加青色描边，有工程蓝图的感觉。Notion Clean 极简白，适合嵌入 Notion 文档。Glassmorphism 毛玻璃效果，适合演讲 slides。还有两个品牌风格，Claude Official 和 OpenAI Official，分别用了 Anthropic 和 OpenAI 的品牌配色。

切换风格只要在描述后面加 `--style glassmorphism` 或者说"style 2"就行。

## 它不只是"好看"

让我觉得有意思的不是颜色，是它的语义系统。

不同类型的组件自动对应不同的形状。Agent 是六边形，LLM 是双边框矩形，Vector Store 是带环圆柱，Decision 是菱形，Tool 是带齿轮的矩形。箭头也有讲究，实线 2px 是主数据流，虚线 (5,3) 是内存写入，虚线 (4,2) 是异步事件，曲线是反馈循环。

这意味着你不需要人工规定"这个箭头用什么样式"，Skill 根据你描述的语义自动选择。而且它内置了 40 多个产品图标的品牌色，OpenAI、Anthropic、Pinecone、Kafka、PostgreSQL 这些都有。

## 我的判断

我认为 fireworks-tech-graph 代表了一个很明确的趋势，Claude Code Skill 生态正在从"帮你写代码"扩展到"帮你做所有开发者周边工作"。画图、写文档、跑测试、管依赖，这些以前需要单独工具的事情，正在被一个个 Skill 吸收进 Claude Code 的工作流里。

但也别神化它。我试了一张比较复杂的微服务架构图，十几个服务加消息队列加数据库，生成出来的布局还是有点挤。对于特别复杂的图，你可能还是需要手动调一下 SVG 源码。不过对于日常写文档、做技术分享、画 RFC 里的架构图，它已经够用了。

可能有些想法还不成熟，但我觉得 Skill 生态的价值不在于每个 Skill 有多完美，在于它把那些"本来不值得花时间但又不得不做"的事情从 30 分钟压缩到 30 秒。画图就是一个典型例子。

回到我开头那张 Multi-Agent 架构图，我用 fireworks-tech-graph 重新生成了一版发到群里，同事说"这图谁画的，挺专业"。

我说 Claude 画的，两秒钟。

## 相关链接

- fireworks-tech-graph GitHub 仓库，https://github.com/yizhiyanhua-ai/fireworks-tech-graph
- Claude Code Skills 文档，https://docs.anthropic.com/en/docs/claude-code/skills

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
