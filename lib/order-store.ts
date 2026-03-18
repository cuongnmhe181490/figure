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

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.mkdir(uploadDir, { recursive: true });

  try {
    await fs.access(ordersFile);
  } catch {
    await fs.writeFile(ordersFile, JSON.stringify({ orders: [] } satisfies OrdersPayload, null, 2), "utf8");
  }
}

async function readPayload(): Promise<OrdersPayload> {
  await ensureStore();
  const raw = await fs.readFile(ordersFile, "utf8");
  return JSON.parse(raw) as OrdersPayload;
}

async function writePayload(payload: OrdersPayload) {
  await fs.writeFile(ordersFile, JSON.stringify(payload, null, 2), "utf8");
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

export async function saveUpload(fileName: string, content: ArrayBuffer) {
  await ensureStore();
  const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
  const filePath = path.join(uploadDir, safeName);
  await fs.writeFile(filePath, Buffer.from(content));
  return `/uploads/${safeName}`;
}
