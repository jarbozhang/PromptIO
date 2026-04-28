# Google Veo 3.1 Lite 来了，全家桶里最便宜的视频生成模型

## 为什么你应该关注这件事

Google 把 Veo 3.1 Lite 推到了 Gemini API 和 AI Studio 的 paid preview。一句话能让你立刻判断要不要试，**720p 一秒 0.05 美元，1080p 一秒 0.08 美元**，这是 Google 全家桶里目前最便宜的视频生成档位，比 Veo 3.1 Fast 还便宜一半，比 Standard 便宜八倍。

按 8 秒最长片段算，720p 一条 0.4 美元（约人民币 2.9 元），1080p 一条 0.64 美元（约 4.6 元）。对一个长期被 Sora-2、即梦、可灵价格折磨的内容创作者来说，这是第一次"批量生 100 条短视频试创意"听起来像是合理预算的一档 AI 视频模型。

更关键的一个信号，Google 在同一周还把 Veo 3.1 塞进了 Google Vids，**任意 Google 账号每月可免费生成 10 条**。所以呢你不掏一分钱也能先把 Veo 3.1 的实际效果看明白，再决定要不要走 API。

## 把事情讲清楚

### Veo 3.1 全家桶的价格梯度

按 Gemini API 官方定价页，

| 档位 | 720p/秒 | 1080p/秒 | 4K/秒 |
|------|---------|----------|-------|
| Veo 3.1 **Lite** | $0.05 | $0.08 | 不支持 |
| Veo 3.1 **Fast** | $0.10 | $0.12 | $0.30 |
| Veo 3.1 **Standard** | $0.40 | $0.40 | $0.60 |
| Veo 2 | $0.35（统一价） | — | — |

价格已经包含音轨。Google 自己的说法是 Lite "成本不到 Veo 3.1 Fast 的一半"，"速度和 Fast 相当"。你想想看，**Lite = 用 Fast 的速度跑出来一个便宜一半的版本，代价是质量再降一档**。

如果你不需要 4K、不需要电影级的镜头细节，单纯是给小红书/抖音/微信视频号做配图、做短素材，Lite 就是性价比最高的那一档。

### Lite 能做什么、不能做什么

按 Google 官方说明，

- **支持**，文生视频（Text-to-Video）、图生视频（Image-to-Video）、4 秒/6 秒/8 秒可选、16:9 横屏 + 9:16 竖屏、720p/1080p 双分辨率
- **不支持 4K**（这一档需要走 Fast 或 Standard）
- **不明确支持的能力**，Veo 3.1 旗舰加的 Reference-to-Video（最多 3 张参考图保持角色一致）、First/Last Frame 首尾帧插值，官方文章没有把这些功能明确划到 Lite 名下，目前可以保守理解为 Lite 主打基础文生视频和图生视频，进阶能力归 Standard

对中国创作者来说，这套定位非常直接，**做 vlog 转场、产品展示、商品视频背景、AI 拟人广告，Lite 够用；想做有连贯主角的剧情短片，上 Standard**。

### 怎么试，两条路

**路径 1，Google Vids（免费 10 条/月）**

