"use client";

import { useMemo, useState } from "react";

const CATEGORIES = ["کمپ", "دوچرخه", "طبیعت‌گردی", "سفر", "پوشاک", "تکنولوژی", "پرفروش‌ها"];

const PRODUCTS = [
  { id: 1, cat: "کمپ", name: "چراغ کمپ Core 360", sub: "نور ماژولار فضای باز", type: "lamp", badge: "پیشنهاد JAST" },
  { id: 2, cat: "تکنولوژی", name: "پاوربانک Field 20K", sub: "USB-C / Outdoor", type: "power", badge: "پرفروش" },
  { id: 3, cat: "دوچرخه", name: "کیت تعمیر Ride 11", sub: "کیت جمع‌وجور مسیر", type: "tool", badge: "ضروری" },
  { id: 4, cat: "سفر", name: "کوله Move 22L", sub: "روزانه و سفر سبک", type: "pack", badge: "جدید" },
  { id: 5, cat: "طبیعت‌گردی", name: "فیلتر آب Trail", sub: "فشرده و سبک", type: "bottle", badge: "Field Ready" },
  { id: 6, cat: "کمپ", name: "چادر Solo 2P", sub: "دو نفره / سه فصل", type: "tent", badge: "Drop 01" },
  { id: 7, cat: "تکنولوژی", name: "چراغ عقب Smart Ride", sub: "دید بالا / USB-C", type: "rear", badge: "هوشمند" },
  { id: 8, cat: "سفر", name: "ارگانایزر Gear Cube", sub: "کابل، پاور و ابزار", type: "case", badge: "کاربردی" },
];

const ACTIVITY = [
  ["کمپ", "CAMPING", "⛺"],
  ["دوچرخه", "CYCLING", "◉"],
  ["پیاده‌روی", "HIKING", "△"],
  ["سفر", "TRAVEL", "✦"],
  ["فیتنس", "FITNESS", "+"],
  ["تکنولوژی", "TECH", "⌁"],
];

function Logo() {
  return <svg className="logo" viewBox="0 0 64 64" aria-label="JASTLIFE"><path d="M43 10v24c0 14-7.5 21-19 21-7.8 0-13.2-3.6-16-10"/><path d="M34.5 18 43 8l8.5 10"/><path className="logoAccent" d="M42.8 8.4 48 14.7"/></svg>;
}

function ProductVisual({ type }) {
  return <div className={`productObject ${type}`} aria-hidden="true">
    {type === "lamp" && <><i className="glow"/><i className="ring"/><i className="core"/><i className="stand"/></>}
    {type === "power" && <><i className="body"/><i className="screen">78</i><i className="port"/></>}
    {type === "tool" && <><i className="toolBody"/><i className="arm a"/><i className="arm b"/><i className="pivot"/></>}
    {type === "pack" && <><i className="packBody"/><i className="packPocket"/><i className="strap left"/><i className="strap right"/></>}
    {type === "bottle" && <><i className="bottleBody"/><i className="bottleCap"/><i className="bottleBand"/></>}
    {type === "tent" && <><i className="tentBody"/><i className="tentDoor"/><i className="tentPole"/></>}
    {type === "rear" && <><i className="rearBody"/><i className="rearLight"/><i className="rearMount"/></>}
    {type === "case" && <><i className="caseBody"/><i className="caseZip"/><i className="caseHandle"/></>}
  </div>;
}

