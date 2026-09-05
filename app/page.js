"use client";

import { useEffect, useMemo, useState } from "react";

const COPY = {
  fa: {
    nav: [["فروشگاه", "#gear"], ["JAST System", "#system"], ["درباره", "#about"]],
    badge: "PERFORMANCE OUTDOOR / DROP 01",
    heroA: "سبک‌تر برو.",
    heroB: "دورتر برس.",
    heroText: "JASTLIFE تجهیزات سفر، کمپ، دوچرخه و تکنولوژی بیرون را برای یک چیز انتخاب می‌کند: حرکت بهتر با وسایل کمتر و درست‌تر.",
    shop: "دیدن تجهیزات",
    build: "سیستم خودت را بساز",
    categoriesTitle: "برای حرکت ساخته شده",
    categoriesText: "از نوع ماجراجویی شروع کن. JASTLIFE انتخاب‌ها را کوتاه می‌کند.",
    gearTitle: "تجهیزات منتخب",
    gearText: "کالکشن محدود، کاربرد مشخص، بدون انتخاب‌های اضافه.",
    coming: "DROP 01",
    systemEyebrow: "SMART GEAR BUILDER",
    systemTitle: "JAST System",
    systemText: "سناریوی واقعی را انتخاب کن؛ سیستم پیشنهادی بر اساس نوع حرکت، مدت و نیازهای اصلی تغییر می‌کند.",
    loadout: "پیشنهاد برای این مسیر",
    metrics: ["وزن هدف", "استقلال انرژی", "سطح آمادگی"],
    aboutTitle: "ما دنبال وسیله بیشتر نیستیم.",
    aboutText: "هدف JASTLIFE ساختن یک فروشگاه شلوغ نیست. هر محصول باید دلیل مشخصی برای همراه شدن داشته باشد: کاربرد، دوام، وزن مناسب و تجربه بهتر بیرون.",
    values: ["انتخاب محدود و دقیق", "طراحی حول موقعیت واقعی", "راهنمای ساده قبل از خرید"],
    campaignTitle: "هر گرم باید ارزش حمل شدن داشته باشد.",
    campaignText: "FIELD PRINCIPLE / JAST 01",
    earlyTitle: "اولین Drop نزدیک است.",
    earlyText: "برای دسترسی زودتر به Drop 01 و راهنماهای انتخاب عضو شو.",
    email: "ایمیل شما",
    notify: "خبرم کن",
    demo: "فرم فعلاً نمایشی است.",
    search: "جست‌وجوی تجهیزات",
    searchHint: "چراغ، پاور، کوله، ابزار...",
  },
  en: {
    nav: [["Shop", "#gear"], ["JAST System", "#system"], ["About", "#about"]],
    badge: "PERFORMANCE OUTDOOR / DROP 01",
    heroA: "Move lighter.",
    heroB: "Go farther.",
    heroText: "JASTLIFE curates travel, camping, cycling and outdoor tech for one thing: better movement with fewer, smarter essentials.",
    shop: "Explore gear",
    build: "Build your system",
    categoriesTitle: "Built around movement",
    categoriesText: "Start with the activity. JASTLIFE narrows the choices.",
    gearTitle: "Selected gear",
    gearText: "A tight edit, clear purpose, no filler.",
    coming: "DROP 01",
    systemEyebrow: "SMART GEAR BUILDER",
    systemTitle: "JAST System",
    systemText: "Choose a real scenario. Your suggested system adapts around the activity, duration and essential needs.",
    loadout: "Suggested for this route",
    metrics: ["Target weight", "Power autonomy", "Readiness"],
    aboutTitle: "We are not here to sell more stuff.",
    aboutText: "JASTLIFE is not trying to become an endless store. Every item needs a reason to come with you: utility, durability, efficient weight and a better experience outside.",
    values: ["Tightly curated", "Built around real scenarios", "Simple guidance before buying"],
    campaignTitle: "Every gram should earn the carry.",
    campaignText: "FIELD PRINCIPLE / JAST 01",
    earlyTitle: "Drop 01 is coming.",
    earlyText: "Join for early access to Drop 01 and practical gear guides.",
    email: "Your email",
    notify: "Notify me",
    demo: "Form is currently a visual demo.",
    search: "Search gear",
    searchHint: "Light, power, pack, tools...",
  },
};

const CATEGORIES = [
  { key: "CAMP", fa: "کمپ", en: "Camp", note: "SLEEP / LIGHT / SHELTER" },
  { key: "RIDE", fa: "دوچرخه", en: "Ride", note: "REPAIR / SAFETY / CARRY" },
  { key: "TRAVEL", fa: "سفر", en: "Travel", note: "ORGANIZE / POWER / MOVE" },
  { key: "TECH", fa: "تکنولوژی", en: "Tech", note: "POWER / NAV / SMART" },
];

