export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#120f0d]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-stone-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-medium text-stone-200">Figure Atelier Demo MVP</p>
          <p>Landing page + configurator cho mô hình 3D cá nhân hóa.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <span>Static-first Next.js</span>
          <span>Ready for Vercel / Cloudflare Pages</span>
          <span>Supabase optional</span>
        </div>
      </div>
    </footer>
  );
}
