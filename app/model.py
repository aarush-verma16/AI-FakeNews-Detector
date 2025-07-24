# Load model and tokenizer

import torch
import os
from transformers import RobertaForSequenceClassification, RobertaTokenizer

# Get the absolute path to the model directory
MODEL_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "model")

print(f"Loading your trained model from: {MODEL_DIR}")

# Load your trained model and tokenizer
model = RobertaForSequenceClassification.from_pretrained(
    MODEL_DIR,
    num_labels=2,
    output_attentions=False,
    output_hidden_states=False,
)
tokenizer = RobertaTokenizer.from_pretrained(MODEL_DIR)

# Print model info
print(f"Model loaded successfully. Number of labels: {model.config.num_labels}")
print(f"Model architecture: {model.config.architectures}")

# Set model to eval mode and move to appropriate device
model.eval()
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)

print(f"Model and tokenizer loaded from {MODEL_DIR}")
print(f"Model config: {model.config}")
print(f"Using device: {device}")

# Verify model is working with a simple test
print("\n=== MODEL VERIFICATION ===")
test_input = tokenizer("This is a test", return_tensors="pt", padding=True, truncation=True)
test_input = {key: val.to(device) for key, val in test_input.items()}
with torch.no_grad():
    test_output = model(**test_input)
    print(f"Test logits: {test_output.logits}")
print("=== MODEL VERIFICATION COMPLETE ===")
