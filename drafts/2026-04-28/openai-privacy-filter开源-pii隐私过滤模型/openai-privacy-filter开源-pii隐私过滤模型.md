---
title: "OpenAI 开源了一个 PII 隐私过滤模型，state-of-the-art 又免费用"
status: draft
date: 2026-04-28
reach: 7
---

# OpenAI 开源了一个 PII 隐私过滤模型，state-of-the-art 又免费用

OpenAI 4 月 22 日罕见放出 open-weight 模型 **Privacy Filter**，1.5B 参数（50M activated）的稀疏 MoE，专做文本里的个人身份信息（PII）检测和脱敏，**Apache 2.0 协议**，HuggingFace 直接 `from_pretrained` 拉下来就能跑。这是继 gpt-oss 系列之后 OpenAI 又一次拿出权重，而且这次直接对标的是企业合规链路上每天都在用的工具，Microsoft Presidio。

## 一、把事情讲清楚

**模型规格**（来自 OpenAI 官方 Model Card），

- 参数量，总 1.5B，**激活仅 50M**（稀疏激活，推理便宜）
- 架构，8 层 Transformer，14 个 Query head + 2 个 KV head 的 Grouped-Query Attention
- 上下文，**128K tokens**，一次塞下整篇合同/工单/客服对话不用切块
- 任务类型，Token Classification（BIOES 解码出干净 span 边界）
- 输出类别，33 类（1 个 background + 8 个 PII × 4 个 BIOES 标签）
- 协议，**Apache 2.0**（可商用、可改、可闭源衍生）

**它能识别 8 类 PII**，

| 标签 | 含义 |
|---|---|
| `private_person` | 人名 |
| `private_address` | 地址 |
| `private_email` | 邮箱 |
| `private_phone` | 电话号码 |
| `private_url` | URL |
| `private_date` | 日期 |
| `account_number` | 账号（含银行卡） |
| `secret` | 密钥/口令 |

**关于中文 PII（重点）**，Model Card 原文是 *"Primarily English; selected multilingual robustness evaluation reported"*，主要训练在英文，多语言只做了"选择性鲁棒性评测"。HuggingFace 的官方教程提到模型能识别 Spanish、French、Chinese、Hindi 等，但**身份证号、统一社会信用代码、港澳台证件号这些中国特有的 PII 类别，OpenAI 文档里没明确列出，类目上也没有专门的标签**。实测要靠 `account_number` 兜底，命中率得自己跑 benchmark 才能确认。

**Benchmark 数据的尴尬**，OpenAI 公告自称 state-of-the-art，HF 教程也说在 ai4privacy 的 PII-Masking-300k 上 SOTA，但**模型卡里没有放具体 F1 数字**，也没有和 Presidio 的直接 head-to-head 表格。具体数字得等社区自己跑或者翻 Model Card 那个 472KB 的 PDF。这点对企业选型不太友好，建议自己在业务数据上小批量验证。

**和现有方案的对比**，

- **Microsoft Presidio**，开源老牌，正则 + spaCy NER，免费但人名/地址漏检率高，多语言要自己挂 NER 模型
- **Anthropic / 各家闭源 API 脱敏**，调用收费，数据要出公司
- **OpenAI Privacy Filter**，开源、本地推理、长上下文（128K 一次扫完）、神经网络比正则强，但中文未明确

## 二、社区怎么看

模型刚发出来一周，HN 和 Reddit 上的讨论还在初步阶段，几个反复出现的声音，

- **"Apache 2.0 这步走得有点意外"**，OpenAI 这两年 open-weight 节奏在回温（gpt-oss 之后这是第二个 Apache 2.0 模型），社区猜测是合规法务驱动，欧盟 AI Act 和美国各州隐私法压力下，给客户一个"本地能跑、合规可审计"的选项比挣那点 API 费用重要
- **"50M activated 是真便宜"**，1.5B 总参数但每次只激活 50M，等于一张消费级显卡甚至 CPU 都能跑大批量推理，企业内网部署门槛降到很低
- **128K context window 被反复提到**，传统做法要把长文档切块、分别脱敏再拼回去，offset 经常错位；这个模型 128K 一次扫完，工程上少一大堆坑
- **吐槽点**，缺少和 Presidio 的硬碰硬对比数字、缺少非英文的细分指标、`secret` 这类标签太宽泛容易过度脱敏

