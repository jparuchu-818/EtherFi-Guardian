# ai_logic/prompt_builder.py

from __future__ import annotations
import json, re
from typing import Dict, Any, List

# Ultra-compact guide (short = cheaper)
SCORING_GUIDE = (
  "Score 1.0–10.0 (1dp). Start 5.0. "
  "+3.0 strong security (recent reputable audits, active bounty, clean incidents); "
  "+1.0 clear compensation (insurance, caps, payout rules); "
  "−2.0 dependency risks (immature AVS/oracle, no safeguards); "
  "−1.5 upgrade/centralization risks (privileged keys, no timelock, opaque gov). "
  "Be conservative if evidence is weak."
)

# Flat JSON_SHAPE (no pretty indent to save tokens)
JSON_SHAPE = '{"trust_score":{"value":0.0,"scale":"1-10","rationale":""},"ai_analysis":{"summary":"","top_risks":[],"quick_wins":[],"generated_at":""}}'

def _clip(s: str, n: int) -> str:
    s = re.sub(r"\s+", " ", s or "").strip()
    return (s[: n - 1] + "…") if len(s) > n else s

def _list_clip(lst: List[Any], max_items: int, item_chars: int) -> List[str]:
    out = []
    for i, it in enumerate(lst[:max_items]):
        try:
            s = json.dumps(it, ensure_ascii=False)
        except Exception:
            s = str(it)
        out.append(_clip(s, item_chars))
    return out

def _summarize_security(sec: Dict[str, Any]) -> Dict[str, Any]:
    audits = sec.get("audits", [])
    bounty = sec.get("bug_bounty", {})
    incidents = sec.get("incidents", [])
    return {
        "audits": _list_clip(audits, max_items=2, item_chars=500),          # last 2 only
        "bug_bounty": {
            "active": bool(bounty.get("active", False)),
            "platform": _clip(str(bounty.get("platform", "")), 60),
            "max_reward": _clip(str(bounty.get("max_reward", "")), 30)
        },
        "incidents": _list_clip(incidents, max_items=2, item_chars=300)     # last 2 only
    }

def _summarize_comp(comp: Dict[str, Any]) -> Dict[str, Any]:
    # Keep only compact fields if present
    return {
        "has_insurance": bool(comp.get("has_insurance", False)),
        "coverage_cap": _clip(str(comp.get("coverage_cap", "")), 40),
        "rules": _clip(str(comp.get("payout_rules", "")), 220),
        "notes": _clip(str(comp.get("notes", "")), 200)
    }

def _summarize_deps(deps: Dict[str, Any]) -> Dict[str, Any]:
    avs = deps.get("avs", [])
    oracles = deps.get("oracles", [])
    return {
        "avs_sample": _list_clip(avs, max_items=4, item_chars=120),
        "oracles": _list_clip(oracles, max_items=2, item_chars=120),
        "upgrade_keys": _clip(str(deps.get("upgrade_keys", "")), 160),
        "timelock": _clip(str(deps.get("timelock", "")), 80)
    }

def build_prompt(protocol_name: str, scraped: Dict[str, Any]) -> str:
    security = _summarize_security(scraped.get("security", {}) or {})
    comp     = _summarize_comp(scraped.get("compensation_policy", {}) or {})
    deps     = _summarize_deps(scraped.get("dependencies", {}) or {})

    prompt = (
        f"You are a protocol risk analyst. Return ONLY a JSON object with keys trust_score and ai_analysis.\n"
        f"Shape (no extra keys):\n{JSON_SHAPE}\n\n"
        "Rules:\n"
        "- ai_analysis.summary ≤ 300 chars, neutral. top_risks: 3–5 short phrases. quick_wins: 3–5 actionable items.\n"
        "- trust_score.scale MUST be \"1-10\" and value a float with 1 decimal.\n"
        "- If evidence missing/ambiguous, be conservative and mention it in summary. Do not fabricate.\n\n"
        f"{SCORING_GUIDE}\n\n"
        f"EVIDENCE for {protocol_name}:\n"
        f"[SECURITY.AUDITS] {json.dumps(security['audits'], ensure_ascii=False)}\n"
        f"[SECURITY.BUG_BOUNTY] {json.dumps(security['bug_bounty'], ensure_ascii=False)}\n"
        f"[SECURITY.INCIDENTS] {json.dumps(security['incidents'], ensure_ascii=False)}\n"
        f"[COMPENSATION_POLICY] {json.dumps(comp, ensure_ascii=False)}\n"
        f"[DEPENDENCIES] {json.dumps(deps, ensure_ascii=False)}"
    )
    return prompt

