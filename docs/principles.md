# Principles

1. Do not hard-code the base architecture to Xiaohongshu.
   The scenario is a validation target, not the system identity.

2. High-risk operations require human review.
   Publishing, account actions, or any irreversible step must not be fully autonomous.

3. Do not build fully automated account farming.
   This project is about workflow intelligence, not growth hacking automation.

4. Do not do large-scale social media scraping.
   Discovery and validation must stay within safe, limited, and reviewable boundaries.

5. All successful and failed experience must be written into the workflow knowledge base.
   The system only improves if outcomes are captured and reused.

6. Successful experience is reusable only when its environment was confirmed.
   Record the minimum environment precheck that made the run executable before
   promoting the lesson as a reusable pattern.

7. Action fact and action compliance proof are different things.
   Layer 1 must keep "the action happened" separate from "the action was
   approved and verified" so scenario evidence does not leak into global rules.
