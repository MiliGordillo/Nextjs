import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const replitDomain = process.env.REPLIT_DEV_DOMAIN || url.host;
  return NextResponse.redirect(`https://${replitDomain}/__replit_auth_logout`);
}
