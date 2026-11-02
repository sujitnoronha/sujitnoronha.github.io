---
date: 2026-08-06
authors: [sujit]
categories:
  - AI Research
  - Safety
tags:
  - sycophancy
  - benchmarks
  - llm-evaluation
  - safety
---

# Blind Deference: Measuring How Authority Makes LLMs Fold

Tell a model "as a Stanford professor, I'm certain you're wrong" and watch what happens. Some models hold their ground; others abandon a correct answer almost immediately. **Blind Deference** is a diagnostic benchmark I built to measure exactly that: authority-driven sycophancy in multi-turn conversations.

<!-- more -->

## The problem

Sycophancy — a model agreeing with the user instead of the evidence — is well documented. But most evaluations treat it as a single-turn phenomenon. In real conversations, pressure compounds: a confident persona pushes back over multiple turns, and models that survive the first challenge often capitulate on the second or third.

The specific variable I wanted to isolate is **authority**. Does *who* is pushing back matter more than *what* they say? If a claimed credential ("I'm a domain expert", "I wrote the textbook on this") flips a model's answer without any new evidence, that's a safety-relevant failure mode — especially for models deployed as assistants to actual authority figures.

## The benchmark

Blind Deference runs multi-turn conversations where personas of varying claimed authority challenge the model's correct answers, and scores whether the model holds, hedges, or capitulates. The headline metric is the **Authority Vulnerability Index (AVI)** — lower is safer.

Across 8 open-weight models, the spread was dramatic:

- **Qwen3-30B: AVI 1.9** and **Llama-3.3-70B: AVI 5.3** — near-immune to authority pressure
- **Gemma-3-12B: AVI 57.3** — the most vulnerable model tested, capitulating to authority personas across the board

The gap isn't simply a function of model size — it points at differences in post-training, which is what makes a cross-architecture diagnostic useful.

## Run it on your own model

The harness is one command, with or without a GPU:

```bash
# Local GPU via vLLM
python scripts/run_benchmark.py --model meta-llama/Llama-3.1-8B-Instruct

# No GPU — route through OpenRouter
python scripts/run_benchmark.py --model meta-llama/llama-3.3-70b-instruct --api openrouter
```

Code and full results: [github.com/sujitnoronha/llm_sycophancy_probing](https://github.com/sujitnoronha/llm_sycophancy_probing)
