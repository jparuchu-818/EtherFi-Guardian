# ai_logic/claude_api.py
from __future__ import annotations
import os, json
from typing import Dict
from anthropic import Anthropic

# Default to the cheaper/faster model. You can override via env.
MODEL = os.getenv("MODEL", "claude-3-5-haiku-latest")
MAX_TOKENS = int(os.getenv("MAX_TOKENS", "500"))   # tight cap
TEMPERATURE = float(os.getenv("TEMPERATURE", "0.2"))

def ask_claude(prompt: str) -> Dict:
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise RuntimeError("Missing ANTHROPIC_API_KEY")

    client = Anthropic(api_key=api_key)
    msg = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        temperature=TEMPERATURE,
        system="Return JSON only. No explanations. No markdown. No code fences.",
        messages=[{"role": "user", "content": prompt}],
    )

    # Extract first text block
    blocks = [b.text for b in msg.content if getattr(b, "type", None) == "text"]
    if not blocks:
        raise RuntimeError("Claude returned no text")
    raw = blocks[0].strip()

    # Parse JSON strictly
    try:
        return json.loads(raw)
    except Exception:
        s, e = raw.find("{"), raw.rfind("}")
        if s != -1 and e != -1:
            return json.loads(raw[s:e+1])
        raise

