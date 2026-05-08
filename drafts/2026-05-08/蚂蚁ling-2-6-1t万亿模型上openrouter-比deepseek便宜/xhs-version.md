# 蚂蚁 Ling-2.6-1T 万亿旗舰悄悄上 OpenRouter，1M token 三毛钱起

我点进 OpenRouter 模型列表，本来在找 Gemini 3.1 Flash Lite 的报价，眼角扫到一行新东西，inclusionai/ling-2.6-1t。

价格那一栏挂着 $0.30 / $2.50 每百万 token。

输入三毛钱美金，输出两块五美金，万亿参数旗舰。

我又翻回去看了一遍参数那一栏，没看错，1T，蚂蚁百灵 2.6 系列那个旗舰档。上周才在 Hugging Face 开源权重，今天就挂上 OpenRouter 给所有人调了。

## 先把价格档位摆清楚

我习惯把同档位的国产开源模型横着拉一行看。

DeepSeek V4 Pro，1.6T 总参数 49B 激活，OpenRouter 当下输入价大概 $1.74/M，5 月 7 号刚发的旗舰。

Ling-2.6-1T，万亿参数，OpenRouter 输入价 $0.30/M，输出 $2.50/M。

价格档位低于同期开源旗舰，输入价是 V4 Pro 的零头。

再往下一档对照，蚂蚁自家 4 月 30 号上 OpenRouter 的 Ling-2.6-flash，104B 总参数 7.4B 激活，价格 $0.08 / $0.24。Flash 档位走的是 agent 链路里每一步够稳够快，flagship 档位走的是难任务一次跑透，两条路各有取向。

正常档位下，万亿模型的 API 价格通常在每百万 token 一到三美元区间。Ling-2.6-1T 输入价直接拍在三毛钱，几乎是把 flagship 强行拉到 mid-tier 价格区间。

## 这个价格能跑得起来，我猜两件事在撑

我没拿到蚂蚁的部署架构细节，只能从公开材料反推一下，仅供参考。

第一件事，Ling-2.6 系列从 flash 那一档起就是 MoE 架构。flash 是 104B/7.4B，1T 这一档大概率是更大规模的 MoE，单 token 激活参数远小于 1T。Reddit 上 r/WebAfterAI 那条帖子直接把它形容为 Fast-Thinking MoE，说明激活规模可控。万亿是脑子的总容量，不是每个 token 都全跑一遍。

第二件事，蚂蚁有自己的推理基础设施。Ling-2.6-flash 之前在 kilocode 那边做过几个月 stealth 模型测试，社区反馈延迟和稳定性都过得去。自研推理栈把单 token 成本压低，定价才有空间。

具体到 1T 这一档跑在什么硬件上，蚂蚁没公开说，我不瞎猜。

## 蚂蚁这条 OpenRouter 线越来越像主力位

把蚂蚁今年的动作连起来看，节奏是有的。

4 月 22 号，Ling-2.6-flash 以 stealth Elephant 模型在 kilocode 跑了一阵。

4 月 30 号，flash 正式以 inclusionAI 名义挂上 OpenRouter，$0.08 / $0.24。

5 月 8 号，1T 旗舰挂上 OpenRouter，$0.30 / $2.50。

8 天之内 flash 和 flagship 都到位，价格档梯度铺好了。

OpenRouter 用户的换模型成本极低，开发者把 model_id 从一个换成另一个，剩下代码一行不动。国产开源模型的占位之战打的是首选 model_id，谁挂在哪个档位的默认推荐上，谁就拿走这个档位的调用量。

我的判断是，蚂蚁正在把 inclusionAI 这条线运营成国产开源 OpenRouter 主力位的备选。

## 我的建议，先加进可选列表跑一周

我不会说用 Ling-2.6-1T 替代谁，那种结论太懒。

但下面这件事可以放心做，把 Ling-2.6-1T 加到你 OpenRouter 客户端的可选模型列表里，先在自己手头的真实任务上跑一周，再决定它占什么位置。

我现在手头在跑的几个 agent，复杂代码理解和长上下文规划放别家旗舰的多，纯生成 + 工具调用编排可以试 Ling-2.6-1T。262K 上下文够用，价格压得狠，对长文档 + 多轮规划这类成本敏感的任务尤其值得测。

## 怎么试，三步

第一步，去 openrouter.ai 注册账号，国内可以直连，不需要额外配置。

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

如果你已经在用 Cursor、Continue、aider、Cline 这种带 OpenRouter 适配的工具，直接在模型选择那里改成 `inclusionai/ling-2.6-1t` 就完事。

跑完一周后留意三件事，单 token 实际延迟、长上下文场景下的稳定性、tool calling 的准确率。这三件事的体感往往跟 benchmark 不一致，需要自己上手才知道。

我下周会继续观察蚂蚁这条线的更新节奏。如果 6 月之前 inclusionAI 再上一档专门的 reasoning 或者 coding fine-tune，那就坐实了国产 OpenRouter 主力位这个判断。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
