"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ICON_PATH = "/icons/icons8";

function Icon({ name, alt = "", size = 34 }: { name: string; alt?: string; size?: number }) {
  return <img className="line-icon" src={`${ICON_PATH}/${name}.png`} alt={alt} width={size} height={size} />;
}

const navItems = [
  ["Aanpak", "#aanpak"],
  ["Voor wie", "#voor-wie"],
  ["Verhalen", "#verhalen"],
  ["Agenda", "#agenda"],
  ["Over ons", "#over-ons"],
] as const;

const recognition = [
  { icon: "home", title: "Het stille huis", text: "De dagen zonder je kinderen voelen anders dan je had verwacht." },
  { icon: "family", title: "Ouder blijven", text: "Je wilt er zijn voor je kinderen, ook als je zelf opnieuw moet landen." },
  { icon: "briefcase", title: "Blijven functioneren", text: "Op je werk houd je alles draaiend, terwijl er thuis veel is veranderd." },
  { icon: "person", title: "Jezelf terugvinden", text: "Je merkt dat je vooral hebt volgehouden en jezelf onderweg bent kwijtgeraakt." },
] as const;

const services = [
  { icon: "search", number: "01", title: "De Verkenning", text: "Een rustig eerste gesprek waarin we samen helder krijgen wat er speelt en wat jij nu nodig hebt.", note: "Je hoeft het antwoord nog niet te hebben." },
  { icon: "mountain", number: "02", title: "Eigen Grond", text: "Individuele begeleiding om patronen te herkennen, grenzen te voelen en opnieuw richting te kiezen.", note: "Niet terug naar vroeger, wel thuiskomen bij jezelf." },
  { icon: "people", number: "03", title: "Gedeelde Grond", text: "Kleine groepen waarin herkenning, ervaringen delen en nieuwe verbinding centraal staan.", note: "Geen grote praatgroep, wel echte ontmoeting." },
  { icon: "walking", number: "04", title: "Stukje op Weg", text: "Laagdrempelig wandelen in en rond Tilburg. Soms begint een goed gesprek makkelijker naast elkaar.", note: "Vrijblijvend, gelijkwaardig en in jouw tempo." },
] as const;

const journey = [
  { icon: "pause", title: "Verstillen", text: "Stoppen en ruimte maken." },
  { icon: "heart", title: "Voelen", text: "Toelaten wat er is." },
  { icon: "search", title: "Begrijpen", text: "Zien wat jou beweegt." },
  { icon: "handshake", title: "Verbinden", text: "Met jezelf en anderen." },
  { icon: "sunrise", title: "Bewegen", text: "Een passende stap zetten." },
] as const;

