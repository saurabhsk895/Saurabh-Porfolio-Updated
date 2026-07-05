import React from "react";
import { useLanguage } from "../context/LanguageContext";
import "./About.css";

const About = () => {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="eyebrow">
          <span className="dot"></span>
          {a.eyebrow}
        </div>
        <div className="aboutGrid">
          <div>
            <h2 className="display section-title">{a.title}</h2>
            <p className="aboutBody">{a.body}</p>
          </div>
          <div className="statsCard">
            {a.stats.map((s) => (
              <div key={s.label} className="statRow">
                <span className="statLabel mono">{s.label}</span>
                <span className="statValue">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
