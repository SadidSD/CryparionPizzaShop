import React, { useState, useEffect } from "react";
import Logo from "../pictures/cryparion.png";
import "../Styles/Navstyle.css";

const Navbar = ({ onMenuClick, onAboutClick, onContactClick, onHomeClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const menuSection = document.getElementById("menuSection");
      const menuSectionTop = menuSection ? menuSection.offsetTop : Infinity;

      if (currentScrollPos > prevScrollPos && currentScrollPos < menuSectionTop - 100) {
        setIsVisible(false);
      } else if (currentScrollPos < prevScrollPos || currentScrollPos <= menuSectionTop) {
        setIsVisible(true);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`navbar ${isVisible ? "" : "hidden"} ${isMenuOpen ? "open" : ""}`}>
      <div className="leftSide">
        <img src={Logo} alt="logo" />
        <h1>Cryparion Pizza Shop</h1>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        &#9776;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>

      <div className={`rightSide ${isMenuOpen ? "open" : ""}`}>
        {/* Scrollable links with smooth scroll behavior */}
        <a href="#homeSection" onClick={() => { setIsMenuOpen(false); onHomeClick(); }}>Home</a>
        <a href="#menuSection" onClick={() => { setIsMenuOpen(false); onMenuClick(); }}>Menu</a>
        <a href="#aboutSection" onClick={() => { setIsMenuOpen(false); onAboutClick(); }}>About</a>
        <a href="#contactSection" onClick={() => { setIsMenuOpen(false); onContactClick(); }}>Contact</a>
      </div>
    </div>
  );
};

export default Navbar;
