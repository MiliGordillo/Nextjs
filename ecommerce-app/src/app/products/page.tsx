// src/app/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

interface User {
  role: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadProducts();
    checkUserRole();
  }, []);

  const checkUserRole = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const user = await res.json();
        setIsAdmin(user.role === 'ADMIN');
      }
    } catch (err) {
      console.error('Error checking user role:', err);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const url = editingId
        ? `/api/products/${editingId}`
        : '/api/products';

      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          imageUrl: formData.imageUrl || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al guardar producto');
        return;
      }

      setSuccessMessage(editingId ? 'Producto actualizado' : 'Producto creado');
      setFormData({ name: '', description: '', price: '', stock: '', imageUrl: '' });
      setEditingId(null);
      loadProducts();
    } catch (err) {
      setError('Error de conexión');
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      imageUrl: product.imageUrl || '',
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al eliminar');
        return;
      }

      setSuccessMessage('Producto eliminado');
      loadProducts();
    } catch (err) {
      setError('Error de conexión');
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al agregar al carrito');
        return;
      }

      setSuccessMessage('Producto agregado al carrito');
    } catch (err) {
      setError('Error de conexión');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-400">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Productos</h1>
          <p className="text-slate-500">{isAdmin ? 'Gestiona el inventario' : 'Explora nuestros productos'}</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">{successMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {isAdmin && (
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h2 className="font-bold text-lg mb-4">{editingId ? 'Editar' : 'Nuevo'} Producto</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Nombre</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nombre del producto"
                    className="input"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Precio</label>
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Stock</label>
                    <input
                      name="stock"
                      type="number"
                      value={formData.stock}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="input"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">URL Imagen</label>
                  <input
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Descripción</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descripción..."
                    className="input h-24 resize-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="btn-primary flex-1">
                    {editingId ? 'Actualizar' : 'Crear'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setFormData({ name: '', description: '', price: '', stock: '', imageUrl: '' });
                      }}
                      className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        <div className={isAdmin ? 'lg:col-span-2' : 'lg:col-span-3'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.length === 0 ? (
              <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-400">No hay productos</p>
              </div>
            ) : (
              products.map((product) => (
                <div key={product.id} className="card flex flex-col">
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{product.name}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2 mt-1 mb-4">{product.description}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100 mb-4">
                    <span className="font-bold text-blue-600">${product.price}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.stock > 0 ? `${product.stock} en stock` : 'Sin stock'}
                    </span>
                  </div>
                  <div className={`flex gap-2 ${isAdmin ? 'flex-col' : ''}`}>
                    {isAdmin ? (
                      <>
                        <button
                          onClick={() => handleEdit(product)}
                          className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex-1 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                        >
                          🗑️ Eliminar
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        disabled={product.stock === 0}
                        className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                      >
                        🛒 Agregar al carrito
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


