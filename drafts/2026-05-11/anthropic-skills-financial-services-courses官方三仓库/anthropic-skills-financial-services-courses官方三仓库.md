# Anthropic 把官方 skills / 金融行业 cookbook / 教育课程三仓库一起开源，国产 Agent 平台该抄哪个

5 月 11 日的 GitHub Trending 我刷到一半愣住了。Anthropic 官方账号在同一天连甩四个仓库进榜单，anthropics/skills 加了 509 星、anthropics/financial-services 一天加 1449 星、anthropics/courses 加 33 星、anthropics/claude-cookbooks 加 78 星。

这是有计划的一波。

5 月 10 日 #10 那篇我写过 addyosmani/agent-skills，那是社区聚合版。这一次 Anthropic 自己把官方版掏出来了，而且不是单仓库，是"框架 + 垂直行业 + 教育课程 + 通用 cookbook"四条腿一起摆上桌。

## 这四个仓库分别在做什么

anthropics/skills 是 Agent Skills 的官方参考实现。每个 skill 就是一个文件夹，里面放一个 SKILL.md，frontmatter 写 name 和 description，正文写指令和示例。仓库分了 Creative & Design、Development & Technical、Enterprise & Communication、Document Skills 四类，还把 Claude 自己在生产用的 docx / pdf / pptx / xlsx 四个文档处理 skill source-available 放出来了。

anthropics/financial-services 是这次最炸的一个。11 个面向金融行业的命名 agent 模板，全部以 Cowork 插件和 Managed Agents API 两种形态同源发布。Pitch Agent 写投行 pitch、Meeting Prep Agent 出客户会议简报、Earnings Reviewer 读财报刷新模型、Model Builder 在 Excel 里搭 DCF 和 LBO、GL Reconciler 对总账差异、KYC Screener 跑入职合规。还有 LSEG 和 S&P Global 的合作伙伴插件挂在 partner-built 目录下。

anthropics/courses 是 Anthropic 自己的教育课程，5 门 Jupyter Notebook 课，从 API Fundamentals 到 Prompt Engineering Interactive Tutorial、Real World Prompting、Prompt Evaluations、Tool Use 一路覆盖完。

anthropics/claude-cookbooks 早就在那儿，42.7k 星，但这次和上面三个一起进 Trending，明显是有人在协调发车节奏。Classification、RAG、Summarization、工具调用、多模态、子代理、提示缓存，一应俱全。

## 为什么是"一起发"，而不是分开发

把这四个仓库拼在一起看，意图就出来了。

skills 仓库给的是基础语法，告诉你"一个 skill 长什么样"。financial-services 给的是产业落地的 ground truth，告诉你"投行/资管这个行业的 11 个高频工作流，官方建议是这么写的"。courses 给的是教育层，从零教你怎么用 API、怎么写 prompt、怎么做评估。cookbooks 给的是横向能力清单。

这是把 Anthropic 自己内部做了一年的工程沉淀，分四个角度一次性外推。

加上 5 月 7 日 Cowork 发布、5 月 8 日 Code 大会、5 月 11 日 SDK v0.100 推出 Managed Agents，这一周 Anthropic 的牌面就清楚了，框架层（SDK + Cowork）、规范层（Skills spec）、垂直层（Financial Services）、教育层（Courses）一起出。

## 社区在吵什么

r/claude 上 5 月 9 日有个高赞帖（610 赞 104 评），标题是 "Anthropic shipped 10 finance agent templates and implication go way beyond finance"。楼主原话是，大多数人会因为标题写着 financial services 就划过去，他们错了。这些模板都能在 Cowork 和 Claude Code 里当插件直接跑，pitch builder、meeting preparer、earnings reviewer 拿到任何 To B 知识工作场景都能改一下复用。

另一个 r/ClaudeAI 上 4 月 21 日的帖子值得拎出来。Tessl 的人做了 880 次评测，11 个 skill × 8 个模型 × 5 个场景，结论是 Haiku 4.5 带 skill 的得分（84.3%）比 Opus 4.7 不带 skill 的得分（80.5%）还高。我看到这个数据时候是有点震的，意思是 skill 这层抽象的杠杆比模型升一档还大。

