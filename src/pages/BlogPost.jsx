import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BlogPost = ({ t }) => {
  const { id } = useParams();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mock post fetching based on id.
  // In a real app we would use id to find the exact post, here we use generic data.
  const post = t.blog.post;

  useEffect(() => {
    // Scroll progress bar
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    // Copy link functionality
    const copyBtn = document.getElementById("copy-link");
    if (copyBtn) {
      const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = "✓ Nusxa olindi!";
          setTimeout(() => {
            copyBtn.innerHTML = originalText;
          }, 2000);
        });
      };
      copyBtn.addEventListener("click", handleCopy);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        copyBtn.removeEventListener("click", handleCopy);
      };
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="progress-bar" id="progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      <div style={{ background: "var(--gray)", paddingBottom: "60px", paddingTop: "50px" }}>
        <div className="article-container">
          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            <Link to="/">{t.nav.home || "Bosh sahifa"}</Link>
            <span className="breadcrumbs-sep">/</span>
            <Link to="/blog">{t.nav.blog || "Blog"}</Link>
            <span className="breadcrumbs-sep">/</span>
            <span className="breadcrumbs-current">{post.cat}</span>
          </div>

          <div className="article-layout">
            {/* MAIN ARTICLE */}
            <article className="article-main">
              <div className="article-header">
                <div className="article-cat">{post.cat}</div>
                <h1 className="article-title">{post.h1}</h1>
                <div className="article-meta">
                  <span>📅 {post.date}</span>
                  <span className="article-meta-dot"></span>
                  <span>⏱ {post.read_time}</span>
                  <span className="article-meta-dot"></span>
                  <span>👁 {post.views}</span>
                </div>
              </div>

              <div className="article-hero-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1200&q=80')" }}></div>

              <div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>

              <div className="article-tags">
                {post.tags.map((tag, idx) => (
                  <span className="article-tag" key={idx}>#{tag}</span>
                ))}
              </div>

              <div className="author-card">
                <div className="author-ava" style={{ backgroundColor: "var(--blue)" }}>EL</div>
                <div className="author-info">
                  <div className="author-name">Elyorbek</div>
                  <div className="author-role">SEM Travel asoschisi</div>
                  <div className="author-bio">15 yildan beri turizm sohasida. Minglab uzbekistonliklarga xavfsiz va maroqli sayohat qilishda yordam berib kelmoqda.</div>
                </div>
              </div>

              <div className="article-share">
                <div className="share-title">{post.share}:</div>
                <div className="share-buttons">
                  <a href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.h1)}`} target="_blank" rel="noreferrer" className="share-btn share-tg">
                    Telegram
                  </a>
                  <button className="share-btn share-copy" id="copy-link">Nusxa olish</button>
                </div>
              </div>
            </article>

            {/* SIDEBAR */}
            <aside className="article-sidebar">
              <div className="sidebar-sticky">
                <div className="toc">
                  <div className="toc-title">{post.toc}</div>
                  <ol className="toc-list">
                    <li><a href="#docs" className="active">Muhim hujjatlar</a></li>
                    <li><a href="#price">Narx haqida</a></li>
                    <li><a href="#airport">Aeroport tartiblari</a></li>
                  </ol>
                </div>

                <div className="article-cta">
                  <div className="article-cta-icon">✈️</div>
                  <div className="article-cta-title" dangerouslySetInnerHTML={{ __html: t.blog.page.sidebar_cta_h }}></div>
                  <p className="article-cta-desc">{t.blog.page.sidebar_cta_sub}</p>
                  <a href="/#contact" className="article-cta-btn">{t.contact.form.btn}</a>
                  <a href="https://t.me/semtravel" target="_blank" rel="noreferrer" className="article-cta-btn2">
                    Telegram
                  </a>
                </div>
              </div>
            </aside>
          </div>

          {/* RELATED POSTS */}
          <div className="related-posts">
            <h3 className="related-title">{post.related}</h3>
            <div className="related-grid">
              <Link to="/blog/2" className="related-card">
                <div className="related-img" style={{ backgroundImage: `url('${t.blog.cards[1].img}')` }}></div>
                <div className="related-body">
                  <div className="related-cat">{t.blog.cards[1].badge}</div>
                  <div className="related-h">{t.blog.cards[1].title}</div>
                </div>
              </Link>
              <Link to="/blog/3" className="related-card">
                <div className="related-img" style={{ backgroundImage: `url('${t.blog.cards[2].img}')` }}></div>
                <div className="related-body">
                  <div className="related-cat">{t.blog.cards[2].badge}</div>
                  <div className="related-h">{t.blog.cards[2].title}</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
