from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import numpy as np

# Initialisation du serveur Flask
app = Flask(__name__) #creation de l'application Flask
CORS(app) # Activer CORS pour permettre les requêtes cross-origin

# Charger le modèle entraîné
try:
    model = joblib.load("model.pkl") #le modèle est chargé avec joblib
    print("✅ Modèle chargé avec succès.")
except Exception as e:
    print(f"❌ Erreur de chargement du modèle : {e}")
    model = None # Si le modèle ne peut pas être chargé


# 🔹 Vérification du statut du serveur
@app.route("/api/status", methods=["GET"]) #Vérifie si le backend est actif.
def status():
    return jsonify({"status": "OK", "message": "Backend Flask opérationnel"})


# 🔹 Endpoint de prédiction
@app.route("/api/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Modèle non disponible"}), 500
    try:
        data = request.get_json()
        features = data.get("features")
        if not features or not isinstance(features, list):
            return jsonify({"error": "Les 'features' doivent être une liste"}), 400

        # Transformation en tableau numpy
        X = np.array(features).reshape(-1, 1)

        # Prédiction avec le modèle
        prediction = model.predict(X)

        return jsonify({"prediction": prediction.tolist()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
