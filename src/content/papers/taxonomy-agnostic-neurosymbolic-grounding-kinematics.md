---
edition: "fss_2026"
title: "Taxonomy-Agnostic Neurosymbolic Grounding of Robot Kinematics"
abstract: "While symbolic reasoning for task allocation requires grounding a robot’s physical capabilities, standard Unified Robot Description Format (URDF) files provide only low-level kinematics without the formal semantic context needed for reasoning. We present URDF2Ontology, an automated, taxonomy-agnostic neurosymbolic framework that transforms raw URDF files into populated, grounded OWL ontologies. It leverages a Large Language Model (LLM) for targeted semantic reasoning, coupled with an iterative sequential graph-purging mechanism to prevent context window saturation. To process complex kinematic structures, it employs a morphology-aware dual-track architecture featuring a bottom-up Tree Track for branching assemblies and a top-down Chain Track for serial limbs. Guided by neurosymbolic guardrails, the framework extracts functional subgraphs and asserts populated ontologies aligned with arbitrary user-provided taxonomies. Empirical evaluation across a diverse fleet of heterogeneous robots demonstrates strong schema alignment, valid structural extraction, and a significant reduction in manual domain authoring overhead."
authors:
  - name: "Bastien Dussard"
    affiliationIndices: []
  - name: "Aurélie Clodic"
    affiliationIndices: []
  - name: "Guillaume Sarthou"
    affiliationIndices: []
affiliations: []
publishDate: "2026-11-05T16:00:00-05:00"
draft: false
pdfUrl: "pdfs/fss_2026/taxonomy-agnostic-neurosymbolic-grounding-kinematics.pdf"
---
