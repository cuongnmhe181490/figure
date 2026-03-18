import { NextResponse } from "next/server";
import { getOrderById, updateOrderStatus } from "@/lib/order-store";
import type { OrderStatus } from "@/types/order";

export const runtime = "nodejs";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const order = await getOrderById(id);

  if (!order) {
    return NextResponse.json({ success: false, message: "Không tìm thấy đơn." }, { status: 404 });
  }

  return NextResponse.json({ success: true, order });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as { status?: OrderStatus };

    if (!body.status) {
      return NextResponse.json({ success: false, message: "Thiếu trạng thái cần cập nhật." }, { status: 400 });
    }

    const order = await updateOrderStatus(id, body.status);

    if (!order) {
      return NextResponse.json({ success: false, message: "Không tìm thấy đơn." }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Update order status error", error);
    return NextResponse.json({ success: false, message: "Không thể cập nhật trạng thái." }, { status: 500 });
  }
}
