import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {
  children:React.ReactNode;
  ticker: string;
} 

/** the "<Outlet />" renders nested routes, that is the profile and income routes  */
const CompanyDashboard = ({children,ticker}: Props) => {
  return (
    <div className='dashboard-container'>
      <div>{children}</div>
      <div>{<Outlet context={ticker}/>}</div>
      
    </div>
  )
}

export default CompanyDashboard