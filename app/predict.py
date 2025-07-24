# Core logic for prediction

from app.model import model, tokenizer, device
from torch.nn.functional import softmax
import torch

# List of class names (order must match training labels)
LABELS = ['fake', 'real']


def predict_fake_news(text: str):
    print(f"\n=== PREDICTION DEBUG ===")
    print(f"Input text: {text[:100]}...")
    
    # Tokenize input text
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    print(f"Tokenized input shape: {inputs['input_ids'].shape}")
    print(f"Input tokens (first 10): {inputs['input_ids'][0][:10].tolist()}")

    # Move input tensors to same device as model
    inputs = {key: val.to(device) for key, val in inputs.items()}

    # Get model output (no gradient calculation needed)
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        print(f"Raw logits: {logits}")
        print(f"Logits shape: {logits.shape}")

    # Apply softmax to get probabilities
    probs = softmax(logits, dim=1)
    if probs.dim() > 1:
        probs = probs.squeeze(0)  # Remove batch dimension if present
    
    print(f"Probabilities: {probs}")
    print(f"Prob for fake (index 0): {probs[0].item():.4f}")
    print(f"Prob for real (index 1): {probs[1].item():.4f}")

    # Get highest scoring class
    predicted_class = torch.argmax(probs).item()
    confidence = probs[predicted_class].item()
    
    print(f"Predicted class index: {predicted_class}")
    print(f"Predicted label: {LABELS[predicted_class]}")
    print(f"Confidence: {confidence:.4f}")
    print(f"=== END DEBUG ===\n")

    return {
        "prediction": LABELS[predicted_class],
        "confidence": round(confidence, 4)
    }

