import React, { useEffect, useRef, useState } from "react";
import SidebarItem from "./SideBarItem/SideBarItem";
import "boxicons/css/boxicons.min.css";
import "./SideBar.css";

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);

  const isMobileScreen = (width = 1000): boolean => {
    return window.innerWidth < width;
  };
  

  const handleResizeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsExpanded((prevExpanded) => !prevExpanded);
    document.body.classList.toggle("sb-expanded");
  };

  const handleLinkClick = () => {
    if (isMobileScreen() && isExpanded) {
      setIsExpanded(false);
      document.body.classList.remove("sb-expanded");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileScreen() && 
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isExpanded
      ) {
        setIsExpanded(false);
        document.body.classList.remove("sb-expanded");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <>
      {isExpanded && isMobileScreen() && <div className="overlay" />} {/* Modal overlay */}
    <aside
      ref={sidebarRef}
      className={`sidebar-container ${isExpanded ? "sb-expanded" : ""}`}
    >
      <nav className="side-nav">
        <ul>
          <SidebarItem
            to="profile"
            icon="bx bx-home-circle"
            label="Profile"
            onClick={handleLinkClick}
          />
          <SidebarItem
            to="income"
            icon="bx bx-money"
            label="Income"
            onClick={handleLinkClick}
          />
          <SidebarItem
            to="balance"
            icon="bx bx-spreadsheet"
            label="Balance"
            onClick={handleLinkClick}
          />
          <SidebarItem
            to="cashflow"
            icon="bx bx-dollar-circle"
            label="Cashflow"
            onClick={handleLinkClick}
          />
          <li>
            <a href="#" onClick={handleResizeClick} data-resize-btn>
              <i className="bx bx-chevrons-right"></i>
              <span>Collapse</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
    </>
  );
};

export default Sidebar;