如能访问 Google Workspace 服务，登录 [vids.google.com](https://vids.google.com) → 直接在编辑器里调用 Veo 3.1 → 任意 Google 账号每月 10 条免费额度。这是验证 Veo 3.1 实际效果最低门槛的入口。

**路径 2，Gemini API / AI Studio（按量付费）**

如能访问 Gemini API，去 [aistudio.google.com](https://aistudio.google.com) 开 paid tier，模型 ID 选 `veo-3.1-lite`（或 Google 文档里指定的 ID），按秒计费。AI Studio 同时提供 web UI 和 API key，本地脚本批量生成都可以。

**路径 3（备选），Replicate**

如果你已经在用 Replicate 做其他 AI 推理，Veo 3.1 也在 Replicate 平台上线了，但 Replicate 的定价通常比官方贵 20%-50%，作为方便集成进现有 pipeline 的选择，不作为最便宜的渠道。

### Veo 3.1 系列的 prompt 写法

Replicate 的官方教程总结了 Veo 系列对 prompt 结构的偏好。Lite 共享同一套提示词逻辑，

1. **镜头构图**，明确镜头类型（"medium shot"、"close-up"、"wide establishing shot"）和主体数量
2. **镜头运动**，dolly shot、tracking shot、pan shot 这类专业词比"camera moves"管用
3. **镜头特性**，shallow focus（浅景深）、macro lens（微距）、35mm film grain（胶片颗粒）
4. **风格定调**，sci-fi、anime、documentary、cinematic 这类风格关键词放前面
5. **首尾帧/参考图**（旗舰款独占），上传起始帧 + 结束帧 + 文字描述中间过程

一个直接能套用的中文创作场景模板（产品视频），

```
A medium shot of a [产品] on a marble countertop,
soft morning light from the left, shallow focus,
slow dolly-in camera movement, 8 seconds, cinematic,
warm color grading.
```

用这个结构跑 Lite，720p 8 秒一条成本 0.4 美元，比国内多数 AI 视频平台一条会员套餐里的额度还便宜。

## 社区声音

Veo 3.1 Lite 是这周刚出的 paid preview，HN/Reddit 上还没有大量直接的实测帖（last30days 检索 Reddit 当前阶段返回 403，X 信号也未抓到）。但 Veo 3.1 系列从 2025 年 10 月发布以来，社区共识已经比较清晰，

- **创作者圈**，Veo 3 → Veo 3.1 升级后，"参考图保持角色一致"被反复点名是杀手级能力，做有 IP 的连续短剧一下变得现实。这一能力主要在 Standard 档，Lite 是否完整继承待官方确认
- **价格敏感开发者**，Veo 3 Fast 的 $0.10/秒 已经是当时同质量下最低价之一，Veo 3.1 Lite 把这个数字直接腰斩到 $0.05，是 Google 在视频生成领域明显的价格下探
- **对照 Sora 与可灵**，OpenAI 的 Sora-2 和快手可灵的高清档单条价格折算后都明显高于 Lite，但 Sora 在物理一致性、可灵在中文场景方面各有优势，**Lite 不会赢质量，Lite 赢的是单价**

## 我的判断

**这个价格够便宜吗？够。**

把 Veo 3.1 Lite 放回中国创作者的工作流里看，你做小红书测评配图、抖音过场、视频号产品展示，单条素材 8 秒、1080p、0.64 美元。一周做 50 条素材成本不到 250 块。这是第一次出现"我可以为每个内容点子都生成 5 个备选视频，挑一个最好的留下"的预算合理性。

**对比国内，性价比谁更好？**

- **即梦/可灵**，会员套餐折算下来单条不一定贵，但需求超过套餐时单价会陡升；中文 prompt 理解和东亚审美更贴
- **Sora-2**，质量上限更高，但单价更贵，大量批量生成不经济
- **Veo 3.1 Lite**，英文 prompt 友好，跨场景泛化强，价格最低，**适合做"用量大、单条不需顶级"的批量场景**

**真正需要警惕的两件事**，

1. Lite 是 Standard 的精简版，不要拿它去对标 Sora-2 旗舰档的质量，预期错位会失望
2. paid preview 阶段定价会变，现在 0.05/0.08 美元是窗口期价格，真正稳定 GA 后价格可能上调（Google 历史上 GA 后小幅涨价是常态）

**结论，值得在这个窗口期把 Lite 跑一遍**，尤其是手里已经有素材 pipeline、平时用即梦/可灵不够用的创作者。先用 Google Vids 的 10 条免费额度试质量，觉得 OK 再上 API 批量。

## 行动建议

**今天可以立刻做的三步，**

1. **零成本验证质量**，用任意 Google 账号登录 Google Vids，跑 3-5 个你最常用的场景 prompt（产品展示 / 人物对话 / 自然风光），判断 Lite 是不是能替代你现有的视频素材源
2. **API 批量化**，如能访问 Gemini API，在 AI Studio 开 paid tier，写一个最小脚本调 `veo-3.1-lite`，把你手里 20 条 prompt 跑一遍，算实际单价和成片率
3. **建立 prompt 库**，参考 Replicate 教程总结的"镜头构图 + 运动 + 镜头特性 + 风格"四要素，把你的场景模板化，让批量生成的稳定性变高

**近期可以观察的两件事，**

- Veo 3.1 Lite 是否在 GA 后保留 0.05/0.08 美元定价
- Reference-to-Video 和首尾帧能力是否会下放到 Lite

视频 AI 进入"白菜价"时代的那个临界点，Veo 3.1 Lite 是迄今最接近的一次定价。

---
相关实体:: [[google|Google]]
相关主题:: [[ai-video|AI 视频]] | [[ai-pricing|AI 定价]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
