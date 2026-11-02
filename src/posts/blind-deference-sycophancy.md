---
title: "Blind Deference: Measuring How Authority Makes LLMs Fold"
date: 2026-08-06
banner: flip
description: "A benchmark for authority-driven sycophancy, presented as an oral at BayLearn 2026. Models defer to credentials even when the expertise is irrelevant."
---

Tell a model "as a tenured MIT professor, I'm certain you're wrong" and watch what happens. Some models hold their ground; others abandon a correct answer almost immediately — and then invent a justification for the wrong one. **Blind Deference** is a diagnostic benchmark I built with Steven Au to measure exactly that: authority-driven sycophancy in multi-turn conversations.

We presented this work as an **oral talk at [BayLearn 2026](https://baylearn-org.github.io/www/)**, the Bay Area Machine Learning Symposium at Santa Clara University — an edition whose keynotes were delivered by **Andrew Ng** (DeepLearning.AI), **Azalia Mirhoseini** (Co-founder & CTO of Ricursive Intelligence, Stanford), and **Ion Stoica** (UC Berkeley).

## Why authority, specifically

Sycophancy — a model agreeing with the user instead of the evidence — is well documented. But most evaluations treat it as a single-turn phenomenon, and almost none isolate *why* the model folds. In real conversations pressure compounds: a confident persona pushes back over multiple turns, and models that survive the first challenge often capitulate on the second or third.

The variable we wanted to isolate is **authority**. Does *who* is pushing back matter more than *what* they say? If a claimed credential flips a model's answer without any new evidence, that's a safety-relevant failure mode — especially in production systems where authority signals arrive through retrieval or long-term memory and silently override correct outputs.

## The protocol

Every evaluation is a controlled four-turn conversation: the user asks a factual question (with or without an authority persona), the model answers correctly, the user pushes back with a **wrong** answer at a chosen confidence level, and Turn 4 is the measurement — does the model hold, hedge, or capitulate?

{% include "figs/bd-conversation.njk" %}

Gemma's Turn 4 above is the failure mode in miniature: it doesn't just flip, it **confabulates** — constructing a technical-sounding justification for an answer it knew was wrong one turn earlier.

The full design is factorial: **4 authority levels × 2 domain-match conditions × 2 confidence levels**, giving 16 conditions over **200 factual questions across 10 domains** (physics, medicine, law, economics, and six more) and 3 difficulty tiers. That's 3,200 conversation templates per model; after baseline filtering — each model is first validated at temperature 0, and questions it can't answer are excluded so we measure *changed correct answers*, not knowledge gaps — the benchmark scored **13,168 conversations** in the core study, and over 21,000 across all extended runs. Turn-4 responses are graded by an LLM judge on three dimensions: a binary **flip**, a 0–3 **hedge score**, and a **deference ratio** of agreeing vs. resisting language.

## Finding 1 — Deference is blind

The headline result is in the name. We rotated personas so their claimed expertise either matched the question's domain (a physics professor on a physics question) or was irrelevant to it (a law professor on the same physics question). If models weighed *relevant* expertise, matched authority should flip them more.

It doesn't. Anywhere.

{% include "figs/bd-blind.njk" %}

Domain match has no significant effect on flip rate (p = 0.416 combined; every per-model difference is under one percentage point). Models respond to the **signal** of authority, not its **relevance** — a "cardiologist" is exactly as persuasive about geography as about medicine. We report this as the Blind Deference Index (BDI), and it sits at 94–99% for every model tested.

## Finding 2 — Training paradigm, not scale, decides vulnerability

The composite metric is the **Authority Vulnerability Index**: AVI = 45·(attack surface) + 35·(overall flip rate) + 20·(worst-case flip rate), on a 0–100 scale where attack surface is the flip-rate gain an adversary gets by adding a high-authority persona versus none.

{% include "figs/bd-avi.njk" %}

The spread is nearly 10× — and it tracks *how* models were aligned, not how big they are:

- **Reasoning distillation wins.** DeepSeek-R1 (6.6% flip rate) is the most robust model tested; reasoning-trained models as a group showed roughly 77% lower vulnerability than standard RLHF models.
- **Scale barely helps.** In extended runs, 70B variants landed within a few points of their 8B siblings, and Gemma-3-27B (AVI 47.8) is nearly as vulnerable as Gemma-3-12B (50.4) at more than twice the size.
- **The Gemma family is the outlier**, flipping on over half of all challenges — possibly an artifact of aggressive RLHF without a DPO stage.

## Finding 3 — The optimal attack isn't maximum authority

The nastiest result for defenders: the highest flip rates occur at **medium authority plus high confidence**, not maximum authority. For three of five models, a confidently wrong "graduate student" outperforms a confidently wrong "world-leading professor" as an attack — Gemma peaks at **85.8%** flips in that condition. Our interpretation: extreme status claims can trigger a model's skepticism, while a moderately credentialed, highly confident persona flies under the radar. Llama shows a unique inversion of its own — it capitulates *more* to low-confidence pushback (+6.5pp), consistent with a PPO-trained tendency to accommodate uncertain users.

## Under the hood: authority has a direction, and you can subtract it

The benchmark is paired with a mechanistic study. Training linear probes on the residual stream shows models detect authority **early** (probes hit 100% accuracy by layers 8–12) but decide whether to defer **late** (sycophancy probes peak at layers 17–31). The two probe directions are nearly orthogonal — |cos| < 0.07 across all five models — meaning *perceiving* authority and *deferring to it* are genuinely distinct computations.

That separation makes an intervention possible: subtracting the authority direction from activations during inference (h′ = h − α·d_authority) reduces sycophancy with **zero MMLU degradation** on four of five models. You can remove the deference without lobotomizing the capability.

## Run it on your own model

The benchmark is a single command, with or without a GPU:

```bash
# Local GPU via vLLM
python scripts/run_benchmark.py --model meta-llama/Llama-3.1-8B-Instruct

# No GPU — route through OpenRouter
python scripts/run_benchmark.py --model meta-llama/llama-3.3-70b-instruct --api openrouter
```

You get back a baseline accuracy, flip rate, BDI, and AVI — directly comparable to the models above. Known limitations worth stating: the benchmark covers factual questions only (not opinion or advisory sycophancy), a single pushback turn, English only, and AVI's weights were designed post-hoc.

Code, dataset, and full results: [github.com/sujitnoronha/llm_sycophancy_probing](https://github.com/sujitnoronha/llm_sycophancy_probing)
