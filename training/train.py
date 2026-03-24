import tensorflow as tf
from model import get_model
import os

BATCH_SIZE = 32
IMAGE_SIZE = 256
CHANNELS = 3
EPOCHS = 35 # Reduced slightly to prevent over-training locally, but enough for 98%

dataset_path = r"C:\Users\91990\Downloads\archive\PlantVillage"

# 1. Load Data
dataset = tf.keras.preprocessing.image_dataset_from_directory(
    dataset_path,
    shuffle=True,
    image_size=(IMAGE_SIZE, IMAGE_SIZE),
    batch_size=BATCH_SIZE
)

class_names = dataset.class_names
print("Classes found:", class_names)

# 2. Split Data (80% Train, 10% Val, 10% Test)
def get_dataset_partitions_tf(ds, train_split=0.8, val_split=0.1, test_split=0.1, shuffle=True, shuffle_size=10000):
    if shuffle:
        ds = ds.shuffle(shuffle_size, seed=12)
    ds_size = len(ds)
    train_size = int(train_split * ds_size)
    val_size = int(val_split * ds_size)
    
    train_ds = ds.take(train_size)
    val_ds = ds.skip(train_size).take(val_size)
    test_ds = ds.skip(train_size+val_size)
    return train_ds, val_ds, test_ds

train_ds, val_ds, test_ds = get_dataset_partitions_tf(dataset)

# 3. Cache and Prefetch for performance
train_ds = train_ds.cache().shuffle(1000).prefetch(buffer_size=tf.data.AUTOTUNE)
val_ds = val_ds.cache().prefetch(buffer_size=tf.data.AUTOTUNE)
test_ds = test_ds.cache().prefetch(buffer_size=tf.data.AUTOTUNE)

# 4. Get the compiled Model
model = get_model()

# 5. Callbacks for early stopping if we hit > 98%
early_stopping = tf.keras.callbacks.EarlyStopping(
    monitor='val_accuracy',
    patience=5,
    restore_best_weights=True
)

class HighAccuracyCallback(tf.keras.callbacks.Callback):
    def on_epoch_end(self, epoch, logs=None):
        if logs.get('val_accuracy') and logs.get('val_accuracy') >= 0.985:
            print("\nReached > 98.5% validation accuracy! Stopping training early to save time.")
            self.model.stop_training = True

# 6. Train the model
print("Starting real training phase to achieve >97% confidence...")
history = model.fit(
    train_ds,
    epochs=EPOCHS,
    batch_size=BATCH_SIZE,
    verbose=1,
    validation_data=val_ds,
    callbacks=[early_stopping, HighAccuracyCallback()]
)

# 7. Evaluate on test set
print("Evaluating on test set...")
scores = model.evaluate(test_ds)
print(f"Test Accuracy: {scores[1]*100:.2f}%")

# 8. Save the newly trained real model
os.makedirs("../backend", exist_ok=True)
model.save("../backend/potato_model.h5")
print("Successfully trained and saved REAL model to ../backend/potato_model.h5")
