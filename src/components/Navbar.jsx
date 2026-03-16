import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ lang, setLang, t }) => {
  const [mobMenuOpen, setMobMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();

  const toggleMob = () => setMobMenuOpen(!mobMenuOpen);
  const closeMob = () => setMobMenuOpen(false);

  // Check if we are on the blog page or a specific blog post
  const isBlog = location.pathname.includes("/blog");

  return (
    <>
      {/* ══ TOP BAR ══ */}
      <div className="topbar">
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="topbar-dot"></span>
          {t.topbar.work_hours}
        </span>
        <a href="tel:+998712755555">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
          </svg>
          +998 71 275 55 55
        </a>
        <a href="https://t.me/orifjonovtg" target="_blank" rel="noreferrer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.014 9.49c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 14.28l-2.95-.924c-.64-.203-.654-.64.136-.949l11.52-4.44c.533-.194 1.001.13.596 1.282z" />
          </svg>
          @orifjonovtg
        </a>

        {/* Language Switcher */}
        <div className="lang-switcher">
          <button className={lang === "uz" ? "active" : ""} onClick={() => setLang("uz")}>
            UZ
          </button>
          <span>|</span>
          <button className={lang === "ru" ? "active" : ""} onClick={() => setLang("ru")}>
            RU
          </button>
        </div>
      </div>

      {/* ══ NAV ══ */}
      <nav>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            {!logoError ? (
              <img
                src="/logo.svg"
                alt="SEM Travel Logo"
                className="nav-logo-img"
                onError={() => setLogoError(true)}
              />
            ) : (
              <svg width="34" height="34" viewBox="0 0 36 36" className="nav-logo-img">
                <rect width="36" height="36" rx="8" fill="#0F2552"/>
                <text x="18" y="25" textAnchor="middle" fontFamily="Georgia,serif" fontSize="18" fontWeight="700" fill="#C9A84C">S</text>
              </svg>
            )}
            <span className="nav-logo-text">
              SEM<span>Travel</span>
            </span>
          </Link>
          <div className="nav-links">
            <a href="/#how">{t.nav.how_it_works}</a>
            <a href="/#dest">{t.nav.destinations}</a>
            <a href="/#team">{t.nav.team}</a>
            <Link to="/blog" className={isBlog ? "active" : ""}>{t.nav.blog}</Link>
          </div>
          <a href="/#contact" className="nav-cta">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
            </svg>
            {t.nav.cta}
          </a>
          <button id="burger" onClick={toggleMob}>
            <div></div>
            <div></div>
            <div></div>
          </button>
        </div>
        <div id="mob-menu" className={mobMenuOpen ? "open" : ""}>
          <Link to="/" onClick={closeMob}>{t.nav.home || "Главная"}</Link>
          <a href="/#dest" onClick={closeMob}>{t.nav.destinations}</a>
          <Link to="/blog" onClick={closeMob}>{t.nav.blog}</Link>
          <a href="/#contact" onClick={closeMob} className="nav-cta" style={{ justifyContent: "center", borderRadius: "8px", marginTop: "12px" }}>
            {t.nav.cta}
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
