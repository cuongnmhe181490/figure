"use client";

import dynamic from "next/dynamic";
import { accessories, baseStyles, bodyBases, outfitThemes, sizeOptions } from "@/data/figure-options";
import type { FigureConfig } from "@/types/figure";

const FigureCanvas = dynamic(
  () => import("@/components/configurator/figure-canvas").then((mod) => mod.FigureCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[420px] items-center justify-center rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(233,210,183,0.18),_transparent_48%),linear-gradient(180deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0.02))] text-sm text-stone-400">
        Đang chuẩn bị bản xem trước...
      </div>
    ),
  },
);

type FigurePreviewProps = {
  config: FigureConfig;
};

export function FigurePreview({ config }: FigurePreviewProps) {
  const body = bodyBases.find((item) => item.id === config.bodyBase) ?? bodyBases[0];
  const size = sizeOptions.find((item) => item.id === config.size) ?? sizeOptions[1];
  const outfit = outfitThemes.find((item) => item.id === config.outfitTheme) ?? outfitThemes[0];
  const base = baseStyles.find((item) => item.id === config.baseStyle) ?? baseStyles[0];
  const selectedAccessories = accessories.filter((item) => config.accessories.includes(item.id));

  return (
    <aside className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0.03))] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
      <div className="rounded-[30px] border border-white/8 bg-[#16110f] p-3">
        <div className="mb-3 flex items-center justify-between px-2 pt-2">
          <div>
            <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Xem trước</p>
            <h3 className="text-lg font-semibold text-stone-100">Phiên bản bạn đang chọn</h3>
          </div>
          <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-stone-300">
            Cá nhân hoá từ ảnh của bạn
          </div>
        </div>
        <div className="h-[420px] overflow-hidden rounded-[28px]">
          <FigureCanvas config={config} />
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[24px] border border-white/8 bg-white/4 p-4">
          <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Body</p>
          <p className="mt-2 font-semibold text-stone-100">{body.name}</p>
          <p className="text-sm text-stone-400">{size.label}</p>
        </div>
        <div className="rounded-[24px] border border-white/8 bg-white/4 p-4">
          <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Outfit</p>
          <p className="mt-2 font-semibold text-stone-100">{outfit.name}</p>
          <div className="mt-2 flex items-center gap-2 text-sm text-stone-400">
            <span className="h-4 w-4 rounded-full border border-white/10" style={{ backgroundColor: config.outfitColor }} />
            {config.outfitColor}
          </div>
        </div>
        <div className="rounded-[24px] border border-white/8 bg-white/4 p-4">
          <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Phụ kiện</p>
          <p className="mt-2 font-semibold text-stone-100">
            {selectedAccessories.length > 0
              ? selectedAccessories.map((item) => item.name).join(", ")
              : "Chưa chọn phụ kiện"}
          </p>
        </div>
        <div className="rounded-[24px] border border-white/8 bg-white/4 p-4">
          <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Đế trưng bày</p>
          <p className="mt-2 font-semibold text-stone-100">{base.name}</p>
          <p className="text-sm text-stone-400">{base.description}</p>
        </div>
      </div>
    </aside>
  );
}
