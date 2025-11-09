import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import json
from fastapi import FastAPI

# Import Claude engine runner
from ai_logic.ai_engine import main as run_ai_engine

app = FastAPI()

def load_scraped_data():
    base = os.path.abspath(os.path.join(os.path.dirname(__file__), "../data_scraper"))

    with open(os.path.join(base, "audits_data.json"), "r") as f:
        audits = json.load(f)

    with open(os.path.join(base, "avs_data.json"), "r") as f:
        avs = json.load(f)

    with open(os.path.join(base, "compensation_data.json"), "r") as f:
        compensation = json.load(f)

    # IMPORTANT: match keys AI engine expects (security, dependencies, compensation_policy)
    return {
        "security": audits,
        "dependencies": avs,
        "compensation_policy": compensation
    }

def save_live_response(data):
    live_path = os.path.join(os.path.dirname(__file__), "response_live.json")
    with open(live_path, "w") as f:
        json.dump(data, f, indent=2)

@app.get("/api/v1/scraped")
def get_scraped_data():
    return load_scraped_data()

@app.get("/api/v1/analyze")
def analyze():
    # STEP 1 — Load scraped data
    scraped = load_scraped_data()

    # STEP 2 — Save it to backend/response_live.json (required by AI engine)
    save_live_response(scraped)

    # STEP 3 — Trigger Claude pipeline (`force=True` ensures fresh output)
    run_ai_engine("EtherFi", force=True)

    # STEP 4 — Return final merged AI-scored JSON from response_live.json
    live_path = os.path.join(os.path.dirname(__file__), "response_live.json")
    with open(live_path, "r") as f:
        final = json.load(f)

    return final
