---
name: ra-tarot-archetypen
description: Look up information about the 22 archetypes of the Ra Material tarot system. Use when the user asks about tarot, archetypes, Matrix des Geistes, Potenziator, Katalyst, or any of the 22 major arcana according to Ra.
metadata:
  homepage: https://ganzwachsen.de
---

# Ra Tarot Archetypen

## Instructions

Call the `run_js` tool with the following exact parameters:
- data: A JSON string with the following fields:
  - category: String. One of: "archetype", "triad", "dimension", "meta"
  - key: String. The lookup key.

Use these keys based on the user question:

For single archetypes (category: "archetype"):
- "01-matrix-mind", "02-potentiator-mind", "03-catalyst-mind", "04-experience-mind", "05-significator-mind", "06-transformation-mind", "07-great-way-mind"
- "08-matrix-body", "09-potentiator-body", "10-catalyst-body", "11-experience-body", "12-significator-body", "13-transformation-body", "14-great-way-body"
- "15-matrix-spirit", "16-potentiator-spirit", "17-catalyst-spirit", "18-experience-spirit", "19-significator-spirit", "20-transformation-spirit", "21-great-way-spirit"
- "22-the-choice"

For comparing archetypes across mind/body/spirit (category: "triad"):
- "matrix", "potentiator", "catalyst", "experience", "significator", "transformation", "great-way"

For all archetypes of one dimension (category: "dimension"):
- "mind", "body", "spirit"

For guides and background (category: "meta"):
- "study-path", "practical-guide", "why-archetypes", "visualization-and-embodiment-howto"

Respond in German. The Ra Tarot is a tool for self-knowledge, not fortune telling.
