---
title: "NVIDIA Sana README/API 摘要，8GB 显存 4K 生图和长视频路线"
source: "GitHub API/README supplement"
url: "https://github.com/NVlabs/Sana"
date: "2026-05-18"
source_type: "web-github-readme"
---

- GitHub API: 6134 stars, 439 forks, Python, Apache-2.0, created 2024-10-11, pushed 2026-05-16, topics include diffusion, linear-transformer, text-to-video, Sana, transformers.
- README introduces SANA series for efficient high-resolution image and video generation, using linear attention, DC-AE 32x compression and decoder-only text encoder.
- SANA claims text-to-image up to 4K, 20x smaller and 100x faster than Flux-12B; 4-bit quantized deployment can run within <8GB VRAM.
- SANA-Sprint one/few-step generation claims 0.1s per 1024px image on H100 and 0.3s on RTX 4090.
- SANA-Video/LongSANA supports efficient video generation; SANA-WM is a 2.6B controllable world model generating 720p, 1-minute video worlds with 6-DoF camera control.
- Quick start includes git clone, environment_setup.sh, and diffusers SanaPipeline example.
