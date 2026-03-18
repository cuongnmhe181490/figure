"use client";

import { useEffect, useState } from "react";
import { accessories, baseStyles, bodyBases, outfitThemes, sizeOptions } from "@/data/figure-options";
import { FigureCanvas } from "@/components/configurator/figure-canvas";
import type { FigureConfig } from "@/types/figure";

type FigurePreviewProps = {
  config: FigureConfig;
};

export function FigurePreview({ config }: FigurePreviewProps) {
  const [isFocusOpen, setIsFocusOpen] = useState(false);

  const body = bodyBases.find((item) => item.id === config.bodyBase) ?? bodyBases[0];
  const size = sizeOptions.find((item) => item.id === config.size) ?? sizeOptions[1];
  const outfit = outfitThemes.find((item) => item.id === config.outfitTheme) ?? outfitThemes[0];
  const base = baseStyles.find((item) => item.id === config.baseStyle) ?? baseStyles[0];
  const selectedAccessories = accessories.filter((item) => config.accessories.includes(item.id));

  useEffect(() => {
    if (!isFocusOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFocusOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFocusOpen]);

  const summaryItems = [
    { label: "Phiên bản", value: body.name },
    { label: "Kích thước", value: size.label },
    { label: "Phong cách", value: outfit.name },
    { label: "Đế", value: base.name },
  ];

  return (
    <>
      <aside className="glass-panel hairline rounded-[38px] p-4 sm:p-5">
        <div className="rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,rgba(14,15,20,0.96),rgba(17,18,24,0.9))] p-4 sm:p-5">
          <div className="flex flex-col gap-4 border-b border-white/8 pb-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#ead3b4]/20 bg-[#ead3b4]/10 px-3 py-1 text-[11px] tracking-[0.16em] text-[#f2dec5] uppercase">
                  Xem trước
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-[0.16em] text-stone-300 uppercase">
                  {size.label}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-[0.16em] text-stone-300 uppercase">
                  {outfit.name}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-stone-100 sm:text-3xl">
                  Phiên bản bạn đang chọn
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-7 text-stone-400">
                  Không cần mở toàn màn hình để sử dụng. Bạn vẫn có thể vừa xem mẫu vừa thay đổi lựa chọn một cách nhanh và rõ ràng.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsFocusOpen(true)}
              className="premium-button inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-medium text-stone-100"
            >
              Xem toàn màn hình
            </button>
          </div>

          <div className="mt-5 overflow-hidden rounded-[30px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(234,211,180,0.12),transparent_34%),linear-gradient(180deg,#121318_0%,#101116_100%)]">
            <div className="relative h-[480px] w-full sm:h-[560px]">
              <div className="pointer-events-none absolute left-6 top-6 z-10 rounded-full border border-white/10 bg-[rgba(12,12,16,0.48)] px-3 py-1.5 text-[11px] tracking-[0.16em] text-stone-300 uppercase backdrop-blur-xl">
                Cá nhân hoá từ ảnh của bạn
              </div>
              <FigureCanvas config={config} />
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {summaryItems.map((item) => (
              <div key={item.label} className="premium-card rounded-[24px] border border-white/8 bg-white/4 p-4">
                <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">{item.label}</p>
                <p className="mt-2 font-semibold text-stone-100">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="premium-card rounded-[24px] border border-white/8 bg-white/4 p-4">
              <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Phụ kiện</p>
              <p className="mt-2 font-medium text-stone-100">
                {selectedAccessories.length > 0
                  ? selectedAccessories.map((item) => item.name).join(", ")
                  : "Chưa chọn phụ kiện"}
              </p>
            </div>
            <div className="premium-card rounded-[24px] border border-white/8 bg-white/4 p-4">
              <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Thông tin nhanh</p>
              <p className="mt-2 font-medium text-stone-100">
                Quan sát trực tiếp chi tiết tổng thể trước khi chốt phương án cuối.
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div
        className={`fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(7,8,10,0.72)] px-4 py-6 backdrop-blur-xl transition duration-300 ${
          isFocusOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`glass-panel hairline relative w-full max-w-6xl rounded-[36px] p-4 transition duration-300 sm:p-5 ${
            isFocusOpen ? "scale-100" : "scale-[0.985]"
          }`}
        >
          <div className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(14,15,20,0.98),rgba(17,18,24,0.92))] p-4 sm:p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Chế độ xem lớn</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-stone-100">
                  Quan sát model ở kích thước lớn hơn
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsFocusOpen(false)}
                className="premium-button inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-medium text-stone-100"
              >
                Đóng
              </button>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(234,211,180,0.1),transparent_34%),linear-gradient(180deg,#121318_0%,#101116_100%)]">
              <div className="h-[70vh] min-h-[420px] w-full">
                <FigureCanvas config={config} focusMode />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
