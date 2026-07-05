import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Skills.css";

const Skills = () => {
  const { t } = useLanguage();
  const s = t.skills;
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = ["all", "frontend", "backend", "cms", "tools"];
  const visibleItems =
    activeFilter === "all"
      ? s.items
      : s.items.filter((item) => item.cat === activeFilter);

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="eyebrow">
          <span className="dot"></span>
          {s.eyebrow}
        </div>
        <h2 className="display section-title">{s.title}</h2>
        <p className="section-sub">{s.sub}</p>

        <div className="filterRow">
          {filters.map((f) => (
            <button
              key={f}
              className={`filterBtn mono ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {s.categories[f]}
            </button>
          ))}
        </div>

        <div className="skillsGrid">
          {visibleItems.map((item) => (
            <div key={item.name} className="skillCard">
              <span className="skillDot"></span>
              <span className="skillName">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
