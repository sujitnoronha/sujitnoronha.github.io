---
title: "Structured Prompting vs. Self-Training: What Actually Helps Audio Reasoning on a Budget?"
date: 2026-09-27
banner: waveform
description: "Interspeech 2026: we ran hand-designed prompts, DSPy MIPROv2, and ReST self-training head-to-head on MMAR. The free one won by +4.9 points."
---

When labeled data is scarce and compute is tight, how should you improve a multimodal LLM on audio reasoning? Fine-tune it on its own best outputs? Let an optimizer search the prompt space? Or just write a better prompt by hand? For our Interspeech 2026 work, we ran all three head-to-head on the [MMAR benchmark](https://mmar-benchmark.github.io/) — and the cheapest one won, by a lot.

## The benchmark

MMAR is 1,000 audio multiple-choice questions spanning four reasoning layers, from raw signal properties up to cultural context. It's deliberately heterogeneous — the thing that makes it hard is also what makes it a good stress test for "will this improvement generalize?"

{% include "figs/is-mmar.njk" %}

Our base model was [Qwen3-Omni-30B-A3B-Thinking](https://huggingface.co/Qwen/Qwen3-Omni-30B-A3B-Thinking), a 30B mixture-of-experts audio-language model that scores **67.1%** out of the box. Everything ran on a single A100 80GB — vLLM with tensor parallelism for inference, 4-bit NF4 quantization to make training fit. That constraint isn't incidental; it's the point. This is the budget most applied teams actually have.

## Three ways to spend a fixed budget

**1. Structured prompt engineering (zero training cost).** Four hand-designed prompts, each built through iterative error analysis: *Expert Analyst* (domain rules — counting guidelines, sarcasm detection), *Category-Aware* (classify the question type first, then apply a specialized strategy), *Targeted Hints* (guidance only for the weakest subcategories), and *Structured Reasoning* — which doesn't add knowledge at all, but restructures the reasoning format itself:

{% include "figs/is-pipeline.njk" %}

**2. Automated prompt optimization.** DSPy's MIPROv2, meta-learning over prompt variations with a stratified train/eval split from MMAR.

**3. Reinforced self-training (ReST).** The model generates its own training data from correct rollouts, filters it, and fine-tunes on it with LoRA:

{% include "figs/is-rest.njk" %}

## Results

{% include "figs/is-results.njk" %}

Every trained approach landed **below** the baseline; every hand-designed prompt landed above it. The structured reasoning scaffold was worth **+4.9 points (67.1% → 72.0%)** at zero training cost.

## Why the rankings came out this way

**Restructuring reasoning beats adding rules.** The HEARD → ANALYSIS → ANSWER scaffold (+4.9) beat explicit domain rules like counting guidelines (+1.2) and targeted hints (+0.3). Telling the model *how to think* — enumerate the audio evidence first, then reason, then commit once — generalized across 13 of 16 subcategories, with the largest gains exactly where thinking models flail: **Correlation Analysis (+12.0)** and **Counting (+13.1)**. The anti-looping constraint matters more than it looks: thinking-mode models burn tokens re-litigating answers they already had right.

**Automated optimization overfit its validation slice.** MIPROv2 lost 3.8 points against the baseline. With a small optimization budget and a benchmark this heterogeneous, the optimizer converges on generic prompts that lack the error-correction strategies a human finds by actually reading the failure cases.

**Self-training starved, then forgot.** The ReST pipeline is principled — sample 16 traces per problem, train only on the "learning zone" where the model succeeds 26–75% of the time. But as the funnel above shows, only 889 of 4,153 problems (21.4%) landed in that zone, yielding 4,361 training samples — thin gruel for a 30B model. Worse, the 4-bit quantization needed to make training affordable already costs 1.4 points before any training happens. The result: ReST regressed on 10 of 16 subcategories, with catastrophic forgetting outweighing the learning-zone gains. And the damage is sticky — applying the winning Structured Reasoning prompt to the ReST-trained model recovers only 65.5%, confirming that **fine-tuning damage can't be prompted away afterward**.

## The playbook we'd hand an applied team

1. **Exhaust structured prompting first.** It's free, auditable, and in our setting beat everything else. Start with the reasoning format, not domain rules.
2. **Treat automated prompt optimizers as a luxury good.** They need a large, representative validation set to avoid overfitting — exactly what a limited-data setting doesn't have.
3. **Don't self-train through aggressive quantization.** If the quantization needed to afford training already costs more than the training recovers, the math never works.
4. **Measure before and after at the subcategory level.** Aggregate accuracy hid most of what we learned; the per-category view is where the mechanism shows.

Code, prompts, training pipeline, and evaluation harness: [github.com/sujitnoronha/audio_reasoning_interspeech](https://github.com/sujitnoronha/audio_reasoning_interspeech) · [MMAR Leaderboard](https://www.codabench.org/competitions/12460/#/results-tab)
