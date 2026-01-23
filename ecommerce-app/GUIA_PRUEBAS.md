# 🧪 GUÍA DE PRUEBAS - AdminStore

## ✅ Verificar que Todo Funciona

### 1. Instalación ✅
```bash
npm install
# Debería completar sin errores
```

### 2. Base de Datos ✅
```bash
npm run prisma:migrate
npm run prisma:seed
# Debería crear dev.db con datos iniciales
```

### 3. Iniciar Servidor ✅
```bash
npm run dev
# Debería mostrar: "ready - started server on 0.0.0.0:3000"
```

## 🧬 Pruebas de Funcionalidad

### AUTENTICACIÓN

#### Test 1: Registro
1. Ir a `http://localhost:3000/register`
2. Llenar formulario:
   - Nombre: "Test User"
   - Email: "test@example.com"
   - Contraseña: "test1234"
   - Confirmar: "test1234"
3. Click "Crear Cuenta"
4. ✅ Debe redirigir a login
5. ✅ Ver mensaje de éxito

#### Test 2: Login Exitoso
1. Ir a `http://localhost:3000/login`
2. Email: "admin@example.com"
3. Contraseña: "password123"
4. Click "Iniciar Sesión"
5. ✅ Debe redirigir a home
6. ✅ Debe mostrar "Hola, Administrador"

#### Test 3: Login Fallido
1. Ir a `http://localhost:3000/login`
2. Email: "admin@example.com"
3. Contraseña: "incorrecta"
4. Click "Iniciar Sesión"
5. ✅ Debe mostrar error "Contraseña incorrecta"

#### Test 4: Email No Existe
1. Ir a `http://localhost:3000/login`
2. Email: "noexiste@example.com"
3. Contraseña: "password123"
4. Click "Iniciar Sesión"
5. ✅ Debe mostrar error "Usuario no encontrado"

#### Test 5: Logout
1. Hacer login como admin
2. Click en "🚪 Cerrar sesión"
3. ✅ Debe limpiar cookie
4. ✅ Debe volver a home sin logueado

### PRODUCTOS (ADMIN)

#### Test 6: Ver Productos
1. Login como admin
2. Click en "📦 Productos"
3. ✅ Debe ver 6 productos iniciales
4. ✅ Debe ver form de crear producto

#### Test 7: Crear Producto
1. En página /products (admin)
2. Rellenar:
   - Nombre: "Test Product"
   - Precio: "99.99"
   - Stock: "5"
   - Descripción: "Test description"
3. Click "Crear"
4. ✅ Debe aparecer en lista
5. ✅ Debe mostrar mensaje de éxito

#### Test 8: Editar Producto
1. En página /products, click "✏️ Editar" en un producto
2. Cambiar nombre a "Updated Product"
3. Click "Actualizar"
4. ✅ Debe actualizar en lista
5. ✅ Debe mostrar mensaje de éxito

#### Test 9: Eliminar Producto
1. En página /products, click "🗑️ Eliminar"
2. Confirmar en diálogo
3. ✅ Debe desaparecer de lista
4. ✅ Debe mostrar mensaje

### PRODUCTOS (CLIENTE)

#### Test 10: Ver Catálogo Cliente
1. Logout del admin
2. Login como: cliente@example.com / password123
3. Click en "📦 Productos"
4. ✅ Debe ver productos
5. ✅ NO debe ver formulario de crear
6. ✅ Debe ver botón "🛒 Agregar al carrito"

#### Test 11: Agregar al Carrito
1. Como cliente, en /products
2. Click "🛒 Agregar al carrito" en un producto
3. ✅ Debe mostrar mensaje de éxito
4. ✅ Debe crear una orden

### ÓRDENES (ADMIN)

#### Test 12: Ver Todas las Órdenes (Admin)
1. Login como admin
2. Click en "🛍️ Pedidos"
3. ✅ Debe ver todas las órdenes (incluso de otros clientes)
4. ✅ Debe ver estado editable

#### Test 13: Cambiar Estado de Orden
1. En /orders (admin), click en estado
2. Cambiar de "PENDING" a "PROCESSING"
3. ✅ Debe actualizar
4. Cambiar a "SHIPPED"
5. ✅ Debe actualizar
6. Cambiar a "DELIVERED"
7. ✅ Debe actualizar

#### Test 14: Eliminar Orden (Admin)
1. En /orders, click "Eliminar"
2. Confirmar
3. ✅ Debe desaparecer de lista

### ÓRDENES (CLIENTE)

#### Test 15: Ver Mis Órdenes (Cliente)
1. Login como cliente
2. Click en "🛍️ Mis Órdenes"
3. ✅ Debe ver SOLO sus órdenes
4. ✅ NO debe ver órdenes de otros
5. ✅ Debe ver estado actualizado por admin

### USUARIOS (ADMIN)

#### Test 16: Ver Usuarios
1. Login como admin
2. Click en "👥 Usuarios"
3. ✅ Debe ver lista de usuarios
4. ✅ Debe ver roles diferenciados

#### Test 17: Crear Usuario
1. En /users, rellenar:
   - Nombre: "New Admin"
   - Email: "newadmin@example.com"
   - Contraseña: "password123"
   - Rol: "Administrador"
