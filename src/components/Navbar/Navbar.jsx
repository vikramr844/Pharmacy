import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { HiMenuAlt3, HiShoppingCart, HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import "../../assets/styles/Navbar.css";

const Navbar = () => {
  const [changeHeader, setChangeHeader] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const menu = [
    { id: 1, text: "Home", to: "/" },
    { id: 2, text: "Services", to: "/services" },
    { id: 3, text: "Medicines", to: "/products" },
    { id: 4, text: "Health Tool", to: "/health-tool" },
    { id: 5, text: "Health Blog", to: "/health-blog" },
    { id: 6, text: "Contact", to: "/contact" },
  ];

  const toggleMobileNav = () => setMobileNav((prev) => !prev);

  const handleScroll = () => {
    setChangeHeader(window.scrollY >= 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`navbar ${
        changeHeader ? "scrolled shadow-md" : ""
      } fixed top-0 w-full bg-white transition-all z-50`}
    >
      <nav className="container mx-auto d-flex justify-content-between align-items-center px-4 md:px-8 lg:px-12">
        {/* Brand */}
        <div className="navbrand-logo d-flex align-items-center">
          <img
            src="/brandLogo.jpg"
            alt="logo"
            className="w-12 h-12 mr-3 object-cover rounded-circle"
          />
          <h1 className="brandName text-lg md:text-xl  font-bold text-danger text-decoration-none">Pharmacy</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="d-none d-md-flex ms-auto justify-content-lg-end space-x-4">
          {menu.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `nav-link navlink-desktop px-1 py-2 rounded ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:text-blue-600 transition-all"
                  }`
                }
              >
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Cart Icon on Desktop */}
        <div className="cart-icon ms-3 d-flex align-items-center  d-none d-md-flex">
          <NavLink to="/cart" className="text-decoration-none text-dark">
            <HiShoppingCart className="text-2xl" />
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="d-md-none d-flex align-items-center">
          {mobileNav ? (
            <HiX
              onClick={toggleMobileNav}
              className="menu-icon text-3xl text-blue-600 cursor-pointer"
              aria-label="Close menu"
            />
          ) : (
            <HiMenuAlt3
              onClick={toggleMobileNav}
              className="menu-icon text-3xl text-blue-600 cursor-pointer"
              aria-label="Open menu"
            />
          )}

          {/* Cart Icon next to the Burger on Mobile */}
          {mobileNav && (
            <div className="cart-icon ms-3 d-flex align-items-center">
              <NavLink to="/cart" className="text-decoration-none text-dark">
                <HiShoppingCart className="text-2xl" />
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileNav && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg transition-all z-40">
          <ul className="d-flex text-decoration-none flex-column align-items-start px-4 py-4 space-y-2">
            {menu.map((item) => (
              <li key={item.id} className="w-full">
                <NavLink
                  to={item.to}
                  onClick={toggleMobileNav}
                  className={({ isActive }) =>
                    `block w-full px-4 py-2 rounded ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all"
                    }`
                  }
                >
                  {item.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
