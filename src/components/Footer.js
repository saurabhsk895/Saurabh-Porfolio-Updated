import React from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Footer.css";

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footerInner mono">
        <span>{t.footer.text}</span>
        <span>© {year}</span>
      </div>
    </footer>
  );
};

export default Footer;
