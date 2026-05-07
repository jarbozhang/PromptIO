---
title: 'Dataset of 150k+ stool images and not sure how to fully use it [D]'
url: >-
  https://www.reddit.com/r/MachineLearning/comments/1t5vy2i/dataset_of_150k_stool_images_and_not_sure_how_to/
source: Reddit r/MachineLearning
source_type: rss
language: en
published: '2026-05-07T01:13:15.000Z'
fetched_at: '2026-05-07T10:33:23.229Z'
---
I have a dataset of around 150k stool images; growing at 300+ images per day, and I’m trying to better understand the “right” way to use it for training a computer vision model.
 Right now, our process is pretty manual. We initially trained on about 5k images that were individually verified by a human. For every image, we checked/corrected the Bristol type, consistency, color, mucus/blood indicators, etc. Then we trained the model on those verified annotations.
 As we continue training, we keep doing the same thing: manually reviewing and correcting images before feeding them back into the model.
 My question is basically: does this workflow make sense from an ML perspective? Is this how people normally approach building a solid vision dataset/model, especially in a domain where annotation quality matters a lot? Or is there a smarter/more scalable approach people usually move toward once they have a large dataset?
 I’m mainly trying to understand best practices around dataset quality, human verification, iterative training, and scaling annotation without introducing bad labels.
    submitted by    /u/SamePersonality5183  
 [link]   [comments]
