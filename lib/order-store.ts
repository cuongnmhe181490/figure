import { promises as fs } from "fs";
import path from "path";
import { randomBytes, randomUUID } from "crypto";
import { getSupabaseAdminClient, getSupabaseStorageBucket, hasSupabaseServiceEnv, hasSupabaseStorageEnv } from "@/lib/supabase";
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
  if (hasSupabaseServiceEnv) {
    const supabase = getSupabaseAdminClient();
    if (supabase) {
      const { data, error } = await supabase.from("gift_orders").select("*").order("created_at", { ascending: false });
      if (!error && data) {
        return { orders: data.map(normalizeOrderRecord) };
      }
    }
  }

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

type OrderRecord = {
  id: string;
  review_token: string;
  customer_name: string;
  email: string;
  phone: string;
  note: string;
  image_url: string;
  image_file_name: string;
  config: GiftOrder["config"];
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  assets: OrderAsset[] | null;
  feedback: OrderFeedback[] | null;
};

function normalizeOrderRecord(record: OrderRecord): GiftOrder {
  return {
    id: record.id,
    reviewToken: record.review_token,
    customerName: record.customer_name,
    email: record.email,
    phone: record.phone,
    note: record.note,
    imageUrl: record.image_url,
    imageFileName: record.image_file_name,
    config: record.config,
    status: record.status,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
    assets: record.assets ?? [],
    feedback: record.feedback ?? [],
  };
}

function serializeOrder(order: GiftOrder) {
  return {
    id: order.id,
    review_token: order.reviewToken,
    customer_name: order.customerName,
    email: order.email,
    phone: order.phone,
    note: order.note,
    image_url: order.imageUrl,
    image_file_name: order.imageFileName,
    config: order.config,
    status: order.status,
    created_at: order.createdAt,
    updated_at: order.updatedAt,
    assets: order.assets,
    feedback: order.feedback,
  };
}

function generateReviewToken() {
  return randomBytes(24).toString("hex");
}

export async function listOrders() {
  const payload = await readPayload();
  return payload.orders.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getOrderById(id: string) {
  if (hasSupabaseServiceEnv) {
    const supabase = getSupabaseAdminClient();
    if (supabase) {
      const { data, error } = await supabase.from("gift_orders").select("*").eq("id", id).maybeSingle();
      if (!error && data) return normalizeOrderRecord(data as OrderRecord);
    }
  }

  const payload = await readPayload();
  return payload.orders.find((order) => order.id === id) ?? null;
}

export async function getOrderByReviewToken(reviewToken: string) {
  if (hasSupabaseServiceEnv) {
    const supabase = getSupabaseAdminClient();
    if (supabase) {
      const { data, error } = await supabase.from("gift_orders").select("*").eq("review_token", reviewToken).maybeSingle();
      if (!error && data) return normalizeOrderRecord(data as OrderRecord);
    }
  }

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

  if (hasSupabaseServiceEnv) {
    const supabase = getSupabaseAdminClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("gift_orders")
        .insert(serializeOrder(order))
        .select("*")
        .single();

      if (!error && data) {
        return normalizeOrderRecord(data as OrderRecord);
      }
    }
  }

  const payload = await readPayload();
  payload.orders.unshift(order);
  await writePayload(payload);
  return order;
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  if (hasSupabaseServiceEnv) {
    const supabase = getSupabaseAdminClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("gift_orders")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select("*")
        .single();

      if (!error && data) return normalizeOrderRecord(data as OrderRecord);
    }
  }

  const payload = await readPayload();
  const order = payload.orders.find((item) => item.id === id);
  if (!order) return null;

  order.status = status;
  order.updatedAt = new Date().toISOString();
  await writePayload(payload);
  return order;
}

export async function addOrderAsset(id: string, asset: OrderAsset) {
  if (hasSupabaseServiceEnv) {
    const supabase = getSupabaseAdminClient();
    if (supabase) {
      const order = await getOrderById(id);
      if (!order) return null;

      const nextAssets = [asset, ...order.assets];
      const { data, error } = await supabase
        .from("gift_orders")
        .update({ assets: nextAssets, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select("*")
        .single();

      if (!error && data) return normalizeOrderRecord(data as OrderRecord);
    }
  }

  const payload = await readPayload();
  const order = payload.orders.find((item) => item.id === id);
  if (!order) return null;

  order.assets.unshift(asset);
  order.updatedAt = new Date().toISOString();
  await writePayload(payload);
  return order;
}

export async function addOrderFeedback(reviewToken: string, message: string) {
  if (hasSupabaseServiceEnv) {
    const supabase = getSupabaseAdminClient();
    if (supabase) {
      const order = await getOrderByReviewToken(reviewToken);
      if (!order) return null;

      const feedback: OrderFeedback = {
        message,
        createdAt: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("gift_orders")
        .update({
          feedback: [feedback, ...order.feedback],
          status: "in_review",
          updated_at: feedback.createdAt,
        })
        .eq("review_token", reviewToken)
        .select("*")
        .single();

      if (!error && data) return normalizeOrderRecord(data as OrderRecord);
    }
  }

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
  if (hasSupabaseStorageEnv) {
    const supabase = getSupabaseAdminClient();
    const bucket = getSupabaseStorageBucket();

    if (supabase && bucket) {
      const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
      const { error } = await supabase.storage.from(bucket).upload(safeName, Buffer.from(content), {
        contentType: mimeType || "application/octet-stream",
        upsert: true,
      });

      if (!error) {
        const { data } = supabase.storage.from(bucket).getPublicUrl(safeName);
        return data.publicUrl;
      }
    }
  }

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