const PRODUCTS = [
  { id: 1, cat: "CAMP", fa: "چراغ کمپ Core", en: "Core Camp Light", label: "JAST PICK", kind: "lamp", spec: "360° / MODULAR" },
  { id: 2, cat: "TECH", fa: "پاور Field 20K", en: "Field Power 20K", label: "FIELD READY", kind: "power", spec: "20K / USB-C PD" },
  { id: 3, cat: "RIDE", fa: "کیت تعمیر Ride", en: "Ride Repair Kit", label: "ESSENTIAL", kind: "tool", spec: "11 TOOLS / COMPACT" },
  { id: 4, cat: "TRAVEL", fa: "کوله Move 22L", en: "Move 22L Pack", label: "LIGHT CARRY", kind: "pack", spec: "22L / DAILY" },
  { id: 5, cat: "CAMP", fa: "فیلتر آب Trail", en: "Trail Water Filter", label: "TRAIL", kind: "filter", spec: "FAST FLOW / LIGHT" },
  { id: 6, cat: "RIDE", fa: "چراغ Smart Rear", en: "Smart Rear Light", label: "SMART", kind: "rear", spec: "AUTO / USB-C" },
];

const SYSTEMS = {
  camp: {
    fa: { title: "کمپ یک‌شبه", sub: "24H / CAMP", items: ["نور 360°", "پاور 20K", "آب و فیلتر", "کیت ابزار"], metric: ["4.8 KG", "36 H", "92%"] },
    en: { title: "One-night camp", sub: "24H / CAMP", items: ["360° light", "20K power", "Water + filter", "Tool kit"], metric: ["4.8 KG", "36 H", "92%"] },
  },
  ride: {
    fa: { title: "مسیر دوچرخه", sub: "80K / RIDE", items: ["چراغ هوشمند", "کیت تعمیر", "پاور سبک", "حمل فشرده"], metric: ["1.6 KG", "18 H", "88%"] },
    en: { title: "80K ride", sub: "80K / RIDE", items: ["Smart light", "Repair kit", "Light power", "Compact carry"], metric: ["1.6 KG", "18 H", "88%"] },
  },
  road: {
    fa: { title: "سفر جاده‌ای", sub: "03D / ROAD", items: ["کوله 22L", "پاور 20K", "ارگانایزر", "نور کمپ"], metric: ["6.2 KG", "48 H", "96%"] },
    en: { title: "3-day road trip", sub: "03D / ROAD", items: ["22L pack", "20K power", "Organizer", "Camp light"], metric: ["6.2 KG", "48 H", "96%"] },
  },
  trail: {
    fa: { title: "طبیعت یک‌روزه", sub: "DAY / TRAIL", items: ["کوله سبک", "فیلتر آب", "نور اضطراری", "ابزار سبک"], metric: ["2.9 KG", "14 H", "90%"] },
    en: { title: "Day trail", sub: "DAY / TRAIL", items: ["Light pack", "Water filter", "Emergency light", "Light tools"], metric: ["2.9 KG", "14 H", "90%"] },
  },
};

function Logo() {
  return <svg className="logo" viewBox="0 0 64 64" aria-label="JASTLIFE"><path d="M43 10v24c0 14-7.5 21-19 21-7.8 0-13.2-3.6-16-10"/><path d="M34.5 18 43 8l8.5 10"/><path className="logoAccent" d="M42.8 8.4 48 14.7"/></svg>;
}

function GearRender({ kind }) {
  return <div className={`gearRender ${kind}`} aria-hidden="true">
    <span className="gearGlow" />
    {kind === "lamp" && <><span className="lampRing"/><span className="lampCore"/><span className="lampStand"/></>}
    {kind === "power" && <><span className="powerBody"/><span className="powerScreen">78</span><span className="powerPort"/></>}
    {kind === "tool" && <><span className="toolBody"/><span className="toolArm a"/><span className="toolArm b"/><span className="toolPivot"/></>}
    {kind === "pack" && <><span className="packBody"/><span className="packPocket"/><span className="packStrap left"/><span className="packStrap right"/></>}
    {kind === "filter" && <><span className="filterBody"/><span className="filterCap"/><span className="filterBand"/></>}
    {kind === "rear" && <><span className="rearBody"/><span className="rearLight"/><span className="rearClip"/></>}
  </div>;
}

