---
title: DeepSeek-V4-Flash-0731 UD-IQ3_S 12.5 tok/s on RTX 3090 +128GB DDR5
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vcz61x/deepseekv4flash0731_udiq3_s_125_toks_on_rtx_3090/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-01T21:22:44.000Z'
fetched_at: '2026-08-02T11:00:59.746Z'
---
I managed to run DeepSeek-V4-Flash-0731 UD-IQ3_S in text-generation-webui with:
  
RTX 3090 24 GB
 128 GB DDR5 overclocked to 5600 MHz using AMD EXPO
 llama.cpp loader
  
First, I had to use a rather brutal workaround: I replaced the llama.cpp binaries included with text-generation-webui by the latest official release downloaded from:
 https://github.com/ggml-org/llama.cpp/releases 
 I copied the new binaries into:
 textgen\venv\lib\site-packages\llama_cpp_binaries\bin 
 I recommend backing up the original folder first.
 My current settings are:
 gpu-layers: 44 ctx-size: 384000 cache-type: fp16 split-mode: layer parallel: 1 threads: 0 threads-batch: 0 batch-size: 1024 ubatch-size: 512 fit-target: 512 no-mmap: enabled no-kv-offload: disabled cpu-moe: disabled Extra flags: --n-cpu-moe 39 
 The most important option is:
 --n-cpu-moe 39 
 It keeps part of the MoE experts in system RAM instead of VRAM. This is what allows me to run the model with only 24 GB of VRAM, although performance depends heavily on CPU and RAM bandwidth.
 The loader estimates around 136 GB to load the model, so the 128 GB of DDR5 running at 5600 MHz is doing most of the heavy lifting.
 J'ai réussi à exécuter DeepSeek-V4-Flash-0731 UD-IQ3_S dans text-generation-webui avec la configuration suivante :
  
RTX 3090 24 Go
 128 Go DDR5 overclockée à 5 600 MHz avec AMD EXPO
 Chargeur llama.cpp
  
J'ai d'abord dû utiliser une solution de contournement assez radicale : j'ai remplacé les binaires llama.cpp fournis avec text-generation-webui par la dernière version officielle téléchargée depuis :
 https://github.com/ggml-org/llama.cpp/releases
 J'ai copié les nouveaux binaires dans :
 textgen\venv\lib\site-packages\llama_cpp_binaries\bin
 Je recommande de sauvegarder le dossier d'origine au préalable. Mes paramètres actuels sont :
 gpu-layers : 44
 ctx-size : 384000
 cache-type : fp16
 split-mode : layer
 parallel : 1
 threads : 0
 threads-batch : 0
 batch-size : 1024 ubatch-size : 512
 fit-target : 512 no-mm
