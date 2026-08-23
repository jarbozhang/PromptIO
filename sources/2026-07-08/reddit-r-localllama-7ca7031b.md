---
title: Qwen 3.6 27B absolutely fails at agentic work
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uphzhj/qwen_36_27b_absolutely_fails_at_agentic_work/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-07T02:24:42.000Z'
fetched_at: '2026-07-07T23:01:24.259Z'
---
I have been running Qwen 3.5 122B at 4 bit for quite a while, and have started running it at 5 bit recently now that Llama.cpp has comparable performance to VLLM.
 I have also tried, several times, to use Qwen 3.6 27B at 8 bit & 16 bit, as numerous people have claimed that 27B is better than 122B.
 And it is, on single prompts. It will output very impressive demo HTML pages. It has the ability to generate much longer content than any of the 3.5 series models.
 However, on agentic work, it absolutely falls apart. It makes mistakes continuously and does not follow directions. I cannot get the model to not screw up. Every 4 turns or so it does something completely braindead.
 Am I the only one who has noticed this? I am back to using 122B again after trying, yet again, to make 27B work.
 Llama.cpp, nightly compiled from Git, on RTX 6000
    submitted by    /u/TokenRingAI  
 [link]   [comments]