export default function Home() {
  const [lang, setLang] = useState("fa");
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
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

  useEffect(() => {
    document.body.style.overflow = search || menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [search, menu]);

  const activeProducts = useMemo(() => category === "ALL" ? PRODUCTS.slice(0, 4) : PRODUCTS.filter(p => p.cat === category), [category]);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(p => !q || `${p.fa} ${p.en} ${p.cat} ${p.spec}`.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);
  const current = SYSTEMS[scenario][lang];
  const toggleSaved = id => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return <main className="site" dir={rtl ? "rtl" : "ltr"}>
    <div className="signalBar"><span>JASTLIFE / FIELD SYSTEM 01</span><span>DROP 01 — 2026</span></div>

    <header className="header">
      <a className="brand" href="#top"><span className="mark"><Logo/></span><strong>JASTLIFE</strong></a>
      <nav className="navLinks">{t.nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
      <div className="navTools">
        <button onClick={() => setSearch(true)} aria-label="Search" className="iconBtn"><span>⌕</span></button>
        <button aria-label="Saved" className="iconBtn saveBtn"><span>♡</span>{saved.length > 0 && <i>{saved.length}</i>}</button>
        <button onClick={() => setLang(lang === "fa" ? "en" : "fa")} className="langBtn">{lang === "fa" ? "EN" : "FA"}</button>
        <button onClick={() => setMenu(true)} className="menuBtn" aria-label="Menu">MENU</button>
      </div>
    </header>

    <section className="hero" id="top">
      <div className="heroNoise"/>
      <div className="heroGrid">
        <div className="heroCopy">
          <span className="heroBadge"><i/> {t.badge}</span>
          <h1><span>{t.heroA}</span><span className="outlineText">{t.heroB}</span></h1>
          <p>{t.heroText}</p>
          <div className="heroActions">
            <a href="#gear" className="cta primaryCta">{t.shop}<span>↗</span></a>
            <a href="#system" className="cta ghostCta">{t.build}<span>→</span></a>
          </div>
          <div className="heroData"><span>35°41′N</span><span>FIELD / 01</span><span>JAST / 2026</span></div>
        </div>
        <div className="heroVisual">
          <div className="photoFrame"><div className="photo"/></div>
          <div className="hud hudTop"><span>ACTIVE SYSTEM</span><b>01</b></div>
          <div className="hud hudBottom"><span>MOVE / LIGHT</span><i></i><span>GO / FAR</span></div>
          <div className="blueRail"><span>JASTLIFE</span></div>
        </div>
      </div>
      <div className="heroWord">JAST</div>
    </section>

    <section className="categoryStrip">
      {CATEGORIES.map((c, i) => <a href="#gear" key={c.key} onClick={() => setCategory(c.key)}>
        <span>0{i+1}</span><div><strong>{rtl ? c.fa : c.en}</strong><small>{c.note}</small></div><i>↗</i>
      </a>)}
    </section>

    <section className="categories section">
      <div className="sectionHeader">
        <div><span className="sectionTag">JAST / MOVE</span><h2>{t.categoriesTitle}</h2></div>
        <p>{t.categoriesText}</p>
      </div>
      <div className="categoryShowcase">
        <button onClick={() => {setCategory("CAMP"); document.getElementById("gear")?.scrollIntoView({behavior:"smooth"});}} className="showcaseCard campCard"><span>CAMP</span><strong>{rtl ? "شب بیرون" : "Night outside"}</strong><small>LIGHT / SHELTER / POWER</small><i>↗</i></button>
        <button onClick={() => {setCategory("RIDE"); document.getElementById("gear")?.scrollIntoView({behavior:"smooth"});}} className="showcaseCard rideCard"><span>RIDE</span><strong>{rtl ? "حرکت مداوم" : "Keep moving"}</strong><small>REPAIR / SAFETY / CARRY</small><i>↗</i></button>
        <button onClick={() => {setCategory("TECH"); document.getElementById("gear")?.scrollIntoView({behavior:"smooth"});}} className="showcaseCard techCard"><span>TECH</span><strong>{rtl ? "توان همراه" : "Power outside"}</strong><small>POWER / NAV / SMART</small><i>↗</i></button>
      </div>
    </section>

    <section className="gear section" id="gear">
      <div className="sectionHeader gearHead">
        <div><span className="sectionTag">DROP 01 / SELECTED GEAR</span><h2>{t.gearTitle}</h2></div>
        <p>{t.gearText}</p>
      </div>
      <div className="filterRow">{["ALL","CAMP","RIDE","TRAVEL","TECH"].map(x => <button key={x} className={category === x ? "active" : ""} onClick={() => setCategory(x)}>{x}</button>)}</div>
      <div className="productGrid">
        {activeProducts.map((p) => <article className="productCard" key={p.id}>
          <div className="productStage">
            <div className="stageGrid"/>
            <span className="productBadge">{p.label}</span>
            <button className={`heart ${saved.includes(p.id) ? "active" : ""}`} onClick={() => toggleSaved(p.id)} aria-label="Save">{saved.includes(p.id) ? "♥" : "♡"}</button>
            <GearRender kind={p.kind}/>
            <span className="productSpec">{p.spec}</span>
          </div>
          <div className="productInfo"><div><small>{p.cat}</small><h3>{rtl ? p.fa : p.en}</h3></div><div className="dropState"><span>{t.coming}</span><i>↗</i></div></div>
        </article>)}
      </div>
    </section>

    <section className="system" id="system">
      <div className="systemGlow"/>
      <div className="systemIntro">
        <span>{t.systemEyebrow}</span>
        <h2>{t.systemTitle}</h2>
        <p>{t.systemText}</p>
      </div>
      <div className="systemShell">
        <div className="systemTabs">
          {Object.keys(SYSTEMS).map(key => <button key={key} className={scenario === key ? "active" : ""} onClick={() => setScenario(key)}><span>{SYSTEMS[key][lang].sub}</span><strong>{SYSTEMS[key][lang].title}</strong></button>)}
        </div>
        <div className="systemCore">
          <div className="systemMap">
            <div className="mapTop"><span>{current.sub}</span><strong>JAST / SYSTEM</strong></div>
            <div className="routeGraphic"><span className="dot start"/><span className="routeLine one"/><span className="routeNode n1"/><span className="routeLine two"/><span className="routeNode n2"/><span className="routeLine three"/><span className="dot end"/></div>
            <div className="mapBottom"><span>START</span><span>READY</span></div>
          </div>
          <div className="loadout">
            <span className="miniLabel">{t.loadout}</span>
            <h3>{current.title}</h3>
            <div className="loadoutList">{current.items.map((item, i) => <div key={item}><span>0{i+1}</span><strong>{item}</strong><i>✓</i></div>)}</div>
          </div>
          <div className="metrics">
            {t.metrics.map((m, i) => <div key={m}><span>{m}</span><strong>{current.metric[i]}</strong><i><b style={{width: `${[74,84,92][i]}%`}}/></i></div>)}
          </div>
        </div>
      </div>
    </section>

    <section className="about section" id="about">
      <div className="aboutLead"><span className="sectionTag">WHY JAST</span><h2>{t.aboutTitle}</h2></div>
      <div className="aboutCopy"><p>{t.aboutText}</p><div className="valueList">{t.values.map(v => <div key={v}><span>✓</span><strong>{v}</strong></div>)}</div></div>
    </section>

    <section className="campaign">
      <div className="campaignPhoto"/>
      <div className="campaignOverlay"/>
      <div className="campaignContent"><span>{t.campaignText}</span><h2>{t.campaignTitle}</h2><div className="campaignSignature"><Logo/><strong>JASTLIFE</strong></div></div>
      <div className="campaignCode">J / 01</div>
    </section>

    <section className="early">
      <div><span>DROP 01 / EARLY ACCESS</span><h2>{t.earlyTitle}</h2><p>{t.earlyText}</p></div>
      <form onSubmit={e => e.preventDefault()}><div className="emailField"><input type="email" required placeholder={t.email}/><button>{t.notify}<span>↗</span></button></div><small>{t.demo}</small></form>
    </section>

    <footer>
      <div className="footerTop"><a href="#top" className="brand footerBrand"><span className="mark"><Logo/></span><strong>JASTLIFE</strong></a><div className="footerLinks"><a href="#gear">SHOP</a><a href="#system">SYSTEM</a><a href="#about">ABOUT</a></div><span>GO OUTSIDE. LIVE MORE.</span></div>
      <div className="footerWord">JASTLIFE</div>
      <div className="footerBottom"><span>© 2026 JASTLIFE</span><span>OUTDOOR / SPORT / TECH</span></div>
    </footer>

    {search && <div className="searchOverlay">
      <div className="searchTop"><span className="brand"><span className="mark"><Logo/></span><strong>JASTLIFE</strong></span><button onClick={() => {setSearch(false); setQuery("");}}>×</button></div>
      <div className="searchBody"><span>{t.search}</span><div className="searchInput"><input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder={t.searchHint}/><b>⌕</b></div><div className="searchResults">{results.map(p => <a href="#gear" key={p.id} onClick={() => {setCategory(p.cat); setSearch(false);}}><GearRender kind={p.kind}/><div><small>{p.cat} / {p.spec}</small><strong>{rtl ? p.fa : p.en}</strong></div><i>↗</i></a>)}</div></div>
    </div>}

    {menu && <div className="menuOverlay"><div className="menuTop"><span className="brand"><span className="mark"><Logo/></span><strong>JASTLIFE</strong></span><button onClick={() => setMenu(false)}>×</button></div><nav>{t.nav.map(([label, href]) => <a href={href} key={href} onClick={() => setMenu(false)}><span>{label}</span><i>↗</i></a>)}</nav><div className="menuFoot"><span>JAST / FIELD SYSTEM 01</span><span>2026</span></div></div>}
  </main>;
}
