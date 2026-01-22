// src/app/api/orders/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

type ParamsAny = { params: unknown };
type ParamShape = { id?: string };

export async function GET(_req: NextRequest, { params }: ParamsAny) {
  const p = await params;
  const id = (p as ParamShape)?.id;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { user: true, product: true }
  });
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(order);
}

export async function PUT(req: NextRequest, { params }: ParamsAny) {
  const p = await params;
  const id = (p as ParamShape)?.id;
  const body = await req.json();
  const updated = await prisma.order.update({
    where: { id },
    data: body
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: ParamsAny) {
  const p = await params;
  const id = (p as ParamShape)?.id;
  await prisma.order.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
