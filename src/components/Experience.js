import React from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Experience.css";

const Experience = () => {
  const { t } = useLanguage();
  const e = t.experience;
  const c = t.credentials;

  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="eyebrow">
          <span className="dot"></span>
          {e.eyebrow}
        </div>
        <h2 className="display section-title">{e.title}</h2>

        <div className="timeline">
          {e.jobs.map((job, i) => (
            <div key={i} className="jobCard">
              <div className="jobHeader">
                <div>
                  <h3 className="jobRole">{job.role}</h3>
                  <div className="jobMeta mono">
                    {job.company} · {job.location}
                  </div>
                </div>
                <div className="jobPeriod mono">{job.period}</div>
              </div>
              {job.tag && <div className="jobTag">{job.tag}</div>}
              <ul className="jobBullets">
                {job.bullets.map((b, bi) => (
                  <li key={bi}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="eduCredGrid">
          <div className="credCard">
            <h4 className="credTitle mono">{e.education.title}</h4>
            <div className="eduDegree">{e.education.degree}</div>
            <div className="eduSchool">
              {e.education.school} · {e.education.period}
            </div>
            <div className="eduNote">{e.education.note}</div>
          </div>

          <div className="credCard">
            <h4 className="credTitle mono">{c.certsTitle}</h4>
            {c.certs.map((cert, i) => (
              <div key={i} className="certRow">
                <span className="certName">{cert.name}</span>
                <span className="certMeta mono">
                  {cert.issuer} · {cert.date}
                </span>
              </div>
            ))}
          </div>

          <div className="credCard">
            <h4 className="credTitle mono">{c.languagesTitle}</h4>
            {c.languages.map((l, i) => (
              <div key={i} className="langRow">
                <span className="langName">{l.name}</span>
                <span className="langLevel mono">{l.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
