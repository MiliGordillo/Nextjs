# 🧪 Guía de Pruebas - FakeStoreAPI Integration

## Prerrequisitos
- Base de datos sincronizada (`npm run seed` o similar)
- Aplicación en ejecución (`npm run dev`)
- Usuario autenticado

## 1️⃣ Prueba: Cargar Productos

### Pasos:
1. Abre http://localhost:3000/products
2. Verifica que se cargan ~20 productos de FakeStoreAPI
3. Cada producto debe mostrar:
   - Imagen (desde URL de FakeStoreAPI)
   - Nombre y descripción
   - Precio
   - Stock disponible

### ✅ Esperado:
- Página carga sin errores
- Todos los productos tienen imágenes
- Información de precio y stock visible

---

## 2️⃣ Prueba: Filtro de Productos

### Pasos:
1. En la página de productos, verifica los botones:
   - **"Todos (20)"** - Muestra todos
   - **"Disponibles (X)"** - Solo con stock > 0
2. Haz clic en cada filtro
3. Cuenta los productos mostrados

### ✅ Esperado:
- Los conteos coinciden
- El filtro de "disponibles" excluye productos sin stock

---

## 3️⃣ Prueba: Agregar al Carrito (Cliente)

### Pasos:
1. **Inicia sesión como cliente:**
   - Email: `cliente@example.com`
   - Password: `password123`

2. **Ve a Productos:**
   - Busca cualquier producto con stock > 0
   - Ve el selector de cantidad (mín. 1)
   - Haz clic en "Comprar"

3. **Verifica la orden:**
   - Vé a http://localhost:3000/orders
   - Debería ver la orden recién creada
   - Status: "PENDING"
   - Cantidad correcta

### ✅ Esperado:
- Mensaje de éxito: "✅ Producto agregado al carrito"
- La orden aparece en la página de órdenes
- El stock del producto disminuye en 1

---

## 4️⃣ Prueba: Cantidad de Compra

### Pasos:
1. Abre un producto
2. Cambia la cantidad (ejemplo: 5)
3. Haz clic en "Comprar"
4. Verifica en órdenes

### ✅ Esperado:
- La orden se crea con la cantidad correcta
- Total = Precio × Cantidad
- El stock disminuye correctamente

---

## 5️⃣ Prueba: Stock Insuficiente

### Pasos:
1. Abre un producto con poco stock (ej: 2 unidades)
2. Intenta comprar 10 unidades
3. El input debería limitarse al máximo disponible

### ✅ Esperado:
- El input no permite cantidad > stock disponible
- Se muestra error si intentas comprar más de lo disponible

---

## 6️⃣ Prueba: Producto Sin Stock

### Pasos:
1. Busca un producto con stock = 0
2. Debería mostrar: "Sin stock" en rojo
3. El botón "Comprar" debería estar deshabilitado

### ✅ Esperado:
- No se puede comprar
- UI claramente indica falta de stock

---

## 7️⃣ Prueba: Admin - Crear Producto Manual

### Pasos:
1. **Inicia sesión como admin:**
   - Email: `admin@example.com`
   - Password: `password123`

2. **Ve a Productos:**
   - Verá el formulario de creación en la izquierda
   - Rellena datos:
     - Nombre: "Producto Test"
     - Precio: 99.99
     - Stock: 10
     - Descripción: "Producto de prueba"

3. **Haz clic en "Crear"**

### ✅ Esperado:
- El producto aparece en la lista
- Puedes editarlo o eliminarlo
- El nuevo producto es diferente de los de FakeStoreAPI

---

## 8️⃣ Prueba: Admin - Editar Producto

### Pasos:
1. Como admin, busca cualquier producto
2. Haz clic en "✏️ Editar"
3. El formulario se llena con los datos
4. Cambia el precio o stock
5. Haz clic en "Actualizar"

### ✅ Esperado:
- Los cambios se guardan
- El producto muestra nuevos valores

---

## 9️⃣ Prueba: Admin - Eliminar Producto

### Pasos:
1. Como admin, haz clic en "🗑️ Eliminar"
2. Confirma la eliminación
3. El producto desaparece

### ✅ Esperado:
- El producto se elimina
- Se muestra confirmación
- La lista se actualiza

---

## 🔟 Prueba: Sincronización de BD Vacía

### Pasos:
1. **Elimina la BD:** 
   - Borra `ecommerce.db` (si existe)
   - O ejecuta: `npx prisma db push --force-reset`

2. **Ejecuta seed:**
   ```bash
   npm run seed
   # o
   npx prisma db seed
   ```

3. **Verifica:**
   - Abre http://localhost:3000/products
   - Deberían cargar los productos de FakeStoreAPI

### ✅ Esperado:
- La sincronización ocurre automáticamente
- Aparecen ~20 productos
- Usuario admin y cliente existen

---

## 📊 Resumen de Pruebas

| Prueba | Estado | Notas |
|--------|--------|-------|
| Cargar productos | ✅/❌ | |
| Filtro de productos | ✅/❌ | |
| Agregar al carrito | ✅/❌ | |
| Cantidad correcta | ✅/❌ | |
| Stock insuficiente | ✅/❌ | |
| Producto sin stock | ✅/❌ | |
| Admin - crear | ✅/❌ | |
| Admin - editar | ✅/❌ | |
| Admin - eliminar | ✅/❌ | |
| Sincronización automática | ✅/❌ | |

---

## 🐛 Troubleshooting

### ❌ Las imágenes no carga
- **Causa:** URL de imagen rota
- **Solución:** El componente tiene fallback con imagen placeholder gris

### ❌ "Producto no encontrado"
- **Causa:** ProductId inválido
- **Solución:** Verifica que el producto existe en BD

### ❌ "Stock insuficiente"
- **Causa:** Intentaste comprar más de lo disponible
- **Solución:** Reduce la cantidad

### ❌ Stock no disminuye
- **Causa:** Posible error en la actualización
- **Solución:** Recarga la página

### ❌ No ver órdenes
- **Causa:** Usuario no autenticado o no es propietario
- **Solución:** Inicia sesión con usuario correcto

---

## 💡 Tips

- 📱 Prueba en móvil también (responsive)
- 🖼️ Las imágenes son reales de FakeStoreAPI
- 💰 Los precios varían de $2 a $1000+
- 📦 Stock aleatorio simula inventario real
- 🔐 Admin ve todas las órdenes, cliente solo las suyas

---

**¡Que disfrutes probando tu tienda! 🎉**
