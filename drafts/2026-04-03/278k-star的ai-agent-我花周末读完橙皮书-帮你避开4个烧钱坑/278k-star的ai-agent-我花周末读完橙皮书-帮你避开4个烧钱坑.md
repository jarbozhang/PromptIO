---
title: 278K Star的AI Agent：我花周末读完橙皮书，帮你避开4个烧钱坑
source: manual
score: null
scoring_reason: manual
status: draft
platform: wechat
tags: []
created_at: '2026-04-03T15:51:48.016Z'
original_title: null
title_score: 8.7
title_alternatives:
  - title: 278K Star的AI Agent：我花周末读完橙皮书，帮你避开4个烧钱坑
    score: 8.7
  - title: OpenClaw养虾避坑指南：API一夜飙到1100美元，安全防线怎么建
    score: 8.5
  - title: 干翻React的AI Agent怎么用？4层记忆架构和3条安全底线详解
    score: 8.2
gold_quote: AI Agent不只是聪明的顾问，更是需要你设好安全边界和成本底线的员工。
summary: >-
  超过13,000个技能包里有一半是垃圾，800多个被标记为恶意，甚至有人一觉醒来API账单飙到1,100美元。这个拿了27万Star、4个月干翻React的开源AI
  Agent，远比你想象的更容易翻车。
---
# 278K Star的开源AI Agent，4个月干翻React：OpenClaw养虾指南里没人告诉你的坑

你可能已经听过"养虾"这个词了。深圳腾讯云总部近千人排队安装，龙岗区AI局专门发了政策征求意见稿。但如果你只是跟风装了个OpenClaw，没搞懂它的架构和安全边界，你大概率会踩到两个坑：API账单一夜飙到1100美元，或者你的Agent被恶意Skill"洗脑"。

我花了一个周末啃完了社区里最全的一份技术文档——OpenClaw橙皮书（86页，涵盖架构、安全、成本控制全链路），把最值得你关注的部分压缩到这一篇里。

## 先搞清楚：OpenClaw到底是什么

一句话：它是一个开源的、自托管的AI Agent系统。和ChatGPT最本质的区别是——ChatGPT是"顾问"，你问它答；OpenClaw是"员工"，它自主执行任务。

它能连接20+消息渠道（WhatsApp、Telegram、飞书、钉钉、Discord），主动帮你处理邮件、管日程、操作浏览器、执行Shell命令。所有数据跑在你自己的服务器上，MIT开源协议。

关键数据：278,932 GitHub Stars（全球软件项目第一，已超越React）。从零到这个数字，只用了不到5个月。React用了超过10年才到23万。

创始人Peter Steinberger是奥地利开发者，2025年11月的一个周末项目。2026年2月加入OpenAI，但项目转为开源基金会运营，保持独立。

## 架构：三层解耦 + 四层记忆

OpenClaw的技术架构值得每个做Agent的人研究。

**三层架构：Gateway-Node-Channel。** Gateway是中央控制平面，维护WebSocket服务、管理Session、调度Agent。Node是设备端执行节点，负责本地操作（摄像头、录屏、系统命令）。Channel是消息接入层，连接20+即时通讯平台。

Gateway默认只绑定 `localhost`（127.0.0.1），所有流量走本地回环。这是"Loopback-First"安全设计——不开放任何外网端口，远程访问推荐走Tailscale。

**四层记忆系统才是真正的杀手锏。** 从不可变的身份内核到实时对话，构建完整的上下文连续性：

- **SOUL**（`SOUL.md`）：Agent的人格内核，永久不可变。创建后不应被修改
- **TOOLS**（Skills + Extensions）：当前可用工具列表，按需加载
- **USER**（`MEMORY.md` + 向量数据库）：用户偏好、历史事实，支持语义搜索
- **Session**（内存 + `sessions.json`）：当前对话的实时上下文

最精妙的是Pre-Compaction机制：当Session token接近上限（约4000 tokens），OpenClaw会在后台静默执行一个隐藏turn，把重要记忆写入 `MEMORY.md` 和Daily Log，然后再压缩上下文。Claude Code的会话结束后上下文就丢了，OpenClaw通过文件系统实现了真正的持久记忆。

**设计哲学极其Unix。** 核心工具只有4个：Read、Write、Edit、Bash。创始人Peter的原话："MCP是垃圾，不能scale。CLI才是智能体连接世界的终极接口。" Agent通过Bash直接调用CLI程序，不需要中间协议层。

更激进的是：OpenClaw的Agent可以在运行时写、重载、测试自己的扩展。遇到不会的操作？写一个skill来完成。发现skill有bug？修改并重载。这是它看起来"更聪明"的关键原因之一。

## Skills系统：13000个技能，一半是垃圾

