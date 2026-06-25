---
title: >-
  I benchmarked 8 LLMs for medical scribing. Hallucinations were rare; omissions
  need attention.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1udlrmf/i_benchmarked_8_llms_for_medical_scribing/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-23T16:20:55.000Z'
fetched_at: '2026-06-24T01:27:25.846Z'
---
I ran a small benchmark on LLMs for medical scribing.
 Reason: most discussion around AI scribe safety focuses on hallucinations. That matters, but in notes I kept seeing another problem: models often leave out clinically relevant details from the conversation.
 So I evaluated 8 frontier models on 300 synthetic doctor-patient dialogues.
 Each model wrote a SOAP note for every dialogue. Then I used a 4-model judge panel to score the notes for:
  
prose quality
 hallucinations
 left-out safety facts
 cost
 speed
  
The main result:
 Across 2,400 generated notes, the models produced:
  
12 confirmed high-impact hallucinations
 520 left-out safety facts
  
So in this benchmark, omissions were much more common than hallucinations.
 Some other things that stood out:
  
GPT-5.4-mini did very well for its cost and speed.
 Claude Sonnet and DeepSeek were strongest on prose quality.
 DeepSeek was cheap and wrote well, but missed many safety facts.
 Bigger was not automatically better. Claude Opus had the fewest omissions, but did worse on prose quality.
 Kimi had zero confirmed hallucinations, but was slow and expensive in this setup.
  
The repo includes the transcripts, outputs, scoring scripts, and leaderboard (for link see comments).
 The next thing I’m interested in is running the same evaluation on models that can run locally.
 Separately, we also used this benchmark internally for product development. The obvious follow-up was: if a cheap/open model writes well but misses safety facts, can a transcript-grounded wrapper recover those omissions and flag unsupported claims?
 That direction looks promising. In particular, it makes models like DeepSeek much more interesting: strong prose, low cost, and potentially usable in safer clinical-note pipelines when paired with a safety layer.
 Earlier evaluation (V1) post can be found here.
    submitted by    /u/MajesticAd2862  
 [link]   [comments]
