import { Suspense } from "react";
import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export const metadata: Metadata = {
  title: "Admin login",
  description: "Đăng nhập khu vực quản trị đơn hàng và review.",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-xl px-5 py-20 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-sm text-stone-400">Đang chuẩn bị đăng nhập...</div>}>
          <AdminLoginForm />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
