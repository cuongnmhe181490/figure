"use client";

import { useMemo, useState } from "react";
import {
  accessories,
  baseStyles,
  bodyBases,
  defaultConfig,
  formatCurrency,
  outfitThemes,
  sizeOptions,
  stepLabels,
} from "@/data/figure-options";
import { ColorSwatchGroup } from "@/components/configurator/color-swatch-group";
import { FigurePreview } from "@/components/configurator/figure-preview";
import { MultiSelectGroup } from "@/components/configurator/multi-select-group";
import { OptionCardGroup } from "@/components/configurator/option-card-group";
import { SummaryPanel } from "@/components/configurator/summary-panel";
import type { AccessoryId, FigureConfig, OutfitThemeId } from "@/types/figure";

type SubmitStatus =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const maxAccessoryCount = 3;

export function FigureConfigurator() {
  const [config, setConfig] = useState<FigureConfig>(defaultConfig);
  const [customerName, setCustomerName] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ type: "idle" });

  const activeTheme = useMemo(
    () => outfitThemes.find((theme) => theme.id === config.outfitTheme) ?? outfitThemes[0],
    [config.outfitTheme],
  );
  const activeSize = useMemo(
    () => sizeOptions.find((size) => size.id === config.size) ?? sizeOptions[1],
    [config.size],
  );

  const handleThemeChange = (themeId: OutfitThemeId) => {
    const nextTheme = outfitThemes.find((theme) => theme.id === themeId) ?? outfitThemes[0];
    setConfig((current) => ({
      ...current,
      outfitTheme: themeId,
      outfitColor: nextTheme.palette[0] ?? current.outfitColor,
    }));
  };

  const handleAccessoryToggle = (accessoryId: AccessoryId) => {
    setConfig((current) => {
      const exists = current.accessories.includes(accessoryId);
      if (exists) {
        return {
          ...current,
          accessories: current.accessories.filter((item) => item !== accessoryId),
        };
      }

      if (current.accessories.length >= maxAccessoryCount) {
        return {
          ...current,
          accessories: [...current.accessories.slice(1), accessoryId],
        };
      }

      return {
        ...current,
        accessories: [...current.accessories, accessoryId],
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus({ type: "loading" });

    try {
      const formData = new FormData();
      formData.append("customerName", customerName);
      formData.append("contact", contact);
      formData.append("note", note);
      formData.append("imageUrl", imageUrl);
      formData.append("config", JSON.stringify(config));

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      const response = await fetch("/api/inquiry", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as { success: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Chưa thể gửi yêu cầu lúc này.");
      }

      setSubmitStatus({
        type: "success",
        message: result.message ?? "Yêu cầu của bạn đã được ghi nhận.",
      });
      setCustomerName("");
      setContact("");
      setNote("");
      setImageUrl("");
      setImageFile(null);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Đã có lỗi xảy ra.",
      });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="space-y-8">
          <div className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0.03))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
            <div className="flex flex-col gap-5 border-b border-white/8 pb-6">
              <div className="flex flex-wrap gap-2">
                {stepLabels.map((step) => (
                  <span
                    key={step}
                    className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs tracking-[0.14em] text-stone-400 uppercase"
                  >
                    {step}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm tracking-[0.22em] text-[#e3bb8d] uppercase">Khu vực chọn mẫu</p>
                  <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Chọn trước phiên bản bạn muốn gửi tặng.
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-stone-300">
                    Chọn dáng, phong cách và điểm nhấn chỉ trong vài bước. Sau đó gửi ảnh để chúng tôi tư vấn và cá nhân hoá phiên bản cuối.
                  </p>
                </div>
                <div className="rounded-[28px] border border-[#e8c49a]/20 bg-[rgba(235,214,189,0.13)] px-5 py-4">
                  <p className="text-sm text-stone-200">Mức giá tham khảo</p>
                  <p className="mt-2 text-2xl font-semibold text-[#f5ddbc]">
                    {formatCurrency(activeSize.priceFrom)}
                  </p>
                  <p className="text-sm text-stone-300">Hoàn thiện trong {activeSize.productionTime}</p>
                </div>
              </div>
            </div>

            <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
              <OptionCardGroup
                label="Dáng mẫu"
                value={config.bodyBase}
                onChange={(bodyBase) => setConfig((current) => ({ ...current, bodyBase }))}
                options={bodyBases.map((body) => ({
                  id: body.id,
                  title: body.name,
                  description: body.description,
                  accent: body.accent,
                }))}
              />

              <OptionCardGroup
                label="Kích thước"
                value={config.size}
                onChange={(size) => setConfig((current) => ({ ...current, size }))}
                options={sizeOptions.map((size) => ({
                  id: size.id,
                  title: size.label,
                  description: `Cao ${size.heightCm}cm, hoàn thiện trong ${size.productionTime}.`,
                  meta: `Từ ${formatCurrency(size.priceFrom)}`,
                }))}
              />

              <OptionCardGroup
                label="Chủ đề trang phục"
                value={config.outfitTheme}
                onChange={handleThemeChange}
                options={outfitThemes.map((theme) => ({
                  id: theme.id,
                  title: theme.name,
                  description: theme.description,
                  accent: theme.accent,
                }))}
              />

              <ColorSwatchGroup
                label="Màu sắc"
                colors={activeTheme.palette}
                value={config.outfitColor}
                onChange={(outfitColor) => setConfig((current) => ({ ...current, outfitColor }))}
              />

              <MultiSelectGroup
                label="Phụ kiện đi kèm"
                values={config.accessories}
                onToggle={handleAccessoryToggle}
                options={accessories.map((item) => ({
                  id: item.id,
                  title: item.name,
                  description: item.description,
                  accent: item.color,
                }))}
              />

              <OptionCardGroup
                label="Kiểu đế"
                value={config.baseStyle}
                onChange={(baseStyle) => setConfig((current) => ({ ...current, baseStyle }))}
                options={baseStyles.map((base) => ({
                  id: base.id,
                  title: base.name,
                  description: base.description,
                  accent: base.color,
                }))}
              />

              <section className="space-y-4 rounded-[30px] border border-[#e3bb8d]/20 bg-[rgba(235,214,189,0.08)] p-5">
                <div>
                  <h3 className="text-sm font-semibold tracking-[0.18em] text-[#e3bb8d] uppercase">
                    Ảnh chân dung
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-300">
                    Gửi ảnh rõ mặt để chúng tôi tư vấn diện mạo và cá nhân hoá phiên bản dành riêng cho bạn.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm text-stone-300">Tải ảnh lên</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
                      className="block w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-stone-300 file:mr-4 file:rounded-full file:border-0 file:bg-[#e9d2b7] file:px-4 file:py-2 file:text-sm file:font-medium file:text-stone-900"
                    />
                    <p className="text-xs text-stone-500">
                      {imageFile ? `Đã chọn: ${imageFile.name}` : "Chưa có ảnh nào được chọn"}
                    </p>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm text-stone-300">Hoặc dán link ảnh</span>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(event) => setImageUrl(event.target.value)}
                      placeholder="https://..."
                      className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-[#e3bb8d]/60"
                    />
                    <p className="text-xs text-stone-500">Có thể dùng Google Drive, iCloud hoặc link ảnh trực tiếp.</p>
                  </label>
                </div>
              </section>

              <SummaryPanel config={config} />

              <section className="space-y-4 rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-5">
                <div>
                  <h3 className="text-sm font-semibold tracking-[0.18em] text-stone-400 uppercase">
                    Gửi yêu cầu tư vấn
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-300">
                    Để lại thông tin để chúng tôi liên hệ, xác nhận lựa chọn và gửi tư vấn phù hợp.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm text-stone-300">Tên của bạn</span>
                    <input
                      required
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                      placeholder="Nguyễn Minh Anh"
                      className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-[#e3bb8d]/60"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm text-stone-300">Số điện thoại hoặc email</span>
                    <input
                      required
                      value={contact}
                      onChange={(event) => setContact(event.target.value)}
                      placeholder="090xxxxxxx hoặc hello@email.com"
                      className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-[#e3bb8d]/60"
                    />
                  </label>
                </div>

                <label className="space-y-2">
                  <span className="text-sm text-stone-300">Điều bạn muốn thêm</span>
                  <textarea
                    rows={5}
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Ví dụ: cần tặng sinh nhật, muốn in tên trên đế, làm theo phong cách bóng đá..."
                    className="w-full rounded-[24px] border border-white/10 bg-white/4 px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-[#e3bb8d]/60"
                  />
                </label>

                <div className="flex flex-col gap-4 border-t border-white/8 pt-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-stone-300">Hình xem trước giúp bạn dễ hình dung tổng thể.</p>
                    <p className="text-xs text-stone-500">Phiên bản cuối sẽ được hoàn thiện theo lựa chọn và ảnh bạn gửi.</p>
                  </div>
                  <button
                    type="submit"
                    disabled={submitStatus.type === "loading"}
                    className="rounded-full bg-[#ead1b2] px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-[#f6e2cb] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitStatus.type === "loading" ? "Đang gửi..." : "Gửi yêu cầu"}
                  </button>
                </div>

                {submitStatus.type === "success" ? (
                  <div className="rounded-[22px] border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                    {submitStatus.message}
                  </div>
                ) : null}
                {submitStatus.type === "error" ? (
                  <div className="rounded-[22px] border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-200">
                    {submitStatus.message}
                  </div>
                ) : null}
              </section>
            </form>
          </div>
        </div>

        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <FigurePreview config={config} />
          <div className="rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-5">
            <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Điều bạn nhận được</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-300">
              <li>Hình xem trước thay đổi theo lựa chọn để bạn dễ hình dung món quà.</li>
              <li>Mỗi chi tiết đều có thể phối lại theo phong cách bạn muốn.</li>
              <li>Sau khi gửi yêu cầu, đội ngũ sẽ liên hệ để xác nhận và hoàn thiện phương án cuối.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
