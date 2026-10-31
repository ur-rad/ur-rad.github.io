---
edition: "fss_2026"
title: "Continuous versus Discrete Tactile Representations for Vision-Language-Action Avocado Sorting"
abstract: "Vision-language-action (VLA) policies typically have no direct channel for non-visual physical properties, such as tactile ripeness: such evidence is either dropped entirely or folded into the policy as a discrete signal, a classifier output substituted into a text prompt. The latter reuses the language channel VLA models are pretrained on, but compresses a spatially structured deformation field into a low-bandwidth categorical cue represented by only a few language tokens. We investigate how the pathway used to incorporate tactile evidence affects contact-rich manipulation. Using robotic avocado ripeness sorting as a testbed, where tactile deformation cues are inaccessible to vision, we compare three conditions: a vision-only π0 baseline with no tactile signal, discrete text-prompt conditioning on a separately trained tactile classifier, and continuous fusion, where GelSight tactile images are encoded via a pretrained DINOv2 encoder and concatenated with visual embeddings prior to the π0 backbone, without added cross-modal attention. In a small-scale evaluation on 10 held-out avocados unseen during demonstration collection, with each specimen tested twice per method, continuous fusion reaches a 95% sorting success rate, versus 80% for discrete text-prompt conditioning and 70% with no tactile signal, at only 7.7% inference overhead over the vision-only baseline; the discrete classifier matches the specimen label in all 20 of its robot trials. The central observation is that even a correct tactile category can fail to control a pretrained action policy when communicated only through a prompt."
authors:
  - name: "Ran Yang"
    affiliationIndices: []
  - name: "Yuhao Lei"
    affiliationIndices: []
  - name: "Lihong Yang"
    affiliationIndices: []
  - name: "Yiming Feng"
    affiliationIndices: []
affiliations: []
publishDate: "2026-11-06T11:00:00-05:00"
draft: false
pdfUrl: "pdfs/fss_2026/continuous-discrete-tactile-vla-avocado-sorting.pdf"
---
