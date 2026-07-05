import React, { createContext, useContext, useState } from "react";
import content from "../data/content";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("de");

  const toggleLang = () => setLang((prev) => (prev === "en" ? "de" : "en"));

  const t = content[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
