import React, { useEffect, useRef } from "react";
import { Link } from "react-scroll";
import { useLanguage } from "../context/LanguageContext";
import { siteConfig } from "../data/content";
import avatar from "../assets/avatar.jpeg";
import "./Hero.css";

const Hero = () => {
  const { t } = useLanguage();
  const h = t.hero;
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas.getContext("2d");
    let w, hgt, points, raf;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      w = canvas.width = wrap.offsetWidth;
      hgt = canvas.height = wrap.offsetHeight;
      points = [];
      const cols = Math.max(4, Math.floor(w / 90));
      const rows = Math.max(3, Math.floor(hgt / 90));
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          points.push({
            x: (i + 0.5) * (w / cols) + (Math.random() - 0.5) * 30,
            y: (j + 0.5) * (hgt / rows) + (Math.random() - 0.5) * 30,
          });
        }
      }
    };

    const onMouseMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, hgt);
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        const near = d < 160;
        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? 2.6 : 1.4, 0, Math.PI * 2);
        ctx.fillStyle = near ? "rgba(255,184,77,0.9)" : "rgba(139,150,165,0.22)";
        ctx.fill();
        if (near) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255,184,77,${(1 - d / 160) * 0.35})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    wrap.addEventListener("mousemove", onMouseMove);
    wrap.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      wrap.removeEventListener("mousemove", onMouseMove);
      wrap.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <section id="hero" className="heroSection" ref={wrapRef}>
      <canvas ref={canvasRef} className="heroCanvas"></canvas>

      <div className="container heroInner">
        <div className="heroText">
          <div className="eyebrow">
            <span className="dot liveDot"></span>
            {h.eyebrow}
          </div>
          <h1 className="display heroHeadline">
            {h.headline1}
            <br />
            {h.headline2} <span className="accentText">{h.headline2Accent}</span>{" "}
            {h.headline3}
          </h1>
          <p className="heroSub">{h.sub}</p>
          <div className="heroRow">
            <Link
              to="skills"
              spy={true}
              smooth={true}
              offset={-90}
              duration={500}
              className="btn primary"
            >
              {h.ctaPrimary}
            </Link>
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn ghost"
            >
              {h.ctaSecondary}
            </a>
          </div>
          <div className="heroStack">
            {h.stack.map((item) => (
              <div key={item} className="chip mono">
                <span className="chipDot"></span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="heroAvatarWrap">
          <img src={avatar} alt="Saurabh Kumar" className="heroAvatar" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
