from flask import Flask, request, render_template
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

app = Flask(__name__)

# Load the dataset
data = pd.read_csv("fertilizer.csv")

# Prepare the features and target
X = data[['N', 'P', 'K', 'Temperature', 'Humidity', 'pH', 'Rainfall']]
y = data['Fertilizer Name']

# Train the KNN model
model = KNeighborsClassifier(n_neighbors=3)
model.fit(X, y)

@app.route("/predict-fertilizer", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        city = request.form["city"].strip().lower()

        # Filter data for the given city
        city_data = data[data["city"].str.lower() == city]

        if city_data.empty:
            return render_template("fertilizer.html", result={"city": city.capitalize(), "fertilizer": "No data available for this city."})

        # Use KNN model to predict fertilizers for city data
        predictions = model.predict(city_data[['N', 'P', 'K', 'Temperature', 'Humidity', 'pH', 'Rainfall']])
        unique_fertilizers = list(set(predictions))[:2]  # Top 2 fertilizers

        return render_template("fertilizer.html", result={"city": city.capitalize(), "fertilizer": ", ".join(unique_fertilizers)})

    return render_template("fertilizer.html", result=None)

if __name__ == "__main__":
    app.run(debug=True)
