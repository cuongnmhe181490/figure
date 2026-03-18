import { apiError, apiSuccess } from "@/lib/api-response";
import { validateInquiryForm } from "@/lib/inquiry-validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { getSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase";

const inquiryLimit = 5;
const inquiryWindowMs = 15 * 60 * 1000;

function getRequestIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  try {
    const rateLimit = checkRateLimit(getRequestIp(request), inquiryLimit, inquiryWindowMs);
    if (!rateLimit.allowed) {
      return apiError("Bạn vừa gửi hơi nhanh. Vui lòng thử lại sau ít phút.", 429);
    }

    const formData = await request.formData();
    const validation = await validateInquiryForm(formData);

    if (!validation.success) {
      return apiError(validation.message, 400);
    }

    const { customerName, email, phone, note, imageUrl, imageFileName, config } = validation.data;

    const payload = {
      customer_name: customerName,
      contact: `${phone} / ${email}`,
      note,
      image_url: imageUrl,
      image_file_name: imageFileName,
      config,
      source: "figure-atelier",
      created_at: new Date().toISOString(),
    };

    if (hasSupabaseEnv) {
      const supabase = getSupabaseServerClient();
      if (supabase) {
        const { error } = await supabase.from("figure_inquiries").insert(payload);

        if (error) {
          if (process.env.NODE_ENV !== "production") {
            console.error("Inquiry storage error", error.message);
          }

          return apiError("Có lỗi xảy ra, vui lòng thử lại sau.", 500);
        }
      }
    } else if (process.env.NODE_ENV !== "production") {
      // Dev-only fallback so the form can be tested without external storage.
      console.log("Figure inquiry fallback payload saved only in dev mode.");
    }

    return apiSuccess({
      message: "Yêu cầu đã được ghi nhận. Đội ngũ sẽ liên hệ riêng để tư vấn và hoàn thiện phiên bản phù hợp cho bạn.",
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Inquiry submit error", error);
    }

    return apiError("Có lỗi xảy ra, vui lòng thử lại sau.", 500);
  }
}
