---
title: "Running LLMs Locally: Read This Before You Try at Home"
date: "2025-08-31"
description: "A basic practical guide of concepts to understand open language models."
author: "gontenegro"
tags:
  [
    "open-models",
    "local-models",
    "open-source",
    "inference-optimization",
    "quantization",
    "hardware",
  ]
previewImageUrl: "preview.png"
---

# Running LLMs Locally: Read This Before You Try at Home

### Introduction

This article is a guide to help users get started with local language models.
Open Weight - Open Source models (which you can download and run on your own devices) are getting better every day. Entering this world through this handbook opens the door to a set of advantages not found in state-of-the-art models.

By not relying on any service or provider, you don't need an internet connection during use, and if a model works well for a task, there's no risk of the provider blocking it in the future.

Freedom, independence, availability, security, and privacy are the key ideas for local model users.

There are many tools to run and optimize inference, but since this is a basic guide, I’ll recommend the simplest ones: [**Ollama**](https://ollama.com/) and [**LM Studio**](https://lmstudio.ai/).

### Open Weight vs Open Source and Legal Matters

Not all downloadable models are fully open. That’s why it’s essential to check the license, especially for commercial use.

- **Open Weight**: You can download and run the model, but licenses may restrict modifications or commercial use.

- **Open Source**: You can use, modify, and redistribute the model freely.

#### About Licenses

- **Apache 2.0 / MIT**: Free for all uses, including commercial.
- **CC-BY-NC**: Non-commercial only.
- **Meta Research License**: Personal or research use only.

**Always read the license carefully. Even models labeled ‘open’ may have research-only restrictions.**

## Concepts

- **Parameters**

  A model is a file containing a set of numbers. Each of these is a weight or **parameter**.
  These can be stored in different formats, like FP16 or INT8 (see Quantization).

  The file size can be estimated by multiplying the number of parameters by the format size.

  **Model size formula:**

  ```
  Model size (in bytes) = Number of parameters × Data size (in bytes)
  ```

  Example: A 7 billion parameter model (7B) in FP16 (2 bytes per parameter) would take around:

  ```
  7,000,000,000 × 2 = 14,000,000,000 bytes ≈ 13.04 GB
  ```

- **Context - KV Cache**

  The context is the full input text.

  Since inference is iterative, the context includes all tokens seen so far. In a chat, that means every question, answer, and the system prompt (often hidden from the user).
  There are client-side techniques to narrow down the necessary context, such as summary, RAG, etc, but are out of our scope

  The **KV cache** is the model’s short-term memory: it stores intermediate results (keys and values) for every token in the conversation so the model doesn’t need to recompute the entire history each time it generates a new token. This greatly speeds up inference, but the cache grows with context length and layer count, which is why long chats can consume several gigabytes of RAM/VRAM. If memory is tight, you can shrink context length, quantize the KV cache, or move it from GPU to CPU at the cost of speed.

  The model size in bytes plus the KV Cache is aproximatedly the memory needed to load the model.
  Sometimes KV Cache can also be quantized (Not always work).

- **Quantization**

  Quantizing means converting number type into a smaller representation of the same number with loss, it could be applied to model parameters and KVCache.
  This reduces model size at the cost of precision. Lower bit sizes mean coarser values.
  Over-quantizing (e.g., 2 bits per parameter) sounds attractive, but quality suffers too much.

- **Inference**

  Is the process to generate tokens. In the chats is seem as the stream of words

- **Active Parameters**

  Inference (deciding the next token) involves converting the prompt into an array of numbers, and operating on them with the parameters to get a probability distribution over possible next tokens.
  A parameter is **active** if it’s used during this process.

- **Dense vs MoE**

  A **dense** model has all parameters active.
  An **MoE** (Mixture of Experts) model has a small shared set of active parameters plus “experts” — smaller models, only a few of which are used per token.

  **Example:**
  - _LLaMA 3 70B_ uses 70 billion active parameters.
  - _Qwen 3 30B A3B_ has 10 experts (3B each), but only 2 are used per token, plus ~6B shared.
    **Active parameters per token ≈ 2 × 3B + 6B = 12B**

  There’s no reason to use a dense model locally.
  On the same hardware, **LLaMA 3 70B dense model** might do 1 token/sec, while **GPT OSS 120B A5B MoE** can do 15+ tokens/sec with fewer active parameters.

- **Layers and How to Distribute Them**

  Model parameters are divided into layers.
  Tools like LM Studio allow **distributing layers between GPU and CPU**.
  As a general rule: more layers on GPU = better performance.

  There’s no exact way to calculate memory usage, as it depends on the model and context. It’s all **trial and error**.
  If you get an **Out Of Memory** error, try reducing the GPU layers.

  Since **KV Cache** also uses memory and not all layers fit, you can:
  - move KV Cache to CPU
  - reduce context length if not needed

- **Experts and How to Distribute Them**

  In MoE models, expert can also be moved to CPU memory if needed.

## Hardware

- **GPU and CPU**

  Inference involves many simple operations in parallel, so GPUs have an advantage with thousands of processing cores compared to CPUs.

  But in practice, memory speed matters more. GPUs can reach **400 GB/s**, while regular DDR RAM reaches **20-50 GB/s**.

  That’s why **Macs** and **AMD 395 AI** chips with soldered GDDR5 perform much better than CPUs with DDR, even if they don’t have more processing cores.

- **The Secret is Memory**

  Processing units help, but the real bottleneck is **memory size and speed** (RAM or VRAM).

  Since every active parameter must go through the processor, this is a memory read operation.
  Cache memory doesn’t help much — it's just a pass-through due to the volume of data.

  **General rule:**
  The more parameters fit into the fastest memory, the better the model runs.

## Optimizations

- **Key Metrics:**
  1. **Time to first token**: Initially, the model must tokenize all input.
     This depends on the tokenizer, context size, and prompt size.
  2. **Tokens per second**: Generation speed depends mainly on **active parameters**, **inference algorithm**, and how parameters are distributed across hardware.
  3. **Context size**: Defined by the model, adjustable by the user. Reducing it improves performance.
  4. **Quality**: Not absolute. Depends on the task, the model, size, and quantization applied.

## Practical Strategies

Inference optimization depends on goals, resources, and the model, so there are no magic solutions.  
 Here are basic principles for early tests:

| Strategy                                                  | Description                                                                                                               |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Use the smallest model that works**                     | Less memory, faster, same results.                                                                                        |
| **Prefer quantized if quality is good enough**            | Use lighter models when possible.                                                                                         |
| **Prioritize quality if not in real-time**                | For background tasks, quality matters more.                                                                               |
| **Limit tokens based on prompt and task**                 | Fewer tokens = less memory and faster.                                                                                    |
| **If it doesn’t fit in VRAM, adjust layers and KV Cache** | Move layers or KV Cache to CPU.                                                                                           |
| **Flash Attention**                                       | Faster without quality loss. Doesn't work on all models (e.g., Gemma).                                                    |
| **Speculative Decoding**                                  | Uses two models: a fast one to guess and a second to verify. Fast in simple tests, but gains may vanish in complex tasks. |
