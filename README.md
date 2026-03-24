# Leaf Classification System

An end-to-end full-stack application for leaf disease classification built with TensorFlow, FastAPI, and React.js.

## Prerequisites
- Docker and Docker Compose
- Node.js (for local frontend development)
- Python 3.10+ (for local backend development)

## Running the Application with Docker Compose
To run both the frontend and backend simultaneously using Docker Compose:

```bash
docker-compose up --build
```
- Frontend will be available at: http://localhost:5173
- Backend API will be available at: http://localhost:8000

## TensorFlow Serving Instructions

If you prefer to serve the model using TensorFlow Serving instead of directly loading it in FastAPI, follow these steps:

1. Ensure you have the TensorFlow model saved in the `SavedModel` format (e.g., `saved_models/1/saved_model.pb`). The dummy generator saves as `.h5`, so you would need to convert or export it properly via standard `model.save("saved_models/1")`.
2. Run the TF Serving container:
```bash
docker run -t --rm -p 8501:8501 -v "$(pwd)/saved_models:/models/potato_model" -e MODEL_NAME=potato_model tensorflow/serving
```
3. Update the FastAPI backend (`backend/main.py`) to send POST requests to TF Serving:
```python
import requests
# Instead of local prediction:
# response = requests.post("http://localhost:8501/v1/models/potato_model:predict", json={"instances": img_batch.tolist()})
```
