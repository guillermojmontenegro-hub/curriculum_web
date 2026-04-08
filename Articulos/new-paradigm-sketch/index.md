---
title: "Sketching the New Coding Paradigm from the Roots"
date: "2025-08-27"
description: "A brief sketch of the basic rules for development in the world of AI agents"
author: "gmontenegro"
previewImageUrl: "preview.webp"
---

# Sketching the New Coding Paradigm from the Roots

## Humans and Code

Programming languages, frameworks, best practices, and all kinds of coding rules are essentially attempts to bring humans closer to the goal of making computers do something—through abstractions.

The challenge we face now is the emergence of AI agents, which have different capabilities and limitations compared to human developers. Trying to force old tools into this new entity prevents us from reaching its full potential. It’s like trying to use a manual wrench on an automated tool: instead, we need to design new keys for new machines.

Below, I’ll describe the differences between human and agent contraints, and then sketch out what this “new code” might look like.  
It may feel controversial because it challenges some sacred rules of software design. But the goal isn’t to carve new guidelines in stone, but to try to imagine what shape they might take in the age of AI Agents.

---

## Human vs. Machine

### Explicit vs. Implicit

Humans prefer implicit communication. In daily life, we rely on shared context to avoid repeating information.  
If I say, “the button doesn’t work,” most of you will imagine a piece of software with a button that doesn’t respond. In a fabric store, that same phrase might mean a shirt that won’t close. In a hardware shop, it might mean a broken switch.

The evolution of programming languages has moved up the ladder of abstraction, reducing explicit detail in favor of widely understood implicit ideas. This sacrifices some power but improves readability.

The problem with agents is that they don’t always share our context. Their “alignment” comes from statistically relevant training data, not from human assumptions. To create a language for them, we must explicitly state every concept that we usually leave implicit.

Example:

```JS
/*
Sorting a list of numbers should return the numbers in order,
but instead it sorts them as characters.
If the model's training data didn’t include examples of the implicit behavior,
but did contain many examples of how to sort numbers,
the model will incorrectly assume how it should work.
*/
const nums = [1, 2, 10, 20];
console.log(nums.sort());        // -> [1, 10, 2, 20]
console.log(nums.sort((a,b)=>a-b)); // -> [1, 2, 10, 20]
```

### Limited Context vs. Diffuse Context

Humans can freely explore memory, drawing on vast experiences and building a “diffuse context” that shifts as we reach new conclusions. This flexibility lets us evolve ideas dynamically.

LLMs with tools can mimic this to a degree, but they remain limited by context windows and a loss of quality as prompts grow larger.

Agents, however, can divide tasks, gather information from multiple sources, and consolidate results through an orchestrator. Yet, context limits still apply both to each task and to the orchestrator itself—plus the approach is much more costly in computational and financial terms.

This is why **design sprawl** across hundreds of files is harder for agents to reason about—they need to chase context just as humans do, but with stricter limits.

---

## Sketch of the New Code

### DRY Humans vs WET Machines

For agent-friendly code, **explicitness is essential**. That means using lower-level abstractions and minimizing reliance on closed libraries. Instead of importing entire frameworks, it’s often better to implement specific functionalities directly within the project.

For humans, **DRY (don’t repeat yourself)** is best practice. For agents, **WET (write everything twice)** can actually reduce error—since repetition keeps the relevant context local.

This way, the agent has an explicit definition of how each part works, along with its scope and limitations—reducing the need for searches in abstract documentation. In this sense, **the code becomes the documentation**.

### Some spaghetti is acceptable—if it’s short

Architectures with multiple layers (like MVVM) are painful for agents to navigate, since they require constant cross-file jumping. Keeping the core logic of a functionality in a single file makes it easier for agents to understand, modify, and extend.

Keeping related logic together, even if not perfectly abstracted, can be friendlier for agents than perfectly separated layers.

That said, a 10,000-line spaghetti file is unmanageable due to context constraints. **Balance is key.**

### Apps as collections of monolithic micro-functionalities

Applications must be designed from the bottom up:

- Start with each functionality in one or a few files.
- Then combine them as needed.
- Design the tools, then fill the toolbox.

--

This brings two major benefits:

- It maximizes the agent’s ability to generate and interact with code under the principles above.
- It makes these functionalities easier to transform into MCP server tools (or similar), allowing not only humans but also agents to use them.

```
Example: Ingest document functionality
 - `file_parser.py` – File parsing (PDF/HTML/Docx)
 - `text_segmenter.py` – Text cleanup & segmentation
 - `embedder.py` – Embedding & index write
 - `metadata_extractor.py` – Metadata extraction (title, authors, dates)
 - `audit_logger.py` – Audit log & error capture
 - `ingest_document.py` – Orchestrates all above in a single entry point
```

---

## Conclusion

- Given the clear trend toward digital assistants (already embedded in apps, browsers, and even operating systems), ensuring that applications are **usable by agents** will soon be a _sine qua non_ condition.

- In the new paradigm, the question "Will another developer understand this?" expands to "Will another developer with AI understand this?". The answer could push us toward more explicit, localized, and modular code than we've written before.

As developers, we always saw a tree whose trunk was the developer and the programming languages. Over time, thousands of branches—abstractions—expanded so far that they are now very distant from the original trunk.
Now we find ourselves with another tree, a new one, whose trunk is developer+AI and natural language + code.
There is the temptation to look for the old tree’s branches in the new one and think they can be transplanted just like that—an inertia that comes with changes.
The problem is that the new tree will have its own branches, and maybe it’s time to stop looking at what was and start seeing what will grow.
This is a sketch of the possible new tree, but it will surely change as we discover—or create—those new branches.
