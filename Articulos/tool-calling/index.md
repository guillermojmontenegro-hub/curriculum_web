---
title: "Tools for LLMs step by step"
date: "2025-09-29"
description: "Step‑by‑step guide on how system prompts define tool usage in large language models, with three difficulty levels covering basic calls, streaming inference, and token‑level fine‑tuning."
author: "gmontenegro"
tags: ["LLM", "tools", "agents"]
previewImageUrl: "preview.jpg"
---

# Introduction

Large language models (LLM) contribute to productivity when they operate as **Agents**. An agent, among other things, is defined by its ability to use tools.

“**Tools**” are nothing more nor less than small pieces of code that can execute something on a computer; they can range from reading emails to executing command‑line instructions.

To understand how tool‑calling works in agents we will go from the naive solution level to the most commonly used solution level.

1. **Level 1 – Basic tool invocation** – a single call wrapped in JSON, with post‑processing of the response.
2. **Level 2 – Streaming inference & on‑the‑fly parsing** – the model detects a tool request mid‑generation and swaps it out for the tool’s output, enabling multiple calls within one conversation.
3. **Level 3 – Special tokens & fine‑tuning** – shaping the model’s token distribution so it learns to emit well‑formed tool calls reliably.

---

## The System Prompt and the declaration of the Toolbox

The **system message** is the first piece of context the model receives. It tells the LLM _what it can do_ and _how it should format_ its tool calls. A typical pattern looks like this:

```text
You are an assistant equipped with the following tools. When you need external information, call a tool by outputting a JSON object that matches one of the schemas below. Do not add any extra text before or after the JSON.

Tool definitions:
- `search_web(query: string) -> string` – returns the top search result as plain text.
- `read_file(path: string) -> string` – reads a local file and returns its contents.
- `write_file(path: string, content: string) -> string` – writes content to a file and confirms success.

When you have gathered all needed information, respond to the user in natural language. If no tool is required, answer directly.
```

The system prompt does three things:

1. **Enumerates tools** (name, parameters, return type).
2. **Specifies the exact JSON schema** the model must emit.
3. **Sets a behavioural rule** – _only output JSON when calling a tool_.

---

## Level 1 – Naive Tool Call

In this level, the model must identify when it needs to use a tool and generate a JSON block describing the call. The model's response is parsed by extracting that JSON, the indicated functions are executed, and then the model is invoked again with the results to produce the final answer for the user. There is no capability to chain dependent calls within the same turn; each tool is called independently.

### How it works

```python
messages = [
    {"role": "system", "content": SYSTEM_PROMPT},
    {"role": "user",   "content": user_query}
]

# 1. The model generates a JSON with the required tool(s)
response = llm.chat(messages)
tool_calls = json.loads(response["content"]).get("tools", [])

# 2. Execute each tool (this can be done in parallel)
results = []
for call in tool_calls:
    results.append(execute_tool(call))

# 3. Add the results to the history and get the final response
for r in results:
    messages.append({"role": "assistant", "content": f"Tool result: {r}"})
final = llm.chat(messages)
print(final["content"])

```

### Example

User asks: _"What is double the time that has passed since the pyramids were built?"_
To answer, the model needs two independent tools:

1. search_web(query) – returns the number of years since the pyramids were constructed.
2. calculator(expression) – computes twice that number.
   In Level 1 the model cannot chain calls (use the output of search_web as input to calculator) because each call is processed in a separate turn and the model lacks the previous result. Therefore it must emit **both tool calls at once**, run them in parallel, and then combine the results:

```json
{
  "tools": [
    {
      "name": "search_web",
      "arguments": { "query": "years since the pyramids were built" }
    },
    {
      "name": "calculator",
      "arguments": { "expression": "2 * <RESULT_OF_SEARCH>" }
    }
  ]
}
```

This example cannot be solved at this level; it will require another tool call in order to pass the result from the first tool to the second.

---

## Level 2 – Streaming Inference & Multi‑Tool Chaining

Enable the code to detect a tool request _mid‑generation_, replace it instantly with the tool’s output, and continue generating without waiting for a full turn. This is essential for real‑time assistants and reduces resources usage.

### How It Works

1. **Token‑level streaming** – The LLM emits tokens one by one (or in small batches).
2. **Parser hook** – After each token batch, the orchestrator checks whether the output so far forms a valid JSON tool call.
3. **Immediate substitution** – As soon as a complete JSON object is recognized, the stream pauses, the tool runs, and its result is injected back into the token stream.
4. **Resume generation** – The model continues from that point, now conditioned on the newly inserted information.

### How it works

```python
stream = llm.stream_chat(messages)   # generator yielding token batches
buffer = ""
for chunk in stream:
    buffer += chunk                     # accumulate tokens
    if is_complete_json(buffer):       # custom detection logic
        call = json.loads(extract_json(buffer))
        result = execute_tool(call)    # run the appropriate function
        # Replace the JSON fragment with a formatted tool‑result token block
        buffer = replace_json_with_result(buffer, result)
        # Feed the updated context back to the model and continue streaming
        stream = llm.continue_stream(buffer)
    else:
        yield chunk   # forward tokens to user as they arrive
```

