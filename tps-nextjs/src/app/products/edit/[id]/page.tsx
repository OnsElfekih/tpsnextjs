"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);

  // Charger produit
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          console.error("Erreur fetch", res.status);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setName(data.name);
        setPrice(data.price.toString());
      } catch (err) {
        console.error("Erreur fetch", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Modifier produit
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: parseFloat(price) }),
    });
    router.push("/products"); // redirection après update
  };

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div className="p-8 flex justify-center">
      <form onSubmit={handleUpdate} className="flex flex-col gap-3 w-full max-w-md">
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