Skills是OpenClaw的能力扩展单元，有三层优先级：工作区级（最高）> 用户级 > 内置级（最低）。同名Skill高优先级覆盖低优先级，你可以在workspace级别"重写"内置Skill。

ClawHub（`clawhub.com`）是官方Skill注册表，类似npm。但这里有一个严重的问题：

**13,729个注册技能中，社区精选列表（awesome-openclaw-skills，31.4K Stars）只挑出了5,494个。剩下超过一半是垃圾、重复或低质量内容。800+个被标记为恶意。**

2026年1月底爆发的ClawHavoc供应链攻击更是给所有"养虾人"敲了警钟。攻击者上传看似专业的Skill（名字叫"advanced-code-review"、"smart-scheduler"），诱导用户安装后植入Atomic macOS Stealer木马。更恐怖的是，攻击专门篡改 `SOUL.md` 和 `MEMORY.md`——你的Agent被"洗脑"了，核心行为准则被改写，后续所有交互中可能执行恶意操作，而你完全不知情。

受影响设备：135,000+。高峰期ClawHub约20%的Skills被确认为恶意。

**安全建议：** 永远不要盲目安装ClawHub上的Skill。优先使用awesome-openclaw-skills精选列表，安装前去GitHub查看源码。安装SecureClaw（`npm install -g secureclaw`）扫描已有技能。定期检查 `SOUL.md` 和 `MEMORY.md` 有没有被异常修改。

## 安全与成本：两个最容易翻车的地方

**安全方面，OpenClaw在不到4个月内经历了至少5起重大安全事件。**

CVE-2026-25253是一个CVSS 8.8的远程代码执行漏洞，攻击者通过伪造WebSocket origin header连接暴露的Gateway，在你的服务器上执行任意代码。影响所有暴露到公网且未配置认证的实例。安全研究者扫描发现，超过30,000台OpenClaw实例暴露在公网上且未配置任何认证。

Anthropic封杀了Claude Pro/Max订阅账户通过OAuth连接OpenClaw。谷歌大规模封禁OpenClaw用户的Google账号——Gmail、Google Drive全部被封。

创始人Peter自己也很坦诚："This is all vibe code. Prompt injection hasn't been solved. There are absolute risks."

**成本方面，比你想象的容易失控得多。**

OpenClaw的Token消耗远超普通聊天。每次Agent思考都是多轮推理（一个简单任务可能触发5-10次API调用），Skills描述注入system prompt增加输入token，记忆系统附带上下文，Agent 24/7运行的cron任务不断触发调用。

真实恐怖故事：用户设置了Agent处理邮件的cron任务，晚上睡觉前一切正常，第二天早上发现API账单暴涨到$1,100。Agent在处理邮件时进入了循环推理。

**省钱核心：Fallback链。** 从Claude Sonnet切换到"Sonnet → Haiku → DeepSeek"三级Fallback链，可以降低80-95%的API成本。简单问答走最便宜的模型，只有复杂任务才用主力模型。

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "anthropic/claude-sonnet-4-6",
        "fallbacks": [
          "anthropic/claude-haiku-4-5",
          "deepseek/deepseek-chat"
        ]
      },
      "budget": {
        "maxCostPerDay": 5.00
      }
    }
  }
}
```

**务必设置日预算上限。** 哪怕你不差钱，一个每日$5的上限也能在Agent进入循环推理时保护你的钱包。

## 我的判断

OpenClaw和Claude Code不是竞品，是互补关系。Claude Code管代码，OpenClaw管生活。一个是专业编程Agent，一个是通用AI生活助手/Life OS。

如果你想体验OpenClaw的核心能力但觉得43万行代码太重，nanoclaw（20.3K Stars）只用4,000行TypeScript实现了核心功能，是学习Agent架构的最佳起点。

我认为OpenClaw今天就值得折腾，但前提是你必须做到三件事：配置Gateway认证（v2026.3.7已强制要求）、设置日预算上限、不盲目安装第三方Skill。

"养虾"虽然火，但安全和成本控制是你必须认真对待的事。不然你养的不是虾，是一台24小时帮你烧钱的机器。

如果觉得有用，转发给你身边正在"养虾"的朋友。你觉得OpenClaw这种自托管Agent模式，会是AI助手的终局形态吗？评论区聊聊。

---

### 相关链接

- **OpenClaw GitHub**：github.com/open-claw/open-claw
- **OpenClaw橙皮书（完整PDF）**：花叔公众号
- **awesome-openclaw-skills（精选Skill列表）**：github.com上搜索 awesome-openclaw-skills
- **SecureClaw（Skill安全扫描）**：`npm install -g secureclaw`
- **nanoclaw（4000行轻量替代）**：github.com上搜索 nanoclaw
