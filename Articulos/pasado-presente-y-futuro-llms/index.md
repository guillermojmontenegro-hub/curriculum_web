---
title: "Pasado, presente y futuro -> LLMs"
date: "2026-04-08"
description: "Una forma práctica de mirar la evolución de los LLMs open weight: desde LLaMA 1 hasta Qwen3, GLM-4.7 y Gemma 3 27B."
author: "gmontenegro"
previewImageUrl: "preview.png"
---

# Pasado, presente y futuro -> LLMs

## Introducción

El problema de analizar la evolución en la calidad de los LLMs (Large Language Models) mirando solo a los modelos state-of-the-art es que hay muchas variables ocultas. En la mayoría de los casos desconocemos el tamaño del modelo (parámetros), la arquitectura, el hardware en el que corren y las optimizaciones que implementaron. Y aún en los casos donde las conocemos, no podemos replicarlas o compararlas.

Por suerte tenemos modelos open weight y open source que fueron evolucionando siguiendo de cerca a los modelos state-of-the-art, pero en este caso tenemos control total de las pruebas: podemos ejecutarlos en el mismo hardware y jugar con los metaparámetros, los mensajes de sistema y la estructura de contexto, por lo que podemos "medir" la calidad de las respuestas.
Obviamente es una medición subjetiva, pero cuando se prueban muchos y se ve el paso del tiempo, el cambio es obvio.

Vamos a hacer un recorrido desde el inicio, pasando por algunos modelos que marcaron hitos, ver los avances, los límites que todavía no se pueden superar e imaginar hacia dónde va esto.
---

## Primeros pasos: cuando los modelos no hacían nada útil, pero eran juguetes divertidos (aprox. 2023)

El primer gran punto de inflexión fue **LLaMA 1**, publicado por Meta en febrero de 2023.  

### Qué ofrecía LLaMA 1 (Vicuña y otros fine-tunes)

- Familia de tamaños: **7B, 13B, 33B y 65B**.
- Ventana de contexto típica: **2048 tokens**.

Visto desde hoy, el contexto de 2048 tokens era extremadamente corto.
No alcanzaba para conversaciones largas, ni para flujos de trabajo complejos, ni mucho menos para agentes que necesitaban cargar instrucciones largas, herramientas, historial y documentos.

La única forma de usarlos en esa época era a través de código en Python con Hugging Face Transformers. En una PC de escritorio con GPU no generaban más que unos pocos tokens por segundo, incluso en el modelo más chico (7B).

En ese período, la vara también era distinta. No esperábamos que el modelo planificara una sesión de trabajo de varios pasos o que respetara un esquema complejo de tool-calling. Muchas veces alcanzaba con que:

- no alucinara demasiado,
- escribiera texto coherente,
- siguiera instrucciones simples,
- y no se rompiera en tareas estructuradas muy básicas.

### Tests de aquella época

Una buena forma de recordar el pasado es mirar los tests caseros que hacíamos entonces para comparar qué modelo, o qué fine-tune, era mejor que otro.
No eran pruebas sofisticadas. Eran cosas simples, precisamente porque muchos modelos fallaban ahí.

Ejemplo típico:

```text
Prompt:
Devuelve un JSON válido con dos campos:
{
  "name": string,
  "age": number
}
Usa como ejemplo name="Ana" y age=30.
No agregues texto extra.
```

La tasa de errores en estos modelos era alta hasta en ejemplos simples. Recuerdo tratar de usar OpenInterpreter con modelos como estos y nunca vi que pudiera realizar una llamada correcta a una herramienta.
Hoy ese test parece trivial, pero para esos modelos era un dolor de cabeza.


---

## Llama 2: Quantización, contextos más largos, primeras respuestas estructuradas "casi" consistentes (aprox. 2023-2024)

Si hay una tecnología que empujó la adopción real de los open models, esa fue la **quantización**.

El primer formato de quantización popular fue GGML, pero en un principio este formato requería que el modelo entrara entero en la memoria de la GPU, lo que era una limitación para la mayoría de las configuraciones. No fue hasta que apareció el formato GGUF en `llama.cpp` que la quantización pudo ser usada por todos, porque este formato permitía dividir las tareas entre GPU y CPU.

La idea general es conocida: representar los pesos en menos bits para reducir:

- uso de VRAM,
- ancho de banda de memoria,
- y a veces también latencia.

Pero el impacto histórico de la quantización fue más profundo que un simple ahorro de memoria.

### Qué cambió con la quantización

1. **Hizo posible probar modelos grandes en hardware común.**
2. **Volvió razonable comparar calidad contra costo.**
3. **Mostró que muchos modelos toleraban bien pérdidas moderadas de precisión.**
4. **Convirtió la inferencia local en una práctica real y no solo experimental.**

El mismo hardware que solo podía generar con un modelo de 7B parámetros de pronto era capaz de usar modelos de 13B o hasta de 30B cuantizados en 4 bits a una tasa de tokens por segundo similar a la del modelo 7B sin cuantizar.

