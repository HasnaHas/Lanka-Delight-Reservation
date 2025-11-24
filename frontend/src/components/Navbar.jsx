import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeLink, setActiveLink] = useState("");


  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100; // adjust navbar offset
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });
      setActiveLink(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80; // adjust according to your navbar height
      const offsetTop = element.offsetTop - navbarHeight;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
    setShowMobileMenu(false);
  };

  const navLinks = [
    { id: "heroSection", title: "Home" },
    { id: "about", title: "About" },
    { id: "qualities", title: "Why Us" },
    { id: "team", title: "Team" },
    { id: "contact", title: "Contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          <div className="text-2xl font-bold text-slate-900">
            <span className="text-amber-600">Lanka</span> Delight
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-base font-medium transition-colors duration-300 ${
                  activeLink === link.id
                    ? "text-amber-600 font-bold"
                    : "text-slate-700 hover:text-amber-600"
                }`}
              >
                {link.title}
              </button>
            ))}

            <Link
              to="/menu"
              className="ml-4 px-5 py-2 bg-amber-600 text-white font-medium rounded-lg shadow-sm hover:bg-amber-700 transition-colors"
            >
              OUR MENU
            </Link>
          </div>

          <button
            className="md:hidden text-2xl text-slate-700 hover:text-amber-600"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white shadow-md border-t">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-900 hover:text-amber-600 hover:bg-gray-50"
              >
                {link.title}
              </button>
            ))}

            <Link
              to="/menu"
              className="block w-full text-center px-4 py-2 bg-amber-600 text-white rounded-md shadow-sm hover:bg-amber-700"
              onClick={() => setShowMobileMenu(false)}
            >
              OUR MENU
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
