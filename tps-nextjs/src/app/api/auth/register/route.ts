import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await dbConnect();

    // Récupérer email et password depuis le body
    const { email, password }: { email: string; password: string } = await req.json();

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer et sauvegarder l'utilisateur
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}
