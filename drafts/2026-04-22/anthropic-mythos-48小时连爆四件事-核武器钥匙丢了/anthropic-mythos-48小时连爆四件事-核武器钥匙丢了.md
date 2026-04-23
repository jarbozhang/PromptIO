# Anthropic 的 Mythos 48 小时内出了四件事，从 NSA 偷用到 Altman 公开嘲讽

周一早上我还在看 Anthropic 把 Mythos 包装成"网络安全领域的核武器"的融资稿。

周二晚上我看到的新闻是，这把核武器的钥匙可能已经不在自己口袋里了。

中间隔了四件事，一件比一件戏剧。我把时间线拉出来给你看，然后告诉你为什么这事对中国做安全模型的朋友特别重要。

## Mythos 是什么，先用一句话讲清楚

Mythos 是 Anthropic 搞的一个"受限版"模型，主打两件事，网络攻击推演和漏洞挖掘。

官方口径是"只给可信机构用"，收费高得离谱，申请流程据说比 SOC2 审计还复杂。Anthropic 市场部的叙事一直是，这玩意儿太危险，所以我们才要把它关在笼子里，才不给你看 weights，才不开源。

这个叙事是 Anthropic 过去半年融资的主旋律之一。记住这句话，后面要 callback。

## 周一，NSA 一边骂一边用

第一炸是 TechCrunch 4 月 20 号的稿子，标题直译"NSA 间谍据报在偷用 Anthropic 的 Mythos，尽管五角大楼跟 Anthropic 正在掐架"。

你品，你细品。

五角大楼跟 Anthropic 的梁子是老梁子，采购条款、红线定义、数据留存，几条都谈不拢。官方姿态是"我们不买"。

但 NSA 是另一个部门，人家的工作就是"在不告诉任何人的情况下拿到需要的东西"。所以局面成了，采购合同没签，工具已经在用了。

这就很魔幻。你一个把"负责任 AI"挂嘴边的公司，最核心的受限模型，正在被美国情报机构**绕过**自己的合规体系使用。

Anthropic 要么知道要么不知道。知道了默许，人设崩；不知道，风控崩。

## 周二上午，五角大楼把话撂下了

第二炸发酵得很快。五角大楼那边放话，明确说不打算采购 Mythos，理由含糊，但业内读出来的意思是两条。

一是价格离谱到和实际能力不匹配，二是 Anthropic 的"安全叙事"本身就让军方不舒服，你一个商业公司比我们还懂什么叫国家安全？

这一下 Mythos 的故事裂了一道缝。**受限不是因为危险，是因为卖不动**，这个解读第一次浮出水面。

## 周二下午，Altman 亲自下场嘲讽

第三炸。Sam Altman 在一档播客里，点名 Mythos，原话是 "fear-based marketing"，基于恐惧的营销。

翻译成人话，Altman 的意思是，Anthropic 一直在渲染"模型太危险所以要关起来"，其实是在给自己的商业壁垒找故事。模型没那么强，故事讲得强。

我一开始看到这条的反应是，Altman 你也好意思说。OpenAI 当年"GPT-2 太危险不敢发"那套剧本你难道不熟？

但冷静下来想，**Altman 这次真的踩到点上了**。

Anthropic 的估值逻辑很大一部分建立在"我们比别人更懂危险，所以我们理应值更多钱"。这个逻辑在顺风的时候是护城河，在逆风的时候就是笑柄。Altman 这一脚踩得很准。

得罪人的话先说在前面，我认为 **Altman 这次是对的，fear-based marketing 就是 Anthropic 的核心打法之一**，Mythos 只是这套打法最戏剧化的产品化呈现。

## 周二晚上，钥匙漏了

第四炸。TechCrunch 晚间新闻，有一个"未授权团伙"据报已经拿到了 Mythos 的访问权限。Anthropic 回应说正在调查，目前没有证据显示系统被攻破。

