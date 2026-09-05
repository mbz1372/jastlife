"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../cart-provider";

function Logo() {
  return <svg className="logo" viewBox="0 0 64 64" aria-label="JASTLIFE"><path d="M43 10v24c0 14-7.5 21-19 21-7.8 0-13.2-3.6-16-10"/><path d="M34.5 18 43 8l8.5 10"/><path className="logoAccent" d="M42.8 8.4 48 14.7"/></svg>;
}

const categories = ["کمپ", "دوچرخه", "طبیعت‌گردی", "سفر", "تکنولوژی", "پرفروش‌ها"];

export default function StoreHeader({ defaultQuery = "" }) {
  const [menu, setMenu] = useState(false);
  const { count } = useCart();

  return <>
    <div className="topbar"><span>ارسال رایگان برای سفارش‌های بالای ۳ میلیون تومان</span><span>JASTLIFE / OUTDOOR STORE</span></div>
    <header className="header">
      <div className="headerMain shell">
        <Link href="/" className="brand"><span className="mark"><Logo/></span><strong>JASTLIFE</strong></Link>
        <form className="search" action="/" method="get">
          <span>⌕</span>
          <input name="q" defaultValue={defaultQuery} placeholder="جست‌وجوی محصول، دسته‌بندی یا فعالیت" aria-label="جست‌وجو"/>
          <button type="submit">جست‌وجو</button>
        </form>
        <div className="actions">
          <Link href="/admin" className="headerAction"><span>◎</span><small>مدیریت</small></Link>
          <Link href="/cart" className="headerAction saved"><span>▱</span><small>سبد</small>{count > 0 ? <i>{count}</i> : null}</Link>
          <button className="menuBtn" onClick={() => setMenu((value) => !value)} aria-label="منو">☰</button>
        </div>
      </div>
      <nav className={`nav ${menu ? "open" : ""}`}>
        <div className="shell navInner">
          {categories.map((category) => <Link key={category} href={`/?q=${encodeURIComponent(category)}`} onClick={() => setMenu(false)}>{category}</Link>)}
          <Link href="/#services" className="deal" onClick={() => setMenu(false)}>خدمات</Link>
        </div>
      </nav>
    </header>
  </>;
}
