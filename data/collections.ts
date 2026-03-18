import type { FigureConfig } from "@/types/figure";

export type CollectionId =
  | "birthday-signature"
  | "wedding-heirloom"
  | "graduation-mark"
  | "corporate-keepsake";

export type CollectionItem = {
  id: CollectionId;
  title: string;
  category: string;
  description: string;
  accent: string;
  preset: FigureConfig;
};

export const collectionItems: CollectionItem[] = [
  {
    id: "birthday-signature",
    title: "Birthday Signature",
    category: "Sinh nhật",
    description: "Tông ấm, vui tươi và giàu cảm xúc cho những món quà cần tạo thiện cảm ngay từ lần nhìn đầu.",
    accent: "from-[#f2ddc5]/20 via-[#d28f72]/12 to-transparent",
    preset: {
      bodyBase: "hero",
      size: "12cm",
      outfitTheme: "birthday",
      outfitColor: "#D97757",
      accessories: ["balloons", "gift-box"],
      baseStyle: "premium",
    },
  },
  {
    id: "wedding-heirloom",
    title: "Wedding Heirloom",
    category: "Cưới hỏi",
    description: "Nhẹ, thanh và chỉn chu để lưu giữ kỷ niệm trong một phiên bản trang trọng hơn.",
    accent: "from-[#ead7d5]/20 via-[#b98ba1]/12 to-transparent",
    preset: {
      bodyBase: "elegant",
      size: "12cm",
      outfitTheme: "wedding",
      outfitColor: "#E9D5C1",
      accessories: ["flowers", "gift-box"],
      baseStyle: "story",
    },
  },
  {
    id: "graduation-mark",
    title: "Graduation Mark",
    category: "Tốt nghiệp",
    description: "Gọn, hiện đại và có điểm nhấn để món quà vừa ý nghĩa vừa đủ khác biệt.",
    accent: "from-[#d9d4ff]/18 via-[#7c69cf]/10 to-transparent",
    preset: {
      bodyBase: "hero",
      size: "12cm",
      outfitTheme: "graduation",
      outfitColor: "#1E293B",
      accessories: ["trophy", "gift-box"],
      baseStyle: "story",
    },
  },
  {
    id: "corporate-keepsake",
    title: "Corporate Keepsake",
    category: "Quà doanh nghiệp",
    description: "Một lựa chọn tinh tế cho quà tri ân, onboarding hoặc kỷ niệm cột mốc nội bộ.",
    accent: "from-[#d6c6b3]/16 via-[#7d6a59]/10 to-transparent",
    preset: {
      bodyBase: "elegant",
      size: "12cm",
      outfitTheme: "vest",
      outfitColor: "#111827",
      accessories: ["laptop", "coffee"],
      baseStyle: "premium",
    },
  },
];

export const collectionPresetMap = Object.fromEntries(
  collectionItems.map((item) => [item.id, item.preset]),
) as Record<CollectionId, FigureConfig>;

export const isCollectionId = (value: string): value is CollectionId =>
  collectionItems.some((item) => item.id === value);
