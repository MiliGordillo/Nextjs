# 📦 Integración con FakeStoreAPI

## ¿Qué es FakeStoreAPI?

FakeStoreAPI es una API pública gratuita que proporciona datos de productos realistas para propósitos de desarrollo y pruebas. Contiene productos de diferentes categorías con precios, descripciones e imágenes reales.

## 🚀 Cambios Implementados

### 1. **Sincronización Automática de Productos**

La aplicación ahora sincroniza automáticamente los productos de FakeStoreAPI cuando:
- La base de datos está vacía (primera ejecución)
- Se accede a la ruta `/api/products` sin productos

**Archivo:** [src/app/api/products/route.ts](src/app/api/products/route.ts)

```typescript
// La función syncProductsFromFakeStore() obtiene los ~20 productos de FakeStoreAPI
// y los almacena en la base de datos con stock aleatorio (20-70 unidades)
```

### 2. **Utilidades de FakeStoreAPI**

Archivo creado: [src/lib/fakestore-api.ts](src/lib/fakestore-api.ts)

Funciones disponibles:
- `getAllProducts()` - Obtiene todos los productos
- `getProductById(id)` - Obtiene un producto específico
- `getProductsByCategory(category)` - Filtra por categoría
- `getAllCategories()` - Obtiene las categorías disponibles
- `getSortedProducts(sort)` - Obtiene productos ordenados

### 3. **Seed Mejorado**

Archivo: [prisma/seed.js](prisma/seed.js)

El script de seed ahora:
- Limpia la base de datos
- Crea usuarios de prueba (admin y cliente)
- **Carga automáticamente ~20 productos de FakeStoreAPI**
- Crea una orden de ejemplo

### 4. **Componente ProductCard**

Archivo creado: [src/components/ProductCard.tsx](src/components/ProductCard.tsx)

Nuevo componente que muestra:
- Imagen del producto (con fallback si no carga)
- Nombre y descripción
- Precio en grande
- Stock disponible
- Selector de cantidad
- Botón de compra

### 5. **Página de Productos Mejorada**

Archivo actualizado: [src/app/products/page.tsx](src/app/products/page.tsx)

Nuevas características:
- ✅ Filtro: Ver todos los productos o solo disponibles
- ✅ Mejor layout: grid de 3 columnas en desktop
- ✅ Componente ProductCard para mejora visual
- ✅ Selector de cantidad antes de comprar
- ✅ Mensajes de éxito/error mejorados
- ✅ Soporte completo para admin (crear, editar, eliminar)

## 📋 Categorías Disponibles en FakeStoreAPI

1. **electronics** - Electrónica
2. **jewelery** - Joyería
3. **men's clothing** - Ropa para hombres
4. **women's clothing** - Ropa para mujeres

## 🔧 Cómo Usar

### Instalar dependencias
```bash
npm install
```

### Ejecutar seed (cargar productos de FakeStoreAPI)
```bash
npm run seed
# o
npx prisma db seed
```

### Iniciar la aplicación
```bash
npm run dev
```

### Acceder a los productos
- **Clientes:** http://localhost:3000/products
- **Admin:** http://localhost:3000/products (verán formulario para crear/editar/eliminar)

## 📊 Datos Precargados

### Usuarios de Prueba
```
Email: admin@example.com
Password: password123
Role: ADMIN

Email: cliente@example.com
Password: password123
Role: CUSTOMER
```

### Productos
- Se cargan automáticamente los ~20 productos de FakeStoreAPI
- Cada producto tiene:
  - Nombre y descripción del API
  - Precio original
  - Imagen del producto
  - Stock aleatorio (20-70 unidades)

## 🛒 Flujo de Compra

1. **Cliente visualiza los productos** - Ver todos o filtrar por disponibilidad
2. **Selecciona cantidad** - Usa el selector en cada card
3. **Agrega al carrito** - Se crea una orden pendiente
4. **Ve sus órdenes** - En http://localhost:3000/orders

## 🔑 API Endpoints

### GET `/api/products`
Obtiene todos los productos (sincroniza con FakeStoreAPI si está vacío)
```json
[
  {
    "id": "cuid...",
    "name": "Product Name",
    "description": "...",
    "price": 19.99,
    "stock": 50,
    "imageUrl": "https://...",
    "createdAt": "2025-01-26T...",
    "updatedAt": "2025-01-26T..."
  }
]
```

### POST `/api/orders`
Crea una nueva orden (requiere autenticación)
```json
{
  "productId": "product-id",
  "quantity": 2
}
```

## 📝 Notas Importantes

- **FakeStoreAPI es pública y gratuita** - No requiere API key
- **Stock es aleatorio en seed** - Para simular inventario variado
- **Las imágenes son URLs reales** - De calidad variable pero funcionales
- **La sincronización es automática** - Solo ocurre si la BD está vacía en GET

## 🎯 Próximas Mejoras (Opcionales)

- [ ] Filtrar por categoría
- [ ] Búsqueda de productos
- [ ] Ordenamiento (precio, nombre)
- [ ] Carrito persistente
- [ ] Sistema de calificaciones
- [ ] Historial de órdenes
- [ ] Reporte de ventas (admin)

---

**¡Tu tienda ahora está lista con productos reales de FakeStoreAPI!** 🎉
