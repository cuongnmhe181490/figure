"use client";

import { motion } from "framer-motion";
import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { formatCurrency, outfitThemes, sizeOptions } from "@/data/figure-options";
import { orderStatusLabel, orderStatusTone } from "@/lib/order-presenter";
import type { GiftOrder, OrderStatus } from "@/types/order";

type AdminDashboardProps = {
  initialOrders: GiftOrder[];
};

const statusOptions: OrderStatus[] = [
  "new",
  "in_review",
  "model_ready",
  "waiting_feedback",
  "approved",
  "production",
  "completed",
];

export function AdminDashboard({ initialOrders }: AdminDashboardProps) {
  const router = useRouter();
  const [orders, setOrders] = useState(initialOrders);
  const [selectedId, setSelectedId] = useState(initialOrders[0]?.id ?? "");
  const [isPending, startTransition] = useTransition();

  const activeOrder = useMemo(
    () => orders.find((order) => order.id === selectedId) ?? orders[0] ?? null,
    [orders, selectedId],
  );

  const updateStatus = async (id: string, status: OrderStatus) => {
    const response = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const result = (await response.json()) as { success: boolean; order?: GiftOrder };
    if (!response.ok || !result.success || !result.order) return;

    startTransition(() => {
      setOrders((current) => current.map((order) => (order.id === id ? result.order! : order)));
    });
  };

  const uploadAsset = async (id: string, file: File, kind: "model" | "preview") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("kind", kind);

    const response = await fetch(`/api/orders/${id}/assets`, {
      method: "POST",
      body: formData,
    });

    const result = (await response.json()) as { success: boolean; order?: GiftOrder };
    if (!response.ok || !result.success || !result.order) return;

    startTransition(() => {
      setOrders((current) => current.map((order) => (order.id === id ? result.order! : order)));
    });
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 xl:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="glass-panel hairline rounded-[34px] p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm tracking-[0.22em] text-[#ead3b4] uppercase">Admin dashboard</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">Quản lý đơn và review</h1>
            </div>
            <button
              type="button"
              onClick={() => void handleLogout()}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-stone-200 transition hover:bg-white/8"
            >
              Đăng xuất
            </button>
          </div>
          <p className="mt-3 text-sm leading-7 text-stone-400">
            Xem đơn mới, đổi trạng thái, tải model GLB và ảnh preview cho từng khách hàng.
          </p>

          <div className="mt-6 space-y-3">
            {orders.map((order) => (
              <button
                key={order.id}
                type="button"
                onClick={() => setSelectedId(order.id)}
                className={`w-full rounded-[26px] border p-4 text-left transition ${
                  order.id === activeOrder?.id
                    ? "border-[#ead3b4]/30 bg-[#ead3b4]/10"
                    : "border-white/8 bg-white/4 hover:bg-white/6"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-stone-100">{order.customerName}</p>
                    <p className="mt-1 text-xs text-stone-500">{new Date(order.createdAt).toLocaleString("vi-VN")}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[11px] uppercase ${orderStatusTone[order.status]}`}>
                    {orderStatusLabel[order.status]}
                  </span>
                </div>
                <p className="mt-3 text-sm text-stone-300">
                  {outfitThemes.find((item) => item.id === order.config.outfitTheme)?.name} · {order.config.accessories.length} phụ kiện
                </p>
              </button>
            ))}
          </div>
        </aside>

        {activeOrder ? (
          <motion.div
            key={activeOrder.id}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <section className="glass-panel hairline rounded-[34px] p-6">
              <div className="flex flex-col gap-4 border-b border-white/8 pb-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm tracking-[0.22em] text-[#ead3b4] uppercase">Đơn hàng</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">{activeOrder.customerName}</h2>
                  <p className="mt-3 text-sm leading-7 text-stone-400">
                    {activeOrder.email} · {activeOrder.phone}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-stone-400">
                    Link review: <span className="text-stone-200">/review/{activeOrder.reviewToken}</span>
                  </p>
                </div>

                <div className="glass-panel-soft rounded-[24px] px-5 py-4">
                  <p className="text-sm text-stone-300">Giá theo cấu hình</p>
                  <p className="mt-2 text-2xl font-semibold text-[#f5ddbc]">
                    {formatCurrency(sizeOptions.find((size) => size.id === activeOrder.config.size)?.priceFrom ?? 0)}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Dáng mẫu", activeOrder.config.bodyBase],
                  ["Kích thước", activeOrder.config.size],
                  ["Phong cách", outfitThemes.find((item) => item.id === activeOrder.config.outfitTheme)?.name ?? activeOrder.config.outfitTheme],
                  ["Đế", activeOrder.config.baseStyle],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[24px] border border-white/8 bg-white/4 p-4">
                    <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">{label}</p>
                    <p className="mt-2 font-semibold text-stone-100">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="glass-panel-soft rounded-[32px] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm tracking-[0.22em] text-stone-500 uppercase">Assets</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">Model và preview</h3>
                  </div>
                  {isPending ? <span className="text-xs text-stone-500">Đang cập nhật...</span> : null}
                </div>

                <div className="mt-5 grid gap-3">
                  <label className="rounded-[24px] border border-white/8 bg-white/4 p-4">
                    <span className="text-sm text-stone-300">Tải model GLB</span>
                    <input
                      type="file"
                      accept=".glb"
                      className="mt-3 block w-full text-sm text-stone-300 file:mr-4 file:rounded-full file:border-0 file:bg-[#ead3b4] file:px-4 file:py-2 file:text-sm file:font-medium file:text-stone-950"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) void uploadAsset(activeOrder.id, file, "model");
                      }}
                    />
                  </label>

                  <label className="rounded-[24px] border border-white/8 bg-white/4 p-4">
                    <span className="text-sm text-stone-300">Tải ảnh preview</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-3 block w-full text-sm text-stone-300 file:mr-4 file:rounded-full file:border-0 file:bg-[#ead3b4] file:px-4 file:py-2 file:text-sm file:font-medium file:text-stone-950"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) void uploadAsset(activeOrder.id, file, "preview");
                      }}
                    />
                  </label>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {activeOrder.assets.length > 0 ? (
                    activeOrder.assets.map((asset) => (
                      <div key={`${asset.kind}-${asset.url}`} className="rounded-[22px] border border-white/8 bg-[#121318] p-4">
                        <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">{asset.kind === "model" ? "Model GLB" : "Preview image"}</p>
                        <p className="mt-2 truncate text-sm font-medium text-stone-100">{asset.fileName}</p>
                        <a href={asset.url} target="_blank" className="mt-3 inline-flex text-sm text-[#f3dfc7] underline underline-offset-4">
                          Mở file
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[22px] border border-dashed border-white/10 bg-white/2 p-4 text-sm text-stone-500">
                      Chưa có asset nào được tải lên cho đơn này.
                    </div>
                  )}
                </div>
              </div>

              <div className="glass-panel-soft rounded-[32px] p-6">
                <p className="text-sm tracking-[0.22em] text-stone-500 uppercase">Trạng thái</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Cập nhật tiến độ</h3>
                <div className="mt-5 space-y-3">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => void updateStatus(activeOrder.id, status)}
                      className={`w-full rounded-[22px] border px-4 py-3 text-left text-sm transition ${
                        activeOrder.status === status
                          ? `${orderStatusTone[status]}`
                          : "border-white/8 bg-white/4 text-stone-300 hover:bg-white/6"
                      }`}
                    >
                      {orderStatusLabel[status]}
                    </button>
                  ))}
                </div>

                <div className="mt-6 rounded-[24px] border border-white/8 bg-white/4 p-4">
                  <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Ghi chú khách</p>
                  <p className="mt-2 text-sm leading-7 text-stone-300">
                    {activeOrder.note || "Khách chưa để lại ghi chú."}
                  </p>
                </div>

                <div className="mt-4 rounded-[24px] border border-white/8 bg-white/4 p-4">
                  <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Feedback</p>
                  <div className="mt-3 space-y-3">
                    {activeOrder.feedback.length > 0 ? (
                      activeOrder.feedback.map((feedback) => (
                        <div key={feedback.createdAt} className="rounded-[20px] bg-[#121318] p-3 text-sm text-stone-300">
                          {feedback.message}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-stone-500">Chưa có phản hồi từ khách.</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <div className="glass-panel-soft rounded-[32px] p-8 text-sm text-stone-400">Chưa có đơn hàng nào.</div>
        )}
      </section>
    </div>
  );
}
