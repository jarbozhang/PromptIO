# 智谱悄悄放出 GLM-OCR，国产 OCR 工具该选哪个，PaddleOCR 还守得住吗

智谱在五月十一号那天没发推、没开发布会，往 GitHub 上扔了一个新仓库叫 GLM-OCR，第一天就冲到 trending +69 stars。

我是看朋友群里有人甩链接才点进去的。OCR 这条赛道在国内已经死水好几年，PaddleOCR 一家独大，其他人偶尔冒个头就被压回去。智谱这次甚至没用 chatglm 或 cogview 的前缀，直接以独立产品名义切进来，意图很明显。

我把 README 从头读到尾，又翻了几个 issue。先说结论，再讲清楚。

## 这东西到底是什么

GLM-OCR 是个 0.9B 参数的多模态 OCR 模型，组合拳是 CogViT 视觉编码器加 GLM-0.5B 解码器，中间塞一个轻量跨模态 connector 做 token 下采样。架构本身没炫技，就是把视觉编码和语言解码都压到能跑的体积。

它在 OmniDocBench V1.5 上拿了 94.62 分，README 里挂的是榜单第一。这个 benchmark 主要测复杂文档理解，包括表格、公式、版面、嵌套结构这些 PaddleOCR 传统短板。

定位三个词，Accurate、Fast、Comprehensive。翻译过来就是想一把锁死开源 OCR 赛道。

代码 Apache 2.0，模型权重 MIT，比 PaddleOCR 的协议还宽。这是我看完之后第一个有反应的地方，MIT 模型意味着商用可以直接拿走，不需要任何回传或者署名义务。

## 三行装上跑通

我顺手装了一下，体验比我预期清爽。

```
pip install glmocr           # 走云端 MaaS
pip install "glmocr[selfhosted]"   # 本地跑，带版面分析
pip install "glmocr[server]"       # Flask 服务模式
```

调用接口长这样，

```
from glmocr import parse
result = parse("image.png")
result.save(output_dir="./results")
```

命令行更省事，`glmocr parse examples/source/code.png` 直接出结果。0.9B 的模型量级意味着 12G 显存的 4060 Ti 可以本地跑推理，不用上 A100。

部署侧支持 vLLM、SGLang、Ollama 三件套，这是给到工程师友好度满分。我特别留意了 Ollama 这条，意味着 Mac 上 M 系列芯片直接拉起来，做发票、合同、PDF 抽取这类小作坊场景的门槛被砍到几乎为零。

## PaddleOCR 们的处境

国产 OCR 这个赛道现在大概是这么个结构。

百度 PaddleOCR 是绝对的老大哥，从 2020 年起就是国内开源 OCR 默认选项，胜在轻量、CPU 能跑、中文场景成熟。最大的问题是它本质还是 detection + recognition 两段式架构，碰到复杂版面、跨页表格、公式就力不从心。Apache 2.0。

阿里 RapidOCR 走的也是 PaddleOCR 那套路子，把模型转成 ONNX 让部署更省心，定位是工程化封装，技术上没有突破。

OpenDataLab 的 MinerU 这一年很猛，主打 PDF 文档解析，已经被很多 RAG pipeline 当默认前置。它做的是 pipeline 编排不是端到端模型，本质是调一堆模型组合。

Surya 是海外开源新秀，多语种文档识别，国内也有人在用。

字节的 UI-TARS-desktop 五月十号上 GitHub trending 第七，定位是 GUI agent，里面的 OCR 只是组件之一，不是独立产品。

GLM-OCR 的姿态跟以上几个都不一样。它是端到端多模态模型，0.9B 参数压缩到能本地跑，license 比 PaddleOCR 还松，benchmark 又挂着榜单第一。这是一个想直接抢饭碗的姿态。

## 我的判断

PaddleOCR 不会立刻被换掉。理由很现实，老业务系统跟 PaddleOCR 绑定太深，重写 pipeline 的迁移成本比换个模型本身大十倍。银行、保险、政务这些大客户的合同已经签到 2027 年了。

但新项目我会建议直接上 GLM-OCR。三个原因。

第一，端到端架构对复杂版面的处理上限明显高于 detection + recognition 这套传统流水线，OmniDocBench 那个 94.62 不是白来的，做票据、合同、研报抽取的同行可以立刻拿一批真实样本测一下，跟你现在用的 PaddleOCR 横评。

第二，MIT 权重 + Ollama 支持 + 0.9B 体积，这个组合是给独立开发者和小团队设计的。我认识的几个做 RAG 工具链的朋友，文档解析这一段以前都是 MinerU + PaddleOCR 缝合，现在可以直接换成 GLM-OCR 一个模型搞定。

第三，智谱这次产品命名很克制，没叫 ChatGLM-OCR 也没挂 CogVLM，单独立项就说明他们打算长期投入这条线，不是顺手做个 demo。

要警惕的地方也有。仓库刚开源，issue 区还没堆满，真实业务场景的踩坑还没被验证。手写体识别、罕见字符、低质量扫描件这些边缘场景 README 没给数据。我建议先在 dev 环境跑两周再决定要不要换生产。

票据 OCR、合同抽取、表格还原这三个场景的同行，今晚就该 git clone 下来跑一遍自己的数据。如果你用 PaddleOCR 卡了好几年的那个版面问题被 GLM-OCR 一发干掉了，那这个迁移就值得做。

PaddleOCR 还守不守得住，要看百度接下来半年的反应速度。智谱已经先动手了。

## 相关链接

- GLM-OCR 仓库，https://github.com/zai-org/GLM-OCR
- OmniDocBench V1.5 榜单，https://github.com/opendatalab/OmniDocBench
- 对照参考 PaddleOCR，https://github.com/PaddlePaddle/PaddleOCR
- MinerU，https://github.com/opendatalab/MinerU

---
相关实体:: [[zhipu|智谱]] | [[glm-ocr|GLM-OCR]] | [[baidu|百度]] | [[paddleocr|PaddleOCR]] | [[opendatalab|OpenDataLab]] | [[alibaba|阿里]]
相关主题:: [[chinese-ai|国产 AI]] | [[multimodal|多模态]] | [[open-source|开源生态]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