当然也有反对声音。r/ClaudeAI 4 月 28 日有人骂某篇 "Claude 把数据库删了" 的文章，说那是公司自己工程能力不行甩锅。这条提醒我们一件事，skill 再标准化，落地的工程纪律还是要团队自己扛。

## 国产 Agent 平台该抄哪个

我把国内对照拉一下。

百度千帆 AgentBuilder 有 skill 商店，但内容偏 Demo，垂直行业的官方 cookbook 几乎没有。字节 Coze 在国内的插件市场是最热闹的，但走的是"创作者生态"路线，金融、医疗、法律这种重 know-how 行业的官方深度模板稀缺，主要靠第三方供给。智谱 GLM AgentTool 偏开发者，工具调用做得很扎实，行业垂类的 ground truth 同样不强。阿里 AgentScope 是框架层，定位更像 Anthropic 的 SDK，但还没有把"行业 cookbook"这条线拉出来。

教育这一块更明显。OpenAI 有 cookbook，Anthropic 现在补齐了 courses，国内官方做系统 Jupyter Notebook 课程的厂商几乎没有，大部分还是文档站 + 几个视频。

我的判断是这样。Anthropic 这一波最危险的不是 SDK，不是 Cowork，是 financial-services 这种"我把行业里 11 个最值钱的工作流直接给你范本"的打法。那结果会怎样，To B 销售里 Anthropic 的 SE（解决方案工程师）只要把这套 plugin 装进客户的 Cowork 实例就能跑起来，国内做投行/资管 AI 助手的创业公司原本卖的就是这一层"工作流封装"，被官方直接一刀削平。

但反过来看，这也是国产平台的机会。Anthropic 的 financial-services 是美式金融场景，pitch builder 是 IB 的活、KYC 是美式合规、LBO 是美式估值。国内的金融场景是另一套，私募基金报备、ABS 尽调、个股研报、IPO 招股书，需要本土团队自己写。谁先把"国产金融 cookbook"开源出来，谁就先抢到这个生态位。

医疗、法务、教培、外贸这些行业同理。Anthropic 不会替你做。

## 你今天能动手的事

git clone 三个仓库，下载下来翻 SKILL.md 的格式。

```
github.com/anthropics/skills
github.com/anthropics/financial-services
github.com/anthropics/courses
```

如果你是国内做 agent 中台的，把 financial-services 里 11 个 agent 的 agent.yaml 一份份读一遍，看 sub-agent 是怎么拆的、event 是怎么定义的、技能是怎么 bundle 的。这是目前最详细的"垂直 agent 怎么落地"的官方范例。

如果你是开发者想入门，courses 那 5 门 Jupyter Notebook 是最系统的官方路径，比看博客片段强。

如果你已经在用 Claude Code 或 Cowork，去 skills 仓库的 docx / pdf / pptx / xlsx 四个目录读源码，这是 Anthropic 自己生产环境跑的 skill，看官方怎么写 SKILL.md 比看十篇教程都管用。

留个开放问题，国内哪家平台会第一个把"中国 A 股研报 cookbook"或"国产法务尽调 cookbook"开源出来。我赌字节，你呢。

## 相关链接

- anthropics/skills, https://github.com/anthropics/skills
- anthropics/financial-services, https://github.com/anthropics/financial-services
- anthropics/courses, https://github.com/anthropics/courses
- anthropics/claude-cookbooks, https://github.com/anthropics/claude-cookbooks
- Reddit 讨论, https://www.reddit.com/r/claude/comments/1t7xjvs/anthropic_shipped_10_finance_agent_templates_and/

---
相关实体:: [[anthropic|Anthropic]] | [[claude|Claude]] | [[claude-code|Claude Code]] | [[bytedance|字节跳动]] | [[baidu|百度]] | [[zhipu|智谱]] | [[alibaba|阿里]]
相关主题:: [[ai-coding-tools|AI 编程工具]] | [[agent-frameworks|Agent 框架]] | [[ai-education|AI+教育]] | [[methodology|方法论]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
