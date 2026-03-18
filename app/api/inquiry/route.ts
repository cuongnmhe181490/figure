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
      source: "figure-atelier",
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
              message: "Chưa thể ghi nhận yêu cầu lúc này. Vui lòng thử lại sau ít phút.",
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
        "Yêu cầu đã được ghi nhận. Đội ngũ sẽ liên hệ riêng để tư vấn và hoàn thiện phiên bản phù hợp cho bạn.",
    });
  } catch (error) {
    console.error("Inquiry submit error", error);
    return NextResponse.json(
      { success: false, message: "Có lỗi xảy ra khi gửi yêu cầu." },
      { status: 500 },
    );
  }
}
