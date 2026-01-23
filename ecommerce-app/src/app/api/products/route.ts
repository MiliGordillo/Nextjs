import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, isAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user || !(await isAdmin())) {
      return NextResponse.json(
        { error: "No autorizado. Solo administradores pueden crear productos." },
        { status: 401 }
      );
    }

    const { name, description, price, stock, imageUrl } = await req.json();

    if (!name || price === undefined || stock === undefined) {
      return NextResponse.json(
        { error: "Nombre, precio y stock son requeridos" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || "",
        price: parseFloat(price),
        stock: parseInt(stock),
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return NextResponse.json(
      { error: "Error al crear producto" },
      { status: 500 }
    );
  }
}

