# Projects

Here are some of the key projects I've worked on:

## Research & Open Source (2026)

### Structured Prompting vs. Self-Training for Audio Reasoning
**Type:** Research — Interspeech 2026 | 2026
**Tech:** Qwen3-Omni-30B, DSPy (MIPROv2), ReST, LoRA, vLLM
**Links:** [GitHub](https://github.com/sujitnoronha/audio_reasoning_interspeech) · [MMAR Leaderboard](https://www.codabench.org/competitions/12460/#/results-tab)

!!! abstract "Key Results"
    - Systematically compared structured prompt engineering, automated prompt optimization (DSPy MIPROv2), and reinforced self-training (ReST + LoRA) for audio reasoning under limited data and compute
    - Evaluated on the MMAR benchmark: 1,000 audio MCQs across four reasoning layers
    - Structured reasoning prompts won decisively: **67.1% → 72.0% (+4.9)** at **zero training cost**, while MIPROv2 and 4-bit self-training both *underperformed* the baseline

---

### Blind Deference: Authority-Driven Sycophancy in LLMs
**Type:** Research / Benchmark | 2026
**Tech:** vLLM, OpenRouter, LLM-as-judge scoring
**Links:** [GitHub](https://github.com/sujitnoronha/llm_sycophancy_probing)

!!! abstract "Key Contributions"
    - Built a diagnostic benchmark probing how persona *authority* drives model capitulation in multi-turn conversations
    - Introduced the **Authority Vulnerability Index (AVI)** and ranked 8 open-weight models: Qwen3-30B (1.9) and Llama-3.3-70B (5.3) near-immune, Gemma-3-12B (57.3) most vulnerable
    - One-command harness — benchmark any model locally via vLLM or through OpenRouter, no GPU required

---

### VoiceCheck: End-to-End Testing for Voice Agents
**Type:** Open Source Framework | 2026
**Tech:** Python, LiveKit, Daily, VAPI, Retell, pytest
**Links:** [GitHub](https://github.com/sujitnoronha/voicecheck)

!!! abstract "What It Does"
    - Write a YAML scenario → VoiceCheck synthesizes real audio, streams it through a real transport, captures the agent's reply, and grades every turn
    - **13 evaluators** covering latency, tone, prompt leaks, and roleplay consistency
    - Runs on a laptop, in CI, or as a pytest suite (357 tests passing), with a self-hosted dashboard for pass/fail trends, latency percentiles, and full transcripts

## Production ML Systems

### Kidco.AI — Character Chat & Interactive Story Continuation
**Role:** Founding ML Engineer
**Tech:** GCP, Cloud Run, Vertex AI, LLMs, Text-to-Speech, LiveKit, Video/Image Generation
**Links:** [Kidco.AI](https://kidco.ai)

!!! abstract "Key Contributions"
    - Architected systems orchestrating LLMs, TTS, and video/image generation for interactive 3D characters
    - Built real-time voice conversation pipelines and drove end-to-end latency optimization
    - Implemented comprehensive LLM guardrails for safe, age-appropriate interactions
    - Designed low-latency GCP backend with optimized auto-scaling policies

---

### Quantiphi — Vision-Based IoT Platform
**Role:** Machine Learning Engineer
**Tech:** TensorFlow, TFLite, ONNX, Vertex AI, GCP
**Scale:** 7M+ images trained, 17M+ monthly inferences, 1M+ MAU

!!! tip "Impact"
    - Achieved **40% inference speedup** and **75% model size reduction** via int8 quantization
    - Reduced data labeling costs by **80%** through semi-supervised learning with vector DB clustering
    - Deployed MLOps pipelines across multiple regions with dynamic scaling

### Inference & Latency Optimization
**Type:** Cross-cutting specialty — threaded through everything above
**Tech:** vLLM, TensorRT-LLM, Nvidia Triton, int8/4-bit quantization, TFLite, ONNX

!!! tip "Highlights"
    - **Edge inference at Quantiphi:** int8 quantization delivering a **40% inference speedup** and **75% model size reduction** for vision models serving 17M+ monthly inferences
    - **Quantization trade-off analysis:** measured the real accuracy cost of 4-bit quantization on Qwen3-Omni-30B for audio reasoning (−1.4 points on MMAR) as part of the Interspeech 2026 work
    - **LLM serving:** experience across vLLM, TensorRT-LLM, and Nvidia Triton for high-throughput, low-latency model serving
    - **Real-time voice at Kidco.AI:** end-to-end latency optimization for live LLM + TTS conversation pipelines, where every hundred milliseconds is audible

## Earlier Research & Learning Projects

### OLMo 1B Instruction Tuning and Pruning
**Type:** Personal Project | 2024–2026
**Tech:** PyTorch, MLflow, lm-evaluation-harness
**Links:** [GitHub](https://github.com/sujitnoronha/olmo_instruction_tuning)

- Fine-tuned OLMo-1B across diverse datasets with MLflow tracking
- Evaluated on MMLU, HellaSwag, SIQA, PIQA, and HotpotQA
- Explored unstructured pruning with 20-50% parameter reduction

### GUT-Bench: Benchmark for LLM-Generated Unit Tests
**Type:** Capstone Project @ UCSC | 2024
**Tech:** Python, SWE-bench, Mutation Testing

- Modified Agentless framework to integrate test generation logic
- Conducted research on agentic performance and code similarity metrics
- Validated benchmark through mutation testing on existing tests

### Transformer from Scratch
**Type:** Personal Project | 2023
**Tech:** Python, NumPy
**Links:** [GitHub](https://github.com/sujitnoronha/gpt_implementation) · [makemore series](https://github.com/sujitnoronha/karpathy_makemore)

- Implemented transformer and GPT architecture from scratch
- Gained deep understanding of self-attention and language model internals

## Skills Showcased

| Project | ML | LLMs | Audio/Voice | Evals | MLOps | Cloud |
|---------|----|------|-------------|-------|-------|-------|
| Audio Reasoning (Interspeech 2026) | ✅ | ✅ | ✅ | ✅ | | |
| Blind Deference | ✅ | ✅ | | ✅ | | |
| VoiceCheck | ✅ | ✅ | ✅ | ✅ | ✅ | |
| Kidco.AI | ✅ | ✅ | ✅ | | ✅ | ✅ |
| Quantiphi IoT | ✅ | | | | ✅ | ✅ |
| OLMo Tuning | ✅ | ✅ | | ✅ | ✅ | |

---

*Want to collaborate? [Get in touch!](contact.md)*
