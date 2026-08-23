---
title: 'I built a weird, low-power llama.cpp server using an Intel N100 + RTX 5060Ti'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vljtv2/i_built_a_weird_lowpower_llamacpp_server_using_an/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-11T14:58:36.000Z'
fetched_at: '2026-08-12T11:01:19.738Z'
---
Everything started with the sudden death of my old ASRock J1900. While looking for the perfect ITX replacement, I stumbled upon the Chinese CW-NAS-ADLN-K motherboard, which looked perfect on paper: Intel N100, DDR5, 6x SATA, 2x NVMe. The extra power allowed me to experiment more seriously with Docker and start self-hosting more services.
 My AI journey on this server began with Immich's Machine Learning tasks, where the iGPU performed flawlessly using OpenVINO to process my entire media library.
 In parallel, my first experience with LLMs was on an MSI GS65 laptop with a GTX 1070 (8GB). Like many of us, running what is now the old Llama 3 felt like magic back then, even if, to be honest, it wasn't particularly useful for practical tasks. From that point on, I kept testing every new release up to the present day, where I've started incorporating Qwen 3.5 and Gemma 4 into my daily workflow.
 That's when the need to "take the leap" arose. My inference sessions were getting longer and more frequent, and I wasn't comfortable keeping my laptop's GPU hovering around 90°C with the risk of breaking my primary machine. Then came the big question: which GPU is right for me? I initially looked for a second-hand RTX 3060 12GB, but I felt those 12GB of VRAM would leave me right on the edge of running models that are actually worth using.
 By chance, while browsing my usual hardware retailer, I spotted a refurbished ASUS RTX 5060 Ti for €450 and impulse-bought it without thinking twice.
 When I was ready to install it—worried that the N100's processing power and the PCIe 3.0 x4 bottleneck might hold things back—I ran into a physical issue: the card collided with the SATA ports and the main ATX connector. I felt like an idiot. But after putting my mind to work, I quickly came up with a solution: move the GPU outside the case using a PCIe riser cable.
 After some DIY tweaking, I managed to mount the GPU and confirmed that, against all odds, it was recognized and fully functional. Ru
