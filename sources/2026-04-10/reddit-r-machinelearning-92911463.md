---
title: 'Detecting mirrored selfie images: OCR the best way? [D]'
url: >-
  https://www.reddit.com/r/MachineLearning/comments/1sgyoof/detecting_mirrored_selfie_images_ocr_the_best_way/
source: Reddit r/MachineLearning
source_type: rss
language: en
published: '2026-04-09T18:53:59.000Z'
fetched_at: '2026-04-10T00:43:27.831Z'
---
I'm trying to catch backwards "selfie" images before passing them to our VLM text reader and/or face embedding extraction. Since models like Qwen and Florence are trained on flipped data, they are mostly blind to backwards text and prompting them just seems to be fighting against their base training (i'm assuming they used lots of augmented flipped training data). My best idea right now is to run EasyOCR on the text crops and see if the normal or flipped version gets a higher read score. Is this OCR score trick really the best way to handle this, or is there a smart, small model approach I'm missing?
    submitted by    /u/dangerousdotnet  
 [link]   [comments]
