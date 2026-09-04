"use client";

import { useEffect, useMemo, useState } from "react";

const copy = {
  fa: {
    nav: [["فروشگاه", "#shop"], ["مسیرها", "#finder"], ["داستان", "#story"]],
    eyebrow: "JASTLIFE / CURATED OUTDOOR GOODS",
    title: "کمتر انتخاب کن.\nبهتر بیرون برو.",
    desc: "تجهیزات سفر، کمپ، دوچرخه و تکنولوژی بیرون؛ انتخاب‌شده با یک معیار ساده: آیا واقعاً ارزش همراه شدن را دارد؟",
    shop: "دیدن انتخاب‌ها",
    finder: "JAST Finder",
    categories: "خرید بر اساس مسیر",
    new: "انتخاب‌های تازه",
    newSub: "محصول کمتر، تصمیم بهتر.",
    darkTitle: "هر چیزی که همراهت می‌آید، باید دلیل خوبی برای بودنش داشته باشد.",
    darkCopy: "ما به‌جای اضافه کردن صدها کالا، انتخاب را سخت‌تر می‌کنیم. کاربرد، وزن، دوام و تجربه واقعی بیرون فیلترهای اصلی JASTLIFE هستند.",
    finderTitle: "کجا می‌روی؟",
    finderCopy: "سناریو را انتخاب کن. ما ضروری‌ها را کوتاه می‌کنیم.",
    storyTitle: "برای بیرون ساخته شده، نه برای قفسه.",
    storyCopy: "JASTLIFE بین فروشگاه و راهنما قرار می‌گیرد؛ جایی که محصول و محتوا کنار هم کمک می‌کنند انتخاب بهتری داشته باشی.",
    read: "بیشتر بخوان",
    essentials: "چهار دنیای JAST",
    waitTitle: "اولین Drop را زودتر ببین.",
    waitCopy: "فقط لانچ‌ها، راهنماهای مهم و انتخاب‌های جدید.",
    email: "ایمیل شما",
    join: "عضویت",
    search: "جست‌وجو در JASTLIFE",
    popular: "پیشنهاد سریع",
  },
  en: {
    nav: [["Shop", "#shop"], ["Finder", "#finder"], ["Story", "#story"]],
    eyebrow: "JASTLIFE / CURATED OUTDOOR GOODS",
    title: "Choose less.\nGo outside better.",
    desc: "Travel, camping, cycling and outdoor tech selected with one simple test: is it truly worth carrying?",
    shop: "Explore the edit",
    finder: "JAST Finder",
    categories: "Shop by activity",
    new: "Fresh picks",
    newSub: "Fewer products. Better decisions.",
    darkTitle: "Everything you carry should earn its place.",
    darkCopy: "Instead of adding hundreds of products, we make selection harder. Utility, weight, durability and real outdoor use are the filters behind JASTLIFE.",
    finderTitle: "Where are you going?",
    finderCopy: "Pick the scenario. We narrow the essentials.",
    storyTitle: "Built for outside, not for shelves.",
    storyCopy: "JASTLIFE sits between a store and a guide — product and content working together to help you choose better.",
    read: "Read the story",
    essentials: "Four JAST worlds",
    waitTitle: "See Drop 01 first.",
    waitCopy: "Only launches, useful guides and new selections.",
    email: "Your email",
    join: "Join",
    search: "Search JASTLIFE",
    popular: "Quick suggestions",
  }
};

const items = [
  { id: 1, cat: "CAMP", fa: "چراغ کمپ ماژولار", en: "Modular Camp Light", type: "light", note: "DROP 01" },
  { id: 2, cat: "TECH", fa: "پاور Outdoor", en: "Outdoor Power", type: "power", note: "JAST PICK" },
  { id: 3, cat: "RIDE", fa: "کیت تعمیر فشرده", en: "Compact Repair Kit", type: "tool", note: "ESSENTIAL" },
  { id: 4, cat: "EXPLORE", fa: "کوله روزانه 22L", en: "22L Day Pack", type: "pack", note: "LIGHTWEIGHT" },
  { id: 5, cat: "EXPLORE", fa: "فیلتر آب فشرده", en: "Compact Water Filter", type: "bottle", note: "FIELD READY" },
  { id: 6, cat: "TRAVEL", fa: "ارگانایزر سفر", en: "Travel Organizer", type: "case", note: "UTILITY" },
];

const worlds = [
  ["01", "CAMP", "کمپ", "Camping", "Sleep / Light / Shelter"],
  ["02", "RIDE", "حرکت", "Ride", "Repair / Safety / Carry"],
  ["03", "TECH", "تکنولوژی", "Tech", "Power / Nav / Smart"],
  ["04", "EXPLORE", "طبیعت", "Explore", "Pack / Water / Utility"],
];

