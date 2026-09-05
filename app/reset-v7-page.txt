"use client";

import { useEffect, useMemo, useState } from "react";

const COPY = {
  fa: {
    nav: [["فروشگاه", "#shop"], ["مسیرها", "#finder"], ["درباره", "#story"]],
    heroEyebrow: "CURATED OUTDOOR GOODS / TEHRAN 2026",
    heroTitle: "بیرون، ساده‌تر است.",
    heroText: "JASTLIFE تجهیزات سفر، کمپ، دوچرخه و تکنولوژی بیرون را با یک معیار انتخاب می‌کند: چیزی که همراهت می‌آید باید واقعاً به کارت بیاید.",
    heroPrimary: "دیدن انتخاب‌ها",
    heroSecondary: "راهنمای انتخاب",
    trust: ["انتخاب محدود و دقیق", "راهنمای قبل از خرید", "تمرکز روی کاربرد واقعی", "طراحی برای حرکت"],
    worldsTitle: "از مسیر شروع کن، نه از محصول.",
    worldsText: "چهار دنیای اصلی JASTLIFE برای پیدا کردن سریع‌تر چیزی که واقعاً لازم داری.",
    editTitle: "The JAST Edit",
    editText: "یک انتخاب کوتاه از محصولاتی که قرار است در Drop اول ببینی.",
    principleTitle: "محصول کمتر. تصمیم بهتر.",
    principleText: "ما فروشگاه را با تعداد کالا تعریف نمی‌کنیم. هر محصول باید از فیلتر کاربرد، دوام، وزن و تجربه واقعی بیرون عبور کند.",
    finderTitle: "برای کجا آماده می‌شوی؟",
    finderText: "یک سناریو انتخاب کن؛ JASTLIFE ضروری‌ها را کوتاه می‌کند تا بین صدها گزینه گم نشوی.",
    finderCta: "دیدن انتخاب‌های مرتبط",
    storyTitle: "برای بیرون ساخته شده؛ نه برای قفسه.",
    storyText: "JASTLIFE بین فروشگاه و راهنما قرار می‌گیرد: محصول، محتوا و تجربه در یک سیستم ساده برای انتخاب بهتر.",
    earlyTitle: "Drop 01 را زودتر ببین.",
    earlyText: "لانچ‌ها، راهنماهای مهم و انتخاب‌های تازه. کوتاه و بدون شلوغی.",
    email: "ایمیل شما",
    join: "خبرم کن",
    searchPlaceholder: "جست‌وجو در JASTLIFE",
    searchTitle: "چه چیزی لازم داری؟",
    saved: "ذخیره‌شده‌ها",
  },
  en: {
    nav: [["Shop", "#shop"], ["Finder", "#finder"], ["About", "#story"]],
    heroEyebrow: "CURATED OUTDOOR GOODS / TEHRAN 2026",
    heroTitle: "Outside, made simpler.",
    heroText: "JASTLIFE curates travel, camping, cycling and outdoor tech with one rule: everything you carry should earn its place.",
    heroPrimary: "Explore the edit",
    heroSecondary: "Find your gear",
    trust: ["Tightly curated", "Useful buying guidance", "Built around real use", "Designed for movement"],
    worldsTitle: "Start with the activity, not the product.",
    worldsText: "Four JASTLIFE worlds to get you to the right gear faster.",
    editTitle: "The JAST Edit",
    editText: "A short selection of what is coming in the first drop.",
    principleTitle: "Fewer products. Better decisions.",
    principleText: "We do not define a store by inventory size. Every item has to pass filters for utility, durability, weight and real outdoor use.",
    finderTitle: "What are you getting ready for?",
    finderText: "Choose a real-world scenario. JASTLIFE narrows the essentials so you do not get lost in endless options.",
    finderCta: "See relevant picks",
    storyTitle: "Made for outside, not for shelves.",
    storyText: "JASTLIFE sits between a store and a guide: product, content and experience shaped into a simpler way to choose.",
    earlyTitle: "See Drop 01 first.",
    earlyText: "Launches, useful guides and fresh picks. Short and useful.",
    email: "Your email",
    join: "Notify me",
    searchPlaceholder: "Search JASTLIFE",
    searchTitle: "What do you need?",
    saved: "Saved",
  },
};

