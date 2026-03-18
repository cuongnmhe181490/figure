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
                Quà tặng cá nhân hoá
              </span>
              <h1 className="font-display mt-6 text-5xl leading-[0.94] font-semibold tracking-tight text-stone-50 sm:text-6xl lg:text-7xl">
                Tạo nên món quà
                <span className="block text-[#ebc89a]">mang dấu ấn riêng</span>
                thật tinh tế.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
                Chọn mẫu, gửi ảnh và để chúng tôi cùng bạn hoàn thiện một phiên bản dành riêng cho người nhận.
                Mọi thứ rõ ràng, nhanh gọn và đủ cảm xúc để chốt quà ngay từ lần xem đầu tiên.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/design"
                  className="rounded-full bg-[#e9d2b7] px-7 py-4 text-center text-sm font-semibold text-stone-950 transition hover:bg-[#f7e4ce]"
                >
                  Bắt đầu chọn mẫu
                </Link>
                <a
                  href="#quy-trinh"
                  className="rounded-full border border-white/12 px-7 py-4 text-center text-sm font-semibold text-stone-100 transition hover:bg-white/6"
                >
                  Xem quy trình
                </a>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Dáng mẫu", value: `${bodyBases.length}+ lựa chọn sẵn` },
                  { label: "Phong cách", value: `${outfitThemes.length} chủ đề nổi bật` },
                  { label: "Điểm nhấn", value: `${accessories.length} phụ kiện để chọn` },
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
                      <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Trải nghiệm đặt riêng</p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">Quy trình quà tặng cao cấp</h2>
                    </div>
                    <span className="rounded-full border border-[#e9d2b7]/30 bg-[rgba(233,210,183,0.12)] px-4 py-2 text-xs tracking-[0.14em] text-[#f1d3af] uppercase">
                      Tư vấn nhanh
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4">
                    {[
                      "Chọn mẫu và kích thước phù hợp",
                      "Phối phong cách theo dịp tặng",
                      "Thêm phụ kiện và đế trưng bày",
                      "Gửi ảnh để cá nhân hoá gương mặt",
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
                        <p className="text-xs tracking-[0.16em] text-stone-500 uppercase">Kích thước</p>
                        <p className="mt-2 text-base font-semibold text-stone-100">
                          {sizeOptions.map((item) => item.id).join(" / ")}
                        </p>
                      </div>
                      <div className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                        <p className="text-xs tracking-[0.16em] text-stone-500 uppercase">Cá nhân hoá</p>
                        <p className="mt-2 text-base font-semibold text-stone-100">
                          Gửi ảnh {"->"} duyệt phong cách {"->"} hoàn thiện
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="quy-trinh" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm tracking-[0.22em] text-[#e3bb8d] uppercase">Quy trình</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Từ ý tưởng đến món quà hoàn chỉnh.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-stone-400">
              Mỗi bước đều được thiết kế để khách dễ chọn, dễ gửi yêu cầu và dễ đi tới quyết định.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {[
              {
                title: "Chọn mẫu yêu thích",
                text: "Chọn dáng, kích thước, phong cách và phụ kiện phù hợp với dịp tặng.",
              },
              {
                title: "Gửi ảnh chân dung",
                text: "Ảnh giúp chúng tôi tư vấn diện mạo và tinh chỉnh phiên bản dành riêng cho bạn.",
              },
              {
                title: "Nhận tư vấn riêng",
                text: "Đội ngũ xác nhận chi tiết, gợi ý phối màu và chốt phương án phù hợp ngân sách.",
              },
              {
                title: "Hoàn thiện món quà",
                text: "Sau khi thống nhất, chúng tôi hoàn thiện phiên bản cuối để bạn sẵn sàng trao tặng.",
              },
            ].map((item, index) => (
              <article
                key={item.title}
                className="rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.05)] p-6"
              >
                <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Bước 0{index + 1}</p>
                <h3 className="mt-3 text-xl font-semibold text-stone-100">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-400">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="gia-tri" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="rounded-[34px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-7">
              <p className="text-sm tracking-[0.22em] text-[#e3bb8d] uppercase">Giá trị</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                Tinh tế để tạo thiện cảm, rõ ràng để khách dễ chọn.
              </h2>
              <p className="mt-4 text-base leading-7 text-stone-400">
                Giao diện ưu tiên cảm giác sang trọng, dễ hiểu và giàu cảm xúc. Khách nhìn vào sẽ thấy đây là một món quà được chăm chút, không phải một bản giới thiệu khô cứng.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Khách có thể hình dung món quà ngay khi vừa chọn xong phong cách.",
                "Mỗi lựa chọn đều ngắn gọn, trực quan và dễ quyết định.",
                "Ảnh chân dung được đưa vào quy trình tư vấn để thành phẩm mang dấu ấn riêng.",
                "Phù hợp cho quà sinh nhật, kỷ niệm, tốt nghiệp, cưới hỏi và quà doanh nghiệp.",
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
            <p className="text-sm tracking-[0.22em] text-[#f1d3af] uppercase">Sẵn sàng bắt đầu</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Chọn mẫu trước, phần còn lại để chúng tôi đồng hành cùng bạn.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-300">
              Một trải nghiệm ngắn gọn để khách chọn nhanh, gửi yêu cầu dễ và cảm nhận rõ giá trị món quà.
            </p>
            <div className="mt-8">
              <Link
                href="/design"
                className="inline-flex rounded-full bg-[#ead1b2] px-7 py-4 text-sm font-semibold text-stone-950 transition hover:bg-[#f7e4ce]"
              >
                Mở khu vực chọn mẫu
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                q: "Khách cần chuẩn bị gì?",
                a: "Chỉ cần chọn mẫu, để lại thông tin và gửi ảnh rõ mặt. Chúng tôi sẽ tư vấn phần còn lại.",
              },
              {
                q: "Ảnh chân dung dùng để làm gì?",
                a: "Ảnh được dùng để tư vấn và cá nhân hoá gương mặt, giúp thành phẩm gần với người thật hơn.",
              },
              {
                q: "Khi nào có báo giá?",
                a: "Sau khi nhận yêu cầu, chúng tôi xác nhận lựa chọn và gửi tư vấn kèm mức giá phù hợp.",
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
