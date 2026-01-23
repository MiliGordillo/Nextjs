import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, isAdmin } from "@/lib/auth";
import { hash } from "bcryptjs";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user || !(await isAdmin())) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user || !(await isAdmin())) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const { name, email, password, role } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nombre, email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "El usuario ya existe" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "CUSTOMER",
      },
    });

    return NextResponse.json(
      {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return NextResponse.json(
      { error: "Error al crear usuario" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user || !(await isAdmin())) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "ID de usuario requerido" },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return NextResponse.json(
      { error: "Error al eliminar usuario" },
      { status: 500 }
    );
  }
}

