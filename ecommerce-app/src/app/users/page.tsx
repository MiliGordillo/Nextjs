// src/app/users/page.tsx
import { revalidatePath } from "next/cache";

async function getUsers() {
  const res = await fetch("/api/users", { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export default async function UsersPage() {
  const users = await getUsers();

  async function create(formData: FormData) {
    "use server";

    await fetch("/api/users", {
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
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Usuarios</h1>

      <form action={create} className="flex gap-2 mb-6">
        <input name="name" placeholder="Nombre" className="input" />
        <input name="email" placeholder="Email" className="input" />
        <select name="role" className="input">
          <option value="CUSTOMER">CUSTOMER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button className="btn-primary">Crear</button>
      </form>

      <ul className="space-y-2">
        {users.map((u: any) => (
          <li key={u.id} className="card">
            {u.name} — {u.email} — <b>{u.role}</b>
          </li>
        ))}
      </ul>
    </section>
  );
}

