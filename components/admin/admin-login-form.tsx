"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = (await response.json()) as { success: boolean; message?: string };

    if (!response.ok || !result.success) {
      setStatus("error");
      setMessage(result.message ?? "Không thể đăng nhập.");
      return;
    }

    router.push(searchParams.get("next") || "/admin");
    router.refresh();
  };

  return (
    <form className="glass-panel hairline rounded-[34px] p-8" onSubmit={handleSubmit}>
      <p className="text-sm tracking-[0.22em] text-[#ead3b4] uppercase">Admin login</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-white">Đăng nhập quản trị</h1>
      <p className="mt-4 text-sm leading-7 text-stone-400">
        Khu vực này chỉ dành cho tài khoản nội bộ để xử lý đơn hàng, model và phản hồi.
      </p>

      <div className="mt-6 space-y-4">
        <label className="block space-y-2">
          <span className="text-sm text-stone-300">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-[24px] border border-white/10 bg-white/4 px-4 py-3 text-sm text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-[#ead3b4]/45 focus:bg-white/6"
            placeholder="admin@figureatelier.com"
            required
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm text-stone-300">Mật khẩu</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-[24px] border border-white/10 bg-white/4 px-4 py-3 text-sm text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-[#ead3b4]/45 focus:bg-white/6"
            placeholder="••••••••"
            required
          />
        </label>
      </div>

      {status === "error" ? (
        <div className="mt-4 rounded-[20px] border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-200">
          {message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="premium-button mt-6 inline-flex rounded-full border border-[#f0d9b9]/30 bg-[#ebd7bd] px-6 py-3 text-sm font-semibold text-stone-950 disabled:opacity-70"
      >
        {status === "loading" ? "Đang đăng nhập..." : "Vào dashboard"}
      </button>
    </form>
  );
}
