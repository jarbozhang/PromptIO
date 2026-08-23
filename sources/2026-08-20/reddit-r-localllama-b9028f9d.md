---
title: >-
  AntLing’ve open-sourced 6 Base Model checkpoints for Ling-3.0-tiny &
  Ling-3.0-flash, covering pre-trained, mid-trained, and WSM-merged stages.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vsqfmj/antlingve_opensourced_6_base_model_checkpoints/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-19T15:56:11.000Z'
fetched_at: '2026-08-20T11:01:24.241Z'
---
None has undergone post-training, giving researchers flexible starting points for continued pre-training, fine-tuning, and further research. 
 Two key highlights:
 - They use WSM to replace LR decay with weighted checkpoint merging, making the training process better suited for continual pre-training while enabling offline exploration of different LR decay strategies.
 - With one shared training recipe, the community can validate strategies on tiny-base, then scale them to flash-base.
 #1- Ling-3.0-tiny-base: 7.9B total | 1.3B active. 
 Despite having only half as many total parameters as Ling-2.5-mini-base, Ling-3.0-tiny-base delivers comparable or superior performance on most benchmarks, with particularly strong results in coding.
 For code pre-training/SFT, RL post-training, teaching, model behavior & MoE studies.
 https://preview.redd.it/8edbwdc6tckh1.png?width=900&format=png&auto=webp&s=21de82bdad283fc897e9753ce6bef753e69818f9
 #2- Ling-3.0-flash-base: 124B total | 5.1B active. 
 In evaluations, Ling-3.0-flash-base achieves strong performance across coding, reasoning, and long context tasks, even when compared with models 2 to 3 times larger.
 This makes it well suited for continued pre-training, post training, and domain adaptation in coding, long horizon workflows, finance, healthcare, and other specialized applications.
 https://preview.redd.it/q3kueuj9tckh1.png?width=1199&format=png&auto=webp&s=1d8e27d09068fb200a82b57ecf6bef10260c967e
    submitted by    /u/AcanthisittaOk1699  
 [link]   [comments]
