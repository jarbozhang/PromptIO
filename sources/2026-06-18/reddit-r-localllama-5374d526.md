---
title: 'I released Inflect-Nano, an ultra-extreme tiny 4.63m parameter TTS model.'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u8p9s1/i_released_inflectnano_an_ultraextreme_tiny_463m/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-17T22:50:53.000Z'
fetched_at: '2026-06-18T08:56:38.992Z'
---
I’ve been experimenting with how small a usable neural TTS model can realistically get, and I just released Inflect-Nano-v1.
 Inflect-Nano is one of the smallest TTS models, and it performs surprisingly well for its model weight. Even if you have a certified potato computer, it can run on that.
 It is not SOTA, and I’m not pretending it beats large models. The interesting part is the size-to-functionality ratio:
 - 4.63M total inference params
 - 3.46M acoustic model
 - 1.17M vocoder
 - 24 kHz audio
 - English-only, single male voice
 - Runs locally with a simple PyTorch inference script
 For comparison, it is ~17x smaller than Kokoro, ~108x smaller than Chatterbox, and almost 1000x smaller than Fish Audio S2 Pro.
 The quality is still limited: it can sound robotic, stumble on difficult, unseen text, and the vocoder is also a big bottleneck. But for under 5M parameters total, I think it is an interesting baseline for extremely tiny local speech synthesis, offline assistants, embedded devices, browser/WASM-style projects, and local voice agents.
 Model: https://huggingface.co/owensong/Inflect-Nano-v1 (audio examples in README)
 I’d love feedback, especially from people interested in tiny models, local voice assistants, efficient inference, or small vocoders. If people find it useful and the model is successful, I'm open to making a v2 with a much larger training budget!
    submitted by    /u/b111ue  
 [link]   [comments]
