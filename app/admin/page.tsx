import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { listOrders } from "@/lib/order-store";

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "Theo dõi đơn hàng, tải model 3D và cập nhật trạng thái cho khách hàng.",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const orders = await listOrders();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <AdminDashboard initialOrders={orders} />
      </main>
      <SiteFooter />
    </div>
  );
}