这是公关八股文，你懂的。

但"没有证据"这个措辞翻译过来是"我们还没找到证据"，不是"没发生过"。

回到开头那句话。周一 Anthropic 还在把 Mythos 描述成网络安全领域的核武器，周二晚上这个核武器的某把钥匙据说已经被一个不知名的组织拿到了。

**你一手在卖安全，一手在漏钥匙，这个商业模式比模型本身更值得研究。**

## Nathan Lambert 早就把话挑明了

这时候回头看 Nathan Lambert 4 月初那篇 Interconnects，标题直译"Claude Mythos 和被误导的开源权重恐慌"，整篇文章只在干一件事，戳穿 Anthropic 的叙事。

Nathan 的观点我转述一下，Anthropic 反复强调开源权重很危险，是为了巩固闭源商业模式的合法性，但实际的安全收益和他们渲染的严重性完全不对等。这叫 misguided open-weight fearmongering，被误导的开源恐慌。

四月初这话说出来，是孤立的异见。

四月二十号那一周再看这话，是预言。

## 中国读者为什么要关心这件事

你可能说，这是美国圈子的瓜，跟我有啥关系。

关系大了。国产安全大模型的叙事正在**复制这条路径**。360、深信服、奇安信、绿盟，今年都在推各自的"安全领域大模型"，口径惊人一致，太敏感所以闭源，太强所以只给政企客户，太危险所以不公开 API。

**这个剧本我们在 Anthropic 身上看到了完整的一轮上演和翻车**，所以对国产选手的判断我直说。

第一，不要相信任何一家厂商的"太危险所以关起来"叙事，这句话九成是商业策略而不是技术判断。Anthropic 的 Mythos 被 NSA 偷用了都没出人命，你国产模型真有那么炸？

第二，真正值得看的是采购方的反应。五角大楼敢说不买，因为它有底气。国内的等保、密评、信创采购通道，如果客户敢说"你这不值这个价"，国产安全大模型才会回到技术竞争而不是叙事竞争。

第三，受限不等于安全。Mythos 这周的剧情告诉我们，一个被"严格受限"的模型，可以同时被 NSA 偷用、被未授权组织拿到访问权限、被竞争对手公开嘲讽。**越是宣称自己严格的东西，出事的时候越难看**。

## 一个开放问题给你留作思考

如果 Mythos 下周证实真的泄露了，你觉得 Anthropic 的应对会是下面哪一条。

A，承认并公开事件细节，重建信任。B，模糊处理，让事情在媒体周期里淡掉。C，反向加码 fear-based marketing，把泄露本身包装成"你看我们说的对吧，这东西就是太危险"。

我押 C。欢迎来打脸。

回到文章开头那把钥匙。周一它在保险柜里，周二它可能在暗网上。保险柜的价值从来不是保险柜本身，是里面装的东西值不值得这么保。Mythos 这一周给所有做"受限安全模型"的公司上了一课，**你的故事讲得越玄，翻车的时候就越疼**。

## 相关链接
- NSA 偷用 Mythos，https://techcrunch.com/2026/04/20/nsa-spies-are-reportedly-using-anthropics-mythos-despite-pentagon-feud/
- Altman 嘲讽，https://techcrunch.com/2026/04/21/sam-altman-throws-shade-at-anthropics-cyber-model-mythos-fear-based-marketing/
- Mythos 被未授权访问，https://techcrunch.com/2026/04/21/unauthorized-group-has-gained-access-to-anthropics-exclusive-cyber-tool-mythos-report-claims/
- Nathan Lambert 评论，https://www.interconnects.ai/p/claude-mythos-and-misguided-open

---
相关实体:: [[anthropic|Anthropic]] | [[openai|OpenAI]] | Sam Altman | NSA | 五角大楼
相关主题:: AI安全 | 网络攻击模型 | [[supply-chain-security|供应链安全]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✗ -->
