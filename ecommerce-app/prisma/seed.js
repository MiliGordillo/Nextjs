// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Usuarios
  const admin = await prisma.user.upsert({
    where: { email: "admin@shop.com" },
    update: {},
    create: { name: "Admin", email: "admin@shop.com", role: "ADMIN" }
  });

  const customer = await prisma.user.upsert({
    where: { email: "customer@shop.com" },
    update: {},
    create: { name: "Cliente", email: "customer@shop.com", role: "CUSTOMER" }
  });

  // Productos
  const p1 = await prisma.product.create({
    data: {
      name: "Zapatillas Runner",
      description: "Zapatillas livianas para correr.",
      price: 59.99,
      stock: 20,
      imageUrl: "https://via.placeholder.com/300x200"
    }
  });

  const p2 = await prisma.product.create({
    data: {
      name: "Mochila Urbana",
      description: "Mochila resistente para uso diario.",
      price: 39.5,
      stock: 15,
      imageUrl: "https://via.placeholder.com/300x200"
    }
  });

  // Pedido de ejemplo
  await prisma.order.create({
    data: {
      userId: customer.id,
      productId: p1.id,
      quantity: 2,
      status: "PENDING"
    }
  });

  console.log("Seed listo:", { admin, customer, p1, p2 });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
