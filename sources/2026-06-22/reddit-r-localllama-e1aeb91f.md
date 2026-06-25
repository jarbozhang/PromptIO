---
title: >-
  I pretrained and post trained a 500M parameter LLM and 330M parameter Image
  generator from scratch
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ubuy8w/i_pretrained_and_post_trained_a_500m_parameter/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-21T16:52:01.000Z'
fetched_at: '2026-06-22T04:12:20.731Z'
---
Hey folks Hope you are doing well
 I started HobbyLM as an side project last month
 Initially I wrote an Agent harness using Claude SDK which takes notes on various LLM architecture does ablation studies to find optimised or well fit architecture for this model training then I pretrained HobbyLM architecture with 40B tokens from fineweb and post trained to extend its context window then used SIGLIP encoder for image understanding to build omni model
 I built Image generator model architecture inspired from byte dance Dreamlite architecture used a mixture of distilled dataset from mid journey ,Flux and CCW3 dataset from google
 I used 8xH200 from modal.com and total Cost I paid till now $800
 Model weights : https://huggingface.co/collections/rootxhacker/hobbylm (this includes GGUF as well)
 Playground : https://huggingface.co/spaces/rootxhacker/HobbyLM-Playground
 Github repo has both training and inference engine code : https://github.com/harishsg993010/HobbyLM/tree/main
 Note : I used Claude Code as agentic Harness to orchestrate complete training process
 Let me know your feedback by playing these models either on playground or by using GGUF locally 
 I am also pretraining a 1B Parameter model as next step will share here once training done
    submitted by    /u/Altruistic-Tea-5612  
 [link]   [comments]
