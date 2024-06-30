import React from 'react'
import logo from './Tailshark-logo.png';
interface Props {

}

const Navbar = (props: Props) => {
  return (
    <nav className="">
    <div className="">
      <div className="">
        <img src={logo} alt="" />
        <div className="">
          <a href="" className="">
            Dashboard
          </a>
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