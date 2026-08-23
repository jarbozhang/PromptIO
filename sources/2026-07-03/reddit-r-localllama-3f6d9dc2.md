---
title: Rebuilding Gemma 4 31b... better... As 26b...
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ulmez2/rebuilding_gemma_4_31b_better_as_26b/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-02T16:05:09.000Z'
fetched_at: '2026-07-02T23:00:55.714Z'
---
Sooo... I decided screw it. I'm going to rebuild Gemma 4 31b. 
 I really like the model. So the current plan is to rebuild the SWA layers. 
 Currently running all the proper ablation tests to figure out what SWA layer gets removed. Gemma runs 5 SWA at 1024 tokens each. Then a global layer for the "Block"
 Layer 3 is consistently the weakest and will likely get removed. 
 From there I am going to rescale the attention of SWA across the board. The new SWA will be 1024/2048/4096/8.1k then the global layer. This is the "Block" that Gemma uses. 
 After that, I'm going to bolt on "Attention based Residual Networks"... Moonshot developed this. The research paper is early 2026 I think. I've barely slept working on this so my date might be wrong on that paper. 
 Anyways, the global layers in the network are going to get attention based residuals that allow global layers to better flow information across them. In theory this gives the model better global coherence and makes it perform better, while smaller. 
 Given that I don't have the complete IT / RL pipeline that Google invests millions in... I have to work from the IT base. 
 So for initial rebuilding, I'll take the topK 12? or 20? logits from the 31b model and use them as targets for retraining while freezing the top and bottom of the model. This will keep tokenization/output/vocab from moving while the internals of the network find stability in a smaller space looking like 31b. 
 The TopK rebuilding is another weird technique I developed in another training spot. It's cool because it teaches the model a vastly richer understanding of what the next token might be and what is adjacent, etc... I don't know if I invented the method or just came to the conclusion someone else did. Probably both. 
 LASTLY it's feeding it a few billion tokens to rebuild it. I have to find a "good" dataset to use or... literally build the dataset. 
 The actual full retraining is going to cost money but whatever. I'll hit that wall when I hit i
