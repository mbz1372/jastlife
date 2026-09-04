"use client";

import { useEffect, useState } from "react";

const copy = {
  fa: {
    lang: "fa",
    dir: "rtl",
    nav: [
      ["دسته‌بندی‌ها", "#categories"],
      ["فلسفه ما", "#about"],
      ["لانچ", "#launch"],
    ],
    menu: "منو",
    close: "بستن",
    eyebrow: "JASTLIFE / OUTDOOR SYSTEMS / 2026",
    titleA: "بیرون،",
    titleB: "زندگی شروع می‌شود.",
    desc: "JASTLIFE انتخابی دقیق از تجهیزات، گجت‌ها و ابزارهای حرکت است؛ برای آدم‌هایی که شهر را ترک می‌کنند تا بیشتر ببینند، دورتر بروند و بهتر زندگی کنند.",
    primary: "کشف JASTLIFE",
    secondary: "فلسفه ما",
    status: "در حال آماده‌سازی برای لانچ",
    micro: ["CAMP", "RIDE", "EXPLORE", "TECH"],
    sideLabel: "JAST CODE / 01",
    sideTitle: "MOVE LIGHT. GO FAR.",
    sideCopy: "هر چیزی که همراهت می‌آید، باید دلیل خوبی برای بودنش داشته باشد.",
    scroll: "ادامه بده",
    categoryKicker: "انتخاب‌شده برای حرکت",
    categoryTitle: "تجهیزاتی که فقط خوب دیده نمی‌شوند؛ خوب کار می‌کنند.",
    categoryDesc: "از ابزار هوشمند تا کمپ، دوچرخه و طبیعت‌گردی؛ هر دسته با تمرکز روی کاربرد، دوام و تجربه واقعی بیرون انتخاب می‌شود.",
    categories: [
      ["گجت هوشمند", "SMART GEAR", "تکنولوژی کاربردی، سبک و آماده‌ی مسیر.", "signal"],
      ["کمپ", "CAMP", "برای شب‌هایی که سقف، آسمان است.", "camp"],
      ["دوچرخه", "RIDE", "ابزارهایی برای مسیرهای طولانی‌تر و سریع‌تر.", "ride"],
      ["طبیعت‌گردی", "EXPLORE", "ضروریات قابل اتکا برای بیرون از شهر.", "trail"],
    ],
    aboutKicker: "فلسفه JASTLIFE",
    aboutTitle: "کمتر حمل کن. دورتر برو. بیشتر زندگی کن.",
    principles: [
      ["01", "کاربرد قبل از نمایش", "محصول باید اول مسئله‌ای واقعی را حل کند؛ ظاهر خوب امتیاز دوم است."],
      ["02", "سبک، اما جدی", "تجهیزات باید فضای کمتری بگیرند و در لحظه‌ی لازم، بیشتر از انتظار کار کنند."],
      ["03", "تکنولوژی برای بیرون", "گجت وقتی ارزش دارد که آزادی بیشتری بدهد، نه حواس‌پرتی بیشتر."],
    ],
    manifestTop: "BUILT FOR THE OUTSIDE",
    manifestBottom: "NOT FOR THE SHELF",
    launchTag: "NEXT DROP / 2026",
    launchTitle: "JASTLIFE در راه است.",
    launchDesc: "نسخه‌ی اول فروشگاه با مجموعه‌ای محدود و گزیده از تجهیزات سفر، کمپ، دوچرخه و گجت‌های کاربردی منتشر می‌شود.",
    launchCta: "دیدن دسته‌بندی‌ها",
    footer: "GO OUTSIDE. LIVE MORE.",
    copyright: "© 2026 JASTLIFE",
  },
  en: {
    lang: "en",
    dir: "ltr",
    nav: [
      ["Categories", "#categories"],
      ["Philosophy", "#about"],
      ["Launch", "#launch"],
    ],
    menu: "Menu",
    close: "Close",
    eyebrow: "JASTLIFE / OUTDOOR SYSTEMS / 2026",
    titleA: "Outside is",
    titleB: "where life starts.",
    desc: "JASTLIFE is a focused selection of gear, gadgets and tools for motion — made for people who leave the city to see more, go farther and live better.",
    primary: "Explore JASTLIFE",
    secondary: "Our philosophy",
    status: "Preparing for launch",
    micro: ["CAMP", "RIDE", "EXPLORE", "TECH"],
    sideLabel: "JAST CODE / 01",
    sideTitle: "MOVE LIGHT. GO FAR.",
    sideCopy: "Everything you carry should earn its place on the journey.",
    scroll: "Keep moving",
    categoryKicker: "Selected for motion",
    categoryTitle: "Gear that does more than look good. It works hard.",
    categoryDesc: "From smart tools to camping, cycling and outdoor essentials, every category is built around function, durability and real-world use.",
    categories: [
      ["Smart Gear", "SMART GEAR", "Useful tech, lightweight and ready for the route.", "signal"],
      ["Camping", "CAMP", "For nights when the sky is the ceiling.", "camp"],
      ["Cycling", "RIDE", "Tools for longer, smoother and faster rides.", "ride"],
      ["Outdoor", "EXPLORE", "Reliable essentials for time beyond the city.", "trail"],
    ],
    aboutKicker: "The JASTLIFE philosophy",
    aboutTitle: "Carry less. Go farther. Live more.",
    principles: [
      ["01", "Function before flex", "A product should solve a real problem first. Looking good comes second."],
      ["02", "Light, not fragile", "Gear should take less space and deliver more when the moment demands it."],
      ["03", "Tech for outside", "Technology earns its place when it creates more freedom, not more distraction."],
    ],
    manifestTop: "BUILT FOR THE OUTSIDE",
    manifestBottom: "NOT FOR THE SHELF",
    launchTag: "NEXT DROP / 2026",
    launchTitle: "JASTLIFE is on the way.",
    launchDesc: "The first store release will feature a limited, curated selection of travel, camping, cycling and practical smart gear.",
    launchCta: "Explore categories",
    footer: "GO OUTSIDE. LIVE MORE.",
    copyright: "© 2026 JASTLIFE",
  },
};

