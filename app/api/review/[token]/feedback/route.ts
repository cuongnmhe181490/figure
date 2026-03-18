import { NextResponse } from "next/server";
import { addOrderFeedback } from "@/lib/order-store";

export const runtime = "nodejs";

export async function POST(request: Request, context: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await context.params;
    const body = (await request.json()) as { message?: string };
    const message = body.message?.trim() ?? "";

    if (!message) {
      return NextResponse.json({ success: false, message: "Vui lòng nhập phản hồi." }, { status: 400 });
    }

    const order = await addOrderFeedback(token, message);

    if (!order) {
      return NextResponse.json({ success: false, message: "Link review không hợp lệ." }, { status: 404 });
    }

    return NextResponse.json({ success: true, order, message: "Phản hồi đã được ghi nhận." });
  } catch (error) {
    console.error("Submit feedback error", error);
    return NextResponse.json({ success: false, message: "Không thể gửi phản hồi lúc này." }, { status: 500 });
  }
}
