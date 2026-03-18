import { NextResponse } from "next/server";
import { createOrder, listOrders } from "@/lib/order-store";
import type { FigureConfig } from "@/types/figure";

export const runtime = "nodejs";

export async function GET() {
  const orders = await listOrders();
  return NextResponse.json({ success: true, orders });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const customerName = String(formData.get("customerName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const note = String(formData.get("note") ?? "").trim();
    const imageUrl = String(formData.get("imageUrl") ?? "").trim();
    const imageFile = formData.get("imageFile");
    const configRaw = String(formData.get("config") ?? "{}");
    const config = JSON.parse(configRaw) as FigureConfig;

    if (!customerName || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "Vui lòng nhập tên, email và số điện thoại." },
        { status: 400 },
      );
    }

    const order = await createOrder({
      customerName,
      email,
      phone,
      note,
      imageUrl,
      imageFileName: imageFile instanceof File ? imageFile.name : "",
      config,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      reviewToken: order.reviewToken,
      reviewUrl: `/review/${order.reviewToken}`,
      message: "Yêu cầu đã được tạo. Bạn có thể mở trang review riêng để theo dõi và phản hồi.",
    });
  } catch (error) {
    console.error("Create order error", error);
    return NextResponse.json(
      { success: false, message: "Không thể tạo yêu cầu lúc này." },
      { status: 500 },
    );
  }
}
