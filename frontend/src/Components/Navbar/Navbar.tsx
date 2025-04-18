import "../../Shared/Css/Global.css";
import "./Navbar.css";
import React, { useState } from "react";
import MobileLogo from "./mobile-logo.png";
import Logo from "./Tailshark-logo.png";
import { Link } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import SearchBar from "../SearchBar/SearchBar";
interface Props {}

const Navbar: React.FC = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenuClick = (): void => {
    setIsOpen(!isOpen);
  };

  const navClassName = isOpen ? "main-ul-container mobile" : "main-ul-container";

  return (
    <header className="nav-header">
      <div className="logo-container">
        <span id="main-logo">
          <Link id="logo-link" to="/">
          <picture>
      <source
        media="(max-width: 600px)"
        srcSet={MobileLogo} // Mobile logo
        type="image/png"
      />
      <source
        media="(min-width: 601px)"
        srcSet={Logo} // Desktop logo
        type="image/png"
      />
      <img
        src={Logo} // Fallback if <source> elements are not supported
        alt="Company Logo"
        className="responsive-logo"
      />
          </picture>

          </Link>
        </span>
      </div>

      <SearchBar />

      <div className={navClassName}>
        <ul className="main-ul">
          <li>
            <Link className="glow-on-hover" to="/">
              Login
            </Link>
          </li>
          <li>
            <Link className="glow-on-hover" to="/">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
      <div className="menu-container">
      <ul className="main-ul">
      <HamburgerMenu click={handleMenuClick} isOpen={isOpen} />
      </ul>
      </div>

    </header>
  );
};

export default Navbar;
