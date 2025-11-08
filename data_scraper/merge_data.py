"""
merge_data.py
Combines AVS, Audits, and Compensation data into one JSON
matching the Phase 1 schema.
"""

import json
from datetime import datetime
from pathlib import Path

def merge_all():
    base = {
        "protocol": "EtherFi",
        "product": "Liquid Restaking (eETH)",
        "network": "Ethereum",
        "last_updated": datetime.utcnow().isoformat() + "Z"
    }

    avs = json.loads(Path("avs_data.json").read_text())
    audits = json.loads(Path("audits_data.json").read_text())
    comp = json.loads(Path("compensation_data.json").read_text())

    merged = {
        **base,
        "security": {
            "audits": audits["audits"],
            "bug_bounty": audits["bug_bounty"],
            "security_notices": audits["security_notices"]
        },
        "compensation_policy": comp,
        "dependencies": {
            "avs": avs["avs"],
            "oracles": avs["oracles"],
            "bridges": avs["bridges"]
        },
        "trust_score": {},
        "ai_analysis": {}
    }

    out_path = Path("../backend/response_live.json")
    out_path.write_text(json.dumps(merged, indent=2))
    print(f"✅ Merged → {out_path}")

if __name__ == "__main__":
    merge_all()
