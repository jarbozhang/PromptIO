# Gemma 4跑在iPhone上了，完全离线不联网

iPhone 16 Pro，飞行模式，没有任何网络连接，一个 2B 参数的语言模型在本地以每秒 16 token 的速度吐字。

这不是 demo，不是概念验证，是 Google 刚放出来的 Gemma 4 系列里的边缘端模型，真的能塞进手机里跑。HN 上 278 分 168 条评论，吵得很热闹。我花了点时间把技术细节和社区里的坑都扒了一遍。

## 先说能跑的到底是什么

Gemma 4 这次放出来一整个家族，从 2B 到 31B 参数量不等。但能在 iPhone 上跑的，只有两个边缘优化版本，E2B（20亿参数）和 E4B（40亿参数）。Google 官方给这俩的定位很明确，就是为手机和嵌入式设备设计的。

Apache 2.0 开源协议，随便用。

跑起来的方式有两条路。最简单的是 Google 自己出的 AI Edge Gallery app，装上就能选模型下载，开箱即用。另一条路是通过 Apple 的 MLX 框架，用 mlx-vlm 这个库加载模型，适合想折腾的开发者。Simon Willison 在博客里给了一行命令就能跑的 recipe，模型下载大概 10 个 GB。

## 实际体验怎么样

有人在 iPhone 16 Pro 上跑了 E2B，实测数据是这样的，预填充速度 231 tokens/s，生成速度 16 tokens/s，首 token 延迟 1.16 秒，冷启动加载大概 20 秒。

16 tokens/s 是什么概念？大约相当于你正常阅读中文的速度，体感上不会觉得卡，但也谈不上流畅。

能干什么？社区里有人总结得很实在，改改邮件语气、翻译短文本、简单问答，这些场景完全够用。但别指望它写代码，有开发者试了 E4B 生成多文件项目，模型直接把所有东西塞进一个 TypeScript 文件里。

坦率讲，2B 参数就是 2B 参数，不要有不切实际的期待。

## 藏在评论区里的技术细节

HN 评论区有几个点很值得注意。

Google 选择用 Metal GPU 做推理，而不是 Apple 的神经网络引擎 (ANE)。这个选择直接导致一个问题，耗电。ANE 是专门为低功耗 AI 推理设计的，GPU 跑模型的功耗要高得多。有人反馈持续推理几分钟后，手机明显发热，token 生成速度也跟着往下掉。

还有一个容易被忽略的坑，上下文变长之后速度会大幅下降，而且不是因为过热。这是注意力机制的固有问题，上下文越长，键值缓存 (KV Cache) 越大，计算量指数级增长。在手机有限的内存和算力下，这个问题会被放大。

iPhone 15 及更早的机型？基本只能跑 2B，内存是硬限制。iPhone 16 Pro 勉强能试试 4B，再大就别想了。

## 我认为这件事的意义被高估了，但方向没错

社区里两种声音都有。乐观派觉得这是本地 AI 的里程碑，悲观派觉得 2B 模型能干的事太有限。

我的判断是，两边说的都对，但都没抓到重点。

重点不是 2B 模型今天能干什么，而是这条"模型越做越小、设备越跑越快"的曲线在加速。去年你在手机上跑 LLM 还是个新鲜事，今年 Google 已经把它做成了一个 app store 里能下载的普通应用。

说真的，我更关注的是 Google 走 Metal GPU 而不是 ANE 这个技术选择。如果未来 Apple 在 iOS 层面给第三方模型开放 ANE 接口，或者 Google 自己做了 ANE 适配，功耗问题一旦解决，手机上跑小模型就从"能用"变成"好用"了。

但现阶段，我不会拿它当生产力工具。它更像是一个信号，告诉你这个方向正在快速成熟。

## 想试试的话

最快的路径，去 App Store 搜 Google AI Edge Gallery，下载，选 Gemma 4 E2B，等模型下完就能用。全程不需要任何技术背景。

如果你是开发者，想在 Mac 上先体验一下 MLX 推理，Simon Willison 的那行命令可以直接抄：

```
uv run --python 3.13 --with mlx_vlm \
  mlx_vlm.generate \
  --model google/gemma-4-e2b-it \
  --prompt "你的问题" \
  --max-tokens 500
```

一个值得留意的问题，当手机上的小模型够用了，你还会为每个月 20 美元的 API 订阅付费吗？

## 相关链接

- [Gemma 4 官方博客](https://deepmind.google/blog/gemma-4-byte-for-byte-the-most-capable-open-models/)
- [HN 讨论帖（278分 168评论）](https://news.ycombinator.com/item?id=47774971)
- [Simon Willison 的 MLX 实测](https://simonwillison.net/2026/Apr/12/mlx-audio/)
- [Google AI Edge Gallery](https://www.gizmoweek.com/gemma-4-runs-iphone/)

---
相关实体:: [[google|Google]]
相关主题:: [[local-inference|本地推理]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
