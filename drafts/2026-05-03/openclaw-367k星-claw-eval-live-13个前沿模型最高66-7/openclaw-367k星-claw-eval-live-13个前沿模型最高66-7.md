# openclaw 367k 星了，又一篇 arxiv 用 ClawHub Top-500 把 13 个前沿模型卡在 66.7% 过不去

5 月 3 日这天，openclaw 主仓库的 star 数停在 367,750，fork 75,676。同一天 arxiv 上挂出一篇叫 Claw-Eval-Live 的论文，把 ClawHub 上最热的 500 个 skill 拿出来，当成 agent 评测任务集，跑了 13 个前沿模型。

最高通过率 66.7%。没有一个模型摸到 70%。

这两件事撞在同一天，不只是巧合。openclaw 已经从一个"开源 AI 助手项目"长成了一个被学术圈拿来当评测基准的生态，读者拿 ClawHub 上随便一个 skill 自己跑同样的 evaluation，就能直接知道，自己天天在用的 AI 工作流，到底卡在哪一格。

## openclaw 这个仓库现在是什么量级

仓库自报家门一句话，"Your own personal AI assistant. Any OS. Any Platform. The lobster way."

数据冷一点看。367k 星、75k fork、TypeScript 主体、2025 年 11 月 24 日建仓，到 2026 年 5 月 3 日还在每天 push。半年时间跑到这个量级，topic 标签里写着 ai、assistant、crustacean、molty、openclaw、own-your-data、personal，own-your-data 这一项是关键，整个项目的卖点就是数据本地、跨平台、不绑定单一供应商。

ClawHub 是这个生态的 skill 市场。社区贡献的 skill 排成一个 ranking，Top-500 就是当下被实际工作流真实拉起来用的那批。Claw-Eval-Live 这篇论文的核心动作，就是把这 500 个 skill 当成"真实工作流需求信号"，固化成可复现的评测任务。

## Claw-Eval-Live 在做一件什么样的事

作者列表 Chenxin Li / Zhengyang Tang / Huangxin Lin / Yunlong Lin / Shijue Huang，分类挂在 cs.SE 和 cs.AI，4 月 30 日提交。

论文的设计思路有两层。

第一层，把评测拆成可刷新信号层加可复现快照层。信号层从 ClawHub Top-500 这种公共工作流需求信号里来，每次 release 跟着外部需求迭代；快照层固定 fixture、service、workspace 和 grader，时间戳锁住，保证任何人在任何时间跑出来的结果可以横向比较。这一刀切下去，解决了传统 agent benchmark 最尴尬的问题，任务集发布之日就开始过时，模型一过拟合就刷分通胀。

第二层，grader 不是只看最终回复，而是记 execution trace、audit log、service state、post-run workspace artifact。能用确定性检查的就用确定性检查，只在语义维度上才让 LLM 当 judge。换成大白话，agent 干活有没有真的把数据库写对、文件改对、API 调对，是看证据的，不是看模型最后那句话说没说"已完成"。

当前 release 105 个任务，覆盖受控业务服务和本地 workspace 修复两大类，13 个前沿模型在同一套公共 pass 规则下跑分。

## 66.7% 这个数字到底那结果会怎样

最高 66.7%，没有模型过 70%。三个细节比这个数字本身更值得看。

一是失败有结构。论文明确指出，HR、management、多系统业务流程这三类是持续瓶颈。也就是跨服务、跨权限、跨人协作的那种工作流，目前没有一个前沿模型能稳定搞定。

二是本地 workspace 修复反而表现更好。文件级、目录级的修补类任务，agent 已经做得相对成熟。这跟过去半年 Cursor、Claude Code 这类工具能稳定落地的体感是一致的，纸面上的代码修改类任务，前沿模型确实接近可用。

三是 Top-500 不是研究者拍脑袋选的，是 ClawHub 社区真实跑出来的高频 skill。所以 66.7% 这个数字，可以直接被理解成"普通用户从 ClawHub 装一个 skill 来用，三次里大概还有一次会出错，且错的方式可能是静默错而不是显式报错"。

这就是为什么 Claw-Eval-Live 把 audit log 和 workspace artifact 作为评分依据。最终回复说"完成"，但数据没写对、文件没改对，才是 agent 落地里真正的雷。

## 社区在并行讨论什么

Reddit 上最近一个月，跟 openclaw 直接相关的几个高赞讨论，关注点跟论文形成了互补。

