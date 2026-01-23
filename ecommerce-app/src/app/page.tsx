// src/app/page.tsx
export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Bienvenido de nuevo 👋</h1>
        <p className="text-slate-500">Gestiona tu inventario, pedidos y usuarios desde un solo lugar.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card hover:border-blue-200 hover:bg-blue-50/30 group cursor-pointer" onClick={() => window.location.href='/products'}>
          <div className="text-2xl mb-4 group-hover:scale-110 transition-transform">📦</div>
          <h3 className="font-bold text-lg mb-1">Productos</h3>
          <p className="text-slate-500 text-sm mb-4">Administra el catálogo y stock de tus artículos.</p>
          <span className="text-blue-600 font-medium text-sm flex items-center gap-1">Ver catálogo →</span>
        </div>
        
        <div className="card hover:border-blue-200 hover:bg-blue-50/30 group cursor-pointer" onClick={() => window.location.href='/orders'}>
          <div className="text-2xl mb-4 group-hover:scale-110 transition-transform">🛒</div>
          <h3 className="font-bold text-lg mb-1">Pedidos</h3>
          <p className="text-slate-500 text-sm mb-4">Controla el estado de las compras de tus clientes.</p>
          <span className="text-blue-600 font-medium text-sm flex items-center gap-1">Gestionar pedidos →</span>
        </div>

        <div className="card hover:border-blue-200 hover:bg-blue-50/30 group cursor-pointer" onClick={() => window.location.href='/users'}>
          <div className="text-2xl mb-4 group-hover:scale-110 transition-transform">👥</div>
          <h3 className="font-bold text-lg mb-1">Usuarios</h3>
          <p className="text-slate-500 text-sm mb-4">Administra los perfiles y roles de usuario.</p>
          <span className="text-blue-600 font-medium text-sm flex items-center gap-1">Ver usuarios →</span>
        </div>
      </div>
    </div>
  );
}
