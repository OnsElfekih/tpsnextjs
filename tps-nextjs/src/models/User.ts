import mongoose, { Schema, Document, Model } from "mongoose";

// Interface TypeScript pour le modèle User
export interface IUser extends Document {
  email: string;
  password: string;
}

// Schéma Mongoose
const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Vérifier si le modèle existe déjà pour éviter l'erreur de recompilation
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
