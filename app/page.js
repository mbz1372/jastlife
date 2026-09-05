import ProductCard from "./components/ProductCard";
import StoreHeader from "./components/StoreHeader";
import { getProducts } from "../lib/supabase-rest";

const ACTIVITY = [
  ["کمپ", "CAMPING", "⛺"],
  ["دوچرخه", "CYCLING", "◉"],
  ["پیاده‌روی", "HIKING", "△"],
  ["سفر", "TRAVEL", "✦"],
  ["طبیعت‌گردی", "TRAIL", "+"],
  ["تکنولوژی", "TECH", "⌁"],
];

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const query = String(params?.q || "").trim();
  const products = await getProducts();
  const normalized = query.toLocaleLowerCase("fa");
  const shown = normalized
    ? products.filter((product) => `${product.name} ${product.subtitle || ""} ${product.category || ""}`.toLocaleLowerCase("fa").includes(normalized))
    : products;

  return <main className="site">
    <StoreHeader defaultQuery={query}/>

    <section className="hero shell" id="top">
      <div className="heroPhoto"></div><div className="heroShade"></div>
      <div className="heroContent">
        <span>JASTLIFE / OUTDOOR STORE</span>
        <h1>برای بیرون آماده شو.</h1>
        <p>تجهیزات کاربردی برای کمپ، سفر، دوچرخه و طبیعت‌گردی؛ ساده، قابل‌اعتماد و انتخاب‌شده برای استفاده واقعی.</p>
        <div><a href="#products" className="btn white">خرید تجهیزات</a><a href="#activities" className="btn outline">خرید بر اساس فعالیت</a></div>
      </div>
    </section>

    <section className="quick shell">
      <a href="#products"><b>محصولات منتخب</b><span>محبوب‌ترین انتخاب‌های JAST</span><i>↗</i></a>
      <a href="#activities"><b>Shop by activity</b><span>از فعالیت شروع کن</span><i>↗</i></a>
      <a href="#services"><b>JAST Support</b><span>راهنمای انتخاب قبل از خرید</span><i>↗</i></a>
    </section>

    <section className="section shell" id="products">
      <div className="sectionTitle">
        <div><h2>{query ? `نتایج «${query}»` : "محبوب این هفته"}</h2><p>{query ? `${shown.length} محصول پیدا شد` : "محصولات آماده خرید"}</p></div>
        {query ? <a href="/">پاک کردن جست‌وجو <span>←</span></a> : <a href="#activities">مشاهده دسته‌بندی‌ها <span>←</span></a>}
      </div>
      {shown.length ? <div className="productRail">{shown.map((product) => <ProductCard key={product.id} product={product}/>)}</div> : <div className="emptyState"><h3>محصولی پیدا نشد.</h3><p>عبارت دیگری جست‌وجو کن یا از دسته‌بندی‌ها استفاده کن.</p></div>}
    </section>

    <section className="promoGrid shell">
      <article className="promo promoCamp"><div><span>CAMPING</span><h2>کمپ سبک‌تر.<br/>شب راحت‌تر.</h2><a href="/?q=کمپ#products">دیدن تجهیزات کمپ</a></div></article>
      <article className="promo promoRide"><div><span>CYCLING</span><h2>هر چیزی که<br/>در مسیر لازم داری.</h2><a href="/?q=دوچرخه#products">دیدن تجهیزات دوچرخه</a></div></article>
    </section>

    <section className="section shell activities" id="activities">
      <div className="sectionTitle"><div><h2>خرید بر اساس فعالیت</h2><p>سریع‌تر به تجهیزات مناسب برس</p></div></div>
      <div className="activityGrid">{ACTIVITY.map(([fa,en,icon]) => <a href={`/?q=${encodeURIComponent(fa)}#products`} key={en}><div className="activityIcon"><span>{icon}</span></div><strong>{fa}</strong><small>{en}</small></a>)}</div>
    </section>

    <section className="widePromo shell">
      <div className="wideImage"></div><div className="wideShade"></div>
      <div className="wideCopy"><span>JAST ESSENTIALS</span><h2>کمتر بردار.<br/>هوشمندتر انتخاب کن.</h2><p>کالکشن محدود JASTLIFE برای سفرهای سبک، کاربرد واقعی و تصمیم‌گیری ساده‌تر.</p><a href="#products" className="btn white">دیدن انتخاب‌ها</a></div>
    </section>

    <section className="services" id="services">
      <div className="shell serviceGrid">
        <div><span>↺</span><strong>راهنمای انتخاب</strong><p>قبل از خرید، مسیر درست را پیدا کن.</p></div>
        <div><span>✓</span><strong>سبد ماندگار</strong><p>محصولات بعد از refresh در سبد می‌مانند.</p></div>
        <div><span>⚙</span><strong>موجودی واقعی</strong><p>با اتصال Supabase از دیتابیس خوانده می‌شود.</p></div>
        <div><span>✉</span><strong>پشتیبانی JAST</strong><p>برای سوال‌های محصول و سفارش.</p></div>
      </div>
    </section>

    <section className="newsletter"><div className="shell newsletterInner"><div><h2>از محصولات جدید باخبر شو.</h2><p>لانچ‌ها و راهنماهای خرید JASTLIFE.</p></div><form><input type="email" required placeholder="ایمیل شما"/><button>عضویت</button></form></div></section>

    <footer>
      <div className="shell footerGrid"><div><strong className="footerWordmark">JASTLIFE</strong><p>Outdoor gear for everyday movement.</p></div><div><strong>فروشگاه</strong><a href="#products">محصولات</a><a href="#activities">فعالیت‌ها</a><a href="/cart">سبد خرید</a></div><div><strong>راهنما</strong><a href="#services">راهنمای انتخاب</a><a href="/checkout">تسویه حساب</a><a href="/admin">مدیریت محصولات</a></div><div><strong>JASTLIFE</strong><a href="#top">درباره ما</a><a href="#services">پشتیبانی</a></div></div>
      <div className="shell copyright"><span>© 2026 JASTLIFE</span><span>FA / IR</span></div>
    </footer>
  </main>;
}
