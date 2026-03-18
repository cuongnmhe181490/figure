import { promises as fs } from "fs";
import path from "path";
import { randomBytes, randomUUID } from "crypto";
import type { CreateOrderInput, GiftOrder, OrderAsset, OrderFeedback, OrderStatus } from "@/types/order";

const dataDir = path.join(process.cwd(), "data");
const ordersFile = path.join(dataDir, "orders.json");
const uploadDir = path.join(process.cwd(), "public", "uploads");

type OrdersPayload = {
  orders: GiftOrder[];
};

declare global {
  var __figureOrdersPayload: OrdersPayload | undefined;
}

function getMemoryPayload() {
  if (!globalThis.__figureOrdersPayload) {
    globalThis.__figureOrdersPayload = { orders: [] };
  }

  return globalThis.__figureOrdersPayload;
}

async function tryReadFilePayload(): Promise<OrdersPayload | null> {
  try {
    const raw = await fs.readFile(ordersFile, "utf8");
    return JSON.parse(raw) as OrdersPayload;
  } catch {
    return null;
  }
}

async function tryWriteFilePayload(payload: OrdersPayload) {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(ordersFile, JSON.stringify(payload, null, 2), "utf8");
    return true;
  } catch {
    return false;
  }
}

async function readPayload(): Promise<OrdersPayload> {
  const filePayload = await tryReadFilePayload();
  if (filePayload) {
    globalThis.__figureOrdersPayload = filePayload;
    return filePayload;
  }

  return getMemoryPayload();
}

async function writePayload(payload: OrdersPayload) {
  globalThis.__figureOrdersPayload = payload;
  await tryWriteFilePayload(payload);
}

function generateReviewToken() {
  return randomBytes(24).toString("hex");
}

export async function listOrders() {
  const payload = await readPayload();
  return payload.orders.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getOrderById(id: string) {
  const payload = await readPayload();
  return payload.orders.find((order) => order.id === id) ?? null;
}

export async function getOrderByReviewToken(reviewToken: string) {
  const payload = await readPayload();
  return payload.orders.find((order) => order.reviewToken === reviewToken) ?? null;
}

export async function createOrder(input: CreateOrderInput) {
  const now = new Date().toISOString();
  const order: GiftOrder = {
    id: randomUUID(),
    reviewToken: generateReviewToken(),
    customerName: input.customerName,
    email: input.email,
    phone: input.phone,
    note: input.note,
    imageUrl: input.imageUrl,
    imageFileName: input.imageFileName,
    config: input.config,
    status: "new",
    createdAt: now,
    updatedAt: now,
    assets: [],
    feedback: [],
  };

  const payload = await readPayload();
  payload.orders.unshift(order);
  await writePayload(payload);
  return order;
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const payload = await readPayload();
  const order = payload.orders.find((item) => item.id === id);
  if (!order) return null;

  order.status = status;
  order.updatedAt = new Date().toISOString();
  await writePayload(payload);
  return order;
}

export async function addOrderAsset(id: string, asset: OrderAsset) {
  const payload = await readPayload();
  const order = payload.orders.find((item) => item.id === id);
  if (!order) return null;

  order.assets.unshift(asset);
  order.updatedAt = new Date().toISOString();
  await writePayload(payload);
  return order;
}

export async function addOrderFeedback(reviewToken: string, message: string) {
  const payload = await readPayload();
  const order = payload.orders.find((item) => item.reviewToken === reviewToken);
  if (!order) return null;

  const feedback: OrderFeedback = {
    message,
    createdAt: new Date().toISOString(),
  };

  order.feedback.unshift(feedback);
  order.status = "in_review";
  order.updatedAt = feedback.createdAt;
  await writePayload(payload);
  return order;
}

export async function saveUpload(fileName: string, content: ArrayBuffer, mimeType: string) {
  const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9._-]/g, "-")}`;

  try {
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, safeName);
    await fs.writeFile(filePath, Buffer.from(content));
    return `/uploads/${safeName}`;
  } catch {
    const base64 = Buffer.from(content).toString("base64");
    return `data:${mimeType || "application/octet-stream"};base64,${base64}`;
  }
}
