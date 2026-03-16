import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = ({ t }) => {
  const [logoError, setLogoError] = useState(false);

  return (
    <>
      {/* ══ FOOTER ══ */}
      <footer>
        <div className="foot-inner">
          <div className="foot-top">
            <div>
              <div className="foot-logo">
                {!logoError ? (
                  <img
                    src="/logo.svg"
                    alt="SEM Travel Logo"
                    style={{ height: "32px", width: "auto", marginBottom: "12px" }}
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <svg width="32" height="32" viewBox="0 0 36 36">
                    <rect width="36" height="36" rx="8" fill="#0F2552"/>
                    <text x="18" y="25" textAnchor="middle" fontFamily="Georgia,serif" fontSize="18" fontWeight="700" fill="#C9A84C">S</text>
                  </svg>
                )}
                <span>Travel</span>
              </div>
              <p className="foot-desc">{t.footer.desc}</p>
            </div>
            <div>
              <div className="foot-h">{t.nav.blog || "Блог"}</div>
              <div className="foot-links">
                <Link to="/blog">{t.blog.btn_all || "Все статьи"}</Link>
                <Link to="/blog">{t.blog.cards[0].badge}</Link>
                <Link to="/blog">{t.blog.cards[1].badge}</Link>
                <Link to="/blog">{t.blog.cards[2].badge}</Link>
              </div>
            </div>
            <div>
              <div className="foot-h">{t.footer.h_services}</div>
              <div className="foot-links">
                <a href="/#services">{t.nav.destinations}</a>
                <a href="/#services">{t.services.cards[1].title}</a>
                <a href="/#services">{t.services.cards[2].title}</a>
              </div>
            </div>
            <div>
              <div className="foot-h">{t.footer.h_contact}</div>
              <div className="foot-links">
                <a>{t.contact.info.addr}</a>
                <a href="tel:+998712755555">{t.contact.info.phone}</a>
                <a href="https://t.me/orifjonovtg" target="_blank" rel="noreferrer">{t.contact.info.tg}</a>
              </div>
            </div>
          </div>
          <div className="foot-bottom">
            <span className="foot-copy">{t.footer.copy}</span>
            <span style={{ color: "var(--gold)", letterSpacing: "3px" }}>★★★★★</span>
          </div>
        </div>
      </footer>

      {/* ══ FLOATING TELEGRAM ══ */}
      <a href="https://t.me/orifjonovtg" target="_blank" rel="noreferrer" className="float-tg" title={t.float.tg_title}>
        <svg viewBox="0 0 24 24" fill="white">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.014 9.49c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 14.28l-2.95-.924c-.64-.203-.654-.64.136-.949l11.52-4.44c.533-.194 1.001.13.596 1.282z" />
        </svg>
      </a>

      {/* ══ MOBILE STICKY CTA ══ */}
      <div className="mob-cta">
        <a href="tel:+998712755555" className="mob-cta-sec">📞 {t.float.call}</a>
        <a href="https://t.me/orifjonovtg" target="_blank" rel="noreferrer" className="mob-cta-main">
          {t.float.tg_btn}
        </a>
      </div>
    </>
  );
};

export default Footer;
