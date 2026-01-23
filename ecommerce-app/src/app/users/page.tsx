// src/app/users/page.tsx
import { revalidatePath } from "next/cache";
import { getReplitUser } from "@/lib/auth/replit";
import { redirect } from "next/navigation";

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.REPLIT_DEV_DOMAIN) return `https://${process.env.REPLIT_DEV_DOMAIN}`;
  return 'http://0.0.0.0:5000';
};

async function getUsers() {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/users`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

export default async function UsersPage() {
  const authUser = await getReplitUser();
  if (!authUser?.roles.includes("admin")) {
    redirect("/");
  }

  const users = await getUsers();

  async function create(formData: FormData) {
    "use server";
    const baseUrl = getBaseUrl();
    await fetch(`${baseUrl}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        role: formData.get("role") || "CUSTOMER",
      }),
    });
    revalidatePath("/users");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Gestión de Usuarios (Solo Admin)</h1>
        <p className="text-slate-500">Solo usuarios con rol de administrador pueden ver esta sección.</p>
      </div>
      {/* Rest of the UI remains the same... */}
      <div className="card">
        <h2 className="font-bold mb-4 text-slate-800">Registrar Usuario</h2>
        <form action={create} className="flex flex-wrap gap-4">
          <input name="name" placeholder="Nombre completo" className="input flex-1 min-w-[200px]" required />
          <input name="email" type="email" placeholder="Correo electrónico" className="input flex-1 min-w-[200px]" required />
          <select name="role" className="input w-40">
            <option value="CUSTOMER">Cliente</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button className="btn-primary">Añadir Usuario</button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rol</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u: any) => (
              <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{u.name}</td>
                <td className="px-6 py-4 text-slate-500">{u.email}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {u.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

