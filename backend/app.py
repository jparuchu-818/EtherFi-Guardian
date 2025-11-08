from fastapi import FastAPI
import json, os

app = FastAPI()

@app.get("/api/v1/analyze")
def get_analysis():
    path = os.path.join(os.path.dirname(__file__), "mock_response.json")
    with open(path, "r") as f:
        data = json.load(f)
    return data
