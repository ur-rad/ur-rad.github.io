---
edition: "fss_2026"
title: "OIL: An Object Interaction Layer for Humanoid Whole-Body Control"
abstract: "Recent progress in learned whole-body controllers for humanoid robots has enabled robust free-space motion by tracking kinematic targets such as joint or end-effector trajectories. This interface provides a useful abstraction for upstream systems, including motion capture, teleoperation, or generative models, which can specify desired motion without reasoning about forces or balance. However, this abstraction has largely been limited to robot motion, requiring task-specific controllers or retraining for object interaction. We introduce OIL, an Object Interaction Layer that extends the kinematic command interface of whole-body control to include desired object motion and contact. OIL augments a standard controller with object-centric commands and translates them into coordinated whole-body behavior while preserving locomotion and balance. This design enables a single learned policy to execute non-prehensile interactions, including pushing, pulling, two-arm pick-and-place, and locomotion-coupled transport, directly from object-level kinematic targets without task-specific retraining. In simulation, we demonstrate that object-level commands improve performance over robot-centric controllers while matching task-specific policies across variations in object properties such as mass and size. We further demonstrate zero-shot generalization to novel behavior combinations and sim-to-real transfer on the Digit humanoid robot."
authors:
  - name: "Pranay Dugar"
    affiliationIndices: []
  - name: "Mohitvishnu S. Gadde"
    affiliationIndices: []
  - name: "Rajesh Mangannavar"
    affiliationIndices: []
  - name: "Aayam Shrestha"
    affiliationIndices: []
  - name: "Alan Fern"
    affiliationIndices: []
affiliations: []
publishDate: "2026-11-06T16:00:00-05:00"
draft: false
pdfUrl: "pdfs/fss_2026/oil-object-interaction-layer-humanoid.pdf"
---
