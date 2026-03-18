"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type ReviewFeedbackFormProps = {
  token: string;
};

export function ReviewFeedbackForm({ token }: ReviewFeedbackFormProps) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    const response = await fetch(`/api/review/${token}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const result = (await response.json()) as { success: boolean; message?: string };

    if (!response.ok || !result.success) {
      setStatus("error");
      setStatusMessage(result.message ?? "Không thể gửi phản hồi lúc này.");
      return;
    }

    setStatus("success");
    setStatusMessage(result.message ?? "Phản hồi đã được ghi nhận.");
    setMessage("");
  };

  return (
    <form className="glass-panel-soft rounded-[30px] p-6" onSubmit={handleSubmit}>
      <p className="text-sm tracking-[0.22em] text-stone-500 uppercase">Phản hồi</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Gửi góp ý cho phiên bản hiện tại</h3>
      <textarea
        rows={5}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Ví dụ: mong muốn chỉnh lại màu áo, muốn gương mặt mềm hơn, hoặc đã có thể chốt..."
        className="mt-5 w-full rounded-[24px] border border-white/10 bg-white/4 px-4 py-3 text-sm text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-[#ead3b4]/45 focus:bg-white/6"
      />
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-stone-400">Khách có thể phản hồi trực tiếp từ link này mà không cần đăng nhập.</p>
        <button
          type="submit"
          disabled={status === "loading"}
          className="premium-button rounded-full border border-[#f0d9b9]/30 bg-[#ebd7bd] px-6 py-3 text-sm font-semibold text-stone-950 disabled:opacity-70"
        >
          {status === "loading" ? "Đang gửi..." : "Gửi phản hồi"}
        </button>
      </div>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 rounded-[20px] border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-200"
        >
          {statusMessage}
        </motion.div>
      ) : null}

      {status === "error" ? (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 rounded-[20px] border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-200"
        >
          {statusMessage}
        </motion.div>
      ) : null}
    </form>
  );
}
