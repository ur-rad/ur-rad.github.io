---
edition: "fss_2026"
title: "Manipulator URDF Bundles Across Simulators: A Preliminary Study of Their Sim-to-Sim and Real-to-Sim Visual Matching"
abstract: "The simulator is an important tool in robot learning, since training directly on real robots is costly and risky. An increasing number of robot learning frameworks use camera views as a system input. This raises a question of whether different simulators render the same robot in the same way. This work focuses on a sub-area: the rendering of Unified Robot Description Format (URDF) bundles of manipulators. URDF is a widely used format for defining robot structure and kinematics. This preliminary study investigates two questions: Q1 (Sim-to-Sim), do different simulators render the same manipulator URDF bundle in the same way, and Q2 (Real-to-Sim), given a real robot, can its corresponding URDF bundle be identified from its appearance. To study these questions, this work first constructs a canonical-view rendering dataset of 131 manipulator URDF bundles across MuJoCo and PyBullet. For Q1, this work compares six visual similarity methods across all 131 manipulator URDF bundles in the dataset. These methods range from pixel-level and classical feature-based approaches to pretrained image embedding models, including CLIP, I-JEPA, DINOv2, and SigLIP2. For Q2, a preliminary real-to-sim retrieval demonstration is presented to explore whether a real robot photo can be matched to its corresponding URDF bundle."
authors:
  - name: "Yue Cao"
    affiliationIndices: []
affiliations: []
publishDate: "2026-11-06T16:00:00-05:00"
draft: false
pdfUrl: "pdfs/fss_2026/manipulator-urdf-bundles-across-simulators.pdf"
---
