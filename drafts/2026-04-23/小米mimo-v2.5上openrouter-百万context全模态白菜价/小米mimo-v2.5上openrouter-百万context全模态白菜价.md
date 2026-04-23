# 小米 MiMo-V2.5 偷偷上了 OpenRouter，1M context 全模态，输入 0.4 美元每百万 token

凌晨我刷 OpenRouter 的 new models 列表，看见两个新条目挨在一起，xiaomi/mimo-v2.5 和 xiaomi/mimo-v2.5-pro。

我愣了三秒。

雷军的小米，一晚上甩出两个百万 context 的旗舰，其中一个是原生全模态，输入价格 0.4 美元每百万 token。

这个数字什么概念。GPT-4o 输入价是 2.5 美元每百万 token，小米这个全模态版本是它的六分之一，还多了 audio 和 video 的原生输入。

我直接掏了 OpenRouter 的 key，打算上手测一下。

## 这两个模型到底是啥

先把账算清楚。

MiMo-V2.5（非 Pro），原生全模态，输入 text + image + audio + video，输出 text。1,048,576 token context，正好是 1M。价格 0.4 美元 / 百万 input token，2 美元 / 百万 output token。

MiMo-V2.5-Pro，纯文本旗舰，主打 agentic、软件工程和 long-horizon 任务。同样 1M context。价格 1 美元 / 百万 input，3 美元 / 百万 output。Pro 版页面上写着，能"独立完成人类专家需要数天甚至数周才能完成的专业任务，涉及超过一千次工具调用"。

OpenRouter 上 Pro 版的 benchmark 引用是 ClawEval、GDPVal、SWE-bench Pro 三个，写"top rankings"。具体分数页面没给，得等小米自己出 paper，我没法替他们编。

但有一个数据是公开的，能看出热度。Pro 版上线没多久，prompt tokens 已经跑到 1.35B 一天，omnimodal 版也有 248M。这不是冷启动，这是有人在大批量灌流量。

## 我去 OpenRouter 实际撸了一下

注册 OpenRouter 你应该都熟了，openrouter.ai 直接 GitHub 登录，到 Keys 页面 Create Key，5 美元起充。

curl 调用长这样，我把模型名换成 xiaomi/mimo-v2.5-pro，prompt 给了一段大概 3000 行的 Python 代码，让它找 bug 并重构。

第一感受，速度比我预期快。OpenRouter 上是几个 provider 在跑，我没刻意指定，延迟在能接受的范围。

返回的代码有个细节让我有点意外，它没有像 GPT-4o 那样上来先解释一遍"我理解你的需求"，直接进结构化的 plan，然后给 diff。这种风格更像 Claude Code 用着舒服的那一挂，明显是按 agentic 训过的。

然后我换 omnimodal 版，丢了一段 90 秒的会议录音 mp3 和会议白板的截图，让它做一个会议纪要。

这里我得坦诚一句，效果比我预期的低一些。语音转写够用，但跨模态的关联（"白板上写的这个公式对应录音里第 47 秒讨论的哪个点"）不够稳。原生全模态这件事，技术上能做和体感丝滑之间，目前看还有一层。

但价格摆在那。0.4 美元 / 百万 token 的输入价，你当一个能听能看的 GPT-4o-mini 用，已经比你自己拼一个 Whisper + GPT-4o 的 pipeline 便宜得多。

## 国产模型这一桌，小米坐哪个位置

我的判断是，小米这次不是来"参与"，是来切价格的。

把同档位的国产模型摆开看一眼，你立刻能感觉到不对劲。

DeepSeek-V3，纯文本，性价比标杆，但全模态它没有。

Kimi K2.6，长 context 起家，最近主推 agent，定位接近 MiMo-V2.5-Pro，但价格不会比小米便宜。

通义 Qwen-Max，多模态做得早，工程能力强，但走的是阿里云生态绑定的路子，独立开发者用 OpenRouter 这种聚合层调起来麻烦。

豆包，主打 to C 流量，开发者生态弱，模型能力强但 API 体感落后。

小米这次的姿势特别清楚。第一个动作是把全模态做成默认选项，第二个动作是把 Pro 版价格压到比 Claude Sonnet 便宜一个数量级，第三个动作是上 OpenRouter 而不是只上自家平台。

这第三个动作才是关键。

上 OpenRouter 等于直接把模型摆到全球独立开发者面前，跟 GPT-4o、Claude、Gemini 同一个下拉菜单里二选一。这不是 to 中国市场的姿势，这是 to 全球开发者的姿势。

## 一个会得罪人的判断

雷军做 AI 大模型这件事，互联网半年前还在嘲。

我刷到过的原话大概是"小米连澎湃 OS 都没搞利索还做基座模型"、"米粉买的是手机不是参数"。

现在你看，1M context、原生全模态、SWE-bench Pro 上有名次、价格压到 GPT-4o 的六分之一。Pro 版上线第一天就跑到 13 亿 prompt token。

我认为，小米这价格不是为了赚钱，是为了让 OpenAI 在中国独立开发者市场里没有选择。

你想想看，一个独立开发者要做一个 RAG 加客服 agent，原来纠结 GPT-4o 还是 DeepSeek，现在多了一个选项，1M context、全模态、价格白菜，还在一个免梯子的 OpenRouter 上挂着。

理性人的选择不需要犹豫。

当然我也得把对面立场讲一句。GPT-4o 和 Claude 在复杂推理、英文长尾知识、代码细节上还是有领先的，benchmark 数字是一回事，每天用是另一回事。我自己做主力开发还是 Claude，这事不会因为便宜就变。

但对于"我只是想跑通一个 demo 验证想法"的场景，MiMo 这一档已经够了，而且便宜得让你不心疼实验成本。

## 你现在能做什么

去 openrouter.ai/models/xiaomi/mimo-v2.5 开一个 key，5 美元充值能让你跑几亿 token，够你把一个想法验证三轮。

如果你做的是 agent 类的东西（爬虫加分析、客服自动化、报告生成），优先试 Pro 版，看看它在你的 workflow 里能不能稳定打通工具链。

如果你做的是 to C 应用，需要语音、图片、视频任意一种输入，直接上 omnimodal 版，比你自己拼三家 API 的成本和复杂度都低一个量级。

我自己接下来会把现有一个语音转 markdown 笔记的 pipeline 切到 MiMo-V2.5 上跑一周，看 ASR 加结构化输出的端到端效果稳不稳。一周后我把数据贴出来。

凌晨刷新 OpenRouter 列表，看见小米这两条挂在那里。

半年前没人相信雷军做大模型，今天他用一个百万 context 的全模态新旗舰，把所有质疑塞回去了。

## 相关链接
- MiMo-V2.5 OpenRouter，https://openrouter.ai/models/xiaomi/mimo-v2.5
- MiMo-V2.5-Pro OpenRouter，https://openrouter.ai/models/xiaomi/mimo-v2.5-pro
- 小米 AI 实验室，https://www.mi.com

---
相关实体:: 小米 | 雷军 | MiMo
相关主题:: 国产AI生态 | 多模态 | [[ai-pricing|AI定价]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
