"use client";
import { useState } from "react";

export default function DigikalaImageReview({ product, adminKey, onApplied }) {
  const [id, setId] = useState("");
  const [result, setResult] = useState(null);
  const [selected, setSelected] = useState("");
  const [rights, setRights] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function lookup() {
    setBusy(true); setMessage(""); setResult(null); setSelected(""); setRights(false);
    try {
      if (!adminKey) throw new Error("ابتدا کلید مدیریت را وارد کن");
      const response = await fetch(`/api/admin/digikala-images?id=${encodeURIComponent(id)}`, { headers: { "x-admin-key": adminKey }, cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "جستجو ناموفق بود");
      setResult(data);
      setSelected(data.images[0] || "");
    } catch (error) { setMessage(error.message); }
    finally { setBusy(false); }
  }

  async function apply() {
    if (!rights || !selected || !result || busy) return;
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ ...product, id: product.id, image_url: selected }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "ذخیره انجام نشد");
      setMessage("تصویر انتخابی برای این محصول ذخیره شد.");
      await onApplied();
    } catch (error) { setMessage(error.message); }
    finally { setBusy(false); }
  }

  return <details style={{ marginTop: 10 }}>
    <summary style={{ cursor: "pointer" }}>یافتن تصویر در دیجی‌کالا</summary>
    <div style={{ display: "grid", gap: 8, padding: "10px 0" }}>
      <a href={`https://www.digikala.com/search/?q=${encodeURIComponent(product.name)}`} target="_blank" rel="noopener noreferrer">جستجوی نام محصول در دیجی‌کالا ↗</a>
      <input aria-label="شناسه عددی محصول دیجی‌کالا" type="text" inputMode="numeric" value={id} onChange={e => setId(e.target.value)} placeholder="شناسه dkp محصول (مثلاً 1234567)" />
      <button type="button" disabled={busy || !/^\d+$/.test(id)} onClick={lookup}>بررسی تصاویر</button>
      {result && <div>
        <strong>{result.name}</strong>
        <p>برند: {result.brand || "نامشخص"} — مدل: {result.model || "نامشخص"}</p>
        <a href={result.source_url} rel="noopener noreferrer" target="_blank">مشاهده محصول مرجع ↗</a>
        <div style={{ display: "flex", overflowX: "auto", gap: 8, padding: "10px 0" }}>
          {result.images.map(url => <label key={url} style={{ flex: "0 0 100px" }}>
            <input type="radio" name={`image-${product.id}`} checked={selected === url} onChange={() => setSelected(url)} />
            <img src={url} alt="تصویر پیشنهادی" loading="lazy" referrerPolicy="no-referrer" style={{ width: 90, height: 90, objectFit: "contain" }} />
          </label>)}
        </div>
        {!result.images.length && <p>در پاسخ دیجی‌کالا تصویری یافت نشد.</p>}
        <label style={{ display: "block" }}>
          <input type="checkbox" checked={rights} onChange={e => setRights(e.target.checked)} />
          مدل و ویژگی‌های محصول تطبیق دارد و مجوز استفاده تجاری از تصویر را بررسی و تأیید کرده‌ام.
        </label>
        <button type="button" disabled={!rights || !selected || busy} onClick={apply}>ثبت تصویر انتخاب‌شده در JASTLIFE</button>
        <small>این ابزار لینک تصویر را ثبت می‌کند؛ برای انتقال به Storage باید تصویر مجاز را جداگانه آپلود کنید.</small>
      </div>}
      {message && <p role="status">{message}</p>}
    </div>
  </details>;
}
