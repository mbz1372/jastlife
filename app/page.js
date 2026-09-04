"use client";

import { useEffect, useMemo, useState } from "react";

const fa = {
  nav: [["فروشگاه", "#shop"], ["کالکشن‌ها", "#collections"], ["راهنمای انتخاب", "#finder"], ["مجله", "#journal"]],
  heroKicker: "CURATED OUTDOOR STORE / 2026",
  heroTitle: "هوشمندتر انتخاب کن. دورتر برو.",
  heroDesc: "JASTLIFE فروشگاهی برای تجهیزات سفر، کمپ، دوچرخه و تکنولوژی بیرون است؛ با انتخاب محدود، کاربردی و قابل اتکا.",
  heroPrimary: "شروع خرید",
  heroSecondary: "JAST Finder",
  search: "دنبال چه چیزی می‌گردی؟",
  popular: "جست‌وجوهای محبوب",
  quick: ["کمپ سبک", "چراغ", "پاور", "دوچرخه", "کوله", "سفر جاده‌ای"],
  finderTitle: "بگو کجا می‌روی؛ ما بگوییم چه لازم داری.",
  finderDesc: "به‌جای گشتن بین صدها کالا، سناریوی خودت را انتخاب کن و یک لیست جمع‌وجور از نیازهای واقعی ببین.",
  categoriesTitle: "بر اساس مسیر خرید کن",
  featuredTitle: "انتخاب‌های JAST",
  featuredDesc: "محصول‌هایی که از فیلتر کاربرد، وزن، دوام، طراحی و ارزش خرید عبور کرده‌اند.",
  shopAll: "دیدن همه",
  smartTitle: "فروشگاه باید کمک کند کمتر اشتباه کنی.",
  smartDesc: "ما محصول را فقط با دسته‌بندی نمی‌چینیم؛ بر اساس موقعیت، کاربرد و تجربه واقعی مرتب می‌کنیم.",
  editorialTitle: "راهنما قبل از خرید",
  waitTitle: "به لانچ اولیه دسترسی زودتر بگیر.",
  waitDesc: "دراپ‌های محدود، راهنماهای کاربردی و اولین محصولات فروشگاه را زودتر ببین.",
  email: "ایمیل شما",
  join: "عضویت",
};

const en = {
  nav: [["Shop", "#shop"], ["Collections", "#collections"], ["Smart Finder", "#finder"], ["Journal", "#journal"]],
  heroKicker: "CURATED OUTDOOR STORE / 2026",
  heroTitle: "Choose smarter. Go farther.",
  heroDesc: "JASTLIFE is a curated store for camping, cycling, travel and outdoor tech — fewer products, better decisions.",
  heroPrimary: "Start shopping",
  heroSecondary: "JAST Finder",
  search: "What are you looking for?",
  popular: "Popular searches",
  quick: ["Light camp", "Lighting", "Power", "Cycling", "Packs", "Road trip"],
  finderTitle: "Tell us where you're going. We'll narrow the gear.",
  finderDesc: "Skip endless browsing. Pick a real-world scenario and get a focused list of useful gear.",
  categoriesTitle: "Shop by activity",
  featuredTitle: "JAST picks",
  featuredDesc: "Products selected through our filters for usefulness, weight, durability, design and value.",
  shopAll: "View all",
  smartTitle: "A store should help you make fewer bad decisions.",
  smartDesc: "We organize gear by situation, utility and real-world use — not just by product category.",
  editorialTitle: "Know before you buy",
  waitTitle: "Get early access to the first drop.",
  waitDesc: "Limited drops, useful guides and the first JASTLIFE products — before everyone else.",
  email: "Your email",
  join: "Join waitlist",
};

