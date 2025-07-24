# Pydantic request/response schemas

from pydantic import BaseModel


# Request body schema
class NewsRequest(BaseModel):
    text : str


# Response schema
class NewsPrediction(BaseModel):
    prediction : str
    confidence : float