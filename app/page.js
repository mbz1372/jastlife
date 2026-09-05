"use client";

import { useEffect, useMemo, useState } from "react";

const copy = {
  fa: {
    nav: [["فروشگاه", "#edit"], ["مسیرها", "#route"], ["درباره", "#story"]],
    eyebrow: "JASTLIFE / OUTDOOR GOODS / 2026",
    title: "کمتر حمل کن.\nبیشتر زندگی کن.",
    desc: "تجهیزات سفر، کمپ، دوچرخه و تکنولوژی بیرون؛ انتخاب‌شده برای آدم‌هایی که می‌خواهند سبک‌تر حرکت کنند و بهتر بیرون باشند.",
    primary: "دیدن انتخاب‌ها",
    secondary: "مسیرت را انتخاب کن",
    routeKicker: "JAST ROUTE / SMART DISCOVERY",
    routeTitle: "اول مسیر را انتخاب کن.\nبعد وسیله را.",
    routeCopy: "به‌جای گشتن بین صدها محصول، از موقعیت واقعی شروع کن. JAST Route ضروری‌ها را برای هر سناریو کوتاه می‌کند.",
    editTitle: "The JAST Edit",
    editCopy: "چهار انتخاب برای شروع. نه بیشتر.",
    storyTitle: "هر چیزی که همراهت می‌آید، باید ارزش وزنش را داشته باشد.",
    storyCopy: "JASTLIFE درباره داشتن وسایل بیشتر نیست. درباره انتخاب دقیق‌تر، حرکت سبک‌تر و تجربه بهتر بیرون است.",
    worlds: "چهار دنیا. یک استاندارد.",
    waitTitle: "Drop 01 را قبل از بقیه ببین.",
    waitCopy: "لانچ‌ها، راهنماها و انتخاب‌های جدید. کوتاه و مفید.",
    email: "ایمیل شما",
    join: "دسترسی زودهنگام",
    search: "جست‌وجو در JASTLIFE",
  },
  en: {
    nav: [["Shop", "#edit"], ["Routes", "#route"], ["About", "#story"]],
    eyebrow: "JASTLIFE / OUTDOOR GOODS / 2026",
    title: "Carry less.\nLive more.",
    desc: "Travel, camping, cycling and outdoor tech — selected for people who want to move lighter and live outside better.",
    primary: "Explore the edit",
    secondary: "Choose your route",
    routeKicker: "JAST ROUTE / SMART DISCOVERY",
    routeTitle: "Choose the route first.\nThen the gear.",
    routeCopy: "Skip endless product grids. Start with the real situation. JAST Route narrows the essentials for each scenario.",
    editTitle: "The JAST Edit",
    editCopy: "Four starting points. No more.",
    storyTitle: "Everything you carry should earn its weight.",
    storyCopy: "JASTLIFE is not about owning more gear. It is about choosing better, moving lighter and experiencing more outside.",
    worlds: "Four worlds. One standard.",
    waitTitle: "See Drop 01 before everyone else.",
    waitCopy: "Launches, useful guides and new selections. Short and useful.",
    email: "Your email",
    join: "Get early access",
    search: "Search JASTLIFE",
  },
};

const products = [
  { id: 1, cat: "CAMP", fa: "چراغ کمپ ماژولار", en: "Modular Camp Light", note: "LIGHT / 01", type: "light" },
  { id: 2, cat: "TECH", fa: "پاور Outdoor", en: "Outdoor Power", note: "POWER / 02", type: "power" },
  { id: 3, cat: "RIDE", fa: "کیت تعمیر فشرده", en: "Compact Repair Kit", note: "REPAIR / 03", type: "tool" },
  { id: 4, cat: "EXPLORE", fa: "کوله روزانه 22L", en: "22L Day Pack", note: "CARRY / 04", type: "pack" },
];

const routes = {
  camp: { code: "CAMP / 24H", fa: "کمپ یک‌شبه", en: "One-night camp", stat: "05 essentials", itemsFa: ["نور قابل اتکا", "سیستم خواب", "پاور", "آب", "ابزار"], itemsEn: ["Reliable light", "Sleep system", "Power", "Water", "Tool"], path: "M18 172 C96 140 78 72 164 90 S276 164 342 92 S468 36 534 74" },
  ride: { code: "RIDE / 80K", fa: "مسیر دوچرخه", en: "Long ride", stat: "05 essentials", itemsFa: ["چراغ ایمنی", "کیت تعمیر", "پمپ", "حمل سبک", "پاور"], itemsEn: ["Safety light", "Repair kit", "Pump", "Light carry", "Power"], path: "M18 150 C92 36 132 178 205 90 S316 42 370 126 S462 158 534 54" },
  road: { code: "ROAD / 3D", fa: "سفر جاده‌ای", en: "Road trip", stat: "05 essentials", itemsFa: ["ارگانایزر", "پاور", "نور", "آب", "کوله روزانه"], itemsEn: ["Organizer", "Power", "Light", "Water", "Day pack"], path: "M18 134 C84 102 118 48 190 84 S284 180 352 112 S460 52 534 118" },
  trail: { code: "TRAIL / DAY", fa: "طبیعت یک‌روزه", en: "Day trail", stat: "05 essentials", itemsFa: ["آب", "کوله", "نور", "مسیریابی", "ابزار سبک"], itemsEn: ["Water", "Pack", "Light", "Navigation", "Light tool"], path: "M18 164 C90 170 82 62 158 82 S270 174 328 100 S430 28 534 92" },
};