function Logo() {
  return <svg className="logo" viewBox="0 0 64 64" aria-label="JASTLIFE"><path d="M43 10v24c0 14-7.5 21-19 21-7.8 0-13.2-3.6-16-10"/><path d="M34.5 18 43 8l8.5 10"/><path className="logoAccent" d="M42.8 8.4 48 14.7"/></svg>;
}

function ProductArt({ type }) {
  if (type === "pack") return <svg viewBox="0 0 200 200"><path d="M67 62c0-24 13-38 33-38s33 14 33 38"/><rect x="48" y="55" width="104" height="116" rx="31"/><path d="M68 89h64M76 126h48M62 76c-18 18-21 52-8 81M138 76c18 18 21 52 8 81"/></svg>;
  if (type === "power") return <svg viewBox="0 0 200 200"><rect x="61" y="33" width="78" height="134" rx="22"/><path d="M85 21h30M77 70h46M81 135h38"/><circle cx="100" cy="102" r="17"/></svg>;
  if (type === "bottle") return <svg viewBox="0 0 200 200"><path d="M81 27h38v27l13 19v79c0 11-9 20-20 20H88c-11 0-20-9-20-20V73l13-19V27Z"/><path d="M81 55h38M76 103h48"/></svg>;
  if (type === "case") return <svg viewBox="0 0 200 200"><rect x="34" y="62" width="132" height="94" rx="23"/><path d="M72 62V46h56v16M34 101h132M100 88v27"/></svg>;
  if (type === "tool") return <svg viewBox="0 0 200 200"><path d="M62 40c-20 19-21 51-2 71l-25 42 18 10 28-39c24 8 51-5 63-28 10-20 7-43-7-59l-23 40-27-16 24-40c-18-3-36 3-49 19Z"/></svg>;
  return <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="54"/><circle cx="100" cy="100" r="20"/><path d="M100 20v27M100 153v27M20 100h27M153 100h27M44 44l19 19M137 137l19 19"/></svg>;
}