function ProductCard({ product, saved, onSave }) {
  return <article className="productCard">
    <div className="productImage">
      <span className="badge">{product.badge}</span>
      <button className={`heart ${saved ? "active" : ""}`} onClick={() => onSave(product.id)} aria-label="ذخیره">{saved ? "♥" : "♡"}</button>
      <ProductVisual type={product.type}/>
    </div>
    <div className="productBody">
      <small>{product.cat}</small>
      <h3>{product.name}</h3>
      <p>{product.sub}</p>
      <div className="productBottom"><strong>قیمت در زمان عرضه</strong><span>↗</span></div>
    </div>
  </article>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState([]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter(p => `${p.name} ${p.sub} ${p.cat}`.toLowerCase().includes(q));
  }, [query]);

  const toggle = id => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return <main className="site">
    <div className="topbar"><span>ارسال رایگان برای سفارش‌های منتخب</span><span>JASTLIFE / DROP 01 — 2026</span></div>

    <header className="header">
      <div className="headerMain shell">
        <a href="#top" className="brand"><span className="mark"><Logo/></span><strong>JASTLIFE</strong></a>
        <label className="search"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="جست‌وجوی محصول، دسته‌بندی یا فعالیت"/><button onClick={() => setQuery("")} aria-label="پاک کردن">{query ? "×" : ""}</button></label>
        <div className="actions">
          <button><span>◎</span><small>حساب</small></button>
          <button className="saved"><span>♡</span><small>ذخیره</small>{saved.length > 0 && <i>{saved.length}</i>}</button>
          <button><span>▱</span><small>سبد</small></button>
          <button className="menuBtn" onClick={() => setMenu(!menu)}>☰</button>
        </div>
      </div>
      <nav className={`nav ${menu ? "open" : ""}`}>
        <div className="shell navInner">{CATEGORIES.map(x => <a href="#products" key={x} onClick={() => setMenu(false)}>{x}</a>)}<a href="#services" className="deal">خدمات</a></div>
      </nav>
    </header>

    <section className="hero shell" id="top">
      <div className="heroPhoto"></div>
      <div className="heroShade"></div>
      <div className="heroContent">
        <span>NEW SEASON / OUTDOOR</span>
        <h1>برای بیرون آماده شو.</h1>
        <p>تجهیزات کاربردی برای کمپ، سفر، دوچرخه و طبیعت‌گردی؛ ساده، قابل‌اعتماد و انتخاب‌شده برای استفاده واقعی.</p>
        <div><a href="#products" className="btn white">خرید تجهیزات</a><a href="#activities" className="btn outline">خرید بر اساس فعالیت</a></div>
      </div>
    </section>

    <section className="quick shell">
      <a href="#products"><b>Drop 01</b><span>اولین محصولات JAST</span><i>↗</i></a>
      <a href="#activities"><b>Shop by activity</b><span>از فعالیت شروع کن</span><i>↗</i></a>
      <a href="#services"><b>JAST Support</b><span>راهنمای انتخاب قبل از خرید</span><i>↗</i></a>
    </section>

    <section className="section shell" id="products">
      <div className="sectionTitle"><div><h2>{query ? "نتایج جست‌وجو" : "محبوب این هفته"}</h2><p>{query ? `${shown.length} محصول پیدا شد` : "انتخاب‌های پرتقاضای Drop اول"}</p></div><a href="#activities">مشاهده همه <span>←</span></a></div>
      <div className="productRail">{shown.map(p => <ProductCard key={p.id} product={p} saved={saved.includes(p.id)} onSave={toggle}/>)}</div>
    </section>

    <section className="promoGrid shell">
      <article className="promo promoCamp"><div><span>CAMPING</span><h2>کمپ سبک‌تر.<br/>شب راحت‌تر.</h2><a href="#products">دیدن تجهیزات کمپ</a></div></article>
      <article className="promo promoRide"><div><span>CYCLING</span><h2>هر چیزی که<br/>در مسیر لازم داری.</h2><a href="#products">دیدن تجهیزات دوچرخه</a></div></article>
    </section>

    <section className="section shell activities" id="activities">
      <div className="sectionTitle"><div><h2>خرید بر اساس فعالیت</h2><p>سریع‌تر به تجهیزات مناسب برس</p></div></div>
      <div className="activityGrid">{ACTIVITY.map(([fa,en,icon]) => <a href="#products" key={en}><div className="activityIcon"><span>{icon}</span></div><strong>{fa}</strong><small>{en}</small></a>)}</div>
    </section>

    <section className="widePromo shell">
      <div className="wideImage"></div><div className="wideShade"></div>
      <div className="wideCopy"><span>JAST ESSENTIALS</span><h2>کمتر بردار.<br/>هوشمندتر انتخاب کن.</h2><p>کالکشن محدود JASTLIFE برای سفرهای سبک، کاربرد واقعی و تصمیم‌گیری ساده‌تر.</p><a href="#products" className="btn white">دیدن انتخاب‌ها</a></div>
    </section>

    <section className="section shell">
      <div className="sectionTitle"><div><h2>پرفروش‌ها</h2><p>محصولاتی که بیشترین توجه را گرفته‌اند</p></div><a href="#products">مشاهده همه <span>←</span></a></div>
      <div className="productRail">{PRODUCTS.slice().reverse().map(p => <ProductCard key={`b-${p.id}`} product={p} saved={saved.includes(p.id)} onSave={toggle}/>)}</div>
    </section>

    <section className="services" id="services">
      <div className="shell serviceGrid">
        <div><span>↺</span><strong>راهنمای انتخاب</strong><p>قبل از خرید، مسیر درست را پیدا کن.</p></div>
        <div><span>✓</span><strong>انتخاب محدود</strong><p>محصول کمتر، تصمیم ساده‌تر.</p></div>
        <div><span>⚙</span><strong>محصول کاربردی</strong><p>تمرکز روی استفاده واقعی بیرون.</p></div>
        <div><span>✉</span><strong>پشتیبانی JAST</strong><p>برای سوال‌های محصول و انتخاب.</p></div>
      </div>
    </section>

    <section className="newsletter">
      <div className="shell newsletterInner"><div><h2>Drop 01 را از دست نده.</h2><p>برای خبر محصولات جدید و راهنماهای خرید عضو شو.</p></div><form onSubmit={e => e.preventDefault()}><input type="email" required placeholder="ایمیل شما"/><button>عضویت</button></form></div>
    </section>

    <footer>
      <div className="shell footerGrid"><div><a href="#top" className="brand footerBrand"><span className="mark"><Logo/></span><strong>JASTLIFE</strong></a><p>Outdoor gear for everyday movement.</p></div><div><strong>فروشگاه</strong><a href="#products">محصولات</a><a href="#activities">فعالیت‌ها</a><a href="#products">Drop 01</a></div><div><strong>راهنما</strong><a href="#services">راهنمای انتخاب</a><a href="#services">پشتیبانی</a><a href="#services">سوالات متداول</a></div><div><strong>JASTLIFE</strong><a href="#top">درباره ما</a><a href="#top">تماس</a><a href="#top">مجله</a></div></div>
      <div className="shell copyright"><span>© 2026 JASTLIFE</span><span>FA / IR</span></div>
    </footer>
  </main>;
}