function Logo({ large = false }) {
  return <svg className={large ? "logo large" : "logo"} viewBox="0 0 64 64" aria-label="JASTLIFE"><path d="M43 10v24c0 14-7.5 21-19 21-7.8 0-13.2-3.6-16-10"/><path d="M34.5 18 43 8l8.5 10"/><path className="accent" d="M42.8 8.4 48 14.7"/></svg>;
}

function ProductArt({ type }) {
  if (type === "pack") return <svg viewBox="0 0 220 220"><path d="M75 66c0-26 14-42 35-42s35 16 35 42"/><rect x="53" y="59" width="114" height="126" rx="34"/><path d="M75 96h70M84 137h52M68 82c-20 20-23 57-9 88M152 82c20 20 23 57 9 88"/></svg>;
  if (type === "power") return <svg viewBox="0 0 220 220"><rect x="66" y="36" width="88" height="148" rx="25"/><path d="M93 24h34M84 78h52M89 150h42"/><circle cx="110" cy="111" r="19"/></svg>;
  if (type === "tool") return <svg viewBox="0 0 220 220"><path d="M68 43c-22 21-23 56-2 78l-27 47 20 11 31-43c27 9 56-5 70-31 11-22 8-48-8-65l-26 44-30-17 26-44c-19-3-39 3-54 20Z"/></svg>;
  return <svg viewBox="0 0 220 220"><circle cx="110" cy="110" r="60"/><circle cx="110" cy="110" r="22"/><path d="M110 20v30M110 170v30M20 110h30M170 110h30M47 47l21 21M152 152l21 21"/></svg>;
}

