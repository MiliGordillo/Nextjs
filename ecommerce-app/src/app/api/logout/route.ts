import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Sesión cerrada correctamente" },
    { status: 200 }
  );

  response.cookies.set("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}

export async function GET() {
  const response = NextResponse.json(
    { message: "Use POST para cerrar sesión" },
    { status: 200 }
  );

  response.cookies.set("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}

