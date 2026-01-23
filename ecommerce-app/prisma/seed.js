const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Sembrando base de datos...");

  // Limpiar datos existentes
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Crear usuarios
  const adminPassword = await hash("password123", 10);
  const customerPassword = await hash("password123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Administrador",
      email: "admin@example.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: "Juan Cliente",
      email: "cliente@example.com",
      password: customerPassword,
      role: "CUSTOMER",
    },
  });

  console.log("✅ Usuarios creados:");
  console.log("  - Admin: admin@example.com / password123");
  console.log("  - Cliente: cliente@example.com / password123");

  // Crear productos
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: "Laptop Pro 15\"",
        description: "Laptop de alta performance para desarrollo y diseño",
        price: 1299.99,
        stock: 10,
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop",
      },
    }),
    prisma.product.create({
      data: {
        name: "Mouse Inalámbrico",
        description: "Mouse preciso y cómodo para uso prolongado",
        price: 29.99,
        stock: 50,
        imageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=400&fit=crop",
      },
    }),
    prisma.product.create({
      data: {
        name: "Teclado Mecánico",
        description: "Teclado mecánico RGB para gamers y desarrolladores",
        price: 89.99,
        stock: 25,
        imageUrl: "https://images.unsplash.com/photo-1587829191301-4b64ac2d5e97?w=500&h=400&fit=crop",
      },
    }),
    prisma.product.create({
      data: {
        name: "Monitor 4K",
        description: "Monitor UltraHD 4K de 27 pulgadas",
        price: 399.99,
        stock: 8,
        imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=400&fit=crop",
      },
    }),
    prisma.product.create({
      data: {
        name: "Auriculares Bluetooth",
        description: "Auriculares inalámbricos con cancelación de ruido",
        price: 149.99,
        stock: 20,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop",
      },
    }),
    prisma.product.create({
      data: {
        name: "Webcam HD",
        description: "Cámara web 1080p con micrófono integrado",
        price: 59.99,
        stock: 15,
        imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=400&fit=crop",
      },
    }),
  ]);

  console.log("✅ Productos creados: " + products.length);

  // Crear órdenes de ejemplo
  const order = await prisma.order.create({
    data: {
      userId: customer.id,
      productId: products[0].id,
      quantity: 1,
      total: products[0].price,
      status: "DELIVERED",
    },
  });

  console.log("✅ Orden de ejemplo creada");
  console.log("\n🎉 Base de datos sembrada exitosamente!");
}

main()
  .catch((e) => {
    console.error("❌ Error sembrando la base de datos:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
