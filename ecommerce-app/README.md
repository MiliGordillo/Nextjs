# E-commerce App - Trabajo Práctico Final

Este proyecto es una aplicación Full Stack desarrollada para el curso de **Next.js + Prisma ORM**.

## 🚀 Características del Proyecto
- **Frontend Moderno**: Interfaz construida con Next.js 16, React 19 y Tailwind CSS 4.
- **Base de Datos**: Gestión de datos con Prisma ORM y SQLite.
- **Autenticación**: Integración con el sistema de autenticación de Replit (Headers).
- **Control de Acceso**: Protección de rutas por Rol (Admin vs Customer).
- **CRUD Completo**: API dinámica para la gestión de productos.
- **Relaciones**: Modelo de datos relacionado (Usuarios -> Pedidos <- Productos).

## 🛠️ Entidades del Sistema (Modelos)
1. **User**: Almacena información de perfiles y roles.
2. **Product**: Catálogo de artículos con stock y precios.
3. **Order**: Gestiona la relación entre usuarios y productos (compras).

## 🔗 APIs Implementadas
- `/api/products`: 
  - `GET`: Lista todos los productos.
  - `POST`: Crea un nuevo producto (Admin).
- `/api/products/[id]` (**API Dinámica**):
  - `GET`: Obtiene un producto por ID.
  - `PUT`: Actualiza un producto (Admin).
  - `DELETE`: Elimina un producto (Admin).
- `/api/users`: `GET` y `POST` para gestión de usuarios.
- `/api/orders`: Gestión de pedidos.

## 🔑 Credenciales y Autenticación
La aplicación utiliza los headers de Replit para identificar al usuario.
- **Acceso Admin**: El sistema detecta automáticamente si el usuario tiene el rol "admin" en su perfil de Replit o si su ID coincide con el configurado.
- **Protección**: Las rutas `/users` y las APIs de modificación están protegidas para que solo administradores puedan usarlas.

## 📦 Instalación y Despliegue
```bash
npm install
npx prisma db push
npm run dev
```
La aplicación está lista para ser desplegada en servicios como Vercel o Netlify (conectando el repositorio de GitHub).
