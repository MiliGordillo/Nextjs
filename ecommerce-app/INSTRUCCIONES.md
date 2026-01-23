# AdminStore - E-commerce Management System

Una aplicación completa de e-commerce construida con Next.js, Prisma y SQLite. Incluye gestión de productos, pedidos y usuarios con autenticación basada en JWT.

## 🚀 Características

- ✅ **Autenticación Local**: Sistema de login/registro con JWT y bcrypt
- ✅ **Gestión de Usuarios**: Crear, editar y eliminar usuarios (solo admin)
- ✅ **Gestión de Productos**: CRUD completo de productos con stock
- ✅ **Gestión de Órdenes**: Crear órdenes, actualizar estado y ver historial
- ✅ **Control de Roles**: Diferenciación entre Admin y Cliente
- ✅ **Interfaz Moderna**: Diseño responsive con Tailwind CSS
- ✅ **Base de Datos**: SQLite con Prisma ORM

## 📋 Requisitos

- Node.js 18+
- npm o yarn

## 🔧 Instalación

1. **Clonar el repositorio**
   ```bash
   cd ecommerce-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # El archivo .env.local ya está configurado, pero puedes personalizarlo
   ```

4. **Inicializar la base de datos**
   ```bash
   # Crear las tablas
   npm run prisma:migrate
   
   # Sembrar con datos de prueba
   npm run prisma:seed
   ```

5. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

   La app estará disponible en `http://localhost:3000`

## 👤 Cuentas de Prueba

Después de ejecutar el seed, tienes dos cuentas disponibles:

### Admin
- **Email**: `admin@example.com`
- **Contraseña**: `password123`
- **Permisos**: Gestionar productos, usuarios y órdenes

### Cliente
- **Email**: `cliente@example.com`
- **Contraseña**: `password123`
- **Permisos**: Ver productos y hacer compras

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── api/              # Rutas API
│   │   ├── login/       # Autenticación
│   │   ├── register/    # Registro de usuarios
│   │   ├── logout/      # Cierre de sesión
│   │   ├── products/    # CRUD de productos
│   │   ├── orders/      # CRUD de órdenes
│   │   ├── users/       # CRUD de usuarios (admin)
│   │   └── auth/me/     # Obtener usuario actual
│   ├── login/           # Página de login
│   ├── register/        # Página de registro
│   ├── products/        # Catálogo de productos
│   ├── orders/          # Gestión de órdenes
│   ├── users/           # Gestión de usuarios (admin)
│   └── layout.tsx       # Layout principal
├── lib/
│   ├── prisma.ts        # Cliente de Prisma
│   └── auth/
│       └── index.ts     # Funciones de autenticación
└── hooks/              # Custom React hooks
```

## 🛠️ API Endpoints

### Autenticación
- `POST /api/login` - Iniciar sesión
- `POST /api/register` - Registrar nuevo usuario
- `POST /api/logout` - Cerrar sesión
- `GET /api/auth/me` - Obtener usuario actual

### Productos
- `GET /api/products` - Listar todos los productos
- `POST /api/products` - Crear producto (admin)
- `GET /api/products/[id]` - Obtener producto
- `PUT /api/products/[id]` - Actualizar producto (admin)
- `DELETE /api/products/[id]` - Eliminar producto (admin)

### Órdenes
- `GET /api/orders` - Listar órdenes (admin ve todas, clientes ven las suyas)
- `POST /api/orders` - Crear nueva orden
- `GET /api/orders/[id]` - Obtener detalles de orden
- `PUT /api/orders/[id]` - Actualizar estado (admin)
- `DELETE /api/orders/[id]` - Eliminar orden (admin)

### Usuarios
- `GET /api/users` - Listar usuarios (admin)
- `POST /api/users` - Crear usuario (admin)
- `DELETE /api/users` - Eliminar usuario (admin)

## 🔐 Seguridad

- Contraseñas hasheadas con bcryptjs
- Tokens JWT para sesiones
- Verificación de roles en cada endpoint
- Cookies httpOnly para tokens
- Protección contra SQL injection con Prisma

## 🎨 Personalización

### Cambiar el JWT_SECRET
Edita `.env.local`:
```env
JWT_SECRET="tu-secreto-personalizado-muy-largo"
```

### Cambiar la base de datos
Por defecto usa SQLite, pero puedes cambiar a PostgreSQL, MySQL, etc. en `prisma/schema.prisma`

## 📦 Dependencias Principales

- **Next.js** - Framework React
- **Prisma** - ORM para la base de datos
- **bcryptjs** - Hashing de contraseñas
- **jose** - Manejo de JWT
- **Tailwind CSS** - Estilos CSS

## 🚀 Deployment

Para producción:

1. Build la aplicación
   ```bash
   npm run build
   ```

2. Deployer en Vercel, Netlify, Railway o tu servidor preferido

3. Establecer variables de entorno en tu plataforma

## 📝 Scripts Útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Ejecutar en producción
npm start

# Migrations de Prisma
npm run prisma:migrate
npm run prisma:seed

# Generar cliente de Prisma
npm run prisma:generate

# Linting
npm run lint
```

## 🐛 Solución de Problemas

### Error de conexión a BD
```bash
rm prisma/dev.db
npm run prisma:migrate
npm run prisma:seed
```

### Error de módulos faltantes
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error de autenticación
- Verifica que las cookies estén habilitadas
- Comprueba que JWT_SECRET esté configurado
- Revisa la consola del navegador para errores

## 📄 Licencia

Proyecto académico

## 👨‍💻 Autor

Proyecto desarrollado como trabajo final

## 🤝 Contribuir

Los PRs son bienvenidos. Para cambios grandes, abre un issue primero.
