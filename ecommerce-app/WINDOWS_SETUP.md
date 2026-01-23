# 🪟 INSTRUCCIONES PARA WINDOWS

## ⚡ Setup Rápido (2 pasos)

### Paso 1: Doble-click en setup.bat
```
📁 ecommerce-app/
└── setup.bat  ← 👈 DOBLE CLICK
```

### Paso 2: Esperar a que termine
```
🌱 Sembrando datos iniciales...
✅ Setup completado exitosamente!
```

---

## 🛠️ Setup Manual (Si no funciona setup.bat)

### 1. Abrir PowerShell o CMD
- Presionar: `Win + R`
- Escribir: `powershell` o `cmd`
- Presionar: Enter

### 2. Navegar al proyecto
```powershell
cd C:\Users\tu-usuario\TrabajoFinal-NextJS\ecommerce-app
```

### 3. Instalar dependencias
```powershell
npm install
```

### 4. Crear base de datos
```powershell
npm run prisma:migrate
```

### 5. Cargar datos iniciales
```powershell
npm run prisma:seed
```

### 6. Iniciar servidor
```powershell
npm run dev
```

---

## 📝 Información Importante

### Credenciales de Prueba

**ADMIN:**
- 📧 `admin@example.com`
- 🔑 `password123`
- ✅ Acceso: Todo (productos, órdenes, usuarios)

**CLIENTE:**
- 📧 `cliente@example.com`
- 🔑 `password123`
- ✅ Acceso: Ver productos y hacer compras

---

## 🌐 Acceder a la App

Una vez que `npm run dev` esté ejecutando:

1. Abre navegador (Chrome, Edge, Firefox)
2. Ve a: **http://localhost:3000**
3. ¡Listo! 🎉

---

## ❓ Troubleshooting Windows

### ❌ "npm no se reconoce"
**Solución:**
1. Desinstala Node.js completamente
2. Descarga la última versión: https://nodejs.org/
3. Instala y reinicia la computadora
4. Abre PowerShell nuevamente

### ❌ "El archivo setup.bat no funciona"
**Solución:**
- Click derecho en `setup.bat`
- Propiedades
- Marcar "Desbloquear"
- Aplicar
- Aceptar
- Doble-click nuevamente

### ❌ "Puerto 3000 en uso"
**Solución:**
```powershell
npm run dev -- -p 3001
```
Luego accede a: `http://localhost:3001`

### ❌ "Error: SQLITE_URL"
**Solución:**
```powershell
npm run prisma:migrate
npm run prisma:seed
```

### ❌ "Error: No products"
**Solución:**
```powershell
npm run prisma:seed
```

### ❌ "Error: node_modules problems"
**Solución:**
```powershell
# Eliminar node_modules
rmdir /s node_modules

# Limpiar npm
npm cache clean --force

# Reinstalar
npm install
```

---

## 📁 Estructura de Carpetas Windows

```
C:\Users\tu-usuario\TrabajoFinal-NextJS\
└── ecommerce-app\
    ├── setup.bat               ← Doble-click aquí
    ├── package.json
    ├── prisma\
    │   ├── schema.prisma
    │   └── dev.db             ← Base de datos
    ├── src\
    │   ├── app\
    │   ├── lib\
    │   └── hooks\
    └── .env.local
```

---

## 🔧 Verificar Instalación

Abre PowerShell y ejecuta:

```powershell
# Verificar Node
node --version
# Debe mostrar: v18.0.0 o superior

# Verificar npm
npm --version
# Debe mostrar: 9.0.0 o superior

# Verificar dependencias
npm list
# Debe listar: next, react, prisma, etc.
```

---

## 🚀 Pasos Después del Setup

### 1. Ver productos iniciales
1. Abrir http://localhost:3000
2. Click "Iniciar Sesión"
3. admin@example.com / password123
4. Click "📦 Productos"
5. ✅ Ver 6 productos

### 2. Crear un producto nuevo
1. En /products como admin
2. Llenar formulario:
   - Nombre: "Mi Producto"
   - Precio: 99.99
   - Stock: 5
