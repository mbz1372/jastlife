import { NextResponse } from "next/server";
import { getProducts, insertProduct, isSupabaseConfigured, updateProduct } from "../../../lib/supabase-rest";

function authorized(request) {
  const expected = process.env.ADMIN_SECRET;
  if (!expected) return false;
  return request.headers.get("x-admin-key") === expected;
}

function cleanProduct(body) {
  const name = String(body.name || "").trim();
  const slug = String(body.slug || "").trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  if (!name || !slug) throw new Error("نام و slug الزامی است");
  const price = Math.max(0, Number(body.price || 0));
  const compareAt = body.compare_at_price ? Math.max(0, Number(body.compare_at_price)) : null;
  const stock = Math.max(0, Math.floor(Number(body.stock || 0)));
  return {
    name,
    slug,
    category: String(body.category || "سایر").trim(),
    subtitle: String(body.subtitle || "").trim(),
    description: String(body.description || "").trim(),
    price,
    compare_at_price: compareAt,
    stock,
    badge: String(body.badge || "").trim() || null,
    type: String(body.type || "case").trim(),
    image_url: String(body.image_url || "").trim() || null,
    active: body.active !== false,
  };
}

export async function GET() {
  const products = await getProducts();
  return NextResponse.json({ products, mode: isSupabaseConfigured() ? "supabase" : "demo" });
}

export async function POST(request) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase env vars تنظیم نشده‌اند." }, { status: 503 });
  if (!authorized(request)) return NextResponse.json({ error: "دسترسی مدیریت معتبر نیست." }, { status: 401 });
  try {
    const body = await request.json();
    const rows = await insertProduct(cleanProduct(body));
    return NextResponse.json({ product: rows?.[0] || null }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "ثبت محصول ناموفق بود" }, { status: 400 });
  }
}

export async function PATCH(request) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase env vars تنظیم نشده‌اند." }, { status: 503 });
  if (!authorized(request)) return NextResponse.json({ error: "دسترسی مدیریت معتبر نیست." }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.id) throw new Error("شناسه محصول الزامی است");
    const rows = await updateProduct(body.id, cleanProduct(body));
    return NextResponse.json({ product: rows?.[0] || null });
  } catch (error) {
    return NextResponse.json({ error: error.message || "ویرایش محصول ناموفق بود" }, { status: 400 });
  }
}
