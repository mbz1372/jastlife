"use client";

import { useState } from "react";
import Link from "next/link";
import StoreHeader from "../components/StoreHeader";
import { useCart } from "../cart-provider";
import { formatPrice } from "../../lib/catalog";

const initialForm = { name: "", phone: "", email: "", province: "", city: "", address: "", postal_code: "" };

export default function CheckoutPage() {
  const { items, hydrated, subtotal, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const shipping = subtotal >= 3000000 || subtotal === 0 ? 0 : 120000;

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    if (!items.length) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: form, items: items.map(({ id, qty }) => ({ id, qty })) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "ثبت سفارش ناموفق بود");
      clearCart();
      window.location.href = data.redirect;
    } catch (err) {
      setError(err.message || "خطایی رخ داد");
      setLoading(false);
    }
  };

  return <main className="site innerSite">
    <StoreHeader/>
    <section className="shell checkoutPage">
      <div className="pageHeading"><span>Checkout</span><h1>تسویه حساب</h1><p>بدون اجبار به ساخت حساب؛ اطلاعات ارسال را وارد کن و سفارش را نهایی کن.</p></div>
      {!hydrated ? <div className="emptyState">در حال بارگذاری...</div> : items.length === 0 ? <div className="emptyCart"><h2>محصولی برای تسویه حساب نیست.</h2><Link className="primaryButton" href="/">بازگشت به فروشگاه</Link></div> : <form className="checkoutGrid" onSubmit={submit}>
        <div className="checkoutForm">
          <section className="formSection"><div className="formSectionTitle"><b>۱</b><div><h2>اطلاعات تماس</h2><p>برای هماهنگی سفارش و ارسال</p></div></div><div className="formGrid two"><label>نام و نام خانوادگی<input name="name" value={form.name} onChange={update} required autoComplete="name"/></label><label>شماره موبایل<input name="phone" value={form.phone} onChange={update} required inputMode="tel" autoComplete="tel" placeholder="09xxxxxxxxx"/></label><label className="full">ایمیل (اختیاری)<input name="email" value={form.email} onChange={update} type="email" autoComplete="email"/></label></div></section>
          <section className="formSection"><div className="formSectionTitle"><b>۲</b><div><h2>آدرس تحویل</h2><p>آدرس دقیق گیرنده</p></div></div><div className="formGrid two"><label>استان<input name="province" value={form.province} onChange={update} required/></label><label>شهر<input name="city" value={form.city} onChange={update} required/></label><label className="full">آدرس<input name="address" value={form.address} onChange={update} required autoComplete="street-address"/></label><label>کدپستی<input name="postal_code" value={form.postal_code} onChange={update} required inputMode="numeric" autoComplete="postal-code"/></label></div></section>
          <section className="formSection"><div className="formSectionTitle"><b>۳</b><div><h2>پرداخت</h2><p>درگاه واقعی بعد از انتخاب ارائه‌دهنده پرداخت متصل می‌شود.</p></div></div><div className="paymentDemo"><span>●</span><div><strong>پرداخت آنلاین</strong><small>فعلاً Payment Adapter روی حالت تست است؛ سفارش کامل ثبت می‌شود.</small></div></div></section>
          {error ? <div className="formError">{error}</div> : null}
        </div>
        <aside className="orderSummary checkoutSummary"><h2>سفارش شما</h2>{items.map((item) => <div className="checkoutItem" key={item.id}><span>{item.name} × {new Intl.NumberFormat("fa-IR").format(item.qty)}</span><strong>{formatPrice(item.price * item.qty)}</strong></div>)}<div><span>جمع محصولات</span><strong>{formatPrice(subtotal)}</strong></div><div><span>ارسال</span><strong>{shipping ? formatPrice(shipping) : "رایگان"}</strong></div><div className="summaryTotal"><span>مبلغ قابل پرداخت</span><strong>{formatPrice(subtotal + shipping)}</strong></div><button className="checkoutButton" disabled={loading}>{loading ? "در حال ثبت سفارش..." : "ثبت سفارش و پرداخت"}</button><small>با ثبت سفارش، اطلاعات واردشده برای پردازش همین سفارش استفاده می‌شود.</small></aside>
      </form>}
    </section>
  </main>;
}
