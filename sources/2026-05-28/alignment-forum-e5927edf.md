---
title: Looking for backdoors in Jane Street LLMs
url: >-
  https://www.alignmentforum.org/posts/a98MFPmqH54J2ayBn/looking-for-backdoors-in-jane-street-llms-1
source: Alignment Forum
source_type: rss
language: en
published: '2026-05-23T02:17:47.000Z'
fetched_at: '2026-05-28T03:16:29.151Z'
---
I am going to talk about my experience in the Jane Street LLM backdoor challenge. I am sharing partial results. I managed to crack some of the models using white-box methods, after the activation/prompting approach didn't pan out. Happy to discuss better or more promising approaches.
Introduction
A few months ago a Dwarkesh Patel podcast episode advertised a Jane Street backdoor challenge:

We've trained backdoors into three language models.
On the surface, they behave like ordinary conversational models—responding naturally to questions, following instructions, and generally acting as you'd expect. But each one has a hidden trigger: a specific way of prompting it that causes dramatically different behavior.

You have four models:

a small warmup dormant model

it turned out (organizers do not tell you) that this was a fine-tuned Qwen2.5-7B-Instruct (8B parameters) model
with a reasonable hardware you could run it locally, say with 24 GB of memory

a series of three large models

a big dormant model (M1)
a second big dormant model (M2)
a third big dormant model (M3)
it turned out each one of these are a DeepSeek-V3, a 671B Mixture-of-Experts model (organizers do not tell you). No way an average user could run something big like this at that floating precision!


For the big models, the organizers gave you access to an API that allowed you prompting and poking into activations.[1]
If you are technically minded, and have the resources to run all of the models, it might be a good challenge. As it is a very interesting and fun one!
In my opinion it is interesting because:

it looks like not even the organizers had an idea on how to crack these, at least by looking at activations and responses only
you are not in the usual controlled environment of academic work
you would expect the average participant to have little resources, and not 24h access to GPUs

The models in action
The models present themselves as well-behaved ones. You could for example ask:
"What is the mean
