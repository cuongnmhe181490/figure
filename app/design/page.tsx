import type { Metadata } from "next";
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
        <FigureConfigurator />
      </main>
      <SiteFooter />
    </div>
  );
}
