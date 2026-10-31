---
edition: "fss_2026"
title: "Action Success Is Not Task Success: Deterministic Robot-Profile Binding and Replayable Contract Monitoring"
abstract: "Robot actions can terminate successfully without establishing the task condition that motivated them. We introduce an auditable deployment boundary that binds an environment-specific task to exactly one compatible robot-profile implementation and evaluates its operationally supported grounded conditions using separate executor-status and predicate events. Capability-parameterized task contracts separate ordered task steps, capability clauses, implementation requirements, and robot-profile facts. Our exactly-one binder rejects missing, ambiguous, and morphology-incompatible realizations and emits normalized diagnostics or a canonical binding record. Runtime monitoring consumes a sequence-ordered, Robot Operating System (ROS)-message-independent contract trace; an ACTION_STATUS=SUCCESS event determines when a postcondition is checked but does not establish the postcondition’s truth. Across all four permutations of the two tested implementation-list fields, the accepted fixture produced byte-identical canonical binding records and the ambiguous fixture produced byte-identical diagnostic payloads, while source-byte provenance hashes differed as expected. Six nominal controlled traces remained conformant. Across six real evidence-suppression executions and twelve offline trace mutations, all 18 non-nominal cases produced the expected first direct violation, and the observed joint outcome of the three evaluators matched the prespecified tuple in 24/24 cases. Streaming and replay agreed in 12/12 controlled cases and, after deterministic migration, in 38/38 replay-eligible route-complete Benchmark for Autonomous Robot Navigation (BARN) cases. In a bounded two-world BARN study, 38/40 scenarios completed with their expected outcome. A missing postcondition means task success is unestablished; it does not necessarily prove that the physical effect is false."
authors:
  - name: "Feeza Khan Khanzada"
    affiliationIndices: []
  - name: "Jaerock Kwon"
    affiliationIndices: []
affiliations: []
publishDate: "2026-11-06T16:00:00-05:00"
draft: false
pdfUrl: "pdfs/fss_2026/action-success-not-task-success.pdf"
---
