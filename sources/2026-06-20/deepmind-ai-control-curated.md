---
title: "DeepMind AI Control Roadmap：给内部 Agent 加系统级控制层"
url: "https://deepmind.google/blog/securing-the-future-of-ai-agents/"
source: "Curated Google DeepMind official blog summary"
source_type: curated
language: zh
published: "2026-06-18T00:00:00Z"
fetched_at: "2026-06-20T13:05:00+08:00"
---

Google DeepMind 发布 Securing the future of AI agents，介绍用于内部系统的 AI Control Roadmap。文章的核心不是再讲一次模型 alignment，而是在 alignment 之外加一层 system-level security：即使模型没有完全对齐，系统也要能监控、限制和响应。

DeepMind 的比喻是驾校教练的双控车。教练相信学生会开车，但依然保留刹车和方向盘。对应到 Agent，就是根据已验证行为逐步授予权限，并且在必要时接管或阻断。

官方 roadmap 有三条主线：

1. Threat modeling：把不可信 Agent 当成 potential insider threat，而不是只当普通 API client。DeepMind 借鉴 MITRE ATT&CK，把可能攻击拆成 tactics and techniques，方便跟踪风险、发现异常行为并做演练。
2. Mitigations：用 detection、prevention、response 三层控制。Detection 依靠 trusted AI supervisors 监控工作 Agent 的 reasoning、actions 和 plans；Prevention/Response 在 supervisor 发现危险动作时提前阻断。
3. Measurement：持续衡量 coverage、recall、time-to-response 三个指标。coverage 是被监控的流量比例，recall 是被抓住的异常行为比例，time-to-response 是系统反应时间。

文章还提醒，随着模型更强，防线要跟着升级。今天可以监控 visible chain-of-thought，但未来模型可能出现 oversight awareness 或 opaque reasoning，不能只依赖读它写出来的推理过程。

适合写作角度：把这篇写成 Agent 上线前的权限清单：哪些动作先 sandbox，哪些工具需要 supervisor，哪些行为要记录，哪些阈值触发阻断，怎么用 coverage/recall/响应时间评估控制层是否有效。
