# ⚡ Quick Start - FakeStoreAPI

## 🚀 Inicio Rápido (5 minutos)

### 1. Instala dependencias
```bash
npm install
```

### 2. Configura la BD y carga productos
```bash
npm run seed
```
*Esto carga automáticamente ~20 productos de FakeStoreAPI*

### 3. Inicia la aplicación
```bash
npm run dev
```

### 4. Accede a la tienda
```
http://localhost:3000/products
```

---

## 👥 Usuarios de Prueba

### Admin (Gestiona productos)
```
Email: admin@example.com
Password: password123
```
**Permisos:** Ver, crear, editar, eliminar productos

### Cliente (Realiza compras)
```
Email: cliente@example.com
Password: password123
```
**Permisos:** Ver productos, hacer compras, ver sus órdenes

---

## 📦 Qué Verás

✅ **~20 Productos** de categorías:
- Electrónica (laptops, móviles, tablets)
- Joyería (anillos, collares, pulseras)
- Ropa Hombre
- Ropa Mujer

✅ **Información de Cada Producto:**
- Imagen (desde FakeStoreAPI)
- Nombre y descripción
- Precio
- Stock disponible

✅ **Funcionalidades:**
- Filtro: Ver todos o solo disponibles
- Selector de cantidad
- Carrito (órdenes)
- Gestión de órdenes

---

## 🛒 Proceso de Compra (Cliente)

1. **Inicia sesión** como cliente
2. **Ve Productos** en el menú
3. **Selecciona cantidad** en cualquier producto
4. **Haz clic "Comprar"**
5. **Ve Órdenes** para confirmar

---

## ⚙️ Gestión de Productos (Admin)

1. **Inicia sesión** como admin
2. **Ve Productos** en el menú
3. **Crea nuevo:**
   - Rellena el formulario a la izquierda
   - Haz clic "Crear"
4. **Edita existente:**
   - Haz clic "✏️ Editar" en la card
   - Modifica datos
   - Haz clic "Actualizar"
5. **Elimina:**
   - Haz clic "🗑️ Eliminar"
   - Confirma

---

## 🔄 Flujo Completo

```
┌─────────────────────────────────────┐
│  FakeStoreAPI (Fuente de Datos)     │
│  ~20 productos reales               │
└────────────────┬────────────────────┘
                 │ (seed.js)
┌────────────────▼────────────────────┐
│  Base de Datos (SQLite)             │
│  Productos + Usuarios + Órdenes     │
└────────────────┬────────────────────┘
                 │ (API Routes)
┌────────────────▼────────────────────┐
│  Página de Productos                │
│  - Visualización                    │
│  - Filtros                          │
│  - Compra                           │
└─────────────────────────────────────┘
```

---

## 📁 Estructura de Archivos Nuevos

```
ecommerce-app/
├── src/
│   ├── lib/
│   │   ├── fakestore-api.ts        ← Integración con API
│   │   └── product-helpers.ts       ← Utilidades
│   └── components/
│       └── ProductCard.tsx          ← Card de producto
│
├── FAKESTORE_INTEGRATION.md         ← Documentación completa
├── GUIA_PRUEBAS_FAKESTORE.md        ← Guía de pruebas
└── CAMBIOS_FAKESTORE.md             ← Resumen de cambios
```

---

## 🎨 Features Destacadas

### Para Clientes
- 🖼️ **Imágenes reales** de cada producto
- 💰 **Precios realistas** ($2 - $1000+)
- 📦 **Stock disponible** siempre visible
- 🔍 **Filtro rápido** (todos/disponibles)
- 📱 **Responsive** (funciona en móvil)

### Para Admin
- ➕ **Agregar productos** manualmente
- ✏️ **Editar** cualquier producto
- 🗑️ **Eliminar** productos
- 📊 **Ver stock** de todos
- 👀 **Monitorear órdenes**

---

## 🔍 Pruebas Rápidas

### ✅ Prueba 1: Productos cargan
```
1. Ve a /products
2. Verifica que ves ~20 productos
3. Cada uno tiene imagen y precio
```

### ✅ Prueba 2: Comprar producto
```
1. Inicia como cliente
2. Selecciona cantidad
3. Haz clic "Comprar"
4. Ve a /orders
5. Verifica que aparece tu orden
```

### ✅ Prueba 3: Admin crea producto
```
1. Inicia como admin
2. Rellena formulario
3. Haz clic "Crear"
4. Verifica que aparece en la lista
```

---

## 🆘 Troubleshooting

| Problema | Solución |
|----------|----------|
| No veo productos | Ejecuta `npm run seed` |
| Las imágenes no cargan | Es normal, tienen fallback gris |
| No puedo comprar | Inicia sesión como cliente |
| No veo el formulario | Solo admin lo ve, inicia como admin |
| Error de stock | Selecciona cantidad válida |

---

## 📞 Comandos Útiles

```bash
# Desarrollo
npm run dev              # Inicia la app

# Base de datos
npm run seed            # Carga productos de FakeStoreAPI
npm run db:push         # Sincroniza schema
npm run db:reset        # Reinicia BD (pierde datos)

# Build
npm run build           # Compila para producción
npm run start           # Inicia en producción
```

---

## 📚 Documentación Adicional

- [FAKESTORE_INTEGRATION.md](./FAKESTORE_INTEGRATION.md) - Detalles técnicos
- [GUIA_PRUEBAS_FAKESTORE.md](./GUIA_PRUEBAS_FAKESTORE.md) - 10 pruebas completas
- [CAMBIOS_FAKESTORE.md](./CAMBIOS_FAKESTORE.md) - Lista de cambios

---

## 🎯 Próximas Mejoras

Considera agregar:
- Búsqueda por nombre
- Filtro por categoría
- Ordenamiento (precio, nombre)
- Sistema de reviews
- Carrito persistente
- Integración de pago

---

**¡Listo! Tu tienda ecommerce con FakeStoreAPI está funcionando 🎉**

Para más información, lee [FAKESTORE_INTEGRATION.md](./FAKESTORE_INTEGRATION.md)
