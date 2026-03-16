import React, { useState } from "react";
import { Link } from "react-router-dom";

const TG_TOKEN = "7715605911:AAFVkGo_mRuRQ9hIn9z6kdu373SW2nxMtGA";
const TG_CHAT = "-1002361188017";

const sendToTelegram = (text) =>
  fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TG_CHAT, text, parse_mode: "HTML" }),
  }).catch(() => {});

const Home = ({ t }) => {
  const [heroSuccess, setHeroSuccess] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const [heroName, setHeroName] = useState("");
  const [heroPhone, setHeroPhone] = useState("");
  const [heroDest, setHeroDest] = useState("");

  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [selectedDest, setSelectedDest] = useState("");
  const [contactDate, setContactDate] = useState("");
  const [contactTourists, setContactTourists] = useState("2");

  const submitHero = (e) => {
    e.preventDefault();
    sendToTelegram(
      `🏖 <b>Yangi ariza — Bosh sahifa forma</b>\n\n👤 Ism: ${heroName || "—"}\n📞 Telefon: ${heroPhone}\n✈️ Yo'nalish: ${heroDest || "—"}`
    );
    setHeroSuccess(true);
  };

  const submitContact = (e) => {
    e.preventDefault();
    sendToTelegram(
      `📋 <b>Yangi ariza — Kontakt forma</b>\n\n👤 Ism: ${contactName || "—"}\n📞 Telefon: ${contactPhone}\n✈️ Yo'nalish: ${selectedDest || "—"}\n📅 Sana: ${contactDate || "—"}\n👥 Turistlar: ${contactTourists || "—"}`
    );
    setContactSuccess(true);
  };

  return (
    <>
      {/* ══ HERO ══ */}
      <section className="hero" id="hero">
        <div className="hero-img"></div>
        <div className="hero-gradient"></div>
        <div className="hero-inner">
          {/* Left: Headline */}
          <div>
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              {t.hero.badge}
            </div>
            <h1 className="hero-h1" dangerouslySetInnerHTML={{ __html: t.hero.h1 }}></h1>
            <p className="hero-p" dangerouslySetInnerHTML={{ __html: t.hero.p }}></p>
            <div className="hero-trust">
              <span className="trust-pill">
                <span className="trust-pill-check">✓</span> {t.hero.trust.price}
              </span>
              <span className="trust-pill">
                <span className="trust-pill-check">✓</span> {t.hero.trust.support}
              </span>
              <span className="trust-pill">
                <span className="trust-pill-check">✓</span> {t.hero.trust.airport}
              </span>
              <span className="trust-pill">
                <span className="trust-pill-check">✓</span> {t.hero.trust.visa}
              </span>
            </div>
            <div className="hero-nums">
              <div>
                <div className="hero-num-val">15+</div>
                <div className="hero-num-label">{t.hero.nums.exp}</div>
              </div>
              <div>
                <div className="hero-num-val">5000+</div>
                <div className="hero-num-label">{t.hero.nums.clients}</div>
              </div>
              <div>
                <div className="hero-num-val">50+</div>
                <div className="hero-num-label">{t.hero.nums.dest}</div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="hero-form-card">
            {!heroSuccess ? (
              <div id="hero-form-wrap">
                <div className="hero-form-title">{t.hero.form.title}</div>
                <div className="hero-form-sub">{t.hero.form.sub}</div>
                <form onSubmit={submitHero}>
                  <div className="fld">
                    <label>{t.hero.form.name}</label>
                    <input type="text" placeholder="Alisher" value={heroName} onChange={e => setHeroName(e.target.value)} required />
                  </div>
                  <div className="fld">
                    <label>{t.hero.form.phone}</label>
                    <input type="tel" placeholder="+998 90 000 00 00" value={heroPhone} onChange={e => setHeroPhone(e.target.value)} required />
                  </div>
                  <div className="fld">
                    <label>{t.hero.form.dest_label}</label>
                    <select value={heroDest} onChange={e => setHeroDest(e.target.value)}>
                      <option value="">{t.hero.form.dest_placeholder}</option>
                      <option>{t.hero.form.dest_options.tr}</option>
                      <option>{t.hero.form.dest_options.ae}</option>
                      <option>{t.hero.form.dest_options.eu}</option>
                      <option>{t.hero.form.dest_options.other}</option>
                    </select>
                  </div>
                  <button type="submit" className="btn-submit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                    </svg>
                    {t.hero.form.btn_submit}
                  </button>
                  <a href="https://t.me/orifjonovtg" target="_blank" rel="noreferrer" className="btn-tg">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.014 9.49c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 14.28l-2.95-.924c-.64-.203-.654-.64.136-.949l11.52-4.44c.533-.194 1.001.13.596 1.282z" />
                    </svg>
                    {t.hero.form.btn_tg}
                  </a>
                  <p className="form-note">{t.hero.form.note}</p>
                </form>
              </div>
            ) : (
              <div className="form-success" id="hero-success" style={{ display: "block" }}>
                <div className="form-success-icon">🎉</div>
                <h3>{t.hero.form.success_title}</h3>
                <p>{t.hero.form.success_text}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ SOCIAL PROOF BAR ══ */}
      <div className="proof-bar">
        <div className="proof-item">
          <span className="proof-icon">🏆</span>
          <div>
            <div className="proof-val">15+</div>
            <div className="proof-label">{t.proof.exp}</div>
          </div>
        </div>
        <div className="proof-item">
          <span className="proof-icon">😊</span>
          <div>
            <div className="proof-val">5000+</div>
            <div className="proof-label">{t.proof.clients}</div>
          </div>
        </div>
        <div className="proof-item">
          <span className="proof-icon">🌍</span>
          <div>
            <div className="proof-val">50+</div>
            <div className="proof-label">{t.proof.dest}</div>
          </div>
        </div>
        <div className="proof-item">
          <span className="proof-icon">⭐</span>
          <div>
            <div className="proof-val">5.0</div>
            <div className="proof-label">{t.proof.rating}</div>
          </div>
        </div>
      </div>

      {/* ══ HOW IT WORKS ══ */}
      <section className="how" id="how">
        <div className="sec-inner">
          <div style={{ maxWidth: "640px" }}>
            <div className="sec-tag">{t.how.tag}</div>
            <h2 className="sec-h2" dangerouslySetInnerHTML={{ __html: t.how.h2 }}></h2>
            <p className="sec-sub">{t.how.sub}</p>
          </div>
          <div className="steps">
            {t.how.steps.map((step, idx) => (
              <div className="step" key={idx}>
                <div className="step-num">{idx + 1}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DESTINATIONS ══ */}
      <section className="dest" id="dest">
        <div className="sec-inner">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "48px" }}>
            <div>
              <div className="sec-tag">{t.dest.tag}</div>
              <h2 className="sec-h2" dangerouslySetInnerHTML={{ __html: t.dest.h2 }}></h2>
            </div>
            <a href="#contact" style={{ fontSize: "14px", fontWeight: "600", color: "var(--gold)", display: "flex", alignItems: "center", gap: "6px" }}>
              {t.dest.view_all}
            </a>
          </div>
          <div className="dest-grid">
            {t.dest.cards.map((card, idx) => (
              <div className="dest-card" key={idx} onClick={() => setSelectedDest(card.name)}>
                <div className="dest-img-wrap">
                  <div className="dest-img" style={{ backgroundImage: `url('${card.img}')` }}></div>
                </div>
                <div className="dest-body">
                  <div className="dest-flag">{card.flag}</div>
                  <div className="dest-name">{card.name}</div>
                  <div className="dest-sub">{card.sub}</div>
                  <div className="dest-row">
                    <div className="dest-price">{t.dest.price_from} {card.price} <span>{t.dest.price_per}</span></div>
                    <div className="dest-badge">{card.badge}</div>
                  </div>
                  <a href="#contact" className="dest-cta">{card.cta}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section className="services" id="services">
        <div className="sec-inner">
          <div style={{ maxWidth: "560px", marginBottom: "52px" }}>
            <div className="sec-tag">{t.services.tag}</div>
            <h2 className="sec-h2" dangerouslySetInnerHTML={{ __html: t.services.h2 }}></h2>
          </div>
          <div className="svc-grid">
            {t.services.cards.map((card, idx) => (
              <div className="svc-card" key={idx}>
                <div className="svc-icon">{card.icon}</div>
                <div className="svc-title">{card.title}</div>
                <div className="svc-desc">{card.desc}</div>
                <div className="svc-tags">
                  {card.tags.map((tag, i) => (
                    <span className="svc-tag" key={i}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TEAM ══ */}
      <section className="team" id="team">
        <div className="sec-inner">
          <div style={{ maxWidth: "560px", marginBottom: "52px" }}>
            <div className="sec-tag">{t.team.tag}</div>
            <h2 className="sec-h2">{t.team.h2}</h2>
            <p style={{ fontSize: "16px", color: "var(--muted)", lineHeight: "1.7", marginTop: "12px" }}>
              {t.team.sub}
            </p>
          </div>
          <div className="team-grid">
            {t.team.cards.map((card, idx) => (
              <div className="team-card" key={idx}>
                <div className="team-banner" style={{ background: card.color }}>
                  <div className="team-ava" style={{ background: card.color }}>{card.ava}</div>
                </div>
                <div className="team-body">
                  <div className="team-exp">{card.exp}</div>
                  <div className="team-name">{card.name}</div>
                  <div className="team-role">{card.role}</div>
                  <div className="team-desc">{card.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="reviews" id="reviews">
        <div className="sec-inner">
          <div style={{ maxWidth: "560px", marginBottom: "52px" }}>
            <div className="sec-tag">{t.reviews.tag}</div>
            <h2 className="sec-h2" dangerouslySetInnerHTML={{ __html: t.reviews.h2 }}></h2>
          </div>
          <div className="rev-grid">
            {t.reviews.cards.map((card, idx) => (
              <div className="rev-card" key={idx}>
                <div className="rev-quote">"</div>
                <div className="rev-stars">★★★★★</div>
                <div className="rev-text">{card.text}</div>
                <div className="rev-divider"></div>
                <div className="rev-author">
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div className="rev-ava">{card.ava}</div>
                    <div>
                      <div className="rev-name">{card.name}</div>
                      <div className="rev-city">{card.city}</div>
                    </div>
                  </div>
                  <div className="rev-tour">{card.tour}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="rev-total">
            <div className="rev-total-big">5.0</div>
            <div className="rev-total-stars">★★★★★</div>
            <div className="rev-divider-v"></div>
            <div className="rev-total-label">{t.reviews.total_label}</div>
          </div>
        </div>
      </section>

      {/* ══ BLOG PREVIEW ══ */}
      <section style={{ padding: "88px 24px", background: "var(--gray)" }} id="blog">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "48px" }}>
            <div>
              <div style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--gold)", display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                <span style={{ display: "block", width: "28px", height: "2px", background: "var(--gold)" }}></span>
                {t.blog.tag}
              </div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: "700", color: "var(--blue)", lineHeight: "1.15" }} dangerouslySetInnerHTML={{ __html: t.blog.h2 }}></h2>
            </div>
            <Link to="/blog" style={{ fontSize: "14px", fontWeight: "700", color: "var(--gold)", display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>
              {t.blog.view_all}
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "24px" }}>
            {t.blog.cards.map((card, idx) => (
              <Link to="/blog/1" key={idx} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(15,37,82,.09)", transition: "transform .3s", display: "block", textDecoration: "none", color: "inherit" }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-6px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ height: "200px", background: `url('${card.img}') center/cover no-repeat`, position: "relative" }}>
                  <span style={{ position: "absolute", bottom: "14px", left: "14px", background: "var(--gold)", color: "#fff", fontSize: "11px", fontWeight: "700", letterSpacing: ".06em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "5px" }}>
                    {card.badge}
                  </span>
                </div>
                <div style={{ padding: "22px" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "17px", fontWeight: "700", color: "var(--blue)", marginBottom: "8px", lineHeight: "1.35" }}>
                    {card.title}
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--muted)", lineHeight: "1.7", marginBottom: "14px" }}>
                    {card.desc}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid var(--border)", fontSize: "12px", color: "var(--muted)" }}>
                    <span>{card.date}</span>
                    <span style={{ fontWeight: "700", color: "var(--gold)" }}>{card.read}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--blue)", color: "#fff", padding: "14px 32px", borderRadius: "8px", fontSize: "15px", fontWeight: "700", transition: "background .2s" }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--blue-mid)'} onMouseOut={(e) => e.currentTarget.style.background = 'var(--blue)'}>
              {t.blog.btn_all}
            </Link>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section className="contact" id="contact">
        <div className="sec-inner">
          <div className="contact-grid">
            {/* Left */}
            <div>
              <div className="sec-tag">{t.contact.tag}</div>
              <h2 className="sec-h2" dangerouslySetInnerHTML={{ __html: t.contact.h2 }}></h2>
              <div className="contact-why">
                {t.contact.why.map((item, idx) => (
                  <div className="why-item" key={idx}>
                    <span className="why-emoji">{item.icon}</span>
                    <span className="why-text">
                      <strong>{item.bold}</strong>{item.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="contact-info">
                <div className="contact-info-title">{t.contact.info.title}</div>
                <p>{t.contact.info.addr}</p>
                <a href="tel:+998712755555">{t.contact.info.phone}</a>
                <a href="https://t.me/orifjonovtg" target="_blank" rel="noreferrer">{t.contact.info.tg}</a>
              </div>
              {/* Yandex Map */}
              <div style={{ marginTop: "24px", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border)" }}>
                <iframe
                  src="https://yandex.uz/map-widget/v1/?ll=69.253239%2C41.348033&z=16&pt=69.253239,41.348033,pm2rdm&l=map"
                  width="100%"
                  height="220"
                  frameBorder="0"
                  style={{ display: "block" }}
                  title="SEM Travel ofis joylashuvi"
                  loading="lazy"
                  allowFullScreen
                />
                <div style={{ padding: "10px 14px", background: "var(--gray)", fontSize: "12px", color: "var(--muted)", display: "flex", gap: "16px" }}>
                  <a href="https://yandex.uz/maps/-/CPBlrKl7" target="_blank" rel="noreferrer" style={{ color: "var(--gold)", fontWeight: "600" }}>📍 Glavniy ofis →</a>
                  <a href="https://yandex.uz/maps/-/CPBlrKl7" target="_blank" rel="noreferrer" style={{ color: "var(--gold)", fontWeight: "600" }}>📍 Olmazor filiali →</a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-card">
              {!contactSuccess ? (
                <div id="contact-form-wrap">
                  <div className="contact-form-tag">{t.contact.form.tag}</div>
                  <div className="contact-form-h">{t.contact.form.h}</div>
                  <div className="contact-form-sub">{t.contact.form.sub}</div>
                  <form onSubmit={submitContact}>
                    <div className="fld">
                      <label>{t.contact.form.name}</label>
                      <input type="text" placeholder="Alisher" value={contactName} onChange={e => setContactName(e.target.value)} required />
                    </div>
                    <div className="fld">
                      <label>{t.contact.form.phone}</label>
                      <input type="tel" id="contact-phone" placeholder="+998 90 000 00 00" value={contactPhone} onChange={e => setContactPhone(e.target.value)} required />
                    </div>
                    <div className="fld">
                      <label>{t.contact.form.dest_label}</label>
                      <select id="contact-dest" value={selectedDest} onChange={(e) => setSelectedDest(e.target.value)}>
                        <option value="">{t.contact.form.dest_options.placeholder}</option>
                        <option value="Турция">{t.contact.form.dest_options.tr}</option>
                        <option value="ОАЭ (Дубай)">{t.contact.form.dest_options.ae}</option>
                        <option value="Европа">{t.contact.form.dest_options.eu}</option>
                        <option value="Другое">{t.contact.form.dest_options.other}</option>
                      </select>
                    </div>
                    <div className="form-row2">
                      <div className="fld">
                        <label>{t.contact.form.date}</label>
                        <input type="date" value={contactDate} onChange={e => setContactDate(e.target.value)} />
                      </div>
                      <div className="fld">
                        <label>{t.contact.form.tourists.label}</label>
                        <select value={contactTourists} onChange={e => setContactTourists(e.target.value)}>
                          <option value={t.contact.form.tourists.o1}>{t.contact.form.tourists.o1}</option>
                          <option value={t.contact.form.tourists.o2}>{t.contact.form.tourists.o2}</option>
                          <option value={t.contact.form.tourists.o3}>{t.contact.form.tourists.o3}</option>
                          <option value={t.contact.form.tourists.o4}>{t.contact.form.tourists.o4}</option>
                          <option value={t.contact.form.tourists.o5}>{t.contact.form.tourists.o5}</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="btn-submit">{t.contact.form.btn}</button>
                    <a href="https://t.me/orifjonovtg" target="_blank" rel="noreferrer" className="btn-tg">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.014 9.49c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 14.28l-2.95-.924c-.64-.203-.654-.64.136-.949l11.52-4.44c.533-.194 1.001.13.596 1.282z" />
                      </svg>
                      {t.hero.form.btn_tg}
                    </a>
                    <p className="form-note">{t.contact.form.note}</p>
                  </form>
                </div>
              ) : (
                <div className="form-success" id="contact-success" style={{ display: "block" }}>
                  <div className="form-success-icon">✅</div>
                  <h3>{t.contact.form.success_title}</h3>
                  <p>{t.contact.form.success_text}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
