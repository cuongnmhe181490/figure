import Link from "next/link";
import { accessories, bodyBases, outfitThemes, sizeOptions } from "@/data/figure-options";
import { Reveal } from "@/components/shared/reveal";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

const processItems = [
  {
    step: "01",
    title: "Chọn mẫu yêu thích",
    text: "Chọn dáng, kích thước, phong cách và những điểm nhấn phù hợp với dịp tặng.",
  },
  {
    step: "02",
    title: "Gửi ảnh chân dung",
    text: "Ảnh giúp chúng tôi tư vấn diện mạo và giữ lại thần thái riêng của người nhận.",
  },
  {
    step: "03",
    title: "Nhận tư vấn riêng",
    text: "Chúng tôi xác nhận chi tiết, tinh chỉnh phối màu và chốt phương án thật gọn gàng.",
  },
  {
    step: "04",
    title: "Hoàn thiện món quà",
    text: "Phiên bản cuối được hoàn thiện tinh tế để bạn sẵn sàng trao tặng trong những dịp đáng nhớ.",
  },
];

const valueItems = [
  "Bố cục rõ ràng để khách cảm nhận ngay sự chỉn chu và cao cấp.",
  "Motion nhẹ, mượt và tiết chế để tạo cảm giác hiện đại.",
  "Quy trình tư vấn gọn gàng, giúp ra quyết định nhanh hơn.",
  "Phù hợp cho quà sinh nhật, kỷ niệm, cưới hỏi và quà doanh nghiệp.",
];

