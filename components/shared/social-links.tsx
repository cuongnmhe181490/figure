"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type SocialItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

const iconClassName = "h-[18px] w-[18px]";

const socialItems: SocialItem[] = [
  {
    label: "Zalo",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={iconClassName}>
        <path d="M4.5 7.5c0-1.657 1.343-3 3-3h9c1.657 0 3 1.343 3 3v6.5c0 1.657-1.343 3-3 3H11l-3.75 2.5V17H7.5c-1.657 0-3-1.343-3-3V7.5Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8.5 9.25h2.7l-2.7 5.5h2.95M13.6 9.25h2.9l-2.9 5.5h2.9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={iconClassName}>
        <path d="M13.25 20v-6h2.2l.35-2.6h-2.55v-1.7c0-.75.2-1.3 1.3-1.3H16V6.05c-.25-.03-1.08-.1-2.05-.1-2.03 0-3.45 1.24-3.45 3.5v1.95H8.25V14h2.25v6h2.75Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={iconClassName}>
        <path d="M14.75 5.5c.28 1.52 1.5 2.72 3.05 2.95v2.3c-1.18-.03-2.28-.4-3.05-1.02v4.77a4.5 4.5 0 1 1-4.5-4.5c.28 0 .55.03.8.08v2.35a2.25 2.25 0 1 0 1.45 2.1V5.5h2.25Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={iconClassName}>
        <rect x="4.75" y="4.75" width="14.5" height="14.5" rx="4.25" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16.4" cy="7.6" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

export function SocialLinks() {
  return (
    <div className="max-w-md">
      <p className="text-sm leading-7 text-stone-400">
        Kết nối với chúng tôi qua kênh bạn thuận tiện nhất để xem thêm mẫu hoàn thiện và tiếp tục trao đổi.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {socialItems.map((item) => {
          const isPlaceholder = item.href === "#";

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={`Mở ${item.label}`}
              {...(!isPlaceholder ? { target: "_blank", rel: "noreferrer" } : {})}
              className="premium-button inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stone-300 transition hover:border-[#ead3b4]/25 hover:bg-white/8 hover:text-[#f3dfc7]"
            >
              {item.icon}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
