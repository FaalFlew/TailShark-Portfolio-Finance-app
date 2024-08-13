// Sidebar.tsx

import React, { useState } from 'react';
import SidebarItem from './SideBarItem/SideBarItem';
import 'boxicons/css/boxicons.min.css';
import "./SideBar.css";

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleResizeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsExpanded((prevExpanded) => !prevExpanded);
    document.body.classList.toggle('sb-expanded');
  };

  return (
      <aside className={`sidebar-container ${isExpanded ? 'sb-expanded' : ''}`}>
        <nav>
          <ul>
            <SidebarItem to="profile" icon="bx bx-home-circle" label="Profile" />
            <SidebarItem to="income" icon="bx bx-money" label="Income" />
            <SidebarItem to="balance" icon="bx bx-spreadsheet" label="Balance" />
            <SidebarItem to="cashflow" icon="bx bx-dollar-circle" label="Cashflow" />
            <li>
              <a href="#" onClick={handleResizeClick} data-resize-btn>
                <i className="bx bx-chevrons-right"></i>
                <span>Collapse</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
  );
};

export default Sidebar;
