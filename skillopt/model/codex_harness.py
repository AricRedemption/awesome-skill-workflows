from __future__ import annotations

import json
import os
import time
import urllib.error
import urllib.request
from urllib.parse import urlparse
from typing import Any, Callable


def _read_value(source: Any, key: str) -> str:
    if source is None:
        return ""
    if hasattr(source, "get"):
        return str(source.get(key, "") or "")
    return str(getattr(source, key, "") or "")


def _resolve_value(source: Any, key: str) -> str:
    value = _read_value(source, key)
    if value:
        return value
    return str(os.environ.get(key, "") or "")


def credential_status(env: Any | None = None) -> dict[str, object]:
    source = env if env is not None else os.environ
    keys = [
        "AZURE_OPENAI_ENDPOINT",
        "AZURE_OPENAI_API_KEY",
        "AZURE_OPENAI_AUTH_MODE",
        "OPENAI_BASE_URL",
        "OPENAI_API_KEY",
        "ANTHROPIC_BASE_URL",
        "ANTHROPIC_API_KEY",
        "QWEN_CHAT_BASE_URL",
        "QWEN_CHAT_MODEL",
    ]
    presence = {key: bool(_read_value(source, key)) for key in keys}
    available_backends: list[str] = []
    if presence["AZURE_OPENAI_ENDPOINT"] and (
        presence["AZURE_OPENAI_API_KEY"] or presence["AZURE_OPENAI_AUTH_MODE"]
    ):
        available_backends.append("azure_openai")
    if presence["OPENAI_API_KEY"]:
        available_backends.append("openai_chat")
    if presence["ANTHROPIC_API_KEY"]:
        available_backends.append("claude_chat")
    if presence["QWEN_CHAT_BASE_URL"] and presence["QWEN_CHAT_MODEL"]:
        available_backends.append("qwen_chat")
    return {
        "safe_env_presence": presence,
        "available_backends": available_backends,
        "ready_for_training": bool(available_backends),
    }


def select_backend(args: Any) -> str:
    if _resolve_value(args, "openai_api_key") or _resolve_value(args, "OPENAI_API_KEY"):
        return "openai_chat"
    if _resolve_value(args, "anthropic_api_key") or _resolve_value(args, "ANTHROPIC_API_KEY"):
        return "claude_chat"
    if (_resolve_value(args, "qwen_chat_base_url") or _resolve_value(args, "QWEN_CHAT_BASE_URL")) and (
        _resolve_value(args, "qwen_chat_model") or _resolve_value(args, "QWEN_CHAT_MODEL")
    ):
        return "qwen_chat"
    if (_resolve_value(args, "azure_openai_endpoint") or _resolve_value(args, "AZURE_OPENAI_ENDPOINT")) and (
        _resolve_value(args, "azure_openai_api_key")
        or _resolve_value(args, "AZURE_OPENAI_API_KEY")
        or _resolve_value(args, "azure_openai_auth_mode")
        or _resolve_value(args, "AZURE_OPENAI_AUTH_MODE")
    ):
        return "azure_openai"
    return "local_stub"


def build_searchqa_prompt(item: dict[str, Any], user_instruction: str | None = None) -> str:
    return "\n".join(
        [
            user_instruction or "Answer the question using only the provided context. Return only the short final answer with no explanation.",
            f"Question: {item['question']}",
            f"Context: {item['context']}",
        ]
    )


def _normalize_text(value: str) -> str:
    return " ".join(value.strip().lower().split())


def score_agent_answer(answer: str, expected_answers: list[str], match_mode: str = "contains") -> bool:
    normalized_answer = _normalize_text(answer)
    for expected in expected_answers:
        normalized_expected = _normalize_text(expected)
        if match_mode == "exact":
            if normalized_answer == normalized_expected:
                return True
            continue
        if normalized_expected in normalized_answer:
            return True
    return False


def _variant_label(variant: dict[str, str] | None) -> str:
    return (variant or {}).get("label", "default")


def _expected_answers_for_variant(item: dict[str, Any], variant: dict[str, str] | None) -> list[str]:
    variant_answers = item.get("expected_answers_by_variant")
    label = _variant_label(variant)
    if isinstance(variant_answers, dict):
        answers = variant_answers.get(label)
        if isinstance(answers, list) and answers:
            return [str(answer) for answer in answers]
    answers = item.get("answers", [])
    if not isinstance(answers, list) or not answers:
        raise ValueError(f"Item {item.get('id', '<unknown>')} does not define any expected answers")
    return [str(answer) for answer in answers]


def _match_mode_for_variant(item: dict[str, Any], variant: dict[str, str] | None) -> str:
    variant_modes = item.get("match_mode_by_variant")
    label = _variant_label(variant)
    if isinstance(variant_modes, dict):
        match_mode = variant_modes.get(label)
        if isinstance(match_mode, str) and match_mode:
            return match_mode
    return str(item.get("match_mode", "contains"))


def _openai_chat_config(args: Any) -> dict[str, str]:
    api_key = _resolve_value(args, "openai_api_key") or _resolve_value(args, "OPENAI_API_KEY")
    base_url = _resolve_value(args, "openai_base_url") or _resolve_value(args, "OPENAI_BASE_URL")
    model = _resolve_value(args, "openai_model") or _resolve_value(args, "OPENAI_MODEL") or "gpt-4.1-mini"
    if not api_key:
        raise ValueError("OPENAI_API_KEY is required for openai_chat backend")
    if not base_url:
        base_url = "https://api.openai.com/v1"
    if api_key.startswith("http") and base_url.startswith("sk-"):
        raise ValueError("OPENAI_API_KEY and OPENAI_BASE_URL appear to be swapped")
    if base_url.startswith("sk-"):
        raise ValueError("OPENAI_BASE_URL must be a URL")
    if not (api_key.startswith("sk-") or api_key.startswith("sess-")):
        raise ValueError("OPENAI_API_KEY does not look like an API key")
    normalized_base_url = _normalize_openai_base_url(base_url)
    return {"api_key": api_key, "base_url": normalized_base_url, "model": model}


