# 🛒 AdminStore E-commerce - Resumen de Funcionalidades

## 📊 Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────┐
│                    INICIO DE SESIÓN                          │
│              (/login, /register, /logout)                    │
└────────────────┬────────────────────────────────────────────┘
                 │
         ┌───────┴────────┐
         │                │
    ┌────▼────┐      ┌───▼─────┐
    │  ADMIN  │      │ CLIENTE  │
    └────┬────┘      └───┬─────┘
         │                │
    ┌────▼──────────┐     │
    │ Panel Admin:  │     │
    │ • Productos   │     │
    │ • Órdenes     │     │
    │ • Usuarios    │     │
    └───────────────┘     │
                          │
                    ┌─────▼────────┐
                    │ Panel Cliente:│
                    │ • Productos   │
                    │ • Mis Órdenes │
                    └──────────────┘
```

## 🔑 Características por Rol

### 👑 ADMINISTRADOR
```
INICIO
├─ 📦 PRODUCTOS
│  ├─ Ver catálogo
│  ├─ ➕ Crear producto
│  ├─ ✏️ Editar producto
│  └─ 🗑️ Eliminar producto
├─ 🛍️ ÓRDENES
│  ├─ Ver todas las órdenes
│  ├─ Actualizar estado
│  └─ Eliminar orden
├─ 👥 USUARIOS
│  ├─ Ver lista de usuarios
│  ├─ ➕ Crear usuario
│  └─ 🗑️ Eliminar usuario
└─ 🚪 CERRAR SESIÓN
```

### 👤 CLIENTE
```
INICIO
├─ 📦 PRODUCTOS
│  ├─ Ver catálogo
│  └─ 🛒 Agregar al carrito
├─ 🛍️ MIS ÓRDENES
│  ├─ Ver mis compras
│  └─ Seguimiento de estado
└─ 🚪 CERRAR SESIÓN
```

## 🗂️ Estructura de Datos

### Users
```
{
  id: "cuid()",
  name: "John Doe",
  email: "john@example.com",
  password: "hashed_password",
  role: "ADMIN" | "CUSTOMER",
  createdAt: "2026-01-22T..."
}
```

### Products
```
{
  id: "cuid()",
  name: "Laptop Pro",
  description: "High-performance laptop",
  price: 1299.99,
  stock: 10,
  imageUrl: "https://...",
  createdAt: "2026-01-22T...",
  updatedAt: "2026-01-22T..."
}
```

### Orders
```
{
  id: "cuid()",
  userId: "cuid()",
  productId: "cuid()",
  quantity: 2,
  total: 2599.98,
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED",
  createdAt: "2026-01-22T...",
  updatedAt: "2026-01-22T..."
}
```

## 🔌 API Endpoints

### 🔐 Autenticación
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | /api/login | Iniciar sesión | ❌ |
| POST | /api/register | Registrar usuario | ❌ |
| POST | /api/logout | Cerrar sesión | ✅ |
| GET | /api/auth/me | Obtener usuario actual | ✅ |

### 📦 Productos
| Método | Ruta | Descripción | Auth | Role |
|--------|------|-------------|------|------|
| GET | /api/products | Listar todos | ❌ | - |
| POST | /api/products | Crear producto | ✅ | ADMIN |
| GET | /api/products/[id] | Obtener uno | ❌ | - |
| PUT | /api/products/[id] | Actualizar | ✅ | ADMIN |
| DELETE | /api/products/[id] | Eliminar | ✅ | ADMIN |

### 🛍️ Órdenes
| Método | Ruta | Descripción | Auth | Role |
|--------|------|-------------|------|------|
| GET | /api/orders | Listar órdenes | ✅ | ADMIN/CUSTOMER |
| POST | /api/orders | Crear orden | ✅ | CUSTOMER |
| GET | /api/orders/[id] | Obtener orden | ✅ | ADMIN/OWNER |
| PUT | /api/orders/[id] | Actualizar estado | ✅ | ADMIN |
| DELETE | /api/orders/[id] | Eliminar orden | ✅ | ADMIN |

### 👥 Usuarios
| Método | Ruta | Descripción | Auth | Role |
|--------|------|-------------|------|------|
| GET | /api/users | Listar usuarios | ✅ | ADMIN |
| POST | /api/users | Crear usuario | ✅ | ADMIN |
| DELETE | /api/users | Eliminar usuario | ✅ | ADMIN |

## 🎨 Interfaz de Usuario

### Páginas Disponibles

#### Públicas (Sin autenticación)
- `/ (Home)` - Página de bienvenida
- `/login` - Formulario de login
- `/register` - Formulario de registro

#### Privadas (Con autenticación)
- `/ (Home)` - Dashboard personalizado
- `/products` - Catálogo/Gestión de productos
- `/orders` - Órdenes (admin ve todas, cliente ve las suyas)
- `/users` - Gestión de usuarios (solo admin)

## 🔒 Seguridad

```
Flujo de Autenticación:
1. Usuario ingresa credenciales
2. Contraseña se verifica con bcryptjs
3. Se genera token JWT
4. Token se almacena en cookie httpOnly
5. Token se envía en cada request
6. Se valida en el servidor
7. Se verifica el rol para acceso
```

## 📈 Estados de Orden

```
PENDING ──► PROCESSING ──► SHIPPED ──► DELIVERED
    │                                       │
    └──────────► CANCELLED ◄────────────────┘
