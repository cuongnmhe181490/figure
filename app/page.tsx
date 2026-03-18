import Link from "next/link";
import { accessories, bodyBases, outfitThemes, sizeOptions } from "@/data/figure-options";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(233,210,183,0.16),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(167,115,84,0.16),_transparent_22%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-[#d5b089]/25 bg-[rgba(233,210,183,0.08)] px-4 py-2 text-xs tracking-[0.22em] text-[#f1d3af] uppercase">
                Demo website for custom figurine business
              </span>
              <h1 className="font-display mt-6 text-5xl leading-[0.94] font-semibold tracking-tight text-stone-50 sm:text-6xl lg:text-7xl">
                Thiết kế trước mô hình
                <span className="block text-[#ebc89a]">3D cá nhân hóa</span>
                theo phong cách premium.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
                Website demo giúp khách chọn body, outfit, phụ kiện và upload ảnh để bạn tư vấn
                phần head custom riêng. Tối ưu cho giai đoạn test ý tưởng, thu lead và public free.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/design"
                  className="rounded-full bg-[#e9d2b7] px-7 py-4 text-center text-sm font-semibold text-stone-950 transition hover:bg-[#f7e4ce]"
                >
                  Bắt đầu thiết kế figure
                </Link>
                <a
                  href="#how-it-works"
                  className="rounded-full border border-white/12 px-7 py-4 text-center text-sm font-semibold text-stone-100 transition hover:bg-white/6"
                >
                  Xem quy trình hoạt động
                </a>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Body base", value: `${bodyBases.length}+ mẫu dựng sẵn` },
                  { label: "Outfit theme", value: `${outfitThemes.length} concept cho MVP` },
                  { label: "Accessory", value: `${accessories.length} phụ kiện để mix` },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.05)] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
                  >
                    <p className="text-sm text-stone-400">{item.label}</p>
                    <p className="mt-2 text-xl font-semibold text-stone-100">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pl-8">
              <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0.03))] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.28)]">
                <div className="rounded-[30px] border border-white/10 bg-[#181310] p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Configurator snapshot</p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">Premium gifting flow</h2>
                    </div>
                    <span className="rounded-full border border-[#e9d2b7]/30 bg-[rgba(233,210,183,0.12)] px-4 py-2 text-xs tracking-[0.14em] text-[#f1d3af] uppercase">
                      MVP ready
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4">
                    {[
                      "Chọn body + size phù hợp ngân sách",
                      "Phối outfit theo chủ đề quà tặng",
                      "Thêm phụ kiện và đế trưng bày",
                      "Upload ảnh để custom head sau khi chốt đơn",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="flex items-center gap-4 rounded-[24px] border border-white/8 bg-white/4 p-4"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(233,210,183,0.14)] text-sm font-semibold text-[#f1d3af]">
                          0{index + 1}
                        </div>
                        <p className="text-sm leading-6 text-stone-300">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[26px] border border-white/8 bg-[radial-gradient(circle_at_top,_rgba(233,210,183,0.18),_transparent_42%),linear-gradient(180deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0.02))] p-5">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                        <p className="text-xs tracking-[0.16em] text-stone-500 uppercase">Size ladder</p>
                        <p className="mt-2 text-base font-semibold text-stone-100">
                          {sizeOptions.map((item) => item.id).join(" / ")}
                        </p>
                      </div>
                      <div className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                        <p className="text-xs tracking-[0.16em] text-stone-500 uppercase">Head workflow</p>
                        <p className="mt-2 text-base font-semibold text-stone-100">
                          Chụp ảnh {"->"} duyệt style {"->"} custom sau
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm tracking-[0.22em] text-[#e3bb8d] uppercase">How it works</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Từ demo online đến yêu cầu sản xuất thực tế.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-stone-400">
              Luồng này đủ đẹp để dùng chào khách và đủ gọn để chạy free-tier. Sau này chỉ cần
              thay asset 3D thật, kết nối database và pipeline sản xuất.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {[
              {
                title: "Khách chọn kiểu figure",
                text: "Body, size, outfit, phụ kiện và đế được chọn trực tiếp trên configurator.",
              },
              {
                title: "Upload ảnh chân dung",
                text: "Ảnh được đính kèm để bạn custom phần head riêng sau khi khách xác nhận.",
              },
              {
                title: "Lead được ghi nhận",
                text: "Yêu cầu được gửi về API nội bộ hoặc Supabase nếu bạn cấu hình biến môi trường.",
              },
              {
                title: "Chuyển sang đơn thật",
                text: "Bạn báo giá cuối, chốt concept, thay preview mock bằng asset 3D production sau.",
              },
            ].map((item, index) => (
              <article
                key={item.title}
                className="rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.05)] p-6"
              >
                <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Step 0{index + 1}</p>
                <h3 className="mt-3 text-xl font-semibold text-stone-100">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-400">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="why-us" className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="rounded-[34px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-7">
              <p className="text-sm tracking-[0.22em] text-[#e3bb8d] uppercase">Value proposition</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                Website mang chất startup premium nhưng vẫn phục vụ chốt đơn quà tặng rất rõ.
              </h2>
              <p className="mt-4 text-base leading-7 text-stone-400">
                Giao diện được tối ưu cho trust, sự tinh tế và cảm giác sản phẩm có giá trị. Nó không
                cố giả vờ là studio 3D phức tạp, mà cho khách thấy họ đang cá nhân hóa một món quà thật.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Static-first nên deploy gần như miễn phí trên Vercel hoặc Cloudflare Pages.",
                "Dữ liệu lựa chọn được tách thành object rõ ràng để bạn tự chỉnh sửa không cần chạm sâu vào code.",
                "Preview mock 3D phản hồi theo lựa chọn giúp khách hình dung nhanh dù chưa có asset thật.",
                "Kiến trúc đã chừa sẵn đường nâng cấp cho Supabase, model GLB/GLTF và hệ thống order thực tế.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0.02))] p-6 text-sm leading-7 text-stone-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="rounded-[40px] border border-[#e0b98d]/20 bg-[radial-gradient(circle_at_top_left,_rgba(233,210,183,0.18),_transparent_26%),linear-gradient(180deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0.03))] px-6 py-10 text-center sm:px-10">
            <p className="text-sm tracking-[0.22em] text-[#f1d3af] uppercase">Ready to launch</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Đi thẳng vào bản demo configurator và bắt đầu thu lead.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-300">
              Đây là lõi MVP đủ dùng để public, chào khách, test ý tưởng và mở rộng dần thành hệ
              thống đặt hàng thật.
            </p>
            <div className="mt-8">
              <Link
                href="/design"
                className="inline-flex rounded-full bg-[#ead1b2] px-7 py-4 text-sm font-semibold text-stone-950 transition hover:bg-[#f7e4ce]"
              >
                Mở configurator
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                q: "Preview 3D hiện đã là model thật chưa?",
                a: "Chưa. MVP dùng primitive mock để thể hiện logic cấu hình. Bạn có thể thay bằng GLB/GLTF sau.",
              },
              {
                q: "Có cần backend riêng không?",
                a: "Không bắt buộc. Với demo này, API route của Next.js là đủ. Khi cần lưu lead thật, cấu hình thêm Supabase free tier.",
              },
              {
                q: "Có thể chạy free-tier không?",
                a: "Có. Stack hiện tại phù hợp để deploy miễn phí giai đoạn đầu trên Vercel hoặc Cloudflare Pages.",
              },
            ].map((item) => (
              <article key={item.q} className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-6">
                <h3 className="text-lg font-semibold text-stone-100">{item.q}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-400">{item.a}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
