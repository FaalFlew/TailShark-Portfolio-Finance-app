import '../../Shared/Css/Global.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CompanyProfile } from '../../comapny';
import { getCompanyProfile } from '../../api';
import SideBar from '../../Components/SideBar/SideBar';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';

interface Props {
    
}

const CompanyPage = (props: Props) => {

  let { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker!);
      setCompany(result?.data[0]);
    }

    getProfileInit();
  },[])

  return (
    <main>
    <div>{company ? (
    <div>{company.companyName}
    <SideBar/> 
    <CompanyDashboard />
    </div>) 
    : (
    <div> Company not found!</div>

    )
    } </div>
    </main>
  )
}

export default CompanyPage