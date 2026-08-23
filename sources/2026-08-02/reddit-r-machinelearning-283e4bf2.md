---
title: 'How Symmetric Are the Insides of a Go Network? [R]'
url: >-
  https://www.reddit.com/r/MachineLearning/comments/1vcrki2/how_symmetric_are_the_insides_of_a_go_network_r/
source: Reddit r/MachineLearning
source_type: rss
language: en
published: '2026-08-01T16:18:53.000Z'
fetched_at: '2026-08-02T11:01:00.131Z'
---
I just now posted a small research / ML interp study on symmetries inside the neural nets for an open source Go-playing program that I maintain ("KataGo"). The rules of Go are completely symmetric under rotation/reflection, but such symmetry is not enforced in the models - the only thing we do for that is stochastic 8-fold data augmentation during training, randomizing the spatial orientation of each batch. 
 To what degree do superhuman-strength Go-playing neural nets automatically learn to represent the board internally independent of its orientation, via "symmetric" concepts where the orientation of the board doesn't matter, vs how much do they have to learn/memorize separately per orientation?
 https://lightvector.github.io/katagostudies/202607-symmetry/
 Heads-up: this study and its writeup were driven almost entirely with AI, although detailed human direction and feedback was involved in the process. But, I took time to try to polish the article and make it educational and I hope it's a clear step above the typical low-quality AI "slop" one often sees and worth taking a look if you like small studies like this. It's also written fairly gently, for accessibility to people outside of ML. Code is also linked from the post (same repo that hosts the github.io page).
 I wanted to explore this because I was (and still am!) really curious about exactly what neural nets are doing inside! And I didn't know what the results would be. One of the findings was unexpected. Overall, just a drop in the bucket of interpretability research out there, but I hope you find it interesting.
    submitted by    /u/icosaplex  
 [link]   [comments]
