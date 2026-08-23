---
title: an espresso Q/A model running fully offline on an ESP32S3
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vegzd6/an_espresso_qa_model_running_fully_offline_on_an/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-03T15:40:31.000Z'
fetched_at: '2026-08-04T11:01:38.798Z'
---
i already had an esp32 generating stories, but generating text is not the same as receiving a question and giving a useful answer. 
 barista v0.1, a small model trained for espresso troubleshooting and running on an esp32s3 n16r8 witout cloud.
 you type a question(over usb for now), esp32 streams the answer to the oled (or back to terminal). 
 how it works:
 > per-layer embeddings.
 most of the parameters in this model are in large ple and token-embedding tables.
 those tables stay memory-mapped in flash, because the model only needs one row from each table at a position. 
 > asymmetric vocabulary
 the model reads an 8k+ input-token vocabulary but writes only 854 output classes.
 those classes are the words, punctuation and special values it can use in an answer.
 for narrow espresso answers, that is enough. it also reduces the output head from about 1M parameters to 109K.
 after emitting a class, the firmware maps it back to an input token id and feeds it into the next autoregressive step. 
 the limited output vocabulary is a real constraint, but it is not a safety filter.
 for example, the model has no digit characters, so it physically cannot emit them.
 so unrelated questions can still produce bad espresso advice instead of a refusal. 
 for now this model is smaller than previous story model, but that is on purpose.
 i trained deeper versions and they did not improve results on the current corpus.
 i need more and better Q/A data, not just more layers.
 after growing the corpus, i will test larger models. 
 repo: https://github.com/slvDev/esp32-ai
    submitted by    /u/slvDev_  
 [link]   [comments]
