"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { id: "quy-trinh", label: "Quy trình" },
  { id: "gia-tri", label: "Giá trị" },
  { id: "faq", label: "FAQ" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  const handleSectionNavigate = (sectionId: string) => {
    setIsMenuOpen(false);

    if (pathname === "/") {
      const section = document.getElementById(sectionId);
      if (!section) return;

      section.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${sectionId}`);
      return;
    }

    window.location.assign(`/#${sectionId}`);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/10 bg-[rgba(11,12,16,0.72)] shadow-[0_18px_40px_rgba(0,0,0,0.16)] backdrop-blur-2xl"
          : "border-b border-transparent bg-[rgba(11,12,16,0.34)] backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-sm font-semibold tracking-[0.24em] text-stone-100 transition duration-300 group-hover:border-white/18 group-hover:bg-white/10">
            F3D
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.22em] text-stone-50 uppercase">Figure Atelier</p>
            <p className="text-xs text-stone-400">Quà tặng cá nhân hoá</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/5 p-1.5 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSectionNavigate(item.id)}
              className="rounded-full px-4 py-2 text-sm text-stone-300 transition duration-300 hover:bg-white/8 hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/design"
            className="premium-button hidden rounded-full border border-[#f0d9b9]/30 bg-[#ebd7bd] px-5 py-2.5 text-sm font-medium text-stone-950 shadow-[0_10px_30px_rgba(244,220,192,0.12)] md:inline-flex"
          >
            Bắt đầu chọn mẫu
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-stone-100 transition duration-300 hover:bg-white/10 md:hidden"
            aria-label="Mở menu"
            aria-expanded={isMenuOpen}
          >
            <div className="flex w-4 flex-col gap-1.5">
              <span
                className={`block h-px bg-current transition duration-300 ${isMenuOpen ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span className={`block h-px bg-current transition duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
              <span
                className={`block h-px bg-current transition duration-300 ${isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-white/8 bg-[rgba(12,12,16,0.82)] backdrop-blur-2xl transition-all duration-300 md:hidden ${
          isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSectionNavigate(item.id)}
              className="rounded-2xl border border-white/6 bg-white/4 px-4 py-3 text-left text-sm text-stone-200 transition duration-300 hover:bg-white/8"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {item.label}
            </button>
          ))}
          <Link
            href="/design"
            onClick={() => setIsMenuOpen(false)}
            className="premium-button mt-2 inline-flex items-center justify-center rounded-2xl border border-[#f0d9b9]/30 bg-[#ebd7bd] px-4 py-3 text-sm font-medium text-stone-950"
          >
            Bắt đầu chọn mẫu
          </Link>
        </div>
      </div>
    </header>
  );
}
