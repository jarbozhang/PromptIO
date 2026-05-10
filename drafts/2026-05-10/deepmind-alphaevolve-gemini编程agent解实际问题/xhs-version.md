# DeepMind AlphaEvolve 把 Gemini 推到真实工业问题，国产 coding agent 该看的是这套思路

5 月 7 日 DeepMind 发的 AlphaEvolve 进展报告，HN 上挂到 324 点 147 评论。光看标题"Gemini-powered coding agent scaling impact across fields"，很容易把它当成又一个 Cursor、Claude Code 的同类。

但它跟前者根本不是一类东西。

普通 coding agent 是把人类工程师写代码这件事自动化。AlphaEvolve 是把"科研里那种反复试错搜索更优解"这件事自动化。它不在 IDE 里跑，跑在数据中心调度、芯片 RTL、矩阵乘法分解、量子电路、基因组测序这些有明确目标函数的真实问题上。

## AlphaEvolve 的 pipeline 三层骨架

第一层，候选生成。Gemini Pro 出"创意性大改"，Gemini Flash 出"小幅微调"。Pro 探索远的方向，Flash 把当前最优解的邻域翻一遍，分工不替代。

第二层，自动评估。每个候选程序丢进评估器跑，拿到分数。评估器不是 LLM 打分，是程序化的，可以是数值仿真、单元测试、SAT/SMT 求解器。

第三层，进化循环。高分留下作为下一轮种子，低分淘汰，保留种群多样性避免提前收敛。这是 FunSearch 思路放大版，加上更强 base model 和更工程化的 evaluator 基础设施。

跟 Claude Code、Cursor、Aider 走的是两条路。后者是单次推理，模型读代码写代码，用户审查反馈，循环主体是人类用户。AlphaEvolve 的循环主体是评估器，每秒跑几十上百次迭代，搜索深度做到人类工程师做不到的尺度。

## 跑出来的真实成果

挑几个有体感的看。

PacBio 基因组测序 DeepConsensus 这条线，AlphaEvolve 把变异检测错误率降了 30%，直接体现到测序成本。

电网调度 AC Optimal Power Flow 老大难问题，传统求解器跑出来 14% 是可行解，AlphaEvolve 改完到 88%。电网公司不用再派工程师手动 fallback 处理 80% 不可行案例。

Google 自家 Spanner 数据库写放大降 20%。Klarna 训 Transformer 速度快一倍。FM Logistic 配送路径效率提 10.4%，年节省 1.5 万公里。Schrödinger 做药物分子动力学，机器学习势能函数训练推理 4 倍加速。

这些不是 benchmark 数字，是已经在生产环境上线的优化。

值得对比的是更早 AlphaTensor 把 Strassen 保持五十多年的 4×4 矩阵乘法 49 步改到 47 步。AlphaEvolve 是这条路线的产品化版本，目标问题从"数学问题"扩到"任何能写出评估器的工程问题"。

## 国产 coding agent 团队该看哪条路径

字节 deer-flow、智谱 Cogito、阿里 Qwen Coder 这几条线，目前都在追"单次推理质量"这个方向，模型更聪明、上下文更长、工具调用更准。这条路对得上 Cursor，但对不上 AlphaEvolve。

跟得上的部分是基础模型。Qwen3 Coder、GLM-4.6 Coding 这一档已经够格当 evaluator-loop 里的候选生成器。把 Qwen Coder 当 Pro、更小的当 Flash，搭双模型组合不是问题。

跟不上的部分是 evaluator 工程化。AlphaEvolve 真正的护城河不是 Gemini 多强，是 DeepMind 那套"针对每个具体问题快速搭出可程序化评估器"的能力。基因组、电网、芯片每一个 domain 都需要 domain expert 和 ML infra 工程师配合，定义评估函数、搭仿真环境、把人类专家判断转成可计算分数。

国内有几支团队在走这条路。华为诺亚做芯片 EDA 那条线，evolutionary search + RTL 评估器；阿里达摩院过去在物流路径上做过类似的搜索 + ML 组合。但都是研究院孤岛，没产品化成"可复用 agent 基座"。

第二个跟不上的是问题选择。AlphaEvolve 选的都是"目标函数清晰、人类专家搜了 N 年、提升一个百分点都值钱"的问题。国内大模型过去三年训练 reward signal 大量来自代码题、数学题、benchmark，对真正工业优化问题缺少积累。

## 我的判断

AlphaEvolve 这条线验证了一个之前很多人不愿意承认的事实。LLM 在"开放式创意任务"上的瓶颈，靠堆参数堆数据短期内突破不了；但 LLM 在"封闭式带评估器的搜索任务"上，可以替代专家把搜索深度推到人类做不到的尺度。

国内 coding agent 团队接下来该想的不是怎么追上 Cursor，是怎么在自己 domain 优势里找到几个"能写出评估器的真实工业问题"，把现有 Coder 模型当候选生成器扔进去跑。

电网、电池、芯片 RTL、新能源车 BMS 算法、运力调度，这几个 domain 中国本来就有数据、有工程师、有真实需求。把"我们模型在 SWE-Bench 上比 GPT-5 高几个点"换成"我们 agent 帮某电网公司把 OPF 可行解从 X% 提到 Y%"，叙事完全不一样。

下一步是工程组织问题，不是模型能力问题。

## 相关链接

- AlphaEvolve impact 报告 https://deepmind.google/blog/alphaevolve-impact/
- HN 讨论串 https://news.ycombinator.com/item?id=48050278
- AlphaEvolve 原始论文（2025）https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/
- FunSearch 原始论文（前身）https://www.nature.com/articles/s41586-023-06924-6

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 7/10 | 品牌✓ 利益点✓ 可操作✗ -->
