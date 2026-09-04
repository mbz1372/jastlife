"use client";

import { useEffect, useState } from "react";

const copy = {
  fa: {
    lang: "fa",
    dir: "rtl",
    nav: [["کالکشن‌ها", "#collections"], ["چرا JAST", "#why"], ["مجله", "#journal"], ["سوالات", "#faq"]],
    menu: "منو",
    close: "بستن",
    eyebrow: "JASTLIFE / FIELD EQUIPMENT / 2026",
    titleA: "بیرون،",
    titleB: "نسخه واقعی زندگی‌ست.",
    desc: "تجهیزات سفر، کمپ، دوچرخه و تکنولوژیِ کاربردی؛ انتخاب‌شده برای آدم‌هایی که کیفیت مسیر برایشان به اندازه مقصد مهم است.",
    primary: "کالکشن‌ها را ببین",
    secondary: "داستان JASTLIFE",
    status: "لانچ محدود / 2026",
    field: "FIELD NOTE 001",
    sideTitle: "MOVE LIGHT. GO FAR.",
    sideCopy: "هر گرم اضافه، هر ابزار بی‌مصرف و هر تصمیم بد، در مسیر خودش را نشان می‌دهد. ما برای انتخاب بهتر اینجاییم.",
    metrics: [["04", "دنیای اصلی"], ["01", "استاندارد انتخاب"], ["100%", "تمرکز روی کاربرد"], ["∞", "مسیر برای رفتن"]],
    introKicker: "نه یک فروشگاه معمولی",
    introTitle: "JASTLIFE برای خرید بیشتر ساخته نشده؛ برای انتخاب بهتر ساخته شده.",
    introBody: "ما بین صدها محصول، چیزهایی را پیدا می‌کنیم که واقعاً ارزش حمل کردن دارند. طراحی، دوام، وزن، کاربرد و تجربه واقعی بیرون، فیلترهای اصلی ما هستند.",
    introTags: ["CURATED", "FIELD-READY", "LIGHTWEIGHT", "SMART", "RELIABLE"],
    collectionsKicker: "چهار مسیر / یک استاندارد",
    collectionsTitle: "هر ماجراجویی، تجهیزات خودش را می‌خواهد.",
    collectionsDesc: "کالکشن‌ها را بر اساس نوع تجربه چیده‌ایم، نه قفسه‌های فروشگاه. از شب در طبیعت تا رفت‌وآمد شهری و مسیرهای طولانی.",
    collections: [
      { code: "01 / CAMP", title: "کمپ و شب‌مانی", desc: "خواب بهتر، نور مطمئن، نظم بیشتر و ابزارهایی که شب بیرون را ساده‌تر می‌کنند.", tags: ["SHELTER", "LIGHT", "SLEEP"], kind: "camp" },
      { code: "02 / RIDE", title: "دوچرخه و حرکت", desc: "از ابزار تعمیر تا نور، حمل بار و اکسسوری‌هایی که هر کیلومتر را روان‌تر می‌کنند.", tags: ["COMMUTE", "TOUR", "REPAIR"], kind: "ride" },
      { code: "03 / TECH", title: "تکنولوژی بیرون", desc: "پاور، ردیابی، ارتباط و گجت‌هایی که آزادی می‌دهند؛ نه حواس‌پرتی بیشتر.", tags: ["POWER", "NAV", "SMART"], kind: "tech" },
      { code: "04 / EXPLORE", title: "طبیعت و سفر", desc: "ابزارهای جمع‌وجور و قابل اتکا برای جاده، کوه، ساحل و هر جایی بیرون از روال روزمره.", tags: ["TRAVEL", "TRAIL", "UTILITY"], kind: "explore" },
    ],
    whyKicker: "JAST STANDARD / 05",
    whyTitle: "قبل از اینکه محصولی وارد JASTLIFE شود، باید از پنج سؤال عبور کند.",
    tests: [
      ["01", "واقعاً کاربرد دارد؟", "اگر فقط جذاب باشد اما مسئله‌ای را حل نکند، جایی در انتخاب ما ندارد."],
      ["02", "ارزش وزنش را دارد؟", "هر چیزی که همراهت می‌آید باید دلیل خوبی برای اشغال فضا داشته باشد."],
      ["03", "در مسیر دوام می‌آورد؟", "کیفیت را برای ویترین نمی‌سنجیم؛ برای خاک، باران، تکان و استفاده واقعی می‌سنجیم."],
      ["04", "ساده‌ترت می‌کند؟", "ابزار خوب باید اصطکاک سفر را کم کند، نه اینکه خودش پروژه جدیدی بسازد."],
      ["05", "دوباره انتخابش می‌کنیم؟", "آخرین تست ساده است: آیا بعد از استفاده واقعی، باز هم حاضر به حملش هستیم؟"],
    ],
    systemKicker: "BUILD YOUR SYSTEM",
    systemTitle: "با محصول شروع نکن. با موقعیت شروع کن.",
    systemDesc: "یک سیستم خوب از سناریوی واقعی ساخته می‌شود. انتخاب کن کجا می‌روی؛ بعد تجهیزات ضروری را لایه‌به‌لایه بچین.",
    scenarios: [
      ["A", "یک شب خارج شهر", "کمپ سبک / خودرو", "8–12 آیتم ضروری"],
      ["B", "یک روز روی دوچرخه", "شهری / جاده", "5–9 آیتم ضروری"],
      ["C", "سفر جاده‌ای", "ماشین / ون", "10–16 آیتم ضروری"],
      ["D", "روز طبیعت", "پیاده / سبک", "6–10 آیتم ضروری"],
    ],
    statementTop: "PACK LESS",
    statementMid: "EXPERIENCE MORE",
    statementSmall: "محصول کمتر. تصمیم بهتر. تجربه بیشتر.",
    journalKicker: "FIELD JOURNAL",
    journalTitle: "چیزهایی که قبل از حرکت بد نیست بدانیم.",
    journalDesc: "راهنماهای کوتاه و کاربردی درباره انتخاب تجهیزات، سبک سفر کردن و استفاده بهتر از ابزارها.",
    articles: [
      ["GUIDE / 06 MIN", "برای یک شب کمپ واقعاً چه چیزهایی لازم است؟", "یک چک‌لیست مینیمال برای شروع، بدون خرید اضافه و وسایل بی‌مصرف.", "01"],
      ["FIELD NOTES / 04 MIN", "چطور وزن تجهیزات را بدون قربانی کردن راحتی کم کنیم؟", "پنج تصمیم کوچک که حجم و وزن کوله را به شکل محسوسی پایین می‌آورند.", "02"],
      ["GEAR / 05 MIN", "گجت خوب برای طبیعت چه فرقی با گجت معمولی دارد؟", "باتری، مقاومت، رابط کاربری و چهار چیزی که بیرون از شهر اهمیتشان چند برابر می‌شود.", "03"],
    ],
    quote: "بهترین تجهیزات آن‌هایی هستند که وقتی لازمشان داری عالی کار می‌کنند و وقتی لازمشان نداری، فراموش می‌کنی همراهت هستند.",
    quoteBy: "JASTLIFE / PRODUCT PRINCIPLE",
    faqKicker: "FAQ / BEFORE LAUNCH",
    faqTitle: "قبل از شروع، چند جواب کوتاه.",
    faqs: [
      ["JASTLIFE دقیقاً چه چیزی می‌فروشد؟", "مجموعه‌ای گزیده از تجهیزات کمپ، دوچرخه، سفر، طبیعت‌گردی و گجت‌های کاربردی. هدف ما تعداد زیاد کالا نیست؛ انتخاب محدود اما قابل اتکاست."],
      ["محصولات فقط خارجی هستند؟", "مبنای انتخاب ما برند یا کشور نیست. اگر محصولی استانداردهای کاربرد، دوام، طراحی و ارزش خرید را داشته باشد، می‌تواند وارد کالکشن شود."],
      ["لانچ چه زمانی است؟", "نسخه اول فروشگاه در 2026 با تعداد محدودی محصول و به‌صورت مرحله‌ای منتشر می‌شود. اعضای لیست انتظار زودتر باخبر می‌شوند."],
      ["آیا راهنمای خرید هم دارید؟", "بله. یکی از بخش‌های اصلی JASTLIFE راهنماهای انتخاب و سیستم‌های پیشنهادی برای سناریوهای واقعی سفر و فعالیت بیرون است."],
      ["چطور از شروع فروش باخبر شوم؟", "ایمیل خودت را در لیست انتظار ثبت کن. فقط خبرهای مهم مربوط به لانچ، دراپ‌های محدود و راهنماهای منتخب ارسال می‌شود."],
    ],
    launchTag: "EARLY ACCESS / LIMITED DROP",
    launchTitle: "اولین نفرِ مسیر باش.",
    launchDesc: "برای دسترسی زودتر به لانچ، کالکشن اولیه و راهنماهای اختصاصی JASTLIFE عضو لیست انتظار شو.",
    placeholder: "ایمیل شما",
    submit: "عضویت در لیست",
    success: "ثبت شد — خبرهای مهم JASTLIFE را برایت می‌فرستیم.",
    privacy: "بدون اسپم. فقط لانچ، دراپ‌ها و محتوای واقعاً مفید.",
    footerAbout: "تجهیزات و تکنولوژی برای بیرون، حرکت و زندگی بیشتر.",
    footerCols: [["JASTLIFE", ["کالکشن‌ها", "استاندارد انتخاب", "مجله", "لیست انتظار"]], ["WORLDS", ["Camp", "Ride", "Tech", "Explore"]]],
    footerLine: "GO OUTSIDE. LIVE MORE.",
    copyright: "© 2026 JASTLIFE / ALL RIGHTS RESERVED",
  },
  en: {
    lang: "en",
    dir: "ltr",
    nav: [["Collections", "#collections"], ["Why JAST", "#why"], ["Journal", "#journal"], ["FAQ", "#faq"]],
    menu: "Menu",
    close: "Close",
    eyebrow: "JASTLIFE / FIELD EQUIPMENT / 2026",
    titleA: "Outside is",
    titleB: "life in full resolution.",
    desc: "Travel, camping, cycling and useful technology — selected for people who care as much about the quality of the route as the destination.",
    primary: "Explore collections",
    secondary: "The JASTLIFE story",
    status: "LIMITED LAUNCH / 2026",
    field: "FIELD NOTE 001",
    sideTitle: "MOVE LIGHT. GO FAR.",
    sideCopy: "Every extra gram, useless tool and poor decision shows up on the route. We exist to make the choice better.",
    metrics: [["04", "core worlds"], ["01", "selection standard"], ["100%", "function focused"], ["∞", "routes ahead"]],
    introKicker: "NOT ANOTHER GEAR STORE",
    introTitle: "JASTLIFE isn't built to help you buy more. It's built to help you choose better.",
    introBody: "We search through hundreds of products for the few actually worth carrying. Design, durability, weight, utility and real outdoor experience are the filters that matter.",
    introTags: ["CURATED", "FIELD-READY", "LIGHTWEIGHT", "SMART", "RELIABLE"],
    collectionsKicker: "FOUR WORLDS / ONE STANDARD",
    collectionsTitle: "Every adventure deserves its own system.",
    collectionsDesc: "We organize collections around real experiences, not store aisles — from nights outside to daily riding and longer routes.",
    collections: [
      { code: "01 / CAMP", title: "Camp & sleep", desc: "Better rest, dependable light, smarter organization and tools that make nights outside simpler.", tags: ["SHELTER", "LIGHT", "SLEEP"], kind: "camp" },
      { code: "02 / RIDE", title: "Cycling & motion", desc: "Repair, visibility, carry and accessories designed to make every kilometer smoother.", tags: ["COMMUTE", "TOUR", "REPAIR"], kind: "ride" },
      { code: "03 / TECH", title: "Outdoor technology", desc: "Power, navigation, tracking and tech that creates more freedom — not more distraction.", tags: ["POWER", "NAV", "SMART"], kind: "tech" },
      { code: "04 / EXPLORE", title: "Travel & explore", desc: "Compact, dependable tools for road, trail, coast and anywhere beyond the daily routine.", tags: ["TRAVEL", "TRAIL", "UTILITY"], kind: "explore" },
    ],
    whyKicker: "JAST STANDARD / 05",
    whyTitle: "Before a product enters JASTLIFE, it has to pass five questions.",
    tests: [
      ["01", "Is it actually useful?", "If it only looks interesting but solves no real problem, it doesn't make the cut."],
      ["02", "Is it worth its weight?", "Everything you carry should have a strong reason for taking up space."],
      ["03", "Can it handle the route?", "We don't judge quality for a shelf. We judge it for dust, rain, movement and real use."],
      ["04", "Does it simplify things?", "Good gear reduces friction. It shouldn't become another project to manage."],
      ["05", "Would we carry it again?", "The last test is simple: after real use, would we still choose to bring it?"],
    ],
    systemKicker: "BUILD YOUR SYSTEM",
    systemTitle: "Don't start with products. Start with the situation.",
    systemDesc: "A useful gear system is built around a real scenario. Choose where you're going, then layer only what matters.",
    scenarios: [["A", "One night outside", "Light camp / car", "8–12 essentials"], ["B", "A day on the bike", "City / road", "5–9 essentials"], ["C", "Road trip", "Car / van", "10–16 essentials"], ["D", "Day outdoors", "On foot / light", "6–10 essentials"]],
    statementTop: "PACK LESS",
    statementMid: "EXPERIENCE MORE",
    statementSmall: "Fewer products. Better decisions. More experience.",
    journalKicker: "FIELD JOURNAL",
    journalTitle: "Useful things to know before you go.",
    journalDesc: "Short practical guides about choosing gear, traveling lighter and getting more from the tools you carry.",
    articles: [["GUIDE / 06 MIN", "What do you actually need for one night of camping?", "A minimal starter checklist without overbuying or packing dead weight.", "01"], ["FIELD NOTES / 04 MIN", "How to reduce pack weight without sacrificing comfort", "Five small decisions that make a noticeable difference in volume and weight.", "02"], ["GEAR / 05 MIN", "What makes outdoor tech different from everyday gadgets?", "Battery, durability, interface and four details that matter far more away from the city.", "03"]],
    quote: "The best gear works brilliantly when you need it and disappears from your attention when you don't.",
    quoteBy: "JASTLIFE / PRODUCT PRINCIPLE",
    faqKicker: "FAQ / BEFORE LAUNCH",
    faqTitle: "A few quick answers before we begin.",
    faqs: [["What exactly will JASTLIFE sell?", "A curated range of camping, cycling, travel, outdoor and useful tech products. The goal isn't a huge catalog; it's a smaller selection you can trust."], ["Are products only international brands?", "Country or brand isn't the filter. If a product meets our standards for utility, durability, design and value, it can enter the collection."], ["When does JASTLIFE launch?", "The first store release arrives in 2026 with a limited product range and phased drops. Waitlist members hear first."], ["Will there be buying guides?", "Yes. One of JASTLIFE's core layers is practical guidance and recommended systems built around real outdoor scenarios."], ["How do I hear about launch?", "Join the waitlist below. We only send important launch updates, limited drops and selected useful guides."]],
    launchTag: "EARLY ACCESS / LIMITED DROP",
    launchTitle: "Be first on the route.",
    launchDesc: "Join the waitlist for early access to launch, the opening collection and selected JASTLIFE field guides.",
    placeholder: "Your email",
    submit: "Join the list",
    success: "You're in — we'll send the important JASTLIFE updates.",
    privacy: "No noise. Just launch, drops and genuinely useful field content.",
    footerAbout: "Gear and technology for outside, motion and more life.",
    footerCols: [["JASTLIFE", ["Collections", "Selection standard", "Journal", "Waitlist"]], ["WORLDS", ["Camp", "Ride", "Tech", "Explore"]]],
    footerLine: "GO OUTSIDE. LIVE MORE.",
    copyright: "© 2026 JASTLIFE / ALL RIGHTS RESERVED",
  }
};

