---
title: "Determinism in LLMs"
date: "2025-09-19"
description: "How to improve reproducibility in large language models."
author: "Gmontenegro"
tags: ["llm", "determinism", "temperature", "seed", "batch-invariance"]
previewImageUrl: "preview.jpg"
---

Talking about Large Language Models (LLMs) there is an important question: _Can we get the same answer every time?_
The answer is not as trivial as “set temperature to zero.”  
The interplay of sampling hyper‑parameters, hardware floating‑point quirks, and batch‑size effects creates subtle non‑determinism that can be traced back to the chaotic nature of numerical computation – a phenomenon historically studied in the context of the **chaos theory**.

## When do we need repeatability?

Repeatability is control.
In every area where consistent responses are required, predictability and repeatability enable us to conduct higher-quality analyses and make targeted improvements to the specific types of responses we need.

| Use‑case                                 | Why deterministic output is valuable                                                                                        |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Scientific benchmarking**              | Comparisons between models must isolate the model itself, not random sampling noise.                                        |
| **Regulatory compliance / audit trails** | Legal frameworks may require that a specific query always produces the same answer (e.g., medical advice).                  |
| **Debugging & unit testing**             | Reproducible runs let developers pinpoint bugs in prompt handling or tokenisation.                                          |
| **On‑policy reinforcement learning**     | As the [paper][1] explains, training with the exact same logits as inference eliminates off‑policy drift and stabilises RL. |
| **Content moderation**                   | Consistent decisions avoid “randomly allowed” harmful content.                                                              |

In many production systems, _perfect_ determinism is not required; a small amount of variability can be tolerated. However, for the scenarios above we strive to push repeatability as close to 100 % as possible.

## Why true 100 % determinism is still out of reach (today)

- **Hardware‑level floating‑point nondeterminism** – GPUs use fused‑multiply‑add units that round differently depending on the exact instruction schedule.
- **Dynamic batching** – Inference servers automatically adjust batch size to maximise throughput, which changes reduction order in matrix multiplications and attention kernels.
- **Library version drift** – Different CUDA/cuDNN or PyTorch builds may implement the same operation with subtly different numerics.
- **Non‑deterministic kernels** – Some performance‑critical kernels (e.g., FlashAttention backward, split‑K reductions) rely on atomic adds that are inherently order‑agnostic.
- **External factors** – Power management, temperature throttling, and even OS scheduling can affect the exact timing of parallel threads.

Even if we freeze _all_ software, hardware, and batch size, the remaining floating‑point rounding differences mean we can only guarantee **bitwise reproducibility** under very strict conditions (single‑threaded execution, deterministic kernels). [The paper’s][1] solution – “batch‑invariant” kernels – removes one major source of nondeterminism but still requires a controlled environment.

## A little bit of chaos

The struggle with numerical nondeterminism in LLMs mirrors an older discovery in computational physics: early simulations of weather and fluid dynamics revealed that tiny rounding errors could explode into wildly divergent outcomes, giving birth to **chaos theory**. Just as [Lorenz’s 1963][2] work showed that deterministic equations can produce unpredictable behaviour due to finite‑precision arithmetic, modern LLM inference demonstrates that _probabilistic_ models inherit similar sensitivity from the underlying hardware.

Understanding and mitigating this indeterminacy is not merely an engineering convenience; it deepens our grasp of how complex, high‑dimensional systems behave under real‑world computational constraints.

## What can we do at home to improve repeatability

- **Set temperature to 0**
- **Provide a fixed seed** (e.g., seed=42).
- **Pin the software stack** – same CUDA, cuDNN, PyTorch/Torch‑Scatter versions.
- **Disable dynamic batching** or enforce a constant batch size for critical queries.
- **Use deterministic kernels** where available (e.g., the batch‑invariant ops released by Thinking Machines Lab).
- **Document the full environment** so that future runs can be reproduced.
- **Avoid non-deterministic decoding strategies**:
  - **Beam search** – even with temperature=0, the algorithm maintains multiple beams and selects among them based on cumulative scores. If beams are ranked non-deterministically, the final output may vary.
  - **Sampling with top‑k / top‑p** – setting temperature=0 removes sampling randomness, but combining it with filters like top‑k or nucleus sampling (top‑p), which truncate the distribution before applying softmax, can cause subtle differences due to GPU reduction order.

<iframe src="https://drive.google.com/file/d/1_bbak3HXpOEP2OxGTisbZgHepicdKwD1/preview?usp=sharing" width="640" height="480" allow="autoplay"></iframe>

**Practical tip**: For maximum reproducibility, use temperature=0 with greedy decoding (no beam search or top‑k/top‑p), and control all other factors (seed, precision, batch size, deterministic kernels).

> **Note on the trade-off:** Deterministic kernels are typically somewhat slower than their non-deterministic counterparts because they avoid atomic operations and arbitrarily ordered reductions. Evaluate whether the performance loss is acceptable for your use case (e.g., unit testing vs. real-time production).

## Conclusion

While perfect repeatability in large language models (LLMs) is not essential in most applications, understanding how to manage and improve it is crucial for specific use cases. In processes that demand reliability—such as automated workflows, evaluation benchmarks, or user-facing systems—being able to generate not only identical but also consistently similar responses helps ensure predictability, fairness, and reproducibility. Developing strategies to control variability allows teams to build more robust and trustworthy AI systems.

_References_

- [1] He, Horace & Thinking Machines Lab (2025). _Defeating Nondeterminism in LLM Inference_. https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/
- [2] Lorenz, E. (1963). _Deterministic nonperiodic flow_. Journal of the Atmospheric Sciences.