## 三、我的判断

**OpenAI 为什么这时开源**，不是慈善，是抢 PII 检测的事实标准位置。企业 AI 落地链路上"上传到 LLM 之前先脱敏"是必经一步，谁的 PII 模型成标配，谁就在 RAG / Agent / 数据飞轮里占了入口。Apache 2.0 把 Microsoft Presidio 的位置抢过来，后者是企业脱敏链路的默认选择，OpenAI 直接卷过去。

**对中国合规场景的判断**，直接拿来过《个保法》和《数据安全法》要求的"敏感个人信息"过滤，**不能盲信**。原因有两个，

1. 训练数据以英文为主，中文 PII（姓名 + 身份证 + 银行卡 + 手机号）的召回率没有公开数字，国内法规要求的"严格可追溯"得自己出测评
2. 中国身份证有校验位规则、银行卡是 Luhn 算法，这些用正则 + 规则引擎反而更准；建议把 Privacy Filter 当成**人名 / 地址 / 自由文本邮箱**这类规则做不好的部分，规则引擎兜底数字类 PII

**对企业 AI 落地的意义**，长上下文 + 本地推理 + 商用许可 = 给国内做 RAG / 客服 Agent / 知识库的团队多一个本地化预处理选项。比起调云端 API 脱敏，自己部署一个 Privacy Filter 在内网，数据不出公司，对金融、医疗、政务客户友好。但**这是企业向工具，对个人开发者用处有限**，除非你在做 SaaS 卖给 B 端。

## 四、行动建议

**1. HuggingFace 直接下载**，

```
huggingface-cli download openai/privacy-filter
```

国内可走 `HF_ENDPOINT=https://hf-mirror.com` 镜像。

**2. 最小可运行 Python 代码**（基于官方 Model Card），

```python
from transformers import pipeline

classifier = pipeline(
    task="token-classification",
    model="openai/privacy-filter",
    aggregation_strategy="simple",  # 合并 BIOES 为完整 span
)

text = "张三的手机号是 138-0000-0000，邮箱 zhangsan@example.com"
results = classifier(text)
for r in results:
    print(f"[{r['entity_group']}] {r['word']}  ({r['start']}-{r['end']})")
```

**3. AutoModel 方式（更细粒度控制）**，

```python
import torch
from transformers import AutoModelForTokenClassification, AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("openai/privacy-filter")
model = AutoModelForTokenClassification.from_pretrained(
    "openai/privacy-filter",
    device_map="auto",
    torch_dtype=torch.bfloat16,  # 50M 激活，bf16 足够
)

inputs = tokenizer("My email is alice@example.com", return_tensors="pt").to(model.device)
with torch.no_grad():
    outputs = model(**inputs)

pred_ids = outputs.logits.argmax(dim=-1)
labels = [model.config.id2label[i.item()] for i in pred_ids[0]]
print(labels)
```

**4. 硬件门槛**，官方说"runs in a web browser or on a laptop"。1.5B 总参 + 50M 激活，bf16 大约占 3GB 显存，**消费级 GPU（如 4060 / 3060）轻松跑**，纯 CPU 推理也能用，只是慢一点。处理短文本（<2K tokens）笔记本就够。

**5. Ollama 兼容性**，截至发稿（2026-04-28）官方和 Ollama 都没放 GGUF 转换。Token Classification 任务和 Ollama 主要面向的生成式任务不是一回事，**短期内不要指望 `ollama pull` 直接用**。要本地化部署，老老实实 transformers + ONNX / vLLM。

**6. 实战建议**，

- 中文场景**先做 benchmark**，拿你自己业务的 100 条样本（含姓名/身份证/手机/银行卡）跑一遍，看召回
- **数字类 PII 用规则兜底**，身份证用 18 位校验、银行卡用 Luhn、手机号用号段，比模型稳
- **当成一层而不是全部**，OpenAI 自己也强调 "use as one layer in privacy-by-design approach"，别指望一个模型解决所有合规问题

OpenAI 这次 open-weight 的姿态比模型本身更值得关注，这是连续第二次以 Apache 2.0 释出，企业市场拿权重去打 API 厂商的趋势越来越明显。

---
相关实体:: [[openai|OpenAI]]
相关主题:: [[supply-chain-security|隐私安全]] | 开源生态

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
