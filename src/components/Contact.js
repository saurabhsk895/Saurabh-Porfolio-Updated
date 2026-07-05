import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";
import { siteConfig } from "../data/content";
import "./Contact.css";

const Contact = () => {
  const { t } = useLanguage();
  const c = t.contact;
  const form = useRef();
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorText, setErrorText] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setErrorText("");

    const name = form.current["your_name"].value.trim();
    const email = form.current["your_email"].value.trim();
    const message = form.current["message"].value.trim();

    if (!name || !email || !message) {
      setErrorText(c.requiredMsg);
      return;
    }

    if (!siteConfig.emailjsServiceId || !siteConfig.emailjsTemplateId || !siteConfig.emailjsPublicKey) {
      setErrorText(
        "Email is not configured yet — add your EmailJS keys to .env (see README-EDITING-GUIDE.md)."
      );
      return;
    }

    setStatus("sending");
    emailjs
      .sendForm(
        siteConfig.emailjsServiceId,
        siteConfig.emailjsTemplateId,
        form.current,
        siteConfig.emailjsPublicKey
      )
      .then(
        () => {
          setStatus("success");
          e.target.reset();
        },
        () => {
          setStatus("error");
        }
      );
  };

  return (
    <section id="contact" className="section noBorder">
      <div className="container">
        <div className="eyebrow">
          <span className="dot"></span>
          {c.eyebrow}
        </div>
        <h2 className="display section-title">{c.title}</h2>
        <p className="section-sub">{c.sub}</p>

        <form className="contactForm" ref={form} onSubmit={sendEmail}>
          <div className="formRow">
            <input type="text" name="your_name" placeholder={c.namePlaceholder} className="formInput" />
            <input type="email" name="your_email" placeholder={c.emailPlaceholder} className="formInput" />
          </div>
          <textarea name="message" rows="5" placeholder={c.messagePlaceholder} className="formTextarea"></textarea>

          {errorText && <div className="formMsg error">{errorText}</div>}
          {status === "success" && <div className="formMsg success">{c.successMsg}</div>}
          {status === "error" && <div className="formMsg error">{c.errorMsg}</div>}

          <button type="submit" className="btn primary" disabled={status === "sending"}>
            {status === "sending" ? c.sending : c.submit}
          </button>
        </form>

        <div className="contactLinks">
          <a href={`mailto:${siteConfig.email}`} className="contactLink mono">
            {siteConfig.email}
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="contactLink mono">
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