3. Click "Crear Producto"
4. ✅ Aparece en lista

### 3. Hacer una compra (como cliente)
1. Logout
2. Login: cliente@example.com / password123
3. Click "📦 Productos"
4. Click "🛒 Agregar al carrito"
5. Click "🛍️ Mis Órdenes"
6. ✅ Ver la orden creada

---

## 📚 Documentación

Abre estos archivos en el editor con los que tengas:

- `QUICK_START.md` - Empezar rápido (5 min)
- `INSTRUCCIONES.md` - Documentación completa
- `FUNCIONALIDADES.md` - Todas las features
- `GUIA_PRUEBAS.md` - Cómo probar
- `RESUMEN_EJECUTIVO.md` - Resumen del proyecto

---

## 🔐 Cambiar Datos de Prueba

### Cambiar contraseña del admin

1. Edita `prisma/seed.js`
2. Busca: `"password123"`
3. Cambia a: `"tu-nueva-contraseña"`
4. Ejecuta:
   ```powershell
   npm run prisma:seed
   ```

### Cambiar email del admin

1. Edita `prisma/seed.js`
2. Busca: `"admin@example.com"`
3. Cambia a: `"tuEmail@dominio.com"`
4. Ejecuta:
   ```powershell
   npm run prisma:seed
   ```

---

## 💾 Limpiar Base de Datos

Si quieres empezar de cero:

```powershell
# Eliminar archivo de BD
del prisma\dev.db

# Recrear BD
npm run prisma:migrate

# Cargar datos iniciales
npm run prisma:seed
```

---

## 🖥️ Usar en Pantalla Dual

Si usas dos monitores:

```powershell
# Terminal en un monitor
npm run dev

# Navegador en otro monitor
http://localhost:3000
```

---

## 🌍 Acceder desde Otra Computadora

**Solo si están en la misma red:**

1. En la PC que corre la app:
   ```powershell
   ipconfig
   ```
   Busca: "IPv4 Address" (ej: 192.168.1.100)

2. Desde otra PC en navegador:
   ```
   http://192.168.1.100:3000
   ```

---

## 📝 Crear Atajo en Escritorio

1. Click derecho en `setup.bat`
2. "Enviar a" → "Escritorio (crear acceso directo)"
3. Renombrar a "AdminStore Setup"
4. Doble-click para correr

---

## 🎯 Próximas Pruebas

### Crear varios productos
- Laptop: $1299.99
- Mouse: $29.99
- Teclado: $89.99

### Crear órdenes
1. Login como cliente
2. Agregar 2 laptops al carrito
3. Ver orden creada

### Cambiar estado
1. Login como admin
2. Ir a órdenes
3. Cambiar "PENDING" → "PROCESSING" → "SHIPPED"

---

## 🆘 Ayuda Rápida

| Problema | Comando |
|----------|---------|
| Reiniciar servidor | Ctrl + C, luego `npm run dev` |
| Ver logs | Consola mostrará los logs |
| Detener app | Ctrl + C |
| Abrir BD | `npm run prisma:studio` |
| Migrar BD | `npm run prisma:migrate` |

---

## ✅ Checklist Final

- [ ] Instalé Node.js (v18+)
- [ ] Ejecuté setup.bat o manual setup
- [ ] Servidor está corriendo (`npm run dev`)
- [ ] Abro http://localhost:3000
- [ ] Puedo logearme como admin
- [ ] Veo los 6 productos iniciales
- [ ] Puedo crear productos
- [ ] Puedo logearme como cliente
- [ ] Puedo ver productos como cliente
- [ ] Puedo hacer compras

---

## 📞 Soporte

Si algo no funciona:

1. Lee `GUIA_PRUEBAS.md`
2. Intenta los troubleshooting arriba
3. Resetea todo:
   ```powershell
   del prisma\dev.db
   npm run prisma:migrate
   npm run prisma:seed
   npm run dev
   ```

---

**¡Listo para usar!** 🎉

Cualquier duda, revisa la documentación en los archivos `.md`
