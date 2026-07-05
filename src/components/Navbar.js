import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { useLanguage } from "../context/LanguageContext";
import "./Navbar.css";

const Navbar = () => {
  const { t, lang, toggleLang } = useLanguage();
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { to: "hero", label: t.nav.home },
    { to: "about", label: t.nav.about },
    { to: "skills", label: t.nav.skills },
    { to: "experience", label: t.nav.experience },
    { to: "clients", label: t.nav.clients },
    { to: "contact", label: t.nav.contact },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navInner">
        <span className="logo mono">SK://portfolio</span>

        <div className="desktopLinks">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              spy={true}
              smooth={true}
              offset={-90}
              duration={500}
              className="navLink"
              activeClass="navLinkActive"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="navRight">
          <button className="langToggle mono" onClick={toggleLang} aria-label="Toggle language">
            {lang === "en" ? "DE" : "EN"}
          </button>
          <button
            className="menuBtn"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div className={`mobileMenu ${showMenu ? "open" : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            spy={true}
            smooth={true}
            offset={-90}
            duration={500}
            className="mobileLink"
            onClick={() => setShowMenu(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
