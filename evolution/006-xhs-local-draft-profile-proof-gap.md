# Evolution Note: XHS Local Draft Profile And Proof Gap

## Trigger

During the Layer 1 project introduction post run, the user could not see the saved draft in their current browser and later found that the latest tag revision was ambiguous. This exposed a gap between automation proof and human-visible platform state.

## Lesson

The existing Xiaohongshu knowledge base correctly captured `human_review_then_draft`, risk gates, and account-state gates, but it under-specified the execution runbook:

- Xiaohongshu web drafts are browser-local.
- Automation browser profiles and user-facing browser profiles may have different draft boxes.
- A draft save proof must prove a saved draft, not only a filled editor.
- Body hashtags and platform-suggested topic chips must be verified separately.
- The browser should stay open after handoff so the reviewer can inspect the result.

## Workflow Change Needed

Future draft or publish runs should add an execution proof stage after platform handoff:

1. Record the non-sensitive browser profile class used for handoff.
2. Keep the browser open after action completion.
3. Verify the draft box contains the target title and a fresh save timestamp.
4. Open or preview the latest draft when body-level fields such as hashtags changed.
5. Record whether the user-visible browser profile is the same as the automation profile.
6. If the profiles differ, explicitly tell the reviewer where the draft can be seen.

## Promotion Impact

This event is failure and evolution evidence only. It does not create a new verified recipe. The current verified Xiaohongshu recipe remains scoped to the previously proven draft run until a new run satisfies the stronger profile and saved-content proof contract.
