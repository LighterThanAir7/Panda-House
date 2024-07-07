import Logo from "./Logo.jsx";
import Nav from "./Nav.jsx";
import {useEffect, useState} from "react";

export default function Header () {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <div className="header__inner | container mx-auto">
        <Logo type="with-title" />
        <Nav />
      </div>
    </header>
  )
}