```

## 💾 Base de Datos

```
SQLite (Ubicación: prisma/dev.db)
├── users (tabla de usuarios)
├── products (tabla de productos)
└── orders (tabla de órdenes)
```

## 🚀 Flujo de Compra

```
1. Cliente ve productos en catálogo
2. Cliente hace clic en "Agregar al carrito"
3. Se crea una orden con status PENDING
4. Stock del producto se reduce automáticamente
5. Admin ve la orden en "Órdenes"
6. Admin actualiza status a PROCESSING
7. Admin cambia a SHIPPED
8. Cliente ve orden SHIPPED
9. Admin marca como DELIVERED
10. Cliente ve orden DELIVERED
```

## 🎯 Validaciones

### Al Crear Producto
- ✓ Nombre requerido
- ✓ Precio requerido (> 0)
- ✓ Stock requerido (≥ 0)
- ✓ Solo admin puede crear

### Al Crear Orden
- ✓ Producto debe existir
- ✓ Stock debe ser suficiente
- ✓ Usuario debe estar autenticado
- ✓ Total se calcula automáticamente

### Al Crear Usuario
- ✓ Email único
- ✓ Contraseña mínimo 6 caracteres
- ✓ Nombre requerido
- ✓ Solo admin puede crear

## 🌐 Variables de Entorno

```env
DATABASE_URL="file:./dev.db"           # URL de BD
JWT_SECRET="tu-secreto-largo"          # Clave JWT
NODE_ENV="development"                 # Entorno
```

## 📱 Responsividad

```
Mobile (< 768px)
├─ Navegación colapsada
├─ Menú hamburguesa
└─ Tablas con scroll

Tablet (768px - 1024px)
├─ Navegación visible
├─ Grid responsive
└─ Formularios en 2 columnas

Desktop (> 1024px)
├─ Navegación completa
├─ Sidebar expandido
└─ UI óptima
```

## ✨ Características Especiales

- 🔄 Actualización automática de stock
- 💰 Cálculo automático de totales
- 🔐 Contraseñas hasheadas
- ⏱️ Tokens con expiración
- 🎨 UI/UX moderna
- 📱 Diseño responsive
- 🌙 Tema claro
- ♿ Accesibilidad básica

## 🐛 Manejo de Errores

```
Validación de entrada ──► Procesamiento ──► Respuesta
                              │
                           (Error)
                              │
                         Error JSON
                              │
                         Mostrar al usuario
```

## 📊 Métricas

- Usuarios: 2 de prueba
- Productos: 6 de muestra
- Órdenes: 1 de ejemplo
- Roles: 2 (ADMIN, CUSTOMER)
- Estados de orden: 5 (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)

---

**Aplicación lista para usar y personalizar** ✅
