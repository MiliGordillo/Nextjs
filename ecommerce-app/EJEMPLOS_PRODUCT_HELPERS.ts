/**
 * EJEMPLOS DE USO - Product Helpers
 * 
 * Este archivo muestra cómo usar las funciones disponibles en src/lib/product-helpers.ts
 */

import {
  calculateTotal,
  formatPrice,
  isValidQuantity,
  calculateDiscount,
  calculateTotalWithDiscount,
  getPriceCategory,
  calculateCartStats,
  filterByPriceRange,
  sortByPrice,
  sortByName,
  groupByCategory,
  searchProducts,
  getMostExpensive,
  getCheapest,
  getProductStats,
} from "@/lib/product-helpers";

// ==========================================
// EJEMPLO 1: Calcular Total Simple
// ==========================================
function ejemplo1_calcularTotal() {
  const price = 99.99;
  const quantity = 3;
  const total = calculateTotal(price, quantity);
  console.log(`Total: $${total}`); // 299.97
}

// ==========================================
// EJEMPLO 2: Formatear Precio
// ==========================================
function ejemplo2_formatearPrecio() {
  const precio = 99.99;
  console.log(formatPrice(precio)); // "99,99 USD" (localización ES)

  // Con moneda diferente
  console.log(formatPrice(999.99, "EUR")); // "999,99 EUR"
}

// ==========================================
// EJEMPLO 3: Validar Cantidad
// ==========================================
function ejemplo3_validarCantidad() {
  const cantidad = 5;
  const stockMax = 10;

  if (isValidQuantity(cantidad, stockMax)) {
    console.log("Cantidad válida ✅");
  } else {
    console.log("Cantidad inválida ❌");
  }
}

// ==========================================
// EJEMPLO 4: Calcular Descuento por Cantidad
// ==========================================
function ejemplo4_descuentoPorCantidad() {
  const price = 50;
  const quantity3 = 3;
  const quantity5 = 5;
  const quantity10 = 10;

  console.log(`3 unidades: $${calculateTotal(price, quantity3)}`); // 150 (sin descuento)
  console.log(
    `5 unidades: $${calculateTotal(price, quantity5)} (5% descuento: $${calculateDiscount(quantity5, price)})`
  );
  console.log(
    `10 unidades: $${calculateTotal(price, quantity10)} (10% descuento: $${calculateDiscount(quantity10, price)})`
  );
}

// ==========================================
// EJEMPLO 5: Total con Descuento
// ==========================================
function ejemplo5_totalConDescuento() {
  const producto = { price: 100, quantity: 10 };

  const result = calculateTotalWithDiscount(producto.price, producto.quantity);
  console.log(`
    Subtotal: $${result.subtotal}
    Descuento: $${result.subtotal - result.total}
    Total: $${result.total}
  `);
}

// ==========================================
// EJEMPLO 6: Categoría de Precio
// ==========================================
function ejemplo6_categoriaPrecio() {
  console.log(getPriceCategory(25)); // "budget"
  console.log(getPriceCategory(100)); // "mid"
  console.log(getPriceCategory(500)); // "premium"
}

// ==========================================
// EJEMPLO 7: Estadísticas del Carrito
// ==========================================
function ejemplo7_estadisticasCarrito() {
  const carrito = [
    { price: 100, quantity: 2 },
    { price: 50, quantity: 3 },
    { price: 200, quantity: 1 },
  ];

  const stats = calculateCartStats(carrito);
  console.log(`
    Total de productos: ${stats.totalQuantity}
    Precio total: $${stats.totalPrice}
    Precio promedio por unidad: $${stats.averagePrice}
  `);
}

// ==========================================
// EJEMPLO 8: Filtrar por Rango de Precio
// ==========================================
function ejemplo8_filtrarPorPrecio() {
  const productos = [
    { name: "Producto A", price: 25 },
    { name: "Producto B", price: 75 },
    { name: "Producto C", price: 150 },
    { name: "Producto D", price: 300 },
  ];

  // Productos entre $50 y $200
  const filtered = filterByPriceRange(productos, 50, 200);
  console.log("Productos en rango $50-$200:", filtered);
  // Resultado: [Producto B ($75), Producto C ($150)]
}

// ==========================================
// EJEMPLO 9: Ordenar por Precio
// ==========================================
function ejemplo9_ordenarPorPrecio() {
  const productos = [
    { name: "Caro", price: 500 },
    { name: "Barato", price: 50 },
    { name: "Medio", price: 200 },
  ];

  console.log("Ascendente (barato a caro):");
  sortByPrice(productos, "asc").forEach((p) => console.log(`- ${p.name}: $${p.price}`));

  console.log("\nDescendente (caro a barato):");
  sortByPrice(productos, "desc").forEach((p) => console.log(`- ${p.name}: $${p.price}`));
}

