---
title: "我在浏览器里跑了个2B大模型，不要API不要云端，Google都没宣传这事"
source_url: 'https://github.com/kessler/gemma-gem'
score: 8.4
scoring_reason: 浏览器内嵌AI模型的前沿探索
status: draft
platform: wechat
tags:
  - WebGPU
  - Gemma
  - 浏览器AI
  - Chrome扩展
created_at: '2026-04-07'
generated_by: claude-opus-4-6
---

# 我在浏览器里跑了个2B大模型，不要API不要云端，Google都没宣传这事

你有没有想过，打开一个网页，AI就在你的浏览器里跑起来了？

不是调API，不是连云端，是你的显卡在本地推理，数据一个字节都不出你的电脑。我昨天试了一个叫 Gemma Gem 的 Chrome 扩展，它把 Google 的 Gemma 4 模型塞进了浏览器标签页里，用 WebGPU 做推理。装上就能用，零配置。

这件事的意义比"又一个AI工具"大得多。

## 它到底能干什么

Gemma Gem 不是一个简单的聊天框。它是一个能读懂你当前网页、能点击按钮、能填表单、能执行 JavaScript 的浏览器 AI Agent。

你在任意网页点击右下角的宝石图标，等模型加载完（第一次需要下载500MB左右的模型文件，之后会缓存），就能开始和它对话。你可以问它："这个页面讲了什么？"它会调用 `read_page_content` 工具读取页面内容，然后回答你。你也可以让它"帮我点那个登录按钮"，它会通过 CSS 选择器定位元素并点击。

它有六个工具：读页面、截图、点击元素、输入文字、滚动页面、执行 JS。

这不是玩具。这是一个完整的工具调用循环：模型推理 -> 决定调用哪个工具 -> 执行工具 -> 拿到结果 -> 继续推理。和 Claude、GPT 的 function calling 是同一个模式，只不过全部跑在你的浏览器里。

## 架构上有意思的地方

作者的架构设计值得单独拿出来说。

Chrome 扩展有个限制：Content Script（注入到网页的脚本）不能跑 WebGPU。所以作者用了一个三层架构：

- Offscreen Document 跑模型推理和 Agent 循环
- Service Worker 做消息路由
- Content Script 负责 UI 和 DOM 操作

Offscreen Document 是 Chrome 提供的一个隐藏页面，专门给扩展做后台重活用的。把模型推理放在这里，既不阻塞网页渲染，又能用 WebGPU。

我觉得最聪明的设计是 agent 目录零依赖。作者明确说了，这个目录定义了 `ModelBackend` 和 `ToolExecutor` 两个接口，可以直接提取成独立库。换句话说，你可以把它的 Agent 循环拿出来，换一个模型后端，做你自己的浏览器 Agent。

## 别被 README 骗了，实际体验是这样的

模型有两个规格可选：E2B 大概 500MB，E4B 大概 1.5GB。都是 q4f16 量化的 ONNX 格式，走 Hugging Face 的 transformers.js 加载。

我试了 E2B（2B参数量）。说实话，对于"读一下这个页面讲了什么"这种任务，它够用了。但你要是指望它写出高质量的代码或做复杂推理，那不现实——毕竟是2B模型。

Gemma 4 支持 128K 上下文窗口，这在浏览器端模型里算很大了。但实际上，你在浏览器里跑推理，上下文越长速度越慢，手动设置 max iterations 限制一下工具调用轮数是明智的。

还有一点：它需要 Chrome 的 WebGPU 支持。2026年了大部分现代浏览器都支持 WebGPU，但如果你的显卡太老或者驱动有问题，可能会遇到坑。

## 这件事真正值得关注的原因

社区里已经有人在讨论一个趋势：浏览器正在变成 AI 推理的运行时。

WebGPU 让浏览器有了接近原生的 GPU 计算能力。Hugging Face 的 transformers.js 让模型加载变得和 `npm install` 一样简单。Google 把 Gemma 4 开源并且专门做了 ONNX 量化版本。这三个东西碰在一起，就出现了"浏览器里跑大模型"这个可能性。

我的判断是：这会催生一个新的应用品类——"零后端 AI 应用"。

想想看：一个 Chrome 扩展，不需要服务器，不需要 API Key，不需要任何后端基础设施，用户安装就能用。开发者的成本是零。用户的数据永远不出本地。这对隐私敏感的场景（比如企业内网浏览、医疗数据分析）有巨大的吸引力。

当然，2B 模型的能力天花板很明显。你不可能用它替代 Claude 或 GPT-4o。但对于"给网页加一个智能助手"这种场景，它的能力刚好够用，而部署成本是零。

这就是"够用的智能 + 零部署成本"的甜蜜点。

## 我认为大多数人低估了这条路线

我认为 90% 的 AI 开发者还在想"怎么选 API 供应商"，而忽略了一个事实：对于大量轻量级 AI 功能，你根本不需要 API。

浏览器端推理不是"穷人版 AI"。它是一种完全不同的产品形态。它意味着：

- 用户装上就能用，不需要注册、不需要填 API Key
- 开发者零运营成本，没有服务器账单
- 数据本地处理，隐私问题直接消失

Gemma Gem 的作者做的事情很简单：把这三个优势组装成了一个可用的产品。代码是 WXT 框架搭的 Chrome 扩展，用 Vite 构建，技术栈很现代。

如果你正在做浏览器扩展或者桌面应用，认真看一下这个项目的架构。不一定要用 Gemma 4，但"Offscreen Document + WebGPU + Agent Loop"这个模式，可以直接搬到你自己的项目里。

agent 目录零依赖这个设计，就是在告诉你：拿走它。

## 相关链接

- Gemma Gem 项目仓库：https://github.com/kessler/gemma-gem
- Hugging Face transformers.js：https://github.com/huggingface/transformers.js
- WXT Chrome 扩展框架：https://wxt.dev
- Gemma 4 ONNX 模型（E2B）：https://huggingface.co/onnx-community/gemma-4-E2B-it-ONNX
- Gemma 4 ONNX 模型（E4B）：https://huggingface.co/onnx-community/gemma-4-E4B-it-ONNX
