"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
  | { type: "success"; message: string; reviewUrl: string }
  | { type: "error"; message: string };

const maxAccessoryCount = 3;
const builderStorageKey = "figure-atelier-builder-config";
const inputClassName =
  "w-full rounded-[24px] border border-white/10 bg-white/4 px-4 py-3 text-sm text-stone-100 outline-none transition duration-300 placeholder:text-stone-500 focus:border-[#ead3b4]/45 focus:bg-white/6";

export function FigureConfigurator() {
  const [config, setConfig] = useState<FigureConfig>(defaultConfig);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(builderStorageKey);
      if (!saved) return;

      const parsed = JSON.parse(saved) as Partial<FigureConfig>;
      setConfig((current) => ({ ...current, ...parsed }));
    } catch {
      window.localStorage.removeItem(builderStorageKey);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(builderStorageKey, JSON.stringify(config));
  }, [config]);

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
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("note", note);
      formData.append("imageUrl", imageUrl);
      formData.append("config", JSON.stringify(config));

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as {
        success: boolean;
        message?: string;
        reviewUrl?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Chưa thể tạo yêu cầu lúc này.");
      }

      setSubmitStatus({
        type: "success",
        message: result.message ?? "Yêu cầu của bạn đã được ghi nhận.",
        reviewUrl: result.reviewUrl ?? "/design",
      });
      setCustomerName("");
      setEmail("");
      setPhone("");
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
      <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
        <div className="space-y-8">
          <Reveal>
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

                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-sm tracking-[0.22em] text-[#ead3b4] uppercase">Builder</p>
                    <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                      Chọn cấu hình, lưu lại và gửi đơn ngay trong một luồng gọn.
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-stone-300">
                      Các lựa chọn của bạn được lưu lại ngay trên máy để không bị mất giữa chừng. Khi gửi thông tin,
                      hệ thống sẽ tạo một trang review riêng để khách tiếp tục theo dõi và phản hồi.
                    </p>
                  </div>

                  <div className="glass-panel-soft rounded-[30px] px-5 py-4">
                    <p className="text-sm text-stone-200">Mức giá tham khảo</p>
                    <p className="mt-2 text-3xl font-semibold text-[#f5ddbc]">{formatCurrency(activeSize.priceFrom)}</p>
                    <p className="mt-1 text-sm text-stone-300">Hoàn thiện trong {activeSize.productionTime}</p>
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
                  label="Phong cách"
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
                  label="Phụ kiện"
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
                  label="Đế trưng bày"
                  value={config.baseStyle}
                  onChange={(baseStyle) => setConfig((current) => ({ ...current, baseStyle }))}
                  options={baseStyles.map((base) => ({
                    id: base.id,
                    title: base.name,
                    description: base.description,
                    accent: base.color,
                  }))}
                />

                <section className="glass-panel-soft rounded-[32px] border border-[#ead3b4]/15 p-5 sm:p-6">
                  <div>
                    <h3 className="text-sm font-semibold tracking-[0.18em] text-[#ead3b4] uppercase">Ảnh chân dung</h3>
                    <p className="mt-3 text-sm leading-7 text-stone-300">
                      Gửi ảnh rõ mặt để đội ngũ có thêm chất liệu cho phần tư vấn và tinh chỉnh sau đó.
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

                <SummaryPanel config={config} />

                <section className="glass-panel-soft rounded-[32px] p-5 sm:p-6">
                  <div>
                    <h3 className="text-sm font-semibold tracking-[0.18em] text-stone-400 uppercase">Tạo đơn hàng</h3>
                    <p className="mt-3 text-sm leading-7 text-stone-300">
                      Điền thông tin liên hệ để hệ thống tạo đơn và cấp link review riêng cho khách.
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
                      <span className="text-sm text-stone-300">Email</span>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="hello@email.com"
                        className={inputClassName}
                      />
                    </label>

                    <label className="space-y-2 md:col-span-2">
                      <span className="text-sm text-stone-300">Số điện thoại</span>
                      <input
                        required
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="090xxxxxxx"
                        className={inputClassName}
                      />
                    </label>
                  </div>

                  <label className="mt-4 block space-y-2">
                    <span className="text-sm text-stone-300">Ghi chú thêm</span>
                    <textarea
                      rows={5}
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                      placeholder="Ví dụ: quà sinh nhật, muốn in tên trên đế, cần tone thanh lịch hơn..."
                      className={inputClassName}
                    />
                  </label>

                  <div className="mt-5 flex flex-col gap-4 border-t border-white/8 pt-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm text-stone-300">Cấu hình được lưu tự động trong localStorage.</p>
                      <p className="text-xs text-stone-500">Sau khi gửi, khách sẽ nhận được một link review riêng để xem model và phản hồi.</p>
                    </div>

                    <button
                      type="submit"
                      disabled={submitStatus.type === "loading"}
                      className="premium-button rounded-full border border-[#f0d9b9]/30 bg-[#ebd7bd] px-6 py-3 text-sm font-semibold text-stone-950 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submitStatus.type === "loading" ? "Đang tạo đơn..." : "Tạo đơn"}
                    </button>
                  </div>

                  {submitStatus.type === "success" ? (
                    <div className="mt-4 rounded-[22px] border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                      <p>{submitStatus.message}</p>
                      <Link
                        href={submitStatus.reviewUrl}
                        className="mt-3 inline-flex font-medium text-white underline underline-offset-4"
                      >
                        Mở trang review riêng
                      </Link>
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

        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Reveal delayMs={120}>
            <FigurePreview config={config} />
          </Reveal>

          <Reveal delayMs={180}>
            <div className="glass-panel-soft rounded-[32px] p-5">
              <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Flow mới</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-300">
                <li>Cấu hình được lưu tự động giữa các lần quay lại.</li>
                <li>Khi tạo đơn, hệ thống sinh review token ngẫu nhiên và khó đoán.</li>
                <li>Admin có thể cập nhật trạng thái, tải model GLB và ảnh preview lên cùng một nơi.</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