// ==========================================
// EJEMPLO 10: Ordenar por Nombre
// ==========================================
function ejemplo10_ordenarPorNombre() {
  const productos = [
    { name: "Zebra", price: 100 },
    { name: "Almohada", price: 50 },
    { name: "Mesa", price: 200 },
  ];

  const ordenados = sortByName(productos, "asc");
  console.log("Productos ordenados alfabéticamente:");
  ordenados.forEach((p) => console.log(`- ${p.name}`));
  // Resultado: Almohada, Mesa, Zebra
}

// ==========================================
// EJEMPLO 11: Agrupar por Categoría
// ==========================================
function ejemplo11_agruparPorCategoria() {
  const productos = [
    { name: "Laptop", category: "Electrónica" },
    { name: "Mouse", category: "Electrónica" },
    { name: "Pantalón", category: "Ropa" },
    { name: "Camisa", category: "Ropa" },
  ];

  const agrupados = groupByCategory(productos);
  console.log("Productos agrupados:");
  Object.entries(agrupados).forEach(([cat, prods]) => {
    console.log(`\n${cat}:`);
    prods.forEach((p) => console.log(`  - ${p.name}`));
  });
}

// ==========================================
// EJEMPLO 12: Buscar Productos
// ==========================================
function ejemplo12_buscarProductos() {
  const productos = [
    { name: "Laptop Dell", description: "Laptop para desarrollo" },
    { name: "Mouse Logitech", description: "Mouse inalámbrico" },
    { name: "Teclado Mecánico", description: "Teclado para gaming" },
    { name: "Monitor Dell", description: "Monitor 4K" },
  ];

  const resultados = searchProducts(productos, "dell");
  console.log('Búsqueda por "dell":', resultados);
  // Resultado: [Laptop Dell, Monitor Dell]

  const resultados2 = searchProducts(productos, "inalámbrico");
  console.log('Búsqueda por "inalámbrico":', resultados2);
  // Resultado: [Mouse Logitech]
}

// ==========================================
// EJEMPLO 13: Producto Más Caro
// ==========================================
function ejemplo13_masCaroMasBarato() {
  const productos = [
    { name: "Barato", price: 50 },
    { name: "Caro", price: 500 },
    { name: "Medio", price: 200 },
  ];

  const caro = getMostExpensive(productos);
  const barato = getCheapest(productos);

  console.log(`Más caro: ${caro?.name} ($${caro?.price})`);
  console.log(`Más barato: ${barato?.name} ($${barato?.price})`);
}

// ==========================================
// EJEMPLO 14: Estadísticas de Productos
// ==========================================
function ejemplo14_estadisticasProductos() {
  const productos = [
    { price: 50 },
    { price: 100 },
    { price: 150 },
    { price: 200 },
    { price: 500 },
  ];

  const stats = getProductStats(productos);
  console.log(`
    Total de productos: ${stats.count}
    Precio mínimo: $${stats.minPrice}
    Precio máximo: $${stats.maxPrice}
    Precio promedio: $${stats.avgPrice}
    Valor total: $${stats.totalValue}
  `);
}

// ==========================================
// EJEMPLO 15: Caso de Uso Real - Panel de Admin
// ==========================================
function ejemplo15_panelAdmin() {
  interface Producto {
    id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
    description: string;
  }

  const productos: Producto[] = [
    {
      id: "1",
      name: "Laptop Pro",
      price: 999,
      category: "Electrónica",
      stock: 10,
      description: "Laptop de alto rendimiento",
    },
    {
      id: "2",
      name: "Mouse",
      price: 29,
      category: "Electrónica",
      stock: 100,
      description: "Mouse inalámbrico",
    },
    {
      id: "3",
      name: "Camisa",
      price: 49,
      category: "Ropa",
      stock: 50,
      description: "Camisa de algodón",
    },
  ];

  // Panel Admin - Mostrar información útil
  console.log("=== PANEL ADMIN ===\n");

  const stats = getProductStats(productos);
  console.log("📊 Estadísticas Generales:");
  console.log(`  Total de productos: ${stats.count}`);
  console.log(`  Valor inventario: $${stats.totalValue}`);
  console.log(`  Precio promedio: $${stats.avgPrice}\n`);

  console.log("💰 Rango de Precios:");
  console.log(`  Mínimo: $${stats.minPrice}`);
  console.log(`  Máximo: $${stats.maxPrice}\n`);

  console.log("🏷️ Productos por Categoría:");
  const agrupados = groupByCategory(productos);
  Object.entries(agrupados).forEach(([cat, prods]) => {
    console.log(`  ${cat}: ${prods.length} producto(s)`);
  });

  console.log("\n💎 Productos Destacados:");
  const caro = getMostExpensive(productos);
  const barato = getCheapest(productos);
  console.log(`  Más caro: ${caro?.name} ($${caro?.price})`);
  console.log(`  Más barato: ${barato?.name} ($${barato?.price})`);
}

