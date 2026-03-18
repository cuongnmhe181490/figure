import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { appConfigSummary } from "@/lib/app-config";
import { listOrders } from "@/lib/order-store";

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "Theo dõi đơn hàng, tải model 3D và cập nhật trạng thái cho khách hàng.",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const orders = await listOrders();
  const isCloudReady = appConfigSummary.hasSupabaseServiceEnv && appConfigSummary.hasSupabaseStorageEnv;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        {!isCloudReady ? (
          <div className="mx-auto mt-8 max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="rounded-[24px] border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-100">
              Supabase database/storage chưa được cấu hình đầy đủ. Admin vẫn mở được để dev, nhưng dữ liệu chưa ở trạng thái production-ready.
            </div>
          </div>
        ) : null}
        <AdminDashboard initialOrders={orders} />
      </main>
      <SiteFooter />
    </div>
  );
}
