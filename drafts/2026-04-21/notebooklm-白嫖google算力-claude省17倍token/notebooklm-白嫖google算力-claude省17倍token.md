# 为什么我不再往 Claude 里塞资料，NotebookLM 才是你没用起来的 RAG

$9.59 跑成 $0.55。

同一套研究任务，5 轮会话，token 账单差了 17 倍。

没改 Claude，没换模型，就是把资料不往 Claude 对话里塞了，换成先丢 NotebookLM。

我第一次看到这个数字愣了一下。Claude Max 每个月 $200，月底一看额度条见底，我一度以为是模型变贵了。结果不是，是我的用法一开始就错了。

## 我到底做错了什么

我之前写研究类任务的流程大概是这样，找一堆 PDF 和网页，全部丢给 Claude，让它读完再回答。

读一次算一次 token，读十次算十次。

Claude 的上下文不是免费的。你每轮对话它都在"重新读"你前面塞进去的所有资料，哪怕你这轮只想问里面一句话。

所以 5 轮下来 $9.59，不是 Claude 贵，是我自己把资料当垃圾桶往里倒。

## NotebookLM 在这件事里是什么角色

Google 家的 NotebookLM 免费档能塞 50 个源，PDF、网页、YouTube 字幕都吃。你把资料丢进去，它做 embedding、做索引、做检索。

关键是，这一步的算力 Google 包了。

你在 NotebookLM 里问一句"作者对 RAG 分块的建议是什么"，它吐回来一段带引用的结论。Claude 只看结论，不看原文。

原文一字不进 Claude 的对话框。

这就是 17 倍差距的来源。Claude 只消费"已经检索好的答案"，不再消费"整堆原始资料"。

## 分工重新定义

X 上 @xiangxiang103 把这个架构讲得挺清楚，NotebookLM 负责 RAG 和事实检索，Claude 负责推理和执行。两者各干各的强项。

Claude 强在推理、写代码、长链路任务编排。让它去做"从 200 页 PDF 里找某个数字"这种事，就是在用 $200 的模型干 $0.50 的活。

NotebookLM 强在塞得进、检得准、免费。让它去做"帮我写一个能跑的爬虫"，它连 tool call 都没有。

你硬要让一个工具干所有事，结果就是又贵又慢。

## 上手就三步

这事最反直觉的地方是，它不是什么复杂系统，就是一个 npm 包。

第一步，`npm i notebooklm-client` 装客户端。

第二步，`npx notebooklm export-session` 把 Google 登录态导出来，这一步绕过了 NotebookLM 没开放 API 的限制。

第三步，`npx notebooklm skill install` 装成 Claude Code 的 skill。

装完之后在 Claude Code 里直接说"查下 NotebookLM 里的信息"，它自己知道去调。

没有 API key，没有账单，Google 这边你就是个普通免费用户。

## 我的判断，会得罪人的那种

Claude Max $200 的订阅，大部分人没用出 $20 的效果。

不是 Claude 不行，是你把它当百度用。

真正贵的不是 Claude 的智能，是你往它上下文里反复塞的那堆"我懒得整理所以全给你"的原始资料。模型每轮都要读一遍，读一遍就是一轮 token 账单。

我认为 RAG 这件事，未来一两年会从"自己搭向量库"彻底滑向"白嫖大厂的检索层"。

自己搭 Pinecone、自己调 embedding 模型、自己写重排，这些事对 99% 的独立开发者来说都是伪需求。Google 的 NotebookLM、OpenAI 的 File Search、Anthropic 自己的 Files API，背后的检索基建已经够用了。

你省下来的钱，应该花在推理环节，不是检索环节。

## 社区是怎么炸的

@MinLiBuilds 的那条"用好 NotebookLM 立省 80% Token"直接 995 赞，这个数字在中文 X 的 AI 圈算相当炸了。

@LawrenceW_Zen 原话是"握草牛逼，太硬核了，notebooklm，还可以继续挖，这简直就是白嫖 Google 的 token"，775 赞。那个"继续挖"三个字信息量很大，意思是这事还没到天花板。

@alin_zone 的帖子最厚实，把 npm 三步装法和 $9.59 到 $0.55 的对比都列出来了。评论区有人问会不会被 Google 风控，作者回说目前还没遇到。

说实话我也不确定这种"导出登录态"的路子能撑多久。Google 一旦把 NotebookLM 的 session 机制改了，这个 skill 可能就得更新一版。

但这不妨碍你现在就用起来。

## 你现在就能做的事

如果你手上有 Claude Max 或者 Claude Pro，今天晚上花十分钟干这三件事。

把你最近在研究的一个话题相关的 PDF、博客、YouTube 视频，全部丢进 NotebookLM。

装上面那个 skill。

然后在 Claude Code 里问一个你平时会直接把 PDF 拖进去问的问题。

对比一下响应速度、答案质量、以及账单那一栏的数字。

你会自己算明白这笔账。

---
相关链接

- alin_zone 原推，含 npm 安装步骤和成本对比 https://x.com/alin_zone/status/2046133743400976558
- MinLiBuilds 原推，995 赞 https://x.com/MinLiBuilds/status/2046002143937941988
- xiangxiang103 的分工架构思路 https://x.com/xiangxiang103/status/2046060813770015195
- NotebookLM 官网 https://notebooklm.google.com

---
相关实体:: [[google|Google]] | [[anthropic|Anthropic]] | [[claude-code|Claude Code]]
相关主题:: [[ai-pricing|AI定价]] | RAG

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