// ==========================================
// EJEMPLO 16: Caso de Uso Real - Carrito de Compras
// ==========================================
function ejemplo16_carritoCompras() {
  interface ItemCarrito {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }

  const carrito: ItemCarrito[] = [
    { id: "1", name: "Laptop", price: 999, quantity: 1 },
    { id: "2", name: "Mouse", price: 29, quantity: 2 },
    { id: "3", name: "Teclado", price: 79, quantity: 1 },
  ];

  console.log("=== CARRITO DE COMPRAS ===\n");

  let subtotal = 0;
  carrito.forEach((item) => {
    const total = calculateTotal(item.price, item.quantity);
    subtotal += total;
    console.log(
      `${item.name} x${item.quantity} = ${formatPrice(total)}`
    );
  });

  const stats = calculateCartStats(carrito);
  console.log(`\nSubtotal: ${formatPrice(subtotal)}`);
  console.log(`Total unidades: ${stats.totalQuantity}`);
  console.log(`Ticket promedio: ${formatPrice(stats.averagePrice)}`);

  // Aplicar descuento si hay 5+ artículos
  if (stats.totalQuantity >= 5) {
    const descuento = subtotal * 0.1;
    console.log(`\n🎉 ¡Descuento aplicado! (10%): ${formatPrice(descuento)}`);
    console.log(`Total final: ${formatPrice(subtotal - descuento)}`);
  }
}

// ==========================================
// EJEMPLO 17: Caso de Uso Real - Búsqueda y Filtrado
// ==========================================
function ejemplo17_busquedaFiltrado() {
  interface Producto {
    name: string;
    description: string;
    price: number;
    category: string;
  }

  const productos: Producto[] = [
    {
      name: "Laptop Gamer",
      description: "Laptop para gaming de alto rendimiento",
      price: 1500,
      category: "Electrónica",
    },
    {
      name: "Laptop Trabajo",
      description: "Laptop ultraportátil para trabajo",
      price: 800,
      category: "Electrónica",
    },
    {
      name: "Mouse Gaming",
      description: "Mouse con LED RGB",
      price: 50,
      category: "Accesorios",
    },
    {
      name: "Teclado Gaming",
      description: "Teclado mecánico RGB",
      price: 120,
      category: "Accesorios",
    },
  ];

  console.log("=== BÚSQUEDA Y FILTRADO ===\n");

  // Caso 1: Buscar "gaming"
  console.log('Búsqueda por "gaming":');
  searchProducts(productos, "gaming").forEach((p) => {
    console.log(`  - ${p.name} ($${p.price})`);
  });

  // Caso 2: Productos entre $50 y $300
  console.log("\nProductos entre $50 y $300:");
  filterByPriceRange(productos, 50, 300).forEach((p) => {
    console.log(`  - ${p.name} ($${p.price})`);
  });

  // Caso 3: Ordenar por precio ascendente
  console.log("\nOrdenados por precio (barato a caro):");
  sortByPrice(productos, "asc").forEach((p) => {
    console.log(`  - ${p.name} ($${p.price})`);
  });
}

// ==========================================
// EJECUTAR EJEMPLOS
// ==========================================

console.log("🎓 EJEMPLOS DE USO - PRODUCT HELPERS\n");
console.log("=====================================\n");

// Descomenta el ejemplo que quieras ver:
// ejemplo1_calcularTotal();
// ejemplo2_formatearPrecio();
// ejemplo3_validarCantidad();
// ejemplo4_descuentoPorCantidad();
// ejemplo5_totalConDescuento();
// ejemplo6_categoriaPrecio();
// ejemplo7_estadisticasCarrito();
// ejemplo8_filtrarPorPrecio();
// ejemplo9_ordenarPorPrecio();
// ejemplo10_ordenarPorNombre();
// ejemplo11_agruparPorCategoria();
// ejemplo12_buscarProductos();
// ejemplo13_masCaroMasBarato();
// ejemplo14_estadisticasProductos();
// ejemplo15_panelAdmin();
// ejemplo16_carritoCompras();
// ejemplo17_busquedaFiltrado();

export {};
