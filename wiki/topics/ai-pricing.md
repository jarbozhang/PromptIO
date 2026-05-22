# 主题追踪：AI 定价战

[[openai|OpenAI]] vs [[anthropic|Anthropic]] 的订阅方案演变和省钱攻略。

## 当前格局

| 产品 | 基础 | 中档 | 高档 |
|------|------|------|------|
| [[chatgpt|ChatGPT]] | Plus $20 | Pro $100（新） | Pro $200 |
| Claude | Pro $20 | — | Max $100+ |

## 中文社区关注焦点

省钱是中文 AI 社区的永恒话题。常见策略包括区域定价（尼日利亚区）、替代方案（Zed+OpenRouter）、API 中转站真假检测。

## 我们的覆盖

| 日期 | 文章 | 角度 |
|------|------|------|
| 2026-05-19 | [[google-gemini-api新增flex和priority两档-低价批处理和低延迟终于分开|Gemini API Flex / Priority 两档]] | 成本和延迟分层 / Webhooks 长任务 |
| 2026-05-18 | [[google-gemini-cli-10万星-终端agent每天1000次免费额度怎么用|Google Gemini CLI 10 万星 终端 agent 每天 1000 次免费额度怎么用]] | Google 终端 agent 免费额度 / 1000 requests/day |
| 2026-05-18 | [[华为昇腾384集群落地无锡-token工厂开始按智能单元计费|华为昇腾 384 集群落地无锡 Token 工厂开始按智能单元计费]] | Token 工厂 / 智能单元计费 |
| 2026-05-13 | [[claude-opus-4-7-fast-openrouter-1m-context-6x\|Claude Opus 4.7 Fast 上 OpenRouter，6 倍价格换速度，1M 上下文跑全栈]] | 9 |
| 2026-05-10 | [[蚂蚁ring-腾讯hy3-双双上openrouter-万亿模型免费\|蚂蚁 Ring-2.6-1T + 腾讯 Hy3 preview 同天免费上 OpenRouter，国产万亿双子线]] | 国产万亿免费档同台 / 推理 vs chat 双产品哲学 |
| 2026-05-10 | [[gpt-5-5-openrouter成本拆解-输入降输出涨\|OpenRouter 拆 GPT-5.5 价格曲线，输入翻倍 / 输出翻倍 / 长 prompt 反而省钱]] | OpenAI 涨价曲线 / 缓存红利 / 国产路由临界点 |
| 2026-05-08 | [[蚂蚁ling-2-6-1t万亿模型上openrouter-比deepseek便宜\|蚂蚁 Ling-2.6-1T 旗舰 $0.30/M 比 DeepSeek 便宜]] | 国产万亿付费档新底部 |
| 2026-05-08 | [[gemini-3-1-flash-lite-1m多模态白嫖-0-25美元每m-token\|Gemini 3.1 Flash Lite $0.25/M 1M 多模态]] | 海外多模态价格新底部 |
| 2026-05-08 | [[goose-26k星-block本地agent-绕开claude-code-200美金\|Block Goose 绕开 Claude Code $200 订阅]] | 本地 agent / 绕开订阅 |
| 2026-05-06 | [[百度cobuddy免费上openrouter-国产编程模型白嫖131k-context\|百度第二个免费模型上 OpenRouter，这次是编程模型 CoBuddy，131k 上下文白嫖]] | 国产免费编程模型 / 131k context 白嫖 |
| 2026-05-05 | [[deepclaude-deepseek-v4-pro接claude-code-agent-loop\|DeepClaude 一夜 657 HN 热度，把 Claude Code 的脑子换成了 DeepSeek V4 Pro]] | 国产模型替 Claude API / 1/17 价 |
| 2026-05-05 | [[rapid-mlx-比ollama快4-2倍-mac本地ai推理引擎\|M 系 Mac 上跑本地模型，引擎层正在被换掉]] | 本地推理替 API / Apple Silicon |
| 2026-05-03 | [[uber-4个月烧光2026年ai预算-claude-code账单国内大厂启示\|Uber 4 个月把 2026 全年的 AI 预算烧光在 Claude Code 上，国内大厂该怎么管这笔账]] | 企业账单失控 / token 计费撞席位预算 |
| 2026-05-01 | [[xai-grok-4-3上openrouter-1m-context\|xAI Grok 4.3 悄悄上 OpenRouter，1M context 想接住国内 agent 开发者]] | xAI 长上下文价格 / agent 开发者 |
| 2026-04-28 | [[openrouter-latest别名机制-7个主流模型-自动跟随最新版本\|OpenRouter Latest 别名机制覆盖 7 个主流模型]] | 平台机制 / 维护成本省钱 |
| 2026-04-27 | [[qwen3-6全家桶5个模型上openrouter-27b-dense到1t-max-preview\|Qwen3.6 全家桶 5 模型上 OpenRouter，从 27B Dense 到 1T Max Preview]] | 国产全档位铺设 / 万亿档进入新档位 |
| 2026-04-25 | [[gpt-5-5上openrouter-pro定价30美元百万token-simon提示词指南\|GPT-5.5 上 OpenRouter，Pro 版 $30 / 百万 token]] | OpenAI Pro 档新价格 |
| 2026-04-25 | [[simon-willison实测deepseek-v4-接近前沿价格零头\|Simon Willison 实测 DeepSeek V4 "接近前沿但价格只是零头"]] | 海外 KOL 验证国产价格优势 |
| 2026-04-24 | [[deepseek-v4-pro-flash双发-openrouter-价格战新底部\|DeepSeek V4 Pro 1.6T + Flash 每 M 一毛钱 双发 OpenRouter]] | 国产价格新底部 |
| 2026-04-24 | [[腾讯hy3-蚂蚁ling-2-6-1t免费上openrouter-国产万亿白嫖\|腾讯 Hy3 + 蚂蚁 Ling-2.6-1T 双万亿免费上 OpenRouter]] | 国产万亿免费 |
| 2026-04-24 | [[open-generative-ai-200模型mit开源-midjourney订阅可以退了\|Open-Generative-AI 200 多个模型 MIT 开源，Midjourney 订阅可以退]] | 开源替代订阅 |
| 2026-04-23 | [[百度千帆ocr-fast免费上openrouter-发票合同截图白嫖\|百度千帆 OCR 居然免费扔到 OpenRouter 上了]] | 免费 OCR 白嫖 |
| 2026-04-21 | [[notebooklm-白嫖google算力-claude省17倍token\|NotebookLM 代替 Claude 做 RAG，省 17 倍 Token]] | RAG 架构省钱 |
| 2026-04-21 | [[llm-api-yongjiu-mianfei-qingdan-15jia\|15 家"永久免费"LLM API 清单，只有 6 家真能长期当饭吃]] | 免费 API 盘点 |
| 2026-04-18 | 有人测了Claude 4.7新tokenizer的真实成本，545赞HN炸了 | tokenizer 成本分析 |
| 2026-04-14 | [[openai新增100美元pro层-codex用量翻5倍但最高档不变|OpenAI新增$100 Pro层]] | 定价分析 |
| 2026-04-11 | [[claude尼日利亚区订阅pro只要88元|Claude尼日利亚区订阅88元]] | 省钱攻略 |
| 2026-04-10 | [[chatgpt出了100美元月新档-claude用户该不该跳船|ChatGPT出了100美元新档]] | 跳船分析 |
| 2026-04-10 | [[claude-code换zed加openrouter省了70percent|Zed+OpenRouter省70%]] | 替代方案 |
| 2026-04-15 | [[openai内部备忘录泄露-cro说必须锁住用户防止跳船到anthropic\|OpenAI 内部备忘录泄露，CRO 说必须锁住用户防止跳船到 Anthropic]] | 跳船 / 锁定与开放策略 |
| 2026-04-30 | [[airllm国产开发者-70b塞进4gb显卡-本地推理省钱\|AirLLM 把 70B 模型塞进单 4GB 显卡]] | 显存优化 / 替代云端 API |
| 2026-04-30 | [[ds2api国产中间件-deepseek多账号轮转白嫖\|ds2api 把 DeepSeek 客户端协议变 OpenAI/Claude 通用 API 中间件]] | 多账号轮转 / API 白嫖中间件 |
| 2026-04-30 | [[蚂蚁ling-2-6-flash上openrouter-agent实时档\|蚂蚁 Ling-2.6-flash 偷上 OpenRouter，agent 实时档新档位]] | 国产实时档新价位 |
| 2026-04-30 | [[nvidia-nemotron-30b-omni免费上openrouter-4模态白嫖\|NVIDIA Nemotron 30B Omni 上 OpenRouter 免费四模态]] | 海外四模态免费档 |
| 2026-05-07 | [[deepseek-v4-pro-flash双发-华为昇腾跑国产开源前沿\|DeepSeek V4 Pro 不再是 benchmark 第一名，但它把 1.6T 模型直接放到了昇腾上]] | 国产开源旗舰持续压价 / 昇腾绑定 |
| 2026-05-07 | [[deepseek首轮融资估值45b-国产ai估值新里程碑\|DeepSeek 第一次融资就开 450 亿美金，国产 AI 估值水位被抬到哪了]] | 开源低价策略与估值锚 |
| 2026-05-14 | [[deepseek-v4-flash-openrouter免费-百万token实测\|DeepSeek V4 Flash 在 OpenRouter 免费上线 256K + 百万 token 实测]] | 10 |
| 2026-05-14 | [[goose-免费claude-code替代-一年省2400美元\|Block Goose 26100 stars 完全免费 Claude Code 替代，一年省 2400 美元]] | 9 |
| 2026-05-16 | [[蚂蚁ring-2-6-1t-openrouter国产万亿-thinking-model白嫖\|Ring-2.6-1T 几乎免费 $0.075/M 万亿模型新底价]] | 9 |
| 2026-05-17 | [[codegraph给claude-code先建代码图-少烧token少查文件|CodeGraph 少工具调用少 token]] | 8 |
| 2026-05-17 | [[openai两个月免费codex-抢团队默认ide|Codex 企业两个月免费试用]] | 9 |
| 2026-05-21 | [[阿里-qwen3-7-max-openrouter-100万上下文-白菜价\|阿里 Qwen3.7 Max 上 OpenRouter 100 万 token 上下文 Agent 优先 价格白菜]] | 国产万亿新档位 / 1M context / 白菜价 |
| 2026-05-21 | [[xai-grok-build-0-1-编程模型-比codex便宜5倍\|xAI 推 Grok Build 0.1 编程模型 25.6 万上下文 价格只有 Codex 的零头]] | 编程模型价格新底部 / Codex 1/5 |
| 2026-05-21 | [[openai-证否-erdős-80年-单位距离猜想-1000美元\|OpenAI 新模型证否 80 年 Erdős 单位距离猜想 算力成本不到 1000 美元]] | 推理模型成本 / 1000 美元解 80 年猜想 |

## 饱和度评估

**严重高饱和** — 17 篇/21 天。4/28 +1 篇（OpenRouter Latest 别名机制覆盖 7 个主流模型，省去手动改 model id 维护成本，把"省钱"边界从单价拓宽到运维成本侧），4/27 +1 基础上继续抬升。本主题进入"只收重大价格断档事件 + 平台机制层级变化"状态。下一轮严格避开纯订阅/折扣类盘点，仅在出现新模型直接拉开价格档差或平台层结算/计价机制变化时入题。
