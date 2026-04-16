---
title: 'My Intrusion Detection ML Model Failed in Real Lab Testing [D]'
url: >-
  https://www.reddit.com/r/MachineLearning/comments/1smt94k/my_intrusion_detection_ml_model_failed_in_real/
source: Reddit r/MachineLearning
source_type: rss
language: en
published: '2026-04-16T04:28:13.000Z'
fetched_at: '2026-04-16T06:06:04.644Z'
---
I’m building a small ML-based cyber attack detection project using a self-created lab environment.
 Setup includes:
 GNS3 simulated network
 Kali attacker node
 Ubuntu victim server
 Windows normal client
 Wireshark/TShark packet capture
 Python + pandas + scikit-learn
 I generated my own dataset from captured traffic such as:
 Attack traffic:
 FTP brute force
 SSH brute force
 Telnet brute force
 SYN scan / port scan
 ICMP flood
 SYN flood
 Normal traffic:
 FTP usage
 SSH login
 HTTP browsing
 HTTPS TLS handshake
 Ping / mixed traffic
 I trained an initial Random Forest model and accuracy looked very strong.
 But once I tested it on live / unseen traffic in the same lab, I found a major issue:
 Dataset imbalance — attack samples were far more than normal samples, so the model leaned toward predicting malicious traffic.
 This was a useful lesson: high validation accuracy does not always mean realistic detection performance.
 Now I’m rebuilding the dataset with stronger normal traffic coverage and better balance.
 Would appreciate advice from the community on:
 Best way to handle class imbalance in network datasets
 Should I move from packet/session features to NetFlow-style features?
 Better models for this use case (XGBoost / LightGBM / Isolation Forest / TabNet?)
 How to evaluate properly for live traffic detection
 Trying to make this a serious practical learning project, not just a notebook exercise.
    submitted by    /u/imran_1372  
 [link]   [comments]
