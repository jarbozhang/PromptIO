# Gemini Robotics-ER 1.6 发布：用国产 VLM 在本地复刻 DeepMind 的多视角空间推理

4 月 14 号，DeepMind 发了 Gemini Robotics-ER 1.6。

ER 是 Embodied Reasoning，具身推理。这个版本号听起来不大，从 1.5 到 1.6，但实际是 Google 把"基座大模型当机器人大脑"这条路线又往前推了一格。Boston Dynamics 的 Spot 几乎是同一周接入了它做工厂仪表巡检，r/robotics 那个发布帖跑到 222 赞 25 评论。

值得说一下的是，Gemini Robotics-ER 不是一个 VLA 模型。它不直接输出关节角度或者底盘速度，它的位置是机器人栈里更上面那一层。

## 这次到底改了什么

DeepMind 自己列的对照对象有两个，一个是上一代 Gemini Robotics-ER 1.5，一个是同期的 Gemini 3.0 Flash。

第一个改进点叫 pointing，模型可以在画面里直接"指"出物体位置。听起来朴素，但它是一切空间推理的脚手架。物体计数、相对大小判断、最佳抓取点、轨迹规划，DeepMind 把这些任务都建在 pointing 上面，让模型先用点位作为中间表示，再去推理更复杂的约束任务。

第二个改进点是多视角理解。机器人现场通常不止一个摄像头，头顶一个、手腕上一个，各自有遮挡。1.6 这一代专门优化了"不同视角在同一时刻怎么拼出一个连贯的世界，跨时间又怎么演化"。在动态环境里这点比单视角稳得多。

第三个改进是仪表读数。这是和 Boston Dynamics 一起做的能力，圆形压力表、垂直液位计、数字读数，模型用 agentic vision 的方式处理，先放大局部、再用 pointing 估比例、再调代码执行做单位换算。DeepMind 给的数字是 agentic vision 模式下 93%，纯 baseline 模式 86%。

安全侧也提了一句，对液体处理、重量限制这类物理约束的合规率比 Gemini 3.0 Flash 高 6 到 10 个百分点。

## 它在机器人栈里到底站在哪一层

很多人把 Gemini Robotics-ER 和宇树、智元那些做的具身模型直接对比，这个对比其实是错位的。

DeepMind 的官方说法是 high-level reasoning model，分工是空间理解、任务规划、成功判定。它原生支持 function calling，可以调 Google Search、调第三方 VLA、调用户自己写的工具函数。下游真正驱动关节的，可以是另一个 VLA 模型，也可以是传统的运动规划栈。

换个角度看，Gemini Robotics-ER 站的位置更像机器人世界的"操作系统大脑"，而宇树 H1 那种端到端 VLA 站在"小脑加肌肉"。Boston Dynamics 给 Spot 接入 ER 1.6 做仪表巡检，恰好就是这个分工的样板，Spot 的运动控制堆栈解决"走过去、伸手、对准"，ER 1.6 解决"看懂这块表读数 27.3 PSI 是不是超阈值、要不要报警"。

这条路线和国产具身智能厂商目前的主流路线不在一个层级。宇树、小鹏 IRON、小米 CyberOne、智元、银河通用 GalBot 现在更多在自研 VLA 或者在专用机器人数据上微调多模态模型，重心放在"动作输出怎么稳"。基座的高层推理这一段，要么用 Qwen-VL 做接入、要么调豆包和智谱 GLM-4V 的视觉接口，没有谁去训一个专门给机器人服务的旗舰级 reasoning 基座。

这不是路线优劣的问题，是各家手里牌不一样。Google 有 Gemini 3 这种基座可以衍生，国产厂商当前阶段把工程精力压在硬件、运动控制和场景数据上，是合理的取舍。

## 社区目前在关心什么

r/robotics 那条 222 赞的帖子下面，最高赞评论很短，"Bet it only works at best 60% of the time, every time"。这是机器人圈对 demo 视频的标准怀疑，DeepMind 给的 93% 是受控环境下的指标，到工厂车间会被光照、震动、油污切掉多少不知道。

另一条评论更具体，提到 Spot 本身已经能识别门把手并开门，问 ER 1.6 接上去到底能多出多少能力。这个问题指向的是"具身基座到底带来增量价值还是冗余"，得等到第三方独立测评出来才能判。

r/machinelearningnews 那边的讨论更技术，强调一点，ER 1.6 是 dual-model robotics stack 顶层的那一个，它不直接动机器人，它做空间理解、任务规划、成功判定，然后把执行交给下面的 VLA 或者运动栈。这个分工被反复强调，说明社区里真有不少人把它当成 VLA 的替代品在误读。

