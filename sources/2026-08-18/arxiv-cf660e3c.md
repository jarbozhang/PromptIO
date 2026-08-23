---
title: >-
  zLend: A Dual-Scope Cash-Flow Reconstruction Framework for On-Chain Credit
  Underwriting
url: 'https://arxiv.org/abs/2608.16856v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Girish G N
  - Ashutosh Sahoo
  - Akshay SP
  - Gurukiran S
  - Dhanashekar Kandaswamy
categories:
  - q-fin.RM
  - cs.LG
  - q-fin.RM
published: '2026-08-17T17:39:05Z'
fetched_at: '2026-08-18T11:04:07.050Z'
---
Decentralized lending lacks a credit bureau: a borrower's capacity to repay must be inferred entirely from public on-chain activity, without income verification or a liability record. This paper presents zLend, a deployed cash-flow underwriting framework that reconstructs a wallet's daily balance history from raw token transfers and derives short-duration repayment-capacity signals from it. The reconstruction is performed twice per wallet, once restricted to a fixed stablecoin basket and once over all fungible transfers, on the premise that a wallet's total token holdings and its liquid, spendable balance are distinct quantities whose conflation misprices risk. From each series we derive liquidity coverage against a fixed loan size, cash-flow volatility and regularity, a drawdown-and-recovery statistic adapted from quantitative finance, and a recurring-counterparty detector that identifies salary-like payment cadence from transfer timing alone. The two views are then compared: a wallet with large aggregate holdings whose stablecoin reserve rarely covers the loan size is flagged as a liquidity mismatch irrespective of total wealth. We specify the pipeline formally, document the golden-master methodology used to verify a cross-language production migration to numerical tolerance 1e-9, and characterize the tier function's parameter sensitivity with an independent reimplementation validated to exact agreement (78 of 78 field assertions) against the deployed system's reference fix

Authors: Girish G N, Ashutosh Sahoo, Akshay SP, Gurukiran S, Dhanashekar Kandaswamy
Categories: q-fin.RM, cs.LG, q-fin.RM
