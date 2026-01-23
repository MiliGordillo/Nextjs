import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createJWT, setAuthCookie } from "@/lib/auth";
import { compare, hash } from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña requeridos" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 401 }
      );
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    const token = await createJWT({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json(
      {
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
        message: "Sesión iniciada correctamente",
      },
      { status: 200 }
    );

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json(
      { error: "Error al iniciar sesión" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST para iniciar sesión",
    example: {
      email: "admin@example.com",
      password: "password123",
    },
  });
}

