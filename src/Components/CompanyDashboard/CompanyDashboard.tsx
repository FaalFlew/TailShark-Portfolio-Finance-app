import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {
  children:React.ReactNode;
  ticker: string;
} 

/** the "<Outlet />" renders nested routes, that is the profile and income routes  */
const CompanyDashboard = ({children,ticker}: Props) => {
  return (
    <div>
      <div>CompanyDashboard {children}</div>
      <div>CompanyDashboard {<Outlet context={ticker}/>}</div>

    </div>
  )
}

export default CompanyDashboard