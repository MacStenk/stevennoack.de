---
title: "Locked Content Test"
slug: locked-content-test
description: "Testartikel für passwortgeschützte Markdown-Blöcke (:::lock)."
category: test
date: 2026-02-01
author: Steven Noack
status: draft
---

## Öffentlich

Dieser Abschnitt ist öffentlich sichtbar.

:::lock{id="test"}
## Geheimer Abschnitt

Dieser Text ist nur mit Passwort sichtbar.

- Punkt A
- Punkt B

`console.log('secret');`
:::

## Ende

Das war der Test.
