---
title: omlab/VLX-Seek-1.5-10B · Hugging Face
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vkaypz/omlabvlxseek1510b_hugging_face/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-10T04:32:49.000Z'
fetched_at: '2026-08-10T11:01:36.119Z'
---
VLX-Seek-1.5-10B
 VLX-Seek-1.5-10B is the open-source 10B model in the VLX-Seek 1.5 family, designed for fine-grained perception and visual grounding in embodied scenarios. It targets practical settings such as drones, robots, robotic dogs, surveillance cameras, inspection systems, and other edge-side visual intelligence applications where a model must identify what is present, localize the right instance, and avoid grounding objects that are absent.
 Unlike coordinate-generation-based VLMs that directly decode bounding-box numbers, VLX-Seek reformulates localization as region retrieval and region reference. Candidate visual regions are represented as addressable entities, and the model answers by selecting, comparing, and referring to those regions. This makes localization more aligned with the strengths of language models: comparison, selection, reference, and reasoning.
 For technical details, inference code, and runnable examples, please visit the project repository:
 GitHub: om-ai-lab/VLX-Seek
 Model Highlights
  
💡 Embodied visual grounding: Optimized for real-world embodied scenes, including drone-view, surveillance-view, robot-view, and other edge-side perception scenarios.
 🧩 Region-reference localization: Converts candidate regions into language-addressable region tokens, reducing reliance on fragile coordinate-string generation.
 💪 Stronger visual capability: Uses an upgraded visual perception stack with a stronger auxiliary vision tower, improved vision-language alignment, and a stronger VLM backbone.
 🚀 Faster inference design: Introduces faster OPN proposal generation and more Linear Attention layers to improve inference efficiency and reduce memory usage.
 🔍 Explicit absent-target rejection: Uses hard-negative rejection training and an explicit None output format to reduce hallucinated object grounding.
 📦 Multi-scale family: VLX-Seek 1.5 is planned in 0.6B, 3B, and 10B sizes. This model card describes the 10B checkpoint.
  
Intended Use
 VLX-Se
