import { NextResponse } from "next/server";

function authorized(request) {
  const secret = process.env.ADMIN_SECRET;
  return Boolean(secret) && request.headers.get("x-admin-key") === secret;
}

function extractImageUrl(value) {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return null;
  return value.url?.[0] || value.url || value.src || value.uri || null;
}

export async function GET(request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!/^[1-9]\d{0,11}$/.test(id || "")) {
    return NextResponse.json({ error: "شناسه عددی دیجی‌کالا معتبر نیست" }, { status: 400 });
  }
  try {
    const response = await fetch(`https://api.digikala.com/v2/product/${id}/`, {
      headers: { Accept: "application/json", "User-Agent": "JASTLIFE-ImageReview/1.0" },
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Digikala HTTP ${response.status}`);
    const product = (await response.json())?.data?.product;
    if (!product) throw new Error("محصول یافت نشد");
    const images = [product.images?.main, ...(product.images?.list || [])]
      .map(extractImageUrl)
      .filter((value) => typeof value === "string" && /^https:\/\//i.test(value));
    const unique = [...new Set(images)].slice(0, 12);
    const url = product.url?.uri;
    return NextResponse.json({
      id: String(id),
      name: product.title_fa || "",
      brand: product.brand?.title_fa || "",
      model: product.title_en || "",
      source_url: typeof url === "string" && url.startsWith("/") ? `https://www.digikala.com${url}` : `https://www.digikala.com/product/dkp-${id}/`,
      images: unique,
      warning: "قبل از استفاده تجاری، هویت دقیق کالا و حق استفاده از تصاویر را بررسی کنید.",
    });
  } catch (error) {
    return NextResponse.json({ error: "دریافت تصاویر ممکن نشد؛ ممکن است API دیجی‌کالا محدود شده باشد.", detail: String(error.message || "") }, { status: 502 });
  }
}