const WORLDS = [
  { key: "CAMP", fa: "کمپ", en: "Camp", meta: "Sleep / Light / Shelter", icon: "△" },
  { key: "RIDE", fa: "دوچرخه", en: "Ride", meta: "Repair / Safety / Carry", icon: "○" },
  { key: "TECH", fa: "تکنولوژی", en: "Tech", meta: "Power / Navigation / Smart", icon: "⌁" },
  { key: "EXPLORE", fa: "طبیعت", en: "Explore", meta: "Pack / Water / Utility", icon: "⌃" },
];

const PRODUCTS = [
  { id: 1, cat: "CAMP", fa: "چراغ کمپ ماژولار", en: "Modular Camp Light", label: "DROP 01", type: "light" },
  { id: 2, cat: "TECH", fa: "پاور Outdoor", en: "Outdoor Power", label: "JAST PICK", type: "power" },
  { id: 3, cat: "RIDE", fa: "کیت تعمیر فشرده", en: "Compact Repair Kit", label: "ESSENTIAL", type: "tool" },
  { id: 4, cat: "EXPLORE", fa: "کوله روزانه 22L", en: "22L Day Pack", label: "LIGHTWEIGHT", type: "pack" },
  { id: 5, cat: "EXPLORE", fa: "فیلتر آب فشرده", en: "Compact Water Filter", label: "FIELD READY", type: "bottle" },
  { id: 6, cat: "CAMP", fa: "ابزار چندکاره", en: "Field Multi Tool", label: "COMPACT", type: "tool" },
  { id: 7, cat: "RIDE", fa: "چراغ عقب هوشمند", en: "Smart Rear Light", label: "SMART", type: "light" },
  { id: 8, cat: "TECH", fa: "ارگانایزر کابل و پاور", en: "Power Organizer", label: "UTILITY", type: "case" },
];

const SCENARIOS = {
  fa: {
    camp: { title: "کمپ یک‌شبه", code: "24H / CAMP", items: ["نور قابل اتکا", "سیستم خواب", "پاور", "آب", "ابزار سبک"] },
    ride: { title: "مسیر دوچرخه", code: "80K / RIDE", items: ["چراغ ایمنی", "کیت تعمیر", "پمپ", "حمل سبک", "پاور"] },
    road: { title: "سفر جاده‌ای", code: "03D / ROAD", items: ["ارگانایزر", "پاور", "نور", "آب", "کوله روزانه"] },
    trail: { title: "طبیعت یک‌روزه", code: "DAY / TRAIL", items: ["آب", "کوله", "نور", "مسیریابی", "ابزار سبک"] },
  },
  en: {
    camp: { title: "One-night camp", code: "24H / CAMP", items: ["Reliable light", "Sleep system", "Power", "Water", "Light tools"] },
    ride: { title: "Cycling route", code: "80K / RIDE", items: ["Safety light", "Repair kit", "Pump", "Light carry", "Power"] },
    road: { title: "Road trip", code: "03D / ROAD", items: ["Organizer", "Power", "Light", "Water", "Day pack"] },
    trail: { title: "Day trail", code: "DAY / TRAIL", items: ["Water", "Pack", "Light", "Navigation", "Light tools"] },
  },
};

function Logo() {
  return <svg viewBox="0 0 64 64" className="logo" aria-label="JASTLIFE"><path d="M43 10v24c0 14-7.5 21-19 21-7.8 0-13.2-3.6-16-10"/><path d="M34.5 18 43 8l8.5 10"/><path className="accent" d="M42.8 8.4 48 14.7"/></svg>;
}

function ProductArt({ type }) {
  if (type === "pack") return <svg viewBox="0 0 220 220"><path d="M74 66c0-27 15-42 36-42s36 15 36 42"/><rect x="52" y="59" width="116" height="128" rx="34"/><path d="M74 96h72M84 138h52M67 82c-20 20-23 58-9 89M153 82c20 20 23 58 9 89"/></svg>;
  if (type === "power") return <svg viewBox="0 0 220 220"><rect x="65" y="34" width="90" height="152" rx="25"/><path d="M92 23h36M84 80h52M89 151h42"/><circle cx="110" cy="113" r="19"/></svg>;
  if (type === "bottle") return <svg viewBox="0 0 220 220"><path d="M90 27h40v30l14 20v87c0 12-10 22-22 22H98c-12 0-22-10-22-22V77l14-20V27Z"/><path d="M90 58h40M83 111h54"/></svg>;
  if (type === "case") return <svg viewBox="0 0 220 220"><rect x="36" y="70" width="148" height="100" rx="26"/><path d="M78 70V51h64v19M36 112h148M110 96v31"/></svg>;
  if (type === "tool") return <svg viewBox="0 0 220 220"><path d="M68 43c-22 21-23 56-2 78l-27 47 20 11 31-43c27 9 56-5 70-31 11-22 8-48-8-65l-26 44-30-17 26-44c-19-3-39 3-54 20Z"/></svg>;
  return <svg viewBox="0 0 220 220"><circle cx="110" cy="110" r="60"/><circle cx="110" cy="110" r="22"/><path d="M110 20v30M110 170v30M20 110h30M170 110h30M47 47l21 21M152 152l21 21"/></svg>;
}

