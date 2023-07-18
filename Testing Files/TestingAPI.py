from flask import Flask, request, jsonify, render_template
from sklearn.preprocessing import StandardScaler
import numpy as np
import pickle

app = Flask(__name__)

lda = pickle.load(open("model.pkl", "rb"))
sc = pickle.load(open("sc.pkl", "rb"))
lda_transformed = pickle.load(open("lda.pkl", "rb"))

customer_segments = ['1', '2', '3']
print("helloworld")
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST' , 'GET'])
def predict():
    try:
        data = request.form

        Alcohol = float(data['alcohol'])
        Malic_Acid = float(data['malicAcid'])
        Ash = float(data['ash'])
        Ash_Alcanity = float(data['ashAlcanity'])
        Magnesium = float(data['magnesium'])
        Total_Phenols = float(data['totalPhenols'])
        Flavanoids = float(data['flavanoids'])
        Nonflavanoid_Phenols = float(data['nonflavanoidPhenols'])
        Proanthocyanins = float(data['proanthocyanins'])
        Color_Intensity = float(data['colorIntensity'])
        Hue = float(data['hue'])
        OD280 = float(data['od280'])
        Proline = float(data['proline'])

        # Standardizing the input features
        input_features = [Alcohol, Malic_Acid, Ash, Ash_Alcanity, Magnesium, Total_Phenols, Flavanoids, Nonflavanoid_Phenols, Proanthocyanins, Color_Intensity, Hue, OD280, Proline]
        print("abc")
        input_features = np.array(input_features).reshape(1, -1)
        print("xyz")
        input_features = sc.transform(input_features)
        print("123")

        # Applying dimensionality reduction
        input_features_lda = lda_transformed.transform(input_features)
        print("456")

        # Prediction of data
        result = lda.predict(input_features_lda)
        
        x = result.tolist()
        return x
    except Exception as e:
        # Handling exceptions if any for robustness
        Error = str(e)
        return jsonify({'error': Error})


if __name__ == '__main__':
    app.run(debug=True)