import { accessories, baseStyles, bodyBases, outfitThemes, sizeOptions } from "@/data/figure-options";
import type { AccessoryId, FigureConfig } from "@/types/figure";

const allowedImageMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxImageFileSizeBytes = 5 * 1024 * 1024;
const maxNoteLength = 600;
const maxNameLength = 80;
const maxEmailLength = 120;
const maxPhoneLength = 30;
const maxImageUrlLength = 500;
const maxAccessoryCount = 3;

const bodyBaseIds = new Set<string>(bodyBases.map((item) => item.id));
const sizeIds = new Set<string>(sizeOptions.map((item) => item.id));
const outfitThemeIds = new Set<string>(outfitThemes.map((item) => item.id));
const accessoryIds = new Set<string>(accessories.map((item) => item.id));
const baseStyleIds = new Set<string>(baseStyles.map((item) => item.id));

type ValidationSuccess = {
  success: true;
  data: {
    customerName: string;
    email: string;
    phone: string;
    note: string;
    imageUrl: string;
    imageFileName: string;
    config: FigureConfig;
  };
};

type ValidationFailure = {
  success: false;
  message: string;
};

export type InquiryValidationResult = ValidationSuccess | ValidationFailure;

function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  return /^[0-9+()\-\s]{8,20}$/.test(value);
}

function isSafeImageUrl(value: string) {
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") && value.length <= maxImageUrlLength;
  } catch {
    return false;
  }
}

function normalizeAccessories(values: unknown[]) {
  const cleaned = values
    .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    .map((item) => item.trim());

  return [...new Set(cleaned)];
}

function validateConfig(rawConfig: unknown): FigureConfig | null {
  if (!rawConfig || typeof rawConfig !== "object") return null;

  const config = rawConfig as Partial<FigureConfig>;
  const accessoriesValue = Array.isArray(config.accessories) ? normalizeAccessories(config.accessories) : [];

  if (!config.bodyBase || !bodyBaseIds.has(config.bodyBase)) return null;
  if (!config.size || !sizeIds.has(config.size)) return null;
  if (!config.outfitTheme || !outfitThemeIds.has(config.outfitTheme)) return null;
  if (!config.baseStyle || !baseStyleIds.has(config.baseStyle)) return null;
  if (accessoriesValue.length > maxAccessoryCount) return null;
  if (accessoriesValue.some((item) => !accessoryIds.has(item))) return null;

  const theme = outfitThemes.find((item) => item.id === config.outfitTheme);
  if (!theme) return null;

  const outfitColor = typeof config.outfitColor === "string" ? config.outfitColor.trim() : "";
  if (!theme.palette.includes(outfitColor)) return null;

  return {
    bodyBase: config.bodyBase,
    size: config.size,
    outfitTheme: config.outfitTheme,
    outfitColor,
    accessories: accessoriesValue as AccessoryId[],
    baseStyle: config.baseStyle,
  };
}

export async function validateInquiryForm(formData: FormData): Promise<InquiryValidationResult> {
  const customerName = cleanText(String(formData.get("customerName") ?? ""));
  const email = cleanText(String(formData.get("email") ?? ""));
  const phone = cleanText(String(formData.get("phone") ?? ""));
  const note = cleanText(String(formData.get("note") ?? ""));
  const imageUrl = cleanText(String(formData.get("imageUrl") ?? ""));
  const honeypot = cleanText(String(formData.get("company") ?? ""));
  const imageFile = formData.get("imageFile");
  const configRaw = String(formData.get("config") ?? "{}");

  if (honeypot) {
    return { success: false, message: "Yêu cầu không hợp lệ." };
  }

  if (!customerName || customerName.length < 2 || customerName.length > maxNameLength) {
    return { success: false, message: "Vui lòng nhập họ tên hợp lệ." };
  }

  if (!email || email.length > maxEmailLength || !isValidEmail(email)) {
    return { success: false, message: "Vui lòng nhập email hợp lệ." };
  }

  if (!phone || phone.length > maxPhoneLength || !isValidPhone(phone)) {
    return { success: false, message: "Vui lòng nhập số điện thoại hợp lệ." };
  }

  if (note.length > maxNoteLength) {
    return { success: false, message: "Phần ghi chú đang quá dài." };
  }

  if (imageUrl && !isSafeImageUrl(imageUrl)) {
    return { success: false, message: "Link ảnh chưa hợp lệ." };
  }

  if (imageFile instanceof File && imageFile.size > 0) {
    if (!allowedImageMimeTypes.has(imageFile.type)) {
      return { success: false, message: "Ảnh tải lên cần là JPG, PNG hoặc WEBP." };
    }

    if (imageFile.size > maxImageFileSizeBytes) {
      return { success: false, message: "Ảnh tải lên cần nhỏ hơn 5MB." };
    }
  }

  let parsedConfig: unknown = null;

  try {
    parsedConfig = JSON.parse(configRaw);
  } catch {
    return { success: false, message: "Cấu hình mẫu chưa hợp lệ." };
  }

  const config = validateConfig(parsedConfig);
  if (!config) {
    return { success: false, message: "Cấu hình mẫu chưa hợp lệ." };
  }

  return {
    success: true,
    data: {
      customerName,
      email,
      phone,
      note,
      imageUrl,
      imageFileName: imageFile instanceof File ? cleanText(imageFile.name).slice(0, 180) : "",
      config,
    },
  };
}