function ContactLink({ className = "button button-primary", children = "Plan een verkennend gesprek" }: { className?: string; children?: React.ReactNode }) {
  return (
    <a className={className} href="mailto:info@losverbonden.nl?subject=Verkennend%20gesprek%20Los%20Verbonden">
      <span>{children}</span><Icon name="arrow-right" size={20} />
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key === "Tab" && menuOpen) {
        const panel = document.querySelector<HTMLElement>(".menu-panel");
        const focusable = panel?.querySelectorAll<HTMLElement>("a, button");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <main>
      <section className="hero" id="boven">
        <Image src="/images/hero-dunes.png" alt="Een persoon loopt over een rustig duinpad richting de ochtendzon" fill priority unoptimized sizes="100vw" className="hero-image" />
        <div className="hero-shade" />

        <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
          <a className="brand" href="#boven" aria-label="Los Verbonden, naar boven">
            <span className="brand-name">LOS VERBONDEN</span>
            <span className="brand-tagline">Uit elkaar. Met aandacht voor wat blijft.</span>
          </a>
          <nav className="desktop-nav" aria-label="Hoofdnavigatie">
            {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
            <ContactLink className="button button-small" children="Kennismaken" />
          </nav>
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Menu openen" aria-expanded={menuOpen} aria-controls="mobile-menu">
            <span>Menu</span><Icon name="menu" size={28} />
          </button>
        </header>

        <div className="hero-content shell">
          <p className="eyebrow light">Begeleiding tijdens en na een scheiding</p>
          <h1>Je relatie eindigde.<br /><em>Je leven niet.</em></h1>
          <p className="hero-intro">Een scheiding verandert meer dan je relatie. Wij helpen je opnieuw grond te vinden — met gesprekken, muziek en ontmoeting, in jouw tempo.</p>
          <div className="hero-actions">
            <ContactLink />
            <a className="text-link light-link" href="#aanpak">Bekijk hoe we werken <span aria-hidden="true">↓</span></a>
          </div>
          <p className="reassurance"><Icon name="check" size={18} /> Vrijblijvend <span>·</span> zonder oordeel <span>·</span> binnen 2 werkdagen reactie</p>
        </div>
        <div className="hero-ribbon"><Icon name="music" size={20} /><span>Jouw verhaal. Jouw muziek. Jouw nieuwe hoofdstuk.</span></div>
      </section>

      {menuOpen && (
        <div className="menu-overlay" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigatiemenu">
          <div className="menu-panel">
            <div className="menu-top">
              <div className="brand dark-brand"><span className="brand-name">LOS VERBONDEN</span><span className="brand-tagline">Met aandacht voor wat blijft.</span></div>
              <button ref={closeButtonRef} className="menu-close" onClick={() => setMenuOpen(false)} aria-label="Menu sluiten"><Icon name="close" size={28} /></button>
            </div>
            <nav aria-label="Mobiele navigatie">
              {navItems.map(([label, href], index) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}</a>
              ))}
            </nav>
            <div className="menu-bottom"><p>Je hoeft het niet alleen te doen.<br />Je hoeft alleen de eerste stap te zetten.</p><ContactLink /></div>
          </div>
        </div>
      )}

      <section className="recognition section shell" id="voor-wie">
        <div className="section-heading narrow">
          <p className="eyebrow">Herkenning</p>
          <h2>Je hoeft het niet alleen te doen</h2>
          <p>Misschien ziet niemand hoeveel je draagt. Dat betekent niet dat je zwak bent. Het betekent dat je door een grote overgang beweegt.</p>
        </div>
        <div className="recognition-grid">
          {recognition.map((item) => <article className="recognition-card" key={item.title}><span className="icon-disc"><Icon name={item.icon} /></span><h3>{item.title}</h3><p>{item.text}</p></article>)}
        </div>
        <p className="script-line">Niemand zou die overgang alleen hoeven dragen.</p>
      </section>

      <section className="why section-dark">
        <div className="shell why-grid">
          <div><p className="eyebrow light">Waarom Los Verbonden</p><h2>Niet zo snel mogelijk verder.<br /><em>Wel opnieuw grond vinden.</em></h2></div>
          <div className="why-copy"><p>Veel begeleiding stopt bij afspraken, procedures of het verleden. Wij kijken naar de mens die verder moet leven — als ouder, als professional en vooral als zichzelf.</p><ul><li><Icon name="heart" size={26} /><span><strong>Menselijk</strong> — zonder oordeel, met echte aandacht.</span></li><li><Icon name="compass" size={26} /><span><strong>Richting</strong> — niet de weg wijzen, wel naast je lopen.</span></li><li><Icon name="people" size={26} /><span><strong>Verbinding</strong> — je hoeft het niet alleen te dragen.</span></li><li><Icon name="leaf" size={26} /><span><strong>Groei</strong> — op jouw tempo, met wat blijft.</span></li></ul></div>
        </div>
      </section>

      <section className="services section shell" id="aanpak">
        <div className="section-heading split-heading"><div><p className="eyebrow">Hoe wij werken</p><h2>Vier vormen.<br />Eén veilige bedding.</h2></div><p>Je hoeft vooraf niet te weten welke vorm past. Iedere reis begint met een verkenning — een gesprek zonder druk om meteen te beslissen.</p></div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="service-top"><span>{service.number}</span><span className="icon-disc"><Icon name={service.icon} /></span></div>
              <h3>{service.title}</h3><p>{service.text}</p><p className="service-note">{service.note}</p>
            </article>
          ))}
        </div>
        <ContactLink className="button button-primary centered-button" children="Begin met De Verkenning" />
      </section>

      <section className="journey section-soft">
        <div className="shell">
          <div className="section-heading narrow"><p className="eyebrow">De persoonlijke beweging</p><h2>Van stilstaan naar bewegen</h2><p>Geen strak stappenplan, maar vijf bewegingen die steeds opnieuw ruimte kunnen geven.</p></div>
          <ol className="journey-list">
            {journey.map((step, index) => <li key={step.title}><span className="journey-number">0{index + 1}</span><span className="journey-icon"><Icon name={step.icon} /></span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}
          </ol>
        </div>
      </section>

      <section className="music-section section">
        <div className="shell music-grid">
          <div className="music-image-wrap"><Image src="/images/music-reflection.png" alt="Koptelefoon, leeg notitieboek en koffie op een houten tafel in warm daglicht" fill unoptimized sizes="(max-width: 800px) 100vw, 50vw" className="cover-image" /><span className="image-label"><Icon name="music" size={22} /> Muziek als methodiek</span></div>
          <div className="music-copy"><p className="eyebrow">Woorden vinden</p><h2>Soms zegt een lied wat jij nog niet kunt zeggen.</h2><p>Muziek kan troosten, spiegelen, herinneren en motiveren. Daarom geven we muziek een plek in gesprekken en reflectie — nooit als truc, altijd als ingang naar wat voor jou betekenis heeft.</p><ul><li><Icon name="headphones" size={24} />Ontdek welke muziek bij jouw fase past.</li><li><Icon name="document" size={24} />Bouw aan de soundtrack van je nieuwe hoofdstuk.</li><li><Icon name="heart" size={24} />Laat gevoel er zijn, zonder het direct op te lossen.</li></ul><p className="script-line left">Jouw verhaal. Jouw muziek. Jouw nieuwe hoofdstuk.</p></div>
        </div>
      </section>

      <section className="about section-dark" id="over-ons">
        <div className="shell about-grid">
          <div className="about-intro"><p className="eyebrow light">Arnold & Melanie</p><h2>Twee perspectieven.<br /><em>Eén bedding.</em></h2><p>Samen creëren we een plek waar je niets hoeft uit te leggen, maar waar alles er mag zijn.</p></div>
          <article className="person-card"><span className="initial">A</span><div><h3>Arnold</h3><p>Arnold brengt helderheid, structuur en oog voor wat er nodig is om opnieuw richting te vinden. Vanuit zijn ervaring als vader, leidinggevende en mens die zelf door een scheiding ging.</p></div></article>
          <article className="person-card"><span className="initial warm">M</span><div><h3>Melanie</h3><p>Melanie brengt ruimte, intuïtie en gevoeligheid voor wat je innerlijk beweegt. Haar bezieling helpt om weer in verbinding te komen met jezelf en wat jij belangrijk vindt.</p></div></article>
        </div>
      </section>

      <section className="stories section shell" id="verhalen">
        <div className="section-heading split-heading"><div><p className="eyebrow">Verhalen & herkenning</p><h2>Wat een scheiding<br />met je leven doet</h2></div><p>Niet ieder verhaal vraagt meteen om een oplossing. Soms begint verandering bij woorden voor wat je al die tijd hebt gedragen.</p></div>
        <div className="story-grid">
          <article><span>Ouderschap</span><h3>De eerste zondag zonder mijn kinderen</h3><p>Over gemis, stilte en opnieuw leren ademhalen in een huis dat anders voelt.</p></article>
          <article><span>Identiteit</span><h3>Wie ben je als het ‘wij’ verdwijnt?</h3><p>Over rollen loslaten en ontdekken wat van jou is gebleven.</p></article>
          <article><span>Werk & leiderschap</span><h3>Sterk zijn is niet hetzelfde als niets voelen</h3><p>Over blijven functioneren terwijl je privé opnieuw moet beginnen.</p></article>
        </div>
      </section>

      <section className="agenda section-soft" id="agenda">
        <div className="shell agenda-grid"><div><p className="eyebrow">Agenda</p><h2>Ontmoeten.<br />Delen. Groeien.</h2></div><div className="agenda-empty"><span className="icon-disc large"><Icon name="calendar" size={42} /></span><div><h3>Binnenkort nieuwe momenten</h3><p>Er staat nu geen nieuwe bijeenkomst gepubliceerd. Stuur ons een bericht, dan hoor je wanneer er weer een wandeling, open avond of Gedeelde Grond-groep start.</p><a className="text-link" href="mailto:info@losverbonden.nl?subject=Houd%20mij%20op%20de%20hoogte">Houd mij op de hoogte <span aria-hidden="true">→</span></a></div></div></div>
      </section>

      <section className="final-cta">
        <Image src="/images/hero-dunes.png" alt="Duinpad in warm ochtendlicht" fill unoptimized sizes="100vw" className="cover-image" />
        <div className="final-shade" />
        <div className="shell final-content"><p className="eyebrow light">Een eerste stap</p><h2>Je hoeft vandaag niet te weten<br />hoe je toekomst eruitziet.</h2><p>Je hoeft alleen te besluiten dat je er niet alleen voor wilt blijven staan.</p><ContactLink /></div>
      </section>

      <footer>
        <div className="shell footer-grid"><div className="footer-brand"><span className="brand-name">LOS VERBONDEN</span><p>Uit elkaar. Met aandacht voor wat blijft.</p></div><div><h3>Neem rustig contact op</h3><a href="tel:+31643574633"><Icon name="phone" size={22} />06 43 57 46 33</a><a href="mailto:info@losverbonden.nl"><Icon name="email" size={22} />info@losverbonden.nl</a><p><Icon name="location" size={22} />Tilburg en omgeving</p></div><div><h3>Vind je weg</h3>{navItems.slice(0, 4).map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div></div>
        <div className="shell footer-bottom"><p>© {new Date().getFullYear()} Los Verbonden</p><p>Bij acute psychische nood: neem contact op met je huisarts of bel 112.</p><a href="https://icons8.com" target="_blank" rel="noreferrer">Iconen door Icons8</a></div>
      </footer>

      <ContactLink className="mobile-sticky-cta" children="Plan een verkenning" />
    </main>
  );
}
