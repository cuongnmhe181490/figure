import type { Metadata } from "next";
import Link from "next/link";
import { collectionItems } from "@/data/collections";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export const metadata: Metadata = {
  title: "Bộ sưu tập",
  description: "Một số hướng quà tặng 3D cá nhân hóa để khách hàng hình dung nhanh chất cảm và phong cách.",
};

export default function CollectionsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="px-5 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <section className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm tracking-[0.22em] text-[#ead3b4] uppercase">Collection gallery</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
              Những hướng quà tặng để khách hình dung nhanh hơn.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-stone-400">
              Mỗi collection là một mood rõ ràng để bạn chọn phong cách phù hợp trước khi chuyển sang builder.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {collectionItems.map((item) => (
              <article key={item.id} className="glass-panel hairline overflow-hidden rounded-[34px] p-6">
                <div className={`rounded-[28px] bg-gradient-to-br ${item.accent} p-6`}>
                  <p className="text-xs tracking-[0.18em] text-[#f3dfc7] uppercase">{item.category}</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-stone-300">{item.description}</p>
                  <div className="mt-8">
                    <Link
                      href={`/design?collection=${item.id}`}
                      className="premium-button inline-flex rounded-full border border-[#f0d9b9]/30 bg-[#ebd7bd] px-6 py-3 text-sm font-semibold text-stone-950"
                    >
                      Mở builder
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
