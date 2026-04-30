# ollama 默默接住国产全家桶，Kimi-K2.5 / GLM-5 / MiniMax / DeepSeek 一条命令本地跑

我今早打开 ollama 的 GitHub 页面，第一行 description 已经改成这样，"Get up and running with Kimi-K2.5, GLM-5, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma and other models"。

国产模型四个名字直接顶在最前面，gpt-oss 排第五，llama 都进不了首屏。

170k stars 的项目，README 第一行的位置，比任何官方公告都贵。

## 国产模型的"事实分发渠道"已经换人了

过去一年我跑国产开源模型，路径基本是这样，去 Hugging Face 找 GGUF 仓库，确认 quantization，下载几十 GB，配 llama.cpp 或者 vLLM，再写 chat template。

光是给 Qwen3 配对话模板，我就在 GitHub issue 区翻了快一个小时。

但 ollama 这条线现在已经简化到一条命令。`ollama run deepseek-r1:7b`，4.7GB 拉下来，直接进交互窗口。Qwen3 的 8B 是 5.2GB，14B 是 9.3GB，32B 是 20GB，235B 是 142GB。每一档都规整摆在 library 页面上。

不是说 ollama 比 vLLM "好"，是它们走了两条路。vLLM 走极致吞吐和生产部署，ollama 走单机单人的开箱即用。一个家用 M 系列 Mac 的开发者，要的不是 batch 100 并发，是 git pull 一个项目晚上想跑个 7B 看看效果，ollama 这种"零仪式感"的东西刚好踩中。

国产模型这次出海主要靠 ollama 这种第三方分发，比官方推广有效得多。

## 真把 deepseek-r1:7b 跑通需要几步

我把过程写一遍，没什么悬念但要把数字落实。

机器是一台 32GB 内存的 M 系列 Mac，没独立显卡。

第一步装 ollama，官网下个 dmg，拖进 Applications。后台有个驻留进程，状态栏一个小图标。

第二步打开终端，敲 `ollama run deepseek-r1:7b`。第一次会拉 4.7GB 权重，我家里 200M 宽带跑了大概十分钟出头，进度条直接在终端里走。

第三步进交互。第一句话是默认的 thinking 输出，会先吐一串 `<think>` 标签里的推理过程，再吐正式答案。这是 r1 系列的特点，第一次见会愣一下。

我让它解一道 LeetCode 中等题，思考过程大概 30 秒，输出速度还行，没卡顿。期间内存监视器显示 ollama 进程占了大概 6GB 多，没碰到 swap。

如果你想跑 14B（9.0GB），16GB 内存的机器就紧张了，32B（20GB）必须要 32GB 以上才能开始考虑。70B 那一档（43GB）我自己没跑过，老老实实说不知道速度怎么样。

整个体验最反常识的一点，**没有一行 Python，没有 pip install，没有改 chat template**。

## 但有件事 ollama 没明说，我得给你点出来

我点开 ollama library 翻 Kimi-K2.5、GLM-5、MiniMax-M2.5 三个页面的时候，发现一个细节。

这三个模型在 library 里的 tag 全是 `:cloud` 后缀。

`ollama run kimi-k2.5:cloud`、`ollama run glm-5:cloud`、`ollama run minimax-m2.5:cloud`。

所以呢？这些命令实际是发到 ollama 自家云端去跑的，本地没下任何权重。GLM-5 是 744B 总参数（40B 激活）的 MoE，Kimi-K2 是 1T 总参数（32B 激活），消费级机器本来就跑不动，ollama 干脆把它们当成统一接入层，命令一致，背后是云。

真正能"完全本地"跑的国产开源，目前主力是两条线，**deepseek-r1 全档（1.5B / 7B / 8B / 14B / 32B / 70B / 671B）和 Qwen3 全档（0.6B / 1.7B / 4B / 8B / 14B / 30B / 32B / 235B）**。其他名字漂亮的国产 MoE 大模型，绝大部分目前是云端 tag，不是本地权重。

这事儿 ollama 的 README 第一行没区分，新人很容易踩。

我自己的判断是，对绝大多数中国开发者，这种"统一入口、本地+云端混合"反而更实用。不需要为每个模型学一套部署，命令格式一致，要省钱就用 deepseek-r1:7b，要打 benchmark 就调 glm-5:cloud。仪式感被磨平了，剩下的只是显存账。

## 知乎 B 站 HN 上的本地推理玩家在聊什么

我翻了几个平台的最近讨论，几个反复出现的声音。

知乎上"7B 跑国产模型实际能干什么"的问题，高赞回答的共识是，r1 7B 适合做半结构化任务（写邮件草稿、做摘要、翻代码注释），数学和长链推理还是得 14B 起步。这跟我自己的体感对得上。

B 站有 up 主拿 M4 Mac mini（24GB 统一内存）跑 deepseek-r1:14b，实测每秒 10 tokens 出头，完全够日常对话用，视频底下评论区在比"这个机器跑 32B 卡不卡"。

HN 那边对 ollama 的争议主要在另一个点上，部分用户嫌 ollama 的封装"过于黑盒"，看不到底层 llama.cpp 的参数（context length、KV cache 配置都默认了）。但反过来，这种黑盒就是它的卖点，否则就跟 llama.cpp 没区别。

最有意思的一条评论来自一个独立开发者，"我已经不在乎模型谁出的了，我只看 disk size 和我机器的内存够不够"。

本地推理已经卷到只看显存性价比，模型选谁次要。

## 我的判断和你下一步该做什么

我的判断很直接，**ollama 已经是国产开源模型的事实分发标准**，不是因为它技术领先，而是它把"零摩擦体验"做到了所有同类工具里最低。

国内厂商大概率自己也乐见，DeepSeek、Qwen 不需要花 marketing 预算去教用户配 vLLM，挂上 ollama library 就行。这条出海通道比公众号通稿和 Twitter 联动有效得多。

但你要清醒，**`:cloud` tag 不是本地推理**。如果你的需求是隐私敏感数据、断网环境、彻底零成本，老老实实从 deepseek-r1 和 qwen3 开始。其他 GLM-5、Kimi-K2.5、MiniMax-M2.5 这些云端入口是补充，不是替代。

你现在该做的事情很简单。如果手头有 16GB 以上内存的 Mac 或 PC，五分钟内可以跑通一个，

```
ollama run deepseek-r1:7b
```

跑通之后留言告诉我，你拿它干了什么活，平均 token 速度多少。我下一篇会基于真实读者的机型分布，写一份"中国开发者本地推理选型表"。

## 相关链接

- ollama GitHub 仓库, https://github.com/ollama/ollama
- ollama Library 全部模型, https://ollama.com/library
- DeepSeek-R1 各档下载, https://ollama.com/library/deepseek-r1
- Qwen3 各档下载, https://ollama.com/library/qwen3
- GLM-5 cloud tag, https://ollama.com/library/glm-5

---
相关实体:: [[ollama|ollama]] | [[deepseek|DeepSeek]] | [[moonshot|Moonshot/Kimi]] | [[zhipu|智谱/GLM]] | [[minimax|MiniMax]]
相关主题:: [[local-inference|本地推理]] | 国产AI生态

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
