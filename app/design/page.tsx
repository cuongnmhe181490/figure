import type { Metadata } from "next";
import { Suspense } from "react";
import { FigureConfigurator } from "@/components/configurator/figure-configurator";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export const metadata: Metadata = {
  title: "Chọn mẫu figure",
  description: "Chọn mẫu trước trên web, gửi ảnh ngay hoặc gửi sau và để đội ngũ liên hệ tư vấn cho phiên bản cá nhân hoá của bạn.",
};

export default function DesignPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Suspense
          fallback={
            <div className="mx-auto max-w-7xl px-5 py-16 text-sm text-stone-400 sm:px-6 lg:px-8">
              Đang chuẩn bị khu vực chọn mẫu...
            </div>
          }
        >
          <FigureConfigurator />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
