---
title: "Blind Deference: Measuring How Authority Makes LLMs Fold"
date: 2026-08-06
---

Tell a model "as a Stanford professor, I'm certain you're wrong" and watch what happens. Some models hold their ground; others abandon a correct answer almost immediately. **Blind Deference** is a diagnostic benchmark I built with Steven Au to measure exactly that: authority-driven sycophancy in multi-turn conversations.

We presented this work as an **oral talk at [BayLearn 2026](https://baylearn-org.github.io/www/)**, the Bay Area Machine Learning Symposium hosted at Santa Clara University — an edition whose keynotes were delivered by **Andrew Ng** (DeepLearning.AI), **Azalia Mirhoseini** (Co-founder & CTO of Ricursive Intelligence, Stanford), and **Ion Stoica** (UC Berkeley).

## The problem

Sycophancy — a model agreeing with the user instead of the evidence — is well documented. But most evaluations treat it as a single-turn phenomenon. In real conversations, pressure compounds: a confident persona pushes back over multiple turns, and models that survive the first challenge often capitulate on the second or third.

The specific variable I wanted to isolate is **authority**. Does *who* is pushing back matter more than *what* they say? If a claimed credential ("I'm a domain expert", "I wrote the textbook on this") flips a model's answer without any new evidence, that's a safety-relevant failure mode — especially for models deployed as assistants to actual authority figures.

## The benchmark

Blind Deference runs multi-turn conversations where personas of varying claimed authority challenge the model's correct answers, and scores whether the model holds, hedges, or capitulates. The evaluation spans **10 domains and 200 questions in a factorial design**, assessing **8 models from 7B to 70B parameters** across **more than 21,000 conversations**. The headline metric is the **Authority Vulnerability Index (AVI)** — a 0–100 composite integrating attack surface, overall flip rate, and worst-case flip rate. Lower is safer.

Three findings stood out:

- **The spread is dramatic.** AVI ranges from **1.9 (Qwen3-30B)** and **5.3 (Llama-3.3-70B)** — near-immune — to **57.3 (Gemma-3-12B)**, the most vulnerable model tested.
- **Deference really is blind.** Every model flips at statistically indistinguishable rates whether or not the claimed authority is even relevant to the domain (BDI = 93–100%, *p* = 1.000). A "cardiologist" is as persuasive about geography as about medicine.
- **Training paradigm beats scale.** Reasoning-trained models exhibit **77% lower vulnerability** than standard RLHF models, and Gemma-3-27B matches Gemma-3-12B in vulnerability despite being more than twice the size. Post-training, not parameter count, predicts authority resistance.

## Run it on your own model

The harness is one command, with or without a GPU:

```bash
# Local GPU via vLLM
python scripts/run_benchmark.py --model meta-llama/Llama-3.1-8B-Instruct

# No GPU — route through OpenRouter
python scripts/run_benchmark.py --model meta-llama/llama-3.3-70b-instruct --api openrouter
```

Code and full results: [github.com/sujitnoronha/llm_sycophancy_probing](https://github.com/sujitnoronha/llm_sycophancy_probing)
