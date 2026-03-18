import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(18,16,14,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-sm font-semibold tracking-[0.22em] text-stone-100">
            F3D
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-stone-100 uppercase">
              Figure Atelier
            </p>
            <p className="text-xs text-stone-400">Quà tặng cá nhân hoá</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-stone-300 md:flex">
          <a href="#quy-trinh" className="transition hover:text-white">
            Quy trình
          </a>
          <a href="#gia-tri" className="transition hover:text-white">
            Giá trị
          </a>
          <a href="#faq" className="transition hover:text-white">
            FAQ
          </a>
        </nav>

        <Link
          href="/design"
          className="rounded-full border border-[#caa57a]/40 bg-[#e9d2b7] px-5 py-2.5 text-sm font-medium text-stone-950 transition hover:bg-[#f5e4cf]"
        >
          Bắt đầu chọn mẫu
        </Link>
      </div>
    </header>
  );
}
