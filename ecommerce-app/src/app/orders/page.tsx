// src/app/orders/page.tsx
import { revalidatePath } from "next/cache";

async function getOrders() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

async function getUsers() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function OrdersPage() {
  const [orders, users, products] = await Promise.all([getOrders(), getUsers(), getProducts()]);

  async function create(formData: FormData) {
    "use server";
    const data = {
      userId: String(formData.get("userId")),
      productId: String(formData.get("productId")),
      quantity: Number(formData.get("quantity")),
      status: "PENDING"
    };
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    revalidatePath("/orders");
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Pedidos</h1>

      <form action={create} className="mt-4 flex gap-2 items-end">
        <select name="userId" className="border p-2" required>
          <option value="">Usuario</option>
          {users.map((u: any) => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
        <select name="productId" className="border p-2" required>
          <option value="">Producto</option>
          {products.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <input name="quantity" type="number" min="1" defaultValue="1" className="border p-2" />
        <button className="bg-black text-white px-3 py-2">Crear pedido</button>
      </form>

      <ul className="mt-6 space-y-2">
        {orders.map((o: any) => (
          <li key={o.id} className="border p-2">
            <div className="font-medium">
              {o.user?.name} → {o.product?.name} × {o.quantity} — {o.status}
            </div>
            <a href={`/orders/${o.id}`} className="text-blue-600 underline text-sm">Ver/Editar</a>
          </li>
        ))}
      </ul>
    </div>
  );
}