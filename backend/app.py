from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json, os

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/v1/analyze")
def get_analysis():
    path = os.path.join(os.path.dirname(__file__), "mock_response.json")
    with open(path, "r") as f:
        data = json.load(f)
    return data
