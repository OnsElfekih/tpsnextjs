 "use client";
 import { useEffect, useState } from "react";
 import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip,
 Legend,
 ResponsiveContainer,
 } from "recharts";
 interface Product {
 id: string;
 name: string;
 price: number;
 }
  export default function DashboardPage() {
      useEffect(() => {
    document.title = "Dashboard";
  }, []);
 const [products, setProducts] = useState<Product[]>([]);
 const [loading, setLoading] = useState(true);
 useEffect(() => {
 const fetchProducts = async () => {
 try {
 const res = await fetch("/api/products");
 const data: Product[] = await res.json();
 setProducts(data);
 } catch (error) {
 console.error("Erreur chargement produits :", error);
 } finally {
 setLoading(false);
 }
 };
 fetchProducts();
 }, []);
  if (loading) return <p className="p-8 text-center">Chargement des produits...</p>;
 return (
 <main className="p-8">
 <h1 className="text-3xl font-bold mb-6">Dashboard Produits</h1>
 {products.length === 0 ? (
 <p>Aucun produit disponible.</p>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 {/* Tableau des produits */}
 <table className="min-w-full border border-gray-200">
 <thead className="bg-gray-100">
 <tr>
 <th className="py-2 px-4 border-b">Nom du produit</th>
 <th className="py-2 px-4 border-b">Prix (€)</th>
 </tr>
 </thead>
 <tbody>
   {products.map((product) => (
 <tr key={product.id} className="hover:bg-gray-50">
 <td className="py-2 px-4 border-b">{product.name}</td>
 <td className="py-2 px-4 border-b">{product.price.toFixed(2)}</td>
 </tr>
 ))}
 </tbody>
 </table>
 {/* Graphique des prix */}
 <div className="bg-white p-4 rounded shadow">
 <h2 className="text-xl font-semibold mb-4">Prix des produits</h2>
 <ResponsiveContainer width="100%" height={300}>
 <BarChart data={products} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
 <CartesianGrid strokeDasharray="3 3" />
 <XAxis dataKey="name" />
 <YAxis />
 <Tooltip />
 <Legend />
 <Bar dataKey="price" fill="#3b82f6" />
 </BarChart>
 </ResponsiveContainer>
 </div>
 </div>
 )}
 </main>
 );
 }