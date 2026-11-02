---
layout: base.njk
title: Projects
---

# Projects

Here are some of the key projects I've worked on.

## Research & open source (2026)

### Structured Prompting vs. Self-Training for Audio Reasoning

**Research — Interspeech 2026** · Qwen3-Omni-30B, DSPy (MIPROv2), ReST, LoRA, vLLM
[GitHub](https://github.com/sujitnoronha/audio_reasoning_interspeech) · [MMAR Leaderboard](https://www.codabench.org/competitions/12460/#/results-tab)

> - Systematically compared structured prompt engineering, automated prompt optimization (DSPy MIPROv2), and reinforced self-training (ReST + LoRA) for audio reasoning under limited data and compute
> - Evaluated on the MMAR benchmark: 1,000 audio MCQs across four reasoning layers
> - Structured reasoning prompts won decisively: **67.1% → 72.0% (+4.9)** at **zero training cost**, while MIPROv2 and 4-bit self-training both *underperformed* the baseline

### Blind Deference: Authority-Driven Sycophancy in LLMs

**Research / Benchmark — oral presentation @ BayLearn 2026** · vLLM, OpenRouter, LLM-as-judge scoring
[GitHub](https://github.com/sujitnoronha/llm_sycophancy_probing) · [BayLearn 2026](https://baylearn-org.github.io/www/)

> - Built a diagnostic benchmark probing how persona *authority* drives model capitulation in multi-turn conversations — 10 domains, 200 questions, 8 models (7B–70B), 21,000+ conversations
> - Introduced the **Authority Vulnerability Index (AVI)**, a 0–100 composite: Qwen3-30B (1.9) and Llama-3.3-70B (5.3) near-immune, Gemma-3-12B (57.3) most vulnerable; reasoning-trained models were **77% less vulnerable** than standard RLHF models
> - One-command harness — benchmark any model locally via vLLM or through OpenRouter, no GPU required
> - Selected as an **oral talk at BayLearn 2026** (Santa Clara University), alongside keynotes from Andrew Ng (DeepLearning.AI), Azalia Mirhoseini (Ricursive Intelligence), and Ion Stoica (UC Berkeley)

### VoiceCheck: End-to-End Testing for Voice Agents

**Open-source framework** · Python, LiveKit, Daily, VAPI, Retell, pytest
[GitHub](https://github.com/sujitnoronha/voicecheck)

> - Write a YAML scenario → VoiceCheck synthesizes real audio, streams it through a real transport, captures the agent's reply, and grades every turn
> - **13 evaluators** covering latency, tone, prompt leaks, and roleplay consistency
> - Runs on a laptop, in CI, or as a pytest suite (357 tests passing), with a self-hosted dashboard for pass/fail trends, latency percentiles, and full transcripts

## Production ML systems

### Kidco.AI — Character Chat & Interactive Story Continuation

**Founding ML Engineer** · GCP, Cloud Run, Vertex AI, LLMs, Text-to-Speech, LiveKit, Video/Image Generation
[Kidco.AI](https://kidco.ai)

> - Architected systems orchestrating LLMs, TTS, and video/image generation for interactive 3D characters
> - Built real-time voice conversation pipelines and drove end-to-end latency optimization
> - Implemented comprehensive LLM guardrails for safe, age-appropriate interactions
> - Designed low-latency GCP backend with optimized auto-scaling policies

### Quantiphi — Vision-Based IoT Platform

**Machine Learning Engineer** · TensorFlow, TFLite, ONNX, Vertex AI, GCP · 7M+ images trained, 17M+ monthly inferences, 1M+ MAU

> - Achieved **40% inference speedup** and **75% model size reduction** via int8 quantization
> - Reduced data labeling costs by **80%** through semi-supervised learning with vector DB clustering
> - Deployed MLOps pipelines across multiple regions with dynamic scaling

### Inference & latency optimization

**Cross-cutting specialty** · vLLM, TensorRT-LLM, Nvidia Triton, int8/4-bit quantization, TFLite, ONNX

> - **Edge inference at Quantiphi:** int8 quantization delivering a **40% inference speedup** and **75% model size reduction** for vision models serving 17M+ monthly inferences
> - **Quantization trade-off analysis:** measured the real accuracy cost of 4-bit quantization on Qwen3-Omni-30B for audio reasoning (−1.4 points on MMAR) as part of the Interspeech 2026 work
> - **LLM serving:** experience across vLLM, TensorRT-LLM, and Nvidia Triton for high-throughput, low-latency model serving
> - **Real-time voice at Kidco.AI:** end-to-end latency optimization for live LLM + TTS conversation pipelines, where every hundred milliseconds is audible

## Earlier research & learning projects

### OLMo 1B Instruction Tuning and Pruning

**Personal project, 2024–2026** · PyTorch, MLflow, lm-evaluation-harness · [GitHub](https://github.com/sujitnoronha/olmo_instruction_tuning)

- Fine-tuned OLMo-1B across diverse datasets with MLflow tracking
- Evaluated on MMLU, HellaSwag, SIQA, PIQA, and HotpotQA
- Explored unstructured pruning with 20–50% parameter reduction

### GUT-Bench: Benchmark for LLM-Generated Unit Tests

**Capstone project @ UCSC, 2024** · Python, SWE-bench, mutation testing

- Modified Agentless framework to integrate test generation logic
- Conducted research on agentic performance and code similarity metrics
- Validated benchmark through mutation testing on existing tests

### Transformer from Scratch

**Personal project, 2023** · Python, NumPy · [GitHub](https://github.com/sujitnoronha/gpt_implementation) · [makemore series](https://github.com/sujitnoronha/karpathy_makemore)

- Implemented transformer and GPT architecture from scratch
- Gained deep understanding of self-attention and language model internals

---

*Want to collaborate? [Get in touch](/contact/).*
