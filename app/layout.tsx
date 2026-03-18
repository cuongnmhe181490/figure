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
    default: "Figure Atelier | Figure cá nhân hoá làm quà tặng",
    template: "%s | Figure Atelier",
  },
  description:
    "Chọn mẫu trước trên web, gửi ảnh chân dung và để đội ngũ liên hệ tư vấn cho phiên bản figure mang dấu ấn riêng.",
  keywords: [
    "figure cá nhân hoá",
    "quà tặng figure",
    "quà tặng kỷ niệm",
    "figure theo ảnh",
    "custom figure",
  ],
  openGraph: {
    title: "Figure Atelier",
    description: "Chọn mẫu, gửi ảnh và nhận tư vấn để hoàn thiện figure cá nhân hoá cho những dịp đặc biệt.",
    type: "website",
    url: "https://figure1.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Figure Atelier",
    description: "Chọn mẫu phù hợp, phần còn lại để đội ngũ hoàn thiện phiên bản riêng cho bạn.",
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
