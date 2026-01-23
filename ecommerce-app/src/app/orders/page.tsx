// src/app/orders/page.tsx
import { revalidatePath } from "next/cache";

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.REPLIT_DEV_DOMAIN) return `https://${process.env.REPLIT_DEV_DOMAIN}`;
  return 'http://0.0.0.0:5000';
};

async function getOrders() {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/orders`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

async function getUsers() {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/users`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

async function getProducts() {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

export default async function OrdersPage() {
  const [orders, users, products] = await Promise.all([getOrders(), getUsers(), getProducts()]);

  async function create(formData: FormData) {
    "use server";
    const baseUrl = getBaseUrl();
    const data = {
      userId: String(formData.get("userId")),
      productId: String(formData.get("productId")),
      quantity: Number(formData.get("quantity")),
      status: "PENDING"
    };
    await fetch(`${baseUrl}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    revalidatePath("/orders");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Pedidos</h1>
        <p className="text-slate-500">Historial y gestión de ventas</p>
      </div>

      <div className="card">
        <h2 className="font-bold mb-4 text-slate-800">Nuevo Pedido</h2>
        <form action={create} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">Cliente</label>
            <select name="userId" className="input" required>
              <option value="">Seleccionar...</option>
              {users.map((u: any) => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">Producto</label>
            <select name="productId" className="input" required>
              <option value="">Seleccionar...</option>
              {products.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">Cantidad</label>
            <input name="quantity" type="number" min="1" defaultValue="1" className="input" />
          </div>
          <button className="btn-primary">Crear Pedido</button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {orders.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-400">No hay pedidos registrados</p>
          </div>
        ) : (
          orders.map((o: any) => (
            <div key={o.id} className="card flex items-center justify-between hover:scale-[1.01]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl">
                  🛒
                </div>
                <div>
                  <div className="font-bold text-slate-900">
                    {o.product?.name || 'Producto eliminado'}
                  </div>
                  <div className="text-sm text-slate-500">
                    Cliente: <span className="font-medium text-slate-700">{o.user?.name || 'Usuario desconocido'}</span> • Cantidad: {o.quantity}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  o.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                }`}>
                  {o.status}
                </span>
                <a href={`/orders/${o.id}`} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-blue-600">
                   ⚙️
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}