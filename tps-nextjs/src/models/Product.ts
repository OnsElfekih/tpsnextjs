import mongoose, { Schema, Document, Model } from "mongoose";

// Définition de l'interface TypeScript pour un produit
export interface IProduct extends Document {
  name: string;
  price: number;
}

// Schéma Mongoose pour le produit
const ProductSchema: Schema<IProduct> = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

// Création ou récupération du modèle
const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
