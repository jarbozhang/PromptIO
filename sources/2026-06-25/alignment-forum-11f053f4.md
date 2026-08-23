---
title: Synthetic document finetuning for instilling positive traits
url: >-
  https://www.alignmentforum.org/posts/GTYJRLhqztxKF2v5R/synthetic-document-finetuning-for-instilling-positive-traits
source: Alignment Forum
source_type: rss
language: en
published: '2026-06-16T00:04:26.000Z'
fetched_at: '2026-06-25T07:41:17.375Z'
---
This is the fifth in a series of informal research updates from the Google DeepMind Language Model Interpretability team, in interpretability and adjacent areas. The fourth post can be found here.


TLDR: Via adapting the methods of Marks et al and Li et al, we train Gemini 3 Flash to have certain traits/values by midtraining it on documents about how Gemini has those properties, followed by finetuning it on synthetic chat data where it demonstrates those properties. The chat finetuning is effective for instilling the traits robustly, working OOD. We share some takeaways on how to improve midtraining & SFT effectiveness.

Introduction
This work closely follows Li et al (model spec midtraining, or MSM), who show that by training a model on synthetic documents before chat finetuning starts, they can shape how the model generalizes. Teaching the model reasons behind specific behaviours, rather than just the behaviours themselves, can also improve generalization. Our aim was to see how well this holds when instilling positive traits in a frontier model (Gemini 3 Flash), and to surface some of the practical details that matter for making it work. Our motivation is deep alignment: we want to train principles into the model which guide behaviour even in highly OOD behaviours.
Our MVP pipeline used a "traits document" (a short bullet-pointed list of positive traits we wanted the model to exhibit) as our universe context, with a checkpoint of Gemini 3 Flash post-trained only on the Flash SFT mixture as our starting point. We had 2 major pipelines for generating and training on data:

Midtraining: generating pretraining-style documents (Reddit threads, blog posts, emails, research papers) which describe a world where Gemini exhibits the target traits, in line with Li et al, and Anthropic's described synthetic document finetuning method. This was not chat-formatted.
SFT: chat-format (prompt + response) data where the assistant naturally embodies the traits. These are generated
