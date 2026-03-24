import os
from model import get_model

def save_model():
    model = get_model()
    
    # Create directories if they do not exist
    os.makedirs("../saved_models", exist_ok=True)
    os.makedirs("../backend", exist_ok=True)
    
    # Save the untrained model as an .h5 file for TF Serving style
    model.save("../saved_models/1.h5")
    
    # Save a local copy for FastAPI to load directly
    model.save("../backend/potato_model.h5")
    
    print("Dummy model saved successfully to ../saved_models/1.h5 and ../backend/potato_model.h5")

if __name__ == "__main__":
    save_model()
