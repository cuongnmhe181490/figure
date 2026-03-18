import type {
  Accessory,
  BaseStyle,
  BodyBase,
  FigureConfig,
  OutfitTheme,
  SizeOption,
} from "@/types/figure";

export const bodyBases: BodyBase[] = [
  {
    id: "hero",
    name: "Dáng Năng Động",
    description: "Khoẻ khoắn, hiện đại và nổi bật.",
    silhouette: "sharp",
    accent: "#D97757",
  },
  {
    id: "elegant",
    name: "Dáng Thanh Lịch",
    description: "Mềm mại, sang trọng và tinh tế.",
    silhouette: "rounded",
    accent: "#B88C6B",
  },
];

export const sizeOptions: SizeOption[] = [
  { id: "6cm", label: "Mini 6cm", heightCm: 6, priceFrom: 390000, productionTime: "5-7 ngày" },
  { id: "8cm", label: "Signature 8cm", heightCm: 8, priceFrom: 590000, productionTime: "7-9 ngày" },
  { id: "10cm", label: "Collector 10cm", heightCm: 10, priceFrom: 790000, productionTime: "8-10 ngày" },
  { id: "12cm", label: "Showcase 12cm", heightCm: 12, priceFrom: 1090000, productionTime: "10-14 ngày" },
];

export const outfitThemes: OutfitTheme[] = [
  {
    id: "birthday",
    name: "Sinh nhật",
    description: "Tươi sáng và đầy niềm vui.",
    palette: ["#F3C7B5", "#D97757", "#8F5C47"],
    accent: "#D97757",
  },
  {
    id: "football",
    name: "Bóng đá",
    description: "Năng động, cá tính và nổi bật.",
    palette: ["#0F766E", "#2563EB", "#F97316"],
    accent: "#0F766E",
  },
  {
    id: "streetwear",
    name: "Đường phố",
    description: "Trẻ trung và giàu dấu ấn riêng.",
    palette: ["#1F2937", "#8B5CF6", "#F59E0B"],
    accent: "#1F2937",
  },
  {
    id: "vest",
    name: "Vest",
    description: "Chỉnh chu và sang trọng.",
    palette: ["#111827", "#475569", "#A16207"],
    accent: "#111827",
  },
  {
    id: "wedding",
    name: "Cưới",
    description: "Nhẹ nhàng và đầy kỷ niệm.",
    palette: ["#F8EDE7", "#E9D5C1", "#C08497"],
    accent: "#E9D5C1",
  },
  {
    id: "graduation",
    name: "Tốt nghiệp",
    description: "Trang trọng và đáng nhớ.",
    palette: ["#1E293B", "#7C3AED", "#EAB308"],
    accent: "#1E293B",
  },
];

export const accessories: Accessory[] = [
  { id: "balloons", name: "Bó bóng", description: "Rực rỡ và vui tươi.", color: "#FB7185", category: "celebration" },
  { id: "trophy", name: "Cúp vinh danh", description: "Nổi bật cho dịp chúc mừng.", color: "#F59E0B", category: "award" },
  { id: "soccer-ball", name: "Bóng đá", description: "Hợp quà tặng cho người mê sân cỏ.", color: "#111827", category: "sport" },
  { id: "coffee", name: "Ly cà phê", description: "Nhẹ nhàng và gần gũi.", color: "#92400E", category: "lifestyle" },
  { id: "camera", name: "Máy ảnh mini", description: "Gợi nhắc sở thích riêng.", color: "#334155", category: "hobby" },
  { id: "flowers", name: "Bó hoa", description: "Dịu dàng và lãng mạn.", color: "#EC4899", category: "gift" },
  { id: "gift-box", name: "Hộp quà", description: "Tăng cảm giác trang trọng.", color: "#BE123C", category: "gift" },
  { id: "laptop", name: "Laptop mini", description: "Gọn gàng và hiện đại.", color: "#64748B", category: "work" },
];

export const baseStyles: BaseStyle[] = [
  { id: "classic", name: "Đế Tròn", description: "Gọn gàng và hài hoà.", color: "#D6C1A5" },
  { id: "premium", name: "Đế Nâng", description: "Dày dặn và sang hơn.", color: "#8B6F52" },
  { id: "story", name: "Đế Kỷ Niệm", description: "Phù hợp thêm tên hoặc lời nhắn.", color: "#A78B7A" },
];

export const defaultConfig: FigureConfig = {
  bodyBase: "hero",
  size: "8cm",
  outfitTheme: "streetwear",
  outfitColor: outfitThemes.find((theme) => theme.id === "streetwear")?.palette[0] ?? "#1F2937",
  accessories: ["camera", "coffee"],
  baseStyle: "premium",
};

export const stepLabels = [
  "1. Chọn dáng",
  "2. Chọn phong cách",
  "3. Chọn phụ kiện",
  "4. Gửi ảnh",
  "5. Nhận tư vấn",
] as const;

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
