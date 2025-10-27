"use client";

import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    useEffect(() => {
    document.title = "Register";
  }, []);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();


  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Inscription réussie");

      // redirection après 3 secondes avec email et password préremplis
      setTimeout(() => {
        router.push(`/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      }, 3000);

    } else {
      setMessage(data.error || "Échec de l'inscription");
    }
  } catch (error) {
    console.error(error);
    setMessage("Une erreur est survenue");
  }
};

  return (
    
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleRegister} className="p-6 border rounded w-80">
        <h1 className="text-xl font-bold mb-4">Register</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Register
        </button>

        {message && (
          <p
            className={`mt-2 text-sm ${
              message === "Inscription réussie" ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-4 text-sm text-center">
        <p className="mt-4 text-sm">
          Déjà avoir un compte ?{" "}
          <Link href="/login" className="text-blue-500 underline">
            Se connecter
          </Link>
        </p>
        </p>
      </form>
    </div>
  );
}
