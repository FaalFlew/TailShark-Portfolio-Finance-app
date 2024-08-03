import { SyntheticEvent } from 'react';
import '../../Shared/Css/Global.css'
import './HamburgerMenu.css'

interface Props  {
    click:() => void;
    isOpen:boolean;
}

const HamburgerMenu = ({ click, isOpen }: Props) => {
  const className = `menu-btn ${isOpen ? 'open' : ''}`;

  const handleClick = () => {
    click();
  }

  return (
    <li className={className} onClick={handleClick}>
      <a href="#MainMenu" aria-label="Interact with main menu" className={className}>
        <span className="menu-btn__burger"></span>
      </a>
    </li>
  );
}

export default HamburgerMenu