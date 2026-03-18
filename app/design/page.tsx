import type { Metadata } from "next";
import { FigureConfigurator } from "@/components/configurator/figure-configurator";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export const metadata: Metadata = {
  title: "Thiết kế figure",
  description:
    "Chọn body, size, outfit, phụ kiện và gửi yêu cầu custom figurine 3D cá nhân hóa.",
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