def _normalize_openai_base_url(base_url: str) -> str:
    normalized = base_url.rstrip("/")
    parsed = urlparse(normalized)
    path = parsed.path.rstrip("/")
    if path.endswith("/v1"):
        return normalized
    if path in {"", "/"}:
        return f"{normalized}/v1"
    return normalized


def run_agent_item(
    item: dict[str, Any],
    args: Any,
    backend: str,
    variant: dict[str, str] | None = None,
) -> dict[str, Any]:
    if backend == "openai_chat":
        response_text = _run_openai_chat(item, args, variant=variant)
    else:
        raise ValueError(f"Unsupported backend for real smoke agent run: {backend}")

    expected_answers = _expected_answers_for_variant(item, variant)
    match_mode = _match_mode_for_variant(item, variant)
    passed = score_agent_answer(response_text, expected_answers, match_mode)
    return {
        "id": item["id"],
        "question": item["question"],
        "expected_answers": expected_answers,
        "match_mode": match_mode,
        "variant": _variant_label(variant),
        "response_text": response_text,
        "passed": passed,
    }


def run_agent_batch(
    items: list[dict[str, Any]],
    args: Any,
    backend: str,
    variant: dict[str, str] | None = None,
) -> list[dict[str, Any]]:
    if backend == "local_stub":
        raise ValueError("local_stub backend cannot satisfy an actual agent run")
    return [run_agent_item(item, args, backend, variant=variant) for item in items]


def run_agent_batch_with_progress(
    items: list[dict[str, Any]],
    args: Any,
    backend: str,
    variant: dict[str, str] | None = None,
    on_item_complete: Callable[[dict[str, Any], int, int], None] | None = None,
) -> list[dict[str, Any]]:
    if backend == "local_stub":
        raise ValueError("local_stub backend cannot satisfy an actual agent run")
    results: list[dict[str, Any]] = []
    total = len(items)
    for index, item in enumerate(items, start=1):
        result = run_agent_item(item, args, backend, variant=variant)
        results.append(result)
        if on_item_complete is not None:
            on_item_complete(result, index, total)
    return results


def summarize_agent_results(results: list[dict[str, Any]]) -> dict[str, Any]:
    passed = sum(1 for item in results if item["passed"])
    total = len(results)
    accuracy = 0.0 if total == 0 else passed / total
    return {
        "total": total,
        "passed": passed,
        "failed": total - passed,
        "accuracy": accuracy,
        "score": round(accuracy * 100),
    }


def _run_openai_chat(item: dict[str, Any], args: Any, variant: dict[str, str] | None = None) -> str:
    config = _openai_chat_config(args)
    variant = variant or {}
    payload = {
        "model": config["model"],
        "temperature": 0,
        "stream": False,
        "max_tokens": 16,
        "messages": [
            {"role": "system", "content": variant.get("system_prompt", "You are a precise QA agent.")},
            {"role": "user", "content": build_searchqa_prompt(item, variant.get("user_instruction"))},
        ],
    }
    request = urllib.request.Request(
        url=f"{config['base_url']}/chat/completions",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {config['api_key']}",
        },
        method="POST",
    )
    raw_text = ""
    content_type = ""
    for attempt in range(3):
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                raw_text = response.read().decode("utf-8", errors="replace")
                content_type = response.headers.get("Content-Type", "")
            break
        except urllib.error.HTTPError as error:
            detail = error.read().decode("utf-8", errors="replace")
            raise RuntimeError(f"OpenAI-compatible request failed with HTTP {error.code}: {detail}") from error
        except urllib.error.URLError as error:
            if attempt < 2 and _is_retryable_transport_error(error.reason):
                time.sleep(1.5 * (attempt + 1))
                continue
            raise RuntimeError(f"OpenAI-compatible request failed: {error.reason}") from error

    if "text/event-stream" in content_type:
        return _read_sse_completion_text(raw_text)

    try:
        body = json.loads(raw_text)
    except json.JSONDecodeError as error:
        raise RuntimeError(f"OpenAI-compatible response was not valid JSON: {raw_text[:500]}") from error

    try:
        message = body["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError) as error:
        raise RuntimeError("OpenAI-compatible response did not include choices[0].message.content") from error

    if not isinstance(message, str) or not message.strip():
        raise RuntimeError("OpenAI-compatible response content was empty")
    return message.strip()


def _read_sse_completion_text(raw_text: str) -> str:
    parts: list[str] = []
    for raw_line in raw_text.splitlines():
        line = raw_line.strip()
        if not line.startswith("data:"):
            continue
        payload = line[len("data:"):].strip()
        if not payload or payload == "[DONE]":
            continue
        try:
            event = json.loads(payload)
        except json.JSONDecodeError:
            continue
        for choice in event.get("choices", []):
            delta = choice.get("delta", {})
            content = delta.get("content")
            if isinstance(content, str):
                parts.append(content)
    message = "".join(parts).strip()
    if not message:
        raise RuntimeError(f"OpenAI-compatible SSE response did not include assistant content: {raw_text[:500]}")
    return message


def _is_retryable_transport_error(reason: object) -> bool:
    text = str(reason).lower()
    return any(
        marker in text
        for marker in (
            "unexpected eof",
            "timed out",
            "timeout",
            "temporarily unavailable",
            "temporary failure",
            "connection reset",
            "eof occurred in violation of protocol",
        )
    )
