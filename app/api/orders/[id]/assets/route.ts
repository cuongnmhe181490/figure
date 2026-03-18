import { NextResponse } from "next/server";
import { addOrderAsset, getOrderById, saveUpload } from "@/lib/order-store";

export const runtime = "nodejs";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const existingOrder = await getOrderById(id);

    if (!existingOrder) {
      return NextResponse.json({ success: false, message: "Không tìm thấy đơn." }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const kind = String(formData.get("kind") ?? "").trim();

    if (!(file instanceof File) || !kind) {
      return NextResponse.json({ success: false, message: "Thiếu file hoặc loại tài nguyên." }, { status: 400 });
    }

    if (kind === "model" && !file.name.toLowerCase().endsWith(".glb")) {
      return NextResponse.json({ success: false, message: "Model cần ở định dạng .glb." }, { status: 400 });
    }

    const url = await saveUpload(file.name, await file.arrayBuffer(), file.type);

    const order = await addOrderAsset(id, {
      kind: kind === "model" ? "model" : "preview",
      url,
      fileName: file.name,
      uploadedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Upload order asset error", error);
    return NextResponse.json({ success: false, message: "Không thể tải file lúc này." }, { status: 500 });
  }
}
