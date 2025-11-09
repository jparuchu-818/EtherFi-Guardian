# ai_logic/claude_api.py
from __future__ import annotations
import os
import json
from typing import Dict
from anthropic import Anthropic

# Load .env automatically
from dotenv import load_dotenv
load_dotenv()

# Default model settings (these can be overridden in .env if desired)
MODEL = os.getenv("MODEL", "claude-3-5-haiku-latest")
MAX_TOKENS = int(os.getenv("MAX_TOKENS", "500"))
TEMPERATURE = float(os.getenv("TEMPERATURE", "0.2"))

def ask_claude(prompt: str) -> Dict:
    # Fetch API key from environment
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise RuntimeError("Missing ANTHROPIC_API_KEY — Make sure it's in your .env file")

    # Create Anthropic client
    client = Anthropic(api_key=api_key)

    # Call Claude
    msg = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        temperature=TEMPERATURE,
        system="Return JSON only. No explanations. No markdown. No code fences.",
        messages=[
            {"role": "user", "content": prompt}
        ],
    )

    # Extract plain text output
    blocks = [b.text for b in msg.content if getattr(b, "type", None) == "text"]
    if not blocks:
        raise RuntimeError("Claude returned no text response")

    raw = blocks[0].strip()

    # Parse JSON strictly
    try:
        return json.loads(raw)
    except Exception:
        # If Claude returns extra text, extract just the JSON part
        s, e = raw.find("{"), raw.rfind("}")
        if s != -1 and e != -1:
            return json.loads(raw[s:e+1])
        raise RuntimeError("Claude output was not valid JSON:\n" + raw)
