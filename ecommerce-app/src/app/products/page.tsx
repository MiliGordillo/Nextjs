// src/app/products/page.tsx
import { revalidatePath } from "next/cache";

// Utilidad para obtener la URL base
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.REPLIT_DEV_DOMAIN) return `https://${process.env.REPLIT_DEV_DOMAIN}`;
  return 'http://localhost:5000';
};

async function getProducts() {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  async function create(formData: FormData) {
    "use server";
    const baseUrl = getBaseUrl();
    await fetch(`${baseUrl}/api/products`, {
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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Productos</h1>
          <p className="text-slate-500">Gestiona el inventario de la tienda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="card sticky top-8">
            <h2 className="font-bold text-lg mb-4">Añadir Nuevo Producto</h2>
            <form action={create} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Nombre</label>
                <input name="name" placeholder="Ej: Laptop Pro" className="input" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Precio ($)</label>
                  <input name="price" type="number" step="0.01" placeholder="0.00" className="input" required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Stock</label>
                  <input name="stock" type="number" placeholder="0" className="input" required />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">URL de Imagen</label>
                <input name="imageUrl" placeholder="https://..." className="input" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Descripción</label>
                <textarea name="description" placeholder="Detalles del producto..." className="input h-24 resize-none" />
              </div>
              <button className="btn-primary w-full">Crear Producto</button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.length === 0 ? (
              <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-400">No hay productos registrados</p>
              </div>
            ) : (
              products.map((p: any) => (
                <div key={p.id} className="card flex flex-col">
                  {p.imageUrl && (
                    <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{p.name}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2 mt-1 mb-4">{p.description}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <span className="font-bold text-blue-600">${p.price}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {p.stock > 0 ? `${p.stock} en stock` : 'Sin stock'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

