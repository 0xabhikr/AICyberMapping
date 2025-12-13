from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from graph_service import build_cyber_graph


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Python backend running..."}

@app.get("/ai-cyber-graph")
def ai_cyber_graph():
    return build_cyber_graph()
