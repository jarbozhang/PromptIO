# Hugo He 的 ppt-master 一夜涨 370 星，AI 生成的 PPTX 是真能改的

GitHub Trending 今早冒出来一个仓库叫 ppt-master，作者 Hugo He，一天 +370 星，总数已经到 10.5k。

我点进去之前以为又是一个"AI 一键生成 PPT"的轮子。市面上这种东西太多了，本质都一样，AI 排版完导出一张张图片塞进 PPTX，文件打开是好看，双击文字框，发现是图，没法改。

ppt-master 不是这路。它生成的是 PowerPoint 原生 shapes，文本框就是文本框，形状就是形状，连动画和翻页效果都是 OOXML 原生的。

这件事如果属实，国内做汇报的人要重新评估一下生成 PPT 的工作流了。

## 为什么"原生可编辑"是分水岭

公司汇报场景里，AI 生成 PPT 一直卡在最后一公里。

老板看完说"这页换个标题"，你打开一看，整页是 AI 渲出来的一张图，连字都改不了。要么从头让 AI 重做一版，要么自己手搓一个空 PPT 把内容贴回去。两种都比从零开始还累。

这就是为什么大多数人在公司里宁愿用 PPT 模板，也不用 AI 生成的。AI 的输出在协作链条里是个死胡同。

ppt-master 的核心承诺就一句话，每个元素都是直接可点击和可编辑的。文本是文本框，图表是 native chart，连页面切换的转场动画都是 PowerPoint 原生的那套（OOXML 标准里的 transition 标签）。导出一份 .pptx，扔给同事，对方在 Office 或 WPS 里打开，跟手搓的没区别。

## 它怎么用，老实讲门槛不低

我看了下 README，安装路径是这样的。

下载 ZIP 或者 git clone 仓库，进目录，pip install -r requirements.txt，Python 3.10+。这步很标准。

然后是关键的认知错位。它**不是一个 CLI 工具，也不是 Web 服务**。它是一套给 Cursor / Claude Code / VS Code 这类 AI IDE 用的 skill 集合。你的使用方式是在 IDE 的对话框里跟 AI 说，"把 projects/q3-report/report.pdf 做成 PPT"，AI 调用 ppt-master 这套脚本，分析内容、生成 SVG 设计稿、再编译成 PPTX，扔到 exports/ 目录下。

输入支持 PDF、DOCX、图片，也支持 URL（包括微信文章链接），还能直接粘贴文本。

输出是一份带时间戳的 .pptx，可以直接发给同事改。

但这就引出两个前提，你得有一个能用的 AI IDE，且这个 IDE 背后的 LLM 得够强。作者明确推荐 Claude Opus 4.7，官方 demo 那张 12 页 PPT 就是 Opus 4.7 跑出来的。GPT、Gemini、Kimi、MiniMax 也支持，但效果文档没承诺。

## 国内用户的真问题，能不能不用境外 API

这是我看到的最大不确定。

仓库赞助商是 PackyCode，提供 API relay。文档列出来支持的模型主要是云端大厂，Claude、GPT、Gemini、Kimi、MiniMax。**Kimi 和 MiniMax 是国产**，理论上你拿月之暗面或者 MiniMax 的 API key 就能跑，不需要折腾境外 API。

DeepSeek 和 Qwen 文档里没明说支持。但因为它本质是个 prompt + 工具调用的 skill 框架，跟 IDE 后面接的 LLM 解耦，理论上只要 IDE 那一层（Cursor 国内版、各种 Claude Code 国产 fork）能挂上 DeepSeek 或 Qwen，应该就能跑。**这个我没亲测，谁先试出来欢迎留言**。

如果你公司里有 OpenRouter 账号或者拿到了 Kimi K2 / MiniMax 的 API，这个工具的成本结构是清楚的。12 页 PPT 用 Opus 4.7 跑一次，按 Anthropic 公开报价大概 1-3 美金这个量级，换成 Kimi 或 MiniMax 应该能再砍一个数量级。

## 跟"AI PPT" SaaS 比，差异在哪

国内做 AI PPT 生成的产品不少，闭源 SaaS 一搜一大把，模板花哨、操作流畅、订阅制按月扣费。

ppt-master 走的是另一条路，开源 MIT、本地运行、PPTX 原生输出。代价是你要会用 IDE、要管 API key、要自己挑 LLM。

这两类产品其实不是直接竞品，受众不重合。SaaS 卖的是"非技术人不用动脑"，ppt-master 卖的是"技术人想完全控制输出格式"。

但有个交集是公司里同时有两类需求的用户，平时拿模板填字够用，偶尔做一份董事会汇报、外部客户提案，对最终 PPTX 的可控性、可改性、不留水印这些点要求很高。这种情况下 ppt-master 这条路就有它独特的位置。

## 这条路为什么值得国内团队抄一下

国产 AI PPT 工具做了三四年，输出质量一直卡在"看着像 PPT、其实是图集"这一步上。ppt-master 这个仓库给出的方向，是把 PPT 生成这件事从"图像合成"拽回到"结构化文档生成"，直接产出 OOXML，让 PowerPoint 自己去渲染。

这个方向更难（要懂 PPTX 内部格式、要让 LLM 准确生成符合规范的 XML），但天花板更高（输出真正可编辑、可协作、可二次设计）。

Hugo He 用 Python 实现了这件事，开源 MIT 出来，10.5k 星说明社区认可。国内做办公自动化的团队应该认真看看这个仓库，至少思路上是值得抄的。

## 上手路径

如果你想今晚就试一下，路径是这样的。

第一步，git clone 仓库到本地，pip install。第二步，准备一个能调 LLM 的 IDE 环境（Cursor、Claude Code 都行），把仓库目录加到 IDE 的 workspace。第三步，在对话框里贴一份 PDF 路径或一段文本，让 AI 帮你生成 PPT。第四步，去 exports 目录拿成品，PowerPoint 或 WPS 打开验证可编辑性。

如果你只是想看效果，不想装环境，作者把 demo 页搭在 https://hugohe3.github.io/ppt-master/ ，6 种风格的样张可以直接看。

回到开头那句"PPT 是真能改的"，这事儿真的能不能成立，最终还是要你自己拿一份你公司的真实素材跑一遍才知道。GitHub 上 10.5k 星、一晚 +370 的热度可以做参考，但代替不了你自己改三页 PPT 的体感。

## 相关链接

- 仓库: https://github.com/hugohe3/ppt-master
- 官方 demo: https://hugohe3.github.io/ppt-master/
- License: MIT
- 作者: Hugo He

---
相关实体:: [[ppt-master|ppt-master]] | [[hugo-he|Hugo He]]
相关主题:: AI+办公 | [[ai-coding-tools|AI 工具]] | 国产开发者

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
