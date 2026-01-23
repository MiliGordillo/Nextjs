# ⚡ Quick Start Guide - AdminStore

## 🚀 5 minutos para tener la app funcionando

### Windows
```bash
cd ecommerce-app
setup.bat
```

### Linux/Mac
```bash
cd ecommerce-app
bash setup.sh
```

### Manual (Todos)
```bash
cd ecommerce-app
npm install
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## 🔐 Credenciales de Prueba

```
ADMIN:
📧 admin@example.com
🔑 password123

CLIENTE:
📧 cliente@example.com
🔑 password123
```

## 📍 URL Local
```
http://localhost:3000
```

## 🎯 Qué Hacer Primero

### Como Admin:
1. Loguearse con admin@example.com
2. Ir a `/products` para ver/crear/editar productos
3. Ir a `/orders` para ver todas las órdenes
4. Ir a `/users` para gestionar usuarios

### Como Cliente:
1. Registrarse en `/register` O loguearse con cliente@example.com
2. Ver productos en `/products`
3. Hacer clic en "Agregar al carrito" en un producto
4. Ir a `/orders` para ver tus compras

## 🛠️ Troubleshooting Rápido

### Error: "Cannot find module"
```bash
rm -rf node_modules
npm install
```

### Error: "SQLITE_URL not found"
```bash
npm run prisma:migrate
```

### Error: "Port 3000 is in use"
```bash
npm run dev -- -p 3001  # Usa puerto 3001
```

### Error: "No products"
```bash
npm run prisma:seed
```

## 📁 Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `.env.local` | Variables de entorno |
| `prisma/schema.prisma` | Estructura BD |
| `src/app/layout.tsx` | Layout principal |
| `src/app/api/*` | Endpoints API |
| `package.json` | Dependencias |

## 🎨 Páginas Principales

| Ruta | Descripción | Auth |
|------|-------------|------|
| `/` | Home | ❌ |
| `/login` | Iniciar sesión | ❌ |
| `/register` | Registrarse | ❌ |
| `/products` | Productos | ✅ |
| `/orders` | Órdenes | ✅ |
| `/users` | Usuarios | ✅ (Admin) |

## 🔌 API Rápida

```bash
# Login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'

# Get Productos
curl http://localhost:3000/api/products

# Create Producto (Admin)
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test","price":99,"stock":10}'
```

## 📝 Cambiar Datos de Prueba

Edita `prisma/seed.js` para cambiar:
- Emails de usuarios
- Contraseñas
- Productos iniciales
- Stock inicial

Luego:
```bash
npm run prisma:seed
```

## 💡 Tips

1. **Cambiar puerto**: `npm run dev -- -p 3001`
2. **Resetear BD**: Elimina `prisma/dev.db` y ejecuta `npm run prisma:migrate`
3. **Ver logs**: Abre DevTools (F12) en el navegador
4. **Debugg API**: Usa Postman o Thunder Client

## 🔒 Seguridad Básica

- **Cambiar JWT_SECRET** en `.env.local`
- **Cambiar contraseñas** de usuarios de prueba
- **Usar HTTPS** en producción
- **Validar CORS** si está en dominio diferente

## 📚 Más Información

- `INSTRUCCIONES.md` - Documentación completa
- `CAMBIOS_REALIZADOS.md` - Lista de cambios
- `FUNCIONALIDADES.md` - Descripción de features

## 🚀 Deploy (Opcional)

### Vercel
```bash
npm install -g vercel
vercel
```

### Railway
```bash
railway link
railway up
```

### Render
1. Push a GitHub
2. Conecta repositorio en Render.com
3. Configura variables de entorno
4. Deploy

## ❓ ¿Necesitas Ayuda?

Consulta los logs:
```bash
# Ver logs del servidor
npm run dev

# Ver errores en BD
npm run prisma:studio
```

---

**¡Listo para empezar!** 🎉
