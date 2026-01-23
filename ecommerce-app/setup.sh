#!/bin/bash

echo "🚀 Iniciando setup de AdminStore E-commerce..."
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📦 Instalando dependencias...${NC}"
npm install

echo -e "${BLUE}🗄️ Configurando base de datos...${NC}"
npm run prisma:migrate

echo -e "${BLUE}🌱 Sembrando datos iniciales...${NC}"
npm run prisma:seed

echo ""
echo -e "${GREEN}✅ Setup completado exitosamente!${NC}"
echo ""
echo -e "${BLUE}📝 Información de acceso:${NC}"
echo ""
echo "Admin:"
echo "  Email: admin@example.com"
echo "  Contraseña: password123"
echo ""
echo "Cliente:"
echo "  Email: cliente@example.com"
echo "  Contraseña: password123"
echo ""
echo -e "${BLUE}🚀 Para iniciar el servidor de desarrollo:${NC}"
echo "  npm run dev"
echo ""
echo "La aplicación estará disponible en: http://localhost:3000"
