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
import { Reveal } from "@/components/shared/reveal";
import type { AccessoryId, FigureConfig, OutfitThemeId } from "@/types/figure";

type SubmitStatus =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const maxAccessoryCount = 3;
const inputClassName =
  "w-full rounded-[24px] border border-white/10 bg-white/4 px-4 py-3 text-sm text-stone-100 outline-none transition duration-300 placeholder:text-stone-500 focus:border-[#ead3b4]/45 focus:bg-white/6";

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
    <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="grid gap-8 xl:grid-cols-[minmax(0,1.8fr)_minmax(360px,1fr)] xl:items-start">
        <div className="order-1 space-y-6 xl:sticky xl:top-24">
          <Reveal>
            <FigurePreview config={config} />
          </Reveal>
        </div>

        <div className="order-2 space-y-6">
          <Reveal delayMs={80}>
            <div className="glass-panel hairline rounded-[36px] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.16)] sm:p-8">
              <div className="flex flex-col gap-6 border-b border-white/8 pb-6">
                <div className="flex flex-wrap gap-2">
                  {stepLabels.map((step) => (
                    <span
                      key={step}
                      className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs tracking-[0.16em] text-stone-400 uppercase"
                    >
                      {step}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-sm tracking-[0.22em] text-[#ead3b4] uppercase">Product Builder</p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                      Tùy chỉnh món quà theo đúng phong cách bạn muốn.
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-stone-300">
                      Preview luôn hiển thị đủ lớn để bạn quan sát chi tiết, trong khi panel lựa chọn vẫn nằm gọn bên cạnh để thao tác nhanh và rõ ràng.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="glass-panel-soft rounded-[28px] px-5 py-4">
                      <p className="text-sm text-stone-200">Mức giá tham khảo</p>
                      <p className="mt-2 text-3xl font-semibold text-[#f5ddbc]">
                        {formatCurrency(activeSize.priceFrom)}
                      </p>
                      <p className="mt-1 text-sm text-stone-300">Hoàn thiện trong {activeSize.productionTime}</p>
                    </div>

                    <div className="glass-panel-soft rounded-[28px] px-5 py-4">
                      <p className="text-sm text-stone-200">Cấu hình hiện tại</p>
                      <p className="mt-2 text-lg font-semibold text-stone-100">{activeTheme.name}</p>
                      <p className="mt-1 text-sm text-stone-300">{config.accessories.length} phụ kiện đã chọn</p>
                    </div>
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

                <SummaryPanel config={config} />

                <section className="glass-panel-soft rounded-[32px] border border-[#ead3b4]/15 p-5 sm:p-6">
                  <div>
                    <h3 className="text-sm font-semibold tracking-[0.18em] text-[#ead3b4] uppercase">Ảnh chân dung</h3>
                    <p className="mt-3 text-sm leading-7 text-stone-300">
                      Gửi ảnh rõ mặt để chúng tôi tư vấn diện mạo và cá nhân hoá phiên bản dành riêng cho bạn.
                    </p>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm text-stone-300">Tải ảnh lên</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
                        className="block w-full rounded-[24px] border border-white/10 bg-white/4 px-4 py-3 text-sm text-stone-300 transition duration-300 file:mr-4 file:rounded-full file:border-0 file:bg-[#e9d2b7] file:px-4 file:py-2 file:text-sm file:font-medium file:text-stone-900 hover:bg-white/6"
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
                        className={inputClassName}
                      />
                      <p className="text-xs text-stone-500">Có thể dùng Google Drive, iCloud hoặc link ảnh trực tiếp.</p>
                    </label>
                  </div>
                </section>

                <section className="glass-panel-soft rounded-[32px] p-5 sm:p-6">
                  <div>
                    <h3 className="text-sm font-semibold tracking-[0.18em] text-stone-400 uppercase">Gửi yêu cầu tư vấn</h3>
                    <p className="mt-3 text-sm leading-7 text-stone-300">
                      Để lại thông tin để chúng tôi liên hệ, xác nhận lựa chọn và gửi tư vấn phù hợp.
                    </p>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm text-stone-300">Tên của bạn</span>
                      <input
                        required
                        value={customerName}
                        onChange={(event) => setCustomerName(event.target.value)}
                        placeholder="Nguyễn Minh Anh"
                        className={inputClassName}
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm text-stone-300">Số điện thoại hoặc email</span>
                      <input
                        required
                        value={contact}
                        onChange={(event) => setContact(event.target.value)}
                        placeholder="090xxxxxxx hoặc hello@email.com"
                        className={inputClassName}
                      />
                    </label>
                  </div>

                  <label className="mt-4 block space-y-2">
                    <span className="text-sm text-stone-300">Điều bạn muốn thêm</span>
                    <textarea
                      rows={5}
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                      placeholder="Ví dụ: cần tặng sinh nhật, muốn in tên trên đế, làm theo phong cách bóng đá..."
                      className={inputClassName}
                    />
                  </label>

                  <div className="mt-5 flex flex-col gap-4 border-t border-white/8 pt-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm text-stone-300">Preview luôn cập nhật ngay khi bạn thay đổi lựa chọn.</p>
                      <p className="text-xs text-stone-500">Khi cần quan sát kỹ hơn, hãy dùng chế độ xem lớn ngay bên cạnh.</p>
                    </div>

                    <button
                      type="submit"
                      disabled={submitStatus.type === "loading"}
                      className="premium-button rounded-full border border-[#f0d9b9]/30 bg-[#ebd7bd] px-6 py-3 text-sm font-semibold text-stone-950 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submitStatus.type === "loading" ? "Đang gửi..." : "Gửi yêu cầu"}
                    </button>
                  </div>

                  {submitStatus.type === "success" ? (
                    <div className="mt-4 rounded-[22px] border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                      {submitStatus.message}
                    </div>
                  ) : null}

                  {submitStatus.type === "error" ? (
                    <div className="mt-4 rounded-[22px] border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-200">
                      {submitStatus.message}
                    </div>
                  ) : null}
                </section>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
