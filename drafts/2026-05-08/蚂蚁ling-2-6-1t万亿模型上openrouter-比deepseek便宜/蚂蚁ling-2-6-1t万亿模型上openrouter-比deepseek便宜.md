# 蚂蚁 Ling-2.6-1T 万亿参数旗舰悄悄上 OpenRouter，1M token 三毛钱比 DeepSeek 还便宜

我点进 OpenRouter 模型列表，本来在找 Gemini 3.1 Flash Lite 的报价，眼角余光扫到列表里一行新东西，inclusionai/ling-2.6-1t。

价格那一栏挂着 $0.30 / $2.50 每百万 token。

输入三毛钱美金，输出两块五美金，一百万 token，万亿参数旗舰。

我又翻回去看了一遍参数那一栏，没看错，1T，trillion，蚂蚁百灵 2.6 系列那个旗舰档。这玩意儿上周才在 Hugging Face 开源权重，今天就挂上 OpenRouter 给所有人调了。

## 先把这个价格摆清楚

我习惯把同档位的国产开源模型横着拉一行看，省得自己一会儿懵。

DeepSeek V4 Pro，1.6T 总参数 49B 激活，OpenRouter 当下输入价大概 $1.74/M。这是 5 月 7 号刚发的旗舰。

Ling-2.6-1T，万亿参数，OpenRouter 输入价 $0.30/M，输出 $2.50/M。

输入价是 V4 Pro 的零头，不到六分之一。

再往下一档对照，蚂蚁自家 4 月 30 号上 OpenRouter 的 Ling-2.6-flash，104B 总参数 7.4B 激活，价格 $0.08 / $0.24。Flash 档位走的是"agent 链路里每一步够稳够快"，flagship 档位走的是"难任务一次跑透"。

蚂蚁这个旗舰的输入定价，比自家的 flash 只贵不到 4 倍，对一个万亿参数模型来说不太正常。

正常档位下，万亿模型的 API 价格通常在每百万 token 一到三美元区间，跟 GPT-4 早期、Claude 3 Opus 那批价格相当。Ling-2.6-1T 输入价直接拍在三毛钱，几乎是把 flagship 档强行拉到 mid-tier 价格区间。

国产开源模型之间已经在卷输入价，但这一刀切得有点狠。

## 这个价格能跑得起来，我猜是两件事在撑

我没拿到蚂蚁的部署架构细节，只能从公开材料反推一下，仅供参考，别当成官方口径。

第一件事，Ling-2.6 系列从 flash 那一档起就是 MoE 架构。flash 是 104B/7.4B，1T 这一档大概率是更大规模的 MoE，单 token 激活参数远小于 1T。Reddit 上那条 r/WebAfterAI 的帖子直接把它形容为 "Fast-Thinking MoE"，说明激活规模可控。万亿是脑子的总容量，不是每个 token 都全跑一遍。

这是国产万亿模型今年的统一打法。DeepSeek V4 Pro 的 1.6T-A49B、Kimi 系列的同类档位，都是这条路线。蚂蚁旗舰能拿到这个价位，MoE 是底层前提。

第二件事，蚂蚁有自己的推理基础设施。Ling-2.6-flash 之前在 kilocode 那边做过几个月 stealth 模型测试，社区反馈延迟和稳定性都过得去。也就是说，蚂蚁内部的推理栈对自家 MoE 是适配过的，不是临时找个 vLLM 拉起来就上线。自研推理栈把单 token 成本压低，让定价有空间。

具体到 1T 这一档跑在什么硬件上、用没用昇腾，蚂蚁没公开说。我不瞎猜。

## 蚂蚁这条 OpenRouter 线越来越像主力位

把蚂蚁今年在 OpenRouter 上的动作连起来看，节奏是有的。

4 月 22 号，Ling-2.6-flash 以 stealth "Elephant" 模型在 kilocode 跑了一阵，社区从代码任务质量反推出来这是百灵团队。

4 月 30 号，flash 正式以 inclusionAI 名义挂上 OpenRouter，价格那一栏 $0.08 / $0.24。

