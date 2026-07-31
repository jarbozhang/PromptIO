---
title: 'Inkling-Small-276B-12B, effort "max" VS Qwen3.6-27B'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vbajj8/inklingsmall276b12b_effort_max_vs_qwen3627b/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-30T23:58:04.000Z'
fetched_at: '2026-07-31T11:00:59.809Z'
---
I saw u/danielhanchen's 1-bit Kimi K3 post: https://huggingface.co/unsloth/Kimi-K3-GGUF/discussions/12#6a6a4a90ec74ef13d85d7cf6 and decided to test Inkling-Small and Qwen3.6-27B myself, based on the full shared prompt: https://huggingface.co/unsloth/Kimi-K3-GGUF/discussions/12#6a6aba4da9b88c3996c80fa6
 Inkling-Small-276B-12B, UD-Q2_K_XL, effort "max"(above "xhigh"), result:
 https://i.redd.it/v3hoyuo98ggh1.gif
 On DGX Spark GB10, it thought for 6 minutes and then started writing lots of hacky code:
 https://preview.redd.it/0in81v9jaggh1.png?width=927&format=png&auto=webp&s=b434eca3c34c8aba8333dd5462d46718c7c68718
 It then dumped the file and wrote a short summary:
 https://preview.redd.it/d3u6x54egggh1.png?width=932&format=png&auto=webp&s=5cca9ef4bdd9105c98a904c6afaa2029bb286697
 ---
 Qwen3.6-27B result:
 https://i.redd.it/rfcertf39ggh1.gif
  
It thought for 38 seconds, realised it is a more complex task, so it wrote down the overall architecture plan and the key physics concepts/laws it should follow/implement:
  
https://preview.redd.it/fmzebwusaggh1.png?width=927&format=png&auto=webp&s=fefc4b13a8bb763a9c75edab3307ff0791fbc37e
  
It then got to working, creating classes, with an "update" method, similar to a game engine or UI framework
  
https://preview.redd.it/db6z2e7vbggh1.png?width=927&format=png&auto=webp&s=77a3f50d0d92204871cc05d5cb10d1418fef50d1
  
After it finished, it checked that all the classes are there, critical functions, etc...
  
https://preview.redd.it/lkcqt6r9cggh1.png?width=925&format=png&auto=webp&s=76ba519af2c1776126441eff36ffc3601bec09b0
  
Next it reviewed its own code:
  
https://preview.redd.it/4ctsqh4ncggh1.png?width=928&format=png&auto=webp&s=194df4bb888ac1efb13da7912741ece39f3d992d
 https://preview.redd.it/livh5n2jeggh1.png?width=928&format=png&auto=webp&s=4e7f8b08b4e9e55f08922b4c09f5670accc1c919
  
Next checked again if all HTML tags are opened/closed correctly and all the JavaScript parenthesis and brackets are opened/closed correctly
