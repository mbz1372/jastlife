import { demoProducts, getDemoProduct } from "./catalog";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SERVICE_KEY);
}

async function supabaseFetch(path, options = {}) {
  if (!isSupabaseConfigured()) throw new Error("Supabase is not configured");
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Supabase ${response.status}: ${message}`);
  }
  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function getProducts() {
  if (!isSupabaseConfigured()) return demoProducts;
  try {
    const rows = await supabaseFetch("/rest/v1/products?active=eq.true&select=*&order=created_at.desc");
    return Array.isArray(rows) && rows.length ? rows : demoProducts;
  } catch (error) {
    console.error("getProducts fallback:", error.message);
    return demoProducts;
  }
}

export async function getProductBySlug(slug) {
  if (!isSupabaseConfigured()) return getDemoProduct(slug);
  try {
    const rows = await supabaseFetch(`/rest/v1/products?slug=eq.${encodeURIComponent(slug)}&active=eq.true&select=*&limit=1`);
    return rows?.[0] || getDemoProduct(slug);
  } catch (error) {
    console.error("getProductBySlug fallback:", error.message);
    return getDemoProduct(slug);
  }
}

export async function insertProduct(product) {
  return supabaseFetch("/rest/v1/products", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(product),
  });
}

export async function updateProduct(id, patch) {
  return supabaseFetch(`/rest/v1/products?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(patch),
  });
}

export async function createOrder(order, items) {
  if (!isSupabaseConfigured()) return { ...order, id: null, persisted: false };
  const created = await supabaseFetch("/rest/v1/orders", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(order),
  });
  const savedOrder = created?.[0];
  if (!savedOrder) throw new Error("Order insert returned no row");
  if (items.length) {
    await supabaseFetch("/rest/v1/order_items", {
      method: "POST",
      body: JSON.stringify(items.map((item) => ({ ...item, order_id: savedOrder.id }))),
    });
  }
  return { ...savedOrder, persisted: true };
}

export async function markOrderPaid(orderCode) {
  if (!isSupabaseConfigured()) return;
  await supabaseFetch(`/rest/v1/orders?order_code=eq.${encodeURIComponent(orderCode)}`, {
    method: "PATCH",
    body: JSON.stringify({ payment_status: "paid", status: "processing", paid_at: new Date().toISOString() }),
  });
}

export async function uploadProductImage(file) {
  if (!isSupabaseConfigured()) throw new Error("Supabase is not configured");
  const safe = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
  const path = `${Date.now()}-${crypto.randomUUID()}-${safe}`;
  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/products/${path}`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "false",
    },
    body: file,
  });
  if (!response.ok) throw new Error(await response.text());
  return `${SUPABASE_URL}/storage/v1/object/public/products/${path}`;
}
