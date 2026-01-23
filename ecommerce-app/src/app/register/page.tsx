// src/app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al registrarse');
        return;
      }

      router.push('/login?registered=true');
    } catch (err) {
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl">🛒</div>
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-2">Crear Cuenta</h1>
          <p className="text-center text-slate-500 mb-6">Únete a AdminStore</p>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Nombre Completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="input"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@ejemplo.com"
                className="input"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Confirmar Contraseña</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="input"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="text-blue-600 font-medium hover:underline">
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
