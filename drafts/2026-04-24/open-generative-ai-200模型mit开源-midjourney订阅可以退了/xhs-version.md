# 200 多个 AI 生图模型打包成 MIT 开源项目，国内创作者这样用更香

一夜之间 316 颗 star，GitHub Trending 榜单上冲出来一个叫 Open-Generative-AI 的仓库。

作者 Anil Matcha 的描述很有噱头，无审查、MIT 协议、自托管、200+ 模型，Flux、Midjourney、Kling、Sora、Veo 全在列表里，目标用户瞄准的是 Higgsfield、Freepik、Krea、Openart 这类聚合平台的订阅人群。

我的第一反应是不信，去仓库里翻了一圈才看明白。

## 这其实是一个前端壳子，不是模型仓库

技术栈是 Next.js 14 + React 18 + Tailwind v3，一个标准的前端工作室界面。真正干活的后端是一个叫 Muapi.ai 的聚合 API 网关，你在 localStorage 里填自己的 Muapi key，然后通过它转发到 Midjourney、Sora、Veo、Kling 这些商业 API 上。

坦率讲，200+ 模型的真相就是，Muapi.ai 后面挂了哪些模型，你能调的就是哪些。

这不是 Ollama 那种本地推理，不是一台 4090 就能把 Veo 跑起来。每次生成视频，钱照样走你的 Muapi 钱包，最后扣到对应商业模型方账上。它替代的是前端界面订阅费，不是后端算力成本。

## 这件事对国内创作者的意义

先别急着关页面。

海外用户买 Midjourney 一年 120 刀就完事。国内创作者的痛点不太一样，付款通道、Discord 门槛、网络环境都要一一解决。

Open-Generative-AI 做了一件无聊但实用的事，它把生图、改图、文生视频、图生视频、口型同步这几类任务的 UI 统一了，底下接口换成你自己的 key。

你如果同时在用 DeepSeek 的图像接口、智谱的 CogVideoX、阿里云的通义万相，甚至魔搭上自己部署的 Flux，原本是三四个 tab 来回切，现在理论上可以 fork 一份把 provider 层改掉，全塞进一个 workspace 里。

我认为这才是自托管 + MIT 的真价值，把散落在各家平台的 API key 拢成一个自用的生产力中台。

## 自带 stable-diffusion.cpp，这部分是真本地

翻 README 的时候注意到一行容易被忽略的字。

桌面端打包了 stable-diffusion.cpp，附带 Z-Image Turbo/Base、Dreamshaper、SDXL 这几个模型可以完全离线跑，macOS 上还支持 Metal 加速。

也就是说，如果你只是想在本地出一些 SDXL 质量的图，这一坨东西装上就能用，不需要 Muapi key，不需要联网，不需要给任何平台交钱。

这对想做电商主图、小红书配图、公众号封面的人其实够用了，SDXL 出图质量早就过了"能看"的门槛。

我自己 M2 Max 测了一下，SDXL 单张 1024x1024 大概 15 秒左右，和 Diffusers 直接跑没什么差别，这部分不是噱头。

## 几个上手前要想清楚的点

如果你准备 clone 下来跑，有几个坑最好提前避开。

第一，Muapi.ai 这家公司的定价和国内接口不一定有竞争力，跑一次高规格视频可能比你自己去 OpenRouter 或魔搭上对接更贵，动手之前先对比价格。

第二，整个项目 localStorage 存 key 的设计意味着换浏览器、清缓存就得重填，团队协作场景下 key 管理会很痛，你得自己改后端加个加密存储。

第三，workflow builder 这个卖点我试了一下，目前更像是"串联多个 API 调用"，不是 ComfyUI 那种节点级编辑，期望值不要太高。

第四，如果你真看上的是那套 UI 框架，其实可以只拿它的前端，后端接口全改成你本地的 Flux 和 CogVideoX，把它当成一个开源的 Krea 皮肤来用，这个路子反而最划算。

## 我的判断

这个项目和 Midjourney 各自擅长的场景不一样。Midjourney 走的是"一个订阅解决所有事"的路线，这个壳子走的是"把多家 API 拢在一个界面"的路线。

如果你只用 Midjourney 一个工具，这项目帮不了你。但如果你像我一样在七八个平台之间切换，一会儿 DeepSeek，一会儿即梦，一会儿自己部署的 Flux，这个壳子值得花一个下午装起来，把所有 key 拢在一起。

自托管项目的价值，从来不是白嫖商业模型，是把你自己的算力和订阅，重新长在一个可控的工作台上。

这句话送给所有被多平台切换恶心过的独立创作者。

## 相关链接

- 仓库地址，https://github.com/Anil-matcha/Open-Generative-AI
- 聚合网关，https://muapi.ai

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
