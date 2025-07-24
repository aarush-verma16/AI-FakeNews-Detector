# AI News Detector

A full-stack web application that uses AI to classify news articles as **Real** or **Fake** using a fine-tuned RoBERTa transformer model.

## 🎯 What This Project Does

The AI News Detector is a machine learning-powered application that:
- **Analyzes news article text** to determine authenticity
- **Provides confidence scores** for predictions
- **Offers a modern web interface** for easy interaction
- **Uses state-of-the-art NLP** with RoBERTa transformer architecture

## 🏗️ Project Architecture

```
AI News Detector/
├── app/                    # FastAPI Backend
│   ├── main.py            # API endpoints and CORS configuration
│   ├── model.py           # Model loading and initialization
│   ├── predict.py         # Prediction logic with debugging
│   └── schemas.py         # Pydantic request/response models
├── frontend/              # React Frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js         # Main application component
│   │   └── App.css        # Modern styling
│   └── package.json       # Frontend dependencies
├── model/                 # Trained Model Files
│   ├── config.json        # Model configuration
│   ├── model.safetensors  # Model weights
│   ├── tokenizer_config.json
│   └── vocab.json         # Tokenizer vocabulary
├── notebooks/             # Training notebooks
└── requirements.txt       # Python dependencies
```

## 🚀 How to Run the Application

### Prerequisites
- **Python 3.8+**
- **Node.js 14+** and **npm**
- **CUDA-compatible GPU** (optional, for faster inference)

### 1. Backend Setup (FastAPI)

```bash
# Navigate to project directory
cd "AI News Detector"

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
.\venv\Scripts\Activate.ps1

# Install Python dependencies
pip install -r requirements.txt

# Start the backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at: **http://localhost:8000**

### 2. Frontend Setup (React)

```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Start the React development server
npm start
```

The frontend will be available at: **http://localhost:3000** or **http://localhost:3001**

## 📡 API Usage

### Predict Endpoint

**POST** `/predict`

**Request Body:**
```json
{
  "text": "Your news article text here..."
}
```

**Response:**
```json
{
  "prediction": "real",
  "confidence": 0.8542
}
```

### Example API Call

```bash
# Using PowerShell
Invoke-RestMethod -Uri "http://localhost:8000/predict" -Method POST -ContentType "application/json" -Body '{"text": "Breaking: Scientists discover new species in Amazon rainforest"}'

# Using curl
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{"text": "Breaking: Scientists discover new species in Amazon rainforest"}'
```

## 🧠 Model Information

- **Architecture:** RoBERTa (Robustly Optimized BERT Pretraining Approach)
- **Task:** Binary sequence classification (Real vs Fake)
- **Framework:** Hugging Face Transformers
- **Device Support:** CUDA GPU (preferred) or CPU fallback

### Model Files Structure
```
model/
├── config.json           # Model configuration
├── model.safetensors     # Model weights (498MB)
├── tokenizer_config.json # Tokenizer settings
├── vocab.json           # Vocabulary (50,265 tokens)
├── merges.txt           # BPE merges
└── special_tokens_map.json # Special tokens
```

## 🔄 How to Retrain or Update the Model

### Option 1: Retrain from Scratch

1. **Prepare your dataset** in the format:
   ```
   data/
   ├── train.csv  # columns: text, label (0=fake, 1=real)
   ├── val.csv
   └── test.csv
   ```

2. **Use the training notebook:**
   ```bash
   jupyter notebook notebooks/train_model.ipynb
   ```

3. **Update model path** in `app/model.py` if needed

### Option 2: Fine-tune Existing Model

```python
# In your training script
from transformers import RobertaForSequenceClassification, RobertaTokenizer

# Load your existing model
model = RobertaForSequenceClassification.from_pretrained('./model')
tokenizer = RobertaTokenizer.from_pretrained('./model')

# Continue training with new data
# ... training loop ...

# Save updated model
model.save_pretrained('./model')
tokenizer.save_pretrained('./model')
```

## 🎨 Frontend Features

- **Modern UI Design:** Clean, responsive interface with gradient backgrounds
- **Real-time Input:** Text area for pasting news articles
- **Loading States:** Visual feedback during analysis
- **Result Display:** Clear prediction with confidence percentage
- **Error Handling:** User-friendly error messages
- **Mobile Responsive:** Works on desktop and mobile devices

## 🛠️ Development

### Backend Development
- **FastAPI** with automatic OpenAPI documentation at `/docs`
- **CORS enabled** for frontend communication
- **Comprehensive logging** and debug output
- **Pydantic models** for request/response validation

### Frontend Development
- **React 18** with modern hooks
- **Component-based architecture**
- **CSS3** with modern styling and animations
- **Error boundaries** and loading states

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Ensure backend CORS is configured for your frontend port
   - Check `app/main.py` for allowed origins

2. **Model Loading Issues:**
   - Verify all model files are present in `model/` directory
   - Check CUDA availability if using GPU

3. **Port Conflicts:**
   - Backend: Change port in uvicorn command
   - Frontend: Set `PORT` environment variable

### Debug Mode

The backend includes comprehensive debug logging. Check terminal output for:
- Model loading confirmation
- Prediction debug information
- Input tokenization details
- Raw logits and probabilities

## 📊 Performance

- **Model Size:** ~498MB
- **Inference Time:** ~100-500ms per prediction
- **Accuracy:** Depends on training data quality
- **Supported Text Length:** Up to 512 tokens

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Hugging Face Transformers** for the model architecture
- **FastAPI** for the high-performance backend
- **React** for the modern frontend framework
- **RoBERTa** research team for the base model