export default function Home() {
  const [lang, setLang] = useState("fa");
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState([]);
  const [route, setRoute] = useState("camp");
  const t = copy[lang];
  const rtl = lang === "fa";
  const activeRoute = routes[route];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [lang, rtl]);

  const filtered = useMemo(() => {
    if (!query.trim()) return products;
    const q = query.toLowerCase();
    return products.filter(p => `${p.fa} ${p.en} ${p.cat}`.toLowerCase().includes(q));
  }, [query]);

  const toggleSave = id => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return <main className="site" dir={rtl ? "rtl" : "ltr"}>
    <section className="hero" id="top">
      <div className="heroBg"/><div className="heroFade"/>
      <header className="nav shell">
        <a href="#top" className="brand"><span className="mark"><Logo/></span><strong>JASTLIFE</strong></a>
        <nav>{t.nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <div className="navTools"><button onClick={() => setSearch(true)} aria-label="Search">⌕</button><button className="saveTop" aria-label="Saved">♡{saved.length > 0 && <i>{saved.length}</i>}</button><button className="lang" onClick={() => setLang(lang === "fa" ? "en" : "fa")}>{lang === "fa" ? "EN" : "FA"}</button><button className="menu" onClick={() => setMenu(!menu)}>{menu ? "×" : "☰"}</button></div>
      </header>
      {menu && <div className="mobileMenu">{t.nav.map(([label, href]) => <a href={href} key={href} onClick={() => setMenu(false)}>{label}<span>↗</span></a>)}</div>}
      <div className="heroContent shell">
        <div className="heroText"><span className="eyebrow">{t.eyebrow}</span><h1>{t.title.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h1><p>{t.desc}</p><div className="heroActions"><a href="#edit" className="primary">{t.primary}<span>↗</span></a><a href="#route" className="secondary">{t.secondary}<span>↓</span></a></div></div>
        <div className="heroMeta"><span>35.6892° N</span><span>FIELD SYSTEM / J-26</span></div>
      </div>
      <div className="scrollCue"><span>SCROLL TO EXPLORE</span><i/></div>
    </section>

    <section className="worlds shell">
      {["CAMP","RIDE","TECH","EXPLORE"].map((w,i) => <a href="#edit" key={w}><span>0{i+1}</span><strong>{w}</strong><i>↗</i></a>)}
    </section>

    <section className="intro section">
      <div className="shell introGrid"><span className="sectionNo">01 / JASTLIFE</span><h2>{rtl ? "فروشگاه نیست؛ یک فیلتر برای انتخاب بهتر است." : "Not just a store. A filter for better choices."}</h2><p>{rtl ? "محصول کمتر، دلیل بیشتر. هر انتخاب باید در دنیای واقعی بیرون معنی داشته باشد." : "Fewer products, stronger reasons. Every pick should make sense outside in the real world."}</p></div>
    </section>

    <section className="edit section" id="edit">
      <div className="shell sectionHead"><div><span className="sectionNo">02 / DROP 01</span><h2>{t.editTitle}</h2></div><p>{t.editCopy}</p></div>
      <div className="shell editGrid">
        {products.map((p, i) => <article className={`product product${i+1}`} key={p.id}>
          <div className="productCanvas"><span>{p.note}</span><button className={saved.includes(p.id) ? "heart active" : "heart"} onClick={() => toggleSave(p.id)} aria-label="Save">{saved.includes(p.id) ? "♥" : "♡"}</button><ProductArt type={p.type}/><b>0{i+1}</b></div>
          <div className="productCopy"><small>{p.cat}</small><h3>{rtl ? p.fa : p.en}</h3><a href="#waitlist">{rtl ? "مشاهده" : "View"} <span>↗</span></a></div>
        </article>)}
      </div>
    </section>

    <section className="route section" id="route">
      <div className="shell routeGrid">
        <div className="routeIntro"><span className="sectionNo light">03 / {t.routeKicker}</span><h2>{t.routeTitle.split("\n").map((l,i)=><span key={i}>{l}</span>)}</h2><p>{t.routeCopy}</p></div>
        <div className="routeStage">
          <div className="routeTabs">{Object.entries(routes).map(([key,r]) => <button key={key} className={route === key ? "active" : ""} onClick={() => setRoute(key)}><small>{r.code}</small><strong>{rtl ? r.fa : r.en}</strong></button>)}</div>
          <div className="routeVisual">
            <div className="routeVisualTop"><span>{activeRoute.code}</span><b>{activeRoute.stat}</b></div>
            <svg viewBox="0 0 552 210" preserveAspectRatio="none"><path className="routeGhost" d="M18 105 H534"/><path className="routePath" d={activeRoute.path}/><circle cx="18" cy="172" r="5"/><circle cx="534" cy="74" r="7"/></svg>
            <div className="routeLabels"><span>START</span><span>GO FAR</span></div>
          </div>
          <div className="gearList">{(rtl ? activeRoute.itemsFa : activeRoute.itemsEn).map((item,i)=><div key={item}><span>0{i+1}</span><strong>{item}</strong><i>✓</i></div>)}</div>
          <a href="#edit" className="routeCta">{rtl ? "دیدن انتخاب‌های مرتبط" : "See relevant picks"}<span>↗</span></a>
        </div>
      </div>
    </section>

    <section className="story" id="story"><div className="storyBg"/><div className="storyShade"/><div className="shell storyContent"><span>04 / FIELD PRINCIPLE</span><Logo large/><h2>{t.storyTitle}</h2><p>{t.storyCopy}</p><div className="storyLine"><span>PACK LESS</span><i/><span>EXPERIENCE MORE</span></div></div></section>

    <section className="finalEdit section"><div className="shell finalGrid"><div><span className="sectionNo">05 / WORLDS</span><h2>{t.worlds}</h2></div><div className="worldCards">{[["CAMP","Sleep / Light / Shelter"],["RIDE","Repair / Safety / Carry"],["TECH","Power / Navigation / Smart"],["EXPLORE","Pack / Water / Utility"]].map((w,i)=><a href="#edit" key={w[0]}><span>0{i+1}</span><div><strong>{w[0]}</strong><small>{w[1]}</small></div><i>↗</i></a>)}</div></div></section>

    <section className="wait" id="waitlist"><div className="shell waitGrid"><div><span>DROP 01 / EARLY ACCESS</span><h2>{t.waitTitle}</h2><p>{t.waitCopy}</p></div><form onSubmit={e=>e.preventDefault()}><input type="email" required placeholder={t.email}/><button>{t.join}<span>↗</span></button></form></div></section>

    <footer><div className="shell footerTop"><a href="#top" className="brand"><span className="mark dark"><Logo/></span><strong>JASTLIFE</strong></a><span>GO OUTSIDE. LIVE MORE.</span><span>© 2026 / JASTLIFE</span></div><div className="footerWord">JASTLIFE</div></footer>

    {search && <div className="searchOverlay"><button className="closeSearch" onClick={() => setSearch(false)}>×</button><div className="searchInner"><span>SEARCH / JASTLIFE</span><div className="searchField"><i>⌕</i><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.search}/></div><div className="searchResults">{filtered.map(p=><a href="#edit" onClick={()=>setSearch(false)} key={p.id}><small>{p.cat}</small><strong>{rtl?p.fa:p.en}</strong><span>↗</span></a>)}</div></div></div>}
  </main>;
}