const faqItems = [
  {
    q: "Khách cần chuẩn bị gì?",
    a: "Chỉ cần chọn mẫu, để lại thông tin và gửi ảnh rõ mặt. Phần còn lại chúng tôi sẽ tư vấn cùng bạn.",
  },
  {
    q: "Ảnh chân dung dùng để làm gì?",
    a: "Ảnh giúp việc cá nhân hoá diện mạo trở nên sát hơn, tinh tế hơn và giàu cảm xúc hơn.",
  },
  {
    q: "Khi nào có báo giá?",
    a: "Ngay sau khi nhận yêu cầu, chúng tôi xác nhận lựa chọn và gửi tư vấn kèm mức giá phù hợp.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <SiteHeader />

      <main className="relative">
        <div className="hero-orb left-[-12rem] top-20 h-[26rem] w-[26rem] bg-[#c98e6d]/20" />
        <div className="hero-orb right-[-9rem] top-32 h-[22rem] w-[22rem] bg-[#99a7ff]/10" />

        <section className="relative px-5 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-14">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[11px] tracking-[0.24em] text-[#f0dbc0] uppercase">
                <span className="h-2 w-2 rounded-full bg-[#f0dbc0]" />
                Figure Atelier
              </div>

              <h1 className="font-display mt-7 max-w-4xl text-5xl leading-[0.9] font-semibold tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
                Quà tặng
                <span className="block text-[#ecd6b7]">mang dấu ấn riêng</span>
                với cảm giác thật cao cấp.
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
                Một trải nghiệm chọn mẫu tinh gọn, hiện đại và đủ tinh tế để khách muốn ở lại lâu hơn. Mọi thứ được trình bày rõ ràng để việc chọn quà trở nên nhẹ nhàng và sang hơn.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/design"
                  className="premium-button inline-flex items-center justify-center rounded-full border border-[#f0d9b9]/30 bg-[#ebd7bd] px-7 py-4 text-sm font-semibold text-stone-950 shadow-[0_14px_40px_rgba(244,220,192,0.12)]"
                >
                  Bắt đầu chọn mẫu
                </Link>
                <a
                  href="#quy-trinh"
                  className="premium-button inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold text-stone-100"
                >
                  Xem quy trình
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Dáng mẫu", value: `${bodyBases.length}+ lựa chọn sẵn` },
                  { label: "Phong cách", value: `${outfitThemes.length} chủ đề nổi bật` },
                  { label: "Điểm nhấn", value: `${accessories.length} phụ kiện để chọn` },
                ].map((item, index) => (
                  <Reveal key={item.label} delayMs={index * 80}>
                    <div className="premium-card glass-panel-soft rounded-[28px] p-5">
                      <p className="text-sm text-stone-400">{item.label}</p>
                      <p className="mt-2 text-xl font-semibold text-stone-100">{item.value}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delayMs={100}>
              <div className="glass-panel hairline relative overflow-hidden rounded-[36px] p-4 sm:p-5">
                <div className="absolute inset-x-12 top-0 h-32 rounded-full bg-[#f0dbc0]/10 blur-3xl" />
                <div className="relative rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(14,15,20,0.96),rgba(17,18,24,0.86))] p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs tracking-[0.22em] text-stone-500 uppercase">Premium experience</p>
                      <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                        Một hành trình đặt quà mượt mà và tinh tế.
                      </h2>
                    </div>
                    <span className="rounded-full border border-[#f0dbc0]/20 bg-[#f0dbc0]/10 px-4 py-2 text-[11px] tracking-[0.18em] text-[#f2dec5] uppercase">
                      Calm motion
                    </span>
                  </div>

                  <div className="mt-8 grid gap-3">
                    {[
                      "Chọn dáng và kích thước phù hợp.",
                      "Phối phong cách theo dịp tặng.",
                      "Thêm phụ kiện để tạo dấu ấn.",
                      "Gửi ảnh để cá nhân hoá gương mặt.",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="premium-card flex items-center gap-4 rounded-[24px] border border-white/8 bg-white/4 p-4"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f0dbc0]/10 text-sm font-semibold text-[#f2dec5]">
                          0{index + 1}
                        </div>
                        <p className="text-sm leading-6 text-stone-300">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="glass-panel-soft rounded-[24px] p-4">
                      <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Kích thước</p>
                      <p className="mt-2 text-base font-semibold text-stone-100">
                        {sizeOptions.map((item) => item.id).join(" / ")}
                      </p>
                    </div>
                    <div className="glass-panel-soft rounded-[24px] p-4">
                      <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Cá nhân hoá</p>
                      <p className="mt-2 text-base font-semibold text-stone-100">
                        Gửi ảnh {"->"} duyệt phong cách {"->"} hoàn thiện
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="quy-trinh" className="scroll-mt-28 px-5 py-12 sm:px-6 lg:px-8 lg:py-18">
          <div className="mx-auto max-w-7xl">
            <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm tracking-[0.22em] text-[#ebd6ba] uppercase">Quy trình</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                  Từ lựa chọn đầu tiên đến món quà hoàn chỉnh.
                </h2>
              </div>
              <p className="max-w-xl text-base leading-8 text-stone-400">
                Mỗi bước đều được sắp xếp rõ ràng để khách dễ hình dung, dễ ra quyết định và luôn cảm thấy được chăm chút.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 lg:grid-cols-4">
              {processItems.map((item, index) => (
                <Reveal key={item.title} delayMs={index * 90}>
                  <article className="premium-card glass-panel-soft rounded-[30px] p-6">
                    <p className="text-xs tracking-[0.2em] text-stone-500 uppercase">{item.step}</p>
                    <h3 className="mt-4 text-xl font-semibold text-stone-100">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-stone-400">{item.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="gia-tri" className="scroll-mt-28 px-5 py-12 sm:px-6 lg:px-8 lg:py-18">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="glass-panel hairline rounded-[34px] p-7 sm:p-8">
                <p className="text-sm tracking-[0.22em] text-[#ebd6ba] uppercase">Giá trị</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                  Tinh tế, bình tĩnh và đủ sang để tạo thiện cảm ngay.
                </h2>
                <p className="mt-5 text-base leading-8 text-stone-400">
                  Giao diện được làm lại theo tinh thần tối giản cao cấp: khoảng trắng thoáng, typography rõ, chuyển động mềm và bề mặt kính mờ vừa đủ để tạo cảm giác hiện đại.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2">
              {valueItems.map((item, index) => (
                <Reveal key={item} delayMs={index * 80}>
                  <div className="premium-card glass-panel-soft rounded-[30px] p-6">
                    <div className="mb-5 h-10 w-10 rounded-2xl bg-[#ecd7ba]/10 ring-1 ring-[#ecd7ba]/12" />
                    <p className="text-sm leading-7 text-stone-300">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-6 lg:px-8 lg:py-18">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="glass-panel relative overflow-hidden rounded-[40px] px-6 py-10 text-center sm:px-10 sm:py-14">
                <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#f1dec4]/10 blur-3xl" />
                <p className="relative text-sm tracking-[0.22em] text-[#f1dcbc] uppercase">Sẵn sàng bắt đầu</p>
                <h2 className="relative mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                  Chọn mẫu trước, phần còn lại để chúng tôi đồng hành cùng bạn.
                </h2>
                <p className="relative mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-300">
                  Một trải nghiệm gọn gàng và mượt mà để khách chọn nhanh, cảm thấy yên tâm và muốn đi tiếp tới bước tư vấn.
                </p>
                <div className="relative mt-8">
                  <Link
                    href="/design"
                    className="premium-button inline-flex rounded-full border border-[#f0d9b9]/30 bg-[#ebd7bd] px-7 py-4 text-sm font-semibold text-stone-950"
                  >
                    Mở khu vực chọn mẫu
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28 px-5 py-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-18">
          <div className="mx-auto max-w-7xl">
            <Reveal className="max-w-2xl">
              <p className="text-sm tracking-[0.22em] text-[#ebd6ba] uppercase">FAQ</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                Mọi thứ cần biết, được trình bày thật gọn.
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {faqItems.map((item, index) => (
                <Reveal key={item.q} delayMs={index * 80}>
                  <article className="premium-card glass-panel-soft rounded-[30px] p-6">
                    <h3 className="text-lg font-semibold text-stone-100">{item.q}</h3>
                    <p className="mt-4 text-sm leading-7 text-stone-400">{item.a}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
