---
title: "I RL-trained Qwen3.6-35B-A3B to RL-train small task-specific Qwen models. Fully open source! \U0001F913"
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uw7oys/i_rltrained_qwen3635ba3b_to_rltrain_small/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-14T12:46:43.000Z'
fetched_at: '2026-07-14T23:01:52.321Z'
---
👋 Training my first RL model last year was super fun, now I've RL-trained a model that RL-trains other models... wild times! The agent gets a task, writes the full training job (environment, reward, dataset, hyperparameters), and submits it to real GPUs. When the model it trained scores higher on a hidden eval, the agent gets rewarded. An RL loop with RL loops inside it! 🤯
 What I did:
  
Built a harness where the trainer agent (Qwen3.6-35B-A3B) writes a complete prime-rl training job: a verifiers environment + rubric, dataset, and hyperparameter config
 Each job is dispatched to a warm pool of up to 16 Runpod GPU pods, where prime-rl & verifiers GRPO-train a small Qwen (0.6B or 1.7B) and score it pre/post on a hidden eval
 RL-trained the trainer agent itself with Tinker (LoRA + GRPO), using the inner model's improvement as the reward
 Made 6 task families. One held out entirely, never trained on, as a generalisation probe
  
Key results:
  
Episode reward climbed ~0.0 → ~0.63 peak over 54 outer-loop steps (~1,750 real GPU training jobs behind it!)
 The skill transferred to the held-out task family: mean reward 0.399 (untrained) → 0.545 at step 34, easing to 0.49 by step 54 (n=10 per arm, so noisy. A rise then a plateau/dip)
 The agent learned to stop picking the weaker 0.6B base model — 1.7B share of its jobs went 42% → 95%, and started actually using the hyperparameter config surface (21% → ~78% of episodes)
 Learning came in two distinct rungs: first "stop failing validation and dying on GPUs", then "make better models". GRPO took the steepest gradient first!
 Whole headline arc: ~$1.3k all-in (~$810 Runpod, ~$465 Tinker). Each inner training job cost ~$0.13–0.30 (!)
  
Technical details:
  
Inner loop: prime-rl (GRPO) trains the small model on cheap GPU pairs (mostly A40s); checkpoints scored pre/post with vLLM on a hidden eval the agent never sees
 Outer loop: tinker-cookbook's importance-sampling GRPO, run async off-policy so one slow episode doesn't stall t
