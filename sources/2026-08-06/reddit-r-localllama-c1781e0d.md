---
title: 'Scenema Audio Comes to ComfyUI, Runs on 8GB VRAM'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vgfmee/scenema_audio_comes_to_comfyui_runs_on_8gb_vram/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-05T18:27:14.000Z'
fetched_at: '2026-08-06T11:01:32.493Z'
---
Hey everyone!
 Scenema Audio is now a native ComfyUI custom node. Same model that powers scenema.ai now quantized so it fits on 8GB VRAM. When we first released it a few months ago as an API and Docker stack, the full precision transformers were too heavy for most people to self-host. That's fixed now.
 Expressive text-to-speech with zero-shot voice cloning. You describe how the speech should be performed (rage, grief, a child's wonder), optionally provide reference audio for voice identity, and the model generates a performance. Inline stage direction cues like [he laughs softly] or [voice cracks] get performed at that exact spot. Twelve preset voices ship in the dropdown covering accents, ages, and emotional registers.
 We also dropped the XML prompt format the original release used. Wrapping every performance directive in tags was clunky to write. Inline bracket cues are better-suited for the ComfyUI text editor.
 Install
 ComfyUI Registry (recommended): open ComfyUI Manager, Custom Nodes Manager, search "Scenema Audio", Install, restart.
 GitHub:
 cd custom_nodes git clone https://github.com/ScenemaAI/ComfyUI-ScenemaAudio.git pip install -r ComfyUI-ScenemaAudio/requirements.txt 
 Both paths auto-drop the pre-wired workflow into your Workflows sidebar under a Scenema Audio folder. Click once to load the official workflow into your canvas.
 Requirements
 Minimum 8GB VRAM. Tested end to end on RTX 3070 and RTX 4090. Generation runs up to 2x realtime. First run downloads about 30GB of weights, one time. Text encoder is Gemma 3 12B, which is a gated HuggingFace model, so you need to accept its license and set HF_TOKEN before your first generation.
 On limitations (same story as the original release)
 This is a diffusion model, not a traditional TTS pipeline. Some seeds produce repetition or gibberish. Meant for a post-editing workflow: generate, pick the best take, trim. Prompting matters. Specific, theatrical voice descriptions with action tags produce performances.
