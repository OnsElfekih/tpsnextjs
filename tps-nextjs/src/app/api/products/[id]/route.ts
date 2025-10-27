import { dbConnect } from "@/lib/mongodb";
import Product, { IProduct } from "@/models/Product";

// GET one product
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await dbConnect();
  const product: IProduct | null = await Product.findById(id);

  if (!product) {
    return new Response(JSON.stringify({ message: "Produit non trouvé" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// PUT update product
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await dbConnect();
  const data = await req.json();

  const product: IProduct | null = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return new Response(JSON.stringify({ message: "Produit non trouvé" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// DELETE product
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await dbConnect();

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return new Response(JSON.stringify({ message: "Produit non trouvé" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ message: "Produit supprimé ✅" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
