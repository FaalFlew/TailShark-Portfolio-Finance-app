import "../../Shared/Css/Global.css";
import "./Navbar.css";
import React, { useState } from "react";
import logo from "./Tailshark-logo.png";
import { Link } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import SearchBar from "../SearchBar/SearchBar";
interface Props {}

const Navbar: React.FC = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenuClick = (): void => {
    setIsOpen(!isOpen);
  };

  const navClassName = isOpen ? "nav-div mobile" : "nav-div";

  return (
    <div className="holder">
    <header className="nav-header">
      <div>
        <span id="main-logo">
          <Link id="logo-link" to="/">
            <img src={logo} alt="" />
            
          </Link>
        </span>
      </div>

        <SearchBar/>

      <div className="main-ul-container">
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
          <HamburgerMenu click={handleMenuClick} isOpen={isOpen} />
        </ul>
      </div>
    </header>
    </div>

  );
};

export default Navbar;
