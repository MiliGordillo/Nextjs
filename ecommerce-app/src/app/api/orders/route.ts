// src/app/api/orders/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const orders = await prisma.order.findMany({
    include: { user: true, product: true }
  });
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const body = await req.json();
  const order = await prisma.order.create({ data: body });
  return NextResponse.json(order, { status: 201 });
}
