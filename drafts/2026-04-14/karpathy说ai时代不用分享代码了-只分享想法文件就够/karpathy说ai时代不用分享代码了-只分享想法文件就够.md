# Karpathy说AI时代不用分享代码了，只分享"想法文件"就够

Karpathy 上周发了一条推文，48小时拿了将近26000个赞，5000个 GitHub stars。内容不是什么新模型、新论文，而是一个 Markdown 文件。

一个描述想法的 Markdown 文件。

他管这叫"idea file"。意思是，在 LLM agent 的时代，你不需要分享代码了，你只需要把想法写清楚，丢给对方的 agent，让它根据对方的具体需求去构建。代码是个人化的，但想法是通用的。

这个想法本身就是个活生生的例子。他那个 gist 叫 llm-wiki.md，拿到了17939个 star 和3838个 fork。人们拿着这个文件喂给自己的 Claude Code、Cursor、Codex，各自生成了完全不同的实现。同一个想法，长出了几千种形态。

## 他到底在说什么

Karpathy 的核心观察是，当前的 AI 个人化方向走偏了。

你用 ChatGPT 越久，它"据说"越懂你。但你的数据在哪？在 OpenAI 的服务器上。你能看到它记住了什么吗？不能。你能导出这些记忆吗？很难。你能换一个 AI 继续用吗？不行。

他提出了一个完全不同的路径，用他分享的 Farzapedia（一个叫 Farza 的开发者做的个人 wiki）来举例。这个方案有四个关键原则。

第一，显式化。你的 AI 记忆不是一个黑箱，而是一组你可以浏览、检查、编辑的 wiki 页面。即使这些页面是 LLM 帮你写的，你也能看到它知道什么、不知道什么。

第二，数据属于你。所有信息存在你本地电脑上，不在任何 AI 公司的系统里。

第三，文件优先于应用。记忆的载体是 Markdown 和图片这些通用格式，不是某个 app 的私有数据库。你可以用 Obsidian 查看，可以用 Unix 工具处理，可以 vibe code 一个自己的界面。

第四，自带 AI。你想用 Claude 就用 Claude，想用 Codex 就用 Codex。甚至可以拿开源模型在你的 wiki 上微调，让这个 AI 在权重层面"认识"你。

说真的，我第一次看到有人把"AI 个人化"这件事想得这么清楚。

## 从静态知识库到活的记忆系统

但故事没有停在这里。

社区拿到这个 idea file 之后，48小时内就把它推到了 v2。有开发者给 LLM Wiki 加上了一整套认知科学的机制，让它从一个"静态知识库"进化成了一个模拟人类记忆的系统。

具体来说，v2 加了这些东西。

可信度评分，每条知识都有置信度分数，基于来源数量、最近确认时间、矛盾检测来计算。记忆分层，工作记忆、情景记忆、语义记忆、程序记忆，各自有不同的压缩策略和生命周期。知识图谱，带类型的实体和关系，支持图遍历，比如"A导致B，置信度0.9"。遗忘曲线，长期不访问的知识自动降权，不是删除，而是优先级降低。矛盾解决，AI 主动发现冲突信息，根据来源权威度和时效性自动裁决。

你想想看，这不就是在用文件系统模拟一个大脑吗？会遗忘、会巩固、会自我修复。

## 社区里的多种声音

这个方向引发了很激烈的讨论。

支持者认为这是"file over app"哲学在 AI 时代的完美实践。你的数据用通用格式存储，不被任何平台绑架，AI 公司必须靠产品质量而不是数据锁定来竞争。Karpathy 自己也说，"keep the AI companies on their toes"，让 AI 公司保持紧张。

但也有人指出，这个方案对普通用户的门槛太高了。你得管理文件目录、理解 Markdown 格式、会用命令行工具。Karpathy 自己也承认这一点，"certainly this is not the simplest way to get an AI to know you"。他的回应是，agent 能力是21世纪的核心技能，这些工具说英语、帮你搞定所有电脑操作，值得花时间学。

我认为这两边说的都对，但都忽略了一个更深的问题。

## 我的判断

坦率讲，idea file 这个概念比 LLM Wiki 本身更让我兴奋。

Karpathy 做了一件很反直觉的事。他有能力写出完整的实现，但他故意只分享了一个"有点抽象、有点模糊"的想法描述。他自己的原话是"it's intentionally kept a little bit abstract/vague because there are so many directions to take this in"。

这背后的逻辑是，在 agent 时代，代码是一次性的。你的 agent 可以在几分钟内根据你的具体需求生成完整实现。但好的想法不是一次性的。一个清晰的问题定义、一套设计原则、一个架构直觉，这些东西比任何具体实现都更有价值。

我自己也还在摸索这个方向。但我越来越觉得，我们正在经历一个知识分享范式的转变。过去十年，开源的核心载体是代码仓库。未来十年，可能是 idea file。

不是说代码不重要了。而是代码的保质期在急剧缩短。今天你精心写的实现，三个月后可能被 agent 用更好的方式重写。但一个好的 idea file，三年后拿出来喂给更强的 agent，可能生成出你今天想都想不到的东西。

这会得罪一些人，但我真的认为，很多开源项目未来的核心资产不是代码，而是 README 和 design doc。

## 你现在就能试的事

如果你想体验这个方向，最简单的起点是，打开你的 Claude Code 或 Cursor，把 Karpathy 的 llm-wiki.md 那个 gist 直接粘贴进去，让 agent 帮你搭建一个个人 wiki。用 Obsidian 作为查看界面，所有数据就是本地的 Markdown 文件。

更进一步，试着为你自己的某个项目写一个 idea file。不写代码，只写想法。然后分享给同事，让他们各自用 agent 构建自己的版本。

Karpathy 在推文里说了一句很妙的话，"agent proficiency is a CORE SKILL of the 21st century"。

我想补充一句，写好一个 idea file 的能力，可能是这个核心技能里最被低估的部分。

## 相关链接

- Karpathy 的 idea file gist: https://gist.github.com/karpathy
- Karpathy 原始推文: https://x.com/karpathy/status/2040470801506541998
- Farzapedia 讨论推文: https://x.com/karpathy/status/2040572272944324650

---
相关实体:: [[karpathy|Karpathy]] | [[openai|OpenAI]] | [[claude-code|Claude Code]]
相关主题:: [[ai-coding-tools|AI编程工具]] | [[local-inference|本地推理]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
