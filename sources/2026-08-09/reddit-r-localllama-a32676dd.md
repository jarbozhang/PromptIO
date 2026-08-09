---
title: Repeated generation is worth it and self-evaluation is effective
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vj1d1i/repeated_generation_is_worth_it_and/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-08T17:09:53.000Z'
fetched_at: '2026-08-09T11:01:08.932Z'
---
I made gemma4 12B write timestamp-anchored summaries of youtube video transcripts. I tested if the summaries have significant qualitative variance and if the SLM can pick the best one by itself. Below is the prompt texts I used.
 "{{[INPUT]}}<attachement name='original'>", document, "</attachment>Above is a transcript. Divide time ranges by topic and name subheadings. Insert brief summary under each subheading.{{[OUTPUT]}}", "{{[INPUT]}}", "<attachment name='Summary A'>", ans1, "</attachment>", "<attachment name='Summary B'>", ans2, "</attachment>", "Above is a transcript and two summaries A and B. Name the better summary. The most important quality of an excellent summary is presenting the core message that is unique to the video. No explanation is required.", "{{[OUTPUT]}}" 
 Here are my findings.
 (1) The judgments were biased to favor the latter example. To counter this, I added another round of comparisons where the candidates were swapped.
 (2) After balancing, the judgments were not random and significant. Making it justify the choice before the final verdict is not necessary. Probably an all pairs comparison (quadratic time) is not necessary for finding the best one. For instance, one could rank 5 candidates and take the best one and generate 4 more to form the next 5.
 To evaluate the wins and losses, I used Maximum Likelihood Estimation (MLE) based on Bradley-Terry model.
 Just in case somebody wants it, here is the code: https://github.com/h2kyeong/scriptlets/blob/main/llm_multigen_league.py
    submitted by    /u/SpecialNothingness  
 [link]   [comments]
