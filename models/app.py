from flask import Flask, request, jsonify
import pickle
import joblib
import pandas as pd
import numpy as np
from flask_cors import CORS
from sklearn.neighbors import KNeighborsClassifier

app = Flask(__name__)
CORS(app)

# Load the dataset to filter city-specific data
dataset_path = 'crop_pune_data.csv'
data = pd.read_csv(dataset_path)

# Define feature columns
features = ['N', 'P', 'K', 'Temperature', 'Humidity', 'pH', 'Rainfall',
            'Average SoilMoisture Volume', 'Aggregate Soilmoisture Percentage', 'Fertility Rate']

# Load the trained model
model_path = 'crop_prediction_model (1).pkl'
with open(model_path, 'rb') as f:
    model = pickle.load(f)

# Function to predict top crops
def predict_top_crops(city, top_n=3):
    # Filter data for the given city
    city_data = data[data['city'] == city]
    if city_data.empty:
        raise ValueError(f"City '{city}' not found in the dataset.")

    # Compute average of features for the filtered rows
    avg_features = city_data[features].mean().values.reshape(1, -1)

    # Predict crop probabilities and sort to get top crops
    probabilities = model.predict_proba(avg_features)[0]
    crop_classes = model.classes_
    top_indices = probabilities.argsort()[-top_n:][::-1]
    top_crops = [crop_classes[i] for i in top_indices]

    return top_crops

@app.route('/predict', methods=['POST'])
def predict():
    # Extract city from the request
    content = request.json
    city = content.get('city', '')

    if not city:
        return jsonify({'error': 'City is required as input'}), 400

    try:
        # Predict top crops using the standalone function
        top_crops = predict_top_crops(city=city)
        return jsonify({'city': city, 'top_crops': top_crops}), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    



# Load the trained model and label encoders
# varieties_model = joblib.load('varieties_model_rf.pkl')
label_encoder_city = joblib.load('label_encoder_city.pkl')
label_encoder_crop = joblib.load('label_encoder_crop.pkl')
label_encoder_variety = joblib.load('label_encoder_variety.pkl')

# Load the original dataset for average price calculations
varieties_data = pd.read_csv('varieties_data.csv')
# Encode the city and crop columns in the dataset
varieties_data['city_encoded'] = label_encoder_city.transform(varieties_data['city'].str.lower())
varieties_data['crop_encoded'] = label_encoder_crop.transform(varieties_data['crop'].str.lower())

@app.route('/predict_variety', methods=['POST'])
def predict_variety():
    """
    Predict the top N crop varieties for given crops in a specific city.
    """
    data = request.json
    city = data.get('city')
    crops = data.get('crops')
    top_n = data.get('top_n', 2)  # Default to top 2 varieties if not provided

    try:
        # Encode the city name
        city_encoded = label_encoder_city.transform([city.lower()])[0]
        print(f"Encoded city '{city}' to '{city_encoded}'")
    except ValueError as e:
        return jsonify({'error': f"City '{city}' not found in the dataset."}), 400

    result = {}
    for crop in crops:
        try:
            # Encode the crop name
            crop_encoded = label_encoder_crop.transform([crop.lower()])[0]
            print(f"Encoded crop '{crop}' to '{crop_encoded}'")
        except ValueError as e:
            return jsonify({'error': f"Crop '{crop}' not found in the dataset."}), 400

        # Filter data for the given city and crop
        crop_varieties_data = varieties_data[
            (varieties_data['city_encoded'] == city_encoded) &
            (varieties_data['crop_encoded'] == crop_encoded)
        ]

         
       
        print(f"{crop_varieties_data}")

        # Debug: Print the filtered data
        print(f"Filtered data for city '{city_encoded}' and crop '{crop_encoded}':\n{crop_varieties_data}")

        # Calculate average prices for each variety
        avg_prices = (
            crop_varieties_data.groupby('crop_variety')['Modal_Price (Rs./Quintal)']
            .mean()
            .sort_values(ascending=False)
        )

        # Debug: Print the average prices
        print(f"Average prices for crop '{crop}':\n{avg_prices}")

        # Get the top N varieties
        top_varieties = avg_prices.head(top_n)
        if not top_varieties.empty:
            varieties_info = [
                {
                    "variety": [variety][0],
                    "average_price": round(price, 2),
                }
                for variety, price in top_varieties.items()
            ]
            result[crop] = varieties_info
        else:
            result[crop] = []

    # Debug: Print the final result
    print(f"Final result:\n{result}")

    return jsonify(result)



# Load the dataset
data = pd.read_csv("fertilizer.csv")

# Prepare the features and target
X = data[['N', 'P', 'K', 'Temperature', 'Humidity', 'pH', 'Rainfall']]
y = data['Fertilizer Name']

# Train the KNN model
model = KNeighborsClassifier(n_neighbors=3)
model.fit(X, y)

@app.route("/predict-fertilizer", methods=["POST"])
def predict_fertilizer():
    if request.method == "POST":
        city = request.form.get("city", "").strip().lower()

        # Filter data for the given city
        city_data = data[data["city"].str.lower() == city]

        if city_data.empty:
            return jsonify({
                "city": city.capitalize(),
                "fertilizer": "No data available for this city."
            })

        # Use KNN model to predict fertilizers for city data
        predictions = model.predict(city_data[['N', 'P', 'K', 'Temperature', 'Humidity', 'pH', 'Rainfall']])
        unique_fertilizers = list(set(predictions))[:2]  # Top 2 fertilizers

        return jsonify({
            "city": city.capitalize(),
            "fertilizer": unique_fertilizers
        })





if __name__ == '__main__':
    app.run(debug=True)
