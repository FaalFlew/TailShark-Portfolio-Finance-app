import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {
  children:React.ReactNode;
}

const ComapnyDashboard = ({children}: Props) => {
  return (
    <div>
      <div>ComapnyDashboard {<Outlet />}</div>
      <div>ComapnyDashboard {children}</div>

    </div>
  )
}

export default ComapnyDashboard