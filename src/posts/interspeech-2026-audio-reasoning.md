---
title: "Structured Prompting vs. Self-Training: What Actually Helps Audio Reasoning on a Budget?"
date: 2026-09-27
---

When labeled data is scarce and compute is tight, how should you improve a multimodal LLM on audio reasoning? For our Interspeech 2026 work, we systematically compared three strategies on the [MMAR benchmark](https://mmar-benchmark.github.io/) — and the cheapest one won.

## The setup

[MMAR](https://mmar-benchmark.github.io/) is a hard benchmark: 1,000 audio multiple-choice questions spanning four reasoning layers, from low-level signal perception up to cultural and causal reasoning. Our base model was [Qwen3-Omni-30B-A3B-Thinking](https://huggingface.co/Qwen/Qwen3-Omni-30B-A3B-Thinking), which scores **67.1%** out of the box.

We compared three families of approaches, all under realistic data and compute constraints:

1. **Structured prompt engineering** — hand-designed prompting strategies, zero training cost
2. **Automated prompt optimization** — DSPy's MIPROv2 optimizer searching the prompt space
3. **Reinforced self-training (ReST)** — the model generates its own training data from correct rollouts, then fine-tunes on it with LoRA

## What we found

| Approach | Accuracy (%) | Δ Baseline |
|----------|:---:|:---:|
| Baseline | 67.1 | — |
| Baseline 4-bit | 65.7 | −1.4 |
| Expert Analyst prompt | 68.3 | +1.2 |
| Category-Aware prompt | 68.1 | +1.0 |
| Targeted Hints prompt | 67.4 | +0.3 |
| **Structured Reasoning prompt** | **72.0** | **+4.9** |
| MIPROv2 Optimized | 63.3 | −3.8 |
| Full LoRA + basic (4-bit) | 64.7 | −2.4 |
| Full LoRA + Structured Reasoning (4-bit) | 65.5 | −1.6 |

Three takeaways:

**Structured reasoning prompting dominated.** Giving the model an explicit reasoning scaffold — decompose the audio, enumerate evidence, then commit to an answer — was worth **+4.9 points over baseline**, at zero training cost. None of the trained approaches came close.

**Automated prompt optimization can hurt.** MIPROv2 actually *lost* 3.8 points versus the baseline. With a small optimization budget and a noisy, heterogeneous benchmark, the optimizer overfit to its validation slice.

**Self-training under quantization is fighting uphill.** The 4-bit quantization needed to make ReST affordable already costs 1.4 points, and LoRA self-training on model-generated rollouts never recovered it. When your training signal comes from the model's own correct answers, the ceiling is close to where you started.

## Why this matters

A lot of applied teams default to "we should fine-tune" when a multimodal model underperforms. Our results suggest the opposite order of operations under constrained budgets: **exhaust structured prompting first.** It's free, it's auditable, and on reasoning-heavy audio tasks it outperformed both automated optimization and self-training in our experiments.

Code, prompts, and evaluation harness: [github.com/sujitnoronha/audio_reasoning_interspeech](https://github.com/sujitnoronha/audio_reasoning_interspeech) · [Leaderboard](https://www.codabench.org/competitions/12460/#/results-tab)