Los modelos fueron avanzando también y teníamos Llama 2, que ya contaba con 4096 tokens de contexto, lo que permitía algunas tareas un poco más complejas. Era posible usarlos para traducciones, correcciones o reescrituras de textos cortos.

El salto de Llama 1 7B a Llama 2 13B-33B en el mismo hardware, gracias a la quantización, fue un salto de calidad con una velocidad de generación similar en algunas configuraciones.
Los tests de esta época ya incluían acertijos o pruebas de inteligencia espacial. Uno común era:
"Una persona pone una pelotita en una taza, pone la taza boca abajo sobre una mesa, toma la taza y la pone en el microondas. ¿Dónde quedó la pelotita?"
Estos modelos podían formatear un JSON simple, pero casi ninguno daba con la respuesta de que la pelotita quedaba en la mesa.
---

## Mixtral: MoE y un poco más de contexto (aprox. 2024)

Otro gran salto fue **MoE: Mixture of Experts**.

Durante bastante tiempo, la intuición dominante era simple: más parámetros totales implicaban más costo y más lentitud.
MoE rompió esa lectura lineal dividiendo el modelo en un grupo de "expertos". Durante la inferencia, en lugar de pasar por todos los parámetros, pasa por un subgrupo de estos expertos, con lo que tiene la capacidad de aprender como un modelo más grande, pero con la velocidad de inferencia de uno más pequeño.

Si bien la idea de MoE no era nueva, fue Mixtral el primer modelo popular en usarla. Mixtral era 8x7B, lo que significaba que tenía 8 expertos de 7B cada uno. En total tenía 47B de parámetros, pero solo 13B activos en cada generación, lo que permitió tener un modelo más grande, pero con la velocidad de un 13B.

Mixtral tenía un contexto de 32K tokens y un sistema de sliding window attention. Este mecanismo es una optimización sobre la atención original que impacta positivamente en la velocidad, pero negativamente en la calidad. A medida que avanzaba en el contexto se olvidaba de más detalles.

Mixtral fue el primero del que recuerdo que podía escribir funciones simples en Python o JS de forma consistente.

Los tests de esta época eran pedirle que generara pequeños bloques de código o que ejecutara herramientas. Estaban lejos de ser perfectos, pero ya eran capaces de resolver estas tareas.

---

## Qwen, GLM, Gemma, Nemotron, GPT-OSS y compañía (aprox. 2025-2026)
Ya vimos suficiente del pasado; es momento de llegar a la actualidad.

En el presente de los open weight models ya no se entiende bien con la foto mental de “un 7B denso que responde texto”.  
La conversación actual se parece más a esto:

- modelos híbridos o MoE,
- contextos de hasta 256K tokens,
- mejor tool-calling,
- más control estructural,
- mejor calidad por parámetro activo,
- y cuantizaciones oficiales o muy maduras.

Algunos de estos modelos tienen una velocidad de generación, en el mismo hardware, varias veces superior a lo que se lograba con LLaMA 1. El tamaño de contexto creció 100X, pero gracias a otras optimizaciones, como la quantización de la KV cache, requieren menos memoria que Llama 2 70B y los resultados están al nivel de algunos modelos state-of-the-art.
Estos modelos cumplen con toda funcionalidad básica, por lo que los tests ya no tienen mucho sentido, pero tienen un talón de Aquiles: las optimizaciones en los mecanismos de atención hacen que el contexto solo sea útil hasta un determinado límite, que suele ser bajo con respecto a Claude Opus 4.6 o similares. Pasado eso empiezan a mostrar problemas de memoria y olvidan detalles del contexto.
El peor en este área es GPT-OSS, donde el de 120B (increíblemente grande comparado con los primeros) apenas funciona en arneses como OpenCode o Claude Code, mostrando problemas cerca de los 20K tokens. Los mejores por ahora en esta área son GLM 4.7 Flash y Qwen 3.5 35B A3B, que pueden realizar tareas de agentes sin problemas hasta los 64K tokens.

La mejor forma de testearlos es dentro de arneses usando Tools, Skills, MCP, agentes y subagentes.
Si las tareas no son muy largas, son perfectamente útiles. De hecho uso OpenCode con GLM 4.7 Flash para hacer el mantenimiento de un home lab y cumple con las tareas sin problemas.
Una consideración importante es no agregar herramientas que no se van a usar, o bien usar un gateway de tools y MCP, y optimizar los skills para que sean lo más cortos posibles.


### Cuadro comparativo

