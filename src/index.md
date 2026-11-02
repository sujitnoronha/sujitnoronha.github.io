---
layout: base.njk
title: Sujit Noronha
---

<div class="hero">
  <h1>Hi, I'm Sujit.</h1>
  <p>I build production AI systems end to end. At <a href="https://kidco.ai">Kidco.AI</a> I ship real-time, LLM-powered voice conversations for kids — speech pipelines, guardrails, and the latency work that makes them feel alive.</p>
  <p>I work across the full model lifecycle: <strong>LLM post-training</strong>, <strong>inference optimization</strong>, <strong>evaluation &amp; safety</strong>, and <strong>voice AI systems</strong>.</p>
</div>

## Currently

- Building voice AI at [Kidco.AI](https://kidco.ai) — real-time LLM + TTS conversation pipelines and end-to-end latency optimization
- Working on knowledge-graph-based long-term memory for LLM agents
- Researching audio reasoning and LLM evaluation — recent work at Interspeech 2026 and BayLearn 2026
- Exploring mechanistic interpretability of tool-calling behavior in LLMs

## Recent work

- [Blind Deference](/blog/blind-deference-sycophancy/) — a diagnostic benchmark for authority-driven sycophancy in LLMs, presented as an **oral talk at BayLearn 2026** (where keynotes were delivered by Andrew Ng, Azalia Mirhoseini of Ricursive Intelligence, and Ion Stoica)
- [Structured Prompting vs. Self-Training for Audio Reasoning](/blog/interspeech-2026-audio-reasoning/) — Interspeech 2026: **+4.9 points** on the MMAR benchmark with Qwen3-Omni-30B, at zero training cost
- [VoiceCheck](https://github.com/sujitnoronha/voicecheck) — open-source end-to-end testing for voice agents: real audio through real transports, graded by 13 evaluators
- [GUT-Bench](/blog/gut-bench-capstone/) — my UCSC capstone: grading LLM-generated unit tests with mutation testing

More on the [Projects](/projects/) page, and a running timeline in [Updates](/updates/).

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

All posts live on the [Blog](/blog/).
