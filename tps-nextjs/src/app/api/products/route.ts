import { dbConnect } from "@/lib/mongodb";
import Product, { IProduct } from "@/models/Product";

// GET all products
export async function GET() {
  await dbConnect();
  const products: IProduct[] = await Product.find();
  return new Response(JSON.stringify(products), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// POST new product
export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const product: IProduct = await Product.create(data);
  return new Response(JSON.stringify(product), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
