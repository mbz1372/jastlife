import { NextResponse } from "next/server";
import { createOrder, getProducts, markOrderPaid } from "../../../lib/supabase-rest";

function cleanText(value, max = 240) {
  return String(value || "").trim().slice(0, max);
}

function orderCode() {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `JAST-${yy}${mm}${dd}-${rand}`;
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const customer = payload?.customer || {};
    const requested = Array.isArray(payload?.items) ? payload.items : [];
    if (!cleanText(customer.name, 120) || !cleanText(customer.phone, 30) || !cleanText(customer.address, 500)) {
      return NextResponse.json({ error: "نام، موبایل و آدرس الزامی است." }, { status: 400 });
    }
    if (!requested.length) return NextResponse.json({ error: "سبد خرید خالی است." }, { status: 400 });

    const products = await getProducts();
    const byId = new Map(products.map((product) => [String(product.id), product]));
    const lines = [];
    let subtotal = 0;

    for (const requestedItem of requested) {
      const product = byId.get(String(requestedItem.id));
      if (!product || product.active === false) return NextResponse.json({ error: "یکی از محصولات دیگر قابل سفارش نیست." }, { status: 409 });
      const qty = Math.max(1, Math.floor(Number(requestedItem.qty || 1)));
      if (Number(product.stock || 0) < qty) return NextResponse.json({ error: `موجودی ${product.name} کافی نیست.` }, { status: 409 });
      const unitPrice = Number(product.price || 0);
      subtotal += unitPrice * qty;
      lines.push({ product_id: product.id, product_name: product.name, quantity: qty, unit_price: unitPrice, line_total: unitPrice * qty });
    }

    const shipping = subtotal >= 3000000 ? 0 : 120000;
    const total = subtotal + shipping;
    const code = orderCode();
    const paymentMode = process.env.PAYMENT_MODE || "mock";

    const order = {
      order_code: code,
      customer_name: cleanText(customer.name, 120),
      phone: cleanText(customer.phone, 30),
      email: cleanText(customer.email, 180) || null,
      province: cleanText(customer.province, 80),
      city: cleanText(customer.city, 80),
      address: cleanText(customer.address, 500),
      postal_code: cleanText(customer.postal_code, 30),
      subtotal,
      shipping_amount: shipping,
      total_amount: total,
      status: paymentMode === "mock" ? "processing" : "pending_payment",
      payment_status: paymentMode === "mock" ? "paid" : "pending",
      payment_provider: paymentMode,
    };

    const saved = await createOrder(order, lines);

    if (paymentMode === "mock") {
      if (saved.persisted) await markOrderPaid(code);
      return NextResponse.json({ order_code: code, persisted: saved.persisted, redirect: `/checkout/success?order=${encodeURIComponent(code)}&demo=1` });
    }

    return NextResponse.json({ error: "Payment provider هنوز تنظیم نشده است. PAYMENT_MODE را پس از اتصال درگاه تنظیم کن." }, { status: 503 });
  } catch (error) {
    console.error("order error", error);
    return NextResponse.json({ error: "ثبت سفارش ناموفق بود. دوباره تلاش کن." }, { status: 500 });
  }
}
