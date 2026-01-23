// src/app/layout.tsx
import "./globals.css";
import { getReplitUser } from "@/lib/auth/replit";

export const metadata = {
  title: "E-commerce Admin",
  description: "Panel de administración Next.js + Prisma"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getReplitUser();
  const isAdmin = user?.roles?.includes("admin") ?? false;

  return (
    <html lang="es">
      <body className="min-h-screen flex bg-slate-50">
        <aside className="w-64 border-r border-slate-200 bg-white p-6 hidden md:block">
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
            <h2 className="font-bold text-xl text-slate-800 tracking-tight">E-Admin</h2>
          </div>
          <nav className="space-y-1">
            <a href="/" className="nav-link">Inicio</a>
            <a href="/products" className="nav-link">Productos</a>
            <a href="/orders" className="nav-link">Pedidos</a>
            {isAdmin && <a href="/users" className="nav-link">Usuarios (Admin)</a>}
          </nav>
          
          <div className="mt-auto pt-6 border-t border-slate-100">
            {user ? (
              <div className="px-2">
                <p className="text-xs text-slate-400 mb-1">Conectado como</p>
                <p className="text-sm font-medium text-slate-700 truncate">{user.name}</p>
                <a href="/api/auth/logout" className="text-xs text-red-500 hover:text-red-600 mt-2 block">Cerrar sesión</a>
              </div>
            ) : (
              <a href="/api/auth/login" className="btn-primary w-full text-center text-sm">Iniciar Sesión</a>
            )}
          </div>
        </aside>
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8">
            <h1 className="text-sm font-medium text-slate-500">
              {isAdmin ? "Panel de Administrador" : "Portal de Cliente"}
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

