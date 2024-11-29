import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.svm import SVC
import pickle

# Load the dataset
varieties_data = pd.read_csv('varieties_data.csv')

# Apply Label Encoding
label_encoder_city = LabelEncoder()
label_encoder_crop = LabelEncoder()
label_encoder_variety = LabelEncoder()

varieties_data['city'] = label_encoder_city.fit_transform(varieties_data['city'])
varieties_data['crop'] = label_encoder_crop.fit_transform(varieties_data['crop'])
varieties_data['crop_variety'] = label_encoder_variety.fit_transform(varieties_data['crop_variety'])

# Feature and target selection
X = varieties_data[['city', 'crop', 'Modal_Price (Rs./Quintal)']]
y = varieties_data['crop_variety']

# Train the SVM model
varieties_model = SVC(kernel='linear', probability=True)
varieties_model.fit(X, y)

with open('varieties_model.pkl', 'wb') as f:
    pickle.dump(varieties_model, f)


with open('label_encoder_crop.pkl', 'wb') as f:
    pickle.dump(varieties_model, f)    

with open('label_encoder_city.pkl', 'wb') as f:
    pickle.dump(label_encoder_crop, f)

with open('label_encoder_variety.pkl', 'wb') as f:
    pickle.dump(label_encoder_variety, f)
# Save model and encoders

