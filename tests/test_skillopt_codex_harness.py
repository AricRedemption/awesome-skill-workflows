from __future__ import annotations

import unittest

from skillopt.model.codex_harness import (
    _openai_chat_config,
    _expected_answers_for_variant,
    _is_retryable_transport_error,
    _match_mode_for_variant,
    _normalize_openai_base_url,
    _read_sse_completion_text,
    build_searchqa_prompt,
    credential_status,
    score_agent_answer,
    select_backend,
)


class CodexHarnessTests(unittest.TestCase):
    def test_normalize_openai_base_url_adds_v1_for_root_path(self) -> None:
        self.assertEqual(_normalize_openai_base_url("https://api.example.com"), "https://api.example.com/v1")
        self.assertEqual(_normalize_openai_base_url("https://api.example.com/"), "https://api.example.com/v1")

    def test_normalize_openai_base_url_keeps_existing_v1(self) -> None:
        self.assertEqual(_normalize_openai_base_url("https://api.example.com/v1"), "https://api.example.com/v1")

    def test_openai_chat_config_accepts_openai_compatible_key_formats(self) -> None:
        config = _openai_chat_config(
            {
                "OPENAI_API_KEY": "miromind_live_token_123",
                "OPENAI_BASE_URL": "https://api.example.com",
            }
        )
        self.assertEqual(config["api_key"], "miromind_live_token_123")
        self.assertEqual(config["base_url"], "https://api.example.com/v1")

    def test_read_sse_completion_text_joins_content_chunks(self) -> None:
        raw_text = "\n".join(
            [
                'data: {"choices":[{"delta":{"role":"assistant"}}]}',
                'data: {"choices":[{"delta":{"content":"best"}}]}',
                'data: {"choices":[{"delta":{"content":"_skill.md"}}]}',
                "data: [DONE]",
            ]
        )
        self.assertEqual(_read_sse_completion_text(raw_text), "best_skill.md")

    def test_score_agent_answer_normalizes_case_and_spacing(self) -> None:
        self.assertTrue(score_agent_answer("  The target model and execution harness remain fixed. ", ["the target model and execution harness"]))
        self.assertFalse(score_agent_answer("something else", ["the target model and execution harness"]))

    def test_score_agent_answer_supports_exact_mode(self) -> None:
        self.assertTrue(score_agent_answer("EVAL_DESIGN_GAP", ["EVAL_DESIGN_GAP"], match_mode="exact"))
        self.assertFalse(score_agent_answer("The answer is EVAL_DESIGN_GAP", ["EVAL_DESIGN_GAP"], match_mode="exact"))

    def test_build_searchqa_prompt_allows_variant_instruction(self) -> None:
        item = {"question": "Q?", "context": "C."}
        prompt = build_searchqa_prompt(item, "Return only the exact code.")
        self.assertIn("Return only the exact code.", prompt)

    def test_variant_specific_expected_answers_override_default_answers(self) -> None:
        item = {
            "id": "xhs-val-001",
            "answers": ["SELECTION_GATE_PRESENT"],
            "expected_answers_by_variant": {
                "baseline": ["SELECTION_GATE_MISSING"],
                "candidate": ["SELECTION_GATE_PRESENT"],
            },
        }
        self.assertEqual(
            _expected_answers_for_variant(item, {"label": "baseline"}),
            ["SELECTION_GATE_MISSING"],
        )
        self.assertEqual(
            _expected_answers_for_variant(item, {"label": "candidate"}),
            ["SELECTION_GATE_PRESENT"],
        )

    def test_variant_specific_match_mode_falls_back_to_item_default(self) -> None:
        item = {
            "match_mode": "exact",
            "match_mode_by_variant": {
                "baseline": "contains",
            },
        }
        self.assertEqual(_match_mode_for_variant(item, {"label": "baseline"}), "contains")
        self.assertEqual(_match_mode_for_variant(item, {"label": "candidate"}), "exact")

    def test_credential_status_only_marks_executable_backends_as_available(self) -> None:
        status = credential_status(
            {
                "OPENAI_API_KEY": "",
                "ANTHROPIC_API_KEY": "anthropic-key",
                "QWEN_CHAT_BASE_URL": "",
                "QWEN_CHAT_MODEL": "",
                "AZURE_OPENAI_ENDPOINT": "",
                "AZURE_OPENAI_API_KEY": "",
                "AZURE_OPENAI_AUTH_MODE": "",
            }
        )
        self.assertEqual(status["observed_backends"], ["claude_chat"])
        self.assertEqual(status["available_backends"], [])
        self.assertFalse(status["ready_for_training"])

    def test_select_backend_fast_fails_when_only_unsupported_backend_is_configured(self) -> None:
        backend = select_backend(
            {
                "OPENAI_API_KEY": "",
                "ANTHROPIC_API_KEY": "anthropic-key",
                "QWEN_CHAT_BASE_URL": "",
                "QWEN_CHAT_MODEL": "",
                "AZURE_OPENAI_ENDPOINT": "",
                "AZURE_OPENAI_API_KEY": "",
                "AZURE_OPENAI_AUTH_MODE": "",
            }
        )
        self.assertEqual(backend, "local_stub")

    def test_retryable_transport_error_detects_transient_ssl_eof(self) -> None:
        self.assertTrue(
            _is_retryable_transport_error("[SSL: UNEXPECTED_EOF_WHILE_READING] EOF occurred in violation of protocol")
        )
        self.assertFalse(_is_retryable_transport_error("Name or service not known"))


if __name__ == "__main__":
    unittest.main()