5 月 8 号，1T 旗舰挂上 OpenRouter，$0.30 / $2.50。

两次上线之间隔了 8 天，flash 和 flagship 都到位，价格档梯度铺好了。

这个节奏跟 DeepSeek 当年"V2 占住中端、V3 拍出旗舰、API 把全行业卷一档"的路径有点像。区别在于 DeepSeek 是先靠 deepseek.com 自家 API 出圈，再往 OpenRouter 渗透。蚂蚁直接押 OpenRouter 作为海外开发者首要触达点，自家 deepseek.com 等价的入口反而没怎么发力。

我的判断是，**蚂蚁正在把 inclusionAI 这条线运营成"国产开源 OpenRouter 主力位"的备选**。DeepSeek 现在还坐在那个位置上，但 5 月开始已经能感觉到第二把交椅在被人坐过去试。

第二把椅子之所以重要，是因为 OpenRouter 用户的换模型成本极低。开发者把 model_id 从 `deepseek/deepseek-v4` 改成 `inclusionai/ling-2.6-1t`，剩下的代码一行不动。开源国产模型的"占位之战"打的是首选 model_id，谁挂在哪个档位的默认推荐上，谁就拿走这个档位的调用量。

## 我的判断，这是一条国内开发者必须留意的新主力线

我不会说"用 Ling-2.6-1T 替代 DeepSeek V4 Pro"，那种结论太懒。

但下面这件事可以放心做，**把 Ling-2.6-1T 加到你 OpenRouter 客户端的可选模型列表里，先在自己手头的真实任务上跑一周**。一周后再决定它在你的链路里占什么位置。

旗舰模型之间没有谁普遍优于谁，只有谁更适合你这个具体任务。我现在自己手头在跑的几个 agent，复杂代码理解和长上下文规划放 V4 Pro 的多，纯生成 + 工具调用编排可以试 Ling-2.6-1T。262K 上下文够用，价格压得这么狠，对长文档 + 多轮规划这类成本敏感的任务尤其值得测。

## 怎么试，三步

OpenRouter 注册过的可以跳到第二步。

第一步，去 openrouter.ai 注册账号，绑卡或者用充值方式都行。OpenRouter 的好处是国内可以直连，不需要任何额外配置。

第二步，在 settings 里创建一个 API Key，复制下来。

第三步，一行 curl 测通。

```bash
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "inclusionai/ling-2.6-1t",
    "messages": [{"role":"user","content":"用一句话解释 MoE 是什么"}]
  }'
```

如果你已经在用 Cursor、Continue、aider、Cline 这种带 OpenRouter 适配的工具，直接在模型选择那里改成 `inclusionai/ling-2.6-1t` 就完事了。

跑完一周后留意三件事，单 token 实际延迟、长上下文场景下的稳定性、tool calling 的准确率。这三件事的体感往往跟 benchmark 不一致，需要自己上手才知道。

我下周会继续观察蚂蚁这条线的更新节奏。如果 6 月之前 inclusionAI 再上一档专门的 reasoning 或者 coding fine-tune，那就坐实了"DeepSeek 之后的国产 OpenRouter 主力"这个判断。

到时候这条线的故事就不只是"价格便宜"了。

## 相关链接

- Ling-2.6-1T on OpenRouter, https://openrouter.ai/models/inclusionai/ling-2.6-1t
- Ling-2.6-1T on Hugging Face, https://huggingface.co/inclusionAI/Ling-2.6-1T
- 4/30 写过的 flash 档拆解（蚂蚁 Ling-2.6-flash 偷上 OpenRouter）
- 5/7 写过的 DeepSeek V4 Pro/Flash 双发（V4 Pro 不再是 benchmark 第一名，但它把 1.6T 模型直接放到了昇腾上）

---
相关实体:: [[ant-group|蚂蚁集团]] | [[inclusion-ai|inclusionAI]] | [[openrouter|OpenRouter]] | [[deepseek|DeepSeek]] | [[moonshot|Moonshot]] | [[qwen-family|Qwen]]
相关主题:: [[chinese-ai|国产 AI]] | [[ai-pricing|AI 定价]] | [[local-inference|本地推理]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
