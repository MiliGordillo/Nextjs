# ⚡ Checklist de Instalación - FakeStoreAPI

## 🎯 Tu Tienda en 5 Minutos

### Paso 1: Instalar Dependencias
```bash
cd ecommerce-app
npm install
```
**Esperado**: Sin errores ✅

### Paso 2: Sincronizar Base de Datos
```bash
npm run seed
```
**Esperado**: ~20 productos cargados de FakeStoreAPI ✅

### Paso 3: Iniciar Aplicación
```bash
npm run dev
```
**Esperado**: La app inicia en http://localhost:3000 ✅

### Paso 4: Acceder a Productos
```
http://localhost:3000/products
```
**Esperado**: Ver ~20 productos con imágenes ✅

---

## ✅ Verificación Rápida

### Productos Cargados
```
[ ] ¿Ves ~20 productos?
[ ] ¿Cada uno tiene imagen?
[ ] ¿Muestran precio?
[ ] ¿Se ve el stock?
[ ] ¿Hay filtros (Todos/Disponibles)?
```

### Funcionalidad de Cliente
```
[ ] Inicia con: cliente@example.com / password123
[ ] Puedes ver los productos
[ ] Puedes seleccionar cantidad
[ ] Puedes hacer clic "Comprar"
[ ] Ves un mensaje de éxito
[ ] Aparece en /orders
```

### Funcionalidad de Admin
```
[ ] Inicia con: admin@example.com / password123
[ ] Ves el formulario de creación
[ ] Puedes rellenar datos
[ ] Puedes crear producto
[ ] Ves botones de editar/eliminar
[ ] Puedes modificar productos
```

---

## 📚 Documentación Requerida

Lee estos archivos en orden:

1. **[COMENZAR_AQUI_FAKESTORE.md](./COMENZAR_AQUI_FAKESTORE.md)** ⭐
   - Intro rápida
   - Usuarios de prueba
   - FAQ básicas

2. **[QUICKSTART_FAKESTORE.md](./QUICKSTART_FAKESTORE.md)** ⭐⭐
   - Inicio paso a paso
   - Procesos completos
   - Pruebas rápidas

3. **[GUIA_PRUEBAS_FAKESTORE.md](./GUIA_PRUEBAS_FAKESTORE.md)** ⭐⭐⭐
   - 10 escenarios de prueba
   - Verificar funcionalidad
   - Troubleshooting

---

## 🔍 Problemas Comunes

### ❌ "npm install falla"
```
Solución:
1. Borra node_modules: rm -r node_modules
2. Borra package-lock.json
3. Intenta nuevamente: npm install
```

### ❌ "npm run seed falla"
```
Solución:
1. Verifica que node_modules esté completo
2. Intenta: npx prisma db push
3. Luego: npm run seed
```

### ❌ "Los productos no cargan"
```
Solución:
1. Verifica que la BD se sincronizó
2. Revisa la consola del servidor
3. Accede a http://localhost:3000/api/products directamente
```

### ❌ "Las imágenes no se ven"
```
Solución:
Normal - el componente ProductCard tiene fallback
Las imágenes son URLs reales que a veces pueden fallar
```

### ❌ "No puedo iniciar sesión"
```
Solución:
Usa estos usuarios:
- Cliente: cliente@example.com / password123
- Admin: admin@example.com / password123
```

---

## 🎯 Después de la Instalación

### Lo Que Deberías Ver

