import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, isAdmin } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: { user: true, product: true },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Orden no encontrada" },
        { status: 404 }
      );
    }

    if (order.userId !== user.id && !(await isAdmin())) {
      return NextResponse.json(
        { error: "No tienes permiso para ver esta orden" },
        { status: 403 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error al obtener orden:", error);
    return NextResponse.json(
      { error: "Error al obtener orden" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user || !(await isAdmin())) {
      return NextResponse.json(
        { error: "No autorizado. Solo administradores pueden actualizar órdenes." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json(
        { error: "Status es requerido" },
        { status: 400 }
      );
    }

    const validStatuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Status inválido" },
        { status: 400 }
      );
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: { user: true, product: true },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Orden no encontrada" },
        { status: 404 }
      );
    }
    console.error("Error al actualizar orden:", error);
    return NextResponse.json(
      { error: "Error al actualizar orden" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user || !(await isAdmin())) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const { id } = await params;
    await prisma.order.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Orden eliminada correctamente" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Orden no encontrada" },
        { status: 404 }
      );
    }
    console.error("Error al eliminar orden:", error);
    return NextResponse.json(
      { error: "Error al eliminar orden" },
      { status: 500 }
    );
  }
}

