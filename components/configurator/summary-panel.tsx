import { accessories, baseStyles, bodyBases, formatCurrency, outfitThemes, sizeOptions } from "@/data/figure-options";
import type { FigureConfig } from "@/types/figure";

type SummaryPanelProps = {
  config: FigureConfig;
};

export function SummaryPanel({ config }: SummaryPanelProps) {
  const body = bodyBases.find((item) => item.id === config.bodyBase) ?? bodyBases[0];
  const size = sizeOptions.find((item) => item.id === config.size) ?? sizeOptions[1];
  const outfit = outfitThemes.find((item) => item.id === config.outfitTheme) ?? outfitThemes[0];
  const base = baseStyles.find((item) => item.id === config.baseStyle) ?? baseStyles[0];
  const selectedAccessories = accessories.filter((item) => config.accessories.includes(item.id));

  return (
    <section className="rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Tóm tắt lựa chọn</p>
          <h3 className="mt-2 text-xl font-semibold text-stone-50">Phiên bản sẽ được dùng để tư vấn</h3>
        </div>
        <div className="rounded-full border border-[#e8c49a]/30 bg-[rgba(235,214,189,0.15)] px-4 py-2 text-sm font-medium text-[#f5ddbc]">
          Giá tham khảo từ {formatCurrency(size.priceFrom)}
        </div>
      </div>

      <dl className="mt-6 grid gap-4 text-sm text-stone-300 md:grid-cols-2">
        <div className="rounded-[22px] border border-white/8 bg-black/10 p-4">
          <dt className="text-stone-500">Dáng mẫu</dt>
          <dd className="mt-1 font-medium text-stone-100">{body.name}</dd>
        </div>
        <div className="rounded-[22px] border border-white/8 bg-black/10 p-4">
          <dt className="text-stone-500">Kích thước</dt>
          <dd className="mt-1 font-medium text-stone-100">{size.label}</dd>
        </div>
        <div className="rounded-[22px] border border-white/8 bg-black/10 p-4">
          <dt className="text-stone-500">Trang phục</dt>
          <dd className="mt-1 font-medium text-stone-100">{outfit.name}</dd>
        </div>
        <div className="rounded-[22px] border border-white/8 bg-black/10 p-4">
          <dt className="text-stone-500">Màu sắc</dt>
          <dd className="mt-1 flex items-center gap-2 font-medium text-stone-100">
            <span className="h-4 w-4 rounded-full border border-white/10" style={{ backgroundColor: config.outfitColor }} />
            {config.outfitColor}
          </dd>
        </div>
        <div className="rounded-[22px] border border-white/8 bg-black/10 p-4">
          <dt className="text-stone-500">Phụ kiện</dt>
          <dd className="mt-1 font-medium text-stone-100">
            {selectedAccessories.length > 0
              ? selectedAccessories.map((item) => item.name).join(", ")
              : "Không thêm phụ kiện"}
          </dd>
        </div>
        <div className="rounded-[22px] border border-white/8 bg-black/10 p-4">
          <dt className="text-stone-500">Đế trưng bày</dt>
          <dd className="mt-1 font-medium text-stone-100">{base.name}</dd>
        </div>
      </dl>
    </section>
  );
}