**Home (http://localhost:3000/)**
```
- Bienvenida
- Enlace a Productos
- Enlace a Órdenes (si autenticado)
```

**Productos (http://localhost:3000/products)**
```
- ~20 productos de FakeStoreAPI
- Cada uno con:
  - Imagen
  - Nombre
  - Descripción
  - Precio
  - Stock
  - Botón "Comprar"
- Filtros: Todos / Disponibles
```

**Órdenes (http://localhost:3000/orders)**
```
- Lista de compras realizadas
- Cliente ve solo las suyas
- Admin ve todas
```

---

## 💡 Consejos

### Desarrollo Local
- La BD se guarda en `ecommerce.db` (SQLite)
- Los datos persisten entre ejecuciones
- Para resetear: `npm run db:reset` (si existe este script)

### Autenticación de Prueba
- El sistema usa usuarios precargados
- Para cambiar usuarios, edita `prisma/seed.js`
- Para más info: ver sección de Autenticación

### Performance
- Primera vez que accedes a `/api/products` sincroniza
- Las siguientes veces son más rápidas (usa caché)
- Los productos se guardan en la BD

---

## 📊 Comandos Útiles

```bash
# Desarrollo
npm run dev              # Inicia en desarrollo

# Base de Datos
npm run seed            # Carga productos de FakeStoreAPI
npm run db:push         # Sincroniza schema (si existe)
npm run db:reset        # Reinicia BD (si existe)

# Build
npm run build           # Compila para producción
npm run start           # Inicia en producción

# Linting
npm run lint            # Verifica código
npm run format          # Formatea código (si existe)
```

---

## ✨ Características Habilitadas

```
✅ Sincronización automática de FakeStoreAPI
✅ ~20 productos reales
✅ Imágenes dinámicas
✅ Stock disponible
✅ Carrito de compras
✅ Gestión de órdenes
✅ Panel de admin
✅ Filtros de productos
✅ Selector de cantidad
✅ Autenticación por rol
✅ Validaciones
✅ UI responsiva
```

---

## 🎓 Aprendizaje Recomendado

### 1️⃣ Entender la Integración (15 min)
- Lee [FAKESTORE_INTEGRATION.md](./FAKESTORE_INTEGRATION.md)
- Entiende qué es FakeStoreAPI
- Comprende cómo se sincroniza

### 2️⃣ Usar la Aplicación (20 min)
- Compra como cliente
- Crea productos como admin
- Verifica órdenes
- Prueba filtros

### 3️⃣ Analizar el Código (30 min)
- Ve [src/lib/fakestore-api.ts](../src/lib/fakestore-api.ts)
- Ve [src/lib/product-helpers.ts](../src/lib/product-helpers.ts)
- Ve [src/components/ProductCard.tsx](../src/components/ProductCard.tsx)

### 4️⃣ Ver Ejemplos (20 min)
- Lee [EJEMPLOS_PRODUCT_HELPERS.ts](./EJEMPLOS_PRODUCT_HELPERS.ts)
- Copia ejemplos útiles
- Adápta a tu caso

---

## 🚀 Lanzamiento en Producción

Cuando estés listo:

```bash
# 1. Crear build
npm run build

# 2. Iniciar servidor
npm run start

# 3. En producción, usa una BD persistente
# (SQLite local no es ideal para producción,
#  considera PostgreSQL en Vercel, Railway, etc.)
```

---

## 📞 Soporte y Recursos

### Documentación Disponible
- 📖 [COMENZAR_AQUI_FAKESTORE.md](./COMENZAR_AQUI_FAKESTORE.md)
- ⚡ [QUICKSTART_FAKESTORE.md](./QUICKSTART_FAKESTORE.md)
- 🔧 [FAKESTORE_INTEGRATION.md](./FAKESTORE_INTEGRATION.md)
- ✅ [GUIA_PRUEBAS_FAKESTORE.md](./GUIA_PRUEBAS_FAKESTORE.md)
- 📝 [CAMBIOS_FAKESTORE.md](./CAMBIOS_FAKESTORE.md)
- 💡 [EJEMPLOS_PRODUCT_HELPERS.ts](./EJEMPLOS_PRODUCT_HELPERS.ts)
- 🗺️ [DIAGRAMA_INTEGRACION.md](./DIAGRAMA_INTEGRACION.md)
- 📑 [INDICE_FAKESTORE.md](./INDICE_FAKESTORE.md)

### Primeros Pasos
```
1. npm install
2. npm run seed
3. npm run dev
4. http://localhost:3000/products
```

---

## ✅ Checklist Final

- [ ] npm install completado
- [ ] npm run seed sin errores
- [ ] npm run dev funcionando
- [ ] http://localhost:3000 accesible
- [ ] http://localhost:3000/products muestra productos
- [ ] Pude iniciar como cliente
- [ ] Pude comprar un producto
- [ ] Pude ver mis órdenes
- [ ] Pude iniciar como admin
- [ ] Pude crear un producto
- [ ] Leí [COMENZAR_AQUI_FAKESTORE.md](./COMENZAR_AQUI_FAKESTORE.md)
- [ ] Leí [QUICKSTART_FAKESTORE.md](./QUICKSTART_FAKESTORE.md)

---

## 🎉 ¡Felicitaciones!

Si todo está funcionando, ¡tu tienda está lista! 🎉

**Próximo paso**: Lee [COMENZAR_AQUI_FAKESTORE.md](./COMENZAR_AQUI_FAKESTORE.md)

---

**Checklist creado**: 26 de enero de 2025
**Versión**: 1.0.0
**Estado**: ✅ Listo para usar
