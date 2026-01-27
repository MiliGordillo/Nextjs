'use client';

import { useState } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  onAddToCart: (productId: string, quantity: number) => void;
  isLoading?: boolean;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  stock,
  imageUrl,
  onAddToCart,
  isLoading = false,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (quantity < 1 || quantity > stock) return;
    
    setIsAdding(true);
    try {
      await onAddToCart(id, quantity);
      setQuantity(1);
    } finally {
      setIsAdding(false);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, Math.min(value, stock)));
  };

  const isOutOfStock = stock === 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Imagen */}
      <div className="w-full h-48 bg-gray-200 overflow-hidden flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="16"%3ENo disponible%3C/text%3E%3C/svg%3E';
            }}
          />
        ) : (
          <div className="text-gray-400">Sin imagen</div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col h-full">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
          {name}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Precio */}
        <div className="mb-3">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            ${price.toFixed(2)}
          </div>
          <div className={`text-sm font-medium ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
            {isOutOfStock ? 'Sin stock' : `Stock: ${stock}`}
          </div>
        </div>

        {/* Cantidad y Botón */}
        {!isOutOfStock && (
          <div className="flex gap-2 items-center">
            <input
              type="number"
              min="1"
              max={stock}
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
              disabled={isAdding || isLoading}
            />
            <button
              onClick={handleAddToCart}
              disabled={isAdding || isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-3 rounded transition-colors text-sm"
            >
              {isAdding ? 'Agregando...' : 'Comprar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