function LogoMark() {
  return <svg className="logoSvg" viewBox="0 0 64 64" role="img" aria-label="JASTLIFE"><path className="logoRoad" d="M43 10v24c0 14-7.5 21-19 21-7.8 0-13.2-3.6-16-10"/><path className="logoPeak" d="M34.5 18 43 8l8.5 10"/><path className="logoCut" d="M42.8 8.4 48 14.7"/></svg>;
}

function Arrow() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5"/></svg>;
}

function CollectionVisual({ kind }) {
  if (kind === "camp") return <svg viewBox="0 0 260 180" aria-hidden="true"><path d="M30 148 128 28l104 120H30Z"/><path d="M128 28v120M89 148l39-58 42 58"/><circle cx="205" cy="48" r="18"/></svg>;
  if (kind === "ride") return <svg viewBox="0 0 260 180" aria-hidden="true"><circle cx="67" cy="128" r="39"/><circle cx="198" cy="128" r="39"/><path d="m67 128 49-82 36 82H67Zm49-82h51l31 82M101 29h43"/></svg>;
  if (kind === "tech") return <svg viewBox="0 0 260 180" aria-hidden="true"><rect x="79" y="24" width="102" height="134" rx="28"/><path d="M108 13h44M108 169h44M130 64v55M103 92h55"/><path className="signal" d="M199 61c13 13 13 34 0 47M216 44c23 23 23 60 0 83"/></svg>;
  return <svg viewBox="0 0 260 180" aria-hidden="true"><path d="M15 151 78 72l42 49 35-48 90 78H15Z"/><path d="m78 72 32-43 33 44"/><path className="route" d="M23 159c30-25 57-7 82-27 30-24 48-2 77-24 23-18 34-31 63-27"/></svg>;
}

