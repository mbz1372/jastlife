"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StoreHeader from "../components/StoreHeader";
import { formatPrice } from "../../lib/catalog";

const emptyForm = {
  name: "", slug: "", category: "کمپ", subtitle: "", description: "", price: "", compare_at_price: "", stock: "", badge: "", type: "case", image_url: "", active: true,
};

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [products, setProducts] = useState([]);
  const [mode, setMode] = useState("demo");
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const response = await fetch("/api/products", { cache: "no-store" });
    const data = await response.json();
    setProducts(data.products || []);
    setMode(data.mode || "demo");
  };

  useEffect(() => { load(); }, []);

  const update = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus("");
    try {
      let imageUrl = form.image_url;
      if (file) {
        const imageForm = new FormData();
        imageForm.append("file", file);
        const upload = await fetch("/api/upload", { method: "POST", headers: { "x-admin-key": adminKey }, body: imageForm });
        const uploadData = await upload.json();
        if (!upload.ok) throw new Error(uploadData.error || "آپلود تصویر ناموفق بود");
        imageUrl = uploadData.url;
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ ...form, image_url: imageUrl, price: Number(form.price), compare_at_price: form.compare_at_price ? Number(form.compare_at_price) : null, stock: Number(form.stock) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "ثبت محصول ناموفق بود");
      setForm(emptyForm);
      setFile(null);
      setStatus("محصول با موفقیت ثبت شد.");
      await load();
    } catch (error) {
      setStatus(error.message || "خطایی رخ داد");
    } finally {
      setSaving(false);
    }
  };

  return <main className="site innerSite adminSite">
    <StoreHeader/>
    <section className="shell adminPage">
      <div className="pageHeading"><span>JAST ADMIN</span><h1>مدیریت محصولات</h1><p>محصول جدید، عکس، قیمت و موجودی را از این صفحه وارد کن.</p></div>
      <div className={`modeBanner ${mode}`}><strong>{mode === "supabase" ? "Supabase متصل است" : "حالت Demo"}</strong><span>{mode === "supabase" ? "محصولات از دیتابیس خوانده می‌شوند." : "تا زمانی که envهای Supabase روی Vercel تنظیم نشوند، محصولات نمونه نمایش داده می‌شوند."}</span></div>
      <div className="adminGrid">
        <form className="adminForm" onSubmit={submit}>
          <div className="adminAuth"><label>ADMIN_SECRET<input type="password" value={adminKey} onChange={(event) => setAdminKey(event.target.value)} placeholder="کلید مدیریت" required/></label><small>این مقدار باید با Environment Variable به نام ADMIN_SECRET در Vercel یکی باشد.</small></div>
          <div className="formGrid two">
            <label>نام محصول<input name="name" value={form.name} onChange={update} required/></label>
            <label>Slug انگلیسی<input name="slug" value={form.slug} onChange={update} required placeholder="core-360-camp-light"/></label>
            <label>دسته‌بندی<select name="category" value={form.category} onChange={update}><option>کمپ</option><option>دوچرخه</option><option>طبیعت‌گردی</option><option>سفر</option><option>تکنولوژی</option><option>پوشاک</option></select></label>
            <label>نوع placeholder<select name="type" value={form.type} onChange={update}><option value="lamp">چراغ</option><option value="power">پاور</option><option value="tool">ابزار</option><option value="pack">کوله</option><option value="bottle">بطری/فیلتر</option><option value="tent">چادر</option><option value="rear">چراغ دوچرخه</option><option value="case">کیف/سایر</option></select></label>
            <label className="full">توضیح کوتاه<input name="subtitle" value={form.subtitle} onChange={update}/></label>
            <label className="full">توضیحات<textarea name="description" value={form.description} onChange={update} rows="4"/></label>
            <label>قیمت (تومان)<input name="price" value={form.price} onChange={update} type="number" min="0" required/></label>
            <label>قیمت قبل تخفیف<input name="compare_at_price" value={form.compare_at_price} onChange={update} type="number" min="0"/></label>
            <label>موجودی<input name="stock" value={form.stock} onChange={update} type="number" min="0" required/></label>
            <label>Badge<input name="badge" value={form.badge} onChange={update} placeholder="پرفروش"/></label>
            <label className="full">عکس محصول<input type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0] || null)}/><small>حداکثر ۸MB. در Supabase Storage ذخیره می‌شود.</small></label>
            <label className="full">یا URL تصویر<input name="image_url" value={form.image_url} onChange={update} type="url" placeholder="https://..."/></label>
            <label className="checkLabel"><input type="checkbox" name="active" checked={form.active} onChange={update}/> محصول فعال باشد</label>
          </div>
          <button className="primaryButton adminSave" disabled={saving}>{saving ? "در حال ذخیره..." : "ثبت محصول"}</button>
          {status ? <div className="adminStatus">{status}</div> : null}
        </form>
        <aside className="adminProducts"><div className="adminListHead"><h2>محصولات</h2><span>{products.length}</span></div>{products.map((product) => <div className="adminProduct" key={product.id}><div><strong>{product.name}</strong><small>{product.category} · {product.stock} موجود</small></div><div><b>{formatPrice(product.price)}</b><Link href={`/product/${product.slug}`}>مشاهده ↗</Link></div></div>)}</aside>
      </div>
    </section>
  </main>;
}
