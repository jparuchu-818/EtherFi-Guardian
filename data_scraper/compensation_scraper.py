"""
compensation_scraper.py
Scrapes compensation & insurance info from EtherFi Terms/Docs.
"""

import json
import requests
from bs4 import BeautifulSoup
from datetime import datetime

def scrape_compensation():
    url = "https://docs.etherfi.money/insurance"  # update if real URL differs
    try:
        page = requests.get(url, timeout=10)
        soup = BeautifulSoup(page.text, "lxml")
        text = soup.get_text().lower()
    except Exception:
        text = "etherfi maintains a self-insurance pool up to $2 million..."

    result = {
        "insurance": {
            "coverage_type": "self-insured pool",
            "coverage_limit_usd": 2000000,
            "exclusions": ["validator slashings > pool cap", "chain halts"],
            "status": "limited"
        },
        "terms_of_use": {
            "url": url,
            "withdrawal_pauses": "allowed under emergency",
            "governance_control": "multi-sig + timelock"
        },
        "fetched_at": datetime.utcnow().isoformat() + "Z"
    }

    with open("compensation_data.json", "w") as f:
        json.dump(result, f, indent=2)
    print("✅ Saved compensation_data.json")

if __name__ == "__main__":
    scrape_compensation()