const products = [
  { id: 1, nameFa: "چراغ کمپ ماژولار", nameEn: "Modular Camp Light", cat: "CAMP", tag: "JAST PICK", tone: "blue", type: "light" },
  { id: 2, nameFa: "پاور بانک Outdoor", nameEn: "Outdoor Power Bank", cat: "TECH", tag: "FIELD READY", tone: "silver", type: "power" },
  { id: 3, nameFa: "کیت تعمیر دوچرخه", nameEn: "Ride Repair Kit", cat: "RIDE", tag: "ESSENTIAL", tone: "orange", type: "tool" },
  { id: 4, nameFa: "کوله روزانه 22L", nameEn: "22L Day Pack", cat: "EXPLORE", tag: "LIGHTWEIGHT", tone: "black", type: "pack" },
  { id: 5, nameFa: "فیلتر آب فشرده", nameEn: "Compact Water Filter", cat: "EXPLORE", tag: "TRAIL", tone: "blue", type: "bottle" },
  { id: 6, nameFa: "چراغ عقب هوشمند", nameEn: "Smart Rear Light", cat: "RIDE", tag: "SMART", tone: "red", type: "light" },
  { id: 7, nameFa: "ارگانایزر سفر", nameEn: "Travel Organizer", cat: "TRAVEL", tag: "UTILITY", tone: "silver", type: "case" },
  { id: 8, nameFa: "ابزار چندکاره", nameEn: "Field Multi Tool", cat: "CAMP", tag: "COMPACT", tone: "orange", type: "tool" },
];

const categoryData = [
  ["CAMP", "کمپ", "Camping", "شب‌مانی، نور و خواب"],
  ["RIDE", "دوچرخه", "Cycling", "حرکت، تعمیر و ایمنی"],
  ["TECH", "تکنولوژی", "Outdoor Tech", "پاور، مسیریابی و ارتباط"],
  ["EXPLORE", "طبیعت", "Explore", "کوله، آب و ابزار مسیر"],
  ["TRAVEL", "سفر", "Travel", "نظم، حمل و جاده"],
];

function Logo() {
  return <svg className="logo" viewBox="0 0 64 64" aria-label="JASTLIFE"><path d="M43 10v24c0 14-7.5 21-19 21-7.8 0-13.2-3.6-16-10"/><path d="M34.5 18 43 8l8.5 10"/><path className="accent" d="M42.8 8.4 48 14.7"/></svg>;
}

function ProductVisual({ type }) {
  if (type === "pack") return <svg viewBox="0 0 180 180"><path d="M59 55c0-22 12-35 31-35s31 13 31 35"/><rect x="43" y="48" width="94" height="105" rx="28"/><path d="M61 78h58M68 112h44M55 66c-18 16-20 48-8 72M125 66c18 16 20 48 8 72"/></svg>;
  if (type === "power") return <svg viewBox="0 0 180 180"><rect x="53" y="30" width="74" height="120" rx="18"/><path d="M78 19h24M69 62h42M72 119h36"/><circle cx="90" cy="91" r="15"/></svg>;
  if (type === "bottle") return <svg viewBox="0 0 180 180"><path d="M72 24h36v25l12 18v73c0 10-8 18-18 18H78c-10 0-18-8-18-18V67l12-18V24Z"/><path d="M72 50h36M67 93h46"/></svg>;
  if (type === "case") return <svg viewBox="0 0 180 180"><rect x="31" y="53" width="118" height="85" rx="20"/><path d="M66 53V38h48v15M31 88h118M90 76v24"/></svg>;
  if (type === "tool") return <svg viewBox="0 0 180 180"><path d="M55 35c-18 17-19 46-2 64l-22 38 16 9 25-35c22 7 46-4 57-25 9-18 6-39-6-53l-21 36-24-14 21-36c-15-2-31 3-44 16Z"/></svg>;
  return <svg viewBox="0 0 180 180"><circle cx="90" cy="90" r="48"/><circle cx="90" cy="90" r="18"/><path d="M90 18v24M90 138v24M18 90h24M138 90h24M39 39l17 17M124 124l17 17"/></svg>;
}

