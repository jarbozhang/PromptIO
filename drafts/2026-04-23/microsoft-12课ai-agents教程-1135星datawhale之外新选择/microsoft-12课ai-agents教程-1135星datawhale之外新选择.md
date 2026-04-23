# Microsoft 这套 12 课 AI Agents 教程一天涨 1135 星，国内 Datawhale 之外又多一个选择

昨晚刷 GitHub Trending，Microsoft 的 ai-agents-for-beginners 一天涨了 1135 颗星，总数已经到 58.4k。

我点进去翻了一圈，第一反应是，这个仓库国内没人聊吗。

更尴尬的是，README 里明明已经挂了简体中文、繁体中文、港澳台版本的翻译入口，但中文社区里几乎没人提。

## 为什么这事值得停下来看一眼

我两天前刚写过 Datawhale 的 self-llm，那套教程的定位非常清晰，零门槛微调 DeepSeek、Qwen，主打"我教你训模型"。

Microsoft 这套不一样，它从 Lesson 01 开始就在教你"做产品"。

这种差别我以前没意识到有多重要，直到我把 12 课的目录拉出来对着看。

国内主流 AI 教程的肌肉记忆是，先学怎么训、怎么微调、怎么量化部署，Agent 永远排在最后两节当 bonus。Microsoft 这套反过来，Agent 设计模式、工具调用、Agentic RAG、多 Agent 协作、Production 上线、MCP/A2A 协议，全部是主菜。

坦率讲，看完目录我有点心情复杂。

## 12 课具体在教什么

按 README 里的顺序，前 12 课分别是，

1. AI Agent 入门和应用场景
2. 主流 Agentic 框架横评
3. Agentic 设计模式总览
4. Tool Use 设计模式
5. Agentic RAG
6. Trustworthy AI Agent
7. Planning 设计模式
8. Multi-Agent 设计模式
9. Metacognition 设计模式（Agent 的元认知）
10. AI Agent 上生产
11. Agentic 协议（MCP、A2A、NLWeb）
12. Context Engineering for AI Agents

整个仓库 99.7% 是 Jupyter Notebook，每一课都能直接跑。

框架主推的是 Microsoft Agent Framework（MAF）和 Azure AI Foundry Agent Service V2，这是 Microsoft 这两年把 Semantic Kernel 和 AutoGen 合并整合后的新统一品牌。

## 我 clone 下来跑第一课的真实体验

我把仓库拉到本地，进 01-intro-to-ai-agents 目录，第一个动作就是看环境。

setup 文档要求 Azure 账号 + Microsoft Foundry，这一步对国内读者来说就是第一道坎。我没有 Azure 信用卡绑定，绕了一下，发现 README 里有一句"some code samples also support alternative OpenAI-compatible providers such as MiniMax"。

也就是说，理论上你可以把 endpoint 改成任何 OpenAI 兼容的 API，包括 MiniMax、DeepSeek、智谱、火山方舟。

我换成了一个国产 endpoint 跑 hello world Agent，第一课的 notebook 顺利出结果。一个 Agent 接收"帮我规划一次东京旅行"，它自己拆解成几个子任务，调用工具，返回结构化的 itinerary。

说实话第一次跑通的时候，我并没有"卧槽"的感觉。

因为这种 demo 我用 LangChain 跑过太多次。真正让我停下来的是 Lesson 04 的 Tool Use Notebook，那里的 prompt 写得非常工程化，不是教你"call function"的语法，而是教你怎么设计一个让模型不犯傻的 tool schema。

这种差别是教程作者把生产经验沉淀进去的痕迹，国内大部分 Agent 教程没有。

## 横向对比，国内能找到的同类资源

把视野拉宽，国内目前比较成体系的 Agent/LLM 教程大致有这么几个，

Datawhale self-llm，主打微调和本地部署，是国内最完整的"训模型"路径，但 Agent 部分单薄。

阿里通义实验室也出过 Agent 相关教程，散落在魔搭社区，体系化程度不如 Datawhale，更像是产品配套文档。

腾讯 AI Lab 偶尔放一些课程，但更新频率低，且偏研究向。

HuggingFace Course 是国内开发者实际用得最多的英文教程，覆盖 Transformers、Diffusers、RL，去年开始也加了 Agent 模块，但 HuggingFace 自己的 smolagents 路线和工业界主流栈对不上。

Microsoft 这套填的是一个非常具体的空白，从 Day 1 就教你"做产品"而不是"训模型"，并且把 Production、MCP 协议、Multi-Agent 协作这些工程问题摆在主线里。

我的判断是，国内 AI 教程在过去三年走的是"科研后置工程化"的路子，先训模型再考虑怎么用。Microsoft 这套走的是"产品后置技术化"的路子，先教你怎么用，技术细节按需补。

## 一个会得罪人的断言

中国 AI 教程一直在"我教你训模型"，Microsoft 这套从 Day 1 就在"我教你做产品"。

这两种路径背后是两种不同的 AI 工程师画像，一种是会跑 LoRA 会调 batch size，但做不出能上线的 Agent。另一种是不知道 attention 怎么算，但能把 MCP、Tool Use、Multi-Agent 协作组合成一个真实跑在生产环境的系统。

未来三年市场会更需要哪一种，自己想。

## 一个隐藏发现

README 里我注意到一个细节，整套教程通过 GitHub Actions 自动翻译成 50 多种语言，简体中文版本是直接维护的，不是社区翻译。

所以呢，你不用等中文教程，直接读 zh 版本就是和英文同步的。

国内大部分人不知道这件事，因为 Microsoft 的中文 SEO 一直做得稀烂。你在百度搜"AI Agent 教程"几乎搜不到这个仓库。

## 怎么开始

最低成本的路径是这样，

clone 仓库，看 README 里的中文链接进 zh 版本。

如果有 Azure 账号，按官方流程跑，这是最顺的路径。

没有 Azure，把每个 notebook 里的 endpoint 替换成你手头能用的 OpenAI 兼容 API，DeepSeek、Kimi、MiniMax 都行，Lesson 01 到 Lesson 04 应该都能直接跑。

Lesson 11 涉及 MCP 和 A2A 协议的部分，国内还没什么人在玩，这一节如果你能跑通，已经领先 90% 的国内 Agent 开发者。

我现在卡在 Lesson 06 Trustworthy AI Agent，里面用的几个 evaluation 工具是 Azure 专属的，按 README 不详写，等我跑通了再聊。

回到开头那句"中文社区里几乎没人提"，看完这 12 课你可能会和我一样产生一个新的疑问，到底是中文社区不需要这种内容，还是中文社区还没意识到自己需要。

## 相关链接
- 教程仓库，https://github.com/microsoft/ai-agents-for-beginners
- Datawhale self-llm（国产对照），https://github.com/datawhalechina/self-llm
- HuggingFace Course，https://huggingface.co/learn

---
相关实体:: Microsoft | Datawhale
相关主题:: [[agent-frameworks|Agent框架]] | 开源教程 | AI+教育

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
