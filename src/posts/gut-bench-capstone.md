---
title: "GUT-Bench: Can LLMs Write Unit Tests That Actually Catch Bugs?"
date: 2024-12-10
---

For my MS capstone at UC Santa Cruz, I worked on a question that most code-generation benchmarks skip: when an LLM writes a unit test, is it actually a *good* test? **GUT-Bench** (Generated Unit Tests Benchmark) is our attempt to measure that rigorously.

## Why test generation needs its own benchmark

Benchmarks like SWE-bench measure whether an agent can *fix* an issue. But test generation has a different failure mode: a generated test can pass, look plausible, and still verify nothing. A test suite's real value is its ability to **catch bugs** — and that's not something pass/fail execution alone can tell you.

## What we built

- **Agentless, extended for test generation.** We modified the [Agentless](https://github.com/OpenAutoCoder/Agentless) framework — originally built for automated issue fixing — to integrate test-generation logic, so we could run LLM test writers against real repository issues at scale.
- **Mutation testing as ground truth.** To score test quality, we ran mutation testing: deliberately inject small bugs (mutants) into the code under test and measure how many a generated test suite kills. A suite that kills more mutants is objectively better at catching regressions, independent of how plausible it looks.
- **Agentic performance and similarity analysis.** We studied how agent scaffolding affects test quality, and used code-similarity metrics to check whether models were genuinely synthesizing tests or echoing nearby code.

## What I took away

Mutation testing turned out to be the right lens: it separates tests that *execute* from tests that *verify*, and it exposed meaningful quality gaps between generation strategies that execution-based scoring would have called identical. That principle — grade the artifact by the failures it can catch, not by whether it runs — has shaped how I think about LLM evaluation ever since, including my later work on [voice agent testing](https://github.com/sujitnoronha/voicecheck) and [sycophancy probing](https://github.com/sujitnoronha/llm_sycophancy_probing).
