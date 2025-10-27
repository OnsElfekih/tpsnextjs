#Importation des modules nécessaires
from sklearn.linear_model import LinearRegression
import joblib #pour sauvegarder le modèle 
import numpy as np

# Préparation des données d'entraînement
# Exemple : modèle qui apprend y = 2x + 1
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([3, 5, 7, 9, 11]) # Correspond à y = 2x + 1
model = LinearRegression() # Création du modèle linéaire
# Entraînement du modèle
model.fit(X, y)
 
# Sauvegarde du modèle
joblib.dump(model, "model.pkl")
print("✅ Modèle entraîné et sauvegardé sous model.pkl")

