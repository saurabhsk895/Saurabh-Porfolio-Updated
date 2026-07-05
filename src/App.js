import React from "react";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Clients from "./components/Clients";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Clients />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