r/better_claw 在 4 月 13 日有一帖 GLM-5.1 vs Sonnet vs MiniMax for OpenClaw，26 赞 22 评论。讨论的核心是 Anthropic 限制后，社区在 openclaw 里把后端模型换成 GLM-5.1、MiniMax 等替代方案的实测对比。这帖底下吵得比较凶的一个分歧，是"在 openclaw 这套调度逻辑下，便宜的国产模型在哪些 skill 上能跟 Sonnet 接近，在哪些上掉得很厉害"。

r/AskClaw 4 月 7 日有一帖 Benchmarked 5 agent orchestration layers，4 赞 5 评论，体量小但内容硬。作者把 OpenClaw 和 Hermes Agent 等 5 个 orchestration 层在本地部署和托管两种环境下做了 setup 时间、RAM、token 开销的横评。这种民间 benchmark 跟 Claw-Eval-Live 之间的关系是，前者关心"跑起来贵不贵卡不卡"，后者关心"跑出来对不对"，两边数据合起来才是完整的部署决策依据。

r/openclawsetup 4 月 5 日 A week on agent memory after OpenClaw → Hermes 这帖换了个角度，讨论 agent 在跨天、跨工具、跨迁移时的"continuity"，能不能保持作为同一个工作伙伴的状态，而不只是"能不能召回某个事实"。这跟 Claw-Eval-Live 论文里多系统业务流程是瓶颈的观察对得上，记忆和上下文连续性正是跨系统工作流最容易断裂的地方。

社区数据点比论文窄但更接地气。把两边放一起看，前沿模型卡在 66.7% 这个数字就不是抽象的，是每个真用 openclaw 的人都能在自己本地复现的痛感。

## 读者能拿这个做什么

Claw-Eval-Live 论文里说每个 release 是 time-stamped、fixture 固定、grader 公开，可复现性虽然没强调但实际具备。普通用户可以做三件事。

第一件，挑 ClawHub 上自己天天用的某个 skill，对照论文里同类任务的 grader 设计，跑一次自检。如果论文说 HR 类任务是瓶颈，而你的工作流恰好跑的是请假审批、绩效汇总这种 HR 流程，可以预期它有 1/3 概率走偏。

第二件，把后端模型换成不同候选，Sonnet、GLM-5.1、MiniMax、Qwen3 等等，在同一个 skill 上跑同一个任务，看 audit log 和 workspace artifact 的差异。这一步是 r/better_claw 那帖讨论的延伸，但用 Claw-Eval-Live 的 grader 思路代替"凭感觉"。

第三件，本地 workspace 修复类任务表现好，是个利好信号。把 openclaw 的使用重心放到代码 / 文件 / 目录级别的自动化上，比放到跨系统业务流程上回报率高。多系统业务流程那块，至少这一代前沿模型还不能闭眼托管。

## 一个判断

openclaw 走到 367k 星，已经过了"工具好不好用"的阶段，进入了"被研究界当成生态指标"的阶段。Claw-Eval-Live 这种把 ClawHub Top-500 直接当评测信号源的论文，在未来半年可能会越来越多，因为它解决了传统 benchmark 的过时问题，又解决了"任务集是否反映真实需求"这个长期争议。

对中国用户的可操作意义是，openclaw 现在是一个少数同时被英文社区、中文社区、学术界三方持续投入的 agent 平台。在国内访问 Anthropic 越来越曲折的现实下，openclaw 加 ClawHub 加国产模型后端这套组合，是目前看下来最能复现 Claude Code 工作流体感、又不卡在网络访问问题上的路径。

Claw-Eval-Live 的下一个 release 会带来什么新瓶颈，值得每个真在用 agent 干活的人盯一下。

## 相关链接

- openclaw 主仓库 https://github.com/openclaw/openclaw
- Claw-Eval-Live 论文 https://arxiv.org/abs/2604.28139v1
- ClawHub skill 市场（按论文描述的 Top-500 入口查阅）
- r/better_claw GLM-5.1 vs Sonnet 讨论 https://www.reddit.com/r/better_claw/comments/1skcd3n/
- r/AskClaw 5 个 orchestration 层 benchmark https://www.reddit.com/r/AskClaw/comments/1sejmks/

---
相关实体:: [[openclaw-org]] | [[claw-eval-live]] | [[claw-hub]]
相关主题:: [[openclaw-ecosystem]] | [[agent-evaluation]] | [[ai-research]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
