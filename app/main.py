# FastAPI Entry Point

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import NewsPrediction, NewsRequest
from app.predict import predict_fake_news

app = FastAPI(
    title = 'Fake News Detector API',
    description = 'Classify news as fake or real using a fine-tuned transformer',
    version = '1.0.0'
)

# Add CORS middleware to allow React frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React dev server (original port)
        "http://localhost:3001",  # React dev server (current port)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Endpoint

@app.get("/")
def root():
    return {'Message' : 'Fake News Detection API is running.'}


# Predict Endpoint

@app.post("/predict", response_model=NewsPrediction)

def predict_news(request: NewsRequest):
    result = predict_fake_news(request.text)
    return result
    
