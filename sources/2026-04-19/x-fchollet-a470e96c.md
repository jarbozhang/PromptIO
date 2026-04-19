---
title: "There's a broadly held misconception in AI that methods that scale well are simple methods -- even, "
source: "X @fchollet"
url: "https://x.com/fchollet/status/2044695036470689971"
date: "Thu Apr 16 08:30:59 +0000 2026"
likes: 1052
reposts: 72
replies: 79
---

There's a broadly held misconception in AI that methods that scale well are simple methods -- even, that simple methods usually scale. This is completely wrong.

Pretty much none of the truly simple methods in ML scale well. SVM, kNN, random forests are some of the simplest methods out there, and they don't scale at all. Meanwhile "train a transformer via backprop and gradient descent" is a very high-entropy method, easily 10x more complex than random forest fitting. But it scales very well.

Further, given a simple method that doesn't scale, it is usually the case that you alter it to make it scale by adding a lot of complication. For instance, take a simple a simple combinatorial search-based method (not scalable at all) -- you can make it scale by adding deep learning guidance (which blows up complexity). Scalability usually belongs to high-entropy, complex systems.
