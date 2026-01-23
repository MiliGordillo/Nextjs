// src/app/layout.tsx
import "./globals.css";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: "E-commerce AdminStore",
  description: "Panel de administración y tienda online"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  const isAdmin = user?.role === "ADMIN";

  return (
    <html lang="es">
      <body className="min-h-screen flex bg-slate-50">
        <aside className="w-64 border-r border-slate-200 bg-white p-6 hidden md:flex flex-col">
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">🛒</div>
            <h2 className="font-bold text-xl text-slate-800 tracking-tight">AdminStore</h2>
          </div>
          <nav className="space-y-1 flex-1">
            <a href="/" className="nav-link">🏠 Inicio</a>
            <a href="/products" className="nav-link">📦 Productos</a>
            {user && <a href="/orders" className="nav-link">🛍️ Pedidos</a>}
            {isAdmin && <a href="/users" className="nav-link">👥 Usuarios (Admin)</a>}
          </nav>
          
          <div className="mt-auto pt-6 border-t border-slate-100">
            {user ? (
              <div className="px-2">
                <p className="text-xs text-slate-400 mb-1">Conectado como</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">
                    {user.name?.[0] || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 truncate">{user.name}</p>
                    <p className="text-xs text-slate-500">{isAdmin ? 'Administrador' : 'Cliente'}</p>
                  </div>
                </div>
                <form action="/api/logout" method="POST" className="w-full">
                  <button type="submit" className="text-xs text-red-500 hover:text-red-600 font-medium w-full text-left">🚪 Cerrar sesión</button>
                </form>
              </div>
            ) : (
              <div className="space-y-2">
                <a href="/login" className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm w-full">
                  🔑 Iniciar Sesión
                </a>
                <a href="/register" className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors text-sm w-full">
                  ✍️ Registrarse
                </a>
              </div>
            )}
          </div>
        </aside>
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8">
            <h1 className="text-sm font-medium text-slate-500">
              {isAdmin ? "Panel de Administrador" : user ? "Portal de Cliente" : "Bienvenido a AdminStore"}
            </h1>
          </header>
          <section className="p-8 overflow-auto">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}


