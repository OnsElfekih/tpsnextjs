"use client";

import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
}

export default function ProductsPage() {
    useEffect(() => {
    document.title = "Produits";
  }, []);
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Récupérer produits
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Ajouter produit
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: parseFloat(price) }),
    });
    setName("");
    setPrice("");
    fetchProducts();
  };

  // Supprimer produit
  const handleDelete = async (id: string) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gestion des Produits</h1>

      {/* Formulaire ajout */}
      <form onSubmit={handleAdd} className="mb-6 flex gap-2">
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
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </form>

      {/* Liste produits */}
      <ul className="space-y-2">
        {products.map((p) => (
          <li
            key={p._id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <span>
              {p.name} — <strong>{p.price} €</strong>
            </span>
            <div className="flex gap-2">
              <a
                href={`/products/edit/${p._id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Éditer
              </a>
              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
