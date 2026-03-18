import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://figure1.vercel.app"),
  title: {
    default: "Figure Atelier | Quà tặng figure cá nhân hoá",
    template: "%s | Figure Atelier",
  },
  description:
    "Chọn mẫu, gửi ảnh và nhận tư vấn để hoàn thiện figure cá nhân hoá cho những dịp thật đặc biệt.",
  keywords: [
    "figurine 3d",
    "mô hình 3d cá nhân hóa",
    "custom figure",
    "quà tặng figurine",
    "3d printed figure",
  ],
  openGraph: {
    title: "Figure Atelier",
    description: "Một trải nghiệm chọn mẫu tinh gọn cho figure cá nhân hoá mang dấu ấn riêng.",
    type: "website",
    url: "https://figure1.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Figure Atelier",
    description: "Chọn mẫu, gửi ảnh và nhận tư vấn cho món quà cá nhân hoá chỉ trong vài bước.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${manrope.variable} ${cormorant.variable} bg-[#0b0b0f] text-stone-50 antialiased`}>
        {children}
      </body>
    </html>
  );
}
