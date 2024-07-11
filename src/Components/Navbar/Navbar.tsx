import React from 'react'
import logo from './Tailshark-logo.png';
import { Link } from 'react-router-dom';
import './Navbar.css'
interface Props {

}

const Navbar = (props: Props) => {
  return (
    <nav className="">
    <div className="">
      <div className="">
        <Link to="/">
        <img src={logo} alt="" />
        </Link>
        <div className="">
          <Link to="/search" className="">
            Search
          </Link>
        </div>
      </div>
      <div className="">
        <div className="">Login</div>
        <a
          href=""
          className=""
        >
          Signup
        </a>
      </div>
    </div>
  </nav>
  )
}

export default Navbar