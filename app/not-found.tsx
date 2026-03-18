import Link from "next/link";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-6 lg:px-8">
        <div className="glass-panel hairline rounded-[36px] p-8">
          <p className="text-sm tracking-[0.22em] text-[#ead3b4] uppercase">Not found</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white">Trang bạn tìm không còn hợp lệ.</h1>
          <p className="mt-5 text-base leading-8 text-stone-400">
            Link review có thể đã sai hoặc không còn tồn tại. Bạn có thể quay lại trang chính hoặc mở builder để tạo một yêu cầu mới.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="premium-button inline-flex items-center justify-center rounded-full border border-white/10 bg-white/6 px-6 py-3 text-sm font-medium text-stone-100"
            >
              Về trang chính
            </Link>
            <Link
              href="/design"
              className="premium-button inline-flex items-center justify-center rounded-full border border-[#f0d9b9]/30 bg-[#ebd7bd] px-6 py-3 text-sm font-medium text-stone-950"
            >
              Mở builder
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
