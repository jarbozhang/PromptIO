# 港大 ViMax 一个 prompt 当导演 编剧分镜制作全自动 国产学界视频 agent

我给 ViMax 丢了一句话，「一个 AI 公众号编辑凌晨三点对着热搜发愁选题」，让它出一条 30 秒短视频。

它没有立刻去喊视频模型。它先开了一个会。

导演 agent 拆出三个场景，工位、空白文档、热搜推送。编剧 agent 把这三个场景填成带分镜的剧本，每镜写清画面、镜头语言、人物动作。制片 agent 把人物形象、环境参考图先拉一遍，校对前后一致性。最后才是视频生成 agent 把每个分镜跑成画面，再串成片子。

我盯着终端日志看了一会儿，意识到这东西不是又一个「文生视频玩具」。这是把一整个剧组塞进了一个 Python 进程。

## ViMax 到底是什么

ViMax 是香港大学数据科学实验室 HKUDS 开源的多 agent 视频生成框架，5 月 22 日冲上 GitHub Trending Python 榜首位，单日涨 500 多颗星，目前 6.5k stars，MIT 协议。

它的设计哲学一句话能讲完，把视频生成这件事从「模型问题」变成「剧组问题」。

传统路线是堆模型，Sora、Veo、Runway、Seedance、可灵、Wan 都在这条路上，让单个模型一次性吐出一段更长、更稳、更清晰的视频。

ViMax 走的是另一条路。它接受单个模型能力有限这个现实，承认现在的视频模型一次吐 5 到 10 秒就已经到极限，然后用 agent 协同把这个限制绕过去。

四个 agent 各管一摊。

导演 agent，scene and shot planning，负责把一个完整故事拆成镜头序列，决定每一镜用什么景别、什么运镜、放在哪个位置。

编剧 agent，script generation，把模糊的 idea 长成结构完整的剧本，人物、对话、场景描述齐备。如果你直接喂剧本进去（标准的 EXT./INT. 格式），就跳过这一步。

制片 agent，visual asset planning，最关键的角色。它负责跨镜头的一致性管理，前一个镜头里那只橘猫长什么样，下一个镜头里必须还是这只橘猫。它通过参考图选择 + 角色环境提取 + 多镜头并行调度来解决一致性。

视频生成 agent，最后才登场，调底层视频模型把每个镜头跑出来，然后做时间线拼接。

## 跟 Sora、Seedance 比，差别不在效果在路径

国内现在做视频的几条路都不一样。

字节的 Seedance 走极致工程化路线，把单 prompt 到高质量 clip 这件事做到能直接商用，主打可用性。

OpenAI 的 Sora 走规模化模型路线，押大模型本身的能力上限，相信「足够大的模型自然会处理一致性」。

Google 的 Veo 跟 Sora 思路接近，靠模型能力直出。

可灵、Wan、混元这些国产侧重不同细节，但都还是「单模型一次吐」的范式。

ViMax 走的是第四条路。它不押注模型本身变强，而押注「agent 编排能把现有模型组合出剧组能力」。这个设计取向有点像 LangChain 早期对 LLM 的判断，单个模型不够强，那就让多个 agent 配合补位。

这两条路不是对立。事实上 ViMax 底层调用的就是 Veo，它需要一个还可以的视频模型当原子能力。但它把「怎么写剧本、怎么分镜、怎么保证人物前后一致」这部分从模型脑子里搬出来，交给了可编程的 agent 层。

对中国创作者，这个差别很要紧。Sora、Veo 这条路你只能等模型方升级。ViMax 这条路你可以替换底层模型，可以改 prompt 模板，可以加自己的 agent。

## 跑一遍完整 case

实测的最小流程长这样。

clone 仓库，进目录，`uv sync` 装依赖。要先装 uv（Astral 出的 Python 包管理器），比 pip 快十几倍。

打开 `configs/idea2video.yaml`，填两个 key。一个是 chat model 的 key，默认配置走 Gemini 2.5 Flash Lite，也可以改成 MiniMax M2.7（1M 上下文，处理长剧本不发愁）。另一个是视频模型的 key，默认 Google Veo API。

