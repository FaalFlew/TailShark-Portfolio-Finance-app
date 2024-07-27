import { getKeyMetrics } from '../../Api/api';
import { CompanyKeyMetrics } from '../../Types/company';
import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import RatioList from '../RatioList/RatioList';
import { handleApiResponse } from '../../Utils/apiResponseHandler';
import Spinner from '../Spinner/Spinner';
import { profileConfig } from '../../Utils/companyTableConfigs';

type Props = {}

const CompanyProfile = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [serverError, setServerError] = useState<string>('');
  const [companyKeyMetrics, setCompanyKeyMetrics] = useState<CompanyKeyMetrics>();


  useEffect(() => {

    const getCompanyKeyMetrics = async () => {
      const cachedData = localStorage.getItem(`companyKeyMetrics_${ticker}`);
      if (cachedData) {
        setCompanyKeyMetrics(JSON.parse(cachedData));
      } else {
      const response = await getKeyMetrics(ticker);
      const result = handleApiResponse(response);
      if (result.error) {
        setServerError(result.error);
      } else if(result.data){
        setCompanyKeyMetrics(result.data[0]);
        localStorage.setItem(`companyKeyMetrics_${ticker}`, JSON.stringify(result.data[0]));
        console.log(result.data[0]);
      }
    }
  };

    getCompanyKeyMetrics();
  }, [ticker]);

  return( <>

    {companyKeyMetrics ? (
      <>
      <RatioList data={companyKeyMetrics} config={profileConfig} /> 
      </>
    ) : 
    (
        <><p>{serverError}</p>
          <Spinner isLoading={true} /></>

     ) }  
  </>
  )
}

export default CompanyProfile