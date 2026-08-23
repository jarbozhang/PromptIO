---
title: 'Ling-3.0 released all 6 base checkpoints: 2 sizes × 3 stages'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vtpsqf/ling30_released_all_6_base_checkpoints_2_sizes_3/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-20T17:22:09.000Z'
fetched_at: '2026-08-21T11:01:41.852Z'
---
AntLing has released the full six-checkpoint matrix for the Ling-3.0 base model.
  
tiny: pretrained, mid-trained, WSM-merged
 flash: pretrained, mid-trained, WSM-merged
  
The concrete artifact is six separate official repositories, not one endpoint repeated under different names. All six were public and ungated when checked, and each repository declares MIT.
 They are all base checkpoints and none has been post-trained. This is for continued pretraining, fine-tuning, and research, not a ready chat or instruct release.
 The attached stage map is the original first-party image from the release thread. It is release context, not independent validation.
 The useful part for builders is the choice of where to enter the training trail: the pretrained checkpoint, the mid-trained checkpoint, or the WSM-merged endpoint. The release does not establish that one stage is best for every downstream task, or what any of them will look like after quantization.
 If you care about base-model work, the six-checkpoint map is worth inspecting as a family rather than treating "base" as the only artifact.
    submitted by    /u/niacolhealth  
 [link]   [comments]
