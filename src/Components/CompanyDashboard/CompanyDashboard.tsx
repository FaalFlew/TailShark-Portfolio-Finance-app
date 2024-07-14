import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

const ComapnyDashboard = (props: Props) => {
  return (
    <div>ComapnyDashboard {<Outlet />}</div>
  )
}

export default ComapnyDashboard