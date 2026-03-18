import type { Metadata } from "next";
import { Suspense } from "react";
import { FigureConfigurator } from "@/components/configurator/figure-configurator";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export const metadata: Metadata = {
  title: "Chọn mẫu figure",
  description: "Chọn mẫu, phong cách, phụ kiện và gửi ảnh để nhận tư vấn cá nhân hoá.",
};

export default function DesignPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Suspense fallback={<div className="mx-auto max-w-7xl px-5 py-16 text-sm text-stone-400 sm:px-6 lg:px-8">Đang chuẩn bị builder...</div>}>
          <FigureConfigurator />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
