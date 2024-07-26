import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const SideBar = (props: Props) => {
  return (
    <div>SideBar
        <Link to="profile"> Profile</Link>
        <Link to="income"> Income</Link>
        <Link to="balance"> Balance</Link>

    </div>
  )
}

export default SideBar