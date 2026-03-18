import Link from "next/link";
import { accessories, bodyBases, outfitThemes, sizeOptions } from "@/data/figure-options";
import { Reveal } from "@/components/shared/reveal";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

const processItems = [
  {
    step: "01",
    title: "Chọn mẫu figure",
    text: "Chọn dáng, size, trang phục và điểm nhấn phù hợp với món quà của bạn.",
  },
  {
    step: "02",
    title: "Gửi ảnh chân dung",
    text: "Bạn có thể gửi ảnh ngay trên web hoặc gửi sau qua kênh liên hệ thuận tiện.",
  },
  {
    step: "03",
    title: "Nhận tư vấn chi tiết",
    text: "Đội ngũ sẽ liên hệ để xác nhận lựa chọn và gợi ý phương án phù hợp hơn.",
  },
  {
    step: "04",
    title: "Hoàn thiện phiên bản riêng",
    text: "Sau khi thống nhất, chúng tôi sẽ hoàn thiện phiên bản cá nhân hoá dành riêng cho bạn.",
  },
];

const valueItems = [
  { id: "01", text: "Khách có thể chọn mẫu trước theo cách ngắn gọn và dễ hiểu." },
  { id: "02", text: "Mọi lựa chọn đều hướng tới cảm giác quà tặng tinh tế và chỉn chu." },
  { id: "03", text: "Ảnh chân dung chỉ dùng để hoàn thiện phần đầu riêng sau khi chốt mẫu." },
  { id: "04", text: "Phù hợp cho sinh nhật, kỷ niệm, cưới hỏi và quà doanh nghiệp." },
];

