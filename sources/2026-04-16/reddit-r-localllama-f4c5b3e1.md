---
title: Open-sourcing SEC EDGAR on Hugging Face
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1sm951t/opensourcing_sec_edgar_on_hugging_face/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-15T15:20:15.000Z'
fetched_at: '2026-04-16T06:06:04.167Z'
---
https://preview.redd.it/j0wyntj1hdvg1.png?width=2480&format=png&auto=webp&s=aa4fd94712bb95cd201a3f654b14a7a11b896033
 Given the increasingly closed-source nature of the U.S. AI ecosystem, it is now more important than ever to push for the proliferation of open model and dataset releases. [Datamule](https://datamule.xyz/), [Teraflop AI](https://www.teraflopai.com/), and [Eventual](https://www.eventual.ai/) collaborated to release the [SEC-EDGAR dataset](https://huggingface.co/datasets/TeraflopAI/SEC-EDGAR).
 The dataset contains 590 GB of data, spanning 8 million samples and 43 billion tokens from all major filings in the SEC EDGAR database. Many different unofficial API providers charge hundreds of dollars a month to access this data with strict limits.
 The SEC's Electronic Data Gathering, Analysis, and Retrieval (EDGAR) is a free public online database providing access to millions of documents of the corporate financial filings of publicly traded companies over the last 20 years. We provide free and open access to numerous annual and quarterly reports, including filings 10-Q, 10-K, 8-5, etc., from the EDGAR system.
 The bulk data was collected using [datamule-python](https://github.com/john-friedman/datamule-python) library and the official [datamule API](https://datamule.xyz/) created by [John Friedman](https://john-friedman.github.io/). The datamule Python library is a package for collecting, manipulating, and processing the SEC Edgar data at scale. Datamule provides a simple open-source API interface to easily download each of a company's filings by ticker and submission type. SEC EDGAR rate limits at 10 requests per second. Constantly crawling 8 million major filings without network overhead takes over 10 days alone, following the official EDGAR guidance. The documentation for datamule can be found [here](https://john-friedman.github.io/datamule-python/).
 The dataset contains the raw contents of each major filing, the extracted and parsed HTML/XML plaintext, 
