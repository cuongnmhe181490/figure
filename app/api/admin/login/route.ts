import { NextResponse } from "next/server";
import { adminSessionCookieName, adminSessionMaxAgeSeconds, createAdminSession } from "@/lib/admin-session";

export const runtime = "nodejs";

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim() ?? "";
    const password = body.password ?? "";

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { success: false, message: "Chưa cấu hình ADMIN_EMAIL và ADMIN_PASSWORD." },
        { status: 500 },
      );
    }

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json({ success: false, message: "Thông tin đăng nhập không đúng." }, { status: 401 });
    }

    const session = await createAdminSession(email);
    const response = NextResponse.json({ success: true });
    response.cookies.set(adminSessionCookieName, session, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: adminSessionMaxAgeSeconds,
    });
    return response;
  } catch (error) {
    console.error("Admin login error", error);
    return NextResponse.json({ success: false, message: "Không thể đăng nhập lúc này." }, { status: 500 });
  }
}
