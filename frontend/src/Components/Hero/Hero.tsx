import React from "react";
import hero from "./Hero.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faBolt,
  faWifi,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Hero.css";

interface Props {}

const Hero = (props: Props) => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Financial data. <br /> No news.
          </h1>
          <p className="hero-subtitle">
            Access relevant financial documents for publicly traded companies.
            Works offline, Fast and data mobile friendly.
          </p>

          <div className="hero-features">
            <div className="hero-feature">
              <FontAwesomeIcon
                icon={faDatabase}
                className="hero-feature-icon"
              />
              <span>Client-Side Cache</span>
            </div>
            <div className="hero-feature">
              <FontAwesomeIcon icon={faWifi} className="hero-feature-icon" />
              <span>Works Offline</span>
            </div>
            <div className="hero-feature">
              <FontAwesomeIcon icon={faBolt} className="hero-feature-icon" />
              <span>Loads Instantly</span>
            </div>
            <div className="hero-feature">
              <FontAwesomeIcon
                icon={faMobileAlt}
                className="hero-feature-icon"
              />
              <span>Saves Mobile Data</span>
            </div>
          </div>

          <div className="hero-cta-container">
            <Link to="/search" className="hero-cta-button">
              Get Started
            </Link>
            <p className="hero-cta-subtext">No account needed.</p>
          </div>
        </div>
        <div className="hero-image-container">
          <img
            src={hero}
            alt="TailShark financial data interface preview"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
