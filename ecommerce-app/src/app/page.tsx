// src/app/page.tsx
import { getReplitUser } from "@/lib/auth/replit";

export default async function HomePage() {
  const user = await getReplitUser();
  const isAdmin = user?.roles.includes("admin");

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {user ? `Hola, ${user.name} 👋` : "Bienvenido 👋"}
        </h1>
        <p className="text-slate-500">
          {isAdmin 
            ? "Gestiona tu tienda, productos y usuarios desde este panel central." 
            : "Explora nuestros productos y gestiona tus pedidos."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="/products" className="card hover:border-blue-200 hover:bg-blue-50/30 group">
          <div className="text-2xl mb-4 group-hover:scale-110 transition-transform">📦</div>
          <h3 className="font-bold text-lg mb-1">Productos</h3>
          <p className="text-slate-500 text-sm mb-4">Explora el catálogo y disponibilidad de artículos.</p>
          <span className="text-blue-600 font-medium text-sm flex items-center gap-1">Ver catálogo →</span>
        </a>
        
        <a href="/orders" className="card hover:border-blue-200 hover:bg-blue-50/30 group">
          <div className="text-2xl mb-4 group-hover:scale-110 transition-transform">🛒</div>
          <h3 className="font-bold text-lg mb-1">Mis Pedidos</h3>
          <p className="text-slate-500 text-sm mb-4">Revisa el historial y estado de tus compras.</p>
          <span className="text-blue-600 font-medium text-sm flex items-center gap-1">Gestionar pedidos →</span>
        </a>

        {isAdmin && (
          <a href="/users" className="card border-purple-100 hover:border-purple-200 hover:bg-purple-50/30 group">
            <div className="text-2xl mb-4 group-hover:scale-110 transition-transform">👥</div>
            <h3 className="font-bold text-lg mb-1">Usuarios (Admin)</h3>
            <p className="text-slate-500 text-sm mb-4">Control total sobre perfiles y permisos.</p>
            <span className="text-purple-600 font-medium text-sm flex items-center gap-1">Gestionar usuarios →</span>
          </a>
        )}
      </div>
    </div>
  );
}
