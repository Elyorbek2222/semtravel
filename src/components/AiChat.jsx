import React, { useState, useRef, useEffect } from "react";

const API_KEY = import.meta.env.VITE_AI_KEY;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

const SYSTEM_PROMPT = `Siz SEM Travel agentligining menejeri sifatida suhbat qurasiz. Qisqa, oddiy va do'stona gaplashing — xuddi WhatsApp da yozayotgandek.

Ma'lumotlar:
- Tel: +998 71 275 55 55 | Telegram: @orifjonovtg | Ish: 09:00–19:00
- Turkiya: $850 dan (All Inclusive) | Dubay: $1200 dan | Yevropa: $1500 dan
- Narx so'mda qat'iy, viza yordam, transfer, 24/7 qo'llab-quvvatlash

QOIDALAR (MAJBURIY):
1. Maksimal 2-3 qisqa gap. Hech qachon uzun ro'yxat yoki paragraf yozma.
2. Foydalanuvchi tili (o'zbek/rus) da javob ber — o'zingdan almashtirma.
3. Aniq savol bo'lmasa — 1 ta aniqlovchi savol ber (masalan: "Qachon ketmoqchisiz?" yoki "Necha kishi?").
4. Narx so'rasa — taxminiy narx ayt, aniqroq bilish uchun raqam so'ra.
5. Hech qachon ro'yxat (bullet, numbered) ishlatma — oddiy gap bilan yoz.
6. Suhbat oxirida: telefon yoki @orifjonovtg ga taklif qil.`;

const WELCOME = {
  ru: "Здравствуйте! 👋 Я AI-консультант SEM Travel. Помогу подобрать тур в Турцию, ОАЭ или Европу. Задайте любой вопрос!",
  uz: "Assalomu alaykum! 👋 Men SEM Travel AI konsultantiman. Turkiya, BAA yoki Yevropaga tur tanlashda yordam beraman. Savolingizni yozing!",
};

export default function AiChat({ lang }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && !initialized) {
      setMessages([{ role: "assistant", text: WELCOME[lang] || WELCOME.ru }]);
      setInitialized(true);
    }
  }, [open, initialized, lang]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    const userMsg = { role: "user", text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setLoading(true);

    try {
      const history = updated.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.text,
      }));

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://semtravel.uz",
          "X-Title": "SEM Travel",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-haiku",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
          max_tokens: 150,
          temperature: 0.8,
        }),
      });

      const data = await res.json();
      const reply =
        data?.choices?.[0]?.message?.content ||
        (lang === "uz"
          ? "Kechirasiz, xatolik yuz berdi. Iltimos, @orifjonovtg ga yozing."
          : "Извините, произошла ошибка. Напишите нам в @orifjonovtg");

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            lang === "uz"
              ? "Ulanishda xatolik. Iltimos, @orifjonovtg ga yozing."
              : "Ошибка соединения. Напишите нам @orifjonovtg",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Chat Panel */}
      {open && (
        <div className="ai-panel">
          <div className="ai-header">
            <div className="ai-header-info">
              <div className="ai-avatar">🤖</div>
              <div>
                <div className="ai-header-title">SEM Travel AI</div>
                <div className="ai-header-sub">
                  {lang === "uz" ? "Online konsultant" : "Онлайн консультант"}
                </div>
              </div>
            </div>
            <button className="ai-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="ai-messages">
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg ai-msg--${m.role}`}>
                {m.role === "assistant" && <span className="ai-msg-ava">🤖</span>}
                <div className="ai-msg-bubble">{m.text}</div>
              </div>
            ))}
            {loading && (
              <div className="ai-msg ai-msg--assistant">
                <span className="ai-msg-ava">🤖</span>
                <div className="ai-msg-bubble ai-typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="ai-footer">
            <div className="ai-input-wrap">
              <input
                ref={inputRef}
                className="ai-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder={
                  lang === "uz" ? "Savolingizni yozing..." : "Задайте вопрос..."
                }
                maxLength={500}
              />
              <button
                className="ai-send"
                onClick={send}
                disabled={!input.trim() || loading}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
            <div className="ai-footer-note">
              {lang === "uz"
                ? "AI javob beradi · Aniq narx uchun menejer bilan bog'laning"
                : "AI отвечает · Для точной цены свяжитесь с менеджером"}
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        className="ai-fab"
        onClick={() => setOpen((v) => !v)}
        title={lang === "uz" ? "AI Konsultant" : "AI Консультант"}
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        )}
        {!open && <span className="ai-fab-label">AI</span>}
      </button>
    </>
  );
}
