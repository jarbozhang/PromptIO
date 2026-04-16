---
title: >-
  Trained a Qwen2.5-0.5B-Instruct bf16 model on Reddit post summarization task
  with GRPO written from scratch in PyTorch - updates! [P]
url: >-
  https://www.reddit.com/r/MachineLearning/comments/1sm0lcu/trained_a_qwen2505binstruct_bf16_model_on_reddit/
source: Reddit r/MachineLearning
source_type: rss
language: en
published: '2026-04-15T09:01:41.000Z'
fetched_at: '2026-04-16T06:06:04.640Z'
---
So, yesterday run was a success and I did get an avg rollout length of about 64 tokens as attached in the image!
 This was with quality_reward + length_penalty (more info below!)
 Next, I'll be going with length penalty as the reward and with the mistake of counting characters as tokens fixed and see if there is any gaming the system stuff or degraded outputs! The rewards I used were 2:
  
length_penalty : basically, -abs(response_length - MAX_LENGTH)
 quality_reward: ROUGE-L, which is basically LCS of golden summarizations I had as part of the above dataset, to ensure we have some structure throughout the responses generated
 Setup: 3x Mac Minis in a cluster running MLX.
  
One node drives training using GRPO, two push rollouts via vLLM. Trained two variants:
  
length penalty only (baseline)
 length penalty + quality reward (BLEU, METEOR and/or ROUGE-L )
  
Eval: LLM-as-a-Judge (gpt-5)
  
Used DeepEval to build a judge pipeline scoring each summary on 4 axes:
 Faithfulness — no hallucinations vs. source
 Coverage — key points captured
 Conciseness — shorter, no redundancy
 Clarity — readable on its own and minimize degradation.
  
https://preview.redd.it/7nrsulwdkbvg1.png?width=800&format=png&auto=webp&s=a3306b54ca63c6557534d9393b2d9b099c4b1b03
 https://preview.redd.it/xlcnme2gkbvg1.png?width=800&format=png&auto=webp&s=57073ff1a9aea796d04aae5ef6d22fee1939d30b
    submitted by    /u/East-Muffin-6472  
 [link]   [comments]