r/VibEngineering 那边贴了 Boston Dynamics Spot 接入 ER 1.6 做工厂巡检的工程化分析，关注点在工业巡检的具体工作流，比如温度计、压力表、化学液位窗口的自动识别。这是目前能看到的、最成型的商业落地路径。

## 它对国产生态的牵引方向

直接调 Gemini API 这条路对国内开发者并不友好，但思路本身是公开的。dual-model 分层这件事如果在国内成主流，"高层"那一段谁来补是个开放问题，Qwen3-VL、智谱 GLM-4.6V、豆包 1.6 视觉版都有候选资格，但都还没专门面向机器人场景做对齐和工具调用优化，这块大概率会冒出新的国产 SKU。开源侧 LeRobot 现在主推的是 SmolVLA、π0 这类纯端到端 VLA，"reasoning 模型 + VLA"的样板代码也是社区可以发力的位置。

## 我的判断

我倾向于认为，2026 年具身智能的竞争会从"VLA 谁训得好"分裂成两条战线。

一条是高层基座这一段，比拼的是多模态 reasoning 的深度、空间理解的精度、function calling 的稳定性。这条线 Google、Anthropic、OpenAI 都有筹码，国产侧 Qwen 和智谱有机会但还没专门发力。

另一条是低层动作这一段，比拼的是数据、硬件、场景渗透。这条线宇树、智元、银河通用、小鹏这些公司过去两年攒下的工程化经验是真本钱，开源侧 LeRobot 生态把入门门槛打到了 5000 块桌面级。

Gemini Robotics-ER 1.6 这次的发布告诉我两件事。一，把基座大模型专门改造成"机器人大脑"是个独立的产品形态，不是 Gemini 3 Flash 加几个 prompt 就能替代。二，这个分工一旦坐实，国产具身厂商在选基座这件事上会被迫做选择题，自研一个机器人专用 reasoning 基座，还是抱住国产通用多模态做适配。前者重，后者快，看每家的资源结构。

想动手验证这套思路的人，不必等 Gemini API。最小复刻路径四步：

一，自己拍一组工业仪表照片，圆形压力表、液位计、数字读数各几张，每个配多角度（正面、侧面、俯视），几十张作为多视角融合最小数据集。

二，用国产 VLM 跑单图 baseline。ModelScope 上的 Qwen2.5-VL-72B-Instruct 和智谱 GLM-4V-Plus 都开放调用，prompt 让它"读出表上的数字和单位"，记下准确率，对应 DeepMind 报告里 86% 的 baseline 档位。

三，加 agentic vision 链路。prompt 改成两轮，第一轮让模型 pointing 出表盘和指针位置，第二轮把局部 zoom-in 子图喂回去再读数，最后用一段 Python 做单位换算校验。这就是 DeepMind 的 zoom-in + code execution 模式，国产 VLM 不微调也能跑通，效果差距能直接量出来。

四，dual-model 范式本地走通可以上 LeRobot。Hugging Face 这套开源具身 SDK 已经有 SmolVLA、π0 的样板代码，社区也开始出现"reasoning 模型 + VLA"组合的实验仓库，关注 Hugging Face 上 robotics 标签的 dual-model 项目能直接抄工程模板，桌面级 5000 块就能跑。

走完这四步，国产 VLM 在 reasoning 这一段的真实差距在哪，会比看任何一篇解读都更清楚。

## 相关链接

- Gemini Robotics-ER 1.6 官方博客，https://deepmind.google/blog/gemini-robotics-er-1-6/
- Boston Dynamics Spot 接入 ER 1.6 工厂巡检讨论，https://www.reddit.com/r/VibEngineering/comments/1t2m8vc/
- r/robotics 发布帖，https://www.reddit.com/r/robotics/comments/1sltawg/
- r/machinelearningnews dual-model stack 技术拆解，https://www.reddit.com/r/machinelearningnews/comments/1slyxi4/
- 我们之前写过的端侧 VLA 入门档，Gemma 4 + Jetson Orin Nano

---
相关实体:: [[google|Google]] | [[deepmind|DeepMind]] | [[gemini|Gemini]] | [[unitree|宇树]] | [[xpeng|小鹏]] | [[xiaomi|小米]] | [[zhipu|智谱]]
相关主题:: [[embodied-ai|具身智能]] | [[multimodal|多模态]] | [[chinese-ai|国产 AI]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
