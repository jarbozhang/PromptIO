---
title: "llama.cpp + Qwen3.6-27B + MTP +4090 跑通，速度有 60 tokens/s（这个速度体感已经很快，对比DeepSeek-V4-Pro 一般在20-30 tokens/"
source: "X @9hills"
url: "https://x.com/9hills/status/2056271620503716229"
date: "Mon May 18 07:12:12 +0000 2026"
likes: 134
reposts: 15
replies: 30
---

llama.cpp + Qwen3.6-27B + MTP +4090 跑通，速度有 60 tokens/s（这个速度体感已经很快，对比DeepSeek-V4-Pro 一般在20-30 tokens/s）

目前Q3能够勉强支持到100K上下文（可能会OOM），如果要用在 Coding Agent 中，还是推荐用 4090 魔改 48GB 或者双卡 24GB。

需要用最新版本的 llama.cpp main代码构建，参数如下

./build/bin/llama-server \
-m ~/models/unsloth/Qwen3.6-27B-MTP-GGUF/Qwen3.6-27B-UD-Q3_K_XL.gguf \
-ngl 99 \
-np 1 \
--flash-attn on \
--cache-type-k q8_0 \
--cache-type-v q8_0 \
--ctx-size 128000 \
--spec-type draft-mtp \
--spec-draft-p-min 0.75 \
--spec-draft-n-max 2
