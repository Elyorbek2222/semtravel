import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AiChat from "./components/AiChat";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { translations } from "./translations";
import "./index.css";

function App() {
  const [lang, setLang] = useState("ru"); // Default to Russian as per user original view
  const t = translations[lang];

  return (
    <Router>
      <div className="App">
        <Navbar lang={lang} setLang={setLang} t={t} />

        {/* ══ ROUTES ══ */}
        <Routes>
          <Route path="/" element={<Home t={t} />} />
          <Route path="/blog" element={<Blog t={t} />} />
          <Route path="/blog/:id" element={<BlogPost t={t} />} />
        </Routes>

        <Footer t={t} />
        <AiChat lang={lang} />
      </div>
    </Router>
  );
}

export default App;
