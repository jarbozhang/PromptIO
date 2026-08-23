---
title: "Agentic Resource Discovery：让 Agent 在运行时搜索工具、Skills 和其他 Agent"
url: "https://huggingface.co/blog/agentic-resource-discovery-launch"
source: "Curated Hugging Face summary"
source_type: curated
language: zh
published: "2026-06-17T00:00:00Z"
fetched_at: "2026-06-19T15:10:00+08:00"
---

Hugging Face 2026-06-17 发布 Agentic Resource Discovery: Let agents search for tools, skills, and other agents. 文章介绍 ARD 规范。

文章指出，MCP 让 Agent 标准化调用工具，Skills 让 Agent 消费指令，A2A 让 Agent 调用其他 Agent。但这些协议都默认用户已经知道需要哪个工具、哪份指令或哪个 Agent。发现、集成、维护能力仍然要由用户或开发者承担。

ARD 试图成为这些协议前面的发现层。它是一个 draft open specification，由 Microsoft、Google、GoDaddy、Hugging Face 等贡献者参与。目标是定义 Agent、工具和服务如何被编目、索引，并在 federated registry 中被搜索，让 Agent 能在运行时找到能力，而不是预先安装所有东西。

文章强调 ARD 不是单一产品或 marketplace，而是任何公司都能独立实现的共享标准。

规范中包含两个关键部分：
- 静态 manifest 格式 ai-catalog.json，发布者可放在 well-known URL。
- 动态 registry API，POST /search，用于实时排序发现。

Hugging Face 已实现 Discover Tool，提供 REST API 与 MCP Tool。写作时可以把 ARD 解释为“工具太多之后，Agent 需要搜索能力本身”，而不是把所有工具说明都塞进上下文。
