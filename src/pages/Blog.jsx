import React, { useState } from "react";
import { Link } from "react-router-dom";

const Blog = ({ t }) => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredCards = t.blog.cards.filter((card) => {
    const term = search.trim();
    if (term) {
      return (
        card.title.toLowerCase().includes(term) ||
        card.desc.toLowerCase().includes(term)
      );
    }
    return true;
  }).filter((card) => {
    // Basic mock filter logic based on badge mapping, adjust as needed
    if (filter === "all") return true;
    if (filter === "tips" && card.badge === t.blog.page.filter.tips) return true;
    if (filter === "visa" && card.badge === t.blog.page.filter.visa) return true;
    if (filter === "turkey" && card.badge === t.blog.page.filter.tr) return true;
    if (filter === "uae" && card.badge === t.blog.page.filter.ae) return true;
    if (filter === "europe" && card.badge === t.blog.page.filter.eu) return true;
    return false;
  });

  return (
    <>
      {/* ══ BLOG HERO ══ */}
      <div className="blog-hero">
        <div className="blog-hero-inner">
          <div className="blog-hero-tag">{t.blog.page.hero_tag}</div>
          <h1 className="blog-hero-h1" dangerouslySetInnerHTML={{ __html: t.blog.page.hero_h1 }}></h1>
          <p className="blog-hero-sub">{t.blog.page.hero_sub}</p>
        </div>
      </div>

      {/* ══ FILTER BAR ══ */}
      <div className="blog-filter">
        <div className="blog-filter-inner">
          <div className="filter-tabs" id="filter-tabs">
            <button className={`tab ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>{t.blog.page.filter.all}</button>
            <button className={`tab ${filter === "visa" ? "active" : ""}`} onClick={() => setFilter("visa")}>{t.blog.page.filter.visa}</button>
            <button className={`tab ${filter === "turkey" ? "active" : ""}`} onClick={() => setFilter("turkey")}>{t.blog.page.filter.tr}</button>
            <button className={`tab ${filter === "uae" ? "active" : ""}`} onClick={() => setFilter("uae")}>{t.blog.page.filter.ae}</button>
            <button className={`tab ${filter === "europe" ? "active" : ""}`} onClick={() => setFilter("europe")}>{t.blog.page.filter.eu}</button>
            <button className={`tab ${filter === "tips" ? "active" : ""}`} onClick={() => setFilter("tips")}>{t.blog.page.filter.tips}</button>
          </div>
          <div className="search-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input type="text" placeholder={t.blog.page.filter.search} onChange={handleSearch} value={search} />
          </div>
        </div>
      </div>

      {/* ══ MAIN CONTENT ══ */}
      <div className="blog-main">
        <div className="blog-inner">
          <div className="blog-layout">
            {/* Posts column */}
            <div>
              {filter === "all" && search === "" && (
                <>
                  <div className="featured-label">{t.blog.post.h1 ? "⭐ " + t.blog.post.h1.split(":")[0] : "⭐"}</div>
                  {/* FEATURED POST */}
                  <Link to="/blog/1" className="post-featured" id="featured-post">
                    <div className="post-featured-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80')" }}>
                      <div className="post-featured-badge">⭐ {t.blog.post.cat}</div>
                    </div>
                    <div className="post-featured-body">
                      <div className="post-cat">{t.blog.post.cat}</div>
                      <h2 className="post-h2">{t.blog.post.h1}</h2>
                      <p className="post-excerpt">{t.blog.cards[0].desc}</p>
                      <div className="post-meta">
                        <span>{t.blog.post.date}</span>
                        <span className="post-meta-dot"></span>
                        <span>{t.blog.post.read_time}</span>
                        <span className="post-meta-dot"></span>
                        <span>👁 {t.blog.post.views}</span>
                      </div>
                      <div className="post-read-btn">{t.blog.cards[0].read}</div>
                    </div>
                  </Link>
                </>
              )}

              {/* POSTS GRID */}
              <div className="featured-label" style={{ marginBottom: "24px" }}>{t.blog.page.filter.all}</div>
              <div className="posts-grid" id="posts-grid">
                {filteredCards.length > 0 ? (
                  filteredCards.map((card, idx) => (
                    <Link to={`/blog/${idx + 1}`} className="post-card" key={idx}>
                      <div className="post-card-img" style={{ position: "relative" }}>
                        <div className="post-card-img-inner" style={{ background: `url('${card.img}') center/cover no-repeat`, height: "100%" }}></div>
                        <div className="post-card-cat">{card.badge}</div>
                      </div>
                      <div className="post-card-body">
                        <div className="post-card-h">{card.title}</div>
                        <div className="post-card-excerpt">{card.desc}</div>
                        <div className="post-card-footer">
                          <span className="post-card-date">{card.date}</span>
                          <span className="post-card-read">{card.read}</span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div style={{ padding: "40px", textAlign: "center", color: "var(--muted)", gridColumn: "1/-1" }}>
                    Hech narsa topilmadi / Ничего не найдено
                  </div>
                )}
              </div>

              {/* Pagination Mock */}
              <div className="pagination">
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn dots">...</button>
              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="sidebar">
              <div className="sidebar-card">
                <div className="sidebar-h">{t.blog.page.sidebar_cats}</div>
                <div className="sidebar-cats">
                  <div className={`sidebar-cat ${filter === "visa" ? "active" : ""}`} onClick={() => setFilter("visa")}><span>📋 {t.blog.page.filter.visa}</span><span className="sidebar-cat-num">12</span></div>
                  <div className={`sidebar-cat ${filter === "turkey" ? "active" : ""}`} onClick={() => setFilter("turkey")}><span>🇹🇷 {t.blog.page.filter.tr}</span><span className="sidebar-cat-num">8</span></div>
                  <div className={`sidebar-cat ${filter === "uae" ? "active" : ""}`} onClick={() => setFilter("uae")}><span>🇦🇪 {t.blog.page.filter.ae}</span><span className="sidebar-cat-num">6</span></div>
                  <div className={`sidebar-cat ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}><span>🌍 {t.blog.page.filter.all}</span><span className="sidebar-cat-num">50</span></div>
                </div>
              </div>

              <div className="sidebar-card">
                <div className="sidebar-h">{t.blog.page.sidebar_popular}</div>
                <div className="popular-list">
                  <Link to="/blog/2" className="popular-item">
                    <div className="popular-thumb" style={{ backgroundImage: `url('${t.blog.cards[1].img}')` }}></div>
                    <div>
                      <div className="popular-title">{t.blog.cards[1].title}</div>
                      <div className="popular-date">{t.blog.cards[1].date} · 👁 3200</div>
                    </div>
                  </Link>
                  <Link to="/blog/3" className="popular-item">
                    <div className="popular-thumb" style={{ backgroundImage: `url('${t.blog.cards[2].img}')` }}></div>
                    <div>
                      <div className="popular-title">{t.blog.cards[2].title}</div>
                      <div className="popular-date">{t.blog.cards[2].date} · 👁 2100</div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="sidebar-cta">
                <div className="sidebar-cta-emoji">✈️</div>
                <div className="sidebar-cta-title">{t.blog.page.sidebar_cta_h}</div>
                <div className="sidebar-cta-sub">{t.blog.page.sidebar_cta_sub}</div>
                <a href="/#contact" className="sidebar-cta-btn">{t.contact.form.btn}</a>
                <a href="https://t.me/semtravel" target="_blank" rel="noreferrer" className="sidebar-cta-btn2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ display: "inline", verticalAlign: "-2px", marginRight: "4px" }}>
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.014 9.49c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 14.28l-2.95-.924c-.64-.203-.654-.64.136-.949l11.52-4.44c.533-.194 1.001.13.596 1.282z" />
                  </svg>
                  {t.hero.form.btn_tg}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
