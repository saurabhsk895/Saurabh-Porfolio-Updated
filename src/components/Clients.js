import React from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Clients.css";

const Clients = () => {
  const { t } = useLanguage();
  const c = t.clients;

  return (
    <section id="clients" className="section">
      <div className="container">
        <div className="eyebrow">
          <span className="dot"></span>
          {c.eyebrow}
        </div>
        <h2 className="display section-title">{c.title}</h2>
        <p className="section-sub">{c.sub}</p>

        <div className="clientsGrid">
          {c.list.map((client) => (
            <div key={client.name} className="clientCard">
              <div className="clientName">{client.name}</div>
              <div className="clientNote">{client.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
