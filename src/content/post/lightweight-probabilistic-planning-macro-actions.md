---
title: "Lightweight Probabilistic Planning with Macro Actions"
abstract: "In assigning task goals to a robot, the locations of objects relevant to these goals may not be known beforehand. Off-the-shelf probabilistic planning approaches can then be used to generate a policy for achieving these goals. If these approaches are run online, the robot can continuously plan and re-plan during the execution of its task. Unfortunately, online probabilistic planning requires substantial compute resources like time and memory. In cases where the planner must run onboard a consumer robot (e.g., in a household) or in isolated environments (e.g., onboard a ship), the robot may lack sufficient compute resources for online probabilistic planning, thereby necessitating the development of more lightweight solutions. In this paper, we describe our in-progress research on PUMA, a lightweight variant of the PO-UCT probabilistic planning algorithm that modifies the PO-UCT search tree representation to include macro actions. Macro actions compress deterministic branches of the search tree, which speed up search, though at the expense of the algorithm’s ability to guarantee convergence to an optimal solution."
authors:
  - name: "Evan Conway"
    affiliationIndices: []
  - name: "David Porfirio"
    affiliationIndices: [0]
  - name: "David Chan"
    affiliationIndices: []
  - name: "Mark Roberts"
    affiliationIndices: [0]
  - name: "Laura Hiatt"
    affiliationIndices: [0]
affiliations:
  - "U.S. Naval Research Laboratory"
tags: ["probabilistic-planning", "macro-actions", "hierarchical-planning", "robotics", "computational-efficiency", "uncertainty", "decision-making", "ai-planning"]
publishDate: "2024-11-08T11:00:00Z"
draft: false
pdfUrl: "https://drive.google.com/file/d/1-35bt5P-h9Pvh_9CzeHu-eSHzzf4WLv9/view"
---
