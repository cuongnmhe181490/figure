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
    name: "Hero Body",
    description: "Tỉ lệ khỏe khoắn, phù hợp phong cách năng động và thể thao.",
    silhouette: "sharp",
    accent: "#D97757",
  },
  {
    id: "elegant",
    name: "Elegant Body",
    description: "Dáng mềm mại, hợp các concept lễ cưới, tốt nghiệp, quà tặng cao cấp.",
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
    description: "Tone vui nhưng vẫn sang, hợp làm quà tặng cá nhân.",
    palette: ["#F3C7B5", "#D97757", "#8F5C47"],
    accent: "#D97757",
  },
  {
    id: "football",
    name: "Bóng đá",
    description: "Áo thể thao, tinh thần năng động và cá tính.",
    palette: ["#0F766E", "#2563EB", "#F97316"],
    accent: "#0F766E",
  },
  {
    id: "streetwear",
    name: "Streetwear",
    description: "Trẻ trung, hợp outfit urban và quà tặng lifestyle.",
    palette: ["#1F2937", "#8B5CF6", "#F59E0B"],
    accent: "#1F2937",
  },
  {
    id: "vest",
    name: "Vest",
    description: "Lịch lãm cho quà tặng doanh nhân hoặc kỷ niệm công ty.",
    palette: ["#111827", "#475569", "#A16207"],
    accent: "#111827",
  },
  {
    id: "wedding",
    name: "Váy cưới",
    description: "Mềm mại, tinh tế cho concept cặp đôi và lưu niệm ngày cưới.",
    palette: ["#F8EDE7", "#E9D5C1", "#C08497"],
    accent: "#E9D5C1",
  },
  {
    id: "graduation",
    name: "Tốt nghiệp",
    description: "Trang trọng, cảm giác thành tựu và rất hợp quà lưu niệm.",
    palette: ["#1E293B", "#7C3AED", "#EAB308"],
    accent: "#1E293B",
  },
];

export const accessories: Accessory[] = [
  { id: "balloons", name: "Bó bóng", description: "Tăng cảm giác tiệc tùng và sinh nhật.", color: "#FB7185", category: "celebration" },
  { id: "trophy", name: "Cúp vinh danh", description: "Hợp concept thành tựu, giải thưởng, doanh số.", color: "#F59E0B", category: "award" },
  { id: "soccer-ball", name: "Bóng đá", description: "Đi cùng outfit thể thao hoặc fan club.", color: "#111827", category: "sport" },
  { id: "coffee", name: "Ly cà phê", description: "Phù hợp quà tặng dân văn phòng hoặc lifestyle.", color: "#92400E", category: "lifestyle" },
  { id: "camera", name: "Máy ảnh mini", description: "Gợi câu chuyện cá nhân cho người thích du lịch/chụp ảnh.", color: "#334155", category: "hobby" },
  { id: "flowers", name: "Bó hoa", description: "Rất hợp lễ cưới, kỷ niệm hoặc tặng người thương.", color: "#EC4899", category: "gift" },
  { id: "gift-box", name: "Hộp quà", description: "Tạo cảm giác premium cho phiên bản tặng dịp đặc biệt.", color: "#BE123C", category: "gift" },
  { id: "laptop", name: "Laptop mini", description: "Hợp quà công sở, freelancer, dân startup.", color: "#64748B", category: "work" },
];

export const baseStyles: BaseStyle[] = [
  { id: "classic", name: "Classic Round", description: "Đế tròn gọn gàng, phù hợp mọi concept.", color: "#D6C1A5" },
  { id: "premium", name: "Premium Stage", description: "Đế dày hơn, cảm giác trưng bày cao cấp.", color: "#8B6F52" },
  { id: "story", name: "Story Platform", description: "Đế dài hơn để thêm bảng tên hoặc chi tiết kể chuyện.", color: "#A78B7A" },
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
  "1. Chọn body",
  "2. Chọn outfit",
  "3. Phụ kiện & đế",
  "4. Ảnh custom head",
  "5. Gửi yêu cầu",
] as const;

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
