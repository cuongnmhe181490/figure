import { Suspense } from "react";
import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { appConfigSummary } from "@/lib/app-config";

export const metadata: Metadata = {
  title: "Admin login",
  description: "Đăng nhập khu vực quản trị đơn hàng và review.",
};

export default function AdminLoginPage() {
  const missingAuthConfig = !appConfigSummary.hasAdminCredentials || !appConfigSummary.hasAdminSessionSecret;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-xl px-5 py-20 sm:px-6 lg:px-8">
        {missingAuthConfig ? (
          <div className="mb-6 rounded-[24px] border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-100">
            Thiếu `ADMIN_EMAIL`, `ADMIN_PASSWORD` hoặc `ADMIN_SESSION_SECRET`. Hãy thêm env này trước khi dùng admin login trên production.
          </div>
        ) : null}
        <Suspense fallback={<div className="text-sm text-stone-400">Đang chuẩn bị đăng nhập...</div>}>
          <AdminLoginForm />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
