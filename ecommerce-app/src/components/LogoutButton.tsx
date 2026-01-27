'use client';

import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      const form = document.getElementById('logoutForm') as HTMLFormElement;
      form?.submit();
    }
  };

  return (
    <form action="/api/logout" method="POST" className="w-full" id="logoutForm">
      <button 
        type="button" 
        className="text-xs text-red-500 hover:text-red-600 font-medium w-full text-left flex items-center gap-2 hover:bg-red-50 px-2 py-1 rounded transition-colors"
        onClick={handleLogout}
      >
        <LogOut className="w-4 h-4" />
        Cerrar sesión
      </button>
    </form>
  );
}