export default function Home() {
  const [lang, setLang] = useState("fa");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = t.lang;
    document.documentElement.dir = t.dir;
  }, [t.lang, t.dir]);

  const switchLanguage = () => {
    setLang((v) => v === "fa" ? "en" : "fa");
    setMenuOpen(false);
    setSubmitted(false);
  };

  const submitWaitlist = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="site" dir={t.dir}>
      <a className="skipLink" href="#content">Skip to content</a>

      <section className="hero" id="home">
        <div className="heroImage" aria-hidden="true"/><div className="heroNoise" aria-hidden="true"/><div className="heroGlow" aria-hidden="true"/>
        <header className="header shell">
          <a className="brand" href="#home" aria-label="JASTLIFE home"><span className="brandMark"><LogoMark/></span><span className="brandCopy"><strong>JASTLIFE</strong><small>OUTDOOR / GEAR / TECH</small></span></a>
          <nav className="desktopNav" aria-label="Primary navigation">{t.nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
          <div className="headerActions"><button className="langButton" type="button" onClick={switchLanguage}>{lang === "fa" ? "EN" : "FA"}</button><button className="menuButton" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}><span>{menuOpen ? t.close : t.menu}</span><i/></button></div>
        </header>
        <div className={`mobileMenu ${menuOpen ? "isOpen" : ""}`}><nav>{t.nav.map(([label, href], i) => <a key={href} href={href} onClick={() => setMenuOpen(false)}><span>0{i + 1}</span>{label}</a>)}</nav></div>

        <div className="heroMain shell" id="content">
          <div className="heroCopyBlock">
            <div className="eyebrow"><span/>{t.eyebrow}</div>
            <h1><span>{t.titleA}</span><strong>{t.titleB}</strong></h1>
            <p className="heroDesc">{t.desc}</p>
            <div className="heroCtas"><a className="primaryCta" href="#collections"><span>{t.primary}</span><Arrow/></a><a className="textCta" href="#why">{t.secondary}<span>↗</span></a></div>
            <div className="statusLine"><span className="pulseDot"/><span>{t.status}</span></div>
          </div>
          <aside className="heroSideCard">
            <div className="sideCardTop"><span>{t.field}</span><span>35.6892° N</span></div>
            <div className="routeGraphic"><svg viewBox="0 0 260 110" aria-hidden="true"><path d="M8 93c27 0 39-27 66-23 25 4 31 25 57 12 32-17 28-57 61-63 25-4 38 11 60 7"/><circle cx="8" cy="93" r="4"/><circle cx="252" cy="26" r="4"/></svg></div>
            <strong>{t.sideTitle}</strong><p>{t.sideCopy}</p>
            <div className="sideCardFooter"><span>JAST / 001</span><i>+</i></div>
          </aside>
        </div>
        <div className="heroMetrics shell">{t.metrics.map(([n, label]) => <div key={label}><strong>{n}</strong><span>{label}</span></div>)}</div>
      </section>

      <div className="ticker" aria-hidden="true"><div className="tickerTrack">{[0,1].map(g => <div className="tickerGroup" key={g}><span>JASTLIFE</span><i>◆</i><span>MOVE LIGHT</span><i>◆</i><span>GO FAR</span><i>◆</i><span>LIVE MORE</span><i>◆</i></div>)}</div></div>

      <section className="intro section"><div className="shell introGrid"><div><span className="sectionKicker">{t.introKicker}</span><h2>{t.introTitle}</h2></div><div className="introBody"><p>{t.introBody}</p><div className="tagRail">{t.introTags.map(x => <span key={x}>{x}</span>)}</div></div></div></section>

      <section className="collections section" id="collections"><div className="shell"><div className="sectionHead"><div><span className="sectionKicker">{t.collectionsKicker}</span><h2>{t.collectionsTitle}</h2></div><p>{t.collectionsDesc}</p></div><div className="collectionGrid">{t.collections.map((c, i) => <article className={`collectionCard card${i + 1}`} key={c.code}><div className="collectionMeta"><span>{c.code}</span><i>↗</i></div><div className="collectionVisual"><CollectionVisual kind={c.kind}/></div><div className="collectionCopy"><h3>{c.title}</h3><p>{c.desc}</p><div className="miniTags">{c.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></div></section>

      <section className="standard section" id="why"><div className="shell"><div className="standardHead"><span className="sectionKicker">{t.whyKicker}</span><h2>{t.whyTitle}</h2></div><div className="testList">{t.tests.map(([n,title,desc], i) => <article className="testRow" key={n}><span className="testNum">{n}</span><h3>{title}</h3><p>{desc}</p><span className="testMark">{i === 4 ? "✓" : "+"}</span></article>)}</div></div></section>

      <section className="system section"><div className="systemGlow"/><div className="shell systemGrid"><div className="systemIntro"><span className="sectionKicker">{t.systemKicker}</span><h2>{t.systemTitle}</h2><p>{t.systemDesc}</p><div className="compass" aria-hidden="true"><div className="compassRing"><span>N</span><span>E</span><span>S</span><span>W</span><i/></div></div></div><div className="scenarioList">{t.scenarios.map(([code,title,type,count]) => <article key={code}><span>{code}</span><div><h3>{title}</h3><p>{type}</p></div><strong>{count}</strong><i>→</i></article>)}</div></div></section>

      <section className="statement"><div className="statementGrid" aria-hidden="true"/><div className="shell statementInner"><div className="statementLine top">{t.statementTop}</div><div className="statementLine outline">{t.statementMid}</div><div className="statementBottom"><span>{t.statementSmall}</span><LogoMark/></div></div></section>

      <section className="journal section" id="journal"><div className="shell"><div className="sectionHead"><div><span className="sectionKicker">{t.journalKicker}</span><h2>{t.journalTitle}</h2></div><p>{t.journalDesc}</p></div><div className="articleGrid">{t.articles.map(([meta,title,desc,n], i) => <article className={`articleCard article${i + 1}`} key={n}><div className="articleTop"><span>{meta}</span><b>{n}</b></div><div className="articleArt" aria-hidden="true"><span>{i === 0 ? "△" : i === 1 ? "↗" : "⌁"}</span><div/></div><h3>{title}</h3><p>{desc}</p><a href="#waitlist" aria-label={title}>READ / <span>↗</span></a></article>)}</div><blockquote><p>“{t.quote}”</p><footer>{t.quoteBy}</footer></blockquote></div></section>

      <section className="faq section" id="faq"><div className="shell faqGrid"><div className="faqIntro"><span className="sectionKicker">{t.faqKicker}</span><h2>{t.faqTitle}</h2><div className="faqCode">JAST / HELP<br/>REV. 2026.01</div></div><div className="faqList">{t.faqs.map(([q,a], i) => <article className={`faqItem ${openFaq === i ? "open" : ""}`} key={q}><button type="button" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><span>0{i + 1}</span><strong>{q}</strong><i>{openFaq === i ? "−" : "+"}</i></button><div className="faqAnswer"><p>{a}</p></div></article>)}</div></div></section>

      <section className="waitlist" id="waitlist"><div className="waitlistGlow"/><div className="shell waitlistInner"><div className="launchTag">{t.launchTag}</div><div className="waitlistCopy"><h2>{t.launchTitle}</h2><p>{t.launchDesc}</p></div><form className={`waitlistForm ${submitted ? "done" : ""}`} onSubmit={submitWaitlist}>{submitted ? <div className="successMessage"><span>✓</span>{t.success}</div> : <><div className="inputWrap"><input type="email" required placeholder={t.placeholder} aria-label={t.placeholder}/><button type="submit"><span>{t.submit}</span><Arrow/></button></div><small>{t.privacy}</small></>}</form></div></section>

      <footer className="footer"><div className="shell footerTop"><div className="footerIdentity"><a className="brand" href="#home"><span className="brandMark"><LogoMark/></span><span className="brandCopy"><strong>JASTLIFE</strong><small>OUTDOOR / GEAR / TECH</small></span></a><p>{t.footerAbout}</p></div>{t.footerCols.map(([title, items]) => <div className="footerCol" key={title}><strong>{title}</strong>{items.map((item,i) => <a key={item} href={i === 0 ? "#collections" : i === 1 ? "#why" : i === 2 ? "#journal" : "#waitlist"}>{item}</a>)}</div>)}<div className="footerStamp"><span>FIELD APPROVED</span><b>J/26</b><small>TEHRAN → OUTSIDE</small></div></div><div className="shell footerMassive">JASTLIFE</div><div className="shell footerBottom"><span>{t.copyright}</span><strong>{t.footerLine}</strong><span>35.6892° N / 51.3890° E</span></div></footer>
    </main>
  );
}
