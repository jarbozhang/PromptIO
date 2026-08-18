---
title: llama.cpp adaptive MTP PR#27210
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vqzud4/llamacpp_adaptive_mtp_pr27210/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-17T18:05:12.000Z'
fetched_at: '2026-08-18T11:02:01.161Z'
---
Just wanted to raise some attention to this PR I filed if anyone would like to try it out.
 This adds an adaptive MTP mode to llama.cpp which employs a fairly simple counting-style state machine to determine the appropriate depth to set the MTP depth to dynamically.
 The goal here was to make it so people can stop worrying about what the best MTP depth to use is, and just let the server figure it out as it goes.
 Compared to an MTP of 3, then for very dense hard to predict prose and regular prose the typical performance is about 3% worse than before. In some scenarios it will average higher for regular prose, but I want to set expectations fairly.
 When generating code though, or when recalling content from earlier in the conversation, then this is where the big wins come. Coding is typically 10-15% better than before, but when recalling code from the thinking phase, then speeds can be greater than 50% faster than regular MTP=3 generation.
 If the model is asked to change a couple of lines in a file though, and it chooses to rewrite the whole file from memory, which can happen, then in those instances generation can be up to 100% faster than normal MTP=3.
 When recalling prose, the gains are more modest, being around +20-30%
 The higher your temperature is, then the more unpredictable the model output is, and in those instances the adaptive MTP won't fare a whole lot better than regular MTP=3, although for code it will generally still do a little better.
 I'm hope some of the more keen members here can try it out and see if it helps or not.
 My recommended configuration for it is: --spec-type draft-mtp-adaptive --spec-draft-n-max 12
 which will allow the depth to range from 3 up to 12
 A lower depth floor can be set with the --spec-draft-n-min-adaptive option if you want to change the default depth floor of 3.
    submitted by    /u/Look_0ver_There  
 [link]   [comments]
