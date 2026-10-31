---
edition: "fss_2026"
title: "Engagement-Aware Agentic Pursuit-Evasion"
abstract: "This paper presents a hierarchical multi-agent architecture in which large language model (LLM) agents perform strategic role assignment for both attacking and defending robot teams, decoupled from low-level control execution. At each planning cycle, an LLM agent observes its own team in full but the opposing team only within its robots’ combined field of view, then assigns each robot a tactical role – e.g., hold a perimeter, neutralize an intruder on contact, or converge with teammates to capture one at range – each with a natural-language justification, yielding an auditable reasoning trail. Each robot then executes its role via its own receding-horizon model predictive control controller, made collision-free by a discrete-time control barrier function filter that preserves the underlying model predictive control’s convexity. Differentiated neutralize/capture incentives force the defending planner to weigh resource allocation under this same partial observability. Simulated experiments across variable-sized adversary teams show collective team behavior can be steered purely through high-level LLM strategy, without changes to the underlying control logic."
authors:
  - name: "Ananya Acharya"
    affiliationIndices: []
  - name: "Trenton Goyette"
    affiliationIndices: []
  - name: "Masoud Ataei"
    affiliationIndices: []
  - name: "Adrian Stoica"
    affiliationIndices: []
  - name: "Vikas Dhiman"
    affiliationIndices: []
  - name: "Mohammad Javad Khojasteh"
    affiliationIndices: []
affiliations: []
publishDate: "2026-11-06T11:00:00-05:00"
draft: false
pdfUrl: "pdfs/fss_2026/engagement-aware-agentic-pursuit-evasion.pdf"
---
