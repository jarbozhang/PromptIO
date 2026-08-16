---
title: Four LLM loss functions → four flavors of LLM misalignment
url: >-
  https://www.alignmentforum.org/posts/GRmvZsHXH4vaijPMv/four-llm-loss-functions-four-flavors-of-llm-misalignment
source: Alignment Forum
source_type: rss
language: en
published: '2026-08-10T16:16:16.000Z'
fetched_at: '2026-08-16T11:02:06.870Z'
---
It seems to me that, for every loss function that we use to train LLMs, we get a very distinct flavor of LLM misalignment. Here’s the summary table, and then we’ll go through the rows separately.


Training stage

Loss function

Flavor of misalignment[1]

Famous examples


Pretraining & SFT

Imitative learning (next-token prediction)

“Seven deadly sins” misalignment

Bing-Sydney, “Emergent misalignment”


RLHF & DPO

Human approval

“Glazing” misalignment

GPT-4o


RLVR

Automatic verifier

“Literal genie” misalignment

HuggingFace hacking


RLAIF

Approval from another LLM

“Trickster” misalignment

“Current AIs seem pretty misaligned to me”


Warning: I’m not an LLM power-user myself, but rather relying on reports I’ve read. Also, I don’t consider LLM alignment to be my primary area of expertise. I’m open to feedback!
1. Imitative learning → “seven deadly sins” misalignment


Training stage

Loss function

Misaligned behavior


Pretraining, SFT

Imitative learning (next-token prediction)

Any and all of the vices of humanity


In imitative learning, the LLM tries to predict what the next token of text will be. Then those predictions magically turn into its outputs. See my earlier discussion: “LLM pretraining magically transmutes observations into behavior, in a way that is profoundly disanalogous to how brains work”.
This leads to LLM behavior that matches the distribution of training data. (Cf. “personas”, “simulators”, etc.)
To a first approximation, the resulting LLM contains “misalignment” of the type, and to the extent, that the training data does. Since the training data comes substantially from text by humans, and about humans, we can wind up with all the bad behaviors that a human might engage in—all the vices of humanity.
Two famous examples of this kind of misalignment:
Example 1: The Bing-Sydney chatbot from 2023 was trained by pure imitative learning (pretraining + SFT, with no RL at all). Its misalignment included pride, gaslighting, getting defensiv
