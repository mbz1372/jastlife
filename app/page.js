
"use client";

import { useState } from "react";

const copy = {
  fa: {
    dir: "rtl",
    nav: ["خانه", "درباره ما", "دسته‌بندی‌ها", "مجله", "تماس"],
    eyebrow: "کمپ • دوچرخه • طبیعت • گجت",
    title1: "برای بیرون",
    title2: "آماده‌تر باش.",
    desc: "JASTLIFE مجموعه‌ای از گجت‌های به‌روز، تجهیزات کمپینگ، دوچرخه‌سواری و ابزارهایی است که تجربه‌ی طبیعت و حرکت را بهتر می‌کنند.",
    placeholder: "ایمیل شما",
    cta: "خبرم کن",
    note: "اولین نفر باش که از شروع JASTLIFE باخبر می‌شود.",
    explore: "دسته‌بندی‌ها",
    coming: "به‌زودی",
    cards: [
      ["گجت‌های هوشمند", "Smart Gadgets"],
      ["کمپینگ", "Camping"],
      ["دوچرخه‌سواری", "Cycling"],
      ["طبیعت‌گردی", "Outdoor"],
      ["تجهیزات حرفه‌ای", "Pro Gear"]
    ]
  },
  en: {
    dir: "ltr",
    nav: ["Home", "About", "Categories", "Journal", "Contact"],
    eyebrow: "CAMP • RIDE • OUTDOOR • GADGETS",
    title1: "Gear up",
    title2: "for more.",
    desc: "JASTLIFE brings together modern gadgets, camping equipment, cycling gear and smart tools designed for better outdoor experiences.",
    placeholder: "Your email",
    cta: "Notify me",
    note: "Be the first to know when JASTLIFE goes live.",
    explore: "Explore categories",
    coming: "Coming soon",
    cards: [
      ["Smart Gadgets", "Latest tech for outdoors"],
      ["Camping", "Better nights outside"],
      ["Cycling", "Ride farther"],
      ["Outdoor", "Built for nature"],
      ["Pro Gear", "Reliable essentials"]
    ]
  }
};

export default function Home() {
  const [lang, setLang] = useState("fa");
  const t = copy[lang];

  return (
    <main dir={t.dir}>
      <section className="hero">
        <div className="heroOverlay" />
        <header className="header">
          <div className="brand">
            <div className="brandMark">J</div>
            <div>
              <div className="brandName">JASTLIFE</div>
              <div className="brandSub">OUTDOOR • GEAR • TECH</div>
            </div>
          </div>

          <nav className="nav">
            {t.nav.map((item) => <a key={item} href="#">{item}</a>)}
          </nav>

          <button className="lang" onClick={() => setLang(lang === "fa" ? "en" : "fa")}>
            {lang === "fa" ? "EN" : "FA"}
          </button>
        </header>

        <div className="heroContent">
          <div className="eyebrow">{t.eyebrow}</div>
          <h1><span>{t.title1}</span><br/>{t.title2}</h1>
          <p>{t.desc}</p>

          <form className="notify" onSubmit={(e)=>e.preventDefault()}>
            <input type="email" placeholder={t.placeholder} aria-label={t.placeholder}/>
            <button type="submit">{t.cta}</button>
          </form>
          <div className="note">{t.note}</div>

          <div className="chips">
            {t.cards.map(([a,b]) => (
              <div className="chip" key={a}>
                <strong>{a}</strong>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bottomFade" />
      </section>

      <section className="categories">
        <div className="sectionTitle">
          <span>{t.coming}</span>
          <h2>{t.explore}</h2>
        </div>

        <div className="grid">
          {t.cards.map(([a,b], i) => (
            <article className="card" key={a}>
              <div className="index">0{i+1}</div>
              <div className="icon">{["⌚","⛺","🚲","△","🎒"][i]}</div>
              <h3>{a}</h3>
              <p>{b}</p>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <div>© 2026 JASTLIFE</div>
        <div>GO OUTSIDE. LIVE MORE.</div>
      </footer>
    </main>
  );
}
