import { SocialLinks } from "@/components/shared/social-links";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-white/8 bg-[rgba(255,255,255,0.02)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8 lg:py-12">
        <div className="max-w-xl">
          <p className="text-sm font-semibold tracking-[0.22em] text-stone-100 uppercase">Figure Atelier</p>
          <p className="mt-3 text-sm leading-7 text-stone-400">
            Nơi khách chọn mẫu trước, gửi ảnh ngay hoặc gửi sau qua kênh liên hệ để đội ngũ hoàn thiện món quà mang dấu ấn cá nhân.
          </p>
        </div>

        <div className="flex flex-col gap-5 self-start lg:items-end">
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {["Chọn mẫu dễ dàng", "Gửi ảnh linh hoạt", "Nhận tư vấn riêng"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/8 bg-white/4 px-4 py-2 text-xs tracking-[0.16em] text-stone-300 uppercase"
              >
                {item}
              </span>
            ))}
          </div>

          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
