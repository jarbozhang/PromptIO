# DeepMind AlphaEvolve 把 Gemini 编程 agent 推到真实问题，国产 coding agent 该看的是这套思路

---
相关实体:: [[deepmind|DeepMind]] | [[google|Google]] | [[gemini|Gemini]] | [[bytedance|字节跳动]] | [[zhipu|智谱]] | [[alibaba|阿里]]
相关主题:: [[ai-coding-tools|AI 编程工具]] | [[ai-research|AI 研究]] | [[agent-frameworks|Agent 框架]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✗ -->

---

5 月 7 日 DeepMind 发的 AlphaEvolve 进展报告，HN 上挂到 324 点 147 评论。如果只看标题"Gemini-powered coding agent scaling impact across fields"，很容易把它归到又一个 Cursor、Claude Code 同类。

但它跟前者根本不是一类东西。

普通 coding agent 是把人类工程师写代码这件事自动化，AlphaEvolve 是把"科研里那种反复试错搜索更优解"这件事自动化。AlphaEvolve 不在 IDE 里跑，它跑在数据中心调度、芯片 RTL、矩阵乘法分解、量子电路、基因组测序这些有明确目标函数的真实问题上。

## AlphaEvolve 这套 pipeline 到底是什么

读 DeepMind 这篇 impact 报告，骨架其实很清楚，三层。

第一层，候选生成。Gemini Pro 负责出"创意性大改"，Gemini Flash 负责出"小幅微调"。Pro 探索远的方向，Flash 把当前最优解的邻域翻一遍。两个模型不是替代关系，是分工。

第二层，自动评估。每个候选程序丢进一个评估器跑，拿到一个或多个分数。这个评估器不是 LLM 来打分，是程序化的，可以是数值仿真、可以是单元测试、可以是 SAT/SMT 求解器。

第三层，进化循环。把高分程序留下，作为下一轮 prompt 的种子；低分淘汰；保留种群多样性，避免提前收敛。这其实就是把 FunSearch 的思路放大，加上更强的 base model 和更工程化的 evaluator infra。

跟 Claude Code、Cursor、Aider 的区别在哪。后者是单次推理，模型读代码、写代码、用户审查、反馈、再写。循环主体是人类用户。AlphaEvolve 的循环主体是评估器，模型不需要等用户反馈，每秒钟跑几十上百次迭代，把搜索深度做到人类工程师做不到的尺度。

换言之，普通 coding agent 优化的是"单次代码生成质量"，AlphaEvolve 优化的是"在一个明确目标函数上的搜索效率"。

## 跑出来的真实问题成果

DeepMind 这次列的成绩单，挑几个有体感的看。

PacBio 做基因组测序，DeepConsensus 这条线 AlphaEvolve 把变异检测错误率降了 30%。这是直接能体现到测序成本上的数字。

电网调度，AC Optimal Power Flow 这个老大难问题，传统求解器跑出来 14% 是可行解，AlphaEvolve 改完到 88%。所以呢电网公司不用再派工程师手动 fallback 处理 80% 的不可行案例。

Google 自己的 Spanner 数据库，写放大降了 20%。Klarna 训 Transformer 速度快了一倍。FM Logistic 配送路径效率提了 10.4%，年节省 1.5 万公里。Schrödinger 做药物分子动力学，机器学习势能函数训练和推理 4 倍加速。

这些不是 benchmark 里跑出来的好看数字，是已经在生产环境上线的优化。

值得对比的是更早 DeepMind 在 4×4 矩阵乘法上的发现，Strassen 1969 年给出的 49 步算法保持了五十多年，AlphaTensor 把它改进到 47 步。AlphaEvolve 是这条路线的产品化版本，目标问题从"数学问题"扩展到了"任何能写出评估器的工程问题"。

## 国产 coding agent 团队，该看的是哪条路径

字节 deer-flow、智谱 Cogito、阿里 Qwen Coder 这几条线，目前都还在追"单次推理质量"这个方向。模型更聪明、上下文更长、工具调用更准。这条路对得上 Cursor 和 Claude Code，但对不上 AlphaEvolve。

跟得上的部分是基础模型。Qwen3 Coder、GLM-4.6 Coding 这一档已经够格当 evaluator-loop 里的候选生成器。把 Qwen Coder 当 Pro、把更小的 Qwen Coder Flash 当 Flash，搭出双模型组合不是问题。

跟不上的部分是 evaluator 这一层的工程化。AlphaEvolve 真正的护城河不是 Gemini 多强，是 DeepMind 内部那套"针对每个具体问题快速搭出可程序化评估器"的能力。基因组、电网、芯片这些 domain，每一个都需要 domain expert 和 ML infra 工程师配合定义评估函数、搭仿真环境、把人类专家的判断转成可计算的分数。

国内有几支团队在朝这个方向走。华为诺亚做芯片 EDA 那条线，说到底就是 evolutionary search + RTL 评估器；阿里达摩院过去在物流路径上也做过类似的搜索 + ML 组合。但这些都是研究院里的孤岛，没有像 AlphaEvolve 这样被产品化成"可复用的 agent 基座"。

第二个跟不上的是问题选择。AlphaEvolve 选的都是"目标函数清晰、人类专家已经搜过 N 年、提升一个百分点都值钱"的问题。国内大模型团队过去三年的训练 reward signal 大量来自代码题、数学题、benchmark，对真正的工业优化问题缺少积累。

## 我的判断

AlphaEvolve 这条线，验证了一个之前很多人不愿意承认的事实，LLM 在"开放式创意任务"上的瓶颈，靠堆参数、堆数据短期内突破不了；但 LLM 在"封闭式带评估器的搜索任务"上，可以替代专家把搜索深度推到人类做不到的尺度。

国内 coding agent 团队接下来该想的不是怎么追上 Cursor，是怎么在自己的 domain 优势里，找到几个"能写出评估器的真实工业问题"，把现有 Coder 模型当作候选生成器扔进去跑。

电网、电池、芯片 RTL、新能源车 BMS 算法、运力调度，这几个 domain 中国本来就有数据、有工程师、有真实需求。把"我们模型在 SWE-Bench 上比 GPT-5 高几个点"换成"我们 agent 帮某电网公司把 OPF 可行解从 X% 提到 Y%"，叙事就完全不一样了。

下一步是工程组织问题，不是模型能力问题。

## 相关链接

- AlphaEvolve impact 报告，https://deepmind.google/blog/alphaevolve-impact/
- HN 讨论串，https://news.ycombinator.com/item?id=48050278
- AlphaEvolve 原始论文（2025），https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/
- FunSearch 原始论文（前身），https://www.nature.com/articles/s41586-023-06924-6

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✗ -->
