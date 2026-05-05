# 一个工程师写了 1.5 小时无人值守的 AI 工厂，然后把它全删了

acai.sh 的作者把这段经历起了个名字，AI psychosis。

文章发在 5 月 3 日，HN 281 点，评论 293 条。标题原文叫 Specsmaxxing。一个看起来很 meme 的词，背后是一个具体的工程问题，**输入端没人管，输出端再多 agent 也只是放大噪声**。

## 什么是 AI psychosis

作者自述的病症，不是产品做不出来，是开始用 AI 搭一个用 AI 做产品的脚手架。

子代理编排子代理，一个分支跑了 1.5 小时无人监督，最后生成的代码"能跑，但仍然有些草率"。看着 PRD 和 TRD 越写越漂亮，markdown 越叠越厚，回头发现自己在打磨工具链，没在做产品本身。

他的处理方式很干脆，整个分支扔掉，所有 markdown 废弃，从头开始。

这是一种特定的失控形态。它不是 LLM 一本正经胡说八道那种 hallucination，是工程师自己被"看起来很高级的中间产物"绑架。每个子任务都被 agent 完美处理，但拼起来没有形状。Reddit 上那条 389 点的 r/gamedev 帖子讲的是同一件事，团队里的 AI 重度用户写出来的代码无法解释 own choices，问到为什么这样结构就答不上来。

## 为什么换成 YAML

作者扔掉 markdown 之后，没有去抱 JSON Schema 或者 TypeScript interface，选了 YAML。

理由很朴素。markdown 能讲清楚意图，但 LLM 读两遍可能给出两个不同切分。JSON 写起来太重，引号和逗号干扰人读。YAML 给了两件事，**机器可以解析**，**每条需求有稳定的 ID**。

ID 才是关键。作者把 schema 叫 ACID（不是数据库那个），意思是每条 requirement 拿到唯一 ID 之后，可以被其他条目引用、被测试用例引用、被 LLM 在改第 17 条时明确知道不要去碰第 3 条。

原文给出的最小骨架长这样。

```yaml
feature:
  name: imaginary-api-endpoint
  description: 想做什么，一句话讲清楚

components:
  AUTH:
    name: 鉴权
    requirements:
      1: 接受 Authorization 头，格式 Bearer <token>
      1-1: token 必须未过期且未吊销
      2: 遵守 owner 配置的 scopes
      2-note: 参见 access-tokens.SCOPES.1

constraints:
  ENG:
    description: 跨切关注点
    requirements:
      1: 所有写操作幂等
      2: 所有 2xx 响应用 data 字段包裹 payload
```

读懂这个结构不需要五分钟。`feature` 是一句话目标，`components` 是功能切片，`constraints` 是横向约束。每条 requirement 有数字 ID，子项用 `1-1` 这种层级编号，跨条目引用走 `2-note` 注释。

跟 markdown 比，差别是这一条不会写完之后就漂走。LLM 改任何一条，可以拿 ID 锚定上下文。跟 JSON 比，差别是人类抬头第一眼能看懂，不用先在脑子里把括号括起来。

## 这套东西能给国内开发者抄什么

最小可用版本，6 个段就够。

```yaml
feature:
  name: 订单导出
  goal: 用户能把过去 90 天订单导出成 CSV
inputs:
  1: 日期区间，最长 90 天
  2: 订单状态过滤，多选
outputs:
  1: CSV 文件，UTF-8 with BOM，第一行表头
  2: 下载链接 24 小时过期
constraints:
  1: 单次最多 10 万行，超出分页
  2: 接口必须幂等，重复请求返回同一个文件
edge_cases:
  1: 区间内零订单，返回只有表头的空 CSV
  2: 大文件超过 5 分钟，走异步任务返回 task_id
test_scenarios:
  1: 正常区间正常状态
  2: 区间含跨年
  3: 状态过滤命中零结果
```

字段固定，写起来不烧脑。重点不是 YAML 这个格式，是把"功能名 / 输入 / 输出 / 约束 / 边界 / 测试场景"六件事在动手之前就钉死。

塞给 Claude Code 或 Cursor 的时候，告诉它"按 spec.yaml 实现，每个 requirement ID 在代码注释里反向引用"。改需求的时候改 spec，再让 agent 按 ID diff 决定改哪几行。

## HN 上的反对声音

不能只看作者，HN 评论区里几条高赞反对得也很到位。

**lelanthran 那条**，"我从没见过一个 spec 能在 first contact with implementation 之后还活着"。spec 写得再细，真动手的时候都会变。光读 spec 是发现不了实现层才能暴露的问题的。

**chrisldgk 那条**，作者宣称节省 80% 时间，那言下之意是没有真正在 review 代码。spec 定义本身才是最难的事，写 spec 不等于做了工作。

**MoreQARespect 那条**针对 Gherkin（Given/When/Then 那种自然语言测试 DSL），认为这类格式天生有缺陷，没类型系统、抽象层级糟糕，写多了一样维护不动。这个批评对 YAML spec 同样适用，**spec 也是一种代码，spec 也会烂**。

这些都是真问题。Specsmaxxing 不是写得越多越好，写到 200 条 requirement 的 YAML，跟 200 行 markdown PRD 没本质区别，都是 AI psychosis 换了个壳。

## 跟 TDD 和 spec-driven dev 的关系

作者自己说得很清楚，这不是测试驱动，是规范驱动。

TDD 是"先写测试再写代码"，测试是规约的载体。Specsmaxxing 把规约提到测试之上，**spec 是稳定目标，测试和代码都围着 spec 转**。当 LLM 写代码足够快，瓶颈从写代码转移到 QA 和验证，下一步就是 testmaxxing，让 LLM 根据 spec 自动生成验证、根据失败用例自动修。

这个推论合不合理另说，但前提是对的。**LLM 写代码的瓶颈正在从输出端往输入端转**，输入端如果含糊，agent 越多越聪明，结果越糊。

## 一句话收尾

Specsmaxxing 不是终极方案，是一个具体的应对动作，**在动手之前花 10 分钟把六件事写下来**，比之后花 1.5 小时让 agent 自己悟出来便宜得多。

如果你最近也在做 Claude Code / Cursor 重度依赖的项目，可以挑一个最近改过三次的功能，回头试着把它写成上面那个六段式 YAML，看一眼自己当初到底想清楚没有。

## 相关链接

- 原文 Specsmaxxing，https://acai.sh/blog/specsmaxxing
- HN 讨论 281 点，https://news.ycombinator.com/item?id=47994012
- r/gamedev 同题讨论，https://www.reddit.com/r/gamedev/comments/1sm28xl/

---

实体 [[specsmaxxing|Specsmaxxing]] [[anthropic|Anthropic]] [[claude-code|Claude Code]]
主题 [[ai-coding-tools|AI 编程工具]] [[methodology|方法论]] [[ai-workflow|AI 工作流]]

<!-- REACH: 7/10 | 品牌✗ 利益点✓ 可操作✓ -->
<!-- xhs_pass: true -->
