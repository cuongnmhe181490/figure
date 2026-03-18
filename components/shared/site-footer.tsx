export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#120f0d]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-stone-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-medium text-stone-200">Figure Atelier</p>
          <p>Quà tặng cá nhân hoá được hoàn thiện theo câu chuyện riêng của bạn.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <span>Chọn mẫu dễ dàng</span>
          <span>Tư vấn riêng</span>
          <span>Hoàn thiện tinh tế</span>
        </div>
      </div>
    </footer>
  );
}
