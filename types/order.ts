import type { FigureConfig } from "@/types/figure";

export type OrderStatus =
  | "new"
  | "in_review"
  | "model_ready"
  | "waiting_feedback"
  | "approved"
  | "production"
  | "completed";

export type OrderAsset = {
  kind: "model" | "preview";
  url: string;
  fileName: string;
  uploadedAt: string;
};

export type OrderFeedback = {
  message: string;
  createdAt: string;
};

export type GiftOrder = {
  id: string;
  reviewToken: string;
  customerName: string;
  email: string;
  phone: string;
  note: string;
  imageUrl: string;
  imageFileName: string;
  config: FigureConfig;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  assets: OrderAsset[];
  feedback: OrderFeedback[];
};

export type CreateOrderInput = {
  customerName: string;
  email: string;
  phone: string;
  note: string;
  imageUrl: string;
  imageFileName: string;
  config: FigureConfig;
};
