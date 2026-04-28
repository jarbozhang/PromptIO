# Google + Kaggle 又开了 5 天 AI Agent 速成课，免费，6 月开课

Google 把那个被 150 万人刷过的 5-Day GenAI Intensive 又拉回来上了。

这次主题换了，叫 5-Day AI Agents Intensive，配套口号是"Vibe Coding"。开课时间 2026 年 6 月 15 日到 19 日，五天连上，免费，Kaggle 报名。

我先把结论摆这儿，**这不是那种"看完就忘"的 Coursera 课**。上一届跑完是要交 capstone 的，没交完拿不到证书。这一届据 Google 博客原文，依然要"complete the final capstone project"。也就是说，你得真把一个 Agent 跑通。

## 这门课到底要教什么

官方原话只给了几个关键词，我不打算往里硬塞。能确认的就这些，

- **核心概念**，从 foundational concepts 一路到 production-ready systems
- **Vibe Coding 工作流**，Google 把"自然语言当主要编程接口"这件事单拎出来当主题
- **工具与 API 集成**，原文写的是"10x agents"，意思是怎么把 LLM 接外部工具、把单点能力变成行动力
- **Capstone 项目**，五天结束你得交一个能跑的东西

至于 Day 1 到 Day 5 每天具体讲什么、谁来讲，**Google 截至今天还没放课表**。我去翻了 Kaggle 那个课程页，目前只挂了标题和倒计时，详细 syllabus 大概率会在 5 月底 6 月初放出来。参考上一届的节奏，是开课前两周才铺完整 codelab。

我提一句过往参考，2024 年第一届的五天分别是基础模型与 prompt engineering、embeddings 与向量数据库、AI agents、领域微调、MLOps。这一届主题换成了 Agent，所以课程结构肯定会重写，**别拿老课表当这届的预告**。

## 谁讲、需要什么基础、证书怎么拿

讲师阵容博客里只写了"updated content, new speakers"，老传统是 Google Research、DeepMind 工程师 + Kaggle Grandmaster 混搭，每天有直播 livestream + Discord 答疑。

基础要求，我从过往经验给你一个真实预期，

- **Python 不能从零**，基础语法、调包、能读 traceback 是底线
- **Colab 用过最好**，整个课程的 notebook 都在 Colab 上跑，免费 T4 GPU 配额够用
- **Gemini API**，会发免费 key，无需信用卡

证书逻辑很简单，**交 capstone 才有 certificate**。上一届有 28 万人注册，最后拿到证的不到 10%。不是难，是大部分人撑不到第五天。

## 社区怎么看上一届

我把 Reddit、HN 上能搜到的反馈过了一遍，几个高频评价，

**正面**，"五天密度比我读半学期 ML 课还高"是 r/MachineLearning 出现频率最高的一句话。第一届的白皮书在 X 上被反复传，做企业 AI 的人当作内部入门材料发。

**负面**，"livestream 节奏太赶"、"capstone 题目偏开放，没思路的人会卡住"、"Discord 答疑后期人太多刷不过来"。

**中肯**，知乎上有几个国内做大模型的工程师讲过，这门课的价值不是教你新东西，是**给你一个被 Google 工程师亲口确认的"这就是当前最佳实践"的参照系**。你自己摸索半年得出的结论和 DeepMind 工程师当面讲的，权威性不一样。

中文 AI 圈对这门课的认知度，坦率讲，**比英文圈低一个量级**。同期清华深研院的开源大模型公开课、吴恩达 DeepLearning.AI 的 Agent 课在国内讨论度更高。

## 我的判断

这门课对中国 AI 工程师，**值得报，但不要当"主菜"**。

我的判断是，如果你已经在做 Agent 相关项目，这五天能给你三样东西，一是 Google 内部对 Agent 的"官方叙事"，知道大厂怎么想这件事；二是 Gemini 系列的免费额度和实操路径；三是一个能跑通的 capstone，写在简历里挺硬。

但如果你刚入门，**别指望它替代系统课**。五天的密度决定了它是"快闪"，不是"打地基"。吴恩达那套从 0 到 1 的 Agent 短课、Hugging Face 的 Agents Course 更适合新手垫底。

和清北公开课的差异，我觉得很清楚。**国内课偏理论与论文综述，Google 这门偏实战与产品化**。两者不冲突，搭配着上反而互补。

唯一让我犹豫的点是 Vibe Coding 这个包装。"自然语言当编程接口"不是新概念，Cursor、Claude Code 已经把这条路跑了一年多。Google 现在重新捡起来当主题，我不确定是真有新框架要发，还是只是借势。**这点要等 6 月看课表才知道**。

## 行动建议

如果你打算报，

**第一步**，去 Kaggle 搜"5-Day AI Agents Intensive"，找到 2026 年 6 月那期，点 Register。报名只要 Kaggle 账号，邮箱注册即可。

**第二步**，提前把 Colab 跑通。如能访问 Colab，开一个空 notebook 跑一遍 `!pip install google-generativeai`，能装上就说明环境 OK。如果你访问不了 Colab，国内可以用魔搭 ModelScope 的 Notebook 或者阿里云 PAI-DSW 当替代环境，**虽然官方 codelab 是 Colab 版本，但 Python 代码本身搬过去能跑**。

**第三步**，Gemini API key 在 ai.google.dev 申请，免费额度做完整个课绰绰有余。

**第四步**，把 6 月 15 日到 19 日五个晚上空出来。Livestream 是太平洋时间上午开，对应北京时间下午到傍晚，正好下班看。看不上直播没关系，回放和 codelab 都会留在 Kaggle 上。

最后给一个真实预期，**报名的人里有一半会在 Day 2 掉队**。capstone 那道关，五天的人能走到的不到一成。你要是真想拿证，从 Day 1 就得每天保证两三个小时投入。

我会报。我打算用 capstone 做一个 openclaw 生态相关的 Agent demo，到时候单独写一篇复盘。

如果你也报了，欢迎留言告诉我你打算用 capstone 做什么。这种东西聊起来比一个人闷头搞有意思多了。

## 相关链接

- Google 官方公告，<https://blog.google/innovation-and-ai/technology/developers-tools/kaggle-genai-intensive-course-vibe-coding-june-2026/>
- Kaggle 课程入口（搜索 "5-Day AI Agents Intensive"），<https://www.kaggle.com/>
- Gemini API 申请，<https://ai.google.dev/>
- 上一届 GenAI Intensive 白皮书（社区整理），<https://www.kaggle.com/whitepaper-foundational-llm-and-text-generation>

---
相关实体:: [[google|Google]]
相关主题:: [[ai-education|AI+教育]] | [[agent-frameworks|Agent 框架]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
