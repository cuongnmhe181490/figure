import type { OrderStatus } from "@/types/order";

export const orderStatusLabel: Record<OrderStatus, string> = {
  new: "Mới tạo",
  in_review: "Đang xem lại",
  model_ready: "Đã có model",
  waiting_feedback: "Chờ phản hồi",
  approved: "Đã duyệt",
  production: "Đang hoàn thiện",
  completed: "Hoàn tất",
};

export const orderStatusTone: Record<OrderStatus, string> = {
  new: "border-[#ead3b4]/20 bg-[#ead3b4]/10 text-[#f3dfc7]",
  in_review: "border-sky-400/20 bg-sky-500/10 text-sky-200",
  model_ready: "border-violet-400/20 bg-violet-500/10 text-violet-200",
  waiting_feedback: "border-amber-400/20 bg-amber-500/10 text-amber-100",
  approved: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200",
  production: "border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-200",
  completed: "border-white/10 bg-white/8 text-stone-200",
};