| Modelo | Etapa aproximada | Tipo | Parámetros totales | Parámetros activos | Contexto oficial | Contexto práctico para agentes | Rasgo fuerte |
| ------ | ---------------- | ---- | ------------------ | ------------------ | ---------------- | ------------------------------ | ------------ |
| **LLaMA 1 7B** | 2023 | Denso | 7B | 7B | 2K | Muy limitado | Inicio de la era open weight moderna |
| **Llama 2 13B / 33B** | 2023-2024 | Denso | 13B / 33B | 13B / 33B | 4K | Bajo | Cuantización masiva y primeras tareas útiles |
| **Mixtral 8x7B** | 2024 | MoE | 47B | 13B | 32K | Medio, con degradación notable | Primer MoE popular realmente útil |
| **Qwen 3.5 35B A3B** | 2025-2026 | MoE | 35B | 3B | 256K | Bueno hasta ~64K | Excelente relación calidad / costo activo |
| **GLM-4.7 Flash** | 2025-2026 | MoE | 30B | 3B | 128K+ | Bueno hasta ~64K | Tool use, coding y tareas multi-step |
| **Gemma 3 27B** | 2025-2026 | Denso | 27B | 27B | 128K | Bueno en tareas largas, con caída después | Muy buen equilibrio entre calidad y despliegue local |
| **GPT-OSS 120B** | 2025-2026 | MoE | 120B | ~5B activos | 128K | Flojo para agentes largos, problemas cerca de ~20K | Mucha capacidad total, pero atención frágil en uso agentic |

---

## Futuro: el cuello de botella no es solo el tamaño, es la atención (aprox. 2026 en adelante)

El mayor problema para usar estos modelos dentro de **agentes reales** no es solamente la cantidad de parámetros.  
El problema más profundo sigue siendo el **mecanismo de atención**.

La atención completa es cara en cómputo y en memoria.  
A medida que crece el contexto, el costo se vuelve muy difícil de sostener. Por eso aparecen distintas estrategias para abaratar:

- sliding window attention,
- attention local con capas globales intercaladas,
- compresión de KV cache,
- variantes lineales o semilineales,
- sparsity,
- y varios trucos de extensión por RoPE o interpolación.

Todas estas técnicas son útiles.  
Pero el problema es que el “contexto largo” termina siendo más **nominal** que **efectivamente usable**.

### El límite práctico en agentes

En tareas agentic largas, no basta con que el modelo acepte 128K o 256K tokens en la ficha técnica.  
Lo importante es cuánto de ese contexto sigue siendo **operativamente confiable**.

La forma más clara de verlo no suele ser en una respuesta de chat normal, sino en algo más exigente:

- tools definidas en el system prompt,
- esquemas JSON precisos,
- secuencias multi-step,
- y memoria de restricciones establecidas muchos miles de tokens atrás.

Cuando el contexto se vuelve demasiado largo, el modelo puede:

- olvidar una herramienta definida al comienzo,
- invocar una con argumentos incompletos,
- mezclar dos esquemas distintos,
- o responder en lenguaje natural cuando debía ejecutar una llamada estructurada.

Ese tipo de error es mucho más grave para un agente que para un chatbot.  
Un chatbot puede “sonar razonable” aunque se haya degradado.  
Un agente deja de ser útil en el momento en que falla una invocación.

### Qué espero del futuro

El futuro de los open weight LLMs para agentes probablemente no dependa solo de hacerlos más grandes.  
Dependerá de resolver mejor alguno de estos frentes:

- **atención larga realmente usable**, no solo publicitada,
- **mejor manejo de memoria operativa** en contextos extensos,
- **tool-calling más robusto bajo saturación de contexto**,

Mi impresión es que el siguiente gran salto no será simplemente “otro modelo con más benchmark score”.  
Será un modelo o una arquitectura capaz de sostener durante mucho más tiempo:

- instrucciones,
- herramientas,
- objetivos intermedios,
- resultados previos,
- y consistencia estructural.

Es decir: no solo más inteligencia medida en tests, sino más **estabilidad operativa**.

---

## Conclusión

A pesar que en varias ocaciones parecía que la evolución se había detenido por el tiempo de salto entre versiones de modelos provistas por las empresas importantes por detrás seguía una evolución invisible que no se detuvo en ningún momento

En el pasado celebrábamos que un modelo no rompiera un JSON simple.  
En el presente discutimos cuantización, parámetros activos, throughput, ventanas de 128K y tool-calling.  
En el futuro, la pregunta central no será únicamente cuán bueno es un modelo, sino cuánto contexto puede usar sin dejar de ser confiable como agente.

Y probablemente ese sea el verdadero criterio para medir la próxima etapa.

## Referencias

- Meta AI, _LLaMA: Open and Efficient Foundation Language Models_ (2023): https://arxiv.org/abs/2302.13971
- Qwen Team, _Qwen3: Think Deeper, Act Faster_ (2025): https://qwenlm.github.io/blog/qwen3/
- Z.ai, _GLM-4.7-Flash model card_ (consultado el 8 de abril de 2026): https://huggingface.co/zai-org/GLM-4.7-Flash
- Google, _Introducing Gemma 3_ (12 de marzo de 2025): https://blog.google/innovation-and-ai/technology/developers-tools/gemma-3/