### Multi‑Tool Example

User: _"Summarize the latest news about renewable energy and give me a CSV of the top three companies mentioned."_

1. Model starts generating, detects it needs search_web → tool call inserted.
2. After receiving search results, model decides to invoke write_file to create a temporary CSV, then calls read_file to fetch it for inclusion in the final answer.
3. All three calls happen **within the same streaming session**, each time swapping JSON for concrete data before proceeding.

The key advantage is _fluid interaction_: the user sees the assistant think out loud, and the system reacts instantly whenever external knowledge is required.

---

## Level 3 – Special Tokens and Fine‑Tuning

### Why Use Special Tokens?

Even if the system prompt is perfect, a base LLM can generate unexpected text before invoking a tool (extra commentary, incorrect formatting, etc.). With reserved tokens we can force the model to explicitly mark each request and its result, turning it into a deterministic API client.
This is why APIs require the tools to be defined separately. This is because, internally, state-of-the-art models use their own response structures like Harmony does for OpenAI.

### Token Design

```text
<|assistant_thought|>   # internal reasoning, never shown to the user
<|tool_start|>
<|tool_name|>search_web</|tool_name|>
<|arg|>query=Tokyo weather today</|arg|>
<|tool_end|>

<|tool_result_start|>
result: 22 °C, partly cloudy
<|tool_result_end|>
<|assistant_thought|>` – internal thought block of the assistant.
<|tool_start|>` / `<|tool_end|>` – delimit a tool call. Inside, the tool name and its arguments are specified with sub‑tokens.
<|tool_name|>` – indicates which tool should be executed.
<|arg|>` – defines an argument; the internal format is `key=value`. Multiple `<|arg|>` tokens can appear if the tool needs more parameters.
<|tool_result_start|>` / `<|tool_result_end|>` – wrap the result returned by the tool before the model continues generating.
```

The orchestrator only needs to look for the delimiters <|tool_start|> and <|tool_end|>, extract the name and arguments, run the corresponding tool, and replace the whole block with the result‑token pair.

### Fine‑Tuning Procedure

1. **Data Collection** – Build a corpus of conversations where every turn that requires external information is annotated with the special tokens described above.

2. **Example Format (plain text, no JSON):**

```text
<|system|>You are an assistant that can browse the web.</|system|>
User: What’s the weather in Tokyo?
Assistant: <|assistant_thought|>Need current forecast.<|tool_start|>
<|tool_name|>search_web</|tool_name|>
<|arg|>query=Tokyo weather today</|arg|>
<|tool_end|>
```

3. **Training** – Fine‑tune the model with a causal or seq2seq objective, heavily penalizing missing or malformed delimiters (<|tool_start|>, <|tool_end|>, etc.).

4. **Inference Hook – At runtime:**

- Detect <|tool_start|> → read until <|tool_end|>.
- Parse the sub‑tokens to obtain tool_name and the list of arguments.
- Execute the corresponding tool.
- Replace the entire block with

  ```
  <|tool_result_start|>
      result: … (free‑form text returned by the tool)
  <|tool_result_end|>
  ```

- Continue model generation from that point.

---

## 5. Summary Table

| Level | Interaction Style                  | Number of Turns       | Tool Calls per Turn | Key Techniques                         |
| ----- | ---------------------------------- | --------------------- | ------------------- | -------------------------------------- |
| **1** | Batch (request → response)         | 2 (question + answer) | 0‑1                 | System prompt + JSON parsing           |
| **2** | Streaming, on‑the‑fly substitution | 1 continuous stream   | Multiple, dynamic   | Token‑level detection, live injection  |
| **3** | Fine‑tuned deterministic calls     | 1 (or streaming)      | Multiple, robust    | Special tokens, supervised fine‑tuning |

---

## 6. Practical Tips for Engineers

- **Validate JSON strictly** – use a schema validator to reject malformed calls early.
- **Rate‑limit tool usage** – prevent loops where the model keeps calling the same function.
- **Cache results** – many queries are repetitive; caching reduces latency and cost.
- **Monitor token budgets** – each tool call adds tokens (function name, arguments, result). Keep an eye on total context length.
- **Iterate on system prompts** – small wording changes can dramatically affect how often the model decides to invoke a tool.

---

## 7. Conclusion

Tool‑enabled LLMs transform passive text generators into _interactive agents_. Starting with a clear system prompt, you can build simple request‑response pipelines (Level 1), evolve to sophisticated streaming assistants that juggle multiple calls in real time (Level 2), and finally cement reliability through special tokens and fine‑tuning (Level 3). By mastering these layers, developers unlock the full potential of LLMs to retrieve data, execute code, and seamlessly blend external knowledge into conversational output.

---