export default function Home() {
  const [lang, setLang] = useState("fa");
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState([]);
  const [scenario, setScenario] = useState("camp");
  const t = copy[lang];
  const rtl = lang === "fa";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [lang, rtl]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items.slice(0, 4);
    const q = query.toLowerCase();
    return items.filter(x => `${x.fa} ${x.en} ${x.cat}`.toLowerCase().includes(q));
  }, [query]);

  const lists = rtl ? {
    camp: ["نور قابل اتکا", "سیستم خواب", "پاور", "آب", "ابزار چندکاره"],
    ride: ["چراغ ایمنی", "کیت تعمیر", "پمپ", "حمل سبک", "پاور"],
    road: ["ارگانایزر", "پاور", "چراغ", "آب", "کوله روزانه"],
    trail: ["آب", "کوله", "نور", "مسیریابی", "ابزار سبک"],
  } : {
    camp: ["Reliable light", "Sleep system", "Power", "Water", "Multi tool"],
    ride: ["Safety light", "Repair kit", "Pump", "Light carry", "Power"],
    road: ["Organizer", "Power", "Light", "Water", "Day pack"],
    trail: ["Water", "Pack", "Light", "Navigation", "Light tools"],
  };

  const toggleSave = id => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return <main className="site" dir={rtl ? "rtl" : "ltr"}>
    <header className="nav shell">
      <a className="brand" href="#top"><span className="logoBox"><Logo/></span><strong>JASTLIFE</strong></a>
      <nav className="desktopNav">{t.nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
      <div className="navActions">
        <button onClick={() => setSearch(true)} aria-label="Search" className="circleBtn">⌕</button>
        <button aria-label="Saved" className="circleBtn savedIcon">♡{saved.length > 0 && <i>{saved.length}</i>}</button>
        <button className="lang" onClick={() => setLang(lang === "fa" ? "en" : "fa")}>{lang === "fa" ? "EN" : "FA"}</button>
        <button className="menuBtn" onClick={() => setMenu(!menu)}>{menu ? "×" : "☰"}</button>
      </div>
    </header>
    {menu && <div className="mobileNav">{t.nav.map(([label, href]) => <a href={href} onClick={() => setMenu(false)} key={href}>{label}<span>↗</span></a>)}</div>}

    <section className="hero" id="top">
      <div className="shell heroGrid">
        <div className="heroCopy">
          <span className="eyebrow">{t.eyebrow}</span>
          <h1>{t.title.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h1>
          <p>{t.desc}</p>
          <div className="heroActions"><a className="blackBtn" href="#shop">{t.shop}<span>↗</span></a><a className="plainLink" href="#finder">{t.finder}<span>→</span></a></div>
        </div>
        <div className="heroMedia"><div className="heroImage"/><span className="mediaIndex">J / 001</span><span className="mediaCaption">MOVE LIGHT — GO FAR</span></div>
      </div>
    </section>

    <section className="categoryBand shell" id="shop">
      <div className="bandTitle"><span>{t.categories}</span><small>01 — 04</small></div>
      <div className="worldRail">{worlds.map(w => <a href="#products" className="world" key={w[1]}><span>{w[0]}</span><div><b>{rtl ? w[2] : w[3]}</b><small>{w[1]}</small></div><i>↗</i></a>)}</div>
    </section>

    <section className="products section" id="products">
      <div className="shell">
        <div className="sectionTop"><div><span className="sectionNo">01 / DROP 01</span><h2>{t.new}</h2></div><p>{t.newSub}</p></div>
        <div className="productGrid">{items.slice(0,4).map((item, i) => <article className="product" key={item.id}>
          <div className="productArt"><span className="productNote">{item.note}</span><button onClick={() => toggleSave(item.id)} className={`heart ${saved.includes(item.id) ? "active" : ""}`}>{saved.includes(item.id) ? "♥" : "♡"}</button><ProductArt type={item.type}/><small>0{i+1}</small></div>
          <div className="productMeta"><div><span>{item.cat}</span><h3>{rtl ? item.fa : item.en}</h3></div><i>↗</i></div>
        </article>)}</div>
      </div>
    </section>

    <section className="manifesto">
      <div className="shell manifestoGrid"><div className="manifestMark"><Logo/></div><div><span className="sectionNo light">02 / JAST STANDARD</span><h2>{t.darkTitle}</h2><p>{t.darkCopy}</p><a href="#finder">JAST METHOD <span>↗</span></a></div></div>
    </section>

    <section className="finder section" id="finder">
      <div className="shell finderGrid"><div className="finderIntro"><span className="sectionNo">03 / SMART FINDER</span><h2>{t.finderTitle}</h2><p>{t.finderCopy}</p></div><div className="finderBox">
        <div className="finderTabs">{[["camp", rtl?"کمپ یک‌شبه":"One-night camp"],["ride",rtl?"دوچرخه":"Ride"],["road",rtl?"سفر جاده‌ای":"Road trip"],["trail",rtl?"طبیعت یک‌روزه":"Day trail"]].map(([key,label]) => <button className={scenario===key?"active":""} onClick={() => setScenario(key)} key={key}>{label}</button>)}</div>
        <div className="finderList">{lists[scenario].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong><i>✓</i></div>)}</div>
        <a href="#products" className="finderAction">{rtl?"دیدن انتخاب‌های مرتبط":"See relevant picks"}<span>↗</span></a>
      </div></div>
    </section>

    <section className="story" id="story"><div className="storyImage"/><div className="storyShade"/><div className="shell storyInner"><span>04 / FIELD NOTES</span><h2>{t.storyTitle}</h2><p>{t.storyCopy}</p><a href="#waitlist">{t.read}<span>↗</span></a></div></section>

    <section className="essentials section"><div className="shell"><div className="sectionTop"><div><span className="sectionNo">05 / WORLDS</span><h2>{t.essentials}</h2></div></div><div className="essentialGrid">{worlds.map(w=><article key={w[1]}><span>{w[0]}</span><h3>{rtl?w[2]:w[3]}</h3><p>{w[4]}</p><i>↗</i></article>)}</div></div></section>

    <section className="wait" id="waitlist"><div className="shell waitGrid"><div><span className="sectionNo light">DROP 01 / EARLY ACCESS</span><h2>{t.waitTitle}</h2><p>{t.waitCopy}</p></div><form onSubmit={e=>e.preventDefault()}><div><input type="email" required placeholder={t.email}/><button>{t.join}<span>↗</span></button></div><small>{rtl?"بدون اسپم. فقط چیزهای مهم.":"No spam. Only the important stuff."}</small></form></div></section>

    <footer><div className="shell footerTop"><a className="brand footerBrand" href="#top"><span className="logoBox"><Logo/></span><strong>JASTLIFE</strong></a><div className="footerLinks"><a href="#shop">SHOP</a><a href="#finder">FINDER</a><a href="#story">STORY</a></div><span>GO OUTSIDE. LIVE MORE.</span></div><div className="shell footerWord">JASTLIFE</div><div className="shell footerBottom"><span>© 2026 JASTLIFE</span><span>OUTDOOR / GEAR / TECH</span></div></footer>

    {search && <div className="searchOverlay"><div className="searchPanel"><div className="searchHead"><strong>{t.search}</strong><button onClick={() => {setSearch(false);setQuery("")}}>×</button></div><div className="searchField"><span>⌕</span><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.search}/></div><span className="searchLabel">{t.popular}</span><div className="searchResults">{filtered.map(item=><a href="#products" onClick={()=>setSearch(false)} key={item.id}><div className="miniArt"><ProductArt type={item.type}/></div><div><small>{item.cat}</small><strong>{rtl?item.fa:item.en}</strong></div><span>↗</span></a>)}</div></div></div>}
  </main>;
}
