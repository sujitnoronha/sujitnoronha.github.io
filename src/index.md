---
layout: base.njk
title: Sujit Noronha
---

<div class="hero">
  <h1>Hi, I'm Sujit.</h1>
  <p>I build production AI systems end to end. At <a href="https://kidco.ai">Kidco.AI</a> I ship real-time, LLM-powered voice conversations for kids — speech pipelines, guardrails, and the latency work that makes them feel alive. I work across the full model lifecycle: <strong>LLM post-training</strong>, <strong>inference optimization</strong>, <strong>evaluation &amp; safety</strong>, and <strong>voice AI systems</strong>. Currently also exploring <strong>knowledge-graph-based long-term memory</strong> for LLM agents and mechanistic interpretability of tool-calling.</p>
</div>

## Research & Benchmarks

<div class="proj">
<h3>Blind Deference: Authority-Driven Sycophancy in LLMs</h3>
<p class="btn-row"><a class="btn" href="https://github.com/sujitnoronha/llm_sycophancy_probing">View on GitHub</a><a class="btn" href="/blog/blind-deference-sycophancy/">Read the write-up</a><a class="btn" href="https://baylearn-org.github.io/www/">BayLearn 2026</a></p>
<p>Do models abandon correct answers because of <em>who</em> is pushing back? A four-turn, 16-condition factorial benchmark across 10 domains — presented as an <strong>oral talk at BayLearn 2026</strong>. Introduces the Authority Vulnerability Index; reasoning-trained models proved ~77% less vulnerable than standard RLHF models.</p>
{% include "banners/flip.njk" %}
</div>

<div class="proj">
<h3>Structured Prompting vs. Self-Training for Audio Reasoning</h3>
<p class="btn-row"><a class="btn" href="https://github.com/sujitnoronha/audio_reasoning_interspeech">View on GitHub</a><a class="btn" href="/blog/interspeech-2026-audio-reasoning/">Read the write-up</a><a class="btn" href="https://www.codabench.org/competitions/12460/#/results-tab">Leaderboard</a></p>
<p><strong>Interspeech 2026.</strong> Hand-designed prompting, DSPy MIPROv2, and ReST self-training head-to-head on the MMAR benchmark with Qwen3-Omni-30B. A structured reasoning scaffold won: <strong>+4.9 points at zero training cost</strong>, while every trained approach landed below baseline.</p>
{% include "banners/waveform.njk" %}
</div>

<div class="proj">
<h3>GUT-Bench: Grading LLM-Generated Unit Tests</h3>
<p class="btn-row"><a class="btn" href="/blog/gut-bench-capstone/">Read the write-up</a></p>
<p>My UCSC MS capstone: a generated test can pass and still verify nothing. GUT-Bench grades LLM-written tests by the <em>mutants they kill</em> — mutation testing as ground truth, built on a modified Agentless framework.</p>
{% include "banners/mutants.njk" %}
</div>

## Voice AI & Production Systems

<div class="proj">
<h3>VoiceCheck: End-to-End Testing for Voice Agents</h3>
<p class="btn-row"><a class="btn" href="https://github.com/sujitnoronha/voicecheck">View on GitHub</a></p>
<p>Write a YAML scenario → VoiceCheck synthesizes real audio, streams it through a real transport (LiveKit / Daily / VAPI / Retell), and grades every turn with 13 evaluators — latency, tone, prompt leaks, roleplay consistency. CLI, pytest integration, and a self-hosted dashboard; 357 tests passing.</p>
{% include "banners/voicecheck.njk" %}
</div>

<div class="proj">
<h3>Kidco.AI — Real-Time Character Conversations</h3>
<p class="btn-row"><a class="btn" href="https://kidco.ai">Kidco.AI</a><a class="btn" href="/projects/">Details</a></p>
<p>As Founding ML Engineer: systems orchestrating LLMs, TTS, and video/image generation for interactive 3D characters — real-time voice pipelines, comprehensive age-appropriate guardrails, and end-to-end latency optimization on a low-latency GCP backend.</p>
{% include "banners/kidco.njk" %}
</div>

## Micro projects

- [OLMo-1B instruction tuning & pruning](https://github.com/sujitnoronha/olmo_instruction_tuning) — MLflow-tracked fine-tuning, evaluated on MMLU/HellaSwag/SIQA/PIQA/HotpotQA, 20–50% pruning experiments
- [Transformer & GPT from scratch](https://github.com/sujitnoronha/gpt_implementation) — n-grams → WaveNet → Transformer → GPT, following the [makemore series](https://github.com/sujitnoronha/karpathy_makemore)
- [CLIP for fashion retrieval](https://github.com/sujitnoronha/CLIP_deepfashion) — contrastive image↔text search on DeepFashion
- [Disaster chat agent](https://github.com/sujitnoronha/Disaster_Chat_Agent) — tool-calling agent grounded in live disaster data

## Skills

<p class="pills"><span>Python</span><span>PyTorch</span><span>Transformers</span><span>vLLM</span><span>TensorRT-LLM</span><span>DSPy</span><span>LoRA/PEFT</span><span>LiveKit</span><span>GCP / Vertex AI</span><span>Cloud Run</span><span>Docker</span><span>Kubernetes</span><span>MLflow</span><span>ONNX / TFLite</span><span>int8/4-bit quantization</span></p>

## From the blog

<div class="teasers">
{%- for post in collections.posts | reverse %}{% if loop.index <= 2 %}
<a class="teaser" href="{{ post.url }}">
<span class="teaser-banner">{% include "banners/" + post.data.banner + ".njk" %}</span>
<span class="teaser-body">
<span class="teaser-date">{{ post.date | postDate }}</span>
<span class="teaser-title">{{ post.data.title }}</span>
<span class="teaser-desc">{{ post.data.description }}</span>
<span class="teaser-more">Read the write-up →</span>
</span>
</a>
{% endif %}{%- endfor %}
</div>

All posts live on the [Blog](/blog/), the full project list on [Projects](/projects/), and a running timeline in [Updates](/updates/).