export default function Home() {
  const [lang, setLang] = useState("fa");
  const [menu, setMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState([]);
  const [category, setCategory] = useState("ALL");
  const [scenario, setScenario] = useState("camp");
  const t = COPY[lang];
  const rtl = lang === "fa";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [lang, rtl]);

  const visibleProducts = useMemo(() => category === "ALL" ? PRODUCTS.slice(0, 4) : PRODUCTS.filter(p => p.cat === category).slice(0, 4), [category]);
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS.slice(0, 5);
    return PRODUCTS.filter(p => `${p.fa} ${p.en} ${p.cat}`.toLowerCase().includes(q)).slice(0, 5);
  }, [query]);

  const toggleSaved = id => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const currentScenario = SCENARIOS[lang][scenario];

  return <main className="site" dir={rtl ? "rtl" : "ltr"}>
    <div className="announcement"><span>JASTLIFE / DROP 01 — 2026</span><span>{rtl ? "انتخاب محدود. کاربرد واقعی." : "Fewer products. Real utility."}</span></div>

    <header className="header">
      <div className="shell headerInner">
        <a className="brand" href="#top"><span className="brandMark"><Logo/></span><strong>JASTLIFE</strong></a>
        <nav className="desktopNav">{t.nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
        <div className="headerTools">
          <button className="toolBtn" onClick={() => setSearchOpen(true)} aria-label="Search">⌕</button>
          <button className="toolBtn savedTop" aria-label={t.saved}>♡{saved.length > 0 && <i>{saved.length}</i>}</button>
          <button className="langBtn" onClick={() => setLang(lang === "fa" ? "en" : "fa")}>{lang === "fa" ? "EN" : "FA"}</button>
          <button className="menuBtn" onClick={() => setMenu(!menu)}>{menu ? "×" : "☰"}</button>
        </div>
      </div>
      {menu && <div className="mobileNav">{t.nav.map(([label, href]) => <a href={href} key={href} onClick={() => setMenu(false)}>{label}<span>↗</span></a>)}</div>}
    </header>

    <section className="hero" id="top">
      <div className="heroCopy">
        <span className="eyebrow">{t.heroEyebrow}</span>
        <h1>{t.heroTitle}</h1>
        <p>{t.heroText}</p>
        <div className="heroActions">
          <a className="button dark" href="#shop">{t.heroPrimary}<span>↗</span></a>
          <a className="textLink" href="#finder">{t.heroSecondary}<span>→</span></a>
        </div>
        <div className="heroFoot"><span>35.6892° N</span><span>51.3890° E</span></div>
      </div>
      <div className="heroMedia"><div className="heroImage"/><div className="heroMediaMeta"><span>FIELD NOTE / 001</span><strong>MOVE LIGHT.<br/>LIVE MORE.</strong></div></div>
    </section>

    <section className="trust shell">{t.trust.map((item, i) => <div key={item}><span>0{i+1}</span><strong>{item}</strong></div>)}</section>

    <section className="worldSection section">
      <div className="shell sectionIntro"><div><span className="sectionNo">01 / WORLDS</span><h2>{t.worldsTitle}</h2></div><p>{t.worldsText}</p></div>
      <div className="shell worldGrid">{WORLDS.map((w, i) => <button key={w.key} onClick={() => { setCategory(w.key); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className="worldCard"><span className="worldIndex">0{i+1}</span><b className="worldIcon">{w.icon}</b><div><h3>{rtl ? w.fa : w.en}</h3><small>{w.meta}</small></div><i>↗</i></button>)}</div>
    </section>

    <section className="shop section" id="shop">
      <div className="shell sectionIntro shopIntro"><div><span className="sectionNo">02 / DROP 01</span><h2>{t.editTitle}</h2></div><p>{t.editText}</p></div>
      <div className="shell filterBar"><button className={category === "ALL" ? "active" : ""} onClick={() => setCategory("ALL")}>ALL</button>{WORLDS.map(w => <button className={category === w.key ? "active" : ""} onClick={() => setCategory(w.key)} key={w.key}>{w.key}</button>)}</div>
      <div className="shell productGrid">{visibleProducts.map((p, i) => <article className="product" key={p.id}>
        <div className="productVisual">
          <span className="productLabel">{p.label}</span>
          <button className={`heart ${saved.includes(p.id) ? "active" : ""}`} onClick={() => toggleSaved(p.id)} aria-label="Save">{saved.includes(p.id) ? "♥" : "♡"}</button>
          <ProductArt type={p.type}/>
          <small>0{i+1}</small>
        </div>
        <div className="productMeta"><div><span>{p.cat}</span><h3>{rtl ? p.fa : p.en}</h3></div><a href="#early">{rtl ? "در Drop اول" : "In Drop 01"}<span>↗</span></a></div>
      </article>)}</div>
    </section>

    <section className="principle">
      <div className="shell principleGrid">
        <div className="principleMark"><Logo/></div>
        <div><span className="sectionNo light">03 / JAST STANDARD</span><h2>{t.principleTitle}</h2><p>{t.principleText}</p></div>
        <div className="principleStats"><div><strong>04</strong><span>{rtl ? "دنیای اصلی" : "core worlds"}</span></div><div><strong>05</strong><span>{rtl ? "فیلتر انتخاب" : "selection filters"}</span></div><div><strong>01</strong><span>{rtl ? "استاندارد" : "standard"}</span></div></div>
      </div>
    </section>

    <section className="finder section" id="finder">
      <div className="shell finderGrid">
        <div className="finderIntro"><span className="sectionNo">04 / JAST FINDER</span><h2>{t.finderTitle}</h2><p>{t.finderText}</p></div>
        <div className="finderPanel">
          <div className="finderTabs">{Object.entries(SCENARIOS[lang]).map(([key, value]) => <button key={key} onClick={() => setScenario(key)} className={scenario === key ? "active" : ""}><small>{value.code}</small><strong>{value.title}</strong></button>)}</div>
          <div className="finderBody">
            <div className="finderCode"><span>{currentScenario.code}</span><b>05</b></div>
            <div className="finderList">{currentScenario.items.map((item, i) => <div key={item}><span>0{i+1}</span><strong>{item}</strong><i>✓</i></div>)}</div>
            <a href="#shop" className="finderCta">{t.finderCta}<span>↗</span></a>
          </div>
        </div>
      </div>
    </section>

    <section className="story" id="story">
      <div className="storyImage"/>
      <div className="storyCopy shell"><span>05 / FIELD PRINCIPLE</span><h2>{t.storyTitle}</h2><p>{t.storyText}</p><div className="storyRule"><strong>PACK LESS</strong><i></i><strong>EXPERIENCE MORE</strong></div></div>
    </section>

    <section className="early" id="early">
      <div className="shell earlyGrid"><div><span>DROP 01 / EARLY ACCESS</span><h2>{t.earlyTitle}</h2><p>{t.earlyText}</p></div><form onSubmit={(e) => e.preventDefault()}><div className="emailBox"><input type="email" required placeholder={t.email}/><button>{t.join}<span>↗</span></button></div><small>{rtl ? "فرم فعلاً نمایشی است؛ اتصال به لیست واقعی در مرحله بعد." : "Demo form for now; real waitlist connection comes next."}</small></form></div>
    </section>

    <footer>
      <div className="shell footerTop"><a className="brand footerBrand" href="#top"><span className="brandMark"><Logo/></span><strong>JASTLIFE</strong></a><div className="footerLinks"><a href="#shop">SHOP</a><a href="#finder">FINDER</a><a href="#story">ABOUT</a></div><span>GO OUTSIDE. LIVE MORE.</span></div>
      <div className="footerWord">JASTLIFE</div>
      <div className="shell footerBottom"><span>© 2026 JASTLIFE</span><span>OUTDOOR / GEAR / TECH</span></div>
    </footer>

    {searchOpen && <div className="searchOverlay" role="dialog" aria-modal="true">
      <div className="searchTop"><span>JASTLIFE / SEARCH</span><button onClick={() => setSearchOpen(false)}>×</button></div>
      <div className="searchInner">
        <h2>{t.searchTitle}</h2>
        <div className="searchInput"><span>⌕</span><input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder={t.searchPlaceholder}/></div>
        <div className="searchResults">{searchResults.map(p => <a href="#shop" key={p.id} onClick={() => { setCategory(p.cat); setSearchOpen(false); }}><span>{p.cat}</span><strong>{rtl ? p.fa : p.en}</strong><i>↗</i></a>)}</div>
      </div>
    </div>}
  </main>;
}
