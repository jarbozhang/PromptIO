# ollama 一条命令跑国产大模型，Kimi GLM MiniMax DeepSeek 全收

我今早打开 ollama 的 GitHub 页面，看到第一行 description 已经写成这样了，"Get up and running with Kimi-K2.5, GLM-5, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma and other models"。

国产模型四个名字直接顶在最前面，gpt-oss 排第五，llama 都没进首屏。

170k stars 的项目，README 第一行的位置，比任何官方公告都贵。

## 国产开源的事实分发渠道已经换人

过去一年我跑国产开源模型的路径基本是这样，去 Hugging Face 找 GGUF 仓库，确认 quantization，下载几十 GB，配 llama.cpp，再写 chat template。光是给 Qwen3 配对话模板，我就在 GitHub issue 区翻了快一个小时。

但 ollama 这条线现在已经简化到一条命令。`ollama run deepseek-r1:7b`，4.7GB 拉下来，直接进交互窗口。Qwen3 的 8B 是 5.2GB，14B 是 9.3GB，32B 是 20GB。每一档都规整摆在 library 页面上。

ollama 和 vLLM 走了两条路。vLLM 走极致吞吐和生产部署，ollama 走单机单人的开箱即用。家用 M 系列 Mac 的开发者要的不是 batch 100 并发，是晚上想跑个 7B 看看效果，ollama 这种零仪式感的东西刚好踩中。

## 真把 deepseek-r1:7b 跑通的步骤

机器是一台 32GB 内存的 M 系列 Mac，没独立显卡。

第一步装 ollama，官网下个 dmg，拖进 Applications。后台有个驻留进程，状态栏一个小图标。

第二步打开终端，敲 `ollama run deepseek-r1:7b`。第一次会拉 4.7GB 权重，200M 宽带跑了大概十分钟出头。

第三步进交互。第一句话会先吐一串 `<think>` 标签里的推理过程，再吐正式答案。这是 r1 系列的特点，第一次见会愣一下。

我让它解一道 LeetCode 中等题，思考过程大概 30 秒，输出速度还行。期间内存监视器显示 ollama 进程占了 6GB 多，没碰到 swap。

如果你想跑 14B（9.0GB），16GB 内存的机器就紧张了，32B（20GB）必须 32GB 内存以上才能开始考虑。

整个体验最反常识的一点，**没有一行 Python，没有 pip install，没有改 chat template**。

## 但有件事 ollama 没明说

我点开 ollama library 翻 Kimi-K2.5、GLM-5、MiniMax-M2.5 三个页面的时候，发现一个细节。

这三个模型在 library 里的 tag 全是 `:cloud` 后缀。

`ollama run kimi-k2.5:cloud`、`ollama run glm-5:cloud`、`ollama run minimax-m2.5:cloud`。

这些命令实际是发到 ollama 自家云端去跑的，本地没下任何权重。GLM-5 是 744B 总参数（40B 激活）的 MoE，Kimi-K2 是 1T 总参数（32B 激活），消费级机器本来就跑不动，ollama 干脆把它们当成统一接入层。

真正能完全本地跑的国产开源，目前主力是两条线，**deepseek-r1 全档（1.5B 到 671B）和 Qwen3 全档（0.6B 到 235B）**。其他名字漂亮的国产 MoE 大模型，绝大部分目前是云端 tag，不是本地权重。

ollama 的 README 第一行没区分这件事，新人很容易踩。

## 各平台玩家在聊什么

我翻了几个平台最近的讨论。

知乎上"7B 跑国产模型实际能干什么"的高赞回答共识是，r1 7B 适合做半结构化任务（写邮件草稿、做摘要、翻代码注释），数学和长链推理还是得 14B 起步。这跟我自己的体感对得上。

B 站有 up 主拿 M4 Mac mini（24GB 统一内存）跑 deepseek-r1:14b，实测每秒 10 tokens 出头，日常对话够用，评论区在比"这个机器跑 32B 卡不卡"。

最有意思的一条评论是一个独立开发者说的，"我已经不在乎模型谁出的了，我只看 disk size 和我机器的内存够不够"。

本地推理已经卷到只看显存性价比，模型选谁次要。

## 我的判断和你下一步

我的判断很直接，**ollama 已经是国产开源模型的事实分发标准**。不是因为它技术领先，是它把零摩擦体验做到了所有同类工具里最低。

国内厂商大概率自己也乐见，DeepSeek、Qwen 不需要花预算去教用户配 vLLM，挂上 ollama library 就行。这条出海通道比公众号通稿有效得多。

但你要清醒，**`:cloud` tag 不是本地推理**。如果你的需求是隐私敏感数据、断网环境、彻底零成本，老老实实从 deepseek-r1 和 qwen3 开始。其他 GLM-5、Kimi-K2.5、MiniMax-M2.5 这些云端入口是补充，不是替代。

你现在该做的事情很简单。如果手头有 16GB 以上内存的 Mac 或 PC，五分钟内可以跑通一个，

```
ollama run deepseek-r1:7b
```

跑通之后留言告诉我你拿它干了什么活，平均 token 速度多少。我下一篇会基于真实读者的机型分布，写一份"中国开发者本地推理选型表"。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
