import { NextResponse } from "next/server";
import { getOrderByReviewToken } from "@/lib/order-store";

export const runtime = "nodejs";

export async function GET(_: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  const order = await getOrderByReviewToken(token);

  if (!order) {
    return NextResponse.json({ success: false, message: "Link review không hợp lệ." }, { status: 404 });
  }

  return NextResponse.json({ success: true, order });
}