如果只想试一下流程，把 idea 直接写在 `main_idea2video.py` 里。

```python
idea = "一只猫和一只狗是最好的朋友，遇到一只新的猫会发生什么"
user_requirement = "给小朋友看，不超过 3 个场景"
style = "Cartoon"
```

跑起来之后看终端日志，每个 agent 的输出依次刷过去。剧本几十秒出，分镜大概一分钟，参考图生成花的时间最长，每张图要 10 几秒，3 个场景 6 到 9 张图就要 1 到 2 分钟。视频生成是大头，单镜 5 到 10 秒视频实际渲染要 30 秒到 1 分钟（取决于 Veo 的 quota），并行起来总耗时压在 5 到 8 分钟。

输出是 mp4 + 完整的中间产物，剧本 txt、分镜 json、参考图、单镜视频片段都在一个 case 目录里。这点很贴心，方便人工介入修任何一环。

我跑了三个 case，感受。

第一，剧本和分镜这两步质量很高，比我自己写得还有结构感。导演 agent 给的镜头语言（中景、特写、推、拉）专业到不像 LLM 直接出的。

第二，人物一致性比单 prompt 调 Veo 强一档，但不是完美。同一个角色跨场景偶尔还是会变发色。

第三，视频生成质量天花板取决于你接的底层模型。Veo 接好画面就好，换成更弱的模型，agent 编排再聪明也救不回来。

## 我的判断

短视频内容生产的下一站，是「agent 团队」而不是「更好的模型」。

国内现在卷视频模型的公司很多，每家都在追求单 prompt 直出更长、更稳、更清晰的 clip。这条路当然要走，但有个瓶颈，再强的单模型也难直接处理「完整故事」这个 unit。故事天然是多镜头的、有结构的、需要前后呼应的，这部分能力很难塞进端到端的视频模型。

ViMax 这种路线把这部分能力解耦到 agent 层，模型只负责「把这一镜画好」。这件事的工程意义是，模型能力的增长红利可以直接被框架吃到，模型每升级一档，框架产出的视频质量自动升级一档。

港大 HKUDS 这次出手早，把范式立住了。我预期未来半年会看到更多「视频生成 agent 框架」出现，国内创业团队会接着做加强版。中国短视频内容平台基础设施全球第一，谁先把这套 agent 范式跟抖音/视频号/B 站的内容生产流程绑死，谁就能吃到第一波红利。

## 行动建议

四件事可以今晚就做。

第一，clone 仓库跑一遍 demo，对 agentic video generation 有体感。`git clone https://github.com/HKUDS/ViMax.git && cd ViMax && uv sync`。

第二，先用 idea2video 跑一个你自己业务的 case，比如你要做的科普视频、产品介绍、剧情短片。看看分镜阶段输出，这是 ViMax 最值钱的部分。

第三，看 `configs/idea2video.yaml` 的 class_path 设计，研究怎么替换底层模型。视频生成那个 `VideoGeneratorVeoGoogleAPI` 完全可以包一层国产 API（可灵、即梦、Wan）进去，让整个流程跑在国内基础设施上。

第四，关注它的 roadmap，AutoCameo（照片插入角色）和 shot planning tools 还没发，做出来短视频创作者就可以用真人照片直接做主角。

视频生成卷到现在，模型不是瓶颈了，编排才是。

## 相关链接

- ViMax 仓库，https://github.com/HKUDS/ViMax
- HKUDS 组织主页，https://github.com/HKUDS
- uv 安装指南，https://docs.astral.sh/uv/getting-started/installation/
- 默认底层模型 Google Veo，https://deepmind.google/technologies/veo/
- 可替换的国产视频模型，可灵 https://kling.kuaishou.com/、即梦 https://jimeng.jianying.com/

---
相关实体:: [[vimax|ViMax]] | [[hkuds|港大 HKUDS]]
相关主题:: [[ai-video|AI 视频]] | [[creator-economy|创作者经济]] | [[agent-frameworks|Agent 框架]] | [[chinese-ai|国产 AI]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
