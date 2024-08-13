import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItemProps {
  to: string;
  icon: string;
  label: string;
}

const SideBarItem: React.FC<SidebarItemProps> = ({ to, icon, label }) => {
  const location = useLocation();

  const isActiveLink = (path: string) => location.pathname.includes(path);

  return (
    <li>
      <Link to={to} className={isActiveLink(to) ? 'active' : ''}>
        <i className={icon}></i>
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default SideBarItem;
