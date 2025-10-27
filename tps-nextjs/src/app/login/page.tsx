"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
    useEffect(() => {
    document.title = "Connexion";
  }, []);
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [password, setPassword] = useState(searchParams.get("password") || "");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // 🔐 Sauvegarde du token dans localStorage
        localStorage.setItem("token", data.token);
        router.push("/dashboard"); // Redirection vers dashboard
      } else {
        setMessage(data.error || "Connexion échouée");
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur serveur, réessayez plus tard");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="p-6 border rounded w-80">
        <h1 className="text-xl font-bold mb-4">Login</h1>

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
          className="bg-green-500 text-white w-full py-2 rounded"
        >
          Login
        </button>

        {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
        <p className="mt-4 text-sm">
          Pas de compte ?{" "}
          <Link href="/register" className="text-blue-500 underline">
            Créer un compte
          </Link>
        </p>
      </form>
    </div>
  );
}