2. Click "Agregar Usuario"
3. ✅ Debe aparecer en tabla
4. ✅ Debe poder loguearse con esas credenciales

#### Test 18: Crear Cliente
1. En /users, rellenar:
   - Nombre: "New Customer"
   - Email: "newcustomer@example.com"
   - Contraseña: "password123"
   - Rol: "Cliente"
2. Click "Agregar Usuario"
3. ✅ Debe aparecer con badge "Cliente"

#### Test 19: Eliminar Usuario
1. En /users, click "Eliminar"
2. Confirmar
3. ✅ Debe desaparecer
4. ✅ NO debe poder loguearse

#### Test 20: Acceso Denegado (Cliente en /users)
1. Login como cliente
2. Intentar ir a `/users`
3. ✅ Debe redirigir a home

## 🔒 PRUEBAS DE SEGURIDAD

#### Test 21: Crear Producto Sin Auth
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Hack","price":10,"stock":10}'
```
✅ Debe retornar: `{"error":"No autorizado"}`

#### Test 22: Editar Producto Como Cliente
1. Login como cliente
2. Intentar ir a `/products` y editar
3. ✅ Form no debe funcionar
4. ✅ Debe mostrar error

#### Test 23: Acceso a /users Sin Admin
1. Login como cliente
2. Intentar ir a `/users`
3. ✅ Debe redirigir a `/`

#### Test 24: Token Inválido
```bash
curl -H "Cookie: authToken=invalid" \
  http://localhost:3000/api/auth/me
```
✅ Debe retornar `{"error":"No autorizado"}`

## 📊 PRUEBAS DE LÓGICA

#### Test 25: Stock Se Reduce
1. Login como admin, ver stock de producto (ej: 10)
2. Logout, login como cliente
3. Agregar 2 unidades al carrito
4. Logout, login como admin
5. Ver stock del producto
6. ✅ Debe ser 8 (10 - 2)

#### Test 26: Total Se Calcula
1. Login como cliente
2. Agregar producto de $50 con cantidad 2
3. Ir a /orders
4. ✅ Total debe ser $100

#### Test 27: Producto Sin Stock
1. Login como admin
2. Crear producto con stock 0
3. Logout, login como cliente
4. Ver producto
5. ✅ Botón debe estar deshabilitado
6. ✅ Debe mostrar "Sin stock"

#### Test 28: Email Único
1. En /register, intentar registrar: cliente@example.com
2. ✅ Debe mostrar error "El usuario ya existe"

## 🖥️ PRUEBAS RESPONSIVE

#### Test 29: Desktop (1920px)
1. Abrir DevTools (F12)
2. Desabilitar device emulation
3. ✅ Debe verse bien en desktop

#### Test 30: Tablet (768px)
1. DevTools → Toggle device toolbar
2. Seleccionar iPad
3. ✅ Debe verse bien
4. ✅ Navegación debe funcionar

#### Test 31: Mobile (375px)
1. DevTools → Toggle device toolbar
2. Seleccionar iPhone
3. ✅ Debe verse bien
4. ✅ Formularios deben ser usables
5. ✅ Tablas deben tener scroll

## 🔍 PRUEBAS DE VALIDACIÓN

#### Test 32: Producto Sin Nombre
1. Admin, /products
2. Dejar nombre vacío
3. Click "Crear"
4. ✅ Debe mostrar: "Nombre requerido" o similar

#### Test 33: Precio Negativo
1. Admin, /products
2. Precio: "-50"
3. Click "Crear"
4. ✅ Debe validar

#### Test 34: Stock Negativo
1. Admin, crear orden con cantidad mayor que stock
2. ✅ Debe mostrar error "Stock insuficiente"

#### Test 35: Contraseña Corta
1. /register
2. Nombre: "Test"
3. Email: "test2@example.com"
4. Contraseña: "12345" (menos de 6)
5. Confirmar: "12345"
6. Click "Crear Cuenta"
7. ✅ Debe mostrar error

## 📋 RESUMEN DE PRUEBAS

Total de pruebas: **35**

| Categoría | Cantidad | Status |
|-----------|----------|--------|
| Autenticación | 5 | ✅ |
| Productos Admin | 4 | ✅ |
| Productos Cliente | 2 | ✅ |
| Órdenes Admin | 3 | ✅ |
| Órdenes Cliente | 1 | ✅ |
| Usuarios | 4 | ✅ |
| Seguridad | 4 | ✅ |
| Lógica | 4 | ✅ |
| Responsive | 3 | ✅ |
| Validación | 4 | ✅ |

## ✅ Checklist Final

- [ ] Todo se instala sin errores
- [ ] BD se inicializa correctamente
- [ ] Login funciona
- [ ] Logout funciona
- [ ] Admin ve todos los features
- [ ] Cliente ve solo sus datos
- [ ] Productos se crean/editan/eliminan
- [ ] Órdenes se crean y actualizan
- [ ] Stock se actualiza automáticamente
- [ ] Totales se calculan correctamente
- [ ] Validaciones funcionan
- [ ] Interfaz es responsive
- [ ] Mensajes de error/éxito aparecen
- [ ] Seguridad está implementada
- [ ] Docs están actualizadas

---

**Si todas las pruebas pasan: ✅ APLICACIÓN LISTA PARA USAR**
