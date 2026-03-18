import { NextResponse } from "next/server";
import { getSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase";
import type { FigureConfig } from "@/types/figure";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const customerName = String(formData.get("customerName") ?? "").trim();
    const contact = String(formData.get("contact") ?? "").trim();
    const note = String(formData.get("note") ?? "").trim();
    const imageUrl = String(formData.get("imageUrl") ?? "").trim();
    const imageFile = formData.get("imageFile");
    const configRaw = String(formData.get("config") ?? "{}");
    const config = JSON.parse(configRaw) as FigureConfig;

    if (!customerName || !contact) {
      return NextResponse.json(
        { success: false, message: "Vui lòng nhập tên và thông tin liên hệ." },
        { status: 400 },
      );
    }

    const payload = {
      customer_name: customerName,
      contact,
      note,
      image_url: imageUrl,
      image_file_name: imageFile instanceof File ? imageFile.name : "",
      config,
      source: "figure-demo-mvp",
      created_at: new Date().toISOString(),
    };

    if (hasSupabaseEnv) {
      const supabase = getSupabaseServerClient();
      if (supabase) {
        const { error } = await supabase.from("figure_inquiries").insert(payload);

        if (error) {
          console.error("Supabase insert error", error);
          return NextResponse.json(
            {
              success: false,
              message: "Đã kết nối database nhưng không lưu được yêu cầu. Kiểm tra bảng figure_inquiries.",
            },
            { status: 500 },
          );
        }
      }
    } else {
      console.log("Figure inquiry fallback payload", payload);
    }

    return NextResponse.json({
      success: true,
      message:
        "Yêu cầu đã được ghi nhận. Ảnh sẽ được dùng để custom phần head sau khi bạn xác nhận đơn.",
    });
  } catch (error) {
    console.error("Inquiry submit error", error);
    return NextResponse.json(
      { success: false, message: "Có lỗi xảy ra khi gửi yêu cầu." },
      { status: 500 },
    );
  }
}