function LogoMark() {
  return (
    <svg className="logoSvg" viewBox="0 0 64 64" role="img" aria-label="JASTLIFE">
      <path className="logoRoad" d="M43 10v24c0 14-7.5 21-19 21-7.8 0-13.2-3.6-16-10" />
      <path className="logoPeak" d="M34.5 18 43 8l8.5 10" />
      <path className="logoCut" d="M42.8 8.4 48 14.7" />
    </svg>
  );
}

function CategoryIcon({ type }) {
  if (type === "signal") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="15" y="10" width="18" height="28" rx="6" />
        <path d="M20 6h8M20 42h8M24 19v10M19 24h10" />
      </svg>
    );
  }
  if (type === "camp") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M6 38 24 10l18 28H6Z" />
        <path d="M24 10v28M16 38l8-12 8 12" />
      </svg>
    );
  }
  if (type === "ride") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="12" cy="34" r="8" />
        <circle cx="37" cy="34" r="8" />
        <path d="m12 34 9-16 7 16H12Zm9-16h10l6 16M18 14h8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="m5 37 12-17 7 9 6-8 13 16H5Z" />
      <path d="m17 20 5-8 5 8" />
    </svg>
  );
}

export default function Home() {
  const [lang, setLang] = useState("fa");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = t.lang;
    document.documentElement.dir = t.dir;
  }, [t.lang, t.dir]);

  const switchLanguage = () => {
    setLang((current) => (current === "fa" ? "en" : "fa"));
    setMenuOpen(false);
  };

  return (
    <main className="site" dir={t.dir}>
      <a className="skipLink" href="#main-content">Skip to content</a>

      <section className="hero" id="home">
        <div className="heroImage" aria-hidden="true" />
        <div className="heroNoise" aria-hidden="true" />
        <div className="heroGlow" aria-hidden="true" />

        <header className="header shell">
          <a className="brand" href="#home" aria-label="JASTLIFE home">
            <span className="brandMark"><LogoMark /></span>
            <span className="brandCopy">
              <strong>JASTLIFE</strong>
              <small>OUTDOOR / GEAR / TECH</small>
            </span>
          </a>

          <nav className="desktopNav" aria-label="Primary navigation">
            {t.nav.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>

          <div className="headerActions">
            <button className="langButton" onClick={switchLanguage} type="button" aria-label="Switch language">
              {lang === "fa" ? "EN" : "FA"}
            </button>
            <button
              className="menuButton"
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span>{menuOpen ? t.close : t.menu}</span>
              <i aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className={`mobileMenu ${menuOpen ? "isOpen" : ""}`} id="mobile-menu">
          <nav aria-label="Mobile navigation">
            {t.nav.map(([label, href], index) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>{label}
              </a>
            ))}
          </nav>
        </div>

        <div className="heroMain shell" id="main-content">
          <div className="heroCopyBlock">
            <div className="eyebrow"><span />{t.eyebrow}</div>
            <h1>
              <span>{t.titleA}</span>
              <strong>{t.titleB}</strong>
            </h1>
            <p className="heroDesc">{t.desc}</p>

            <div className="heroCtas">
              <a className="primaryCta" href="#categories">
                <span>{t.primary}</span>
                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
              </a>
              <a className="textCta" href="#about">{t.secondary}<span aria-hidden="true">↗</span></a>
            </div>

            <div className="statusLine">
              <span className="pulseDot" />
              <span>{t.status}</span>
            </div>
          </div>

          <aside className="heroSideCard" aria-label={t.sideTitle}>
            <div className="sideCardTop">
              <span>{t.sideLabel}</span>
              <span className="sideCross">+</span>
            </div>
            <div className="routeGraphic" aria-hidden="true">
              <svg viewBox="0 0 240 122">
                <path d="M10 104c30-2 42-28 66-26 21 2 26 22 48 12 30-13 30-56 58-61 17-3 31 8 48 10" />
                <circle cx="10" cy="104" r="4" />
                <circle cx="230" cy="39" r="4" />
              </svg>
            </div>
            <strong>{t.sideTitle}</strong>
            <p>{t.sideCopy}</p>
          </aside>
        </div>

        <div className="heroBottom shell">
          <div className="microList" aria-label="JASTLIFE categories">
            {t.micro.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}
          </div>
          <a className="scrollCue" href="#categories">
            <span>{t.scroll}</span>
            <i aria-hidden="true" />
          </a>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="tickerTrack">
          {[0, 1].map((group) => (
            <div className="tickerGroup" key={group}>
              <span>JASTLIFE</span><i>◆</i><span>GO OUTSIDE</span><i>◆</i><span>LIVE MORE</span><i>◆</i><span>MOVE LIGHT</span><i>◆</i>
            </div>
          ))}
        </div>
      </div>

      <section className="categoriesSection section" id="categories">
        <div className="shell">
          <div className="sectionHead">
            <div>
              <span className="sectionKicker">{t.categoryKicker}</span>
              <h2>{t.categoryTitle}</h2>
            </div>
            <p>{t.categoryDesc}</p>
          </div>

          <div className="categoryGrid">
            {t.categories.map(([title, label, desc, icon], index) => (
              <article className="categoryCard" key={label}>
                <div className="cardTopline">
                  <span>0{index + 1}</span>
                  <span>{label}</span>
                </div>
                <div className="categoryIcon"><CategoryIcon type={icon} /></div>
                <div className="categoryText">
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
                <span className="cardArrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="aboutSection section" id="about">
        <div className="aboutGrid shell">
          <div className="aboutIntro">
            <span className="sectionKicker">{t.aboutKicker}</span>
            <h2>{t.aboutTitle}</h2>
            <div className="aboutMark" aria-hidden="true"><LogoMark /></div>
          </div>

          <div className="principles">
            {t.principles.map(([number, title, desc]) => (
              <article className="principle" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="manifest shell" aria-label={`${t.manifestTop} ${t.manifestBottom}`}>
          <div>{t.manifestTop}</div>
          <div><span>J</span>{t.manifestBottom}</div>
        </div>
      </section>

      <section className="launchSection" id="launch">
        <div className="launchGlow" aria-hidden="true" />
        <div className="launchInner shell">
          <div className="launchTag">{t.launchTag}</div>
          <div className="launchContent">
            <h2>{t.launchTitle}</h2>
            <p>{t.launchDesc}</p>
          </div>
          <a className="launchCta" href="#categories">
            <span>{t.launchCta}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footerInner">
          <a className="footerBrand" href="#home">
            <span className="brandMark small"><LogoMark /></span>
            <strong>JASTLIFE</strong>
          </a>
          <div className="footerTagline">{t.footer}</div>
          <div className="copyright">{t.copyright}</div>
        </div>
      </footer>
    </main>
  );
}
