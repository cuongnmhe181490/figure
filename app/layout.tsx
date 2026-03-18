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
  metadataBase: new URL("https://figure-atelier-demo.vercel.app"),
  title: {
    default: "Figure Atelier | Demo custom figurine 3D cá nhân hóa",
    template: "%s | Figure Atelier",
  },
  description:
    "Website demo cho dịch vụ figurine 3D cá nhân hóa: chọn body, outfit, phụ kiện, tải ảnh custom head và gửi yêu cầu tư vấn nhanh.",
  keywords: [
    "figurine 3d",
    "mô hình 3d cá nhân hóa",
    "custom figure",
    "quà tặng figurine",
    "3d printed figure",
  ],
  openGraph: {
    title: "Figure Atelier",
    description:
      "Demo configurator cho dịch vụ mô hình 3D cá nhân hóa, phù hợp để thu lead và public online.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Figure Atelier",
    description:
      "Thiết kế trước figurine 3D cá nhân hóa, upload ảnh và gửi yêu cầu tư vấn chỉ trong vài bước.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${manrope.variable} ${cormorant.variable} bg-[#120f0d] text-stone-50 antialiased`}>
        {children}
      </body>
    </html>
  );
}
