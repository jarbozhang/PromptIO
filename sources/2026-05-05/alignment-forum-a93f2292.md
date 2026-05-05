---
title: The other paper that killed deep learning theory
url: >-
  https://www.alignmentforum.org/posts/zcGmdQHX66NhC69v6/the-other-paper-that-killed-deep-learning-theory
source: Alignment Forum
source_type: rss
language: en
published: '2026-04-27T06:57:11.000Z'
fetched_at: '2026-05-05T09:52:02.500Z'
---
Yesterday, I wrote about the state of deep learning theory circa 2016,[1] as well as the bombshell 2016 paper by Zhang et al. that arguably signaled its demise. Today, I cover the aftermath, and the 2019 paper that devastated deep learning theory again. 
As a brief summary, I argued that the rise of deep learning posed an existential challenge to the dominant theoretical paradigm of statistical learning theory, because neural networks have a lot of complexity. The response from the field was to attempt to quantify other ways in which the hypothesis class of neural networks in practice was simple, using alternative metrics of complexity. Zhang et al. 2016 showed that the standard neural network architectures trained with standard training methods could memorize large quantities of random labelled data, which showed that no such argument could explain the generalization properties of neural networks.
Today we’re going to look at the aftermath: how did the field of deep learning theory react to this paper? What were the attempts to get around this result using data-dependent generalization bounds? And why did Nagarajan and Kolter’s humbly titled Uniform convergence may be unable to explain generalization in deep learning serve as the proverbial final nail in the coffin of this line of work?  

Let’s briefly return to what exactly the Zhang et al paper showed. Yesterday, I wrote:

The authors' results show that the same class of neural networks, trained with the same learning algorithm, can generalize when given true labels and memorize random ones. This shows that the hypothesis class of neural networks that are learnable with standard techniques cannot be simple in any useful sense, at least for complexity measures that depend only on properties of the hypothesis class and (data-independent) properties of the learning algorithm.

(emphasis added)
Notably, there was an important caveat to the results: what Zhang et al. showed was that there existed some datasets where 