const faqItems = [
  {
    q: "Khách cần chuẩn bị gì?",
    a: "Chỉ cần chọn mẫu và để lại thông tin. Nếu có ảnh sẵn, bạn có thể gửi ngay hoặc gửi sau đều được.",
  },
  {
    q: "Ảnh chân dung được dùng khi nào?",
    a: "Ảnh được dùng sau bước chọn mẫu để hoàn thiện phần đầu riêng. Đây là tư liệu tham chiếu, không phải bước bắt buộc ngay từ đầu.",
  },
  {
    q: "Sau khi gửi yêu cầu thì sao?",
    a: "Đội ngũ sẽ liên hệ riêng để xác nhận lựa chọn, tư vấn thêm và chốt phương án phù hợp.",
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
                Thiết kế figure
                <span className="block text-[#ecd6b7]">mang dấu ấn riêng</span>
                cho món quà đáng nhớ.
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
                Chọn mẫu phù hợp trước trên web. Ảnh chân dung có thể gửi ngay hoặc gửi sau để đội ngũ hoàn thiện phần đầu theo phiên bản riêng.
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

              <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:auto-rows-fr">
                {[
                  { label: "Dáng mẫu", value: `${bodyBases.length}+ lựa chọn sẵn` },
                  { label: "Phong cách", value: `${outfitThemes.length} chủ đề nổi bật` },
                  { label: "Điểm nhấn", value: `${accessories.length} phụ kiện để chọn` },
                ].map((item, index) => (
                  <Reveal key={item.label} delayMs={index * 80} className="h-full">
                    <div className="premium-card glass-panel-soft flex h-full min-h-[128px] flex-col justify-between rounded-[28px] p-5">
                      <p className="text-sm text-stone-400">{item.label}</p>
                      <p className="mt-2 text-[1.85rem] leading-none font-semibold tracking-[-0.03em] text-stone-100">
                        {item.value}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delayMs={100}>
              <div className="glass-panel hairline relative overflow-hidden rounded-[36px] p-4 sm:p-5">
                <div className="absolute inset-x-12 top-0 h-32 rounded-full bg-[#f0dbc0]/10 blur-3xl" />
                <div className="relative rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(14,15,20,0.96),rgba(17,18,24,0.86))] p-5 sm:p-6">
                  <div>
                    <p className="text-xs tracking-[0.22em] text-stone-500 uppercase">Trải nghiệm chọn mẫu</p>
                    <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                      Chọn trước phiên bản phù hợp, phần còn lại để chúng tôi hoàn thiện.
                    </h2>
                  </div>

                  <div className="mt-8 grid gap-3">
                    {[
                      "Chọn dáng và size phù hợp.",
                      "Phối trang phục theo dịp tặng.",
                      "Thêm phụ kiện để tạo dấu ấn.",
                      "Gửi ảnh ngay hoặc gửi sau khi thuận tiện.",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="premium-card flex min-h-[78px] items-center gap-4 rounded-[24px] border border-white/8 bg-white/4 p-4"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f0dbc0]/10 text-sm font-semibold text-[#f2dec5]">
                          0{index + 1}
                        </div>
                        <p className="text-sm leading-6 text-stone-300">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:auto-rows-fr">
                    <Reveal delayMs={260} className="h-full">
                      <div className="premium-card glass-panel-soft flex h-full min-h-[108px] flex-col rounded-[24px] p-4">
                        <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Kích thước</p>
                        <p className="mt-2 text-base font-semibold text-stone-100">
                          {sizeOptions.map((item) => item.id).join(" / ")}
                        </p>
                      </div>
                    </Reveal>
                    <Reveal delayMs={320} className="h-full">
                      <div className="premium-card glass-panel-soft flex h-full min-h-[108px] flex-col rounded-[24px] p-4">
                        <p className="text-xs tracking-[0.18em] text-stone-500 uppercase">Cá nhân hoá</p>
                        <p className="mt-2 text-base font-semibold text-stone-100">
                          Chọn mẫu {"->"} gửi ảnh khi tiện {"->"} nhận tư vấn
                        </p>
                      </div>
                    </Reveal>
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
                  Bốn bước gọn để đi từ ý tưởng đến phiên bản riêng.
                </h2>
              </div>
              <p className="max-w-xl text-base leading-8 text-stone-400">
                Mọi thứ bắt đầu từ việc chọn mẫu trước. Ảnh chân dung có thể bổ sung ngay hoặc gửi sau khi đội ngũ liên hệ tư vấn.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 lg:grid-cols-4 lg:auto-rows-fr">
              {processItems.map((item, index) => (
                <Reveal key={item.title} delayMs={index * 90} className="h-full">
                  <article className="premium-card glass-panel-soft flex h-full min-h-[228px] flex-col rounded-[30px] p-6">
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
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <Reveal delayMs={60} className="h-full">
              <div className="premium-card glass-panel hairline flex h-full flex-col rounded-[34px] p-7 sm:p-8">
                <p className="text-sm tracking-[0.22em] text-[#ebd6ba] uppercase">Giá trị</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                  Tinh tế để dễ chọn, rõ ràng để dễ chốt.
                </h2>
                <p className="mt-5 text-base leading-8 text-stone-400">
                  Website được thiết kế như nơi khách xem mẫu và gửi yêu cầu tư vấn, không phải một hệ thống mua hàng phức tạp.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2 md:auto-rows-fr">
              {valueItems.map((item, index) => (
                <Reveal key={item.id} delayMs={index * 80} className="h-full">
                  <div className="premium-card glass-panel-soft flex h-full min-h-[166px] flex-col rounded-[30px] p-6">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ecd7ba]/10 text-xs font-semibold tracking-[0.18em] text-[#ecd7ba] ring-1 ring-[#ecd7ba]/12">
                      {item.id}
                    </div>
                    <p className="text-sm leading-7 text-stone-300">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-6 lg:px-8 lg:py-18">
          <div className="mx-auto max-w-7xl">
            <Reveal delayMs={80}>
              <div className="premium-card glass-panel relative overflow-hidden rounded-[40px] px-6 py-10 text-center sm:px-10 sm:py-14">
                <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#f1dec4]/10 blur-3xl" />
                <p className="relative text-sm tracking-[0.22em] text-[#f1dcbc] uppercase">Sẵn sàng bắt đầu</p>
                <h2 className="relative mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                  Chọn mẫu phù hợp, phần còn lại để chúng tôi đồng hành cùng bạn.
                </h2>
                <p className="relative mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-300">
                  Preview giúp bạn hình dung tổng thể trước. Sau khi gửi yêu cầu, đội ngũ sẽ liên hệ riêng và hoàn thiện phần đầu từ ảnh chân dung bạn gửi sau đó.
                </p>
                <div className="relative mt-8">
                  <Link
                    href="/design"
                    className="premium-button inline-flex rounded-full border border-[#f0d9b9]/30 bg-[#ebd7bd] px-7 py-4 text-sm font-semibold text-stone-950"
                  >
                    Bắt đầu chọn mẫu
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
                Mọi điều cần biết, thật ngắn và rõ.
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-3 md:auto-rows-fr">
              {faqItems.map((item, index) => (
                <Reveal key={item.q} delayMs={index * 80} className="h-full">
                  <article className="premium-card glass-panel-soft flex h-full min-h-[190px] flex-col rounded-[30px] p-6">
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
