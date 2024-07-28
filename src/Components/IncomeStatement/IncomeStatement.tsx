import { Result } from '@/Types/apiTypes';
import { getIncomeStatement } from '../../Api/companyDataApi';
import { CompanyIncomeStatement } from '../../Types/company';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router';
import { handleApiResponse } from '../../Utils/apiResponseHandler';
import Table from '../Table/Table';
import Spinner from '../Spinner/Spinner';
import { incomeStatementConfig } from '../../Utils/companyTableConfigs';


type Props = {}

const IncomeStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [incomeStatement, setIncomeStatement] = useState<CompanyIncomeStatement[]>();
  const [serverError, setServerError] = useState<string>('');

  useEffect(() => {

    const incomeStatementFetch = async () => {
      const cachedData = localStorage.getItem(`incomeStatement_${ticker}`);
      if (cachedData) {
        setIncomeStatement(JSON.parse(cachedData));
      } else {
      const response = await getIncomeStatement(ticker);
      const result = handleApiResponse(response);
      if (result.error) {
        setServerError(result.error);
      } else {
        setIncomeStatement(result.data);
        localStorage.setItem(`incomeStatement_${ticker}`, JSON.stringify(result.data));
      }
    }
  }

    incomeStatementFetch()
  },[ticker])


  return (
    <div>{incomeStatement ?
       (<><Table config={incomeStatementConfig} data={incomeStatement} /></>)
       : (  <><p>{serverError}</p>
            <Spinner isLoading={true} /></>)
       }</div>
  )
}

export default IncomeStatement