export default function Home() {
  const [lang, setLang] = useState("fa");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [finder, setFinder] = useState("camp");
  const [saved, setSaved] = useState([]);
  const t = lang === "fa" ? fa : en;
  const rtl = lang === "fa";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [lang, rtl]);

  const filtered = useMemo(() => {
    if (!query.trim()) return products.slice(0, 6);
    const q = query.toLowerCase();
    return products.filter(p => `${p.nameFa} ${p.nameEn} ${p.cat}`.toLowerCase().includes(q));
  }, [query]);

  const scenarios = rtl ? {
    camp: ["چراغ کمپ", "سیستم خواب", "پاور", "آب", "ابزار چندکاره"],
    ride: ["چراغ ایمنی", "کیت تعمیر", "پمپ", "پاور", "کیف حمل"],
    travel: ["ارگانایزر", "پاور", "چراغ", "بطری", "کوله روزانه"],
    trail: ["آب", "کوله", "نور", "مسیریابی", "ابزار سبک"],
  } : {
    camp: ["Camp light", "Sleep system", "Power", "Water", "Multi tool"],
    ride: ["Safety light", "Repair kit", "Pump", "Power", "Carry bag"],
    travel: ["Organizer", "Power", "Light", "Bottle", "Day pack"],
    trail: ["Water", "Pack", "Light", "Navigation", "Light tools"],
  };

  const toggleSave = id => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return <main className="site" dir={rtl ? "rtl" : "ltr"}>
    <div className="utilityBar"><span>JASTLIFE / CURATED OUTDOOR STORE</span><span>{rtl ? "ارسال و پشتیبانی در لانچ اولیه" : "Shipping & support at launch"}</span></div>

    <header className="topNav shell">
      <a className="brand" href="#home"><span className="mark"><Logo/></span><span><b>JASTLIFE</b><small>OUTDOOR / GEAR / TECH</small></span></a>
      <nav>{t.nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
      <div className="navActions">
        <button onClick={() => setSearchOpen(true)} className="iconBtn" aria-label="search">⌕</button>
        <button className="savedBtn" aria-label="saved">♡<span>{saved.length || ""}</span></button>
        <button className="langBtn" onClick={() => setLang(lang === "fa" ? "en" : "fa")}>{lang === "fa" ? "EN" : "FA"}</button>
        <button className="mobileBtn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>
    </header>
    {menuOpen && <div className="mobileNav">{t.nav.map(([label, href]) => <a onClick={() => setMenuOpen(false)} href={href} key={href}>{label}<span>↗</span></a>)}</div>}

    <section className="hero" id="home">
      <div className="heroPhoto"/>
      <div className="heroShade"/>
      <div className="shell heroInner">
        <div className="heroCopy">
          <span className="kicker">{t.heroKicker}</span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroDesc}</p>
          <div className="heroButtons">
            <a href="#shop" className="cta primary">{t.heroPrimary}<span>↗</span></a>
            <a href="#finder" className="cta ghost">{t.heroSecondary}<span>→</span></a>
          </div>
        </div>
        <button className="floatingSearch" onClick={() => setSearchOpen(true)}><span>⌕</span><div><small>{rtl ? "جست‌وجوی سریع" : "Quick search"}</small><strong>{t.search}</strong></div><kbd>/</kbd></button>
      </div>
    </section>

    <section className="quickRail shell" id="shop">
      <div className="railHead"><span>{t.categoriesTitle}</span><a href="#products">{t.shopAll} ↗</a></div>
      <div className="categoryRail">
        {categoryData.map((c, i) => <a className="categoryPill" href="#products" key={c[0]}><span className={`catIcon cat${i+1}`}>{["△","◉","⌁","⌃","□"][i]}</span><div><b>{rtl ? c[1] : c[2]}</b><small>{c[0]}</small></div><i>↗</i></a>)}
      </div>
    </section>

    <section className="finder section" id="finder">
      <div className="shell finderGrid">
        <div className="finderIntro"><span className="sectionLabel">JAST FINDER / 01</span><h2>{t.finderTitle}</h2><p>{t.finderDesc}</p></div>
        <div className="finderPanel">
          <div className="finderTabs">
            {[['camp', rtl?'کمپ یک‌شبه':'Overnight'],['ride',rtl?'دوچرخه':'Ride'],['travel',rtl?'سفر جاده‌ای':'Road trip'],['trail',rtl?'طبیعت یک‌روزه':'Day trail']].map(([k,l]) => <button className={finder===k?'active':''} onClick={()=>setFinder(k)} key={k}>{l}</button>)}
          </div>
          <div className="finderResult"><div className="resultTop"><span>{rtl ? "پیشنهاد سیستم" : "Suggested system"}</span><b>05 ITEMS</b></div>{scenarios[finder].map((x,i)=><div className="resultRow" key={x}><span>0{i+1}</span><strong>{x}</strong><i>✓</i></div>)}<a href="#products" className="finderCta">{rtl ? "دیدن تجهیزات پیشنهادی" : "See recommended gear"}<span>↗</span></a></div>
        </div>
      </div>
    </section>

    <section className="products section" id="products">
      <div className="shell">
        <div className="sectionHead"><div><span className="sectionLabel">CURATED / DROP 001</span><h2>{t.featuredTitle}</h2></div><p>{t.featuredDesc}</p></div>
        <div className="productGrid">
          {products.map(p => <article className="productCard" key={p.id}>
            <div className={`productVisual ${p.tone}`}><span className="productTag">{p.tag}</span><button onClick={()=>toggleSave(p.id)} className={saved.includes(p.id)?'heart active':'heart'} aria-label="save">{saved.includes(p.id)?'♥':'♡'}</button><ProductVisual type={p.type}/><div className="visualIndex">0{p.id}</div></div>
            <div className="productInfo"><div><small>{p.cat}</small><h3>{rtl?p.nameFa:p.nameEn}</h3></div><span className="launchBadge">{rtl?'در لانچ':'AT LAUNCH'}</span></div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="smartSection section">
      <div className="shell smartGrid">
        <div className="smartStatement"><span className="sectionLabel">SMART COMMERCE / JAST METHOD</span><h2>{t.smartTitle}</h2><p>{t.smartDesc}</p><a href="#journal">{rtl?'روش انتخاب ما':'Our selection method'} ↗</a></div>
        <div className="smartCards">
          {[['01',rtl?'مقایسه بر اساس کاربرد':'Compare by use',rtl?'نه فقط مشخصات فنی':'Not specs alone'],['02',rtl?'پیشنهاد بر اساس موقعیت':'Scenario-based picks',rtl?'از مقصد شروع کن':'Start with the situation'],['03',rtl?'کالکشن محدود':'Curated assortment',rtl?'گزینه کمتر، تصمیم بهتر':'Fewer options, better decisions'],['04',rtl?'راهنمای قبل از خرید':'Guidance before buying',rtl?'محتوا بخشی از فروشگاه است':'Content is part of the store']].map(x=><article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}
        </div>
      </div>
    </section>

    <section className="collections section" id="collections">
      <div className="shell editorialSplit">
        <article className="storyCard big"><div className="storyPhoto photoCamp"></div><div className="storyOverlay"></div><div className="storyCopy"><span>FIELD EDIT / CAMP</span><h2>{rtl?'شب سبک‌تر، صبح بهتر.':'Pack a better night.'}</h2><a href="#products">{rtl?'خرید برای کمپ':'Shop camping'} ↗</a></div></article>
        <div className="storyStack"><article className="storyCard"><div className="storyPhoto photoRide"></div><div className="storyOverlay"></div><div className="storyCopy"><span>RIDE SYSTEM</span><h3>{rtl?'برای مسیرهای طولانی‌تر':'For longer rides'}</h3><a href="#products">{rtl?'دیدن Ride':'Shop Ride'} ↗</a></div></article><article className="storyCard clean"><div className="cleanArt"><Logo/></div><div className="storyCopy"><span>JAST STANDARD / 05</span><h3>{rtl?'هر محصول باید دلیل خوبی برای حمل شدن داشته باشد.':'Every product must earn its place.'}</h3><a href="#finder">{rtl?'استاندارد JAST':'JAST Standard'} ↗</a></div></article></div>
      </div>
    </section>

    <section className="journal section" id="journal">
      <div className="shell"><div className="sectionHead"><div><span className="sectionLabel">FIELD JOURNAL</span><h2>{t.editorialTitle}</h2></div><a href="#waitlist">{rtl?'همه راهنماها':'All guides'} ↗</a></div>
      <div className="journalGrid">{[
        [rtl?'برای یک شب کمپ چه لازم است؟':'What do you really need for one night?', '06 MIN', '△'],
        [rtl?'چطور وزن تجهیزات را کم کنیم؟':'How to cut gear weight', '04 MIN','↗'],
        [rtl?'پاور مناسب بیرون چه فرقی دارد؟':'What makes outdoor power different?', '05 MIN','⌁']
      ].map((a,i)=><article key={a[0]}><div className={`journalArt j${i+1}`}><span>{a[3]}</span><b>0{i+1}</b></div><small>GUIDE / {a[1]}</small><h3>{a[0]}</h3><a href="#waitlist">READ ↗</a></article>)}</div></div>
    </section>

    <section className="trustStrip"><div className="shell trustGrid">{[["01",rtl?'انتخاب محدود':'Curated selection'],["02",rtl?'راهنمای واقعی':'Real guidance'],["03",rtl?'پشتیبانی انسانی':'Human support'],["04",rtl?'دراپ‌های کنترل‌شده':'Controlled drops']].map(x=><div key={x[0]}><span>{x[0]}</span><strong>{x[1]}</strong></div>)}</div></section>

    <section className="waitlist" id="waitlist"><div className="shell waitGrid"><div><span className="sectionLabel">EARLY ACCESS / DROP 001</span><h2>{t.waitTitle}</h2><p>{t.waitDesc}</p></div><form onSubmit={e=>e.preventDefault()}><div><input type="email" required placeholder={t.email}/><button>{t.join}<span>↗</span></button></div><small>{rtl?'بدون اسپم. فقط چیزهای مهم.':'No spam. Only useful updates.'}</small></form></div></section>

    <footer><div className="shell footerGrid"><div className="footerBrand"><div className="brand"><span className="mark"><Logo/></span><span><b>JASTLIFE</b><small>OUTDOOR / GEAR / TECH</small></span></div><p>{rtl?'برای بیرون. برای حرکت. برای انتخاب بهتر.':'For outside. For motion. For better choices.'}</p></div><div><strong>SHOP</strong><a href="#products">CAMP</a><a href="#products">RIDE</a><a href="#products">TECH</a><a href="#products">EXPLORE</a></div><div><strong>JAST</strong><a href="#finder">FINDER</a><a href="#journal">JOURNAL</a><a href="#waitlist">EARLY ACCESS</a></div><div className="footerStamp"><b>J/26</b><span>FIELD CURATED</span></div></div><div className="shell footerMassive">JASTLIFE</div><div className="shell footerBottom"><span>© 2026 JASTLIFE</span><span>GO OUTSIDE. LIVE MORE.</span></div></footer>

    {searchOpen && <div className="searchOverlay" onClick={()=>setSearchOpen(false)}><div className="searchPanel" onClick={e=>e.stopPropagation()}><div className="searchTop"><span>⌕</span><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.search}/><button onClick={()=>setSearchOpen(false)}>×</button></div><div className="searchQuick"><span>{t.popular}</span>{t.quick.map(q=><button onClick={()=>setQuery(q)} key={q}>{q}</button>)}</div><div className="searchResults">{filtered.map(p=><a href="#products" onClick={()=>setSearchOpen(false)} key={p.id}><span className={`miniVisual ${p.tone}`}><ProductVisual type={p.type}/></span><div><small>{p.cat} / {p.tag}</small><strong>{rtl?p.nameFa:p.nameEn}</strong></div><i>↗</i></a>)}</div></div></div>}
  </main>;
}
