---
edition: "fss_2026"
title: "Extracting Implicit Procedural Knowledge: Partial-Order Structure in LLM Representations"
abstract: "Collaborative robots need explicit representations of human plans that accommodate behavioral variability. Partially ordered plans (POPs) provide this flexibility by encoding necessary action-ordering constraints while leaving independent actions unordered, but constructing them typically requires domain knowledge or task-specific data. LLMs may instead contain implicit procedural models learned from human-generated text, raising a central question: can we elicit these internal representations to recover external, symbolic models of human plans? We investigate whether pairwise ordering relations are linearly accessible in the hidden states of Mistral-7B-Instruct-v0.1. Using human-annotated POPs from ProScript, we train two linear probes to identify whether one action in a model of a human plan should directly precede another and whether any direct ordering constraint exists between a pair. Both properties are significantly decodable, achieving best-layer development AUCs of 0.900 and 0.869. On held-out plans, the probes also outperform the LLM’s explicit judgments of the same relations by 0.16 and 0.11 F1, respectively. These findings provide initial evidence that procedural relations relevant to explicit human-plan representations are linearly accessible in LLM hidden states, opening a path from learned foundation-model representations to flexible, interpretable task models for collaborative robots."
authors:
  - name: "Mark Martirosian"
    affiliationIndices: []
  - name: "Sveta Paster"
    affiliationIndices: []
  - name: "Reuth Mirsky"
    affiliationIndices: []
affiliations: []
publishDate: "2026-11-06T11:00:00-05:00"
draft: false
pdfUrl: "pdfs/fss_2026/extracting-implicit-procedural-knowledge-llm.pdf"
---
