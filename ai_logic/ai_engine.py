# ai_logic/ai_engine.py
from __future__ import annotations
import json, sys, pathlib, datetime, hashlib
from typing import Any, Dict
from dateutil.tz import tzutc

from prompt_builder import build_prompt
from claude_api import ask_claude

ROOT = pathlib.Path(__file__).resolve().parents[1]
LIVE_PATH = ROOT / "backend" / "response_live.json"
CACHE_DIR = ROOT / "ai_logic" / ".cache"
CACHE_DIR.mkdir(parents=True, exist_ok=True)

def _load(p: pathlib.Path) -> Dict[str, Any]:
    with p.open("r", encoding="utf-8") as f:
        return json.load(f)

def _save(p: pathlib.Path, data: Dict[str, Any]) -> None:
    with p.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def _fingerprint(d: Dict[str, Any]) -> str:
    # Hash only source sections to detect real changes
    focus = {
        "security": d.get("security", {}),
        "compensation_policy": d.get("compensation_policy", {}),
        "dependencies": d.get("dependencies", {}),
    }
    b = json.dumps(focus, sort_keys=True, ensure_ascii=False).encode("utf-8")
    return hashlib.sha256(b).hexdigest()

def _cache_path(fp: str) -> pathlib.Path:
    return CACHE_DIR / f"{fp}.json"

def merge_ai(output: Dict[str, Any], base: Dict[str, Any]) -> Dict[str, Any]:
    now = datetime.datetime.now(tzutc()).replace(microsecond=0).isoformat()
    if isinstance(output.get("ai_analysis"), dict):
        output["ai_analysis"]["generated_at"] = now
    merged = dict(base)
    merged["trust_score"] = output.get("trust_score", {})
    merged["ai_analysis"] = output.get("ai_analysis", {})
    return merged

def main(protocol_name: str = "EtherFi", force: bool = False, dry_run: bool = False):
    if not LIVE_PATH.exists():
        sys.exit(f"Missing file: {LIVE_PATH}")
    base = _load(LIVE_PATH)
    fp = _fingerprint(base)
    cache_file = _cache_path(fp)

    # Serve from cache if unchanged and not forced
    if cache_file.exists() and not force:
        cached = _load(cache_file)
        merged = merge_ai(cached, base)
        if not dry_run:
            _save(LIVE_PATH, merged)
            print("✔ Used cached AI output.")
        else:
            print(json.dumps(merge_ai(cached, base), ensure_ascii=False, indent=2))
        return

    # Build compact prompt and ask model
    prompt = build_prompt(protocol_name, base)
    ai_json = ask_claude(prompt)

    # Cache raw AI part for this fingerprint
    _save(cache_file, ai_json)

    merged = merge_ai(ai_json, base)
    if dry_run:
        print(json.dumps(merged, ensure_ascii=False, indent=2))
    else:
        _save(LIVE_PATH, merged)
        print("✔ AI analysis merged and cached.")

if __name__ == "__main__":
    # Usage:
    #   python ai_engine.py              # normal
    #   python ai_engine.py EtherFi --force
    #   python ai_engine.py EtherFi --dry
    proto = "EtherFi"
    force = False
    dry = False
    args = sys.argv[1:]
    if args:
        proto = args[0]
        for a in args[1:]:
            if a == "--force": force = True
            if a == "--dry": dry = True
    main(proto, force=force, dry_run=dry)

