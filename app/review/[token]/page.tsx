import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReviewFeedbackForm } from "@/components/review/review-feedback-form";
import { ReviewModelViewer } from "@/components/review/review-model-viewer";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { outfitThemes, sizeOptions } from "@/data/figure-options";
import { orderStatusLabel, orderStatusTone } from "@/lib/order-presenter";
import { getOrderByReviewToken } from "@/lib/order-store";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  const order = await getOrderByReviewToken(token);

  if (!order) {
    return {
      title: "Link review không hợp lệ",
    };
  }

  return {
    title: `Review của ${order.customerName}`,
    description: "Trang review riêng để khách xem model 3D, theo dõi trạng thái và gửi phản hồi.",
  };
}

export default async function ReviewPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await getOrderByReviewToken(token);

  if (!order) notFound();

  const modelAsset = order.assets.find((asset) => asset.kind === "model");
  const previewAssets = order.assets.filter((asset) => asset.kind === "preview");

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="px-5 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <section className="mx-auto max-w-7xl">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_380px]">
            <div className="glass-panel hairline overflow-hidden rounded-[36px] p-5">
              <div className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(14,15,20,0.94),rgba(17,18,24,0.88))] p-5">
                <div className="flex flex-col gap-4 border-b border-white/8 pb-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm tracking-[0.22em] text-[#ead3b4] uppercase">Customer review</p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                      Phiên bản dành cho {order.customerName}
                    </h1>
                    <p className="mt-3 text-sm leading-7 text-stone-400">
                      Xoay, zoom và xem bản hiện tại trước khi phản hồi lại cho đội ngũ.
                    </p>
                  </div>
                  <span className={`rounded-full border px-4 py-2 text-xs uppercase ${orderStatusTone[order.status]}`}>
                    {orderStatusLabel[order.status]}
                  </span>
                </div>

                <div className="mt-6 overflow-hidden rounded-[30px] border border-white/8">
                  <ReviewModelViewer config={order.config} modelUrl={modelAsset?.url} />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <section className="glass-panel-soft rounded-[30px] p-6">
                <p className="text-sm tracking-[0.22em] text-stone-500 uppercase">Thông tin đơn</p>
                <div className="mt-5 grid gap-4">
                  {[
                    ["Kích thước", sizeOptions.find((item) => item.id === order.config.size)?.label ?? order.config.size],
                    ["Phong cách", outfitThemes.find((item) => item.id === order.config.outfitTheme)?.name ?? order.config.outfitTheme],
                    ["Email", order.email],
                    ["Điện thoại", order.phone],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[22px] border border-white/8 bg-white/4 p-4">
                      <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">{label}</p>
                      <p className="mt-2 font-medium text-stone-100">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[22px] border border-white/8 bg-white/4 p-4">
                  <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Ghi chú ban đầu</p>
                  <p className="mt-2 text-sm leading-7 text-stone-300">{order.note || "Không có ghi chú thêm."}</p>
                </div>
              </section>

              <ReviewFeedbackForm token={token} />

              <section className="glass-panel-soft rounded-[30px] p-6">
                <p className="text-sm tracking-[0.22em] text-stone-500 uppercase">Preview images</p>
                <div className="mt-5 grid gap-3">
                  {previewAssets.length > 0 ? (
                    previewAssets.map((asset) => (
                      <a
                        key={asset.url}
                        href={asset.url}
                        target="_blank"
                        className="rounded-[22px] border border-white/8 bg-white/4 p-4 transition hover:bg-white/6"
                      >
                        <p className="font-medium text-stone-100">{asset.fileName}</p>
                        <p className="mt-1 text-sm text-stone-500">Mở ảnh preview</p>
                      </a>
                    ))
                  ) : (
                    <div className="rounded-[22px] border border-dashed border-white/10 bg-white/2 p-4 text-sm text-stone-500">
                      Chưa có ảnh preview riêng. Bạn vẫn có thể xem model 3D trực tiếp ở phía trên.
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
