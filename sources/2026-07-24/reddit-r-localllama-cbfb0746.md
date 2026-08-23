---
title: I trained a 0.5M model on 1B tokens of Fineweb-edu dataset.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v4hrtz/i_trained_a_05m_model_on_1b_tokens_of_finewebedu/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-23T15:50:04.000Z'
fetched_at: '2026-07-24T11:01:34.765Z'
---
Hi everyone, About a month ago I publish my very first research paper on my neural network architecture called Silia.
 You can look at the model here: https://huggingface.co/Srijan-Srivastava/Silia-v2
 Even though the revised paper is linked on huggingface I'm attaching it here as well: 1. https://zenodo.org/records/21510341 2. https://huggingface.co/Srijan-Srivastava/Silia-v2/blob/main/Silia%3A%20Tiny%20Scale%20Is%20All%20I%20Can%20Spare%20To%20Play%20With%20Transformer.pdf
 You can also find all the code on https://github.com/SrijanSriv211/Silia
 I received some criticism for not benchmarking the model and not mentioning the training flops. I also received some feedback regarding residual connections and the problem that v1 had 2.5x increase compute requirements.
 In this revision I've addressed 2 of those things. I've benchmarked the models against 3 models Quark-v2, Spark-v4 by LH-TechAI and SupraMini-v6 by SupraLabs on HellaSwag, PIQA and LAMBADA benchmarks.
 I wanted to compare the model against SupraMini-v5 as well but as far as I can tell it wasn't benchmarked on any of those 3 benchmarks so I excluded it.
 I've addressed the 2-2.5x increase in compute and memory requirements by using DeepSeek's MLA (without decoupled RoPE) + Qwen's HydraHead with Apple's Attention Free Transformer. I chose Attention Free Transformer instead of Kimi Delta Attention simply due to it's simplicity as at this scale AFT is more than enough.
 Why I didn't address the residual connections feedback and why I didn't mention the training flops in this paper as well?
 I wanted to implement Kimi's Attention Residuals paper but I decided to drop that idea just to keep the code, architecture and the paper simple, neat & clean.
 I am going to be very honest here. I didn't mention the training flops in this paper as well because I don't know how to report it properly. I know I could've used DeepSeek or ChatGPT to help me with it but I was just too lazy tbh.
 This was has 0.5M parameters, tr
