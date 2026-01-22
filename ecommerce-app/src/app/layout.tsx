// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "E-commerce básico",
  description: "Next.js + Prisma"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex">
        <aside className="w-64 border-r p-4">
          <h2 className="font-bold mb-4">Panel</h2>
          <nav className="space-y-2">
            <a href="/products" className="block">Productos</a>
            <a href="/orders" className="block">Pedidos</a>
            <a href="/users" className="block">Usuarios</a>
          </nav>
        </aside>
        <main className="flex-1">
          <header className="border-b p-4">E-commerce básico</header>
          <section className="p-4">{children}</section>
        </main>
      </body>
    </html>
  );
}

