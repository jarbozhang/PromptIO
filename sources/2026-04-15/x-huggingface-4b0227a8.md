---
title: "llama-server -hf ggml-org/gemma-4-26b-a4b-it-GGUF:Q4_K_M

openclaw onboard --non-interactive \
  --a"
source: "X @huggingface"
url: "https://x.com/huggingface/status/2040223333921259699"
date: "Sat Apr 04 00:22:02 +0000 2026"
likes: 970
reposts: 90
replies: 38
---

llama-server -hf ggml-org/gemma-4-26b-a4b-it-GGUF:Q4_K_M

openclaw onboard --non-interactive \
  --auth-choice custom-api-key \
  --custom-base-url "http://127.0.0.1:8080/v1" \
  --custom-model-id "ggml-org-gemma-4-26b-a4b-gguf" \
  --custom-api-key "llama.cpp" \
  --secret-input-mode plaintext \
  --custom-compatibility openai \
  --accept-risk
