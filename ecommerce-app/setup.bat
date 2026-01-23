@echo off
echo.
echo 🚀 Iniciando setup de AdminStore E-commerce...
echo.

echo 📦 Instalando dependencias...
call npm install

echo.
echo 🗄️ Configurando base de datos...
call npm run prisma:migrate

echo.
echo 🌱 Sembrando datos iniciales...
call npm run prisma:seed

echo.
echo ✅ Setup completado exitosamente!
echo.
echo 📝 Información de acceso:
echo.
echo Admin:
echo   Email: admin@example.com
echo   Contraseña: password123
echo.
echo Cliente:
echo   Email: cliente@example.com
echo   Contraseña: password123
echo.
echo 🚀 Para iniciar el servidor de desarrollo:
echo   npm run dev
echo.
echo La aplicación estará disponible en: http://localhost:3000
echo.
pause
