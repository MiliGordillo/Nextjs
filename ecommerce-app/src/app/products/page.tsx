// src/app/products/page.tsx
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

async function getProducts() {
  const res = await fetch(`${BASE_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export default async function ProductsPage() {
  const products = await getProducts();

  async function create(formData: FormData) {
    "use server";

    await fetch(`${BASE_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        stock: Number(formData.get("stock")),
        imageUrl: formData.get("imageUrl") || null,
      }),
    });

    revalidatePath("/products");
  }

  return (
    <section className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Productos</h1>

      <form action={create} className="bg-white shadow rounded p-4 grid grid-cols-2 gap-4 max-w-xl">
        <input name="name" placeholder="Nombre" className="input" required />
        <input name="price" type="number" step="0.01" placeholder="Precio" className="input" required />
        <input name="stock" type="number" placeholder="Stock" className="input" required />
        <input name="imageUrl" placeholder="Imagen (URL)" className="input" />
        <textarea name="description" placeholder="Descripción" className="input col-span-2" />
        <button className="btn-primary col-span-2">Crear producto</button>
      </form>

      <ul className="mt-6 space-y-2">
        {products.map((p: any) => (
          <li key={p.id} className="border p-3 rounded">
            <div className="font-semibold">{p.name}</div>
            <p className="text-sm text-gray-600">{p.description}</p>
            <div className="flex justify-between text-sm mt-2">
              <span>Precio: ${p.price}</span>
              <span>Stock: {p.stock}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

