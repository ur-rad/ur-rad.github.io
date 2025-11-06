---
title: "LiMPNet: Lightweight Multi-sensor Perception and DRL Navigation for Tiny Drones in Mapless Environments"
abstract: "Autonomous tiny drones face significant challenges in navigation due to strict constraints on size, weight, power, and onboard computational capacity. This paper presents a lightweight navigation framework that integrates basic multisensor perception with deep reinforcement learning (DRL) to enable safe, mapless flight in cluttered environments. We employ the Crazyflie 2.1 nano-drone, equipped with a grayscale camera and a multi-ranger deck, a laser-based distance sensor, for real-time obstacle detection and avoidance. A Proximal Policy Optimization (PPO) agent is trained within a ROS and Gazebo simulation environment to generate collision-free trajectories using fused visual and range data. The system is evaluated in two environments: a simple obstacle field, where the drone achieves a 100% success rate (112/112 episodes), and a densely cluttered map, where it reaches the target in 35% of trials (7/20). These results demonstrate that effective autonomous navigation is achievable using minimal sensing and low-computation models, making it well-suited for resource-constrained aerial platforms."
authors:
  - name: "Omer Kurkutlu"
    affiliationIndices: [0]
  - name: "Arman Roohi"
    affiliationIndices: [0]
affiliations:
  - "University of Illinois Chicago"
tags: ["drones", "reinforcement-learning", "navigation", "sensors"]
publishDate: "2025-11-06T11:00:00Z"
draft: false
pdfUrl: "https://drive.google.com/file/d/1cU246SMvDQ8XKFyeM1m6voHTrY1osgbi/view?usp=share_link"
---
