from flask import Flask, request, jsonify
from sklearn.preprocessing import StandardScaler
from flask_cors import CORS
import numpy as np
import pickle

# Creating Flask app and enabling Cross-Origin Resource Sharing (CORS)
app = Flask(__name__)
CORS(app)

# Loading the pre-trained model files required for prediction analysis
lda = pickle.load(open("model.pkl", "rb"))
sc = pickle.load(open("sc.pkl", "rb"))
lda_transformed = pickle.load(open("lda.pkl", "rb"))

# Defining customer segments
customer_segments = ['Group 1', 'Group 2', 'Group 3']

# Prediction endpoint
@app.route('/predict', methods=['POST'])

def predict():
    try:
        # Extracting data from request
        data = request.json

        # Extracting input features from provided data
        input_features = [data[key] for key in data]

        # Uncomment the following if
        # input features need to be assigned to specific variables
        
        
        # Alcohol = float(data['alcohol'])
        # Malic_Acid = float(data['malicAcid'])
        # Ash = float(data['ash'])
        # Ash_Alcanity = float(data['ashAlcanity'])
        # Magnesium = float(data['magnesium'])
        # Total_Phenols = float(data['totalPhenols'])
        # Flavanoids = float(data['flavanoids'])
        # Nonflavanoid_Phenols = float(data['nonflavanoidPhenols'])
        # Proanthocyanins = float(data['proanthocyanins'])
        # Color_Intensity = float(data['colorIntensity'])
        # Hue = float(data['hue'])
        # OD280 = float(data['od280'])
        # Proline = float(data['proline'])

        # input_features = [Alcohol, Malic_Acid, Ash, Ash_Alcanity, Magnesium, Total_Phenols, Flavanoids, Nonflavanoid_Phenols, Proanthocyanins, Color_Intensity, Hue, OD280, Proline]



        # Reshaping input features array to match the expectations of the model
        input_features = np.array(input_features).reshape(1, -1)

        # Applying scaling to the input features
        input_features = sc.transform(input_features)

        # Applying LDA transformation
        input_features_lda = lda_transformed.transform(input_features)

        # Making the prediction using the model
        result = lda.predict(input_features_lda)

        prediction = str(result[0])

        return jsonify({'prediction': prediction})

    except Exception as e:
         # Handling exceptions if any for robustness
            Error = str(e)
            return jsonify({'error': Error})


# Running the Flask app with debugging enabled
if __name__ == '__main__':
    app.run(debug=True)
